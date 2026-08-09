# Newborn Guide Preview Lead Gen Email Sequence

- Kajabi sequence ID: 2148871241
- Created: 2026-08-09 (WS-003)
- Bound to offer: `zs2zLeUw` (2150851932)
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

**Not yet verified against the live product.** The toddler sequence had to be rewritten once its course structure was read. This one describes the preview in general terms only, and makes no claim about module or lesson counts, precisely so it cannot be wrong the same way. Tighten it once someone reads the product.

**Check first:** whether an automation already sends a post-purchase email for `zs2zLeUw`. The automations MCP toolset is disabled, so this cannot be read from the repo side.

## Emails

- Position 1 | Email ID 2151354202
  - Subject: Your Newborn Sleep Guide preview is ready
  - Send: Immediately
  - Body to paste: `1-2151354202.html`
  - Readable twin: `1-2151354202.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354202/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 2 | Email ID 2151354203
  - Subject: Overtired looks exactly like not tired
  - Send: day 2 at 11:00 Melbourne
  - Body to paste: `2-2151354203.html`
  - Readable twin: `2-2151354203.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354203/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 3 | Email ID 2151354204
  - Subject: What comes after the newborn weeks
  - Send: day 6 at 11:00 Melbourne
  - Body to paste: `3-2151354204.html`
  - Readable twin: `3-2151354204.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354204/edit
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
