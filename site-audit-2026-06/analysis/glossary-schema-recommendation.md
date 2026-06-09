# Glossary schema: FAQPage vs DefinedTermSet (Wave 2 #7)

Date: 2026-06-09. Page: `https://www.joinsnooze.com/baby-sleep-glossary`.

## State

- Live `/baby-sleep-glossary` already serves `DefinedTermSet` + `BreadcrumbList` JSON-LD (verified by orchestrator).
- The RUNBOOK Wave 2 #7 line says "Repo build already carries FAQPage." It does not. `glossary/build-glossary.mjs` emits `DefinedTermSet` + `BreadcrumbList` only. Every term in `glossary/terms.json` carries `"faq": true` (all 40), but that flag is unused by the build. So the FAQPage in the runbook is aspirational, not built.

## The comparison

A glossary is a set of term definitions. That is exactly what `DefinedTermSet` / `DefinedTerm` models, so the current schema is the correct primary type for this page. FAQPage models a list of question-and-answer pairs. The two describe the page from different angles and they are not mutually exclusive.

| | DefinedTermSet (live) | FAQPage (proposed complement) |
|---|---|---|
| Semantic fit for a glossary | Correct. A glossary *is* a defined-term set. | Looser. Definitions are not literally Q&A, though many read as answers. |
| What it feeds | Entity / knowledge-graph understanding; "what is X" term grounding for LLMs and search. | AI answer engines and (historically) FAQ rich results. |
| Google rich result | No visible SERP enhancement. | FAQ rich results are now limited to government and health-authority sites; a normal business site gets no SERP stars from FAQPage. The value is AEO (LLM answer grounding), not rich snippets. |
| Risk of misuse | None. | Google's FAQ guidelines want genuine Q&A. Forcing all 40 terms into questions would be a stretch and reads as schema spam. |

## Recommendation: ADD FAQPage as a complement, scoped to genuine Q&A terms

Keep `DefinedTermSet` + `BreadcrumbList` as-is. They are the right primary schema and should not be removed. Add a third node, a `FAQPage`, built only from the terms that read as a real parent question with a real answer. This is the higher-leverage AEO move than swapping types: it gives answer engines clean question-keyed entries for the highest-intent searches (4-month regression, catnaps, early waking, self-settling) on top of the entity grounding the DefinedTermSet already provides.

Do not convert all 40 terms. Many are descriptive ("Active Sleep", "Melatonin") and don't map to a natural question. Forcing them produces low-quality Q&A.

### Selected terms (15)

Picked because each is a question a parent actually searches, and the definition answers it directly:

wake-windows, catnap, false-start, split-night, early-morning-waking, overtired, self-settling, drowsy-but-awake, sleep-regression, sleep-association, witching-hour, dream-feed, contact-nap, cry-it-out, controlled-comforting.

Answers are built verbatim from each term's `shortDef` + `context` in `terms.json` (no fabrication, no paraphrase). Questions are phrased as the parent-facing search query, e.g. "Why does my baby only nap for 30-45 minutes?" for `catnap`.

### Deploy-ready block

`analysis/glossary-faqpage-jsonld.html` (generated this session). It is a standalone `<script type="application/ld+json">` `FAQPage` with 15 `Question` / `acceptedAnswer` pairs, `@id` `…/baby-sleep-glossary#faq`. `<` is escaped to `<` per the build-glossary convention. It is additive: paste it alongside the existing DefinedTermSet script in the glossary page's custom-code block. Do not replace anything.

### To make this reproducible (optional, not required to ship)

The block was generated ad hoc from `terms.json`. To fold it into the build so it regenerates with the glossary, `build-glossary.mjs` would need a third graph node that maps the `faq`-flagged terms (or a narrower curated subset) into `Question`/`Answer`. Flagging only the genuine-Q&A subset in `terms.json` (currently all 40 are `faq:true`, which is wrong) would let the build pick the right ones. Out of scope for this prep task; logged here so it is not lost.

## Verify after deploy (do not deploy here)

Load the live page in validator.schema.org and confirm three valid nodes: `DefinedTermSet`, `BreadcrumbList`, `FAQPage`. Rich Results Test will not show an FAQ enhancement (expected; non-eligible site type). The win is AEO, confirmed by the schema validating clean.
