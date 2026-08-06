# Install, Catnapping guide ready (confirmation / fulfilment page)

**Deploy artifact:** [`catnapping-guide-ready-page-complete.html`](./catnapping-guide-ready-page-complete.html)

**What this page is.** `/catnapping-guide-ready` is the page a parent lands on after clicking Confirm in the catnapping double opt-in email. It delivers the guide (download + inline preview), asks one profiling question, and offers the membership as a secondary CTA. Wrapper `<div id="catnapping-guide-ready-page">`. It is a fulfilment page, not an SEO surface: **noindex**.

Copy source: [`../catnapping/CAPTURE-COPY.md`](../catnapping/CAPTURE-COPY.md), section "Confirmation page copy". The copy on this page is pasted as written from that doc. Do not rewrite it here; edit the source doc and re-sync.

---

## Two things block deploy, do not paste around them

This page ships with two placeholder tokens. Both must be replaced before this page goes live. Grep for them before every deploy:

```bash
grep -n "__GUIDE_FILE_URL__\|__AGE_FORM_ACTION__" catnapping-guide-ready-page-complete.html
```

Zero matches required. If either token is still in the file, stop, do not paste.

### `__GUIDE_FILE_URL__` (2 occurrences)

The guide PDF does not have a public URL yet. This is blocked on CNG-001, a separate workstream (uploading/locating the file in the Kajabi Media Library and copying its public media URL). It is used in two places:

1. The primary download button (hero section).
2. The inline PDF preview `<iframe>` (below the hero).

Both carry an HTML comment directly above the token reading `BLOCKED CNG-001: replace __GUIDE_FILE_URL__ with the public Kajabi Media Library URL before deploy`. Replace both with the same real URL once CNG-001 delivers it.

### `__AGE_FORM_ACTION__` (1 occurrence)

The age question's submit mechanism has not been decided; it depends on an unverified Kajabi behaviour (whether a plain HTML form post against a Kajabi-hosted page can tag/segment a contact, or whether this needs to become a second Kajabi form/automation instead). The four age buttons are built as **presentation only**: a `<form>` with no JavaScript, `action="__AGE_FORM_ACTION__"`. Do not deploy with the token present, and do not wire up a `fetch`/`XHR` post to make this "work" without that mechanism decision. It belongs to whoever decides the mechanism.

---

## What changed in the HTML

| Area | Detail |
|---|---|
| Wrapper | `<div id="catnapping-guide-ready-page">`, never `<body id>` (Kajabi strips `<body>` from fragments) |
| Hero | Headline + one supporting line + primary download button (`.btn`), copy verbatim from `CAPTURE-COPY.md` |
| Library line | Commented out (`<!-- ... -->`) in full, wrapped in an explanatory comment. It is only true if a form-created contact can reach the Snooze library without hitting a password wall, which is unverified. Delete the comment markers to ship it once someone confirms library access works for these contacts, or delete the whole block if it does not |
| Inline preview | `<iframe>` pointed at `__GUIDE_FILE_URL__`, styled by `.cgr-preview` in the CSS. Falls back visually to the download button already above it if the browser cannot render the embed |
| Age question | Four `<button type="submit">` elements inside one `<form>`, no JavaScript, `action="__AGE_FORM_ACTION__"`. Full width and stacked on screens under 600px, 2x2 grid above that. See "blocks deploy" section above |
| What comes next | Copy verbatim from `CAPTURE-COPY.md`, including the corrected version without "no pressure to buy anything" |
| Membership CTA | Secondary, `.btn-outline`, links to `https://www.joinsnooze.com/offers/z63s9VaR/checkout`, below the fold |
| Footer | Canonical `.snooze-footer-clean` markup copied verbatim from [`../../global/html/footer.html`](../../global/html/footer.html), inline inside the page wrapper immediately before its closing `</div>` |
| Tracking | None added. No GTM, no dataLayer pushes. That is a separate workstream (the Lead tag work referenced in `../catnapping/CAPTURE-SETUP.md`) |

## What changed in the CSS

Appended to [`../../global/css/theme-custom-code.css`](../../global/css/theme-custom-code.css) (paste target A2, whole-file paste):

- **System Initialization block for `#catnapping-guide-ready-page`**, structure copied from the `#ask-sally-page` System Initialization block per `docs/technical/CSS-STABILIZATION-BRIEF.md`. Own copy of CSS custom properties, base typography, `.snooze-container`/`.snooze-section`/`.bg-white`/`.bg-cream`/`.text-center`/`.max-800`, `.btn`/`.btn-outline`, `.hero-wrap`, `.steps-grid`/`.step-card`, and the full-bleed section fix.
- **Page-specific styles** below the init block: `.cgr-hero-lead`, `.cgr-library-note`, `.cgr-preview` (+ its `iframe`), `.cgr-age-question`/`.cgr-age-legend`/`.cgr-age-grid`/`.cgr-age-btn`, `.cgr-next-lead`, `.cgr-membership-lead`.
- **`catnapping-guide-ready-page` added to the shared Website Pages `:is()` reset lists** at the top of the file (the 8 selector groups that strip Kajabi's native section/block padding, ending in `#press-page`). This page did not join the separate Guide Page Template `:is()` group (`#chooser-page`, `#age-*-page`, `#catnapping-page`, etc.) because that group carries guide-content components (breadcrumb, trust bar) this fulfilment page does not use; joining it would pull in unused CSS for no benefit.

Exact line ranges appended: see [`docs/projects/catnapping-guide/4_working-cng002/verify/page-build-report.md`](../../../../../docs/projects/catnapping-guide/4_working-cng002/verify/page-build-report.md).

---

## Kajabi paste steps

### 1. Panel SEO

1. Website → Website Pages → **catnapping-guide-ready** → ⋯ Edit details → SEO and social sharing.
2. **Show page in search results** = **Off**. This is the production noindex control; the `<meta name="robots" content="noindex, nofollow">` tag in this file's local-preview `<head>` is a preview-only helper and is never pasted into Kajabi (Kajabi strips `<head>` from custom-code body pastes, and panel SEO wins live regardless).
3. Leave title/description minimal; this page is not meant to be found via search.

### 2. Page body code block

1. Open the catnapping-guide-ready website page editor.
2. Replace the custom code block that holds the page body with the contents of `#catnapping-guide-ready-page` from [`catnapping-guide-ready-page-complete.html`](./catnapping-guide-ready-page-complete.html) (from `<div id="catnapping-guide-ready-page">` through its closing `</div>`, including the footer).
3. Do **not** paste the outer `<!DOCTYPE>`, `<html>`, `<head>`, or `<body>` wrappers. Those are local preview helpers only.
4. **Do not save/publish until both blocking tokens are resolved** (see above).

### 3. Global Custom CSS

1. Open [`../../global/css/theme-custom-code.css`](../../global/css/theme-custom-code.css).
2. Paste **whole file** into Customizer → Theme Custom Code → CSS (`PASTE-MAP.md` row A2).
3. Save.

### 4. Wire the redirect (separate workstream, already documented)

The form that sends parents here is `2148526865`; the redirect-on-confirm setting pointing at `/catnapping-guide-ready` is covered in `../catnapping/INSTALL.md` step 5b. Nothing to do here beyond confirming that setting points at this page's live URL once it is published.

---

## QA checklist

- [ ] `grep -n "__GUIDE_FILE_URL__\|__AGE_FORM_ACTION__"` returns zero matches on the file about to be pasted
- [ ] View-source: wrapper is `<div id="catnapping-guide-ready-page">`, not `<body id>`
- [ ] Panel SEO "Show page in search results" is **Off**; confirm via `curl` that the live page's rendered robots directive is noindex
- [ ] Download button opens the real guide PDF (not a login wall)
- [ ] Inline preview renders on a real phone browser; if it does not render, the download button above it is still reachable
- [ ] Age question: four buttons, full width and stacked below 600px, comfortably tappable (44px+ touch target), no console errors, no network request fires on tap (still presentation only)
- [ ] Membership CTA (`z63s9VaR`) link works on mobile
- [ ] Footer whitespace-normalizes identically to `global/html/footer.html`, no legacy `.snooze-footer`/`.foot-grid` class present
- [ ] No GTM/dataLayer code anywhere on the page
- [ ] Copy matches `CAPTURE-COPY.md` "Confirmation page copy" verbatim; if the library-access line was uncommented, confirm library access actually works for a form-created contact before it ships

---

## Clone next

None planned. This page is specific to the catnapping funnel; other guide fulfilment pages (early rising, nap transitions, sleep regressions) will need their own equivalent once their capture flows reach double opt-in confirmation, at which point this file is the template to copy.
