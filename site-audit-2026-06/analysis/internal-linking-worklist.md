# Internal-linking worklist (Wave 2 #9)

Date: 2026-06-09. Source: `analysis/link_graph_summary.csv` (in/out degree, orphans, low-inbound hubs).

## The problem in one read

Authority flows out of the blog and never comes back. Almost every blog post has 25-30 outbound links and 0-2 inbound. The glossary is a hard orphan: 0 inbound, 54 self-anchors. The four age-help pages, which are the conversion on-ramps, are also starved (4-5 inbound each). Meanwhile courses, the membership and `/about-sally` are saturated (85-104 inbound) because they sit in the nav and footer.

So the fix is not "link more from the home page." It is: add contextual body links **from the high-out-degree blog posts** (which have link equity to spend) **into** the glossary, the age-help pages, and a handful of low-inbound cornerstone posts.

| Target | Current inbound | Why it needs links |
|---|---|---|
| `/baby-sleep-glossary` | 0 | Orphan. Nothing on the site points to it. Highest-priority target. |
| `/newborn-baby-sleep-help` | 4 | Age on-ramp, under-linked. |
| `/3-4-month-baby-sleep-help` | 5 | Age on-ramp; 4-month-regression posts should feed it. |
| `/5-12-month-baby-sleep-help` | 5 | Age on-ramp; nap-transition / early-rising posts should feed it. |
| `/toddler-sleep-help` | 4 | Age on-ramp, under-linked. |
| `/blog/guide-to-self-settling-sleep-cycles` | 7 | Best-linked cornerstone post; reinforce as a hub. |
| `/blog/tips-for-managing-baby-early-wake-ups` | 6 | Cornerstone; feed from related early-rising posts. |
| `/blog/4-month-regression-or-progression` | 1 | Cornerstone regression post, near-orphan. |
| `/blog/all-about-the-8-10-month-sleep-regression` | 1 | Cornerstone regression post, near-orphan. |

## Conventions for the editor

- These are **body-content links** added in the Kajabi blog editor / page editor (CMS, no repo source for blog bodies). Where a target is a repo-built page (age pages, glossary), the link still lives in the *source* page's body, so it is a CMS edit on the source.
- Use absolute `https://www.joinsnooze.com/...` URLs (Wave 1 #5 hygiene: no apex, no non-www).
- Anchor text is descriptive and matches the target topic. No "click here". Keep it natural in the sentence; do not stuff.
- One link per row. Add only where the source body genuinely discusses the concept.

## Recommended new links

| # | Source page | Target page | Suggested anchor text | Rationale |
|---|---|---|---|---|
| 1 | `/blog/baby-catnaps-tips-guide` | `/baby-sleep-glossary` | catnap | Post is about catnaps; glossary defines "Catnap". Feeds the orphan from a topically exact source (28 out-degree, 0 inbound). |
| 2 | `/blog/guide-to-self-settling-sleep-cycles` | `/baby-sleep-glossary` | self-settling and sleep cycles | Post covers both terms; glossary has "Self-Settling" and "Sleep Cycle". High-out cornerstone feeding the orphan. |
| 3 | `/blog/what-are-assisted-sleep-associations` | `/baby-sleep-glossary` | sleep association | Post is literally about sleep associations; glossary defines the term. |
| 4 | `/blog/tips-for-managing-baby-early-wake-ups` | `/baby-sleep-glossary` | early morning waking | Glossary "Early Morning Waking" matches the post topic exactly. |
| 5 | `/blog/navigating-split-nights-a-guide-for-parents` | `/baby-sleep-glossary` | split night | Glossary "Split Night" defines what the whole post discusses. |
| 6 | `/blog/4-month-regression-or-progression` | `/baby-sleep-glossary` | sleep regression | Glossary "Sleep Regression" grounds the term; feeds orphan from a regression post. |
| 7 | `/blog/the-power-of-calm-but-awake-for-babies` | `/baby-sleep-glossary` | drowsy but awake | Post is about calm-but-awake; glossary term "Drowsy But Awake" is the same concept. |
| 8 | `/blog/transitioning-your-baby-from-2-naps-to-1` | `/baby-sleep-glossary` | nap transition | Glossary "Nap Transition" matches; feeds orphan. |
| 9 | `/about-sally` | `/baby-sleep-glossary` | sleep and parenting glossary | `/about-sally` has 99 inbound (huge authority) and 18 out; one body link here passes real equity into the orphan. |
| 10 | `/blog` (index intro / sidebar) | `/baby-sleep-glossary` | baby sleep glossary | Blog index has 99 inbound and is the natural hub for a "definitions" pointer. |
| 11 | `/recommended-products` | `/baby-sleep-glossary` | sleep terms glossary | Product page (7 inbound, 18 out) can point readers to definitions; spreads inbound across more sources. |
| 12 | `/blog/stop-4-month-babies-sleep-regression-fear` | `/3-4-month-baby-sleep-help` | 3-4 month sleep help | Regression post should funnel to the matching age on-ramp (currently 5 inbound). |
| 13 | `/blog/4-month-regression-or-progression` | `/3-4-month-baby-sleep-help` | help for the 4-month regression | Same age-match; near-orphan post (1 inbound) sending equity to the age page. |
| 14 | `/blog/how-to-make-change-when-the-4-month-sleep-regressions-hits` | `/3-4-month-baby-sleep-help` | 3-4 month sleep help | Topical match; post has 30 out-degree to spend. |
| 15 | `/blog/all-about-the-8-10-month-sleep-regression` | `/5-12-month-baby-sleep-help` | 5-12 month sleep help | 8-10 month regression sits in the 5-12 band; feeds that age on-ramp. |
| 16 | `/blog/tips-for-managing-baby-early-wake-ups` | `/5-12-month-baby-sleep-help` | early rising help for older babies | Early rising is a 5-12 month problem; route to the age page. |
| 17 | `/blog/mystery-of-missing-third-nap-early-rising` | `/5-12-month-baby-sleep-help` | 5-12 month sleep help | Third-nap-drop and early rising are 5-12 month topics. |
| 18 | `/blog/transitioning-your-baby-from-2-naps-to-1` | `/5-12-month-baby-sleep-help` | 5-12 month nap transitions | Nap transition lands in the 5-12 band. |
| 19 | `/blog/newborn-sleep-and-the-fourth-trimester` | `/newborn-baby-sleep-help` | newborn sleep help | Fourth-trimester post should funnel to the newborn age on-ramp (4 inbound). |
| 20 | `/blog/newborn-babys-and-naps` | `/newborn-baby-sleep-help` | newborn sleep help | Newborn-naps post matches the newborn age page; near-orphan (0 inbound) passing equity. |
| 21 | `/blog/developing-positive-cot-association-with-your-baby` | `/newborn-baby-sleep-help` | newborn sleep foundations | Cot association is a foundations topic; feeds newborn page. |
| 22 | `/newborn-baby-sleep-help` | `/3-4-month-baby-sleep-help` | what changes at 3-4 months | Age-progression link: next stage. Builds an age-page chain so equity flows between on-ramps. |
| 23 | `/3-4-month-baby-sleep-help` | `/5-12-month-baby-sleep-help` | 5-12 month sleep help | Next stage in the age chain. |
| 24 | `/5-12-month-baby-sleep-help` | `/toddler-sleep-help` | toddler sleep help | Next stage; `/toddler-sleep-help` has only 4 inbound. |
| 25 | `/blog/guide-to-self-settling-sleep-cycles` | `/blog/tips-for-managing-baby-early-wake-ups` | managing early morning wake-ups | Related cornerstone cross-link; reinforces the two best-linked posts as a hub pair. |
| 26 | `/blog/tips-for-managing-baby-early-wake-ups` | `/blog/mystery-of-missing-third-nap-early-rising` | the missing third nap and early rising | Same theme (early rising); routes equity to a near-orphan post (2 inbound). |
| 27 | `/blog/navigating-split-nights-a-guide-for-parents` | `/blog/tips-for-managing-baby-early-wake-ups` | early morning wake-ups | Split nights and early rising are adjacent night-sleep topics. |
| 28 | `/blog/4-month-regression-or-progression` | `/blog/all-about-the-8-10-month-sleep-regression` | the 8-10 month sleep regression | Cross-link the two regression cornerstones (both near-orphans at 1 inbound). |
| 29 | `/blog/stop-4-month-babies-sleep-regression-fear` | `/blog/4-month-regression-or-progression` | what the 4-month regression really is | Routes equity into the near-orphan canonical regression post (1 inbound). |
| 30 | `/blog/the-power-of-calm-but-awake-for-babies` | `/blog/guide-to-self-settling-sleep-cycles` | guide to self-settling | Calm-but-awake is the first step to self-settling; feeds the cornerstone. |
| 31 | `/blog/what-are-assisted-sleep-associations` | `/blog/guide-to-self-settling-sleep-cycles` | self-settling and sleep cycles | Associations vs self-settling; topical cross-link into the cornerstone. |
| 32 | `/about-sally` | `/newborn-baby-sleep-help` | newborn sleep help | High-authority page (99 inbound) sending equity to an under-linked age on-ramp. |
| 33 | `/about-sally` | `/3-4-month-baby-sleep-help` | 3-4 month sleep help | Same: spread `/about-sally` authority across age pages, not just courses. |
| 34 | `/recommended-products` | `/newborn-baby-sleep-help` | newborn sleep help | Product page often read by newborn parents; route to the age page. |
| 35 | `/blog/cubo-ai-smart-baby-monitor-review-with-discount` | `/baby-sleep-glossary` | white noise and sleep environment terms | Review post (27 out, 1 inbound) can point to the glossary "White Noise" term. |

## Priority order to action

1. Rows 1-11: links **into the glossary** (kills the 0-inbound orphan). Do these first; one paste per source post.
2. Rows 12-24: links **into the age-help on-ramps**, including the age-page chain (22-24).
3. Rows 25-31: blog-to-blog cross-links that rescue the near-orphan cornerstone posts.
4. Rows 32-35: spend `/about-sally` and `/recommended-products` authority on age pages and the glossary.

## Verify after deploy (do not deploy here)

Re-run the link parser (`analysis/build_uplift_analysis.py`) and confirm `/baby-sleep-glossary` inbound > 0 and the four age pages each climb. Spot-check that no apex / non-www links were introduced (Wave 1 #5).
