import assert from 'node:assert/strict';

globalThis.window = {
  CAMP_CAPACITY_FEED_URL: 'http://127.0.0.1:1/unreachable',
  location: { search: '?cohort=15' },
  fetch: globalThis.fetch
};
globalThis.document = {
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => []
};

await import('../camp-snooze-v2-checkout.js?fallback-test');

const root = { dataset: {}, innerHTML: '' };
const buyButton = { disabled: false, href: '#checkout-form' };
const result = await window.CampCheckoutCapacity.init(root, {
  feedUrl: 'http://127.0.0.1:1/unreachable',
  fetchImpl: globalThis.fetch,
  timeoutMs: 100
});

assert.equal(result, 'fallback');
assert.equal(root.dataset.capacityState, 'fallback');
assert.match(root.innerHTML, /You can still continue with checkout/);
assert.equal(buyButton.disabled, false);
assert.equal(buyButton.href, '#checkout-form');
console.log('CHECKOUT SAFE FALLBACK PASSED: neutral message rendered and checkout remained enabled');
