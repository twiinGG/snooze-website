const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const builtDir = path.resolve(__dirname, '..');
const oldDir = path.resolve(builtDir, '../camp-snooze-landing-v1');
const oldJs = fs.readFileSync(path.join(oldDir, 'camp-snooze-landing-v1.js'), 'utf8');
const oldHtml = fs.readFileSync(path.join(oldDir, 'camp-snooze-landing-page-blocks.html'), 'utf8');
const builtHtml = fs.readFileSync(path.join(builtDir, 'camp-snooze-landing-v2.html'), 'utf8');
const builtCss = fs.readFileSync(path.join(builtDir, 'camp-snooze-landing-v2.css'), 'utf8');
const builtJs = fs.readFileSync(path.join(builtDir, 'camp-snooze-landing-v2.js'), 'utf8');
const pricing = (() => {
  const mod = { exports: {} };
  const doc = { readyState: 'loading', addEventListener() {}, getElementById() { return null; } };
  new Function('module', 'document', builtJs)(mod, doc);
  return mod.exports;
})();
const mediaRoot = process.env.SNOOZE_MEDIA_ROOT || '/Users/kadegreenland/Documents/Projects/The Sleep Concierge/snooze-OS-media-library';
const captionsPath = path.join(mediaRoot, 'website/camp-vsl-clip-2026-10-24/captions.vtt');
const captions = fs.existsSync(captionsPath) ? fs.readFileSync(captionsPath, 'utf8') : null;

let count = 0;
function test(name, fn) {
  try {
    fn();
    count += 1;
    console.log('ok   ' + name);
  } catch (error) {
    console.log('FAIL ' + name);
    throw error;
  }
}

function priceTuples(html) {
  const out = new Set();
  const re = /<span class="(?:[\w-]+ )?dynamic-price"([^>]*)>/g;
  let m;
  while ((m = re.exec(html))) {
    const attr = (n) => { const x = new RegExp(n + '="([^"]*)"').exec(m[1]); return x ? x[1] : ''; };
    out.add([attr('data-usd'), attr('data-aud'), attr('data-period-usd'), attr('data-period-aud')].join('|'));
  }
  return out;
}

test('config matches old page source (checkout bases, feed, key)', () => {
  const grab = (re) => re.exec(oldJs)[1];
  assert.equal(pricing.CONFIG.usdCheckoutUrl, grab(/usdCheckoutUrl:\s*'([^']+)'/));
  assert.equal(pricing.CONFIG.audCheckoutUrl, grab(/audCheckoutUrl:\s*'([^']+)'/));
  assert.equal(pricing.CONFIG.feedUrl, grab(/CAMP_CAPACITY_FEED_URL \|\|\s*'([^']+)'/));
  assert.equal(pricing.CONFIG.anonKey, grab(/SUPABASE_ANON_KEY \|\|\s*'([^']+)'/));
  assert.equal(pricing.CONFIG.storageKey, grab(/storageKey:\s*'([^']+)'/));
  assert.match(pricing.CONFIG.usdCheckoutUrl, /\/offers\/[^/?#]+\/checkout$/);
  assert.match(pricing.CONFIG.audCheckoutUrl, /\/offers\/[^/?#]+\/checkout$/);
});

test('every price on the page exists on the old page with identical data-usd/data-aud/period values', () => {
  const oldSet = priceTuples(oldHtml);
  const newSet = priceTuples(builtHtml);
  assert.ok(newSet.size >= 2);
  for (const t of newSet) assert.ok(oldSet.has(t), 'not on old page: ' + t);
  const flat = [...newSet].join(' ');
  for (const needle of ['690|997', '39.50|59.50']) assert.ok(flat.includes(needle), needle);
});

test('built html is markup only, links to its own pricing section and keeps the footer', () => {
  assert.ok(!/<style|<script/i.test(builtHtml));
  assert.ok(!/<style|<script/i.test(builtCss + builtJs));
  for (const text of [builtHtml, builtJs]) {
    assert.ok(!/camp-snooze-sleep-coaching#pricing-section/.test(text));
    assert.ok(!/camp-snooze-sleep-coaching#camp-value/.test(text));
  }
  assert.ok(builtHtml.includes('id="camp-pricing"'));
  assert.ok(builtHtml.includes('href="#camp-pricing"'));
  assert.ok(builtHtml.includes('snooze-footer-clean'));
  assert.ok(builtCss.includes('#camp-vsl-page .snooze-container') && builtCss.includes('#camp-vsl-page .pricing{'));
  assert.ok(!builtCss.includes('/*') && !builtJs.includes('/*'));
});

test('built js carries the pricing module and the captions file, injects Wistia, guards double runs', () => {
  new (require('node:vm').Script)(builtJs);
  assert.equal(typeof pricing.boot, 'function');
  if (captions) assert.ok(builtJs.includes(JSON.stringify(captions).replace(/</g, '\\u003c')));
  else assert.ok(builtJs.includes('WEBVTT'));
  assert.ok(builtJs.includes("root.dataset.campReady"));
  assert.ok(builtJs.includes('DOMContentLoaded'));
  assert.ok(builtJs.includes('MutationObserver'));
  assert.ok(builtJs.includes('data-pricing-ready'));
  assert.ok(builtJs.includes('https://fast.wistia.com/assets/external/E-v1.js'));
  assert.ok(builtJs.includes('createObjectURL'));
});

test('Kade rulings: no qualifying lines, hero video and copy, 32 Google reviews, clip in How it works', () => {
  for (const phrase of ['Your answers stay on this page', "One parent", 'Shared experiences', 'Individual results vary', 'word for word',
    'Review the current price', 'One camp at a time', 'does not confirm suitability', 'Prefer to read']) {
    assert.ok(!builtHtml.includes(phrase) && !builtJs.includes(phrase), phrase);
  }
  assert.ok(builtHtml.includes('Read the reviews from previous Camp participants'));
  assert.ok(builtHtml.includes('wistia_async_ud1nugmerp'));
  assert.ok(builtHtml.includes('<p class="duration">How Camp works</p><h2>Here’s how your two weeks at Camp work.</h2><p>Sally walks you through it, from your personalised plan to daily Roll Call.<br>It’s the same approach she’s used to help thousands of families get better sleep.</p>'));
  assert.ok(builtHtml.includes('Join over 100+ families'));
  assert.equal((builtHtml.match(/<blockquote><p>/g) || []).length, 32);
  assert.equal((builtHtml.match(/googleg_48dp\.png/g) || []).length, 32);
  assert.ok(builtHtml.includes('A look inside Camp · 29 seconds'));
  assert.ok(builtHtml.includes('how-camp-4x5.mp4') && builtHtml.includes('how-camp-4x5-poster.jpg'));
  assert.ok(builtHtml.indexOf('rhythm-film') > builtHtml.indexOf('id="how-camp-works"') && builtHtml.indexOf('rhythm-film') < builtHtml.indexOf('id="camp-pricing"'));
  assert.ok(builtHtml.includes('Friday before Camp'));
  assert.ok(builtHtml.includes('Cancel ongoing membership anytime'));
});

test('price formatting matches old formatPriceNum', () => {
  assert.equal(pricing.priceText('690', ' USD'), '$690 USD');
  assert.equal(pricing.priceText('5250'), '$5,250');
  assert.equal(pricing.priceText('3500'), '$3,500');
  assert.equal(pricing.priceText('39.50', ' AUD a month'), '$39.50 AUD a month');
  assert.equal(pricing.priceText('59.50'), '$59.50');
});

test('currency selection: stored preference, then Australia timezone, else USD', () => {
  assert.equal(pricing.currencyFor('USD', 'Australia/Melbourne'), 'USD');
  assert.equal(pricing.currencyFor('AUD', 'America/New_York'), 'AUD');
  assert.equal(pricing.currencyFor(null, 'Australia/Melbourne'), 'AUD');
  assert.equal(pricing.currencyFor(null, 'Australia/Perth'), 'AUD');
  assert.equal(pricing.currencyFor(null, 'America/New_York'), 'USD');
  assert.equal(pricing.currencyFor(null, 'Europe/London'), 'USD');
  assert.equal(pricing.currencyFor(null, 'Pacific/Auckland'), 'USD');
  assert.equal(pricing.currencyFor('EUR', 'Australia/Melbourne'), 'USD');
  assert.equal(pricing.currencyFor(null, ''), 'USD');
});

test('currency falls back to USD when Intl throws', () => {
  const saved = globalThis.Intl;
  globalThis.Intl = undefined;
  try {
    assert.equal(pricing.currencyFor(null), 'USD');
  } finally {
    globalThis.Intl = saved;
  }
});

test('checkout URL per cohort and currency', () => {
  const usd = new URL(pricing.checkoutUrl('USD', 21, '', 'https://www.joinsnooze.com/camp-snooze-program'));
  const aud = new URL(pricing.checkoutUrl('AUD', 21, '', 'https://www.joinsnooze.com/camp-snooze-program'));
  assert.equal(usd.origin + usd.pathname, pricing.CONFIG.usdCheckoutUrl);
  assert.equal(aud.origin + aud.pathname, pricing.CONFIG.audCheckoutUrl);
  assert.equal(usd.searchParams.get('cohort'), '21');
  assert.equal(aud.searchParams.get('cohort'), '21');
  const none = new URL(pricing.checkoutUrl('USD', null, ''));
  assert.equal(none.searchParams.has('cohort'), false);
});

test('attribution passthrough: utm_*, fbclid, gclid, cohort_* kept; others dropped; explicit cohort wins', () => {
  const search = '?utm_source=meta&utm_campaign=camp-direct&utm_content=ad1&fbclid=F1&gclid=G1&cohort=99&cohort_hint=a&email=x%40y.com&ref=zzz';
  const url = new URL(pricing.checkoutUrl('AUD', 21, search, 'https://www.joinsnooze.com/camp-snooze-program'));
  const q = url.searchParams;
  assert.equal(q.get('utm_source'), 'meta');
  assert.equal(q.get('utm_campaign'), 'camp-direct');
  assert.equal(q.get('utm_content'), 'ad1');
  assert.equal(q.get('fbclid'), 'F1');
  assert.equal(q.get('gclid'), 'G1');
  assert.equal(q.get('cohort'), '21');
  assert.equal(q.get('cohort_hint'), 'a');
  assert.equal(q.has('email'), false);
  assert.equal(q.has('ref'), false);
  const inboundOnly = new URL(pricing.checkoutUrl('USD', null, '?cohort=7&utm_medium=cpc'));
  assert.equal(inboundOnly.searchParams.get('cohort'), '7');
  assert.equal(inboundOnly.searchParams.get('utm_medium'), 'cpc');
});

test('DST-correct Melbourne call instants', () => {
  assert.equal(new Date(pricing.melbourneCallStart('2026-12-07')).toISOString(), '2026-12-06T23:00:00.000Z');
  assert.equal(new Date(pricing.melbourneCallStart('2026-07-06')).toISOString(), '2026-07-06T00:00:00.000Z');
  assert.equal(new Date(pricing.melbourneCallStart('2026-04-03')).toISOString(), '2026-04-02T23:00:00.000Z');
  assert.equal(new Date(pricing.melbourneCallStart('2026-04-06')).toISOString(), '2026-04-06T00:00:00.000Z');
  assert.equal(new Date(pricing.melbourneCallStart('2026-10-03')).toISOString(), '2026-10-03T00:00:00.000Z');
  assert.equal(new Date(pricing.melbourneCallStart('2026-10-05')).toISOString(), '2026-10-04T23:00:00.000Z');
  assert.equal(pricing.melbourneCallStart('nope'), null);
});

test('next Melbourne call picks today or tomorrow in Melbourne', () => {
  const before = Date.parse('2026-12-06T22:00:00Z');
  assert.equal(new Date(pricing.nextMelbourneCallStart(before)).toISOString(), '2026-12-06T23:00:00.000Z');
  const after = Date.parse('2026-12-06T23:30:00Z');
  assert.equal(new Date(pricing.nextMelbourneCallStart(after)).toISOString(), '2026-12-07T23:00:00.000Z');
});

const SUMMER = pricing.melbourneCallStart('2026-12-07');
const WINTER = pricing.melbourneCallStart('2026-07-06');

const expected = [
  ['America/New_York', SUMMER, 'Sunday 6–7pm EST (your time) · Monday 10–11am Melbourne (AEDT)', false],
  ['America/New_York', WINTER, 'Sunday 8–9pm EDT (your time) · Monday 10–11am Melbourne (AEST)', false],
  ['America/Los_Angeles', SUMMER, 'Sunday 3–4pm PST (your time) · Monday 10–11am Melbourne (AEDT)', false],
  ['America/Los_Angeles', WINTER, 'Sunday 5–6pm PDT (your time) · Monday 10–11am Melbourne (AEST)', false],
  ['Europe/London', SUMMER, 'Sunday 11pm–Monday 12am GMT (your time) · Monday 10–11am Melbourne (AEDT)', true],
  ['Europe/London', WINTER, 'Monday 1–2am BST (your time) · Monday 10–11am Melbourne (AEST)', true],
  ['Europe/Amsterdam', SUMMER, 'Monday 12–1am', true],
  ['Europe/Amsterdam', WINTER, 'Monday 2–3am', true],
  ['Australia/Perth', SUMMER, 'Monday 7–8am AWST (your time) · Monday 10–11am Melbourne (AEDT)', false],
  ['Australia/Perth', WINTER, 'Monday 8–9am AWST (your time) · Monday 10–11am Melbourne (AEST)', false],
  ['Australia/Melbourne', SUMMER, 'Monday 10–11am Melbourne (AEDT)', false],
  ['Australia/Melbourne', WINTER, 'Monday 10–11am Melbourne (AEST)', false]
];

for (const [tz, start, text, overnight] of expected) {
  test('weekday call display ' + tz + ' ' + new Date(start).toISOString(), () => {
    const result = pricing.formatCall(start, tz, 'weekday');
    if (tz === 'Europe/Amsterdam') {
      assert.ok(result.text.startsWith(text + ' '), result.text);
      assert.ok(result.text.endsWith(' (your time) · Monday 10–11am Melbourne (' + (start === SUMMER ? 'AEDT' : 'AEST') + ')'), result.text);
    } else {
      assert.equal(result.text, text);
    }
    assert.equal(result.overnight, overnight);
    assert.equal(result.melbourneOnly, tz === 'Australia/Melbourne');
  });
}

test('visitor timezone that resolves identically to Melbourne shows Melbourne only', () => {
  for (const [tz, date] of [['Australia/Sydney', SUMMER], ['Australia/Sydney', WINTER], ['Australia/Hobart', SUMMER], ['Australia/Canberra', WINTER]]) {
    const r = pricing.formatCall(date, tz, 'weekday');
    assert.equal(r.melbourneOnly, true, tz);
    assert.ok(r.text.endsWith('Melbourne (' + (date === SUMMER ? 'AEDT' : 'AEST') + ')'));
    assert.ok(!r.text.includes('your time'));
  }
  const brisbaneSummer = pricing.formatCall(SUMMER, 'Australia/Brisbane', 'weekday');
  assert.equal(brisbaneSummer.melbourneOnly, false);
  assert.ok(brisbaneSummer.text.startsWith('Monday 9–10am AEST (your time)'), brisbaneSummer.text);
  const brisbaneWinter = pricing.formatCall(WINTER, 'Australia/Brisbane', 'weekday');
  assert.equal(brisbaneWinter.melbourneOnly, true);
});

test('overnight note threshold: 22:00 inclusive to 06:00 exclusive', () => {
  const at = (tz) => pricing.formatCall(SUMMER, tz, 'weekday');
  assert.equal(at('Etc/GMT+2').overnight, false);
  assert.equal(at('Etc/GMT+1').overnight, true);
  assert.equal(at('Etc/GMT').overnight, true);
  assert.equal(at('Etc/GMT-5').overnight, true);
  assert.equal(at('Etc/GMT-6').overnight, true);
  assert.equal(at('Etc/GMT-7').overnight, false);
  assert.equal(at('Etc/GMT-8').overnight, false);
  assert.equal(at('Asia/Kolkata').overnight, true);
  assert.ok(at('Asia/Kolkata').text.startsWith('Monday 4:30–5:30am GMT+5:30'), at('Asia/Kolkata').text);
});

test('overnight note copy makes no promise beyond recordings and the forum', () => {
  const note = pricing.OVERNIGHT_NOTE;
  assert.match(note, /overnight/);
  assert.match(note, /recorded/);
  assert.match(note, /forum/);
  assert.ok(!/[—–]/.test(note));
  assert.ok(!/guarantee|promise|always|replay/i.test(note));
});

test('daily mode drops weekdays and says which day it falls on for the visitor', () => {
  const ny = pricing.formatCall(SUMMER, 'America/New_York', 'daily');
  assert.equal(ny.text, '6–7pm EST the day before (your time) · 10–11am Melbourne (AEDT)');
  const perth = pricing.formatCall(SUMMER, 'Australia/Perth', 'daily');
  assert.equal(perth.text, '7–8am AWST (your time) · 10–11am Melbourne (AEDT)');
  const mel = pricing.formatCall(WINTER, 'Australia/Melbourne', 'daily');
  assert.equal(mel.text, '10–11am Melbourne (AEST)');
});

test('fallback shows Melbourne wording only when Intl or the zone fails', () => {
  const bad = pricing.formatCall(SUMMER, 'Not/AZone', 'weekday');
  assert.equal(bad.text, '10–11am Melbourne time');
  assert.equal(bad.overnight, false);
  const saved = globalThis.Intl;
  globalThis.Intl = undefined;
  try {
    const r = pricing.formatCall(SUMMER, 'America/New_York', 'weekday');
    assert.equal(r.text, '10–11am Melbourne time');
    assert.equal(r.overnight, false);
  } finally {
    globalThis.Intl = saved;
  }
});

test('intake close shows the visitor time with Melbourne alongside, across DST', () => {
  assert.equal(
    pricing.closeLabel('2026-12-05T23:00:00Z', 'America/New_York'),
    'Saturday 5 Dec, 6:00pm EST (your time) · Sunday 6 Dec, 10:00am Melbourne (AEDT)'
  );
  assert.equal(
    pricing.closeLabel('2026-07-04T00:00:00Z', 'America/Los_Angeles'),
    'Friday 3 Jul, 5:00pm PDT (your time) · Saturday 4 Jul, 10:00am Melbourne (AEST)'
  );
  assert.equal(pricing.closeLabel('2026-12-05T23:00:00Z', 'Australia/Melbourne'), 'Sunday 6 Dec, 10:00am Melbourne (AEDT)');
  assert.equal(pricing.closeLabel('', 'Australia/Melbourne'), '');
});

test('cohort card: checkout link per cohort and currency, first roll call, overnight note, escaping', () => {
  const cohort = { cohort_number: 21, state: 'open', seats_remaining: 15, start_date: '2026-12-07', access_friday: '2026-12-04', checkout_close_at: '2026-12-05T23:00:00Z' };
  const ctx = { currency: 'AUD', search: '?utm_source=meta&fbclid=F1', pageHref: 'https://www.joinsnooze.com/camp-snooze-program', timeZone: 'Europe/London', nowMs: Date.parse('2026-12-01T00:00:00Z') };
  const html = pricing.cohortHtml(cohort, ctx);
  const href = /href="([^"]*offers[^"]*)"/.exec(html)[1].replace(/&amp;/g, '&');
  const url = new URL(href);
  assert.equal(url.origin + url.pathname, pricing.CONFIG.audCheckoutUrl);
  assert.equal(url.searchParams.get('cohort'), '21');
  assert.equal(url.searchParams.get('utm_source'), 'meta');
  assert.equal(url.searchParams.get('fbclid'), 'F1');
  assert.ok(html.includes('data-checkout'));
  assert.ok(html.includes('First roll call: Sunday 11pm–Monday 12am GMT (your time) · Monday 10–11am Melbourne (AEDT)'));
  assert.ok(html.includes('data-camp-overnight'));
  assert.ok(html.includes('Starts Monday 7 Dec 2026'));
  assert.ok(html.includes('Intake closes'));
  assert.ok(html.includes('Closes in 4 days'));
  const mel = pricing.cohortHtml(cohort, Object.assign({}, ctx, { timeZone: 'Australia/Melbourne', currency: 'USD' }));
  assert.ok(!mel.includes('data-camp-overnight'));
  assert.ok(mel.includes(pricing.CONFIG.usdCheckoutUrl));
  const evil = pricing.cohortHtml(Object.assign({}, cohort, { cohort_number: '1"><script>' }), ctx);
  assert.ok(!evil.includes('<script>'));
});

test('full or closed cohorts route to the waitlist, not checkout', () => {
  const base = { cohort_number: 22, seats_remaining: 0, start_date: '2027-01-11' };
  const ctx = { currency: 'USD', search: '', pageHref: 'https://www.joinsnooze.com/x', timeZone: 'Australia/Melbourne', nowMs: 0 };
  const full = pricing.cohortHtml(Object.assign({ state: 'full' }, base), ctx);
  assert.ok(full.includes('Join Camp #22 Waitlist'));
  assert.ok(full.includes('mailto:camp@joinsnooze.com?subject=Camp%20Snooze%20waitlist'));
  assert.ok(!full.includes('data-checkout'));
  assert.ok(full.includes('All 15 places are taken'));
  const closed = pricing.cohortHtml(Object.assign({ state: 'closed' }, base), ctx);
  assert.ok(closed.includes('This intake is closed'));
  const low = pricing.cohortHtml(Object.assign({}, base, { state: 'low', seats_remaining: 1 }), ctx);
  assert.ok(low.includes('1 place left'));
  assert.ok(pricing.cohortHtml(Object.assign({}, base, { state: 'low', seats_remaining: 3 }), ctx).includes('Only 3 places left'));
});

test('cohort selection and waitlist target follow the old page', () => {
  const a = { cohort_number: 1, state: 'full' };
  const b = { cohort_number: 2, state: 'filling' };
  assert.equal(pricing.chooseCohort([a, b]), b);
  assert.equal(pricing.chooseCohort([a]), a);
  assert.equal(pricing.waitlistTarget({ CAMP_WAITLIST_TARGET: '#x' }, null), '#x');
  assert.equal(pricing.waitlistTarget({}, { querySelector: () => ({}) }), '#waitlist-section');
  assert.equal(pricing.waitlistTarget({}, { querySelector: () => null }), pricing.CONFIG.waitlistMailto);
});

test('fallback card still offers checkout', () => {
  const html = pricing.fallbackHtml();
  assert.ok(html.includes(pricing.CONFIG.usdCheckoutUrl));
  assert.ok(html.includes('data-checkout'));
  assert.ok(html.includes('Live availability is taking a moment to update. You can still continue to checkout.'));
});

test('dateLabel and countdown match the old page', () => {
  assert.equal(pricing.dateLabel('2026-09-28'), 'Monday 28 Sept 2026');
  assert.equal(pricing.dateLabel(''), 'Dates to be confirmed');
  assert.equal(pricing.countdownLabel('2026-12-05T00:00:00Z', Date.parse('2026-12-04T00:00:00Z')), 'Closes in 1 day');
  assert.equal(pricing.countdownLabel('2026-12-05T00:00:00Z', Date.parse('2026-12-05T00:00:00Z')), '');
});

const storyIds = ['CSID_ALICIA', 'CSID_CHELSI', 'CSID_CHANTELLE', 'CSID_PENNY'];
const storySection = /(<section id="camp-stories"[^>]*>[\s\S]*?<\/section>)/.exec(builtHtml)?.[1] || '';

test('Camp stories sits immediately above the review wall', () => {
  assert.ok(storySection);
  const afterStories = builtHtml.slice(builtHtml.indexOf(storySection) + storySection.length);
  assert.match(afterStories, /^\s*<section id="camp-wall"/);
  assert.match(storySection, /aria-labelledby="camp-stories-title"/);
  assert.match(storySection, /<p class="cw-kicker cs-kicker">Camp stories<\/p>/);
  assert.match(storySection, /id="camp-stories-title">Hear it from Camp parents<\/h2>/);
});

test('Camp stories has four cards in order with unique embed ids and the approved captions', () => {
  const cards = [...storySection.matchAll(/<figure class="cs-card">([\s\S]*?)<\/figure>/g)];
  const names = ['Alicia E.', 'Chelsi B.', 'Chantelle C.', 'Penny C.'];
  const slugs = ['alicia-e', 'chelsi-b', 'chantelle-c', 'penny-c'];
  assert.equal(cards.length, storyIds.length);
  for (const [index, [, card]] of cards.entries()) {
    const id = storyIds[index];
    assert.ok(card.includes('data-wistia-id="' + id + '"'));
    assert.ok(card.includes('data-story="' + slugs[index] + '"'));
    assert.ok(card.includes('>' + names[index] + '</span><span>Camp Snooze parent</span>'));
    assert.equal(builtHtml.split(id).length - 1, 1);
    assert.ok(!builtJs.includes(id) && !builtCss.includes(id));
  }
});

test('Camp stories ships markup only with no pre-initialized Wistia embeds', () => {
  assert.doesNotMatch(storySection, /\bstyle\s*=|<(?:style|script)\b|wistia_async_/i);
});

test('Camp stories code lazy-loads at 600px, coordinates playback with the VSL and tracks first plays', () => {
  assert.match(builtJs, /new IntersectionObserver\([\s\S]*?rootMargin:\s*'600px'/);
  assert.match(builtJs, /id:\s*'_all',[\s\S]*?video\.bind\('play'/);
  assert.match(builtJs, /video\.hashedId\(\)[\s\S]*?id !== vslId[\s\S]*?other\.pause\(\)/);
  assert.match(builtJs, /!playedStories\.has\(story\)[\s\S]*?window\.dataLayer\.push\(\{ event: 'camp_story_play', story, surface: 'camp_snooze_program' \}\)/);
});

test('Camp stories shares the only Wistia script reference with the VSL', () => {
  assert.equal(((builtJs + builtHtml).match(/E-v1\.js/g) || []).length, 1);
});

console.log('\n' + count + ' tests passed');
