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
│   ├── library-page/                     # Library page sections
│   │   ├── section-01-title.html
│   │   ├── section-02-category-navigation.html
│   │   ├── [sections 03-10]
│   │   ├── styles.css
│   │   └── README.md
│   ├── age-pages/                        # Complete age-specific pages
│   │   ├── newborn-page-complete.html     # Complete newborn page (43KB)
│   │   ├── 3-4-month-page-complete.html  # Complete 3-4 month page (46KB)
│   │   ├── 5-12-month-page-complete.html  # Complete 5-12 month page (44KB)
│   │   ├── toddler-page-complete.html    # Complete toddler page (44KB)
│   │   └── README.md                     # Age pages documentation
│   ├── reviews-page/                      # Reviews page (in development)
│   │   ├── README.md
│   │   └── docs/
│   ├── about-sally.html                  # About Sally page
│   ├── the-snooze-method.html            # The Snooze Method page
│   ├── blog-index.html                   # Blog index page
│   ├── library-page-complete.html        # Library page complete
│   ├── snooze-method-page-complete.html  # Snooze Method page complete
│   └── archive/                          # Archived files
│       ├── old-versions/                 # Old landing page versions
│       └── templates/                    # Old template files
├── components/                            # Reusable components
│   ├── context-aware-cta.html
│   ├── value-comparison.html
│   ├── whats-in-snooze.html
│   ├── understanding-section.html
│   ├── age-cross-linking.html
│   └── hero-sections/                    # Hero section templates
├── courses/                               # ⚠️ MOVED: Now at projects/kajabi-courses/courses/
│                                          # Course content has been moved to its own subproject
└── archive/                               # Archived files
    ├── landing-page-migration/            # Old landing page CSS/JS/HTML (merged)
    │   ├── kajabi-custom-css.css          # Merged into global CSS
    │   ├── kajabi-custom-javascript.js    # Merged into global JS
    │   └── kajabi-html-blocks.html        # Moved to pages/landing-page-blocks.html
    ├── landing-page-old/                  # Old landing-page directory (outdated)
    └── phase1-files/                      # Phase 1 deployment files
```

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
1. **Library Page HTML:** `pages/library-page/` → Code Blocks (sections 01-10)
2. **Library Page CSS:** `pages/library-page/styles.css` → Add to Kajabi Custom CSS
3. **See:** `pages/library-page/DEPLOYMENT-GUIDE.md` for complete instructions

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
- **Library Page:** `pages/library-page/` (sections 01-10)
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

