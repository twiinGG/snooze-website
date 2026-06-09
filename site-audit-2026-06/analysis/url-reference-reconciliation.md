# URL-REFERENCE reconciliation (Wave 4 #26)

**Date:** June 9, 2026
**Scope:** correct factual errors in `docs/technical/URL-REFERENCE.md` against the live audit. Working entries left untouched (editing-mode discipline).

The audit addendum already sat at the top of `URL-REFERENCE.md` (June 9, 2026). This pass pushed the corrections down into the individual entries so a reader who jumps to a specific URL sees the right status, not just the summary banner.

## Changes made to `docs/technical/URL-REFERENCE.md`

| URL | Old status in doc | Corrected to | Action recommended |
|---|---|---|---|
| `/privacy-policy` | ✅ Working | ✅ Working, with live Kajabi page id `2156730062` noted as the canonical privacy URL | Link to `/privacy-policy` everywhere |
| `/privacy` | ❌ 404, "NEEDS REDIRECT" | ❌ 404, **NEEDS 301 REDIRECT** to the live `/privacy-policy` (id `2156730062`) | Set a 301 `/privacy` -> `/privacy-policy` |
| `/snooze-village` | ❌ 404, "FIXED IN CODE" | ❌ 404, **DEAD URL** (no Kajabi page; the in-repo link fix never created a live page) | 301 to `/products/communities/v2/snooze` (member-gated) or remove all references |
| `/snooze` | ✅ Working | ❌ 404, **DRAFT** landing page id `2151633113` ("Snooze Main Landing"), never published | Publish the draft or stop treating `/snooze` as live |
| `/get-great-baby-sleep` | ✅ Active | ❌ 404, **DRAFT** website page id `2156754778`, not deployed; DEPRIORITISED (Wave 1 #1, no live ad) | Deploy only when a campaign needs it |
| `/offers/muRW6ug5` (Camp Snooze Jan '26 checkout) | ✅ Working | 🔒 Login-gated / expired (redirects anonymous users to `/login`; camp is past) | Do not use as a public CTA |
| Doc "Last Updated" header | December 18, 2025 | June 9, 2026, pointing to this reconciliation file | n/a |

## Glossary (`/sleep-glossary` vs `/baby-sleep-glossary`)

No edit needed. The doc's glossary entry already points to the live `/baby-sleep-glossary` (200) and explicitly flags `/sleep-glossary` as a 404 that must not be used as a target. Confirmed correct against the audit. (Note: a separate `/sleep-term-glossary` exists only as a Kajabi draft, id `2155377007`, and is not a live URL either; see the draft-page triage.)

## Left unchanged (working entries, per editing-mode discipline)

- `/about` -> `/` 302: already documented correctly as a live redirect.
- All published course/guide/offer checkouts that the audit confirmed render (`W2PyqL2X`, `9DFJSwVD`, `FktmJAvJ`, `omMcVgAi`, etc.).
- The placeholder consultation/upsell offers still awaiting real IDs (unchanged; out of audit scope).

## Redirects to action (summary)

1. `/privacy` -> `/privacy-policy` (301). Live target confirmed.
2. `/snooze-village` -> `/products/communities/v2/snooze` (301) or remove references.
3. `/snooze` and `/get-great-baby-sleep`: not redirects; these are unpublished drafts. Publish or leave dark (both currently 404). No public CTA should point at them.

All three redirect items are Cloudflare/Kajabi-config changes, not repo edits. None were applied here (repo-only pass).
