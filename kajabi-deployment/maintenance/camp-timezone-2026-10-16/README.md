# Camp timezone correction

Date: October 16, 2026
Owner: Kade Greenland
Releases: website-v1.6.17 and website-v1.6.18

Scope: Kade requested a scan and correction of current Camp times to AEDT / UTC+11. This routine repair preserves stored UTC booking cutoffs, scheduled event times, pricing and entitlements. Bec prepares and shares plans; Louise sends them from Sally's email. Existing delivered emails cannot be edited.

## Live targets

| Surface | Theme |
| --- | --- |
| [Camp landing page](https://app.kajabi.com/admin/landing_pages/2151771543/edit) | 2164288957 |
| [USD checkout](https://app.kajabi.com/admin/offers/2150884129/edit) | 2164289025 |
| [AUD checkout](https://app.kajabi.com/admin/offers/2150946767/edit) | 2164667756 |
| [USD member checkout](https://app.kajabi.com/admin/offers/2150947919/edit) | 2164675367 |
| [AUD member checkout](https://app.kajabi.com/admin/offers/2151264520/edit) | 2166737611 |
| [Additional checkout](https://app.kajabi.com/admin/offers/2151134284/edit) | 2165964553 |
| [Additional checkout](https://app.kajabi.com/admin/offers/2151114090/edit) | 2165706743 |
| [One-time AUD checkout](https://app.kajabi.com/admin/offers/2151378119/edit) | 2167449280 |

Welcome automation copy: [non-member, 462675](https://app.kajabi.com/admin/workflows/462675/edit) and [member, 463141](https://app.kajabi.com/admin/workflows/463141/edit). The API refused both edits without mutation. The admin editor was used to replace only the existing email's timezone text. Readback verified preserved trigger resources, node identities, edge connections and published status. The editor normalised HTML whitespace and explicit simple-email publication options. API chain payloads are review records, not a supported execution route for these workflows.

## Implementation and validation

Display current call times as 10-11am AEDT / UTC+11. Deadline timestamp conversion uses Australia/Melbourne, including AEST / UTC+10 for dates outside daylight saving. Remove the fixed overseas equivalent and static deadline fallback. Historical evidence retains its original wording.

Local deadline tests passed: nine tests, including summer conversion and winter regression. Placeholder scan passed on the exact deployment code. Environment validation passed using the existing public Supabase key alias in process only. Linkinator checked 23 links: five occurrences across three Kajabi URLs returned HTTP 403 to its automated client. Browser verification rendered both checkouts and the community link reached its expected login page. Other checked links passed. No links changed.

The Camp confirmation page, Welcome To Camp lessons, four confirmation sequence emails and current Camp 18/19 forum posts were scanned. No timezone correction was needed there. Current events already use Australia/Melbourne.

## Deployment and rollback

Raw theme preimages, minimal partial deploy settings and rollback settings are retained outside Git at `/tmp/camp-timezone-private-2026-10-16/`. They contain embedded tokens and must stay private. The tracked transform.py records the exact substitutions; full reusable HTML/JS sources are tracked in the landing and checkout directories. Automation rollback files restore the original complete action chain. Apply through the matching Kajabi update tools, then read back the full settings and workflow structure. Do not run a test send or resend email as part of this copy repair.

Post-deployment results are recorded in the operations batch audit after readback.
