# Camp Snooze Jan '26 - Offer Details

> **PRICE CORRECTION, 2026-08-21.** Every price below this line is dead. The `$690` base, the `$300`
> discount code and the `$390` member price all predate the ratified structure. The locked prices, read
> live from `get_offer` on 2026-08-21, are: non-member **US$611 / A$878 due today, then US$79 / A$119 per
> month**, and member **US$611 / A$878 once, with nothing recurring**. The camp price is the price and the
> first month of Snooze access is included. Full audit:
> `docs/strategy/paid-scaling/4_working/2026-08-camp-funnel-completion/PRICING-AUDIT-2026-08-21.md`.

**Date Created:** December 31, 2025  
**Status:** ✅ Complete & Deployed  
**Internal Code:** PUBCM01 (PUB-CAMP-SNOOZE-JAN26)  
**Synced to Supabase:** ✅ Yes

**Registry Entry:**  
📁 **Source of truth:** Google Sheet (workbook ID in `pal-mcp-server/docs/snooze-operations-workbook.md`). Synced copy: root `docs/operations/KAJABI-OFFERS-REGISTRY.md` (see PUB-CAMP-SNOOZE-JAN26 / PUBCM01).

**Operations:**  
📁 **See:** `snooze-strategy-ops/docs/operations/offers/camp-snooze/`  
For cohort planning, materials, and operations management

---

## Offer Information

### Basic Details
- **Offer Title (Public):** Camp Snooze Jan '26
- **Internal Title:** `PUBCM01_Camp-Snooze-Jan-26`
- **Internal Code:** PUBCM01
- **Type:** Program/Intensive Offer
- **Price:** $690 USD
- **Member Discount:** $300 off (via discount code inside Snooze) = $390 USD for members

### Description

Camp Snooze is the virtual summer camp for baby sleep. Inspired by The Parent Trap, we've brought the camp vibes, roll call, and camp counsellors to life, but instead of s'mores, we're tackling bedtime battles, night wakings, naps, and early rising.

If sleep training has felt overwhelming, or you've tried to DIY it at 2 a.m. and wondered if you're doing it "right", this is for you. Camp Snooze is built so you're supported daily, and you're not doing it alone.

**What Makes Camp Snooze Different:**
- Kick-off call (group session): Live onboarding to walk through technique options and your plan together (10-11am AEDT / 8-9pm ET)
- Daily morning roll call (group session): Live group check-in each morning to review the last 24 hours, adjust the plan, and keep momentum (10-11am AEDT / 8-9pm ET, recordings available if you miss it)
- Afternoon troubleshooting chats in the forum: Daily support for curveballs, nap chaos, and "what do I do now?" moments

*Camp Snooze is open to all time zones, as long as you can make the 10-11am AEDT / 8-9pm ET calls.

---

## Key Dates

- **Packing list sent:** Friday, January 9, 2026 (AEDT) / Thursday, January 8, 2026 (ET)
- **Camp starts:** Monday, January 12, 2026 (AEDT) / Sunday, January 11, 2026 (ET)
- **Kick-off call:** Monday, January 12, 2026, 10-11am AEDT / Sunday, January 11, 2026, 8-9pm ET
- **Daily Group call time:** 10-11am AEDT / 8-9pm ET

---

## What's Included

1. **Quick intake form** - So we understand your baby, your goals, and what's been happening
2. **Packing list (supplies checklist)** - Sent Friday, January 9 (AEDT) / Thursday, January 8 (ET)
3. **Custom sleep schedule** - Personalized to your baby and goals, sent Friday, January 9 (AEDT) / Thursday, January 8 (ET)
4. **Step-by-step video modules** - To guide bedtime and overnight implementation
5. **Private camp forum** - For questions, wins, troubleshooting, and encouragement
6. **Kick-off call (group session)** - Live onboarding with Sally & Bec
7. **Daily morning roll call (group session)** - Live group check-in, recordings available
8. **Afternoon troubleshooting chats** - Daily support in the forum
9. **Two weeks of expert guidance** - From Sally Woods & Bec Maher

---

## Pricing

- **Standard Price:** $690 USD
- **Snooze Member Price:** $390 USD (via discount code provided inside Snooze)
- **Comparison:** A fraction of the cost of a regular 1:1 two-week transformation package at $3,500 USD

**Discount Code:**
- **Code:** `SNOOZEJAN26`
- **Discount:** $300 off ($690 - $300 = $390)
- **For:** Snooze members only
- **Share:** Inside Snooze Village/community for members to use
- **Checkout URL with code:** `https://www.joinsnooze.com/offers/muRW6ug5?coupon_code=SNOOZEJAN26`

---

## Capacity

- **Limited to:** 7 families per intake
- **Grouping:** Often grouped by age where possible

---

## Counsellors

Camp Snooze is led by two of the industry's most trusted baby sleep experts:

- **Sally Woods** - Paediatric nursing background, advanced infant sleep care, thousands of hours of hands-on case work
- **Bec Maher** - Advanced infant sleep care, thousands of hours of hands-on case work with families around the world

Both counsellors understand not only sleep science, but also the emotional load of being nap trapped, exhausted, and second-guessing every decision.

---

## Kajabi Setup Checklist

### Offer Settings
- [ ] Create offer in Kajabi Sales → Offers
- [ ] Set title: "Camp Snooze Jan '26"
- [ ] Set internal title: "Camp Snooze January 2026"
- [ ] Set price: $690 USD
- [ ] Add description (use content from this document)
- [ ] Set offer type: One-time payment

### Thank You Page
- [ ] Go to Settings tab → Thank You Page
- [ ] Select "Custom Thank You Page"
- [ ] Create new page and paste content from `thank-you-page.html`
- [ ] Save and link to offer

### Post-Purchase Email
- [ ] Go to Settings tab → Post-Purchase Email
- [ ] Create new email automation
- [ ] Set trigger: "Purchase of this offer"
- [ ] Set subject: "Welcome to Camp Snooze! Here's what happens next"
- [ ] Paste content from `post-purchase-email.html`
- [ ] Save and activate

### Discount Code (for Members)
- [x] Discount code created: `SNOOZEJAN26`
- [x] Set discount: $300 off
- [x] Set applicable to: Camp Snooze Jan '26 offer
- [ ] Share code inside Snooze Village/community

### Product/Content Access
- [ ] Create product or community access for Camp Snooze
- [ ] Grant access upon purchase
- [ ] Set up forum/community space for campers
- [ ] Upload video modules
- [x] Intake form: `https://forms.gle/JxzVuV4LBdjRvkZf6` (Google Form - already set up)

### Checkout Page
- [x] Use checkout page from `checkout-page.html`
- [x] Checkout URL updated: `https://www.joinsnooze.com/offers/muRW6ug5/checkout`
- [ ] Deploy as Website Page or Landing Page in Kajabi

---

## URLs

- **Checkout URL:** `https://www.joinsnooze.com/offers/muRW6ug5/checkout`
- **Member Checkout URL (with code):** `https://www.joinsnooze.com/offers/muRW6ug5?coupon_code=SNOOZEJAN26`
- **Offer ID:** `muRW6ug5`
- **Discount Code:** `SNOOZEJAN26` ($300 off for Snooze members)
- **Intake Form URL:** `https://forms.gle/JxzVuV4LBdjRvkZf6`
- **Thank You Page URL:** `[TO_BE_ADDED]` (Set in Kajabi offer settings)

---

## Internal Code Reference

**Code:** PUBCM01  
**Format:** PUB-CAMP-SNOOZE-JAN26  
**Breakdown:**
- `PUB` = Public offer (not member-only)
- `CM` = Camp Snooze
- `01` = First Camp Snooze intake (January 2026)

**Future Intakes:**
- PUBCM02 = Camp Snooze + Snooze Access Bundle (January 2026)
- PUBCM03 = Camp Snooze February 2026 (if applicable)
- PUBCM04 = Camp Snooze March 2026 (if applicable)

---

## Bundle Offer Information

### Basic Details
- **Offer Title (Public):** Camp Snooze + Snooze Access Bundle
- **Internal Title:** `PUBCM02_Camp-Snooze-Bundle`
- **Internal Code:** PUBCM02
- **Type:** Bundle Offer (Program + Membership)
- **Pricing Options:**
  - **Camp + Quarterly:** $587 USD (Save $250 vs. buying separately)
  - **Camp + Annual:** $1,047 USD (Save $133 vs. buying separately, includes 2 months free)

### URLs
- **Checkout URL:** `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`
- **Offer ID:** `K3Y6FEKX`

### Description

The Camp Snooze + Snooze Access Bundle combines the two-week intensive sleep training program with ongoing access to Snooze resources, community, and expert guidance.

**What's Included:**
- All Camp Snooze benefits (2-week program)
- Ongoing Snooze Access membership (Quarterly or Annual)
- Full access to all sleep courses and guides
- Weekly live group coaching with Sally
- Daily support in Snooze community
- Age-based pathways and resources
- Tools for regressions, travel, and transitions

### Supabase Registration

**SQL to Execute in Supabase:**

```sql
INSERT INTO checkout_offer_map (
  internal_code,
  offer_id,
  checkout_url,
  offer_title,
  pricing_tier,
  offer_type,
  price_usd_min,
  price_usd_max,
  created_at,
  updated_at
) VALUES (
  'PUBCM02',
  'K3Y6FEKX',
  'https://www.joinsnooze.com/offers/K3Y6FEKX/checkout',
  'Camp Snooze + Snooze Access Bundle',
  'normal',
  'bundle',
  587,
  1047,
  NOW(),
  NOW()
)
ON CONFLICT (internal_code) 
DO UPDATE SET
  offer_id = EXCLUDED.offer_id,
  checkout_url = EXCLUDED.checkout_url,
  offer_title = EXCLUDED.offer_title,
  pricing_tier = EXCLUDED.pricing_tier,
  offer_type = EXCLUDED.offer_type,
  price_usd_min = EXCLUDED.price_usd_min,
  price_usd_max = EXCLUDED.price_usd_max,
  updated_at = NOW();
```

**Fields:**
- **Internal Code:** `PUBCM02`
- **Offer ID:** `K3Y6FEKX`
- **Checkout URL:** `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`
- **Offer Title:** Camp Snooze + Snooze Access Bundle
- **Pricing Tier:** `normal`
- **Offer Type:** `bundle`
- **Price Range:** $587 - $1,047 USD

---

## Notes

- This is a time-limited program (two weeks)
- Requires active participation in group calls (10-11am AEDT / 8-9pm ET)
- Recordings available for those who miss live calls
- Forum support available throughout the two weeks
- Limited capacity ensures personalized attention

---

---

## Intake Form

- **URL:** `https://forms.gle/JxzVuV4LBdjRvkZf6`
- **Type:** Google Form
- **Status:** ✅ Active
- **Purpose:** Collect baby information, goals, and sleep history to create personalized sleep plans

---

**Last Updated:** January 2, 2026
