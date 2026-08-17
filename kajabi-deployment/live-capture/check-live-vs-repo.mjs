/**
 * Diffs live Kajabi fields against their canonical repository files, in BOTH
 * directions.
 *
 * One direction is not enough and this is not a style point. Checking that the
 * repo's lines appear in live detects additions only and is blind to deletions.
 * On 2026-08-16 that blindness came one keystroke from wiping Meta Advanced
 * Matching and the UTM attribution capture off every live checkout, because a
 * stale note said the field held the loader alone.
 *
 * Usage:
 *   1. Paste a live field into its blank .txt file in this folder. Whole field,
 *      exactly as it came out of Kajabi.
 *   2. node check-live-vs-repo.mjs            checks every file that has content
 *      node check-live-vs-repo.mjs A4         checks one target by id prefix
 *
 * Empty files are skipped, so paste only what you have.
 *
 * Exit 0 = every checked target is safe to overwrite. Exit 1 = at least one is
 * not, and the report says which and why.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dep = path.join(here, '..');

/**
 * mode 'blocks' compares script block by script block, identified by a marker
 * so reordering cannot confuse one for another. mode 'plain' compares a whole
 * CSS or JS field as lines.
 *
 * expectedRepoOnly names content the repo is deliberately ahead on, so shipping
 * it is the point rather than a surprise.
 */
const TARGETS = [
  {
    id: 'A2',
    label: 'Theme Custom Code CSS',
    where: 'Customizer, Theme Custom Code, CSS',
    live: 'A2-theme-custom-code-CSS-FULL.txt',
    repo: 'global/css/theme-custom-code.css',
    mode: 'plain',
  },
  {
    id: 'A3',
    label: 'Theme Custom Code JS',
    where: 'Customizer, Theme Custom Code, JS',
    live: 'A3-theme-custom-code-JS-FULL.txt',
    repo: 'global/js/theme-custom-code.js',
    mode: 'plain',
  },
  {
    id: 'A4',
    label: 'Checkout Header tracking code',
    where: 'Settings, Checkout, Edit header tracking code (inside the modal)',
    live: 'A4-checkout-header-FULL.txt',
    liveParts: [
      'A4-block-1-stape-loader.txt',
      'A4-block-2-meta-advanced-matching.txt',
      'A4-block-3-utm-attribution.txt',
    ],
    repo: 'global/html/checkout-header-tracking.html',
    mode: 'blocks',
    blocks: [
      { key: 'loader', label: 'GTM / Stape loader', marker: 'load.ss.joinsnooze.com' },
      { key: 'am', label: 'Meta Advanced Matching', marker: 'SnoozeMetaMatch' },
      { key: 'utm', label: 'UTM attribution capture', marker: 'snooze_utm_attribution' },
      { key: 'identity', label: 'Checkout identity capture', marker: 'SnoozeCheckoutIdentity' },
    ],
    expectedRepoOnly: ['identity'],
  },
  {
    id: 'A5',
    label: 'Checkout Footer tracking code',
    where: 'Settings, Checkout, Footer tracking code',
    live: 'A5-checkout-footer-FULL.txt',
    repo: 'global/js/kajabi-checkout-tracking.js',
    mode: 'plain',
    // PASTE-MAP records the live footer as EMPTY as of 2026-07-27 and the repo
    // file as intended but not deployed. Write EMPTY in the capture file to
    // confirm that from the screen; anything else in it is a finding.
  },
  {
    id: 'C-linktree-CSS',
    label: '/links landing page CSS',
    where: 'that landing page theme, CSS field',
    live: 'C-linktree-CSS-FULL.txt',
    repo: 'pages/landing/linktree/linktree-landing-page.css',
    mode: 'plain',
  },
  {
    id: 'C-linktree-JS',
    label: '/links landing page JS',
    where: 'that landing page theme, JS field',
    live: 'C-linktree-JS-FULL.txt',
    repo: 'pages/landing/linktree/linktree-landing-page.js',
    mode: 'plain',
  },
  {
    id: 'C-trial-thank-you-CSS',
    label: 'Trial thank-you page CSS',
    where: 'that landing page theme, CSS field',
    live: 'C-trial-thank-you-CSS-FULL.txt',
    repo: 'pages/landing/7-day-trial-thank-you/thank-you-page.css',
    mode: 'plain',
  },
  {
    id: 'C-trial-thank-you-JS',
    label: 'Trial thank-you page JS',
    where: 'that landing page theme, JS field',
    live: 'C-trial-thank-you-JS-FULL.txt',
    repo: 'pages/landing/7-day-trial-thank-you/thank-you-page.js',
    mode: 'plain',
  },
  {
    id: 'C-membership-welcome-CSS',
    label: 'Membership welcome page CSS',
    where: 'that landing page theme, CSS field',
    live: 'C-membership-welcome-CSS-FULL.txt',
    repo: 'pages/landing/snooze-membership-welcome/welcome-page.css',
    mode: 'plain',
  },
  {
    id: 'C-membership-welcome-JS',
    label: 'Membership welcome page JS',
    where: 'that landing page theme, JS field',
    live: 'C-membership-welcome-JS-FULL.txt',
    repo: 'pages/landing/snooze-membership-welcome/welcome-page.js',
    mode: 'plain',
  },
];

const filter = process.argv[2];

// Capture files are gitignored, so a fresh clone has none. Create on demand
// rather than making the reader mkdir their way to a working tool.
function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    try {
      fs.writeFileSync(file, '');
    } catch {}
    return '';
  }
}

/** Compare on content, not on whitespace an editor may have reflowed. */
function lines(text) {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

function normalise(text) {
  return lines(text).join('\n');
}

function splitScripts(text) {
  const blocks = [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  // Kajabi stores the field verbatim, but a copy can lose the wrapper. Without
  // script tags, treat the paste as one block; marker matching still works.
  return blocks.length ? blocks : [text];
}

function present(text, marker) {
  return normalise(text).includes(marker);
}

function firstDifference(a, b) {
  const la = lines(a);
  const lb = lines(b);
  for (let i = 0; i < Math.max(la.length, lb.length); i += 1) {
    if (la[i] !== lb[i]) {
      return { line: i + 1, live: la[i] ?? '(end of live)', repo: lb[i] ?? '(end of repo)' };
    }
  }
  return null;
}

/** Set difference both ways, so a deletion is as visible as an addition. */
function bothWays(liveText, repoText) {
  const lv = lines(liveText);
  const rp = lines(repoText);
  const lvSet = new Set(lv);
  const rpSet = new Set(rp);
  return {
    liveOnly: [...new Set(lv.filter((l) => !rpSet.has(l)))],
    repoOnly: [...new Set(rp.filter((l) => !lvSet.has(l)))],
    liveCount: lv.length,
    repoCount: rp.length,
  };
}

// ---------------------------------------------------------------------------

function checkPlain(t) {
  const live = read(path.join(here, t.live));
  const repo = read(path.join(dep, t.repo));
  const problems = [];

  if (live.trim().toUpperCase() === 'EMPTY') {
    console.log('  live field confirmed EMPTY from the screen.');
    if (repo.trim()) {
      console.log(`  git holds ${lines(repo).length} significant lines that are not deployed.`);
      console.log('  Nothing to lose by pasting. Everything in the repo file would be new.');
    } else {
      console.log('  git holds nothing either. Nothing to do.');
    }
    return problems;
  }
  // A file that exists but holds nothing is the same problem as a missing one,
  // and it is the more dangerous of the two because the path resolves and the
  // map reads as covered. linktree-landing-page.js was 1 byte on 2026-08-16
  // while PASTE-MAP called that page the only complete trio.
  // 20 characters is below any real CSS or JS field and comfortably above a
  // stray keystroke. linktree-landing-page.js was one byte, the letter l,
  // committed in ME-005 and never noticed.
  const repoChars = normalise(repo).length;
  if (repoChars < 20) {
    const why = repo === '' ? 'MISSING' : `A PLACEHOLDER (${repo.length} byte(s): ${JSON.stringify(repo.slice(0, 40))})`;
    problems.push(`canonical repo file is ${repo === '' ? 'missing' : 'a placeholder'}: ${t.repo}`);
    console.log(`  REPO FILE IS ${why}: ${t.repo}`);
    console.log(`  Live has ${lines(live).length} significant lines and git has none of them.`);
    console.log('  Nothing can be diffed and nothing may be pasted from git: an overwrite');
    console.log('  would blank the live field. Save the live capture as the canonical file,');
    console.log('  commit it, then edit from there.');
    return problems;
  }

  const d = bothWays(live, repo);
  console.log(`  live ${d.liveCount} significant lines, repo ${d.repoCount}`);

  if (d.liveOnly.length === 0 && d.repoOnly.length === 0) {
    const pos = firstDifference(live, repo);
    if (!pos) {
      console.log('  identical');
      return problems;
    }
    console.log(`  same lines, different order, first at line ${pos.line}`);
    console.log(`    live: ${pos.live.slice(0, 140)}`);
    console.log(`    repo: ${pos.repo.slice(0, 140)}`);
    problems.push('ordering differs; decide whether that matters for this field');
    return problems;
  }

  if (d.liveOnly.length) {
    console.log(`  ONLY LIVE, would be DELETED by an overwrite: ${d.liveOnly.length} line(s)`);
    d.liveOnly.slice(0, 8).forEach((l) => console.log(`    - ${l.slice(0, 140)}`));
    if (d.liveOnly.length > 8) console.log(`    ... and ${d.liveOnly.length - 8} more`);
    problems.push(`${d.liveOnly.length} line(s) live but not in git`);
  }
  if (d.repoOnly.length) {
    console.log(`  ONLY REPO, would be ADDED by an overwrite: ${d.repoOnly.length} line(s)`);
    d.repoOnly.slice(0, 8).forEach((l) => console.log(`    + ${l.slice(0, 140)}`));
    if (d.repoOnly.length > 8) console.log(`    ... and ${d.repoOnly.length - 8} more`);
    // Additions are the normal reason to paste, so they are reported, not blocking.
  }
  return problems;
}

function checkBlocks(t) {
  let live = read(path.join(here, t.live));
  if (!live.trim() && t.liveParts) {
    live = t.liveParts.map((f) => read(path.join(here, f))).filter((x) => x.trim()).join('\n');
  }
  const repo = read(path.join(dep, t.repo));
  const problems = [];

  const liveBlocks = splitScripts(live);
  const repoBlocks = splitScripts(repo);
  console.log(`  live ${lines(live).length} significant lines in ${liveBlocks.length} script block(s), `
    + `repo ${lines(repo).length} in ${repoBlocks.length}`);

  const w = Math.max(...t.blocks.map((b) => b.label.length));
  const reportedPairs = new Map();
  const changed = [];

  for (const b of t.blocks) {
    const inLive = present(live, b.marker);
    const inRepo = present(repo, b.marker);
    let verdict;

    if (inLive && inRepo) {
      // The loader and Advanced Matching share one <script> tag, so two markers
      // can resolve to the same block. Report that block's difference once.
      const li = liveBlocks.findIndex((x) => present(x, b.marker));
      const ri = repoBlocks.findIndex((x) => present(x, b.marker));
      const pairKey = `${li}:${ri}`;
      const diff = firstDifference(liveBlocks[li] ?? '', repoBlocks[ri] ?? '');
      if (diff) {
        if (reportedPairs.has(pairKey)) {
          verdict = `DIFFERS, same script tag as ${reportedPairs.get(pairKey)}`;
        } else {
          reportedPairs.set(pairKey, b.label);
          verdict = `DIFFERS at line ${diff.line}`;
          changed.push({ ...b, diff });
        }
      } else {
        verdict = 'identical';
      }
    } else if (inLive && !inRepo) {
      verdict = 'ONLY LIVE, would be DELETED';
      problems.push(`${b.label} is live and not in git; an overwrite deletes it`);
    } else if (!inLive && inRepo) {
      const expected = (t.expectedRepoOnly ?? []).includes(b.key);
      verdict = expected ? 'only repo, expected (new)' : 'ONLY REPO, unexpected';
      if (!expected) problems.push(`${b.label} is in git, is not live, and was not expected to be new`);
    } else {
      verdict = 'absent from both';
    }
    console.log('  ' + b.label.padEnd(w) + '   ' + (inLive ? ' yes' : '  no') + '   '
      + (inRepo ? ' yes' : '  no') + '   ' + verdict);
  }

  const unclaimed = liveBlocks.filter((x) => !t.blocks.some((b) => present(x, b.marker)));
  if (unclaimed.length) {
    console.log(`  UNRECOGNISED LIVE BLOCKS: ${unclaimed.length}`);
    unclaimed.forEach((x, i) => {
      const n = lines(x);
      console.log(`    block ${i + 1}: ${n.length} lines, starts: ${(n[0] ?? '').slice(0, 90)}`);
    });
    problems.push(`${unclaimed.length} live block(s) match no known marker`);
  }

  for (const c of changed) {
    console.log(`  FIRST DIFFERENCE in ${c.label}, line ${c.diff.line}:`);
    console.log(`    live: ${c.diff.live.slice(0, 140)}`);
    console.log(`    repo: ${c.diff.repo.slice(0, 140)}`);
    problems.push(`${c.label} is present in both and not identical`);
  }

  return problems;
}

// ---------------------------------------------------------------------------

const selected = TARGETS.filter((t) => !filter || t.id.startsWith(filter));
if (selected.length === 0) {
  console.error(`No target matches "${filter}". Known ids: ${TARGETS.map((t) => t.id).join(', ')}`);
  process.exit(1);
}

// A blank capture file means "not captured yet", never "the live field is
// empty". Confirming an empty field takes the word EMPTY, so that silence is
// never mistaken for a result.
const withContent = selected.filter((t) => {
  const full = read(path.join(here, t.live)).trim();
  const parts = (t.liveParts ?? []).some((f) => read(path.join(here, f)).trim());
  return Boolean(full || parts);
});

if (withContent.length === 0) {
  console.error('Nothing to check. Every capture file is blank.');
  console.error('');
  console.error('Paste a live field into one of these, then run this again:');
  selected.forEach((t) => console.error(`  ${t.live.padEnd(38)} ${t.label}  (${t.where})`));
  process.exit(1);
}

const skipped = selected.filter((t) => !withContent.includes(t));
let failing = [];

for (const t of withContent) {
  console.log('');
  console.log(`=== ${t.id}: ${t.label}`);
  console.log(`    ${t.where}`);
  console.log(`    repo: ${t.repo}`);
  const problems = t.mode === 'blocks' ? checkBlocks(t) : checkPlain(t);
  if (problems.length) {
    failing.push({ t, problems });
    console.log('  VERDICT: DO NOT PASTE YET');
  } else {
    console.log('  VERDICT: safe to overwrite');
  }
}

console.log('');
console.log('='.repeat(60));
if (skipped.length) {
  console.log(`Skipped ${skipped.length} blank capture file(s): ${skipped.map((t) => t.id).join(', ')}`);
}
console.log(`Checked ${withContent.length}, safe ${withContent.length - failing.length}, blocked ${failing.length}`);

if (failing.length === 0) {
  console.log('');
  console.log('SAFE TO OVERWRITE.');
  console.log('After any paste, verify with a cache-busted read asserting a distinctive marker.');
  console.log('Confirm the marker exists in the source first with grep -c. Never verify by a');
  console.log('greyed-out Save button; check button.disabled in the DOM. The checkout header');
  console.log('field sits inside a modal behind "Edit header tracking code", and a paste into');
  console.log('the closed modal writes to a hidden editor and does not save.');
  process.exit(0);
}

console.log('');
for (const f of failing) {
  console.log(`${f.t.id} ${f.t.label}`);
  f.problems.forEach((p) => console.log(`  - ${p}`));
}
console.log('');
console.log('A line that is live and not in git is destroyed by an overwrite. Rebuild the');
console.log('canonical file from live before pasting anything back.');
process.exit(1);
