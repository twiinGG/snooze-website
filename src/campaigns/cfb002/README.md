# CFB-002 campaign source preparation

This source prepares the October 07 webinar and October 19 Camp sales copy. It does not create contacts, send email, schedule a campaign or enforce checkout eligibility. Kade owns setup and operation. The release boundary is the [CFB-002 kickoff](../../../../../docs/projects/camp-full-funnel-buildout/CFB-002-KICKOFF-webinar-and-staged-camp-sales-2026-10-05.md). Planning follows [Business development planning](../../../../../docs/operations/BUSINESS-DEVELOPMENT-PLANNING.md).

`preparation-manifest.json` records prepared local drafts with release held. Rendering means source exists locally. Saved means Kajabi persisted it. Published means the public route serves it. Scheduled means the platform has confirmed the future send/control. Behavior-verified means approved test evidence proves the effect. No stage implies the next one.

Before publishing registration or invitations, run `prepare.py --check-release --resources <resource-file>`. This gate requires declared proofs for the real room's guest joining, recording and attendance route, the live form flow, consent handling, delivered confirmation and registration/join routes. Set these proof flags only after the actual evidence is recorded in root QA and the resource map. The command checks declarations and resource bindings; it cannot inspect the platform itself. Root sales-stage, cutoff, suppression and fulfilment checks remain separate launch requirements. Invitation and registration source can be rendered as local drafts before that gate passes.

`campaign-copy.json` holds reviewed draft subjects, preview text, body paragraphs and audience requirements. Audience strings describe required filters; they are not deployed recipient segments. Use absolute dated Event emails or filtered broadcasts for this calendar. Do not translate these times into signup-relative sequence days.

`prepare.py` produces one self-contained HTML block per landing page, one inline HTML body per email and a folded UTC ICS calendar file. Each landing block includes complete System Initialization CSS, page rules and the canonical inline footer. It reads the existing footer source at render time, so the result matches that source. Landing pages have their own theme; do not paste these into the website theme. No shared theme changes are required.

## Resource bindings

The orchestrator reported the dated [Event 2148821612](https://app.kajabi.com/admin/events/2148821612/edit) and [registration form 2149743605](https://app.kajabi.com/admin/forms/2149743605/edit) as created. The Event is October 07 at 00:00 UTC, equivalent to 11 am Melbourne time, for 50 minutes and with no recurrence. The three draft routes are [registration](https://www.joinsnooze.com/webinar-2026-10-07), [joining details](https://www.joinsnooze.com/webinar-2026-10-07-join) and [replay](https://www.joinsnooze.com/webinar-2026-10-07-replay). These bindings are observed resource identities, not claims that page content is published or signup works.

The root run log and resource map carry live state. `resource-bindings.json` explicitly leaves the missing form embed, room and sales routes unresolved. The renderer refuses to write an asset when its dependency is missing. No fabricated links enter generated HTML.

Use the actual native embed for this form, retaining the verified consent and double-opt-in settings. Store its file path in `registration_form_embed_path`. Do not construct a guessed form action or use an existing paid access grant as registration.

Set `room_url` only after the real room exists. Set `room_guest_join_verified` only after an approved external guest proves joining works. Confirmation, joining reminders and calendar output require that proof. Attendance and recording proof remain separate launch checks.

The `attendee_sales_url`, `waitlist_sales_url` and `public_sales_url` fields remain null until the operator identifies and verifies each route. A URL alone does not enforce stage eligibility. Secure staged access, prices, currency, cutoff and both entitlement paths need separate behavior verification.

Replay output requires actual offset-aware `replay_published_at` and `replay_expires_at`, exactly 72 hours apart, plus `replay_publication_reviewed`. That flag means the actual recording has passed the applicable permission and privacy checks. Configure expiry in the hosting platform; page copy and the renderer do not remove access at expiry. A delayed publication moves replay expiry, never the sales close.

## Preparation commands

```sh
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --check-dates
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --resources apps/snooze-website/src/campaigns/cfb002/resource-bindings.json --asset registration --output apps/snooze-website/kajabi-deployment/pages/landing/cfb002-registration/index.html
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --resources apps/snooze-website/src/campaigns/cfb002/resource-bindings.json --asset thank-you --output apps/snooze-website/kajabi-deployment/pages/landing/cfb002-thank-you/index.html
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --resources apps/snooze-website/src/campaigns/cfb002/resource-bindings.json --asset replay --output apps/snooze-website/kajabi-deployment/pages/landing/cfb002-replay/index.html
python3 apps/snooze-website/src/campaigns/cfb002/prepare.py --resources apps/snooze-website/src/campaigns/cfb002/resource-bindings.json --asset calendar --output apps/snooze-website/kajabi-deployment/pages/landing/cfb002-thank-you/webinar.ics
```

For email bodies use `--asset email:<key>` with a key from the copy file. Source JSON remains a draft. Generated email HTML contains no internal metadata comments, uses `{{first_name}}` and includes the standard plain Sally sign-off. Kajabi supplies its compliance footer. Keep subject and preview text as plain text. Existing theme-builder emails need the replacement procedure in the [Kajabi email skill](../../../../../.agents/skills/kajabi-email-sequences/SKILL.md); delivered content remains the completion test.

## Recipient and scheduling checks

- One confirmation per valid session registration. Late signup skips reminders whose time has passed. It does not trigger future session enrolment.
- Confirmed attendees receive Thursday access only after actual attendance reconciliation. Any verified live participation qualifies. Display names, registration, RSVP and replay views cannot establish attendance.
- Purchased wins over every remaining sales stage. Exclude buyers of this cohort at send time, regardless of purchase route. Keep onboarding and delivery messages.
- Waitlist opening excludes people who already received the attendee opening. Public opening excludes prior opening recipients. Practical and final reminders can reach still-unpurchased eligible recipients.
- Recheck consent and suppression when the platform sends. An audience snapshot taken before attendance import is insufficient.
- Replay publication email waits until processing and public/private review finish. Replay availability expires 72 hours after actual publication. No replay CTA belongs in the October 12 to 14 sales emails.
- Final reminder: Wednesday October 14 at 7 pm Melbourne time. Sales close: Wednesday October 14 at 11:59 pm Melbourne time, exactly `2026-10-14T12:59:00Z`.

The organic drafts need the actual registration route connected to the bio or Story link before publication. Sally supplies the clinical teaching. This preparation includes no new sleep method, feeding advice, personalised plan or sleep outcome claim.

Before deployment run the placeholder scanner and environment validator on the actual rendered release files, follow the [deployment checklist](../../../docs/DEPLOYMENT-CHECKLIST.md), version the scoped source and tag before paste. Keep live preimages and roll back a surface by restoring its captured source through the same documented paste path. HTML output remains prepared until persisted-state, public rendering and actual signup/delivery checks pass.
