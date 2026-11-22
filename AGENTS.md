# AGENTS.md - Snooze Website

> Self-contained AI rules for this app. Open this folder as standalone workspace.

## App Overview

Customer-facing website deployed to Kajabi. Contains landing pages, checkout pages, and course content HTML.

## Key Rules

### CSS Page Creation (CRITICAL)

Every new page wrapper ID requires System Initialization block:

**Mandatory Two-Step Process:**

**Step 1: System Initialization Block (REQUIRED FIRST)**
Every new page wrapper ID (e.g., `#new-page`) MUST include a complete "System Initialization" block that provides:
- CSS custom properties (colors, fonts, shadows, radius)
- Base typography (h1-h4, font families)
- Layout utilities (`.snooze-container`, `.snooze-section`, `.bg-white`, etc.)
- Button styles (`.btn`, `.btn-outline`)
- Common components (`.hero-wrap`, `.hero-grid`, `.steps-grid`, `.step-card`)
- Full-bleed fixes for sections

**Step 2: Page-Specific Styles (AFTER initialization)**
Only after the system initialization can you add page-specific component styles.

**Why This Matters:**
The design system (colors, buttons, fonts) is scoped to `#home-page`. New page wrappers CANNOT access these styles without their own initialization block. **Skipping this step results in unstyled pages.**

**Template Reference:**
- See `#ask-sally-page` System Initialization block in `kajabi-deployment/global/css/theme-custom-code.css` (`snooze-unified-theme.css` is historical only)
- Full documentation: `docs/technical/CSS-STABILIZATION-BRIEF.md`

**Workflow:**
1. Create HTML with unique wrapper ID (e.g., `<div id="new-page">`)
2. Add System Initialization block to `theme-custom-code.css` (copy from `#ask-sally-page`)
3. Add page-specific styles below the initialization block
4. Register wrapper ID in CSS-STABILIZATION-BRIEF.md

**DO NOT create page-specific styles without the system initialization block first.**

### Kajabi Surface Types (read BEFORE any paste)

Website pages, landing pages, checkout pages, thank-you pages and course lessons store code DIFFERENTLY (shared website theme vs own theme per landing page vs per-offer checkout field vs stripped lesson bodies). The canonical per-surface rulebook - including where the one-file/one-block consolidation rulings (Kade 2026-07-06, K2) apply and where they do not - is `docs/technical/KAJABI-SURFACE-CODE-SETUP.md`. Do not paste to any surface without matching its row in that doc's decision table.

### Footer: all-in-one inline (GLOBAL RULE, Kade ruling 2026-07-11)

The site footer lives INLINE at the bottom of each page's own code, inside the page wrapper, as part of the one-file/all-in-one page block. This is the global rule for every website page that needs a footer.

- The canonical footer markup is `kajabi-deployment/global/html/footer.html` (`<footer class="snooze-footer-clean">`, 5-col). It is a SYNC SOURCE, not a Kajabi include. Copy it verbatim into the bottom of each page's code (immediately before the closing `</div>` of the page wrapper) and keep it in sync when it changes.
- BANNED: creating a separate footer section/block in the Kajabi CMS and pasting the footer there. Some prior deploys did this; it drifts silently from git and is why live footers went stale while source looked fixed. On the next deploy of any affected page, remove the separate CMS footer section and rely on the inline footer in the page code.
- Every page-complete file that renders a footer to end users must carry the canonical footer inline. A page missing it is a defect to fix, not "relies on the CMS section".
- The footer CSS (`.snooze-footer-clean` / `.sf-*`) is global in `theme-custom-code.css` and applies inside any wrapper, so the inline footer renders correctly under `#home-page`, `#contact-page`, etc. Wrapper must be `<div id="X-page">` not `<body id>` (Kajabi strips body), same as every other page.
- Verify live per the footer audit standard: cache-busted curl, whitespace-normalize the rendered `<footer class="snooze-footer-clean">` block against `footer.html`, and confirm no legacy `class="snooze-footer"` / `.foot-grid` remains. Audit + remediation matrix: `scratchpad/footer-audit/REMEDIATION-MATRIX.md`.

### Hybrid native surfaces (blog / newsletter)

Blog index, blog search, newsletter index and newsletter subscribe keep **native Kajabi listings** (or search) so CMS publishes stay live. Custom code cannot own that feed. For these four pages only:

1. Paste the **title** block (`#…-page` + `.native-surface-hero`) as a top custom-code section.
2. Leave the native listings/search section in the middle.
3. Paste the **footer** block (`<footer class="snooze-footer-clean">`) as a bottom custom-code section.

Repo sources: `pages/website/blog-index/`, `blog-search/`, `newsletter/`, `newsletter-subscribe/`. Each README has the deploy steps. Delete the old Kajabi text / Newsletter Hero title sections on deploy. This two-section footer paste is the required exception to the all-in-one rule above; do not invent a third pattern.

### Kajabi HTML Patterns

**Course Lessons (NOT landing pages or emails):**
- **NO `<style>` blocks** - Kajabi strips them
- **NO styled wrapper divs** - Start content directly with `<p>`, `<ul>`, etc.
- **ALL inline styles with `!important`** on every property
- **Flat structure** - No indentation, minimal whitespace
- **HTML entities** - Use `&ndash;` `&rsquo;` not plain characters
- **Lowercase hex colors** - `#1f293b` not `#1F293B`

**Reference files:**
- `kajabi-courses/courses/5-12-month-course/module-2-lesson-4-1 ACTUAL CODE.html` - schedule cards
- `course-free-modules-conversion/src/content/bundles/LMCR04/html/LMCR04-free-module-summary-upsell.html` - CTA block

**Example (correct):**
```html
<p style="font-size: 18px !important; line-height: 1.7 !important; color: #1f293b !important; margin-bottom: 20px !important;">Content here</p>
<div style="border-left: 4px solid #F43357 !important; padding-left: 20px !important; margin: 25px 0 !important;">Blockquote content</div>
```

**Example (WRONG - will break):**
```html
<div style="background: #FAF7F4 !important; padding: 30px !important;">
  <p style="font-size: 18px !important;">Content here</p>
</div>
```

**Email Campaigns (NOT course lessons or landing pages):**
- **ALL styling MUST be inline** using `style="..."` attributes
- **NO `!important` needed** - Email clients handle inline styles differently
- **Single wrapper div allowed** - One main container with font-family, max-width, padding
- **Use `<br />` for spacing** - More reliable than margin-bottom in email clients
- **Kajabi merge tags** - Use `{{first_name}}`, `{{settings_name}}`, etc.
- **HTML comments preserved** - Header comments with email metadata are kept
- **Simple structure** - Flat paragraph-based content, minimal nesting

**Reference file:**
- `course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-0-welcome.html`

**Example (correct):**
```html
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <p>Hi {{first_name}},<br /><br /></p>
    <p style="text-align: center; margin: 20px 0;"><a href="#" style="display: inline-block; padding: 1rem 2rem; background: #F43357; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Button Text</a></p>
</div>
```

**Key differences from course HTML:**
- Email HTML CAN use a single wrapper div (not stripped)
- Email HTML does NOT need `!important` flags
- Email HTML uses `<br />` for vertical spacing
- Email HTML preserves header comments

### AI Writing Rules

All content and code must follow `~/KhorusOS/system/AI-WRITING-RULES.md` (base layer) and `docs/brand/SNOOZE-TONE-OF-VOICE-v1.2.md` (brand voice). See root AGENTS.md section 7 for full details.

**Sally positioning (factual-accuracy rule):** Sally is an "internationally certified sleep consultant and former paediatric nurse". NEVER frame her as a current, practising, or registered nurse; "former" is mandatory whenever the nursing background is mentioned. Use "Access with Snooze" not "Lifetime access" in marketing/SEO copy. Canonical doc: `docs/brand/SALLY-POSITIONING.md`.

### Free Module Bundle File Naming

When working with Lead Magnet bundles in `course-free-modules-conversion/`:
- **ALL files MUST use the bundle code prefix:** `LMCR##-filename.html`
- **Examples:**
  - `LMCR04-thank-you-access.html`
  - `LMCR04-free-module-summary-upsell.html`
  - `LMCR04-module-1-lesson-1-schedules.html`
- **Applies to:** HTML files, email templates, and all bundle-specific assets
- **Location:** `src/content/bundles/LMCR##/html/` and `src/content/bundles/LMCR##/emails/`

### Deployment

- Run validation scripts before Kajabi paste
- Follow `docs/DEPLOYMENT-CHECKLIST.md`
- Tag before deploy: `website-v{X.Y.Z}`

## Key Files

- `kajabi-deployment/` - Production website code
- `kajabi-deployment/global/css/theme-custom-code.css` - Design system (canonical)
- `kajabi-deployment/global/css/snooze-unified-theme.css` - Design system (historical reference only)
- `docs/DEPLOYMENT-CHECKLIST.md` - Deployment workflow
- `docs/technical/CSS-STABILIZATION-BRIEF.md` - CSS system documentation

## Environment Variables

Uses root `.env` for API credentials. Required variables:
- Kajabi credentials (for automation scripts)
- Supabase credentials (for RAG queries)

See root `.env.example` for complete list.

## Browser automation

Reuse the user's existing authenticated Chrome profile and relevant open tab for browser work. Kade's Kade@khorus profile is the preferred session when available (October 29, 2026 ruling). Use the connected browser capability that can access that session. Do not require a separate browser, fresh profile, CDP launch or repeat login when the existing session works. Keep one operator per account write window and preserve unrelated tabs. Use `agent-browser` when it can access the intended session; run `agent-browser --help` for its commands.

Core workflow:

1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes

### Token-safe scripted paste (MANDATORY for Kajabi code pastes)

Never carry file contents through model context (no Read-then-retype into a tool argument, no giant MCP string arguments). A hand-transcribed paste of production code is banned (Kade ruling, July 8, 2026): one dropped character ships to the live site with no diff safety net, and the tokens are wasted.

Use the helper `scripts/emit_paste_js.py`. File bytes flow disk -> python -> shell substitution -> browser editor; the model only handles the file PATH:

```bash
# Ace editor (theme Custom Code, page custom-code blocks; --index N when several):
agent-browser --session <name> eval "$(python3 apps/snooze-website/scripts/emit_paste_js.py <file> --target ace)"

# Plain textarea (site Header Page Scripts field, TinyMCE source-code modal):
agent-browser --session <name> eval "$(python3 apps/snooze-website/scripts/emit_paste_js.py <file> --target textarea --selector '<css-selector>')"
```

The eval returns `{ok, length, expected, sha256prefix}`: verify by length/hash, never by reading content back into context. The helper performs the dirty-keystroke so Kajabi enables Save; you still click Save (trusted click) and then verify.

**Verification standard (post-write, deterministic, run in Bash):** curl the public URL with a cache-buster and desktop UA, whitespace-normalize both sides, assert every non-blank line of the repo file appears in the live HTML (0 missing). Pre-images are captured the same way (curl to `_live-preimages/<page>/`), never hand-transcribed.

**Subagent context caps:** paste/browser subagents are capped at roughly 3-4 surfaces per spawn. On reaching the cap: write a handoff file (surfaces shipped + ids + pre-image paths + verification status, working mechanics, remaining queue), report, stop. Successors spawn fresh from the handoff file.

Full write-path decision table and mechanics: `docs/technical/KAJABI-SURFACE-CODE-SETUP.md`.

### Existing authenticated Chrome session

Kade's October 29, 2026 ruling replaces the mandatory separate-browser and human-login setup. Reuse the existing authenticated Chrome profile, preferably Kade@khorus, and the relevant open Kajabi tab through the available connected browser capability. An existing working session is sufficient. Do not launch a fresh browser, require CDP or ask for another login as routine preparation.

Keep one browser operator per Kajabi/ad account write window. Preserve unrelated tabs and never use an unscoped close-all command. Prefer in-app links when moving through Kajabi. If a real authentication or Cloudflare failure occurs, record the exact evidence and repair that affected session; historical WAF reports alone do not establish a current block. A new login or separate browser is a recovery option only when the intended session is unavailable and Kade agrees.

The parallel CDP runbook at `docs/technical/KAJABI-PARALLEL-CDP-DEPLOY.md` remains a historical recovery method, not a mandatory startup requirement. Existing publication approvals, token-safe paste, field preimages and receiving-system readback remain binding.

The page wrapper must be `<div id="X-page">`, never `<body id="X-page">`. Kajabi strips `<body>` from fragments. Confirm scoped styles with computed-style and visual checks.

### Kajabi admin mechanics learned the hard way (WS-006, August 13 2026)

Every item below cost a wasted cycle or nearly caused a wrong conclusion. Full evidence in
`docs/projects/website-surfaces/4_working/WS-006-run-log-2026-08-13.md`.

**Saving**

- **The paste helper's dirty keystroke does not always enable Save.** Twice the paste landed with
  correct length and hash and the Save button stayed `disabled`, so a click would have been a silent
  no-op. **Re-running `emit_paste_js.py` unchanged enabled it both times**, content and hash identical.
- **Check `button.disabled` in the DOM, not the accessibility snapshot.** The snapshot reported Save as
  disabled while the DOM correctly reported it enabled. The snapshot is the unreliable one.
- **A save can still silently fail** after reporting no error. Every paste gets a cache-busted curl.
- **`list_website_pages` `updated_at` does not bump on a theme-file content edit.** It tracks page
  metadata only. It is a false-negative trap for checking whether a paste landed.

**Overlays that eat clicks**

- A `sage-dropdown__screen` overlay, `position: fixed`, full viewport, `z-index: 90`, sits over the Save
  button on the email theme editor and makes every click a no-op with a covered-element error.
  `getComputedStyle` shows it present while `offsetParent` reports it invisible, so an `offsetParent`
  visibility test misses it. A real trusted click **on the overlay itself** dismisses it.
- The media picker's "Looking for older files/images?" popovers render in a portal and swallow clicks
  aimed at the Upload button. Remove the popover nodes, then click.

**Navigation**

- Left-nav `pds-link` `data-search-term` values are not what the UI calls them. Offers live under
  **`pricing`** (`/admin/sites/<id>/offers`). Digital download products are NOT findable in the
  products list in practice: go **`downloads`**, which lands on `/downloads/collections`, and the
  collection is the product.
- The offers list paginates and its "Next" control did not advance reliably; do not assume an offer is
  absent because it is not on page one.

**Two things not to click**

- The offers-list banner hides a modal titled **"Convert Offers to Kajabi Payments"** with a
  `Convert Now` button. That is a payments migration across every offer on the site. Dismiss with
  "I'll do this later".
- Do not accept the unsaved-changes dialog that the automation builder throws on Enter; dismiss it.

**File uploads are not automatable**

Kajabi's media library has **no `input[type=file]`** at any point, so `agent-browser upload` has nothing
to target, and `add_media` states outright that MCP cannot upload. Arming
`Page.setInterceptFileChooserDialog` over CDP and firing a trusted `Input.dispatchMouseEvent` at the
Upload button produced no `fileChooserOpened` event. **Uploads are a human step.** Hand the user
`add_media`'s `upload_url` and the local path.

Worse, the first Upload click opens a native macOS file dialog as a **sheet on the window**, which
blocks all input to that Chrome window while JavaScript keeps evaluating normally. Diagnose it with a
trusted click on a text input: if `document.activeElement` stays `BODY`, a sheet is open.
`document.hasFocus()` still returns true and is not a reliable test.

**Automations**

Build, publish, **save**, then rename from the automations list row's own **Rename** action. The
in-canvas title editor silently refuses to commit on an unsaved record and each Enter queues a
navigation; that fault created four duplicate records in one session.

### Media Library videos, posters and preimages (CFB-007, 23 Nov 2026)

- **Wistia hashed id of a Kajabi Media Library video:** the MCP (`get_media`) does not return it. Open `https://app.kajabi.com/admin/media_library/assets/<media id>` in agent-browser and read the player's `wistia_async_<id>` class. Prove the id before using it: `https://fast.wistia.com/embed/medias/<id>.json` → the `original` asset's `size` must equal the Kajabi `file_size`. Never guess an id.
- **agent-browser Kajabi login:** the saved profile `~/.agent-browser-profiles/kajabi-1` holds a login (Kade signs in once in a `--headed` window). Fresh sessions and `--profile 'Snooze Ops'` hit Cloudflare plus `/login`. Reopening a session without `--profile` silently drops the login, so pass it on every `open` after a `close`.
- **Self-hosted images (R2 → `tscmedia.khorus.ai`):** upload with `CLOUDFLARE_ACCOUNT_ID=aa7cd5f26a39d69af3c32b0957ca2f51 npx -y wrangler@4 r2 object put postiz-media/<path> --file=<f> --content-type=image/jpeg --remote` and verify the served SHA-256. **Upload before any page or preview references the URL:** a URL requested before upload served 404 from some edges and from the browser cache for minutes afterwards. Prefer a fresh dated path for each poster revision.
- **Wistia posters:** pass `stillUrl` in the `_wq` embed options and put the same image in the markup as an `<img>` under the embed, so the poster shows before the player loads.
- **`_live-preimages/` captures stay untracked.** A full public-page curl contains the live pricing feed key and comments, which the detect-secrets and comment-free hooks block. Keep the file locally at its path and record its size and hash in the run log.
- **Repo blocks media in commits** (screenshots included). QA screenshots go to the media library `snooze-content/projects/snooze-website-qa/<run>/`.

### Before concluding a paste did not land, prove your marker exists

Learned August 14, 2026, after two live surfaces were reported broken when both were fully deployed.

- **`grep -c '<marker>' <repo file>` first.** If the string you are searching the live page for is not
  in the file you claim was pasted, its absence proves nothing. Both false alarms came from markers
  inherited from another session's handoff and never checked: one searched for `.sn-trial-thank-you__*`
  class selectors on a stylesheet that scopes everything to the ID `#sn-trial-thank-you-page`, the
  other for `normaliseSurface`, which exists only in a different worktree's copy of the file.
- **A whole-file line-match is worthless for CSS.** Short declarations (`margin: 0;`, `display: flex;`,
  `}`) match anywhere in a large page, so a stylesheet can score 558 of 558 lines "present" while
  telling you nothing. Use a distinctive selector, a custom property name, or an `@import` URL.
- **Check for worktree skew.** `~/.worktrees/Snooze-OS/*` may hold a newer copy of the same file. A
  string missing from live can mean unmerged work rather than a failed deploy, which is a completely
  different action.
- **Rule out caching properly** before blaming the paste: fetch with `Cache-Control: no-cache` and read
  `cf-cache-status`. `DYNAMIC` plus `no-store` means what you are seeing is genuinely live.

### Always hand over the admin link, never a bare id

Kade ruling, August 14, 2026, and it binds documents as much as chat replies: an id on its own is
unusable because Kajabi admin surfaces cannot be reached by search, and several of them are not
reachable from the obvious list either (a DigitalDownload product is not in the products list; offers
live under the left-nav `pricing` item). Always write the link. Keep the id visible next to it, since
the id is what the MCP tools and scripts take as input.

| Surface | Admin URL |
|---|---|
| Landing page settings | `https://app.kajabi.com/admin/landing_pages/<id>/edit` |
| Any theme's customizer (landing page, checkout, email, website) | `https://app.kajabi.com/admin/themes/<theme_id>/settings/edit` |
| Offer | `https://app.kajabi.com/admin/offers/<id>/edit` |
| Product | `https://app.kajabi.com/admin/products/<id>` |
| Download collection files | `https://app.kajabi.com/admin/downloads/collections/<id>/files` |
| Download collection settings | `https://app.kajabi.com/admin/downloads/collections/<id>/settings/edit` |
| Contact | `https://app.kajabi.com/admin/contacts/<id>/edit` |
| Form | `https://app.kajabi.com/admin/sites/2148291177/forms/<id>/edit` |
| Email sequence | `https://app.kajabi.com/admin/email_sequences/<id>` |
| Sequence email | `https://app.kajabi.com/admin/email_sequence_emails/<id>/edit` |
| Site settings (Header Page Scripts lives here) | `https://app.kajabi.com/admin/sites/2148291177/edit` |
| Media asset | `https://app.kajabi.com/admin/media_library/assets/<id>` |
| Automations | `https://app.kajabi.com/admin/sites/2148291177/automations` |

The Kajabi MCP already returns `admin_url` on most `get_*` responses. Use it rather than composing a
URL by hand, and never invent a pattern that is not in this table or in a tool response.

Use these verified links from the existing authenticated Kajabi session. Prefer in-app navigation and inspect the actual result. A historical HTTP 406 report does not require a new browser or human navigation when the current session works.

## Snooze support naming

Use [Snooze support positioning](../../docs/brand/SNOOZE-SUPPORT-POSITIONING.md). The paid offer is Snooze. Sell baby sleep support from Sally, The Sleep Concierge and her team of specialists. Guides and courses have no separate website price or purchase route. Full resources may become lead magnets later. Preserve accurate renewal/payment disclosures, technical identifiers, historical evidence and existing customer entitlements.
