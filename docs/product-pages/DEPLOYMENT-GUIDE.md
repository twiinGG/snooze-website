# Product Page Duplication - Deployment Guide

**Date:** December 07, 2025  
**Status:** ✅ Complete - Ready for Deployment  
**Project:** Product Page Duplication for All Snooze Courses

---

## 📋 Project Summary

Successfully duplicated the proven 3-4 Month Course landing page layout to create landing pages for all 4 Snooze courses:

1. **5-12 Month Guide** - Updated with new layout
2. **Toddler Toolkit** - New landing page
3. **The Snooze Method** - New landing page
4. **Newborn Sleep Guide** - New landing page (guide format)

---

## 📁 Generated Files

### HTML Landing Pages
**Location:** `projects/snooze-website/kajabi-deployment/pages/product-pages/generated-html-pages/`

- ✅ `3-4-month-course-landing-page.html` (Template/Original)
- ✅ `5-12-month-guide-landing-page.html` (13KB)
- ✅ `toddler-toolkit-landing-page.html` (15KB)
- ✅ `snooze-method-landing-page.html` (14KB)
- ✅ `newborn-guide-landing-page.html` (18KB)

### Generated Content (Phase 2)
**Location:** `projects/snooze-website/kajabi-deployment/pages/product-pages/GENERATED-CONTENT/`

- Module summaries: `module-summaries/*-module-summaries.md`
- Course content: `*-content.md`
- Generation summary: `generation-summary.json`

### QA Reports
**Location:** `projects/snooze-website/kajabi-deployment/pages/product-pages/generated-html-pages/`

- `qa-report.json` - Full QA report with scores and issues
- All pages: **100/100 QA Score** ✅

---

## 🚀 Deployment Instructions

### Step 1: Review Generated Pages

Before deploying, review each HTML file to ensure:
- [ ] Content looks correct
- [ ] Module summaries are accurate
- [ ] URLs are correct
- [ ] Pricing information is accurate

### Step 2: Deploy to Kajabi

For each course:

1. **Log into Kajabi**
2. **Navigate to:** Website → Pages
3. **Find the course page** (or create new if needed)
4. **Open the page editor**
5. **Copy HTML content** from generated file
6. **Paste into Kajabi code block** (or HTML section)
7. **Update page settings:**
   - SEO Title (from HTML comments)
   - SEO Description (from HTML comments)
   - Page URL (verify matches HTML comment)

### Step 3: Verify Deployment

After deploying each page:

- [ ] Page loads correctly
- [ ] All sections display properly
- [ ] Module accordions work (click to expand)
- [ ] Links work (checkout buttons, etc.)
- [ ] Mobile responsive
- [ ] SEO meta tags are set in Kajabi settings

### Step 4: Test Checkout Flow

- [ ] Click "Enroll Now" / checkout button
- [ ] Verify correct product/price loads
- [ ] Test complete checkout process

---

## 📊 Course URLs & Pricing

### 5-12 Month Course
- **URL:** `https://joinsnooze.com/5-12-month-baby-sleep-course`
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Modules:** 6
- **Lessons:** 23
- **Note:** This is a COURSE (not a guide). The old downloadable guide still exists separately at: `https://joinsnooze.com/downloads/baby-sleep-guide-5-to-12-months`

### Toddler Toolkit
- **URL:** `https://joinsnooze.com/toddler-toolkit`
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Modules:** 7
- **Lessons:** 25

### The Snooze Method
- **URL:** `https://joinsnooze.com/snooze-method`
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Modules:** 4
- **Lessons:** 16

### Newborn Sleep Guide
- **URL:** `https://joinsnooze.com/newborn-sleep-guide`
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Format:** Guide (9 sections) - Will upgrade to course later
- **Note:** Adapted from course template to guide format

---

## ✅ Quality Assurance Results

**All pages passed QA with 100/100 scores:**

- ✅ **Tone of Voice:** 100/100 (no violations, positive patterns detected)
- ✅ **Technical Accuracy:** 100/100 (module counts, lesson counts, URLs verified)
- ✅ **HTML Structure:** 100/100 (all sections present, accordion structure correct)
- ✅ **Content Accuracy:** 100/100 (matches generated content from Phase 2)

**Issues Fixed:**
- ✅ Removed 26 em dashes (—) across all pages
- ✅ All tone violations resolved
- ✅ HTML structure verified

---

## 🔧 Scripts Created

### Content Generation
- `scripts/generate_content_claude.py` - Generates content using Claude Opus 4.5
- **Usage:** `python3 generate_content_claude.py`
- **Output:** `GENERATED-CONTENT/` directory

### HTML Generation
- `scripts/generate_html_pages_gemini.py` - Generates HTML pages using Gemini 3 Pro
- **Usage:** `python3 generate_html_pages_gemini.py`
- **Output:** `generated-html-pages/` directory

### Quality Assurance
- `scripts/qa_review.py` - Comprehensive QA review
- **Usage:** `python3 qa_review.py`
- **Output:** `qa-report.json`

### Tone Fixes
- `scripts/fix_tone_issues.py` - Fixes em dashes and tone violations
- **Usage:** `python3 fix_tone_issues.py`
- **Output:** Updated HTML files

---

## 📝 Content Sources

### Generated Content (Phase 2)
All content was generated using:
- **Model:** Claude Opus 4.5 (`claude-opus-4-5-20251101`)
- **Tone of Voice:** Based on `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **Course Data:** From `COURSE-DATA-COLLECTION.md`

### HTML Generation (Phase 3)
All HTML was generated using:
- **Model:** Gemini 3 Pro
- **Template:** `3-4-month-course-landing-page.html`
- **Content:** From Phase 2 generated content

---

## 🔄 Future Updates

### When Course Content Changes

1. **Update Course Data:**
   - Edit `COURSE-DATA-COLLECTION.md` with new module/lesson counts
   - Update module descriptions if needed

2. **Regenerate Content:**
   - Run `generate_content_claude.py` to regenerate content
   - Review generated content for accuracy

3. **Regenerate HTML:**
   - Run `generate_html_pages_gemini.py` to regenerate HTML
   - Run `qa_review.py` to verify quality
   - Fix any issues with `fix_tone_issues.py`

4. **Deploy Updates:**
   - Copy updated HTML to Kajabi
   - Verify changes display correctly

### When New Courses Are Added

1. **Add Course Data:**
   - Add new course to `COURSE-DATA-COLLECTION.md`
   - Add course config to `generate_content_claude.py`
   - Add course config to `generate_html_pages_gemini.py`

2. **Generate Content:**
   - Run content generation script
   - Review and refine content

3. **Generate HTML:**
   - Run HTML generation script
   - Run QA review
   - Fix any issues

4. **Deploy:**
   - Deploy to Kajabi following deployment instructions

---

## 📚 Reference Documents

### Project Documentation
- `PRODUCT-PAGE-DUPLICATION-PROJECT.md` - Complete project plan
- `COURSE-DATA-COLLECTION.md` - Course data and structure
- `GEMINI-PROMPT-TEMPLATES.md` - Prompt templates (for reference)

### Strategy Documents
- `docs/strategy/SNOOZE-TONE-OF-VOICE.md` - Tone of voice guidelines
- `docs/strategy/SNOOZE-PRICING-STRATEGY.md` - Pricing information
- `docs/technical/URL-REFERENCE.md` - URL reference (if exists)

### Template
- `3-4-month-course-landing-page.html` - Base template used for all pages

---

## ⚠️ Important Notes

### Newborn Guide Format
- **Current Status:** Guide format (downloadable PDF)
- **Future:** Will be upgraded to full course format
- **Landing Page:** Adapted from course template to guide format
- **Note:** When upgraded to course, landing page will need to be regenerated

### Pricing
- All courses: **$117 Launch / $129 BAU**
- Pricing is consistent across all pages
- Verify pricing in Kajabi matches HTML content

### URLs
- All URLs verified against course data
- URLs are in HTML comments at top of each file
- Update Kajabi page URLs to match

### SEO Meta Tags
- SEO titles and descriptions are in HTML comments
- **Must be manually added to Kajabi page settings**
- Do not rely on HTML comments for SEO (Kajabi uses page settings)

---

## 🎯 Success Criteria

✅ **All 4 landing pages generated**  
✅ **All pages pass QA (100/100)**  
✅ **Tone of voice compliant**  
✅ **Technical accuracy verified**  
✅ **HTML structure correct**  
✅ **Content matches course data**  
✅ **Ready for deployment**

---

## 📞 Support

If issues arise during deployment:
1. Check QA report: `generated-html-pages/qa-report.json`
2. Review generated content: `GENERATED-CONTENT/`
3. Compare with template: `3-4-month-course-landing-page.html`
4. Check course data: `COURSE-DATA-COLLECTION.md`

---

**Last Updated:** December 07, 2025  
**Status:** ✅ Complete - Ready for Deployment

