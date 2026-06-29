# Founding Member Offer - Landing Page

Customer-facing Kajabi landing page for the Snooze Founding Member campaign (lifetime price lock; "rest of 2025 free", billing starts January 1, 2026).

## Files

- `index.html` - page HTML, JS (countdown timer, sticky CTA, smooth scroll, lazy-load).
- `founding-member-offer-landing-page.css` - page-specific CSS. (Repo filename: `styles.css`; referenced in `index.html` as `founding-member-offer-landing-page.css`.)

## Deployment (Kajabi)

- Paste the contents of the CSS file into the page's Custom CSS block in Kajabi.
- Font Awesome is loaded via CDN (`<link>` in HTML head and `@import` in CSS).

## Checkout offer ID

All CTAs point to: `https://joinsnooze.com/offers/6iRarwak/checkout`

- `6iRarwak` is the founding/launch offer slug. Per the dual-currency slug reconciliation note, `6iRarwak` is flagged as a draft/non-canonical offer; verify the live founding-offer slug before deploy. CTAs were left on `6iRarwak` because no canonical AUD founding slug exists (do not invent AUD slugs).

## Pricing - HUMAN REVIEW REQUIRED (non-canonical)

The whole page is founding/lifetime-lock pricing and is NON-CANONICAL. Dynamic prices use `data-usd` / `data-aud` attributes (AUD = USD x 1.51). The following figures need human reconciliation against the canonical offer catalogue before deploy:

- Hero saving: $167 / A$252 (non-canonical).
- Annual founding price: $490 / A$740 (non-canonical launch/founding).
- Quarterly founding price: $147 / A$222 (non-canonical launch/founding).
- Annual saving: $167/year / A$252 (non-canonical).
- Quarterly saving: $50/quarter / A$76 (non-canonical).
- Consult figures: $205 saving / A$310; member rate $445 / A$675 (NB existing AUD consult `2150873956` = A$640, reconcile); non-member $650 / A$975.
- Course price reference: $117 / A$179 (canonical course); $129 (non-canonical launch/founding).

Canonical reference figures present on the page:

- Access yearly regular: $657/year = A$997.
- Access quarterly regular: $197/quarter = A$299.

## Service-model copy

Membership benefits were rewritten to remove false hard expectations (weekly cadence, replay library/vault). Live sessions are framed as "Live sessions with the Snooze Specialists" (no fixed weekly cadence; no guaranteed replay archive). One testimonial referencing "weekly coaching calls" was left as authentic member wording and is flagged for human review.
