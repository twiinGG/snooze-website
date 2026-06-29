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
