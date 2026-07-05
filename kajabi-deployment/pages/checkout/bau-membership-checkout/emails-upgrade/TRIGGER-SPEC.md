# Month-2-3 Annual Upgrade Moment: Trigger Spec

**Owner:** PRD-LADDER (BM-001) section 5(b). Authored 2026-07-05.
**Status:** draft, awaiting Sally sign-off. Automation itself is built by a human
(Kade) in the Kajabi admin UI, since automations cannot be created via API or MCP.
This document is the handoff spec for that admin-UI step.

## Purpose

Reach a settled monthly or quarterly member in the window where they are most
upgradeable (month 2-3), and offer the annual plan as the honest next step. Feeds
the Gate 2 (M9) annual-mix clause.

## Audience / entry condition

A member enters this sequence when ALL of the following are true:

- Member age is between 60 and 90 days since their BAU membership started.
- They are on the monthly OR quarterly variant of the BAU membership offer, in
  either currency:
  - USD offer `z63s9VaR` / 2150754998, variant monthly `68112` or quarterly `37262`.
  - AUD offer `vYgCNgJz` / 2151256977, variant monthly `161174` or quarterly `161175`.
- Status is active: NOT past-due, NOT cancelled, NOT paused.
- They are NOT already on an annual variant (`37263` USD / `161176` AUD).

## Exit / suppression conditions

Remove the member from the sequence immediately if, at any point:

- They upgrade to the annual variant (goal met).
- They cancel or go past-due (they move to the failed-payment / churn flows
  instead; do not cross-send).
- They are a Camp Snooze cohort member inside an active cohort window (Camp has its
  own comms; do not overlay generic upgrade emails). See the data-honesty rule:
  never assume a member state we cannot verify.

## Currency routing

Send the `emails-usd/` copy to members whose offer is the USD offer, and the
`emails-aud/` copy to members whose offer is the AUD offer. The only difference
between the two sets is the checkout link in the CTA (USD `z63s9VaR`,
AUD `vYgCNgJz`). Prices are never printed in the copy; the saving is stated as a
proportion (~30% vs paying monthly across 12 months, registry-derived).

## Cadence

Three emails across the window, spaced so the member is not crowded:

| Step | Send | File (per currency) | Theme |
|---|---|---|---|
| 1 | Day 0 of entry (member age ~60d) | `email-1-lock-in-the-journey.html` | Progress to date, one decision not twelve |
| 2 | +5 days | `email-2-months-free-saving.html` | The annual saving, stated as a proportion |
| 3 | +5 days | `email-3-community-story.html` | Community growth + a real member quote |

Stop the sequence the moment the exit condition is met.

## Compliance

All three emails follow Sally's email voice (`x Sally` sign-off, "me or one of my
Snooze team", double-curly merge fields, no throat-clearing, no em dashes) and the
CU-001 principles register: P1 (access-not-duration language), P3 (service-model
truth, no standing live-question-session promise), P6 (no named method product), P7
(structure-with-flexibility, not soft-descriptor), P2 (no round-the-clock
human-support claim), P18 (Australian spelling). No fabricated member stats. The
member quote in email 3 is a real, consented, already-published Camp Snooze
verbatim (see the file header comment for provenance).
