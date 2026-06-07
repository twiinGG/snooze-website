# LMCR04 - 5-12 Month Schedules Free Module Setup

Purpose: Step-by-step guide for Virtual Assistant to set up Free Module lead magnets in Kajabi

Format: Notion TSC Library Compatible

Prerequisites: Access to Kajabi admin, approved copy/content from Sally

---

## Pre-Flight Checklist

Before starting, confirm you have:

- [ ] Approved copy review document from Sally (see Copy Review Workflow)
- [ ] GitHub file links document (see LMCR04-GITHUB-LINKS.md)
- [ ] Access to GitHub raw file links (for copy-paste)
- [ ] Offer codes and URLs reference document
- [ ] Access to the canon course to clone from
- [ ] Test email address for QA

Quick Access:

- All files are available via GitHub raw links (always up-to-date)
- See docs/LMCR04-GITHUB-LINKS.md for direct links to all files
- No need to download files - copy directly from GitHub

---

## Phase 1: Product Setup

### Step 1.1: Clone Canon Course

Action: Duplicate the source course in Kajabi

1. Navigate to Products → Courses in Kajabi
2. Find the canon course: 5-12 Month Sleep Training Course
3. Click Duplicate (three dots menu)
4. IMPORTANT: Do NOT publish yet

Canon Course Reference:

Bundle Code: LMCR04

Canon Course Name: 5-12 Month Sleep Training Course

Location in Kajabi: Products → Courses

Verification: Duplicate appears in course list with "(Copy)" suffix

---

### Step 1.2: Update Product Details

Action: Set product title and description from approved copy

1. Open the duplicated course
2. Click Settings (gear icon)
3. Navigate to Details section
4. Update Product Title:
   - Copy from approved copy review document
   - Title: 5-12 Month Sleep Schedules (Free Module)
   - Paste into Title field
5. Update Product Description:
   - Copy from approved copy review document
   - Description: The foundation of great sleep is a great schedule. This module, taken directly from our complete 5-12 Month Baby Sleep Training Course, focuses on nailing age-appropriate rhythms and wake windows. Instead of guessing, you'll get a clear, step-by-step plan to anchor your feeds and find the optimal timing for day sleep. It's a real, high-value solution for those "Hot Mess Express".
   - Paste into Description field
6. Update Internal Name (if visible):
   - Set to: LMCR04_5-12M-Schedules
7. Save changes

Content Location:

- GitHub Raw Link: See docs/LMCR04-GITHUB-LINKS.md for direct link
- Copy-Paste Method:
  1. Open the GitHub raw link
  2. Copy title and description separately
  3. Paste into Kajabi product settings
- Alternative: Provided in Sally's approved copy review document

Verification:

- Product title matches approved copy
- Description matches approved copy
- Both are saved correctly

---

### Step 1.3: Update Orientation Lesson

Action: Replace default welcome content with custom orientation lesson

1. Navigate to Content tab in the course
2. Find the first visible lesson (usually Module 1, Lesson 1)
3. Open the lesson editor
4. Delete all existing content
5. Copy the approved orientation lesson HTML from the copy review document
6. Switch to Source Code view (or HTML block)
7. Paste the HTML content
8. Save the lesson

Content Location:

- GitHub Raw Link: https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR04/html/LMCR04-module-1-lesson-1-schedules.html
- Copy-Paste Method:
  1. Open the GitHub raw link above
  2. Select all (Cmd+A / Ctrl+A)
  3. Copy (Cmd+C / Ctrl+C)
  4. Paste into Kajabi Source Code view
- Alternative: Provided in Sally's approved copy review document

Verification:

- Orientation lesson displays correctly
- No broken formatting
- All text is readable

---

### Step 1.4: Update Orientation Lesson 2

Action: Replace second lesson with custom content

1. Navigate to Content tab in the course
2. Find the second lesson (usually Module 1, Lesson 2)
3. Open the lesson editor
4. Delete all existing content
5. Copy the approved orientation lesson 2 HTML
6. Switch to Source Code view
7. Paste the HTML content
8. Save the lesson

Content Location:

- GitHub Raw Link: https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR04/html/LMCR04-module-1-lesson-2-schedules.html
- Copy-Paste Method:
  1. Open the GitHub raw link above
  2. Select all and copy
  3. Paste into Kajabi Source Code view

Verification:

- Lesson 2 displays correctly
- Content matches approved copy

---

### Step 1.5: Unlock Target Module

Action: Make the specific module accessible (unlock content)

1. Navigate to Content tab
2. Find Module 3: Routines, Schedules & Feeding
3. For each lesson in that module:
   - Click the lesson
   - Set Status to Published
   - Set Drip to Immediate (or remove drip restriction)
4. Save each lesson

Unlocked Content for LMCR04:

Bundle Code: LMCR04

Unlocked Module: Module 3: Routines, Schedules & Feeding

Specific Lessons: All lessons in this module

Verification:

- Target module lessons are visible and accessible
- Can click through and view content

---

### Step 1.6: Lock Remaining Content

Action: Ensure all other modules trigger paywall

1. Navigate to Content tab
2. For each module NOT in the "Unlocked Content" list (Modules 1, 2, 4, 5, 6):
   - Set all lessons to Draft status, OR
   - Set Drip to a future date (e.g., 365 days from now)
3. DO NOT delete any content - only hide it

Verification:

- Only unlocked module is accessible
- Clicking locked lessons shows paywall modal

---

### Step 1.7: Add In-Course CTA Block

Action: Insert upsell buttons at end of unlocked module

1. Navigate to the last lesson in Module 3 (unlocked module)
2. Scroll to the bottom of the lesson content
3. Add a Custom HTML block (or Code block, depending on Kajabi version)
4. Copy the approved upsell HTML from copy review document
5. Paste into the HTML block
6. Save the lesson

Content Location:

- GitHub Raw Link: https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR04/html/LMCR04-free-module-summary-upsell.html
- Copy-Paste Method:
  1. Open the GitHub raw link above
  2. Select all and copy
  3. Paste into Kajabi HTML block
- Alternative: Provided in Sally's approved copy review document

Verification:

- Two buttons appear at bottom of unlocked module
- Buttons link to correct offers (test links)
- Styling matches brand colors

---

## Phase 2: Offer Setup

### Step 2.1: Create Ghost Offer

Action: Create free offer that grants access

1. Navigate to Offers in Kajabi
2. Click Create New Offer
3. Configure offer:
   - Offer Name (Public): Free Module - 5-12 Month Schedules
   - Internal Name: LMCR04_OFR_Free-5-12M-Schedules
   - Price: Set to $0.00 or Free
   - Product: Select the Free Module product created in Phase 1
   - Visibility: Set to Hidden from Store (Ghost Offer)
   - Checkout: Enable Skip Cart (Direct Grant)
4. Save the offer

Reference: See LMCR04-OFFER-REFERENCE.md for exact codes

Offer URL: https://www.joinsnooze.com/offers/2x92uaLF

Verification:

- Offer appears in offers list
- Status shows as "Hidden"
- Price is $0.00

---

### Step 2.2: Configure Offer Automation

Action: Set up entry trigger for email campaign

1. Navigate to Automations in Kajabi
2. Click Create New Automation
3. Configure trigger:
   - Trigger: "Offer Purchased"
   - Select Offer: Choose the ghost offer created in Step 2.1
4. Add actions:
   - Action 1: "Apply Tag"
     - Tag name: TAG_LMCR04_5-12M_Schedules
   - Action 2: "Subscribe to Email Campaign"
     - Campaign: EMLM04
5. Save the automation

Verification:

- Automation appears in automations list
- Status is "Active"
- Both actions are configured

---

## Phase 3: Email Campaign Setup

### Step 3.1: Create Email Campaign

Action: Set up the 4-email nurture sequence

1. Navigate to Email Campaigns in Kajabi
2. Click Create New Campaign
3. Configure campaign:
   - Campaign Name (Internal): EMLM04 - 5-12M Schedules
   - Campaign Type: Automated Sequence
4. Save the campaign

Reference: See PRD Section 4.2 for campaign codes

Verification: Campaign appears in campaigns list

---

### Step 3.2: Upload Email Sequence

Action: Add all 4 emails to the campaign

For each email (Day 0, Day 2, Day 4, Day 6):

1. Click Add Email in the campaign
2. Configure email:
   - Email Name: Day [X] - [Description]
     - Day 0: Day 0 - Welcome & Access
     - Day 2: Day 2 - Bigger Picture
     - Day 4: Day 4 - Snooze Pivot
     - Day 6: Day 6 - Gentle Nudge
   - Subject Line: Copy from approved copy review document
   - Preview Text: Copy from approved copy review document
3. Add Content:
   - Switch to HTML or Source Code view
   - Copy the approved email HTML from copy review document
   - Paste into the email editor
4. Set Send Timing:
   - Day 0: Immediate (0 days)
   - Day 2: 2 days after Day 0
   - Day 4: 2 days after Day 2 (4 days total)
   - Day 6: 2 days after Day 4 (6 days total)
5. Save the email

Content Locations - GitHub Raw Links:

Day 0 - Welcome:
https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-0-welcome.html

Subject: Access granted: Your 5-12 Month Schedules Free Module

Preview: I've added the module to your library. Start here.

Day 2 - Bigger Picture:
https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-2-bigger-picture.html

Subject: How is the schedule going?

Preview: Once you fix the rhythm, you often realise everything is connected.

Day 4 - Snooze Pivot:
https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-4-snooze-pivot.html

Subject: Schedules change (and that's okay)

Preview: Sleep isn't a "one and done" thing. Things change.

Day 6 - Gentle Nudge:
https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-6-gentle-nudge.html

Subject: A path forward for your schedule

Preview: You can keep going on your own, or choose a path with more clarity.

Copy-Paste Method for Each Email:

1. Open the GitHub raw link above
2. Select all and copy (Cmd+A, Cmd+C)
3. Paste into Kajabi email editor (HTML/Source view)
4. Save

Verification:

- All 4 emails are in the campaign
- Send timing is correct
- Subject lines match approved copy

---

### Step 3.3: Configure Exit Rules

Action: Set up global unsubscribe triggers

1. In the email campaign, navigate to Settings or Automation Rules
2. Add Exit Condition:
   - Trigger: "Product Purchased"
   - Products:
     - Full course offer: LMCR04_OFR_5-12M-Course-Upsell
     - Snooze Membership offer
   - Action: "Unsubscribe from Campaign"
3. Save exit rules

Note: This may need to be configured at the automation level, not campaign level, depending on Kajabi version.

Verification:

- Exit rules are active
- Both course and membership purchases trigger unsubscribe

---

## Phase 4: Thank You Page Setup

### Step 4.1: Create Custom Thank You Page

Action: Set up the access/thank you page

1. Navigate to Pages → Custom Pages in Kajabi
2. Click Create New Page
3. Configure page:
   - Page Title: LMCR04_TY_Access
   - URL Slug: /thankyou/[unique-id]
     - CRITICAL: Must use /thankyou/ NOT /thank_you/
     - Example: /thankyou/lmcr04-access
4. Add Content:
   - Switch to HTML or Source Code view
   - Copy the approved thank you page HTML from copy review document
   - Paste into the page editor
5. Save the page

Content Location:

- GitHub Raw Link: https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR04/html/LMCR04-thank-you-access.html
- Copy-Paste Method:
  1. Open the GitHub raw link above
  2. Select all and copy
  3. Paste into Kajabi custom page (Source Code view)
- Alternative: Provided in Sally's approved copy review document

Verification:

- Page URL uses /thankyou/ slug
- Page displays correctly
- All links work

---

### Step 4.2: Link Thank You Page to Offer

Action: Connect thank you page to the ghost offer

1. Navigate to the ghost offer created in Phase 2
2. Open offer settings
3. Find Thank You Page or Redirect setting
4. Select the custom thank you page created in Step 4.1
5. Save the offer

Verification:

- Offer redirects to custom thank you page after purchase

---

## Phase 5: QA & Testing

### Step 5.1: Test Offer Flow

Action: Complete end-to-end test

1. Get Test Link:
   - Copy the ghost offer URL from offer settings
   - Format: https://www.joinsnooze.com/offers/2x92uaLF
2. Test Purchase:
   - Open offer link in incognito/private browser
   - Complete the free "purchase" (should be instant)
   - Verify redirect to thank you page
3. Verify Access:
   - Log into test account
   - Navigate to Library
   - Verify free module appears
   - Click into the module
4. Check Content:
   - Orientation lesson displays correctly
   - Unlocked module is accessible
   - Locked modules show paywall
   - Upsell CTA buttons appear at end of unlocked module
5. Test Email:
   - Check test email inbox
   - Verify Day 0 email arrives immediately
   - Check email formatting and links

Verification Checklist:

- [ ] Offer link works
- [ ] Thank you page displays correctly
- [ ] Free module appears in library
- [ ] Orientation lesson is visible
- [ ] Unlocked module is accessible
- [ ] Locked modules show paywall
- [ ] Upsell CTAs are visible and link correctly
- [ ] Day 0 email arrives
- [ ] Email formatting is correct
- [ ] All email links work

---

### Step 5.2: Mobile Testing

Action: Verify mobile experience

1. Open offer link on mobile device
2. Complete test purchase
3. Verify thank you page displays correctly on mobile
4. Access module from mobile library
5. Check email on mobile device

Verification:

- All pages are mobile-responsive
- Buttons are tappable
- Text is readable
- Links work on mobile

---

## Phase 6: Documentation & Handoff

### Step 6.1: Document URLs

Action: Record all created URLs

1. Create a document with:
   - Offer URL: https://www.joinsnooze.com/offers/[offer-id]
   - Thank You Page URL: https://www.joinsnooze.com/thankyou/[slug]
   - Product Access URL: https://www.joinsnooze.com/products/[product-slug]
2. Share with project lead

Verification: All URLs are documented and accessible

---

### Step 6.2: Mark Complete

Action: Update project status

1. Mark bundle as "Ready for Launch" in project tracker
2. Notify project lead that setup is complete
3. Provide QA test results

---

## Troubleshooting

### Common Issues

Issue: Content doesn't display correctly

Solution: Ensure HTML is pasted in Source Code view, not visual editor

Issue: Paywall doesn't appear

Solution: Verify locked lessons are set to Draft or future drip date

Issue: Email doesn't send

Solution: Check automation is active and campaign subscription is configured

Issue: Thank you page doesn't redirect

Solution: Verify page URL slug uses /thankyou/ not /thank_you/

---

## Support Resources

GitHub File Links: docs/LMCR04-GITHUB-LINKS.md - Direct links to all files (always up-to-date)

PRD Reference: docs/PRD_Course Free Module Conversion.md

Offer Codes: docs/LMCR04-OFFER-REFERENCE.md

Kajabi Help Center: https://help.kajabi.com

---

## GitHub Access Method

Best Practice: Use GitHub raw links for all content

- Files are always current (no downloads needed)
- Direct copy-paste into Kajabi
- Links are in docs/LMCR04-GITHUB-LINKS.md
- No GitHub account required (public repository)

How to Use in Kajabi:

1. Open the GitHub raw link (from LMCR04-GITHUB-LINKS.md or links above)
2. Browser will show raw file content (plain text/HTML)
3. Select all content (Cmd+A / Ctrl+A)
4. Copy (Cmd+C / Ctrl+C)
5. Switch to Kajabi (Source Code/HTML view)
6. Paste (Cmd+V / Ctrl+V)
7. Save

Important Notes:

- Kajabi cannot embed GitHub links directly - you must copy-paste
- GitHub raw links always show the latest version from main branch
- If content is updated in repo, links automatically reflect changes
- No need to re-download or update files

Example Workflow:

1. In Notion SOP, click GitHub raw link for orientation lesson
2. Browser opens raw HTML file
3. Copy all content
4. In Kajabi, open lesson → Source Code view
5. Paste content
6. Save lesson

Troubleshooting:

- If link doesn't work: Check file path in LMCR04-GITHUB-LINKS.md
- If content looks wrong: Verify you're on raw link (not GitHub UI view)
- If paste doesn't work: Ensure you're in Source Code/HTML view in Kajabi

---

SOP Version: 1.0

Last Updated: January 2026

Next Review: After first 3 bundles completed
