# SEO Audit Action Plan - Screaming Frog Issues

**Date Created:** January 2025  
**Source:** `docs/technical/issues_overview_report.csv`  
**Status:** ARCHIVED — January 2025 audit history; do not use as current deployment authority

> Current navigation authority is `kajabi-deployment/PASTE-MAP.md` A6/A7. The live site uses the
> native Header; `pages/navigation.html` does not exist and `global/html/navigation.html` is not a
> deployment or rollback target.

Use this checklist to track progress on fixing SEO issues identified by Screaming Frog audit.

---

## 🔴 PHASE 1: CRITICAL FIXES (Do Before Launch)

### 1. Fix Internal 4xx Errors (24 URLs) - HIGH PRIORITY

**📋 See detailed breakdown:** `docs/technical/4XX-ERRORS-BREAKDOWN.md`

- [x] Export 4xx error list from Screaming Frog
  - ✅ Export location: `docs/technical/response_codes_internal_client_error_(4xx).csv`
  
- [x] Review and categorize broken links
  - ✅ 14 URLs are 404 (Page Not Found) - **Need to fix**
  - ✅ 9 URLs are 403 (Forbidden) - Mostly intentional security
  - ✅ 1 URL is 415 (Unsupported Media Type) - Old image reference

#### High Priority Fixes (14 broken links)

**Legal Pages - Update Links (NOT Create Pages):**
- [x] Terms page EXISTS at `/terms-conditions` (live at https://joinsnooze.com/terms-conditions)
- [ ] Review content accuracy (see `docs/Core Content/Website Terms and Conditions.html`)
  - Content matches live page ✅
  - Last updated: November 2024
  - Privacy Policy included in terms content ✅
  - **Policy Reference:** See `docs/strategy/TERMS-AND-CONDITIONS-POLICY.md` for review guidelines
  - **Action Required:** Update brand references "The Sleep Concierge" → "Snooze" (per unification strategy)
- [ ] Update footer links from `/terms` → `/terms-conditions` (4 inlinks in footer)
  - File: `pages/footer.html`
  - Also check: `pages/navigation.html`, all age pages

- [x] Privacy Policy is INCLUDED in Terms page content
- [ ] Update footer links from `/privacy` → `/terms-conditions#privacy` (4 inlinks)
  - OR create separate `/privacy` page if preferred
  - Decision needed: Keep combined or separate?

- [x] Coaching page EXISTS at `/one-on-one-sleep-consultations` (live)
- [x] Update footer/nav links from `/coaching` → `/one-on-one-sleep-consultations` (6 inlinks total)
  - ✅ Updated: `pages/footer.html`
  - ✅ Updated: `pages/about-sally/about-sally-complete.html`
  - ✅ Updated: All 4 age pages (toddler, 5-12-month, 3-4-month, newborn)
  - ✅ Navigation file checked - no coaching link found
- [ ] Review and update coaching page design/content to match new strategy
  - **See:** `docs/technical/COACHING-PAGE-REVIEW.md` for detailed checklist
  - **Live Page:** https://joinsnooze.com/one-on-one-sleep-consultations
- [x] Update contact page design to match unified Snooze design system ✅
  - ✅ Contact page HTML created with unified design
  - ✅ Styles migrated to unified theme CSS (`snooze-unified-theme.css`)
  - ✅ Section classes added to CSS whitelist (prevents spacing reset)
  - ✅ Kajabi form embed integrated
  - **Location:** `projects/snooze-website/kajabi-deployment/pages/contact/contact-page-complete.html`
  - **Live Page:** https://joinsnooze.com/contact ✅ LIVE
  - **See:** `projects/snooze-website/kajabi-deployment/pages/contact/README.md` for details

**Update Links to Live Pages (These Are NOT Broken):**
- [x] `/5-12-month-baby-sleep-help` - **LIVE** ✅
  - [ ] Verify exact URL structure in Kajabi
  - [ ] Update 3 internal links to use correct URL
  - [ ] Check if needs redirects for old URLs

- [x] `/toddler-sleep-help` - **LIVE** ✅
  - [ ] Verify exact URL structure in Kajabi
  - [ ] Update 2 internal links to use correct URL
  - [ ] Check if needs redirects for old URLs

**Actual Broken Links to Fix:**
- [ ] Fix `/product/5-12-Month-Baby-Sleep-Guide` → Find correct product URL (12 inlinks - **HIGHEST PRIORITY**)
  - Guide page exists (see screenshot: `docs/Core Content/5-12 month guide page screenshot.png`)
  - Determine correct Kajabi product/offer URL
  - Update all 12 internal links

- [ ] Fix `/3-4-month-baby-sleep-course` → Find correct course URL (3 inlinks)
  - Course page exists (see screenshot: `docs/Core Content/3-4 month course landing page screenshot.png`)
  - Determine correct Kajabi course/offer URL
  - Update 3 internal links

- [ ] Fix `/about` → Update to `/about-sally` (1 inlink)
  - Simple redirect or link update

- [ ] Fix `/product/catnapping-guide-free` → Determine strategy (3 inlinks)
  - Draft page exists (see screenshot: `docs/Core Content/Catnapping guide landing page screenshot.png`)
  - Decision: Keep as lead magnet or integrate into guides/library?
  - If keeping: Find/create correct URL
  - If removing: Update/remove 3 internal links

- [ ] Fix old WordPress image: `/wp-content/uploads/2022/06/SC-image-dressing-1024x1024.jpg` (0 inlinks)
  - May already be fixed (0 inlinks)
  - Search codebase for any remaining references

**Strategic Decisions Needed:**
- [ ] Review `/recommended-products` - Determine UX placement (6 inlinks)
  - Current: List of referral codes for baby sleep products
  - High-performing blog posts with referral links exist
  - Decision options:
    1. Create dedicated products page (integrated into library/navigation)
    2. Integrate into blog/library as resource section
    3. Keep as blog post category/archive
  - Action: Decide strategy → Create/update page → Update 6 internal links

- [ ] Review `/the-snooze-social-membership` - Old sales page (0 inlinks)
  - Old website sales page exists (see screenshot: `docs/Core Content/snooze social sales page screenshot.png`)
  - Current: Welcome page exists (see: `docs/Core Content/welcome to snooze social page.png`)
  - Decision:
    1. Update old sales page to match new strategy
    2. Redirect to new Snooze Social sales page
    3. Remove if obsolete
  - Action: Decide strategy → Implement

- [ ] Review `/account` - May redirect to login (4 inlinks)
  - Check if Kajabi auto-redirects to login
  - If yes: Keep links as-is
  - If no: Create account page or redirect

**Review Product-Specific Terms & Conditions:**
- [x] 3-4 Month Course Terms - Exists at `/3-4-month-baby-sleep-course-terms-and-conditions`
  - File: `docs/Core Content/3-4 Month Sleep Course Terms and Conditions.html`
  - References main terms: https://joinsnooze.com/terms-conditions/
  - Decision needed: Keep product-specific terms or consolidate?

- [x] Snooze Social Terms - Exists at `/snooze-social-terms-and-conditions`
  - File: `docs/Core Content/Snooze Social Terms and Conditions.html`
  - Decision needed: Keep product-specific terms or consolidate?

- [x] **Policy Created:** See `docs/strategy/TERMS-AND-CONDITIONS-POLICY.md` for full policy and SOP
- [ ] Review necessity of product-specific terms
  - **Recommendation:** Consolidate into main terms with sections (unified brand approach)
  - **Rationale:** Snooze operates as unified membership; separate terms add complexity
  - **Exception:** Maintain product-specific sections for unique policies (refunds, IP)
- [ ] Update product pages to link to appropriate terms
  - Main terms: `/terms-conditions`
  - Product sections: `/terms-conditions#course-terms` (if consolidated)
- [ ] Ensure all terms are current and consistent
- [ ] Update brand references: "The Sleep Concierge" → "Snooze" in terms

**Note:** See detailed breakdown with file locations in `docs/technical/4XX-ERRORS-BREAKDOWN.md`

**403 Forbidden (Intentional - Review Only):**
- [ ] Review `/login` - 79 inlinks, verify if should be publicly linked
- [ ] Review unused checkout offers (7 URLs with 0 inlinks - may be obsolete)

- [ ] Fix broken internal links
  - [ ] Update links to correct URLs in HTML files
    - Footer: `pages/footer.html`
    - Navigation: Kajabi native Header; verify `kajabi-deployment/global/native-header-call-to-action.json`
    - Age pages: All files in `pages/age-pages/`
  - [ ] Remove links to deleted pages
  - [ ] Add 301 redirects where needed (in Kajabi: Settings → Redirects)
    - `/terms` → `/terms-conditions`
    - `/privacy` → `/terms-conditions#privacy` (or create separate page)
    - `/coaching` → `/one-on-one-sleep-consultations`
    - `/about` → `/about-sally`
    - Old product URLs → New product URLs

- [ ] Verify fixes
  - [ ] Re-crawl with Screaming Frog
  - [ ] Confirm 404 errors are resolved

**Time Estimate:** 3-4 hours (includes strategic decisions)  
**Priority:** 🔴 Critical

---

### 2. Review Canonical URLs (11 URLs) - HIGH PRIORITY

- [ ] Export canonical URL list from Screaming Frog
  - Go to: Filter → Canonicals → Canonicalised
  - Export the list of pages

- [ ] Review each canonical tag
  - [ ] Verify canonical URLs point to correct canonical version
  - [ ] Check if canonicalization is intentional (duplicate content prevention)
  - [ ] Identify any incorrect canonical tags

- [ ] Update internal links
  - [ ] Update links to point directly to canonical URLs (skip redirects)
  - [ ] Remove links to non-canonical versions

- [ ] Fix incorrect canonical tags
  - [ ] Update canonical tags in Kajabi page settings if needed
  - [ ] Or update in HTML if using custom canonical tags

**Time Estimate:** 30-60 minutes  
**Priority:** 🔴 Critical

---

### 3. Add Missing Image Alt Text (34 images) - HIGH PRIORITY

- [ ] Export image alt issues from Screaming Frog
  - Go to: Images → Missing Alt Text (14 images)
  - Go to: Images → Missing Alt Attribute (20 images)
  - Export both lists with page locations

- [ ] Review each image
  - [ ] Categorize as informational or decorative
  - [ ] Write descriptive alt text for informational images
  - [ ] Mark decorative images for `alt=""`

- [ ] Add alt attributes/text
  - [ ] Update HTML files with descriptive alt text
  - [ ] Add `alt=""` for decorative images
  
- [ ] Verify fixes
  - [ ] Spot check pages with fixed images
  - [ ] Re-crawl to confirm alt attributes are present

**Time Estimate:** 1-2 hours  
**Priority:** 🔴 Critical (Accessibility)

---

## 📐 PHASE 1.5: CONTENT & DESIGN STRATEGY (Do Before Launch)

### 15. Update Guide/Course Page Designs to Match Strategy

**Pages in Draft Mode Needing Updates:**

- [ ] **5-12 Month Guide Page**
  - Screenshot: `docs/Core Content/5-12 month guide page screenshot.png`
  - Status: Draft mode
  - Action: Update design and content to match new holistic UX strategy
  - Align with: Home page design, brand guidelines, user journey

- [ ] **3-4 Month Course Page**
  - Screenshot: `docs/Core Content/3-4 month course landing page screenshot.png`
  - Status: Draft mode
  - Action: Update design and content to match new holistic UX strategy
  - Ensure consistency with other course pages
  - Review terms link: Currently links to `/terms-conditions` ✅

- [ ] **Catnapping Guide Page**
  - Screenshot: `docs/Core Content/Catnapping guide landing page screenshot.png`
  - Status: Draft mode
  - Decision: Determine if needed
    - Option 1: Keep as lead magnet (free guide)
    - Option 2: Integrate into library/guides section
    - Option 3: Remove if redundant
  - If keeping: Update design/content to match strategy
  - Action: Make decision → Update or remove

- [ ] **Snooze Social Sales Page**
  - Old page: `docs/Core Content/snooze social sales page screenshot.png`
  - New welcome page: `docs/Core Content/welcome to snooze social page.png`
  - Status: Old sales page needs updating
  - Action: Update to match new strategy or redirect to new page

**Content Strategy Alignment:**
- [ ] Review all draft pages against:
  - [ ] New brand guidelines
  - [ ] Holistic user experience strategy
  - [ ] Design system consistency
  - [ ] Navigation and user journey flow

- [ ] Ensure consistent messaging:
  - [ ] Value propositions
  - [ ] Call-to-action placement
  - [ ] Social proof integration
  - [ ] Trust signals

**Time Estimate:** 6-8 hours (design + content updates)  
**Priority:** 🔴 Critical (affects user experience)

---

## 🟡 PHASE 2: IMPORTANT SEO FIXES (Do Before Launch)

### 4. Optimize Meta Descriptions (42 over limit, 15 duplicates)

- [ ] Export meta description issues from Screaming Frog
  - Go to: Meta Description → Over 155 Characters (42 pages)
  - Go to: Meta Description → Over 985 Pixels (40 pages)
  - Go to: Meta Description → Duplicate (15 pages)

- [ ] Review current meta descriptions
  - [ ] Identify which are too long
  - [ ] Identify duplicate descriptions
  - [ ] Note pages that need unique descriptions

- [ ] Write optimized meta descriptions
  - [ ] Keep under 155 characters
  - [ ] Make each unique
  - [ ] Include call-to-action where appropriate
  - [ ] Include primary keywords naturally

- [ ] Update meta descriptions
  - [ ] In Kajabi: Page Settings → SEO → Meta Description
  - [ ] Or in HTML: `<meta name="description" content="...">`

- [ ] Verify fixes
  - [ ] Re-crawl to confirm descriptions are optimized
  - [ ] Check for remaining duplicates

**Time Estimate:** 2-3 hours  
**Priority:** 🟡 High

---

### 5. Optimize Page Titles (Multiple issues)

- [ ] Export page title issues from Screaming Frog
  - Go to: Page Titles → Over 561 Pixels (21 pages)
  - Go to: Page Titles → Over 60 Characters (20 pages)
  - Go to: Page Titles → Duplicate (14 pages)
  - Go to: Page Titles → Below 30 Characters (3 pages)
  - Go to: Page Titles → Below 200 Pixels (1 page)

- [ ] Review current page titles
  - [ ] Identify which are too long
  - [ ] Identify duplicate titles
  - [ ] Identify titles that are too short

- [ ] Write optimized page titles
  - [ ] Keep under 60 characters (or ~561 pixels)
  - [ ] Make each unique
  - [ ] Include primary keyword
  - [ ] Expand titles that are too short

- [ ] Update page titles
  - [ ] In Kajabi: Page Settings → SEO → Page Title
  - [ ] Or in HTML: `<title>...</title>`

- [ ] Verify fixes
  - [ ] Re-crawl to confirm titles are optimized
  - [ ] Check for remaining duplicates

**Time Estimate:** 1-2 hours  
**Priority:** 🟡 High

---

### 6. Fix Heading Structure

- [ ] Export heading issues from Screaming Frog
  - Go to: Headings → Duplicate H1 (12 pages)
  - Go to: Headings → Duplicate H2 (24 pages)
  - Go to: Headings → Missing H2 (8 pages)
  - Go to: Headings → Non-Sequential (3 pages)
  - Go to: Headings → H1 Over 70 Characters (7 pages)
  - Go to: Headings → H2 Over 70 Characters (2 pages)

- [ ] Review heading structure
  - [ ] Identify pages with duplicate H1s
  - [ ] Identify pages with duplicate H2s
  - [ ] Identify pages missing H2s
  - [ ] Identify non-sequential heading hierarchies

- [ ] Fix heading issues
  - [ ] Ensure each page has a unique H1
  - [ ] Make H2s unique where possible
  - [ ] Fix heading hierarchy (H1 → H2 → H3, etc.)
  - [ ] Add H2s where missing
  - [ ] Shorten headings over 70 characters

- [ ] Update HTML files
  - [ ] Fix heading tags in HTML files
  - [ ] Ensure proper hierarchy

- [ ] Verify fixes
  - [ ] Re-crawl to confirm heading structure is correct

**Time Estimate:** 2-3 hours  
**Priority:** 🟡 High

---

## 🟢 PHASE 3: POST-LAUNCH IMPROVEMENTS (Can Do After Launch)

### 7. Add Image Size Attributes (59 images)

- [ ] Export image size issues from Screaming Frog
  - Go to: Images → Missing Size Attributes (59 images)
  - Export list with image URLs

- [ ] Identify image dimensions
  - [ ] Check actual image dimensions
  - [ ] Note width and height for each image

- [ ] Add size attributes
  - [ ] Add `width` and `height` attributes to `<img>` tags
  - [ ] Use native image dimensions

- [ ] Verify fixes
  - [ ] Check pages load without layout shift
  - [ ] Re-crawl to confirm size attributes are present

**Time Estimate:** 1-2 hours  
**Priority:** 🟢 Medium (Improves CLS)

---

### 8. Add Anchor Text to Internal Links (55 links)

- [ ] Export link issues from Screaming Frog
  - Go to: Links → Internal Outlinks With No Anchor Text (55 links)
  - Export list with page locations

- [ ] Review links without anchor text
  - [ ] Identify which links need descriptive anchor text
  - [ ] Note images that are links but missing alt text

- [ ] Add descriptive anchor text
  - [ ] Replace generic links with descriptive text
  - [ ] Add alt text to linked images

- [ ] Verify fixes
  - [ ] Review pages with updated links
  - [ ] Re-crawl to confirm anchor text is present

**Time Estimate:** 1-2 hours  
**Priority:** 🟢 Medium

---

### 9. Enhance Low Content Pages (8 pages)

- [ ] Export low content pages from Screaming Frog
  - Go to: Content → Low Content Pages (8 pages)
  - Export list

- [ ] Review each page
  - [ ] Identify why content is low
  - [ ] Determine what content should be added

- [ ] Add descriptive content
  - [ ] Add content to reach ~200+ words minimum
  - [ ] Ensure content is valuable and relevant
  - [ ] Include keywords naturally

- [ ] Verify improvements
  - [ ] Re-crawl to confirm word count increased
  - [ ] Review content quality

**Time Estimate:** 3-4 hours  
**Priority:** 🟢 Medium

---

### 10. Optimize Large Images (23 images over 100 KB)

- [ ] Export large images from Screaming Frog
  - Go to: Images → Over 100 KB (23 images)
  - Export list with file sizes

- [ ] Review image files
  - [ ] Identify which images need optimization
  - [ ] Check current file formats and sizes

- [ ] Optimize images
  - [ ] Compress images (reduce file size)
  - [ ] Convert to WebP format where possible
  - [ ] Resize images to actual display size
  - [ ] Use responsive images if needed

- [ ] Replace optimized images
  - [ ] Upload optimized versions
  - [ ] Update image URLs in HTML

- [ ] Verify improvements
  - [ ] Check file sizes are reduced
  - [ ] Verify images still look good
  - [ ] Test page load speed

**Time Estimate:** 1-2 hours  
**Priority:** 🟢 Medium (Improves page speed)

---

## 🔵 TECHNICAL/SERVER-SIDE ISSUES

### 11. Fix Protocol-Relative Links (67 URLs)

- [ ] Export protocol-relative links from Screaming Frog
  - Go to: Security → Protocol-Relative Resource Links (67 URLs)
  - Export list

- [ ] Run automated fix script
  - [ ] Use script: `projects/snooze-website/scripts/fix_seo_issues.py`
  - [ ] Review changes before committing

- [ ] Manually check remaining instances
  - [ ] Search codebase for `src="//` patterns
  - [ ] Search for `href="//` patterns
  - [ ] Search for `url(//` in CSS

- [ ] Replace with HTTPS
  - [ ] Change `src="//` to `src="https://`
  - [ ] Change `href="//` to `href="https://`
  - [ ] Change `url(//` to `url(https://`

- [ ] Verify fixes
  - [ ] Re-crawl to confirm protocol-relative links are gone
  - [ ] Test pages load correctly

**Time Estimate:** 30 minutes  
**Priority:** 🔵 Medium (Security)

---

### 12. Configure Security Headers (HSTS, X-Frame-Options)

- [ ] Review security header issues
  - Missing HSTS Header (67 URLs)
  - Missing X-Frame-Options Header (67 URLs)

- [ ] Contact Kajabi Support
  - [ ] Request HSTS header configuration
  - [ ] Request X-Frame-Options header configuration
  - [ ] Provide documentation/reasons for request

- [ ] Follow up with Kajabi
  - [ ] Check if headers can be configured at account level
  - [ ] Verify if headers need to be set per-page or globally

- [ ] Verify headers are active
  - [ ] Test headers using browser dev tools
  - [ ] Use online header checker tool
  - [ ] Re-crawl with Screaming Frog to confirm

**Time Estimate:** Contact support, follow-up required  
**Priority:** 🔵 Medium (Security)

---

### 13. Fix Unsafe Cross-Origin Links (2 URLs)

- [ ] Export unsafe links from Screaming Frog
  - Go to: Security → Unsafe Cross-Origin Links (2 URLs)
  - Export list with page locations

- [ ] Find links with target="_blank"
  - [ ] Check exported list
  - [ ] Search codebase for `target="_blank"` without `rel="noopener"`

- [ ] Add rel="noopener" attribute
  - [ ] Update links to include `rel="noopener noreferrer"`
  - [ ] Format: `<a href="..." target="_blank" rel="noopener noreferrer">`

- [ ] Verify fixes
  - [ ] Re-crawl to confirm rel attributes are present
  - [ ] Test links still open in new tabs

**Time Estimate:** 15 minutes  
**Priority:** 🔵 Low (Already mostly fixed)

---

## ⚪ URL CLEANUP (Evaluate Carefully)

### 14. URL Structure Issues (Requires Redirects)

These issues may require URL changes and 301 redirects. Evaluate each case carefully.

#### URL Parameters (22 URLs)
- [ ] Export URLs with parameters
- [ ] Evaluate if parameters are necessary
- [ ] Create plan for URL structure changes
- [ ] Implement 301 redirects if changing URLs
- **Note:** Only change if significant SEO benefit

#### URL Uppercase (21 URLs)
- [ ] Export URLs with uppercase characters
- [ ] Evaluate if changing to lowercase is needed
- [ ] Implement 301 redirects if changing URLs
- **Note:** URLs are case-sensitive, may cause duplicate content

#### URL Contains Space (4 URLs)
- [ ] Export URLs with spaces
- [ ] Replace spaces with hyphens
- [ ] Implement 301 redirects
- **Note:** Spaces in URLs can break links when shared

#### URL Underscores (4 URLs)
- [ ] Export URLs with underscores
- [ ] Replace underscores with hyphens
- [ ] Implement 301 redirects
- **Note:** Hyphens are better for SEO word separation

#### URL Over 115 Characters (1 URL)
- [ ] Export long URL
- [ ] Evaluate if URL can be shortened
- [ ] Implement 301 redirect if changing URL
- **Note:** Shorter URLs are user-friendly

**Time Estimate:** Requires careful analysis per case  
**Priority:** ⚪ Low (Only if significant SEO benefit)

---

## 📋 QUICK WINS (Do First)

### Automated Fixes

- [ ] Run automated fix script
  ```bash
  python projects/snooze-website/scripts/fix_seo_issues.py
  ```
  - Fixes protocol-relative links
  - Fixes double slashes in URLs
  - Adds rel="noopener" to target="_blank" links
  - Adds basic alt attributes

- [ ] Review script changes
  - [ ] Check what files were modified
  - [ ] Verify changes are correct
  - [ ] Test pages still work

**Time Estimate:** 15 minutes  
**Priority:** 🟢 Quick Win

---

## 📊 PROGRESS TRACKING

### Overall Progress

**Phase 1 - Critical Fixes:** [ ] 1/4 complete (25%)
  - 4xx Errors: [x] Partially complete (coaching links fixed, contact page done, remaining broken links identified)
  - Canonical URLs: [ ] 0/1
  - Image Alt Text: [ ] 0/1
  - Content/Design Strategy: [x] Partially complete (contact page done ✅, draft pages remain)
**Phase 2 - Important SEO:** [ ] 0/3 complete
**Phase 3 - Post-Launch:** [ ] 0/4 complete
**Technical Issues:** [x] 1/3 complete (contact page styling, canonical files established)
**URL Cleanup:** [ ] 0/1 complete
**Quick Wins:** [x] 1/1 complete (automated fixes partially done, rel="noopener" added)

**Total Progress:** ~15% complete

**Recent Session Completed:**
- ✅ Contact page design and deployment
- ✅ Canonical footer/navigation files established
- ✅ Footer and navigation alignment
- ✅ CSS styles unified for contact page

---

## 📝 NOTES

### Issues Fixed So Far
- ✅ Fixed double slash in about-sally hero image URL
- ✅ Added rel="noopener noreferrer" to social media links
- ✅ Added image size attributes to about-sally hero
- ✅ Verified Terms & Conditions page exists at `/terms-conditions`
- ✅ Verified Privacy Policy included in Terms content
- ✅ Verified Coaching page exists at `/one-on-one-sleep-consultations`
- ✅ Verified age pages are live (`/5-12-month-baby-sleep-help`, `/toddler-sleep-help`)
- ✅ Updated all `/coaching` links to `/one-on-one-sleep-consultations` (6 instances)
- ✅ Created and deployed contact page with unified design system
- ✅ Migrated contact page styles to unified theme CSS
- ✅ Established canonical footer and navigation files
- ✅ Footer terms link updated to `/terms-conditions`

### Strategic Decisions Needed
1. **Recommended Products Page:** Integrate into blog/library or create dedicated page?
2. **Catnapping Guide:** Keep as lead magnet or integrate into guides/library?
3. **Snooze Social Sales Page:** Update old page or redirect to new page?
4. **Product-Specific Terms:** Keep separate terms for 3-4 month course and Snooze Social, or consolidate?

### Terms & Conditions Review
- ✅ Main Terms page: Current and accurate (reviewed HTML file)
- ✅ Privacy Policy: Included in Terms content
- ⚠️ Product-specific terms: Need decision on consolidation strategy
  - 3-4 Month Course Terms: Exists, references main terms
  - Snooze Social Terms: Exists, separate document

### Pages in Draft Mode
- 5-12 Month Guide Page: Needs design/content update
- 3-4 Month Course Page: Needs design/content update
- Catnapping Guide Page: Decision needed on strategy

### Issues Requiring Kajabi Support
- Security headers (HSTS, X-Frame-Options)
- Canonical tag configuration options

### Files Updated (Broken Links)
- ✅ `projects/snooze-website/kajabi-deployment/pages/footer.html` - Updated coaching link, updated terms link to `/terms-conditions`
- ✅ `projects/snooze-website/kajabi-deployment/pages/about-sally/about-sally-complete.html` - Updated coaching link
- ✅ All age page files in `pages/age-pages/` - Updated coaching links (4 files)
- ✅ Navigation file checked - no coaching link present

### Canonical Files (Footer & Navigation)
- ✅ Created canonical footer file: `pages/footer.html` (source of truth for all footers)
- Superseded: the January 2025 `pages/navigation.html` convention is no longer authoritative; PASTE-MAP A6/native Header is current
- ✅ Removed embedded footer/navigation from complete page files (replaced with comments referencing canonical files)
- ✅ Footer alignment guide created: `FOOTER-ALIGNMENT-GUIDE.md`
- ✅ Canonical files reference guide created: `CANONICAL-FILES-NOTE.md`
- **Note:** All complete page files now reference canonical footer/navigation files to prevent conflicts

### Files for Review (Coaching Page)
- Live page: https://joinsnooze.com/one-on-one-sleep-consultations
- Review checklist: `docs/technical/COACHING-PAGE-REVIEW.md`

### Files Modified
- `projects/snooze-website/kajabi-deployment/pages/about-sally/section-01-hero.html`
- `projects/snooze-website/kajabi-deployment/pages/about-sally/about-sally-complete.html`
- `projects/snooze-website/kajabi-deployment/pages/snooze-home-page-blocks.html`
- `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`

---

## 🔗 RESOURCES

### Export Locations
- 4xx Errors: `docs/technical/response_codes_internal_client_error_(4xx).csv`
- Full Audit: `docs/technical/issues_overview_report.csv`
- Fixes Applied: `projects/snooze-website/docs/technical/SEO-FIXES-APPLIED.md`
- 4xx Breakdown: `docs/technical/4XX-ERRORS-BREAKDOWN.md`

### Content References
- Terms & Conditions: `docs/Core Content/Website Terms and Conditions.html`
- 3-4 Month Course Terms: `docs/Core Content/3-4 Month Sleep Course Terms and Conditions.html`
- Snooze Social Terms: `docs/Core Content/Snooze Social Terms and Conditions.html`
- Page Screenshots: `docs/Core Content/*.png`

### Scripts Available
- Automated Fixes: `projects/snooze-website/scripts/fix_seo_issues.py`

### Screaming Frog Export Locations
Save all exports to: `docs/technical/screaming-frog-exports/`

### Live Page URLs
- Terms: https://joinsnooze.com/terms-conditions
- Coaching: https://joinsnooze.com/one-on-one-sleep-consultations
- 5-12 Month: https://joinsnooze.com/5-12-month-baby-sleep-help
- Toddler: https://joinsnooze.com/toddler-sleep-help

---

## 🎯 NEXT DEV SESSION PRIORITIES

### Immediate Next Steps (High Priority)

1. **Complete Broken Link Fixes** (Phase 1, Task 1)
   - [ ] Update footer `/privacy` link (decision: separate page or anchor to terms)
   - [ ] Fix product/guide URLs:
     - `/product/5-12-Month-Baby-Sleep-Guide` (12 inlinks - HIGHEST PRIORITY)
     - `/3-4-month-baby-sleep-course` (3 inlinks)
     - `/product/catnapping-guide-free` (3 inlinks - needs strategy decision)
   - [ ] Fix `/about` → `/about-sally` (1 inlink)
   - [ ] Set up 301 redirects in Kajabi for old URLs

2. **Canonical URLs Review** (Phase 1, Task 2)
   - [ ] Export canonical URL list from Screaming Frog
   - [ ] Review each canonical tag for correctness
   - [ ] Update internal links to point to canonical URLs

3. **Image Alt Text** (Phase 1, Task 3)
   - [ ] Export missing alt text list (34 images)
   - [ ] Add descriptive alt text to informational images
   - [ ] Mark decorative images with `alt=""`

### Strategic Decisions Needed

4. **Product/Guide Page Strategy**
   - [ ] Determine strategy for Catnapping Guide (keep/remove/integrate)
   - [ ] Decide on Recommended Products page placement
   - [ ] Review Snooze Social sales page strategy

5. **Terms & Conditions**
   - [ ] Make final decision on privacy policy (separate vs combined)
   - [ ] Update footer `/privacy` link based on decision
   - [ ] Review product-specific terms consolidation

### Content/Design Updates

6. **Draft Pages**
   - [ ] Update 5-12 Month Guide page design/content
   - [ ] Update 3-4 Month Course page design/content
   - [ ] Update coaching page design/content (see review checklist)

**Recommended Session Flow:**
1. Start with broken link fixes (quick wins)
2. Export and review canonical URLs
3. Work through image alt text (systematic)
4. Make strategic decisions on remaining items
5. Begin content/design updates

---

**Last Updated:** January 2025  
**Next Review:** After next dev session
