# Kajabi Deployment Files

Ready-to-deploy HTML, CSS, and JavaScript files for Kajabi platform.

---

## Structure

```
kajabi-deployment/
├── global/
│   ├── css/
│   │   └── snooze-unified-theme.css    # Global CSS (all website pages)
│   └── js/
│       └── snooze-globals.js            # Global JavaScript (all website pages)
├── pages/
│   ├── navigation.html                  # Navigation Code Block
│   ├── footer.html                      # Footer Code Block
│   ├── landing-page-blocks.html         # Landing page HTML sections
│   └── website/library/                  # Library page (current path)
│       ├── library-page.html             # Deployable file, paste target /snooze-library
│       ├── styles.css
│       └── README.md
├── age-pages/                             # Complete age-specific pages (see pages/website/)
├── components/                            # Reusable components
│   ├── context-aware-cta.html
│   ├── value-comparison.html
│   ├── whats-in-snooze.html
│   ├── understanding-section.html
│   ├── age-cross-linking.html
│   └── hero-sections/                    # Hero section templates
├── courses/                               # ⚠️ MOVED: Now at projects/kajabi-courses/courses/
│                                          # Course content has been moved to its own subproject
└── _retired/                              # Retired build surfaces, see _retired/README.md
```

> **Note (2026-07-05):** the tree above was updated to match the current on-disk layout. Library page files live at `pages/website/library/` (not `pages/library-page/`); the standalone `library-page-complete.html` was archived to `_retired/library-page-complete/` (see `_retired/README.md`). Retired/archived files across this deployment now live under the single `_retired/` folder at the `kajabi-deployment/` root, not the separate `pages/archive/` and root `archive/` folders this doc previously described (those did not exist on disk).

### ⭐ Essential Files

**For All Website Pages (Including Landing Page):**
1. **Global JavaScript:** `global/js/snooze-globals.js` → Kajabi Settings → Website → Custom JavaScript
2. **Global CSS:** `global/css/snooze-unified-theme.css` → Kajabi Settings → Theme → Custom CSS
3. **Navigation:** `pages/navigation.html` → Code Block (top of page)
4. **Footer:** `pages/footer.html` → Code Block (bottom of page)

**For Landing Page:**
1. **Landing Page HTML:** `pages/landing-page-blocks.html` → Code Blocks
2. **Note:** CSS and JavaScript are now in global theme files (no separate files needed)

**For Library Page:**
1. **Library Page HTML:** `pages/website/library/library-page.html` → paste target `/snooze-library` (curated surface; `/library` is the separate system member-area page, see `pages/website/library/README.md` and `docs/KICKOFF-DEPLOY-COMPLETION.md`)
2. **Library Page CSS:** `pages/website/library/styles.css` → Add to Kajabi Custom CSS
3. **See:** `pages/website/library/README.md` for current deployment notes (the folder's `DEPLOYMENT-GUIDE.md` and `INDEX.md` describe a superseded ten-section build)

**For Age-Specific Pages:**
1. **Age Pages:** `pages/age-pages/` → Complete HTML files ready for deployment
   - `newborn-page-complete.html` (0-3 months)
   - `3-4-month-page-complete.html`
   - `5-12-month-page-complete.html`
   - `toddler-page-complete.html` (12+ months)
2. **See:** `pages/age-pages/README.md` for deployment instructions

**Deployment Guide:**
- `DEPLOYMENT-GUIDE.md` ⭐ **SINGLE SOURCE OF TRUTH** - Complete deployment instructions

---

## Deployment Process

### 1. Content Generation
All content should be generated using `scripts/generate_website_content.py` to ensure Tone of Voice compliance.

### 2. Review
- Check against Tone of Voice guide: `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- Verify all CTAs point to correct checkout URL: `/offers/6iRarwak/checkout`
- Test user journeys for each user class

### 3. Kajabi Integration
- Copy Code Block HTML into Kajabi page editor (as Code Blocks)
- All CSS and JavaScript is inline (self-contained)
- Test on live site
- Verify mobile responsiveness

**Complete Deployment Instructions:**
- See `DEPLOYMENT-GUIDE.md` ⭐ **SINGLE SOURCE OF TRUTH** for all deployment steps

**Important:** The CSS automatically handles hiding the Kajabi header visually while keeping it in the DOM for context-aware detection. This ensures context-aware CTAs continue to work correctly.

---

## Related Deployment Files

### Page Components
- **Landing Page:** `pages/landing-page-blocks.html`
- **Library Page:** `pages/website/library/library-page.html` (paste target `/snooze-library`)
- **Age Pages:** `pages/age-pages/` (complete pages for each age range)
- **Navigation:** `pages/navigation.html`
- **Footer:** `pages/footer.html`
- **Other Pages:** `pages/about-sally.html`, `pages/the-snooze-method.html`, `pages/blog-index.html`

### Course Content
Located in `courses/`:
- Snooze Method course: `courses/snooze-method/`
- Toddler Toolkit: `courses/toddler-toolkit/`
- 5-12 Month Guide: `courses/5-12-month-course/`

---

## Content Standards

### Tone of Voice
- **MUST** follow `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **MUST** use authentic Sally language patterns
- **MUST** avoid AI-generated patterns (no em dashes, no contrast statements)

### Design
- Premium, polished experience
- Clear, professional messaging
- Consistent branding throughout

### CTAs
- All non-member CTAs → `/offers/6iRarwak/checkout`
- Context-aware based on user status
- Clear, action-oriented language

---

## File Naming Convention

- Use kebab-case: `the-snooze-method.html`
- Code Blocks: Use `-code-block.html` suffix (e.g., `navigation-code-block.html`)
- Be descriptive and clear about file purpose

## Deployment Guides

- **Phase 1 Navigation/Footer**: See `PHASE-1-DEPLOYMENT.md` ⭐

---

**Last Updated:** December 05, 2025  
**Note:** Landing page migrated from "Landing Page" to "Website Page" type. All CSS/JS consolidated into global theme files. Age pages moved to `pages/age-pages/` for better organization. Landing page CSS merged into global CSS using Gemini 3 Pro.

