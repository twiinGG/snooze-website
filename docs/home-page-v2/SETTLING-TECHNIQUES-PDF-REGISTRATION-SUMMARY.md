# Settling Techniques PDF - Registration Summary

**Date:** January 12, 2026  
**Status:** ✅ Complete

---

## Product Registration

### Product Details

**Product Code:** `GD-ST`  
**Product Name:** Settling Techniques PDF  
**Type:** Guide (Lead Magnet/Value Bomb)  
**Status:** Active  
**Pricing:** Free

**Description:**  
Two proven settling techniques (Soothe and Support Checks and The Vanishing Chair) extracted from the 5-12 Month Sleep Course. Used as lead magnet/value bomb and given to Camp Snooze members.

**Content Source:**  
5-12 Month Sleep Course, Module 3, Lessons 1.2 and 1.3

**Modules Included:**
- Option 1 - Soothe and Support Checks
- Option 2 - The Vanishing Chair

**Use Cases:**
- Lead magnet for email capture
- Value bomb in marketing campaigns
- Camp Snooze member resource

**Product URL:**  
`https://drive.google.com/drive/folders/1ypOL7Q3OU6XxOXef-hBjQS3dOeoDIuVu?usp=drive_link`

---

## Registry Entries

### ✅ Products Registry

**Location:** Google Sheet (source of truth); synced copy: root `docs/operations/KAJABI-PRODUCTS-REGISTRY.md`

**Entry Added:** Guide-Settling-Techniques  
**Product Code:** `GD-ST`  
**Last Updated:** January 12, 2026

**Related Products:**
- `CR-5-12MO` - 5-12 Month Sleep Course (source content)
- Camp Snooze program (distributed to members)

---

### ✅ Supabase Registration

**Location:** `snooze-product/projects/Home Page Uplift/SETTLING-TECHNIQUES-PDF-SUPABASE-REGISTRATION.sql`

**Table:** `checkout_offer_map`  
**Element Type:** `product`  
**Offer Code:** `GD-ST`

**Related Elements:**
- `CR-5-12MO` (5-12 Month Course)
- `PUBCM01` (Camp Snooze Jan '26)

**Metadata Includes:**
- Product type, category, age stage
- Content source and modules
- Use cases and distribution channels
- Related course and program

**Next Step:** Execute the SQL file in Supabase to register the product.

---

## Associated Offer (Future)

**Offer Code:** `LDGD04` (Lead Guide Settling Techniques)  
**Status:** Not yet created in Kajabi

**Note:** This is a free lead magnet PDF, so it may not require a separate Kajabi offer. The product registration in Supabase is sufficient for tracking. If you need to create a Kajabi offer for email automation or access control, use code `LDGD04`.

---

## Files Created/Updated

1. ✅ Google Sheet / root `docs/operations/KAJABI-PRODUCTS-REGISTRY.md` - Product entry added
2. ✅ `snooze-product/projects/Home Page Uplift/SETTLING-TECHNIQUES-PDF-SUPABASE-REGISTRATION.sql` - Supabase SQL created
3. ✅ `snooze-product/projects/Home Page Uplift/SETTLING-TECHNIQUES-INTRO-SUMMARY.md` - Intro and summary content (created earlier)

---

## Next Steps

1. ✅ **Execute Supabase SQL:** Completed via Python script
2. **Sync to Google Sheets:** If using the registry sync script, run it to update Google Sheets
3. **Create Kajabi Offer (Optional):** If you need a Kajabi offer for email automation, create it with code `LDGD04`
4. **Update Product ID:** Once Kajabi product is created, update the `Kajabi Product ID` field in the products registry

---

## Related Documentation

- **Products Registry:** Google Sheet (workbook ID in `pal-mcp-server/docs/snooze-operations-workbook.md`); synced copy: root `docs/operations/KAJABI-PRODUCTS-REGISTRY.md`
- **Registry Workflow:** Root `docs/operations/REGISTRY-SYSTEM-WORKFLOW.md`
- **Naming Conventions:** Root or strategy-ops `docs/operations/SNOOZE-NAMING-CONVENTIONS.md`
- **Content Source:** 5-12 Month Sleep Course content

---

**Registration Complete:** ✅  
**Ready for Use:** ✅  
**Supabase Sync:** ✅ Complete (ID: `7b1b77c7-9319-41f9-b699-ef1f595df11e`)
