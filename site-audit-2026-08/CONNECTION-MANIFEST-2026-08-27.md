# Connection manifest

**Checked:** August 27, 2026  
**Scope:** joinsnooze.com strategic audit, public acquisition through post-purchase onboarding  
**Gate rule:** Do not begin the full audit unless every required source passes.

## Result

**PASS.** Every required source is available. The authenticated Kajabi gate passed. The Clarity export API returned HTTP 429, `Exceeded daily limit`, but the user supplied an authenticated Google session and the live Snooze dashboard returned the required 30-day aggregate evidence.

## Source checks

| Source | Status | Evidence |
|---|---|---|
| Public homepage | PASS | `https://www.joinsnooze.com/` returned HTTP 200 in 2.17 seconds |
| Camp Snooze landing page | PASS | `https://www.joinsnooze.com/camp-snooze-sleep-coaching` returned HTTP 200 in 1.91 seconds |
| Sitemap | PASS | `https://www.joinsnooze.com/sitemap.xml` returned HTTP 200 in 0.55 seconds |
| Kajabi commerce API | PASS | OAuth live smoke returned 30 offers |
| GA4 Data API | PASS | Property `401774815` returned data for August 20 to August 26, 2026: 243 organic sessions excluding AI referrals, 1 AI referral session and 13 purchase plus lead key events |
| Search Console | PASS | `sc-domain:joinsnooze.com` returned 409 clicks and 13,308 impressions for July 29 to August 25, 2026. It returned 75 page rows and 100 query rows |
| Clarity | PASS VIA AUTHENTICATED DASHBOARD | The [Snooze Clarity dashboard](https://clarity.microsoft.com/projects/view/u15ffg8j35/dashboard?date=Last%2030%20days) loaded through the user-provided Google session. It returned 4,944 human sessions, 2,663 unique users and aggregate behaviour, events, traffic, page and performance evidence for the last 30 days. The export API remained rate-limited |
| Supabase analytics | PASS | [Snooze-OS project](https://supabase.com/dashboard/project/qwwwosoafcsupebpangw) is healthy. `clarity_analytics` has 1,660 rows through August 25, 2026 with a last sync on August 26, 2026. `ga4_daily` has 268,170 rows through August 27, 2026. `meta_ads_daily` has 33 rows through August 26, 2026 |
| Meta Ads | PASS | [The Sleep Concierge ad account](https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=3529815953772612) is active, queryable and funded |
| Stape | PASS | [The Sleep Concierge container](https://app.stape.io/) is running. Base, custom loader and `/healthy` checks passed. The account and subscription are active |
| Operations workbook | PASS | [Snooze Operations workbook](https://docs.google.com/spreadsheets/d/1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg/edit) is readable. `OFFERS` and `KAJABI_OFFERS_LIVE_2026-06-03` are present |
| Ollama text route | PASS | `qwen3.8-fast` returned `HEALTHY` |
| Ollama model inventory | PASS WITH NOTE | `gemma4:12b-it-qat` is installed. The tags endpoint did not list the Qwen aliases even though the `qwen3.8-fast` request succeeded |
| Stated OpenRouter route | NOT REPEATED | Preflight had already passed at a measured cost. No ambiguous screenshot required a cloud vision call before the gate failed |
| Authenticated Kajabi admin | PASS | [Snooze Kajabi dashboard](https://app.kajabi.com/admin/sites/2148291177/dashboard) loaded in the user-provided headed Chrome session |
| Authenticated member preview | PASS | [Welcome To Camp course](https://app.kajabi.com/admin/products/2149544830) opened through Kajabi Preview and rendered the member course, modules and lessons |

## Execution artifacts

- GA4 connection evidence: `docs/projects/measurement/scorecard/runs/2026-08-27-site-audit-ga4.jsonl`
- GA4 raw evidence: `docs/projects/measurement/scorecard/runs/2026-08-27-site-audit-ga4-raw.json`
- GA4 web-performance evidence: `docs/projects/measurement/scorecard/runs/2026-08-27-site-audit-ga4-webperf.jsonl`
- GA4 web-performance raw evidence: `docs/projects/measurement/scorecard/runs/2026-08-27-site-audit-ga4-webperf-raw.json`
- Authenticated journey notes: `AUTHENTICATED-JOURNEY-NOTES-2026-08-27.md`
- Clarity dashboard evidence: `CLARITY-DASHBOARD-EVIDENCE-2026-08-27.md`
- Live offer currency check: the full all-state endpoint returned 113 offers and found five AUD offers missing from the checkout tracking fallback plus one stale fallback ID. This is an audit finding, not a connection failure

## Execution status

The connection gate is clear. Continue with the dated URL inventory, evidence capture, evaluation and audit deliverables. Treat the dashboard capture as the Clarity source for this run and record the API rate limit as a data-access caveat.
