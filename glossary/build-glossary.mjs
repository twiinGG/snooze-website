#!/usr/bin/env node
/**
 * Snooze Sleep & Parenting Glossary - page generator (A-Z edition)
 *
 * Reads terms.json (single source of truth) and writes a SINGLE self-contained
 * Kajabi code block to:
 *   kajabi-deployment/pages/website/glossary/sleep-glossary.kajabi-codeblock.html
 * plus the bare body (for reference / a future website page) to:
 *   kajabi-deployment/pages/website/glossary/sleep-glossary.html
 *
 * Design: alphabetical (A-Z) list with letter headings + a sticky A-Z jump bar.
 * Categories are TAGS on each term plus a filter, not page sections. Each term
 * shows its name, tag and one-line definition (always visible, good for AEO);
 * "Read more" expands the depth + related terms + a context-relevant CTA. All
 * content stays in the DOM (toggled by a CSS class), so it is fully scrapable.
 *
 * Per-term CTAs point to the most relevant LIVE page (verified published on the
 * Kajabi site). The mapping lives here, not in terms.json, so the term content
 * stays untouched. Zero dependencies. Run: node build-glossary.mjs
 *
 * House style (AI-WRITING-RULES.md): no em dashes, no en dashes (use "to" for
 * ranges), no Oxford comma.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(readFileSync(join(HERE, 'terms.json'), 'utf8'));
const OUTDIR = join(HERE, '..', 'kajabi-deployment', 'pages', 'website', 'glossary');
const { meta, categories, terms } = DATA;

const WRAP = 'snooze-glossary';

// --- live destinations (all verified published on joinsnooze.com) ----------
const DEST = {
  newbornHelp:  { url: '/newborn-baby-sleep-help',          label: 'Newborn sleep help (0 to 3 months)' },
  newbornGuide: { url: '/newborn-sleep-guide',              label: 'Read the Newborn Sleep Guide' },
  help34:       { url: '/3-4-month-baby-sleep-help',        label: '3 to 4 month sleep help' },
  course34:     { url: '/3-4-month-baby-sleep-course',      label: 'Explore the 3 to 4 Month Course' },
  help512:      { url: '/5-12-month-baby-sleep-help',       label: '5 to 12 month sleep help' },
  course512:    { url: '/5-12-month-baby-sleep-course',     label: 'Explore the 5 to 12 Month Course' },
  toddlerHelp:  { url: '/toddler-sleep-help',               label: 'Toddler sleep help' },
  toddlerKit:   { url: '/toddler-toolkit',                  label: 'Explore the Toddler Toolkit' },
  consult:      { url: '/one-on-one-sleep-consultations',   label: 'Book 1:1 with Sally' },
  products:     { url: '/recommended-products',             label: 'See recommended products' },
  blog:         { url: '/blog',                             label: 'Read more on the blog' },
};

// term slug -> destination key (most relevant live page for that term)
const CTA = {
  'circadian-rhythm': 'newbornHelp', 'sleep-cycle': 'help34', 'sleep-pressure': 'help512',
  'melatonin': 'newbornHelp', 'active-sleep': 'newbornHelp', 'sleep-onset': 'help34',
  'fourth-trimester': 'newbornGuide',
  'wake-windows': 'help512', 'catnap': 'help34', 'false-start': 'help512', 'split-night': 'consult',
  'early-morning-waking': 'help512', 'nap-transition': 'help512', 'overtired': 'help512',
  'undertired': 'help512', 'day-night-confusion': 'newbornHelp',
  'self-settling': 'course34', 'drowsy-but-awake': 'help34', 'extinction-burst': 'help512',
  'cry-it-out': 'consult', 'controlled-comforting': 'consult', 'gradual-withdrawal': 'consult',
  'pick-up-put-down': 'help34', 'bridging-nap': 'help512', 'resettling': 'help512', 'the-pause': 'newbornHelp',
  'sleep-regression': 'help34', 'sleep-association': 'help512', 'witching-hour': 'newbornHelp',
  'nap-strike': 'toddlerHelp', 'separation-anxiety': 'toddlerHelp', 'second-night-syndrome': 'newbornHelp',
  'overstimulation': 'newbornHelp',
  'dream-feed': 'newbornHelp', 'cluster-feeding': 'newbornHelp', 'contact-nap': 'newbornHelp',
  'responsive-feeding': 'newbornHelp', 'swaddling': 'newbornHelp', 'white-noise': 'products',
  'growth-spurt': 'newbornHelp',
};

// --- guards ----------------------------------------------------------------
const slugs = new Set(terms.map((t) => t.slug));
const catName = Object.fromEntries(categories.map((c) => [c.id, c.name]));
const problems = [];
for (const t of terms) {
  if (/[—–]/.test(t.shortDef + t.context)) problems.push(`em/en dash in "${t.slug}"`);
  if (!catName[t.category]) problems.push(`unknown category "${t.category}" in "${t.slug}"`);
  for (const r of t.related || []) if (!slugs.has(r)) problems.push(`"${t.slug}" relates to missing "${r}"`);
  if (!CTA[t.slug]) problems.push(`no CTA mapping for "${t.slug}"`);
  else if (!DEST[CTA[t.slug]]) problems.push(`"${t.slug}" CTA key "${CTA[t.slug]}" not in DEST`);
}
if (problems.length) { console.error('Data problems:\n - ' + problems.join('\n - ')); process.exit(1); }

// --- helpers ---------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const termById = (slug) => terms.find((t) => t.slug === slug);
const indent = (s, n) => s.split('\n').map((l) => (l ? ' '.repeat(n) + l : l)).join('\n');
const sortKey = (t) => t.term.toLowerCase().replace(/^(the|a|an)\s+/, '');
const letterOf = (t) => sortKey(t).charAt(0).toUpperCase();

const sorted = [...terms].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
const groups = {};
for (const t of sorted) (groups[letterOf(t)] = groups[letterOf(t)] || []).push(t);
const presentLetters = Object.keys(groups).sort();
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// --- term entry (accordion: head + always-visible def + collapsible more) ---
function renderTerm(t) {
  const d = DEST[CTA[t.slug]];
  const related = (t.related || [])
    .map((r) => `<a class="gl-chip" href="#${attr(r)}">${esc(termById(r).term)}</a>`)
    .join('');
  const aliases = (t.aliases || []).join(', ');
  const relatedLine = related
    ? `\n    <p class="gl-related"><span class="gl-related-label">Related</span>${related}</p>`
    : '';
  return `<article class="gl-term" id="${attr(t.slug)}" data-cat="${attr(t.category)}"${aliases ? ` data-aliases="${attr(aliases)}"` : ''}>
  <div class="gl-head">
    <span class="gl-name">${esc(t.term)}</span>
    <span class="gl-tag" data-cat="${attr(t.category)}" role="button" tabindex="0">${esc(catName[t.category])}</span>
  </div>
  <p class="gl-def">${esc(t.shortDef)}</p>
  <div class="gl-more">
    <p class="gl-context">${esc(t.context)}</p>${relatedLine}
    <a class="gl-cta" href="${attr(d.url)}">${esc(d.label)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
  </div>
  <div class="gl-foot"><button type="button" class="gl-toggle" aria-expanded="false">more...</button></div>
</article>`;
}

const listHtml = presentLetters.map((L) => {
  const items = groups[L].map((t) => indent(renderTerm(t), 6)).join('\n');
  return `    <section class="gl-lg" data-letter="${L}">
      <h2 class="gl-letter" id="letter-${L.toLowerCase()}">${L}</h2>
${items}
    </section>`;
}).join('\n');

const azHtml = ALPHABET.map((L) =>
  groups[L]
    ? `    <a href="#letter-${L.toLowerCase()}" data-letter="${L}">${L}</a>`
    : `    <span data-letter="${L}" class="is-off">${L}</span>`
).join('\n');

const catPills = [`      <button type="button" class="gl-cat-pill is-active" data-cat="all">All terms</button>`]
  .concat(categories.map((c) => `      <button type="button" class="gl-cat-pill" data-cat="${attr(c.id)}">${esc(c.name)}</button>`))
  .join('\n');

// --- JSON-LD (DefinedTermSet + BreadcrumbList) ------------------------------
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'DefinedTermSet', '@id': meta.pageUrl, name: meta.termSetName,
      description: meta.pageIntro, url: meta.pageUrl,
      publisher: { '@type': 'Organization', name: meta.publisherName },
      hasDefinedTerm: terms.map((t) => ({
        '@type': 'DefinedTerm', '@id': `${meta.pageUrl}#${t.slug}`, name: t.term,
        description: t.shortDef, url: `${meta.pageUrl}#${t.slug}`, inDefinedTermSet: meta.pageUrl,
      })),
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.joinsnooze.com/' },
        { '@type': 'ListItem', position: 2, name: meta.pageTitle, item: meta.pageUrl },
      ],
    },
  ],
};
const jsonLd = `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`;

// --- CSS (scoped to #snooze-glossary) --------------------------------------
const css = `#${WRAP}{--c-coral:#F43357;--c-coral-hover:#D62646;--c-navy:#1F293B;--c-cream:#FAF7F4;--c-beige:#F2EDEA;--c-white:#fff;--c-sage:#7C8A98;--c-text:#161E2A;--c-muted:#64748B;--fb:'Poppins',sans-serif;--fh:'Playfair Display',serif;--shadow:0 2px 10px rgba(0,0,0,.06);font-family:var(--fb);color:var(--c-text);line-height:1.6;background:var(--c-cream);width:100%;overflow-x:hidden;isolation:isolate}
#${WRAP} *,#${WRAP} *::before,#${WRAP} *::after{box-sizing:border-box}
#${WRAP} h1,#${WRAP} h2{font-family:var(--fh);color:var(--c-navy);line-height:1.2;margin:0}
#${WRAP} a{text-decoration:none;transition:.2s ease}
#${WRAP} .gl-hero{background:linear-gradient(180deg,var(--c-white),var(--c-cream));text-align:center;padding:48px 20px 28px}
#${WRAP} .gl-crumb{font-size:.85rem;color:var(--c-muted);margin-bottom:14px}
#${WRAP} .gl-crumb a{color:var(--c-coral)}#${WRAP} .gl-crumb span{margin:0 6px;color:var(--c-sage)}
#${WRAP} .gl-hero h1{font-size:clamp(2.1rem,5vw,3.4rem)}
#${WRAP} .gl-intro{max-width:680px;margin:14px auto 24px;font-size:1.08rem;color:var(--c-muted)}
#${WRAP} .gl-search{position:relative;max-width:520px;margin:0 auto 18px}
#${WRAP} .gl-search input{width:100%;padding:14px 20px 14px 46px;font:inherit;font-size:1rem;color:var(--c-text);background:var(--c-white);border:1px solid rgba(15,23,42,.12);border-radius:50px;box-shadow:var(--shadow)}
#${WRAP} .gl-search input:focus{outline:none;border-color:var(--c-coral);box-shadow:0 0 0 4px rgba(244,51,87,.16)}
#${WRAP} .gl-search i{position:absolute;left:18px;top:50%;transform:translateY(-50%);color:var(--c-sage)}
#${WRAP} .gl-cats{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
#${WRAP} .gl-cat-pill{font:inherit;font-size:.88rem;font-weight:600;color:var(--c-navy);background:var(--c-white);border:1px solid rgba(15,23,42,.12);border-radius:50px;padding:8px 16px;cursor:pointer;transition:.2s}
#${WRAP} .gl-cat-pill:hover{border-color:var(--c-coral);color:var(--c-coral)}
#${WRAP} .gl-cat-pill.is-active{background:var(--c-coral);border-color:var(--c-coral);color:#fff}
#${WRAP} .gl-az{position:sticky;top:0;z-index:20;display:flex;flex-wrap:nowrap;justify-content:center;gap:2px;overflow-x:auto;padding:10px 12px;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);border-bottom:1px solid rgba(15,23,42,.08)}
#${WRAP} .gl-az a,#${WRAP} .gl-az span{flex:0 0 auto;min-width:26px;text-align:center;font-size:.82rem;font-weight:700;padding:5px 0;border-radius:6px;color:var(--c-navy)}
#${WRAP} .gl-az a:hover{background:var(--c-coral);color:#fff}
#${WRAP} .gl-az .is-off{color:#cbd5e1;pointer-events:none}
#${WRAP} .gl-list{max-width:820px;margin:0 auto;padding:8px 20px 24px}
#${WRAP} .gl-noresults{text-align:center;color:var(--c-muted);padding:40px 0}
#${WRAP} .gl-lg{margin-top:18px}
#${WRAP} .gl-letter{font-size:1.6rem;color:var(--c-coral);padding:10px 0 8px;border-bottom:2px solid rgba(244,51,87,.18);margin-bottom:14px;scroll-margin-top:64px}
#${WRAP} .gl-term{background:var(--c-white);border:1px solid rgba(15,23,42,.07);border-left:4px solid var(--c-coral);border-radius:12px;padding:18px 22px;margin-bottom:12px;scroll-margin-top:64px}
#${WRAP} .gl-head{display:flex;align-items:center;gap:12px}
#${WRAP} .gl-name{font-family:var(--fh);font-size:1.3rem;font-weight:600;color:var(--c-navy);flex:1 1 auto}
#${WRAP} .gl-tag{flex:0 0 auto;font-size:.72rem;font-weight:600;color:var(--c-navy);background:rgba(124,138,152,.16);border-radius:50px;padding:4px 11px;cursor:pointer;white-space:nowrap}
#${WRAP} .gl-tag:hover{background:rgba(124,138,152,.3)}
#${WRAP} .gl-def{font-size:1.02rem;font-weight:500;color:var(--c-text);margin:10px 0 0}
#${WRAP} .gl-more{display:none;margin-top:14px;padding-top:14px;border-top:1px solid rgba(15,23,42,.07)}
#${WRAP} .gl-term.is-open .gl-more{display:block}
#${WRAP} .gl-context{color:var(--c-muted);margin:0 0 14px}
#${WRAP} .gl-related{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 14px}
#${WRAP} .gl-related-label{font-size:.8rem;font-weight:600;color:var(--c-sage);margin-right:2px}
#${WRAP} .gl-chip{font-size:.82rem;font-weight:500;color:var(--c-coral-hover);background:rgba(244,51,87,.08);border-radius:50px;padding:5px 12px}
#${WRAP} .gl-chip:hover{background:rgba(244,51,87,.18)}
#${WRAP} .gl-cta{display:inline-block;font-size:.92rem;font-weight:600;color:var(--c-coral)}
#${WRAP} .gl-cta i{font-size:.78rem;margin-left:4px}
#${WRAP} .gl-cta:hover{color:var(--c-coral-hover)}
#${WRAP} .gl-foot{display:flex;justify-content:flex-end;margin-top:10px}
#${WRAP} .gl-toggle{font:inherit;font-style:italic;font-size:.85rem;color:var(--c-coral);background:none;border:none;padding:0;cursor:pointer}
#${WRAP} .gl-toggle:hover{color:var(--c-coral-hover);text-decoration:underline}
#${WRAP} .gl-band{background:var(--c-beige);text-align:center;padding:56px 20px}
#${WRAP} .gl-band h2{font-size:clamp(1.6rem,4vw,2.3rem)}
#${WRAP} .gl-band p{max-width:640px;margin:14px auto 24px;color:var(--c-muted)}
#${WRAP} .gl-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:14px 32px;background:var(--c-coral);color:#fff;font-weight:600;border-radius:50px;box-shadow:0 6px 18px rgba(244,51,87,.22)}
#${WRAP} .gl-btn:hover{background:var(--c-coral-hover);transform:translateY(-2px);color:#fff}
@media(max-width:768px){#${WRAP} .gl-name{font-size:1.15rem}#${WRAP} .gl-term{padding:16px}#${WRAP} .gl-az a,#${WRAP} .gl-az span{min-width:22px}}`;

// --- JS --------------------------------------------------------------------
const js = `(function(){function init(){var root=document.getElementById('${WRAP}');if(!root)return;
var search=root.querySelector('#gl-search-input');var terms=[].slice.call(root.querySelectorAll('.gl-term'));
var lgs=[].slice.call(root.querySelectorAll('.gl-lg'));var noRes=root.querySelector('#gl-noresults');var activeCat='all';
function apply(){var q=(search&&search.value.trim().toLowerCase())||'';var any=false;
terms.forEach(function(t){var okC=activeCat==='all'||t.getAttribute('data-cat')===activeCat;
var hay=(t.textContent+' '+(t.getAttribute('data-aliases')||'')).toLowerCase();var okS=q===''||hay.indexOf(q)!==-1;
var show=okC&&okS;t.hidden=!show;if(show)any=true;});
var present={};lgs.forEach(function(g){var v=g.querySelectorAll('.gl-term:not([hidden])').length;g.hidden=v===0;if(v)present[g.getAttribute('data-letter')]=1;});
root.querySelectorAll('.gl-az [data-letter]').forEach(function(el){el.classList.toggle('is-off',!present[el.getAttribute('data-letter')]);});
if(noRes)noRes.hidden=any;}
root.querySelectorAll('.gl-cat-pill').forEach(function(p){p.addEventListener('click',function(){activeCat=p.getAttribute('data-cat');
root.querySelectorAll('.gl-cat-pill').forEach(function(x){x.classList.toggle('is-active',x===p);});apply();});});
root.querySelectorAll('.gl-tag').forEach(function(tag){function go(e){e.stopPropagation();var c=tag.getAttribute('data-cat');
var pill=root.querySelector('.gl-cat-pill[data-cat="'+c+'"]');if(pill)pill.click();var h=root.querySelector('.gl-hero');if(h)h.scrollIntoView({behavior:'smooth'});}
tag.addEventListener('click',go);tag.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){go(e);}});});
if(search)search.addEventListener('input',apply);
terms.forEach(function(t){var b=t.querySelector('.gl-toggle');if(b)b.addEventListener('click',function(){var o=t.classList.toggle('is-open');b.textContent=o?'less...':'more...';b.setAttribute('aria-expanded',o?'true':'false');});});
function openHash(){var id=(location.hash||'').replace(/[^#\\w-]/g,'');if(id.length>1){var el=root.querySelector(id);if(el&&el.classList&&el.classList.contains('gl-term')){el.classList.add('is-open');var b=el.querySelector('.gl-toggle');if(b){b.textContent='less...';b.setAttribute('aria-expanded','true');}}}}
root.querySelectorAll('.gl-chip').forEach(function(c){c.addEventListener('click',function(){setTimeout(openHash,0);});});
window.addEventListener('hashchange',openHash);openHash();
try{if(typeof window.SnoozeUserDetection!=='undefined'){var s=window.SnoozeUserDetection.getUserStatus();var slot=root.querySelector('#gl-cta-slot');
if(slot&&s==='snooze-member'){slot.innerHTML='<a href="'+(window.SNOOZE_LIBRARY_URL||'/snooze-library')+'" class="gl-btn">Go to your Library</a>';}}}catch(e){}}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}})();`;

// --- body ------------------------------------------------------------------
const body = `<div id="${WRAP}">
  <section class="gl-hero">
    <nav class="gl-crumb" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">/</span> ${esc(meta.pageTitle)}</nav>
    <h1>${esc(meta.pageTitle)}</h1>
    <p class="gl-intro">${esc(meta.pageIntro)}</p>
    <div class="gl-search">
      <i class="fas fa-magnifying-glass" aria-hidden="true"></i>
      <input type="search" id="gl-search-input" placeholder="Search terms, e.g. wake windows" aria-label="Search the glossary" autocomplete="off">
    </div>
    <div class="gl-cats">
${catPills}
    </div>
  </section>

  <nav class="gl-az" aria-label="Jump to letter">
${azHtml}
  </nav>

  <div class="gl-list">
    <p class="gl-noresults" id="gl-noresults" hidden>No terms match that search. Try a different word.</p>
${listHtml}
  </div>

  <section class="gl-band">
    <h2>When you need more than a definition</h2>
    <p>Knowing what's going on is a great start. When you're ready to actually change it, that's what Snooze is for. You get the full plan for your baby's age and stage, plus me and my team beside you the whole way.</p>
    <div id="gl-cta-slot"><a href="/" class="gl-btn">Discover Snooze</a></div>
  </section>
</div>`;

// --- write: split bundle (Kajabi Custom Code has separate HTML/CSS/JS fields)
const BUNDLE = join(OUTDIR, 'bundle');
mkdirSync(BUNDLE, { recursive: true });
const fontImports = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap');\n@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');\n\n`;

// HTML field = body + JSON-LD (JSON-LD must stay a <script type="application/ld+json">,
// so it lives in the HTML field, NOT the JS field).
const htmlField = `${body}\n${jsonLd}\n`;
// CSS field = font imports + scoped styles (no <style> wrapper; the field adds it).
const cssField = `${fontImports}${css}\n`;
// JS field = behaviour only (no <script> wrapper; the field adds it).
const jsField = `${js}\n`;
// Convenience: everything in one block, for a single HTML-only code area.
const selfContained = `<style>\n${cssField}</style>\n${body}\n<script>${js}<\/script>\n${jsonLd}\n`;

writeFileSync(join(BUNDLE, 'sleep-glossary.html'), htmlField, 'utf8');
writeFileSync(join(BUNDLE, 'sleep-glossary.css'), cssField, 'utf8');
writeFileSync(join(BUNDLE, 'sleep-glossary.js'), jsField, 'utf8');
writeFileSync(join(BUNDLE, 'sleep-glossary.combined.html'), selfContained, 'utf8');

const b = (s) => Buffer.byteLength(s, 'utf8');
console.log('A-Z glossary built ->', BUNDLE);
console.log(`  terms: ${terms.length} | letters: ${presentLetters.join('')}`);
console.log(`  sleep-glossary.html  ${b(htmlField)} bytes (HTML field: body + JSON-LD)`);
console.log(`  sleep-glossary.css   ${b(cssField)} bytes (CSS field)`);
console.log(`  sleep-glossary.js    ${b(jsField)} bytes (JS field)`);
console.log(`  sleep-glossary.combined.html ${b(selfContained)} bytes (single HTML block)`);
