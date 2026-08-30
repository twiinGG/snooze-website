# Snooze Membership release runbook

**Owner:** Kade  
**Prepared:** August 08, 2026; reconciled August 29, 2026
**Release tag:** `website-vX.Y.Z` at deploy time  
**Live state:** `/snooze-membership` is live. This runbook governs only a future approved change.

## Approval and access gates

Complete these gates before the first Kajabi write:

- Approve the member-facing page, checkout, thank-you and lifecycle drafts.
- Open real headed Chrome at `about:blank`, complete human Kajabi login and attach through the documented CDP flow.
- For any measurement change, open the named SAR-002 workspace and record its workspace ID and current version. Do not infer that the historical ME-006 workspace remains current.
- Confirm a second person can perform the checkout and tracking review.
- Confirm the root environment validator passes. The repo build passed by mapping the umbrella `SUPABASE_ANON_KEY` value to the validator's `SUPABASE_KEY` compatibility name.

GTM publishing, Kajabi publishing, lifecycle activation and canonical data changes remain human-gated actions.

## Required preimages

Capture lossless preimages before editing each field:

1. Homepage full-page custom-code block
2. Website theme CSS field
3. Website navigation custom-code block
4. Settings Site Details Header Page Scripts
5. Settings Checkout Footer tracking code: capture the empty field as the protected baseline and verify it remains empty
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
node --check apps/snooze-website/kajabi-deployment/pages/landing/7-day-trial-thank-you/thank-you-page.js
node apps/snooze-website/kajabi-deployment/pages/landing/7-day-trial-thank-you/__tests__/thank-you-page.test.js
npx --yes htmlhint --rules tag-pair,attr-no-duplication,id-unique,src-not-empty apps/snooze-website/kajabi-deployment/pages/website/snooze-membership/snooze-membership-page.html apps/snooze-website/kajabi-deployment/pages/website/home/home-page.html apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/usd/checkout-blocks.html apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/aud/checkout-blocks.html apps/snooze-website/kajabi-deployment/pages/landing/7-day-trial-thank-you/thank-you-page.html
npx --yes stylelint --config apps/snooze-website/scripts/stylelint-kajabi.json apps/snooze-website/kajabi-deployment/pages/checkout/7-day-trial-membership/shared/checkout.css apps/snooze-website/kajabi-deployment/pages/landing/7-day-trial-thank-you/thank-you-page.css apps/snooze-website/kajabi-deployment/global/css/theme-custom-code.css
```

The historical checkout-tracking file remains testable because it documents the retired browser
emitter. Passing its syntax or unit tests does **not** make it a paste target. The Checkout Footer
tracking code must remain empty unless a new, explicitly approved architecture replaces the
server-side purchase path.

The generic file-mode link checker treats root-relative Kajabi routes as local files. Check links against the unpublished preview in a headed browser, then repeat against the public origin after publication.

Block release on a placeholder, broken internal link, missing required environment variable or failing scoped test.

## Future approved page revision

1. Read the live `/snooze-membership` page and capture a lossless preimage before editing.
2. Confirm its settings against `page-metadata.md` and record any drift before changing it.
3. Confirm the existing full-width, flush custom-code section is the intended target.
4. After member-facing copy and the exact Kajabi mutation are approved, paste the complete `snooze-membership-page.html` with `scripts/emit_paste_js.py`.
5. Paste the complete shared `global/css/theme-custom-code.css` into the website theme CSS field.
6. Save, reload and read the values back.
7. Preview logged out at 320px, 390px, 768px and 1440px.
8. Verify the native navigation remains above the custom block and the inline footer appears once.
9. Verify both currency controls switch every displayed price and every `.dynamic-cta` together.
10. Switch AUD to USD and confirm the original USD values and URL return.
11. Confirm `view_item` fires once with no personal data.

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

## Protected checkout order tracking verification

Purchase is owned by the server-side n8n path. The Kajabi Checkout Footer tracking field was
deliberately cleared and must remain empty. Do not restore
`global/js/kajabi-checkout-tracking.js`; doing so creates a second purchase emitter whose order ID
cannot deduplicate against the server-side payment-transaction ID.

1. Read back Settings → Checkout → Footer tracking code and record that it is empty.
2. Verify the server-side workflow, current analytics mappings and current workspace/version before proposing a change.
3. Reconcile stuck dispatches and conversion receipts under SAR-002 without changing GTM, Kajabi or n8n state.
4. If a measurement mutation is required, prepare its exact target, preimage, rollback and controlled-alert test for human approval.
5. After that separate approval, execute one mutation at a time and verify one USD trial and one AUD trial emit `trial_started` without `purchase`.
6. Verify one approved paid test transaction produces exactly one purchase receipt with the exact value and currency.
7. Verify a zero-value claim produces `free_claim` only and that confirmation-page reloads do not duplicate receipts.

DebugView, GTM Preview, browser network requests, the server-side dispatch record and Meta Events
Manager must agree. The checkout footer staying empty is part of the acceptance evidence.

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

1. For a future approved revision, verify the existing live `/snooze-membership` page with a cache-busted request and an incognito browser before writing.
2. Capture its preimage, paste the approved complete block and verify the public page again.
3. Do not paste `global/html/navigation.html`. Verify the native Header against PASTE-MAP A6 and `global/native-header-call-to-action.json`, then run the desktop/mobile role matrix.
4. Deploy the changed inline footer sources as each website page is touched. The new page and homepage already contain the canonical footer.
5. Paste the simplified homepage.
6. Verify the homepage trial CTA uses `mqQikDM7` before currency mapping.
7. Verify all changed membership discovery links route to `/snooze-membership`.
8. Commit and tag the exact deployed state as `website-vX.Y.Z`. Push the commit or tag only when separately authorised.

## Release acceptance

- `/snooze-membership` returns 200 with no redirect.
- The title, description, canonical URL and social tags match `page-metadata.md`.
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
