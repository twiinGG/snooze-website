# Snooze Village Day Pass - Automation Setup

**Date:** December 2025  
**Purpose:** Automation workflows for the Snooze Village Day Pass offer  
**Location:** `docs/SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md`

---

## Overview

This document outlines all automations needed for the Day Pass offer, including triggers, conditions, and actions.

---

## Automation 1: Welcome Email (Post-Purchase)

**Purpose:** Send welcome email immediately after day pass is claimed

### Setup in Kajabi

**Trigger:**
- **Event:** Offer purchased
- **Offer:** Snooze Village Day Pass
- **Delay:** 0 minutes (send immediately)

**Conditions:**
- User has purchased "Snooze Village Day Pass"
- User has not received this email before

**Actions:**
1. Send email: "Welcome to Your Snooze Village Day Pass! 🌟"
   - Use template from `SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
   - Personalize with `[First Name]`

**Kajabi Path:**
```
Automations → New Automation
→ Trigger: Offer Purchased
→ Select: Snooze Village Day Pass
→ Action: Send Email
→ Select: Welcome Email Template
```

---

## Automation 2: Mid-Pass Reminder (12 Hours)

**Purpose:** Remind user of remaining time and encourage engagement

### Setup in Kajabi

**Trigger:**
- **Event:** Time-based delay
- **Delay:** 12 hours after offer purchase
- **Offer:** Snooze Village Day Pass

**Conditions:**
- User has purchased "Snooze Village Day Pass"
- User still has active access (not expired)
- User has not upgraded to full membership

**Actions:**
1. Send email: "Halfway Through Your Day Pass - Don't Miss Out! ⏰"
   - Use template from `SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
   - Include upgrade CTA

**Kajabi Path:**
```
Automations → New Automation
→ Trigger: Time Delay
→ Delay: 12 hours after offer purchase
→ Condition: User has active day pass access
→ Action: Send Email
→ Select: Mid-Pass Reminder Template
```

---

## Automation 3: Conversion Email (23 Hours)

**Purpose:** Last chance to convert before access expires

### Setup in Kajabi

**Trigger:**
- **Event:** Time-based delay
- **Delay:** 23 hours after offer purchase
- **Offer:** Snooze Village Day Pass

**Conditions:**
- User has purchased "Snooze Village Day Pass"
- User still has active access (not expired)
- User has not upgraded to full membership

**Actions:**
1. Send email: "Last Hour: Upgrade to Keep Your Snooze Access ⏰"
   - Use template from `SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
   - Include strong upgrade CTA with link to membership checkout

**Kajabi Path:**
```
Automations → New Automation
→ Trigger: Time Delay
→ Delay: 23 hours after offer purchase
→ Condition: User has active day pass access AND has not upgraded
→ Action: Send Email
→ Select: Conversion Email Template
```

---

## Automation 4: Post-Expiration Follow-Up (24+ Hours)

**Purpose:** Re-engage users who didn't convert

### Setup in Kajabi

**Trigger:**
- **Event:** Time-based delay
- **Delay:** 24 hours after offer purchase
- **Offer:** Snooze Village Day Pass

**Conditions:**
- User has purchased "Snooze Village Day Pass"
- User's day pass access has expired
- User has not upgraded to full membership

**Actions:**
1. Send email: "We Miss You - Come Back to Snooze Village 💙"
   - Use template from `SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
   - Include upgrade CTA

**Kajabi Path:**
```
Automations → New Automation
→ Trigger: Time Delay
→ Delay: 24 hours after offer purchase
→ Condition: User's day pass access has expired AND has not upgraded
→ Action: Send Email
→ Select: Post-Expiration Follow-Up Template
```

---

## Automation 5: Conversion Success (Upgrade Detected)

**Purpose:** Welcome users who upgrade to full membership

### Setup in Kajabi

**Trigger:**
- **Event:** Offer purchased
- **Offer:** Snooze Membership (full membership)
- **Condition:** User previously had day pass

**Conditions:**
- User has purchased "Snooze Membership"
- User previously purchased "Snooze Village Day Pass"
- User has not received this email before

**Actions:**
1. Send email: "Welcome to Snooze - You're Now a Full Member! 🎉"
   - Use template from `SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
   - Include links to Library, Village, and courses

**Kajabi Path:**
```
Automations → New Automation
→ Trigger: Offer Purchased
→ Select: Snooze Membership
→ Condition: User previously purchased "Snooze Village Day Pass"
→ Action: Send Email
→ Select: Conversion Success Template
```

---

## Automation 6: Tag Management (Optional)

**Purpose:** Tag users for segmentation and tracking

### Setup in Kajabi

**Trigger:**
- **Event:** Offer purchased
- **Offer:** Snooze Village Day Pass

**Actions:**
1. Add tag: "Day Pass User"
2. Add tag: "Day Pass - [Date]" (for tracking)

**When User Upgrades:**
1. Remove tag: "Day Pass User"
2. Add tag: "Day Pass Converted"
3. Add tag: "Snooze Member"

**Kajabi Path:**
```
Automations → New Automation
→ Trigger: Offer Purchased
→ Select: Snooze Village Day Pass
→ Action: Add Tag
→ Tag Name: "Day Pass User"
```

---

## Automation Timeline Summary

```
Hour 0:  Welcome Email (immediate)
Hour 12: Mid-Pass Reminder
Hour 23: Conversion Email (last chance)
Hour 24: Post-Expiration Follow-Up
Anytime: Conversion Success (if upgraded)
```

---

## Testing Checklist

- [ ] Test welcome email sends immediately after purchase
- [ ] Verify 12-hour reminder sends at correct time
- [ ] Verify 23-hour conversion email sends at correct time
- [ ] Verify 24-hour follow-up sends after expiration
- [ ] Test conversion success email when user upgrades
- [ ] Verify tags are applied correctly
- [ ] Test that emails don't send if user has already upgraded
- [ ] Verify all email links work correctly
- [ ] Check email personalization (first name, etc.)
- [ ] Test on multiple email clients (Gmail, Outlook, etc.)

---

## Automation Best Practices

### Timing
- **Welcome Email:** Send immediately (0 delay)
- **Reminder:** Send at 12 hours (midway point)
- **Conversion:** Send at 23 hours (1 hour before expiration)
- **Follow-Up:** Send at 24+ hours (after expiration)

### Conditions
- Always check if user has already upgraded
- Don't send emails if user no longer has access
- Use tags to track user journey

### Personalization
- Always use `[First Name]` in emails
- Reference specific actions if possible (e.g., "You've viewed X posts")
- Make CTAs clear and prominent

### Segmentation
- Tag users for easy segmentation
- Track conversion rates
- Monitor engagement during day pass period

---

## Analytics & Tracking

### Metrics to Track
- **Day Pass Claims:** Number of day passes claimed
- **Welcome Email Open Rate:** % of users who open welcome email
- **12-Hour Engagement:** % of users who engage after reminder
- **Conversion Rate:** % of day pass users who upgrade
- **Time to Conversion:** Average time from day pass to upgrade
- **Email Performance:** Open rates, click rates for each email

### Kajabi Analytics
- Use Kajabi's built-in analytics to track:
  - Offer purchases
  - Email opens and clicks
  - User engagement in Village
  - Conversion rates

### Custom Tracking
- Tag users for segmentation
- Track user journey through tags
- Monitor which emails drive conversions

---

## Troubleshooting

### Common Issues

**Emails not sending:**
- Check trigger conditions
- Verify offer is set up correctly
- Check user's email preferences

**Wrong timing:**
- Verify delay settings
- Check timezone settings
- Test with shorter delays first

**Users receiving duplicate emails:**
- Add condition to prevent duplicate sends
- Check if user already received email
- Use tags to track email sends

**Conversion email not sending:**
- Verify user hasn't already upgraded
- Check trigger conditions
- Ensure offer IDs are correct

---

## Related Documentation

- **Setup Guide:** `SNOOZE-VILLAGE-DAY-PASS-SETUP.md`
- **Email Templates:** `SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
- **Checkout Page:** `kajabi-deployment/pages/day-pass-offer/checkout-page.html`

---

**Last Updated:** December 2025  
**Status:** Ready for Implementation

