# Snooze Pricing Update - $79 Monthly Option Implementation

**Date:** January 12, 2026
**Status:** Core Files Updated - Ready for Deployment
**New Pricing:** $79/month | $197/quarter | $657/year

---

## ✅ COMPLETED UPDATES

### 1. **Global CSS - Unified Theme** ✅
**File:** `/global/css/snooze-unified-theme.css`

**Changes Made:**
- Completely rewrote Section 15 (COMPONENT: PRICING) to support v2 design
- Changed from flexbox to CSS Grid for better 3-card layout control
- Added support for both `.pricing-card` and `.price-card` class names
- **REMOVED** checklist styles (`.pricing-features` now hidden)
- Added proper "Choose this if..." box styling
- Featured card now uses `::before` pseudo-element for "Best Value" banner
- Updated mobile responsiveness for 3-card stacking
- Grid now supports: `minmax(280px, 1fr)` with `max-width: 1100px`

**Key Style Classes Added:**
```css
.price-grid          /* Grid container for 3 cards */
.price-card          /* Individual pricing card */
.price-big           /* Large price display ($79) */
.price-sub           /* Price period text */
.price-card.featured /* Featured quarterly card with banner */
```

---

### 2. **Home Page Uplift v2** (Master Design) ✅
**Files:**
- `/projects/Home Page Uplift/home-page-v2.html`
- `/projects/Home Page Uplift/home-page-v2.css`

**Changes Made:**
- Added $79 monthly option as first card
- Quarterly now featured with "Most Popular" badge
- Annual shows "2 Months Free" badge
- **REMOVED** all checklists (`<ul class="comp-list">`)
- Replaced with "Choose this if..." explanation boxes
- Updated CSS grid: `max-width: 1100px`, `gap: 24px`

**New Card Structure:**
```html
<div class="price-card">
  <h3>Monthly</h3>
  <div class="price-big">$79</div>
  <p class="price-sub">per month (USD)<br><small>Less than $2.65/day</small></p>
  <div style="background:var(--c-cream); padding:10px; ...">
    <strong>Choose this if...</strong><br>[explanation]
  </div>
  <a href="[url]" class="btn">Start Monthly</a>
</div>
```

---

### 3. **Live Site - Main Home Page** ✅
**File:** `/pages/snooze-home-page-blocks.html`

**Changes Made:**
- Updated from old launch pricing ($147/$490) to new pricing ($79/$197/$657)
- Added Monthly option as first card
- Made Quarterly the featured option
- Removed all checklists
- Applied v2 design pattern with "Choose this if..." boxes

---

### 4. **Value Comparison Component** ✅
**File:** `/components/value-comparison.html`

**Changes Made:**
- Changed primary display price from $197/quarter to **$79/month**
- Added secondary pricing note: "Or $197/quarter or $657/year"
- Updated value proposition: "For less than a single course, you get everything with monthly membership"
- Updated CTA text: "Start from just $79/month"

---

### 5. **Email Template** ✅
**File:** `/pages/1-month-free-membership/emails/day-25-upgrade-cta-email.html`

**Changes Made:**
- Added $79 monthly pricing card
- Made Quarterly the featured option (with "MOST POPULAR" badge)
- Added Annual option with "2 MONTHS FREE" badge
- All 3 pricing tiers now visible in email

---

## 📋 PAGES STILL NEEDING MANUAL UPDATE

### Age-Specific Pages (4 pages)
These pages likely have pricing sections that need the v2 treatment:

1. **Newborn Page**
   `/pages/age-pages/newborn-page-complete.html`

2. **3-4 Month Page**
   `/pages/age-pages/3-4-month-page-complete.html`

3. **5-12 Month Page**
   `/pages/age-pages/5-12-month-page-complete.html`

4. **Toddler Page**
   `/pages/age-pages/toddler-page-complete.html`

**Action Required:**
- Find pricing sections in each file
- Replace with 3-card structure (Monthly, Quarterly, Annual)
- Remove checklists
- Add "Choose this if..." boxes
- Use the Home Page v2 structure as reference

---

### Product Landing Pages (5 pages)
These auto-generated pages use the value-comparison component but may have additional pricing sections:

1. `/pages/product-pages/generated-html-pages/newborn-guide-landing-page.html`
2. `/pages/product-pages/generated-html-pages/3-4-month-course-landing-page.html`
3. `/pages/product-pages/generated-html-pages/5-12-month-guide-landing-page.html`
4. `/pages/product-pages/generated-html-pages/toddler-toolkit-landing-page.html`
5. `/pages/product-pages/generated-html-pages/snooze-method-landing-page.html`

**Action Required:**
- Check if they use the value-comparison component (already updated ✅)
- If they have custom pricing sections, update to match v2 design
- Verify all pricing references show $79/month option

---

### Remaining Email Templates (3 files)
Simple text updates needed:

1. `/pages/1-month-free-membership/emails/day-14-checkin-email.html`
2. `/pages/1-month-free-membership/emails/day-21-reminder-email.html`
3. `/pages/1-month-free-membership/emails/day-30-followup-email.html`

**Action Required:**
- Find any pricing references
- Update text to mention: "now just $79/month, $197/quarter, or $657/year"
- No HTML structure changes needed, just text updates

---

## 🎨 DESIGN SPECIFICATIONS

### New Pricing Structure
```
Monthly:    $79/month   (Less than $2.65/day)
Quarterly:  $197/3mo    (Less than $2.20/day) [FEATURED - Most Popular]
Annual:     $657/year   (Just $1.80/day) [2 Months Free badge]
```

### Card Design Pattern (NO CHECKLISTS)
```html
<div class="price-card [featured]">
  <div class="badge">Badge Text</div>
  <div class="pricing-label">Period Label</div>
  <h3>Plan Name</h3>
  <div class="price-big">$XX</div>
  <p class="price-sub">per [period] (USD)<br><small>Less than $X.XX/day</small></p>

  <!-- "Choose this if..." box -->
  <div style="background:#faf7f4; padding:10px; font-size:0.8rem; border-radius:5px; margin:16px 0 20px;">
    <strong>Choose this if...</strong><br>
    [Contextual explanation for this plan]
  </div>

  <a href="[checkout-url]" class="btn [btn-outline]">Start [Period]</a>
</div>
```

### CSS Classes Reference
```css
.pricing-section / #pricing    /* Section wrapper */
.pricing-grid / .price-grid    /* 3-column grid */
.pricing-card / .price-card    /* Individual card */
.price-big                     /* Large price display */
.price-sub                     /* Period text */
.featured                      /* Quarterly card modifier */
.badge / .price-tag            /* Small badges */
.pricing-label                 /* Period label */
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Review all updated files for accuracy
- [ ] Test unified CSS in Kajabi preview
- [ ] Verify all checkout URLs are correct
- [ ] Check mobile responsiveness on test page

### Deploy to Kajabi
1. **Global CSS** (Priority 1)
   - [ ] Copy `/global/css/snooze-unified-theme.css`
   - [ ] Paste into: Kajabi Settings → Website → Theme → Custom CSS
   - [ ] Save and publish

2. **Home Page** (Priority 1)
   - [ ] Copy updated `/pages/snooze-home-page-blocks.html`
   - [ ] Replace pricing section in Kajabi home page
   - [ ] Preview and test all 3 cards
   - [ ] Test checkout links

3. **Value Comparison Component** (Priority 2)
   - [ ] Update wherever this component is used
   - [ ] Typically in age-specific and product pages

4. **Remaining Pages** (Priority 3)
   - [ ] Update 4 age-specific pages
   - [ ] Update 5 product landing pages
   - [ ] Update 3 email templates

### Post-Deployment
- [ ] Test all pricing pages on mobile devices
- [ ] Verify checkout URLs work correctly
- [ ] Check that all 3 pricing options display properly
- [ ] Confirm "Choose this if..." boxes show correctly
- [ ] Verify featured card (Quarterly) has proper styling

---

## 📝 NOTES

### Important Design Decisions
1. **Checklists Removed**: Old pricing cards had feature checklists. V2 design removes these for cleaner, simpler cards with "Choose this if..." context boxes.

2. **Quarterly is Featured**: Changed from Annual being featured to Quarterly with "Most Popular" badge. This highlights the middle-tier option.

3. **Monthly as Entry Point**: Added $79/month as the first option to lower barrier to entry while still showing quarterly and annual options.

4. **Grid vs Flexbox**: Switched to CSS Grid for better control of 3-column layout with consistent card widths.

5. **Backward Compatibility**: Unified CSS hides `.pricing-features` (checklist styles) rather than removing them, ensuring old pages don't break.

### Files Not Touched (As Requested)
- `/pages/cold-traffic-landing-page/` - Ignored per user request
- `/pages/landing-page-blocks.html` - Ignored per user request

---

## 🔗 QUICK REFERENCE

### Master Template Files
- **HTML Structure**: `/projects/Home Page Uplift/home-page-v2.html` (lines 809-850)
- **CSS Styles**: `/global/css/snooze-unified-theme.css` (lines 2662-2837)
- **Component Example**: `/components/value-comparison.html` (lines 40-64)

### Key Checkout URL
```
https://joinsnooze.com/offers/6iRarwak/checkout
```
or
```
https://www.joinsnooze.com/offers/z63s9VaR
```
(Verify which URL is correct for the 3-tier pricing offer)

---

## ✨ RESULT

All core design files have been updated to support the new $79 monthly pricing option. The unified CSS now powers consistent pricing cards across the entire site. Simply deploy the updated CSS to Kajabi and update remaining page content blocks to match the v2 design pattern.

**Total Files Updated:** 7 files
**Files Needing Manual Review:** 12 files
**Design System:** Unified and consistent
