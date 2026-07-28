# Kajabi paste map (source of truth)

**Updated:** 2026-07-28  
**App:** [`apps/snooze-website/kajabi-deployment/`](./)

Git is the source of truth. Kajabi is the render surface. Every paste target below has exactly one canonical repo path (or a documented two-file compose order for the checkout header).

Authoritative detail:
- Contract: [`CODE-SURFACE-CONTRACT.md`](../docs/technical/CODE-SURFACE-CONTRACT.md)
- Surface rules: [`KAJABI-SURFACE-CODE-SETUP.md`](../docs/technical/KAJABI-SURFACE-CODE-SETUP.md)
- Checkout tracking how-to: [`KAJABI-CHECKOUT-TRACKING-CODE.md`](../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md)

File paths in this map use relative markdown links so they open and highlight in Cursor Explorer.

---

## A. Site-wide fields (paste once; reach many pages)

| # | Kajabi location | Admin path | Canonical file(s) | Reaches | Live vs repo (2026-07-27) | Re-paste? |
|---|---|---|---|---|---|---|
| A1 | Settings → Site Details → **Header Page Scripts** | `/admin/sites/…/edit/site-details` | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Website + landing pages | Not fully re-compared this session | Only if that file changes |
| A2 | Customizer → Theme Custom Code → **CSS** | website theme `settings-css-input` | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Website pages only | Comment-stripped 2026-07-28 (was MATCH before strip; **re-paste required**). Live may still show Kajabi’s wrapper-line delta only after paste. | **Yes** after this strip |
| A3 | Customizer → Theme Custom Code → **JS** | website theme `settings-js-input` | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Website pages only | **MATCH** (`#home-page` helpers only) | No |
| A4 | Settings → Checkout → **Header tracking code** | `/admin/settings/checkout` | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Every checkout (when inject_header is true) | **MATCH** live payload (GTM/Stape loader only) | **No** for current loader |
| A5 | Settings → Checkout → **Footer tracking code** | `/admin/settings/checkout` | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) | Every checkout (when inject_footer is true) | Live field **EMPTY** | **Yes, if you want purchase tracking live** (intended, not currently deployed) |

### Checkout header compose order (A4)

The live Header field today is **only** the GTM/Stape loader ([`checkout-header-tracking.html`](./global/html/checkout-header-tracking.html)). That matches the repo file. **Do not re-paste A4 just to “sync” it.**

Optional intended upgrade (not live yet): after the loader, append [`global/js/meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) with its comment header stripped, so `fbq` exists when Advanced Matching runs. That would be a deliberate new paste, not a restore.

Short pointer: [`global/checkout-tracking/README.md`](./global/checkout-tracking/README.md).

### What A4 / A5 are not

| Do not use for checkout tracking | Why |
|---|---|
| A1 Header Page Scripts | Website + landing chrome. Not the checkout Settings fields. |
| A3 website theme JS | `#home-page` helpers only. Pasting tracking here double-fires GTM on website pages. |
| Per-offer theme JS | Layout/scroll helpers for that offer only. |

Per-offer section flags `inject_header_tracking_code` / `inject_footer_tracking_code` switch whether **A4/A5** inject into that offer. They do not pull A1 into the checkout.

---

## B. Per-page / per-offer layout (own theme each)

### B1. Landing pages → [`pages/landing/`](./pages/landing/)

Target shape per page under [`pages/landing/<page>/`](./pages/landing/):

```
<page>.html   → that page’s custom-code block
<page>.css    → that page’s own theme CSS field
<page>.js     → that page’s own theme JS field
```

Pull from live before inventing files. Coverage and gaps: [`WS-001 overview`](../../../docs/projects/website-surfaces/00-overview.md). Only [`linktree`](./pages/landing/linktree/) is complete today.

### B2. Checkout layout (not tracking) → [`pages/checkout/`](./pages/checkout/)

Per offer family: html + css + js into that offer’s theme custom-code / CSS / JS. Dual-currency = paste both twins or neither.

| Family | html | css | js | Gap |
|---|---|---|---|---|
| [`1-month-free-membership`](./pages/checkout/1-month-free-membership/) | yes | yes | yes | — |
| [`7-day-trial-membership`](./pages/checkout/7-day-trial-membership/) | yes | yes | yes | — |
| [`bau-membership-checkout`](./pages/checkout/bau-membership-checkout/) | yes | yes | yes | Copy DIVERGED live (Sally gate) |
| [`camp-snooze-v2-luxury`](./pages/checkout/camp-snooze-v2-luxury/) | yes | yes | yes | — |
| [`day-pass-offer`](./pages/checkout/day-pass-offer/) | yes | **no** | **no** | Pull css+js from live |

Tracking for all of these is still A4/A5, not these files.

### B3. Website pages → [`pages/website/`](./pages/website/)

Shared styling from A2/A3. Page body is a custom-code block or native builder blocks (see [`KAJABI-SURFACE-CODE-SETUP.md`](../docs/technical/KAJABI-SURFACE-CODE-SETUP.md)). One-file ruling applies only to code-block pages.

---

## C. Not paste files (do not put these into Kajabi fields)

| File | Role |
|---|---|
| [`global/js/snooze-globals.js`](./global/js/snooze-globals.js) | Stub pointer only |
| [`global/js/currency-toggle.js`](./global/js/currency-toggle.js) | Test extract only |
| [`global/js/gtm-variables.js`](./global/js/gtm-variables.js) | GTM container variables, configured in GTM UI |
| [`global/css/snooze-unified-theme.css`](./global/css/snooze-unified-theme.css) | Historical / non-canonical vs [`theme-custom-code.css`](./global/css/theme-custom-code.css) |
| [`global/html/footer.html`](./global/html/footer.html) | Sync source copied inline into page HTML, not a Kajabi include |

---

## D. Quick “where do I edit X?”

| Concern | Edit this file | Paste here |
|---|---|---|
| Site GTM / Stape / schema / currency toggle (site + landing) | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Settings → Site Details → Header Page Scripts |
| Checkout GTM / Stape loader | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Settings → Checkout → Header tracking code |
| Checkout Meta Advanced Matching | [`global/js/meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) | Same Header field, after the loader (optional upgrade) |
| Checkout purchase / InitiateCheckout dataLayer | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) | Settings → Checkout → Footer tracking code |
| Shared website CSS | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Theme Custom Code → CSS |
| Home-page JS helpers | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Theme Custom Code → JS |
| One landing page look/feel | [`pages/landing/`](./pages/landing/) | That landing page’s own theme fields |
| One checkout layout/copy | [`pages/checkout/`](./pages/checkout/) | That offer’s theme fields |

---

## E. Verification rules

1. Website / landing: cache-busted `curl` of the public URL; every non-blank repo line appears live.
2. Checkouts: curl is **HTTP 403** (Cloudflare). Verify in a real browser, or read back from Settings → Checkout after Save.
3. Any `.js` paste file must pass `node --check`. Markup in a theme-JS field is a defect.
4. `GTM-KNRTH6P` must appear at most once per assembled page type (site pages from A1; checkouts from A4).
