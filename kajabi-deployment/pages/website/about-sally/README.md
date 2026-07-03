# About Sally Page - Deployment Guide

**Version:** 2.0 (New Style)  
**Date:** January 2025  
**Status:** Ready for Deployment

---

## Overview

The About Sally page has been redesigned in the new Snooze style with separate section files, updated copy aligned with strategy and tone of voice, and functional links throughout.

---

## File Structure

The About Sally page consists of 5 separate section files:

1. **section-01-hero.html** - Hero section with Sally's photo and introduction
2. **section-02-story.html** - Why I created Snooze (Sally's story and mission)
3. **section-03-philosophy.html** - Sally's core philosophy and beliefs
4. **section-04-credentials.html** - Credentials, experience, and expertise
5. **section-05-cta.html** - Context-aware CTA section

---

## Deployment Instructions

### Step 1: Create About Sally Page in Kajabi

1. Go to Kajabi → Website → Pages
2. Create a new Website Page (not Landing Page)
3. Set URL to: `/about-sally`
4. Set page title: "About Sally | Snooze"
5. Set meta description: "Meet Sally Woods, certified sleep consultant and former paediatric nurse behind Snooze. Learn about The Snooze Method and evidence-based sleep help for tired parents."

### Step 2: Add Navigation Component

1. Add Code Block at the very top of the page
2. Copy contents from: `kajabi-deployment/pages/navigation.html`
3. Paste into Code Block
4. Save

### Step 3: Add Page Content

**Option A: Complete Unified File (Recommended)**
1. Open `about-sally-complete.html`
2. Copy entire contents
3. Add as single Code Block in Kajabi
4. **Action Required:** Replace `[certification body]` in credentials section with actual certification body name

**Option B: Separate Section Files**
Add each section as a separate Code Block in order:

1. **Section 1: Hero**
   - File: `section-01-hero.html`
   - **Status:** ✅ Image URL already set (Sally's primary headshot from Kajabi CDN)

2. **Section 2: Story**
   - File: `section-02-story.html`
   - No placeholders - ready to deploy

3. **Section 3: Philosophy**
   - File: `section-03-philosophy.html`
   - No placeholders - ready to deploy

4. **Section 4: Credentials**
   - File: `section-04-credentials.html`
   - **Action Required:** Replace `[certification body]` with actual certification body name

5. **Section 5: CTA**
   - File: `section-05-cta.html`
   - No placeholders - ready to deploy

### Step 4: Add Footer Component (If Using Separate Sections)

**Note:** If using `about-sally-complete.html`, footer is already included.

**If using separate sections:**
1. Add Code Block at the very bottom of the page
2. Copy contents from: `kajabi-deployment/pages/footer.html`
3. Paste into Code Block
4. Save

### Step 5: Verify Global CSS/JS

Ensure global theme files are deployed:
- **CSS:** `kajabi-deployment/global/css/snooze-unified-theme.css` → Kajabi Settings → Website → Theme → Custom CSS
- **JS:** `kajabi-deployment/global/js/snooze-globals.js` → Kajabi Settings → Website → Custom JavaScript

---

## Styling

All styling is handled by the global CSS file (`snooze-unified-theme.css`). The About Sally page uses:

- `.about-sally-hero` - Hero section styles
- `.about-sally-story` - Story section styles
- `.about-sally-philosophy` - Philosophy section styles
- `.about-sally-credentials` - Credentials section styles
- `.about-sally-cta` - CTA section styles

**Note:** If styles don't appear, verify the global CSS is deployed (Step 5 above).

---

## Content Updates

### Copy Alignment

All copy has been updated to align with:
- **Tone of Voice:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **Positioning:** `docs/strategy/SNOOZE-POSITIONING-FRAMEWORK.md`
- **Master Strategy:** `docs/strategy/SNOOZE-MASTER-STRATEGY.md`

### Key Changes from Old Version

1. **More conversational tone** - Uses "I" statements and personal voice
2. **Removed "coming soon" references** - Updated to reflect current state
3. **Added philosophy section** - Expanded on core beliefs
4. **Context-aware CTA** - Adapts based on user status
5. **Functional links** - All links point to correct URLs

---

## Placeholders to Replace

Before deploying, replace these placeholders:

1. **Section 4 (Credentials):**
   - `[certification body]` → Replace with actual certification body name

**Note:** Section 1 (Hero) image URL is already set with Sally's primary headshot from Kajabi CDN.

---

## Testing Checklist

After deployment, verify:

- [ ] Navigation displays correctly
- [ ] All sections render properly
- [ ] Sally photo displays (if uploaded)
- [ ] Philosophy cards display in grid layout
- [ ] Credentials list displays correctly
- [ ] CTA adapts based on user status (test as logged out, logged in, member)
- [ ] Footer displays correctly
- [ ] Mobile responsive (test on phone)
- [ ] All links work correctly
- [ ] Page loads quickly

---

## Links Reference

All links use the following URLs (set in global JavaScript):

- **Checkout:** `https://joinsnooze.com/offers/6iRarwak/checkout`
- **Library:** `https://joinsnooze.com/products/communities/v2/snooze/library`
- **Login:** `/login`

These are managed in `snooze-globals.js` and can be updated site-wide by changing the global variables.

---

## Related Documentation

- **Deployment Guide:** `kajabi-deployment/DEPLOYMENT-GUIDE.md`
- **Tone of Voice:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **Positioning:** `docs/strategy/SNOOZE-POSITIONING-FRAMEWORK.md`
- **Master Strategy:** `docs/strategy/SNOOZE-MASTER-STRATEGY.md`

---

**Last Updated:** January 2025  
**Status:** Ready for Deployment

---

## Maintenance Log

### June 29, 2026: Service-model copy sweep + comment strip

- **Copy rewrite (CTA section):** "live coaching with me" rewritten to "live sessions with me and the Snooze Specialists". The membership is self-serve first plus a coaching model; live sessions with the Snooze Specialists are real, but live coaching with Sally as an on-demand included benefit is not.
- **Copy rewrite (signposting CTA JS string):** upgrade note "Unlock full access to Library, Village, and Coaching" rewritten to "...Library, Village, and live sessions".
- **Comments stripped:** all HTML comments and inline JS `//` comments removed from `about-sally.html` per the Kajabi deployable-code convention (custom-code blocks should ship comment-free). The metadata those comments carried is captured here.

### Metadata relocated from stripped in-file comments

- File was internally labelled "About Sally Page, Version 3.0 (Consolidated)", originally dated January 2025. Hero section was "Version 3.0 (Trust Section Style)" matching the home page trust/founder section layout. Sections 2 to 5 were "Version 2.0 (New Style)".
- Section 5 CTA is context-aware: a `<script>` populates `#about-sally-cta-location` based on `window.SnoozeUserDetection.getUserStatus()` (states: snooze-member, logged-in-non-member, new-visitor, signposting fallback).

### Checkout URL note (supersedes Links Reference above)

The in-file CTA script hardcodes a checkout fallback of `https://joinsnooze.com/offers/z63s9VaR/checkout` (canonical Snooze Access USD offer). The "Links Reference" section above still cites the retired `6iRarwak` slug; treat the in-file `z63s9VaR` value as current.



---

## Copy-uplift session 2 change log (2026-07-03, CU-001 Batch 1)

Applied to `about-sally.html` (repo only; NOT yet pasted to Kajabi):

- D-43: philosophy card rewritten to Sally's approved positive framing (sustainable, staggered changes); "leaving them to cry" denial removed, em dash removed.
- D-44: nurse FAQ answer updated to "former registered paediatric nurse... currently on a non-practising registration"; NEW FAQ item "What are Sally's qualifications?" with the FINAL credential standard including the Bachelor of Nursing from Australian Catholic University. Both mirrored in the FAQPage JSON-LD.
- D-44: help-with answer drops "gentle" and "The Snooze Method" ("using evidence-based methods through the Snooze membership"), visible + schema.
- Person JSON-LD: hasCredential now an array adding the Bachelor of Nursing (Australian Catholic University) alongside the sleep-consultant certification (GEO item 1a).
- D-42 exception preserved: the "Why I Created Snooze" Method-as-philosophy passage is untouched by design.
- P6 bridge form on the credentials card ("the methods in Snooze"); CTA rewritten to the age-based + Snooze Specialists form (no Method, no solo-Sally coaching claim).
- P18 "specialised training"; all 6 em dashes replaced with sentence breaks/commas.
- Verified: tag balance unchanged, JSON-LD parses, zero kill-list residue ("gentle vs. harsh debate" is category contrast, permitted).
