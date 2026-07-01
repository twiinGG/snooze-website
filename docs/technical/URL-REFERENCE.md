# Snooze Website - Complete URL Reference

**Purpose:** Central reference for all URLs used in the Snooze website project.

**Last Updated:** June 9, 2026 (Wave 4 audit reconciliation - see `site-audit-2026-06/analysis/url-reference-reconciliation.md`)  
**Status:** Active Reference - Enhanced with Link Status Indicators

> ## 🔎 Audit addendum — June 9, 2026 (observed live, canonical `www.joinsnooze.com`)
>
> A full real-browser sweep (`apps/snooze-website/site-audit-2026-06/`) checked every URL.
> Status flags below reflect intent; these are the **observed** deltas to action:
>
> - **`/get-great-baby-sleep` → 404 live** (this doc lists it ✅ Active). It is built in repo
>   (`landing/cold-traffic-landing-page/`) but not deployed. Deploy it or correct this flag.
> - **`/sleep-glossary` → 404** (built in repo, not in Kajabi — confirmed). The live glossary is
>   **`/baby-sleep-glossary`** (200), which carries `DefinedTermSet`+`BreadcrumbList` but **no `FAQPage`**.
> - **`/snooze-method` → 404** (landing not launched — confirmed).
> - **`/about` → 302 → `/`** (the documented redirect is live as a 302).
> - **`/privacy` and `/snooze-village` → 404** (redirects still not in place).
> - **`/snooze` → 404** (listed ✅ Working in Core Pages; now 404 — verify/redirect).
> - **Camp Snooze Jan'26 `/offers/muRW6ug5` → redirects to `/login`** (was public; camp is past).
> - **Member offer checkouts** (e.g. `/offers/6iRarwak`, `muRW6ug5`) redirect anonymous users to `/login`;
>   public course/guide checkouts (`W2PyqL2X`, `9DFJSwVD`, `FktmJAvJ`, `omMcVgAi`) render.
> - **AEO gap:** no blog post has `Article` schema; 61 pages have no JSON-LD; no `llms.txt`.
>
> Full per-page status, metadata, drift and CWV: `site-audit-2026-06/AUDIT-REPORT.md` and the linked Google Sheet.

**⚠️ CRITICAL:** Always use actual URLs from this document. Never use placeholder URLs during development.

**Status Legend:**
- ✅ **Working** - Link is live and functional
- ❌ **Broken** - Returns 404/403/400 error (needs fix)
- ⚠️ **Missing** - Page doesn't exist, needs to be created
- 🔄 **Needs Redirect** - Old URL needs redirect to new location
- 📝 **Placeholder** - Contains placeholder text, needs real ID/URL
- ❓ **Unknown** - Status not verified, needs checking

---

## Current Domain

**Base Domain:** `https://joinsnooze.com`  
**Future Domain:** `https://joinsnooze.com` (after migration)

---

## 🏠 Core Pages

### Homepage & Main Navigation
- **URL:** `https://joinsnooze.com/`
- **Path:** `/`
- **Status:** ✅ Working
- **Type:** Homepage

- **URL:** `https://joinsnooze.com/snooze`
- **Path:** `/snooze`
- **Status:** ❌ 404 live - **DRAFT** (Kajabi landing page id `2151633113`, "Snooze Main Landing", never published). The June 2026 audit confirmed 404; this entry previously read ✅ Working. Either publish the draft or stop treating `/snooze` as a live URL.
- **Type:** Landing Page (draft)

- **URL:** `https://joinsnooze.com/snooze-library`
- **Path:** `/snooze-library`
- **Status:** ✅ Working
- **Type:** Public Library URL
- **Description:** Public-facing library page URL (available via website)

- **URL:** `https://www.joinsnooze.com/baby-sleep-glossary`
- **Path:** `/baby-sleep-glossary`
- **Status:** ✅ Working (live slug is `/baby-sleep-glossary`; the old `/sleep-glossary` slug is a 404 and must not be used as a target)
- **Type:** Website Page (SEO/AEO glossary)
- **Description:** Sleep & Parenting Glossary. Wrapper `#glossary-page`. Source `apps/snooze-website/glossary/terms.json`, generated to `kajabi-deployment/pages/website/glossary/sleep-glossary.html`, deployed to the live `/baby-sleep-glossary` slug. Carries DefinedTermSet + FAQPage JSON-LD. Confirmed orphan in the Jun 2026 audit: zero inbound links from other pages (see site-audit-2026-06/data/analysis/link_graph_summary.csv); Wave 2 adds inbound links.

### Account & Access
- **URL:** `https://joinsnooze.com/login`
- **Path:** `/login`
- **Status:** ✅ Working
- **Type:** Login Page

- **URL:** `https://joinsnooze.com/account`
- **Path:** `/account`
- **Status:** ❓ Unknown (may return 429 - rate limiting, verify manually)
- **Type:** Account Page

- **URL:** `https://joinsnooze.com/password/new`
- **Path:** `/password/new`
- **Status:** ✅ Working
- **Type:** Password Reset
- **Note:** Users should access via `/login` → click "Forgot Password" → redirects to `/password/new`
- **Flow:** `/login` → "Forgot Password" link → `/password/new`

### About & Contact
- **URL:** `https://joinsnooze.com/about-sally`
- **Path:** `/about-sally`
- **Status:** ✅ Working
- **Type:** About Page

- **URL:** `https://joinsnooze.com/about`
- **Path:** `/about`
- **Status:** ❌ Broken (404) - **NEEDS REDIRECT** → `/about-sally`
- **Type:** Legacy About URL

- **URL:** `https://joinsnooze.com/contact`
- **Path:** `/contact`
- **Status:** ✅ Working
- **Type:** Contact Page

- **URL:** `https://joinsnooze.com/one-on-one-sleep-consultations`
- **Path:** `/one-on-one-sleep-consultations`
- **Status:** ✅ Working
- **Type:** Consultations Page

### Blog
- **URL:** `https://joinsnooze.com/blog`
- **Path:** `/blog`
- **Status:** ✅ Working
- **Type:** Blog Index

- **URL:** `https://joinsnooze.com/blog/*`
- **Path:** `/blog/*`
- **Status:** ✅ Working
- **Type:** Individual Blog Posts (36 posts)
- **Note:** Wildcard redirect should preserve URL structure

### Recommended Products
- **URL:** `https://joinsnooze.com/recommended-products`
- **Path:** `/recommended-products`
- **Status:** ✅ Working
- **Type:** Recommended Products Page

---

## 📚 Courses

**URL Structure:**
- **Landing Pages** (public-facing): Clean URLs like `/3-4-month-baby-sleep-course` - These are the marketing pages that link to offer checkouts
- **Product Access URLs** (member access): `/products/*` - These are the actual course pages in Kajabi where members access purchased content

### The Snooze Method (Foundational Course)
- **Landing Page:** `https://joinsnooze.com/snooze-method` (not yet launched - references removed from code)
- **Product Access URL:** `https://joinsnooze.com/products/the-snooze-method`
- **Status:** ❓ Unknown (listed as Draft - verify if live)
- **Type:** Course
- **Description:** Foundational course (Tier 1 in learning path)

### Toddler Toolkit
- **Landing Page:** `https://joinsnooze.com/toddler-toolkit`
- **Product Access URL:** `https://joinsnooze.com/products/toddler-toolkit`
- **Status:** ✅ Working
- **Type:** Course
- **Description:** Age-based module for 12+ months

### 5-12 Month Course
- **Landing Page:** `https://joinsnooze.com/5-12-month-baby-sleep-course`
- **Product Access URL:** `https://joinsnooze.com/products/5-12-month-sleep-training-course`
- **Status:** ✅ Working
- **Type:** Course
- **Description:** Age-based module for 5-12 months

- **Future Product URL:** `https://joinsnooze.com/products/the-snooze-method-5-12-month-sleep`
- **Status:** Draft (will replace 5-12 month guide eventually)

### Settling Techniques Mini Course Module
- **Product Access URL:** `https://joinsnooze.com/products/settling-techniques-module-from-snooze-by-the-sleep-concierge`
- **Status:** ✅ Working
- **Type:** Course Module
- **Description:** Part of 3-4 month course, used as lead magnet

### 3-4 Month Course
- **Landing Page:** `https://joinsnooze.com/3-4-month-baby-sleep-course`
- **Product Access URL:** `https://joinsnooze.com/products/3-4-month-baby-sleep-course-by-the-sleep-concierge`
- **Status:** ✅ Working
- **Type:** Course
- **Description:** Age-based module for 3-4 months

---

## 📥 Downloadable Guides

### 5-12 Month Guide
- **URL:** `https://joinsnooze.com/downloads/baby-sleep-guide-5-to-12-months`
- **Path:** `/downloads/baby-sleep-guide-5-to-12-months`
- **Status:** ✅ Working
- **Type:** Downloadable Guide
- **Note:** Will eventually be replaced by 5-12 Month Course

### Newborn Sleep Guide
- **Product Access URL:** `https://joinsnooze.com/products/newborn-sleep-guide`
- **Path:** `/products/newborn-sleep-guide`
- **Status:** ✅ Working
- **Type:** Course Product (Member Access)
- **Description:** New course product version with limited access and community linking capabilities
- **Note:** **CURRENT VERSION** - Use this for all internal library/product links

- **Landing Page URL:** `https://joinsnooze.com/newborn-sleep-guide`
- **Path:** `/newborn-sleep-guide`
- **Status:** ✅ Working
- **Type:** Landing Page (Public)
- **Description:** Public-facing landing page - do not change this URL

- **Legacy Downloadable Guide (Superseded):** `https://joinsnooze.com/downloads/newborn-sleep-guide-by-the-sleep-concierge`
- **Path:** `/downloads/newborn-sleep-guide-by-the-sleep-concierge`
- **Status:** ⚠️ **SUPERSEDED** - Replaced by `/products/newborn-sleep-guide`
- **Type:** Legacy Downloadable Guide
- **Note:** Old downloadable guide has been replaced by the new course product version. The new version allows for limited access and linking to community features.

### Catnapping Guide
- **URL:** `https://joinsnooze.com/downloads/catnapping-guide`
- **Path:** `/downloads/catnapping-guide`
- **Status:** ✅ Working
- **Type:** Resource (previously used as free lead magnet)

### 3 to 2 Nap Transition Guide
- **URL:** `https://joinsnooze.com/downloads/the-roadmap-to-a-smooth-3-to-2-nap-transition-6-9-month-old-babies`
- **Path:** `/downloads/the-roadmap-to-a-smooth-3-to-2-nap-transition-6-9-month-old-babies`
- **Status:** ✅ Working
- **Type:** Resource (previously used as paid mini guide)

### Kajabi Product Access URLs (Internal - Member Access)
- **URL Pattern:** `https://joinsnooze.com/products/*`
- **Path:** `/products/*`
- **Status:** ✅ Working (for logged-in members with access)
- **Type:** Internal Product Access URL
- **Description:** These are the correct Kajabi URLs where members access purchased products/courses in their library. These are the actual course/product pages in Kajabi.
- **Note:** These URLs require login and product access. They appear as 404 for non-logged-in users or users without access.
- **Flow:** Landing pages (e.g., `/3-4-month-baby-sleep-course`) → Offer checkout → Product added to library → Access via `/products/*` URLs
- **Examples:**
  - `/products/newborn-sleep-guide` - Access URL for Newborn Sleep Guide (course product version)
  - `/products/3-4-month-baby-sleep-course-by-the-sleep-concierge` - Access URL for 3-4 Month course
  - `/products/5-12-month-sleep-training-course` - Access URL for 5-12 Month course
  - `/products/toddler-toolkit` - Access URL for Toddler Toolkit
  - `/products/settling-techniques-module-from-snooze-by-the-sleep-concierge` - Access URL for Settling Techniques module

### Downloadable Resources (Internal - Member Access)
- **URL Pattern:** `https://joinsnooze.com/downloads/*`
- **Path:** `/downloads/*`
- **Status:** ✅ Working (for logged-in members with access)
- **Type:** Downloadable Resource Access URL
- **Description:** These are the Kajabi URLs for downloadable resources (PDFs, guides, etc.). Different from `/products/*` which are for courses.
- **Examples:**
  - `/downloads/catnapping-guide` - Access URL for Catnapping Guide
  - `/downloads/the-roadmap-to-a-smooth-3-to-2-nap-transition-6-9-month-old-babies` - Access URL for 3-2 Nap Transition Guide
  - **Note:** `/downloads/newborn-sleep-guide-by-the-sleep-concierge` has been superseded by `/products/newborn-sleep-guide` (course product version)

---

## 💰 Offer Checkouts

### Membership Offers
- **URL:** `https://joinsnooze.com/offers/6iRarwak/checkout`
- **Path:** `/offers/6iRarwak/checkout`
- **Status:** ✅ Working
- **Type:** Membership Offer
- **Offer Title (Public):** Snooze Founding Member
- **Internal Title:** `MBMS01_Snooze-Founding-Member`
- **Code:** MBMS01
- **Description:** **PRIMARY** - Snooze Founding Membership
- **⚠️ PRIMARY CHECKOUT URL:** Use this for all non-member CTAs

- **URL:** `https://joinsnooze.com/offers/uxWnEfFg/checkout`
- **Path:** `/offers/uxWnEfFg/checkout`
- **Status:** ✅ Working
- **Type:** Membership Offer
- **Offer Title (Public):** Snooze Social Member Special
- **Internal Title:** `MBMS02_Snooze-Social-Member-Special`
- **Code:** MBMS02
- **Description:** Special offer for Snooze Social members

- **URL:** `https://joinsnooze.com/offers/z63s9VaR`
- **Path:** `/offers/z63s9VaR`
- **Status:** ✅ Working
- **Type:** Membership Offer
- **Offer Title (Public):** Snooze Access
- **Internal Title:** `MBMS03_Snooze-Access-BAU`
- **Code:** MBMS03
- **Description:** Post-launch BAU standard membership

- **URL:** `https://joinsnooze.com/offers/[OFFER-ID]/checkout`
- **Path:** `/offers/[OFFER-ID]/checkout`
- **Status:** 📝 **TO BE CREATED**
- **Type:** Membership Offer (Trial)
- **Offer Title (Public):** Snooze Access - 7 Day Trial
- **Internal Title:** `MBMS04_Snooze-Access-Trial-7day`
- **Code:** MBMS04
- **Description:** 7-day full access trial of Snooze membership

- **URL:** `https://joinsnooze.com/offers/[OFFER-ID]`
- **Path:** `/offers/[OFFER-ID]`
- **Status:** 📝 **TO BE CREATED**
- **Type:** Membership Offer (Free Grant)
- **Offer Title (Public):** Snooze Access - 1 Month Free
- **Internal Title:** `MBMS05_Snooze-Access-1Month-Free`
- **Code:** MBMS05
- **Description:** 1-month free access granted to purchasers of other products (no commitment, expires after 30 days)
- **Note:** This offer is typically granted automatically, not accessed via checkout URL

### Course Offers
- **URL:** `https://joinsnooze.com/offers/W2PyqL2X/checkout`
- **Path:** `/offers/W2PyqL2X/checkout`
- **Status:** ✅ Working
- **Type:** Course Offer
- **Code:** PUBCR01 (PUB-COURSE-3-4MO)
- **Price:** $117 USD
- **Description:** 3-4 Month Sleep Course

- **URL:** `https://joinsnooze.com/offers/9DFJSwVD/checkout`
- **Path:** `/offers/9DFJSwVD/checkout`
- **Status:** ✅ Working
- **Type:** Course Offer
- **Code:** PUBCR02 (PUB-COURSE-5-12MO)
- **Price:** $117 USD
- **Description:** 5-12 Month Sleep Course

- **URL:** `https://joinsnooze.com/offers/FktmJAvJ/checkout`
- **Path:** `/offers/FktmJAvJ/checkout`
- **Status:** ✅ Working
- **Type:** Course Offer
- **Code:** PUBCR03 (PUB-COURSE-TODDLER)
- **Price:** $117 USD
- **Description:** Toddler Toolkit Course

---

### UPCR04_5-12M-COURSE-UPSELL

- **URL:** `https://joinsnooze.com/offers/[UPCR04-ID]/checkout`
- **Path:** `/offers/[UPCR04-ID]/checkout`
- **Status:** 📝 **TO BE CREATED**
- **Type:** Course Upsell (Paywall)
- **Code:** UPCR04
- **Price:** $117 USD
- **Description:** 5-12 Month Sleep Course (Paywall version) - Specifically for Free Module conversion.
- **Internal Title:** `UPCR04_5-12M-COURSE-UPSELL`

---

### Guide Offers
- **URL:** `https://joinsnooze.com/offers/omMcVgAi/checkout`
- **Path:** `/offers/omMcVgAi/checkout`
- **Status:** ✅ Working
- **Type:** Guide Offer
- **Code:** PUBGD02 (PUB-GUIDE-NEWBORN)
- **Price:** $67 USD
- **Description:** Newborn Sleep Guide

### Free Module Offers (Lead Magnets)
- **URL:** `https://joinsnooze.com/offers/[OFFER-ID]/checkout`
- **Path:** `/offers/[OFFER-ID]/checkout`
- **Status:** 📝 **TO BE CREATED**
- **Type:** Free Module Offer
- **Offer Title (Public):** Free Module - Schedules
- **Internal Title:** `LMCR04_5-12M-SCHEDULES`
- **Code:** LMCR04
- **Price:** Free
- **Description:** 5-12 Month Sleep Schedules (Free Module) - Leads into 5-12 Month Course

### Consultation Offers (Active)
- **URL:** `https://joinsnooze.com/offers/4zHPSRCs`
- **Path:** `/offers/4zHPSRCs`
- **Status:** ✅ Working
- **Type:** Consultation Offer
- **Price:** $590 (current) / $650 (future)
- **Description:** 1:1 Signature Consult (Non-Member)

- **URL:** `https://joinsnooze.com/offers/5xL3NaRf/checkout`
- **Path:** `/offers/5xL3NaRf/checkout`
- **Status:** ✅ Working
- **Type:** Consultation Offer
- **Price:** $290 (current) / $570 (Jan 1, 2026)
- **Description:** Snooze Social Member Consult

- **URL:** `https://joinsnooze.com/offers/igbTdRbk/checkout`
- **Path:** `/offers/igbTdRbk/checkout`
- **Status:** ✅ Working
- **Type:** Consultation Offer
- **Offer Title (Public):** Member Signature Consult
- **Internal Title:** `MEMCS01_Member-Signature-Consult`
- **Code:** MEMCS01
- **Price:** $525 base ($445 with MEMCONS, $290 with SSOCIAL)
- **Description:** Member Consult Standalone

- **URL:** `https://joinsnooze.com/offers/zAybiDqh`
- **Path:** `/offers/zAybiDqh`
- **Status:** ✅ Working
- **Type:** Consultation Offer (Upsell)
- **Description:** Launch 1:1 Signature Consult Upsell

### ⚠️ MISSING CONSULTATION OFFERS (Placeholders in Code)
- **URL:** `https://joinsnooze.com/offers/[SIGNATURE-CONSULT-CHECKOUT]`
- **Path:** `/offers/[SIGNATURE-CONSULT-CHECKOUT]`
- **Status:** 📝 **PLACEHOLDER** - **NEEDS REAL ID**
- **Code:** PUBCS01 (PUB-CONSULT-NONMEM-SIG)
- **Price:** $650 USD
- **Description:** Signature Consult for non-members
- **Location:** `one-on-one-consultations-page.html` line 121
- **Action:** Get offer ID from Kajabi dashboard

- **URL:** `https://joinsnooze.com/offers/jRxWAnVo/checkout`
- **Path:** `/offers/jRxWAnVo/checkout`
- **Status:** ✅ Working
- **Code:** PUBCS02 (PUB-CONSULT-45MIN-FUP)
- **Price:** $390 USD
- **Description:** 45-minute Follow-up Consult

- **URL:** `https://joinsnooze.com/offers/mwiSia6A/checkout`
- **Path:** `/offers/mwiSia6A/checkout`
- **Status:** ✅ Working
- **Code:** PUBCS03 (PUB-CONSULT-2WEEK-PKG)
- **Price:** $3,500 USD
- **Description:** 2-Week Baby Sleep Transformation Package

### Camp Snooze Offers
- **URL:** `https://joinsnooze.com/offers/muRW6ug5/checkout`
- **Path:** `/offers/muRW6ug5/checkout`
- **Status:** 🔒 Login-gated / expired - June 2026 audit found `/offers/muRW6ug5` now redirects anonymous visitors to `/login`. Camp Snooze Jan '26 is past, so this is no longer a public checkout. Do not use as a public CTA. Was previously ✅ Working.
- **Offer Title (Public):** Camp Snooze Jan '26
- **Internal Title:** `PUBCM01_Camp-Snooze-Jan-26`
- **Code:** PUBCM01
- **Price:** $690 USD ($390 USD for Snooze members with discount code)
- **Member Discount Code:** `SNOOZEJAN26` ($300 off)
- **Member Checkout URL:** `https://www.joinsnooze.com/offers/muRW6ug5?coupon_code=SNOOZEJAN26`
- **Description:** Camp Snooze January 2026 - Virtual baby sleep summer camp (Standalone)
- **Offer ID:** `muRW6ug5`
- **Note:** Members use discount code `SNOOZEJAN26` for $300 off (final price $390 USD)

- **URL:** `https://joinsnooze.com/offers/K3Y6FEKX/checkout`
- **Path:** `/offers/K3Y6FEKX/checkout`
- **Status:** ✅ Working
- **Offer Title (Public):** Camp Snooze + Snooze Access Bundle
- **Internal Title:** `PUBCM02_Camp-Snooze-Bundle`
- **Code:** PUBCM02
- **Price:** From $587 USD (Quarterly) or $1,047 USD (Annual)
- **Description:** Camp Snooze + Snooze Access Bundle - Two-week intensive plus ongoing support
- **Offer ID:** `K3Y6FEKX`
- **Pricing Options:**
  - **Camp + Quarterly:** $587 USD (Save $250 vs. buying separately)
  - **Camp + Annual:** $1,047 USD (Save $133 vs. buying separately, includes 2 months free)
- **Note:** This is the primary checkout URL used on the Camp Snooze landing page CTAs

### Upsell Offers (Placeholders)
- **URL:** `https://joinsnooze.com/offers/[UPSELL-GUIDE-MEMBERSHIP]`
- **Path:** `/offers/[ID]/checkout`
- **Status:** 📝 **PLACEHOLDER** - **NEEDS REAL ID**
- **Code:** UPGDMS01 (UPSELL-GUIDE-MEMBERSHIP)
- **Price:** $80 USD
- **Description:** Guide → Membership Upsell

- **URL:** `https://joinsnooze.com/offers/[UPSELL-COURSE-MEMBERSHIP]`
- **Path:** `/offers/[ID]/checkout`
- **Status:** 📝 **PLACEHOLDER** - **NEEDS REAL ID**
- **Code:** UPCRMS01 (UPSELL-COURSE-MEMBERSHIP)
- **Price:** $30 USD
- **Description:** Course → Membership Upsell

- **URL:** `https://joinsnooze.com/offers/[UPSELL-MEMB-CONSULT-SIG]`
- **Path:** `/offers/[ID]/checkout`
- **Status:** 📝 **PLACEHOLDER** - **NEEDS REAL ID**
- **Code:** UPMBCS01 (UPSELL-MEMB-CONSULT-SIG)
- **Price:** $445 USD
- **Description:** Membership → Consult Upsell

---

## 👥 Community & Library

### Snooze Community (Village)
- **URL:** `https://joinsnooze.com/products/communities/v2/snooze`
- **Path:** `/products/communities/v2/snooze`
- **Status:** ✅ Working
- **Type:** Community/Forum
- **Description:** Snooze Village community access

- **URL:** `https://joinsnooze.com/snooze-village`
- **Path:** `/snooze-village`
- **Status:** ❌ Broken (404) - **DEAD URL, no Kajabi page exists.** June 2026 audit re-confirmed 404. "Fixed in code" only rewrote in-repo links; the live URL still 404s. Recommendation: either set a 301 to the live community at `/products/communities/v2/snooze` (member-gated, redirects anonymous users to `/login`), or remove `/snooze-village` references entirely. Do not advertise it as a public URL.
- **Type:** Legacy URL (dead)

### Snooze Library
- **URL:** `https://joinsnooze.com/products/communities/v2/snooze/library`
- **Path:** `/products/communities/v2/snooze/library`
- **Status:** ✅ Working
- **Type:** Library/Resource Hub
- **Description:** Snooze Library page (custom page)

- **URL:** `https://joinsnooze.com/products/communities/v2/snooze/resource/9f86d81f-18f7-494e-bad0-60ead4a4fde0`
- **Path:** `/products/communities/v2/snooze/resource/9f86d81f-18f7-494e-bad0-60ead4a4fde0`
- **Status:** ✅ Working
- **Type:** Embedded Library Page (Member Access)
- **Description:** Same library page when accessed via community (embedded resource URL)
- **Note:** This is the embedded version of the library page that members see when accessing through the community

- **URL:** `https://joinsnooze.com/snooze-library`
- **Path:** `/snooze-library`
- **Status:** 🔄 Needs Redirect → `/products/communities/v2/snooze/library`
- **Type:** Legacy URL

---

## Age-Specific Landing Pages

### Newborn Sleep Help (0-3 Months)
- **URL:** `https://joinsnooze.com/newborn-baby-sleep-help`
- **Status:** Active
- **Type:** Landing Page

### 3-4 Month Baby Sleep Help
- **URL:** `https://joinsnooze.com/3-4-month-baby-sleep-help`
- **Status:** Active
- **Type:** Landing Page

### 5-12 Month Baby Sleep Help
- **URL:** `https://joinsnooze.com/5-12-month-baby-sleep-help`
- **Status:** Active
- **Type:** Landing Page

### Toddler Sleep Help (12 Months+)
- **URL:** `https://joinsnooze.com/toddler-sleep-help`
- **Status:** Active
- **Type:** Landing Page

## Cold Traffic Conversion Landing Page

### Get Great Baby Sleep (Cold Traffic Landing Page)
- **URL:** `https://joinsnooze.com/get-great-baby-sleep`
- **Path:** `/get-great-baby-sleep`
- **Status:** ❌ 404 live - **DRAFT** (Kajabi website page id `2156754778`, never published). Built in repo but not deployed. The June 2026 audit confirmed 404; this entry previously read ✅ Active. DEPRIORITISED (Wave 1 #1): no live ad runs to it, so no paid-spend leak. Deploy only when a campaign needs it.
- **Type:** Cold Traffic Conversion Landing Page (draft)
- **Purpose:** Primary destination for paid cold traffic ads (Meta, etc.)
- **Description:** Emotion-first landing page designed for cold traffic conversion. Leads with identity, belief, and safety before introducing Snooze membership and pricing.
- **SEO Title:** "Get Great Baby Sleep | Snooze Membership - Sleep Support & Coaching"
- **SEO Description:** "Get great baby sleep and feel like yourself again. Snooze gives you a clear sleep plan for your baby's age, plus coaching and judgement-free support. Join Snooze membership today."
- **File Location:** `projects/snooze-website/kajabi-deployment/pages/cold-traffic-landing-page/cold-traffic-landing-page-blocks.html`

---

## ⚖️ Legal & Policy Pages

### Privacy Policy
- **URL:** `https://joinsnooze.com/privacy-policy`
- **Path:** `/privacy-policy`
- **Status:** ✅ Working (LIVE - Kajabi website page id `2156730062`). This is the correct, canonical privacy URL; link to it everywhere.
- **Type:** Legal/Policy Page
- **Description:** Standalone Privacy Policy page with GDPR and CCPA compliance

- **URL:** `https://joinsnooze.com/privacy`
- **Path:** `/privacy`
- **Status:** ❌ Broken (404) - **NEEDS 301 REDIRECT** → `/privacy-policy` (which is LIVE, id `2156730062`). June 2026 audit re-confirmed 404. Set a 301 from `/privacy` to `/privacy-policy` so inbound links and any "privacy" references resolve.
- **Type:** Legacy URL

### Terms and Conditions
- **URL:** `https://joinsnooze.com/terms-conditions`
- **Path:** `/terms-conditions`
- **Status:** ✅ Working
- **Type:** Legal/Policy Page
- **Description:** Terms and Conditions for all Snooze services

- **URL:** `https://thesleepconcierge.mykajabi.com/3-4-month-baby-sleep-course-terms-and-conditions`
- **Status:** ❓ Unknown (may return 429 - rate limiting, verify manually)
- **Type:** Course-specific Terms

### Email Protection (Cloudflare)
- **URL:** `https://joinsnooze.com/cdn-cgi/l/email-protection`
- **Path:** `/cdn-cgi/l/email-protection`
- **Status:** ❌ Broken (404) - Cloudflare email obfuscation
- **Action:** Remove or fix email obfuscation in terms-conditions page

---

## Hero Section Images

### Age-Specific Hero Images

**Newborn Hero Image:**
- **URL:** `https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/da8fc81-feb4-3edc-2cd2-7c85d631efa_Newborn_Baby_Sleeping.png`
- **Used In:** Newborn Sleep Help page hero section
- **Format:** PNG

**3-4 Month Hero Image:**
- **URL:** `https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/e0b6bc0-18e1-a5ca-7a06-125b1ffce22_4_month_old_sleeping_baby_-_hero.png`
- **Used In:** 3-4 Month Baby Sleep Help page hero section
- **Format:** PNG

**5-12 Month Hero Image:**
- **URL:** `https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/e64f81f-40-1418-d252-46d4a0bc188_5-12month_Hero_image.png`
- **Used In:** 5-12 Month Baby Sleep Help page hero section
- **Format:** PNG

**Toddler Hero Image:**
- **URL:** `https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/55aa350-fb50-2c4-6635-6852ddd6cc6f_Snooze_Toddler_Sleep_Help.webp`
- **Used In:** Toddler Sleep Help page hero section
- **Format:** WebP

**Note:** These images are positioned to the right edge of the hero section, with content on the left. Images are hosted on Kajabi CDN and should not be replaced with placeholders.

---

## Important Notes

### URL Usage Guidelines

1. **Always Use Actual URLs:** Never use placeholder URLs like `#`, `placeholder-url`, or `example.com`
2. **Verify URLs Work:** Test all URLs before deployment
3. **Image URLs:** 
   - Images must be uploaded to Kajabi first, OR
   - Use existing image URLs from the current site
   - Never use placeholder image URLs
4. **Checkout URLs:** 
   - Primary checkout: `/offers/6iRarwak/checkout` (for non-members)
   - Always use full URL: `https://joinsnooze.com/offers/6iRarwak/checkout`
5. **Domain Migration:** 
   - All URLs will need to be updated after domain migration
   - Use relative paths where possible for easier migration

### Developer Checklist

Before deploying any page:
- [ ] All URLs are from this reference document
- [ ] No placeholder URLs exist
- [ ] All image URLs point to actual Kajabi-uploaded images or existing site images
- [ ] All checkout URLs use the correct offer ID
- [ ] All internal links use correct paths
- [ ] Test all URLs to ensure they work

### URL Discovery Process

If you encounter a URL that's not in this document:

1. **Search the existing site:** Check `https://joinsnooze.com` for the page/resource
2. **Check Kajabi backend:** Look in Kajabi admin for the correct URL
3. **Check sitemap:** Review sitemap for all available pages
4. **Update this document:** Add any new URLs found to this reference
5. **Never use placeholders:** If URL can't be found, document it as a blocker

---

## Future Domain Migration

After migration to `joinsnooze.com`, all URLs will need to be updated:

- **Current:** `https://joinsnooze.com/...`
- **Future:** `https://joinsnooze.com/...`

**Migration Strategy:**
- Use Cloudflare redirects for old domain → new domain
- Update all internal links in Kajabi
- Update this document with new URLs after migration

---

---

## 🔗 External Links

### Social Media
- **URL:** `https://www.instagram.com/thesleepconcierge/`
- **Status:** ✅ Working
- **Type:** Social Media

- **URL:** `https://www.tiktok.com/@thesleepconcierge`
- **Status:** ✅ Working
- **Type:** Social Media

- **URL:** `https://www.facebook.com/thesleepconcierge`
- **Status:** ✅ Working
- **Type:** Social Media

- **URL:** `https://www.instagram.com/accounts/login/?next=...`
- **Status:** ❓ Unknown (may return 429 - rate limiting, verify manually)
- **Type:** Instagram Login Redirect

### Podcast
- **URL:** `https://open.spotify.com/show/1LRXenhiADr7YzoGNbRwP2`
- **Status:** ✅ Working
- **Type:** Podcast
- **Description:** Nap Trapped podcast
- **Note:** **FIXED** - Was `/show/naptrapped` (400 error), now correct show ID

### Recommended Product Partners
- **URL:** `https://kippins.co/`
- **Status:** ✅ Working
- **Type:** Affiliate Partner
- **Location:** Recommended products page
- **Note:** **FIXED** - Domain changed from `kippins.com.au` to `kippins.co`

- **URL:** `https://naty.com/`
- **Status:** ✅ Working
- **Type:** Affiliate Partner
- **Location:** Recommended products page
- **Note:** **FIXED** - Domain changed from `naty.com.au` to `naty.com`

- **URL:** `https://www.happiestbaby.com/products/snoo-smart-bassinet`
- **Status:** ✅ Working
- **Type:** Affiliate Partner
- **Description:** Snoo Smart Bassinet
- **Note:** **FIXED** - Was `/products/snoo` (404), now correct URL

- **URL:** `https://www.happiestbaby.com.au/products/baby-streaming-video-english`
- **Status:** ✅ Working
- **Type:** Affiliate Partner
- **Description:** Happiest Baby on the Block (Streaming Video)
- **Location:** Blog post about Dr. Harvey Karp
- **Note:** **FIXED** - DVD product replaced with streaming video, URL updated to Australian site

- **URL:** `https://glowdreaming.com`
- **Status:** ✅ Working
- **Type:** Affiliate Partner
- **Description:** Glow Dreaming white noise machine

- **URL:** `https://cuboai.com`
- **Status:** ✅ Working
- **Type:** Affiliate Partner
- **Description:** Cubo Ai Plus baby monitor

- **URL:** `https://www.ergobaby.com.au`
- **Status:** ✅ Working
- **Type:** Affiliate Partner
- **Description:** Ergobaby carrier

- **URL:** `https://growbright.com.au`
- **Status:** ✅ Working
- **Type:** Affiliate Partner
- **Description:** Growbright Airnest Junior Pillow

### Reference & Support Links
- **URL:** `https://www.allaboutcookies.org/`
- **Status:** ❓ Unknown (may return 403 - site blocking bots) - **VERIFY MANUALLY**
- **Type:** Reference Link
- **Location:** Privacy policy page

- **URL:** `https://rednose.org.au/page/grief-and-loss-support-services`
- **Status:** ❓ Unknown - URL is correct but page content may have changed
- **Type:** Reference Link
- **Location:** Blog post about rainbow babies
- **Note:** Domain is correct, verify page content manually if needed

---

## 📊 Link Status Summary

### Status Breakdown (as of December 17, 2025)
- ✅ **Working:** ~50 links
- ❌ **Broken (404/403/400):** 15 links
- ⚠️ **Missing/Needs Creation:** 0 links (all pages exist or have redirects)
- 🔄 **Needs Redirect:** 3 links (not actionable for now)
- 📝 **Placeholder (Needs Real ID):** 6 consultation/upsell offers
- ❓ **Unknown/Needs Verification:** 5 links

### 🔴 CRITICAL Priority Fixes

1. **Consultation Checkout Placeholders** (3 placeholders)
   - Get real offer IDs from Kajabi dashboard
   - Update `one-on-one-consultations-page.html`
   - Update Google Sheet (source of truth) or root `docs/operations/KAJABI-OFFERS-REGISTRY.md`

2. **Redirect Setup** (Not actionable for now)
   - `/privacy` → `/privacy-policy` (not actionable)
   - `/about` → `/about-sally` (not actionable)
   - `/snooze-village` → `/products/communities/v2/snooze` (already fixed in code, redirect not actionable for now)
   - **Note:** `/snooze-library` is a valid public-facing URL - no redirect needed
   - **Note:** `/products/*` URLs are correct internal product access URLs - do NOT redirect these

3. **External Link Verification** (2 links remaining)
   - Verify `allaboutcookies.org` manually
   - Verify `rednose.org.au/page/grief-and-loss-support-services` page content (URL is correct)
   - ✅ **FIXED:** `kippins.com.au` → `kippins.co` (updated in code)
   - ✅ **FIXED:** `naty.com.au` → `naty.com` (updated in code)
   - ✅ **FIXED:** `happiestbaby.com/products/happiest-baby-dvd` → `happiestbaby.com.au/products/baby-streaming-video-english` (updated in docs)

---

**Last Verified:** December 18, 2025  
**Next Review:** After deploying fixes and getting offer IDs



