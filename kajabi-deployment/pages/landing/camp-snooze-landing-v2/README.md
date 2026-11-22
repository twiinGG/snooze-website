# Camp Snooze landing page v2 (/camp-snooze-program)

- Live page: https://www.joinsnooze.com/camp-snooze-program
- [Theme customizer 2168383361](https://app.kajabi.com/admin/themes/2168383361/settings/edit) (Encore Page theme)

Kade duplicated the old Camp booking page (/camp-snooze-sleep-coaching) in Kajabi on November 22, 2026 to host the new Camp VSL page. That replaces /camp-snooze-coaching: its Nova theme (2168014017) prints the Custom JS field as literal text (`{ { settings.custom_js; } }`), so the page's JavaScript never ran and the video, fit check and pricing failed. Encore Page renders both Custom CSS and Custom JS ("Custom CSS/JS Added Via Theme Settings" in the public HTML), so the three-file shape works here.

## Paste map

| File | Kajabi field |
| --- | --- |
| `camp-snooze-landing-v2.css` | Theme settings, **Custom CSS** (replace everything) |
| `camp-snooze-landing-v2.js` | Theme settings, **Custom JS** (replace everything) |
| `camp-snooze-landing-v2.html` | The page's main custom-code block, `block-1767342511785_0` in section `1767342511785` (replace everything; markup only, no style or script tags) |

The duplicate still carries the old page's second block in that section, `block-camp-inquiry-261109` (the old inline enquiry form). It renders below the new page's inline footer, so delete or hide it. The CSS hides the native header and footer (`#section-header`, `#section-footer`); the page supplies its own footer inline.

Pastes go through `apps/snooze-website/scripts/emit_paste_js.py` (token-safe, verify by length and hash), or by manual copy and paste. After saving, run a cache-busted curl of the public URL and check for `camp-vsl-page`, `CampPricing` and `fast.wistia.com` in the live HTML. Then check in a browser that the video plays, the fit check advances and cohort pricing loads.

## Source

These are the only paste targets. Edit these files directly; there is no generator. Folder renamed from `camp-snooze-program/` on November 22, 2026; v1 is `../camp-snooze-landing-v1/`. Content matches the reconciled release `7633b9142c` on branch `merge/origin-main-2026-11-22` (the November 9 published page plus the November 22 pricing, local call times and VSL changes), with files renamed to this page.

- `camp-snooze-landing-v2.js` is the only JavaScript, pricing included. There is no separate pricing file.
- `notes/index.html.NOTES.md` covers the ported functions and Kade's copy rulings.
- `src/camp-vsl/` and the generator `build.py` are retired. Do not use them.

## Tests and preview

- `node apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-landing-v2/tests/camp-snooze-landing-v2.test.cjs`
- `node scripts/kajabi/extract-comments.mjs --check <file>` for each paste file (all must be comment-free)
- Preview: `python3 apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-landing-v2/preview.py`, then open http://127.0.0.1:4328/?js=foot

Known test state on `main` (November 22, 2026): 34 of 35 pass. The price-parity test fails because `main`'s copy of the old page source (`../camp-snooze-landing-v1/`) predates PR #118 and lacks the `data-period-*` attributes that the live old page and this page use. It passes once the merge branch lands on `main`.
