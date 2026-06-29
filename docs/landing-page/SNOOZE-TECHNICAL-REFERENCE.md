# Snooze Technical Reference

**Version:** 1.0  
**Date:** November 2025  
**Status:** Implementation Guide

---

## 🎯 Overview

This document contains technical specifications, SEO optimization strategies, and Kajabi implementation notes for the Snooze landing page and website.

---

## 📄 Landing Page Specifications

### Page Structure

| Section | Purpose | Key Elements |
|---------|---------|--------------|
| 1. Header/Navbar | Navigation + brand trust | Snooze logo, links: About, Get in Touch, Blog, CTA: "Join Snooze" |
| 2. Hero Section | Establish authority & clear CTA | Headline, Subheading, Button "Get Started", Hero image (mother & child), trust badges |
| 3. Key Feature Summary (Icons) | Highlight core features | Four icon cards (Guides, Coaching, Community, New Tools) |
| 4. Value Comparison Table | Demonstrate price advantage | Side-by-side: individual values vs membership total |
| 5. About/Founder Section | Build credibility | Bio of Sally (photo, intro, credentials, social links) |
| 6. Testimonial Carousel | Social proof | Looping carousel of parent reviews |
| 7. Pricing Cards (Plans) | Conversion decision point | Quarterly vs Annual pricing, CTA buttons |
| 8. FAQ Accordion | Reduce objections | 5 questions with toggle answers |
| 9. Footer | Brand & links | Logo, copyright, social links |

### Content Architecture

#### Hero Section

**Heading:**
"Great Baby Sleep, For Life"

**Subheading:**
"Join Snooze and get everything you need to build healthy sustainable sleep habits for your baby. Get every one of The Sleep Concierge's guides and courses along with live sessions with Sally and Bec, and an expert-moderated sleep community."

**Primary CTA:**
"Get Started" → Offer checkout URL

**Visual:**
Image Snooze_Hero.png (mother + child)

**Trust Badges:**
"5.0 Google Reviews", "Host of Nap Trapped", "Certified Sleep Consultant & Paediatric Nurse"

#### Feature Grid

| Icon | Heading | Description |
|------|---------|-------------|
| 📘 | Guides for Every Age | Step-by-step routines for naps, nights, and regressions — from newborn to toddler |
| 🎥 | Live Sessions | Join live Q&A sessions with Sally and Bec. Bring your questions and get guidance tailored to your baby. |
| 💬 | Private Parent Community | Get calm, expert-moderated support from families on the same journey |
| 🧩 | New Tools Each Month | Fresh guides, schedules, and updates to match your baby's changing needs |

#### Value Comparison Table

| Included in Snooze | Value (USD) |
|-------------------|-------------|
| All Snooze guides & courses (0–3 years) | $180 |
| Live sessions with Sally and Bec | $320 |
| Community access & support thread | $90 |
| Bonus seasonal workshops & guest experts | $130 |
| **Member discounts:** | |
| 1:1 Sleep Consult | 20% off → $145 |
| 2-Week Support Package | 15% off → $270 |
| **Total if purchased separately:** | **$900+** |
| **Your Snooze Membership:** | **$147 / 3 months (Launch) / $197 / 3 months (Normal)** |

*"You save significantly compared to buying individually."*

---

## 🎨 Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary (Coral) | `#F43357` | CTAs, highlights |
| Navy | `#1F293B` | Headings, text |
| Cream | `#FAF7F4` | Backgrounds |
| Beige | `#F2EDEA` | Secondary backgrounds |
| Sage | `#7C8A98` | Secondary text |
| Coral Tint | `#FFE7EA` | Accent backgrounds |

### Typography

- **Heading Font:** Playfair Display, Georgia, serif
- **Body Font:** Poppins, Arial, sans-serif
- **Icons:** Font Awesome 6.4.0

### Shadows

- `--shadow-md`: `0 8px 20px rgba(0,0,0,0.08)`
- `--shadow-lg`: `0 12px 28px rgba(0,0,0,0.12)`

---

## 🔧 Functional Elements

### Components

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| Buttons/CTAs | Primary: Coral background (#F43357), white text | CSS only |
| FAQ Toggles | Checkbox + CSS transition for smooth open/close | No JS |
| Carousel | Infinite scroll desktop, swipe + dots mobile | JS snippet |
| Icons | Font Awesome 6 solid set | CDN import in CSS |

### Carousel JavaScript Logic

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector('.carousel-inner');

  // Duplicate for infinite scroll (desktop)
  if (carousel && window.innerWidth > 768) {
    const clone = carousel.innerHTML;
    carousel.insertAdjacentHTML('beforeend', clone);
  }

  // Mobile auto-scroll
  if (window.innerWidth <= 768) {
    const dotsContainer = document.querySelector('.carousel-dots');
    const cards = document.querySelectorAll('.carousel-inner .card');
    if (!dotsContainer || !cards.length) return;

    cards.forEach(() => {
      const dot = document.createElement('span');
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('span');
    let index = 0;
    const updateDots = () => dots.forEach((dot, i) =>
      dot.classList.toggle('active', i === index % cards.length)
    );

    const autoScroll = () => {
      const container = document.querySelector('.carousel-inner');
      const next = cards[index % cards.length];
      if (next) {
        container.scrollTo({ left: next.offsetLeft - container.offsetLeft, behavior: 'smooth' });
      }
      updateDots();
      index++;
    };

    updateDots();
    let interval = setInterval(autoScroll, 3000);
    const container = document.querySelector('.carousel-inner');
    container.addEventListener('touchstart', () => clearInterval(interval));
    container.addEventListener('touchend', () => interval = setInterval(autoScroll, 3000));
  }
});
```

---

## 🔍 SEO Optimization Strategy

### Kajabi Platform Limitations

**Challenges:**
- Limited advanced SEO features (no native schema markup)
- Blog functionality is basic (no plugins like Yoast SEO)
- URL structure constraints (flat URLs, no subdirectories)
- No native support for structured data/schema

**Workarounds:**
- Manual schema markup injection via code blocks
- Custom code sections for advanced features
- Careful manual optimization of each page

### SEO Best Practices

#### 1. On-Page SEO Elements

**Title Tags:**
- Unique, keyword-rich titles for each page
- Example: "Baby Sleep Coaching & Courses | Snooze by The Sleep Concierge"
- Include primary keywords (baby sleep, coaching, courses)

**Meta Descriptions:**
- Compelling, keyword-rich descriptions
- Example: "Join Snooze Village for expert-guided baby sleep support – personalized answers, live Q&As, and a village of parents, all for an affordable monthly price."
- Natural language (helps AI summarization)

**Headings:**
- One H1 per page (matches what users search)
- Descriptive H2s/H3s (not generic "Overview")
- Example: "Evidence-Based Methods, Customized for Your Child" (not "Our Approach")

#### 2. FAQ Schema Markup

**Implementation:**
- Add manually via code block with JSON-LD
- Example:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How can I get my baby to sleep through the night?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Consistency is key. Our program helps parents implement these steps with support..."
    }
  }]
}
```

**Benefits:**
- Rich snippet results in Google
- Structured knowledge for AI/LLM systems
- Higher click-through rates

#### 3. Content Strategy for SEO

**Pillar Content:**
- Create "Ultimate Baby Sleep Guide" (pillar page)
- Cover broad topics with sections linking to detailed pages
- Ranks for general queries like "baby sleep guide"

**Topic Clusters:**
- Cluster posts around pillar: "4-Month Sleep Regression", "Top 5 Bedtime Routines", "When to Stop Night Feeds"
- Internal linking: Cluster posts link back to pillar and product pages
- Signals comprehensive knowledge hub (topical authority)

**Question-Based Content:**
- Target question queries: "How do I get my baby to nap longer?"
- FAQ pages with Q&A format
- Each question can target featured snippet

#### 4. Technical SEO

**Sitemap & Indexing:**
- Verify Kajabi's auto-generated sitemap submitted to Google Search Console
- Submit to Bing Webmaster Tools
- Ensure all pages indexed quickly

**Alt Text & Images:**
- Descriptive alt text for all images
- Example: "Mother holding sleeping baby after using Snooze techniques"
- Helps SEO and AI image analysis

**Mobile Usability:**
- Test all pages on mobile (Google mobile-first indexing)
- Ensure responsive design (Kajabi templates are mobile-friendly)
- Stack side-by-side content for mobile

**Page Speed:**
- Minimize third-party scripts
- Compress images
- Balance enhancements with performance
- Consider lazy-loading for heavy elements

#### 5. AI/LLM Optimization

**Natural Language:**
- Write complete, contextual sentences
- Include question/problem statement within answer
- Example: "Swaddling helps newborns self-settle by mimicking the snug feeling of the womb" (not just "It helps them self-settle")

**Organization Schema:**
- Add Organization schema in global header
- Lists The Sleep Concierge/Snooze, services, founder, contact info
- Helps knowledge panel on Google

**Structured Data:**
- FAQ schema for Q&A content
- Review schema for testimonials (if applicable)
- Product schema for membership (if applicable)

**Monitoring:**
- Set up Google Alerts for brand mentions
- Use Bing webmaster tools to see if content used in AI answers
- Identify which pages AI finds most useful → bolster those pages

---

## 🏗️ Kajabi Implementation

### Page Hierarchy

**Homepage as Central Hub:**
- Highlight all major pathways:
  1. Age-based programs
  2. Snooze Membership
  3. 1:1 Consultations
  4. Free Resources (blog/guides)

**Navigation Structure:**
- "Sleep Programs" dropdown (age groups)
- "Membership" menu (overview, testimonials, Camp Snooze)
- "Resources" menu (blog, free guides, FAQ)

**URL Structure:**
- Consistent naming: `/newborn-sleep-guide`, `/infant-sleep-course`, `/toddler-sleep-guide`
- Short, descriptive URLs (SEO-friendly)
- `/snooze-membership` for membership page

**Dedicated Pages:**
- Snooze Membership (primary landing page)
- Camp Snooze (cohort program)
- 1:1 Consultations
- Individual course/guide pages
- About (Sally's bio)
- Contact
- Testimonials/Success Stories

### Content Formatting

**Headings:**
- H2 or H3 roughly every 300 words
- Descriptive subheadings (not generic "Overview")
- Example: "What's Inside the Newborn Sleep Guide"

**Short Paragraphs & Bullets:**
- 1-3 sentences per paragraph
- Lots of line breaks
- Bullet lists for key points
- Start bullets with keywords/concepts

**Emphasis:**
- Use bold sparingly for important phrases
- Example: **"only $147 per quarter (Launch)"** or **"only $197 per quarter (Normal)"**
- Bold key sentence of each paragraph for skim-readers

**CTAs:**
- Conversational CTAs: "YES, I NEED SLEEP SUPPORT!" (not "Join Now")
- Multiple CTAs throughout page
- Consistent messaging from landing page to checkout

### Copy Formatting Best Practices

**For Engagement:**
- Use second-person ("you/your") frequently
- Warm, encouraging tone
- Action verbs in CTAs
- Clear value proposition

**For SEO:**
- Natural keyword integration
- Question-based headings
- Complete, contextual sentences
- Structured lists (ordered/unordered)

**For AI/LLM:**
- Natural language (no fragments)
- Contextual information within answers
- Clear headings as section synopses
- Descriptive alt text for images

---

## 🚀 Performance & Accessibility

### Performance Notes

- Lazy-load hero image and testimonial avatars
- Compress images for faster loading
- Minimize third-party scripts
- Balance enhancements with speed

### Accessibility Notes

- Ensure all `<img>` have alt text
- Use semantic headings (h1 for hero, h2 for section titles)
- Ensure minimum color contrast: coral (#F43357) on cream (#FAF7F4) passes WCAG AA
- CTA buttons have hover and focus states
- FAQ checkboxes labeled with aria-expanded

---

## 📊 Tracking & Analytics

### Setup

**Google Analytics 4 (GA4):**
- Event tracking for CTA button clicks
- Conversion tracking for membership sign-ups
- UTM parameters for traffic sources

**Meta Pixel:**
- CAPI events mapped to StartCheckout and Subscribe
- Conversion tracking for ad campaigns

**UTM Parameters:**
- Add UTMs to every "Join" button variant
- Track source, medium, campaign
- Example: `?utm_source=facebook&utm_medium=social&utm_campaign=launch`

### Key Events to Track

- Membership sign-up (quarterly/annual)
- Individual product purchases
- Consult bookings
- Email list sign-ups
- Free guide downloads
- Video views
- Community engagement

---

## 📚 Related Documents

- `SNOOZE-MASTER-STRATEGY.md` - Complete strategy overview
- `SnoozeLandingDocs.md` - Original landing page specification
- `Snooze x Vidico SEO Analysis and Insights.md` - Complete SEO audit
- `Problems-Section Brief.md` - Development briefs

---

**Status:** Ready for implementation reference

