#!/usr/bin/env node
/**
 * Currency DISPLAY simulation (Phase 5).
 *
 * Drives the REAL engine (currency-toggle.js updatePrices path) over every
 * `.dynamic-price` span found in the instrumented pages, simulating both a US
 * visitor (USD) and an AU visitor (AUD). Asserts:
 *   - every span carries BOTH data-usd and data-aud (a missing attr makes the
 *     engine render nothing -> blank price bug),
 *   - the rendered text is `$<usd><period>` in USD and `A$<aud><period>` in AUD.
 *
 * No test framework. Runs as plain node. Exits 0 on PASS, 1 on FAIL.
 *   node apps/snooze-website/kajabi-deployment/global/js/__tests__/currency-display-simulation.test.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..', '..'); // kajabi-deployment
const TOGGLE_PATH = path.resolve(__dirname, '..', 'currency-toggle.js');

// Instrumented files to simulate (Phase 3). Relative to kajabi-deployment.
const FILES = [
  'pages/checkout/camp-snooze-v2-luxury/camp-snooze-checkout-blocks.html',
  'pages/checkout/camp-snooze-v2-luxury/camp-snooze-bundle-checkout-blocks.html',
  'pages/checkout/camp-snooze-v2-luxury/camp-snooze-member-checkout-blocks.html',
  'pages/checkout/camp-snooze-v2-luxury/camp-snooze-multiples-checkout-blocks.html',
  'pages/checkout/camp-snooze-v2-luxury/camp-snooze-multiples-bundle-checkout-blocks.html',
  'pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-landing-page-blocks.html',
  'pages/website/product-pages/3-4-month-course/3-4-month-course-landing-page.html',
  'pages/website/product-pages/5-12-month-course/5-12-month-guide-landing-page.html',
  'pages/website/product-pages/newborn-guide/newborn-guide-landing-page.html',
  'pages/website/product-pages/toddler-toolkit/toddler-toolkit-landing-page.html',
  'pages/website/product-pages/snooze-method/snooze-method-landing-page.html',
  'pages/website/StoreV2/store-page-v2.html',
  'pages/website/store/store-page.html',
  'pages/website/consultations/one-on-one-consultations-page.html',
  'pages/landing/cold-traffic-landing-page/cold-traffic-landing-page-blocks.html',
  'pages/website/age-pages/newborn-page-complete.html',
  'pages/website/age-pages/3-4-month-page-complete.html',
  'pages/website/age-pages/5-12-month-page-complete.html',
  'pages/website/age-pages/toddler-page-complete.html',
  'components/value-comparison.html'
];

// --- Build a fresh fake DOM element for one dynamic-price span. ---
function makeSpan(attrs, classes) {
  return {
    _attrs: attrs,
    _classes: classes,
    classList: { contains: function (c) { return classes.indexOf(c) !== -1; } },
    getAttribute: function (n) { return Object.prototype.hasOwnProperty.call(attrs, n) ? attrs[n] : null; },
    setAttribute: function (n, v) { attrs[n] = String(v); },
    set textContent(v) { this._text = v; },
    get textContent() { return this._text; },
    set innerHTML(v) { this._html = v; this._text = v.replace(/<[^>]+>/g, ''); },
    get innerHTML() { return this._html; }
  };
}

// Parse <span class="dynamic-price ..." data-usd=".." data-aud=".." ...> from HTML.
function extractSpans(html) {
  const spans = [];
  const re = /<span\b([^>]*\bclass=("|')[^"']*\bdynamic-price\b[^"']*\2[^>]*)>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[1];
    const attr = function (name) {
      const a = new RegExp(name + '=("|\')(.*?)\\1', 'i').exec(tag);
      return a ? a[2] : null;
    };
    const cls = (attr('class') || '').split(/\s+/);
    spans.push({
      usd: attr('data-usd'),
      aud: attr('data-aud'),
      pUsd: attr('data-period-usd') || '',
      pAud: attr('data-period-aud') || '',
      classes: cls
    });
  }
  return spans;
}

// Load the engine into a sandbox with a controllable fake document, run
// setCurrency for a given currency, and return the rendered text per span.
function renderAt(currency, spanDefs) {
  let source = fs.readFileSync(TOGGLE_PATH, 'utf8');
  source = source.replace(/^\s*<script>\s*$/m, '').replace(/^\s*<\/script>\s*$/m, '');

  const priceEls = spanDefs.map(function (d) {
    return makeSpan(
      { 'data-usd': d.usd, 'data-aud': d.aud, 'data-period-usd': d.pUsd, 'data-period-aud': d.pAud },
      d.classes
    );
  });

  const bodyClasses = [];
  const fakeBody = {
    classList: {
      add: function () { for (let i = 0; i < arguments.length; i++) bodyClasses.push(arguments[i]); },
      remove: function () {},
      contains: function (c) { return bodyClasses.indexOf(c) !== -1; }
    }
  };

  const fakeDocument = {
    body: fakeBody,
    // 'loading' so the engine defers initCurrency to DOMContentLoaded (never
    // fired here); we then call window.setCurrency directly, matching the
    // approach in currency-toggle.test.js.
    readyState: 'loading',
    addEventListener: function () {},
    documentElement: { classList: { add: function () {} } },
    querySelectorAll: function (sel) {
      if (sel === '.dynamic-price') return priceEls;
      return []; // CTAs / toggle buttons not needed for display sim
    },
    querySelector: function () { return null; },
    getElementById: function () { return null; },
    createElement: function () { return makeSpan({}, []); }
  };

  const sandbox = {
    window: {},
    document: fakeDocument,
    localStorage: { getItem: function () { return currency; }, setItem: function () {} },
    Intl: { DateTimeFormat: function () { return { resolvedOptions: function () { return { timeZone: 'UTC' }; } }; } },
    console: { warn: function () {}, error: function () {}, log: function () {} }
  };
  sandbox.window.document = fakeDocument;
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.dataLayer = [];
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);

  // setCurrency is exposed on window; call it without persisting.
  sandbox.window.setCurrency(currency, false);

  return priceEls.map(function (el) { return el.textContent; });
}

let passed = 0;
let failed = 0;
let totalSpans = 0;
const fileReport = [];

FILES.forEach(function (rel) {
  const abs = path.resolve(ROOT, rel);
  if (!fs.existsSync(abs)) {
    failed += 1;
    console.log('FAIL  missing file: ' + rel);
    return;
  }
  const html = fs.readFileSync(abs, 'utf8');
  const defs = extractSpans(html);
  totalSpans += defs.length;

  // 1. Attribute completeness.
  let missing = 0;
  defs.forEach(function (d) { if (d.usd === null || d.aud === null) missing += 1; });

  // 2. Render simulation.
  let renderFails = 0;
  if (defs.length > 0 && missing === 0) {
    const usdOut = renderAt('USD', defs);
    const audOut = renderAt('AUD', defs);
    defs.forEach(function (d, i) {
      const wantUsd = '$' + d.usd + d.pUsd;
      const wantAud = 'A$' + d.aud + d.pAud;
      if (usdOut[i] !== wantUsd) { renderFails += 1; console.log('FAIL  ' + rel + ' span#' + i + ' USD got "' + usdOut[i] + '" want "' + wantUsd + '"'); }
      if (audOut[i] !== wantAud) { renderFails += 1; console.log('FAIL  ' + rel + ' span#' + i + ' AUD got "' + audOut[i] + '" want "' + wantAud + '"'); }
    });
  }

  const ok = missing === 0 && renderFails === 0;
  if (ok) { passed += 1; } else { failed += 1; }
  if (missing > 0) { console.log('FAIL  ' + rel + ': ' + missing + ' span(s) missing data-usd or data-aud'); }
  fileReport.push({ file: rel, spans: defs.length, missingAttrs: missing, renderFails: renderFails, ok: ok });
});

console.log('');
console.log('Per-file:');
fileReport.forEach(function (r) {
  console.log('  ' + (r.ok ? 'OK  ' : 'BAD ') + r.file + '  (spans=' + r.spans + (r.missingAttrs ? ', missingAttrs=' + r.missingAttrs : '') + (r.renderFails ? ', renderFails=' + r.renderFails : '') + ')');
});
console.log('');
console.log('Files passed: ' + passed + ', failed: ' + failed + '. Total dynamic-price spans simulated: ' + totalSpans + '.');
process.exit(failed === 0 ? 0 : 1);
