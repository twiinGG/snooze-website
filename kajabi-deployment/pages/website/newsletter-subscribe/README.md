# Newsletter Subscribe (hybrid native surface)

**Status:** Deployable hybrid. Live slug: `/newsletters/the-snooze-news/subscribe`.

## Why this page is different

This page has no listings feed. It still uses two custom-code sections so the title and footer stay in sync with the other native surfaces, and so a future native block can be inserted between them without restructuring.

1. **Title section** (custom code) - "The Snooze News" hero + form embed `2148722040`
2. **Footer section** (custom code) - canonical footer

## File

- `newsletter-subscribe-page.html`
  - Top block: `<div id="newsletter-subscribe-page">` + `.native-surface-hero--newsletter`
  - Bottom block: `<footer class="snooze-footer-clean">` (synced from `global/html/footer.html`)

## Deploy

1. Confirm theme CSS includes `#newsletter-subscribe-page` / `.native-surface-hero`.
2. In the Kajabi editor:
   - Paste the title block as the top custom-code section.
   - Paste the footer block as the bottom custom-code section.
3. Delete the native **Newsletter Hero** section.
4. Remove any duplicate CMS footer section.

Use `scripts/emit_paste_js.py` for pastes.

## Form

Subscribe form: Kajabi form `2148722040` via embed script.

## Wrapper / CSS

- Wrapper ID: `#newsletter-subscribe-page`
- Hero + form: `.native-surface-hero` / `.native-surface-form` in `theme-custom-code.css`
- Footer: global `.sf-*`
