# Camp Snooze V2 - Changelog

**Location:** `apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze/camp-snooze-v2-luxury/`

---

## [2026-08-25] - One Camp, With a Deadline

Kade, 2026-08-25: "in giving all the options for booking camp snooze we have
inadvertantly removed a sense of urgency." Listing the next five intakes meant a
family who could not make the soonest camp clicked a later card instead, so
nothing on the page ever closed and there was no reason to decide today.

### Changed
- **The capacity widget renders one cohort, not five.** `renderCohorts` now picks
  a single camp through `chooseCohort` and renders one card. The feed request
  stays at `?limit=5` on both the landing page and the checkout: the checkout
  resolves `?cohort=N` by searching that window, and narrowing it would silently
  fall back to the wrong camp.
- **Auto-advance when the immediate camp is gone.** A full or closed soonest camp
  hands the card to the next sellable one, so the page always has something to
  buy. The skipped camp is not shown at all — a "Camp #15 is full" card beside a
  "Camp #16 is open" card is the list this change removed. Only when nothing in
  the window is sellable does the card fall back to the soonest camp with a
  waitlist CTA.
- **The card names the deadline.** "Intake closes Thursday 27 Aug, 11:59pm" plus
  a countdown pill that coarsens with distance: days, then hours inside a day,
  then minutes inside an hour. It reads `checkout_close_at`, which
  `get_camp_capacity` is already enforcing, so the card cannot promise a window
  the checkout will not honour. A tab left open re-reads the feed when the
  deadline passes rather than guessing at the new state.
- **Copy follows the model.** Section heading "Choose Your Camp" -> "The Next
  Camp"; every "Choose Your Camp" / "Select your dates" CTA -> "Join the Next
  Camp"; card CTA "Choose Camp #N" -> "Join Camp #N".
- **Key Dates corrected.** The block said "1 Week Prior: Applications Close",
  which was never what the system did. It now reads "Thursday 11:59pm: Intake
  closes, the day before access opens", matching the rule the feed enforces.
- **Checkout pages carry the same deadline.** A new Key Dates row
  (`[data-camp-cohort-close]`) and a line on the live availability card, both on
  the regular and member checkout blocks, so the sentence a buyer read before
  clicking is the sentence on the page they pay on.

### Database
- `supabase/migrations/20260825090000_camp_intake_close_at.sql`. Every cohort had
  a null `checkout_close_at`, so there was no deadline to show or enforce. A
  `before insert or update` trigger derives it from `access_friday`, and the eight
  existing cohorts were backfilled. The trigger only fills a null, so an explicit
  override, an extended intake or an early close, always wins.
- `supabase/migrations/20260825140000_camp_intake_close_aest.sql`. Kade's ruling
  later the same day: every time and date we write is AEST, GMT+10, never
  "Melbourne". The offset had to move with the label, not just the wording.
  Melbourne runs AEDT, GMT+11, from October to April, so a page reading
  "11:59pm AEST" on the old zonal rule would have named an instant an hour off
  its own label from camp 19 onward. The trigger and all eight rows now use a
  fixed offset. Camps 15 to 18 close before the switch and did not move; camps 19
  to 22 each moved an hour later, which adds an hour of selling rather than
  removing one. A Melbourne reader's own clock in summer shows 12:59am on the
  Friday.
- `supabase/migrations/20260825150000_camp_intake_close_aest_sign_fix.sql`. The
  migration above used `at time zone '+10'`, and Postgres reads a bare `'+10'`
  with POSIX sign semantics, meaning UTC MINUS 10. Camp 15's close was stored as
  2026-08-28T09:59:59Z instead of 2026-08-27T13:59:59Z: twenty hours late, and
  past the access Friday it exists to precede. The verify query used the same
  inverted expression and printed a correct-looking answer; the live page, which
  formats with `Etc/GMT-10` in `Intl` (real tzdata, UTC+10), showed "Intake closes
  Friday 28 Aug, 7:59pm AEST" and gave it away. The derivation now subtracts
  `interval '10 hours'` and labels the result UTC, so there is no sign convention
  left to get wrong. Read back on all eight rows: every close is 13:59:59Z, which
  is Thursday 23:59:59 AEST.

### Deployed
- All six live surfaces pasted and verified 2026-08-25: landing theme `2164288957`, waitlist theme
  `2164775842` (theme CSS, theme JS, page block on each), and the checkout Custom JS plus block on all
  four offer themes, `2164289025` USD, `2164667756` AUD, `2164675367` USD member, `2166737611` AUD
  member. Every field was diffed live against the repo before overwrite; only the waitlist page had
  drifted, and it was two fixes behind (`audCheckoutUrl` missing `/checkout`, `?limit=3`).
- Paste targets now ship comment-free per Kade's rule the same day. Comments moved to
  `notes/<filename>.NOTES.md`; `scripts/kajabi/extract-comments.mjs` does the move and its `--check`
  mode gates commits, with a PreToolUse hook blocking Write/Edit.

### Tests
- `tests/camp-single-intake.test.mjs` (new): one card out of a five-cohort feed,
  auto-advance past full and closed camps, waitlist when nothing is sellable, and
  the countdown at day / hour / minute scale including the expired case.
- `tests/camp-capacity-bands.test.mjs`: pinned `nowMs`, asserts the close line
  and countdown on an open camp and their absence on a full one.
- `checkout/.../tests/camp-checkout-cohort-summary.test.mjs`: asserts the close
  row and the card line render the same instant the feed enforces.

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
  Day, weekday and year stay on `Intl`, pinned to `Etc/GMT-10`, which is AEST.
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
