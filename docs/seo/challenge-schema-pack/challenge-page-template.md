# Challenge page template (schema/FAQ pattern)

Challenge pages share one content shape. Use when adding FAQ + schema to:

- `/catnapping` (reference files in `kajabi-deployment/pages/website/catnapping/`)
- `/early-rising`
- `/nap-transitions`
- `/sleep-regressions`
- `/bedtime-battles`
- `/night-wakings`

## Existing body order (keep it)

1. Title / H1 (problem + "what to do first")
2. Short lede + "Reviewed by Sally Woods… updated …"
3. Hero image
4. **What's going on**
5. **Is this normal?** (Usually normal / Worth working on / When to call your GP)
6. **First steps you can take today** (numbered)
7. **Free lead magnet** CTA
8. **Related sleep help** (3 sibling challenges)
9. **All the help, in one place** → Snooze membership

## What to add

| Asset | Placement |
|-------|-----------|
| `faq-section.html` | After First steps, before free guide (or after free guide). Must be **visible**. |
| `page-schema.jsonld.html` | End of page HTML or page-only code block |
| `panel-seo.md` | Kajabi Edit details only (not HTML) |

## Schema types

- `WebPage` (`mainEntity` → FAQPage)
- `FAQPage` only if FAQ HTML is on the page
- `BreadcrumbList` (Home → Find the right sleep help → This challenge)
- Reference global `@id`s:
  - Organization: `https://www.joinsnooze.com/#organization`
  - Person: `https://www.joinsnooze.com/author/sally-woods#person`
  - WebSite: `https://www.joinsnooze.com/#website`

## FAQ rules

- 4-6 questions
- Parent language (GSC + consult floor)
- Warm, supportive; no medical overclaim
- Schema text must match visible Q&A exactly

## Internal links to preserve

- Related challenges
- Free offer checkout on that page
- Membership: `/offers/z63s9VaR` or `/snooze-access`
- Hub: `/which-is-right-for-us`

## Cloning checklist

1. Copy catnapping FAQ + schema siblings into `pages/website/<slug>/`
2. Rewrite FAQ, URLs, breadcrumb name, panel SEO
3. Keep H1 pattern: `{Challenge}: why … and what to do first`
4. Test rich results before Kajabi paste
