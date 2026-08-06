> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> **Contractor-era handover. The architecture description is superseded by the bible, which corrects the GCP container, the Stape power-ups and the advanced matching rationale.**
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Technical Architecture Handover

For VSP's dev team. Covers the Snooze website architecture, tracking, JavaScript systems, CSS structure and deployment constraints.

**Repository:** [github.com/twiinGG/snooze-website](https://github.com/twiinGG/snooze-website)

---

## Architecture Overview

The Snooze website runs on Kajabi (courses, payments, email, community). The frontend is a custom-coded layer injected into Kajabi's code fields, not built with Kajabi's visual editor.

- **19+ pages** with hand-written HTML in Kajabi code blocks
- **1 unified CSS file** (~342KB, `snooze-unified-theme.css`) pasted into Kajabi's Custom CSS field
- **1 global JS file** (`snooze-globals.js`) injected via Kajabi's site-wide header code block; runs on every page
- **Page-level JS files** for Camp Snooze landing, checkout, linktree and Snooze Academy
- **Custom header, footer and checkout HTML** outside the visual builder

---

## Tracking and Analytics

### Hybrid GTM Loading (Critical)

`snooze-globals.js` opens with a two-mode GTM loader. **Do not modify this section without understanding it.**

**Mode A (Fast Pages):** Pages matching `/links`, `/snooze`, `/bio`, `/free-guide` delay GTM by 1,500ms to prioritize visual rendering. Loads standard GTM from `googletagmanager.com`.

**Mode B (Commerce Pages):** All other pages load GTM immediately via the **Stape server-side proxy** at `https://load.ss.joinsnooze.com/2ostmfzxzts.js`. This bypasses browser ad-blockers for better conversion tracking accuracy.

**GTM Container ID:** `GTM-KNRTH6P`

All of the following are configured inside this GTM container (not in site code):
- Google Analytics 4 (GA4)
- Facebook / Meta Pixel (`fbq`)
- Microsoft Clarity (heatmaps)

### Custom Event Tracking

The `trackEvent(category, action, label, value)` function pushes events to three systems simultaneously: `window.dataLayer` (GTM), `gtag()` (GA4 fallback) and `fbq()` (Meta fallback).

Events currently tracked:

| Event | Trigger | Category |
|---|---|---|
| `cta_click` | Any `.btn-primary`, `.cta-btn`, `.primary` click | engagement |
| `click_checkout_cta` | Any link matching `/offers/[id]/checkout` | conversion |
| `faq_opened` | FAQ accordion item opened | engagement |
| `age_stage_selected` | Age stage toggle clicked | engagement |
| `sticky_cta_dismissed` | Sticky CTA close button | engagement |
| `sticky_cta_click` | Sticky CTA button clicked | engagement |
| `currency_change` | Camp Snooze currency toggle | dataLayer only |

### UTM Auto-Injection

When a checkout link is clicked and has no existing UTM parameters, the JS adds:
- `utm_source=landing-page`
- `utm_medium=cta`
- `utm_campaign=[current page pathname]`

### What This Means for VSP

You own and deploy the code that contains the tracking loader and event pushes. **Do not:**
- Remove or modify the Stape loader URL or GTM container ID
- Change the `fastPages` array without understanding the performance trade-off
- Remove the `trackEvent()` calls from existing functionality

The GTM container configuration itself (what GA4 sends, what Clarity records, what Meta tracks) is managed by Kade.

---

## JavaScript Systems

`snooze-globals.js` is the site's central JS file. It runs on every page. Here is everything it does:

### Global Variables

| Variable | Value | Purpose |
|---|---|---|
| `window.SNOOZE_CHECKOUT_URL` | `https://joinsnooze.com/offers/6iRarwak/checkout` | Primary membership checkout; used site-wide |
| `window.SNOOZE_LIBRARY_URL` | `/snooze-library` | Library page |
| `window.SNOOZE_VILLAGE_URL` | `https://joinsnooze.com/products/communities/v2/snooze` | Community |
| `window.SNOOZE_LOGIN_URL` | `/login` | Login page |

Changing `SNOOZE_CHECKOUT_URL` changes the checkout destination on every page.

### Checkout Link Normalization (`data-checkout`)

Any element with the `data-checkout` attribute gets its `href` rewritten to `window.SNOOZE_CHECKOUT_URL` on page load. Use this attribute on any new CTA that should point to the current membership offer.

### Context-Aware CTA System (`SnoozeUserDetection`)

A DOM-scraping user detection system on 7 pages (library, snooze method, about Sally, all 4 age pages). Detects login state by checking for Kajabi's login link and user avatar elements. Returns one of:

- `snooze-member` > "Go to Library" button
- `logged-in-non-member` > "Upgrade to Snooze" button
- `new-visitor` > "Join Snooze" button
- `signposting` (fallback) > side-by-side "Join" + "Library" with login link

Each page has inline `<script>` blocks that inject the appropriate CTA HTML into placeholder `<div>` elements (`#hero-cta-location`, `#snooze-context-cta`, etc.).

**Note:** This is fragile. It reads Kajabi's rendered HTML, not an API. If Kajabi changes its page structure, this may break.

### Testimonial Carousel

- **Desktop (>768px):** `requestAnimationFrame` infinite scroll at 0.3px/frame. Clones cards for seamless loop. Pauses on hover.
- **Mobile (<=768px):** Touch swipe with dot navigation. Auto-advances every 2s. 50px swipe threshold.
- **Selectors:** `.carousel-inner`, `.carousel-track`, `.card`, `.carousel-dots`

No third-party carousel library. Fully custom.

### FAQ Accordion

Two implementations exist:

**Checkbox-based (globals):** Used on landing pages. `input[type="checkbox"]` drives open/close. JS sets `maxHeight` dynamically. Tracks `faq_opened` event.

**Class-toggle (Ask Sally):** Click on `.faq-head` toggles `.active` on `.faq-item`. One-at-a-time accordion.

### Course Module Accordion

`window.toggleCourseModule(header)` toggles `.expanded` class. Used on all 5 product pages via `onclick="toggleCourseModule(this)"`. First module auto-expands after 300ms.

### Navigation System

- **Desktop dropdown:** Hover + click. 150ms close delay. Dynamic positioning via `getBoundingClientRect()`. Breakpoint: **992px**.
- **Mobile menu:** `window.toggleSnoozeMenu()` / `window.closeSnoozeMenu()`. Targets `#snooze-nav-clean` and `#sn-mobile-menu`. Locks body scroll.
- **Launch banner:** `#sn-launch-banner`. Dismissable with 24h localStorage expiry (`sn-launch-banner-closed`). Adjusts nav `top` offset when visible.

### Sticky CTA Bar (Global)

Mobile-only (hidden >768px). Appears after scrolling past 80% of hero height. Dismissable; saves to `localStorage` key `stickyCtaDismissed` (permanent until cleared).

### Other JS Systems

- **Smooth scroll:** Intercepts all `a[href^="#"]` clicks. Offsets by navbar height + 20px.
- **Scroll animations:** IntersectionObserver adds `.fade-in-up` to `.section` elements on viewport entry.
- **Lazy loading:** IntersectionObserver swaps `data-src` to `src` on images.
- **Pricing card click:** Makes entire `.pricing-card` clickable (delegates to inner `.cta-btn`).
- **Form validation:** Email regex on all `form` submit events.
- **Hero badge fix:** Re-injects Font Awesome icons into `.review-stars` and `.guarantee-icon` if Kajabi strips them on save.
- **Performance monitor:** Logs page load time to console; warns if >3s.

---

## Page-Level JavaScript

These files run on specific pages only (separate from `snooze-globals.js`):

### Camp Snooze Landing (`camp-snooze-v2-luxury.js`)

The most complex page-level JS. Implements:

**Currency toggle (AUD/USD):**
- Auto-detects via timezone (`Intl.DateTimeFormat`). Australian timezones default to AUD.
- Reads `data-usd` and `data-aud` on `.dynamic-price` elements; updates text.
- Updates `[data-checkout]` links to currency-specific offer URL.
- Injects toggle buttons into nav, mobile menu and sticky CTA.
- Persists to `localStorage` key `snooze_currency_preference`.
- Pushes `currency_change` event to `window.dataLayer`.
- **USD checkout:** `/offers/K3Y6FEKX/checkout`
- **AUD checkout:** `/offers/46Bz9tk6`

**Countdown timer:**
- Deadline hardcoded: `new Date('2026-03-31T23:59:00+11:00')`. Updates every 1s.
- Targets: `#hero-days`, `#hero-hours`, `#hero-minutes`, `#hero-seconds`, `#sticky-countdown`.
- Shows "Applications are now closed" when expired.
- Only runs in checkout mode, not waitlist mode.

**Page mode detection:**
- Waitlist page sets `window.CAMP_PAGE_MODE = 'waitlist'`.
- Also detected via `[data-camp-mode="waitlist"]` or `#waitlist-section`.
- Switches sticky CTA content between pricing/countdown and "Join Waitlist".

**Sticky CTA (Camp-specific):** Dynamically created. Contains price, currency toggle, countdown, checkout link. IntersectionObserver-based visibility.

**Modal system:** `toggleModal(modalId, show)` with focus trap and Escape key support.

**Falling leaves animation:** Creates 12 SVG leaf divs per `.falling-leaves` container with randomized CSS properties.

### Camp Snooze Checkout (`camp-snooze-v2-checkout.js`)

- Scroll-to-checkout: `.scroll-to-checkout` class smooth-scrolls to Kajabi's native form
- Mobile floating CTA hides when checkout form is visible (IntersectionObserver)
- Trust indicator stagger animation on load
- Font Awesome injection fallback

### BAU / Trial / Free Checkout JS

Simpler versions. Scroll-to-checkout only, with expanded Kajabi form selector fallbacks.

### Snooze Academy (`snooze-academy.js`)

IntersectionObserver for `.fade-up` elements scoped to `#snooze-academy-page`. Nothing else.

### Linktree (`linktree-landing-page.js`)

Staggered reveal animation (80ms per card) on `.lt-card` / `.lt-tile`. Click animation on `[data-primary-link]`.

---

## Data Attributes Reference

| Attribute | Where | Purpose |
|---|---|---|
| `data-checkout` | CTAs across all pages | Rewritten to `SNOOZE_CHECKOUT_URL` by globals JS |
| `data-age` | Store page, age pages, cold-traffic LP | Tab switching between age-group panels |
| `data-src` | Images | Lazy loading (swapped to `src` on viewport entry) |
| `data-usd` / `data-aud` | Camp Snooze `.dynamic-price` elements | Currency-specific price values |
| `data-period-usd` / `data-period-aud` | Camp Snooze pricing | Currency-specific period suffix |
| `data-currency` | Currency toggle buttons | Identifies USD or AUD button |
| `data-camp-mode` | Camp Snooze page wrapper | `"waitlist"` switches page to waitlist mode |
| `data-current-age` | Age page cross-link cards | Set to `"true"` on current page's card (dims it) |
| `data-product-price` | Age page product cards | JS reads and sets textContent |
| `data-tier` / `data-desc` | Store V2 page | Tier stack interactive switcher |
| `data-primary-link` | Linktree page | Marks primary CTA for press animation |
| `data-original-href` | Camp Snooze links | Stores original href before currency toggle rewrites it |
| `data-feedback-id` | Review cards | Kajabi review system UUIDs (not read by custom JS) |

---

## localStorage Keys

| Key | Set When | Expires | Purpose |
|---|---|---|---|
| `stickyCtaDismissed` | Sticky CTA close button clicked | Never | Hides global sticky CTA permanently |
| `sn-launch-banner-closed` | Launch banner dismissed | 24 hours | Hides launch offer banner |
| `snooze_currency_preference` | Currency toggle used or timezone detected | Never | Stores AUD/USD preference for Camp Snooze |

---

## Kajabi Offer IDs in Code

These offer IDs appear in HTML and JS. If offers change in Kajabi, the corresponding code must be updated.

| Offer ID | Product | Where Referenced |
|---|---|---|
| `6iRarwak` | BAU Membership (founding/annual) | `window.SNOOZE_CHECKOUT_URL`, site-wide CTAs |
| `K3Y6FEKX` | Camp Snooze + Member Bundle (USD) | Camp landing JS, bundle checkout HTML |
| `muRW6ug5` | Camp Snooze Standalone | Standalone checkout HTML |
| `46Bz9tk6` | Camp Snooze (AUD) | Camp landing JS currency toggle |

**Kajabi Form IDs:**
- `2149246740` - Camp Snooze waitlist form (embedded via JS)
- `2148762495` - Contact page form (embedded via JS)

---

## Third-Party Dependencies

| Dependency | Loaded Via | URL |
|---|---|---|
| GTM (standard) | `snooze-globals.js` | `googletagmanager.com/gtm.js?id=GTM-KNRTH6P` |
| GTM (Stape server-side) | `snooze-globals.js` | `load.ss.joinsnooze.com/2ostmfzxzts.js` |
| Font Awesome 6.4.0 | `<link>` in CSS and HTML pages | `cdnjs.cloudflare.com/.../font-awesome/6.4.0/css/all.min.css` |
| Google Fonts | `<link>` in page HTML | Poppins, Playfair Display (main); Cormorant Garamond, DM Sans, Satisfy (Camp Snooze) |
| Kajabi Form Embeds | `<script>` in page HTML | `joinsnooze.com/forms/[id]/embed.js` |
| YouTube (iframe) | Library page | Nap Trapped playlist embed |

No other third-party scripts. No chat widget SDK, no A/B testing framework, no Stripe SDK (Kajabi handles payments natively).

---

## CSS System

### Unified theme file

`snooze-unified-theme.css` is the single source of truth for all styles. Pasted into Kajabi's Custom CSS field (Settings > Design > Custom CSS). No build step.

### Wrapper ID pattern

Each page's HTML is wrapped in a unique ID (e.g. `#home-page`, `#ask-sally-page`). All page-specific CSS is scoped to that ID.

### System Initialization block requirement

Every new page wrapper ID requires a System Initialization block. This declares CSS custom properties, base typography, layout utilities, button styles, common components and full-bleed section fixes.

**Do not add page-specific styles without this block.** New wrapper IDs cannot inherit variables from other pages. Use the `#ask-sally-page` block in `snooze-unified-theme.css` as the template.

### Multi-page shared components

Use comma-separated multi-ID selectors with **hardcoded hex values** (not `var()` references, because CSS variables are scoped to individual page wrappers):

```css
#page-a .btn,
#page-b .btn {
  background-color: #F43357; /* not var(--c-coral) */
}
```

### Responsive breakpoints

| Breakpoint | Usage |
|---|---|
| 480px | Small mobile |
| 768px | Primary mobile/desktop split (most common) |
| 992px | Navigation desktop/mobile switch |
| 1024px | Wide tablet / desktop |
| 1200px | Large desktop |

### Z-index layers

| z-index | Element |
|---|---|
| 100 | Library sticky category nav |
| 1000 | Sticky CTAs |
| 2001 | Mobile menu overlay |
| 9999 | Navigation bar |
| 10000 | Launch banner |

### CSS animations

| Name | Effect | Where |
|---|---|---|
| `fadeIn` | Opacity 0 to 1 | Age stage tab switch |
| `fadeInUp` | Opacity + translateY(30px) to 0 | Scroll-triggered sections |
| `scaleIn` | Opacity + scale(0.8) to 1 | Store V2 elements |
| `pulseGlow` | Coral box-shadow pulse | Store V2 CTAs |

---

## Design System

| Token | Value |
|---|---|
| Coral (primary CTA) | `#F43357` |
| Coral hover | `#D62646` |
| Navy (headings, dark sections) | `#1F293B` |
| Cream (background) | `#FAF7F4` |
| Beige (secondary background) | `#F2EDEA` |
| Sage (muted accent) | `#7C8A98` |
| Dark text | `#161E2A` |
| Body font | Poppins |
| Heading font | Playfair Display |

Camp Snooze uses a separate palette: forest `#355E3B`, gold `#D4A574`, cream `#F5F1EB`. Fonts: Cormorant Garamond (headings), DM Sans (body), Satisfy (script). See `docs/brand/BRAND-SNAPSHOT.md`.

---

## Critical Constraint: Visual Editor

**Never open a custom-coded page through Kajabi's visual page builder.** Opening a page in the editor and saving will strip or scramble the code. All edits go through git and are deployed by pasting into the relevant Kajabi code field.

---

## Known Issues and Placeholders

- **Camp Snooze countdown deadline** is hardcoded to March 31, 2026 AEDT (expired). Update `camp-snooze-v2-luxury.js` before next cohort.
- **`camp-snooze-member-checkout-blocks.html`** still has `[YOUR_OFFER_ID]` placeholder. Not production-ready.
- **Day pass checkout** has an `alert()` placeholder instead of a real checkout URL. Not production-ready.
- **Launch banner** text references "Founding Member pricing" and January 2026 dates. Outdated.
- **Ask Sally newsletter form** is a static HTML form with placeholder comment. Not yet wired to Kajabi.
- **Age page lead capture forms** have placeholder comments. Not yet wired.
- **Messenger chat widget** exists in `components/` but the CTA href is `#` and the JS handler is missing. Not deployed.

---

## What Kade Manages (Outside VSP Scope)

- **GTM container configuration** (GA4 settings, Meta Pixel events, Clarity rules)
- **Stape server-side infrastructure** (`load.ss.joinsnooze.com` domain and container)
- **Kajabi automations and pipelines** (post-purchase flows, email sequences)
- **Database integrations** (Supabase connections)
- **Email deliverability** (SPF, DKIM, sending domain)
- **Page URL slugs** (SEO-critical; must not change without redirect setup)
- **Offer creation in Kajabi** (new offer IDs; VSP references them in code)

---

## Deployment Workflow

See [WEBSITE-DEPLOYMENT-WORKFLOW.md](./WEBSITE-DEPLOYMENT-WORKFLOW.md) for the full step-by-step process.
