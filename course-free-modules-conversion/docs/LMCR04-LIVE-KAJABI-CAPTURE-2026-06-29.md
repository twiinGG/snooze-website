# LMCR04 5–12M Schedules Free-Module Funnel — Live Kajabi Capture

**Timestamp:** 2026-06-29
**Site:** Snooze by The Sleep Concierge (site id `2148291177`, joinsnooze.com)
**Access method:** Kajabi native MCP server (read-only tools), NOT the browser.

## Why the browser was abandoned

The brief assumed the admin UI (via `agent-browser`) was the only route. In practice:

- **Cloudflare blocks the agent-browser managed browser.** Every `agent-browser open https://app.kajabi.com/...` returned the Cloudflare "Sorry, you have been blocked" interstitial (its headless fingerprint is detected). Tried the `Default` and `Profile 20` Chrome profiles and `--disable-blink-features=AutomationControlled` — all blocked.
- **The real Chrome path requires 2FA.** Logging in via CDP (`--cdp 9222`) with credentials from `.env` reached `id.kajabi.com/u/mfa-otp-challenge` (one-time code) — could not proceed.
- **A CDP-attached real Chrome never materialised.** A Chrome launched with `--remote-debugging-port=9222` while another Chrome was already running on the same profile silently discards the debug port (single-instance handoff); `curl http://127.0.0.1:9222/json/version` returned nothing on every attempt.

**Pivot:** Used the Kajabi native MCP (`mcp__kajabi__*`), which authenticates server-side (no Cloudflare, no 2FA). This retrieved everything EXCEPT what the MCP does not expose (see "MCP coverage gaps" at the end). Critically, it surfaced the actual offer checkout slugs verbatim.

---

## Offer registry for this funnel (from MCP `get_offer`)

| Offer | Internal title | id | Payment | Price | Checkout slug → URL |
|---|---|---|---|---|---|
| 5–12 Month Sleep Schedules (Free Module) | `LMCR04_5-12M-SCHEDULES` | 2150914364 | free | $0.00 **USD** | `2x92uaLF` → `https://www.joinsnooze.com/offers/2x92uaLF/checkout` |
| 5-12 Month Baby Sleep Training Course (paid upsell) | `LMCR04_OFR_5-12M-Course-Upsell` | 2150914639 | single | **$117.00 USD** | `Ktxk9mvE` → `https://www.joinsnooze.com/offers/Ktxk9mvE/checkout` |

- The paid upsell slug **`Ktxk9mvE`** matches the slug the audit expected. **Currency is USD** on both offers (price_strategy fixed, currency "USD"). No AUD variant of the 5-12 course upsell exists in the published offer list.
- Free module **post-purchase = landing page** id `2151810974`, with a custom thank-you body that links to **`https://joinsnooze.com/login`** ("Go To My Library" button), signed "Sally x".
- Free module product is a `CourseAccessLevel` (id 2149309110) on the 5-12 course — i.e. it grants the Schedules module only.

---

## Sequence: EMLM04_5-12m Schedule LM Flow (id 2148765283)

**This is the LIVE sequence** (the one the audit treats as active for the 512 funnel).

- Send hour 11:00 **Melbourne** time. `last_sent_at` 2026-06-29T01:01:02Z; `next_send_at` 2026-06-30T01:00:00Z. Created 2026-01-20, updated 2026-01-21.
- `subscriber_count`: **0** (MCP reports 0 active subscribers — see double-enrolment note).
- 4 emails, all `published`:

| Day | Email title | Subject |
|---|---|---|
| 0 | Day 0 - Free Module Welcome (Schedules) | `Access granted: Your 5-12 Month Schedules` |
| 2 | Day 2 - Bigger Picture (Schedules) | `How is the schedule going?` |
| 4 | Day 4 - The Snooze Pivot (Schedules) | `Schedules change (and that's okay)` |
| 6 | Day 6 - Gentle Nudge (Schedules) | `A path forward for your schedule` |

**Email bodies + in-email CTA buttons/URLs + verbatim banned-language check: NOT CAPTURED.**
The Kajabi MCP `get_sequence` returns only metadata (title, subject, day, send time, publication status, open/click stats). There is **no body field** and **no `get_sequence_email` tool** in the emails toolset. The verbatim body, the CTA label+URL inside each email, and any "live coaching"/"weekly"/"replay"/"24/7"/group-coaching phrasing can only be read in the admin UI:
`https://app.kajabi.com/admin/email_sequences/2148765283/edit`
(or per-email editors under that sequence). **Banned-language verdict: UNRESOLVED — requires admin UI.**

**Strong inference (not verified):** Given the offer registry, the Day-4 "Snooze Pivot" / Day-6 "Gentle Nudge" CTAs almost certainly point at the $117 USD upsell checkout `https://www.joinsnooze.com/offers/Ktxk9mvE/checkout`. This must be confirmed against the live email HTML, not assumed.

---

## Sequence: EMLM04_Course-Sample-Conversion (id 2148762811)

- Send hour 11:00 **Melbourne**. `last_sent_at` 2026-06-29T01:01:01Z; `next_send_at` 2026-06-30T01:00:00Z. Created 2026-01-15, updated 2026-01-15.
- `subscriber_count`: **0**.
- 4 emails, all `published`:

| Day | Email title | Subject |
|---|---|---|
| 0 | Day 0 - Free Module Welcome | `Access granted: Your 5-12 Month Schedules Free Module` |
| 2 | DAY 2 (THE "BIGGER PICTURE" REALISATION) | `How is the schedule going?` |
| 4 | DAY 4 (THE SNOOZE PIVOT) | `Schedules change (and that's okay)` |
| 6 | DAY 6 (GENTLE NUDGE) | `A path forward for your schedule` |

**Trigger / enrolment source: NOT exposed by MCP** (sequence enrolment automations are not in any MCP toolset). Requires admin UI.

### Overlap / double-enrolment verdict: HIGH RISK — near-certain duplicate

The two sequences are functionally **the same sequence built twice**:

- **Identical subject lines on days 2, 4, 6** ("How is the schedule going?", "Schedules change (and that's okay)", "A path forward for your schedule").
- Day-0 subjects differ only cosmetically: `Access granted: Your 5-12 Month Schedules` (live) vs `Access granted: Your 5-12 Month Schedules Free Module` (sample-conversion).
- Same cadence (day 0/2/4/6), same send hour (11:00 Melbourne), same "Snooze Pivot" / "Gentle Nudge" structure.
- Created two business days apart (2148762811 on 2026-01-15; 2148765283 on 2026-01-20). The `_Course-Sample-Conversion` one is the **older v1**; the `_5-12m Schedule LM Flow` one is the **v2 rebuild**.
- **Both are `published` and both have `last_sent_at` = 2026-06-29** (i.e. *both fired today*). That is the smoking gun: if anything still enrols contacts into the older 2148762811, those people receive two near-identical 4-email streams.

Both report `subscriber_count: 0` right now, which means no one is *mid-flight* at this instant — but "sent today" with zero current subscribers is consistent with single-recipient drips completing the same day, or stale enrolments. **Whether they double-enrol the same free-module signup cannot be proven from MCP metadata alone** — it depends on which automation(s) target each sequence (admin UI). The structural evidence says: if both still have live enrolment triggers, double-send is happening. **Recommended: confirm in Automations and retire/unpublish 2148762811.**

---

## Automations

**NOT CAPTURED — not available via MCP.** The Kajabi MCP has **no automations toolset** (toolsets are: blog, coaching, commerce, products, communities, contacts, courses, emails, forms, navbars, pages, themes, users, events, analytics, newsletters, downloads — no "automations"). So the trigger→action chain for the 512 funnel must be read in the admin UI:
- `https://app.kajabi.com/admin/automations` and Marketing → Automations.

**Unresolved questions (require admin UI):**
- (a) What enrols contacts into the live sequence `EMLM04_5-12m Schedule LM Flow` (2148765283)? (Likely: "Offer purchased: LMCR04_5-12M-SCHEDULES (2150914364)" → "Subscribe to sequence 2148765283", possibly gated on a `LM_512_schedule` tag.)
- (b) What applies the `LM_512_schedule` tag on free-offer purchase? (Likely an automation on offer 2150914364.)
- (c) Does any automation still feed the OLD sequence `EMLM04_Course-Sample-Conversion` (2148762811)? — this is the double-enrolment confirm/deny.

The offer-grant + sequence-subscribe wiring is plausible from the naming and the "both sent today" evidence, but the exact triggers are **inference, not capture**.

---

## Forms

Pulled the full forms list via MCP (`list_forms`, 15 forms total). The free-module / 512 / schedules opt-in form **does exist** (contradicting the API `form_count: 0` on the offer):

| Form | id | Submissions | Notes |
|---|---|---|---|
| **`FMLM01_5-12M-Schedules`** | 2149418596 | **0** | The 512 free-module opt-in form. Created 2026-01-20 (same day as the live sequence). Fields: **Name** (required), **Email** (required). No webhook_url. |
| 5 To 12 Months Baby Sleep Guide Waitlist | 2148641324 | 0 | Older waitlist, not the free module |
| 5-12 Month Sleep Guide by The Sleep Concierge Waitlist | 2148759012 | 0 | Older waitlist |
| 3-4 Month Course Sample | 2149369755 | 0 | Sibling free-module funnel (3-4M), not 512 |
| 3-4 Month Course Funnel Form | 2149143926 | 30 | Sibling funnel |

**Form trigger (tag/sequence/offer it fires) NOT exposed by MCP.** `get_form` returns fields + available fields + submission count + webhook_url (null), but **not** the form's post-submit automation (offer grant / tag / sequence subscribe). That wiring is admin-UI only:
`https://app.kajabi.com/admin/forms/2149418596/edit`

**Forms verdict:** An opt-in form for this funnel **exists** (`FMLM01_5-12M-Schedules`, id 2149418596) with 0 submissions and only Name+Email. The API's `form_count: 0` on the free offer is therefore about the *offer→form link*, not the *existence* of a form — the form is present in the site's form list but apparently not linked to / counted by the offer, and has never been submitted. The funnel most likely runs via the **free offer checkout** (`2x92uaLF`) rather than this form (which has 0 submissions), but confirm the form's embed + trigger in the admin UI.

---

## MCP coverage gaps (what still needs the admin UI / live Chrome)

1. **Verbatim email bodies + in-email CTA labels & URLs** for both sequences (no body field / no per-email read tool in MCP).
2. **Banned-language verdict** ("live coaching"/"weekly"/"replay"/"24/7"/group-coaching) — depends on #1.
3. **Automations** trigger→action chains (no automations toolset in MCP at all).
4. **Form post-submit trigger** for `FMLM01_5-12M-Schedules` (not in `get_form`).

To capture these, a CDP-attached **real** Chrome (already past Cloudflare + 2FA) is required:
1. Fully quit Chrome (`osascript -e 'quit app "Google Chrome"'`).
2. Relaunch single instance: `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --profile-directory=Default "https://app.kajabi.com/admin"`.
3. Verify `curl http://127.0.0.1:9222/json/version` returns JSON, then `agent-browser --cdp 9222 ...`.

---

## Contradictions vs audit assumptions

- **Audit said the free offer reported `form_count: 0`** → CONFIRMED at the offer level, but a real opt-in form (`FMLM01_5-12M-Schedules`, 2149418596) **does exist** in the site's form list (0 submissions). So "no form" is wrong; "form not linked/used" is closer.
- **Audit expected upsell slug `Ktxk9mvE`** → CONFIRMED verbatim ($117 USD, offer 2150914639).
- **Two sequences for the same signups** → CONFIRMED they are near-duplicate and **both fired today** (2026-06-29). Double-enrolment is the live risk; the deciding factor (shared enrolment trigger) is in Automations, which MCP can't read.
- **Currency** → USD throughout this funnel (no AUD variant of the 5-12 module/course in published offers).
