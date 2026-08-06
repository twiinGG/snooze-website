> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> **Marked CRITICAL, BLOCKING META ADS LAUNCH. Meta ad spend has been off since April 2026, so this is no longer blocking anything.**
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Tracking Issue: Checkout Page Missing Meta Pixel

**Date:** December 16, 2025  
**Issue:** Meta Pixel not loading on checkout pages  
**Status:** 🔴 **CRITICAL - BLOCKING META ADS LAUNCH**

---

## Problem Summary

The Meta Pixel (and GTM tracking) is **NOT loading on checkout pages**, but **IS working on the home page**.

### Comparison Results

#### ✅ Home Page (`joinsnooze.com`)
- **GTM Container:** `GTM-KNRTH6P` ✅ Present
- **Stape Loader:** `https://load.ss.joinsnooze.com/2ostmfzxzts.js` ✅ Present
- **Facebook Pixel:** References found ✅ Present
- **Status:** Tracking scripts are in page source

#### ❌ Checkout Page (`joinsnooze.com/offers/6iRarwak/checkout`)
- **GTM Container:** ❌ NOT FOUND
- **Stape Loader:** ❌ NOT FOUND
- **Facebook Pixel:** ❌ NOT FOUND
- **Status:** No tracking scripts in page source

---

## Root Cause Analysis

### Expected Behavior

According to `SNOOZE-TECHNICAL-TRACKING-BIBLE.md`:

1. **Checkout pages should load tracking IMMEDIATELY:**
   ```javascript
   // Checkout pages are NOT in fastPages array
   // So they should load: https://load.ss.joinsnooze.com/2ostmfzxzts.js
   ```

2. **The header script should be in Kajabi:**
   - Location: Kajabi → Settings → Site Details → Header Page Scripts
   - Should contain the hybrid tracking system

### Actual Behavior

- Home page has the tracking script ✅
- Checkout page does NOT have the tracking script ❌

### Possible Causes

1. **Kajabi Checkout Pages Use Different Template**
   - Checkout pages might not inherit the header script
   - Kajabi might have separate header settings for checkout pages

2. **Header Script Not Applied to Checkout Pages**
   - Kajabi might require separate configuration for checkout pages
   - Header scripts might only apply to regular pages, not checkout

3. **Checkout Page Uses Embedded/Modal Format**
   - Kajabi checkout might be in an iframe or modal
   - Header scripts might not load in embedded contexts

---

## Verification Steps

### 1. Check Kajabi Header Script Settings

**Action Required:**
1. Go to Kajabi → Settings → Site Details → Header Page Scripts
2. Verify the tracking script is present
3. Check if there's a separate setting for "Checkout Page Scripts" or "Offer Page Scripts"
4. Look for any settings that control script loading on checkout pages

### 2. Check Checkout Page Template

**Action Required:**
1. Go to Kajabi → Sales → Offers → `6iRarwak` (Founding Member)
2. Check the offer settings
3. Look for "Checkout Page Settings" or "Custom Checkout"
4. Verify if there's a separate header/footer script section for checkout pages

### 3. Test Other Checkout Pages

**Action Required:**
- Test other offer checkout pages to see if issue is universal
- Check if it's specific to this offer or all checkouts

---

## ✅ SOLUTION FOUND

**Kajabi has a separate "Checkout Tracking Code" setting:**
- Location: Kajabi → Settings → Checkout Tracking Code → Header Tracking Code
- **Issue:** The code is still using the old domain: `joinsnooze.com`
- **Fix:** Update to use `joinsnooze.com` domain

### Immediate Fix

1. Go to: Kajabi → Settings → Checkout Tracking Code
2. Click: "Edit header tracking code"
3. Find: `https://load.ss.joinsnooze.com/2ostmfzxzts.js?`
4. Replace with: `https://load.ss.joinsnooze.com/2ostmfzxzts.js?`
5. Save changes

**See:** `docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md` for the complete corrected code.

---

## Testing After Fix

Once fixed, verify:

1. **Checkout Page Source:**
   ```bash
   curl -s "https://www.joinsnooze.com/offers/6iRarwak/checkout" | grep -i "gtm\|load.ss.joinsnooze"
   ```
   Should show: GTM container and Stape loader

2. **Browser Console:**
   - Open checkout page in browser
   - Open DevTools → Console
   - Should see: `"Snooze: Commerce Page - Loading Full Tracking"`
   - Should see: GTM loading messages

3. **Network Tab:**
   - Open DevTools → Network
   - Filter for: `gtm`, `facebook`, `pixel`
   - Should see requests to:
     - `load.ss.joinsnooze.com`
     - `googletagmanager.com`
     - `facebook.net` (pixel)

4. **Facebook Pixel Helper:**
   - Install Facebook Pixel Helper extension
   - Visit checkout page
   - Should show: Pixel loaded (ID: 449153684613893)

---

## Impact

### Critical Issues:
- ❌ **No purchase tracking** - Meta won't receive purchase events
- ❌ **No conversion data** - Can't optimize ads for purchases
- ❌ **No attribution** - Can't track which ads lead to sales
- ❌ **No retargeting** - Can't create custom audiences from purchasers

### Cannot Launch Meta Ads Until Fixed:
- Purchase events are the PRIMARY conversion event
- Without purchase tracking, ads can't optimize
- ROI tracking will be impossible

---

## Next Steps

1. **URGENT:** Verify Kajabi checkout page script settings
2. **URGENT:** Add tracking script to checkout pages (via template or code block)
3. **URGENT:** Test checkout page tracking after fix
4. **URGENT:** Verify Meta Pixel fires on checkout page
5. **URGENT:** Complete test purchase and verify event in Meta Events Manager

---

## Related Documentation

- `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` - Full tracking setup
- `docs/technical/TRACKING-TEST-CHECKLIST.md` - Testing procedures
- `docs/technical/TRACKING-TEST-SCRIPT.js` - Automated test script

---

**Last Updated:** December 16, 2025  
**Priority:** 🔴 **CRITICAL - BLOCKING**

