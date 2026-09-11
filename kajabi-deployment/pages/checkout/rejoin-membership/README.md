# Snooze Membership rejoin checkout

These fragments are the source of truth for the Text block on the private monthly rejoin checkouts.

| Currency | Kajabi offer | Source |
|---|---|---|
| USD | [Snooze Membership Rejoin, 2151388226](https://app.kajabi.com/admin/offers/2151388226/edit) | `usd/checkout-text-block.html` |
| AUD | [Snooze Membership Rejoin, 2151388227](https://app.kajabi.com/admin/offers/2151388227/edit) | `aud/checkout-text-block.html` |

Both offers remain monthly subscriptions with no trial. The 50% reduction comes from a Once coupon scoped to the matching offer. Do not publish either offer or distribute a checkout link until the coupon, identity check and controlled billing test pass.

The customer-facing amounts must match the live offer and coupon:

- USD: US$39.50 first payment, then US$79 each month.
- AUD: A$59.50 first payment, then A$119 each month.

Deployment: open the offer checkout editor, select the Checkout section and replace the default Text block content with the matching fragment. Save while the offer is Draft. Preview again and scan for square-bracket placeholders.
