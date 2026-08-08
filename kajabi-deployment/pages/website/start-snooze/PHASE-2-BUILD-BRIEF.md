# Phase 2 build brief for /start-snooze

## Purpose and scope

Create `/start-snooze` as a member-only Kajabi Website Page. After it passes the proof gate, add it to the Snooze Village as a Community custom page. The page collects a small set of durable onboarding details, then directs the member to a relevant starting experience.

Do not add this form to checkout. Do not create form HTML, custom storage, a fetch handler or a contact mutation as part of this phase-1 work.

## Required proof gate

Complete these checks with a test member before any production form build:

1. Sign in as the test member and open the member-only `/start-snooze` page.
2. Confirm the form can identify the signed-in contact without an email field, URL parameter or browser-stored identifier.
3. Submit a dedicated Kajabi profiling form with harmless test values.
4. Confirm the submission is attached to that exact contact in Kajabi.
5. Read the contact profile back and confirm every dedicated field retains the submitted value unchanged.
6. Confirm a second submission updates or appends values according to the documented field behaviour.
7. Confirm a signed-out visitor cannot view or submit the form.

Use the real Kajabi embed from the form&rsquo;s Embed tab. Do not hand-build a form, input fields or a submit handler. `apps/snooze-website/kajabi-deployment/pages/website/KAJABI-FORM-EMBED-PATTERN.md` is the implementation pattern.

If the identity cannot be proved, or Kajabi cannot store `birth_week` reliably, stop the form build. Route the future implementation through the Memory API contact-profile path when its schema exists. Do not ship a form that reports success and loses answers.

## Form fields and validation

| Step | Field | Validation and storage |
|---|---|---|
| 1 | Baby&rsquo;s current age | Required numeric value greater than 0. The input is used only to derive `birth_week`; it is not stored as the canonical age. |
| 1 | Age unit | Required choice: weeks or months. |
| 2 | Main sleep challenges | Optional, choose up to three: night wakings, short naps or catnapping, early rising, bedtime settling, nap transitions, schedule or routine, newborn sleep, toddler sleep or other. |
| 3 | Timezone | Pre-fill from `Intl.DateTimeFormat().resolvedOptions().timeZone`. Require confirmation and store only a valid IANA timezone, for example `Australia/Melbourne`. |
| 4 | Preferred starting experience | Required choice: follow an age course, solve one current challenge, ask in the Village or browse the Library. |

Do not collect feeding, medical or mental-health details. Do not use the site-wide required `Baby&rsquo;s Age` field. Create dedicated onboarding fields only after the proof gate passes.

## Birth-week model

Store a durable approximation rather than a decaying age number.

| Field | Type and rule |
|---|---|
| `birth_week` | Required string in ISO week format `YYYY-Www`. Derive it from the estimated birth date and use the Monday-start ISO week containing that date. |
| `birth_week_captured_at` | Required ISO 8601 timestamp recorded at submission. |
| `birth_week_derivation_method` | Required enum: `submitted_weeks` or `submitted_months_4_345_weeks`. |

Derivation rules:

1. For weeks, use the submitted number of weeks as the offset.
2. For months, multiply the submitted number by 4.345 and round to the nearest whole week.
3. Subtract the offset in whole weeks from the member&rsquo;s local calendar date at submission time.
4. Convert the estimated birth date to its ISO Monday-start week and store only the `birth_week` code, capture time and derivation method.

Do not retain the submitted numeric age or an estimated birth date as canonical profile data. The captured timestamp makes the approximation interpretable later.

## Kajabi field map

Create the following dedicated fields after the proof gate. Confirm their actual Kajabi identifiers before deployment.

| Proposed field | Value |
|---|---|
| `onboarding_birth_week` | Derived `YYYY-Www` value. |
| `onboarding_birth_week_captured_at` | ISO 8601 timestamp. |
| `onboarding_birth_week_derivation_method` | Derivation-method enum. |
| `onboarding_sleep_challenges` | Up to three selected challenge values. |
| `onboarding_timezone` | Confirmed IANA timezone. |
| `onboarding_preferred_start` | Preferred starting experience. |
| `onboarding_completed_at` | ISO 8601 timestamp after successful write confirmation. |
| `onboarding_schema_version` | `start-snooze-v1`. |

Use a documented delimiter or Kajabi-supported multi-select representation for `onboarding_sleep_challenges`. Confirm the profile read-back preserves every selected value before launch.

## Member flow

1. The member opens `/start-snooze` from the Snooze Village.
2. The page explains that the answers help organise a starting point.
3. The member completes the four short steps.
4. The form confirms a successful write only after the platform reports success.
5. The page presents one destination based on the selected age range, challenge or preferred experience.
6. The member opens the recommended content or enters the Snooze Village.

Add a short welcome message and Community guidelines to the Village entry experience. Use Kajabi&rsquo;s acknowledgement setting if available and prove it with the test member.

## Analytics contract

Send no email, name, phone number, birth week, age value, timezone or challenge detail to analytics platforms. Event payloads may include only the fields below.

| Event | Trigger | Allowed properties |
|---|---|---|
| `onboarding_started` | Member first opens the form | `surface`, `onboarding_version` |
| `onboarding_step_completed` | A validated step advances | `step_number`, `onboarding_version` |
| `onboarding_completed` | The storage write succeeds and the confirmation renders | `onboarding_version`, `preferred_start_type` |
| `recommended_path_opened` | Member opens the recommendation | `recommendation_type`, `destination_type` |
| `village_entered` | Member opens the Village from the flow | `placement` |

Phase-2 activation is an onboarding form completion followed by an opened recommended path or Village entry. It is a behavioural proxy, not proof of content completion or a community post.

## Acceptance checks

- `/start-snooze` is member-only and works for the authorised test member.
- Signed-out visitors cannot access or submit the form.
- A completed test submission writes every dedicated field to the correct contact and survives read-back.
- `birth_week` uses the documented ISO format and derivation method.
- The numeric age input is absent from canonical profile storage after submission.
- Challenge selection cannot exceed three.
- Timezone requires confirmation and is a valid IANA value.
- The page does not collect excluded sensitive details.
- The form cannot show success until the write succeeds.
- The recommendation and Village links are tested as the test member.
- Analytics payloads contain no personal or sensitive data.
- Community navigation and guideline acknowledgement are tested before publishing.
