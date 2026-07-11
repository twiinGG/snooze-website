# Newsletter Index (hybrid native surface)

**Status:** Deployable hybrid. Live slug: `/newsletters/the-snooze-news`.

## Why this page is different

Newsletter issue listings stay as **native Kajabi blocks**. Custom code supplies the branded title (with subscribe form) and footer.

1. **Title section** (custom code) - "The Snooze News" hero + form embed `2148722040`
2. **Newsletter listings** (native Kajabi) - keep as-is
3. **Footer section** (custom code) - canonical footer

## File

- `newsletter-page.html`
  - Top block: `<div id="newsletter-page">` + `.native-surface-hero--newsletter`
  - Bottom block: `<footer class="snooze-footer-clean">` (synced from `global/html/footer.html`)

## Deploy

1. Confirm theme CSS includes `#newsletter-page` / `.native-surface-hero`.
2. In the Kajabi editor:
   - Paste the title block as the top custom-code section.
   - Keep the native **Newsletter Listings** section.
   - Paste the footer block as the bottom custom-code section.
3. Delete both native **Newsletter Hero** sections (top and duplicate bottom). The custom title replaces them.
4. Remove any duplicate CMS footer section.

Use `scripts/emit_paste_js.py` for pastes.

## Form

Subscribe form: Kajabi form `2148722040` via embed script. Same form as the live Newsletter Hero.

## Wrapper / CSS

- Wrapper ID: `#newsletter-page`
- Hero + form: `.native-surface-hero` / `.native-surface-form` in `theme-custom-code.css`
- Footer: global `.sf-*`
