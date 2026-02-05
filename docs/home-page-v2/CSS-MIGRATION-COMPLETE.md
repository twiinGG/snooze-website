# CSS Migration to Global Unified Theme - Complete

## Summary
All styles from `home-page-v2.css` have been successfully merged into the global unified CSS file at:
`projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`

## What Was Done

### 1. Variable Aliases Added
Added compatibility aliases in the `:root` section to map home page variables to global variables:
- `--c-coral` → `var(--sn-coral)`
- `--c-navy` → `var(--sn-navy)`
- `--c-cream` → `var(--sn-cream)`
- `--c-beige` → `var(--color-beige)`
- `--c-white` → `var(--sn-white)`
- `--c-sage` → `var(--color-sage)`
- `--c-yellow` → `var(--color-yellow)`
- `--c-text` → `var(--sn-text-dark)`
- `--c-muted` → `var(--sn-text-light)`
- `--font-head` → `var(--font-heading)`
- `--radius` → `var(--radius-md)`
- `--shadow-card` → `var(--shadow-md)`
- `--shadow-pop` → `var(--shadow-lg)`
- `--shadow-soft` → `var(--shadow-sm)`
- `--ring` → Added new (focus ring style)

### 2. Styles Appended
All home page styles (from line 28 onwards) were appended to the global CSS file with a section header:
```css
/* ============================================
   HOME PAGE V2 STYLES
   Complete styles for the new home page
   ============================================ */
```

### 3. HTML File Status
- ✅ No CSS file link in HTML (correct - styles are now global)
- ✅ Font and icon stylesheet links remain (for performance optimization)
- ✅ JavaScript remains separate (will be added to page custom code)

## Deployment Instructions

### For Kajabi Global CSS:
1. Open Kajabi Settings → Website → Theme → Custom CSS
2. Copy the entire contents of:
   `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`
3. Paste into the Custom CSS field
4. Save

### For Home Page (Kajabi Webpage):
1. Create/Edit the webpage in Kajabi
2. In the **Custom Code (Head)** field, add:
   - Resource hints (dns-prefetch)
   - Optimized font loading
   - Font Awesome preload
3. In the **Custom Code (Body)** field, add:
   - The HTML content from `home-page-v2.html` (starting from `<div id="home-page">`)
   - The JavaScript from `home-page-v2.js`
4. Save and publish

## Files Status

- ✅ `snooze-unified-theme.css` - **Updated** (home page styles merged)
- ✅ `home-page-v2.html` - **Ready** (no CSS link needed)
- ✅ `home-page-v2.js` - **Ready** (separate, for page custom code)
- ⚠️ `home-page-v2.css` - **Deprecated** (styles now in global CSS)

## Testing Checklist

- [ ] Verify page loads correctly in Kajabi
- [ ] Check all styles apply correctly
- [ ] Test responsive breakpoints
- [ ] Verify JavaScript functionality (age tabs, FAQ accordion, sticky CTA, carousel, lazy loading)
- [ ] Test video placeholder click-to-load
- [ ] Test Spotify embed placeholder click-to-load
- [ ] Verify fonts load correctly
- [ ] Check mobile performance

## Notes

- All variable references in the merged styles use the `--c-` prefix which now maps to global variables
- The Kajabi container breakout fixes are included in the global CSS
- Performance optimizations (lazy loading, resource hints) remain in the HTML
- JavaScript remains separate for page-specific functionality
