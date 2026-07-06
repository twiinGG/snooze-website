# LMCR04 Day 0 Membership Bridge Patch

**Date:** July 06, 2026  
**Goal:** tighten the first-touch bridge from the 5-12 Month Schedules free module into the Snooze Membership.

## Why this patch exists
The LMCR04 funnel had already been pivoted to membership on:
- Day 2
- Day 4
- Day 6
- the in-course bridge lesson
- the thank-you page

But the **Day 0 welcome email** was still acting like a pure access email. It handed over the free module, but it did not set up the membership as the natural next step.

That creates a leak right at the highest-intent moment.

## File changed
`apps/snooze-website/course-free-modules-conversion/src/content/bundles/LMCR04/emails/LMCR04-day-0-welcome.html`

## What changed
1. Added a soft framing paragraph that explains the module is one piece of the bigger sleep picture.
2. Introduced the Snooze Membership as the place where all support lives.
3. Added a soft-link CTA with its own UTM tag:
   - `utm_source=512funnel`
   - `utm_medium=email`
   - `utm_campaign=snooze_membership`
   - `utm_content=day0`
4. Cleaned the wording from `sync-ing` to `syncing`.

## Paste target
Kajabi sequence email:
- **Sequence:** `EMLM04_5-12m Schedule LM Flow`
- **Day 0 email ID:** `2150965669`

## Paste instructions
1. Open the Day 0 email in Kajabi.
2. Replace the body with the current contents of `LMCR04-day-0-welcome.html`.
3. Save.
4. Send a test email.
5. Confirm the membership link resolves to:
   `https://joinsnooze.com/?utm_source=512funnel&utm_medium=email&utm_campaign=snooze_membership&utm_content=day0`

## Done test
- Day 0 email saved in Kajabi with the new copy.
- Test email received.
- Membership CTA present.
- UTM string intact.

## Expected result
This does not change the offer. It changes the framing earlier.

The win condition is simple: more Day 0 readers click through to the membership before they drop off the nurture.

## Immediate next check
Compare Day 0 membership clicks against Day 2, Day 4, and Day 6 once enough traffic lands.
