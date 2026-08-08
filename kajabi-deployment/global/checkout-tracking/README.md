# Checkout tracking (site-wide)

**Kajabi:** Settings → Checkout → Checkout Tracking Code  
**Admin:** `/admin/settings/checkout`  
**Index:** [`../../PASTE-MAP.md`](../../PASTE-MAP.md) rows A4 / A5  
**How-to:** [`../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md`](../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md)

These two fields are **site-wide**. They are not Header Page Scripts and not per-offer theme JS.

**One file per field.** Never compose a Kajabi field from two repo files at paste time.

| Field | File | Live 2026-07-27 | Action |
|---|---|---|---|
| Header tracking code | [`../html/checkout-header-tracking.html`](../html/checkout-header-tracking.html) | Present (GTM/Stape loader) | **Do not re-paste** unless changing this file. To ship Advanced Matching, inline [`../js/meta-advanced-matching.js`](../js/meta-advanced-matching.js) into this file in git first, then overwrite once |
| Footer tracking code | [`../js/kajabi-checkout-tracking.js`](../js/kajabi-checkout-tracking.js) | **Empty** | Deploy only with the coordinated GTM order-bound cutover |

The footer script classifies confirmed Kajabi orders in this order:

1. A positive amount emits `purchase`.
2. A zero-value order on trial offers `2150887297` or `2151254578` emits `trial_started`.
3. Any other zero-value order emits `free_claim`.

A missing order ID emits nothing. All order events deduplicate by order ID and
exclude customer PII. GTM remains the only GA4 and Meta dispatcher.

[`../js/meta-advanced-matching.js`](../js/meta-advanced-matching.js) is a **fragment**, not a paste target.

Per-offer `inject_header_tracking_code` / `inject_footer_tracking_code` gate whether these inject into that offer’s checkout.
