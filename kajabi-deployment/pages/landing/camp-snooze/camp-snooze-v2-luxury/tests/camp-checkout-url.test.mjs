// Proves every camp checkout link keeps its ?cohort=N.
//
// Kade reported 2026-08-22: clicking a camp on the landing page led to a checkout showing Camp 15's
// dates. Cause: audCheckoutUrl was 'https://www.joinsnooze.com/offers/46Bz9tk6', with no /checkout.
// Kajabi redirects /offers/{slug} to /offers/{slug}/checkout and drops the query string, so ?cohort=N
// never reached the checkout, whose JS then fell back to the soonest cohort. Verified live: the same
// URL with /checkout in it renders "Camp Snooze #17" and its real dates.
//
// This test fails if either base URL loses its /checkout, and if a built link loses its cohort.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

globalThis.window = {
  CAMP_CAPACITY_FEED_URL: 'http://127.0.0.1:1/stub',
  location: { href: 'https://www.joinsnooze.com/camp-snooze-sleep-coaching' },
  fetch: globalThis.fetch,
  dataLayer: [],
};
let audMode = false;
globalThis.document = {
  body: { classList: { contains: (c) => (c === 'currency-mode-aud' ? audMode : false), add: () => {}, remove: () => {} } },
  addEventListener: () => {},
  querySelectorAll: () => [],
  querySelector: () => null,
};

const mod = await import('../camp-snooze-v2-luxury.js');
void mod;

// Both configured bases must be checkout URLs, not offer landing URLs. CAMP_CURRENCY_CONFIG is a
// top-level const in a file that gets pasted into a Kajabi theme, so it is not exported and not on
// window. Assert against the source text, which is the thing that actually gets pasted.
const src = await readFile(new URL('../camp-snooze-v2-luxury.js', import.meta.url), 'utf8');
for (const name of ['usdCheckoutUrl', 'audCheckoutUrl']) {
  const m = src.match(new RegExp(name + ":\\s*'([^']+)'"));
  assert.ok(m, `${name} not found in camp-snooze-v2-luxury.js`);
  assert.ok(
    /\/offers\/[^/?#]+\/checkout$/.test(m[1]),
    `${name} must end in /offers/{slug}/checkout so Kajabi does not redirect and drop the query string, got ${m[1]}`,
  );
}

// A rendered cohort CTA must carry the cohort through, in both currencies.
async function linkFor(cohortNumber, aud) {
  audMode = aud;
  const root = { dataset: {}, innerHTML: '', querySelectorAll: () => [] };
  const payload = {
    cohorts: [{
      cohort_number: cohortNumber, state: 'open', seats_remaining: 15,
      start_date: '2026-09-28', access_friday: '2026-09-25',
      title: 'Camp Snooze #' + cohortNumber,
    }],
  };
  await window.CampCapacityWidget.init(root, {
    feedUrl: 'http://127.0.0.1:1/stub',
    fetchImpl: async () => ({ ok: true, json: async () => payload }),
    timeoutMs: 100,
  });
  const m = root.innerHTML.match(/href="([^"]*offers[^"]*)"/);
  assert.ok(m, `no checkout href rendered for cohort ${cohortNumber}, aud=${aud}`);
  return m[1];
}

for (const aud of [true, false]) {
  const href = await linkFor(17, aud);
  const parsed = new URL(href);
  assert.equal(
    parsed.searchParams.get('cohort'), '17',
    `cohort must survive in the built link (aud=${aud}), got ${href}`,
  );
  assert.ok(
    parsed.pathname.endsWith('/checkout'),
    `built link must point straight at /checkout so the query string survives (aud=${aud}), got ${href}`,
  );
}

console.log('camp-checkout-url: ok');

// The landing page and the checkout must request the same feed window, or the checkout cannot resolve a
// ?cohort=N that sits outside its own window and silently falls back to the soonest camp.
const checkoutSrc = await readFile(
  new URL('../../../../checkout/camp-snooze-v2-luxury/camp-snooze-v2-checkout.js', import.meta.url),
  'utf8',
);
const landingLimit = src.match(/\?limit=(\d+)/);
const checkoutLimit = checkoutSrc.match(/\?limit=(\d+)/);
assert.ok(landingLimit, 'landing page does not request an explicit feed limit');
assert.ok(checkoutLimit, 'checkout does not request an explicit feed limit');
assert.equal(
  landingLimit[1], checkoutLimit[1],
  `landing (?limit=${landingLimit[1]}) and checkout (?limit=${checkoutLimit[1]}) must request the same window, ` +
  'or a cohort visible on the page cannot be resolved at checkout',
);
assert.ok(Number(landingLimit[1]) >= 5, `feed limit must cover all five open cohorts, got ${landingLimit[1]}`);

console.log('camp-checkout-url: feed windows match at limit=' + landingLimit[1]);
