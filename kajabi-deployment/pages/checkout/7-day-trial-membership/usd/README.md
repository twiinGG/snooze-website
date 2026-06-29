# USD checkout - The Snooze Membership 7 Day Trial (PUBMS02_USD)

`checkout-blocks.html` is the customer-facing checkout HTML. It is intentionally
**comment-free** (no header block, no section comments) so nothing instructional
or internal is exposed to scrapers/LLMs. Keep it that way; all notes live here.

## Offer
- Code: PUBMS02_USD
- Offer ID: `2150887297`
- Checkout slug: `mqQikDM7` → https://www.joinsnooze.com/offers/mqQikDM7/checkout
- AUD twin: `../aud/checkout-blocks.html` (offer `2151254578`, slug `Sr6KzShx`)

## Offer model
Card upfront, free for 7 days, billed on the chosen plan after the trial unless
cancelled inside the 7-day window.

## Deploy (per-offer; Kajabi checkout CSS/JS is not site-wide)
1. Paste `checkout-blocks.html` into the offer's checkout HTML / Custom Code Block (HTML only, no `<style>`/`<script>`).
2. Paste `../shared/checkout.css` into the offer's checkout Custom CSS (self-contained).
3. Paste `../shared/checkout.js` into the offer's checkout Custom JavaScript.
4. Ensure Google Fonts (Playfair Display + Poppins) is loaded in Header Tracking Code.

## Branding
Snooze main: coral `#F43357`, navy `#1F293B`, Playfair Display + Poppins. Do NOT
use the `snooze-access-paidads` landing page's Camp Snooze green (`#29563f`).

## Currency switch
No on-page currency toggle (Kajabi price is server-rendered per offer). The footer
carries a static link to the AUD twin; `global/js/currency-toggle.js` also geo-routes.

Full setup + operator tasks: `../KAJABI-OFFER-SETUP.md`.
