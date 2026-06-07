# Course Free Modules → Conversion

**Status:** Planning  
**Priority:** High  
**Phase:** Build  
**Location:** `projects/course-free-modules-conversion/`

## Project Overview
A modular entry system allowing parents to access specific course modules for free (e.g., Schedules, Feeds). This replaces generic previews with high-value, pain-led solutions that guide users toward the full course or Snooze membership.

## Project Structure
```
course-free-modules-conversion/
├── README.md              # This file
├── docs/
│   ├── DEVELOPMENT-BRIEF.md  # Detailed requirements & logic
│   ├── KAJABI-BUILD-CHECKLIST.md
│   └── LMCR04-OFFER-REFERENCE.md  # Offer codes & URLs
├── drafts/                # Content drafts by age group
└── src/
    └── content/           # Organized by Lead Magnet Bundle (LMCR)
        ├── bundles/       # Bundle-specific assets (one folder per LMCR)
        │   ├── LMCR04/   # 5-12M Schedules
        │   │   ├── html/ # Course HTML blocks
        │   │   └── emails/ # Email campaign templates
        │   ├── LMCR05/   # 5-12M Feeds
        │   └── LMCR06/   # 5-12M Naps
        └── shared/       # Shared templates and docs
            ├── docs/     # Documentation (paywall copy, etc.)
            └── templates/ # Reusable templates
```

## Content Directory Structure

### Overview
Content is organized by **Lead Magnet Bundle** (LMCR) with shared templates and documentation.

### Bundle Organization Rules

**Each Bundle Contains:**
- **LMCR##-product-metadata.md**: Kajabi product settings (title, description)
- **html/**: All HTML blocks specific to that bundle
  - Thank you/access pages
  - Course lesson content
  - Upsell blocks
- **emails/**: Email campaign templates for that bundle
  - Day 0 post-purchase email (sent immediately via automation)
  - Day 2, Day 4, Day 6 nurture sequence (via campaign)

**Shared Assets:**
- **templates/**: Reusable templates (orientation lessons, email sequences)
- **docs/**: Documentation applicable to all bundles

### Naming Conventions

**Bundle Folders:**
- Format: `LMCR##` (e.g., `LMCR04`, `LMCR05`)
- Matches the package identifier from the PRD

**File Naming (CRITICAL):**
All files within each bundle MUST use the bundle code prefix:
- **Metadata File:** `LMCR##-product-metadata.md` (Kajabi product title & description)
- **HTML Files:** `LMCR##-filename.html` (e.g., `LMCR04-thank-you-access.html`, `LMCR04-module-1-lesson-1-schedules.html`)
- **Email Files:** `LMCR##-day-0-welcome.html`, `LMCR##-day-2-bigger-picture.html`, etc.

**Examples:**
- `LMCR04-product-metadata.md` (Kajabi product settings)
- `LMCR04-thank-you-access.html`
- `LMCR04-free-module-summary-upsell.html`
- `LMCR04-module-1-lesson-1-schedules.html`
- `LMCR04-day-0-welcome.html`
- `LMCR04-day-4-snooze-pivot.html`

### URL Slug Pattern

**CRITICAL:** All custom thank you pages use `/thankyou/` (NOT `/thank_you/`)
- `/thank_you/` is reserved for Kajabi's default custom thank you pages
- All custom landing page thank you pages must use `/thankyou/`

### Adding New Bundles

1. Create new folder: `src/content/bundles/LMCR##/`
2. Create product metadata file: `LMCR##-product-metadata.md` (title & description)
3. Create subfolders: `html/` and `emails/`
4. Add bundle-specific assets
5. Reference shared templates from `shared/templates/` as needed

## Progress Tracking
- [x] Project directory structure created
- [x] Expanded Development Brief drafted
- [ ] Orientation Lesson copy (Day 0)
- [ ] Email Sequence (4-part)
- [ ] Kajabi Build Checklist
- [ ] End-to-end QA

- **Canon Source:** [CANONICAL-SOURCE.md](docs/CANONICAL-SOURCE.md) (5-12 Month Course)
- **Tone Guide:** `../../docs/strategy/SNOOZE-TONE-OF-VOICE.md` (via MCP)
- **Positioning:** `../../docs/strategy/SNOOZE-POSITIONING-FRAMEWORK.md` (via MCP)
- **Theme:** `../snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`
