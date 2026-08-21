// Proves a full or closed cohort's CTA sends a family somewhere that exists on the page it renders on.
// The waitlist variant hosts the form, so it keeps the on-page anchor. The primary page has no such
// section, so it must point at the parked waitlist page instead of a dead anchor.
//
// Single import on purpose. This file is CommonJS, and Node keys the require cache by resolved filename
// and ignores a ?query, so importing it twice with different query strings does NOT re-evaluate it. The
// target is therefore read at render time, which this test depends on and also verifies.
import assert from 'node:assert/strict';

const full = (n) => ({ cohorts: [{ cohort_number: n, state: 'full', seats_remaining: 0, start_date: '2026-08-31' }] });
const open = (n) => ({ cohorts: [{ cohort_number: n, state: 'open', seats_remaining: 15, start_date: '2026-08-31' }] });

globalThis.window = {
  CAMP_CAPACITY_FEED_URL: 'http://127.0.0.1:1/stub',
  location: { href: 'https://www.joinsnooze.com/camp-snooze-sleep-coaching' },
  fetch: globalThis.fetch,
  dataLayer: []
};
globalThis.document = {
  body: { classList: { contains: () => false, add: () => {}, remove: () => {} } },
  addEventListener: () => {},
  querySelectorAll: () => [],
  querySelector: () => null
};

await import('../camp-snooze-v2-luxury.js');

async function render(payload) {
  const root = { dataset: {}, innerHTML: '', querySelectorAll: () => [] };
  const result = await window.CampCapacityWidget.init(root, {
    feedUrl: 'http://127.0.0.1:1/stub',
    fetchImpl: async () => ({ ok: true, json: async () => payload }),
    timeoutMs: 100
  });
  assert.equal(result, 'ready');
  return root.innerHTML;
}

// 1. Waitlist variant: no override, and the section IS on the page, so the anchor is kept.
delete window.CAMP_WAITLIST_TARGET;
document.querySelector = (sel) => (sel === '#waitlist-section' ? {} : null);
const onPage = await render(full(15));
assert.match(onPage, /href="#waitlist-section"/);
assert.match(onPage, /Join Camp #15 Waitlist/);

// 1b. Selling variant: no override AND no waitlist section on the page. The CTA must never emit the
// dead anchor; it falls back to email, a destination that always resolves.
document.querySelector = () => null;
const noSection = await render(full(15));
assert.doesNotMatch(noSection, /href="#waitlist-section"/);
assert.match(noSection, /href="mailto:camp@joinsnooze\.com/);

// 2. Primary page: override set, so the CTA leaves for the parked waitlist page.
const PARKED = 'https://www.joinsnooze.com/camp-snooze-sleep-coaching-WAITLIST';
window.CAMP_WAITLIST_TARGET = PARKED;
const offPage = await render(full(15));
assert.match(offPage, new RegExp('href="' + PARKED.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"'));
assert.doesNotMatch(offPage, /href="#waitlist-section"/);

// 3. Set after load, which is the Kajabi paste-order case the render-time lookup exists for.
// The section is present here, so with no override the anchor is used; setting the override then wins.
document.querySelector = (sel) => (sel === '#waitlist-section' ? {} : null);
delete window.CAMP_WAITLIST_TARGET;
assert.match(await render(full(15)), /href="#waitlist-section"/);
window.CAMP_WAITLIST_TARGET = PARKED;
assert.doesNotMatch(await render(full(15)), /href="#waitlist-section"/);

// 4. The override must never touch an OPEN cohort, which still goes straight to checkout.
const openHtml = await render(open(15));
assert.match(openHtml, /Choose Camp #15/);
assert.match(openHtml, /offers\/(K3Y6FEKX|46Bz9tk6)/);
assert.doesNotMatch(openHtml, /Waitlist/);
// Deliberately asserts the ABSENCE of a count now. This line used to assert
// "15 of 15 places remaining", which is the anti-social-proof string the display bands removed.
assert.doesNotMatch(openHtml, /places remaining/);
assert.doesNotMatch(openHtml, /camp-capacity-places/);

console.log('WAITLIST TARGET PASSED: anchor kept without the override, parked page URL with it, honoured when set after load, open cohorts still go to checkout');
