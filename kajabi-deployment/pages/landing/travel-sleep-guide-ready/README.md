# Travel Sleep Guide Ready (delivery page)

**Kajabi surface:** landing page **2152231510**, own theme **2167290794**. Slug `travel-sleep-guide-ready`.
Admin: https://app.kajabi.com/admin/landing_pages/2152231510/edit
Public: https://www.joinsnooze.com/travel-sleep-guide-ready
**Status:** created 2026-08-23 (TSG-001). Draft, noindex set. **Body and stylesheet not yet pasted.**

The delivery page for the Travel Sleep Guide. Set on form **2149700924** as `thank_you_page_id`.

**Pattern A, so this page grants nothing.** The primary action is the PDF on Cloudflare R2, served
immediately with no session. There is no "log in to your library" language anywhere, no offer, no
password-setup link, and no member account behind the claim. Kajabi cannot host the file publicly at all:
non-image uploads land in a private prefix behind a 7-day signed URL.

Asset: `https://tscmedia.khorus.ai/guides/travel-sleep-guide.pdf`, sha256
`e282c55897d7c0739ae19001de3e8c094795d43df45c4b9597e84b15d6c4a757`, 5,566,304 bytes, 21 pages. Same
bucket and same `guides/` prefix as the catnapping and 3-to-2 nap transition guides.

## Files

| File | Purpose |
|---|---|
| `travel-sleep-guide-ready.html` | Page body. Pastes into the landing page's Custom Code block |
| `travel-sleep-guide-ready.css` | Self-contained stylesheet. Pastes into the landing page's own Custom CSS field |

## The stylesheet is generated, not hand written

Derived from [`../nap-transition-mini-guide-ready/nap-transition-mini-guide-ready.css`](../nap-transition-mini-guide-ready/nap-transition-mini-guide-ready.css)
with two renames and nothing else: `#nap-transition-ready-page` becomes `#travel-sleep-guide-ready-page`,
and `.ntr-*` becomes `.tsgr-*`. The band, button, card, preview-iframe and footer rules are unchanged.

**Assertions on the generated file:** 71 balanced brace pairs, 0 comments, 0 variables used but not
defined, 0 classes in the page body with no matching rule.

## Class names avoid three substrings

Same rule as every other landing page here: no page-scoped class may contain `section`, `container` or
`block`, because Kajabi's `!important` resets match on a substring. Every class is prefixed `tsgr-`.
`.snooze-footer-clean` and `.sf-*` are the shared footer sync source and are not renamed.

## Paste steps

1. **Custom CSS.** Settings, Custom CSS, paste `travel-sleep-guide-ready.css` whole.
2. **Page body.** Paste `travel-sleep-guide-ready.html` into the Custom Code block. Fragment only.
3. **noindex.** Already set by `update_landing_page`. Confirm by curl.
4. **Publish.**
5. **Only then** set this page as `thank_you_page_id` on form 2149700924, because a thank-you page that
   is not live is not a destination.

Paste mechanics: `scripts/emit_paste_js.py`, never a hand-transcribed paste.

## Tracking

This page fires nothing. It sits behind a single-opt-in form, and the conversion signal belongs on the
form submission, not on a second push from this page.

## QA checklist

- [ ] View source: wrapper is `<div id="travel-sleep-guide-ready-page">`, never `<body id>`
- [ ] Exactly one `<title>` and one `<body>` in the served HTML
- [ ] noindex confirmed by `curl`
- [ ] `getComputedStyle`: `h1` in `"Playfair Display", serif`, `.tsgr-band` padding-top `48px` (`36px`
      under 768px), `a.btn` background `rgb(244, 51, 87)` with 50px radius, `.tsgr-trial-note` 14.4px in
      `rgb(100, 116, 139)`
- [ ] The download button opens the R2 URL directly, with no session, and the served bytes sha256 to the
      value above
- [ ] The preview iframe renders the PDF
- [ ] Trial CTA present with the approved disclosure adjacent, and no price
- [ ] Footer renders styled: navy background, white text, `.sf-grid` in columns
