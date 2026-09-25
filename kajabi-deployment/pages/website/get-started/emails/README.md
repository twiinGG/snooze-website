# GS-001 Get started — email copy

Six emails for the two Get started email flows: the drop-off sequence (plan sent, not joined) and the three welcome sequences (one per offer). All copy files are Markdown with frontmatter; Kade builds them in Kajabi using the **classic builder** (see `.agents/skills/kajabi-email-sequences/SKILL.md`) so copy can be edited in place after publishing.

Voice source: `docs/projects/get-started-onboarding/voice/SLEEP-CONCIERGE-VOICE-MODULE.md` (PROPOSED, needs Sally's approval at G2) and `sally-verbatim-bank.json`. Facts: `docs/projects/get-started-onboarding/GS-001-IMPLEMENTATION-PLAN.md` §2.0–2.4.

| File | Sequence | Timing | Subject | Trigger / exit | Kajabi build notes |
|---|---|---|---|---|---|
| `dropoff-1.md` | Get started – plan sent, not joined | ~1 hour after tag | Your plan is saved, {{ first_name }} | Trigger: form tag `get-started-plan-sent`. Exit: purchase (any of Snooze/Camp/consult) | Day 0, classic builder. Primary link is the resume URL; confirm `resume_token` populates before send. |
| `dropoff-2.md` | Get started – plan sent, not joined | Day 1 | What tonight actually looks like | Same trigger/exit as above | Day 1. Contains the verbatim 7-day guarantee line — do not paraphrase it. |
| `dropoff-3.md` | Get started – plan sent, not joined | Day 3 (last email) | You don't need more tips right now | Same trigger/exit as above. Sequence ends here — no day 4+ email. | Day 3. Has three links (plan, Camp, consult) but only one styled as the primary CTA button (the plan link); Camp/consult are inline text links. |
| `welcome-snooze.md` | Welcome – Snooze | Immediately on Snooze purchase | Welcome to Snooze, {{ first_name }} | Trigger: Snooze offer purchase | This is the only file where "Sleep Concierge" appears in body copy (one sign-off), by design — see self-check below. |
| `welcome-camp.md` | Welcome – Camp | Immediately on Camp Snooze purchase | Welcome to Camp, {{ first_name }} | Trigger: Camp Snooze offer purchase | Contains one `[camp-verbatim-pending]` marker — see below. Do not ship without Sally supplying (or approving) that line. |
| `welcome-consult.md` | Welcome – Consult | Immediately on consult purchase | Let's book your time, {{ first_name }} | Trigger: consult offer/product purchase | No bank quotes used; new copy per the module's "write new copy using her signature moves" rule (nothing in the bank fit the intake/booking beat). |

## Merge tags

Standard system tags, confirmed from live sequence files (e.g. `apps/snooze-website/kajabi-deployment/sequences/2148744725-recent-purchasers-67-products-rpg67/*.txt`):

- `{{ first_name }}` — confirmed working syntax for sequence emails (no `contact.` or `member.` prefix in this context).

**Custom-field merge tags — UNCONFIRMED, flagged for Kade.** `age_band`, `primary_struggle`, `help_style`, `start_here_title`, `start_here_url`, `resume_token` are Kajabi contact custom fields set by the Get started form (`BUILD-SPEC.md`), not the site's usual `{{first_name}}`/`{{access_url}}`-style system tags. I could not find a live example of a *custom field* merge tag in a Kajabi email anywhere in the repo to confirm the exact syntax, so every occurrence in these six files uses the placeholder form:

```
{{ contact.custom_fields.start_here_url }}
{{ contact.custom_fields.start_here_title }}
{{ contact.custom_fields.resume_token }}
```

**Before pasting into Kajabi:** open the email editor's merge-tag picker (or check the custom field's own settings page) and confirm the real tag syntax Kajabi generates for a contact custom field — it may be `{{ contact.custom_fields.<key> }}`, or a different pattern entirely (Kajabi has historically varied this by field type). Swap every placeholder above for the confirmed tag before publishing, then verify with **Preview In Browser**, not the editor preview (per the skill's rule 6: only a delivered message counts). `primary_struggle` itself is never merged into prose anywhere in these six emails — every reference goes through `start_here_title` instead, per the brief.

## Links used

- Resume plan: `https://www.joinsnooze.com/get-started?r={{ contact.custom_fields.resume_token }}` (dropoff-1, dropoff-2, dropoff-3)
- Start-here lesson: `{{ contact.custom_fields.start_here_url }}` (welcome-snooze)
- Forum / Snooze Village: `https://www.joinsnooze.com/products/communities/v2/snooze/home` (welcome-snooze CTA text, welcome-camp)
- Camp Snooze: `https://www.joinsnooze.com/camp-snooze-sleep-coaching` (dropoff-3)
- Consult: `https://www.joinsnooze.com/one-on-one-sleep-consultations` (dropoff-3, welcome-consult)

None of these are checkout URLs with currency/variant baked in (see `data/offers.json` for those) — the drop-off emails send people back to their saved plan page, where the existing plan-page logic picks the right currency and offer, rather than guessing it in the email.

## Camp verbatim gap

`welcome-camp.md` has one `[camp-verbatim-pending]` marker for Sally's own welcome line to a new cohort. Per the voice module, **zero verbatim Camp lines exist yet** — the Camp Snooze recordings are only Gemini summaries (not verbatim, and they contain client names). The rest of the Camp content in that email (roll call, sleep logs, week one nights / week two naps) uses the approved **Camp program vocabulary** terms from the module, not invented quotes. Handoff per the module: transcribe 3–5 Camp roll calls with the WhisperKit lane, re-run the bank extraction, then swap in a real quote at the marker.

## Self-check (per the brief)

Ran `grep -rniE "quiz|24/7|weekly|trial"` across all six files: **zero matches.**

Ran `grep -n "Sleep Concierge"` across all six files: appears **only** as `sender_name` in frontmatter (once per file, 6 total) and **exactly once** in body copy — the sign-off of `welcome-snooze.md` ("Sally, The Sleep Concierge"). No other body copy names it.

No email names Bec; all use "Sally and the Snooze Specialists" / "Sally or a Snooze Specialist". No medical advice, no outcome guarantees, no "24/7", "weekly" or "replay vault". Word counts: 137–206 words per email (target 120–220). Every email carries a numbered "What happens next" block and Australian spelling throughout (e.g. "personalised", "organise").
