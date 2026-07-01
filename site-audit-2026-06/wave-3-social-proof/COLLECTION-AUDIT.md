# Wave 3 — Collection Audit (before-state)

> Generated 2026-06-09 for the testimonial corpus expansion sprint. Read-only audit of
> what already exists in the canonical stores, compared to the `TESTIMONIAL-INVENTORY.md`
> baseline. No data was modified to produce this.
>
> Reader script: `scripts/audit_counts.py` (read-only Notion query, same auth pattern as
> `sync_member_feedback_wins.py`).

## Headline: the corpus is much larger than the inventory implies

The `TESTIMONIAL-INVENTORY.md` baseline describes ~18 usable quotes, "Camp-heavy". That
document tracks only the **web-published / curated subset**. The canonical Notion store
tells a very different story:

| Store | Count | Notes |
|---|---|---|
| **Notion — Member Feedback & Wins** | **148 rows** | Review-heavy, not Camp-heavy |
| Supabase — `member_feedback_raw` | **0 rows** | Never synced — every Notion row is unsynced |
| Supabase — `member_feedback_sync_log` | 0 rows | No sync has ever run |

## Notion breakdown (148 rows)

**By Source**
| Source | Count |
|---|---|
| Google Review | 137 |
| Review | 10 |
| Community | 1 |

**By Product** (multi-select; sums > 148)
| Product | Count |
|---|---|
| (none) | 82 |
| 1:1 Consult | 24 |
| 5-12 Month Guide | 19 |
| Social Content | 15 |
| Snooze Social | 14 |
| 3-4 Month Course | 6 |
| Newborn Guide | 3 |

**By Content Type:** 147 (none), 1 Case Card. — No rows tagged `Screenshot`, `Video Diary`, or `Quote`.

**By Permission Level:** 147 (none), 1 Internal. — Effectively unset.

**Gating signals**
- `Publish Approved` = true on **147 / 148** rows (despite Permission Level being unset — inconsistent with the gating model).
- `Rating` present on 147 rows.
- **`Google Review ID` present on all 137 Google reviews, zero duplicates** — dedup keys are clean and ready.
- **`👟 Sales CRM` relation: 0 rows linked.** Nothing is currently tied to a CRM contact.

**Date coverage**
- All feedback dates: 2020-08-31 → 2025-12-15.
- Google reviews: 2020-08-31 → **2025-08-18** (newest review in Notion is ~10 months stale relative to today).

## Comparison to TESTIMONIAL-INVENTORY.md baseline

| Dimension | Inventory baseline | Actual (Notion) |
|---|---|---|
| Total usable quotes | ~18 | 148 rows |
| Composition | "Camp-heavy" | Google-review-heavy (137); no Camp wrap-up rows present in Notion |
| Age/course-specific named | "none exist" | Product tags present on ~66 rows (5-12, 3-4, Newborn, Consult) — but unverified for named attribution |
| Google reviews | "not yet harvested" | **137 already harvested** (through Aug 2025) |
| Supabase mirror | implied populated via sync | **empty — never synced** |

The inventory and curated docs are stale and describe a different (smaller, web-facing)
slice than the canonical Notion store.

## Method / tooling notes

- **GBP-out-of-scope flag:** `docs/AI-ready-refactor/INGEST-MANIFEST.md` Track 11 says review
  platforms are "not in play". RUNBOOK #14 + this sprint's task override that — and the data
  confirms a Google-review harvest has in fact already happened. RUNBOOK is authoritative.
- **Log-table name resolved:** the migration SQL names `member_feedback_import_log`, but the
  live table (and the one the sync script writes) is **`member_feedback_sync_log`**. There is
  no `member_feedback_import_log` on the remote. Use `member_feedback_sync_log`.
- **No `Country` property** exists on the Member Feedback DB. Decision: country lives on the
  **CRM** contact (`25433898-…`), surfaced via the `👟 Sales CRM` relation. With 0 rows
  currently linked, country coverage starts at zero.
- **No `Camp Snooze` option** in the Product field (to be added; Camp quotes route to the camp
  page only).

## What this means for the work packages

- **WP2 (Google reviews):** NOT a from-scratch harvest. The job is **incremental** — pull
  reviews dated after ~2025-08-18 and dedupe against the 137 existing `Google Review ID`s.
- **WP3 (Camp transcripts):** still greenfield in Notion (no Camp rows present); proceed.
- **WP4 (screenshots):** greenfield (no `Screenshot` content-type rows); proceed.
- **WP5 (sync):** first-ever sync — `member_feedback_raw` will go 0 → ~148+ rows.
- **Country model:** will resolve to `country_unknown` for almost everything until CRM links
  exist; Google reviewers generally aren't CRM contacts and GBP no longer exposes reviewer
  locale reliably. Honest, but low coverage on reviews. Decision: infer a `country_*` tag on a
  review row ONLY when its text explicitly names a place; CRM relation stays authoritative for
  named people.

## Credential / access reality (probed 2026-06-09)

- **Drive: WORKING.** clip-engine OAuth refresh token (`GOOGLE_REFRESH_TOKEN`, scope
  `https://www.googleapis.com/auth/drive`) lists + downloads the Camp folder. 42 roll-call
  transcripts downloaded to `transcript-extractions/_raw/`. (Local Drive mirror also available
  at `…/GoogleDrive-sally@sleepconcierge.com.au/Shared drives/Snooze Team Drive` for browsing.)
- **GBP owner API: BLOCKED at quota gate.** Service account `ga4-mcp@tsc-ga4-analysis…`
  (key `e8f2848b…`) authenticates. My Business Account Management API is now enabled, but
  `accounts.list` returns **429 RESOURCE_EXHAUSTED** — the project ships at 0 RPM default
  quota. Needs a Google-approved quota increase (days), the SA added as a location manager,
  and the legacy My Business API v4 (allowlisted) for review *content*. Incremental review
  delta (Sep 2025→now) is therefore deferred; the 137 existing reviews carry the sprint.
- **CRM `Country` already exists** (text property on `25433898-…`) — no CRM schema change
  needed.
