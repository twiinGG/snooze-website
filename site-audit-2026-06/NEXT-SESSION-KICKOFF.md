# Next-session kickoff prompt — joinsnooze.com audit + uplift (team of agents)

Paste the block below to start the next session. It assumes the 2026-06-09 work is committed
on `feat/site-audit-2026-06` (consolidation, Wave 3 corpus, reviews page built in repo, SEO
catalogue). Keep `RUNBOOK.md` as the single source of truth.

---

```
You are continuing the joinsnooze.com audit + uplift in the Snooze OS monorepo, branch
feat/site-audit-2026-06. Work the open items in apps/snooze-website/site-audit-2026-06/.

Read first (authoritative): site-audit-2026-06/RUNBOOK.md (status + "Next steps (prioritised)"
+ Kajabi code injection map + dual-currency section + Reviews page deploy spec + Wave 1-4
tables), AUDIT-REPORT.md, analysis/README-ANALYSIS.md, and root AGENTS.md §1. The SEO
catalogue is analysis/seo-metadata.csv + Supabase page_seo.

Use a TEAM OF AGENTS, fanned out aggressively. Subagents CAN use MCP directly (Notion,
Supabase, Kajabi, Apify) - do not route everything through main; give each agent the MCP work
its stream needs.

Rules that actually matter:
- LIVE != git. Kajabi is the render target; deploy is manual paste into custom-code blocks
  and/or switching a page draft->live. An item is only done when VERIFIED LIVE: load the real
  URL (agent-browser with the stealth flags from TECHNICAL-NOTES.md - Cloudflare blocks plain
  curl/headless) and confirm it renders / the schema is present. Never mark something live off
  a git commit alone. When creating a new Kajabi page, you MUST supply its SEO metadata (page
  title, meta description, slug, social image) - the page can't be created without them.
- No review/sign-off gates - proceed and deploy; just verify live afterwards.
- Canonical-state (root AGENTS.md §1): schema changes in agent_ops/snooze_os/kajabi_raw/obs
  need a migration; public schema is operational. Notion is operational curation.
- Member-data privacy: apps/snooze-website force-publishes to the external VSP mirror, so keep
  the unconsented member artifacts gitignored (transcript-extractions/, harvest/,
  CURATED-SOCIAL-PROOF.md). Don't commit member PII under that prefix.
- Writing: ~/KhorusOS/system/AI-WRITING-RULES.md (no em dashes, no hype). SEO titles <=60,
  meta descriptions 120-160.
- Dual currency: one Kajabi offer per currency. Toggle + link rewrite on marketing/landing
  pages only. Checkout pages are single-currency; do not paste currency-toggle.js on checkout
  themes. See RUNBOOK "Dual-currency site rollout".

Phase 1 - orchestrator preflight: re-read the RUNBOOK; confirm Notion/Supabase/Kajabi MCP +
agent-browser; pull current page_seo + the Kajabi page list; agent-browser-check which "DONE"
items are actually live (Wave 1 #2/#3 schema, the /reviews page = expected 404).

Phase 2 - fan out parallel agents (each owns its MCP + verification):
  A. Reviews page go-live (#20): ensure the #reviews-page theme-CSS block is live, create the
     Kajabi /reviews page with the SEO metadata in the RUNBOOK deploy spec, paste the HTML,
     publish, link from the hero badge, then verify live at /reviews.
  B. SEO metadata (Wave 1 #4): backfill page_id for all 107 pages via the Kajabi MCP; draft
     recommended_title (<=60) + recommended_meta_description (120-160) for the worst offenders
     (31 titles >60, 11 missing); write them to page_seo; push to Kajabi; verify a sample live.
  C. AEO depth (Wave 2): FAQPage JSON-LD on the live /baby-sleep-glossary, publish llms.txt at
     root, internal-linking pass from analysis/link_graph_summary.csv; deploy + verify each.
  D. Injection blocks (#18) + Camp/DM: flip Publish Approved on the Camp/DM rows to use,
     regenerate injection-blocks.html, paste to about-sally / 3 age pages / contact, verify live.
  E. Wave 4 cleanup: alt text for ~160 images, draft-page triage, homepage source recapture,
     URL-REFERENCE reconciliation (redirects for /privacy, /snooze-village; /snooze status).
  F. Dual-currency deploy (RUNBOOK dual-currency section):
     1. Merge global/css/currency-toggle.css into snooze-unified-theme.css; paste updated CSS to
        Kajabi website theme Custom CSS.
     2. Website theme Custom Javascript (theme 2156873377): keep home-page-v2.js; append
        global/html/currency-toggle-fouc.html then global/js/currency-toggle.js (in that order).
     3. Add data-usd / data-aud + class="dynamic-cta" on pricing/checkout CTAs on home, age
        pages, and product landing HTML (CONTENT-TEAM-GUIDE.md); deploy HTML blocks.
     4. Pricing landing themes (NOT Camp 2164288957): paste the same FOUC + currency-toggle.js
        into theme Custom Javascript on Day Pass cold-ads, founding member, and any other
        landing with paid checkout CTAs. Camp keeps its standalone pilot.
     5. Verify live: toggle on homepage rewrites Join links (z63s9VaR vs bEsVXFXG); click through
        to checkout lands on single-currency offer; no toggle widget on checkout page.
     Blocked until Sally adds AUD quarterly/yearly variants on offer bEsVXFXG if testing
     variant-level checkout URLs.

Phase 3 - integrate + verify: after each deploy, agent-browser-verify the live URL; update the
RUNBOOK status to LIVE only once verified, with the changelog; commit (scoped to
apps/snooze-website, never staging _legacy secrets) and push to origin. The external mirror
sync (publish-snooze-website.sh) stays manual/owner-run unless asked.

Scale the team to the work; spot-check every agent's output against the live pages.
```

---

## Notes
- The six streams (A reviews go-live, B SEO metadata, C AEO, D injection/social proof,
  E cleanup, F dual-currency) are independent and parallelise cleanly; subagents do their own
  MCP + browser verification.
- Correction from the prior version: MCP works fine in subagents, and there are no
  sign-off gates - the bottleneck is verifying things are genuinely live on Kajabi, not
  waiting for approval.
- Dual-currency deploy targets **website-theme Custom Javascript** (same slot as
  `home-page-v2.js`), plus pricing landing themes. Not checkout themes, not Header Page Scripts
  (except optional FOUC-only if you split it). Full injection map in RUNBOOK.
