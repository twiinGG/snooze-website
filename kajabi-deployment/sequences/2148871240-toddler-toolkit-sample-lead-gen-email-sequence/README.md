# Toddler Toolkit Sample Lead Gen Email Sequence

- Kajabi sequence ID: 2148871240
- Created: 2026-08-09 (WS-003)
- Bound to offer: `4HQjFJGC` (2150846925)
- Send hour: 11:00 Melbourne
- Builder: **classic HTML editor**, not the theme builder

## These are NOT live yet

All three emails are **drafts** and the bodies in Kajabi are **mangled**. They were created through
`add_sequence_email` with raw HTML in `body` but without `body_format: "html"`. That parameter
defaults to `markdown`, so the server parsed the HTML as markdown and the sanitizer turned the
tags into visible text.

**The `.html` file beside each twin is the correct body.** Paste it into the email's HTML editor,
replacing everything currently there.

Unlike the catnapping sequence, these bodies do **not** live in a per-email theme. There is no
`active_theme_id` on a classic-builder email, so there is no `PUT /admin/themes/<id>/settings`
path and no `update_theme_content` route. There is also no MCP tool to update or delete a
sequence email, only `add_sequence_email`. Corrections here are an admin paste.

The inline email on the Published automation **Toddler Toolkit Sample - Post-purchase** is retired in favour of this sequence. What was wrong with it is recorded in [`../../pages/landing/toddler-toolkit-sample-ready/EMAIL-SEQUENCE.md`](../../pages/landing/toddler-toolkit-sample-ready/EMAIL-SEQUENCE.md).

Emails 1 and 2 were rewritten on 2026-08-09 against a `get_course` read of course `2149259086`. The sample is the intro lesson plus Module 1 "The 2&#8211;1 Nap Drop", 7 lessons, 8 above the paywall.

## Emails

- Position 1 | Email ID 2151354199
  - Subject: Your Toddler Toolkit sample is ready
  - Send: Immediately
  - Body to paste: `1-2151354199.html`
  - Readable twin: `1-2151354199.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354199/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 2 | Email ID 2151354200
  - Subject: The 2–1 nap drop takes longer than you think
  - Send: day 2 at 11:00 Melbourne
  - Body to paste: `2-2151354200.html`
  - Readable twin: `2-2151354200.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354200/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 3 | Email ID 2151354201
  - Subject: When a sample is not enough
  - Send: day 6 at 11:00 Melbourne
  - Body to paste: `3-2151354201.html`
  - Readable twin: `3-2151354201.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354201/edit
  - Status: **draft, body mangled, needs the paste above**

## House rules these bodies follow

- Single wrapper `div`, all styling inline, no `!important`. Email pattern, not the course-lesson pattern.
- `<br />` for spacing rather than margin-bottom.
- `{{ first_name }}` merge tag, spaced the way this site already writes it.
- No em dashes, no Oxford comma, no LLM fingerprint phrases.
- Sally writes in first person and signs off. Never described as a current or registered nurse.
- Every trial CTA carries the approved renewal disclosure directly beneath the button, per
  `docs/projects/catnapping-guide/4_working-cng002/verify/cta-trial-ADJUDICATION.md`. No price.
- No claim about module or lesson counts that a live read does not support.

Kajabi appends its own unsubscribe and address footer to a classic-builder email, so the bodies
here carry no footer chrome of their own.

## Drift

The bodies live in Kajabi once pasted. If you edit one in the admin, update the `.html` and the
twin `.txt` in the same change or the two drift.
