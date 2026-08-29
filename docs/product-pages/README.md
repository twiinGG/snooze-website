# Product Landing Pages

**Status:** Ready for Implementation  
**Location:** `kajabi-deployment/pages/product-pages/`  
**Phase:** Phase 3 (Product/Course Landing Pages) + Phase 6 (Individual Product Reintroduction)

---

## Overview

This directory contains complete product landing pages for individual courses and guides. These pages implement the dual-option purchase strategy (Phase 6) where individual products serve as price anchors while membership remains the hero offer.

---

## Pages Included

### 1. 3-4 Month Course Landing Page
- **File:** `generated-html-pages/3-4-month-course-landing-page.html`
- **URL:** `https://joinsnooze.com/3-4-month-baby-sleep-course`
- **Pricing:** $117 USD (Launch) / $129 USD (BAU)
- **Status:** Ready for deployment

### 2. 5-12 Month Guide Landing Page
- **File:** `generated-html-pages/5-12-month-guide-landing-page.html`
- **URL:** `https://joinsnooze.com/products/5-12-month-sleep-training-course`
- **Pricing:** $117 USD (Launch) / $129 USD (BAU) - Full course
- **Status:** Ready for deployment
- **Note:** Clean URL format (no `/product/` prefix)

### 3. Newborn Sleep Guide Landing Page
- **File:** `generated-html-pages/newborn-guide-landing-page.html`
- **URL:** `https://joinsnooze.com/products/newborn-sleep-guide`
- **Pricing:** $67 USD (Launch) / $77 USD (BAU) - PDF Guide
- **Status:** Ready for deployment
- **Note:** Clean URL format (no `/product/` prefix)

### 4. Toddler Toolkit Landing Page
- **File:** `generated-html-pages/toddler-toolkit-landing-page.html`
- **URL:** `https://joinsnooze.com/products/toddler-toolkit`
- **Pricing:** $117 USD (Launch) / $129 USD (BAU) - Full course
- **Status:** Ready for deployment

### 5. The Snooze Method Landing Page
- **File:** `generated-html-pages/snooze-method-landing-page.html`
- **URL:** `https://joinsnooze.com/products/the-snooze-method`
- **Pricing:** $117 USD (Launch) / $129 USD (BAU) - Full course
- **Status:** Ready for deployment

### 4. 3 to 2 Nap Transition Guide Landing Page (Optional)
- **File:** `3-to-2-nap-transition-landing-page.html`
- **URL:** `https://joinsnooze.com/3-to-2-nap-transition-guide`
- **Pricing:** $27 (Launch) / $37 (BAU) - Mini module
- **Status:** Optional - Mini module landing page
- **Note:** Clean URL format with descriptive naming

---

## Page Structure

Each product landing page includes:

1. **Navigation** - Universal navigation component
2. **Hero Section** - Product-focused hero with context-aware CTA
3. **Value Comparison** - Side-by-side comparison (Individual Product vs Membership)
4. **Context-Aware CTA** - Dynamic CTA based on user status
5. **What's in Snooze** - Membership value proposition
6. **Footer** - Universal footer component

---

## Key Features

### Dual-Option Purchase Strategy (Phase 6)

**Visual Hierarchy:**
- **Membership = Hero** (Large, prominent, "Best Value" badge)
- **Individual Product = Secondary** (Smaller, clear "or" separator)

**Pricing Math:**
- Individual Course: $117 one-time
- Membership: $147/quarter (Launch)
- **"For just $30 more, you get everything"**

**Individual Product Purchase:**
- Shows actual purchase option (not just informational)
- Links to product checkout page
- Maintains membership as primary recommendation

---

## Deployment Instructions

### Step 1: Set Up Global Files (One-Time Only)

**Global JavaScript:**
- Location: Kajabi Settings → Website → Custom JavaScript
- File: `global/js/snooze-globals.js`
- Copy entire contents and paste into Custom JavaScript field

**Global CSS:**
- Location: Kajabi Settings → Theme → Custom CSS
- File: `global/css/snooze-unified-theme.css`
- Copy entire contents and paste into Theme Custom CSS

**See:** `../DEPLOYMENT-GUIDE.md` for detailed instructions

### Step 2: Deploy Individual Product Pages

For each product page:

1. **Open the product page in Kajabi** (or create new page)
2. **Add Code Blocks in this order:**

   **Native Header verification**
   - Do not add a custom navigation Code Block
   - Verify the Kajabi native Header against `kajabi-deployment/PASTE-MAP.md` A6 and `global/native-header-call-to-action.json`

   **Block 2: Hero Section**
   - Add new Code Block after navigation
   - Copy hero section from product page HTML file
   - Paste into Code Block

   **Block 3: Value Comparison**
   - Add new Code Block after hero
   - Copy value comparison section from product page HTML file
   - **Important:** Update product-specific pricing if different
   - Paste into Code Block

   **Block 4: Context-Aware CTA**
   - Add new Code Block after value comparison
   - Copy contents from `../../components/context-aware-cta.html`
   - Paste into Code Block

   **Block 5: What's in Snooze**
   - Add new Code Block after context-aware CTA
   - Copy contents from `../../components/whats-in-snooze.html`
   - **Customize:** Change "This Guide" to "This Course" if applicable
   - Paste into Code Block

   **Block 6: Footer**
   - Add new Code Block at the very bottom
   - Copy contents from `../footer.html`
   - Paste into Code Block

3. **Update Product-Specific Content:**
   - Verify product name in hero section
   - Verify pricing (Launch: $117, BAU: $129)
   - Verify product checkout URL in value comparison
   - Verify product description/intro text

4. **Test:**
   - Test all user states (logged out, logged in non-member, member)
   - Verify context-aware CTAs display correctly
   - Verify individual product purchase link works
   - Verify membership checkout link works
   - Test mobile responsiveness

5. **Publish:**
   - Save all changes
   - Preview page before publishing
   - Publish page
   - Verify live page works correctly

---

## Customization Notes

### Product-Specific Updates

**Hero Section:**
- Update headline with product name
- Update subheadline with product description
- Update supporting points (keep consistent with brand)

**Value Comparison:**
- Update individual product price if different
- Update product checkout URL (from URL-REFERENCE.md)
- Update "For just $X more" message (calculate difference)

**What's in Snooze:**
- Change "This Guide" to "This Course" if applicable
- Keep other content consistent across all pages

---

## URLs Reference

**Source of Truth:** `../../docs/technical/URL-REFERENCE.md`

**Key URLs (Clean Format):**
- **Checkout (Primary):** `https://joinsnooze.com/offers/6iRarwak/checkout`
- **Library:** `https://joinsnooze.com/products/communities/v2/snooze/library`
- **3-4 Month Course:** `https://joinsnooze.com/3-4-month-baby-sleep-course`
- **5-12 Month Guide:** `https://joinsnooze.com/5-12-month-baby-sleep-guide`
- **Newborn Guide:** `https://joinsnooze.com/newborn-sleep-guide`
- **3 to 2 Transition:** `https://joinsnooze.com/3-to-2-nap-transition-guide` (Mini module)

**Note:** All product landing page URLs use clean format (no `/product/` prefix) for consistency and better UX.

---

## Pricing Reference

**Source of Truth:** `../../docs/strategy/SNOOZE-PRICING-STRATEGY.md`

**Current Pricing (Launch):**
- Individual Courses: $117
- Snooze Membership: $147/quarter

**Future Pricing (BAU):**
- Individual Courses: $129
- Snooze Membership: $197/quarter

---

## Phase 6: Individual Product Reintroduction

These pages implement Phase 6 strategy:
- Individual products are actual purchase options (not just informational)
- Membership remains hero offer with clear visual hierarchy
- Price anchoring creates "no-brainer" math ($30 more = everything)
- Individual purchase links to product checkout (with membership upsell configured in Kajabi)

**Next Steps:**
- Configure Kajabi checkout upsells for each individual product
- Set up membership upsell offer during individual product checkout
- Test checkout flow with upsell

---

## Related Files

- **Components:** `../../components/`
- **Navigation:** Kajabi native Header; see `../../kajabi-deployment/PASTE-MAP.md` A6/A7
- **Footer:** `../footer.html`
- **Deployment authority:** `../../kajabi-deployment/PASTE-MAP.md` plus `../DEPLOYMENT-CHECKLIST.md`
- **URL Reference:** `../../docs/technical/URL-REFERENCE.md`
- **Pricing Strategy:** `../../docs/strategy/SNOOZE-PRICING-STRATEGY.md`

---

## Testing Checklist

Before publishing each page:

- [ ] Navigation displays correctly (desktop and mobile)
- [ ] Hero section displays correctly
- [ ] Value comparison shows correct pricing
- [ ] Individual product purchase link works
- [ ] Membership checkout link works
- [ ] Context-aware CTAs work for all user states
- [ ] "What's in Snooze" section displays correctly
- [ ] Footer displays correctly
- [ ] All links work correctly
- [ ] Mobile responsiveness verified
- [ ] Pricing accuracy verified
- [ ] URLs match URL-REFERENCE.md

---

**Last Updated:** December 2025  
**Status:** Ready for Implementation
