# site-uplift-2026-06

Standalone project tracking the high-ROI, no-redesign uplift of joinsnooze.com that
follows the June 2026 live-site audit. It turns the audit findings into a ranked,
shippable backlog and captures every deliverable in one place.

## Start here
- **`RUNBOOK.md`** — the plan with status per item, instructions, and next steps.
- **`PROGRESS.md`** — at-a-glance status board.
- **`analysis/README-ANALYSIS.md`** — how the ranking is built and what it found.

## Relationship to the audit
The raw audit (107-page real-browser crawl, page JSON, screenshots, the Google
Sheet) lives in the sibling `../site-audit-2026-06/`. This project consumes that
data read-only and owns the analysis, prioritisation, and uplift deliverables.

## Layout
```
site-uplift-2026-06/
  README.md                     this file
  RUNBOOK.md                    plan + status + next steps (authoritative)
  PROGRESS.md                   status board
  analysis/
    build_uplift_analysis.py    the engine (reads ../site-audit-2026-06/data, writes here)
    README-ANALYSIS.md          methodology, findings, data gaps
    page_value_ranking.csv      master uplift backlog (Priority = PageValue x OpportunityGap)
    conversion_paths.md         GA4 funnel / money feeders
    organic_pages.csv           GA4 organic landing pages joined to audit
    social_proof_coverage.csv   traffic x has-own-proof, injection priority
    link_graph_edges.csv        internal link edges
    link_graph_summary.csv      in/out-degree, self-anchors, orphan flags
    link_hygiene_issues.csv     links to old domain / non-www / stale slug
    METADATA-WORKLIST.csv       Wave 1 #4 admin SEO gaps, ranked
    CMS-HYGIENE-WORKLIST.csv    Wave 1 #5 old-domain CMS links (no repo source)
  wave-3-social-proof/
    TESTIMONIAL-INVENTORY.md    every source, tagged, with consent status
    CURATED-SOCIAL-PROOF.md     web-ready quote set, tagged by product/result
    injection-blocks.html       ready-to-paste review-card sections per target page
```

## Deploy artifacts that live elsewhere (must be in their deploy location)
These are part of this project but live in `kajabi-deployment/` so they can be
pasted to Kajabi from their normal home. Referenced by the runbook:
- `kajabi-deployment/global/html/schema-organization.html` — Wave 1 #2 (Org + WebSite JSON-LD).
- `kajabi-deployment/global/js/blog-schema.js` — Wave 1 #3 (BlogPosting auto-emit).
- Non-www -> www link hygiene (Wave 1 #5): edits across 34 `.html` files under
  `kajabi-deployment/` (components, age-pages, product-pages, store, library,
  consultations, global nav/footer).
- `docs/technical/URL-REFERENCE.md` — Wave 1 #6 glossary slug correction.

Camp Snooze testimonial videos referenced by the inventory live outside the repo in
`snooze-OS-media-library/snooze-content/projects/client-testimonials/`.

## Regenerate the analysis
```
cd analysis
python3 build_uplift_analysis.py
```
Refresh GA4 by replacing the `GA4_*` dicts at the top of the script (last pulled
2026-06-09 via the GA4 MCP), then re-run. One run regenerates every CSV and both
worklists.

## Conventions
Git is the source of truth; Kajabi is the paste/render target. Follow
`apps/snooze-website/AGENTS.md` (CSS System Init, Kajabi HTML patterns) and root
`AGENTS.md` (no em dashes, deploy validation, tag `website-vX.Y.Z` before deploy).
