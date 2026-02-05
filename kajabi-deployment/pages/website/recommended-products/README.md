# Recommended Products Page - Deployment Guide

**Version:** 1.0  
**Date:** January 2025  
**Status:** Ready for Deployment

---

## Overview

The Recommended Products page has been redesigned to match the current Snooze design system, particularly the perks section of the Snooze Library page. This page showcases recommended baby sleep products with discount codes and maintains SEO value with proper headings and content structure.

---

## File Structure

The Recommended Products page consists of one complete HTML file:

1. **recommended-products-complete.html** - Complete page with navigation, hero, products grid, and footer placeholders

---

## Deployment Instructions

### Step 1: Create Recommended Products Page in Kajabi

1. Go to Kajabi → Website → Pages
2. Create a new Website Page (not Landing Page)
3. Set URL to: `/recommended-products`
4. Set page title: "Recommended Products | The Sleep Concierge"
5. Set meta description: "Discover trusted baby sleep products recommended by The Sleep Concierge. Get exclusive discounts on comforters, monitors, white noise machines, and more."

### Step 2: Verify Global CSS

Ensure the global CSS file is deployed:
- **File:** `global/css/snooze-unified-theme.css`
- **Location:** Kajabi Settings → Website → Theme → Custom CSS
- **Note:** The CSS includes all styling for the perks/product cards, including the new enhancements for discount badges

### Step 3: Add Page Content

1. Open `recommended-products-complete.html`
2. Copy entire contents
3. Add as single Code Block in Kajabi
4. **Action Required:** Replace placeholder product images with actual product images

### Step 4: Update Product Images

The page currently uses placeholder images. Replace these with actual product images:

1. **Kippins Comforters** - Replace placeholder with actual Kippins product image
2. **Cubo Ai Plus** - Replace placeholder with actual Cubo Ai product image
3. **Glow Dreaming** - ✅ Already using correct image from Kajabi CDN
4. **Snoo Smart Bassinet** - Replace placeholder with actual Snoo product image
5. **ECO by Naty Nappies** - Replace placeholder with actual Naty product image
6. **Ergobaby Carrier** - Replace placeholder with actual Ergobaby product image
7. **Growbright Airnest Junior Pillow** - Replace placeholder with actual Growbright product image

**Image Requirements:**
- Recommended size: 600x400px (16:9 aspect ratio)
- Format: JPG or WebP
- Optimized for web (compressed)
- Upload to Kajabi CDN and use the provided URL

### Step 5: Verify Product Links

All product links are included and should work correctly:
- ✅ Kippins: `https://kippins.co` (with SC10 code)
- ✅ Cubo Ai: `https://cuboai.com` (with referral link)
- ✅ Glow Dreaming: `https://glowdreaming.com` (with SLEEPCONCIERGE code)
- ✅ Snoo: `https://www.happiestbaby.com/products/snoo-smart-bassinet`
- ✅ ECO by Naty: `https://naty.com` (with WELCOME10 code)
- ✅ Ergobaby: `https://www.ergobaby.com.au`
- ✅ Growbright: `https://growbright.com.au` (with THESLEEPCONCIERGE code)

### Step 6: Add Footer (Optional)

If you're using a global footer component:
1. Remove the footer placeholder comment from the HTML
2. Add the footer Code Block separately in Kajabi
3. Or use the footer from `pages/footer.html`

---

## Design Features

### Matches Perks Section Design

The page uses the same design system as the Snooze Library perks section:
- ✅ Same card styling (`.perk-card`)
- ✅ Same grid layout (`.perks-grid`)
- ✅ Same hover effects and transitions
- ✅ Same typography and spacing
- ✅ Same responsive breakpoints

### Discount Code Badges

Each product with a discount code features:
- Coral-tinted background badge
- Clear discount code display
- Icon indicators (tag, gift, etc.)
- Prominent placement in card

### SEO Optimization

The page maintains SEO value with:
- ✅ Proper H1 heading structure
- ✅ Descriptive product descriptions
- ✅ Alt text for all images
- ✅ Semantic HTML structure
- ✅ Internal linking opportunities

---

## Content Preserved

All content from the original page has been preserved:
- ✅ Kippins Comforters (10% off with SC10)
- ✅ Cubo Ai Plus ($20 off referral link)
- ✅ Glow Dreaming White Noise Machine (10% off with SLEEPCONCIERGE)
- ✅ Snoo Smart Bassinet
- ✅ ECO by Naty Nappies (10% off with WELCOME10)
- ✅ Ergobaby Carrier
- ✅ Growbright Airnest Junior Pillow (15% off with THESLEEPCONCIERGE)

---

## Responsive Behavior

- **Desktop (> 1024px):** 3-column grid
- **Tablet (768px - 1024px):** 2-3 columns depending on content
- **Mobile (< 768px):** Single column, cards stack vertically

---

## Testing Checklist

- [ ] Page loads correctly
- [ ] Navigation works
- [ ] All product images display (replace placeholders)
- [ ] All product links work
- [ ] Discount codes are clearly visible
- [ ] Mobile responsive (test on phone)
- [ ] Hover effects work on cards
- [ ] SEO meta tags are set
- [ ] Footer displays (if using global footer)

---

## Notes

- The page uses the same CSS classes as the perks section, so it automatically inherits all styling
- Product images should be replaced with actual product photos for best results
- All discount codes and links are preserved from the original page
- The design matches the current Snooze brand aesthetic

---

**Ready for Deployment!**

