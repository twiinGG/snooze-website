# Day Pass - Cold-Ads Thank-You Page

**Purpose:** Dedicated thank-you page for the cold-ads Day Pass funnel. Slug `/day-pass/from-our-ads/thanks`. The visitor has just submitted the signup form on the cold-ads landing page (`apps/snooze-website/kajabi-deployment/pages/landing/day-pass-paidads/`) and arrives here after the n8n webhook accepts the signup.

**Source:** Canonical paste pack in `docs/projects/day-pass/09-landing-page-implementation.md` section 5a (thank-you header). The question-capture form from section 5b is intentionally omitted; see "What's different" below.

**Related PRD:** `docs/projects/paid-media-and-dual-currency-v1/00-prd.md` §5.3.

**Related folder:** `apps/snooze-website/kajabi-deployment/pages/landing/day-pass-paidads/` (the cold-ads landing page that redirects here).

## What's different from the canonical thank-you page

The canonical pack assumes a warm visitor who arrived via an event anchor. The thank-you page there asks the visitor to send a question for the live session, because there is a live session to send a question for.

Cold-ad clickers arrive with no event context. There is no live session. There is no host taking questions. A question-capture form on a cold-ads thank-you page makes no sense, per the cold-ads landing README:

> No question prompt makes sense without an event, so the cold-ads thank-you page should drop the question form and replace it with onboarding copy that points straight to the library.

So this page:

- **Keeps the canonical thank-you header** (section 5a of the canonical pack), with the access-window confirmation copy.
- **Drops the question-capture form** (section 5b is not used).
- **Replaces it with onboarding copy** pointing the visitor straight to their library and explaining what to do next.
- **Reads `currency_preference`** from the query string or localStorage in case future iterations add currency-aware copy. The current copy is currency-neutral (the Day Pass is free), so no pricing string is rendered. The hook is present for the next iteration.

## V1 deployment status

Per the cold-ads landing README:

> For V1 launch, the cold-ads landing redirects to the canonical `/day-pass/thanks` fallback. That page exists and works. The cold-ads thank-you page is a Wave 1 polish, not a Wave 0b launch blocker.

V1 cold-ads visitors land on `/day-pass/thanks`, not on this page. To activate this page, change the redirect in `apps/snooze-website/kajabi-deployment/pages/landing/day-pass-paidads/index.html` (and its `script.js` twin) from `/day-pass/thanks` to `/day-pass/from-our-ads/thanks` after publishing this page in Kajabi.

This folder is the Wave 1 prep so the swap is a one-line change when the operator is ready.

## File list

| File | Purpose |
|---|---|
| `README.md` | This file |
| `index.html` | Full Kajabi paste pack. Paste into a single Kajabi Custom Code section on the page at slug `/day-pass/from-our-ads/thanks`. Inline styles only; no theme CSS dependency. |

## Pre-paste checklist

Before pasting `index.html` into Kajabi, confirm:

| Placeholder or merge | Where it appears | What to put there |
|---|---|---|
| `{{first_name}}` | Heading and library button | Pass via URL query parameter from the signup redirect, or use a Kajabi merge tag if available |
| `{{access_url}}` | Library button | Day Pass library URL for this contact; pass via URL query parameter or Kajabi merge tag |
| `{{expires_at_local}}` | Confirmation copy | When the pass expires, in local time; pass via URL query parameter or Kajabi merge tag |
| `{{support_email}}` | Help line | Sally's support email |

The `currency_preference` hook reads from `?currency=usd` or `?currency=aud` on the URL, or from `localStorage.snooze_currency_preference`. V1 makes no use of the value; the hook is present for the next iteration.

## Currency

The page is currency-neutral. The Day Pass itself is free. If a future iteration adds pricing copy (for example a member-only rate teaser for Snooze Access), use the helper at `apps/snooze-website/kajabi-deployment/global/js/currency-toggle.js` and follow the dual-currency rules in `docs/projects/paid-media-and-dual-currency-v1/00-prd.md` §5.3.

## CSS deployment surface

Per `apps/snooze-website/AGENTS.md` §5, the paste pack is self-contained. It uses inline styles only and does not depend on `snooze-unified-theme.css`. A System Initialization block for `#day-pass-thanks-page` needs adding to `snooze-unified-theme.css` IF the operator chooses to integrate with theme styles. The paste pack is self-contained and does NOT require it for V1.

The wrapper ID is `<div id="day-pass-thanks-page">`. If a System Initialization block is added later, register the wrapper in `apps/snooze-website/docs/technical/CSS-STABILIZATION-BRIEF.md` at the same time.

## QA

When the cold-ads thank-you page goes live (the moment the redirect is flipped from `/day-pass/thanks` to `/day-pass/from-our-ads/thanks`):

1. Submit the cold-ads landing form with a test email; confirm the redirect lands on `/day-pass/from-our-ads/thanks` with the expected query parameters.
2. Confirm `{{first_name}}`, `{{access_url}}`, `{{expires_at_local}}` resolve to real values, not literal merge tags.
3. Confirm the "Open my library" button hits the correct Day Pass library URL.
4. Mobile viewport at 390px; confirm the page stacks cleanly and the button is large enough to tap.
5. Confirm there is no question form on the page (the absence is intentional and is the entire point of this variant).

## Deployment surface rules

Per `apps/snooze-website/AGENTS.md` and root `AGENTS.md` §6:

- This is a landing page, not a course lesson or email. Inline styles allowed without `!important`.
- Round-trip rule (root `AGENTS.md` §9): any operator-side Kajabi edit must come back to this folder before next deploy.
- Tag before deploy: `website-v{X.Y.Z}`.
