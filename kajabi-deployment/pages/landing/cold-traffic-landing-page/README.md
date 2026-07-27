# Cold Traffic Landing Page

**Purpose:** Primary destination for paid cold traffic ads (Meta, etc.)  
**Status:** Source exists; live `/get-great-baby-sleep` was unpublished/404 as of July 2026 (WS-D2). Rebuild or republish before routing ads here.  
**Last Updated:** July 11, 2026

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

## Hero pattern option: Good Inside paid-LP composite (July 2026)

Reference: Good Inside’s paid social LP (`/lp/social/`), not their organic homepage. Those surfaces diverge on purpose.

### What they do on the paid LP
- **Hero right visual is one composite PNG.** Family photo + floating pain chips (“Deeply Feeling Kids”, “Anxiety”, “Defiance”, “Bedtime battles”, “Meltdowns & tantrums”) are pixels in a single image, not separate DOM nodes.
- **Headline/sub stay real HTML** (“Parenting is hard. We make it easier.” + category + founder line) so ad message match and accessibility still work.
- **Topic keywords return as real HTML lower on the page** (stage/topic cards). That recovers crawlable copy the hero image cannot provide.
- Page stays `index,follow` with a self-canonical. Paid LP is still conversion-first; organic is a secondary concern.

### When to use this on `/get-great-baby-sleep`
Use a **baked hero composite** when:
- Traffic is paid (Meta/Google) and the ad creative already shows the same pain labels.
- You want the “orbiting chips around outcome photo” look without Kajabi layout fights.
- You will **repeat the same pain words as real text** below the fold (challenge cards, age stages, or linked chips).

Do **not** use a baked composite on the organic homepage (`home-page.html`). Homepage chips must be HTML (preferably links to `/early-rising`, `/catnapping`, `/sleep-regressions`, `/bedtime-battles`, `/nap-transitions`) for SEO and internal linking.

### Implementation sketch (this LP only)
1. Design one hero asset: outcome photo (or Sally) + 4–6 pain chips as a single WebP/PNG. Keep chip text large and high-contrast.
2. Left column: problem/promise H1, one-line “what Snooze is” + Sally credential, CTA, proof line (4.9 / families). All HTML.
3. Below fold: same pain labels as HTML cards or links (reuse challenge-page slugs). Never leave those words only inside the PNG.
4. Match ad headline language in the H1 (message match > cleverness).
5. Confirm live offer copy (no “live coaching” / 24-7 over-promise) against Sally gate before publish.

Related paid funnel (quiz → sales): `pages/landing/snooze-access-paidads/`. Same rule: composite hero allowed on the sales step; HTML keyword recovery required.

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

