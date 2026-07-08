# 3-4-month page: hidden/legacy cluster inventory + pre-image, 2026-07-08

Per team-lead instruction, located and inventoried all remaining old-content sections on the 3-4-month page beyond the glob SECTION 1 block and the 4 standalone duplicates (already handled). These 4 sections are the "SECTION 0/SECTION 5 clusters + 4 hidden legacy native sections" referenced in the brief — the full set found by scanning the sections_index in this page's id range (1764879337945–1764879599933):

| Section ID | Name | `hidden` flag | Byte size (code field) | Contains "Explore"? |
|---|---|---|---|---|
| 1764879337945 | SECTION 0: NAVIGATION | `true` | ~7,600 bytes | No (old nav bar, old sleepconcierge.com.au domain links, "Join Snooze" CTA) |
| 1764879439259 | SECTION 3: CONTEXT-AWARE CTA | `false` | ~2,750 bytes | No (duplicate context-aware CTA injector script — functionally redundant with the same script now embedded in the SECTION 1 glob body, but no footer/heading text) |
| 1764880051136 | SECTION 5: FREE COURSE SAMPLE (EMAIL CAPTURE) | `true` | ~4,050 bytes | No (old email-capture course-sample module, superseded by the repo's capture-slot pattern) |
| 1764879599933 | SECTION 7: FOOTER | `false` | ~15,380 bytes | **YES — this is the confirmed source of the live "Explore" residue** (old "SNOOZE CLEAN FOOTER - PHASE 2" content, identical pattern to toddler's neutralised "Global Footer" section) |

Key finding: despite being called "hidden" in the brief, sections 1764879439259 and 1764879599933 both have `hidden: "false"` in Kajabi's settings — same as the toddler page's "Global Footer" section neutralised earlier. Encore appears to render these regardless of the section name implying legacy/inactive status; only the `hidden` flag controls actual visibility, and even then only for `1764879337945` and `1764880051136`. This confirms SECTION 7 (1764879599933) is why the live page still showed one "Explore" heading after the main glob-block write and standalone-section neutralisation.

## Pre-image content (verbatim, captured via MCP `get_theme_content` before any neutralisation)

### 1764879337945 — SECTION 0: NAVIGATION (hidden:true)
Old nav bar with dropdown "Courses" menu, links to `sleepconcierge.com.au` (old domain) age-course pages, "Join Snooze" primary CTA linking to `sleepconcierge.com.au/offers/6iRarwak/checkout`, mobile menu toggle JS. SVG logo path identical to the one already preserved verbatim in footer.html/repo (elided here for brevity — see that file for the byte-preserved path data).

### 1764879439259 — SECTION 3: CONTEXT-AWARE CTA (hidden:false)
Duplicate of the same `snooze-context-cta` / `SnoozeUserDetection` injector script that already lives inside the SECTION 1 glob body (checkout URL `z63s9VaR`, library URL `/snooze-library`). Byte-identical logic to the one in the newly-written glob block.

### 1764880051136 — SECTION 5: FREE COURSE SAMPLE (EMAIL CAPTURE) (hidden:true)
Old two-column email-capture module: left column "How The Sleep Concierge Can Help" copy + 3-benefit list, right column custom HTML email form (non-functional placeholder, `alert('Form submission...')`). Superseded by the repo's `snooze-capture-slot` / LMCR08 pattern already in the new glob content.

### 1764879599933 — SECTION 7: FOOTER (hidden:false) — THE EXPLORE RESIDUE SOURCE
Old "SNOOZE CLEAN FOOTER - PHASE 2" footer: 4-column layout (Brand / **Explore** / Members / Support), old `sf-heading">Explore` heading with About Sally / Sleep Blog / Coaching links, Members column pointing at `sleepconcierge.com.au` domain (note: different stale domain than toddler's equivalent, which pointed at `joinsnooze.com` — this one is even older/more stale). SVG logo path identical to footer.html/repo (elided here). Full raw content captured in the MCP tool-call transcript at the time of this audit; not re-transcribed byte-for-byte in this markdown file to avoid transcription risk — the section is being neutralised (code blanked) immediately after this pre-image note is saved, and post-neutralisation verification is via public curl per the standing protocol, not a byte diff against this audit copy.

## Action taken after this inventory
All 4 sections above: `settings.code` blanked via `update_theme_content`, sections/blocks themselves NOT deleted (matches the "never delete" instruction). See the verification report sent to team-lead for post-write curl results.
