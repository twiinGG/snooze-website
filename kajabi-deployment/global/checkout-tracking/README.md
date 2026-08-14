# Checkout tracking (site-wide)

**Kajabi:** Settings → Checkout → Checkout Tracking Code  
**Admin:** `/admin/settings/checkout`  
**Index:** [`../../PASTE-MAP.md`](../../PASTE-MAP.md) rows A4 / A5  
**How-to:** [`../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md`](../../../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md)

These two fields are **site-wide**. They are not Header Page Scripts and not per-offer theme JS.

**One file per field.** Never compose a Kajabi field from two repo files at paste time.

| Field | File | Live 2026-07-27 | Action |
|---|---|---|---|
| Header tracking code | [`../html/checkout-header-tracking.html`](../html/checkout-header-tracking.html) | Present (GTM/Stape loader) | **Do not re-paste** unless changing this file. To ship Advanced Matching, inline [`../js/meta-advanced-matching.js`](../js/meta-advanced-matching.js) into this file in git first, then overwrite once |
| Footer tracking code | [`../js/kajabi-checkout-tracking.js`](../js/kajabi-checkout-tracking.js) | **Empty** | Deploy only with the coordinated GTM order-bound cutover |

The footer script classifies confirmed Kajabi orders in this order:

1. A positive amount emits `purchase`.
2. A zero-value order on trial offers `2150887297` or `2151254578` emits `trial_started`.
3. Any other zero-value order emits `free_claim`.

A missing order ID emits nothing. All order events deduplicate by order ID and
exclude customer PII. GTM remains the only GA4 and Meta dispatcher.

[`../js/meta-advanced-matching.js`](../js/meta-advanced-matching.js) is a **fragment**, not a paste target.

Per-offer `inject_header_tracking_code` / `inject_footer_tracking_code` gate whether these inject into that offer’s checkout.

## AUD_OFFER_IDS drift guard

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
