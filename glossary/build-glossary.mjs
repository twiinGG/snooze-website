#!/usr/bin/env node
/**
 * Snooze Sleep & Parenting Glossary - page generator
 *
 * Reads terms.json (the single source of truth) and writes the Kajabi
 * website-page code block to:
 *   kajabi-deployment/pages/website/glossary/sleep-glossary.html
 *
 * The visible definition text and the JSON-LD schema are produced from the
 * same `shortDef`, so the structured data can never drift from what the page
 * shows (a Google requirement and the core of the AEO benefit).
 *
 * Zero dependencies. Run:  node build-glossary.mjs
 *
 * House style (AI-WRITING-RULES.md): no em dashes anywhere in output.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(readFileSync(join(HERE, 'terms.json'), 'utf8'));
const OUT = join(
  HERE,
  '..',
  'kajabi-deployment',
  'pages',
  'website',
  'glossary',
  'sleep-glossary.html'
);

const { meta, categories, links, terms } = DATA;

// --- guards ----------------------------------------------------------------
const slugs = new Set(terms.map((t) => t.slug));
const problems = [];
for (const t of terms) {
  if (/[—–]/.test(t.shortDef + t.context)) problems.push(`em/en dash in "${t.slug}"`);
  if (!categories.find((c) => c.id === t.category)) problems.push(`unknown category "${t.category}" in "${t.slug}"`);
  for (const r of t.related || []) if (!slugs.has(r)) problems.push(`"${t.slug}" relates to missing term "${r}"`);
  if (t.link && !links[t.link]) problems.push(`"${t.slug}" uses unknown link key "${t.link}"`);
}
if (problems.length) {
  console.error('Glossary data problems:\n - ' + problems.join('\n - '));
  process.exit(1);
}

// --- helpers ---------------------------------------------------------------
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const byCat = (id) => terms.filter((t) => t.category === id);
const termById = (slug) => terms.find((t) => t.slug === slug);

// --- visible HTML ----------------------------------------------------------
function renderTerm(t) {
  const related = (t.related || [])
    .map((r) => {
      const rt = termById(r);
      return `<a class="gl-chip" href="#${attr(rt.slug)}">${esc(rt.term)}</a>`;
    })
    .join('\n            ');
  const link = links[t.link];
  const aliases = (t.aliases || []).join(', ');
  return `      <article class="gl-term" id="${attr(t.slug)}"${aliases ? ` data-aliases="${attr(aliases)}"` : ''}>
        <h3 class="gl-term-title">${esc(t.term)}</h3>
        <p class="gl-term-def">${esc(t.shortDef)}</p>
        <p class="gl-term-context">${esc(t.context)}</p>
        <div class="gl-term-foot">
          ${related ? `<div class="gl-related"><span class="gl-related-label">Related:</span>
            ${related}
          </div>` : ''}
          ${link ? `<a class="gl-term-link" href="${attr(link.url)}">${esc(link.label)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : ''}
        </div>
      </article>`;
}

function renderCategory(c) {
  const items = byCat(c.id).map(renderTerm).join('\n\n');
  return `    <section class="gl-cat" id="cat-${attr(c.id)}">
      <div class="gl-cat-head">
        <h2 class="gl-cat-title">${esc(c.name)}</h2>
        <p class="gl-cat-blurb">${esc(c.blurb)}</p>
      </div>
      <div class="gl-term-list">
${items}
      </div>
    </section>`;
}

const navPills = categories
  .map((c) => `<a class="gl-nav-pill" href="#cat-${attr(c.id)}">${esc(c.name)}</a>`)
  .join('\n        ');

const sections = categories.map(renderCategory).join('\n\n');

// --- JSON-LD (@graph: DefinedTermSet + BreadcrumbList + FAQPage) -----------
const definedTerms = terms.map((t) => ({
  '@type': 'DefinedTerm',
  '@id': `${meta.pageUrl}#${t.slug}`,
  name: t.term,
  description: t.shortDef,
  url: `${meta.pageUrl}#${t.slug}`,
  inDefinedTermSet: meta.pageUrl,
}));

const faqEntities = terms
  .filter((t) => t.faq)
  .map((t) => ({
    '@type': 'Question',
    name: `What ${/s$/.test(t.term) ? 'are' : 'is'} ${t.term.replace(/\s*\(.*\)\s*$/, '')}?`,
    acceptedAnswer: { '@type': 'Answer', text: t.shortDef },
  }));

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'DefinedTermSet',
      '@id': meta.pageUrl,
      name: meta.termSetName,
      description: meta.pageIntro,
      url: meta.pageUrl,
      publisher: { '@type': 'Organization', name: meta.publisherName },
      hasDefinedTerm: definedTerms,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.joinsnooze.com/' },
        { '@type': 'ListItem', position: 2, name: meta.pageTitle, item: meta.pageUrl },
      ],
    },
    { '@type': 'FAQPage', mainEntity: faqEntities },
  ],
};

const jsonLd = JSON.stringify(graph, null, 2).replace(/</g, '\\u003c');

// --- assemble --------------------------------------------------------------
const html = `<div id="glossary-page">
<!-- ============================================
     SLEEP & PARENTING GLOSSARY
     GENERATED FILE - do not edit by hand.
     Source: apps/snooze-website/glossary/terms.json
     Rebuild: cd apps/snooze-website/glossary && node build-glossary.mjs
     Terms: ${terms.length} | Categories: ${categories.length}
     ============================================ -->

  <!-- Hero -->
  <section class="snooze-section gl-hero">
    <div class="snooze-container">
      <nav class="gl-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span aria-hidden="true">/</span> <span>${esc(meta.pageTitle)}</span>
      </nav>
      <h1>${esc(meta.pageTitle)}</h1>
      <p class="gl-intro">${esc(meta.pageIntro)}</p>
      <div class="gl-search">
        <input type="search" id="gl-search-input" class="gl-search-input" placeholder="Search terms, e.g. wake windows" aria-label="Search the glossary" autocomplete="off">
        <p class="gl-search-empty" id="gl-search-empty" hidden>No terms match that search. Try a different word.</p>
      </div>
      <nav class="gl-nav" aria-label="Jump to category">
        ${navPills}
      </nav>
    </div>
  </section>

  <!-- Terms -->
  <div class="snooze-container gl-body">
${sections}
  </div>

  <!-- CTA -->
  <section class="snooze-section gl-cta">
    <div class="snooze-container text-center">
      <h2>Stuck on more than a definition?</h2>
      <p class="max-800">Knowing the words is one thing, getting your child sleeping is another. The Snooze Method walks you through it step by step, with our team beside you the whole way.</p>
      <div id="gl-cta-slot" class="gl-cta-slot">
        <a href="/snooze" class="btn">Discover The Snooze Method</a>
      </div>
    </div>
  </section>

  <!-- Lightweight on-page search (progressive enhancement, scoped to this page) -->
  <script>
  (function () {
    var root = document.getElementById('glossary-page');
    if (!root) return;

    // On-page filter
    var input = root.querySelector('#gl-search-input');
    var empty = root.querySelector('#gl-search-empty');
    var termEls = Array.prototype.slice.call(root.querySelectorAll('.gl-term'));
    if (input) {
      input.addEventListener('input', function () {
        var q = input.value.trim().toLowerCase();
        var anyVisible = false;
        termEls.forEach(function (el) {
          var hay = (el.textContent + ' ' + (el.getAttribute('data-aliases') || '')).toLowerCase();
          var show = q === '' || hay.indexOf(q) !== -1;
          el.hidden = !show;
          if (show) anyVisible = true;
        });
        root.querySelectorAll('.gl-cat').forEach(function (cat) {
          var visible = cat.querySelectorAll('.gl-term:not([hidden])').length;
          cat.hidden = q !== '' && visible === 0;
        });
        if (empty) empty.hidden = anyVisible || q === '';
      });
    }

    // Context-aware CTA (degrades to the static link if detection is absent)
    try {
      if (typeof window.SnoozeUserDetection !== 'undefined') {
        var status = window.SnoozeUserDetection.getUserStatus();
        var slot = root.querySelector('#gl-cta-slot');
        var lib = window.SNOOZE_LIBRARY_URL || '/snooze-library';
        if (slot && status === 'snooze-member') {
          slot.innerHTML = '<a href="' + lib + '" class="btn">Go to your Library</a>';
        } else if (slot && status === 'logged-in-non-member') {
          slot.innerHTML = '<a href="/snooze" class="btn">Upgrade to Snooze</a>';
        }
      }
    } catch (e) { /* keep the static CTA */ }
  })();
  </script>

  <!-- Structured data: DefinedTermSet + BreadcrumbList + FAQPage -->
  <script type="application/ld+json">
${jsonLd}
  </script>
</div>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html, 'utf8');
console.log(`Wrote ${OUT}`);
console.log(`  ${terms.length} terms, ${categories.length} categories, ${faqEntities.length} FAQ entries`);
