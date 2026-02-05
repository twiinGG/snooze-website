# Landing Page Link Audit - Core Pages Readiness

**Date:** December 4, 2025  
**Status:** In Progress - Issues Found  
**Purpose:** Verify all links from Snooze landing page work correctly for launch

---

## Executive Summary

The Snooze landing page at `joinsnooze.com/snooze` is live and functional. However, several linked pages are returning 404 errors or are not accessible. This document identifies working links, broken links, and pages that need to be created or fixed.

---

## ✅ Working Links

### Core Pages
- **Landing Page:** `https://joinsnooze.com/snooze` ✅ **WORKING**
- **Library Page:** `https://joinsnooze.com/products/communities/v2/snooze/library` ✅ **WORKING**
- **Checkout Page:** `https://joinsnooze.com/offers/6iRarwak/checkout` ✅ **WORKING**

### Navigation Links (From Landing Page)
- **Library:** `https://joinsnooze.com/products/communities/v2/snooze/library` ✅ **WORKING**
- **Join Snooze CTA:** `https://joinsnooze.com/offers/6iRarwak/checkout` ✅ **WORKING**

---

## ❌ Broken Links (404 Errors)

### Critical Pages
1. **The Snooze Method:** `https://joinsnooze.com/products/the-snooze-method`
   - **Status:** Page exists but appears empty/not fully loaded
   - **Priority:** HIGH - Linked from navigation
   - **Action Required:** Verify page exists in Kajabi and is published

2. **About Sally:** `https://joinsnooze.com/about-sally`
   - **Status:** 404 Error
   - **Priority:** MEDIUM - Linked from navigation
   - **Action Required:** Create page or update URL if it exists elsewhere

### Age-Specific Pages (ALL RETURNING 404)
3. **Newborn Sleep Help:** `https://joinsnooze.com/newborn-baby-sleep-help`
   - **Status:** ❌ 404 Error
   - **Priority:** HIGH - Linked from landing page content
   - **Action Required:** Create page in Kajabi using `kajabi-deployment/age-pages/understanding-section-newborn.html`

4. **3-4 Month Baby Sleep Help:** `https://joinsnooze.com/3-4-month-baby-sleep-help`
   - **Status:** ❌ 404 Error
   - **Priority:** HIGH - Linked from landing page content
   - **Action Required:** Create page in Kajabi using `kajabi-deployment/age-pages/understanding-section-3-4-month.html`

5. **5-12 Month Baby Sleep Help:** `https://joinsnooze.com/5-12-month-baby-sleep-help`
   - **Status:** ❌ 404 Error
   - **Priority:** HIGH - Linked from landing page content
   - **Action Required:** Create page in Kajabi using `kajabi-deployment/age-pages/understanding-section-5-12-month.html`

6. **Toddler Sleep Help:** `https://joinsnooze.com/toddler-sleep-help`
   - **Status:** ❌ 404 Error
   - **Priority:** HIGH - Linked from landing page content
   - **Action Required:** Create page in Kajabi using `kajabi-deployment/age-pages/understanding-section-toddler.html`

---

## 🔍 Links to Verify

### Internal Anchor Links (Should Work)
- `#pricing` - Should scroll to pricing section on landing page
- `#faqs` - Should scroll to FAQ section on landing page

### Checkout Links
All `data-checkout` attributes should route to: `https://joinsnooze.com/offers/6iRarwak/checkout`

**Elements with data-checkout:**
- Hero CTA button
- Review cards (3 cards)
- "Inside Snooze" cards (6 cards)
- Age stages CTA buttons
- Sticky CTA bar

**JavaScript Checkout Handler:**
- File: `kajabi-deployment/landing-page/kajabi-custom-javascript.js`
- Line 755: Uses `window.SNOOZE_CHECKOUT_URL` or falls back to `#pricing`
- **Status:** ✅ JavaScript is correctly configured

---

## 📋 Action Items

### Critical (Must Fix Before Launch)

1. **Create Age-Specific Pages (ALL 4 PAGES MISSING)**
   - [ ] **Newborn Sleep Help:** Create page in Kajabi at `/newborn-baby-sleep-help`
     - Use: `kajabi-deployment/age-pages/understanding-section-newborn.html`
     - Follow: `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md` Page 1 checklist
   - [ ] **3-4 Month Baby Sleep Help:** Create page in Kajabi at `/3-4-month-baby-sleep-help`
     - Use: `kajabi-deployment/age-pages/understanding-section-3-4-month.html`
     - Follow: `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md` Page 2 checklist
   - [ ] **5-12 Month Baby Sleep Help:** Create page in Kajabi at `/5-12-month-baby-sleep-help`
     - Use: `kajabi-deployment/age-pages/understanding-section-5-12-month.html`
     - Follow: `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md` Page 3 checklist
   - [ ] **Toddler Sleep Help:** Create page in Kajabi at `/toddler-sleep-help`
     - Use: `kajabi-deployment/age-pages/understanding-section-toddler.html`
     - Follow: `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md` Page 4 checklist
   - **Note:** Understanding sections are ready, but full page transformations need to be completed

2. **Fix The Snooze Method Page**
   - [ ] Verify page exists in Kajabi backend
   - [ ] Check if page is published
   - [ ] Verify URL is correct: `/products/the-snooze-method`
   - [ ] If page doesn't exist, create it using: `kajabi-deployment/the-snooze-method.html`
   - [ ] If page exists but is empty, add content from transformation plan

3. **Fix About Sally Page**
   - [ ] Check if page exists with different URL in Kajabi
   - [ ] If exists elsewhere, update navigation link in landing page
   - [ ] If doesn't exist, either:
     - Create page, OR
     - Remove from navigation (can be added later)

4. **Test All Checkout Links**
   - [ ] Verify all `data-checkout` elements route correctly
   - [ ] Test on mobile and desktop
   - [ ] Verify JavaScript loads correctly

### Secondary (Post-Launch)

5. **Verify Member Library Access**
   - [ ] Test Library page for logged-in members
   - [ ] Test Library page for non-members (should show teaser)
   - [ ] Verify access requirements messaging

6. **Cross-Page Linking**
   - [ ] Verify all internal links work
   - [ ] Test navigation between pages
   - [ ] Check footer links

---

## 🔗 Link Reference

### Navigation Links (From Landing Page HTML)
```html
<!-- Navigation -->
<a href="https://joinsnooze.com/products/communities/v2/snooze/library">Library</a>
<a href="https://joinsnooze.com/products/the-snooze-method">The Snooze Method</a>
<a href="https://joinsnooze.com/about-sally">About Sally</a>
<a href="#pricing">Pricing</a>
<a href="#faqs">FAQs</a>

<!-- CTA -->
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" class="nav-cta">Join Snooze</a>
```

### Age-Specific Links (From Landing Page Content)
```html
<a href="https://joinsnooze.com/newborn-baby-sleep-help">Learn more about newborn sleep support →</a>
<a href="https://joinsnooze.com/3-4-month-baby-sleep-help">Learn more about 3-4 month sleep support →</a>
<a href="https://joinsnooze.com/5-12-month-baby-sleep-help">Learn more about 5-12 month sleep support →</a>
<a href="https://joinsnooze.com/toddler-sleep-help">Learn more about toddler sleep support →</a>
```

### Checkout URL
- **Primary:** `https://joinsnooze.com/offers/6iRarwak/checkout`
- **JavaScript Variable:** `window.SNOOZE_CHECKOUT_URL` (set in HTML)

---

## 📝 Notes

1. **The Snooze Method Page:** The page URL loads but appears empty. This might be:
   - Page exists but has no content
   - Page is not published
   - URL is incorrect
   - Need to check Kajabi backend

2. **Age-Specific Pages:** According to the Holistic Transformation Plan, these pages should exist but may not be published yet. The understanding sections are ready in `kajabi-deployment/age-pages/`.

3. **About Sally:** This page may exist with a different URL. Check Kajabi backend for actual URL.

4. **Checkout Flow:** The checkout page is working correctly. All `data-checkout` attributes should route there via JavaScript.

---

## ✅ Next Steps

1. **Immediate:** Fix broken navigation links (The Snooze Method, About Sally)
2. **High Priority:** Create/fix age-specific pages
3. **Testing:** Test complete user journey from landing page → checkout
4. **Documentation:** Update URL reference document with correct URLs

---

**Last Updated:** December 4, 2025  
**Next Review:** After fixing broken links

