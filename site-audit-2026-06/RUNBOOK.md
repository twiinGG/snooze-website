# joinsnooze.com Uplift Runbook

Working runbook for the high-ROI, no-redesign uplift of joinsnooze.com, following
the June 2026 live-site audit. This is the authoritative plan-plus-status document:
every item carries a status, the artifact it produced, and what to do next.

- **Status key:** DONE-REPO (in git) · LIVE (verified on the live Kajabi site) · STAGED
  (in git, awaiting manual Kajabi paste / draft->live) · TODO · BLOCKED · DEPRIORITISED.
- **Git is not live.** Kajabi is the render target; deploy is manual paste into CMS
  custom-code blocks and/or switching a page from draft to live. An item is only truly
  done when **verified live** (load the real URL, confirm it renders / the schema is
  present). Always verify after deploy; do not mark LIVE off a git commit alone.
- **Source of truth:** git. Tag `website-vX.Y.Z` before deploy.
- **Binding rules:** `apps/snooze-website/AGENTS.md` (CSS System Init, Kajabi HTML
  patterns) and root `AGENTS.md` §5-7 (no em dashes, no hype, deploy validation).
- **Data inputs:** raw audit in this folder (`data/`, `AUDIT-REPORT.md`); live GA4 (property
  401774815); analysis engine at `analysis/build_uplift_analysis.py`.

Orientation + file manifest: `README.md`.

## Current status (last updated 2026-06-09)

| Area | Status |
|---|---|
| Part A evidence engine | DONE |
| Wave 1 #2–3 global schema | DONE-REPO + pasted to Header Page Scripts — **VERIFY LIVE** (validator.schema.org on a live blog post + homepage) |
| Wave 1 #5 non-www link hygiene | DONE (repo) |
| Wave 1 #6 glossary URL ref | DONE |
| Wave 3 testimonial **collection** | **DONE (2026-06-09)** — corpus 148→351 Notion rows; synced to Supabase; curated set regenerated |
| Wave 3 #14/#18 site injection | TODO — regenerate injection blocks from curated set, paste to target pages, verify live |
| Wave 3 #20 collated reviews page | DONE-REPO, **NOT LIVE** — Kajabi page not created yet (needs SEO metadata, see deploy spec below) |
| Project consolidation | DONE (2026-06-09) — `site-audit-2026-06` + `site-uplift-2026-06` merged into this folder |
| Wave 1 #4 SEO metadata catalogue | DONE — `analysis/seo-metadata.csv` + Supabase `page_seo` (107 pages, current + recommended_*); fixes TODO |
| Wave 1 #4 metadata fixes, #5b CMS links, Wave 2 | TODO |

**Changelog**
- 2026-06-09 (consolidation): merged the two sibling folders into one. `site-uplift-2026-06/{analysis, wave-3-social-proof, RUNBOOK, README, PROGRESS}` moved into `site-audit-2026-06/`; old folder removed; references updated; analysis engine re-verified from the new location. Wave 3 member-data artifacts (raw transcripts, harvest manifests, `CURATED-SOCIAL-PROOF.md`) are now **gitignored** so they never reach the external VSP mirror (`publish-snooze-website.sh` force-publishes the whole `apps/snooze-website` prefix). Renamed Notion Product `Snooze Social` → `The Snooze Membership` (21 rows re-tagged). Rebuilt the reviews page as a proper site page (`kajabi-deployment/pages/website/reviews-page/src/reviews-page.html`, styles in the universal theme `#reviews-page` block) per the existing dev brief; verified Google review coverage complete (162/162 in Notion).
- 2026-06-09 (collection sprint): Wave 3 corpus expanded 148→351 Notion rows. Audit → `wave-3-social-proof/COLLECTION-AUDIT.md` (existing corpus was 148, not ~18; 137 Google reviews already harvested but never synced). 137 reviews backfilled Permission=Public; 28 new reviews harvested via Apify (place `ChIJ909XQaRD1moRMeU0Gdc7_GU`, delta after 2025-08-18); 166 strong Camp transcript quotes extracted from 42 roll-call transcripts (Sonnet fan-out) → Notion (Camp Call, Internal, unapproved); 9 DM/community screenshots ingested from `media_asset_catalog` (Google Photos→Drive sync). First-ever Supabase sync 0→340 rows + `country` column (migration 003). `CURATED-SOCIAL-PROOF.md` regenerated. GBP owner API blocked at Google quota gate (see audit). Camp + DM rows await Sally consent before publish. **Camp routing corrected:** restriction is per-quote (a quote that *names* Camp can't prove other products as-is); universal sleep-win quotes flow anywhere, camp-naming quotes can be verbatim-trimmed (curated Set 1b). Added a collated **Reviews page** draft (`reviews-page.html`, #20) modelled on Taking Cara Babies — by product/service, TCB-style names + baby age, 164 verified reviews.
- 2026-06-09 (pm): Schema #2 + #3 live. Blog script fix (`<script>` wrapper). Kajabi has no site-wide footer-scripts field; both blocks go in Header Page Scripts. Testimonial collection reprioritised ahead of `injection-blocks.html` paste.
- 2026-06-09: Part A engine, non-www hygiene, Wave 3 inventory draft, project created.

## Next steps (prioritised)

1. **Create + publish the `/reviews` Kajabi page (#20)** — the page is built in the repo but
   NOT live. Follow the "Reviews page deploy spec" below (SEO metadata included): make sure the
   `#reviews-page` theme-CSS block is live, create the page at slug `reviews`, paste the HTML,
   set the SEO title/description, publish, link it from the hero reviews badge, then **verify
   live** at `https://www.joinsnooze.com/reviews`.
2. **Mark up Camp/DM rows + regenerate + paste injection blocks (#18)** — flip
   `Publish Approved = true` on the Camp/DM rows you want to use (`transcript-extractions/_SUMMARY.md`
   + the 9 screenshot rows), regenerate `injection-blocks.html` from the curated set (universal +
   trimmed-camp), paste to about-sally / 3 age-help pages / contact, then verify each live.
3. **Verify the Wave 1 schema is actually live (#2/#3)** — load a live blog post + the homepage
   and run validator.schema.org; confirm `BlogPosting` + `Organization`/`WebSite` JSON-LD are
   present (DONE-REPO + pasted, not yet live-verified).
4. **Wave 1 #4 metadata** — the SEO catalogue is built: `analysis/seo-metadata.csv` (git,
   one row per page: current title/desc/canonical/JSON-LD + length flags + Kajabi `page_id`
   + empty `recommended_*` columns) and Supabase `page_seo` (query via MCP, push via Kajabi
   API/MCP by `page_id`). Regenerate with `analysis/gen_seo_catalog.py`, reload with
   `analysis/seo_catalog_to_supabase.py`. Follow-ups:
   - [ ] **Backfill `page_id` for all 107 pages** via the Kajabi MCP (only 9 mapped now from
     the partial admin export) so every page is API-pushable.
   - [ ] **Draft `recommended_title` / `recommended_meta_description`** for the worst offenders
     (31 titles >60 chars, 11 missing descriptions), then push via the Kajabi API/MCP.
   - [ ] Add `Article` JSON-LD to the 36 blog posts and fill the 103 pages with no JSON-LD.
   - [ ] (optional) Mirror the catalogue to an **"SEO" tab in the Snooze Operations Master
     sheet** via PAL, for human copy-paste.
   - **#5b CMS hygiene** — `analysis/CMS-HYGIENE-WORKLIST.csv` (old-domain CMS links).
5. **Connect Google Search Console** + backfill stale analytics facts (so SEO changes can be
   measured: impressions, queries, CTR, indexing of the new `/reviews` page).
6. **GBP live harvest** — finish the Google Business Profile API quota-increase approval in
   `tsc-ga4-analysis`, add the SA `ga4-mcp@tsc-ga4-analysis…` as a location manager, then the
   owner API can replace Apify. Until then, re-run Apify (subscription raised) to refresh
   reviews, then `scripts/run_sync.py`.
7. **Reviews components (brief Phases 4-5)** — reusable compact/mini cards + product-page and
   checkout embeds + the testimonial carousel swap.
8. **Country backfill** — link testimonials to CRM contacts (`👟 Sales CRM`) so
   `member_feedback_raw.country` populates via the relation.
9. **Notion tidy** — delete the now-empty `Snooze Social` Product option in the UI
   (API can't remove an option; renamed-by-migration already done).
10. **External mirror sync (deferred)** — `scripts/publish-snooze-website.sh` was NOT run this
    session (ignored per request). Run it after merge/sign-off to push the website to the VSP
    mirror; member-PII artifacts are gitignored so they are excluded from the subtree split.

---


## Part A — Evidence engine (DONE)

`analysis/build_uplift_analysis.py` joins the audit (107 pages, schema gaps,
links, vitals, on-page proof) to live GA4 (traffic, conversions, organic) and
computes `Priority = PageValue x OpportunityGap`. One run regenerates every CSV
plus the two Wave 1 worklists. Methodology and findings: `analysis/README-ANALYSIS.md`.

Run it:

```
cd apps/snooze-website/site-audit-2026-06/analysis
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
| 2 | Global Organization + WebSite JSON-LD | DONE | Deployed Jun 9 to Header Page Scripts. Source: `kajabi-deployment/global/html/schema-organization.html`. Validate with validator.schema.org (Rich Results Test only shows enhanced types like Video). |
| 3 | Blog `BlogPosting` JSON-LD (all 36 posts) | DONE | Deployed Jun 9 to Header Page Scripts. Paste from `kajabi-deployment/global/html/blog-schema-paste.html` (must include `<script>` wrapper). Self-gates to `/blog/<slug>`; DOMContentLoaded + DOM reads. |
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

## Wave 3 — Social proof: collect -> curate -> place

**Business goal:** increase Snooze **membership** purchases. Social proof on the site
must skew toward membership, courses, and general Snooze outcomes. Camp Snooze
quotes are valid but **Camp-only** (camp landing page and camp ads). Do not flood
age pages, home, or membership CTAs with Camp wrap-up quotes.

**Gate:** finish the collection pass (#12–#16) before pasting `injection-blocks.html`
(#17). Site paste is labour-intensive; curate from a large, tagged corpus first.

### Phase 3A — Collection and database (DONE 2026-06-09)

Collection results in `wave-3-social-proof/COLLECTION-AUDIT.md`. Corpus 148→**351** Notion rows.

| # | Item | Status | Artifact / next action |
|---|---|---|---|
| 12 | Source inventory | DONE | `wave-3-social-proof/TESTIMONIAL-INVENTORY.md` (refreshed). Baseline was 148 rows (not ~18); audit in `COLLECTION-AUDIT.md`. |
| 13 | Curated set | DONE | `wave-3-social-proof/CURATED-SOCIAL-PROOF.md` regenerated from 351 rows (5 sets). For human review before paste. |
| 14 | Fresh Google reviews harvest | DONE | 137 already in Notion (cleaned: Permission=Public). **GBP owner API blocked at Google quota gate** → harvested the delta via Apify `compass/Google-Maps-Reviews-Scraper` (place `ChIJ909XQaRD1moRMeU0Gdc7_GU`): 28 new reviews after 2025-08-18, deduped, ingested. `scripts/google_reviews_delta.py`. To resume GBP API: see audit (quota increase + SA as location manager + My Business v4). |
| 15 | Camp Snooze Drive transcripts | DONE | 42 roll-call transcripts (Camps 3–7) downloaded via clip-engine Drive creds; Sonnet fan-out extracted 376 verbatim quotes → `transcript-extractions/` (per-file + `_SUMMARY.md`); 166 strong ingested to Notion (Source=Camp Call, Product=Camp Snooze, Internal, Publish Approved=false). |
| 16 | DM + Snooze community screenshots | DONE | 9 screenshot testimonials ingested from `media_asset_catalog` (Google Photos→Drive sync) with `Content Type`=Screenshot + Asset URL; `scripts/ingest_screenshots.py`, inventory in `harvest/screenshot-inventory.md`. Internal until Sally consents. |
| 17 | Dual-write to Notion + Supabase | DONE | First-ever sync: `member_feedback_raw` 0→340 rows + logged in `member_feedback_sync_log`. `country` column added (migration `003_member_feedback_country.sql`). Runner: `scripts/run_sync.py` (root .env + service key). |

**Notion DB (canonical testimonial store):** Member Feedback & Wins  
`24f33898-b6c2-817c-bfa3-cab91a68b9e9`

Key fields (from `docs/AI-ready-refactor/INGEST-MANIFEST.md` Track 11): `Notes`
(quote body), `Type`, `Source`, `Product`, `Content Theme`, `Content Type`,
`Permission Level`, `Publish Approved`, `Rating`, `Google Display Name`,
`Google Review ID`, `Asset URL`, `Feedback Date`, `Tags`, `👟 Sales CRM` relation.

**Add via Tags or a new Country property:** ISO country or region (AU, US, UK, NZ,
CA, etc.) for every row. Required for authentic global proof; never guess country.

**Supabase sync:** `_legacy/workspaces/snooze-infrastructure/projects/memory-integration/scripts/sync_member_feedback_wins.py`  
Schema: `apps/brand-content-consultant/scripts/migrations/002_member_feedback_tables.sql`  
Track-11 events: `apps/ai-refactor/scripts/track-11-notion-testimonials.ts`

**Consent guardrails**
- **TSC CRM** (`25433898-b6c2-810e-96f2-000bbddd7244`): consult/contact records, no
  consent field. Identify clients to ASK only; never publish without permission.
- **Google reviews:** public by nature; still verify text matches GBP before embed.
- **Camp transcripts / DMs:** default `Permission Level` = Internal until Sally
  confirms Public or Anonymised. `Publish Approved` = false until confirmed.
- **Never fabricate** names, countries, quotes, or paraphrase DMs into polished copy.

**Product routing (when curating for web)**
| Proof type | Use on |
|---|---|
| Membership / Snooze Social / course outcomes | Home, age pages, course landings, library, membership checkout path |
| 1:1 consult / coaching (named) | about-sally, consultations, contact |
| Universal sleep-win quote (no camp reference) | Anywhere — honest Snooze-client proof regardless of original source |
| Quote that **names Camp / the camp model** | Camp page + camp ads as-is; for other products, verbatim-trim the camp reference first (curated Set 1b) |
| Google reviews | Broad trust; prefer membership-relevant wording on money pages; collated on the Reviews page |
| DM / community screenshots | Raw image blocks on high-traffic pages for authenticity (consent-gated) |

### Phase 3B — Site placement (ON HOLD until 3A)

| # | Item | Status | Artifact |
|---|---|---|---|
| 18 | Inject proof into high-traffic, low-proof pages | ON HOLD | `wave-3-social-proof/injection-blocks.html`. Regenerate from expanded `CURATED-SOCIAL-PROOF.md` (now incl. universal + trimmed-camp sets) after sign-off. Targets: about-sally, 3 age-help pages, contact. |
| 19 | Screenshot embed pattern | TODO | Design a lightweight Kajabi-safe block for raw DM/community screenshots (no fake quote styling). |
| 20 | Collated Reviews page | BUILT in repo — NOT live on Kajabi | Page HTML + theme CSS are in the repo; the Kajabi page does not exist yet. See "Reviews page deploy spec" below for the SEO metadata + steps to create and publish it, then verify live. |

### Reviews page deploy spec (#20) — create + publish on Kajabi

Source: `kajabi-deployment/pages/website/reviews-page/src/reviews-page.html` (wrapper
`#reviews-page`), generated by `wave-3-social-proof/scripts/gen_reviews_page.py` from 164
Public reviews. By service (The Snooze Membership, Courses & Guides incl. Toddler Toolkit,
1:1 Consults & Coaching, Camp Snooze), star summary, filters, JSON-LD review schema.

**SEO metadata to enter when creating the Kajabi page:**
- **URL slug:** `reviews`  ->  `https://www.joinsnooze.com/reviews`
- **Kajabi internal page name:** `Reviews`
- **SEO page title (53 chars):** `Snooze Reviews | Real Baby Sleep Results from Parents`
- **Meta description (158 chars):** `Verified reviews from parents who used Snooze to get their baby sleeping through the night and self-settling, across the membership, courses and 1:1 consults.`
- **Social share image:** a 1200x630 branded "Snooze reviews" graphic (or the site default OG). Empty = public OG-image check fails.
- **Canonical:** `https://www.joinsnooze.com/reviews`
- **Page H1 (already in the HTML):** "Snooze reviews from real families"

**Deploy steps (manual; git is not live):**
1. Ensure the theme CSS is live: the `#reviews-page` block must be in Kajabi's
   `snooze-unified-theme.css` (paste the block from the repo if not already there) or the
   page renders unstyled.
2. Create a new Kajabi **landing page** at slug `reviews`; paste the page HTML into a
   custom-code block.
3. Set the SEO fields above; add the social image.
4. **Publish** the page (it will not be a draft) and confirm it is not login-gated.
5. **Verify live:** load `https://www.joinsnooze.com/reviews` (real browser), confirm the
   cards render styled, filters work, and the JSON-LD validates (validator.schema.org).

---

## Wave 4 — Cleanup / long tail (TODO)

(Renumbered to avoid collision with Wave 3 item numbers.)

| # | Item | Effort | Notes |
|---|---|---|---|
| 21 | Alt text on ~160 images (65 pages; worst: blog product reviews) | M | Accessibility + image SEO. See `images_missing_alt` in `analysis/page_value_ranking.csv` / `page_seo`. |
| 22 | CWV outliers: Cubo Ai blog post (~3s TTFB, top organic page) + `/about-sally` (~1.7s) + slow checkout TTFB | S | Check Kajabi image weight / lazy-load. Full list in `AUDIT-REPORT.md` Core Web Vitals. |
| 23 | Triage ~40 draft Kajabi pages | M | 27 published / 40 draft. Publish, delete (`-OLD`/`-ARCHIVED` 5-12mo guide drafts), or leave. |
| 24 | Homepage source reconciliation | S | Live home drifted from the only repo copy (`archive/website/home/...`, match 0.0); re-capture canonical source into `kajabi-deployment/`. Also `/blog` index + `/3-4-month…terms` flagged drifted. |
| 25 | Prune stale 2025 apex-keyed rows from `page_scrape_data` | S | Optional. The audit added `www.` rows; the 2025 `sleepconcierge.com.au` apex rows remain and can confuse downstream analytics. |
| 26 | Reconcile `URL-REFERENCE.md` with the audit | S | Add redirects for `/privacy` (404) and `/snooze-village` (404); confirm `/snooze` status; mark the Camp Snooze Jan'26 checkout (`/offers/muRW6ug5`) login-gated/expired; `/get-great-baby-sleep` is 404 (see Wave 1 #1). |
| 27 | Thin-content pages (<150 words) | S | `/links` (62w), `/newsletters/the-snooze-news` (127w), `/free-4-month-regression-masterclass-signup` (41w). Expand or noindex as appropriate. |

---

## Immediate next steps

The canonical, current next-steps list is **`## Next steps (prioritised)`** near the top of
this file (kept up to date). The earlier pre-sprint list here is superseded; key remaining
threads in priority order: Sally consent pass (Wave 3) → reviews page + injection sign-off →
SEO metadata fixes (Wave 1 #4 / `page_seo`) → Wave 2 AEO depth (FAQPage, llms.txt, internal
linking, nav/IA) → Wave 4 cleanup. Also still open: connect Google Search Console and backfill
stale analytics facts.

## Verification checklist (per deploy)
- Schema: Google Rich Results Test + Schema.org validator pass; re-crawl
  (`crawl_page.py --force`) shows the new `jsonld_types`.
- Links: re-parse `links.list`; zero `sleepconcierge.com.au` / non-www internal links.
- Social proof: each target renders the review block with existing CSS, no layout break.
- Deploy discipline: run placeholder + env validators and `docs/DEPLOYMENT-CHECKLIST.md`;
  commit; tag `website-vX.Y.Z`; publish via `scripts/publish-snooze-website.sh`.
  Never bypass pre-commit hooks.
