# Catnapping guide ready (confirmation / fulfilment page)

**What this page is.** `/catnapping-guide-ready` is where a parent lands after clicking **Confirm email** in the catnapping double opt-in. It delivers the guide (download button plus inline preview), explains what the sequence will send, and offers the 7 day trial as a secondary CTA.

Reached from form `2148526865`'s confirmation redirect. Not linked from anywhere on the site.

**Kajabi surface:** landing page `2152204610`. Copy source: [`../../website/catnapping/CAPTURE-COPY.md`](../../website/catnapping/CAPTURE-COPY.md), section "Confirmation page copy". Do not rewrite copy here; edit the source doc and re-sync.

---

## Why this is a landing page, and why that forces a second stylesheet

It was first built and shipped as a **website page**, which is what `KAJABI-SURFACE-CODE-SETUP.md` recommends, because website pages inherit the shared theme CSS (paste row A2) and landing pages do not.

It moved because **only landing pages expose a noindex control on this account.** The website page settings screen has no "Show page in search results" toggle in either draft or published state, `robots.txt` is Kajabi's permissive default, and no live Snooze page serves a `robots` meta. This is a fulfilment page, so keeping it out of search matters more than sharing one stylesheet.

**The cost, measured rather than assumed.** `/asksally` is an existing landing page, and its served HTML carries a "Custom CSS Added Via Theme Settings" block with **zero** occurrences of `#ask-sally-page`. Landing pages get their own minimal theme CSS, not the site theme's 381KB file. So this page must carry its own stylesheet or it renders unstyled, and a cache-busted line-match curl still passes while it does. Only `getComputedStyle` catches it.

---

## File list

| File | Purpose |
|---|---|
| `README.md` | This file |
| `catnapping-guide-ready.html` | The page body. Pastes into the landing page's Custom Code block |
| `catnapping-guide-ready.css` | Self-contained stylesheet. Pastes into the landing page's own Custom CSS field |

No `.js` file. The page's only script is the inline `generate_lead` dataLayer push, which ships inside the HTML and must stay there.

---

## The stylesheet is generated, not hand written

`catnapping-guide-ready.css` is **extracted from** [`../../../global/css/theme-custom-code.css`](../../../global/css/theme-custom-code.css), the A2 file, so the two can drift. If you change the page's appearance, change it in **both** places or decide deliberately that they differ.

**Decision, CNG-002 close-out (2026-08-08): accept as documented, no automated drift check added.** The same pattern already exists for `camp-snooze` and `linktree`, both landing pages extracted from a shared theme, and neither carries automated tooling either. Building a drift check into `sweep.py` would need to parse two CSS files and diff selector-by-selector, which is more machinery than one extracted stylesheet justifies. If A2 changes materially, re-extract by hand and re-verify with `getComputedStyle`, the same method this run used to prove the extraction correct in the first place.

Two regions were taken:

| Region | Source lines (at time of extraction) | What it is |
|---|---|---|
| Page block | 12388 to end of file | The `#catnapping-guide-ready-page` System Initialization block and the `.cgr-*` page rules |
| Footer block | 5207 to 5285 | `.snooze-footer-clean` and the `.sf-*` rules |

The footer block was needed because the page renders the canonical footer inline and **none** of its rules live in the page block. Without it the footer renders unstyled.

Seven `--sn-*` variables that the footer block reads are defined in the theme file well outside both regions, so they are injected into the `#catnapping-guide-ready-page` opening rule and inherit down to the footer:

```
--sn-coral #F43357 · --sn-navy #1F293B · --sn-white #FFFFFF · --sn-text-light #94A3B8
--sn-font-body 'Poppins', sans-serif · --sn-font-heading 'Playfair Display', serif
--sn-max-width 1200px
```

**Assertions on the generated file:** 78 balanced braces, 0 comments, **0 variables used but not defined**.

The A2 file still carries the `#catnapping-guide-ready-page` rules and the eight shared `:is()` reset-list registrations. Those are now dead weight on the site theme, since no website page uses that wrapper. Removing them is a follow-up, deliberately not bundled with this move.

---

## Paste steps

### 1. Custom CSS

Landing page `2152204610` → Settings → **Custom CSS** → paste `catnapping-guide-ready.css` whole.

### 2. Page body

Paste `catnapping-guide-ready.html` into the landing page's Custom Code block. Fragment only. Do **not** paste `<!DOCTYPE>`, `<html>`, `<head>` or `<body>`: a full document here makes Kajabi serve two `<title>` tags, with the preview-helper one beating the panel SEO. That defect was found live on `/catnapping` in session 2 and must not be reintroduced.

### 3. noindex

Landing page settings → turn **off** showing the page in search results. This is the entire reason the page is a landing page. Confirm it with a `curl` after publishing.

### 4. Path

Slug must be `catnapping-guide-ready`. The old **website page `2157301049` owns that path and must be unpublished first**, or the slug cannot be claimed.

### 5. Redirect

Form `2148526865`'s confirmation redirect points here. Nothing to do in this folder beyond confirming it targets the live URL.

---

## The age question is not on this page yet

The build carries no age question. `INSTALL.md` for the website-page version sanctions two ways past the `__AGE_FORM_ACTION__` placeholder: resolve the mechanism, or remove the section before paste. It is removed here.

It goes back **only** if PF3 shows the confirmation redirect carries a contact identifier in the query string. If it does not, `ws4-age-capture-design.md` says the question moves into sequence email 1 as four tracked links instead. Do not wire a `fetch` to make it "work" without that mechanism decision.

---

## QA checklist

- [ ] `grep -n "__GUIDE_FILE_URL__\|__AGE_FORM_ACTION__"` returns zero on the file about to be pasted
- [ ] View source: wrapper is `<div id="catnapping-guide-ready-page">`, never `<body id>`
- [ ] Exactly one `<title>` and one `<body>` in the served HTML
- [ ] **noindex confirmed by `curl`**, not by the admin toggle alone
- [ ] **`getComputedStyle` check**, because the line match cannot catch an unstyled page. Expected on the live page: `h1` font-family `"Playfair Display", serif` at 56px, `a.btn` background `rgb(214, 38, 70)` with 50px radius, `.cgr-trial-note` 14.4px in `rgb(100, 116, 139)`, `.cgr-preview` border `1px solid rgb(242, 237, 234)` and 20px radius
- [ ] Footer renders styled: navy background, white text, and the `.sf-grid` columns laid out rather than stacked plain
- [ ] Download button opens the R2 guide, not a login wall
- [ ] Inline preview renders on a real phone; if it cannot, the download button above it is still reachable
- [ ] Trial CTA (`mqQikDM7`) works. Author the USD slug; `currency-toggle.js` maps it to `Sr6KzShx` for Australian visitors
- [ ] Exactly one `generate_lead` dataLayer push, and a reload does not fire a second (the `cng002_lead_fired` guard)
