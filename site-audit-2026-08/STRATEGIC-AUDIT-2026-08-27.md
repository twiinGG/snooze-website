# joinsnooze.com strategic audit

**Date:** August 27, 2026  
**Scope:** Public acquisition, offer selection, checkout measurement and authenticated Camp Snooze onboarding  
**Decision posture:** Evidence-led. Observations and hypotheses are labelled separately.

## Executive ruling

The site has moved from a collection of offer pages toward a coherent help architecture. The new age hubs, problem hubs, decision page, method page, reviews and FAQs give Snooze the right building blocks. The next commercial gain will come from joining those blocks into one decision system, not from creating more pages.

The immediate priorities are:

1. Fix measurement integrity before using conversion reports for budget or page decisions.
2. Make membership the default ongoing-support route while keeping Camp Snooze as the higher-support path.
3. Reduce interaction friction on mobile, where at least 70.04% of Clarity sessions occur in clearly mobile browsers.
4. Repair legacy URLs and finish the remaining structured-data work.
5. Bring the Camp intake handoff and delayed-access steps into one measurable onboarding sequence.

## Evidence base

- Live sitemap: 89 URLs on August 27, 2026.
- Dated URL inventory: 554 canonicalised URLs across the sitemap, June crawl and active repository references.
- Clarity: 4,944 human sessions and 2,663 unique users across the rolling last 30 days.
- Search Console: 409 clicks and 13,308 impressions from July 29 to August 25, 2026.
- GA4: 243 organic sessions excluding AI referrals, 1 AI referral session and 13 purchase plus lead key events from August 20 to August 26, 2026.
- Kajabi: authenticated admin and member preview passed. The commerce API is available.
- Supabase: current GA4, Clarity, Meta, SEO and member-feedback tables are available.
- June baseline: 107 rendered URLs, page provenance, SEO coverage and 90-day conversion-path analysis.

## Strategy and offer architecture

### Observed

- The paid-scaling strategy identifies Snooze Membership as the primary offer and Camp Snooze as the secondary higher-ticket offer.
- The live sitemap now contains `/which-is-right-for-us`, `/snooze-membership`, `/camp-snooze-sleep-coaching`, six problem hubs and four age hubs.
- Camp Snooze received 361 Clarity sessions in 30 days. The membership page received 156.
- The June GA4 baseline found the 5 to 12 month course was the strongest checkout feeder and Camp was the second material commercial path.
- The public offer registry still contains placeholders and older notes in some entries. The live API returned 113 offers across all states during the currency-tracking check, while the lightweight published-offer smoke used a smaller set.

### Evaluation

The architecture should express one progression:

```text
Problem or age intent
    -> relevant free help
    -> Snooze Membership for ongoing support
    -> Camp Snooze for more structure and hands-on help
    -> consultation for individualised high-intent support
```

Courses and guides remain valid standalone purchases. They should not compete equally with every other offer in primary navigation. The decision page and store can handle comparison.

### Hypothesis to test

Visitors landing on age or problem pages will reach a meaningful next step more often when those pages present one recommended route plus two clearly differentiated alternatives.

## Acquisition and navigation

### Observed

- Homepage, Camp, 5 to 12 month help, membership, toddler help and consultations all appear in Clarity's leading page list.
- Login and library are the second and third most viewed pages, with 478 and 464 sessions.
- The sitemap added 26 URLs not present in the June crawl inventory. Fifteen non-tag additions returned HTTP 200 in the August check.
- Clarity reports 2.14 pages per session and 63.48% average scroll depth.

### Evaluation

The site serves two different audiences at once: prospective buyers and existing members. Member utility traffic is large enough to distort top-page reports and navigation decisions. Acquisition navigation should expose one obvious login utility without letting member routes dominate the commercial hierarchy.

The new problem hubs are valuable, but they need consistent parent-child links. Visitors should be able to move between an age view and a problem view without returning to the homepage.

A focused follow-up across all six problem hubs confirmed that they reuse the same long reasoning path. Each page uses the same headline formula, `On the consult floor` framing, tracking-first action pattern and 93-word membership close. Body copy ranges from 729 to 1,053 words. See `CHALLENGE-PAGE-FLOW-REVIEW-2026-08-27.md` for the proposed shorter flow and page-specific decisions.

### Hypothesis to test

A persistent `Start here` decision route and a separate `Log in` utility action will reduce quick backs on acquisition pages without harming member access.

## Camp Snooze conversion journey

### Observed

- Camp is the fourth most viewed Clarity page at 361 sessions in 30 days.
- The current strategy positions Camp as a retargeting and ascension offer rather than the cold front door.
- Clarity recorded 365 checkout sessions, 118 order-success sessions and 57 Purchase smart-event sessions sitewide.
- Clarity has no configured funnels.
- The Purchases card reports 2.39% of sessions with a purchase. This differs from the 57-session Purchase smart event, which represents 1.15% of total sessions.

### Evaluation

Camp has enough traffic to justify its own measurable funnel. The site currently lacks a Clarity funnel that can separate landing-page persuasion, checkout entry, purchase and onboarding activation. The event-definition conflict means no single Clarity purchase rate should guide commercial decisions yet.

Camp messaging should keep its real intake dates and seat limits. The page should also explain the delayed-access model before checkout, since the member journey opens full access on the Friday before camp.

### Hypotheses to test

- Showing the exact next intake and access date beside the primary CTA will increase qualified checkout starts.
- Explaining the post-purchase sequence before checkout will reduce support contacts and quick backs after purchase.

## Checkout and measurement integrity

### Observed

- Clarity reports self-referrals from `www.joinsnooze.com` in 2,980 sessions, plus 424 from `app.kajabi.com` and 318 from `joinsnooze.mykajabi.com`.
- Clarity reports JavaScript errors in 6.61% of sessions and 413 errors overall.
- The leading error is a null lookup for `#form_submission_email`, representing 49.15% of errors. A second null-value error represents 22.28%.
- The live Kajabi currency check found five AUD offer IDs missing from `AUD_OFFER_IDS` and one stale ID. Missing offers include two active Camp offers. Those purchases can be reported as USD when the checkout payload omits currency.

### Evaluation

Attribution, event definitions and currency handling need repair before page-level return on ad spend or revenue-per-session comparisons are trusted. This is a P0 measurement issue because it affects both acquisition source and commercial value.

The JavaScript error concentration suggests one shared form script is running where the expected email input does not exist. Confirm the affected templates, then guard the selector before reading its value.

## Behaviour and mobile experience

### Observed

- Mobile Safari, Instagram app and Chrome Mobile represent 70.04% of Clarity sessions.
- Dead clicks affect 11.67% of sessions. Quick backs affect 17.82%.
- Rage clicks are low at 0.06% and excessive scrolling is 0%.
- Average active time is 1.3 minutes out of 2.9 minutes total.

### Evaluation

The strongest behavioural concern is not frantic clicking. It is ineffective interaction and route mismatch. Dead clicks can come from decorative cards, non-linked affordances, delayed navigation or overlays. Quick backs can come from promise mismatch, member login loops or visitors choosing the wrong route.

Start with the five high-volume mobile pages: homepage, Camp, 5 to 12 month help, membership and consultations. Inspect dead-click heatmaps and short recordings by page, browser and entry source. Do not generalise from sitewide rates alone.

## Performance

### Observed

- Clarity performance score: 86/100 from 245 pageviews.
- Largest Contentful Paint: 2.6 seconds, needs improvement.
- Interaction to Next Paint: 180 milliseconds, good.
- Cumulative Layout Shift: 0.031, good.
- The performance sample covers a small share of total pageviews.

### Evaluation

LCP is the actionable weakness. Optimise the hero asset and font-loading path on the high-volume mobile pages first. Treat the aggregate as a direction, then validate by URL with GA4 web-performance evidence and a controlled mobile test.

## SEO and AI discovery

### Observed

- Search Console returned 409 clicks from 13,308 impressions with average position 13.49 for July 29 to August 25.
- The June audit found no Article schema on 36 blog posts, missing global Organization and WebSite schema, an incomplete glossary and no `llms.txt`.
- August spot checks show Organization and WebSite schema are now live globally.
- The canonical glossary now includes FAQPage, DefinedTermSet and BreadcrumbList schema.
- A sampled blog article still has no Article or BlogPosting schema.
- `https://www.joinsnooze.com/llms.txt` still returns 404.
- `/privacy`, `/sleep-glossary`, `/snooze-method`, `/snooze` and `/snooze-village` still return 404.

### Evaluation

The site closed two major June gaps. The remaining high-value template fix is Article schema for the blog. The legacy redirects matter because repository references still point to several dead variants. Google states that no special AI text file is required for AI Overviews or AI Mode, so `llms.txt` should not remain in the prioritised rollout.

Tag archives need consolidation. The sitemap contains overlapping age labels, including `5-12 months` and `5 month to 2 years`. Choose a controlled taxonomy and noindex thin or redundant archives.

## Post-purchase onboarding

### Observed

- The Welcome To Camp course has six lessons across three modules and one primary `Start Course` action.
- The sequence explains confirmation email, intake, camp dates and Friday access.
- The intake form is a Google Form and does not gate access.
- Members can reply to the confirmation email when they need help before access opens.
- The member header exposes Camp Snooze and Access Snooze.
- The footer is Kajabi-branded and uses Kajabi social links.

### Evaluation

The instructional sequence is clear. Its main weakness is continuity: the journey moves from Kajabi to email, then Google Forms, then back to Kajabi. That makes completion and return behaviour harder to measure.

The immediate fix is measurement and reassurance, not a platform rebuild. Add a tracked intake link, a confirmation state and an explicit `Return to Camp home` action. Record the cohort, access date and intake completion as onboarding properties where the current systems support them.

### Hypothesis to test

A visible onboarding checklist with an intake-complete confirmation will increase pre-camp activation and reduce status questions.

## Prioritised findings

| Priority | Finding | Commercial reason |
|---|---|---|
| P0 | Repair attribution, purchase definitions and AUD currency mapping | Current revenue and source comparisons can mislead decisions |
| P0 | Guard the shared email-form selector | JavaScript errors affect 6.61% of sessions |
| P0 | Configure core acquisition and Camp funnels | Current dashboard has no funnels |
| P0 | Add redirects for high-reference dead variants | Prevent avoidable 404 loss and split signals |
| P1 | Standardise decision routes on high-volume pages | Quick backs affect 17.82% and dead clicks 11.67% |
| P1 | Optimise mobile hero LCP | Mobile dominates and aggregate LCP needs improvement |
| P1 | Add Article schema to the blog template | 36-post template gap remains from June |
| P1 | Track Camp intake and activation | Current handoff crosses Kajabi, email and Google Forms |
| P2 | Consolidate blog tag taxonomy | Reduce thin and overlapping archive pages |
| P2 | Establish a monthly AI citation benchmark | AI referral traffic alone does not show whether Snooze is being cited |

## Constraints

- Clarity's export API hit its daily quota. This run used the authenticated aggregate dashboard.
- The 30-day Clarity window is rolling and does not map to exact midnight boundaries.
- Performance evidence covers 245 pageviews, so page-specific testing must confirm the aggregate result.
- The audit did not mutate Kajabi pages, offers, analytics settings, databases, ads or checkouts.
