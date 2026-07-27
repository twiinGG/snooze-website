# Kajabi code-surface contract: one file per paste target

**Authored 2026-07-27** after `theme-custom-code.js` was found merged with the header-scripts file. Verified against the **live site**, not inferred: every size below came from a cache-busted `curl` of the public page.

This is the operational contract. The structural detail lives in [`KAJABI-SURFACE-CODE-SETUP.md`](./KAJABI-SURFACE-CODE-SETUP.md), which stays authoritative on container shapes and write paths.

## The rule

**One repo file per paste target. Never merge two targets into one file.** A file that serves two fields cannot be pasted into either without breaking something.

## The four surface classes, verified live 2026-07-27

| # | Paste target | Field | Canonical repo file | Reaches | Live size |
|---|---|---|---|---|---|
| 1 | **Header Page Scripts** | Settings → Site Details, `site_page_scripts_header` | `global/html/site-header-page-scripts.html` | **Every public page**, website + landing + checkout | 68,022 in repo |
| 2 | **Website theme CSS** | Customizer → Theme Custom Code → CSS, `settings-css-input` | `global/css/theme-custom-code.css` | Website pages only | **403,694** live vs 403,726 repo. **MATCH** (32-char delta is Kajabi's injected wrapper line) |
| 3 | **Website theme JS** | Customizer → Theme Custom Code → JS, `settings-js-input` | `global/js/theme-custom-code.js` | Website pages only | **4,323** live. Repo now byte-identical |
| 4 | **Per-page theme CSS + JS** | Each landing page, checkout and thank-you page has its **own theme** with its **own** CSS and JS fields | one pair per page, see the gap below | That page only | `/links` CSS 8,366, JS 613 |

### Proof the classes are genuinely separate

- `GTM-KNRTH6P` appears **exactly once** on home, `/links` and consultations. One instance, from surface 1.
- The website theme JS field is **identical** on home and consultations, as expected for a shared theme.
- `/links` theme CSS and JS **differ** from the website theme's, and `/links` does **not** contain the `SNOOZE UNIFIED THEME` banner. Landing pages genuinely do not inherit surface 2 or 3.

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
| GTM / Stape hybrid tracking | 1, header | Present once per page on all surface types |
| schema.org JSON-LD | 1, header | In the header file |
| Currency toggle v2 (`__snoozeCurrencyToggle__`) | 1, header | Absent from the live theme JS field |
| `[data-checkout]` and `SNOOZE_CHECKOUT_URL` helpers | 1, header | Absent from the live theme JS field, present in page HTML |
| `#home-page` helpers: age tabs, FAQ accordion | 3, website theme JS | The entire live theme JS field |
| Shared website styling | 2, website theme CSS | The `SNOOZE UNIFIED THEME` banner |
| Anything a landing page needs | 4, that page's own theme | `/links` carries its own CSS and JS |

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

## VERIFIED: there is no site-wide checkout code field

**Settled 2026-07-27 via Kajabi MCP `get_theme_content` on offer theme `2163485833`** (offer `z63s9VaR`), after `curl` proved unusable: checkout URLs return **HTTP 403** because Cloudflare blocks non-browser requests.

**Every theme has its own top-level `css` and `js` settings keys.** Website, landing and checkout themes are structurally identical in this respect. The checkout theme returned:

- `settings.css` — the `#snooze-custom-checkout` scoped stylesheet
- `settings.js` — the scroll-to-checkout script
- plus the custom-code block HTML inside `sections.<id>.blocks.<id>.settings.code`

So a checkout is **three fields per offer**, not one. There is no separate global checkout code field.

**How site-wide code reaches checkouts, which is the part worth knowing.** The checkout section carries two booleans:

```
inject_header_tracking_code: true
inject_footer_tracking_code: true
```

Those flags are what pull the site-level **Header Page Scripts** field (surface 1) into the checkout page. They are the switch. If either is set false on a checkout section, the site-wide GTM and Stape stop firing on that checkout while every other page keeps working, which would look like a tracking bug with no obvious cause. **Check these two flags before debugging missing checkout conversions.**

### Checkout repo coverage: good, one gap

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
