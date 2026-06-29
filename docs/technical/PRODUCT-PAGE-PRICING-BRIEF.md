# Product Page Pricing Section - Implementation Brief

**Date:** January 21, 2026  
**Status:** Locked - Reference implementation on 5-12 Month Course page  
**Applies To:** All product landing pages

## Overview

This brief documents the standardized pricing section structure for all product landing pages. The pricing section presents two options: the individual course purchase and Snooze membership access, using a consistent design system that works across all product pages.

## Reference Implementation

**Complete Example:** `projects/snooze-website/kajabi-deployment/pages/website/product-pages/5-12-month-course/5-12-month-guide-landing-page.html` (lines 372-425)

## Pricing Section Structure

### Two-Card Layout

The pricing section uses a two-card comparison layout:

1. **Individual Course Card** (left) - One-time purchase option
2. **Snooze Access Card** (right, featured) - Monthly membership option

### HTML Structure

```html
<section id="course-access" class="snooze-section bg-white">
  <div class="snooze-container">
    <div class="text-center">
      <h2>Choose how you want to access this course</h2>
      <p>Pick the option that works best for your family. You can cancel your Snooze membership anytime.</p>
    </div>

    <div class="price-grid">
      <!-- [COURSE NAME] Course -->
      <div class="price-card">
        <h3>[COURSE NAME] Course</h3>
        <div class="price-big">$[PRICE]</div>
        <p class="price-sub">one-time payment (USD)</p>

        <div style="background:#FAF7F4; padding:10px; font-size:0.8rem; border-radius:5px; margin-bottom:20px;">
          <ul style="text-align:left; margin:0; padding-left:20px; list-style:none;">
            <li style="margin-bottom:10px;"><i class="fa-solid fa-check" style="color:#7C8A98; margin-right:8px;"></i> Lifetime course access</li>
            <li style="margin-bottom:10px;"><i class="fa-solid fa-check" style="color:#7C8A98; margin-right:8px;"></i> Future updates</li>
            <li style="margin-bottom:10px;"><i class="fa-solid fa-xmark" style="color:#64748B; margin-right:8px;"></i> No sleep coaching support</li>
            <li style="margin-bottom:10px;"><i class="fa-solid fa-xmark" style="color:#64748B; margin-right:8px;"></i> No troubleshooting access</li>
          </ul>
        </div>

        <a href="[COURSE_CHECKOUT_URL]" class="btn btn-outline">Purchase Course</a>
      </div>

      <!-- Snooze Access -->
      <div class="price-card featured">
        <h3>Snooze Access</h3>
        <div class="price-big">$79</div>
        <p class="price-sub">per month (USD)</p>

        <div style="background:#FAF7F4; padding:10px; font-size:0.8rem; border-radius:5px; margin-bottom:20px;">
          <ul style="text-align:left; margin:0; padding-left:20px; list-style:none;">
            <li style="margin-bottom:10px;"><i class="fa-solid fa-check" style="color:#7C8A98; margin-right:8px;"></i> This course included</li>
            <li style="margin-bottom:10px;"><i class="fa-solid fa-check" style="color:#7C8A98; margin-right:8px;"></i> Every other course</li>
            <li style="margin-bottom:10px;"><i class="fa-solid fa-check" style="color:#7C8A98; margin-right:8px;"></i> Troubleshooting support</li>
            <li style="margin-bottom:10px;"><i class="fa-solid fa-check" style="color:#7C8A98; margin-right:8px;"></i> Live sessions with the Snooze Specialists</li>
            <li style="margin-bottom:10px;"><i class="fa-solid fa-check" style="color:#7C8A98; margin-right:8px;"></i> The Snooze Village</li>
            <li style="margin-bottom:10px;"><i class="fa-solid fa-check" style="color:#7C8A98; margin-right:8px;"></i> Member pricing on consultations and Camp Snooze</li>
          </ul>
        </div>

        <a href="https://www.joinsnooze.com/offers/z63s9VaR" class="btn">Join Snooze</a>
        <div class="price-microcopy">Cancel anytime</div>
      </div>
    </div>

    <div class="text-center" style="margin-top:30px; font-size:0.85rem; color:#7C8A98;">
      <span><i class="fa-solid fa-lock"></i> Secure checkout</span><br>
      <span><i class="fa-brands fa-apple-pay"></i> Apple Pay available</span><br>
      <span><i class="fa-solid fa-check"></i> Cancel anytime</span>
    </div>
  </div>
</section>
```

## Copy Guidelines

### Course Card Features (Standardized)
- ✅ Lifetime course access
- ✅ Future updates
- ❌ No sleep coaching support
- ❌ No troubleshooting access

### Snooze Access Card Features (Standardized)
- ✅ All courses and resources included
- ✅ Support from Newborn to 3 Years Old
- ✅ Live sessions with the Snooze Specialists
- ✅ The Snooze Village
- ✅ Member pricing on consultations and Camp Snooze

### Course Name Format
- Use full course name: "[Age Range] Month Course" (e.g., "5-12 Month Course", "3-4 Month Course")
- Match the exact course name used elsewhere on the page

## CSS Requirements

### Critical: Multi-Page Scoping

**All pricing styles MUST use multi-ID selectors** to work across product pages. The CSS is located in `snooze-unified-theme.css` Section 14 (PRICING).

**Required Page IDs:**
- `#home-page`
- `#product-3-4-month-course-page`
- `#product-5-12-month-course-page`
- `#product-newborn-guide-page`
- `#product-snooze-method-page`
- `#product-toddler-toolkit-page`

### CSS Variable Issue (CRITICAL)

**Problem:** CSS custom properties (`var(--c-coral)`, `var(--radius)`, etc.) are scoped to `#home-page` and not accessible on product pages.

**Solution:** Pricing section CSS uses **hardcoded hex values** instead of CSS variables:

- `var(--c-coral)` → `#F43357`
- `var(--c-coral-hover)` → `#D62646`
- `var(--c-navy)` → `#1F293B`
- `var(--c-muted)` → `#64748B`
- `var(--c-cream)` → `#FAF7F4`
- `var(--c-sage)` → `#7C8A98`
- `var(--radius)` → `20px`
- `var(--shadow-soft)` → `0 4px 20px rgba(0,0,0,0.06)`

### Required CSS Classes

The following utility classes must be available for product pages:

```css
/* Layout Utilities */
#product-[PAGE-ID] .snooze-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
#product-[PAGE-ID] .snooze-section { padding: 72px 0; }
#product-[PAGE-ID] .bg-white { background: #ffffff; }
#product-[PAGE-ID] .bg-cream { background: #FAF7F4; }
#product-[PAGE-ID] .text-center { text-align: center; }

/* Pricing Grid */
#product-[PAGE-ID] .price-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1100px; margin: 40px auto; }

/* Price Cards */
#product-[PAGE-ID] .price-card { background: white; padding: 40px; border-radius: 20px; border: 1px solid rgba(15, 23, 42, 0.08); text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.06); position: relative; transition: transform 0.2s ease, box-shadow 0.2s ease; }

/* Featured Card */
#product-[PAGE-ID] .price-card.featured { border: 2px solid #F43357; box-shadow: 0 10px 30px rgba(0,0,0,0.12); transform: scale(1.02); overflow: visible; }

/* "MOST POPULAR" Badge */
#product-[PAGE-ID] .price-card.featured::before { content: "MOST POPULAR"; position: absolute; top: -16px; left: 20px; right: 20px; background: #F43357; color: white; padding: 8px 16px; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.5px; text-transform: uppercase; border-radius: 999px; box-shadow: 0 8px 18px rgba(244, 51, 87, 0.25); z-index: 10; }

/* Price Elements */
#product-[PAGE-ID] .price-big { font-size: 3rem; font-weight: 700; color: #1F293B; }
#product-[PAGE-ID] .price-sub { color: #64748B; }
#product-[PAGE-ID] .price-microcopy { position: absolute; left: 0; right: 0; bottom: 20px; text-align: center; font-size: 0.75rem; color: #64748B; pointer-events: none; }

/* Buttons */
#product-[PAGE-ID] .btn { display: inline-flex; align-items: center; justify-content: center; padding: 14px 32px; background: #F43357; color: white; font-weight: 600; border-radius: 50px; border: none; cursor: pointer; min-height: 48px; box-shadow: 0 6px 18px rgba(244, 51, 87, 0.22); text-decoration: none; }
#product-[PAGE-ID] .btn:hover { background: #D62646; transform: translateY(-2px); color: white; }
#product-[PAGE-ID] .btn-outline { background: transparent; border: 1px solid rgba(244, 51, 87, 0.45); color: #F43357; box-shadow: none; }
#product-[PAGE-ID] .btn-outline:hover { background: rgba(244, 51, 87, 0.08); border-color: rgba(244, 51, 87, 0.7); color: #F43357; }
```

**Note:** All selectors must include all product page IDs using comma-separated selectors.

## Implementation Checklist

When adding/updating pricing sections on product pages:

- [ ] Use two-card layout (Course + Snooze Access)
- [ ] Course card uses correct course name format
- [ ] Course card features list matches standard (4 items)
- [ ] Snooze Access card is marked with `featured` class
- [ ] Snooze Access card features list matches standard (6 items)
- [ ] All lists wrapped in styled container div (`background:#FAF7F4; padding:10px; font-size:0.8rem; border-radius:5px; margin-bottom:20px;`)
- [ ] CTA button text: "Join Snooze" (not "Start Monthly")
- [ ] All inline styles use hardcoded hex values (no CSS variables)
- [ ] Section uses `snooze-section bg-white` classes
- [ ] Container uses `snooze-container` class
- [ ] Footer trust indicators included
- [ ] CSS includes multi-ID selectors for all product page IDs

## Product Pages to Update

1. ✅ **5-12 Month Course** - Complete (reference implementation)
2. ⏳ **3-4 Month Course** - `3-4-month-course-landing-page.html`
3. ⏳ **Newborn Guide** - `newborn-guide-landing-page.html`
4. ⏳ **Snooze Method** - `snooze-method-landing-page.html`
5. ⏳ **Toddler Toolkit** - `toddler-toolkit-landing-page.html`

## CSS File Location

All pricing styles are in:
`projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`

**Section:** "14. PRICING" (around line 9751)

## Key Principles

1. **Hardcoded Values Over CSS Variables:** Product pages don't have access to `#home-page` CSS variables, so all pricing styles use hardcoded hex values.

2. **Multi-ID Scoping:** Every pricing selector must include all product page IDs to ensure styles work across all pages.

3. **Consistent Structure:** All product pages use identical HTML structure with only course name and price changing.

4. **Standardized Copy:** Feature lists are standardized across all product pages for consistency.

5. **Featured Card:** Snooze Access card always uses `featured` class to display "MOST POPULAR" badge.

## Troubleshooting

**Styles not applying?**
- Check that CSS selectors include the product page wrapper ID
- Verify hardcoded hex values are used (not CSS variables)
- Ensure utility classes (`.snooze-section`, `.snooze-container`, `.bg-white`) are scoped to product page IDs

**"MOST POPULAR" badge not showing?**
- Verify `featured` class is on the Snooze Access card
- Check that `::before` pseudo-element styles include product page ID

**Buttons not styled?**
- Confirm button selectors include all product page IDs
- Verify hardcoded color values are used

---

**Last Updated:** January 21, 2026  
**Reference:** 5-12 Month Course landing page (locked implementation)
