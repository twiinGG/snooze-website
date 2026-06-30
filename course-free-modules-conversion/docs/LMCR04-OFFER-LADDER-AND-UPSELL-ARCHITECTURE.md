# LMCR04 Offer Ladder + Upsell/Downsell Architecture (Proposal)

**Date:** 2026-06-30 · **Author:** Claude (for Kade) · **Status:** PROPOSAL — awaiting sign-off before any build
**Supersedes** the blunt "swap paywall offer Ktxk9mvE → membership" idea from `LMCR04-MEMBERSHIP-PIVOT-2026-06-30.md` §4.

## Decision (Kade, 2026-06-30)

Don't trim the freebie and don't force the membership into the course paywall. Instead:

- **Lead magnet stays as-is** — free Schedules content, with the rest of the course visible-but-locked behind the paywall (the locked lessons keep working as an upgrade tease).
- **The $117 one-off course stays as the paywall offer** — the immediate, low-commitment "solve this stage now" upgrade. Full price. It also anchors the membership ("one stage $117 vs every stage $79/mo").
- **The email sequence sells the membership** (already live + voice-grounded + UTM'd).
- **Make the membership clearly visible at the $117 checkout**, plus a **post-purchase upsell** to the membership.
- **Automate grant cleanup** so nobody ends up with duplicate/redundant course tiles.

Why this is sound: Kajabi's paywall-offer dropdown only lists offers that already grant *this* freebie product, so the membership can't be the paywall offer without making the membership grant the freebie copy (which creates a duplicate course tile in members' libraries). Keeping the $117 course as the paywall offer and selling the membership *around* it avoids that entirely and gives a clean two-rung ladder with a real anchor.

## The offer ladder

| Rung | Offer | ID / slug | Price | Role |
|---|---|---|---|---|
| 0 | Free lead magnet (5–12 Schedules) | course 2149308933 / free offer `2x92uaLF` (2150914364) | $0 | Opt-in. Limited access = schedules only; rest locked. |
| 1 | Full 5–12 course (one-off) | offer `Ktxk9mvE` (2150914639) → grants course 2149308933 full | $117 | In-course paywall upgrade. Anchor for the membership. |
| 2 | Snooze Membership | offer `z63s9VaR` (2150754998) → grants canonical course 2149258846 + everything | $79/mo · $197/3mo · $657/yr | The destination. Sold via emails, checkout cross-sell, post-purchase upsell. |

Downsell direction: Membership decline/churn → fall back to the single $117 course.

## Where each offer is presented (placement map)

1. **In-course locked lessons** → paywall CTA → **$117 checkout**. *(exists, unchanged)*
2. **In-course "What's Next?" bridge lesson** (2194028428) → **membership** `/snooze`. *(live, UTM'd `utm_content=bridge`)*
3. **Email sequence Day 2/4/6** → **membership** `/snooze`. *(live, UTM'd `day2/day4/day6`)*
4. **Free opt-in thank-you page** (2151810974) → **membership** `/snooze`. *(live; repo synced, UTM'd `thankyou_page`)*
5. **NEW — $117 checkout page** (`Ktxk9mvE` checkout, theme 2164476353): add a clear, non-discounting membership option. Either a "one stage vs everything" compare panel with a membership link, or a Kajabi **order bump**. Framing = "smarter choice," never a discount on the $117.
6. **NEW — Post-$117-purchase upsell**: a Kajabi 1-click checkout **Upsell** offering the membership immediately after the $117 purchase (ideally crediting/acknowledging the $117 already paid), or at minimum a membership CTA in the (currently empty) `Ktxk9mvE` post-purchase message.

## Upsell / downsell automations (the "elegant" layer)

These keep entitlements clean. **Kajabi Automations are admin-UI only** (not MCP/REST-writable), so Kade builds the triggers; the logic is specified here.

- **A1 — Membership join → remove redundant standalone grants.** On purchase of the membership (`z63s9VaR` USD / `vYgCNgJz` AUD): if the contact holds the standalone $117 course grant (course 2149308933 full, via `Ktxk9mvE`), **revoke** it. They get the full course via canonical 2149258846 with the membership, so the standalone copy is redundant and would show as a duplicate library tile. (Optionally also revoke the free lead-magnet limited grant for tidiness.)
- **A2 — $117 buyers → membership-upgrade nurture.** On purchase of `Ktxk9mvE`: tag the contact and enrol them in a short "upgrade to membership" sequence (downsell-to-membership over time). Keep them OUT of the free-module nurture (exit trigger wf 443852 already covers buyers).
- **A3 — (existing) Exit trigger wf 443852** already unsubscribes membership + course buyers from the free-module nurture. Confirm `Ktxk9mvE` is one of its OR-triggers.

## What can be built where

| Piece | Mechanism | Who |
|---|---|---|
| Checkout membership cross-sell (compare panel / link) | `Ktxk9mvE` checkout theme 2164476353 via `update_theme_content` | **Claude (MCP)** |
| `Ktxk9mvE` post-purchase membership CTA (message body) | offer `update_offer` post_purchase OR checkout theme | **Claude (MCP)** |
| Native 1-click post-purchase Upsell offer | Offer → Checkout → Upsell | **Kade (admin UI)** |
| Order bump on $117 checkout | Checkout settings | **Kade (admin UI)** |
| A1 / A2 grant + nurture automations | Automations canvas | **Kade (admin UI)** |

## Dual-currency layer (USD / AUD) — and why it sets the standard

This funnel is the **template** for every future lead-magnet → membership flow, so currency handling is designed in here, not bolted on. The constraint that drives everything:

> **The currency engine (`currency-toggle.js`) runs site-wide** (Settings → Site Details → Header Scripts), so it geo-detects (TZ `Australia/*` → AUD) and rewrites any offer **slug/variant that is in its `offerMapping`/`variantMapping`** on any page where the CTA is a real DOM link. **But Kajabi's native single-offer surfaces cannot geo-switch** — the in-course paywall button, native 1-click post-purchase upsells, and emails (currency is fixed at send). Those are structurally single-currency.

### The standard rule (reusable across all magnets)

**All membership monetization CTAs route through `/snooze`** (the currency-aware entry), never a hardcoded offer slug. `/snooze` geo-routes to the correct-currency membership checkout (`z63s9VaR` USD ↔ `vYgCNgJz` AUD). This centralizes currency in one place so every new lead magnet inherits it for free. The current funnel already obeys this (emails, bridge, thank-you all → `/snooze`).

### Currency handling per rung / placement

| Surface | USD/AUD mechanism | Status / gap |
|---|---|---|
| Free magnet (rung 0) | $0 — currency-irrelevant | ✓ fine |
| In-course paywall → $117 (rung 1) | **Native paywall = single offer = USD only.** `Ktxk9mvE` is not in `offerMapping`, and the native paywall button isn't a rewritable DOM link. AU users pay USD here. | ⚠ leak on the secondary rung. Decision below. |
| Bridge lesson + emails + thank-you → membership | Link to `/snooze` → geo-routes. Emails fixed-at-send default USD copy + "AUD at joinsnooze.com" footer. | ✓ standard pattern |
| Membership checkout (rung 2) | `z63s9VaR` ↔ `vYgCNgJz` slug pair wired; site-wide engine rewrites for AU | ✅ Complete — AUD `vYgCNgJz`/2151256977 has all 3 tiers (A$119/A$299/A$997, vars 161174/161175/161176); engine repointed, 20/20 tests. (Engine staged in repo; live on paste.) |
| NEW checkout cross-sell (rung 1 → membership) | Must link to `/snooze` (currency-aware), NOT a hardcoded `z63s9VaR` | build to standard |
| NEW post-purchase upsell | **Native 1-click upsell = single offer = single currency.** For AU coverage, prefer a **currency-aware post-purchase redirect to a page that runs the engine** over the native single-offer upsell (tradeoff: lose true 1-click, gain currency correctness). | decision below |
| Cleanup automations (A1/A2) | Currency-agnostic logic, but **every trigger must list BOTH twins as OR-conditions** (e.g. A1 fires on `z63s9VaR` OR `vYgCNgJz`). Exit trigger wf 443852 already does this. | spec'd |

### Blockers this surfaces (priority order)

1. ~~**AUD membership is incomplete** (`bEsVXFXG` = monthly only).~~ **RESOLVED 2026-06-30 (Kade):** the complete AUD core offer `vYgCNgJz`/2151256977 now exists (A$119/A$299/A$997, variants 161174/161175/161176), superseding `bEsVXFXG`. `currency-toggle.js` repointed (offerMapping `z63s9VaR`→`vYgCNgJz`, variant placeholders filled, audOfferIds updated; 20/20 tests pass). Hardcoded `bEsVXFXG` repointed in snooze-globals.js + snooze-access-paidads. **Pending:** (a) manual paste of the updated header scripts to Kajabi to go live; (b) 4 AUD upgrade emails in `pages/checkout/1-month-free-membership/emails-aud/` still link `bEsVXFXG`; (c) retire/unpublish `bEsVXFXG`/2151212200.
2. **$117 paywall is USD-only for AU.** Either (a) accept it (it's the secondary rung; the priority membership path *is* currency-correct via `/snooze`), or (b) route the in-course upgrade for AU through a currency-aware page instead of the native paywall checkout.
3. **Native post-purchase upsell can't geo-switch** — decide native-1-click-USD vs currency-aware-redirect.

### The reusable "lead magnet → membership" standard (what this codifies)

1. Free magnet opt-in (currency-irrelevant).
2. Optional one-off upgrade via native paywall = USD default (single-currency is acceptable for a secondary rung).
3. **Membership = the destination, always sold via `/snooze`** so it's currency-correct everywhere.
4. The AUD twin of the destination offer must be **complete (all variants) + wired in `offerMapping` + `variantMapping`** before the magnet goes live to AU traffic.
5. Every monetization automation triggers on **both currency twins**.
6. Emails default to USD copy + an "AUD at joinsnooze.com" line and link to `/snooze` (never a fixed-currency checkout slug).

## Open questions for Kade

> **RESOLVED 2026-06-30 — see "Decisions locked" below.** All six were answered; this list is kept for context. (AUD membership Q6 is done: `vYgCNgJz`/2151256977 is complete.)

1. **Checkout cross-sell form:** soft "compare + link to membership (→ `/snooze`, currency-aware)" panel (lowest friction, I can build now) vs a Kajabi **order bump** (needs admin UI, higher conversion, but a subscription bump on a one-off checkout is clunky AND single-currency)?
2. **Post-purchase upsell:** native 1-click Upsell (best conversion, your build, but **single-currency** — AU buyers see USD) vs a **currency-aware post-purchase redirect** to a `/snooze`-style page (currency-correct, not 1-click) vs just a membership CTA in the $117 thank-you message (I can do now, link to `/snooze`)?
3. **A1 duplicate-cleanup:** revoke the standalone $117 grant on membership join — confirm desired (triggers on BOTH `z63s9VaR` + `vYgCNgJz`).
4. **Membership-at-checkout pricing frame:** anchor only ("$117 one stage vs $79/mo everything"), or a genuine credit/upgrade path (apply the $117 toward first months)?
5. **$117 paywall for AU:** accept it as USD-only (secondary rung; membership path is already currency-correct), or build an AU-routed upgrade path?
6. **AUD membership variants:** ✅ DONE — `vYgCNgJz`/2151256977 created with all three tiers (A$119/A$299/A$997); old `bEsVXFXG` deleted; engine repointed.

## Decisions locked (2026-06-30) + build status

Defaults applied so the build could finish this session:

| # | Decision | Choice |
|---|---|---|
| 1 | Checkout cross-sell | Soft text link in the offer description (renders on checkout), → `/snooze`, currency-aware + UTM. No competing button (protects the $117 conversion). Order bump = optional, admin-UI. |
| 2 | Post-purchase upsell | Membership CTA in the $117 thank-you message. Native 1-click upsell = optional, admin-UI. |
| 3 | A1 duplicate cleanup | Yes (membership join → revoke standalone $117 grant). Admin-UI automation. |
| 4 | Pricing frame | Anchor only ("one stage vs every stage, $79/mo"). No credit. |
| 5 | $117 paywall for AU | Accept USD-only (secondary rung; membership path is currency-correct via `/snooze`). |
| 6 | AUD variants | Done — `vYgCNgJz` complete. |

**Built live this session (MCP):**
- `Ktxk9mvE` offer (2150914639) **post-purchase thank-you message** = membership upsell (Sally voice, → `/snooze?...utm_content=course_117_thankyou`, "Go to my library" + "Explore the Snooze Membership").
- `Ktxk9mvE` offer **description** now carries a soft membership line + link (→ `/snooze?...utm_content=course_117_checkout`), so the membership is visible on the checkout without a click-away button.
- (Earlier this session) UTMs on Day-2/4/6 emails + bridge lesson; thank-you repo reconciled; currency engine repointed to `vYgCNgJz` (+ all repo/Notion/Sheet references).

## Runbook — admin-UI-only items (Kade)

These cannot be done via MCP/API (drag-drop automations, native checkout features, header scripts).

1. **Deploy the JS** (priority — AU routing is live-broken until this): paste `apps/snooze-website/kajabi-deployment/global/js/currency-toggle.js` into Kajabi → Settings → Site Details → **Footer** Page Scripts, and `snooze-globals.js` into **Header** Scripts.
2. **A1 cleanup automation:** Trigger = membership purchased (`z63s9VaR` OR `vYgCNgJz`). Action = revoke the standalone $117 course grant (`Ktxk9mvE` / product 2149308933) if held. (Members get the full course via canonical 2149258846, so the standalone copy is a redundant duplicate tile.)
3. **A2 (optional) $117 → membership nurture:** Trigger = `Ktxk9mvE` purchased. Action = tag + light "upgrade to membership" follow-up. (They already get the membership-led nurture if they came through the free module, so this is optional.)
4. **Native upsell / order bump (optional):** add a 1-click post-purchase membership upsell or an order bump on the `Ktxk9mvE` checkout if you want more than the message CTA. Note: native upsells are single-currency (AU sees USD).
5. **FMLM01 form (2149418596):** archive — 0 submissions in ~5 months, redundant with the offer opt-in.
6. **(Optional) "Paywall Wrapper" empty draft module** (2159220235) in course 2149308933: leftover clutter. Leave it unless you confirm it isn't the paywall boundary — low value, some risk.
7. **Day-pass workflow AUD fallback:** separate funnel; `2151212200` (deleted) is a hardcoded fallback. Decide whether AUD day-pass conversions route to the AUD 7-day trial (`Sr6KzShx`, now exists) to match the USD path, then redeploy that n8n workflow + env var.

## Not done by design (flagged)

- **Live thank-you page UTM:** the page is one 155KB custom-code blob; the repo copy carries the UTM and it goes live on the next thank-you-page paste. Not pushed via MCP (size/risk, lowest-value surface).
- **Dated historical docs** (LMCR04-FUNNEL-AUDIT, paid-media-v1 session logs, offers CSV snapshots, applied Supabase migration): left as point-in-time records, not rewritten.
