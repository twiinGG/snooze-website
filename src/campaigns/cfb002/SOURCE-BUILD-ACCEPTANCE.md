# CFB-002 source build acceptance

**Date:** October 05, 2026. **Owner:** Kade Greenland. **Source/build executor:** GPT-6.1 Sol. **Pathway:** Acquisition.

Release boundary: October 07, 2026 webinar and October 19, 2026 Camp. All email actions remain disabled. Source preparation and fixture tests pass. Platform publication, registration, actual room privacy and final-payment enforcement remain separate receiving-system acceptance gates. Planning follows [Business development planning](../../../../../docs/operations/BUSINESS-DEVELOPMENT-PLANNING.md).

## Built

| Requirement | Source evidence | Result |
|---|---|---|
| Native reviewed title and first-person copy | `campaign-copy.json`, 11 `copy/*.html` bodies | Exact reviewed body paragraphs, subjects, previews and organic copy reconciled. Email 3 obvious typo corrected to “My webinar details” with authority in provenance. |
| Absolute dates and timezone | `prepare.py`, project `session-config.json`, presenter pack | AEDT (GMT+11). Webinar October 07, 11 to 11:50 am. Close exactly `2026-10-14T12:59:00Z`. |
| Every email saved locally despite unresolved CTA | `copy/draft-inventory.json` | 11 inline HTML bodies, draft status, null send time, no armed trigger. Unverified destination is an inert label with explicit dependency. Portable paths resolve relative to campaign source directory. No delivery claim. |
| Design integration | `prepare.py` imports Astra’s `design/templates.py` | Registration, joining, replay and Camp functions use verified inputs. Missing prerequisites fail closed for production rendering. |
| Shared code and staged access | `booking_policy.py` | Correct/incorrect/missing and forwarded code; Thursday boundary, trustworthy Friday waitlist, Monday public stage and exact cutoff covered in fixtures. No attendance import or identity claim. Code stays private. |
| Recurring payments only | Injected verified `Offer` contract | Exactly AUD and USD recurring offers with setup, monthly and renewal disclosures. Other routes rejected. Fixture prices use reviewed prior terms and do not set canonical pricing. |
| Capacity and payments | Local SQLite transaction adapter | Eight concurrent last-seat contenders produce one reservation. Authorization expires after 15 minutes. Before-close authorization cannot start payment after cutoff. Already in-flight/accepted payments retain protection. Ambiguous provider outcome stays held; verified final failure releases capacity. |
| Purchase suppression and deduplication | `audience_policy.py` | Fresh purchase/consent evaluation; late registrations skip elapsed reminders; historical confirmation/opening ledger deduplicates. Sales suppressed for buyers or pending payment. Transport and delivery-ledger writes disabled. |
| Replay readiness | `replay_lifecycle.py`, `rehearse_replay.py` | Review identity required, test media cannot masquerade as real recording, actual publication plus 72 hours. Guarded origin returns 404 before publication, 200 during availability and 410 at expiry. Media removal requires a positive callback result. |
| Fail closed security flags | Negative runtime type tests | False-like strings, `None`, zero and one cannot pass completeness, consent, recording review or provider verification gates. |

## Independently runnable checks

```sh
python3 -m unittest discover -s apps/snooze-website/src/campaigns/cfb002/tests -v
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --check-dates
python3 apps/snooze-website/src/campaigns/cfb002/rehearse_replay.py
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --check-release --resources apps/snooze-website/src/campaigns/cfb002/resource-bindings.json
```

Unit fixtures: **43 passed** after independent verifier feedback corrected false-like security flags and the renderer’s before-opening/closed stage selection. The release-check command is expected to exit 1 for current unverified platform bindings. It cannot certify a live receiving system.

Replay rehearsal produced a labelled, two-second synthetic MP4 in a temporary directory. The original ffmpeg drawtext attempt failed because that filter is unavailable. The same local lane was repaired by generating a title card with existing Pillow and encoding it with ffmpeg. Re-run passed; temporary MP4 and title card were removed. Actual fixture publication was Wednesday October 07 at 09:30 UTC, 30 minutes after target; fixture expiry was October 10 at 09:30 UTC. The Camp cutoff stayed unchanged. This is a simulated clock and local HTTP test, not actual webinar publication.

## Exact production dependency

No supported final-payment hook was found in existing source. `services/memory-api/src/routes/` exposes generic `POST /proposals` and `POST /approvals/:id/decide`, but no Camp checkout authorization or provider payment interception. `packages/kajabi-client/src/client.ts` has no Camp authorization/payment operation. `supabase/functions/camp-sold-count-sync/` counts verified purchases after payment; it cannot stop a payment.

[deployment-contract.json](deployment-contract.json) carries a concrete proposal body and required server contract. Proposed capability `propose_cfb002_booking_control` is not registered. Actor and correlation identifiers are unresolved rather than borrowed from another agent. The proposal was not submitted. A human-approved, registered server operation plus supported Kajabi/provider final-payment interception and bypass disabling must exist before this local policy can govern production. Any needed canonical schema/registry changes must be proposed and tested on a branch under the governing route.

The SQLite policy is a local fixture adapter. It does not prevent a buyer opening an existing raw Kajabi checkout URL. It does not grant or revoke entitlements. Existing accepted purchases and one-time obligations were not changed. The proposal carries freshly read recurring offer identities and the confirmed 15-family cap, with source receipts and exact expected-state preconditions. Renewal/cancellation terms, waitlist proof and current buyers must still be revalidated by the trusted adapter. The cap does not establish zero buyers. Registered identity and server throttling are required. Do not promote fixture booleans into production proof.

Real recording, Sally’s clinical teaching approval and actual guest/privacy rehearsal are future or human inputs. Production replay hosting must revoke origin access and alternate raw media URLs at expiry; the local origin guard does not configure a Kajabi host. All scoped email-bearing actions remain disabled, including confirmation and transactional paths. No emails, real registrations, payments or grants were triggered by this source lane.

## Integration and rollback

The orchestrator records source commits, placeholder/env checks and receiving-system readbacks in the project build acceptance. This lane used no Git commands. Live preimages, tag-before-deploy and token-safe paste remain prerequisites from the [deployment checklist](../../../docs/DEPLOYMENT-CHECKLIST.md). Restore each captured preimage through the same supported route. The source build does not authorise canonical execution or new spending.
