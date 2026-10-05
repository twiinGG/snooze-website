# CFB-002 campaign source

Reconciled to the [native reviewed setup document](https://docs.google.com/document/d/1L9uR3vizFeBEAXCbLiLTS1bNk0-A1sFQxsioYT7_NWw/edit), including all 11 emails and organic promotion. First-person Sally copy uses the reviewed title and AEDT (GMT+11). Email 3 corrects the obvious “Ymy” typo to “My”. No campaign code is stored here.

Kade owns technical coordination. Sally owns clinical approval. The release covers the October 07, 2026 webinar and October 19, 2026 Camp with all email actions disabled. Planning follows [Business development planning](../../../../../docs/operations/BUSINESS-DEVELOPMENT-PLANNING.md).

## Run independently

```sh
python3 -m unittest discover -s apps/snooze-website/src/campaigns/cfb002/tests -v
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --check-dates
python3 apps/snooze-website/src/campaigns/cfb002/rehearse_replay.py
```

The rehearsal needs the existing local ffmpeg and Pillow. It generates a labelled temporary test recording with an ephemeral synthetic closing code, exercises a loopback media origin then removes all test media. It does not publish the actual webinar. Replay expiry starts at actual publication, 72 hours later; a delay never moves the Camp cutoff.

## Source and rendering

`campaign-copy.json` preserves reviewed subjects, previews, body paragraphs, audience notes and intended absolute dates. `copy/` contains all 11 inline HTML bodies and `draft-inventory.json`. Every email has `enabled: false`, `send_at: null` and `trigger_armed: false`. Inventory body paths resolve relative to this campaign directory. They are portable across checkouts. Platform tooling resolves absolute paths at runtime.

`prepare.py --render-email-drafts` regenerates inert email HTML. A CTA stays a disabled label unless its resource has receiving-system behavior proof. The inventory records each unresolved dependency. No invented URL, parked send date or delivery claim is used. Kajabi supplies compliance footer content.

The designed page implementation is [design/templates.py](design/templates.py). The guarded renderer calls its registration, joining, replay and Camp functions. Missing readiness inputs can be previewed through the design module, but production rendering requires the corresponding proof declarations in `resource-bindings.json` and `preparation-manifest.json`. A proof flag does not inspect or verify a live system. Receiving-system evidence remains mandatory.

```sh
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --check-release --resources apps/snooze-website/src/campaigns/cfb002/resource-bindings.json
```

Current bindings fail closed. For production output, use `--asset registration`, `thank-you`, `calendar`, `replay` or `booking`, a verified resource file and `--output`. Registration requires the actual native form embed and consent/redirect/no-email checks. Joining and ICS require a room with verified guest privacy and observe-only chat. UTC ICS starts `20261007T000000Z` and ends `20261007T005000Z`; it sends no calendar invitations.

## Booking and suppression

`booking_policy.py` is an executable local policy contract. Its SQLite adapter uses a transaction to contend for the final seat. It checks the shared code at authorization and final payment start, accepts forwarded codes, requires trustworthy actual waitlist state on Friday and opens public booking Monday. Exact close is `2026-10-14T12:59:00Z`. A pre-close authorization cannot start payment after close. A payment already in flight keeps its slot until a verified final outcome. Accepted purchases stay protected. Only two verified recurring AUD/USD offers are allowed. Existing obligations are preserved.

`audience_policy.py` reads fresh purchase and consent state at evaluation time. Purchases suppress sales regardless of payment route; later openings suppress earlier recipients. Late registration skips elapsed reminders, and the confirmation ledger prevents duplicates across Event/Sequence ownership. The module has no transport. Delivery-ledger writes are explicitly blocked. Test fixtures seed historical delivery records only to verify suppression.

These modules are **not deployed Kajabi enforcement**. Existing `camp-sold-count-sync` reconciles after purchase. Existing Memory API routes support generic proposals and approvals, but no checkout/payment interception was found. [deployment-contract.json](deployment-contract.json) records the concrete proposal body, capability gap and required adapter contract. No actor identity or capability is impersonated. No canonical schema, registry, offer or entitlement was changed.

## Deployment and rollback

Before any authorised publication, commit scoped source with hooks, tag the release, capture the live preimage and follow the [deployment checklist](../../../docs/DEPLOYMENT-CHECKLIST.md). Restore the captured source through the same token-safe paste path for rollback. All email-bearing actions remain disabled. Production sales stay held until the supported final-payment operation and every direct-checkout bypass are verified. Real recording publication remains a future event input.
