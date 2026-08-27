# AI SEO review: sleep-challenge pages

**Date:** August 27, 2026  
**Scope:** Bedtime Battles, Catnapping, Early Rising, Nap Transitions, Night Wakings and Sleep Regressions  
**Method:** Live HTML inspection, crawler and canonical checks, structured-data extraction, visible-content review and reconciliation against the AI SEO recommendations

## Ruling

Keep the six URLs and keep the proposed faster journey. The pages represent distinct parent questions and distinct search intent.

Do not apply the earlier 500 to 630 word cap. The current problem is sequencing and repetition, not page length by itself. A fixed short target would remove useful answer passages, age distinctions and first-hand expert context that make the pages more citable.

Use this rule instead: every section must answer one real question in a self-contained passage. Keep the main journey near 650 to 850 words as a planning range, then add visible FAQs only where query evidence supports them. A longer page is acceptable when every block answers a distinct need.

## Live technical and extractability check

| Page | HTTP and canonical | Direct answer | Article schema | FAQ schema | Visible date | Main AI SEO issue |
|---|---|---:|---|---|---|---|
| [Bedtime Battles](https://www.joinsnooze.com/bedtime-battles) | Pass | 56 words | Pass | 4 questions | Missing | Generic headings and FAQ markup is not shown as visible Q&A |
| [Catnapping](https://www.joinsnooze.com/catnapping) | Pass | 60 words | Missing | 6 questions | Missing | Schema type is inconsistent and the byline ends with an empty separator |
| [Early Rising](https://www.joinsnooze.com/early-rising) | Pass | 73 words | Pass | 4 questions | July 2026 | Direct answer is longer than the most extractable range |
| [Nap Transitions](https://www.joinsnooze.com/nap-transitions) | Pass | 58 words | Pass | 4 questions | July 2026 | Useful readiness distinction is buried below generic headings |
| [Night Wakings](https://www.joinsnooze.com/night-wakings) | Pass | 57 words | Pass | 4 questions | July 2026 | High-stakes feeding and illness claims need visible sources and review context |
| [Sleep Regressions](https://www.joinsnooze.com/sleep-regressions) | Pass | 48 words | Pass | 4 questions | July 2026 | Valuable age-specific answers sit late in the commercial journey |

All six pages return HTTP 200 and use a self-referencing canonical URL. The live `robots.txt` has no `Disallow` rules, so it does not block GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Googlebot or Bingbot.

Five direct answers already sit inside the useful 40 to 60 word extraction range. Early Rising is 73 words and should be split into a 40 to 60 word answer followed by one short clarification.

## What already works for AI discovery

- Each page names the problem in the H1 and answers it immediately.
- The direct answers are plain language and mostly self-contained.
- All pages show Sally Woods as the expert. Person and credential data also exists in structured data.
- The content includes first-hand patterns from consultations. This is a useful experience signal when it stays specific to the challenge.
- The pages link across related sleep problems and age routes.
- All pages have recent structured-data dates. Four also show an update date to the reader.
- The current content is server-rendered and available without authentication.

## What weakens citation-worthiness

### 1. The visible headings do not match the questions in the schema

Five pages publish FAQPage markup but do not show a visible FAQ section. Their schema contains useful questions such as `Why does my baby wake overnight?` while the page uses generic headings such as `What's going on`.

Google requires structured data to represent visible page content. Either render the marked-up questions and answers on the page or remove FAQPage markup from pages without visible Q&A. Do not keep a hidden schema-only FAQ.

Catnapping already shows its six questions. The FAQPage pattern should be corrected there first, then used only where the visible page follows the same pattern.

### 2. Schema is inconsistent across one shared cluster

Five pages use Article schema. Catnapping uses WebPage but not Article. Standardise the primary page type, author reference, headline, image, datePublished and dateModified across the cluster. Keep FAQPage as a secondary type only when the Q&A is visible.

Schema helps systems understand a page, but it is not a substitute for visible content. Google states that AI Overviews and AI Mode need no special AI schema. The priority is accurate markup that matches the page.

### 3. The strongest authority signal is understated

The visible chip says `The Sleep Concierge`. It does not show Sally's full relevant credentials. Bedtime Battles and Catnapping also show no visible update date and leave an empty separator after the byline.

Use one consistent visible line:

`Written and reviewed by Sally Woods, internationally certified sleep consultant and former paediatric nurse. Last updated: [date].`

Link Sally's name to her author page. Keep the same Person entity reference in structured data.

### 4. Health-adjacent claims have no visible sources

The pages make claims about fever, feeding, hydration, sleep cycles and age-related sleep changes without named sources. This weakens trust for both readers and answer systems.

Add a short `Sources and review` block for claims that cross into health or safety. Use original or authoritative sources such as Australian government health guidance, Red Nose Australia and recognised professional bodies. Link each source to the relevant claim. Keep Snooze's practical method clearly separate from medical guidance.

### 5. Repetition reduces information gain

The shared format repeats logging first, the same membership close and the same `On the consult floor` phrase. AI systems need a reason to select one page over another.

Keep one concise expert-experience note on each page, but make the insight unique. Keep tracking as supporting evidence. Lead with a challenge-specific decision or action. Replace the repeated membership bridge with a sentence that explains why that support route fits this problem.

## Revised shared page flow

| Order | Block | Planning range | AI SEO job |
|---:|---|---:|---|
| 1 | H1 and direct answer | 40 to 60 words for the answer | Give a complete answer that can stand alone |
| 2 | Question-led triage | 90 to 140 words | Answer `Is this normal?` and separate watch, act and seek-help cases |
| 3 | What to do first | 120 to 180 words | Give three numbered actions with the topic-specific check first |
| 4 | Why it happens | 120 to 180 words | Explain the mechanism in one or two self-contained passages |
| 5 | Expert experience note | 40 to 70 words | Add Sally's challenge-specific observation without repeating the template |
| 6 | Visible FAQ, if supported | 50 to 80 words per answer | Cover distinct long-tail questions without repeating earlier blocks |
| 7 | Relevant free resource | 40 to 70 words | Continue the exact informational task |
| 8 | Related challenge and age help | 30 to 60 words | Strengthen the topic cluster with descriptive anchors |
| 9 | Contextual paid support | 45 to 70 words | Offer the next level without weakening the informational answer |

The section order should remain consistent across all six pages. The content inside each diagnostic block should differ.

## Page-specific amendments

### Bedtime Battles

- Keep the 56-word direct answer.
- Rename `What's going on` to `Why does my child resist bedtime?`.
- Keep the routine-creep observation as a concise first-hand expert note.
- Show the current schema questions as visible Q&A or remove FAQPage markup.
- Add a visible update date and Sally's full relevant credentials.

### Catnapping

- Keep the 60-word definition.
- Retain visible FAQs that add a new answer, especially the age distinction and wake-window question.
- Remove overlap between the definition, triage and FAQ answers. Do not remove the FAQ solely to hit a word count.
- Standardise the page to Article schema if Article is the chosen cluster type.
- Add a visible update date and fix the empty byline separator.

### Early Rising

- Tighten the first answer from 73 words to 40 to 60 words. Move the 6 to 7 am nuance into `Is a 6 am wake normal?`.
- Rename the explanation to `Why does my baby wake so early?`.
- Keep the sleep-budget concept. A compact day timeline would make the comparison more extractable.
- Cite and clinically review the fever guidance.

### Nap Transitions

- Keep the 58-word direct answer.
- Move the true-versus-false transition distinction into a visible question-led sorter.
- Use `When should my baby drop a nap?` and `How can I tell a transition from a rough patch?` as headings.
- Keep the first-hand note about bedtime battles, but shorten it.

### Night Wakings

- Keep the 57-word direct answer, subject to clinical review of the independence framing across ages.
- Use `Why does my baby wake overnight?` and `What should I check first?` as headings.
- Keep newborn feeding as a clear exception.
- Add sources and review notes for feeding, fever and illness claims.
- Move the hunger-versus-habit resource before Related help.

### Sleep Regressions

- Keep the 48-word direct answer.
- Preserve the schedule-versus-development distinction and the 4-month exception.
- Move age answers into the informational body before free resources and paid support.
- Use visible question headings such as `Is the 4 month sleep regression permanent?` and `What happens around 18 months and 2 years?`.
- Do not reduce the age guide to link labels. It provides unique information that another page can cite.

## Recommendation changes

| Earlier recommendation | AI SEO ruling |
|---|---|
| Cut standard pages to 500 to 630 words | Replace with a 650 to 850 word planning range and no hard cap |
| Limit FAQ pages to 750 words | Keep only distinct query-led answers; total length is secondary |
| Compress explanations to 90 to 120 words | Allow 120 to 180 words when the mechanism remains self-contained and useful |
| Fold regression age guidance into Related help | Keep the age guidance visible before conversion modules |
| Treat repeated consult-floor content mainly as bloat | Keep one short, specific first-hand expert insight per page |
| Publish `llms.txt` as a rollout task | Remove it from the prioritised backlog; Google says it is not needed for AI features |

## Priority backlog

| Priority | Action | Reason |
|---|---|---|
| P0 | Make FAQ schema match visible Q&A on every challenge page | Current markup and visible content are inconsistent on five pages |
| P1 | Standardise Catnapping's primary schema type with the cluster | One page breaks the shared entity model |
| P1 | Reorder all six pages around triage and action | Improves human comprehension while preserving extractable passages |
| P1 | Show a linked expert byline, full credentials and update date | Strengthens visible trust and entity consistency |
| P1 | Add sources and review notes to health-adjacent claims | Raises factual trust for readers and AI systems |
| P1 | Change generic H2s to natural-language questions | Aligns visible structure with user queries and existing schema |
| P2 | Build a 10 to 20 query citation benchmark across Google AI features, ChatGPT and Perplexity | Current AI visibility is not established by referral traffic alone |
| P2 | Monitor the six-URL cluster in Search Console, GA4 and AI referral reporting | Measures discovery, engagement and downstream value together |

## Measurement

Create one monthly query set across definitions, normality checks, causes and first actions. Record whether Snooze is cited, which page is cited and which competitors appear. Pair that with:

- Search Console impressions, clicks and average position for the six URLs
- AI referral sessions and assisted conversions in GA4
- internal route clicks, free-resource starts and paid-support clicks
- Clarity quick backs and scroll depth after the flow change

The current GA4 evidence shows one AI referral session in the sampled week. That is a traffic observation, not a reliable citation benchmark.

## Authoritative guidance used

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
