# Camp support finder

**Status: paused on October 28, 2026.** Kade found the finder too complex. Preserve this draft and revisit simplification only after the VSL is filmed and created. No further development or activation is scheduled.

The five-question finder gives a support-format recommendation, an existing Sally resource, questions for a coach and a downloadable or printable preparation summary with a blank sleep log. The recommendation is visible without email capture. No sleep or feeding intervention is generated.

## Connections

- [Kajabi draft page: 2152355854](https://app.kajabi.com/admin/landing_pages/2152355854/edit)
- [Design editor: 2168014017](https://app.kajabi.com/admin/themes/2168014017/settings/edit)
- [Summary-request form: 2149767172](https://app.kajabi.com/admin/forms/2149767172/edit)
- [Delivery automation: 1300700](https://app.kajabi.com/admin/workflows/1300700/edit)

The page uses Kajabi's native form embed, including its authentic submission token and reCAPTCHA. No credential, proxy endpoint or custom server handles lead data. `custom_17` through `custom_21` hold the five selected categories, `custom_22` holds the plain-text summary, `custom_23` the suggested route, `custom_24` the resource key and `custom_25` optional permission for future sleep tips and Snooze updates. Name and email are the only required capture fields. No infant name, date of birth, medical details or free-text health history is requested. Qualification means support preference, timing and broad age eligibility; it is not a clinical suitability decision.

Email delivery remains inactive. `emailDeliveryActive: false` prevents capture submissions in this review revision and labels the native submit button accordingly. The automation and its email node are drafts, with no enrollments. This prevents collecting requests that the draft cannot yet fulfil. The form is not attached to any other page or existing automation. No contacts were submitted and no emails were sent during verification.

The delivery draft uses escaped `custom_22` text plus a fixed allowlist of resource links selected with `custom_24`. There is no AI-generated email at send time. The marketing checkbox is unchecked and optional. No marketing sequence is connected. Future marketing permission is recorded independently from requesting the summary; do not use form submission alone as permission for marketing.

## Resources

All resource URLs are in `config.json`. The public Sally pages cover newborn, 3 to 4 month, 5 to 12 month and toddler support, bedtime battles, night wakings, early rising and the Snooze Method. The nap route for 6 to 12 months uses the existing free catnapping guide at https://tscmedia.khorus.ai/guides/free-catnapping-guide.pdf . These existing public destinations returned HTTP 200 on October 28, 2026. Their advice is linked rather than rewritten. The blank log contains observation headings only, with no target schedule or intervention. No paid resource entitlement is granted.

## Build and verification

Build from the repository root with `python3 apps/snooze-website/src/camp-vsl/build.py`. The generator replaces the source page's finder and script markers using these sidecars; the deployment block stays self-contained apart from Kajabi's official form embed. Run `node apps/snooze-website/src/camp-vsl/support-finder/test.cjs` for the routing invariants.

Verified all 1,800 answer combinations, six age groups, all five support routes, input validation, resource selection, result completeness and the draft no-send guard. Browser checks covered result-before-email access, back/change answers, field mapping into the real Kajabi embed, unchecked optional permission, a complete downloaded summary/log and no 320px horizontal overflow. A focused axe scan reported zero violations and 26 passes. The printed result has two pages: summary and blank log. JavaScript syntax, placeholders, environment validation and scoped whitespace checks passed.

Screenshots and the print preview live under the external media root at `renders/website/camp-support-finder-2026-10-28/`. They are local renders of the deployment package, not a signed-in Kajabi visual preview. Actual lead creation, contact-field persistence, email variable resolution and delivered content are not claimed as verified; no test contact or inbox send was authorised.

## Release checks

Kade reviews the unpublished page, result copy, resource mapping and email draft. Before public use: check the signed-in Kajabi preview; confirm form opt-in settings and any account-wide automations respect the separate marketing permission; test capture and delivery using an explicitly approved recipient; verify existing-contact and unsubscribed-contact behavior; then approve the email node/automation activation and change `emailDeliveryActive` to true in the same release. Current form-submitted workflows may run once per contact, and contact custom fields store the latest answer set. Confirm repeat-request and concurrent-update behavior before promising repeated fulfilment. Do not enrol no-consent requests into marketing or reset existing subscription choices.

Sally's new recording is still pending. The short review video is unchanged. Publication, paid traffic and budget changes remain separate decisions.

## Saved draft revision

Release `website-v1.6.27`, commit `bd190aefb`, saved to Kajabi at `2026-10-28T06:25:39Z`. Fresh readback matched all 99,245 characters of the block. Page state remained draft with null publication date and hidden search metadata. Rollback is the preserved `kajabi-deployment/_live-preimages/camp-snooze-coaching/2026-10-28-before-support-finder.json` settings, restored to the same theme while the page stays unpublished. Leave the new form and workflow unused; they do not need to be deleted for a rollback.
