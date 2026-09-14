/** WS3 browser adapter checks. Run with: node this file. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const browserPath = new URL('../paid-touch-browser-state.js', import.meta.url);
const source = fs.readFileSync(browserPath, 'utf8');
const pure = fs.readFileSync(new URL('../paid-touch-contract.mjs', import.meta.url), 'utf8')
  .replace(/\bexport\s+function\s+/g, 'function ')
  .replace(/\bexport\s+const\s+/g, 'const ')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')
  .split('\n').filter((line) => line.trim()).map((line) => line.trimEnd()).join('\n');
const generated = source.split("void 'BEGIN GENERATED REDUCER';\n")[1].split("\n  void 'END GENERATED REDUCER';")[0].trim();
assert.equal(generated, pure.trim(), 'browser reducer bytes are generated from the shared contract');
const values = new Map([
  ['snooze_attribution_first_touch', JSON.stringify({ utm_source: 'instagram', utm_medium: 'social', occurred_at: '2026-09-14T10:00:00.000Z' })],
  ['snooze_attribution_current_touch', JSON.stringify({ utm_source: 'instagram', utm_medium: 'social', occurred_at: '2026-09-14T10:00:00.000Z' })],
]);
const window = {
  location: { search: '' },
  localStorage: {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
  },
};
const sandbox = { window, URLSearchParams, Date, Number, Object, String, Array, JSON, RegExp };
vm.runInNewContext(source, sandbox);
assert.doesNotThrow(() => vm.runInNewContext(source, sandbox), 'loading both paste targets does not collide');

let state = window.SnoozePaidTouchBrowser.capture();
assert.equal(state.version, 1);
assert.equal(state.first_touch.utm_source, 'instagram');
assert.equal(state.final_touch.utm_source, 'instagram');
assert.equal(state.registry_status, 'pending_live_registry');
assert.equal(state.latest_registered_paid_touch, null);
assert.match(values.get('snooze_paid_touch_state_v1'), /instagram/);
assert.doesNotMatch(values.get('snooze_paid_touch_state_v1'), /email|phone|address|name|child/i);

values.set('snooze_paid_touch_state_v1', JSON.stringify({ version: 1, email: 'pii@example.com', first_touch: { utm_source: 'meta', occurred_at: '2026-08-01T00:00:00.000Z' }, unresolved_paid_clicks: [{ platform: 'meta', occurred_at: '2026-08-01T00:00:00.000Z' }] }));
state = window.SnoozePaidTouchBrowser.capture();
assert.equal(state.email, undefined, 'unexpected top-level PII is discarded');
assert.deepEqual(Array.from(state.unresolved_paid_clicks), [], 'expired assist is pruned');
values.set('snooze_paid_touch_state_v1', JSON.stringify({ version: 1, first_touch: { utm_source: 'meta', occurred_at: 1730000000000 } }));
values.delete('snooze_attribution_first_touch');
values.delete('snooze_attribution_current_touch');
state = window.SnoozePaidTouchBrowser.capture();
assert.equal(state.first_touch, null, 'numeric legacy timestamps are discarded');

window.SnoozePaidTouchRegistry = [{
  status: 'active', platform: 'meta', campaign_id: 'campaign-1', ad_id: 'ad-1',
  utm_source: 'meta', utm_medium: 'paid_social', utm_campaign: 'trial-direct-2609',
  utm_content: 'Creative-066', utm_term: 'EightMonthSchedule',
}];
window.location.search = '?utm_source=meta&utm_medium=paid_social&utm_campaign=trial-direct-2609&utm_content=Creative-066&utm_term=EightMonthSchedule';
state = window.SnoozePaidTouchBrowser.capture();
assert.equal(state.registry_status, 'provided');
assert.equal(state.latest_registered_paid_touch.platform, 'meta');
assert.equal(state.latest_registered_paid_touch.ad_id, 'ad-1');
const preservedPaid = state.latest_registered_paid_touch;
window.location.search += '&fbclid=ambiguous-meta&gclid=ambiguous-google';
state = window.SnoozePaidTouchBrowser.capture();
assert.equal(state.latest_registered_paid_touch.ad_id, preservedPaid.ad_id, 'ambiguous arrival preserves prior valid credit');
values.set('snooze_paid_touch_state_v1', JSON.stringify({ version: 1 }));
state = window.SnoozePaidTouchBrowser.capture();
assert.equal(state.latest_registered_paid_touch, null, 'fresh ambiguous current click ids fail closed');
assert.equal(state.first_touch, null, 'fresh ambiguous current click ids do not create first touch');
assert.deepEqual(Array.from(state.unresolved_paid_clicks).map((touch) => touch.platform).sort(), ['google', 'meta']);
window.SnoozePaidTouchRegistry = [];
state = window.SnoozePaidTouchBrowser.capture();
assert.equal(state.registry_status, 'provided', 'empty supplied registry has stable status');
assert.equal(window.SnoozePaidTouchBrowser.read().registry_status, 'provided', 'read matches capture registry status');
assert.deepEqual(Array.from(window.SnoozePaidTouchBrowser.legacyKeys), [
  'snooze_utm_attribution', 'snooze_attribution_first_touch', 'snooze_attribution_current_touch',
]);

const isolatedValues = new Map([['snooze_paid_touch_state_v1', JSON.stringify({
  version: 1,
  first_touch: { utm_source: 'meta', occurred_at: '2026-08-01T00:00:00.000Z' },
  final_touch: { utm_source: 'meta', occurred_at: '2026-08-01T00:00:00.000Z' },
  unresolved_paid_clicks: [{ platform: 'meta', occurred_at: '2026-08-01T00:00:00.000Z' }],
})]]);
const isolatedWindow = {
  location: { search: '' },
  localStorage: { getItem: (key) => isolatedValues.get(key) || null, setItem: (key, value) => isolatedValues.set(key, value) },
};
const isolatedSandbox = { window: isolatedWindow, URLSearchParams, Date, Number, Object, String, Array, JSON, RegExp };
vm.runInNewContext(source, isolatedSandbox);
assert.equal(isolatedWindow.SnoozePaidTouchBrowser.read().first_touch, null, 'read prunes expired state without URL or legacy input');
const isolatedCapture = isolatedWindow.SnoozePaidTouchBrowser.capture();
assert.equal(isolatedCapture.first_touch, null, 'capture prunes expired state without URL or legacy input');
assert.equal(isolatedCapture.final_touch, null, 'capture prunes expired final touch without URL or legacy input');
assert.deepEqual(Array.from(isolatedCapture.unresolved_paid_clicks), [], 'capture prunes expired assists without URL or legacy input');
console.log('WS3 browser state assertions passed');
