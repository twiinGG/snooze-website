# global/css - Snooze theme CSS

## Deployment location

Kajabi Settings → Website → Theme → Custom Code → **CSS**

Paste the full contents of [`theme-custom-code.css`](./theme-custom-code.css) into that field. This is the canonical CSS file for all website pages on joinsnooze.com.

[`snooze-unified-theme.css`](./snooze-unified-theme.css) is historical reference only (not a paste source).

Operator index: [`../../PASTE-MAP.md`](../../PASTE-MAP.md) row A2.

---

## Comment-free paste rule (CRITICAL)

Deployable website code must ship **without internal commentary** (CSS `/* */`, HTML `<!-- -->`, or JS `//` / block comments that are not required syntax). Comments in live paste fields are visible in page source and get picked up by AI scrapes and crawlers.

- [`theme-custom-code.css`](./theme-custom-code.css) is comment-free as of 2026-07-28 (405 comments removed).
- Genuine instructions live in this README (and page-level READMEs), not in the paste file.
- Live Kajabi may still prepend its own wrapper line `/* Custom CSS Added Via Theme Settings */`. That is Kajabi-injected, not repo commentary. Repo-vs-live compare allows exactly that delta.

After editing the CSS, re-paste the whole field (A2). Do not leave operator notes in the file.

---

## File: theme-custom-code.css

Contains all shared website CSS: design tokens, Kajabi flush overrides, nav/footer, heroes, home components, guide/age/chooser pages, Ask Sally / Reviews / Press init blocks, and related utilities.

### Design System Initialization rule (CRITICAL)

Every new page wrapper ID requires its own System Initialization block before any page-specific styles. Design-system tokens are scoped per wrapper (historically `#home-page`); new page IDs cannot inherit them without a full init block.

Template: copy the `#ask-sally-page` System Initialization block from this file.  
Full documentation: [`CSS-STABILIZATION-BRIEF.md`](../../../docs/technical/CSS-STABILIZATION-BRIEF.md).

When adding a page: (a) wrap content in `<div id="X-page">`, and (b) add that id to every shared `:is(...)` / flush-override selector list that should apply (Kajabi spacing reset, guide pages scope, etc.).

### Kajabi flush overrides

Default Kajabi padding/margins are removed on `section[class*="section"]`, `div[class*="block"]`, `div[class*="Block"]`, `div[class*="code-block"]`, and `div[class*="html-block"]` wrappers. Scope is a named list of page IDs (`#home-page`, `#about-sally-page`, guide wrappers, etc.) plus `.home-page-active`. **Adding a new page requires adding its ID to those selector lists**, or the page keeps Kajabi side padding.

### Banner / nav offset

When `.sn-banner-visible` is present on `<body>`, the sticky nav shifts down to sit below the announcement banner. Banner JS toggles this class.

### About Sally / One Voice

Common-challenges chips on About Sally are deliberately quiet secondary help links (not coral). Coral stays reserved for the primary CTA (One Voice / T2). Mobile: chips stay compact and subordinate; two-per-row max.

### Guide / triage pages

Guide-page design system (chooser + age hubs + challenge pages) is home-matched. The “Is this normal?” triage block is flat and mobile-first: scannability from labels, hairlines, and weight, not status colours or side-stripes.

### T1 accessibility contrast (staged 2026-07-11)

White text on coral `#F43357` and coral text on white were under WCAG AA for small text in places. T1 contrast overrides live in this file; do not reintroduce low-contrast coral/white pairings for body or small UI text.

### Challenge-page FAQ (`.snooze-faq`), added 2026-08

Visible FAQ companion for the FAQPage schema on challenge pages, first used on `/catnapping`. Unscoped by class name so any wrapper can use it; sizes follow DESIGN.md body (1rem) and the guide-page heading scale. Starter source kept at `pages/website/catnapping/optional-faq.css` as a diff helper only, and that file is queued for deletion under CNG-002 because it now only invites edits to the wrong file.

### Kajabi form embed in a capture section (`.snooze-form-embed`), added 2026-08

Scoped through one `:is()` selector to the challenge and age pages that carry resource forms. It hides `.kajabi-form__title` and `.kajabi-form__subtitle`, because each section's own `<h2>` and lead paragraph own the pitch, then restyles the Kajabi inputs and submit button to match `.btn`. Keep every new resource-form page in this selector. The native Kajabi title and subtitle still need resource-specific fallback copy so a missed wrapper cannot expose newsletter language again. Context: `docs/projects/catnapping-guide/00-overview.md`.

### Temporary / experimental CSS

Do **not** park temporary rules inside the paste file with “REVERT SECTION” comments (that pattern was removed with the comment strip). Prefer a short-lived branch or a dated note in this README, then delete the rules when done.

### Known leftover from the 2026-07-28 strip (manual delete)

Nested comments in the old REVERT SECTION left a small inert remnant that a design-hook block prevented this session from deleting automatically. Search the file for `REVERT INSTRUCTIONS` or `#ff0000` and delete that block (the example `.test-button` rule plus the leftover prose ending in `*/`) before the next Kajabi paste. It is not intentional design.

---

## File: currency-toggle.css

**Not the primary paste source.** Currency-toggle styles that matter live in Header Page Scripts / composed surfaces as documented in [`PASTE-MAP.md`](../../PASTE-MAP.md). This file is retained for reference / legacy extract use.

**Component classes (reference):**
- `.currency-toggle-btn` - Toggle button with hover, focus, and active states
- `.currency-flag` - Flag emoji display
- `.dynamic-price`, `.dynamic-cta` - FOUC prevention; hidden until JS determines currency
- `.checkout-currency-switch` - Checkout-page currency selector text
- `.aud-discount-warning` - Yellow warning box for AUD pricing notes
- `.currency-mode-aud` - Body class active when AUD currency is selected
- `.sr-only` - Screen-reader-only text for accessibility
