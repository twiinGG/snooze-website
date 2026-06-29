# Snooze BAU Membership Checkout Page

**Location:** `kajabi-deployment/pages/bau-membership-checkout/`  
**Purpose:** Standard membership checkout/landing page for Snooze BAU (Business As Usual) membership offer

---

## Files in This Directory

- **`bau-membership-checkout-blocks.html`** - Checkout body HTML, pasted into the offer's Custom Code Block (HTML only, no `<style>`/`<script>` tags)
- **`bau-membership-checkout.css`** - Self-contained stylesheet for this checkout, pasted into the offer's checkout Custom CSS field
- **`bau-membership-checkout.js`** - Checkout JS (currency toggle, scroll-to-checkout), pasted into the offer's checkout Custom JS field
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

This is an **offer checkout page**, not a website or landing page. Custom code lives **per-offer** on the offer's checkout, not site-wide. Each checkout carries its own self-contained HTML, CSS, and JS. See Claude Code memory `kajabi-checkout-custom-code-per-offer` for the full model.

### 1. Open the offer's checkout settings

1. Go to Kajabi → Sales → Offers → [Snooze Access / `z63s9VaR`]
2. Open the **Checkout** editor for the offer (this is where the offer's per-offer custom code fields live)

### 2. Paste the per-offer custom code

1. Paste `bau-membership-checkout-blocks.html` into the checkout's **Custom Code Block** (HTML only, no `<style>` or `<script>` tags)
2. Paste `bau-membership-checkout.css` into the checkout's **Custom CSS** field (self-contained; do not assume site-wide styles are present)
3. Paste `bau-membership-checkout.js` into the checkout's **Custom JS** field
4. Add the Google Fonts link to the site's Header Tracking Code (see Deployment Notes below)

Because custom code is stored per-offer, copying this checkout to another offer means re-pasting all three files into that offer; there is no shared/site-wide checkout stylesheet to inherit from.

### 3. Offer reference

- **Offer ID:** `z63s9VaR`
- **Offer Title (Public):** Snooze Access
- **Internal Title:** `MBMS03_Snooze-Access-BAU`
- **Offer Code:** MBMS03
- **Checkout URL:** `https://www.joinsnooze.com/offers/z63s9VaR`

**Pricing (set in the offer's Pricing tab, must match the HTML):**
- Quarterly: $197 USD per 3 months
- Annual: $657 USD per year

Ensure the offer grants access to the Snooze membership products.

---

## Content Updates

The page content reflects standard Snooze membership benefits:
- All sleep courses and step-by-step guides
- Live sessions with the Snooze Specialists
- Daily support inside the Snooze community
- Tools for regressions, naps, nights, routines, and travel
- Age-based pathways
- Cancel anytime option

Update the content in `bau-membership-checkout-blocks.html` as needed for membership benefits or pricing changes, then re-paste it into the offer's Custom Code Block.

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- No JavaScript required for core functionality (enhanced experience with JS)

---

## Customization

### Colors
The page uses CSS variables defined in the `:root` section of `bau-membership-checkout.css`. To change colors, update:
- `--color-primary`: Coral (#F43357)
- `--color-navy`: #1F293B
- `--color-cream`: #FAF7F4
- `--color-beige`: #F2EDEA

Re-paste the CSS into the offer's checkout Custom CSS field after editing.

### Pricing
Update pricing in `bau-membership-checkout-blocks.html` where `$197` and `$657` appear, re-paste it into the offer's Custom Code Block, and ensure the offer's Pricing tab matches.

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
