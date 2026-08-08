#!/usr/bin/env node
/**
 * Keep currency-toggle.js in sync with the currency block inside
 * theme-custom-code.js (the single Kajabi Custom JavaScript paste).
 *
 * Usage:
 *   node apps/snooze-website/kajabi-deployment/global/js/__tests__/sync-currency-toggle-extract.js
 *   node .../sync-currency-toggle-extract.js --check   # exit 1 if drift
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUNDLE = path.join(ROOT, 'theme-custom-code.js');
const EXTRACT = path.join(ROOT, 'currency-toggle.js');
const MARKER = '<!-- ===== SNOOZE CURRENCY TOGGLE';
const HOME_MARKER = '<!-- ===== THEME HOME HELPERS';

function extractCurrencyBlock(bundle) {
  const start = bundle.indexOf(MARKER);
  if (start === -1) {
    throw new Error('Currency toggle marker missing from theme-custom-code.js');
  }
  let rest = bundle.slice(bundle.indexOf('\n', start) + 1);
  const home = rest.indexOf(HOME_MARKER);
  if (home !== -1) rest = rest.slice(0, home);
  return rest.replace(/\s+$/, '') + '\n';
}

const checkOnly = process.argv.includes('--check');
const bundle = fs.readFileSync(BUNDLE, 'utf8');
const next = extractCurrencyBlock(bundle);

if (checkOnly) {
  const current = fs.existsSync(EXTRACT) ? fs.readFileSync(EXTRACT, 'utf8') : '';
  if (current !== next) {
    console.error('FAIL  currency-toggle.js is out of sync with theme-custom-code.js');
    console.error('      Run: node apps/snooze-website/kajabi-deployment/global/js/__tests__/sync-currency-toggle-extract.js');
    process.exit(1);
  }
  console.log('PASS  currency-toggle.js matches theme-custom-code.js currency block');
  process.exit(0);
}

fs.writeFileSync(EXTRACT, next);
console.log('Wrote currency-toggle.js (' + next.length + ' bytes) from theme-custom-code.js');
