> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Tracking Test Quick Reference

**Date:** December 16, 2025  
**Purpose:** Quick reference for testing tracking before Meta ads launch

---

## Critical Checks (5 Minutes)

### 1. Domain Check
- [ ] Visit `joinsnooze.com` - should load (not `joinsnooze.com`)
- [ ] Check browser console - no domain errors
- [ ] Header script uses `joinsnooze.com` domain

### 2. Price Tracking (Checkout Page)
- [ ] Open checkout page
- [ ] Open DevTools → Console
- [ ] Look for: `"Snooze Tracking: Starting Dynamic Price Scraper..."`
- [ ] If multiple prices: Click each option, verify console shows price update
- [ ] Open DevTools → Application → Local Storage
- [ ] Verify `value` key exists with correct price

### 3. Thank You Page (After Purchase)
- [ ] Complete test purchase
- [ ] On thank you page, open DevTools → Console
- [ ] Look for purchase event in dataLayer
- [ ] Check Local Storage - should have `value`, `email`, `product_name`
- [ ] Open Facebook Pixel Helper - should show Purchase event

---

## Offers That Need Testing

### Multiple Price Options
1. **Founding Member** (`MBMS01`) - $147 Quarterly / $490 Annual
   - Test both prices
   - Verify thank you page configured

### Single Price Offers
2. **Public Consult** (`PUBCS01`) - $650
3. **Member Consult** (`MEMCS01`) - $525
4. **Newborn Guide** (`PUBGD02`) - $67
5. **3-4 Month Course** (`PUBCR01`) - $117
6. **5-12 Month Course** (`PUBCR02`) - $117
7. **Toddler Toolkit** (`PUBCR03`) - $117
8. **Consult Upsell** (`UPMBCS01`) - $445
9. **Guide to Membership Upsell** (`UPGDMS01`) - $80
10. **Course to Membership Upsell** (`UPCRMS01`) - $30

---

## Quick Test Script

**On any checkout or thank you page:**

1. Open DevTools → Console
2. Paste: `fetch('/docs/technical/TRACKING-TEST-SCRIPT.js').then(r => r.text()).then(eval)`
   - OR copy/paste the script from `TRACKING-TEST-SCRIPT.js`
3. Review results

---

## Common Issues

| Issue | Quick Fix |
|-------|-----------|
| Price shows as 0 | Check selectors in GTM Tag 86 |
| Purchase event not firing | Verify thank you page is custom (not default) |
| CAPI not receiving events | Check Stape.io server status |
| Old domain references | Search codebase for `joinsnooze.com` |

---

## Test Checklist Priority

### Must Test Before Launch
- [ ] Founding Member offer (both prices)
- [ ] At least 2 single-price offers
- [ ] Verify all offers have custom thank you pages

### Should Test
- [ ] All major offers (consult, courses, guides)
- [ ] Upsell offers
- [ ] Meta Events Manager shows test events

### Nice to Have
- [ ] All offers tested
- [ ] Multiple browsers tested
- [ ] Mobile device tested

---

## Success Criteria

✅ **Ready for Launch:**
- All domains use `joinsnooze.com`
- Price tracking works for all tested offers
- All offers have custom thank you pages
- Purchase events fire on thank you pages
- Meta Pixel Helper shows events
- CAPI receives events in Events Manager

❌ **Not Ready:**
- Any domain still uses `joinsnooze.com`
- Price tracking broken for any offer
- Any offer missing custom thank you page
- Purchase events not firing
- CAPI not receiving events

---

**Full Checklist:** See `TRACKING-TEST-CHECKLIST.md`  
**Test Script:** See `TRACKING-TEST-SCRIPT.js`
