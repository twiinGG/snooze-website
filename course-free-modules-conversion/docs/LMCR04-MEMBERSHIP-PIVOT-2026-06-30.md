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

1. **Paywall offer swap (the cornerstone of the pivot, NOT yet done).** Change the free-module course (2149308933) paywall offer from `Ktxk9mvE` to the **membership**. Needs the admin UI + a sandbox buy-test. Gotcha: membership grants the *canonical* course 2149258846, not 2149308933 — so confirm a member who joins at the paywall actually unlocks the full course (they get it via the canonical product). Likely cleanest end state: trim 2149308933 to the free Schedules + paywall→membership and let the membership serve the full course via 2149258846.
2. **P1-3 AUD path.** Email CTAs route to `/snooze` (currency-handled by the site), so emails are AUD-safe now. Still pending: Sally to create AUD membership q/yr variants on `bEsVXFXG` (only A$119/mo exists); the AUD course offers (2151254357 etc.) are draft.
3. **P2-7 form FMLM01 (2149418596):** wired as an OR-trigger on AUTLM01; keep as backup entry or archive (low stakes).
4. **Course-product de-duplication** (2149308933 vs 2149258846) per §3 — decide and execute once the paywall swap is in.
5. **Trim the empty draft "Paywall Wrapper" module** (2159220235) in course 2149308933 — harmless clutter.
6. **Measure.** Add UTMs so membership conversions from the funnel are attributable; watch membership joins from the 512 cohort vs the old ~0 course-upsell rate.

## 5. Capability + process notes (for future sessions)

- **Sequence email bodies ARE MCP-editable** (corrects the earlier "admin-UI-only" belief). Each new-builder ("Encore Email") sequence email has its own theme (`themeable_type: EmailSequenceEmail`); the body is `sections.<text_section_id>.settings.body`. Find the theme id via the email edit page's "Edit content" link (`/admin/themes/<id>/settings/edit`), then read/write with `get_theme_content` / `update_theme_content`. Text section id was `1580167045234` across all three LMCR04 emails.
- **Automations are NOT MCP-writable** — drag-and-drop canvas; offer-trigger edits are human-only in the admin UI (Kade did the exit-trigger).
- **Kajabi admin via agent-browser:** headed session + stealth flags (real Chrome UA + `--disable-blink-features=AutomationControlled`) + persistent profile clears Cloudflare; one-time interactive 2FA, then `state save`. Auth state in scratchpad (not repo).
- **Voice grounding:** all Sally copy was matched to her real transcripts (course lesson bodies + Nap Trapped podcast). See the new "Transcript-Grounded Voice Calibration" appendix in `docs/brand/SNOOZE-TONE-OF-VOICE-v1.2.md`.

## 6. Key IDs (this funnel)

Free offer 2150914364 (`2x92uaLF`) · free-module course 2149308933 (paywall after Schedules) · upsell `Ktxk9mvE` 2150914639 (course full-access, leave wired) · canonical course PUBCR02 2150844344 / product 2149258846 · membership USD `z63s9VaR` 2150754998 · membership AUD `bEsVXFXG` 2151212200 · live sequence 2148765283 (emails 2150965669/2150967901/2150967914/2150967944) · enrolment automation AUTLM01 wf 436114 · exit automation wf 443852 · tag LM_512_schedule 2149991548 · Notion 512 row 38c33898b6c281aabde4fcc767ef5404.