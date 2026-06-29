# AUD checkout - The Snooze Membership 7 Day Trial (PUBMS02_AUD)

`checkout-blocks.html` is the customer-facing checkout HTML. It is intentionally
**comment-free** (no header block, no section comments) so nothing instructional
or internal is exposed to scrapers/LLMs. Keep it that way; all notes live here.

## Offer
- Code: PUBMS02_AUD
- Offer ID: `2151254578`
- Checkout slug: `Sr6KzShx` → https://www.joinsnooze.com/offers/Sr6KzShx/checkout
- USD twin: `../usd/checkout-blocks.html` (offer `2150887297`, slug `mqQikDM7`)

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

## Parity
The body copy is identical to the USD twin; only the footer currency line differs
(this page links to USD pricing). Keep the two in sync.

Full setup + operator tasks: `../KAJABI-OFFER-SETUP.md`.
