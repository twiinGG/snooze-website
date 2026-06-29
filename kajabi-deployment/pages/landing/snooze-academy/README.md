# Snooze Academy Landing Page

Waitlist landing page for the Snooze Academy sleep consultant certification program.

## Deployment

### Kajabi

Paste `snooze-academy-landing.html` into the Kajabi landing page custom code block (head or body as required). The CSS and JS files are linked via relative paths; host them or inline them as needed for the Kajabi context.

### Standalone / Vercel

Deploy the contents of this directory as the Vercel root. `index.html` is the entry point. The CSS (`snooze-academy.css`) and JS (`snooze-academy.js`) are referenced by relative path from both `index.html` and `snooze-academy-landing.html`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Standalone full-page entry point (includes `<head>`, `<body>`) |
| `snooze-academy-landing.html` | Kajabi injection fragment (no `<html>`/`<head>`/`<body>` wrapper) |
| `snooze-academy.css` | Self-contained styles: System Init block + page-specific styles |
| `snooze-academy.js` | Scroll-triggered fade-up animations, scoped to `#snooze-academy-page` |
| `vercel.json` | Vercel routing config for standalone deployment |

## Notes

- Styles are self-contained; the CSS includes both the System Initialization block (design tokens, base typography, layout utilities, buttons) and page-specific component styles scoped to `#snooze-academy-page`.
- Font Awesome 6.4.0 is loaded via CDN in both HTML files.
- Google Fonts (Playfair Display, Poppins) are loaded via CDN in `index.html` only; `snooze-academy-landing.html` inherits them from the Kajabi theme.
- The waitlist form (`#waitlist`) is a UI shell only; wire up the email input to a Kajabi form or external service before going live.
