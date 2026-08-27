# Authenticated Camp onboarding notes

**Observed:** August 27, 2026  
**Method:** Read-only walkthrough from the signed-in Kajabi admin to the member-facing course preview. No preview token is stored here.

## Admin evidence

[Welcome To Camp](https://app.kajabi.com/admin/products/2149544830) exists as an evergreen Kajabi course. The course list showed four members. Its member-facing preview contains six lessons across three modules.

## Member-facing structure

```text
Welcome To Camp
├── Start here
│   ├── Welcome, and what happens next
│   └── Your intake form
├── Before camp
│   ├── How camp works
│   └── What to have ready
└── Your camp details
    ├── Your cohort, your dates, your Friday
    └── Need help sooner? Tell us
```

The course homepage presents one primary `Start Course` action. It also exposes `Camp Snooze` and `Access Snooze` in the member header.

## Observed onboarding sequence

1. Purchase opens the Camp home base immediately.
2. A confirmation email supplies the assigned camp, start date and Friday access date.
3. The member completes an intake form linked from both the email and the course.
4. The camp space and full Snooze access open together on the Friday before camp.
5. The course tells members to reply to the confirmation email when they need help before access opens.

## Intake handoff

The intake lesson links to the current Google Form at `https://forms.gle/JxzVuV4LBdjRvkZf6`. It states that the intake is chased but does not gate access.

## Early observations, not final recommendations

- The first screen gives a clear single action and a visible six-lesson progress state.
- The sequence explains the delayed-access model in plain language.
- The member header offers a direct path to Camp acquisition content and the Snooze community.
- The course footer is Kajabi-branded and uses Kajabi social links rather than Snooze links.
- The intake handoff leaves Kajabi for Google Forms. Measurement continuity and form-return behaviour require evidence before any recommendation.

These are observed facts and bounded hypotheses. They are not the final onboarding audit.

