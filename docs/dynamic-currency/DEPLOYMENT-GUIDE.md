# Currency Toggle - Complete Deployment Guide

**Date:** December 30, 2025  
**Version:** 2.0 (Merged Implementation)  
**Status:** Ready for Deployment

---

## Overview

This guide provides step-by-step instructions for deploying the Snooze Dynamic Currency Toggle to your Kajabi website. The implementation includes:

- ✅ Automated currency detection (timezone-based)
- ✅ Dynamic price and link updates
- ✅ GTM tracking integration
- ✅ Checkout page currency switching
- ✅ Error handling and fallbacks

---

## Prerequisites

- Access to Kajabi Admin Panel
- Access to Google Tag Manager (GTM-KNRTH6P)
- List of pages with pricing that need currency toggle
- AUD offer IDs verified in Kajabi

---

## Step 1: Add FOUC Prevention Script

**Location:** Kajabi Settings → Site Details → Header Page Scripts

1. Open `currency-toggle-fouc.html`
2. Copy the entire contents
3. Paste into **Header Page Scripts** field
4. Save

**What This Does:**
- Prevents "Flash of Unstyled Content" (wrong currency showing briefly)
- Runs immediately in `<head>` before page renders
- Auto-detects currency preference from localStorage or timezone

**Verification:**
- Reload any page with pricing
- Prices should not flash wrong currency on load

---

## Step 2: Add Main JavaScript

**Location:** Kajabi Settings → Site Details → Footer Page Scripts

1. Open `currency-toggle.js`
2. Copy the entire contents
3. Paste into **Footer Page Scripts** field
4. Save

**What This Does:**
- Handles currency switching logic
- Automatically injects toggle into navigation
- Updates prices and checkout links
- Handles checkout page currency switching

**Verification:**
- Check browser console for any errors
- Toggle should appear in navigation (desktop and mobile)

---

## Step 3: Add CSS Styles

**Location:** Kajabi Settings → Theme → Custom CSS

1. Open `currency-toggle.css`
2. Copy the entire contents
3. Append to existing Custom CSS (don't replace)
4. Save

**What This Does:**
- Styles the currency toggle button
- Handles FOUC prevention
- Styles checkout page currency switch link
- Mobile responsive styles

**Verification:**
- Toggle button should be styled correctly
- Prices should fade in smoothly (not flash)

---

## Step 4: Configure GTM Variables

**Location:** Google Tag Manager → Variables

### Variable 1: CJS - User Currency Preference

1. Go to GTM → Variables → New
2. Variable Type: **Custom JavaScript**
3. Variable Name: `CJS - User Currency Preference`
4. Open `gtm-variables.js`
5. Copy the first function (CJS - User Currency Preference)
6. Paste into the code field
7. Save

### Variable 2: CJS - Dynamic Click Value

1. Go to GTM → Variables → New
2. Variable Type: **Custom JavaScript**
3. Variable Name: `CJS - Dynamic Click Value`
4. Open `gtm-variables.js`
5. Copy the second function (CJS - Dynamic Click Value)
6. Paste into the code field
7. Save

**Verification:**
- Go to GTM Preview mode
- Navigate to a page with pricing
- Check Variables tab → Should show currency preference
- Click a checkout button → Should show correct price value

---

## Step 5: Update GTM Tags

**Location:** Google Tag Manager → Tags

### For GA4 Events (begin_checkout, add_to_cart, etc.)

1. Open each relevant GA4 tag
2. Add/Update parameters:
   - **currency:** `{{CJS - User Currency Preference}}`
   - **value:** `{{CJS - Dynamic Click Value}}`
3. Save

### For Meta Pixel Events

1. Open Meta Pixel tags (or Custom HTML)
2. Update event tracking to include:
   ```javascript
   fbq('track', 'InitiateCheckout', {
     value: {{CJS - Dynamic Click Value}},
     currency: '{{CJS - User Currency Preference}}',
     content_name: 'Snooze Membership'
   });
   ```
3. Save

**Verification:**
- Use GTM Preview mode
- Click checkout buttons
- Verify events include correct currency and value

---

## Step 6: Add Purchase Event Tracking

**Location:** Kajabi Settings → Checkout Settings → Page Tracking Code

1. Open `kajabi-checkout-tracking.js`
2. Copy the entire contents
3. Paste into **Page Tracking Code** field
4. Save

**What This Does:**
- Pushes purchase events to GTM with correct currency
- Detects currency based on offer ID
- Also sends to Meta Pixel

**Verification:**
- Complete a test purchase (USD and AUD)
- Check GTM Preview mode → Purchase events should include currency
- Check GA4 Real-time → Purchase events should show correct currency

---

## Step 7: Update Content with Data Attributes

**Location:** Kajabi Page Builder → Individual Pages

### For Price Elements

Add to all price text elements:

```html
<span class="dynamic-price" 
      data-usd="147" 
      data-aud="220" 
      data-period-usd="/ 3 months" 
      data-period-aud="/ 3 months">
  $147 USD / 3 months
</span>
```

**Required Attributes:**
- `class="dynamic-price"` (required)
- `data-usd="[number]"` (required)
- `data-aud="[number]"` (required)
- `data-period-usd="[text]"` (optional)
- `data-period-aud="[text]"` (optional)

### For Checkout Buttons

Add class to all checkout buttons:

```html
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" 
   class="dynamic-cta">
  Join Now
</a>
```

**Required:**
- `class="dynamic-cta"` (required)
- `href` must contain a known offer ID (6iRarwak, bFxLg2uz, etc.)

**Note:** The script automatically detects and updates URLs, so you don't need `data-link-usd`/`data-link-aud` attributes.

---

## Step 8: Testing Checklist

### Functional Tests

- [ ] **Auto-Detection:** Use VPN set to Australia. Does toggle default to AUD?
- [ ] **Toggle Switch:** Click toggle. Do prices change? Do button URLs change?
- [ ] **Persistence:** Refresh page. Does selection stay?
- [ ] **Checkout:** Click "Join" in AUD mode. Do you land on AUD checkout page?
- [ ] **Checkout Switch:** On checkout page, does "Switch to USD" link appear and work?
- [ ] **Mobile:** Check mobile menu. Is toggle visible and functional?
- [ ] **FOUC:** Load page on slow connection. Do prices fade in correctly (no flash)?

### GTM Tracking Tests

- [ ] **Currency Variable:** GTM Preview → Variables → Currency preference shows correctly
- [ ] **Click Value:** Click checkout button → Value shows correct price
- [ ] **Purchase Event:** Complete purchase → Event includes correct currency code
- [ ] **GA4 Events:** All events include currency parameter
- [ ] **Meta Pixel:** Events include currency parameter

### Cross-Browser Tests

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

---

## Troubleshooting

### Toggle Not Appearing

**Issue:** Toggle button not visible in navigation

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify navigation selectors match your theme (check `injectToggles()` function)
3. Verify CSS is loaded (check Network tab)
4. Check if navigation HTML structure matches expected selectors

### Prices Not Updating

**Issue:** Prices don't change when toggle is clicked

**Solutions:**
1. Check that elements have `class="dynamic-price"`
2. Verify `data-usd` and `data-aud` attributes are present
3. Check browser console for warnings/errors
4. Verify localStorage is available (not blocked)

### GTM Tracking Not Working

**Issue:** Events don't include currency codes

**Solutions:**
1. Verify GTM variables are created and published
2. Check GTM Preview mode → Variables tab
3. Verify variable names match exactly (case-sensitive)
4. Check that tags are using the variables correctly
5. Verify purchase tracking code is in Kajabi checkout settings

### Checkout Links Not Updating

**Issue:** Checkout buttons still point to USD when AUD is selected

**Solutions:**
1. Verify buttons have `class="dynamic-cta"`
2. Check that `href` contains a known offer ID
3. Verify offer mapping in `CONFIG.offerMapping` matches your offers
4. Check browser console for errors

---

## Rollback Plan

If critical issues arise:

1. **Remove JavaScript:** Delete from Footer Page Scripts
2. **Remove FOUC Script:** Delete from Header Page Scripts
3. **Remove CSS:** Remove currency toggle CSS from Custom CSS
4. **Clear localStorage:** Users will see USD by default
5. **Revert GTM:** Remove currency variables (optional, won't break site)

**Time to Rollback:** < 5 minutes

---

## Maintenance

### Adding New Offers

When new AUD offers are created:

1. Update `CONFIG.offerMapping` in `currency-toggle.js`
2. Update `CONFIG.audOfferIds` in `currency-toggle.js`
3. Update `audOfferIds` in GTM variable `CJS - User Currency Preference`
4. Update `audOffers` in `kajabi-checkout-tracking.js`

### Updating Prices

When prices change:

1. Update `data-usd` and `data-aud` attributes in Kajabi Page Builder
2. No code changes needed

---

## Support

For issues or questions:
- Check browser console for errors
- Use GTM Preview mode for tracking debugging
- Refer to `SECONDARY-BRIEF-ASSESSMENT.md` for technical details

---

**Last Updated:** December 30, 2025  
**Status:** Ready for Production Deployment
