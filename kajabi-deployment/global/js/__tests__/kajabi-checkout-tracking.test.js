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

const usdTrial = run({
  id: 'order-trial-usd',
  amount: 0,
  currency: 'USD',
  offer_id: '2150887297',
  pricing_option_id: '64815',
  offer_title: 'The Snooze Membership - 7 Day Trial',
  email: 'must-not-enter-data-layer@example.com',
  phone: '0400000000'
});
assert('USD trial emits trial_started', usdTrial.dataLayer[0].event === 'trial_started');
assert('USD trial never emits Purchase', usdTrial.dataLayer.every(function(event) { return event.event !== 'purchase'; }));
assert('USD trial maps quarterly variant', usdTrial.dataLayer[0].variant_id === '64815' && usdTrial.dataLayer[0].plan === 'quarterly');

const audTrial = run({
  id: 'order-trial-aud',
  amount: '0.00',
  offer_id: '2151254578',
  variant_id: '160792',
  offer_title: 'The Snooze Membership - 7 Day Trial'
});
assert('AUD trial emits trial_started', audTrial.dataLayer[0].event === 'trial_started');
assert('AUD trial uses offer allow-list currency', audTrial.dataLayer[0].currency === 'AUD');
assert('AUD trial maps annual variant', audTrial.dataLayer[0].variant_id === '160792' && audTrial.dataLayer[0].cadence === 'yearly');

const missingId = run({ amount: 99, currency: 'AUD' });
assert('missing order ID fails closed', missingId.dataLayer.length === 0);

const missingAmount = run({ id: 'order-without-amount', currency: 'AUD', offer_id: '2151254578' });
assert('missing order amount fails closed', missingAmount.dataLayer.length === 0);

const duplicate = run({
  id: 'order-paid-2',
  amount: 49,
  currency: 'USD',
  offer_id: 'paid-offer',
  offer_title: 'Paid offer'
}, { 'snooze_purchase_fired_order-paid-2': '1' });
assert('paid order reload is suppressed', duplicate.dataLayer.length === 0);

const duplicateTrial = run({
  id: 'order-trial-duplicate',
  amount: 0,
  currency: 'USD',
  offer_id: '2150887297',
  variant_id: '160544'
}, { 'snooze_trial_started_fired_order-trial-duplicate': '1' });
assert('trial reload is suppressed', duplicateTrial.dataLayer.length === 0);

const duplicateFree = run({
  id: 'order-free-duplicate',
  amount: 0,
  currency: 'USD',
  offer_id: 'free-offer'
}, { 'snooze_free_claim_fired_order-free-duplicate': '1' });
assert('free claim reload is suppressed', duplicateFree.dataLayer.length === 0);

const fallbackCurrency = run({
  id: 'order-paid-3',
  amount: 97,
  offer_id: '2150873956',
  offer_title: 'AUD offer'
});
assert('AUD offer allow-list supplies fallback currency', fallbackCurrency.dataLayer[0].ecommerce.currency === 'AUD');

const payloads = [paid, free, usdTrial, audTrial, fallbackCurrency]
  .reduce(function(all, result) { return all.concat(result.dataLayer); }, []);
const serialized = JSON.stringify(payloads).toLowerCase();
assert('order payloads contain no PII fields', !/(email|phone|full_name|address|first_name|last_name)/.test(serialized));

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
