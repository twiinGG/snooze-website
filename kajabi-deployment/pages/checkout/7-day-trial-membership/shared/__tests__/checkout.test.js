#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.resolve(__dirname, '..', 'checkout.js'), 'utf8');
const usdBlock = fs.readFileSync(path.resolve(__dirname, '..', '..', 'usd', 'checkout-blocks.html'), 'utf8');
const audBlock = fs.readFileSync(path.resolve(__dirname, '..', '..', 'aud', 'checkout-blocks.html'), 'utf8');
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

function element(attributes, text) {
  const values = Object.assign({}, attributes || {});
  return {
    nodeType: 1,
    innerText: text || '',
    textContent: text || '',
    value: values.value || '',
    getAttribute: function(key) { return values[key] || null; },
    setAttribute: function(key, value) { values[key] = String(value); },
    addEventListener: function() {},
    querySelector: function() { return null; },
    matches: function(selector) {
      return (selector.indexOf('[data-variant-id]') > -1 && !!values['data-variant-id']) ||
        (selector.indexOf('[data-pricing-option-id]') > -1 && !!values['data-pricing-option-id']);
    },
    closest: function(selector) { return this.matches(selector) ? this : null; }
  };
}

assert('USD block declares the USD trial offer identity', /id="snooze-custom-checkout"[^>]*data-offer-id="2150887297"[^>]*data-currency="USD"/.test(usdBlock));
assert('AUD block declares the AUD trial offer identity', /id="snooze-custom-checkout"[^>]*data-offer-id="2151254578"[^>]*data-currency="AUD"/.test(audBlock));

function run(currency, offerId, initialOption, nextOption) {
  const dataLayer = [];
  const listeners = {};
  let mutationCallback = null;
  let disclosureWrites = 0;
  let disclosureText = '';
  const copy = {
    nodeType: 1,
    matches: function() { return false; },
    closest: function() { return null; },
    querySelector: function() { return null; }
  };
  Object.defineProperty(copy, 'textContent', {
    get: function() { return disclosureText; },
    set: function(value) {
      disclosureWrites += 1;
      disclosureText = String(value);
      if (mutationCallback) {
        mutationCallback([{ type: 'childList', target: copy, addedNodes: [], removedNodes: [] }]);
      }
    }
  });
  const disclosure = { querySelector: function() { return copy; } };
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
    querySelector: function(selector) {
      if (selector === '[data-selected-plan-disclosure]') return disclosure;
      if (selector === '[data-currency-switch]') return currencyLink;
      return null;
    },
    querySelectorAll: function() { return []; }
  };
  const document = {
    readyState: 'complete',
    body: {},
    getElementById: function() { return wrapper; },
    querySelector: function(selector) {
      if (selector === '[data-selected-plan-disclosure]') return disclosure;
      if (selector.indexOf('.selected') > -1 || selector.indexOf('aria-checked') > -1) return selected;
      return null;
    },
    addEventListener: function(name, handler) { listeners[name] = handler; }
  };
  const sandbox = {
    document: document,
    MutationObserver: function(callback) {
      mutationCallback = callback;
      this.observe = function() {};
    },
    URL: URL,
    console: console,
    window: {
      dataLayer: dataLayer,
      location: {
        origin: 'https://www.joinsnooze.com',
        href: 'https://www.joinsnooze.com/offers/source/checkout?utm_source=meta&utm_campaign=trial&fbclid=abc'
      },
      setTimeout: function(callback) { callback(); }
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'checkout.js' });

  if (nextOption) {
    selected = nextOption;
    listeners.click({ target: { closest: function() { return nextOption; } } });
    if (mutationCallback) {
      mutationCallback([{ type: 'attributes', target: nextOption }]);
      mutationCallback([{ type: 'attributes', target: nextOption }]);
    }
  }

  return {
    dataLayer: dataLayer,
    copy: copy.textContent,
    disclosureWrites: disclosureWrites,
    href: currencyLink.getAttribute('href')
  };
}

const usdMonthly = element({ 'data-variant-id': '160544' }, 'Monthly');
const usdAnnual = element({ 'data-variant-id': '64816' }, 'Annual');
const usd = run('USD', '2150887297', usdMonthly, usdAnnual);
assert('USD checkout emits begin_checkout once', usd.dataLayer.filter(event => event.event === 'begin_checkout').length === 1);
assert('USD annual maps the canonical variant', usd.dataLayer[1].variant_id === '64816');
assert('USD annual maps amount and cadence', usd.dataLayer[1].amount === 660 && usd.dataLayer[1].cadence === 'yearly');
assert('selected plan disclosure updates', usd.copy === 'After your 7-day trial: $660 yearly.');
assert('selection mutations do not rewrite an unchanged disclosure', usd.disclosureWrites === 2, 'writes=' + usd.disclosureWrites);
assert('selection mutations deduplicate', usd.dataLayer.filter(event => event.event === 'pricing_option_selected').length === 1);
assert('destination query survives currency switch', usd.href.indexOf('coupon=keep') > -1);
assert('existing destination UTM is not overwritten', usd.href.indexOf('utm_source=partner') > -1 && usd.href.indexOf('utm_source=meta') === -1);
assert('missing inbound UTM survives currency switch', usd.href.indexOf('utm_campaign=trial') > -1);
assert('inbound click ID survives currency switch', usd.href.indexOf('fbclid=abc') > -1);
assert('query parameters are not duplicated', (usd.href.match(/utm_source=/g) || []).length === 1);

const audMonthly = element({ 'data-pricing-option-id': '160790' }, 'Monthly');
const audQuarterly = element({ 'data-pricing-option-id': '160791' }, 'Quarterly');
const aud = run('AUD', '2151254578', audMonthly, audQuarterly);
assert('AUD quarterly maps the canonical variant', aud.dataLayer[1].variant_id === '160791');
assert('AUD quarterly maps amount and currency', aud.dataLayer[1].amount === 297 && aud.dataLayer[1].currency === 'AUD');
assert('AUD disclosure uses A$ amount', aud.copy === 'After your 7-day trial: A$297 every 3 months.');
assert('AUD selection mutations do not rewrite an unchanged disclosure', aud.disclosureWrites === 2, 'writes=' + aud.disclosureWrites);

const mappingCases = [
  ['USD monthly', 'USD', '2150887297', element({ 'data-variant-id': '64816' }, 'Annual'), element({ 'data-variant-id': '160544' }, 'Monthly'), '160544', 79],
  ['USD quarterly', 'USD', '2150887297', element({ 'data-variant-id': '160544' }, 'Monthly'), element({ 'data-variant-id': '64815' }, 'Quarterly'), '64815', 198],
  ['USD annual', 'USD', '2150887297', element({ 'data-variant-id': '160544' }, 'Monthly'), element({ 'data-variant-id': '64816' }, 'Annual'), '64816', 660],
  ['AUD monthly', 'AUD', '2151254578', element({ 'data-variant-id': '160792' }, 'Annual'), element({ 'data-variant-id': '160790' }, 'Monthly'), '160790', 119],
  ['AUD quarterly', 'AUD', '2151254578', element({ 'data-variant-id': '160790' }, 'Monthly'), element({ 'data-variant-id': '160791' }, 'Quarterly'), '160791', 297],
  ['AUD annual', 'AUD', '2151254578', element({ 'data-variant-id': '160790' }, 'Monthly'), element({ 'data-variant-id': '160792' }, 'Annual'), '160792', 996]
];
mappingCases.forEach(function(testCase) {
  const result = run(testCase[1], testCase[2], testCase[3], testCase[4]);
  const selection = result.dataLayer.filter(event => event.event === 'pricing_option_selected')[0];
  assert(testCase[0] + ' variant and amount are canonical', selection.variant_id === testCase[5] && selection.amount === testCase[6]);
  assert(testCase[0] + ' mutation feedback remains bounded', result.disclosureWrites === 2, 'writes=' + result.disclosureWrites);
});

const checkoutRoot = path.resolve(__dirname, '..', '..');
const usdHtml = fs.readFileSync(path.join(checkoutRoot, 'usd', 'checkout-blocks.html'), 'utf8');
const audHtml = fs.readFileSync(path.join(checkoutRoot, 'aud', 'checkout-blocks.html'), 'utf8');
[usdHtml, audHtml].forEach(function(html, index) {
  const label = index === 0 ? 'USD' : 'AUD';
  assert(label + ' checkout discloses $0 due today', html.indexOf('Due today: $0.') > -1);
  assert(label + ' checkout links payment settings', html.indexOf('https://www.joinsnooze.com/settings/cards') > -1);
  assert(label + ' checkout states login is required', html.indexOf('Login required.') > -1);
});

const serialized = JSON.stringify(usd.dataLayer.concat(aud.dataLayer)).toLowerCase();
assert('browser event payloads contain no PII fields', !/(email|phone|full_name|address|first_name|last_name)/.test(serialized));

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
