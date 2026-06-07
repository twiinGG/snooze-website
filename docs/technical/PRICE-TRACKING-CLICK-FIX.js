/**
 * Price Tracking Click Listener Fix
 * 
 * This script fixes the issue where price doesn't update when clicking
 * between pricing options. Run this on the checkout page.
 * 
 * The issue: Click listeners may not be attached if pricing options
 * load after the scraper script runs, or listeners get removed.
 */

(function() {
  console.log('%c🔧 FIXING PRICE TRACKING CLICK LISTENERS', 'font-size: 16px; font-weight: bold; color: #F43357;');
  
  // Function to update price from selected option
  function updateSelectedPrice() {
    try {
      var priceText = "";
      
      // 1. Try selected pricing option
      var selectedOption = document.querySelector(".embedded-checkout-pricing-option.selected");
      if (selectedOption) {
        var match = selectedOption.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
        if (match) {
          priceText = match[1];
        }
      }
      
      // 2. Fallback to offer price element
      if (!priceText) {
        var offerPrice = document.querySelector("#offer-price");
        if (offerPrice) {
          var match = offerPrice.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
          if (match) {
            priceText = match[1];
          }
        }
      }
      
      // 3. Save to localStorage
      if (priceText) {
        var price = parseFloat(priceText.replace(/,/g, ''));
        if (!isNaN(price) && price > 0) {
          localStorage.setItem('value', price);
          console.log('✅ Price updated to: $' + price);
          return price;
        }
      }
    } catch(e) {
      console.error('Price update error:', e);
    }
    return null;
  }
  
  // Strategy 1: Add click listeners to existing options
  function attachClickListeners() {
    var pricingOptions = document.querySelectorAll('.embedded-checkout-pricing-option');
    var attached = 0;
    
    pricingOptions.forEach(function(option, index) {
      // Remove any existing listeners by cloning
      var newOption = option.cloneNode(true);
      option.parentNode.replaceChild(newOption, option);
      
      // Add click listener
      newOption.addEventListener('click', function() {
        console.log('🖱️ Pricing option clicked, updating price...');
        setTimeout(function() {
          var price = updateSelectedPrice();
          if (price) {
            console.log('✅ Price updated after click: $' + price);
          } else {
            console.log('⚠️ Could not extract price after click');
          }
        }, 500); // Wait for Kajabi to update UI
      });
      
      attached++;
    });
    
    if (attached > 0) {
      console.log('✅ Attached click listeners to ' + attached + ' pricing options');
    } else {
      console.log('⚠️ No pricing options found to attach listeners');
    }
    
    return attached;
  }
  
  // Strategy 2: Use event delegation (more reliable for dynamic content)
  function setupEventDelegation() {
    // Find the container that holds pricing options
    var container = document.querySelector('.embedded-checkout-pricing-options') ||
                   document.querySelector('[class*="pricing"]') ||
                   document.body;
    
    container.addEventListener('click', function(e) {
      // Check if click is on a pricing option
      var clickedOption = e.target.closest('.embedded-checkout-pricing-option');
      if (clickedOption) {
        console.log('🖱️ Pricing option clicked (delegation), updating price...');
        setTimeout(function() {
          var price = updateSelectedPrice();
          if (price) {
            console.log('✅ Price updated via delegation: $' + price);
          }
        }, 500);
      }
    });
    
    console.log('✅ Event delegation set up on container');
  }
  
  // Strategy 3: Use MutationObserver to watch for changes
  function setupMutationObserver() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Check if any pricing options were added or class changed
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          var pricingOptions = document.querySelectorAll('.embedded-checkout-pricing-option');
          if (pricingOptions.length > 0) {
            // Re-attach listeners if new options appeared
            attachClickListeners();
            
            // Also check if selection changed
            var selected = document.querySelector('.embedded-checkout-pricing-option.selected');
            if (selected && mutation.type === 'attributes' && mutation.attributeName === 'class') {
              console.log('🔄 Selection changed, updating price...');
              setTimeout(updateSelectedPrice, 100);
            }
          }
        }
      });
    });
    
    // Observe the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    
    console.log('✅ MutationObserver set up to watch for pricing option changes');
    return observer;
  }
  
  // Run all strategies
  console.log('\n1. Attaching click listeners...');
  var listenersAttached = attachClickListeners();
  
  console.log('\n2. Setting up event delegation...');
  setupEventDelegation();
  
  console.log('\n3. Setting up MutationObserver...');
  var observer = setupMutationObserver();
  
  // Update price immediately
  console.log('\n4. Updating price from current selection...');
  var currentPrice = updateSelectedPrice();
  if (currentPrice) {
    console.log('✅ Current price: $' + currentPrice);
  }
  
  console.log('\n%c✅ PRICE TRACKING FIX APPLIED', 'font-size: 14px; font-weight: bold; color: green;');
  console.log('   Click between pricing options to test');
  console.log('   Check localStorage: localStorage.getItem("value")');
  
  // Make functions available globally for testing
  window.updateSelectedPrice = updateSelectedPrice;
  window.attachClickListeners = attachClickListeners;
  
  return {
    listenersAttached: listenersAttached,
    currentPrice: currentPrice,
    observer: observer
  };
})();
