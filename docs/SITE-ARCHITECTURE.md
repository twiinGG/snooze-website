> **SUPERSEDED July 08, 2026:** Approved IA lives in `docs/projects/geo-seo/4_working/2026-07-07-SITE-TAXONOMY-PROPOSAL.md`. This document describes the pre-2026-07 architecture and is retained as history. Do not build from it.

# Snooze Website Architecture

**Date:** January 2025  
**Status:** Design Complete - Ready for Implementation  
**Domain:** joinsnooze.com

---

## Primary Navigation Structure

```
Home
├── The Snooze Method
├── Library (links to Kajabi Library)
├── Village (links to Kajabi Community)
├── About Sally
├── Blog
└── Join Snooze (CTA)
```

---

## Core Pages

### 1. Homepage (`/`)
**Purpose:** Primary conversion page for Snooze membership signups  
**Status:** Evolve from existing landing page  
**Key Elements:**
- Hero section with clear value proposition
- The Snooze Method overview
- Three brand pillars (Evidence-Based Clarity, Structured Support, Real Life Solutions)
- Value comparison (individual products vs membership)
- Social proof (testimonials, reviews)
- Pricing (Quarterly/Annual)
- Strong CTAs throughout

**Reference:** `projects/landing-page/kajabi-deployment/`

### 2. The Snooze Method (`/the-snooze-method`)
**Purpose:** Foundational page explaining The Snooze Method  
**Content:**
- What makes it different
- Evidence-based foundation
- Three-tiered learning path (from SNOOZE-LEARNING-DESIGN.md)
- How it works
- Link to foundational course in Library

**Key Messaging:**
- Clear, evidence-based sleep help
- Structured but flexible
- Supportive without judgment
- Comprehensive (newborn through toddler)

### 3. Library (`/library`)
**Purpose:** Overview page linking to Kajabi Library  
**Status:** Already live in Kajabi  
**Content:**
- Overview of Library structure
- Three-tiered learning path explanation
- Link to Kajabi Library: `https://joinsnooze.com/products/communities/v2/snooze/library`
- Category navigation

**Note:** This page exists in Kajabi - may need to update for new domain

### 4. Village (`/village`)
**Purpose:** Overview page linking to Kajabi Community  
**Content:**
- Community benefits
- What members get
- Link to Kajabi Community: `https://joinsnooze.com/products/communities/v2/snooze`
- Social proof from community

### 5. About Sally (`/about-sally`)
**Purpose:** Build credibility and trust  
**Content:**
- Background (former paediatric nurse, certified sleep consultant)
- Philosophy and approach
- Why she created Snooze
- Credentials and certifications
- Personal touch (host of Nap Trapped podcast)

### 6. Blog (`/blog`)
**Purpose:** SEO content hub + conversion driver  
**Structure:**
- Blog index page
- Individual blog posts (36 posts migrated)
- Categories:
  - Sleep Regressions
  - Age-Specific Advice
  - Product Reviews
  - Sleep Tips
  - Troubleshooting
- Each post includes Snooze membership CTA

**URL Structure:**
- Index: `/blog`
- Posts: `/blog/[slug]` (preserve existing slugs where possible)

### 7. Sleep & Parenting Glossary (`/sleep-glossary`)
**Purpose:** SEO/AEO top-of-funnel hub. Defines the sleep and parenting terms parents search for, and earns AI-answer citations via `DefinedTermSet` structured data.
**Status:** Built in repo (June 2026), pending Kajabi page creation
**Structure:**
- Single canonical page, ~40 curated terms grouped into 5 categories (Sleep Science, Patterns & Cycles, Methods & Techniques, Common Challenges, Feeding & Parenting)
- Deep-linkable anchors per term (`/sleep-glossary#wake-windows`), related-term links, one contextual funnel link per term
- DefinedTermSet + BreadcrumbList + FAQPage JSON-LD
**Source:** `apps/snooze-website/glossary/terms.json` (single source of truth) generated via `glossary/build-glossary.mjs`. Wrapper `#glossary-page`.
**Phase 2 (deferred):** promote head terms to full long-form guides linking back to glossary anchors.

---

## Content Taxonomy

### By Age/Stage (from SNOOZE-LEARNING-DESIGN.md)
- Newborn (0-3 months)
- 3-4 Month
- 5-12 Month
- Toddler (12+ months)

### By Content Type
- Courses (The Snooze Method, age-specific modules)
- Guides (downloadable resources)
- Tools (checklists, schedules, scripts)
- Videos (coaching replays)
- Podcasts (Nap Trapped episodes)

### By Problem
- Early Rising
- Regressions
- Nap Troubleshooting
- Night Wakings
- Sleep Associations

---

## URL Structure

### New Pages (joinsnooze.com)
```
/                          → Homepage
/the-snooze-method         → The Snooze Method page
/library                   → Library overview (links to Kajabi)
/village                   → Village overview (links to Kajabi)
/about-sally               → About Sally page
/blog                      → Blog index
/blog/[slug]               → Individual blog posts
/join-snooze               → Membership signup (CTA)
```

### Redirects (joinsnooze.com → joinsnooze.com)
```
/blog/*                    → /blog/* (preserve slugs)
/3-4-month-baby-sleep-help → /library (or appropriate new page)
/5-12-month-baby-sleep-help → /library
/newborn-baby-sleep-help   → /library
/toddler-sleep-help        → /library
/product/*                 → /library (or appropriate new page)
/                          → / (homepage)
```

---

## Conversion Strategy

### CTAs Throughout Site
- **Primary CTA:** "Join Snooze" → Membership checkout
- **Secondary CTA:** "Learn More" → The Snooze Method page
- **Blog CTAs:** "Get Full Access" → Membership signup
- **Library CTAs:** "Start Your Journey" → Foundational course

### Value Proposition Messaging
- Individual products: $900+ if purchased separately
- Snooze Membership: $147/quarter (Launch) or $490/year (Launch)
- Clear savings demonstration at every touchpoint

---

## Kajabi Integration Points

### Library Access
- URL: `https://joinsnooze.com/products/communities/v2/snooze/library`
- Will update to new domain after migration

### Community Access
- URL: `https://joinsnooze.com/products/communities/v2/snooze`
- Will update to new domain after migration

### Membership Checkout
- Kajabi offer URLs (will update to new domain)

---

## SEO Strategy

### High-Value Content (Preserve)
- 36 blog posts → Migrate to `/blog/[slug]`
- Age-specific landing pages → Redirect to Library or appropriate pages

### New Content (Conversion-Focused)
- Homepage, The Snooze Method, About Sally → Optimize for conversion, not SEO
- Focus on clear messaging and strong CTAs

### Internal Linking
- Blog posts link to relevant Library content
- All pages link to membership signup
- The Snooze Method page links to foundational course

---

## Next Steps

1. ✅ Site architecture designed
2. ⏳ Build core pages (Homepage, The Snooze Method, About Sally, Blog structure)
3. ⏳ Migrate 36 blog posts
4. ⏳ Set up Cloudflare redirects
5. ⏳ Test and launch




