# Kajabi form embeds on website pages

The one pattern for putting a Kajabi form on a Snooze website page. Written August 6, 2026 during CNG-002, folding in the durable content of the retired `age-pages/5-12-FREE-SAMPLE-FORM-HANDOFF.md`.

---

## The pattern

One line, inside a container you control:

```html
<div class="snooze-form-embed">
  <script src="https://www.joinsnooze.com/forms/<FORM_ID>/embed.js"></script>
</div>
```

That is the whole integration. Kajabi injects the fields, the button and the POST target. Live examples, all of them working:

| Page | Form | File |
|---|---|---|
| `/contact` | `2148762495` | `contact/contact-page-complete.html` |
| `/newsletter`, `/newsletter-subscribe` | `2148722040` | `newsletter/newsletter-page.html` |
| `/sleep-regressions` | `2148636994` | `sleep-regressions/sleep-regressions-page-complete.html` |
| `/catnapping` | `2148526865` | `catnapping/capture-section.html` |

Get the snippet from the form's own **Embed** tab in Kajabi. Do not hand-write it.

---

## Never build a fake form

**This is the defect the retired handoff documented, and it must not come back.**

The 5-12 month age page once carried a hand-written `<form>` whose submit handler was:

```js
alert('Form submission - Replace with your Kajabi form integration');
```

Every email typed into it was discarded. The visitor saw a browser alert and believed they had signed up. It shipped live because the section was wrapped in an HTML comment that did not actually comment it out: HTML comments do not nest, so an inner `<!-- Left: Course Sample Content -->` closed the outer wrapper early and the fake form rendered.

Two rules follow:

1. **No custom `<form>`, `<input>`, submit handler or `fetch` for a Kajabi capture.** Either the real embed script is there, or the section is not shipped. A placeholder that looks like a working form is worse than an empty div, because nobody reports it as broken.
2. **Do not use HTML comments to hide a section.** They do not nest. Delete the markup, or gate it behind a `style="display:none"` you can grep for.

---

## Styling the embed

Scope the CSS to the page wrapper, never globally. The pattern lives at the end of `global/css/theme-custom-code.css`:

```css
#catnapping-page .snooze-form-embed { ... }
```

That block restyles the Kajabi inputs and button to match `.btn`, and hides the embed's own title and subtitle so the page's `<h2>` carries the pitch. Extend the same selector shape for a new page. Do not invent a second embed CSS system.

The button label is **not** hidden by CSS. It comes from the form's Embed tab in Kajabi and has to be fixed there.

---

## Two traps

**Stale embed chrome.** A form carries its own title, subtitle and button copy from whenever it was created. Several Snooze forms still say "JOIN THE NEWSLETTER" and "Subscribe". Check the Embed tab before assuming the page copy is what renders.

**Site-level required fields.** Fields available to attach to any form (`Baby's Age`, `Baby's Date of Birth`, `Country`, `City`) carry `required: true` at site level. Attaching one silently makes it mandatory on that form. Ask for extra data after the email is banked, on the confirmation page, not on the capture form.

---

## Related

- `catnapping/CAPTURE-SETUP.md`: the fullest worked example, including double opt-in behaviour, grant and sequence automations, attribution and tracking design.
- `docs/technical/KAJABI-SURFACE-CODE-SETUP.md`: which surface stores code where.
