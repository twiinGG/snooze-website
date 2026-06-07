Here is a comprehensive technical brief for your development team. It is designed specifically for the Kajabi environment (which relies on client-side JavaScript) and emphasizes performance so it doesn’t negatively impact your PageSpeed scores.

***

# Technical Brief: Dynamic Currency Toggle (USD/AUD)

**Project:** Snooze Platform Launch
**Platform:** Kajabi
**Priority:** High (Critical for CRO in Australian market)

## 1. Objective
Implement a client-side currency toggle that allows users to switch between USD (International) and AUD (Australian) pricing across all sales pages.

**Key Requirements:**
*   **Default:** USD
*   **Functionality:** Updates displayed price text AND checkout button URLs.
*   **Persistence:** Remembers the user's preference across sessions using `localStorage` key: `snooze_currency_preference`
*   **Implementation Approach:** Single page with dynamic price changes (not separate pages)
*   **Checkout Pages:** Display link to alternate currency (not toggle)

---

## 1.1 Pricing Data Reference

**Source of Truth:** Pricing strategy document in `snooze-strategy-ops` project  
**Document:** `docs/strategy/SNOOZE-PRICING-STRATEGY.md`  
**Access:** Via MCP Repository server or direct file access

**Important:** All prices are **static and pre-set** (not dynamic currency conversion). AUD values are manually set for ecommerce-friendly pricing patterns.

### Complete Pricing Matrix (USD → AUD)

**Source:** `snooze-strategy-ops/docs/strategy/SNOOZE-PRICING-STRATEGY.md`  
**Last Updated:** December 27, 2025

#### Courses & Modules

| Product/Service | Launch USD | Launch AUD | BAU USD | BAU AUD | Notes |
|----------------|------------|------------|---------|---------|-------|
| **Mini Modules** | $27 | AUD 39 | $37 | AUD 55 | Tier 3 (Entry) |
| **Age-Based Courses** | $117 | AUD 175 | $129 | AUD 195 | Tier 2 (Core) - Newborn, 3-4 Month, 5-12 Month, Toddler |
| **The Snooze Method** | $117 | AUD 175 | $129 | AUD 195 | Tier 1 (Foundation) |

#### Membership

| Membership Type | Launch USD | Launch AUD | Normal USD | Normal AUD | Notes |
|----------------|------------|------------|------------|------------|-------|
| **Month-by-month** | $79 | AUD 119 | $79 | AUD 119 | Standard monthly |
| **Quarterly** | $147 | **AUD 220** | $197 | AUD 295 | 3-month commitment |
| **Yearly** | $490 | **AUD 695** | $657 | AUD 955 | Annual commitment |

#### Consultation Services

| Service | Non-Member USD | Non-Member AUD | Member Launch USD | Member Launch AUD | Member BAU USD | Member BAU AUD | Notes |
|---------|----------------|----------------|-------------------|-------------------|---------------|---------------|-------|
| **Signature 1:1 Consult** | $650 | AUD 945 | $445 | AUD 640 | $445 | AUD 640 | Base member price |
| **1:1 Consult Upsell** | N/A | N/A | $445 | **AUD 640** | $445 | AUD 640 | Post-membership purchase |
| **Two-Week Package** | $3,500 | AUD 5,075 | $3,150 | AUD 4,575 | $3,150 | AUD 4,575 | Member save $350 USD / AUD 500 |
| **Camp Snooze** | N/A | N/A | $290 | AUD 425 | $370 | AUD 535 | Members Only |

**Important Notes:**
*   All prices are **static and pre-set** (not dynamic currency conversion)
*   AUD values are manually set for ecommerce-friendly pricing patterns
*   Launch pricing: Through December 31, 2025
*   BAU pricing: January 1, 2026 and beyond
*   For complete pricing details including Snooze Social pricing, refer to the pricing strategy document

---

## 1.2 Offer URL Mapping

**Document References:**
*   `projects/snooze-launch-december-2025/docs/KAJABI-OFFER-URLS.md`
*   `projects/snooze-website/docs/technical/URL-REFERENCE.md`

### AUD Offers Created

Currently, **2 AUD offers** have been created in Kajabi:

| Product/Service | USD Offer ID | USD URL | AUD Offer ID | AUD URL | Status |
|----------------|--------------|---------|--------------|---------|--------|
| **Snooze Membership - Launch** | `6iRarwak` | `https://joinsnooze.com/offers/6iRarwak/checkout` | `bFxLg2uz` | `https://joinsnooze.com/offers/bFxLg2uz/checkout` | ✅ Created |
| **Consult Upsell (Member)** | `[TBD]` | `[TBD]` | `SiiVEJuS` | `https://joinsnooze.com/offers/SiiVEJuS/checkout` | ✅ Created |

**Offer Mapping Reference:**
*   **Membership Launch:** USD `6iRarwak` ↔ AUD `bFxLg2uz`
*   **Consult Upsell:** USD `[TBD]` ↔ AUD `SiiVEJuS`
*   **Consult Standalone (Member):** USD `igbTdRbk` ↔ AUD `[TBD - To be created]`
*   **Consult Standalone (Non-Member):** USD only (no AUD version needed)

**Other Offers:**
*   Additional offers may need AUD versions created as needed
*   Consult standalone offers and other products may require separate AUD offers
*   Reference offer URLs document (`KAJABI-OFFER-URLS.md`) for complete list of all offers

### Discount Code Behavior

**Important Rule:** All discount codes apply to **USD pricing only** (except OP20 which is percentage-based).

*   When AUD currency is selected, discount codes should be **disabled or hidden**
*   Exception: OP20 (20% off) can apply to AUD pricing as it's percentage-based
*   Implementation: Calculate OP20 percentage off AUD price (e.g., 20% off AUD 220 = AUD 176)
*   Checkout pages: Show message "Discount codes apply to USD pricing only" or hide discount field when on AUD offer

## 2. Page Coverage & Implementation Strategy

### 2.1 Pages Requiring Currency Toggle

**Rule:** All pages that display pricing need currency toggle functionality.

**Page Types:**
*   **Landing Pages:** All sales/landing pages with pricing (homepage, product pages, course pages)
*   **Website Pages:** Any website page displaying product/service prices
*   **Product Pages:** Individual course and module pages

**Implementation Approach:**
*   **Landing/Website Pages:** Handle price change in code using data attributes (single page, not separate pages)
*   **Checkout Pages:** Display **small link to alternate currency** (not toggle) - redirects to alternate offer URL
*   **Non-Pricing Pages:** No currency toggle needed (About, Contact, etc.)

**Document References:**
*   Landing pages: `projects/snooze-website/kajabi-deployment/pages/`
*   Checkout pages: `projects/snooze-launch-december-2025/checkout-pages/`
*   URL reference: `projects/snooze-website/docs/technical/URL-REFERENCE.md`

### 2.2 Checkout Page Behavior

**Checkout pages do NOT have currency toggles.** Instead, they display a link to switch to the alternate currency.

**Link Behavior:**
*   **Placement:** Header, footer, or near pricing section
*   **Text:** "Switch to [USD/AUD] pricing" or "View [USD/AUD] pricing"
*   **Functionality:** Redirects to alternate offer checkout URL

**Example Link:**
```html
<!-- On AUD checkout page (bFxLg2uz) -->
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" class="currency-switch-link">
  Switch to USD pricing
</a>

<!-- On USD checkout page (6iRarwak) -->
<a href="https://joinsnooze.com/offers/bFxLg2uz/checkout" class="currency-switch-link">
  Switch to AUD pricing
</a>
```

**URL Pattern:**
*   USD → AUD: Redirect to AUD offer ID (`bFxLg2uz` for membership, `SiiVEJuS` for consult upsell)
*   AUD → USD: Redirect to USD offer ID (`6iRarwak` for membership, etc.)

---

## 3. Technical Implementation

### A. The Mechanism
Since we cannot use server-side logic on Kajabi, this must be a Vanilla JavaScript solution injected via the `Settings > Site Details > Header Page Scripts` (or Footer) so it applies globally.

**Requirements:**
*   **No jQuery:** Use pure Vanilla JS to minimize load time impact.
*   **Local Storage Key:** Use `snooze_currency_preference` (namespaced to avoid conflicts with existing tracking keys like `value`, `email`, etc.)
*   **Performance:** Script must be deferred or non-blocking.
*   **FOUC Prevention:** Must prevent Flash of Unstyled Content when currency preference loads

### B. UI Elements (The Toggle)

**Location:**
1.  **Global Header/Footer:** A discreet toggle (e.g., `[ 🇦🇺 AUD | 🌎 USD ]`).
2.  **Pricing Section:** A prominent switch above the pricing cards on the Sales Page.

**Behavior:**
*   Clicking the toggle instantly updates the DOM and saves the preference to Local Storage
*   Smooth transitions/animations for price number changes
*   Visual feedback when toggle is clicked (active state indication)
*   No layout shift (CLS) when prices update

**Design Requirements:**
*   Match brand design system (colors, typography from `docs/branding/BRANDING-ASSETS-REFERENCE.md`)
*   Mobile-responsive (touch targets, spacing)
*   Accessibility: ARIA labels, keyboard navigation
*   Visual state indicators (active state, hover state)

**Reference Documents:**
*   Branding: `docs/branding/BRANDING-ASSETS-REFERENCE.md`
*   Design system: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`

### C. Data Structure (How to tag elements)
The dev team needs to standardize how we tag pricing elements in the Kajabi page builder so the script knows what to update.

**Recommended Approach: Data Attributes**
Instead of creating duplicate sections (which bloats code and hurts speed), use data attributes on the text and buttons.

#### Price Text Elements

**Basic Format:**
```html
<span class="dynamic-price" 
      data-usd="$147" 
      data-aud="AUD 220">
  $147
</span>
```

**With Descriptive Text:**
```html
<span class="dynamic-price" 
      data-usd="$147/quarter" 
      data-aud="AUD 220/quarter">
  $147/quarter
</span>
```

**Format Options:**
*   Currency symbol can be included: `$147`, `AUD 220`, `A$220`, or just numbers
*   Descriptive text can be included: `/quarter`, `/month`, `per month`, etc.
*   Default content (between tags) should be USD version

#### Checkout Button Elements

**Format:**
```html
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" 
   class="dynamic-cta" 
   data-link-usd="https://joinsnooze.com/offers/6iRarwak/checkout" 
   data-link-aud="https://joinsnooze.com/offers/bFxLg2uz/checkout">
  Join Now
</a>
```

**Actual Offer IDs to Use:**
*   **Membership Launch:** 
    *   USD: `https://joinsnooze.com/offers/6iRarwak/checkout`
    *   AUD: `https://joinsnooze.com/offers/bFxLg2uz/checkout`
*   **Consult Upsell (Member):**
    *   USD: `[TBD - get from offer URLs doc]` (Offer ID pending)
    *   AUD: `https://joinsnooze.com/offers/SiiVEJuS/checkout`
*   **Consult Standalone (Member):**
    *   USD: `https://joinsnooze.com/offers/igbTdRbk/checkout`
    *   AUD: `[TBD - To be created]`

**Validation Rules:**
*   `data-usd` and `data-aud` are **required** attributes
*   Missing attribute: Hide element or show error message in console
*   Invalid format: Log warning, default to USD display
*   URL validation: Ensure URLs are valid before updating `href`

### D. Logic Flow

**Page Load Sequence:**
1.  **Check `localStorage`** for key `snooze_currency_preference`
2.  **If 'AUD' found:** Immediately run `switchCurrency('AUD')` to update text/links **before page renders** (prevent FOUC)
3.  **If null/USD:** Do nothing (display default HTML - USD is default)
4.  **On Toggle Click:** Run `switchCurrency(selection)`, update DOM, and set `localStorage.setItem('snooze_currency_preference', selection)`

**FOUC Prevention Strategy:**
```html
<!-- Inline CSS in <head> to hide prices until script runs -->
<style>
  .dynamic-price:not(.currency-loaded) { 
    visibility: hidden; 
  }
  .dynamic-price.currency-loaded { 
    visibility: visible; 
  }
</style>

<!-- Inline script in <head> to run immediately (before DOM ready) -->
<script>
  (function() {
    var currency = localStorage.getItem('snooze_currency_preference') || 'USD';
    if (currency === 'AUD') {
      document.documentElement.classList.add('currency-aud-selected');
    }
    document.documentElement.classList.add('currency-loaded');
  })();
</script>
```

**Error Handling:**
*   If `localStorage` is unavailable (Safari private browsing, etc.): Fallback to USD, continue silently
*   If data attributes are missing: Log warning to console, skip element
*   If URLs are invalid: Log error, keep current URL, don't break navigation

### E. Code Structure Pattern

**Reference Existing Patterns:**
*   LocalStorage patterns: `docs/technical/FINAL-PRICE-TRACKING-FIX.md`
*   DOM manipulation: `docs/technical/PRICE-TRACKING-CLICK-FIX.js`
*   Performance patterns: `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md`

**Suggested Function Structure:**
```javascript
(function() {
  'use strict';
  
  // Configuration
  var STORAGE_KEY = 'snooze_currency_preference';
  var DEFAULT_CURRENCY = 'USD';
  
  // Main functions
  function getCurrencyPreference() { /* ... */ }
  function switchCurrency(currency) { /* ... */ }
  function updatePriceElements(currency) { /* ... */ }
  function updateCTALinks(currency) { /* ... */ }
  function initCurrencyToggle() { /* ... */ }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCurrencyToggle);
  } else {
    initCurrencyToggle();
  }
})();
```

## 4. Deliverables

1.  **JavaScript Snippet:** The code file to be placed in the Global Head/Footer.
    *   Main currency toggle functionality
    *   FOUC prevention inline script
    *   Error handling and fallbacks

2.  **HTML/CSS Template:** The code for the Toggle Switch UI.
    *   Toggle HTML structure
    *   CSS styling (matching brand design system)
    *   Mobile-responsive styles
    *   Accessibility attributes

3.  **Content Team Instruction Guide:** Quick guide for adding `data-aud="..."` attributes to new pricing blocks.
    *   When to add currency toggle (pages with pricing)
    *   How to add data attributes to price elements
    *   How to add data attributes to checkout buttons
    *   Where to find AUD prices (pricing strategy document reference)
    *   How to get AUD offer IDs (from Kajabi or offer URLs document)

4.  **Checkout Page Currency Link Template:** HTML/CSS for alternate currency link on checkout pages.

## 5. QA & Success Criteria

### 5.1 Functional Requirements

**Persistence:**
*   User selects AUD on Home Page, clicks to "About", returns to Home—prices remain in AUD
*   Preference persists across browser sessions (localStorage persistence)
*   Preference persists across different pages on the site

**Checkout Accuracy:**
*   Clicking the "Join" button while in AUD mode redirects strictly to the AUD Kajabi Offer checkout page
*   URL updates correctly: USD offer ID → AUD offer ID
*   Checkout pages display link to alternate currency correctly

**Price Display:**
*   All prices update correctly (USD → AUD and vice versa)
*   Prices match pricing matrix from strategy document
*   Currency symbols display correctly ($ vs AUD vs A$)

### 5.2 Performance Requirements

**Speed:**
*   No "Flash of Unstyled Content" (FOUC) when currency preference loads
*   No significant layout shift (CLS) when prices update
*   PageSpeed scores maintained (90+ mobile score)
*   Script execution time minimal (deferred/non-blocking)

### 5.3 Testing Checklist

**Functional Tests:**
- [ ] Toggle switches currency on landing pages
- [ ] Prices update correctly (USD → AUD and vice versa)
- [ ] Checkout button URLs update correctly
- [ ] Preference persists across page navigation
- [ ] Preference persists across browser sessions
- [ ] Checkout pages show link to alternate currency
- [ ] Clicking alternate currency link redirects correctly
- [ ] Works on mobile devices
- [ ] Works when localStorage is blocked (fallback to USD)

**Integration Tests:**
- [ ] GTM tracking sends correct currency code
- [ ] Purchase events include correct currency
- [ ] Price scraping (GTM Tag 86) still works correctly
- [ ] No conflicts with existing tracking systems

**Performance Tests:**
- [ ] No FOUC on page load
- [ ] No layout shift when prices change
- [ ] PageSpeed scores maintained
- [ ] Script size within budget

**Accessibility Tests:**
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] ARIA labels present and correct

### 5.4 Success Metrics

**Quantifiable Success Criteria:**
*   **Toggle Usage Rate:** Track currency toggle clicks per session (GA4 event)
*   **Currency Preference Distribution:** Monitor AUD vs USD preference ratio
*   **Conversion Rate by Currency:** Compare conversion rates for AUD vs USD users
*   **Australian Market Impact:** Measure improvement in Australian market conversion rate
*   **Performance Maintenance:** PageSpeed scores maintained (90+ mobile score)
*   **No Tracking Errors:** 100% of purchase events include correct currency code

**Analytics Tracking Plan:**
*   Track currency toggle clicks as GA4 event: `currency_toggle_click`
*   Track currency preference in user properties
*   Segment conversion funnels by currency preference
*   Monitor ROAS accuracy in Meta Ads and Google Ads platforms

---

# Part 2: Documentation Updates

Update all relevant documents across the project and sub projects that need to be updated to reflect this new dynamic pricing system.


Currency in custom tracking:

Handling multi-currency tracking in GTM is critical. If you mess this up, your ROAS (Return on Ad Spend) data will be garbage because platforms like Meta and Google will treat $197 AUD as $197 USD, artificially inflating your revenue reports by ~35%.

Since we are using a **frontend toggle** (JavaScript) strategy, your GTM setup cannot rely on default page scraping. It must "listen" to the toggle state.

Here is the technical brief for handling currency in GTM.

---

### The Golden Rule
**Always send the ISO Currency Code.**
You must strictly send `'AUD'` or `'USD'` along with the `value` in every single event (ViewContent, AddToCart, Purchase). GA4 and Meta will handle the FX conversion on their end as long as you tell them which currency the value is in.

---

### 1. The Strategy: Two States of Tracking

Because Kajabi separates the **Sales Page** (where you put the toggle) from the **Checkout Page** (the actual Kajabi Offer), we have to track them differently.

#### A. The Sales Page (Dynamic Toggle)
Here, the URL doesn't change, but the user *intent* changes.
*   **Trigger:** User clicks "Join Snooze" (The CTA Button).
*   **Logic:** GTM needs to look at the `localStorage` setting we created in Part 1 to decide which currency to send to GA4/Meta.

#### B. The Checkout/Purchase Page (Static Offer)
Here, the user has committed. They are on a specific Kajabi Offer URL.
*   **Trigger:** Page View (Checkout) or Purchase.
*   **Logic:** The tracking relies on the **Kajabi Offer ID**. We know that *Offer X* is always USD and *Offer Y* is always AUD.

---

### 2. Implementation Brief for GTM

Give this to your implementation specialist.

#### Step 1: Create a "Currency State" Variable in GTM
We need a custom variable that checks what mode the user is in.

*   **Variable Type:** Custom JavaScript
*   **Name:** `CJS - User Currency Preference`
*   **Code:**
    ```javascript
    function() {
      // 1. Check if we are on a specific Kajabi AUD Offer Page (Checkout/Purchase)
      // ACTUAL AUD Offer IDs (update as more are created)
      var audOfferIds = ['bFxLg2uz', 'SiiVEJuS'];
      var currentPath = window.location.pathname;
      
      for (var i = 0; i < audOfferIds.length; i++) {
        if (currentPath.indexOf(audOfferIds[i]) > -1) {
          return 'AUD';
        }
      }

      // 2. If not on a checkout page, check Local Storage (Sales Page Toggle)
      // Use namespaced key to avoid conflicts with existing tracking
      var storedCurrency = localStorage.getItem('snooze_currency_preference');
      if (storedCurrency === 'AUD' || storedCurrency === 'USD') {
        return storedCurrency;
      }

      // 3. Default Fallback
      return 'USD';
    }
    ```

#### Step 2: Create a "Dynamic Value" Variable
When a user clicks a "Join" button on the sales page, we need to grab the correct price based on the currency they currently see.

*   **Variable Type:** Custom JavaScript
*   **Name:** `CJS - Dynamic Click Value`
*   **Code:**
    ```javascript
    function() {
      var currency = {{CJS - User Currency Preference}}; // The variable from Step 1
      var element = {{Click Element}}; // Built-in GTM variable
      
      // If the user is in AUD mode, grab the data-aud attribute
      if (currency === 'AUD') {
        return element.getAttribute('data-aud') || '0.00';
      }
      
      // Otherwise default to USD attribute
      return element.getAttribute('data-usd') || '0.00';
    }
    ```

#### Step 3: Configure Tags (GA4 & Meta)

You must update your event tags to use these dynamic variables.

**For GA4 Event (e.g., `begin_checkout` on button click):**
*   **Parameter:** `currency` -> **Value:** `{{CJS - User Currency Preference}}`
*   **Parameter:** `value` -> **Value:** `{{CJS - Dynamic Click Value}}`

**For Meta Pixel (Custom HTML or Template):**
```html
<script>
  fbq('track', 'InitiateCheckout', {
    value: {{CJS - Dynamic Click Value}},
    currency: '{{CJS - User Currency Preference}}', // This is critical!
    content_name: 'Snooze Membership'
  });
</script>
```

---

### 3. Handling the "Purchase" Event (The Hardest Part)

Kajabi's "Thank You" page is tricky because it doesn't natively push a Data Layer.

**The Fix:**
Inside **Kajabi > Settings > Checkout Settings > Page Tracking Code**, you need to paste a script that pushes the *actual* transaction data. Because you have separate Offers for AUD and USD, you can hard-code the currency *inside the offer settings* if you want, but a global script is cleaner.

**Paste this into the Checkout Tracking Code area:**

```javascript
<script>
  // Detect if this is a Purchase (Kajabi specific object)
  if (typeof Kajabi !== 'undefined' && Kajabi.order) {
    
    // Determine currency based on the Offer ID
    // ACTUAL AUD Offer IDs (update as more are created)
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

**Integration Notes:**
*   **Placement:** Paste into **Kajabi > Settings > Checkout Settings > Page Tracking Code**
*   **Update Frequency:** Add new AUD offer IDs to `audOffers` array as they are created
*   **Testing:** Verify purchase events in GTM Preview mode with both USD and AUD offers
*   **Related Documentation:** See `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` for existing tracking architecture

### 4. Integration with Existing Price Tracking

**Document Reference:** `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md`  
**GTM Tag 86:** Price scraper that saves to localStorage

**Important:** The currency toggle should **NOT interfere** with existing price scraping (GTM Tag 86).

**Integration Points:**
*   Price tracking (`localStorage` key `value`) remains **currency-agnostic** (numeric value only, e.g., `220` not `AUD 220`)
*   Currency detection happens at **event tracking level** (via GTM variable), not price scraping level
*   Both currency code and value are sent in purchase events
*   GTM Tag 86 continues to scrape final price from checkout DOM (works regardless of currency displayed)

**Price Value vs Currency:**
*   Price value: Numeric (e.g., `220` for AUD 220)
*   Currency code: String (e.g., `'AUD'` or `'USD'`)
*   Purchase event: Includes both `value: 220` and `currency: 'AUD'`

### Summary for your Dev Team:
1.  **Sales Page:** Use `localStorage.getItem('snooze_currency_preference')` + `data-attributes` to tell GTM which currency to send on button clicks.
2.  **Checkout Page:** Use URL Offer ID logic to force the currency state (check pathname for AUD offer IDs).
3.  **Purchase Page:** Inject a Data Layer push in Kajabi settings that checks the Offer ID to determine if it should report `AUD` or `USD`.
4.  **Price Tracking:** Existing GTM Tag 86 price scraper continues to work (currency-agnostic, numeric values only).

This ensures that a user who toggles to AUD on the home page is tracked as an AUD prospect all the way through to the AUD purchase event, with accurate ROAS data in Meta and Google Ads.

---

## 6. Risk Assessment & Mitigation

### Key Risks

1. **localStorage Key Conflicts**
   *   **Risk:** Conflict with existing tracking keys (`value`, `email`, `phone`, etc.)
   *   **Mitigation:** Use namespaced key `snooze_currency_preference`
   *   **Status:** ✅ Mitigated

2. **Offer URL Errors**
   *   **Risk:** Invalid or incorrect offer URLs cause broken redirects
   *   **Mitigation:** Validate URLs, test all redirects, use actual offer IDs from documentation
   *   **Testing:** Verify all checkout button URLs before deployment

3. **GTM Tracking Broken**
   *   **Risk:** Currency detection fails, incorrect currency sent to analytics
   *   **Mitigation:** Test currency detection in GTM Preview mode, verify purchase events
   *   **Monitoring:** Check GTM events after deployment for correct currency codes

4. **Performance Impact**
   *   **Risk:** Script size or execution time affects PageSpeed scores
   *   **Mitigation:** Minimize script size, defer execution, use inline script for FOUC prevention only
   *   **Testing:** Run Lighthouse before/after deployment

5. **Price Display Errors**
   *   **Risk:** Missing data attributes cause prices not to update
   *   **Mitigation:** Validation logic, fallback to USD, error logging to console
   *   **Testing:** Test with missing/invalid data attributes

### Rollback Plan

If critical issues arise after deployment:

1. **Remove Global Script:** Remove currency toggle script from Kajabi Header/Footer
2. **Remove Toggle UI:** Remove toggle HTML/CSS from pages (or hide via CSS)
3. **Revert URLs:** Change checkout button URLs back to USD-only offers
4. **Clear localStorage:** Clear `snooze_currency_preference` entries if needed (users will see USD by default)

**Time to Rollback:** < 5 minutes (remove script and toggle HTML)

---

## 7. UI/UX Specifications

### 7.1 Toggle Design & Placement

**Toggle Locations:**
1. **Global Header/Footer:** Discreet toggle (e.g., `[ 🇦🇺 AUD | 🌎 USD ]`)
2. **Pricing Section:** Prominent switch above pricing cards on sales pages
3. **Checkout Pages:** Link to alternate currency (not toggle)

**Design Requirements:**
*   Match brand design system (colors, typography from `docs/branding/BRANDING-ASSETS-REFERENCE.md`)
*   Mobile-responsive (touch targets minimum 44x44px, adequate spacing)
*   Accessibility: ARIA labels, keyboard navigation support
*   Visual state indicators (active state, hover state, focus state)
*   Smooth transitions for state changes

**Toggle HTML Structure:**
```html
<div class="currency-toggle" role="group" aria-label="Select currency">
  <button type="button" 
          class="currency-option currency-usd" 
          data-currency="USD"
          aria-pressed="true"
          aria-label="US Dollar">
    <span class="currency-flag">🌎</span>
    <span class="currency-code">USD</span>
  </button>
  <button type="button" 
          class="currency-option currency-aud" 
          data-currency="AUD"
          aria-pressed="false"
          aria-label="Australian Dollar">
    <span class="currency-flag">🇦🇺</span>
    <span class="currency-code">AUD</span>
  </button>
</div>
```

**Toggle CSS (Basic Structure):**
```css
.currency-toggle {
  display: inline-flex;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.currency-option {
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
}

.currency-option[aria-pressed="true"] {
  background: #007bff;
  color: #fff;
}

.currency-option:hover:not([aria-pressed="true"]) {
  background: #f5f5f5;
}

.currency-option:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
```

### 7.2 User Experience Flow

**Price Update Behavior:**
*   **Instant Update:** Prices update immediately when toggle is clicked
*   **Smooth Transition:** Use CSS transitions for price number changes (0.3s ease)
*   **Visual Feedback:** Show active state on selected currency option
*   **No Layout Shift:** Reserve space for price text to prevent CLS

**Transition Strategy:**
```css
.dynamic-price {
  transition: opacity 0.3s ease;
}

.dynamic-price.updating {
  opacity: 0.5;
}
```

**Loading State (if needed):**
*   Show subtle loading indicator if update takes time
*   Use skeleton loader for price text during update
*   Ensure no visible flash or jump

### 7.3 Checkout Page Currency Link

**Link Design:**
*   Small, unobtrusive link near pricing section
*   Text: "Switch to [USD/AUD] pricing" or "View [USD/AUD] pricing"
*   Styled as secondary link (not prominent button)

**Link HTML:**
```html
<a href="https://joinsnooze.com/offers/[alternate-offer-id]/checkout" 
   class="currency-switch-link"
   aria-label="Switch to USD pricing">
  Switch to USD pricing
</a>
```

**Link CSS:**
```css
.currency-switch-link {
  font-size: 14px;
  color: #666;
  text-decoration: underline;
  margin-top: 8px;
  display: inline-block;
}

.currency-switch-link:hover {
  color: #007bff;
}
```

---

## 8. Implementation Guide

### 8.1 Step-by-Step Implementation

**Phase 1: Setup**
1. Add FOUC prevention inline script to Kajabi Header (Section 3.D)
2. Add main currency toggle script to Kajabi Footer (deferred)
3. Add toggle HTML/CSS to global header or specific pages

**Phase 2: Content Updates**
1. Add `data-usd` and `data-aud` attributes to all price elements
2. Add `data-link-usd` and `data-link-aud` attributes to all checkout buttons
3. Test price updates on key pages (homepage, product pages)

**Phase 3: GTM Integration**
1. Create GTM variable: `CJS - User Currency Preference`
2. Create GTM variable: `CJS - Dynamic Click Value`
3. Update GA4 event tags to use currency variables
4. Update Meta Pixel events to use currency variables
5. Add purchase event tracking code to Kajabi Checkout Settings

**Phase 4: Testing**
1. Test currency toggle on all pricing pages
2. Test checkout button URL updates
3. Test GTM tracking (Preview mode)
4. Test purchase events with both currencies
5. Performance testing (Lighthouse)

**Phase 5: Documentation**
1. Update offer URLs document with AUD offers
2. Update URL reference document
3. Update tracking bible with currency tracking section
4. Create content team guide for adding data attributes

### 8.2 Content Team Guide

**When to Add Currency Toggle:**
*   All pages that display pricing (landing pages, product pages, course pages)
*   Pages with checkout buttons or pricing tables
*   **Do NOT add** to non-pricing pages (About, Contact, Blog posts)

**How to Add Data Attributes to Price Elements:**
1. Find the price text element in Kajabi page builder
2. Add class: `dynamic-price`
3. Add attribute: `data-usd="[USD price]"` (e.g., `data-usd="$147"`)
4. Add attribute: `data-aud="[AUD price]"` (e.g., `data-aud="AUD 220"`)
5. Default content (between tags) should be USD version

**How to Add Data Attributes to Checkout Buttons:**
1. Find the checkout button/link in Kajabi page builder
2. Add class: `dynamic-cta`
3. Add attribute: `data-link-usd="[USD offer URL]"`
4. Add attribute: `data-link-aud="[AUD offer URL]"`
5. Default `href` should be USD offer URL

**Where to Find AUD Prices:**
*   Source: `snooze-strategy-ops/docs/strategy/SNOOZE-PRICING-STRATEGY.md`
*   Access via MCP Repository or direct file access
*   All AUD prices are pre-set (not calculated)

**How to Get AUD Offer IDs:**
*   Check `projects/snooze-launch-december-2025/docs/KAJABI-OFFER-URLS.md`
*   Check `projects/snooze-website/docs/technical/URL-REFERENCE.md`
*   Or get from Kajabi dashboard (Offers section)

**Example:**
```html
<!-- Price Element -->
<span class="dynamic-price" 
      data-usd="$147" 
      data-aud="AUD 220">
  $147
</span>

<!-- Checkout Button -->
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" 
   class="dynamic-cta" 
   data-link-usd="https://joinsnooze.com/offers/6iRarwak/checkout" 
   data-link-aud="https://joinsnooze.com/offers/bFxLg2uz/checkout">
  Join Now
</a>
```

### 8.3 Troubleshooting Guide

**Common Issues:**

1. **Prices Not Updating:**
   *   Check that elements have `dynamic-price` class
   *   Verify `data-usd` and `data-aud` attributes are present
   *   Check browser console for JavaScript errors
   *   Verify localStorage is available (not blocked)

2. **Checkout URLs Not Updating:**
   *   Check that buttons have `dynamic-cta` class
   *   Verify `data-link-usd` and `data-link-aud` attributes are present
   *   Check that URLs are valid (no typos)
   *   Verify script is loaded (check Network tab)

3. **GTM Tracking Not Working:**
   *   Test GTM variable in Preview mode
   *   Verify localStorage key is `snooze_currency_preference`
   *   Check that offer IDs in GTM code match actual offer IDs
   *   Verify purchase event code is in Kajabi Checkout Settings

4. **FOUC (Flash of Unstyled Content):**
   *   Verify inline FOUC prevention script is in `<head>`
   *   Check that script runs before DOM renders
   *   Verify CSS classes are applied correctly

5. **Performance Issues:**
   *   Check script size (should be < 10KB minified)
   *   Verify script is deferred or async
   *   Check for JavaScript errors in console
   *   Run Lighthouse performance audit

**Debugging Steps:**
1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab to verify scripts load
4. Check Application tab → Local Storage to verify preference is saved
5. Use GTM Preview mode to test tracking variables
6. Test with both currencies (USD and AUD)

---

## 9. Documentation Updates Required

The following documents need to be updated to reflect the currency toggle implementation:

### Project Documents

1. **`projects/snooze-launch-december-2025/docs/KAJABI-OFFER-URLS.md`**
   *   Add AUD offers section documenting `bFxLg2uz` and `SiiVEJuS`
   *   Document mapping between USD and AUD offers
   *   Add note about currency toggle implementation

2. **`projects/snooze-website/docs/technical/URL-REFERENCE.md`**
   *   Add AUD offer URLs alongside USD offer URLs
   *   Document currency toggle behavior on checkout pages
   *   Add currency switch link examples

3. **`docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md`**
   *   Add currency tracking section
   *   Document GTM variables for currency detection (`CJS - User Currency Preference`, `CJS - Dynamic Click Value`)
   *   Document purchase event currency handling
   *   Add integration notes with existing price tracking (GTM Tag 86)

4. **`docs/branding/BRANDING-ASSETS-REFERENCE.md`** (if needed)
   *   Add currency toggle design specs if separate from main design system
   *   Document toggle UI components and styling

### Strategy Documents (via MCP)

5. **`snooze-strategy-ops/docs/strategy/SNOOZE-PRICING-STRATEGY.md`**
   *   Already contains AUD pricing - verify completeness
   *   Add note about currency toggle implementation if needed

---

**Last Updated:** December 27, 2025  
**Status:** Ready for Implementation  
**Implementation Priority:** High (Critical for CRO in Australian market)