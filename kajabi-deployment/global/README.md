## Canonical paste sources

**Operator index:** [`../PASTE-MAP.md`](../PASTE-MAP.md)

Every global surface pastes as a WHOLE-FIELD OVERWRITE from the repo file(s) below; edits happen here first, never live:

- [`html/site-header-page-scripts.html`](./html/site-header-page-scripts.html) → Settings → Site Details → Header Page Scripts (GTM single-instance, Stape, schema.org JSON-LD, currency-toggle v2). Website + landing pages.
- [`html/checkout-header-tracking.html`](./html/checkout-header-tracking.html) → Settings → Checkout → Header tracking code (GTM/Stape for checkouts). **Already live; do not re-paste to sync.** To ship Advanced Matching: inline [`js/meta-advanced-matching.js`](./js/meta-advanced-matching.js) into this file in git first, then overwrite once. Never append a second file at paste time.
- [`js/kajabi-checkout-tracking.js`](./js/kajabi-checkout-tracking.js) → Settings → Checkout → Footer tracking code. Live empty as of 2026-07-27.
- [`css/theme-custom-code.css`](./css/theme-custom-code.css) → website theme Custom Code CSS ([`css/snooze-unified-theme.css`](./css/snooze-unified-theme.css) is legacy; not a paste source until reconciled)
- [`js/theme-custom-code.js`](./js/theme-custom-code.js) → website theme Custom Code JS (`#home-page` helpers only; not GTM)

Short checkout pointer: [`checkout-tracking/README.md`](./checkout-tracking/README.md).

Procedure per paste: fresh pre-image → diff (merge new live drift into the canonical file FIRST, commit) → overwrite → byte-compare read-back → curl sentinel (browser for checkouts; curl is 403). See [`CODE-SURFACE-CONTRACT.md`](../../docs/technical/CODE-SURFACE-CONTRACT.md).

## Regenerating the Stape Custom Loader

The loader appears in two deployable files and must stay byte-identical in both:
[`html/site-header-page-scripts.html`](./html/site-header-page-scripts.html) and
[`html/checkout-header-tracking.html`](./html/checkout-header-tracking.html). They cover
non-overlapping surfaces: verified 2026-08-16 in a real browser on `/offers/Sr6KzShx/checkout`
that Header Page Scripts does not inject on checkout pages, so only one loader ever runs.

To regenerate: Stape, container `tmfzxzts`, Power-Ups, then "Code & Setup information". Platform
**Other**, domain `ss.joinsnooze.com`, Web GTM ID `GTM-KNRTH6P`, Same Origin Path **empty**,
"Generate with CDN" **on**, "Use original GTM code" **off**, "Generate with Cookie Keeper" **on**,
user identifier type **Stape User ID**.

Cookie Keeper was enabled 2026-08-16 for Stape, Google Analytics, Google Ads, TikTok and Facebook.
The generated loader branches on Safari 16.4 and above and loads the non-CDN origin
`ss.joinsnooze.com/2oskptmfzxzts.js`, so the server can re-set the cookies ITP would otherwise cap
at seven days. Every other browser keeps `load.ss.joinsnooze.com/2ostmfzxzts.js`.

Stape User ID is the identifier type because no cookie on the site can meet Stape's requirements:
Kajabi serves the pages, so no cookie is set from a server within two octets of Stape's IP, and
every candidate cookie is HttpOnly or short lived. It is derived from IP, user agent, hostname and
TLS signals, so it is approximate and collides across users behind one IP on the same browser.

**Deployable files carry no comments.** Paste only what the field needs. Documentation lives here.
