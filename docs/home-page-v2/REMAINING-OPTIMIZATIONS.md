# Remaining Performance Optimizations

## Summary
Based on the Performance Analysis Report, here are the code-level optimizations we can still implement to improve speed.

## ✅ Already Implemented

1. ✅ Click-to-load Wistia video (defers 317 KiB)
2. ✅ Click-to-load Spotify embed
3. ✅ Non-blocking font loading (media="print" trick)
4. ✅ Deferred Font Awesome loading
5. ✅ DNS prefetch for external domains
6. ✅ Lazy loading images (below-fold)
7. ✅ Hero image fetchpriority="high"

## 🔴 Code-Level Optimizations Still Available

### 1. JavaScript Minification
**Potential Savings:** ~2-3 KiB (small but free)
**Effort:** 5 minutes
**Status:** Not done

**Action:** Minify `home-page-v2.js` before deployment
- Remove comments
- Minify whitespace
- Can use online tool or build step

---

### 2. Critical CSS Inlining
**Potential Savings:** ~0.99s (LCP improvement)
**Effort:** 30-45 minutes
**Status:** Not done

**What it is:** Inline the above-the-fold CSS directly in the `<head>` to eliminate render-blocking CSS.

**Implementation:**
- Extract critical CSS (hero section, trust bar, first content section)
- Add as `<style>` block in `<head>`
- Keep full CSS in global file for below-fold content

**Note:** Since CSS is now in global unified theme, this would require:
1. Identifying critical styles for hero/above-fold
2. Creating a small inline `<style>` block
3. Ensuring it doesn't conflict with global CSS

---

### 3. Image Format Optimization (WebP)
**Potential Savings:** ~0.72s
**Effort:** 15 minutes (if images available)
**Status:** Not done (requires image conversion)

**Action:** 
- Convert PNG images to WebP format
- Use `<picture>` element with fallback:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="..." loading="lazy">
</picture>
```

**Current Images:**
- Hero image: `d2fd0d-c6d4-0e1-01ad-1b846f205d8f_0d8c4d39-2879-4edf-a15a-152aea38e84f.png`
- About section: Same image (smaller size)

**Note:** Requires access to original images to convert. If images are hosted on Kajabi CDN, may need to upload WebP versions.

---

### 4. Image Size Optimization
**Potential Savings:** ~0.58s
**Effort:** 10 minutes (if images available)
**Status:** Not done

**Action:**
- Ensure images are served at display size (not larger)
- Hero image displays at ~600px, should be served at 600px or 1200px (2x for retina)
- About section image displays at 200px, should be served at 200px or 400px (2x)

**Current:** Images may be served at full resolution, wasting bandwidth.

---

### 5. Scroll-Based Analytics Deferral
**Potential Savings:** 80-150 KiB (if we can control analytics loading)
**Effort:** 1-2 hours
**Status:** Not done (requires Kajabi access)

**Note:** This requires access to Kajabi's tracking code injection settings. Cannot be done in page custom code alone.

**If possible:** Add script to defer non-critical analytics until user interaction:
```javascript
// Load analytics after first user interaction
['scroll', 'click', 'touchstart'].forEach(event => {
  window.addEventListener(event, () => {
    // Trigger analytics load
    if (window.gtag) window.gtag('js', new Date());
  }, { once: true, passive: true });
});
```

---

## 🟡 Platform-Level Optimizations (Cannot Do in Code)

These require Kajabi admin access:

### 1. Audit Kajabi Tracking Settings
**Potential Savings:** 150-200 KiB
**Action:** Kajabi Admin → Settings → Tracking & Code
- Remove Microsoft Clarity (if not actively used)
- Remove duplicate Facebook Pixels
- Remove abandoned tools
- Remove Rudderstack (if not using CDP)

### 2. Audit Google Tag Manager Container
**Potential Savings:** 50-100 KiB
**Action:** GTM → Tags
- Remove duplicate tags
- Verify only one GA4 instance
- Remove unused event tracking

### 3. Check Kajabi Global Integrations
**Potential Savings:** 50+ KiB
**Action:** Kajabi Settings → Integrations
- Check if Wistia is globally integrated (loads on every page)
- Remove unused integrations

### 4. Enable Kajabi Performance Settings
**Potential Savings:** 50-100 KiB
**Action:** Check Kajabi Settings for:
- "Defer non-critical JavaScript"
- "Minify CSS/JS"
- "Lazy load below-fold content"

---

## Priority Recommendations

### Immediate (Code-Level)
1. **JavaScript Minification** - Quick win, 5 minutes
2. **Image Format (WebP)** - If you have access to images, 15 minutes
3. **Image Size Optimization** - If you have access to images, 10 minutes

### Medium Priority
4. **Critical CSS Inlining** - 30-45 minutes, requires careful extraction

### Platform-Level (Requires Kajabi Access)
5. **Audit Tracking Settings** - 30 minutes, highest impact (150-200 KiB)
6. **Audit GTM Container** - 45 minutes, good impact (50-100 KiB)

---

## Total Potential Savings

**Code-Level (if we can do all):**
- JS Minification: ~2-3 KiB
- Critical CSS: ~0.99s improvement
- WebP Images: ~0.72s improvement
- Image Sizing: ~0.58s improvement
- **Total: ~2.3s improvement + 2-3 KiB**

**Platform-Level (requires Kajabi admin):**
- Tracking audit: 150-200 KiB
- GTM audit: 50-100 KiB
- Integrations: 50+ KiB
- **Total: 250-350 KiB reduction**

---

## Next Steps

1. **Immediate:** Minify JavaScript (5 min)
2. **If images available:** Convert to WebP and optimize sizes (25 min)
3. **If time permits:** Extract and inline critical CSS (45 min)
4. **Platform-level:** Schedule time to audit Kajabi tracking settings (30-45 min)

---

## Notes

- Most of the 1.4 MiB JavaScript payload is from third-party scripts (96%)
- Your custom code is already well-optimized (only 8 KiB)
- The biggest wins are in platform-level tracking audits (not code changes)
- Image optimizations require access to original image files
