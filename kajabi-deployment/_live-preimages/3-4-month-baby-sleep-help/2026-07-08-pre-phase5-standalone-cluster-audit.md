# 3-4-month page: standalone-cluster pre-image audit, 2026-07-08

Per team-lead instruction, both render copies were re-read live today via `get_theme_content` (`fields:["settings"]`, `section_filter:<id>`) before any write decision. PARKED — no write made, per the standing structural-trim ruling for this page.

## Copy A: SECTION 1 glob block
- Section `1764879396597` ("SECTION 1: HERO SECTION"), block `1764879396597_0`
- Contains the ENTIRE old page (hero through footer, 7 sections) crammed into one Custom Code block.
- Confirmed old/go-live-era content: no breadcrumb schema, old H2 "Understanding 3-4 Month Sleep", old footer with "Explore" heading (pre-restructure), old price formatting (`$197/quarter` vs repo's `data-usd`/`data-aud` dynamic-price spans).
- Size and structure match the existing 2026-07-07 pre-images in this directory (`2026-07-07-1764879396597.html`, `2026-07-07-1764879396597-post.html`, ~42.9KB) — no drift since yesterday.
- Dated marker saved: `2026-07-08-pre-phase5-1764879396597-1764879396597_0.html` (references the 2026-07-07 file for the byte-preserved copy rather than re-transcribing; this section is large enough to hit the same manual-retranscription-fidelity limit flagged for the newborn page).

## Copy B: standalone section cluster (the "hidden legacy cluster")
Four separate Kajabi sections, each a Custom Code block containing ONE piece of the same old page content as Copy A:
- `1764879415962` ("SECTION 2: UNDERSTANDING SECTION") — old "Understanding 3-4 Month Sleep" content, matches Copy A's section 2 verbatim.
- `1764879505731` ("SECTION 4: WHAT'S IN SNOOZE SECTION") — old inside-snooze grid, matches Copy A's section 4 verbatim.
- `1764879540856` ("SECTION 5: VALUE COMPARISON SECTION") — old value-comparison markup (static `$117`/`$197` prices, no dynamic-price spans), matches Copy A's section 5 verbatim.
- `1764879568621` ("SECTION 6: AGE CROSS-LINKING SECTION") — old age-crosslinks grid (links use `https://joinsnooze.com/...` without `www.` in one, `https://www.joinsnooze.com/...` in another — inconsistent, pre-existing quirk), matches Copy A's section 6 verbatim.
- All four match today's live read against the existing 2026-07-07 pre-images byte-for-byte in size (2272/2643/4000/3714 bytes respectively) — no drift since yesterday.

## What this confirms for the PARK decision
Both copies are still the OLD (pre-Phase-5) content, word-for-word identical to each other and to yesterday's pre-images. Neither copy has been touched. The repo's `3-4-month-page-complete.html` (39,996 bytes) is a single consolidated file with the Phase-5 breadcrumb/copy/cross-link additions — it does not map cleanly onto either existing structure (one glob block vs. four standalone sections), which is exactly why this page needs the separate structural-trim ruling (C1 in the project tracker) before any write: pasting the repo file into ONE of the two copies without resolving the other would leave stale duplicate content live, or silently orphan one copy from the page's actual render order.

No write was made. Holding for the structural-trim ruling.
