# Contact Page

**Page URL:** `/contact`  
**Live URL:** https://joinsnooze.com/contact  
**Status:** Needs design update to match unified Snooze design system

---

## Overview

The contact page provides a way for users to get in touch with questions or feedback. The page has been redesigned to match the unified Snooze design system.

---

## Files

- `contact-page-complete.html` - Complete contact page HTML with embedded styles

---

## Design Features

### Sections

1. **Hero Section**
   - Clean, welcoming introduction
   - "Let's Connect" subtitle
   - Brief description

2. **Contact Form Section**
   - Styled form container
   - Instructions for Kajabi form integration
   - Social media links as alternative contact methods

3. **Additional Information Section**
   - Response time information
   - Links to FAQs and blog
   - Link to book consultations

### Design System Alignment

- Uses unified Snooze color palette (coral, navy, cream, beige)
- Consistent typography (Playfair Display for headings, Poppins for body)
- Responsive design with mobile optimizations
- Matches spacing and component patterns from other pages

---

## Deployment Instructions

### Step 1: Create/Update Contact Page in Kajabi

1. Go to Kajabi: **Website → Pages**
2. Find or create the Contact page (`/contact`)
3. Set page type to **Website Page**

### Step 2: Add Navigation

1. Add a code block at the top of the page
2. Copy code from `pages/navigation.html`
3. Paste into the code block

### Step 3: Add Hero Section

1. Add a new code block
2. Copy the "SECTION 1: HERO / INTRO" section from `contact-page-complete.html`
3. Paste into the code block

### Step 4: Add Contact Form

1. Add a new code block or use Kajabi's form block
2. Copy the "SECTION 2: CONTACT FORM" section from `contact-page-complete.html`
3. Replace the placeholder with your actual Kajabi contact form embed code
   - Or use Kajabi's form builder and the styles will apply automatically

### Step 5: Add Information Section

1. Add a new code block
2. Copy the "SECTION 3: ADDITIONAL INFORMATION" section from `contact-page-complete.html`
3. Paste into the code block

### Step 6: Add Footer

1. Add a new code block at the bottom
2. Copy code from `pages/footer.html`
3. Paste into the code block

### Step 7: Verify CSS

1. Ensure `global/css/snooze-unified-theme.css` is loaded in Kajabi Theme Settings
2. The contact page styles are embedded in the HTML, but they reference CSS variables from the global theme

---

## Form Integration

The contact page includes a placeholder for the Kajabi contact form. To integrate:

### Option 1: Kajabi Form Builder

1. Use Kajabi's form builder to create your contact form
2. Add the form block to the page
3. The embedded CSS will automatically style the form to match the design system

### Option 2: Custom Form Embed

1. Create your contact form using Kajabi's form builder
2. Copy the form embed code
3. Replace the `.kajabi-form-placeholder` section in the HTML with your form embed code

### Form Fields Recommended

- Name (text)
- Email (email)
- Subject (text or select)
- Message (textarea)

---

## Customization

### Update Colors

All colors use CSS variables defined in the global theme. To change colors:

1. Update variables in `global/css/snooze-unified-theme.css`
2. Or override specific colors in the embedded styles

### Update Content

- Edit the hero text directly in the HTML
- Modify the information cards in Section 3
- Update social media links as needed

---

## Mobile Responsive

The page is fully responsive and includes:

- Mobile-optimized spacing
- Stacked layout for information cards on small screens
- Full-width form on mobile
- Adjusted font sizes using `clamp()` for fluid typography

---

## Links & References

- **Navigation:** `pages/navigation.html` (canonical file)
- **Footer:** `pages/footer.html` (canonical file)
- **Global CSS:** `global/css/snooze-unified-theme.css`
- **Live Page:** https://joinsnooze.com/contact

---

## Status

- [x] Contact page HTML created with unified design
- [ ] Page deployed to Kajabi
- [ ] Form integrated
- [ ] Navigation added
- [ ] Footer added
- [ ] Tested on mobile devices
- [ ] SEO meta tags added

---

**Last Updated:** January 2025
