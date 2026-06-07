/**
 * Price Tracking Test Script
 * 
 * Run this on the checkout page to test if price updates when clicking options
 */

(function() {
  console.log('%c🧪 PRICE TRACKING TEST', 'font-size: 18px; font-weight: bold; color: #F43357;');
  console.log('='.repeat(60));
  
  // Check initial state
  console.log('\n1. INITIAL STATE:');
  var initialPrice = localStorage.getItem('value');
  console.log('   localStorage value:', initialPrice || 'NOT SET');
  
  var selectedOption = document.querySelector('.embedded-checkout-pricing-option.selected');
  if (selectedOption) {
    var match = selectedOption.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
    if (match) {
      var extractedPrice = parseFloat(match[1].replace(/,/g, ''));
      console.log('   Selected option price: $' + extractedPrice);
      if (initialPrice && Math.abs(parseFloat(initialPrice) - extractedPrice) < 0.01) {
        console.log('   ✅ Price matches selected option');
      } else {
        console.log('   ⚠️ Price mismatch');
      }
    }
  }
  
  // Check if scraper ran
  console.log('\n2. SCRAPER STATUS:');
  console.log('   Check console history for: "Snooze Tracking: Starting Dynamic Price Scraper..."');
  console.log('   Check console history for: "Snooze Tracking: Attached listeners to X pricing options"');
  
  // Check pricing options
  console.log('\n3. PRICING OPTIONS:');
  var allOptions = document.querySelectorAll('.embedded-checkout-pricing-option');
  console.log('   Found ' + allOptions.length + ' pricing options');
  allOptions.forEach(function(opt, idx) {
    var isSelected = opt.classList.contains('selected');
    var match = opt.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
    var price = match ? match[0] : 'Not found';
    console.log('   Option ' + (idx + 1) + ': ' + price + (isSelected ? ' (SELECTED)' : ''));
  });
  
  // Instructions for manual test
  console.log('\n4. MANUAL TEST INSTRUCTIONS:');
  console.log('   a) Click on the OTHER pricing option (not currently selected)');
  console.log('   b) Wait 500ms');
  console.log('   c) Run: localStorage.getItem("value")');
  console.log('   d) Price should update to match the newly selected option');
  console.log('   e) Check console for: "Snooze Tracking: Pricing option clicked"');
  console.log('   f) Check console for: "Snooze Tracking: Updated Price to [number]"');
  
  // Set up a watcher to detect changes
  console.log('\n5. SETTING UP PRICE WATCHER:');
  var watchCount = 0;
  var lastPrice = localStorage.getItem('value');
  
  var priceWatcher = setInterval(function() {
    var currentPrice = localStorage.getItem('value');
    if (currentPrice !== lastPrice) {
      watchCount++;
      console.log('   ✅ Price changed detected!');
      console.log('      Old: $' + lastPrice);
      console.log('      New: $' + currentPrice);
      console.log('      Change #' + watchCount);
      lastPrice = currentPrice;
    }
  }, 200);
  
  // Stop watcher after 30 seconds
  setTimeout(function() {
    clearInterval(priceWatcher);
    console.log('\n   Price watcher stopped (30 seconds elapsed)');
  }, 30000);
  
  console.log('   Price watcher active for 30 seconds');
  console.log('   Click between pricing options to test');
  
  console.log('\n%c✅ TEST READY', 'font-size: 14px; font-weight: bold; color: green;');
  console.log('   Click between pricing options now to test price updates');
  
  // Make watcher available globally
  window.priceWatcher = priceWatcher;
  
  return {
    initialPrice: initialPrice,
    optionsCount: allOptions.length,
    watcher: priceWatcher
  };
})();
