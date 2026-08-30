# Archived Snooze Site Transformation - Holistic Execution Plan

**Date:** January 2025  
**Status:** ARCHIVED — historical transformation record; do not execute as a current deployment runbook

**Approach:** Site-wide holistic transformation for consistent, connected experience with data-driven content priorities

> Current authority is `kajabi-deployment/PASTE-MAP.md` plus `docs/DEPLOYMENT-CHECKLIST.md`.
> Every `navigation-code-block.html` and archived `DEPLOYMENT-GUIDE.md` instruction below is retired;
> the live site uses the Kajabi native Header under PASTE-MAP A6/A7.

---

## Executive Summary

This plan addresses the entire Snooze website holistically, focusing on the core pages that will make the Snooze transformation truly great. We're creating a unified, premium experience that connects all pages while leaving peripheral pages (blog posts, legal pages, etc.) as-is for future work.

**Core Philosophy:** Every page should feel connected, intentional, and premium. Users should always know where they are, what's available, and what their next step should be.

---

## Strategic Foundation

### Northstar Documents
- **Master Strategy:** `docs/strategy/SNOOZE-MASTER-STRATEGY.md` - Category leadership vision
- **Positioning:** `docs/strategy/SNOOZE-POSITIONING-FRAMEWORK.md` - Messaging architecture
- **Learning Design:** `docs/strategy/SNOOZE-LEARNING-DESIGN.md` - Three-tiered learning path
- **Tone of Voice:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md` - Authentic Sally voice
- **Pricing Strategy:** `docs/strategy/SNOOZE-PRICING-STRATEGY.md` - Pricing framework

### Data-Driven Content Foundation
- **User Needs Analysis:** Analysis of 1,044 Q&A pairs and 800+ TikTok videos
- **Priority Guide:** `docs/content/DATA-DRIVEN-CONTENT-PRIORITIES.md` - Content priorities based on actual parent queries
- **Common Questions:** `docs/content/COMMON-QUESTIONS-BY-AGE.md` - Actual parent questions by age
- **Age Insights:** `docs/content/AGE-SPECIFIC-INSIGHTS.md` - Data-driven insights for each age stage
- **Analysis Script:** `scripts/analyze-age-specific-user-needs.py` - Reusable analysis tool

**Key Insight:** Content prioritization is now based on actual parent needs from our knowledge base, not assumptions. This ensures we address the most urgent concerns first.

### User Classes
1. **New Visitor:** Not logged in → Drive to checkout
2. **Logged-In Non-Member:** Has account, no Snooze → Show teaser, upgrade CTA
3. **Snooze Member:** Active membership → Full access, Library, Village

### Core Pages to Transform

**Priority 1 - Core User Journey:**
- ✅ Landing Page (Phase 2 Complete)
- Age-Specific Pages (4 pages)
- Product/Course Landing Pages (3 pages)
- The Snooze Method Page
- Library Page

**Priority 2 - Access & Support:**
- Login Page
- Navigation/Footer (Phase 1 Complete)

**Priority 3 - Standardization:**
- Checkout URL standardization site-wide
- Cross-page linking strategy
- Value comparison components

**Defer for Later:**
- Blog posts (preserve SEO, update later)
- Legal pages (Terms, FAQs - minimal updates)
- About Sally (minor updates only)

---

## Reusable Components Architecture

### Component 0: Hero Sections (NEW - Replaces Elfsight Reviews)

**Purpose:** On-brand, impactful hero sections that replace Elfsight Google Reviews widgets

**Files:**
- `components/hero-sections/hero-{page-type}.html` - Individual hero sections for each page
- CSS integrated in `snooze-unified-theme.css` (website pages) and `snooze-landing-pages.css` (landing pages)

**Key Features:**
- Emotionally resonant headlines addressing parent challenges
- Evidence-based, supportive messaging (Tone of Voice compliant)
- Trust signals replacing external review widgets
- SEO-friendly direct HTML content (not iframes)
- Mobile-responsive design

**Page Mapping:**
- Newborn Sleep Help → `hero-newborn.html`
- 3-4 Month Baby Sleep Help → `hero-3-4-month.html`
- 5-12 Month Baby Sleep Help → `hero-5-12-month.html` (early rising focus)
- Toddler Sleep Help → `hero-toddler.html`
- Product/Course pages → `hero-{product-type}.html`
- The Snooze Method → `hero-snooze-method.html`
- Library → `hero-library.html`
- Landing Page → `hero-landing.html`

**Deployment:**
1. Remove Elfsight Google Reviews widget (delete Code Block)
2. Add hero section Code Block after navigation
3. CSS automatically hides any remaining Elfsight widgets

### Component 1: Context-Aware CTA Block

**Purpose:** Single reusable component that shows appropriate CTA based on user status

**States:**
- New Visitor: "Join Snooze" → `/offers/6iRarwak/checkout`
- Logged-In Non-Member: "Upgrade to Snooze" → `/offers/6iRarwak/checkout`
- Snooze Member: "Go to Library" → Library URL
- Unknown/Fallback: Signposting (show all options with labels)

**Features:**
- JavaScript variable: `window.SNOOZE_CHECKOUT_URL`
- Fallback signposting if detection fails
- Premium design consistent across site
- Accessible and mobile-responsive

### Component 2: "What's in Snooze" Section

**Purpose:** Show value of membership vs individual products

**Content Structure:**
- This resource is included in Snooze
- Plus all other age guides
- Plus Library, Village, live sessions with the Snooze Specialists
- Price comparison: Individual vs Membership

**Design:**
- Premium card layout
- Clear value messaging
- Consistent across all pages

### Component 3: Value Comparison Table

**Purpose:** Compare individual product cost vs membership value

**Structure:**
- Left: Individual product ($117-$129 course, $27-$37 mini module)
- Middle: Snooze Membership ($147/quarter Launch, $197/quarter BAU)
- Right: "Get this + everything else" messaging

**Pricing Source:** `docs/strategy/SNOOZE-PRICING-STRATEGY.md`

### Component 4: Age Page Cross-Linking

**Purpose:** Show comprehensiveness of Snooze offering

**Content:**
- "Also Available" section at bottom
- Links to other age-specific pages
- "All included in Snooze membership" messaging

---

## Page-by-Page Transformation Plan

### 1. Age-Specific Pages (4 Pages)

**Pages:**
1. Newborn Sleep Help (0-3 Months) - `/newborn-baby-sleep-help`
2. 3-4 Month Baby Sleep Help - `/3-4-month-baby-sleep-help`
3. 5-12 Month Baby Sleep Help - `/5-12-month-baby-sleep-help`
4. Toddler Sleep Help (12 Months+) - `/toddler-sleep-help`

---

### 📋 **PAGE 1: Newborn Sleep Help (0-3 Months)**

**URL:** `/newborn-baby-sleep-help`  
**File Reference:** `kajabi-deployment/age-pages/understanding-section-newborn.html`

#### Pre-Deployment Setup (One-Time Only)

- [x] **Add Global JavaScript to Site Header** (if not already done)
  - Location: Kajabi Settings → Website → Custom JavaScript
  - File: `js/snooze-globals-site-header.js`
  - Copy entire contents and paste into Custom JavaScript field
  - Verify: Check browser console for `window.SnoozeUserDetection`

- [x] **Add CSS** (if not already done)
  - **For Website Pages:** Kajabi Settings → Theme → Custom CSS
    - File: `snooze-unified-theme.css` ⭐
    - Copy entire contents and paste into Theme Custom CSS
    - Applies automatically to all website pages
  - **For Landing Pages:** Each page's Custom CSS field
    - File: `snooze-landing-pages.css` ⭐
    - Copy entire contents and paste into page's Custom CSS
    - Repeat for each landing page individually
  - **See:** `DEPLOYMENT-GUIDE.md` ⭐ **SINGLE SOURCE OF TRUTH** for detailed instructions

#### Page Transformation Checklist

**Step 1: Navigation**
- [x] Open page in Kajabi editor
- [x] Add new Code Block at the very top (first element)
- [x] Copy contents from `navigation-code-block.html`
- [x] Paste into Code Block
- [x] Verify navigation displays correctly
- [x] Test mobile menu toggle

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [x] **Remove Elfsight Google Reviews widget:**
  - [x] Find Code Block containing Elfsight widget/script
  - [x] Search for "elfsight" or "google-reviews" in page content
  - [x] Delete the Code Block OR remove widget HTML
  - [x] **CSS automatically hides any remaining widgets** (no action needed)
- [x] **Add new on-brand hero section:**
  - [x] Add new Code Block immediately after navigation
  - [x] Copy contents from `kajabi-deployment/components/hero-sections/hero-newborn.html`
  - [x] Paste into Code Block
  - [x] Verify hero displays correctly:
    - [x] Headline: "Confident, calm newborn sleep." displays correctly
    - [x] Subheadline provides clarity about guidance offered
    - [x] Supporting points show with checkmarks (3 points)
    - [x] Trust signal displays at bottom: "Trusted by thousands of families..."
- [x] **Note:** Old hero content can be kept below new hero or removed (new hero is primary)

**Step 3: Understanding Section (VALUE-FIRST)**
- [x] Add new Code Block immediately after hero section
- [x] Copy contents from `age-pages/understanding-section-newborn.html`
- [x] Paste into Code Block
- [x] Verify content displays correctly:
  - [x] "What's Normal for Newborns" section
  - [x] "Why This Happens" section  
  - [x] "Is This Something to Address?" section
- [x] Verify data-driven priorities are included:
  - [x] "Is this normal?" focus (highest frequency question)
  - [x] Safe sleep environment content (265 Q&A pairs)
  - [x] Caregiver sleep deprivation addressed
- [x] Check mobile responsiveness

**Step 4: Context-Aware CTA (After Understanding)**
- [x] Add new Code Block after understanding section
- [x] Copy contents from `components/context-aware-cta.html`
- [x] Paste into Code Block
- [x] Test CTA displays correctly:
  - [x] Shows appropriate message based on user status
  - [x] Falls back to signposting if detection fails
- [x] Verify CTA uses `window.SNOOZE_CHECKOUT_URL`

**Step 5: Main Content**
- [ ] Keep existing page content between CTA and "What's in Snooze"
- [ ] Review existing content for Tone of Voice compliance
- [ ] Note any existing CTAs (will update in Step 9)

**Step 6: "What's in Snooze" Section**
- [ ] Add new Code Block after main content
- [ ] Copy contents from `components/whats-in-snooze.html`
- [ ] Paste into Code Block
- [ ] Verify displays correctly:
  - [ ] Shows "This guide is included in Snooze"
  - [ ] Lists all age guides, Library, Village, live sessions with the Snooze Specialists
  - [ ] Premium card design displays correctly
- [ ] Check mobile responsiveness

**Step 7: Value Comparison Section**
- [ ] Add new Code Block after "What's in Snooze" section
- [ ] Copy contents from `components/value-comparison.html`
- [ ] Paste into Code Block
- [ ] **Update pricing** (if needed):
  - [ ] Check `docs/strategy/SNOOZE-PRICING-STRATEGY.md` for current pricing
  - [ ] Update individual product price if different
  - [ ] Verify membership price ($147/quarter Launch)
  - [ ] Update "For just $X more" message if pricing changed
- [ ] Verify comparison displays correctly:
  - [ ] Individual product vs membership comparison
  - [ ] Clear savings demonstration
  - [ ] "Best Value" badge on membership side
- [ ] Check mobile responsiveness

**Step 8: Age Cross-Linking Section**
- [ ] Add new Code Block before footer (near bottom of page)
- [ ] Copy contents from `components/age-cross-linking.html`
- [ ] Paste into Code Block
- [ ] **Verify all URLs are correct:**
  - [ ] Newborn link: `/newborn-baby-sleep-help`
  - [ ] 3-4 Month link: `/3-4-month-baby-sleep-help`
  - [ ] 5-12 Month link: `/5-12-month-baby-sleep-help`
  - [ ] Toddler link: `/toddler-sleep-help`
- [ ] Verify displays correctly:
  - [ ] Shows all 4 age cards
  - [ ] Highlights current age (Newborn)
  - [ ] "All included in Snooze membership" messaging
- [ ] Check mobile responsiveness

**Step 9: Footer**
- [ ] Add new Code Block at the very bottom (last element)
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly:
  - [ ] 4-column layout
  - [ ] All links work
  - [ ] Social media icons display
- [ ] Check mobile responsiveness

**Step 10: Update Existing CTAs**
- [ ] Search page for any hardcoded checkout URLs
- [ ] Replace with references to `window.SNOOZE_CHECKOUT_URL`
- [ ] Replace any generic CTAs with context-aware CTA component
- [ ] Update any product purchase CTAs to show membership option

**Step 11: Testing & Verification**
- [ ] **Test logged out (New Visitor):**
  - [ ] Navigation shows "Log In" link
  - [ ] Context-aware CTAs show "Join Snooze"
  - [ ] All checkout links work
- [ ] **Test logged in (Non-Member):**
  - [ ] Navigation shows user avatar (if available)
  - [ ] Context-aware CTAs show "Upgrade to Snooze"
  - [ ] Upgrade links work
- [ ] **Test logged in (Member):**
  - [ ] Navigation shows Library link
  - [ ] Context-aware CTAs show "Go to Library"
  - [ ] Library links work
- [ ] **Test mobile:**
  - [ ] Navigation menu works
  - [ ] All sections are readable
  - [ ] CTAs are accessible
  - [ ] Footer is responsive
- [ ] **Content Review:**
  - [ ] Tone of Voice compliance check
  - [ ] Pricing accuracy verified
  - [ ] All URLs are correct
  - [ ] No broken links

**Step 12: Publish**
- [ ] Save all changes in Kajabi
- [ ] Preview page before publishing
- [ ] Publish page
- [ ] Verify live page works correctly

---

### 📋 **PAGE 2: 3-4 Month Baby Sleep Help**

**URL:** `/3-4-month-baby-sleep-help`  
**File Reference:** `kajabi-deployment/age-pages/understanding-section-3-4-month.html`

#### Pre-Deployment Setup (One-Time Only)

- [ ] **Verify Global JavaScript is added** (should already be done from Page 1)
- [ ] **Verify CSS is added** (should already be done from Page 1)
  - Website Pages: Check Theme Custom CSS has `snooze-unified-theme.css`
  - Landing Pages: Check page Custom CSS has `snooze-landing-pages.css`

#### Page Transformation Checklist

**Step 1: Navigation**
- [ ] Add new Code Block at the very top
- [ ] Copy contents from `navigation-code-block.html`
- [ ] Paste into Code Block
- [ ] Verify navigation displays correctly

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [ ] **Remove Elfsight Google Reviews widget** (if present)
  - [ ] Find and delete Elfsight widget Code Block
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add new on-brand hero section:**
  - [ ] Add new Code Block after navigation
  - [ ] Copy contents from `kajabi-deployment/components/hero-sections/hero-3-4-month.html`
  - [ ] Paste into Code Block
  - [ ] Verify displays correctly (headline, subheadline, supporting points, trust signal)

**Step 3: Understanding Section (VALUE-FIRST)**
- [ ] Add new Code Block immediately after hero section
- [ ] Copy contents from `age-pages/understanding-section-3-4-month.html`
- [ ] Paste into Code Block
- [ ] Verify data-driven priorities are included:
  - [ ] 4-month regression understanding (87 Q&A pairs)
  - [ ] "What is the 4-month regression?" addressed
  - [ ] Reframed as opportunity, not scary
  - [ ] Sleep training readiness guidance
- [ ] Check mobile responsiveness

**Step 4: Context-Aware CTA (After Understanding)**
- [ ] Add new Code Block after understanding section
- [ ] Copy contents from `components/context-aware-cta.html`
- [ ] Paste into Code Block
- [ ] Test CTA displays correctly

**Step 5: Main Content**
- [ ] Keep existing page content
- [ ] Review for Tone of Voice compliance

**Step 6: "What's in Snooze" Section**
- [ ] Add new Code Block after main content
- [ ] Copy contents from `components/whats-in-snooze.html`
- [ ] Paste into Code Block
- [ ] Verify displays correctly

**Step 7: Value Comparison Section**
- [ ] Add new Code Block after "What's in Snooze" section
- [ ] Copy contents from `components/value-comparison.html`
- [ ] **Update pricing:**
  - [ ] Check pricing strategy doc for 3-4 Month course price
  - [ ] Update individual product price
  - [ ] Update "For just $X more" message
- [ ] Verify comparison displays correctly

**Step 8: Age Cross-Linking Section**
- [ ] Add new Code Block before footer
- [ ] Copy contents from `components/age-cross-linking.html`
- [ ] Verify URLs are correct (highlight 3-4 Month)

**Step 9: Footer**
- [ ] Add new Code Block at the very bottom
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly

**Step 10: Update Existing CTAs**
- [ ] Search for hardcoded checkout URLs
- [ ] Replace with `window.SNOOZE_CHECKOUT_URL` references

**Step 11: Testing & Verification**
- [ ] Test all user states (logged out, logged in non-member, member)
- [ ] Test mobile responsiveness
- [ ] Content review (Tone of Voice, pricing, URLs)

**Step 12: Publish**
- [ ] Save all changes
- [ ] Preview before publishing
- [ ] Publish and verify live

---

### 📋 **PAGE 3: 5-12 Month Baby Sleep Help** ⚠️ **HIGHEST PRIORITY**

**URL:** `/5-12-month-baby-sleep-help`  
**File Reference:** `kajabi-deployment/age-pages/understanding-section-5-12-month.html`  
**Note:** This page has the MOST URGENT content needs (512 Q&A pairs analyzed)

#### Pre-Deployment Setup (One-Time Only)

- [ ] **Verify Global JavaScript is added**
- [ ] **Verify CSS is added**

#### Page Transformation Checklist

**Step 1: Navigation**
- [ ] Add new Code Block at the very top
- [ ] Copy contents from `navigation-code-block.html`
- [ ] Paste into Code Block
- [ ] Verify navigation displays correctly

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [ ] **Remove Elfsight Google Reviews widget** (if present)
  - [ ] Find and delete Elfsight widget Code Block
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add new on-brand hero section:**
  - [ ] Add new Code Block after navigation
  - [ ] Copy contents from `kajabi-deployment/components/hero-sections/hero-3-4-month.html`
  - [ ] Paste into Code Block
  - [ ] Verify displays correctly (headline, subheadline, supporting points, trust signal)

**Step 3: Understanding Section (VALUE-FIRST) - CRITICAL PRIORITY**
- [ ] Add new Code Block immediately after hero section
- [ ] Copy contents from `age-pages/understanding-section-5-12-month.html`
- [ ] Paste into Code Block
- [ ] **Verify data-driven priorities are included (MOST URGENT):**
  - [ ] **Early rising leads the section** (MOST COMMON CONCERN - 512 Q&A pairs)
  - [ ] Nap scheduling/wake windows prominently featured
  - [ ] Sleep training readiness addressed
  - [ ] Rolling over and safety concerns
  - [ ] Nap transitions guidance
- [ ] Check mobile responsiveness

**Step 4: Context-Aware CTA (After Understanding)**
- [ ] Add new Code Block after understanding section
- [ ] Copy contents from `components/context-aware-cta.html`
- [ ] Paste into Code Block
- [ ] Test CTA displays correctly

**Step 5: Main Content**
- [ ] Keep existing page content
- [ ] Review for Tone of Voice compliance

**Step 6: "What's in Snooze" Section**
- [ ] Add new Code Block after main content
- [ ] Copy contents from `components/whats-in-snooze.html`
- [ ] Paste into Code Block
- [ ] Verify displays correctly

**Step 7: Value Comparison Section**
- [ ] Add new Code Block after "What's in Snooze" section
- [ ] Copy contents from `components/value-comparison.html`
- [ ] **Update pricing:**
  - [ ] Check pricing strategy doc for 5-12 Month guide price
  - [ ] Update individual product price
  - [ ] Update "For just $X more" message
- [ ] Verify comparison displays correctly

**Step 8: Age Cross-Linking Section**
- [ ] Add new Code Block before footer
- [ ] Copy contents from `components/age-cross-linking.html`
- [ ] Verify URLs are correct (highlight 5-12 Month)

**Step 9: Footer**
- [ ] Add new Code Block at the very bottom
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly

**Step 10: Update Existing CTAs**
- [ ] Search for hardcoded checkout URLs
- [ ] Replace with `window.SNOOZE_CHECKOUT_URL` references

**Step 11: Testing & Verification**
- [ ] Test all user states (logged out, logged in non-member, member)
- [ ] Test mobile responsiveness
- [ ] Content review (Tone of Voice, pricing, URLs)
- [ ] **Verify early rising content is prominent** (data-driven priority)

**Step 12: Publish**
- [ ] Save all changes
- [ ] Preview before publishing
- [ ] Publish and verify live

---

### 📋 **PAGE 4: Toddler Sleep Help (12+ Months)**

**URL:** `/toddler-sleep-help`  
**File Reference:** `kajabi-deployment/age-pages/understanding-section-toddler.html`

#### Pre-Deployment Setup (One-Time Only)

- [ ] **Verify Global JavaScript is added**
- [ ] **Verify CSS is added**

#### Page Transformation Checklist

**Step 1: Navigation**
- [ ] Add new Code Block at the very top
- [ ] Copy contents from `navigation-code-block.html`
- [ ] Paste into Code Block
- [ ] Verify navigation displays correctly

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [ ] **Remove Elfsight Google Reviews widget** (if present)
  - [ ] Find and delete Elfsight widget Code Block
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add new on-brand hero section:**
  - [ ] Add new Code Block after navigation
  - [ ] Copy contents from `kajabi-deployment/components/hero-sections/hero-3-4-month.html`
  - [ ] Paste into Code Block
  - [ ] Verify displays correctly (headline, subheadline, supporting points, trust signal)

**Step 3: Understanding Section (VALUE-FIRST)**
- [ ] Add new Code Block immediately after hero section
- [ ] Copy contents from `age-pages/understanding-section-toddler.html`
- [ ] Paste into Code Block
- [ ] Verify data-driven priorities are included:
  - [ ] **Bedtime battles lead the section** (180 Q&A pairs)
  - [ ] Nap transition timing guidance
  - [ ] Sleep schedule protection strategies
  - [ ] 18-month regression understanding
  - [ ] Boundary testing normalization
- [ ] Check mobile responsiveness

**Step 4: Context-Aware CTA (After Understanding)**
- [ ] Add new Code Block after understanding section
- [ ] Copy contents from `components/context-aware-cta.html`
- [ ] Paste into Code Block
- [ ] Test CTA displays correctly

**Step 5: Main Content**
- [ ] Keep existing page content
- [ ] Review for Tone of Voice compliance

**Step 6: "What's in Snooze" Section**
- [ ] Add new Code Block after main content
- [ ] Copy contents from `components/whats-in-snooze.html`
- [ ] Paste into Code Block
- [ ] Verify displays correctly

**Step 7: Value Comparison Section**
- [ ] Add new Code Block after "What's in Snooze" section
- [ ] Copy contents from `components/value-comparison.html`
- [ ] **Update pricing:**
  - [ ] Check pricing strategy doc for Toddler guide price
  - [ ] Update individual product price
  - [ ] Update "For just $X more" message
- [ ] Verify comparison displays correctly

**Step 8: Age Cross-Linking Section**
- [ ] Add new Code Block before footer
- [ ] Copy contents from `components/age-cross-linking.html`
- [ ] Verify URLs are correct (highlight Toddler)

**Step 9: Footer**
- [ ] Add new Code Block at the very bottom
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly

**Step 10: Update Existing CTAs**
- [ ] Search for hardcoded checkout URLs
- [ ] Replace with `window.SNOOZE_CHECKOUT_URL` references

**Step 11: Testing & Verification**
- [ ] Test all user states (logged out, logged in non-member, member)
- [ ] Test mobile responsiveness
- [ ] Content review (Tone of Voice, pricing, URLs)

**Step 12: Publish**
- [ ] Save all changes
- [ ] Preview before publishing
- [ ] Publish and verify live

---

**Content Philosophy (Data-Driven):**
- 60% Value / 40% Conversion balance
- Understanding section provides real value before sales content
- **Content prioritizes actual parent needs** (based on 1,044 Q&A pair analysis)
- **Lead with urgent concerns** from real parent queries:
  - Address "Is this normal?" first (highest frequency question type)
  - Prioritize topics with highest question volume and engagement
  - Use actual parent language from knowledge base
- Users should learn something valuable even if they don't convert
- Builds trust, improves SEO, ultimately increases conversion
- **Data sources:**
  - `docs/content/AGE-SPECIFIC-USER-NEEDS-ANALYSIS.md` (full analysis)
  - `docs/content/DATA-DRIVEN-CONTENT-PRIORITIES.md` (quick reference)

**Design Principles:**
- Premium experience throughout
- Consistent with landing page styling
- Clear hierarchy and visual flow
- Mobile-first responsive design

---

### 2. Product/Course Landing Pages (3 Pages)

**Pages:**
1. 3-4 Month Course Landing Page - `/products/3-4-month-baby-sleep-course-by-the-sleep-concierge`
2. 5-12 Month Guide Landing Page - `/products/the-snooze-method-5-12-month-sleep`
3. Newborn Sleep Guide Landing Page - `/products/[newborn-guide-url]`

---

### 📋 **PAGE 5: 3-4 Month Course Landing Page**

**URL:** `/products/3-4-month-baby-sleep-course-by-the-sleep-concierge`  
**Pricing:** Individual course $117 (verify in pricing strategy doc)

#### Pre-Deployment Setup

- [ ] **Verify Global JavaScript is added**
- [ ] **Verify CSS is added**

#### Page Transformation Checklist

**Step 1: Navigation**
- [ ] Add new Code Block at the very top
- [ ] Copy contents from `navigation-code-block.html`
- [ ] Paste into Code Block
- [ ] Verify navigation displays correctly

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [ ] **Remove Elfsight Google Reviews widget** (if present)
  - [ ] Find and delete Elfsight widget Code Block
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add new on-brand hero section:**
  - [ ] Add new Code Block after navigation
  - [ ] Copy contents from `kajabi-deployment/components/hero-sections/hero-3-4-month-course.html`
  - [ ] Paste into Code Block
  - [ ] Verify displays correctly (headline, subheadline, supporting points, trust signal)
- [ ] **Note:** Existing product description can remain below hero or be integrated

**Step 3: Product Comparison Section (NEW)**
- [ ] Add new Code Block after hero section
- [ ] Copy contents from `components/value-comparison.html`
- [ ] **Customize for product page:**
  - [ ] Update individual product price: $117 (verify in pricing doc)
  - [ ] Update comparison messaging: "Individual Course" vs "Snooze Membership"
  - [ ] Update savings message: "For just $30 more, get everything"
  - [ ] Emphasize: "Get this course + all other courses + Library + Village"
- [ ] Verify comparison displays correctly
- [ ] Check mobile responsiveness

**Step 4: Product Description**
- [ ] Keep existing product description/content
- [ ] Review for Tone of Voice compliance
- [ ] Note any existing CTAs

**Step 5: "What's in Snooze" Section**
- [ ] Add new Code Block after product description
- [ ] Copy contents from `components/whats-in-snooze.html`
- [ ] **Customize messaging:**
  - [ ] Emphasize: "This course is included in Snooze membership"
  - [ ] Show: This course + all other age guides + Library + Village + live sessions with the Snooze Specialists
- [ ] Verify displays correctly

**Step 6: Context-Aware CTAs**
- [ ] **Replace existing purchase CTAs** with context-aware component
- [ ] Add new Code Block where purchase CTA should be
- [ ] Copy contents from `components/context-aware-cta.html`
- [ ] Paste into Code Block
- [ ] **For members:** Should show "Go to Library" (course is included)
- [ ] **For non-members:** Should show "Join Snooze" or "Upgrade to Snooze"
- [ ] Test CTA displays correctly for each user state

**Step 7: Footer**
- [ ] Add new Code Block at the very bottom
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly

**Step 8: Update Existing CTAs**
- [ ] Search page for product purchase CTAs
- [ ] Replace with context-aware CTA component OR
- [ ] Update to show membership option prominently
- [ ] Update any hardcoded checkout URLs to use `window.SNOOZE_CHECKOUT_URL`

**Step 9: Testing & Verification**
- [ ] Test all user states (logged out, logged in non-member, member)
- [ ] Verify pricing is accurate (check pricing strategy doc)
- [ ] Verify membership messaging is clear
- [ ] Test mobile responsiveness
- [ ] Content review (Tone of Voice, pricing, URLs)

**Step 10: Publish**
- [ ] Save all changes
- [ ] Preview before publishing
- [ ] Publish and verify live

---

### 📋 **PAGE 6: 5-12 Month Guide Landing Page** ⚠️ **HIGHEST VALUE**

**URL:** `/products/the-snooze-method-5-12-month-sleep`  
**Pricing:** Individual guide $67 (may upgrade to $117 course - verify in pricing strategy doc)

#### Pre-Deployment Setup

- [ ] **Verify Global JavaScript is added**
- [ ] **Verify CSS is added**

#### Page Transformation Checklist

**Step 1: Navigation**
- [ ] Add new Code Block at the very top
- [ ] Copy contents from `navigation-code-block.html`
- [ ] Paste into Code Block
- [ ] Verify navigation displays correctly

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [ ] **Remove Elfsight Google Reviews widget** (if present)
  - [ ] Find and delete Elfsight widget Code Block
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add new on-brand hero section:**
  - [ ] Add new Code Block after navigation
  - [ ] Copy contents from `kajabi-deployment/components/hero-sections/hero-5-12-month-guide.html`
  - [ ] Paste into Code Block
  - [ ] Verify displays correctly (headline, subheadline, supporting points, trust signal)
- [ ] **Note:** Existing product description can remain below hero or be integrated

**Step 3: Product Comparison Section (NEW)**
- [ ] Add new Code Block after hero section
- [ ] Copy contents from `components/value-comparison.html`
- [ ] **Customize for product page:**
  - [ ] Update individual product price: $67 (verify in pricing doc)
  - [ ] Update comparison messaging
  - [ ] Update savings message: "For just $80 more, get everything"
  - [ ] Emphasize value: Guide alone vs complete membership
- [ ] Verify comparison displays correctly

**Step 4: Product Description**
- [ ] Keep existing product description/content
- [ ] Review for Tone of Voice compliance

**Step 5: "What's in Snooze" Section**
- [ ] Add new Code Block after product description
- [ ] Copy contents from `components/whats-in-snooze.html`
- [ ] Customize messaging for this guide
- [ ] Verify displays correctly

**Step 6: Context-Aware CTAs**
- [ ] Replace existing purchase CTAs with context-aware component
- [ ] Add Code Block with context-aware CTA
- [ ] Test CTA displays correctly for each user state

**Step 7: Footer**
- [ ] Add new Code Block at the very bottom
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly

**Step 8: Update Existing CTAs**
- [ ] Search for product purchase CTAs
- [ ] Replace with context-aware CTA component
- [ ] Update hardcoded URLs

**Step 9: Testing & Verification**
- [ ] Test all user states
- [ ] Verify pricing accuracy
- [ ] Test mobile responsiveness
- [ ] Content review

**Step 10: Publish**
- [ ] Save all changes
- [ ] Preview before publishing
- [ ] Publish and verify live

---

### 📋 **PAGE 7: Newborn Sleep Guide Landing Page**

**URL:** `/products/[newborn-guide-url]` (verify exact URL)  
**Pricing:** Individual guide $67 (may upgrade to $117 course - verify in pricing strategy doc)

#### Pre-Deployment Setup

- [ ] **Verify Global JavaScript is added**
- [ ] **Verify CSS is added**

#### Page Transformation Checklist

**Step 1: Navigation**
- [ ] Add new Code Block at the very top
- [ ] Copy contents from `navigation-code-block.html`
- [ ] Paste into Code Block
- [ ] Verify navigation displays correctly

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [ ] **Remove Elfsight Google Reviews widget** (if present)
  - [ ] Find and delete Elfsight widget Code Block
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add new on-brand hero section:**
  - [ ] Add new Code Block after navigation
  - [ ] Copy contents from `kajabi-deployment/components/hero-sections/hero-newborn-guide.html`
  - [ ] Paste into Code Block
  - [ ] Verify displays correctly (headline, subheadline, supporting points, trust signal)
- [ ] **Note:** Existing product description can remain below hero or be integrated

**Step 3: Product Comparison Section (NEW)**
- [ ] Add new Code Block after hero section
- [ ] Copy contents from `components/value-comparison.html`
- [ ] **Customize for product page:**
  - [ ] Update individual product price: $67 (verify in pricing doc)
  - [ ] Update comparison messaging
  - [ ] Update savings message: "For just $80 more, get everything"
- [ ] Verify comparison displays correctly

**Step 4: Product Description**
- [ ] Keep existing product description/content
- [ ] Review for Tone of Voice compliance

**Step 5: "What's in Snooze" Section**
- [ ] Add new Code Block after product description
- [ ] Copy contents from `components/whats-in-snooze.html`
- [ ] Customize messaging for this guide
- [ ] Verify displays correctly

**Step 6: Context-Aware CTAs**
- [ ] Replace existing purchase CTAs with context-aware component
- [ ] Add Code Block with context-aware CTA
- [ ] Test CTA displays correctly for each user state

**Step 7: Footer**
- [ ] Add new Code Block at the very bottom
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly

**Step 8: Update Existing CTAs**
- [ ] Search for product purchase CTAs
- [ ] Replace with context-aware CTA component
- [ ] Update hardcoded URLs

**Step 9: Testing & Verification**
- [ ] Test all user states
- [ ] Verify pricing accuracy
- [ ] Test mobile responsiveness
- [ ] Content review

**Step 10: Publish**
- [ ] Save all changes
- [ ] Preview before publishing
- [ ] Publish and verify live

---

**Key Messaging for All Product Pages:**
- "This course is included in Snooze membership"
- "For just $X more, get everything"
- Price anchoring: Show individual cost vs membership value

---

### 3. The Snooze Method Page

**File:** `projects/snooze-website/kajabi-deployment/the-snooze-method.html`  
**URL:** `/the-snooze-method`

**Current Status:** Partially complete, needs updates

---

### 📋 **PAGE 8: The Snooze Method Page**

#### Pre-Deployment Setup

- [ ] **Verify Global JavaScript is added**
- [ ] **Verify CSS is added**

#### Page Transformation Checklist

**Step 1: Navigation**
- [ ] Add new Code Block at the very top
- [ ] Copy contents from `navigation-code-block.html`
- [ ] Paste into Code Block
- [ ] Verify navigation displays correctly

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [ ] **Remove Elfsight Google Reviews widget** (if present)
  - [ ] Find and delete Elfsight widget Code Block
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add new on-brand hero section:**
  - [ ] Add new Code Block after navigation
  - [ ] Copy contents from `kajabi-deployment/components/hero-sections/hero-snooze-method.html`
  - [ ] Paste into Code Block
  - [ ] Verify displays correctly (headline, subheadline, supporting points, trust signal)
- [ ] **Note:** Existing content can remain below hero or be integrated

**Step 3: Three-Tiered Learning Path Visualization**
- [ ] Add new Code Block after hero
- [ ] Create visual showing: Foundational → Age-Based → Troubleshooting
- [ ] Link to each tier in Library:
  - [ ] Foundational: Link to The Method course in Library
  - [ ] Age-Based: Link to age-specific guides
  - [ ] Troubleshooting: Link to troubleshooting resources
- [ ] Premium design, clear visual hierarchy

**Step 4: Content Enhancement**
- [ ] Review existing page content
- [ ] Add links to foundational course in Library
- [ ] Show three-tiered learning path clearly
- [ ] Evidence-based messaging from positioning framework
- [ ] Review for Tone of Voice compliance

**Step 5: Value Proposition Section**
- [ ] Add or enhance value proposition section
- [ ] Include messaging about what makes The Snooze Method different:
  - [ ] Evidence-based but practical
  - [ ] Structured but flexible
  - [ ] From positioning framework
- [ ] Link to positioning framework document for reference

**Step 6: Context-Aware CTAs**
- [ ] Add new Code Block with context-aware CTA
- [ ] Copy contents from `components/context-aware-cta.html`
- [ ] **Customize messaging:**
  - [ ] Members: "Start The Method" → Library link
  - [ ] Non-members: "Join Snooze to Start The Method" → Checkout
  - [ ] Visitors: "Learn More About The Method" → Checkout or Library preview
- [ ] Fallback signposting

**Step 7: Footer**
- [ ] Add new Code Block at the very bottom
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly

**Step 8: Update Existing CTAs**
- [ ] Search for any existing CTAs
- [ ] Replace with context-aware CTA component OR
- [ ] Update to use `window.SNOOZE_CHECKOUT_URL`

**Step 9: Testing & Verification**
- [ ] Test all user states (logged out, logged in non-member, member)
- [ ] Verify all Library links work correctly
- [ ] Test mobile responsiveness
- [ ] Content review (Tone of Voice, messaging, URLs)

**Step 10: Publish**
- [ ] Save all changes
- [ ] Preview before publishing
- [ ] Publish and verify live

---

### 4. Library Page Enhancement

**File:** `projects/landing-page/kajabi-deployment/library-page/section-01-title.html`  
**URL:** `/products/communities/v2/snooze/library` or similar

**Current Status:** Structure exists, needs context-aware access

---

### 📋 **PAGE 9: Library Page**

#### Pre-Deployment Setup

- [ ] **Verify Global JavaScript is added**
- [ ] **Verify CSS is added**

#### Page Transformation Checklist

**Step 1: Navigation**
- [ ] Add new Code Block at the very top
- [ ] Copy contents from `navigation-code-block.html`
- [ ] Paste into Code Block
- [ ] Verify navigation displays correctly

**Step 2: Hero Section (REPLACE ELFSIGHT REVIEWS WITH ON-BRAND HERO)**
- [ ] **Remove Elfsight Google Reviews widget** (if present)
  - [ ] Find and delete Elfsight widget Code Block
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add new on-brand hero section:**
  - [ ] Add new Code Block after navigation
  - [ ] Copy contents from `kajabi-deployment/components/hero-sections/hero-library.html`
  - [ ] Paste into Code Block
  - [ ] Verify displays correctly (headline, subheadline, supporting points, trust signal)

**Step 3: Context-Aware Access Logic**
- [ ] Review existing Library page structure
- [ ] Identify where to add context-aware messaging
- [ ] Plan access states:
  - [ ] New Visitor: Premium preview + Join CTA
  - [ ] Logged-In Non-Member: Teaser + Upgrade CTA
  - [ ] Snooze Member: Full access (existing)

**Step 4: Access Requirements Messaging**
- [ ] Add prominent callout box near top of page
- [ ] Message: "You must have purchased resources individually OR hold a Snooze Membership to access"
- [ ] Clear, non-judgmental language
- [ ] Link to checkout for non-members
- [ ] Context-aware: Hide for members, show for non-members/visitors

**Step 5: Premium Teaser Content (For Non-Members)**
- [ ] Add Code Block with Library structure overview
- [ ] Show three-tiered learning path:
  - [ ] Foundational (The Method)
  - [ ] Age-Based (all age guides)
  - [ ] Troubleshooting resources
- [ ] Sample resource previews (teaser only)
- [ ] Value proposition messaging
- [ ] Build desire for access

**Step 6: Context-Aware CTAs**
- [ ] Add Code Block with context-aware CTA
- [ ] Copy contents from `components/context-aware-cta.html`
- [ ] **Customize messaging:**
  - [ ] New Visitor: "Join Snooze to Access Full Library"
  - [ ] Logged-In Non-Member: "Upgrade to Snooze to Access Full Library"
  - [ ] Snooze Member: "Browse Library" or hide CTA (they have access)
- [ ] Fallback signposting

**Step 7: Member Access**
- [ ] Verify existing Library structure works for members
- [ ] Ensure all sections are visible to members
- [ ] Direct navigation to resources works
- [ ] Test member experience

**Step 8: Footer**
- [ ] Add new Code Block at the very bottom
- [ ] Copy contents from `footer.html`
- [ ] Paste into Code Block
- [ ] Verify footer displays correctly

**Step 9: Testing & Verification**
- [ ] **Test New Visitor:**
  - [ ] Hero section displays correctly
  - [ ] Premium preview displays
  - [ ] Access requirements messaging shows
  - [ ] "Join Snooze" CTA displays
  - [ ] Library content is teaser/preview only
- [ ] **Test Logged-In Non-Member:**
  - [ ] Hero section displays correctly
  - [ ] Teaser content displays
  - [ ] "Upgrade to Snooze" CTA displays
  - [ ] Purchased products access shown separately (if applicable)
- [ ] **Test Snooze Member:**
  - [ ] Hero section displays correctly
  - [ ] Full Library access works
  - [ ] All sections visible
  - [ ] Direct navigation works
  - [ ] Access requirements messaging hidden
- [ ] Test mobile responsiveness
- [ ] Content review

**Step 10: Publish**
- [ ] Save all changes
- [ ] Preview before publishing
- [ ] Test all access states before publishing
- [ ] Publish and verify live

---

### 5. System Login Page

**Location:** Kajabi Settings → Website → Login page  
**Note:** Limited customization in Kajabi login page - may need to add Code Blocks or customize via Settings

---

### 📋 **PAGE 10: System Login Page**

#### Pre-Deployment Setup

- [ ] **Verify Global JavaScript is added** (may not be available on login page)
- [ ] **Verify CSS is added** (via Custom CSS in Settings)

#### Page Transformation Checklist

**Step 1: Access Kajabi Login Page Settings**
- [ ] Go to Kajabi Settings → Website → Login
- [ ] Review available customization options
- [ ] Note: Some customization may be limited by Kajabi

**Step 2: Hero Section (IF POSSIBLE - Limited by Kajabi)**
- [ ] **Remove Elfsight Google Reviews widget** (if present and editable)
  - [ ] Find and delete Elfsight widget if customizable
  - [ ] CSS automatically hides any remaining widgets
- [ ] **Add hero messaging** (if Code Blocks supported):
  - [ ] Add Code Block with hero content (if supported)
  - [ ] Use messaging from `kajabi-deployment/components/hero-sections/hero-library.html` as reference
  - [ ] OR update page title/messaging via Kajabi Settings
- [ ] **Note:** Login page customization may be limited

**Step 3: Premium Messaging**
- [ ] Update login page messaging (if editable)
- [ ] Message: "Login to access your Snooze resources"
- [ ] Supportive, welcoming tone
- [ ] Premium design matching Snooze branding

**Step 4: Access Requirements Callout**
- [ ] Add callout box to login page (via Code Block if possible)
- [ ] **OR** Add via Custom CSS + HTML injection (if supported)
- [ ] Message: "You must have purchased resources individually OR hold a Snooze Membership to access"
- [ ] Link to Snooze Founding Member Offer (`window.SNOOZE_CHECKOUT_URL`)
- [ ] Non-judgmental, clear language
- [ ] Premium design matching site

**Step 5: Navigation** (If possible)
- [ ] Check if navigation can be added (may be restricted)
- [ ] If possible, add navigation Code Block
- [ ] If not possible, ensure login page links back to home

**Step 6: Design Consistency**
- [ ] Update Custom CSS to match Snooze branding
- [ ] Use Snooze colors (coral #F43357, navy #1F293B)
- [ ] Premium, polished experience
- [ ] Consistent with rest of site

**Step 7: Footer** (If possible)
- [ ] Check if footer can be added (may be restricted)
- [ ] If possible, add footer Code Block
- [ ] If not, ensure minimal footer/links are present

**Step 8: Testing & Verification**
- [ ] Test login functionality
- [ ] Verify hero section/messaging displays (if added)
- [ ] Verify access requirements messaging displays
- [ ] Test checkout link works
- [ ] Verify design consistency
- [ ] Test mobile responsiveness

**Step 9: Publish**
- [ ] Save all changes in Kajabi Settings
- [ ] Preview login page
- [ ] Test login flow
- [ ] Publish and verify live

**Note:** Kajabi login page customization may be limited. Focus on messaging and design consistency where possible.

---

### 6. Checkout URL Standardization (Site-Wide)

**Primary Checkout URL:** `https://joinsnooze.com/offers/6iRarwak/checkout`

**Standardization Method:**
```javascript
// Global JavaScript variable (add to all pages)
window.SNOOZE_CHECKOUT_URL = 'https://joinsnooze.com/offers/6iRarwak/checkout';
```

**Pages to Update:**
- ✅ Landing page (Phase 2 Complete)
- Age-specific pages (4 pages)
- Product/course landing pages (3 pages)
- Library page
- The Snooze Method page
- Navigation component (already done)
- Footer component (already done)

**Implementation:**
- Use JavaScript variable for easy updates
- Ensure all CTAs point to this URL
- Document all entry points in `docs/CHECKOUT-ENTRY-POINTS.md`

---

### 7. Cross-Page Linking Strategy

**Purpose:** Create connected experience where users can easily navigate between related content

**Linking Map:**

**From Landing Page:**
- → Library (preview)
- → The Snooze Method
- → Age-specific pages
- → Product pages
- → About Sally

**From Age-Specific Pages:**
- → Other age-specific pages
- → Library
- → The Snooze Method
- → Checkout (for non-members)

**From Product Pages:**
- → Library
- → The Snooze Method
- → Other product pages
- → Checkout

**From Library:**
- → The Snooze Method (foundational course)
- → Village (community)
- → Product pages (for purchased items)

**From The Snooze Method:**
- → Library (foundational course)
- → Age-specific modules
- → Checkout

**Implementation:**
- Add contextual links within content
- Breadcrumb navigation (optional enhancement)
- "Related Resources" sections
- Clear, intentional linking (not excessive)

---

## Content Standards & Requirements

### Tone of Voice Compliance

**MUST Follow:**
- `docs/strategy/SNOOZE-TONE-OF-VOICE.md` for all content
- Authentic Sally voice (not AI-generated patterns)
- Permission-giving language: "You can" / "You don't have to"
- Practical language: "I would" / "I like to" (not "you should")
- Realistic expectations: "Usually" / "Often" (not "always" / "never")

**NEVER Use:**
- "solution/solutions" → Use "support", "guidance", "help", "troubleshooting", "strategies"
- Em dashes "—" → Use commas, periods, parentheses
- Contrast statements ("It's not about x, it's about y")
- "You should" / "You must" (judgmental)
- "Always" / "Never" (too absolute)

### Content Generation Process (Data-Driven)

**For All New Content:**
1. **Review data-driven priorities first:**
   - Check `docs/content/DATA-DRIVEN-CONTENT-PRIORITIES.md` for urgent needs
   - Reference `docs/content/COMMON-QUESTIONS-BY-AGE.md` for actual parent queries
   - Use `docs/content/AGE-SPECIFIC-INSIGHTS.md` for age-specific insights
2. **Prioritize content based on actual needs:**
   - Lead with highest question volume topics
   - Address "Is this normal?" questions first
   - Use actual parent language from knowledge base
3. Use `scripts/generate_website_content.py` with Gemini 3 Pro
4. Query knowledge base for authentic examples
5. Review against Tone of Voice checklist
6. Refine before deployment

**Command Pattern:**
```bash
cd projects/snooze-website
python3 scripts/generate_website_content.py \
  --content-type "age-page-value-prop" \
  --context "new-visitor" \
  --page "newborn-sleep-help" \
  --output-file "kajabi-deployment/newborn-value-prop.html"
```

**Data Analysis Script:**
```bash
# Re-run analysis when knowledge base updates
python3 scripts/analyze-age-specific-user-needs.py
```

### Pricing Information

**Source of Truth:** `docs/strategy/SNOOZE-PRICING-STRATEGY.md`

**Key Pricing Points:**
- Individual Courses: $117-$129
- Mini Modules: $27-$37
- Snooze Membership: $147/quarter (Launch), $197/quarter (BAU)
- Consultations: $445 Launch / $525 BAU (member rates)

**Always Verify:** Check pricing strategy document before using any prices

---

## Implementation Sequence

### Phase 1: Reusable Components (Foundation) ✅ **COMPLETE**

1. ✅ Create hero sections (replaces Elfsight Google Reviews)
2. ✅ Create context-aware CTA component
3. ✅ Create "What's in Snooze" section template
4. ✅ Create value comparison component
5. ✅ Create age page cross-linking component
6. ✅ Set up global JavaScript variables (checkout URL, etc.)
7. ✅ Create understanding section component template

**Deliverables (Completed):**
- ✅ `kajabi-deployment/components/hero-sections/hero-{page-type}.html` (10 hero sections)
- ✅ `kajabi-deployment/components/hero-sections/README.md` (hero sections documentation)
- ✅ `kajabi-deployment/components/hero-sections/hero-sections.css` (integrated into main CSS)
- ✅ `kajabi-deployment/components/context-aware-cta.html`
- ✅ `kajabi-deployment/components/whats-in-snooze.html`
- ✅ `kajabi-deployment/components/value-comparison.html`
- ✅ `kajabi-deployment/components/age-cross-linking.html`
- ✅ `kajabi-deployment/components/understanding-section.html` (value-first educational component)
- ✅ `kajabi-deployment/js/snooze-globals.js`
- ✅ `kajabi-deployment/components/README.md`

### Phase 2: Age-Specific Pages (4 Pages) 🟡 **IN PROGRESS**

**Status:** Understanding sections created and enhanced with data-driven priorities. Full page transformations pending.

**Priority Order:**
1. Newborn Sleep Help (highest traffic)
2. 5-12 Month Baby Sleep Help (second highest - MOST URGENT based on 512 Q&A pairs)
3. 3-4 Month Baby Sleep Help
4. Toddler Sleep Help

**Completed:**
- ✅ Understanding sections created for all 4 ages with data-driven priorities
- ✅ Content enhanced based on 1,044 Q&A pair analysis
- ✅ Priority ordering updated (early rising leads for 5-12 months, bedtime battles for toddlers, etc.)

**For Each Page (Remaining Tasks):**
1. Add universal navigation
2. Enhance hero with context-aware CTA
3. ✅ Add understanding section (DATA-DRIVEN, value-first) - COMPLETE
4. Add context-aware CTA after understanding section
5. Add "What's in Snooze" section
6. Add value comparison section
7. Add cross-linking section
8. Update all CTAs to use checkout URL variable
9. Review content for Tone of Voice compliance

**Understanding Sections Created:**
- ✅ `kajabi-deployment/age-pages/understanding-section-newborn.html`
- ✅ `kajabi-deployment/age-pages/understanding-section-3-4-month.html`
- ✅ `kajabi-deployment/age-pages/understanding-section-5-12-month.html`
- ✅ `kajabi-deployment/age-pages/understanding-section-toddler.html`

### Phase 3: Product/Course Landing Pages (3 Pages)

**Priority Order:**
1. 5-12 Month Guide (highest value)
2. 3-4 Month Course
3. Newborn Sleep Guide

**For Each Page:**
1. Add universal navigation
2. Enhance hero with membership CTA
3. Add product comparison section
4. Add "What's in Snooze" section
5. Update CTAs to context-aware component
6. Review pricing accuracy

### Phase 4: Core Experience Pages

**A. The Snooze Method Page**
1. Add universal navigation
2. Enhance content with learning path visualization
3. Add context-aware CTAs
4. Link to Library resources
5. Review for positioning alignment

**B. Library Page**
1. Implement context-aware access logic
2. Add premium teaser content for non-members
3. Add access requirements messaging
4. Add universal navigation
5. Test all user states

**C. Login Page**
1. Add premium messaging
2. Add access requirements callout
3. Update design for Snooze branding
4. Link to checkout offer

### Phase 5: Standardization & Polish

**A. Checkout URL Standardization**
1. Audit all pages for checkout links
2. Replace with JavaScript variable
3. Document all entry points
4. Test all CTAs

**B. Cross-Page Linking**
1. Create linking map document
2. Add contextual links across pages
3. Ensure logical navigation flow
4. Test user journeys

**C. Final Review**
1. Content review for Tone of Voice
2. Design consistency check
3. Mobile responsiveness test
4. User journey testing
5. Performance optimization

---

## Success Criteria

### Site-Wide Experience

- [ ] All core pages have consistent navigation and branding
- [ ] Users can navigate between related pages easily
- [ ] Premium experience throughout (no broken or inconsistent pages)
- [ ] Clear value proposition on every page
- [ ] Context-aware CTAs work (or fallback signposting is clear)

### User Journeys

- [ ] New visitor can navigate from any page to checkout
- [ ] Logged-in non-member sees appropriate teasers and upgrade CTAs
- [ ] Snooze member can easily access Library, Village, and resources
- [ ] Age-specific pages connect to related content
- [ ] Product pages clearly show membership value

### Technical Excellence

- [ ] All checkout URLs use standardized variable
- [ ] All pages use reusable components
- [ ] Mobile-responsive across all devices
- [ ] Fast load times
- [ ] Accessible markup

### Content Quality

- [ ] All content follows Tone of Voice guide
- [ ] Pricing information is accurate and consistent
- [ ] Value propositions are clear and compelling
- [ ] No AI-generated patterns or language
- [ ] Authentic Sally voice throughout

---

## Files to Create/Update

### New Component Files ✅ **COMPLETE**
- ✅ `kajabi-deployment/components/context-aware-cta.html`
- ✅ `kajabi-deployment/components/whats-in-snooze.html`
- ✅ `kajabi-deployment/components/value-comparison.html`
- ✅ `kajabi-deployment/components/age-cross-linking.html`
- ✅ `kajabi-deployment/components/understanding-section.html` (value-first educational component template)
- ✅ `kajabi-deployment/js/snooze-globals.js`
- ✅ `kajabi-deployment/components/README.md` (component documentation)

### Understanding Section Files ✅ **COMPLETE** (Data-Driven)
- ✅ `kajabi-deployment/age-pages/understanding-section-newborn.html` (enhanced with data-driven priorities)
- ✅ `kajabi-deployment/age-pages/understanding-section-3-4-month.html` (enhanced with data-driven priorities)
- ✅ `kajabi-deployment/age-pages/understanding-section-5-12-month.html` (enhanced with data-driven priorities - early rising leads)
- ✅ `kajabi-deployment/age-pages/understanding-section-toddler.html` (enhanced with data-driven priorities - bedtime battles lead)

### Updated Page Files
- Age-specific pages (4 HTML files - to be created/updated)
- Product landing pages (3 HTML files - to be created/updated)
- `kajabi-deployment/the-snooze-method.html`
- Library page sections (update existing)
- Login page (instructions for Kajabi settings)

### Hero Section Files ✅ **COMPLETE**
- ✅ `kajabi-deployment/components/hero-sections/hero-{page-type}.html` (10 hero sections - replaces Elfsight Reviews)
- ✅ `kajabi-deployment/components/hero-sections/README.md` (hero sections documentation)
- ✅ CSS integrated in `snooze-unified-theme.css` (website pages) and `snooze-landing-pages.css` (landing pages)
- ✅ `scripts/generate-hero-sections.py` (hero section generation script)

### Documentation Files ✅ **COMPLETE**
- ✅ `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md` (this file - updated with hero sections and data-driven priorities)
- ✅ `docs/content/AGE-SPECIFIC-INSIGHTS.md` (Data-driven insights for each age - enhanced)
- ✅ `docs/content/COMMON-QUESTIONS-BY-AGE.md` (Actual parent queries from 1,044 Q&A pairs - enhanced)
- ✅ `docs/content/DATA-DRIVEN-CONTENT-PRIORITIES.md` (Priority guide based on analysis - NEW)
- ✅ `docs/content/AGE-SPECIFIC-USER-NEEDS-ANALYSIS.md` (Full analysis results - NEW)
- ✅ `docs/content/AGE-SPECIFIC-USER-NEEDS-ANALYSIS.json` (Raw analysis data - NEW)
- ✅ `scripts/analyze-age-specific-user-needs.py` (Analysis script - NEW)
- ✅ `kajabi-deployment/AGE-PAGE-DEPLOYMENT-GUIDE.md` (Step-by-step deployment process - NEW)
- ⏳ `docs/CHECKOUT-ENTRY-POINTS.md` (track all checkout links - TODO)
- ⏳ `docs/INTERNAL-LINKING-MAP.md` (site linking structure - TODO)
- ⏳ `docs/COMPONENT-LIBRARY.md` (reusable components reference - TODO)

---

## Next Steps

1. **Create reusable components** (Phase 1)
2. **Transform age-specific pages** (Phase 2)
3. **Transform product pages** (Phase 3)
4. **Complete core experience pages** (Phase 4)
5. **Standardize and polish** (Phase 5)
6. **Test and validate** (Final phase)

---

**Status:** Ready for implementation  
**Approach:** Holistic, site-wide transformation  
**Focus:** Core pages that make Snooze transformation great  
**Timeline:** Sequential phases, test after each phase

---

**Last Updated:** January 2025

**Recent Updates:**
- ✅ Phase 1 (Reusable Components) - Complete
- ✅ Understanding sections created with data-driven priorities
- ✅ Content analysis complete (1,044 Q&A pairs analyzed)
- ✅ Plan enhanced with data-driven content priorities
- 🟡 Phase 2 (Age-Specific Pages) - Understanding sections complete, full page transformations pending
