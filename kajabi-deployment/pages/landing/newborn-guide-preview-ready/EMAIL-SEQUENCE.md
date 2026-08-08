# Newborn Guide Preview Lead Gen Email Sequence

**Kajabi sequence id:** `2148871241` · **Send hour:** 11:00 Melbourne · **Builder:** classic HTML
**Bound to offer:** `zs2zLeUw` (`2150851932`)
**Status:** all three emails created as **drafts** on 2026-08-09 (WS-003). None is published and none is bound to a trigger yet.

## The binding does not exist yet

Creating a sequence does not subscribe anyone to it. That needs a Kajabi automation with trigger **Offer is purchased: zs2zLeUw** and action **Subscribe to an email sequence: Newborn Guide Preview Lead Gen Email Sequence**, exactly as automation `369723` does for the catnapping form.

**The automations MCP toolset is not enabled on this account** (`list_automations` returns "not enabled for this account yet"), so the automation must be built by a human in the admin and cannot be verified from here.

**This gates the page paste.** `newborn-guide-preview-ready.html` tells the claimant that three emails are coming. That sentence is false until the automation exists and the emails are published. Build the automation and publish the emails first, or remove the "What comes next" band before pasting.

## Emails

| # | Day | Kajabi id | Subject |
|---|---|---|---|
| 1 | 0 | `2151354202` | Your Newborn Sleep Guide preview is ready |
| 2 | 2 | `2151354203` | Overtired looks exactly like not tired |
| 3 | 6 | `2151354204` | What comes after the newborn weeks |

Asset link used in every email: `https://www.joinsnooze.com/products/e54a281b-c3cd-45e6-a18c-3bfff7cc54e2`
Trial CTA in email 3: `https://www.joinsnooze.com/offers/mqQikDM7/checkout`, with the approved renewal disclosure directly beneath the button, per `cta-trial-ADJUDICATION.md`.

## House rules these bodies follow

- Single wrapper `div`, all styling inline, no `!important`. Email clients, not the course-lesson pattern.
- `<br />` for spacing rather than margin-bottom.
- `{{first_name}}` merge tag.
- No em dashes, no Oxford comma, no LLM fingerprint phrases.
- Sally writes in first person and signs off. She is never described as a current or registered nurse.

## Live source of truth

The bodies live in Kajabi. This file records what was written, why, and the ids. If you edit an email in the admin, update this file in the same change or the two drift.
