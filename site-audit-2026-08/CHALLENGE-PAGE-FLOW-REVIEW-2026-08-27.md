# Sleep-challenge page flow review

**Date:** August 27, 2026  
**Pages:** Bedtime Battles, Catnapping, Early Rising, Nap Transitions, Night Wakings and Sleep Regressions  
**Method:** Rendered mobile capture, live source structure, deterministic section counts, local Qwen text review, local Gemma vision review, local Qwen agent reconciliation and AI SEO review

## Ruling

The pages are hard to understand because they repeat one long template without giving each challenge a distinct decision path.

The shared structure is sound. The ordering and repetition are not. Each page gives a direct answer in the hero, then sends the reader through a dense explanation before the clearer triage and action sections. Every page also starts its action list with logging or tracking. That makes the pages feel diagnostic when the visitor wants immediate help.

The AI SEO review confirms that the direct answers, expert observations and age distinctions have discovery value. Reorder and modularise them. Do not cut them to meet a fixed short-page target.

Keep six separate URLs. Do not merge them. Each represents distinct search and parent intent. Rebuild the shared template around a faster sequence:

```text
Direct answer
-> Is this normal?
-> What to do first
-> Why this happens
-> Relevant free resource
-> Related challenge and age help
-> Contextual paid-support route
```

## Deterministic evidence

| Page | Hero | Explanation | Triage | First steps | Extra | Resource | Related | Membership | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Bedtime Battles | 78 | 201 | 109 | 136 | 0 | 76 | 45 | 93 | 738 |
| Catnapping | 83 | 172 | 99 | 158 | 354 FAQ | 53 | 41 | 93 | 1,053 |
| Early Rising | 96 | 225 | 125 | 161 | 0 | 49 | 35 | 93 | 784 |
| Nap Transitions | 80 | 183 | 122 | 176 | 0 | 59 | 41 | 93 | 754 |
| Night Wakings | 79 | 137 | 129 | 167 | 0 | 80 | 44 | 93 | 729 |
| Sleep Regressions | 69 | 195 | 134 | 159 | 87 age guide | 47 | 52 | 93 | 836 |

Additional repeated patterns:

- All six use the same `why... and what to do first` headline construction.
- All six use `On the consult floor` in the explanation.
- All six start First steps with logging or tracking.
- All six use the same 93-word membership close.
- Five breadcrumbs say `Part of: Snooze`; Catnapping says `Part of: Find the right sleep help`.
- Bedtime Battles and Night Wakings put Related help before the free resource. The other four reverse that order.
- The mobile hero occupies roughly one viewport before the page reaches the main explanation.

## Why the current flow feels overwritten

### 1. The clearest section arrives too late

`Is this normal?` is the strongest decision aid. It tells the parent whether to watch, act or seek help. It currently follows 137 to 225 words of explanation.

Move it directly below the hero.

### 2. The first action is the same on every page

Logging is useful, but it should support the first action. It should not be the first action on every challenge page.

Lead with the challenge-specific check already present in the copy:

| Challenge | First visible action |
|---|---|
| Bedtime Battles | Check wind-down length and bedtime timing |
| Catnapping | Check total daytime sleep and the tiredness fit |
| Early Rising | Check nap timing and the full sleep budget |
| Nap Transitions | Check whether the nap is consistently outgrown |
| Night Wakings | Look at bedtime and how sleep starts |
| Sleep Regressions | Check whether the schedule still fits before assuming a regression |

Place the tracking instruction second or inside a small `What to record` component.

### 3. Explanation outweighs action

The explanation averages 186 words. First steps average 160. Early Rising spends 225 words on explanation before 161 words of action.

Give action more visual and editorial weight. Keep the explanation to 120 to 180 words when that space is needed for a complete, self-contained answer. Place it after the immediate steps.

### 4. The commercial close ignores the challenge

The same membership paragraph appears on every page. Repetition helps brand consistency, but verbatim copy loses relevance and becomes easy to skip.

Keep one shared membership component. Change its one-sentence bridge by challenge. Link to `/which-is-right-for-us` when the visitor needs to compare membership, Camp and a consultation.

### 5. Two pages contain a second article inside the first

- Catnapping adds a 354-word FAQ, making it 43% longer than Night Wakings.
- Sleep Regressions adds an 87-word age guide after the free resource and related links.

The information has value. The current placement extends the journey after the reader has already reached a next step. Retain distinct query-led answers and move them into the informational journey before commercial modules.

## Proposed shared template

| Order | Section | Target words | Job |
|---:|---|---:|---|
| 1 | Hero and direct answer | 40 to 60 | Name the problem, reassure and state the first check |
| 2 | Is this normal? | 90 to 140 | Sort normal, worth working on and seek-help cases |
| 3 | What to do first | 120 to 180 | Give three specific actions, with tracking as support |
| 4 | Why this happens | 120 to 180 | Explain the mechanism in self-contained passages |
| 5 | Expert experience note | 40 to 70 | Preserve one challenge-specific observation from Sally |
| 6 | Visible FAQ, if supported | 50 to 80 per answer | Answer distinct natural-language questions without repetition |
| 7 | Free resource | 40 to 70 | Offer the most relevant tool or lesson |
| 8 | Related help | 30 to 60 | Link one related challenge and one or two age routes |
| 9 | Paid support | 45 to 70 | Membership by default, then the comparison route |

**Planning range:** about 650 to 850 words before any proven FAQ expansion. This is not a hard cap. Coverage and passage quality matter more than total length.

## Page-specific decisions

### Bedtime Battles

- Keep: normal-versus-needs-work distinction, routine-creep insight and connection concept.
- Compress: 201-word explanation to about 110 words.
- Move: triage above explanation and free Toddler Toolkit sample before related links.
- Differentiate: use a boundary-and-timing action component, not the generic four-step list.
- Cross-links: Toddler Sleep Help, Night Wakings and Early Rising.

### Catnapping

- Keep: single-cycle explanation, age distinction, daytime-sleep check and free catnapping guide.
- Compress: remove FAQ answers that only repeat the triage or first steps. Keep distinct query-led answers even when the page remains longer than the cluster average.
- Move: keep the visible FAQ inside the informational journey before commercial support.
- Differentiate: make `normal short nap versus stuck short-nap pattern` the page's decision device.
- Cross-links: Nap Transitions, Early Rising and the relevant age help route.

### Early Rising

- Keep: nap timing, total sleep budget and the specific definition of an early wake worth working on.
- Compress: the 225-word explanation is the longest in the cluster. Target about 110 words.
- Move: triage and first action above mechanism.
- Differentiate: use a day-timeline or sleep-budget component rather than another generic prose card.
- Cross-links: Catnapping, Nap Transitions and 5 to 12 Month Sleep Help.

### Nap Transitions

- Keep: true-versus-false transition distinction, small-step change and free 3-to-2 guide.
- Compress: mechanism to about 110 words and First steps to three decisions.
- Move: the readiness test into the first actionable component.
- Differentiate: use a readiness checklist or transition pathway.
- Cross-links: Early Rising, Sleep Regressions and the relevant age help route.

### Night Wakings

- Keep: bedtime-first distinction, normal newborn wakes, hunger caution and free hunger-versus-habit module.
- Compress: this is already the shortest explanation at 137 words. Make only light edits.
- Move: free module before Related help for cluster consistency.
- Differentiate: use a simple `how sleep starts -> what baby seeks at wakes` flow.
- Cross-links: Bedtime Battles, Sleep Regressions and 5 to 12 Month Sleep Help.

### Sleep Regressions

- Keep: schedule-versus-development distinction, 4-month exception and age-specific routes.
- Compress: explanation only where sentences repeat the same distinction.
- Move: place the age guide before free resources and paid support. Keep the age answers visible rather than reducing them to link labels.
- Differentiate: use a `schedule, development or 4-month change` sorter.
- Cross-links: Night Wakings, 3 to 4 Month Sleep Help and 5 to 12 Month Sleep Help.

## Cluster journey

```text
Search, social or internal link
    -> one challenge page
        -> direct answer
        -> normal / act / seek help decision
        -> one challenge-specific first check
        -> relevant free resource
        -> related challenge or age hub
        -> Snooze Membership
            -> Which is right for us?
                -> Camp Snooze when more structure is needed
                -> Consultation when individualised help is needed
```

Do not link medical warning content to a commercial route. Keep the GP or health-professional instruction separate.

## Visual system recommendation

Keep the shared typography, colour system and section components. Change the rhythm:

- Reduce hero headline and lead height so the next section is visible in the first viewport.
- Reduce the expert byline badge height. Keep the authority signal.
- Use one distinct diagnostic component per challenge: sorter, timeline, readiness checklist or cause flow.
- Keep the same component positions across the cluster.
- Use the challenge-specific image already present. Do not add decorative icons solely to create variety.
- Keep the membership component visually consistent, with a challenge-specific bridge above it.
- Ensure the reCAPTCHA badge does not cover text or interactive controls on mobile.

## AI SEO guardrails

- Keep the current 40 to 60 word direct answers. Tighten Early Rising from 73 words.
- Replace generic explanation headings with natural questions where possible.
- Keep one short `On the consult floor` insight per page because it demonstrates first-hand experience.
- Make FAQPage markup match visible Q&A. Five pages currently publish schema-only FAQ questions.
- Standardise Catnapping's primary schema type with the other five pages.
- Show Sally's full relevant credentials and a visible update date on every page.
- Add authoritative sources and review notes to fever, feeding, hydration and other health-adjacent claims.
- Do not prioritise `llms.txt`. Google says no special AI text file is required for AI Overviews or AI Mode.

See [AI SEO review: sleep-challenge pages](./AI-SEO-REVIEW-CHALLENGE-PAGES-2026-08-27.md) for the live schema matrix and revised backlog.

## Local-model reconciliation

Local Qwen correctly found the repeated page formula, the dense explanations, the universal tracking-first pattern and the identical membership close. Gemma confirmed that the heroes are dense and the cluster looks highly repetitive.

The final recommendations reject several model suggestions:

- Keep the free catnapping guide. It matches the page intent.
- Keep the `Is this normal?` and First steps sections.
- Do not add progress indicators. These pages are separate entry pages, not a six-step course.
- Do not link medical warnings to Camp or consultations.
- Treat duplicated full-page screenshots as a capture-stitching artefact. Live HTML contains one page wrapper and one H1.

## Human review gates

- Review all fever, feeding, illness and safety language against current authoritative guidance.
- Confirm the age-specific sleep advice against the latest Sleep Schedule Bible.
- Confirm each free resource and checkout remains current before implementation.
- Approve any customer-facing copy before Kajabi deployment.
