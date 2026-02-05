# Snooze 7-Day Full Access Trial

**Location:** `kajabi-deployment/pages/7-day-trial-membership/`  
**Purpose:** Complete setup for 7-day full access trial offer of Snooze membership  
**Status:** Ready for Implementation

---

## Files in This Directory

### Checkout Page Files
- **`7-day-trial-checkout-blocks.html`** - HTML content for checkout page (paste into Kajabi Code Block)
- **`7-day-trial-checkout.css`** - CSS styling for checkout page (paste into Kajabi Custom CSS)
- **`7-day-trial-checkout.js`** - JavaScript for checkout page (paste into Kajabi Custom JavaScript)

### Thank You Page
- **`7-day-trial-thank-you-page.html`** - Complete thank you page HTML (paste into Kajabi page)

### Setup Documentation
- **`KAJABI-OFFER-SETUP.md`** - Complete setup instructions for Kajabi offer configuration
- **`README.md`** - This file (overview)

### Email Templates
- **`emails/welcome-email.html`** - Welcome email (send immediately after trial signup)
- **`emails/day-2-3-checkin-email.html`** - Check-in email (send 2 days after signup)
- **`emails/day-4-5-checkin-email.html`** - Check-in email (send 4 days after signup)
- **`emails/trial-ended-followup-email.html`** - Follow-up email (send 8 days after signup, if they didn't convert)

---

## Overview

This 7-day trial offer provides full access to the Snooze membership for 7 days. After the trial period, it automatically converts to a paid membership, or users can cancel anytime during the trial with no charges.

**Offer Information:**
- **Offer Title (Public):** Snooze Access - 7 Day Trial
- **Internal Title:** `MBMS04_Snooze-Access-Trial-7day`
- **Internal Code:** MBMS04

**Key Features:**
- 7-day full access trial
- No payment required to start
- Automatic conversion to paid membership after 7 days
- Cancel anytime during trial (no charges)
- Full membership access during trial (same as paid members)

---

## Quick Setup Guide

1. **Read the Setup Guide:** Start with `KAJABI-OFFER-SETUP.md` for complete instructions
2. **Duplicate Core Offer:** Duplicate your existing core membership offer in Kajabi
3. **Configure Trial Settings:** Set 7-day trial period and auto-conversion
4. **Set Up Checkout Page:** Use the checkout HTML, CSS, and JS files
5. **Set Up Thank You Page:** Use the thank you page HTML
6. **Configure Email Automations:** Set up the 4 email automations with the provided templates

---

## Offer Configuration Summary

- **Trial Duration:** 7 days
- **Payment Required:** No (free trial, converts to paid)
- **Auto-Conversion:** Yes (after 7 days)
- **Cancellation:** Anytime during trial (no charges)
- **Access Level:** Full membership access during trial
- **Products Included:** Same as core membership offer

---

## Email Sequence

1. **Welcome Email** (Day 0 - Immediate)
   - Sent immediately after trial signup
   - Introduces trial and next steps
   - Links to Library, Village, and Coaching

2. **Day 2-3 Check-In** (Day 2)
   - Sent 2 days after signup
   - Encourages exploration
   - Highlights key features they might have missed

3. **Day 4-5 Check-In** (Day 4)
   - Sent 4 days after signup
   - Reminds about trial ending soon
   - Explains conversion process
   - Reassures about cancellation option

4. **Trial Ended Follow-Up** (Day 8+)
   - Sent 8 days after signup (after trial ended)
   - Only sends if they didn't convert to paid membership
   - Offers special incentive to join
   - Asks for feedback

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
- [ ] Trial signup works (no payment required)
- [ ] Checkout page displays correctly
- [ ] Thank you page displays after signup
- [ ] Welcome email sends immediately
- [ ] User has full access to membership content
- [ ] Day 2-3 check-in email sends after 2 days
- [ ] Day 4-5 check-in email sends after 4 days
- [ ] Trial converts to paid membership after 7 days
- [ ] Trial-ended follow-up only sends if they didn't convert
- [ ] Cancellation works (if they cancel during trial, no charge)

---

## Customization Notes

### In Trial Ended Follow-Up Email

The trial-ended follow-up email includes a placeholder for a special offer:
- `[SPECIAL OFFER - e.g., $20 off your first month, or extend your trial, etc.]`
- `[MEMBERSHIP_CHECKOUT_URL]`

Update these before deploying:
1. Decide on your special offer for trial members who didn't convert
2. Replace the placeholder text with your actual offer
3. Replace the checkout URL with your membership checkout URL (with discount code if applicable)

---

## Support & Questions

If you have questions about setup or need help customizing any of the content, refer to:
- `KAJABI-OFFER-SETUP.md` for detailed setup instructions
- Existing membership checkout pages for styling reference
- Kajabi documentation for platform-specific questions

---

**Last Updated:** January 2026  
**Status:** ✅ Complete & Ready for Deployment
