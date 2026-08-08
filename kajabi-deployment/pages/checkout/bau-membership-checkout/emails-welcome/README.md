# Snooze Membership welcome sequence (PUBMS01)

**Status: deployed.** The [`snooze-membership-welcome`](../../../landing/snooze-membership-welcome/) landing page is live as the PUBMS01 post-purchase destination, and this sequence's four emails are pasted into Kajabi as a Sequence with the `Offer is purchased` automation wired on both currency offers, per the setup steps below.

**Gap this closed:** PUBMS01 (`z63s9VaR` USD / `vYgCNgJz` AUD) had Post-purchase email set to `None` and no automation sent a welcome email on purchase. New members landed on the welcome page with no follow-up. This sequence is the nurture that should have existed from day one.

## Pre-existing dead automation (found during audit, not reused)

An older "Snooze Social membership Welcome Email Sequence" (Kajabi sequence ID `2148317673`) already existed live in Kajabi, but every automation that could fire it was **Draft status, 0 activations, and pointed at the retired "Snooze Social Membership" offer name**, not PUBMS01. It never rewired after the offer rebrand, so it never sent. Its copy is also off-brand (calls the community "Snooze Social", "24/7 support... certified sleep consultant" violates the former-paediatric-nurse positioning rule) so it was not revived or reused.

Workflow IDs to delete in Kajabi admin (Marketing → Automations), all Draft, all 0 activations, all "Subscribe to email sequence: Snooze Social membership Welcome Email Sequence":

- `369728`, `369733`, `369706`, `369707`, `369719`

Once deleted, sequence `2148317673` is fully orphaned and can be left alone or deleted; nothing references it.

**Tone note:** a member reaching this offer may already have an active relationship with Sally, in the Village, in DMs, or from an earlier course purchase. Every email in this sequence assumes that possibility and says so explicitly (see the "if we've already been talking" / "ignore this if you've already found it" lines). None of these read as a cold, bot-run thread pretending to be a person who has never spoken to the member before.

| Email | Send time | Audience and exit condition | Subject | Preview text | Primary job |
|---|---|---|---|---|---|
| `day-0-welcome-email.html` | Day 0, immediately after a confirmed PUBMS01 purchase | New Snooze Members. Do not send to a failed or pending checkout. | Welcome to Snooze | One place to start, whatever stage you're at. | Account orientation and one clear first action. |
| `day-3-checkin-email.html` | Day 3 after purchase | Active members. Stop if cancelled or refunded. | How's it going so far? | Pick a starting point, or say hello in the Village. | Light-touch nudge, not a sales email. |
| `day-7-village-checkin-email.html` | Day 7 after purchase | Active members. Stop if cancelled or refunded. | The Village, and live sessions | Two things worth knowing about by week one. | Community and live-session awareness. |
| `day-14-settling-in-email.html` | Day 14 after purchase | Active members. Stop if cancelled or refunded. | Two weeks in | The Library covers more than you might have found yet. | Depth of library, consult pricing, feedback loop. |

## Kajabi setup

1. Keep the PUBMS01 offer's Post-purchase email set to **None** for both currency offers (already correct per the current offer screenshot). The built-in post-purchase email is not this sequence; do not turn it back on as well as this sequence, or members get two welcomes.
2. Build a Kajabi Sequence (Marketing → Sequences) named `Snooze Membership Welcome`, with these four emails as steps, delays exactly as in the table above (Day 0, +3, +4, +7).
3. Add an automation on **each** PUBMS01 offer (USD `2150754998`, AUD `2151256977`): `Offer is purchased` → `Subscribe to a sequence` → `Snooze Membership Welcome`. This is the automation that is currently missing; the offer's Purchase flow only shows the unsubscribe, revoke and tag automations, none of which send anything to a new member.
4. Stop condition: unsubscribe the member from the sequence on `Recurring payments cancelation initiated` or a refund event, mirroring the pattern used for the trial and BAU-upgrade sequences.
5. Enter the subject and preview text from this table directly in Kajabi. Do not add metadata comments to the deployable HTML.

## Content notes

- Email bodies use Kajabi-safe inline styling (Arial fallback stack, no `!important`, inline colors), matching every other Snooze email template in this repo. See `AGENTS.md` §6 for why course-lesson and landing-page rules do not apply here.
- The Day 0 CTA links to `/membership-welcome`, the new landing page built alongside this sequence. Do not point it back at a plain product link; the whole point of that page is one clear first action by baby's stage.
- No pricing, upgrade or churn-recovery language appears anywhere in this sequence. These are already-paying members; this is onboarding, not conversion.
- Every email ends `x Sally`, matching the trial and BAU-upgrade sequences' sign-off convention.
