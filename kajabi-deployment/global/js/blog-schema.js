document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const path = location.pathname.replace(/\/+$/, '');
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
      '@id': 'https://www.joinsnooze.com/about-sally#person',
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
});
