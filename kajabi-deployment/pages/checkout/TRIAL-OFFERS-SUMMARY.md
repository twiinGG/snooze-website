# Trial & Free Access Offers - Implementation Summary

**Date:** January 2026 (codes updated June 2026)  
**Status:** Complete & Ready for Deployment  
**Purpose:** Documentation of 7-day trial and 1-month free access offers created

**Authoritative naming:** `docs/operations/SNOOZE-NAMING-CONVENTIONS.md` (v2). Core membership public title: **The Snooze Membership**.

---

## Overview

Two membership offers drive conversions:

1. **7-Day Full Access Trial** (`PUBMS02_USD`) - Trial that auto-converts to paid membership
2. **1-Month Free Access** (`PUBMS03_USD`) - Free grant with no commitment, expires after 30 days

Both offers include complete checkout pages, thank you pages, and email sequences.

---

## 1. 7-Day Full Access Trial (PUBMS02, USD + AUD)

### Offer Details
- **Offer Title (Public):** The Snooze Membership - 7 Day Trial
- **Type:** Trial with auto-conversion (card-upfront)
- **Duration:** 7 days
- **Payment:** Card on file at signup; $0 charged for the first 7 days
- **Conversion:** Selected plan bills on day 8 (or cancel anytime in the trial)

| Currency | Code | Offer ID | Slug |
|----------|------|----------|------|
| USD | PUBMS02_USD | `2150887297` | `mqQikDM7` |
| AUD | PUBMS02_AUD | `2151254578` | `Sr6KzShx` |

### Files (folder `7-day-trial-membership/`)
- `usd/checkout-blocks.html` - USD checkout HTML (links to AUD)
- `aud/checkout-blocks.html` - AUD checkout HTML (links to USD)
- `shared/checkout.css` - Self-contained checkout CSS (both currencies)
- `shared/checkout.js` - Scroll-to-checkout JS (both currencies)
- `thank-you-page.html` - Post-purchase thank you page (currency-neutral)
- `KAJABI-OFFER-SETUP.md` - Complete setup + currency wiring
- `README.md` - Overview and quick reference

### Email Sequence
- **Welcome Email** (Day 0) - Immediate post-purchase
- **Day 2-3 Check-In** - Exploration tips
- **Day 4-5 Check-In** - Final days reminder
- **Day 8+ Follow-Up** - Trial ended, special offer (if didn't convert)

### Automation Setup
- **Trigger:** Purchase of 7-Day Trial offer
- **Actions:**
  1. Add tag `snooze-trial`
  2. Send Post-Purchase email (welcome)
  3. Subscribe to email campaign sequence

---

## 2. 1-Month Free Access (PUBMS03_USD)

### Offer Details
- **Offer Title (Public):** The Snooze Membership - 1 Month Free
- **Internal Title:** `PUBMS03_USD_1-Month-Free`
- **Internal Code:** PUBMS03_USD
- **Type:** Free promotional grant
- **Duration:** 30 days
- **Payment:** No payment required
- **Conversion:** Manual upgrade required (access expires if not upgraded)

### Files Created
- `1-month-free-checkout-blocks.html` - Checkout page HTML
- `1-month-free-checkout.css` - Checkout page CSS
- `1-month-free-checkout.js` - Checkout page JavaScript
- `1-month-free-thank-you-page.html` - Post-purchase thank you page
- `KAJABI-OFFER-SETUP.md` - Complete setup instructions
- `README.md` - Overview and quick reference

### Email Sequence
- **Welcome Email** (Day 0) - Immediate when access granted
- **Day 7 Check-In** - Exploration tips
- **Day 14 Check-In** - Mid-point check-in
- **Day 21 Reminder** - Final week reminder
- **Day 25 Upgrade CTA** - Final days with upgrade options
- **Day 30+ Follow-Up** - Free month ended, special offer (if didn't upgrade)

### Automation Setup
- **Trigger:** Access granted to 1-Month Free offer (manual or automated)
- **Actions:**
  1. Add tag `snooze-trial` (or `1-month-free-granted`)
  2. Send Post-Purchase email (welcome)
  3. Subscribe to email campaign sequence

---

## Naming Convention Standard (v2)

**Format:** `[Audience][Product][NN]_[Currency]_{Kebab-Slug}`

| Code | Public title | Internal title |
|------|--------------|----------------|
| PUBMS01_USD | The Snooze Membership | `PUBMS01_USD_The-Snooze-Membership` |
| PUBMS01_AUD | The Snooze Membership | `PUBMS01_AUD_The-Snooze-Membership` |
| PUBMS02_USD | The Snooze Membership - 7 Day Trial | `PUBMS02_USD_7-Day-Trial` |
| PUBMS02_AUD | The Snooze Membership - 7 Day Trial | `PUBMS02_AUD_7-Day-Trial` |
| PUBMS03_USD | The Snooze Membership - 1 Month Free | `PUBMS03_USD_1-Month-Free` |

Legacy v1 codes (`MBMS04`, `MBMS05`, `MBMS03`) map to the rows above. Do not use `MBMS` or "Snooze Access" on new checkouts.

---

## Next Steps

1. **Deploy 7-Day Trial Offer:** Create/update in Kajabi with `PUBMS02_USD`; configure trial period and email campaign.
2. **Deploy 1-Month Free Offer:** Create/update in Kajabi with `PUBMS03_USD`; configure 30-day access and email campaign.
3. **Test both flows:** Purchase/grant, email sequences, upgrade paths, tags and tracking.

---

**Last Updated:** June 28, 2026  
**Status:** Complete & Ready for Deployment
