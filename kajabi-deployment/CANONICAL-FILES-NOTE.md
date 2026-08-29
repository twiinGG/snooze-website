# Archived Canonical Files Reference

**Date:** January 2025  
**Status:** ARCHIVED — historical reference only; unsafe as a current deployment runbook

**Purpose:** Preserve the January 2025 embedded-navigation/footer convention

> **Do not execute the instructions below.** The named `pages/navigation.html` and
> `pages/footer.html` paths do not exist in the current tree, and the live site uses Kajabi's native
> Header. Current authority is [`PASTE-MAP.md`](./PASTE-MAP.md), including A6 for the native
> `Start Here` field and A7's prohibition on deploying the historical custom navigation.

---

## ⚠️ IMPORTANT: Always Use Canonical Files

All complete page files (`*-complete.html`) should reference the canonical navigation and footer files instead of embedding them directly. This prevents conflicts and ensures consistency across all pages.

---

## Canonical Files

### Navigation
- **Canonical File:** `pages/navigation.html`
- **Replace with comment:** See below for exact comment format

### Footer  
- **Canonical File:** `pages/footer.html`
- **Replace with comment:** See below for exact comment format

---

## Replacement Comment Format

### Navigation Replacement Comment

Replace the entire navigation section (from `<!-- SECTION 0: NAVIGATION -->` through the closing `</script>`) with:

```html
<!-- ============================================
     SECTION 0: NAVIGATION
     ============================================
     IMPORTANT: Insert navigation code from canonical file:
     @projects/snooze-website/kajabi-deployment/pages/navigation.html
     ============================================ -->
```

### Footer Replacement Comment

Replace the entire footer section (from `<!-- SECTION X: FOOTER -->` through the closing `</footer>`) with:

```html
<!-- ============================================
     SECTION X: FOOTER
     ============================================
     IMPORTANT: Insert footer code from canonical file:
     @projects/snooze-website/kajabi-deployment/pages/footer.html
     ============================================ -->
```

---

## Files Updated

- ✅ `pages/age-pages/toddler-page-complete.html` - Navigation and footer replaced with comments

## Files Remaining

- [ ] `pages/age-pages/3-4-month-page-complete.html`
- [ ] `pages/age-pages/5-12-month-page-complete.html`
- [ ] `pages/age-pages/newborn-page-complete.html`
- [ ] `pages/about-sally/about-sally-complete.html`

---

## How to Update

1. Open the canonical file (`pages/navigation.html` or `pages/footer.html`)
2. Copy the entire contents (excluding HTML comments if desired)
3. Paste into the complete page file where the comment indicates
4. Ensure proper formatting and indentation

---

**Note:** The user will manually copy the code from canonical files to the complete page files. This document serves as a reference for which files need updating and where to get the canonical code.
