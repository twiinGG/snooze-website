const CAMP_CHECKOUT_CAPACITY_URL = window.CAMP_CAPACITY_FEED_URL ||
  'https://qwwwosoafcsupebpangw.supabase.co/functions/v1/camp-capacity';

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
        response = await fetchImpl(feedUrl + '?limit=3', { signal: controller.signal, headers: { Accept: 'application/json' } });
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
