# Shared checkout assets — 7 Day Trial (USD + AUD)

`checkout.css` and `checkout.js` are identical for both currency offers. They are
intentionally **comment-free** so nothing instructional or internal is exposed to
scrapers/LLMs. Keep them that way; notes live here.

## checkout.css
Self-contained, scoped to `#snooze-custom-checkout`. Includes the BAU base styles
plus the trial-specific sections (`.trial-highlight`, `.how-it-works`, `.steps`)
and the `.checkout-currency-link`. Paste the ENTIRE file into each offer's checkout
Custom CSS — do not rely on another page's styles being present (Kajabi checkout
CSS is per-offer, not site-wide).

## checkout.js
Standard scroll-to-checkout handler (same behaviour as `bau-membership-checkout.js`).
Paste into each offer's checkout Custom JavaScript.

## Usage
Both currency pages (`../usd/`, `../aud/`) use these same two files. Full setup:
`../KAJABI-OFFER-SETUP.md`.
