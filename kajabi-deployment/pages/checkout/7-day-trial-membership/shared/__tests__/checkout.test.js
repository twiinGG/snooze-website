#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const checkoutRoot = path.resolve(__dirname, '..', '..');
const repoRoot = path.resolve(__dirname, '../../../../../../../..');
const preimageRoot = path.join(repoRoot, 'apps/snooze-website/kajabi-deployment/_live-preimages/membership-trial-checkouts');
const css = fs.readFileSync(path.join(checkoutRoot, 'shared/checkout.css'));
const source = fs.readFileSync(path.join(checkoutRoot, 'shared/checkout.js'), 'utf8');
const usdBlock = fs.readFileSync(path.join(checkoutRoot, 'usd/checkout-blocks.html'));
const audBlock = fs.readFileSync(path.join(checkoutRoot, 'aud/checkout-blocks.html'));
const cssPreimage = fs.readFileSync(path.join(preimageRoot, '2026-08-30-theme-2164307125-usd-trial-checkout-css-pre.css'));
const jsPreimage = fs.readFileSync(path.join(preimageRoot, '2026-08-30-theme-2164307125-usd-trial-checkout-js-pre.js'));
const usdPreimage = fs.readFileSync(path.join(preimageRoot, '2026-08-30-theme-2164307125-usd-trial-checkout-html-pre.html'));
const audPreimage = fs.readFileSync(path.join(preimageRoot, '2026-08-30-theme-2166681818-aud-trial-checkout-html-pre.html'));

let passed = 0;
let failed = 0;

function assert(name, condition, detail) {
  if (condition) {
    passed += 1;
    console.log('PASS: ' + name);
  } else {
    failed += 1;
    console.error('FAIL: ' + name + (detail ? ' (' + detail + ')' : ''));
  }
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

assert('CSS remains byte-identical to the live rollback preimage', css.equals(cssPreimage));
assert('USD HTML remains byte-identical to the live rollback preimage', usdBlock.equals(usdPreimage));
assert('CSS preimage remains the locked 5,545-byte baseline', cssPreimage.length === 5545);
assert('CSS preimage hash remains locked', sha256(cssPreimage) === '3027431009d2c3233e05d6ab9b2e7c22b0f6ae2a81f9b8de8640a303686c6eed'); // pragma: allowlist secret
assert('JavaScript preimage hash remains locked', sha256(jsPreimage) === 'd28da4a31302ee0ace9a3e7d51365f0667d802fa2ed54f6febfd3236d9b58a2e'); // pragma: allowlist secret
assert('USD HTML preimage hash remains locked', sha256(usdPreimage) === 'd45afdd4062264b6c7e95f5847774f47b7c9b83f0f1c9f0193b89e31a3b45429'); // pragma: allowlist secret
assert('AUD HTML preimage hash remains locked', sha256(audPreimage) === 'a830ea90b4454510b2b9f1c95099d25c3f3295f41eb95307c444ce0fd2d0f63a'); // pragma: allowlist secret

const audLines = audBlock.toString('utf8').split('\n');
const audPreimageLines = audPreimage.toString('utf8').split('\n');
assert('AUD HTML changes only its non-visual root identity attributes', audLines.slice(1).join('\n') === audPreimageLines.slice(1).join('\n'));
assert('AUD root identity is canonical', /data-offer-id="2151254578"[^>]*data-currency="AUD"/.test(audLines[0]));
assert('JavaScript is separate from its rollback preimage', Buffer.from(source).equals(jsPreimage) === false);
assert('JavaScript has no content, style, class or node-tree mutation', !/(textContent\s*=|innerHTML\s*=|outerHTML\s*=|appendChild\s*\(|insertBefore\s*\(|replaceChild\s*\(|classList\.(?:add|remove|toggle)\s*\(|\.style\.)/.test(source));

function element(attributes, text) {
  const values = Object.assign({}, attributes || {});
  const writes = [];
  return {
    nodeType: 1,
    innerText: text || '',
    textContent: text || '',
    value: values.value || '',
    writes: writes,
    getAttribute: function(key) { return values[key] || null; },
    setAttribute: function(key, value) { values[key] = String(value); writes.push(key); },
    addEventListener: function() {},
    querySelector: function() { return null; },
    matches: function(selector) {
      return (selector.indexOf('[data-variant-id]') > -1 && !!values['data-variant-id']) ||
        (selector.indexOf('[data-pricing-option-id]') > -1 && !!values['data-pricing-option-id']);
    },
    closest: function(selector) { return this.matches(selector) ? this : null; }
  };
}

function run(currency, offerId, initialOption, nextOption) {
  const dataLayer = [];
  const listeners = {};
  const timers = [];
  let mutationCallback = null;
  const currencyLink = element({ href: currency === 'USD'
    ? 'https://www.joinsnooze.com/offers/Sr6KzShx/checkout?coupon=keep&utm_source=partner'
    : 'https://www.joinsnooze.com/offers/mqQikDM7/checkout?coupon=keep&utm_source=partner' });
  let selected = initialOption;
  const wrapper = {
    getAttribute: function(key) {
      if (key === 'data-currency') return currency;
      if (key === 'data-offer-id') return offerId;
      return null;
    },
    querySelector: function(selector) { return selector === '[data-currency-switch]' ? currencyLink : null; },
    querySelectorAll: function() { return []; }
  };
  const document = {
    readyState: 'complete',
    body: {},
    documentElement: { scrollHeight: 1200 },
    getElementById: function() { return wrapper; },
    querySelector: function(selector) {
      if (selector.indexOf('.selected') > -1 || selector.indexOf('aria-checked') > -1) return selected;
      return null;
    },
    querySelectorAll: function() { return []; },
    addEventListener: function(name, handler) { listeners[name] = handler; }
  };
  const sandbox = {
    document: document,
    MutationObserver: function(callback) { mutationCallback = callback; this.observe = function() {}; },
    URL: URL,
    console: console,
    window: {
      dataLayer: dataLayer,
      location: {
        origin: 'https://www.joinsnooze.com',
        href: 'https://www.joinsnooze.com/offers/source/checkout?utm_source=meta&utm_campaign=trial&fbclid=abc'
      },
      scrollTo: function() {},
      setTimeout: function(callback) { timers.push(callback); }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'checkout.js' });

  if (nextOption) {
    selected = nextOption;
    listeners.click({ target: { closest: function() { return nextOption; } } });
    mutationCallback([{ type: 'attributes', target: nextOption }]);
    mutationCallback([{ type: 'attributes', target: nextOption }]);
    while (timers.length) timers.shift()();
  }

  return { dataLayer: dataLayer, href: currencyLink.getAttribute('href'), attributeWrites: currencyLink.writes };
}

const cases = [
  ['USD monthly', 'USD', '2150887297', '160544', 'Monthly', '160544', 'Monthly', 'PUBMS02_USD', 79, 'monthly'],
  ['USD quarterly', 'USD', '2150887297', '160544', 'Monthly', '64815', 'Quarterly', 'PUBMS02_USD', 198, 'quarterly'],
  ['USD annual', 'USD', '2150887297', '160544', 'Monthly', '64816', 'Annual', 'PUBMS02_USD', 660, 'annual'],
  ['AUD monthly', 'AUD', '2151254578', '160790', 'Monthly', '160790', 'Monthly', 'PUBMS02_AUD', 119, 'monthly'],
  ['AUD quarterly', 'AUD', '2151254578', '160790', 'Monthly', '160791', 'Quarterly', 'PUBMS02_AUD', 297, 'quarterly'],
  ['AUD annual', 'AUD', '2151254578', '160790', 'Monthly', '160792', 'Annual', 'PUBMS02_AUD', 996, 'annual']
];

cases.forEach(function(testCase) {
  const initial = element({ 'data-variant-id': testCase[3] }, testCase[4]);
  const next = element({ 'data-variant-id': testCase[5] }, testCase[6]);
  const result = run(testCase[1], testCase[2], initial, next);
  const begin = result.dataLayer.filter(function(event) { return event.event === 'begin_checkout'; });
  const selection = result.dataLayer.filter(function(event) { return event.event === 'pricing_option_selected'; });
  assert(testCase[0] + ' emits one canonical begin_checkout', begin.length === 1 && begin[0].offer_code === testCase[7]);
  assert(testCase[0] + ' maps initial value and currency', begin[0].currency === testCase[1] && begin[0].value === (testCase[1] === 'USD' ? 79 : 119));
  if (testCase[3] !== testCase[5]) {
    assert(testCase[0] + ' emits one deduplicated selection', selection.length === 1 && selection[0].amount === testCase[8] && selection[0].plan === testCase[9]);
  } else {
    assert(testCase[0] + ' emits no false selection event', selection.length === 0);
  }
  assert(testCase[0] + ' limits DOM writes to the currency-link href', result.attributeWrites.every(function(name) { return name === 'href'; }));
});

const usd = run('USD', '2150887297', element({ 'data-variant-id': '160544' }, 'Monthly'), element({ 'data-variant-id': '64816' }, 'Annual'));
assert('currency switch preserves existing destination parameters', usd.href.indexOf('coupon=keep') > -1 && usd.href.indexOf('utm_source=partner') > -1);
assert('currency switch adds missing attribution once', usd.href.indexOf('utm_campaign=trial') > -1 && usd.href.indexOf('fbclid=abc') > -1 && (usd.href.match(/utm_source=/g) || []).length === 1);

const serialized = JSON.stringify(cases.map(function(testCase) {
  return run(testCase[1], testCase[2], element({ 'data-variant-id': testCase[3] }, testCase[4]), null).dataLayer;
})).toLowerCase();
assert('browser event payloads contain no PII fields', !/(email|phone|full_name|address|first_name|last_name)/.test(serialized));

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
