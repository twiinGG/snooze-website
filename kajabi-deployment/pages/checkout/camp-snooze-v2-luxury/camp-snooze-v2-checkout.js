const CAMP_CHECKOUT_CAPACITY_URL = window.CAMP_CAPACITY_FEED_URL ||
  'https://qwwwosoafcsupebpangw.supabase.co/functions/v1/camp-capacity';

// Public Supabase anon key, safe to ship in a pasted page (RLS-scoped, not a service-role secret).
const CAMP_CHECKOUT_ANON_KEY = window.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d3dvc29hZmNzdXBlYnBhbmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzIzODksImV4cCI6MjA2NTkwODM4OX0.YZZoJZ7CZjypFdm5cbUb3UUC1w0bOW2ei2ih8kBTaMQ'; // pragma: allowlist secret

// This same HTML+JS pair is pasted verbatim onto four checkout pages (regular USD/AUD, member USD/AUD;
// see PASTE-MAP.md P3-CAMP-CHECKOUT-HTML and P3-CAMP-MEMBER-CHECKOUT-HTML, "paste to both currency
// twins"). Before this block existed, every `.dynamic-price` span rendered its hardcoded fallback text
// and the `.currency` label was a static "USD" string, so the AUD checkout pages showed the USD number
// and label regardless of which offer a buyer was actually completing. This detects currency from the
// offer identifier in the page's own URL (the same short-code pattern the landing page already keys its
// checkout links off) and re-renders every price and currency label from data-usd/data-aud, matching how
// the landing page's campUpdatePrices() already works.
const CAMP_CHECKOUT_CURRENCY_CONFIG = {
  audOfferKeys: ['46Bz9tk6', 'ENhg45mj'],
  usdOfferKeys: ['K3Y6FEKX', 'rVuLzkZa'],
  defaultCurrency: 'USD',
  memberCheckoutUrl: {
    USD: 'https://www.joinsnooze.com/offers/rVuLzkZa/checkout',
    AUD: 'https://www.joinsnooze.com/offers/ENhg45mj/checkout'
  }
};

function campCheckoutDetectCurrency() {
  const href = window.location.href;
  if (CAMP_CHECKOUT_CURRENCY_CONFIG.audOfferKeys.some(function (key) { return href.indexOf(key) > -1; })) return 'AUD';
  if (CAMP_CHECKOUT_CURRENCY_CONFIG.usdOfferKeys.some(function (key) { return href.indexOf(key) > -1; })) return 'USD';
  return CAMP_CHECKOUT_CURRENCY_CONFIG.defaultCurrency;
}

function campCheckoutFormatPriceNum(num) {
  const n = Math.abs(parseFloat(String(num).replace(/[^0-9.-]/g, '')));
  if (Number.isNaN(n)) return num;
  // Same rule as the landing formatter: cents only when the amount has them, so 39.5 renders as 39.50
  // rather than 39.5, and 690 stays 690.
  const hasCents = Math.round(n * 100) % 100 !== 0;
  return n.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  });
}

function campCheckoutRenderCurrency(currency) {
  document.querySelectorAll('#snooze-custom-checkout .dynamic-price').forEach(function (el) {
    const price = el.getAttribute('data-' + currency.toLowerCase());
    if (!price) return;
    el.textContent = '$' + campCheckoutFormatPriceNum(price);
  });
  document.querySelectorAll('#snooze-custom-checkout .currency').forEach(function (el) {
    el.textContent = currency;
  });
  document.querySelectorAll('#snooze-custom-checkout [data-member-checkout]').forEach(function (el) {
    el.setAttribute('href', CAMP_CHECKOUT_CURRENCY_CONFIG.memberCheckoutUrl[currency] || CAMP_CHECKOUT_CURRENCY_CONFIG.memberCheckoutUrl.USD);
  });
}

window.CampCheckoutCapacity = (function () {
  function fallback(root) {
    root.dataset.capacityState = 'fallback';
    root.innerHTML = '<strong>Camp availability</strong><span>Live availability is taking a moment to update. You can still continue with checkout.</span>';
  }

  function chooseCohort(cohorts) {
    const requested = Number(new URLSearchParams(window.location.search || '').get('cohort'));
    if (requested) {
      const match = cohorts.find(function (cohort) { return cohort.cohort_number === requested; });
      if (match) return match;
    }
    return cohorts.find(function (cohort) { return cohort.state === 'open' || cohort.state === 'filling'; }) || cohorts[0];
  }

  function render(root, cohort) {
    root.dataset.capacityState = cohort.state;
    const start = cohort.start_date
      ? new Intl.DateTimeFormat('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(cohort.start_date + 'T00:00:00+10:00'))
      : 'date to be confirmed';
    if (cohort.state === 'full' || cohort.state === 'closed') {
      root.innerHTML = '<strong>Camp Snooze #' + cohort.cohort_number + ' is ' + cohort.state + '</strong>' +
        '<span>Starts ' + start + '. Join the waitlist before completing checkout.</span>' +
        '<a href="https://www.joinsnooze.com/camp-snooze#waitlist-section">Join the Waitlist</a>';
      return;
    }
    root.innerHTML = '<strong>Camp Snooze #' + cohort.cohort_number + '</strong>' +
      '<span>Starts ' + start + '. ' + cohort.seats_remaining + ' of 15 places remain.</span>';
  }

  async function init(root, options) {
    if (!root) return 'missing';
    const settings = options || {};
    const fetchImpl = settings.fetchImpl || window.fetch.bind(window);
    const feedUrl = settings.feedUrl || CAMP_CHECKOUT_CAPACITY_URL;
    const timeoutMs = settings.timeoutMs || 5000;
    try {
      const controller = new AbortController();
      const timer = setTimeout(function () { controller.abort(); }, timeoutMs);
      let response;
      try {
        response = await fetchImpl(feedUrl + '?limit=3', { signal: controller.signal, headers: { Accept: 'application/json', apikey: CAMP_CHECKOUT_ANON_KEY, Authorization: 'Bearer ' + CAMP_CHECKOUT_ANON_KEY } });
      } finally {
        clearTimeout(timer);
      }
      if (!response.ok) throw new Error('capacity feed failed');
      const body = await response.json();
      if (!body || !Array.isArray(body.cohorts) || body.cohorts.length === 0) throw new Error('capacity feed shape invalid');
      render(root, chooseCohort(body.cohorts));
      return 'ready';
    } catch (error) {
      fallback(root);
      return 'fallback';
    }
  }

  return { init: init, fallback: fallback };
})();

document.addEventListener('DOMContentLoaded', function() {

  campCheckoutRenderCurrency(campCheckoutDetectCurrency());

  window.CampCheckoutCapacity.init(document.querySelector('[data-camp-checkout-capacity]'));

  (function() {
    const existingLink = document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]');

    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='; // pragma: allowlist secret
      link.crossOrigin = 'anonymous';
      link.referrerPolicy = 'no-referrer';
      document.head.appendChild(link);
    }
  })();

  const scrollButtons = document.querySelectorAll('.scroll-to-checkout');

  scrollButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const checkoutForm = document.querySelector('.checkout-form, .kjb-checkout, form[action*="checkout"], .checkout-container, #checkout-form');

      if (checkoutForm) {
        const headerOffset = 100;
        const elementPosition = checkoutForm.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        setTimeout(() => {
          const firstInput = checkoutForm.querySelector('input:not([type="hidden"])');
          if (firstInput) firstInput.focus();
        }, 500);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });

  (function() {
    const mobileCTA = document.querySelector('.mobile-scroll-to-checkout');
    const checkoutForm = document.querySelector('.checkout-form, .kjb-checkout, form[action*="checkout"], .checkout-container');

    if (mobileCTA && checkoutForm) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            mobileCTA.style.transform = 'translateY(100%)';
            mobileCTA.style.opacity = '0';
          } else {
            mobileCTA.style.transform = 'translateY(0)';
            mobileCTA.style.opacity = '1';
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });

      mobileCTA.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

      observer.observe(checkoutForm);
    }
  })();

  (function() {
    const trustItems = document.querySelectorAll('#snooze-custom-checkout .trust-item');

    trustItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 200 + (index * 100));
    });
  })();

  (function() {
    const orderCard = document.querySelector('#snooze-custom-checkout .order-summary-card');

    if (orderCard) {
      orderCard.style.opacity = '0';
      orderCard.style.transform = 'translateY(20px)';
      orderCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      setTimeout(() => {
        orderCard.style.opacity = '1';
        orderCard.style.transform = 'translateY(0)';
      }, 100);
    }
  })();

  const upgradeLink = document.querySelector('#snooze-custom-checkout .upgrade-link');

  if (upgradeLink) {
    upgradeLink.addEventListener('mouseenter', function() {
      this.style.color = '#1e3a0f';
    });

    upgradeLink.addEventListener('mouseleave', function() {
      this.style.color = '';
    });
  }

});
