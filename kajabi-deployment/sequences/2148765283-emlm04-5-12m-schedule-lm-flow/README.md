# EMLM04_5-12m Schedule LM Flow

- Kajabi sequence ID: `2148765283`
- **Refreshed: 2026-08-22 (LMA-004 WS3).** The previous version of this file was a 2026-07-06
  `kajabi-admin-browser` dump. Three of the four ids it listed have since been retired, and it omitted day 1
  entirely. Every id below was re-read from `get_sequence` on 2026-08-22.
- Source of truth for the three converted bodies: **`docs/projects/lead-magnet-activation/copy/emlm04-day{0,4,6}-body.html`**.
  See the archive note at the bottom for the `.txt` files in this directory.

## Emails, current

| Day | Email ID | Builder | Subject | Body source | Verified in the inbox |
|---|---|---|---|---|---|
| 0 | `2151381113` | **classic** | Access granted: Your 5-12 Month Schedules | `copy/emlm04-day0-body.html` | `kade+w3c04d0pub@`, 2026-08-22 03:36:12Z |
| 1 | `2151306460` | **classic**, and a **draft** — it never sends | Did you find your way into the Schedules module? | none in repo | not applicable, never sent |
| 2 | `2150967901` | theme builder, theme `2164549714` | How is the schedule going? | `2-2150967901.txt` (still the live body) | probed `kade+w1e04d2@`, 2026-08-22 |
| 4 | `2151381118` | **classic** | Schedules change (and that's okay) | `copy/emlm04-day4-body.html` | `kade+w3c04d4pub@`, 2026-08-22 03:38:14Z |
| 6 | `2151381120` | **classic** | A path forward for your schedule | `copy/emlm04-day6-body.html` | `kade+w3c04d6pub2@`, 2026-08-22 03:40:13Z |

Days 0, 2, 4 and 6 are `published` at `send_time_in_minutes: 660` (11:00 Melbourne). Day 1 is a draft.

Per-email send stats are on `https://app.kajabi.com/admin/email_sequences/2148765283` — the list page, **not**
`/edit`. The MCP `stats` object reads zero for every email regardless of reality.

## What changed and why it mattered

Days 0, 4 and 6 were each delivering something other than what they stored:

- **Day 4 and day 6 delivered near-duplicates of each other's copy**, matching neither slot's own stored body.
- **Day 4's send leaked an internal build comment** reading `EMAIL 4: DAY 6 (GENTLE NUDGE)` — the day 6 slot's
  own build marker, wrapped in day 4's real subject. **Day 0's leaked its `PURPOSE:` / `TRIGGER:` /
  `CAMPAIGN:` block.** Both comments existed only in the compiled send snapshot, never in the stored theme, so
  moving each body onto the classic builder removed them with no copy edit.
- **The CTAs were on a fourth, unratified pattern.** Days 4 and 6 pointed at
  `joinsnooze.com/snooze?utm_source=512funnel...` (day 6 with **no UTM at all**), day 0 at the member library.
  Days 4 and 6 now carry the ratified `mqQikDM7` trial CTA with its disclosure; day 0 keeps its own access
  page, `thankyou/2x92uaLF`, which is correct for a magnet-delivery email and returns HTTP 200.

**Day 2 was never a delivery defect** — it delivers exactly what it stores — so it was left alone. It is still
on the theme builder and still on the unratified `joinsnooze.com/snooze` destination.

## Residual copy items, approved to ship, awaiting a ruling

These sit in body prose rather than in a CTA, so removing them is a rewrite rather than the CTA swap this run
was scoped for. Drafted replacements are in `docs/projects/lead-magnet-activation/RUN-LOG-lma004.md` under
WS3b. Because all three emails are now on the classic builder, each fix is one in-place edit at a stable id
with no stats reset.

| Email | Residual |
|---|---|
| day 0 `2151381113` | `Module` x1 and `module` x2 in the body, plus `module` in the **preview text** |
| day 1 `2151306460` | `module` in the subject line |
| day 2 `2150967901` | `live Q&A` and a `→` in the stored body |
| day 4 `2151381118` | `Live Q&A` x1 |
| day 6 `2151381120` | `module` x1 and `live Q&A` x1 |

## Builder note

**Days 0, 4 and 6 are on the classic builder**, so their bodies are a column on the email record, read at send
time on every send. A copy change is an edit and a save, at a stable id, with stats continuing to accrue.

**Day 2 is on the theme builder.** A published theme-builder email renders a snapshot taken at the moment it
was published and can never be edited again, so any copy change to day 2 costs a new email, a new id and its
stats.

**Day 1 is on the classic builder already** but is a draft, so it has never sent. Publishing or deleting it is
deferred to Kade, and either way its subject needs the banned term out first.

## Retired ids

| Retired | Replaced by | Why |
|---|---|---|
| `2150965669` | `2151381113` (day 0) | delivered the pre-WS-008 intro and CTA, `module` x8, an arrow, and a leaked build comment |
| `2150967914` | `2151381118` (day 4) | delivered day 6's copy under day 4's subject, with a leaked build comment naming the day 6 slot |
| `2150967944` | `2151381120` (day 6) | delivered copy matching nothing it stored, on a completely untracked CTA |

## Archive note on the `.txt` files

`1-2150965669.txt`, `3-2150967914.txt` and `4-2150967944.txt` are **plain-text dumps of the retired emails'
stored bodies**, pulled 2026-07-06 with `Source body: dump body_text`. They are not HTML and are **not paste
sources** — the prose in them is correct and was carried into the `copy/` files verbatim, but they carry the
old CTA blocks and the `View in Web Browser` and unsubscribe scaffolding of a text dump. Paste from
`copy/emlm04-day{0,4,6}-body.html`.

`2-2150967901.txt` is the exception: day 2 was not converted, so that file still describes the live body.
