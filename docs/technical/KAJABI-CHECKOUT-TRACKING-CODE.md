# Kajabi Checkout Page Tracking Code

**Date:** December 16, 2025  
**Location:** Kajabi → Settings → Checkout Tracking Code → Header Tracking Code  
**Status:** ⚠️ **NEEDS UPDATE - Currently using old domain**

---

## Current Issue

The checkout page header tracking code is still using the **old domain**:
- ❌ Current: `https://load.ss.joinsnooze.com/2ostmfzxzts.js?`
- ✅ Should be: `https://load.ss.joinsnooze.com/2ostmfzxzts.js?`

This is why the Meta Pixel isn't loading on checkout pages.

---

## Correct Header Tracking Code

**Location:** Kajabi → Settings → Checkout Tracking Code → Header Tracking Code

**Copy and paste this entire code block:**

```javascript
<!-- Snooze Hybrid Tracking System - Checkout Pages -->
<script>
  // --- CONFIGURATION ---
  var containerId = 'GTM-KNRTH6P';
  
  // Checkout pages always load full tracking immediately (no delay)
  // Load Stape Server-Side Loader immediately for max accuracy.
  console.log('Snooze: Checkout Page - Loading Full Tracking');
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://load.ss.joinsnooze.com/2ostmfzxzts.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','9r2=GhBHPy4rQD89Ji4wTDZLAk5GVElcAgNJABgfHQoFAhoQHR8KHQNDFxwZVBkP');
</script>
```

---

## Update Instructions

1. **Go to Kajabi:**
   - Settings → Checkout Tracking Code

2. **Click "Edit header tracking code"**

3. **Replace the entire code block** with the code above

4. **Key Change:**
   - Find: `https://load.ss.joinsnooze.com/2ostmfzxzts.js?`
   - Replace with: `https://load.ss.joinsnooze.com/2ostmfzxzts.js?`

5. **Save the changes**

---

## What This Code Does

- **Loads GTM Container:** `GTM-KNRTH6P`
- **Loads via Stape Server-Side:** `load.ss.joinsnooze.com` (hides from ad blockers)
- **Fires Immediately:** No delay on checkout pages (critical for tracking purchases)
- **Enables Meta Pixel:** GTM container includes Meta Pixel configuration
- **Enables CAPI:** Server-side tracking sends events to Meta Conversions API

---

## Verification After Update

### 1. Check Page Source
```bash
curl -s "https://www.joinsnooze.com/offers/6iRarwak/checkout" | grep -i "load.ss.joinsnooze"
```
Should show: The Stape loader URL

### 2. Browser Console
- Open checkout page
- Open DevTools → Console
- Should see: `"Snooze: Checkout Page - Loading Full Tracking"`
- Should see: GTM loading messages

### 3. Network Tab
- Open DevTools → Network
- Filter for: `gtm`, `facebook`, `pixel`
- Should see requests to:
  - `load.ss.joinsnooze.com` ✅
  - `googletagmanager.com` ✅
  - `facebook.net` (pixel) ✅

### 4. Facebook Pixel Helper
- Install Facebook Pixel Helper extension
- Visit checkout page
- Should show: Pixel loaded (ID: 449153684613893) ✅

---

## Footer Tracking Code

**Current Status:** Empty (no footer code needed)

**Note:** The header code is sufficient. Footer code is only needed if you have additional tracking that must load after page content.

---

## Related Files

- `projects/snooze-website/kajabi-deployment/global/js/snooze-globals.js` - Main header script (for regular pages)
- `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` - Full tracking documentation
- `docs/technical/TRACKING-ISSUE-CHECKOUT-PAGE.md` - Issue diagnosis

---

**Last Updated:** December 16, 2025  
**Priority:** 🔴 **CRITICAL - FIX IMMEDIATELY**

