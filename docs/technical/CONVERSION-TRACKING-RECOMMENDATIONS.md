> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> **Superseded by the ranked change list in the ME-006 folder, which is based on measured data.**
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Conversion Tracking Recommendations

## Current Situation

### What We Can See
- ✅ Landing page views and engagement metrics
- ✅ Checkout page views and `begin_checkout` events
- ✅ Traffic sources for each page

### What We Cannot See
- ❌ How many landing page visitors click through to checkout
- ❌ Conversion rate from landing pages to checkout
- ❌ Which landing page converts better
- ❌ User journey from landing → checkout

## Why `begin_checkout` Doesn't Appear on Landing Pages

The `begin_checkout` event is a **GA4 e-commerce event** that fires specifically when:
- A user reaches the checkout page (`/offers/6iRarwak/checkout`)
- The checkout page loads and initializes the e-commerce tracking

It does NOT fire on landing pages because:
1. Users haven't reached checkout yet
2. The event is tied to the checkout page's implementation
3. Landing pages have different events (page_view, user_engagement, etc.)

## Recommended Solutions

### Option 1: Custom Click Event Tracking (Recommended)

Add custom event tracking to CTA buttons on landing pages that link to checkout:

```javascript
// On landing page CTA buttons
document.querySelectorAll('.checkout-cta-button').forEach(button => {
  button.addEventListener('click', function() {
    // Track click event
    gtag('event', 'click_checkout_cta', {
      'event_category': 'engagement',
      'event_label': 'Landing Page CTA',
      'page_path': window.location.pathname,
      'page_title': document.title
    });
  });
});
```

**Benefits:**
- Track exactly how many users click to checkout
- Measure conversion rate from landing pages
- Compare performance between landing pages

### Option 2: Enhanced E-commerce Tracking

Implement enhanced e-commerce tracking on checkout page to capture:
- Items added to cart
- Checkout steps completed
- Purchase completions

```javascript
// On checkout page
gtag('event', 'begin_checkout', {
  'currency': 'USD',
  'value': 147.00,
  'items': [{
    'item_id': 'snooze-quarterly',
    'item_name': 'Snooze Quarterly Membership',
    'price': 147.00,
    'quantity': 1
  }]
});
```

### Option 3: Funnel Analysis Setup

Create a funnel in GA4 to track:
1. Landing page view (`/founding-member` or `/get-great-baby-sleep`)
2. Checkout page view (`/offers/6iRarwak/checkout`)
3. Begin checkout event
4. Purchase event (if tracked)

**GA4 Funnel Configuration:**
- Step 1: Page path contains `/founding-member` OR `/get-great-baby-sleep`
- Step 2: Page path equals `/offers/6iRarwak/checkout`
- Step 3: Event name equals `begin_checkout`
- Step 4: Event name equals `purchase` (if implemented)

### Option 4: UTM Parameter Tracking

Add UTM parameters to checkout links from landing pages:

```
https://www.joinsnooze.com/offers/6iRarwak/checkout?utm_source=landing-page&utm_medium=cta&utm_campaign=founding-member
```

**Benefits:**
- Track which landing page sent users to checkout
- Measure conversion by source
- Analyze user journey

## Implementation Priority

### Immediate (High Impact)
1. **Add custom click tracking** to CTA buttons on both landing pages
2. **Set up UTM parameters** for checkout links
3. **Create GA4 funnel** to visualize conversion flow

### Short-term (Medium Impact)
4. **Enhanced e-commerce tracking** on checkout page
5. **Purchase event tracking** (if not already implemented)
6. **Custom dimensions** for landing page source

### Long-term (Optimization)
7. **A/B test tracking** for different CTAs
8. **Multi-touch attribution** analysis
9. **Cohort analysis** for returning visitors

## Expected Metrics After Implementation

Once implemented, you'll be able to track:

- **Landing Page → Checkout Conversion Rate**
  - `/founding-member`: X% of visitors reach checkout
  - `/get-great-baby-sleep`: X% of visitors reach checkout

- **CTA Click-Through Rate**
  - How many users click the checkout CTA
  - Which CTA performs better

- **Complete Funnel Conversion**
  - Landing page view → Checkout → Purchase
  - Drop-off at each stage

- **Source Performance**
  - Which traffic sources convert best
  - ROI by channel

## Code Examples

### Landing Page CTA Tracking

```javascript
// Add to landing page JavaScript
(function() {
  // Track all checkout CTA clicks
  document.querySelectorAll('a[href*="/offers/6iRarwak/checkout"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const pagePath = window.location.pathname;
      const pageTitle = document.title;
      
      // Send event to GA4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click_checkout_cta', {
          'event_category': 'engagement',
          'event_label': 'Checkout CTA Click',
          'page_path': pagePath,
          'page_title': pageTitle,
          'link_url': this.href
        });
      }
      
      // Add UTM parameters if not already present
      if (!this.href.includes('utm_source')) {
        const url = new URL(this.href);
        url.searchParams.set('utm_source', 'landing-page');
        url.searchParams.set('utm_medium', 'cta');
        url.searchParams.set('utm_campaign', pagePath.replace('/', ''));
        this.href = url.toString();
      }
    });
  });
})();
```

### Checkout Page Enhanced Tracking

```javascript
// Add to checkout page
(function() {
  // Track when checkout page loads
  if (typeof gtag !== 'undefined') {
    gtag('event', 'view_checkout', {
      'event_category': 'ecommerce',
      'event_label': 'Checkout Page View',
      'page_path': window.location.pathname
    });
    
    // If UTM parameters present, track source
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('utm_source')) {
      gtag('event', 'checkout_source', {
        'event_category': 'attribution',
        'event_label': urlParams.get('utm_source'),
        'utm_source': urlParams.get('utm_source'),
        'utm_medium': urlParams.get('utm_medium'),
        'utm_campaign': urlParams.get('utm_campaign')
      });
    }
  }
})();
```

## Next Steps

1. **Review current tracking implementation** on landing pages
2. **Add custom click event tracking** to CTA buttons
3. **Set up UTM parameters** for checkout links
4. **Create GA4 funnel** for conversion analysis
5. **Test and verify** tracking is working
6. **Create dashboard** to monitor conversion metrics

---

**Last Updated:** December 20, 2025

