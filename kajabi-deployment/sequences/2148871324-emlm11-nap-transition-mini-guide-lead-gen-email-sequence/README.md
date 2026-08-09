# EMLM11_Nap-Transition-Mini-Guide Lead Gen Email Sequence

- Kajabi sequence ID: 2148871324
- Created: 2026-08-09 (WS-003)
- Bound to offer: `FwisMwa6` (2151272119)
- Send hour: 11:00 Melbourne
- Builder: **theme builder**, one `section_text` carrying the whole body

## Body structure: one section, self-contained HTML

Kade's ruling was a blank email with a single code block. **The Encore Email theme has no code
section.** Its addable catalog is `section_text`, `section_image`, `section_cta`, `section_logo`,
`section_video`, `section_countdown`, `section_social_icons`, `section_divider`,
`section_announcement`, three split types and the Amplify ad, and the theme skill states plainly
that Encore Email sections have no blocks at all.

The closest available shape, and what these use, is **one `section_text` whose `body` rich-text
field holds the entire email**, including the CTA as a styled inline `<a>`. Verified working on a
probe email: the HTML round-trips through `update_theme_content` and `get_theme_content` byte for
byte.

That differs from the catnapping sequence, which composes `section_text` x3 plus a native
`section_cta`. The native button emits table-based markup that survives Outlook on Windows, where
an inline `<a>` with `border-radius` loses its rounded corners. The trade is deliberate: one block
that matches the repo file exactly, against a button that renders square in one client.

**The `.html` file beside each twin is the body**, and it goes into that single section's rich
text, not into a classic HTML editor.

There is no MCP tool to update or delete a sequence email, only `add_sequence_email`, and Kajabi
rejects a second email on a day and time that is already taken. Writing a body therefore needs the
email's `active_theme_id`, which only `add_sequence_email` returns and no read tool exposes.

**Open question for Kade.** `FwisMwa6` grants product `2148990031`, which is the same product paid offers `2150311631` and `2151262014` sell and which the Snooze Membership includes. The free mini guide and the paid Roadmap are the same entitlement. Confirm that is intended before this flow carries volume.

**Check first:** whether an automation already sends a post-purchase email for `FwisMwa6`.

## Emails

- Position 1 | Email ID 2151354572
  - Subject: Your 3-to-2 nap transition guide is ready
  - Send: Immediately
  - Body to paste: `1-2151354572.html`
  - Readable twin: `1-2151354572.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354572/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 2 | Email ID 2151354573
  - Subject: Early waking during a nap transition is normal
  - Send: day 2 at 11:00 Melbourne
  - Body to paste: `2-2151354573.html`
  - Readable twin: `2-2151354573.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354573/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 3 | Email ID 2151354574
  - Subject: This is not the last transition
  - Send: day 6 at 11:00 Melbourne
  - Body to paste: `3-2151354574.html`
  - Readable twin: `3-2151354574.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354574/edit
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
