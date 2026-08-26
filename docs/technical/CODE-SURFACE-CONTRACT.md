# Kajabi code-surface contract: one file per paste target

**Authored 2026-07-27** after `theme-custom-code.js` was found merged with the header-scripts file. Verified against the **live site**, not inferred: every size below came from a cache-busted `curl` of the public page (checkouts via admin screenshot; curl is 403).

This is the operational contract. Operator index: [`../../kajabi-deployment/PASTE-MAP.md`](../../kajabi-deployment/PASTE-MAP.md). Structural detail: [`KAJABI-SURFACE-CODE-SETUP.md`](./KAJABI-SURFACE-CODE-SETUP.md).

## The rule

**One repo file per paste target.** Never merge two targets into one file. Never compose one target from two files at paste time (append / strip-header / glue). A file that serves two fields cannot be pasted into either without breaking something; a field assembled from two files at paste time loses chunks.

If Advanced Matching ships on checkouts, **inline** it into [`checkout-header-tracking.html`](../../kajabi-deployment/global/html/checkout-header-tracking.html) in git first. [`meta-advanced-matching.js`](../../kajabi-deployment/global/js/meta-advanced-matching.js) is a fragment only, not a paste target.

## The five surface classes (corrected 2026-07-27)

| # | Paste target | Field | Canonical repo file | Reaches | Live size / state |
|---|---|---|---|---|---|
| 1 | **Header Page Scripts** | Settings → Site Details, `site_page_scripts_header` | [`global/html/site-header-page-scripts.html`](../../kajabi-deployment/global/html/site-header-page-scripts.html) | Website + landing pages (public site chrome) | 68,022 in repo |
| 2 | **Website theme CSS** | Customizer → Theme Custom Code → CSS, `settings-css-input` | [`global/css/theme-custom-code.css`](../../kajabi-deployment/global/css/theme-custom-code.css) | Website pages only | Comment-stripped 2026-07-28 (405 comments removed for AI-scrape hygiene). **Re-paste required.** After paste, allow only Kajabi’s injected wrapper line as live delta. |
| 3 | **Website theme JS** | Customizer → Theme Custom Code → JS, `settings-js-input` | [`global/js/theme-custom-code.js`](../../kajabi-deployment/global/js/theme-custom-code.js) | Every website page, not landing-page themes | Current behaviour is guarded to `#home-page` and exits safely elsewhere. Live and repo must be compared byte for byte before each paste. |
| 4 | **Per-page theme CSS + JS + block HTML** | Each landing page, checkout and thank-you page has its **own theme** with its **own** CSS, JS and custom-code fields | one set per page / offer under [`pages/`](../../kajabi-deployment/pages/) | That page / offer only | `/links` CSS 8,366, JS 613 |
| 5 | **Checkout Tracking Code** | Settings → Checkout (`/admin/settings/checkout`) | see below | **Every checkout page** (when that offer's inject flags are on) | Confirmed live 2026-07-27 |

### Surface 5 detail: Settings → Checkout (site-wide)

This is a **real admin surface**. It is not the Header Page Scripts field and it is not per-offer theme CSS/JS. Path: **Settings → Checkout → Checkout Tracking Code**.

| Sub-field | Kajabi UI | Canonical repo file(s) | Live as of 2026-07-27 | Re-paste? |
|---|---|---|---|---|
| Header tracking code | "placed in the `<head>` of every checkout page" | [`checkout-header-tracking.html`](../../kajabi-deployment/global/html/checkout-header-tracking.html) only | GTM/Stape loader present and matches repo; Advanced Matching **not** in the live field (inline into this file before any AM paste) | **No** for the loader. Paste only after editing this single file |
| Footer tracking code | "placed at the end of the `<body>` of each checkout page" | [`kajabi-checkout-tracking.js`](../../kajabi-deployment/global/js/kajabi-checkout-tracking.js) | **EMPTY** | **Yes** only when shipping purchase dataLayer |

Per-offer checkout themes still carry their own HTML/CSS/JS for layout and copy (surface 4). Tracking for all checkouts is this site-wide Settings → Checkout pair.

**How the inject flags relate.** Each checkout section has:

```
inject_header_tracking_code: true
inject_footer_tracking_code: true
```

Those flags switch whether **this Settings → Checkout Tracking Code** is injected into that offer's checkout. They do **not** pull surface 1 (Header Page Scripts) into the checkout. If either flag is false on a checkout section, site-wide checkout GTM/Stape (and footer purchase tracking) stop on that offer while every other page keeps working. Check these two flags before debugging missing checkout conversions.

### Proof the classes are genuinely separate

- `GTM-KNRTH6P` appears **exactly once** on home, `/links` and consultations. One instance, from surface 1.
- The website theme JS field is **identical** on home and consultations, as expected for a shared theme.
- `/links` theme CSS and JS **differ** from the website theme's, and `/links` does **not** contain the `SNOOZE UNIFIED THEME` banner. Landing pages genuinely do not inherit surface 2 or 3.
- Checkouts have their **own** GTM/Stape loader in Settings → Checkout → Header tracking code (surface 5), separate from surface 1. Confirmed by admin screenshot 2026-07-27.

## What went wrong, so it is recognisable next time

`theme-custom-code.js` had grown to **62,708 chars against 4,326 live**, 14.5 times too big, because a consolidation merged the header-scripts content into it. **968 of its 1,052 unique lines were identical to `site-header-page-scripts.html`.**

Pasting it into `settings-js-input` would have caused two failures at once:

1. **JS syntax error.** It opened with `<link rel="preload">` followed by six `<script>` tags. That field takes bare JavaScript; the live field contains no markup at all.
2. **GTM double-firing** on every website page, because the header field already serves the same container site-wide. That corrupts precisely the analytics ME-003 through ME-005 were spent repairing.

**The tell:** `node --check` fails on a `.js` paste file, or the repo file and the live field differ by more than Kajabi's injected wrapper line.

Fixed by restoring the file to the live payload, the `#home-page` helpers only. Pre-split copy at `global/js/_archive/theme-custom-code.js.pre-split-2026-07-27`.

## Which concern belongs to which surface

Settled by checking where each is actually live.

| Concern | Surface | Evidence |
| --- | --- | --- |
| GTM / Stape hybrid tracking (website + landing) | 1, header page scripts | Present once per page on website and landing surfaces |
| GTM / Stape hybrid tracking (checkouts) | 5, Settings → Checkout → Header | Live admin field holds the checkout-specific loader |
| Meta Advanced Matching on checkouts | 5, header (same file as loader) | Inline into `checkout-header-tracking.html` before paste; fragment at `meta-advanced-matching.js`; not live as of 2026-07-27 |
| Purchase / InitiateCheckout dataLayer | 5, Settings → Checkout → Footer | `kajabi-checkout-tracking.js`; live footer empty as of 2026-07-27 |
| schema.org JSON-LD | 1, header | In the header file |
| Currency toggle v2 (`__snoozeCurrencyToggle__`) | 1, header | Absent from the live theme JS field |
| `[data-checkout]` and `SNOOZE_CHECKOUT_URL` helpers | 1, header | Absent from the live theme JS field, present in page HTML |
| `#home-page` helpers: age tabs, FAQ accordion | 3, website theme JS | The entire live theme JS field |
| Shared website styling | 2, website theme CSS | The `SNOOZE UNIFIED THEME` banner |
| Anything a landing page needs for layout | 4, that page's own theme | `/links` carries its own CSS and JS |
| Checkout layout / copy | 4, that offer's own theme | html + css + js per offer family |

**`snooze-globals.js` and `currency-toggle.js` are not paste files.** The first is a 16-line stub pointer; the second is a test-only extract. Never paste either.

## Open gap: landing pages are not fully represented in the repo

Surface 4 has **its own CSS and JS fields per page**, and the repo does not carry them. Live `/links` has 8,366 chars of theme CSS and 613 of theme JS that exist in **no repo file**, so they are unversioned and would be lost if that theme were rebuilt.

Current repo coverage:

| Landing page | html | css | js |
| --- | --- | --- | --- |
| `linktree` | 1 | 1 | 1 |
| `day-pass` | 1 | 0 | 1 |
| `day-pass-paidads` | 1 | 0 | 1 |
| `camp-snooze` | 3 | 0 | 0 |
| `cold-traffic-landing-page` | 1 | 0 | 0 |
| `day-pass-paidads-thanks` | 1 | 0 | 0 |
| `snooze-access-paidads` | 1 | 0 | 0 |
| `annual-moment-v1` | 0 | 0 | 0 |
| `kic-partnership` | 0 | 0 | 0 |

Only `linktree` is complete. Two directories are empty.

**Target shape**, one set per landing page:

```
pages/landing/<page>/
  <page>.html   -> the custom-code block
  <page>.css    -> that page's own theme CSS field
  <page>.js     -> that page's own theme JS field
```

Note this **extends** the older "landing pages must be self-contained" guidance. Self-contained is still right, in that a landing page must never depend on the website theme. What was missing is that self-containment has three fields per page, not one, and only the block HTML was being tracked.

**Do not bulk-create these from templates.** Each must be pulled from its live theme first, or the repo asserts a state the site does not have. Pull, commit as the pre-image, then edit.

## CORRECTED: there IS a site-wide checkout tracking surface

**False claim overturned 2026-07-27.** An earlier pass of this contract, using only Kajabi MCP `get_theme_content` on offer theme `2163485833`, concluded there was no site-wide checkout code field. That was wrong. MCP theme payloads show per-offer `css` / `js` / custom-code only. They do not surface **Settings → Checkout**, which is a separate site-admin page with its own Header and Footer tracking code fields. Live admin confirmation: those fields exist, the header currently holds the Snooze Hybrid Tracking GTM/Stape loader, and the footer is empty.

**What MCP did get right:** every checkout offer theme still has its own top-level `css` and `js` plus a custom-code block. A checkout's **layout and copy** are three fields per offer (surface 4). Tracking is the separate site-wide pair (surface 5).

**Do not conflate:**

| Concern | Where it lives |
|---|---|
| Checkout layout, pricing copy, twin-currency link | Per-offer theme (surface 4) |
| GTM / Stape / Meta Advanced Matching / purchase dataLayer on checkouts | Settings → Checkout Tracking Code (surface 5) |
| GTM / Stape / schema / currency toggle on website + landing pages | Header Page Scripts (surface 1) |

### Checkout repo coverage: good on layout, tracking drift open

Checkouts are the **best-covered** surface, and are the model the landing pages should follow.

| Checkout family | html | css | js |
| --- | --- | --- | --- |
| `1-month-free-membership` | 14 | 1 | 1 |
| `7-day-trial-membership` | 7 | 1 | 1 |
| `bau-membership-checkout` | 9 | 1 | 1 |
| `camp-snooze-v2-luxury` | 2 | 1 | 1 |
| `day-pass-offer` | 1 | **0** | **0** |

Only `day-pass-offer` is missing its CSS and JS. Pull them from that offer's theme before any further work on it.

Note the live `bau` block comment says "HTML only, no `<style>`/`<script>`", which is correct **for the block**: the styling and script belong in the theme's `css` and `js` fields, not inline in the block. That is the right pattern and it is why the separate repo files exist.

Dual-currency offers remain **paired**: paste both twins or neither.

## Pre-paste checklist

1. Correct file for the target field, per the table above.
2. `node --check` passes on any `.js` paste file. A markup tag in a `.js` file is a defect.
3. Repo file and live field differ only by Kajabi's injected wrapper line.
4. `GTM-KNRTH6P` appears at most once in the assembled page.
5. After pasting: cache-busted `curl` of the public URL and assert every non-blank repo line appears live. Never accept a greyed-out Save button as proof.
