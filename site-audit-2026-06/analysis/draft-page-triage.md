# Draft-page triage (Wave 4 #23)

**Date:** June 9, 2026
**Source:** Kajabi MCP read, site `2148291177`. `list_website_pages?status=draft` (8) + `list_landing_pages?status=draft` (32) = **40 draft pages** (matches the audit's "40 draft / 27 published").

**Recommendation key:**
- **DELETE** — obvious cruft: `-OLD` / `-ARCHIVED` / `-BACKUP`, `TEMPLATE`, `test`/`testing`, `Blank`, `encore-page-*`, or duplicate "Copy"/"1" suffixes.
- **LEAVE** — genuine in-progress or intentionally-dark page; keep as draft.
- **PUBLISH** — finished page that should be live (none flagged here without owner sign-off; publishing is a live action outside this repo-only pass).

This is a read-only triage. No publish states were changed. Deleting Kajabi pages is a manual admin action; do not delete via MCP without sign-off (some "OLD"/"BACKUP" pages may still hold a slug another page redirects through, and some carry historical form submissions).

## Website pages (draft) — 8

| Path | ID | Type | Created | Last updated | Recommendation | Reason |
|---|---|---|---|---|---|---|
| `service` | 2155108820 | website | 2024-08-01 | 2025-12-04 | LEAVE | Genuine "Expert Sleep Services" page; touched Dec 2025. Decide publish vs delete with Sally; not obvious cruft. |
| `sleep-term-glossary` | 2155377007 | website | 2024-10-19 | 2024-10-19 | DELETE | Superseded by the live `/baby-sleep-glossary`. Untouched since creation day in 2024. Duplicate glossary concept. |
| `the-sleep-concierge-faq` | 2155514916 | website | 2024-11-20 | 2025-12-04 | LEAVE | FAQ page; recently touched. Candidate to publish (supports AEO) but needs content review first. |
| `downloadable-free-sleep-guides` | 2155671326 | website | 2025-01-02 | 2025-12-04 | LEAVE | Free-guides hub; recently touched. Review for publish; not cruft. |
| `the-snooze-method` | 2156725968 | website | 2025-12-04 | 2025-12-04 | LEAVE | The Snooze Method landing (Wave 2 #11 says leave dark for now). In-progress. |
| `one-on-one-sleep-coaching-the-sleep-concierge-copy-1` | 2156734289 | website | 2025-12-08 | 2025-12-08 | DELETE | "Copy 1" duplicate of the live `/one-on-one-sleep-consultations`. Never edited after creation. |
| `founding-member` | 2156746895 | website | 2025-12-13 | 2026-01-02 | LEAVE | Genuine founding-member page; in-progress (also a `founding-member-new` landing draft exists, see below; consolidate). |
| `get-great-baby-sleep` | 2156754778 | website | 2025-12-16 | 2026-01-02 | LEAVE | Cold-traffic landing, built in repo, DEPRIORITISED (Wave 1 #1). Keep dark until a campaign needs it. |

## Landing pages (draft) — 32

| Path | ID | Type | Created | Last updated | Recommendation | Reason |
|---|---|---|---|---|---|---|
| `blank` | 2150166556 | landing | 2024-04-04 | 2024-04-04 | DELETE | Blank scaffold. |
| `blank-page` | 2150169706 | landing | 2024-04-05 | 2024-06-16 | DELETE | Blank scaffold. |
| `the-snooze-social-membership` | 2150176907 | landing | 2024-04-08 | 2025-12-04 | LEAVE | "Join Snooze Social" — product renamed to The Snooze Membership; review whether still needed before deleting. |
| `blank-page-6ec11abd-96da-4b7e-a118-120219692b94` | 2150240484 | landing | 2024-05-02 | 2024-06-16 | DELETE | Blank scaffold with UUID suffix. |
| `confirmation` | 2150240497 | landing | 2024-05-02 | 2025-12-04 | LEAVE | "We've Saved Your Seat" confirmation page; may be wired to a form/funnel. Verify no funnel references it before any delete. |
| `product/5-12-Month-Baby-Sleep-Guide-ARCHIVED` | 2150355277 | landing | 2024-06-16 | 2025-05-22 | DELETE | Explicit `ARCHIVED` suffix. |
| `product/catnapping-guide-free` | 2150464727 | landing | 2024-08-01 | 2025-12-04 | LEAVE | Free Catnapping Guide lead-magnet page; recently touched. Review for publish/lead-magnet use. |
| `5-12-month-baby-sleep-guide-the-sleep-concierge-BACKUP` | 2150464820 | landing | 2024-08-01 | 2024-08-01 | DELETE | Explicit `BACKUP` suffix; never edited. |
| `product/downloadable-sleep-guide-fourth-trimester-OLD` | 2150464824 | landing | 2024-08-01 | 2025-12-07 | DELETE | Explicit `OLD` suffix (newborn guide); superseded by `/products/newborn-sleep-guide`. |
| `free-baby-sleep-assessment` | 2150470369 | landing | 2024-08-03 | 2025-06-19 | LEAVE | Lead-gen assessment page; potentially useful. Review with owner. |
| `links-OLD` | 2150483982 | landing | 2024-08-09 | 2026-01-15 | DELETE | Explicit `OLD` suffix; superseded by the live `/links`. (Recently touched, so confirm `/links` is the live one first.) |
| `joinus` | 2150589161 | landing | 2024-09-19 | 2024-09-19 | DELETE | Stale 5-12 guide presale page; never edited after creation. |
| `encore-page-1714377471_1_` | 2151195749 | landing | 2025-05-02 | 2025-05-02 | DELETE | Auto-generated `encore-page-*` scaffold. |
| `encore-page-1714377471_1_-1` | 2151195760 | landing | 2025-05-02 | 2025-05-02 | DELETE | Auto-generated `encore-page-*` duplicate (`-1`). |
| `3-to-2-transition` | 2151195870 | landing | 2025-05-02 | 2025-05-02 | LEAVE | Mini-guide page; possible live mini-guide funnel. Review before delete. |
| `joinus-96bca3d4-dfa2-4576-be27-f384026f3a58` | 2151212370 | landing | 2025-05-08 | 2025-05-08 | DELETE | "test001" presale page with UUID suffix; test artifact. |
| `product/5-12-Month-Baby-Sleep-Guide-OLD` | 2151246074 | landing | 2025-05-21 | 2025-12-07 | DELETE | Explicit `OLD` suffix. |
| `TEMPLATE3-4-sleep-masterclass-replay` | 2151266110 | landing | 2025-05-28 | 2025-05-28 | DELETE | `TEMPLATE` / "R.A. TEMPLATE" reusable template, not a live page. |
| `3-4-month-baby-sleep-course-OLD` | 2151266267 | landing | 2025-05-28 | 2025-12-06 | DELETE | Explicit `OLD` suffix; superseded by the live `/3-4-month-baby-sleep-course`. |
| `3-4-month-sleep-training-masterclass-replay-offer` | 2151329919 | landing | 2025-06-21 | 2025-06-21 | LEAVE | Masterclass replay offer; verify if a campaign still uses it before delete. |
| `snooze-waitlist` | 2151416900 | landing | 2025-07-28 | 2025-12-04 | LEAVE | Launch waitlist; launch is past but recently touched. Review/archive with owner. |
| `camp-snooze-waitlist` | 2151494634 | landing | 2025-08-29 | 2025-12-31 | LEAVE | Camp waitlist; rotating-cohort model means waitlists get reused. Keep. |
| `camp-snooze-waitlist-1` | 2151497036 | landing | 2025-08-30 | 2025-09-01 | DELETE | Duplicate `-1` of `camp-snooze-waitlist`; never developed. |
| `snooze` | 2151633113 | landing | 2025-10-27 | 2025-12-18 | LEAVE | "Snooze Main Landing" — referenced in URL-REFERENCE as `/snooze`. 404 live. Decide publish vs retire (see reconciliation #26). |
| `snooze-assets-page` | 2151633132 | landing | 2025-10-27 | 2025-10-27 | LEAVE | Internal assets page; likely intentional utility page. Confirm before delete. |
| `thank-you-snooze-founder` | 2151729697 | landing | 2025-12-08 | 2025-12-08 | LEAVE | Thank-you page; usually wired to the founding-member checkout funnel. Verify funnel link before delete. |
| `founding-member-new` | 2151755773 | landing | 2025-12-21 | 2025-12-21 | LEAVE | Newer founding-member variant; consolidate with website page `founding-member` (2156746895). Pick one, delete the loser. |
| `testing-page` | 2151773154 | landing | 2026-01-03 | 2026-01-22 | DELETE | `TESTING Page`; test artifact. |
| `snooze-home-testing` | 2151789857 | landing | 2026-01-11 | 2026-01-15 | DELETE | `Snooze Home (TESTING PAGE)`; test artifact. |
| `early-snooze-access` | 2151791139 | landing | 2026-01-12 | 2026-01-12 | LEAVE | Early-access page; review with owner. Not obvious cruft. |
| `camp-snooze-sleep-coaching-DRAFTHOLD` | 2151845416 | landing | 2026-02-06 | 2026-03-19 | LEAVE | `DRAFTHOLD` parking copy of the live camp page; intentional hold. Keep as draft (do not publish over the live `/camp-snooze-sleep-coaching`). |
| `day-pass` | 2152089948 | landing | 2026-06-07 | 2026-06-07 | LEAVE | Snooze Day Pass; active in-progress (created two days ago, dual-currency rollout target). Keep. |

## Tally

- **DELETE (obvious cruft):** 18 — 2 website (`sleep-term-glossary`, `one-on-one...copy-1`), 16 landing (3 blanks, 5 OLD/ARCHIVED/BACKUP, 2 encore-page, 1 TEMPLATE, 2 testing, 1 test001-UUID, `joinus`, `camp-snooze-waitlist-1`, `links-OLD`).
- **LEAVE (in-progress / intentional):** 22 — includes founding-member, day-pass, service, the-snooze-method per brief, plus waitlists, thank-you/confirmation funnel pages, and DRAFTHOLD parking pages.
- **PUBLISH:** 0 flagged without owner sign-off. Strongest publish candidates pending content review: `the-sleep-concierge-faq` (AEO value) and `downloadable-free-sleep-guides`.

## Caveats before deleting

- `confirmation`, `thank-you-snooze-founder`, and the waitlist pages may be wired into Kajabi funnels/forms; check funnel step references before deleting (deleting a funnel step page can break a live form flow).
- `links-OLD` was touched Jan 2026; confirm the live `/links` is the canonical one before deleting.
- Decide `founding-member` (website 2156746895) vs `founding-member-new` (landing 2151755773): two drafts for the same offer. Keep one.
