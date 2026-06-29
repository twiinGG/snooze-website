# global/css - Snooze Unified Theme

## Deployment location

Kajabi Settings > Website > Theme > Custom CSS

Paste the full contents of `snooze-unified-theme.css` into that field. This is the single CSS file for all website pages and sales funnels on joinsnooze.com.

## File: snooze-unified-theme.css

Version 3.0 (Merged). Created January 2025.

Contains all CSS for website and home pages:

- Global Design System and Variables
- Navigation and Footer
- Global Hero Sections
- Library Page Styles
- Home Page Components (Transformation, Pricing, FAQ, etc.)
- Sticky CTA and Mobile Optimizations

### Section index

| Section | Description |
|---------|-------------|
| 0 | `@import` (Font Awesome CDN) |
| 1 | Design System Variables (`:root`) |
| 2 | Reset and Base Styles |
| 3 | Kajabi Overrides (flush section/block wrappers) |
| 4 | Navigation Styles (custom header `.snooze-nav-clean`) |
| 5 | Button Styles (global and landing) |
| 6 | Global Hero Sections (website pages) |
| 7 | Home Page Hero (`.hero-section-complete`) |
| 8 | Component: Transformation Reviews |
| 9 | Component: Inside Snooze / What's Included |
| 10 | Component: Feature Section |
| 11 | Component: Age Stages Section |
| 12 | Component: Value Comparison |
| 13 | Component: Trust and Founder |
| 14 | Component: Testimonial Carousel |
| 15 | Component: Pricing |
| 16 | Component: FAQ |
| 17 | Component: Price Anchoring |
| 18 | Component: Who It's For |
| 19 | Component: Understanding Newborn |
| 20 | Library Page Styles (global) |
| 21 | Footer Styles |
| 22 | Sticky CTA Bar and Utilities |
| 23 | Context-Aware CTA and Signposting |
| 24 | Product Landing Page Styles |
| 25 | Product Page Dark Theme Styles |

### Design System Initialization rule (CRITICAL)

Every new page wrapper ID requires its own System Initialization block before any page-specific styles. The design system tokens are scoped to `#home-page`; new page IDs cannot inherit them without a full init block.

Template: copy the `#ask-sally-page` System Initialization block from this file.
Full documentation: `apps/snooze-website/docs/technical/CSS-STABILIZATION-BRIEF.md`.

### Kajabi Override notes

Section 3 removes default Kajabi padding and margins on `section[class*="section"]`, `div[class*="block"]`, `div[class*="Block"]`, `div[class*="code-block"]`, and `div[class*="html-block"]` wrappers. This is scoped to a named list of page IDs (`#home-page`, `#about-sally-page`, etc.) and the `.home-page-active` body class. Adding a new page requires adding its ID to the selector list in section 3.

### Banner / nav offset

When `.sn-banner-visible` is present on `<body>`, the sticky nav (`top: 80px`) shifts down by 50 px to sit below the announcement banner. The banner JS toggles this class.

## File: currency-toggle.css

**Kajabi deployment location:** Settings > Website > Theme > Custom CSS (paste separately or append to snooze-unified-theme.css)

**Purpose:** Styles for the USD/AUD currency toggle component.

**Component Classes:**
- `.currency-toggle-btn` - Toggle button with hover, focus, and active states
- `.currency-flag` - Flag emoji display
- `.dynamic-price`, `.dynamic-cta` - FOUC prevention; hidden until JS determines currency
- `.checkout-currency-switch` - Checkout-page currency selector text
- `.aud-discount-warning` - Yellow warning box for AUD pricing notes
- `.currency-mode-aud` - Body class active when AUD currency is selected
- `.sr-only` - Screen-reader-only text for accessibility

**Responsive:** Mobile breakpoint at 768px with adjusted button sizing and full-width toggle option.
