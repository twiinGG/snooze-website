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

The old page's second block (`block-camp-inquiry-261109`, the inline enquiry form) no longer appears in the live HTML (checked November 23, 2026). The page uses Kajabi's native header (same as v1, set in the page builder). The CSS hides only the native footer (`#section-footer`); the page supplies its own footer inline.

Pastes go through `apps/snooze-website/scripts/emit_paste_js.py` (token-safe, verify by length and hash), or by manual copy and paste. After saving, run a cache-busted curl of the public URL and check for `camp-vsl-page`, `CampPricing` and `fast.wistia.com` in the live HTML. Then check in a browser that the video plays, the fit check advances and cohort pricing loads.

## Source

These are the only paste targets. Edit these files directly; there is no generator. Folder renamed from `camp-snooze-program/` on November 22, 2026; v1 is `../camp-snooze-landing-v1/`. Content matches the reconciled release `7633b9142c` on branch `merge/origin-main-2026-11-22` (the November 9 published page plus the November 22 pricing, local call times and VSL changes), with files renamed to this page.

- `camp-snooze-landing-v2.js` is the only JavaScript, pricing included. There is no separate pricing file.
- `notes/camp-snooze-landing-v2.html.NOTES.md` covers the ported functions and Kade's copy rulings.
- `src/camp-vsl/` and the generator `build.py` are retired. Do not use them.

## Tests and preview

- `node apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-landing-v2/tests/camp-snooze-landing-v2.test.cjs`
- `node scripts/kajabi/extract-comments.mjs --check <file>` for each paste file (all must be comment-free)
- Preview: `python3 apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-landing-v2/preview.py`, then open http://127.0.0.1:4328/?js=foot

Test state (November 23, 2026): 46 tests pass on `main`.

## Camp stories section (CFB-007 Phase 4, live November 23, 2026)

`<section id="camp-stories">` sits immediately before `#camp-wall`. CSS selectors are prefixed `.cs-`, the JS is `startCampStories()` inside the existing IIFE, and the analytics push is `dataLayer` `camp_story_play` (`story`, `surface: camp_snooze_program`), sent on the first play of each card.

| Order | Story | Kajabi media id | Wistia id | Poster |
|---|---|---|---|---|
| 1 | Bec K. (Camp #12) | 5664495 | `3dmlbvluc1` | `bec-k-poster.jpg` |
| 2 | Penny C. (Camp #19) | 5662387 | `ulv9zvm4mu` | `penny-c-poster.jpg` |
| 3 | Alicia E. (Camp #19) | 5662384 | `ta6pdclyxs` | `alicia-e-poster.jpg` |
| 4 | Chelsi B. (Camp #19) | 5662386 | `mkvfx9ejzr` | `chelsi-b-poster.jpg` |
| 5 | Chantelle C. (Camp #19) | 5662385 | `acv79nzthp` | `chantelle-c-poster.jpg` |

- Posters: `https://tscmedia.khorus.ai/website/camp-stories/2026-11-23b/<slug>-poster.jpg` (R2 `postiz-media`). Each is set as an `<img class="cs-poster">` and as Wistia `stillUrl`. Source renders are in the media library `renders/testimonial-series-2026-11/posters-2026-11-23b/`; the template is `docs/projects/camp-full-funnel-buildout/4_working/camp-stories-rail-2026-11/posters/`. New poster revision: render to a new dated folder, upload to R2 first, then change the URLs.
- Behaviour: Wistia embeds are created only within 600 px of the viewport and reuse the page's single `E-v1.js`. Playing a story pauses the others and the VSL; playing the VSL pauses the stories. On mobile the stories form a vertical stack (2 shown, then "View more"); on desktop, a horizontal track with arrows.
- Adding a story: upload the episode to the Media Library, read its Wistia id from the admin asset page and prove it by size (see `apps/snooze-website/AGENTS.md`, Media Library videos), render a poster, upload it, add a `<figure class="cs-card">`, then update the test's id array and order.
- Run record: `docs/projects/camp-full-funnel-buildout/4_working/camp-stories-rail-2026-11/RUN-LOG.md`.
