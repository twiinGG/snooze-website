# GTM Tag 86 Click Listener Fix

**Date:** December 16, 2025  
**Issue:** Price doesn't update in localStorage when clicking between pricing options  
**Status:** 🔴 **NEEDS FIX IN GTM TAG 86**

---

## Problem

The price scraper runs on page load and captures the initial price, but when users click between pricing options (Quarterly/Annual), the price in localStorage doesn't update.

**Symptoms:**
- ✅ Scraper runs on page load: `"Snooze Tracking: Starting Dynamic Price Scraper..."`
- ✅ Initial price is captured
- ❌ Clicking between options doesn't update localStorage
- ❌ Price stays at initial value (e.g., stuck at 147 even when Annual is selected)

---

## Root Cause

The click listeners in GTM Tag 86 may not be working because:

1. **Pricing options load after script runs** - Listeners attached before elements exist
2. **Elements get replaced** - Kajabi may replace elements, removing listeners
3. **Event listeners not attached** - Selector doesn't find elements when script runs
4. **Timing issue** - 500ms delay may not be enough for UI update

---

## Solution: Update GTM Tag 86 Code

### Current Code Issue

The current code in Tag 86 tries to attach listeners immediately:

```javascript
// This may run before pricing options are loaded
var pricingOptions = document.querySelectorAll(".embedded-checkout-pricing-option");
pricingOptions.forEach(function(option) {
  option.addEventListener("click", function() {
    setTimeout(updateSelectedPrice, 500);
  });
});
```

**Problem:** If elements don't exist yet, `querySelectorAll` returns empty array, so no listeners are attached.

---

## Fixed Code for GTM Tag 86

**Replace the click listener section in Tag 86 with this improved version:**

```javascript
<script>
(function() {
  console.log("Snooze Tracking: Starting Dynamic Price Scraper...");

  // ... existing price update function ...
  function updateSelectedPrice() {
    try {
      var priceText = "";
      
      // 1. Try selected pricing option
      var selectedOption = document.querySelector(".embedded-checkout-pricing-option.selected");
      if (selectedOption) {
        var match = selectedOption.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
        if (match) priceText = match[1];
      }
      
      // 2. Fallback to offer price
      if (!priceText) {
        var offerPrice = document.querySelector("#offer-price");
        if (offerPrice) {
          var match = offerPrice.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
          if (match) priceText = match[1];
        }
      }
      
      // 3. Save
      if (priceText) {
        var price = parseFloat(priceText.replace(/,/g, ''));
        if (!isNaN(price) && price > 0) {
          window.localStorage.setItem("value", price);
          console.log("Snooze Tracking: Updated Price to " + price);
        }
      }
    } catch(e) { console.error("Snooze Price Error:", e); }
  }

  // Run immediately
  updateSelectedPrice();

  // IMPROVED: Function to attach click listeners
  function attachClickListeners() {
    var pricingOptions = document.querySelectorAll(".embedded-checkout-pricing-option");
    var attached = 0;
    
    pricingOptions.forEach(function(option) {
      // Remove existing listener by cloning (prevents duplicates)
      var newOption = option.cloneNode(true);
      option.parentNode.replaceChild(newOption, option);
      
      // Add click listener
      newOption.addEventListener("click", function() {
        console.log("Snooze Tracking: Pricing option clicked");
        setTimeout(function() {
          updateSelectedPrice();
        }, 500);
      });
      
      attached++;
    });
    
    if (attached > 0) {
      console.log("Snooze Tracking: Attached listeners to " + attached + " pricing options");
    }
    
    return attached;
  }

  // Strategy 1: Try to attach immediately
  var listenersAttached = attachClickListeners();

  // Strategy 2: Use event delegation (works even if elements load later)
  var container = document.querySelector('.embedded-checkout-pricing-options') || 
                  document.querySelector('[class*="pricing"]') || 
                  document.body;
  
  container.addEventListener('click', function(e) {
    var clickedOption = e.target.closest('.embedded-checkout-pricing-option');
    if (clickedOption) {
      console.log("Snooze Tracking: Pricing option clicked (delegation)");
      setTimeout(function() {
        updateSelectedPrice();
      }, 500);
    }
  });

  // Strategy 3: Retry if elements not found (for dynamic loading)
  if (listenersAttached === 0) {
    console.log("Snooze Tracking: No pricing options found, retrying in 1 second...");
    setTimeout(function() {
      attachClickListeners();
    }, 1000);
    
    // Also retry after 2 seconds
    setTimeout(function() {
      attachClickListeners();
    }, 2000);
  }

  // Strategy 4: Watch for selection changes (MutationObserver)
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        var target = mutation.target;
        if (target.classList.contains('embedded-checkout-pricing-option') && 
            target.classList.contains('selected')) {
          console.log("Snooze Tracking: Selection changed (MutationObserver)");
          setTimeout(updateSelectedPrice, 100);
        }
      }
    });
  });

  // Observe pricing options container
  var pricingContainer = document.querySelector('.embedded-checkout-pricing-options') || 
                         document.querySelector('[class*="pricing"]') ||
                         document.body;
  
  observer.observe(pricingContainer, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });

  // ... rest of existing scraper code (email, phone, etc.) ...
  
})();
</script>
```

---

## Step-by-Step Fix in GTM

### Step 1: Open GTM Tag 86

1. Go to Google Tag Manager
2. Container: `GTM-KNRTH6P`
3. **Tags** → Find Tag **86** (`0.2 Set - Purchase - UserData`)
4. Click to edit

### Step 2: Update the Code

1. Find the section with click listeners (around line with `pricingOptions.forEach`)
2. Replace with the improved code above
3. The new code includes:
   - ✅ Event delegation (works even if elements load later)
   - ✅ Retry logic (if elements not found initially)
   - ✅ MutationObserver (watches for selection changes)
   - ✅ Multiple strategies for reliability

### Step 3: Test in Preview Mode

1. Click **Preview** in GTM
2. Navigate to checkout page
3. Check console for:
   - `"Snooze Tracking: Attached listeners to X pricing options"`
   - `"Snooze Tracking: Pricing option clicked"` (when you click)
   - `"Snooze Tracking: Updated Price to [number]"` (after click)

### Step 4: Publish

1. Click **Save** on tag
2. Click **Submit** → **Publish**
3. Version name: `Fix Tag 86 - Improve click listeners for price updates`

---

## Temporary Fix (Run in Console)

**While waiting for GTM fix, run this on checkout page:**

```javascript
// Copy the entire script from: docs/technical/PRICE-TRACKING-CLICK-FIX.js
// Or run this quick fix:

(function() {
  function updatePrice() {
    var selected = document.querySelector('.embedded-checkout-pricing-option.selected');
    if (selected) {
      var match = selected.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
      if (match) {
        var price = parseFloat(match[1].replace(/,/g, ''));
        localStorage.setItem('value', price);
        console.log('✅ Price updated: $' + price);
      }
    }
  }
  
  // Event delegation
  document.body.addEventListener('click', function(e) {
    if (e.target.closest('.embedded-checkout-pricing-option')) {
      setTimeout(updatePrice, 500);
    }
  });
  
  console.log('✅ Click listener fix applied');
})();
```

---

## Testing After Fix

1. **Clear localStorage:**
   ```javascript
   localStorage.removeItem('value');
   ```

2. **Reload checkout page**

3. **Check initial price:**
   ```javascript
   localStorage.getItem('value') // Should have initial price
   ```

4. **Click different pricing option**

5. **Wait 500ms, then check:**
   ```javascript
   localStorage.getItem('value') // Should update to new price
   ```

6. **Check console:**
   - Should see: `"Snooze Tracking: Pricing option clicked"`
   - Should see: `"Snooze Tracking: Updated Price to [new price]"`

---

## Why Multiple Strategies?

The fix uses 4 strategies to ensure it works:

1. **Direct listeners** - Fastest, works if elements exist
2. **Event delegation** - Works even if elements load later
3. **Retry logic** - Handles dynamic loading
4. **MutationObserver** - Catches any selection changes

This ensures price updates work in all scenarios.

---

## Related Files

- `docs/technical/PRICE-TRACKING-CLICK-FIX.js` - Temporary fix script
- `docs/technical/PRICE-TRACKING-ROOT-CAUSE-FIX.md` - Full fix guide

---

**Last Updated:** December 16, 2025  
**Priority:** 🔴 **HIGH - Fix before Meta ads launch**
