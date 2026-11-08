# Camp Snooze VSL landing page

Owner: Kade. Published and verified November 09, 2026. Current content release: `website-v1.6.46`.

- [Live page](https://www.joinsnooze.com/camp-snooze-coaching)
- [Page settings 2152355854](https://app.kajabi.com/admin/landing_pages/2152355854/edit)
- [Theme 2168014017](https://app.kajabi.com/admin/themes/2168014017/settings/edit)
- [Main booking page](https://www.joinsnooze.com/camp-snooze-sleep-coaching)

## Source and deployment

`index.html` is the current, self-contained page: CSS, HTML, VSL embed, review wall and inline footer. `theme-payload.json` contains the same code under `sections.camp-vsl-1792800000.blocks.camp-code.settings.code`. Keep these identical. Top-level custom CSS and JavaScript stay blank. The page renders one code section, with native header/footer suppressed to avoid duplicates.

The generator at `apps/snooze-website/src/camp-vsl/build.py` and its local page/media manifest describe the superseded short-video draft. **Do not run that generator over this release.** It would restore obsolete media and finder markup. Edit the deployed source here and update the matching payload field deterministically. The paused finder has no rendered form or runtime and this page collects no leads. Booking buttons route to the main page’s live dates and pricing.

Follow `apps/snooze-website/docs/DEPLOYMENT-CHECKLIST.md` and `docs/technical/KAJABI-SURFACE-CODE-SETUP.md` within the website app. Changes to a published Kajabi theme take effect immediately. Read current live settings first, preserve a private preimage, validate in hidden Kajabi staging, commit/tag, deploy and compare persisted plus anonymous rendered content. Restore temporary staging code after review.

## Video hosting

The final master is `camp-main-v07.mp4`, 226,912,138 bytes, 455.12 seconds (7:35). SHA-256: `d487f90a4f526bbfb8419babe80b6c0b35b0472fa4692e4b4506f047f1c627a9`.

[Kajabi Media Library asset 5221719](https://app.kajabi.com/admin/media_library/assets/5221719), now named Camp Snooze VSL_2611, owns this upload. Both Camp pages use its Kajabi-managed Wistia player `ud1nugmerp`. English captions were uploaded from the final SRT. No separate Wistia account was created. Kajabi uses Wistia for video encoding and delivery: [Kajabi documentation](https://help.kajabi.com/en/articles/17174547-upload-videos-to-course-lessons).

The library asset currently reports zero Locations, while its player ID exactly matches the live page. The custom-code embed is not appearing in that native usage list. Do not treat that asset as unused or delete it based on Locations. No native placement was added solely to make the counter change.

## Approved content

The hero uses Kade’s exact 100+ families wording. Eligibility remains 5 months plus in the body/FAQ. Labels and review copy use readable DM Sans. Decorative crescents respect reduced-motion preferences. Onboarding copy tells parents to watch the modules before Camp starts.

The included Snooze Membership month starts on the Friday before Camp and covers the two-week Camp. It then continues at the discounted rate; parents can cancel ongoing membership anytime. Kade explicitly confirmed this wording. Prices, offers, entitlement and billing settings were not changed.

There are 34 review placements: the opening Jade excerpt, two supporting excerpts and the 31-review wall. Each uses one paragraph, consistent upright typography, an in-paragraph highlight, attribution and the Google logo. The opening disclaimer was removed at Kade’s request. Review wording remains excerpted from the existing Google review corpus. The final VSL remained unchanged during the copy revisions.

## Verification and rollback

See [session closeout](RELEASE-CLOSEOUT-2026-11-09.md), [Sally feedback log](SALLY-FEEDBACK-RELEASE-2026-11-09.md) and [final readback receipt](final-readback-2026-11-09.json). `release-receipt-2026-11-09.json` records the initial VSL publication, not the final copy revision. Earlier October draft states are historical.

For a recent content rollback, restore `index.html` and its matching payload from the chosen prior `website-v*` tag, validate and redeploy the code block. The full pre-session draft is preserved in `../../../_live-preimages/camp-snooze-coaching/2026-11-09-theme.json`; restoring it also restores the paused draft content, so return the page to draft if rolling back the full launch. Preserve the media asset and do not change shared website themes.
