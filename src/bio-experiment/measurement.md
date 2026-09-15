# Bio experiment measurement

Status: implementation contract only. The page scripts queue events; they do not configure or verify GA4 delivery. Enable and verify this mapping before allocating experiment traffic or interpreting a winner.

## Existing integration

Use the existing [Snooze web container](https://tagmanager.google.com/#/container/accounts/6058575269/containers/94440381/workspaces) (`GTM-KNRTH6P`). Inspect its current version before adding anything. The August 13, 2026 verified configuration is documented in `docs/projects/measurement/4_working/2026-08-13-funnel-tracking-cutover/WS1-GTM-DIFF-FOR-REVIEW.md`.

The documented working GA4 event tag pattern is:

- Type `gaawe` (GA4 Event).
- `measurementIdOverride`: `{{GA4 Id}}`.
- `eventSettingsVariable`: `{{SS Data}}`.
- `sendEcommerceData`: `false`.
- `tagFiringOption`: `oncePerEvent`.
- Parameters through `eventSettingsTable`, reading flat data layer variables.

The documented `GA4 Id` is a placeholder value rewritten by the existing Stape route. Reuse the verified current route. Do not introduce direct browser dispatch to a different measurement ID. Inherit the current container's consent controls; the dated snapshot's `consentStatus: notSet` is evidence, not a requirement to weaken current settings.

## Required additions

Create version 2 Data Layer Variables named `dlv - <key>` for each key below. Reuse an existing variable only if its data layer key matches exactly.

| Key | Events |
|---|---|
| `experiment_id` | Both |
| `variant` | Both |
| `experiment_enrolled` | Both |
| `link_id` | Click only |
| `commercial` | Click only |
| `first_click` | Click only |
| `first_commercial_click` | Click only |

Add one exact Custom Event trigger and one GA4 Event tag for each of `bio_experiment_view` and `bio_link_click`. Event names match the trigger names. Map only the applicable parameters from the table. Page location, device and session source use the existing GA4 configuration.

Register event-scoped custom dimensions for all seven keys in [GA4 property 401774815](https://analytics.google.com/analytics/web/#/p401774815/admin/customdefinitions). Confirm how boolean values arrive before filtering on them. Registration enables reporting of these parameters going forward; it does not backfill past reports.

## Report definition

Compare only events with `experiment_id=bio_layout_v1` and `experiment_enrolled=true`. Direct visits are observational traffic. Preview mode emits no experiment events. Split results by variant and inspect source/medium and mobile traffic separately.

Primary measure: distinct observed users with an enrolled commercial `bio_link_click`, divided by distinct observed users with an enrolled `bio_experiment_view`, for each variant in the same period. Use event conditions to build those user sets. Summing clicks or dividing click events by view events measures clicks per view, not unique visitor click-through rate.

`first_click` and `first_commercial_click` reset per page load. They describe the first choice on that page load, not the first choice across the user's experiment history. Variant persistence applies to a browser and origin, not a person across devices or separate social-app browsers. Blocked storage allows repeat allocation; disclose this limitation.

Report age-help destination choices individually alongside trial, Camp and consultations. Document which IDs carry `commercial=true` before interpreting the primary result. Compare only the same link inventory and definitions across variants.

Checkout starts and trial starts can be explored with ordered user/session funnels beginning at the enrolled variant event. These page scripts do not attach experiment parameters to downstream purchases. Do not claim paid conversion attribution until the actual downstream join is verified.

## Release verification

1. Preview the current container with each variant using `bio_experiment=bio_layout_v1`. Do not use `bio_preview=1` for this check because that intentionally suppresses events.
2. Confirm exactly one view event per load and one click event per activation, including keyboard and middle-click. Check IDs, enrollment and first-choice flags.
3. Confirm both new GA4 tags fire through the existing Stape route and that the events and parameters reach GA4 DebugView. A successful data layer push or GTM preview alone is insufficient.
4. Check direct visits emit `experiment_enrolled=false` and preview visits emit no experiment events. Confirm both allocations preserve incoming campaign parameters.
5. Check an early trial click during the existing 1.5-second GTM delay. Navigation can discard a queued same-tab click before GTM loads. Bound that loss before trusting variant differences, since layout can change click timing.
6. Confirm Clarity sends no requests on either variant. The August 13 snapshot blocks Clarity tags 183 and 188 with trigger 184, `Page Path contains /links`, which also matches `/links-simple`. Recheck current live behaviour; historical configuration is not live proof.

The global fast-page detector also contains `/links`, so `/links-simple` inherits the existing 1.5-second tracking delay. Keep both variants on one canonical host to avoid separate browser assignments.
