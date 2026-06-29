(function() {
  function scrollToCheckout(event) {
    if (event) {
      event.preventDefault();
    }

    const checkoutSelectors = [
      '.checkout-form',
      '.kajabi-checkout',
      '.checkout-container',
      '[data-checkout]',
      '.offer-checkout',
      '.checkout-wrapper',
      '.checkout-form-container',
      '.enhanced-checkout',
      '.checkout-right',
      '.checkout-sidebar',
      'form[action*="checkout"]',
      'form[action*="offer"]'
    ];
    
    let checkoutElement = null;

    for (let selector of checkoutSelectors) {
      checkoutElement = document.querySelector(selector);
      if (checkoutElement) {
        break;
      }
    }

    if (checkoutElement) {
      checkoutElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });

      setTimeout(function() {
        const firstInput = checkoutElement.querySelector('input, select, textarea, button');
        if (firstInput && firstInput.focus) {
          firstInput.focus();
        }
      }, 500);
    } else {
      const forms = document.querySelectorAll('form');
      if (forms.length > 0) {
        const checkoutForm = forms[forms.length - 1];
        checkoutForm.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }
    }
  }

  function initScrollButtons() {
    const scrollButtons = document.querySelectorAll('.scroll-to-checkout, .mobile-scroll-to-checkout');
    scrollButtons.forEach(function(button) {
      button.addEventListener('click', scrollToCheckout);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollButtons);
  } else {
    initScrollButtons();
  }
})();
