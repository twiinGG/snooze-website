# Camp Snooze confirm page

This is the shared post-purchase destination for the Camp Snooze offers. A family has just paid; the page's one job is a single button that confirms which fortnightly cohort they are in, followed by three things to do this week. It is a Kajabi Landing Page with its own theme. It does not inherit the website theme CSS or JavaScript.

## Kajabi targets

Create one blank Landing Page named `Camp Snooze Confirm`, then use these whole-field paste targets:

| File | Kajabi target |
|---|---|
| `camp-confirm-page.html` | The landing page's single full-width, flush Custom Code block |
| `camp-confirm-page.css` | That landing page theme's Custom CSS field |
| `camp-confirm-page.js` | That landing page theme's Custom JavaScript field |

Set the section to full width, make the code block flush and set all section padding to zero. Remove or hide the landing theme's default header and footer because the page includes its own minimal header and support footer.

Use the metadata in `page-metadata.md`. After publishing, set Camp Snooze's offer thank-you page(s) to redirect to this landing page's URL.

Do not paste these files into the offer-level custom thank-you code field. That field does not provide the landing-page CSS and JavaScript surfaces this page requires.

### On the System Initialization rule in the app's `AGENTS.md`

That rule governs new page wrapper IDs added under the shared website theme (`theme-custom-code.css`, scoped to `#home-page`). This page is not part of that shared theme: like `7-day-trial-thank-you` and `snooze-membership-welcome`, it is a standalone Landing Page with its own theme, so `camp-confirm-page.css` follows those two pages' pattern instead: a complete, self-contained reset and token set declared under its own root id (`#sn-cc-page`), with nothing borrowed from and nothing leaking into the shared website theme.

## Behavior contract

Read from `camp-confirm-page.js`:

- The soonest camp whose state is `open`, `filling` or `low` is the pre-selected default (`pickDefault`). `full` and `closed` camps are never offered.
- `?cohort=N` on the URL overrides the default, but only when that camp is one of the confirmable states above; otherwise the soonest confirmable camp is used instead. This is the first time `?cohort=` survives a transaction; it has been appended to checkout URLs and dropped by Kajabi since the picker shipped.
- The "I want a different camp" picker (`.sn-cc-switch`) only lists camps in a confirmable state; camps that have filled or already started are not listed.
- With no JavaScript, the page shows `#sn-cc-confirm-noscript`, an email fallback (reply to the confirmation email), rather than a dead button.
- With no resolvable contact id, `renderReady` sends the buyer to `#sn-cc-confirm-signin` instead of the confirm button: sign in (or set a password) at `https://www.joinsnooze.com/login`, or email support. The same signin state is shown if a confirm attempt comes back `401` or `404`, meaning the session the page read was not one Kajabi still recognises.
- Confirmation is re-checked server side: the Edge Function endpoint returns `409` if the camp filled between page load and the click, so a stale page cannot overbook a camp past capacity.
- `dataLayer` events pushed, all with `surface: 'camp_confirm_page'`: `camp_confirm_no_open_cohort`, `camp_confirm_ready`, `camp_confirm_feed_failed`, `camp_confirm_success`, `camp_confirm_full`, `camp_confirm_identity_failed`, `camp_confirm_failed`.
- This page depends on a **checkout setting**, not on anything of its own: "Require new customers to create password at checkout" on the camp offers. That is what puts a fresh buyer in a signed-in session before they land here. Without it, a new buyer arrives signed out and sees the signin state instead of the confirm button on every first visit.
- **That setting is OFF on all six camp offers as of August 21, 2026.** Read live from each offer's Settings tab (`offer_collect_password_checkbox`) on `2150884129`, `2150946767`, `2150947919`, `2151264520`, `2151114090` and `2151134284`. Kade decided to turn it on and it has not been done, so **right now every brand-new buyer would see the signin state.** Check this before concluding the page is broken. It is a toggle on six offers, not a code change.

## Buyer identity

`resolveIdentity()` tries these, in this order:

1. `window.SN_CAMP_CONTACT_ID`, a page-level override the page's own custom-code block can set.
2. `window.Kajabi.currentSiteUser`, the same site-wide global and the same `type === 'Member'` test already shipped on `pages/landing/toddler-toolkit-sample-ready/toddler-toolkit-sample-ready.html` and `pages/landing/newborn-guide-preview-ready/newborn-guide-preview-ready.html`, and documented in `docs/technical/LEAD-MAGNET-FORM-PLUS-GRANT.md`. Only a `type === 'Member'` carries a usable `contactId`; a `Guest` or a Kajabi staff `User` is still a real, distinguishable answer (`kajabi_site_user_guest`, `kajabi_site_user_user`), not a failure to resolve.
3. `?contact_id=` / `?kajabi_contact_id=` on the URL, for testing only. It is last, not first, because Kajabi does not put an identifying parameter on a paid post-purchase destination: 180 days of GA4 on this site shows every paid confirmation path as a bare path with no query string.
4. `unknown`: give up. No contact id, no session.

There is no email fallback, and deliberately so. Kajabi's REST API cannot resolve an email to a contact: `GET /v1/contacts?filter[email]=<addr>` returns HTTP 200 and the newest 25 contacts, ignoring the filter, while honouring `page[size]` in the same request (tested August 21, 2026). A typed email would therefore book a seat that never receives its access. `SnoozeUserDetection` (the site's other member-detection helper, which infers membership from a `/login` link in the site nav) is also not used here: a landing page carries its own theme with no site nav, so it would call every visitor new. When mechanism 2 does not resolve to a `Member`, the page sends the buyer to sign in (`#sn-cc-confirm-signin`) rather than asking them to retype anything.

## Validation

Run from the repository root:

```bash
node --check apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-confirm/camp-confirm-page.js
node apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-confirm/__tests__/camp-confirm-page.test.js
npx --yes htmlhint --rules tag-pair,attr-no-duplication,id-unique,src-not-empty apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-confirm/camp-confirm-page.html
npx --yes stylelint --config apps/snooze-website/scripts/stylelint-kajabi.json apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-confirm/camp-confirm-page.css
```

All four passed at the time of writing (`node --check`: silent success; test file: 46 passed, 0 failed; htmlhint: 0 errors; stylelint: 0 problems).

Preview logged in at 390px, 768px and 1440px before connecting an offer to this page.

## Deferred decisions this page ships with

- **Welcome video.** Kade deferred who records it (Sally or Bec or both). The section (`#sn-cc-video-section`) ships `hidden`. To go live: upload the video to the Kajabi media library, replace the placeholder comment inside `#sn-cc-video-frame` with the embed, and remove `hidden` from the section. Nothing else changes.
- **Support address inconsistency.** This page uses `support@joinsnooze.com` throughout, per Kade's ruling on August 21, 2026. The two sibling thank-you pages (`7-day-trial-thank-you`, `snooze-membership-welcome`) use `support@sleepconcierge.com.au`. This is recorded, not corrected; do not change either page to match the other without a separate ruling.
