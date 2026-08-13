# Newborn guide preview capture: paste-ready copy

Companion to the WS-006 run log. Everything here is paste-ready copy for form `2149692312` (`FMLDCR04_Newborn-Guide-Preview`), which replaces the `zs2zLeUw` checkout as the entry point for the Newborn Sleep Guide preview.

Derived from [`../../catnapping/CAPTURE-COPY.md`](../../catnapping/CAPTURE-COPY.md), which was the approved shape under double opt-in. This doc has since diverged from it on opt-in, on the after-submit setting and on delivery. Where they differ, this doc is current and catnapping is the older pattern.

**Revised August 13, 2026** after Kade ruled single opt-in. Every step below is proven by a real claim on the live page, not by a screenshot. Two earlier versions of this doc were wrong and both are corrected in place, with the reason kept so the error is not repeated.

Flow this copy serves:

```
/newborn-baby-sleep-help form 2149692312  ->  submit
   ->  grant automation grants offer 2150851932  +  sequence automation subscribes to 2148871323
   ->  /newborn-guide-preview-ready  (thank-you page setting, reached immediately)
   ->  Kajabi member invite email, "Set up password", arrives within seconds
   ->  password set signs the member in and opens the product
   ->  sequence email 1
```

Measured on the second pilot claim: submit at 08:53:06Z, contact at 08:53:07Z, grant at 08:53:15Z, invite email at 08:53:18Z. Nine seconds from submit to granted access.

---

## 1. Opt-in setting

**Single Opt-In.** Kade ruling, August 13, 2026. This supersedes the earlier "Double Opt-In: ON" ruling in this doc and kickoff decision 3.

Reason: a mistyped or fake address is already caught downstream, because every course magnet and the trial need a login, and the password email is the only way in. Double opt-in was buying hygiene the login wall already enforces.

What it cost, which is why it was reversed: the double opt-in confirmation email is sent by Kajabi from its shared `t.kajabimail.com` pool, not from the branded `kjbm.joinsnooze.com` domain that every other Snooze email uses, and it carries no `List-Unsubscribe` header. On the first pilot claim Gmail filed it under **Promotions** while both branded emails landed in **Updates**. There is no setting for this. Marketing Settings already shows Custom Email Domain setup complete and applied, and the form screen exposes no sender field. Kajabi treats the opt-in confirmation as a system email.

Kajabi enables reCAPTCHA automatically on single opt-in forms. It is the invisible kind, renders 0 x 0, and does not disturb the embed at 1440 or 390. Google's floating badge appears bottom-right on the page.

---

## 2. Confirmation email: configured but no longer sends

Leave the settings in place. Single opt-in makes them dormant, and keeping them means the ruling is reversible without rebuilding the email. **Nothing below reaches a parent while single opt-in is on.**

Kajabi path: Marketing, then Forms, then form `2149692312`, then Opt-in Settings, then Additional Options, then "Send custom confirmation email to new contacts".

### Subject

```
One click and your newborn guide preview is yours
```

### Body

```
You asked for the free preview of the Newborn Sleep Guide. One click and it is yours.

Confirming tells us we have your address right, so the emails that follow reach you instead of a spam folder.

The preview is on the page you land on, so you do not have to wait for an inbox. Over the next few days I will also send you the practical parts: wake windows in the fourth trimester, why overtired looks exactly like not tired, and what comes after the newborn weeks.

Sweet dreams,

Sally
The Sleep Concierge
```

### Confirmation button

Label only. Kajabi generates the URL.

```
Confirm and get the preview
```

Background `#F43357`. Text white.

**Correction, recorded so the false lead is not chased again.** An earlier version of this doc printed the button as a bare `[Confirm and get the preview]` line inside the body block, and the first failed pilot reading was blamed on that ambiguity. Read directly from the admin, that was wrong on both counts.

- The opt-in screen carries a dedicated **Confirmation Button** block with exactly three fields, `message_button_text`, `message_button_background_color` and `message_button_text_color`. There is **no URL field anywhere on the screen**, so an author cannot set the href even by mistake.
- The body field is named `message_intro` and Kajabi appends its own button beneath it. The stored body was five paragraphs of prose with zero anchor tags and zero button tags.
- The only merge tags offered are `{{site}}`, `{{offer}}`, `{{member}}` and `{{site_login_url}}`. None is a confirm token, so nothing was left unused.

The first pilot claim did not fail. Confirm worked, the contact was created at 07:02:08Z and the offer was granted at 07:02:15Z. The "no contact, no grant" reading came from a check run before the confirm click landed. **A negative on a freshly created record is only valid if the read is timestamped after the write.**

The merge-tag warning carried over from catnapping still holds: `{{first_name}}` is not listed and the contact is unconfirmed at that point, so a name tag can render as literal text. The copy above uses no name tag.

---

## 3. Embed tab

A new form ships Kajabi's default chrome. The page CSS hides the title and subtitle, so the button is the only piece that shows and the only one that has to be fixed here.

| Field | Set to |
|---|---|
| Button | `Send me the free preview` |
| Title | Hidden by CSS. Leave it or clear it, it does not render |
| Subtitle | Hidden by CSS. Leave it or clear it, it does not render |

---

## 4. After submission

| Setting | Value |
|---|---|
| Send the contact to a custom thank you page | **On**, pointing at `/newborn-guide-preview-ready` (landing page `2152205839`). This is now the delivery destination |
| Redirect contacts to custom confirmation page | Leave set to the same page. Dormant under single opt-in |
| Send a notification to your team | Leave unchecked |
| Send the contact to a third party email provider | Leave unchecked |

**The thank-you page setting is not optional and it is the step most likely to be missed.** Under double opt-in the delivery page was reached by the confirmation click, so `thank_you_page_id` could stay empty. Turn double opt-in off without setting it and the parent lands on Kajabi's bare default page instead, which is the one silent total-loss failure in this flow.

## 4b. Correction: the default thank-you page is NOT editable, and no new page is needed

Two earlier versions of this section were wrong. Both are recorded because each closed off a wrong option.

1. It first said the form's own thank-you page is editable and the check-your-inbox prompt could be a form setting. It cannot. `curl https://www.joinsnooze.com/forms/2149692312/thank_you` returns 12KB with zero `data-section-id` attributes, so it is a hardcoded Kajabi system page with nothing to edit. The form's only related control is the custom thank-you page dropdown, which takes an existing Landing Page record and offers no inline text field. `embed.js` is a plain POST with no redirect or success-state parameter, so there is no client-side hook either.
2. It then said the fix needed a new landing page, which was outside the authorised write list, and the item was parked. That is also wrong. `/newborn-guide-preview-ready` is already a Landing Page record, so it is selectable in that dropdown as it stands. **No page was created and nothing was needed from outside the write list.**

So there is no post-submit "check your inbox" message on this flow and none is needed. The parent lands on the delivery page immediately. The inbox prompt lives on the age page instead, in section 6 below, because under single opt-in the email is about setting a password and not about confirming.

---

## 5. Fields

**Name and Email only.** Do not attach site-level fields. `Baby's Age`, `Baby's Date of Birth`, `Country` and `City` all carry `required: true` at site level, so attaching one silently makes it mandatory on this claim.

---

## 6. The page copy that goes with it

Shipped in the repo at [`../newborn-page-complete.html`](../newborn-page-complete.html) and live. The section keeps its existing heading and pitch.

| Line | Copy |
|---|---|
| Above the form | Free, no card needed. Add your name and email and the preview is yours. |
| Below the form | Check your inbox for your password link. It sets up your account so the preview stays in your library. |

The line below the form was rewritten when opt-in changed. It previously promised a confirmation link, which no longer exists. Do not reintroduce the words "confirmation link", "one click" or the Promotions and Updates advice on any age page, because under single opt-in there is no confirmation email to look for and the one email that does arrive lands in Updates.

---

## 7. Delivery, and how the parent actually gets in

Kajabi sends its own member invite the moment the grant automation fires. Subject "Your New Snooze by The Sleep Concierge Account", from `Sally <sally@kjbm.joinsnooze.com>`, body "We have set up an account for you on Snooze by The Sleep Concierge. To finish creating your account, set up a password." The button resolves to `/member_invite/<token>`, which redirects to `/password/edit`. Submitting the password signs the member in and lands them on the product.

Proven on the second pilot claim: Module 1 Lesson 1 "About the Newborn Sleep Guide" rendered with real body copy, no paywall and no sign-in prompt.

This is Kajabi's own email and it is not editable through this phase's write list. It is the reason form plus grant works for a course magnet at all, so **do not turn it off** and do not assume the delivery page can replace it.

### Known defect on the delivery page, not fixed

`/newborn-guide-preview-ready` says "Open the Newborn Guide preview" and "Log in with the email you just used and it is waiting in your library". A single opt-in claimer reaches that page **before** the password email, so at that moment they have no password and that link walls them at `/login`. The working path is the email.

That wording is correct for the old checkout flow, which set a password mid-flow, and wrong for form plus grant. The same wording is on all five delivery pages. It is a WS-004 landing page and landing page edits are not on this phase's authorised write list, so it is open for Kade.

---

## 8. Sequence email 1, deliverability line

Email `2151354569` in sequence `2148871323`. Added immediately before the sign-off, once, and not repeated in emails 2 or 3.

```
Using Gmail, drag this email into your Primary tab, or on your phone open it, tap the three dots and choose Move to Primary. Adding sally@sleepconcierge.com.au to your contacts does the same job in five seconds.
```

Styled `font-size: 14px; color: #666666;` to sit quieter than the body. Repo twins: `../../../sequences/2148871323-emlm10-newborn-guide-preview-lead-gen-email-sequence/1-2151354569.html` and `.txt`.

Both surfaces are covered deliberately. Dragging works on Gmail desktop with tabs enabled and there is no drag on the phone, so a line naming only one reads as broken advice.

Keep it, with one expectation corrected: this line cannot rescue the confirmation email, because sequence email 1 only sends after the contact already exists. Under single opt-in that no longer matters. Both branded emails already land in Updates on their own.

---

## 9. Copy review status

Sally has not reviewed any copy in this doc. Kade ruling: ship it and record that she has not seen it.
