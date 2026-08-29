# Camp Snooze checkout policy block

Camp Snooze checkouts carried full sales copy but **no refund policy, no Terms link and no mention of the agreement**, on all six offers. Found and fixed August 29, 2026.

This also closes the action from the Kade and Louise call of August 25, 2026: *"Add the checkout prompt that an agreement follows."* See `docs/Meeting Summaries/260825_Camp-Update_Kade-and-Louise.md`.

`_camp-booking-policy-block.html` is the block. It went in as a **second** code block on each checkout so the existing camp checkout block (5,112 to 6,080 characters, styled from the theme's Custom CSS) was never rewritten. It carries its own inline styles, so it does not depend on the theme CSS being present.

| Offer | ID / token | Price | Theme | New block |
|---|---|---|---|---|
| Camp Snooze | [2150884129](https://app.kajabi.com/admin/offers/2150884129/edit) / `K3Y6FEKX` | USD $650.50 + $39.50/mo | [2164289025](https://app.kajabi.com/admin/themes/2164289025/settings/edit) | `1787984000001` |
| Camp Snooze | [2150946767](https://app.kajabi.com/admin/offers/2150946767/edit) / `46Bz9tk6` | AUD $937.50 + $59.50/mo | [2164667756](https://app.kajabi.com/admin/themes/2164667756/settings/edit) | `1787984100001` |
| Camp Snooze payment plan | [2151134284](https://app.kajabi.com/admin/offers/2151134284/edit) / `wesGUFkc` | AUD $249.25 x 4 | [2165964553](https://app.kajabi.com/admin/themes/2165964553/settings/edit) | `1787984200001` |
| Camp Snooze (member) | [2150947919](https://app.kajabi.com/admin/offers/2150947919/edit) / `rVuLzkZa` | USD $611 | [2164675367](https://app.kajabi.com/admin/themes/2164675367/settings/edit) | `1787984300001` |
| Camp Snooze (member) | [2151264520](https://app.kajabi.com/admin/offers/2151264520/edit) / `ENhg45mj` | AUD $878 | [2166737611](https://app.kajabi.com/admin/themes/2166737611/settings/edit) | `1787984400001` |
| Snooze Access w. Camp | [2151114090](https://app.kajabi.com/admin/offers/2151114090/edit) / `Lzouupsm` | USD $956 + $79/mo | [2165706743](https://app.kajabi.com/admin/themes/2165706743/settings/edit) | `1787984500001` |

The member AUD offer's existing block is `1787260138428`, not `1744906803654_0` like the other five. Read `block_order` before adding to any of these; do not assume the id.

All six verified after the push: two blocks each, refund clause present, Terms link present, agreement prompt present.

## What the block says

Place held in a live cohort with a fixed start date, full refund up to 72 hours before camp begins (Monday start, so the preceding Friday), missed calls and unused support create no entitlement, group confidentiality, and an agreement follows checkout. The payment-plan checkout adds that you remain liable for the full fee.

Mirrors Terms and Conditions **section 5B**, added the same day. Change one, change the other.
