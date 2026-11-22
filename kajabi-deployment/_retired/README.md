# Retired deploy surfaces

Pages removed from the active deploy set by CU-001 decision 9 (Kade, 2026-07-03): both sell "The Snooze Method" as a course, which does not exist as a product. They are retained for reference and must NOT be pasted to Kajabi. If the Method ships as a real asset later, rebuild from current copy standards rather than reviving these.

- `product-page-snooze-method/` (was `pages/website/product-pages/snooze-method/`): full sales page for the non-existent foundational course.
- `landing-snooze-academy/` (was `pages/landing/snooze-academy/`): academy pitch built around the Method concept.

Added by CU-001 session 3 execution (Kade, 2026-07-04):

- `checkout-camp-snooze-bundles/` (was `pages/checkout/camp-snooze-v2-luxury/camp-snooze-{bundle,multiples,multiples-bundle,feb9}-checkout-blocks.html`): decision-additions item A=B. Bundle and multiples pricing has no §1.7 basis and feb9 is a frozen past cohort; retired until the brief-8 pricing redesign defines them. The live single-camp blocks (`camp-snooze-checkout-blocks.html`, `camp-snooze-member-checkout-blocks.html`) stay in place. Camp is to be presented as its own total price with the first month of membership framed as a bonus (not "inclusive"); full reframe deferred to the alumni-50%-off review.
- `landing-founding-member/` (was `pages/landing/founding-member/`): decision-additions item C=A. Countdown expired December 31, 2025 and the page never left draft; retired rather than refreshed.

Added by PRD-CLOSEOUT hygiene tail (2026-07-05):

- `library-page-complete/` (was `pages/website/library/library-page-complete.html`): alternate/older single-file library build, superseded by the remediated `pages/website/library/library-page.html` per the two-surface architecture decision in `apps/snooze-website/docs/KICKOFF-DEPLOY-COMPLETION.md` (curated content pastes to `/snooze-library`; `library-page.html` is the paste target, not this file). No live surface referenced it at time of archiving; only historical audit docs (copy-uplift baselines, PRD status docs) mention its path.

Copy sweeps: exclude this folder (like `_live-preimages/`).

Added November 22, 2026 (Camp page consolidation):

- `landing-camp-snooze-coaching/` (was `pages/landing/camp-snooze-coaching/`): the Camp VSL page on the Nova theme 2168014017 at /camp-snooze-coaching. Nova prints the Custom JS field as literal text, so the page's JavaScript never ran (video, fit check and pricing failed). Kade moved the page to a duplicate of the old Camp booking page at /camp-snooze-program. The paste source is now `pages/landing/camp-snooze-program/`. This copy is the older `website-v1.6.50` build from `main`; the reconciled release lives on branch `merge/origin-main-2026-11-22`.
