# EMLM08 - 3-4M 4hr Feeds

- Kajabi sequence ID: `2148770572`
- **Refreshed: 2026-08-22 (LMA-004 WS1).** The previous version of this file was a 2026-07-06
  `kajabi-admin-browser` dump listing three emails, all three of which have since been retired, and it
  omitted day 0 entirely. Every id below was re-read from `get_sequence` on 2026-08-22.
- Source of truth for bodies: **`docs/projects/lead-magnet-activation/copy/emlm08-day{0,2,4,6}-body.html`**,
  not the `.txt` files in this directory. See the archive note at the bottom.

## Emails, current

| Day | Email ID | Builder | Subject | Body source | Verified in the inbox |
|---|---|---|---|---|---|
| 0 | `2151365275` | theme builder | Access granted: Your 3-4 Month 4hr Feeds | `copy/emlm08-day0-body.html` | `kade+w1e08d0@`, 2026-08-22 00:19:23Z |
| 2 | `2151381012` | theme builder | Feed spacing is working… but there's more | `copy/emlm08-day2-body.html` | `kade+ws2p08d2@`, 2026-08-22 00:56:03Z |
| 4 | `2151381105` | **classic** | You've fixed the feeds. Now what? | `copy/emlm08-day4-body.html` | `kade+w1c08d4pub@`, 2026-08-22 03:28:23Z |
| 6 | `2151381107` | **classic** | Quick feed check-in 💙 | `copy/emlm08-day6-body.html` | `kade+w1c08d6pub@`, 2026-08-22 03:30:02Z |

All four are `published`, all four send at `send_time_in_minutes: 660` (11:00 Melbourne).

Editor URLs follow the pattern `https://app.kajabi.com/admin/email_sequence_emails/<id>/edit`.
Per-email send stats are on `https://app.kajabi.com/admin/email_sequences/2148770572` — the list page, **not**
`/edit`. The MCP `stats` object reads zero for every email regardless of reality and must not be used to
assess exposure.

## Builder note, which decides the cost of a copy change

**Days 4 and 6 are on the classic builder**, so their bodies are a column on the email record, read at send
time on every send. A copy change is an edit and a save, at a stable id, with stats continuing to accrue.

**Days 0 and 2 are still on the theme builder.** A published theme-builder email renders a snapshot taken at
the moment it was published and can never be edited again, so a copy change to either one costs a new email,
a new id and that email's stats. Converting them is LMA-004 WS2.

## Retired ids

| Retired | Replaced by | When | Why |
|---|---|---|---|
| `2150984443` | `2151381012` (day 2) | LMA-003, 2026-08-22 | delivered a publish-time snapshot carrying `Module`, `gentle`, `self-settling` and an arrow |
| `2150984452` | `2151381105` (day 4) | LMA-004 WS1, 2026-08-22 | delivered the retired paid offer `z63s9VaR` and the draft offer `bsAYfac2`, which resolves to `/login` |
| `2150984470` | `2151381107` (day 6) | LMA-004 WS1, 2026-08-22 | same two offers. 19 sends at 5% clicked, so at least one real lead reached the login wall |

## Archive note on the `.txt` files

`1-2150984443.txt`, `2-2150984452.txt` and `3-2150984470.txt` are the **pre-conversion body dumps of the three
retired emails**. They are kept as evidence of what was being sent, and they are **not** paste sources — each
one carries banned terms and, in the case of days 4 and 6, both dead offer links. Do not paste from them.
The paste sources are the `copy/emlm08-day*-body.html` files named above.
