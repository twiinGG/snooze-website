# One-on-One Consultations Page

## Deployment

- **Page URL:** https://joinsnooze.com/one-on-one-sleep-consultations
- **Kajabi placement:** Website Pages; paste HTML into the custom code block for this page.
- Navigation and footer are injected via Kajabi includes; do not add them to this file.

## CTA / checkout note (2026-07-27)

Book CTAs use `.dynamic-cta` only (no `data-checkout`). Global Custom JavaScript used to overwrite every `[data-checkout]` href with membership checkout (`z63s9VaR` / `vYgCNgJz`). Fixed in `global/js/theme-custom-code.js`. Redeploy: Kajabi Settings → Website → Custom JavaScript; paste that one file only (see `global/js/README.md`). Page paste removes `data-checkout` from the three book buttons as belt-and-suspenders.

## SEO metadata (add in Kajabi page settings, not in code)

- **SEO Title:** Personalised Sleep Consultations with Sally | 1:1 Sleep Support for Babies and Toddlers
- **SEO Description:** Work one-on-one with Sally, an internationally certified sleep consultant and former registered paediatric nurse, to create a tailored sleep plan for your baby or toddler. Virtual consultations available worldwide.

> Copy-uplift session 2 (2026-07-03): "7 days email support" removed from all packages per Sally's decision 17; credentials corrected to the former/non-practising standard incl. the ACU degree. NOTE: the LIVE Kajabi surfaces still carry the old copy until repasted, and the MEMCS01 (`igbTdRbk`) per-offer checkout custom code plus any consult email sequences in Kajabi admin still promise 7-day email support — Kade to fix those in the admin UI (no repo source exists for them).

## AUD offer IDs (pending)

The following AUD checkout offers were pending at time of authoring. Update the `href` attributes on the relevant CTA buttons once AUD offers are live in Kajabi:

| Package | USD offer slug | AUD offer slug (pending) | AUD price |
|---|---|---|---|
| 1:1 Signature Sleep Consultation | `4zHPSRCs` | pending | A$975 |
| 45-Minute Follow-Up Consultation | `jRxWAnVo` | pending | A$590 |
| 2-Week Baby Sleep Transformation | `mwiSia6A` | pending | A$5,250 |

Checkout URL pattern: `https://joinsnooze.com/offers/<slug>/checkout`

## Member pricing cross-sell

The Snooze Membership checkout link used on this page is `z63s9VaR` (USD). The AUD equivalent is `vYgCNgJz` (offer 2151256977; updated 2026-06-30 from the deleted `bEsVXFXG`/2151212200) and is swapped automatically by the site-wide currency engine once it is deployed — no per-page wiring needed.

## Session 3 (2026-07-04, CU-001): banned-phrase fix

- Removed "unlock"/"Unlock" (§7 banned LLM-fingerprint word), 4 spots: "to unlock preferred rates" → "for preferred rates" (x2), "Unlock Member Pricing" heading → "Member Pricing", "to unlock member pricing" → "for member pricing". Meaning preserved. Page was not yet pasted, so this prevented shipping a fresh violation.
- Member 2-Week offer now exists as drafts: MEMCS02 USD $2,800 (2151265178) / AUD $3,970 (2151265179), product 2148761857 — Kade publishes. Page displays $2,800/A$3,970 via `data-usd`/`data-aud`.
