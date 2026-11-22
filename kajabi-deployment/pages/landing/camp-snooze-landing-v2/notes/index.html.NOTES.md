# index.html notes (Camp page: own pricing, local call times, clip, structure)

Date: November 22, 2026. Base: the live page from PR #118 (November 9, website-v1.6.46). Reference implementation ported from: the retired `apps/snooze-website/src/camp-vsl/` draft and its pricing module. The deployed files carry no comments; reasoning lives here.

## Structure (Kade ruling, November 22, 2026)

Landing-page code lives in the page theme's Custom CSS and Custom JS fields. The code block is markup only.

- `camp-snooze-coaching.css`: theme Custom CSS. All rules (System Initialization tokens, base, buttons, page styles, review styles, pricing styles). Starts with the rule hiding the native header and footer sections. The old source's two section-label comments were dropped; the System Initialization block (tokens, base typography, `.snooze-container`, `.btn`, hero, steps) comes first and page rules follow.
- `camp-snooze-coaching.js`: theme Custom JS. One IIFE: `ready()` helper, `start()` (guarded by `root.dataset.campReady`), `pricing/pricing.js` embedded verbatim, then `ready(start)` and `ready(CampPricing.boot)`. `ready()` runs at once if the document has loaded, otherwise at DOMContentLoaded, and a MutationObserver waits for `#camp-vsl-page` if Kajabi places the markup later. `pricing.js` has its own `data-pricing-ready` guard.
- `index.html`: markup only (font links, `#camp-vsl-page`, inline footer). Zero style and zero script tags. Inline `style` attributes on the falling crescents and the Wistia embed are kept.
- `theme-payload.json`: `custom_css` and `custom_js` carry the CSS and JS, the code block carries `index.html`. Regenerate with `python3 make_payload.py` (`--check` verifies). Never edit by hand.
- `pricing/pricing.js` and `pricing/pricing.test.cjs`: the pricing module and its tests. The test asserts the built JS contains `pricing.js` verbatim, so the module and the paste target cannot drift.
- Clip captions: source file lives in the media library at `website/camp-vsl-clip-2026-10-24/captions.vtt` (media files are blocked from the repo). The JS embeds the same text and builds the caption track from a Blob; the test compares against the media-library file when present.
- `preview.py`: local server that serves the three files the way Kajabi will (CSS in head, markup, JS in footer; `?js=head` simulates head placement).

`start()` also does what #118's inline footer script did (resolve footer links to joinsnooze.com, footer logo aria-label, footer heading aria-level) and injects `https://fast.wistia.com/assets/external/E-v1.js` when the page has a Wistia embed and the script is not present (the markup block can no longer carry the script tag).

## Ported functions (pricing.js, from camp-snooze-landing-v1.js)

Nothing in the old folder was modified. Values are identical; the test reads the old file and asserts equality.

| New function / constant | Ported from | Differences |
| --- | --- | --- |
| `CONFIG` (checkout bases, feed URL, public anon key, storage key) | `CAMP_CURRENCY_CONFIG`, `CAMP_CAPACITY_FEED_URL`, `CAMP_CAPACITY_ANON_KEY` | None. |
| `currencyFor` | `campInitCurrency` | Same rule: stored `snooze_currency_preference`, else timezone containing `Australia` is AUD, else USD. Takes inputs so it is testable. |
| `formatPriceNum`, `priceText`, price loop | `formatPriceNum`, `campUpdatePrices` | Same `data-usd`, `data-aud`, `data-period-*` attributes. |
| `checkoutUrl`, link loop | `checkoutUrl`, `campUpdateLinks`, `preserveInboundAttribution` | Same preserved keys (`utm_*`, `fbclid`, `gclid`, `cohort`, `cohort_*`); explicit cohort wins. |
| `setCurrency` and toggle | `campSetCurrency`, `campCreateToggle`, `campUpdateToggleUI` | Currency class sits on `#camp-vsl-page` (Kajabi strips body). Toggle is static markup, text labels. dataLayer surface is `camp_snooze_coaching`. |
| `cohortHtml`, `fallbackHtml`, `chooseCohort`, state labels | `renderCohorts`, `renderFallback`, `chooseCohort` | Same state mapping and copy. Values HTML-escaped. The access line now reads "Included Snooze Membership starts <Friday>" (membership wording, was "Snooze access opens"). |
| `dateLabel`, `countdownLabel`, 60 second refresh | same names | Same. |
| `closeLabel` | `closeLabel` | Now visitor time plus Melbourne, not Melbourne only. |
| `waitlistTarget` | `waitlistTarget` | Same order; no waitlist form on this page, so full or closed cohorts use the camp@ mailto. |
| feed request (`?limit=5`, 5 second abort, apikey and Bearer) | `CampCapacityWidget.init` | Same. |

Not ported: hero next-camp strip, sticky CTA, falling leaves, expired-countdown banner, waitlist form submit, `fa-` icons, the "Your camp reward: half-price Snooze, for life" box and the "two weeks free with quarterly access" clause.

## Call time display (pricing.js)

- `melbourneCallStart(YYYY-MM-DD)`: 10:00 Australia/Melbourne as a real instant (AEDT and AEST both correct across the 5 April and 4 October 2026 changes).
- Cohort card "First roll call" uses the cohort `start_date`. The daily block and FAQ line use the next upcoming 10:00 Melbourne call, no weekdays, with "the day before / the next day" for the visitor.
- Visitor in Melbourne, or any zone with the same UTC offset on that date and the same calendar day: Melbourne only. Otherwise visitor time first, Melbourne alongside.
- Overnight: visitor local start 22:00 inclusive to 06:00 exclusive shows "That live call is overnight for you. Calls are recorded, and you can post your questions in the forum beforehand."
- Any Intl or zone failure: "10-11am Melbourne time" only. That string is also the static markup fallback.

## What changed on the #118 page

- New `#camp-pricing` section between the inclusions and the FAQ: heading, USD/AUD toggle, price, two-row breakdown (2-Week 1:1 Sleep Transformation, Camper Price due today), ongoing price line with #118's membership wording, The Next Camp live cohort card, "Your daily call".
- Pricing section follows the old Camp page as #118 left it. #118 removed the "$79 / $119 1 Month Snooze Access" row and "Secure checkout • 15 families per camp" from the old page, so they are not here (the card says "Spots strictly limited", as the old page does). Price attributes carry the same period suffixes as the old page (` USD`, ` AUD`, ` USD a month`, ` AUD a month`). The test asserts every price tuple exists on the old page.
- Membership wording from #118 kept wherever it overlaps: included month starts the Friday before Camp and covers the two weeks; continues at the discounted rate; cancel ongoing membership anytime. The ongoing price line states $39.50 USD / $59.50 AUD a month and drops the old page's "half the usual price".
- Every link to `camp-snooze-sleep-coaching#pricing-section` and `#camp-value` now points to `#camp-pricing` (hero CTA, inclusions CTA, "Compare services" link, FAQ link). The coach-section link and the final CTA ("Find your next step") also point to `#camp-pricing`; they pointed at the hero CTA block `#camp-fit` before.
- Hero panel under the final VSL: label "How Camp works · 8 minutes", heading "Here’s how your two weeks at Camp work.", Sally paragraph. "Prefer to read?" link removed. Hero h1 and lead untouched.
- How it works: three steps on the left (#118 copy), the 29 second clip on the right with the caption "A look inside Camp · 29 seconds", stacked below 860px.
- FAQ "Do I need to attend the calls live?": the fixed AEDT sentence is now the local-time call line plus the overnight note. FAQ "How much is Camp": "The pricing section shows..." with the `#camp-pricing` link.
- Removed: "Shortened Google reviews from Camp families. Individual results vary." under the two supporting reviews. Review wall intro now reads "Read the reviews from previous Camp participants".
- Dead CSS removed: paused finder rules and its print block (the print block hid everything except a finder result that does not exist), `.privacy-note`, `.proof-note`, `.cw-head`, `.film a`, `.film .script`.
- Contrast: small gold text on green now cream (`.final-cta .script`, `.pricing .script`; gold on `--forest` is 3.7:1, cream is 7.8:1). The Snooze Village link in the pricing note is cream with a gold underline. Gold on `--forest-deep` is 5.2:1 and passes; the gold-filled toggle and buttons use dark text.
- #118's 34 reviews (opening Jade, two supporting, 31 wall), Google G logos, DM Sans labels, falling crescents, hero 100+ families line, problem statements, intake and onboarding copy, final VSL `ud1nugmerp` unchanged.

## Copy for Kade and Sally review

1. Overnight note promises recordings and a forum only. The FAQ also says "Replays are available". Confirm every roll call is recorded.
2. New eyebrow "Camp dates and pricing", "Your daily call" heading and "Roll call runs ..." sentence. "Your Sleep Transformation", "The Next Camp", price and breakdown labels are verbatim from the old page.
3. "Compare services" link now goes to the pricing section, whose breakdown shows the $3,500 against $690 comparison. Relabel if you would rather not point it there.
4. Pricing note uses "discounted rate of $39.50 USD a month" (price kept, "half the usual price" dropped).
5. "Your camp reward: half-price Snooze, for life" box not copied (a lifetime claim; matches no ruling found).

## Kade rulings, November 22, 2026

- Qualifying and disclaimer language removed; the terms and conditions cover it. Removed or never ported: "Your answers stay on this page...", "One parent's experience...", "Shared experiences... Individual results vary.", "Five-star Google reviews ... word for word.", "Camp includes your first month of Snooze access. Review the current price...", "One camp at a time, 15 families in it...", "This check does not confirm suitability or reserve a place." Genuine FAQ answers and the ongoing price disclosure stay. The FAQ answer "There is no promise that every baby will sleep through by a particular date..." answers a visitor question, so it stays.
- Hero video stays the final VSL. Kajabi Media Library asset 5221719 (Camp Snooze VSL_2611, `camp-main-v07.mp4`, 226,912,138 bytes, 455.12 s) uses Wistia player `ud1nugmerp`, the same embed as the old Camp page. Kajabi's `used_count` stays 0 for code-block embeds; that is expected.
- Landing-page code in Custom CSS and Custom JS, markup-only code block (see Structure).

## Not verified

- Live checkout click-through and Kajabi render (not deployed, by instruction).
- A real non-Melbourne browser timezone: agent-browser has no timezone emulation. London and New York layouts were checked by calling `CampPricing` with that timezone in a Melbourne browser; conversion logic is covered by node tests.
- Live feed returned Camp #21 (filling) during the preview check; other states are covered by node tests only.
- Whether Kajabi's theme Custom CSS and Custom JS fields accept these file sizes and whether the JS loads from head or footer. Both placements were simulated with `preview.py` (`?js=head` and `?js=foot`).
