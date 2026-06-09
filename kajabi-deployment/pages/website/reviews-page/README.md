# Reviews Page & Notion Automation Project

**Status:** v1 BUILT (2026-06-09) — awaiting sign-off before Kajabi paste
**Priority:** High
**Phase:** Build
**Created:** November 1, 2025

> **v1 build (Wave 3 social-proof sprint):** `src/reviews-page.html` generated from the
> Member Feedback & Wins corpus (164 Public reviews) by
> `site-audit-2026-06/wave-3-social-proof/scripts/gen_reviews_page.py`. Pre-rendered cards
> (SEO-crawlable, Option C), service sections, filters (service/age/rating/search), JSON-LD
> Review schema. Styles live in the universal theme (`global/css/snooze-unified-theme.css`,
> `#reviews-page` block), not a separate components.css. Reusable compact/mini components
> (brief Phase 4) and product-page embeds (Phase 5) remain TODO. Re-run the generator to
> refresh from Notion.

---

## 🎯 Project Overview

Build a filterable reviews page integrated with Notion to display direct review text (not iframes) for SEO optimization and trust building. Includes reusable review components for product pages and checkout.

### Objectives
1. **SEO Optimization** - Direct review text on site (not iframe) for better rankings
2. **Trust Building** - Display authentic, filtered reviews
3. **Reusability** - Components embeddable on product pages and checkout

---

## 📁 Project Structure

```
reviews-page/
├── README.md              # This file
├── docs/                  # Documentation
│   └── REVIEWS-PAGE-DEVELOPMENT-BRIEF.md
└── src/                   # Source code (when development starts)
    ├── reviews-page.html
    ├── reviews-components.css
    ├── reviews-components.js
    └── notion-reviews.json
```

**Note:** Notion project management tools are in `../notion-project-management/`

---

## 📋 Key Files

### Documentation
- **`docs/REVIEWS-PAGE-DEVELOPMENT-BRIEF.md`** - Complete development brief with all requirements, technical architecture, and implementation steps

### Source Code (To Be Created)
- **`src/reviews-page.html`** - Reviews page HTML structure
- **`src/reviews-components.css`** - Reviews page and component styles
- **`src/reviews-components.js`** - Reviews filtering and display logic
- **`src/notion-reviews.json`** - Exported reviews data (if using Option C)

---

## 🚀 Getting Started

### 1. Create Notion Project Page

Use the Notion Project Management tools to create this project's Notion page:
- See `../notion-project-management/` for Notion project creation tools
- See `../notion-project-management/docs/NOTION-SETUP.md` for setup instructions

### 2. Review Development Brief

Read `docs/REVIEWS-PAGE-DEVELOPMENT-BRIEF.md` for complete requirements.

### 3. Start Development

Follow the 7-phase implementation plan in the brief:
1. Notion Database Setup
2. Data Export/Integration
3. Reviews Page Development
4. Reusable Components
5. Integration Points
6. SEO Optimization
7. Testing & Launch

---

## 📊 Progress Tracking

### Phase 1: Notion Database Setup
- [ ] Verify current Notion database structure
- [ ] Add required fields (Product Tags, Baby Age, Sleep Issue, etc.)
- [ ] Update existing reviews with new field data
- [ ] Set up "Publish Approved" workflow
- [ ] Test data structure

### Phase 2: Data Export/Integration
- [ ] Choose integration method (Option A/B/C)
- [ ] Set up automation (Zapier/N8N) if using Option A/C
- [ ] Create JSON export format
- [ ] Test data fetching
- [ ] Set up caching/refresh schedule

### Phase 3: Reviews Page Development
- [ ] Create HTML structure
- [ ] Design CSS for reviews page
- [ ] Build JavaScript filtering logic
- [ ] Implement search functionality
- [ ] Add pagination/infinite scroll
- [ ] Make responsive (mobile-friendly)
- [ ] Test all filters and interactions

### Phase 4: Reusable Components
- [ ] Create full review card component
- [ ] Create compact review card component
- [ ] Create mini badge component
- [ ] Add component JavaScript loader
- [ ] Test components in different contexts

### Phase 5: Integration
- [ ] Update hero section link
- [ ] Embed on product pages (if applicable)
- [ ] Add to checkout pages
- [ ] Replace static testimonials in carousel
- [ ] Test all integration points

### Phase 6: SEO Optimization
- [ ] Add structured data (JSON-LD) for reviews
- [ ] Optimize meta tags for reviews page
- [ ] Add schema.org Review markup
- [ ] Ensure reviews are crawlable
- [ ] Test SEO implementation

### Phase 7: Testing & Launch
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Test on mobile (iOS, Android)
- [ ] Test filtering functionality
- [ ] Test search functionality
- [ ] Verify Notion sync is working
- [ ] Check page load performance
- [ ] Deploy to Kajabi
- [ ] Monitor and iterate

---

## 🔗 Related Resources

### Notion Databases
- **Reviews Database:** `24f33898b6c2817cbfa3cab91a68b9e9` (Member Feedback & Wins)
- **Projects Database:** `25433898b6c2815987ddd1d32b353d7f` (Snooze Projects)

### Related Projects
- **Notion Project Management:** `../notion-project-management/` - Tools for managing Notion project pages
- **Main Project README:** `../../MAIN-README.md`

---

## 📝 Notes

- This project is isolated in `reviews-page/` for discrete development
- All project-specific files live here, separate from main landing page code
- When ready for deployment, files will be moved to `kajabi-deployment/`
- See main README for project management workflow

---

**Last Updated:** November 1, 2025

