#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SOURCE_PATH = path.resolve(__dirname, '..', 'kajabi-checkout-tracking.js');
let source = fs.readFileSync(SOURCE_PATH, 'utf8')
  .replace(/^\s*<script>\s*$/m, '')
  .replace(/^\s*<\/script>\s*$/m, '');

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

function run(order, existingStorage) {
  const storage = Object.assign({}, existingStorage || {});
  const dataLayer = [];
  const sandbox = {
    Kajabi: { order: order },
    window: {
      dataLayer: dataLayer,
      localStorage: {
        getItem: function (key) { return storage[key] || null; },
        setItem: function (key, value) { storage[key] = String(value); }
      }
    },
    isFinite: isFinite,
    console: console
  };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'kajabi-checkout-tracking.js' });
  return { dataLayer: dataLayer, storage: storage };
}

const paid = run({
  id: 'order-paid-1',
  amount: '299.00',
  currency: 'AUD',
  offer_id: '2150873956',
  offer_title: 'Snooze Membership'
});
assert('paid order emits one event', paid.dataLayer.length === 1);
assert('paid order emits Purchase', paid.dataLayer[0].event === 'purchase');
assert('paid order uses Kajabi order ID', paid.dataLayer[0].ecommerce.transaction_id === 'order-paid-1');
assert('paid order keeps exact value', paid.dataLayer[0].ecommerce.value === 299);
assert('paid order keeps exact currency', paid.dataLayer[0].ecommerce.currency === 'AUD');
assert('paid order identifies Kajabi as source', paid.dataLayer[0].measurement_source === 'kajabi_order');

const free = run({
  id: 'order-free-1',
  amount: 0,
  currency: 'USD',
  offer_id: 'free-offer',
  offer_title: 'Free guide'
});
assert('free order emits one diagnostic event', free.dataLayer.length === 1);
assert('free order never emits Purchase', free.dataLayer[0].event === 'free_claim');
assert('free order keeps zero value', free.dataLayer[0].value === 0);

const missingId = run({ amount: 99, currency: 'AUD' });
assert('missing order ID fails closed', missingId.dataLayer.length === 0);

const duplicate = run({
  id: 'order-paid-2',
  amount: 49,
  currency: 'USD',
  offer_id: 'paid-offer',
  offer_title: 'Paid offer'
}, { 'snooze_purchase_fired_order-paid-2': '1' });
assert('paid order reload is suppressed', duplicate.dataLayer.length === 0);

const fallbackCurrency = run({
  id: 'order-paid-3',
  amount: 97,
  offer_id: '2150873956',
  offer_title: 'AUD offer'
});
assert('AUD offer allow-list supplies fallback currency', fallbackCurrency.dataLayer[0].ecommerce.currency === 'AUD');

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
