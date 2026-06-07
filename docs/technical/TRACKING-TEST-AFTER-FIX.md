# Tracking Test After GTM Tag 86 Fix

**Date:** December 16, 2025  
**Status:** Ready for Testing  
**What Changed:** Updated GTM Tag 86 with improved click listeners

---

## Quick Test Checklist

### Step 1: Clear and Reload

1. **Clear localStorage:**
   ```javascript
   localStorage.clear();
   ```

2. **Reload checkout page:**
   - Go to: `https://www.joinsnooze.com/offers/6iRarwak/checkout?coupon_code=KDOSTEST`
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Step 2: Check Initial Load

**In console, you should see:**
- ✅ `"Snooze Tracking: Starting Dynamic Price Scraper..."`
- ✅ `"Snooze Tracking: Attached listeners to 2 pricing options"` (or similar)
- ✅ `"Snooze Tracking: MutationObserver set up to watch for selection changes"`
- ✅ `"Snooze Tracking: Updated Price to 147"` (or 490)

**Check localStorage:**
```javascript
localStorage.getItem('value') // Should be "147" or "490"
```

### Step 3: Test Price Updates

1. **Check current selection:**
   ```javascript
   // See which option is selected
   document.querySelector('.embedded-checkout-pricing-option.selected').innerText
   ```

2. **Click the OTHER pricing option:**
   - If Quarterly ($147) is selected, click Annual ($490)
   - If Annual ($490) is selected, click Quarterly ($147)

3. **Wait 500ms, then check console:**
   - Should see: `"Snooze Tracking: Pricing option clicked"`
   - Should see: `"Snooze Tracking: Updated Price to [new price]"`

4. **Verify localStorage updated:**
   ```javascript
   localStorage.getItem('value') // Should now be the NEW price
   ```

5. **Click back to original option:**
   - Click the other option again
   - Wait 500ms
   - Check: `localStorage.getItem('value')` should update back

### Step 4: Complete Test Purchase

1. **Fill out checkout form**
2. **Complete purchase** (with test coupon)
3. **On thank you page, verify:**
   - Purchase event in dataLayer
   - Correct price value in purchase event
   - Facebook Pixel Helper shows Purchase event

---

## Automated Test Script

**Run this in console on checkout page:**

```javascript
// Complete Price Tracking Test
(function() {
  console.log('%c🧪 PRICE TRACKING TEST', 'font-size: 18px; font-weight: bold;');
  
  // 1. Check initial state
  var initialPrice = localStorage.getItem('value');
  console.log('1. Initial price:', initialPrice || 'NOT SET');
  
  // 2. Check scraper messages (manual check)
  console.log('2. Check console for scraper messages:');
  console.log('   - "Snooze Tracking: Starting Dynamic Price Scraper..."');
  console.log('   - "Snooze Tracking: Attached listeners to X pricing options"');
  
  // 3. Set up price watcher
  var lastPrice = initialPrice;
  var changeCount = 0;
  
  var watcher = setInterval(function() {
    var current = localStorage.getItem('value');
    if (current !== lastPrice) {
      changeCount++;
      console.log('✅ Price changed! Old: $' + lastPrice + ', New: $' + current);
      lastPrice = current;
    }
  }, 200);
  
  console.log('3. Price watcher active - click between pricing options to test');
  console.log('   Watcher will run for 30 seconds');
  
  setTimeout(function() {
    clearInterval(watcher);
    console.log('✅ Test complete. Changes detected:', changeCount);
  }, 30000);
  
  return { initialPrice: initialPrice, watcher: watcher };
})();
```

---

## Expected Results

### ✅ Success Indicators:

1. **On page load:**
   - Scraper runs and logs messages
   - Price saved to localStorage
   - Listeners attached

2. **When clicking pricing options:**
   - Console shows click messages
   - Price updates in localStorage
   - Correct price extracted

3. **On purchase:**
   - Purchase event has correct value
   - Meta receives correct price

### ❌ Failure Indicators:

1. **No scraper messages** - Tag 86 not firing
2. **Price doesn't update on click** - Click listeners not working
3. **Wrong price in purchase event** - Price not captured correctly

---

## Troubleshooting

### Issue: No Scraper Messages

**Check:**
- GTM container is published (not just saved)
- Tag 86 is not paused
- "All Pages" trigger is assigned
- Browser console shows no errors

### Issue: Price Doesn't Update on Click

**Check:**
- Console shows "Pricing option clicked" message
- Wait 500ms after clicking
- Check if MutationObserver is working
- Try the temporary fix script if needed

### Issue: Wrong Price in Purchase

**Check:**
- localStorage has correct price before purchase
- Purchase event reads from correct source
- Test both price options

---

## Full Test Script

**Copy from:** `docs/technical/PRICE-TRACKING-TEST-SCRIPT.js`

---

**Last Updated:** December 16, 2025
