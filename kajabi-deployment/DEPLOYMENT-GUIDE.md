# Snooze Website - Complete Deployment Guide

**Date:** December 05, 2025  
**Status:** ARCHIVED — historical reference only; unsafe as a current deployment runbook
**Purpose:** Preserve the December 2025 deployment history
**Note:** Landing page CSS has been merged into global CSS using Gemini 3 Pro

> **Do not execute the instructions below.** They reference retired files, routes, checkout slugs
> and Kajabi locations. Current deployment authority is
> [`PASTE-MAP.md`](./PASTE-MAP.md), [`DEPLOYMENT-CHECKLIST.md`](../docs/DEPLOYMENT-CHECKLIST.md)
> and the applicable repository `AGENTS.md`. Where this archived guide conflicts with any of those
> sources, the current sources win. In particular, `pages/navigation.html` does not exist and is
> not a current paste target; A6/A7 in PASTE-MAP govern the native Header and historical custom
> navigation. The body is retained unchanged as historical evidence.

---

## ⭐ Quick Reference

### Essential Files (All Website Pages - Including Landing Page)

**IMPORTANT:** The landing page has been migrated from "Landing Page" type to "Website Page" type. All CSS and JavaScript are now in global theme files.

1. **Global JavaScript:** `global/js/theme-custom-code.js` (single paste; includes currency toggle)
   - Location: Kajabi Settings → Website → Custom JavaScript
   - One-time setup, applies to all website pages (including landing page)
   - Includes: Global variables, user detection, tracking, landing page functionality

2. **Global CSS:** `global/css/snooze-unified-theme.css`
   - Location: Kajabi Settings → Website → Theme → Custom CSS
   - One-time setup, applies to all website pages (including landing page)
   - Includes: Navigation, footer, hero sections, landing page styles, library page styles

3. **Navigation Code Block:** `pages/navigation.html`
   - Add as first Code Block on each website page

4. **Footer Code Block:** `pages/footer.html`
   - Add as last Code Block on each website page

5. **Landing Page HTML Blocks:** `pages/landing-page-blocks.html`
   - Add as Code Blocks on landing page (now a website page)

---

## Understanding Kajabi's Page Types

**IMPORTANT:** The Snooze landing page has been migrated from "Landing Page" type to "Website Page" type. All CSS and JavaScript are now in global theme files.

### Website Pages (All Pages Now)
- Share global Custom CSS (Settings → Theme → Custom CSS)
- Share global Custom JavaScript (Settings → Website → Custom JavaScript)
- CSS/JS added once applies to all website pages
- Examples: Landing page, Age-specific pages, Library, The Snooze Method, Product pages

**Note:** The landing page CSS and JavaScript have been merged into the global theme files. No separate landing page CSS/JS files are needed.

---

## Step 1: One-Time Setup (Website Pages)

### 1.1 Add Global JavaScript

**File:** `global/js/theme-custom-code.js`

**Location:** Kajabi Settings → Website → Custom JavaScript (Theme Custom Code → JS)

**Steps:**
1. Open `kajabi-deployment/global/js/theme-custom-code.js`
2. Copy entire contents
3. Go to Kajabi Settings → Website → Custom JavaScript
4. Paste into the Custom JavaScript field (whole-field overwrite)
5. Save

Do not append other JS files. Currency toggle and globals ship in this one file.

**What This Does:**
- Sets up global JavaScript variables (`window.SNOOZE_CHECKOUT_URL`, etc.)
- Enables user detection (`window.SnoozeUserDetection`)
- Adds Google Tag Manager tracking
- Dual-currency checkout + price rewriting
- Landing page functionality (carousel, FAQ, sticky CTA, etc.)

**Verification:**
- Open browser console on any website page
- Type: `window.SNOOZE_CHECKOUT_URL`
- Should return the membership checkout URL for the active currency (`z63s9VaR` or `vYgCNgJz`)
- Type: `window.__snoozeCurrencyToggle__`
- Should return the currency engine object

### 1.2 Add Global CSS

**File:** `global/css/snooze-unified-theme.css`

**Location:** Kajabi Settings → Website → Theme → Custom CSS

**Steps:**
1. Open `kajabi-deployment/global/css/snooze-unified-theme.css`
2. Copy entire contents
3. Go to Kajabi Settings → Website → Theme
4. Paste into "Custom CSS" field
5. Save

**What This Includes:**
- Navigation & Footer styles
- Hero Section styles (with image positioning)
- Library Page styles
- Landing page styles (hero, carousel, FAQ, sticky CTA, etc.)
- Global Design System (colors, typography, spacing)
- Kajabi header hiding (visual only, keeps DOM for detection)
- Elfsight widget hiding

**Result:** All website pages (including landing page) now have unified styling automatically.

---

## Step 2: Deploy Navigation & Footer (Website Pages)

### 2.1 Add Navigation

**File:** `pages/navigation.html`

**For Each Website Page:**
1. Open page in Kajabi editor
2. Add new Code Block at the very top (first element)
3. Open `kajabi-deployment/pages/navigation.html`
4. Copy entire contents
5. Paste into Code Block
6. Save page

**Verification:**
- Navigation displays at top of page
- Mobile menu toggle works
- Logo displays correctly
- Links work correctly

### 2.2 Add Footer

**File:** `pages/footer.html`

**For Each Website Page:**
1. Open page in Kajabi editor
2. Add new Code Block at the very bottom (last element)
3. Open `kajabi-deployment/pages/footer.html`
4. Copy entire contents
5. Paste into Code Block
6. Save page

**Verification:**
- Footer displays at bottom of page
- 4-column layout displays correctly
- All links work
- Social media icons display
- Mobile responsive

---

## Step 3: Deploy Landing Pages (Now Website Pages)

**IMPORTANT:** All landing pages have been migrated to "Website Page" type. CSS and JavaScript are already in global theme files (Step 1).

### 3.1 Deploy Cold Traffic Landing Page

**File:** `pages/cold-traffic-landing-page/cold-traffic-landing-page-blocks.html`

**Purpose:** Primary destination for paid cold traffic ads (Meta, etc.)

**URL:** `/get-great-baby-sleep`

**SEO Settings:**
- **Title:** "Get Great Baby Sleep | Snooze Membership - Sleep Support & Coaching"
- **Description:** "Get great baby sleep and feel like yourself again. Snooze gives you a clear sleep plan for your baby's age, plus coaching and judgement-free support. Join Snooze membership today."

**Steps:**
1. Create new Website Page in Kajabi
2. Set URL slug to: `get-great-baby-sleep`
3. Set SEO title and description (see above)
4. Add Navigation Code Block (from Step 2.1)
5. Add Code Blocks from `cold-traffic-landing-page-blocks.html` in order:
   - Section 0: Launch Offer Banner
   - Section 0.5: Navigation Header
   - Section 1: Hero
   - Section 2: Leadership Strip
   - Section 3: Mirror Moment
   - Section 4: Week One Roadmap
   - Section 5: Why Snooze Exists
   - Section 5.5: What You Get
   - Section 6: How It Works
   - Section 7: What Snooze Gives You
   - Section 8: Social Proof (Reviews)
   - Section 9: Age Stages
   - Section 10: Pricing
   - Section 10.5: Sticky CTA Bar
   - Section 11: FAQs
   - Section 12: Final CTA
6. Add Footer Code Block (from Step 2.2)
7. Save and publish

**Note:** CSS and JavaScript are already loaded via global theme files (Step 1). No separate CSS/JS needed.

### 3.2 Deploy Other Landing Pages

**File:** `pages/landing-page-blocks.html`

**For Other Landing Pages:**
1. Open landing page in Kajabi editor (ensure it's set as "Website Page" type)
2. Add Code Blocks as needed
3. Open `kajabi-deployment/pages/landing-page-blocks.html`
4. Copy relevant sections
5. Paste into Code Blocks
6. Save page

**Note:** CSS and JavaScript are already loaded via global theme files (Step 1). No separate CSS/JS needed.

---

## Step 4: Deploy Age-Specific Pages

**Complete Guide:** See `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md` for full transformation process.

**Quick Steps:**
1. ✅ Site Header JavaScript (Step 1.1) - Already done
2. ✅ Website Pages CSS (Step 1.2) - Already done
3. ✅ Navigation (Step 2.1) - Add to each age page
4. ✅ Footer (Step 2.2) - Add to each age page
5. Add Hero Section (from `components/hero-sections/`)
6. Add Understanding Section (from `age-pages/`)
7. Add Context-Aware CTA (from `components/`)
8. Add "What's in Snooze" section
9. Add Value Comparison section
10. Add Age Cross-Linking section

**Files:**
- Newborn: `components/hero-sections/hero-newborn.html`
- 3-4 Month: `components/hero-sections/hero-3-4-month.html`
- 5-12 Month: `components/hero-sections/hero-5-12-month.html`
- Toddler: `components/hero-sections/hero-toddler.html`

---

## File Reference

### Global Files (Theme-Level)

| File | Location | Purpose |
|------|----------|---------|
| `global/js/theme-custom-code.js` | Settings → Website → Custom JavaScript | Single global JS paste (variables, tracking, currency toggle, landing-page JS) |
| `global/css/snooze-unified-theme.css` | Settings → Theme → Custom CSS | All website page styles (including landing page) |

### Page HTML Files

| File | Location | Purpose |
|------|----------|---------|
| `pages/navigation.html` | Code Block (top of page) | Navigation component |
| `pages/footer.html` | Code Block (bottom of page) | Footer component |
| `pages/landing-page-blocks.html` | Code Blocks | Landing page HTML sections |
| `pages/about-sally.html` | Code Blocks | About Sally page |
| `pages/the-snooze-method.html` | Code Blocks | The Snooze Method page |
| `pages/blog-index.html` | Code Blocks | Blog index page |

### Reusable Components

| File | Location | Purpose |
|------|----------|---------|
| `components/hero-sections/hero-*.html` | Code Block | Hero sections for age pages |
| `components/context-aware-cta.html` | Code Block | Context-aware CTA component |
| `components/whats-in-snooze.html` | Code Block | "What's in Snooze" section |
| `components/value-comparison.html` | Code Block | Value comparison table |
| `components/age-cross-linking.html` | Code Block | Age page cross-linking |

---

## Troubleshooting

### Navigation/Footer Not Displaying

**Check:**
- [ ] CSS is in correct location (Theme Custom CSS for website pages)
- [ ] Code Blocks are added to page
- [ ] No JavaScript errors in console
- [ ] Page is saved and published

### Styles Not Applying

**Check:**
- [ ] Correct CSS file for page type (website vs landing)
- [ ] CSS is in correct location (Theme vs Page Custom CSS)
- [ ] No conflicting CSS from other sources
- [ ] Browser cache cleared

### User Detection Not Working

**Check:**
- [ ] Site Header JavaScript is added (Step 1.1)
- [ ] Kajabi header is in DOM (check with browser inspector)
- [ ] No JavaScript errors in console
- [ ] Test with different user states (logged out, logged in, member)

### Images Not Displaying

**Check:**
- [ ] Image URLs are correct (see `docs/technical/URL-REFERENCE.md`)
- [ ] Images are hosted on Kajabi CDN
- [ ] No CORS issues
- [ ] Image paths are absolute URLs

---

## Important Notes

### Kajabi Header Handling

The CSS automatically hides the Kajabi header visually while keeping it in the DOM. This ensures:
- Context-aware detection continues to work
- User status detection functions correctly
- No visual conflicts with custom navigation

**No additional configuration needed** - this is handled automatically by the CSS.

### Context-Aware Features

User detection relies on DOM elements in the Kajabi header:
- Login link: `a[href*="/login"]` (logged out indicator)
- User avatar: `img[alt*="User Avatar"]` (logged in indicator)
- Library link: `a[href*="/library"]` (member indicator)

The CSS keeps these elements accessible in the DOM while hiding them visually.

### Checkout URL Standardization

All non-member CTAs should use:
```javascript
window.SNOOZE_CHECKOUT_URL
```

This is set in the Site Header JavaScript and can be updated site-wide by changing one value.

---

## Related Documentation

- **Complete Transformation Plan:** `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md`
- **URL Reference:** `docs/technical/URL-REFERENCE.md` ⭐ CRITICAL
- **Tone of Voice:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **Pricing Strategy:** `docs/strategy/SNOOZE-PRICING-STRATEGY.md`

---

**Last Updated:** Archived August 29, 2026; body last represented the December 2025 process
**Status:** Historical evidence only — do not use for deployment
