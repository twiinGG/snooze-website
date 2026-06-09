# Page Inventory - Scraped Website Data

**Generated:** December 2025  
**Total Pages:** 100  
**Source:** `page_scrape_data` table in Supabase

> **Refreshed June 9, 2026** by the full live-site audit in
> `apps/snooze-website/site-audit-2026-06/`. Current figures from that run
> (canonical host `https://www.joinsnooze.com`):
>
> - **107 URLs crawled** (real-browser render): 99 × 200, 8 × 404.
> - **Page types:** 36 blog posts, 17 offer/checkout, 15 landing, 15 misc page,
>   7 product-access, 5 legal, 4 download-access, 3 community, 3 account,
>   1 homepage, 1 blog index.
> - **Kajabi admin:** 67 pages catalogued (27 published, 40 draft).
> - **Biggest gaps:** no `Article` schema on any of 36 blog posts; 61 pages with
>   no JSON-LD; 3 pages built-in-repo-but-404 (`/get-great-baby-sleep`,
>   `/sleep-glossary`, `/snooze-method`); 160 images missing alt text.
> - Full findings: `site-audit-2026-06/AUDIT-REPORT.md`. Per-page records:
>   `site-audit-2026-06/pages/`. Provenance: `PAGE-SOURCE-MANIFEST.csv`.
>
> The section below is the original December 2025 inventory, kept for history.

---

## Summary Statistics

- **Total Pages:** 100
- **Blog Posts:** 36
- **Product Pages:** 3
- **Landing Pages:** ~60
- **Categories:** 5 distinct categories

---

## Page Categories

### Lead Capture Pages (64 pages)
Primary conversion-focused pages including:
- Landing pages for courses and services
- Age-specific help pages (newborn, 3-4 month, 5-12 month, toddler)
- Free resource pages
- Waitlist and signup pages

### Blog Posts (36 pages)
SEO-optimized content covering:
- Sleep regression guides
- Product reviews
- Sleep tips and troubleshooting
- Age-specific advice

### Product Pages (3 pages)
- Downloadable guides
- Course product pages

### Checkout Pages (1 page)
- Terms and conditions

### Testimonial Pages (2 pages)
- Customer testimonials and reviews

---

## Key Pages for Migration

### High Priority (Snooze-Related)
1. `/snooze` - Main Snooze landing page (1,360 words)
2. `/snooze-library` - Library access page (99 words)
3. `/snooze-waitlist` - Waitlist page (285 words)
4. `/toddler-sleep-help` - Toddler content (224 words)

### Blog Posts (36 posts)
All blog posts should be migrated to preserve SEO value:
- `/blog/4-month-regression-or-progression`
- `/blog/guide-to-self-settling-sleep-cycles`
- `/blog/all-about-the-8-10-month-sleep-regression`
- ... (33 more blog posts)

### Product Pages (3 pages)
- `/product/5-12-Month-Baby-Sleep-Guide`
- `/product/catnapping-guide-free`
- `/product/downloadable-sleep-guide-fourth-trimester`

### Age-Specific Landing Pages
- `/3-4-month-baby-sleep-help`
- `/5-12-month-baby-sleep-help`
- `/newborn-baby-sleep-help`
- `/toddler-sleep-help`

### Camp Snooze Pages
- `/camp-snooze` - Camp Snooze landing page
- `/camp-snooze-waitlist-thank-you` - Camp Snooze waitlist thank you page
  - **SEO Title:** "You're on the Camp Snooze Waitlist | Start Making Sleep Progress Today | Snooze"
  - **SEO Description:** "You're confirmed on the Camp Snooze waitlist. While you wait, join Snooze membership to start making sleep progress today with weekly coaching, all courses, and troubleshooting support."
  - **Status:** Active
  - **Type:** Thank You / Next Steps Page
  - **Purpose:** Post-waitlist signup page offering Snooze membership as immediate alternative

---

## Content Analysis

### Word Count Distribution
- **Average:** ~500-800 words per page
- **Blog Posts:** Higher word count (800-1500 words)
- **Landing Pages:** Variable (100-2000 words)
- **Product Pages:** Lower word count (200-500 words)

### SEO Elements
- **H1 Tags:** Most pages have 1-2 H1 tags
- **H2 Tags:** Blog posts have 4-9 H2 tags for structure
- **Meta Descriptions:** Present on most pages
- **Canonical URLs:** Present on most pages

---

## Migration Considerations

1. **Blog Posts:** All 36 posts should migrate to `joinsnooze.com/blog/` with 301 redirects
2. **Snooze Pages:** Already optimized for Snooze - may need content updates
3. **Product Pages:** May need rebranding to Snooze
4. **Landing Pages:** Need conversion optimization for Snooze membership

---

**Next Steps:**
- Complete SEO audit (Phase 1.2)
- Generate URL mapping for redirects (Phase 3)
- Content gap analysis (Phase 1.3)

