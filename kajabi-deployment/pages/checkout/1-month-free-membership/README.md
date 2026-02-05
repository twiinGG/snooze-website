# Snooze 1-Month Free Access

**Location:** `kajabi-deployment/pages/1-month-free-membership/`  
**Purpose:** Complete setup for 1-month free Snooze membership offer (granted to purchasers of other products)  
**Status:** Ready for Implementation

---

## Files in This Directory

### Checkout Page Files
- **`1-month-free-checkout-blocks.html`** - HTML content for checkout page (paste into Kajabi Code Block)
- **`1-month-free-checkout.css`** - CSS styling for checkout page (paste into Kajabi Custom CSS)
- **`1-month-free-checkout.js`** - JavaScript for checkout page (paste into Kajabi Custom JavaScript)

### Thank You Page
- **`1-month-free-thank-you-page.html`** - Thank you page HTML (if using purchase flow)

### Setup Documentation
- **`KAJABI-OFFER-SETUP.md`** - Complete setup instructions for Kajabi offer configuration
- **`README.md`** - This file (overview)

### Email Templates
- **`emails/welcome-email.html`** - Welcome email (send immediately when access is granted)
- **`emails/day-7-checkin-email.html`** - Check-in email (send 7 days after grant)
- **`emails/day-14-checkin-email.html`** - Mid-point check-in email (send 14 days after grant)
- **`emails/day-21-reminder-email.html`** - Final week reminder email (send 21 days after grant)
- **`emails/day-25-upgrade-cta-email.html`** - Final days upgrade CTA email (send 25 days after grant)
- **`emails/day-30-followup-email.html`** - Follow-up email (send 30 days after grant, if they didn't upgrade)

---

## Overview

This 1-month free access offer provides full access to the Snooze membership for 30 days. It's designed to be **granted** to purchasers of other products (courses, guides, consultations) as an incentive to experience full membership benefits. This is a promotional gift with no commitment - access expires after 30 days unless they choose to upgrade to a paid membership.

**Offer Information:**
- **Offer Title (Public):** Snooze Access - 1 Month Free
- **Internal Title:** `MBMS05_Snooze-Access-1Month-Free`
- **Internal Code:** MBMS05

**Key Features:**
- 30-day full access (1 month)
- No payment required (free promotional grant)
- No commitment (access expires, manual upgrade required)
- Full membership access during free month (same as paid members)
- Can be granted automatically via automation or manually

---

## Quick Setup Guide

1. **Read the Setup Guide:** Start with `KAJABI-OFFER-SETUP.md` for complete instructions
2. **Create Offer in Kajabi:** Create the offer with 30-day access restriction
3. **Set Up Automation:** Configure automation to grant access to purchasers (or grant manually)
4. **Set Up Checkout Page:** Use the checkout HTML, CSS, and JS files
5. **Set Up Thank You Page:** Use the thank you page HTML (if using purchase flow)
6. **Configure Email Automations:** Set up the 6 email automations with the provided templates

---

## Email Sequence

1. **Welcome Email** (Day 0 - Immediate)
   - Sent immediately when access is granted
   - Introduces free month and next steps
   - Links to Library, Village, and Coaching
   - Includes upgrade option

2. **Day 7 Check-In** (Day 7)
   - Sent 7 days after access is granted
   - Encourages exploration
   - Highlights key features they might have missed
   - Includes upgrade option

3. **Day 14 Mid-Point Check-In** (Day 14)
   - Sent 14 days after access is granted
   - Mid-point check-in
   - Reminds about remaining time
   - Includes upgrade option

4. **Day 21 Final Week Reminder** (Day 21)
   - Sent 21 days after access is granted
   - Reminds about final week
   - Explains what happens after access ends
   - Includes upgrade option

5. **Day 25 Final Days Upgrade CTA** (Day 25)
   - Sent 25 days after access is granted
   - Final push with upgrade CTA
   - Shows pricing options clearly
   - Urgency messaging (3 days left)

6. **Day 30 Follow-Up** (Day 30+)
   - Sent 30 days after access is granted
   - Only sends if they didn't upgrade
   - Offers special incentive to join
   - Asks for feedback

---

## Offer Configuration Summary

- **Access Duration:** 30 days (1 month)
- **Payment Required:** No (free promotional grant)
- **Auto-Conversion:** No (access expires, manual upgrade required)
- **Cancellation:** Not applicable (no payment to cancel)
- **Access Level:** Full membership access during free month
- **Products Included:** Same as core membership offer
- **Grant Method:** Automation (recommended) or Manual

---

## Design & Styling

**Color Scheme:**
- Primary: Coral (#F43357)
- Navy: #1F293B
- Cream/Beige backgrounds
- Standard Snooze brand colors

**Fonts:**
- Headings: Playfair Display
- Body: Poppins
- Add Google Fonts link to Kajabi Header Tracking Code

---

## Testing Checklist

Before going live, test:
- [ ] Offer is configured with 30-day access period
- [ ] Checkout page displays correctly
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

## Customization Notes

### In Day 30 Follow-Up Email

The day-30 follow-up email includes placeholders for a special offer:
- `[SPECIAL OFFER - e.g., $20 off your first payment, or extend your access, etc.]`
- `[MEMBERSHIP_CHECKOUT_URL]`

Update these before deploying:
1. Decide on your special offer for free month members who didn't upgrade
2. Replace the placeholder text with your actual offer
3. Replace the checkout URL with your membership checkout URL (with discount code if applicable)

---

## Usage Notes

- This offer is designed to be **granted** to purchasers, not purchased directly
- Use automation to grant access when someone purchases a course, guide, or consultation
- The email sequence guides them through the month with upgrade opportunities
- No commitment means they can simply let access expire if they don't want to continue
- Track conversion rates to measure effectiveness

---

## Support & Questions

If you have questions about setup or need help customizing any of the content, refer to:
- `KAJABI-OFFER-SETUP.md` for detailed setup instructions
- Existing membership checkout pages for styling reference
- Kajabi documentation for platform-specific questions

---

**Last Updated:** January 2026  
**Status:** ✅ Complete & Ready for Deployment
