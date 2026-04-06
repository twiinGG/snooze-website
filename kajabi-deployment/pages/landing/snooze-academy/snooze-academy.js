/* ============================================
   SNOOZE ACADEMY - Page Interactions
   Scroll animations for .fade-up elements
   Scoped to #snooze-academy-page
   ============================================ */

(function () {
  'use strict';

  var page = document.getElementById('snooze-academy-page');
  if (!page) return;

  /* ---- Scroll-triggered fade-up animations ---- */
  var fadeElements = page.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: show all elements immediately */
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
