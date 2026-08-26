/**
 * DEPRECATED PASTE TARGET — do not paste this file into Kajabi.
 *
 * Single website Custom JavaScript source of truth:
 *   global/js/theme-custom-code.js
 *
 * Kajabi: Theme Custom Code → JS (settings-js-input)
 *   aka Settings → Website → Custom JavaScript
 *
 * Website-wide GTM, Stape, navigation, checkout-link and currency helpers live in:
 *   global/html/site-header-page-scripts.html
 *
 * Kajabi loads theme-custom-code.js on every website page. Its current
 * behaviour is guarded to #home-page and exits safely on other website pages.
 *
 * currency-toggle.js is an extract of the bundled currency block for unit tests.
 * After editing currency logic in site-header-page-scripts.html, re-extract or keep them in sync
 * via: node __tests__/sync-currency-toggle-extract.js (see README).
 */
