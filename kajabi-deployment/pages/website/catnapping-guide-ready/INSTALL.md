# Install, Catnapping guide ready (confirmation / fulfilment page)

**Deploy artifact:** [`catnapping-guide-ready-page-complete.html`](./catnapping-guide-ready-page-complete.html)

**What this page is.** `/catnapping-guide-ready` is the page a parent lands on after clicking Confirm in the catnapping double opt-in email. It delivers the guide (download + inline preview), asks one profiling question, and offers the membership as a secondary CTA. Wrapper `<div id="catnapping-guide-ready-page">`. It is a fulfilment page, not an SEO surface: **noindex**.

Copy source: [`../catnapping/CAPTURE-COPY.md`](../catnapping/CAPTURE-COPY.md), section "Confirmation page copy". The copy on this page is pasted as written from that doc. Do not rewrite it here; edit the source doc and re-sync.

---

## What blocks deploy, do not paste around it

Grep before every deploy:

```bash
grep -n "__GUIDE_FILE_URL__\|__AGE_FORM_ACTION__" catnapping-guide-ready-page-complete.html
```

Zero matches required. If either token is still in the file, stop, do not paste.

### `__GUIDE_FILE_URL__`: RESOLVED 2026-08-07 (CNG-003)

```
https://tscmedia.khorus.ai/guides/free-catnapping-guide.pdf
```

Both occurrences (the hero download button and the inline preview `<iframe>`) now carry this URL, and the two `BLOCKED CNG-001` comments have been removed rather than left to ship in live page source.

**The host is Cloudflare R2, not the Kajabi Media Library.** Binding decision 3 assumed a capability Kajabi has removed: it routes non-image uploads to a private prefix and serves them only by 7 day signed URL. See amendment A1 and the session 2 evidence table in `RUN-LOG.md`. The intent of decision 3 (a public URL, shareability accepted, no login wall) is unchanged.

Verified on upload: **HTTP 200 unsigned**, `application/pdf`, and the downloaded bytes are sha256-identical to the 9 page A4 build.

### `__AGE_FORM_ACTION__` (1 occurrence)

The age question's submit mechanism has not been decided; it depends on an unverified Kajabi behaviour (whether a plain HTML form post against a Kajabi-hosted page can tag/segment a contact, or whether this needs to become a second Kajabi form/automation instead). The four age buttons are built as **presentation only**: a `<form>` with no JavaScript, `action="__AGE_FORM_ACTION__"`. Do not deploy with the token present, and do not wire up a `fetch`/`XHR` post to make this "work" without that mechanism decision. It belongs to whoever decides the mechanism.

---

## What changed in the HTML

| Area | Detail |
|---|---|
| Wrapper | `<div id="catnapping-guide-ready-page">`, never `<body id>` (Kajabi strips `<body>` from fragments) |
| Hero | Headline + one supporting line + primary download button (`.btn`), copy verbatim from `CAPTURE-COPY.md` |
| Library line | **Deleted 2026-08-07 (CNG-003).** PF4 tested the premise and the answer is no. A confirmed, form-created contact is `is_member: true` with `sign_in_count: 0`, and `/library` still returns 302 to `/login`. The line would have sent a parent to a login wall, so the block was removed rather than uncommented |
| Inline preview | `<iframe>` pointed at `__GUIDE_FILE_URL__`, styled by `.cgr-preview` in the CSS. Falls back visually to the download button already above it if the browser cannot render the embed |
| Age question | Four `<button type="submit">` elements inside one `<form>`, no JavaScript, `action="__AGE_FORM_ACTION__"`. Full width and stacked on screens under 600px, 2x2 grid above that. See "blocks deploy" section above |
| What comes next | Copy verbatim from `CAPTURE-COPY.md`, including the corrected version without "no pressure to buy anything" |
| Paid CTA | Secondary, `.btn-outline`, below the fold. **Changed 2026-08-07 (CNG-003)** from the membership `z63s9VaR` to the adjudicated 7 day trial CTA per decision 8: button "Start the 7 day trial" linking `https://www.joinsnooze.com/offers/mqQikDM7/checkout`, followed by a `.cgr-trial-note` renewal disclosure. Author the **USD** slug; `currency-toggle.js` line 15 maps `mqQikDM7` to `Sr6KzShx` for Australian visitors. Wording is final, see `verify/cta-trial-ADJUDICATION.md`, do not re-open |
| Footer | Canonical `.snooze-footer-clean` markup copied verbatim from [`../../global/html/footer.html`](../../global/html/footer.html), inline inside the page wrapper immediately before its closing `</div>` |
| Tracking | **This row was stale and is corrected 2026-08-07 (CNG-003).** The page carries an inline `<script>` that pushes a single `generate_lead` dataLayer event, guarded by a `cng002_lead_fired` localStorage key so prefetches, reloads and return visits cannot double-count. It adds **no** Meta or GA4 tag: tags 138 and 139 and trigger 137 already exist live in `GTM-KNRTH6P` and nothing was pushing the event, which is the whole reason the capture was untracked. The block is required, not optional. Do not remove it and do not add a second event on this page |

## What changed in the CSS

Appended to [`../../global/css/theme-custom-code.css`](../../global/css/theme-custom-code.css) (paste target A2, whole-file paste):

- **System Initialization block for `#catnapping-guide-ready-page`**, structure copied from the `#ask-sally-page` System Initialization block per `docs/technical/CSS-STABILIZATION-BRIEF.md`. Own copy of CSS custom properties, base typography, `.snooze-container`/`.snooze-section`/`.bg-white`/`.bg-cream`/`.text-center`/`.max-800`, `.btn`/`.btn-outline`, `.hero-wrap`, `.steps-grid`/`.step-card`, and the full-bleed section fix.
- **Page-specific styles** below the init block: `.cgr-hero-lead`, `.cgr-trial-note`, `.cgr-preview` (+ its `iframe`), `.cgr-age-question`/`.cgr-age-legend`/`.cgr-age-grid`/`.cgr-age-btn`, `.cgr-next-lead`, `.cgr-membership-lead`.

  `.cgr-library-note` was **renamed** to `.cgr-trial-note` on 2026-08-07 (CNG-003) rather than deleted and replaced. The library line it styled is gone (PF4), and the trial disclosure needs the same small muted centred treatment, so reusing the rule under an accurate name keeps the A2 pre-paste assertions exactly true: **0 comments, 2318 balanced braces**, unchanged.
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
- [ ] Trial CTA (`mqQikDM7`) link works on mobile, and the `.cgr-trial-note` renewal disclosure is visible directly beneath it, not hidden or collapsed
- [ ] Footer whitespace-normalizes identically to `global/html/footer.html`, no legacy `.snooze-footer`/`.foot-grid` class present
- [ ] Exactly **one** `generate_lead` dataLayer push on the page, and reloading the page does not fire a second one (the `cng002_lead_fired` guard). No Meta or GA4 tag added inline
- [ ] Scoped CSS actually applies: `getComputedStyle` on a `#catnapping-guide-ready-page` element returns the themed value, not the browser default. A `<body id>` wrapper passes a line-count match while rendering completely unstyled, so the line match alone is not sufficient
- [ ] Copy matches `CAPTURE-COPY.md` "Confirmation page copy" verbatim, allowing for the two CNG-003 changes recorded above: the library line is deleted and the paid CTA is the adjudicated trial CTA

---

## Clone next

None planned. This page is specific to the catnapping funnel; other guide fulfilment pages (early rising, nap transitions, sleep regressions) will need their own equivalent once their capture flows reach double opt-in confirmation, at which point this file is the template to copy.
