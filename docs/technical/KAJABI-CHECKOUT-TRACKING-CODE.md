# Kajabi Checkout Tracking Code

**Location:** Kajabi → **Settings → Checkout** → Checkout Tracking Code  
**Admin path:** `/admin/settings/checkout`  
**Paste map:** [`../../kajabi-deployment/PASTE-MAP.md`](../../kajabi-deployment/PASTE-MAP.md) rows A4 / A5  
**Folder pointer:** [`../../kajabi-deployment/global/checkout-tracking/README.md`](../../kajabi-deployment/global/checkout-tracking/README.md)

This is a **site-wide** surface. It is not Header Page Scripts (Settings → Site Details) and it is not per-offer theme CSS/JS. Every checkout page receives these fields when that offer's section has `inject_header_tracking_code` / `inject_footer_tracking_code` set true.

Canonical contract: [`CODE-SURFACE-CONTRACT.md`](./CODE-SURFACE-CONTRACT.md) surface 5. Surface map: [`KAJABI-SURFACE-CODE-SETUP.md`](./KAJABI-SURFACE-CODE-SETUP.md).

---

## Header tracking code

**Kajabi UI copy:** "This code will be placed in the `<head>` section of every checkout page."

**Canonical file:** [`../../kajabi-deployment/global/html/checkout-header-tracking.html`](../../kajabi-deployment/global/html/checkout-header-tracking.html)

**Live 2026-07-27:** the Settings → Checkout header field already holds this GTM/Stape loader (`GTM-KNRTH6P`, console `Snooze: Checkout Page - Loading Full Tracking`). The repo file matches that payload.

### Do you need to paste?

| Change | Paste? |
|---|---|
| Sync the existing loader into Kajabi | **No.** Already live. |
| Change the loader / Stape URL / container | Yes: whole-field overwrite from [`checkout-header-tracking.html`](../../kajabi-deployment/global/html/checkout-header-tracking.html) |
| Add Meta Advanced Matching | Yes: **inline** the fragment into [`checkout-header-tracking.html`](../../kajabi-deployment/global/html/checkout-header-tracking.html) in git first, then whole-field overwrite once. Never append a second file in Kajabi |

**Edit path:** Settings → Checkout → Edit header tracking code → Save.

---

## Footer tracking code

**Kajabi UI copy:** "This code will be placed at the end of the `<body>` of each checkout page."

**Canonical file:** [`../../kajabi-deployment/global/js/kajabi-checkout-tracking.js`](../../kajabi-deployment/global/js/kajabi-checkout-tracking.js)

Must load after the header field (GTM, and Advanced Matching if present). Fires InitiateCheckout / Purchase with AUD/USD detection.

**Live 2026-07-27:** footer field is **empty**. Paste only when you deliberately want that script live. Empty is drift vs intended deploy, not “footer not needed”.

**Edit path:** Settings → Checkout → Add/Edit footer tracking code → Save.

---

## Per-offer inject flags

On each offer's checkout theme section:

```
inject_header_tracking_code: true
inject_footer_tracking_code: true
```

If either is false, this site-wide pair stops on that offer only. Check these before debugging a single-offer tracking gap.

---

## What this is not

| Field | Where |
|---|---|
| Header Page Scripts (site chrome GTM, schema, currency toggle) | Settings → Site Details |
| Checkout layout / copy / CSS / scroll JS | Per-offer theme Custom Code + CSS + JS |
| Website theme Custom JavaScript | Customizer → Theme Custom Code → JS (`#home-page` helpers only) |

---

## Verification

1. Admin: Settings → Checkout shows the expected header and footer payloads after Save.
2. Open a live checkout in a real browser (curl returns HTTP 403 behind Cloudflare).
3. Console: `Snooze: Checkout Page - Loading Full Tracking`.
4. Network: `load.ss.joinsnooze.com`, GTM, Meta pixel as expected.
5. Meta Pixel Helper / Events Manager for InitiateCheckout and Purchase with Advanced Matching keys when the footer + matching scripts are live.

---

## Related

- [`checkout-header-tracking.html`](../../kajabi-deployment/global/html/checkout-header-tracking.html) (single A4 paste file; Advanced Matching inlines here when shipped)
- [`meta-advanced-matching.js`](../../kajabi-deployment/global/js/meta-advanced-matching.js) (fragment only; not a paste target)
- [`kajabi-checkout-tracking.js`](../../kajabi-deployment/global/js/kajabi-checkout-tracking.js)
- [`EMQ-CAPI-ADVANCED-MATCHING.md`](./EMQ-CAPI-ADVANCED-MATCHING.md) (deploy steps)
- [`SNOOZE-TECHNICAL-TRACKING-BIBLE.md`](./SNOOZE-TECHNICAL-TRACKING-BIBLE.md)

**Last updated:** 2026-07-28
