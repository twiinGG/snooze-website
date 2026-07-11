# Blog Search Page (hybrid native surface)

**Status:** Deployable hybrid. Live slug: `/blog/search`.

## Why this page is different

Search results are rendered by **native Kajabi blocks**. Custom code supplies the branded title and footer only.

1. **Title section** (custom code) - branded hero
2. **Search / listings** (native Kajabi) - keep as-is
3. **Footer section** (custom code) - canonical footer

## File

- `blog-search.html`
  - Top block: `<div id="blog-search-page">` + `.native-surface-hero`
  - Bottom block: `<footer class="snooze-footer-clean">` (synced from `global/html/footer.html`)

## Deploy

1. Confirm theme CSS includes `#blog-search-page` / `.native-surface-hero`.
2. In the Kajabi editor for `/blog/search`:
   - Paste the title block as the top custom-code section.
   - Keep native search/listings.
   - Paste the footer block as the bottom custom-code section.
3. Delete the old Kajabi text section that says "THE BLOG".
4. Remove any duplicate CMS footer section.

Use `scripts/emit_paste_js.py` for pastes.

## Wrapper / CSS

- Wrapper ID: `#blog-search-page`
- Hero: `.native-surface-hero` in `theme-custom-code.css`
- Footer: global `.sf-*`
