# global/js - Deployment Notes

> Extracted from source comments during service-model rewrite comment-strip pass (2026-06-29).
> These JS files are deployed to Kajabi via manual paste into custom code blocks.
> Do not edit directly in Kajabi - git is the source of truth.

---

## snooze-globals.js + currency-toggle.js — consolidated paste

**Kajabi deployment location:** Settings → Website → Custom JavaScript (one field, site-wide, applies to all website pages including the landing page which was migrated to Website Page type).

**How to paste:** Copy the full contents of `snooze-globals.js`, then append the full contents of `currency-toggle.js` into the same Custom JavaScript field. The two files form one logical bundle — `snooze-globals.js` defines `window.SNOOZE_CHECKOUT_URL` which `currency-toggle.js` reads on init. Order matters: globals first.

**FOUC prevention (`currency-toggle-fouc.html`):** This script runs before DOM ready and must be in `<head>`. Paste it separately into Settings → Site Details → Header Page Scripts (a distinct Kajabi field from Custom JavaScript). See `global/html/README.md`.

**Authoritative deployment guide:** `kajabi-deployment/DEPLOYMENT-GUIDE.md` (single source of truth). The "Header Scripts" / "Footer Page Scripts" split described in earlier versions of this README was incorrect — Kajabi does not expose separate header and footer script fields for global JS.

Implements two systems injected before page content:

### 1. Hybrid Tracking (GTM)

- Container ID: `GTM-KNRTH6P`
- **MODE A (Delayed Speed):** Pages listed in `fastPages` delay GTM load by 1.5s so visuals paint first. Fast pages: `/links`, `/snooze`, `/bio`, `/free-guide`.
- **MODE B (Instant Power):** All other pages (sales/checkout) load the Stape server-side loader immediately via `https://load.ss.joinsnooze.com/2ostmfzxzts.js`.
- Microsoft Clarity is installed via GTM; no additional code needed in this file.

### 2. Global JavaScript Variables

Currency-aware checkout URL function (`window.getSnoozeCheckoutUrl`) and backwards-compatible `window.SNOOZE_CHECKOUT_URL` getter.

**Offer IDs (Snooze Access):**

| Currency | Offer ID (numeric) | Slug |
|----------|-------------------|------|
| USD | 2150754998 | `z63s9VaR` |
| AUD | 2151256977 | `vYgCNgJz` (complete A$119/A$299/A$997; replaced deleted bEsVXFXG/2151212200 on 2026-06-30) |

Reads `localStorage['snooze_currency_preference']` set by `currency-toggle.js`. Falls back to timezone-based geo detection (`Intl.DateTimeFormat` - Australia/* → AUD, else USD).

**Other global URLs:**
- `SNOOZE_LIBRARY_URL` = `/snooze-library`
- `SNOOZE_VILLAGE_URL` = `https://joinsnooze.com/products/communities/v2/snooze`
- `SNOOZE_LOGIN_URL` = `/login`
- `SNOOZE_METHOD_URL` - commented out pending launch

**PRD reference:** `docs/projects/paid-media-and-dual-currency-v1/00-prd.md §4.8`

### 3. Landing Page JS (Version 2.40)

Initialised on DOMContentLoaded. Sections: Testimonial Carousel, FAQ Accordion, Smooth Scroll, Intersection Observer Animations, Pricing Card Enhancements, Lazy Loading Images, Analytics Tracking (GTM + gtag + fbq), Form Validation, Performance Monitoring, Accessibility, Window Resize, Age Stages Toggle, Sticky CTA Bar, Checkout Link Normalisation, Course Module Accordion, Navigation Dropdown, Launch Offer Banner.

Analytics tracking value defaults: monthly = 147, annual = 490 (update to match current pricing when pricing changes).

### 4. Global Utility Functions + Nav/Mobile Menu

- `window.toggleSnoozeMenu` / `window.closeSnoozeMenu` - mobile nav toggle.
- `window.toggleCourseModule` - course module accordion; defined globally so inline onclick handlers work.
- `debounce`, `throttle`, `isInViewport` - utility functions.

---

## currency-toggle.js

**Kajabi deployment location:** Appended after `snooze-globals.js` in Settings → Website → Custom JavaScript (see consolidated paste note above).

**Version:** 2.0 - Merged Implementation (Dec 30, 2025)

**PRD references:** `docs/projects/paid-media-and-dual-currency-v1/00-prd.md §4.5, §4.6, §4.7`

### Offer ID Mapping (USD → AUD)

| Offer | USD ID / Slug | AUD ID / Slug | Notes |
|-------|--------------|--------------|-------|
| Snooze Access (core membership) | `2150754998` / `z63s9VaR` | `2151256977` / `vYgCNgJz` | Complete (A$119/A$299/A$997). Replaced deleted bEsVXFXG/2151212200 on 2026-06-30. |
| Snooze 7-Day Trial | `2150887297` / `mqQikDM7` | `2151254578` / `Sr6KzShx` | AUD variant IDs still to add to variantMapping |
| Camp Snooze | `2150884129` / `K3Y6FEKX` | `2150946767` / `46Bz9tk6` | Active |
| Day Pass cold-ads | `2151212201` / `ZvzAZKqz` | - | Single free offer, no currency twin. Currency preference captured on day_pass_grant row for downstream CTA routing. PRD §5.3. |

### Variant Mapping (Snooze Access, PRD §4.7)

| Tier | USD Variant ID | AUD Variant ID | Price |
|------|---------------|---------------|-------|
| Monthly | `68112` | `161174` | $79 USD / $119 AUD |
| Quarterly | `37262` | `161175` | $197 USD / $299 AUD |
| Yearly | `37263` | `161176` | $657 USD / $997 AUD |

AUD variant IDs resolved 2026-06-30: the complete AUD core offer `vYgCNgJz`/2151256977 carries all three tiers (variants 161174/161175/161176). This replaced the deleted monthly-only bEsVXFXG/2151212200.

### AUD Offer IDs for GTM tracking

`['2150946767', '2151256977', '2151254578']` - Day Pass cold-ads is currency-neutral (free) so not listed.

### Legacy offer mapping (kept for historical URL parity, PRD §4.6)

These IDs may still appear in old emails, ads, or backlinks but are no longer the active membership:
- `6iRarwak` → `bFxLg2uz` (Membership Launch, superseded by `2150754998`)
- `igbTdRbk` → `SiiVEJuS` (Consult Upsell)

### Test hook

`window.__snoozeCurrencyToggle__` exposes `{ rewriteCheckoutUrl, CONFIG }` for unit testing outside a real Kajabi page (e.g. node test harness).

---

## kajabi-checkout-tracking.js

**Kajabi deployment location:** Settings > Checkout Tracking Code > Footer Tracking Code

**Dependency:** Must load AFTER the GTM/Stape header loader and AFTER meta-advanced-matching.js so window.fbq and window.SnoozeMetaMatch exist.

**Purpose:** Fires GA4 purchase event with correct currency, Meta Pixel Purchase event with hashed Advanced Matching (em, etc.) and shared event_id for browser/server-side dedup, and InitiateCheckout when checkout page loads to improve Event Match Quality (EMQ).

**AUD Offer ID Mapping (updated 2026-07-11):**
- Currency is taken from `Kajabi.order.currency` when present; otherwise from the AUD offer-ID allow-list (`AUD_OFFER_IDS`, all live AUD-priced offers per Kajabi list_offers) for purchases, and the AUD checkout-slug list (`AUD_OFFER_SLUGS`) for path-based InitiateCheckout; else USD.
- The old `bFxLg2uz` / `SiiVEJuS` offers are retired — do not reintroduce. Keep `AUD_OFFER_IDS` / `AUD_OFFER_SLUGS` (here and in gtm-variables.js) in sync when new AUD offers publish.

**Event ID Dedup Contract:**
- event_id is generated FRESH per logical event occurrence (one per Purchase / InitiateCheckout fire) and pushed to dataLayer as meta_event_id.
- Browser Pixel and server-side CAPI dedupe by reading that same meta_event_id within the same page load; the id is NOT persisted across loads (persisting collapsed distinct events into one).
- Server-side CAPI Purchase/InitiateCheckout events MUST send the identical event_id read from the dataLayer for that page load.

---

## meta-advanced-matching.js

**Kajabi deployment location:** Settings > Checkout Tracking Code > Header Tracking Code (paste AFTER GTM/Stape loader)

**Purpose:** Raises Event Match Quality (EMQ) on InitiateCheckout and Purchase from 5.4-6.1 to >=8.0 by attaching hashed email (em) and other match keys (fn, ln, ph, ct, zp, country) plus fbc/fbp to Meta Pixel; deduplicates browser Pixel events with server-side (Stape sGTM) CAPI events via shared event_id.

**Meta Pixel ID:** `449153684613893`

**Match Keys:** SHA-256 hashed (lowercased, trimmed) before delivery to Meta Pixel.

**localStorage Sources:** GTM-TAG-86 price scraper writes plaintext values (email, phone, city, zip, country, full_name, product_name). This module reads, hashes, and attaches them.

**References:**
- docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md
- docs/technical/EMQ-CAPI-ADVANCED-MATCHING.md

---

## gtm-variables.js

**Deployment location:** Google Tag Manager - Container `GTM-KNRTH6P`

This file is NOT pasted into Kajabi. It contains two Custom JavaScript Variable definitions to be created manually inside GTM.

**IMPORTANT:** These variables are critical for accurate ROAS tracking. Without proper currency codes, Meta/Google will treat AUD $220 as USD $220, artificially inflating revenue by approximately 35%.

### Variable 1: CJS - User Currency Preference

- **GTM Variable Type:** Custom JavaScript
- **Name:** `CJS - User Currency Preference`
- **Description:** Detects user's currency preference from localStorage or URL
- Detection order: (1) AUD offer ID in pathname, (2) `localStorage['snooze_currency_preference']`, (3) fallback `'USD'`
- **Note (updated 2026-07-11):** the AUD slug array now lists the live AUD checkout slugs (`vYgCNgJz`, `Sr6KzShx`, `46Bz9tk6`, `ENhg45mj`, + tier-2 twins). When GTM is next updated, paste the current `gtm-variables.js` version. Keep it in sync with `kajabi-checkout-tracking.js` `AUD_OFFER_SLUGS`.

### Variable 2: CJS - Dynamic Click Value

- **GTM Variable Type:** Custom JavaScript
- **Name:** `CJS - Dynamic Click Value`
- **Description:** Gets price value from clicked element based on current currency
- Supports two data attribute formats: `data-usd="147"` + `data-period-usd="/ 3 months"`, or combined `data-usd="$147/quarter"`
- Depends on `{{CJS - User Currency Preference}}` and `{{Click Element}}` (built-in GTM variable)

### Usage in GTM tags

For GA4 Event (e.g. `begin_checkout` on button click):
- Parameter `currency` → Value: `{{CJS - User Currency Preference}}`
- Parameter `value` → Value: `{{CJS - Dynamic Click Value}}`

For Meta Pixel (Custom HTML or Template):
```js
fbq('track', 'InitiateCheckout', {
 value: {{CJS - Dynamic Click Value}},
 currency: '{{CJS - User Currency Preference}}',
 content_name: 'Snooze Membership'
});
```
