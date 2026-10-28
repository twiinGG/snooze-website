
(function () {
  'use strict';

  var ENDPOINT = 'https://ss.joinsnooze.com/snooze-checkout-identity';
  var UTM_STORAGE_KEY = 'snooze_utm_attribution';
  var FIRST_TOUCH_KEY = 'snooze_attribution_first_touch';
  var CURRENT_TOUCH_KEY = 'snooze_attribution_current_touch';
  var SENT_PREFIX = 'snooze_identity_sent_';
  var POLL_MS = 1000;
  var MAX_POLLS = 120;
  var MAX_ATTEMPTS = 3;
  var pending = {};
  var attempts = {};
  var fallbackClickTime = Date.now();

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

  var TOUCH_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'gclid', 'fbclid', 'fbc'];
  var TOUCH_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

  function queryParam(name) {
    try {
      var m = String(window.location.search || '').match(new RegExp('[?&]' + name + '=([^&]*)'));
      return m && m[1] ? decodeURIComponent(m[1].split(String.fromCharCode(43)).join(' ')) : null;
    } catch (e) { return null; }
  }

  function readObject(key) {
    try {
      var value = JSON.parse(window.localStorage.getItem(key));
      return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
    } catch (e) { return null; }
  }

  function coherentTouch(value, query) {
    if (!value || typeof value !== 'object') return null;
    var timestamp = query ? new Date(fallbackClickTime).toISOString() : value.captured_at || value.occurred_at;
    if (typeof timestamp !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(timestamp)) return null;
    var age = Date.now() - Date.parse(timestamp);
    if (!isFinite(age) || age < 0 || age > TOUCH_WINDOW_MS) return null;
    var touch = { captured_at: timestamp };
    var found = false;
    TOUCH_KEYS.forEach(function (key) {
      if (typeof value[key] === 'string' && value[key] && value[key].length <= 512) {
        touch[key] = value[key];
        found = true;
      }
    });
    if (!found) return null;
    var source = String(touch.utm_source || '').toLowerCase();
    var google = source === 'google' || !!touch.gclid;
    var meta = /^(facebook|meta|instagram|fb|ig)$/.test(source) || !!touch.fbclid || !!touch.fbc;
    if (touch.gclid && (touch.fbclid || touch.fbc)) { delete touch.gclid; delete touch.fbclid; delete touch.fbc; }
    else if (source === 'google') { delete touch.fbclid; delete touch.fbc; }
    else if (/^(facebook|meta|instagram|fb|ig)$/.test(source)) delete touch.gclid;
    else if (google && meta) { delete touch.gclid; delete touch.fbclid; delete touch.fbc; }
    return touch;
  }

  function boundedCookie(name) {
    var value = readCookie(name);
    return value && value.length <= 512 ? value : null;
  }

  function touchSelection() {
    var legacy = coherentTouch(readObject(UTM_STORAGE_KEY));
    var first = coherentTouch(readObject(FIRST_TOUCH_KEY)) || legacy;
    var storedCurrent = coherentTouch(readObject(CURRENT_TOUCH_KEY));
    var state = readObject('snooze_paid_touch_state_v1');
    var finalTouch = coherentTouch(state && state.final_touch);
    if (finalTouch && (!storedCurrent || Date.parse(finalTouch.captured_at) > Date.parse(storedCurrent.captured_at))) storedCurrent = finalTouch;
    var incoming = {};
    TOUCH_KEYS.forEach(function (key) { if (key !== 'fbc') incoming[key] = queryParam(key); });
    var current = coherentTouch(incoming, true);
    var selected = current || storedCurrent || first;
    return {
      version: 1,
      selection: current ? 'current_query' : storedCurrent ? 'stored_current' : selected ? 'stored_first' : 'none',
      first_touch: first,
      current_touch: current || storedCurrent,
      selected_touch: selected,
      browser_click_cookies: { fbc: boundedCookie('_fbc'), gcl_aw: boundedCookie('_gcl_aw') }
    };
  }

  function touchFbc(touch) {
    if (!touch) return null;
    if (touch.fbclid) {
      var cookie = readCookie('_fbc');
      if (cookie && cookie.slice(-(touch.fbclid.length + 1)) === '.' + touch.fbclid) return cookie;
      return 'fb.1.' + Date.parse(touch.captured_at) + '.' + touch.fbclid;
    }
    return touch.fbc || null;
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

  function alreadySent(hash, signature) {
    try { return window.sessionStorage.getItem(SENT_PREFIX + hash) === signature; } catch (e) { return false; }
  }

  function markSent(hash, signature) {
    try { window.sessionStorage.setItem(SENT_PREFIX + hash, signature); } catch (e) {}
  }

  function send(hash) {
    var evidence = touchSelection();
    var attribution = evidence.selected_touch || {};
    var utmId = attribution.utm_id || null;
    var payload = {
      email_sha256: hash,
      ga_client_id: gaClientId(),
      ga_session_id: gaSessionId(),
      fbp: readCookie('_fbp'),
      fbc: touchFbc(evidence.selected_touch),
      gclid: attribution.gclid || null,
      utm_source: attribution.utm_source || null,
      utm_medium: attribution.utm_medium || null,
      utm_campaign: attribution.utm_campaign || null,
      utm_content: attribution.utm_content || null,
      utm_term: attribution.utm_term || null,
      utm_id: utmId,
      ad_id: utmId,
      touch_evidence: evidence,
      offer_token: offerToken(),
      page_location: String(window.location.origin || '') + String(window.location.pathname || ''),
      user_agent: navigator.userAgent
    };

    var signature = JSON.stringify(payload);
    var key = hash + ':' + signature;
    if (alreadySent(hash, signature) || pending[hash] || (attempts[key] || 0) >= MAX_ATTEMPTS) {
      return Promise.resolve(false);
    }
    pending[hash] = true;
    attempts[key] = (attempts[key] || 0) + 1;
    var request;
    try {
      request = fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: signature,
        keepalive: true,
        credentials: 'include',
        mode: 'cors'
      });
    } catch (e) {
      pending[hash] = false;
      return Promise.resolve(false);
    }
    return Promise.resolve(request).then(function (response) {
      pending[hash] = false;
      if (!response || !response.ok) return false;
      markSent(hash, signature);
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'checkout_identity_captured',
          capture_transport: 'accepted',
          has_ga_client_id: !!payload.ga_client_id,
          has_fbp: !!payload.fbp,
          has_fbc: !!payload.fbc
        });
      } catch (e) {}
      return true;
    }, function () {
      pending[hash] = false;
      return false;
    });
  }

  var polls = 0;
  var timer = null;

  function tick() {
    timer = null;
    polls += 1;
    var email = currentEmail();
    if (looksLikeEmail(email)) {
      sha256Hex(email).then(function (hash) {
        if (hash) send(hash);
      });
    }
    if (polls < MAX_POLLS) timer = window.setTimeout(tick, POLL_MS);
  }

  timer = window.setTimeout(tick, POLL_MS);
  if (typeof document.addEventListener === 'function') {
    document.addEventListener('input', function () {
      polls = 0;
      if (timer === null) timer = window.setTimeout(tick, POLL_MS);
    }, true);
  }

  window.SnoozeCheckoutIdentity = { send: send, hash: sha256Hex, currentEmail: currentEmail };
})();
