# Currency Toggle Technical Brief - Improvement Plan

**Date:** December 27, 2025  
**Status:** Review & Implementation Plan  
**Document:** `Currency-Toggle-Technical-Brief`

---

## Executive Summary

This plan outlines comprehensive improvements to the Currency Toggle Technical Brief, incorporating cross-project documentation, business requirements, and technical specifications. The improvements will ensure the brief is implementation-ready with all necessary technical details, business logic, and integration requirements.

---

## Phase 1: Business Logic & Pricing Integration

### 1.1 Pricing Data Source ✅ CONFIRMED

**Source of Truth:** `snooze-strategy-ops/docs/strategy/SNOOZE-PRICING-STRATEGY.md`  
**Access Method:** MCP Repository (`mcp_snooze_repository_read_strategy_doc`)

**Action Items:**
- [ ] Add section referencing pricing strategy document
- [ ] Create pricing matrix table (USD → AUD) based on strategy doc
- [ ] Document which products have AUD pricing defined
- [ ] Note that prices are **static and pre-set** (not dynamic conversion)

**Key Pricing Points (from Strategy Doc):**

| Product | Launch USD | Launch AUD | BAU USD | BAU AUD |
|---------|------------|------------|---------|---------|
| Mini Modules | $27 | AUD 39 | $37 | AUD 55 |
| Age-Based Courses | $117 | AUD 175 | $129 | AUD 195 |
| The Snooze Method | $117 | AUD 175 | $129 | AUD 195 |
| Membership Quarterly | $147 | **AUD 220** | $197 | AUD 295 |
| Membership Yearly | $490 | **AUD 695** | $657 | AUD 955 |
| 1:1 Consult (Member) | $445 | AUD 640 | $445 | AUD 640 |
| 1:1 Consult Upsell | $445 | **AUD 640** | $445 | AUD 640 |

**Note:** AUD values are manually set (not direct currency conversion) for ecommerce-friendly pricing patterns.

---

### 1.2 Offer URL Mapping ✅ CONFIRMED

**Document Reference:** `projects/snooze-launch-december-2025/docs/KAJABI-OFFER-URLS.md`  
**Additional Reference:** `projects/snooze-website/docs/technical/URL-REFERENCE.md`

**AUD Offers Created:**
1. **Snooze Membership - Launch (AUD):**
   - URL: `https://www.joinsnooze.com/offers/bFxLg2uz`
   - Offer ID: `bFxLg2uz`
   - Purpose: AUD version of founding member offer

2. **Consult - New Member Upsell (AUD):**
   - URL: `https://www.joinsnooze.com/offers/SiiVEJuS`
   - Offer ID: `SiiVEJuS`
   - Purpose: AUD version of consult upsell offer

**Action Items:**
- [ ] Add section documenting AUD offer IDs
- [ ] Create mapping table: USD Offer ID → AUD Offer ID
- [ ] Document which offers have AUD versions vs which default to USD
- [ ] Update GTM tracking code examples with actual offer IDs

**Offer Mapping Table (to be completed):**

| Product/Service | USD Offer ID | AUD Offer ID | Status |
|----------------|--------------|--------------|--------|
| Snooze Membership - Launch | `6iRarwak` | `bFxLg2uz` | ✅ Created |
| Consult Upsell (Member) | `[TBD]` | `SiiVEJuS` | ✅ Created |
| Consult Standalone (Member) | `igbTdRbk` | `[TBD]` | ❓ To be created |
| Consult Standalone (Non-Member) | `[TBD]` | `N/A` | USD only |

---

### 1.3 Discount Code Behavior ✅ CONFIRMED

**Rule:** All discount codes apply to USD only (except OP20 which is percentage-based)

**Action Items:**
- [ ] Document discount code behavior in brief
- [ ] Add logic requirement: If AUD is selected, discount codes should be disabled/hidden
- [ ] Exception: OP20 (percentage-based) can apply to AUD prices
- [ ] Document how OP20 percentage applies to AUD pricing

**Implementation Notes:**
- Checkout pages should hide discount code field when AUD is selected
- Or: Show message "Discount codes apply to USD pricing only"
- OP20 exception: Calculate percentage off AUD price (e.g., 20% off AUD 220 = AUD 176)

---

## Phase 2: Page Coverage & Implementation Strategy

### 2.1 Pages Requiring Currency Toggle ✅ CONFIRMED

**Rule:** All pages that display pricing need currency toggle

**Document References:**
- Landing pages: `projects/snooze-website/kajabi-deployment/pages/`
- Checkout pages: `projects/snooze-launch-december-2025/checkout-pages/`
- Product pages: `projects/snooze-website/kajabi-deployment/pages/product-pages/`
- URL reference: `projects/snooze-website/docs/technical/URL-REFERENCE.md`

**Action Items:**
- [ ] Create list of all pages with pricing (landing pages, product pages)
- [ ] Document implementation approach: **Single page with dynamic price change** (not two separate pages)
- [ ] Specify that checkout pages get **link to alternate currency** (not toggle)
- [ ] Document which pages are exempt (non-pricing pages)

**Implementation Preference (from user):**
- **Landing/Website Pages:** Handle price change in code (data attributes)
- **Checkout Pages:** Small link to alternate currency checkout (not toggle)

---

### 2.2 Checkout Page Behavior ✅ CONFIRMED

**Rule:** Checkout pages don't have toggles, but have link to alternate currency

**Action Items:**
- [ ] Document checkout page currency link design
- [ ] Specify link placement (header, footer, or near pricing)
- [ ] Define link text/format: "Switch to [USD/AUD] pricing" or similar
- [ ] Document URL pattern: Switch from `bFxLg2uz` (AUD) → `6iRarwak` (USD) and vice versa

**Checkout Page Link Example:**
```html
<a href="https://joinsnooze.com/offers/[alternate-offer-id]/checkout" class="currency-switch-link">
  View [USD/AUD] pricing
</a>
```

---

## Phase 3: Technical Implementation Details

### 3.1 Code Structure & Patterns

**Reference Documents:**
- Existing tracking patterns: `docs/technical/GTM-TAG-86-COMPLETE-CODE.js`
- LocalStorage patterns: `docs/technical/FINAL-PRICE-TRACKING-FIX.md`
- DOM manipulation: `docs/technical/PRICE-TRACKING-CLICK-FIX.js`
- Global JS patterns: `projects/snooze-website/kajabi-deployment/global/js/snooze-globals.js`

**Action Items:**
- [ ] Add function signatures and code structure outline
- [ ] Define localStorage key: `snooze_currency_preference` (to avoid conflicts)
- [ ] Document error handling approach (try-catch, fallbacks)
- [ ] Specify edge cases (missing data attributes, localStorage unavailable, etc.)
- [ ] Add code examples using existing patterns from codebase

**localStorage Key Convention:**
- Use namespace prefix: `snooze_currency_preference` (not just `currency_preference`)
- Avoids conflicts with existing tracking (`value`, `email`, `phone`, etc. from GTM Tag 86)
- Check existing localStorage keys in tracking code before finalizing

---

### 3.2 Performance & FOUC Prevention

**Reference Documents:**
- Performance strategy: `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` (Section 2: Hybrid Performance Strategy)
- FOUC prevention: Similar to price tracking delay strategies

**Action Items:**
- [ ] Specify script execution timing (DOMContentLoaded, defer, async)
- [ ] Add FOUC prevention technique (hidden class, CSS, inline script)
- [ ] Document performance budget (KB size, execution time)
- [ ] Consider intersection observer for lazy-loaded pricing sections

**FOUC Prevention Strategy:**
```html
<!-- Inline CSS in <head> to hide prices until script runs -->
<style>
  .dynamic-price:not(.currency-loaded) { visibility: hidden; }
  .dynamic-price.currency-loaded { visibility: visible; }
</style>

<!-- Inline script in <head> to run immediately -->
<script>
  // Check localStorage and apply class BEFORE page renders
  (function() {
    var currency = localStorage.getItem('snooze_currency_preference') || 'USD';
    if (currency === 'AUD') {
      document.documentElement.classList.add('currency-aud-selected');
    }
    document.documentElement.classList.add('currency-loaded');
  })();
</script>
```

---

### 3.3 Data Attribute Schema

**Action Items:**
- [ ] Define complete data attribute schema with validation rules
- [ ] Add examples for all product types (membership, courses, consults)
- [ ] Specify fallback behavior (missing attributes, invalid format)
- [ ] Document currency symbol handling ($ vs A$ vs AUD text)

**Data Attribute Schema:**

**Price Text:**
```html
<span class="dynamic-price" 
      data-usd="$147" 
      data-aud="AUD 220"
      data-usd-text="$147/quarter" 
      data-aud-text="AUD 220/quarter">
  $147
</span>
```

**Checkout Buttons:**
```html
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" 
   class="dynamic-cta" 
   data-link-usd="https://joinsnooze.com/offers/6iRarwak/checkout" 
   data-link-aud="https://joinsnooze.com/offers/bFxLg2uz/checkout">
  Join Now
</a>
```

**Validation Rules:**
- `data-usd` and `data-aud` are required
- Format: Can include currency symbol ($, A$, AUD) or just number
- Missing attribute: Hide element or show error message
- Invalid format: Log warning, default to USD

---

## Phase 4: GTM Tracking Integration ⚠️ CRITICAL

### 4.1 Current State Analysis

**Document Reference:** `Currency-Toggle-Technical-Brief` (lines 71-222)  
**Existing Tracking:** `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md`  
**GTM Tag 86:** `docs/technical/GTM-TAG-86-COMPLETE-CODE.js`

**Current Issues:**
- GTM tracking code examples use placeholder offer IDs (`12345`, `67890`)
- Need to integrate with existing GTM Tag 86 (price scraper)
- Currency detection logic needs to match actual offer structure
- Purchase event tracking needs real offer ID mapping

**Action Items:**
- [ ] Update GTM variable code with actual AUD offer IDs: `bFxLg2uz`, `SiiVEJuS`
- [ ] Document integration with existing GTM Tag 86 price scraper
- [ ] Update purchase event tracking code with real offer IDs
- [ ] Add currency detection logic that checks URL offer ID first
- [ ] Document how currency preference affects price tracking

---

### 4.2 Currency Detection Logic

**Priority Order (Updated):**
1. **Check URL Offer ID** (Checkout/Purchase pages) - Most reliable
   - If URL contains `/offers/bFxLg2uz` → AUD
   - If URL contains `/offers/SiiVEJuS` → AUD
   - If URL contains `/offers/6iRarwak` → USD
   - Check against known AUD offer IDs list

2. **Check localStorage** (Sales/Landing pages) - For toggle state
   - `localStorage.getItem('snooze_currency_preference')`
   - Returns 'AUD' or 'USD'

3. **Default Fallback** - USD

**Updated GTM Variable Code:**
```javascript
function() {
  // 1. Check if we are on a specific Kajabi AUD Offer Page (Checkout/Purchase)
  var audOfferIds = ['bFxLg2uz', 'SiiVEJuS']; // Actual AUD offer IDs
  var currentPath = window.location.pathname;
  
  for (var i = 0; i < audOfferIds.length; i++) {
    if (currentPath.indexOf(audOfferIds[i]) > -1) {
      return 'AUD';
    }
  }

  // 2. If not on a checkout page, check Local Storage (Sales Page Toggle)
  var storedCurrency = localStorage.getItem('snooze_currency_preference');
  if (storedCurrency === 'AUD' || storedCurrency === 'USD') {
    return storedCurrency;
  }

  // 3. Default Fallback
  return 'USD';
}
```

---

### 4.3 Purchase Event Tracking

**Document Reference:** `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` (Section 3)

**Current Purchase Event Code Issues:**
- Uses placeholder offer IDs: `var audOffers = [12345, 67890];`
- Needs integration with Kajabi.order object structure
- Must match actual offer ID format (alphanumeric strings, not numbers)

**Action Items:**
- [ ] Update purchase event code with actual AUD offer IDs
- [ ] Test Kajabi.order.offer_id format (string vs number)
- [ ] Document integration point (Kajabi Checkout Settings → Page Tracking Code)
- [ ] Add error handling for missing Kajabi.order object

**Updated Purchase Event Code:**
```javascript
<script>
  // Detect if this is a Purchase (Kajabi specific object)
  if (typeof Kajabi !== 'undefined' && Kajabi.order) {
    
    // Determine currency based on the Offer ID
    // Actual AUD offer IDs
    var audOffers = ['bFxLg2uz', 'SiiVEJuS'];
    var offerId = String(Kajabi.order.offer_id || ''); // Ensure string comparison
    var orderCurrency = audOffers.indexOf(offerId) > -1 ? 'AUD' : 'USD';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'purchase',
      'ecommerce': {
        'currency': orderCurrency,
        'value': Kajabi.order.amount,
        'transaction_id': Kajabi.order.id,
        'items': [{
          'item_name': Kajabi.order.offer_title,
          'item_id': Kajabi.order.offer_id,
          'price': Kajabi.order.amount,
          'quantity': 1
        }]
      }
    });
  }
</script>
```

---

### 4.4 Price Tracking Integration

**Document Reference:** `docs/technical/FINAL-PRICE-TRACKING-FIX.md`

**Current System:**
- GTM Tag 86 scrapes final price from checkout DOM
- Saves to localStorage as `value` (numeric price)
- Purchase event reads from localStorage

**Integration Requirements:**
- Currency toggle should NOT interfere with price scraping
- Price value should remain numeric (e.g., `220` not `AUD 220`)
- Currency code should be stored separately (via GTM variable)
- Both currency and value sent in purchase event

**Action Items:**
- [ ] Document that price tracking (localStorage `value`) remains currency-agnostic
- [ ] Ensure currency toggle doesn't modify price scraping behavior
- [ ] Add note: Currency detection happens at event tracking level, not price scraping level
- [ ] Test that GTM Tag 86 still works correctly when AUD prices are displayed

---

## Phase 5: UI/UX Specifications

### 5.1 Toggle Design & Placement

**Reference Documents:**
- Branding: `docs/branding/BRANDING-ASSETS-REFERENCE.md`
- Design system: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`

**Action Items:**
- [ ] Provide actual HTML/CSS for toggle UI (matching brand design)
- [ ] Add ARIA labels and keyboard navigation
- [ ] Mobile-responsive design (touch targets, spacing)
- [ ] Visual state indicators (active state, loading state)
- [ ] Match brand colors and typography

**Toggle Locations:**
1. **Global Header/Footer:** Discreet toggle (e.g., `[ 🇦🇺 AUD | 🌎 USD ]`)
2. **Pricing Section:** Prominent switch above pricing cards
3. **Checkout Pages:** Link to alternate currency (not toggle)

---

### 5.2 User Experience Flow

**Action Items:**
- [ ] Add smooth transition/animation for price changes
- [ ] Visual feedback when toggle is clicked
- [ ] Document expected behavior (instant vs delayed update)
- [ ] Consider currency indicator in multiple places (header + pricing section)

**Transition Strategy:**
- Use CSS transitions for smooth price number changes
- Add loading state (spinner or skeleton) if update takes time
- Ensure no layout shift (CLS) when prices change

---

## Phase 6: Testing & QA

### 6.1 Test Scenarios

**Action Items:**
- [ ] Create comprehensive test checklist
- [ ] Document edge cases (missing data attributes, localStorage blocked, etc.)
- [ ] Cross-browser testing matrix
- [ ] Performance testing (Lighthouse scores before/after)
- [ ] Accessibility testing (keyboard navigation, screen readers)

**Test Checklist:**
- [ ] Toggle switches currency on landing pages
- [ ] Prices update correctly (USD → AUD and vice versa)
- [ ] Checkout button URLs update correctly
- [ ] Preference persists across page navigation
- [ ] Preference persists across browser sessions
- [ ] Checkout pages show link to alternate currency
- [ ] Clicking alternate currency link redirects correctly
- [ ] GTM tracking sends correct currency code
- [ ] Purchase events include correct currency
- [ ] Price scraping (GTM Tag 86) still works
- [ ] No FOUC on page load
- [ ] No layout shift when prices change
- [ ] Works on mobile devices
- [ ] Works when localStorage is blocked (fallback to USD)

---

### 6.2 Success Metrics

**Action Items:**
- [ ] Define quantifiable success criteria
- [ ] Add analytics tracking plan (GA4 events for currency toggle clicks)
- [ ] Document how to measure impact on Australian market CRO

**Success Metrics:**
- Toggle usage rate (clicks per session)
- Currency preference distribution (AUD vs USD)
- Conversion rate by currency (AUD vs USD)
- Australian market conversion improvement
- No performance degradation (PageSpeed scores maintained)

---

## Phase 7: Documentation & Maintenance

### 7.1 Implementation Guide

**Action Items:**
- [ ] Step-by-step implementation guide with code examples
- [ ] Content team guide: How to add data attributes to new pricing blocks
- [ ] Troubleshooting guide (common issues, debugging steps)
- [ ] Maintenance guide (how to update prices, add new offers)

**Content Team Guide Should Include:**
- When to add currency toggle (pages with pricing)
- How to add data attributes to price elements
- How to add data attributes to checkout buttons
- Where to find AUD prices (pricing strategy document)
- How to get AUD offer IDs (from Kajabi or offer URLs document)

---

### 7.2 Code Documentation

**Action Items:**
- [ ] Provide working code with comments
- [ ] Document all functions and parameters
- [ ] Add code examples for common scenarios
- [ ] Include code structure/organization

**Code Structure Should Include:**
- Main initialization function
- Currency switching function
- DOM update functions
- localStorage management
- Error handling
- Performance optimizations

---

## Phase 8: Risk Assessment & Mitigation

### 8.1 Potential Risks

**Action Items:**
- [ ] List potential risks (localStorage conflicts, offer URL errors, etc.)
- [ ] Document mitigation strategies for each risk
- [ ] Create rollback plan (how to disable quickly if issues arise)
- [ ] Define monitoring strategy (what to watch after deployment)

**Key Risks:**
1. **localStorage Key Conflicts:** Mitigation: Use namespaced key (`snooze_currency_preference`)
2. **Offer URL Errors:** Mitigation: Validate URLs, test all redirects
3. **GTM Tracking Broken:** Mitigation: Test currency detection, verify purchase events
4. **Performance Impact:** Mitigation: Minimize script size, defer execution
5. **Price Display Errors:** Mitigation: Validation, fallback to USD, error logging

**Rollback Plan:**
- Remove global script from Kajabi Header
- Remove toggle HTML/CSS from pages
- Revert checkout button URLs to USD only
- Clear localStorage entries if needed

---

## Phase 9: Cross-Project Documentation Updates

### 9.1 Documents Requiring Updates

**Action Items:**
- [ ] Update `SNOOZE-PRICING-STRATEGY.md` (already has AUD prices - verify completeness)
- [ ] Update `KAJABI-OFFER-URLS.md` (add AUD offer IDs section)
- [ ] Update `URL-REFERENCE.md` (add AUD offer URLs)
- [ ] Update `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` (add currency tracking section)
- [ ] Create/update currency toggle implementation docs

**Document Update Checklist:**
- [ ] `projects/snooze-launch-december-2025/docs/KAJABI-OFFER-URLS.md` - Add AUD offers section
- [ ] `projects/snooze-website/docs/technical/URL-REFERENCE.md` - Add AUD offer URLs
- [ ] `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` - Add currency tracking section
- [ ] `docs/branding/BRANDING-ASSETS-REFERENCE.md` - Add currency toggle design specs (if needed)

---

## Implementation Priority Order

1. **Phase 1:** Business Logic & Pricing Integration (Foundation)
2. **Phase 4:** GTM Tracking Integration (Critical for accurate ROAS)
3. **Phase 2:** Page Coverage & Implementation Strategy (Scope definition)
4. **Phase 3:** Technical Implementation Details (Code structure)
5. **Phase 5:** UI/UX Specifications (Design)
6. **Phase 6:** Testing & QA (Quality assurance)
7. **Phase 7:** Documentation & Maintenance (Long-term support)
8. **Phase 8:** Risk Assessment (Safety)
9. **Phase 9:** Cross-Project Documentation (Complete picture)

---

## Key Questions Answered ✅

1. ✅ **Pricing:** Static and pre-set - all in `SNOOZE-PRICING-STRATEGY.md` (strategy-ops project)
2. ✅ **AUD Offers:** Only 2 created so far:
   - Snooze Membership - Launch (AUD): `bFxLg2uz`
   - Consult - New Member Upsell (AUD): `SiiVEJuS`
3. ✅ **Discount Codes:** All apply to USD only (except OP20 which is percentage-based)
4. ✅ **Page Implementation:** Handle price change in code (not two separate pages)
5. ✅ **Checkout Pages:** Link to alternate currency (not toggle)
6. ✅ **GTM Integration:** Need to sort out (Phase 4)
7. ✅ **localStorage Key:** Use `snooze_currency_preference` (namespaced to avoid conflicts)

---

## Next Steps

1. Review this improvement plan
2. Prioritize phases based on business needs
3. Begin implementation starting with Phase 1 (Business Logic)
4. Update `Currency-Toggle-Technical-Brief` with improvements as each phase is completed
5. Test implementation incrementally
6. Update cross-project documentation as implementation progresses

---

**Last Updated:** December 27, 2025  
**Status:** Ready for Review
