/* ============================================
   CAMP SNOOZE V2 - MEMBER-FIRST PRICING
   Modal & Interactive JavaScript

   Paste this into Kajabi: Settings → Website → Custom JavaScript
   (Or into the page's custom JavaScript field)
   ============================================ */

// ============================================
// CURRENCY TOGGLE (AUD/USD) - Camp Snooze only
// ============================================
const CAMP_CURRENCY_CONFIG = {
  storageKey: 'snooze_currency_preference',
  defaultCurrency: 'USD',
  usdCheckoutUrl: 'https://www.joinsnooze.com/offers/K3Y6FEKX/checkout',
  audCheckoutUrl: 'https://www.joinsnooze.com/offers/46Bz9tk6'
};

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

  if (window.dataLayer) {
    try {
      window.dataLayer.push({
        event: 'currency_change',
        currency_preference: currency
      });
    } catch (e) {}
  }
}

function formatPriceNum(num) {
  const n = Math.abs(parseFloat(String(num).replace(/[^0-9.-]/g, '')));
  if (Number.isNaN(n)) return num;
  const s = n >= 1000 ? n.toLocaleString() : String(n);
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
  document.querySelectorAll('.dynamic-cta, [data-checkout]').forEach(function (btn) {
    if (!btn.getAttribute('data-original-href')) {
      btn.setAttribute('data-original-href', btn.getAttribute('href') || '');
    }
    btn.setAttribute('href', url);
  });
}

function campCreateToggle(className) {
  const wrap = document.createElement('div');
  wrap.className = className;
  
  // Inline styles as fallback if CSS not loaded
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
  
  // Inline button styles as fallback
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
    
    // Apply inline active styles as fallback
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
  // Nav toggle (optional - only if nav actions element exists)
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

  // Mobile toggle (optional - only if mobile menu exists)
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

  // Pricing section toggle is now in HTML - just update its UI state
  campUpdateToggleUI(document.body.classList.contains('currency-mode-aud') ? 'AUD' : 'USD');
}

// ============================================
// COUNTDOWN TIMER - Global Configuration
// Deadline: 11:59pm Thursday 6 Feb 2026 AEDT (applications close)
// ============================================
const COUNTDOWN_DEADLINE = new Date('2026-02-06T23:59:00+11:00').getTime();

// ============================================
// MODAL TOGGLE FUNCTION (Global)
// ============================================
function toggleModal(modalId, show) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (show) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    // Focus trap for accessibility
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
    if (firstFocusable) firstFocusable.focus();
  } else {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}

// ============================================
// COUNTDOWN TIMER FUNCTION (Global)
// ============================================
function updateCountdown() {
  const now = new Date().getTime();
  const distance = COUNTDOWN_DEADLINE - now;

  if (distance < 0) {
    // Timer expired
    const heroCountdown = document.getElementById('hero-countdown');
    const stickyCountdown = document.getElementById('sticky-countdown');

    if (heroCountdown) {
      heroCountdown.innerHTML = '<div class="countdown-expired"><i class="fa-solid fa-circle-xmark"></i> Applications are now closed</div>';
    }
    if (stickyCountdown) {
      stickyCountdown.innerHTML = '<span style="color: var(--camp-rust);">Applications closed</span>';
    }
    return false;
  }

  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update hero countdown
  const heroDays = document.getElementById('hero-days');
  const heroHours = document.getElementById('hero-hours');
  const heroMinutes = document.getElementById('hero-minutes');
  const heroSeconds = document.getElementById('hero-seconds');

  if (heroDays) heroDays.textContent = days.toString().padStart(2, '0');
  if (heroHours) heroHours.textContent = hours.toString().padStart(2, '0');
  if (heroMinutes) heroMinutes.textContent = minutes.toString().padStart(2, '0');
  if (heroSeconds) heroSeconds.textContent = seconds.toString().padStart(2, '0');

  // Update sticky countdown
  const stickyCountdown = document.getElementById('sticky-countdown');
  if (stickyCountdown) {
    if (days > 0) {
      stickyCountdown.innerHTML = `<i class="fa-solid fa-clock"></i> <span class="sticky-countdown-value">${days}d ${hours}h</span> left`;
    } else {
      stickyCountdown.innerHTML = `<i class="fa-solid fa-clock"></i> <span class="sticky-countdown-value">${hours}h ${minutes}m</span> left`;
    }
  }

  return true;
}

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // MODAL OVERLAY CLICK TO CLOSE
  // ============================================
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      // Only close if clicking on the overlay itself, not the content
      if (e.target === this) {
        this.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    });
  });

  // ============================================
  // ESCAPE KEY TO CLOSE MODALS
  // ============================================
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.style.display = 'none';
      });
      document.body.classList.remove('modal-open');
    }
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
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

  // ============================================
  // FALLING LEAVES ANIMATION
  // ============================================
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

  // ============================================
  // STICKY CTA WITH COUNTDOWN (Feb 9 intake)
  // ============================================
  (function () {
    const hero = document.querySelector('.camp-section');
    const stickyCTA = document.createElement('div');
    stickyCTA.className = 'sticky-cta';
    stickyCTA.innerHTML = `
      <div class="sticky-cta-content">
        <div style="display: flex; align-items: center; gap: 1rem; width: 100%; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <div>
                <span class="dynamic-price" data-usd="590" data-aud="885" data-period-usd=" USD" data-period-aud=" AUD" style="font-size: 1.125rem; font-weight: 700; color: var(--camp-cream);">$590 USD</span>
              </div>
              <div id="sticky-countdown" class="sticky-countdown">
                <i class="fa-solid fa-clock"></i> <span class="sticky-countdown-value">--</span> left
              </div>
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

  // ============================================
  // CURRENCY TOGGLE INIT (after sticky CTA so it gets updated)
  // ============================================
  campInitCurrency();

  // ============================================
  // START COUNTDOWN TIMER (applications close Feb 6)
  // ============================================
  (function () {
    updateCountdown();
    const countdownInterval = setInterval(function () {
      const stillRunning = updateCountdown();
      if (!stillRunning) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  })();

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
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

  // ============================================
  // TRACK MODAL OPENS (Optional Analytics)
  // ============================================
  // Uncomment and customize if you have analytics
  /*
  document.querySelectorAll('[onclick*="toggleModal"]').forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      // Track event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'modal_open', {
          'modal_name': modalId
        });
      }
    });
  });
  */

});
