# global/js - Deployment Notes

> Git is the source of truth. Do not edit live in Kajabi.

---

## theme-custom-code.js — website-wide Theme Custom JavaScript

**Kajabi field:** Theme Custom Code → JS (`settings-js-input`).

**Paste rule:** Copy the full contents of `theme-custom-code.js` only. Whole-field overwrite. Do not append other files.

Kajabi loads this field across every website page. The current payload contains `#home-page` helpers (age tabs, FAQ accordion and related behaviour) with a wrapper guard, so it exits safely on other website pages. After the 2026-07-27 split it must **not** contain GTM, Stape, currency toggle or `[data-checkout]` helpers. Those need website and landing-page coverage, so they live once in Header Page Scripts ([`../html/site-header-page-scripts.html`](../html/site-header-page-scripts.html)).

**Do not paste:** [`snooze-globals.js`](./snooze-globals.js) (stub pointer), [`currency-toggle.js`](./currency-toggle.js) (test extract only).

**FOUC prevention** ([`../html/currency-toggle-fouc.html`](../html/currency-toggle-fouc.html)) is a testable mirror already embedded in the single [`../html/site-header-page-scripts.html`](../html/site-header-page-scripts.html) paste file. Never append it separately in Kajabi.

**Authoritative surface map:** [`KAJABI-SURFACE-CODE-SETUP.md`](../../../docs/technical/KAJABI-SURFACE-CODE-SETUP.md)  
**Contract:** [`CODE-SURFACE-CONTRACT.md`](../../../docs/technical/CODE-SURFACE-CONTRACT.md)
**Paste map:** [`../../PASTE-MAP.md`](../../PASTE-MAP.md)

### Offer IDs (Snooze Access)

| Currency | Offer ID (numeric) | Slug |
|----------|-------------------|------|
| USD | 2150754998 | `z63s9VaR` |
| AUD | 2151256977 | `vYgCNgJz` |

### Checkout normalisation (2026-07-27)

`[data-checkout]` only fills placeholder hrefs (`#`, `#pricing`, empty). Real `/offers/<slug>` URLs are left alone so consult/course/Camp CTAs are not hijacked onto membership. That helper lives in Header Page Scripts, not this file.

Regression: `node __tests__/data-checkout-normalize.test.js`

### Currency extract for unit tests

`currency-toggle.js` is kept in sync by `__tests__/sync-currency-toggle-extract.js` from the currency block in the Header Page Scripts file. After the 2026-07-27 split, currency logic lives in Header Page Scripts, not `theme-custom-code.js`. The `--check` command is a required drift guard.

```bash
node __tests__/sync-currency-toggle-extract.js
node __tests__/sync-currency-toggle-extract.js --check
node __tests__/currency-toggle.test.js
```

---

## Checkout Tracking Code (Settings → Checkout)

Site-wide. Not Header Page Scripts. Not per-offer theme JS.  
**Index:** [`../../PASTE-MAP.md`](../../PASTE-MAP.md) A4/A5 · **Pointer:** [`../checkout-tracking/README.md`](../checkout-tracking/README.md)

| Field | Repo file | Live 2026-07-27 | Action |
|---|---|---|---|
| Header | [`../html/checkout-header-tracking.html`](../html/checkout-header-tracking.html) | Loader present | **Do not re-paste to sync.** Inline Advanced Matching into this file before any AM paste |
| Footer | [`kajabi-checkout-tracking.js`](./kajabi-checkout-tracking.js) | Empty | Paste when shipping purchase dataLayer |

Full instructions: [`KAJABI-CHECKOUT-TRACKING-CODE.md`](../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md).

### kajabi-checkout-tracking.js

**Kajabi:** Settings → Checkout → Footer Tracking Code

Must load AFTER the header field (GTM/Stape, and Advanced Matching if inlined into the header file).

**AUD Offer ID Mapping (updated 2026-07-11):** Currency from `Kajabi.order.currency` when present; else AUD offer-ID / slug allow-lists; else USD.

### meta-advanced-matching.js

**Not a paste target.** Fragment only. Inline into [`../html/checkout-header-tracking.html`](../html/checkout-header-tracking.html) (inside a `<script>` after the loader) before shipping Advanced Matching.

Meta Pixel ID: `449153684613893`

---

## gtm-variables.js

**Not pasted into Kajabi.** GTM container `GTM-KNRTH6P` Custom JavaScript variables only.
