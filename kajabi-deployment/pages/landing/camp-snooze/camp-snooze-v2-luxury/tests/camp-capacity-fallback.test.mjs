import assert from 'node:assert/strict';

const listeners = new Map();
globalThis.window = {
  CAMP_CAPACITY_FEED_URL: 'http://127.0.0.1:1/unreachable',
  location: { href: 'https://www.joinsnooze.com/camp-snooze' },
  fetch: globalThis.fetch,
  dataLayer: []
};
globalThis.document = {
  body: {
    classList: {
      contains: () => false,
      add: () => {},
      remove: () => {}
    }
  },
  addEventListener: (name, callback) => listeners.set(name, callback),
  querySelectorAll: () => []
};

await import('../camp-snooze-v2-luxury.js?fallback-test');

const root = {
  dataset: {},
  innerHTML: '',
  querySelectorAll: () => []
};
const buyButton = { href: 'https://www.joinsnooze.com/offers/K3Y6FEKX/checkout' };
const before = buyButton.href;

const result = await window.CampCapacityWidget.init(root, {
  feedUrl: 'http://127.0.0.1:1/unreachable',
  fetchImpl: globalThis.fetch,
  timeoutMs: 100
});

assert.equal(result, 'fallback');
assert.equal(root.dataset.capacityState, 'fallback');
assert.match(root.innerHTML, /You can still continue to checkout/);
assert.match(root.innerHTML, /K3Y6FEKX\/checkout/);
assert.equal(buyButton.href, before);
console.log('SAFE FALLBACK PASSED: neutral message rendered and the buy button still points to checkout');
