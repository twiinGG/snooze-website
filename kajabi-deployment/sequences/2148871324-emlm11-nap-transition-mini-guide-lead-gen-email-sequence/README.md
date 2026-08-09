# EMLM11_Nap-Transition-Mini-Guide Lead Gen Email Sequence

- Kajabi sequence ID: 2148871324
- Created: 2026-08-09 (WS-003)
- Bound to offer: `FwisMwa6` (2151272119) 3-to-2 Nap Transition Mini Guide
- Send hour: 11:00 Melbourne
- Builder: **theme**, matching the catnapping sequence `2148414612`

**Each email body is its own Kajabi theme**, written with `update_theme_content` against the body
theme id below. Subject, preview text, internal title, day and send time live on the email record
itself. The twins below are snapshots of what was written, not drafts to paste.

## Status: drafts, and nothing is wired

All three emails are `publication_status: draft`. Publishing is an admin action. A draft email in a
published sequence is skipped silently, so publish all three before the automation goes live.

**No automation exists for this offer.** Confirmed from its Purchase flow tab on 2026-08-09.
One needs building, trigger `Offer is purchased: 3-to-2 Nap Transition Mini Guide`, action
`Subscribe to an email sequence` pointing here.

**Open question for Kade.** `FwisMwa6` grants product `2148990031`, the same product paid offers
`2150311631` and `2151262014` sell and which the Snooze Membership includes. The free mini guide
and the paid Roadmap are the same entitlement. Confirm that is intended before this carries volume.

## Emails

- Position 1 | Email ID 2151354572 | body theme 2167139022
  - Subject: Your 3-to-2 nap transition guide is ready
  - Preview: Find your age first, then cap before you drop
  - Send: Immediately
  - Twin file: `1-2151354572.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354572/edit
  - Status: **draft**
- Position 2 | Email ID 2151354573 | body theme 2167139023
  - Subject: Early waking during a nap transition is normal
  - Preview: Week one always looks like a mistake
  - Send: day 2 at 11:00 Melbourne
  - Twin file: `2-2151354573.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354573/edit
  - Status: **draft**
- Position 3 | Email ID 2151354574 | body theme 2167139024
  - Subject: This is not the last transition
  - Preview: Two to one catches almost everybody out
  - Send: day 6 at 11:00 Melbourne
  - Twin file: `3-2151354574.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354574/edit
  - Status: **draft**

## Supersedes 2148871242

Sequence `2148871242` was a first attempt using the classic HTML editor. Its nine bodies across the
three sequences were mangled: `add_sequence_email` takes `body_format`, which defaults to `markdown`,
and raw HTML was passed without setting it to `html`, so the sanitizer rendered the tags as visible
text. Classic-builder emails also have no `active_theme_id`, so there was no programmatic edit path
at all once created.

Rebuilding on the theme builder fixes both: the format matches catnapping, and every future edit is
an `update_theme_content` call rather than an admin paste.

**Delete sequence `2148871242` in the admin.** It is unwired and has no subscribers.

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
