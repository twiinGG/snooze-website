#!/usr/bin/env node
/**
 * Currency-toggle unit tests (PRD §4.7).
 *
 * Verifies variant-aware checkout URL rewriting for the Snooze Access
 * single-offer / three-variant shape, plus the Camp Snooze offer-id swap
 * (regression). Runs as plain Node, no test framework required.
 *
 * Usage:
 *   node apps/snooze-website/kajabi-deployment/global/js/__tests__/currency-toggle.test.js
 *
 * Exits 0 on PASS, 1 on FAIL.
 *
 * The toggle source is a Kajabi paste block wrapped in <script>...</script>
 * tags. We strip those tags, sandbox a minimal window + document, then
 * execute the IIFE and reach in via window.__snoozeCurrencyToggle__.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const TOGGLE_PATH = path.resolve(
  __dirname,
  '..',
  'currency-toggle.js'
);

function loadToggle() {
  let source = fs.readFileSync(TOGGLE_PATH, 'utf8');
  // Strip Kajabi paste-block <script> tags so the file is valid JS in node.
  source = source.replace(/^\s*<script>\s*$/m, '');
  source = source.replace(/^\s*<\/script>\s*$/m, '');

  // Minimal sandbox. The toggle's init code reads from document.body and
  // localStorage; we stub the parts the IIFE touches at top-level only.
  const noop = function () {};
  const fakeElement = {
    classList: { add: noop, remove: noop, contains: () => false },
    appendChild: noop,
    addEventListener: noop,
    setAttribute: noop,
    getAttribute: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    style: {},
    innerHTML: '',
    textContent: ''
  };
  const fakeDoc = {
    // 'loading' keeps the IIFE from invoking initCurrency() synchronously;
    // we only need the helper exported via window.__snoozeCurrencyToggle__.
    readyState: 'loading',
    body: fakeElement,
    addEventListener: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => Object.assign({}, fakeElement),
    getElementById: () => null
  };
  const sandbox = {
    window: {},
    document: fakeDoc,
    console: console,
    localStorage: { getItem: () => null, setItem: noop },
    Intl: Intl,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout
  };
  sandbox.window.document = sandbox.document;
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.location = { href: 'https://www.joinsnooze.com/' };

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'currency-toggle.js' });

  if (!sandbox.window.__snoozeCurrencyToggle__) {
    throw new Error(
      'currency-toggle.js did not expose window.__snoozeCurrencyToggle__'
    );
  }
  return sandbox.window.__snoozeCurrencyToggle__;
}

const toggle = loadToggle();
const rewrite = toggle.rewriteCheckoutUrl;
const CONFIG = toggle.CONFIG;

// Test fixtures. Six representative URLs covering Snooze Access variant
// routing (monthly / quarterly / yearly, both directions) plus Camp Snooze
// offer-id swap as a regression on the non-variant path.
const cases = [
  {
    name: 'Snooze Access monthly USD to AUD (variant 68112)',
    href: 'https://www.joinsnooze.com/offers/2150754998/checkout?variant=68112',
    target: 'AUD',
    expectIncludes: ['<NEW_AUD_ACCESS_OFFER_ID>', 'variant=<AUD_MONTHLY_VARIANT>']
  },
  {
    name: 'Snooze Access quarterly USD to AUD (variant 37262)',
    href: 'https://www.joinsnooze.com/offers/2150754998/checkout?variant=37262',
    target: 'AUD',
    expectIncludes: ['<NEW_AUD_ACCESS_OFFER_ID>', 'variant=<AUD_QUARTERLY_VARIANT>']
  },
  {
    name: 'Snooze Access yearly USD to AUD (variant 37263)',
    href: 'https://www.joinsnooze.com/offers/2150754998/checkout?variant=37263',
    target: 'AUD',
    expectIncludes: ['<NEW_AUD_ACCESS_OFFER_ID>', 'variant=<AUD_YEARLY_VARIANT>']
  },
  {
    name: 'Snooze Access monthly AUD to USD (round trip)',
    href: 'https://www.joinsnooze.com/offers/<NEW_AUD_ACCESS_OFFER_ID>/checkout?variant=<AUD_MONTHLY_VARIANT>',
    target: 'USD',
    expectIncludes: ['/offers/2150754998/', 'variant=68112']
  },
  {
    name: 'Snooze Access quarterly AUD to USD with extra query',
    href: 'https://www.joinsnooze.com/offers/<NEW_AUD_ACCESS_OFFER_ID>/checkout?variant=<AUD_QUARTERLY_VARIANT>&utm_source=meta',
    target: 'USD',
    expectIncludes: ['/offers/2150754998/', 'variant=37262', 'utm_source=meta']
  },
  {
    name: 'Camp Snooze USD to AUD (offer-id swap, no variant)',
    href: 'https://www.joinsnooze.com/offers/2150884129/checkout',
    target: 'AUD',
    expectIncludes: ['/offers/2150946767/']
  }
];

let failed = 0;
let passed = 0;

cases.forEach(function (c) {
  let actual;
  let err;
  try {
    actual = rewrite(c.href, c.target);
  } catch (e) {
    err = e;
  }
  const allMatch = !err && c.expectIncludes.every(function (sub) {
    return actual.indexOf(sub) !== -1;
  });
  if (allMatch) {
    passed += 1;
    console.log('PASS  ' + c.name);
    console.log('       in:  ' + c.href);
    console.log('       out: ' + actual);
  } else {
    failed += 1;
    console.log('FAIL  ' + c.name);
    console.log('       in:    ' + c.href);
    console.log('       got:   ' + (err ? '[error] ' + err.message : actual));
    console.log('       want includes: ' + c.expectIncludes.join(', '));
  }
});

// Negative test. A non-matching URL must round-trip unchanged.
const unchanged = rewrite(
  'https://www.joinsnooze.com/offers/UNKNOWN_OFFER/checkout',
  'AUD'
);
if (unchanged === 'https://www.joinsnooze.com/offers/UNKNOWN_OFFER/checkout') {
  passed += 1;
  console.log('PASS  unknown offer is left unchanged');
} else {
  failed += 1;
  console.log('FAIL  unknown offer must round-trip unchanged, got: ' + unchanged);
}

// Config sanity. The legacy 6iRarwak entry must NOT be present in the
// active offerMapping (it lives in a comment block per PRD §4.6).
if (!Object.prototype.hasOwnProperty.call(CONFIG.offerMapping, '6iRarwak')) {
  passed += 1;
  console.log('PASS  legacy 6iRarwak is not in active offerMapping');
} else {
  failed += 1;
  console.log('FAIL  legacy 6iRarwak must be removed from active offerMapping');
}

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
