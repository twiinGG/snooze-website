# 7-day trial membership email drafts

These are member-facing drafts. They require human approval before a Kajabi send or automation change.

| Email | Send time | Audience and exit condition | Subject | Preview text | Primary job |
|---|---|---|---|---|---|
| `welcome-email.html` | Day 0, immediately after a confirmed trial start | Trial members. Do not send to a failed or pending checkout. | You&rsquo;re in. Start here | Choose your baby&rsquo;s stage and take one clear first step. | Account access and age-path selection. |
| `day-2-3-checkin-email.html` | Day 2 after confirmed trial start | Trial members with access. Stop if the trial has ended. | Your first Snooze step | Open your chosen guide or course and complete the first section. | Complete one recommended action. |
| `day-4-5-checkin-email.html` | Day 5 after confirmed trial start | Trial members with access. Stop if the trial has ended. | A reminder before your trial ends | Your selected plan starts after day seven unless you cancel. | Transparent billing reminder and Snooze Village prompt. |
| `day-8-converted-member-onboarding-email.html` | Day 8 after a confirmed first charge | Members with a confirmed first paid subscription event. Do not send to cancelled, failed-payment or expired trials. | Keep going with Snooze | Return to the guide or course that fits your baby&rsquo;s stage. | Converted-member onboarding. |
| `trial-ended-followup-email.html` | Day 8 after a confirmed expired or cancelled trial | Trial members with no confirmed first charge. Do not send a discount or a fabricated offer. | Your Snooze trial has ended | You can return when structured sleep support is useful. | Non-converter recovery. |

## Kajabi trigger notes

- Subscribe a contact only after a confirmed $0 trial order for either authorised trial offer. A checkout-page view does not start this sequence.
- The Day 0, Day 2 and Day 5 emails use the same trial-start timestamp. Do not reset delays when a contact revisits a checkout page.
- Stop the trial sequence when Kajabi records cancellation, expiry or a first paid subscription event. The Day 8 branch must be mutually exclusive.
- Send the converted-member email only after a confirmed first charge. A `trial_started` event is not a conversion signal.
- Send the non-converter recovery email only after a confirmed cancellation or expiry without a first charge. Do not use a missing tag as the only proof of non-conversion.
- Current source files contain no merge field for the selected plan, amount, cadence or first-charge date. Keep the billing language general until an authoritative field is available.
- Email bodies use Kajabi-safe inline styling. Enter the subject and preview text from this table in Kajabi rather than adding metadata comments to the deployable HTML.
