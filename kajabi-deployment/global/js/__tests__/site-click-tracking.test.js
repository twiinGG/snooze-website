#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(path.resolve(__dirname, '..', '..', 'html', 'site-header-page-scripts.html'), 'utf8');
const trackerStart = source.indexOf('const trackEvent =');
const trackerEnd = source.indexOf('faqItems.forEach', trackerStart);
const tracker = source.slice(trackerStart, trackerEnd);
let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) {
    passed += 1;
    console.log('PASS: ' + name);
  } else {
    failed += 1;
    console.error('FAIL: ' + name);
  }
}

assert('click helper emits through dataLayer', tracker.indexOf('window.dataLayer.push(payload)') > -1);
assert('click helper does not call gtag directly', tracker.indexOf("gtag('event'") === -1);
assert('click helper does not call fbq directly', tracker.indexOf("fbq('track'") === -1);
assert('membership CTA uses canonical event name', tracker.indexOf("'membership_cta_click'") > -1);
assert('membership CTA carries surface', tracker.indexOf('surface: eventSurface(link)') > -1);
assert('membership CTA carries placement', tracker.indexOf('placement: eventPlacement(link)') > -1);
assert('membership CTA carries button text', tracker.indexOf('button_text: buttonText') > -1);
assert('membership CTA carries active currency', tracker.indexOf('currency: activeCurrency()') > -1);
assert('membership page emits canonical view_item', tracker.indexOf("'view_item'") > -1);
assert('view_item carries item identity', tracker.indexOf("item_id: 'snooze_membership'") > -1 && tracker.indexOf("item_name: 'Snooze Membership'") > -1);
assert('view_item is guarded once per page load', tracker.indexOf('__snoozeMembershipViewItemFired') > -1);
assert('click helper does not assign a CTA value', !/\bvalue\s*:/.test(tracker));
assert('fake landing-page UTMs are removed', tracker.indexOf("utm_source', 'landing-page") === -1);
assert('first and current touch use separate storage keys', tracker.indexOf('snooze_attribution_first_touch') > -1 && tracker.indexOf('snooze_attribution_current_touch') > -1);
assert('attribution allowlist excludes PII keys', !/(email|phone|full_name|address|first_name|last_name)/.test(tracker.toLowerCase()));

const currencyStart = source.indexOf('window.setCurrency =');
const currencyEnd = source.indexOf('function updatePrices', currencyStart);
const currencyTracking = source.slice(currencyStart, currencyEnd);
assert('currency change only emits for explicit changes', currencyTracking.indexOf('save && previousCurrency && previousCurrency !== currency') > -1);
assert('currency change carries previous and current currency', currencyTracking.indexOf("'previous_currency': previousCurrency") > -1 && currencyTracking.indexOf("'currency': currency") > -1);
assert('currency change carries surface', currencyTracking.indexOf("'surface':") > -1 && currencyTracking.indexOf('pageWrapper') > -1);

// ME-007 August 14, 2026: the three header-script defects found while proving
// the funnel events on real traffic. Each assertion pins one fix.
assert('ME-007: currency change normalises surface to underscores', /replace\(\/-\/g,\s*'_'\)/.test(currencyTracking));
assert('ME-007: eventSurface normalises surface to underscores', tracker.indexOf('normaliseSurface') > -1 && /const normaliseSurface = value =>/.test(tracker));
// eventSurface has exactly three return paths: an explicit data-surface, the
// wrapper id, and the pathname fallback. All three must be normalised.
assert('ME-007: every surface return path is normalised', (tracker.match(/normaliseSurface\(/g) || []).length >= 3);
assert('ME-007: cta_click carries currency', /destination: destinationPath\(href\),\s*(\/\/[^\n]*\n\s*)*currency: activeCurrency\(\)/.test(tracker));
assert('ME-007: activeCurrency falls back to the rendered toggle', tracker.indexOf("[data-currency].is-active") > -1);
assert('ME-007: all three click events carry currency', (tracker.match(/currency: activeCurrency\(\)/g) || []).length >= 3);

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
