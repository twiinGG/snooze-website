# Day Pass - Cold-Ads Landing Page

**Purpose:** Cold paid-ads entry page for the Snooze Day Pass funnel. Adapted from the canonical paste pack in `docs/projects/day-pass/09-landing-page-implementation.md` with paid-ad context above the fold.

**Source:** PRD §5.3 (`docs/projects/paid-media-and-dual-currency-v1/00-prd.md`).

**Internal offer reference:** `LDDP01_Day-Pass-PaidAds`. Public title: "Snooze Day Pass" (per Decision 6 in `docs/projects/paid-media-and-dual-currency-v1/03-day-pass-open-decisions-proposals.md`).

## Taste-tier copy (June 2026)

The page now sells the taste tier accurately per `docs/projects/day-pass/DAY-PASS-TASTE-TIER-v1.md`:

- Hero and "what's inside" name the actual grant: 4 courses (newborn, 3-4mo, 5-12mo, toddler), 2 guides (3-to-2 nap, catnapping), and the Snooze Lobby community.
- A new "What the Day Pass includes, and what it doesn't" section gives an honest side-by-side: the Day Pass vs full membership. The upgrade hook is Live Sleep Detectives, the live Q&A with the Snooze Specialists, which is members only and NOT in the Day Pass.
- "Decide what's next" and the conversion route point to the **7-day trial**, not full Access directly.
- Hidden fields, honeypot, UTM passthrough, `currency_preference` locale detection, eligibility check, and the n8n webhook POST are unchanged. `script.js` is unchanged and still mirrors the inline `<script>`.

## What's different from the canonical paste pack

The canonical paste pack assumes a warm visitor arriving from an event landing or partner channel. Cold-ad clickers arrive with less context, so:

- **Above the fold reframed** for cold traffic. No event anchor in the hero. Centres the value: 24 hours inside Snooze, free, no event required.
- **Hidden `source` field** changed from `landing` to `paid_ads_landing` for clean attribution downstream.
- **Hidden `event_anchor` field** uses `paid_ads_cold` as the default slug. This is a sentinel value handled by the n8n signup workflow; it does not map to a real event.
- **About-event section removed.** No event to describe.
- **Currency preference captured.** A `currency_preference` hidden field is set client-side from the visitor's locale (`AU` to `aud`, anything else to `usd`). The signup workflow stores it on the grant so Message 2 (conversion) routes to the correctly-priced Snooze Access checkout. This is the only cold-ads-specific data field above what the canonical pack collects.
- **UTM passthrough.** The script copies `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from the URL into the webhook payload so Performance Analyst can join Day Pass conversions back to specific Meta ads via `utm_content = <meta_ad_id>` (PRD §6.2 #5).

All form fields, guards, eligibility check, and error states match the canonical pack exactly. Existing-member redirects to `/already-a-member`. Prior-free-pass redirects to `/day-pass/already-used`. Both pages are shared with the canonical Day Pass flow; no new interstitials.

## File list

| File | Purpose |
|---|---|
| `README.md` | This file |
| `index.html` | Full Kajabi paste pack. Pastes into a single Kajabi page Custom Code or HTML section. Inline styles only; no theme CSS dependency. |
| `script.js` | Standalone copy of the inline `<script>` block from `index.html`. Useful for diffing against future updates and for unit testing. The script in `index.html` is the canonical version that ships. |

## Pre-paste checklist

Before pasting `index.html` into Kajabi, fill these placeholders:

| Placeholder | Where it appears | What to put there |
|---|---|---|
| `{{MEMORY_API_HOST}}` | Signup form script | Base URL of `services/memory-api`, no trailing slash |
| `{{N8N_WEBHOOK_URL}}` | Signup form script | Full n8n webhook URL: `https://<n8n-host>/webhook/day-pass-signup` |
| `{{login_url}}` | Sally signature footer (not used in v1, reserved for future iteration) | `https://app.kajabi.com/login` |
| `{{privacy_url}}` | Trust elements block | URL of the Snooze privacy notice |
| `{{support_email}}` | Existing-member interstitial (shared with canonical flow) | Sally's support email |

The `currency_preference` field is set automatically; no operator action.

## Thank-you page

The thank-you page slug for the cold-ads funnel is `/day-pass/from-our-ads/thanks`. The same question-capture form lives there (no question prompt makes sense without an event, so the cold-ads thank-you page should drop the question form and replace it with onboarding copy that points straight to the library). The thank-you page is out of scope for this folder; create it in `apps/snooze-website/kajabi-deployment/pages/landing/day-pass-paidads-thanks/` once the cold-ads variant of the question-capture page is approved.

For V1 launch, the cold-ads landing redirects to the canonical `/day-pass/thanks` fallback. That page exists and works. The cold-ads thank-you page is a Wave 1 polish, not a Wave 0b launch blocker.

## QA

The 15-step pre-launch smoke test in `docs/projects/day-pass/07-risk-qa-checklist.md` applies. The only additional checks for the cold-ads variant:

1. Submit the form with a US locale browser; verify the webhook payload includes `currency_preference: "usd"`.
2. Submit with an AU locale; verify `currency_preference: "aud"`.
3. Submit with a UTM-tagged URL (`?utm_source=meta&utm_content=test_ad_id_123`); verify all five UTM fields appear in the webhook payload.

## Deployment surface rules

Per `apps/snooze-website/AGENTS.md` and root AGENTS.md §6:

- This is a landing page, not a course lesson or email. Inline styles allowed without `!important`; single-page paste; no `<style>` blocks needed because the paste pack does not depend on the theme CSS.
- Round-trip rule (root AGENTS.md §9): any operator-side Kajabi edit must come back to this folder before next deploy.
- Tag before deploy: `website-v{X.Y.Z}`.
