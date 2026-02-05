# Camp Snooze Checkout Page

**Location:** `kajabi-deployment/pages/camp-snooze/`  
**Purpose:** Checkout/landing page for Camp Snooze virtual baby sleep summer camp

---

## Files in This Directory

- **`camp-snooze-landing-page-blocks.html`** - Landing page HTML blocks (standalone Kajabi landing page)
- **`camp-snooze-landing-page.css`** - Landing page CSS (paste into Kajabi Custom CSS field)
- **`camp-snooze-landing-page.js`** - Landing page JavaScript (paste into Kajabi Custom JavaScript field)
- **`camp-snooze-checkout-page.html`** - Standalone Camp Snooze checkout ($690 USD, members use discount code)
- **`camp-snooze-bundle-checkout-blocks.html`** - Bundle checkout HTML blocks (for Kajabi Custom Code Block)
- **`camp-snooze-bundle-checkout.css`** - Bundle checkout CSS (scoped, paste into Kajabi Custom CSS field)
- **`camp-snooze-bundle-checkout.js`** - Bundle checkout JavaScript (paste into Kajabi Custom JavaScript field)
- **`camp-snooze-thank-you-page.html`** - Post-purchase thank you page
- **`camp-snooze-post-purchase-email.html`** - Automated post-purchase email template
- **`OFFER-DETAILS.md`** - Complete offer details including internal code (PUBCM01)
- **`README.md`** - This file (overview and deployment instructions)

---

## Overview

Camp Snooze is a virtual baby sleep summer camp offering:
- Two-week intensive sleep training program
- Daily group coaching calls (10-11am AEDT / 8-9pm ET)
- Private forum support
- Custom sleep schedules and step-by-step video modules
- Led by Sally Woods and Bec Maher

**Pricing:**
- Standard Price: $690 USD
- Snooze Member Price: $390 USD (via discount code `SNOOZEJAN26`)
- **Member Checkout URL:** `https://www.joinsnooze.com/offers/muRW6ug5?coupon_code=SNOOZEJAN26`
- **Bundle Checkout URL:** `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`

**Intake Form:**
- **URL:** `https://forms.gle/JxzVuV4LBdjRvkZf6`
- Included in post-purchase email and thank you page

**Key Dates:**
- Camp starts: Monday, January 12 (AEDT) / Sunday, January 11 (ET)
- Packing list sent: Friday, January 9 (AEDT) / Thursday, January 8 (ET)
- Daily calls: 10-11am AEDT / 8-9pm ET
- Limited to 7 families per intake

---

## Deployment Instructions

### NEW: Standalone Landing Page Setup (Recommended)

**This is the new approach:** A beautiful standalone landing page with separate CSS and JavaScript files.

#### Step 1: Add CSS to Kajabi

1. Go to Kajabi: **Settings → Website → Theme → Custom CSS**
2. Open `camp-snooze-landing-page.css`
3. Copy **all contents** and paste into the Custom CSS field
4. Save

#### Step 2: Add JavaScript to Kajabi

1. Go to Kajabi: **Settings → Website → Custom JavaScript**
2. Open `camp-snooze-landing-page.js`
3. Copy **all contents** and paste into the Custom JavaScript field
4. Save

#### Step 2.5: Add External Resources (Font Awesome & Google Fonts)

1. Go to Kajabi: **Settings → Website → Header Tracking Code**
2. Add these lines:
   ```html
   <!-- Font Awesome for icons -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" /> <!-- pragma: allowlist secret -->

   <!-- Google Fonts -->
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&family=Satisfy&display=swap" rel="stylesheet">
   ```
3. Save

**Note:** Font Awesome is required for icons (calendar, envelope, video, clock, users) to display correctly.

#### Step 3: Create Landing Page

1. Create a new **Landing Page** in Kajabi (or Website Page)
2. Set URL slug: `camp-snooze` (or your preferred URL)
3. **Set SEO Settings:**
   - **SEO Title:** "Camp Snooze | 2-Week Virtual Baby Sleep Training with Sally & Bec"
   - **SEO Description:** "Join Camp Snooze for two weeks of intensive sleep training with daily coaching, personalized plans, and expert support. Limited to 7 families per intake. From $587 USD with bundle options."
4. **Add HTML Sections:**
   - Open `camp-snooze-landing-page-blocks.html`
   - Copy each section (marked with `<!-- SECTION X -->`) into separate Code Blocks
   - Add sections in order:
     - SECTION 1: HERO
     - SECTION 2: WHAT YOU'LL GET
     - SECTION 3: WHO IT'S FOR
     - SECTION 4: HOW IT WORKS
     - SECTION 5: MEET YOUR COUNSELLORS
     - SECTION 6: KEY DATES
     - SECTION 7: PRICING
     - SECTION 8: FAQs
     - SECTION 9: FINAL CTA
5. Save and publish

**Note:** The landing page is standalone and doesn't require site navigation/footer. All styling and functionality is handled by the CSS and JS files.

**Checkout URLs:**
- **Standalone Camp Snooze:** `https://www.joinsnooze.com/offers/muRW6ug5/checkout`
- **Bundle (Camp + Snooze Access):** `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`
- **Bundle Offer ID:** `K3Y6FEKX`

**Bundle Pricing:**
- **Camp + Quarterly:** $587 USD (Save $250 vs. buying separately)
- **Camp + Annual:** $1,047 USD (Save $133 vs. buying separately, includes 2 months free)

---

## Bundle Checkout Deployment Instructions

### Step 1: Add CSS to Kajabi

1. Go to Kajabi: **Settings → Website → Theme → Custom CSS** (or page-specific Custom CSS)
2. Open `camp-snooze-bundle-checkout.css`
3. Copy **all contents** and paste into the Custom CSS field
4. **Important:** This CSS is scoped to `#snooze-custom-checkout` to prevent conflicts with Kajabi's native checkout styling

### Step 2: Add JavaScript to Kajabi (Optional)

1. Go to Kajabi: **Settings → Website → Custom JavaScript** (or page-specific Custom JavaScript)
2. Open `camp-snooze-bundle-checkout.js`
3. Copy **all contents** and paste into the Custom JavaScript field
4. Currently minimal/no JavaScript is required

### Step 3: Add Google Fonts

1. Go to Kajabi: **Settings → Website → Header Tracking Code**
2. Add this line:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&family=Satisfy&display=swap" rel="stylesheet">
   ```

### Step 4: Create Checkout Page

1. Create a new **Website Page** or **Landing Page** in Kajabi
2. Set URL slug: `camp-snooze-bundle` (or your preferred URL)
3. **Add HTML:**
   - Open `camp-snooze-bundle-checkout-blocks.html`
   - Copy the entire content (the `<div id="snooze-custom-checkout">` block)
   - Paste into a **Custom Code Block** in Kajabi
   - **Do NOT include** `<style>`, `<script>`, `<head>`, or `<body>` tags - only the inner HTML content
4. Save and publish

### Step 5: Checkout URLs

All CTAs on the landing page now point to the bundle checkout:
- **Bundle Checkout URL:** `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`
- **Bundle Offer ID:** `K3Y6FEKX`

### ⚠️ CSS Scope Protection

**Critical:** All CSS is scoped to `#snooze-custom-checkout` to prevent conflicts with Kajabi's native checkout components. This ensures:
- No interference with Kajabi's order summary sidebar
- No conflicts with Kajabi's payment form styling
- No global resets affecting other page elements

The HTML wrapper uses `id="snooze-custom-checkout"` which acts as a namespace for all styles.

---

### Original: Standalone Checkout Page (Alternative)

### 1. Checkout URL

The checkout URL is already configured in `camp-snooze-checkout-page.html`:
- **Checkout URL:** `https://www.joinsnooze.com/offers/muRW6ug5/checkout`
- **Offer ID:** `muRW6ug5`

### 2. Deploy to Kajabi

**Option A: As a Website Page**
1. Create a new Website Page in Kajabi
2. Copy the entire HTML from `camp-snooze-checkout-page.html`
3. Paste into a Code Block
4. Publish the page

**Option B: As a Landing Page**
1. Create a new Landing Page in Kajabi
2. Copy sections as needed into Code Blocks
3. Adjust styling if needed for Landing Page format

### 3. Kajabi Offer

Offer is already created in Kajabi:
- **Offer Name:** Camp Snooze Jan '26
- **Offer ID:** `muRW6ug5`
- **Checkout URL:** `https://www.joinsnooze.com/offers/muRW6ug5/checkout`
- **Price:** $690 USD

**Offer Setup:**
- Set price: $690 USD
- Discount code: `SNOOZEJAN26` ($300 off = $390 USD for members)
- Share discount code inside Snooze Village/community
- Include access to Camp Snooze program, private forum, video modules, and group coaching calls

**See `OFFER-DETAILS.md` for complete setup checklist and internal code (PUBCM01).**

### 4. Setup Thank You Page

1. Go to Kajabi → Sales → Offers → [Camp Snooze Jan '26] → Settings
2. Scroll to "Thank You Page" section
3. Select "Custom Thank You Page"
4. Create new page and paste content from `camp-snooze-thank-you-page.html`

### 5. Setup Post-Purchase Email

1. Go to Kajabi → Sales → Offers → [Camp Snooze Jan '26] → Settings
2. Scroll to "Post-Purchase Email" section
3. Create new email automation
4. Set trigger: "Purchase of this offer"
5. Set subject: "Welcome to Camp Snooze! Here's what happens next"
6. Paste content from `camp-snooze-post-purchase-email.html`

---

## Design Features

- **Camp-themed design** with forest green color palette
- **Responsive layout** that works on all devices
- **Pricing toggle** to switch between member/non-member pricing
- **Sticky checkout card** on desktop for easy access
- **All flyer content** integrated into the page

### ⚠️ Product-Specific Styling

**Important:** The Camp Snooze checkout page uses a **forest green color scheme and camp-themed design that is specific to this product only**. This styling should NOT be reused for other Snooze products or membership offers.

**For other checkout pages:**
- **Standard membership checkouts** (BAU): Use styling based on the Day Pass checkout page (coral/navy theme)
- **Other product checkouts**: Use standard Snooze brand colors (coral primary, navy, cream/beige backgrounds)

The camp theme (forest green, camp badges, campfire icons, etc.) is intentionally unique to Camp Snooze to reinforce the "virtual summer camp" product positioning.

---

## Customization

### Colors
The page uses CSS variables defined in the `:root` section. To change colors, update:
- `--camp-green`: Main brand color
- `--camp-green-light`: Lighter shade for gradients
- `--camp-green-tint`: Background tint color

### Content
All content from the Camp Snooze flyer is included. Update text directly in the HTML as needed.

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Requires JavaScript for pricing toggle functionality

---

---

## Landing Page Features

- **Beautiful immersive design** with nostalgic summer camp aesthetic
- **Camp green theme** with forest green, sage, cream, and gold color palette
- **Falling leaves animation** in hero section
- **Polaroid photo effects** for counsellor photos
- **Sticky CTA button** that appears on scroll (mobile-friendly)
- **Scroll-triggered animations** for smooth fade-in effects
- **All copy sections** from the provided landing page copy
- **Responsive design** that works on all devices
- **Standalone deployment** - no site navigation/footer required

---

---

## NEW: Camp Snooze V2 - Luxury Member-First Pricing

**Location:** `camp-snooze-v2-luxury/`

A complete redesign implementing a Luxury Escapes-inspired member-first pricing model with strategic upsell modals.

### V2 Features
- **Single prominent price** ($390 member price) with member-first positioning
- **Strategic modal-based upsell flow** for membership conversion
- **Unified checkout pages** with consistent styling
- **Countdown timer** for urgency (Jan 10, 2026 deadline)
- **Member-only checkout page** for existing Snooze members

### V2 Files
- `camp-snooze-landing-page-blocks.html` - Main landing page (724 lines)
- `camp-snooze-v2-luxury.css` - Landing page styles (825 lines)
- `camp-snooze-v2-luxury.js` - Landing page interactions (258 lines)
- `camp-snooze-bundle-checkout-blocks.html` - Member bundle checkout ($587)
- `camp-snooze-checkout-blocks.html` - Standalone checkout ($690)
- `camp-snooze-member-checkout-blocks.html` - **NEW** Member-only checkout ($390)
- `camp-snooze-v2-checkout.css` - Unified checkout styles
- `camp-snooze-v2-checkout.js` - Checkout interactions
- `IMPLEMENTATION-SUMMARY.md` - Complete implementation documentation
- `CHANGELOG.md` - Version history and updates

**See `camp-snooze-v2-luxury/IMPLEMENTATION-SUMMARY.md` for complete deployment instructions.**

### Recent Updates (January 7, 2026)
- ✅ Fixed Font Awesome icon loading issues
- ✅ Updated membership pricing from $147 to $197/quarter (BAU pricing)
- ✅ Updated bundle total from $537 to $587
- ✅ Created member-only checkout page for existing Snooze members
- ✅ Added Snooze Village link on landing page

---

**Last Updated:** January 7, 2026  
**Status:** ✅ Complete & Deployed  
**Supabase Sync:** 
- ✅ Standalone offer registered in checkout_offer_map (PUBCM01, Offer ID: `muRW6ug5`)
- ⚠️ Bundle offer SQL provided in `OFFER-DETAILS.md` - Execute in Supabase:
  - **Internal Code:** PUBCM02 (PUB-CAMP-SNOOZE-BUNDLE)
  - **Offer ID:** `K3Y6FEKX`
  - **Checkout URL:** `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`
  - **Pricing:** From $587 USD (Quarterly) or $1,047 USD (Annual)
