# 5-12 Month Free Sample Form — Repair Handoff

**Page file:** `kajabi-deployment/pages/website/age-pages/5-12-month-page-complete.html`
**Section:** "Free Course Sample (Email Capture)" — "Get Your Free Sample" card
**Kajabi form:** `FMLM01_5-12M-Schedules` — **form_id `2149418596`**

---

## What was broken

The free-sample email capture card contained a **placeholder custom form** that
did not connect to Kajabi. On submit it ran:

```js
alert('Form submission - Replace with your Kajabi form integration');
```

So no lead was ever captured — the email address was discarded and the visitor
saw only a browser alert.

The section was *also* meant to be hidden inside an HTML comment block, but the
wrapper was broken: HTML comments do not nest, and the inner comments (e.g.
`<!-- Left: Course Sample Content -->`) closed the outer `<!-- ... -->` early.
As a result the fake form rendered **live** on the page despite looking
"commented out" in the source.

## What was changed in the repo

All changes are in `5-12-month-page-complete.html` (this section only):

1. **Removed the fake form and the `alert()` submit handler** — no custom
   `<form>`, `<input>`, submit `<button>`, or JS submit listener remains.
2. **Added a clean, explicit Kajabi embed insertion point:**
   ```html
   <div id="kajabi-form-2149418596">
     <!-- PASTE KAJABI EMBED HERE -->
   </div>
   ```
3. **Fixed the broken comment wrapper** so the section is valid HTML (the visual
   card — heading, sub-copy, benefits list — is preserved exactly).
4. **Added operator instructions** as an HTML comment directly above the section
   and above the embed container, referencing form_id `2149418596`.

No other files or age pages were touched. No script `src` URL or POST endpoint
was invented — the embed is intentionally left for the operator to paste from
Kajabi.

## Remaining manual deploy step (in Kajabi)

> This is the only step left to make the form live. Do **not** guess the embed code.

1. In Kajabi admin go to **Marketing → Forms** and open
   **`FMLM01_5-12M-Schedules`** (form_id `2149418596`).
2. Open the form's **Embed** tab and **copy the one-line embed JS snippet**
   Kajabi provides (a single `<script ...></script>` tag).
3. In `5-12-month-page-complete.html`, paste that exact snippet inside the
   `<div id="kajabi-form-2149418596">` container, replacing the
   `<!-- PASTE KAJABI EMBED HERE -->` line. **Change nothing else.**
4. Deploy the page HTML to Kajabi following `docs/DEPLOYMENT-CHECKLIST.md`.

## Verification checklist (after paste + deploy)

- [ ] Embed code pasted is the **official Kajabi one-line snippet** from the
      form's Embed tab (no hand-written `<form>`/`action`/`fetch`).
- [ ] `alert('Form submission...` no longer appears anywhere in the file
      (`grep -n "Form submission" 5-12-month-page-complete.html` returns nothing).
- [ ] On the live page, the "Get Your Free Sample" card renders the **real
      Kajabi form** inside the card (not an empty space, not the old plain field).
- [ ] Submitting a **test email** creates a new contact / submission against form
      `2149418596` in Kajabi (check the form's submissions/contacts).
- [ ] The test contact receives the configured confirmation / sample-delivery
      automation (if one is set up on the form).
- [ ] Layout still responsive: on mobile (<968px) the form card stacks above the
      copy (the existing `@media (max-width: 968px)` rule still applies).
- [ ] No console errors related to the embed on page load.
