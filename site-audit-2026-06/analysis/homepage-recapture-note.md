# Homepage source recapture (Wave 4 #24)

**Date:** June 9, 2026
**Status:** plan only. No HTML recaptured in this pass (repo-only, and recapturing live home HTML needs the live page, which the orchestrator's browser session owns).

## Problem

The live homepage (`https://www.joinsnooze.com/`) has **drifted** from its only repo copy. The audit's code-provenance pass matched the live home against `archive/website/home/snooze-home-page-blocks.html` at a heading-overlap ratio of **0.0** (no overlap). That copy lives in `archive/`, not in the active `kajabi-deployment/pages/` tree, and there is **no `kajabi-deployment/pages/website/home/` directory** (confirmed: the website pages tree has about-sally, age-pages, blog-index, etc., but no `home`).

So git is not the source of truth for the homepage. The live page was edited in Kajabi and never captured back. Two other pages flagged drifted at 0.0 in the same pass:

- `/blog` (index) vs `kajabi-deployment/pages/website/blog-index/blog-index.html`
- `/3-4-month-baby-sleep-course-terms-and-conditions` vs `kajabi-deployment/pages/website/legal/3-4-month-course-terms-and-conditions.html`

## Recommended recapture step (when the live browser is free)

1. **Pull the canonical live home HTML** from `https://www.joinsnooze.com/` (the rendered custom-code block content from the home page wrapper `#home-page`), and save it to a new canonical location: `kajabi-deployment/pages/website/home/snooze-home-page-blocks.html`. This becomes the source of truth; the live page is the authority because that is what renders.
2. **Retire the stale archive copy:** leave `archive/website/home/snooze-home-page-blocks.html` in place as history, or delete it once the new canonical copy is committed. Do not edit the archive copy.
3. **Re-run the provenance match** (`PAGE-SOURCE-MANIFEST.csv` / the audit's drift check) to confirm the new copy reads `in_sync`.
4. **Same recapture for the two other drifted pages** (`/blog` index and the 3-4 month course T&Cs) once home is done. Lower priority; the home page is the highest-value drift.

## Constraints

- **Do not recapture binary or large HTML in this repo-only pass.** The home block is ~48KB of HTML in the archive copy; the live version is larger still. Recapture is a deliberate fetch + commit step, gated on the live browser being available, not something to do blind here.
- The live theme `2156873377` is the legacy "Encore" theme and is **not MCP-editable**, so home content stays manual-admin-paste. Recapture is read-only (pull live HTML into git); it does not change the live page.
- Capture the home page's custom-code block(s) specifically, not the full rendered DOM (which includes theme chrome, nav, footer, and injected scripts). The goal is the editable source, matching how the rest of `kajabi-deployment/pages/website/` is structured.

## Why this is worth doing

Right now any homepage change has no reliable diff base: git does not reflect what is live. Recapturing gives a true source of truth so future home edits (schema, copy, dual-currency markup, social proof injection #18) can be made in git first per AGENTS.md §9, then pasted, instead of edited blind in Kajabi.
