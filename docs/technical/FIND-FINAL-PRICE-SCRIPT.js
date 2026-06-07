/**
 * Find Final Price Element Script
 * 
 * Run this on checkout page WITH coupon applied to find
 * where the final price (after discount) is displayed
 */

(function() {
  console.log('%c🔍 FINDING FINAL PRICE ELEMENT', 'font-size: 18px; font-weight: bold; color: #F43357;');
  console.log('='.repeat(60));
  
  // Common selectors for final/total price
  var selectors = [
    '[class*="total"]',
    '[class*="Total"]',
    '[class*="final"]',
    '[class*="Final"]',
    '[class*="amount"]',
    '[class*="Amount"]',
    '[class*="price"]',
    '[class*="Price"]',
    '[id*="total"]',
    '[id*="Total"]',
    '[id*="final"]',
    '[id*="Final"]',
    '[id*="amount"]',
    '[id*="Amount"]',
    '.checkout-summary',
    '.order-total',
    '.final-price',
    '.total-amount',
    '.summary',
    '.checkout-total'
  ];
  
  console.log('\n1. SEARCHING BY SELECTORS:');
  var foundElements = [];
  
  selectors.forEach(function(sel) {
    try {
      var els = document.querySelectorAll(sel);
      if (els.length > 0) {
        els.forEach(function(el) {
          var text = el.innerText || el.textContent || '';
          // Check if it contains a price
          if (text.match(/\$[\d,]+\.?\d{0,2}/) || text.match(/[\d,]+\.\d{2}/)) {
            var priceMatch = text.match(/\$?([\d,]+\.?\d{0,2})/);
            if (priceMatch) {
              var price = parseFloat(priceMatch[1].replace(/,/g, ''));
              foundElements.push({
                element: el,
                selector: sel,
                price: price,
                text: text.substring(0, 100),
                tagName: el.tagName,
                className: el.className,
                id: el.id
              });
            }
          }
        });
      }
    } catch(e) {}
  });
  
  if (foundElements.length > 0) {
    console.log('   Found ' + foundElements.length + ' elements with prices:');
    foundElements.forEach(function(item, idx) {
      console.log('   [' + idx + '] $' + item.price);
      console.log('       Selector:', item.selector);
      console.log('       Element:', item.tagName, item.className, item.id);
      console.log('       Text:', item.text);
    });
  } else {
    console.log('   ⚠️ No price elements found with common selectors');
  }
  
  // Search all text on page
  console.log('\n2. SEARCHING ALL TEXT FOR PRICES:');
  var allText = document.body.innerText;
  var priceMatches = allText.match(/\$[\d,]+\.?\d{0,2}/g);
  if (priceMatches) {
    var uniquePrices = [...new Set(priceMatches)];
    console.log('   Found prices in page text:', uniquePrices);
    
    // Try to find which element contains each price
    uniquePrices.forEach(function(priceStr) {
      var price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
      console.log('   Looking for element containing: ' + priceStr);
      
      // Search for element containing this exact price
      var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      var node;
      while (node = walker.nextNode()) {
        if (node.textContent.includes(priceStr)) {
          var parent = node.parentElement;
          console.log('     Found in:', parent.tagName, parent.className, parent.id);
          break;
        }
      }
    });
  }
  
  // Check common checkout summary locations
  console.log('\n3. CHECKING COMMON CHECKOUT LOCATIONS:');
  var commonLocations = [
    '.embedded-checkout__summary',
    '.checkout-summary',
    '.order-summary',
    '.price-summary',
    '[class*="summary"]',
    '[class*="Summary"]'
  ];
  
  commonLocations.forEach(function(sel) {
    try {
      var el = document.querySelector(sel);
      if (el) {
        console.log('   Found:', sel);
        console.log('   HTML:', el.innerHTML.substring(0, 200));
        console.log('   Text:', el.innerText.substring(0, 100));
      }
    } catch(e) {}
  });
  
  // Check for discount/coupon applied indicators
  console.log('\n4. CHECKING FOR DISCOUNT/COUPON ELEMENTS:');
  var discountSelectors = [
    '[class*="discount"]',
    '[class*="Discount"]',
    '[class*="coupon"]',
    '[class*="Coupon"]',
    '[class*="savings"]',
    '[class*="Savings"]'
  ];
  
  discountSelectors.forEach(function(sel) {
    try {
      var els = document.querySelectorAll(sel);
      if (els.length > 0) {
        console.log('   Found with:', sel);
        els.forEach(function(el, idx) {
          console.log('     [' + idx + ']', el.tagName, el.className, el.id, 'Text:', el.innerText.substring(0, 50));
        });
      }
    } catch(e) {}
  });
  
  // Summary
  console.log('\n5. SUMMARY:');
  if (foundElements.length > 0) {
    // Find the lowest price (likely the final price after discount)
    var prices = foundElements.map(e => e.price).sort((a, b) => a - b);
    var lowestPrice = prices[0];
    var finalPriceElement = foundElements.find(e => e.price === lowestPrice);
    
    console.log('   Lowest price found: $' + lowestPrice);
    if (lowestPrice === 0) {
      console.log('   ✅ This is likely the final price after 100% discount');
    } else if (lowestPrice < 490 && lowestPrice < 147) {
      console.log('   ✅ This is likely the final price after discount');
    } else {
      console.log('   ⚠️ This might be the base price, not final price');
    }
    
    if (finalPriceElement) {
      console.log('   Element selector:', finalPriceElement.selector);
      console.log('   Element details:', finalPriceElement.tagName, finalPriceElement.className, finalPriceElement.id);
    }
  } else {
    console.log('   ⚠️ Could not find final price element');
    console.log('   Action: Manually inspect checkout page HTML');
  }
  
  return foundElements;
})();
