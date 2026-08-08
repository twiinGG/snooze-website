# Snooze Membership release runbook

**Owner:** Kade  
**Prepared:** August 08, 2026  
**Release tag:** `website-vX.Y.Z` at deploy time  
**Live state:** Not deployed

## Approval and access gates

Complete these gates before the first Kajabi write:

- Approve the member-facing page, checkout, thank-you and lifecycle drafts.
- Open real headed Chrome at `about:blank`, complete human Kajabi login and attach through the documented CDP flow.
- Open the staged ME-006 GTM workspace. Record its workspace ID and current version.
- Confirm a second person can perform the checkout and tracking review.
- Confirm the root environment validator passes. The repo build passed by mapping the umbrella `SUPABASE_ANON_KEY` value to the validator's `SUPABASE_KEY` compatibility name.

GTM publishing, Kajabi publishing, lifecycle activation and canonical data changes remain human-gated actions.

## Required preimages

Capture lossless preimages before editing each field:

1. Homepage full-page custom-code block
2. Website theme CSS field
3. Website navigation custom-code block
4. Settings Site Details Header Page Scripts
5. Settings Checkout Footer tracking code
6. USD offer `2150887297` HTML, CSS and JavaScript fields
7. AUD offer `2151254578` HTML, CSS and JavaScript fields
8. Current trial thank-you page
9. Active trial sequence email bodies, trigger settings and automations

Store preimages under `kajabi-deployment/_live-preimages/` with the date, surface ID and field name. Do not hand-transcribe them.

## Local validation

Run from the repository root:

```bash
python scripts/validation/scan_placeholders.py --dir apps/snooze-website/kajabi-deployment/pages/website/snooze-membership
python scripts/validation/scan_placeholders.py --dir apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership
python scripts/validation/env_validator.py --check-only
node --check apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/shared/checkout.js
set -o pipefail
sed '1{/^<script>$/d;};${/^<\/script>$/d;}' apps/snooze-website/kajabi-deployment/global/js/kajabi-checkout-tracking.js | node --check
node apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/shared/__tests__/checkout.test.js
node apps/snooze-website/kajabi-deployment/global/js/__tests__/kajabi-checkout-tracking.test.js
node apps/snooze-website/kajabi-deployment/global/js/__tests__/site-click-tracking.test.js
node apps/snooze-website/kajabi-deployment/global/js/__tests__/currency-toggle.test.js
node apps/snooze-website/kajabi-deployment/pages/website/snooze-membership/__tests__/membership-funnel.test.js
npx --yes htmlhint --rules tag-pair,attr-no-duplication,id-unique,src-not-empty apps/snooze-website/kajabi-deployment/pages/website/snooze-membership/snooze-membership-page.html apps/snooze-website/kajabi-deployment/pages/website/home/home-page.html apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/usd/checkout-blocks.html apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/aud/checkout-blocks.html apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/thank-you-page.html
npx --yes stylelint --config apps/snooze-website/scripts/stylelint-kajabi.json apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/shared/checkout.css apps/snooze-website/kajabi-deployment/global/css/theme-custom-code.css
```

The generic file-mode link checker treats root-relative Kajabi routes as local files. Check links against the unpublished preview in a headed browser, then repeat against the public origin after publication.

Block release on a placeholder, broken internal link, missing required environment variable or failing scoped test.

## Draft page creation

1. Create a Kajabi Website Page with slug `/snooze-membership` and keep it unpublished.
2. Add one full-width, flush custom-code section.
3. Paste `snooze-membership-page.html` with `scripts/emit_paste_js.py`.
4. Paste the complete shared `global/css/theme-custom-code.css` into the website theme CSS field.
5. Save, reload and read the values back.
6. Preview logged out at 320px, 390px, 768px and 1440px.
7. Verify the native navigation remains above the custom block and the inline footer appears once.
8. Verify both currency controls switch every displayed price and every `.dynamic-cta` together.
9. Switch AUD to USD and confirm the original USD values and URL return.
10. Confirm `view_item` fires once with no personal data.

Do not update navigation or existing internal links until the draft passes.

## Paired checkout deployment

Deploy the USD and AUD twins in one maintenance window. If either side fails validation, restore both twins.

1. Paste each offer's `checkout-blocks.html` into its checkout body field.
2. Paste the shared `checkout.css` into both offer CSS fields.
3. Paste the shared `checkout.js` into both offer JavaScript fields.
4. Confirm monthly remains selected by default.
5. Select monthly, quarterly and annual on each checkout.
6. Confirm the selected state does not rely on colour alone.
7. Confirm the disclosure shows the correct amount and cadence for each selection.
8. Confirm the reciprocal currency link preserves inbound attribution without duplicate parameters.
9. Confirm required payment, tax and terms fields remain visible.
10. Test browser autofill, card entry, Apple Pay and Google Pay where Kajabi supports them.

## Checkout order tracking cutover

Coordinate this step with the staged ME-006 GTM workspace.

1. Paste `global/js/kajabi-checkout-tracking.js` into Settings Checkout Footer tracking code.
2. Confirm both trial offers have `inject_footer_tracking_code` enabled.
3. Disable the legacy GTM Custom HTML source that independently emits `begin_checkout` on these checkouts. Keep one canonical `begin_checkout` source.
4. Publish the matching GTM mappings only after Preview shows the expected dataLayer events.
5. Start one USD trial and one AUD trial with new logged-out test customers.
6. Confirm each order emits one `trial_started` and no `purchase`.
7. Complete one paid test transaction with value greater than zero.
8. Confirm it emits one `purchase` with the exact value and currency.
9. Complete or inspect an unrelated zero-value claim and confirm `free_claim` only.
10. Reload each confirmation page and confirm order deduplication.
11. Retire the legacy URL-only Purchase trigger only after the order-bound event passes.

DebugView, GTM Preview, browser network requests and Meta Events Manager must agree. Check that no browser and server duplicate remains.

## Onboarding and lifecycle activation

1. Validate each course destination as a logged-in trial member. Kajabi returns 403 to non-browser checks.
2. Paste the thank-you page only after all four destinations open for that member.
3. Confirm age-path selections emit `onboarding_path_selected` but do not write profile data.
4. Confirm Village links emit `village_cta_click` and open the member community.
5. Paste the Day 0, Day 2 and Day 5 email drafts.
6. Configure Day 8 converted and non-converter branches as mutually exclusive.
7. Use authoritative first-charge, cancellation and expiry conditions. Do not infer them from page visits.
8. Send every email to a test contact and inspect desktop and mobile rendering before activation.

Do not build or publish `/start-snooze` until the identity and field write proof in `../start-snooze/PHASE-2-BUILD-BRIEF.md` passes.

## Publication order

1. Publish `/snooze-membership`.
2. Verify the public page with a cache-busted request and an incognito browser.
3. Paste `global/html/navigation.html` and verify desktop and mobile menus.
4. Deploy the changed inline footer sources as each website page is touched. The new page and homepage already contain the canonical footer.
5. Paste the simplified homepage.
6. Verify the homepage trial CTA uses `mqQikDM7` before currency mapping.
7. Verify all changed membership discovery links route to `/snooze-membership`.
8. Tag the exact deployed commit as `website-vX.Y.Z` and push the tag.

## Release acceptance

- `/snooze-membership` returns 200 with no redirect.
- USD and AUD checkout destinations, prices and variants match the offer registry.
- No trial CTA uses a non-trial offer.
- Every plan shows cadence, post-trial amount and cancellation instructions.
- The thank-you page gives one immediate age-based next action.
- USD and AUD test orders emit `trial_started` without Purchase.
- A paid test order emits one Purchase.
- No personal data enters the dataLayer or localStorage.
- The first day-eight cohort appears in existing commerce reporting.
- Repo paste files and Kajabi read-backs match.
- Rollback artifacts contain every changed live field.

## Rollback procedure

If a release check fails, unpublish the new page where appropriate and restore the captured preimages for the affected surface. Restore USD and AUD checkout twins together. Restore the previous GTM version if the failure involves event routing. Re-run the failed acceptance check and record the rollback in the deployment log.
