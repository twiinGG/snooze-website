# Lead Magnet Free Module Setup - Standard Operating Procedure

**Purpose:** Generic deployment process for all lead magnet free modules in Kajabi  
**Role:** Kajabi Funnel Implementer (Execution, not strategy)  
**Time:** 45-60 minutes per bundle  
**Prerequisites:** Approved content bundle, GitHub links document, Kajabi admin access

---

## What This Role Is (And Isn't)

**You are:** A deployment specialist who takes approved content and builds it correctly in Kajabi.

**You are NOT:** A strategist, copywriter, designer, or marketer. Those inputs are provided.

**Your job:** Make this boring, reliable, and scalable. Build once, document, then replicate 11 more times.

---

## Pre-Flight: What You Need

Before starting any bundle, confirm you have:

- [ ] **Bundle code** (e.g., `LMCR08`) and variant name
- [ ] **GitHub links document** (`LMCR##-GITHUB-LINKS.md`) with all raw file links
- [ ] **Offer reference document** (`LMCR##-OFFER-REFERENCE.md`) with codes and URLs
- [ ] **Canon course name** (the source course to clone)
- [ ] **Unlocked module specification** (which module to unlock)
- [ ] **Test email address** for QA

**All content comes from GitHub raw links. No downloads needed. Copy-paste directly into Kajabi.**

---

## Phase 1: Product Setup (15 minutes)

### 1.1 Clone Canon Course

1. Navigate to **Products → Courses** in Kajabi
2. Find the canon course (provided in bundle spec)
3. Click **Duplicate** (three dots menu)
4. **Do NOT publish yet**

**Verification:** Duplicate appears in course list with "(Copy)" suffix

---

### 1.2 Update Product Details

1. Open the duplicated course → **Settings → Details**
2. **Product Title:** Copy from GitHub metadata file (raw link)
3. **Description:** Copy from GitHub metadata file
4. **Internal Name:** Set to `LMCR##_[Variant-Name]` (e.g., `LMCR08_3-4M-4HR-Feeds`)
5. **Save**

**Content Source:** `LMCR##-GITHUB-LINKS.md` → Product Metadata → Raw link

**Verification:** Title and description match approved copy

---

### 1.3 Replace Orientation Lesson

1. Navigate to **Content** tab
2. Open the **first visible lesson** (Module 1, Lesson 1)
3. Delete all existing content
4. Switch to **Source Code** view (HTML view)
5. Copy orientation lesson HTML from GitHub raw link
6. Paste into Kajabi
7. **Save**

**Content Source:** `LMCR##-GITHUB-LINKS.md` → Orientation Lesson → Raw link

**Verification:** Lesson displays correctly, no broken formatting

---

### 1.4 Unlock Target Module

1. Navigate to **Content** tab
2. Find the specified module to unlock (from bundle spec)
3. For each lesson in that module:
   - Set **Status** to **Published**
   - Set **Drip** to **Immediate** (or remove drip restriction)
4. **Save** each lesson

**Verification:** Target module is accessible, lessons are visible

---

### 1.5 Add Course Paywall

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

### 1.6 Add Wrap-Up Lesson with CTAs

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

**Content Source:** `LMCR##-GITHUB-LINKS.md` → Free Module Summary Upsell → Raw link

**Verification:** 
- Wrap-up lesson appears as last lesson in unlocked module
- Content displays correctly (wrap-up text + two CTA buttons)
- Both CTA buttons link to correct offers (test links)

---

## Phase 2: Offer & Automation (10 minutes)

### 2.1 Create Ghost Offer

1. Navigate to **Offers** in Kajabi
2. Click **Create New Offer**
3. Configure:
   - **Offer Name (Public):** `Free Module - [Variant Name]`
   - **Internal Name:** `LMCR##_OFR_Free-[Variant]`
   - **Price:** $0.00 (Free)
   - **Product:** Select the free module product from Phase 1
   - **Visibility:** Hidden from Store
   - **Checkout:** Skip Cart (Direct Grant)
4. **Save**

**Reference:** `LMCR##-OFFER-REFERENCE.md` for exact codes

**Verification:** Offer appears, status shows "Hidden", price is $0.00

---

### 2.2 Configure Offer Automation

1. Navigate to **Automations** in Kajabi
2. Click **Create New Automation**
3. **Trigger:** "Offer Purchased" → Select ghost offer from 2.1
4. **Actions:**
   - **Action 1:** "Send Email" → Select Day 0 post-purchase email (from Phase 3)
   - **Action 2:** "Apply Tag" → `TAG_LMCR##_[Variant]`
   - **Action 3:** "Subscribe to Email Campaign" → `EMLM##` (from bundle spec)
5. **Save**

**Note:** Day 0 email is sent immediately via automation. The email campaign (Day 2, 4, 6) starts after Day 0.

**Verification:** Automation is active, all three actions configured

---

## Phase 3: Email Campaign (15 minutes)

### 3.1 Create Email Campaign

1. Navigate to **Email Campaigns** in Kajabi
2. Click **Create New Campaign**
3. **Campaign Name:** `EMLM## - [Variant Name]`
4. **Campaign Type:** Automated Sequence
5. **Save**

**Verification:** Campaign appears in campaigns list

---

### 3.2 Create Day 0 Post-Purchase Email

**Note:** Day 0 email is sent immediately via the offer purchase automation (Phase 2.2), not through the campaign sequence.

1. Navigate to **Emails** in Kajabi (or create as standalone email)
2. Click **Create New Email**
3. **Email Name:** `Day 0 - Welcome & Access`
4. **Subject Line:** Copy from GitHub email file
5. **Preview Text:** Copy from GitHub email file
6. Switch to **HTML/Source Code** view
7. Copy Day 0 email HTML from GitHub raw link
8. Paste into email editor
9. **Save** email
10. **Note the email ID/name** - you'll reference this in Phase 2.2 automation

**Content Source:** `LMCR##-GITHUB-LINKS.md` → Email Sequence → Day 0 Welcome → Raw link

**Verification:** Day 0 email created, ready to be used in offer automation

---

### 3.3 Upload Email Campaign Sequence

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

**Content Source:** `LMCR##-GITHUB-LINKS.md` → Email Sequence → Raw links for Day 2, 4, 6

**Verification:** All 3 emails in campaign, timing correct, subject lines match

---

### 3.4 Configure Exit Rules

1. In email campaign, navigate to **Settings** or **Automation Rules**
2. Add **Exit Condition:**
   - **Trigger:** "Product Purchased"
   - **Products:** Full course offer + Snooze Membership
   - **Action:** "Unsubscribe from Campaign"
3. **Save**

**Note:** May need to configure at automation level depending on Kajabi version

**Verification:** Exit rules active, both purchases trigger unsubscribe

---

## Phase 4: Thank You Page (5 minutes)

### 4.1 Create Custom Thank You Page

1. Navigate to **Pages → Custom Pages** in Kajabi
2. Click **Create New Page**
3. **Page Title:** `LMCR##_TY_Access`
4. **URL Slug:** `/thankyou/[unique-id]` (**CRITICAL:** Use `/thankyou/` NOT `/thank_you/`)
5. Switch to **HTML/Source Code** view
6. Copy thank you page HTML from GitHub raw link
7. Paste into page editor
8. **Save**

**Content Source:** `LMCR##-GITHUB-LINKS.md` → Thank You Page → Raw link

**Verification:** Page URL uses `/thankyou/` slug, displays correctly

---

### 4.2 Link Thank You Page to Offer

1. Open ghost offer from Phase 2
2. Find **Thank You Page** or **Redirect** setting
3. Select custom thank you page from 4.1
4. **Save**

**Verification:** Offer redirects to custom thank you page after purchase

---

## Phase 5: QA & Testing (10 minutes)

### 5.1 End-to-End Test

1. **Get Test Link:** Copy ghost offer URL from offer settings
2. **Test Purchase:**
   - Open offer link in incognito browser
   - Complete free "purchase"
   - Verify redirect to thank you page
3. **Verify Access:**
   - Log into test account
   - Navigate to **Library**
   - Free module appears
   - Click into module
4. **Check Content:**
   - Orientation lesson displays correctly
   - Unlocked module is accessible
   - Wrap-up lesson appears at end of unlocked module
   - Wrap-up lesson CTAs are visible and link correctly
   - Paywall appears after unlocked module
   - Clicking locked content triggers paywall modal
5. **Test Email:**
   - Check test email inbox
   - Day 0 email arrives immediately
   - Verify formatting and links

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
- [ ] Email formatting correct
- [ ] All email links work

---

### 5.2 Mobile Testing

1. Open offer link on mobile device
2. Complete test purchase
3. Verify thank you page on mobile
4. Access module from mobile library
5. Check email on mobile device

**Verification:** All pages mobile-responsive, buttons tappable, text readable

---

## Phase 6: Documentation (5 minutes)

### 6.1 Document URLs

Create a document with:
- **Offer URL:** `https://www.joinsnooze.com/offers/[offer-id]`
- **Thank You Page URL:** `https://www.joinsnooze.com/thankyou/[slug]`
- **Product Access URL:** `https://www.joinsnooze.com/products/[product-slug]`

Share with project lead.

---

### 6.2 Mark Complete

1. Mark bundle as "Ready for Launch" in project tracker
2. Notify project lead that setup is complete
3. Provide QA test results

---

## Troubleshooting

**Content doesn't display correctly:**
- Ensure HTML is pasted in Source Code view, not visual editor

**Paywall doesn't appear:**
- Verify paywall toggle is ON in course Settings
- Check that paywall indicator is positioned correctly in content outline
- Ensure offer is selected in paywall settings

**Email doesn't send:**
- Check automation is active and campaign subscription is configured

**Thank you page doesn't redirect:**
- Verify page URL slug uses `/thankyou/` not `/thank_you/`

---

## Success Criteria

A successful deployment means:

**Front End:**
- Clear opt-in page (already designed, just deployed)
- Correct form behavior
- Proper tagging/segmentation
- Clean thank-you experience

**Inside Kajabi:**
- Correctly duplicated course shell
- Correct module unlocked
- Paywall logic accurate
- Clear upgrade path to full course and membership

**Automations:**
- Day 0 immediate delivery email (sent via offer purchase automation)
- 3-email nurture sequence (Day 2, 4, 6) via campaign
- Logic stops promo if they convert
- Segments future messaging
- No broken loops or dead ends

**Hygiene & Scale:**
- Naming conventions make sense
- Offers, tags, emails, automations clearly labeled
- Another team member could understand without asking
- Funnel can be duplicated 11 more times without re-thinking

---

## Support Resources

- **GitHub File Links:** `LMCR##-GITHUB-LINKS.md` - Direct links to all files (always up-to-date)
- **Offer Reference:** `LMCR##-OFFER-REFERENCE.md` - Codes and URLs
- **PRD Reference:** `PRD_Course Free Module Conversion.md` - Full system architecture
- **Kajabi Help Center:** https://help.kajabi.com

---

**SOP Version:** 2.1  
**Last Updated:** January 2026  
**Changes in 2.1:**
- Step 1.5: Updated to use Kajabi paywall feature (not drip/lock method)
- Step 1.6: Changed to create wrap-up lesson (not CTA block)
- Phase 2.2: Day 0 email sent via automation (not campaign)
- Phase 3: Separated Day 0 email from campaign sequence (campaign has 3 emails: Day 2, 4, 6)
**Next Review:** After first 3 bundles completed
