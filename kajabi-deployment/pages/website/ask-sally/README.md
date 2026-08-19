# ask-sally

Kajabi website pages for the Ask Sally author hub.

## Files

| File | Description |
| --- | --- |
| `ask-sally-page.html` | Full Ask Sally page: hero, newsletter subscribe, featured post, topic grid, latest answers feed, Snooze CTA bridge, FAQ accordion, question submission form, footer. |
| `ask-sally-page-blog-only.html` | Trimmed variant: hero + credibility strip + clean footer only (used on blog-filtered views). |

## Deployment notes

### ask-sally-page.html

- **Newsletter form (section #newsletter):** Replace the placeholder `<form class="newsletter-form">` block with the Kajabi form embed code for the Ask Sally newsletter opt-in.
- **Question submission form (section below FAQ):** Replace the placeholder `<form class="question-form">` block with the Kajabi form embed code for the question submission form.
- Paste into Kajabi as custom code on the relevant website page.

### ask-sally-page-blog-only.html

- **Footer variant:** The footer in this file is the "Snooze Clean Footer - Phase 2" design (class `snooze-footer-clean`). This is a different structure from the legacy `snooze-footer` used in the full page variant.
- **Snooze logotype SVG:** The inline SVG in the footer brand column is the official Snooze Logotype (White). Source file: `docs/branding/Snooze Logotype - white.svg`.
- **"The Snooze Method" nav link:** The Explore column link to `/the-snooze-method` is intentionally omitted from the rendered markup; it was hidden from launch. Re-add `<li><a href="/the-snooze-method">The Snooze Method</a></li>` to the Explore list when that page is live.
