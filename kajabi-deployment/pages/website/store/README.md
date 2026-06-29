# Store Page

Deployable Kajabi custom-code page for the Snooze Store.

## File

- `store-page.html` - full page HTML/CSS/JS. Paste into the Kajabi website-page custom code block.

## Deployment

- Surface: Kajabi website page (the Snooze Store).
- Wrapper ID: `#store-page`. Page-specific styles are scoped to this ID. The shared design system (colors, buttons, fonts, layout utilities such as `.snooze-container`, `.snooze-section`, `.btn`) comes from `kajabi-deployment/global/css/snooze-unified-theme.css` and must include a System Initialization block for `#store-page`. See `apps/snooze-website/AGENTS.md` and `docs/technical/CSS-STABILIZATION-BRIEF.md`.
- An inline `<script>` adds `store-page-active` to `<html>` on load.

## Offers and links referenced

- Snooze Access membership checkout: `https://www.joinsnooze.com/offers/z63s9VaR/checkout` (offer token `z63s9VaR`, USD). Dynamic-currency CTAs carry the `dynamic-cta` class and `data-checkout` attribute, handled by the global currency-toggle script.
- Dynamic prices use `.dynamic-price` with `data-usd` / `data-aud` (and optional `data-period-usd` / `data-period-aud`).
- Course links: newborn-sleep-guide, 3-4-month-baby-sleep-course, 5-12-month-baby-sleep-course, toddler-toolkit.
- Consultation links: one-on-one-sleep-consultations.
- Camp Snooze: camp-snooze. Recommended products: recommended-products.

## Service-model copy

Membership benefits describe live sessions with Sally and Bec, not weekly/live coaching and not a replay archive. Camp Snooze daily coaching and the paid 1:1 consults are genuine and stay as written. Keep membership copy off fixed-cadence and replay promises.

## Related docs in this folder

- `STORE-PAGE-STRUCTURE.md`, `STORE-PAGE-DEPLOYMENT.md`, `STORE-PAGE-UPDATE-BRIEF.md`, `STORE-PAGE-UPDATE-V2.md`, `CSS-STABILIZATION-REPORT.md`.
