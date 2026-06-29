# Cold Traffic Landing Page

**Purpose:** Primary destination for paid cold traffic ads (Meta, etc.)  
**Status:** ✅ Ready for Deployment  
**Last Updated:** January 2025

---

## Page Details

### URL & SEO
- **URL Slug:** `/get-great-baby-sleep`
- **Full URL:** `https://joinsnooze.com/get-great-baby-sleep`
- **SEO Title:** "Get Great Baby Sleep | Snooze Membership - Sleep Support & Coaching"
- **SEO Description:** "Get great baby sleep and feel like yourself again. Snooze gives you a clear sleep plan for your baby's age, plus coaching and judgement-free support. Join Snooze membership today."

### Purpose
This landing page is designed specifically for **cold traffic conversion** from paid ads. It leads with:
- Identity and emotional connection
- Belief and safety building
- Then introduces Snooze as the solution
- Finally presents pricing (after emotional commitment)

**Use Case:** Route emotion-first Meta ads to this page for optimal conversion.

---

## Deployment

### File Location
`projects/snooze-website/kajabi-deployment/pages/cold-traffic-landing-page/cold-traffic-landing-page-blocks.html`

### Deployment Steps
See main `DEPLOYMENT-GUIDE.md` for complete instructions.

**Quick Steps:**
1. Create new Website Page in Kajabi
2. Set URL slug: `get-great-baby-sleep`
3. Set SEO title and description (see above)
4. Add Navigation Code Block (first)
5. Add Code Blocks from `cold-traffic-landing-page-blocks.html` in order
6. Add Footer Code Block (last)
7. Save and publish

### Dependencies
- ✅ Global CSS: `global/css/snooze-unified-theme.css` (already deployed)
- ✅ Global JS: `global/js/snooze-globals.js` (already deployed)
- ✅ Navigation: `pages/navigation.html`
- ✅ Footer: `pages/footer.html`

---

## Page Structure

The page includes these sections (in order):
1. **Section 0:** Launch Offer Banner
2. **Section 0.5:** Navigation Header
3. **Section 1:** Hero ("Get great baby sleep. Feel like yourself again.")
4. **Section 2:** Leadership Strip ("Start here - takes 10 minutes")
5. **Section 3:** Mirror Moment
6. **Section 4:** Week One Roadmap
7. **Section 5:** Why Snooze Exists (with Sally's photo)
8. **Section 5.5:** What You Get
9. **Section 6:** How It Works
10. **Section 7:** What Snooze Gives You
11. **Section 8:** Social Proof (Reviews)
12. **Section 9:** Age Stages
13. **Section 10:** Pricing
14. **Section 10.5:** Sticky CTA Bar
15. **Section 11:** FAQs
16. **Section 12:** Final CTA

---

## Key Features

- **Mobile-First Design:** Optimized for mobile viewing
- **Emotion-First Copy:** Leads with identity and belief before product
- **Clear Path:** "Start here" section provides immediate direction
- **Social Proof:** Reviews focused on emotional transformation
- **Age-Specific Content:** Interactive age stages section
- **Sticky CTA:** Mobile-friendly sticky CTA bar

---

## Related Documentation

- **Deployment Guide:** `../DEPLOYMENT-GUIDE.md`
- **URL Reference:** `../../docs/technical/URL-REFERENCE.md`
- **Strategy Brief:** `../../../docs/reference/LandingPageEvalBrief.md`

---

## Deployment Notes (relocated from inline HTML comments)

These notes were previously stored as comments inside `cold-traffic-landing-page-blocks.html`. They are kept here so the deployable HTML stays comment-free.

### File type and globals
- Built for the Kajabi **Website Page** type using the unified theme.
- Global CSS: `../global/css/snooze-unified-theme.css`
- Global JS: `../global/js/snooze-globals.js`
- In the unified theme, plain `.navbar` is hidden unless it also has `.snooze-custom-navbar`.

### Code block deployment
- Copy each section of the blocks file into a separate Kajabi Code Block, in order.
- Section order (top to bottom): Launch Offer Banner, Hero, Mirror Moment, Week One Roadmap, Why Snooze Exists (with Sally photo + scoped `<style>`), Social Proof, Age Stages, Pricing, Founding Member Hero, Sticky CTA Bar (with scoped `<script>`), FAQs, Final CTA.

### Pricing flags (HUMAN REVIEW required)
All on-page prices are **NON-CANONICAL founding/launch prices**. AUD is computed as USD x1.51. Reconcile against the canonical Snooze Access tiers before any reuse outside this launch:

| Location | On-page price (USD / AUD) | Note |
|----------|---------------------------|------|
| Newborn Sleep Guide (separately) | $87 / A$131 | Not a canonical Snooze Access tier |
| Quarterly Membership | $147 / A$222 | Canonical Access quarterly is $197 / A$299 |
| Annual Membership | $490 / A$740 | Canonical Access yearly is $657 / A$997 |
| Founding Member Hero (annual) | $490 / A$740 | Locked-in founding rate |

---

**Last Updated:** January 2025

