/**
 * Guards the four script blocks that make up the Kajabi checkout Header tracking
 * code field, which is the single most dangerous paste target on this site.
 *
 * Why this file exists: on 2026-08-16 a paste from a repo file holding one of the
 * live field's three blocks came one keystroke from deleting Meta Advanced
 * Matching and the UTM attribution capture from every live checkout. The UTM
 * block in particular reached production without ever entering git, and then sat
 * in the field with no owner document and no test of any kind. This is that test.
 *
 * It asserts the SHAPE and INVARIANTS of each block, not its exact bytes, so
 * ordinary edits are allowed and the things that would silently break attribution
 * are not.
 *
 * Run: node apps/snooze-website/kajabi-deployment/global/js/__tests__/checkout-header-blocks.test.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const deployRoot = path.join(here, '..', '..', '..');
const headerFile = path.join(deployRoot, 'global', 'html', 'checkout-header-tracking.html');
const siteHeaderFile = path.join(deployRoot, 'global', 'html', 'site-header-page-scripts.html');
const identityFragment = path.join(deployRoot, 'global', 'js', 'checkout-identity-capture.js');

const html = fs.readFileSync(headerFile, 'utf8');
const siteHtml = fs.readFileSync(siteHeaderFile, 'utf8');

let checks = 0;
let failures = 0;
function assert(condition, label) {
  checks += 1;
  if (!condition) {
    failures += 1;
    console.error('FAIL ' + label);
  }
}

// ---------------------------------------------------------------------------
// The field holds four blocks. Losing any one of them is a silent regression.
// ---------------------------------------------------------------------------
const BLOCKS = [
  ['GTM / Stape loader', 'load.ss.joinsnooze.com'],
  ['Meta Advanced Matching', 'SnoozeMetaMatch'],
  ['UTM attribution capture', 'snooze_utm_attribution'],
  ['Checkout identity capture', 'SnoozeCheckoutIdentity'],
];
for (const [name, marker] of BLOCKS) {
  assert(html.includes(marker), `checkout header still contains the ${name} block`);
}

// Every block must be inside a script tag and every script tag must parse.
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
assert(scripts.length >= 3, 'checkout header has at least three script tags');
for (const [i, m] of scripts.entries()) {
  const attrs = m[1] || '';
  if (/\bsrc=/.test(attrs) || /type=["'](?!text\/javascript)/.test(attrs)) continue;
  if (!m[2].trim()) continue;
  let ok = true;
  try {
    // eslint-disable-next-line no-new-func
    new Function(m[2]);
  } catch (e) {
    ok = false;
    console.error('  syntax: ' + e.message);
  }
  assert(ok, `checkout header script block ${i + 1} parses as JavaScript`);
}

// ---------------------------------------------------------------------------
// UTM attribution capture. Owner: the paid media attribution join. It writes the
// store that checkout-identity-capture reads and that the order webhook needs to
// keep a purchase attached to the campaign that paid for it.
// ---------------------------------------------------------------------------
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
for (const key of UTM_KEYS) {
  assert(html.includes(`'${key}'`), `UTM block still captures ${key}`);
}
assert(html.includes("'snooze_utm_attribution'"), 'UTM block still writes its documented storage key');
assert(/30 \* 24 \* 60 \* 60 \* 1000/.test(html), 'UTM block keeps the 30 day first-touch window');
assert(/captured_at/.test(html), 'UTM block still stamps captured_at, which is how staleness is judged');
// utm_content carries the ad name and is the join to meta_ads_daily. Renaming or
// normalising it breaks the creative-level attribution silently.
assert(
  !/utm_content[^\n]*toLowerCase\(\)/.test(html),
  'UTM block does not normalise utm_content, which must stay verbatim for the ad_name join',
);

// ---------------------------------------------------------------------------
// Checkout identity capture. Must stay byte-identical to its fragment, in both
// files it is inlined into, or the two copies drift and nobody notices.
// ---------------------------------------------------------------------------
const fragment = fs.readFileSync(identityFragment, 'utf8');
const body = fragment.slice(fragment.indexOf('(function () {')).trim();
function inlinedBlock(source) {
  const start = source.lastIndexOf('<script>');
  const end = source.indexOf('</script>', start);
  const raw = source.slice(start + '<script>'.length, end);
  return raw.split('\n').map((l) => (l.startsWith('  ') ? l.slice(2) : l)).join('\n').trim();
}
assert(inlinedBlock(html) === body, 'checkout header identity block matches checkout-identity-capture.js');
assert(inlinedBlock(siteHtml) === body, 'site header identity block matches checkout-identity-capture.js');

// It runs everywhere now, because Kajabi's checkout collects the email inside a
// Stripe iframe and the page cannot read it. Reinstating a path guard would make
// the block inert again, which is exactly the state it was found in.
assert(
  !/indexOf\('\/checkout'\) > -1/.test(fragment),
  'identity capture is not gated to /checkout paths',
);
// It must read every attribution store, not just its own.
for (const key of ['snooze_utm_attribution', 'snooze_attribution_first_touch', 'snooze_attribution_current_touch']) {
  assert(fragment.includes(key), `identity capture reads the ${key} store`);
}

// ---------------------------------------------------------------------------
// GA4 session id parsing. Measured on a live order in ME-010: the join succeeded,
// the client id was correct and the session id was the whole dollar-delimited
// cookie tail, which GA4 cannot stitch. Asserted on the real cookie value.
// ---------------------------------------------------------------------------
assert(!/return segs\[2\];/.test(fragment), 'session id is not the raw third cookie segment');
assert(/\^s\?\(\\d\+\)/.test(fragment), 'session id is parsed with the leading-s digits pattern');

// The parse itself, run against the value read from the live browser on 2026-08-17
// and against the older bare-number format, so both keep working.
function parseSessionId(cookieValue) {
  const segs = decodeURIComponent(cookieValue).split('.');
  if (segs.length < 3) return null;
  const m = String(segs[2] || '').match(/^s?(\d+)/);
  return m ? m[1] : null;
}
assert(
  parseSessionId('GS2.1.s1786946916$o1$g1$t1786946942$j34$l0$h1685109018') === '1786946916',
  'session id parses out of the live dollar-delimited cookie',
);
assert(parseSessionId('GS1.1.1755300123.4.0.1755300456.0.0.0') === '1755300123',
  'session id still parses out of the older bare-number cookie');
assert(parseSessionId('GS2.1.') === null, 'a truncated cookie yields no session id rather than a bad one');
assert(parseSessionId('GS2.1.xyz') === null, 'an unparseable segment yields no session id');

// ---------------------------------------------------------------------------
// No credential may ever sit in a paste target.
// ---------------------------------------------------------------------------
for (const [label, source] of [['checkout header', html], ['site header', siteHtml]]) {
  assert(!/EAA[A-Za-z0-9]{20,}/.test(source), `${label} contains no Meta access token`);
  assert(!/api_secret=[A-Za-z0-9_-]{10,}/.test(source), `${label} contains no GA4 api_secret`);
}

console.log(`${checks - failures}/${checks} assertions passed`);
process.exit(failures === 0 ? 0 : 1);
