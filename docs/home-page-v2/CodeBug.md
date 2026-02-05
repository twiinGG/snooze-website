Based on the code files provided, here is the bug report regarding the integration issues between your **Home Page V2** and the **Unified Theme**, followed by the specific fixes required to resolve them.

### 🐞 Bug Report

**Status:** Critical Rendering Failure
**Primary Symptom:** Custom page layout collapses; padding/margins are missing; styles are inconsistent.

#### 1. The "Kajabi Crush" (Global CSS Override)
*   **Severity:** **High**
*   **Location:** `snooze-unified-theme.css` (Section 3: Kajabi Overrides)
*   **The Issue:** Your global theme includes an aggressive "reset" block designed to strip Kajabi's default padding. It uses `!important` flags on a broad selector (`div[class*="section"]...`).
*   **Conflict:** Because your new V2 page uses the class `.snooze-section`, the global theme detects the word "section", matches it, and forces `padding: 0 !important`. This overrides the `72px` padding defined in your V2 CSS, causing the content to touch the edges of the viewport.

#### 2. Variable Scope Collision
*   **Severity:** Medium
*   **Location:** `home-page-v2.css` (Section 1: Variables)
*   **The Issue:** You are defining variables using `:root` in the V2 CSS.
*   **Conflict:** The global theme also uses `:root`. Since CSS variables cascade, if the V2 CSS loads *after* the global CSS, it redefines global colors (like `--c-coral`). This risks breaking the color scheme of your Global Navigation Bar and Footer if variable names overlap or map to different hex codes.

#### 3. Full-Width "Ghost" Scrollbar
*   **Severity:** Medium
*   **Location:** `home-page-v2.css` (Wrapper Reset)
*   **The Issue:** You are using `width: 100vw` inside the `#home-page` to force full-bleed sections.
*   **Conflict:** Without strictly setting `overflow-x: hidden` on the *body* or the specific parent container in the global CSS, `100vw` often calculates the scrollbar width as part of the viewport, creating a horizontal scrollbar and slight side-scrolling jitter on Windows/Android devices.

#### 4. JavaScript Selector Leakage
*   **Severity:** Low
*   **Location:** `home-page-v2.js`
*   **The Issue:** Your JS selects elements globally (e.g., `document.querySelectorAll('.faq-head')`).
*   **Conflict:** If your Global Footer contains an FAQ section or similar classes, the V2 script will attempt to add event listeners to them, potentially causing double-toggles or console errors.

---

### 🛠 Suggested Fixes

To integrate successfully, do not delete the global CSS. Instead, apply these four specific changes.

#### Fix 1: Update the Global Whitelist (Crucial)
You must update the `snooze-unified-theme.css` file in your Kajabi settings. You need to explicitly tell the global reset to **ignore** your new page wrapper.

**Action:** Find the huge selector block in **Section 3** of `snooze-unified-theme.css` and append `:not(#home-page)` and `:not(#home-page *)` to the exclusions.

**Replace the existing selector with this (I have added the protection at the end):**

```css
/* Update this block in snooze-unified-theme.css */
div[class*="section"]:not(.hero-section-complete):not(.feature-section):not(.trust-section):not(.testimonial-carousel):not(.pricing-section):not(.faq-section):not(.transformation-reviews):not(.inside-snooze):not(.value-comparison):not(.age-stages-section):not(.library-preview):not(.library-category-nav):not(.contact-hero-section):not(.contact-form-section):not(.contact-info-section):not(.snooze-problem-section):not(.snooze-target-audience):not(.snooze-individual-product-value):not(.snooze-membership-upgrade):not(.snooze-success-stories):not(.snooze-instructor-section):not(.snooze-faq-section):not(.snooze-final-cta-section):not(.course-hero-dark):not(.course-section-dark):not(.course-section-light):not(.course-overview-section):not(.course-curriculum-section):not(.course-reviews-section):not(.course-pricing-section):not(.course-faq-section):not(.course-curriculum-two-columns):not(.course-curriculum-column):not(.course-part-title):not(#home-page):not(#home-page *), 
section[class*="section"]:not(#home-page):not(#home-page *) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
```

#### Fix 2: Scope your V2 CSS
In your `home-page-v2.css` (or the custom code block on the page), change `:root` to the ID of your wrapper. This ensures your variables only exist inside your specific page content and don't break the navbar.

**Change this:**
```css
:root { ... }
```
**To this:**
```css
#home-page { ... }
```

#### Fix 3: Scope your V2 JavaScript
Update `home-page-v2.js` to look for elements *only* inside your wrapper. This prevents the script from accidentally controlling elements in the global footer.

**Example Change:**
```javascript
// Change this:
const faqs = document.querySelectorAll('.faq-head');

// To this:
const faqs = document.querySelectorAll('#home-page .faq-head');
```
*(Repeat this pattern for the Age Tabs and Sticky Bar logic).*

#### Fix 4: Ensure HTML Wrapping
In the Kajabi Page Builder, inside your Custom Code block, ensure *all* your HTML content is wrapped in the ID that matches your CSS scope.

```html
<!-- The ID here MUST match the exclusions in Fix 1 and the CSS scope in Fix 2 -->
<div id="home-page">
   <!-- All your V2 HTML content goes here -->
</div>
```