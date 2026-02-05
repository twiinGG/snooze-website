# Store Page Design Brief

**Date:** January 21, 2026  
**Page:** `/store` (Kajabi System Page)  
**Purpose:** Transform unused store page into comprehensive Snooze store showcasing all offerings  
**Design System:** Aligned with Home V2 and Snooze Library pages

---

## Design System Alignment

### Reference Pages
- **Home V2:** `projects/snooze-website/kajabi-deployment/pages/website/Home-V2/home-page-v2.html`
- **Snooze Library:** `projects/snooze-website/kajabi-deployment/pages/website/library/library-page.html`
- **Global CSS:** `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`

### Design Principles
1. **Consistent Visual Language:** Use same components, colors, typography as Home V2 and Library
2. **Premium Feel:** Match the quality and polish of existing pages
3. **Clear Hierarchy:** Featured membership, then courses, then services
4. **Mobile-First:** Responsive design matching existing breakpoints

---

## Page Structure

### 1. Hero Section
**Reference:** Home V2 Hero Section (lines 34-57)

**Design:**
- Use `.hero-wrap` container
- Use `.hero-grid` layout (two-column on desktop, stacked on mobile)
- Background: Gradient mesh or cream background (`bg-cream`)

**Content:**
- **Tag:** "THE SNOOZE STORE" (yellow pill badge, matching Home V2)
- **H1:** "Everything You Need for Better Baby Sleep"
- **Subheadline:** "From courses to coaching, find the perfect sleep support for your family"
- **CTA:** "Browse All Offerings" (secondary button, links to #membership)

**Styling:**
```html
<section class="hero-wrap">
  <div class="snooze-container">
    <div class="hero-grid">
      <div class="hero-content">
        <span class="hero-tag">THE SNOOZE STORE</span>
        <h1>Everything You Need for Better Baby Sleep</h1>
        <p>From courses to coaching, find the perfect sleep support for your family</p>
        <a href="#membership" class="btn btn-outline">Browse All Offerings</a>
      </div>
      <div class="hero-img">
        <!-- Optional: Store illustration or product collage image -->
      </div>
    </div>
  </div>
</section>
```

---

### 2. Trust Bar
**Reference:** Home V2 Trust Bar (lines 60-68)

**Design:**
- Use `.trust-bar` component
- Three trust indicators matching Home V2 style

**Content:**
- "4.9/5 rating" with star icon
- "2,500+ families helped" with users icon
- "Support when you need it" with clock icon

**Styling:**
```html
<div class="trust-bar">
  <div class="snooze-container">
    <div class="trust-flex">
      <div class="trust-item"><i class="fa-solid fa-star"></i> <strong>4.9/5</strong> rating</div>
      <div class="trust-item"><i class="fa-solid fa-users"></i> <strong>2,500+</strong> families helped</div>
      <div class="trust-item"><i class="fa-solid fa-clock"></i> Support <strong>when you need it</strong></div>
    </div>
  </div>
</div>
```

---

### 3. Snooze Membership (Featured Section)
**Reference:** Home V2 Pricing Section + Library Card Pattern

**Design:**
- Use `.snooze-section` with `bg-white`
- Featured card style (larger, more prominent)
- Use Library card pattern (`.sn-lib-card`) but enhanced for featured status

**Layout:**
- Single featured card, full-width or 2/3 width
- Border: 2px solid coral (#F43357)
- Badge: "BEST VALUE" or "MOST POPULAR" in coral gradient

**Content:**
- **Title:** "Snooze Access Membership"
- **Description:** "Get access to all courses, weekly live coaching, troubleshooting support, and The Snooze Village community"
- **Pricing:** 
  - Quarterly: $X/month
  - Annual: $X/month (save $X)
- **Features List:** 
  - All courses included
  - Weekly live coaching
  - Troubleshooting support
  - The Snooze Village community
  - Member pricing on consultations
- **CTA:** "Join Snooze" → `/offers/6iRarwak/checkout`

**Styling:**
```html
<section class="snooze-section bg-white" id="membership">
  <div class="snooze-container">
    <div class="text-center max-800" style="margin-bottom: 40px;">
      <h2>Snooze Access Membership</h2>
      <p>Everything you need, all in one place</p>
    </div>
    
    <div class="store-featured-card">
      <div class="store-badge">BEST VALUE</div>
      <h3>Snooze Access</h3>
      <p class="store-description">Get access to all courses, weekly live coaching, troubleshooting support, and The Snooze Village community</p>
      
      <div class="store-pricing">
        <div class="price-option">
          <span class="price-label">Quarterly</span>
          <span class="price-amount">$X<span class="price-period">/month</span></span>
        </div>
        <div class="price-option featured">
          <span class="price-label">Annual</span>
          <span class="price-amount">$X<span class="price-period">/month</span></span>
          <span class="price-savings">Save $X</span>
        </div>
      </div>
      
      <ul class="store-features">
        <li><i class="fa-solid fa-circle-check"></i> All courses included</li>
        <li><i class="fa-solid fa-circle-check"></i> Weekly live coaching</li>
        <li><i class="fa-solid fa-circle-check"></i> Troubleshooting support</li>
        <li><i class="fa-solid fa-circle-check"></i> The Snooze Village community</li>
        <li><i class="fa-solid fa-circle-check"></i> Member pricing on consultations</li>
      </ul>
      
      <a href="https://joinsnooze.com/offers/6iRarwak/checkout" class="btn">Join Snooze</a>
    </div>
  </div>
</section>
```

---

### 4. Individual Courses Section
**Reference:** Library Page Age-Based Modules Grid (lines 84-150)

**Design:**
- Use `.sn-library-grid` pattern from Library page
- Use `.sn-lib-card` component style
- Four cards in grid: Newborn, 3-4 Month, 5-12 Month, Toddler

**Layout:**
- Grid: 2 columns desktop, 1 column mobile
- Each card matches Library card design exactly

**Content Structure (per card):**
- Badge: Age range (e.g., "0-3 Months")
- Image: Course hero image (from Library page)
- Title: Course name
- Description: Brief course description
- CTA: "View Course" with arrow icon

**Styling:**
```html
<section class="snooze-section bg-cream" id="courses">
  <div class="snooze-container">
    <div class="sn-section-header">
      <h2>Individual Sleep Courses</h2>
      <p class="section-subtitle">Age-specific guidance for each developmental stage</p>
      <p class="section-note">All courses included with Snooze Membership</p>
    </div>

    <div class="sn-library-grid">
      <!-- Newborn -->
      <a href="https://joinsnooze.com/newborn-sleep-guide" class="sn-lib-card">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="position: relative; padding: 0;">
              <div class="sn-card-badge">0-3 Months</div>
              <div class="sn-card-image">
                <img src="[NEWBORN_IMAGE_URL]" alt="Newborn Sleep Guide" style="width: 100%; height: auto; display: block;" />
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0;">
              <h3 class="sn-card-title">Newborn Sleep Guide</h3>
              <p class="sn-card-desc">Everything you need to know about newborn sleep patterns, feeding, and establishing healthy foundations</p>
              <div class="sn-card-link">View Guide <i class="fas fa-arrow-right"></i></div>
            </td>
          </tr>
        </table>
      </a>

      <!-- 3-4 Month -->
      <a href="https://joinsnooze.com/3-4-month-baby-sleep-course" class="sn-lib-card">
        <!-- Same structure as Newborn -->
      </a>

      <!-- 5-12 Month -->
      <a href="https://joinsnooze.com/5-12-month-baby-sleep-course" class="sn-lib-card">
        <!-- Same structure as Newborn -->
      </a>

      <!-- Toddler -->
      <a href="https://joinsnooze.com/toddler-toolkit" class="sn-lib-card">
        <!-- Same structure as Newborn -->
      </a>
    </div>
  </div>
</section>
```

**Image URLs (from Library page):**
- Newborn: `https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/da8fc81-feb4-3edc-2cd2-7c85d631efa_Newborn_Baby_Sleeping.png`
- 3-4 Month: `https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/e0b6bc0-18e1-a5ca-7a06-125b1ffce22_4_month_old_sleeping_baby_-_hero.png`
- 5-12 Month: `https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/e64f81f-40-1418-d252-46d4a0bc188_5-12month_Hero_image.png`
- Toddler: `https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/55aa350-fb50-2c4-6635-6852ddd6cc6f_Snooze_Toddler_Sleep_Help.webp`

---

### 5. 1:1 Consultations Section
**Reference:** Home V2 Step Cards (lines 78-96)

**Design:**
- Use `.steps-grid` pattern (3 columns desktop, 1 column mobile)
- Use `.step-card` component style
- Three consultation options

**Layout:**
- Three cards in grid
- Each card: Icon, title, description, CTA

**Content:**
1. **Signature Consult**
   - Icon: User/consultation icon
   - Title: "Signature Consult"
   - Description: "Comprehensive 1:1 sleep consultation with Sally"
   - Price: "$650" (or member price "$525")
   - CTA: "Learn More" → `/one-on-one-sleep-consultations`

2. **Follow-up Consult**
   - Icon: Clock/repeat icon
   - Title: "45-Minute Follow-up"
   - Description: "Additional support after your initial consult"
   - Price: "$390"
   - CTA: "Learn More" → `/one-on-one-sleep-consultations`

3. **2-Week Package**
   - Icon: Calendar/package icon
   - Title: "2-Week Transformation Package"
   - Description: "Intensive support for complete sleep transformation"
   - Price: "$3,500"
   - CTA: "Learn More" → `/one-on-one-sleep-consultations`

**Styling:**
```html
<section class="snooze-section bg-white" id="consultations">
  <div class="snooze-container">
    <div class="text-center max-800" style="margin-bottom: 40px;">
      <h2>1:1 Personalized Sleep Support</h2>
      <p>Get expert guidance tailored to your family's unique situation</p>
    </div>
    
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-icon"><i class="fa-solid fa-user-doctor"></i></div>
        <h3>Signature Consult</h3>
        <p>Comprehensive 1:1 sleep consultation with Sally</p>
        <div class="step-price">$650</div>
        <a href="https://joinsnooze.com/one-on-one-sleep-consultations" class="btn btn-outline">Learn More</a>
      </div>
      
      <div class="step-card">
        <div class="step-icon"><i class="fa-solid fa-clock"></i></div>
        <h3>45-Minute Follow-up</h3>
        <p>Additional support after your initial consult</p>
        <div class="step-price">$390</div>
        <a href="https://joinsnooze.com/one-on-one-sleep-consultations" class="btn btn-outline">Learn More</a>
      </div>
      
      <div class="step-card">
        <div class="step-icon"><i class="fa-solid fa-calendar-check"></i></div>
        <h3>2-Week Transformation Package</h3>
        <p>Intensive support for complete sleep transformation</p>
        <div class="step-price">$3,500</div>
        <a href="https://joinsnooze.com/one-on-one-sleep-consultations" class="btn btn-outline">Learn More</a>
      </div>
    </div>
    
    <p class="text-center" style="margin-top: 30px; color: var(--c-muted);">
      <i class="fa-solid fa-info-circle"></i> Member pricing available. <a href="https://joinsnooze.com/offers/6iRarwak/checkout">Join Snooze</a> to save.
    </p>
  </div>
</section>
```

---

### 6. Camp Snooze Section
**Reference:** Home V2 Featured Card Pattern

**Design:**
- Single featured card (similar to membership section)
- Prominent, eye-catching design
- Use coral accent border

**Content:**
- **Title:** "Camp Snooze"
- **Subtitle:** "Intensive 2-Week Virtual Sleep Camp"
- **Description:** "Join our intensive virtual sleep camp for comprehensive sleep transformation"
- **Pricing:**
  - Regular: $690
  - Member Price: $390 (with discount code)
- **Features:**
  - 2-week intensive program
  - Daily support and guidance
  - Live coaching sessions
  - Community access
- **CTA:** "Learn More" → Camp Snooze landing page
- **Note:** "Member discount: $300 off with code SNOOZEJAN26"

**Styling:**
```html
<section class="snooze-section bg-cream" id="camp-snooze">
  <div class="snooze-container">
    <div class="store-featured-card" style="max-width: 800px; margin: 0 auto;">
      <div class="store-badge" style="background: linear-gradient(135deg, #F43357, #D62646);">INTENSIVE PROGRAM</div>
      <h2>Camp Snooze</h2>
      <p class="store-subtitle">Intensive 2-Week Virtual Sleep Camp</p>
      <p class="store-description">Join our intensive virtual sleep camp for comprehensive sleep transformation with daily support and live coaching</p>
      
      <div class="store-pricing-single">
        <div class="price-main">
          <span class="price-amount">$690</span>
          <span class="price-label">Regular Price</span>
        </div>
        <div class="price-member">
          <span class="price-amount">$390</span>
          <span class="price-label">Member Price</span>
          <span class="price-savings">Save $300</span>
        </div>
      </div>
      
      <ul class="store-features">
        <li><i class="fa-solid fa-circle-check"></i> 2-week intensive program</li>
        <li><i class="fa-solid fa-circle-check"></i> Daily support and guidance</li>
        <li><i class="fa-solid fa-circle-check"></i> Live coaching sessions</li>
        <li><i class="fa-solid fa-circle-check"></i> Community access</li>
      </ul>
      
      <a href="[CAMP_SNOOZE_LANDING_PAGE_URL]" class="btn">Learn More About Camp Snooze</a>
      <p class="text-center" style="margin-top: 15px; font-size: 0.9rem; color: var(--c-muted);">
        Member discount: $300 off with code <strong>SNOOZEJAN26</strong>
      </p>
    </div>
  </div>
</section>
```

---

### 7. Recommended Products (Optional Section)
**Reference:** Home V2 Secondary Section Pattern

**Design:**
- Simple text section with CTA
- Less prominent than main offerings

**Content:**
- **Title:** "Curated Baby Sleep Products"
- **Description:** "We've tested and love these products that support better sleep"
- **CTA:** "View Recommended Products" → `/recommended-products`

**Styling:**
```html
<section class="snooze-section bg-white">
  <div class="snooze-container max-800 text-center">
    <h2>Curated Baby Sleep Products</h2>
    <p>We've tested and love these products that support better sleep</p>
    <a href="https://joinsnooze.com/recommended-products" class="btn btn-outline">View Recommended Products</a>
  </div>
</section>
```

---

## Typography

### Headings
- **H1:** Fraunces 600 SemiBold, 3xl-4xl (clamp: 2.25rem to 3.75rem)
- **H2:** Fraunces 400 Regular, 2xl-3xl (clamp: 1.875rem to 2.75rem)
- **H3:** Fraunces 600 SemiBold, lg-xl (clamp: 1.25rem to 1.5rem)

### Body Text
- **Primary:** Inter 400 Regular, base (1rem / 16px)
- **Secondary:** Inter 400 Regular, md (1.125rem / 18px) for intro paragraphs
- **Small:** DM Sans 500 Medium, sm or xs

### Colors
- **Headings:** Navy (#1F293B)
- **Body:** Soft charcoal (#334155)
- **Muted:** Sage-400 or Navy-400
- **Accent:** Coral (#F43357)

---

## Color System

### Primary Colors
- **Coral:** #F43357 (buttons, CTAs, accents)
- **Navy:** #1F293B (headings, primary text)
- **Cream:** #FAF7F4 (backgrounds)

### Backgrounds
- **White:** `bg-white` class
- **Cream:** `bg-cream` class
- **Gradient Mesh:** For hero sections (from Home V2)

---

## Components Reference

### Buttons
- **Primary:** `.btn` (coral background, white text, pill shape)
- **Secondary:** `.btn-outline` (transparent, coral border)

### Cards
- **Library Card:** `.sn-lib-card` (from Library page)
- **Step Card:** `.step-card` (from Home V2)
- **Featured Card:** Custom `.store-featured-card` (enhanced version)

### Containers
- **Main Container:** `.snooze-container` (max-width, centered)
- **Section:** `.snooze-section` (padding top/bottom)
- **Max Width:** `.max-800` (for centered content)

### Grids
- **Library Grid:** `.sn-library-grid` (2 columns desktop, 1 mobile)
- **Steps Grid:** `.steps-grid` (3 columns desktop, 1 mobile)

---

## CSS Classes to Use

### Existing Classes (from unified theme)
- `.hero-wrap`, `.hero-grid`, `.hero-content`, `.hero-tag`
- `.snooze-container`, `.snooze-section`
- `.bg-white`, `.bg-cream`
- `.btn`, `.btn-outline`
- `.steps-grid`, `.step-card`
- `.sn-library-grid`, `.sn-lib-card`, `.sn-card-badge`, `.sn-card-title`, `.sn-card-desc`, `.sn-card-link`
- `.trust-bar`, `.trust-flex`, `.trust-item`
- `.text-center`, `.max-800`

### New Classes Needed (to be added to CSS)
- `.store-featured-card` - Enhanced featured card with border
- `.store-badge` - Badge for "BEST VALUE", "MOST POPULAR", etc.
- `.store-pricing` - Pricing display container
- `.store-features` - Feature list styling
- `.step-icon` - Icon container for step cards
- `.step-price` - Price display in step cards

---

## Implementation Notes

### Kajabi System Page Limitations
- System pages have limited customization
- May need to use Code Blocks for custom HTML
- CSS must be added to global theme file
- JavaScript can be added to global JS file

### Responsive Breakpoints
- Match existing breakpoints from unified theme
- Mobile-first approach
- Test at: 320px, 768px, 1024px, 1280px

### Performance
- Use existing images from Library page (already optimized)
- Lazy load images below fold
- Minimize custom CSS (reuse existing classes)

### Accessibility
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- ARIA labels where needed
- Keyboard navigation support

---

## Content Guidelines

### Tone of Voice
- Match Home V2 and Library page tone
- Supportive, evidence-based, permission-giving
- Use "You can" not "You should"
- Use "Usually" not "Always"

### Copy Structure
- Clear value proposition in each section
- Benefit-focused (not feature-focused)
- Include pricing transparency
- Member benefits clearly stated

---

## Next Steps

1. **Review this brief** with design team
2. **Create HTML structure** using Code Blocks in Kajabi
3. **Add CSS classes** to `snooze-unified-theme.css`
4. **Test responsive** breakpoints
5. **Review content** for tone and accuracy
6. **Deploy and monitor** Google Search Console for sitelink updates

---

## Reference Files

- **Home V2 HTML:** `projects/snooze-website/kajabi-deployment/pages/website/Home-V2/home-page-v2.html`
- **Library HTML:** `projects/snooze-website/kajabi-deployment/pages/website/library/library-page.html`
- **Global CSS:** `projects/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css`
- **Design Brief V3:** `projects/snooze-website/docs/home-page-v2/DESIGN-BRIEF-V3.md`
- **URL Reference:** `projects/snooze-website/docs/technical/URL-REFERENCE.md`
