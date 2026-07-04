# Camp Snooze V2 (Luxury) Checkout

Custom checkout-page code blocks for the Camp Snooze V2 offers. Each HTML file is a self-contained Custom Code Block that renders below the Kajabi checkout form. The shared CSS and JS apply to all variants.

## Files

| File | Purpose | Offer |
|------|---------|-------|
| `camp-snooze-bundle-checkout-blocks.html` | Member bundle checkout for users who chose "Upgrade & Save $300" from the upsell modal | `K3Y6FEKX` |
| `camp-snooze-feb9-checkout-blocks.html` | Member bundle checkout (Feb 9 cohort variant) | `K3Y6FEKX` |
| `camp-snooze-member-checkout-blocks.html` | Existing-member checkout: members buying Camp Snooze at member price | `[YOUR_OFFER_ID]` - set to the actual member-only Camp Snooze offer ID before deploy |
| `camp-snooze-multiples-bundle-checkout-blocks.html` | Multiples (twins+) member bundle: Camp Snooze Multiples ($585 member rate) + Snooze Membership ($197) = $782 | Multiples Bundle offer |
| `camp-snooze-checkout-blocks.html` | Standalone Camp Snooze checkout | - |
| `camp-snooze-multiples-checkout-blocks.html` | Standalone Multiples checkout | - |
| `camp-snooze-v2-checkout.css` | Shared stylesheet for all variants | - |
| `camp-snooze-v2-checkout.js` | Shared JavaScript for all variants | - |

## Deployment instructions

For each checkout variant:

1. Create the checkout page in Kajabi for the matching offer (see table above).
2. Add the variant HTML to a Custom Code Block BELOW the Kajabi checkout form.
3. Paste `camp-snooze-v2-checkout.css` into the Custom CSS field.
4. Paste `camp-snooze-v2-checkout.js` into the Custom JavaScript field.
5. Google Fonts load inline in the HTML. Optionally also add them to the Header Tracking Code:
 `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&family=Satisfy&display=swap" rel="stylesheet">`

The JS field can also be set site-wide at Settings > Website > Custom JavaScript.

## Notes

- `camp-snooze-member-checkout-blocks.html` still carries a `[YOUR_OFFER_ID]` placeholder for the member-only Camp Snooze offer. Replace it with the live offer ID before deploying.
- Offer/product codes are canonical in the Kajabi registry (Google Sheet workbook `1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg`, synced to `docs/operations/KAJABI-OFFERS-REGISTRY.md`). Do not hardcode new codes here.
- `camp-snooze-checkout-blocks.html` targets offer ID `muRW6ug5` (standalone non-member Camp Snooze). The "Switch to Member Pricing" upgrade link points to offer `K3Y6FEKX` checkout.
- `camp-snooze-multiples-checkout-blocks.html` targets the Multiples standalone offer (ID `Lzouupsm`). The AUD variant of this offer was pending at time of last edit; verify the AUD offer ID is live before deploying to an AUD audience. The upgrade link also uses `Lzouupsm` for the member-pricing path; confirm a separate member-rate Multiples offer exists if needed.
- Multiples pricing: $1,035 USD / $1,563 AUD (1.5x the standard rate). Member saving shown as $450 USD / $680 AUD; member price shown as $585 USD / $883 AUD.

### Change log

- **2026-07-04 (CU-001 session 3 execution):** single-camp checkout repriced off the dead `$390` member price to the ratified §1.7 figures: non-member `$690 / A$997`, member `$611 / A$878`, member saving `$79 / A$119` (the bonus first month a member does not need). Applied to `camp-snooze-member-checkout-blocks.html` and `camp-snooze-checkout-blocks.html` (the two live single-camp blocks that remain here). **The bundle, multiples and feb9 blocks were retired** to `../../_retired/checkout-camp-snooze-bundles/` (decision-additions item A=B: composite totals + unratified multiples price have no §1.7 basis, feb9 is a past cohort); see `docs/projects/copy-uplift/10-decision-additions.md` item A. Camp is to be presented as its own total price with the bonus first month of membership framed as an add-on, not "inclusive"; full reframe deferred to the alumni-50%-off review for the open pricing questions. Spelling/em-dash HARD fixes applied to all blocks.
