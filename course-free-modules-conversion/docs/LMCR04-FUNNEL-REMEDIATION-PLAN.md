# LMCR04 Free-Module Funnel — Remediation Plan & Remaining Work

**Date:** 2026-06-29 · **Branch:** chore/service-model-language-sweep
**Source audit:** [LMCR04-FUNNEL-AUDIT-2026-06-29.md](./LMCR04-FUNNEL-AUDIT-2026-06-29.md) · **Live capture:** [LMCR04-LIVE-KAJABI-CAPTURE-2026-06-29.md](./LMCR04-LIVE-KAJABI-CAPTURE-2026-06-29.md)

The funnel is live and working (342 members, tag fires, 4-email sequence sending daily, in-course dual-CTA bridge). This plan fixes correctness defects, plugs leaks, and reconnects the control surfaces. Nothing here has been executed yet — it is the work list.

---

## Step 0 — Finish the capture (unblocks email/automation tasks)

Three items are behind Kajabi's 2FA admin login and unreadable by MCP/REST/headless agent-browser. **Decision (2026-06-29): close them via a one-time interactive login inside agent-browser's own managed browser profile**, so the session persists for the capture and all future runs.

- [ ] **One-time login:** in agent-browser's managed browser, log into `app.kajabi.com` and complete 2FA, ticking "remember this device." Save auth state to scratchpad (never the repo).
- [ ] Capture & append to the live-capture doc:
  - [ ] Sequence 2148765283 — 4 email bodies, every CTA label + URL, currency, exact quotes of any "live coaching / weekly / replay / 24/7 / group coaching" wording.
  - [ ] Sequence 2148762811 (EMLM04_Course-Sample-Conversion) — bodies + enrolment trigger.
  - [ ] Automations — trigger→action chain: what applies `LM_512_schedule` on purchase of offer 2150914364; what enrols contacts into 2148765283 and/or 2148762811 (**the double-send deciding fact**).
  - [ ] Form `FMLM01_5-12M-Schedules` (2149418596) — post-submit trigger + embed location.

Reusable note saved to memory: `kajabi-automations-email-bodies-not-in-api` (only agent-browser reaches these).

---

## P0 — Correctness (do first; revenue/data integrity)

### P0-1 · Fix the mislabeled "course upsell" offer that grants the wrong product
- **Problem:** Offer `Ktxk9mvE` (2150914639, "5-12 Month Baby Sleep Training Course", $117) grants the **free-module course product** (2149308933) via a **draft** Paywall Wrapper module (2159220235), not the canonical standalone course (product 2149258846, sold via offer 2150844344). Two "5-12 course" products now exist → split revenue/reporting, easy to grant the wrong SKU.
- **Decision needed (Sally/Kade):** which is the single source of truth for the paid 5-12 course — the paywall-wrapper-inside-free-module model, or the standalone product 2149258846?
- **Action (once decided):** point the in-course "What's Next?" CTA and the Day-4 email upsell at ONE offer that grants ONE product; retire/relabel the other; confirm the Paywall Wrapper module's published/draft state matches the chosen model. Update the Kajabi Registry sheet + Notion Offer OS accordingly.
- **Surface:** Kajabi (offer + course), Notion Offer OS, Registry sheet. **Verify:** buy-test in a sandbox contact; confirm the granted product.

### P0-2 · Strip banned "live coaching" language from the membership thank-you
- **Problem:** Membership offer 2150754998 (`z63s9VaR`) post-purchase body promises "weekly live coaching… replay vault… 24/7" — violates the no-live-coaching service-model rule and is the funnel's destination.
- **Action:** MCP-writable — `get_theme_content` then `update_theme_content` on the offer's active theme to replace with on-model copy (1:1 paid consults are real and stay; membership = self-paced library + community + Sally's guidance, not live group coaching). Cross-check against the service-model sweep report copy.
- **Also check (needs Step 0):** the 4 live LMCR04 emails for the same language; sweep if present.
- **Surface:** Kajabi themes (MCP). **Verify:** re-read theme content post-edit.

---

## P1 — Leaks & missing segments

### P1-3 · No AUD path in the funnel
- **Problem:** Free offer, $117 upsell, and both in-course CTAs are USD-only. AUD membership (2151212200) and AUD course offers never surfaced; emails are USD with a generic "AUD available" footer. AUD quarterly/yearly membership variants still not created (pending Sally admin step).
- **Action:** (a) Sally creates the AUD membership q/yr variants on `bEsVXFXG`; (b) add geo/currency branching on the in-course CTA + thank-you page (USD → z63s9VaR / Ktxk9mvE, AUD → bEsVXFXG / AUD course offer); (c) decide whether to fork the email sequence by currency or keep the footer.
- **Surface:** Kajabi offers + landing/course theme; possibly a currency-switch like the existing site one. **Verify:** load funnel as AU visitor.

### P1-4 · Two competing nurture sequences (double-send risk)
- **Problem:** `EMLM04_5-12m Schedule LM Flow` (2148765283, v2) and `EMLM04_Course-Sample-Conversion` (2148762811, v1) are the same build twice — identical Day 2/4/6 subjects, both published, **both fired 2026-06-29**.
- **Action (after Step 0 confirms triggers):** keep the canonical v2 (2148765283), unpublish/retire v1, and ensure only one is wired to `LM_512_schedule`. If both enrol the same tag → active double-send, fix immediately.
- **Surface:** Kajabi Automations + sequences. **Verify:** one enrolment path only.

### P1-5 · Offer's own thank-you body dead-ends at /login
- **Problem:** The free offer's custom thank-you body has only a `/login` button; real CTA work is on the separate thank-you page (2151810974) + in-course. If the offer body renders, it's a leak.
- **Action:** consolidate to one thank-you experience with a membership/course CTA; remove the bare `/login` body or redirect it to the rich thank-you page.
- **Surface:** Kajabi offer + landing page. **Verify:** complete the $0 checkout as a test contact.

---

## P2 — Hygiene, control surfaces & documentation

### P2-6 · Reconnect the Notion Offer OS 512 row (control surface)
- **Problem:** 512 offer row (`38c33898b6c281aabde4fcc767ef5404`) miscategorised "Other" (should be "Lead Magnet"), no Campaign relation (LMCR04 link is prose only), no Products relation, no Automations recorded.
- **Action:** set Category → Lead Magnet; wire Campaign relation → LMCR04 (`38c33898b6c28136a29cc3674485839c`); add Products relation → free-module course; note the live sequence (2148765283) + tag (LM_512_schedule) in the row. Confirm the nightly Kajabi→Notion sync (wf fLvZOIwgHwN4z2vB) won't overwrite manual relations.
- **Surface:** Notion. **Verify:** row shows wired relations + correct category.

### P2-7 · Document the orphaned opt-in form
- **Finding:** `FMLM01_5-12M-Schedules` (2149418596) exists, Name+Email, 0 submissions, unlinked. **Decision:** is it intended (future embed) or dead? Either wire it into the funnel or archive it. Record outcome in the Registry + Notion.

### P2-8 · Document the "comment 512" ManyChat trigger (black box)
- **Problem:** No repo/Notion spec for the keyword, DM copy, or the handoff to the `2x92uaLF` checkout. ManyChat also still carries off-model "live coaching" language (per the sweep report).
- **Action:** write a one-page ManyChat spec (keyword `512` → DM → checkout link with UTM) into the free-module docs; sweep the DM copy for banned language.

### P2-9 · Fix the stale CONNECTED-EXPERIENCE plan + tick LMCR04 QA
- **Action:** update `CONNECTED-EXPERIENCE-MVP-PLAN.md` (both copies) to replace retired `6iRarwak` CTAs with `z63s9VaR`; tick the LMCR04 project QA checklist items confirmed live (offer published, sequence live, tag firing, in-course CTA present) and leave the automation/email items pending Step 0.
- **Surface:** repo.

---

## Suggested execution order
1. Step 0 capture (one-time login) → unblocks P0-2 email check, P1-4, P2-7/8.
2. P0-1 + P0-2 (correctness) — get the decision on the course-product model, then execute.
3. P1-4 (kill double-send) — fast, high-value once triggers confirmed.
4. P1-3 (AUD) — needs Sally's offer variants first.
5. P1-5, then P2 hygiene (Notion row, form, ManyChat spec, stale plan, QA ticks).

## Open decisions for Sally/Kade
- **Course-product model:** paywall-wrapper-in-free-module vs standalone product 2149258846 (drives P0-1).
- **Orphaned form FMLM01:** wire in or archive. **UPDATE 2026-06-29:** form is NOT orphaned — it is a live OR-trigger on automation AUTLM01 (436114), so submitting it tags + enrols the same as the $0 checkout. It just has 0 submissions because the funnel runs through the checkout. Decision reframed to "keep as a backup entry point vs archive."
- **AUD email handling:** fork sequence by currency vs keep footer.

---

## Execution log (2026-06-29)

Branch `chore/service-model-language-sweep`. Step 0 capture done via one-time interactive Kajabi login in agent-browser's persistent stealth profile (cleared Cloudflare; auth saved to scratchpad, not repo).

| Item | Status | What was done |
|---|---|---|
| **Step 0 capture** | ✅ DONE | All 4 MCP gaps closed. Enrolment automation = **AUTLM01_Course-Sample-Conversion (wf 436114)**: offer 2150914364 purchased OR form FMLM01 submitted → tag `LM_512_schedule` + subscribe to **live** sequence 2148765283. Both sequences' bodies/CTAs captured. Appended to LIVE-KAJABI-CAPTURE doc. |
| **P0-2** (membership thank-you) | ✅ DONE | Offer **2150754998** `thank_you_body` Step 5 rewritten ("Join the Live Sessions" / "live sessions with the Snooze Specialists" / "daily support inside the Snooze Village community"); removed "weekly live coaching / replays / replay vault". Description "member coaching" → "live sessions with the Snooze Specialists". Verified via MCP echo. |
| **P0-2 extension** | ⏸ BLOCKED | Trial offer **2150887297** (USD, `mqQikDM7`) + AUD twin carry the *identical* banned Step 5 + "and coaching" description (sweep flag #1). MCP write **denied by the auto-mode safety classifier** (offer not named in original plan). **Needs your go-ahead.** |
| **P1-4** (double-send) | ✅ DONE | **No active double-send** — AUTLM01 subscribes ONLY to live 2148765283; duplicate **2148762811** has 0 subscribers + 0 subscribe/unsubscribe triggers. Renamed it `[RETIRED 2026-06-29 dupe-of-2148765283]` via agent-browser (reversible; emails still draftable). |
| **P1-5** (/login dead-end) | ✅ RESOLVED | Free offer 2150914364 `post_purchase.preference` = **landing_page** → renders rich thank-you page **2151810974** (CTAs: membership `z63s9VaR`, course `Ktxk9mvE`, free-module product page), NOT the dormant `/login` custom_message body. No leak. One residual: live thank-you page has microcopy "All courses, **weekly** guidance, and support" — one-word cadence fix staged in scratchpad (`ty_code_orig.html`); **needs go-ahead** (large theme-block write). |
| **P2-6** (Notion row) | ✅ DONE | Row `38c33898b6c281aabde4fcc767ef5404`: Category → **Lead Magnet**; **Campaigns** relation → LMCR04; **Products** relation → 5-12 Month Sleep Course; **Automations** text documents AUTLM01/wiring. **Nightly sync (wf fLvZOIwgHwN4z2vB) confirmed safe** — its PATCH only writes Kajabi-mirror fields (Offer ID, slug, Live Title/Internal/Price, Checkout/Admin URL, Last Synced); Category/relations/Automations are write-once-on-create, never overwritten. (Cosmetic: row's `Kajabi Status` reads "draft" but offer is published — sync doesn't currently mirror that field.) |
| **P2-7** (form) | ✅ RESOLVED-ish | Form 2149418596 is wired (OR-trigger on AUTLM01). Keep as backup entry vs archive = your call (low stakes). |
| **P2-8** (ManyChat) | ✅ DONE | Spec already existed (`docs/operations/automations/manychat/lmcr04-comment-to-dm-flow.md`); verified + annotated with the live AUTLM01 linkage. DM copy swept CLEAN. Live ManyChat instance has no API here → new-follower sequence still needs a human banned-language check (flag #5). |
| **P2-9** (stale CTAs + QA) | ✅ DONE | Both `CONNECTED-EXPERIENCE-MVP-PLAN.md` copies: `6iRarwak` → `z63s9VaR` (8 each) + dated correction note. LMCR04 live-verification block appended to `KAJABI-BUILD-CHECKLIST.md`. |
| **P0-1** (course-product model) | ⏸ DECISION | Unchanged — needs your decision (paywall-wrapper-in-free-module vs standalone 2149258846). Capture surfaced extra evidence: the Day-2/4/6 emails point at three different destinations (`Ktxk9mvE` checkout, a product page, `/snooze`), and a separate `UPCR04_5-12M-SCHEDULES-UPSELL` offer exists in the unsubscribe trigger. |
| **P1-3** (AUD path) | ⏸ DECISION | Needs Sally to create AUD membership q/yr variants on `bEsVXFXG` first. |

**Minor leak found (new):** the exit automation `EMLM04 - Unsubscribe Trigger` (wf 443852) unsubscribes on purchase of `UPCR04_5-12M-SCHEDULES-UPSELL` + Camp bundles, but **not** on purchase of the `Ktxk9mvE` $117 upsell or membership `z63s9VaR` — so buyers via those two paths keep receiving the nurture upsell emails. Recommend adding those two offers to the trigger (needs go-ahead).

---

## Execution log addendum — 2026-06-30 (approved follow-ups)

Kade approved (AskUserQuestion): fix the trial offers, fix the thank-you microcopy, add the two offers to the exit trigger; and clarified P0-1 (the `Ktxk9mvE` upsell is a deliberate paywall-picker offer, asked to verify the linkage).

| Item | Status | Detail |
|---|---|---|
| **P0-2 trial offers** | ✅ DONE | USD `2150887297` (`mqQikDM7`): Step-5 thank-you body + description rewritten (verified). AUD twin `2151254578` (`Sr6KzShx`, `PUBMS02_AUD_Snooze_7-Day-Trial`): thank-you is `disabled` (nothing to strip); **description** "weekly live coaching with Sally" → "live sessions with the Snooze Specialists" (verified). |
| **P1-5 thank-you microcopy** | ✅ DONE | Landing page `2151810974` theme `2164551197`, block `1768959076279_0`: "All courses, **weekly** guidance, and support" → "All courses, **ongoing** guidance, and support". Pushed via `update_theme_content`; re-fetched and confirmed **byte-for-byte** match (9962 chars, zero "weekly"). |
| **P0-1 linkage verdict** | ✅ VERIFIED CORRECT | The `Ktxk9mvE` upsell (offer 2150914639) grants product **2149308933**, which holds the **full** 5-12 curriculum. That course has exactly 2 attached offers: the **free** offer (2150914364) = **Limited access** (Welcome + Sleep Schedules submodule, above the paywall) and `Ktxk9mvE` $117 = **full access** (unlocks Part 1 / Part 2 / Wrap Up below the paywall). The **Paywall divider is correctly positioned** right after the free Schedules submodule. So Kade's purpose-made upsell offer is wired correctly — buying it unlocks the complete course. **Two notes (no fix made):** (1) the empty **draft "Paywall Wrapper" module (2159220235)** is harmless leftover clutter (0 lessons, not shown) — optional to delete; (2) this course (2149308933) is a **separate product** from the canonical `5-12 Month Sleep Training Course` (2149258846) the membership grants — same content lives in two places → split progress/reporting + double content maintenance. Functionally fine; flag as tech debt, not a funnel bug. |
| **Exit-trigger fix (wf 443852)** | ⚠ MANUAL HANDOFF | Could NOT be done programmatically: Kajabi's Automations editor is a drag-and-drop canvas with no offer-picker reachable via agent-browser refs, and there is no MCP/REST automations API. Automation left **untouched** (Save stayed disabled throughout; nothing staged). **Manual path:** `app.kajabi.com/admin/workflows/443852/edit` → on the trigger group, "Add trigger" → Offer → "is purchased" → select **`5-12 Month Baby Sleep Training Course` (Ktxk9mvE, 2150914639)** → Save. Repeat for **`The Snooze Membership` (z63s9VaR, 2150754998)**. Result: 5 OR-triggers, so buyers via the upsell or membership are unsubscribed from the nurture sequence. |
