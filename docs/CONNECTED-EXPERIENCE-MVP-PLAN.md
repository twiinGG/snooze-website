# Archived Connected Experience MVP Plan

**Date:** January 2025  
**Status:** ARCHIVED — historical navigation plan; do not execute as current deployment authority

**Goal:** Create unified navigation and premium user experience across all Snooze pages before domain migration

> The live site now uses Kajabi's native Header. PASTE-MAP A6/A7 supersedes every custom-navigation
> file or paste instruction below.

> **Correction 2026-06-29 (LMCR04 funnel remediation, P2-9):** all checkout CTAs in this plan were updated from the retired draft offer slug `6iRarwak` to the canonical USD membership slug `z63s9VaR` (offer 2150754998). `6iRarwak` (offer 2150812784) is a retired/draft founding offer; do not use. AUD twin is `vYgCNgJz` (offer 2151256977; updated 2026-06-30 from the deleted `bEsVXFXG`/2151212200). See `course-free-modules-conversion/docs/LMCR04-FUNNEL-REMEDIATION-PLAN.md`.

---

## Overview

Create a unified navigation and CTA system that intelligently routes users based on their status (new visitor, logged-in non-member, Snooze member) to their optimal next action. Harmonize the Snooze Main Landing page with Library, Toddler Toolkit, and Snooze Method resources to create a cohesive, premium experience before domain migration.

**Key Principle:** Premium experience throughout with clear signposting. If user detection fails, fallback to prompts and clear messaging.

---

## User Classes & Journeys

### 1. New Visitors (Not Logged In)
**Goal:** Drive to Snooze Founding Member Offer checkout  
**Access:** Public pages only (age-specific pages, landing pages, blog)  
**CTAs:** "Join Snooze" → `/offers/z63s9VaR/checkout`

### 2. Logged-In Non-Members (Have Account, No Snooze Membership)
**Goal:** Access purchased products + nudge to Snooze membership  
**Access:**
- Public pages
- Snooze Library page (with teaser content only)
- Individual products they purchased (via Kajabi system Library)  
**CTAs:**
- "Access Your Library" → Kajabi system Library
- "Upgrade to Snooze" → `/offers/z63s9VaR/checkout`
- Links to purchased individual products

### 3. Snooze Members (Active Membership)
**Goal:** Quick access to Library, Village, resources, live sessions  
**Access:**
- All public pages
- Full Snooze Library (all resources)
- Snooze Village (community)
- Live sessions with the Snooze Specialists
- All age-based modules  
**CTAs:**
- "Go to Library" → Snooze Library page
- "Join Village" → Snooze Village (community)
- "Book a Consult" → 1:1 consult booking
- Direct links to resources

---

## Implementation Tasks

### Phase 1: Navigation System (Universal Header/Footer)

**Task 1.1: Create Context-Aware Navigation Component**
- **File:** `projects/snooze-website/kajabi-deployment/navigation.html`
- **Functionality:**
  - Attempt user status detection (logged in, Snooze member, new visitor)
  - Show appropriate navigation links based on status
  - **Fallback:** If detection fails, show signposting with clear labels
  - Universal header/footer that works across all pages
- **Navigation Links by Status:**
  - **New Visitor:** Home, The Snooze Method, About Sally, Blog, Join Snooze (CTA)
  - **Logged-In Non-Member:** Home, Library (teaser), Your Products, Upgrade to Snooze (CTA)
  - **Snooze Member:** Home, Library (full), Village, Live Sessions, Your Account
- **Signposting Fallback:** Show all links with clear labels indicating who each is for

**Task 1.2: Implement User Status Detection (With Fallback)**
- **File:** `projects/snooze-website/kajabi-deployment/navigation.js`
- **Primary Method:** Attempt Kajabi's member detection + membership check
- **Fallback Strategy:** If detection fails, use signposting approach
- **Logic:**
  ```javascript
  // Attempt detection
  try {
    if (kajabi.user.isLoggedIn) {
      if (kajabi.user.hasMembership('snooze')) {
        status = 'snooze-member';
      } else {
        status = 'logged-in-non-member';
      }
    } else {
      status = 'new-visitor';
    }
  } catch (error) {
    // Fallback: Use signposting (show all options with clear labels)
    status = 'unknown';
    useSignposting = true;
  }
  ```
- **Signposting Approach:** Show all navigation options with clear labels indicating who each is for

**Task 1.3: Create Universal Footer**
- **File:** `projects/snooze-website/kajabi-deployment/footer.html`
- **Content:** Links, contact, social, legal
- **CTAs:** Context-aware based on user status (or signposting if detection fails)
- **Design:** Premium, polished experience

### Phase 2: Landing Page Harmonization

**Task 2.1: Update Snooze Main Landing Page**
- **File:** `projects/landing-page/kajabi-deployment/kajabi-html-blocks.html`
- **Updates:**
  - Add references to Library, Toddler Toolkit, Snooze Method
  - Update "What's Inside" section to mention:
    - The Snooze Method foundational course
    - Age-based modules (Newborn, 3-4 Month, 5-12 Month, Toddler Toolkit)
    - Sleep troubleshooting guides
  - Add section linking to Library preview
  - Ensure all CTAs point to `/offers/z63s9VaR/checkout`
  - Premium design and messaging throughout

**Task 2.2: Add Library Preview Section**
- **Location:** After "What's Inside" section on landing page
- **Content:** 
  - Premium preview of Library structure (Foundational, Age-Based, Troubleshooting)
  - "See What's Inside" CTA → Library page (or checkout for new visitors)
  - Context-aware: Members see "Go to Library", visitors see "Join to Access"
  - If detection fails: Show both options with clear signposting

**Task 2.3: Update Navigation on Landing Page**
- **Current:** Anchor links (#how-it-works, #pricing, etc.)
- **Update:** Add links to Library, The Snooze Method page, About Sally
- **Keep:** Pricing anchor for conversion
- **Design:** Premium navigation experience

### Phase 3: Age-Specific Pages Enhancement

**Task 3.1: Update Age-Specific Pages (4 pages)**
- **Pages:**
  - Newborn Sleep Help (0-3 Months)
  - 3-4 Month Baby Sleep Help
  - 5-12 Month Baby Sleep Help
  - Toddler Sleep Help (12 Months+)
- **Updates:**
  - Add universal navigation header
  - Add context-aware CTAs with fallback signposting:
    - **New Visitor:** "Join Snooze to Access Full Guide" → `/offers/z63s9VaR/checkout`
    - **Logged-In Non-Member:** "Upgrade to Snooze" → `/offers/z63s9VaR/checkout`
    - **Snooze Member:** "Go to Library" → Snooze Library page
    - **If Detection Fails:** Show all options with clear prompts
  - Add "What's in Snooze" section showing:
    - This guide is included in Snooze
    - Plus access to all other age guides
    - Plus Library, Village, Coaching
  - Add value comparison: Individual guide vs Snooze membership
  - Premium design and messaging

**Task 3.2: Add Cross-Linking Between Age Pages**
- **Location:** Bottom of each age-specific page
- **Content:** "Also available: [Other Age Guides]" with links
- **Purpose:** Show comprehensiveness of Snooze
- **Design:** Premium, polished cross-linking

### Phase 4: Product/Course Landing Pages

**Task 4.1: Update Course Landing Pages**
- **Pages:**
  - 3-4 Month Course Landing Page
  - 5-12 Month Guide Landing Page
  - Newborn Sleep Guide Landing Page
- **Updates:**
  - Add universal navigation
  - Add prominent Snooze membership CTA
  - Show value: "This course + everything else in Snooze"
  - Context-aware CTAs with fallback signposting (same logic as age-specific pages)
  - Premium design throughout

**Task 4.2: Create Product Comparison Section**
- **Template:** Reusable component
- **Content:**
  - Individual product price
  - Snooze membership price
  - "Get this + everything else" messaging
  - Clear savings demonstration
- **Design:** Premium comparison layout

### Phase 5: Snooze Library Page Enhancement

**Task 5.1: Add Context-Aware Library Access (With Prompts)**
- **File:** `projects/landing-page/kajabi-deployment/library-page/section-01-title.html`
- **Primary Approach:** Attempt user status detection
- **Fallback Approach:** Use clear prompts and signposting
- **Updates:**
  - **If Detection Works:**
    - **New Visitor:** Show teaser + "Join Snooze to Access" CTA
    - **Logged-In Non-Member:** Show teaser content + "Upgrade to Snooze" CTA
    - **Snooze Member:** Show full Library access
  - **If Detection Fails (Fallback):**
    - Show premium Library preview with clear prompts
    - Prominent "Login to Access" prompt
    - "Join Snooze to Unlock Full Access" CTA
    - Clear messaging: "You must have purchased resources individually or hold a Snooze Membership to access"
  - Premium design throughout

**Task 5.2: Create Premium Teaser Content**
- **Content:** 
  - Premium preview of Library structure (three-tiered learning path)
  - Sample resource previews (The Snooze Method, age modules, troubleshooting)
  - Clear value proposition
  - Prominent prompts:
    - "Login to access your purchased resources"
    - "Join Snooze to unlock full access to Library, Village, and Coaching"
    - "You must have purchased resources individually or hold a Snooze Membership"
- **Design:** Premium, polished experience that builds desire for access

**Task 5.3: Add Navigation to Library Page**
- **Update:** Add universal header/footer
- **Links:** 
  - Home → Landing page
  - Village → Community (members only)
  - The Snooze Method → Method page
  - About Sally → About page
- **Design:** Premium navigation experience

### Phase 6: System Login Page Enhancement

**Task 6.1: Update Kajabi System Login Page**
- **Location:** Kajabi Settings → Website → Login page
- **Updates:**
  - Add premium messaging: "Login to access your Snooze resources"
  - Add callout box with clear access requirements:
    - "You must have purchased resources individually OR hold a Snooze Membership to access"
    - Link to Snooze Founding Member Offer for non-members
  - Premium design that matches Snooze branding
  - Clear signposting for different user types

### Phase 7: The Snooze Method Page

**Task 7.1: Create The Snooze Method Page**
- **File:** `projects/snooze-website/kajabi-deployment/the-snooze-method.html` (already created)
- **Updates:**
  - Add universal navigation
  - Link to foundational course in Library
  - Context-aware CTAs with fallback signposting
  - Show three-tiered learning path
  - Link to Library for members, checkout for visitors
  - Premium design throughout

### Phase 8: Checkout URL Standardization

**Task 8.1: Update All CTAs to Snooze Founding Member Offer**
- **Checkout URL:** `https://joinsnooze.com/offers/z63s9VaR/checkout`
- **Files to update:**
  - Landing page HTML blocks
  - Age-specific pages
  - Course landing pages
  - Library page
  - The Snooze Method page
  - Navigation component
- **Method:** Use JavaScript variable for easy updates
  ```javascript
  window.SNOOZE_CHECKOUT_URL = 'https://joinsnooze.com/offers/z63s9VaR/checkout';
  ```

**Task 8.2: Document All Checkout Entry Points**
- **File:** `projects/snooze-website/docs/CHECKOUT-ENTRY-POINTS.md`
- **Purpose:** Track all pages that link to checkout for analytics

### Phase 9: Cross-Page Linking Strategy

**Task 9.1: Create Internal Linking Map**
- **Document:** `projects/snooze-website/docs/INTERNAL-LINKING-MAP.md`
- **Content:**
  - Landing page → Library, Method, About, Age pages
  - Age pages → Library, Method, Other age pages, Checkout
  - Library → Method, Village, Coaching, Age modules
  - Method → Library, Checkout
  - All pages → Checkout (for non-members)

**Task 9.2: Implement Breadcrumb Navigation**
- **Location:** Top of content pages
- **Format:** Home > Category > Page
- **Purpose:** Help users understand site structure
- **Design:** Premium breadcrumb styling

### Phase 10: Testing & Validation

**Task 10.1: Test User Journeys**
- **Test Cases:**
  1. New visitor lands on age page → Can navigate to checkout
  2. New visitor lands on landing page → Can navigate to Library preview → Checkout
  3. New visitor sees Library → Clear prompts to login/join
  4. Logged-in non-member → Sees Library teaser → Upgrade CTA works
  5. Snooze member → Can access full Library → Can navigate to Village
  6. All pages have consistent navigation
  7. All CTAs point to correct checkout URL
  8. Login page shows clear access requirements

**Task 10.2: Verify Context-Aware CTAs & Signposting**
- Check each page renders appropriate CTAs
- Verify JavaScript detection works (if implemented)
- Test fallback signposting if detection fails
- Verify prompts are clear and premium-feeling
- Test logged-in vs logged-out states
- Verify premium experience throughout

---

## Files to Create/Update

### New Files
- `projects/snooze-website/kajabi-deployment/navigation.html` - Universal navigation
- `projects/snooze-website/kajabi-deployment/navigation.js` - User status detection (with fallback)
- `projects/snooze-website/kajabi-deployment/footer.html` - Universal footer
- `projects/snooze-website/kajabi-deployment/context-aware-cta.html` - Reusable CTA component
- `projects/snooze-website/docs/CHECKOUT-ENTRY-POINTS.md` - Checkout tracking
- `projects/snooze-website/docs/INTERNAL-LINKING-MAP.md` - Link structure

### Files to Update
- `projects/landing-page/kajabi-deployment/kajabi-html-blocks.html` - Landing page updates
- `projects/landing-page/kajabi-deployment/library-page/section-01-title.html` - Library context-aware access
- Age-specific pages (4 pages) - Add navigation, CTAs, value props
- Course landing pages - Add navigation, CTAs, value props
- `projects/snooze-website/kajabi-deployment/the-snooze-method.html` - Add navigation, links
- Kajabi System Login page - Add access requirements messaging

---

## Success Criteria

1. **New visitors** can navigate from any page to Snooze checkout
2. **Logged-in non-members** see appropriate teasers and upgrade CTAs
3. **Snooze members** can easily access Library, Village, and resources
4. **All pages** have consistent navigation and branding
5. **Landing page** harmonizes with Library, Method, and Toolkit resources
6. **All CTAs** point to correct checkout URL (`/offers/z63s9VaR/checkout`)
7. **User experience** feels connected and intentional across all pages
8. **Premium experience** throughout - polished, clear, professional
9. **Clear signposting** if user detection fails - users always know their next step
10. **Login page** clearly explains access requirements

---

## Domain Migration Phases (After MVP)

### Phase 11: Pre-Migration Preparation

**Task 11.1: Final Content Review**
- Review all pages for Snooze branding consistency
- Verify all internal links work
- Check all CTAs point to correct checkout
- Ensure premium experience is consistent

**Task 11.2: SEO Preparation**
- Update all page SEO metadata
- Create URL mapping document
- Prepare redirect rules for Cloudflare
- Document all pages that need redirects

### Phase 12: Cloudflare Redirect Setup

**Task 12.1: Configure Cloudflare Account**
- Add `joinsnooze.com` to Cloudflare
- Configure DNS settings
- Set up Page Rules for redirects

**Task 12.2: Create Redirect Rules**
- Blog posts: `joinsnooze.com/blog/*` → `joinsnooze.com/blog/*`
- Age-specific pages → `joinsnooze.com/library`
- Product pages → `joinsnooze.com/library`
- Homepage → `joinsnooze.com/`
- Catch-all redirects

**Task 12.3: Test All Redirects**
- Verify 301 status codes
- Test query parameter preservation
- Check all major entry points

### Phase 13: Kajabi Domain Configuration

**Task 13.1: Update Primary Domain**
- Set `joinsnooze.com` as primary domain in Kajabi
- Update all internal links in Kajabi
- Update community URL references
- Test all Kajabi pages with new domain

**Task 13.2: Update System-Wide Settings**
- Update system SEO settings for new domain
- Update checkout URLs
- Update email templates
- Update social sharing settings

### Phase 14: Content Migration

**Task 14.1: Migrate Blog Posts**
- Migrate all 36 blog posts to new domain
- Update URLs, internal links, and images
- Preserve SEO metadata
- Add Snooze CTAs to blog posts

**Task 14.2: Update All Pages**
- Update all page content for new domain
- Update all internal links
- Update all images and assets
- Verify all functionality works

### Phase 15: Post-Migration Testing & Monitoring

**Task 15.1: Comprehensive Testing**
- Test all redirects
- Test all internal links
- Test mobile responsiveness
- Test conversion flows
- Test member access

**Task 15.2: SEO Monitoring**
- Submit updated sitemap to Google Search Console
- Monitor 404 errors
- Track SEO rankings
- Monitor redirect performance

**Task 15.3: Analytics Setup**
- Update Google Analytics for new domain
- Set up conversion tracking
- Monitor user journeys
- Track conversion rates

---

## Dependencies

- Kajabi member detection API/functionality (optional - has fallback)
- Kajabi membership check functionality (optional - has fallback)
- Access to update all age-specific and course landing pages
- Snooze Library page access for updates
- Snooze Founding Member Offer checkout URL confirmed
- Cloudflare account access
- GoDaddy DNS access (joinsnooze.com)
- Namecheap DNS access (joinsnooze.com)

---

## Notes

- **User Detection:** Attempt to implement, but have clear signposting fallback
- **Premium Experience:** All pages should feel polished and professional
- **Prompts:** Use clear, helpful prompts if detection fails
- **Login Page:** Update system login page with access requirements
- **Checkout Pages:** Nested in offers but appear as standalone in sitemap
- **Kajabi System Library:** Separate from Snooze Library page (shows purchased products)
- **Snooze Library Page:** Behind login but accessible to any logged-in user
- **Three User Classes:** Need appropriate messaging for each
- **MVP Focus:** Connected experience, not full redesign
- **Domain Migration:** Happens after MVP is complete and tested

---

## Implementation Order

1. **Phase 1-10:** Connected Experience MVP (this document)
2. **Phase 11-15:** Domain Migration (after MVP is complete)

**Current Focus:** Complete Phase 1-10 (Connected Experience MVP) before moving to domain migration.


