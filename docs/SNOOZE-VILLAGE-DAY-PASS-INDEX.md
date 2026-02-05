# Snooze Village Day Pass - Complete Documentation Index

**Date:** December 2025  
**Purpose:** Master index for all Day Pass offer documentation  
**Status:** Active

---

## Overview

The Snooze Village Day Pass is a free 24-hour offer that gives prospects access to Snooze Village (community and coaching) without courses or Library resources. This document indexes all related documentation and files.

---

## Documentation Files

### 1. Setup Guide
**File:** `docs/SNOOZE-VILLAGE-DAY-PASS-SETUP.md`  
**Purpose:** Complete setup instructions for the offer in Kajabi  
**Contents:**
- Offer details and description
- Product access settings
- Post-purchase settings
- Pricing configuration
- Checkout page setup
- Testing checklist
- Marketing messaging ideas

### 2. Email Templates
**File:** `docs/SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`  
**Purpose:** All email templates for the day pass offer  
**Contents:**
- Welcome email (post-purchase)
- Mid-pass reminder (12 hours)
- Conversion email (23 hours)
- Post-expiration follow-up (24+ hours)
- Conversion success email (if upgraded)
- Email design guidelines
- Implementation checklist

### 3. Automations
**File:** `docs/SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md`  
**Purpose:** Automation workflows and setup instructions  
**Contents:**
- Welcome email automation
- 12-hour reminder automation
- 23-hour conversion automation
- Post-expiration follow-up automation
- Conversion success automation
- Tag management automation
- Testing checklist
- Analytics and tracking

### 4. This Index
**File:** `docs/SNOOZE-VILLAGE-DAY-PASS-INDEX.md`  
**Purpose:** Master index of all Day Pass documentation

---

## Code Files

### Checkout Page
**Location:** `kajabi-deployment/pages/day-pass-offer/checkout-page.html`  
**Purpose:** Custom checkout/landing page for the day pass offer  
**Status:** Ready for deployment (requires checkout URL update)

### Checkout Page README
**Location:** `kajabi-deployment/pages/day-pass-offer/README.md`  
**Purpose:** Quick reference for checkout page and file structure

---

## Quick Start Guide

### For Setup
1. Read `docs/SNOOZE-VILLAGE-DAY-PASS-SETUP.md`
2. Configure offer in Kajabi using the settings provided
3. Update checkout URL in `checkout-page.html`

### For Emails
1. Read `docs/SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
2. Copy email templates into Kajabi
3. Personalize with user's first name

### For Automations
1. Read `docs/SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md`
2. Set up automations in Kajabi following the guide
3. Test all triggers and conditions

---

## File Structure

```
projects/snooze-website/
├── docs/
│   ├── SNOOZE-VILLAGE-DAY-PASS-SETUP.md          # Main setup guide
│   ├── SNOOZE-VILLAGE-DAY-PASS-EMAILS.md         # Email templates
│   ├── SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md   # Automation setup
│   └── SNOOZE-VILLAGE-DAY-PASS-INDEX.md         # This file
└── kajabi-deployment/
    └── pages/
        └── day-pass-offer/
            ├── checkout-page.html                # Checkout page HTML
            └── README.md                         # Checkout page reference
```

---

## Implementation Checklist

### Phase 1: Offer Setup
- [ ] Create offer in Kajabi
- [ ] Configure offer details (title, description)
- [ ] Set pricing to Free
- [ ] Configure product access (Snooze Members)
- [ ] Set 1-day access restriction
- [ ] Configure post-purchase settings

### Phase 2: Checkout Page
- [ ] Deploy checkout page HTML
- [ ] Update checkout URL with actual offer ID
- [ ] Test checkout page on mobile
- [ ] Verify all links work

### Phase 3: Email Templates
- [ ] Create welcome email template
- [ ] Create 12-hour reminder template
- [ ] Create 23-hour conversion template
- [ ] Create post-expiration follow-up template
- [ ] Create conversion success template
- [ ] Test all email templates

### Phase 4: Automations
- [ ] Set up welcome email automation
- [ ] Set up 12-hour reminder automation
- [ ] Set up 23-hour conversion automation
- [ ] Set up post-expiration follow-up automation
- [ ] Set up conversion success automation
- [ ] Test all automations

### Phase 5: Testing
- [ ] Test complete checkout flow
- [ ] Verify access to Snooze Village works
- [ ] Confirm courses/Library are NOT accessible
- [ ] Test 24-hour expiration
- [ ] Verify all emails send correctly
- [ ] Test on mobile devices

---

## Key URLs

### Snooze Village
- **Community:** `https://joinsnooze.com/products/communities/v2/snooze`
- **Library:** `https://joinsnooze.com/products/communities/v2/snooze/library`

### Checkout URLs
- **Day Pass Checkout:** `https://joinsnooze.com/offers/[YOUR_OFFER_ID]/checkout` (update with actual ID)
- **Snooze Membership:** `https://joinsnooze.com/offers/6iRarwak/checkout`

---

## Support & Maintenance

### Regular Tasks
- Monitor conversion rates
- Review email performance
- Gather user feedback
- A/B test messaging
- Optimize based on data

### Updates Needed
- Update checkout URLs when offer IDs change
- Refresh email templates based on performance
- Adjust automation timing based on data
- Update documentation when changes are made

---

## Related Resources

### Brand Guidelines
- **Branding Assets:** `docs/branding/BRANDING-ASSETS-REFERENCE.md`
- **Color Palette:** Coral (#F43357), Navy (#1F293B), Cream (#FAF7F4)

### Technical Documentation
- **Tracking Setup:** `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md`
- **URL Reference:** `docs/technical/URL-REFERENCE.md`

---

## Questions or Issues?

If you need help with:
- **Setup:** See `SNOOZE-VILLAGE-DAY-PASS-SETUP.md`
- **Emails:** See `SNOOZE-VILLAGE-DAY-PASS-EMAILS.md`
- **Automations:** See `SNOOZE-VILLAGE-DAY-PASS-AUTOMATIONS.md`
- **Checkout Page:** See `kajabi-deployment/pages/day-pass-offer/README.md`

---

**Last Updated:** December 2025  
**Status:** Complete and Ready for Implementation

