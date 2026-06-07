# Quick Start: SOP & Copy Review Setup

**Purpose:** Get started quickly with VA SOP system and copy review workflow  
**Time:** ~30 minutes initial setup

---

## Step 1: Query Notion Database Structure (5 min)

**Before creating any pages, you MUST understand the database structure.**

### Option A: Use Python Script (Recommended)

```bash
# Set your Notion API token
export NOTION_TOKEN="your_notion_integration_token"

# Run the query script
cd projects/course-free-modules-conversion
python scripts/query-notion-database.py
```

This will:
- Query the TSC library database (`fbfa224339594e1d8efeb8a070f8c772`)
- Print all properties and their types
- Save structure to `notion-database-structure.json`

### Option B: Manual Inspection

1. Open Notion TSC library database
2. Click "..." → "View properties"
3. Document all properties (name, type, options)
4. Update `NOTION-DATABASE-SETUP.md` with findings

---

## Step 2: Choose Copy Review Method (2 min)

**Decision:** Google Docs or Notion?

### Google Docs (Recommended)
- ✅ Familiar editing (like Word)
- ✅ Built-in comments
- ✅ Easy export to Markdown
- ✅ No technical setup

**Action:** Create Google Docs template from `COPY-REVIEW-WORKFLOW.md`

### Notion (If MCP Available)
- ✅ Integrated workflow
- ✅ Can automate export
- ✅ Centralized with SOPs

**Action:** Set up Notion database + MCP connection

---

## Step 3: Create First SOP Page (15 min)

1. **Review Database Structure:**
   - Use output from Step 1
   - Map `VA-SOP-TEMPLATE.md` fields to database properties

2. **Create Page in Notion:**
   - Open TSC library database
   - Create new page
   - Fill in all properties matching database structure

3. **Add Content:**
   - Copy content from `VA-SOP-TEMPLATE.md`
   - Customize for LMCR04:
     - Bundle code: LMCR04
     - Variant: 5-12 Month Schedules
     - Offer codes from `LMCR04-OFFER-REFERENCE.md`
     - File references

4. **Test:**
   - Verify all properties are filled
   - Check formatting
   - Share with VA for feedback

---

## Step 4: Create First Review Package (10 min)

### If Using Google Docs:

1. **Create Google Doc:**
   - Title: `LMCR04 - Copy Review - 5-12 Month Schedules`
   - Use template from `COPY-REVIEW-WORKFLOW.md`

2. **Add Content:**
   - Copy HTML from `src/content/bundles/LMCR04/`
   - Paste into readable sections
   - Add review checkboxes

3. **Share with Sally:**
   - Editor access
   - Set deadline
   - Request review

### If Using Notion:

1. **Create Notion Page:**
   - In "Free Module Copy Reviews" database
   - Use template structure

2. **Add Content:**
   - Copy HTML from repo
   - Paste into code blocks or formatted sections

3. **Share with Sally:**
   - Edit access
   - Set deadline
   - Request review

---

## Step 5: Test Workflow (5 min)

1. **Sally Reviews:**
   - Edits content directly
   - Adds comments/feedback
   - Marks as approved

2. **Export/Process:**
   - Google Docs: Export as Markdown
   - Notion: Use MCP to export

3. **Create VA Package:**
   - Format for copy-paste
   - Remove comments/feedback
   - Share with VA

4. **VA Uses SOP:**
   - Follows SOP in Notion
   - Uses approved content package
   - Completes setup

---

## Troubleshooting

**Database query fails:**
- Check NOTION_TOKEN is set correctly
- Verify database ID is correct
- Check integration has access to database

**Page creation fails:**
- Verify property names match exactly (case-sensitive)
- Check property types match (Select vs Text)
- Ensure all required properties are filled

**Content export issues:**
- Google Docs: Use File → Download → Markdown
- Notion: Check MCP connection is working
- Verify all edits are included in export

---

## Next Steps

After initial setup:
1. Create SOPs for remaining bundles (LMCR05, LMCR06, etc.)
2. Establish routine: Review → Approve → VA Setup → QA
3. Refine based on learnings

---

**Quick Start Version:** 1.0  
**Last Updated:** January 2026
