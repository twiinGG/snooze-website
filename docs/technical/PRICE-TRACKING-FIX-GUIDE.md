> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Price Tracking Fix Guide

**Date:** December 16, 2025  
**Issue:** Price not being saved to LocalStorage on checkout page  
**Status:** Debugging Required

---

## Problem

- ✅ GTM is loaded
- ✅ Facebook Pixel is loaded
- ✅ dataLayer exists
- ❌ `localStorage.getItem('value')` returns `null`

This means the price scraper (GTM Tag 86) is either:
1. Not running
2. Not finding the price selectors
3. Finding selectors but price format doesn't match regex

---

## Debug Steps

### Step 1: Run Diagnostic Script

**In browser console on checkout page, paste:**

```javascript
// Copy the entire script from: docs/technical/PRICE-TRACKING-DEBUG-SCRIPT.js
// Or run this quick check:

console.log("=== QUICK PRICE CHECK ===");
console.log("Selected option:", document.querySelector('.embedded-checkout-pricing-option.selected'));
console.log("All options:", document.querySelectorAll('.embedded-checkout-pricing-option').length);
console.log("Offer price element:", document.querySelector('#offer-price'));
console.log("Current localStorage value:", localStorage.getItem('value'));
```

### Step 2: Check if Scraper is Running

**Look in console for:**
- `"Snooze Tracking: Starting Dynamic Price Scraper..."`
- `"Snooze Tracking: Updated Price to [number]"`

**If you DON'T see these messages:**
- GTM Tag 86 may not be firing
- Check GTM container is published
- Check trigger conditions for Tag 86

### Step 3: Verify Selectors Exist

**Run in console:**
```javascript
// Check primary selector
document.querySelector('.embedded-checkout-pricing-option.selected')

// Check all pricing options
document.querySelectorAll('.embedded-checkout-pricing-option')

// Check fallback selector
document.querySelector('#offer-price')
```

**If selectors return `null`:**
- Kajabi checkout HTML structure has changed
- Need to update GTM Tag 86 with new selectors

### Step 4: Test Manual Price Extraction

**Run in console:**
```javascript
// Try to extract price manually
var selected = document.querySelector('.embedded-checkout-pricing-option.selected');
if (selected) {
  var match = selected.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
  if (match) {
    var price = parseFloat(match[1].replace(/,/g, ''));
    console.log("Price found:", price);
    // Try to save it
    localStorage.setItem('value', price);
    console.log("Saved! Check:", localStorage.getItem('value'));
  } else {
    console.log("No price pattern matched in:", selected.innerText);
  }
}
```

---

## Common Issues & Fixes

### Issue 1: Selectors Changed

**Symptom:** `document.querySelector('.embedded-checkout-pricing-option.selected')` returns `null`

**Fix:**
1. Inspect checkout page HTML
2. Find the actual class/id for pricing options
3. Update GTM Tag 86 with new selectors
4. Test in console before updating GTM

### Issue 2: Price Scraper Not Firing

**Symptom:** No console messages from scraper

**Fix:**
1. Check GTM container is published
2. Verify Tag 86 trigger conditions
3. Check if tag is paused
4. Verify trigger fires on checkout page

### Issue 3: Price Format Doesn't Match Regex

**Symptom:** Selectors found but price not extracted

**Fix:**
1. Check actual price format in HTML
2. Update regex pattern in GTM Tag 86 if needed
3. Test regex in console first

### Issue 4: Price Options Not Loaded Yet

**Symptom:** Selectors return `null` immediately but exist after page loads

**Fix:**
1. Add delay to price scraper
2. Use MutationObserver to wait for elements
3. Check if pricing loads via AJAX

---

## Quick Fix: Manual Price Save

**If you need to test immediately and price is visible:**

```javascript
// Find price on page
var priceText = document.body.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
if (priceText) {
  var price = parseFloat(priceText[1].replace(/,/g, ''));
  localStorage.setItem('value', price);
  console.log("Manually saved: $" + price);
}
```

**Note:** This is temporary. Fix the actual scraper for production.

---

## GTM Tag 86 Location

**Container:** `GTM-KNRTH6P` (Web Container)  
**Tag ID:** `86`  
**Tag Name:** `0.2 Set - Purchase - UserData`  
**Type:** Custom HTML

**To Update:**
1. Go to Google Tag Manager
2. Open container `GTM-KNRTH6P`
3. Find Tag 86
4. Edit the HTML code
5. Update selectors if needed
6. Test in Preview mode
7. Publish

---

## Testing After Fix

1. Clear browser cache and localStorage
2. Reload checkout page
3. Check console for scraper messages
4. Verify `localStorage.getItem('value')` has price
5. Click between pricing options
6. Verify price updates in localStorage
7. Complete test purchase
8. Verify purchase event has correct value

---

## Related Files

- `docs/technical/PRICE-TRACKING-DEBUG-SCRIPT.js` - Diagnostic script
- `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` - Full tracking docs
- `docs/technical/TRACKING-TEST-CHECKLIST.md` - Testing procedures

---

**Last Updated:** December 16, 2025

