# One-on-One Consultations Page

## Deployment

- **Page URL:** https://joinsnooze.com/one-on-one-sleep-consultations
- **Kajabi placement:** Website Pages; paste HTML into the custom code block for this page.
- Navigation and footer are injected via Kajabi includes; do not add them to this file.

## CTA / checkout note (2026-07-27)

Book CTAs use `.dynamic-cta` only (no `data-checkout`). A global handler used to overwrite every `[data-checkout]` href with membership checkout (`z63s9VaR` / `vYgCNgJz`). Fixed in [`global/html/site-header-page-scripts.html`](../../global/html/site-header-page-scripts.html) (Header Page Scripts; live). Page paste removes `data-checkout` from the three book buttons as belt-and-suspenders; see [`PASTE-MAP.md`](../../PASTE-MAP.md) row P2.

## SEO metadata (add in Kajabi page settings, not in code)

- **SEO Title:** Personalised Sleep Consultations with Sally | 1:1 Sleep Support for Babies and Toddlers
- **SEO Description:** Work one-on-one with Sally, an internationally certified sleep consultant and former registered paediatric nurse, to create a tailored sleep plan for your baby or toddler. Virtual consultations available worldwide.

> Copy-uplift session 2 (2026-07-03): "7 days email support" removed from all packages per Sally's decision 17; credentials corrected to the former/non-practising standard incl. the ACU degree. NOTE: the LIVE Kajabi surfaces still carry the old copy until repasted, and the MEMCS01 (`igbTdRbk`) per-offer checkout custom code plus any consult email sequences in Kajabi admin still promise 7-day email support — Kade to fix those in the admin UI (no repo source exists for them).

## Session 4 (2026-08-10): consult repricing + card restyle

Source: [`1_Inbox/meetings/processed/2026-08-10 - Consults Offer (Sally + Kade).md`](../../../../../../1_Inbox/meetings/processed/2026-08-10%20-%20Consults%20Offer%20(Sally%20+%20Kade).md).

| Package | Standard (page) | Member (page) | Change |
|---|---|---|---|
| 1:1 Signature Consultation | $690 / A$997 | $611 / A$878 | Was $650 / A$975 standard, $525 / A$790 member |
| Follow-Up Consultation | $397 / A$597 | n/a | Was $390 / A$590. "45-Minute" removed from the name |
| 2-Week Transformation | $3,500 / A$5,250 | $2,800 / A$3,970 | Unchanged |

- **Member price rule (Sally, 2026-08-10):** member consult price = standard price less one month of membership ($79 / A$119). Net spend matches the standard consult, so the first membership month is free. Page copy reframed from "save $46" to "same total, membership included". Rule is NOT applied to the 2-Week Package pending Sally's call.
- **No time-for-money language.** All "60-minute" / "45-minute" references stripped from hero stats, cards, member comparison and FAQs. Offer names in Kajabi still carry durations; renaming is a pending admin action.
- **Cards restyled** to the home-page compact `.price-card` pattern, scoped as `#consultations-page .consult-price-card` in the page `<style>` block. Three-across auto-fit grid, Signature featured with a "Most Booked" ribbon. The old `.consult-packages-layout` / `.consult-bottom-row` / `.consult-card-*` rules are gone.
- **Follow-up private pricing:** the US$190 / A$270 figure agreed with Sally is delivered as a private 50% off coupon on `jRxWAnVo` / `d5HsPDpJ`, not as a public price. At the $397 / A$597 anchor a 50% code nets US$198.50 / A$298.50; use a fixed-amount code if a round US$190 / A$270 is wanted.

### Pending before this page goes live

The page now displays prices the Kajabi offers do not yet charge. Do not paste until:

1. `4zHPSRCs` (2149700088) repriced $650 to $690, and `wgqokagt` (2151262016) repriced A$975 to A$997.
1. `jRxWAnVo` (2149700039) repriced $390 to $397, and `d5HsPDpJ` (2151262017) repriced A$590 to A$597.
2. The member consult offer repriced to $611 / A$878 (AUD member consult offer may need creating).
3. The currency-engine offer map comments in `global/html/site-header-page-scripts.html` refreshed (still say "$650 -> A$975", "PUBCS02 45min Follow-up"). Comments only; the mapping IDs are unchanged and still correct.
4. Home page value stack fixed: it still shows the 1:1 consult member price as $445 / A$675.

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
