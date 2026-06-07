# Notion Database Setup: TSC Library Integration

**Purpose:** Query existing TSC library structure and create compatible SOP pages  
**Database ID:** `fbfa224339594e1d8efeb8a070f8c772`  
**Status:** Setup Required

---

## Step 1: Query Database Structure

**Before creating any pages, you MUST query the existing database structure to understand:**
- Property names and types
- Required vs optional properties
- Template structure (if any)
- Relationship properties

### Method 1: Using Notion API (Recommended)

```python
# Query database structure
import requests

database_id = "fbfa224339594e1d8efeb8a070f8c772"
notion_token = "your_notion_token"

headers = {
    "Authorization": f"Bearer {notion_token}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

# Get database structure
response = requests.get(
    f"https://api.notion.com/v1/databases/{database_id}",
    headers=headers
)

database = response.json()
properties = database.get("properties", {})

# Print property structure
for prop_name, prop_info in properties.items():
    print(f"{prop_name}: {prop_info['type']}")
    if 'options' in prop_info:
        print(f"  Options: {prop_info['options']}")
```

### Method 2: Using Notion UI

1. Open the TSC library database in Notion
2. Click "..." menu → "View properties"
3. Document all properties:
   - Property name
   - Property type (Title, Select, Date, etc.)
   - Options (for Select/Multi-select)
   - Required status

### Method 3: Using MCP Connection

If you have MCP Notion connection configured:
- Query the database structure
- Map properties to SOP template fields

---

## Step 2: Map SOP Template to Database Properties

Once you have the database structure, map the SOP template fields:

### Example Mapping (Update based on actual structure):

| SOP Template Field | Notion Property | Type | Notes |
|-------------------|-----------------|------|-------|
| Bundle Code | `Bundle Code` | Select | Dropdown with LMCR## options |
| Status | `Status` | Select | Draft / Ready / Active |
| Difficulty | `Difficulty` | Select | Beginner / Intermediate / Advanced |
| Estimated Time | `Time (min)` | Number | Minutes |
| Last Updated | `Last Updated` | Date | Auto-updated |
| SOP Content | Page Content | Rich Text | Full SOP body |

---

## Step 3: Create SOP Page Template

### Template Structure:

**Properties (from database):**
- **Title:** `[Bundle Code] - [Variant Name] Free Module Setup`
- **Bundle Code:** [Select from dropdown]
- **Status:** Draft
- **Difficulty:** Intermediate
- **Time (min):** 60
- **Last Updated:** [Auto]

**Content Blocks:**
1. Header: Bundle overview
2. Pre-Flight Checklist
3. Phase 1: Product Setup (with all sub-steps)
4. Phase 2: Offer Setup
5. Phase 3: Email Campaign Setup
6. Phase 4: Thank You Page Setup
7. Phase 5: QA & Testing
8. Phase 6: Documentation & Handoff
9. Troubleshooting
10. Support Resources

---

## Step 4: Create First SOP (LMCR04)

**Process:**
1. Query database structure (Step 1)
2. Create new page in database
3. Fill in properties matching database schema
4. Copy content from `VA-SOP-TEMPLATE.md`
5. Customize with LMCR04-specific details:
   - Offer codes
   - URLs
   - File references
6. Test page creation
7. Verify all properties are populated correctly

---

## Step 5: Validation Checklist

Before marking SOP as "Ready":
- [ ] All database properties are filled
- [ ] Content matches template structure
- [ ] Bundle-specific details are accurate
- [ ] Links and references work
- [ ] Formatting is consistent
- [ ] Page is accessible to VA

---

## Troubleshooting

**Issue:** Page creation fails
- **Solution:** Verify property names match database exactly (case-sensitive)

**Issue:** Properties don't appear
- **Solution:** Check property types match (Select vs Text, etc.)

**Issue:** Content formatting breaks
- **Solution:** Use Notion's native blocks, avoid complex HTML

---

## Next Steps

1. **Query database structure** (use method above)
2. **Document property structure** in this file
3. **Create mapping table** (Step 2)
4. **Test page creation** with LMCR04
5. **Refine template** based on results

---

**Setup Version:** 1.0  
**Last Updated:** January 2026  
**Status:** Pending Database Query
