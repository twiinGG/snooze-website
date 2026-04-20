# Task: Kajabi Media Library Migration

Kajabi has released a media library feature. All website images should be migrated into it with proper naming, optimised sizes and SEO metadata.

---

## What Needs Doing

### 1. Audit Current Images

Go through every page on `joinsnooze.com` and catalogue:
- Every image currently on the site
- Its current filename (most will be auto-generated hashes like `c0d2c2a-05e0-a12f.webp`)
- What it shows (hero image, guide cover, testimonial, headshot, icon, etc.)
- Its dimensions and file size

### 2. Upload to Kajabi Media Library

Upload all images to Kajabi's new media library with descriptive filenames:

**Naming convention:** `[section]-[description]-[size].webp`

Examples:
- `hero-sally-headshot-main.webp`
- `guide-cover-newborn-0-3m.webp`
- `guide-cover-5-12m.webp`
- `testimonial-wall-of-impact.webp`
- `camp-snooze-hero-forest.webp`
- `footer-logo-coral.webp`
- `icon-checkmark-coral.svg`

### 3. Optimise File Sizes

- **Format:** WebP preferred for photos. SVG for icons and logos.
- **Hero images:** Max 1920px wide, under 200KB
- **Card/thumbnail images:** Max 800px wide, under 100KB
- **Icons:** SVG where possible, otherwise PNG with transparency
- **Guide covers:** Match current dimensions, optimise compression

### 4. Add Alt Text and Descriptions

Every image in the media library should have:
- **Alt text:** Descriptive, for accessibility and SEO (e.g., "Sally Woods, paediatric nurse and sleep consultant, smiling")
- **Description/caption:** Internal reference for the team (e.g., "Main hero headshot, used on homepage and about page")

### 5. Replace Hardcoded CDN URLs (Optional, Lower Priority)

Where Kajabi allows it, replace hardcoded CDN URLs in page HTML with media library references. This makes future image swaps easier (change once in the library vs. hunting through code).

**Note:** Some images are embedded in custom HTML code blocks. These may need to keep direct URLs. Flag any that can't be migrated.

---

## Pages to Cover

- Homepage
- About / Sally's story
- Snooze membership page
- Individual guide pages (newborn, 3-4m, 5-12m, toddler)
- Camp Snooze landing page
- Free guide landing pages
- Nap Trapped podcast page
- Blog (check featured images)
- Checkout pages
- Links / bio page

---

## Priority

**Medium.** Not urgent but improves maintainability and SEO. Good task to work through methodically.

**Source originals:** High-resolution originals for guide covers, headshots and social proof images are in Snooze Team Drive. See `docs/onboarding/DRIVE-ORIENTATION.md` for exact paths.

---

**Created:** April 20, 2026
