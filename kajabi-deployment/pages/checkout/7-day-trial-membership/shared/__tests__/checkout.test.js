#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../../../../../../../..');
const checkoutRoot = path.resolve(__dirname, '..', '..');
const preimageRoot = path.join(
  repoRoot,
  'apps/snooze-website/kajabi-deployment/_live-preimages/membership-trial-checkouts'
);

const pairs = [
  [
    'USD HTML',
    path.join(checkoutRoot, 'usd/checkout-blocks.html'),
    path.join(preimageRoot, '2026-08-30-theme-2164307125-usd-trial-checkout-html-pre.html')
  ],
  [
    'AUD HTML',
    path.join(checkoutRoot, 'aud/checkout-blocks.html'),
    path.join(preimageRoot, '2026-08-30-theme-2166681818-aud-trial-checkout-html-pre.html')
  ],
  [
    'shared CSS',
    path.join(checkoutRoot, 'shared/checkout.css'),
    path.join(preimageRoot, '2026-08-30-theme-2164307125-usd-trial-checkout-css-pre.css')
  ],
  [
    'shared JavaScript',
    path.join(checkoutRoot, 'shared/checkout.js'),
    path.join(preimageRoot, '2026-08-30-theme-2164307125-usd-trial-checkout-js-pre.js')
  ]
];

let failed = 0;

pairs.forEach(function(pair) {
  const actual = fs.readFileSync(pair[1]);
  const expected = fs.readFileSync(pair[2]);
  if (actual.equals(expected)) {
    console.log('PASS: ' + pair[0] + ' matches the verified production rollback preimage');
  } else {
    failed += 1;
    console.error('FAIL: ' + pair[0] + ' differs from the verified production rollback preimage');
  }
});

console.log('');
console.log('Summary: ' + (pairs.length - failed) + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
