# Sleep & Parenting Glossary - Kajabi paste bundle

Split paste pack for the A-Z glossary, for a Kajabi **Custom Code block** (separate HTML / CSS / JS fields). Target page: `/sleep-glossary`.

**Generated, do not hand-edit.** Source of truth is `apps/snooze-website/glossary/terms.json`; rebuild with `node apps/snooze-website/glossary/build-glossary.mjs`. Per-term CTA mapping lives in `build-glossary.mjs` (`CTA`/`DEST`).

## Files → Kajabi Custom Code fields

| File | Paste into | Notes |
|---|---|---|
| `sleep-glossary.html` | **HTML** field | The page body (`<div id="snooze-glossary">…`) plus the `DefinedTermSet` + `BreadcrumbList` JSON-LD. The JSON-LD must stay a `<script type="application/ld+json">`, so it lives here, not in the JS field. |
| `sleep-glossary.css` | **CSS** field | Scoped to `#snooze-glossary`. First two lines `@import` the brand fonts (Playfair Display, Poppins) and Font Awesome. Drop the `@import` lines if the theme already loads them. |
| `sleep-glossary.js` | **JS** field | Behaviour only (search filter, category filter, A-Z nav, accordion toggle, hash-open, member-aware bottom CTA). Raw IIFE, no `<script>` wrapper (the field adds it). |
| `sleep-glossary.combined.html` | (alternative) | Everything inlined (`<style>` + HTML + `<script>` + JSON-LD) for a single HTML-only code area. Use this **or** the three split files, not both. |

## Design

A-Z glossary: terms sorted alphabetically under letter headings, sticky A-Z jump bar, search, and a category **filter** (the 5 categories are tags on each term, not page sections). Each term is an accordion: name + tag + one-line definition always visible; expand for context, related terms and a context-relevant CTA. All content stays in the DOM (toggled by a CSS class), so it is fully SEO/AEO-scrapable. 40 terms.

## Per-term CTAs (all live, published pages)

Each term links to the most relevant page: newborn terms → `/newborn-baby-sleep-help`; fourth trimester → `/newborn-sleep-guide`; 3 to 4 month terms → `/3-4-month-baby-sleep-help` (self-settling → `/3-4-month-baby-sleep-course`); 5 to 12 month terms → `/5-12-month-baby-sleep-help`; nap strike / separation anxiety → `/toddler-sleep-help`; method/hard-problem terms → `/one-on-one-sleep-consultations`; white noise → `/recommended-products`.

## Deploy

1. Rebuild if `terms.json` changed: `node apps/snooze-website/glossary/build-glossary.mjs`.
2. On the `/sleep-glossary` page (landing page `2152090144`, or a fresh page), add a Custom Code block and paste each file into its matching field.
3. Publish from the Kajabi admin (drafts are not publicly visible).
4. Round-trip rule (root `AGENTS.md`): any operator-side edit in Kajabi must come back to this folder before the next deploy.

Validate the rendered page with Google's Rich Results Test (expect `DefinedTermSet` + `BreadcrumbList`).
