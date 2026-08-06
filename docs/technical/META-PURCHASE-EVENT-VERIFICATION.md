> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> **Purchase is now measured rather than pending verification: EMQ 6.9, email coverage 100%, 34 browser to 33 server, dedup confirmed working.**
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Meta Purchase Event Verification Guide

**Date:** December 16, 2025  
**Purpose:** Verify purchase events with correct price values are being sent to Meta  
**Status:** Ready for Testing

---

## Complete Verification Flow

### Step 1: Test Purchase Flow

1. **Navigate to checkout:**
   - Go to: `https://www.joinsnooze.com/offers/6iRarwak/checkout?coupon_code=KDOSTEST`
   - Use 100% off coupon for testing

2. **Verify price in localStorage:**
   ```javascript
   // In console, check price is captured
   localStorage.getItem('value') // Should be "147" or "490"
   ```

3. **Select pricing option:**
   - Click between Quarterly ($147) and Annual ($490)
   - Verify price updates in localStorage
   - Check console: Should see `"Snooze Tracking: Updated Price to [price]"`

4. **Complete purchase:**
   - Fill out form with test data
   - Complete purchase
   - You'll be redirected to thank you page

---

## Step 2: Verify on Thank You Page

### A. Check Browser Console

**Open DevTools → Console, look for:**

```javascript
// Should see purchase event in dataLayer
window.dataLayer.filter(e => e.event === 'purchase')

// Should return array with purchase event:
// [{
//   event: "purchase",
//   ecommerce: {
//     transaction_id: "txn_...",
//     currency: "USD",
//     value: 147,  // or 490 - should match selected price
//     items: [{
//       item_name: "...",
//       price: 147,
//       quantity: 1
//     }]
//   },
//   user_email: "...",
//   ...
// }]
```

**Quick check command:**
```javascript
// Run this in console on thank you page
var purchase = window.dataLayer.find(e => e.event === 'purchase');
if (purchase) {
  console.log("✅ Purchase event found!");
  console.log("Value:", purchase.ecommerce.value);
  console.log("Currency:", purchase.ecommerce.currency);
  console.log("Transaction ID:", purchase.ecommerce.transaction_id);
} else {
  console.log("❌ No purchase event found");
}
```

### B. Check Network Tab

**Open DevTools → Network tab:**

1. **Filter for:** `facebook` or `tr`
2. **Look for requests to:**
   - `www.facebook.com/tr/?id=449153684613893&ev=Purchase`
   - Should include parameters:
     - `value=147` (or 490)
     - `currency=USD`
     - `content_name=[product name]`

3. **Click on the request** to see details:
   - Headers tab: Verify request URL
   - Payload tab: See all parameters sent
   - Response tab: Should be 200 OK

**Quick check:**
```javascript
// In console, check network requests
// (Note: Can't access network tab via console, but you can see if pixel fired)
console.log("Check Network tab for facebook.com/tr/ requests");
```

### C. Check Facebook Pixel Helper

**Install extension if not already:**
- Chrome Web Store: "Facebook Pixel Helper"
- Install and enable

**On thank you page:**
1. Click Pixel Helper icon in Chrome toolbar
2. **Should show:**
   - ✅ Pixel Loaded (ID: 449153684613893)
   - ✅ Purchase Event
   - Event details:
     - Value: $147 or $490 (matches selected price)
     - Currency: USD
     - Content Name: [Product name]

**If Purchase event not showing:**
- Wait a few seconds (events can be delayed)
- Refresh page
- Check console for errors

---

## Step 3: Verify in Meta Events Manager

### A. Go to Events Manager

1. Go to: https://business.facebook.com/events_manager2
2. Select your pixel: `449153684613893`
3. Click **Test Events** in left sidebar

### B. Enter Test Email

1. Enter the email you used in test purchase
2. Click **Test**
3. **Should see:**
   - Purchase event
   - Event time: Within last few minutes
   - Event source: Browser or Server (CAPI)
   - Event details:
     - Value: $147 or $490
     - Currency: USD

**Note:** Events can take 5-10 minutes to appear, especially server-side (CAPI) events.

### C. Check Event Details

**Click on the Purchase event to see:**
- **Event Parameters:**
  - `value`: Should match selected price (147 or 490)
  - `currency`: USD
  - `content_name`: Product name
- **User Data:**
  - Email: Your test email
  - Phone: (if provided)
  - Other user data
- **Event Source:**
  - Browser (client-side pixel)
  - Server (CAPI - better for accuracy)

---

## Step 4: Verify Price Accuracy

### Test Both Price Options

**Test 1: Quarterly ($147)**
1. Complete purchase with Quarterly selected
2. Verify purchase event value = 147
3. Check Meta Events Manager shows $147

**Test 2: Annual ($490)**
1. Complete purchase with Annual selected
2. Verify purchase event value = 490
3. Check Meta Events Manager shows $490

**Both should work correctly!**

---

## Quick Verification Script

**Run this on thank you page console:**

```javascript
// Complete Purchase Event Verification
console.log("=== META PURCHASE EVENT VERIFICATION ===");

// 1. Check dataLayer
var purchaseEvents = window.dataLayer.filter(e => e.event === 'purchase');
console.log("\n1. Purchase events in dataLayer:", purchaseEvents.length);

if (purchaseEvents.length > 0) {
  var purchase = purchaseEvents[0];
  console.log("   ✅ Purchase event found!");
  console.log("   Value: $" + purchase.ecommerce.value);
  console.log("   Currency: " + purchase.ecommerce.currency);
  console.log("   Transaction ID: " + purchase.ecommerce.transaction_id);
  console.log("   Product: " + purchase.ecommerce.items[0].item_name);
  
  // Verify price matches localStorage
  var storedPrice = localStorage.getItem('value');
  if (storedPrice && Math.abs(parseFloat(storedPrice) - purchase.ecommerce.value) < 0.01) {
    console.log("   ✅ Price matches localStorage: $" + storedPrice);
  } else {
    console.log("   ⚠️ Price mismatch! LocalStorage: $" + storedPrice + ", Event: $" + purchase.ecommerce.value);
  }
} else {
  console.log("   ❌ No purchase event found in dataLayer");
}

// 2. Check if Pixel is loaded
console.log("\n2. Facebook Pixel:");
if (typeof window.fbq !== 'undefined') {
  console.log("   ✅ Pixel loaded (fbq function exists)");
} else {
  console.log("   ❌ Pixel not loaded");
}

// 3. Check localStorage
console.log("\n3. LocalStorage:");
var value = localStorage.getItem('value');
var email = localStorage.getItem('email');
console.log("   Value: $" + (value || "NOT SET"));
console.log("   Email: " + (email || "NOT SET"));

// 4. Summary
console.log("\n=== SUMMARY ===");
if (purchaseEvents.length > 0 && typeof window.fbq !== 'undefined') {
  console.log("✅ Purchase event ready to send to Meta");
  console.log("   Check Facebook Pixel Helper extension");
  console.log("   Check Meta Events Manager (may take 5-10 min)");
} else {
  console.log("❌ Issues found - see details above");
}
```

---

## Common Issues & Fixes

### Issue: Purchase Event Not in dataLayer

**Check:**
- Thank you page is custom (not default Kajabi)
- GTM container loads on thank you page
- No JavaScript errors in console

**Fix:**
- Verify thank you page configuration in Kajabi
- Check GTM container is published
- Verify trigger conditions

### Issue: Wrong Price Value

**Check:**
- localStorage has correct price before purchase
- Price scraper updated price when option clicked
- Purchase event reads from correct source

**Fix:**
- Verify price in localStorage before completing purchase
- Check purchase event code reads from localStorage correctly
- Test both price options

### Issue: Event Not in Meta Events Manager

**Check:**
- Event source (Browser vs Server)
- Time delay (CAPI events can take 5-10 minutes)
- Email matches exactly

**Fix:**
- Wait 10 minutes for server-side events
- Check Test Events with exact email used
- Verify pixel ID is correct (449153684613893)

### Issue: Pixel Helper Shows Event But Wrong Value

**Check:**
- Purchase event parameters
- Value parameter in request
- Currency parameter

**Fix:**
- Verify dataLayer has correct value
- Check GTM purchase tag configuration
- Verify price scraper saved correct value

---

## Success Criteria

✅ **All checks pass:**
- [ ] Purchase event in dataLayer with correct value
- [ ] Facebook Pixel Helper shows Purchase event
- [ ] Network requests to facebook.com/tr/ with correct value
- [ ] Meta Events Manager shows Purchase event
- [ ] Event value matches selected price (147 or 490)
- [ ] Currency is USD
- [ ] Event appears within 10 minutes

---

## Testing Checklist

**Before Meta Ads Launch:**
- [ ] Test Quarterly purchase ($147) - verify value correct
- [ ] Test Annual purchase ($490) - verify value correct
- [ ] Verify both appear in Meta Events Manager
- [ ] Check event source (should see both Browser and Server)
- [ ] Verify user data matches (email, etc.)
- [ ] Test with real purchase (not just test coupon)

---

## Related Files

- `docs/technical/TRACKING-TEST-CHECKLIST.md` - Full testing procedures
- `docs/technical/TRACKING-TEST-SCRIPT.js` - Automated test script
- `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` - Full tracking docs

---

**Last Updated:** December 16, 2025

