#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const checkoutSource = fs.readFileSync(path.resolve(__dirname, '..', 'checkout.js'), 'utf8');
const gtmSource = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', '..', '..', 'global', 'html', 'gtm-begin-checkout-datalayer.html'), 'utf8')
  .replace(/^<script>\s*/, '')
  .replace(/\s*<\/script>\s*$/, '');

let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) { passed += 1; console.log('PASS: ' + name); }
  else { failed += 1; console.error('FAIL: ' + name); }
}

function option(variantId, text) {
  return {
    nodeType: 1,
    innerText: text,
    textContent: text,
    getAttribute: function(name) { return name === 'data-variant-id' ? variantId : null; },
    matches: function(selector) { return selector.indexOf('[data-variant-id]') > -1; },
    closest: function() { return this; },
    querySelector: function() { return null; }
  };
}

function run(config) {
  const dataLayer = [];
  const selected = option(config.variantId, config.plan);
  const currencyLink = { getAttribute: function() { return config.switchUrl; }, setAttribute: function() {}, addEventListener: function() {} };
  const wrapper = {
    getAttribute: function(name) {
      if (name === 'data-offer-id') return config.offerId;
      if (name === 'data-currency') return config.currency;
      return null;
    },
    querySelector: function(selector) { return selector === '[data-currency-switch]' ? currencyLink : null; },
    querySelectorAll: function() { return []; }
  };
  const document = {
    readyState: 'complete',
    body: {},
    getElementById: function() { return wrapper; },
    querySelector: function(selector) {
      if (selector === '#offer-price') return { innerText: config.priceText };
      if (selector === '#offer-title') return { innerText: 'The Snooze Membership - 7 Day Trial' };
      if (selector.indexOf('.selected') > -1 || selector.indexOf('aria-checked') > -1) return selected;
      return null;
    },
    addEventListener: function() {}
  };
  const window = {
    CLIENT_INFO: { offer_token: config.slug },
    dataLayer: dataLayer,
    location: {
      origin: 'https://www.joinsnooze.com',
      href: 'https://www.joinsnooze.com/offers/' + config.slug + '/checkout',
      pathname: '/offers/' + config.slug + '/checkout'
    },
    setTimeout: function(callback) { callback(); }
  };
  const sandbox = {
    window: window,
    document: document,
    URL: URL,
    MutationObserver: function() { this.observe = function() {}; },
    console: { log: function() {} },
    setTimeout: function(callback) { callback(); }
  };
  vm.createContext(sandbox);
  vm.runInContext(gtmSource, sandbox, { filename: 'gtm-begin-checkout-datalayer.html' });
  vm.runInContext(checkoutSource, sandbox, { filename: 'checkout.js' });
  return dataLayer.filter(function(event) { return event.event === 'begin_checkout'; });
}

[
  { label: 'USD', slug: 'mqQikDM7', offerId: '2150887297', currency: 'USD', variantId: '160544', plan: 'Monthly', amount: 79, offerCode: 'PUBMS02_USD', priceText: '$79.00', switchUrl: 'https://www.joinsnooze.com/offers/Sr6KzShx/checkout' },
  { label: 'AUD', slug: 'Sr6KzShx', offerId: '2151254578', currency: 'AUD', variantId: '160790', plan: 'Monthly', amount: 119, offerCode: 'PUBMS02_AUD', priceText: 'A$119.00', switchUrl: 'https://www.joinsnooze.com/offers/mqQikDM7/checkout' }
].forEach(function(config) {
  const events = run(config);
  assert(config.label + ' paired sources emit exactly one begin_checkout', events.length === 1);
  assert(config.label + ' paired event carries canonical identity and value', events[0].offer_id === config.offerId && events[0].offer_code === config.offerCode && events[0].currency === config.currency && events[0].value === config.amount && events[0].ecommerce.value === config.amount);
});

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
