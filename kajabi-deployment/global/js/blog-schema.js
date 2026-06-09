/**
 * SNOOZE BLOG SCHEMA (BlogPosting JSON-LD)
 * site-audit-2026-06, Wave 1 item 3 (Jun 9, 2026)
 *
 * Emits BlogPosting JSON-LD on every Kajabi blog post from the page's own DOM.
 * One deploy covers all 36 posts (the blog is CMS-only with no per-post repo
 * template). The script self-gates to /blog/<slug> pages and no-ops elsewhere.
 *
 * Location: Kajabi Settings > Site Details > Footer Page Scripts. Wrap this file's
 * contents in <script> ... </script> when pasting. Source of truth is this file
 * in git (kept as plain .js so it lints and node --check passes).
 *
 * Selectors verified against the live blog DOM on Jun 9, 2026:
 *   title  .blog-post-body__title
 *   date   .blog-post-body__date   (e.g. "Sep 29, 2024")
 *   image  meta property og:image
 *   author Sally Woods  (the site's sole author; /author/sally-woods)
 *
 * After paste: validate with Google Rich Results Test + Schema.org validator,
 * then re-crawl a sample post (crawl_page.py --force) and confirm jsonld_types
 * includes BlogPosting.
 */
(function () {
  'use strict';

  const path = location.pathname.replace(/\/+$/, '');
  // Only blog posts: /blog/<slug>. The /blog index and non-blog pages are skipped.
  if (path.indexOf('/blog/') !== 0 || path === '/blog') return;
  if (document.querySelector('script[data-snooze-schema="blogposting"]')) return;

  const metaContent = (sel) => {
    const el = document.querySelector(sel);
    return el ? (el.getAttribute('content') || '').trim() : '';
  };
  const text = (sel) => {
    const el = document.querySelector(sel);
    return el ? (el.textContent || '').trim() : '';
  };
  const isoDate = (s) => {
    if (!s) return '';
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return '';
    // Build from LOCAL components. The displayed date is a calendar date with no
    // time; toISOString() would shift it across the UTC boundary in many zones.
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  const canonical = document.querySelector('link[rel="canonical"]');
  const url = canonical ? canonical.href : location.href;
  const title = text('.blog-post-body__title') || metaContent('meta[property="og:title"]') || document.title;
  const image = metaContent('meta[property="og:image"]');
  const description = metaContent('meta[name="description"]') || metaContent('meta[property="og:description"]');
  const published = isoDate(text('.blog-post-body__date'));

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: title,
    url,
    author: {
      '@type': 'Person',
      '@id': 'https://www.joinsnooze.com/author/sally-woods#person',
      name: 'Sally Woods',
      url: 'https://www.joinsnooze.com/about-sally'
    },
    publisher: { '@id': 'https://www.joinsnooze.com/#organization' }
  };
  if (description) data.description = description;
  if (image) data.image = image;
  if (published) {
    data.datePublished = published;
    data.dateModified = published;
  }

  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.setAttribute('data-snooze-schema', 'blogposting');
  s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
})();
