# Catnapping capture: confirmation email and confirmation page copy

Companion to [`CAPTURE-SETUP.md`](./CAPTURE-SETUP.md) (evidence, automation IDs, tracking) and [`INSTALL.md`](./INSTALL.md) (paste order). Everything here is paste-ready copy plus the one build decision behind it.

Flow this copy serves:

```
/catnapping form  ->  confirmation email  ->  Confirm click
   ->  369725 grants offer 2149725554  +  369723 subscribes to sequence 2148414612
   ->  confirmation page (guide delivered here, Lead fires here)
   ->  sequence email 1 at 11:00 Melbourne
```

---

## Decision: where the confirmation redirect goes

**Send them to a Snooze page that delivers the guide. Not a raw file link, and not the Kajabi library.**

### Why not the Kajabi library

The guide is product `2148791611`, `product_type: DigitalDownload`, slug `87b2d625-773b-43f2-940a-48490bdedf33`. Library access needs a Kajabi login, and a contact created by a form submission **has never set a password**. Sending a brand-new lead to the library is sending them to a login wall on the exact click where they expect a PDF.

This is also a live bug in sequence email 1, which currently says "Grab it here in your Member Library". See [`../../sequences/2148414612-catnapping-guide-lead-gen-email-sequence/PROPOSED-EDITS.md`](../../sequences/2148414612-catnapping-guide-lead-gen-email-sequence/PROPOSED-EDITS.md).

### Why not a raw file URL as the redirect target

A bare PDF URL works, but it costs you four things: no page for the `Lead` tag to fire on, no way to set expectations about the emails that follow, no next step toward the membership, and on mobile a PDF tab is a dead end with no way back to the site.

### What to build

One website page, `/catnapping-guide-ready`, wrapper `<div id="catnapping-guide-ready-page">`, **noindex** (it is a fulfilment page, not an SEO surface). It carries: a download button pointing at the guide file, an inline preview so mobile readers do not have to download anything, one line about what arrives by email, and one membership CTA.

**Prerequisite, and it is a real blocker:** the guide PDF needs a public URL from the Kajabi Media Library. The product record does not expose one, and this doc does not invent one. Upload or locate the file, copy its media URL, then drop it into the page.

**Trade-off, stated plainly:** a public media URL is shareable by anyone who has it. For a free lead magnet that is an acceptable cost, and the alternative (gating it) is what creates the login wall above. If the URL leaking is unacceptable, the only real fix is keeping it in the library and accepting that a chunk of claimers never reach it.

---

## Confirmation email (double opt-in)

Kajabi path: Marketing → Forms → form `2148526865` → Opt-in Settings → Additional Options → "Send custom confirmation email to new contacts" (already on).

**Merge-tag warning.** The field's own help note lists `{{site}}`, `{{offer}}`, `{{member}}` and `{{site_login_url}}` as the available objects. `{{first_name}}` is **not** listed, and at this point in the flow the contact is unconfirmed, so a name tag may render as literal text in a live email. The copy below uses no name tag. If you want personalisation, test `{{member.first_name}}` with Preview In Browser first and only keep it if it renders.

### Subject

```
One click and your catnapping guide is yours
```

Current subject is "Important: please confirm your email for The Sleep Concierge". It leads with your admin problem instead of the thing they asked for, and "Important:" is a spam-filter tell. Naming the guide is what lifts the confirm rate, and the confirm rate is the whole funnel now.

### Body

```
You asked for the free catnapping guide. One click and it is yours.

[Confirm and get the guide]

Confirming tells us we have your address right, so the emails that follow reach you instead of a spam folder.

The guide itself is on the page you land on, so you do not have to wait for an inbox. Over the next few days I will also send you the practical parts: what nap lengths actually look like at your baby's age, why the 30 to 45 minute wake happens, and what to change first.

Sweet dreams,

Sally
The Sleep Concierge
```

### Confirmation button

```
Confirm and get the guide
```

Currently "Confirm email", which describes the mechanic rather than the reward. Keep the coral background.

### What changed and why

| Element | Before | After | Reason |
|---|---|---|---|
| Subject | "Important: please confirm your email for The Sleep Concierge" | "One click and your catnapping guide is yours" | Leads with the reward. Drops "Important:", a spam-filter tell |
| Opening | "Thanks for signing up. Click the button below to confirm your subscription to {{site.title}}." | "You asked for the free catnapping guide." | "Confirm your subscription" sounds like a newsletter they do not remember joining. They asked for a guide |
| Timing claim | "Keep an eye out for your Free Catnapping Guide in your inbox shortly!" | "The guide itself is on the page you land on, so you do not have to wait for an inbox" | "Shortly" was wrong. Sequence email 1 goes at 11:00 Melbourne, so it can be nearly a day later. The confirmation page is what delivers straight away |
| Button | "Confirm email" | "Confirm and get the guide" | Names the reward, not the mechanic |

### Corrections from the cross-provider verify pass, 2026-08-06

A non-Anthropic refute pass (Cursor Composer, full output in [`../../../../../../docs/projects/catnapping-guide/4_working-cng002/verify/claims-cursor-composer.md`](../../../../../../docs/projects/catnapping-guide/4_working-cng002/verify/claims-cursor-composer.md)) found two lines in the draft above that misdescribed the delivery mechanic. Both are now fixed in the copy.

| Was | Problem | Now |
|---|---|---|
| "One click and it is **on its way**" | "On its way" reads as inbox delivery. Nothing is emailed at confirm time, and the sequence email can be nearly 23 hours later. A parent would sit waiting for an email that is not coming | "One click and it is **yours**" |
| "Confirming tells us your address is right, so **the guide** lands in your inbox instead of a spam folder" | Factually wrong about cause and effect. Confirming does not deliver the guide to an inbox. It verifies the address for the emails that follow. The guide is delivered on the confirmation page | "so **the emails that follow** reach you instead of a spam folder", plus an explicit line that the guide is on the page

---

## Confirmation page copy

Page: `/catnapping-guide-ready`, noindex. Reached only by the confirm click.

### Hero

```
You're in. Here's your catnapping guide.

Everything below is yours to keep. Save it, print it, or read it right here.

[Download the guide]     (primary, .btn)
```

### Under the button

```
It is also saved in your Snooze library, so you can come back to it any time.
```

Only include that line if the grant reliably creates library access the parent can reach. If setting a password is a hurdle, cut the line rather than sending them somewhere frustrating.

### Inline preview

Embed the PDF below the button so a parent on a phone can read without downloading. Fall back to the download button if the browser cannot render it.

### What happens next

```
What comes next

Over the next few days I will send you three short emails: age-by-age nap norms so you can tell normal from a problem, why short naps happen, and the first change to make. I will also tell you about the Snooze Membership, because it is what I would point you to next. Read it or ignore it, the guide is yours either way.
```

**"No pressure to buy anything" was cut, and it is the most important correction in this document.** Two of the three sequence emails carry a membership call to action. Promising no pressure and then selling in two of three emails is a plain contradiction, easy for a member to screenshot, and under Australian Consumer Law the overall impression is what counts rather than a disclaimer elsewhere. It was flagged as the single most dangerous claim in the funnel by the cross-provider verify pass, and the fix is to say what actually happens.

### Membership CTA (secondary, below the fold)

```
When one guide is not enough

Short naps are usually a symptom of a day that no longer fits. The Snooze Membership has the full age-by-age plans, the courses and Sally's coaching, and this catnapping guide is already part of it.

[See the Snooze Membership]     (.btn-outline, https://www.joinsnooze.com/offers/z63s9VaR/checkout)
```

The guide product is bundled into 34 offers including every Snooze Membership variant, so "already part of it" is factually true and worth saying: it reframes the membership as more of what they already chose.

### Brand rules that apply here

- No "Lifetime access". Use "Access with the Snooze Membership".
- Sally is an "internationally certified sleep consultant and former paediatric nurse". "Former" is mandatory if the nursing background appears at all.
- No em dashes, no Oxford comma.
