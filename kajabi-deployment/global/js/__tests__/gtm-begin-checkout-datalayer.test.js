#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.resolve(__dirname, '..', '..', 'html', 'gtm-begin-checkout-datalayer.html'), 'utf8')
  .replace(/^<script>\s*/, '')
  .replace(/\s*<\/script>\s*$/, '');

let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) { passed += 1; console.log('PASS: ' + name); }
  else { failed += 1; console.error('FAIL: ' + name); }
}

function run(slug, price) {
  const dataLayer = [];
  const window = {
    CLIENT_INFO: { offer_token: slug },
    dataLayer: dataLayer,
    location: { pathname: '/offers/' + slug + '/checkout' }
  };
  const document = {
    querySelector: function(selector) {
      if (selector === '#offer-price') return { innerText: price };
      if (selector === '#offer-title') return { innerText: 'Fixture offer' };
      return null;
    }
  };
  vm.runInNewContext(source, {
    window: window,
    document: document,
    console: { log: function() {} },
    setTimeout: function(callback) { callback(); }
  });
  return dataLayer;
}

['mqQikDM7', 'Sr6KzShx'].forEach(function(slug) {
  assert(slug + ' suppresses the legacy Membership emitter', run(slug, '$79.00').length === 0);
});

const camp = run('wesGUFkc', 'A$997.00');
assert('Camp payment-plan emits once', camp.length === 1);
assert('Camp payment-plan remains unchanged from live GTM preimage', camp[0].ecommerce.currency === 'USD');
assert('Camp payment-plan preserves numeric value', camp[0].ecommerce.value === 997);

const ordinaryUsd = run('ordinaryUsdFixture', '$197.00');
assert('ordinary USD checkout emits once', ordinaryUsd.length === 1);
assert('ordinary USD checkout remains USD', ordinaryUsd[0].ecommerce.currency === 'USD');
assert('ordinary USD checkout preserves numeric value', ordinaryUsd[0].ecommerce.value === 197);

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
