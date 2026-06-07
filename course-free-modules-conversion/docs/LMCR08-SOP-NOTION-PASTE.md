# LMCR08 - 3-4 Month Feed or Resettle Free Module Setup

**Purpose:** Step-by-step guide for Virtual Assistant to set up Free Module lead magnets in Kajabi  
**Format:** Notion TSC Library Compatible  
**Prerequisites:** Access to Kajabi admin, approved copy/content from Sally

> **CRITICAL UPDATE (February 2026):** This module unlocks **Module 9: Overnight Feeds and Resettling** (NOT Module 5: Schedules and Routines). The content focuses specifically on the hunger vs habit decision and feed timing intervals.

---

## Pre-Flight Checklist

**Before starting, confirm you have:**

- [ ] Approved copy review document from Sally (see Copy Review Workflow)
- [ ] GitHub file links document (see `LMCR08-GITHUB-LINKS.md`)
- [ ] Access to GitHub raw file links (for copy-paste)
- [ ] Offer codes and URLs reference document
- [ ] Access to the canon course to clone from
- [ ] Test email address for QA

**Quick Access:**

- All files are available via GitHub raw links (always up-to-date)
- See `docs/LMCR08-GITHUB-LINKS.md` for direct links to all files
- No need to download files - copy directly from GitHub

---

## Phase 1: Product Setup

### Step 1.1: Clone Canon Course

**Action:** Duplicate the source course in Kajabi

1. Navigate to **Products → Courses** in Kajabi
2. Find the canon course: **3-4 Month Baby Sleep Course**
3. Click **Duplicate** (three dots menu)
4. **IMPORTANT:** Do NOT publish yet

**Canon Course Reference:**

**Bundle Code:** LMCR08

**Canon Course Name:** 3-4 Month Baby Sleep Course

**Location in Kajabi:** Products → Courses

**Verification:** Duplicate appears in course list with "(Copy)" suffix

---

### Step 1.2: Update Product Details

**Action:** Set product title and description from approved copy

1. Open the duplicated course
2. Click **Settings** (gear icon)
3. Navigate to **Details** section
4. **Update Product Title:**
   - Copy from approved copy review document
   - **Title:** 3-4 Month Feed or Resettle (Free Module)
   - Paste into **Title** field
5. **Update Product Description:**
   - Copy from approved copy review document
   - **Description:** Your baby is waking constantly overnight, and you can not tell if they are hungry or just looking for comfort. This module, taken directly from our complete 3-4 Month Baby Sleep Course, teaches you how to distinguish hunger from habit and when to feed versus resettle. You will learn the 3-hour rule at 3 months and 4-hour rule at 4 months, plus practical strategies like the pre-bed feed technique and dreamfeeds. When you know what each wake means, you can respond with confidence.
   - Paste into **Description** field
6. **Update Internal Name** (if visible):
   - Set to: `LMCR08_3-4M-Feed-Resettle`
7. **Save** changes

**Content Location:**

- **GitHub Raw Link:** https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/LMCR08-product-metadata.md
- **Copy-Paste Method:**
  1. Open the GitHub raw link
  2. Copy title and description separately
  3. Paste into Kajabi product settings
- **Alternative:** Provided in Sally's approved copy review document

**Verification:**

- Product title matches approved copy
- Description matches approved copy
- Both are saved correctly

---

### Step 1.3: Replace Orientation Lesson

**Action:** Replace default welcome content with custom orientation lesson

1. Navigate to **Content** tab in the course
2. Find the **first visible lesson** (usually Module 1, Lesson 1)
3. Open the lesson editor
4. **Delete** all existing content
5. **Copy** the approved orientation lesson HTML from the copy review document
6. Switch to **Source Code** view (or HTML block)
7. **Paste** the HTML content
8. **Save** the lesson

**Content Location:**

- **GitHub Raw Link:** https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/html/LMCR08-module-1-lesson-1-4hr-feeds.html
- **Copy-Paste Method:**
  1. Open the GitHub raw link above
  2. Select all (Cmd+A / Ctrl+A)
  3. Copy (Cmd+C / Ctrl+C)
  4. Paste into Kajabi Source Code view
- **Alternative:** Provided in Sally's approved copy review document

**Verification:**

- Orientation lesson displays correctly
- No broken formatting
- All text is readable

---

### Step 1.4: Update Orientation Lesson 2

**Action:** Replace second lesson with custom content

1. Navigate to **Content** tab in the course
2. Find the **second lesson** (usually Module 1, Lesson 2)
3. Open the lesson editor
4. **Delete** all existing content
5. **Copy** the approved orientation lesson 2 HTML
6. Switch to **Source Code** view
7. **Paste** the HTML content
8. **Save** the lesson

**Content Location:**

- **GitHub Raw Link:** https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/html/LMCR08-module-1-lesson-2-4hr-feeds.html
- **Copy-Paste Method:**
  1. Open the GitHub raw link above
  2. Select all and copy
  3. Paste into Kajabi Source Code view

**Verification:**

- Lesson 2 displays correctly
- Content matches approved copy

---

### Step 1.5: Unlock Target Module

**Action:** Make the specific module accessible (unlock content)

1. Navigate to **Content** tab
2. Find the module: **Transitioning to 4hr Feeds** (from bundle spec)
3. For each lesson in that module:
   - Click the lesson
   - Set **Status** to **Published**
   - Set **Drip** to **Immediate** (or remove drip restriction)
4. **Save** each lesson

**Unlocked Content for LMCR08:**

**Bundle Code:** LMCR08

**Unlocked Module:** Transitioning to 4hr Feeds

**Specific Lessons:** All lessons in this module

**Verification:**

- Target module lessons are visible and accessible
- Can click through and view content

---

### Step 1.6: Add Course Paywall

**Action:** Add paywall after unlocked module using Kajabi's paywall feature

1. Navigate to **Settings** in the course
2. **Toggle ON** "Add a paywall to this course"
3. **Choose the Offer** to display when members hit paywalled content:
   - Select the upsell offer (full course or membership - from bundle spec)
   - This is the offer that appears in the paywall modal
4. **Save** settings
5. Navigate to **Content** tab
6. **Position the paywall:**
   - Hover over the paywall indicator (appears after the unlocked module by default)
   - Drag and drop it to the desired location (should be after the last lesson of the unlocked module)
   - The paywall separates free content from locked content

**Reference:** [Kajabi Paywall Help Article](https://help.kajabi.com/en/articles/12695132-how-to-create-a-course-paywall)

**Verification:**

- Paywall toggle is ON in settings
- Paywall indicator appears in content outline after unlocked module
- Clicking content below paywall triggers paywall modal with correct offer

---

### Step 1.7: Add Wrap-Up Lesson with CTAs

**Action:** Create new lesson at end of unlocked module with wrap-up content and CTAs

1. Navigate to **Content** tab
2. In the unlocked module, click **Add Lesson** (or **+ New Lesson**)
3. **Lesson Title:** "What's Next" or "Complete Your Sleep Plan" (from bundle spec)
4. Open the new lesson editor
5. Switch to **Source Code** view (HTML view)
6. Copy wrap-up lesson HTML from GitHub raw link
7. Paste into lesson editor
8. Set lesson **Status** to **Published**
9. Set **Drip** to **Immediate**
10. **Save** lesson
11. **Position lesson:** Ensure it appears as the last lesson in the unlocked module (before the paywall)

**Content Location:**

- **GitHub Raw Link:** https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/html/LMCR08-free-module-summary-upsell.html
- **Copy-Paste Method:**
  1. Open the GitHub raw link above
  2. Select all and copy
  3. Paste into Kajabi HTML block
- **Alternative:** Provided in Sally's approved copy review document

**Verification:**

- Wrap-up lesson appears as last lesson in unlocked module
- Content displays correctly (wrap-up text + two CTA buttons)
- Both CTA buttons link to correct offers (test links)

---

## Phase 2: Offer & Automation

### Step 2.1: Create Ghost Offer

**Action:** Create free offer that grants access

1. Navigate to **Offers** in Kajabi
2. Click **Create New Offer**
3. Configure offer:
   - **Offer Name (Public):** `Free Module - 3-4 Month 4hr Feeds`
   - **Internal Name:** `LMCR08_OFR_Free-3-4M-4HR-Feeds`
   - **Price:** Set to **$0.00** or **Free**
   - **Product:** Select the Free Module product created in Phase 1
   - **Visibility:** Set to **Hidden from Store** (Ghost Offer)
   - **Checkout:** Enable **Skip Cart** (Direct Grant)
4. **Save** the offer

**Reference:** See `LMCR08-OFFER-REFERENCE.md` for exact codes

**Offer URL:** [TBD - To be created in Kajabi]

**Verification:**

- Offer appears in offers list
- Status shows as "Hidden"
- Price is $0.00

---

### Step 2.2: Configure Offer Automation

**Action:** Set up entry trigger for email campaign and Day 0 email

1. Navigate to **Automations** in Kajabi
2. Click **Create New Automation**
3. Configure trigger:
   - **Trigger:** "Offer Purchased"
   - **Select Offer:** Choose the ghost offer created in Step 2.1
4. Add actions:
   - **Action 1:** "Send Email" → Select Day 0 post-purchase email (from Phase 3)
   - **Action 2:** "Apply Tag"
     - Tag name: `TAG_LMCR08_3-4M-4HR-Feeds`
   - **Action 3:** "Subscribe to Email Campaign"
     - Campaign: `EMLM08` (see email campaign setup)
5. **Save** the automation

**Note:** Day 0 email is sent immediately via automation. The email campaign (Day 2, 4, 6) starts after Day 0.

**Verification:**

- Automation is active, all three actions configured
- Day 0 email will be sent immediately on offer purchase

---

## Phase 3: Email Campaign Setup

### Step 3.1: Create Day 0 Post-Purchase Email

**Action:** Create standalone email sent immediately via automation

**Note:** Day 0 email is sent immediately via the offer purchase automation (Phase 2.2), not through the campaign sequence.

1. Navigate to **Emails** in Kajabi (or create as standalone email)
2. Click **Create New Email**
3. **Email Name:** `Day 0 - Welcome & Access`
4. **Subject Line:** Your 4-hour feed rhythm starts here 🍼
5. **Preview Text:** No more 24/7 milk buffet.
6. Switch to **HTML/Source Code** view
7. Copy Day 0 email HTML from GitHub raw link
8. Paste into email editor
9. **Save** email
10. **Note the email ID/name** - you'll reference this in Phase 2.2 automation

**Content Location:**

- **GitHub Raw Link:** https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/emails/LMCR08-day-0-welcome.html
- **Copy-Paste Method:**
  1. Open the GitHub raw link above
  2. Select all and copy
  3. Paste into Kajabi email editor (HTML/Source view)
- **File Reference:** `LMCR08-day-0-welcome.html`

**Verification:** Day 0 email created, ready to be used in offer automation

---

### Step 3.2: Create Email Campaign

**Action:** Set up the 3-email nurture sequence

1. Navigate to **Email Campaigns** in Kajabi
2. Click **Create New Campaign**
3. Configure campaign:
   - **Campaign Name (Internal):** `EMLM08 - 3-4M 4hr Feeds`
   - **Campaign Type:** Automated Sequence
4. **Save** the campaign

**Reference:** See PRD Section 4.2 for campaign codes

**Verification:** Campaign appears in campaigns list

---

### Step 3.3: Upload Email Campaign Sequence

**Action:** Add 3 emails to the campaign (Day 2, Day 4, Day 6)

**Note:** The campaign contains 3 emails (Day 2, Day 4, Day 6). Day 0 is sent separately via automation.

For each email (Day 2, Day 4, Day 6):

1. Click **Add Email** in campaign
2. **Email Name:** `Day [X] - [Description]`
3. **Subject Line:** Copy from GitHub email file
4. **Preview Text:** Copy from GitHub email file
5. Switch to **HTML/Source Code** view
6. Copy email HTML from GitHub raw link
7. Paste into email editor
8. **Set Send Timing:**
   - Day 2: 2 days after campaign subscription (2 days after Day 0)
   - Day 4: 2 days after Day 2 (4 days after Day 0)
   - Day 6: 2 days after Day 4 (6 days after Day 0)
9. **Save**

**Content Locations - GitHub Raw Links:**

**Day 2 - Bigger Picture:**
https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/emails/LMCR08-day-2-bigger-picture.html

**Subject:** Feed spacing is working... but there's more

**Preview:** Why the 4-month mark is such a turning point.

**Day 4 - Snooze Pivot:**
https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/emails/LMCR08-day-4-snooze-pivot.html

**Subject:** You've fixed the feeds. Now what?

**Preview:** Band-aid or complete transformation?

**Day 6 - Gentle Nudge:**
https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/emails/LMCR08-day-6-gentle-nudge.html

**Subject:** Quick feed check-in 💙

**Preview:** How's the 4-hour rhythm going?

**Copy-Paste Method for Each Email:**

1. Open the GitHub raw link above
2. Select all and copy (Cmd+A, Cmd+C)
3. Paste into Kajabi email editor (HTML/Source view)
4. Save

**Verification:**

- All 3 emails are in the campaign
- Send timing is correct
- Subject lines match approved copy

---

### Step 3.4: Configure Exit Rules

**Action:** Set up global unsubscribe triggers

1. In the email campaign, navigate to **Settings** or **Automation Rules**
2. Add **Exit Condition:**
   - **Trigger:** "Product Purchased"
   - **Products:**
     - Full course offer: `LMCR08_OFR_3-4M-Course-Upsell`
     - Snooze Membership offer
   - **Action:** "Unsubscribe from Campaign"
3. **Save** exit rules

**Note:** This may need to be configured at the automation level, not campaign level, depending on Kajabi version.

**Verification:**

- Exit rules are active
- Both course and membership purchases trigger unsubscribe

---

## Phase 4: Thank You Page Setup

### Step 4.1: Create Custom Thank You Page

**Action:** Set up the access/thank you page

1. Navigate to **Pages → Custom Pages** in Kajabi
2. Click **Create New Page**
3. Configure page:
   - **Page Title:** `LMCR08_TY_Access`
   - **URL Slug:** `/thankyou/[unique-id]`
     - **CRITICAL:** Must use `/thankyou/` NOT `/thank_you/`
     - Example: `/thankyou/lmcr08-access`
4. **Add Content:**
   - Switch to **HTML** or **Source Code** view
   - **Copy** the approved thank you page HTML from copy review document
   - **Paste** into the page editor
5. **Save** the page

**Content Location:**

- **GitHub Raw Link:** https://raw.githubusercontent.com/twiinGG/Snooze-OS/main/snooze-product/projects/course-free-modules-conversion/src/content/bundles/LMCR08/html/LMCR08-thank-you-access.html
- **Copy-Paste Method:**
  1. Open the GitHub raw link above
  2. Select all and copy
  3. Paste into Kajabi custom page (Source Code view)
- **Alternative:** Provided in Sally's approved copy review document

**Verification:**

- Page URL uses `/thankyou/` slug
- Page displays correctly
- All links work

---

### Step 4.2: Link Thank You Page to Offer

**Action:** Connect thank you page to the ghost offer

1. Navigate to the ghost offer created in Phase 2
2. Open offer settings
3. Find **Thank You Page** or **Redirect** setting
4. Select the custom thank you page created in Step 4.1
5. **Save** the offer

**Verification:**

- Offer redirects to custom thank you page after purchase

---

## Phase 5: QA & Testing

### Step 5.1: Test Offer Flow

**Action:** Complete end-to-end test

1. **Get Test Link:**
   - Copy the ghost offer URL from offer settings
   - Format: `https://www.joinsnooze.com/offers/[offer-id]`
2. **Test Purchase:**
   - Open offer link in incognito/private browser
   - Complete the free "purchase" (should be instant)
   - Verify redirect to thank you page
3. **Verify Access:**
   - Log into test account
   - Navigate to **Library**
   - Verify free module appears
   - Click into the module
4. **Check Content:**
   - Orientation lesson displays correctly
   - Unlocked module is accessible
   - Wrap-up lesson appears at end of unlocked module
   - Wrap-up lesson CTAs are visible and link correctly
   - Paywall appears after unlocked module
   - Clicking locked content triggers paywall modal
5. **Test Email:**
   - Check test email inbox
   - Verify Day 0 email arrives immediately
   - Check email formatting and links

**Verification Checklist:**

- [ ] Offer link works
- [ ] Thank you page displays correctly
- [ ] Free module appears in library
- [ ] Orientation lesson visible
- [ ] Unlocked module accessible
- [ ] Wrap-up lesson appears at end of unlocked module
- [ ] Wrap-up lesson CTAs visible and link correctly
- [ ] Paywall appears after unlocked module
- [ ] Clicking locked content triggers paywall modal
- [ ] Day 0 email arrives
- [ ] Email formatting is correct
- [ ] All email links work

---

### Step 5.2: Mobile Testing

**Action:** Verify mobile experience

1. Open offer link on mobile device
2. Complete test purchase
3. Verify thank you page displays correctly on mobile
4. Access module from mobile library
5. Check email on mobile device

**Verification:**

- All pages are mobile-responsive
- Buttons are tappable
- Text is readable
- Links work on mobile

---

## Phase 6: Documentation & Handoff

### Step 6.1: Document URLs

**Action:** Record all created URLs

1. Create a document with:
   - **Offer URL:** `https://www.joinsnooze.com/offers/[offer-id]`
   - **Thank You Page URL:** `https://www.joinsnooze.com/thankyou/[slug]`
   - **Product Access URL:** `https://www.joinsnooze.com/products/[product-slug]`
2. Share with project lead

**Verification:** All URLs are documented and accessible

---

### Step 6.2: Mark Complete

**Action:** Update project status

1. Mark bundle as "Ready for Launch" in project tracker
2. Notify project lead that setup is complete
3. Provide QA test results

---

## Troubleshooting

### Common Issues

**Issue:** Content doesn't display correctly

**Solution:** Ensure HTML is pasted in Source Code view, not visual editor

**Issue:** Paywall doesn't appear

**Solution:** 
- Verify paywall toggle is ON in course Settings
- Check that paywall indicator is positioned correctly in content outline
- Ensure offer is selected in paywall settings

**Issue:** Email doesn't send

**Solution:** Check automation is active and campaign subscription is configured

**Issue:** Thank you page doesn't redirect

**Solution:** Verify page URL slug uses `/thankyou/` not `/thank_you/`

---

## Support Resources

- **GitHub File Links:** `docs/LMCR08-GITHUB-LINKS.md` - Direct links to all files (always up-to-date)
- **PRD Reference:** `docs/PRD_Course Free Module Conversion.md`
- **Offer Codes:** `docs/LMCR08-OFFER-REFERENCE.md`
- **Kajabi Help Center:** https://help.kajabi.com
- **Kajabi Paywall Help:** https://help.kajabi.com/en/articles/12695132-how-to-create-a-course-paywall

---

## GitHub Access Method

**Best Practice:** Use GitHub raw links for all content

- Files are always current (no downloads needed)
- Direct copy-paste into Kajabi
- Links are in `docs/LMCR08-GITHUB-LINKS.md`
- No GitHub account required (public repository)

**How to Use in Kajabi:**

1. Open the GitHub raw link (from `LMCR08-GITHUB-LINKS.md` or links above)
2. Browser will show raw file content (plain text/HTML)
3. Select all content (Cmd+A / Ctrl+A)
4. Copy (Cmd+C / Ctrl+C)
5. Switch to Kajabi (Source Code/HTML view)
6. Paste (Cmd+V / Ctrl+V)
7. Save

**Important Notes:**

- **Kajabi cannot embed GitHub links directly** - you must copy-paste
- GitHub raw links always show the latest version from `main` branch
- If content is updated in repo, links automatically reflect changes
- No need to re-download or update files

**Example Workflow:**

1. In Notion SOP, click GitHub raw link for orientation lesson
2. Browser opens raw HTML file
3. Copy all content
4. In Kajabi, open lesson → Source Code view
5. Paste content
6. Save lesson

**Troubleshooting:**

- If link doesn't work: Check file path in `LMCR08-GITHUB-LINKS.md`
- If content looks wrong: Verify you're on raw link (not GitHub UI view)
- If paste doesn't work: Ensure you're in Source Code/HTML view in Kajabi

---

**SOP Version:** 2.1  
**Last Updated:** January 2026  
**Next Review:** After first 3 bundles completed
