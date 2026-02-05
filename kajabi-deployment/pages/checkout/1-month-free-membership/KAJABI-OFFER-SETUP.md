# 1-Month Free Snooze Access - Kajabi Offer Setup

**Date:** January 2026  
**Purpose:** Complete setup instructions for the 1-month free Snooze membership offer (granted to purchasers of other products)  
**Status:** Ready for Implementation

---

## Overview

This offer provides a 1-month free access to Snooze membership that can be granted to purchasers of other products (courses, guides, consultations, etc.) as an incentive to experience full membership benefits. This is a promotional gift with no commitment - access expires after 30 days unless they choose to upgrade to a paid membership.

---

## Step 1: Create the Offer in Kajabi

1. Go to **Kajabi → Sales → Offers**
2. Click **"New Offer"**
3. Name the offer: **"Snooze Access - 1 Month Free"**

---

## Step 2: Configure Offer Settings

### Basic Information

**In Kajabi Offer Settings:**
- **Title field (Public):** `Snooze Access - 1 Month Free`  
  - This is the public-facing title that may appear on the site
- **Internal Title field (optional):** `MBMS05_Snooze-Access-1Month-Free`  
  - This is the team-readable internal identifier with code
- **Internal Code:** `MBMS05`  
  - Used in registry and tracking

**Description:**
```
1-month free access to Snooze membership. Granted to purchasers of other products as a way to experience full membership benefits. No commitment required. Access expires after 30 days unless upgraded to paid membership.
```

---

## Step 3: Configure Pricing & Billing

### Pricing Options

**Important:** This is a FREE offer with no payment required. However, you should set up pricing options for when users want to upgrade:

**Upgrade Options (for email CTAs):**
- **Quarterly Option:**
  - Price: $197 USD per 3 months
  - Billing Cycle: Quarterly
  - Recurring: Yes (every 3 months)

- **Annual Option:**
  - Price: $657 USD per year
  - Billing Cycle: Annual
  - Recurring: Yes (every year)

**Note:** Users won't be charged during the free month. These pricing options are for upgrade CTAs in emails and on the access page.

---

## Step 4: Configure Access Period

### Access Restrictions

1. Go to the **"Access"** or **"Product Access"** section of the offer
2. **Enable:** "Restrict access to a specific amount of days"
3. **Set Days:** `30 days` (1 month)
4. **Access Start:** Immediate (when granted)
5. **After Access Ends:** Access expires (no automatic conversion)

### Important Settings

- **Do NOT enable auto-conversion** - This is a free gift, not a trial
- **Access expires after 30 days** - Users must manually upgrade if they want to continue
- **No payment required** - This is a promotional grant

---

## Step 5: Product Access Settings

### Products Included

- **Snooze Membership Product** (the core membership product that grants access to Library, Village, Coaching, etc.)
- Ensure all the same products are included as the core membership offer

### Access Level

- Full access to all membership benefits during the free month
- Same access level as paid members (courses, guides, community, coaching)

---

## Step 6: Checkout Page Setup

1. Go to **Offer Settings → Checkout Page**
2. Select **"Custom Checkout Page"** or **"Use Custom HTML"**
3. Create a new Website Page in Kajabi:
   - Go to **Website → Pages**
   - Click **"New Page"**
   - Name: "1 Month Free Access Checkout"
   - Page Type: Custom HTML or Code Block
4. Paste the checkout code:
   - HTML: Copy from `1-month-free-checkout-blocks.html`
   - CSS: Copy from `1-month-free-checkout.css` (paste into Custom CSS field)
   - JS: Copy from `1-month-free-checkout.js` (paste into Custom JavaScript field)
5. Add Google Fonts to Header Tracking Code:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```
6. Link the page to your offer's checkout settings

**Note:** This offer is typically granted manually, not purchased. The checkout page is for reference or if you want to allow direct signup. When access is granted manually, the offer grant email will kick off the automation flow.

---

## Step 7: Post-Purchase/Thank You Page Setup

If users are granted access through a purchase flow:

1. Go to **Offer Settings → Thank You Page**
2. Select **"Custom Thank You Page"** or **"Redirect to URL"**
3. Create a new Website Page in Kajabi:
   - Go to **Website → Pages**
   - Click **"New Page"**
   - Name: "1 Month Free Access - Thank You"
   - Page Type: Custom HTML or Code Block
4. Paste the HTML from `1-month-free-thank-you-page.html`
5. Link the page to your offer's thank you page settings

---

## Step 8: Granting Access to Purchasers

### Method 1: Automation (Recommended)

1. Go to **Marketing → Automations**
2. Create automation: "Grant 1 Month Free Access to Product Purchasers"
3. **Trigger:** Purchase any product (or specific products you choose)
4. **Condition:** Does NOT already have Snooze membership
5. **Action:** Grant access to "Snooze Access - 1 Month Free" offer
6. **Action:** Add tag `1-month-free-granted`
7. **Action:** Add tag `1-month-free-day-0` (for email sequencing)

### Method 2: Manual Grant

1. Go to **People → [Select Person]**
2. Click **"Grant Access"**
3. Select **"Snooze Access - 1 Month Free"** offer
4. Access starts immediately and expires in 30 days

---

## Step 9: Post-Grant Email Setup

**IMPORTANT:** For this offer, we use a simplified automation approach:

### Automation: Grant Access & Send Welcome Email

**When offer is granted:**
1. **Tag:** Add tag `snooze-trial` (or `1-month-free-granted`)
2. **Send:** Post-Purchase email (welcome email from `emails/welcome-email.html`)
3. **Subscribe:** Subscribe to email campaign sequence (Day 7, 14, 21, 25, 30+ emails)

**Setup in Kajabi:**
1. Go to **Marketing → Automations**
2. Create automation: "1 Month Free - Grant Access & Welcome"
3. **Trigger:** Access granted to "Snooze Access - 1 Month Free" offer
4. **Actions:**
   - Add tag `snooze-trial`
   - Send email: Use content from `emails/welcome-email.html`
   - Subscribe to email campaign: "1 Month Free Email Sequence"

### Email Campaign Sequence Setup

Create an email campaign in Kajabi Marketing → Email Campaigns:

**Campaign Name:** "1 Month Free Email Sequence"

**Emails in Sequence:**
1. **Day 7 Check-In** - Use content from `emails/day-7-checkin-email.html`
   - Subject: "How's your free month going?"
   - Preview Text: "You're a week into your free month - here are some places to start."
   - Delay: 7 days after welcome email

2. **Day 14 Check-In** - Use content from `emails/day-14-checkin-email.html`
   - Subject: "Halfway through your free month"
   - Preview Text: "You're halfway through your free month - here's what you might not have discovered yet."
   - Delay: 14 days after welcome email

3. **Day 21 Reminder** - Use content from `emails/day-21-reminder-email.html`
   - Subject: "One week left in your free month"
   - Preview Text: "Your free month ends in 7 days - here's what happens next."
   - Delay: 21 days after welcome email

4. **Day 25 Upgrade CTA** - Use content from `emails/day-25-upgrade-cta-email.html`
   - Subject: "Your free month ends in 3 days"
   - Preview Text: "Upgrade now to continue your access seamlessly - choose quarterly or annual."
   - Delay: 25 days after welcome email

5. **Day 30 Follow-Up** - Use content from `emails/day-30-followup-email.html`
   - Subject: "Your free month ended - special offer for you"
   - Preview Text: "Because you explored Snooze, here's a special offer to continue your sleep journey."
   - Delay: 30 days after welcome email
   - Condition: Does NOT have tag `upgraded-to-member`

**Exclusion Rules for Campaign:**
- Has tag `upgraded-to-member` (exclude from all emails after upgrade)

---

## Step 10: Upgrade Detection

### Set Up Conversion Detection

1. Go to **Marketing → Automations**
2. Create automation: **"1 Month Free - Upgrade Detection"**
3. **Trigger:** Purchase "Snooze Access" (core membership offer) OR Purchase "Snooze Access - BAU" (MBMS03)
4. **Condition:** Has tag `1-month-free-granted`
5. **Action:** Add tag `upgraded-to-member`
6. **Action:** Remove tag `1-month-free-ended-no-upgrade` (if they upgrade, don't send the ended email)
7. **Action:** Remove all `1-month-free-day-*` tags (cleanup)

---

## Step 11: Tags & Tracking

### Create Tags in Kajabi

1. Go to **Marketing → People → Tags**
2. Create the following tags:
   - `1-month-free-granted`
   - `1-month-free-day-0`
   - `1-month-free-day-7`
   - `1-month-free-day-14`
   - `1-month-free-day-21`
   - `1-month-free-day-25`
   - `1-month-free-email-0-sent`
   - `1-month-free-email-7-sent`
   - `1-month-free-email-14-sent`
   - `1-month-free-email-21-sent`
   - `1-month-free-email-25-sent`
   - `upgraded-to-member`
   - `1-month-free-ended-no-upgrade`

---

## Step 12: Testing Checklist

Before going live, test the complete flow:

- [ ] Offer is configured with 30-day access period
- [ ] Access page displays correctly
- [ ] Thank you page displays (if using purchase flow)
- [ ] Access can be granted manually
- [ ] Automation grants access correctly (if using automation)
- [ ] Welcome email sends immediately when access is granted
- [ ] Day 7 check-in email sends after 7 days
- [ ] Day 14 check-in email sends after 14 days
- [ ] Day 21 reminder email sends after 21 days
- [ ] Day 25 upgrade CTA email sends after 25 days
- [ ] Day 30 follow-up only sends if they didn't upgrade
- [ ] Upgrade detection works (tags applied correctly)
- [ ] Access expires after 30 days (test with shorter period first)
- [ ] Tags are applied correctly throughout the sequence

---

## Step 13: Offer URL

After setup, your offer will have a URL like:
```
https://joinsnooze.com/offers/[OFFER-ID]/checkout
```

Replace `[OFFER-ID]` with your actual Kajabi offer ID.

**Note:** This offer is typically granted automatically, not accessed via checkout URL. The URL is mainly for tracking/reference.

---

## Key Settings Summary

- **Access Duration:** 30 days (1 month)
- **Payment Required:** No (free promotional grant)
- **Auto-Conversion:** No (access expires, manual upgrade required)
- **Cancellation:** Not applicable (no payment to cancel)
- **Access Level:** Full membership access during free month
- **Products Included:** Same as core membership offer

---

## Usage Notes

- This offer is designed to be **granted** to purchasers, not purchased directly
- Use automation to grant access when someone purchases a course, guide, or consultation
- The email sequence guides them through the month with upgrade opportunities
- No commitment means they can simply let access expire if they don't want to continue
- Track conversion rates to measure effectiveness

---

**Last Updated:** January 2026  
**Status:** Ready for Implementation
