import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const source = fs.readFileSync(new URL('../checkout-identity-capture.js', import.meta.url), 'utf8');
const hash = 'a'.repeat(64);
function harness(fetcher) {
  const sent = new Map(); const calls = []; const timers = []; const listeners = {};
  const document = {cookie: '', querySelector: () => null, addEventListener: (name, fn) => {listeners[name] = fn;}};
  const window = {location: {search: '', origin: 'https://www.joinsnooze.com', pathname: '/offers/example/checkout'},
    localStorage: {getItem: () => null}, sessionStorage: {getItem: k => sent.get(k), setItem: (k,v) => sent.set(k,v)},
    setTimeout: fn => {timers.push(fn); return timers.length;}};
  vm.runInNewContext(source, {window,document,navigator: {userAgent: 'test'},fetch: (url, options) => {calls.push(JSON.parse(options.body)); return fetcher(calls.length);}});
  return {window,document,sent,calls,timers,listeners,send: () => window.SnoozeCheckoutIdentity.send(hash)};
}
test('network failures and HTTP failures remain retryable; acceptance alone marks sent', async () => {
  const h = harness(n => n === 1 ? Promise.reject(new Error('network')) : Promise.resolve({ok: n > 2}));
  assert.equal(await h.send(), false); assert.equal(h.sent.size, 0);
  assert.equal(await h.send(), false); assert.equal(h.sent.size, 0);
  assert.equal(await h.send(), true); assert.equal(h.sent.size, 1);
  assert.equal(await h.send(), false); assert.equal(h.calls.length, 3);
  assert.equal(h.window.dataLayer.length, 1);
});
test('failed requests have a bounded retry count and do not emit success', async () => {
  const h = harness(() => Promise.resolve({ok: false}));
  for (let i = 0; i < 5; i++) await h.send();
  assert.equal(h.calls.length, 3); assert.equal(h.sent.size, 0); assert.equal(h.window.dataLayer, undefined);
});
test('concurrent calls send once; newly available identity can be sent afterwards', async () => {
  let complete; const h = harness(n => n === 1 ? new Promise(r => {complete = r;}) : Promise.resolve({ok: true}));
  const first = h.send(); await h.send(); assert.equal(h.calls.length, 1);
  complete({ok: true}); await first; await h.send(); assert.equal(h.calls.length, 1);
  h.document.cookie = '_ga=GA1.1.123.456'; await h.send(); assert.equal(h.calls.length, 2);
  assert.equal(h.calls[1].ga_client_id, '123.456');
});
test('click-only fallback is stable across polls', async () => {
  const h = harness(() => Promise.resolve({ok: true})); h.window.location.search = '?fbclid=synthetic-transport-only';
  await h.send(); await h.send(); assert.equal(h.calls.length, 1);
});
test('late checkout interaction re-arms one bounded polling loop', () => {
  const h = harness(() => Promise.resolve({ok: true}));
  while (h.timers.length) h.timers.shift()();
  h.listeners.input(); h.listeners.input(); assert.equal(h.timers.length, 1);
});
