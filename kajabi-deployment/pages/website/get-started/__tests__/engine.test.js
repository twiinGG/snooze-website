#!/usr/bin/env node
/**
 * get-started-engine.js unit tests (GS-001 BUILD-SPEC "Tests" section).
 *
 * Plain Node plus `vm`, matching global/js/__tests__/currency-toggle.test.js.
 * The engine source is a Kajabi paste block wrapped in <script>...</script>
 * tags; we strip those, sandbox a minimal window/document/localStorage, run
 * the IIFE and reach in via window.__snoozeGetStarted__ (the pure-function
 * surface the BUILD-SPEC requires for testability).
 *
 * Usage:
 *   node apps/snooze-website/kajabi-deployment/pages/website/get-started/__tests__/engine.test.js
 *
 * Exits 0 on PASS, 1 on FAIL.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const GS_DIR = path.resolve(__dirname, '..');
const ENGINE_PATH = path.join(GS_DIR, 'src', 'get-started-engine.js');
const FLOW = JSON.parse(fs.readFileSync(path.join(GS_DIR, 'data', 'flow.json'), 'utf8'));
const COPY = JSON.parse(fs.readFileSync(path.join(GS_DIR, 'data', 'copy.json'), 'utf8'));
const START_HERE = JSON.parse(fs.readFileSync(path.join(GS_DIR, 'data', 'start-here-map.json'), 'utf8'));
const OFFERS = JSON.parse(fs.readFileSync(path.join(GS_DIR, 'data', 'offers.json'), 'utf8'));
const PATHS = JSON.parse(fs.readFileSync(path.join(GS_DIR, '__tests__', 'fixtures', 'paths.json'), 'utf8'));

function makeStorage(throwing) {
  const store = {};
  return {
    getItem: function (key) {
      if (throwing) throw new Error('storage blocked');
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem: function (key, value) {
      if (throwing) throw new Error('storage blocked');
      store[key] = String(value);
    },
    removeItem: function (key) {
      delete store[key];
    },
    _store: store
  };
}

function loadEngine(options) {
  const opts = options || {};
  let source = fs.readFileSync(ENGINE_PATH, 'utf8');
  source = source.replace(/^\s*<script>\s*$/m, '');
  source = source.replace(/^\s*<\/script>\s*$/m, '');

  const noop = function () {};
  const fakeElement = {
    classList: { add: noop, remove: noop, contains: () => false },
    appendChild: noop,
    addEventListener: noop,
    setAttribute: noop,
    getAttribute: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    style: {},
    innerHTML: '',
    textContent: ''
  };
  const fakeDoc = {
    readyState: 'complete',
    body: fakeElement,
    addEventListener: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => Object.assign({}, fakeElement),
    getElementById: function () { return opts.root || null; },
    activeElement: fakeElement,
    contains: () => false
  };

  const sandbox = {
    window: {},
    document: fakeDoc,
    console: console,
    localStorage: opts.localStorage || makeStorage(false),
    Intl: Intl,
    URL: URL,
    URLSearchParams: URLSearchParams,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    navigator: { language: 'en-US', sendBeacon: function () { return true; } },
    Blob: function () {},
    MutationObserver: function () {
      this.observe = noop;
      this.disconnect = noop;
    }
  };
  sandbox.window.document = sandbox.document;
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.location = { href: 'https://www.joinsnooze.com/get-started', search: opts.search || '', pathname: '/get-started' };
  sandbox.window.SNOOZE_GS_DATA = { flow: FLOW, copy: COPY, startHere: START_HERE, offers: OFFERS, config: opts.config || { enabled: true, kajabi_form_id: '{{KAJABI_FORM_ID}}', form_field_names: {}, n8n_webhook_url: '' } };
  sandbox.window.dataLayer = [];

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'get-started-engine.js' });

  if (!sandbox.window.__snoozeGetStarted__) {
    throw new Error('get-started-engine.js did not expose window.__snoozeGetStarted__');
  }
  return sandbox;
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

const sandbox = loadEngine({});
const api = sandbox.window.__snoozeGetStarted__;

(function everyPathReachesPlan() {
  let allReach = true;
  let failingPath = null;
  PATHS.forEach(function (p) {
    let currentId = 'welcome';
    let answers = Object.assign({}, p.answers);
    let guard = 0;
    while (currentId !== 'plan' && guard < 30) {
      const resolved = api.nextScreen(FLOW, answers, currentId);
      answers = resolved.answers;
      if (!resolved.screen) { currentId = null; break; }
      currentId = resolved.screen.id;
      guard += 1;
    }
    if (currentId !== 'plan') {
      allReach = false;
      failingPath = p.id;
    }
  });
  assert('every path in the path matrix reaches the plan screen', allReach, 'first failure: ' + failingPath);
})();

(function showIfAndDefaultIfHidden() {
  const singleAgeAnswers = { age: ['newborn'], struggles: ['night_wakes'] };
  const topOfMindScreen = FLOW.screens.find((s) => s.id === 'top_of_mind');
  assert('top_of_mind is hidden when only one age is chosen', !api.isScreenVisible(topOfMindScreen, singleAgeAnswers));

  const multiAgeAnswers = { age: ['newborn', 'm3_4'] };
  assert('top_of_mind is shown when two ages are chosen', api.isScreenVisible(topOfMindScreen, multiAgeAnswers));

  const primaryScreen = FLOW.screens.find((s) => s.id === 'primary_struggle');
  const singleStruggleAnswers = { struggles: ['night_wakes'] };
  const afterDefault = api.applyDefaultIfHidden(primaryScreen, singleStruggleAnswers);
  assert(
    'default_if_hidden fills primary_struggle from the first struggle when hidden',
    afterDefault.primary_struggle === 'night_wakes',
    JSON.stringify(afterDefault)
  );

  const multiStruggleAnswers = { struggles: ['night_wakes', 'short_naps'] };
  assert('primary_struggle is shown when two+ struggles are chosen', api.isScreenVisible(primaryScreen, multiStruggleAnswers));
})();

(function noneIsExclusive() {
  const safetyScreen = FLOW.screens.find((s) => s.id === 'safety');
  let selected = api.toggleMultiAnswer(safetyScreen, [], 'feeding_weight');
  selected = api.toggleMultiAnswer(safetyScreen, selected, 'health');
  assert('two red flags can be selected together', selected.length === 2, JSON.stringify(selected));

  selected = api.toggleMultiAnswer(safetyScreen, selected, 'none');
  assert('choosing none clears every other selection', selected.length === 1 && selected[0] === 'none', JSON.stringify(selected));

  selected = api.toggleMultiAnswer(safetyScreen, selected, 'health');
  assert('choosing another option after none clears none', selected.indexOf('none') === -1 && selected.indexOf('health') !== -1, JSON.stringify(selected));
})();

(function resumeFromStorageAndToken() {
  const answers = { age: ['m5_8'], struggles: ['night_wakes'], outcome: 'sleep_tonight', help_style: 'quick_answers', safety: ['none'] };
  const token = api.encodeResumeToken(answers);
  const decoded = api.decodeResumeToken(token);
  assert('resume token round-trips answers', JSON.stringify(decoded) === JSON.stringify(answers), JSON.stringify(decoded));

  const junkDecoded = api.decodeResumeToken('not-a-real-token!!!');
  assert('a malformed resume token decodes to null rather than throwing', junkDecoded === null);

  const storage = makeStorage(false);
  const state = { v: 1, step: 'outcome', answers: { age: ['newborn'] }, started_at: 'x', updated_at: 'x', email_captured: false, completed: false };
  const savedOk = (function () {
    const s2 = loadEngine({ localStorage: storage });
    return s2.window.__snoozeGetStarted__.safeSaveState(FLOW.storage_key, state);
  })();
  assert('safeSaveState reports success against a working storage', savedOk === true);
})();

(function storageThrowingStillWorks() {
  const throwingStorage = makeStorage(true);
  const s2 = loadEngine({ localStorage: throwingStorage });
  const api2 = s2.window.__snoozeGetStarted__;
  let threw = false;
  let result;
  try {
    result = api2.safeLoadState(FLOW.storage_key);
  } catch (e) {
    threw = true;
  }
  assert('safeLoadState never throws even when storage throws', !threw && result === null);

  let saveThrew = false;
  let saveResult;
  try {
    saveResult = api2.safeSaveState(FLOW.storage_key, { v: 1 });
  } catch (e) {
    saveThrew = true;
  }
  assert('safeSaveState never throws even when storage throws', !saveThrew && saveResult === false);
})();

(function safetyRouteSuppressesRightNowAndHighlightsConsult() {
  const answers = {
    age: ['newborn'],
    struggles: ['night_wakes'],
    primary_struggle: 'night_wakes',
    outcome: 'sleep_tonight',
    help_style: 'quick_answers',
    safety: ['health']
  };
  const model = api.buildPlanModel(FLOW, COPY, START_HERE, OFFERS, answers, 'usd', {});
  assert('safety route is detected when a red flag is chosen', model.is_safety_route === true);
  assert('safety route suppresses the right_now section', model.right_now === null, JSON.stringify(model.right_now));
  assert('safety route highlights the consult card', model.highlight === 'consult');
  const consultCard = model.cards.find((c) => c.key === 'consult');
  assert('the consult card is expanded on the safety route', consultCard.expanded === true);
  assert('snooze position is secondary on the safety route', model.snooze_position === 'secondary');
})();

(function helpStyleHighlightTableHolds() {
  const table = FLOW.plan_layout.highlight_by_help_style;
  Object.keys(table).forEach(function (helpStyle) {
    const answers = {
      age: ['newborn'],
      struggles: ['night_wakes'],
      primary_struggle: 'night_wakes',
      outcome: 'sleep_tonight',
      help_style: helpStyle,
      safety: ['none']
    };
    const highlight = api.highlightForAnswers(FLOW, answers);
    assert(
      'highlight for help_style "' + helpStyle + '" matches flow.plan_layout',
      highlight === table[helpStyle],
      'expected ' + table[helpStyle] + ' got ' + highlight
    );
  });
})();

(function noEventPayloadContainsAt() {
  assert('a plain string with @ is flagged', api.payloadHasEmailLike('kade@sleepconcierge.com.au') === true);
  assert('a nested object with an email is flagged', api.payloadHasEmailLike({ answers: { email: 'a@b.com' } }) === true);
  assert('a normal option-id payload is not flagged', api.payloadHasEmailLike({ step_id: 'age', step_index: 1 }) === false);

  PATHS.forEach(function (p) {
    const model = api.buildPlanModel(FLOW, COPY, START_HERE, OFFERS, p.answers, 'usd', {});
    assert(
      'plan_viewed payload for ' + p.id + ' never contains "@"',
      api.payloadHasEmailLike(model.plan_viewed_payload) === false
    );
  });
})();

(function appendQueryParamsIsPure() {
  const url = api.appendQueryParams('https://www.joinsnooze.com/offers/2150754998/checkout?variant=68112', { utm_source: 'meta', empty: '' });
  assert('appendQueryParams appends non-empty params and skips empty ones', url.indexOf('utm_source=meta') !== -1 && url.indexOf('empty=') === -1, url);

  const unchanged = api.appendQueryParams('https://example.com/', {});
  assert('appendQueryParams leaves the url unchanged when there are no params', unchanged === 'https://example.com/');
})();

(function optionsForScreenResolvesGroupsAndSources() {
  const struggleScreen = FLOW.screens.find((s) => s.id === 'struggles');
  const toddlerAnswers = { age: ['m12_24'] };
  const options = api.optionsForScreen(struggleScreen, FLOW, toddlerAnswers);
  assert(
    'options_by_group resolves to the toddler group for a toddler age',
    JSON.stringify(options) === JSON.stringify(FLOW.screens.find((s) => s.id === 'struggles').options_by_group.toddler)
  );

  const primaryScreen = FLOW.screens.find((s) => s.id === 'primary_struggle');
  const struggledAnswers = { struggles: ['night_wakes', 'bedtime_battles'] };
  const primaryOptions = api.optionsForScreen(primaryScreen, FLOW, struggledAnswers);
  assert('options_from resolves to the referenced screen\'s chosen answers', JSON.stringify(primaryOptions) === JSON.stringify(struggledAnswers.struggles));
})();

console.log('');
console.log('Summary: ' + passed + ' passed, ' + failed + ' failed.');
process.exit(failed === 0 ? 0 : 1);
