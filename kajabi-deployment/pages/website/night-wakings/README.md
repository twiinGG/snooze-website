# Night Wakings Challenge Page - Deployment Guide

**Status:** Built + verified in repo. NOT yet deployed to Kajabi.
**Date:** July 11, 2026
**Slug:** `/night-wakings`
**Wrapper ID:** `#night-wakings-page`

---

## Overview

The sixth Snooze challenge page, built to match the five existing ones (early-rising, catnapping, sleep-regressions, bedtime-battles, nap-transitions). Closes the home-hero gap where the "Night wakings" pain chip previously fell back to `/library`. The chip now points at `/night-wakings` (`pages/website/home/home-page.html`).

Built from early-rising's **fixed** template (the one with the P0 second-CTA sell-leak already removed), not the pre-fix siblings. Help-not-sell: one primary coral CTA, membership handoff as a card-link. Content is grounded in Sally's own guidance from the live age pages + glossary (no invented clinical claims). Full build record: `scratchpad/night-wakings/` (SHARED-PAGE-SPEC.md, CONTENT-SOURCE-PACK.md, ADVERSARIAL-VERIFY.md, HANDOFF.md).

---

## File Structure

- **`night-wakings-page-complete.html`** - the complete page, single all-in-one file. Wraps in `<div id="night-wakings-page">`. Footer is inline at the bottom inside the wrapper (per the 2026-07-11 all-in-one footer rule), in sync with `global/html/footer.html`.

Section order: breadcrumb (+ BreadcrumbList JSON-LD) > hero (h1 + direct-answer + credential chip + hero image) > "What counts as a night waking to work on" > "Why it happens" > normal-vs-address table (6 rows, incl. GP safety row) > "Night wakings at other ages" (newborn/5-12/toddler, no schedules) > "First steps you can take today" (6-step ol) > secondary image > single CTA (chooser) > "Related sleep help" (4 age hubs + 5 sibling challenges) > membership handoff (card-link) > closing line > inline footer.

---

## Styling (CRITICAL - shared theme scope)

All styling comes from the shared guide-pages system in `global/css/theme-custom-code.css`. There is **no page-specific CSS block and none is needed** - the consolidated GUIDE PAGES `:is()` scope defines every class this page uses (tokens, typography, `.btn`, `.snooze-container`, `.guide-table`, `.step-card`, `.card-link`, `.hero-grid`, etc.).

For the page to render styled, `#night-wakings-page` MUST be present in every shared `:is()` list. This is **already done** in `theme-custom-code.css`: 80 additive references (71 single-line consolidated lists + 8 top-zone Kajabi spacing-reset lists + 1 consolidated token-block selector), zero new declarations. That equals early-rising's coverage minus its redundant legacy per-page block.

If the page renders unstyled after deploy, the theme CSS was not pasted (or `<body id>` was used instead of `<div id>` - Kajabi strips `<body>` and the scoped CSS dies). Verify with `getComputedStyle` on `#night-wakings-page .btn`, not just a line-match.

---

## Images (DONE - live on CDN)

Generated via OpenAI Images API (`gpt-image-2`, 1536x1024, quality high, shared 2026-07 series STYLE_BLOCK), single attempt each, no retries. Web-weight JPEG (<300KB), uploaded to Cloudflare R2 `postiz-media/site-imagery/2026-07/`. Both verified HTTP 200 / image/jpeg:

- Hero: `https://tscmedia.khorus.ai/site-imagery/2026-07/night-wakings-hero.jpg` (183 KB)
- Secondary: `https://tscmedia.khorus.ai/site-imagery/2026-07/night-wakings-secondary.jpg` (171 KB)

PNG originals + gen script retained: `snooze-OS-media-library/page-imagery-2026-07/` and `scratchpad/night-wakings/gen_night_wakings_images.py`.

---

## Primary CTA

ONE primary coral `.btn`: "Find the right starting point" > `/which-is-right-for-us` (the chooser). Night wakings is cross-age, so no single age-specific free module fits; the chooser routes each parent to their stage (bedtime-battles precedent). The membership handoff is a `card-link` > `offers/z63s9VaR`, never a second solid button.

---

## Deployment Instructions

### Step 1: Create the Website Page in Kajabi

The Kajabi API/MCP has no create-website-page path; create the shell in the admin UI (this is how the five siblings were made):

1. Website Pages (`app.kajabi.com/admin/sites/2148291177/website_pages`) > "New Website Page" (the first click sometimes does not open the modal, retry once).
2. Name: "Night Wakings in Babies: Why They Happen and How to Help" > "Customize Page".
3. Neutralise the default "Image" and "Text & Image" lorem-ipsum sections that ship on every new page (blank them, never delete - clear each section's Text block via TinyMCE, then Save).

### Step 2: Add Page Content

1. Paste the entire contents of `night-wakings-page-complete.html` into a single Custom Code block.
2. Use the token-safe scripted paste (`scripts/emit_paste_js.py <file> --target ace`), never a hand-transcribe.

### Step 3: SEO / slug

Website Pages list > row "..." > "Edit details": URL slug `night-wakings`; page description from the file's `<meta name="description">`; Tab after each field; set Published; Save; verify slug/description with a hard reload or curl (do not trust an eval read right after Save).

### Step 4: Theme CSS

Ensure the updated `global/css/theme-custom-code.css` is pasted into Kajabi Settings > Website > Theme > Custom Code. Note: this file also carries pre-existing in-flight edits (T1 contrast on `#home-page .btn`, a `.hero-proof` block) that ship in the same paste - confirm those are intended to go live together.

### Step 5: Home hero chip

The Night wakings chip in `pages/website/home/home-page.html` already points at `/night-wakings` (build-status comment removed). If home is redeployed, this ships with it.

---

## Sally copy gate (2 template-wide flags, optional)

Both inherited from the sibling family, not night-wakings-specific:

1. L3 handoff line "...so the right help is always there when you need it" brushes the banned "support when you need it" (design-eval T4). Byte-identical across siblings; handle in the T4 copy sweep.
2. "Snooze Membership" is capitalised here (Kade ruling 2026-07-11). Reconcile the lowercase/uppercase drift family-wide in the T5 sweep.

---

## Verification Checklist

- [ ] Page renders styled (getComputedStyle on `#night-wakings-page .btn` = coral bg, white text)
- [ ] Both hero images load
- [ ] Exactly one solid coral CTA; membership handoff is a text card-link
- [ ] All 9 related cards link correctly (4 age hubs + 5 challenge siblings)
- [ ] Breadcrumb + BreadcrumbList JSON-LD present
- [ ] Footer renders (inline, matches `global/html/footer.html` whitespace-normalized)
- [ ] Mobile responsive; table scrolls rather than crushing
- [ ] curl the live URL (cache-buster + desktop UA), whitespace-normalize, assert 0 missing lines vs this file
- [ ] Tag `website-v{X.Y.Z}` before deploy

---

## Related Documentation

- Build brief: `docs/projects/geo-seo/4_working/2026-07-11-night-wakings-page-build-brief.md`
- Design eval (defects to avoid): `docs/projects/geo-seo/4_working/2026-07-11-design-eval-synthesis.md`
- Deployment guide: `../../DEPLOYMENT-GUIDE.md`
- Surface code setup: `../../../docs/technical/KAJABI-SURFACE-CODE-SETUP.md`
- Full handoff + build record: `scratchpad/night-wakings/HANDOFF.md`

---

**Last Updated:** July 11, 2026
**Status:** Repo code + images ready; website-page create + paste is a manual Kajabi admin step.
