> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Price Tracking Root Cause Fix

**Date:** December 16, 2025  
**Issue:** Price scraper (GTM Tag 86) not running automatically  
**Status:** 🔴 **NEEDS FIX IN GTM**

---

## Problem Identified

From diagnostic results:
- ✅ Selectors work correctly
- ✅ Price can be extracted manually
- ❌ **GTM Tag 86 (price scraper) is NOT running automatically**
- ❌ localStorage has stale value from previous manual run

**Root Cause:** The price scraper script in GTM Tag 86 is not firing on the checkout page.

---

## Immediate Fix (Temporary)

**Run this in console to fix current session:**

```javascript
// Clear and fix localStorage
localStorage.removeItem('value');
var selected = document.querySelector('.embedded-checkout-pricing-option.selected');
if (selected) {
  var match = selected.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
  if (match) {
    var price = parseFloat(match[1].replace(/,/g, ''));
    localStorage.setItem('value', price);
    console.log("Fixed! Price saved: $" + price);
  }
}
```

**Or use the full fix script:** `docs/technical/PRICE-TRACKING-IMMEDIATE-FIX.js`

---

## Permanent Fix: GTM Tag 86

### Step 1: Verify Tag 86 Exists and is Active

1. Go to Google Tag Manager
2. Open container: `GTM-KNRTH6P`
3. Find Tag ID: `86`
4. Tag Name: `0.2 Set - Purchase - UserData`
5. Check:
   - [ ] Tag is **NOT paused**
   - [ ] Tag has trigger configured
   - [ ] Trigger fires on checkout pages

### Step 2: Check Trigger Configuration

**Tag 86 should fire on:**
- Checkout pages (`/offers/*/checkout`)
- Or: All pages (if using page view trigger)

**Common triggers:**
- Page View - All Pages
- Page View - Some Pages (with checkout URL pattern)
- Custom Event

**Verify trigger:**
1. Go to GTM → Preview mode
2. Navigate to checkout page
3. Check if Tag 86 fires
4. If not, check trigger conditions

### Step 3: Verify Tag Code

**Tag 86 should contain:**
```javascript
<script>
(function() {
  console.log("Snooze Tracking: Starting Dynamic Price Scraper...");
  
  // Price update function
  function updateSelectedPrice() {
    // ... price extraction code ...
  }
  
  // Run immediately
  updateSelectedPrice();
  
  // Listen for clicks
  var pricingOptions = document.querySelectorAll(".embedded-checkout-pricing-option");
  pricingOptions.forEach(function(option) {
    option.addEventListener("click", function() {
      setTimeout(updateSelectedPrice, 500);
    });
  });
  
  // ... rest of scraper code ...
})();
</script>
```

**Check:**
- [ ] Code is present in Tag 86
- [ ] Console log message is in code
- [ ] Selectors match current checkout HTML

### Step 4: Test in GTM Preview Mode

1. Enable GTM Preview mode
2. Navigate to: `https://www.joinsnooze.com/offers/6iRarwak/checkout`
3. Check GTM Preview panel:
   - [ ] Tag 86 appears in "Tags Fired"
   - [ ] No errors shown
4. Check browser console:
   - [ ] Should see: `"Snooze Tracking: Starting Dynamic Price Scraper..."`
   - [ ] Should see: `"Snooze Tracking: Updated Price to [number]"`

### Step 5: Fix Trigger if Needed

**If Tag 86 is not firing:**

**Option A: Add Page View Trigger**
1. Create new trigger: "Page View - Checkout Pages"
2. Trigger type: Page View
3. This trigger fires on: Some Page Views
4. Condition: Page URL contains `/offers/` AND Page URL contains `/checkout`
5. Assign to Tag 86

**Option B: Use Custom Event**
1. Create trigger: "Checkout Page Loaded"
2. Trigger type: Custom Event
3. Event name: `checkout_page_loaded` (or similar)
4. Fire on checkout page via header script
5. Assign to Tag 86

**Option C: Fire on All Pages (Simplest)**
1. Use existing "All Pages" trigger
2. Tag will fire everywhere (slight performance impact)
3. Scraper code checks for elements before running

---

## Testing After Fix

1. **Clear browser cache and localStorage**
2. **Reload checkout page**
3. **Check console for:**
   - `"Snooze Tracking: Starting Dynamic Price Scraper..."`
   - `"Snooze Tracking: Updated Price to 147"` (or 490)
4. **Verify localStorage:**
   ```javascript
   localStorage.getItem('value') // Should be "147" or "490"
   ```
5. **Click between pricing options:**
   - Click Quarterly → Wait 500ms → Check localStorage
   - Click Annual → Wait 500ms → Check localStorage
   - Should update automatically
6. **Complete test purchase:**
   - Verify purchase event has correct value

---

## Why This Happened

Possible reasons Tag 86 isn't firing:

1. **Trigger not configured for checkout pages**
   - Most common issue
   - Trigger only fires on regular pages, not checkout

2. **Tag is paused**
   - Someone paused it for testing
   - Forgot to unpause

3. **Container not published**
   - Changes made but not published
   - Old version still live

4. **Trigger condition too restrictive**
   - URL pattern doesn't match checkout URLs
   - Regex pattern incorrect

---

## Quick Verification Commands

**In browser console on checkout page:**

```javascript
// Check if scraper ran
console.log("Scraper message in console history? (check manually)");

// Check localStorage
console.log("Current value:", localStorage.getItem('value'));

// Check selectors
console.log("Selected option:", document.querySelector('.embedded-checkout-pricing-option.selected'));
console.log("Offer price:", document.querySelector('#offer-price'));

// Manually extract and save (temporary)
var selected = document.querySelector('.embedded-checkout-pricing-option.selected');
if (selected) {
  var match = selected.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
  if (match) {
    var price = parseFloat(match[1].replace(/,/g, ''));
    localStorage.setItem('value', price);
    console.log("Manually saved: $" + price);
  }
}
```

---

## Related Files

- `docs/technical/PRICE-TRACKING-DEBUG-SCRIPT.js` - Diagnostic tool
- `docs/technical/PRICE-TRACKING-IMMEDIATE-FIX.js` - Temporary fix script
- `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` - Full tracking docs

---

**Last Updated:** December 16, 2025  
**Priority:** 🔴 **HIGH - Fix before Meta ads launch**

