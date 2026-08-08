#!/usr/bin/env node
/**
 * Regression: [data-checkout] must not clobber real /offers/<slug> hrefs.
 *
 * Live bug 2026-07-27: theme-custom-code.js (Kajabi Custom JavaScript)
 * overwritten every [data-checkout] link with SNOOZE_CHECKOUT_URL
 * (membership), so 1:1 Consult book CTAs opened membership checkout.
 * Fix: only fill placeholder hrefs. Deploy via theme-custom-code.js paste.
 *
 * Usage:
 *   node apps/snooze-website/kajabi-deployment/global/js/__tests__/data-checkout-normalize.test.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const MEMBER = 'https://joinsnooze.com/offers/z63s9VaR/checkout';
const FALLBACK = '#pricing';

function resolveDataCheckoutHref(currentHref, globalCheckoutUrl, fallbackUrl) {
  const offerUrlRe = /\/offers\/[a-zA-Z0-9]{6,12}/;
  const isPlaceholderHref = (href) => {
    if (!href) return true;
    const trimmed = String(href).trim();
    if (!trimmed || trimmed === '#' || trimmed === '#pricing') return true;
    if (trimmed.startsWith('javascript:')) return true;
    return false;
  };
  const keepOfferUrl = offerUrlRe.test(currentHref || '');
  if (keepOfferUrl) return currentHref;
  if (isPlaceholderHref(currentHref)) return globalCheckoutUrl || fallbackUrl;
  return currentHref;
}

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    passed += 1;
    console.log('PASS  ' + msg);
  } else {
    failed += 1;
    console.log('FAIL  ' + msg);
  }
}

assert(
  resolveDataCheckoutHref('https://joinsnooze.com/offers/4zHPSRCs/checkout', MEMBER, FALLBACK) ===
    'https://joinsnooze.com/offers/4zHPSRCs/checkout',
  'Signature Consult checkout href is preserved'
);
assert(
  resolveDataCheckoutHref('https://joinsnooze.com/offers/jRxWAnVo/checkout', MEMBER, FALLBACK) ===
    'https://joinsnooze.com/offers/jRxWAnVo/checkout',
  'Follow-Up Consult checkout href is preserved'
);
assert(
  resolveDataCheckoutHref('https://joinsnooze.com/offers/mwiSia6A/checkout', MEMBER, FALLBACK) ===
    'https://joinsnooze.com/offers/mwiSia6A/checkout',
  '2-Week Package checkout href is preserved'
);
assert(
  resolveDataCheckoutHref('https://joinsnooze.com/offers/W2PyqL2X/checkout', MEMBER, FALLBACK) ===
    'https://joinsnooze.com/offers/W2PyqL2X/checkout',
  'Course purchase checkout href is preserved'
);
assert(
  resolveDataCheckoutHref('https://joinsnooze.com/offers/K3Y6FEKX/checkout', MEMBER, FALLBACK) ===
    'https://joinsnooze.com/offers/K3Y6FEKX/checkout',
  'Camp Snooze checkout href is preserved'
);
assert(
  resolveDataCheckoutHref('#pricing', MEMBER, FALLBACK) === MEMBER,
  'Home #pricing placeholder fills membership checkout'
);
assert(
  resolveDataCheckoutHref('#', MEMBER, FALLBACK) === MEMBER,
  'Bare # placeholder fills membership checkout'
);
assert(
  resolveDataCheckoutHref('', MEMBER, FALLBACK) === MEMBER,
  'Empty href fills membership checkout'
);
assert(
  resolveDataCheckoutHref(MEMBER, MEMBER, FALLBACK) === MEMBER,
  'Existing membership offer href is left alone'
);

const globalsPath = path.resolve(__dirname, '..', 'theme-custom-code.js');
const globalsSrc = fs.readFileSync(globalsPath, 'utf8');
assert(
  globalsSrc.indexOf('keepOfferUrl') !== -1 && globalsSrc.indexOf('isPlaceholderHref') !== -1,
  'theme-custom-code.js contains offer-preserving normalize guard'
);
assert(
  !/targets\.forEach\(\(el\) => \{\s*const href = globalCheckoutUrl/.test(globalsSrc),
  'theme-custom-code.js no longer blindly overwrites every [data-checkout] href'
);
assert(
  globalsSrc.indexOf('SNOOZE CURRENCY TOGGLE') !== -1 &&
    globalsSrc.indexOf('__snoozeCurrencyToggle__') !== -1,
  'theme-custom-code.js bundles currency-toggle (single paste file)'
);

console.log('');
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
