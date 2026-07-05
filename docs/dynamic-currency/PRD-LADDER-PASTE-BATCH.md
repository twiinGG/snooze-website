# PRD-LADDER Paste Batch

Single runbook for the human-gated Kajabi steps that ship PRD-LADDER (BM-001)
section 5. Git is the source of truth; Kajabi is paste-by-hand. Shape follows
`docs/projects/paid-media-and-dual-currency-v1/phase-6-deploy-pack.md`.

**Status:** all files staged in-repo, awaiting Sally sign-off on member-facing copy
before any paste. Do NOT paste until the approval-queue sign-off is recorded.

## What this ships

1. A monthly/quarterly/annual plan-tiers framing block on the BAU membership
   checkout (both currencies).
2. A month-2-3 annual-upgrade email sequence (both currencies) plus its trigger
   spec.
3. A one-off annual-moment founder-event kit (outline, offer mechanics, invite +
   reminder + replay-expiry emails, both currencies).

No new offers, variants, or prices. All variant IDs come from
`apps/snooze-website/kajabi-deployment/global/js/currency-toggle.js`
`CONFIG.variantMapping`.

## Order of operations (do not reorder)

### STEP 1: Sally approval (human; gates everything below)
Approve all member-facing copy through the approval queue: the two checkout blocks,
the six upgrade emails, and the event kit copy pack. Record the sign-off (message,
Notion note, or approval-queue entry) with a date. No paste happens before this.

### STEP 2: Checkout tier blocks (human paste; Kajabi admin)
Paste the updated checkout blocks into their per-offer custom-code blocks. These are
purely additive (a plan-tiers section below the hero); diff against the live block
first and apply only the addition if the live block has drifted.

| Repo file | Kajabi destination | Notes |
|---|---|---|
| `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/usd/checkout-blocks.html` | USD checkout, theme 2163485833, section 1744906803654, block 1767316681231 | offer z63s9VaR |
| `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/aud/checkout-blocks.html` | AUD checkout, theme 2166694709, section 1744906803654, block 1767316681231 | offer vYgCNgJz |
| `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/bau-membership-checkout.css` | Encore theme Custom CSS (append the `.plan-tiers*` block) | shared by both checkout themes; confirm both themes carry it |

### STEP 3: Upgrade-moment automation (human; Kajabi admin UI)
Automations cannot be created via API or MCP. Build the automation from the trigger
spec, then paste the email bodies.

- Trigger spec: `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/emails-upgrade/TRIGGER-SPEC.md`
  (entry: member age 60-90 days on monthly/quarterly BAU, active, not already annual).

| Step | Repo file (USD) | Repo file (AUD) | Send |
|---|---|---|---|
| 1 | `emails-upgrade/emails-usd/email-1-lock-in-the-journey.html` | `emails-upgrade/emails-aud/email-1-lock-in-the-journey.html` | day 0 (age ~60d) |
| 2 | `emails-upgrade/emails-usd/email-2-months-free-saving.html` | `emails-upgrade/emails-aud/email-2-months-free-saving.html` | +5 days |
| 3 | `emails-upgrade/emails-usd/email-3-community-story.html` | `emails-upgrade/emails-aud/email-3-community-story.html` | +5 days |

(Paths above are relative to
`apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/`.)
Route USD copy to USD-offer members, AUD copy to AUD-offer members. Stop the
sequence on upgrade, cancel, or past-due.

### STEP 4: Annual-moment event (human; Sally + Kajabi admin)
Depends on Sally selecting the event date against a natural community moment.

1. Sally sets the event date and replay-window close; record both in
   `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/README.md`.
2. Build the event (webinar/broadcast) and the three-email send.
3. Paste the event emails and set send dates:

| Email | Repo file (USD) | Repo file (AUD) | Send |
|---|---|---|---|
| Invite | `annual-moment-v1/emails-usd/invite-email.html` | `annual-moment-v1/emails-aud/invite-email.html` | at announce |
| Reminder | `annual-moment-v1/emails-usd/reminder-email.html` | `annual-moment-v1/emails-aud/reminder-email.html` | morning of event |
| Replay expiry | `annual-moment-v1/emails-usd/replay-expiry-email.html` | `annual-moment-v1/emails-aud/replay-expiry-email.html` | ~24h before replay closes |

(Paths above are relative to
`apps/snooze-website/kajabi-deployment/pages/landing/`.)
Set `{{event_date}}`, `{{event_time}}`, `{{event_link}}`, `{{replay_link}}`,
`{{replay_deadline}}` before send. Offer IDs: annual variant 37263 (USD z63s9VaR) /
161176 (AUD vYgCNgJz).

### STEP 5: Post-paste live check
Confirm the checkout renders the quarterly tier in both currencies on the live
Kajabi page (a `LIVE-SWEEP`-style check). Record attendance, replay engagement, and
annual conversions after the event; these feed the `STUB-ANNUAL-MOMENT-V2.md`
trigger.

## Full file list (every file this PRD stages)

Checkout:
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/usd/checkout-blocks.html`
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/aud/checkout-blocks.html`
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/bau-membership-checkout.css`

Upgrade moment:
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/emails-upgrade/TRIGGER-SPEC.md`
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/emails-upgrade/emails-usd/email-1-lock-in-the-journey.html`
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/emails-upgrade/emails-usd/email-2-months-free-saving.html`
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/emails-upgrade/emails-usd/email-3-community-story.html`
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/emails-upgrade/emails-aud/email-1-lock-in-the-journey.html`
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/emails-upgrade/emails-aud/email-2-months-free-saving.html`
- `apps/snooze-website/kajabi-deployment/pages/checkout/bau-membership-checkout/emails-upgrade/emails-aud/email-3-community-story.html`

Event kit:
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/README.md`
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/event-outline.md`
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/offer-mechanics.md`
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/emails-usd/invite-email.html`
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/emails-usd/reminder-email.html`
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/emails-usd/replay-expiry-email.html`
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/emails-aud/invite-email.html`
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/emails-aud/reminder-email.html`
- `apps/snooze-website/kajabi-deployment/pages/landing/annual-moment-v1/emails-aud/replay-expiry-email.html`

Manifest (this file):
- `apps/snooze-website/docs/dynamic-currency/PRD-LADDER-PASTE-BATCH.md`
