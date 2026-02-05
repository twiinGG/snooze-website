# Footer Alignment Guide

**Canonical Footer File:** `pages/footer.html`  
**Purpose:** Ensure all page footers match the canonical footer exactly

---

## ⚠️ Important Notes

- **ALWAYS use the canonical footer file** (`pages/footer.html`) as the source of truth
- When updating footer content, update the canonical file first, then sync to all page files
- All footers must match exactly, including logo, links, structure, and styling

---

## 🔍 Differences Found

### Logo Implementation
- **Canonical footer:** Uses SVG logo (lines 12-16)
- **Age pages:** Use text `<span class="sf-logo-text">Snooze</span>`

### Missing Elements in Age Pages
- **Column 4 heading:** Age pages are missing `<h4 class="sf-heading">Support</h4>`

---

## 📋 Files That Need Footer Alignment

### Age Pages (All need updating)
1. `pages/age-pages/toddler-page-complete.html` (lines 668-734)
2. `pages/age-pages/5-12-month-page-complete.html` (lines 668-734)
3. `pages/age-pages/3-4-month-page-complete.html` (lines 685-751)
4. `pages/age-pages/newborn-page-complete.html` (lines 671-737)

### Other Pages
5. `pages/about-sally/about-sally-complete.html` (lines 424-497)

---

## ✅ Canonical Footer Structure

**File:** `pages/footer.html`  
**Lines:** 1-79

**Key Elements:**
1. **Logo:** SVG logo (lines 12-16) with link to homepage
2. **Column 1 - Brand:** Logo, tagline, social links
3. **Column 2 - Explore:** About Sally, Blog, Coaching links
4. **Column 3 - Members:** Library, Village, Login, Account links
5. **Column 4 - Support:** Heading + Contact, Terms, Privacy links
6. **Bottom:** Copyright notice

---

## 🔄 Sync Process

### When Footer Needs Updating:

1. **Update canonical file first:** `pages/footer.html`
2. **Copy exact code** from canonical footer (lines 1-79)
3. **Replace footer section** in each page file listed above
4. **Verify:** All footers match exactly

### Current Footer Section Markers:

Each page file has footer markers. Look for:
- Start: `<!-- ============================================ SNOOZE CLEAN FOOTER - PHASE 2 ============================================ -->`
- End: `</footer>` tag before `</body>`

---

## 📝 Specific Differences to Fix

### 1. Logo (Column 1)

**Canonical (correct):**
```html
<div class="sf-logo">
  <a href="/">
    <!-- Official Snooze Logotype (White) - Source: docs/branding/Snooze Logotype - white.svg -->
    <svg xmlns="http://www.w3.org/2000/svg" ...>
      <path fill="#ffffff" d="..."/>
    </svg>
  </a>
</div>
```

**Age Pages (incorrect - needs replacement):**
```html
<span class="sf-logo-text">Snooze</span>
```

### 2. Column 4 Heading

**Canonical (correct):**
```html
<h4 class="sf-heading">Support</h4>
<ul class="sf-links">
  ...
</ul>
```

**Age Pages (missing heading - needs addition):**
```html
<!-- Missing: <h4 class="sf-heading">Support</h4> -->
<ul class="sf-links">
  ...
</ul>
```

---

## ✅ Verification Checklist

After copying footer from canonical file, verify:

- [ ] SVG logo is present (not text)
- [ ] Logo links to homepage (`href="/"`)
- [ ] All four columns present
- [ ] Column 4 has "Support" heading
- [ ] All links match canonical footer
- [ ] Social links have `rel="noopener noreferrer"`
- [ ] Copyright notice matches
- [ ] Footer closes properly before `</body>` tag

---

## 🔗 Related Files

- **Canonical Footer:** `pages/footer.html`
- **Footer CSS:** `global/css/snooze-unified-theme.css` (look for `.snooze-footer-clean` styles)

---

## 📅 Last Updated

**Date:** January 2025  
**Status:** Ready for manual sync

**Note:** User will manually copy footer code from canonical file to page files.

---

**To sync footers:**
1. Open `pages/footer.html`
2. Copy entire footer section (lines 1-79)
3. Paste into each file listed above, replacing existing footer section
4. Verify all footers match exactly

