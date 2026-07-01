# LMCR04 + Dual-Currency — Currency-Parity + Funnel-Fix Session (2026-07-01, Session B)

**Predecessor:** [LMCR04-DEPLOY-SESSION-2026-07-01.md](./LMCR04-DEPLOY-SESSION-2026-07-01.md) (the session that took the dual-currency engine LIVE and built A1/A2 + the paid-ads page as drafts).
**Access method:** headed `agent-browser` (Chromium, stealth args) into `app.kajabi.com` with Kade logged in, plus Kajabi MCP.

> This session: published the two draft automations and the paid-ads page, fixed the broken `/snooze` funnel destination across the highest-value live surfaces + all repo source, and **built + tested Phase A of the dual-currency front-end parity build** (engine toggle enhancement). Phase A is NOT yet deployed live; Phase B not started. This is a mid-build checkpoint.

---

## 1. Decisions taken this session (from Kade)

| Question | Decision |
|---|---|
| `/snooze` 404 fix | **Both** — repoint CTAs to homepage `/` now (unblock), refresh + publish `/snooze` later in Phase B |
| Publish A1 + A2 | **Publish both now** |
| Publish paid-ads `/snooze-access` | **Publish now** |
| Currency toggle delivery | **Extend the global engine** (placeholder-driven inline + sticky), not per-page bespoke |
| Build cadence | **Phase A + B, then checkpoint** |
| founding-member page | **Dead — ignore** (do not sweep its `6iRarwak`) |

---

## 2. Shipped LIVE (verified)

### Automations (Marketing → Automations)
- **A1** — workflow **804108** → **Published**. Verified by screenshot before flip: triggers `PUBMS01_USD_The-Snooze-Membership` **OR** `PUBMS01_AUD_The-Snooze-Membership`; actions Revoke `LMCR04_5-12M-SCHEDULES` **and** Revoke `LMCR04_OFR_5-12M-Course-Upsell`. Exactly as documented.
- **A2** — workflow **804922** → **Published**. Trigger `5-12 Month Baby Sleep Training Course` ($117 upsell) → Add tag `lmcr04-117-buyer`.
- **Publish mechanic learned (important):** workflow status persists **only from the LIST-row status dropdown** (`/admin/sites/2148291177/workflows`). The in-editor dropdown (`/admin/workflows/<id>/edit`) flips visually to "Published" but its Save stays disabled and the change **silently reverts on reload**. All dark buttons/menu items need **trusted mouse events** (`agent-browser mouse move/down/up`).

### Paid-ads results page
- **`/snooze-access`** (landing **2152134250**, theme 2166700952) → **Published** via MCP `update_landing_page` with `publish_at`=now. Verified live: HTTP 200, `vYgCNgJz`×6 / `z63s9VaR`×4 / trial `mqQikDM7`×1, `data-sa-checkout`×7, no "24/7", no test marker.
- **Recommendation (not done):** it's a paid-ads-only page — set `hide_from_search_engines: true` so it isn't indexed as thin/duplicate content. `page_title`/`page_description` are null.

### `/snooze` funnel fix (Phase 1 of the "Both" decision — repoint to `/`)
`/snooze` (landing **2151633113**, "Snooze Main Landing") is an unpublished draft → 404 for the public; logged-in admins see it render, which hid the breakage. Membership CTAs pointed at it.

- ✅ **Bridge lesson 2194028428** ("What's Next?", course 2149308933) CTA `joinsnooze.com/snooze?...bridge` → `joinsnooze.com/?...bridge` via MCP `update_course_content` (utm preserved).
- ✅ **Thank-you page** (landing **2151810974**, `thankyou/2x92uaLF`, theme **2164551197**) upsell-button `https://joinsnooze.com/snooze` → `https://joinsnooze.com/`. Edited the theme's Custom Code block (`1768959076279_0`) in the builder Ace editor in place, verified live.
- **Flag for Kade:** the bridge lesson lists **"Live Q&A sessions with the Snooze Specialists"** as a membership benefit — this is in the zone of the no-live-coaching rule (`service-model-language-no-live-coaching`). NOT rewritten this session (benefit claims need Sally's sign-off on what's actually offered).

---

## 3. Repo source edited (UNCOMMITTED at session end → committed in the closing push)

### `/snooze` → `/` in customer-facing templates (utm preserved)
1. `course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-2-bigger-picture.html`
2. `.../LMCR04/emails/LMCR04-day-4-snooze-pivot.html`
3. `.../LMCR04/emails/LMCR04-day-6-gentle-nudge.html`
4. `.../LMCR04/html/LMCR04-free-module-summary-upsell.html` (bridge)
5. `.../LMCR04/html/LMCR04-thank-you-access.html`
6. `.../LMCR05/emails/LMCR05-day-6-gentle-nudge.html`
7. `.../LMCR06/emails/LMCR06-day-6-gentle-nudge.html`

### Currency engine — Phase A (built + tested, NOT deployed live)
- `kajabi-deployment/global/js/currency-toggle.js` — extended `injectToggles()` to also mount toggles into **`.sn-currency-inline`** and **`.sn-currency-sticky`** placeholders (opt-in per page, idempotent), and to call `updateToggleUI(current)` at the end so freshly-injected toggles are labelled on first load (previously blank until first click, because `initCurrency` runs `setCurrency` before `injectToggles`). Purely additive (34 lines), no existing lines modified.
- `kajabi-deployment/global/css/currency-toggle.css` — added `.sn-currency-inline` / `.inline-currency-toggle` / `.sticky-currency-toggle` / `.sn-currency-sticky-bar` styles (35 lines).
- **Validation:** `node --check` passes on the JS; `kajabi-deployment/global/js/__tests__/currency-toggle.test.js` → **20/20 pass** (the IDE flags JSX parse errors — false positives because the file is an HTML fragment starting with `<script>`).

---

## 4. Inventory captured this session (basis for the build plan)

**Engine (`currency-toggle.js`, LIVE) is autonomous:** reads `.dynamic-price[data-usd/data-aud]`, rewrites `.dynamic-cta / [data-checkout] / .pricing-card a / .hero-cta`, AU-defaults via `Intl` timezone, persists `snooze_currency_preference`, injects a toggle **only into nav (`.sn-actions`) + mobile menu**. It has **no inline or sticky mount** — that was the gap Phase A closes.

**Camp Snooze pilot** carries a **visible 3-tier toggle** (nav + inline-in-pricing + sticky) via its **own standalone script**, not the global engine.

**Pages already instrumented** with `data-usd/data-aud` + `.dynamic-cta` (but NO visible toggle — rely on nav-only): 4 age-pages, 5 product-pages, consultations, StoreV2, cold-traffic, founding-member. `value-comparison` not found as a page.

**Homepage `/` membership prices are NOT instrumented** (static USD; deploy-session confirmed zero `dynamic-price`/`data-aud`). Its primary "Start Now" CTA is correct (`z63s9VaR`); one secondary "Join Snooze" button still points to `/resource_redirect/offers/6iRarwak` (retired draft) — this button lives in the shared site theme 2156873377 (140+ sections), not the navbar (Main Menu 2148529154 confirmed clean).

**Tier-2 pending AUD twins** (round-trip unchanged until AUD offers exist): `W2PyqL2X, 9DFJSwVD, omMcVgAi, FktmJAvJ, rVuLzkZa, Lzouupsm`.

---

## 5. Full legacy-slug / `/snooze` reference map (repo)

| Slug | Status | Notable active locations |
|---|---|---|
| `/snooze` (bare) | 404 draft | LMCR04 emails day-2/4/6, bridge, thank-you (repo all fixed); live: bridge + thank-you fixed, **3 live emails remain** |
| `6iRarwak` | retired draft | homepage secondary button (theme), founding-member page (dead → ignore), archive/audit (leave) |
| `dRN7QR7k` | dead StoreV2 | tests/docs only — guarded, no action |
| `bEsVXFXG` | DELETED 2026-06-30 | 4 AUD 1-month-free upgrade emails (repo → `vYgCNgJz` already); **live sequence not located** |

---

## 6. Remaining work (handed off / next session)

### Immediate (funnel still partially broken)
1. **3 live drip emails** in sequence **`EMLM04_5-12m Schedule LM Flow`** (2148765283) still link bare `/snooze`:
   - Day 2 `2150967901`, Day 4 `2150967914`, Day 6 `2150967944`.
   - Editor URL `admin/email_sequence_emails/<id>/edit` → "Edit content" → click the "Explore the Snooze Membership" button → change URL `joinsnooze.com/snooze?...` → `joinsnooze.com/?...` (keep utm) → Save.
   - **Cannot be automated:** classic Froala editor; Save serializes Froala's internal model, not the live DOM. Scripted DOM edits + a dirtying keystroke enable Save but revert on reload. No Froala instance reachable. → manual, or drive the Froala link-popup UI.
2. **`bEsVXFXG` AUD upgrade emails** — locate the live AUD 1-month-free sequence (not among the 36 active sequences); if live, repoint upgrade button → `vYgCNgJz`.

### Phase A live deploy (delicate — do first next session)
- Splice the updated `currency-toggle.js` block into the site-wide **Header Page Scripts** (`textarea#site_page_scripts_header`), preserving GTM/Stape/globals/**schema.org** (the field DRIFTS from repo — merge, never overwrite). Change is purely additive → a clean single-block replace of the old IIFE with the new one. Validate `<script>` balance + length delta before Save.
  - **Correct settings URL still TBD:** `/admin/sites/2148291177/settings/site_details/edit` 404'd this session — find the working Site Details path.
- Update the theme **Custom Code → CSS** (theme 2156873377, Ace `settings-css-input`) with the new inline/sticky rules.
- Verify on an already-instrumented page (e.g. an age-page) after adding a `.sn-currency-inline` div.

### Phase B — membership surface (then checkpoint per Kade)
- **Homepage** (live theme 2156873377): add `data-usd/data-aud` to membership prices + a `.sn-currency-inline` placeholder in the pricing area; fix the secondary `6iRarwak` button → `z63s9VaR` (identify its section via the live DOM, then `section_filter` that section).
- **`/snooze` rebuild** (landing 2151633113, theme 2163331541): swap legacy `6iRarwak` → `z63s9VaR`, add currency instrumentation + inline toggle, strip "24/7", publish. Then CTAs (currently → `/`) can optionally repoint to `/snooze`.

### Phase C / D / E (after checkpoint)
- **C:** add `.sn-currency-inline` placeholder to the already-instrumented main-offer pages + verify.
- **D:** create AUD twin offers for the 6 tier-2 pending slugs in Kajabi admin (**needs Kade's pricing sign-off**; first map each slug → product), then wire into `offerMapping` + move out of `tier2PendingSlugs`.
- **E:** verify each surface logged-out, AU (timezone) + US, toggle round-trips, checkout resolves to the correct offer.

---

## 7. Canonical IDs (verified live 2026-06/07)
- Membership `z63s9VaR` (USD 2150754998) ↔ `vYgCNgJz` (AUD 2151256977; A$119/A$299/A$997 vars 161174/161175/161176)
- 7-day trial `mqQikDM7` (USD) ↔ `Sr6KzShx` (AUD) | Camp `K3Y6FEKX` (USD) ↔ `46Bz9tk6` (AUD)
- Free-module course product **2149308933** | Live website theme **2156873377** | site **2148291177**
- `bEsVXFXG`/2151212200 = DELETED; `6iRarwak` = legacy draft offer to retire
- Nurture sequence `EMLM04_5-12m Schedule LM Flow` = **2148765283**
- Thank-you page 2151810974 (`thankyou/2x92uaLF`, theme 2164551197); bridge lesson 2194028428; `/snooze` draft 2151633113 (theme 2163331541)
