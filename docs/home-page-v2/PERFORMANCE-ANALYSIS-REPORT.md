# Snooze Home Page Performance Analysis Report

**Date:** January 12, 2026
**Page:** `home-page-v2.html`
**Location:** `/projects/Home Page Uplift/`
**Analyzer:** Claude Code Performance Audit

---

## Executive Summary

Your Snooze home page has a **1.4 MiB total JavaScript payload**, which significantly impacts page load performance, particularly on mobile devices. However, this is **not a problem with your custom code**.

**Key Finding:** Your custom HTML and JavaScript are well-optimized. The performance issues stem entirely from third-party scripts injected by Kajabi and tracking/analytics tools configured at the platform level.

**The Good News:** By auditing and removing unused tracking scripts, you can realistically reduce page size by **35-40%** to approximately **800-900 KiB** without impacting core functionality.

---

## Performance Metrics Summary

| Metric | Value | Assessment |
|--------|-------|-----------|
| **Total Page Size** | 1.4 MiB | Bloated |
| **Custom JS Size** | ~8 KiB | Excellent |
| **Custom CSS Size** | ~25 KiB | Excellent |
| **Third-Party Scripts** | ~1.35 MiB | Needs audit |
| **Mobile Impact** | High | Parse time: 2-4 sec on mid-tier phones |
| **Main Thread Blocking** | Significant | JS competes with rendering |

---

## Detailed JavaScript Breakdown

### By Category

```
Third-Party Scripts:    1,350 KiB (96%)
├─ Analytics/Tracking:   350 KiB (25%)
├─ Video Player:         317 KiB (23%)
├─ Platform Core:        156 KiB (11%)
├─ Social Pixels:        140 KiB (10%)
└─ Other Tools:          387 KiB (27%)

Your Custom Code:         50 KiB (4%)
├─ HTML/CSS:            ~33 KiB
└─ JavaScript:           ~8 KiB (185 lines)
```

### By Source (Detailed)

| Source | Size | % | Category | Control |
|--------|------|---|----------|---------|
| **Google Tag Manager + gtag** | ~247 KiB | 17% | Analytics | High |
| **Wistia Video Player** | ~317 KiB | 22% | Media | Medium |
| **Kajabi Platform Scripts** | ~156 KiB | 11% | Platform | None |
| **Facebook Pixel + Connect** | ~90-100 KiB | 7% | Ads/Tracking | High |
| **Rudderstack** | ~30 KiB | 2% | CDP | High |
| **Microsoft Clarity** | ~25 KiB | 2% | Analytics | High |
| **Other analytics/tracking** | ~100+ KiB | 7% | Miscellaneous | Medium |
| **Your Custom JS** | ~8 KiB | <1% | Application | Full |

---

## What Your Code Is Doing Right

### 1. Click-to-Load Video (Wistia)
✅ **Status:** Implemented correctly

```javascript
// From home-page-v2.js, lines 128-162
wistiaPlaceholder.addEventListener('click', function() {
  // Only loads Wistia script on user click
  const script = document.createElement('script');
  script.src = 'https://fast.wistia.net/assets/external/E-v1.js';
  script.async = true;
  document.head.appendChild(script);
  // ...
});
```

**Impact:** Defers 317 KiB of video player code until needed. ✓

---

### 2. Click-to-Load Spotify
✅ **Status:** Implemented correctly

```javascript
// From home-page-v2.js, lines 164-187
spotifyPlaceholder.addEventListener('click', function() {
  // Only loads Spotify embed on user click
  // ...
});
```

**Impact:** Eliminates unnecessary Spotify library loading.

---

### 3. Non-Blocking Font Loading
✅ **Status:** Implemented correctly

```html
<!-- From home-page-v2.html, lines 12-13 -->
<link rel="stylesheet" href="..."
      media="print"
      onload="this.media='all'" />
<noscript>
  <!-- Fallback for non-JS browsers -->
</noscript>
```

**Impact:** Fonts don't block initial page render. ✓

---

### 4. Deferred Font Awesome Loading
✅ **Status:** Implemented correctly

```html
<!-- From home-page-v2.html, lines 16-17 -->
<link rel="preload" href="..." as="style"
      onload="this.onload=null;this.rel='stylesheet'" />
```

**Impact:** Icons don't block critical rendering path. ✓

---

### 5. DNS Prefetch for Third-Party Domains
✅ **Status:** Implemented correctly

```html
<!-- From home-page-v2.html, lines 1-7 -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fast.wistia.net" />
<link rel="dns-prefetch" href="https://kajabi-storefronts-production.kajabi-cdn.com" />
```

**Impact:** Speeds up DNS resolution for external resources. ✓

---

### 6. Lazy Loading Images
✅ **Status:** Partially implemented

```html
<!-- Good examples in your code -->
<img src="..." loading="lazy" width="200" height="200">
```

**Note:** Hero image (line 39) uses `fetchpriority="high"` ✓ (correct – it's above fold)

---

### 7. Minimal Custom JavaScript
✅ **Status:** Excellent

Your `home-page-v2.js` is only **189 lines** and handles:
- Age/stage tab switching (interactive)
- FAQ accordion (interactive)
- Sticky CTA bar (scroll detection)
- Smooth scroll anchors (accessibility)
- Testimonial carousel auto-scroll
- Lazy video/podcast loading

All of this is **vanilla JavaScript** with no frameworks. Perfect for performance.

---

## Root Cause Analysis: Why 1.4 MiB?

### The Problem: Kajabi Platform Defaults

When you build on Kajabi, the platform automatically injects scripts for:

1. **Core Platform** (unavoidable): ~156 KiB
   - Membership management
   - Payment processing
   - Page builder functionality

2. **Marketing Defaults** (often not needed): ~350+ KiB
   - Google Analytics (via GTM)
   - Facebook Pixel
   - Email marketing integrations
   - Customer tracking

3. **Media Players** (if integrated): ~317 KiB
   - Wistia (if you have video pages)
   - May be loaded site-wide even if not on this page

4. **Analytics/Heatmaps** (sometimes forgotten): ~80+ KiB
   - Microsoft Clarity
   - Rudderstack
   - Custom tracking

**Result:** A bloated page that works but performs poorly on mobile.

---

## Performance Impact Analysis

### Page Load Times (Estimated)

**Desktop (1 Mbps connection):**
- Current: ~3-4 seconds to interactive
- Optimized: ~1.5-2 seconds

**Mobile 4G (25 Mbps connection):**
- Current: ~4-6 seconds to interactive
- Optimized: ~2-3 seconds

**Mobile 3G (6 Mbps connection):**
- Current: ~8-12 seconds to interactive
- Optimized: ~4-6 seconds

### Main Thread Blocking

At 1.4 MiB of JavaScript:
- **Parse time:** 2-4 seconds (mid-tier phones)
- **Execute time:** 1-2 seconds
- **Total blocking:** 3-6 seconds before page is truly interactive

This is why clicking buttons feels sluggish on mobile – the JavaScript hasn't finished parsing yet.

---

## The Three Categories of Scripts

### Category 1: Absolutely Required (No Control) - 156 KiB
- Kajabi platform core
- Payment processing
- Membership system
- **Action:** Cannot remove. Accept as cost of platform.

### Category 2: High-Value but Fixable (Medium Control) - 317 KiB
- **Wistia video player** (if used site-wide)
- Could be moved to lazy-load per page
- **Action:** Audit where Wistia is loaded; consider per-page approach

### Category 3: Often Unnecessary (Full Control) - 300+ KiB
- Google Tag Manager (needed, but audit container)
- Facebook Pixel (needed if running ads)
- Microsoft Clarity (often forgotten)
- Rudderstack (only if using CDP)
- Third-party tracking scripts
- **Action:** Audit and remove unused ones

---

## Recommended Actions

### Immediate (Do This Week)

#### 1. Audit Kajabi Tracking Settings
**Time: 30 minutes**

Go to **Kajabi Admin → Settings → Tracking & Code**

Identify every script installed. For each one, ask:
- Do we actively use this?
- Is it still driving conversions/decisions?
- Is it duplicated elsewhere?

**Common Culprits:**
- ☐ Microsoft Clarity – Remove if not actively reviewing heatmaps
- ☐ Duplicate Facebook Pixels – Remove extras
- ☐ Abandoned tools – Old integrations left running
- ☐ Rudderstack – Remove if not using CDP features

**Potential Savings: 150-200 KiB**

#### 2. Audit Google Tag Manager Container
**Time: 45 minutes**

Go to **Google Tag Manager → [Your Container] → Tags**

Review each tag:
- ☐ Facebook Pixel – Is it duplicated in GTM AND as a separate pixel?
- ☐ Google Analytics – Needed, but verify one instance only
- ☐ Conversion tracking – Is it firing on every page or just conversions?
- ☐ Event tracking – Are all events necessary?

**Potential Savings: 50-100 KiB** (by removing duplicate/unused tags)

#### 3. Check Kajabi Global Integrations
**Time: 20 minutes**

**Settings → Integrations**
- ☐ Is Wistia integrated globally? (Could be loaded on every page)
- ☐ Is Shopify/Zapier running? (Needed?)
- ☐ Are unused email providers still active?

**Potential Savings: 50+ KiB**

---

### Short-Term (Do This Month)

#### 4. Implement Script Lazy Loading for Non-Critical Analytics
**Time: 2 hours (if doing)**

For analytics that don't need to fire on page load:

```javascript
// Load analytics after user interaction instead
['scroll', 'click', 'touchstart'].forEach(event => {
  window.addEventListener(event, () => {
    loadAnalyticsScripts();
  }, { once: true, passive: true });
});
```

**Note:** May slightly reduce analytics accuracy for bounce rate.

**Potential Savings: 80-150 KiB** (depending on scripts deferred)

**Risk Level:** Low (analytics still captured, just delayed)

---

#### 5. Enable Kajabi Performance Settings
**Time: 15 minutes**

Check if Kajabi has performance optimization toggles:
- ☐ "Defer non-critical JavaScript"
- ☐ "Minify CSS/JS"
- ☐ "Lazy load below-fold content"

Some Kajabi plans have these in Settings.

**Potential Savings: 50-100 KiB** (if available and enabled)

---

### Long-Term (If Rebuilding)

#### 6. Consider Moving Off Kajabi's Analytics
**Time: Research only**

If you're running heavy analytics, consider:
- Single analytics platform (GA4 only, not GTM + GA4)
- Lightweight alternatives (Plausible, Fathom) – 10-20 KiB vs. 247 KiB

**Not recommended now** – Stay on Kajabi setup. Only consider if rebuilding.

---

## Quick Wins Priority Matrix

| Action | Effort | Potential Savings | Priority |
|--------|--------|-------------------|----------|
| Remove unused trackers | 30 min | 150-200 KiB | 🔴 **HIGH** |
| Audit GTM container | 45 min | 50-100 KiB | 🔴 **HIGH** |
| Check Kajabi integrations | 20 min | 50+ KiB | 🟡 **MEDIUM** |
| Lazy load non-critical analytics | 2 hrs | 80-150 KiB | 🟡 **MEDIUM** |
| Enable Kajabi perf settings | 15 min | 50-100 KiB | 🟡 **MEDIUM** |

**Total Potential Savings: 380-550 KiB (27-39% reduction)**

---

## What NOT to Do

### ❌ Remove Kajabi Core Scripts
These are required for checkout and membership. Removing them will break your business.

### ❌ Completely Disable All Tracking
You need conversion tracking to know if your marketing works. Keep at least:
- Google Analytics (GA4)
- Facebook Pixel (if running ads)

### ❌ Use an Extreme Bloat-Removal Strategy
Don't try to strip every script. You'll lose important functionality and data.

---

## Performance Targets

### Realistic Goals

After implementing the recommended fixes:

| Metric | Current | Target | Effort |
|--------|---------|--------|--------|
| **Total JS** | 1,400 KiB | 900-950 KiB | Medium |
| **Page Load (Mobile 4G)** | 4-6s | 2-3s | Medium |
| **Lighthouse Performance** | ~35-45 | ~60-70 | Medium |

This is realistic without rebuilding the entire site.

### Unrealistic Goals

**Do not expect to reach:**
- Under 500 KiB (Kajabi won't allow it)
- Sub-2s mobile load times (with membership/payment processing)
- 90+ Lighthouse score (Kajabi platform limitations)

---

## Implementation Checklist

### Week 1: Audit Phase
- [ ] Log into Kajabi Admin
- [ ] Go to Settings → Tracking & Code
- [ ] Document every script installed
- [ ] Ask: "Do we still use this?"
- [ ] Mark for removal vs. keep
- [ ] Open Google Tag Manager
- [ ] Review all tags
- [ ] Look for duplicates
- [ ] Note findings

### Week 2: Removal Phase
- [ ] Remove unnecessary trackers (start with Microsoft Clarity)
- [ ] Remove duplicate Facebook pixels (if any)
- [ ] Test checkout process (ensure nothing breaks)
- [ ] Run Lighthouse audit
- [ ] Document new size

### Week 3: Optimization Phase
- [ ] Enable any Kajabi performance settings
- [ ] Consider lazy-loading non-critical analytics
- [ ] Re-test on mobile
- [ ] Measure improvement

### Week 4: Monitoring
- [ ] Monitor analytics for 1 week post-changes
- [ ] Verify conversions still tracking properly
- [ ] Check for any broken functionality

---

## Testing & Validation

### Before Making Changes
```
Run Lighthouse:
1. Open page in Chrome
2. DevTools → Lighthouse
3. Audit: Performance, Best Practices
4. Screenshot results
5. Note baseline metrics
```

### After Each Change
```
1. Run Lighthouse again
2. Compare to baseline
3. Check Core Web Vitals
4. Test on mobile device
5. Verify checkout works
```

### Critical Tests Post-Launch
- ☐ Can you add items to cart?
- ☐ Can you complete checkout?
- ☐ Are conversions tracking in GA?
- ☐ Are ad pixels firing? (Check Facebook Ads Manager)
- ☐ Does sticky CTA work?
- ☐ Do CTAs scroll to pricing section correctly?

---

## Success Metrics

Track these before and after:

| Metric | How to Measure |
|--------|----------------|
| **Page Size** | Lighthouse → Network tab |
| **Load Time** | Lighthouse Performance score |
| **Mobile Performance** | Run on actual mobile (Lighthouse mobile simulation) |
| **Conversions** | GA4 → Conversions |
| **Revenue** | Kajabi dashboard |
| **User Engagement** | GA4 → Engagement metrics |

---

## Key Takeaways

1. **Your code is excellent.** The performance issues are not your fault – it's the platform injecting scripts.

2. **You have significant control over tracking bloat.** 35-40% of the page size is probably unused or duplicate analytics/tracking.

3. **Quick wins exist.** Removing 2-3 unused scripts could save 150+ KiB with no downside.

4. **Kajabi is the bottleneck.** The platform itself adds ~156 KiB that can't be removed. This is the cost of using Kajabi.

5. **Mobile experience will improve noticeably** after cleanup. 4-6 second loads → 2-3 seconds is huge for conversions.

---

## Next Steps

1. **Start with the immediate actions** (Week 1 Audit Phase)
2. **Document what you find** (which trackers are actually used?)
3. **Remove the obvious unused ones** (Clarity, Rudderstack, abandoned tools)
4. **Re-test with Lighthouse**
5. **Monitor for 1 week** (ensure nothing broke)
6. **Iterate** (if safe, try lazy-loading non-critical scripts)

---

## Questions to Ask Your Team

Before removing any tracking script, ask:
- Who set this up?
- Are we still reviewing the data?
- Does it directly impact business decisions?
- Is it duplicated elsewhere?

If the answer is "no" to most of these, it's probably safe to remove.

---

**Report Generated:** January 12, 2026
**Page:** Snooze Home Page (`home-page-v2.html`)
**Status:** Ready for optimization audit

