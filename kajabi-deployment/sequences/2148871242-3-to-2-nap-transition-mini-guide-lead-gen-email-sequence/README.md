# 3-to-2 Nap Transition Mini Guide Lead Gen Email Sequence

- Kajabi sequence ID: 2148871242
- Created: 2026-08-09 (WS-003)
- Bound to offer: `FwisMwa6` (2151272119)
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

**Open question for Kade.** `FwisMwa6` grants product `2148990031`, which is the same product paid offers `2150311631` and `2151262014` sell and which the Snooze Membership includes. The free mini guide and the paid Roadmap are the same entitlement. Confirm that is intended before this flow carries volume.

**Check first:** whether an automation already sends a post-purchase email for `FwisMwa6`.

## Emails

- Position 1 | Email ID 2151354205
  - Subject: Your 3-to-2 nap transition guide is ready
  - Send: Immediately
  - Body to paste: `1-2151354205.html`
  - Readable twin: `1-2151354205.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354205/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 2 | Email ID 2151354206
  - Subject: Early waking during a nap transition is normal
  - Send: day 2 at 11:00 Melbourne
  - Body to paste: `2-2151354206.html`
  - Readable twin: `2-2151354206.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354206/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 3 | Email ID 2151354207
  - Subject: This is not the last transition
  - Send: day 6 at 11:00 Melbourne
  - Body to paste: `3-2151354207.html`
  - Readable twin: `3-2151354207.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354207/edit
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
