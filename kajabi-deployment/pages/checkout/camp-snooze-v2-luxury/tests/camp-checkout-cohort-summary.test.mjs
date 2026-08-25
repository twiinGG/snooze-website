// The order summary must name the camp the buyer is actually paying for.
//
// Two defects this locks down:
//   1. chooseCohort() accepted only 'open' and 'filling'. The feed also bands 'low' (1 to 5 seats),
//      which is still a sellable camp. A camp at 3 seats was therefore skipped and the NEXT camp
//      was named, on the page selling the current one.
//   2. The item name and the Key Dates were static "Camp Snooze #15" plus its August dates. The
//      feed's RPC drops a camp once its start date passes, so from 2026-08-31 the capacity card
//      said #16 while the summary beside it still said #15.
import assert from 'node:assert/strict';

function fakeElement(text) {
  return { textContent: text };
}

const dom = {
  '[data-camp-cohort-title]': [fakeElement('Camp Snooze #15')],
  '[data-camp-cohort-start]': [fakeElement('Monday 31 August 2026')],
  '[data-camp-cohort-access]': [fakeElement('Friday 28 August 2026')],
  '[data-camp-cohort-close]': [fakeElement('the Thursday before camp, 11:59pm AEST')]
};

globalThis.window = {
  CAMP_CAPACITY_FEED_URL: 'http://127.0.0.1:1/unused',
  location: { href: 'https://www.joinsnooze.com/offers/K3Y6FEKX/checkout', search: '' },
  fetch: globalThis.fetch
};
globalThis.document = {
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: (selector) => {
    const key = selector.replace('#snooze-custom-checkout ', '');
    return dom[key] || [];
  }
};

await import('../camp-snooze-v2-checkout.js');

function feedReturning(cohorts) {
  return async () => ({ ok: true, json: async () => ({ cohorts }) });
}

// Case 1: the current camp is at 3 seats, banded 'low'. It must still be the one named.
const root = { dataset: {}, innerHTML: '' };
let result = await window.CampCheckoutCapacity.init(root, {
  fetchImpl: feedReturning([
    { cohort_number: 15, title: 'Camp Snooze #15', start_date: '2026-08-31', access_friday: '2026-08-28', seats_remaining: 3, seat_cap: 15, state: 'low' },
    { cohort_number: 16, title: 'Camp Snooze #16', start_date: '2026-09-14', access_friday: '2026-09-11', seats_remaining: 15, seat_cap: 15, state: 'open' }
  ])
});
assert.equal(result, 'ready');
assert.equal(root.dataset.capacityState, 'low');
assert.match(root.innerHTML, /Camp Snooze #15/);
assert.doesNotMatch(root.innerHTML, /Camp Snooze #16/);
assert.match(root.innerHTML, /Only 3 places left/);
assert.equal(dom['[data-camp-cohort-title]'][0].textContent, 'Camp Snooze #15');

// Case 2: Camp 15 has started, so the feed no longer carries it. Every slot must roll to #16.
result = await window.CampCheckoutCapacity.init(root, {
  fetchImpl: feedReturning([
    { cohort_number: 16, title: 'Camp Snooze #16', start_date: '2026-09-14', access_friday: '2026-09-11', seats_remaining: 15, seat_cap: 15, state: 'open' },
    { cohort_number: 17, title: 'Camp Snooze #17', start_date: '2026-09-28', access_friday: '2026-09-25', seats_remaining: 15, seat_cap: 15, state: 'open' }
  ])
});
assert.equal(result, 'ready');
assert.equal(dom['[data-camp-cohort-title]'][0].textContent, 'Camp Snooze #16');
assert.equal(dom['[data-camp-cohort-start]'][0].textContent, 'Monday 14 September 2026');
assert.equal(dom['[data-camp-cohort-access]'][0].textContent, 'Friday 11 September 2026');
// A full camp must never advertise its own emptiness. 'open' prints no number at all.
assert.doesNotMatch(root.innerHTML, /15 of 15/);
assert.doesNotMatch(root.innerHTML, /places left/);

// Case 2c: the intake deadline. It must be the same instant the feed is enforcing and the same
// sentence the landing page card showed, because a buyer who clicked through on "closes Thursday" and
// then read a different date on the payment page has been told two things.
await window.CampCheckoutCapacity.init(root, {
  fetchImpl: feedReturning([
    { cohort_number: 16, title: 'Camp Snooze #16', start_date: '2026-09-14', access_friday: '2026-09-11', checkout_close_at: '2026-09-10T13:59:59.000Z', seats_remaining: 15, seat_cap: 15, state: 'open' }
  ])
});
assert.equal(dom['[data-camp-cohort-close]'][0].textContent, 'Thursday 10 September at 11:59 pm AEST');
assert.match(root.innerHTML, /Intake closes Thursday 10 September/);

// Case 2b: 'filling' says so without a number.
await window.CampCheckoutCapacity.init(root, {
  fetchImpl: feedReturning([
    { cohort_number: 16, title: 'Camp Snooze #16', start_date: '2026-09-14', access_friday: '2026-09-11', seats_remaining: 7, seat_cap: 15, state: 'filling' }
  ])
});
assert.match(root.innerHTML, /Filling fast/);
assert.doesNotMatch(root.innerHTML, /7/);

// Case 2c: one place left reads as a place, not places.
await window.CampCheckoutCapacity.init(root, {
  fetchImpl: feedReturning([
    { cohort_number: 16, title: 'Camp Snooze #16', start_date: '2026-09-14', access_friday: '2026-09-11', seats_remaining: 1, seat_cap: 15, state: 'low' }
  ])
});
assert.match(root.innerHTML, /Only 1 place left/);

// Case 3: the feed is unreachable. The summary keeps the last good text rather than emptying.
result = await window.CampCheckoutCapacity.init(root, {
  fetchImpl: async () => { throw new Error('unreachable'); }
});
assert.equal(result, 'fallback');
assert.equal(dom['[data-camp-cohort-title]'][0].textContent, 'Camp Snooze #16');
assert.equal(dom['[data-camp-cohort-start]'][0].textContent, 'Monday 14 September 2026');
assert.match(root.innerHTML, /You can still continue with checkout/);

console.log('CHECKOUT COHORT SUMMARY PASSED: low band is sellable, the summary rolls with the feed, places are banded, and a dead feed leaves text intact');
