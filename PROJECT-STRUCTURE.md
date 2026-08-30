# Snooze Website Project Structure

**Last Updated:** December 2025  
**Purpose:** Complete reference for project organization and file locations

---

## Directory Structure

```
projects/snooze-website/
│
├── README.md                          # Main project overview & getting started
├── PROJECT-STRUCTURE.md               # This file - structure reference
├── EXECUTION-GUIDE.md                 # Archived January 2025 execution history
│
├── docs/                              # All documentation
│   ├── README.md                      # Documentation index
│   │
│   ├── planning/                      # Strategic planning
│   │   ├── PLANS-INDEX.md             # Reference to all plans
│   │   ├── CONNECTED-EXPERIENCE-MVP-PLAN.md
│   │   ├── SITE-ARCHITECTURE.md
│   │   └── HOMEPAGE-SPEC.md
│   │
│   ├── migration/                     # Domain migration
│   │   ├── KAJABI-MIGRATION-CHECKLIST.md
│   │   ├── REDIRECT-MAPPING.md
│   │   └── KAJABI-PAGE-INVENTORY.md
│   │
│   ├── content/                       # Content generation
│   │   └── CONTENT-GENERATION-PROCESS.md
│   │
│   └── technical/                     # Technical specs
│       ├── URL-REFERENCE.md          # ⭐ Complete URL reference (CRITICAL)
│       └── PAGE-INVENTORY.md
│
├── scripts/                           # Development scripts
│   ├── README.md                      # Scripts documentation
│   ├── generate_website_content.py    # Gemini 3 Pro content generator
│   ├── scrape_missing_pages.py       # Data collection
│   └── analyze-scraped-data.js       # Data analysis
│
├── kajabi-deployment/                 # Ready-to-deploy files
│   ├── README.md                      # Deployment overview
│   ├── PASTE-MAP.md                   # Current field/file authority
│   ├── DEPLOYMENT-GUIDE.md            # Archived December 2025 history
│   ├── global/                        # Global theme files
│   │   ├── css/snooze-unified-theme.css
│   │   ├── js/snooze-globals.js
│   │   └── native-header-call-to-action.json # Native Header CTA field record
│   ├── pages/                         # Page HTML blocks
│   │   ├── footer.html
│   │   ├── landing-page-blocks.html
│   │   ├── library-page/              # Library page sections
│   │   ├── about-sally.html
│   │   ├── the-snooze-method.html
│   │   └── blog-index.html
│   ├── components/                    # Reusable components
│   ├── courses/                       # Course content
│   └── age-pages/                     # Age-specific pages
│
└── src/                               # Source code
    └── supabase-integration/          # Supabase integration
```

---

## File Locations by Purpose

### Planning & Strategy
- **Current plan:** `../../docs/projects/site-audit-remediation/SAR-MASTER-EXECUTION-PLAN-2026-08-29.md`
- **Archived plans index:** `docs/planning/PLANS-INDEX.md`
- **Archived MVP plan:** `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md`
  - Archived source: `.cursor/plans/snooze-website-development-domain-migration-2259a5de.plan.md`
- **Site Architecture:** `docs/planning/SITE-ARCHITECTURE.md`
- **Homepage Spec:** `docs/planning/HOMEPAGE-SPEC.md`

### Migration & Deployment
- **Migration Checklist:** `docs/migration/KAJABI-MIGRATION-CHECKLIST.md`
- **Redirect Rules:** `docs/migration/REDIRECT-MAPPING.md`
- **Page Inventory:** `docs/migration/KAJABI-PAGE-INVENTORY.md`

### Content Creation
- **Content Process:** `docs/content/CONTENT-GENERATION-PROCESS.md`
- **Content Generator:** `scripts/generate_website_content.py`
- **Tone of Voice:** `../../docs/strategy/SNOOZE-TONE-OF-VOICE.md` (root level)

### Technical Documentation
- **Page Inventory:** `docs/technical/PAGE-INVENTORY.md`
- **Data Analysis:** `scripts/analyze-scraped-data.js`

### Deployment Files
- **Navigation:** Kajabi native Header; canonical CTA record `kajabi-deployment/global/native-header-call-to-action.json` under PASTE-MAP A6
- **Footer:** `kajabi-deployment/footer.html`
- **Pages:** `kajabi-deployment/*.html`

---

## Related Projects

### Landing Page Project
**Location:** `projects/landing-page/`  
**Key Files:**
- Landing page: `kajabi-deployment/kajabi-html-blocks.html`
- Library page: `kajabi-deployment/pages/library-page/`
- Snooze Method: `kajabi-deployment/snooze-method/`
- Toddler Toolkit: `kajabi-deployment/toddler-toolkit/`

### Brand Content Consultant
**Location:** `projects/brand-content-consultant/`  
**Key Files:**
- Knowledge base queries
- Gemini 3 integration patterns
- Tone of Voice review scripts

### Strategy Documents
**Location:** `docs/strategy/` (root level)  
**Key Files:**
- `SNOOZE-MASTER-STRATEGY.md`
- `SNOOZE-TONE-OF-VOICE.md` ⚠️ **CRITICAL**
- `SNOOZE-POSITIONING-FRAMEWORK.md`
- `SNOOZE-LEARNING-DESIGN.md`

---

## Quick Reference

### Where to Find...

**How to Start Execution?**  
→ `../../docs/projects/site-audit-remediation/SAR-MASTER-EXECUTION-PLAN-2026-08-29.md` for the current SAR sequence. `EXECUTION-GUIDE.md` is archived history.

**Implementation Plan?**  
→ `docs/planning/PLANS-INDEX.md` (historical overview)

→ `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md` (archived plan)

→ `.cursor/plans/snooze-website-development-domain-migration-2259a5de.plan.md` (archived source)

**How to Generate Content?**  
→ `docs/content/CONTENT-GENERATION-PROCESS.md`  
→ `scripts/generate_website_content.py`

**Tone of Voice Guide?**  
→ `docs/strategy/SNOOZE-TONE-OF-VOICE.md` (root level)

**Migration Steps?**  
→ `docs/migration/KAJABI-MIGRATION-CHECKLIST.md`

**Deployment Files?**  
→ `kajabi-deployment/`

**Related Landing Page?**  
→ `projects/landing-page/kajabi-deployment/`

---

## Navigation Guide

### For New Contributors
1. Start with `README.md` (project overview)
2. Read `../../docs/projects/site-audit-remediation/SAR-MASTER-EXECUTION-PLAN-2026-08-29.md` (current execution plan); the Connected Experience plan is archived
3. Review `docs/strategy/SNOOZE-TONE-OF-VOICE.md` (content standards)
4. Check `docs/content/CONTENT-GENERATION-PROCESS.md` (content workflow)

### For Content Creation
1. Use `scripts/generate_website_content.py` (content generator)
2. Review against `docs/strategy/SNOOZE-TONE-OF-VOICE.md` (voice guide)
3. Save to `kajabi-deployment/` (deployment files)

### For Migration
1. Follow `docs/migration/KAJABI-MIGRATION-CHECKLIST.md` (step-by-step)
2. Reference `docs/migration/REDIRECT-MAPPING.md` (redirect rules)
3. Check `docs/migration/KAJABI-PAGE-INVENTORY.md` (page list)

---

**This structure ensures clear organization and easy navigation for all contributors.**
