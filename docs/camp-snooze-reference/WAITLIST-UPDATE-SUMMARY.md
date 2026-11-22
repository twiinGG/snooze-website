# Camp Snooze Waitlist Update - February 2026

**Date:** January 2, 2026  
**Status:** ✅ Complete

## Summary

Transitioned Camp Snooze landing page from active sales to waitlist mode for the February 2026 intake. All checkout functionality has been commented out for easy restoration when sales reopen.

## Changes Made

### 1. Date Updates
- **Camp starts:** Monday, February 16, 2026
- **Applications close:** Friday, February 13, 2026
- **Packing list sent:** Friday, February 13, 2026
- **Kick-off call:** Monday, February 16, 2026, 10-11am AEDT

### 2. Landing Page (v2-luxury)
- ✅ Replaced all "Join Camp Snooze" buttons with "Join the Waitlist" links
- ✅ Commented out all checkout modal triggers
- ✅ Added waitlist form section with Kajabi embed
- ✅ Updated all date references throughout the page
- ✅ Commented out pricing/checkout modals (preserved for restoration)

### 3. Checkout Pages
- ✅ Updated dates in all checkout blocks:
  - `camp-snooze-checkout-blocks.html`
  - `camp-snooze-v2-luxury/camp-snooze-checkout-blocks.html`
  - `camp-snooze-v2-luxury/camp-snooze-bundle-checkout-blocks.html`
  - `camp-snooze-v2-luxury/camp-snooze-member-checkout-blocks.html`

### 4. Email Templates
- ✅ Updated `camp-snooze-thank-you-page.html` with February dates
- ✅ Updated `camp-snooze-post-purchase-email.html` with February dates and calendar link

### 5. File Cleanup
- ✅ Removed old non-v2 landing page files to prevent overlap:
  - `camp-snooze-landing-page-blocks.html`
  - `camp-snooze-landing-page.css`
  - `camp-snooze-landing-page.js`
  - `camp-snooze-checkout-blocks.html`
  - `camp-snooze-checkout.css`
  - `camp-snooze-checkout.js`
  - `camp-snooze-bundle-checkout-blocks.html`
  - `camp-snooze-bundle-checkout.css`
  - `camp-snooze-bundle-checkout.js`
  - `camp-snooze-simple-checkout.html`
  - `landing-page-blocks.html`

## Kajabi Form Integration

**Form URL:** https://www.joinsnooze.com/forms/2149246740  
**Embed Script:** `<script src="https://www.joinsnooze.com/forms/2149246740/embed.js"></script>`

The form is embedded in the waitlist section at the bottom of the landing page.

## Restoration Notes

When sales reopen, uncomment all sections marked with:
```html
<!-- COMMENTED OUT FOR WAITLIST: Checkout button will be restored when sales open -->
```

Key sections to restore:
1. Hero CTA button (line ~117)
2. All section CTA buttons throughout the page
3. Pricing modal checkout links (line ~739-755)
4. Details modal button (line ~692)

## Files Modified

- `camp-snooze-v2-luxury/camp-snooze-landing-page-blocks.html`
- `camp-snooze-v2-luxury/camp-snooze-checkout-blocks.html`
- `camp-snooze-v2-luxury/camp-snooze-bundle-checkout-blocks.html`
- `camp-snooze-v2-luxury/camp-snooze-member-checkout-blocks.html`
- `camp-snooze-thank-you-page.html`
- `camp-snooze-post-purchase-email.html`

## Files Deleted

- All old non-v2 landing page and checkout files (see File Cleanup section above)
