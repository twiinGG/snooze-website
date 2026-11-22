(function(){
const ready=fn=>{const id='camp-vsl-page';const attempt=()=>{if(document.getElementById(id)){fn();return true}return false};const afterLoad=()=>{if(attempt())return;if(typeof MutationObserver!=='function')return;const obs=new MutationObserver(()=>{if(attempt())obs.disconnect()});obs.observe(document.documentElement,{childList:true,subtree:true})};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',afterLoad);else afterLoad()};
const CAPTIONS="WEBVTT\n\n00:00:00.130 --> 00:00:01.750\nevery morning at seven a.m.,\n\n00:00:01.750 --> 00:00:03.510\nyou'll get a post from me saying,\n\n00:00:03.510 --> 00:00:06.070\ncould we please have your 24-hour sleep logs?\n\n00:00:06.850 --> 00:00:08.790\nBec and I will then go through all of them\n\n00:00:08.790 --> 00:00:11.470\nwith a fine-toothed comb and write back to you\n\n00:00:11.470 --> 00:00:14.270\nwith any notes, suggestions, tweaks, cheerleading,\n\n00:00:14.750 --> 00:00:17.310\na lot of exclamation marks of woo-hoo,\n\n00:00:17.590 --> 00:00:18.510\nlook at that night feed.\n\n00:00:19.750 --> 00:00:21.670\nAll of that, we will put that in there\n\n00:00:21.670 --> 00:00:23.030\nand then we meet at 10 a.m.\n\n00:00:23.530 --> 00:00:25.310\nThen we have our 10 a.m. roll call,\n\n00:00:25.510 --> 00:00:26.590\nwhere we chat to all of you,\n\n00:00:26.670 --> 00:00:28.410\nwe work through one family at a time.\n";
function loadWistia(){
  const src = 'https://fast.wistia.com/assets/external/E-v1.js';
  if (window.Wistia || document.querySelector('script[src*="' + new URL(src).pathname + '"]')) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function startCampStories(root, vsl){
  const section = root.querySelector('#camp-stories');
  if (!section) return;
  const track = section.querySelector('.cs-track');
  const cards = track.querySelectorAll('.cs-card');
  const controls = section.querySelector('.cs-controls');
  const prev = section.querySelector('.cs-prev');
  const next = section.querySelector('.cs-next');

  function syncControls(){
    const maxScroll = track.scrollWidth - track.clientWidth;
    controls.hidden = maxScroll <= 1;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maxScroll - 1;
  }

  function scrollCard(direction){
    const step = cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: step * direction, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  prev.addEventListener('click', () => scrollCard(-1));
  next.addEventListener('click', () => scrollCard(1));
  track.addEventListener('scroll', syncControls, { passive: true });
  window.addEventListener('resize', syncControls);
  syncControls();

  const embeds = Array.from(section.querySelectorAll('.cs-video'));
  const stories = new Map(embeds.map(box => [box.dataset.wistiaId, box.dataset.story]));
  const embedPrefix = 'wistia_async_';
  const vslClass = vsl && Array.from(vsl.classList).find(name => name.startsWith(embedPrefix));
  const vslId = vslClass && vslClass.slice(embedPrefix.length);
  const players = new Set();
  const playedStories = new Set();
  window._wq = window._wq || [];
  window._wq.push({
    id: '_all',
    onReady: function(video){
      const id = video.hashedId();
      const story = stories.get(id);
      if ((!story && id !== vslId) || players.has(video)) return;
      players.add(video);
      video.bind('play', function(){
        players.forEach(other => {
          if (other !== video && other.state() === 'playing') other.pause();
        });
        if (story && !playedStories.has(story)) {
          playedStories.add(story);
          if (window.dataLayer) window.dataLayer.push({ event: 'camp_story_play', story, surface: 'camp_snooze_program' });
        }
      });
    }
  });

  function loadStories(){
    embeds.forEach(box => {
      const id = box.dataset.wistiaId;
      window._wq.push({
        id,
        options: {
          playerColor: '203d34',
          videoFoam: false,
          fitStrategy: 'cover',
          controlsVisibleOnLoad: false,
          playbar: true,
          volumeControl: true,
          fullscreenButton: true,
          settingsControl: false,
          playButton: true,
          playsinline: true,
          muted: false,
          autoPlay: false,
          silentAutoPlay: false,
          plugin: { 'captions-v1': { onByDefault: false }, captions: { onByDefault: false } }
        }
      });
      const embed = document.createElement('div');
      embed.className = 'cs-embed wistia_embed ' + embedPrefix + id;
      box.appendChild(embed);
    });
    loadWistia();
  }

  if (typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      loadStories();
    }, { rootMargin: '600px' });
    observer.observe(section);
  } else {
    loadStories();
  }
}

const start=()=>{const root=document.getElementById('camp-vsl-page');if(!root||root.dataset.campReady)return;root.dataset.campReady='true';const vsl=root.querySelector('.wistia_embed');startCampStories(root,vsl);if(vsl)loadWistia();const track=root.querySelector('[data-camp-captions]');if(track)track.src=URL.createObjectURL(new Blob([CAPTIONS],{type:'text/vtt'}));root.querySelectorAll('.snooze-footer-clean a[href^="/"]').forEach(a=>{a.href=new URL(a.getAttribute('href'),'https://www.joinsnooze.com').href});const logo=root.querySelector('.sf-logo a');if(logo)logo.setAttribute('aria-label','Snooze home');root.querySelectorAll('.sf-heading').forEach(h=>h.setAttribute('aria-level','3'))};
(function () {
  'use strict';

  var CONFIG = {
    storageKey: 'snooze_currency_preference',
    defaultCurrency: 'USD',
    usdCheckoutUrl: 'https://www.joinsnooze.com/offers/K3Y6FEKX/checkout',
    audCheckoutUrl: 'https://www.joinsnooze.com/offers/46Bz9tk6/checkout',
    feedUrl: 'https://qwwwosoafcsupebpangw.supabase.co/functions/v1/camp-capacity',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d3dvc29hZmNzdXBlYnBhbmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzIzODksImV4cCI6MjA2NTkwODM4OX0.YZZoJZ7CZjypFdm5cbUb3UUC1w0bOW2ei2ih8kBTaMQ',
    melbourne: 'Australia/Melbourne',
    callHour: 10,
    callMinutes: 60,
    overnightFrom: 22 * 60,
    overnightTo: 6 * 60,
    waitlistMailto: 'mailto:camp@joinsnooze.com?subject=Camp%20Snooze%20waitlist'
  };

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function currencyFor(stored, timeZone) {
    var pref = stored;
    if (!pref) {
      if (timeZone === undefined) {
        try {
          timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {
          return CONFIG.defaultCurrency;
        }
      }
      pref = (timeZone && timeZone.indexOf('Australia') > -1) ? 'AUD' : 'USD';
    }
    if (pref !== 'USD' && pref !== 'AUD') pref = CONFIG.defaultCurrency;
    return pref;
  }

  function formatPriceNum(num) {
    var n = Math.abs(parseFloat(String(num).replace(/[^0-9.-]/g, '')));
    if (Number.isNaN(n)) return num;
    var hasCents = Math.round(n * 100) % 100 !== 0;
    var s = n.toLocaleString('en-US', {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2
    });
    return num < 0 ? '-' + s : s;
  }

  function priceText(price, period) {
    return '$' + formatPriceNum(price) + (period || '');
  }

  function isAttributionKey(key) {
    return key.indexOf('utm_') === 0 || key === 'fbclid' || key === 'gclid' ||
      key === 'cohort' || key.indexOf('cohort_') === 0;
  }

  function checkoutUrl(currency, cohortNumber, inboundSearch, pageHref) {
    var base = currency === 'AUD' ? CONFIG.audCheckoutUrl : CONFIG.usdCheckoutUrl;
    var destination = new URL(base, pageHref || 'https://www.joinsnooze.com/');
    if (cohortNumber !== undefined && cohortNumber !== null && cohortNumber !== '') {
      destination.searchParams.set('cohort', String(cohortNumber));
    }
    var inbound = new URLSearchParams(inboundSearch || '');
    inbound.forEach(function (value, key) {
      if (isAttributionKey(key) && !destination.searchParams.has(key)) {
        destination.searchParams.set(key, value);
      }
    });
    return destination.toString();
  }

  function zoneOffsetMinutes(timeZone, ms) {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone, hourCycle: 'h23',
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric'
    }).formatToParts(new Date(ms));
    var v = {};
    parts.forEach(function (p) { v[p.type] = parseInt(p.value, 10); });
    var asUtc = Date.UTC(v.year, v.month - 1, v.day, v.hour % 24, v.minute, v.second);
    return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
  }

  function zonedInstant(year, month, day, hour, minute, timeZone) {
    var guess = Date.UTC(year, month - 1, day, hour, minute, 0);
    var first = zoneOffsetMinutes(timeZone, guess);
    var result = guess - first * 60000;
    var second = zoneOffsetMinutes(timeZone, result);
    if (second !== first) result = guess - second * 60000;
    return result;
  }

  function melbourneCallStart(ymd) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(ymd || ''));
    if (!m) return null;
    return zonedInstant(+m[1], +m[2], +m[3], CONFIG.callHour, 0, CONFIG.melbourne);
  }

  function nextMelbourneCallStart(nowMs) {
    var f = fields(nowMs, CONFIG.melbourne);
    var today = zonedInstant(f.year, f.month, f.day, CONFIG.callHour, 0, CONFIG.melbourne);
    if (today > nowMs) return today;
    var next = new Date(Date.UTC(f.year, f.month - 1, f.day + 1));
    return zonedInstant(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate(), CONFIG.callHour, 0, CONFIG.melbourne);
  }

  function fields(ms, timeZone) {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone, hourCycle: 'h23',
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    }).formatToParts(new Date(ms));
    var v = {};
    parts.forEach(function (p) { v[p.type] = parseInt(p.value, 10); });
    var weekday = new Intl.DateTimeFormat('en-AU', { timeZone: timeZone, weekday: 'long' }).format(new Date(ms));
    return {
      year: v.year, month: v.month, day: v.day,
      hour: v.hour % 24, minute: v.minute,
      weekday: weekday,
      dayIndex: Math.floor(Date.UTC(v.year, v.month - 1, v.day) / 86400000)
    };
  }

  function zoneName(timeZone, ms) {
    var locales = ['en-AU', 'en-US', 'en-GB'];
    var fallback = '';
    for (var i = 0; i < locales.length; i++) {
      var name = '';
      try {
        new Intl.DateTimeFormat(locales[i], { timeZone: timeZone, timeZoneName: 'short' })
          .formatToParts(new Date(ms)).forEach(function (p) {
            if (p.type === 'timeZoneName') name = p.value;
          });
      } catch (e) {
        name = '';
      }
      if (name && !/^GMT[+-]/.test(name)) return name;
      if (name && !fallback) fallback = name;
    }
    return fallback;
  }

  function melbourneAbbr(ms) {
    var name = zoneName(CONFIG.melbourne, ms);
    if (name === 'AEDT' || name === 'AEST') return name;
    return zoneOffsetMinutes(CONFIG.melbourne, ms) === 660 ? 'AEDT' : 'AEST';
  }

  function clock(hour, minute) {
    var h12 = hour % 12 || 12;
    return {
      text: minute ? h12 + ':' + pad(minute) : String(h12),
      period: hour >= 12 ? 'pm' : 'am'
    };
  }

  function rangeText(start, end) {
    var a = clock(start.hour, start.minute);
    var b = clock(end.hour, end.minute);
    if (a.period === b.period) return a.text + '–' + b.text + b.period;
    return a.text + a.period + '–' + b.text + b.period;
  }

  function sideText(startMs, endMs, timeZone, mode) {
    var s = fields(startMs, timeZone);
    var e = fields(endMs, timeZone);
    if (mode === 'weekday' && s.dayIndex !== e.dayIndex) {
      var a = clock(s.hour, s.minute);
      var b = clock(e.hour, e.minute);
      return s.weekday + ' ' + a.text + a.period + '–' + e.weekday + ' ' + b.text + b.period;
    }
    var range = rangeText(s, e);
    return mode === 'weekday' ? s.weekday + ' ' + range : range;
  }

  function resolveTimeZone(timeZone) {
    if (timeZone) return timeZone;
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (e) {
      return '';
    }
  }

  function fallbackCall() {
    return { text: '10–11am Melbourne time', melbourneOnly: true, overnight: false, fallback: true };
  }

  function formatCall(startMs, visitorTimeZone, mode) {
    mode = mode || 'weekday';
    try {
      var endMs = startMs + CONFIG.callMinutes * 60000;
      var abbr = melbourneAbbr(startMs);
      var melb = sideText(startMs, endMs, CONFIG.melbourne, mode) + ' Melbourne (' + abbr + ')';
      var tz = resolveTimeZone(visitorTimeZone);
      if (!tz) return { text: melb, melbourneOnly: true, overnight: false, fallback: true };
      var local = fields(startMs, tz);
      var melbF = fields(startMs, CONFIG.melbourne);
      var same = zoneOffsetMinutes(tz, startMs) === zoneOffsetMinutes(CONFIG.melbourne, startMs) &&
        local.dayIndex === melbF.dayIndex;
      if (same) return { text: melb, melbourneOnly: true, overnight: false, fallback: false };
      var minutes = local.hour * 60 + local.minute;
      var overnight = minutes >= CONFIG.overnightFrom || minutes < CONFIG.overnightTo;
      var localText = sideText(startMs, endMs, tz, mode);
      var zone = zoneName(tz, startMs);
      var shift = '';
      if (mode === 'daily') {
        var diff = local.dayIndex - melbF.dayIndex;
        shift = diff < 0 ? ' the day before' : (diff > 0 ? ' the next day' : '');
      }
      var text = localText + (zone ? ' ' + zone : '') + shift + ' (your time) · ' + melb;
      return { text: text, melbourneOnly: false, overnight: overnight, fallback: false };
    } catch (e) {
      return fallbackCall();
    }
  }

  var OVERNIGHT_NOTE = 'That live call is overnight for you. Calls are recorded, and you can post your questions in the forum beforehand.';

  function formatInstantLabel(ms, timeZone) {
    var f = fields(ms, timeZone);
    var c = clock(f.hour, f.minute);
    var minute = pad(f.minute);
    return f.weekday + ' ' + f.day + ' ' + (MONTHS[f.month - 1] || f.month) + ', ' + (f.hour % 12 || 12) + ':' + minute + c.period;
  }

  function closeLabel(value, visitorTimeZone) {
    if (!value) return '';
    try {
      var ms = new Date(value).getTime();
      if (!isFinite(ms)) return '';
      var melb = formatInstantLabel(ms, CONFIG.melbourne) + ' Melbourne (' + melbourneAbbr(ms) + ')';
      var tz = resolveTimeZone(visitorTimeZone);
      if (!tz) return melb;
      if (zoneOffsetMinutes(tz, ms) === zoneOffsetMinutes(CONFIG.melbourne, ms) &&
        fields(ms, tz).dayIndex === fields(ms, CONFIG.melbourne).dayIndex) return melb;
      var zone = zoneName(tz, ms);
      return formatInstantLabel(ms, tz) + (zone ? ' ' + zone : '') + ' (your time) · ' + melb;
    } catch (e) {
      return '';
    }
  }

  function dateLabel(value) {
    if (!value) return 'Dates to be confirmed';
    var parts = new Intl.DateTimeFormat('en-AU', {
      timeZone: CONFIG.melbourne,
      weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'
    }).formatToParts(new Date(value + 'T00:00:00+10:00'));
    function get(type) {
      var part = parts.find(function (p) { return p.type === type; });
      return part ? part.value : '';
    }
    var month = MONTHS[parseInt(get('month'), 10) - 1] || get('month');
    return get('weekday') + ' ' + parseInt(get('day'), 10) + ' ' + month + ' ' + get('year');
  }

  function countdownLabel(value, nowMs) {
    if (!value) return '';
    var remaining = new Date(value).getTime() - nowMs;
    if (!isFinite(remaining) || remaining <= 0) return '';
    var minutes = Math.floor(remaining / 60000);
    if (minutes < 60) return minutes <= 1 ? 'Closing within the hour' : 'Closes in ' + minutes + ' minutes';
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return 'Closes in ' + hours + (hours === 1 ? ' hour' : ' hours');
    var days = Math.floor(hours / 24);
    return 'Closes in ' + days + (days === 1 ? ' day' : ' days');
  }

  function isAvailableState(state) {
    return state === 'open' || state === 'filling' || state === 'low';
  }

  function chooseCohort(cohorts) {
    return cohorts.find(function (cohort) { return isAvailableState(cohort.state); }) || cohorts[0];
  }

  function waitlistTarget(win, doc) {
    win = win || (typeof window !== 'undefined' ? window : {});
    doc = doc || (typeof document !== 'undefined' ? document : null);
    if (win.CAMP_WAITLIST_TARGET) return win.CAMP_WAITLIST_TARGET;
    if (doc && doc.querySelector && doc.querySelector('#waitlist-section')) return '#waitlist-section';
    return CONFIG.waitlistMailto;
  }

  function cohortHtml(cohort, ctx) {
    var now = typeof ctx.nowMs === 'number' ? ctx.nowMs : Date.now();
    var available = isAvailableState(cohort.state);
    var stateLabel = cohort.state === 'filling' ? 'Filling fast' :
      cohort.state === 'low' ? 'Almost full' :
      cohort.state === 'full' ? 'Full' :
      cohort.state === 'closed' ? 'Checkout closed' : 'Open';
    var places = cohort.seats_remaining === 1 ? '1 place left' : 'Only ' + cohort.seats_remaining + ' places left';
    var availability = cohort.state === 'low' ? places :
      cohort.state === 'full' ? 'All 15 places are taken' :
      cohort.state === 'closed' ? 'This intake is closed' : '';
    var closes = closeLabel(cohort.checkout_close_at, ctx.timeZone);
    var countdown = countdownLabel(cohort.checkout_close_at, now);
    var callStart = melbourneCallStart(cohort.start_date);
    var call = callStart ? formatCall(callStart, ctx.timeZone, 'weekday') : null;
    var action = available
      ? '<a class="btn btn-gold dynamic-cta" data-checkout data-cohort="' + esc(cohort.cohort_number) + '" href="' +
        esc(checkoutUrl(ctx.currency, cohort.cohort_number, ctx.search, ctx.pageHref)) + '">Join Camp #' + esc(cohort.cohort_number) + '</a>'
      : '<a class="btn btn-outline" href="' + esc(waitlistTarget(ctx.win, ctx.doc)) + '" data-waitlist-cohort="' + esc(cohort.cohort_number) +
        '">Join Camp #' + esc(cohort.cohort_number) + ' Waitlist</a>';
    return '<article class="cap-card cap-card--' + esc(cohort.state) + '">' +
      '<p class="cap-state">' + stateLabel + '</p>' +
      '<h3>Camp Snooze #' + esc(cohort.cohort_number) + '</h3>' +
      '<p class="cap-line">Starts ' + esc(dateLabel(cohort.start_date)) + '</p>' +
      (call ? '<p class="cap-line" data-camp-first-call>First roll call: ' + esc(call.text) + '</p>' +
        (call.overnight ? '<p class="cap-note" data-camp-overnight>' + OVERNIGHT_NOTE + '</p>' : '') : '') +
      (cohort.access_friday ? '<p class="cap-line">Included Snooze Membership starts ' + esc(dateLabel(cohort.access_friday)) + '</p>' : '') +
      (available && closes ? '<p class="cap-line cap-close">Intake closes ' + esc(closes) + '</p>' : '') +
      (available && countdown ? '<p class="cap-line cap-countdown" data-camp-countdown data-close-at="' + esc(cohort.checkout_close_at) + '">' + esc(countdown) + '</p>' : '') +
      (availability ? '<p class="cap-places">' + availability + '</p>' : '') + action + '</article>';
  }

  function fallbackHtml() {
    return '<div class="cap-card cap-card--neutral"><p>Live availability is taking a moment to update. You can still continue to checkout.</p>' +
      '<a href="' + esc(CONFIG.usdCheckoutUrl) + '" class="btn btn-gold dynamic-cta" data-checkout>Continue to Camp Checkout</a></div>';
  }

  function callLineHtml(nowMs, timeZone) {
    var call = formatCall(nextMelbourneCallStart(nowMs), timeZone, 'daily');
    return { text: 'Roll call runs ' + call.text + '.', overnight: call.overnight };
  }

  function boot() {
    var root = document.getElementById('camp-vsl-page');
    var section = document.getElementById('camp-pricing');
    if (!root || !section || section.getAttribute('data-pricing-ready')) return;
    section.setAttribute('data-pricing-ready', 'true');

    var widget = section.querySelector('[data-camp-capacity-widget]');
    var timer = null;
    var tz = resolveTimeZone('');

    function storage() {
      try { return window.localStorage; } catch (e) { return null; }
    }

    function currentCurrency() {
      return root.classList.contains('currency-mode-aud') ? 'AUD' : 'USD';
    }

    function ctx() {
      return {
        currency: currentCurrency(), search: window.location.search, pageHref: window.location.href,
        timeZone: tz, nowMs: Date.now(), win: window, doc: document
      };
    }

    function updatePrices(currency) {
      root.querySelectorAll('.dynamic-price').forEach(function (el) {
        var price = el.getAttribute('data-' + currency.toLowerCase());
        var period = el.getAttribute('data-period-' + currency.toLowerCase()) || '';
        if (!price) return;
        el.textContent = priceText(price, period);
      });
    }

    function updateLinks(currency) {
      root.querySelectorAll('.dynamic-cta, [data-checkout]').forEach(function (btn) {
        if (!btn.getAttribute('data-original-href')) btn.setAttribute('data-original-href', btn.getAttribute('href') || '');
        btn.setAttribute('href', checkoutUrl(currency, btn.getAttribute('data-cohort'), window.location.search, window.location.href));
      });
    }

    function updateToggle(currency) {
      root.querySelectorAll('.camp-currency-toggle button').forEach(function (btn) {
        var active = btn.getAttribute('data-currency') === currency;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    function setCurrency(currency, save) {
      if (currency !== 'USD' && currency !== 'AUD') currency = CONFIG.defaultCurrency;
      var previous = root.classList.contains('currency-mode-aud') ? 'AUD' : (root.classList.contains('currency-mode-usd') ? 'USD' : null);
      root.classList.remove('currency-mode-usd', 'currency-mode-aud');
      root.classList.add('currency-mode-' + currency.toLowerCase());
      if (save) {
        var store = storage();
        if (store) {
          try { store.setItem(CONFIG.storageKey, currency); } catch (e) {}
        }
      }
      updatePrices(currency);
      updateLinks(currency);
      updateToggle(currency);
      if (save && previous && previous !== currency && window.dataLayer) {
        try {
          window.dataLayer.push({ event: 'currency_change', previous_currency: previous, currency: currency, surface: 'camp_snooze_coaching' });
        } catch (e) {}
      }
    }

    function renderCallLines() {
      var line = callLineHtml(Date.now(), tz);
      root.querySelectorAll('[data-camp-call]').forEach(function (el) {
        var prefix = el.getAttribute('data-prefix') || '';
        el.textContent = prefix + line.text;
      });
      root.querySelectorAll('[data-camp-call-note]').forEach(function (el) {
        el.textContent = line.overnight ? OVERNIGHT_NOTE : '';
        el.hidden = !line.overnight;
      });
    }

    function startCountdown() {
      if (timer) window.clearInterval(timer);
      timer = null;
      var node = widget.querySelector('[data-camp-countdown]');
      if (!node) return;
      timer = window.setInterval(function () {
        var label = countdownLabel(node.getAttribute('data-close-at'), Date.now());
        if (label) {
          node.textContent = label;
          return;
        }
        window.clearInterval(timer);
        timer = null;
        load();
      }, 60000);
    }

    function syncSecure() {
      var source = widget.querySelector('[data-checkout]');
      root.querySelectorAll('[data-camp-secure]').forEach(function (btn) {
        if (source) {
          btn.setAttribute('data-checkout', '');
          if (source.getAttribute('data-cohort')) btn.setAttribute('data-cohort', source.getAttribute('data-cohort'));
          else btn.removeAttribute('data-cohort');
        } else {
          btn.removeAttribute('data-checkout');
          btn.removeAttribute('data-cohort');
          btn.setAttribute('href', '#camp-next');
        }
      });
    }

    function renderCohorts(cohorts) {
      widget.setAttribute('data-capacity-state', 'ready');
      widget.innerHTML = cohortHtml(chooseCohort(cohorts), ctx());
      syncSecure();
      updateLinks(currentCurrency());
      startCountdown();
    }

    function renderFallback() {
      widget.setAttribute('data-capacity-state', 'fallback');
      widget.innerHTML = fallbackHtml();
      syncSecure();
      updateLinks(currentCurrency());
    }

    async function load() {
      var controller = new AbortController();
      var abort = setTimeout(function () { controller.abort(); }, 5000);
      try {
        var response = await window.fetch(CONFIG.feedUrl + '?limit=5', {
          signal: controller.signal,
          headers: { Accept: 'application/json', apikey: CONFIG.anonKey, Authorization: 'Bearer ' + CONFIG.anonKey }
        });
        if (!response.ok) throw new Error('capacity feed returned ' + response.status);
        var body = await response.json();
        if (!body || !Array.isArray(body.cohorts) || body.cohorts.length === 0) throw new Error('capacity feed shape invalid');
        renderCohorts(body.cohorts);
      } catch (error) {
        renderFallback();
      } finally {
        clearTimeout(abort);
      }
    }

    section.querySelectorAll('.camp-currency-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        setCurrency(btn.getAttribute('data-currency'), true);
      });
    });

    var store = storage();
    var stored = null;
    try { stored = store ? store.getItem(CONFIG.storageKey) : null; } catch (e) { stored = null; }
    setCurrency(currencyFor(stored), false);
    renderCallLines();
    load();
  }

  var api = {
    CONFIG: CONFIG,
    OVERNIGHT_NOTE: OVERNIGHT_NOTE,
    currencyFor: currencyFor,
    formatPriceNum: formatPriceNum,
    priceText: priceText,
    checkoutUrl: checkoutUrl,
    zoneOffsetMinutes: zoneOffsetMinutes,
    zonedInstant: zonedInstant,
    melbourneCallStart: melbourneCallStart,
    nextMelbourneCallStart: nextMelbourneCallStart,
    formatCall: formatCall,
    closeLabel: closeLabel,
    dateLabel: dateLabel,
    countdownLabel: countdownLabel,
    chooseCohort: chooseCohort,
    waitlistTarget: waitlistTarget,
    cohortHtml: cohortHtml,
    fallbackHtml: fallbackHtml,
    callLineHtml: callLineHtml,
    boot: boot
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.CampPricing = api;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  }
})();
ready(start);
ready(()=>{if(window.CampPricing&&window.CampPricing.boot)window.CampPricing.boot()});
})();
