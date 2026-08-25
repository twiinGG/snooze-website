# Camp Snooze email copy

## Status, 2026-08-25

The funnel sells one intake at a time (see `../camp-snooze-v2-luxury/CHANGELOG.md`, 2026-08-25). Every camp email here was swept the same day for language that assumed a buyer could pick from a list of dates, and for dates hardcoded to a camp that has already run.

| Directory | What it is | Live? |
|---|---|---|
| `EMCMWL02/` | Waitlist launch, three emails: open, inside, last chance | **No.** Template only. Its old Kajabi sequence `2148763296` is retired |
| `EMCMWL04/` | Waitlist launch, three emails: results, stories, last chance. The later, better-performing pair of the two | **No.** Template only. Its old Kajabi sequences `2148778715` (#4) and `2148816627` (#8) are retired |
| `EMCMAL01/` | Alumni win-back, two emails, plus the close-out perk paragraph | Copy holds no camp dates, so the sweep changed nothing here |

## Why the live waitlist sequences are retired rather than fixed

Four sequences existed, one per past camp: EMWL02 (January 2026), EMWL03 (February 2026), EMWL04 #4 and EMWL04 #8. All twelve of their emails are **theme-builder emails that were published**, and a published theme-builder email delivers a snapshot taken at publish time. Editing the theme does not change what sends. So their copy could not be corrected in place at any price; the only route was replacing twelve emails, in sequences named for camps that ran months ago.

Kade's ruling, 2026-08-25: retire them, and build one evergreen sequence at the next waitlist launch. All four are now prefixed `[RETIRED 2026-08-25 stale-dates]` in Kajabi, which is the account's existing convention.

## Building the next one

Build **one** sequence, not one per camp, and build it in the **classic builder** (`use_theme_builder: false`), which edits in place forever. That is the whole reason the retired four could not be saved.

Use `EMCMWL04/` as the source; it is the later template and its copy is already evergreen:

- No camp number, and no start or close date. The emails name the rule ("intake closes 11:59pm AEST on the Thursday before camp starts") and send the reader to the landing page, which reads the live date from the cohort feed.
- Fifteen places, not six. The cap changed and the old copy never followed.
- One camp on offer, and the doors shutting when its intake closes.

The `kajabi-email-sequences` skill carries the build and probe procedure, including the rule that an email is only fixed once a delivered test message says so.
