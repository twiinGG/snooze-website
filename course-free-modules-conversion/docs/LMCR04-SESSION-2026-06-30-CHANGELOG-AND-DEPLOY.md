# LMCR04 + Dual-Currency — Session Changelog, Deploy Status & Runbook (2026-06-30)

**Branch:** `chore/service-model-language-sweep`
**Companion docs:** [LMCR04-OFFER-LADDER-AND-UPSELL-ARCHITECTURE.md](./LMCR04-OFFER-LADDER-AND-UPSELL-ARCHITECTURE.md) · [LMCR04-MEMBERSHIP-PIVOT-2026-06-30.md](./LMCR04-MEMBERSHIP-PIVOT-2026-06-30.md)

> **Read this first — what "live" means here.** Two different deploy mechanics are in play:
> - **Kajabi MCP writes = LIVE immediately.** Editing an email theme, course lesson, offer, or page theme via MCP changes the live Kajabi object directly (Kajabi has no draft layer for these). No manual paste.
> - **Repo file edits = STAGED only.** Global JS/CSS, page HTML, and email HTML files in `apps/snooze-website/` are the source of truth but reach Kajabi **only by manual paste** into the relevant CMS field. Editing the repo does NOT change the live site.
> - **Notion / Google Sheet edits = live in those tools.** The nightly Kajabi→Notion offer sync (n8n wf `fLvZOIwgHwN4z2vB`) is the only automated mirror.
>
> Net: the funnel copy/offer changes are live; **the whole dual-currency engine is staged and not yet deployed.**

---

## 1. Deployment status (every change this session)

### LIVE NOW in Kajabi (done via MCP — no paste needed)

| Change | Object | Notes |
|---|---|---|
| UTMs on membership CTA | Day-2 email theme 2164549714 | `?utm_source=512funnel&utm_medium=email&utm_campaign=snooze_membership&utm_content=day2` |
| UTMs on membership CTA | Day-4 email theme 2164549778 | `utm_content=day4` |
| UTMs on membership CTA | Day-6 email theme 2164549911 | `utm_content=day6` |
| UTM on membership CTA | Bridge lesson 2194028428 (course 2149308933) | `utm_content=bridge` |
| **$117 post-purchase upsell** | Offer `Ktxk9mvE` 2150914639 thank-you message | Was empty; now Sally-voiced membership upsell → `/snooze?...utm_content=course_117_thankyou` |
| **$117 checkout cross-sell** | Offer `Ktxk9mvE` description | Soft membership text link → `/snooze?...utm_content=course_117_checkout` |

### LIVE in Notion / Google Sheet

| Change | Surface |
|---|---|
| "Snooze Access (AUD)" record repointed to `vYgCNgJz`/2151256977, Status → Active | Notion Offer OS page `38c33898-b6c2-8123-af6e-dc4fbab19416` |
| Offers registry row 15 repointed to `vYgCNgJz`/2151256977, Status → Active | Google Sheet `1-pDIlV7…` OFFERS tab (gid 1126415) |

### STAGED in repo — NOT live until manually pasted to Kajabi

| File | Kajabi destination | Why it matters |
|---|---|---|
| `global/js/currency-toggle.js` | Settings → Site Details → **Footer** Page Scripts | The dual-currency engine. Repointed to `vYgCNgJz` + variant IDs 161174/161175/161176; 20/20 tests pass. **Until pasted, no currency switching happens anywhere.** |
| `global/js/snooze-globals.js` | **Header** Scripts | `AUD_ACCESS_OFFER_URL` → `vYgCNgJz` |
| `global/html/currency-toggle-fouc.html` + `global/css/currency-toggle.css` | Header Scripts / CSS (per `global/js/README.md`) | Anti-FOUC + toggle styling; part of the same bundle |
| `pages/landing/snooze-access-paidads/index.html` | The paid-ads landing page custom code | AUD URL → `vYgCNgJz`; `SA_CHECKOUT.aud.live` still `false` (can flip to `true` now the AUD offer is complete) |
| `pages/checkout/1-month-free-membership/emails-aud/` (day-7/14/21/25 + README) | Those 4 Kajabi sequence emails | Upgrade button repointed `bEsVXFXG`→`vYgCNgJz`. **If this AUD sequence is live, the button is currently a 404** (offer deleted) — verify + repaste. |
| `course-free-modules-conversion/.../LMCR04-thank-you-access.html` | Free-opt-in thank-you page | Repo reconciled (removed dead $117 button) + UTM added. Live page is already membership-only; the UTM ships on next paste. |
| `course-free-modules-conversion/.../LMCR04-free-module-summary-upsell.html` | (mirrors bridge lesson 2194028428, already live via MCP) | Repo parity only |
| Repo docs / READMEs / `global/js/README.md` tables | n/a | Documentation; no deploy |

---

## 2. Changelog (what we did, grouped)

**LMCR04 funnel → membership (offer ladder).** Locked the ladder: free Schedules magnet → **$117 course stays the in-course paywall upgrade** (anchor) → **membership sold around it** (emails, checkout description, post-purchase message). No trim of the freebie, no paywall-offer swap (see Findings §3). Built the $117 post-purchase membership upsell and the checkout-description cross-sell. UTM'd every membership CTA.

**Dual-currency reconciliation.** Kade created the complete AUD core membership `vYgCNgJz`/2151256977 (A$119 var 161174 / A$299 var 161175 / A$997 var 161176) and **deleted** the old monthly-only `bEsVXFXG`/2151212200. Repointed every reference: currency engine + variant map + `audOfferIds`, `snooze-globals.js`, paid-ads page, 4 AUD emails, README tables, Notion record, Google Sheet row. Tests 20/20.

**Earlier in session:** banned-language already stripped (prior session); thank-you repo reconciled; FMLM01 reviewed.

---

## 3. Insights, findings & fixes (for future lead-magnet → membership builds)

1. **MCP = live, repo = staged.** The single most load-bearing fact for this codebase. Funnel copy edited via MCP needs no deploy; anything in `global/js`, page HTML, or email HTML needs manual paste. Plan deploys accordingly.
2. **Kajabi's course paywall is product-bound.** The "Paywall offer" dropdown (course Settings → Paywall) only lists offers that grant *that same course product*. The membership grants the *canonical* course (2149258846), not the free-module product (2149308933), so it can never be the paywall offer. Confirmed via the live `<select name="paywall[popup_checkout_offer_id]">` having exactly one option. → Sell the membership *around* the paywall, not *as* it.
3. **The freebie is a full duplicate of the canonical course.** Course 2149308933 contains the entire paid course behind its paywall, separate from canonical 2149258846. `Ktxk9mvE` ($117, grants the freebie's full access) has **0 lifetime purchases**. We chose to keep it (no trim) per Kade: lead magnet as-is, $117 as the full-price upgrade.
4. **Dual currency = one rule + structural exceptions.** Standard: every membership CTA routes through `/snooze` (currency-aware), never a hardcoded slug. Exceptions that can't geo-switch: the native in-course paywall (single offer = USD), native 1-click upsells (single currency), and emails (currency fixed at send → default USD copy + "AUD at joinsnooze.com" + link to `/snooze`).
5. **The currency engine is site-wide** (Header/Footer Scripts), so once deployed it rewrites any in-map offer slug/variant on any page automatically — including offer checkout pages. Pages that hardcode the USD slug `z63s9VaR` don't each need editing; the engine swaps them at runtime.
6. **`vYgCNgJz` supersedes `bEsVXFXG`.** The complete AUD offer replaced the monthly-only draft. Any lingering `bEsVXFXG` link is now a 404 (offer deleted).
7. **Stale Google creds.** `GOOGLE_APPLICATION_CREDENTIALS` in root `.env` points to a non-existent path; the working service-account key is `_legacy/workspaces/snooze-infrastructure/spellbook-459212-dda0585fd42b.json`. Used it to write the offers Sheet.
8. **Fix logged:** the live thank-you page was already membership-only; only the repo had drifted (still carried the dead $117 button). Repo now matches.

---

## 4. RUNBOOK — deploy status as of 2026-06-30 pre-flight pass

> **Pre-flight completed 2026-06-30.** Tests 20/20 + 20/20. `SA_CHECKOUT.aud.live` flipped to `true`.
> Live site theme scanned: 0 hits for `bEsVXFXG`/`2151212200` — theme is clean.
> Branch `feat/graphify-knowledge-graph` merged to `main` and pushed. Ready for manual Kajabi paste.

### A. Manual deploys to Kajabi — PENDING (paste in this order)

1. **[PRIORITY] Deploy the dual-currency bundle** — nothing currency-related is live until this:
   - `global/js/snooze-globals.js` → Settings → Site Details → **Header** Scripts
   - `global/html/currency-toggle-fouc.html` → **Header** Scripts (append after globals)
   - `global/css/currency-toggle.css` → Theme → Custom CSS
   - `global/js/currency-toggle.js` → **Footer** Page Scripts
2. **Paid-ads landing** (`pages/landing/snooze-access-paidads/index.html`) → paste to that page. `SA_CHECKOUT.aud.live` already flipped to `true` in repo — AU visitors now route to `vYgCNgJz` directly.
3. **1-month-free AUD emails** (4 files in `pages/checkout/1-month-free-membership/emails-aud/`) → **check first**: in Kajabi admin open the AUD 1-month-free sequence and inspect the upgrade button URL. If it shows `bEsVXFXG`, repaste all 4 emails immediately (offer deleted = 404). Repo files already point to `vYgCNgJz`. Sequences MCP unavailable to verify remotely.
4. **LMCR04 thank-you page** → low priority; live page is functionally correct. Paste picks up the UTM only.

### B. Automations / admin-UI — PENDING (Kajabi Automations = drag-drop only, not MCP/REST)

5. **A1 cleanup automation (P0):**
   - Trigger: Offer is purchased → `z63s9VaR` **OR** `vYgCNgJz`
   - Action: Revoke grant for product **2149308933** (standalone $117 course) from contact
   - Why: members would otherwise get a duplicate course tile for the same content
6. **A2 upgrade tag (optional):**
   - Trigger: Offer is purchased → `Ktxk9mvE`
   - Action: Tag contact `lmcr04-117-buyer` for future membership-upgrade sequence
7. **Confirm exit trigger wf 443852** behaves as intended for $117 buyers.

### C. Native checkout features — optional, admin-UI

8. Order bump / 1-click post-purchase upsell on `Ktxk9mvE` checkout (native upsells are single-currency).

### D. Cleanups

9. **Archive FMLM01 form** (2149418596) — confirmed 0 submissions, redundant with the offer opt-in.
10. **(Optional)** empty draft "Paywall Wrapper" module (2159220235) in course 2149308933 — harmless leftover.
11. **Done:** `bEsVXFXG`/2151212200 retired (Kade deleted it in Kajabi admin).

### E. Verify after deploy

12. Set `localStorage.snooze_currency_preference='AUD'` and reload `/snooze` — CTAs must route to `vYgCNgJz`; three AUD tiers must render with variant IDs 161174/161175/161176; USD↔AUD toggle must round-trip.
13. Preview `Ktxk9mvE` post-purchase message + description in Kajabi admin (no test purchase needed).
14. **Measure:** watch `utm_campaign=snooze_membership` in GA4 across sources `512funnel`/mediums `email`/`course`/`landing`/`post_purchase`/`checkout`. UTMs are live on MCP surfaces now; paid-ads + thank-you land on paste.

### Repo doc reconciliation (done 2026-06-30)

All **current/active** LMCR04 + dual-currency reference docs in `apps/snooze-website/` were swept to the new offer (`vYgCNgJz`/2151256977): the offer-ladder doc, membership-pivot doc (superseded-banner + ID fixes), next-session-kickoff (historical banner + ID fix), funnel-remediation-plan (P1-3 marked done), funnel-audit (table corrected + finding annotated), the `global/js/README.md` tables + GTM note, the paid-ads + consultations READMEs, and both `CONNECTED-EXPERIENCE-MVP-PLAN.md` copies. No current snooze-website doc presents the deleted offer as canonical; the only remaining mentions are inside dated/bannered historical records.

**Broader repo archive — intentionally left as history (sweep on request):** dated project archives under `docs/projects/paid-media-and-dual-currency-v1/` (PRD, session-end logs, phase reports, inventory), `docs/operations/` dated offer CSV snapshots + cleanup decision docs + the wave-0 `update_offers_sheet` script, `docs/strategy/paid-scaling/` proposals, the applied `supabase/migrations/…day_pass…` migration. These are point-in-time records; rewriting them would falsify the history. The day-pass funnel docs + `workflows/n8n/day-pass-conversion/` reference the deleted `2151212200` as a functional fallback — folded into the day-pass routing decision below.

### Out of scope (noted, not LMCR04)

- Day-pass workflow AUD fallback still references the deleted `2151212200` (n8n + env var); decide whether to route AUD day-pass conversions to the AUD 7-day trial `Sr6KzShx` (now exists). Separate funnel + n8n redeploy.
- Tier-2 catalog AUD twins (courses/guides/consults) remain pending per the currency engine's `tier2PendingSlugs`; the $117 one-off paywall stays USD-only for AU by decision.
