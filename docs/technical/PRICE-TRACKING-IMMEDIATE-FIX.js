/**
 * Immediate Fix for Price Tracking
 * 
 * Run this to:
 * 1. Clear old localStorage value
 * 2. Extract current price from selected option
 * 3. Save correct price to localStorage
 * 4. Set up manual update listener
 */

(function() {
  console.log('%c🔧 PRICE TRACKING IMMEDIATE FIX', 'font-size: 18px; font-weight: bold; color: #F43357;');
  
  // Step 1: Clear old value
  localStorage.removeItem('value');
  console.log('✅ Cleared old localStorage value');
  
  // Step 2: Extract current price
  var selectedOption = document.querySelector('.embedded-checkout-pricing-option.selected');
  var price = null;
  
  if (selectedOption) {
    var match = selectedOption.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
    if (match) {
      price = parseFloat(match[1].replace(/,/g, ''));
      console.log('✅ Extracted price from selected option: $' + price);
    }
  }
  
  // Fallback to #offer-price
  if (!price) {
    var offerPrice = document.querySelector('#offer-price');
    if (offerPrice) {
      var match = offerPrice.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
      if (match) {
        price = parseFloat(match[1].replace(/,/g, ''));
        console.log('✅ Extracted price from #offer-price: $' + price);
      }
    }
  }
  
  // Step 3: Save correct price
  if (price) {
    localStorage.setItem('value', price);
    console.log('✅ Saved correct price to localStorage: $' + price);
    console.log('   Verify:', localStorage.getItem('value'));
  } else {
    console.log('❌ Could not extract price');
  }
  
  // Step 4: Set up manual update listener (temporary fix)
  console.log('\n%cSetting up manual price update listener...', 'font-weight: bold;');
  
  var pricingOptions = document.querySelectorAll('.embedded-checkout-pricing-option');
  var updateCount = 0;
  
  pricingOptions.forEach(function(option, index) {
    // Remove existing listeners (if any)
    var newOption = option.cloneNode(true);
    option.parentNode.replaceChild(newOption, option);
    
    // Add click listener
    newOption.addEventListener('click', function() {
      setTimeout(function() {
        var selected = document.querySelector('.embedded-checkout-pricing-option.selected');
        if (selected) {
          var match = selected.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
          if (match) {
            var newPrice = parseFloat(match[1].replace(/,/g, ''));
            localStorage.setItem('value', newPrice);
            updateCount++;
            console.log('✅ Price updated to: $' + newPrice + ' (update #' + updateCount + ')');
          }
        }
      }, 500);
    });
  });
  
  console.log('✅ Manual update listener added to ' + pricingOptions.length + ' pricing options');
  console.log('   Click between pricing options to test');
  console.log('\n⚠️ NOTE: This is a temporary fix. The GTM Tag 86 scraper should be running automatically.');
  console.log('   Check GTM to ensure Tag 86 is firing on checkout pages.');
  
  return {
    price: price,
    saved: price !== null,
    listenersAdded: pricingOptions.length
  };
})();

