# Site-Wide Dual-Currency — Next-Session Kickoff

> **CURRENT as of 2026-07-01.** Full record: **[SESSION-2026-07-01-parity-phase-a-and-funnel-fix.md](./SESSION-2026-07-01-parity-phase-a-and-funnel-fix.md)**. Engine architecture: **[Currency-Toggle-Technical-Brief.md](./Currency-Toggle-Technical-Brief.md)**. Deploy mechanics: **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)**.
>
> **State:** dual-currency engine is LIVE. Front-end parity **Phase A (inline + sticky toggle mounts) is built + tested in repo but NOT deployed live.** Phase B not started. LMCR04 `/snooze` funnel fix is done on the bridge lesson + thank-you page + all repo source; **3 live drip emails remain**.

Paste the block below into a new Claude Code session in the Snooze OS repo to resume.

---

```
Continuing the SITE-WIDE dual-currency FRONT-END PARITY build (Phase A deploy + Phase B). READ FIRST:
  apps/snooze-website/docs/dynamic-currency/SESSION-2026-07-01-parity-phase-a-and-funnel-fix.md
  (engine architecture: apps/snooze-website/docs/dynamic-currency/Currency-Toggle-Technical-Brief.md)
Recall memory: dual-currency-slug-reconciliation, lmcr04-membership-pivot,
  kajabi-admin-ui-deploy-mechanics, service-model-language-no-live-coaching, sally-positioning-standard.

ACCESS: headed agent-browser (Chromium + stealth) into app.kajabi.com; I (Kade) log in first.
  Kajabi admin site 2148291177. Dark buttons/menu items need TRUSTED mouse events (agent-browser
  mouse move/down/up), not synthetic click. Switch to the Kajabi tab first (agent-browser tab).
  Workflow publish persists ONLY from the LIST-row status dropdown, NOT the in-editor one.
  MCP toolsets cap at 3 active; enable_toolset as needed (pages/courses/navbars/themes/emails).

ALREADY DONE — DO NOT REDO:
  • Dual-currency JS engine LIVE (Header Page Scripts merge + theme CSS). AUD→vYgCNgJz verified on homepage.
  • A1 (804108) + A2 (804922) automations PUBLISHED. Paid-ads /snooze-access (2152134250) PUBLISHED.
  • /snooze CTA fix: bridge lesson 2194028428 (live) + thank-you page thankyou/2x92uaLF (live) +
    7 repo email/html source files. Currency engine Phase A code (inline+sticky mounts) built + 20/20 tests pass.

PRIMARY OBJECTIVE THIS SESSION — Phase A live deploy, then Phase B, then CHECKPOINT with me.

  PHASE A DEPLOY (delicate; do first): the repo now has an updated
  kajabi-deployment/global/js/currency-toggle.js that adds placeholder-driven INLINE
  (.sn-currency-inline) + STICKY (.sn-currency-sticky) toggle mounts (change is PURELY ADDITIVE —
  34 lines, no existing lines modified), plus matching CSS in
  kajabi-deployment/global/css/currency-toggle.css. Deploy it:
    1. Find the working Site Details settings URL (last session's
       /admin/sites/2148291177/settings/site_details/edit 404'd). The field is
       textarea#site_page_scripts_header ("Header Page Scripts").
    2. Read the live field (~57K chars). It DRIFTS from repo (live-only schema.org + pixels) — MERGE,
       never overwrite. Splice: replace the OLD currency-toggle.js <script>...</script> block with the
       NEW one. Verify single occurrence, <script> tag balance, sane length delta (+~1KB) BEFORE saving.
    3. Update theme Custom Code CSS (theme 2156873377, Ace settings-css-input) with the new
       .sn-currency-inline / .inline-currency-toggle / .sticky-currency-toggle / .sn-currency-sticky-bar rules.
    4. Verify: on an already-instrumented page (e.g. an age-page), drop a <div class="sn-currency-inline">
       and confirm a visible toggle appears + flips prices/CTAs logged-out (AU + US).

  PHASE B (membership surface, then checkpoint):
    • Homepage (live theme 2156873377): instrument membership prices with data-usd/data-aud, add a
      .sn-currency-inline placeholder in the pricing area, and fix the secondary "Join Snooze" button
      (/resource_redirect/offers/6iRarwak → z63s9VaR). Identify the button's section from the live DOM,
      then section_filter that section (140+ shared sections; do NOT full-dump the theme).
    • /snooze rebuild (landing 2151633113, theme 2163331541): 6iRarwak → z63s9VaR, add currency
      instrumentation + inline toggle, STRIP "24/7" (banned), publish. Then optionally repoint the
      membership CTAs (currently → /) back to /snooze.
    • STOP and checkpoint with me before Phase C/D/E.

  ALSO fold in (confirm destinations with me):
    • 3 live drip emails in sequence EMLM04_5-12m Schedule LM Flow (2148765283) still link bare /snooze:
      Day 2 2150967901, Day 4 2150967914, Day 6 2150967944. Editor: admin/email_sequence_emails/<id>/edit
      → Edit content → click the "Explore the Snooze Membership" button → URL joinsnooze.com/snooze?...
      → joinsnooze.com/?... (keep utm) → Save. NOTE: classic Froala editor is NOT reliably automatable
      (Save serializes its internal model, not the DOM) — do these with me manually or via the Froala
      link-popup UI.
    • bEsVXFXG (deleted) in 4 AUD 1-month-free upgrade emails — locate the live AUD sequence (not among
      the 36 active sequences); if live, repoint upgrade button → vYgCNgJz.
    • Bridge lesson 2194028428 claims "Live Q&A sessions with the Snooze Specialists" — check against the
      no-live-coaching rule; rewrite only with Sally's sign-off on what's actually offered.

  LATER (after checkpoint):
    • Phase C: add .sn-currency-inline placeholder to already-instrumented main-offer pages (4 age, 5
      product, consultations, StoreV2, cold-traffic) + verify.
    • Phase D: create AUD twin offers for tier-2 pending slugs W2PyqL2X, 9DFJSwVD, omMcVgAi, FktmJAvJ,
      rVuLzkZa, Lzouupsm in Kajabi admin (NEEDS my pricing sign-off; first map each slug → product),
      then wire into currency-toggle.js offerMapping + move out of tier2PendingSlugs (update the test).
    • Phase E: verify every surface logged-out, AU + US, toggle round-trips, checkout resolves correctly.
    • Set /snooze-access to noindex (paid-ads-only page).

  founding-member page = DEAD, ignore (do not sweep its 6iRarwak).

VERIFY after any change: load LOGGED-OUT, links resolve 200 (not /snooze 404), AU sees AUD + vYgCNgJz,
US sees USD + z63s9VaR, toggle round-trips.
```

---

## Canonical IDs (verified live 2026-06-30/07-01)
- Membership: `z63s9VaR` (USD 2150754998) ↔ `vYgCNgJz` (AUD 2151256977; A$119/A$299/A$997 vars 161174/161175/161176)
- 7-day trial: `mqQikDM7` (USD) ↔ `Sr6KzShx` (AUD); Camp `K3Y6FEKX` ↔ `46Bz9tk6`
- Free-module course product **2149308933**; live website theme **2156873377**; site **2148291177**
- Nurture sequence `EMLM04_5-12m Schedule LM Flow` = **2148765283** (Day 2 2150967901 / Day 4 2150967914 / Day 6 2150967944)
- Thank-you 2151810974 (theme 2164551197); bridge lesson 2194028428; `/snooze` draft 2151633113 (theme 2163331541)
- `bEsVXFXG`/2151212200 = DELETED; `6iRarwak` = legacy draft to retire
- Tier-2 pending AUD twins: `W2PyqL2X, 9DFJSwVD, omMcVgAi, FktmJAvJ, rVuLzkZa, Lzouupsm`
