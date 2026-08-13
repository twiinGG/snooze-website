# Lead magnets: the form-plus-grant pattern (canonical)

**Authored August 13, 2026 from WS-006, which built it on five magnets and verified every step live.**
Diagram: [`docs/projects/website-surfaces/diagrams/WS-006-lead-magnet-flows.excalidraw`](../../../docs/projects/website-surfaces/diagrams/WS-006-lead-magnet-flows.excalidraw).
Evidence: [`docs/projects/website-surfaces/4_working/WS-006-run-log-2026-08-13.md`](../../../docs/projects/website-surfaces/4_working/WS-006-run-log-2026-08-13.md).

This is how a free magnet is claimed on this site. Build the next one this way; do not invent a
variant without a ruling.

## The pattern in one line

A form on the page the parent is already reading creates the contact, an automation grants the offer,
and Kajabi's own new-member invite email carries the password link. No checkout anywhere.

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

**3. The password email is Kajabi's automatic member invite, not the offer grant email.** It fires
from the grant, within the same second, from the branded `kjbm.joinsnooze.com` domain, and lands in
Gmail's Updates tab. Setting the password auto-signs the member in and drops them on the product.
Ticking `Send offer grant email` only adds a second, redundant email.

**4. Delivery page copy must point at the email, not at a login.** A claimer reaches the delivery page
*before* the invite arrives, so at that moment they have no password and any "log in and it's in your
library" CTA walls them. Correct wording: "It is already in your Snooze Library. Check your inbox for
how to set your password and get access."

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
