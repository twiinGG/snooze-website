# Kajabi Migration Checklist

**Date:** January 2025  
**Status:** Ready for Implementation

---

## Pre-Migration: System Settings

### 1. Update System-Wide SEO Settings
**Location:** Settings → Website → SEO and social sharing

**Current (from screenshot):**
- Page title: "Sleep Concierge | Expert Guidance for Mothers & Babies Restful Nights" (69/70 chars)
- Page description: "Expert sleep tips and product recommendations..." (192/300 chars)
- Social image: Current Sleep Concierge logo

**Update To:**
- Page title: "Snooze | Clear, Evidence-Based Sleep Help for Tired Parents" (60 chars max)
- Page description: "Get clear, evidence-based sleep guidance for your baby. The Snooze Method helps tired parents reduce night wakes and extend naps. Join Snooze today." (160 chars max)
- Social image: New Snooze logo (1280x720)

**Impact:** This affects all system pages (Login, 404, Thank You, etc.)

---

## Homepage Configuration

### 2. Set Homepage
**Location:** Settings → Website → Homepage

**Current:** "Show the Template Home Page"  
**Change To:** "Show a Landing Page" → Select "Snooze Main Landing"

**After Migration:**
- Update "Snooze Main Landing" content if needed
- Verify all links point to new domain
- Test homepage loads correctly

---

## Website Pages Migration (29 pages)

### Snooze Pages (Update Domain Only)
- [ ] **Snooze Library**
  - Update internal links to new domain
  - Verify SEO settings
  - Test page functionality

### The Sleep Concierge Pages (Rebrand + Redirect)

#### High Priority (SEO Value)
- [ ] **Expert Newborn Sleep Help: 0-3 Months**
  - Rebrand to Snooze
  - Update SEO: Title, description
  - Redirect: `joinsnooze.com/newborn-baby-sleep-help` → `joinsnooze.com/library`
  - Update content to reference Snooze

- [ ] **3 to 4 months Baby Sleep help**
  - Rebrand to Snooze
  - Update SEO
  - Redirect: `joinsnooze.com/3-4-month-baby-sleep-help` → `joinsnooze.com/library`
  - Update content

- [ ] **Baby Sleep Help: 5-12 Months**
  - Rebrand to Snooze
  - Update SEO
  - Redirect: `joinsnooze.com/5-12-month-baby-sleep-help` → `joinsnooze.com/library`
  - Update content

- [ ] **Toddler Sleep Help: 12 Months+**
  - Rebrand to Snooze
  - Update SEO
  - Redirect: `joinsnooze.com/toddler-sleep-help` → `joinsnooze.com/library`
  - Update content

- [ ] **About | The Sleep Concierge**
  - Rebrand to "About Sally" or "About Snooze"
  - Update SEO
  - Redirect: `joinsnooze.com/about` → `joinsnooze.com/about-sally`
  - Replace with new About Sally page content

- [ ] **Sally Woods - Founder, Sleep Expert...**
  - Merge into About Sally page
  - Redirect to `/about-sally`
  - Archive or delete duplicate

#### Medium Priority
- [ ] **One-on-One Sleep Coaching**
  - Update to reference Snooze membership
  - Add CTA to join Snooze
  - Redirect to `/library` or keep as service page

- [ ] **Expert Sleep Services**
  - Update to Snooze services
  - Redirect to `/library` or homepage

- [ ] **Recommended Baby Sleep Products**
  - Update to Snooze product recommendations
  - Keep as resource page or redirect

- [ ] **Downloadable free Sleep Guides**
  - Update to Snooze guides
  - Redirect to `/library`

#### Low Priority (Content Pages)
- [ ] **FAQs**
  - Update to Snooze FAQs
  - Update SEO
  - Keep as `/faqs` or merge into homepage

- [ ] **Terms & Conditions**
  - Update to Snooze terms
  - Keep as legal page

- [ ] **Sleep Term Glossary** (Draft)
  - Complete and publish
  - Update to Snooze terminology
  - Keep as resource page

---

## Landing Pages (30 pages)

### Snooze Landing Pages (Update Domain)
- [ ] **Snooze Main Landing**
  - Verify this is the homepage candidate
  - Update all internal links
  - Update checkout URLs to new domain
  - Test all CTAs

- [ ] **Snooze Library**
  - Already published
  - Update domain references
  - Verify links to Kajabi Library

- [ ] **Snooze Launch Waitlist**
  - Update domain
  - Update redirects if needed

- [ ] **Other Snooze landing pages**
  - Review and update as needed
  - Archive unused pages

### The Sleep Concierge Landing Pages (Redirect/Merge)
- [ ] **Newborn Sleep Guide**
  - Redirect to `/library` or merge into Library page

- [ ] **3-4 Month Course - Landing Page**
  - Redirect to `/library` or `/the-snooze-method`

- [ ] **5-12 Month Guide - Landing Page**
  - Redirect to `/library`

- [ ] **Other product landing pages**
  - Redirect to `/library` or archive

---

## Blog Pages

### Blog Structure
- [ ] **Blog (Index Page)**
  - Update to Snooze blog
  - Update SEO settings
  - Verify blog post template

- [ ] **Blog Post (Template)**
  - Update template with Snooze branding
  - Add Snooze membership CTAs
  - Update social sharing settings

- [ ] **Migrate 36 Blog Posts**
  - Update each post's SEO
  - Add Snooze CTAs
  - Update internal links
  - Preserve URL slugs where possible

---

## System Pages (Auto-Update)

These will automatically use new domain and system SEO settings:

- [ ] **Login** - Verify works with new domain
- [ ] **404** - Update 404 page content if needed
- [ ] **Thank You** - Update thank you messages
- [ ] **Store** - Update product listings
- [ ] **Contact** - Update contact form
- [ ] **Announcements** - Review and update

---

## Post-Migration Testing

- [ ] Test all internal links
- [ ] Verify all redirects work (301 status)
- [ ] Check SEO metadata on all pages
- [ ] Test mobile responsiveness
- [ ] Verify checkout flows
- [ ] Test member login/access
- [ ] Check blog functionality
- [ ] Verify Library access
- [ ] Test Community links

---

## Cloudflare Redirects (After Kajabi Updates)

Once Kajabi pages are updated, set up Cloudflare redirects:

1. Blog posts: `joinsnooze.com/blog/*` → `joinsnooze.com/blog/*`
2. Age-specific pages → `/library`
3. Product pages → `/library`
4. Homepage → `/`
5. Catch-all → `/`

---

## Notes

- **System pages** share SEO - update once in system settings
- **Custom pages** need individual SEO updates
- **Landing pages** can be set as homepage
- **Blog posts** need individual migration (36 posts)
- **Redirects** handled by Cloudflare, not Kajabi




