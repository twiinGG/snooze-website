# joinsnooze.com Uplift Runbook

Working runbook for the high-ROI, no-redesign uplift of joinsnooze.com, following
the June 2026 live-site audit. This is the authoritative plan-plus-status document:
every item carries a status, the artifact it produced, and what to do next.

- **Status key:** DONE (shipped to git working tree) · STAGED (in git, awaiting
  manual Kajabi paste) · TODO · BLOCKED · DEPRIORITISED.
- **Source of truth:** git. Kajabi is the paste/render target. Deploy is manual
  paste into CMS custom-code blocks. Tag `website-vX.Y.Z` before deploy.
- **Binding rules:** `apps/snooze-website/AGENTS.md` (CSS System Init, Kajabi HTML
  patterns) and root `AGENTS.md` §5-7 (no em dashes, no hype, deploy validation).
- **Data inputs:** raw audit at `../site-audit-2026-06/`; live GA4 (property
  401774815); analysis engine at `analysis/build_uplift_analysis.py`.

Progress board: `PROGRESS.md`. Orientation + file manifest: `README.md`.

---

## Part A — Evidence engine (DONE)

`analysis/build_uplift_analysis.py` joins the audit (107 pages, schema gaps,
links, vitals, on-page proof) to live GA4 (traffic, conversions, organic) and
computes `Priority = PageValue x OpportunityGap`. One run regenerates every CSV
plus the two Wave 1 worklists. Methodology and findings: `analysis/README-ANALYSIS.md`.

Run it:

```
cd apps/snooze-website/site-uplift-2026-06/analysis
python3 build_uplift_analysis.py
```

To refresh with new GA4 numbers, replace the `GA4_*` dicts at the top of the script
(pulled 2026-06-09 via the GA4 MCP) and re-run.

**Outputs (`analysis/`):** `page_value_ranking.csv` (master backlog),
`conversion_paths.md`, `organic_pages.csv`, `social_proof_coverage.csv`,
`link_graph_edges.csv`, `link_graph_summary.csv`, `link_hygiene_issues.csv`,
`METADATA-WORKLIST.csv`, `CMS-HYGIENE-WORKLIST.csv`.

**Findings that revised the plan:**
1. The whole blog corpus is the internal-link gap, not just the glossary (most
   posts have 0-2 inbound links, 25-30 outbound). The glossary orphan is real
   (0 external inbound; 54 self-anchors).
2. The 8 money pages already carry their own proof block; that is why they convert.
3. Clarity per-page history in Supabase is unusable (9 URL rows, null/zero);
   behaviour drop-off needs the live Clarity API.

**Data gaps (close before relying on those reads):** Google Search Console not
connected (organic query truth); analytics Supabase facts stale since ~Apr 26;
email channel 60 sessions/yr is a tracking gap not real demand; GA4 90-day pull is
the top ~55 pages, so `sessions_90d=0` with non-zero `sessions_365d` means below
the 90-day cutoff, not literally zero.

---

## Wave 1 — Money leak + hygiene + global schema

| # | Item | Status | Artifact / next action |
|---|---|---|---|
| 1 | `/get-great-baby-sleep` 404 | DEPRIORITISED | No live ad is running (confirmed Jun 9), so no paid-spend leak. The 566 sessions/12mo are organic/direct. When a campaign needs it: add a `#cold-traffic-landing-page` wrapper + System Init CSS block to the source, then deploy. Source: `kajabi-deployment/pages/landing/cold-traffic-landing-page/`. |
| 2 | Global Organization + WebSite JSON-LD | STAGED | `kajabi-deployment/global/html/schema-organization.html`. Paste once into Site Settings > Code (Header). Validate with Rich Results Test + Schema.org, then re-crawl a sample and confirm `jsonld_types` includes Organization/WebSite. |
| 3 | Blog `BlogPosting` JSON-LD (all 36 posts) | STAGED | `kajabi-deployment/global/js/blog-schema.js`. Wrap in `<script>` and paste into Footer Page Scripts. Self-gates to `/blog/<slug>`; reads title/date/image from the DOM, author = Sally Woods. node-checked and DOM-tested (timezone-safe date). |
| 4 | SEO title/description/social-image hygiene | TODO (admin) | `analysis/METADATA-WORKLIST.csv`: 31 pages with gaps, sorted by PageValue (31 missing social image, 25 description, 17 title). The money pages already have full metadata. Edits are in Kajabi admin per page; record intended values back here. |
| 5 | Internal-link domain hygiene | DONE (repo) + TODO (CMS) | 169 non-www `joinsnooze.com` links rewritten to `www.joinsnooze.com` across 34 repo `.html` files. The 202 old-domain links live in blog bodies / CMS (no repo source): `analysis/CMS-HYGIENE-WORKLIST.csv`. Legal-page contact emails on `sleepconcierge.com.au` deliberately excluded. |
| 6 | Stale reference correction | DONE | `docs/technical/URL-REFERENCE.md` glossary entry now points to the live `/baby-sleep-glossary` (old `/sleep-glossary` is a 404; do not target it). |

**Ship order for Wave 1:** 2 and 3 first (biggest compounding AEO lever, one paste
each), then 4 (metadata, top PageValue first), then the CMS hygiene pass (5).

---

## Wave 2 — AEO depth + glossary leverage + nav/IA (TODO)

| # | Item | Effort | Notes |
|---|---|---|---|
| 7 | FAQPage schema on live `/baby-sleep-glossary` | S | Repo build already carries FAQPage; regenerate via `glossary/terms.json` -> `build-glossary.mjs` and ship to the live slug. |
| 8 | Publish `llms.txt` at site root | S | Point AI crawlers to glossary, courses, age pages, blog. Keep the file in `kajabi-deployment/global/`. |
| 9 | Internal-linking ("topical authority") | M | Bigger than the glossary. Add contextual links INTO the glossary AND into high-value blog posts and age pages from related content. Use `analysis/link_graph_summary.csv` (orphans + low-inbound hubs) to target. |
| 10 | Nav/IA: surface the glossary, clarify pathways | M | Glossary is in neither the 11-link header nor 13-link footer. Add it to the footer "Resources". Add age-page -> matching-course -> membership CTAs (today age pages push a generic membership, not the matching course). Keep the header lean. |
| 11 | Decide `/snooze-method` (404 stub) | S | Recommend: leave dark for now, correct the reference; revisit after Waves 1-2. |

---

## Wave 3 — Social proof: discover -> curate -> place (DONE as content)

| # | Item | Status | Artifact |
|---|---|---|---|
| 12 | Discover and inventory all testimonial sources | DONE | `wave-3-social-proof/TESTIMONIAL-INVENTORY.md`. Consented set: 3 named home quotes (Ashwinnie, Kate, Emily), 15 unique Camp wrap-up quotes, 3 Camp videos (Bec K, Bec Karagiorgos, Annabel Yencken, in the media library). |
| 13 | Curate and attribute a web-ready quote set | DONE | `wave-3-social-proof/CURATED-SOCIAL-PROOF.md`. Tagged by product/result, honest attribution (anonymous Camp quotes labelled "Camp Snooze parent"), placement map per the coverage gaps. |
| 14 | Inject proof into high-traffic, low-proof pages | STAGED | `wave-3-social-proof/injection-blocks.html`. Ready-to-paste `transformation-reviews` sections for about-sally, the 3 age-help pages, and contact, reusing the exact live home-page markup. Base styles are global in the theme CSS (not `#home-page`-scoped), so no new design. Paste above each page's final CTA, validate render. |

**Consent guardrail:** the Notion TSC CRM is contact/consult records with no consent
field. Do not lift names or results from it onto public pages. Use it only to
identify clients to ASK.

**Coverage gap (highest-leverage next collection task):** no age- or course-specific
NAMED testimonials exist (nothing for the 5-12 or 3-4 course by name). Collect via
Google reviews (harvest from Google Business Profile) and consent-cleared consult
quotes.

---

## Wave 4 — Cleanup / long tail (TODO)

| # | Item | Effort | Notes |
|---|---|---|---|
| 15 | Alt text on ~160 images (65 pages; worst: blog product reviews) | M | Accessibility + image SEO. See `images_missing_alt` in `page_value_ranking.csv`. |
| 16 | CWV outliers: Cubo Ai blog post (~3s TTFB, top organic page) + `/about-sally` | S | Check Kajabi image weight / lazy-load. |
| 17 | Triage ~40 draft Kajabi pages | M | Publish, delete (`-OLD`/`-ARCHIVED`), or leave. |
| 18 | Homepage source reconciliation | S | Live home drifted from the only repo copy (`archive/website/home/...`); re-capture canonical source into `kajabi-deployment/`. |
| 19 | Optional: prune stale 2025 apex-keyed rows from `page_scrape_data` | S | Low. |

---

## Immediate next steps (recommended order)

1. **Deploy Wave 1 #2 and #3** (schema) by paste; validate; re-crawl a sample.
2. **Work the metadata worklist** (#4) top-down by PageValue in Kajabi admin.
3. **Place the Wave 3 injection blocks** (#14) on about-sally + the age-help pages.
4. **Start the testimonial-collection gap:** harvest Google reviews, request
   consented course/age-specific quotes via the CRM.
5. **Wave 2** internal-linking and nav/IA (uses `link_graph_summary.csv`).
6. Connect Google Search Console and backfill the stale analytics facts so the
   engine can read recent history, not just live GA4.

## Verification checklist (per deploy)
- Schema: Google Rich Results Test + Schema.org validator pass; re-crawl
  (`crawl_page.py --force`) shows the new `jsonld_types`.
- Links: re-parse `links.list`; zero `sleepconcierge.com.au` / non-www internal links.
- Social proof: each target renders the review block with existing CSS, no layout break.
- Deploy discipline: run placeholder + env validators and `docs/DEPLOYMENT-CHECKLIST.md`;
  commit; tag `website-vX.Y.Z`; publish via `scripts/publish-snooze-website.sh`.
  Never bypass pre-commit hooks.
