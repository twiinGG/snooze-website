# global/html

Shared HTML fragments injected site-wide via Kajabi.

---

## navigation.html

**Deployment:** Paste into Kajabi > Website > Theme > Navigation custom code block (or equivalent global header injection point).

**Note:** `toggleSnoozeMenu()` is defined in `global/js/snooze-globals.js` (site header script), not inline here.

**Branding source:** Snooze logotype (coral) SVG originates from `docs/branding/Snooze Logotype - coral.svg`.

---

## footer.html

**Branding source:** Snooze logotype (white) SVG originates from `docs/branding/Snooze Logotype - white.svg`.

**Deferred nav item:** "The Snooze Method" link (`/the-snooze-method`) was intentionally hidden at launch and is not rendered. Re-enable by adding `<li><a href="/the-snooze-method">The Snooze Method</a></li>` back into the Explore column list when the page is ready.

---

## currency-toggle-fouc.html

**Deployment location:** Kajabi Settings > Site Details > Header Page Scripts

This script must run in the `<head>` before DOM ready to prevent flash of wrong currency on page load. It reads `snooze_currency_preference` from `localStorage`, auto-detects via timezone if no preference is saved, and adds `currency-aud-selected` and `currency-loaded` classes to `document.documentElement`.

---

## Schema Paste Order

**Deployment location:** Kajabi Settings > Site Details > Header Page Scripts

Paste schema snippets in this order for the Phase 5 GEO deploy:

1. `schema-organization.html`
2. `schema-person-sally.html`
3. `blog-schema-paste.html`

`schema-organization.html` owns `https://www.joinsnooze.com/#organization`.
`schema-person-sally.html` owns `https://www.joinsnooze.com/author/sally-woods#person`.
BlogPosting author references must use the same Person `@id`.

For flat URLs that belong to a hub, add a visible line near the page intro:

```html
<p class="snooze-breadcrumb-context">Part of: <a href="HUB_URL">HUB_NAME</a></p>
```

Then paste a page-specific copy of `breadcrumb-schema-template.html` into that page. Replace `HUB_NAME`, `HUB_URL`, `PAGE_NAME` and `PAGE_URL` before paste. Only add FAQPage or HowTo schema where matching visible Q&A or steps already exist on the page.
