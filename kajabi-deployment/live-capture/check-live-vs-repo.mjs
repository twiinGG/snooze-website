/**
 * Diffs the live Kajabi checkout tracking fields against the repository file,
 * in BOTH directions.
 *
 * One direction is not enough and this is not a style point. Checking that the
 * repo's lines appear in live detects additions only and is blind to deletions.
 * On 2026-08-16 that blindness came one keystroke from wiping Meta Advanced
 * Matching and the UTM attribution capture off every live checkout, because a
 * stale note said the field held the loader alone.
 *
 * Usage:
 *   1. Paste the live field into A4-checkout-header-FULL.txt. Whole field, as it
 *      appears in Kajabi. Nothing else needs filling in.
 *   2. node check-live-vs-repo.mjs
 *
 * Exit 0 = safe to overwrite. Exit 1 = do not paste, read the report.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoHeader = path.join(here, '..', 'global', 'html', 'checkout-header-tracking.html');

// Each block is identified by a marker that cannot plausibly appear in another
// block, so ordering and formatting differences never confuse one for another.
const BLOCKS = [
  { key: 'loader', label: 'GTM / Stape loader', marker: 'load.ss.joinsnooze.com' },
  { key: 'am', label: 'Meta Advanced Matching', marker: 'SnoozeMetaMatch' },
  { key: 'utm', label: 'UTM attribution capture', marker: 'snooze_utm_attribution' },
  { key: 'identity', label: 'Checkout identity capture', marker: 'SnoozeCheckoutIdentity' },
];

// The block ME-009 added. Live is expected to be missing exactly this one and
// nothing else.
const EXPECTED_NEW = 'identity';

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

/** Compare on content, not on whitespace the editor may have reflowed. */
function normalise(text) {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .join('\n');
}

function splitScripts(text) {
  const blocks = [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  // Kajabi stores the field verbatim, but a copy can lose the wrapper. If there
  // are no script tags, treat the whole paste as one block; the marker matching
  // below still identifies what is present.
  return blocks.length ? blocks : [text];
}

function present(text, marker) {
  return normalise(text).includes(marker);
}

function firstDifference(a, b) {
  const la = normalise(a).split('\n');
  const lb = normalise(b).split('\n');
  for (let i = 0; i < Math.max(la.length, lb.length); i += 1) {
    if (la[i] !== lb[i]) {
      return { line: i + 1, live: la[i] ?? '(end of live)', repo: lb[i] ?? '(end of repo)' };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------

const liveFull = read(path.join(here, 'A4-checkout-header-FULL.txt'));
const perBlock = BLOCKS.map((b) => ({
  ...b,
  pasted: read(path.join(here, `A4-block-${BLOCKS.indexOf(b) + 1}-${b.key === 'loader' ? 'stape-loader' : b.key === 'am' ? 'meta-advanced-matching' : 'utm-attribution'}.txt`)),
}));

const live = liveFull.trim()
  ? liveFull
  : perBlock.map((b) => b.pasted).filter((t) => t.trim()).join('\n');

if (!live.trim()) {
  console.error('Nothing to check.');
  console.error('Paste the live checkout Header tracking code into');
  console.error('  A4-checkout-header-FULL.txt');
  console.error('then run this again.');
  process.exit(1);
}

const repo = read(repoHeader);
if (!repo.trim()) {
  console.error(`Repository file is empty or missing: ${repoHeader}`);
  process.exit(1);
}

const liveBlocks = splitScripts(live);
const repoBlocks = splitScripts(repo);

console.log('Live field:  ' + normalise(live).split('\n').length + ' significant lines, '
  + liveBlocks.length + ' script block(s)');
console.log('Repo file:   ' + normalise(repo).split('\n').length + ' significant lines, '
  + repoBlocks.length + ' script block(s)');
console.log('');

const rows = [];
for (const b of BLOCKS) {
  const inLive = present(live, b.marker);
  const inRepo = present(repo, b.marker);
  rows.push({ ...b, inLive, inRepo });
}

const w = Math.max(...rows.map((r) => r.label.length));
console.log('BLOCK'.padEnd(w) + '   LIVE   REPO   VERDICT');
console.log('-'.repeat(w + 30));

let deletions = [];
let unexpectedNew = [];
let changed = [];
const reportedPairs = new Map();

for (const r of rows) {
  let verdict;
  if (r.inLive && r.inRepo) {
    // The loader and Advanced Matching live inside one <script> tag, so two
    // markers can resolve to the same block. Report that block's difference
    // once, against the first marker that claimed it.
    const li = liveBlocks.findIndex((t) => present(t, r.marker));
    const ri = repoBlocks.findIndex((t) => present(t, r.marker));
    const pairKey = li + ':' + ri;
    const diff = firstDifference(liveBlocks[li] ?? '', repoBlocks[ri] ?? '');
    if (diff) {
      if (reportedPairs.has(pairKey)) {
        verdict = 'DIFFERS, same script tag as ' + reportedPairs.get(pairKey);
      } else {
        reportedPairs.set(pairKey, r.label);
        verdict = 'DIFFERS at line ' + diff.line;
        changed.push({ ...r, diff });
      }
    } else {
      verdict = 'identical';
    }
  } else if (r.inLive && !r.inRepo) {
    verdict = 'ONLY LIVE, would be DELETED';
    deletions.push(r);
  } else if (!r.inLive && r.inRepo) {
    verdict = r.key === EXPECTED_NEW ? 'only repo, expected (new)' : 'ONLY REPO, unexpected';
    if (r.key !== EXPECTED_NEW) unexpectedNew.push(r);
  } else {
    verdict = 'absent from both';
  }
  console.log(r.label.padEnd(w) + '   ' + (r.inLive ? ' yes' : '  no') + '   '
    + (r.inRepo ? ' yes' : '  no') + '   ' + verdict);
}

// Anything live that no known marker claims. This is the catch-all that stops a
// block nobody documented from being silently overwritten.
const unclaimed = liveBlocks.filter((t) => !BLOCKS.some((b) => present(t, b.marker)));
console.log('');
if (unclaimed.length) {
  console.log('UNRECOGNISED LIVE BLOCKS: ' + unclaimed.length);
  unclaimed.forEach((t, i) => {
    const n = normalise(t).split('\n');
    console.log(`  block ${i + 1}: ${n.length} lines, starts: ${n[0]?.slice(0, 90)}`);
  });
  console.log('');
}

for (const c of changed) {
  console.log(`FIRST DIFFERENCE in ${c.label}, significant line ${c.diff.line}:`);
  console.log('  live: ' + c.diff.live.slice(0, 160));
  console.log('  repo: ' + c.diff.repo.slice(0, 160));
  console.log('');
}

const blocking = deletions.length + unexpectedNew.length + unclaimed.length;

if (blocking === 0 && changed.length === 0) {
  console.log('SAFE TO OVERWRITE.');
  console.log('Live differs from the repo file by exactly the checkout identity capture,');
  console.log('which is the block ME-009 added and which is meant to be new.');
  console.log('');
  console.log('After the paste, verify with a cache-busted read asserting SnoozeCheckoutIdentity.');
  console.log('Never verify by a greyed-out Save button. The field sits inside a modal behind');
  console.log('the "Edit header tracking code" button, and a paste into the closed modal writes');
  console.log('to a hidden editor and does not save.');
  process.exit(0);
}

console.log('DO NOT PASTE YET.');
if (deletions.length) {
  console.log('  ' + deletions.length + ' block(s) live but not in the repo file. An overwrite');
  console.log('  would delete them from every checkout. Rebuild the repo file from live first.');
}
if (unexpectedNew.length) {
  console.log('  ' + unexpectedNew.length + ' block(s) in the repo file that are not live and were');
  console.log('  not expected to be new. Work out where they came from before shipping them.');
}
if (unclaimed.length) {
  console.log('  ' + unclaimed.length + ' live block(s) match no known marker. Something is live');
  console.log('  that this repository does not describe.');
}
if (changed.length) {
  console.log('  ' + changed.length + ' block(s) present in both but not identical. Decide which');
  console.log('  side is right, per block, before overwriting the field.');
}
process.exit(1);
