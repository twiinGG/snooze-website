# Snooze Village Day Pass - Setup Guide

**Date:** December 2025  
**Purpose:** Guide for setting up the Snooze Village Day Pass offer in Kajabi

---

## Offer Details for Kajabi

### Title
**Snooze Village Day Pass**

### Description (for Offer Details field)

```
✨ Experience the Support of Snooze Village - Free for One Day! ✨

Get a taste of what makes Snooze special with a free day pass to our vibrant community. This is your chance to experience the support, connection, and expert guidance that thousands of parents rely on.

**What's Included:**
• Join live sessions with the Snooze Specialists
• Connect with other parents in Snooze Village
• Get expert-moderated support from certified sleep consultants
• 24 hours of full Village access (community & live sessions)

**What's NOT Included:**
This day pass gives you access to Snooze Village (community and live sessions) but does not include courses or resources from the Library. Want full access? Upgrade to a Snooze Membership!

**Perfect For:**
• Parents considering joining Snooze
• Anyone curious about the community experience
• Parents who want to join a live session before committing
• Those who want to feel the support of the Village

No credit card required. Instant access. Start your 24-hour pass whenever you're ready.
```

### Internal Title (Optional)
**Day Pass - Village Access Only**

---

## Product Access Settings

### Product Included
- **Snooze Members** (product that grants Village access)

### Access Restrictions

**Recommended Settings:**
1. ✅ **Restrict access to a specific amount of days:** Enable
   - **Days:** 1 day

2. ❌ **Begin access at a specific date:** Leave unchecked (unless you want all passes to start on a specific date)

---

## Post-Purchase Settings

### Post-Purchase Destination
**Member's Product Library** (recommended)

### Account Creation
- **Skip account creation page:** Off (leave enabled so they create an account)

---

## Post-Purchase Email

**See:** `docs/SNOOZE-VILLAGE-DAY-PASS-EMAILS.md` for complete email templates

**Quick Reference:**
- **Welcome Email:** Send immediately after purchase
- **12-Hour Reminder:** Mid-pass engagement email
- **23-Hour Conversion:** Last chance to upgrade
- **24-Hour Follow-Up:** Post-expiration re-engagement
- **Conversion Success:** Welcome for users who upgrade

All email templates, subject lines, and body copy are documented in the email templates file.

---

## Pricing Settings

### Offer Pricing
**Free** (no payment required)

### Pricing Display
- Price: Free
- Duration: 1 day
- Access: Limited (Village only, no courses/Library)

---

## Offer Status

**Recommended:** Start with **Draft** until everything is tested, then switch to **Published** when ready.

---

## Checkout Page Setup

### Using the Custom Checkout Page

1. **Upload the HTML file:**
   - Go to Kajabi → Settings → Site Details → Custom Code
   - OR create a new page and paste the HTML code

2. **Update the checkout URL:**
   - Open `kajabi-deployment/pages/day-pass-offer/checkout-page.html`
   - Find the JavaScript section at the bottom (around line 315)
   - Replace `[YOUR_OFFER_ID]` with your actual Kajabi offer ID
   - The URL should look like: `https://joinsnooze.com/offers/[YOUR_OFFER_ID]/checkout`

3. **Option 1: Use as Checkout Page (if Kajabi allows)**
   - If Kajabi supports custom checkout pages, upload this HTML
   - Or use Kajabi's checkout page builder and style it similarly

4. **Option 2: Use as Landing Page**
   - Create a standalone landing page
   - Link the CTA button to the actual checkout URL
   - This gives you more control over the experience

---

## Testing Checklist

- [ ] Verify offer is set to Free
- [ ] Confirm 1-day access restriction is enabled
- [ ] Test the checkout flow (should be instant, no payment)
- [ ] Verify access to Snooze Village works
- [ ] Confirm courses/Library are NOT accessible
- [ ] Test the 24-hour expiration
- [ ] Check post-purchase email is sent
- [ ] Verify post-purchase redirect works
- [ ] Test on mobile devices
- [ ] Check checkout page displays correctly

---

## Marketing Messaging Ideas

### Email Subject Lines
- "Your Free Pass to Snooze Village Awaits ✨"
- "Experience Snooze Village - On Us!"
- "24 Hours in Snooze Village - No Credit Card Required"

### Social Media Copy
```
✨ Free Day Pass to Snooze Village! ✨

Want to see what all the fuss is about? Get a free 24-hour pass to experience:
• Live sessions with the Snooze Specialists
• Supportive parent community
• Expert guidance when you need it

No credit card. No commitment. Just a taste of the Snooze experience.

[Link to checkout]
```

---

## Next Steps After Setup

1. **Set up automations:**
   - See `docs/SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md` for complete automation setup
   - Includes: welcome email, 12-hour reminder, 23-hour conversion, post-expiration follow-up

2. **Configure email templates:**
   - See `docs/SNOOZE-VILLAGE-DAY-PASS-EMAILS.md` for all email templates
   - Copy templates into Kajabi email builder
   - Personalize with user's first name

3. **Track conversions:**
   - Monitor how many day pass users convert to full members
   - Use Kajabi analytics to see engagement during the day pass period
   - Tag users for segmentation and tracking

4. **Optimize:**
   - A/B test different messaging
   - Gather feedback from day pass users
   - Refine the experience based on data

---

## Notes

- This day pass is designed to be a low-friction way for prospects to experience Snooze Village
- The "fun" checkout page helps create excitement and reduces friction
- No payment means instant access, which improves user experience
- 24-hour access gives enough time to join a live session and explore the community
- Excluding courses/Library creates a clear upgrade path to full membership

---

## Related Documentation

- **Email Templates:** `docs/SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
- **Automations:** `docs/SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md`
- **Checkout Page:** `kajabi-deployment/pages/day-pass-offer/checkout-page.html`
- **Checkout Page README:** `kajabi-deployment/pages/day-pass-offer/README.md`

---

**Last Updated:** December 2025  
**Status:** Ready for Implementation

