# Snooze Reusable Components

**Location:** `projects/snooze-website/kajabi-deployment/components/`  
**Purpose:** Reusable HTML components for consistent experience across all Snooze pages

---

## Components Overview

### 1. Context-Aware CTA Component
**File:** `context-aware-cta.html`

**Purpose:** Shows appropriate CTA based on user status (new visitor, logged-in non-member, Snooze member)

**Features:**
- Browser-side user detection (optional)
- Signposting fallback (shows all options with clear labels)
- Premium design
- Mobile-responsive

**Usage:**
```html
<!-- Include in any page -->
<div id="snooze-context-cta"></div>
<script src="/path/to/context-aware-cta.html"></script>
```

**Dependencies:**
- `js/snooze-globals-site-header.js` (for checkout URL and detection logic)

---

### 2. "What's in Snooze" Section
**File:** `whats-in-snooze.html`

**Purpose:** Shows membership value vs individual products

**Content:**
- This resource is included
- All age guides
- Complete Library
- The Village
- Live Sessions
- Member Pricing

**Usage:**
```html
<!-- Include as a section on age-specific or product pages -->
<!-- Copy entire file content into Kajabi HTML code block -->
```

**Styling:**
- Self-contained CSS
- Premium card layout
- Mobile-responsive grid

---

### 3. Value Comparison Component
**File:** `value-comparison.html`

**Purpose:** Compares individual product cost vs Snooze membership value

**Features:**
- Side-by-side comparison
- Individual product pricing
- Membership pricing
- Clear savings demonstration
- "Best Value" badge on membership

**Usage:**
```html
<!-- Include on product/course landing pages -->
<!-- Copy entire file content into Kajabi HTML code block -->
```

**Customization:**
- Update `data-product-price` attribute for different product prices
- Pricing from: `docs/strategy/SNOOZE-PRICING-STRATEGY.md`

---

### 4. Age Page Cross-Linking Component
**File:** `age-cross-linking.html`

**Purpose:** Shows links to other age-specific pages, demonstrating comprehensiveness

**Features:**
- All 4 age guides displayed
- Links to each age-specific page
- Automatically hides current page's card
- Membership CTA at bottom

**Usage:**
```html
<!-- Include at bottom of age-specific pages -->
<!-- Copy entire file content into Kajabi HTML code block -->
```

**URLs:**
- Newborn: `/newborn-baby-sleep-help`
- 3-4 Month: `/3-4-month-baby-sleep-help`
- 5-12 Month: `/5-12-month-baby-sleep-help`
- Toddler: `/toddler-sleep-help`

---

## Global JavaScript

### snooze-globals-site-header.js
**File:** `js/snooze-globals-site-header.js` ⭐

**Purpose:** Centralized configuration, browser-side user detection, and tracking

**Global Variables:**
- `window.SNOOZE_CHECKOUT_URL` - Primary checkout URL
- `window.SNOOZE_LIBRARY_URL` - Library URL
- `window.SNOOZE_VILLAGE_URL` - Village/Community URL
- `window.SNOOZE_METHOD_URL` - The Snooze Method page URL
- `window.SNOOZE_LOGIN_URL` - Login page URL

**User Detection:**
- `window.SnoozeUserDetection.detectUserStatus()` - Attempts browser-side detection
- Returns: `'new-visitor'` | `'logged-in-non-member'` | `'snooze-member'` | `'unknown'`
- Falls back to signposting if detection fails

**Detection Methods:**
1. Kajabi session cookies
2. DOM indicators (logged-in elements)
3. URL patterns (protected pages)
4. localStorage user data

**Usage:**
- **Deploy to:** Kajabi Settings → Website → Custom JavaScript (one-time, site-wide)
- **File:** `js/snooze-globals-site-header.js`
- **See:** `../DEPLOYMENT-GUIDE.md` for complete deployment instructions

---

## Browser-Side Detection Strategy

Since we don't have access to Kajabi API, we use:

1. **Primary Approach: Signposting**
   - Show all options with clear labels
   - Users choose the appropriate action
   - Premium, clear messaging

2. **Optional Detection:**
   - Browser-side checks (cookies, DOM, URL)
   - Falls back to signposting if uncertain
   - Non-blocking (doesn't break if detection fails)

3. **User Experience:**
   - Always clear what each option is for
   - No confusion about next steps
   - Premium experience regardless of detection

---

## Deployment Instructions

### For Each Component:

1. **Copy HTML Content:**
   - Open component file
   - Copy entire content (HTML + CSS + JavaScript)

2. **Paste in Kajabi:**
   - Go to Kajabi page editor
   - Add "Custom HTML Code Block"
   - Paste component content

3. **Global JavaScript:**
   - Add `snooze-globals-site-header.js` to Kajabi Settings → Website → Custom JavaScript
   - See `../DEPLOYMENT-GUIDE.md` for complete instructions

### Recommended Order:

1. Add `snooze-globals-site-header.js` to site header (once) - See `../DEPLOYMENT-GUIDE.md`
2. Add components to pages as needed
3. Test user detection (optional - signposting works without it)

---

## Customization

### Updating Checkout URL:
Edit `js/snooze-globals-site-header.js`:
```javascript
window.SNOOZE_CHECKOUT_URL = 'https://joinsnooze.com/offers/6iRarwak/checkout';
```

### Updating Pricing:
Edit `value-comparison.html`:
- Update `data-product-price` attribute
- Update membership pricing display
- Reference: `docs/strategy/SNOOZE-PRICING-STRATEGY.md`

### Updating URLs:
Edit component files directly:
- Age page URLs in `age-cross-linking.html`
- Library/Village URLs in `context-aware-cta.html`

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive
- Graceful degradation if JavaScript fails
- Signposting works without JavaScript

---

## Testing Checklist

- [ ] Components render correctly on desktop
- [ ] Components render correctly on mobile
- [ ] CTAs link to correct URLs
- [ ] Signposting shows when detection fails
- [ ] User detection works (if implemented)
- [ ] All links are functional
- [ ] Pricing is accurate
- [ ] Design is consistent with site

---

**Last Updated:** January 2025  
**Status:** Ready for deployment

---

## Maintenance Notes (Service-Model Sweep, June 2026)

Inline code comments were stripped from `value-comparison.html`, `whats-in-snooze.html`, and `understanding-section.html` for clean Kajabi paste. The genuine notes those comments carried are relocated here:

### value-comparison.html

- **Product offer slug (AUD):** the individual-course price node (`[data-product-price]`) is a per-host-page product offer. The AUD offer is pending; the offer slug is set per host page, not in this component. (Was inline as `AUD-OFFER-PENDING`.)
- **Currency-toggle ownership:** the inline price script only overrides the price text when no `.dynamic-price` span is present. The currency-toggle engine owns the `.dynamic-price` node and must not be clobbered. Do not change this guard.

### Service-model copy

Membership "Live Coaching" benefit was reframed to "Live Sessions" across these components. Live sessions with the Snooze Specialists are a real benefit, but are not promised on a fixed weekly cadence and there is no guaranteed replay archive. Do not reintroduce "weekly", "replay vault/library", or "24/7" language into membership copy. Membership live-session copy uses "the Snooze Specialists", not individual names; "Sally and Bec" was corrected to "the Snooze Specialists" in the June 2026 over-naming fix. Bec is named only in Camp Snooze, Nap Trapped, and her paid 1:1 consults.

### Flag (out of scope, do not action here)

- The "Updating Checkout URL" example above still references offer slug `6iRarwak`, which is a retired/draft slug. The canonical Snooze Access checkout slug is `z63s9VaR` (USD), as used in the live component CTAs. Update during a dedicated slug-reconciliation pass.


## Component inventory (relocated from in-file header comments)

- `messenger-chat-widget.html`: Custom pop-up chat widget that links to Messenger. JavaScript for this widget lives in `global/js/snooze-globals.js`.
- `messenger-chat-widget-standalone.css`: Standalone CSS stylesheet for the messenger chat widget, designed for isolated landing pages without global theme CSS. Includes custom properties, trigger button styles, modal, header, body, footer, and responsive media queries. Comments stripped for Kajabi deployment (June 2026).
- `age-cross-linking.html`: Shows links to other age-specific pages; demonstrates the comprehensiveness of Snooze.
- `context-aware-cta.html`: Shows the appropriate CTA based on user status; falls back to signposting if detection fails (populated by JavaScript).
- `hero-sections/hero-template-product.html`: Hero section template for product/course landing pages.
- `hero-sections/hero-template-landing.html`: Hero section template for landing pages.
- `hero-sections/hero-template-age-specific.html`: Hero section template for age-specific pages.
