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
let dynamicCheckoutLinks = [];
globalThis.document = {
  body: { classList: { contains: () => false, add: () => {}, remove: () => {} } },
  addEventListener: () => {},
  querySelectorAll: (selector) => selector === '.dynamic-cta, [data-checkout]' ? dynamicCheckoutLinks : [],
  querySelector: () => null,
};

await import('../camp-snooze-v2-luxury.js');

async function render(state, remaining) {
  const root = { dataset: {}, innerHTML: '', querySelectorAll: () => [] };
  const payload = { cohorts: [{ cohort_number: 15, state, seats_remaining: remaining, start_date: '2026-08-31', access_friday: '2026-08-28', checkout_close_at: '2026-08-27T13:59:59.000Z' }] };
  const result = await window.CampCapacityWidget.init(root, {
    feedUrl: 'http://127.0.0.1:1/stub',
    fetchImpl: async () => ({ ok: true, json: async () => payload }),
    timeoutMs: 100,
    // Pinned two days before the close, so the countdown assertions do not drift with the wall clock.
    nowMs: Date.parse('2026-08-25T23:59:59+10:00'),
  });
  assert.equal(result, 'ready');
  return root.innerHTML;
}

// open: no capacity line at all, and never the old "15 of 15" phrasing.
for (const n of [15, 10]) {
  const html = await render('open', n);
  assert.doesNotMatch(html, /camp-capacity-places/, `open with ${n} left must render no places element`);
  assert.doesNotMatch(html, /of 15 places remaining/);
  assert.match(html, /Join Camp #15/);
}

// filling: words only, no number anywhere in the capacity line.
for (const n of [9, 6]) {
  const html = await render('filling', n);
  assert.match(html, /Filling fast/);
  assert.doesNotMatch(html, /camp-capacity-places/, `filling with ${n} left must not print a count`);
  assert.match(html, /Join Camp #15/);
}

// low: the real number, and still bookable.
const low5 = await render('low', 5);
assert.match(low5, /Only 5 places left/);
assert.match(low5, /Almost full/);
assert.match(low5, /Join Camp #15/);

// low: singular reads correctly.
const low1 = await render('low', 1);
assert.match(low1, /1 place left/);
assert.doesNotMatch(low1, /1 places left/);

// low must never overstate scarcity: the number shown is the number given.
const low4 = await render('low', 4);
assert.match(low4, /Only 4 places left/);
assert.doesNotMatch(low4, /Only 5 places left/);

// An open camp names the deadline and how long is left on it. Both come from checkout_close_at, which
// the feed is already enforcing, so the card cannot promise a window the checkout will not honour.
const openCard = await render('open', 15);
assert.match(openCard, /Intake closes Thursday 27 Aug, 11:59pm AEST/);
assert.match(openCard, /Closes in 2 days/);
assert.match(openCard, /Snooze access opens Friday 28 Aug 2026/);

// full: taken, and routed to the waitlist path rather than a checkout.
const full = await render('full', 0);
assert.match(full, /All 15 places are taken/);
assert.match(full, /Join Camp #15 Waitlist/);
// The waitlist CTA now shares the "Join Camp #15" prefix with the buy CTA, so the check that a full
// camp offers no checkout has to look at the link itself rather than its label.
assert.doesNotMatch(full, /data-checkout/);

// A camp nobody can buy must not advertise a deadline; the waitlist is the only action left.
assert.doesNotMatch(full, /Intake closes/);
assert.doesNotMatch(full, /camp-capacity-countdown/);

const dynamicAttributes = new Map([
  ['href', 'https://www.joinsnooze.com/offers/46Bz9tk6/checkout?cohort=15'],
  ['data-cohort', '15'],
]);
dynamicCheckoutLinks = [{
  getAttribute: (name) => dynamicAttributes.has(name) ? dynamicAttributes.get(name) : null,
  setAttribute: (name, value) => dynamicAttributes.set(name, value),
}];
window.location.href = 'https://www.joinsnooze.com/camp-snooze-sleep-coaching' +
  '?utm_source=meta&utm_medium=paid_social&fbclid=capacity-card-test';
await render('open', 15);
const dynamicCheckout = new URL(dynamicAttributes.get('href'));
assert.equal(dynamicCheckout.searchParams.get('utm_source'), 'meta');
assert.equal(dynamicCheckout.searchParams.get('utm_medium'), 'paid_social');
assert.equal(dynamicCheckout.searchParams.get('fbclid'), 'capacity-card-test');
assert.equal(dynamicCheckout.searchParams.get('cohort'), '15');

console.log('CAPACITY BANDS PASSED: open prints nothing, filling has no number, low prints the true count and pluralises, full routes to the waitlist');
