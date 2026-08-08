# The Snooze Membership - 7 Day Trial (USD + AUD)

**Location:** `kajabi-deployment/pages/checkout/7-day-trial-membership/`
**Purpose:** Complete setup for the 7-day full access trial of The Snooze Membership, in both currencies
**Status:** Live (USD + AUD offers published)

---

## Dual-currency offer pair

| Currency | Code | Offer ID | Checkout slug | Checkout URL |
|----------|------|----------|---------------|--------------|
| USD | PUBMS02_USD | `2150887297` | `mqQikDM7` | https://www.joinsnooze.com/offers/mqQikDM7/checkout |
| AUD | PUBMS02_AUD | `2151254578` | `Sr6KzShx` | https://www.joinsnooze.com/offers/Sr6KzShx/checkout |

Each currency is a separate Kajabi offer with its own checkout. Currency switching
is by cross-link (Kajabi checkout prices are server-rendered per offer and cannot
toggle); see `KAJABI-OFFER-SETUP.md` → Currency.

## Files in This Directory

```
7-day-trial-membership/
  shared/
    checkout.css      Self-contained transactional checkout and selected-state styles. Identical for both currencies.
    checkout.js       Disclosure, pricing-option analytics and attribution preservation. Identical for both currencies.
  usd/
    checkout-blocks.html   USD checkout HTML (PUBMS02_USD), links to AUD.
  aud/
    checkout-blocks.html   AUD checkout HTML (PUBMS02_AUD), links to USD.
  thank-you-page.html      Post-purchase page (currency-neutral; set on both offers).
  emails/                  Trial email sequence (currency-neutral).
  KAJABI-OFFER-SETUP.md    Full Kajabi configuration + currency + operator tasks.
  README.md                This file.
```

> Kajabi checkout CSS/JS is **per-offer**, not site-wide. For each offer, paste its
> own `<currency>/checkout-blocks.html` as the HTML, and the SAME `shared/checkout.css`
> + `shared/checkout.js` into that offer's Custom CSS / JS. See `KAJABI-OFFER-SETUP.md` Step 6.

### Email Templates
- **`emails/welcome-email.html`** - Welcome email (send immediately after trial signup)
- **`emails/day-2-3-checkin-email.html`** - Check-in email (send 2 days after signup)
- **`emails/day-4-5-checkin-email.html`** - Check-in email (send 4 days after signup)
- **`emails/trial-ended-followup-email.html`** - Follow-up email (send 8 days after signup, if they didn't convert)

---

## Overview

This 7-day trial offer provides full access to the Snooze membership for 7 days. After the trial period, it automatically converts to a paid membership, or users can cancel anytime during the trial with no charges.

**Offer Information:**
- **Offer Title (Public):** The Snooze Membership - 7 Day Trial
- **Internal Title:** `PUBMS02_USD_7-Day-Trial`
- **Internal Code:** PUBMS02_USD

**Key Features:**
- 7-day full access trial
- Card on file at signup; $0 charged for the first 7 days (card-upfront model)
- Selected plan bills on day 8 unless cancelled
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
- **Payment Required:** Card on file at signup; $0 charged for the first 7 days
- **Auto-Conversion:** Yes (selected plan bills on day 8)
- **Cancellation:** Anytime during trial (no charges)
- **Access Level:** Full membership access during trial
- **Products Included:** Same as core membership offer

## Browser measurement

- The checkout script emits one `begin_checkout` per render.
- A native plan change emits one `pricing_option_selected` with the canonical
  offer, variant, plan, cadence, amount and currency.
- The reciprocal currency link keeps existing destination parameters and adds
  inbound `utm_*`, `fbclid` and `gclid` values only when they are absent.
- The script sends no email, name, phone or address to the dataLayer.
- Confirmed order classification lives in
  `global/js/kajabi-checkout-tracking.js`, not this per-offer script.

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
   - Subject line: 3 days left in your trial
   - Preview text: Your trial ends in 3 days. Here's what happens next and how to continue.
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
- [ ] Monthly is selected by default and visibly labelled
- [ ] Monthly, quarterly and annual each update the selected-plan disclosure
- [ ] Currency switching preserves attribution without duplicate query parameters
- [ ] `begin_checkout` fires once and plan changes do not duplicate
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

## Day 8 lifecycle branches

The Day 8 converted-member and non-converter messages are separate drafts. Configure them as mutually exclusive branches from authoritative first-charge, cancellation and expiry conditions. Do not add a discount, trial extension or money-back framing to the initial launch.

The non-converter email links to `/snooze-membership`. The converted-member email links to the Snooze Library. Validate both destinations as the intended test contact before activation.

---

## Support & Questions

If you have questions about setup or need help customizing any of the content, refer to:
- `KAJABI-OFFER-SETUP.md` for detailed setup instructions
- Existing membership checkout pages for styling reference
- Kajabi documentation for platform-specific questions

---

**Last Updated:** August 8, 2026
**Status:** Repo-ready; paired Kajabi deployment and live browser validation required
