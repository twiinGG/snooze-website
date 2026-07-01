# Site-Wide Dual-Currency — Next-Session Kickoff (PLANNING)

> **CURRENT as of 2026-07-01 (2nd session).** Full record: **[SESSION-2026-07-01-parity-phase-a-and-funnel-fix.md](./SESSION-2026-07-01-parity-phase-a-and-funnel-fix.md)**. Engine architecture: **[Currency-Toggle-Technical-Brief.md](./Currency-Toggle-Technical-Brief.md)**. Deploy mechanics: **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)**.

## Where we actually are (read this before planning)

**LIVE + verified:**
- Currency **engine** is live site-wide (Header Page Scripts on site `2148291177`). Phase A inline/sticky placeholder mounts + first-load labelling are live.
- **Round-trip bug fixed** in `updateLinks` (compared target vs stored original href → AUD href stranded on switch-back to USD; now compares vs current href). Repo `kajabi-deployment/global/js/currency-toggle.js` + DOM regression test; suite 21/21.
- **Homepage `/`**: header "Join Snooze" repointed `6iRarwak → z63s9VaR` (MCP). The **3 membership tier cards** switch `$79/$197/$657 ↔ A$119/A$299/A$997`, tier CTAs `z63s9VaR ↔ vYgCNgJz`, via a runtime enhancer in the header field (`kajabi-deployment/global/js/home-pricing-enhance.html`). Round-trips.
- Paid-ads `/snooze-access` and Camp Snooze were already currency-enabled.

**NOT done / broken / bigger than the old plan assumed:**
1. **Homepage is NOT finished.** Only the 3 tier cards switch. In AUD mode these prices STAY USD: the **value-comparison table** (`$468/$150+/$108+/$320/$180/$90/$130`, `VALUE (USD)` header), the **price-anchoring section**, the **consultation prices** (`$390 USD`, `$690 USD`, `$445`, `$205`, `$3,500`), the "individual courses `$117`-`$129`" line. Plus **wrong/stale phrasing in multiple spots** (full copy review needed, not just currency).
2. **Toggle UX is wrong.** The control is a single button showing the CURRENT currency (e.g. "🇦🇺 AUD"); it does not read as a switch. Redesign to: clearly toggle BETWEEN USD and AUD (e.g. a two-segment `USD | AUD` control with an active state), MORE SUBTLE, and NOT positioned as the pricing-section header. Touches `createToggleButton`/`updateToggleUI` in `currency-toggle.js` + `.currency-toggle-btn`/`.sn-currency-inline` CSS + placement.
3. **Main-offer pages are NOT instrumented LIVE** (the old plan wrongly assumed they were). `/5-12-month-baby-sleep-help`, `/newborn-baby-sleep-help`, `/3-4-month-baby-sleep-help`, `/toddler-sleep-help`, `/5-12-month-baby-sleep-course` all show `.dynamic-price`=0 / `[data-aud]`=0 live — they are STALE pre-instrumentation versions (static "$197 USD"). The **repo** files have the instrumentation but it was never deployed. Real work = deploy instrumented versions to ~10 live custom-code blocks.
4. **Compliance copy** is baked into the repo page versions AND live copy: "Live sessions with the Snooze Specialists", "No live sessions", "Lifetime access", homepage hero "24/7". Banned by `service-model-language-no-live-coaching` + Sally-positioning ("Access with the Snooze Membership"). Needs a copy pass with Sally sign-off on what's actually offered — can't just deploy repo versions as-is.
5. **`/snooze`** (landing `2151633113`) is a full 20-section stale draft (404), also carrying "weekly coaching" language. Deferred; a content+compliance+publish project.
6. **Phase D**: tier-2 slugs `W2PyqL2X, 9DFJSwVD, omMcVgAi, FktmJAvJ, rVuLzkZa, Lzouupsm` still have no AUD twins (round-trip unchanged until created in Kajabi admin; needs Kade pricing sign-off; then wire `offerMapping` + move out of `tier2PendingSlugs` + update the test).

## Deploy mechanics learned (critical — saves hours)
- **Header Page Scripts field** = `/admin/sites/2148291177/edit/site-details`, `textarea#site_page_scripts_header` (NOT `/settings/site_details/edit`, which 404s). It DRIFTS from repo (live-only schema.org + pixels) — MERGE, never overwrite. Read via `agent-browser eval`, splice with a `node` script, write back via base64-decode `setValue`. **Save reliably with `el.form.requestSubmit(saveBtn)`** — the coordinate-click Save is flaky. Verify `<script>` balance + length delta + preserved GTM/schema before saving.
- **Theme custom CSS/JS** (`settings-css-input` / `settings-js-input`): Encore customizer → Settings tab → Custom Code → Ace editor. Programmatic `ace.edit(node).session.insert/setValue` + top Save DOES persist here.
- **Section custom-code blocks** (e.g. homepage `1768118757163_0`, 50KB): the customizer's block-code Ace editor will NOT persist a programmatic edit (tried setValue, dirty-nudge, input/change, blur — never saves). And MCP `update_theme_content` would require re-emitting the whole `code` string (corruption risk at 50KB). This is why the homepage was done via a runtime enhancer instead of source instrumentation. **Resolve a reliable path for section-block code BEFORE mass page deploys** (options to evaluate: MCP full-block emission with SHA verify + revert net; runtime enhancers per page; or the raw theme file editor at `/admin/themes/<id>/edit`).
- **Structured section settings** (link fields, headings, button URLs) via MCP `update_theme_content` deep-merge = clean and reliable (used for the header button).
- Kajabi MCP: `select_site` then `enable_toolset` (cap 3 active, LRU-evicted). Toolsets used: `themes`, `pages`. `get_theme_content` caps at 200KB — use `section_filter` + `fields:["settings"]`.
- **Verify LIVE + logged-out** (agent-browser's joinsnooze.com session is NOT the Kajabi admin session, so drafts 404 for it — can't preview drafts via storefront; use MCP `section_filter` or the admin preview).

---

## PASTE THIS INTO A NEW SESSION (planning task)

```
PLAN the completion of the SITE-WIDE dual-currency FRONT-END PARITY build. Do NOT start editing —
produce a plan for my approval first (use plan mode). READ FIRST:
  apps/snooze-website/docs/dynamic-currency/NEXT-SESSION-KICKOFF.md   (state + deploy mechanics)
  apps/snooze-website/docs/dynamic-currency/SESSION-2026-07-01-parity-phase-a-and-funnel-fix.md
  apps/snooze-website/docs/dynamic-currency/Currency-Toggle-Technical-Brief.md
Recall memory: dual-currency-slug-reconciliation, kajabi-admin-ui-deploy-mechanics,
  service-model-language-no-live-coaching, sally-positioning-standard, lmcr04-membership-pivot.

ACCESS: headed agent-browser into app.kajabi.com (I log in first), Kajabi MCP (site 2148291177),
  themes + pages toolsets. Save the Header field with el.form.requestSubmit(saveBtn).

STEP 1 - FULL LIVE SWEEP (audit, logged-out). Build a table of EVERY page that shows pricing
  (homepage, /snooze, all 4 age pages, all 5 product/course pages, consultations, StoreV2,
  cold-traffic, /snooze-access, Camp Snooze, checkout pages). For each: live URL + status
  (200/404/draft), engine present?, LIVE counts of .dynamic-price / [data-aud] / .dynamic-cta,
  which prices DON'T switch in AUD mode, lingering "USD" labels, legacy offer slugs
  (6iRarwak/dRN7QR7k/bEsVXFXG), and banned copy (24/7, live/weekly coaching/sessions, "Lifetime
  access"). Reconcile LIVE state against the repo page files (kajabi-deployment/pages/**) — the repo
  is instrumented but much of it was never deployed. Write the reconciliation to a doc.

STEP 2 - TOGGLE UX REDESIGN spec. Current toggle is a single button showing the current currency;
  redesign to a clear, subtle two-state USD|AUD switch (active-state styling), correctly placed
  (NOT the pricing-section header). Spec the change to createToggleButton/updateToggleUI + CSS +
  placement; keep engine behaviour (setCurrency, round-trip fix) intact.

STEP 3 - PRODUCE THE PLAN, priority order:
  (a) FINISH THE HOMEPAGE: instrument (or currency-neutralise) EVERY price (value-comparison table,
      price-anchoring, consult prices, "individual courses" line), not just the 3 tier cards; fix
      standalone "USD" labels; fix wrong/stale phrasing (copy review vs brand + service-model +
      Sally-positioning); apply the redesigned toggle.
  (b) A REPEATABLE PER-PAGE DEPLOY METHOD for the stale main-offer pages (resolve the section
      custom-code-block save problem FIRST). Start with ONE age page as the template, then the rest.
  (c) COMPLIANCE COPY PASS (Live sessions / weekly coaching / 24-7 / Lifetime access) — flag every
      claim for Sally sign-off; do NOT invent benefit claims.
  (d) /snooze rebuild + publish decision.
  (e) Phase D: create AUD twins for W2PyqL2X, 9DFJSwVD, omMcVgAi, FktmJAvJ, rVuLzkZa, Lzouupsm
      (needs my pricing), wire offerMapping + move out of tier2PendingSlugs + update the test.
  (f) Phase E: verify every surface logged-out, AU + US, toggle round-trips, checkout resolves.

Sequence the plan, call out dependencies (compliance sign-off, pricing sign-off, the block-save
method) and anything needing my decision. Then stop for approval.
```

---

## Also outstanding from earlier (not currency-parity, but open)
- **3 live drip emails** in sequence `EMLM04_5-12m Schedule LM Flow` (2148765283) still link bare `/snooze`: Day 2 `2150967901`, Day 4 `2150967914`, Day 6 `2150967944`. Froala editor; manual or drive the link-popup UI.
- **`bEsVXFXG` AUD upgrade emails**: locate the live AUD 1-month-free sequence; if live, repoint upgrade button → `vYgCNgJz`.
- **`/snooze-access`**: set `hide_from_search_engines: true` (paid-ads-only page).
