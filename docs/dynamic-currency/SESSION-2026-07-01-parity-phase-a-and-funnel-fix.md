# Site-Wide Dual-Currency — Parity Phase A + LMCR04 Funnel-Fix Session (2026-07-01)

> **Home:** this is the **site-wide dual-currency** work log, kept in `docs/dynamic-currency/` alongside `Currency-Toggle-Technical-Brief.md`, `DEPLOYMENT-GUIDE.md`, `IMPROVEMENT-PLAN.md`, `CAMP-SNOOZE-STANDALONE-IMPLEMENTATION.md`. The `/snooze` funnel-fix portion is LMCR04-specific and is cross-referenced from `course-free-modules-conversion/docs/`.

**Predecessor (the LMCR04 deploy that took the engine LIVE):** [../../course-free-modules-conversion/docs/LMCR04-DEPLOY-SESSION-2026-07-01.md](../../course-free-modules-conversion/docs/LMCR04-DEPLOY-SESSION-2026-07-01.md).
**Next-session kickoff:** [NEXT-SESSION-KICKOFF.md](./NEXT-SESSION-KICKOFF.md).
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

### Phase A live deploy — ✅ DONE + VERIFIED (2026-07-01, second session)
- **Header Page Scripts** (`textarea#site_page_scripts_header`) spliced: replaced the live currency IIFE with the repo block (Phase A inline/sticky mounts + label call). Live field 57,567 → 59,359 chars. Validated: `<script>` balance 8/8, `window.setCurrency`×1, `__snoozeCurrencyToggle__`×1, GTM/schema.org/`z63s9VaR` all preserved, before/after-splice byte-identical.
  - **Correct Site Details URL (was 404):** `/admin/sites/2148291177/edit/site-details` (NOT `/settings/site_details/edit`). Save = top-right submit button in form `edit_site_2148291177`, trusted mouse events; flash "Site was successfully updated."
- **Theme Custom Code → CSS** (theme 2156873377): the field is inside the **Encore customizer** (`/admin/themes/2156873377/settings/edit` → click **Settings** tab → **Custom Code** → Ace `settings-css-input`, 356 KB = full unified-theme + base currency rules). Appended the 4 Phase-A rule-blocks (`.sn-currency-inline`/`.inline-currency-toggle`/`.sticky-currency-toggle`/`.sn-currency-sticky-bar`) via `ace.edit(node).session.insert(end, …)` (+905 chars). Customizer Save persists from the in-editor Save button (top-right).
- **Round-trip bug found + FIXED (not Phase-A-caused, pre-existing).** `updateLinks` computed `linkChanged = newLink !== originalHref`, so switching back to USD after an AUD switch left the AUD href stranded (target == stored original → never written). Fixed to compare against the **current** href: `newLink !== btn.getAttribute('href')`. Repo `currency-toggle.js` line ~224 + new DOM round-trip regression test (suite now **21/21**). Redeployed the JS block (59,359 chars, fix live).
- **Verified LIVE, logged-out, on `/5-12-month-baby-sleep-help`:** CTA round-trips USD `z63s9VaR` ↔ AUD `vYgCNgJz` on repeated toggles; injected `.sn-currency-inline` placeholder mounts a visible (38 px, centered, 24 px radius), correctly-labelled ("🇺🇸 USD") toggle that flips currency on click. CSS confirmed live on homepage stylesheet.

### Phase B — membership surface (PAUSED 2026-07-01 per Kade: do with Kajabi MCP restored)
> **Decision (2026-07-01):** Kajabi MCP (`section_filter` / `update_landing_page`) was **not connected** this session. Phase A shipped fine via agent-browser, but Phase B edits the live homepage custom-code blocks + publishes `/snooze`. Kade chose to **pause Phase B until the Kajabi MCP is back** rather than hand-edit the money page blind in the Encore customizer. Target map below was captured from the live DOM so the next (MCP-enabled) session can go straight to the blocks.

- **Homepage — ✅ DONE + VERIFIED (2026-07-01, MCP session).**
  - **Header "Join Snooze" button** (`6iRarwak`): structured Header cta block **`1767079787493`**. Repointed `btn_action` → `https://www.joinsnooze.com/offers/z63s9VaR` via **MCP `update_theme_content`** (clean, tiny payload). Verified live. (It has no dynamic class so it always resolves to the USD offer; the engine's checkout-page "switch to AUD" link is the AU safety net. Making it currency-aware is a nice-to-have, not done.)
  - **Membership prices**: the whole homepage is ONE 50 KB Encore Custom-Code block (section `1768118757163`, block `1768118757163_0`). **Two blockers hit:** (a) the customizer's block-code Ace editor will NOT persist a programmatic `setValue`/`session.insert` (tried top-Save, dirty-nudge, input/change dispatch, blur — MCP re-fetch showed the code never changed; theme-level `settings-css-input` DOES persist, but section-block code editors don't); (b) MCP `update_theme_content` would require re-emitting the full 50 KB `code` field verbatim (corruption risk on the live money page). **Resolution: a small homepage-scoped runtime enhancer appended to Header Page Scripts** (field now 62,530 chars, 9/9 `<script>` balance). It tags the 3 `.price-big` as `.dynamic-price` (data-usd/aud 79/119, 197/299, 657/997), drops "(USD)" from `.price-sub`, makes the quarterly `$2.20/day` microcopy currency-aware (A$3.30/day), adds `.dynamic-cta` to the tier buttons (they're `.price-card a`, which the engine's `.pricing-card a` selector MISSES), mounts a `.sn-currency-inline` toggle above the grid, and re-runs `setCurrency`. **Verified live, logged-out:** USD `$79/$197/$657` + CTAs `z63s9VaR` ↔ AUD `A$119/A$299/A$997` + CTAs `vYgCNgJz`, round-trips cleanly. Enhancer source: `apps/snooze-website/kajabi-deployment/global/js/home-pricing-enhance.html` (mirror of what's in the header field). **Note:** homepage source block stays un-instrumented (runtime tagging instead) because of blocker (a)/(b) above.
  - **Homepage hero H1 = "Join Your 24/7 Baby Sleep Lifeline"** — the "24/7" is in the zone of the no-24/7-support rule. NOT changed (out of currency scope; it's a hero-headline messaging call for Kade/Sally). FLAGGED.

  > **⚠️ HOMEPAGE IS NOT FINISHED (Kade review, 2026-07-01).** Only the 3 membership tier cards switch currency. The rest of the page is riddled with USD-only prices and issues:
  > - **Un-instrumented prices that STAY USD when switched to AUD** (audited live in AUD mode): the **value-comparison table** (`$468`, `$150+`, `$108+`, `$320`, `$180`, `$90`, `$130` and its `VALUE (USD)` column header), the **price-anchoring section**, the **consultation prices** (`Snooze Members: $390 USD`, `Non-members: $690 USD`, `$445`, `$205`, `($3,500`), and the "individual courses `$117`-`$129` each" line. Only the tier `$79/$197/$657` were instrumented. A proper pass must instrument (or explicitly currency-neutralise) EVERY price on the page + the standalone "USD" labels.
  > - **Wrong phrasing / stale copy** in multiple places (Kade) — needs a full copy review against brand + service-model + Sally-positioning rules (not just currency).
  > - **Toggle UX is wrong:** the current control is a single button showing the CURRENT currency (e.g. "🇦🇺 AUD") — it does not read as a switch. It must (a) clearly show it toggles BETWEEN USD and AUD (e.g. a two-segment `USD | AUD` control with an active state), (b) be more subtle, and (c) NOT sit as the header of the pricing section. This is a redesign of the toggle UI (affects `createToggleButton`/`updateToggleUI` in `currency-toggle.js` + the `.sn-currency-inline`/`.currency-toggle-btn` CSS, and placement).
- **`/snooze` rebuild — NOT STARTED (bigger than a currency pass; see checkpoint).** Landing **2151633113** / theme **2163331541**, still a **draft/404**. It is a full 20-section sales page (hero, VSL, transformation reviews, inside-Snooze, library preview, age stages, value-comparison, who-it's-for, founder, testimonial carousel, price-anchoring, pricing, sticky CTA, FAQ, gallery). Mechanical scope = `6iRarwak`→`z63s9VaR`, currency instrument + inline toggle across pricing/anchoring/sticky, strip "24/7", publish. BUT its SEO description (and likely body copy) carries **"weekly coaching"** = live-coaching language banned by [[service_model_language_no_live_coaching]]; rewriting benefit claims accurately needs Sally's sign-off on what's actually offered. Publishing also turns a stale (Dec 2025) draft live. → checkpointed with Kade before doing it. Can't preview the draft via the storefront (agent-browser's joinsnooze.com session ≠ Kajabi admin session → 404); inspect via MCP `section_filter` per section, or the admin preview.

### Phase C / D / E (after checkpoint)
- **C — BLOCKED ON A FALSE PREMISE (discovered 2026-07-01).** Phase C assumed the main-offer pages were "already instrumented (data-usd/data-aud + .dynamic-cta) and just need a visible toggle." **They are NOT instrumented LIVE.** Verified logged-out: `/5-12-month-baby-sleep-help`, `/newborn-baby-sleep-help`, `/3-4-month-baby-sleep-help`, `/toddler-sleep-help`, `/5-12-month-baby-sleep-course` all return `.dynamic-price`=0, `[data-aud]`=0, `.dynamic-cta`=0 — the LIVE pages are the STALE pre-instrumentation versions (prices are static `.snooze-price-amount` with a hardcoded `<span>USD</span>`, e.g. render "$197 USD" and DO NOT switch). The **repo** files (`kajabi-deployment/pages/website/age-pages/*`, `product-pages/*`) DO carry `data-usd/data-aud` + `.dynamic-price`/`.dynamic-cta`, but that instrumentation was **never deployed to Kajabi**. So real Phase C = **deploy the instrumented page versions to ~10 live custom-code blocks** (each hits the same block-code save friction as the homepage — customizer won't persist programmatic edits; MCP needs full-block emission), NOT "add a placeholder". AND the repo versions themselves carry banned copy — "Live sessions with the Snooze Specialists", "No live sessions", "Lifetime access" ([[service_model_language_no_live_coaching]] + Sally-positioning "Access with the Snooze Membership") — so deploying them as-is would push non-compliant copy. Needs a per-page deploy plan + a compliance copy pass (Sally sign-off) → escalated to Kade. `/one-on-one-consultations` slug 404s (find correct consult slug). Currently currency-enabled surfaces = homepage `/`, paid-ads `/snooze-access`, Camp Snooze; everything else stale.
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
