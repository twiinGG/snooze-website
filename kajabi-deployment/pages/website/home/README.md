# Home Website Page

`home-page.html` is the authored source for the joinsnooze.com homepage custom-code block. It is a concise site orientation page. Native website navigation renders above the block and the canonical footer is copied inline at the bottom.

## Page purpose

The homepage routes visitors to the right Snooze offer instead of repeating the full membership sales page. Its structure is:

1. Outcome-led hero with chooser, membership and trial routes
2. Age and challenge router
3. Short explanation of how Snooze helps
4. Program selector
5. Compact membership preview
6. Sally, selected proof and site-level FAQ

Full membership inclusions, three-plan pricing, detailed trial terms and membership-specific FAQs live on `/snooze-membership`.

## Link contract

- Membership exploration links point to `/snooze-membership`.
- Trial links point explicitly to the USD trial checkout `mqQikDM7` and carry `.dynamic-cta` plus `data-checkout` so the existing currency engine can map them to the AUD twin `Sr6KzShx`.
- The homepage does not use the non-trial global membership checkout for a trial CTA.

## Deployment

Paste the whole file into the existing Home Website Page code block, section `1768118757163`. Follow `docs/DEPLOYMENT-CHECKLIST.md`. `home-page-live-source.html` remains baseline evidence and must not be edited.
