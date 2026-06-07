# SOP & Copy Review Implementation Plan

**Purpose:** Guide for implementing VA SOP system and Sally's copy review workflow  
**Status:** Ready for Implementation  
**Created:** January 2026

---

## Overview

This plan outlines how to set up:
1. **VA SOP System** - Detailed step-by-step guides for Virtual Assistants to set up Free Modules in Kajabi
2. **Copy Review Workflow** - Process for Sally to review and approve all content before VA handoff

---

## Part 1: VA SOP System

### 1.1 Notion TSC Library Setup

**CRITICAL: Query Database Structure First**

**Action Items:**
1. **Query Existing Database Structure:**
   - Database ID: `fbfa224339594e1d8efeb8a070f8c772`
   - Use Notion API, UI inspection, or MCP connection
   - Document all properties and their types
   - See `NOTION-DATABASE-SETUP.md` for detailed instructions

2. **Map SOP Template to Database:**
   - Match `VA-SOP-TEMPLATE.md` fields to database properties
   - Ensure property names match exactly (case-sensitive)
   - Verify property types are compatible

3. **Create Template Page:**
   - Use existing database template (if available)
   - Or create new page matching database structure
   - Use `VA-SOP-TEMPLATE.md` as content guide

4. **For Each Bundle:**
   - Create new page in database
   - Fill in all required properties
   - Customize content with bundle-specific details
   - Fill in offer codes, URLs, and references
   - Mark as "Ready" when complete

### 1.2 SOP Customization Per Bundle

**For LMCR04 (Example):**

1. **Copy template** → Create new page: "LMCR04 - 5-12 Month Schedules Free Module Setup"

2. **Customize Section 1.1 (Clone Canon Course):**
   ```
   Canon Course: 5-12 Month Sleep Training Course
   Location: Products → Courses → "5-12 Month Sleep Training Course"
   ```

3. **Customize Section 1.4 (Unlock Target Module):**
   ```
   Unlocked Module: Module 3: Routines, Schedules & Feeding
   Specific Lessons: All lessons in this module
   ```

4. **Customize Section 2.1 (Create Ghost Offer):**
   ```
   Offer Name: Free Module - 5-12 Month Schedules
   Internal Name: LMCR04_OFR_Free-5-12M-Schedules
   Offer URL: https://www.joinsnooze.com/offers/2x92uaLF
   ```

5. **Add bundle-specific references:**
   - Link to `LMCR04-OFFER-REFERENCE.md`
   - Include exact file names
   - Add screenshots if helpful

### 1.3 VA Access & Training

**Setup:**
1. Share Notion database with VA (view/edit access)
2. Provide Kajabi admin access (with appropriate permissions)
3. Share GitHub links document (`LMCR##-GITHUB-LINKS.md`) - no repo access needed
4. Walk through first SOP together (LMCR04)
5. Demonstrate GitHub raw link copy-paste method
6. Have VA complete LMCR04 setup as training
7. Review and provide feedback
8. VA can then work independently on future bundles

**GitHub Access:**
- VA does NOT need GitHub account or repo access
- All files accessible via public raw links
- Links are always up-to-date (point to `main` branch)
- Simple copy-paste workflow

---

## Part 2: Copy Review Workflow

### 2.1 Copy Review Setup

**Choose Review Method:**

#### Option A: Google Docs (Recommended)

**Action Items:**
1. Create Google Docs template from `COPY-REVIEW-WORKFLOW.md` structure
2. Set up sharing permissions for Sally (Editor access)
3. Create folder: "Free Module Copy Reviews"
4. For each bundle:
   - Duplicate template
   - Fill in bundle-specific content
   - Share with Sally for review
   - Export as Markdown after approval

**Advantages:**
- Familiar editing experience (like Word)
- Built-in commenting system
- Easy export to Markdown
- No technical setup required

#### Option B: Notion (If MCP Available)

**Action Items:**
1. Create new database: "Free Module Copy Reviews"
2. Configure properties:
   - **Bundle Code** (Select)
   - **Status** (Select: Pending Review / In Review / Approved / Needs Revision)
   - **Reviewer** (Person: Sally)
   - **Review Deadline** (Date)
   - **Approved Date** (Date)
   - **VA Handoff Date** (Date)

3. Create template using structure from `COPY-REVIEW-WORKFLOW.md`
4. Set up MCP connection for content export after approval

**Advantages:**
- Integrated with other Notion workflows
- Can automate export via MCP
- Centralized with SOP database

### 2.2 Review Package Creation Process

**Automated (Ideal):**
- Script that generates Notion page from repo files
- Extracts HTML, creates previews, formats for review

**Manual (Current):**
1. Developer creates review package:
   - Open bundle folder: `src/content/bundles/LMCR##/`
   - Copy all HTML files
   - Create Notion page using template
   - Paste HTML into appropriate sections
   - Add context and file references

2. Share with Sally:
   - Send Notion link
   - Set review deadline
   - Request feedback

### 2.3 Sally's Review Process

**Setup:**
1. Sally receives Notion link
2. Reviews each section:
   - Course content
   - Email sequence
   - Thank you page
3. Uses Notion comments for feedback
4. Marks sections as approved/needs revision
5. Marks entire package as "Approved" when complete

**Tools for Sally:**
- Notion mobile app (for on-the-go review)
- Browser extension for HTML preview
- Or: Developer creates PDF previews for easier review

### 2.4 VA Package Generation

**Once Approved:**
1. Developer creates "VA-Ready" version:
   - Duplicate approved review page
   - Remove feedback/comment fields
   - Format for copy-paste
   - Add clear file references

2. Share with VA:
   - Link to VA-ready package
   - Include SOP link
   - Set deadline

---

## Part 3: Integration & Automation

### 3.1 Notion Automation (Optional)

**Setup Notion Automations:**
1. **When Review Status = "Approved":**
   - Create VA-ready package (duplicate page)
   - Notify VA
   - Update project tracker

2. **When Review Deadline Approaches:**
   - Send reminder to Sally (24 hours before)

3. **When VA Package Created:**
   - Add to VA task list
   - Set due date

### 3.2 File Management

**Current Structure:**
```
src/content/bundles/LMCR##/
  ├── LMCR##-product-metadata.md
  ├── html/
  │   ├── LMCR##-thank-you-access.html
  │   ├── LMCR##-module-1-lesson-1-[topic].html
  │   ├── LMCR##-module-1-lesson-2-[topic].html
  │   └── LMCR##-free-module-summary-upsell.html
  └── emails/
      ├── LMCR##-day-0-welcome.html
      ├── LMCR##-day-2-bigger-picture.html
      ├── LMCR##-day-4-snooze-pivot.html
      └── LMCR##-day-6-gentle-nudge.html
```

**For VA Access (Recommended):**
- **Option 1: GitHub Raw Links** (BEST - always up-to-date)
  - Create `LMCR##-GITHUB-LINKS.md` for each bundle
  - VA clicks raw link → copies content → pastes into Kajabi
  - No downloads, no updates needed
  - Files always current from `main` branch
  - No GitHub account required (public repo)

**Alternative Options:**
- Option 2: Share Notion pages (easier to update)
- Option 3: Export HTML files to Google Drive
- Option 4: Provide repo access (read-only) with clear file map

---

## Part 4: Implementation Checklist

### Phase 1: Setup (Week 1)
- [ ] Create Notion "Free Module Setup SOPs" database
- [ ] Create Notion "Free Module Copy Reviews" database
- [ ] Set up SOP template (from `VA-SOP-TEMPLATE.md`)
- [ ] Set up Review template (from `COPY-REVIEW-WORKFLOW.md`)
- [ ] Create first SOP for LMCR04
- [ ] Create first review package for LMCR04

### Phase 2: Testing (Week 2)
- [ ] Sally reviews LMCR04 package
- [ ] Address any feedback
- [ ] Get final approval
- [ ] Create VA-ready package
- [ ] VA completes LMCR04 setup using SOP
- [ ] Review VA's work
- [ ] Refine SOP based on learnings

### Phase 3: Scale (Week 3+)
- [ ] Create SOPs for remaining bundles (LMCR05, LMCR06, etc.)
- [ ] Create review packages for remaining bundles
- [ ] Establish routine: Review → Approve → VA Setup → QA
- [ ] Document any process improvements

---

## Part 5: Tools & Resources

### Required Tools
- **Notion:** SOP and review databases
- **Kajabi:** Admin access for VA
- **Git Repo:** Source files (developer access)
- **Communication:** Slack/Email for coordination

### Helpful Tools
- **HTML Preview:** Browser dev tools, online converters
- **Screenshot Tools:** For visual documentation
- **Notion Automations:** For workflow automation
- **Zapier/Make:** For advanced integrations (optional)

### Documentation
- `VA-SOP-TEMPLATE.md` - SOP structure
- `COPY-REVIEW-WORKFLOW.md` - Review process
- `KAJABI-BUILD-CHECKLIST.md` - Quick reference
- `PRD_Course Free Module Conversion.md` - Master requirements

---

## Part 6: Success Metrics

### SOP Effectiveness
- VA completes setup without questions: ✅
- Setup time within estimated range: ✅
- Zero critical errors in first setup: ✅
- VA can work independently after training: ✅

### Review Workflow Effectiveness
- Sally reviews within 48-72 hours: ✅
- Zero content errors reach VA: ✅
- Revision cycles < 2 per bundle: ✅
- Clear feedback → actionable changes: ✅

---

## Next Steps

1. **Immediate:**
   - Review this plan with team
   - Set up Notion databases
   - Create first SOP (LMCR04)
   - Create first review package (LMCR04)

2. **This Week:**
   - Sally reviews LMCR04
   - VA tests LMCR04 SOP
   - Refine based on feedback

3. **Ongoing:**
   - Create SOPs for each new bundle
   - Maintain review workflow
   - Update SOPs as Kajabi changes

---

**Plan Version:** 1.0  
**Created:** January 2026  
**Owner:** Product Team
