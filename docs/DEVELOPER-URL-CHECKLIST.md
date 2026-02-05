# Developer URL Checklist

**Purpose:** Quick reference checklist for developers to ensure all URLs are correct before deployment.

**⚠️ CRITICAL:** Never use placeholder URLs. Always find and use actual URLs.

---

## Pre-Deployment Checklist

Before deploying any page or component:

- [ ] **All URLs verified:** Checked against `docs/technical/URL-REFERENCE.md`
- [ ] **No placeholder URLs:** No `#`, `placeholder-url`, `example.com`, or similar
- [ ] **All images uploaded:** Images uploaded to Kajabi OR using existing site image URLs
- [ ] **Checkout URLs correct:** Using correct offer ID from URL-REFERENCE.md
- [ ] **Internal links tested:** All internal links work and point to correct pages
- [ ] **External links verified:** All external links are valid and working

---

## URL Discovery Process

If you encounter a URL that's not in `docs/technical/URL-REFERENCE.md`:

1. **Search existing site:** Check `https://joinsnooze.com` for the page/resource
2. **Check Kajabi backend:** Look in Kajabi admin for the correct URL
3. **Check sitemap:** Review sitemap for all available pages
4. **Check scraped data:** Query Supabase `page_scrape_data` table for URLs
5. **Update reference:** Add any new URLs found to `docs/technical/URL-REFERENCE.md`
6. **Document blocker:** If URL can't be found, document it as a blocker and ask for clarification

**NEVER:**
- ❌ Use placeholder URLs like `#` or `placeholder-url`
- ❌ Use example URLs like `example.com/page`
- ❌ Leave URLs as TODO comments
- ❌ Assume a URL structure without verifying

**ALWAYS:**
- ✅ Use actual URLs from URL-REFERENCE.md
- ✅ Verify URLs work before deployment
- ✅ Test all links after implementation
- ✅ Update URL-REFERENCE.md with new URLs found

---

## Image URL Guidelines

**Images must be:**
1. **Uploaded to Kajabi first** - Get the Kajabi-hosted URL
2. **OR use existing site images** - Copy URL from existing site
3. **Never use placeholders** - No `placeholder.jpg`, `image.png`, etc.

**Process:**
1. Upload image to Kajabi
2. Copy the Kajabi-hosted URL
3. Use that URL in your HTML
4. Document the image URL in your code comments

---

## Common URL Patterns

### Checkout URLs
- **Primary:** `https://joinsnooze.com/offers/6iRarwak/checkout`
- **Pattern:** `/offers/{offer-id}/checkout` or `/offers/{offer-id}`

### Course URLs
- **Pattern:** `/products/{course-slug}`
- **Example:** `/products/the-snooze-method`

### Download URLs
- **Pattern:** `/downloads/{guide-slug}`
- **Example:** `/downloads/catnapping-guide`
- **Note:** `/downloads/newborn-sleep-guide-by-the-sleep-concierge` has been superseded by `/products/newborn-sleep-guide` (course product version)

### Community URLs
- **Community:** `/products/communities/v2/snooze`
- **Library:** `/products/communities/v2/snooze/library`

---

## Quick Reference

**Primary Documents:**
- **URL Reference:** `docs/technical/URL-REFERENCE.md` - Complete URL list
- **This Checklist:** `docs/DEVELOPER-URL-CHECKLIST.md` - Quick reference

**If URL Missing:**
1. Check URL-REFERENCE.md
2. Search existing site
3. Check Kajabi backend
4. Document as blocker
5. Ask for clarification

---

**Remember:** Real URLs only. No placeholders. Always verify.




