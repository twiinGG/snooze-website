# Day Pass - Canonical Landing Page

**Live as draft on Kajabi:** `https://www.joinsnooze.com/day-pass` (page id `2152089948`, theme id `2166436909`). The full paste pack - hero, "What's inside your 24 hours", "How the Day Pass works", "About the event", trust elements, and the signup form + submit script - is embedded as an Encore `code` block on the page via `update_theme_content` on 2026-06-08. All six sections from the canonical pack are present.

Builder URL: `https://app.kajabi.com/admin/themes/2166436909/settings/edit`
Admin URL: `https://app.kajabi.com/admin/landing_pages/2152089948/edit`

**Before publish (Louise / Sally):**

1. Open the admin URL above.
2. Fill these placeholders in the code block (use Find + Replace in the builder):
 - `{{MEMORY_API_HOST}}` - `services/memory-api` base URL, no trailing slash
 - `{{N8N_WEBHOOK_URL}}` - full webhook URL, e.g. `https://n8n.khorus.ai/webhook/day-pass-signup`
 - `{{event_anchor_slug}}` - slug from section 6 of the canonical pack (e.g. `sally_bec_sleep_detectives`)
 - `{{event_anchor_display_name}}`, `{{event_lead_name}}`, `{{event_date_local}}`, `{{event_description}}` - per-event variables
 - `{{privacy_url}}`, `{{TESTIMONIAL_QUOTE}}`, `{{TESTIMONIAL_NAME}}`, `{{TESTIMONIAL_CHILD_AGE}}`
3. Test the happy path, the existing-member path (redirect to `/already-a-member`), and the prior-free-pass path (redirect to `/day-pass/already-used`).
4. Publish from the Kajabi admin Pages tab once Sally approves.

**Purpose:** The standard (non-paid-ads) Day Pass landing page. This is the page warm visitors hit after an event landing, partner channel, or organic referral. Maps to the 4 existing Day Pass offers in Kajabi (Snooze Village Day Pass `2151170163`, Snooze Day Pass `2151173175`, and siblings).

**Source:** Canonical paste pack in `docs/projects/day-pass/09-landing-page-implementation.md` (this folder materialises sections 2 through 5 of that doc as a single paste-ready file).

**Related PRD:** `docs/projects/paid-media-and-dual-currency-v1/00-prd.md` §5.3 (which references the cold-ads variant; this page is its warm-traffic sibling).

## What's in this page

The page contains four content sections (Hero, What's inside your 24 hours, How the Day Pass works, About the event, Trust elements) plus the signup form and submit logic. All copy is locked per section 1 of the canonical pack. The page assumes warm visitor context: an event anchor is named in the hero, the "About the event" section is included, and the form's hidden `source` field is `landing`.

Per-event variants (one per anchor in section 6 of the canonical pack) are produced by duplicating this page in Kajabi and updating:

- The hidden `event_anchor` field value (slug from section 6).
- The page-level placeholders (`{{event_anchor_display_name}}`, `{{event_lead_name}}`, `{{event_date_local}}`, `{{event_description}}`).
- The about-event variant snippet (Sally + Bec, Betsy webinar, or Merry Month).

The signup form script picks the correct per-anchor thank-you slug from a lookup table inside the script.

## File list

| File | Purpose |
|---|---|
| `README.md` | This file |
| `index.html` | Full Kajabi paste pack. Paste each commented section into a separate Kajabi Custom Code section, or paste the whole file into a single Custom Code section. Inline styles only; no theme CSS dependency. |
| `script.js` | Standalone copy of the inline `<script>` block from `index.html`. The version that ships into Kajabi is the inline copy in `index.html`; this file exists for diffing and unit testing. |

## Pre-paste checklist

Before pasting `index.html` into Kajabi, fill these placeholders:

| Placeholder | Where it appears | What to put there |
|---|---|---|
| `{{MEMORY_API_HOST}}` | Signup form script | Base URL of `services/memory-api`, no trailing slash |
| `{{N8N_WEBHOOK_URL}}` | Signup form script | Full n8n webhook URL: `https://<n8n-host>/webhook/day-pass-signup` |
| `{{event_anchor_slug}}` | Hidden `event_anchor` form field | Slug from section 6 of the canonical pack (e.g. `sally_bec_sleep_detectives`) |
| `{{event_anchor_display_name}}` | Hero, About the event | Public name of the event |
| `{{event_lead_name}}` | Hero, bullets, About the event | Who runs the session (e.g. "Sally and Bec") |
| `{{event_date_local}}` | Hero, About the event | Date and time in AEST or AEDT |
| `{{event_description}}` | About the event | Paste the matching variant snippet from section 2d of the canonical pack |
| `{{privacy_url}}` | Trust elements | URL of the Snooze privacy notice |
| `{{TESTIMONIAL_QUOTE}}` `{{TESTIMONIAL_NAME}}` `{{TESTIMONIAL_CHILD_AGE}}` | Trust elements | Pull a real Day Pass or Snooze event quote once available |

The hidden `source` field is preset to `landing` and does not change per anchor.

## Currency

Per Kade's house rule for Day Pass: pricing references in this paste pack are intentionally currency-neutral. The Day Pass itself is free, so no `currency_preference` field is captured here (only the cold-ads variant captures it, because that variant feeds into a paid Snooze Access conversion downstream where currency routing matters). If a future iteration adds pricing copy to this page, integrate the helper at `apps/snooze-website/kajabi-deployment/global/js/currency-toggle.js`.

## CSS deployment surface

Per `apps/snooze-website/AGENTS.md` §5, the paste pack is self-contained. It uses inline styles only and does not depend on `snooze-unified-theme.css`. A System Initialization block for `#day-pass-page` needs adding to `snooze-unified-theme.css` IF the operator chooses to integrate with theme styles. The paste pack is self-contained and does NOT require it for V1.

The wrapper ID on the page is `<div id="day-pass-page">`. If a System Initialization block is added later, register the wrapper in `apps/snooze-website/docs/technical/CSS-STABILIZATION-BRIEF.md` at the same time.

## Existing-member and prior-free-pass guards

The signup form runs an eligibility check against `services/memory-api` before submitting to the n8n webhook. Outcomes:

- `existing_member` redirects to `/already-a-member` (shared interstitial; paste pack in canonical pack section 4).
- `prior_free_pass` redirects to `/day-pass/already-used`.
- Eligible visitors submit to the n8n webhook and are redirected to the per-anchor thank-you page (slug picked from the lookup table in the script).

Both interstitials are shared with the cold-ads variant; no new interstitials are needed.

## Operator publish checklist

The 9-step operator publish checklist in section 7 of the canonical pack applies. Highlights:

1. Fill all script placeholders (`MEMORY_API_HOST`, `N8N_WEBHOOK_URL`).
2. Set the per-anchor `event_anchor` hidden field value.
3. Fill all page-level variables across the page.
4. Replace the about-event variant snippet for this anchor and delete the other variants and their comments.
5. Test the happy path, the existing-member path, and the prior-free-pass path in an incognito window with three different test emails.
6. Test on a mobile viewport at 390px.
7. Confirm the `day-pass-signup` n8n workflow is active before directing live traffic.

## Deployment surface rules

Per `apps/snooze-website/AGENTS.md` and root `AGENTS.md` §6:

- This is a landing page, not a course lesson or email. Inline styles allowed without `!important`; no `<style>` blocks required because the paste pack does not depend on the theme CSS.
- Round-trip rule (root `AGENTS.md` §9): any operator-side Kajabi edit must come back to this folder before next deploy.
- Tag before deploy: `website-v{X.Y.Z}`.
