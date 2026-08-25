// Proves the urgency rule Kade set on 2026-08-25: the page sells ONE camp.
//
// The failure this guards against is the old behaviour, not a hypothetical. The widget used to render
// every cohort the feed returned, so a family looking at a camp that closes on Thursday could click a
// card three weeks out instead and nothing on the page ever expired. The feed still returns five, and
// still must, because the checkout resolves ?cohort=N by searching the same window.
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

await import('../camp-snooze-v2-luxury.js?single-intake-test');

function cohort(number, state, extra) {
  return Object.assign({
    cohort_number: number,
    state,
    seats_remaining: state === 'full' ? 0 : 15,
    start_date: '2026-09-14',
    access_friday: '2026-09-11',
    checkout_close_at: '2026-09-10T13:59:59.000Z',
  }, extra || {});
}

async function render(cohorts, nowMs) {
  const root = { dataset: {}, innerHTML: '', querySelectorAll: () => [] };
  const result = await window.CampCapacityWidget.init(root, {
    feedUrl: 'http://127.0.0.1:1/stub',
    fetchImpl: async () => ({ ok: true, json: async () => ({ cohorts }) }),
    timeoutMs: 100,
    nowMs,
  });
  assert.equal(result, 'ready');
  return root.innerHTML;
}

const now = Date.parse('2026-08-25T12:00:00+10:00');

// Five cohorts in, one card out, and it is the soonest one.
const five = await render([15, 16, 17, 18, 19].map((n) => cohort(n, 'open')), now);
assert.equal((five.match(/<article/g) || []).length, 1);
assert.match(five, /Camp Snooze #15/);
for (const later of [16, 17, 18, 19]) {
  assert.doesNotMatch(five, new RegExp('Camp Snooze #' + later), `camp ${later} must not appear on the page`);
}

// Auto-advance: a closed or full soonest camp hands the card to the next sellable one, so the page
// always has something to buy. The camp that was skipped is not shown at all, because a card saying
// "Camp #15 is full" beside a card saying "Camp #16 is open" is the list this change removed.
const advanced = await render([cohort(15, 'closed'), cohort(16, 'full'), cohort(17, 'low')], now);
assert.equal((advanced.match(/<article/g) || []).length, 1);
assert.match(advanced, /Camp Snooze #17/);
assert.match(advanced, /data-checkout/);
assert.doesNotMatch(advanced, /Camp Snooze #15/);
assert.doesNotMatch(advanced, /Camp Snooze #16/);

// Nothing sellable anywhere in the window: fall back to the soonest camp and the waitlist, never to a
// blank card.
const nothing = await render([cohort(15, 'full'), cohort(16, 'closed')], now);
assert.match(nothing, /Camp Snooze #15/);
assert.match(nothing, /Join Camp #15 Waitlist/);
assert.doesNotMatch(nothing, /data-checkout/);

// The countdown reads from checkout_close_at and coarsens as the deadline recedes.
const hours = await render([cohort(16, 'open', { checkout_close_at: '2026-08-25T23:00:00+10:00' })], now);
assert.match(hours, /Closes in 11 hours/);
const minutes = await render([cohort(16, 'open', { checkout_close_at: '2026-08-25T12:40:00+10:00' })], now);
assert.match(minutes, /Closes in 40 minutes/);
// Past its close and still banded open by a stale feed: no countdown rather than a negative one.
const past = await render([cohort(16, 'open', { checkout_close_at: '2026-08-24T12:00:00+10:00' })], now);
assert.doesNotMatch(past, /camp-capacity-countdown/);

// A camp closing inside Melbourne's AEDT window still reads AEST, and reads the true instant.
// Camp 19 closes 2026-10-22T13:59:59Z, which is 23:59 AEST and 00:59 AEDT the next day. The label must
// follow the stored offset, not the reader's calendar, or the page and the feed disagree by an hour for
// half the year.
const summer = await render([cohort(19, 'open', {
  start_date: '2026-10-26',
  access_friday: '2026-10-23',
  checkout_close_at: '2026-10-22T13:59:59.000Z',
})], Date.parse('2026-10-20T12:00:00+10:00'));
assert.match(summer, /Intake closes Thursday 22 Oct, 11:59pm AEST/);
assert.doesNotMatch(summer, /Melbourne/);
// The close line names the Thursday, never the Friday it becomes on an AEDT clock. "23 Oct" does
// appear on the card, as the access Friday, so this checks the close line itself.
assert.doesNotMatch(summer, /Intake closes Friday/);

console.log('SINGLE INTAKE PASSED: one card from a five-cohort feed, auto-advance past full and closed camps, waitlist when nothing is sellable, countdown scaled to days/hours/minutes');
