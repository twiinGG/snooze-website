/**
 * NOT A PASTE TARGET.
 * Fragment only. Inlined into global/html/checkout-header-tracking.html as the third
 * script block, which is the one file that goes into Kajabi Settings, Checkout,
 * Checkout Tracking Code, Header field.
 *
 * This header claimed the inlining had happened from the day the file was written.
 * It had not: the HTML held the loader, Meta Advanced Matching and the UTM capture,
 * and no identity block at all. Inlined for real on 2026-08-16. Keep this file and
 * that block byte-identical from the IIFE onwards.
 * See global/checkout-tracking/README.md and CODE-SURFACE-CONTRACT.md.
 *
 * WHAT THIS IS FOR
 *
 * Purchase conversions are dispatched server-side from the Kajabi payment.succeeded
 * webhook, because no browser surface can do it: the checkout tracking fields do not
 * inject on the confirmation page and window.Kajabi.order is null there. The webhook
 * carries authoritative order data but no browser identity, so a purchase sent from it
 * lands in GA4 with no session to attach to and reports as direct traffic.
 *
 * This block closes that gap. The checkout page IS a surface where this field injects,
 * and the buyer types their email here. So it captures the GA4 client id, the Meta
 * browser cookies and the stored attribution, keys them by the SHA-256 of the email,
 * and posts them to n8n. The order workflow joins on sha256(member.email) at payment
 * time and the purchase keeps its acquisition channel.
 *
 * PRIVACY
 * The email is hashed in the browser and the plain address never leaves the page. No
 * name, phone, address or baby details are read or sent.
 */
(function () {
  'use strict';

  var ENDPOINT = 'https://n8n.khorus.ai/webhook/snooze-checkout-identity';
  var UTM_STORAGE_KEY = 'snooze_utm_attribution';
  var FIRST_TOUCH_KEY = 'snooze_attribution_first_touch';
  var CURRENT_TOUCH_KEY = 'snooze_attribution_current_touch';
  var SENT_PREFIX = 'snooze_identity_sent_';
  var POLL_MS = 1000;
  var MAX_POLLS = 120;

  function readCookie(name) {
    try {
      var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }

  function allCookies() {
    try { return String(document.cookie || '').split(/;\s*/); } catch (e) { return []; }
  }

  /** "GA1.1.1234567890.1699999999" becomes "1234567890.1699999999". */
  function gaClientId() {
    var raw = readCookie('_ga');
    if (!raw) return null;
    var parts = raw.split('.');
    if (parts.length < 4) return null;
    return parts.slice(-2).join('.');
  }

  /**
   * The session id lives in _ga_<STREAM>. The container routes through the Stape
   * server container with a placeholder measurement id, so the suffix cannot be
   * assumed. Scan for any _ga_ cookie and take the session id segment.
   *
   * The cookie's third dot-separated segment is NOT the session id on its own. The
   * live value measured 2026-08-17 is
   * `_ga_J4TY43FW1G=GS2.1.s1786946916$o1$g1$t1786946942$j34$l0$h1685109018`, so
   * splitting on '.' yields `s1786946916$o1$g1$...` and returning it whole sent GA4
   * a session_id it cannot stitch. Caught on a live order in ME-010: the join
   * succeeded, the client id was right, and the session id was unusable. The digits
   * after the optional leading 's' and before the first '$' are the session id. The
   * regex also handles the older format where the segment is a bare number.
   */
  function gaSessionId() {
    var cookies = allCookies();
    for (var i = 0; i < cookies.length; i++) {
      var pair = cookies[i].split('=');
      if (pair[0] && pair[0].indexOf('_ga_') === 0 && pair[1]) {
        var segs = decodeURIComponent(pair[1]).split('.');
        if (segs.length >= 3) {
          var m = String(segs[2] || '').match(/^s?(\d+)/);
          if (m) return m[1];
        }
      }
    }
    return null;
  }

  function getFbc() {
    var fbc = readCookie('_fbc');
    if (fbc) return fbc;
    try {
      var qs = String(window.location.search || '');
      var m = qs.match(/[?&]fbclid=([^&]*)/);
      if (m && m[1]) return 'fb.1.' + Date.now() + '.' + decodeURIComponent(m[1]);
    } catch (e) {}
    return null;
  }

  function queryParam(name) {
    try {
      var m = String(window.location.search || '').match(new RegExp('[?&]' + name + '=([^&]*)'));
      return m && m[1] ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }

  // Three stores, because two different blocks write attribution under two
  // different names and this one originally read only the first. The checkout
  // header block writes snooze_utm_attribution; the site header scripts write
  // snooze_attribution_first_touch and snooze_attribution_current_touch. A
  // visitor who arrives on an ad, browses, and types their email on a later page
  // has no UTM in the URL, so reading the wrong key loses the channel that paid
  // for them. Measured 2026-08-16: the site store held the campaign and this
  // function returned nothing.
  //
  // First touch wins, because that is the click that earned the customer. Fields
  // are merged rather than the whole object taken, so a partial store still
  // contributes what it has.
  function storedAttribution() {
    var merged = {};
    var keys = [UTM_STORAGE_KEY, FIRST_TOUCH_KEY, CURRENT_TOUCH_KEY];
    for (var i = 0; i < keys.length; i++) {
      try {
        var raw = window.localStorage.getItem(keys[i]);
        if (!raw) continue;
        var parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') continue;
        for (var k in parsed) {
          if (Object.prototype.hasOwnProperty.call(parsed, k)
              && merged[k] === undefined && parsed[k] !== null && parsed[k] !== '') {
            merged[k] = parsed[k];
          }
        }
      } catch (e) {}
    }
    return merged;
  }

  function offerToken() {
    try {
      var m = String(window.location.pathname || '').match(/\/offers\/([^/]+)/);
      return m ? m[1] : null;
    } catch (e) { return null; }
  }

  function sha256Hex(input) {
    try {
      var norm = String(input == null ? '' : input).trim().toLowerCase();
      if (!norm) return Promise.resolve(null);
      var bytes = new TextEncoder().encode(norm);
      return crypto.subtle.digest('SHA-256', bytes).then(function (buf) {
        return Array.from(new Uint8Array(buf)).map(function (b) {
          return b.toString(16).padStart(2, '0');
        }).join('');
      });
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  /**
   * Read the buyer's email from the checkout form. The localStorage 'email' key that
   * GTM tag 86 writes is checked as a fallback, because on some checkout templates the
   * scraper reaches the value before a stable selector does.
   */
  function currentEmail() {
    var selectors = [
      'input[type="email"]',
      'input[name="email"]',
      'input[name*="email" i]',
      '#email'
    ];
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el && el.value && el.value.indexOf('@') > 0) return el.value;
    }
    try {
      var stored = window.localStorage.getItem('email');
      if (stored && stored.indexOf('@') > 0) return stored;
    } catch (e) {}
    return null;
  }

  function looksLikeEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function alreadySent(hash) {
    try { return window.sessionStorage.getItem(SENT_PREFIX + hash) === '1'; } catch (e) { return false; }
  }

  function markSent(hash) {
    try { window.sessionStorage.setItem(SENT_PREFIX + hash, '1'); } catch (e) {}
  }

  function send(hash) {
    var attribution = storedAttribution();
    var payload = {
      email_sha256: hash,
      ga_client_id: gaClientId(),
      ga_session_id: gaSessionId(),
      fbp: readCookie('_fbp'),
      fbc: getFbc(),
      gclid: queryParam('gclid') || attribution.gclid || null,
      utm_source: attribution.utm_source || queryParam('utm_source') || null,
      utm_medium: attribution.utm_medium || queryParam('utm_medium') || null,
      utm_campaign: attribution.utm_campaign || queryParam('utm_campaign') || null,
      utm_content: attribution.utm_content || queryParam('utm_content') || null,
      utm_term: attribution.utm_term || queryParam('utm_term') || null,
      offer_token: offerToken(),
      page_location: String(window.location.origin || '') + String(window.location.pathname || ''),
      user_agent: navigator.userAgent
    };

    // No client_ip_address here. n8n reads the source address from the request itself,
    // which is the only trustworthy version of it.
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        mode: 'cors'
      }).catch(function () {});
    } catch (e) {}

    markSent(hash);

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'checkout_identity_captured',
        has_ga_client_id: !!payload.ga_client_id,
        has_fbp: !!payload.fbp,
        has_fbc: !!payload.fbc
      });
    } catch (e) {}
  }

  var polls = 0;
  var lastSeen = null;

  function tick() {
    polls += 1;
    var email = currentEmail();
    if (looksLikeEmail(email) && email !== lastSeen) {
      lastSeen = email;
      sha256Hex(email).then(function (hash) {
        if (hash && !alreadySent(hash)) send(hash);
      });
    }
    if (polls < MAX_POLLS) window.setTimeout(tick, POLL_MS);
  }

  // Runs on every page, because the buyer's email is not readable where the order
  // is. Kajabi's hosted checkout collects it inside a Stripe iframe, which is
  // cross-origin: measured 2026-08-16 on two live checkouts, currentEmail() null
  // on both, zero rows captured and zero workflow executions. The email IS
  // readable in the lead forms on the website and landing pages, so that is where
  // this has to run. The order webhook joins on the hash whenever it was captured.
  //
  // The earlier guard started the poll only on a /checkout path, which is why the
  // block was live and inert. The cost of dropping it is 120 querySelector calls
  // spread over two minutes, once per page, and then it stops.
  window.setTimeout(tick, POLL_MS);

  window.SnoozeCheckoutIdentity = { send: send, hash: sha256Hex, currentEmail: currentEmail };
})();
