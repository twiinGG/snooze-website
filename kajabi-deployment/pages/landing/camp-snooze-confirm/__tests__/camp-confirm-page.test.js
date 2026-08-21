const fs = require('fs');
const path = require('path');
const vm = require('vm');

const base = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(base, 'camp-confirm-page.html'), 'utf8');
const css = fs.readFileSync(path.join(base, 'camp-confirm-page.css'), 'utf8');
const js = fs.readFileSync(path.join(base, 'camp-confirm-page.js'), 'utf8');

let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) {
    console.log(`PASS: ${name}`);
    passed += 1;
  } else {
    console.error(`FAIL: ${name}`);
    failed += 1;
  }
}

// --- Static checks on the shipped files ------------------------------------

assert('HTML uses the landing-page wrapper', html.includes('<div id="sn-cc-page">'));
assert('HTML contains no inline style block', !/<style[\s>]/i.test(html));
assert('HTML contains no inline script block', !/<script[\s>]/i.test(html));
assert('HTML ships the noscript fallback state', html.includes('id="sn-cc-confirm-noscript"'));
assert('HTML ships the signed-out signin state', html.includes('id="sn-cc-confirm-signin"'));
assert('HTML ships the signin held-place line', html.includes('id="sn-cc-signin-held"'));
assert('HTML has no email input (Kajabi cannot resolve email to a contact)', !html.includes('id="sn-cc-email"'));
assert('HTML keeps the support mailto address', html.includes('mailto:support@joinsnooze.com'));
assert('CSS is scoped to the landing-page wrapper', css.includes('#sn-cc-page'));
assert('CSS does not let a display rule defeat [hidden]', /\[hidden\]\s*\{[^}]*display:\s*none\s*!important/.test(css));
assert('CSS includes reduced-motion handling', css.includes('@media (prefers-reduced-motion: reduce)'));
assert('JS is syntactically loadable in a plain script context', typeof js === 'string' && js.length > 0);

// --- HTML id coverage: every id the JS looks up must exist exactly once ----
//
// This is the check that catches a rename breaking the page silently: if a
// state id or a form-field id in camp-confirm-page.js stops matching an id
// in the HTML, this test fails even though nothing throws at runtime.

const htmlIds = Array.from(html.matchAll(/\sid="([^"]+)"/g)).map((m) => m[1]);
const idCounts = htmlIds.reduce((acc, id) => {
  acc[id] = (acc[id] || 0) + 1;
  return acc;
}, {});
const duplicateIds = Object.keys(idCounts).filter((id) => idCounts[id] > 1);
assert('HTML has no duplicate ids', duplicateIds.length === 0);

// Literal `#sn-cc-...` and `getElementById('sn-cc-...')` references pulled
// straight out of the JS source, plus the dynamic `'#sn-cc-confirm-' +
// stateName` ids the `show()` helper builds from the state names it is
// actually called with.
const literalQuerySelectorIds = Array.from(js.matchAll(/querySelector\('#([^']+)'\)/g)).map((m) => m[1]);
const literalGetElementByIds = Array.from(js.matchAll(/getElementById\('([^']+)'\)/g)).map((m) => m[1]);
const dynamicStateNames = Array.from(js.matchAll(/show\(root, '([^']+)'\)/g)).map((m) => m[1]);
const dynamicStateIds = dynamicStateNames.map((name) => `sn-cc-confirm-${name}`);

const jsReferencedIds = Array.from(new Set([
  ...literalQuerySelectorIds,
  ...literalGetElementByIds,
  ...dynamicStateIds
]));

assert('JS source actually references some ids (sanity check on the regexes above)', jsReferencedIds.length > 5);

jsReferencedIds.forEach((id) => {
  assert(`HTML has exactly one #${id} (referenced by camp-confirm-page.js)`, idCounts[id] === 1);
});

// --- window.CampConfirm.pickDefault / resolveIdentity ----------------------
//
// The page exposes both on window.CampConfirm. Load the real file into a vm
// context with just enough of `document`/`window` stubbed that the bottom
// of the file (which calls `init` on load) no-ops, then exercise the pure
// functions directly.

function buildContext() {
  const window = {
    location: { search: '' }
  };
  const document = {
    readyState: 'complete',
    getElementById: () => null, // init(null) returns immediately
    querySelector: () => null,
    addEventListener: () => {}
  };
  window.document = document;

  const context = {
    window,
    document,
    console,
    URLSearchParams,
    Intl,
    Date,
    String,
    Object,
    Array,
    fetch: () => Promise.reject(new Error('not used by these tests'))
  };
  vm.createContext(context);
  vm.runInContext(js, context);
  return context;
}

const context = buildContext();
const CampConfirm = context.window.CampConfirm;

assert('window.CampConfirm.pickDefault is exposed', typeof CampConfirm.pickDefault === 'function');
assert('window.CampConfirm.resolveIdentity is exposed', typeof CampConfirm.resolveIdentity === 'function');

function cohort(number, state, startDate) {
  return { cohort_number: number, state, title: `Camp ${number}`, start_date: startDate, access_friday: startDate };
}

const cohorts = [
  cohort(10, 'open', '2026-09-01'),
  cohort(11, 'filling', '2026-09-15'),
  cohort(12, 'low', '2026-09-29'),
  cohort(13, 'full', '2026-08-25'),
  cohort(14, 'closed', '2026-08-11')
];

// pickDefault: soonest confirmable camp, in array order.
assert(
  'pickDefault returns the soonest confirmable camp with no requested cohort',
  CampConfirm.pickDefault(cohorts, null).cohort_number === 10
);

// pickDefault: skips a full/closed camp even when it is soonest.
const soonestIsFull = [
  cohort(20, 'full', '2026-08-22'),
  cohort(21, 'closed', '2026-08-23'),
  cohort(22, 'open', '2026-09-05')
];
assert(
  'pickDefault skips full and closed camps even when soonest',
  CampConfirm.pickDefault(soonestIsFull, null).cohort_number === 22
);

// pickDefault: honours a requested cohort when it is confirmable.
assert(
  'pickDefault honours a requested cohort that is confirmable',
  CampConfirm.pickDefault(cohorts, 12).cohort_number === 12
);
assert(
  'pickDefault honours a requested cohort passed as a string',
  CampConfirm.pickDefault(cohorts, '11').cohort_number === 11
);

// pickDefault: ignores a requested cohort that is full/closed, falls back
// to the soonest confirmable one.
assert(
  'pickDefault ignores a full requested cohort and falls back to soonest',
  CampConfirm.pickDefault(cohorts, 13).cohort_number === 10
);
assert(
  'pickDefault ignores a closed requested cohort and falls back to soonest',
  CampConfirm.pickDefault(cohorts, 14).cohort_number === 10
);
assert(
  'pickDefault ignores a requested cohort that does not exist and falls back to soonest',
  CampConfirm.pickDefault(cohorts, 999).cohort_number === 10
);

// pickDefault: null when nothing is confirmable.
const allClosed = [cohort(30, 'full', '2026-09-01'), cohort(31, 'closed', '2026-09-15')];
assert('pickDefault returns null when nothing is confirmable', CampConfirm.pickDefault(allClosed, null) === null);
assert('pickDefault returns null for an empty cohort list', CampConfirm.pickDefault([], null) === null);

// --- resolveIdentity: page override, then window.Kajabi.currentSiteUser, ---
// --- then a testing-only URL parameter, then give up -----------------------
//
// Order per the current camp-confirm-page.js: `window.SN_CAMP_CONTACT_ID`
// first, then `window.Kajabi.currentSiteUser` (only a `type === 'Member'`
// carries a usable `contactId`; any other `type` is still a real answer, not
// a failure), then `?contact_id=` / `?kajabi_contact_id=` for testing, then
// `unknown`. There is no email fallback: Kajabi's REST API cannot resolve an
// email to a contact, so this page never asks for one.

assert(
  'resolveIdentity: page override wins even when a Kajabi session and a URL param are also present',
  (() => {
    context.window.SN_CAMP_CONTACT_ID = '991';
    context.window.Kajabi = { currentSiteUser: { type: 'Member', contactId: 123 } };
    context.window.location.search = '?contact_id=482913';
    const result = CampConfirm.resolveIdentity();
    delete context.window.SN_CAMP_CONTACT_ID;
    delete context.window.Kajabi;
    context.window.location.search = '';
    return result.source === 'page_override' && result.contactId === '991';
  })()
);

assert(
  'resolveIdentity: a signed-in Member carries their contactId through',
  (() => {
    context.window.Kajabi = { currentSiteUser: { type: 'Member', contactId: 55123 } };
    const result = CampConfirm.resolveIdentity();
    delete context.window.Kajabi;
    return result.source === 'kajabi_site_user' && result.contactId === '55123';
  })()
);

assert(
  'resolveIdentity: a signed-out Guest is a real (non-member) answer, not a failure',
  (() => {
    context.window.Kajabi = { currentSiteUser: { type: 'Guest' } };
    const result = CampConfirm.resolveIdentity();
    delete context.window.Kajabi;
    return result.source === 'kajabi_site_user_guest' && result.contactId === null;
  })()
);

assert(
  'resolveIdentity: a Kajabi staff User is distinguished from a Member too',
  (() => {
    context.window.Kajabi = { currentSiteUser: { type: 'User' } };
    const result = CampConfirm.resolveIdentity();
    delete context.window.Kajabi;
    return result.source === 'kajabi_site_user_user' && result.contactId === null;
  })()
);

assert(
  'resolveIdentity: the testing-only URL parameter is used once no Kajabi session is present',
  (() => {
    context.window.location.search = '?contact_id=482913';
    const result = CampConfirm.resolveIdentity();
    context.window.location.search = '';
    return result.source === 'url_param' && result.contactId === '482913';
  })()
);

assert(
  'resolveIdentity: kajabi_contact_id is accepted as the same testing-only parameter',
  (() => {
    context.window.location.search = '?kajabi_contact_id=773100';
    const result = CampConfirm.resolveIdentity();
    context.window.location.search = '';
    return result.source === 'url_param' && result.contactId === '773100';
  })()
);

assert(
  'resolveIdentity: a URL parameter that is not a plausible contact id is ignored',
  (() => {
    context.window.location.search = '?contact_id=42';
    const result = CampConfirm.resolveIdentity();
    context.window.location.search = '';
    return result.source === 'unknown' && result.contactId === null;
  })()
);

assert(
  'resolveIdentity: gives up honestly (no session, no param) rather than asking for an email',
  (() => {
    const result = CampConfirm.resolveIdentity();
    return result.source === 'unknown' && result.contactId === null;
  })()
);

console.log(`\nSummary: ${passed} passed, ${failed} failed.`);
if (failed) process.exit(1);
