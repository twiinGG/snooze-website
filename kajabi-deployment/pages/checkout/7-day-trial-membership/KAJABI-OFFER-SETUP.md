# 7-Day Full Access Trial - Kajabi Offer Setup

**Date:** January 2026  
**Purpose:** Complete setup instructions for the 7-day full access trial offer  
**Status:** Ready for Implementation

---

## Overview

This offer provides a 7-day full access trial of the Snooze membership. After duplicating the core membership offer, configure it as a trial that automatically converts to a paid membership after 7 days.

---

## Step 1: Duplicate the Core Membership Offer

1. Go to **Kajabi → Sales → Offers**
2. Find your **core Snooze membership offer** (the standard BAU membership offer)
3. Click the **three dots (⋯)** next to the offer name
4. Select **"Duplicate"**
5. Rename the duplicated offer to: **"Snooze 7-Day Full Access Trial"**

---

## Step 2: Configure Offer Settings

### Basic Information

**In Kajabi Offer Settings:**
- **Title field (Public):** `Snooze Access - 7 Day Trial`  
  - This is the public-facing title that may appear on the site
- **Internal Title field (optional):** `MBMS04_Snooze-Access-Trial-7day`  
  - This is the team-readable internal identifier with code
- **Internal Code:** `MBMS04`  
  - Used in registry and tracking

**Description:** 
```
7-day full access trial of Snooze membership. Get access to all courses, guides, community, and coaching for 7 days. Trial automatically converts to paid membership after 7 days, or cancel anytime with no charges.
```

---

## Step 3: Configure Pricing & Billing

### Pricing Options

You have two options for how the trial converts:

**Option A: Single Pricing Option (Recommended)**
- **Quarterly Option:**
  - Price: $197 USD per 3 months
  - Billing Cycle: Quarterly
  - First Payment Date: 7 days after trial start (automatic conversion)
  - Recurring: Yes (every 3 months)

- **Annual Option:**
  - Price: $657 USD per year
  - Billing Cycle: Annual
  - First Payment Date: 7 days after trial start (automatic conversion)
  - Recurring: Yes (every year)

**Option B: Default to Quarterly**
- Set only quarterly pricing option
- Annual option can be offered as an upgrade later

---

## Step 4: Configure Trial Period

### Access Restrictions

1. Go to the **"Access"** or **"Product Access"** section of the offer
2. **Enable:** "Restrict access to a specific amount of days"
3. **Set Days:** `7 days`
4. **Access Start:** Immediate (when they sign up)
5. **After Trial Ends:** Automatically convert to paid membership

### Trial Conversion Settings

1. Enable **"Auto-convert to paid subscription"** after trial period
2. Set conversion date to **7 days after trial start**
3. Ensure billing begins automatically after trial ends

---

## Step 5: Product Access Settings

### Products Included

- **Snooze Membership Product** (the core membership product that grants access to Library, Village, Coaching, etc.)
- Ensure all the same products are included as the core membership offer

### Access Level

- Full access to all membership benefits during trial
- Same access level as paid members (courses, guides, community, coaching)

---

## Step 6: Checkout Page Setup

1. Go to **Offer Settings → Checkout Page**
2. Select **"Custom Checkout Page"** or **"Use Custom HTML"**
3. Create a new Website Page in Kajabi:
   - Go to **Website → Pages**
   - Click **"New Page"**
   - Name: "7-Day Trial Checkout"
   - Page Type: Custom HTML or Code Block
4. Paste the checkout code:
   - HTML: Copy from `7-day-trial-checkout-blocks.html`
   - CSS: Copy from `7-day-trial-checkout.css` (paste into Custom CSS field)
   - JS: Copy from `7-day-trial-checkout.js` (paste into Custom JavaScript field)
5. Add Google Fonts to Header Tracking Code:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```
6. Link the page to your offer's checkout settings

---

## Step 7: Thank You Page Setup

1. Go to **Offer Settings → Thank You Page**
2. Select **"Custom Thank You Page"** or **"Redirect to URL"**
3. Create a new Website Page in Kajabi:
   - Go to **Website → Pages**
   - Click **"New Page"**
   - Name: "7-Day Trial Thank You"
   - Page Type: Custom HTML or Code Block
4. Paste the HTML from `7-day-trial-thank-you-page.html`
5. Link the page to your offer's thank you page settings

---

## Step 8: Account Creation Settings

### Account Creation

- **Skip account creation page:** Off (leave enabled so they create an account)
- **Require email verification:** Recommended (On)
- **Account setup:** Allow them to set up their account during checkout

---

## Step 9: Post-Purchase Email Setup

**IMPORTANT:** For this trial, we use a simplified automation approach:

### Automation: Purchase & Send Welcome Email

**When offer is purchased:**
1. **Tag:** Add tag `snooze-trial` (or `7-day-trial-started`)
2. **Send:** Post-Purchase email (welcome email from `emails/welcome-email.html`)
3. **Subscribe:** Subscribe to email campaign sequence (Day 2-3, 4-5, 8+ emails)

**Setup in Kajabi:**
1. Go to **Marketing → Automations**
2. Create automation: "7 Day Trial - Purchase & Welcome"
3. **Trigger:** Purchase "Snooze 7-Day Full Access Trial" offer
4. **Actions:**
   - Add tag `snooze-trial`
   - Send email: Use content from `emails/welcome-email.html`
   - Subscribe to email campaign: "7 Day Trial Email Sequence"

### Email Campaign Sequence Setup

Create an email campaign in Kajabi Marketing → Email Campaigns:

**Campaign Name:** "7 Day Trial Email Sequence"

**Emails in Sequence:**
1. **Day 2-3 Check-In** - Use content from `emails/day-2-3-checkin-email.html`
   - Subject: "How's your trial going?"
   - Preview Text: "You're a couple of days in - here are a few places to start that many parents find helpful."
   - Delay: 2 days after welcome email

2. **Day 4-5 Check-In** - Use content from `emails/day-4-5-checkin-email.html`
   - Subject: "3 days left in your trial"
   - Preview Text: "Your trial ends in 3 days - here's what happens next and how to continue."
   - Delay: 4 days after welcome email

3. **Day 8 Follow-Up** - Use content from `emails/trial-ended-followup-email.html`
   - Subject: "Your trial ended - special offer for you"
   - Preview Text: "Because you tried Snooze, here's a special offer to continue your sleep journey."
   - Delay: 8 days after welcome email (after trial ended)
   - Condition: Does NOT have tag `trial-converted-to-member`

**Exclusion Rules for Campaign:**
- Has tag `trial-converted-to-member` (exclude from all emails after conversion)

---

## Step 10: Tags & Tracking

### Create Tags in Kajabi

1. Go to **Marketing → People → Tags**
2. Create the following tags:
   - `7-day-trial-started`
   - `trial-day-2-checkin-sent`
   - `trial-day-4-checkin-sent`
   - `trial-converted-to-member`
   - `trial-ended-no-purchase`

### Tag Setup in Automations

- **Welcome Email Automation:** Add tag `7-day-trial-started`
- **Day 2-3 Check-In:** Add tag `trial-day-2-checkin-sent`
- **Day 4-5 Check-In:** Add tag `trial-day-4-checkin-sent`
- **Purchase Detection (if they convert):** Add tag `trial-converted-to-member`
- **Trial Ended Follow-Up:** Add tag `trial-ended-no-purchase`

---

## Step 11: Conversion Detection

### Set Up Conversion Detection

1. Go to **Marketing → Automations**
2. Create automation: **"Trial Conversion Detection"**
3. **Trigger:** Purchase "Snooze Membership" (the core paid membership offer)
4. **Condition:** Has tag `7-day-trial-started`
5. **Action:** Add tag `trial-converted-to-member`
6. **Action:** Remove tag `trial-ended-no-purchase` (if they convert, don't send the trial-ended email)

---

## Step 12: Testing Checklist

Before going live, test the complete flow:

- [ ] Offer is configured with 7-day trial period
- [ ] Checkout page displays correctly
- [ ] Trial signup works (no payment required)
- [ ] Thank you page displays after signup
- [ ] Welcome email sends immediately
- [ ] User has full access to membership content
- [ ] Day 2-3 check-in email sends after 2 days
- [ ] Day 4-5 check-in email sends after 4 days
- [ ] Trial converts to paid membership after 7 days (test with short trial period first)
- [ ] Trial-ended follow-up email only sends if they didn't convert
- [ ] Tags are applied correctly
- [ ] Cancellation works (if they cancel during trial, no charge)

---

## Step 13: Offer URL

After setup, your offer will have a URL like:
```
https://joinsnooze.com/offers/[OFFER-ID]/checkout
```

Replace `[OFFER-ID]` with your actual Kajabi offer ID.

---

## Key Settings Summary

- **Trial Duration:** 7 days
- **Payment Required:** No (free trial, converts to paid)
- **Auto-Conversion:** Yes (after 7 days)
- **Cancellation:** Anytime during trial (no charges)
- **Access Level:** Full membership access during trial
- **Products Included:** Same as core membership offer

---

## Notes

- This trial offer should be separate from the core membership offer
- Users can only use the trial once (Kajabi will prevent duplicate purchases of the same offer)
- Consider adding a note in the offer description about one trial per customer
- Monitor conversion rates and adjust email timing/content as needed

---

**Last Updated:** January 2026  
**Status:** Ready for Implementation
