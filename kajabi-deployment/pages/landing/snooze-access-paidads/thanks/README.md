# Snooze Access - Thank-You / Next-Steps Page (funnel step 3)

Post-trial-start confirmation and onboarding page for the Snooze Access paid-ads funnel.

**Funnel position:** cold ad -> quiz/assessment -> results/sales page -> this thank-you page (step 3)

**Source pattern:** `kajabi-deployment/pages/landing/day-pass-paidads-thanks/index.html`

**Surface rules:** landing page, not a course lesson or email. Inline styles only; no theme CSS dependency; no `<style>` blocks (Kajabi strips them).

## Kajabi deployment

**Suggested slug:** `/snooze-access-from-our-ads/thanks`

Set this page as the Kajabi post-purchase / trial-start redirect for the Snooze Access offer.

Paste each `SECTION N` block into a separate Kajabi Custom Code section in the order shown. The trailing `<script>` block goes into the page's code area (or a final Custom Code block at the bottom).

## Placeholders to fill before publishing

| Placeholder | Source | What to put there |
|---|---|---|
| `{{first_name}}` | Kajabi merge tag (primary) or `?first_name=` query param (fallback) | Resolved automatically; no action if Kajabi merge tags are enabled |
| `{{access_url}}` | Kajabi merge tag (primary) or `?access_url=` query param (fallback) | The member's Snooze Access dashboard URL |
| `{{support_email}}` | Manual fill | Sally's support email address |

The inline script hydrates `{{first_name}}` and `{{access_url}}` from query params if Kajabi merge tags do not resolve. Kajabi merge tags are the primary path.

## Sign-off required before publishing

The guarantee wording (section 3) uses placeholder copy: "Noticeably better sleep within 14 days, or your money back." Final wording must match Sally's signed-off copy on the results page (`../index.html`). Get Sally's sign-off before publishing.

## Tracking

No purchase event fires on this page. This is a confirmation and onboarding surface only. Purchase and checkout tracking is handled by the global script `kajabi-deployment/global/js/kajabi-checkout-tracking.js` on the Kajabi checkout page.
