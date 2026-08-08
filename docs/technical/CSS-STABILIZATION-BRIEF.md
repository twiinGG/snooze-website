# CSS Stabilization Brief

## Context
The global stylesheet in `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css` is over 9,500 lines and includes global resets, page specific styles, and landing page styles all mixed together. Because Kajabi Website Pages share one global CSS file, page specific rules are bleeding into other pages, causing broken padding, icon alignment, and inconsistent typography.

## Objective
Stabilize the Website Pages by separating global styles from page specific styles, adding scoped wrappers, and limiting global overrides. This should stop regressions when updating a single page, and restore predictable spacing and icon alignment.

## Success Metrics
- Website Pages show consistent section spacing and block padding across Home, About, Library, Contact, and Age pages.
- Page specific styles no longer impact unrelated pages.
- Icon alignment is consistent in lists and cards without global `i` overrides.
- Landing page and checkout styles do not load or affect Website Pages.
- Updating a single page no longer causes visible regressions elsewhere.

## Latest Update
- July 09, 2026: Guide page wrappers registered with guide-page init blocks and shared guide components. See `GUIDE-PAGE-TEMPLATE.md`.
- January 21, 2026: Product page pricing sections standardized with multi-ID CSS scoping pattern. All pricing styles use hardcoded hex values (not CSS variables) for cross-page compatibility. See `PRODUCT-PAGE-PRICING-BRIEF.md` for complete implementation guide.
- January 13, 2026: Home Page V2 work completed and deployed successfully.
- January 13, 2026: Excluded `.snooze-section` from global Kajabi section resets and the Home V2 wrapper reset to restore Home V2 spacing.
- January 13, 2026: Home V2 interactions repaired by scoping the Home V2 JS to `#home-page` only (safe for global JS injection); update the Kajabi Custom JavaScript with `docs/home-page-v2/assets/home-page-v2.js`.

## Immediate Next Steps (Resume Here)
1) Confirm the Home V2 JS is pasted into the Kajabi Custom JavaScript field and the interactive elements work on the live page.
2) Choose the next Website Page to scope (About Sally, Library, Contact, or Age pages).
3) Add the wrapper ID to that page’s HTML, then scope its CSS block in `snooze-unified-theme.css` to the wrapper.
4) Replace any remaining global Kajabi spacing resets on that page with `.sn-flush-section`/`.sn-flush-block` utilities.

## Key References
- Global CSS: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`
- Home V2 HTML wrapper present: `projects/snooze-website/kajabi-deployment/pages/website/Home-V2/home-page-v2.html`
- Example unscoped page HTML: `projects/snooze-website/kajabi-deployment/pages/website/about-sally/about-sally.html`
- Content map for deployment scope: `projects/snooze-website/docs/technical/CONTENT-MAPPING.csv`

## Wrapper Registry (Website Pages Only)
Use a single, unique wrapper ID on each Website Page body container. All page specific CSS must be prefixed with the wrapper ID.

- Home Page V2: `#home-page` (already in place)
- About Sally: `#about-sally-page`
- Ask Sally (Author/Newsletter): `#ask-sally-page` (added January 2026)
- Blog Index: `#blog-index-page`
- Blog Search: `#blog-search-page` (hybrid native surface; title + footer custom-code only)
- Newsletter Index: `#newsletter-page` (hybrid native surface; title + footer custom-code only)
- Newsletter Subscribe: `#newsletter-subscribe-page` (hybrid native surface; title + footer custom-code only)
- Consultations: `#consultations-page`
- Library: `#library-page`
- Recommended Products: `#recommended-products-page`
- Snooze Method (Website Page): `#snooze-method-page`
- Snooze Membership (Website Page): `#snooze-membership-page` (added August 2026; complete System Initialization block in `kajabi-deployment/global/css/theme-custom-code.css`, followed by page-specific membership styles. One full-width, flush custom-code block with the canonical footer inline.)
- Age Page - Newborn: `#age-newborn-page`
- Age Page - 3-4 Month: `#age-3-4-month-page`
- Age Page - 5-12 Month: `#age-5-12-month-page`
- Age Page - Toddler: `#age-toddler-page`
- Contact: `#contact-page`
- Terms and Conditions: `#terms-conditions-page`
- Privacy Policy: `#privacy-policy-page`
- Product Page - 3-4 Month Course: `#product-3-4-month-course-page`
- Product Page - 5-12 Month Course: `#product-5-12-month-course-page`
- Product Page - Newborn Guide: `#product-newborn-guide-page`
- Product Page - Snooze Method: `#product-snooze-method-page`
- Product Page - Toddler Toolkit: `#product-toddler-toolkit-page`
- Store Page V2: `#store-page-v2`
- Snooze Academy (Landing Page): `#snooze-academy-page`
- Sleep & Parenting Glossary: `#glossary-page` (added June 2026; HTML is generated from `glossary/terms.json` via `glossary/build-glossary.mjs`)
- Press / Media ("As seen on"): `#press-page` (added July 2026; init block copied from `#ask-sally-page`. Homepage links to it via the `.as-seen-strip` under the trust bar. See `pages/website/press/README.md`)
- Guide Page Template: `#chooser-page`, `#age-newborn-page`, `#age-3-4-month-page`, `#age-5-12-month-page`, `#age-toddler-page`, `#early-rising-page`, `#sleep-regressions-page`, `#nap-transitions-page`, `#bedtime-battles-page`, `#catnapping-page` (added July 2026; each has a guide-page init block plus shared guide components. See `GUIDE-PAGE-TEMPLATE.md`)
- Catnapping Guide Ready (fulfilment page): `#catnapping-guide-ready-page` (added August 2026, CNG-002; own System Initialization block copied from `#ask-sally-page`, not part of the Guide Page Template group above since it is a post-confirmation delivery page rather than guide content. `noindex`. See `pages/website/catnapping-guide-ready/INSTALL.md`)

## Scoping Rules
- Page specific selectors must be prefixed with the page wrapper ID.
- Global CSS should only include base typography, shared buttons, and shared layout utilities.
- Avoid global overrides on elements like `i`, `.fa`, `.section`, `.block`, `.container`, `.row`, `h1-h6`, `p`, and `a`.
- If a reset is required, scope it to a wrapper ID and replace it with opt-in utilities.

## Multi-Page Shared Components Pattern (CRITICAL)
**For components that appear on multiple pages (e.g., pricing sections):**

### Multi-ID Scoping Pattern
When a component needs to work across multiple page wrappers, use comma-separated selectors:

```css
/* CORRECT: Multi-ID scoping */
#home-page .price-grid,
#product-3-4-month-course-page .price-grid,
#product-5-12-month-course-page .price-grid {
  /* shared styles */
}
```

### Hardcoded Values Requirement
**CRITICAL:** Components shared across pages MUST use hardcoded hex values instead of CSS variables.

**Why:** CSS custom properties (`var(--c-coral)`, etc.) are scoped to individual page wrappers. If `#home-page` defines `--c-coral`, product pages cannot access it.

**Solution:** Use hardcoded values in shared component CSS:
- `var(--c-coral)` → `#F43357`
- `var(--c-navy)` → `#1F293B`
- `var(--c-muted)` → `#64748B`
- `var(--radius)` → `20px`

**Reference:** See `PRODUCT-PAGE-PRICING-BRIEF.md` for complete pricing section implementation using this pattern.

## System Initialization Requirement (CRITICAL)
**IMPORTANT**: Every new page wrapper MUST include a "System Initialization" block that duplicates the design system variables and base utilities.

### Why This Is Required
Because the existing design system (colors, fonts, buttons, layout utilities) is scoped to `#home-page`, new page wrappers cannot access these styles. Each page wrapper needs its own copy of:

1. **CSS Custom Properties** - All color, font, shadow, and radius variables
2. **Base Typography** - Heading styles (h1-h4) and font families
3. **Layout Utilities** - `.snooze-container`, `.snooze-section`, `.bg-white`, `.bg-cream`, `.text-center`, `.max-800`
4. **Button Styles** - `.btn`, `.btn-outline`, and hover states
5. **Common Components** - `.hero-wrap`, `.hero-grid`, `.steps-grid`, `.step-card`
6. **Full-bleed Fix** - Width adjustments for sections and footer

### Template for New Pages
When creating a new page wrapper (e.g., `#new-page`), add this initialization block BEFORE adding page-specific styles:

```css
/* ============================================
   [PAGE NAME] - SYSTEM INITIALIZATION
   (Connects [Page Name] to Home V2 Design System)
   ============================================ */

#new-page {
  /* Copy all variables from #home-page System Initialization */
  --c-coral: #F43357;
  --c-coral-hover: #D62646;
  /* ... (see #ask-sally-page for complete template) */
}

/* Copy base resets, typography, utilities, buttons, and layouts */
/* Reference: Search for "#ask-sally-page System Initialization" in unified CSS */
```

### Example Reference
See the `#ask-sally-page` System Initialization block (added January 2026) in `snooze-unified-theme.css` for the complete template.

## Primary Causes of Instability
- Aggressive global reset and Kajabi override rules remove padding and margins everywhere: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:130-244`.
- Home V2 block introduces global overrides for headings, containers, buttons, and sections without full scoping: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:8440-9520`.
- Landing page blocks are in the global file, so they leak into Website Pages, for example the Founding Member section: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:7878-8350`.
- Global contrast enforcer forces heading and text colors in broad contexts: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:7830-7876`.
- Global icon fixes apply to all icons, causing alignment conflicts: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:197-211`.
- Multiple variable systems and resets introduce conflicts: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:28-91` and `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:8444-8622`.

## Required Fixes
### 1) Scope all page specific styles
- Home V2 already uses `#home-page` in `projects/snooze-website/kajabi-deployment/pages/website/Home-V2/home-page-v2.html`.
- Ensure every selector in the Home V2 section of the unified CSS is prefixed with `#home-page`.
- Add unique wrapper IDs for other Website Pages that need page specific styling, for example `#about-sally-page` in `projects/snooze-website/kajabi-deployment/pages/website/about-sally/about-sally.html`.

### 2) Replace global Kajabi spacing resets with utilities
- The current reset at `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:217-244` should be replaced by utility classes such as `.sn-flush-section` and `.sn-flush-block` applied to specific sections.
- If a reset is still required, scope it to the relevant page wrapper instead of applying globally.

### 2a) Historical Note: Kajabi Padding Removal + Whitelist
- Prior stabilization attempts required a global Kajabi padding removal followed by a whitelist of Snooze sections to prevent unintended layout changes.
- If this approach is reused, scope the reset to a page wrapper and gate exceptions with explicit whitelist classes, rather than using blanket global selectors.

### 3) Isolate landing page and funnel CSS
- Move landing page specific blocks out of the unified CSS into landing page specific CSS areas in Kajabi.
- If a landing block must remain in unified CSS, gate it with a page wrapper like `#founding-member-page`.

### 4) Normalize headings and buttons
- Keep the global CSS limited to base typography and core buttons that are shared across all Website Pages.
- Move Home V2 typography and button styling to be fully scoped to `#home-page`.

### 5) Fix icon alignment without global overrides
- Replace the global `i, .fa` rules with a utility class like `.sn-icon` and apply only where needed.
- For icon lists, use a wrapper class such as `.sn-icon-list` and scope the layout to that class.

## Landing and Funnel Exceptions (Explicit List Only)
- Default: none. Any landing or checkout page that must use unified CSS must be explicitly listed here before changes are made.
- Exceptions (if approved): [TBD]

## Target Blocks to Review and Relocate
- Library specific styling: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:5310-5464`.
- Contact page styling: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:5831-6073`.
- Product and course page styling: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:6108-7726`.
- Founding Member landing page styling: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:7878-8350`.
- Home V2 block: `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css:8440-9520`.

## Suggested Next Session Workflow
1) Add wrappers to each Website Page HTML that has unique styles.
2) Update unified CSS to scope page specific blocks to their wrapper IDs.
3) Replace global resets with scoped utilities on the affected pages.
4) Move or gate landing and funnel CSS so it does not affect Website Pages.
5) Validate key pages listed in `projects/snooze-website/docs/technical/CONTENT-MAPPING.csv` for spacing, typography, and icon alignment.

## Change Protocol (Safe Editing Sequence)
1) Add or confirm wrapper ID in the page HTML.
2) Scope the smallest affected CSS block to that wrapper ID.
3) Validate the single page in Kajabi preview.
4) Confirm no visible regressions on other Website Pages.
5) Move to the next block only after sign-off.

## Validation Checklist (Website Pages)
- Spacing: section padding, block padding, and vertical rhythm.
- Icons: list bullets, cards, and inline icons align correctly without global `i` rules.
- Typography: heading sizes and paragraph spacing consistent across core pages.
- Buttons: shared buttons match global styles, page-specific buttons are scoped.
- No landing or checkout styles appear on Website Pages.

## Open Questions to Confirm
- Which landing pages must continue to use the unified CSS, if any.
- Which Website Pages can be normalized to the shared design system without custom styles.
- Whether to split the unified CSS into multiple files once scoping is complete.
