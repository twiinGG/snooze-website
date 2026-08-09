# EMLM09_Toddler-Toolkit-Sample Lead Gen Email Sequence

- Kajabi sequence ID: 2148871322
- Created: 2026-08-09 (WS-003)
- Bound to offer: `4HQjFJGC` (2150846925)
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

The inline email on the Published automation **Toddler Toolkit Sample - Post-purchase** is retired in favour of this sequence. What was wrong with it is recorded in [`../../pages/landing/toddler-toolkit-sample-ready/EMAIL-SEQUENCE.md`](../../pages/landing/toddler-toolkit-sample-ready/EMAIL-SEQUENCE.md).

Emails 1 and 2 were rewritten on 2026-08-09 against a `get_course` read of course `2149259086`. The sample is the intro lesson plus Module 1 "The 2&#8211;1 Nap Drop", 7 lessons, 8 above the paywall.

## Emails

- Position 1 | Email ID 2151354566
  - Subject: Your Toddler Toolkit sample is ready
  - Send: Immediately
  - Body to paste: `1-2151354566.html`
  - Readable twin: `1-2151354566.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354566/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 2 | Email ID 2151354567
  - Subject: The 2–1 nap drop takes longer than you think
  - Send: day 2 at 11:00 Melbourne
  - Body to paste: `2-2151354567.html`
  - Readable twin: `2-2151354567.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354567/edit
  - Status: **draft, body mangled, needs the paste above**
- Position 3 | Email ID 2151354568
  - Subject: When a sample is not enough
  - Send: day 6 at 11:00 Melbourne
  - Body to paste: `3-2151354568.html`
  - Readable twin: `3-2151354568.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2151354568/edit
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
