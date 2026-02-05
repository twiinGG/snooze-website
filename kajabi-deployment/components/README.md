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
- Live Coaching
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

