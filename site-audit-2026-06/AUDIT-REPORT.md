# Live-Site Audit & Content Inventory: joinsnooze.com

**Date:** June 9, 2026  
**Canonical host:** https://www.joinsnooze.com  
**Pages crawled:** 107 (real-browser render via agent-browser, stealth UA)  
**Outputs:** Supabase `public.page_scrape_data` (107 rows, scraped June 9, 2026) · [Google Sheet](https://docs.google.com/spreadsheets/d/1qxF6PxisjEuFsE7T3gQNrZup9Rw-4geYya4dJmYmxW4) (5 tabs) · this repo (`pages/`, `screenshots/`, `data/`)

## How this run was done

- **Crawler:** `agent-browser` (real Chromium) with a non-headless UA and `--disable-blink-features=AutomationControlled`. This was required: Cloudflare bot-management blocks the default headless UA on `/offers/*` checkout pages. Stealth flags clear the challenge.
- **HTTP status:** taken from the browser's own document response (authoritative), with `curl` as a cross-check. `curl` is false-blocked (403) by Cloudflare on checkout pages where the real browser gets 200, so browser status wins.
- **Fan-out:** 6 parallel shards, each its own isolated browser session (plan Option A). 0 failures across 107 URLs.
- **Kajabi admin metadata:** captured from the authenticated creator account (login + interactive 2FA) by reading each page's server-rendered edit form. 67 records (landing + website pages).
- **Provenance:** live URL mapped to repo source by wrapper-id, distinctive element-id overlap, then path heuristics; drift judged by heading overlap against the source file.

## Headline findings

1. **36 of 36 blog posts carry no structured data.** Not one blog post has `Article`/`BlogPosting` JSON-LD. Across the whole site only 3 schema types appear at all (`VideoObject` x3, `DefinedTermSet` x1, `BreadcrumbList` x1). This is the single biggest AEO/GEO gap: LLM answer engines and AI Overviews lean on `Article` and `FAQPage` schema, and Snooze ships almost none.
2. **61 content pages have no JSON-LD at all**, including the homepage's content body, `/about-sally`, the blog index, and every blog post.
3. **3 pages are built in the repo but return 404 live (not deployed):** `/get-great-baby-sleep`, `/sleep-glossary`, `/snooze-method`. Notably `/sleep-glossary` (the new DefinedTermSet+FAQPage glossary) is 404; the live glossary is `/baby-sleep-glossary`, which has `DefinedTermSet`+`BreadcrumbList` but no `FAQPage`.
4. **40 of 67 Kajabi pages are in draft** (27 published). Admin-side SEO is thin: 31 pages have no social share image, 17 have no SEO title, 25 have no SEO description.
5. **160 images sitewide are missing alt text** (65 pages affected) — an accessibility and image-SEO gap.
6. **Camp Snooze Jan'26 checkout (`/offers/muRW6ug5`) now redirects to `/login`** — the public checkout in `URL-REFERENCE.md` is no longer publicly reachable (camp is past).

## HTTP status summary

| Status | Count |
|---|---|
| 200 | 99 |
| 404 | 8 |

**404s (8):** `/account`, `/cdn-cgi/l/email-protection`, `/get-great-baby-sleep`, `/privacy`, `/sleep-glossary`, `/snooze`, `/snooze-method`, `/snooze-village`

**302 redirects (20):** `/about`, `/downloads/baby-sleep-guide-5-to-12-months`, `/downloads/catnapping-guide`, `/downloads/newborn-sleep-guide-by-the-sleep-concierge`, `/downloads/the-roadmap-to-a-smooth-3-to-2-nap-transition-6-9-month-old-babies`, `/offers/4zHPSRCs`, `/offers/muRW6ug5`, `/offers/z63s9VaR`, `/offers/zAybiDqh`, `/products/3-4-month-baby-sleep-course-by-the-sleep-concierge`, `/products/5-12-month-sleep-training-course`, `/products/communities/v2/snooze`, `/products/communities/v2/snooze/library`, `/products/communities/v2/snooze/resource/9f86d81f-18f7-494e-bad0-60ead4a4fde0`, `/products/newborn-sleep-guide`, `/products/settling-techniques-module-from-snooze-by-the-sleep-concierge`, `/products/the-snooze-method`, `/products/the-snooze-method-5-12-month-sleep`, `/products/toddler-toolkit`, `/snooze-library`

**Login-gated (20):** checkout/member URLs that redirect to `/login` for anonymous visitors (expected for member offers; listed in the Sheet Issues tab).

## AEO / GEO coverage

- Pages missing JSON-LD entirely: **61 / 107**
- Blog posts with `Article` schema: **0 / 36**
- Pages missing `Organization`/`WebSite` schema: **4**
- `llms.txt`: **absent** (https://www.joinsnooze.com/llms.txt returns 302/redirects away, no file present)
- Live glossary `/baby-sleep-glossary` has `DefinedTermSet` + `BreadcrumbList` but **no `FAQPage`**; the repo's newer glossary build (`/sleep-glossary`, carries `FAQPage`) is not deployed.

**Recommended fixes (priority order):** add `Article` + `BlogPosting` schema to the blog template; add `Organization`/`WebSite` schema globally; deploy the `/sleep-glossary` build (or add `FAQPage` to the live glossary); publish an `llms.txt`.

## Code provenance & drift

| Verdict | Count | Meaning |
|---|---|---|
| live_only | 54 | live page with no repo source (CMS-authored: blog posts, thank-you/waitlist pages, account/community) |
| redirect | 23 | URL 301/302-redirects elsewhere (no page of its own) |
| in_sync | 19 | live headings match the repo source |
| no_source_in_repo | 5 | 404 and no repo source (legacy/system URL) |
| drifted | 3 | matched a source but headings diverge (manual check advised) |
| in_repo_not_deployed | 3 | source exists in repo but URL is 404 live |

**Built in repo but not live (404):**
- `/get-great-baby-sleep` -> `kajabi-deployment/pages/landing/cold-traffic-landing-page/cold-traffic-landing-page-blocks.html`
- `/sleep-glossary` -> `kajabi-deployment/pages/website/glossary/bundle/sleep-glossary.html`
- `/snooze-method` -> `kajabi-deployment/pages/website/snooze-method/snooze-method-page-complete.html`

**Drift suspected (low heading overlap; confirm by hand):**
- `/3-4-month-baby-sleep-course-terms-and-conditions` (match ratio 0.0) vs `kajabi-deployment/pages/website/legal/3-4-month-course-terms-and-conditions.html`
- `/blog` (match ratio 0.0) vs `kajabi-deployment/pages/website/blog-index/blog-index.html`
- `/` (match ratio 0.0) vs `archive/website/home/snooze-home-page-blocks.html`

The homepage's only repo copy lives in `archive/website/home/` (not the active `kajabi-deployment/pages/` tree) and has drifted from the live page. Full mapping: `PAGE-SOURCE-MANIFEST.csv` and the Sheet's Code Provenance tab.

## Core Web Vitals outliers

Pages with TTFB > 1000ms or LCP > 2500ms:

| Path | TTFB | LCP |
|---|---|---|
| `/blog/cubo-ai-smart-baby-monitor-review-with-discount` | 2969.7ms | 3032ms |
| `/about-sally` | 1701.7ms | 1752ms |
| `/blog/transitioning-your-baby-from-2-naps-to-1` | 1477.2ms | 2412ms |
| `/blog/my-snoo-review` | 1284.5ms | 1352ms |
| `/offers/W2PyqL2X/checkout` | 1165.7ms | 2360ms |
| `/offers/9DFJSwVD/checkout` | 1131.6ms | 2024ms |

The blog and several checkout pages have the slowest TTFB; the Cubo Ai review post is the worst (~3s).

## Other classic-SEO issues

- Thin content (<150 words): `/links` (62w), `/newsletters/the-snooze-news` (127w), `/free-4-month-regression-masterclass-signup` (41w)
- Missing meta description (content pages): 3
- Missing H1 (content pages): 3
- Missing OG image (content pages): 4

## Reconciliation with URL-REFERENCE.md

- `/about` -> `/` (302): matches the documented "needs redirect" note (now live as a 302).
- `/privacy` (404), `/snooze-village` (404): redirects still not in place; documented as pending.
- `/sleep-glossary` (404): confirmed "built in repo, not yet created in Kajabi."
- `/get-great-baby-sleep` (404): URL-REFERENCE lists it Active, but it is **404 live** and built in repo. Either deploy it or correct the reference.
- `/snooze-method` (404): landing page not launched (matches "references removed from code").
- Camp Snooze Jan'26 checkout now login-gated (was listed working).

## Data locations

- **Supabase:** `public.page_scrape_data`, 107 rows scraped June 9, 2026 (keyed by canonical `www.` URL; prior apex-keyed rows from the 2025 scrape are left intact).
- **Google Sheet:** https://docs.google.com/spreadsheets/d/1qxF6PxisjEuFsE7T3gQNrZup9Rw-4geYya4dJmYmxW4 — tabs: Pages, Kajabi Metadata, Issues, Code Provenance, Summary.
- **Repo:** `pages/<slug>.md` (one per page), `data/<slug>.json` (raw), `PAGE-SOURCE-MANIFEST.csv`, `pages/_global-nav-header-footer.md`. Full rendered HTML (`data/html/`) and screenshots are kept out of git (hooks); screenshots live in `snooze-OS-media-library/snooze-product/site-audit-2026-06/screenshots/`.

## Recommended next steps (prioritised)

**P0 — high impact, low effort**
1. **Add `Article`/`BlogPosting` JSON-LD to the blog template.** One template change fixes all 36 posts. Biggest AEO/GEO lever on the site. Include `headline`, `datePublished`, `author` (Sally Woods), `image`.
2. **Add `Organization` + `WebSite` JSON-LD globally** (theme header). Feeds knowledge-panel and AI-answer attribution. Currently absent everywhere.
3. **Decide the 3 built-but-404 pages:** deploy `/get-great-baby-sleep` (paid-cold-traffic destination — being 404 likely breaks ad spend), `/sleep-glossary` (or add `FAQPage` to the live `/baby-sleep-glossary`), and `/snooze-method` — or correct `URL-REFERENCE.md` if they are intentionally dark.

**P1 — moderate effort**
4. **Publish an `llms.txt`** at the site root pointing AI crawlers to the canonical content (glossary, courses, blog).
5. **Add a social share image** to the 31 Kajabi pages missing one and SEO title/description to the 17/25 missing them (admin-side; see Kajabi Metadata tab). Empty `page_image` is why public OG-image checks fail.
6. **Triage the 40 draft pages** — confirm which should publish, which to delete (e.g. the `-OLD`/`-ARCHIVED` 5-12 month guide drafts).

**P2 — cleanup / hygiene**
7. **Alt text on 160 images** (accessibility + image SEO); worst offenders are blog product reviews.
8. **TTFB outliers:** the Cubo Ai review post (~3s) and `/about-sally` (~1.7s) are slowest — check Kajabi image weight / lazy-loading.
9. **Reconcile `URL-REFERENCE.md`** with the audit addendum (redirects for `/privacy`, `/snooze-village`; status of `/snooze`).
10. **Optional:** prune the stale 2025 apex-keyed rows from `page_scrape_data` if the dual-keying is confusing for downstream analytics.

Methodology and reusable tooling: see `TECHNICAL-NOTES.md` and `RUN-MANIFEST.md`.
