# Kickoff: service-model language sweep (multi-agent pass)

**Goal:** Remove copy that promises a high-touch *live* service the Snooze Membership does not provide. Critical for setting correct service-model expectations (reduces churn + support load). Run as a multi-agent workflow with model tiering by task.

## What the membership IS / IS NOT

INCLUDES: every sleep course + guide; the Snooze community (expert-moderated **daily** support, not 24/7); age-based pathways; tools (naps, nights, regressions, routines, travel); member perks + ongoing content drops.

Does **NOT** include: weekly/live group coaching, scheduled live sessions, replays of those sessions, or around-the-clock support.

**Critical distinction — never scrub these (real paid products):** 1:1 Signature Consults, consults with Sally/Bec, the 2-week transformation. The target is the *membership* over-promising included live coaching / always-on support, not the existence of paid 1:1 coaching.

## Target language (membership copy only)

Remove/rewrite: "weekly live coaching", "live group coaching", "live coaching", "coaching with Sally", "coaching call(s)", "weekly call", "live Q&A", "replay vault", "replay library", "watch the replays", "never miss a session", "watch anytime" (live context), "24/7 support", "around the clock", "always available".

Flag for human (do not auto-delete): generic "coaching" / "ongoing support" used as an included membership benefit (e.g. "Why parents join" blocks).

Canonical corrected reference: `apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/{usd,aud}/checkout-blocks.html`.

## Priority tiers (process in this order)

1. **Website copy + code (HIGHEST):** `apps/snooze-website/kajabi-deployment/` — `pages/checkout`, `pages/website`, `pages/landing`, `components`, `emails`. Full rewrite to accurate benefits, preserving voice and HTML.
2. **Instructional / guidance / SOP files:** `docs/onboarding/sops/`, `apps/snooze-website/docs/`, operator how-to guides. Rewrite to match the corrected model.
3. **Strategic docs:** `docs/strategy/`, planning docs. **Do NOT rewrite the strategy.** Insert a dated note at the relevant section: `> Note (2026-06-29): Membership service model corrected — no weekly/live group coaching, session replays, or 24/7 support. Copy updated site-wide; see service-model language sweep.` Flag the doc in the report.

## Exclusions (do NOT edit)

- **Transcripts / verbatim spoken language** — podcast/episode/Camp/interview transcripts. Never alter spoken words.
- `apps/snooze-website/site-audit-2026-06/` (read-only deployed snapshots) and any `archive/`.
- Paid 1:1 consult pages/offers — leave their legitimate coaching language.

## Suggested workflow shape + model tiering

- **Phase 1 Discover** (cheap model, e.g. Haiku / low effort): enumerate hits, bucket into Tier 1/2/3 vs excluded, emit a structured worklist. Grep:
  ```
  grep -rIin --include="*.html" --include="*.md" \
    -e "live coaching" -e "group coaching" -e "weekly live" -e "coaching call" \
    -e "replay vault" -e "replay librar" -e "watch anytime" -e "never miss a session" \
    -e "live Q&A" -e "24/7" -e "around the clock" \
    apps/snooze-website/kajabi-deployment apps/snooze-website/docs docs \
    | grep -vi "site-audit\|/archive/\|transcript"
  ```
- **Phase 2 Tier-1 rewrite** (strong/creative model, e.g. Opus): one agent per file (or small cluster), worktree isolation to avoid write conflicts. Apply identical edits to USD/AUD twins and all variants. Voice per `~/KhorusOS/system/AI-WRITING-RULES.md` + `apps/snooze-website/docs/brand/SNOOZE-TONE-OF-VOICE-v1.2.md`; HTML per `apps/snooze-website/AGENTS.md`.
- **Phase 3 Tier-2 rewrite** (mid model, e.g. Sonnet).
- **Phase 4 Tier-3 annotate** (cheap/mid model): insert the dated note only; no strategic rewriting.
- **Phase 5 Verify** (mid/strong model, adversarial): re-grep for residue; confirm no paid-consult copy was scrubbed; confirm twin parity and voice compliance.

## Deliverables

- Change table: file, tier, before → after, classification.
- Ambiguous list for human decision (generic "coaching"/"ongoing support").
- Tier-3 annotated-docs list.
- **Kajabi-side flag list** (repo edits don't reach live Kajabi): offer descriptions, post-purchase/thank-you messages (e.g. USD trial offer `2150887297` post-purchase body promises "weekly live coaching… replays… replay vault"), broadcasts, email automations — for manual CMS update.

## Second objective (same pass): strip comments from deployable custom code

There is a concern that comments in customer-facing custom code are picked up by
LLMs/scrapers. As part of this sweep, for every **deployable Kajabi custom-code
file** edited or visited (checkout/landing/website/component HTML, and their CSS/JS):

- **Remove all comments** — `<!-- ... -->` in HTML, `/* ... */` and `//` in CSS/JS.
  This includes header instruction blocks, offer IDs, deployment notes, branding
  notes ("don't use Camp green"), and structural section markers.
- **Relocate any genuine instructions/notes into a `README.md` in that file's
  folder** (not inline). If a README exists, append; otherwise create one.
- Do **not** change code behaviour or copy while stripping comments; comment
  removal is mechanical and must not alter HTML structure, selectors, or JS logic.
- Done reference (the pattern to follow): the 7-day-trial bundle
  `kajabi-deployment/pages/checkout/7-day-trial-membership/` — `usd/`, `aud/`,
  `shared/` files are comment-free with instructions captured in per-folder READMEs.

Scope note: this applies to Kajabi-pasted custom code. Email templates are a
judgement call (Kajabi preserves email header comments) — strip internal/operator
notes from emails, but a minimal functional header may stay. Build scripts and
tooling outside the deployed custom code are out of scope.

Add to the **Discover** phase: also enumerate comment blocks in deployable custom
code. Add to the per-file rewrite agents: strip comments + write/append the folder
README. Add to **Verify**: confirm zero comments remain in deployable custom-code
files and that no instructions were lost (they moved to a README).

## Reference
- Brand rule in memory: `service-model-language-no-live-coaching`.
- Positioning: `docs/brand/SALLY-POSITIONING.md`.
