# Camp Snooze Currency Toggle (AUD/USD)

**Status:** Deployed (January 30, 2026); toggle placement revised August 23, 2026  
**Scope:** Standalone implementation for Camp Snooze landing page only.

---

## Overview

Dynamic AUD/USD currency toggle for the Camp Snooze Feb 9 intake landing page. Implemented as a self-contained pilot before wider site rollout. Australian timezone users default to AUD; all others to USD. Preference persists via `localStorage` key `snooze_currency_preference`.

---

## Checkout URLs

| Currency | URL |
|----------|-----|
| USD | `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout` |
| AUD | `https://www.joinsnooze.com/offers/46Bz9tk6/checkout` |

All CTAs with `dynamic-cta` or `data-checkout` are updated by the script to the correct URL for the selected currency.

---

## Price Mapping (USD → AUD)

| Element | USD | AUD |
|---------|-----|-----|
| Main price | $590 | $885 |
| Member discount | $510 | $765 |
| Monthly Snooze | $79 | $119 |
| Quarterly Snooze | $197 | $295 |
| Value display (1:1) | $3,500 | $5,250 |
| Discount amount | $2,989 | $4,485 |
| Quarterly total (FAQ) | $708 | $1,060 |

Display format: `$` for both (e.g. `$885 AUD`, not `A$885`).

---

## Implementation Files

| File | Role |
|------|------|
| `camp-snooze-landing-page-blocks.html` | Data attributes on price elements; inline pricing-section toggle; `dynamic-cta` / `data-checkout` on all checkout links |
| `camp-snooze-v2-luxury.css` | FOUC prevention, `.camp-currency-toggle`, `.camp-nav-currency-toggle`, `.sticky-currency-toggle` |
| `camp-snooze-v2-luxury.js` | `CAMP_CURRENCY_CONFIG`, `campSetCurrency`, `campUpdatePrices`, `campUpdateLinks`, `campUpdateToggleUI`, `campInitCurrency`, `campInjectToggles`; sticky CTA markup includes toggle and dynamic price/link |

---

## Toggle Placement

1. **Sticky footer** – Injected in JS next to the price. Compact USD/AUD buttons.
2. **Nav and mobile menu** (optional) – Injected by `campInjectToggles` into `.navbar .sn-actions` or `.sn-mobile-inner` and similar if present; may not exist on all Kajabi themes.

**Removed August 23, 2026:** the inline `#camp-currency-toggle-wrap` toggle that
sat above the cohort cards in the "Choose Your Camp" section (Kade's call). With
the price section now above the cohort grid, a third toggle beside the cards
invited a currency switch mid-decision, after the visitor had already read the
price. The `.camp-currency-toggle-wrap` CSS rule is kept — the waitlist variant
(`camp-snooze-landing-page-blocks-waitlist.html`) still uses it.

---

## Data Attributes

- **Prices:** `class="dynamic-price"` plus `data-usd`, `data-aud`; optional `data-period-usd`, `data-period-aud` for suffix text (e.g. ` USD`, `/month`).
- **CTAs:** `class="dynamic-cta"` and `data-checkout`; `href` is set by script from `CAMP_CURRENCY_CONFIG.usdCheckoutUrl` / `audCheckoutUrl`.

---

## Analytics

- Initialisation never pushes `currency_change`.
- One `currency_change` event is pushed to `window.dataLayer` after a completed,
  explicit change. It carries `previous_currency`, `currency` and
  `surface: camp_snooze_sleep_coaching`.
- AUD and USD checkout rewrites preserve inbound `utm_*`, `fbclid`, `gclid` and
  cohort parameters. Existing destination parameters win and keys do not duplicate.
- GTM can use `snooze_currency_preference` in localStorage for event context.

---

## Related

- Full site toggle package: `projects/Dynamic-Currency-Toggle/`
- This implementation is documented there as a standalone reference: `CAMP-SNOOZE-STANDALONE-IMPLEMENTATION.md`
