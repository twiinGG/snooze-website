# Kajabi surface types: how code is set up on each (canonical instruction)

**Authored 2026-07-06, reconciled 2026-07-06 evening against the Phase 1b code-surface census.** This condensed rulebook sits ON TOP of the deep research; when in doubt, the census wins:
- **`docs/dynamic-currency/KAJABI-CODE-SURFACE-MAP.md`** (Phase 1b census 2026-07-02: per-page theme/section/block ids, byte sizes, MATCH/DIVERGED/UNKNOWN status, proven write paths, CMS-only drift register). THE evidence base.
- `docs/dynamic-currency/PER-PAGE-EXECUTION-SPEC.md` §2-3 (census methodology + write-path facts table).
- `site-audit-2026-06/RUNBOOK.md` ~102-114 (slot table: field -> repo file).
- `docs/technical/KAJABI-DEPLOYMENT-VALIDATION.md` (one file per insertion point).

The Kade one-file ruling (2026-07-06: one canonical repo file per paste surface, whole-field overwrite) and the K2 single-block ruling apply ONLY where marked - they are NOT universal, because Kajabi structures code differently per surface type AND per page (the census proved website pages come in at least three container shapes).

## The five page surfaces

### 1. Website pages (34 pages: home, store, age pages, contact, legal, reviews...)
- **Theme model:** ALL website pages share the site's ONE Encore website theme (**2156873377**, 142 sections). Page content = per-page sections/blocks inside that theme; shared styling = the theme's Custom Code.
- **Where code lives:**
  - Shared CSS: theme Custom Code Ace editor `settings-css-input` -> canonical repo file `kajabi-deployment/global/css/theme-custom-code.css` (one-file overwrite).
  - **Shared JS:** `settings-js-input` -> `global/js/theme-custom-code.js` (one-file overwrite). `#home-page` helpers only after the 2026-07-27 split. GTM, currency toggle and `[data-checkout]` helpers live in Header Page Scripts, not here. Do not paste `snooze-globals.js` or `currency-toggle.js`.
  - Page content: **THREE container shapes exist (census finding - the single biggest structural fact):**
    1. **Single custom-code block** (Home: section `1768118757163`, one 50KB block; Consultations). The paste model (block overwrite, byte-verify) applies directly.
    2. **Native Encore builder blocks** (3-4 Month Course CONFIRMED, Store CONFIRMED; 5-12 Course, Newborn Guide, Toddler Toolkit suspected). There is NO code field to paste an HTML file into. Copy fixes = edit the native text blocks individually (builder or `update_theme_content` on the specific block settings); landing a full HTML file requires ADDING a custom-code section with an explicit `content_for` insert, or rebuilding as native sections - an owner decision, not a mechanical paste.
    3. **UNLOCATED body source** (Newborn/5-12/Toddler age pages as of the census): resolve per page BEFORE any paste via the customizer page dropdown (it enumerates every website page's sections - proven 2026-07-02 evening) or the admin edit URL, never by name-matching the 142-section index.
- **Proven write paths (census §0):** MCP `update_theme_content` full-block round-trips byte-clean; customizer block Ace persists WITH the dirty-keystroke step (`ed.insert(" "); ed.remove("left")`) then trusted Save click - the July 1 "does not persist" finding lacked the keystroke.
- **CSS discipline:** every page wrapper id needs its System Initialization block in the shared CSS or the page renders unstyled (AGENTS.md; register in CSS-STABILIZATION-BRIEF.md).
- **Consolidation ruling APPLIES ONLY to shape-1 pages** (and shape-3 pages that resolve to code blocks). Shape-2 native-builder pages are NOT consolidated to code blocks without an explicit owner decision.
- **Known page-level traps (census drift register):** live `/store` is Sally's AFFILIATE page (native blocks) - it matches NEITHER repo store file; never overwrite it with `store-page.html`. The 3-4 Month age page carries an abandoned "SECTION 0-7" rebuild cluster (needs owner triage: keep/delete/reconcile). About Sally's candidate cluster is mostly `hidden: true` - browser-confirm it renders before editing. Consultations' credential line lives in a NATIVE TEXT block (`1765189457512` "Content 2"), and its pricing uses native `offer`-type blocks invisible to the currency JS.

### 2. Landing pages (12 published: /links, /snooze-access, camp waitlist, day-pass...)
- **Theme model:** EACH landing page has its OWN theme instance (verified: /snooze-access = theme 2166700952; the LMCR04 thank-you = theme 2164551197). They do NOT inherit the website theme's Custom Code CSS/JS.
- **Consequence:** every landing page must be **fully self-contained** - its repo file carries its complete `<style>` and any JS inside the page's custom-code block. Never rely on a class defined in the website theme CSS.
- **Where code lives:** custom-code block in the page's own theme, via builder Ace editor `settings-sections-<sectionId>-blocks-<blockId>-settings-code-input`, or MCP `update_theme_content` on the page's `active_theme_id` (code blocks, ~10KB each, batch writes in one call).
- **Consolidation ruling APPLIES** (one block, one repo file: `pages/landing/<page>/index.html` or equivalent).
- **Publish state:** MCP `update_landing_page` with `publish_at` works (verified 2026-07-01).

### 3. Checkout pages (~65 published offers)
- **Theme model:** each offer's checkout has its **OWN theme** (census: z63s9VaR theme 2163485833, vYgCNgJz theme 2166694709, trial pair themes 2164307125/2166681818); the custom-code block lives in that theme (NOT the website theme).
- **Layout consequence:** each checkout needs a **self-contained stylesheet** in that offer's theme CSS field - never a delta that assumes shared website CSS exists (memory: kajabi-checkout-custom-code-per-offer). Repo sources: `pages/checkout/<offer-family>/` html + css + js (+ aud/usd variants).
- **Tracking is NOT per-offer.** Site-wide checkout tracking lives at **Settings → Checkout → Checkout Tracking Code** (Header + Footer). See Site-level fields below. Per-offer section flags `inject_header_tracking_code` / `inject_footer_tracking_code` switch whether that site-wide pair is injected into that offer.
- **Write path PROVEN for layout:** MCP `update_theme_content` full-block on the offer's theme (census: all four core/trial checkouts round-trip byte-clean). Tracking fields are edited in the Settings → Checkout admin UI (textarea), not via theme MCP.
- **Consolidation ruling DOES NOT restructure checkouts** - already a single block; paste = whole-block overwrite from the one repo file. Dual-currency offers have PAIRED checkouts (USD/AUD twins) - paste both or neither.
- **Known live state (census):** trial pair mqQikDM7/Sr6KzShx = MATCH (byte-identical to repo, correct twin-links - the only clean surfaces in the census). Core pair z63s9VaR/vYgCNgJz = DIVERGED with banned copy live ("Weekly live group coaching", "24/7 support") and the AUD checkout literally says "all prices are in USD"; the repo's clean `bau-membership-checkout/{usd,aud}/checkout-blocks.html` are the paste sources.

### 4. Thank-you pages
- **They are landing pages** (surface type 2) with their own themes - e.g. /thankyou/2x92uaLF (LMCR04, theme 2164551197), /thankyou/lmcr08-access, camp waitlist thank-you. Same rules: self-contained, own theme, single block, builder Ace or MCP on their own theme id.
- Offer-level "thank you page" settings merely POINT a purchase at one of these landing pages; there is no separate code surface.

### 5. Course lessons (10 courses)
- **No custom-code blocks at all.** Kajabi STRIPS `<style>` blocks and styled wrapper divs from lesson bodies.
- **Pattern:** flat HTML, ALL inline styles with `!important` on every property, HTML entities, lowercase hex (AGENTS.md "Course Lessons" section).
- **Write path:** MCP `update_course_content` (batch lesson writes; single rapid writes coalesce). Never paste page/landing HTML into a lesson.

## Site-level fields (render across page surfaces)

- **Header Page Scripts** (Settings → Site Details, textarea `site_page_scripts_header`, at `/admin/sites/2148291177/edit/site-details`): loads on website and landing pages (evidenced by GTM present on every pulled public page of those types). One canonical file: `global/html/site-header-page-scripts.html` (Kade one-file ruling; contains GTM single-instance, Stape, schema.org JSON-LD, currency-toggle v2). Whole-field overwrite; edits happen in the repo file first. **This is not the checkout tracking surface.**
- **Checkout Tracking Code** (Settings → Checkout, at `/admin/settings/checkout`): site-wide Header and Footer tracking fields placed in every checkout page when that offer's `inject_header_tracking_code` / `inject_footer_tracking_code` flags are true. Confirmed live 2026-07-27 (admin screenshot). Operator index: `kajabi-deployment/PASTE-MAP.md` rows A4/A5. Canonical sources:
  - Header: `global/html/checkout-header-tracking.html` (**already live; do not re-paste to sync**). Optional: append `global/js/meta-advanced-matching.js` (strip its comment header) after the GTM/Stape block.
  - Footer: `global/js/kajabi-checkout-tracking.js` (live empty as of 2026-07-27).
  - Do not assume Header Page Scripts cover checkouts.
- **Two-step opt-in section** (`two_step` in website theme 2156873377): its rendered block (`block-1585757543890`) appears in the pulled HTML of every page INCLUDING landing pages. The A1 popup fix targets this one block. **Verify across surface types after the fix**: curl one website page (/store) AND one landing page (/links) - if the landing-page copy persists, landing themes carry their own two_step copies and each must be fixed (not expected, but unproven until the first paste).

## Email surfaces (for completeness; see paste-queue B4)

- **Sequence emails:** classic Froala editor; DOM edits revert on save - drive the real UI or hand to Kade. Bodies unreadable via API.
- **Broadcasts (new builder):** content lives in the broadcast's theme -> MCP `update_theme_content`.
- **Automation emails:** subject/body inside workflow action nodes (`/admin/workflows/<id>/edit`, trusted mouse events).
- **HTML pattern for all emails:** inline styles, no `!important`, single wrapper div allowed, `<br />` spacing, merge tags `{{...}}` (AGENTS.md "Email Campaigns" section).

## Quick decision table

| Surface | Shares code with others? | Style source | Paste target | One-file/one-block ruling |
|---|---|---|---|---|
| Website page, shape 1 (code-block: Home, Consultations) | Yes - website theme 2156873377 | theme CSS + page block | builder Ace block or MCP full-block | YES - consolidate to 1 block |
| Website page, shape 2 (native builder: Store, 3-4M Course + suspected guide pages) | Yes - website theme | theme CSS + native block settings | per-block edits only; NO code field exists | NO - owner decision before any restructure |
| Website page, shape 3 (body unlocated: 3 age pages) | Yes - website theme | tbd | RESOLVE CONTAINER FIRST (customizer page dropdown) | tbd per shape |
| Landing page | No - own theme each | self-contained in block | builder Ace block or MCP (own theme) | YES - 1 block, self-contained |
| Checkout (layout / copy) | No - own theme per offer | self-contained per offer | MCP full-block on offer theme | Already 1 block - overwrite whole; USD/AUD pairs together |
| Checkout Tracking Code (header) | Site-wide, every checkout when inject_header is true | n/a (scripts) | Settings → Checkout → Header tracking code | Header = loader file + meta-advanced-matching append |
| Checkout Tracking Code (footer) | Site-wide, every checkout when inject_footer is true | n/a (scripts) | Settings → Checkout → Footer tracking code | YES - `kajabi-checkout-tracking.js` |
| Thank-you | = landing page | self-contained | builder Ace (own theme) | YES |
| Course lesson | n/a | inline !important only | MCP update_course_content | N/A - no blocks |
| Header Page Scripts | Site-wide, website + landing | n/a (scripts) | site_details textarea | YES - 1 canonical file |
| Theme CSS/JS | Website pages only | n/a | customizer Ace | YES - 1 canonical file each |

## New-page full-width / flush layout standard (MCP)

Verified live 2026-07-09 against Kajabi's own theme skill file §9 plus a live example. Scope: single-code-block website pages and landing pages. Checkout pages for individual offers are out of scope.

To make a website or landing page section render edge to edge with no side padding, set both values on the theme content in one combined `update_theme_content` MCP call:

- Section setting: `full_width: "true"`
- Code block setting: `make_flush: "true"`

Booleans pass as strings, `"true"` or `"false"`, per Kajabi's skill file §9, "Booleans Are Strings in settings_data.json". One live page stored raw boolean `true`, but the skill file flags that as a divergent but working outlier. Use the string form.

Also required in a new-page create or update call:

- `content_for_index` must list the section id. It is a sibling array of `sections`, not nested. A section missing from `content_for_index` is stored but never renders, which is the number one silent-fail mode.
- Each section's `block_order` must list its block ids in display order.
- Section padding uses `padding_desktop` and `padding_mobile` as `{top,right,bottom,left}` string objects, for example `"0"`.
- Numeric-looking settings such as `width` and `border_radius` are also strings.
- Never put fixed-chrome sections such as `header`, `footer`, `two_step` or `exit_pop` in `content_for_index`.

Do the write as one combined call: neutralise default lorem stub sections, insert the code block with `make_flush` and set section `full_width` together. Rapid single-block writes can silently drop because of Kajabi write coalescing.

Verify after any write:

1. Confirm `updated_at` advanced.
2. Curl the public URL.

## Write-path mechanics learned in the Phase-5 deploy (2026-07-08)

These are binding for all future pastes; they extend, not replace, the decision table above.

1. **Content never passes through model context.** All code pastes use `scripts/emit_paste_js.py` via `agent-browser eval` with shell substitution (see AGENTS.md "Token-safe scripted paste"). MCP `update_theme_content` remains fine for SMALL blocks (15-50KB, the proven go-live size class) but a large field must never be assembled as a hand-typed tool argument. The 378KB theme CSS via MCP string argument is specifically banned; it ships via the browser Ace path.
2. **`get_theme_content` has a hard 200KB response cap** and no field-level filter for top-level settings keys (`css`, `js`). The theme CSS field cannot be read via MCP at all. Pre-image and read-back for theme CSS = extract the `<style>` block containing the "SNOOZE UNIFIED THEME" banner from any public page's HTML (curl). Kajabi wraps the field with an injected first line `/* Custom CSS Added Via Theme Settings */` plus leading indentation; live-vs-repo comparison must allow exactly that wrapper delta and nothing else.
3. **Standard verification for every page write:** cache-busted curl of the public URL, whitespace-normalize, assert every non-blank line of the repo source file appears in the live HTML (0 missing). Pre-images are lossless curl captures to `kajabi-deployment/_live-preimages/<page>/`, never hand-transcribed from inline MCP JSON.
4. **Legacy sections with `hidden: "false"` render even when their names say SECTION 0/5/7 or "legacy"; only the hidden flag suppresses.** Duplicate or leaking legacy sections are NEUTRALISED (blank the block content), never deleted. Age pages historically carry their own adjacent footer sections ("Global Footer" / "SECTION 7: FOOTER"); after any age-page paste, grep the live page for the old footer heading and neutralise the leak (newborn/5-12 done 2026-07-07, toddler + 3-4M done 2026-07-08).
5. **Editor flow on the customizer:** Ace `setValue` via JS API is the reliable path (OS clipboard paste can hang with `os error 35`). A "Changes Detected" modal can appear; click "Keep Editing" (Reload discards the edit). Save-button greying out afterwards is the persistence signal; confirm with reload + re-read or public curl.
6. **Cloudflare/auth (UPDATED 2026-07-10 — full runbook: `KAJABI-PARALLEL-CDP-DEPLOY.md`):** Kajabi's WAF hard-blocks headless / fresh-profile agent-browser, AND a cold automated top-level nav to any `app.kajabi.com` URL (`open`/`goto`/`reload`, or a Chrome launched at an admin URL) returns **HTTP 406 and burns the window**. Proven model: launch real HEADED Chrome instances to `about:blank` (never a kajabi URL), one per lane on its own `--remote-debugging-port` + fresh `--user-data-dir`; a HUMAN logs into Kajabi admin in each (clears the WAF); agents attach via `agent-browser --cdp <port> --session <UNIQUE-name>` and move ONLY by in-app clicks. Unique `--session` per lane is mandatory (daemon routes by session name, not port). `close --all` is unscoped — kills every window; use `close <session>`. This runs multiple lanes in parallel; it supersedes the older single-named-session serial note.
7. **Subagent hygiene:** paste/browser subagents cap at ~3-4 surfaces per spawn and hand off via a written state file. The orchestrator independently curl-verifies every surface; acceptance never rests on an agent's self-report.
8. **Page wrapper MUST be `<div id="X-page">`, never `<body id="X-page">` (CRITICAL, learned 2026-07-10).** Custom-code blocks are HTML fragments; Kajabi strips `<body>`, so a `<body id>` wrapper produces NO `#X-page` element live and every rule scoped to that id (`:is(#chooser-page,…)`) matches nothing — the page renders unstyled while passing a curl 0-missing check (the literal `<body id>` text still appears). Live `#home-page` uses `<div id>`; conform. When adding a page: (a) wrap content in `<div id="X-page">`, AND (b) add that id to the guide `:is()` scope in `global/css/theme-custom-code.css`. Verify the scoped CSS actually renders with `getComputedStyle` (a scoped component's background should be non-transparent), not just a line-match.

**Census follow-ups that gate the paste wave (KAJABI-CODE-SURFACE-MAP.md §4):** (1) locate body containers for the 3 age pages + 3 course/guide pages (customizer page dropdown or admin edit URLs); (2) determine which 3-4M age-page "SECTION 0-7" block actually renders (content_for_index or browser); (3) browser-confirm About Sally's hidden cluster is live; (4) owner decision on instrumenting native-builder pages. Fresh-drift note 2026-07-06: pull_live shows live TEXT on age/product pages closely matches the repo twins (16-24 of ~117 paragraphs differ), so the COPY converges even where the CONTAINER differs - copy fixes on shape-2 pages are per-block text edits, not HTML file pastes.
