# Install, Catnapping challenge page

This folder adds **sidecar files** only. `catnapping-page-complete.html` is unchanged in the "new files only" PR.

## 1. Kajabi SEO panel

Copy fields from `panel-seo.md` into Edit details → SEO and social sharing.  
Save and confirm **one** meta description in view-source.

## 2. Global schema (already designed)

Confirm Header Page Scripts still include, in order:

1. `kajabi-deployment/global/html/schema-organization.html`
2. `kajabi-deployment/global/html/schema-person-sally.html`
3. `kajabi-deployment/global/html/blog-schema-paste.html` (blog only injector)

See `../global/html/schema-organization-sameAs-proposal.md` (under `kajabi-deployment/global/html/`) for optional sameAs additions (separate edit).

## 3. Page body (when you wire)

1. Insert `faq-section.html` after **First steps**, before **Free catnapping guide**.
2. Style via `optional-faq.css` once, or fold rules into `snooze-unified-theme.css`.
3. Keep free guide link:  
   `https://www.joinsnooze.com/offers/maowxKB6/checkout`  
   Optional UTM:  
   `?utm_source=site&utm_medium=challenge_page&utm_campaign=catnapping_guide`

## 4. Page schema (when you wire)

1. Add `page-schema.jsonld.html` on the catnapping route only.
2. If you change FAQ copy, sync schema `name` / `text` the same commit.
3. Person `@id` must remain `https://www.joinsnooze.com/author/sally-woods#person`.

## 5. Optional visible breadcrumb

Repo global README already suggests:

```html
<p class="snooze-breadcrumb-context">Part of: <a href="https://www.joinsnooze.com/which-is-right-for-us">Find the right sleep help</a></p>
```

near the intro, aligned with BreadcrumbList in `page-schema.jsonld.html`.

## 6. QA

1. Rich Results Test → FAQ (+ breadcrumbs)  
2. Free guide + membership CTAs  
3. Mobile `<details>` FAQ  
4. GSC URL Inspection after deploy  

## 7. Clone next

1. `/early-rising`  
2. `/nap-transitions`  
3. `/sleep-regressions`  

See `docs/seo/challenge-schema-pack/ROLL_OUT.md`.
