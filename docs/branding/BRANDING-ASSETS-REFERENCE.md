# Snooze Branding Assets Reference

**Purpose:** Central reference for all official Snooze branding assets used across the website.

**Location:** `docs/branding/`

**Last Updated:** December 5, 2025  
**Status:** Active Reference

---

## Available Assets

### 1. Snooze Logotype (Coral - Primary)
- **File:** `Snooze Logotype - coral.svg`
- **Type:** SVG (Scalable Vector Graphic)
- **Color:** Coral (#F43357)
- **Usage:** 
  - Primary logo for navigation header
  - Light backgrounds
  - Anywhere the full "snooze" wordmark is needed on light backgrounds
- **Dimensions:** 750x262.5px (viewBox)
- **Format:** Inline SVG or uploaded to Kajabi

### 1b. Snooze Logotype (White)
- **File:** `Snooze Logotype - white.svg`
- **Type:** SVG (Scalable Vector Graphic)
- **Color:** White (#FFFFFF)
- **Usage:** 
  - Footer logo (dark navy background)
  - Dark backgrounds
  - Anywhere the full "snooze" wordmark is needed on dark backgrounds
- **Dimensions:** 750x262.5px (viewBox)
- **Format:** Inline SVG or uploaded to Kajabi

### 2. Snooze Logo (Icon)
- **File:** `Snooze Logo - Coral.svg`
- **Type:** SVG (Scalable Vector Graphic)
- **Color:** Coral (#F43357)
- **Usage:**
  - Favicon (when converted to PNG/ICO)
  - App icons
  - Social media profile images
  - Compact spaces where full logotype doesn't fit
- **Dimensions:** 595.28x595.28px (square)
- **Format:** SVG or converted to PNG/ICO for favicon

### 3. Favicon
- **File:** `TSC - Favicon_Coral.png`
- **Type:** PNG (Portable Network Graphic)
- **Color:** Coral (#F43357)
- **Usage:**
  - Browser tab icon
  - Bookmark icon
  - Browser favorites
- **Format:** PNG (16x16, 32x32, or larger - browser will scale)

---

## Deployment Instructions

### For Kajabi

1. **Upload Assets to Kajabi:**
   - Go to Kajabi Admin → **Settings → Files**
   - Upload all three branding files
   - Note the URLs provided by Kajabi

2. **Update HTML Code:**
   - Replace logo references in `kajabi-html-blocks.html` with uploaded URLs
   - Or use inline SVG for logotype (recommended for performance)

3. **Set Favicon:**
   - Go to Kajabi Admin → **Settings → Website → Favicon**
   - Upload `TSC - Favicon_Coral.png`
   - Or add to page custom code in `<head>` section

---

## Code Implementation

### Logotype in Navigation Header (Coral)

**Option 1: Inline SVG (Recommended)**
```html
<div class="logo">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 262.5" width="150" height="52">
    <!-- SVG content from Snooze Logotype - coral.svg -->
  </svg>
</div>
```

**Option 2: Uploaded Image**
```html
<div class="logo">
  <img src="[Kajabi-uploaded-URL]" alt="Snooze" width="150" height="52">
</div>
```

### Logotype in Footer (White)

**Option 1: Inline SVG (Recommended)**
```html
<div class="sf-logo">
  <a href="/">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 262.5" width="150" height="52">
      <!-- SVG content from Snooze Logotype - white.svg -->
    </svg>
  </a>
</div>
```

**Option 2: Uploaded Image**
```html
<div class="sf-logo">
  <a href="/">
    <img src="[Kajabi-uploaded-URL]" alt="Snooze" width="150" height="52">
  </a>
</div>
```

### Favicon in Page Head

```html
<link rel="icon" type="image/png" href="[Kajabi-uploaded-favicon-URL]">
```

---

## File Locations

**Source Files:**
- `docs/branding/Snooze Logotype - coral.svg`
- `docs/branding/Snooze Logotype - white.svg`
- `docs/branding/Snooze Logo - Coral.svg`
- `docs/branding/TSC - Favicon_Coral.png`

**Usage in Code:**
- Navigation header: `projects/landing-page/kajabi-deployment/kajabi-html-blocks.html` (Section 0)
- Footer: `projects/landing-page/kajabi-deployment/kajabi-html-blocks.html` (Footer section)
- Favicon: Kajabi page settings or custom head code

---

## Brand Guidelines

### Logo Usage
- **Navigation:** Use coral logotype on light backgrounds (navigation header)
- **Footer:** Use white logotype on dark backgrounds (footer with navy background)
- **Icon:** Use logo icon for favicon, social media, compact spaces
- **Color Selection:** 
  - Light backgrounds → Coral (#F43357) logotype
  - Dark backgrounds → White (#FFFFFF) logotype
- **Minimum Size:** Logotype should be at least 100px wide for readability
- **Spacing:** Maintain clear space around logo (at least 20px)

### Favicon
- Use coral version for consistency
- Ensure it's readable at 16x16px size
- Test in browser tabs and bookmarks

---

**Last Updated:** December 5, 2025  
**Maintained By:** Snooze Website Development Team

