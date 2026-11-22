# Camp landing-page session closeout

Owner: Kade. Review date: November 09, 2026. This closes the final VSL deployment and the screenshot/Sally-directed revisions in this conversation. The final public code release is `website-v1.6.46`; this closeout changes documentation only.

## Surfaces

| Surface | Public page | Admin |
| --- | --- | --- |
| Main Camp | [camp-snooze-sleep-coaching](https://www.joinsnooze.com/camp-snooze-sleep-coaching) | [page 2151771543](https://app.kajabi.com/admin/landing_pages/2151771543/edit), [theme 2164288957](https://app.kajabi.com/admin/themes/2164288957/settings/edit) |
| New VSL | [camp-snooze-coaching](https://www.joinsnooze.com/camp-snooze-coaching) | [page 2152355854](https://app.kajabi.com/admin/landing_pages/2152355854/edit), [theme 2168014017](https://app.kajabi.com/admin/themes/2168014017/settings/edit) |
| Hidden staging | Used temporarily for preview, then restored | [page 2152257408](https://app.kajabi.com/admin/landing_pages/2152257408/edit), [theme 2167447291](https://app.kajabi.com/admin/themes/2167447291/settings/edit) |
| Final VSL | 7:35, main-v07, player ud1nugmerp | [Kajabi media 5221719](https://app.kajabi.com/admin/media_library/assets/5221719) |

## Completed changes

The main page has the final Kajabi-hosted VSL directly below scrolling testimonials, readable testimonial copy and five stars. Screenshot-marked copy was removed, age wording is 5 months plus and Snooze Membership replaces Snooze access. The service comparison shows the shared plan, coaching, log reviews and adjustments, distinguishes delivery, adds Camper encouragement, uses ticks and places dynamic prices at the bottom. The reward heading has the requested line break. Intake display omits the Friday line and closing time while retaining Melbourne date rollover, countdown and checkout behavior. The closing section uses Spots strictly limited and See You at Roll Call!, with mobile padding to clear the fixed booking bar. See [main release log](../camp-snooze/camp-snooze-v2-luxury/RELEASE-2026-11-09.md).

The newer page has the final VSL and direct dates/pricing CTA. The paused finder and capture form are absent. Sally’s approved edits add readable labels, falling crescents, sharper problem statements, the missing it, detailed intake wording and pre-Camp onboarding modules. Membership timing and cancellation copy uses Kade’s confirmed wording. Reviews are unified into single paragraphs with highlighted passages and Google attribution. Jade’s before-and-after review opens the proof section. The marked hero badge and Welcome to prefix are removed, the hero uses Kade’s exact 100+ families sentence and the opening disclaimer is removed. See [Sally release log](SALLY-FEEDBACK-RELEASE-2026-11-09.md).

Both pages reference the same Kajabi upload, including English captions. The library’s Locations list does not include the custom embed, although the player IDs match. This is documented in the README so the asset is not mistaken for unused media. No ad settings, budgets, canonical prices, billing, entitlements, contacts or member messages changed.

## Review and validation

- All seven existing Camp behavior suites pass: capacity bands, safe fallback, checkout routes, currency attribution, hero dates, single intake and waitlist target. The changed date assertions cover Melbourne rollover while omitting display-time labels.
- Both deployment directories pass the placeholder scanner. Inline page JavaScript and main-page JavaScript pass Node syntax checks. The new payload matches its source exactly and renders one section with no lead form.
- Gitleaks scanned all 21 session commits before closeout and found no leaks. All pre-commit hooks pass; none were bypassed.
- Fresh Kajabi readback matches both source code blocks and the main CSS/JS. Fresh anonymous HTTP 200 readback has zero missing source lines for all four deployed files, after whitespace and Cloudflare email-link normalization. See the final readback receipt.
- Browser verification across the session covered desktop, tablet and 375/390px phone widths. The final opening review, 34 consistent review paragraphs, highlights, logos, review expansion, membership FAQ and revised hero were inspected live. Main-page closing clearance at maximum mobile scroll is about 69px above the fixed bar. Temporary viewport overrides were restored.
- Final VSL sampled playback and English captions were checked earlier in the session. The master was not re-edited during page revisions. This was sampled playback, not a new uninterrupted watch of the full film.

No code defects remain from this review. The stale new-page README was replaced: it no longer instructs operators to rebuild with the obsolete short-video/finder generator. Source and historical initial receipts are distinguished from final verification. The main README now links to this closeout and the release log.

## Git integration and boundaries

The original deployment branch contains earlier, unrelated identity-schema commits. The merge branch `codex/camp-vsl-release-merge-20261109` starts at refreshed origin/main and cherry-picks only the 21 Camp session commits. Its diff contains only Camp deployment artifacts, tests and release documentation. Original deployment tags and branch history remain available as provenance; cherry-picking changes commit IDs without changing page content. No unrelated dirty work in the primary checkout is staged or reset. GitHub CI and merge status are recorded in the PR, not inferred from local validation.

## Recovery

For the new page, restore a prior tagged page/payload pair for a small rollback. The tracked November 09 preimage contains the full pre-session draft and should only be used for a full launch rollback with the page returned to draft. Main full-theme preimages are private under `/Users/kadegreenland/.codex/artifacts/camp-main-2026-11-09/`; do not commit those raw settings because they contain embedded integration configuration. The staged public source files remain version-controlled. Keep the current media asset during any text rollback.

The per-revision temporary new-page preimages in `/tmp/camp-sally-20261109/` are supplementary operator evidence, not durable rollback dependencies. The final content and previous content versions are recoverable from Git.
