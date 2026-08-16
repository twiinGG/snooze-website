# Checkout tracking (site-wide)

> **Order tracking moved to the server on August 16 2026. Read this before touching the Footer field.**
>
> The Footer order script **cannot work and never has**. These two fields inject on
> `/offers/<token>/checkout` only. They do **not** inject on the confirmation page
> `joinsnooze.com/thank_you/<token>`, and `window.Kajabi.order` is `null` there, so the
> script returns at its first guard on every page it is ever loaded on. Measured in a real
> buyer's browser, 2026-08-15:
> `{"footer":false,"header":false,"gtm":true,"kajabi":"object","order":null,"ls":[]}`
>
> `purchase`, `trial_started` and `free_claim` are now dispatched from the Kajabi
> `payment.succeeded` webhook by `workflows/n8n/kajabi-order-conversions/`. That source
> carries the amount actually charged, the stated currency, a stable transaction id and the
> customer identity fields Meta match quality was missing.
>
> The **Header** field is still live and now also carries the checkout identity capture
> that keeps server-dispatched purchases attributed to their acquisition channel.
>
> Design and evidence:
> `docs/projects/measurement/4_working/2026-08-16-order-tracking-consolidation/`.

**Kajabi:** Settings → Checkout → Checkout Tracking Code  
**Admin:** `/admin/settings/checkout`  
**Index:** [`../../PASTE-MAP.md`](../../PASTE-MAP.md) rows A4 / A5  
**How-to:** [`../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md`](../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md)

These two fields are **site-wide**. They are not Header Page Scripts and not per-offer theme JS.

**One file per field.** Never compose a Kajabi field from two repo files at paste time.

| Field | File | Live state 2026-08-16 | Action |
|---|---|---|---|
| Header tracking code | [`../html/checkout-header-tracking.html`](../html/checkout-header-tracking.html) | Present. GTM/Stape loader, Meta advanced matching, UTM capture. **Does not yet carry the checkout identity capture block added to this file on 2026-08-16** | Re-paste once, to ship the identity capture. See `03-KADE-GATE.md` step A4 |
| Footer tracking code | [`../js/kajabi-checkout-tracking.js`](../js/kajabi-checkout-tracking.js) | **Not empty.** Holds an earlier build of the order script, live since about 2026-07-11, which has emitted zero events in five weeks because it cannot run | **Do not re-paste.** Clear the field once the server path is proven on a real order |

The footer script classified confirmed Kajabi orders in this order:

1. A positive amount emits `purchase`.
2. A zero-value order on trial offers `2150887297` or `2151254578` emits `trial_started`.
3. Any other zero-value order emits `free_claim`.

That classification is correct and it now lives in
`workflows/n8n/kajabi-order-conversions/classify-order.js`, running against the webhook
instead of the browser. The rules are unchanged: dedup by order id, no customer PII in any
browser payload, and a zero-value order never reaches Meta.

The repository file is kept as the record of what was live in that field. It is no longer a
paste target.

[`../js/meta-advanced-matching.js`](../js/meta-advanced-matching.js) is a **fragment**, not a paste target.

Per-offer `inject_header_tracking_code` / `inject_footer_tracking_code` gate whether these inject into that offer’s checkout.

## AUD_OFFER_IDS drift guard

> **Closed for revenue reporting as of 2026-08-16.** The allowlist only ever guessed the
> currency when Kajabi's payload omitted `order.currency`. The `payment.succeeded` webhook
> always states `payment_transaction.currency`, so the server path never guesses and this
> class of bug cannot occur there. The section below still describes the live Footer field,
> which is dead code pending removal.

`AUD_OFFER_IDS` in [`../js/kajabi-checkout-tracking.js`](../js/kajabi-checkout-tracking.js) is a hard-coded
fallback allowlist used only when Kajabi’s checkout payload omits `order.currency`. In that case
`detectOrderCurrency()` looks up `order.offer_id` in the array and calls it AUD if present — **and
USD if not**. There is no error path: an AUD offer missing from the list simply reports its revenue
as USD in the `purchase` dataLayer event. This only matters for AUD offers; new USD offers need no
change.

**Run the drift check:**

```
node scripts/check-aud-offer-ids.mjs
```

It authenticates to the live Kajabi REST API (client-credentials OAuth via `KAJABI_CLIENT_ID` /
`KAJABI_CLIENT_SECRET` in repo-root `.env`) and diffs every offer’s `currency` — published **and
draft**, the API does not filter by status — against `AUD_OFFER_IDS`. If those credentials aren’t
available, pass `--from-file` with a saved Kajabi MCP `list_offers` response instead (see the
script’s header comment for the exact call). Exit 0 = clean, exit 1 = drift found, exit 2 = couldn’t
get offer data.

**A passing script does not mean the array is safe to ship.** Editing `AUD_OFFER_IDS` in git changes
nothing live — this file is a paste-to-Kajabi artifact. A change only takes effect after a **manual
re-paste into Kajabi: Settings → Checkout → Checkout Tracking Code, Footer field**
(`/admin/settings/checkout`).

**Known gap as of 2026-08-14:** the drift check found 5 live AUD offers missing from
`AUD_OFFER_IDS`. Four are draft, paid offers that will misreport revenue as USD the moment they are
published: `2150892419` ($197 AUD, Camp Snooze + Full Snooze Access), `2150913797` ($690 AUD, Camp
Snooze), `2151266803` ($59.50 AUD, Camp Alumni Bonus), `2151267215` ($59.50 AUD, Camp Alumni
Membership). A fifth, `2149588444` ("Community"), is a free offer (`price_in_cents: 0`) — it’s
technically AUD-tagged but has no revenue-misreporting impact since `amount` is 0 and the script
classifies it as `free_claim`, not `purchase`. None of these five have been added to
`AUD_OFFER_IDS` — this file is read-only during the ME-007 measurement cutover, and adding them now
would let the git file and the live Kajabi field diverge right before a deliberate paste. Add all
five (or at least the four paid ones) the next time this Footer field is intentionally re-pasted.

**Hook coverage limit.** `.claude/settings.json` has a `PostToolUse` hook on
`mcp__kajabi__create_offer` / `mcp__kajabi__update_offer` that prints a warning (offer id, AUD
reminder, manual re-paste requirement, drift-check command) whenever an offer is created or updated
through the Kajabi MCP in this harness. **It cannot see offers created directly in the Kajabi admin
UI** — which is how all five of the offers above were created. The hook is a nudge for the
code/MCP path only; the drift check above is the actual coverage for everything else, and should be
run periodically regardless of how offers get created.
