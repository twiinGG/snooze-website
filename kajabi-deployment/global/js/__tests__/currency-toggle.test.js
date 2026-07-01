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
    expectIncludes: ['2151256977', 'variant=161174']
  },
  {
    name: 'Snooze Access quarterly USD to AUD (variant 37262)',
    href: 'https://www.joinsnooze.com/offers/2150754998/checkout?variant=37262',
    target: 'AUD',
    expectIncludes: ['2151256977', 'variant=161175']
  },
  {
    name: 'Snooze Access yearly USD to AUD (variant 37263)',
    href: 'https://www.joinsnooze.com/offers/2150754998/checkout?variant=37263',
    target: 'AUD',
    expectIncludes: ['2151256977', 'variant=161176']
  },
  {
    name: 'Snooze Access monthly AUD to USD (round trip)',
    href: 'https://www.joinsnooze.com/offers/2151256977/checkout?variant=161174',
    target: 'USD',
    expectIncludes: ['/offers/2150754998/', 'variant=68112']
  },
  {
    name: 'Snooze Access quarterly AUD to USD with extra query',
    href: 'https://www.joinsnooze.com/offers/2151256977/checkout?variant=161175&utm_source=meta',
    target: 'USD',
    expectIncludes: ['/offers/2150754998/', 'variant=37262', 'utm_source=meta']
  },
  {
    name: 'Camp Snooze USD to AUD (offer-id swap, no variant)',
    href: 'https://www.joinsnooze.com/offers/2150884129/checkout',
    target: 'AUD',
    expectIncludes: ['/offers/2150946767/']
  },
  {
    name: 'Snooze Access USD to AUD (slug form z63s9VaR to vYgCNgJz)',
    href: 'https://www.joinsnooze.com/offers/z63s9VaR/checkout',
    target: 'AUD',
    expectIncludes: ['/offers/vYgCNgJz/']
  },
  {
    name: 'Snooze Access AUD to USD (slug form vYgCNgJz to z63s9VaR)',
    href: 'https://www.joinsnooze.com/offers/vYgCNgJz/checkout',
    target: 'USD',
    expectIncludes: ['/offers/z63s9VaR/']
  },
  {
    name: 'Camp Snooze USD to AUD (slug form K3Y6FEKX to 46Bz9tk6)',
    href: 'https://www.joinsnooze.com/offers/K3Y6FEKX/checkout',
    target: 'AUD',
    expectIncludes: ['/offers/46Bz9tk6']
  },
  {
    name: 'Camp Snooze AUD to USD (slug form 46Bz9tk6 to K3Y6FEKX)',
    href: 'https://www.joinsnooze.com/offers/46Bz9tk6/checkout',
    target: 'USD',
    expectIncludes: ['/offers/K3Y6FEKX/']
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

// Retired membership slugs must NOT be in the active offerMapping. dRN7QR7k
// (dead StoreV2 slug) and 6iRarwak (draft founding offer) were standardised to
// z63s9VaR across all pages on 2026-06-19. A CTA still carrying one must be
// left untouched (no AUD twin), never silently swapped.
['6iRarwak', 'dRN7QR7k'].forEach(function (slug) {
  const inMap = Object.prototype.hasOwnProperty.call(CONFIG.offerMapping, slug);
  const url = 'https://www.joinsnooze.com/offers/' + slug + '/checkout';
  const out = rewrite(url, 'AUD');
  if (!inMap && out === url) {
    passed += 1;
    console.log('PASS  retired slug ' + slug + ' is not mapped and left unchanged');
  } else {
    failed += 1;
    console.log('FAIL  retired slug ' + slug + ' must be absent from offerMapping and left unchanged, got: ' + out);
  }
});

// Tier-2 product offers (courses, guides, consults) have NO AUD twin yet; their
// AUD offers are created in Kajabi admin in a later wave. Until Phase 4 wires
// them, their USD checkout URLs must round-trip unchanged so no AU buyer is
// routed to a non-existent offer. When an AUD twin is created, add the
// offerMapping entry AND move the slug out of this pending list with a real
// swap test above.
const tier2PendingSlugs = ['W2PyqL2X', '9DFJSwVD', 'omMcVgAi', 'FktmJAvJ', 'rVuLzkZa', 'Lzouupsm'];
tier2PendingSlugs.forEach(function (slug) {
  const url = 'https://www.joinsnooze.com/offers/' + slug + '/checkout';
  const out = rewrite(url, 'AUD');
  if (out === url) {
    passed += 1;
    console.log('PASS  Tier-2 pending offer ' + slug + ' round-trips unchanged (no AUD twin yet)');
  } else {
    failed += 1;
    console.log('FAIL  Tier-2 pending offer ' + slug + ' must be unchanged until its AUD twin is wired, got: ' + out);
  }
});

// DOM round-trip regression (updateLinks). rewriteCheckoutUrl is pure and
// always returns the correct target, but updateLinks decides whether to WRITE
// the href. A prior bug compared the target against the stored original href
// instead of the current href, so switching back to USD after an AUD switch
// left the AUD href stranded on the element. This drives window.setCurrency
// through USD -> AUD -> USD -> AUD against a mutable button and asserts the
// href round-trips both directions.
(function domRoundTripTest() {
  const noop = function () {};
  const clsSet = {};
  const bodyClassList = {
    add: function (c) { clsSet[c] = true; },
    remove: function () { for (let i = 0; i < arguments.length; i++) delete clsSet[arguments[i]]; },
    contains: function (c) { return !!clsSet[c]; }
  };

  const attrs = { href: 'https://www.joinsnooze.com/offers/z63s9VaR/checkout' };
  const button = {
    getAttribute: function (k) { return Object.prototype.hasOwnProperty.call(attrs, k) ? attrs[k] : null; },
    setAttribute: function (k, v) { attrs[k] = v; },
    classList: { add: noop, remove: noop, contains: () => false }
  };

  const fakeDoc = {
    readyState: 'loading',
    body: { classList: bodyClassList, appendChild: noop },
    addEventListener: noop,
    querySelector: () => null,
    querySelectorAll: function (sel) {
      return sel.indexOf('dynamic-cta') !== -1 ? [button] : [];
    },
    createElement: () => ({ classList: { add: noop }, setAttribute: noop, appendChild: noop, style: {} }),
    getElementById: () => null
  };
  const sandbox = {
    window: {}, document: fakeDoc, console: console,
    localStorage: { getItem: () => null, setItem: noop },
    Intl: Intl, setTimeout: setTimeout, clearTimeout: clearTimeout
  };
  sandbox.window.document = sandbox.document;
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.location = { href: 'https://www.joinsnooze.com/' };
  vm.createContext(sandbox);
  const src = fs.readFileSync(TOGGLE_PATH, 'utf8')
    .replace(/^\s*<script>\s*$/m, '')
    .replace(/^\s*<\/script>\s*$/m, '');
  vm.runInContext(src, sandbox, { filename: 'currency-toggle.js' });

  const setCurrency = sandbox.window.setCurrency;
  const seq = [
    ['AUD', 'vYgCNgJz'],
    ['USD', 'z63s9VaR'],
    ['AUD', 'vYgCNgJz'],
    ['USD', 'z63s9VaR']
  ];
  let ok = true;
  seq.forEach(function (step) {
    setCurrency(step[0], true);
    if (attrs.href.indexOf('/offers/' + step[1] + '/') === -1) {
      ok = false;
      console.log('FAIL  updateLinks round-trip: after ' + step[0] + ' expected ' + step[1] + ', got ' + attrs.href);
    }
  });
  if (ok) {
    passed += 1;
    console.log('PASS  updateLinks round-trips USD<->AUD on repeated toggles');
  } else {
    failed += 1;
  }
})();

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
