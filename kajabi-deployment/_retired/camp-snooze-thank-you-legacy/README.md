# Retired: the pre-confirm-page camp thank-you assets

Retired 2026-08-25, as part of the single-intake urgency change.

| File | Superseded by | Why it had to go |
|---|---|---|
| `camp-snooze-thank-you-page.html` | `pages/landing/camp-snooze-confirm/`, live at `/camp-confirm` | Hardcoded January 2026 dates in two zones: "Friday, January 23 (AEDT) / Thursday, January 22 (ET)", "camp starts Tuesday, January 27", "Kick-off Call (Tuesday, January 27, 10-11am AEDT)". Seven months stale. The live page reads its dates from the cohort feed instead, so it cannot go stale that way again |
| `camp-snooze-thank-you-page-brief.html` | same | The brief for the page above |
| `camp-snooze-post-purchase-email.html` | The four live confirmation emails; bodies at `docs/strategy/paid-scaling/4_working/2026-08-camp-funnel-completion/email-bodies/A1-A4.html` | Replaced by the four-armed confirmation emails, which carry the arm-correct billing paragraph this one has no equivalent of. It holds no dates, so it is retired for being superseded rather than for being wrong |

Nothing here is a paste target. The live post-purchase path is: the offer's thank-you redirect to `/camp-confirm`, then the confirmation email for that buyer's arm (AUD or USD, member or non-member).

`docs/projects/business-model/4_working/ALUMNI-OFFER-BUILD-PLAN.md` cites the first and third file for their alumni-rate paragraph. That paragraph survives at `pages/landing/camp-snooze/emails/EMCMAL01/close-out-perk-paragraph.html`, which is where to read it now.
