# Email Campaign Registry Rule

**Date:** January 2026  
**Purpose:** Standardize registration of all email campaigns (evergreen and specific) in project and Supabase registry  
**Status:** Active

---

## Overview

All email campaigns must be registered in both:
1. **Project Registry:** Documented in this project with appropriate naming
2. **Supabase Registry:** Stored in `checkout_offer_map` table with `element_type = 'campaign'`

This ensures:
- Complete tracking of all email marketing activities
- Consistent naming conventions across campaigns
- Easy reference for campaign performance and setup
- Integration with offer/product tracking systems

---

## Naming Convention

### Code Format

**Pattern:** `EM[CATEGORY][NUMBER]`

- `EM` = Email Campaign prefix
- `[CATEGORY]` = Two-letter category code (see categories below)
- `[NUMBER]` = Sequential number (01, 02, 03, etc.)

### Category Codes

| Code | Category | Description |
|------|----------|-------------|
| `MS` | Membership Sequences | Email sequences for membership offers (trials, free access, etc.) |
| `CR` | Course Sequences | Email sequences for course purchases or promotions |
| `GD` | Guide Sequences | Email sequences for guide purchases or promotions |
| `CS` | Consult Sequences | Email sequences for consultation purchases or promotions |
| `RP` | Recent Purchaser | Email sequences for recent purchasers (by purchase value) |
| `OP` | Older Purchaser | Email sequences for older purchasers (3+ months ago) |
| `SS` | Snooze Social | Email sequences for Snooze Social members |
| `ES` | Email Subscriber | Email sequences for general email subscribers |
| `WL` | Waitlist | Email sequences for waitlist subscribers |
| `NT` | Nap Trapped | Email sequences for Nap Trapped podcast listeners |
| `FM` | Founding Member | Email sequences for founding member campaigns |
| `LM` | Lead Magnet | Email sequences for lead magnets and free modules |
| `GN` | General | General email campaigns (login checks, reminders, etc.) |

### Examples

- `EMMS04` = Email Membership Sequence 04 (7-Day Trial sequence)
- `EMMS05` = Email Membership Sequence 05 (1-Month Free sequence)
- `EMCR01` = Email Course sequence 01 (3-4m Course Limited Trial Flow)
- `EMSS01` = Email Snooze Social sequence 01 (Snooze Reminder)
- `EMRP01` = Email Recent Purchaser sequence 01 ($87 Bundle)
- `EMLM04` = Email Lead sequence 04 (5-12M Free Module - Schedules)
- `EMLM05` = Email Lead sequence 05 (5-12M Free Module - Feeds)
- `EMLM06` = Email Lead sequence 06 (5-12M Free Module - Naps)
- `EMGN01` = Email General sequence 01 (Snooze Login Check)

---

## Registration Requirements

### Required Information

Each email campaign must include:

1. **Internal Code** (e.g., `EMMS05`)
2. **Campaign Name** (e.g., "1 Month Free Email Sequence")
3. **Element Type:** Always `'campaign'` for email campaigns
4. **Status:** `'active'`, `'archived'`, or `'draft'`
5. **Trigger/Context:** What triggers this campaign (offer purchase, tag, date, etc.)
6. **Number of Emails:** Total emails in sequence
7. **Duration:** Total duration of sequence (e.g., "30 days", "6 days")
8. **Related Offer/Product:** If linked to a specific offer/product, include `related_element_ids`
9. **Metadata:** JSONB field with:
   - `email_count`: Number of emails in sequence
   - `sequence_duration_days`: Total duration
   - `trigger_type`: Type of trigger (purchase, tag, date, etc.)
   - `target_segment`: Target audience segment
   - `kajabi_campaign_id`: Kajabi campaign ID if available

### Supabase Registration

**Table:** `checkout_offer_map`

**Required Fields:**
- `offer_code`: Internal code (e.g., `EMMS05`)
- `element_type`: `'campaign'`
- `element_name`: Campaign name
- `status`: `'active'`, `'archived'`, or `'draft'`
- `metadata`: JSONB with campaign details (see above)

**Optional Fields:**
- `related_element_ids`: JSONB array of related offer/product codes
- `parent_campaign_id`: If part of a larger campaign
- `notes`: Additional notes about the campaign

---

## Evergreen vs Specific Campaigns

### Evergreen Campaigns

**Definition:** Campaigns that run continuously and are not tied to a specific date or one-time event.

**Examples:**
- Membership trial sequences
- Post-purchase sequences
- Welcome sequences
- Re-engagement sequences

**Registration:** Must be registered immediately when created.

### Specific Campaigns

**Definition:** Campaigns tied to a specific date, event, or limited-time promotion.

**Examples:**
- Launch campaigns
- Holiday promotions
- Limited-time offers
- Event-based sequences

**Registration:** Should be registered when created, but can be archived after completion.

---

## Project Documentation

### File Location

Email campaign documentation should be stored in:
- `projects/snooze-website/kajabi-deployment/pages/[offer-name]/emails/` (if tied to specific offer)
- `projects/snooze-website/kajabi-deployment/EMAIL-CAMPAIGNS.md` (master list)

### Documentation Requirements

Each campaign should have:
1. **Internal Code** clearly stated
2. **Campaign Name**
3. **Trigger/Context** description
4. **Email Sequence** details (number of emails, timing, subjects)
5. **Target Audience** description
6. **Related Offers/Products** (if applicable)
7. **Kajabi Setup Instructions** (if applicable)

---

## Supabase Registration SQL Template

**Note:** See `EMAIL-CAMPAIGNS-REGISTRY-POPULATION.sql` for complete examples of all registered campaigns.

```sql
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMMS05',  -- Internal code
  'https://www.joinsnooze.com/email-campaign/eMMS05',  -- Placeholder URL (required field)
  'campaign',  -- Element type
  '1 Month Free Email Sequence',  -- Campaign name
  'active',  -- Status
  '{
    "email_count": 6,
    "sequence_duration_days": 30,
    "trigger_type": "offer_grant",
    "target_segment": "free_access_recipients",
    "kajabi_campaign_id": null
  }'::jsonb,  -- Metadata
  '["MBMS05"]'::jsonb,  -- Related offer codes
  'Email sequence for 1-month free access grant. Includes welcome, day 7, 14, 21, 25, and 30 emails.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();
```

**Important:** The `checkout_url` field is required (NOT NULL) in the `checkout_offer_map` table. For email campaigns, use a placeholder URL in the format: `https://www.joinsnooze.com/email-campaign/[CODE]` (e.g., `https://www.joinsnooze.com/email-campaign/eMMS05`).

---

## Maintenance

### When to Update

- When campaign status changes (active → archived)
- When emails are added/removed from sequence
- When trigger conditions change
- When related offers/products change

### Archiving

When a campaign is no longer active:
1. Update `status` to `'archived'` in Supabase
2. Update project documentation with archive date
3. Keep historical data for reference

---

## Quick Reference

**Next Available Codes by Category:**
- `EMMS`: Next available after EMMS05
- `EMCR`: Next available after EMCR01
- `EMSS`: Next available after EMSS01
- `EMRP`: Next available after EMRP05
- `EMOP`: Next available after EMOP01
- `EMES`: Next available after EMES01
- `EMWL`: Next available after EMWL01
- `EMGN`: Next available after EMGN01

---

**Last Updated:** January 2026  
**Status:** ✅ Active
