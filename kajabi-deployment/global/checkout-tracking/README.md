# Checkout tracking (site-wide)

**Kajabi:** Settings → Checkout → Checkout Tracking Code  
**Admin:** `/admin/settings/checkout`  
**Index:** [`../../PASTE-MAP.md`](../../PASTE-MAP.md) rows A4 / A5  
**How-to:** [`../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md`](../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md)

These two fields are **site-wide**. They are not Header Page Scripts and not per-offer theme JS.

| Field | File | Live 2026-07-27 | Action |
|---|---|---|---|
| Header tracking code | [`../html/checkout-header-tracking.html`](../html/checkout-header-tracking.html) | Present (GTM/Stape loader) | **Do not re-paste** unless changing the loader |
| Header append (optional) | [`../js/meta-advanced-matching.js`](../js/meta-advanced-matching.js) (strip comment header) | Not in live header | Paste only if deploying Advanced Matching |
| Footer tracking code | [`../js/kajabi-checkout-tracking.js`](../js/kajabi-checkout-tracking.js) | **Empty** | Paste when ready to ship purchase dataLayer |

Per-offer `inject_header_tracking_code` / `inject_footer_tracking_code` gate whether these inject into that offer’s checkout.
