# EMLM09_Toddler-Toolkit-Sample Lead Gen Email Sequence

- Kajabi sequence ID: 2148871322
- Created: 2026-08-09 (WS-003)
- Bound to offer: `4HQjFJGC` (2150846925) Toddler Toolkit - Sample Access
- Send hour: 11:00 Melbourne
- Builder: **theme**, matching the catnapping sequence `2148414612`

**Each email body is its own Kajabi theme**, written with `update_theme_content` against the body
theme id below. Subject, preview text, internal title, day and send time live on the email record
itself. The twins below are snapshots of what was written, not drafts to paste.

## Status: drafts, and nothing is wired

All three emails are `publication_status: draft`. Publishing is an admin action. A draft email in a
published sequence is skipped silently, so publish all three before the automation goes live.

A **Published** automation, [`391060` Toddler Toolkit Sample - Post-purchase](https://app.kajabi.com/admin/workflows/391060/edit), already fires on this offer and sends an
inline email. Kade's ruling on 2026-08-09: change its action to **Subscribe to an email sequence**
pointing here, and retire the inline email.

That inline email described a course that does not exist and its membership CTA pointed at draft
offer `6iRarwak`. Kade repointed that CTA at the membership landing page on 2026-08-09 as an
interim fix. Full record: [`../../pages/landing/toddler-toolkit-sample-ready/EMAIL-SEQUENCE.md`](../../pages/landing/toddler-toolkit-sample-ready/EMAIL-SEQUENCE.md).

Copy here is written against a `get_course` read of course `2149259086`. The sample is the welcome
lesson plus Module 1 "The 2-1 Nap Drop", 7 lessons, 8 above the paywall.

## Emails

- Position 1 | Email ID 2151354566 | body theme 2167139014
  - Subject: Your Toddler Toolkit sample is ready
  - Preview: Module 1 is unlocked, all seven lessons of it
  - Send: Immediately
  - Twin file: `1-2151354566.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354566/edit
  - Status: **draft**
- Position 2 | Email ID 2151354567 | body theme 2167139015
  - Subject: The 2–1 nap drop takes longer than you think
  - Preview: One bad day of two naps is not the signal
  - Send: day 2 at 11:00 Melbourne
  - Twin file: `2-2151354567.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354567/edit
  - Status: **draft**
- Position 3 | Email ID 2151354568 | body theme 2167139016
  - Subject: When a sample is not enough
  - Preview: Seven more modules sit behind that paywall
  - Send: day 6 at 11:00 Melbourne
  - Twin file: `3-2151354568.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354568/edit
  - Status: **draft**

## Supersedes 2148871240

Sequence `2148871240` was a first attempt using the classic HTML editor. Its nine bodies across the
three sequences were mangled: `add_sequence_email` takes `body_format`, which defaults to `markdown`,
and raw HTML was passed without setting it to `html`, so the sanitizer rendered the tags as visible
text. Classic-builder emails also have no `active_theme_id`, so there was no programmatic edit path
at all once created.

Rebuilding on the theme builder fixes both: the format matches catnapping, and every future edit is
an `update_theme_content` call rather than an admin paste.

**Delete sequence `2148871240` in the admin.** It is unwired and has no subscribers.

## House rules these bodies follow

- Section shape copied from catnapping: `section_text` for copy, `section_cta` for buttons, coral
  `#ff644a` on the greeting and signoff, button `#ff644a` on `#fffbf5` at radius 4.
- `{{ first_name }}` merge tag, spaced the way this site already writes it.
- No em dashes, no Oxford comma, no LLM fingerprint phrases.
- Sally writes in first person and signs off. Never described as a current or registered nurse.
- Every trial CTA carries the approved renewal disclosure in its own section directly beneath the
  button, per `docs/projects/catnapping-guide/4_working-cng002/verify/cta-trial-ADJUDICATION.md`.
  No price. USD slug only; `currency-toggle.js` does not run in email, so the checkout resolves
  currency itself.
- No claim about module or lesson counts that a live read does not support.

## Drift

Bodies live in Kajabi. If you edit one in the admin, update its twin here in the same change or the
two drift.
