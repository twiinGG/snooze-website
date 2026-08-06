# Install, Catnapping challenge page

**Deploy artifact:** [`catnapping-page-complete.html`](./catnapping-page-complete.html)  
Sidecars (`faq-section.html`, `capture-section.html`, `page-schema.jsonld.html`, `panel-seo.md`) stay as sources of truth / diff helpers. Edit them, then re-sync into the page-complete file in the same commit.

**Doc ownership, one owner per thing.** `INSTALL.md` owns paste steps. [`CAPTURE-SETUP.md`](./CAPTURE-SETUP.md) owns evidence and reasoning. [`CAPTURE-COPY.md`](./CAPTURE-COPY.md) owns member-facing copy. If a change belongs in two of them, it goes in one and the others point at it.

Wired August 2026 (`seo/wire-catnapping-sidecars`): visible FAQ + page JSON-LD (WebPage + FAQPage + BreadcrumbList) live inside the page-complete HTML. Old Article + `#sally` Person block removed.

Capture changed August 5, 2026: the free guide is claimed through Kajabi form `2148526865` plus automations `369725` (grant) and `369723` (sequence), not through the PWYW checkout `maowxKB6`. Evidence, open items and tracking design live in [`CAPTURE-SETUP.md`](./CAPTURE-SETUP.md). Read it before pasting.

Paste-ready copy for the confirmation email and the `/catnapping-guide-ready` confirmation page: [`CAPTURE-COPY.md`](./CAPTURE-COPY.md). Proposed sequence fixes: [`../../sequences/2148414612-catnapping-guide-lead-gen-email-sequence/PROPOSED-EDITS.md`](../../sequences/2148414612-catnapping-guide-lead-gen-email-sequence/PROPOSED-EDITS.md).

---

## What changed in the HTML

| Area | Change |
|------|--------|
| JSON-LD | Single `@graph`: WebPage + FAQPage + BreadcrumbList. Person/Org are `@id` refs only (`…/author/sally-woods#person`, `…/#organization`). No Article, no `#sally`. |
| Visible breadcrumb | `Part of: Find the right sleep help › Catnapping` (hub = `/which-is-right-for-us`) |
| Visible FAQ | `.snooze-faq` with 6 questions, after **First steps**, before **Free catnapping guide** |
| Free guide CTA | **Replaced.** The `maowxKB6` checkout link and its UTMs are gone. `#catnapping-guide-capture` now embeds Kajabi form `2148526865` inline (`forms/2148526865/embed.js`), same pattern as `/contact`, `/newsletter` and `/sleep-regressions`. Source sidecar: [`capture-section.html`](./capture-section.html) |
| Membership CTA | Unchanged (`z63s9VaR`) |
| FAQ CSS | Folded into [`../../global/css/theme-custom-code.css`](../../global/css/theme-custom-code.css) (paste target A2). The old `optional-faq.css` starter was deleted in CNG-002 because it invited edits to a file nothing reads. |
| Form embed CSS | New `#catnapping-page .snooze-form-embed` block at the end of [`../../global/css/theme-custom-code.css`](../../global/css/theme-custom-code.css) (same paste target A2). Styles the Kajabi fields and button to match `.btn`, and hides the embed's own title and subtitle. |
| Preview `<title>` / meta description | Match [`panel-seo.md`](./panel-seo.md) for local preview only. Kajabi panel SEO wins in production; do not paste head tags into the body code block. |

---

## Kajabi paste steps (catnapping website page)

### 1. Panel SEO

1. Website → Website Pages → **catnapping** → ⋯ **Edit details** → SEO and social sharing.
2. Paste title + description from [`panel-seo.md`](./panel-seo.md).
3. **Show page in search results** = On.
4. Page image: hero URL from `panel-seo.md` if OG image is empty.
5. Save. View-source later: confirm **one** title and **one** meta description.

### 2. Page body code block

1. Open the catnapping website page editor.
2. Replace the custom code block that holds the page body with the contents of `#catnapping-page` from [`catnapping-page-complete.html`](./catnapping-page-complete.html) (from `<div id="catnapping-page">` through its closing `</div>`, including JSON-LD, FAQ, CTAs, and inline footer).
3. Do **not** paste the outer `<!DOCTYPE>`, `<html>`, `<head>`, or `<body>` wrappers. Those are local preview helpers only.
4. Save / publish the page.

Same convention as other challenge `*-page-complete.html` files: wrapper must stay `<div id="catnapping-page">` (never `<body id>`).

### 3. Global Custom CSS (FAQ styles)

1. Open [`../../global/css/theme-custom-code.css`](../../global/css/theme-custom-code.css).
2. Paste **whole file** into Customizer → Theme Custom Code → **CSS** ([`PASTE-MAP.md`](../../PASTE-MAP.md) row A2).
3. Save. Required so `.snooze-faq` is styled on live.

### 4. Global header scripts (confirm only)

Confirm Settings → Site details → Header Page Scripts still has, in order:

1. [`schema-organization.html`](../../global/html/schema-organization.html)
2. [`schema-person-sally.html`](../../global/html/schema-person-sally.html)
3. [`blog-schema-paste.html`](../../global/html/blog-schema-paste.html)

Do **not** paste a second Organization or Person graph on the catnapping page.

Optional sameAs additions stay in [`schema-organization-sameAs-proposal.md`](../../global/html/schema-organization-sameAs-proposal.md) until separately approved.

### 5. Guide capture: form, automations, tracking

Full evidence and open items: [`CAPTURE-SETUP.md`](./CAPTURE-SETUP.md). The short version, in the order to do it.

**5a. Confirm the automations (before the page paste).** Marketing → Automations:

| ID | Expected |
|---|---|
| `369725` | Published. When form is submitted: Homepage Catnapping LeadGen Form → Grant an offer: FREE Catnapping Guide |
| `369723` | Published. When form is submitted: Homepage Catnapping LeadGen Form → Subscribe to an email sequence: Catnapping Guide Lead Gen Email Sequence (`2148414612`) |
| `369720` | Published. Leave running. Offer purchased → same sequence, kept for historic `maowxKB6` buyers. Pause it only if the smoke test shows a double subscription |

If either form automation is unpublished or repointed, stop and fix the automation first. The page paste is worthless without them.

**5b. Form changes.** Marketing → Forms → **Homepage Catnapping LeadGen Form** (`2148526865`). Full reasoning in [`CAPTURE-SETUP.md`](./CAPTURE-SETUP.md) "Form changes to make in Kajabi". In short:

| | Change |
|---|---|
| Internal Title | `Homepage Catnapping LeadGen Form` → **`FMLDGD01_Catnapping-Guide`** (registry code `LDGD01`; the form is no longer on the homepage) |
| Embed tab, button | "Subscribe" → **"Send me the free guide"**. The title and subtitle ("JOIN THE NEWSLETTER") are hidden by the page CSS, so the button is the only visible one |
| Confirmation email subject, body, button | Replace with the paste-ready copy in [`CAPTURE-COPY.md`](./CAPTURE-COPY.md). Note the merge-tag warning: `{{first_name}}` is not a listed object in that field |
| Redirect to custom confirmation page | **Turn on**, point at `/catnapping-guide-ready`. Required for the Lead tag in 5e. Page copy and the build decision are in [`CAPTURE-COPY.md`](./CAPTURE-COPY.md) |
| Form fields | **Leave as Name + Email.** Several site-level fields attachable here are `required: true` at site level |
| Double Opt-In | **Leave on** |

**5c. Understand the opt-in gate before you QA.** The form is **Double Opt-In**. A submission fires nothing. The contact gets a confirmation email, clicks **Confirm email**, and only then do `369725` (grant) and `369723` (sequence) run. Day 0 of the sequence starts at the confirm click, and email 1 goes at 11:00 Melbourne, so the guide email can be nearly 23 hours behind the submit. The grant lands at the confirm click, which is why the confirmation page in 5b matters: it is the only fast path to the guide.

**5d. Paste the page** (section 2 above) and the theme CSS (section 3). The CSS is required: without it the Kajabi form renders with its own default chrome and the stale "JOIN THE NEWSLETTER" title shows.

**5e. Build the Lead tag in GTM `GTM-KNRTH6P`.** There is no Lead tag today, so this capture is untracked until one exists. Tag shape, triggers and parameters are specified in [`CAPTURE-SETUP.md`](./CAPTURE-SETUP.md) "Tracking". Three rules:

- Fire **Lead** (Meta) and `generate_lead` (GA4) on the **confirmation page**, not on submit. Double opt-in means an unconfirmed submit is not a lead.
- A submit-time `form_submit` event is fine as a GA4-only diagnostic for confirm-rate. Do not map it to Meta `Lead`.
- Never `Purchase` and never `InitiateCheckout` for a free claim. Do not paste `kajabi-checkout-tracking.js` (paste row A5) as part of this change.

**5f. Checkout `maowxKB6`.** Leave it live and unlinked. It still serves old emails, ads and the 861 historic buyers. Retiring it, and its stale "6 months+" theme copy, is a separate task.

---

## QA checklist

- [ ] Rich Results Test on `https://www.joinsnooze.com/catnapping` → FAQPage (+ BreadcrumbList)
- [ ] View-source: single `<title>`, single meta description, single `FAQPage`
- [ ] No `https://www.joinsnooze.com/#sally` anywhere
- [ ] Person refs use `…/author/sally-woods#person`
- [ ] Visible FAQ (6 `<details>`) between First steps and Free guide; mobile accordion works
- [ ] Visible breadcrumb includes hub link to `/which-is-right-for-us`
- [ ] Membership CTA (`z63s9VaR`) works on mobile
- [ ] FAQ schema `name` / `text` still match visible FAQ after any copy edit (update sidecar + page-complete together)
- [ ] `grep -c 'offers/maowxKB6/checkout"' catnapping-page-complete.html` returns 0 (the only remaining `maowxKB6` mention is the do-not-restore comment)

### Capture QA (after section 5)

- [ ] `#catnapping-guide-capture` renders the real Kajabi form (name + email + button), not an empty gap
- [ ] Embed's own title / subtitle are hidden; the page `<h2>` "Free catnapping guide" and lead paragraph are the visible copy
- [ ] Fields and button match Snooze styling (coral button, beige-bordered inputs), full width on mobile
- [ ] No console errors from `forms/2148526865/embed.js`
- [ ] Smoke test with a real test email: submission appears against form `2148526865`
- [ ] Confirmation email arrives, subject "Important: please confirm your email…", and the **Confirm email** button works
- [ ] Before the confirm click: **no** grant, **no** sequence subscription. That is correct behaviour under double opt-in, not a failure
- [ ] After the confirm click: test contact was **granted** offer `LDGD01` / `2149725554` (FREE Catnapping Guide) and can open the guide. This is the real delivery
- [ ] Confirm click lands on the Snooze confirmation page from 5b, and that page links to the guide
- [ ] Email 1 of sequence `2148414612` arrives. **Not instant:** day 0 at 11:00 Melbourne counted from the confirm click, so afternoon confirmations land the next morning. Check the sequence subscription on the contact record rather than waiting on the inbox
- [ ] Exactly **one** subscription to `2148414612` on the contact record, not two (see `CAPTURE-SETUP.md` item 3)
- [ ] Meta Events Manager / Tag Assistant: **Lead** fired once, on the confirmation page. **No Purchase** and **no InitiateCheckout** for the free claim
- [ ] Stape logs show the Lead event reaching the server container
- [ ] Delete or tag the test contact afterwards so it does not sit in the lead-gen sequence

---

## Clone next

1. `/early-rising`
2. `/nap-transitions`
3. `/sleep-regressions`

See [`docs/seo/challenge-schema-pack/ROLL_OUT.md`](../../../docs/seo/challenge-schema-pack/ROLL_OUT.md).
