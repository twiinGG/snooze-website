import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../camp-snooze-v2-luxury.js', import.meta.url), 'utf8');

function classList(initial) {
  const values = new Set(initial || []);
  return {
    add: (...names) => names.forEach((name) => values.add(name)),
    remove: (...names) => names.forEach((name) => values.delete(name)),
    contains: (name) => values.has(name),
  };
}

function button(attributes = {}) {
  const values = new Map(Object.entries(attributes));
  return {
    getAttribute: (name) => values.has(name) ? values.get(name) : null,
    setAttribute: (name, value) => values.set(name, value),
    href: () => values.get('href'),
  };
}

function load(pageUrl, buttons = [], storedCurrency = null) {
  const bodyClasses = classList();
  const dataLayer = [];
  const storage = new Map(storedCurrency ? [['snooze_currency_preference', storedCurrency]] : []);
  const context = {
    AbortController,
    URL,
    Intl,
    Date,
    FormData,
    Math,
    Number,
    console,
    setTimeout,
    clearTimeout,
    setInterval: () => 1,
    clearInterval: () => {},
    localStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
    window: {
      location: { href: pageUrl },
      dataLayer,
      fetch: globalThis.fetch,
      setInterval: () => 1,
      clearInterval: () => {},
    },
    document: {
      body: { classList: bodyClasses },
      addEventListener: () => {},
      querySelectorAll: (selector) => selector === '.dynamic-cta, [data-checkout]' ? buttons : [],
      querySelector: () => null,
      createElement: () => ({ style: {}, appendChild: () => {}, setAttribute: () => {} }),
    },
  };
  vm.runInNewContext(source, context, { filename: 'camp-snooze-v2-luxury.js' });
  return { context, dataLayer, bodyClasses };
}

{
  const { context, dataLayer } = load('https://www.joinsnooze.com/camp-snooze-sleep-coaching', [], 'AUD');
  context.campInitCurrency();
  assert.deepEqual(dataLayer, [], 'initialisation must not emit currency_change');
}

{
  const { context, dataLayer } = load('https://www.joinsnooze.com/camp-snooze-sleep-coaching');
  context.campSetCurrency('USD', false);
  context.campSetCurrency('AUD', true);
  context.campSetCurrency('AUD', true);
  assert.equal(dataLayer.length, 1, 'one real currency change must emit one event');
  assert.deepEqual(JSON.parse(JSON.stringify(dataLayer[0])), {
    event: 'currency_change',
    previous_currency: 'USD',
    currency: 'AUD',
    surface: 'camp_snooze_sleep_coaching',
  });
}

for (const currency of ['AUD', 'USD']) {
  const target = button({
    href: 'https://www.joinsnooze.com/offers/original/checkout',
    'data-cohort': '17',
  });
  const pageUrl = 'https://www.joinsnooze.com/camp-snooze-sleep-coaching' +
    '?utm_source=meta&utm_medium=paid_social&utm_campaign=camp-direct-2608' +
    '&utm_content=creative-a&fbclid=fb-123&gclid=g-456&cohort=99&utm_source=duplicate';
  const { context } = load(pageUrl, [target]);
  context.campUpdateLinks(currency);
  const result = new URL(target.href());
  assert.match(result.pathname, currency === 'AUD' ? /46Bz9tk6\/checkout$/ : /K3Y6FEKX\/checkout$/);
  assert.equal(result.searchParams.get('utm_source'), 'meta');
  assert.equal(result.searchParams.get('utm_medium'), 'paid_social');
  assert.equal(result.searchParams.get('utm_campaign'), 'camp-direct-2608');
  assert.equal(result.searchParams.get('utm_content'), 'creative-a');
  assert.equal(result.searchParams.get('fbclid'), 'fb-123');
  assert.equal(result.searchParams.get('gclid'), 'g-456');
  assert.equal(result.searchParams.get('cohort'), '17', 'destination cohort must win');
  assert.equal(result.searchParams.getAll('utm_source').length, 1, 'query keys must not duplicate');
  assert.equal(result.searchParams.getAll('cohort').length, 1, 'cohort must not duplicate');
}

{
  const target = button({ href: 'https://www.joinsnooze.com/offers/original/checkout' });
  const { context } = load(
    'https://www.joinsnooze.com/camp-snooze-sleep-coaching?cohort=21&utm_source=meta&utm_medium=paid_social',
    [target]
  );
  context.campUpdateLinks('USD');
  const result = new URL(target.href());
  assert.equal(result.searchParams.get('cohort'), '21', 'inbound cohort must survive when the destination has none');
  assert.notEqual(result.searchParams.get('utm_source'), 'landing-page');
  assert.notEqual(result.searchParams.get('utm_medium'), 'cta');
}

console.log('Camp currency attribution assertions passed.');
