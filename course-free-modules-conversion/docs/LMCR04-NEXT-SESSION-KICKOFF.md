# LMCR04 + Dual-Currency — Next-Session Kickoff

> **CURRENT as of 2026-07-01.** The dual-currency engine is now **LIVE**; A1/A2 automations and the paid-ads page are **built but Draft**. This kickoff covers what remains. Full record: **[LMCR04-DEPLOY-SESSION-2026-07-01.md](./LMCR04-DEPLOY-SESSION-2026-07-01.md)**. Earlier: [LMCR04-SESSION-2026-06-30-CHANGELOG-AND-DEPLOY.md](./LMCR04-SESSION-2026-06-30-CHANGELOG-AND-DEPLOY.md).

Paste the block below into a new Claude Code session in the Snooze OS repo to resume.

---

```
Continuing the LMCR04 + dual-currency deploy. READ FIRST (authoritative state):
  apps/snooze-website/course-free-modules-conversion/docs/LMCR04-DEPLOY-SESSION-2026-07-01.md
Recall memory: dual-currency-slug-reconciliation, lmcr04-membership-pivot.

ALREADY LIVE (do not redo): dual-currency engine (Header Page Scripts merge + theme Custom CSS);
verified AUD→vYgCNgJz on the homepage checkout CTA.

BUILT AS DRAFTS (need publish decision, both in Kajabi Marketing→Automations = /admin/sites/2148291177/workflows):
  • A1 = workflow 804108: (z63s9VaR OR vYgCNgJz purchased) → revoke LMCR04_5-12M-SCHEDULES + LMCR04_OFR_5-12M-Course-Upsell
  • A2 = workflow 804922: LMCR04_OFR_5-12M-Course-Upsell purchased → tag lmcr04-117-buyer
  • Paid-ads results page = landing 2152134250 / theme 2166700952, slug snooze-access (joinsnooze.com/snooze-access), full HTML in code block, DRAFT.

ACCESS: use the headed agent-browser (Chromium, stealth args) into app.kajabi.com; I (Kade) will log in first.
Kajabi automation dark buttons need TRUSTED mouse events (agent-browser mouse down/up), not synthetic click.
The browser may have other tabs — check `agent-browser tab` and switch to the Kajabi tab (tN) before driving.

PRIMARY OBJECTIVE — dual-currency FRONT-END parity (not yet done; the JS engine is live but the
customer-facing price-switching UX is missing on the membership + main offers):
  Bring the Snooze Membership sales surface AND the other main offers (7-day trial, 5-12 & 3-4 courses,
  newborn/nap guides, toddler toolkit, consults) to the SAME dual-currency experience Camp Snooze already has:
  location-based default (AU→AUD) + a VISIBLE user toggle + prices that switch (A$ vs $) live.
  Reference (working pilot): apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze/camp-snooze-v2-luxury/
  (CURRENCY-TOGGLE.md, camp-snooze-v2-luxury.js, camp-snooze-landing-page-blocks.html).
  The site-wide engine (currency-toggle.js, already LIVE in Header Page Scripts) already: updates .dynamic-price
  from data-usd/data-aud, rewrites .dynamic-cta/.pricing-card/[data-checkout] links, and injects a toggle
  into nav (.sn-actions) + mobile menu. GAP per page = add data-usd/data-aud on every price, class CTAs as
  .dynamic-cta, and place the toggle where Camp does (nav + INLINE in pricing section + sticky footer — the
  engine only does nav/mobile today, so either extend injectToggles() or add inline toggle mounts per page).
  Many repo pages already carry data-usd/data-aud (age-pages, product-pages, consultations, store, cold-traffic,
  founding-member, value-comparison) — AUDIT which are deployed + current, then fill gaps. DEPENDENCY: the
  tier-2 catalog (courses/guides/consults) needs its AUD twin offers created in Kajabi admin first (membership,
  7-day trial, Camp already have AUD twins; tier-2 pending per currency-toggle.js tier2PendingSlugs).
  Suggested sequence: (a) inventory live pages + which have price instrumentation/toggle; (b) decide toggle
  placement standard (match Camp); (c) build membership surface first (see /snooze decision in item 4), then
  each main-offer page; (d) create missing tier-2 AUD offers; (e) verify each live logged-out for AU + US.

REMAINING WORK — confirm each with me before acting on live/customer-facing surfaces:
  1. Publish A1 + A2 (review the revoke targets / tag first). One click each in Workflows (Draft→Published).
  2. Publish the paid-ads page /snooze-access when the ad campaign is ready (also decide whether to build
     the quiz + thanks funnel steps from pages/landing/snooze-access-paidads/{quiz,thanks}/).
  3. /snooze CTA fix (P1 — funnel is broken for customers): the membership CTAs (day-2/4/6 emails,
     bridge lesson 2194028428, thank-you page) point to joinsnooze.com/snooze which 404s for the public.
     DECISION NEEDED: repoint them to the homepage `/` (or /offers/z63s9VaR/checkout), OR refresh+publish
     the /snooze draft (landing 2151633113 / theme 2163331541) — it's a full membership sales page but STALE:
     checkout var → legacy 6iRarwak (not z63s9VaR), no currency instrumentation, "24/7" banned language.
     If repointing: MCP can edit the email themes + lesson; confirm the destination first.
  4. Legacy 6iRarwak cleanup: homepage "Join Snooze" button still → /resource_redirect/offers/6iRarwak.
     Sweep 6iRarwak (and any dRN7QR7k / bEsVXFXG) → z63s9VaR across live surfaces + repo.
  5. (Optional) AUD 1-month-free sequence: locate the live flow (not found among 36 active sequences);
     repo emails-aud/ already point to vYgCNgJz. Repaste only if a live flow still links bEsVXFXG.

Verify after any CTA change: load the surface logged-out, confirm the link resolves 200 (not the /snooze 404),
and that AU visitors reach vYgCNgJz.
```

---

## Canonical IDs (verified live 2026-06-30/07-01)
- Membership: `z63s9VaR` (USD 2150754998) ↔ `vYgCNgJz` (AUD 2151256977; A$119/A$299/A$997 vars 161174/161175/161176)
- 7-day trial: `mqQikDM7` (USD) ↔ `Sr6KzShx` (AUD)
- Free-module course product: **2149308933** (granted by free `LMCR04_5-12M-SCHEDULES`/2x92uaLF + $117 `LMCR04_OFR_5-12M-Course-Upsell`/Ktxk9mvE)
- Live website theme: **2156873377**; homepage is the live membership page (`/`)
- `bEsVXFXG`/2151212200 = DELETED (404); `6iRarwak` = legacy draft offer to retire
