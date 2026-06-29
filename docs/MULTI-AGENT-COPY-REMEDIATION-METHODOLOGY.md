# Multi-agent copy remediation: methodology and learnings (2026-06-29)

What we built running the service-model language sweep, the deployable comment strip, and the "Sally and Bec" naming correction. Captures the reusable workflow pattern and the non-obvious learnings, so the next large copy/code remediation does not relearn them. Companion to `SERVICE-MODEL-LANGUAGE-SWEEP-REPORT.md` (the what) and `docs/projects/paid-media-and-dual-currency-v1/09-kajabi-service-model-copy-changelist.md` (the staged live-Kajabi side).

## Outcome (on `main`)
- Service-model over-promises removed site-wide (no weekly/live group coaching, no replay vault, no 24/7); accurate model substituted.
- Every deployable Kajabi HTML/CSS/JS file is comment-free; genuine instructions relocated to per-folder `README.md`.
- "Sally and Bec" corrected to "the Snooze Specialists" / "Sally" in membership copy.

## Reusable workflow shape (orchestrated, model-tiered)
A `Workflow` script with phased fan-out, one agent per file-cluster, structured JSON output per agent:

1. **Discover** (Haiku, low effort): grep candidates, classify each hit into tiers vs exclusions, emit a structured worklist. Cheap and parallel.
2. **Tier 1 rewrite** (Opus): customer-facing copy + code. Brand voice + HTML correctness matter, so use the strongest model. One agent per **folder** (not per file).
3. **Tier 2 rewrite** (Sonnet): instructional / SOP / brief docs. Per-line judgement.
4. **Tier 3 annotate** (Haiku): strategy docs get a dated note only, never rewritten.
5. **Verify** (Sonnet, adversarial): re-grep residue, confirm twin parity, voice, and that legitimate copy was not scrubbed.

Model tiering by task complexity/creativity is the cost lever: Haiku for classify/annotate/mechanical, Sonnet for judgement docs + verify, Opus for brand-voice customer copy.

## Patterns we developed (the non-obvious wins)

1. **Deterministic safety net after the agent pass.** LLM agents are unreliable for *exhaustive mechanical* work (stripping every comment, replacing every occurrence). They miss a few every time. Follow the agent phase with a scripted Python/grep pass that guarantees completion (comment removal via `re.sub(r'<!--.*?-->', '', s, flags=re.DOTALL)`, phrase-anchored replacements). Treat agents as the judgement layer, the script as the completeness layer.

2. **Phrase-anchored replacement beats per-file agents when keep-vs-change is lexically distinguishable.** "Sally and Bec" had to change in membership copy ("Live sessions with Sally and Bec") but stay in podcast/Camp/consult copy ("Sally and Bec tackle…", "guidance from Sally and Bec"). Because the membership phrasings are distinct strings, an ordered find/replace over the whole tree was both safer and more complete than agents deciding per file.

3. **Agents only touch files you enumerate.** Both the Bec pass and parts of the sweep under-scoped because the prompt's file list was incomplete (the first sweep had seeded copy into more files than later prompts listed). ALWAYS re-grep residue independently after a workflow; never trust agent self-reports of "done".

4. **Long agents die mid-response.** Several Opus agents failed with "Connection closed mid-response"; their completed tool-edits persisted to disk but the run aborted. The fix: detect failures from the workflow result, redo only the failed clusters, and re-verify on disk.

5. **Comment stripping causes detect-secrets false positives.** Removing comments shifts public SRI `integrity="sha512-…"` hashes and offer slugs onto new line numbers, so they fall off the detect-secrets baseline and re-flag as "Base64 High Entropy String". Resolve by regenerating `.secrets.baseline` (with human approval — the auto-classifier blocks it as control-weakening, correctly), never by `--no-verify`.

6. **Folder-ownership prevents write races.** When agents both edit files and append to a per-folder `README.md`, assign one agent per folder so two agents never write the same README concurrently. Worktree isolation is unnecessary (and expensive) when file partitions are disjoint.

## Brand rules established/refined this session
- **Membership live sessions are real but unscheduled.** Sally + Bec run live sessions (Sleep Detectives Q&A + masterclasses), but membership copy must NOT promise a weekly cadence, session replays / a replay vault, or 24/7 support. Community support is expert-moderated and **daily**.
- **"Snooze Specialists" is the membership framing.** Use "the Snooze Specialists" for group live sessions/Q&A and "Sally" for masterclasses. **Bec is named only in Camp Snooze, Nap Trapped (co-host), and her paid 1:1 consult products.**
- Paid 1:1 consults (Signature Consult, 2-week transformation, consults with Sally/Bec) are the consulting path and stay as-is.

## Gotchas for next time
- **Cut remediation branches from `main`**, not from an active feature branch. This branch inherited 9 unrelated in-flight commits because it was cut from `docs/notion-hq-phase1`.
- **Pre-commit blocks** on (a) unregistered `workflows/n8n/<folder>` lacking a `_registry.yaml` entry, and (b) detect-secrets false positives. Unstage unrelated paths rather than bypass hooks.
- **Exclude generated/media dirs from staging** (`apps/social-media-ingestion` ~1.2GB, `site-audit-*`, `graphify-out`, `*/assets`, `.DS_Store`). `git add -A` will sweep them; stage scoped paths and reset the large dirs.
- **Kajabi is the rendering surface, git is source of truth.** Repo edits do NOT reach live Kajabi. Member-facing offer fields (descriptions, post-purchase messages) are canonical-state: propose, get sign-off, then apply via MCP. See the staged changelist (doc 09).
