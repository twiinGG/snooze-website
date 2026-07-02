> Committed copy of the live sweep report. Raw baselines (saved HTML, grep dumps: `all_prices.txt`, `banned_copy.txt`, `seo_signals.txt`, `status_summary.txt`) live at the monorepo root, outside this website mirror's prefix, deliberately — they are diagnostic artefacts of a repo-wide strategy pass, not website source: `docs/projects/paid-media-and-dual-currency-v1/live-baselines-2026-07-02/`.
>
> Used by: [PER-PAGE-EXECUTION-SPEC.md](./PER-PAGE-EXECUTION-SPEC.md) (page-by-page target table), [../seo/SEO-AEO-ARCHITECTURE.md](../seo/SEO-AEO-ARCHITECTURE.md) (§5 baseline).

---

# joinsnooze.com Live Pricing / SEO Sweep — 2026-07-02

Method: `curl -sL -A "<Chrome UA>"` against live URLs (logged out), HTML saved under the raw baselines
directory, all analysis by `grep` on saved HTML. Sitemap fetched from
`https://www.joinsnooze.com/sitemap.xml` (78 URLs) to find real slugs for camp/consult/store
pages. Checkout pages attempted via curl AND `agent-browser` with stealth flags — both blocked
by Cloudflare (see below). No login, no site modification.

## Summary table

| Page | URL | Status | Currency engine | dynamic-price / data-aud / dynamic-cta / data-checkout | Legacy slug hits | Banned-copy hits | JSON-LD blocks (types) |
|---|---|---|---|---|---|---|---|
| Home | `/` | 200 | present (3 pref-refs / 6 inline) | 9 / 1 / 7 / 3 | bEsVXFXG x2 (comment only) | **24** | 2 (ImageObject, Organization, Person, WebSite) |
| Snooze (expected 404) | `/snooze` | **404** | present (same shared script) | 9 / 1 / 7 / 2 | bEsVXFXG x2 (comment only) | 2 | 2 (same types) |
| Newborn | `/newborn-baby-sleep-help` | 200 | present | 9 / 1 / 7 / 8 | bEsVXFXG x2 (comment only) | 9 | 2 |
| 3-4 Month | `/3-4-month-baby-sleep-help` | 200 | present | 9 / 1 / 7 / 14 | bEsVXFXG x2, **6iRarwak x3 (live CTAs)** | 13 | 2 |
| 5-12 Month | `/5-12-month-baby-sleep-help` | 200 | present | 9 / 1 / 7 / 8 | bEsVXFXG x2 (comment only) | 8 | 2 |
| Toddler | `/toddler-sleep-help` | 200 | present | 9 / 1 / 7 / 8 | bEsVXFXG x2 (comment only) | 8 | 2 |
| 5-12mo Course | `/5-12-month-baby-sleep-course` | 200 | present | 9 / 1 / 7 / 2 | bEsVXFXG x2 (comment only) | 11 | 2 |
| Snooze Access | `/snooze-access` | 200 | present (weaker: 3/4 refs) | 5 / 1 / 5 / 2 | bEsVXFXG x2 (comment only) | 1 | 2 |
| Camp Snooze | `/camp-snooze-sleep-coaching` | 200 | present, **only page with real `data-aud=` price pairs (x6)** | 14 / 6 / 7 / 4 | bEsVXFXG x2 (comment only) | 1 | 2 |
| Consultations | `/one-on-one-sleep-consultations` | 200 | present (engine script only — **zero prices actually wired to it**) | 9 / 1 / 7 / 2 | bEsVXFXG x2 (comment only) | 8 | 2 |
| Store | `/store` | 200 | present (engine script only — **most prices static USD, no AUD**) | 9 / 1 / 7 / 2 | bEsVXFXG x2 (comment only), **6iRarwak x2 (live CTA)** | 8 | 2 |
| Checkout z63s9VaR | `/offers/z63s9VaR/checkout` | **403 (Cloudflare "Attention Required")** | n/a | n/a | n/a | n/a | n/a |
| Checkout vYgCNgJz | `/offers/vYgCNgJz/checkout` | **403 (Cloudflare)** | n/a | n/a | n/a | n/a | n/a |
| Checkout mqQikDM7 | `/offers/mqQikDM7/checkout` | **403 (Cloudflare)** | n/a | n/a | n/a | n/a | n/a |
| Checkout Sr6KzShx | `/offers/Sr6KzShx/checkout` | **403 (Cloudflare)** | n/a | n/a | n/a | n/a | n/a |

All 11 fetchable pages carry `sn-currency-inline`/`sn-currency-sticky` scripts, canonical slugs
`z63s9VaR`/`vYgCNgJz`/`mqQikDM7`/`Sr6KzShx` referenced (as expected — shared header script), and
identically-structured JSON-LD (ImageObject + Organization + Person + WebSite, 2 script blocks,
no BlogPosting/Product/Offer/FAQPage schema anywhere in this set). No `noindex` found on any
fetched page.

## Real page discovered via sitemap (not in original request list)

The nav/sitemap slugs differ from the request list:
- Camp Snooze -> `/camp-snooze-sleep-coaching` (not `/camp-snooze`)
- Consultations -> `/one-on-one-sleep-consultations` (the guessed `/one-on-one-consultations` 404s, confirmed via sitemap absence)
- Store -> `/store` (as guessed)
- `/snooze` genuinely 404s — full custom "PAGE NOT FOUND" template, still serves the shared header/currency script and JSON-LD, `og:title` = "Not Found (404)", canonical self-referentially points at the dead URL `https://www.joinsnooze.com/snooze` (should not have a canonical tag, or should 410/noindex).

## Top 10 findings

1. **Checkout pages are unauditable from outside a real browser session.** All four canonical offer checkouts (`z63s9VaR`, `vYgCNgJz`, `mqQikDM7`, `Sr6KzShx`) return Cloudflare's "Attention Required" challenge (HTTP 403, ~4.5KB) to both curl with a real UA and `agent-browser` with anti-automation flags. Pricing/currency correctness on the actual purchase surface cannot be verified without a logged-in or human-driven browser pass.

2. **Legacy offer slug `6iRarwak` is still live in customer-facing CTAs on two pages.** The 3-4 Month page has 3 hits — two `<a>` buttons ("Join Snooze", "Join Snooze to Access All Guides") pointing to `https://www.sleepconcierge.com.au/offers/6iRarwak/checkout` — and the Store page has 2 hits, buttons pointing to `https://joinsnooze.com/offers/6iRarwak/checkout`. Both use a different apex domain than the canonical `www.joinsnooze.com`, and this slug isn't one of the four canonical offers the currency engine targets. This is a real, clickable dead-end or wrong-offer path for buyers.

3. **`bEsVXFXG` (the slug memory says was DELETED) still appears in every page** — but only inside an inline JS comment documenting the 2026-06-30 repoint ("`repointed from the old monthly-only bEsVXFXG/2151212200 to the complete AUD core offer vYgCNgJz`"). Not a live link anywhere checked; safe, but worth stripping the comment eventually since it's shipped to every visitor's page source.

4. **Consultations and Store pages load the currency-engine script but have almost no prices wired to it.** Consultations: package prices ($525, $650, $3,150, $3,500, $390) are all static USD-only text with no `data-aud` attributes anywhere on the page — a US/AU visitor sees USD regardless of locale. Store: same pattern ($3,500, $650, $390, $79/mo) — only `data-aud=` count on Store is 1 (inherited from the shared header script), meaning the visible catalog prices are not dual-currency at all.

5. **Camp Snooze is the only page with real `data-aud=` pairs on visible prices** (6 instances — $79->$119, $690->$997, $3,500->$5,250, -$2,989 discount line), so the dual-currency engine only appears to be "live" in the sense the parent conversation described on this one page; the other pricing surfaces (consult packages, course bundle upsells, store catalog) are not yet wired.

6. **Home page h1 is `"Join Your 24/7 Baby Sleep Lifeline"` — a direct hit on the banned "24/7" service-model language**, and it's the single highest-weight place for it (H1, above the fold). Home also carries the highest banned-copy density of any page (24 hits) — "Live Coaching" section header, "Weekly Live Coaching" repeated 3+ times, "weekly coaching calls," "replays," multiple "Paediatric Nurse" credential mentions.

7. **"Registered Paediatric Nurse" appears 3 times on the Consultations page**, directly contradicting the Sally-positioning standard (should be "certified sleep consultant and former paediatric nurse," never "current/registered nurse"). The correct phrasing does appear once in that page's meta description and og:description, so the page is internally inconsistent — good SEO copy, non-compliant body copy.

8. **"Lifetime access" appears on Newborn, 3-4 Month, 5-12 Month, Toddler, and the 5-12mo Course page** (course-comparison checklists and an FAQ answer: "Yes, lifetime access includes all future course updates"), which is banned service-model language per the membership-copy rule.

9. **"Live Coaching" / "Weekly Live Coaching" / "replay(s)" language is present on all 11 fetchable pages** (a literal `SECTION 7: LIVE COACHING & REPLAYS` HTML comment marks a reused template block across every course/audience page), meaning this is a single shared component, not scattered copy — one fix point cleans most instances, but Home has additional standalone occurrences beyond the shared block.

10. **JSON-LD is thin and identical everywhere: 2 script blocks (ImageObject, Organization, Person, WebSite) on every single page, including the 404.** No `Product`, `Offer`, `Course`, `FAQPage`, or `BlogPosting` schema on any page audited — including the course pages (5-12mo Course) and Camp Snooze, which are the strongest AEO/rich-result candidates. No `noindex` found anywhere (the 404 page is not excluded from indexing via meta robots, though it may be handled at the HTTP-status level, which Google respects regardless).

## Notes / limitations
- Sitemap lists 78 URLs total; the audit covered the 11 requested/discoverable pricing-relevant pages plus the 404 check and 4 checkouts (all blocked). Blog posts, terms pages, and the newsletter page were not audited (out of scope for this pass).
- All counts are literal `grep -o | wc -l` on saved HTML; no interpretation beyond what's quoted above.
- Raw HTML files and full grep dumps (`all_prices.txt`, `banned_copy.txt`, `seo_signals.txt`, `status_summary.txt`) are in `docs/projects/paid-media-and-dual-currency-v1/live-baselines-2026-07-02/` at the monorepo root for cross-checking.
