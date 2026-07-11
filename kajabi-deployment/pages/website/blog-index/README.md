# Blog Index Page (hybrid native surface)

**Status:** Deployable hybrid. Live slug: `/blog`.

## Why this page is different

Blog listings must stay as **native Kajabi blocks** so new posts appear automatically. Custom code cannot replace that feed. This page is therefore a hybrid:

1. **Title section** (custom code) - branded hero
2. **Blog listings** (native Kajabi) - keep as-is
3. **Footer section** (custom code) - canonical footer

This is an intentional exception to the all-in-one page rule. Native listings have to sit between the two custom-code sections.

## File

- `blog-index.html` - source of truth for both custom-code pastes
  - Top block: `<div id="blog-index-page">` + `.native-surface-hero`
  - Bottom block: `<footer class="snooze-footer-clean">` (synced from `global/html/footer.html`)

## Deploy

1. Paste theme CSS first if not already live (`global/css/theme-custom-code.css`) so `.native-surface-hero` styles exist.
2. In the Kajabi page editor for `/blog`:
   - Add/replace a **custom-code** section at the top with the `#blog-index-page` title block only (from the opening `<div>` through its closing `</div>`).
   - Keep the native **blog listings** section.
   - Add/replace a **custom-code** section at the bottom with the `<footer class="snooze-footer-clean">` block only.
3. Delete the old Kajabi text section that says "LATEST ARTICLES" (blue banner).
4. Remove any duplicate CMS footer section.

Use `scripts/emit_paste_js.py` for pastes. Do not hand-transcribe.

## Wrapper / CSS

- Wrapper ID: `#blog-index-page` (title section only)
- Hero styles: `.native-surface-hero` in `theme-custom-code.css`
- Footer styles: global `.sf-*` (no page-scoped footer CSS)

## Maintenance Log

### July 11, 2026: Hybrid title + footer

- Removed placeholder featured/grid/CTA template (never deployable; blocked by placeholder scanner).
- Added branded title hero to replace the Kajabi "LATEST ARTICLES" text section.
- Kept canonical footer as a separate paste target for the hybrid CMS layout.
