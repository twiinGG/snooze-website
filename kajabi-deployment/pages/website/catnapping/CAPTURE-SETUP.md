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

Live, `get_form` 2026-08-05. 103 submissions. `webhook_url: null`, `newsletter_id: null`, so nothing else is listening to it. Created 2024-03-15, last updated 2024-10-31.

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

**This matters for the page promise.** Email 1 is day 0 at **11:00 Melbourne**, not on submit. A parent who submits at 2pm Melbourne waits until 11am the next day for the delivery email. What they get immediately is the **offer grant**, which puts the guide in their Kajabi library.

Two consequences:

- The form's after-submit message should tell them the guide is in their library now and the email is coming, otherwise the page reads as broken for up to 21 hours. That is item 2 in the open list.
- At smoke test, do not wait on email 1 to call the test passed. Verify the **grant** first. See the QA note in `INSTALL.md`.

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

No GTM JSON is written here, because the live `GTM-KNRTH6P` container was not read in this session. Build it in the GTM UI against whichever trigger the form's after-submit behaviour supports.

**Option A, preferred: thank-you page trigger.** Requires the form to redirect (item 1, CONFIRM).

- Trigger: Page View, Page Path equals the thank-you path, on the site container.
- Tag: Meta pixel custom event `Lead`, plus a GA4 event `generate_lead`.
- Parameters: `content_name: catnapping_guide`, `content_category: lead_magnet`, `value: 0`, `currency: AUD`.
- Why preferred: fires after Kajabi has accepted the submission, so it cannot count a failed or validation-blocked submit.

**Option B, fallback: form submit on the page.** Use if the form shows an inline confirmation instead of redirecting.

- Trigger: Form Submission, with **Check Validation** on, Form ID matches the Kajabi embed's form inside `#catnapping-guide-capture`. If the Kajabi embed does not expose a usable form ID, fall back to Click, All Elements, matching CSS selector `#catnapping-guide-capture button[type="submit"]`, and accept that a client-side validation failure can overcount slightly.
- Tag and parameters: same as option A.
- Note the embed posts to `https://www.joinsnooze.com/forms/2148526865/form_submissions`, so the browser leaves the page. Enable **Wait for Tags** on the trigger, or the Lead can be cut off before it sends.

**Do not** add `Purchase` to either option, and do not paste `kajabi-checkout-tracking.js` (row A5) as part of this change. That script belongs to the paid checkout stack and is a separate decision.

**Advanced Matching.** `EMQ-CAPI-ADVANCED-MATCHING.md` covers the checkout surface. The form collects name and email, so the same matching keys are available here, but wiring them is out of scope for this change. Note it as a follow-up rather than improvising a second matching path.

---

## Open items for a human before paste

1. **CONFIRM** automations `369725` and `369723` are still Published and still bound to form `2148526865`. This cannot be read over MCP (automations toolset not enabled for the account), so it is a manual admin check, and it is the one item the whole change depends on.
2. **CONFIRM and probably fix** the form's after-submit behaviour, inline message or redirect, plus the message copy. Not exposed over MCP. Because email 1 does not send until 11:00 Melbourne (item 4b), the after-submit message is the only immediate feedback a parent gets. It should say the guide is in their library now and the email follows.
3. **DECIDE** whether to fix the form's title, subtitle and button copy in Kajabi. The page still reads correctly without it, but the button says "Subscribe".
4. **BUILD** the Lead tag in `GTM-KNRTH6P`. Until it exists, the capture is untracked in Meta and GA4, and no Purchase will cover for it.
5. **CONFIRM** at smoke test that one submission produces one sequence subscription, not two (item 3 above).
6. **DECIDE** the fate of checkout `maowxKB6`: leave it live but unlinked (recommended, protects old links and the 861 historic buyers), or retire it in a separate task with its stale "6 months+" theme copy.
