# The Snooze Method Page

Deployable Kajabi website page. Wrapper ID: `#snooze-method-page`.

## Deployment

- Paste `the-snooze-method.html` into the Kajabi website page custom code block for The Snooze Method page.
- Styling is provided by the `#snooze-method-page` initialization block in `kajabi-deployment/global/css/snooze-unified-theme.css`. The HTML carries no inline `<style>`.

## Files

- `the-snooze-method.html` - production page markup.
- `snooze-method-page-complete.html` - alternate/standalone variant (not covered by the current service-model sweep; review separately before deploy).

## Metadata (relocated from stripped header comment)

- Page: The Snooze Method
- Version: 1.0
- Date: December 2025

## Service-model language

Membership benefit copy must not promise weekly cadence, replay archives, 24/7 support, or included 1:1 coaching. Live sessions with Sally and Bec plus a daily expert-moderated community are the genuine benefits. See `docs/brand/SNOOZE-TONE-OF-VOICE-v1.2.md` and the service-model rewrite spec.

## Comment strip (June 29, 2026)

Removed all HTML comments from `snooze-method-page-complete.html` (8 comments: Font Awesome CDN label, styling/deploy notes, navigation placeholder, 3 section dividers, context-aware CTA label, footer placeholder). No structure, selectors, JS, or copy changed.

Genuine instructions relocated here:

- Styling comes from `snooze-unified-theme.css` (global CSS file).
- Deploy CSS to: Kajabi Settings → Website → Theme → Custom CSS.
- Navigation: insert code from `navigation-code-block.html` before the hero section.
- Footer: insert code from `footer.html` after the hero section.
- Context-aware CTA component: insert after the hero section.
