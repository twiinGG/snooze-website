# LMCR04 Free-Module Funnel — Membership Pivot + Remediation (Session Handoff)

**Date:** 2026-06-30 · **Branch:** `chore/service-model-language-sweep`
**Predecessors:** [LMCR04-FUNNEL-AUDIT-2026-06-29.md](./LMCR04-FUNNEL-AUDIT-2026-06-29.md) · [LMCR04-FUNNEL-REMEDIATION-PLAN.md](./LMCR04-FUNNEL-REMEDIATION-PLAN.md) · [LMCR04-LIVE-KAJABI-CAPTURE-2026-06-29.md](./LMCR04-LIVE-KAJABI-CAPTURE-2026-06-29.md)

This session: finished the remediation, then made a strategic pivot (stop selling the one-off course in the funnel, sell the membership), rewrote all funnel copy in Sally's transcript-grounded voice, and pushed it live.

---

## 1. Strategic decision (Kade, 2026-06-30)

The funnel's course-upsell converts at ~0; the real course buyers come from outside the flow; the membership is the higher-value destination. So:

- **Stop selling the one-off course inside the LMCR04 funnel. Drive all interest to the Snooze Membership.**
- Sell the membership by anchoring it against the one-off course cost: one course = $117 for one stage; membership = $79/mo for every stage + Village + live Q&A support.
- Course pricing stays as-is. The one-off course becomes a future **downsell** from the membership.
- The free-module **paywall offer should become the membership** (staged, not yet done — see §4).
- Direct course purchases happen outside this flow, so pulling the course from the nurture cannibalises nothing.

## 2. What went live this session (all verified)

**Banned-language sweep (service-model rule):**
- Membership offer **2150754998** (`z63s9VaR`): thank-you Step 5 + description reworded off "weekly live coaching/replay vault".
- USD 7-day trial **2150887297** (`mqQikDM7`): thank-you Step 5 + description.
- AUD 7-day trial **2151254578** (`Sr6KzShx`): description ("weekly live coaching with Sally" removed).
- Canonical replacement everywhere: "live sessions / live Q&A with the Snooze Specialists", "daily support inside the Snooze Village community".

**P1-4 double-send:** duplicate sequence **2148762811** confirmed inert (0 subscribers, 0 triggers) and renamed `[RETIRED 2026-06-29 dupe-of-2148765283]`. No active double-send existed.

**Exit trigger (wf 443852):** Kade added in the admin UI — now 6 OR-triggers including `PUBCR02_5-12 Course`, both memberships (USD+AUD), AUD course. Buyers are now unsubscribed from the nurture.

**Membership pivot — copy rewritten in Sally's voice and pushed live via MCP:**

| Surface | ID / theme | New CTA | Status |
|---|---|---|---|
| Day-2 email | email 2150967901 / theme **2164549714** (section `1580167045234`) | `/snooze` (soft) | ✅ live |
| Day-4 email (value anchor) | email 2150967914 / theme **2164549778** | `/snooze` | ✅ live |
| Day-6 email | email 2150967944 / theme **2164549911** | `/snooze` | ✅ live |
| In-course "What's Next?" bridge | lesson **2194028428** (course 2149308933) | `/snooze` | ✅ live |
| Thank-you page | landing 2151810974 / theme **2164551197** (block `1768959076279_0`) | `/snooze` | ✅ live |

Repo source of truth updated to match: `src/content/bundles/LMCR04/emails/LMCR04-day-{2,4,6}-*.html` and `src/content/bundles/LMCR04/html/LMCR04-free-module-summary-upsell.html`.

## 3. P0-1 resolved (course/paywall linkage is correct)

The `Ktxk9mvE` upsell offer (2150914639) is correctly wired: it grants product 2149308933 (the full-curriculum free-module course), which has 2 offers attached — the free offer = **Limited access** (Welcome + Sleep Schedules, above the paywall) and `Ktxk9mvE` $117 = **full access** (below the paywall). The paywall divider is correctly positioned after the free Schedules submodule. Kade's purpose-made upsell offer exists because Kajabi's paywall picker requires a dedicated offer — that's fine and working.

**Tech-debt note (not a bug):** product 2149308933 duplicates the canonical course product 2149258846 (what the membership grants). Same content in two places → split progress/reporting + double maintenance. The membership pivot makes this trimmable: under "paywall → membership", the free-module course only needs Welcome + Schedules + paywall→membership; the lower Part 1/Part 2/Wrap-Up modules in 2149308933 become redundant.

## 4. Open / staged (next session)

> **⚠ SUPERSEDED (2026-06-30 session 2).** The §4 plan below (paywall-offer swap + trim) was NOT pursued. Kade chose the **offer-ladder** approach instead: keep the freebie as-is, $117 stays the in-course paywall upgrade, sell the membership around it. Current truth lives in **[LMCR04-OFFER-LADDER-AND-UPSELL-ARCHITECTURE.md](./LMCR04-OFFER-LADDER-AND-UPSELL-ARCHITECTURE.md)** (decisions + runbook) and **[LMCR04-SESSION-2026-06-30-CHANGELOG-AND-DEPLOY.md](./LMCR04-SESSION-2026-06-30-CHANGELOG-AND-DEPLOY.md)** (what's live vs staged). Items below are kept for history.

1. **Paywall offer swap (the cornerstone of the pivot, NOT yet done).** Change the free-module course (2149308933) paywall offer from `Ktxk9mvE` to the **membership**. Needs the admin UI + a sandbox buy-test. Gotcha: membership grants the *canonical* course 2149258846, not 2149308933 — so confirm a member who joins at the paywall actually unlocks the full course (they get it via the canonical product). Likely cleanest end state: trim 2149308933 to the free Schedules + paywall→membership and let the membership serve the full course via 2149258846.
2. **P1-3 AUD path.** Email CTAs route to `/snooze` (currency-handled by the site), so emails are AUD-safe now. ~~Still pending: Sally to create AUD membership q/yr variants on `bEsVXFXG`~~ **RESOLVED 2026-06-30:** complete AUD core offer `vYgCNgJz`/2151256977 (A$119/A$299/A$997) created; old `bEsVXFXG`/2151212200 deleted; currency engine repointed. AUD course offers (2151254357 etc.) remain draft (out of scope; $117 one-off paywall stays USD).
3. **P2-7 form FMLM01 (2149418596):** wired as an OR-trigger on AUTLM01; keep as backup entry or archive (low stakes).
4. **Course-product de-duplication** (2149308933 vs 2149258846) per §3 — decide and execute once the paywall swap is in.
5. **Trim the empty draft "Paywall Wrapper" module** (2159220235) in course 2149308933 — harmless clutter.
6. **Measure.** Add UTMs so membership conversions from the funnel are attributable; watch membership joins from the 512 cohort vs the old ~0 course-upsell rate.

## 4b. Session update (2026-06-30, second pass)

**Verified the full offer/product graph via MCP (the gotcha is real and confirmed):**
- Membership `z63s9VaR`/2150754998 grants the **canonical** course **2149258846** (+ Toddler Toolkit, 3-4mo, Newborn, guides, Village access-group, etc.). It does **NOT** grant the free-module product 2149308933.
- Free-module course 2149308933 is granted only by `Ktxk9mvE`. The free offer `2x92uaLF`/2150914364 grants a **CourseAccessLevel** sub-product (2149309110 = the "Limited" tier). Standard Kajabi paywall split.
- **`Ktxk9mvE` has 0 lifetime purchases** (confirmed via list_offer_purchases). So trimming the duplicated full-course content from 2149308933 harms **no paying customer**.
- Course 2149308933 structure: free = `Welcome` module (Hi/About + `Sleep Schedules` submodule incl. the `What's Next?` bridge lesson 2194028428) → draft `Paywall Wrapper` divider (2159220235) → **Part 1 / Part 2 / Wrap-Up = a full duplicate of canonical 2149258846** (all `published`, i.e. visible-but-locked to the 344 free members).

**Consequence for the paywall swap:** Kajabi unlocks a course's gated lessons only when the purchased offer grants *that same product*. The membership grants 2149258846, not 2149308933, so pointing the paywall at the membership will **not** unlock 2149308933's gated lessons. The coherent end state (Option A, = the doc's "likely end state") is: repoint the paywall CTA → membership, **unpublish** the Part 1/2/Wrap-Up duplicate in 2149308933, and let members get the full course via canonical 2149258846 in their Library. This also resolves the de-dup (task 2): 2149308933 = lean free magnet; 2149258846 = the real full course.

**Done this pass (live + repo):**
- Added UTMs to all membership CTAs: Day-2/4/6 emails (live themes 2164549714/2164549778/2164549911) + bridge lesson 2194028428 (live) + all repo source files. Scheme: `?utm_source=512funnel&utm_medium={email|course|landing}&utm_campaign=snooze_membership&utm_content={day2|day4|day6|bridge|thankyou_page}`.
- Reconciled the **stale repo thank-you file** (`LMCR04-thank-you-access.html`): removed the off-pivot `$117 Ktxk9mvE` "Unlock the Full Course" button. (The **live** thank-you page was already membership-only → `/snooze`; only the repo had drifted.)
- **Deferred:** UTM on the live thank-you page (one 155KB custom-code blob; lowest-value surface, shown pre-nurture). Repo carries it for next redeploy.

**AUD routing (task 3) — RESOLVED 2026-06-30:** `currency-toggle.js` now pairs `z63s9VaR`→`vYgCNgJz` (offer 2151256977) with real variant IDs 161174/161175/161176 (A$119/A$299/A$997); TZ geo-detect (`Australia/*`→AUD). The old `bEsVXFXG`/2151212200 (monthly-only) was deleted by Kade and replaced; engine repointed and 20/20 tests pass. **Note: the engine is staged in repo, not yet pasted to Kajabi Footer Page Scripts — no currency switching is live until that deploy.** (7-day-trial AUD `Sr6KzShx` variants already mapped.)

**FMLM01 form (2149418596) decision:** **0 submissions in ~5 months**, name+email only, redundant with the offer opt-in entry. Recommend archive (remove from any embed; the never-firing AUTLM01 OR-trigger is harmless). Low stakes.

**Still blocked on Kade (one-time interactive 2FA + a sandbox purchase):** the paywall-CTA swap in the admin UI + the sandbox buy-test. The content trim is MCP-doable and awaits green-light (it changes 344 members' course view, so confirm-first).

## 5. Capability + process notes (for future sessions)

- **Sequence email bodies ARE MCP-editable** (corrects the earlier "admin-UI-only" belief). Each new-builder ("Encore Email") sequence email has its own theme (`themeable_type: EmailSequenceEmail`); the body is `sections.<text_section_id>.settings.body`. Find the theme id via the email edit page's "Edit content" link (`/admin/themes/<id>/settings/edit`), then read/write with `get_theme_content` / `update_theme_content`. Text section id was `1580167045234` across all three LMCR04 emails.
- **Automations are NOT MCP-writable** — drag-and-drop canvas; offer-trigger edits are human-only in the admin UI (Kade did the exit-trigger).
- **Kajabi admin via agent-browser:** headed session + stealth flags (real Chrome UA + `--disable-blink-features=AutomationControlled`) + persistent profile clears Cloudflare; one-time interactive 2FA, then `state save`. Auth state in scratchpad (not repo).
- **Voice grounding:** all Sally copy was matched to her real transcripts (course lesson bodies + Nap Trapped podcast). See the new "Transcript-Grounded Voice Calibration" appendix in `docs/brand/SNOOZE-TONE-OF-VOICE-v1.2.md`.

## 6. Key IDs (this funnel)

Free offer 2150914364 (`2x92uaLF`) · free-module course 2149308933 (paywall after Schedules) · upsell `Ktxk9mvE` 2150914639 (course full-access, leave wired) · canonical course PUBCR02 2150844344 / product 2149258846 · membership USD `z63s9VaR` 2150754998 · membership AUD `vYgCNgJz` 2151256977 (complete A$119/A$299/A$997; replaced deleted `bEsVXFXG`/2151212200 on 2026-06-30) · live sequence 2148765283 (emails 2150965669/2150967901/2150967914/2150967944) · enrolment automation AUTLM01 wf 436114 · exit automation wf 443852 · tag LM_512_schedule 2149991548 · Notion 512 row 38c33898b6c281aabde4fcc767ef5404.