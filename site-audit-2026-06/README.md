# site-audit-2026-06

The June 2026 joinsnooze.com **audit + uplift** project, in one place. Was previously
split across two sibling folders (`site-audit-2026-06` = raw audit, `site-uplift-2026-06` =
analysis + deliverables); consolidated 2026-06-09 into this single folder.

## Start here
- **`RUNBOOK.md`** — plan, status, progress, and next steps (single source of truth).
- **`AUDIT-REPORT.md`** — findings from the live-site crawl (the raw audit).
- **`analysis/README-ANALYSIS.md`** — how the priority ranking is built and what it found.

## What this project is
1. **Audit** — a 107-page real-browser crawl of joinsnooze.com (per-page JSON in `data/`,
   screenshots/HTML kept locally per `.gitignore`, provenance in `PAGE-SOURCE-MANIFEST.csv`).
2. **Analysis** — `analysis/build_uplift_analysis.py` joins the audit to live GA4 and ranks
   pages by `Priority = PageValue x OpportunityGap`. One run regenerates every CSV + worklist.
3. **Uplift delivery** — waves of high-ROI, no-redesign changes (schema, link hygiene,
   metadata, social proof). Tracked in `RUNBOOK.md`.

## Layout
```
site-audit-2026-06/
  README.md                     this file
  RUNBOOK.md                    plan + status + progress + next steps (authoritative)
  AUDIT-REPORT.md               raw live-site audit findings
  RUN-MANIFEST.md               how the crawl was run
  TECHNICAL-NOTES.md            audit infra notes + gotchas
  PAGE-SOURCE-MANIFEST.csv      per-page provenance
  SCREENSHOTS-LOCATION.md       where the (gitignored) screenshots live
  data/                         per-page audit JSON (html/ gitignored, ~42MB)
  scripts/                      crawl + audit scripts
  pages/                        per-page audit artefacts
  analysis/                     the ranking engine + outputs (CSVs, worklists)
    build_uplift_analysis.py    reads ../data, writes the CSVs here
    README-ANALYSIS.md          methodology, findings, data gaps
  wave-3-social-proof/          testimonial corpus expansion (Wave 3)
    COLLECTION-AUDIT.md         before/after corpus audit
    TESTIMONIAL-INVENTORY.md    source index + current-state counts
    injection-blocks.html       ready-to-paste review-card sections (baseline, anonymous)
    scripts/                    corpus harvest/ingest/curation generators (code only)
    transcript-extractions/     LOCAL ONLY (gitignored) — raw Camp transcripts + quote tables
    harvest/                    LOCAL ONLY (gitignored) — Drive manifest, review/screenshot harvest
    CURATED-SOCIAL-PROOF.md     LOCAL ONLY (gitignored) — curated quotes incl. member names
```

## Member-data privacy (important)
`apps/snooze-website` force-publishes to the external VSP mirror (`twiinGG/snooze-website`)
via `scripts/publish-snooze-website.sh`. So unconsented member content must never be
committed under this prefix. The Wave 3 raw transcripts, harvest manifests, and the curated
quote doc (which carry member names / Internal quotes) are **gitignored** — they stay local
and regenerate from Notion + Drive. Only the scripts, the audit summary, the inventory counts,
and public-review deliverables are committed. Camp/DM rows stay Internal until Sally consents.

## Deploy artifacts that live elsewhere
Part of this project but kept in their deploy location under `kajabi-deployment/`:
- `global/html/schema-organization.html` — Wave 1 #2 (Org + WebSite JSON-LD).
- `global/js/blog-schema.js` — Wave 1 #3 (BlogPosting auto-emit).
- `global/css/snooze-unified-theme.css` — `#reviews-page` block (Wave 3 #20 reviews page styles).
- `pages/website/reviews-page/src/reviews-page.html` — Wave 3 #20 collated reviews page.
- Non-www link hygiene (Wave 1 #5): edits across ~34 `.html` files under `kajabi-deployment/`.

Camp Snooze testimonial videos referenced by the inventory live outside the repo in
`snooze-OS-media-library/snooze-content/projects/client-testimonials/`.

## Regenerate
```
cd analysis && python3 build_uplift_analysis.py                 # priority ranking from audit + GA4
cd wave-3-social-proof && python3 scripts/gen_curated.py        # curated quotes (local only)
cd wave-3-social-proof && python3 scripts/gen_reviews_page.py   # reviews page from Notion
```
Refresh GA4 by replacing the `GA4_*` dicts at the top of `build_uplift_analysis.py`
(last pulled 2026-06-09 via the GA4 MCP), then re-run.
