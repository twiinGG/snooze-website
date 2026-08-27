const CAMP_CURRENCY_CONFIG = {
  storageKey: 'snooze_currency_preference',
  defaultCurrency: 'USD',
  usdCheckoutUrl: 'https://www.joinsnooze.com/offers/K3Y6FEKX/checkout',
  
  audCheckoutUrl: 'https://www.joinsnooze.com/offers/46Bz9tk6/checkout'
};

const CAMP_CAPACITY_FEED_URL = window.CAMP_CAPACITY_FEED_URL ||
  'https://qwwwosoafcsupebpangw.supabase.co/functions/v1/camp-capacity';

function waitlistTarget() {
  const override = window.CAMP_WAITLIST_TARGET;
  if (override) return override;
  
  if (document.querySelector('#waitlist-section')) return '#waitlist-section';
  return 'mailto:camp@joinsnooze.com?subject=Camp%20Snooze%20waitlist';
}

const CAMP_CAPACITY_ANON_KEY = window.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d3dvc29hZmNzdXBlYnBhbmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzIzODksImV4cCI6MjA2NTkwODM4OX0.YZZoJZ7CZjypFdm5cbUb3UUC1w0bOW2ei2ih8kBTaMQ'; 

window.CampCapacityWidget = (function () {
  
  const CAMP_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  function dateLabel(value) {
    if (!value) return 'Dates to be confirmed';
    const parts = new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Etc/GMT-10',
      weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'
    }).formatToParts(new Date(value + 'T00:00:00+10:00'));
    const get = function (type) {
      const part = parts.find(function (p) { return p.type === type; });
      return part ? part.value : '';
    };
    const monthIndex = parseInt(get('month'), 10) - 1;
    const month = CAMP_MONTHS[monthIndex] || get('month');
    return get('weekday') + ' ' + parseInt(get('day'), 10) + ' ' + month + ' ' + get('year');
  }

  function checkoutUrl(cohortNumber) {
    const currency = document.body.classList.contains('currency-mode-aud') ? 'AUD' : 'USD';
    const base = currency === 'AUD' ? CAMP_CURRENCY_CONFIG.audCheckoutUrl : CAMP_CURRENCY_CONFIG.usdCheckoutUrl;
    const url = new URL(base, window.location.href);
    url.searchParams.set('cohort', String(cohortNumber));
    return url.toString();
  }

  function renderFallback(root) {
    root.dataset.capacityState = 'fallback';
    renderHeroNext(null);
    root.innerHTML = '<div class="camp-capacity-neutral"><p>Live availability is taking a moment to update. You can still continue to checkout.</p>' +
      '<a href="' + CAMP_CURRENCY_CONFIG.usdCheckoutUrl + '" class="btn-camp dynamic-cta" data-checkout>Continue to Camp Checkout</a></div>';
    const currency = document.body.classList.contains('currency-mode-aud') ? 'AUD' : 'USD';
    campUpdateLinks(currency);
  }

  function closeLabel(value) {
    if (!value) return '';
    const parts = new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Etc/GMT-10',
      weekday: 'long', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true
    }).formatToParts(new Date(value));
    const get = function (type) {
      const part = parts.find(function (p) { return p.type === type; });
      return part ? part.value : '';
    };
    const month = CAMP_MONTHS[parseInt(get('month'), 10) - 1] || get('month');
    const period = (get('dayPeriod') || '').toLowerCase().replace(/\s|\./g, '');
    return get('weekday') + ' ' + parseInt(get('day'), 10) + ' ' + month +
      ', ' + parseInt(get('hour'), 10) + ':' + get('minute') + period + ' AEST';
  }

  function countdownLabel(value, nowMs) {
    if (!value) return '';
    const remaining = new Date(value).getTime() - nowMs;
    if (!isFinite(remaining) || remaining <= 0) return '';
    const minutes = Math.floor(remaining / 60000);
    if (minutes < 60) return minutes <= 1 ? 'Closing within the hour' : 'Closes in ' + minutes + ' minutes';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return 'Closes in ' + hours + (hours === 1 ? ' hour' : ' hours');
    const days = Math.floor(hours / 24);
    return 'Closes in ' + days + (days === 1 ? ' day' : ' days');
  }

  function chooseCohort(cohorts) {
    return cohorts.find(function (cohort) {
      return cohort.state === 'open' || cohort.state === 'filling' || cohort.state === 'low';
    }) || cohorts[0];
  }

  function renderHeroNext(cohort) {
    if (typeof document.querySelector !== 'function') return;
    const host = document.querySelector('[data-camp-hero-next]');
    if (!host) return;
    const target = host.querySelector ? host.querySelector('[data-camp-hero-next-date]') : null;
    if (!cohort || !cohort.start_date || !target) {
      host.hidden = true;
      return;
    }
    target.textContent = 'Next Camp starts on ' + dateLabel(cohort.start_date);
    host.hidden = false;
  }

  function renderCohorts(root, cohorts, nowMs) {
    root.dataset.capacityState = 'ready';
    const cohort = chooseCohort(cohorts);
    const now = typeof nowMs === 'number' ? nowMs : Date.now();
    
    const isAvailable = cohort.state === 'open' || cohort.state === 'filling' || cohort.state === 'low';
    const stateLabel = cohort.state === 'filling' ? 'Filling fast' :
      cohort.state === 'low' ? 'Almost full' :
      cohort.state === 'full' ? 'Full' :
      cohort.state === 'closed' ? 'Checkout closed' : 'Open';
    const places = cohort.seats_remaining === 1 ? '1 place left' : 'Only ' + cohort.seats_remaining + ' places left';
    const availability = cohort.state === 'low' ? places :
      cohort.state === 'full' ? 'All 15 places are taken' :
      cohort.state === 'closed' ? 'This intake is closed' : '';
    const closes = closeLabel(cohort.checkout_close_at);
    const countdown = countdownLabel(cohort.checkout_close_at, now);
    const action = isAvailable
      ? '<a class="btn-camp dynamic-cta" data-checkout data-cohort="' + cohort.cohort_number + '" href="' + checkoutUrl(cohort.cohort_number) + '">Join Camp #' + cohort.cohort_number + '</a>'
      : '<a class="btn-camp btn-outline" href="' + waitlistTarget() + '" data-waitlist-cohort="' + cohort.cohort_number + '">Join Camp #' + cohort.cohort_number + ' Waitlist</a>';
    root.innerHTML = '<article class="camp-capacity-card camp-capacity-card--' + cohort.state + '">' +
      '<p class="camp-capacity-state">' + stateLabel + '</p>' +
      '<h3>Camp Snooze #' + cohort.cohort_number + '</h3>' +
      '<p class="camp-capacity-date">Starts ' + dateLabel(cohort.start_date) + '</p>' +
      
      (cohort.access_friday ? '<p class="camp-capacity-access">Snooze access opens ' + dateLabel(cohort.access_friday) + '</p>' : '') +
      (isAvailable && closes ? '<p class="camp-capacity-close">Intake closes ' + closes + '</p>' : '') +
      (isAvailable && countdown ? '<p class="camp-capacity-countdown" data-camp-countdown data-close-at="' + cohort.checkout_close_at + '">' + countdown + '</p>' : '') +
      (availability ? '<p class="camp-capacity-places">' + availability + '</p>' : '') + action + '</article>';

    renderHeroNext(cohort);
    startCountdown(root);
    const currency = document.body.classList.contains('currency-mode-aud') ? 'AUD' : 'USD';
    campUpdateLinks(currency);

    root.querySelectorAll('[data-waitlist-cohort]').forEach(function (link) {
      link.addEventListener('click', function () {
        const select = document.querySelector('[data-camp-waitlist-form] select[name="preferred_cohort"]');
        if (select) select.value = link.getAttribute('data-waitlist-cohort');
      });
    });
  }

  function startCountdown(root) {
    if (typeof root.querySelector !== 'function' || typeof window.setInterval !== 'function') return;
    if (root.campCountdownTimer) window.clearInterval(root.campCountdownTimer);
    const node = root.querySelector('[data-camp-countdown]');
    if (!node) return;
    root.campCountdownTimer = window.setInterval(function () {
      const label = countdownLabel(node.getAttribute('data-close-at'), Date.now());
      if (label) {
        node.textContent = label;
        return;
      }
      
      window.clearInterval(root.campCountdownTimer);
      root.campCountdownTimer = null;
      init(root);
    }, 60000);
  }

  async function init(root, options) {
    if (!root) return 'missing';
    const settings = options || {};
    const fetchImpl = settings.fetchImpl || window.fetch.bind(window);
    const feedUrl = settings.feedUrl || CAMP_CAPACITY_FEED_URL;
    const timeoutMs = settings.timeoutMs || 5000;
    try {
      const controller = new AbortController();
      const timer = setTimeout(function () { controller.abort(); }, timeoutMs);
      let response;
      try {
        
        response = await fetchImpl(feedUrl + '?limit=5', { signal: controller.signal, headers: { Accept: 'application/json', apikey: CAMP_CAPACITY_ANON_KEY, Authorization: 'Bearer ' + CAMP_CAPACITY_ANON_KEY } });
      } finally {
        clearTimeout(timer);
      }
      if (!response.ok) throw new Error('capacity feed returned ' + response.status);
      const body = await response.json();
      if (!body || !Array.isArray(body.cohorts) || body.cohorts.length === 0) throw new Error('capacity feed shape invalid');
      renderCohorts(root, body.cohorts, settings.nowMs);
      return 'ready';
    } catch (error) {
      renderFallback(root);
      return 'fallback';
    }
  }

  async function submitWaitlist(form) {
    const status = form.querySelector('[data-camp-waitlist-status]');
    const button = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      preferred_cohort: Number(data.get('preferred_cohort'))
    };
    if (button) button.disabled = true;
    if (status) status.textContent = 'Joining the waitlist.';
    try {
      const response = await window.fetch(CAMP_CAPACITY_FEED_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Waitlist unavailable');
      if (status) status.textContent = body.status === 'already_joined'
        ? 'You are already on this Camp waitlist.'
        : 'You are on the waitlist. Check your inbox for the next step.';
      if (body.status === 'joined') form.reset();
    } catch (error) {
      if (status) status.textContent = 'We could not join the waitlist just now. Email hello@joinsnooze.com and we will help.';
    } finally {
      if (button) button.disabled = false;
    }
  }

  return { init: init, renderFallback: renderFallback, submitWaitlist: submitWaitlist };
})();

function safeLocalStorage() {
  try {
    return localStorage;
  } catch (e) {
    return null;
  }
}

function campSetCurrency(currency, save) {
  if (currency !== 'USD' && currency !== 'AUD') {
    currency = CAMP_CURRENCY_CONFIG.defaultCurrency;
  }
  const previousCurrency = document.body.classList.contains('currency-mode-aud')
    ? 'AUD'
    : (document.body.classList.contains('currency-mode-usd') ? 'USD' : null);
  document.body.classList.remove('currency-mode-usd', 'currency-mode-aud');
  document.body.classList.add('currency-mode-' + currency.toLowerCase());

  if (save) {
    const storage = safeLocalStorage();
    if (storage) {
      try {
        storage.setItem(CAMP_CURRENCY_CONFIG.storageKey, currency);
      } catch (e) {}
    }
  }

  campUpdatePrices(currency);
  campUpdateLinks(currency);
  campUpdateToggleUI(currency);
  document.body.classList.add('currency-loaded');

  if (save && previousCurrency && previousCurrency !== currency && window.dataLayer) {
    try {
      window.dataLayer.push({
        event: 'currency_change',
        previous_currency: previousCurrency,
        currency: currency,
        surface: 'camp_snooze_sleep_coaching'
      });
    } catch (e) {}
  }
}

function formatPriceNum(num) {
  const n = Math.abs(parseFloat(String(num).replace(/[^0-9.-]/g, '')));
  if (Number.isNaN(n)) return num;
  
  const hasCents = Math.round(n * 100) % 100 !== 0;
  const s = n.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  });
  return num < 0 ? '-' + s : s;
}

function campUpdatePrices(currency) {
  document.querySelectorAll('.dynamic-price').forEach(function (el) {
    const price = el.getAttribute('data-' + currency.toLowerCase());
    const period = el.getAttribute('data-period-' + currency.toLowerCase()) || '';
    if (!price) return;
    const formatted = formatPriceNum(price);
    el.textContent = '$' + formatted + period;
  });
}

function campUpdateLinks(currency) {
  const url = currency === 'AUD' ? CAMP_CURRENCY_CONFIG.audCheckoutUrl : CAMP_CURRENCY_CONFIG.usdCheckoutUrl;
  const inbound = new URL(window.location.href).searchParams;
  document.querySelectorAll('.dynamic-cta, [data-checkout]').forEach(function (btn) {
    if (!btn.getAttribute('data-original-href')) {
      btn.setAttribute('data-original-href', btn.getAttribute('href') || '');
    }
    const destination = new URL(url, window.location.href);
    const cohort = btn.getAttribute('data-cohort');
    if (cohort) destination.searchParams.set('cohort', cohort);

    inbound.forEach(function (value, key) {
      const preserve = key.indexOf('utm_') === 0 ||
        key === 'fbclid' || key === 'gclid' ||
        key === 'cohort' || key.indexOf('cohort_') === 0;
      if (preserve && !destination.searchParams.has(key)) {
        destination.searchParams.set(key, value);
      }
    });

    btn.setAttribute('href', destination.toString());
  });
}

function campCreateToggle(className) {
  const wrap = document.createElement('div');
  wrap.className = className;

  const isPricingToggle = className.indexOf('camp-currency-toggle') === 0 && className.indexOf('nav') === -1;
  if (isPricingToggle) {
    wrap.style.cssText = 'display:inline-flex;border:2px solid hsl(140,25%,75%);border-radius:9999px;overflow:hidden;background:rgba(255,255,255,0.15);padding:4px;';
  }

  const usdBtn = document.createElement('button');
  usdBtn.type = 'button';
  usdBtn.setAttribute('data-currency', 'USD');
  usdBtn.setAttribute('aria-label', 'US Dollar');

  const audBtn = document.createElement('button');
  audBtn.type = 'button';
  audBtn.setAttribute('data-currency', 'AUD');
  audBtn.setAttribute('aria-label', 'Australian Dollar');

  const btnStyle = isPricingToggle
    ? 'padding:0.6rem 1.25rem;border:none;background:transparent;color:hsl(42,33%,96%);font-family:DM Sans,sans-serif;font-size:0.95rem;font-weight:600;cursor:pointer;border-radius:9999px;display:inline-flex;align-items:center;gap:0.4rem;'
    : 'padding:0.4rem 0.75rem;border:none;background:transparent;color:hsl(150,35%,25%);font-family:DM Sans,sans-serif;font-size:0.8rem;font-weight:500;cursor:pointer;';
  usdBtn.style.cssText = btnStyle;
  audBtn.style.cssText = btnStyle;

  usdBtn.innerHTML = '<span style="font-size:1.1em;">🇺🇸</span> USD';
  audBtn.innerHTML = '<span style="font-size:1.1em;">🇦🇺</span> AUD';

  function onToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    const cur = document.body.classList.contains('currency-mode-aud') ? 'AUD' : 'USD';
    campSetCurrency(cur === 'AUD' ? 'USD' : 'AUD', true);
  }
  usdBtn.addEventListener('click', onToggle);
  audBtn.addEventListener('click', onToggle);
  wrap.appendChild(usdBtn);
  wrap.appendChild(audBtn);
  return wrap;
}

function campUpdateToggleUI(currency) {
  document.querySelectorAll('.camp-currency-toggle button, .camp-nav-currency-toggle button, .sticky-currency-toggle button').forEach(function (btn) {
    const c = btn.getAttribute('data-currency');
    const isActive = c === currency;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

    const isNavBtn = btn.closest('.camp-nav-currency-toggle');
    const isStickyBtn = btn.closest('.sticky-currency-toggle');
    const isPricingBtn = btn.closest('.camp-currency-toggle') && !isNavBtn && !isStickyBtn;

    if (isPricingBtn || isStickyBtn) {
      if (isActive) {
        btn.style.background = 'hsl(38,70%,55%)';
        btn.style.color = 'hsl(150,35%,25%)';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'hsl(42,33%,96%)';
      }
    } else if (isNavBtn) {
      if (isActive) {
        btn.style.background = 'hsl(150,35%,25%)';
        btn.style.color = 'hsl(42,33%,96%)';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'hsl(150,35%,25%)';
      }
    }
  });
}

function campInitCurrency() {
  const storage = safeLocalStorage();
  let pref = storage ? storage.getItem(CAMP_CURRENCY_CONFIG.storageKey) : null;
  if (!pref) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      pref = (tz && tz.indexOf('Australia') > -1) ? 'AUD' : 'USD';
    } catch (e) {
      pref = CAMP_CURRENCY_CONFIG.defaultCurrency;
    }
  }
  if (pref !== 'USD' && pref !== 'AUD') {
    pref = CAMP_CURRENCY_CONFIG.defaultCurrency;
  }
  campSetCurrency(pref, false);
  campInjectToggles();
}

function campInjectToggles() {
  const navSelectors = ['.navbar .sn-actions', '.navbar nav', '.sn-nav-actions', '[class*="nav-actions"]'];
  let navActions = null;
  for (let i = 0; i < navSelectors.length; i++) {
    navActions = document.querySelector(navSelectors[i]);
    if (navActions) break;
  }
  if (navActions && !document.querySelector('.camp-nav-currency-toggle')) {
    const toggle = campCreateToggle('camp-nav-currency-toggle');
    navActions.appendChild(toggle);
  }

  const mobileSelectors = ['.sn-mobile-inner', '.mobile-menu', '[class*="mobile-menu"]'];
  let mobileMenu = null;
  for (let i = 0; i < mobileSelectors.length; i++) {
    mobileMenu = document.querySelector(mobileSelectors[i]);
    if (mobileMenu) break;
  }
  if (mobileMenu && !document.querySelector('.mobile-camp-currency-toggle')) {
    const toggle = campCreateToggle('camp-nav-currency-toggle mobile-camp-currency-toggle');
    toggle.style.marginTop = '20px';
    toggle.style.width = '100%';
    toggle.style.justifyContent = 'center';
    mobileMenu.appendChild(toggle);
  }

  campUpdateToggleUI(document.body.classList.contains('currency-mode-aud') ? 'AUD' : 'USD');
}

const COUNTDOWN_DEADLINE = new Date('2026-03-31T23:59:00+11:00').getTime();

function toggleModal(modalId, show) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (show) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
    if (firstFocusable) firstFocusable.focus();
  } else {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = COUNTDOWN_DEADLINE - now;

  if (distance < 0) {
    const heroCountdown = document.getElementById('hero-countdown');

    if (heroCountdown) {
      heroCountdown.innerHTML = '<div class="countdown-expired"><i class="fa-solid fa-circle-xmark"></i> Applications are now closed</div>';
    }
    return false;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const heroDays = document.getElementById('hero-days');
  const heroHours = document.getElementById('hero-hours');
  const heroMinutes = document.getElementById('hero-minutes');
  const heroSeconds = document.getElementById('hero-seconds');

  if (heroDays) heroDays.textContent = days.toString().padStart(2, '0');
  if (heroHours) heroHours.textContent = hours.toString().padStart(2, '0');
  if (heroMinutes) heroMinutes.textContent = minutes.toString().padStart(2, '0');
  if (heroSeconds) heroSeconds.textContent = seconds.toString().padStart(2, '0');

  return true;
}

document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.style.display = 'none';
      });
      document.body.classList.remove('modal-open');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  (function () {
    const containers = document.querySelectorAll('.falling-leaves');
    containers.forEach(container => {
      const count = 12;
      for (let i = 0; i < count; i++) {
        const leaf = document.createElement('div');
        leaf.style.position = 'absolute';
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.top = '-30px';
        leaf.style.width = (12 + Math.random() * 10) + 'px';
        leaf.style.height = leaf.style.width;
        leaf.style.opacity = '0.3';
        leaf.style.color = 'var(--camp-forest)';
        leaf.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7 2 3 7 3 12c0 3 2 5 4 6l5-8 5 8c2-1 4-3 4-6 0-5-4-10-9-10z" fill="currentColor"/></svg>';

        const duration = 8 + Math.random() * 6;
        const delay = Math.random() * 10;
        leaf.style.animation = `leafFall ${duration}s linear ${delay}s infinite`;

        container.appendChild(leaf);
      }
    });
  })();

  const isWaitlistMode = window.CAMP_PAGE_MODE === 'waitlist';

  const capacityRoot = document.querySelector('[data-camp-capacity-widget]');
  window.CampCapacityWidget.init(capacityRoot);
  const waitlistForm = document.querySelector('[data-camp-waitlist-form]');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (event) {
      event.preventDefault();
      window.CampCapacityWidget.submitWaitlist(waitlistForm);
    });
  }

  (function () {
    const hero = document.querySelector('.camp-section');
    const stickyCTA = document.createElement('div');
    stickyCTA.className = 'sticky-cta';
    if (isWaitlistMode) {
      stickyCTA.innerHTML = `
        <div class="sticky-cta-content">
          <div style="display: flex; align-items: center; justify-content: center; width: 100%;">
            <a href="#waitlist-section" class="btn-camp btn-camp-cta" style="padding: 0.75rem 1.5rem; font-size: 1rem; text-decoration: none;">
              Join the Waitlist
            </a>
          </div>
        </div>
      `;
    } else {
      stickyCTA.innerHTML = `
        <div class="sticky-cta-content">
          <div style="display: flex; align-items: center; gap: 1rem; width: 100%; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div>
                <span class="dynamic-price" data-usd="690" data-aud="997" data-period-usd=" USD" data-period-aud=" AUD" style="font-size: 1.125rem; font-weight: 700; color: var(--camp-cream);">$690 USD</span>
              </div>
              <div class="sticky-currency-toggle camp-currency-toggle" style="display: inline-flex; border: 1px solid hsl(140,25%,60%); border-radius: 6px; overflow: hidden; background: rgba(255,255,255,0.1); padding: 2px;">
                <button type="button" data-currency="USD" aria-label="US Dollar" onclick="campSetCurrency('USD', true)" style="padding: 0.25rem 0.5rem; border: none; background: transparent; color: hsl(42,33%,96%); font-family: DM Sans, sans-serif; font-size: 0.7rem; font-weight: 600; cursor: pointer; border-radius: 4px;">USD</button>
                <button type="button" data-currency="AUD" aria-label="Australian Dollar" onclick="campSetCurrency('AUD', true)" style="padding: 0.25rem 0.5rem; border: none; background: transparent; color: hsl(42,33%,96%); font-family: DM Sans, sans-serif; font-size: 0.7rem; font-weight: 600; cursor: pointer; border-radius: 4px;">AUD</button>
              </div>
            </div>
            <a href="https://www.joinsnooze.com/offers/K3Y6FEKX/checkout" class="btn-camp btn-camp-cta dynamic-cta" data-checkout style="padding: 0.75rem 1.5rem; font-size: 1rem; text-decoration: none;">
              Join Camp
            </a>
          </div>
        </div>
      `;
    }
    document.body.appendChild(stickyCTA);

    if (hero) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            stickyCTA.classList.add('show');
          } else {
            stickyCTA.classList.remove('show');
          }
        });
      }, { threshold: 0.1 });

      observer.observe(hero);
    }
  })();

  campInitCurrency();

  if (!isWaitlistMode) {
    (function () {
      updateCountdown();
      const countdownInterval = setInterval(function () {
        const stillRunning = updateCountdown();
        if (!stillRunning) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    })();
  }

  (function () {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  })();

});
