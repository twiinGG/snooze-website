# Install, Catnapping challenge page

**Deploy artifact:** [`catnapping-page-complete.html`](./catnapping-page-complete.html)  
Sidecars (`faq-section.html`, `page-schema.jsonld.html`, `optional-faq.css`, `panel-seo.md`) stay as sources of truth / diff helpers. Edit them, then re-sync into the page-complete file in the same commit.

Wired August 2026 (`seo/wire-catnapping-sidecars`): visible FAQ + page JSON-LD (WebPage + FAQPage + BreadcrumbList) live inside the page-complete HTML. Old Article + `#sally` Person block removed.

---

## What changed in the HTML

| Area | Change |
|------|--------|
| JSON-LD | Single `@graph`: WebPage + FAQPage + BreadcrumbList. Person/Org are `@id` refs only (`…/author/sally-woods#person`, `…/#organization`). No Article, no `#sally`. |
| Visible breadcrumb | `Part of: Find the right sleep help › Catnapping` (hub = `/which-is-right-for-us`) |
| Visible FAQ | `.snooze-faq` with 6 questions, after **First steps**, before **Free catnapping guide** |
| Free guide CTA | Still `maowxKB6`; optional UTM appended (`utm_source=site&utm_medium=challenge_page&utm_campaign=catnapping_guide`) |
| Membership CTA | Unchanged (`z63s9VaR`) |
| FAQ CSS | Folded into [`../../global/css/theme-custom-code.css`](../../global/css/theme-custom-code.css) (paste target A2). `optional-faq.css` kept as starter/diff helper. |
| Preview `<title>` / meta description | Match [`panel-seo.md`](./panel-seo.md) for local preview only. Kajabi panel SEO wins in production; do not paste head tags into the body code block. |

---

## Kajabi paste steps (catnapping website page)

### 1. Panel SEO

1. Website → Website Pages → **catnapping** → ⋯ **Edit details** → SEO and social sharing.
2. Paste title + description from [`panel-seo.md`](./panel-seo.md).
3. **Show page in search results** = On.
4. Page image: hero URL from `panel-seo.md` if OG image is empty.
5. Save. View-source later: confirm **one** title and **one** meta description.

### 2. Page body code block

1. Open the catnapping website page editor.
2. Replace the custom code block that holds the page body with the contents of `#catnapping-page` from [`catnapping-page-complete.html`](./catnapping-page-complete.html) (from `<div id="catnapping-page">` through its closing `</div>`, including JSON-LD, FAQ, CTAs, and inline footer).
3. Do **not** paste the outer `<!DOCTYPE>`, `<html>`, `<head>`, or `<body>` wrappers. Those are local preview helpers only.
4. Save / publish the page.

Same convention as other challenge `*-page-complete.html` files: wrapper must stay `<div id="catnapping-page">` (never `<body id>`).

### 3. Global Custom CSS (FAQ styles)

1. Open [`../../global/css/theme-custom-code.css`](../../global/css/theme-custom-code.css).
2. Paste **whole file** into Customizer → Theme Custom Code → **CSS** ([`PASTE-MAP.md`](../../PASTE-MAP.md) row A2).
3. Save. Required so `.snooze-faq` is styled on live.

### 4. Global header scripts (confirm only)

Confirm Settings → Site details → Header Page Scripts still has, in order:

1. [`schema-organization.html`](../../global/html/schema-organization.html)
2. [`schema-person-sally.html`](../../global/html/schema-person-sally.html)
3. [`blog-schema-paste.html`](../../global/html/blog-schema-paste.html)

Do **not** paste a second Organization or Person graph on the catnapping page.

Optional sameAs additions stay in [`schema-organization-sameAs-proposal.md`](../../global/html/schema-organization-sameAs-proposal.md) until separately approved.

---

## QA checklist

- [ ] Rich Results Test on `https://www.joinsnooze.com/catnapping` → FAQPage (+ BreadcrumbList)
- [ ] View-source: single `<title>`, single meta description, single `FAQPage`
- [ ] No `https://www.joinsnooze.com/#sally` anywhere
- [ ] Person refs use `…/author/sally-woods#person`
- [ ] Visible FAQ (6 `<details>`) between First steps and Free guide; mobile accordion works
- [ ] Visible breadcrumb includes hub link to `/which-is-right-for-us`
- [ ] Free guide (`maowxKB6`) and membership (`z63s9VaR`) CTAs work on mobile
- [ ] FAQ schema `name` / `text` still match visible FAQ after any copy edit (update sidecar + page-complete together)

---

## Clone next

1. `/early-rising`
2. `/nap-transitions`
3. `/sleep-regressions`

See [`docs/seo/challenge-schema-pack/ROLL_OUT.md`](../../../docs/seo/challenge-schema-pack/ROLL_OUT.md).
