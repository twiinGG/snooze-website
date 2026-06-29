# LMCR04 "5–12 Month Sleep Schedules (Free Module)" — Full Funnel Audit

**Date:** 2026-06-29
**Trigger:** Live "comment 512" organic IG campaign is driving free-module signups; concern that the free → paid journey isn't connected/optimised in Kajabi.
**Method:** Parallel audit across Kajabi (MCP + public REST API), the repo, the Notion Offer OS, and the ops spreadsheets.
**Status of this doc:** Records the verified state and the gaps. The two MCP-invisible layers (live email bodies, Automations triggers) are being captured separately via `agent-browser` and will be appended.

---

## Headline

The core spine **is** connected and live — better than feared. Free signup grants access, tags the contact, fires a live 4-email upsell sequence, and the course contains a dual-CTA bridge lesson to the paid course + membership. The real problems are **correctness and optimisation**, not a broken funnel.

## The funnel as it actually exists (live in Kajabi)

```
IG post "comment 512"
  └─ ManyChat auto-DM        ◀── NOT in git; lives in ManyChat (black box)
       └─ /offers/2x92uaLF/checkout   ($0 checkout — NOT a Kajabi opt-in form; form_count 0)
            ├─ grants Free Module course (2149308933) · 342 members
            └─ tags contact  LM_512_schedule (2149991548) · 341 contacts ✅ counts match
                 ├─ Sequence EMLM04_5-12m Schedule LM Flow (2148765283)
                 │    4 emails Day 0/2/4/6 · all published · LIVE (last_sent 2026-06-29) ✅
                 └─ In-course "What's Next?" bridge lesson (2194028428)
                      ├─ CTA 1 → full course   /offers/Ktxk9mvE  ($117)
                      └─ CTA 2 → Snooze Membership  /offers/z63s9VaR/checkout
```

## Capability finding — what is and isn't readable programmatically

Empirically tested 2026-06-29. **Neither the Kajabi MCP nor the public REST API can read the automation trigger or the live email body copy.**

| Element | MCP | Public REST API (`api.kajabi.com/v1`) | Only via |
|---|---|---|---|
| Email sequence **structure** (subjects, timing, status, stats) | ✅ `get_sequence` | ❌ `email_sequences`/`sequences` → **404** | MCP |
| Email **bodies** + CTA URLs/currency | ❌ no body field, no per-email getter | ❌ 404 | **agent-browser (admin UI)** |
| **Automations** (tag→sequence trigger, offer→tag) | ❌ no `automations` toolset exists | ❌ `automations` → **404** | **agent-browser (admin UI)** |
| Offers / products / contacts / forms | ✅ | ✅ (200) | MCP or API |
| Tags | ✅ | ❌ `tags` → 404 | MCP |
| Offer/landing-page/email **theme** content | ✅ `get_theme_content` | — | MCP |

REST probe result: `forms/offers/contacts/products → 200`; `email_sequences/sequences/automations/tags → 404`. The public API is a strict subset of the MCP. The Automations engine and email-sequence bodies are absent from every official programmatic surface — the admin UI (drivable via `agent-browser`) is the only route.

---

## ID registry (reconciled across Kajabi live, repo, Notion)

Site: **2148291177** (joinsnooze.com). Single site.

| Role | Name / internal code | Offer ID | Product ID | Slug | Price | Status |
|---|---|---|---|---|---|---|
| FREE entry | LMCR04_5-12M-SCHEDULES | 2150914364 | 2149308933 | `2x92uaLF` | $0 USD | published |
| Free access level | (CourseAccessLevel) | — | 2149309110 | — | — | — |
| Paywall wrapper module | (in free-module course) | — | 2159220235 | — | — | **draft** |
| Course upsell | LMCR04_OFR_5-12M-Course-Upsell | 2150914639 | **grants 2149308933 ⚠** | `Ktxk9mvE` | $117 USD | published |
| Canonical full course | PUBCR02_5-12 Course | 2150844344 | 2149258846 | — | $117 USD | published |
| Membership (USD) | PUBMS01_USD_The-Snooze-Membership | 2150754998 | (9 products) | `z63s9VaR` | $79mo / $197q / $657yr | published |
| Membership (AUD twin) | Snooze Access (AUD) | 2151212200 | — | `bEsVXFXG` | A$119mo (q/yr not created) | published |
| Retired founding offer | (do not use) | 2150812784 | — | `6iRarwak` | $147q / $650yr | **draft — retire** |
| Nurture sequence (live) | EMLM04_5-12m Schedule LM Flow | seq 2148765283 | — | — | 4 emails D0/2/4/6 | live |
| Overlapping sequence | EMLM04_Course-Sample-Conversion | seq 2148762811 | — | — | 4 emails | ⚠ possible duplicate |
| Tag (trigger/segmentation) | LM_512_schedule | tag 2149991548 | — | — | 341 contacts | — |
| Thank-you landing page | LMCR04 - Thank You Page | page 2151810974 | — | `/thankyou/2x92uaLF` | — | published |
| In-course bridge lesson | "What's Next?" | lesson 2194028428 | — | — | dual CTA | published |

Sequence emails (EMLM04_5-12m Schedule LM Flow): Day 0 `2150965669` · Day 2 `2150967901` · Day 4 "The Snooze Pivot" `2150967914` · Day 6 `2150967944` — all published.

---

## Gaps, ranked

### 🔴 P0 — Correctness (revenue / data integrity)
1. **The $117 "course upsell" offer grants the wrong product.** Offer `Ktxk9mvE` (2150914639), labelled "5-12 Month Baby Sleep Training Course", grants the *free-module course product* (2149308933) via a **draft** Paywall Wrapper module (2159220235) — **not** the canonical standalone course (product 2149258846, sold via offer 2150844344). Works today only because the free-module course secretly contains the full curriculum behind access levels. Fragile: two "5-12 course" products, split revenue/reporting, easy to grant the wrong SKU.
2. **Banned "live coaching" language on the membership thank-you** (offer 2150754998 post-purchase body: "weekly live coaching… replay vault… 24/7"). This is the funnel's destination and violates the no-live-coaching service-model rule. Repo/site were swept; Kajabi + ManyChat copy were not.

### 🟠 P1 — Leaks & missing segments
3. **No AUD path in the funnel.** Free offer, $117 upsell, and both in-course CTAs are USD-only. AUD membership (2151212200) and draft AUD course offers are never surfaced. Emails are USD-only with a generic "AUD available at joinsnooze.com" footer.
4. **Two competing nurture sequences** (2148765283 live + 2148762811 EMLM04_Course-Sample-Conversion). Risk of double-emailing free-module signups — confirm only one triggers off `LM_512_schedule`.
5. **Offer's own thank-you body dead-ends at `/login`** with no paid CTA. Real CTA work is on the separate thank-you page (2151810974) + in-course. If the offer body renders instead, it's a leak — consolidate.

### 🟡 P2 — Hygiene & documentation
6. **Notion Offer OS row is structurally disconnected.** The 512 offer row (`38c33898b6c281aabde4fcc767ef5404`) is miscategorised "Other" not "Lead Magnet", with no Campaign relation (LMCR04 link is prose-only), no Products relation, no Automations. Funnel works in Kajabi but is invisible to anyone managing offers from the canonical hub.
7. **"comment 512" trigger is a black box outside git.** No repo doc defines the keyword, the DM copy, or the handoff to the `2x92uaLF` checkout. If ManyChat breaks, there's no spec.
8. **Stale `CONNECTED-EXPERIENCE-MVP-PLAN` points every CTA at `6iRarwak`** (retired draft). LMCR04's own assets correctly use `z63s9VaR`; any page built off that plan sends buyers to a dead offer.
9. **LMCR04 project QA checklist is entirely unchecked in-repo** even though the build is demonstrably live — repo doesn't reflect reality.

---

## Verified vs pending

**Verified via MCP/API (2026-06-29):** free offer + product identity, $0 price, access-level grant, tag fires (341 ≈ 342 members), sequence exists/published/firing, in-course dual-CTA lesson + its target URLs, membership offer + AUD twin, the mislabeled upsell grant.

**New findings from the 2026-06-29 capture attempt (MCP):**
- **An opt-in form exists but is orphaned:** `FMLM01_5-12M-Schedules` (form 2149418596), Name+Email only, **0 submissions**, no webhook, not linked to the offer. "form_count 0" on the offer was literally true but misleading — a form exists; the funnel just runs through the `2x92uaLF` $0 checkout instead, and this form has never been used.
- **Double-send risk is near-confirmed:** the two sequences are v1/v2 of the same build — `EMLM04_Course-Sample-Conversion` (2148762811, created 2026-01-15) and `EMLM04_5-12m Schedule LM Flow` (2148765283, created 2026-01-20), identical Day 2/4/6 subjects and cadence, and **both have `last_sent_at` = 2026-06-29**. The deciding fact (shared enrolment trigger) is in Automations — see below.

**Still pending — admin-UI-only, blocked at Kajabi 2FA login (2026-06-29):** agent-browser (both its managed browser and CDP-attach to real Chrome) could not clear the interactive TOTP 2FA wall at `id.kajabi.com`. The Kajabi MCP and public REST API do not expose any of these. Outstanding:
- The 4 live LMCR04 email **bodies** — actual copy, CTA button labels, target URLs, currency, any off-model "live coaching" language.
- The EMLM04_Course-Sample-Conversion sequence bodies + its enrolment trigger.
- The **Automations** trigger→action chain: what applies `LM_512_schedule` on free-offer purchase, and what enrols those contacts into the sequence(s) — confirms or clears the double-send risk.
- The **form** `FMLM01_5-12M-Schedules` post-submit trigger.

To capture these, a one-time interactive Kajabi login is required inside the automation browser's own profile (so the session persists), or a manual pull (paste/screenshot) of the four emails + the Automations list + the form's automation tab.

## Reference

- Kajabi Registry sheet: Google Sheet `1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg` · repo mirror `docs/operations/KAJABI-OFFERS-REGISTRY.md` + `docs/operations/offers-cleaned-2026-06-28.csv`
- Financial model sheet: `1aFrGZWr2VX6KtT9T9EgypmuIQlreYUA0nVB5eeu-ZLM`
- Notion Offer OS hub: `38c33898b6c281918c35eaf0a0d2960b` · 512 offer row `38c33898b6c281aabde4fcc767ef5404` · LMCR04 campaign row `38c33898b6c28136a29cc3674485839c`
- Repo build assets: `apps/snooze-website/course-free-modules-conversion/` (LMCR04 emails, summary-upsell HTML, KAJABI-BUILD-CHECKLIST.md)
