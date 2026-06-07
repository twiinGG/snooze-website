# Meta Ads Tracking Test Checklist

**Date:** December 16, 2025  
**Purpose:** Comprehensive testing checklist for tracking setup before Meta ads launch  
**Status:** Ready for Testing  
**Domain:** `joinsnooze.com` (migrated from `joinsnooze.com`)

---

## Pre-Test Setup

### Tools Required
- [ ] Chrome Browser with DevTools
- [ ] Facebook Pixel Helper extension
- [ ] Google Tag Assistant extension
- [ ] Browser console access
- [ ] Test credit card (use Kajabi test mode if available)
- [ ] Multiple test email addresses

### Test Environment
- [ ] Use incognito/private browsing mode
- [ ] Clear browser cache and cookies
- [ ] Disable ad blockers
- [ ] Open DevTools → Network tab
- [ ] Open DevTools → Console tab
- [ ] Open DevTools → Application → Local Storage

---

## Part 1: Domain Migration Verification

### 1.1 Header Script Domain Check
**Location:** Kajabi → Settings → Site Details → Header Page Scripts

- [ ] Verify script uses `joinsnooze.com` domain
- [ ] Check for any references to `joinsnooze.com` in header script
- [ ] Verify Stape loader URL: `https://load.ss.joinsnooze.com`
- [ ] Verify server GTM URL: `https://ss.joinsnooze.com`

**Expected Result:**
```javascript
// Should see:
j.src="https://load.ss.joinsnooze.com/2ostmfzxzts.js?"
// NOT:
j.src="https://load.ss.joinsnooze.com/..."
```

### 1.2 GTM Container Domain Check
**Location:** Google Tag Manager → Web Container (`GTM-KNRTH6P`)

- [ ] Verify all tags reference `joinsnooze.com`
- [ ] Check server-side container references
- [ ] Verify no hardcoded `joinsnooze.com` URLs

### 1.3 Live Site Domain Check
- [ ] Visit `https://joinsnooze.com` (should load correctly)
- [ ] Check browser console for any domain errors
- [ ] Verify GTM loads from correct domain
- [ ] Check Network tab for requests to `joinsnooze.com` domains

---

## Part 2: Price Tracking Verification

### 2.1 Offers with Multiple Price Options

#### A. Founding Member Offer (`MBMS01`)
**Offer ID:** `6iRarwak`  
**Checkout URL:** `https://joinsnooze.com/offers/6iRarwak/checkout`  
**Prices:** Quarterly $147, Annual $490

**Test Steps:**
1. [ ] Navigate to checkout page
2. [ ] Open DevTools → Console
3. [ ] Look for: `"Snooze Tracking: Starting Dynamic Price Scraper..."`
4. [ ] Check Local Storage → Application → Local Storage → `joinsnooze.com`
5. [ ] Verify `value` key exists in Local Storage
6. [ ] **Test Quarterly ($147):**
   - [ ] Click Quarterly option
   - [ ] Wait 500ms
   - [ ] Check console: `"Snooze Tracking: Updated Price to 147"`
   - [ ] Verify Local Storage `value` = `147`
7. [ ] **Test Annual ($490):**
   - [ ] Click Annual option
   - [ ] Wait 500ms
   - [ ] Check console: `"Snooze Tracking: Updated Price to 490"`
   - [ ] Verify Local Storage `value` = `490`
8. [ ] **Test Price Scraper Selectors:**
   - [ ] Inspect element: `.embedded-checkout-pricing-option.selected`
   - [ ] Verify selector exists and contains price
   - [ ] Check fallback: `#offer-price` element exists

**Expected Console Output:**
```
Snooze Tracking: Starting Dynamic Price Scraper...
Snooze Tracking: Updated Price to 147  (or 490)
```

**Expected Local Storage:**
```
key: "value"
value: "147" (or "490")
```

#### B. BAU Standard Membership (`MBMS03`)
**Note:** If this offer has multiple price options, repeat test above

---

### 2.2 Single Price Offers

For each offer below, verify price is correctly captured:

#### A. Public Consult (`PUBCS01`) - $650
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `650`
- [ ] Check console for price update message

#### B. Member Consult (`MEMCS01`) - $525
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `525`
- [ ] Check console for price update message

#### C. Newborn Guide (`PUBGD02`) - $67
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `67`
- [ ] Check console for price update message

#### D. 3-4 Month Course (`PUBCR01`) - $117
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `117`
- [ ] Check console for price update message

#### E. 5-12 Month Course (`PUBCR02`) - $117
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `117`
- [ ] Check console for price update message

#### F. Toddler Toolkit (`PUBCR03`) - $117
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `117`
- [ ] Check console for price update message

#### G. Consult Upsell (`UPMBCS01`) - $445
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `445`
- [ ] Check console for price update message

#### H. Guide to Membership Upsell (`UPGDMS01`) - $80
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `80`
- [ ] Check console for price update message

#### I. Course to Membership Upsell (`UPCRMS01`) - $30
- [ ] Navigate to checkout
- [ ] Verify Local Storage `value` = `30`
- [ ] Check console for price update message

---

### 2.3 Price Scraper Code Verification

**Location:** GTM Tag 86 (`0.2 Set - Purchase - UserData`)

- [ ] Verify code uses correct selectors:
  - [ ] `.embedded-checkout-pricing-option.selected` (primary)
  - [ ] `#offer-price` (fallback)
- [ ] Verify price regex pattern: `/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/`
- [ ] Verify event listener on pricing options
- [ ] Verify 500ms delay after click

**Test in Console:**
```javascript
// Test selector exists
document.querySelector(".embedded-checkout-pricing-option.selected")
document.querySelector("#offer-price")

// Test price extraction
var selected = document.querySelector(".embedded-checkout-pricing-option.selected");
if (selected) {
  var match = selected.innerText.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
  console.log("Price found:", match ? match[1] : "NOT FOUND");
}
```

---

## Part 3: Thank You Page Verification

### 3.1 Verify All Offers Have Custom Thank You Pages

**Critical:** Every offer MUST have a custom thank you page for tracking to fire correctly.

#### A. Founding Member (`MBMS01`)
- [ ] Go to Kajabi → Sales → Offers → `6iRarwak`
- [ ] Settings tab → Thank You Page section
- [ ] Verify custom thank you page is set (NOT default Kajabi page)
- [ ] Note thank you page URL: `_________________`
- [ ] Visit thank you page URL directly
- [ ] Verify page loads correctly
- [ ] Check page source for tracking code

#### B. Public Consult (`PUBCS01`)
- [ ] Verify custom thank you page configured
- [ ] Note URL: `_________________`

#### C. Member Consult (`MEMCS01`)
- [ ] Verify custom thank you page configured
- [ ] Note URL: `_________________`

#### D. Consult Upsell (`UPMBCS01`)
- [ ] Verify custom thank you page configured
- [ ] Should be: `MEMBER-CONSULT-UPSELL-THANK-YOU.html`
- [ ] Note URL: `_________________`

#### E. Newborn Guide (`PUBGD02`)
- [ ] Verify custom thank you page configured
- [ ] Note URL: `_________________`

#### F. 3-4 Month Course (`PUBCR01`)
- [ ] Verify custom thank you page configured
- [ ] Note URL: `_________________`

#### G. 5-12 Month Course (`PUBCR02`)
- [ ] Verify custom thank you page configured
- [ ] Note URL: `_________________`

#### H. Toddler Toolkit (`PUBCR03`)
- [ ] Verify custom thank you page configured
- [ ] Note URL: `_________________`

#### I. Guide to Membership Upsell (`UPGDMS01`)
- [ ] Verify custom thank you page configured
- [ ] Note URL: `_________________`

#### J. Course to Membership Upsell (`UPCRMS01`)
- [ ] Verify custom thank you page configured
- [ ] Note URL: `_________________`

---

### 3.2 Thank You Page Tracking Verification

For each offer, complete a test purchase and verify:

#### Test Purchase Flow:
1. [ ] Navigate to checkout page
2. [ ] Fill in test information:
   - Email: `test+[timestamp]@example.com`
   - Name: `Test User`
   - Phone: `+1234567890`
   - Address: `123 Test St`
3. [ ] Select price option (if multiple)
4. [ ] Complete purchase (use test card if available)
5. [ ] **On Thank You Page:**
   - [ ] Open DevTools → Console
   - [ ] Open DevTools → Network tab
   - [ ] Open DevTools → Application → Local Storage
   - [ ] Check for purchase event firing

**Expected Console Output:**
```
✅ begin_checkout pushed (Kajabi loaded)
Snooze Tracking: Starting Data Scrape...
Snooze Tracking: Price Updated -> [price]
[purchase event dataLayer push]
```

**Expected Local Storage (on Thank You Page):**
```
value: "[price]"
email: "test@example.com"
phone: "+1234567890"
product_name: "[product name]"
```

**Expected Network Requests:**
- [ ] Request to Meta Pixel API (fbq)
- [ ] Request to server-side GTM (`ss.joinsnooze.com`)
- [ ] Request to GA4

---

## Part 4: Meta Pixel & CAPI Verification

### 4.1 Meta Pixel Helper Check

**Tool:** Facebook Pixel Helper Chrome Extension

For each thank you page:
- [ ] Install Facebook Pixel Helper
- [ ] Visit thank you page
- [ ] Click Pixel Helper icon
- [ ] Verify Pixel ID: `449153684613893`
- [ ] Verify `Purchase` event fired
- [ ] Verify event includes:
  - [ ] `value`: Correct price
  - [ ] `currency`: `USD`
  - [ ] `content_name`: Product name

**Expected Pixel Helper Output:**
```
✅ Pixel Loaded
✅ Purchase Event
  - value: 147 (or correct price)
  - currency: USD
  - content_name: [Product Name]
```

### 4.2 Server-Side CAPI Verification

**Location:** Meta Events Manager → Test Events

- [ ] Complete test purchase
- [ ] Go to Events Manager → Test Events
- [ ] Enter test email used in purchase
- [ ] Verify `Purchase` event appears within 5 minutes
- [ ] Verify event data:
  - [ ] Value matches purchase amount
  - [ ] Currency: USD
  - [ ] Event source: Server (CAPI)
  - [ ] User data matches (email, phone if provided)

### 4.3 DataLayer Verification

**On Thank You Page, check console:**

```javascript
// Check dataLayer for purchase event
console.log(window.dataLayer);

// Should see:
{
  event: "purchase",
  ecommerce: {
    transaction_id: "txn_...",
    currency: "USD",
    value: 147,  // or correct price
    items: [{
      item_name: "[Product Name]",
      price: 147,
      quantity: 1
    }]
  },
  user_email: "test@example.com",
  user_phone: "+1234567890",
  ...
}
```

---

## Part 5: Complete End-to-End Test

### 5.1 Full Purchase Flow Test

**Test Offer:** Founding Member (`MBMS01`)

1. [ ] **Landing Page:**
   - [ ] Visit landing page
   - [ ] Click CTA button
   - [ ] Verify `InitiateCheckout` event fires (optional)

2. [ ] **Checkout Page:**
   - [ ] Verify price scraper loads
   - [ ] Select Quarterly ($147)
   - [ ] Verify Local Storage `value` = `147`
   - [ ] Fill in form fields
   - [ ] Verify fields saved to Local Storage

3. [ ] **Purchase:**
   - [ ] Complete purchase
   - [ ] Redirect to thank you page

4. [ ] **Thank You Page:**
   - [ ] Verify page loads
   - [ ] Check console for purchase event
   - [ ] Verify Local Storage data present
   - [ ] Check Pixel Helper: Purchase event fired
   - [ ] Check Network tab: CAPI request sent
   - [ ] Verify Events Manager: Event received

5. [ ] **Repeat for Annual ($490):**
   - [ ] Complete same flow
   - [ ] Verify price = `490` throughout

### 5.2 Multiple Offer Test

Test at least 3 different offers:
- [ ] Founding Member (multiple prices)
- [ ] Single price offer (e.g., Newborn Guide)
- [ ] Upsell offer (e.g., Consult Upsell)

For each:
- [ ] Verify correct price tracked
- [ ] Verify thank you page loads
- [ ] Verify purchase event fires
- [ ] Verify CAPI receives event

---

## Part 6: Common Issues & Troubleshooting

### Issue: Price Shows as 0 or Wrong Value

**Check:**
- [ ] Kajabi checkout HTML structure changed
- [ ] Selectors `.embedded-checkout-pricing-option.selected` or `#offer-price` still valid
- [ ] Price regex pattern matches format
- [ ] Console shows price update messages

**Fix:**
1. Inspect checkout page HTML
2. Update GTM Tag 86 selectors if needed
3. Test in console before updating GTM

### Issue: Purchase Event Not Firing

**Check:**
- [ ] Thank you page is custom (not default Kajabi)
- [ ] GTM container loads on thank you page
- [ ] Local Storage data exists
- [ ] Console shows no JavaScript errors
- [ ] Network tab shows GTM requests

**Fix:**
1. Verify thank you page configuration in Kajabi
2. Check GTM container is published
3. Verify trigger conditions in GTM

### Issue: CAPI Not Receiving Events

**Check:**
- [ ] Server-side GTM container active
- [ ] Stape.io server running
- [ ] Domain `ss.joinsnooze.com` resolves correctly
- [ ] Network tab shows requests to server-side container

**Fix:**
1. Verify Stape.io configuration
2. Check server-side GTM tags are active
3. Test server-side container directly

### Issue: Domain References Still Point to Old Domain

**Check:**
- [ ] Header script in Kajabi
- [ ] GTM container tags
- [ ] Thank you page code
- [ ] Any hardcoded URLs

**Fix:**
1. Search codebase for `joinsnooze.com`
2. Replace with `joinsnooze.com`
3. Update GTM containers
4. Publish changes

---

## Part 7: Test Results Summary

### Domain Migration
- [ ] All domains updated to `joinsnooze.com`
- [ ] No references to `joinsnooze.com` found
- [ ] All scripts load correctly

### Price Tracking
- [ ] Multiple price offers: `___/___` tested successfully
- [ ] Single price offers: `___/___` tested successfully
- [ ] Price scraper working correctly
- [ ] Local Storage captures correct values

### Thank You Pages
- [ ] All offers have custom thank you pages: `___/___`
- [ ] All thank you pages load correctly
- [ ] Tracking fires on all thank you pages

### Meta Pixel & CAPI
- [ ] Pixel Helper shows events firing
- [ ] CAPI receives events in Events Manager
- [ ] Event values match purchase amounts
- [ ] User data matches correctly

### Overall Status
- [ ] ✅ Ready for Meta Ads Launch
- [ ] ⚠️ Issues Found (see notes below)
- [ ] ❌ Not Ready (blockers listed)

### Issues Found
```
[List any issues found during testing]
```

### Notes
```
[Any additional notes or observations]
```

---

## Next Steps After Testing

1. **If All Tests Pass:**
   - [ ] Document test completion date
   - [ ] Update tracking documentation if needed
   - [ ] Proceed with Meta ads launch

2. **If Issues Found:**
   - [ ] Create tickets for each issue
   - [ ] Fix issues in priority order
   - [ ] Re-test after fixes
   - [ ] Document fixes in tracking bible

3. **Before Launch:**
   - [ ] Final verification of critical offers
   - [ ] Monitor first 24 hours of ads
   - [ ] Check Events Manager for real purchases
   - [ ] Verify attribution working correctly

---

**Last Updated:** December 16, 2025  
**Tested By:** _______________  
**Date Tested:** _______________
