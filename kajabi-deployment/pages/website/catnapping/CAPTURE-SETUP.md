# Catnapping guide capture, form + grant (not checkout)

**Page:** `/catnapping` ([`catnapping-page-complete.html`](./catnapping-page-complete.html), section `#catnapping-guide-capture`)
**Decision (August 5, 2026):** the free guide is claimed through the Kajabi **form + grant + sequence** path. The PWYW checkout `maowxKB6` is no longer linked from the challenge page.
**Deploy steps:** [`INSTALL.md`](./INSTALL.md) section 5.

---

## Why the change

| | Old path | New path |
|---|---|---|
| Entry | `offers/maowxKB6/checkout` (pay what you want, $0 allowed) | Kajabi form `2148526865` embedded on `/catnapping` |
| Friction | Full checkout page, name + email + card-optional PWYW field | Name + email, submit in place |
| Delivery | Offer purchase grants `LDGD01_Catnapping-Guide` | Automation `369725` grants the same offer |
| Sequence | Automation `369720` (offer purchased) | Automation `369723` (form submitted) |
| Meta signal | Purchase / InitiateCheckout on a $0 order | **Lead** on form submit |
| Copy risk | Checkout theme copy is stale and age-locks the guide at "6 months+" | Page copy owns the pitch |

A $0 Purchase teaches Meta to optimise toward free claimers. Lead keeps the free guide and the paid offers in separate optimisation lanes. See "Tracking" below.

---

## Verification, August 5, 2026

Kajabi MCP (`https://mcp.kajabi.com/mcp`, site `2148291177`) was authorised mid-session, so the form, the offer and the sequence below are **admin-API confirmed**.

**Service Limitation, narrowed:** two things the MCP could not answer.

- **Automations.** `list_automations` returns "The automations MCP tools are not enabled for this account yet. This capability is still being rolled out." So `369725`, `369723` and `369720` rest on `docs/operations/kajabi-catalogue/KAJABI-CATALOGUE.md`, not on a live read. A human still confirms them.
- **Form after-submit behaviour.** `get_form` does not expose the thank-you message or redirect setting. Still a human check.

Items marked **CONFIRM** need a human in the admin before paste.

### 1. Form `2148526865`, Homepage Catnapping LeadGen Form

Live, `get_form` plus an admin screenshot of Form details, 2026-08-05. 103 submissions. `webhook_url: null`, `newsletter_id: null`, so nothing else is listening to it. Created 2024-03-15, last updated 2024-10-31.

**Opt-in: Double Opt-In (the important one).** The form is set to Double Opt-In, so a submission does **not** fire the automations. The contact receives a confirmation email and must click **Confirm email** first. Only then do `369725` (grant) and `369723` (sequence) run. The real flow is:

```
submit  ->  confirmation email  ->  contact clicks Confirm email
        ->  369725 grants offer 2149725554  +  369723 subscribes to sequence 2148414612
        ->  sequence email 1 at 11:00 Melbourne, day 0
```

Consequences, all of which the deploy has to account for:

- **Nothing is instant.** An unconfirmed submitter never gets the guide and never enters the sequence. They are not a lead in any useful sense.
- **The confirm click is the conversion**, not the submit. That splits the tracking question in two (see Tracking).
- **The page and the confirmation copy have to say "check your email"**, or a parent who submits and waits reads the page as broken.

A custom confirmation email is already configured and switched on: subject "Important: please confirm your email for The Sleep Concierge", body "Thanks for signing up. Click the button below to confirm your subscription to {{site.title}}. / Keep an eye out for your Free Catnapping Guide in your inbox shortly! / - Sally / The Sleep Concierge", button "Confirm email" on coral. The "shortly" is optimistic given the 11:00 send window; see item 4b.

**After Submission: nothing is set.** All three boxes are unchecked (no team notification, no third-party provider, no custom thank-you page), and "Redirect contacts to custom confirmation page" is off, so post-confirmation lands on Kajabi's Default Confirmation Page. Both of those defaults are addressed in the recommendations below.

**Automations panel: CONFIRMED.** The form's own Automations list shows exactly two, both with a published indicator: "Form is submitted → Grant an offer: FREE Catnapping Guide" and "Form is submitted → Subscribe to an email sequence: Catnapping Guide Lead Gen Email Sequence". This closes the automations gap that the MCP could not read.

Fields, both required, matching what the embed serves:

| Field | Handle | Field ID | Type |
|---|---|---|---|
| Name | `name` | `2150719164` | TextField |
| Email | `email` | `2150719165` | EmailField |

`GET https://www.joinsnooze.com/forms/2148526865/embed.js` returns HTTP 200 and posts to `https://www.joinsnooze.com/forms/2148526865/form_submissions`.

Do not add fields. Site-level fields are available to attach (phone, address, Baby's Age, Baby's Date of Birth and others), and several of them carry `required: true` at site level, so attaching one silently adds a required field to this form and to the claim.

**Stale form chrome.** The embed carries its own title, subtitle and button copy, and all three are wrong for this claim:

- Title: `JOIN THE NEWSLETTER`
- Subtitle: `Subscribe to get our latest content by email.`
- Button: `Subscribe`

Two ways to fix it, both listed in `INSTALL.md` section 5:

- **Preferred:** edit the form's title, subtitle and button in Kajabi (Marketing → Forms → Homepage Catnapping LeadGen Form). Safe, because no live page embeds this form today (see item 5), so nothing else inherits the copy.
- **Shipped as a safety net:** the repo hides `.kajabi-form__title` and `.kajabi-form__subtitle` inside `#catnapping-guide-capture` via CSS, so the page's own `<h2>` and lead paragraph carry the pitch even if the form copy is never touched. The button label is **not** hidden, so "Subscribe" stays visible until someone edits the form.

**CONFIRM:** after-submit behaviour. Kajabi forms either show an inline confirmation or redirect to a thank-you page, and the embed payload does not reveal which is set. The sibling masterclass form `2148636994` redirects to thank-you page `2151250258`. Whether this form has one matters for tracking (see Tracking option A).

### 2. Automations `369725` and `369723`

Catalogue evidence only, the automations MCP toolset is not enabled for this account. Both `status: Published` in the catalogue, both triggered by this exact form:

| ID | Trigger | Action |
|---|---|---|
| `369725` | Form is submitted: Homepage Catnapping LeadGen Form | Grant an offer: FREE Catnapping Guide |
| `369723` | Form is submitted: Homepage Catnapping LeadGen Form | Subscribe to an email sequence: Catnapping Guide Lead Gen Email Sequence |

Nothing was rebuilt. The page wires into these two as they stand.

Related, informational: `369721` adds the tag `Catnapping Series Complete` when the sequence finishes.

### 3. Automation `369720`, the purchase path

`status: Published`. Trigger `Offer is purchased: FREE Catnapping Guide`, action subscribe to sequence `2148414612`.

Treat it as **legacy, leave running**. Reasons:

- Historic buyers of `maowxKB6` (861 recorded sales) still need the sequence if anyone reaches the checkout by a direct link, an old email or an ad.
- Kajabi can treat an automation grant as an offer purchase. If it does, `369725` granting the offer will also fire `369720`, so a form submitter hits the sequence subscribe twice (`369723` and `369720`). Kajabi will not double-subscribe a contact already active in the same sequence, so the expected result is one send, not two.

**CONFIRM at smoke test:** submit one test email and check the contact's activity for a single subscription to sequence `2148414612` and exactly one email 1 send. If it doubles, pause `369720` rather than `369723`, because the form is now the primary path.

### 4. Offer identity behind "FREE Catnapping Guide"

One offer, not two. The grant and the checkout point at the same record. `get_offer` 2026-08-05:

| Field | Value |
|---|---|
| Offer code | `LDGD01` |
| Kajabi offer ID | `2149725554` |
| Status | `published` |
| Live title | `FREE Catnapping Guide` (registry target: `Catnapping Guide (Free)`) |
| Live internal title | `LDGD01_Catnapping Guide - Lead Magnet` (registry target: `LDGD01_Catnapping-Guide`, so the drift recorded on 2026-06-28 is still open) |
| Pricing | `$0.00 USD`, `price_strategy: pay_what_you_want`, one-time |
| Product | `2148791611` Catnapping Guide, `DigitalDownload` (registry `GD-CATNAP`) |
| Checkout URL | `https://www.joinsnooze.com/offers/maowxKB6/checkout` |
| Active checkout theme | `2162910889` |
| Post-purchase | `preference: custom_message` with an **empty body** |

So `369725` "Grant an offer: FREE Catnapping Guide" grants offer `2149725554`, which is the same entitlement a `maowxKB6` checkout would have granted. The delivery is identical. Only the entry point changed.

The empty post-purchase message is one more reason not to send parents to that checkout: anyone completing it lands on a blank confirmation. Fixing it belongs to the checkout retirement task, not this one.

Source: `get_offer` via Kajabi MCP, cross-checked against `docs/operations/offers-verified-kajabi-2026-06-28.csv` row 17, `docs/operations/KAJABI-OFFERS-REGISTRY.md` (LDGD01) and `docs/operations/KAJABI-PRODUCTS-REGISTRY.md` (GD-CATNAP).

### 4b. Sequence `2148414612`, and why email 1 is not instant

`get_sequence` 2026-08-05. Three emails, all `publication_status: published`. Send hour 11, timezone Melbourne.

| # | Email | Day | Send time | Subject |
|---|---|---|---|---|
| 1 | `2149832304` Welcome + Guide Delivery | 0 | 11:00 | Your Catnapping Guide (quick win inside!) |
| 2 | `2149832305` Problem + Solution | 2 | 11:00 | Baby still stuck with 30-minute naps? |
| 3 | `2149832306` Transformation Focus | 3 | 09:00 | From exhausted to 14 hours of sleep a day |

`last_sent_at` 2026-08-05, so the sequence is live and sending. `subscriber_count: 0`, so nobody is mid-sequence right now.

**This matters for the page promise.** Email 1 is day 0 at **11:00 Melbourne**, and day 0 starts at the **confirm click**, not the submit. Stack that on double opt-in and the worst case is: submit at 12:00, confirm at 12:05, wait until 11:00 the next day for the guide email. Just under 23 hours.

The grant lands at the confirm click, so the guide is in the contact's Kajabi library well before the email arrives. Nothing in the current setup tells them that, because the post-confirmation page is Kajabi's default.

Two consequences:

- The confirmation page is the only place that can bridge the gap. Point it at a Snooze page that links straight to the guide. See recommendation R3.
- At smoke test, do not wait on email 1 to call the test passed, and do not expect anything at all until the confirmation link is clicked. Verify the **grant** first. See the QA note in `INSTALL.md`.

### 5. Where the form is used today, and double-submit risk

**Nowhere on the live site.** Curl of `https://www.joinsnooze.com/` and `https://www.joinsnooze.com/catnapping` with a desktop UA found no `forms/2148526865/embed.js`. Repo grep across `apps/snooze-website/` found no page embedding it either. The name is historic: an older homepage carried it, which is where the 103 submissions came from.

Consequences:

- **No double-submit risk.** `/catnapping` becomes the only surface embedding form `2148526865`.
- Editing the form's title, subtitle and button copy in Kajabi affects nothing else.
- If the form is later re-added to the homepage, both surfaces share one submission stream and one set of automations. That is fine for delivery, but page-level attribution then needs the hidden-field or dataLayer approach below.

Live pages that already embed a Kajabi form the same way, for reference: `/contact` (form `2148762495`), `/newsletter` and `/newsletter-subscribe` (form `2148722040`), `/sleep-regressions` (form `2148636994`).

---

## Attribution

The checkout UTMs (`utm_source=site&utm_medium=challenge_page&utm_campaign=catnapping_guide`) are gone with the checkout link. A Kajabi form post does not carry them through. Three options, in order of preference:

1. **dataLayer only (shipped).** The Lead event carries `page_path`, so `/catnapping` versus any future homepage embed is separable in GA4 and Meta without touching Kajabi. Sufficient for "which page captured this".
2. **Hidden field on the form (Kajabi-side, optional).** Add a hidden field such as `source` with value `catnapping_page` in the form builder. This stamps the submission record itself, which is what you want if attribution has to be visible to Sally inside Kajabi. Breaks as soon as the same form is embedded on a second page with a different intended value, so only do this while `/catnapping` is the only surface.
3. **A dedicated clone of the form per page.** Cleanest attribution, worst maintenance: a clone needs its own grant and sequence automations. Not recommended while one page uses the form.

Landing-page UTMs on `/catnapping` itself (ads, email, social) still work as normal and are unaffected.

---

## Tracking

**Rule: no Purchase and no InitiateCheckout for this claim.** Meta optimisation for the free guide runs on **Lead**.

Current state of the surfaces involved:

| Surface | State |
|---|---|
| GTM container on website pages | `GTM-KNRTH6P`, loaded server-side through Stape (`load.ss.joinsnooze.com`) from Header Page Scripts, paste row A1 |
| Checkout Purchase / InitiateCheckout | `global/js/kajabi-checkout-tracking.js`, paste row A5, **field currently empty in Kajabi**, so nothing fires on checkouts today |
| Lead or CompleteRegistration anywhere | **Gap.** No repo file fires `Lead`, and `global/js/theme-custom-code.js` has no form-submit tracking |

`site-header-page-scripts.html` does define a `trackEvent(category, action, label, value)` helper that pushes to `dataLayer` and calls `fbq('track', action, ...)`, but it is scoped inside an IIFE and hard-codes `currency: 'USD'`. It is not a Lead hook and should not be repurposed as one.

### Proposed tag shape

No GTM JSON is written here, because the live `GTM-KNRTH6P` container was not read in this session. Build it in the GTM UI.

Double opt-in splits this into two distinct events. Track both, and only one of them is the Lead.

**`form_submit`, diagnostic only, not a Lead.** The visitor submitted but has not confirmed. Useful for measuring confirm-rate and for spotting a broken confirmation email; useless as a Meta optimisation signal, because a large share never confirm.

- Trigger: Form Submission with **Check Validation** on, scoped to the form inside `#catnapping-guide-capture`. If the Kajabi embed does not expose a usable form ID, fall back to Click, All Elements, CSS selector `#catnapping-guide-capture button[type="submit"]`, and accept slight overcounting on client-side validation failures.
- The embed posts to `https://www.joinsnooze.com/forms/2148526865/form_submissions`, so the browser leaves the page. Enable **Wait for Tags**, or the event is cut off before it sends.
- Send to GA4 only. **Do not** map this to Meta `Lead`.

**`Lead`, the real one: the post-confirmation page.** The confirm click is where the grant and the sequence actually happen, so that is the lead.

- Requires R3 below: turn on "Redirect contacts to custom confirmation page" and point it at a Snooze page we control. Kajabi's Default Confirmation Page cannot carry a reliable trigger.
- Trigger: Page View, Page Path equals that confirmation page path, on the site container.
- Tag: Meta `Lead`, plus GA4 `generate_lead`.
- Parameters: `content_name: catnapping_guide`, `content_category: lead_magnet`, `value: 0`, `currency: AUD`.
- Guard against reloads and repeat visits, which are common on a link clicked from email: fire once per session, or gate on a query parameter Kajabi appends.

If R3 is rejected and the confirmation stays on the Kajabi default, then fire `Lead` on the submit instead and accept that Meta is optimising toward unconfirmed submitters. State that trade-off out loud rather than letting it happen quietly.

**Do not** add `Purchase` to either option, and do not paste `kajabi-checkout-tracking.js` (row A5) as part of this change. That script belongs to the paid checkout stack and is a separate decision.

**Advanced Matching.** `EMQ-CAPI-ADVANCED-MATCHING.md` covers the checkout surface. The form collects name and email, so the same matching keys are available here, but wiring them is out of scope for this change. Note it as a follow-up rather than improvising a second matching path.

---

## Form changes: the reasoning

**This section owns the reasoning. [`INSTALL.md`](./INSTALL.md) section 5b owns the steps, and [`CAPTURE-COPY.md`](./CAPTURE-COPY.md) owns the words.** Do the changes from 5b's table; read R1 to R4 here for why each one is what it is. If the two ever disagree, 5b is what someone follows in the admin, so fix 5b and re-point this.

Ordered by what breaks without it. R1 to R3 are the ones that matter.

### R1. Why the form is renamed to `FMLDGD01_Catnapping-Guide`

Internal Title, currently `Homepage Catnapping LeadGen Form`. Two problems: it carries no registry code, and it is no longer on the homepage. The form is embedded on `/catnapping` and nowhere else (item 5).

Reasoning, and the honest caveat. `SNOOZE-NAMING-CONVENTIONS.md` v2 covers **offers only**, so there is no ratified form convention to cite. The only precedent in the account is `FMLM01_5-12M-Schedules` (form `2149418596`), which is `FM` + a pre-v2 lead-magnet code + kebab slug. `FMLDGD01_Catnapping-Guide` keeps that `FM` prefix and the `{CODE}_{Kebab-Slug}` shape from the offers convention, and swaps the dead `LM01` numbering for the live registry code `LDGD01`, so the form's name points at the exact offer it grants (`2149725554`).

Alternative if you would rather stay literally consistent with the one precedent: `FMLM02_Catnapping-Guide`. It reads cleaner but tells you nothing about which offer is granted, and `LM` is not a code in v2. My recommendation is `FMLDGD01_Catnapping-Guide`, and then add a one-line "Forms" section to `SNOOZE-NAMING-CONVENTIONS.md` so the next form is not another judgement call.

The **form ID `2148526865` is the durable anchor** and never changes, which is why every reference in this repo leads with the ID. A rename breaks nothing.

The customer-visible embed chrome is a separate field and a separate fix. That copy is not on the Form details screen; it is under the **Embed** tab. It currently reads title "JOIN THE NEWSLETTER", subtitle "Subscribe to get our latest content by email.", button "Subscribe". The page CSS hides the title and subtitle, so the button is the one that shows, which is why 5b changes only the button.

### R2. Why the confirmation email copy is replaced

Subject and structure are fine in shape. One line is factually wrong: "Keep an eye out for your Free Catnapping Guide in your inbox shortly!" With the day-0 11:00 Melbourne send window, "shortly" can mean tomorrow morning.

The replacement has to state the real sequence: confirm, guide is available straight away on the confirmation page, email follows. Sally sign-off and the coral button stay. The paste-ready wording is in [`CAPTURE-COPY.md`](./CAPTURE-COPY.md), not here.

### R3. Why a custom confirmation page

Currently "Redirect contacts to custom confirmation page" is off, so the confirm click lands on Kajabi's Default Confirmation Page. That page is doing two jobs badly: it is the only moment you can hand the parent the guide, and it is the only place a reliable `Lead` tag can fire.

Turn it on and point it at a Snooze page that links directly to the granted guide. That single change fixes the delivery gap and unlocks the Lead trigger in one move.

Optionally also tick **After Submission → Send the contact to a custom thank you page** for the pre-confirmation step, with a page that says "check your email to confirm". Less critical, because Kajabi's default post-submit message does say something, but it is the difference between a parent understanding the flow and abandoning it.

### R4. Leave these alone

- **Double Opt-In: unchanged by this run, and now under review.** The position written here originally was "keep it", on deliverability grounds. [`02-capture-target-state.md`](../../../../../../docs/projects/catnapping-guide/02-capture-target-state.md) section 2 reverses that recommendation to single opt-in with reCAPTCHA, on the grounds that in Kajabi a non-confirmer gets no grant, no sequence and no guide, so the gate is not filtering bad leads, it is failing to deliver to people who asked. Both arguments are real. **The decision belongs to Sally and Kade**, it changes a live consent mechanic, and it is on the CNG-002 gate sheet. Until it is made, the form stays Double Opt-In and the funnel is built to work under it.
- **Form fields: Name and Email only.** Do not attach more. Several site-level fields available on this form (`Baby's Age`, `Baby's Date of Birth`, `Country`, `City`) carry `required: true` at site level, so attaching one silently makes it mandatory on this claim.
- **Send a notification to your team: leave unchecked.** The automations handle delivery, and 103 submissions of inbox noise helps nobody.
- **Send the contact to a third party email provider: leave unchecked.** Kajabi is the list.

---

## Open items for a human before paste

1. ~~CONFIRM automations `369725` and `369723`~~ **Done.** The form's own Automations panel shows both, published, correctly bound. Verified from the admin screenshot 2026-08-05.
2. ~~CONFIRM the form's after-submit behaviour~~ **Done, and it needs fixing.** Nothing is configured. See R3.
3. **DO** R1 to R3 above, in Kajabi, before or alongside the page paste.
4. **BUILD** the `Lead` tag in `GTM-KNRTH6P`, on the R3 confirmation page. Until it exists, the capture is untracked in Meta and GA4, and no Purchase will cover for it.
5. **CONFIRM** at smoke test that one confirmed submission produces one sequence subscription, not two (item 3 above).
6. **DECIDE** the fate of checkout `maowxKB6`: leave it live but unlinked (recommended, protects old links and the 861 historic buyers), or retire it in a separate task with its stale "6 months+" theme copy and empty post-purchase message.
7. **OPTIONAL, follow-up:** add a "Forms" section to `docs/operations/SNOOZE-NAMING-CONVENTIONS.md` so form naming stops being a per-case decision (see R1).
