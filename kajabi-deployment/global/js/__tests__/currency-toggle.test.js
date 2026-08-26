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
    URL: URL,
    URLSearchParams: URLSearchParams,
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
const preserveInboundAttribution = toggle.preserveInboundAttribution;
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

const attributed = preserveInboundAttribution(
  'https://www.joinsnooze.com/offers/vYgCNgJz/checkout?variant=161175&cohort=destination',
  'https://www.joinsnooze.com/camp-snooze?utm_source=meta&utm_medium=paid_social&fbclid=fb-123&gclid=g-456&cohort=inbound&cohort_name=august'
);
const attributedUrl = new URL(attributed);
const attributionOk = attributedUrl.searchParams.get('utm_source') === 'meta' &&
  attributedUrl.searchParams.get('utm_medium') === 'paid_social' &&
  attributedUrl.searchParams.get('fbclid') === 'fb-123' &&
  attributedUrl.searchParams.get('gclid') === 'g-456' &&
  attributedUrl.searchParams.get('cohort') === 'destination' &&
  attributedUrl.searchParams.get('cohort_name') === 'august';
if (attributionOk) {
  passed += 1;
  console.log('PASS  inbound paid attribution survives checkout rewriting and destination params win');
} else {
  failed += 1;
  console.log('FAIL  inbound paid attribution was not preserved: ' + attributed);
}

const deduped = new URL(preserveInboundAttribution(
  'https://www.joinsnooze.com/offers/vYgCNgJz/checkout?utm_source=destination&utm_source=duplicate',
  'https://www.joinsnooze.com/?utm_source=meta&utm_source=second'
));
if (deduped.searchParams.getAll('utm_source').length === 1 &&
    deduped.searchParams.get('utm_source') === 'destination') {
  passed += 1;
  console.log('PASS  attribution query keys never duplicate');
} else {
  failed += 1;
  console.log('FAIL  attribution query keys duplicated: ' + deduped.toString());
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

// Tier-2 AUD twins created via MCP 2026-07-02 (drafts; publish in admin before
// deploying this engine block). Each USD checkout URL must rewrite to its AUD
// twin and round-trip back.
const tier2WiredSlugs = {
  'W2PyqL2X': 'FkZfbT25',  // PUBCR01 3-4 Month Course  $117 -> A$179
  '9DFJSwVD': '8SL8r5sC',  // PUBCR02 5-12 Course       $117 -> A$179
  'FktmJAvJ': 'azdqxZuK',  // PUBCR03 Toddler Toolkit   $117 -> A$179
  'omMcVgAi': 'JfeoXoKn',  // PUBGD02 Newborn Guide     $67  -> A$99
  '32DbWDyP': 'xGVQ2zfC',  // Nap Transition Guide      $27  -> A$39
  '4zHPSRCs': 'wgqokagt',  // PUBCS01 Signature Consult $650 -> A$975
  'jRxWAnVo': 'd5HsPDpJ',  // PUBCS02 45min Follow-up   $390 -> A$590
  'mwiSia6A': 'ZYWF7eY8'   // PUBCS03 2-Week Transform  $3,500 -> A$5,250
};
Object.keys(tier2WiredSlugs).forEach(function (slug) {
  const url = 'https://www.joinsnooze.com/offers/' + slug + '/checkout';
  const expected = 'https://www.joinsnooze.com/offers/' + tier2WiredSlugs[slug] + '/checkout';
  const out = rewrite(url, 'AUD');
  const back = rewrite(out, 'USD');
  if (out === expected && back === url) {
    passed += 1;
    console.log('PASS  Tier-2 wired offer ' + slug + ' swaps to AUD twin and round-trips');
  } else {
    failed += 1;
    console.log('FAIL  Tier-2 wired offer ' + slug + ' expected ' + expected + ' got: ' + out + ' (back: ' + back + ')');
  }
});

// Remaining tier-2 offers with NO AUD twin (Camp Multiples standalone Lzouupsm;
// rVuLzkZa is referenced only in docs). Their USD checkout URLs must round-trip
// unchanged so no AU buyer is routed to a non-existent offer. When an AUD twin
// is created, add the offerMapping entry AND move the slug into tier2WiredSlugs.
const tier2PendingSlugs = ['rVuLzkZa', 'Lzouupsm'];
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
    Intl: Intl, URL: URL, URLSearchParams: URLSearchParams,
    setTimeout: setTimeout, clearTimeout: clearTimeout
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

// Segmented switch UI tests (createToggleButton + updateToggleUI).
(function toggleUiTests() {
  const noop = function () {};

  function createMockElement(tag) {
    const attrs = {};
    const listeners = {};
    const children = [];
    const el = {
      tagName: tag.toUpperCase(),
      type: '',
      className: '',
      classList: {
        _set: {},
        add: function (c) { el.classList._set[c] = true; },
        remove: function (c) { delete el.classList._set[c]; },
        contains: function (c) { return !!el.classList._set[c]; }
      },
      style: {},
      textContent: '',
      innerHTML: '',
      children: children,
      parentNode: null,
      setAttribute: function (k, v) { attrs[k] = String(v); },
      getAttribute: function (k) {
        return Object.prototype.hasOwnProperty.call(attrs, k) ? attrs[k] : null;
      },
      appendChild: function (child) {
        child.parentNode = el;
        children.push(child);
        return child;
      },
      addEventListener: function (type, fn) {
        if (!listeners[type]) listeners[type] = [];
        listeners[type].push(fn);
      },
      dispatchEvent: function (type) {
        const evt = {
          type: type,
          key: type,
          preventDefault: function () {},
          stopPropagation: function () {}
        };
        (listeners[type] || []).forEach(function (fn) {
          fn(evt);
        });
      },
      querySelector: function (sel) {
        if (sel === 'button[role="radio"]') {
          return children.filter(function (c) {
            return c.getAttribute('role') === 'radio';
          })[0] || null;
        }
        return null;
      },
      querySelectorAll: function (sel) {
        if (sel === '.currency-toggle-btn') {
          return documentBody._toggles.slice();
        }
        if (sel === 'button[role="radio"]') {
          return children.filter(function (c) {
            return c.getAttribute('role') === 'radio';
          });
        }
        if (sel.indexOf('dynamic-cta') !== -1) return [];
        if (sel.indexOf('dynamic-price') !== -1) return [];
        return [];
      },
      focus: function () {
        documentBody._activeElement = el;
      }
    };
    return el;
  }

  const documentBody = {
    classList: {
      _set: {},
      add: function (c) { documentBody.classList._set[c] = true; },
      remove: function (c) { delete documentBody.classList._set[c]; },
      contains: function (c) { return !!documentBody.classList._set[c]; }
    },
    appendChild: noop,
    _toggles: [],
    _activeElement: null
  };

  let setCurrencyCalls = [];

  const fakeDoc = {
    readyState: 'loading',
    body: documentBody,
    addEventListener: noop,
    querySelector: function () { return null; },
    querySelectorAll: function (sel) {
      if (sel === '.currency-toggle-btn') return documentBody._toggles.slice();
      return [];
    },
    createElement: function (tag) {
      return createMockElement(tag);
    },
    getElementById: function () { return null; },
    get activeElement() {
      return documentBody._activeElement;
    }
  };

  const sandbox = {
    window: {},
    document: fakeDoc,
    console: console,
    localStorage: { getItem: function () { return null; }, setItem: noop },
    Intl: Intl,
    URL: URL,
    URLSearchParams: URLSearchParams,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout
  };
  sandbox.window.document = sandbox.document;
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.location = { href: 'https://www.joinsnooze.com/' };
  sandbox.window.dataLayer = [];
  sandbox.window.setCurrency = null;

  vm.createContext(sandbox);
  const src = fs.readFileSync(TOGGLE_PATH, 'utf8')
    .replace(/^\s*<script>\s*$/m, '')
    .replace(/^\s*<\/script>\s*$/m, '');
  vm.runInContext(src, sandbox, { filename: 'currency-toggle.js' });
  sandbox.setCurrency = sandbox.window.setCurrency;

  const api = sandbox.window.__snoozeCurrencyToggle__;
  const createToggleButton = api.createToggleButton;
  const updateToggleUI = api.updateToggleUI;
  const originalSetCurrency = sandbox.window.setCurrency;

  sandbox.window.setCurrency = function (currency, save) {
    setCurrencyCalls.push({ currency: currency, save: save });
    return originalSetCurrency(currency, save);
  };
  sandbox.setCurrency = sandbox.window.setCurrency;

  function getSegments(toggle) {
    return toggle.children.filter(function (c) {
      return c.getAttribute('role') === 'radio';
    });
  }

  function assert(name, condition, detail) {
    if (condition) {
      passed += 1;
      console.log('PASS  ' + name);
    } else {
      failed += 1;
      console.log('FAIL  ' + name + (detail ? ': ' + detail : ''));
    }
  }

  const toggle = createToggleButton('inline-currency-toggle');
  documentBody._toggles.push(toggle);

  assert(
    'createToggleButton renders radiogroup with two radio segments',
    toggle.getAttribute('role') === 'radiogroup' &&
      toggle.getAttribute('aria-label') === 'Price currency' &&
      getSegments(toggle).length === 2,
    'expected radiogroup with 2 segments'
  );

  updateToggleUI('AUD');
  const audSegments = getSegments(toggle);
  assert(
    'updateToggleUI sets aria-checked and roving tabindex for AUD',
    audSegments[0].getAttribute('aria-checked') === 'false' &&
      audSegments[0].getAttribute('tabindex') === '-1' &&
      audSegments[1].getAttribute('aria-checked') === 'true' &&
      audSegments[1].getAttribute('tabindex') === '0',
  null
  );

  updateToggleUI('USD');
  const usdSegments = getSegments(toggle);
  assert(
    'updateToggleUI sets aria-checked and roving tabindex for USD',
    usdSegments[0].getAttribute('aria-checked') === 'true' &&
      usdSegments[0].getAttribute('tabindex') === '0' &&
      usdSegments[1].getAttribute('aria-checked') === 'false' &&
      usdSegments[1].getAttribute('tabindex') === '-1',
    null
  );

  setCurrencyCalls = [];
  getSegments(toggle)[1].dispatchEvent('click');
  assert(
    'clicking AUD segment calls setCurrency(AUD) unconditionally',
    setCurrencyCalls.length === 1 && setCurrencyCalls[0].currency === 'AUD',
    JSON.stringify(setCurrencyCalls)
  );

  setCurrencyCalls = [];
  getSegments(toggle)[0].dispatchEvent('click');
  assert(
    'clicking USD segment calls setCurrency(USD) unconditionally',
    setCurrencyCalls.length === 1 && setCurrencyCalls[0].currency === 'USD',
    JSON.stringify(setCurrencyCalls)
  );

  // DOM round-trip: AUD -> USD -> same aria-checked state as start.
  updateToggleUI('USD');
  const startUsd = getSegments(toggle).map(function (s) {
    return s.getAttribute('aria-checked') + ':' + s.getAttribute('tabindex');
  });

  sandbox.window.setCurrency('AUD', false);
  sandbox.window.setCurrency('USD', false);

  const endUsd = getSegments(toggle).map(function (s) {
    return s.getAttribute('aria-checked') + ':' + s.getAttribute('tabindex');
  });

  assert(
    'toggle UI round-trips USD after AUD switch (no stranded aria-checked)',
    startUsd[0] === endUsd[0] && startUsd[1] === endUsd[1],
    'start=' + startUsd.join('|') + ' end=' + endUsd.join('|')
  );
})();

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
