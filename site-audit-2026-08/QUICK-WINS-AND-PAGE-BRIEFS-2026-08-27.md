# Quick wins and build-ready page briefs

**Date:** August 27, 2026

## Quick wins

| Order | Change | Surface | Effort | Verification |
|---:|---|---|---|---|
| 1 | Add the five missing AUD offer IDs and remove the stale ID from checkout currency fallback | Checkout tracking | Small | Currency tests pass and a test AUD purchase produces AUD |
| 2 | Guard `#form_submission_email` before reading its value | Shared form script | Small | No matching null errors across affected templates |
| 3 | Create Clarity and GA4 funnels for membership and Camp | Analytics | Small | Funnel steps populate from a controlled test |
| 4 | Add 301 redirects for `/privacy`, `/sleep-glossary`, `/snooze-method`, `/snooze` and `/snooze-village` | Routing | Small | Each old URL resolves once to its canonical target |
| 5 | Add Article or BlogPosting schema to the blog template | Blog template | Medium | Rich Results validation passes on three posts |
| 6 | Put `Start here` and `Log in` in distinct navigation roles | Global navigation | Medium | Mobile nav usability test passes |
| 7 | Make high-volume cards and visual affordances consistently clickable | Homepage and offer pages | Medium | Page-filtered dead-click rate falls |
| 8 | Compress and preload the primary hero image where justified | High-volume mobile pages | Medium | Mobile LCP improves without CLS regression |
| 9 | Add tracked intake link, success state and return action | Camp onboarding | Medium | Intake click and completion appear in reporting |
| 10 | Consolidate overlapping blog tags | Blog taxonomy | Medium | One canonical age label and no thin duplicates |

## Page brief: homepage

**Job:** Route a parent to the right next step within one screen and establish trust.

**Primary audience:** New visitors who know the sleep problem but do not know the product.

**Primary action:** `Find the right support` to `/which-is-right-for-us`.

**Secondary actions:** Browse by age, browse by problem and log in.

**Required sections:**

1. Outcome-led hero with one decision CTA.
2. Age and problem route selector.
3. Three support levels: membership, Camp and one-to-one.
4. Proof matched to each support level.
5. Method and Sally credibility.
6. Free-help entry.

**Measurement:** hero CTA click, age route click, problem route click, offer route click, login click and next-page conversion.

**Acceptance checks:** mobile hero loads quickly, no decorative dead-click targets and login remains visible without becoming the primary commercial action.

## Page brief: Which support is right for us?

**Job:** Reduce offer-choice friction and recommend one next step.

**Inputs:** child age, urgency, desired support level and preference for self-paced versus guided help.

**Output:** one recommended route plus two alternatives with clear reasons.

**Decision logic:**

- Ongoing access and community support: Snooze Membership.
- Structured implementation with a real intake: Camp Snooze.
- Individualised high-intent support: consultation.
- Narrow self-paced need: relevant course or guide.

**Required sections:** short selector, recommendation cards, comparison table, proof by route, pricing link and FAQs.

**Measurement:** selector start, selector completion, recommendation shown, CTA click, checkout start and purchase or lead.

## Page brief: Snooze Membership

**Job:** Convert parents who want ongoing guidance, education and expert-moderated community support.

**Primary promise:** A clear place to learn what to do and get ongoing support as sleep changes.

**Primary action:** Start or choose membership using the live canonical offer.

**Required sections:**

1. Who it is for and who needs a higher-support option.
2. What members can access now.
3. How expert support works without unsupported cadence claims.
4. Course and library value.
5. Member pricing benefits.
6. Proof from membership customers.
7. Camp and consultation comparison.
8. Clear billing, renewal and cancellation details.

**Measurement:** plan view, checkout start, purchase, first login, library visit and 7-day activation.

## Page brief: Camp Snooze

**Job:** Convert engaged parents who want structured implementation and more hands-on support.

**Primary action:** View the next intake and reserve a place.

**Required sections:**

1. Current problem and desired outcome.
2. Exact next intake, seat availability and access date.
3. What happens before, during and after camp.
4. Who Camp is for and who should choose membership or a consultation.
5. Named support model and boundaries.
6. Camp-specific proof.
7. Price and member price from the canonical live offer.
8. Post-purchase preview: email, intake, Friday access and where to ask for help.

**Measurement:** intake-date view, CTA click, checkout start, purchase, onboarding start, intake click, intake completion and first Camp access.

## Page brief: age and problem hubs

**Job:** Answer the immediate search intent and route the visitor toward useful help.

**Template:**

1. Plain-language answer above the fold.
2. Common patterns and what to notice.
3. Safe scope boundaries where needed.
4. Relevant free help.
5. Recommended ongoing route.
6. Higher-support route.
7. Closely related age or problem pages.
8. FAQs and structured data.

**Measurement:** engaged session, 50% scroll, internal route click, offer click, lead and purchase-assisted conversion.

## Page brief: Camp onboarding home

**Job:** Get each purchaser ready before access opens and reduce uncertainty.

**Primary action:** Complete the next unfinished onboarding step.

**Required state:** assigned cohort, camp dates, Friday access date, intake status and help route.

**Checklist:** welcome read, details confirmed, intake completed, preparation reviewed and access opened.

**Measurement:** onboarding start, each checklist completion, intake return, help request and first Camp content access.

**Acceptance checks:** no preview token stored, tracked links preserve privacy and completion status survives leaving Kajabi for the form.
