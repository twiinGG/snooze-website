# 7-day trial membership email drafts

These are member-facing drafts. They require human approval before a Kajabi send or automation change.

| Email | Send time | Audience and exit condition | Subject | Preview text | Primary job |
|---|---|---|---|---|---|
| `welcome-email.html` | Day 0, immediately after a confirmed trial start | Trial members. Do not send to a failed or pending checkout. | You&rsquo;re in. Start here | Choose your baby&rsquo;s stage and take one clear first step. | Account access and age-path selection. |
| `day-2-3-checkin-email.html` | Day 2 after confirmed trial start | Trial members with access. Stop if the trial has ended. | Your first Snooze step | Open your chosen guide or course and complete the first section. | Complete one recommended action. |
| `day-4-5-checkin-email.html` | Day 5 after confirmed trial start | Trial members with access. Stop if the trial has ended. | A reminder before your trial ends | Your selected plan starts after day seven unless you cancel. | Transparent billing reminder and Snooze Village prompt. |
| `day-8-converted-member-onboarding-email.html` | Day 8 after a confirmed first charge | Members with a confirmed first paid subscription event. Do not send to cancelled, failed-payment or expired trials. | Keep going with Snooze | Return to the guide or course that fits your baby&rsquo;s stage. | Converted-member onboarding. |
| `trial-ended-followup-email.html` | PARKED | Do not configure for voluntary cancellations. TCW-001 will own that path. If this draft is later retained for non-cancellation expiry, suppress every contact already routed into TCW-001. | Your Snooze trial has ended | You can return when structured sleep support is useful. | Unassigned fallback draft. |

## Kajabi trigger notes

- Set the offer-level Post-purchase email to `None` for both currency offers.
- Add an `Offer is purchased` subscribe trigger for each authorised trial offer. A checkout-page view does not start this sequence.
- On the same confirmed offer purchase, add the `7-day-trial-started` tag. The tag records the trial start but does not trigger the sequence.
- The Day 0, Day 2 and Day 5 emails use the same trial-start timestamp. Do not reset delays when a contact revisits a checkout page.
- Stop the trial sequence when Kajabi records `Subscription cancelation initiated`, expiry or a first paid subscription event. The Day 8 branches must remain mutually exclusive.
- Send the converted-member email only after a confirmed first charge. A `trial_started` event is not a conversion signal.
- Do not configure the generic non-converter recovery email for voluntary cancellation. The parked [TCW-001 project](../../../../../../../docs/projects/trial-cancellation-winback/) will use the dedicated `Subscription cancelation initiated` trigger after its incentive and checkout mechanics are approved.
- Do not use `Recurring payments cancelation initiated/completed` to enrol TCW-001 and do not enrol it again from `Subscription cancelation complete`.
- If a future non-cancellation expiry recovery email is approved, require a confirmed expiry without a first charge and exclude the TCW-001 entry state. Do not use a missing tag as the only proof of non-conversion.
- Current source files contain no merge field for the selected plan, amount, cadence or first-charge date. Keep the billing language general until an authoritative field is available.
- Email bodies use Kajabi-safe inline styling. Enter the subject and preview text from this table in Kajabi rather than adding metadata comments to the deployable HTML.
