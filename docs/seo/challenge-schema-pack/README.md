# Challenge page SEO & schema pack (Aug 2026)

**Status:** Catnapping reference page is **wired** into `catnapping-page-complete.html` (Aug 2026). Sidecars remain for clone/diff. Do **not** redefine global Organization/Person on challenge pages.

**Repo paths used by this pack** (native `snooze-website` layout):

| Pack asset | Path |
|------------|------|
| Catnapping FAQ (visible) | `kajabi-deployment/pages/website/catnapping/faq-section.html` |
| Catnapping page JSON-LD | `kajabi-deployment/pages/website/catnapping/page-schema.jsonld.html` |
| Catnapping FAQ CSS | `kajabi-deployment/global/css/theme-custom-code.css` (`.snooze-faq` block, paste row A2) |
| Catnapping Kajabi panel SEO | `kajabi-deployment/pages/website/catnapping/panel-seo.md` |
| Catnapping install steps | `kajabi-deployment/pages/website/catnapping/INSTALL.md` |
| Challenge template notes | `docs/seo/challenge-schema-pack/challenge-page-template.md` |
| Rollout order | `docs/seo/challenge-schema-pack/ROLL_OUT.md` |
| Homepage panel SEO draft | `docs/seo/challenge-schema-pack/panel-seo-homepage.md` |
| Organization sameAs proposal | `kajabi-deployment/global/html/schema-organization-sameAs-proposal.md` |

## Already in repo (do not duplicate)

Global header scripts (paste order from `kajabi-deployment/global/html/README.md`):

1. `schema-organization.html` owns `https://www.joinsnooze.com/#organization`
2. `schema-person-sally.html` owns `https://www.joinsnooze.com/author/sally-woods#person`
3. `blog-schema-paste.html` for `/blog/*`

Challenge page schema in this pack **references those `@id` values**. It does not redefine Organization or Person.

## Template base page

**`/catnapping`**, existing sleep-challenge page (sibling of early-rising, nap-transitions, etc.), linked from `/which-is-right-for-us`.

## Two layers

1. **Kajabi SEO panel**, title (≤70), description (≤300), slug, index, OG image → `panel-seo.md`
2. **Repo HTML**, visible FAQ + page JSON-LD → paste into page code blocks when you choose to wire

Do **not** inject a second `<title>` or meta description in page HTML if the panel already sets them.

## Suggested deploy order

1. Confirm global Organization + Person schemas are still in Header Page Scripts (already designed).
2. Optionally apply `panel-seo.md` in Kajabi Edit details for catnapping (and homepage draft if desired).
3. Wire `faq-section.html` + `page-schema.jsonld.html` into the catnapping page (separate PR or manual merge into `catnapping-page-complete.html`).
4. Rich Results Test on `https://www.joinsnooze.com/catnapping`.
5. Clone pattern to early-rising → nap-transitions → sleep-regressions.

## Testing checklist

- [ ] Rich Results Test: FAQPage (+ breadcrumbs if claimed)
- [ ] View-source: single title + single meta description
- [ ] FAQ schema `name`/`text` match visible FAQ exactly
- [ ] Person `@id` is `…/author/sally-woods#person` (matches global)
- [ ] Free guide + membership CTAs still work
