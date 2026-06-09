# Alt-text worklist (Wave 4 #21)

**Date:** June 9, 2026
**Source:** `analysis/page_value_ranking.csv`, column `images_missing_alt`.
**Totals:** 159 images missing alt text across 76 pages (the audit headline rounds this to ~160 / 65 pages; the CSV adds checkout pages, hence the higher page count).

**Deployment note:** the highest-value pages here are **website** pages on the legacy "Encore" theme `2156873377`, which is **not MCP-editable**. Alt text on these is set per-image in the Kajabi page editor (admin-gated, manual). Blog post images are CMS-authored (also admin). Plan the copy here; the actual fix is a manual admin pass. Do not deploy from this repo.

**Why this matters:** alt text is both accessibility (screen readers) and image SEO (Google Images, and an AEO signal). Empty `alt` on hero and product images is the highest-leverage fix because those images carry the page's primary subject.

## Do not fabricate

This worklist does not invent alt text for specific images. The crawl records counts, not image contents. For each page, follow the **pattern** below and write alt text from the actual image while editing in Kajabi. Alt text describes what the image shows, in plain language, no keyword stuffing, no "image of".

## Worst pages by PageValue (fix these first)

These are the missing-alt pages with the highest PageValue (commercial + traffic weight). Top of the list = top priority.

| PageValue | Missing alt | Type | Path |
|---|---|---|---|
| 88.0 | 1 | course | `/5-12-month-baby-sleep-course` |
| 70.3 | 1 | consultation | `/one-on-one-sleep-consultations` |
| 64.0 | 1 | camp | `/camp-snooze-sleep-coaching` |
| 55.2 | 2 | home | `/` |
| 54.5 | 1 | course | `/3-4-month-baby-sleep-course` |
| 49.6 | 1 | age_help | `/toddler-toolkit` |
| 42.3 | 1 | other | `/contact` |
| 40.2 | 3 | age_help | `/4-month-sleep-regression-survival-guide` |
| 39.6 | 1 | lead_magnet | `/newborn-sleep-guide` |
| 37.7 | 2 | blog | `/blog/mystery-of-missing-third-nap-early-rising` |
| 37.1 | 1 | other | `/about-sally` |
| 36.5 | 4 | blog | `/blog` (index) |
| 35.5 | 1 | age_help | `/toddler-sleep-help` |
| 34.5 | 4 | other | `/author/sally-woods` |
| 32.6 | 5 | blog | `/blog/cubo-ai-smart-baby-monitor-review-with-discount` |

## Worst pages by raw image count (highest manual effort)

| Missing alt | PageValue | Type | Path |
|---|---|---|---|
| 9 | 30.5 | blog | `/blog/babyzen-yoyo-travel-stroller-review...` |
| 5 | 32.6 | blog | `/blog/cubo-ai-smart-baby-monitor-review-with-discount` |
| 4 | 36.5 | blog | `/blog` (index) |
| 4 | 34.5 | other | `/author/sally-woods` |
| 4 | 7.8 | blog | `/blog/dressing-baby-for-bedtime` |
| 4 | 6.7 | other | `/3-4-month-masterclass-replay` |
| 4 | 20.0 | checkout | `/offers/4zhpsrcs` |
| 3 | 40.2 | age_help | `/4-month-sleep-regression-survival-guide` |
| 3 | 30.3 | blog | `/blog/my-honest-snoo-experience-and-review` |

The product-review blog posts (BabyZen stroller, Cubo Ai monitor, Snoo) are both high-count and high-value: they carry product photos with no alt, which is exactly the image-SEO opportunity. The audit calls these out as the worst offenders.

## Recommended alt-text pattern by page type

| Page type | Image role | Alt-text approach |
|---|---|---|
| **home / age_help / course / camp / lead_magnet** (hero images) | Hero photo of a baby/parent | Describe the subject and the calm-sleep context plainly, e.g. for a 5-12 month hero, something like "Baby sleeping calmly in a cot". One short clause. The named hero images are in URL-REFERENCE.md "Hero Section Images". |
| **course / camp** (badge, logo, instructor) | Brand badge, Sally photo, course mockup | Name the thing: "Snooze logo", "Sally Woods, founder of Snooze", "5-12 month course workbook cover". |
| **blog product reviews** (Cubo Ai, BabyZen, Snoo, Glow Dreaming) | Product photos | Name the product and what it is: "Cubo Ai Plus baby monitor on a stand", "BabyZen YOYO stroller folded". This is the strongest image-SEO win on the site. No discount-code stuffing in alt. |
| **blog** (general illustrative) | Stock/illustrative photo | Describe the scene relevant to the post topic: "Parent settling a baby for a nap". Skip decorative dividers (use empty `alt=""` so screen readers ignore them). |
| **author / about** (`/author/sally-woods`, `/about-sally`) | Portrait + brand marks | "Sally Woods" for the portrait; "Snooze by The Sleep Concierge logo" for marks. |
| **contact / other** | Map, icons, photos | Functional description: "The Sleep Concierge contact photo"; decorative icons get `alt=""`. |
| **checkout / offers** | Product mockups, trust badges | Name the offer/product: "Snooze membership preview"; trust badges get their literal text, e.g. "Secure checkout". Lower priority (member-gated, lower SEO value). |

## Suggested execution order

1. **Money + traffic pages, 1-2 images each (quick wins):** `/5-12-month-baby-sleep-course`, `/one-on-one-sleep-consultations`, `/camp-snooze-sleep-coaching`, `/`, `/3-4-month-baby-sleep-course`, `/toddler-toolkit`, `/contact`, `/newborn-sleep-guide`, `/about-sally`. ~12 images, biggest value-per-fix.
2. **Product-review blog posts (image-SEO):** BabyZen (9), Cubo Ai (5), Snoo (3), Glow Dreaming (3), Harvey Karp (2). ~22 images.
3. **Blog index + author + age-help:** `/blog` (4), `/author/sally-woods` (4), `/4-month-sleep-regression-survival-guide` (3), `/toddler-sleep-help` (1). 
4. **Long tail:** remaining ~60 blog/other pages at 1-3 images each, mostly low PageValue (~7.8). Batch during a single admin session.

Full per-page list with counts is in `analysis/page_value_ranking.csv` (filter `images_missing_alt > 0`, sort by `PageValue`).
