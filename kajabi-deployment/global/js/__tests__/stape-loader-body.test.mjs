#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const globalRoot = path.resolve(here, '..', '..');
const sources = [
  ['site header', path.join(globalRoot, 'html', 'site-header-page-scripts.html')],
  ['checkout header', path.join(globalRoot, 'html', 'checkout-header-tracking.html')],
];

const siteSource = fs.readFileSync(sources[0][1], 'utf8');
const fastStart = siteSource.indexOf("console.log('Snooze: Fast Page Detected - Delaying Tracking')");
const commerceStart = siteSource.indexOf("console.log('Snooze: Commerce Page - Loading Full Tracking')");
assert.notEqual(fastStart, -1, 'fast-page branch is present');
assert.ok(commerceStart > fastStart, 'commerce branch follows the fast-page branch');
const fastBranch = siteSource.slice(fastStart, commerceStart);
assert.match(fastBranch, /setTimeout\(function\(\) \{[\s\S]*load\.ss\.joinsnooze\.com[\s\S]*\}, 1500\)/,
  'fast-page Stape loader retains its existing 1500ms delay');
assert.ok(!fastBranch.includes('loadSnoozeTrackingContainer'),
  'body-ready correction does not rewrite the fast-page loader path');

function guardedLoader(source) {
  const start = source.indexOf('function loadSnoozeTrackingContainer()');
  assert.notEqual(start, -1, 'named loader is present');
  const listener = source.indexOf("{ once: true });", start);
  assert.notEqual(listener, -1, 'one-shot DOMContentLoaded listener is present');
  const end = source.indexOf('}', listener + '{ once: true });'.length);
  assert.notEqual(end, -1, 'loader guard closes');
  return source.slice(start, end + 1);
}

function harness(bodyAtEvaluation) {
  const listeners = new Map();
  const inserted = [];
  const document = {
    body: bodyAtEvaluation ? {} : null,
    cookie: '',
    querySelector: () => null,
    createElement: () => ({}),
    getElementsByTagName: () => [{
      parentNode: {
        insertBefore(node) {
          inserted.push(node.src);
        },
      },
    }],
    addEventListener(name, callback, options) {
      listeners.set(name, { callback, options });
    },
  };
  return { document, inserted, listeners };
}

for (const [name, file] of sources) {
  const source = fs.readFileSync(file, 'utf8');
  const block = guardedLoader(source);
  const execute = new Function('window', 'document', 'localStorage', 'navigator', block);
  const storage = { getItem: () => null };
  const navigator = { userAgent: 'Mozilla/5.0 Chrome/140.0' };

  const early = harness(false);
  execute({}, early.document, storage, navigator);
  assert.equal(early.inserted.length, 0, `${name} does not request Stape while body is null`);
  assert.equal(early.listeners.get('DOMContentLoaded')?.options?.once, true,
    `${name} registers a one-shot body-ready callback`);
  early.document.body = {};
  early.listeners.get('DOMContentLoaded').callback();
  assert.equal(early.inserted.length, 1, `${name} requests Stape after body exists`);
  assert.match(early.inserted[0], /^https:\/\/load\.ss\.joinsnooze\.com\//,
    `${name} retains the canonical Stape loader`);

  const ready = harness(true);
  execute({}, ready.document, storage, navigator);
  assert.equal(ready.inserted.length, 1, `${name} loads once when body already exists`);
  assert.equal(ready.listeners.size, 0, `${name} does not add a redundant listener when body exists`);
}

console.log('PASS  Stape loaders wait for document.body and execute exactly once');
