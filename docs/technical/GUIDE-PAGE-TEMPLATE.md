# Guide Page Template

## 1. Purpose and when to use
Use the Guide template for pages that answer a question and route the visitor onward. It applies to the chooser plus the four age hubs and the five challenge pillars for ten pages total. Use a marketing or landing page template when the goal is a single conversion or offer pitch without long form guidance.

## 2. Keeps (GEO and E-E-A-T value)
- 40 to 60 word direct answer opener near the top
- Named author credential
- Freshness signal with updated month and year
- Existing JSON-LD stays in place: BreadcrumbList always; FAQPage or HowTo when visible Q and A or steps already exist

## 3. Adds (design system fixes)
- A real hero band using `.hero-wrap`, use `.hero-grid` when a two column hero fits
- Section rhythm with content broken into `.snooze-section` blocks that alternate `.bg-white` and cream backgrounds
- Styled CTA blocks using `.btn` or `.btn-outline`, not bare coral text links
- At least one repeated CTA lower on the page
- Use `.snooze-container` for width and `.steps-grid` or `.step-card` where a card grid fits

## 4. Requires (System Initialization)
Each page wrapper ID (`#chooser-page`, `#early-rising-page`, each hub id, each pillar id) must have a System Initialization block in `theme-custom-code.css` copied from `#ask-sally-page`. Treat this as a hard prerequisite or the design system classes render unstyled. The wrapper ID registry lives in `docs/technical/CSS-STABILIZATION-BRIEF.md`; register new IDs in that doc during the separate build step.

## 5. Credential chip (replaces the byline box)
Replace the cream "Written by Sally Woods" box and the separate last updated line with one compact credential chip:
"Reviewed by Sally Woods, The Sleep Concierge · updated Jul 2026". This retains author and freshness for LLM citation and drops the blog look. Use the naming rule in bylines and author JSON-LD `name`: "Sally Woods, The Sleep Concierge". When her full background appears, use "internationally certified sleep consultant and former paediatric nurse". Use "Access with the Snooze Membership" not "Lifetime access".

## 6. Breadcrumb as real nav
The `.snooze-breadcrumb-context` line must render as a real breadcrumb nav, not editorial body text. Keep the visible "Part of:" line and keep the JSON-LD BreadcrumbList in place.

## 7. Structural skeleton (HTML outline)
```html
<div id="early-rising-page">
  <nav class="snooze-breadcrumb-context" aria-label="Breadcrumb">
    <span>Part of:</span>
    <a href="/">Home</a>
    <span aria-hidden="true">›</span>
    <a href="/5-12-month-baby-sleep-help">5-12 month baby sleep help</a>
    <span aria-hidden="true">›</span>
    <span>Early rising</span>
  </nav>

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

  <section class="hero-wrap bg-cream">
    <div class="snooze-container hero-grid">
      <div>
        <h1>Early rising in babies</h1>
        <p class="direct-answer">40 to 60 word direct answer opener goes here with the core fix and next step.</p>
        <div class="credential-chip">Reviewed by Sally Woods, The Sleep Concierge · updated Jul 2026</div>
        <div class="cta-row">
          <a class="btn" href="/snooze-access">Access with the Snooze Membership</a>
          <a class="btn btn-outline" href="/5-12-month-baby-sleep-help">See age hub</a>
        </div>
      </div>
      <div class="hero-media">
        <img src="https://example.com/hero.jpg" alt="Placeholder alt text" loading="eager" />
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
      <h2>Why it happens</h2>
      <p>Answer block.</p>
    </div>
  </section>

  <section class="snooze-section bg-white">
    <div class="snooze-container">
      <h2>First steps you can take</h2>
      <div class="steps-grid">
        <div class="step-card">Step card 1</div>
        <div class="step-card">Step card 2</div>
        <div class="step-card">Step card 3</div>
      </div>
    </div>
  </section>

  <section class="snooze-section bg-cream">
    <div class="snooze-container max-800 text-center">
      <h2>Still stuck</h2>
      <p>Short prompt to move forward.</p>
      <a class="btn" href="/snooze-access">Access with the Snooze Membership</a>
    </div>
  </section>

  <footer class="snooze-footer-clean">
    <!-- Footer markup -->
  </footer>
</div>
```

## 8. Checklist
- Wrapper ID has a System Initialization block in `theme-custom-code.css`
- Direct answer opener is present and 40 to 60 words
- Credential chip uses the required name and freshness
- Breadcrumb nav is visible and BreadcrumbList JSON-LD remains
- Styled CTA blocks exist and at least one CTA repeats lower on the page
- FAQPage or HowTo JSON-LD remains when those sections are visible
