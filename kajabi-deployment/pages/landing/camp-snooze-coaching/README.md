# Camp Snooze Kajabi landing page

Saved in Kajabi as a draft on October 24, 2026. No public launch, traffic or shared-theme changes.

- [Page settings: 2152355854](https://app.kajabi.com/admin/landing_pages/2152355854/edit)
- [Theme builder: 2168014017](https://app.kajabi.com/admin/themes/2168014017/settings/edit)
- Future public path: https://www.joinsnooze.com/camp-snooze-coaching
- Deployment commit: `90e7f88d6`; release tag: `website-v1.6.22`.

## Package

`index.html` is the single custom-code block with complete System Initialization CSS, page HTML, canonical inline footer and fit-check JavaScript. Top-level custom CSS and JS fields stay blank to avoid duplicate execution. `theme-payload.json` sets full-width Nova layout, zero padding and hidden native header, footer and modals. Nova v0.2.7 uses boolean `full_width`; this follows its live authoring schema rather than the older Encore string settings.

Rebuild from the repository root:

```sh
python3 apps/snooze-website/src/camp-vsl/build.py
```

The generator uses the reviewed local page and media manifest. Video and poster are hosted on the existing R2 media domain with immutable content-derived paths. Public asset bytes matched the uploaded files. Captions are embedded as a VTT Blob because the media host does not supply cross-origin caption headers. The fit check stores no answers and submits no leads.

## Verification

- All repository pre-commit hooks passed; no bypass. Hook findings for content hashes and an HTML comment were resolved before commit.
- Placeholder scanner, JavaScript syntax and git whitespace checks passed.
- Environment validator passed after loading umbrella `.env` and using the existing anonymous Supabase key alias. No credentials copied into this worktree.
- Kajabi readback exactly matched the generated code. Render order contains only the Camp section. Native header and footer are hidden. Metadata readback confirmed draft, no publish date and hidden from search.
- Packaged block rendered locally at 1440px and 320px without overflow. Images decoded. Hosted video playback advanced with no media error. All 13 caption cues loaded.
- Empty-selection validation and all six fit-check paths passed, including restart. No browser JavaScript errors.
- Linkinator's first directory scan treated relative footer URLs as local paths. A second scan resolved those links against the production domain: all public marketing pages and media returned 200. Four member destinations returned 403 (`/login`, `/library`, `/snooze-library`, `/products/communities/v2/snooze`), so their authenticated availability remains unverified.
- Evidence: `docs/projects/camp-full-funnel-buildout/4_working/vsl-landing-2026-10-23/kajabi-review/`.

## Release boundary and remaining review

This is saved draft content, not a public deployment. The signed-in Kajabi visual preview is still unverified: no authenticated Kajabi browser session was available and the anonymous draft URL returned 404. The repository forbids automated admin navigation: `apps/snooze-website/AGENTS.md`, section "Parallel live deploy + the two Kajabi WAF walls". Open the theme builder in a signed-in session to check the Nova outer wrapper before approving launch. The short Camp video remains a review asset; obtain public-use approval before launch.

Planning procedure: `docs/operations/BUSINESS-DEVELOPMENT-PLANNING.md`. This acquisition page routes qualified visitors to existing Camp dates and pricing. Kade owns the release decision. Do not change paid traffic, offers or cohort access as part of this page build.

Rollback: leave the page in draft and restore `theme-before.json` through `update_theme_content`, including its original render order and visible chrome. That restores the blank theme; the unused Camp section may remain stored but will not render. Do not delete shared media objects.

Work is isolated in the managed `camp-vsl-kajabi` worktree because the main checkout has unrelated unresolved merge work. Do not overwrite or merge through that work without resolving it separately.
