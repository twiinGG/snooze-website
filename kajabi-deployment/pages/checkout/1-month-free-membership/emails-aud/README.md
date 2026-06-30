# 1-Month Free Membership - Email Sequence (AUD)

Lifecycle emails for the 1-month free access offer (AUD currency). Identical copy to `../emails-usd` except currency, locale, and the upgrade offer link. Deployed to Kajabi as email campaign / automation emails. All styling is inline (Kajabi strips `<style>` blocks).

## Automation overview

When the free offer is granted:
- Tag: `snooze-trial` (or `1-month-free-granted`)
- Send: Post-Purchase email (welcome-email.html)
- Subscribe: email campaign sequence (Day 7, 14, 21, 25, 30+ emails)

Upgrade offer link used across the sequence: `https://www.joinsnooze.com/offers/vYgCNgJz/checkout` (canonical AUD Snooze Access offer 2151256977; updated 2026-06-30 from the deleted bEsVXFXG/2151212200).

## Emails in this folder

| File | Purpose | Trigger / Delay | Condition | Subject | Preview |
|------|---------|-----------------|-----------|---------|---------|
| `welcome-email.html` | Welcome, sent immediately when free access is granted | Tag `1-month-free-granted` OR access granted; send immediately (automated) | - | Your free month of Snooze starts now! ✨ | You've been granted 1 month of full access to explore everything Snooze has to offer. |
| `day-7-checkin-email.html` | Week-1 check-in | Email campaign sequence; 7 days after welcome | - | How's your free month going? | You're a week into your free month - here are some places to start. |
| `day-14-checkin-email.html` | Mid-point check-in | Email campaign sequence; 14 days after welcome | - | Halfway through your free month | You're halfway through your free month - here's what you might not have discovered yet. |
| `day-21-reminder-email.html` | Final-week reminder | Email campaign sequence; 21 days after welcome | - | One week left in your free month | Your free month ends in 7 days - here's what happens next. |
| `day-25-upgrade-cta-email.html` | Final-days upgrade CTA | Email campaign sequence; 25 days after welcome | - | Your free month ends in 3 days | Upgrade now to continue your access seamlessly - choose quarterly or annual. |
| `day-30-followup-email.html` | Post-expiry follow-up with special offer | Email campaign sequence; 30 days after welcome | Does NOT have tag `upgraded-to-member` | Your free month ended - special offer for you | Because you explored Snooze, here's a special offer to continue your sleep journey. |

Status: ready for Kajabi.

## Outstanding placeholders (BLOCK before deploy)

`day-30-followup-email.html` contains two unresolved placeholders that must be filled before this email ships:
- `[SPECIAL OFFER - e.g., $20 off your first payment, or extend your access, etc.]`
- `[MEMBERSHIP_CHECKOUT_URL]` (the special-offer checkout link)

The P.S. states the special offer is valid for 14 days from when the free month ended.

## Pricing referenced in copy (AUD)

- Quarterly: A$299 every 3 months
- Annual: A$997 per year (save A$199 vs quarterly)
- Member pricing on consultations: $445 instead of $650
