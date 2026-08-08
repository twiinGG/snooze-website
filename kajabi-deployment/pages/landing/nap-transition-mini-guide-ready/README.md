# 3-to-2 nap transition guide ready (post-purchase page)

**Kajabi surface:** landing page, id to be assigned at create. Slug `nap-transition-mini-guide-ready`.
**Status:** built in repo, **not yet pasted and not yet live**. Copy is propose-only until Sally approves it.

Post-purchase destination for offer `FwisMwa6`, which is claimed from `/nap-transitions`.

Built for WS-003 workstream 2, which closes dead-end register D2: the offer's post-purchase preference was `disabled`, so a claimant landed on Kajabi's default confirmation page with no next step.

---

## Why this is a landing page

WS-003 decision 4. Every existing thank-you destination on this site is a landing page, and landing pages carry their own theme rather than the shared website theme. The reasoning and the measurement behind that are in [`../catnapping-guide-ready/README.md`](../catnapping-guide-ready/README.md), which is the approved shape this page copies.

The practical consequence: this page must carry its own stylesheet or it renders unstyled, and a cache-busted line-match curl still passes while it does. Only `getComputedStyle` catches it.

---

## File list

| File | Purpose |
|---|---|
| `README.md` | This file |
| `nap-transition-mini-guide-ready.html` | Page body. Pastes into the landing page's Custom Code block |
| `nap-transition-mini-guide-ready.css` | Self-contained stylesheet. Pastes into the landing page's own Custom CSS field |

No `.js` file. This page fires no tracking of its own; see "Tracking" below.

---

## The stylesheet is generated, not hand written

`nap-transition-mini-guide-ready.css` is derived from [`../catnapping-guide-ready/catnapping-guide-ready.css`](../catnapping-guide-ready/catnapping-guide-ready.css), with three renames and two deletions:

| Change | Reason |
|---|---|
| `#catnapping-guide-ready-page` becomes `#nap-transition-ready-page` | Page wrapper id |
| `.snooze-container` becomes `.ntr-wrap` | WS-003 decision 6, see below |
| `.snooze-section` becomes `.ntr-band` | WS-003 decision 6, see below |
| `.cgr-*` becomes `.ntr-*` | Page prefix |
| `.cgr-preview` rules dropped | No PDF preview on this page |
| `.cgr-age-*` rules dropped | No age question on this page |

The `.snooze-footer` full-bleed selector was also dropped. It never matched anything: the footer element is `.snooze-footer-clean`, so that rule was dead on the source page too.

**Assertions on the generated file:** 66 balanced brace pairs, 0 comments, 0 variables used but not defined.

The same drift caveat applies as on the source page. If the shared theme's appearance changes, this file does not follow it. Re-derive by hand and re-verify with `getComputedStyle`.

---

## Class names avoid three substrings

WS-003 decision 6, which follows from [`KAJABI-CLASS-SUBSTRING-TRAP.md`](../../../../../../docs/projects/website-surfaces/4_working/KAJABI-CLASS-SUBSTRING-TRAP.md). Kajabi carries `!important` resets that match on a **substring** of the class name, so any class containing `section`, `container` or `block` can silently lose its padding or its max-width no matter what the rest of the name is. A page block cannot win that on specificity.

Every page-scoped class here is prefixed `ntr-` and contains none of the three. The canonical footer classes (`.snooze-footer-clean`, `.sf-*`) are the deliberate exception: they are a sync source shared with every other page and must not be renamed here.

`.sf-brand-col` has no rules anywhere on the site. That is pre-existing and owned by WS-001, not introduced here.

---

## Paste steps

Do these in order. The offer must not be repointed until the page is **published**, because a thank-you page that is not live is not a destination.

1. **Create** the landing page on site `2148291177`. Title and slug `nap-transition-mini-guide-ready`.
2. **Custom CSS.** Settings, Custom CSS, paste `nap-transition-mini-guide-ready.css` whole.
3. **Page body.** Paste `nap-transition-mini-guide-ready.html` into the Custom Code block. Fragment only. Do **not** paste `<!DOCTYPE>`, `<html>`, `<head>` or `<body>`; a full document makes Kajabi serve two `<title>` tags.
4. **noindex.** Turn off showing the page in search results. This is a fulfilment page.
5. **Publish.** Publishing is an admin UI action; the MCP cannot do it.
6. **Only then** set offer `FwisMwa6` (`2151272119`) post-purchase to `landing_page` with this page's id.

Paste mechanics: use `scripts/emit_paste_js.py`, never a hand-transcribed paste.

---

## Tracking

This page fires nothing. `/catnapping-guide-ready` carries a `generate_lead` dataLayer push because it is the confirmation step of a double opt-in form, and the confirm click is the conversion. This page sits behind a **checkout**, not a form, so the conversion signal belongs on the checkout surface and is ME-006's to place. Do not copy the `generate_lead` script across; it would double-count against a different event.

---

## What the page does not promise

The page makes no claim that emails are coming, because no email sequence is bound to this offer. `list_sequences` on site `2148291177` returns 38 sequences and none targets `3-to-2 Nap Transition Mini Guide`. The automations toolset is not enabled on this account, so no automation binding can be read either way.

If a nurture sequence is later built for this magnet, add the "what comes next" paragraph then, matching the shape on `/catnapping-guide-ready`. Do not add it before the sequence exists.

---

## QA checklist

- [ ] Sally has approved the copy. Nothing member-facing ships before that
- [ ] View source: wrapper is `<div id="nap-transition-ready-page">`, never `<body id>`
- [ ] Exactly one `<title>` and one `<body>` in the served HTML
- [ ] noindex confirmed by `curl`, not by the admin toggle alone
- [ ] Cache-busted curl: every non-blank line of the repo file appears live, 0 missing
- [ ] **`getComputedStyle` check.** Expected: `h1` in `"Playfair Display", serif`, `.ntr-band` padding-top `72px` (`56px` under 768px), `a.btn` background `rgb(244, 51, 87)` with 50px radius, `.ntr-trial-note` 14.4px in `rgb(100, 116, 139)`
- [ ] Footer renders styled: navy background, white text, `.sf-grid` in columns rather than stacked
- [ ] The asset button reaches the granted product for a logged-in claimant, and the login wall for anonymous traffic. Anonymous 302 to `/login` is correct behaviour, not a defect
- [ ] Trial CTA present with the approved disclosure adjacent, and no price
- [ ] Offer `FwisMwa6` post-purchase points at this page's id, confirmed by `get_offer`

---

## Identifiers

| Thing | Value |
|---|---|
| Offer slug | `FwisMwa6` |
| Offer id | `2151272119` |
| Offer title | 3-to-2 Nap Transition Mini Guide |
| Granted product id | `2148990031` |
| Asset URL on the page | `https://www.joinsnooze.com/products/e78214b0-16a4-45a1-bf3d-c77b8f19839c` |
| Trial checkout | `https://www.joinsnooze.com/offers/mqQikDM7/checkout` (USD authored; `currency-toggle.js` maps to `Sr6KzShx` for Australian visitors) |

**Open question for Kade.** `FwisMwa6` grants product `2148990031`, which is the same product the paid offers `2150311631` and `2151262014` sell, and which the Snooze Membership includes. The free mini guide therefore grants the full paid guide. Confirm that is intended before this flow carries volume.
