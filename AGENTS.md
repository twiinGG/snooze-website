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

**Sally positioning (factual-accuracy rule):** Sally is an "internationally certified sleep consultant and former paediatric nurse". NEVER frame her as a current, practising, or registered nurse; "former" is mandatory whenever the nursing background is mentioned. Use "Access with the Snooze Membership" not "Lifetime access" in marketing/SEO copy. Canonical doc: `docs/brand/SALLY-POSITIONING.md`.

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

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

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

### Parallel live deploy + the two Kajabi WAF walls

For multi-surface live pushes, the proven repeatable model is CDP-attach to real headed Chrome, in parallel — full runbook `docs/technical/KAJABI-PARALLEL-CDP-DEPLOY.md`. Two hard rules bind every Kajabi admin browser task:

- **Never auto-navigate a `app.kajabi.com` URL** (agent-browser `open`/`goto`/`reload`, or a Chrome launched at an admin URL). It returns HTTP 406 and burns the window. Launch windows to `about:blank`, have a HUMAN log in (clears Cloudflare), then move only by in-app clicks. Headless / fresh-profile browsers are hard-blocked outright. Attach lanes with `agent-browser --cdp <port> --session <UNIQUE-name>` (unique session per lane is mandatory); never `close --all` (unscoped — kills every window).
- **Page wrapper MUST be `<div id="X-page">`, never `<body id>`** (§5 says div — this is why): Kajabi strips `<body>` from fragments, so a `<body id>` wrapper yields no `#X-page` element live and all id-scoped CSS silently dies (passes curl 0-missing, renders unstyled). Adding a page = `<div id>` wrapper + add the id to the `:is()` scope in `global/css/theme-custom-code.css`; verify with `getComputedStyle`, not just a line-match.
