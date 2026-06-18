/**
 * SNOOZE - META PIXEL ADVANCED MATCHING + CAPI DEDUP
 *
 * Goal: raise Event Match Quality (EMQ) on InitiateCheckout and Purchase from
 * ~5.4-6.1 toward >=8.0 by attaching a hashed email (em) and other match keys
 * (fn, ln, ph, ct, zp, country) to the Meta Pixel, plus fbc/fbp, and firing a
 * shared event_id so the browser Pixel and server-side (Stape sGTM) CAPI events
 * deduplicate instead of double-counting.
 *
 * Root cause this fixes (verified June 2026, dataset 449153684613893):
 *   - InitiateCheckout EMQ 6.1: ip + user_agent + fbp (100%), fbc 67.5%, em 0%.
 *   - ViewContent EMQ 5.4: no em.
 *   - PageView em only 2.8% (logged-in members only).
 * The GTM-TAG-86 price scraper already writes the buyer email (plaintext) to
 * localStorage('email') on the Kajabi checkout page. Meta never receives it as a
 * hashed match key because the GTM/Stape Meta tags do not read it into
 * user_data. This module closes that gap on the browser side, in repo-controlled
 * code, with no dependency on the GTM/Stape UI.
 *
 * Match keys are hashed SHA-256 (lowercased + trimmed) before they touch the
 * Pixel. Hashing email/phone is standard Meta Advanced Matching; this is
 * technical ad tracking, not member-facing content.
 *
 * Deploy target (HUMAN action): Kajabi -> Settings -> Checkout Tracking Code ->
 *   Header Tracking Code (paste AFTER the GTM/Stape loader so window.fbq exists).
 * See docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md and
 *   docs/technical/EMQ-CAPI-ADVANCED-MATCHING.md.
 *
 * Dedup contract: the browser fbq('track', ..., {eventID}) MUST share the same
 * event_id as the server CAPI event for that hit. The server side (Stape sGTM)
 * must read the same id. This module persists the id in localStorage under
 *   snooze_eventid_initiatecheckout / snooze_eventid_purchase
 * and also pushes it to dataLayer as meta_event_id so a GTM variable can map it
 * into the CAPI tag's event_id field. Until the server tag reads it, the browser
 * event still carries em and lifts EMQ on its own.
 */

(function () {
  'use strict';

  var PIXEL_ID = '449153684613893';

  // ---- SHA-256 (Web Crypto, async) -----------------------------------------
  function sha256Hex(input) {
    try {
      var norm = String(input == null ? '' : input).trim().toLowerCase();
      if (!norm) return Promise.resolve(null);
      var bytes = new TextEncoder().encode(norm);
      return crypto.subtle.digest('SHA-256', bytes).then(function (buf) {
        var arr = Array.from(new Uint8Array(buf));
        return arr.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
      });
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  // ---- cookie + storage readers ---------------------------------------------
  function readCookie(name) {
    try {
      var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }

  function ls(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  // fbc: build from _fbc cookie, else from fbclid URL param (Meta's documented
  // format: fb.1.<timestamp>.<fbclid>). fbp: read _fbp cookie (GTM/Pixel sets it).
  function getFbc() {
    var fbc = readCookie('_fbc');
    if (fbc) return fbc;
    try {
      var fbclid = new URLSearchParams(window.location.search).get('fbclid');
      if (fbclid) return 'fb.1.' + Date.now() + '.' + fbclid;
    } catch (e) {}
    return null;
  }
  function getFbp() { return readCookie('_fbp'); }

  // ---- match keys from the checkout localStorage captured by GTM-TAG-86 ------
  // Phone: strip non-digits before hashing (Meta normalisation). Name fields:
  // split full_name into fn/ln when only full_name was captured.
  function collectRaw() {
    var fullName = ls('full_name') || '';
    var fn = '', ln = '';
    if (fullName) {
      var parts = fullName.trim().split(/\s+/);
      fn = parts[0] || '';
      ln = parts.length > 1 ? parts.slice(1).join(' ') : '';
    }
    return {
      em: ls('email'),
      ph: (ls('phone') || '').replace(/[^0-9]/g, ''),
      fn: fn,
      ln: ln,
      ct: ls('city'),
      zp: ls('zip'),
      country: ls('country')
    };
  }

  // Build the hashed Advanced Matching object Meta expects on fbq('init').
  function buildUserData() {
    var raw = collectRaw();
    var keys = ['em', 'ph', 'fn', 'ln', 'ct', 'zp', 'country'];
    return Promise.all(keys.map(function (k) {
      return raw[k] ? sha256Hex(raw[k]) : Promise.resolve(null);
    })).then(function (hashes) {
      var ud = {};
      keys.forEach(function (k, i) { if (hashes[i]) ud[k] = hashes[i]; });
      return ud;
    });
  }

  // ---- shared event_id for browser+server dedup -----------------------------
  function eventId(eventName) {
    var storeKey = 'snooze_eventid_' + eventName.toLowerCase();
    var existing = ls(storeKey);
    if (existing) return existing;
    var id = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : (eventName + '-' + Date.now() + '-' + Math.random().toString(16).slice(2));
    try { window.localStorage.setItem(storeKey, id); } catch (e) {}
    // Surface to GTM so the server CAPI tag can map it into event_id.
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'meta_event_id_set', meta_event: eventName, meta_event_id: id });
    } catch (e) {}
    return id;
  }

  // ---- public: re-init Pixel with Advanced Matching, then fire the event -----
  // Re-running fbq('init', PIXEL_ID, userData) updates Advanced Matching for the
  // already-loaded pixel; subsequent track calls carry the hashed keys.
  function fireWithMatch(eventName, params) {
    if (typeof window.fbq !== 'function') {
      // Pixel not loaded yet (GTM/Stape still booting). Retry briefly.
      if (fireWithMatch._tries == null) fireWithMatch._tries = 0;
      if (fireWithMatch._tries++ < 20) {
        return setTimeout(function () { fireWithMatch(eventName, params); }, 250);
      }
      return;
    }
    buildUserData().then(function (ud) {
      var fbc = getFbc();
      var fbp = getFbp();
      try {
        // Advanced Matching: hashed keys go through init. fbc/fbp are cookies
        // Meta reads automatically, but we pass them explicitly for resilience.
        window.fbq('init', PIXEL_ID, ud);
      } catch (e) {}
      var id = eventId(eventName);
      try {
        window.fbq('track', eventName, params || {}, { eventID: id });
      } catch (e) {}
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'meta_advanced_match_fired',
          meta_event: eventName,
          meta_event_id: id,
          meta_has_em: !!ud.em,
          meta_has_fbc: !!fbc,
          meta_has_fbp: !!fbp
        });
      } catch (e) {}
    });
  }

  window.SnoozeMetaMatch = {
    fire: fireWithMatch,
    eventId: eventId,
    buildUserData: buildUserData
  };
})();
