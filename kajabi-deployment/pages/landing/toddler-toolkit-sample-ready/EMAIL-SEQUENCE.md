# Toddler Toolkit Sample Lead Gen Email Sequence

**Kajabi sequence id:** `2148871240` · **Send hour:** 11:00 Melbourne · **Builder:** classic HTML
**Bound to offer:** `4HQjFJGC` (`2150846925`)
**Status:** all three emails created as **drafts** on 2026-08-09 (WS-003). None is published and none is bound to a trigger yet.

## The binding does not exist yet

Creating a sequence does not subscribe anyone to it. That needs a Kajabi automation with trigger **Offer is purchased: 4HQjFJGC** and action **Subscribe to an email sequence: Toddler Toolkit Sample Lead Gen Email Sequence**, exactly as automation `369723` does for the catnapping form.

**The automations MCP toolset is not enabled on this account** (`list_automations` returns "not enabled for this account yet"), so the automation must be built by a human in the admin and cannot be verified from here.

**This gates the page paste.** `toddler-toolkit-sample-ready.html` tells the claimant that three emails are coming. That sentence is false until the automation exists and the emails are published. Build the automation and publish the emails first, or remove the "What comes next" band before pasting.

## Emails

| # | Day | Kajabi id | Subject |
|---|---|---|---|
| 1 | 0 | `2151354199` | Your Toddler Toolkit sample is ready |
| 2 | 2 | `2151354200` | The toddler bedtime problem is rarely bedtime |
| 3 | 6 | `2151354201` | When a sample is not enough |

Asset link used in every email: `https://www.joinsnooze.com/products/88d5fab2-212c-4d84-8fcd-8aa5c4d9ce0c`
Trial CTA in email 3: `https://www.joinsnooze.com/offers/mqQikDM7/checkout`, with the approved renewal disclosure directly beneath the button, per `cta-trial-ADJUDICATION.md`.

## House rules these bodies follow

- Single wrapper `div`, all styling inline, no `!important`. Email clients, not the course-lesson pattern.
- `<br />` for spacing rather than margin-bottom.
- `{{first_name}}` merge tag.
- No em dashes, no Oxford comma, no LLM fingerprint phrases.
- Sally writes in first person and signs off. She is never described as a current or registered nurse.

## Live source of truth

The bodies live in Kajabi. This file records what was written, why, and the ids. If you edit an email in the admin, update this file in the same change or the two drift.
