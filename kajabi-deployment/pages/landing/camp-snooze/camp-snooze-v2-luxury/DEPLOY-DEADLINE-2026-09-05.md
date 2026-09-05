# Camp booking deadline correction

Owner: Kade. September 05, 2026. Repository preparation only; no Kajabi write performed.

Payload: [camp-snooze-landing-page-blocks.html](./camp-snooze-landing-page-blocks.html).
SHA-256: `d22292fc4653033bedb09df384cee09eaad7f0ec3f51075145d2a1e71308db52`. Only the footer deadline sentence changes. It now refers readers to the intake card, which reads `checkout_close_at`. CSS, JavaScript, checkout URLs and cohort selection remain as deployed.

Verified Kajabi MCP target: [Welcome to Camp Snooze, page 2151771543](https://app.kajabi.com/admin/landing_pages/2151771543/edit), [theme 2164288957](https://app.kajabi.com/admin/themes/2164288957/settings/edit). Target field: Sections > Full Page > Custom Code. Confirm the exact block in the editor before pasting. Do not paste into theme CSS, JavaScript or the website theme.

The public camp-capacity feed checked September 05, 2026 reports Camp #16 starting September 14, access September 11 and checkout close `2026-09-10T13:59:59+00:00`, Thursday September 10 at 11:59:59pm AEST. Fourteen places remain at capture time. The existing migration derives the close instant from the day before access in Australia/Melbourne. No database change is required.

Related wording checked: both landing variants already say Thursday in the timeline. Friday access, packing-list and refund statements describe separate events. The waitlist variant has no duplicate Friday application-close sentence. The card and checkout retain cohort-driven dates. No one-off September date is added.

## Validation results

- Placeholder scanner: pass for the entire landing directory.
- Environment validator: pass, using the umbrella `/Users/kadegreenland/Snooze-OS/.env` and its anon-key alias. No credentials copied into this package.
- Existing landing tests plus checkout cohort summary: eight pass, including deadline formatting, auto-advance, fallback, attribution and cohort URLs.
- `git diff --check`: pass. Source change is one text line.
- Public preimage: `/tmp/camp-deadline-20260905/live-before.html`. Every original nonblank source line appears after whitespace normalization except one Cloudflare email-protection rewrite; that sentence otherwise matches. The stale footer is present live.
- Mandatory link wrapper attempted with npm-provided linkinator: it returns directory 404 because there is no index.html. Direct payload scan works: eight URLs checked, six return 200, checkout and community URLs return 403. Logs: `/tmp/camp-deadline-20260905/payload-links.log`. Both USD and AUD cohort=16 checkout GETs also return 403. These are unresolved visitor verification checks, not evidence that the URLs are absent. Do not report link validation clean.
- Existing page uses class-scoped Camp styles and has no body wrapper. No new wrapper or stylesheet is introduced.
- No coupon, pricing, form or purchase change. Coupon transaction checks do not apply. No purchase performed.
- Staging, desktop/mobile/tablet visual checks, console checks and live verification remain for the separate Kajabi executor. CI has not been run in this preparation phase.

## Deployment and rollback procedure

1. Review this commit and use release tag `website-v1.6.6` for the corrected payload. Confirm the tag resolves to the correction commit before deployment. Tag is local until explicitly pushed by the release owner.
2. Capture a fresh complete theme settings preimage plus the raw target Custom Code field to a durable `_live-preimages` location before editing. The public HTML capture above proves the public state but is not an editor-field rollback payload. Compare the raw field against the parent commit's HTML; preserve any intervening change in git before proceeding.
3. Complete hidden-page staging and visitor link checks required by [DEPLOYMENT-CHECKLIST.md](../../../../../docs/DEPLOYMENT-CHECKLIST.md). Live theme Save publishes immediately. This phase has not performed staging or live writes.
4. Use authenticated agent-browser via CDP, in-app clicks only. The older README's automatic admin navigation example is superseded by app AGENTS.md. Use `apps/snooze-website/scripts/emit_paste_js.py` with the exact payload path and verified Ace index, confirm matching length/hash, then save once. Do not have a second editor open on this theme.
5. Cache-busted public read-back must contain the new footer once, no old Friday application-close claim and the current feed-driven Thursday card. Normalize whitespace and account specifically for Cloudflare email rewriting. Confirm both cohort=16 checkout links in a visitor browser without purchasing, check desktop/mobile/tablet rendering and console errors. Record results and release tag.
6. On a regression, restore the captured raw field through the same helper, save and verify the preimage. For a source rollback, extract this file from the correction commit's parent with `git show`; do not reset or switch another worker's checkout. Restoring the prior field also restores its stale Friday sentence, so record that explicitly.

Repository HTML correction uses the local website-code path. No canonical-state write or member communication is part of this package. Live deployment remains assigned to the separate executor after origin review.
