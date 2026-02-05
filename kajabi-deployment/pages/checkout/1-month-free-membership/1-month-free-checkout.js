/* ============================================
   SNOOZE 1-MONTH FREE ACCESS CHECKOUT
   JavaScript - Scroll to checkout functionality
   ============================================ */

(function() {
  // Function to scroll to checkout form
  function scrollToCheckout(event) {
    // Prevent default link behavior
    if (event) {
      event.preventDefault();
    }
    
    // Try multiple selectors to find the checkout form
    // Kajabi uses different containers depending on checkout type
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
    
    // Try to find checkout form
    for (let selector of checkoutSelectors) {
      checkoutElement = document.querySelector(selector);
      if (checkoutElement) {
        break;
      }
    }
    
    // If found, scroll to it
    if (checkoutElement) {
      checkoutElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // Optional: Add a slight delay and focus on first input
      setTimeout(function() {
        const firstInput = checkoutElement.querySelector('input, select, textarea, button');
        if (firstInput && firstInput.focus) {
          firstInput.focus();
        }
      }, 500);
    } else {
      // Fallback: Try to find any form on the page
      const forms = document.querySelectorAll('form');
      if (forms.length > 0) {
        // Usually the checkout form is the last or largest form
        const checkoutForm = forms[forms.length - 1];
        checkoutForm.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      } else {
        // Last resort: Scroll to bottom of page (where checkout usually is)
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }
    }
  }
  
  // Attach scroll functionality to all buttons with scroll-to-checkout class
  function initScrollButtons() {
    const scrollButtons = document.querySelectorAll('.scroll-to-checkout, .mobile-scroll-to-checkout');
    scrollButtons.forEach(function(button) {
      button.addEventListener('click', scrollToCheckout);
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollButtons);
  } else {
    // DOM already loaded
    initScrollButtons();
  }
})();
