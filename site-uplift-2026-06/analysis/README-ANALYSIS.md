# Part A — Uplift analysis (joinsnooze.com, June 2026)

Produced by `build_uplift_analysis.py` (in this folder) on 2026-06-09. Re-run that
script to regenerate everything here. It joins the live-site audit (107 pages,
real-browser render) against live GA4 data and computes the PageValue x
OpportunityGap = Priority ranking the plan calls for.

## What was joined

| Source | Used for | Vintage |
|---|---|---|
| Audit per-page JSON + captured HTML (`../../site-audit-2026-06/data/`) | schema gaps, word count, links, vitals, on-page proof | 2026-06-09 (current) |
| GA4 property 401774815, live MCP | traffic, engagement, conversions, organic | pulled 2026-06-09 (current) |
| Microsoft Clarity (`public.clarity_analytics`) | behaviour drop-off | UNUSABLE for per-page (see gaps) |

GA4 figures are embedded in the script (the `GA4_*` dicts) so the analysis is
reproducible without re-hitting the API. Replace those dicts to refresh.

## The score

```
PageValue (0-100) = 0.35*Traffic + 0.20*Intent + 0.30*ConversionProximity + 0.15*EngagementQuality
OpportunityGap    = weighted count of audit issues, normalised 0-100
Priority          = PageValue * OpportunityGap / 100
```

- **Traffic**: log-blend of 90-day sessions (0.6) and 12-month sessions (0.4).
- **Intent**: page role weight (checkout/course/consultation > age-help/product >
  lead-magnet/home > glossary/blog > legal/system).
- **ConversionProximity**: downstream GA4 key events attributed to the page.
  Confident offer-to-page mappings only (`z63s9VaR`->5-12 course,
  `46Bz9tk6`->Camp, `/contact` generate_lead->consultations); see
  `conversion_paths.md`.
- **EngagementQuality**: GA4 engaged-session rate x log(dwell per session). This is
  the FALLBACK for Clarity, which is unusable (below).

Weights are the plan's starting values and live at the top of the script for tuning.

## Outputs

| File | What |
|---|---|
| `page_value_ranking.csv` | **Master uplift backlog.** Every audit page, sorted by Priority, with its issue list. Filter `actionable=yes` for public, 200-status, non-login-gated pages. |
| `conversion_paths.md` | GA4 key-event funnel and the money-feeder pages. |
| `organic_pages.csv` | GA4 organic-search landing pages joined to the audit. |
| `link_graph_edges.csv` | Every internal link edge (canonicalised). |
| `link_graph_summary.csv` | In/out-degree per page, self-anchor count, orphan flags. |
| `link_hygiene_issues.csv` | Every link to the old domain / non-www / stale slug. |
| `social_proof_coverage.csv` | Traffic x has-own-proof-block, injection priority. |

## Headline findings

### 1. Top actionable uplift targets (Priority)
The schema gap (`no_jsonld` on nearly every public page) lands the highest-traffic
money pages at the top, exactly as intended:

1. `/5-12-month-baby-sleep-course` — the dominant money page (602 sessions/90d, 337
   begin_checkout, 45 purchases downstream) with no JSON-LD.
2. `/one-on-one-sleep-consultations` — 370/90d, 2,271/yr, feeds 156 leads, no schema.
3. `/camp-snooze-sleep-coaching` — 844/90d, the breakout, no schema.
4. `/3-4-month-baby-sleep-course`, `/toddler-toolkit`, `/about-sally`, `/contact`,
   `/blog`, and the organic-winning blog posts follow.

The global `Organization`/`WebSite` JSON-LD (Wave 1 #2) and the blog `BlogPosting`
script (Wave 1 #3) clear `no_jsonld` across most of this list in two changes.

### 2. Conversion reality (confirms the plan)
One offer dominates: `z63s9VaR` (5-12 month course) at 337 begin_checkout / 45
purchase over 90 days. Camp Snooze `46Bz9tk6` is second (90 / 7). Consultation
leads come through `/contact` (156 generate_lead). Everything else is long tail.
Social-proof and CTA work should target the 5-12 course page, Camp, and
consultations first.

### 3. Organic search is real and blog-led
12-month organic landing pages are led by `/` (2,851), then the blog: Cubo Ai
review (381), 8-10 month regression (169), Babyzen stroller (155), missing-third-nap
(99), Harvey Karp (98), split nights (80). The age-help pages also pull organic
(`/5-12-month-baby-sleep-help` 121). These earn traffic and are the AEO/schema and
social-proof targets, yet most are footer-only for proof and carry no Article schema.

### 4. Internal-link structure — bigger than the glossary
- **Glossary is a true orphan.** `/baby-sleep-glossary` has **0** inbound links from
  any other page; its 54 internal links are all self-anchors (its own A-Z index).
  The stale `/sleep-glossary` slug also has 0 inbound. Wave 2 #9 is valid.
- **The blog corpus is the real problem.** Almost every blog post has 0-2 inbound
  links while linking OUT to 25-30. Authority flows out of posts and nothing flows
  back in except the `/blog` hub. The internal-linking workstream should link INTO
  high-value posts and the glossary from related content, not just out of them.
- The ~99-104 inbound counts on `/`, `/blog`, `/contact`, `/about-sally`, `/camp`,
  `/login` are global header/footer links, not editorial authority.

### 5. Link hygiene bug confirmed and quantified
**261 internal links need rewriting**: 205 point to the old domain
`sleepconcierge.com.au`, 55 to non-www `joinsnooze.com`, 1 to the stale
`/sleep-glossary` slug. Full list in `link_hygiene_issues.csv` (Wave 1 #5).

### 6. Social proof is concentrated, not distributed
Only 8 pages carry their OWN on-page proof block (the money pages: 5-12 course,
Camp, consultations, 3-4 course, etc. — which is why they convert). 78 pages are
footer-only (the global review strip), 20 have no proof at all. Highest-value
injection targets that lack their own block: `/contact`, `/blog`, `/about-sally`,
`/author/sally-woods`, the organic blog posts, and the high-traffic age-help pages
(`/5-12-month-baby-sleep-help` 1,650/yr, `/3-4-month-baby-sleep-help` 1,058/yr,
`/newborn-baby-sleep-help` 672/yr). See `social_proof_coverage.csv`.

## Data gaps (plan A5) and how they affect this analysis

- **Microsoft Clarity per-page behaviour is UNUSABLE from Supabase.** The
  `clarity_analytics` table holds only 9 URL-dimension rows, all with null URL and
  zero engagement; the sync captured Browser/Source/Device breakdowns, not per-page.
  The behaviour-drop-off deliverable (A4 #5) cannot be grounded from history. The
  EngagementQuality term therefore uses GA4 engaged-rate and dwell as a proxy. To do
  real drop-off / rage-click analysis, pull the live Clarity Data Export API (token
  in root `.env`, 3-day window) per page. NOT done here.
- **Google Search Console not connected.** No query-level organic truth. Organic
  prioritisation here leans on GA4 organic landing pages; treat keyword-level reads
  as directional until GSC is connected.
- **GA4 90-day sample is the top ~55 pages.** Pages showing `sessions_90d=0` with
  non-zero `sessions_365d` (e.g. the age-help pages) are below the 90-day pull
  cutoff, not literally zero. The 12-month figures are the reliable read for those.
- **Email channel = 60 sessions/yr** is almost certainly an untagged-link tracking
  gap, not real demand. Do not deprioritise email off this number.
- **Analytics Supabase facts stale since ~Apr 26** (`ga4_daily`) / Apr 28
  (`clarity_analytics`). Current numbers here come from live GA4. A one-off backfill
  would let the join read recent history too.
```
