# Age Pages - Complete Files

**Status:** Complete, ready for deployment  
**Location:** Complete HTML files in this directory

---

## ⭐ Complete Deployment Instructions

**See:** `../DEPLOYMENT-GUIDE.md` ⭐ **SINGLE SOURCE OF TRUTH** for complete deployment instructions.

**See:** `../../docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md` for detailed age page transformation process.

---

## Complete Page Files

Each age has a single, complete HTML file ready for deployment:

- **`newborn-page-complete.html`** - Complete newborn (0-3 months) page
- **`3-4-month-page-complete.html`** - Complete 3-4 month page
- **`5-12-month-page-complete.html`** - Complete 5-12 month page
- **`toddler-page-complete.html`** - Complete toddler (12+ months) page

### What's Included in Each Complete Page

Each complete page contains:

1. **Navigation** - Full site navigation
2. **Hero Section** - Age-specific hero with context-aware CTA
3. **Understanding Section** - Simplified, concise content for tired parents
4. **Context-Aware CTA** - Dynamic CTA based on user status
5. **"What's in Snooze"** - Membership value proposition
6. **Value Comparison** - Individual product vs. membership comparison
7. **Age Cross-Linking** - Links to other age pages
8. **Footer** - Site footer

All styling comes from `../snooze-unified-theme.css` - no inline styles needed.

---

## Age-Specific Customizations

### Newborn Page (0-3 Months)
- **Product Type:** Guide
- **Price:** $67 one-time
- **Membership Value:** $80 more = $147/quarter
- **Message:** "For just $80 more than a single guide, you get everything for 3 months"

### 3-4 Month Page
- **Product Type:** Course (Best Seller)
- **Price:** $117 one-time
- **Membership Value:** $30 more = $147/quarter ⭐ **BEST VALUE**
- **Message:** "For just $30 more than a single course, you get everything"

### 5-12 Month Page
- **Product Type:** Guide
- **Price:** $67 one-time
- **Membership Value:** $80 more = $147/quarter
- **Message:** "For just $80 more than a single guide, you get everything for 3 months"

### Toddler Page (12+ Months)
- **Product Type:** Course
- **Price:** $117 one-time
- **Membership Value:** $30 more = $147/quarter ⭐ **BEST VALUE**
- **Message:** "For just $30 more than a single course, you get everything"

---

## Deployment

1. Copy the complete HTML file content
2. Paste into Kajabi page editor
3. Ensure `snooze-unified-theme.css` is deployed to Kajabi Custom CSS
4. Ensure `snooze-globals-site-header.js` is in site header
5. Test on desktop and mobile

**Note:** All component files (hero sections, CTAs, etc.) are already integrated into the complete files. No need to assemble components manually.

---

**Last Updated:** December 04, 2025

---

## Relocated Code Notes (from inline comments, June 29, 2026)

Inline comments were stripped from the four complete HTML files (deployable Kajabi custom code). Genuine notes are preserved here.

### Deployment target (all four files)
- Styling and Font Awesome icons come from `snooze-unified-theme.css`.
- Deploy CSS to: Kajabi Settings -> Website -> Theme -> Custom CSS.

### Toddler page only: required canonical inserts
The toddler file carried two "IMPORTANT" build instructions that were section-marker comments:
- **Navigation:** insert navigation code from the canonical file `kajabi-deployment/pages/navigation.html` (top of body, before the hero).
- **Footer:** insert footer code from the canonical file `kajabi-deployment/pages/footer.html` (end of body).

The other three pages already include a full hero and the clean footer markup inline.

### AUD offer mapping + price/offer flags (Value Comparison section)
Each page's "Individual Product" card shows a USD price with an `aud` data attribute, mapped to an AUD offer that is not yet created (price-display only, no live product CTA on the page):

| Page | USD price | AUD (x1.51) | AUD offer token (pending) | Flag |
|------|-----------|-------------|---------------------------|------|
| Newborn Guide | $67 | A$99 | `omMcVgAi` | TIER 2 |
| 3-4 Month Course | $117 | A$179 | `W2PyqL2X` | TIER 2 |
| 5-12 Month (page shows $67) | $67 | A$99 | `9DFJSwVD` | TIER 2 + PRICE/OFFER MISMATCH |
| Toddler Toolkit | $117 | A$179 | `FktmJAvJ` | TIER 2 |

- **5-12 Month mismatch (HUMAN REVIEW):** page shows $67 (guide -> A$99) but mapped offer `9DFJSwVD` is the $117 5-12 Month COURSE (-> A$179). $67 may be the OLD guide price. Confirm whether this product is the $67 guide or the $117 course before wiring the AUD offer.

### Non-canonical launch pricing (HUMAN REVIEW, all four files)
- Membership price shown is **$147/quarter (Launch) -> A$222** (x1.51). This is NON-CANONICAL; canonical Access quarterly is **$197 / A$299**.
- Membership differential ("for just $X more"): $80 (newborn, 5-12) / $30 (3-4 month, toddler); AUD A$121 / A$45 (x1.51). NON-CANONICAL launch figures.
- Value-message range "$117-$129 each": $117 is the canonical course price (A$179); $129 is NON-CANONICAL launch (x1.51 -> A$195).

### Hidden email-capture section (preserved, NOT deleted)
Each file contains a large commented-out `course-sample-section` (free course sample / email capture), labelled "HIDDEN - See Notion project for implementation". This is disabled feature code, not a note, so it was left intact inside its `<!-- ... -->` wrapper rather than stripped. The 3-4 month file's hidden block also contains step-by-step Kajabi-form embed instructions (Marketing -> Forms -> create form -> paste embed). Revisit when the email-capture feature is implemented; the form handler is currently a placeholder `alert()`.

### Service-model copy sweep (June 29, 2026)
The "What's inside Snooze" benefit card and the membership feature lists were updated to remove false hard expectations about live coaching cadence:
- Card heading "Live Coaching" -> "Live Sessions"; detail "Weekly Q&A with Sally..." -> "Live Q&A with Sally and Bec. Bring your questions and get guidance tailored to your baby."
- Membership feature "Weekly live coaching with Sally" -> "Live sessions with Sally and Bec".
- Individual-product negation "No live coaching" -> "No live sessions" (parity with renamed benefit).
- CTA note "...Library, Village, and Coaching" -> "...Library, Village, and Live Sessions"; value message "...+ Coaching" -> "...+ Live Sessions".

## Removed during comment strip (recoverable from git history)

- A commented-out `course-sample-section` (disabled "Enjoy a free course sample" block) was present in each age page (newborn, 3-4 month, 5-12 month, toddler). It was removed with the comment strip. If the course-sample section is wanted live, recover it from git history and uncomment.
