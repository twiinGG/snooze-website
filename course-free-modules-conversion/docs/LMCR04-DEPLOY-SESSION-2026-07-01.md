# LMCR04 + Dual-Currency — Deploy Session (2026-07-01)

**Predecessor:** [LMCR04-SESSION-2026-06-30-CHANGELOG-AND-DEPLOY.md](./LMCR04-SESSION-2026-06-30-CHANGELOG-AND-DEPLOY.md)
**Access method this session:** headed `agent-browser` (Chromium, stealth args) into `app.kajabi.com` with Kade logged in. Cloudflare + admin auth cannot be driven by the agent alone; Kade authenticated, agent drove the UI.

> This is the session where the staged dual-currency engine actually went **LIVE**, both LMCR04 clean-up automations were built (as Drafts), and the paid-ads results page was created. It also uncovered a broken funnel destination (`/snooze` 404) that still needs a decision.

---

## 1. What went LIVE (verified)

### Dual-currency engine — LIVE
- **Global JS** → pasted into **Settings → Site Details → Header Page Scripts** (textarea `site_page_scripts_header`). This is the field the docs call "Custom JavaScript"; it already held the previous `snooze-globals.js` content.
  - **Surgical merge, not overwrite.** The live field had drifted from the repo: it contained two **`schema.org` JSON-LD structured-data blocks** that are NOT in `snooze-globals.js`. New field = `snooze-globals.js` + `currency-toggle.js` + `currency-toggle-fouc.html` + **preserved live-only schema.org blocks**. Result: 57,567 chars, single GTM instance (no double-load), 8/8 `<script>` balanced, LCP preload link first.
  - Old field backed up before overwrite (session scratchpad — ephemeral; re-pull from git + re-merge if ever needed).
- **Currency CSS** → appended to the Encore theme **Custom Code → CSS** (theme `2156873377`, Ace editor `settings-css-input`). +2,698 chars; `.currency-toggle-btn` / `.dynamic-price` / `.checkout-currency-switch` confirmed present after save.

### Verification (live)
- Engine loads site-wide: `window.getSnoozeCheckoutUrl` is a function; `window.__snoozeCurrencyToggle__` present; offerMapping `z63s9VaR→vYgCNgJz`, `mqQikDM7→Sr6KzShx`, `K3Y6FEKX→46Bz9tk6`.
- On the **homepage (`/`)**: default = `currency-mode-usd`, primary checkout CTA → `z63s9VaR/checkout`. After `localStorage.setItem('snooze_currency_preference','AUD'); reload` → `currency-mode-aud` + `currency-aud-selected`, and the primary checkout CTA flips to **`vYgCNgJz/checkout`**. **AU buyers route to the AUD offer. ✓**
- **Could NOT verify the A$119/A$299/A$997 tier display + toggle UI** because that instrumentation lives on the `/snooze` sales page, which is an unpublished draft (404). The homepage has zero `dynamic-price`/`data-aud` elements (so its USD prices are expected, not a bug).

---

## 2. Built as DRAFTS in Kajabi Automations (Marketing → Automations = `/admin/sites/2148291177/workflows`)

Both are **Draft** — Kade to review and flip to Published.

- **A1** — workflow **804108**, "A1 - Membership Purchase → Revoke Free-Module Course (LMCR04)"
  - Trigger: *Offer is purchased* = `PUBMS01_USD_The-Snooze-Membership` (z63s9VaR) **OR** `PUBMS01_AUD_The-Snooze-Membership` (vYgCNgJz)
  - Actions: *Revoke an offer* `LMCR04_5-12M-SCHEDULES` (free opt-in, 2x92uaLF) **and** *Revoke an offer* `LMCR04_OFR_5-12M-Course-Upsell` ($117, Ktxk9mvE)
  - Rationale: both grant access to course product **2149308933**, so revoking both fully clears the duplicate free-module course tile when someone becomes a member. **Extended beyond the runbook's literal "$117 only"** because the *free* opt-in is what actually puts that tile on most funnel members (Ktxk9mvE has ~0 sales).

- **A2** — workflow **804922**, "A2 - $117 Course Purchase → Tag lmcr04-117-buyer"
  - Trigger: *Offer is purchased* = `LMCR04_OFR_5-12M-Course-Upsell` ($117, Ktxk9mvE)
  - Action: *Add a tag* `lmcr04-117-buyer` (tag created this session)

## 3. Paid-ads results/sales page — created (DRAFT)
- Kajabi landing page **id `2152134250`**, theme **`2166700952`**, slug **`snooze-access`** → `https://www.joinsnooze.com/snooze-access` (Kade changed slug from the README's suggested `snooze-access-from-our-ads`).
- Full `pages/landing/snooze-access-paidads/index.html` injected into an Encore **`code` block** (section `paidads_code`, block `c1`), `content_for_index=["paidads_code"]` (blank Hero preset removed).
- `{{privacy_url}}` → `/privacy-policy` at paste time. `SA_CHECKOUT.aud.live=true`, AUD → `vYgCNgJz`. Verified in-field: `data-sa-checkout` ×7, `vYgCNgJz`, trial copy present, test marker gone.
- **Still DRAFT** — publish when the ad campaign is ready. The quiz + thanks funnel steps were NOT built this session (only the results/sales page, per task scope).

## 4. FMLM01 form (2149418596)
- **Left as-is** (Kade's call). Kajabi offers only **Delete** for forms (no Archive); 0 submissions, harmless. Not deleted (avoids breaking any page still embedding it).

---

## 5. Findings / open issues (need a decision)

1. **`/snooze` is a 404 for the public** — it's an unpublished draft landing page (**id `2151633113`**, theme `2163331541`, "Snooze Main Landing"). Kade sees it working because Kajabi renders drafts for logged-in admins; customers hit the 404.
2. **The membership email/lesson/thank-you CTAs point to the dead `/snooze`** (set in a prior session): day-2/4/6 nurture emails, the bridge lesson (2194028428), the thank-you page. These are currently broken for customers.
3. **`/snooze` is a real, full membership sales page but 6-months-stale (last updated Dec 18 2025) and NOT publish-ready:**
   - checkout variable points to the **legacy `6iRarwak`** offer (draft/wrong), not `z63s9VaR`;
   - **zero dual-currency instrumentation** (no `dynamic-price`/`data-aud`) → the live engine wouldn't flip AU buyers to `vYgCNgJz` on it;
   - still contains **"24/7"** banned service-model language.
4. **Homepage (`/`) is the live membership sales page**, but its "Join Snooze" button also points to the legacy **`6iRarwak`** offer (its primary "Start Now" CTA is correctly `z63s9VaR/checkout`). Legacy-slug cleanup still outstanding site-wide.
5. **AUD 1-month-free sequence:** none of the 36 active sequences matches it; the repo `emails-aud/` files already point to `vYgCNgJz`. Could not confirm a live `bEsVXFXG` 404 exists — that flow may be attached to an offer's post-purchase rather than a standalone sequence. Kade to point to it if it exists.

---

## 6. Deploy mechanics learned (for next time)

- **`snooze-globals.js` is an HTML head fragment**, not pure JS (leads with the LCP `<link>`, contains 4 `<script>` blocks incl. GTM + Stape + globals + landing JS v2.40 + nav). It belongs in **Header Page Scripts**, NOT the theme's pure-JS "Custom Javascript" field. Treat the live field as potentially drifted → **merge, don't overwrite** (preserve live-only schema.org / pixels).
- **Theme Custom CSS/JS** = Encore theme → **Settings → Custom Code** (two Ace editors: `settings-css-input`, `settings-js-input`). Read/write via `ace.edit(node).getValue()/setValue()`.
- **Kajabi trigger→action automations** live under **Marketing → Automations** (`/admin/sites/<id>/workflows`). "New automation" → "Or, start from scratch". The dark action buttons need **trusted mouse events** (`agent-browser mouse down/up`) — synthetic `click` silently no-ops. One "Offer is purchased" trigger = one offer; use multiple triggers for OR.
- **Encore `code` block** (raw HTML/JS): settings key is **`code`**. Inject via `update_theme_content` (`{type:"section", blocks:{c:{type:"code", settings:{code:"<html>"}}}, block_order:["c"]}` + `content_for_index`) or via the builder's Ace editor + native setter.
- MCP `get_theme_content` responses for these pages exceed the 200KB / token cap — use `section_filter` + grep the persisted file, or `fields`.
