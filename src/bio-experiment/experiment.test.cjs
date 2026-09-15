const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function load(name) {
  const context = { module: { exports: {} }, URL, Uint32Array, Math };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, name), 'utf8'), context);
  return context.module.exports;
}
const router = load('router.js');
const tracker = load('tracker.js');
function browser(href = 'https://www.joinsnooze.com/bio', sample = 0) {
  const store = new Map();
  return {
    location: { href, pathname: new URL(href).pathname, replace(value) { this.replaced = value; } },
    localStorage: { getItem: key => store.get(key), setItem: (key, value) => store.set(key, value) },
    crypto: { getRandomValues(values) { values[0] = sample; } }, store
  };
}
test('allocation preserves campaigns and stays sticky across visits', () => {
  const win = browser('https://www.joinsnooze.com/bio?utm_source=tiktok&fbclid=abc#help');
  const first = new URL(router.destination(win));
  assert.equal(first.pathname, '/links');
  assert.equal(first.searchParams.get('utm_source'), 'tiktok');
  assert.equal(first.searchParams.get('fbclid'), 'abc');
  assert.equal(first.searchParams.get('bio_experiment'), 'bio_layout_v1');
  assert.equal(first.hash, '#help');
  win.crypto.getRandomValues = values => { values[0] = 4294967295; };
  assert.equal(new URL(router.destination(win)).pathname, '/links');
  assert.equal(new URL(router.destination(browser(undefined, 4294967295))).pathname, '/links-simple');
});
test('blocked storage still routes and never redirects arbitrary paths', () => {
  const win = browser();
  Object.defineProperty(win, 'localStorage', { get() { throw Error('blocked'); } });
  router.start(win);
  assert.equal(new URL(win.location.replaced).pathname, '/links');
  const other = browser('https://www.joinsnooze.com/checkout');
  router.start(other);
  assert.equal(other.location.replaced, undefined);
});
test('preview does not enroll or write assignment; production ignores variant override', () => {
  const preview = browser('https://www.joinsnooze.com/bio?bio_preview=1&bio_variant=simple&bio_experiment=spoof');
  const url = new URL(router.destination(preview));
  assert.equal(url.pathname, '/links-simple');
  assert.equal(url.searchParams.get('bio_preview'), '1');
  assert.equal(url.searchParams.has('bio_experiment'), false);
  assert.equal(preview.store.size, 0);
  const normal = browser('https://www.joinsnooze.com/bio?bio_variant=simple');
  assert.equal(new URL(router.destination(normal)).pathname, '/links');
});
function page(query = '?bio_experiment=bio_layout_v1') {
  const listeners = {};
  const root = {
    getAttribute: () => 'simple', contains: link => !link.outside,
    addEventListener: (name, fn) => { listeners[name] = fn; }
  };
  const win = { location: { href: 'https://www.joinsnooze.com/links-simple' + query }, document: { querySelector: () => root } };
  return { win, listeners, click(id, commercial = true, extra = {}) {
    const link = { getAttribute: name => name === 'data-bio-link-id' ? id : String(commercial), ...extra };
    listeners.click({ type: 'click', target: { closest: () => link } });
  } };
}
test('one view; stable clicks with first-click semantics and no personal data', () => {
  const p = page('?bio_experiment=bio_layout_v1&email=private@example.com');
  tracker.start(p.win); tracker.start(p.win);
  p.click('instagram', false); p.click('camp'); p.click('camp');
  assert.equal(p.win.dataLayer.length, 4);
  assert.equal(p.win.dataLayer[0].experiment_enrolled, true);
  assert.equal(p.win.dataLayer[1].first_click, true);
  assert.equal(p.win.dataLayer[2].first_click, false);
  assert.equal(p.win.dataLayer[2].first_commercial_click, true);
  assert.equal(p.win.dataLayer[3].first_commercial_click, false);
  assert.equal(JSON.stringify(p.win.dataLayer).includes('private'), false);
  p.click('private@example.com'); p.click('camp', true, { outside: true });
  assert.equal(p.win.dataLayer.length, 4);
});
test('preview emits nothing and direct visits are not enrolled', () => {
  const preview = page('?bio_preview=1'); tracker.start(preview.win);
  assert.equal(preview.win.dataLayer, undefined);
  const direct = page(''); tracker.start(direct.win);
  assert.equal(direct.win.dataLayer[0].experiment_enrolled, false);
});
test('analytics failures cannot prevent navigation or click handling', () => {
  const p = page(); p.win.dataLayer = { push() { throw Error('tag failure'); } };
  assert.doesNotThrow(() => tracker.start(p.win));
  assert.doesNotThrow(() => p.click('camp'));
});
