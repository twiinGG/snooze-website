# Shared checkout assets - 7 Day Trial (USD + AUD)

`checkout.css` and `checkout.js` are identical for both currency offers. They are
intentionally **comment-free** so nothing instructional or internal is exposed to
scrapers/LLMs. Keep them that way; notes live here.

## checkout.css
Self-contained checkout styling, including the selected-plan disclosure, visible
selected-state label, secondary-text contrast and mobile tap targets. Paste the
ENTIRE file into each offer's checkout Custom CSS. Kajabi checkout CSS is
per-offer, not site-wide.

## checkout.js
Observes Kajabi's selected pricing option without changing it. It updates the
recurring-charge disclosure, emits `begin_checkout` and deduplicated
`pricing_option_selected` dataLayer events and preserves inbound attribution on
the reciprocal currency link. If Kajabi's pricing DOM cannot be read, the static
trial disclosure remains visible. Paste the entire file into each offer's
checkout Custom JavaScript.

Canonical variant mapping:

| Plan | USD | AUD |
|---|---:|---:|
| Monthly | `160544` | `160790` |
| Quarterly | `64815` | `160791` |
| Annual | `64816` | `160792` |

Run `node shared/__tests__/checkout.test.js` before either checkout is pasted.

## Usage
Both currency pages (`../usd/`, `../aud/`) use these same two files. Full setup:
`../KAJABI-OFFER-SETUP.md`.
