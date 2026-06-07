/**
 * Quick Meta Purchase Event Verification Script
 * 
 * Run this on the thank you page after completing a purchase
 * to verify the purchase event is being sent to Meta correctly
 */

(function() {
  console.log('%c🔍 META PURCHASE EVENT VERIFICATION', 'font-size: 18px; font-weight: bold; color: #F43357;');
  console.log('='.repeat(60));
  
  const results = {
    dataLayer: {},
    pixel: {},
    localStorage: {},
    network: {},
    summary: {}
  };
  
  // ============================================
  // 1. CHECK DATALAYER PURCHASE EVENT
  // ============================================
  console.log('\n%c1. DATALAYER PURCHASE EVENT', 'font-size: 16px; font-weight: bold;');
  
  const purchaseEvents = window.dataLayer.filter(e => e.event === 'purchase');
  results.dataLayer.found = purchaseEvents.length > 0;
  results.dataLayer.count = purchaseEvents.length;
  
  if (purchaseEvents.length > 0) {
    const purchase = purchaseEvents[0];
    results.dataLayer.value = purchase.ecommerce?.value;
    results.dataLayer.currency = purchase.ecommerce?.currency;
    results.dataLayer.transactionId = purchase.ecommerce?.transaction_id;
    results.dataLayer.productName = purchase.ecommerce?.items?.[0]?.item_name;
    
    console.log('✅ Purchase event found in dataLayer');
    console.log('   Value: $' + purchase.ecommerce.value);
    console.log('   Currency: ' + purchase.ecommerce.currency);
    console.log('   Transaction ID: ' + (purchase.ecommerce.transaction_id || 'N/A'));
    console.log('   Product: ' + (purchase.ecommerce.items?.[0]?.item_name || 'N/A'));
    
    // Verify price matches localStorage
    const storedPrice = localStorage.getItem('value');
    if (storedPrice) {
      const storedPriceNum = parseFloat(storedPrice);
      const eventPrice = purchase.ecommerce.value;
      if (Math.abs(storedPriceNum - eventPrice) < 0.01) {
        console.log('   ✅ Price matches localStorage: $' + storedPrice);
      } else {
        console.log('   ⚠️ Price mismatch!');
        console.log('      LocalStorage: $' + storedPrice);
        console.log('      Event: $' + eventPrice);
      }
    }
  } else {
    console.log('❌ No purchase event found in dataLayer');
    console.log('   Check if thank you page is custom (not default Kajabi)');
    console.log('   Check if GTM container is loading');
  }
  
  // ============================================
  // 2. CHECK FACEBOOK PIXEL
  // ============================================
  console.log('\n%c2. FACEBOOK PIXEL STATUS', 'font-size: 16px; font-weight: bold;');
  
  const pixelLoaded = typeof window.fbq !== 'undefined';
  results.pixel.loaded = pixelLoaded;
  
  if (pixelLoaded) {
    console.log('✅ Facebook Pixel loaded (fbq function exists)');
    
    // Try to get pixel ID
    if (window._fbp) {
      console.log('   Pixel cookie found');
    }
    
    // Check if pixel is initialized
    if (window._fbq && window._fbq.loaded) {
      console.log('   Pixel initialized');
    }
  } else {
    console.log('❌ Facebook Pixel not loaded');
    console.log('   Check if GTM container is loading');
    console.log('   Check if pixel tag is active in GTM');
  }
  
  // ============================================
  // 3. CHECK LOCALSTORAGE
  // ============================================
  console.log('\n%c3. LOCALSTORAGE DATA', 'font-size: 16px; font-weight: bold;');
  
  const value = localStorage.getItem('value');
  const email = localStorage.getItem('email');
  const productName = localStorage.getItem('product_name');
  
  results.localStorage.value = value;
  results.localStorage.email = email;
  results.localStorage.productName = productName;
  
  if (value) {
    console.log('✅ Price in localStorage: $' + value);
  } else {
    console.log('⚠️ No price in localStorage');
  }
  
  if (email) {
    console.log('✅ Email in localStorage: ' + email);
  } else {
    console.log('⚠️ No email in localStorage');
  }
  
  if (productName) {
    console.log('✅ Product name in localStorage: ' + productName);
  }
  
  // ============================================
  // 4. NETWORK REQUEST CHECK (Instructions)
  // ============================================
  console.log('\n%c4. NETWORK REQUESTS', 'font-size: 16px; font-weight: bold;');
  console.log('⚠️ Manual check required:');
  console.log('   1. Open DevTools → Network tab');
  console.log('   2. Filter for: "facebook" or "tr"');
  console.log('   3. Look for request to: www.facebook.com/tr/');
  console.log('   4. Should include: id=449153684613893&ev=Purchase');
  console.log('   5. Check parameters: value=147 (or 490), currency=USD');
  
  // ============================================
  // 5. FACEBOOK PIXEL HELPER CHECK (Instructions)
  // ============================================
  console.log('\n%c5. FACEBOOK PIXEL HELPER', 'font-size: 16px; font-weight: bold;');
  console.log('⚠️ Manual check required:');
  console.log('   1. Click Facebook Pixel Helper icon in Chrome toolbar');
  console.log('   2. Should show: "Pixel Loaded" (ID: 449153684613893)');
  console.log('   3. Should show: "Purchase" event');
  console.log('   4. Event details should show:');
  console.log('      - Value: $147 or $490 (matches selected price)');
  console.log('      - Currency: USD');
  
  // ============================================
  // 6. META EVENTS MANAGER CHECK (Instructions)
  // ============================================
  console.log('\n%c6. META EVENTS MANAGER', 'font-size: 16px; font-weight: bold;');
  console.log('⚠️ Manual check required (may take 5-10 minutes):');
  console.log('   1. Go to: https://business.facebook.com/events_manager2');
  console.log('   2. Select pixel: 449153684613893');
  console.log('   3. Click "Test Events" in left sidebar');
  console.log('   4. Enter test email: ' + (email || '[your test email]'));
  console.log('   5. Click "Test"');
  console.log('   6. Should see Purchase event with:');
  console.log('      - Value: $147 or $490');
  console.log('      - Currency: USD');
  console.log('      - Event source: Browser or Server (CAPI)');
  
  // ============================================
  // 7. SUMMARY
  // ============================================
  console.log('\n%c7. VERIFICATION SUMMARY', 'font-size: 16px; font-weight: bold;');
  console.log('='.repeat(60));
  
  const allChecks = [
    { name: 'Purchase event in dataLayer', pass: results.dataLayer.found },
    { name: 'Facebook Pixel loaded', pass: results.pixel.loaded },
    { name: 'Price in localStorage', pass: !!value }
  ];
  
  const passed = allChecks.filter(c => c.pass).length;
  const total = allChecks.length;
  
  allChecks.forEach(check => {
    console.log((check.pass ? '✅' : '❌') + ' ' + check.name);
  });
  
  console.log('\n' + passed + '/' + total + ' automated checks passed');
  
  if (passed === total) {
    console.log('\n%c✅ READY TO SEND TO META', 'font-size: 14px; font-weight: bold; color: green;');
    console.log('   Next steps:');
    console.log('   1. Check Facebook Pixel Helper extension');
    console.log('   2. Check Network tab for facebook.com/tr/ requests');
    console.log('   3. Check Meta Events Manager (wait 5-10 min)');
  } else {
    console.log('\n%c⚠️ ISSUES FOUND', 'font-size: 14px; font-weight: bold; color: orange;');
    console.log('   Fix issues above before checking Meta Events Manager');
  }
  
  // Export results
  console.log('\n%cRESULTS OBJECT:', 'font-weight: bold;');
  console.log(JSON.stringify(results, null, 2));
  
  // Make available globally
  window.metaPurchaseVerification = results;
  
  return results;
})();

