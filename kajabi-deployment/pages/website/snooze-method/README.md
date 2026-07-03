# The Snooze Methodology Page

Deployable Kajabi LANDING PAGE. Wrapper ID: `#snooze-method-page`.

## Deployment (updated 2026-07-03: landing page, self-contained)

- This is a landing page, so it does NOT load `snooze-unified-theme.css` (that stylesheet lives on the site theme; landing pages carry their own theme).
- `the-snooze-method.html` is therefore SELF-CONTAINED: it ships its own Google Fonts + Font Awesome links and a scoped `<style>` block (all rules scoped to `#snooze-method-page`, brand tokens copied from the unified theme). Paste the whole file into the landing page's custom code block; nothing else is needed.
- No page JS. The site-wide Header Page Scripts (currency engine v2) run on landing pages and drive the closing CTA (`dynamic-cta` + `data-checkout`, z63s9VaR ↔ vYgCNgJz). The old `#pricing` anchor (a dead link on a standalone page) was replaced with the membership checkout URL.
- A same-slug DRAFT website page also exists (id 2156725968); deploy to one surface only.

## Files

- `the-snooze-method.html` - production page markup.
- `snooze-method-page-complete.html` - alternate/standalone variant (not covered by the current service-model sweep; review separately before deploy).

## Metadata (relocated from stripped header comment)

- Page: The Snooze Method
- Version: 1.0
- Date: December 2025

## Service-model language

Membership benefit copy must not promise weekly cadence, replay archives, 24/7 support, or included 1:1 coaching. Live sessions with the Snooze Specialists plus a daily expert-moderated community are the genuine benefits. See `docs/brand/SNOOZE-TONE-OF-VOICE-v1.2.md` and the service-model rewrite spec.

## Comment strip (June 29, 2026)

Removed all HTML comments from `snooze-method-page-complete.html` (8 comments: Font Awesome CDN label, styling/deploy notes, navigation placeholder, 3 section dividers, context-aware CTA label, footer placeholder). No structure, selectors, JS, or copy changed.

Genuine instructions relocated here:

- Styling comes from `snooze-unified-theme.css` (global CSS file).
- Deploy CSS to: Kajabi Settings → Website → Theme → Custom CSS.
- Navigation: insert code from `navigation-code-block.html` before the hero section.
- Footer: insert code from `footer.html` after the hero section.
- Context-aware CTA component: insert after the hero section.


---

## Copy-uplift session 2 change log (2026-07-03, CU-001 Batch 1)

Applied to `the-snooze-method.html` (repo only; NOT yet pasted to Kajabi):

- D-45: the Foundational "The Snooze Method" tier card cut entirely (heading, bullets, "Start with The Snooze Method" CTA). Remaining two cards keep their layout; "Tier 2/3" badges removed with it (corporate-framework speak, P15).
- D-46: intro line is now "Everything you need for your baby's sleep, ready the moment you join, organised by age and stage".
- D-48: "Age-Based Modules" heading and CTA renamed to "Age-Based Courses and Guides" / "Explore the Age-Based Courses".
- D-50 FINAL (Sally's pick, sleep training wars): "No gentle versus harsh debate. We stay out of the sleep training wars and give you practical help that works for your family."
- D-51: closing CTA rewritten (age-based courses + masterclasses/coaching with the Snooze Specialists); Oxford comma removed per house style.
- H1 and section headings moved to the whitelisted bridge form "The Snooze Methodology" (the named-product ban stands; page fate/URL is still OQ4 and unchanged).
- P18: "schedule optimisation".
- Verified: tag balance OK, zero kill-list residue.
