# Progress board — joinsnooze.com uplift

At-a-glance status. Detail and instructions in `RUNBOOK.md`. Update the Status
column as items move. Last updated 2026-06-09.

Status key: DONE (in git) · STAGED (in git, awaiting Kajabi paste) · TODO ·
DEPRIORITISED.

## Part A — evidence engine
| Item | Status | Artifact |
|---|---|---|
| Page-value ranking engine | DONE | `analysis/build_uplift_analysis.py` |
| Master backlog + maps | DONE | `analysis/page_value_ranking.csv` + 6 CSV/MD |
| Methodology + gaps | DONE | `analysis/README-ANALYSIS.md` |

## Wave 1 — money leak + hygiene + schema
| # | Item | Status | Owner |
|---|---|---|---|
| 1 | `/get-great-baby-sleep` 404 | DEPRIORITISED (no live ad) | - |
| 2 | Org + WebSite JSON-LD | STAGED | deploy: paste header |
| 3 | Blog BlogPosting script | STAGED | deploy: paste footer JS |
| 4 | SEO title/desc/social-image | TODO | Kajabi admin |
| 5 | Link hygiene (non-www) | DONE (169 links, 34 files) | - |
| 5b | Link hygiene (old-domain, CMS) | TODO | `analysis/CMS-HYGIENE-WORKLIST.csv` |
| 6 | Stale ref correction | DONE | `URL-REFERENCE.md` |

## Wave 2 — AEO + glossary + nav/IA
| # | Item | Status |
|---|---|---|
| 7 | FAQPage on /baby-sleep-glossary | TODO |
| 8 | llms.txt | TODO |
| 9 | Internal-linking (glossary + blog) | TODO |
| 10 | Nav/IA (surface glossary, age->course CTAs) | TODO |
| 11 | Decide /snooze-method | TODO |

## Wave 3 — social proof
| # | Item | Status | Artifact |
|---|---|---|---|
| 12 | Inventory testimonial sources | DONE | `wave-3-social-proof/TESTIMONIAL-INVENTORY.md` |
| 13 | Curate web-ready quote set | DONE | `wave-3-social-proof/CURATED-SOCIAL-PROOF.md` |
| 14 | Inject into target pages | STAGED | `wave-3-social-proof/injection-blocks.html` |
| 15 | Collect age/course named quotes + Google reviews | TODO | gap noted in inventory |

## Wave 4 — cleanup
| # | Item | Status |
|---|---|---|
| 16 | Alt text (~160 images) | TODO |
| 17 | CWV outliers (Cubo blog, about-sally) | TODO |
| 18 | Triage ~40 draft pages | TODO |
| 19 | Homepage source reconciliation | TODO |

## Changelog
- 2026-06-09: Part A engine built; Wave 1 schema + non-www hygiene + glossary ref
  staged/done; Wave 3 inventory + curation + injection blocks done. Project
  created and consolidated. Nothing deployed to Kajabi yet.
