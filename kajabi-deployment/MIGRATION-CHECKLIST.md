# Landing Page Migration Checklist

**Date:** December 03, 2025  
**Purpose:** Step-by-step checklist for migrating Snooze landing page from "Landing Page" to "Website Page" type in Kajabi

---

## Pre-Migration

- [ ] Backup current landing page CSS (copy from Kajabi page settings)
- [ ] Backup current landing page JavaScript (copy from Kajabi page settings)
- [ ] Note current landing page URL for testing
- [ ] Ensure you have admin access to Kajabi Settings

---

## Step 1: Update Global CSS

### 1.1 Add Merged CSS to Theme Settings

- [ ] Open Kajabi Settings → Website → Theme
- [ ] Navigate to "Custom CSS" field
- [ ] Open `kajabi-deployment/global/css/snooze-unified-theme.css`
- [ ] Copy entire contents
- [ ] Paste into Custom CSS field (replace existing if present)
- [ ] Save changes

**Verification:**
- [ ] CSS file is saved
- [ ] No syntax errors reported by Kajabi

---

## Step 2: Update Global JavaScript

### 2.1 Add Merged JavaScript to Website Settings

- [ ] Open Kajabi Settings → Website → Custom JavaScript
- [ ] Open `kajabi-deployment/global/js/snooze-globals.js`
- [ ] Copy entire contents
- [ ] Paste into Custom JavaScript field (replace existing if present)
- [ ] Save changes

**Verification:**
- [ ] JavaScript file is saved
- [ ] No syntax errors reported by Kajabi
- [ ] Test in browser console: `window.SNOOZE_CHECKOUT_URL` returns correct URL

---

## Step 3: Convert Landing Page to Website Page

### 3.1 Change Page Type

- [ ] Open landing page in Kajabi editor
- [ ] Go to page settings
- [ ] Change page type from "Landing Page" to "Website Page"
- [ ] Save page

**Important:** This will remove the page-level Custom CSS and Custom JavaScript fields. This is expected - CSS/JS are now in global theme files.

### 3.2 Remove Old CSS/JS (If Still Present)

- [ ] Check if page still has Custom CSS field (should be removed after type change)
- [ ] If present, clear it (CSS is now in global theme)
- [ ] Check if page still has Custom JavaScript field (should be removed after type change)
- [ ] If present, clear it (JS is now in global theme)

---

## Step 4: Update Landing Page HTML Blocks

### 4.1 Review Current HTML Blocks

- [ ] Open landing page in Kajabi editor
- [ ] Review existing Code Blocks
- [ ] Note which sections need updating

### 4.2 Update HTML Blocks

- [ ] Open `kajabi-deployment/pages/landing-page-blocks.html`
- [ ] Copy each section as needed
- [ ] Update Code Blocks on landing page
- [ ] Remove any old `<script>` tags that set `window.SNOOZE_CHECKOUT_URL` (now in global JS)

**Sections to Update:**
- [ ] Navigation header (if not already using global navigation)
- [ ] Hero section
- [ ] Transformation reviews
- [ ] Inside Snooze section
- [ ] Library preview
- [ ] Age stages section
- [ ] Value comparison
- [ ] Who it's for section
- [ ] Trust/founder section
- [ ] Testimonial carousel
- [ ] Price anchoring
- [ ] Pricing section
- [ ] FAQ section
- [ ] Sticky CTA bar
- [ ] Footer (if not already using global footer)

---

## Step 5: Testing

### 5.1 Visual Testing

- [ ] Open landing page in preview mode
- [ ] Check navigation displays correctly
- [ ] Check hero section displays correctly
- [ ] Check all sections render properly
- [ ] Check mobile responsiveness
- [ ] Check desktop layout

### 5.2 Functional Testing

- [ ] Test testimonial carousel (desktop: auto-scroll, mobile: swipe)
- [ ] Test FAQ accordion (expand/collapse)
- [ ] Test sticky CTA bar (mobile only, appears after scrolling)
- [ ] Test age stages toggle functionality
- [ ] Test all CTA buttons link to correct checkout URL
- [ ] Test smooth scrolling for anchor links
- [ ] Test mobile menu toggle

### 5.3 JavaScript Testing

- [ ] Open browser console
- [ ] Check for JavaScript errors
- [ ] Verify `window.SNOOZE_CHECKOUT_URL` is defined
- [ ] Verify `window.SnoozeUserDetection` is available
- [ ] Test carousel functionality
- [ ] Test FAQ functionality
- [ ] Test sticky CTA functionality

### 5.4 Cross-Page Testing

- [ ] Test other website pages still work correctly
- [ ] Verify navigation works on all pages
- [ ] Verify footer works on all pages
- [ ] Check that global CSS doesn't break other pages

---

## Step 6: Cleanup

### 6.1 Remove Old Files (Optional)

- [ ] Archive old landing page CSS file (if backed up)
- [ ] Archive old landing page JavaScript file (if backed up)
- [x] Note: Old files in `landing-page/` directory archived to `archive/landing-page-old/`

### 6.2 Documentation

- [ ] Update any internal documentation with new file paths
- [ ] Note migration date and changes made
- [ ] Document any issues encountered and resolutions

---

## Rollback Plan

If issues occur, you can rollback by:

1. **Revert Page Type:**
   - Change page back to "Landing Page" type
   - Restore old CSS in page Custom CSS field
   - Restore old JavaScript in page Custom JavaScript field

2. **Revert Global Files:**
   - Restore previous version of global CSS
   - Restore previous version of global JavaScript

**Note:** Keep backups of old CSS/JS files until migration is fully verified.

---

## Post-Migration

- [ ] Monitor landing page for 24-48 hours
- [ ] Check analytics for any drop in conversions
- [ ] Verify all functionality continues to work
- [ ] Update team on migration completion

---

## Troubleshooting

### Issue: Styles Not Applying

**Solution:**
- Clear browser cache
- Check CSS is in correct location (Theme Custom CSS)
- Verify no conflicting CSS from other sources
- Check for CSS syntax errors in Kajabi

### Issue: JavaScript Not Working

**Solution:**
- Check JavaScript is in correct location (Website Custom JavaScript)
- Open browser console and check for errors
- Verify `window.SNOOZE_CHECKOUT_URL` is defined
- Check for JavaScript syntax errors in Kajabi

### Issue: Carousel Not Working

**Solution:**
- Verify carousel HTML structure is correct
- Check browser console for JavaScript errors
- Verify `.carousel-inner` and `.carousel-track` elements exist
- Test on both desktop and mobile

### Issue: FAQ Accordion Not Working

**Solution:**
- Verify FAQ HTML structure is correct
- Check that checkboxes and labels are properly structured
- Verify JavaScript is loaded (check console)
- Test keyboard accessibility

### Issue: Sticky CTA Not Appearing

**Solution:**
- Verify sticky CTA HTML block is added
- Check that `.hero` element exists (for height calculation)
- Test on mobile device (sticky CTA is mobile-only)
- Check localStorage for dismissal state

---

**Last Updated:** December 03, 2025  
**Status:** Ready for Migration

