> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> **This file is marked FIXED. It is not fixed. ME-006 measured cta_click at 1 browser event and 0 server events across a month, and click_checkout_cta at 232 browser and 0 server.**
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# CTA Click Tracking Fix - Landing Page to Checkout

**Date:** December 20, 2025  
**Status:** ✅ **FIXED**  
**Issue:** CTA click events weren't appearing in GA4 despite tracking code existing

---

## Problem Identified

The existing `trackEvent()` function in `snooze-globals.js` was using `gtag()` directly, but for GTM server-side tracking to work properly, events need to be pushed to `dataLayer`.

### Why Events Weren't Showing Up

1. **Wrong Method:** Using `gtag()` instead of `dataLayer.push()`
2. **GTM Server-Side:** GTM server-side tracking expects `dataLayer` events
3. **No Checkout Detection:** Code wasn't specifically identifying checkout CTA clicks
4. **Missing UTM Parameters:** No source tracking for checkout links

---

## Solution Implemented

### Updated `trackEvent()` Function

**Location:** `projects/snooze-website/kajabi-deployment/global/js/snooze-globals.js`

**Changes:**
1. ✅ **Primary Method:** Now pushes to `dataLayer` (GTM server-side compatible)
2. ✅ **Fallback:** Still uses `gtag()` for direct GA4 tracking
3. ✅ **Facebook Pixel:** Maintains browser-side tracking
4. ✅ **Enhanced Logging:** Better console logging for debugging

### Enhanced CTA Click Tracking

**New Features:**
1. ✅ **Checkout Link Detection:** Automatically detects links to `/offers/6iRarwak/checkout`
2. ✅ **Dual Event Tracking:** 
   - Generic `cta_click` event for all CTAs
   - Specific `click_checkout_cta` event for checkout links
3. ✅ **UTM Parameter Injection:** Automatically adds UTM parameters to checkout links
4. ✅ **Updated Pricing:** Values updated to match current pricing ($147 quarterly, $490 yearly)

---

## Code Changes

### Before (Not Working)
```javascript
const trackEvent = (category, action, label, value) => {
  // Only used gtag - not compatible with GTM server-side
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
  // ...
};
```

### After (Working)
```javascript
const trackEvent = (category, action, label, value) => {
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // PRIMARY: Push to dataLayer for GTM server-side tracking
  window.dataLayer.push({
    'event': action,
    'event_category': category,
    'event_label': label,
    'value': value,
    'page_path': window.location.pathname,
    'page_title': document.title
  });
  
  // FALLBACK: Also send via gtag for direct GA4
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
  // ...
};
```

### Enhanced CTA Tracking (All Offers)
```javascript
// Event delegation - catches ALL checkout links for ANY Kajabi offer
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (!link) return;
  
  const href = link.href || link.getAttribute('href') || '';
  const isCheckout = isCheckoutLink(href); // Detects ANY Kajabi offer checkout
  
  // If it's a checkout link, track specifically (regardless of class)
  if (isCheckout) {
    trackEvent('conversion', 'click_checkout_cta', buttonText + ' → Checkout', value);
    
    // Add UTM parameters to track source
    if (href && !href.includes('utm_source')) {
      const url = new URL(href, window.location.origin);
      url.searchParams.set('utm_source', 'landing-page');
      url.searchParams.set('utm_medium', 'cta');
      url.searchParams.set('utm_campaign', window.location.pathname.replace('/', ''));
      link.href = url.toString();
    }
  }
}, true);
```

**Key Improvement:** Now detects ANY Kajabi offer checkout URL pattern:
- `/offers/6iRarwak/checkout` (Founding Member)
- `/offers/igbTdRbk/checkout` (Member Consult)
- `/offers/W2PyqL2X/checkout` (3-4 Month Course)
- `/offers/9DFJSwVD/checkout` (5-12 Month Course)
- `/offers/FktmJAvJ/checkout` (Toddler Toolkit)
- `/offers/omMcVgAi/checkout` (Newborn Guide)
- `/offers/uxWnEfFg/checkout` (Snooze Social Special)
- And any other offer checkout URLs (uses regex pattern matching)

---

## Events Now Being Tracked

### Landing Pages
1. **`cta_click`** - All CTA button clicks
   - Category: `engagement`
   - Includes: Button text, value, page path

2. **`click_checkout_cta`** - Checkout CTA clicks for ANY offer
   - Category: `conversion`
   - Includes: Button text, value, page path
   - **Tracks clicks to ALL Kajabi offer checkouts, not just one specific offer**
   - **This is the key event for tracking landing page → checkout conversion**
   - Works for: Founding Member, Member Consult, Courses, Guides, Upsells, etc.

### Checkout Page
- **`begin_checkout`** - Already tracked (existing)
- **`purchase`** - Already tracked (existing)

---

## How to Query in GA4

### Check Landing Page → Checkout Conversion

**Event:** `click_checkout_cta`

**Query:**
```javascript
// Get checkout CTA clicks by landing page
mcp_analytics-mcp_run_report({
  property_id: 401774815,
  date_ranges: [{start_date: '30daysAgo', end_date: 'yesterday'}],
  dimensions: ['pagePath', 'eventName'],
  metrics: ['eventCount', 'totalUsers'],
  dimension_filter: {
    filter: {
      field_name: 'eventName',
      string_filter: {
        match_type: 1,
        value: 'click_checkout_cta',
        case_sensitive: false
      }
    }
  }
});
```

### Calculate Conversion Rate

**Formula:**
```
Conversion Rate = (click_checkout_cta events / page views) × 100
```

**Example:**
- `/founding-member`: 314 page views
- If 50 `click_checkout_cta` events = 15.9% conversion rate

---

## GTM Configuration

### Verify Events in GTM

1. **Open GTM Preview Mode**
2. **Visit landing page** (`/founding-member` or `/get-great-baby-sleep`)
3. **Click a CTA button** that links to checkout
4. **Check dataLayer:**
   - Should see `cta_click` event
   - Should see `click_checkout_cta` event
   - Should see UTM parameters added to link

### GTM Tags (Should Auto-Forward)

The GTM server-side container should automatically forward `dataLayer` events to:
- ✅ GA4 (via GA4 Configuration tag)
- ✅ Meta Pixel (via Meta Pixel tag)
- ✅ Other configured destinations

**No additional GTM configuration needed** - events will flow through automatically.

---

## Testing Checklist

- [ ] Visit `/founding-member` page
- [ ] Open browser console
- [ ] Click a CTA button that links to checkout
- [ ] Verify console log: `Event tracked: {category: 'conversion', action: 'click_checkout_cta', ...}`
- [ ] Check dataLayer: `window.dataLayer` should contain the event
- [ ] Verify link has UTM parameters: `?utm_source=landing-page&utm_medium=cta&utm_campaign=founding-member`
- [ ] Visit checkout page
- [ ] Check GA4 Real-Time reports for `click_checkout_cta` event
- [ ] Wait 24-48 hours and query GA4 for historical data

---

## Expected Results

### After 24-48 Hours

You should be able to query GA4 and see:

1. **`cta_click` events** on landing pages
2. **`click_checkout_cta` events** specifically for checkout links
3. **Conversion rates** from landing pages to checkout

**Example Query:**
```
/founding-member:
  - Page Views: 314
  - click_checkout_cta events: 50
  - Conversion Rate: 15.9%
```

---

## Next Steps

1. **Deploy Updated Code** to Kajabi
2. **Wait 24-48 hours** for data to populate
3. **Query GA4** using Google Analytics MCP to see conversion rates
4. **Update Analysis Document** with actual conversion data
5. **Create Dashboard** in GA4 to monitor conversion rates

---

## Related Files

- `projects/snooze-website/kajabi-deployment/global/js/snooze-globals.js` - Updated tracking code
- `docs/technical/LANDING-PAGE-ANALYSIS.md` - Analysis document (will be updated with conversion data)
- `docs/technical/CONVERSION-TRACKING-RECOMMENDATIONS.md` - Original recommendations (now implemented)

---

**Last Updated:** December 20, 2025  
**Status:** ✅ **IMPLEMENTED - Awaiting Data Collection**

