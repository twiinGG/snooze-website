## Canonical paste sources

**Operator index:** [`../PASTE-MAP.md`](../PASTE-MAP.md)

Every global surface pastes as a WHOLE-FIELD OVERWRITE from the repo file(s) below; edits happen here first, never live:

- [`html/site-header-page-scripts.html`](./html/site-header-page-scripts.html) → Settings → Site Details → Header Page Scripts (GTM single-instance, Stape, schema.org JSON-LD, currency-toggle v2). Website + landing pages.
- [`html/checkout-header-tracking.html`](./html/checkout-header-tracking.html) → Settings → Checkout → Header tracking code (GTM/Stape for checkouts). **Already live; do not re-paste to sync.** Optional upgrade: append [`js/meta-advanced-matching.js`](./js/meta-advanced-matching.js) (no comment header) in the same field.
- [`js/kajabi-checkout-tracking.js`](./js/kajabi-checkout-tracking.js) → Settings → Checkout → Footer tracking code. Live empty as of 2026-07-27.
- [`css/theme-custom-code.css`](./css/theme-custom-code.css) → website theme Custom Code CSS ([`css/snooze-unified-theme.css`](./css/snooze-unified-theme.css) is legacy; not a paste source until reconciled)
- [`js/theme-custom-code.js`](./js/theme-custom-code.js) → website theme Custom Code JS (`#home-page` helpers only; not GTM)

Short checkout pointer: [`checkout-tracking/README.md`](./checkout-tracking/README.md).

Procedure per paste: fresh pre-image → diff (merge new live drift into the canonical file FIRST, commit) → overwrite → byte-compare read-back → curl sentinel (browser for checkouts; curl is 403). See [`CODE-SURFACE-CONTRACT.md`](../../docs/technical/CODE-SURFACE-CONTRACT.md).
