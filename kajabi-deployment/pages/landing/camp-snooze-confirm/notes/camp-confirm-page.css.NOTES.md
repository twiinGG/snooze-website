# camp-confirm-page.css - notes

Comments extracted from `camp-confirm-page.css`. That file is pasted into Kajabi and ships to
every visitor, so the reasoning lives here instead. Each note names the line it sat above and the
code that followed it, so a note whose anchor no longer exists is a note to re-check.

Regenerate with `node scripts/kajabi/extract-comments.mjs apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-confirm/camp-confirm-page.css`.

---

## Line 169

```
/*
```

* THE CONFIRM WIDGET.
 *
 * This card is the primary object on the page, not one section among equals.
 * It carries its own elevation and a wider border than any other block here
 * so it reads first regardless of which state JS has revealed.

## Line 204

```
/* Each state is shown one at a time by JS via `hidden`; see the [hidden]
```

Each state is shown one at a time by JS via `hidden`; see the [hidden]
   rule above. This rule only spaces out whichever state is visible.

## Line 220

```
/* Programmatically focused (tabindex="-1") when a state renders, so it is
```

Programmatically focused (tabindex="-1") when a state renders, so it is
   not a real interactive element; matches the sibling thank-you pages'
   treatment of their own programmatic-focus headings.

## Line 273

```
/* The line under the confirm button. It exists to close off "can I pick a
```

The line under the confirm button. It exists to close off "can I pick a
   different one" without offering a picker, so it stays quiet.

## Line 327

```
/*
```

* WELCOME VIDEO PLACEHOLDER.
 *
 * The section ships `hidden` until the video is recorded. This box still
 * needs to look intentional, not broken, in case it is ever previewed with
 * `hidden` removed before the embed is dropped in.

---

## Extracted 2026-08-26

### Whole file: why the camp tokens are restated here

This page is its own Kajabi theme (`2167276583`), so it cannot share the camp landing theme's Custom
CSS field. One repo file maps to one paste target and a field may never be composed from two files,
so the camp palette, fonts, and the `.btn-camp` / `.btn-camp-cta` / `.btn-outline` / `.camp-badge` /
`.section-divider` / `.pine-pattern` / `.camp-container` component rules are restated here rather
than imported. **Keep the values in step with `camp-snooze-v2-luxury.css`** — they are byte-identical
on purpose, and a divergence is a bug, not a variation.

The `impeccable` design hook flags these fonts and colours as outside `DESIGN.md`. That is expected:
the design source for this page is the camp landing theme, not the site design system, and every
flagged value was verified present in `camp-snooze-v2-luxury.css` before it was written here.

### `.sn-cc-hero` padding, and `.sn-cc-app-card`

The hero is deliberately short — kicker, one heading, divider, one line — because the app-download
card below it has to clear the fold on a laptop. Kade's brief, 2026-08-26: the app block sits
"slightly above the fold". If anything is added to the hero, the app card drops below it and the
brief is broken. Measure before adding.

The app card is the gold-bordered treatment rather than a plain step in a list, because it is the one
thing on the page a buyer must act on after confirming.

### `.sn-cc-video-frame`

The video section still ships `hidden` and nothing in the page JS unhides it, so it is inert until a
camp video exists and something is written to reveal it. Kept because the styling is done and the
section is harmless while hidden.
