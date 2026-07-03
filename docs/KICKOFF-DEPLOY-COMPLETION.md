# Kickoff: finish the Batch-1 deploy + resolve the library architecture (CU-001)

You are continuing CU-001 in the Snooze OS repo. Work through this prompt top to bottom; it is self-contained. The runbook you execute against is `apps/snooze-website/docs/BATCH-1-PASTE-GUIDE.md` (live links, admin links, repo-file links per stage; keep its checkboxes current as you go). Git is the source of truth; every fix lands in the repo first, then pastes to Kajabi. Kade will be present for headed-browser pastes (agent-browser, him logged in); use MCP `update_theme_content` where the guide says it persists. Tag `website-v1.2.x` before any new paste wave and run `scripts/publish-snooze-website.sh` after commits.

## State you inherit (2026-07-03 close)

DEPLOYED AND VERIFIED LIVE: home page (full Batch-1 copy, currency round-trips, camp card with alumni perk) and About Sally (merged qualifications FAQ with the ACU degree; Kade removed the separate registered-nurse FAQ by hand; schema synced). DONE: registry Sheet + markdown synced; camp AUD member offer 2151264520 published; all ten round-2 decisions applied in repo (09-decision-doc-session-3.md carries the record).

## Task 1: resolve the library two-surface architecture (blocks 2c)

Kade's deploy finding: `/library` (system member-area page) is the ONLY surface that automatically renders Kajabi's automated product blocks; `/snooze-library` (published website page) supports the curated experience that the remediated `kajabi-deployment/pages/website/library/library-page.html` delivers. Resolve the model, recommended shape:

1. `/snooze-library` = the canonical curated "Snooze Library" (paste target for the repo file). It already matches the ratified naming ("the Snooze Library" is the confirmed content-surface name).
2. `/library` = the system utility surface (auto product blocks); keep it, do not fight it, but nothing member-facing should NAME it as the Snooze Library.
3. Audit every link that says "Snooze Library" or points at a library: nav, home page copy ("instant access to the Snooze Library"), the membership post-purchase message (currently links `/products/communities/v2/snooze/library`), `snooze-method` tier CTAs (currently `href="/library"`), checkout thank-you pages. Decide one destination per context (member-facing in-product links may legitimately stay on the community library; public marketing links go to the curated page) and make the repo files match before pasting.
4. Confirm with Kade in-session if the recommendation is overturned; otherwise proceed.

Then paste `library-page.html` into the chosen surface (guide 2c) and verify per its checklist.

## Task 2: finish the paste guide stages

- **2b Snooze Methodology (landing page, self-contained):** the repo file now carries its own fonts/icons/scoped CSS; paste into the landing page's custom code block and PUBLISH (decision 8). A same-slug draft WEBSITE page exists (id 2156725968); deploy to one surface only, retire the other.
- **Stage 3 Consultations (single-block paste):** Kade confirmed the live page is one whole-page custom code block plus header/footer blocks; paste the repo file wholesale, set the SEO description, verify (zero email-support hits, ACU credential, currency flips, member 2-week $2,800).
- **Stage 0 leftovers:** create the member 2-Week offer at $2,800 USD with AUD twin **A$3,970** (Kade's Klarna-cap ruling; repo copy already quotes it; MCP `create_offer` is proven for drafts, Kade publishes); delete draft offers 2151254356-2151254363.
- **Stage 4 quick hit:** fix the live /store "Weekly group coaching and replays" text block (banned language) per the guide. Store V2 itself stays HELD for the brief-8 redesign.
- **Stage 5:** consult email sequences sweep in admin (7-days email support); Nap Trapped caps perk into the community side column.
- **Close-out:** update `docs/projects/copy-uplift/07-implementation-plan.md` §12 with what actually shipped and when; tick the guide's close-out list; note the GEO re-check cadence.

## Task 3: hand off to the copy extrapolation

Once the deploy stages are done (or blocked items are documented), the NEXT body of work is `docs/projects/copy-uplift/KICKOFF-SESSION-3.md`: the fully self-contained mandate to extrapolate Sally's ratified principles across the remaining ~75% of the copy pack without her line-by-line review. Run it in the same session if context allows, otherwise it is the next session's prompt verbatim.

## Standing constraints

- No copy edits in the Kajabi editor; repo first, then paste. Byte-verify pastes (MCP re-read vs repo file).
- Prices only from the live-verified registry (guide Stage 0 and `docs/operations/KAJABI-OFFERS-REGISTRY.md`); never type a figure from memory.
- Service-model, voice and style rules as embedded in `KICKOFF-SESSION-3.md` §1 (binding for any wording you touch).
- Kajabi MCP toolsets (`pages`, `themes`) deactivate per session; `enable_toolset` first.
- Report at the end: what shipped live, what remains, what changed in the guide.
