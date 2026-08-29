# Consult checkout copy (repo source of truth)

Left-column copy for every consult checkout. Until August 29, 2026 this copy lived **only in the Kajabi checkout themes**, with no repo source, which is why nobody noticed that 12 of the 17 consult checkouts had no copy at all.

Kajabi checkout themes hold both styling and rendered copy. Read and write them with `get_theme_content` / `update_theme_content` on the offer's `active_theme_id`, section `1744906803654`.

## All 17 consult checkouts, shipped and verified August 29, 2026

Every row carries the booking and refund policy, the agreement prompt and a Terms link. Each was read back after the push and asserted on four markers.

| Offer | ID / token | Price | Theme | Before | Repo file |
|---|---|---|---|---|---|
| Signature Consult | [2149700088](https://app.kajabi.com/admin/offers/2149700088/edit) / `4zHPSRCs` | USD $690 | [2162910903](https://app.kajabi.com/admin/themes/2162910903/settings/edit) | copy, no policy | `PUBCS01-usd-signature-consult-checkout.html` |
| Signature Consult | [2151262016](https://app.kajabi.com/admin/offers/2151262016/edit) / `wgqokagt` | AUD $997 | [2166723252](https://app.kajabi.com/admin/themes/2166723252/settings/edit) | **empty** | `PUBCS01-aud-signature-consult-checkout.html` |
| Follow-Up Consultation | [2150591419](https://app.kajabi.com/admin/offers/2150591419/edit) / `5xL3NaRf` | USD $397 | [2162910899](https://app.kajabi.com/admin/themes/2162910899/settings/edit) | **empty** | `PUBCS02-usd-followup-consult-checkout.html` |
| Follow-Up Consultation | [2151262017](https://app.kajabi.com/admin/offers/2151262017/edit) / `d5HsPDpJ` | AUD $597 | [2166723253](https://app.kajabi.com/admin/themes/2166723253/settings/edit) | **empty** | `PUBCS02-aud-followup-consult-checkout.html` |
| Signature Consult (member) | [2150838458](https://app.kajabi.com/admin/offers/2150838458/edit) / `igbTdRbk` | USD $611 | [2164012404](https://app.kajabi.com/admin/themes/2164012404/settings/edit) | copy, no policy | `docs/operations/kajabi-assets/checkout-code/MEMCS01-policy-block.html` |
| 2-Week Transformation | [2149839927](https://app.kajabi.com/admin/offers/2149839927/edit) / `mwiSia6A` | USD $3,500 | [2162910897](https://app.kajabi.com/admin/themes/2162910897/settings/edit) | **empty** | `PUBCS03-usd-2week-checkout.html` |
| 2-Week Transformation | [2151262018](https://app.kajabi.com/admin/offers/2151262018/edit) / `ZYWF7eY8` | AUD $5,250 | [2166723254](https://app.kajabi.com/admin/themes/2166723254/settings/edit) | **empty** | `PUBCS03-aud-2week-checkout.html` |
| Add-on Week | [2150720647](https://app.kajabi.com/admin/offers/2150720647/edit) / `fhuXVKZu` | USD $350 | [2163241463](https://app.kajabi.com/admin/themes/2163241463/settings/edit) | **empty** | `ADDON-week-checkout.html` |
| Member consult upsell | [2150837387](https://app.kajabi.com/admin/offers/2150837387/edit) / `qF6AHo46` | USD $445 | [2164005874](https://app.kajabi.com/admin/themes/2164005874/settings/edit) | copy, no policy | policy block appended, see below |
| New member upsell | [2150873956](https://app.kajabi.com/admin/offers/2150873956/edit) / `SiiVEJuS` | AUD $640 | [2164224810](https://app.kajabi.com/admin/themes/2164224810/settings/edit) | copy, no policy | policy block appended, see below |
| Consult with Bec | [2150130913](https://app.kajabi.com/admin/offers/2150130913/edit) / `TXwe2YyX` | USD $290 | [2162910896](https://app.kajabi.com/admin/themes/2162910896/settings/edit) | **empty** | `ORPH-bec-consult-checkout.html` |
| Two Children Package | [2150588524](https://app.kajabi.com/admin/offers/2150588524/edit) / `Vyn7pGT2` | USD $490 | [2162910910](https://app.kajabi.com/admin/themes/2162910910/settings/edit) | **empty** | `ORPH-two-children-consult-checkout.html` |
| Guide Owner Exclusive | [2150311663](https://app.kajabi.com/admin/offers/2150311663/edit) / `fPYjsLLg` | USD $490 | [2162910911](https://app.kajabi.com/admin/themes/2162910911/settings/edit) | **empty** | `ORPH-guide-owner-consult-checkout.html` |
| MEMCS02 member 2-Week | [2151265013](https://app.kajabi.com/admin/offers/2151265013/edit) / `6GmAUszo` | USD $2,800 | [2166740516](https://app.kajabi.com/admin/themes/2166740516/settings/edit) | **empty** | `MEMCS02-usd-2week-checkout.html` |
| MEMCS02 member 2-Week | [2151265016](https://app.kajabi.com/admin/offers/2151265016/edit) / `qwTcMCcz` | AUD $3,970 | [2166740534](https://app.kajabi.com/admin/themes/2166740534/settings/edit) | **empty** | `MEMCS02-aud-2week-checkout.html` |
| MEMCS02 2-Week **duplicate** | [2151265178](https://app.kajabi.com/admin/offers/2151265178/edit) / `83qEgu2n` | USD $2,800 | [2166741342](https://app.kajabi.com/admin/themes/2166741342/settings/edit) | **empty** | `MEMCS02-usd-2week-checkout-DUPLICATE.html` |
| MEMCS02 2-Week **duplicate** | [2151265179](https://app.kajabi.com/admin/offers/2151265179/edit) / `5DR3ievG` | AUD $3,970 | [2166741343](https://app.kajabi.com/admin/themes/2166741343/settings/edit) | **empty** | `MEMCS02-aud-2week-checkout-DUPLICATE.html` |

## Two block patterns

Most checkouts take a **text** block. Three (`igbTdRbk`, `qF6AHo46`, `SiiVEJuS`) already carried a large styled `code` block, so their policy went in as a **second** code block rather than an edit to the existing 10,896 and 13,122-character blocks. The second block reuses `.trust-section` / `.trust-point`, which the first block's `<style>` already defines on the same page. Never rewrite the big block to add a paragraph.

## Two wordings, not one

- **Consult wording** (single session): fee covers preparation, 7 day refund gated on questionnaire and 48 hours, one free reschedule at 24 hours notice, non-attendance counts as delivered, 60 day booking window, 6 month expiry.
- **Support Period wording** (2-Week and Add-on Week): fee covers the reserved period, full refund up to 72 hours before the period begins, the period runs on calendar days and does not pause, support hours are not 24-hour and not an emergency service.

Both mirror Terms and Conditions section 5A. Change one, change the other and `_consult-booking-policy-block.html`.

Timeframes approved by Kade, August 29, 2026.

## Registry corrections found while reviewing

1. **`KAJABI-OFFERS-REGISTRY.md` records the USD follow-up as `2149700039` / `jRxWAnVo`. That offer does not exist** (`get_offer` returns "Offer not found"). The live USD follow-up is **`2150591419` / `5xL3NaRf`**. The dead token was also a live link in the USD Signature checkout's "book here". Corrected and pushed.
2. **The 2-Week price in the registry is wrong.** $2,800 / A$3,970 are the **member** offers. The public 2-Week is **$3,500 USD / A$5,250**, which matches the consultations page.
3. **The AUD follow-up is attached to the wrong product.** `2151262017` links product `2148688072`, "1:1 Consult with Sally - Snooze Member Special", on a non-member offer.
4. **Add-on Week `2150720647` has zero products attached.** A purchase grants nothing.

## Still open, needs Sally

- Four near-identical member 2-Week offers. Two should be retired. All four now carry the policy so none is a liability while the decision waits.
- Five orphan consult offers priced before the August 10, 2026 repricing: Bec $290, Two Children $490 (cheaper than one child at $690), Guide Owner $490, member upsell $445, new member upsell A$640.
(The 24 versus 48 hour contradiction is closed, see below.)

## Post-purchase messages corrected, August 29, 2026

Thirteen consult offers told buyers the client form was due "no later than 24 hours before", contradicting Terms section 5A. All now say **48 hours**. Seven also linked the retired `www.sleepconcierge.com.au/library` domain; all now point at `www.joinsnooze.com/library`.

Done as an in-page find-and-replace on the `offer_thank_you_body` TinyMCE editor at `/admin/offers/<id>/upsells`, so no message body was ever retyped. Every offer was re-verified after a fresh page load, which reads from the server rather than from the editor's memory.

Offers corrected: 2149700088, 2151262016, 2150591419, 2151262017, 2150838458, 2150588524, 2150311663, 2150837387, 2150873956, 2149839927, 2151262018, 2151265013, 2151265016. Plus 2150130913 (domain only, it has no client-form step).

Not touched: 2151265178 and 2151265179 have `post_purchase.preference: disabled`, so they show no message at all. That is its own gap: a buyer paying $2,800 gets no scheduling instructions.

Background: `docs/projects/consults-offer-rebuild/CONSULT-REFUND-POLICY-GAP-2026-08-29.md`
