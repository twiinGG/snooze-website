// Proves the display bands, including the boundaries and the singular case.
// Kade's rule, 2026-08-21: a precise number appears only when it is genuinely low. "15 of 15 places
// remaining" tells a visitor nobody has booked, and showing a capped number while more seats are free
// would be a false representation of availability.
import assert from 'node:assert/strict';

globalThis.window = {
  CAMP_CAPACITY_FEED_URL: 'http://127.0.0.1:1/stub',
  location: { href: 'https://www.joinsnooze.com/camp-snooze-sleep-coaching' },
  fetch: globalThis.fetch,
  dataLayer: [],
};
globalThis.document = {
  body: { classList: { contains: () => false, add: () => {}, remove: () => {} } },
  addEventListener: () => {},
  querySelectorAll: () => [],
  querySelector: () => null,
};

await import('../camp-snooze-v2-luxury.js');

async function render(state, remaining) {
  const root = { dataset: {}, innerHTML: '', querySelectorAll: () => [] };
  const payload = { cohorts: [{ cohort_number: 15, state, seats_remaining: remaining, start_date: '2026-08-31' }] };
  const result = await window.CampCapacityWidget.init(root, {
    feedUrl: 'http://127.0.0.1:1/stub',
    fetchImpl: async () => ({ ok: true, json: async () => payload }),
    timeoutMs: 100,
  });
  assert.equal(result, 'ready');
  return root.innerHTML;
}

// open: no capacity line at all, and never the old "15 of 15" phrasing.
for (const n of [15, 10]) {
  const html = await render('open', n);
  assert.doesNotMatch(html, /camp-capacity-places/, `open with ${n} left must render no places element`);
  assert.doesNotMatch(html, /of 15 places remaining/);
  assert.match(html, /Choose Camp #15/);
}

// filling: words only, no number anywhere in the capacity line.
for (const n of [9, 6]) {
  const html = await render('filling', n);
  assert.match(html, /Filling fast/);
  assert.doesNotMatch(html, /camp-capacity-places/, `filling with ${n} left must not print a count`);
  assert.match(html, /Choose Camp #15/);
}

// low: the real number, and still bookable.
const low5 = await render('low', 5);
assert.match(low5, /Only 5 places left/);
assert.match(low5, /Almost full/);
assert.match(low5, /Choose Camp #15/);

// low: singular reads correctly.
const low1 = await render('low', 1);
assert.match(low1, /1 place left/);
assert.doesNotMatch(low1, /1 places left/);

// low must never overstate scarcity: the number shown is the number given.
const low4 = await render('low', 4);
assert.match(low4, /Only 4 places left/);
assert.doesNotMatch(low4, /Only 5 places left/);

// full: taken, and routed to the waitlist path rather than a checkout.
const full = await render('full', 0);
assert.match(full, /All 15 places are taken/);
assert.match(full, /Join Camp #15 Waitlist/);
assert.doesNotMatch(full, /Choose Camp #15/);

console.log('CAPACITY BANDS PASSED: open prints nothing, filling has no number, low prints the true count and pluralises, full routes to the waitlist');
