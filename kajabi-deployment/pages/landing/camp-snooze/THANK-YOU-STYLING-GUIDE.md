# Thank You Page Styling Override Guide

## Problem
Kajabi wraps custom thank you page content in its own containers and applies theme styles that override custom CSS. This causes styling conflicts.

## Solution
Global CSS overrides have been added to `global/css/snooze-unified-theme.css` that force custom thank you page styles to work.

## How to Debug Kajabi Style Conflicts

### 1. Inspect the Page Structure
When viewing a thank you page, use browser DevTools (F12) to inspect:

1. **Find the wrapper classes:**
   - Look for classes like `.kajabi-page-content`, `[class*="html-block"]`, `[class*="page"]`
   - These are Kajabi's wrapper containers

2. **Check computed styles:**
   - Right-click on an element → Inspect
   - In the Styles panel, see which CSS rules are being applied
   - Look for rules with strikethrough (overridden) vs active rules

3. **Identify the conflicting rule:**
   - Check the "Computed" tab to see final computed values
   - Look for rules from `snooze-unified-theme.css` that might be too broad

### 2. Common Kajabi Wrapper Classes

These are the classes Kajabi typically uses to wrap custom content:

```css
.kajabi-page-content
div[class*="html-block"]
section[class*="content"]
body[class*="thank"]
body[class*="Thank"]
[class*="offer"]
[class*="purchase"]
```

### 3. Adding New Overrides

If you find a new style conflict, add it to the global CSS file at:

`projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`

Look for the section: `/* THANK YOU PAGE OVERRIDES */`

**Pattern to follow:**
```css
/* Target the specific element with high specificity */
.kajabi-page-content .thank-you-container .your-element,
body[class*="thank"] .thank-you-container .your-element {
  property: value !important;
}
```

### 4. Specificity Rules

CSS specificity determines which styles win. Use this hierarchy:

1. **Inline styles** (highest specificity)
2. **IDs** (`#id`)
3. **Classes** (`.class`)
4. **Elements** (`div`, `p`, etc.)

To override Kajabi's styles, you need **higher specificity** or use `!important`.

**Example:**
```css
/* Low specificity - might not work */
.thank-you-container h1 {
  color: red;
}

/* High specificity - will work */
.kajabi-page-content .thank-you-container h1 {
  color: red !important;
}
```

### 5. Testing Overrides

1. **Clear browser cache** (Ctrl+Shift+Delete / Cmd+Shift+Delete)
2. **Hard refresh** (Ctrl+F5 / Cmd+Shift+R)
3. **Check in DevTools:**
   - Verify your styles are in the Styles panel
   - Check they're not strikethrough (overridden)
   - Verify computed values match your intended styles

### 6. Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Fonts wrong | Global typography rules | Add `!important` to font-family |
| Colors wrong | Global color variables | Override with specific color values |
| Spacing wrong | Global margin/padding | Reset with `!important` |
| Layout broken | Global container styles | Reset width/max-width |
| Links styled wrong | Global link styles | Override with specific selectors |

### 7. Quick Override Template

When adding new thank you page styles, use this template:

```css
/* Add to global CSS - THANK YOU PAGE OVERRIDES section */

/* Target all possible Kajabi wrappers */
.kajabi-page-content .thank-you-container .your-class,
body[class*="thank"] .thank-you-container .your-class,
[class*="html-block"] .thank-you-container .your-class {
  /* Your styles with !important */
  property: value !important;
}
```

## Current Overrides

The following elements are already overridden in the global CSS:

- `.thank-you-container` (container)
- `.thank-you-header` (header section)
- `.camp-badge`, `.course-badge`, `.guide-badge` (badges)
- `.step-box` (step boxes)
- `.cta-button` (buttons)
- `.key-dates-box` (date boxes)
- `.what-you-get-box` (benefits boxes)
- `.benefits-list` (benefit lists)
- `.note-box` (note boxes)
- All typography (h1-h6, p, a, strong)
- Mobile responsive styles

## Location of Global CSS

**File:** `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`

**Section:** End of file, look for `/* THANK YOU PAGE OVERRIDES */`

**Kajabi Location:** Settings → Website → Theme → Custom CSS

---

**Last Updated:** January 1, 2026
