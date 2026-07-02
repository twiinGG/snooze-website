# Per-Page Execution Spec — Deploy Protocol + Page Wave Checklist

> Status: locked spec. Governs Phase 1b (deploy-method proof), Phase 2 (money path), and Phase 3 (page wave) of the strategic plan. Read alongside [TOGGLE-UX-SPEC.md](./TOGGLE-UX-SPEC.md) and [../seo/SEO-AEO-ARCHITECTURE.md](../seo/SEO-AEO-ARCHITECTURE.md) — every page touch in this spec carries currency + copy + schema together, in one paste, per the "touch each page ONCE" principle.

## 1. Verify/revert protocol (verbatim — applies to EVERY write path, browser or MCP)

1. Read the block's current content (MCP `section_filter` or Ace API) -> persist byte-exact to `kajabi-deployment/_live-preimages/<page>/<block>.html`, commit. This is the revert net.
2. Build the new block content in the repo page file (single source of truth), run validation (placeholder scanner, script-tag balance, size delta sanity, banned-phrase grep).
3. Write via the surface's selected method (builder-Ace or MCP full-block; MCP quirk: rapid successive single-block writes coalesce/no-op — batch a page's blocks into one write; wait and re-read between pages).
4. Re-fetch (MCP or Ace re-read) -> byte-compare persisted vs intended. Mismatch -> STOP, re-emit the pre-image.
5. Verify live logged-out (curl grep for sentinel strings and instrumentation counts; agent-browser AUD-mode check on money pages).
6. Rollback = re-emit the committed pre-image (test the rollback once during the proof, before the wave starts).

## 2. Step 1 census field list (Phase 1b — do before choosing per-page methods)

The logged-out sweep sees rendered output, not where code lives. Inside the CMS, code is spread across surfaces that drift independently from the repo. For EVERY money page plus the 4 checkouts, the census records:

- Page type (website page vs landing page), theme id.
- Section/block ids carrying custom code.
- Ace field ids for each editable surface.
- Any per-page CSS/JS fields and WYSIWYG HTML areas.
- Each field's actual content (read via Ace API or `agent-browser eval`), diffed three ways: CMS field content vs matching repo file vs logged-out rendered HTML.
- Which editor persists which write path (see known facts, §3, below — the census confirms or corrects these per-page).

Output: `KAJABI-CODE-SURFACE-MAP.md` (per-page code-surface map — this doubles as the drift audit for live-only code that must be preserved in every merge).

## 3. Known write-path facts (confirmed as of 2026-07-01; census re-verifies per-page, does not re-derive from scratch)

| Surface | Editor | Persists? |
|---|---|---|
| Site Header Page Scripts (`textarea#site_page_scripts_header`, at `/admin/sites/2148291177/edit/site-details`) | Save via `el.form.requestSubmit(saveBtn)` | Yes — coordinate-click Save is flaky, `requestSubmit` is reliable |
| Theme-level Custom Code CSS/JS (`settings-css-input` / `settings-js-input`, Encore customizer -> Settings tab -> Custom Code -> Ace) | `ace.edit(node).session.insert/setValue` + top Save | Yes |
| Landing-page BUILDER block Ace (in-place block editing) | Trusted-click into iframe + `ace.edit().setValue` + real dirty keystroke + trusted-click Save | Yes — proven on the thank-you page (theme Custom Code block `1768959076279_0`) |
| CUSTOMIZER block Ace (section-block code editor in the Encore customizer) | Programmatic `setValue`, dirty-nudge, input/change dispatch, blur | **No** — tried all of these on the homepage's 50KB block; MCP re-fetch showed the code never changed. This is why the homepage shipped via a runtime enhancer instead of source instrumentation, and why Phase 1b must resolve a real path before the wave. |
| MCP `update_theme_content` full-block emission | Structured-settings deep-merge (button URLs, headings) | Yes, clean and reliable for small structured fields |
| MCP `update_theme_content` full-block emission | Whole-block `code` string re-emission (large blocks, e.g. 50KB homepage section) | Works but re-emits the entire block verbatim — corruption risk at large sizes if not byte-verified per step 4 above; rapid successive single-block writes coalesce/no-op, so batch a page's writes |

**The earlier "block-save is blocked" conclusion conflated the customizer path (blocked) with the builder path (works).** The builder-Ace path may already be the answer for the page-wave section blocks — prove this on the template page before assuming a fallback is needed.

## 4. Per-surface method selection (preference order)

1. **Builder-Ace via agent-browser** (trusted-click into iframe + `ace.edit().setValue` + real keystroke dirty + trusted-click Save) — for landing-page section blocks; already proven once (thank-you page).
2. **MCP `update_theme_content` full-block emission**, with the hardened protocol in §1 — for surfaces where MCP round-trips cleanly and block size is manageable.
3. **MCP structured-settings deep-merge** — for button URLs/headings (already proven, e.g. the homepage header CTA repoint).
4. **Raw theme-file editor probe** (`/admin/themes/<id>/edit`) — a 15-minute check, adopt only if strictly better for very large blocks than options 1-3.

Runtime enhancers are rejected as the standard method: invisible to non-JS crawlers (fails the AEO goal per `../seo/SEO-AEO-ARCHITECTURE.md` §1), cannot fix copy/schema/meta, and add stack fragility to an already-62KB Header field.

**Before the wave:** prove the selected method end-to-end, including a rollback drill, on ONE low-risk page (cold-traffic or the toddler age page). Homepage goes LAST in its phase, using the proven method, with a Fable-tier review of the assembled block before paste.

## 5. Per-page checklist (Phase 3 template — apply to every page in the wave)

Every page touch in the wave carries all of the following in one paste:

- [ ] SECTION 7 replacement (the shared `SECTION 7: LIVE COACHING & REPLAYS` template block, present on all 11 swept pages — one rewrite cleans most instances site-wide; see the compliance copy pack for the approved replacement text).
- [ ] "Lifetime access" -> approved replacement (9 files: all 5 product pages, StoreV2, and the age pages — see §7 target table for which pages).
- [ ] Toggle placeholder div added (`<div class="sn-currency-inline"></div>` or `.sn-currency-sticky` per `TOGGLE-UX-SPEC.md` §4) — one per pricing section on the page.
- [ ] JSON-LD `@graph` additions per `../seo/SEO-AEO-ARCHITECTURE.md` §2: `Product`+`Offer` (both currencies) on pricing surfaces, `FAQPage` on age pages + homepage, `BreadcrumbList` on age/product pages. Merge into the existing block; never duplicate `Organization`/`Person`.
- [ ] Title/meta: real `page_title`/`page_description` (several are currently null).
- [ ] Both-currency static pricing line where a price is an answerable fact (e.g. `"US$79/month (A$119 for Australian families)"`).
- [ ] Banned-phrase grep (zero hits): `24/7`, "live coaching"/"weekly coaching"/"replay(s)" outside the Camp Snooze exemption, "Lifetime access", "Registered Nurse"/"Registered Paediatric Nurse". Exemptions: "Live sessions with the Snooze Specialists" (approved framing), Camp Snooze "daily group coaching calls" (real live cohort, explicitly exempt), testimonial quotes containing "24/7" (customers' own words — leave as-is).
- [ ] Placeholder scanner (no unreplaced `{{...}}` or template markers).
- [ ] Script-tag balance check (opening/closing `<script>` count matches pre-edit).
- [ ] Size-delta sanity check (no runaway diff suggesting truncation or duplication).
- [ ] Legacy-slug grep: zero `6iRarwak`, `bEsVXFXG`, `dRN7QR7k` outside comments (and even comment instances should be stripped at this touch, not left for later).

After a Cursor/Codex pass over repo files, ALL of the above checks run again, personally, in the main session, before anything deploys — never trust an agent's "done" on this list (see `docs/MULTI-AGENT-COPY-REMEDIATION-METHODOLOGY.md`).

## 6. Page-by-page target table

Assembled from `LIVE-SWEEP-2026-07-02.md` (live, logged-out, 2026-07-02) and the repo instrumentation counts (`docs/projects/paid-media-and-dual-currency-v1/live-baselines-2026-07-02/instrumentation.txt`). `dp` = `.dynamic-price` count, `daud` = `[data-aud]` count, `cta` = `.dynamic-cta` count, `chk` = `[data-checkout]` count. "Repo" counts are from the matching `kajabi-deployment/` source file; "Live" counts are from the sweep. A gap between them is pure deployment lag, not missing instrumentation work.

| Page | Live URL | Repo file | Live dp/daud/cta | Repo dp/daud/cta/chk | Banned-copy (live) | Deploy status | What rides in this one touch |
|---|---|---|---|---|---|---|---|
| Home | `/` | (homepage — one 50KB Encore custom-code block, section `1768118757163_0`, plus `home-pricing-enhance.html` runtime enhancer) | 9/1/7 (tier cards only, via runtime enhancer) | n/a (source block never receives static instrumentation while customizer block-Ace is blocked) | 24 hits (highest density; H1 "24/7", "Weekly Live Coaching" x3+, "Paediatric Nurse" mentions) | Runtime-enhancer-patched, NOT source-instrumented; retire enhancer once source path proven (Phase 2a) | Full price sweep (value-comparison table, price-anchoring, consult prices, "$117-$129" line), H1 fix, SECTION 7 equivalent, Product+FAQPage JSON-LD, toggle v2 placement, title/meta |
| Newborn | `/newborn-baby-sleep-help` | `pages/website/age-pages/newborn-page-complete.html` | 9/1/7 (shared header script only — page body static) | 7/7/8/8 | 9 hits | Repo instrumented, NOT deployed | SECTION 7 swap, "Lifetime access" fix, toggle placeholder, Product+FAQPage+BreadcrumbList JSON-LD, title/meta, both-currency static line |
| 3-4 Month | `/3-4-month-baby-sleep-help` | `pages/website/age-pages/3-4-month-page-complete.html` | 9/1/7 | 7/7/8/8 | 13 hits + **`6iRarwak` x3 live CTAs (wrong apex, sleepconcierge.com.au)** | Repo instrumented, NOT deployed; **has an active conversion-breaking hotfix independent of the wave (Phase 1a)** | Hotfix first (3x CTA repoint to `z63s9VaR`/joinsnooze.com), then same checklist as Newborn |
| 5-12 Month | `/5-12-month-baby-sleep-help` | `pages/website/age-pages/5-12-month-page-complete.html` | 9/1/7 | 7/7/8/8 | 8 hits | Repo instrumented, NOT deployed | **Template page — do this one first in Phase 3, lock the checklist here before batching the rest** |
| Toddler | `/toddler-sleep-help` | `pages/website/age-pages/toddler-page-complete.html` | 9/1/7 | 7/7/8/8 | 8 hits | Repo instrumented, NOT deployed | Same checklist as Newborn |
| 5-12mo Course | `/5-12-month-baby-sleep-course` | `pages/website/product-pages/5-12-month-course/5-12-month-guide-landing-page.html` | 9/1/7 | 2/2/2/2 | 11 hits (incl. "lifetime access includes all future course updates" FAQ answer — flag for policy call on one-off course purchases) | Repo instrumented, NOT deployed | Same checklist; "Lifetime access" FAQ answer needs the one-off-purchase policy decision (see compliance pack) |
| Newborn Guide (product) | not separately swept live | `pages/website/product-pages/newborn-guide/newborn-guide-landing-page.html` | n/a | 2/2/2/2 | (repo has "Lifetime access" per the 9-file sweep) | Repo instrumented, NOT deployed | Same checklist |
| 3-4 Month Course (product) | not separately swept live | `pages/website/product-pages/3-4-month-course/3-4-month-course-landing-page.html` | n/a | 2/2/2/2 | (repo has "Lifetime access") | Repo instrumented, NOT deployed | Same checklist |
| Snooze Method (product) | not separately swept live | `pages/website/product-pages/snooze-method/snooze-method-landing-page.html` | n/a | 2/2/1/1 | (repo has "Lifetime access") | Repo instrumented, NOT deployed | Same checklist |
| Toddler Toolkit (product) | not separately swept live | `pages/website/product-pages/toddler-toolkit/toddler-toolkit-landing-page.html` | n/a | 2/2/2/2 | (repo has "Lifetime access") | Repo instrumented, NOT deployed | Same checklist |
| Snooze Access | `/snooze-access` | (paid-ads landing 2152134250) | 5/1/5 (weaker: 3/4 refs per sweep note) | n/a | 1 hit | Live, published, mostly clean | Add `hide_from_search_engines: true` (MCP); null title/meta needs real values |
| Camp Snooze | `/camp-snooze-sleep-coaching` | `pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-landing-page-blocks.html` | 14/6/7 — **only page with real live `data-aud=` price pairs (x6)** | 9/9/3/3 (blocks file); waitlist variant 6/6/0/0 | 1 hit | Live and dual-currency-correct; standalone engine, different price format | Format-align only (`A$` prefix, drop `$885 AUD` suffix), adopt v2 switch visuals; do NOT merge its engine into the global one this pass |
| Consultations | `/one-on-one-sleep-consultations` | `pages/website/consultations/one-on-one-consultations-page.html` | 9/1/7 (engine script only — **zero prices actually wired**) | 19/19/7/7 | 8 hits + **"Registered Paediatric Nurse" x3 (factual-accuracy violation, no sign-off needed to fix)** | Repo instrumented, NOT deployed; live prices all static USD ($525/$650/$3,150/$3,500/$390) | Same checklist plus the credential fix x3 (independent of copy-pack sign-off — fix immediately per Sally-positioning) |
| Store (legacy) | `/store` | `pages/website/store/store-page.html` | 9/1/7 (engine script only, most prices static) + **`6iRarwak` x2 live CTAs** | 10/10/2/2 | 8 hits | Repo instrumented, NOT deployed; **active conversion-breaking hotfix independent of the wave (Phase 1a)** | Hotfix first (2x CTA repoint), then same checklist |
| StoreV2 | (superseding Store, not yet the live slug per sweep) | `pages/website/StoreV2/store-page-v2.html` | n/a directly swept | 16/16/3/3 | (repo has "Lifetime access" per 9-file sweep) | Repo instrumented, NOT deployed | Same checklist; confirm which of Store/StoreV2 is the live `/store` target before deploying (census item) |
| Cold-traffic | (paid landing, not in the public sweep list) | `pages/landing/cold-traffic-landing-page/cold-traffic-landing-page-blocks.html` | n/a | 7/7/6/22 | not swept | Repo instrumented, NOT deployed | Candidate for the Phase 1b deploy-method proof page (low-risk, not the homepage) |
| Founding Member | (dead page, ignore per Kade decision) | `pages/landing/founding-member/index.html` | n/a | 19/19/0/0 | `6iRarwak` present but page is dead | **Ignore — do not sweep, do not deploy, do not fix its `6iRarwak`** | None |
| Checkout z63s9VaR / vYgCNgJz / mqQikDM7 / Sr6KzShx | `/offers/<slug>/checkout` | `kajabi-deployment/pages/checkout/**` | **403 Cloudflare to all automated fetch (curl + stealth agent-browser)** | varies (7-day-trial usd/aud blocks show dp=0 — see §7 note on the mqQikDM7/Sr6KzShx swap-verify item) | unauditable outside a session | Verify only in Kade's logged-in human session (Phase 2b + Phase 4) | Correct prices, "Switch to USD/AUD" links present and pointing at the right twins, discount-code messaging |
| `/snooze` | `/snooze` | (landing 2151633113, theme 2163331541 — 20-section stale draft) | 404, self-referential canonical, no noindex | n/a | 2 hits (still ships the shared header script + JSON-LD even on the 404) | **Stays unpublished this pass** (plan §1 recommendation; revisit inside discoverability project) | None this pass — optionally drop the self-referential canonical / add noindex as a minor hygiene item |

## 7. Notes carried forward from the sweep (do not re-derive, act on these directly)

- Real slugs (differ from what a kickoff doc might guess): Camp = `/camp-snooze-sleep-coaching`, Consultations = `/one-on-one-sleep-consultations`, Store = `/store`.
- `bEsVXFXG` appears on every page but only inside an inline JS comment (2026-06-30 repoint note) — not a live link anywhere. Safe, but strip the comment at whichever touch hits that page, since it ships to every visitor's page source.
- 7-day-trial checkout blocks: the `mqQikDM7`/`Sr6KzShx` references look possibly swapped between the usd/aud variant files — a 5-minute verify item (Phase 1f), not yet confirmed either way.
- All 4 checkout pages return Cloudflare 403 to every automated fetch attempted (curl with a real UA, and `agent-browser` with anti-automation stealth flags). Checkout verification is a hard requirement for a logged-in human session (Kade); it cannot be scripted around.
