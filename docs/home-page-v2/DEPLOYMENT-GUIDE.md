# Home Page V2 - Deployment Guide

## Issue Fixed
The styles weren't applying because CSS/JS were linked as external files. In Kajabi, CSS and JavaScript must be **pasted into Custom CSS/JS fields**, not linked as external files.

## Files Created

| File | Purpose | Where to Use |
|------|---------|--------------|
| `home-page-v2.html` | HTML blocks only | Paste sections into Kajabi code blocks |
| `home-page-v2.css` | Page-specific styles | Paste into Kajabi Custom CSS field |
| `home-page-v2.js` | Page-specific scripts | Paste into Kajabi Custom JavaScript field |

## Deployment Steps

### Step 1: Add HTML to Kajabi
1. Open `home-page-v2.html`
2. Copy each section (marked with `<!-- SECTION X: -->` comments)
3. Paste into Kajabi page code blocks
4. **Important:** Do NOT include `<head>`, `<body>`, `<style>`, or `<script>` tags
5. Font Awesome link is already included in the HTML

### Step 2: Add CSS to Kajabi
1. Open `home-page-v2.css`
2. Copy **ALL contents** (entire file)
3. Go to: **Kajabi → Settings → Website → Custom CSS**
   - OR use page-specific Custom CSS field
4. Paste the entire CSS file
5. **Note:** Global CSS (`snooze-unified-theme.css`) is already loaded and provides base variables

### Step 3: Add JavaScript to Kajabi
1. Open `home-page-v2.js`
2. Copy **ALL contents** (entire file)
3. Go to: **Kajabi → Settings → Website → Custom JavaScript**
   - OR use page-specific Custom JavaScript field
4. Paste the entire JS file
5. **Note:** Global JS (`snooze-globals.js`) is already loaded

### Step 4: Verify
- ✅ Font Awesome is included in HTML (already done)
- ✅ Footer is included at bottom of HTML (already done)
- ✅ Native Kajabi header will be used (no custom header needed)
- ✅ CSS variables use correct names (`--sn-text-light` not `--color-muted`)

## Fully Self-Contained

**Important:** This landing page is fully self-contained. It does NOT use global CSS/JS.

- All CSS variables, base styles, and component styles are in `home-page-v2.css`
- All JavaScript functions and checkout handling are in `home-page-v2.js`
- No dependencies on global theme files

## Testing Checklist

After deployment, verify:
- [ ] Trust bar displays with stats
- [ ] How It Works section shows 3 steps
- [ ] VSL video placeholder appears
- [ ] Why Snooze comparison shows 3 columns
- [ ] Before/After scenarios display correctly
- [ ] Support section shows 3 channels
- [ ] Age toggles work (JavaScript)
- [ ] Pricing cards show per-day cost
- [ ] Footer displays at bottom
- [ ] Sticky CTA bar appears on scroll (JavaScript)
- [ ] All testimonials show locations (UK, Australia, USA)

## Common Issues

**Styles not applying?**
- Make sure CSS is pasted into Custom CSS field (not linked)
- Check browser console for CSS errors
- Verify CSS variables are defined (check for `--color-navy`, `--color-coral` in :root)
- This page is self-contained - global CSS won't apply to landing pages

**JavaScript not working?**
- Make sure JS is pasted into Custom JavaScript field (not linked)
- Check browser console for JS errors
- Verify checkout URL is set (check for `window.SNOOZE_CHECKOUT_URL` in console)
- This page is self-contained - global JS won't apply to landing pages

**Footer not showing?**
- Footer HTML is at the bottom of `home-page-v2.html`
- Make sure it's included in the last code block
- Check that footer CSS is in global theme (it should be)

## Next Steps

Once tested and finalised:
- Keep CSS/JS in page-specific files (landing pages are self-contained)
- If patterns are reused, consider extracting to global later
- Update checkout URLs in JS if offer codes change
