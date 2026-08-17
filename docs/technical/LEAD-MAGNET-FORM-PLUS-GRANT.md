# Lead magnets: the two claim patterns (canonical)

**Authored August 13, 2026 from WS-006, which built it on five magnets and verified every step live.**
Diagram: [`docs/projects/website-surfaces/diagrams/WS-006-lead-magnet-flows.excalidraw`](../../../docs/projects/website-surfaces/diagrams/WS-006-lead-magnet-flows.excalidraw).
Evidence: [`docs/projects/website-surfaces/4_working/WS-006-run-log-2026-08-13.md`](../../../docs/projects/website-surfaces/4_working/WS-006-run-log-2026-08-13.md).

> **SPLIT BY ARTEFACT TYPE, August 14, 2026 (WS-008).** This is no longer one pattern. Read
> "Which pattern applies" below before building anything. A magnet whose artefact is a **file** gets no
> Kajabi account at all; a magnet whose artefact lives **inside Kajabi** keeps form plus grant and adds a
> login-aware delivery page. Settled by the four-lane
> [CA-05 review](../../../docs/projects/website-surfaces/5_followups/CA-05-MULTI-PROVIDER-REVIEW-2026-08-14.md)
> and built in [WS-008](../../../docs/projects/website-surfaces/4_working/WS-008-run-log-2026-08-14.md).
>
> **CONTESTED RESOLVED, August 14, 2026, by measurement.** Both accounts were true, of different paths.
> One claim on a genuinely new address with no Kajabi session confirmed WS-006's five claims exactly:
> contact in 2 seconds, grant in 8, **one** email (Kajabi's member invite, branded domain), whose link
> opens "Create New Password" and, once submitted, auto-signs the member in on the product. Ninety
> seconds end to end.
>
> Kade's clunky path is real and it is **our own copy, not the pattern**. It starts on the delivery
> page: its CTA points at `/products/<slug>`, which is a login wall for a claimer who has no password
> yet, and the only way forward from that screen is Forgot Password, which asks for the email again.
> The sequence email's "You can log in and start right here" walls the parent the same way. The invite
> token is also single-use, so a second click on the email lands on the same reset screen.
>
> **The pattern stands. Build the next magnet this way.** One ruling is still open with Kade: whether
> the delivery pages get the button fix described in rule 4 below, or the funnel reverts to checkouts.
> Evidence: [`WS-007-run-log-2026-08-14.md`](../../../docs/projects/website-surfaces/4_working/WS-007-run-log-2026-08-14.md).

This is how a free magnet is claimed on this site. Build the next one one of these two ways; do not
invent a third without a ruling.

## Which pattern applies

One question decides it: **where does the artefact live?**

| Artefact | Pattern | What the parent gets |
|---|---|---|
| A **file** (PDF, checklist, printable) | **A. Form plus subscribe.** No offer grant, no Kajabi account | The file itself, immediately, on the delivery page and again in sequence email 1 |
| **Inside Kajabi** (course module, lesson, sample) | **B. Form plus grant**, with a login-aware delivery page | An account they must set a password for, and a delivery page that starts that password setup |

Never grant a Kajabi offer for a file. It creates a passwordless member whose only function is to
trigger an invite email about something that needs no login. In the CA-05 review's words, it
"manufactures a problem the PDF does not have".

Today: `FwisMwa6` and `maowxKB6` are pattern A. `zs2zLeUw`, `4HQjFJGC`, `dk25rdGU` and `2x92uaLF` are
pattern B.

## Pattern A, file magnets, in one line

A form on the page the parent is already reading creates the contact and subscribes them. The delivery
page's primary action is the file on Cloudflare R2, served immediately with no session. Sequence email 1
repeats that link. **No offer grant, no account, no invite email, no password screen.**

Build it by leaving the subscribe automation published and the grant automation in **Draft**. Draft
rather than deleted, so re-arming it is one click from the automations list row.

## Pattern B, course magnets, in one line

A form on the page the parent is already reading creates the contact, an automation grants the offer,
and Kajabi's own new-member invite email carries the password link. No checkout anywhere. The delivery
page then has to survive a claimer who has no password yet: see rule 4.

## Why the $0 checkout was retired

A free "purchase" is a checkout, and a checkout costs the claim: an extra page, an extra click, a
payment-shaped surface for something free, and a `Purchase` event in Meta at $0 that pollutes
optimisation. Form plus grant removes all four and measures as a `Lead`.

## The six pieces, per magnet

| Piece | Rule |
|---|---|
| **Capture form** | Name and email ONLY. **Single opt-in.** Kajabi auto-enables an invisible reCAPTCHA on single opt-in forms; it renders 0x0 and does not disturb layout. |
| **Grant automation** | Trigger: form is submitted. Action: grant an offer. **`Send offer grant email` stays UNCHECKED.** |
| **Subscribe automation** | Trigger: form is submitted. Action: subscribe to the magnet's EMLM sequence. Email 1 sends immediately, not at the sequence's send hour. |
| **Delivery page** | Set on the form as `thank_you_page_id`. Must be an existing Landing Page record. |
| **Capture page** | The age page itself. The magnet section keeps its heading, pitch and cards; only the `.cta-row` holding the old checkout button is replaced by the `.snooze-form-embed` div. |
| **Onward step** | The 7 day trial `mqQikDM7` only. Never the $117 standalone course. Renewal disclosure adjacent, no price. |

## The five rules that are not obvious, and cost a rebuild if missed

**1. Never attach site-level fields.** `Baby's Age`, `Baby's Date of Birth`, `Country` and `City` are
`required: true` at site level on this account. Adding any of them to a magnet form silently makes it
required and kills the conversion. Name and email, nothing else.

**2. Delivery is `form[thank_you_page_id]`, not the offer's post-purchase page.** With no checkout the
offer's post-purchase page never renders. Under double opt-in the redirect came from
`double_opt_in_settings.landing_page_id`, which only fires on the confirmation click; switching to
single opt-in therefore silently removes the redirect unless `thank_you_page_id` is set in the same
save. **It is two settings, not one.**

WS-008 found this live on the catnapping form, `2148526865`, which had run since 2024. It was still
double opt-in with `thank_you_page_id` empty, so a claim landed on
`https://www.joinsnooze.com/forms/2148526865/thank_you`, a bare Kajabi page reading "Thank you! We have
received your submission." No guide, no preview, no trial CTA. **Check both settings on any form you
inherit**, not only on the ones you build.

**3. The password email is Kajabi's automatic member invite, not the offer grant email.** It fires
from the grant, within the same second, from the branded `kjbm.joinsnooze.com` domain, and lands in
Gmail's Updates tab. Setting the password auto-signs the member in and drops them on the product.
Ticking `Send offer grant email` only adds a second, redundant email.

**4. Delivery page copy must point at the email, not at a login. So must the BUTTON, and WS-006 fixed
only the wording.** A claimer reaches the delivery page *before* the invite arrives, so at that moment
they have no password and any "log in and it's in your library" CTA walls them. Correct wording: "It is
already in your Snooze Library. Check your inbox for how to set your password and get access."

WS-007 measured what the leftover button costs. A `/products/<slug>` CTA sends a passwordless claimer to
`/login`, "You need to sign in or sign up before continuing", whose only affordance is Forgot Password,
which goes to `/password/new` and asks for the email address again. That single button reproduces the
entire "clunky flow" complaint, on a flow that otherwise delivers in ninety seconds. **The same applies
to sequence email 1:** "You can log in and start right here" walls the parent identically.

**WS-008 built the fix and it is stricter than "check your inbox".** The delivery page is login-aware:

- **Guest, server-rendered in the markup** so it survives with JavaScript off: say the account is made,
  and make the primary action **start password setup** at `https://www.joinsnooze.com/password/new`.
  Do not tell the parent to go and find an email. That instruction survives none of a second device, a
  spent token, a prefetched link, or a repeat claimer.
- **Member, a JavaScript upgrade inside `try/catch`:** swap the copy to "It is in your Snooze Library"
  and the button to the product link.
- Detect with `window.Kajabi.currentSiteUser.type`, which is `Guest` or `Member`. **Do not use
  `SnoozeUserDetection` on a landing page:** it infers membership from a `/login` link in the site nav,
  and landing pages carry their own theme with no site nav, so it calls every visitor new.
- `/password/new` accepts **no** email prefill. `?email=...` is ignored and the field renders empty, so
  the page has to tell the parent which address to use.

**A repeat claimer receives no invite email at all.** Measured August 14, 2026: an existing contact
claiming a second magnet got the grant and no second "Your New Snooze Account" message, eleven minutes
after the write. That is why the password-setup link is mandatory, not a nicety.

**5. Sequence email 1 must not promise a library link as the only path** for a magnet whose artefact
is a file. For a course magnet the library works once the password is set. For a DigitalDownload, see
the hosting rule below.

## Double opt-in is OFF, and why (Kade ruling, August 13, 2026)

This supersedes the earlier double opt-in decision. Two reasons, both measured:

- **The login wall already enforces hygiene.** A mistyped address never receives the password email
  and never gets in, so the confirmation step bought nothing the product did not already enforce.
- **The confirmation email cannot be fixed.** Kajabi classifies the form double opt-in confirmation as
  a *system* email and sends it from the shared `t.kajabimail.com` pool regardless of the site's
  custom email domain, with no `List-Unsubscribe`. It lands in Promotions. The form screen exposes no
  sender field. Marketing Settings already has the custom domain complete and applied; it does not
  apply to this email. **There is no setting to flip.**

Cost accepted: reCAPTCHA gets enabled, and typo addresses receive grants they can never use.

## Hosting a downloadable magnet: R2, not Kajabi

For a magnet whose artefact is a **file** rather than a course, Kajabi cannot deliver it:

- Kajabi routes uploads by asset type. Images go to a public `images/` prefix; everything else goes to
  `files/`, private, signed-only. `get_media` returns `X-Amz-Expires=604800`, a **7-day** URL: a
  button that passes QA and 404s a week later.
- A form-created contact has product access but no password and no session, so a `/products/` or
  `/downloads/` link is a login wall on the exact click where the parent expects the guide.

**So the public copy lives on Cloudflare R2** and the page and emails link that. Proven twice: the
catnapping guide (CNG-002) and the 3-to-2 nap transition guide (WS-006). Serve it unsigned, verify by
fetching the served bytes and comparing sha256 against the local build, and keep the Kajabi library
copy in sync for members who arrive through a paid offer.

## Verification standard

A magnet is not done until a real claim has been run end to end and each step confirmed by MCP read or
Bash, never from a screen:

1. Submission recorded, `contact_id` attached.
2. Contact exists, `created_source: form_submission`.
3. Purchase exists, `type: grant`, `granted_by: automation`.
4. Product access exists, `access_source: OfferGrant`.
5. Exactly one email received, the member invite, on the branded domain.
6. Password set, member signed in, product content renders with no paywall.

**A negative on a freshly created record is only valid if the read is timestamped after the write.**
This phase produced two false "it failed" readings from sweeps run inside the wrong minute, and one of
them nearly caused a rebuild of a flow that was working.

**For a pattern A magnet the standard inverts on steps 3, 4 and 6.** The test passes when there is
**no** purchase, **no** product access and **no** invite email, and when `get_contact` returns
`is_member: false` with empty `purchases` and `products`. Step 5 becomes "exactly one email, sequence
email 1". Step 6 becomes "the file opens with no session", proved by a `curl --http1.1` of the R2 URL.

**Reopen the automations list after building each magnet.** A duplicate subscribe automation is
invisible to a claim test, because Kajabi will not double-subscribe a contact already active in the
same sequence. Only the list catches it.

## Retiring a magnet's checkout

Kajabi has no path-redirect surface, so a 301 is unavailable. The ruling is a **hard bounce with the
offer left published**:

- Replace the checkout's custom-code block with `location.replace('<capture page>')` plus a
  `<noscript>` fallback link. No HTML comments.
- **Do not draft the offer.** Drafting blanks the code block, so the bounce would not render.
  Entitlement survives either way because nothing is deleted.
- Sweep the repo and the live pages for the slug afterwards and confirm every remaining public link is
  one the bounce catches.
- Verify with `curl --http1.1`. A 403 over HTTP/2 on an offer URL is a client artefact, not a finding.

Repo sources: `kajabi-deployment/pages/checkout/lead-magnet-samples/*/retired-checkout-bounce.html`.
