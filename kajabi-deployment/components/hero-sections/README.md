# Hero Sections - Templates Only

**Purpose:** Generic hero section templates for creating new pages

**Status:** Templates only - all specific hero sections have been consolidated into complete page files

---

## ⭐ Complete Page Files

All hero sections are now integrated into complete page files:

- **Age Pages:** `../age-pages/*-page-complete.html`
- **Other Pages:** `../pages/*-page-complete.html`

**See:** `../../DEPLOYMENT-GUIDE.md` for deployment instructions.

---

## Template Files

Use these templates as a base when creating new pages:

### 1. `hero-template-age-specific.html`
**For:** Age-specific pages (newborn, 3-4-month, 5-12-month, toddler)

**Features:**
- Two-column layout (content + image)
- Context-aware CTA
- Age-specific image support
- Trust signal

**Variables to replace:**
- `{AGE}` - Age identifier (e.g., "newborn", "3-4-month")
- `{HEADLINE}` - Main headline
- `{SUBHEADLINE}` - Supporting text
- `{POINT_1}`, `{POINT_2}`, `{POINT_3}` - Supporting points
- `{IMAGE_URL}` - Hero image URL
- `{IMAGE_ALT}` - Image alt text

---

### 2. `hero-template-product.html`
**For:** Product/course landing pages

**Features:**
- Single-column layout
- Context-aware CTA
- Product-focused messaging
- Trust signal

**Variables to replace:**
- `{PRODUCT_ID}` - Product identifier
- `{HEADLINE}` - Product name/title
- `{SUBHEADLINE}` - Product description
- `{POINT_1}`, `{POINT_2}`, `{POINT_3}` - Key features

---

### 3. `hero-template-landing.html`
**For:** General landing pages (homepage, library, etc.)

**Features:**
- Flexible layout
- Context-aware CTA
- Trust signal

**Variables to replace:**
- `{TYPE}` - Hero type (e.g., "landing", "access", "foundational")
- `{PAGE_ID}` - Page identifier
- `{HEADLINE}` - Main headline
- `{SUBHEADLINE}` - Supporting text
- `{POINT_1}`, `{POINT_2}`, `{POINT_3}` - Supporting points

---

## Usage

1. **Copy the appropriate template**
2. **Replace all variables** with actual content
3. **Add to complete page file** (see `../pages/` or `../age-pages/`)
4. **All styling** comes from `snooze-unified-theme.css`

---

## Styling

All hero section styles are in:
- `../../snooze-unified-theme.css` (for website pages)
- `../../snooze-landing-pages.css` (for landing pages)

**No separate CSS file needed** - styles are integrated into unified theme.

---

## Context-Aware CTA

All templates include context-aware CTA that:
- Shows "Join Snooze" for new visitors
- Shows "Upgrade to Snooze" for logged-in non-members
- Shows "Go to Library" for Snooze members
- Falls back to signposting if detection fails

---

**Last Updated:** December 04, 2025
