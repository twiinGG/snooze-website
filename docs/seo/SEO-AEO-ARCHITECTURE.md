# SEO / AEO Architecture — Technical Foundation

> Status: locked spec, ships as a free rider inside the currency page wave (`PER-PAGE-EXECUTION-SPEC.md`), not as its own project. This document is the "tech" step of the geo-seo tech -> GEO -> content sequence; see boundary note in §6.
>
> Related: [../dynamic-currency/TOGGLE-UX-SPEC.md](../dynamic-currency/TOGGLE-UX-SPEC.md), [../dynamic-currency/PER-PAGE-EXECUTION-SPEC.md](../dynamic-currency/PER-PAGE-EXECUTION-SPEC.md), [../../../../docs/projects/geo-seo/](../../../../docs/projects/geo-seo/) (the separate discoverability project — pillar content, Reddit/YouTube presence, SOV re-measurement; this document does not cover any of that).

## 1. Governing principle: static HTML is the citable surface

Most AI crawlers do not execute JavaScript. Even for Google, only the default-rendered (pre-interaction) state is dependable for indexing and rich results. Three consequences follow from this, and they are design rules, not preferences:

1. **Both currencies must live in the static DOM.** Instrumented prices already do this correctly (`data-usd`/`data-aud` attributes plus USD-default visible text — the toggle only changes which attribute is read into the visible node, the data for both is present at load). Where a price is an answerable fact (membership tiers, FAQ answers), the visible static copy states both explicitly: `"US$79/month (A$119 for Australian families)"`. This lets an AI system cite either market correctly without ever running the toggle's JS.
2. **Runtime enhancers cannot fix copy or SEO.** Banned copy, credential facts, meta tags, and schema must be corrected in source HTML, not patched at runtime. A JS enhancer that rewrites a price on click is invisible to a crawler that never clicks. This is the argument that kills "runtime enhancers everywhere" as a general deploy method (see §5 of the parent plan; the homepage's current `home-pricing-enhance.html` runtime patch is a known exception being retired, not a pattern to repeat).
3. **Pricing transparency is itself an AEO asset.** AI answer engines preferentially cite pages that show real, visible pricing (ai-seo skill finding). The dual-currency work, done at the HTML source level, directly advances discoverability rather than merely avoiding harm to it.

## 2. Structured data

One `@graph` JSON-LD block per page. Ships in the same paste as the currency/copy work for that page — see the per-page checklist in `PER-PAGE-EXECUTION-SPEC.md`.

### 2.1 Organization (site-wide)

Lives in Header Page Scripts (some already live there). **Merge into the existing block, never duplicate.** Fields: `name`, `url`, `logo`, `sameAs` (socials, podcast).

### 2.2 Person — Sally

Ships on: homepage, about-Sally page, all 4 age pages.

```json
{
  "@type": "Person",
  "name": "Sally Woods",
  "jobTitle": "Internationally certified sleep consultant",
  "description": "Internationally certified sleep consultant and former paediatric nurse. Founder of The Sleep Concierge and the Snooze membership for baby and toddler sleep."
}
```

**This is the P0 fix for the June GEO baseline's Gemini fabrication** ("Registered Nurse") — pinning the correct entity fact in machine-readable form at the source is the fix, not a copy edit alone. `jobTitle` must read exactly `"Internationally certified sleep consultant"`; the description must carry `"former paediatric nurse"` verbatim, every time the credential is stated. Never `"Registered Nurse"`, `"Registered Paediatric Nurse"`, or any phrasing implying current/practising nurse status. Canonical wording source: `docs/brand/SALLY-POSITIONING.md`.

**Known drift to fix, not just avoid repeating:**
- `apps/snooze-website/kajabi-deployment/global/html/schema-organization.html` line 35 currently has `"jobTitle": "Paediatric Sleep Consultant"` — wrong, must become `"Internationally certified sleep consultant"` before this file ever ships (it is drafted, not confirmed live).
- `apps/snooze-website/kajabi-deployment/pages/website/about-sally/about-sally.html` line 353 has `"jobTitle": "Sleep Consultant"` — also wrong, same fix needed. Note: the same file's *body copy* (lines 28, 72, 213, 218) already carries the correct "internationally certified sleep consultant and former paediatric nurse" phrasing throughout — only its JSON-LD `jobTitle` field is stale. Fix the JSON-LD to match the body, don't touch the body.
- The **live** Person JSON-LD block (shipped site-wide via Header Page Scripts) has never been audited for wording — do that read before writing anything, per Phase 1f of the execution plan. It may be the actual source feeding the Gemini fabrication, in which case fixing it alone (without touching the two drafted files above) could close the P0.

### 2.3 Product + two Offers

Ships on: each product/membership pricing surface (homepage, 5 product pages, 4 age pages, consultations, StoreV2).

One `Offer` per currency:

```json
{
  "@type": "Product",
  "name": "...",
  "offers": [
    { "@type": "Offer", "priceCurrency": "USD", "price": "79.00", "availability": "https://schema.org/InStock" },
    { "@type": "Offer", "priceCurrency": "AUD", "price": "119.00", "availability": "https://schema.org/InStock" }
  ]
}
```

This is the standard schema.org multi-currency pattern (array of `Offer` under one `Product`, one per currency) — do not invent a custom shape. Verify once, on the template page (5-12 Month age page, per the execution spec), using Google's Rich Results Test — never `curl` for schema validation, since Rich Results Test executes JS and reflects what Google actually parses; a curl-based check only proves the markup is present, not that it validates (seo-audit skill limitation note).

**Rule tying this to currency work:** any price whose offer lacks an AUD twin (tier-2 pending slugs) stays explicitly currency-neutral in both the visible copy and the schema (`"US$129"`, single-currency `Offer` only) until the twin exists. Never emit an `Offer` with `priceCurrency: AUD` for an offer that checks out in USD.

### 2.4 FAQPage

Ships on: 4 age pages, homepage pricing FAQ. 40-60 word direct answers, question-phrased H3s in the visible copy (the extractability pattern AI answer engines parse for). A drafted glossary FAQPage JSON-LD and a full FAQPage block already exist in `docs/dynamic-currency/SNOOZE-TECHNICAL-REFERENCE.md` for reuse — check that file before writing new FAQ schema from scratch.

### 2.5 BreadcrumbList

Ships on: age pages, product pages.

### 2.6 What NOT to duplicate

Every page currently ships 2 identical JSON-LD script blocks (`ImageObject`, `Organization`, `Person`, `WebSite`) — confirmed live on all 11 swept pages including the 404. Adding `Product`/`Offer`/`FAQPage`/`BreadcrumbList` must merge into the existing `@graph` array on that page, never emit a second competing `Organization` or `Person` block.

## 3. IA / internal linking / indexability

- **Hub-and-spoke model:** homepage (membership hub) <- age pages (spokes). Every age page cross-links its adjacent age stages and links up to the homepage membership section. No orphan pages.
- **`/snooze-access` -> `hide_from_search_engines: true`.** Paid-ads-only page, thin/duplicate content, already flagged; do it in this pass (MCP, mechanical).
- **`/snooze` stays unpublished.** No duplicate-membership-page risk while it's dead. If rebuilt later (inside the discoverability project, per the boundary in §6), it becomes the dedicated "Snooze Membership" SEO page with proper canonical discipline against the homepage. Do not repoint anything new at it in this pass.
- **Titles/meta:** every money page gets a real `page_title`/`page_description` (several are currently null — confirmed on `/snooze-access` in the live sweep). Written once, during the page wave, not as a separate pass.
- **robots.txt already allows all AI crawlers** (verified in the June baseline). Do not regress this in any change made under this spec.
- **404/canonical hygiene:** `/snooze` currently serves a self-referential canonical pointing at its own dead URL with no `noindex`. Should either drop the canonical tag entirely or add `noindex` — batch into the wave as a minor hygiene item, not a standalone task.

## 4. Performance guardrails

- **CLS < 0.1**, achieved via `font-variant-numeric: tabular-nums`, reserved price-span widths, the existing FOUC guard (`currency-toggle-fouc.html`), and the fixed-width toggle from `TOGGLE-UX-SPEC.md` §2.2. This is a shared guardrail with the toggle spec, not a separate SEO-only concern — CWV and AEO both depend on the same fix.
- **Header Page Scripts field is already ~62KB inline and render-relevant.** Hard cap: nothing new lands there except the reworked toggle engine. The homepage runtime enhancer (`home-pricing-enhance.html`) is retired once the homepage goes source-level (Phase 2a of the execution plan) — do not add new runtime patches to this field going forward.
- Full Core Web Vitals audit (LCP/INP, not just CLS) belongs to the discoverability project, not this pass. This pass's obligation is narrower: don't add weight, fix the CLS sources currency instrumentation itself introduces.

## 5. Live-sweep-confirmed baseline (what this spec is correcting)

From `LIVE-SWEEP-2026-07-02.md` (committed copy of the sweep; see that file for full detail):

- JSON-LD is thin and identical on every page: 2 script blocks (`ImageObject`, `Organization`, `Person`, `WebSite`), zero `Product`/`Offer`/`FAQPage`/`Course`/`BreadcrumbList` schema anywhere, including on the course pages and Camp Snooze — the pages with the strongest AEO/rich-result candidacy today.
- No `noindex` anywhere, including `/snooze-access` and the `/snooze` 404.
- The live Person block's wording is unaudited (see §2.2 above — audit before writing new schema).

## 6. Boundary with the discoverability project

This pass ships the on-site technical foundation only: schema (including dual-currency Offers), compliant entity facts pinned in JSON-LD, titles/meta, indexability hygiene (noindex/hide_from_search_engines), and static both-currency pricing facts in visible HTML. That is the "tech" step of the geo-seo tech -> GEO -> content sequence documented in `../../../../docs/projects/geo-seo/STRATEGY.md`.

**Explicitly out of scope here, and NOT blocked by anything in this document:**
- Category pillar content (early-rising, AU-parents topics) — separate project.
- Reddit/YouTube presence building — separate project.
- SOV (share-of-voice) re-measurement against the June 2026 baseline (branded ~100%, non-branded/category 0%) — separate project, re-run after this pass's technical fixes have had time to be crawled/indexed.

The single-batched-release directive from the geo-seo strategy doc is honoured by shipping schema + entity-fact fixes now (cheap, high-leverage, rides along with currency work) rather than waiting for the content phase to bundle everything together.
