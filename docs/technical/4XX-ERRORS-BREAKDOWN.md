# 4xx Errors Breakdown & Fix Plan

**Date:** January 2025  
**Source:** `docs/technical/response_codes_internal_client_error_(4xx).csv`  
**Total Errors:** 24 URLs

---

## Error Categories

### 🔴 403 Forbidden Errors (9 URLs) - Intentional Security

These are likely **intentional** security restrictions. Review if they should be linked to publicly.

| URL | Inlinks | Status | Action Needed |
|-----|---------|--------|---------------|
| `/login` | 79 | 403 Forbidden | ✅ **OK** - Protected page, remove public links or change to signposting |
| `/offers/6iRarwak/checkout` | 16 | 403 Forbidden | ✅ **OK** - Checkout page, should be protected |
| `/offers/4zHPSRCs/checkout` | 2 | 403 Forbidden | ✅ **OK** - Checkout page, protected |
| `/offers/jRxWAnVo/checkout` | 0 | 403 Forbidden | ⚠️ **Review** - No inlinks, may be old/unused |
| `/offers/mwiSia6A/checkout` | 0 | 403 Forbidden | ⚠️ **Review** - No inlinks, may be old/unused |
| `/offers/omMcVgAi/checkout` | 1 | 403 Forbidden | ⚠️ **Review** - Check if offer is still active |
| `/offers/N8v8eFEe/checkout` | 0 | 403 Forbidden | ⚠️ **Review** - No inlinks, may be old/unused |
| `/offers/maowxKB6/checkout` | 0 | 403 Forbidden | ⚠️ **Review** - No inlinks, may be old/unused |
| `/offers/W2PyqL2X/checkout` | 0 | 403 Forbidden | ⚠️ **Review** - No inlinks, may be old/unused |
| `/offers/HbGyz97H/checkout` | 0 | 403 Forbidden | ⚠️ **Review** - No inlinks, may be old/unused |

**Action Items:**
- [ ] Verify `/login` - 79 inlinks is high, check if these should be public links
- [ ] Review unused checkout offers (0 inlinks) - remove or update if obsolete
- [ ] Keep active checkout URLs as-is (protected is correct)

---

### 🔴 404 Not Found Errors (14 URLs) - Broken Links

These are **actual broken links** that need to be fixed.

| URL | Inlinks | Status | Likely Issue | Action |
|-----|---------|--------|--------------|--------|
| `/terms` | 4 | 404 | **ACTUALLY LIVE** ✅ | ✅ **UPDATE LINKS** - Exists at `/terms-conditions`, update footer links |
| `/privacy` | 4 | 404 | **INCLUDED IN TERMS** ✅ | ✅ **UPDATE LINKS** - Privacy in Terms page, update footer links |
| `/account` | 4 | 404 | Account page missing | ⚠️ **Review** - May redirect to login |
| `/coaching` | 4 | 404 | **ACTUALLY LIVE** ✅ | ✅ **UPDATE LINKS** - Exists at `/one-on-one-sleep-consultations`, update footer links |
| `/recommended-products` | 6 | 404 | Products page missing | ⚠️ **Review** - May need to create or remove links |
| `/the-snooze-method` | 2 | 404 | Method page hidden/coming soon | ✅ **OK** - May be intentional (coming soon) |
| `/5-12-month-baby-sleep-help` | 3 | 404 | **ACTUALLY LIVE** ✅ | ✅ **UPDATE LINKS** - Page exists, update internal links |
| `/toddler-sleep-help` | 2 | 404 | **ACTUALLY LIVE** ✅ | ✅ **UPDATE LINKS** - Page exists, update internal links |
| `/3-4-month-baby-sleep-course` | 3 | 404 | Age page URL changed | 🔧 **Fix** - Update to correct URL |
| `/product/5-12-Month-Baby-Sleep-Guide` | 12 | 404 | Product URL changed | 🔧 **Fix** - Update to correct URL |
| `/about` | 1 | 404 | About page URL changed | 🔧 **Fix** - Update to `/about-sally` |
| `/product/catnapping-guide-free` | 3 | 404 | Product URL changed | 🔧 **Fix** - Update to correct URL |
| `/the-snooze-social-membership` | 0 | 404 | Old membership page | ⚠️ **Review** - Remove if obsolete |

**Action Items:**
- [ ] **Create missing pages:**
  - [ ] Terms of Service page (`/terms`)
  - [ ] Privacy Policy page (`/privacy`)
  - [ ] Review if `/coaching` page is needed

- [ ] **Update broken links to correct URLs:**
  - [ ] `/5-12-month-baby-sleep-help` → Find correct age page URL
  - [ ] `/toddler-sleep-help` → Find correct age page URL  
  - [ ] `/3-4-month-baby-sleep-course` → Find correct age page URL
  - [ ] `/product/5-12-Month-Baby-Sleep-Guide` → Find correct product URL
  - [ ] `/about` → Update to `/about-sally`
  - [ ] `/product/catnapping-guide-free` → Find correct product URL

- [ ] **Review/remove obsolete pages:**
  - [ ] `/account` - May redirect to login (check if needed)
  - [ ] `/recommended-products` - Remove links or create page
  - [ ] `/the-snooze-social-membership` - Remove if obsolete

---

### 🔴 415 Unsupported Media Type (1 URL) - Image Error

| URL | Inlinks | Status | Issue | Action |
|-----|---------|--------|-------|--------|
| `/wp-content/uploads/2022/06/SC-image-dressing-1024x1024.jpg` | 0 | 415 | Old WordPress image path | 🔧 **Fix** - Update image URL or remove if unused |

**Action Items:**
- [ ] Find where this old WordPress image is referenced
- [ ] Update to new Kajabi image URL or remove reference
- [ ] Note: 0 inlinks means may already be fixed, but URL still exists

---

## Fix Priority

### ✅ High Priority (Fix Before Launch)

1. **Create missing legal pages:**
   - `/terms` (4 inlinks - in footer)
   - `/privacy` (4 inlinks - in footer)

2. **Fix broken age page links:**
   - `/5-12-month-baby-sleep-help` (3 inlinks)
   - `/toddler-sleep-help` (2 inlinks)
   - `/3-4-month-baby-sleep-course` (3 inlinks)

3. **Fix broken product link:**
   - `/product/5-12-Month-Baby-Sleep-Guide` (12 inlinks - highest priority!)

4. **Fix about page link:**
   - `/about` → Update to `/about-sally` (1 inlink)

### ⚠️ Medium Priority (Fix Soon)

5. **Review account/coaching pages:**
   - `/account` (4 inlinks)
   - `/coaching` (4 inlinks)

6. **Review product links:**
   - `/recommended-products` (6 inlinks)
   - `/product/catnapping-guide-free` (3 inlinks)

7. **Review login page links:**
   - `/login` has 79 inlinks - verify if this should be publicly linked

### 🔵 Low Priority (Review Only)

8. **Review checkout offers:**
   - Several unused checkout URLs (0 inlinks)

9. **Review coming soon pages:**
   - `/the-snooze-method` - May be intentionally hidden

---

## Next Steps

1. [ ] Export inlinks for each broken URL from Screaming Frog
   - Shows exactly which pages link to the broken URLs
   - Go to: Right-click URL → View Inlinks

2. [ ] Create/fix high-priority pages
   - Terms, Privacy, age pages, product pages

3. [ ] Update all internal links
   - Fix broken URLs in HTML files
   - Update navigation/footer links

4. [ ] Set up redirects if needed
   - For URL changes (e.g., `/about` → `/about-sally`)
   - In Kajabi: Settings → Redirects

5. [ ] Verify fixes
   - Re-crawl with Screaming Frog
   - Confirm 404 errors are resolved

---

**Last Updated:** January 2025

