# Landing Page Changelog

All notable changes to the Snooze Landing Page project.

---

## [2025-11-07] Desktop Layout Optimization & Review Cards Update

### Improved
- **Section spacing control system** - Reorganized Kajabi override rules for easier spacing adjustments
  - Consolidated section spacing rules (lines 369-420) into clear, documented controls
  - Each section now has its own `margin-top` and `margin-bottom` control
  - Kept essential Kajabi wrapper overrides (lines 341-367) to prevent platform defaults
  - All spacing values now adjustable in one centralized location
  - Comments added to each section for easy modification

### Changed
- **Transformation reviews section** - Updated review cards with profile pictures
  - Removed "5.0" rating text next to stars
  - Center-aligned star ratings
  - Added round profile picture thumbnails (48px) next to names
  - Removed "Verified Parent" text and checkmark icon
  - Profile images are now `<img>` tags with placeholder URLs (easy to replace)
  - Images styled with `border-radius: 50%`, `object-fit: cover` for perfect circles
  - Author section now vertically stacked and center-aligned
  - Added padding to review cards for better spacing (`var(--spacing-md)`)
  - Increased section top padding from `var(--spacing-xl)` to `var(--spacing-2xl)` (64px)
  - Increased "Snooze helps" text bottom margin from `var(--spacing-xl)` to `var(--spacing-2xl)` (64px)
  - Author name font size optimized to `0.875rem` for better readability
  - Tighter quote line-height (1.4) for more compact cards
  - Outcome refrain margin updated to `margin: 0 var(--spacing-md)` (mobile-friendly)
  - Outcome refrain copy updated to "Snooze helps parents reduce night wakes and extend naps."
- **Inside Snooze section** - Typography and spacing refinements
  - Section padding set to `var(--spacing-2xl) var(--spacing-lg)` (desktop) and `var(--spacing-xl) var(--spacing-md)` (mobile)
  - Card headings and body text normalized to 1rem to match hero body copy
  - Grid gap reduced to `var(--spacing-lg)` for tighter layout
  - Added consistent line-height (1.6) and tightened card spacing for readability
  - Section margin spacing now controlled via centralized spacing block (desktop & mobile overrides)
  - Mobile container padding added (`padding-left/right: var(--spacing-lg)`) for comfortable side gutters

### Fixed
- **Desktop/tablet spacing** - Reduced content spread to match Good Inside layout
  - Max-width reduced from 1200px to 1100px for tighter container
  - Grid gap reduced from 3rem (48px) to 2rem (32px) between columns
  - Hero section padding optimized for desktop (`var(--spacing-xl)` instead of `var(--spacing-2xl)`)
  - Content now properly contained within viewport
- **Hero section top padding** - Fixed header obstruction on desktop/tablet
  - Added `padding-top: calc(80px + var(--spacing-xl))` to desktop hero section
  - Properly accounts for fixed navbar height (80px) plus spacing (48px)
  - Hero content now visible and not hidden behind navbar
- **Mobile hero spacing** - Significantly reduced spacing above "FOR PARENTS" callout on mobile
  - Hero section top padding: Manually adjusted to `calc(30px + 0.25rem)` for minimal top spacing
  - Hero content wrapper gap: Reduced from `var(--spacing-lg)` (32px) to `var(--spacing-sm)` (16px)
  - Callout now sits much closer to header with minimal white space
- **Mobile callout single-line** - Compressed "FOR PARENTS" callout to single line on mobile
  - Font size reduced from 0.75rem to 0.625rem (10px)
  - Padding reduced from 0.75rem 1rem to 0.5rem 0.75rem
  - Letter spacing reduced from 0.05em to 0.03em
  - Added `white-space: nowrap` to force single line
  - Callout now takes up significantly less vertical space
- **Image shadow removed** - Eliminated large `box-shadow` under hero image on desktop
  - Changed from `var(--shadow-xl)` (0 20px 40px) to `none`
  - Cleaner, more modern appearance matching reference design

### Technical Details
- Updated both `src/styles.css` and `kajabi-deployment/kajabi-custom-css.css`
- Desktop spacing changes scoped to `@media (min-width: 769px)` 
- Mobile callout padding reduced in base styles (affects mobile only, desktop overrides maintained)

---

## [2025-11-07] Hero Section Updates

### Removed
- **Star rating** display ("Rated 5.0/5.0 (500+ reviews)") from hero section
- **Money-back guarantee** button ("14-Day Money-Back Guarantee") from hero section
- Simplified hero to end cleanly after checklist bullets

### Fixed
- **Mobile layout** - Resolved all elements overlapping issue
  - **Root Cause:** Incorrect HTML nesting prevented independent element ordering
  - **Solution:** Moved checklist and rating/guarantee out of `.hero-text-side` to be direct children of wrapper
  - Restructured HTML to allow flexbox `order` properties to work correctly
- **CSS Synchronization** - Rewrote Kajabi CSS to match working local version
  - Image overlapping: `margin-top: clamp(-14rem, -8vh, -16rem)`
  - Image flush right: `margin-right: -1rem !important`
  - Complete text styling for H1, description, tagline, CTA
  - Desktop grid: `grid-template-columns: 1fr 1fr`, image spans rows 1-3

### Technical Details
- **Mobile:** Flexbox column with explicit `order` properties
  - order: 0 (callout-mobile) → 1 (text) → 2 (image) → 3 (checklist)
- **Desktop:** CSS Grid with two columns, checklist below CTA in left column
- **Responsive:** `clamp()` for all responsive values (margins, widths, heights)
- **Breakpoint:** 769px for mobile-to-desktop transition

### Commits
- `403ff0d` - Fix: Hero section mobile layout - resolve overlapping elements
- `481d846` - Remove star rating and money-back guarantee from hero section
- `fed146d` - Update deployment guide - note removal of rating/guarantee

---

## [2025-11-06] Major Content & Structure Updates

### Added
- **Section 3 (Age Stages)** - Completely restructured to match Good Inside design
  - Horizontal age toggles (0-3mo, 3-4mo, 5-12mo, 12+mo)
  - Dynamic feature switching based on age selection
  - Integrated real copy from joinsnooze.com
  - Grid layout: age info left, features right

- **Transformation Reviews Section** - Replaced generic trust row
  - 3 powerful review cards with 5-star ratings
  - Verified parent badges
  - Outcome refrain: "Snooze helps parents reduce night wakes..."
  - Clean, card-based design

- **What's Inside Snooze** - New section with 4 feature boxes
  - Guides for Every Age
  - Weekly Coaching Calls
  - Private Parent Community
  - New Tools Each Month

- **Who Snooze is For** - New section with bullet list
  - Target audience clarification
  - Entry-level pricing messaging

### Changed
- **Global Checkout URL System**
  - Implemented `window.SNOOZE_CHECKOUT_URL` variable
  - All `[data-checkout]` elements route to single URL
  - Easy to update in one place

- **Hero Section**
  - Updated subheading to outcome statement
  - Centered CTA button
  - Compact spacing for better flow

### Documentation
- Created comprehensive **Copy Review Document** for Sally
- All copy changes annotated with context and rationale
- Ready for client review

---

## [2025-11-01] Documentation & Code Cleanup

### Changed
- **Documentation Organization**
  - Archived 10 historical summary documents to `archive/historical-summaries/`
  - Kept only 5 active documentation files
  - Created organized documentation index in README

### Removed
- Old analysis reports and session summaries
- Duplicate documentation
- Outdated planning documents

### Files Kept (Active)
- `PROJECT-OBJECTIVES.md` - Current project status & objectives
- `SNOOZE-TECHNICAL-REFERENCE.md` - Technical specs & SEO
- `kajabi-style-guide-settings.md` - Kajabi settings reference
- `MOBILE-APP-FEEL-IMPLEMENTATION.md` - Mobile UX guide
- `MOBILE-RESPONSIVE-STRATEGY.md` - Responsive design strategy

---

## [2025-10-XX] Initial Development

### Added
- Complete landing page HTML structure
- Custom CSS with design tokens
- JavaScript for interactive elements
  - Testimonial carousel
  - Age stage toggles
  - Sticky CTA bar
  - FAQ accordions
- Kajabi deployment files
  - Custom CSS overrides
  - Custom JavaScript
  - HTML blocks (modular sections)

### Design System
- Color palette: Coral (#F43357), Navy (#1F293B), Cream (#FAF7F4)
- Typography: Playfair Display (headings), Poppins (body)
- Spacing scale: 8px base unit
- Border radius: 25px standard (Kajabi-aligned)

### Sections Implemented
1. Navigation Header
2. Hero Section (mobile overlapping image)
3. Transformation Reviews (3 cards)
4. Feature Cards (4 benefits)
5. Age Stages (dynamic toggles)
6. Value Comparison Table
7. Trust/Founder Section
8. Testimonials Carousel
9. Pricing (2 plans)
10. FAQ Accordion
11. Footer

---

## Version History

- **v2.44** - Current (Nov 7, 2025) - Hero section simplified, mobile layout fixed
- **v2.40** - (Nov 6, 2025) - Transformation reviews, age stages restructure
- **v2.35** - (Nov 1, 2025) - Documentation cleanup
- **v2.29** - Feature cards in one line
- **v2.0** - Initial Kajabi deployment

---

## Files

### Source Files (Local Development)
- `src/index.html` - Main HTML structure
- `src/styles.css` - Main stylesheet (v2.44)
- `src/script.js` - Main JavaScript (v2.44)
- `src/assets/` - Images and media

### Kajabi Deployment
- `kajabi-deployment/kajabi-html-blocks.html` - Modular HTML sections
- `kajabi-deployment/kajabi-custom-css.css` - CSS with Kajabi overrides
- `kajabi-deployment/kajabi-custom-javascript.js` - JavaScript for Kajabi
- `kajabi-deployment/DEPLOYMENT-GUIDE.md` - Deployment instructions

### Documentation
- `docs/CHANGELOG.md` - This file
- `docs/PROJECT-OBJECTIVES.md` - Project goals and status
- `docs/SNOOZE-TECHNICAL-REFERENCE.md` - Technical specifications
- `docs/kajabi-style-guide-settings.md` - Kajabi theme settings
- `docs/MOBILE-APP-FEEL-IMPLEMENTATION.md` - Mobile UX guide
- `docs/MOBILE-RESPONSIVE-STRATEGY.md` - Responsive design strategy
- `docs/LANDING-PAGE-COPY-REVIEW.md` - Copy review for client

---

## Next Steps

1. **Deploy to Kajabi:**
   - Follow `DEPLOYMENT-GUIDE.md` in `kajabi-deployment/`
   - Test on both mobile and desktop
   - Verify all checkout URLs

2. **Copy Review:**
   - Review `LANDING-PAGE-COPY-REVIEW.md`
   - Get client feedback on all copy changes
   - Make any final adjustments

3. **Testing:**
   - Mobile responsiveness (375px - 768px)
   - Desktop layout (769px+)
   - All CTAs link to correct checkout
   - FAQ accordions work
   - Age stage toggles switch content

4. **Future Enhancements:**
   - A/B testing different hero layouts
   - Add video testimonials
   - Implement analytics tracking
   - Consider adding trust badges

