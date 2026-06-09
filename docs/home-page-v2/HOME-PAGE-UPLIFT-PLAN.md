# Home Page Uplift - Implementation Plan

**Date:** January 2026  
**Status:** Planning Phase  
**Purpose:** Complete redesign and rebuild of Snooze home page with latest components, support gap messaging, and mobile-first performance

---

## Executive Summary

This plan outlines the complete rebuild of the Snooze home page (`landing-page-blocks.html`) into a new "Home Page" that addresses all external review recommendations, incorporates "the support gap" messaging framework, uses the latest Camp Snooze component patterns (without camp-specific theming), and is built mobile-first for performance.

**Key Objectives:**
- Address all 5 friction/anxiety points from external review
- Integrate support gap messaging (Vanishing Village, Solo Night, The Setup, Impossible Shift, Invisible Labour)
- Mobile-first performance (<2s load, thumb-zone CTAs, Apple Pay ready)
- Latest price component and sales-focused UX from Camp Snooze
- UK English, USD pricing
- Reference tone of voice and ICA profile throughout

---

## 1. Current State Analysis

### Current Page Issues (from External Review)

**Friction & Anxiety:**
- Large video block interrupts hero flow
- Unclear "what happens next" after CTA
- Social proof too low on page
- Video lacks clear promise/value
- Multiple CTA labels (inconsistent)
- No jump links for navigation
- Risk reversal not prominent near pricing

**Motivation:**
- "What is Snooze?" not immediately clear
- Hero doesn't match ad messaging
- Value proposition too conceptual
- No 3-step "how it works" above fold
- Too broad (not persona-specific enough)
- Pain points not stated in customer language

**Value Communication:**
- No clear "Why Snooze vs alternatives" comparison
- Transformation journey unclear
- No before/after scenarios
- Benefits not paired with pain removal
- No tangible deliverables shown
- Emotional outcomes not explicit

**Objections:**
- "How support works" not clear (channel, response time)
- FAQ too late, not near pricing
- Risk reversal not visible
- Credentials not prominent
- Claims not matched with proof

**Incentives:**
- No clear value stack above pricing
- No "act now" reason
- Annual savings not highlighted
- Payment options limited

### Current Component State

**From `landing-page-blocks.html`:**
- Hero section with image + text
- Transformation reviews
- Inside Snooze grid
- Library preview
- Age stages section
- Value comparison table
- Who it's for
- Trust/founder section
- Testimonial carousel
- Price anchoring
- Pricing section
- FAQ accordion
- Sticky CTA bar

**Issues:**
- Components are dated
- Not using latest Camp Snooze patterns
- Mobile responsiveness is baseline, not mobile-first
- Performance not optimized
- Copy doesn't incorporate support gap

---

## 2. Support Gap Integration Strategy

### The Support Gap Framework

From `ADVERSARY-FRAMEWORKS-v1.md`, five themes express the same truth:

> **Modern motherhood is structurally unsupported.**
> The village vanished. The expectations didn't.
> You're working an impossible shift, alone, in the dark, wondering why you can't just cope.
> You were set up to struggle. And no one told you.

**Five Themes:**
1. **The Vanishing Village** - Support structure that used to exist is gone
2. **The Solo Night** - Isolation of being the only one awake
3. **The Setup** - You were set up to struggle without support
4. **The Impossible Shift** - 24/7 work with no backup, no handover, no relief
5. **The Invisible Labour** - Unpaid, unrecognized work; worth didn't disappear with payslip

### Integration Approach

**Hero Section:**
- **Keep hero copy mostly the same** (recently updated)
- Support gap messaging NOT heavy at top (for clarity of purpose)
- Focus on clear value proposition and "what is Snooze"

**Mid-Page (Value & Differentiation):**
- Support gap themes work well deeper in the page
- Use in "Why Snooze vs Alternatives" section
- Use in "Before/After" scenarios
- Use in objection handling (especially "I should be able to do this alone")

**Copy Language (Use Deeper in Page):**
- "The village vanished. Snooze shows up."
- "You weren't designed to do nights alone."
- "This was never designed for one person."
- "Support is resourcing, not indulgence."

---

## 3. New Page Structure & Flow

### Mobile-First Section Order

**Above Fold (Hero):**
1. **Hero Section** - Support gap hook + clear value prop + primary CTA
   - Support gap recognition (Vanishing Village or Solo Night)
   - "What is Snooze?" in 8 words
   - 3-step "How it works" micro-block
   - Primary CTA with "what happens next" microcopy
   - Trust signals (star rating, "Trusted by X parents", one testimonial)

**First Scroll:**
2. **Outcome Bullets** - Pain → Solution pairs
   - "Stop Googling at 2am" → "Know what to do tonight"
   - "Short naps?" → "Nap extension plan + troubleshooting on demand"
   - "4-month regression?" → "Age-specific guidance + support"

3. **Social Proof** - Pulled higher, stronger
   - Star rating + member count
   - 2-3 short testimonials with baby age + problem + outcome
   - "Loved by thousands of parents"

4. **How It Works** - 3-5 step process
   - Join → Share baby age/situation → Get plan → Message anytime → Adjust as things change
   - Include expected response time if available

**Mid-Page:**
5. **What You Get** - Value stack (not just features)
   - Core membership + support + resources
   - Show tangible deliverables (sample plan preview, blurred chat screenshot)
   - "What you get in your first 24 hours"

6. **Why Snooze vs Alternatives** - Comparison table (KEY DIFFERENTIATOR)
   - **Apps (Huckleberry, etc.)** vs **Self-serve courses** vs **One-time consult** vs **Snooze**
   - **Key Differentiator from Call:**
     - Apps give generalized advice that doesn't work for non-average families
     - Apps give you somewhere to start but don't involve the hard work
     - Apps/courses lack accountability - no one checking in
     - Snooze is like a personal trainer vs Nike app - personalized expert assistance, coached rather than self-directed
     - Accountability: Sally asks "have you moved to 4 hourly feeds yet? If not, why?"
     - Snooze is for people who've tried apps/courses and they didn't work
     - The continuum: winging it → apps/courses → consultant → Snooze (middle ground)
   - Anchor on: on-demand access, personalisation, ongoing iteration, accountability, cost vs repeated consults

7. **Before/After Scenarios** - Real-life moments
   - "2-hour bedtime battles → predictable routine"
   - "Googling at 2am → message support + know what to do tonight"
   - "Feeling like a failure → confident plan"

8. **Age & Stage Support** - Updated from current
   - Keep age toggle functionality
   - Add outcome-led modules (problem → what we do → what improves)
   - Make it scannable, not dense

**Pre-Pricing:**
9. **Testimonials** - Claim-matching proof
   - **All quotes/reviews must be legitimate** - current ones are verified and can be used
   - Testimonials labeled by baby age + problem + outcome
   - Mini case studies
   - Credibility proof (credentials, years experience, # families helped)

10. **Objection Killers** - Top 5 FAQs near pricing
    - Can I cancel anytime?
    - Is this cry-it-out / what's the approach?
    - What ages/stages does it cover?
    - How fast do you respond (especially "24/7")?
    - What's included vs not included?

**Pricing:**
11. **Pricing Section** - Latest Camp Snooze component pattern
    - Use Camp Snooze pricing card structure (not colours/theme)
    - Prominent price display
    - Value anchor ("Total Value: $X")
    - Clear savings calculation
    - Risk reversal directly under CTAs
    - "Best Value" highlighting for annual
    - Payment method icons (Apple Pay, secure checkout)

**Post-Pricing:**
12. **Founder/Trust Section** - Updated
    - Credentials prominent
    - Media mentions (if applicable)
    - Personal connection

13. **FAQ Section** - Improved accordion
    - Top objections answered
    - Scannable format
    - Mobile-optimized

14. **Sticky CTA Bar** - Mobile-first
    - Follows user on scroll
    - Thumb-zone placement
    - Clear, consistent CTA label

---

## 4. Component Requirements

### Hero Section (Keep Mostly Same)

**Structure:**
- **Keep existing hero copy** (recently updated, don't change)
- Clear "What is Snooze" descriptor (already present)
- Headline: Keep current format
- 3-step "How it works" micro-block (add if not present)
- Primary CTA with microcopy (add "what happens next")
- Trust signals (rating, count, testimonial)

**Note:** Hero section has been recently updated, so keep the copy structure and messaging as-is. Only add microcopy improvements (e.g., "what happens next" under CTA).

**Mobile-First:**
- Single column layout
- Large, high-contrast text
- CTA in thumb zone (bottom/mid screen)
- Fast load (<1s for hero)

**Copy Requirements:**
- UK English
- Support gap language integrated
- ICA-aligned (28-38, 3-9 months, exhausted, evidence-oriented)
- Tone of voice: "I would", "You can", "Usually", no "should/must"

### Pricing Component (Camp Snooze Pattern)

**From Camp Snooze:**
- Prominent price display
- Value anchor ("Total Value: $X")
- Price label (e.g., "Snooze Member Price")
- Price details link/modal
- Clear CTA button
- Additional context (spots, dates, etc.)

**Adapt for Home Page:**
- Remove camp-specific theming (colours, imagery)
- Keep structure and UX patterns
- Quarterly vs Annual comparison
- Savings calculation
- Risk reversal under CTAs

**Mobile-First:**
- Thumb-zone CTAs (56px min-height, 280px min-width)
- Apple Pay button visible above fold
- One-hand checkout flow
- Fast load (<2s total)

### Value Stack Component

**Structure:**
- Scannable checklist format
- Each item: Benefit + Value (if applicable)
- Total value calculation
- "Membership today: $X" comparison

**Content:**
- 24/7 sleep support (specify channel)
- Personalised plan (delivered when?)
- Regressions playbooks (which ones?)
- Nap/bedtime routines (templates)
- Ongoing adjustments as baby changes

### Before/After Component

**Format:**
- Two-column (desktop) / stacked (mobile)
- Before: Pain point in customer language
- After: Outcome with Snooze support
- Visual separator (arrow or divider)

**Examples:**
- "2-hour bedtime battles" → "Predictable routine"
- "Googling at 2am" → "Message support + know what to do tonight"
- "Feeling like a failure" → "Confident plan"

### How Support Works Component

**Required Information:**
- **Support channel(s): Email + Realtime in Snooze Village**
- **Response time: Within hours**
- Personalisation process
- Approach/philosophy (especially around sleep training styles)
- Who is answering (credentials)

**Format:**
- Clear, scannable layout
- Icons for each channel (email, community)
- Response time prominently displayed ("Within hours")
- Credentials visible (from about-sally page)

### VSL Video Component

**Current State:**
- Video is Snooze VSL (Video Sales Letter)
- Currently embedded via Kajabi CMS block (not in code)
- Reference: `Snooze VSl Teleprompter Script.md`

**Options:**
1. **Alternative Hosting (Preferred):**
   - Use video hosting with analytics (Vimeo, Wistia, etc.)
   - Embed with custom display
   - Track view analytics (view duration, drop-off points, etc.)

2. **Fallback:**
   - Use Kajabi media URL
   - Build custom display in code
   - No analytics (but functional)

**Requirements:**
- Clear promise/value in video title/caption (from VSL script)
- Reduce visual dominance (smaller height, clearer caption)
- Keep "Join" action persistent (sticky CTA or repeated CTA directly under video)
- Mobile-optimized playback
- Position: After hero, before or after "How it works" section

### Objection Killers Component

**Top 5 FAQs (Near Pricing):**
1. Can I cancel anytime?
2. Is this cry-it-out / what's the approach?
3. What ages/stages does it cover?
4. How fast do you respond (especially "24/7")?
5. What's included vs not included?

**Format:**
- Inline, not just accordion
- Scannable bullets
- Direct answers
- Mobile-optimized

---

## 5. Copy Strategy

### Tone of Voice Requirements

**Core Principles:**
1. Evidence-Based Clarity - Research-backed, plain language
2. Supportive Without Coddling - Acknowledge difficulty, realistic expectations
3. Practical and Actionable - Specific, implementable steps
4. Confident and Calm - Reduce anxiety through certainty
5. Judgment-Free - Never shame parents for choices
6. Relatable and Human - Personal experiences, vulnerability

**Language Patterns:**
- DO USE: "I would" / "I like to" / "For me" (not "you should")
- DO USE: "You can" / "You don't have to" (permission-giving)
- DO USE: "Usually" / "Often" (not "always/never")
- DO USE: "Support" / "Guidance" / "Help" (not "solution/solutions")
- AVOID: Em dashes (—) - use colons, commas, periods
- AVOID: Contrast statements ("not X, it's Y")
- AVOID: "You should" / "You must" (judgmental)

### ICA-Aligned Messaging

**Target Audience:**
- Mum / primary caregiver, 28-38
- Baby aged 3-9 months (peak urgency 4-6 months)
- Professional or returning-to-work context
- Exhausted, evidence-oriented, overwhelmed, but highly motivated

**Pain Points (Exact Words from ICA):**
- "4 month sleep regression"
- "waking 5 times a night wanting full feeds"
- "boycott naps all day long"
- "early rising"
- "dummy... spitting it out for an hour before bed"
- "I'm desperate"
- "you give me hope"
- "terrified that it would undo all that we had already done"

**Emotional Drivers:**
- "I'm failing at something that should be natural"
- "Other people can get their baby to sleep—why can't I?"
- "If I can't fix this, what does that mean about me as a mum/parent?"

**Desired Outcomes:**
- "get sleep back in order"
- "so maybe nights will go better"
- "I'm desperate to get out"
- "you give me hope"
- "big strides"
- "progressing"

### Support Gap Language Integration

**Note:** Support gap messaging works well deeper in the page, not heavy at top (for clarity of purpose).

**Mid-Page Usage (Value & Differentiation):**
- Use in "Why Snooze vs Alternatives" section
- Use in "Before/After" scenarios
- Use in objection handling (especially "I should be able to do this alone")

**Language Options (Use Deeper in Page):**
- "The village vanished. Snooze shows up."
- "You weren't designed to do nights alone."
- "This was never designed for one person."
- "Support is resourcing, not indulgence."
- "You're not failing. You're unsupported."

**Objection Handling:**
- "You're not failing. You're unsupported."
- "This was never designed for one person."
- "You deserve help even if you're 'managing.'"

---

## 6. Technical Requirements

### Performance Targets

**Mobile-First:**
- Load time: <2 seconds on 4G
- First Contentful Paint: <1 second
- Time to Interactive: <3 seconds
- Lighthouse Performance Score: 90+

**Optimization:**
- Compress images (WebP format, lazy loading)
- Minimize scripts (defer non-critical CSS)
- Lazy-load below-the-fold assets
- Optimize fonts (subset, preload)

### Mobile UX Requirements

**Thumb-Zone Design:**
- Tappable targets: 48×48px minimum
- Key CTAs: 56px min-height, 280px min-width
- CTAs placed in natural thumb zones (bottom/mid screen)
- Sticky CTA bar on mobile

**Apple Pay Integration:**
- Apple Pay button visible above fold (no scrolling)
- One-hand checkout flow
- No manual card entry required
- Fast checkout (<30 seconds)

**Responsive Breakpoints:**
- Mobile: 320px - 767px (primary focus)
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Accessibility

**WCAG 2.1 AA Compliance:**
- Color contrast ratios: 4.5:1 for text, 3:1 for UI components
- Keyboard navigation support
- Screen reader compatibility
- Alt text for all images
- ARIA labels for interactive elements

### Browser Support

**Target Browsers:**
- Safari (iOS 14+)
- Chrome (mobile + desktop)
- Firefox (mobile + desktop)
- Edge (desktop)

---

## 7. Design System Reference

### Camp Snooze Component Patterns (Adapted)

**Pricing Card Structure:**
- Prominent price display
- Value anchor
- Price label
- Feature list
- CTA button
- Additional context

**Card Layout:**
- Clean, spacious design
- Clear hierarchy
- Scannable content
- Mobile-optimized

**Color Palette (Not Camp-Specific):**
- Use Snooze brand colors (navy, cream, sage)
- Remove camp-specific colors (forest, gold, rust)
- Maintain accessibility contrast

### Typography

**Font Stack:**
- Primary: System font stack (San Francisco, Segoe UI, etc.)
- Fallback: Sans-serif
- Sizes: Mobile-first (16px base, scale up)

**Hierarchy:**
- H1: 2.5rem (mobile) / 3.5rem (desktop)
- H2: 2rem (mobile) / 2.5rem (desktop)
- H3: 1.5rem (mobile) / 2rem (desktop)
- Body: 1rem (mobile) / 1.125rem (desktop)

### Spacing

**Mobile-First Spacing:**
- Section padding: 2rem (mobile) / 4rem (desktop)
- Element gaps: 1rem (mobile) / 1.5rem (desktop)
- Content max-width: 100% (mobile) / 56rem (desktop)

---

## 8. Content Gaps to Fill

### From External Review Questions

**"What is Snooze?" (8 words max):**
- Need: Crystal-clear descriptor
- Example: "A membership for on-demand baby sleep support"

**"How support works" details:**
- Support channel(s): Chat / Phone / Video?
- Typical response time: X hours / minutes?
- Personalisation process: How does it work?
- Approach/philosophy: Gentle? Cry-it-out? Evidence-based?

**"What you get in first 24 hours":**
- Specific deliverables
- Timeline
- First steps

**Sample deliverables:**
- Sleep plan preview (screenshot)
- Chat/support screenshot (blurred)
- Resource examples

**Credentials & legitimacy:**
- **Source: `about-sally` page**
- Certified Sleep Consultant
- Former Paediatric Nurse
- Host of Nap Trapped Podcast
- Thousands of families helped
- Media mentions (if applicable)

**"Why Snooze vs alternatives" comparison (Key Differentiator from Call):**
- **Apps (Huckleberry, etc.):** 
  - Generalized advice that doesn't work for non-average families
  - Gives you somewhere to start but doesn't involve the hard work
  - No accountability - no one checking in
  - Works for average families, but Snooze works with "average plus" families
- **Self-serve courses:** 
  - No accountability - no one checking in
  - You're on your own to implement
  - Can write it off in the middle of the night when exhausted
- **One-time consult:** 
  - Expensive ($500+)
  - No ongoing support
  - No community
- **Snooze (The Middle Ground):**
  - Like a personal trainer vs Nike app - personalized expert assistance, coached rather than self-directed
  - Accountability: "Have you moved to 4 hourly feeds yet? If not, why?"
  - Ongoing support and community
  - For people who've tried apps/courses and they didn't work
  - The continuum: winging it → apps/courses → consultant → **Snooze (middle ground)**

**Before/After scenarios:**
- Real-life moments
- Customer language
- Specific outcomes

---

## 9. Implementation Phases

**Note:** Timelines removed - we're vibe coding this. Work through phases as needed.

### Phase 1: Foundation

**Tasks:**
1. Content audit and gap analysis
   - Identify all content needed
   - Map support gap themes to sections
   - List missing information

2. Component design
   - Design new hero section
   - Adapt Camp Snooze pricing component
   - Design value stack component
   - Design before/after component
   - Design "how support works" component

3. Copy framework
   - Hero hook options (support gap themes)
   - Value proposition statements
   - CTA microcopy
   - Objection handling copy

**Deliverables:**
- Content requirements document
- Component mockups/wireframes
- Copy framework document

### Phase 2: Content Creation

**Tasks:**
1. Write all copy
   - Hero section
   - Outcome bullets
   - How it works
   - Value stack
   - Before/after scenarios
   - Objection killers
   - All section copy

2. Gather assets
   - Sample sleep plan screenshot
   - Chat/support screenshot (blurred)
   - Testimonials with age/problem/outcome
   - Credentials/legitimacy proof

3. Review and refine
   - Tone of voice check
   - ICA alignment check
   - Support gap integration check
   - UK English check

**Deliverables:**
- Complete copy document
- Asset list and sources
- Content review checklist

### Phase 3: Development

**Tasks:**
1. Build HTML structure
   - Mobile-first HTML
   - Semantic markup
   - Accessibility attributes

2. Implement CSS
   - Mobile-first styles
   - Responsive breakpoints
   - Performance optimizations

3. Add JavaScript (if needed)
   - Sticky CTA functionality
   - Smooth scrolling
   - Modal functionality (if needed)

4. Performance optimization
   - Image optimization
   - Script minification
   - CSS optimization
   - Lazy loading

**Deliverables:**
- Complete HTML file
- CSS file (or inline styles)
- JavaScript file (if needed)
- Performance report

### Phase 4: Testing & Refinement

**Tasks:**
1. Mobile testing
   - Test on real devices
   - Test Apple Pay flow
   - Test thumb-zone CTAs
   - Test load times

2. Desktop testing
   - Cross-browser testing
   - Responsive breakpoints
   - Visual consistency

3. Accessibility testing
   - Screen reader testing
   - Keyboard navigation
   - Color contrast
   - WCAG compliance

4. Performance testing
   - Lighthouse scores
   - Load time measurements
   - Core Web Vitals

5. Content review
   - Final tone of voice check
   - Final ICA alignment
   - Final support gap integration
   - Final UK English check

**Deliverables:**
- Testing report
- Bug fixes
- Performance report
- Final content review

### Phase 5: Deployment

**Tasks:**
1. Kajabi setup
   - Create new "Home Page" page
   - Copy HTML blocks
   - Configure settings
   - Test in preview

2. Final checks
   - All links working
   - All images loading
   - All CTAs functional
   - Mobile preview check

3. Launch
   - Publish page
   - Monitor performance
   - Gather feedback

**Deliverables:**
- Live home page
- Deployment checklist
- Post-launch monitoring plan

---

## 10. Success Criteria

### Performance Metrics

**Load Time:**
- Mobile: <2 seconds on 4G
- Desktop: <1.5 seconds
- Lighthouse Performance: 90+

**Mobile UX:**
- Thumb-zone CTA placement: 100%
- Apple Pay visible above fold: Yes
- One-hand checkout: Yes

### Conversion Metrics

**Engagement:**
- Scroll depth: >70% to pricing
- Time on page: >2 minutes
- CTA click rate: >5%

**Conversion:**
- Checkout initiation: >3%
- Purchase completion: >2%
- Mobile conversion: >57% (matching historical)

### Content Metrics

**Tone of Voice:**
- Zero "you should" / "you must" instances
- Support gap language integrated: 3+ instances
- ICA-aligned pain points: All major pain points addressed

**Accessibility:**
- WCAG 2.1 AA compliance: 100%
- Screen reader compatibility: Yes
- Keyboard navigation: Yes

---

## 11. Risk Mitigation

### Content Risks

**Missing Information:**
- Risk: Key details missing (response time, support channels, etc.)
- Mitigation: Content audit in Phase 1, identify gaps early

**Support Gap Integration:**
- Risk: Too heavy-handed or not integrated naturally
- Mitigation: Review with tone of voice guide, test with users

### Technical Risks

**Performance:**
- Risk: Slow load times on mobile
- Mitigation: Performance targets set, optimization in Phase 3, testing in Phase 4

**Mobile UX:**
- Risk: CTAs not in thumb zone, Apple Pay not visible
- Mitigation: Mobile-first design, real device testing

### Design Risks

**Camp Snooze Adaptation:**
- Risk: Too similar to camp page or too different
- Mitigation: Use structure/UX patterns, not colors/theme, review with design system

---

## 12. Dependencies

### Content Dependencies

**Required Information:**
- Support channel details (chat/phone/video)
- Response time commitments
- Personalisation process details
- Credentials and legitimacy proof
- Sample deliverables (plan preview, chat screenshot)

**Required Assets:**
- Sample sleep plan screenshot
- Chat/support screenshot (blurred)
- Testimonials with age/problem/outcome
- Credentials/legitimacy images

### Technical Dependencies

**Kajabi:**
- Access to Kajabi account
- Ability to create new pages
- Ability to add custom HTML/CSS/JS

**Third-Party:**
- Apple Pay integration (if not already set up)
- Font Awesome (for icons)
- Any analytics tools

---

## 13. Next Steps

### Immediate Actions

1. **Review this plan** with stakeholders
2. **Approve approach** and timeline
3. **Identify content gaps** and assign owners
4. **Gather required assets** and information
5. **Begin Phase 1** (Foundation)

### Questions to Answer

**Before Starting:**
- ✅ Support channels: Email + Realtime in Snooze Village
- ✅ Response time: Within hours
- ✅ Credentials: From about-sally page (Certified Sleep Consultant, Former Paediatric Nurse, Host of Nap Trapped Podcast, Thousands of families helped)
- What is the personalisation process?
- What sample deliverables can be shown?

**During Development:**
- ✅ Support gap: Use deeper in page, not heavy at top (for clarity)
- ✅ Hero: Keep mostly the same (recently updated)
- ✅ Reviews: Use only legitimate, verified testimonials (current ones are verified)
- What's the right balance of emotion vs. information in mid-page sections?
- Which video hosting solution provides best analytics?

---

## 14. References

### Documents Reviewed

1. **External Review** (`ExternalReview.md`)
   - 5-step evaluation framework
   - Specific recommendations
   - Questions to answer

2. **CRO Primary User Flow** (`CRO-PRIMARY-USER-FLOW.md`)
   - Complete user journey
   - Conversion optimization tactics
   - Mobile-first requirements

3. **High-Conversion Techniques** (`what are the latest, leading techniques in highcon.md`)
   - Mobile-first UX patterns
   - Performance requirements
   - Trust and social proof

4. **Adversary Frameworks** (`ADVERSARY-FRAMEWORKS-v1.md`)
   - Support gap themes
   - Script examples
   - Language patterns

5. **ICA Document** (`SNOOZE-ICA-DOCUMENT-20251224-015053.md`)
   - Target audience
   - Pain points (exact words)
   - Emotional drivers
   - Desired outcomes

6. **Camp Snooze Page** (`camp-snooze-landing-page-blocks.html`)
   - Pricing component structure
   - Sales-focused UX patterns
   - Component patterns to adapt

7. **Current Landing Page** (`landing-page-blocks.html`)
   - Current structure
   - Components to update
   - Issues to fix

8. **Snooze Differentiation Call** (`Snooze-Differentiation Call.md`)
   - Key differentiator: Apps vs Courses vs Consults vs Snooze
   - Accountability messaging
   - Personal trainer vs Nike app analogy

9. **About Sally Page** (`about-sally-complete.html`)
   - Credentials source
   - Experience details
   - Philosophy and approach

10. **Snooze VSL Script** (`Snooze VSl Teleprompter Script.md`)
    - Video content reference
    - Key messaging points
    - Value propositions

### Tone of Voice References

- Tone of voice principles (from multiple documents)
- Language patterns (DO USE / DON'T USE)
- ICA-aligned messaging
- Support gap language

---

## 15. Approval & Sign-Off

**Plan Status:** Updated with Latest Requirements  
**Next Step:** Begin implementation (vibe coding - no strict timeline)  
**Key Updates:**
- Hero section: Keep mostly the same (recently updated)
- Support gap: Use deeper in page, not heavy at top
- Reviews: Only legitimate, verified testimonials
- Support channel: Email + Realtime in Snooze Village (within hours)
- Credentials: From about-sally page
- Key differentiator: Apps vs Courses vs Consults vs Snooze (accountability focus)
- VSL video: May use alternative hosting for analytics, or fallback to Kajabi URL
**Owner:** [To be assigned]

---

**Last Updated:** January 2026  
**Version:** 1.0
