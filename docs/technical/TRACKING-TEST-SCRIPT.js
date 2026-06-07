/**
 * Snooze Tracking Test Script
 * 
 * Run this script in browser console on checkout/thank you pages
 * to quickly verify tracking setup
 * 
 * Usage:
 * 1. Open checkout or thank you page
 * 2. Open DevTools → Console
 * 3. Paste this entire script
 * 4. Press Enter
 * 5. Review results
 */

(function() {
  console.log('%c🔍 SNOOZE TRACKING TEST', 'font-size: 20px; font-weight: bold; color: #F43357;');
  console.log('='.repeat(50));
  
  const results = {
    domain: {},
    priceTracking: {},
    localStorage: {},
    gtm: {},
    pixel: {},
    errors: []
  };
  
  // ============================================
  // 1. DOMAIN VERIFICATION
  // ============================================
  console.log('\n%c1. DOMAIN VERIFICATION', 'font-size: 16px; font-weight: bold;');
  
  const currentDomain = window.location.hostname;
  const isJoinsnooze = currentDomain.includes('joinsnooze.com');
  const hasOldDomain = currentDomain.includes('joinsnooze.com');
  
  results.domain.current = currentDomain;
  results.domain.isJoinsnooze = isJoinsnooze;
  results.domain.hasOldDomain = hasOldDomain;
  
  if (isJoinsnooze && !hasOldDomain) {
    console.log('✅ Domain: joinsnooze.com (correct)');
  } else if (hasOldDomain) {
    console.log('❌ Domain: Still using joinsnooze.com (needs update)');
    results.errors.push('Domain still references old domain');
  } else {
    console.log('⚠️ Domain: ' + currentDomain + ' (verify this is correct)');
  }
  
  // Check for old domain in scripts
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const oldDomainScripts = scripts.filter(s => s.src.includes('joinsnooze.com'));
  if (oldDomainScripts.length > 0) {
    console.log('❌ Found ' + oldDomainScripts.length + ' scripts with old domain');
    results.errors.push('Scripts still reference old domain');
  } else {
    console.log('✅ No scripts found with old domain');
  }
  
  // ============================================
  // 2. PRICE TRACKING VERIFICATION
  // ============================================
  console.log('\n%c2. PRICE TRACKING VERIFICATION', 'font-size: 16px; font-weight: bold;');
  
  // Check for pricing options
  const pricingOptions = document.querySelectorAll('.embedded-checkout-pricing-option');
  const selectedOption = document.querySelector('.embedded-checkout-pricing-option.selected');
  const offerPrice = document.querySelector('#offer-price');
  
  results.priceTracking.hasPricingOptions = pricingOptions.length > 0;
  results.priceTracking.pricingOptionsCount = pricingOptions.length;
  results.priceTracking.hasSelectedOption = selectedOption !== null;
  results.priceTracking.hasOfferPrice = offerPrice !== null;
  
  if (pricingOptions.length > 0) {
    console.log('✅ Found ' + pricingOptions.length + ' pricing options');
    pricingOptions.forEach((opt, idx) => {
      const isSelected = opt.classList.contains('selected');
      const priceMatch = opt.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
      const price = priceMatch ? priceMatch[0] : 'Not found';
      console.log('  ' + (isSelected ? '✓' : ' ') + ' Option ' + (idx + 1) + ': ' + price + (isSelected ? ' (SELECTED)' : ''));
    });
  } else {
    console.log('⚠️ No pricing options found (single price offer?)');
  }
  
  if (selectedOption) {
    const priceMatch = selectedOption.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[1].replace(/,/g, ''));
      console.log('✅ Selected price: $' + price);
      results.priceTracking.selectedPrice = price;
    }
  }
  
  if (offerPrice) {
    const priceText = offerPrice.innerText;
    const priceMatch = priceText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[1].replace(/,/g, ''));
      console.log('✅ Offer price element: $' + price);
      results.priceTracking.offerPrice = price;
    }
  } else {
    console.log('⚠️ #offer-price element not found (may be normal for some checkouts)');
  }
  
  // ============================================
  // 3. LOCAL STORAGE VERIFICATION
  // ============================================
  console.log('\n%c3. LOCAL STORAGE VERIFICATION', 'font-size: 16px; font-weight: bold;');
  
  const storageKeys = ['value', 'email', 'phone', 'product_name', 'full_name', 'city', 'zip', 'country'];
  const storageData = {};
  
  storageKeys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      storageData[key] = value;
      console.log('✅ ' + key + ': ' + (key === 'value' ? '$' : '') + value);
    } else {
      console.log('⚠️ ' + key + ': Not set');
    }
  });
  
  results.localStorage = storageData;
  
  // Verify price in localStorage matches selected price
  const storedPrice = localStorage.getItem('value');
  if (storedPrice && results.priceTracking.selectedPrice) {
    const storedPriceNum = parseFloat(storedPrice);
    if (Math.abs(storedPriceNum - results.priceTracking.selectedPrice) < 0.01) {
      console.log('✅ LocalStorage price matches selected price');
    } else {
      console.log('❌ Price mismatch! LocalStorage: $' + storedPrice + ', Selected: $' + results.priceTracking.selectedPrice);
      results.errors.push('Price mismatch between localStorage and selected option');
    }
  }
  
  // ============================================
  // 4. GTM VERIFICATION
  // ============================================
  console.log('\n%c4. GTM VERIFICATION', 'font-size: 16px; font-weight: bold;');
  
  const gtmLoaded = typeof window.google_tag_manager !== 'undefined';
  const dataLayerExists = typeof window.dataLayer !== 'undefined';
  
  results.gtm.loaded = gtmLoaded;
  results.gtm.dataLayerExists = dataLayerExists;
  
  if (gtmLoaded) {
    console.log('✅ GTM loaded');
    const containerIds = Object.keys(window.google_tag_manager || {});
    console.log('  Container IDs: ' + containerIds.join(', '));
    results.gtm.containerIds = containerIds;
  } else {
    console.log('❌ GTM not loaded');
    results.errors.push('GTM not loaded');
  }
  
  if (dataLayerExists) {
    console.log('✅ dataLayer exists');
    const events = window.dataLayer.filter(item => item.event);
    console.log('  Events in dataLayer: ' + events.length);
    events.forEach(evt => {
      console.log('    - ' + evt.event + (evt.ecommerce ? ' (ecommerce)' : ''));
    });
    results.gtm.events = events;
  } else {
    console.log('❌ dataLayer not found');
    results.errors.push('dataLayer not found');
  }
  
  // Check for purchase event
  const purchaseEvents = window.dataLayer.filter(item => item.event === 'purchase');
  if (purchaseEvents.length > 0) {
    console.log('✅ Purchase event found in dataLayer');
    purchaseEvents.forEach(evt => {
      if (evt.ecommerce) {
        console.log('  Value: $' + evt.ecommerce.value);
        console.log('  Currency: ' + evt.ecommerce.currency);
        console.log('  Transaction ID: ' + (evt.ecommerce.transaction_id || 'N/A'));
      }
    });
    results.gtm.purchaseEvent = purchaseEvents[0];
  } else {
    console.log('⚠️ No purchase event in dataLayer (may be normal if not on thank you page)');
  }
  
  // ============================================
  // 5. META PIXEL VERIFICATION
  // ============================================
  console.log('\n%c5. META PIXEL VERIFICATION', 'font-size: 16px; font-weight: bold;');
  
  const fbqExists = typeof window.fbq !== 'undefined';
  results.pixel.fbqExists = fbqExists;
  
  if (fbqExists) {
    console.log('✅ fbq function exists');
    
    // Try to get pixel ID from _fbp cookie or fbq calls
    const fbpCookie = document.cookie.split(';').find(c => c.trim().startsWith('_fbp='));
    if (fbpCookie) {
      console.log('  _fbp cookie found');
    }
    
    // Check if pixel is initialized
    if (window._fbq && window._fbq.loaded) {
      console.log('✅ Pixel loaded');
    } else {
      console.log('⚠️ Pixel may not be fully loaded');
    }
  } else {
    console.log('❌ fbq function not found');
    results.errors.push('Meta Pixel not loaded');
  }
  
  // Check for pixel in page source
  const pixelScripts = Array.from(document.querySelectorAll('script')).filter(s => 
    s.innerHTML.includes('fbq') || s.src.includes('facebook.net')
  );
  if (pixelScripts.length > 0) {
    console.log('✅ Found ' + pixelScripts.length + ' pixel-related script(s)');
  } else {
    console.log('⚠️ No pixel scripts found in page (may be loaded via GTM)');
  }
  
  // ============================================
  // 6. SERVER-SIDE TRACKING VERIFICATION
  // ============================================
  console.log('\n%c6. SERVER-SIDE TRACKING VERIFICATION', 'font-size: 16px; font-weight: bold;');
  
  // Check for Stape loader
  const stapeScripts = Array.from(document.querySelectorAll('script[src]')).filter(s => 
    s.src.includes('load.ss.joinsnooze.com') || s.src.includes('ss.joinsnooze.com')
  );
  
  if (stapeScripts.length > 0) {
    console.log('✅ Found ' + stapeScripts.length + ' Stape server-side script(s)');
    stapeScripts.forEach(script => {
      console.log('  URL: ' + script.src);
    });
    results.gtm.stapeLoaded = true;
  } else {
    console.log('⚠️ No Stape server-side scripts found');
    console.log('  (This may be normal on fast pages with delayed tracking)');
    results.gtm.stapeLoaded = false;
  }
  
  // ============================================
  // 7. SUMMARY
  // ============================================
  console.log('\n%c7. TEST SUMMARY', 'font-size: 16px; font-weight: bold;');
  console.log('='.repeat(50));
  
  const errorCount = results.errors.length;
  const warningCount = Object.values(results).filter(v => 
    typeof v === 'object' && Object.values(v).some(val => val === false || val === null)
  ).length;
  
  if (errorCount === 0) {
    console.log('%c✅ ALL CHECKS PASSED', 'font-size: 14px; font-weight: bold; color: green;');
  } else {
    console.log('%c❌ ' + errorCount + ' ERROR(S) FOUND', 'font-size: 14px; font-weight: bold; color: red;');
    results.errors.forEach((error, idx) => {
      console.log('  ' + (idx + 1) + '. ' + error);
    });
  }
  
  if (warningCount > 0) {
    console.log('%c⚠️ ' + warningCount + ' WARNING(S)', 'font-size: 14px; font-weight: bold; color: orange;');
  }
  
  // ============================================
  // 8. EXPORT RESULTS
  // ============================================
  console.log('\n%c8. EXPORT RESULTS', 'font-size: 16px; font-weight: bold;');
  console.log('Copy the results object below for documentation:');
  console.log(JSON.stringify(results, null, 2));
  
  // Make results available globally
  window.snoozeTrackingTestResults = results;
  console.log('\n✅ Results saved to window.snoozeTrackingTestResults');
  
  return results;
})();
