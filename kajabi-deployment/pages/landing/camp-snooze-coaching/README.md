# Camp Snooze VSL landing page

Owner: Kade. Published and verified November 09, 2026 (`website-v1.6.46`). November 22, 2026 revision (own pricing, local call times, clip, three-file structure) is `website-v1.6.50`, pending deploy.

- [Live page](https://www.joinsnooze.com/camp-snooze-coaching)
- [Page settings 2152355854](https://app.kajabi.com/admin/landing_pages/2152355854/edit)
- [Theme 2168014017](https://app.kajabi.com/admin/themes/2168014017/settings/edit)
- [Main booking page](https://www.joinsnooze.com/camp-snooze-sleep-coaching)

## Source and deployment

Current release: `website-v1.6.50` (pending deploy). Content release at the November 9 publication: `website-v1.6.46`.

Three paste targets, all in this folder:

- `camp-snooze-coaching.css`: the page theme's Custom CSS field (all styles).
- `camp-snooze-coaching.js`: the page theme's Custom JS field (all JavaScript, one IIFE, includes `pricing/pricing.js` verbatim and the 29 second clip captions).
- `index.html`: the single code block, markup only. No style or script tags. Font links and the inline footer stay.

`theme-payload.json` carries all three (`custom_css`, `custom_js`, and the code block under `sections.camp-vsl-1792800000.blocks.camp-code.settings.code`). After editing any of the three files, regenerate it with `python3 make_payload.py`; `python3 make_payload.py --check` fails if it has drifted. Never edit the payload by hand. The page renders one code section, with native header and footer suppressed to avoid duplicates.

The page owns its dates and pricing (`#camp-pricing`): live cohort feed, per-cohort checkout, AUD/USD by visitor timezone with a toggle, attribution passthrough, and the daily call shown in the visitor's timezone with Melbourne alongside. Booking buttons scroll to that section instead of the main booking page. Prices, feed, key, storage key and checkout bases are asserted equal to the old Camp page (`../camp-snooze/camp-snooze-v2-luxury/`).

The retired generator and draft source in `apps/snooze-website/src/camp-vsl/` are not used. **Do not run `build.py` over this page.** Edit the files here. Reasoning, ported functions and Kade's rulings: `notes/index.html.NOTES.md`. The paused support finder has no rendered form or runtime; this page collects no leads.

Follow `apps/snooze-website/docs/DEPLOYMENT-CHECKLIST.md` and `docs/technical/KAJABI-SURFACE-CODE-SETUP.md` within the website app. Changes to a published Kajabi theme take effect immediately. Read current live settings first, preserve a private preimage, validate in hidden Kajabi staging, commit/tag, deploy and compare persisted plus anonymous rendered content. Restore temporary staging code after review.

## Tests and preview

Run from the repository root:

- `node apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-coaching/pricing/pricing.test.cjs` (pricing logic, built files, payload sync, copy rulings)
- `python3 apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-coaching/make_payload.py --check`
- `node scripts/kajabi/extract-comments.mjs --check <file>` for each `.css`, `.js` and `.html` here (all must be comment-free)
- `node apps/snooze-website/src/camp-vsl/support-finder/test.cjs` and the seven tests in `../camp-snooze/camp-snooze-v2-luxury/tests/`

Preview: `python3 apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-coaching/preview.py` then open http://127.0.0.1:4328/?js=foot (CSS in head, markup, JS in footer, as Kajabi renders it) or `?js=head`.

## Video hosting

The final master is `camp-main-v07.mp4`, 226,912,138 bytes, 455.12 seconds (7:35). SHA-256: `d487f90a4f526bbfb8419babe80b6c0b35b0472fa4692e4b4506f047f1c627a9`.

[Kajabi Media Library asset 5221719](https://app.kajabi.com/admin/media_library/assets/5221719), now named Camp Snooze VSL_2611, owns this upload. Both Camp pages use its Kajabi-managed Wistia player `ud1nugmerp`; this page's JS injects the Wistia script because the markup block carries no script tags. English captions were uploaded from the final SRT. No separate Wistia account was created. Kajabi uses Wistia for video encoding and delivery: [Kajabi documentation](https://help.kajabi.com/en/articles/17174547-upload-videos-to-course-lessons).

The library asset currently reports zero Locations, while its player ID exactly matches the live page. The custom-code embed is not appearing in that native usage list. Do not treat that asset as unused or delete it based on Locations. No native placement was added solely to make the counter change.

## Approved content

The hero uses Kade’s exact 100+ families wording. Eligibility remains 5 months plus in the body/FAQ. Labels and review copy use readable DM Sans. Decorative crescents respect reduced-motion preferences. Onboarding copy tells parents to watch the modules before Camp starts. Qualifying and disclaimer lines were removed on November 22 (terms and conditions cover them).

The included Snooze Membership month starts on the Friday before Camp and covers the two-week Camp. It then continues at the discounted rate; parents can cancel ongoing membership anytime. Kade explicitly confirmed this wording. Prices, offers, entitlement and billing settings were not changed.

There are 34 review placements: the opening Jade excerpt, two supporting excerpts and the 31-review wall. Each uses one paragraph, consistent upright typography, an in-paragraph highlight, attribution and the Google logo. The opening disclaimer was removed at Kade’s request. Review wording remains excerpted from the existing Google review corpus. The final VSL remained unchanged during the copy revisions.

## Verification and rollback

See [session closeout](RELEASE-CLOSEOUT-2026-11-09.md), [Sally feedback log](SALLY-FEEDBACK-RELEASE-2026-11-09.md) and [final readback receipt](final-readback-2026-11-09.json). `release-receipt-2026-11-09.json` records the initial VSL publication, not the final copy revision. Earlier October draft states are historical.

For a recent content rollback, restore the three files and `theme-payload.json` from the chosen prior `website-v*` tag (before `website-v1.6.50` the code lived inline in `index.html` with blank Custom CSS and JS, so also clear those two theme fields), validate and redeploy. The full pre-session draft is preserved in `../../../_live-preimages/camp-snooze-coaching/2026-11-09-theme.json`; restoring it also restores the paused draft content, so return the page to draft if rolling back the full launch. Preserve the media asset and do not change shared website themes.
