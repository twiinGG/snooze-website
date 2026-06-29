# Snooze Village Day Pass Offer

**Location:** `kajabi-deployment/pages/day-pass-offer/`  
**Purpose:** Free 24-hour access to Snooze Village (community & coaching only)

---

## Files in This Directory

- **`checkout-page.html`** - Custom checkout/landing page for the day pass offer
- **`README.md`** - This file (overview and file structure)

---

## Related Documentation

All comprehensive documentation is in:
- **Setup Guide:** `docs/SNOOZE-VILLAGE-DAY-PASS-SETUP.md`
- **Email Templates:** `docs/SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
- **Automations:** `docs/SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md`

---

## Quick Reference

### Checkout Page
- **File:** `checkout-page.html`
- **Usage:** Landing page that links to Kajabi checkout
- **Update Required:** Replace checkout URL in JavaScript section (line ~315)

### Offer Details
See `docs/SNOOZE-VILLAGE-DAY-PASS-SETUP.md` for complete Kajabi offer configuration.

### Email Templates
See `docs/SNOOZE-VILLAGE-DAY-PASS-EMAILS.md` for all email templates.

### Automations
See `docs/SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md` for automation setup.

---

**Last Updated:** December 2025

---

## Implementation Notes (relocated from inline code comments, June 29, 2026)

These notes were moved out of `checkout-page.html` when deployable comments were stripped.

### Service-model accuracy

The Day Pass grants Snooze Village community access during its 24-hour window plus any live sessions with the Snooze Specialists that happen to be open during that window. It does NOT include the membership live-session schedule on a fixed cadence, and it does not include courses or Library resources. Page copy must not promise weekly or guaranteed live coaching. (The "community & coaching only" phrasing above predates this correction; treat "live sessions when open" as the accurate description.)

### Checkout button URL (action required before deploy)

The checkout button (`#checkout-button`) is a placeholder. Before deploy, set the real Kajabi checkout URL in the `<script>` block:

- Pattern: `https://joinsnooze.com/offers/[YOUR_OFFER_ID]/checkout`
- Replace the `alert(...)` placeholder handler with `window.location.href = '<real URL>';`
- The placeholder scanner will BLOCK deploy while the `#` href and alert remain.

### Currency toggle block

The `.snooze-currency-toggle-block` (`data-currency-toggle="checkout"`) captures `currency_preference` for downstream Snooze Access conversion routing, since the Day Pass itself is free.

- PRD reference: `docs/projects/paid-media-and-dual-currency-v1/00-prd.md` §4.8

