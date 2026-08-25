// The hero banner that tells a visitor when the next camp starts.
//
// Before this, the only start date on the page sat below the fold in the capacity card, so a visitor
// who bounced from the hero never learned when Camp ran. The banner reads the chosen cohort's
// start_date from the same feed as that card, so the two cannot disagree. It stays hidden when there
// is no date to show, and re-hides on a feed failure rather than leaving a stale date in the hero.
import assert from 'node:assert/strict';

function heroHost() {
  const date = { textContent: '' };
  return {
    hidden: true,
    querySelector: (selector) => (selector === '[data-camp-hero-next-date]' ? date : null),
    dateNode: date,
  };
}

let hero = heroHost();

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
  querySelector: (selector) => (selector === '[data-camp-hero-next]' ? hero : null),
};

await import('../camp-snooze-v2-luxury.js?hero-next-test');

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

async function render(cohorts) {
  hero = heroHost();
  const root = { dataset: {}, innerHTML: '', querySelectorAll: () => [] };
  await window.CampCapacityWidget.init(root, {
    feedUrl: 'http://127.0.0.1:1/stub',
    fetchImpl: async () => ({ ok: true, json: async () => ({ cohorts }) }),
    timeoutMs: 100,
    nowMs: Date.parse('2026-08-25T12:00:00+10:00'),
  });
  return { hero, card: root.innerHTML };
}

// The banner shows, and its date is the same date the capacity card prints.
const open = await render([cohort(15, 'open')]);
assert.equal(open.hero.hidden, false);
assert.equal(open.hero.dateNode.textContent, 'Next Camp starts on Monday 14 Sept 2026');
assert.match(open.card, /Starts Monday 14 Sept 2026/);

// Auto-advance: the hero follows the camp actually being sold, not the soonest one in the feed.
const advanced = await render([
  cohort(15, 'closed'),
  cohort(16, 'open', { start_date: '2026-09-28' }),
]);
assert.equal(advanced.hero.dateNode.textContent, 'Next Camp starts on Monday 28 Sept 2026');

// A cohort with no start date leaves the hero hidden rather than printing a placeholder.
const undated = await render([cohort(15, 'open', { start_date: null })]);
assert.equal(undated.hero.hidden, true);
assert.equal(undated.hero.dateNode.textContent, '');

// A feed failure re-hides the banner, so a stale date never outlives the card it came from.
hero = heroHost();
hero.hidden = false;
hero.dateNode.textContent = 'Next Camp starts on Monday 14 Sept 2026';
const fallbackRoot = { dataset: {}, innerHTML: '', querySelectorAll: () => [] };
const outcome = await window.CampCapacityWidget.init(fallbackRoot, {
  feedUrl: 'http://127.0.0.1:1/stub',
  fetchImpl: async () => { throw new Error('feed down'); },
  timeoutMs: 100,
});
assert.equal(outcome, 'fallback');
assert.equal(hero.hidden, true);

console.log('HERO NEXT CAMP PASSED: banner date matches the capacity card, follows auto-advance, hides when undated, hides on feed failure');
