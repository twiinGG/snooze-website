# camp-snooze-v2-luxury.js - notes

Comments extracted from `camp-snooze-v2-luxury.js`. That file is pasted into Kajabi and ships to
every visitor, so the reasoning lives here instead. Each note names the line it sat above and the
code that followed it, so a note whose anchor no longer exists is a note to re-check.

Regenerate with `node scripts/kajabi/extract-comments.mjs apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-v2-luxury.js`.

---

## Line 5

```
// Both of these MUST end in /checkout. Kajabi redirects /offers/{slug} to
```

Both of these MUST end in /checkout. Kajabi redirects /offers/{slug} to

## Line 6

```
// /offers/{slug}/checkout and throws the query string away in the process, so a
```

/offers/{slug}/checkout and throws the query string away in the process, so a

## Line 7

```
// base without /checkout silently loses ?cohort=N. This one was missing it, and
```

base without /checkout silently loses ?cohort=N. This one was missing it, and

## Line 8

```
// the symptom was every buyer landing on a checkout that said "Camp Snooze #15
```

the symptom was every buyer landing on a checkout that said "Camp Snooze #15

## Line 9

```
// Starts Monday 31 August 2026" no matter which camp they clicked. The checkout's
```

Starts Monday 31 August 2026" no matter which camp they clicked. The checkout's

## Line 10

```
// own JS was correct all along: given the parameter it resolves the cohort from
```

own JS was correct all along: given the parameter it resolves the cohort from

## Line 11

```
// the live feed and fills the summary. It was never given the parameter.
```

the live feed and fills the summary. It was never given the parameter.

## Line 12

```
// Reported by Kade 2026-08-22, reproduced, fixed here. Guarded by
```

Reported by Kade 2026-08-22, reproduced, fixed here. Guarded by

## Line 13

```
// tests/camp-checkout-url.test.mjs.
```

tests/camp-checkout-url.test.mjs.

## Line 20

```
// Where a full or closed cohort's CTA sends a family. The waitlist variant hosts the form itself, so it
```

Where a full or closed cohort's CTA sends a family. The waitlist variant hosts the form itself, so it

## Line 21

```
// leaves this unset and gets the on-page anchor. The primary page has no waitlist form on it, so it sets
```

leaves this unset and gets the on-page anchor. The primary page has no waitlist form on it, so it sets

## Line 22

```
// window.CAMP_WAITLIST_TARGET to the parked waitlist page's URL. Without this the primary page's
```

window.CAMP_WAITLIST_TARGET to the parked waitlist page's URL. Without this the primary page's

## Line 23

```
// full-cohort CTA would point at an anchor that does not exist there and would silently do nothing.
```

full-cohort CTA would point at an anchor that does not exist there and would silently do nothing.

## Line 24

```
//
```



## Line 25

```
// Resolved at render time, not at load time, deliberately. This file is pasted into a Kajabi theme's
```

Resolved at render time, not at load time, deliberately. This file is pasted into a Kajabi theme's

## Line 26

```
// Custom JS while the override is set by an inline script in the page's custom-code block, and Kajabi
```

Custom JS while the override is set by an inline script in the page's custom-code block, and Kajabi

## Line 27

```
// does not guarantee that the block runs before the theme JS. Reading the value when the card is built
```

does not guarantee that the block runs before the theme JS. Reading the value when the card is built

## Line 28

```
// makes the two paste order-independent.
```

makes the two paste order-independent.

## Line 32

```
// Only offer the on-page anchor if the section is actually on this page. The selling variant has no
```

Only offer the on-page anchor if the section is actually on this page. The selling variant has no

## Line 33

```
// waitlist section, and the waitlist page it used to point at is now parked as an unpublished draft,
```

waitlist section, and the waitlist page it used to point at is now parked as an unpublished draft,

## Line 34

```
// so a hardcoded URL there would 404. Falling back to email keeps the CTA a real destination.
```

so a hardcoded URL there would 404. Falling back to email keeps the CTA a real destination.

## Line 39

```
// Public Supabase anon key, safe to ship in a pasted page (RLS-scoped, not a service-role secret).
```

Public Supabase anon key, safe to ship in a pasted page (RLS-scoped, not a service-role secret).

## Line 41

```
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d3dvc29hZmNzdXBlYnBhbmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzIzODksImV4cCI6MjA2NTkwODM4OX0.YZZoJZ7CZjypFdm5cbUb3UUC1w0bOW2ei2ih8kBTaMQ'; // pragma: allowlist secret
```

pragma: allowlist secret

## Line 44

```
// Fixed tables rather than Intl's 'short' month: ICU disagrees between browsers on
```

Fixed tables rather than Intl's 'short' month: ICU disagrees between browsers on

## Line 45

```
// whether September abbreviates to Sep or Sept, and a card that wraps to two lines
```

whether September abbreviates to Sep or Sept, and a card that wraps to two lines

## Line 46

```
// when its neighbours do not reads as a layout bug.
```

when its neighbours do not reads as a layout bug.

## Line 80

```
// The intake close time, and how long is left on it.
```

The intake close time, and how long is left on it.

## Line 81

```
//
```



## Line 82

```
// checkout_close_at is 23:59:59 AEST, GMT+10, on the Thursday before the access Friday, set by the
```

checkout_close_at is 23:59:59 AEST, GMT+10, on the Thursday before the access Friday, set by the

## Line 83

```
// trigger in 20260825150000_camp_intake_close_aest_sign_fix.sql. get_camp_capacity already bands a cohort
```

trigger in 20260825150000_camp_intake_close_aest_sign_fix.sql. get_camp_capacity already bands a cohort

## Line 84

```
// 'closed' once that instant passes, so these two functions only ever describe a deadline the feed
```

'closed' once that instant passes, so these two functions only ever describe a deadline the feed

## Line 85

```
// is already enforcing. They cannot disagree with it.
```

is already enforcing. They cannot disagree with it.

## Line 102

```
// Coarse on purpose. A second-by-second clock on a two-week program reads as a fake-scarcity
```

Coarse on purpose. A second-by-second clock on a two-week program reads as a fake-scarcity

## Line 103

```
// gimmick; "closes in 2 days" is the same fact without the pressure theatre. Minutes only appear
```

gimmick; "closes in 2 days" is the same fact without the pressure theatre. Minutes only appear

## Line 104

```
// inside the last hour, where they are genuinely actionable.
```

inside the last hour, where they are genuinely actionable.

## Line 117

```
// Which camp the page sells.
```

Which camp the page sells.

## Line 118

```
//
```



## Line 119

```
// Until 2026-08-25 this rendered every cohort the feed returned, five cards side by side. Kade's
```

Until 2026-08-25 this rendered every cohort the feed returned, five cards side by side. Kade's

## Line 120

```
// ruling that day: the full calendar removed every reason to decide today, because a family who
```

ruling that day: the full calendar removed every reason to decide today, because a family who

## Line 121

```
// could not make the soonest camp simply clicked a later one. The feed still returns five, and must
```

could not make the soonest camp simply clicked a later one. The feed still returns five, and must

## Line 122

```
// keep doing so, because the checkout resolves ?cohort=N by searching the same window. The page
```

keep doing so, because the checkout resolves ?cohort=N by searching the same window. The page

## Line 123

```
// now shows exactly one of them.
```

now shows exactly one of them.

## Line 124

```
//
```



## Line 125

```
// Auto-advance rather than sold-out: when the immediate camp is full or its intake has closed, the
```

Auto-advance rather than sold-out: when the immediate camp is full or its intake has closed, the

## Line 126

```
// next sellable camp takes its place, so there is always one buyable card. Only if nothing in the
```

next sellable camp takes its place, so there is always one buyable card. Only if nothing in the

## Line 127

```
// window is sellable does the card fall back to the soonest camp with a waitlist CTA.
```

window is sellable does the card fall back to the soonest camp with a waitlist CTA.

## Line 138

```
// Display bands, per Kade 2026-08-21. The feed decides the band so the page and the checkout card
```

Display bands, per Kade 2026-08-21. The feed decides the band so the page and the checkout card

## Line 139

```
// cannot disagree. A precise number appears ONLY when it is genuinely low, because
```

cannot disagree. A precise number appears ONLY when it is genuinely low, because

## Line 140

```
// "15 of 15 places remaining" tells a visitor that nobody has booked.
```

"15 of 15 places remaining" tells a visitor that nobody has booked.

## Line 141

```
//   open     10+ left   no capacity line at all
```

open     10+ left   no capacity line at all

## Line 142

```
//   filling  6 to 9     "Filling fast", no number
```

filling  6 to 9     "Filling fast", no number

## Line 143

```
//   low      1 to 5     the real number
```

low      1 to 5     the real number

## Line 144

```
//   full     0          taken, and the sold-out paths take over
```

full     0          taken, and the sold-out paths take over

## Line 163

```
// Only when there is a real date. dateLabel's null case reads "Dates to be confirmed", which is a
```

Only when there is a real date. dateLabel's null case reads "Dates to be confirmed", which is a

## Line 164

```
// sentence on its own line and nonsense after "Snooze access opens".
```

sentence on its own line and nonsense after "Snooze access opens".

## Line 180

```
// Keep the countdown honest on a page left open.
```

Keep the countdown honest on a page left open.

## Line 181

```
//
```



## Line 182

```
// A tab sitting on this page overnight would otherwise still claim "Closes in 2 days" on the
```

A tab sitting on this page overnight would otherwise still claim "Closes in 2 days" on the

## Line 183

```
// morning of the close. One tick a minute is enough for a label whose smallest unit is a minute.
```

morning of the close. One tick a minute is enough for a label whose smallest unit is a minute.

## Line 184

```
// Guarded on every capability it touches, because this same file is loaded by the Node tests with a
```

Guarded on every capability it touches, because this same file is loaded by the Node tests with a

## Line 185

```
// stub document that has no querySelector and no timers.
```

stub document that has no querySelector and no timers.

## Line 197

```
// The deadline passed while the page sat open. Stop guessing at the new state and re-read the
```

The deadline passed while the page sat open. Stop guessing at the new state and re-read the

## Line 198

```
// feed, which is the only thing that knows whether the next camp is now the one on offer.
```

feed, which is the only thing that knows whether the next camp is now the one on offer.

## Line 216

```
// Ask for five, not three.
```

Ask for five, not three.

## Line 217

```
//
```



## Line 218

```
// Two reasons, and the second one is a latent bug rather than a preference.
```

Two reasons, and the second one is a latent bug rather than a preference.

## Line 219

```
//
```



## Line 220

```
// 1. get_camp_capacity defaults to coalesce(p_limit, 3), and there are five open cohorts. At limit=3 a
```

1. get_camp_capacity defaults to coalesce(p_limit, 3), and there are five open cohorts. At limit=3 a

## Line 221

```
//    family who wants a later date cannot see that it exists.
```

family who wants a later date cannot see that it exists.

## Line 222

```
// 2. The landing page and this checkout MUST request the same window. The checkout resolves ?cohort=N by
```

2. The landing page and this checkout MUST request the same window. The checkout resolves ?cohort=N by

## Line 223

```
//    searching the list the feed returns; a cohort outside that window is not found and it silently
```

searching the list the feed returns; a cohort outside that window is not found and it silently

## Line 224

```
//    falls back to the soonest camp. That is the same class of failure as the missing /checkout: the
```

falls back to the soonest camp. That is the same class of failure as the missing /checkout: the

## Line 225

```
//    buyer picks one camp and pays on a page describing another. Raising one side without the other
```

buyer picks one camp and pays on a page describing another. Raising one side without the other

## Line 226

```
//    re-creates it for camps 4 and 5 in the list.
```

re-creates it for camps 4 and 5 in the list.

## Line 227

```
//
```



## Line 228

```
// Keep these two numbers equal. The feed caps at 10.
```

Keep these two numbers equal. The feed caps at 10.

## Line 319

```
// Cents are rendered only when the amount actually has them. String(39.5) is "39.5", which would put
```

Cents are rendered only when the amount actually has them. String(39.5) is "39.5", which would put

## Line 320

```
// "$39.5/mo" on the page. Whole amounts stay whole, so $690 does not become $690.00.
```

"$39.5/mo" on the page. Whole amounts stay whole, so $690 does not become $690.00.

## Line 475

```
// UNUSED, and deliberately left in place. This date is long past and neither landing variant contains
```

UNUSED, and deliberately left in place. This date is long past and neither landing variant contains

## Line 476

```
// any of the five countdown element ids (#hero-countdown, #hero-days, #hero-hours, #hero-minutes,
```

any of the five countdown element ids (#hero-countdown, #hero-days, #hero-hours, #hero-minutes,

## Line 477

```
// #hero-seconds), so updateCountdown() writes nothing and its interval clears itself on the first tick.
```

#hero-seconds), so updateCountdown() writes nothing and its interval clears itself on the first tick.

## Line 478

```
// If you add a countdown block to a camp page, set this from the cohort feed FIRST. Left as-is it would
```

If you add a countdown block to a camp page, set this from the cohort feed FIRST. Left as-is it would

## Line 479

```
// immediately render "Applications are now closed" to every buyer.
```

immediately render "Applications are now closed" to every buyer.
