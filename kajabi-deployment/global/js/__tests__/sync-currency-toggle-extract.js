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
const SIGNATURE = "<script>\n(function() {\n  'use strict';\n\n  const CONFIG = {";
const END_MARKER = '\n</script>';

function extractCurrencyBlock(bundle) {
  const start = bundle.indexOf(SIGNATURE);
  if (start === -1) {
    throw new Error('Currency toggle signature missing from site-header-page-scripts.html');
  }
  const nextStart = bundle.indexOf(SIGNATURE, start + SIGNATURE.length);
  if (nextStart !== -1) {
    throw new Error('Multiple currency toggle signatures found in site-header-page-scripts.html');
  }
  const end = bundle.indexOf(END_MARKER, start);
  if (end === -1) {
    throw new Error('Currency toggle end marker missing from site-header-page-scripts.html');
  }
  return bundle.slice(start, end + END_MARKER.length).replace(/\s+$/, '') + '\n';
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
