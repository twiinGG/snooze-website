
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

  function gaClientId() {
    var raw = readCookie('_ga');
    if (!raw) return null;
    var parts = raw.split('.');
    if (parts.length < 4) return null;
    return parts.slice(-2).join('.');
  }

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
    var utmId = attribution.utm_id || queryParam('utm_id') || null;
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
      utm_id: utmId,
      ad_id: utmId,
      offer_token: offerToken(),
      page_location: String(window.location.origin || '') + String(window.location.pathname || ''),
      user_agent: navigator.userAgent
    };

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

  window.setTimeout(tick, POLL_MS);

  window.SnoozeCheckoutIdentity = { send: send, hash: sha256Hex, currentEmail: currentEmail };
})();
