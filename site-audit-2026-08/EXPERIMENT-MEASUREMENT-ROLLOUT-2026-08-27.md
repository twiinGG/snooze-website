# Experiment backlog, measurement plan and 90-day rollout

**Date:** August 27, 2026

## Experiment backlog

| ID | Hypothesis | Primary metric | Guardrail | Priority |
|---|---|---|---|---|
| EXP-01 | One `Find the right support` homepage CTA will increase qualified offer-page visits | Decision-page visits per new homepage session | Login click completion | P0 |
| EXP-02 | Exact Camp intake and access dates beside the CTA will increase qualified checkout starts | Camp checkout starts per Camp session | Checkout abandonment and support contacts | P0 |
| EXP-03 | A three-route recommendation block on age pages will increase meaningful next steps | Offer or free-help clicks per engaged age-page session | Quick-back rate | P1 |
| EXP-04 | Making visual cards consistently clickable will reduce dead clicks | Dead-click sessions on tested pages | Downstream CTA rate | P1 |
| EXP-05 | A mobile hero asset and font-loading change will improve LCP | p75 mobile LCP | CLS and conversion rate | P1 |
| EXP-06 | Camp onboarding checklist and intake confirmation will increase pre-camp activation | Intake completion before access date | Help requests and refunds | P1 |
| EXP-07 | Membership-first comparison copy will improve ongoing-support conversion | Membership purchases per comparison-page session | Camp and consultation qualified leads | P1 |
| EXP-08 | Problem-specific proof will improve offer CTA clicks | CTA clicks per problem-page session | Scroll depth and quick backs | P2 |

Run measurement repairs before commercial tests. Do not start EXP-01, EXP-02 or EXP-07 until purchase, currency and self-referral checks pass.

## Event model

| Journey stage | Event | Required properties |
|---|---|---|
| Discovery | `view_help_page` | page_type, age_or_problem, landing_source |
| Decision | `start_support_selector` | entry_page, device_category |
| Decision | `complete_support_selector` | recommended_route, age, urgency, support_preference |
| Offer | `view_offer` | offer_code, offer_type, currency |
| Offer | `select_offer_cta` | offer_code, placement, cohort_id when Camp |
| Checkout | `begin_checkout` | offer_id, offer_code, currency, value |
| Checkout | `purchase` | transaction_id, offer_id, offer_code, currency, value |
| Onboarding | `onboarding_start` | offer_code, cohort_id |
| Onboarding | `intake_click` | offer_code, cohort_id, link_location |
| Onboarding | `intake_complete` | offer_code, cohort_id |
| Activation | `first_library_view` | offer_code, days_since_purchase |
| Activation | `first_camp_access` | cohort_id, days_before_start |

Use the canonical offer registry code as the stable business key. Keep Kajabi IDs as source identifiers, not reporting labels.

## Funnel definitions

### Membership

```text
view membership or recommendation
-> select membership CTA
-> begin checkout
-> purchase
-> first login
-> first library view
```

### Camp Snooze

```text
view Camp page
-> select Camp CTA
-> begin checkout
-> purchase
-> onboarding start
-> intake complete
-> first Camp access
```

### Consultation

```text
view consultation page
-> contact or booking start
-> qualified lead
-> booking confirmed
```

## Reporting rules

- Exclude internal, admin and known bot traffic.
- Repair cross-domain and self-referral handling before source attribution is used.
- Reconcile Clarity `Purchase`, Clarity `Order success`, GA4 `purchase` and Kajabi orders weekly until definitions match.
- Reconcile Kajabi gross commerce with accounting exports for revenue reporting.
- Report AUD and USD separately unless a documented exchange-rate method is applied.
- Segment acquisition pages from member utility pages.
- Keep observed metrics separate from test hypotheses.

## Core scorecard

| Area | Metric | Cadence |
|---|---|---|
| Acquisition | Organic clicks, paid landing sessions and qualified social sessions | Weekly |
| Navigation | Decision-page reach and meaningful next-step rate | Weekly |
| Behaviour | Dead clicks and quick backs on five priority pages | Weekly |
| Commerce | Checkout start rate, purchase rate and revenue by offer and currency | Weekly |
| Camp | Landing-to-checkout, checkout-to-purchase and intake completion | Per intake and weekly |
| Membership | Purchase, first login and 7-day activation | Weekly |
| SEO | Non-brand clicks, page-one queries, indexed canonical pages and rich-result coverage | Monthly |
| Performance | Mobile p75 LCP, INP and CLS on priority templates | Weekly during changes, then monthly |

## 90-day rollout

### Days 1 to 14: make the evidence trustworthy

- Fix AUD offer currency mapping and add a regression test.
- Guard shared form selectors and verify the error disappears.
- Define purchase and order-success events across Kajabi, GA4 and Clarity.
- Remove self-referrals and exclude admin traffic.
- Configure membership, Camp and consultation funnels.
- Add the five priority redirects.
- Record baseline metrics by page and device.

**Exit condition:** a controlled test journey produces one consistent source, currency, checkout, purchase and onboarding record.

### Days 15 to 35: repair the highest-volume journeys

- Standardise global navigation around Start here, Get help, Ways to work with us and Log in.
- Repair dead-click affordances on homepage, Camp, membership, 5 to 12 month help and consultations.
- Optimise mobile hero LCP on the same pages.
- Add the Camp pre-purchase sequence preview and exact intake dates.
- Add tracked onboarding and intake links.

**Exit condition:** page-level heatmaps show no material broken affordance and mobile performance meets the agreed threshold.

### Days 36 to 60: strengthen discovery and decision pages

- Add Article schema to the blog template.
- Consolidate tag taxonomy and set index rules.
- Implement the three-route pattern on age and problem hubs.
- Strengthen `/which-is-right-for-us` as the universal comparison path.
- Add internal links between age, problem and offer pages.
- Establish a 10 to 20 query citation benchmark across Google AI features, ChatGPT and Perplexity.

**Exit condition:** structured-data tests pass, the sitemap contains only intentional indexable URLs and each hub has a measurable next step.

### Days 61 to 90: test and scale

- Run EXP-01 and EXP-02 first.
- Launch EXP-06 for the next Camp intake when sample and operations permit.
- Run EXP-03 on the highest-traffic age page.
- Compare results by mobile browser, source and new versus returning user.
- Update page briefs from winning evidence.
- Review the offer ladder with commerce and accounting outcomes.

**Exit condition:** at least two tests reach a decision, winning changes are documented and the next 90-day backlog reflects measured constraints.

## Owners and governance

- Marketing site and analytics implementation: Kade or assigned technical owner.
- Camp operations and cohort details: Louise.
- Copy and positioning approval: Sally for brand and clinical-scope language.
- Pricing and entitlement truth: canonical offers workbook, live Kajabi commerce and offer catalogue.
- Any Kajabi mutation follows the approval path. This audit contains proposals only.
