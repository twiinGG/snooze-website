#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const globalRoot = path.resolve(here, '..', '..');
const header = fs.readFileSync(path.join(globalRoot, 'html', 'site-header-page-scripts.html'), 'utf8');
const fouc = fs.readFileSync(path.join(globalRoot, 'html', 'currency-toggle-fouc.html'), 'utf8');
const themeJs = fs.readFileSync(path.join(globalRoot, 'js', 'theme-custom-code.js'), 'utf8');
const currencyExtract = fs.readFileSync(path.join(globalRoot, 'js', 'currency-toggle.js'), 'utf8');
const themeCss = fs.readFileSync(path.join(globalRoot, 'css', 'theme-custom-code.css'), 'utf8');
const currencyCss = fs.readFileSync(path.join(globalRoot, 'css', 'currency-toggle.css'), 'utf8');

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function stripCssComments(value) {
  return value.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
}

const checks = [
  ['Header Page Scripts embeds the exact currency JavaScript extract', header.includes(currencyExtract)],
  ['Header Page Scripts embeds the exact FOUC mirror once', count(header, fouc) === 1],
  ['Header Page Scripts contains one currency engine', count(header, 'window.setCurrency = function') === 1],
  ['Header Page Scripts initializes currency without an analytics event', header.includes('setCurrency(pref, false)')],
  ['Header Page Scripts preserves paid attribution on rewritten links', header.includes('preserveInboundAttribution')],
  ['Header Page Scripts owns the GTM and Stape loader', header.includes('GTM-KNRTH6P') && header.includes('load.ss.joinsnooze.com')],
  ['Website theme JavaScript is guarded for safe website-wide loading', themeJs.includes("document.getElementById('home-page')") && themeJs.includes('if (!wrapper) return')],
  ['Website theme JavaScript does not duplicate the shared header engine', !/(GTM-KNRTH6P|load\.ss\.joinsnooze\.com|window\.setCurrency|__snoozeCurrencyToggle__|\[data-checkout\])/.test(themeJs)],
  ['Website theme CSS includes the complete currency styles', stripCssComments(themeCss).includes(stripCssComments(currencyCss))],
  ['Website theme CSS has no known stale revert remnant', !/(REVERT INSTRUCTIONS|#ff0000|\.test-button)/.test(themeCss)]
];

let failures = 0;
for (const [name, condition] of checks) {
  if (condition) {
    console.log('PASS  ' + name);
  } else {
    failures += 1;
    console.error('FAIL  ' + name);
  }
}

assert.equal(failures, 0, failures + ' global code surface contract check(s) failed');
