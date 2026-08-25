# camp-snooze-v2-checkout.js - notes

Comments extracted from `camp-snooze-v2-checkout.js`. That file is pasted into Kajabi and ships to
every visitor, so the reasoning lives here instead. Each note names the line it sat above and the
code that followed it, so a note whose anchor no longer exists is a note to re-check.

Regenerate with `node scripts/kajabi/extract-comments.mjs apps/snooze-website/kajabi-deployment/pages/checkout/camp-snooze-v2-luxury/camp-snooze-v2-checkout.js`.

---

## Line 4

```
// Public Supabase anon key, safe to ship in a pasted page (RLS-scoped, not a service-role secret).
```

Public Supabase anon key, safe to ship in a pasted page (RLS-scoped, not a service-role secret).

## Line 6

```
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d3dvc29hZmNzdXBlYnBhbmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzIzODksImV4cCI6MjA2NTkwODM4OX0.YZZoJZ7CZjypFdm5cbUb3UUC1w0bOW2ei2ih8kBTaMQ'; // pragma: allowlist secret
```

pragma: allowlist secret

## Line 8

```
// This same HTML+JS pair is pasted verbatim onto four checkout pages (regular USD/AUD, member USD/AUD;
```

This same HTML+JS pair is pasted verbatim onto four checkout pages (regular USD/AUD, member USD/AUD;

## Line 9

```
// see PASTE-MAP.md P3-CAMP-CHECKOUT-HTML and P3-CAMP-MEMBER-CHECKOUT-HTML, "paste to both currency
```

see PASTE-MAP.md P3-CAMP-CHECKOUT-HTML and P3-CAMP-MEMBER-CHECKOUT-HTML, "paste to both currency

## Line 10

```
// twins"). Before this block existed, every `.dynamic-price` span rendered its hardcoded fallback text
```

twins"). Before this block existed, every `.dynamic-price` span rendered its hardcoded fallback text

## Line 11

```
// and the `.currency` label was a static "USD" string, so the AUD checkout pages showed the USD number
```

and the `.currency` label was a static "USD" string, so the AUD checkout pages showed the USD number

## Line 12

```
// and label regardless of which offer a buyer was actually completing. This detects currency from the
```

and label regardless of which offer a buyer was actually completing. This detects currency from the

## Line 13

```
// offer identifier in the page's own URL (the same short-code pattern the landing page already keys its
```

offer identifier in the page's own URL (the same short-code pattern the landing page already keys its

## Line 14

```
// checkout links off) and re-renders every price and currency label from data-usd/data-aud, matching how
```

checkout links off) and re-renders every price and currency label from data-usd/data-aud, matching how

## Line 15

```
// the landing page's campUpdatePrices() already works.
```

the landing page's campUpdatePrices() already works.

## Line 36

```
// Same rule as the landing formatter: cents only when the amount has them, so 39.5 renders as 39.50
```

Same rule as the landing formatter: cents only when the amount has them, so 39.5 renders as 39.50

## Line 37

```
// rather than 39.5, and 690 stays 690.
```

rather than 39.5, and 690 stays 690.

## Line 59

```
// The order summary and the Key Dates block used to hardcode one cohort, "Camp Snooze #15"
```

The order summary and the Key Dates block used to hardcode one cohort, "Camp Snooze #15"

## Line 60

```
// with its August dates, while the capacity card beside them resolved the live cohort from the
```

with its August dates, while the capacity card beside them resolved the live cohort from the

## Line 61

```
// feed. The feed's own RPC drops a camp once its start date passes, so from the morning of
```

feed. The feed's own RPC drops a camp once its start date passes, so from the morning of

## Line 62

```
// 2026-08-31 the two halves of the same page disagreed: the card said #16 and the summary the
```

2026-08-31 the two halves of the same page disagreed: the card said #16 and the summary the

## Line 63

```
// buyer was paying against still said #15. These fill the summary from the same resolved cohort.
```

buyer was paying against still said #15. These fill the summary from the same resolved cohort.

## Line 64

```
// The static text stays in the HTML as the fallback, so a failed feed leaves a correct-looking
```

The static text stays in the HTML as the fallback, so a failed feed leaves a correct-looking

## Line 65

```
// page rather than an empty one.
```

page rather than an empty one.

## Line 68

```
// Cohort dates are plain calendar dates. Pin them to AEST, GMT+10, so a US buyer's browser cannot
```

Cohort dates are plain calendar dates. Pin them to AEST, GMT+10, so a US buyer's browser cannot

## Line 69

```
// render the day before.
```

render the day before.

## Line 75

```
// The intake close time, formatted the way the landing page's card writes it, so a buyer who read
```

The intake close time, formatted the way the landing page's card writes it, so a buyer who read

## Line 76

```
// "Intake closes Thursday 27 Aug, 11:59pm" before clicking sees the same sentence on the page they pay
```

"Intake closes Thursday 27 Aug, 11:59pm" before clicking sees the same sentence on the page they pay

## Line 77

```
// on. checkout_close_at is a timestamptz, not a plain date, so it is rendered with the time and pinned
```

on. checkout_close_at is a timestamptz, not a plain date, so it is rendered with the time and pinned

## Line 78

```
// to AEST rather than passed through campCheckoutFormatCohortDate.
```

to AEST rather than passed through campCheckoutFormatCohortDate.

## Line 117

```
// The feed bands availability open / filling / low / full / closed. 'low' is still a
```

The feed bands availability open / filling / low / full / closed. 'low' is still a

## Line 118

```
// sellable camp, so it belongs here. Omitting it made the checkout skip a camp that had
```

sellable camp, so it belongs here. Omitting it made the checkout skip a camp that had

## Line 119

```
// 1 to 5 seats left and name the NEXT camp instead, on the page selling the current one.
```

1 to 5 seats left and name the NEXT camp instead, on the page selling the current one.

## Line 134

```
// Same band rule the landing page already applies: a precise count appears ONLY when the camp
```

Same band rule the landing page already applies: a precise count appears ONLY when the camp

## Line 135

```
// is genuinely low, because "15 of 15 places remain" tells a buyer that nobody has booked.
```

is genuinely low, because "15 of 15 places remain" tells a buyer that nobody has booked.

## Line 136

```
//   open     10+ left   no places line at all
```

open     10+ left   no places line at all

## Line 137

```
//   filling  6 to 9     "Filling fast", no number
```

filling  6 to 9     "Filling fast", no number

## Line 138

```
//   low      1 to 5     the real number
```

low      1 to 5     the real number

## Line 142

```
// The deadline belongs on the availability card too, not only in Key Dates. This card is the last
```

The deadline belongs on the availability card too, not only in Key Dates. This card is the last

## Line 143

```
// thing a buyer reads before the Kajabi form, and it is the half of the page that is live.
```

thing a buyer reads before the Kajabi form, and it is the half of the page that is live.

## Line 161

```
// Ask for five, not three.
```

Ask for five, not three.

## Line 162

```
//
```



## Line 163

```
// Two reasons, and the second one is a latent bug rather than a preference.
```

Two reasons, and the second one is a latent bug rather than a preference.

## Line 164

```
//
```



## Line 165

```
// 1. get_camp_capacity defaults to coalesce(p_limit, 3), and there are five open cohorts. At limit=3 a
```

1. get_camp_capacity defaults to coalesce(p_limit, 3), and there are five open cohorts. At limit=3 a

## Line 166

```
//    family who wants a later date cannot see that it exists.
```

family who wants a later date cannot see that it exists.

## Line 167

```
// 2. The landing page and this checkout MUST request the same window. The checkout resolves ?cohort=N by
```

2. The landing page and this checkout MUST request the same window. The checkout resolves ?cohort=N by

## Line 168

```
//    searching the list the feed returns; a cohort outside that window is not found and it silently
```

searching the list the feed returns; a cohort outside that window is not found and it silently

## Line 169

```
//    falls back to the soonest camp. That is the same class of failure as the missing /checkout: the
```

falls back to the soonest camp. That is the same class of failure as the missing /checkout: the

## Line 170

```
//    buyer picks one camp and pays on a page describing another. Raising one side without the other
```

buyer picks one camp and pays on a page describing another. Raising one side without the other

## Line 171

```
//    re-creates it for camps 4 and 5 in the list.
```

re-creates it for camps 4 and 5 in the list.

## Line 172

```
//
```



## Line 173

```
// Keep these two numbers equal. The feed caps at 10.
```

Keep these two numbers equal. The feed caps at 10.

## Line 207

```
link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='; // pragma: allowlist secret
```

pragma: allowlist secret
