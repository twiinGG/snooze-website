import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = fs.readFileSync(new URL('../checkout-identity-capture.js', import.meta.url), 'utf8');
function capture(search, entries = []) {
  const storage = new Map(entries.map(([key, value]) => [key, JSON.stringify(value)]));
  let payload;
  const window = {
    location: { search, origin: 'https://www.joinsnooze.com', pathname: '/offers/example/checkout' },
    localStorage: { getItem: (key) => storage.get(key) || null },
    sessionStorage: { setItem() {} }, setTimeout() {},
  };
  vm.runInNewContext(source, {
    window, document: { cookie: '', querySelector: () => null }, navigator: { userAgent: 'test' },
    fetch: (_url, options) => { payload = JSON.parse(options.body); return Promise.resolve(); },
  });
  window.SnoozeCheckoutIdentity.send('a'.repeat(64));
  return payload;
}
for (const [label, search, expected] of [
  ['large platform ids stay strings', '?utm_id=120249324637910336', '120249324637910336'],
  ['URL decoding preserves raw value', '?utm_id=ad%2Fid%20A', 'ad/id A'],
  ['missing id stays null', '?utm_source=meta', null],
  ['empty id stays null', '?utm_id=', null],
  ['malformed encoding stays null', '?utm_id=%ZZ', null],
]) {
  test(label, () => {
    const payload = capture(search);
    assert.equal(payload.ad_id, expected);
    assert.equal(payload.utm_id, expected);
  });
}
for (const key of ['snooze_utm_attribution', 'snooze_attribution_first_touch', 'snooze_attribution_current_touch']) {
  test(`retains stored utm_id from ${key} on later pages`, () => {
    const payload = capture('', [[key, { utm_id: 'stored-id', utm_source: 'meta' }]]);
    assert.equal(payload.ad_id, 'stored-id');
    assert.equal(payload.utm_id, 'stored-id');
    assert.equal(payload.utm_source, 'meta');
  });
}
test('id follows the existing stored attribution precedence', () => {
  const payload = capture('?utm_id=current-id', [
    ['snooze_utm_attribution', { utm_id: 'first-id' }],
    ['snooze_attribution_current_touch', { utm_id: 'later-id' }],
  ]);
  assert.equal(payload.ad_id, 'first-id');
});

test('webhook normalisation keeps raw utm_id and canonical ad_id', () => {
  const workflow = JSON.parse(fs.readFileSync(new URL('../../../../../../workflows/n8n/checkout-identity-capture/workflow.json', import.meta.url), 'utf8'));
  const code = workflow.nodes.find((node) => node.name === 'Normalise Identity Payload').parameters.jsCode;
  const normalise = new Function('$input', code);
  const out = normalise({ item: { json: { body: { email_sha256: 'a'.repeat(64), utm_id: '120249324637910336' } } } })[0].json;
  assert.equal(out.ad_id, '120249324637910336');
  assert.equal(JSON.parse(out.raw_payload).utm_id, '120249324637910336');
});

test('both hand-edited legacy header stores retain utm_id', () => {
  for (const file of ['site-header-page-scripts.html', 'checkout-header-tracking.html']) {
    const html = fs.readFileSync(new URL(`../../html/${file}`, import.meta.url), 'utf8');
    const values = new Map();
    const window = {
      location: { search: '?utm_source=meta&utm_id=120249324637910336' },
      localStorage: { getItem: (key) => values.get(key) || null, setItem: (key, value) => values.set(key, value) },
    };
    let code;
    if (file === 'site-header-page-scripts.html') {
      const start = html.indexOf('  const attributionKeys =');
      const end = html.indexOf('  const activeCurrency =', start);
      code = html.slice(start, end) + '\ncaptureAttribution();';
    } else {
      code = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
        .find((match) => match[1].includes("var STORAGE_KEY = 'snooze_utm_attribution'"))[1];
    }
    vm.runInNewContext(code, { window, URLSearchParams, Date, console });
    const key = file === 'site-header-page-scripts.html' ? 'snooze_attribution_first_touch' : 'snooze_utm_attribution';
    assert.equal(JSON.parse(values.get(key)).utm_id, '120249324637910336', file);
    window.location.search = '?utm_id=later-id';
    vm.runInNewContext(code, { window, URLSearchParams, Date, console });
    assert.equal(JSON.parse(values.get(key)).utm_id, '120249324637910336', `${file} preserves first touch`);
    if (file === 'site-header-page-scripts.html') {
      assert.equal(JSON.parse(values.get('snooze_attribution_current_touch')).utm_id, 'later-id');
    }
  }
});

test('paid-touch browser serialises utm_id on first and last paid touches', () => {
  const code = fs.readFileSync(new URL('../paid-touch-browser-state.js', import.meta.url), 'utf8');
  const values = new Map();
  const window = {
    location: { search: '?utm_source=meta&utm_medium=paid_social&utm_campaign=test&utm_content=creative&utm_term=angle&utm_id=120249324637910336' },
    localStorage: { getItem: (key) => values.get(key) || null, setItem: (key, value) => values.set(key, value) },
    SnoozePaidTouchRegistry: [{ status: 'active', platform: 'meta', ad_id: 'registry-id',
      utm_source: 'meta', utm_medium: 'paid_social', utm_campaign: 'test', utm_content: 'creative', utm_term: 'angle' }],
  };
  vm.runInNewContext(code, { window, URLSearchParams });
  const captured = window.SnoozePaidTouchBrowser.capture();
  assert.equal(captured.first_touch.utm_id, '120249324637910336');
  assert.equal(captured.latest_registered_paid_touch.utm_id, '120249324637910336');
  assert.equal(captured.latest_registered_paid_touch.ad_id, '120249324637910336');
  window.location.search = '';
  const returned = window.SnoozePaidTouchBrowser.capture();
  assert.equal(returned.first_touch.utm_id, '120249324637910336');
  assert.equal(returned.latest_registered_paid_touch.utm_id, '120249324637910336');
});
