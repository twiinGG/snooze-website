/**
 * Price Tracking Debug Script
 * 
 * Run this in the browser console on the checkout page
 * to diagnose why price tracking isn't working
 */

(function() {
  console.log('%c🔍 PRICE TRACKING DEBUG', 'font-size: 18px; font-weight: bold; color: #F43357;');
  console.log('='.repeat(60));
  
  const results = {
    selectors: {},
    priceFound: null,
    localStorage: {},
    scraperRunning: false
  };
  
  // ============================================
  // 1. CHECK IF PRICE SCRAPER IS RUNNING
  // ============================================
  console.log('\n%c1. PRICE SCRAPER STATUS', 'font-size: 16px; font-weight: bold;');
  
  // Check if we see the scraper console message
  // (This would require checking console history, which we can't do)
  // Instead, check if GTM Tag 86 should be firing
  console.log('⚠️ Cannot verify if scraper ran (need to check console history)');
  console.log('   Look for: "Snooze Tracking: Starting Dynamic Price Scraper..."');
  
  // ============================================
  // 2. CHECK SELECTORS EXIST
  // ============================================
  console.log('\n%c2. SELECTOR VERIFICATION', 'font-size: 16px; font-weight: bold;');
  
  // Check primary selector
  const selectedOption = document.querySelector('.embedded-checkout-pricing-option.selected');
  results.selectors.selectedOption = selectedOption !== null;
  
  if (selectedOption) {
    console.log('✅ Found: .embedded-checkout-pricing-option.selected');
    console.log('   Element:', selectedOption);
    console.log('   Text content:', selectedOption.innerText);
  } else {
    console.log('❌ NOT FOUND: .embedded-checkout-pricing-option.selected');
  }
  
  // Check all pricing options
  const allPricingOptions = document.querySelectorAll('.embedded-checkout-pricing-option');
  results.selectors.allOptions = allPricingOptions.length;
  
  if (allPricingOptions.length > 0) {
    console.log('✅ Found ' + allPricingOptions.length + ' pricing options');
    allPricingOptions.forEach((opt, idx) => {
      const isSelected = opt.classList.contains('selected');
      const text = opt.innerText.substring(0, 50);
      console.log('   Option ' + (idx + 1) + ': ' + (isSelected ? '✓ SELECTED' : '  ') + ' - ' + text);
    });
  } else {
    console.log('❌ NOT FOUND: .embedded-checkout-pricing-option (no pricing options found)');
  }
  
  // Check fallback selector
  const offerPrice = document.querySelector('#offer-price');
  results.selectors.offerPrice = offerPrice !== null;
  
  if (offerPrice) {
    console.log('✅ Found: #offer-price');
    console.log('   Text content:', offerPrice.innerText);
  } else {
    console.log('❌ NOT FOUND: #offer-price');
  }
  
  // ============================================
  // 3. TRY TO EXTRACT PRICE MANUALLY
  // ============================================
  console.log('\n%c3. MANUAL PRICE EXTRACTION', 'font-size: 16px; font-weight: bold;');
  
  let extractedPrice = null;
  
  // Try primary method
  if (selectedOption) {
    const match = selectedOption.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
    if (match) {
      extractedPrice = parseFloat(match[1].replace(/,/g, ''));
      console.log('✅ Extracted from selected option: $' + extractedPrice);
      results.priceFound = extractedPrice;
    } else {
      console.log('⚠️ Selected option found but no price pattern matched');
      console.log('   Full text:', selectedOption.innerText);
    }
  }
  
  // Try fallback method
  if (!extractedPrice && offerPrice) {
    const match = offerPrice.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
    if (match) {
      extractedPrice = parseFloat(match[1].replace(/,/g, ''));
      console.log('✅ Extracted from #offer-price: $' + extractedPrice);
      results.priceFound = extractedPrice;
    } else {
      console.log('⚠️ #offer-price found but no price pattern matched');
      console.log('   Full text:', offerPrice.innerText);
    }
  }
  
  // Try searching entire page for price
  if (!extractedPrice) {
    console.log('⚠️ Trying to find price anywhere on page...');
    const allText = document.body.innerText;
    const priceMatches = allText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/g);
    if (priceMatches && priceMatches.length > 0) {
      console.log('   Found price strings:', priceMatches.slice(0, 5));
      // Try to get the most likely one (usually the first or one with 147/490)
      const likelyPrice = priceMatches.find(p => p.includes('147') || p.includes('490'));
      if (likelyPrice) {
        extractedPrice = parseFloat(likelyPrice.replace(/[^0-9.]/g, ''));
        console.log('✅ Likely price found: $' + extractedPrice);
        results.priceFound = extractedPrice;
      }
    }
  }
  
  // ============================================
  // 4. CHECK LOCAL STORAGE
  // ============================================
  console.log('\n%c4. LOCAL STORAGE CHECK', 'font-size: 16px; font-weight: bold;');
  
  const storedValue = localStorage.getItem('value');
  results.localStorage.value = storedValue;
  
  if (storedValue) {
    console.log('✅ LocalStorage has value: ' + storedValue);
  } else {
    console.log('❌ LocalStorage value is NULL');
  }
  
  // Check other keys
  const allKeys = Object.keys(localStorage);
  const trackingKeys = allKeys.filter(k => ['value', 'email', 'product_name', 'phone'].includes(k));
  if (trackingKeys.length > 0) {
    console.log('   Other tracking keys:', trackingKeys);
    trackingKeys.forEach(key => {
      console.log('     ' + key + ':', localStorage.getItem(key));
    });
  }
  
  // ============================================
  // 5. MANUALLY SAVE PRICE (IF FOUND)
  // ============================================
  console.log('\n%c5. MANUAL FIX ATTEMPT', 'font-size: 16px; font-weight: bold;');
  
  if (extractedPrice && !storedValue) {
    console.log('💡 Attempting to manually save price...');
    try {
      localStorage.setItem('value', extractedPrice);
      console.log('✅ Manually saved price: $' + extractedPrice);
      console.log('   Verify: localStorage.getItem("value") =', localStorage.getItem('value'));
    } catch(e) {
      console.log('❌ Failed to save:', e.message);
    }
  } else if (extractedPrice && storedValue) {
    console.log('⚠️ Price found but already in storage');
    console.log('   Extracted: $' + extractedPrice);
    console.log('   Stored: $' + storedValue);
    if (Math.abs(extractedPrice - parseFloat(storedValue)) > 0.01) {
      console.log('   ⚠️ MISMATCH! Extracted price differs from stored value');
    }
  } else if (!extractedPrice) {
    console.log('❌ Cannot save - no price found on page');
  }
  
  // ============================================
  // 6. CHECKOUT HTML STRUCTURE
  // ============================================
  console.log('\n%c6. CHECKOUT STRUCTURE ANALYSIS', 'font-size: 16px; font-weight: bold;');
  
  // Look for common price-related elements
  const priceSelectors = [
    '.embedded-checkout-pricing-option',
    '#offer-price',
    '[class*="price"]',
    '[class*="Price"]',
    '[id*="price"]',
    '[id*="Price"]'
  ];
  
  priceSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log('   Found ' + elements.length + ' element(s) with selector: ' + selector);
      if (elements.length <= 3) {
        elements.forEach((el, idx) => {
          console.log('     [' + idx + ']', el.tagName, el.className, el.id, 'Text:', el.innerText.substring(0, 30));
        });
      }
    }
  });
  
  // ============================================
  // 7. SUMMARY & RECOMMENDATIONS
  // ============================================
  console.log('\n%c7. SUMMARY & RECOMMENDATIONS', 'font-size: 16px; font-weight: bold;');
  console.log('='.repeat(60));
  
  if (results.selectors.selectedOption || results.selectors.allOptions > 0) {
    console.log('✅ Selectors exist on page');
  } else {
    console.log('❌ Selectors NOT FOUND - Kajabi HTML may have changed');
    console.log('   ACTION: Update GTM Tag 86 with new selectors');
  }
  
  if (results.priceFound) {
    console.log('✅ Price can be extracted: $' + results.priceFound);
    if (!storedValue) {
      console.log('   ACTION: Price scraper may not be running or selector issue');
    }
  } else {
    console.log('❌ Cannot extract price from page');
    console.log('   ACTION: Check if pricing options are visible/loaded');
  }
  
  if (storedValue) {
    console.log('✅ Price is in LocalStorage: $' + storedValue);
  } else {
    console.log('❌ Price NOT in LocalStorage');
    console.log('   ACTION: Price scraper needs to run or be fixed');
  }
  
  // Export results
  console.log('\n%cRESULTS OBJECT:', 'font-weight: bold;');
  console.log(JSON.stringify(results, null, 2));
  
  // Make available globally
  window.priceTrackingDebug = results;
  
  return results;
})();

