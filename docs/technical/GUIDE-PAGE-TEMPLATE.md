# Guide Page Template

## 1. Purpose and when to use
Use the Guide template for pages that help a parent understand what is happening and find the next useful path. It applies to the chooser, four age hubs and five challenge pillars, ten pages total. Use a marketing or landing template when the page has one conversion goal or an offer pitch.

Reference implementation:

- HTML: `apps/snooze-website/kajabi-deployment/pages/website/chooser/which-is-right-for-us-page-complete.html`
- CSS: `apps/snooze-website/kajabi-deployment/global/css/theme-custom-code.css`, search `GUIDE PAGES DESIGN SYSTEM`

## 2. Philosophy: help, not sell
Guide pages help a tired parent learn about their situation and build confidence. They should feel like the calm, practical support Camp Snooze gives, not a product picker.

Governing rule: help, not sell.

- The Snooze Membership is the one consolidated home for help.
- Never turn guide pages into a "pick one of four products" menu.
- Do not use product-comparison tables, trust-bar or social-proof devices, dense CTA buttons or a "START HERE" sales eyebrow.
- Prefer soft `.card-link` routing links over buttons inside cards.
- Use one gentle Membership CTA, folded into a warm "All the help, in one place" section.
- Pare copy for exhausted parents. Cut reassurance filler.

## 3. Keeps for GEO and E-E-A-T
- 40 to 60 word `.direct-answer` opener near the top
- Named credential: `Sally Woods, The Sleep Concierge`
- Freshness signal with updated month and year
- Existing JSON-LD stays in place: BreadcrumbList always, FAQPage or HowTo when visible Q and A or steps already exist
- Sally positioning stays accurate: `internationally certified sleep consultant and former paediatric nurse` when her full background appears
- Membership language: `Access with the Snooze Membership`

## 4. Shipped design system
Guide pages now mirror the home page `#home-page` design system instead of copying the older `#ask-sally-page` block.

The shared CSS is scoped to these ten wrapper IDs:

- `#chooser-page`
- `#age-newborn-page`
- `#age-3-4-month-page`
- `#age-5-12-month-page`
- `#age-toddler-page`
- `#early-rising-page`
- `#sleep-regressions-page`
- `#nap-transitions-page`
- `#bedtime-battles-page`
- `#catnapping-page`

The CSS uses a shared `:is(...)` prefix so component selectors keep the same specificity shape as `#home-page .x`. Tokens mirror the home page: `--c-*`, `--radius`, `--shadow-*`, Playfair Display headings, Poppins body, pill `.btn` styling with coral glow, `.hero-wrap`, `.hero-grid`, `.hero-img`, `.step-card` and full-bleed `100vw` sections.

## 5. Available components
- `.credential-chip`: cream pill with coral dot, used for reviewer and freshness.
- `.cta-row` plus `.cta-lead`: compact routing row with the `Find help:` lead-in.
- `.hero-media` and `.hero-img`: hero image wrappers.
- `.direct-answer`: top summary paragraph.
- `.guide-table-wrap` plus `.guide-table`: on-brand diagnostic tables. Use for situation diagnosis, not product comparison.
- `.card-link`: soft coral text link with arrow for routing cards. This is not a button.
- `.guide-lead`: warm lead paragraph in the consolidated help section.
- `.guide-close`: quiet closing copy.
- `.quiet-links`: final low-pressure links.
- `.snooze-breadcrumb-context`: restyled as a real `<nav>`.
- Existing home-matched primitives: `.snooze-container`, `.snooze-section`, `.bg-white`, `.bg-cream`, `.text-center`, `.max-800`, `.steps-grid`, `.step-card`, `.btn`, `.btn-outline`.

## 6. Breadcrumb as real nav
The `.snooze-breadcrumb-context` line must render as a real breadcrumb nav. Keep the visible "Part of:" line and keep the JSON-LD BreadcrumbList in place.

## 7. Structural skeleton
Match the chooser structure: breadcrumb nav, hero, alternating section blocks with card-link routing, "All the help, in one place", quiet close.

```html
<div id="early-rising-page">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.joinsnooze.com/" },
      { "@type": "ListItem", "position": 2, "name": "5-12 month baby sleep help", "item": "https://www.joinsnooze.com/5-12-month-baby-sleep-help" },
      { "@type": "ListItem", "position": 3, "name": "Early rising", "item": "https://www.joinsnooze.com/early-rising" }
    ]
  }
  </script>

  <nav class="snooze-breadcrumb-context" aria-label="Breadcrumb">
    <span>Part of:</span>
    <a href="/">Home</a>
    <span aria-hidden="true">&rsaquo;</span>
    <a href="/5-12-month-baby-sleep-help">5-12 month baby sleep help</a>
    <span aria-hidden="true">&rsaquo;</span>
    <span>Early rising</span>
  </nav>

  <section class="hero-wrap">
    <div class="snooze-container">
      <div class="hero-grid">
        <div class="hero-content">
          <h1>Early rising in babies</h1>
          <p class="direct-answer">Use a 40 to 60 word answer that explains what is likely happening and what to check first. Keep it specific enough for citation and simple enough for a tired parent to act on.</p>
          <div class="credential-chip">Reviewed by Sally Woods, The Sleep Concierge &middot; updated Jul 2026</div>
          <div class="cta-row">
            <span class="cta-lead">Find help:</span>
            <a class="btn" href="#first-steps">first steps</a>
            <a class="btn btn-outline" href="/5-12-month-baby-sleep-help">age guide</a>
          </div>
        </div>
        <div class="hero-img">
          <img src="https://example.com/hero.jpg" alt="Placeholder alt text" width="1536" height="1024" loading="eager">
        </div>
      </div>
    </div>
  </section>

  <section class="snooze-section bg-white">
    <div class="snooze-container max-800">
      <h2>What counts as early rising</h2>
      <p>Answer block.</p>
    </div>
  </section>

  <section class="snooze-section bg-cream">
    <div class="snooze-container max-800">
      <h2>What might be driving it</h2>
      <div class="guide-table-wrap">
        <table class="guide-table">
          <thead>
            <tr>
              <th>What you see</th>
              <th>What it may mean</th>
              <th>What to try first</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example signal</td>
              <td>Example interpretation</td>
              <td>Example first step</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section id="first-steps" class="snooze-section bg-white">
    <div class="snooze-container">
      <div class="text-center max-800">
        <h2>First steps you can take</h2>
      </div>
      <div class="steps-grid">
        <div class="step-card">
          <h3>Check the rhythm</h3>
          <p>Short practical guidance.</p>
          <a class="card-link" href="/nap-transitions">Nap transition help</a>
        </div>
        <div class="step-card">
          <h3>Look at bedtime</h3>
          <p>Short practical guidance.</p>
          <a class="card-link" href="/bedtime-battles">Bedtime help</a>
        </div>
        <div class="step-card">
          <h3>Match the stage</h3>
          <p>Short practical guidance.</p>
          <a class="card-link" href="/5-12-month-baby-sleep-help">5-12 month guide</a>
        </div>
      </div>
    </div>
  </section>

  <section class="snooze-section bg-white">
    <div class="snooze-container max-800 text-center">
      <h2>All the help, in one place</h2>
      <p class="guide-lead">The Snooze Membership brings the courses, stage guides, Snooze Village community and Sally&rsquo;s Snooze Specialists together in one place, so the right help is there when you need it.</p>
      <div class="cta-row" style="justify-content:center;">
        <a class="btn" href="/snooze-access">Access with the Snooze Membership</a>
      </div>
    </div>
  </section>

  <section class="snooze-section bg-cream">
    <div class="snooze-container max-800 text-center">
      <p class="guide-close">Prefer to read around first? These guides can help you find your starting point.</p>
      <div class="quiet-links">
        <a href="/sleep-regressions">Sleep regressions</a>
        <a href="/catnapping">Catnapping</a>
      </div>
    </div>
  </section>

  <footer class="snooze-footer-clean">
    <!-- Footer markup -->
  </footer>
</div>
```

## 8. Checklist
- Wrapper ID is one of the ten guide IDs in the shared CSS.
- CSS uses the home-matched guide system with `:is(...)` scoping.
- Direct answer opener is present and 40 to 60 words.
- Credential chip uses `Sally Woods, The Sleep Concierge` plus freshness.
- Breadcrumb nav is visible and BreadcrumbList JSON-LD remains.
- Routing cards use `.card-link`, not button-style CTAs.
- One gentle Membership CTA appears in the "All the help, in one place" section.
- FAQPage or HowTo JSON-LD remains when those sections are visible.
