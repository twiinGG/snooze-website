# Sleep & Parenting Glossary

A single, schema-rich glossary page for joinsnooze.com. It defines the sleep and parenting terms parents keep running into (wake windows, sleep regressions, contact naps), captures top-of-funnel "what is [term]" search traffic, and earns AI-answer citations through `DefinedTermSet` structured data.

Built as **one canonical page** at `/sleep-glossary`, not per-term pages. That keeps it lightweight and avoids the thin-content penalty mass glossary pages attract. High-value head terms can graduate to full long-form guides later (Phase 2).

## Files

| File | Role |
|---|---|
| `terms.json` | **Source of truth.** All terms, categories, definitions, links. |
| `build-glossary.mjs` | Generator. Renders the page HTML + JSON-LD from `terms.json`. Zero dependencies. |
| `../kajabi-deployment/pages/website/glossary/sleep-glossary.html` | **Generated output.** Do not hand-edit. |
| `../kajabi-deployment/global/css/snooze-unified-theme.css` | Holds the `#glossary-page` System Initialization block + styles. |

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

## Deploy

This is a Kajabi **Website Page** (custom HTML code block), deployed by the standard repo flow, not via the Kajabi MCP (the MCP has no create-website-page tool, and landing pages cannot carry raw HTML + JSON-LD):

1. Commit on a feature branch; run `scripts/publish-snooze-website.sh` to mirror to `twiinGG/snooze-website`.
2. In Kajabi (`site_id 2148291177`), create a Website Page, slug `sleep-glossary`. Paste `sleep-glossary.html` into a Code Block. Set the SEO page title and meta description.
3. Confirm the global CSS (with the `#glossary-page` block) and global JS are live.
4. Add the nav link via the Kajabi MCP: `enable_toolset name:'navbars'`, then `create_navbar_link` on `main-menu` pointing at `/sleep-glossary`. Confirm placement with Kade first.

## Nap Trapped reuse

Terms carry a `brands` array (`snooze`, `nap-trapped`). The Nap Trapped AI-SEO strategy (`apps/nap-trapped-platform/docs/research/AI-SEO-STRATEGY.md`) calls for its own glossary page defining the same framework terms. When that page is built, point a Nap Trapped generator at this same `terms.json`, filtered by `brands.includes('nap-trapped')`, rather than duplicating the data.

## Phase 2 (deferred)

Promote ~6 to 10 head terms (wake windows, sleep regressions, contact naps) to full long-form guides as Kajabi blog posts (`create_blog_post`, HTML), each linking back to its glossary anchor. Re-evaluate after the hub is live and indexed.
