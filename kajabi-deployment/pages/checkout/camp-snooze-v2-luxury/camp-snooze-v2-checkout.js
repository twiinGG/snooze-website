/* ============================================
   CAMP SNOOZE V2 - CHECKOUT PAGE JAVASCRIPT
   Unified JS for both Member Bundle & Standalone checkouts

   Paste this into Kajabi: Settings → Website → Custom JavaScript
   (Or into the page's custom JavaScript field)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // ENSURE FONT AWESOME IS LOADED (Fallback)
  // ============================================
  (function() {
    // Check if Font Awesome stylesheet is already loaded
    const existingLink = document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]');
    
    if (!existingLink) {
      // Inject Font Awesome if not already loaded
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='; // pragma: allowlist secret
      link.crossOrigin = 'anonymous';
      link.referrerPolicy = 'no-referrer';
      document.head.appendChild(link);
    }
  })();

  // ============================================
  // SCROLL TO CHECKOUT BUTTON
  // ============================================
  const scrollButtons = document.querySelectorAll('.scroll-to-checkout');

  scrollButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      // Try to find Kajabi's checkout form
      const checkoutForm = document.querySelector('.checkout-form, .kjb-checkout, form[action*="checkout"], .checkout-container, #checkout-form');

      if (checkoutForm) {
        // Scroll to the form with offset for fixed headers
        const headerOffset = 100;
        const elementPosition = checkoutForm.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Try to focus the first input field
        setTimeout(() => {
          const firstInput = checkoutForm.querySelector('input:not([type="hidden"])');
          if (firstInput) firstInput.focus();
        }, 500);
      } else {
        // If no form found, scroll to top of page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // HIDE MOBILE CTA WHEN NEAR CHECKOUT FORM
  // ============================================
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

      // Add transition to mobileCTA
      mobileCTA.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

      observer.observe(checkoutForm);
    }
  })();

  // ============================================
  // ENHANCE TRUST INDICATORS
  // ============================================
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

  // ============================================
  // ANIMATE ORDER SUMMARY ON LOAD
  // ============================================
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

  // ============================================
  // UPGRADE LINK HOVER EFFECT (Standalone Page)
  // ============================================
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
