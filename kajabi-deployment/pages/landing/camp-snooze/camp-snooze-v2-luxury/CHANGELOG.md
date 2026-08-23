# Camp Snooze V2 - Changelog

**Location:** `apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze/camp-snooze-v2-luxury/`

---

## [2026-08-23] - Price Before Dates, and a Consistent Card Date

Landing page: **Welcome to Camp Snooze** (`camp-snooze-sleep-coaching`, page
`2151771543`, theme `2164288957`). Deployed live the same day.

### Changed
- **Pricing section moved above the cohort grid.** `#pricing-section` now
  precedes `#camp-capacity-section`, with a gold "Select your dates" CTA
  anchoring down to it. The visitor reads the price before choosing a date.
- **CTA targets split at the price.** The six CTAs above the price section
  (hero, inclusions, who it's for, how it works, key dates, why camp costs less)
  now anchor to `#pricing-section`; they previously skipped straight to the date
  grid, so a visitor could reach the cohort buttons without seeing the price.
  The two CTAs below the price still go to `#camp-capacity-section`.
- **Sticky footer carries the camp price alone.** It used to print
  `$997 AUD today, then $59.50/mo AUD`, which read as a second charge rather
  than a continuation.
- **Pricing card slimmed.** Dropped the "Camp Snooze plus one month of Snooze
  access, included (continues at .../month ...)" paragraph, which repeated the
  section intro two lines above it.
- **Cost FAQ follows the currency toggle.** Both amounts in "What's included and
  what does it cost?" were hard-coded USD; they are now `dynamic-price` spans, so
  AUD readers see `$997 AUD` and `$59.50 AUD a month`.
- **Cohort dates abbreviate the month.** `Monday 14 Sept 2026`, not
  `Monday 14 September 2026`, so no card wraps to two lines while its neighbours
  do not. Abbreviations come from the `CAMP_MONTHS` table rather than `Intl`'s
  `month: 'short'`, because ICU disagrees across browsers on `Sep` vs `Sept`.
  Day, weekday and year stay on `Intl`, pinned to `Australia/Melbourne`.
- **Key Dates rows share one icon column.** The highlighted roll call row
  carried 1rem of horizontal padding the other rows did not, and centre
  alignment floated the icon to the middle of any row whose copy wrapped. Rows
  now share the same padding plus a transparent 1px border, align to the top,
  hold the icon at a 2rem box, and the closing "For best results" note gets the
  same icon column instead of an inline glyph.

### Removed
- **Inline currency toggle in "Choose Your Camp"** (`#camp-currency-toggle-wrap`).
  The sticky footer and nav toggles remain. See `CURRENCY-TOGGLE.md`.

### Fixed (repo drift against live)
The live page had two changes the repo never received; a blind paste would have
reverted both.
- AUD checkout URL keeps its `/checkout` suffix.
- The capacity feed requests `?limit=5`, not `?limit=3`.

### Files Modified
- `camp-snooze-landing-page-blocks.html`
- `camp-snooze-v2-luxury.js`
- `README.md` (deploy route, mode switching, cohort date format)
- `CURRENCY-TOGGLE.md` (toggle placement)

### Deploy note
The theme editor's Custom Code fields and the block code field are Ace editors;
Save issues one `PUT /admin/themes/2164288957/settings` with the whole settings
hash, with no draft layer. `README.md` carries the `agent-browser` recipe used
here, and the reminder to diff live against the repo first.

---

## [2026-01-30] - Dynamic Currency Toggle (AUD/USD)

### Added
- **Currency toggle:** AUD/USD switch for Camp Snooze landing page (standalone pilot).
- **Pricing section toggle:** Inline toggle above pricing card (HTML + inline styles).
- **Sticky footer toggle:** Compact USD/AUD buttons next to price in floating CTA.
- **Auto-detection:** Australia timezone defaults to AUD; others to USD.
- **Persistence:** Preference stored in `localStorage` key `snooze_currency_preference`.
- **Checkout URLs:** USD → `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`; AUD → `https://www.joinsnooze.com/offers/46Bz9tk6`.
- **Data attributes:** All price elements use `dynamic-price` with `data-usd` / `data-aud`; all checkout links use `dynamic-cta` and `data-checkout`.
- **Analytics:** `currency_change` event pushed to dataLayer for GTM.

### Changed
- **Price display:** AUD prices show as `$885 AUD` (no "A" prefix before dollar).
- **Link logic:** CTAs set to full checkout URL per currency (not ID replacement).

### Files Modified
- `camp-snooze-landing-page-blocks.html`
- `camp-snooze-v2-luxury.css`
- `camp-snooze-v2-luxury.js`

### Files Created
- `CURRENCY-TOGGLE.md` (implementation reference)

---

## [2026-01-29] - Feb 9 Intake Sales Mode

### Changed
- **Reverted to sales mode:** Landing page no longer waitlist; CTAs go to checkout (offer K3Y6FEKX).
- **Pricing:** $590 one-time (or $510 with member coupon); optional $197/quarter subscription. No non-member-only price.
- **Sticky CTA:** Link updated from `#pricing-section` to `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`.
- **Key Dates CTA:** "Join Camp Snooze" at bottom of Key Dates now links to checkout.
- **Offer:** All pricing-section and value-breakdown CTAs use checkout URL K3Y6FEKX.

### Added
- **Value breakdown section:** "Why Camp Costs Less" after Key Dates (Camp vs 1:1: $3,500 + $79, discount, $590). Uses existing `.breakdown-container` / `.breakdown-row` styles.
- **Quarterly option:** Copy and checkout block show $197/quarter option alongside one-time $590.
- **Checkout block:** `camp-snooze-feb9-checkout-blocks.html` (one-time + quarterly, Feb 9 dates, Snooze access Feb 6).
- **Doc:** `../CAMP-SNOOZE-FEB9-INTAKE.md` – pricing, dates, file list, deployment checklist.

### Files Modified
- `camp-snooze-landing-page-blocks.html`
- `camp-snooze-v2-luxury.js`

### Files Created
- `camp-snooze-feb9-checkout-blocks.html` (in `pages/checkout/camp-snooze-v2-luxury/`)
- `../CAMP-SNOOZE-FEB9-INTAKE.md`

---

## [2026-01-07] - Icon Loading Fixes & Pricing Updates

### Fixed
- **Font Awesome Icons Not Loading**: Added inline Font Awesome CSS links directly in checkout HTML files to ensure icons load in Kajabi Custom Code Blocks
  - Updated: `camp-snooze-bundle-checkout-blocks.html`
  - Updated: `camp-snooze-checkout-blocks.html`
  - Added JavaScript fallback in `camp-snooze-v2-checkout.js` to dynamically inject Font Awesome if not already loaded

- **Incorrect Membership Pricing**: Fixed Snooze membership pricing from launch price ($147/quarter) to BAU price ($197/quarter) across all v2 pages
  - Updated: `camp-snooze-bundle-checkout-blocks.html` - Membership price: $147 → $197
  - Updated: `camp-snooze-bundle-checkout-blocks.html` - Total: $537 → $587
  - Updated: `camp-snooze-landing-page-blocks.html` - Membership price in upsell modal: $147 → $197
  - Updated: `camp-snooze-landing-page-blocks.html` - Bundle total: $537 → $587
  - Updated: `Camp Snooze Pricing V2 Mockup.html` - Membership price: $147 → $197

### Added
- **New Member-Only Checkout Page**: Created `camp-snooze-member-checkout-blocks.html` for existing Snooze members purchasing Camp Snooze at member price ($390)
  - Features member recognition banner
  - Shows $300 savings
  - Reminds users of existing membership benefits
  - No membership line item (they already have it)
  - Total: $390 USD

- **Snooze Village Link**: Added clickable link to Snooze Village on landing page (line 486)
  - Link URL: `https://joinsnooze.com/products/communities/v2/snooze`
  - Styled with camp-sage color for consistency

### Technical Changes
- **JavaScript Enhancement**: Added Font Awesome loading detection and fallback injection in `camp-snooze-v2-checkout.js`
  - Checks for existing Font Awesome stylesheet
  - Dynamically injects if missing
  - Ensures icons display even if header tracking code fails

### Files Modified
- `camp-snooze-bundle-checkout-blocks.html`
- `camp-snooze-checkout-blocks.html`
- `camp-snooze-landing-page-blocks.html`
- `camp-snooze-v2-checkout.js`
- `Camp Snooze Pricing V2 Mockup.html`

### Files Created
- `camp-snooze-member-checkout-blocks.html`

---

## [2026-01-07] - Initial V2 Implementation

### Added
- Complete V2 landing page implementation (member-first pricing model)
- Bundle checkout page for member upgrade path
- Standalone checkout page for non-member path
- Unified checkout styling and JavaScript
- Implementation summary documentation

See `IMPLEMENTATION-SUMMARY.md` for complete details.

---

**Last Updated:** January 29, 2026
