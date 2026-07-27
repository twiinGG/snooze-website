# Snooze Access - Cold-Ads Funnel (3 pages)

> **DEPLOY STATUS (2026-07-01):** the **results/sales page (`index.html`) is live-in-Kajabi as a DRAFT** — landing page id `2152134250`, theme `2166700952`, slug **`snooze-access`** (`joinsnooze.com/snooze-access`, NOT the suggested `snooze-access-from-our-ads`). Full HTML is in an Encore `code` block; `{{privacy_url}}`→`/privacy-policy` at paste time; `SA_CHECKOUT.aud.live=true` (AUD→`vYgCNgJz`). **Publish in the Kajabi UI when the ad campaign is ready.** The `quiz/` and `thanks/` funnel steps are NOT yet built in Kajabi. Record: `course-free-modules-conversion/docs/LMCR04-DEPLOY-SESSION-2026-07-01.md`.

Cold-traffic paid-ads funnel selling Snooze Access, the baby-sleep membership by Sally Woods (The Sleep Concierge). AU market, AUD default.

**Source pattern:** `apps/snooze-website/kajabi-deployment/pages/landing/day-pass-paidads/`. The quiz page mirrors the Day Pass `hydrateUtms()`, `detectCurrency()`, honeypot, hidden UTM fields, and the eligibility-check-then-webhook submit flow verbatim where sensible.

**Surface rules:** landing pages, not course lessons or emails. Inline styles only; no theme CSS dependency; no `<style>` blocks (Kajabi strips them). No System Initialization block is required because no styles depend on `snooze-unified-theme.css` (per root AGENTS.md §5 and §6, and `apps/snooze-website/AGENTS.md`).

## Funnel order

1. **Quiz / assessment (lead capture):** `quiz/index.html`
   Cold ad lands here. A short age-segmented assessment (four questions: child age range, biggest struggle, current settling approach, what they&rsquo;ve tried) plus email and first-name capture. On submit: eligibility check, then n8n webhook, then redirect to the results page carrying `?first_name=&currency=&age=&struggle=`.
   `event_anchor = paid_ads_quiz`, `source = snooze_access_quiz`.
   Suggested slug: `/snooze-access-from-our-ads/quiz`.

2. **Results / sales page:** `index.html`
   Pain-led hero with Sally&rsquo;s four-month reframe; what&rsquo;s inside Snooze Access; how it works; the money-back results guarantee featured; testimonial plus the &ldquo;As seen in&rdquo; trust row; pricing framed monthly / quarterly (anchor, &ldquo;Most popular&rdquo;) / annual (best value, cash upfront); primary CTA &ldquo;Start my 7-day free trial&rdquo;.
   Suggested slug: `/snooze-access-from-our-ads`.

   **Hero visual option (Good Inside paid-LP pattern, July 2026):** a single composite image with floating pain chips is allowed on this paid sales step for ad-message match. Chip labels in that PNG are not crawlable. If you use it, repeat the same pain words as real HTML lower on the page (or as linked chips). Full notes: `../cold-traffic-landing-page/README.md` § “Hero pattern option: Good Inside paid-LP composite”. Do not use a baked composite on the organic homepage.

3. **Thank-you / next-steps:** `thanks/index.html`
   Shown after the trial starts. Confirms the trial is live, walks through what happens next, reinforces the guarantee, and points to the plan.
   Suggested slug: `/snooze-access-from-our-ads/thanks`. Set this as the Kajabi post-purchase / trial-start redirect for the Snooze Access offer.

## Placeholders to replace before Kajabi paste

| Placeholder | File(s) | What to put there |
|---|---|---|
| `{{MEMORY_API_HOST}}` | `quiz/index.html` | Base URL of `services/memory-api`, no trailing slash |
| `{{N8N_WEBHOOK_URL}}` | `quiz/index.html` | Full n8n webhook URL, e.g. `https://<n8n-host>/webhook/snooze-access-quiz` |
| ~~`{{SNOOZE_ACCESS_CHECKOUT_URL}}`~~ WIRED Jun 19, 2026 | `index.html` | No longer a placeholder. Checkout CTAs carry `data-sa-checkout` and are resolved at runtime by the `SA_CHECKOUT` config in the page script: currency-aware (AUD vs USD) with verbatim UTM passthrough. USD is the live default (`/offers/z63s9VaR/checkout`, verified via Kajabi `get_offer` 2150754998). AUD (`/offers/vYgCNgJz/checkout`, offer 2151256977; updated 2026-06-30 from the deleted `bEsVXFXG`/2151212200) is gated off (`SA_CHECKOUT.aud.live = false`). The AUD offer is now complete and published, so this flag can be flipped to `true` to go live in AUD. See `docs/strategy/paid-scaling/PHASE-3-OFFER-FUNNEL-PROPOSAL.md`. |
| `{{privacy_url}}` | `quiz/index.html`, `index.html` | URL of the Snooze privacy notice |
| `{{first_name}}` | `thanks/index.html` | Kajabi merge tag, or carried via `?first_name=` on the redirect |
| `{{access_url}}` | `thanks/index.html` | The member&rsquo;s Snooze Access dashboard URL; Kajabi merge tag or `?access_url=` |
| `{{support_email}}` | `thanks/index.html` | Sally&rsquo;s support email |

`currency_preference` is set automatically client-side from browser locale (AU to `aud`, everything else to `usd`); no operator action.

## Pricing section notes (index.html section 7)

Confirm live AUD/USD prices against the Kajabi offers registry before publishing. All three plan-tier buttons (`Monthly`, `Quarterly`, `Annual`) carry `data-sa-checkout` and share one checkout URL per currency (the buyer selects the plan tier on the Kajabi checkout page). If offers are ever split into one checkout per tier, give each button its own `data-sa-checkout-plan` hook and extend `resolveCheckout()` in the page script; do not reintroduce a paste-time URL placeholder.

## Sign-off and review notes

- **Guarantee wording.** The money-back results guarantee on `index.html` and `thanks/index.html` uses placeholder wording (&ldquo;Noticeably better sleep within 7 days, or your money back&rdquo;), flagged with an HTML comment. Final wording needs Sally&rsquo;s sign-off before publishing.
- **Testimonial.** The blockquote on `index.html` reuses the Day Pass structure and tone. Swap for a real, attributable Snooze Access testimonial before publishing if one is available.
- **Pricing.** Plan tiers (monthly / quarterly / annual) carry no hardcoded prices or offer IDs. Confirm and add live AUD/USD prices at publish time per the registry.

## Tracking

Checkout and purchase tracking is handled by the existing global script `apps/snooze-website/kajabi-deployment/global/js/kajabi-checkout-tracking.js`, which fires the purchase event to the GTM dataLayer and Meta Pixel with the correct currency on the Kajabi checkout page. These three pages do NOT fire a duplicate purchase event; the sales page only links to checkout, and the thank-you page is a confirmation surface. UTM attribution is captured on the quiz page and travels through the webhook payload and the checkout-link query string.

## Pre-deploy validation (root AGENTS.md §11)

Run from the monorepo root before any Kajabi paste. BLOCK on findings.

1. **Placeholder scanner** (expects to flag the uppercase deploy-time placeholders until they are filled):
   ```
   python scripts/validation/scan_placeholders.py \
     --dir apps/snooze-website/kajabi-deployment/pages/landing/snooze-access-paidads
   ```
2. **Link checker:**
   ```
   bash scripts/validation/check_links.sh \
     apps/snooze-website/kajabi-deployment/pages/landing/snooze-access-paidads
   ```
3. **Environment validator:**
   ```
   python scripts/validation/env_validator.py --check-only
   ```
4. **Full checklist:** `apps/snooze-website/docs/DEPLOYMENT-CHECKLIST.md`.

## Paste structure

Each page is split into numbered `<!-- SECTION N: ... -->` blocks so VSP can paste each section into a separate Kajabi Custom Code block, in order. The trailing `<script>` block on the quiz page and the results page goes into the page&rsquo;s code area (or a final Custom Code block at the bottom of the page).

## QA

1. Submit the quiz with a US-locale browser; confirm the webhook payload includes `currency_preference: "usd"` and the redirect carries `currency=usd`.
2. Submit with an AU locale; confirm `currency_preference: "aud"` and the AUD label renders on the sales page.
3. Submit with a UTM-tagged URL (`?utm_source=meta&utm_content=test_ad_id_123`); confirm all five UTM fields appear in the webhook payload and travel through to the checkout link.
4. Submit with all four questions answered; confirm the redirect lands on the results page and the greeting resolves to the first name.
5. Submit with a missing question; confirm the validation message blocks submit.
6. Existing member email; confirm redirect to `/already-a-member`.
7. Mobile viewport at 390px; confirm each page stacks cleanly, the pricing cards wrap, and CTAs are large enough to tap.
8. Confirm the guarantee wording matches Sally&rsquo;s signed-off copy on both `index.html` and `thanks/index.html`.

## Deploy path

Per root AGENTS.md §9 and `apps/snooze-website/CLAUDE.md`:

1. Commit to the working branch.
2. Publish to the external mirror: `scripts/publish-snooze-website.sh`.
3. VSP pastes each section into the matching Kajabi Custom Code block.
4. Tag before deploy: `website-v{X.Y.Z}`.

Round-trip rule: any operator-side Kajabi edit must come back to this folder before the next deploy.
