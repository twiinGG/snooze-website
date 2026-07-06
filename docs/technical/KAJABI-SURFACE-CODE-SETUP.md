# Kajabi surface types: how code is set up on each (canonical instruction)

**Authored 2026-07-06** (TOV go-live prep; verified against the live site census, MCP theme reads, and deploy history). This is the per-surface rulebook for pasting code. The Kade one-file ruling (2026-07-06: one canonical repo file per paste surface, whole-field overwrite) and the K2 single-block ruling apply ONLY where marked - they are NOT universal, because Kajabi structures code differently per surface type.

## The five page surfaces

### 1. Website pages (34 pages: home, store, age pages, contact, legal, reviews...)
- **Theme model:** ALL website pages share the site's ONE Encore website theme (**2156873377**). Page content = per-page sections/blocks inside that theme; shared styling = the theme's Custom Code.
- **Where code lives:**
  - Shared CSS: theme Custom Code Ace editor `settings-css-input` -> canonical repo file `kajabi-deployment/global/css/theme-custom-code.css` (one-file overwrite).
  - Shared JS: `settings-js-input` -> `global/js/theme-custom-code.js` (one-file overwrite).
  - Page content: custom-code block(s) per page in the builder (Ace editor per block).
- **CSS discipline:** every page wrapper id (`#home-page`, `#store-page`...) needs its System Initialization block in the shared CSS or the page renders unstyled (AGENTS.md CSS rules; register in CSS-STABILIZATION-BRIEF.md).
- **Consolidation ruling APPLIES:** each page converges to ONE custom-code block fed by ONE repo file (`pages/website/<page>/<page>.html`). Live legacy multi-block pages (store, home, age pages - see `_live-preimages/<page>/section-*.html`) get consolidated during the paste: map live block ids first, create/fill the single block, empty the legacy blocks, verify rendered.
- **HTML pattern:** full `<div id="page-wrapper">` + `<style>` allowed inside custom-code blocks; page-specific styles may live in the block, shared system styles in the theme CSS.

### 2. Landing pages (12 published: /links, /snooze-access, camp waitlist, day-pass...)
- **Theme model:** EACH landing page has its OWN theme instance (verified: /snooze-access = theme 2166700952; the LMCR04 thank-you = theme 2164551197). They do NOT inherit the website theme's Custom Code CSS/JS.
- **Consequence:** every landing page must be **fully self-contained** - its repo file carries its complete `<style>` and any JS inside the page's custom-code block. Never rely on a class defined in the website theme CSS.
- **Where code lives:** custom-code block in the page's own theme, via builder Ace editor `settings-sections-<sectionId>-blocks-<blockId>-settings-code-input`, or MCP `update_theme_content` on the page's `active_theme_id` (code blocks, ~10KB each, batch writes in one call).
- **Consolidation ruling APPLIES** (one block, one repo file: `pages/landing/<page>/index.html` or equivalent).
- **Publish state:** MCP `update_landing_page` with `publish_at` works (verified 2026-07-01).

### 3. Checkout pages (~65 published offers)
- **Theme model:** custom code is **PER-OFFER**, stored on each offer's checkout (NOT site-wide, NOT the website theme, NOT a landing-page theme).
- **Consequence:** each checkout needs a **self-contained stylesheet** pasted into that offer's checkout custom-code area - never a delta that assumes shared CSS exists (memory: kajabi-checkout-custom-code-per-offer). Repo sources: `pages/checkout/<offer-family>/checkout-blocks.html` (+ aud/usd variants).
- **Consolidation ruling DOES NOT restructure checkouts** - the per-offer code area is already a single field; paste = whole-field overwrite of that offer's area from its one repo file. Dual-currency offers have PAIRED checkouts (USD/AUD twins) - paste both or neither.
- **Access:** browser only (per-offer admin UI); MCP has no checkout custom-code tool.

### 4. Thank-you pages
- **They are landing pages** (surface type 2) with their own themes - e.g. /thankyou/2x92uaLF (LMCR04, theme 2164551197), /thankyou/lmcr08-access, camp waitlist thank-you. Same rules: self-contained, own theme, single block, builder Ace or MCP on their own theme id.
- Offer-level "thank you page" settings merely POINT a purchase at one of these landing pages; there is no separate code surface.

### 5. Course lessons (10 courses)
- **No custom-code blocks at all.** Kajabi STRIPS `<style>` blocks and styled wrapper divs from lesson bodies.
- **Pattern:** flat HTML, ALL inline styles with `!important` on every property, HTML entities, lowercase hex (AGENTS.md "Course Lessons" section).
- **Write path:** MCP `update_course_content` (batch lesson writes; single rapid writes coalesce). Never paste page/landing HTML into a lesson.

## Site-level fields (render across page surfaces)

- **Header Page Scripts** (Settings -> Site Details, textarea `site_page_scripts_header`, at `/admin/sites/2148291177/edit/site-details`): loads on ALL public pages including landing pages (evidenced by GTM present in every pulled page). One canonical file: `global/html/site-header-page-scripts.html` (Kade one-file ruling; contains GTM single-instance, Stape, schema.org JSON-LD, currency-toggle v2). Whole-field overwrite; edits happen in the repo file first.
- **Two-step opt-in section** (`two_step` in website theme 2156873377): its rendered block (`block-1585757543890`) appears in the pulled HTML of every page INCLUDING landing pages. The A1 popup fix targets this one block. **Verify across surface types after the fix**: curl one website page (/store) AND one landing page (/links) - if the landing-page copy persists, landing themes carry their own two_step copies and each must be fixed (not expected, but unproven until the first paste).

## Email surfaces (for completeness; see paste-queue B4)

- **Sequence emails:** classic Froala editor; DOM edits revert on save - drive the real UI or hand to Kade. Bodies unreadable via API.
- **Broadcasts (new builder):** content lives in the broadcast's theme -> MCP `update_theme_content`.
- **Automation emails:** subject/body inside workflow action nodes (`/admin/workflows/<id>/edit`, trusted mouse events).
- **HTML pattern for all emails:** inline styles, no `!important`, single wrapper div allowed, `<br />` spacing, merge tags `{{...}}` (AGENTS.md "Email Campaigns" section).

## Quick decision table

| Surface | Shares code with others? | Style source | Paste target | One-file/one-block ruling |
|---|---|---|---|---|
| Website page | Yes - website theme 2156873377 | theme CSS + page block | builder Ace block | YES - consolidate to 1 block |
| Landing page | No - own theme each | self-contained in block | builder Ace block (own theme) | YES - 1 block, self-contained |
| Checkout | No - per-offer | self-contained per offer | offer checkout code area | Already 1 field - overwrite whole |
| Thank-you | = landing page | self-contained | builder Ace (own theme) | YES |
| Course lesson | n/a | inline !important only | MCP update_course_content | N/A - no blocks |
| Header scripts | Site-wide, all pages | n/a (scripts) | site_details textarea | YES - 1 canonical file |
| Theme CSS/JS | Website pages only | n/a | customizer Ace | YES - 1 canonical file each |
