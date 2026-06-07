# Google Doc Import Instructions

**Purpose:** Import the copy review document into Google Docs for Sally's review

---

## Method 1: Direct Import (Recommended)

1. **Open Google Docs:**
   - Go to https://docs.google.com
   - Click "Blank" to create new document

2. **Import Markdown:**
   - File → Open → Upload
   - Select `LMCR04-COPY-REVIEW-GOOGLE-DOC.md`
   - Google Docs will convert markdown to formatted document

3. **Format Checkboxes:**
   - Google Docs may convert `☐` to plain text
   - Select all checkboxes
   - Insert → Special characters → Search "checkbox"
   - Or use Format → Bullets & numbering → Checkbox list

4. **Share with Sally:**
   - Click "Share" button
   - Add Sally's email
   - Set permission to "Editor"
   - Add note: "Please review and edit this copy for LMCR04"

---

## Method 2: Copy-Paste (Alternative)

1. **Open the Markdown File:**
   - Open `LMCR04-COPY-REVIEW-GOOGLE-DOC.md` in any text editor

2. **Create New Google Doc:**
   - Go to https://docs.google.com
   - Create blank document

3. **Paste Content:**
   - Copy all content from markdown file
   - Paste into Google Doc
   - Google Docs will preserve basic formatting

4. **Format Manually:**
   - Add checkboxes (Insert → Special characters)
   - Format headings (Heading 1, 2, 3 styles)
   - Add horizontal lines for section breaks if needed

5. **Share with Sally:**
   - Click "Share" button
   - Add Sally's email
   - Set permission to "Editor"

---

## Method 3: Use Markdown Converter (Best Formatting)

1. **Use Online Converter:**
   - Go to https://www.markdowntopdf.com or similar
   - Upload `LMCR04-COPY-REVIEW-GOOGLE-DOC.md`
   - Convert to Google Docs format
   - Download and open in Google Docs

2. **Or Use Pandoc (Command Line):**
   ```bash
   pandoc LMCR04-COPY-REVIEW-GOOGLE-DOC.md -o LMCR04-Copy-Review.docx
   ```
   - Upload the .docx file to Google Drive
   - Open with Google Docs
   - Convert to Google Docs format

---

## After Import Checklist

- [ ] All sections are present
- [ ] Checkboxes are functional (can be checked)
- [ ] Headings are properly formatted
- [ ] Links are clickable
- [ ] Content is readable
- [ ] Document is shared with Sally (Editor access)

---

## Sally's Review Process

1. **Sally Receives Document:**
   - Opens Google Doc
   - Reviews each section

2. **Edits Content:**
   - Edits directly in Google Docs (like Word)
   - Fixes typos, adjusts tone, updates messaging

3. **Adds Comments:**
   - Right-click on text → Comment
   - Or use Comment button in toolbar
   - Provides feedback on sections

4. **Checks Review Boxes:**
   - Checks "Content approved" when satisfied
   - Leaves unchecked if needs revision

5. **Marks Final Approval:**
   - Checks "Review Complete" boxes at bottom
   - Signs "Approved By" section
   - Notifies team when complete

---

## After Approval

1. **Export Approved Content:**
   - File → Download → Markdown (.md)
   - Or: Copy final content sections

2. **Create VA Package:**
   - Remove comment/feedback sections
   - Format for copy-paste
   - Share with VA

---

**Instructions Version:** 1.0  
**Last Updated:** January 2026
