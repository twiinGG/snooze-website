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
