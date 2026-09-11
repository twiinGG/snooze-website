import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const usd = readFileSync(new URL("usd/checkout-text-block.html", root), "utf8");
const aud = readFileSync(new URL("aud/checkout-text-block.html", root), "utf8");

test("USD checkout states the approved first and recurring amounts", () => {
  assert.match(usd, /US\$39\.50/);
  assert.match(usd, /US\$79 each month/);
  assert.doesNotMatch(usd, /A\$/);
});

test("AUD checkout states the approved first and recurring amounts", () => {
  assert.match(aud, /A\$59\.50/);
  assert.match(aud, /A\$119 each month/);
  assert.doesNotMatch(aud, /US\$/);
});

for (const [currency, html] of [["USD", usd], ["AUD", aud]]) {
  test(`${currency} checkout states the redemption constraints`, () => {
    assert.match(html, /approved single-use code/);
    assert.match(html, /first payment only/);
    assert.match(html, /no free trial/);
    assert.match(html, /cannot be combined with another discount/);
    assert.doesNotMatch(html, /\[[^\]]+\]/);
    assert.doesNotMatch(html, /\u2014/);
  });
}
