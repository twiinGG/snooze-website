#!/usr/bin/env node
/**
 * Keep currency-toggle.js in sync with the currency block inside the
 * site-wide Header Page Scripts paste file.
 *
 * Usage:
 *   node apps/snooze-website/kajabi-deployment/global/js/__tests__/sync-currency-toggle-extract.js
 *   node .../sync-currency-toggle-extract.js --check   # exit 1 if drift
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUNDLE = path.join(ROOT, '..', 'html', 'site-header-page-scripts.html');
const EXTRACT = path.join(ROOT, 'currency-toggle.js');
const MARKER = '<!-- ===== Snooze Currency Toggle Engine';
const END_MARKER = '<!-- ===== Currency FOUC prevention';

function extractCurrencyBlock(bundle) {
  const start = bundle.indexOf(MARKER);
  if (start === -1) {
    throw new Error('Currency toggle marker missing from site-header-page-scripts.html');
  }
  let rest = bundle.slice(bundle.indexOf('\n', start) + 1);
  const end = rest.indexOf(END_MARKER);
  if (end === -1) {
    throw new Error('Currency toggle end marker missing from site-header-page-scripts.html');
  }
  rest = rest.slice(0, end);
  return rest.replace(/\s+$/, '') + '\n';
}

const checkOnly = process.argv.includes('--check');
const bundle = fs.readFileSync(BUNDLE, 'utf8');
const next = extractCurrencyBlock(bundle);

if (checkOnly) {
  const current = fs.existsSync(EXTRACT) ? fs.readFileSync(EXTRACT, 'utf8') : '';
  if (current !== next) {
    console.error('FAIL  currency-toggle.js is out of sync with site-header-page-scripts.html');
    console.error('      Run: node apps/snooze-website/kajabi-deployment/global/js/__tests__/sync-currency-toggle-extract.js');
    process.exit(1);
  }
  console.log('PASS  currency-toggle.js matches site-header-page-scripts.html currency block');
  process.exit(0);
}

fs.writeFileSync(EXTRACT, next);
console.log('Wrote currency-toggle.js (' + next.length + ' bytes) from site-header-page-scripts.html');
