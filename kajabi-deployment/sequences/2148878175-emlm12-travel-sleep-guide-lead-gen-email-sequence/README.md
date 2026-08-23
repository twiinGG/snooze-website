# EMLM12_Travel-Sleep-Guide Lead Gen Email Sequence

- Kajabi sequence ID: **2148878175** ([edit](https://app.kajabi.com/admin/email_sequences/2148878175/edit))
- Created: 2026-08-23 (TSG-001)
- Magnet: the Travel Sleep Guide PDF, pattern A (file artefact). **No Kajabi offer, no grant, no member account.**
- Bound to: form **2149700924** "Travel Sleep Guide Lead Magnet" via the subscribe automation
- Send hour: 11:00 Melbourne
- Builder: **theme builder**, one `section_text` carrying the whole body, same as EMLM11

## Body structure

One `section_text` (`1576616261664`) whose `body` rich-text field holds the entire email, including the
CTA as a styled inline `<a>`, and `content_for_main` set to that one section. Written with
`update_theme_content` and read back with `get_theme_content`; all three round-tripped byte for byte
against the `.html` files here on 2026-08-23.

Same trade EMLM11 documents: one block that matches the repo file exactly, against a native
`section_cta` button that keeps its rounded corners in Outlook on Windows.

## Emails

| Pos | Email ID | Theme ID | Send | Subject | Body |
|---|---|---|---|---|---|
| 1 | 2151382454 | 2167290801 | day 0, 11:00 | Your Travel Sleep Guide is ready | `1-2151382454.html` |
| 2 | 2151382455 | 2167290802 | day 2, 11:00 | The airport nap that does not happen | `2-2151382455.html` |
| 3 | 2151382456 | 2167290803 | day 6, 11:00 | The trip is the easy part to plan for | `3-2151382456.html` |

Editor URLs: `https://app.kajabi.com/admin/email_sequences/2148878175/edit`

**Day 0 timing.** `add_sequence_email` stores `send_time_in_minutes: 660` on a day-0 email and there is
no MCP override. This is identical to EMLM11's live email 1, which the WS-006 run verified as arriving on
submit, so the shape here matches the proven magnet rather than the kickoff's assumption of a send-hour
override.

## Status

All three emails are **draft**. Publishing a sequence email is an admin UI action; no MCP tool exposes it.

## Where the copy came from

Email 1 and email 2 are pulled from the guide's own "Before you pack the bags" and "The airport and the
plane" sections. Email 3 is the trial CTA, offer `mqQikDM7`, renewal disclosure directly beneath the
button and no price.

## House rules these bodies follow

- Single wrapper `div`, all styling inline, no `!important`.
- `<br />` for spacing rather than margin-bottom.
- `{{ first_name }}` merge tag, spaced the way this site already writes it.
- No em dashes, no Oxford comma, no LLM fingerprint phrases. Checked by script before the paste.
- Sally writes in first person and signs off. Never described as a current or registered nurse.
- The trial CTA carries the approved renewal disclosure directly beneath the button. No price.

Kajabi appends its own unsubscribe and address footer, so the bodies carry no footer chrome.

## Drift

If you edit a body in the admin, update the `.html` and the twin `.txt` here in the same change.
