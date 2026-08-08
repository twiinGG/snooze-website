# Snooze Membership website page

Paste `snooze-membership-page.html` into one full-width, flush custom-code section on the Kajabi Website Page at `/snooze-membership`. The wrapper is `#snooze-membership-page`. Native website navigation renders above the block. The canonical footer is copied inline at the bottom.

## Offer and currency contract

- Authoring currency: USD
- USD trial checkout: offer `2150887297`, slug `mqQikDM7`
- AUD trial checkout: offer `2151254578`, slug `Sr6KzShx`
- Trial links use the explicit USD URL plus `.dynamic-cta` and `data-checkout`. The existing site currency engine maps them to AUD.
- Prices use `.dynamic-price`, `data-usd` and `data-aud`.
- Currency controls mount through `.sn-currency-inline` and `data-currency-toggle-mount`.
- The page does not select a pricing option. Visitors choose monthly, quarterly or annual billing at checkout.

## Testimonial provenance

All four cards are contiguous excerpts from public five-star Google reviews. They were already selected for web use in the approved social-proof inventory. The cards describe the actual source product or general Snooze experience and do not relabel Camp or consultation results as membership results.

Public source: [The Sleep Concierge Google reviews](https://www.google.com/maps/place/?q=place_id:ChIJ909XQaRD1moRMeU0Gdc7_GU)

Local provenance sources:

- `apps/snooze-website/site-audit-2026-06/wave-3-social-proof/injection-blocks.html`
- `apps/snooze-website/site-audit-2026-06/wave-3-social-proof/injection-blocks-manifest.md`
- Gitignored corpus source in the primary workspace: `apps/snooze-website/site-audit-2026-06/wave-3-social-proof/CURATED-SOCIAL-PROOF.md`

| Attribution | Source type | Source product tags | Review date |
|---|---|---|---|
| Kassandra C., baby 4 months | Google Review | 3-4 Month Course | October 02, 2024 |
| Alice L., baby 5 months | Google Review | 5-12 Month Guide | October 17, 2024 |
| Cassy B. | Google Review | The Snooze Membership, 5-12 Month Guide | June 15, 2024 |
| Kate C., baby 12 months | Google Review | The Snooze Membership, 1:1 Consult | June 15, 2024 |

## Deployment notes

- Page surface: Kajabi Website Page, shared Encore website theme `2156873377`.
- Section setting: `full_width: "true"`.
- Code block setting: `make_flush: "true"`.
- Add the section ID to `content_for_index` and its block ID to `block_order`.
- Shared styles live in `global/css/theme-custom-code.css`. The complete System Initialization block appears before membership-specific styles.
- No live Kajabi write or publish is part of this repo change.
