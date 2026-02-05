# Snooze Website Development

**Status:** Active Development  
**Primary Goal:** Create connected, premium user experience across all Snooze pages and migrate domain from `joinsnooze.com` to `joinsnooze.com`

**Last Updated:** December 04, 2025  
**Consolidation:** This project now includes all website-related work: landing page, website pages, reviews page, and all course content.

---

## Overview

This project manages the complete development of the Snooze website, including:
- **Landing Page:** Main Snooze landing page with hero, features, testimonials, pricing
- **Website Pages:** Age-specific pages, Library, The Snooze Method, About Sally, blog
- **Course Content:** Snooze Method course, Toddler Toolkit, 5-12 Month Guide
- **Reviews Page:** Filterable reviews page with Notion integration (planning phase)
- **Connected Experience MVP:** Unified navigation and user journey optimization
- **Domain Migration:** Transition from `joinsnooze.com` to `joinsnooze.com` with SEO preservation
- **Content Generation:** AI-powered content creation following Sally's authentic voice
- **Kajabi Integration:** Deployment of all pages, courses, and resources

---

## 🎨 Branding Assets

**Official Snooze Branding:**
- **Location:** `docs/branding/` (root level)
- **Logotype:** `Snooze Logotype - coral.svg` - Used in navigation header (inline SVG)
- **Logo:** `Snooze Logo - Coral.svg` - Icon version for favicon/social
- **Favicon:** `TSC - Favicon_Coral.png` - Browser tab icon
- **Reference:** `docs/branding/BRANDING-ASSETS-REFERENCE.md` - Complete branding guidelines

**Usage:**
- Navigation header uses inline SVG logotype (already integrated in `kajabi-deployment/landing-page/kajabi-html-blocks.html`)
- Favicon must be uploaded to Kajabi Settings → Website → Favicon
- All branding assets are in `docs/branding/` directory

---

## Project Structure

```
projects/snooze-website/
├── README.md                          # This file - project overview
├── EXECUTION-GUIDE.md                 # Complete guide for new sessions ⭐
├── PROJECT-STRUCTURE.md               # Detailed project structure
│
├── docs/
│   ├── planning/                      # Strategic planning documents
│   │   ├── CONNECTED-EXPERIENCE-MVP-PLAN.md
│   │   ├── SITE-ARCHITECTURE.md
│   │   ├── HOMEPAGE-SPEC.md
│   │   └── PLANS-INDEX.md
│   ├── migration/                     # Domain migration documentation
│   │   ├── KAJABI-MIGRATION-CHECKLIST.md
│   │   ├── REDIRECT-MAPPING.md
│   │   └── KAJABI-PAGE-INVENTORY.md
│   ├── content/                       # Content generation & voice
│   │   ├── CONTENT-GENERATION-PROCESS.md
│   │   ├── AGE-SPECIFIC-INSIGHTS.md
│   │   └── DATA-DRIVEN-CONTENT-PRIORITIES.md
│   ├── technical/                     # Technical specifications
│   │   ├── PAGE-INVENTORY.md
│   │   └── URL-REFERENCE.md ⭐ CRITICAL - All URLs here
│   ├── landing-page/                  # Landing page documentation
│   │   ├── PROJECT-OBJECTIVES.md
│   │   ├── SNOOZE-TECHNICAL-REFERENCE.md
│   │   ├── SNOOZE-METHOD-STRUCTURE.md
│   │   └── [other landing page docs]
│   ├── PHASE-1-COMPLETION-REPORT.md   # Phase 1 completion report
│   ├── PHASE-2-COMPLETION-REPORT.md   # Phase 2 completion report
│   ├── HOLISTIC-SITE-TRANSFORMATION-PLAN.md
│   └── README.md                      # Documentation index
│
├── scripts/                           # Development & utility scripts
│   ├── generate_website_content.py    # Gemini 3 Pro content generator
│   ├── generate-hero-sections.py     # Hero section generator
│   ├── generate_pricing_content.py   # Pricing content generator
│   ├── scrape_missing_pages.py       # Data collection
│   ├── analyze-scraped-data.js       # Data analysis
│   ├── analyze-age-specific-user-needs.py
│   └── landing-page/                  # Landing page specific scripts
│       ├── create_tone_review_samples.py
│       ├── extract_schedules_from_html.py
│       └── review_toddler_toolkit_with_gemini.py
│
├── kajabi-deployment/                 # Ready-to-deploy Kajabi files
│   ├── DEPLOYMENT-GUIDE.md           # ⭐ SINGLE SOURCE OF TRUTH - Complete deployment guide
│   ├── MIGRATION-CHECKLIST.md         # Landing page migration checklist
│   │
│   ├── global/                        # Global theme files (one-time setup)
│   │   ├── css/
│   │   │   └── snooze-unified-theme.css  # ⭐ Global CSS (all website pages)
│   │   └── js/
│   │       └── snooze-globals.js         # ⭐ Global JS (all website pages)
│   │
│   ├── pages/                         # Page HTML blocks
│   │   ├── navigation.html            # Navigation Code Block ⭐
│   │   ├── footer.html                # Footer Code Block ⭐
│   │   ├── landing-page-blocks.html   # Landing page HTML sections
│   │   ├── library-page/              # Library page sections
│   │   │   ├── section-01-title.html
│   │   │   ├── section-02-category-navigation.html
│   │   │   ├── [sections 03-10]
│   │   │   ├── styles.css
│   │   │   └── README.md
│   │   ├── about-sally.html
│   │   ├── the-snooze-method.html
│   │   └── blog-index.html
│   │
│   ├── courses/                       # Courses & Guides (Products) ⭐
│   │   ├── README.md                 # Courses overview
│   │   ├── snooze-method/            # The Snooze Method: Foundational Course
│   │   │   ├── module-1-lesson-1.html
│   │   │   └── [other modules]
│   │   ├── toddler-toolkit/          # Toddler Toolkit Course
│   │   │   ├── module-1-intro.html
│   │   │   └── [other modules]
│   │   └── 5-12-month-course/         # 5-12 Month Sleep Guide Course
│   │       ├── html-files/
│   │       ├── scripts/
│   │       └── [course files]
│   │
│   ├── components/                    # Reusable components
│   │   ├── hero-sections/             # Hero section components
│   │   │   ├── hero-landing.html
│   │   │   ├── hero-library.html
│   │   │   ├── hero-newborn.html
│   │   │   └── [other hero sections]
│   │   ├── context-aware-cta.html
│   │   ├── value-comparison.html
│   │   └── whats-in-snooze.html
│   │
│   ├── components/                    # Reusable components
│   │   ├── hero-sections/             # Hero section components
│   │   ├── context-aware-cta.html
│   │   ├── value-comparison.html
│   │   └── whats-in-snooze.html
│   │
│   ├── courses/                       # Courses & Guides (Products) ⭐
│   │   ├── snooze-method/            # The Snooze Method: Foundational Course
│   │   ├── toddler-toolkit/          # Toddler Toolkit Course
│   │   └── 5-12-month-course/         # 5-12 Month Sleep Guide Course
│   │
│   ├── age-pages/                     # Age-specific pages
│   │   ├── newborn-page-complete.html
│   │   ├── 3-4-month-page-complete.html
│   │   ├── 5-12-month-page-complete.html
│   │   └── toddler-page-complete.html
│   │
│   └── archive/                       # Archived files
│       └── landing-page-migration/    # Old landing page files (merged)
│
├── reviews-page/                      # Reviews page project (planning)
│   ├── README.md
│   └── docs/
│       └── REVIEWS-PAGE-DEVELOPMENT-BRIEF.md
│
└── src/                               # Source code
    ├── landing-page/                  # Landing page source (legacy)
    │   ├── index.html
    │   ├── styles.css
    │   └── script.js
    └── supabase-integration/          # Supabase integration code
```

---

## Related Projects

This project integrates closely with:

### 1. Brand Content Consultant (RAG Knowledge Base)
**Location:** `projects/brand-content-consultant/`  
**Relationship:** Provides knowledge base for content generation and Tone of Voice examples  
**Integration:**
- Knowledge base queries via Supabase
- Tone of Voice guide: `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- Gemini 3 Pro integration patterns

### 2. Strategy Documents
**Location:** `docs/strategy/` (root level)  
**Relationship:** Strategic foundation for all website decisions  
**Key Documents:**
- `SNOOZE-MASTER-STRATEGY.md` - Overall business strategy
- `SNOOZE-TONE-OF-VOICE.md` - Brand voice guide (CRITICAL for all content)
- `SNOOZE-POSITIONING-FRAMEWORK.md` - Messaging architecture
- `SNOOZE-LEARNING-DESIGN.md` - Learning path structure
- `SNOOZE-PRICING-STRATEGY.md` - Pricing framework

---

## Current Phase: Connected Experience MVP

**Status:** Phase 2 Complete ✅ - Landing Page Harmonization Ready for Deployment  
**Primary Plan:** `.cursor/plans/snooze-website-development-domain-migration-2259a5de.plan.md`  
**Local Copy:** `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md`  
**Plans Index:** `docs/planning/PLANS-INDEX.md` (all related plans)

### Phase 1: Navigation System ✅ COMPLETE
**Date Completed:** December 3, 2025  
**Completion Report:** `docs/PHASE-1-COMPLETION-REPORT.md`

**Achievements:**
- ✅ Clean, unified navigation design
- ✅ Professional footer layout
- ✅ Gemini 3 Pro used for design analysis and code generation
- ✅ Self-contained files ready for Kajabi deployment
- ✅ Mobile-responsive with overlay menu

**Deployment Files:** See `kajabi-deployment/DEPLOYMENT-GUIDE.md` ⭐ **SINGLE SOURCE OF TRUTH**

### Phase 2: Landing Page Harmonization ✅ COMPLETE
**Date Completed:** December 04, 2025  
**Completion Report:** `docs/PHASE-2-COMPLETION-REPORT.md`

**Achievements:**
- ✅ Updated "What's Inside" section with Library, Method, and Toolkit references
- ✅ Added Library Preview section showcasing three-tiered learning path
- ✅ Updated navigation links (Library, The Snooze Method, About Sally)
- ✅ Standardized all checkout URLs to `/offers/6iRarwak/checkout`
- ✅ Premium design and messaging throughout
- ✅ Context-aware CTAs with signposting fallback
- ✅ Integrated official Snooze branding assets (logotype, logo, favicon)
- ✅ Resolved header system conflicts (custom site header as primary)
- ✅ Implemented global checkout URL management (`window.SNOOZE_CHECKOUT_URL`)

**Files Updated:**
- `kajabi-deployment/landing-page/kajabi-html-blocks.html` - Logo, pricing, checkout URL
- `kajabi-deployment/landing-page/kajabi-custom-css.css` - SVG logo styling, header controls
- `kajabi-deployment/navigation-code-block.html` - Custom header logo
- `kajabi-deployment/phase1-navigation-footer.css` - Custom header logo styling
- `docs/branding/BRANDING-ASSETS-REFERENCE.md` - New branding documentation

### Goals
1. ✅ Create unified navigation system
2. ✅ Harmonize landing page with Library, Method, and Toolkit
3. ⏳ Implement context-aware CTAs (new visitor, logged-in non-member, Snooze member) - In progress
4. ✅ Standardize checkout URLs
5. ✅ Premium experience throughout

### Next Steps
- Deploy Phase 2 updates to Kajabi landing page
- Begin Phase 3: Age-Specific Pages Enhancement

---

## Landing Pages

### Main Landing Page
**Status:** ✅ Complete & Ready for Deployment  
**Current Version:** 2.30 (Best Practices Implementation - Sticky CTA, Mobile Optimization)  
**Location:** `kajabi-deployment/landing-page/`

### Quick Start
- **For NEW SESSIONS:** Point AI to `kajabi-deployment/landing-page/README.md` + state your goal
- **For DEPLOYMENT:** Follow `kajabi-deployment/landing-page/DEPLOYMENT-GUIDE.md`

### Key Files
- **CSS:** `kajabi-deployment/landing-page/kajabi-custom-css.css` - Version 2.30
- **JavaScript:** `kajabi-deployment/landing-page/kajabi-custom-javascript.js` - Version 2.5
- **HTML:** `kajabi-deployment/landing-page/kajabi-html-blocks.html` - Version 2.10

### Cold Traffic Landing Page
**Status:** ✅ Complete & Ready for Deployment  
**Purpose:** Primary destination for paid cold traffic ads (Meta, etc.)  
**URL:** `/get-great-baby-sleep`  
**Location:** `kajabi-deployment/pages/cold-traffic-landing-page/`

**SEO Settings:**
- **Title:** "Get Great Baby Sleep | Snooze Membership - Sleep Support & Coaching"
- **Description:** "Get great baby sleep and feel like yourself again. Snooze gives you a clear sleep plan for your baby's age, plus coaching and judgement-free support. Join Snooze membership today."

**Key Features:**
- Emotion-first copy (identity + belief before product)
- Mobile-optimized with Sally's photo first on mobile
- Clear path with "Start here" leadership strip
- Age-specific content section
- Social proof focused on emotional transformation

**Deployment:** See `kajabi-deployment/DEPLOYMENT-GUIDE.md` Section 3.1  
**Documentation:** `kajabi-deployment/pages/cold-traffic-landing-page/README.md`

### Course Content
- **Library Page:** `kajabi-deployment/pages/library-page/` (displays all courses)
- **Courses & Guides:** `projects/kajabi-courses/courses/` ⭐ (all course/product content - moved December 06, 2025)
  - **Snooze Method:** `projects/kajabi-courses/courses/snooze-method/`
  - **Toddler Toolkit:** `projects/kajabi-courses/courses/toddler-toolkit/`
  - **5-12 Month Guide:** `projects/kajabi-courses/courses/5-12-month-course/`
  - **Newborn Guide:** `projects/kajabi-courses/courses/newborn-guide/`

**Full Documentation:**
- Landing page: `kajabi-deployment/landing-page/README.md`
- Courses: `projects/kajabi-courses/courses/README.md` ⭐

---

## Reviews Page

**Status:** Planning  
**Priority:** High  
**Phase:** Build  
**Location:** `reviews-page/`

### Overview
Build a filterable reviews page integrated with Notion to display direct review text (not iframes) for SEO optimization and trust building. Includes reusable review components for product pages and checkout.

### Documentation
- **Development Brief:** `reviews-page/docs/REVIEWS-PAGE-DEVELOPMENT-BRIEF.md`
- **README:** `reviews-page/README.md`

---

## Content Generation

**CRITICAL:** All content must follow the Tone of Voice guide.

### Process
1. **Generate:** Use `scripts/generate_website_content.py` with Gemini 3 Pro
2. **Review:** Check against `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
3. **Deploy:** Add to `kajabi-deployment/` for Kajabi integration

### Quick Start
```bash
cd projects/snooze-website
python3 scripts/generate_website_content.py \
  --content-type "landing-page-cta" \
  --context "new-visitor" \
  --output-file "kajabi-deployment/cta-new-visitor.html"
```

**Full Process:** See `docs/content/CONTENT-GENERATION-PROCESS.md`

---

## Domain Migration (Future Phase)

**Status:** Planned (after MVP completion)  
**Plan:** `docs/migration/KAJABI-MIGRATION-CHECKLIST.md`

### Overview
- Migrate from `joinsnooze.com` to `joinsnooze.com`
- Preserve SEO value (36 blog posts, age-specific pages)
- Set up Cloudflare redirects
- Update all internal links and content

---

## Key Requirements

### Environment Variables
Required in root `.env` file:
```bash
GEMINI_API_KEY=your_key_here          # For content generation
SUPABASE_URL=your_url_here            # For knowledge base queries
SUPABASE_ANON_KEY=your_key_here        # For knowledge base queries
```

### Dependencies
- Python 3.8+
- `google-generativeai` (Gemini API)
- `supabase` (Knowledge base queries)
- `python-dotenv` (Environment variables)

### Tone of Voice Compliance
- **MUST** follow `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **MUST** use Gemini 3 Pro for all content generation
- **MUST** query knowledge base for authentic examples
- **MUST** review against Tone of Voice checklist before deployment

---

## Documentation Index

### Execution Guide
- **EXECUTION-GUIDE.md** ⭐ **Complete guide for new sessions** - Includes ready-to-use prompt

### Planning Documents
- **Plans Index:** `docs/planning/PLANS-INDEX.md` - Reference to all project plans
- **MVP Plan:** `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md` - Complete implementation plan
  - **Source:** `.cursor/plans/snooze-website-development-domain-migration-2259a5de.plan.md`
- **Site Architecture:** `docs/planning/SITE-ARCHITECTURE.md` - Information architecture
- **Homepage Spec:** `docs/planning/HOMEPAGE-SPEC.md` - Homepage evolution plan

### Migration Documents
- **Migration Checklist:** `docs/migration/KAJABI-MIGRATION-CHECKLIST.md` - Step-by-step migration
- **Redirect Mapping:** `docs/migration/REDIRECT-MAPPING.md` - Cloudflare redirect rules
- **Page Inventory:** `docs/migration/KAJABI-PAGE-INVENTORY.md` - Kajabi backend pages

### Content Documents
- **Content Generation:** `docs/content/CONTENT-GENERATION-PROCESS.md` - Content creation workflow

### Technical Documents
- **URL Reference:** `docs/technical/URL-REFERENCE.md` ⭐ **CRITICAL - All URLs here**
- **Page Inventory:** `docs/technical/PAGE-INVENTORY.md` - Scraped pages analysis

### Landing Page Documentation
- **Landing Page README:** `kajabi-deployment/landing-page/README.md` ⭐
- **Deployment Guide:** `kajabi-deployment/landing-page/DEPLOYMENT-GUIDE.md`
- **Project Objectives:** `docs/landing-page/PROJECT-OBJECTIVES.md`
- **Technical Reference:** `docs/landing-page/SNOOZE-TECHNICAL-REFERENCE.md`

### Phase Completion Reports
- **Phase 1 Completion Report:** `docs/PHASE-1-COMPLETION-REPORT.md` ⭐ - December 3, 2025
- **Phase 2 Completion Report:** `docs/PHASE-2-COMPLETION-REPORT.md` ⭐ - December 4, 2025

---

## Development Workflow

### 1. Planning
- Review strategic documents in `docs/strategy/`
- Check MVP plan in `docs/planning/`
- Understand user journeys and requirements

### 2. Content Generation
- Use `scripts/generate_website_content.py`
- Query knowledge base for examples
- Generate with Gemini 3 Pro
- Review against Tone of Voice guide

### 3. Implementation
- Create/update HTML files in `kajabi-deployment/`
- Test user journeys
- Verify CTAs and navigation

### 4. Deployment
- Deploy to Kajabi
- Test on live site
- Monitor user behavior

---

## Success Criteria

### Connected Experience MVP
- [x] Create unified navigation system (Phase 1 Complete)
- [ ] New visitors can navigate from any page to checkout
- [ ] Logged-in non-members see appropriate teasers and upgrade CTAs
- [ ] Snooze members can easily access Library, Village, and resources
- [x] All pages have consistent navigation and branding (Phase 1 Complete)
- [x] Landing page harmonizes with Library, Method, and Toolkit (Phase 2 Complete)
- [x] Navigation/footer premium experience (Phase 1 Complete)
- [ ] Clear signposting if user detection fails
- [ ] Login page clearly explains access requirements

### Domain Migration (Future)
- [ ] All content migrated to new domain
- [ ] SEO value preserved (301 redirects)
- [ ] All internal links updated
- [ ] Analytics configured
- [ ] No broken links or 404s

---

## Getting Started

### For New Contributors

1. **Read the Overview**
   - This README
   - `EXECUTION-GUIDE.md` ⭐ **START HERE for new sessions**
   - `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md`
   - `docs/strategy/SNOOZE-TONE-OF-VOICE.md`

2. **Set Up Environment**
   - Add required environment variables to root `.env`
   - Install Python dependencies
   - Verify Gemini API access

3. **Understand the Structure**
   - Review project structure above
   - Check related projects
   - Understand Kajabi deployment process

4. **Start with MVP**
   - Begin with Phase 1: Navigation System
   - Use content generation script for all copy
   - Review against Tone of Voice guide

---

## Support & Resources

### Internal Resources
- **Strategy Docs:** `docs/strategy/` (root level)
- **Content Consultant:** `projects/brand-content-consultant/`
- **Memory Integration:** `projects/memory-integration/`

### External Resources
- **Kajabi Documentation:** [Kajabi Help Center](https://help.kajabi.com)
- **Cloudflare Docs:** [Cloudflare Redirects](https://developers.cloudflare.com/rules/transform/url-rewrite/)
- **Gemini API:** [Google AI Studio](https://makersuite.google.com/app/apikey)

---

## Status & Progress

**Current Phase:** Connected Experience MVP - Phase 2 Complete ✅  
**Phase 1 Status:** Navigation System Complete - Ready for Deployment (December 3, 2025)  
**Phase 2 Status:** Landing Page Harmonization Complete (December 4, 2025)  
**Next Milestone:** Phase 2 Deployment to Kajabi, then Phase 3 Implementation  
**Blockers:** None  
**Last Updated:** December 4, 2025

---

**Questions?** Check the documentation in `docs/` or review the related projects listed above.
