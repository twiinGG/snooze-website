# LMCR04 Attribution Map and Gaps

**Date:** July 06, 2026  
**Action:** rev-2 repair the 512 attribution path so post -> DM -> freebie -> membership joins can be measured.

## Goal
Make the 512 funnel answer one simple question:

**Which touchpoints are actually creating membership joins?**

## Current tracked path

| Step | Surface | Link target | Current tracking state |
|---|---|---|---|
| 1 | Instagram comment trigger | ManyChat DM | Documented live flow |
| 2 | ManyChat DM | Free module offer `2x92uaLF` | UTM present: `utm_source=instagram`, `utm_medium=organic`, `utm_campaign=lmcr04_comment_access`, `utm_content=512_comment_dm` |
| 3 | Free module claim | Kajabi tag + EMLM04 sequence | Documented live handoff via `LM_512_schedule` |
| 4 | Day 0 email | Snooze Membership homepage | UTM present: `utm_source=512funnel`, `utm_medium=email`, `utm_campaign=snooze_membership`, `utm_content=day0` |
| 5 | Day 2 email | Snooze Membership homepage | UTM present: `utm_content=day2` |
| 6 | Day 4 email | Snooze Membership homepage | UTM present: `utm_content=day4` |
| 7 | Day 6 email | Snooze Membership homepage | UTM present: `utm_content=day6` |
| 8 | In-course bridge lesson | Snooze Membership homepage | UTM present: `utm_medium=course`, `utm_content=bridge` |
| 9 | Thank-you page | Snooze Membership homepage | UTM present in repo: `utm_medium=landing`, `utm_content=thankyou_page` |

## What is already good
1. The membership touchpoints now have distinct `utm_content` values.
2. The freebie claim entry point is distinct from the membership touchpoints.
3. The naming is human-readable. That means an operator can tell where a join came from without decoding junk IDs.

## What is still broken
### 1) The path is tagged, but not yet operator-visible
The repo shows the links are tagged. That is not the same as having a usable operator view.

Right now the likely live question still cannot be answered quickly:
- how many free-module claims came from `512_comment_dm`
- how many membership joins came from `day0`
- how many came from `day2`, `day4`, `day6`, `bridge`, `thankyou_page`

### 2) Paste-state still matters
Some tracking is only useful if the right assets are actually live.

The repo confirms these UTM values exist in source assets. It does **not** prove every asset has been pasted and saved in Kajabi / ManyChat.

### 3) The wider analytics layer is still not fully green
`PRD-TRACK.md` still shows:
- analytics-ops daily scheduler not restored
- AUD GA4 checkout verification failed
- verification artefacts not yet signed off

That does not stop us from tagging the 512 funnel correctly, but it does stop this from being fully trustworthy at scale.

### 4) The existing first-party capture table is the wrong instrument for this funnel
`paid_media.lead_attribution_capture` is purpose-built for the Snooze Access paid-ads quiz flow. It is **not** the storage layer for the 512 organic lead magnet path.

That means rev-2 cannot be solved by pointing operators at the paid-ads attribution table. For the 512 funnel we need a separate organic capture step at claim time, then a join forward to membership signups.

## Recommended operator view
Use one simple reporting shape for the 512 funnel:

| Metric | How to group it |
|---|---|
| Free module claims | `utm_campaign=lmcr04_comment_access`, `utm_content=512_comment_dm` |
| Membership clicks from nurture emails | `utm_campaign=snooze_membership`, grouped by `utm_content=day0/day2/day4/day6` |
| Membership clicks from owned surfaces | grouped by `utm_medium=course` and `utm_medium=landing` |
| Membership joins | grouped by the same UTM fields on the membership side, or by an organic-source field captured at the freebie claim step |

## Minimum done test for rev-2
rev-2 is only done when an operator can answer all four of these without guesswork:

1. How many people claimed the free module from the 512 Instagram comment flow?
2. How many membership clicks came from each nurture touchpoint?
3. Which touchpoint produces the most membership joins?
4. Whether the AUD and USD membership paths are both reporting cleanly.

## Practical next steps
1. Confirm the live paste state for:
   - ManyChat DM link
   - Day 0 email
   - Day 2 email
   - Day 4 email
   - Day 6 email
   - in-course bridge lesson
   - thank-you page
2. Add an organic claim-time capture step for the 512 funnel. Minimum fields:
   - `entry_source=instagram`
   - `entry_medium=organic`
   - `entry_campaign=lmcr04_comment_access`
   - `entry_content=512_comment_dm`
   - claimed email
   - claim timestamp
3. Build the operator view or query that joins that organic claim record to membership signups by email and timestamp.
4. Treat the wider `PRD-TRACK` blockers as still open until the scheduler and AUD GA4 gap are fixed.

## Files used for this map
- `docs/operations/automations/manychat/lmcr04-comment-to-dm-flow.md`
- `apps/snooze-website/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-0-welcome.html`
- `apps/snooze-website/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-2-bigger-picture.html`
- `apps/snooze-website/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-4-snooze-pivot.html`
- `apps/snooze-website/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-6-gentle-nudge.html`
- `apps/snooze-website/course-free-modules-conversion/src/content/bundles/LMCR04/html/LMCR04-free-module-summary-upsell.html`
- `apps/snooze-website/course-free-modules-conversion/src/content/bundles/LMCR04/html/LMCR04-thank-you-access.html`
- `docs/projects/business-model/prds/PRD-TRACK.md`
