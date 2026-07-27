# global/js - Deployment Notes

> Git is the source of truth. Do not edit live in Kajabi.

---

## theme-custom-code.js — single website Custom JavaScript paste

**Kajabi field:** Theme Custom Code → JS (`settings-js-input`), also called Settings → Website → Custom JavaScript.

**Paste rule:** Copy the full contents of `theme-custom-code.js` only. Whole-field overwrite. Do not append other files.

That one file already includes:

1. GTM / Stape hybrid tracking
2. Global checkout URL helpers (`window.SNOOZE_CHECKOUT_URL`)
3. Landing-page JS (carousel, FAQ, sticky CTA, `[data-checkout]` placeholder fill only)
4. Currency toggle engine (`window.__snoozeCurrencyToggle__`)
5. Home-page helpers scoped to `#home-page`

**Do not paste:** `snooze-globals.js` (stub pointer), `currency-toggle.js` (test extract only).

**FOUC prevention** (`global/html/currency-toggle-fouc.html`) still goes in Site Details → Header Page Scripts. That is a separate head field, not Custom JavaScript.

**Authoritative surface map:** `docs/technical/KAJABI-SURFACE-CODE-SETUP.md`

### Offer IDs (Snooze Access)

| Currency | Offer ID (numeric) | Slug |
|----------|-------------------|------|
| USD | 2150754998 | `z63s9VaR` |
| AUD | 2151256977 | `vYgCNgJz` |

### Checkout normalisation (2026-07-27)

`[data-checkout]` only fills placeholder hrefs (`#`, `#pricing`, empty). Real `/offers/<slug>` URLs are left alone so consult/course/Camp CTAs are not hijacked onto membership.

Regression: `node __tests__/data-checkout-normalize.test.js`

### Currency extract for unit tests

`currency-toggle.js` is extracted from the marked block inside `theme-custom-code.js` so existing unit tests stay small.

```bash
# After editing the currency block inside theme-custom-code.js:
node __tests__/sync-currency-toggle-extract.js

# CI / pre-paste drift check:
node __tests__/sync-currency-toggle-extract.js --check
node __tests__/currency-toggle.test.js
```

Edit currency logic in `theme-custom-code.js` (between the `SNOOZE CURRENCY TOGGLE` markers), then re-extract.

---

## kajabi-checkout-tracking.js

**Kajabi:** Settings > Checkout Tracking Code > Footer Tracking Code

Must load AFTER GTM/Stape and AFTER meta-advanced-matching.js.

**AUD Offer ID Mapping (updated 2026-07-11):** Currency from `Kajabi.order.currency` when present; else AUD offer-ID / slug allow-lists; else USD.

---

## meta-advanced-matching.js

**Kajabi:** Settings > Checkout Tracking Code > Header Tracking Code (after GTM/Stape)

Meta Pixel ID: `449153684613893`

---

## gtm-variables.js

**Not pasted into Kajabi.** GTM container `GTM-KNRTH6P` Custom JavaScript variables only.
