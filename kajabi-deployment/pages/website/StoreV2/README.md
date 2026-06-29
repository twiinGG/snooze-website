# Store Page V2 - Support Map

Deployable Kajabi custom code for the Snooze store page. Paste `store-page-v2.html` into the page's custom code block. `Copy.md` holds the source copy and layout rationale.

## Page wrapper

Wrapper ID: `#store-page-v2`. The CSS design system is scoped per wrapper ID, so this page needs its own System Initialization block in `snooze-unified-theme.css` (see `apps/snooze-website/AGENTS.md`).

## Section structure

`store-page-v2.html` is built in this order:

1. Hero (Orientation)
2. Interactive Four-Tier Support Map
3. Individual Guides Section
4. Snooze Section
5. Camp Snooze Section
6. 1:1 Consults Section
7. Reassurance
8. FAQ Accordion
9. Final CTA

## JavaScript

The tier-stack interaction script at the bottom of the file is scoped to `#store-page-v2` only. It wires click and touch events on `[data-tier]` bars to toggle the matching `[data-desc]` description panel, and defaults to the Snooze tier active on load.
