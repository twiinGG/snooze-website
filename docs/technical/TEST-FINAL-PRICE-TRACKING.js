/**
 * Test Final Price Tracking
 * 
 * Run this on checkout page WITH coupon applied to verify
 * that the final price ($0.00) is being captured correctly
 */

(function() {
  console.log('%c🧪 TESTING FINAL PRICE TRACKING', 'font-size: 18px; font-weight: bold; color: #F43357;');
  console.log('='.repeat(60));
  
  // Test 1: Check if #offer-price exists and contains final price
  console.log('\n1. CHECKING #offer-price ELEMENT:');
  var offerPriceEl = document.querySelector("#offer-price");
  if (offerPriceEl) {
    var offerPriceText = offerPriceEl.innerText || offerPriceEl.textContent || '';
    console.log('   ✅ #offer-price found');
    console.log('   Text:', offerPriceText);
    
    var match = offerPriceText.match(/\$?([\d,]+(?:\.\d{2})?)/);
    if (match) {
      var price = parseFloat(match[1].replace(/,/g, ''));
      console.log('   ✅ Price extracted: $' + price);
      if (price === 0) {
        console.log('   ✅ CORRECT: Final price is $0 (100% discount applied)');
      } else {
        console.log('   ⚠️  Price is $' + price + ' (expected $0 for 100% discount)');
      }
    } else {
      console.log('   ❌ Could not extract price from text');
    }
  } else {
    console.log('   ❌ #offer-price element not found');
  }
  
  // Test 2: Check "Due now" section
  console.log('\n2. CHECKING "DUE NOW" SECTION:');
  var dueNowSection = document.querySelector('.embedded-checkout-price-detail');
  if (dueNowSection) {
    var dueNowText = dueNowSection.innerText || dueNowSection.textContent || '';
    console.log('   ✅ Due now section found');
    console.log('   Text:', dueNowText.substring(0, 100));
    
    var priceMatches = dueNowText.match(/\$([\d,]+(?:\.\d{2})?)/g);
    if (priceMatches && priceMatches.length > 0) {
      var lastMatch = priceMatches[priceMatches.length - 1];
      var finalMatch = lastMatch.match(/\$([\d,]+(?:\.\d{2})?)/);
      if (finalMatch) {
        var price = parseFloat(finalMatch[1].replace(/,/g, ''));
        console.log('   ✅ Final price from Due now: $' + price);
        if (price === 0) {
          console.log('   ✅ CORRECT: Final price is $0');
        }
      }
    }
  } else {
    console.log('   ⚠️  Due now section not found');
  }
  
  // Test 3: Check localStorage
  console.log('\n3. CHECKING localStorage:');
  var storedValue = localStorage.getItem('value');
  if (storedValue !== null) {
    var storedPrice = parseFloat(storedValue);
    console.log('   ✅ localStorage value found: $' + storedPrice);
    if (storedPrice === 0) {
      console.log('   ✅ CORRECT: localStorage has $0 (final price)');
    } else {
      console.log('   ❌ INCORRECT: localStorage has $' + storedPrice + ' (should be $0)');
      console.log('   Action: Update GTM Tag 86 with new code');
    }
  } else {
    console.log('   ⚠️  No value in localStorage yet');
  }
  
  // Test 4: Simulate the updateSelectedPrice function
  console.log('\n4. SIMULATING updateSelectedPrice FUNCTION:');
  try {
    var price = 0;
    var priceText = "";
    var finalPriceFound = false;
    
    // Check #offer-price
    var finalPriceEl = document.querySelector("#offer-price");
    if (finalPriceEl) {
      var finalPriceText = finalPriceEl.innerText || finalPriceEl.textContent || '';
      var finalPriceMatch = finalPriceText.match(/\$?([\d,]+(?:\.\d{2})?)/);
      if (finalPriceMatch) {
        priceText = finalPriceMatch[1];
        finalPriceFound = true;
        console.log('   ✅ Found final price in #offer-price: $' + priceText);
      }
    }
    
    // Check Due now (fallback)
    if (!finalPriceFound) {
      var dueNowSection = document.querySelector('.embedded-checkout-price-detail');
      if (dueNowSection) {
        var dueNowText = dueNowSection.innerText || dueNowSection.textContent || '';
        var priceMatches = dueNowText.match(/\$([\d,]+(?:\.\d{2})?)/g);
        if (priceMatches && priceMatches.length > 0) {
          var lastMatch = priceMatches[priceMatches.length - 1];
          var dueNowMatch = lastMatch.match(/\$([\d,]+(?:\.\d{2})?)/);
          if (dueNowMatch) {
            priceText = dueNowMatch[1];
            finalPriceFound = true;
            console.log('   ✅ Found final price in Due now: $' + priceText);
          }
        }
      }
    }
    
    if (priceText) {
      price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      if (!isNaN(price) && price >= 0) {
        console.log('   ✅ Would save to localStorage: $' + price);
        if (price === 0) {
          console.log('   ✅ CORRECT: Final price is $0');
        } else {
          console.log('   ⚠️  Price is $' + price + ' (expected $0)');
        }
      }
    } else {
      console.log('   ❌ Could not extract price');
    }
  } catch(e) {
    console.error('   ❌ Error:', e);
  }
  
  // Summary
  console.log('\n5. SUMMARY:');
  var offerPriceEl = document.querySelector("#offer-price");
  var storedValue = localStorage.getItem('value');
  
  if (offerPriceEl) {
    var offerPriceText = offerPriceEl.innerText || offerPriceEl.textContent || '';
    var match = offerPriceText.match(/\$?([\d,]+(?:\.\d{2})?)/);
    if (match) {
      var finalPrice = parseFloat(match[1].replace(/,/g, ''));
      var storedPrice = storedValue ? parseFloat(storedValue) : null;
      
      if (finalPrice === 0 && storedPrice === 0) {
        console.log('   ✅✅✅ PERFECT: Both #offer-price and localStorage show $0');
        console.log('   Purchase event should now track $0 correctly!');
      } else if (finalPrice === 0 && storedPrice !== 0) {
        console.log('   ⚠️  #offer-price shows $0, but localStorage has $' + storedPrice);
        console.log('   Action: Update GTM Tag 86 with new code, then refresh page');
      } else {
        console.log('   ⚠️  #offer-price shows $' + finalPrice + ' (not $0)');
        console.log('   Check: Is coupon actually applied?');
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
})();
