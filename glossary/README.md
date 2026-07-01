# Sleep & Parenting Glossary

A single, schema-rich glossary page for joinsnooze.com. It defines the sleep and parenting terms parents keep running into (wake windows, sleep regressions, contact naps), captures top-of-funnel "what is [term]" search traffic, and earns AI-answer citations through `DefinedTermSet` structured data.

Built as **one canonical page** at `/sleep-glossary`, not per-term pages.

## Layout (A-Z edition, June 2026)

A normal A-Z glossary, not category sections:
- Terms are sorted **alphabetically** (leading "the/a/an" ignored for sort) under **letter headings**, with a **sticky A-Z jump bar** (letters with no terms are greyed).
- Each term is an **accordion**: name + **category tag** + a one-line definition are always visible; clicking expands the deeper context, related-term chips and a CTA. All content stays in the DOM (toggled by a CSS class), so it is fully SEO/AEO-scrapable.
- The **5 categories are tags + a filter** (pills, and the tag chips themselves filter), not page sections.
- **Search** filters by term text and aliases.
- **Per-term CTAs** point to the most relevant LIVE page (age-help page, guide/course, consult, or recommended products). The mapping is `CTA`/`DEST` in `build-glossary.mjs`, kept out of `terms.json` so term content stays untouched.

## Files

| File | Role |
|---|---|
| `terms.json` | **Source of truth.** Terms, categories, definitions, related, aliases. |
| `build-glossary.mjs` | Generator. Renders the page (HTML + scoped CSS + JS + JSON-LD) from `terms.json`. Holds the per-term CTA mapping. Zero dependencies. |
| `../kajabi-deployment/pages/website/glossary/sleep-glossary.kajabi-codeblock.html` | **The deliverable.** One self-contained block (CSS + HTML + JS + JSON-LD) to paste into a single Kajabi Custom Code block. Do not hand-edit. |
| `../kajabi-deployment/pages/website/glossary/sleep-glossary.html` | Bare body + JS + JSON-LD (no `<style>`), for reference / a future website page. |

> The earlier multi-block MCP-injection flow (`build-kajabi-parts.mjs`, `kajabi/` parts, the `#glossary-page` System Init block in `snooze-unified-theme.css`) is **superseded** by the single self-contained code block. Those files remain for reference but are not the current deploy path.

## Why a generator

The visible definition text and the JSON-LD `description` / FAQ answers are produced from the same `shortDef` field. Google requires structured data to match visible content, so generating both from one source means the schema can never drift out of sync. Adding a term is a one-line data edit plus a rebuild.

## Add or edit a term

1. Edit `terms.json`. Each term needs:
   - `slug` (kebab-case, becomes the on-page anchor `#slug`)
   - `term`, `category` (must match a category `id`)
   - `shortDef` (1 to 2 sentences, answer-first, reused verbatim in schema, so it must stand alone as a complete answer)
   - `context` (2 to 4 sentences of depth)
   - `related` (array of other term slugs), `link` (a key from the `links` map), `faq` (bool), optional `aliases` (improve on-page search and SEO)
2. Rebuild:
   ```bash
   cd apps/snooze-website/glossary
   node build-glossary.mjs
   ```
   The generator validates the data first (no em dashes, valid categories, related slugs and link keys all resolve) and exits with an error if anything is off.
3. Commit `terms.json` and the regenerated `sleep-glossary.html` together.

## Voice

Follows `~/KhorusOS/system/AI-WRITING-RULES.md` and `docs/brand/SNOOZE-TONE-OF-VOICE-v1.2.md`: no em dashes, no Oxford comma, plain and warm, answer-first. The build script fails if an em dash or en dash slips into `shortDef` or `context`.

## Internal links

`terms.json` maps each term to one contextual funnel link via the `links` block. **Validate every target in `links` against `docs/technical/URL-REFERENCE.md` before publishing** so the page ships with no 404s. Update the `links` map (not each term) to repoint in bulk.

## Voice

The copy is written in Sally's first-person voice (see `docs/brand/SNOOZE-TONE-OF-VOICE-v1.2.md` and verbatim transcripts). `shortDef` stays crisp and answer-first (it feeds the schema); Sally's voice lives in `context`, the intro, the category blurbs and the CTA: her analogies (jet lag, the red ball, adults waking each cycle), mantras (assisted days, independent nights; resettle with confidence; sleep promotes sleep), the regression fear-reframe, Aussie colloquialisms (goes to custard, a beast, blip on the radar) and concrete specifics (Red Nose, Bonds Wondersuit). The build validates no em dashes; keep `should`/`must`/`solution` out per the TOV.

## Deploy (Kajabi Encore landing page, fully via MCP — no copy-paste)

The live page is an Encore **landing page** at `/sleep-glossary` (`site_id 2148291177`, landing page `2152090144`, theme `2166437919`). Everything was pushed through the Kajabi MCP: the theme `css`/`js` fields hold the styles and script, and the content lives in **8 Custom Code blocks** inside section `1717900141593` (hero, 5 categories, CTA, JSON-LD schema), wired through `block_order` and `content_for_index`.

`build-kajabi-parts.mjs` produces the exact pieces to push:

| Part | Goes to | How |
|---|---|---|
| `kajabi/css.txt` | theme top-level `css` field | `update_theme_content` |
| `kajabi/js.txt` | theme top-level `js` field (document-wide, DOMContentLoaded) | `update_theme_content` |
| `kajabi/blocks/block-01..08.html` | one Custom Code block each (`<div class="gl-scope">` wrapped) | `update_theme_content` (`sections.<id>.blocks.<id>`) |

The CSS is scoped to a repeatable `.gl-scope` class (not the `#glossary-page` ID) so the page can be split across multiple code blocks; the JS queries the whole document. The single-block website-page version (`sleep-glossary.html`, `#glossary-page`) is unchanged and remains the source for a future website-page deploy.

### MCP push workflow
1. `node build-glossary.mjs && node build-kajabi-parts.mjs`
2. `enable_toolset themes`. One `update_theme_content` sets `css` + `js` + the section shell with block `_0`.
3. Push the remaining blocks. **GOTCHA:** rapid, similarly-shaped single-block `update_theme_content` calls get coalesced/lost (they return the *same* `updated_at` and silently no-op). Push the remaining blocks in **one combined call** (all block keys under `sections.<id>.blocks`), or verify `updated_at` advances between calls. Set the full `block_order` in the final call.
4. Verify: `get_theme_content` with `section_filter` + `fields:["settings"]` (exclude the huge `skill`); confirm 8 blocks, `block_order` length 8, and that the schema block's JSON-LD parses.
5. Publish the landing page in the admin (drafts are not publicly visible).
6. Add the nav link via MCP: `enable_toolset pages`/`navbars` then `create_navbar_link` on `main-menu` → `/sleep-glossary` (Resources menu; confirm first).

To update content later: edit `terms.json`, rebuild, and re-push the changed block(s) (and `css.txt`/`js.txt` if styling changed).

### Alternative: self-contained single block
`kajabi-deployment/pages/website/glossary/sleep-glossary.kajabi-codeblock.html` inlines CSS + JS + HTML + JSON-LD (`#glossary-page`) in one block, for pasting into a single Custom Code block without the theme `css`/`js` fields.

## Nap Trapped reuse

Terms carry a `brands` array (`snooze`, `nap-trapped`). The Nap Trapped AI-SEO strategy (`apps/nap-trapped-platform/docs/research/AI-SEO-STRATEGY.md`) calls for its own glossary page defining the same framework terms. When that page is built, point a Nap Trapped generator at this same `terms.json`, filtered by `brands.includes('nap-trapped')`, rather than duplicating the data.

## Phase 2 (deferred)

Promote ~6 to 10 head terms (wake windows, sleep regressions, contact naps) to full long-form guides as Kajabi blog posts (`create_blog_post`, HTML), each linking back to its glossary anchor. Re-evaluate after the hub is live and indexed.
