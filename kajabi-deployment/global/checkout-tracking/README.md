# Checkout tracking (site-wide)

**Kajabi:** Settings → Checkout → Checkout Tracking Code  
**Admin:** `/admin/settings/checkout`  
**Index:** [`../../PASTE-MAP.md`](../../PASTE-MAP.md) rows A4 / A5  
**How-to:** [`../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md`](../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md)

These two fields are **site-wide**. They are not Header Page Scripts and not per-offer theme JS.

**One file per field.** Never compose a Kajabi field from two repo files at paste time.

| Field | File | Live 2026-08-13 | Action |
|---|---|---|---|
| Header tracking code | [`../html/checkout-header-tracking.html`](../html/checkout-header-tracking.html) | Present, 701 bytes (GTM/Stape loader) | **Do not re-paste** unless changing this file. To ship Advanced Matching, inline [`../js/meta-advanced-matching.js`](../js/meta-advanced-matching.js) into this file in git first, then overwrite once |
| Footer tracking code | [`../js/kajabi-checkout-tracking.js`](../js/kajabi-checkout-tracking.js) | **Present, 3,843 bytes / 110 lines. An EARLIER build than this file** | Optional upgrade, not a first paste. See below |

> **Corrected 2026-08-13 (ME-007).** This table previously recorded the Footer field as **Empty** as at 2026-07-27. That was wrong, and it misled the ME-007 kickoff into planning a coordinated first paste. The field was read directly out of the Kajabi Ace editor `site_checkout_footer_tracking_code_editor` on 2026-08-13: it holds 3,843 bytes across 110 lines and references `Kajabi.order`.
>
> The live copy is an **earlier build** than `../js/kajabi-checkout-tracking.js`:
>
> | Measure | This repo file | Live field |
> |---|---:|---:|
> | Bytes | 3,234 | 3,843 |
> | Lines | 101 | 110 |
> | Dated comment | none | `list_offers 2026-07-11` |
> | AUD offer IDs | 16 | 18 |
> | `TRIAL_VARIANTS` keys | 6, includes USD `64815` and `64816` | 4, **missing both USD non-monthly variants** |
> | Amount parsing | `numberOrNull()` with finite and non-negative guards | bare `parseFloat()` |
>
> Both emit `purchase` / `trial_started` / `free_claim` once each, share the trial allowlist, dedup by order ID and call neither `fbq` nor `gtag`.
>
> **Pasting this repo file is an upgrade, not a deployment.** It gains the two extra AUD offer IDs, the USD quarterly and annual variant mappings and the amount guards. It is not on the critical path: web GTM version 55 (ME-007) already reads what the live script supplies.
>
> Verified the same day: the footer script injects on both trial checkouts, `/offers/mqQikDM7/checkout` and `/offers/Sr6KzShx/checkout`, so `inject_footer_tracking_code` is enabled on offers `2150887297` and `2151254578`. On a checkout page `Kajabi.order` is undefined and the script correctly returns early.
>
> **It does NOT run on the trial post-purchase surface.** Both trial offers set `post_purchase.preference` to `landing_page`, sending buyers to `/trial-welcome`, where the checkout tracking fields do not inject and no `Kajabi.order` exists. So `trial_started` cannot fire for either trial offer until that surface changes. Paid orders landing on Kajabi's own `/thank_you/<token>` page are unaffected.
>
> Full evidence: `docs/projects/measurement/4_working/2026-08-13-funnel-tracking-cutover/RUN-LOG.md`.

The footer script classifies confirmed Kajabi orders in this order:

1. A positive amount emits `purchase`.
2. A zero-value order on trial offers `2150887297` or `2151254578` emits `trial_started`.
3. Any other zero-value order emits `free_claim`.

A missing order ID emits nothing. All order events deduplicate by order ID and
exclude customer PII. GTM remains the only GA4 and Meta dispatcher.

[`../js/meta-advanced-matching.js`](../js/meta-advanced-matching.js) is a **fragment**, not a paste target.

Per-offer `inject_header_tracking_code` / `inject_footer_tracking_code` gate whether these inject into that offer’s checkout.
