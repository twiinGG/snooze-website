const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sourcePath = path.resolve(__dirname, '../gtm-variables.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const separator = '\n}\n\nfunction() {';
const firstFunctionEnd = source.indexOf(separator);

assert.notEqual(firstFunctionEnd, -1, 'GTM variable source contains the expected function boundary');

const currencyFunction = source.slice(0, firstFunctionEnd + 2);

function currencyFor(pathname, storedCurrency) {
  const context = {
    window: { location: { pathname } },
    localStorage: {
      getItem(key) {
        assert.equal(key, 'snooze_currency_preference');
        return storedCurrency || null;
      }
    }
  };

  return vm.runInNewContext(`(${currencyFunction})()`, context);
}

const audCheckoutSlugs = [
  'vYgCNgJz',
  'Sr6KzShx',
  '46Bz9tk6',
  'ENhg45mj',
  'FkZfbT25',
  '8SL8r5sC',
  'azdqxZuK',
  'JfeoXoKn',
  'xGVQ2zfC',
  'wgqokagt',
  'd5HsPDpJ',
  'ZYWF7eY8',
  'wesGUFkc'
];

audCheckoutSlugs.forEach((slug) => {
  assert.equal(
    currencyFor(`/offers/${slug}/checkout`, 'USD'),
    'AUD',
    `${slug} resolves from its checkout path before a stale stored preference`
  );
});

assert.equal(currencyFor('/offers/K3Y6FEKX/checkout', null), 'USD');
assert.equal(currencyFor('/offers/K3Y6FEKX/checkout', 'AUD'), 'AUD');

console.log(`PASS: ${audCheckoutSlugs.length + 2} GTM currency resolver assertions`);
