# Snooze Access - Quiz / Assessment Page (funnel step 1)

Cold-traffic entry point for the Snooze Access paid-ads funnel.

**Funnel position:** cold ad -> this quiz (step 1) -> results/sales page (step 2) -> thank-you (step 3)

**Source pattern:** `kajabi-deployment/pages/landing/day-pass-paidads/index.html` (UTM capture, honeypot, currency detection, eligibility-check-then-webhook submit).

**Surface rules:** landing page, not a course lesson or email. Inline styles only; no theme CSS dependency; no `<style>` blocks (Kajabi strips them).

## Kajabi deployment

Paste each `SECTION N` block into a separate Kajabi Custom Code section in the order shown. The trailing `<script>` block goes into the page's code area (or a final Custom Code block at the bottom).

**Suggested slug:** `/snooze-access-from-our-ads/quiz`

## Form metadata

| Field | Value |
|---|---|
| `event_anchor` | `paid_ads_quiz` |
| `source` | `snooze_access_quiz` |

## Placeholders to fill before publishing

| Placeholder | What to put there |
|---|---|
| `{{MEMORY_API_HOST}}` | Base URL of `services/memory-api`, no trailing slash |
| `{{N8N_WEBHOOK_URL}}` | `https://n8n.khorus.ai/webhook/snooze-access-quiz` (live, built + verified 2026-07-05; see `workflows/n8n/utm-attribution-capture/`) |
| `{{privacy_url}}` | URL of the Snooze privacy notice |

`currency_preference` is set automatically from browser locale (AU locale maps to `aud`; everything else maps to `usd`). No operator action required.

## Submit flow

1. Honeypot check (silent drop if filled).
2. Validation: all four questions plus email and first name must be present.
3. Eligibility check: `POST {MEMORY_API_HOST}/api/snooze-access/check-eligibility` with `{ email }`. If `eligible === false && reason === 'existing_member'`, redirect to `/already-a-member`.
4. n8n webhook: `POST {N8N_WEBHOOK_URL}` with full payload (quiz answers, UTM fields, `currency_preference`, `event_anchor`, `source`).
5. Redirect to the results page at `/snooze-access-from-our-ads` carrying:
   `?first_name=&currency=&age=&struggle=&utm_source=&utm_medium=&utm_campaign=&utm_content=&utm_term=`

The five UTM keys (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) are copied verbatim from the page URL into hidden form fields at page load, then forwarded in the webhook payload and carried onto the redirect query string. `utm_content` equals `ad_name` in Meta and is the attribution join key for `paid_media.lead_attribution_capture` (harness section 5).

## Tracking

No purchase event fires on this page. Checkout and purchase tracking is handled by the global script `kajabi-deployment/global/js/kajabi-checkout-tracking.js` on the Kajabi checkout page.
