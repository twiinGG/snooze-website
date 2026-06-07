# Copy Review Workflow: Free Module Lead Magnets

**Purpose:** Ensure all copy is reviewed and approved by Sally before VA setup  
**Owner:** Sally (Content Review) / Product Team (Coordination)  
**Timing:** Must be completed before VA receives setup instructions

---

## Overview

All copy for Free Module bundles must be reviewed and approved by Sally before being passed to the VA for Kajabi setup. This includes:
- Course content (orientation lessons, unlocked module content)
- Email sequences (4 emails)
- Landing/Thank You pages
- In-course CTAs

---

## Review Package Structure

For each bundle (e.g., LMCR04), create a **Copy Review Package** containing:

### 1. Bundle Overview
- **Bundle Code:** LMCR##
- **Variant Name:** [e.g., 5-12 Month Schedules]
- **Target Problem:** [e.g., Schedule Chaos]
- **Review Date:** [Date]
- **Status:** [Pending Review / Approved / Needs Revision]

### 2. Course Content
- **Orientation Lesson 1:** [HTML content or preview link]
- **Orientation Lesson 2:** [HTML content or preview link]
- **Unlocked Module Content:** [Reference to canon course + any modifications]
- **In-Course CTA Block:** [HTML content]

### 3. Email Sequence
- **Day 0 - Welcome:** Subject, Preview Text, Full HTML
- **Day 2 - Bigger Picture:** Subject, Preview Text, Full HTML
- **Day 4 - Snooze Pivot:** Subject, Preview Text, Full HTML
- **Day 6 - Gentle Nudge:** Subject, Preview Text, Full HTML

### 4. Landing/Thank You Pages
- **Thank You/Access Page:** Full HTML content

---

## Review Process

### Step 1: Package Creation
**Owner:** Product Team / Developer

**Choose Review Method:**
- **Option A:** Google Docs (Recommended for editing + comments)
- **Option B:** Notion (If MCP connection available for export)

#### Option A: Google Docs Workflow

1. **Gather All Content:**
   - Extract HTML files from `src/content/bundles/LMCR##/`
   - Create readable previews (can use HTML to PDF or screenshot)

2. **Create Google Doc:**
   - Create new Google Doc: `[Bundle Code] - Copy Review`
   - Use template structure (see below)
   - Paste HTML content into readable sections
   - Add review checkboxes (use checkboxes feature)
   - Enable commenting permissions for Sally

3. **Share with Sally:**
   - Share Google Doc with "Editor" access
   - Set deadline (typically 48-72 hours)
   - Include context: "This is for LMCR04 - 5-12 Month Schedules Free Module"

4. **After Approval:**
   - Export Google Doc as Markdown (File → Download → Markdown)
   - Save to repo or process for VA package

#### Option B: Notion Workflow

1. **Gather All Content:**
   - Extract HTML files from `src/content/bundles/LMCR##/`
   - Create readable previews

2. **Create Notion Page:**
   - Create new page in "Free Module Copy Reviews" database
   - Use template structure (see below)
   - Paste HTML content into code blocks or formatted sections
   - Enable comments (Sally can use @ mentions)

3. **Share with Sally:**
   - Share Notion page with "Edit" access
   - Set deadline (typically 48-72 hours)
   - Include context: "This is for LMCR04 - 5-12 Month Schedules Free Module"

4. **After Approval:**
   - Use MCP Notion connection to export page content
   - Convert to markdown or process for VA package

---

### Step 2: Content Review
**Owner:** Sally

#### Google Docs Method:
1. **Review Each Section:**
   - Read through all copy
   - Edit directly in Google Docs (like a Word doc)
   - Check tone and messaging alignment
   - Verify accuracy of information
   - Fix typos/grammar directly

2. **Provide Feedback:**
   - Use Google Docs comments (right-click → Comment)
   - Use checkboxes to mark sections as "Approved" or "Needs Revision"
   - Add specific revision notes in comments

3. **Mark Complete:**
   - Check final approval checkbox at bottom
   - Notify product team (via comment or email)

#### Notion Method:
1. **Review Each Section:**
   - Read through all copy
   - Edit directly in Notion (full editing capabilities)
   - Check tone and messaging alignment
   - Verify accuracy of information
   - Fix typos/grammar directly

2. **Provide Feedback:**
   - Use Notion comments (@ mention or comment blocks)
   - Use checkboxes to mark sections as "Approved" or "Needs Revision"
   - Add specific revision notes in comments

3. **Mark Complete:**
   - Update Status property to "Approved"
   - Notify product team

---

### Step 3: Revision (If Needed)
**Owner:** Product Team / Developer

#### Google Docs Method:
1. **Address Feedback:**
   - Review Sally's edits and comments
   - Make requested changes in Google Doc
   - Update HTML files in repo to match
   - Resolve comments as you address them

2. **Resubmit:**
   - Sally can review changes in same doc
   - Request final approval

#### Notion Method:
1. **Address Feedback:**
   - Review Sally's edits and comments
   - Make requested changes in Notion page
   - Update HTML files in repo to match
   - Resolve comments as you address them

2. **Resubmit:**
   - Sally can review changes in same page
   - Request final approval

---

### Step 4: Approval & Handoff
**Owner:** Product Team

#### Google Docs Method:
1. **Export Approved Content:**
   - File → Download → Markdown (.md)
   - Or: Copy final content sections
   - Verify all Sally's edits are included

2. **Create VA Package:**
   - Use exported markdown or copy content
   - Format for copy-paste (see VA Package section)
   - Remove comment/feedback sections

3. **Handoff to VA:**
   - Share VA-ready package (Notion page or Google Doc)
   - Provide SOP instructions
   - Set up access/permissions

#### Notion Method:
1. **Export Approved Content:**
   - Use MCP Notion connection to get page content
   - Export as markdown or process programmatically
   - Verify all Sally's edits are included

2. **Create VA Package:**
   - Use exported content
   - Format for copy-paste (see VA Package section)
   - Remove comment/feedback sections

3. **Handoff to VA:**
   - Share VA-ready package (Notion page or document)
   - Provide SOP instructions
   - Set up access/permissions

---

## Template Structures

### Google Docs Template Structure

**Document Title:** `[Bundle Code] - Copy Review - [Variant Name]`

**Header Section:**
```
Bundle Code: LMCR##
Variant Name: [Name]
Target Problem: [Problem]
Reviewer: Sally
Review Deadline: [Date]
Status: [ ] Pending Review | [ ] In Review | [ ] Approved | [ ] Needs Revision
```

**Content Sections:** (Same structure as Notion, but in Google Docs format)

---

### Notion Template Structure

**Page:** `[Bundle Code] - Copy Review`

**Properties:**
- **Bundle Code:** LMCR## (Select)
- **Status:** [Select: Pending Review / In Review / Approved / Needs Revision]
- **Reviewer:** Sally (Person)
- **Review Date:** [Date]
- **VA Handoff Date:** [Date]

**Content Blocks:**

#### Section 1: Bundle Overview
```
**Bundle Code:** LMCR##
**Variant Name:** [Name]
**Target Problem:** [Problem]
**Canon Course:** [Source course name]
```

#### Section 2: Course Content Review
**Orientation Lesson 1**
- [ ] Content approved
- [ ] Tone correct
- [ ] No errors
- **Feedback:** [Comment field]

[HTML Preview or Link]

**Orientation Lesson 2**
- [ ] Content approved
- [ ] Tone correct
- [ ] No errors
- **Feedback:** [Comment field]

[HTML Preview or Link]

**In-Course CTA Block**
- [ ] Content approved
- [ ] Links correct
- [ ] Styling acceptable
- **Feedback:** [Comment field]

[HTML Preview or Link]

#### Section 3: Email Sequence Review
**Day 0 - Welcome**
- [ ] Subject line approved
- [ ] Preview text approved
- [ ] Email content approved
- [ ] Links verified
- **Feedback:** [Comment field]

**Subject:** [Subject line]  
**Preview:** [Preview text]  
[Email HTML Preview]

**Day 2 - Bigger Picture**
[Same structure]

**Day 4 - Snooze Pivot**
[Same structure]

**Day 6 - Gentle Nudge**
[Same structure]

#### Section 4: Thank You Page Review
**Thank You/Access Page**
- [ ] Content approved
- [ ] All sections correct
- [ ] Links verified
- [ ] Mobile-friendly
- **Feedback:** [Comment field]

[HTML Preview or Link]

#### Section 5: Final Approval
- [ ] All content reviewed
- [ ] All feedback addressed
- [ ] Ready for VA handoff
- **Approved By:** [Sally signature/name]
- **Approval Date:** [Date]

---

## VA-Ready Package Format

Once approved, create a **VA-Ready Copy Package** with:

### Format Options:

**Option 1: Notion Page (Recommended)**
- Create duplicate of review page
- Remove feedback/comment fields
- Add "Copy-Paste Ready" sections
- Include file references

**Option 2: Google Doc**
- Clean document with all HTML
- Clear section headers
- Copy-paste friendly formatting

**Option 3: HTML Files + Index**
- Provide actual HTML files
- Include index document with instructions
- Share via Google Drive or Dropbox

### Required Sections:

1. **Quick Reference**
   - Bundle code
   - File locations
   - Offer codes

2. **Course Content (Copy-Paste Ready)**
   - Orientation Lesson 1 HTML
   - Orientation Lesson 2 HTML
   - In-Course CTA HTML

3. **Email Sequence (Copy-Paste Ready)**
   - Day 0: Subject, Preview, HTML
   - Day 2: Subject, Preview, HTML
   - Day 4: Subject, Preview, HTML
   - Day 6: Subject, Preview, HTML

4. **Thank You Page (Copy-Paste Ready)**
   - Full HTML content

5. **Links & References**
   - Offer URLs
   - Product URLs
   - Deep link references

---

## Automation Ideas (Future)

### Notion Automation:
- When "Status" changes to "Approved" → Create VA-ready package
- When "Status" changes to "Approved" → Notify VA
- When review deadline passes → Send reminder to Sally

### Integration Options:
- **Zapier/Make:** Connect Notion → Google Drive (auto-create VA package)
- **Notion API:** Auto-generate VA package from approved review

---

## Quality Checklist

Before sending to Sally:
- [ ] All HTML files are included
- [ ] Content is readable (not just code)
- [ ] Links are verified
- [ ] File names match bundle code
- [ ] No placeholder text remains

Before sending to VA:
- [ ] All content is approved by Sally
- [ ] All feedback is addressed
- [ ] Package is copy-paste ready
- [ ] File references are clear
- [ ] SOP instructions are included

---

## Timeline Example

**Day 1:** Developer creates review package → Shares with Sally  
**Day 2-3:** Sally reviews content → Provides feedback  
**Day 4:** Developer addresses feedback → Resubmits (if needed)  
**Day 5:** Final approval → VA package created  
**Day 6:** VA receives package + SOP → Begins setup

**Total:** ~1 week per bundle (allowing for revisions)

---

## Tools & Resources

- **Notion:** Review and approval workflow
- **HTML Preview Tools:** 
  - Browser "View Source" → Copy to preview
  - Online HTML to PDF converters
  - Screenshot tools for visual review
- **Version Control:** Git repo for source files
- **File Sharing:** Google Drive / Dropbox for VA packages

---

**Workflow Version:** 1.0  
**Last Updated:** January 2026  
**Owner:** Product Team
