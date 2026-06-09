# Next-session kickoff prompt — joinsnooze.com audit + uplift (team of agents)

Paste the block below to start the next session. It assumes the work from 2026-06-09 is
committed on `feat/site-audit-2026-06` (consolidation, Wave 3 corpus, reviews page, SEO
catalogue). Keep `RUNBOOK.md` as the single source of truth.

---

```
You are continuing the joinsnooze.com audit + uplift in the Snooze OS monorepo, branch
feat/site-audit-2026-06. Work the open items in apps/snooze-website/site-audit-2026-06/.

Read first (authoritative): site-audit-2026-06/RUNBOOK.md (status + "Next steps (prioritised)"
+ Wave 1-4 tables), AUDIT-REPORT.md, analysis/README-ANALYSIS.md, and root AGENTS.md §1
(canonical vs local path). The SEO catalogue is analysis/seo-metadata.csv + Supabase page_seo.

Use a TEAM OF AGENTS. Hard constraints that shape the topology:
- MCP auth does NOT survive into subagents. The orchestrator (you, main session) owns ALL
  Notion / Supabase / Kajabi MCP reads+writes. Subagents only read files, run credentialed
  Bash scripts (root .env), and produce markdown/CSV/HTML artifacts you then ingest.
- Canonical-state path (root AGENTS.md §1): Supabase schema changes in agent_ops/snooze_os/
  kajabi_raw/obs need a migration + human approval. public schema is operational. Notion is
  operational curation.
- Member-data privacy: apps/snooze-website force-publishes to the external VSP mirror, so
  unconsented Camp/DM content stays gitignored (transcript-extractions/, harvest/,
  CURATED-SOCIAL-PROOF.md). Do NOT commit member PII under that prefix.
- Gates: no Kajabi paste and no injection-blocks/reviews-page go-live until Sally/Kade sign
  off. Do NOT run scripts/publish-snooze-website.sh (external mirror) without explicit
  go-ahead. Camp/DM rows stay Permission=Internal until Sally consents.
- Writing: follow ~/KhorusOS/system/AI-WRITING-RULES.md (no em dashes, no hype) for any
  copy. SEO titles <= 60 chars, meta descriptions 120-160.

Phase 1 - orchestrator preflight (main): re-read the RUNBOOK; confirm Notion + Supabase +
Kajabi MCP connectivity; pull the current page_seo rows and the Kajabi page list.

Phase 2 - fan out these independent workstreams as parallel agents (one per stream; they
return artifacts, you do the MCP writes):
  A. SEO metadata (Wave 1 #4): from page_seo + each page's content, draft
     recommended_title (<=60) and recommended_meta_description (120-160) for the worst
     offenders (31 titles >60 chars, 11 missing descriptions). Output a CSV patch keyed by
     url/page_id. Orchestrator backfills page_id for all 107 pages via the Kajabi MCP first,
     then updates page_seo and (after sign-off) pushes via the Kajabi API.
  B. AEO depth (Wave 2): generate the FAQPage JSON-LD for the live /baby-sleep-glossary
     (from glossary/terms.json), draft llms.txt for the site root, and an internal-linking
     plan from analysis/link_graph_summary.csv (orphans + low-inbound hubs into glossary,
     age pages, top blog posts). Output ready-to-paste artifacts; do not paste.
  C. Wave 4 cleanup: draft alt text for the ~160 missing-alt images (by page, from the
     captured HTML), a triage list for the ~40 draft Kajabi pages (publish/delete/leave),
     the homepage source recapture into kajabi-deployment/, and the URL-REFERENCE.md
     reconciliation (redirects for /privacy, /snooze-village; /snooze status; camp checkout).
  D. Social proof finalisation: build Sally's consent review pack from
     transcript-extractions/_SUMMARY.md + the 9 screenshot rows (a one-pager of the strongest
     quotes to approve/reject); once she approves a subset, regenerate injection-blocks.html
     and the reviews page from the approved set.

Phase 3 - orchestrator integrates: apply the approved artifacts via MCP (Notion permission
flips, page_seo updates, Kajabi SEO pushes for signed-off pages), propose any migration on a
branch, update the RUNBOOK status rows + changelog as each item lands, commit (scoped to
apps/snooze-website, never staging _legacy secrets), and push to origin. Leave the external
mirror sync for explicit approval.

Scale the team to the work; verify each agent's output before ingesting (spot-check SEO
drafts against the live pages, validate JSON-LD, confirm no fabricated review content).
```

---

## Why this shape
- The four streams (A SEO, B AEO, C cleanup, D social proof) are genuinely independent, so
  they parallelise cleanly; only the MCP writes and sign-off gates serialise through the
  orchestrator.
- It mirrors the 2026-06-09 sprint that worked: agents produce sourced artifacts, the main
  session owns the credentialed writes, everything stays behind the consent + sign-off gates.
