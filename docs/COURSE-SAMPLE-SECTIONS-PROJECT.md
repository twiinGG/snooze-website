# Add Course Sample Sections to Age Pages

**Status:** On-Ice (Hidden until ready)  
**Type:** Web / Digital  
**Brand:** Khorus  
**Date:** January 15, 2025

---

## Overview

Implement email capture sections with course samples on all 4 age-specific pages (Newborn, 3-4 Month, 5-12 Month, Toddler). Sections are currently hidden in HTML comments and need to be activated with Kajabi form integration and email automations.

---

## Files to Update

- `projects/snooze-website/kajabi-deployment/age-pages/newborn-page-complete.html`
- `projects/snooze-website/kajabi-deployment/age-pages/3-4-month-page-complete.html`
- `projects/snooze-website/kajabi-deployment/age-pages/5-12-month-page-complete.html`
- `projects/snooze-website/kajabi-deployment/age-pages/toddler-page-complete.html`

**Current Status:** Sections are commented out (hidden) in all files. Look for `<!-- SECTION 5: FREE COURSE SAMPLE (EMAIL CAPTURE) -->` comments.

---

## Implementation Tasks

### 1. Create Kajabi Forms
- [ ] Create form for "Newborn Sleep Guide Sample"
- [ ] Create form for "3-4 Month Sleep Course Sample"
- [ ] Create form for "5-12 Month Sleep Guide Sample"
- [ ] Create form for "Toddler Sleep Toolkit Sample"

### 2. Link Course Sample Modules
- [ ] Identify/select sample module from Newborn Sleep Guide
- [ ] Identify/select sample module from 3-4 Month Sleep Course
- [ ] Identify/select sample module from 5-12 Month Sleep Guide
- [ ] Identify/select sample module from Toddler Sleep Toolkit
- [ ] Create access links/URLs for each sample

### 3. Set Up Email Automations
- [ ] Create email sequence for Newborn sample leads
- [ ] Create email sequence for 3-4 Month sample leads
- [ ] Create email sequence for 5-12 Month sample leads
- [ ] Create email sequence for Toddler sample leads
- [ ] Link forms to automation sequences

### 4. Activate Sections
- [ ] Uncomment sections in all 4 HTML files
- [ ] Replace form placeholders with actual Kajabi form embed codes
- [ ] Update course sample links/content
- [ ] Test form submissions
- [ ] Verify email automation triggers

### 5. Testing & Deployment
- [ ] Test email capture on all 4 pages
- [ ] Verify sample module access works
- [ ] Test email automation delivery
- [ ] Check mobile responsiveness
- [ ] Deploy to production

---

## Section Details

Each section includes:
- **Left Side:** Course sample content with age-specific benefits
- **Right Side:** Email capture form (Kajabi form embed)
- **Responsive Design:** Stacks on mobile (form appears first)

**Age-Specific Content:**
- **Newborn:** Focus on "Is this normal?", day-night confusion, safe sleep
- **3-4 Month:** Focus on 4-month regression, sleep training readiness
- **5-12 Month:** Focus on early rising, nap transitions
- **Toddler:** Focus on bedtime battles, nap refusal

---

## Notes

- Sections are ready to activate - just need Kajabi forms and automations
- All HTML structure and styling is complete
- Forms use unique IDs per page to avoid conflicts
- Brand styling matches Snooze design system

---

**To Add to Notion:**
1. Copy this content
2. Create new project in Project Database
3. Set Stage: "On-Ice"
4. Set Type: "Web / Digital"
5. Set Brand: "Khorus"
6. Paste content into project page

