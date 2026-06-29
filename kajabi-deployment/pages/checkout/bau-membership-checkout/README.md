# Snooze BAU Membership Checkout Page

**Location:** `kajabi-deployment/pages/bau-membership-checkout/`  
**Purpose:** Standard membership checkout/landing page for Snooze BAU (Business As Usual) membership offer

---

## Files in This Directory

- **`checkout-page.html`** - Complete checkout page with quarterly ($197) and annual ($657) pricing options
- **`README.md`** - This file (overview and deployment instructions)

---

## Overview

This is the standard membership checkout page for Snooze, used after the founding member offer period (post-January 1, 2026). It presents the standard BAU pricing for quarterly and annual membership options.

**Pricing:**
- Quarterly: $197 USD per 3 months
- Annual: $657 USD per year

**Offer ID:** `z63s9VaR`  
**Checkout URL:** `https://www.joinsnooze.com/offers/z63s9VaR`

---

## Design & Styling

**Important:** This checkout page uses styling based on the **Day Pass checkout page**, NOT the Camp Snooze checkout page.

**Color Scheme:**
- Primary: Coral (#F43357)
- Navy: #1F293B
- Cream/Beige backgrounds
- Standard Snooze brand colors

**Why not Camp Snooze styling?**
- Camp Snooze uses a forest green theme that is **specific to that product** (virtual summer camp theme)
- The Day Pass styling is more appropriate for standard membership products
- See Camp Snooze README for details on its product-specific styling

---

## Deployment Instructions

### 1. Deploy to Kajabi

**Option A: As a Website Page**
1. Create a new Website Page in Kajabi
2. Copy the entire HTML from `checkout-page.html`
3. Paste into a Code Block
4. Publish the page

**Option B: As a Landing Page**
1. Create a new Landing Page in Kajabi
2. Copy sections as needed into Code Blocks
3. Adjust styling if needed for Landing Page format

### 2. Link to Kajabi Offer

The checkout page is configured for:
- **Offer ID:** `z63s9VaR`
- **Offer Title (Public):** Snooze Access
- **Internal Title:** `MBMS03_Snooze-Access-BAU`
- **Offer Code:** MBMS03
- **Checkout URL:** `https://www.joinsnooze.com/offers/z63s9VaR`

**Offer Setup in Kajabi:**
1. Go to Kajabi → Sales → Offers → [Snooze BAU Membership]
2. Configure pricing:
   - Quarterly: $197 USD per 3 months
   - Annual: $657 USD per year
3. Set the checkout page to use this custom HTML
4. Ensure the offer grants access to Snooze membership products

---

## Content Updates

The page content reflects standard Snooze membership benefits:
- All sleep courses and step-by-step guides
- Live sessions with Sally and Bec
- Daily support inside the Snooze community
- Tools for regressions, naps, nights, routines, and travel
- Age-based pathways
- Cancel anytime option

Update the content in `checkout-page.html` as needed for membership benefits or pricing changes.

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- No JavaScript required for core functionality (enhanced experience with JS)

---

## Customization

### Colors
The page uses CSS variables defined in the `:root` section. To change colors, update:
- `--color-primary`: Coral (#F43357)
- `--color-navy`: #1F293B
- `--color-cream`: #FAF7F4
- `--color-beige`: #F2EDEA

### Pricing
Update pricing in the HTML where `$197` and `$657` appear, and ensure Kajabi offer pricing matches.

---

**Last Updated:** January 1, 2026  
**Status:** ✅ Complete & Ready for Deployment  
**Offer Title (Public):** Snooze Access  
**Internal Title:** `MBMS03_Snooze-Access-BAU`  
**Offer Code:** MBMS03

---

## Deployment Notes (relocated from HTML comments)

These instructions previously lived as comments inside `bau-membership-checkout-blocks.html`. Comments were stripped from the deployable HTML; the genuine deployment instructions are preserved here.

**Custom code block deployment:**
1. Paste `bau-membership-checkout-blocks.html` into Kajabi's Custom Code Block (HTML only, no `<style>` or `<script>` tags).
2. Paste `bau-membership-checkout.css` into Kajabi's Custom CSS field.
3. Paste `bau-membership-checkout.js` into Kajabi's Custom JavaScript field.
4. Add the Google Fonts link to Kajabi's Header Tracking Code:
   `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">`

**Currency toggle widget:**
- The currency toggle reads `localStorage['snooze_currency_preference']` via `currency-toggle.js`.
- PRD reference: `docs/projects/paid-media-and-dual-currency-v1/00-prd.md` §4.8
