# Email Campaign Registry Summary

**Date:** January 2026  
**Status:** ✅ All Evergreen Campaigns Registered

---

## Overview

All evergreen email campaigns have been registered in both the project documentation and Supabase registry. This document provides a quick reference of all registered campaigns.

---

## Registered Campaigns

### Membership Sequences

| Code | Campaign Name | Emails | Duration | Related Offer |
|------|---------------|--------|----------|---------------|
| `EMMS04` | 7-Day Trial Email Sequence | 4 | 8 days | MBMS04 |
| `EMMS05` | 1 Month Free Email Sequence | 6 | 30 days | MBMS05 |

### Course Sequences

| Code | Campaign Name | Emails | Duration | Related Offer |
|------|---------------|--------|----------|---------------|
| `EMCR01` | 3-4m Course - Limited Trial Flow | 2 | 2 days | PUBCR01 |

### Snooze Social Sequences

| Code | Campaign Name | Emails | Duration | Trigger |
|------|---------------|--------|----------|---------|
| `EMSS01` | Snooze Social Members - Snooze Reminder | 3 | 8 days | Tag: snooze-social-member |

### Recent Purchaser Sequences

| Code | Campaign Name | Emails | Duration | Discount Offered |
|------|---------------|--------|----------|------------------|
| `EMRP01` | Recent $87 Bundle Purchasers (RPB87) | 3 | 6 days | $87 off |
| `EMRP02` | Recent Purchasers - $27 Products (RPM27) | 3 | 6 days | $27 off |
| `EMRP03` | Recent Purchasers - $67 Products (RPG67) | 3 | 6 days | $67 off |
| `EMRP04` | Recent Purchasers - Consultation Purchasers (RPN100) | 3 | 6 days | $100 off |
| `EMRP05` | Recent Purchasers - $117 Products (RPC117) | 3 | 6 days | $80 off |

### Older Purchaser Sequences

| Code | Campaign Name | Emails | Duration | Discount Offered |
|------|---------------|--------|----------|------------------|
| `EMOP01` | Older Purchasers (3+ months ago) (OP20) | 4 | 9 days | $20 off |

### Email Subscriber Sequences

| Code | Campaign Name | Emails | Duration | Trigger |
|------|---------------|--------|----------|---------|
| `EMES01` | Email Subscribers | 4 | 9 days | Tag: email-subscriber |

### Waitlist Sequences

| Code | Campaign Name | Emails | Duration | Trigger |
|------|---------------|--------|----------|---------|
| `EMWL01` | Waitlist Subscribers | 4 | 9 days | Tag: waitlist-subscriber |
| `EMWL02` | Camp Snooze Waitlist Launch - January 2026 | 3 | 6 days | Tag: camp-snooze-waitlist |

### General Sequences

| Code | Campaign Name | Emails | Duration | Type |
|------|---------------|--------|----------|------|
| `EMGN01` | Snooze Login Check | 1 | 0 days | Manual/Automated |
| `EMGN02` | 5-12 Month Guide/Course Buyers - Toddler Toolkit Launch | 1 | 0 days | Product Launch |

---

## Total Registered

- **Total Campaigns:** 15
- **Total Emails:** 48 emails across all sequences
- **Status:** All active

---

## Next Steps

1. **New Campaigns:** When creating new email campaigns, follow the naming convention in `EMAIL-CAMPAIGN-REGISTRY-RULE.md`
2. **Registration:** Register new campaigns using the SQL template in the rule document
3. **Documentation:** Update this summary when new campaigns are added
4. **Archiving:** Update status to `'archived'` when campaigns are no longer active

---

## Related Files

- **`EMAIL-CAMPAIGN-REGISTRY-RULE.md`** - Complete rules and naming conventions
- **`EMAIL-CAMPAIGNS-REGISTRY-POPULATION.sql`** - SQL file with all registered campaigns

---

**Last Updated:** January 2026  
**Status:** ✅ Complete
