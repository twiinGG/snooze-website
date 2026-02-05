# Store Page Deployment Guide

**Page:** `/store` (Kajabi System Page)
**Created:** January 21, 2026
**Status:** Ready for deployment

---

## Overview

This guide walks through deploying the comprehensive Snooze Store page to Kajabi. The store page showcases all Snooze offerings: membership, courses, consultations, Camp Snooze, and recommended products.

---

## Files Created

1. **HTML:** `store-page.html` - Complete page structure with all 7 sections
2. **CSS:** Added to `snooze-unified-theme.css` (lines 10631+)

---

## Deployment Steps

### Step 1: Update Global CSS

1. Navigate to: **Kajabi Settings → Website → Theme → Custom CSS**
2. The new store page CSS has been added to the end of `snooze-unified-theme.css`
3. Copy the entire updated CSS file and replace the existing Custom CSS in Kajabi
4. Click **Save**

**Note:** The CSS includes:
- `.store-featured-card` - Featured membership and Camp Snooze cards
- `.store-badge` - "BEST VALUE" and "INTENSIVE PROGRAM" badges
- `.store-pricing` - Two-option pricing display
- `.store-pricing-single` - Single pricing display for Camp Snooze
- `.store-features` - Feature list styling
- `.step-icon`, `.step-price`, `.step-member-price` - Consultation card components

### Step 2: Create Store System Page

1. Navigate to: **Kajabi Settings → Website → Pages**
2. Find or create the `/store` system page
3. Click **Edit Page**

### Step 3: Add HTML Content

1. In the page editor, add a **Code Block** component
2. Copy the entire contents of `store-page.html`
3. Paste into the Code Block
4. Position the Code Block as the main page content

### Step 4: Configure Page Settings

**Page Title:** "Store - Snooze"
**Meta Description:** "Explore all Snooze offerings: courses, coaching, consultations, and Camp Snooze. Find the perfect sleep support for your family."
**URL:** `/store`

### Step 5: Test Responsive Design

Test the page at these breakpoints:
- **Mobile:** 320px, 375px, 425px
- **Tablet:** 768px, 1024px
- **Desktop:** 1280px, 1440px, 1920px

Check:
- ✓ Hero section layout
- ✓ Trust bar alignment
- ✓ Featured cards display correctly
- ✓ Course grid (2 columns → 1 column on mobile)
- ✓ Consultation cards (3 columns → 1 column on mobile)
- ✓ All links work
- ✓ Animations play smoothly

### Step 6: Validate Links

Verify all links are correct:

| Link | Destination | Status |
|------|-------------|--------|
| Join Snooze (membership) | `/offers/6iRarwak/checkout` | ✓ |
| Newborn Guide | `/newborn-sleep-guide` | ✓ |
| 3-4 Month Course | `/3-4-month-baby-sleep-course` | ✓ |
| 5-12 Month Course | `/5-12-month-baby-sleep-course` | ✓ |
| Toddler Toolkit | `/toddler-toolkit` | ✓ |
| Consultations | `/one-on-one-sleep-consultations` | ✓ |
| Camp Snooze | `/camp-snooze` | Update when available |
| Recommended Products | `/recommended-products` | ✓ |

---

## Page Structure

### Section 1: Hero
- Tag: "THE SNOOZE STORE"
- H1: "Everything You Need for Better Baby Sleep"
- CTA: "Browse All Offerings" (scroll to #membership)
- Image: Sally Woods portrait

### Section 2: Trust Bar
- 4.9/5 rating
- 2,500+ families helped
- Support when you need it

### Section 3: Snooze Membership (Featured)
- Badge: "BEST VALUE"
- Two pricing options (Quarterly/Annual)
- Feature list
- CTA: "Join Snooze"

### Section 4: Individual Courses
- Grid of 4 courses (Newborn, 3-4 Month, 5-12 Month, Toddler)
- Uses library card pattern
- Each links to individual course page
- Note: "All courses included with Snooze Membership"

### Section 5: 1:1 Consultations
- 3 consultation options
- Signature Consult ($650 / $525 member)
- 45-Minute Follow-up ($390 / $315 member)
- 2-Week Package ($3,500 / $2,800 member)
- Member pricing note below

### Section 6: Camp Snooze (Featured)
- Badge: "INTENSIVE PROGRAM"
- Two pricing options (Regular $690 / Member $390)
- Feature list
- CTA: "Learn More About Camp Snooze"
- Discount code: SNOOZEJAN26

### Section 7: Recommended Products
- Simple section with CTA to recommended products page

---

## Design System Alignment

The store page uses the exact same design system as Home V2 and Library:

**Typography:**
- Headings: Playfair Display (serif)
- Body: Poppins (sans-serif)

**Colors:**
- Coral: #F43357 (CTAs, accents)
- Navy: #1F293B (headings)
- Cream: #FAF7F4 (backgrounds)

**Components:**
- Hero pattern from Home V2
- Trust bar from Home V2
- Library card pattern from Library page
- Step card pattern from Home V2

**Spacing:**
- Mobile: 35-40px padding
- Desktop: 50px padding
- Section gaps: 80px (desktop) / 60px (mobile)

---

## Animations

The page includes subtle fade-in animations:
- Hero content and image: Staggered fade-in
- Featured cards: Fade-in on load
- Course cards: Staggered fade-in (0.1s delay each)
- Consultation cards: Staggered fade-in (0.1s delay each)

All animations use CSS `@keyframes fadeInUp` with `ease-out` timing.

---

## Pricing Information

**Current Pricing (as of Jan 2026):**
- Snooze Quarterly: $129/month
- Snooze Annual: $99/month (save $360/year)
- Signature Consult: $650 ($525 member)
- Follow-up: $390 ($315 member)
- 2-Week Package: $3,500 ($2,800 member)
- Camp Snooze: $690 ($390 member)

**Note:** Update pricing in the HTML file if pricing changes.

---

## Future Enhancements

Consider adding in future iterations:
1. **Featured testimonials** - Add social proof
2. **Comparison table** - Help users choose between offerings
3. **FAQ section** - Address common questions
4. **Live chat integration** - Real-time support
5. **Product comparison** - Side-by-side feature comparison

---

## SEO Optimization

**Title Tag:** "Store - Everything for Better Baby Sleep | Snooze"
**Meta Description:** "Explore all Snooze offerings: courses, coaching, consultations, and Camp Snooze. Find the perfect sleep support for your family."

**Target Keywords:**
- Baby sleep courses
- Baby sleep consultant
- Sleep coaching membership
- Newborn sleep help
- Toddler sleep training

**Internal Links:**
- Home page → Store (add to navigation)
- Course pages → Store (breadcrumb)
- Consultation page → Store

---

## Google Search Console

After deployment:
1. Submit `/store` URL to Google Search Console
2. Request indexing
3. Monitor for sitelink appearance
4. Check mobile usability report

**Expected Result:** Google may show "Store" as a sitelink under the main Snooze listing, improving discoverability of all offerings.

---

## Maintenance

**Monthly:**
- Review pricing accuracy
- Check all links
- Verify image loading
- Test mobile experience

**Quarterly:**
- Update testimonial numbers (families helped)
- Review offering descriptions
- Check for new offerings to add
- Update Camp Snooze discount codes

---

## Troubleshooting

### Issue: CSS not applying
**Solution:** Ensure Custom CSS in Kajabi includes the entire updated `snooze-unified-theme.css` file.

### Issue: Cards not responsive
**Solution:** Check that Code Block is full-width, not constrained by Kajabi container.

### Issue: Images not loading
**Solution:** Verify Kajabi CDN URLs are correct and images are published.

### Issue: Links not working
**Solution:** Check that product pages and offers are published and URLs match.

### Issue: Animations not smooth
**Solution:** Check browser compatibility. Animations use standard CSS `@keyframes` supported in all modern browsers.

---

## Contact

For questions or issues:
- Review: `STORE-PAGE-DESIGN-BRIEF.md`
- CSS Location: `snooze-unified-theme.css` (Section: Store Page, lines 10631+)
- HTML Location: `store-page.html`

---

**Last Updated:** January 21, 2026
**Version:** 1.0
