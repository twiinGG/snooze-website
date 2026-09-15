# Bio page experiment

Owner: Kade Greenland. Prepared September 15, 2026.

Pathway: Acquisition. Outcome: compare the current custom page with a hosted copy of the actual Linktree page. Planning procedure: `docs/operations/BUSINESS-DEVELOPMENT-PLANNING.md`.

## Current release

Recreate Sally's updated Linktree content and layout at `/links-simple`: its profile photo, title, description, social links and six main destinations (membership, Camp, sleep guides, consultation, merchandise and ShopMy). Compare it with the existing `/links` page. Different menus are intentional. This tests the whole page; any effect cannot be attributed to layout alone. The control source matched Kajabi's stored HTML, CSS and JS on September 15, 2026.

The shared `/bio` router assigns visitors 50/50 and remembers their version in local storage. Both variants emit the same view and link events through the existing dataLayer. No new tracking vendor, price, trial term or checkout change. No Clarity script is added. Existing global scripts already treat paths containing `/links` and `/bio` as fast pages.

Release acceptance: review both layouts, verify all destinations and event semantics, populate Kajabi drafts and confirm persisted content. Activation follows the measurement checks below. Existing social bios remain on their current addresses until the complete route has been verified.

Capacity: agent implementation in this session, estimated 15 minutes of Kade's review and activation time. No new service spend. Proposed experiment cap: 42 days after verified activation, with a maximum of existing organic traffic. This does not start another paid acquisition release or require Sally to operate the platform.

## Files and build

Run from the repo root:

```sh
node apps/snooze-website/src/bio-experiment/build.mjs
node --test apps/snooze-website/src/bio-experiment/experiment.test.cjs
```

`build.mjs` reuses the canonical existing page in `kajabi-deployment/pages/landing/linktree/`. It generates complete single-block Kajabi fragments in `kajabi-deployment/pages/landing/bio-experiment/` and standalone local HTML previews beneath `preview/`. Edit source files, then rebuild. The existing control's canonical source remains intact; `control.html` is the instrumented deployment candidate.

| Artifact | Intended surface |
|---|---|
| `simple.html` | `/links-simple` landing page, complete code block |
| `control.html` | `/links` landing page, complete code block, only when activating |
| `router.html` | `/bio` landing page, complete code block |

The simple page has its own System Initialization CSS in `simple.css`, scoped to `#links-simple-page`. Landing pages use their own theme, so no shared website CSS edit is needed. Its social links follow the actual Linktree page.

## Measurement and decision

Hypothesis: the Linktree page's content and presentation change the proportion of observed visitors who choose a main destination compared with `/links`.

Primary: distinct observed users with at least one enrolled main destination click / distinct observed users with an enrolled page view, by variant over the same period. Exclude social, email and home/brand navigation. Count age-help pages and the podcast on control, and all six main cards on simple. Apply this same main-destination definition to both pages. These are analytics-observed users, not known unique people across devices.

Secondary: first-click events per page view, first choices by destination and Snooze direct-offer clicks. `first_click=true` identifies the first tracked click within one page load, including social/email; it is not the primary unique-user measure. The `commercial` field marks Snooze Camp, membership, the guides shop and direct consultation links. Merchandise and ShopMy remain noncommercial for this Snooze-specific measure but count toward the primary measure. Compare Instagram and TikTok separately as well as the combined randomized sample.

Checkout starts, trial starts and first paid charges need verified GA4 session joins and commerce reconciliation before they can support a sales conclusion. Two prior GA4 trial events had broken attribution; they are not a reliable baseline. Linktree's 92.9% is total clicks divided by views and is not the same measure as this primary metric.

Filter to `experiment_enrolled=true`. Exclude editor previews, QA traffic and non-randomized direct visits. `bio_preview=1` suppresses experiment events. Storage-blocked visitors receive a fresh assignment on return; report that limitation. With roughly 800 monthly views across the two current surfaces, 42 days may still end with insufficient evidence. Report confidence intervals and actual effect size; do not declare a winner just because the cap elapsed. Do not stop early on a favourable fluctuation.

Guardrails: no broken link or blocked navigation, no mobile horizontal overflow, same tracking delay on both variants and no changed offer terms. Restore the current bio destinations if a navigation defect occurs. Kade owns operation; review GA4 event receipt and routing after activation. Set any dated decision handoff only when the actual activation date is known.

## Activation and rollback

1. Configure and verify the GA4 mapping described in `measurement.md`. A dataLayer push alone is not GA4 collection.
2. Verify drafts at mobile, tablet and desktop widths. Keep the preserved `/links` theme preimage at `kajabi-deployment/_live-preimages/bio-layout-2026-09-15/links-theme.json`.
3. Commit/tag the scoped deployment files per the Kajabi checklist. Publish the simple page and router and install the instrumented control only after their persisted content and tracking are verified.
4. Check `/bio?bio_preview=1&bio_variant=simple` and the equivalent control preview. Verify production assignment separately using internal-traffic exclusion.
5. Point each platform bio to `/bio` with its own `utm_source=instagram` or `utm_source=tiktok`, `utm_medium=social` and `utm_campaign=link-in-bio`. Preserve platform source; do not add new campaign UTMs to internal destination links.
6. To stop, restore the previous bio addresses. Restore the preserved control theme if its instrumentation is defective. Keep Linktree available so old links still work.

Status is recorded in the generated deployment folder's `STATUS.md`. Draft creation is not experiment activation.
