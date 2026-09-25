#!/usr/bin/env node
/**
 * get-started-state.js unit tests (GS-001 BUILD-SPEC "Tests" section).
 *
 * Plain Node plus `vm`, matching global/js/__tests__/currency-toggle.test.js.
 * Covers the three CTA states, the fallbacks, and the kill switch.
 *
 * Usage:
 *   node apps/snooze-website/kajabi-deployment/pages/website/get-started/__tests__/state.test.js
 *
 * Exits 0 on PASS, 1 on FAIL.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const GS_DIR = path.resolve(__dirname, '..');
const STATE_PATH = path.join(GS_DIR, 'src', 'get-started-state.js');

function loadState(options) {
  const opts = options || {};
  let source = fs.readFileSync(STATE_PATH, 'utf8');
  source = source.replace(/^\s*<script>\s*$/m, '');
  source = source.replace(/^\s*<\/script>\s*$/m, '');

  const noop = function () {};
  const ctas = opts.ctas || [];

  function makeFakeCta(initial) {
    const attrs = Object.assign({}, initial);
    return {
      getAttribute: function (k) { return Object.prototype.hasOwnProperty.call(attrs, k) ? attrs[k] : null; },
      setAttribute: function (k, v) { attrs[k] = String(v); },
      _attrs: attrs,
      get textContent() { return attrs.__text || ''; },
      set textContent(v) { attrs.__text = v; }
    };
  }

  const ctaElements = ctas.map(makeFakeCta);

  const bodyChildren = [];
  const fakeBody = {
    appendChild: function (child) { bodyChildren.push(child); },
    _children: bodyChildren
  };

  const fakeDoc = {
    readyState: 'complete',
    body: fakeBody,
    addEventListener: noop,
    getElementById: function (id) { return id === 'sgs-welcome-bar' ? null : null; },
    querySelectorAll: function (sel) {
      if (sel === '[data-get-started-cta]') return ctaElements;
      return [];
    },
    createElement: function () {
      return {
        style: {},
        appendChild: noop,
        addEventListener: noop,
        setAttribute: noop,
        getAttribute: () => null
      };
    }
  };

  const sandbox = {
    window: {},
    document: fakeDoc,
    console: console,
    localStorage: opts.localStorage || { getItem: () => null, setItem: noop, removeItem: noop },
    sessionStorage: opts.sessionStorage || { getItem: () => null, setItem: noop, removeItem: noop },
    setTimeout: setTimeout,
    clearTimeout: clearTimeout
  };
  sandbox.window.document = sandbox.document;
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.sessionStorage = sandbox.sessionStorage;
  sandbox.window.location = { pathname: opts.pathname || '/', search: '' };
  sandbox.window.SNOOZE_GET_STARTED_ENABLED = opts.enabled;

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'get-started-state.js' });

  if (!sandbox.window.__snoozeGetStartedState__) {
    throw new Error('get-started-state.js did not expose window.__snoozeGetStartedState__');
  }
  return { sandbox: sandbox, ctas: ctaElements, body: fakeBody };
}

let passed = 0;
let failed = 0;

function assert(name, condition, detail) {
  if (condition) {
    passed += 1;
    console.log('PASS  ' + name);
  } else {
    failed += 1;
    console.log('FAIL  ' + name + (detail ? ': ' + detail : ''));
  }
}

(function ctaThreeStates() {
  const { sandbox } = loadState({});
  const api = sandbox.window.__snoozeGetStartedState__;

  assert('no state gives "start" status', api.ctaStatus(null, true) === 'start');

  const inProgress = { step: 'outcome', answers: { age: ['newborn'] }, email_captured: false, completed: false };
  assert('a stored in-progress state gives "in_progress" status', api.ctaStatus(inProgress, true) === 'in_progress');

  const emailCaptured = { step: 'plan', answers: {}, email_captured: true, completed: false };
  assert('email_captured gives "see_plan" status', api.ctaStatus(emailCaptured, true) === 'see_plan');

  const completed = { step: 'plan', answers: {}, email_captured: false, completed: true };
  assert('completed gives "see_plan" status', api.ctaStatus(completed, true) === 'see_plan');
})();

(function labelsAndDefaults() {
  const { sandbox, ctas } = loadState({ ctas: [{ href: '/old-href' }] });
  const api = sandbox.window.__snoozeGetStartedState__;
  const el = ctas[0];
  el.textContent = 'Original label';

  api.applyCta(el, null, true, null);
  assert('applyCta stores the original label as data-fallback-label', el.getAttribute('data-fallback-label') === 'Original label');
  assert('applyCta stores the original href as data-fallback-href', el.getAttribute('data-fallback-href') === '/old-href');
  assert('applyCta uses the built-in default label for "start"', el.textContent === 'Get started');
  assert('applyCta points the href at /get-started', el.getAttribute('href') === '/get-started');

  el.setAttribute('data-label-start', 'Take the quiz');
  api.applyCta(el, null, true, null);
  assert('a custom data-label-start attribute overrides the built-in default', el.textContent === 'Take the quiz');

  const copy = { state: { continue: 'Keep going', see_plan: 'View plan' } };
  api.applyCta(el, { step: 'outcome', answers: {} }, true, copy);
  assert('copy.json state labels are used when present', el.textContent === 'Keep going');
})();

(function killSwitchRestoresFallback() {
  const { sandbox, ctas } = loadState({ ctas: [{ href: '/original' }] });
  const api = sandbox.window.__snoozeGetStartedState__;
  const el = ctas[0];
  el.textContent = 'Original label';

  api.applyCta(el, { step: 'outcome', answers: {} }, false, null);
  assert('kill switch restores the fallback label', el.textContent === 'Original label');
  assert('kill switch restores the fallback href', el.getAttribute('href') === '/original');
})();

(function welcomeBarVisibility() {
  const { sandbox } = loadState({ pathname: '/' });
  const api = sandbox.window.__snoozeGetStartedState__;

  assert('welcome bar hidden with no state', api.shouldShowWelcomeBar(null, true, '/') === false);
  assert('welcome bar hidden on the get-started page itself', api.shouldShowWelcomeBar({ step: 'outcome' }, true, '/get-started') === false);
  assert('welcome bar shown elsewhere when in progress', api.shouldShowWelcomeBar({ step: 'outcome' }, true, '/') === true);
  assert('welcome bar shown elsewhere when completed', api.shouldShowWelcomeBar({ completed: true }, true, '/') === true);
  assert('welcome bar hidden when the kill switch is on', api.shouldShowWelcomeBar({ step: 'outcome' }, false, '/') === false);
})();

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
