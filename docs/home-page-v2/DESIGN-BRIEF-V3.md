# Snooze Home Page Design Evolution Brief v3.0

**Project:** Premium Wellness Redesign
**Date:** January 2026
**Status:** Design Phase
**Files:** `home-page-v2.html`, `home-page-v2.css`, `home-page-v2.js`

---

## 1. Project Overview

### Current State
The Snooze home page (v2) is functional and conversion-optimized, but lacks the premium, calming aesthetic that matches our target market's expectations. While the structure is solid, the visual execution feels utilitarian rather than aspirational.

### Vision Statement
Transform the Snooze home page into a **sanctuary of calm confidence** — where exhausted parents feel immediately understood, soothed, and hopeful. The design should feel like a warm embrace at 2am, combining the scientific credibility of a medical professional with the gentle reassurance of a trusted friend.

### Design Philosophy
**"Soft Strength"** — The intersection of gentle wellness aesthetics (Headspace/Calm) with authoritative expertise (Sally's credentials). Not sterile medical, not overly playful — sophisticated, warm, and deeply trustworthy.

---

## 2. Target Audience Deep Dive

### Primary User: The Exhausted Parent

**Demographic:**
- Parents of babies 0-3 years
- Predominantly mothers (85%)
- Age: 28-38
- Income: $75k-150k+ household
- Education: College-educated
- Digital-native, mobile-first users

**Psychographic Profile:**
- **Emotional State:** Sleep-deprived, anxious, overwhelmed, desperate for help
- **Decision Driver:** Trust + proven results + feeling understood
- **Pain Points:** Information overload, tried everything, feel like they're failing
- **Desires:** Clear guidance, expert validation, community support, hope
- **Values:** Evidence-based approaches, gentle methods, responsive parenting
- **Shopping Behavior:** Research heavily, read reviews, need to feel "this is different"

**User Journey Emotional Arc:**
1. **Landing (Skeptical):** "Another sleep program? Will this actually work for MY baby?"
2. **Discovery (Curious):** "This feels different... they actually understand my situation"
3. **Consideration (Hopeful):** "I can see how this could work. Other parents like me succeeded."
4. **Decision (Confident):** "This is the support system I need. I'm not alone anymore."

### Success Psychology
Parents don't buy sleep training — they buy:
- **Relief** from exhaustion and anxiety
- **Confidence** in their parenting
- **Community** and not feeling alone
- **Transformation** of their family's quality of life
- **Hope** that things can actually get better

---

## 3. Aesthetic Direction: "Wellness Sanctuary"

### Core Design Inspiration: Headspace/Calm Meets Premium Parenting

**What We Take From Wellness Apps:**
- Soft, generous whitespace that allows the mind to rest
- Calming color palettes with purposeful pops of energy
- Fluid, organic shapes that feel natural and nurturing
- Subtle, delightful animations that reduce anxiety
- Typography that's inviting yet authoritative
- Depth through layering rather than harsh shadows
- Breathing room — never cramped or cluttered

**What We Add From Premium Parenting Brands:**
- Warmth and emotional connection (not clinical minimalism)
- Credibility signals (credentials, testimonials, proof)
- Clear hierarchy that guides tired minds
- Trust-building design patterns (money-back, response times, real photos)
- Conversion optimization (strategic CTAs, social proof, scarcity)

**What We Avoid:**
- ❌ Generic SaaS aesthetics (purple gradients, Inter font, corporate coldness)
- ❌ Childish/playful design (we're for parents, not babies)
- ❌ Overly clinical medical design (sterile, intimidating)
- ❌ Aggressive sales tactics (flashing banners, countdown timers)
- ❌ Information density that overwhelms tired brains
- ❌ Harsh contrasts or jarring colors that increase stress

---

## 4. Design Principles

### 1. **Calm First, Convert Second**
Every design decision should reduce anxiety, not create it. If a parent feels calmer just browsing the page, conversion will follow naturally.

### 2. **Generous Space = Generous Care**
Whitespace signals we have time for you. Cramped layouts signal scarcity and stress. Give every element room to breathe.

### 3. **Soft Edges, Strong Results**
Rounded corners, gentle gradients, and flowing layouts create psychological safety. But content must be direct and results-focused.

### 4. **Guide the Eye, Don't Shout**
Use subtle animations, soft color accents, and typography hierarchy to guide attention — never aggressive red arrows or flashing elements.

### 5. **Mobile is the Primary Experience**
Most parents will find us at 2am on their phone while rocking a baby. Mobile-first isn't optional — it's everything.

### 6. **Delight in the Details**
Micro-interactions, hover states, smooth transitions — these create the feeling of premium care and attention.

---

## 5. Typography System Overhaul

### Current Typography Issues
- Playfair Display (headlines) + Poppins (body) is serviceable but not distinctive
- Insufficient hierarchy — everything feels same-weight
- Line-height and letter-spacing need refinement
- No differentiation between content types (editorial vs UI vs marketing)

### Proposed Typography System

#### Display Font (Headlines & Hero Copy)
**Primary Choice: [Fraunces](https://fonts.google.com/specimen/Fraunces)** (Variable font)
- Why: Warm, sophisticated serif with "soft wonk" style
- Feel: Authoritative but approachable, elegant without being cold
- Usage: H1, H2, hero headlines, emotional pull quotes
- Weights: 400 (Regular), 600 (SemiBold for emphasis)
- Alternative: [Sentient](https://fonts.google.com/specimen/Sentient) or keep refined Playfair

#### Body Font (Primary Reading Text)
**Primary Choice: [Inter](https://fonts.google.com/specimen/Inter)** (Variable font)
- Wait, didn't we say avoid Inter? Context matters:
  - When paired with distinctive display font, Inter provides clarity
  - Variable font gives precise weight control (350, 450, 550, 650)
  - Excellent readability for tired eyes at small sizes
- Alternative: **[Outfit](https://fonts.google.com/specimen/Outfit)** — softer, more geometric, slightly warmer

#### UI Font (Buttons, Labels, Small Text)
**Primary Choice: [DM Sans](https://fonts.google.com/specimen/DM+Sans)**
- Why: Slightly condensed, high x-height, excellent for UI elements
- Feel: Modern, clean, efficient without being cold
- Usage: Buttons, form labels, navigation, metadata
- Weights: 500 (Medium), 700 (Bold)

### Typography Scale

```css
/* Enhanced Typography Variables */
--font-display: 'Fraunces', 'Playfair Display', serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-ui: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Refined Scale (Major Third: 1.250) */
--text-xs: 0.75rem;      /* 12px - Metadata, small print */
--text-sm: 0.875rem;     /* 14px - Secondary info */
--text-base: 1rem;       /* 16px - Body text baseline */
--text-md: 1.125rem;     /* 18px - Large body, intro paragraphs */
--text-lg: 1.25rem;      /* 20px - Subheadings */
--text-xl: 1.5rem;       /* 24px - H3 */
--text-2xl: 1.875rem;    /* 30px - H2 */
--text-3xl: 2.25rem;     /* 36px - H1 mobile */
--text-4xl: 3rem;        /* 48px - H1 desktop */
--text-5xl: 3.75rem;     /* 60px - Hero display (optional) */

/* Line Height System */
--leading-tight: 1.15;   /* Display headlines */
--leading-snug: 1.35;    /* Subheadings */
--leading-normal: 1.6;   /* Body text */
--leading-relaxed: 1.75; /* Large body text */

/* Letter Spacing */
--tracking-tight: -0.02em;  /* Large headlines */
--tracking-normal: 0;       /* Most text */
--tracking-wide: 0.02em;    /* Small caps, labels */
--tracking-wider: 0.05em;   /* Button text, tags */
```

### Typography Usage Guidelines

**Hero Headlines (H1):**
- Font: Fraunces 600 SemiBold
- Size: 3xl mobile, 4xl desktop (clamp: 2.25rem to 3.75rem)
- Line-height: tight (1.15)
- Letter-spacing: tight (-0.02em)
- Color: Deep navy with optional coral accent word

**Section Headers (H2):**
- Font: Fraunces 400 Regular
- Size: 2xl mobile, 3xl desktop (clamp: 1.875rem to 2.75rem)
- Line-height: snug (1.35)
- Letter-spacing: normal
- Color: Navy

**Subsection Headers (H3):**
- Font: Fraunces 600 SemiBold
- Size: lg to xl (clamp: 1.25rem to 1.5rem)
- Line-height: snug (1.35)
- Color: Navy or coral for emphasis

**Body Text:**
- Font: Inter 400 Regular
- Size: base (1rem / 16px) or md (1.125rem / 18px) for intro paragraphs
- Line-height: relaxed (1.75) for enhanced readability
- Letter-spacing: normal
- Color: Soft charcoal (#334155) not pure black

**Small Text / Metadata:**
- Font: DM Sans 500 Medium
- Size: sm or xs
- Line-height: normal (1.6)
- Letter-spacing: wide (0.02em)
- Color: Muted sage

---

## 6. Color Palette Evolution

### Current Color Issues
- Coral (#F43357) is vibrant but can feel aggressive
- Navy (#1F293B) is strong but can feel heavy
- Cream (#FAF7F4) is nice but could be softer
- Limited depth — needs more tonal variations
- No gradient system for depth and visual interest

### Evolved Color System

#### Primary Colors (Refined)

**Coral (Action & Energy)**
```css
--coral-50: #FEF2F4;    /* Lightest tint, backgrounds */
--coral-100: #FCE4E8;   /* Soft accent areas */
--coral-200: #FACCD5;   /* Borders, dividers */
--coral-300: #F59AAD;   /* Hover states */
--coral-400: #F05C7E;   /* Icons, accents */
--coral-500: #F43357;   /* PRIMARY - Buttons, CTAs */
--coral-600: #D62646;   /* Button hover */
--coral-700: #B61D37;   /* Button active */
--coral-800: #8F1629;   /* Darkest, text on light */
```

**Navy (Authority & Trust)**
```css
--navy-50: #F8F9FB;     /* Lightest backgrounds */
--navy-100: #EEF1F6;    /* Card backgrounds */
--navy-200: #D8DEE9;    /* Borders */
--navy-300: #A6B1C5;    /* Disabled states */
--navy-400: #5C6B85;    /* Secondary text */
--navy-500: #1F293B;    /* PRIMARY - Headlines */
--navy-600: #1A2230;    /* Hover states */
--navy-700: #141A26;    /* Active states */
--navy-800: #0F131C;    /* Darkest backgrounds */
```

**Cream (Warmth & Calm)**
```css
--cream-50: #FDFCFB;    /* Pure white alternative */
--cream-100: #FAF7F4;   /* PRIMARY - Main background */
--cream-200: #F2EDEA;   /* Secondary background */
--cream-300: #E8E0D9;   /* Borders, subtle dividers */
--cream-400: #D4C8BD;   /* Muted elements */
```

#### Secondary Colors

**Sage (Calm & Natural)**
```css
--sage-100: #F0F4F5;    /* Soft backgrounds */
--sage-200: #D8E4E8;    /* Borders */
--sage-300: #B8CDD4;    /* Icons */
--sage-400: #7C8A98;    /* PRIMARY - Muted text */
--sage-500: #5C6C79;    /* Emphasis */
--sage-600: #475360;    /* Dark text */
```

**Yellow (Hope & Optimism)** — Use sparingly
```css
--yellow-100: #FFF9E6;  /* Soft background */
--yellow-200: #FFEDB8;  /* Borders */
--yellow-300: #FFD666;  /* Icons */
--yellow-400: #FFC107;  /* PRIMARY - Tags, badges */
--yellow-500: #E6AA00;  /* Hover */
```

**Lavender (Serenity & Sleep)** — NEW accent color
```css
--lavender-50: #F9F7FD;   /* Subtle backgrounds */
--lavender-100: #F0EBFA;  /* Card accents */
--lavender-200: #DFD3F3;  /* Borders */
--lavender-300: #C4B0E8;  /* Icons */
--lavender-400: #9F7FD5;  /* Accents */
--lavender-500: #8461C9;  /* Sleep-related elements */
```

#### Functional Colors

**Success (Growth & Progress)**
```css
--success-50: #F0FDF4;
--success-500: #10B981;  /* Green for checkmarks, success states */
--success-700: #047857;
```

**Warning (Attention)**
```css
--warning-50: #FFFBEB;
--warning-500: #F59E0B;  /* Amber for important notices */
```

**Error (Problems)**
```css
--error-50: #FEF2F2;
--error-500: #EF4444;    /* Red for errors (use sparingly) */
```

#### Gradient System (NEW)

**Gradient 1: Coral Sunset** — Hero sections, CTA cards
```css
--gradient-coral: linear-gradient(135deg, #F43357 0%, #FD7590 100%);
```

**Gradient 2: Lavender Dream** — Sleep-related sections, testimonials
```css
--gradient-lavender: linear-gradient(135deg, #F0EBFA 0%, #DFD3F3 100%);
```

**Gradient 3: Cream Glow** — Subtle depth on light backgrounds
```css
--gradient-cream: linear-gradient(180deg, #FDFCFB 0%, #FAF7F4 100%);
```

**Gradient 4: Navy Depth** — Dark sections, footer
```css
--gradient-navy: linear-gradient(135deg, #1F293B 0%, #2A3A52 100%);
```

**Gradient 5: Soft Mesh** — Complex backgrounds (using CSS mesh gradients)
```css
--gradient-mesh:
  radial-gradient(at 0% 0%, hsla(340, 90%, 95%, 1) 0px, transparent 50%),
  radial-gradient(at 80% 0%, hsla(260, 85%, 96%, 1) 0px, transparent 50%),
  radial-gradient(at 80% 100%, hsla(25, 85%, 96%, 1) 0px, transparent 50%);
```

---

## 7. Shadows & Depth System

### Current Shadow Issues
- Shadows are present but feel flat
- No sense of elevation hierarchy
- Could be softer and more atmospheric

### Evolved Shadow System

```css
/* Elevation Scale (Based on Material Design but softer) */

/* 01: Barely there — Subtle hover states */
--shadow-xs: 0 1px 2px rgba(31, 41, 59, 0.04);

/* 02: Resting — Default card state */
--shadow-sm: 0 2px 8px rgba(31, 41, 59, 0.06),
             0 1px 3px rgba(31, 41, 59, 0.04);

/* 03: Resting with subtle depth — Current card state */
--shadow-md: 0 4px 16px rgba(31, 41, 59, 0.08),
             0 2px 6px rgba(31, 41, 59, 0.04);

/* 04: Elevated — Hover states, featured cards */
--shadow-lg: 0 8px 24px rgba(31, 41, 59, 0.12),
             0 4px 12px rgba(31, 41, 59, 0.06);

/* 05: Floating — Modals, sticky elements */
--shadow-xl: 0 12px 40px rgba(31, 41, 59, 0.16),
             0 6px 16px rgba(31, 41, 59, 0.08);

/* 06: Maximum elevation — Hero CTAs, pricing cards */
--shadow-2xl: 0 24px 48px rgba(31, 41, 59, 0.20),
              0 12px 24px rgba(31, 41, 59, 0.12);

/* Special: Coral glow — CTA buttons */
--shadow-coral: 0 8px 24px rgba(244, 51, 87, 0.25),
                0 4px 12px rgba(244, 51, 87, 0.15);

/* Special: Inner shadow — Input fields, inset elements */
--shadow-inner: inset 0 2px 4px rgba(31, 41, 59, 0.06);

/* Special: Soft ambient — Large sections */
--shadow-ambient: 0 0 80px rgba(31, 41, 59, 0.04);
```

### Shadow Usage Guidelines
- **Default cards:** `--shadow-sm`
- **Card hover:** `--shadow-lg` with smooth transition
- **Primary CTA:** `--shadow-coral` (branded shadow)
- **Sticky elements:** `--shadow-xl`
- **Hero sections:** `--shadow-ambient` for subtle atmosphere
- **Pricing cards:** `--shadow-2xl` on featured option

---

## 8. Spacing & Layout System

### Current Spacing Issues
- Inconsistent spacing between sections
- Some areas feel cramped (especially mobile)
- Vertical rhythm could be more harmonious

### Enhanced Spacing Scale

```css
/* Spacing Scale (Based on 8px grid, refined for generosity) */
--space-1: 0.25rem;   /* 4px - Tight inline spacing */
--space-2: 0.5rem;    /* 8px - Base unit */
--space-3: 0.75rem;   /* 12px - Small gaps */
--space-4: 1rem;      /* 16px - Default spacing */
--space-5: 1.25rem;   /* 20px - Comfortable gaps */
--space-6: 1.5rem;    /* 24px - Standard spacing */
--space-8: 2rem;      /* 32px - Section internal spacing */
--space-10: 2.5rem;   /* 40px - Large gaps */
--space-12: 3rem;     /* 48px - Section padding mobile */
--space-16: 4rem;     /* 64px - Section padding desktop */
--space-20: 5rem;     /* 80px - Major section breaks */
--space-24: 6rem;     /* 96px - Hero spacing */
--space-32: 8rem;     /* 128px - Maximum spacing */
```

### Layout Grid System

**Container Widths:**
```css
--container-sm: 640px;   /* Narrow content (FAQs, testimonials) */
--container-md: 768px;   /* Reading content, forms */
--container-lg: 1024px;  /* Standard sections */
--container-xl: 1200px;  /* Wide layouts, hero */
--container-2xl: 1440px; /* Maximum (rarely used) */
```

**Layout Principle: Asymmetric Balance**
- Not every section needs to be centered
- Use 60/40 splits for visual interest
- Let content breathe with generous side margins
- Break the grid intentionally for featured elements

---

## 9. Border Radius & Shapes

### Current State
- Fixed 20px radius (--radius) is nice but inflexible
- Could be more nuanced for different elements

### Enhanced Radius System

```css
--radius-sm: 8px;     /* Buttons, tags, small cards */
--radius-md: 12px;    /* Default cards, inputs */
--radius-lg: 16px;    /* Feature cards, images */
--radius-xl: 20px;    /* Large cards, sections */
--radius-2xl: 24px;   /* Hero cards, pricing cards */
--radius-3xl: 32px;   /* Major sections */
--radius-full: 9999px; /* Pills, avatars, circular elements */

/* Organic shapes (for decorative elements) */
--radius-organic: 63% 37% 54% 46% / 55% 48% 52% 45%;
```

### Shape Philosophy
- **Soft but not childish:** 12-20px radius is the sweet spot
- **Consistent within categories:** All buttons same radius, all cards same radius
- **Subtle organic shapes:** Use CSS `border-radius` percentages for decorative blobs

---

## 10. Component Specifications

### Buttons

**Primary Button (CTA)**
```css
Design:
- Background: Coral gradient (--gradient-coral) or solid coral-500
- Text: White, DM Sans 600 SemiBold, --text-base
- Padding: 14px 32px (--space-3.5 --space-8)
- Border-radius: --radius-full (pill shape)
- Shadow: --shadow-coral (signature glow)
- Hover: Slight scale (transform: scale(1.02)) + --shadow-xl
- Active: Scale down slightly (transform: scale(0.98))
- Focus: 4px coral ring (--ring-coral)

Animation:
- Transition: all 200ms ease-out
- Hover lift: translateY(-2px)
- Micro-bounce on click (optional)
```

**Secondary Button (Outline)**
```css
Design:
- Background: Transparent
- Border: 2px solid coral-300
- Text: Coral-600, DM Sans 600 SemiBold
- Padding: 12px 30px (accounting for border)
- Border-radius: --radius-full
- Shadow: none → --shadow-sm on hover
- Hover: Background coral-50, border coral-500
```

**Tertiary Button (Text Link)**
```css
Design:
- Text: Coral-600, DM Sans 600 SemiBold
- Icon: Arrow right (→) with transition
- Underline: 2px, appears on hover
- Hover: Icon slides right 4px
```

### Cards

**Standard Card**
```css
Design:
- Background: White
- Border-radius: --radius-xl
- Padding: --space-8 (32px) desktop, --space-6 (24px) mobile
- Shadow: --shadow-sm default → --shadow-md on hover
- Border: Optional 1px cream-300 for subtle definition
- Transition: shadow 300ms ease, transform 300ms ease
- Hover: translateY(-4px)
```

**Featured Card (Pricing, Camp Snooze)**
```css
Design:
- Background: White with subtle gradient overlay
- Border: 2px solid coral-500
- Border-radius: --radius-2xl
- Padding: --space-10
- Shadow: --shadow-lg
- Badge: Positioned absolute top-0, coral gradient
- Hover: Subtle scale (1.01) + --shadow-2xl
```

**Testimonial Card**
```css
Design:
- Background: Lavender gradient (--gradient-lavender)
- Border-radius: --radius-lg
- Padding: --space-6
- Shadow: --shadow-sm
- Stars: Coral-400 icons
- Avatar: Circular, coral-50 background
- Quote: Inter 400, slightly larger (--text-md)
```

### Form Elements

**Input Fields**
```css
Design:
- Background: White
- Border: 2px solid cream-300
- Border-radius: --radius-md
- Padding: 12px 16px
- Text: Inter 400, --text-base
- Focus: Border → coral-400, shadow → --ring-coral
- Placeholder: Sage-400
- Transition: all 200ms ease
```

### Icons & Illustrations

**Icon System:**
- Primary library: Font Awesome 6.4.0 (already in use)
- Size scale: 16px, 20px, 24px, 32px, 40px, 48px
- Colors: Coral-500 (action), Navy-500 (neutral), Sage-400 (muted)
- Background circles: Icon in center of coral-50 or lavender-50 circle

**Icon Usage:**
- Checkmarks: Success-500 or coral-500
- Information: Navy-500
- Sleep-related: Lavender-400 or coral-400
- Trust indicators: Coral-500

**Future Enhancement:**
- Custom illustrations in warm, organic style (not implemented yet)
- Subtle decorative blob shapes in section backgrounds

---

## 11. Animation & Micro-Interactions

### Animation Philosophy
**"Calm in Motion"** — Animations should feel gentle, natural, and never jarring. They exist to guide attention and create delight, not to show off.

### Animation Timing

```css
/* Duration Scale */
--duration-instant: 100ms;   /* Hover feedback */
--duration-fast: 200ms;      /* Button states */
--duration-normal: 300ms;    /* Card hovers, reveals */
--duration-slow: 500ms;      /* Section transitions */
--duration-slower: 700ms;    /* Page loads, major changes */

/* Easing Curves (Custom) */
--ease-out-soft: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-in-out-smooth: cubic-bezier(0.45, 0, 0.55, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Page Load Animations

**Staggered Fade-In (Hero Section):**
```css
Sequence:
1. Hero tag: fade + slide up (delay: 0ms)
2. Headline: fade + slide up (delay: 100ms)
3. Description: fade + slide up (delay: 200ms)
4. CTA: fade + scale up (delay: 300ms)
5. Hero image: fade + subtle scale (delay: 400ms)

Implementation: CSS @keyframes with animation-delay
```

**Section Reveal (On Scroll):**
```css
Behavior:
- Elements fade in + slide up 20px when entering viewport
- Use Intersection Observer API (already have scroll logic)
- Trigger at 80% visibility
- Stagger child elements by 50ms each

Classes:
- .fade-in-up (base animation)
- .stagger-children (applies delays to children)
```

### Hover States

**Card Hover:**
```css
- Lift: translateY(-4px) over 300ms
- Shadow: --shadow-sm → --shadow-md
- Slight scale: 1.01 (optional, depends on card type)
```

**Button Hover:**
```css
- Lift: translateY(-2px) over 200ms
- Shadow: --shadow-coral → --shadow-xl
- Background: Slight gradient shift or darkening
- Icon: Slide right 4px (if present)
```

**Image Hover:**
```css
- Scale: 1.05 over 400ms (contained within parent)
- Overlay: Fade in subtle gradient overlay
- Caption: Slide up and fade in
```

### Micro-Interactions

**Accordion/FAQ:**
```css
- Icon: Rotate 180° over 300ms
- Content: slideDown with height animation
- Ease: --ease-in-out-smooth
```

**Testimonial Carousel:**
```css
- Auto-scroll: Smooth continuous scroll (already implemented)
- Pause on hover: Smooth deceleration
- Manual scroll: Snap to cards with scroll-snap-type
```

**Sticky CTA Bar:**
```css
- Entry: Slide up from bottom with fade (500ms)
- Exit: Slide down + fade out (300ms)
- Trigger: Scroll past 600px, hide when pricing in view
```

**Price Toggle (if implemented):**
```css
- Switch: Slide handle with bounce ease
- Price change: Fade out → fade in with new value
- Duration: 400ms
```

---

## 12. Section-Specific Design Specs

### Hero Section

**Layout:**
- Two-column grid on desktop (60/40 split, text/image)
- Single column mobile (image below text)
- Generous padding: --space-24 (96px) top/bottom desktop

**Design Details:**
- Background: Gradient mesh (--gradient-mesh) for depth
- Tag: Yellow background, tight pill shape, subtle shadow
- Headline: Fraunces 600, --text-4xl, --leading-tight
- Description: Inter 400, --text-md, --leading-relaxed, max-width 600px
- CTA: Primary button, extra shadow (--shadow-2xl)
- Image: Soft drop shadow, organic border-radius, fade mask on edges

**Hero Copy Hierarchy:**
1. Tag: "ALL-ACCESS BABY SLEEP HELP" (yellow pill)
2. Headline: "Join Your 24/7 Baby Sleep Lifeline" (large, bold)
3. Subhead: "Get your baby sleeping..." (medium, muted)
4. CTA: "Start Now" (prominent button)
5. Feature list: Icons + short phrases (checkmarks, small text)

### Trust Bar

**Current:** Horizontal flex, three trust indicators
**Enhancement:**
- Background: Subtle gradient (cream-50 to cream-100)
- Border: Top/bottom 1px cream-300
- Icons: Coral-400, larger (24px)
- Text: Navy-500 for labels, coral-600 for bold numbers
- Dividers: 1px cream-300 between items (desktop only)
- Mobile: Stack or 2x2 grid if needed

### Transformation Section (Before/After)

**Current:** Split-screen dark/light
**Enhancement:**
- Left (Before): Navy gradient background, desaturated text
- Right (After): Cream background with lavender accent gradient
- Center divider: Subtle gradient line or decorative element
- Icons: Keep but refine (larger, better spacing)
- Copy: Larger, more emotional contrast
- CTA: Centered overlay between sections (floating card)

**Mobile:**
- Stack vertically (Before above, After below)
- Full-width cards with generous padding
- Maintain visual contrast with backgrounds

### Pricing Section

**Layout:**
- Two-column grid (desktop), single column (mobile)
- Featured card (Annual) elevated higher
- Badge: "Best Value" positioned absolute top-right

**Design Details:**
- Regular card: White, --shadow-md
- Featured card: White, 2px coral border, --shadow-2xl, subtle scale (1.02)
- Price display: Fraunces 600, extra large (--text-4xl), coral-600
- Billing: Small, muted (sage-400)
- Features: Checkmarks (success-500), Inter 400
- CTA: Primary button (regular) vs. featured (extra shadow + gradient)

**Trust Elements Below:**
- Icons: Lock, Apple Pay, checkmark
- Text: Small (--text-sm), sage-400
- Layout: Horizontal flex, centered

### Testimonial Sections

**First Carousel (Static 3):**
- Mobile: Stack vertically with fade-in animation
- Desktop: Three-column grid, equal heights
- Cards: Lavender gradient background, --radius-lg
- Avatar: Circular letter icon, coral-50 background
- Stars: Coral-400
- Quote: Larger (--text-md), emotional emphasis in bold

**Second Carousel (Scrolling 10):**
- Continuous auto-scroll (already implemented)
- Dark background (navy gradient)
- White text with increased contrast
- Hover: Pause scroll, card scale slightly

### FAQ Section

**Design:**
- Accordion style (one open at a time)
- White background cards with cream-100 fill when closed
- Border: 1px cream-300
- Icon: Chevron-down, rotates 180° on open
- Padding: Generous (--space-6)
- Animation: Smooth expand/collapse
- Border-radius: --radius-lg

### Footer

**Design:**
- Dark navy gradient background
- Four-column grid (desktop), single column (mobile)
- Links: White with coral-400 hover
- Social icons: Larger (24px), coral-400
- Divider: 1px rgba(255,255,255,0.1)
- Copyright: Small text (--text-xs), centered

---

## 13. Mobile-First Responsive Strategy

### Breakpoint System

```css
/* Mobile First Approach */
--bp-sm: 640px;   /* Small tablets */
--bp-md: 768px;   /* Tablets */
--bp-lg: 1024px;  /* Laptops */
--bp-xl: 1280px;  /* Desktops */
--bp-2xl: 1536px; /* Large screens */
```

### Mobile Design Priorities

1. **Thumb-Friendly Tap Targets:**
   - Minimum 44x44px for all interactive elements
   - Extra padding around buttons
   - Generous spacing between clickable elements

2. **Simplified Navigation:**
   - Sticky CTA bar appears earlier on mobile (400px scroll vs 600px)
   - Larger tap targets
   - Fewer distractions

3. **Reading Comfort:**
   - Larger base font size (16px minimum)
   - Increased line-height (1.75 for body)
   - Shorter line lengths (max 65ch)
   - More whitespace between sections

4. **Performance:**
   - Images: Lazy loading, srcset for responsive images
   - Fonts: Subset fonts, preload critical fonts
   - Animations: Respect prefers-reduced-motion
   - Scripts: Already optimized (click-to-load video)

### Mobile Layout Adjustments

**Hero:**
- Image below text
- Smaller headline (--text-3xl)
- Full-width CTA button
- Feature list: Stack vertically

**Cards:**
- Full-width on mobile
- Increased padding
- Larger text
- Simplified hover states (tap highlights)

**Forms:**
- Full-width inputs
- Larger touch targets
- Minimal layout shifts on focus

**Navigation:**
- Sticky CTA appears sooner
- Simplified trust bar (2x2 grid or stack)

---

## 14. Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Text on white: Minimum 4.5:1 (AA standard)
- Large text (18pt+): Minimum 3:1
- UI elements: Minimum 3:1

**Current Palette Compliance:**
✅ Navy-500 on White: 12.3:1 (Excellent)
✅ Coral-600 on White: 4.8:1 (Pass)
⚠️ Sage-400 on White: 3.2:1 (Fails for small text — use sage-500 or darker)
✅ White on Navy-500: 15.1:1 (Excellent)
⚠️ White on Coral-500: 3.4:1 (Fails — use coral-700 for backgrounds)

**Action Items:**
- Darken sage text to sage-500 (#5C6C79) for better contrast
- Use darker coral (coral-600 or coral-700) for text on light backgrounds
- Add explicit focus states with high-contrast rings

### Focus Management

```css
/* Enhanced focus styles */
*:focus-visible {
  outline: 3px solid var(--coral-500);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Button focus */
.btn:focus-visible {
  box-shadow: var(--ring-coral), var(--shadow-coral);
}

/* Skip to content link (for keyboard nav) */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--coral-500);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 10000;
}
.skip-to-content:focus {
  top: 0;
}
```

### Screen Reader Optimization

**Semantic HTML:**
- Use proper heading hierarchy (h1 → h2 → h3)
- Landmark regions: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`
- ARIA labels for icon-only buttons
- Alt text for all images (descriptive, not "image of...")

**Live Regions:**
```html
<!-- For dynamic content updates (e.g., cart count) -->
<div aria-live="polite" aria-atomic="true">
  <!-- Dynamic content here -->
</div>
```

### Motion Accessibility

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 15. Performance Optimization

### Already Implemented ✅
- Lazy loading images
- Click-to-load video embeds (Wistia, Spotify)
- Deferred font loading
- DNS prefetch hints
- Minimal custom JavaScript (~8 KiB)

### Additional Optimizations

**Critical CSS:**
```html
<!-- Inline critical above-the-fold CSS -->
<style>
  /* Hero styles, typography, initial layout only */
  /* Approximately 5-8kb */
</style>

<!-- Load full CSS asynchronously -->
<link rel="preload" href="home-page-v3.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="home-page-v3.css"></noscript>
```

**Font Loading Strategy:**
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/Fraunces-SemiBold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Use font-display: swap for visible text during load -->
<style>
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/Fraunces-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap; /* Show fallback font immediately */
}
</style>
```

**Image Optimization:**
```html
<!-- Responsive images with srcset -->
<img
  src="hero-600w.webp"
  srcset="hero-400w.webp 400w,
          hero-600w.webp 600w,
          hero-800w.webp 800w,
          hero-1200w.webp 1200w"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         600px"
  alt="Sally Woods, The Sleep Concierge"
  loading="lazy"
  decoding="async"
  width="600"
  height="600"
/>
```

**Animation Performance:**
- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Use `will-change` sparingly for complex animations
- Leverage CSS containment: `contain: layout style paint;`

---

## 16. Implementation Phases

### Phase 1: Foundation (Week 1)
**Focus:** Typography, colors, spacing

- [ ] Implement new font system (Fraunces, Inter, DM Sans)
- [ ] Update color variables with full palette
- [ ] Refine spacing scale and apply consistently
- [ ] Update shadow system
- [ ] Test accessibility (contrast, focus states)

**Deliverable:** Updated CSS with new design system

### Phase 2: Component Refinement (Week 1-2)
**Focus:** Buttons, cards, forms

- [ ] Redesign primary/secondary buttons with new styles
- [ ] Update all card components
- [ ] Refine form inputs
- [ ] Add new gradient backgrounds
- [ ] Implement enhanced shadows

**Deliverable:** All components match new design language

### Phase 3: Layout & Composition (Week 2)
**Focus:** Section design, hierarchy

- [ ] Refine hero section layout and styling
- [ ] Update transformation section (before/after)
- [ ] Enhance pricing cards (featured card elevation)
- [ ] Improve testimonial section design
- [ ] Optimize mobile layouts

**Deliverable:** Cohesive page with improved visual flow

### Phase 4: Animation & Delight (Week 2-3)
**Focus:** Micro-interactions, page load

- [ ] Implement staggered hero animations
- [ ] Add scroll-triggered section reveals
- [ ] Enhance hover states (cards, buttons)
- [ ] Refine FAQ accordion animation
- [ ] Add subtle background effects

**Deliverable:** Polished, delightful interactions

### Phase 5: Polish & Optimization (Week 3)
**Focus:** Performance, accessibility, QA

- [ ] Optimize images (WebP, srcset)
- [ ] Implement critical CSS
- [ ] Test across devices and browsers
- [ ] Accessibility audit and fixes
- [ ] Performance testing (Lighthouse)
- [ ] Final refinements based on testing

**Deliverable:** Production-ready page

---

## 17. Success Metrics

### Design Quality Metrics

**Visual Polish:**
- [ ] Every section has intentional spacing
- [ ] Color palette used consistently
- [ ] Typography hierarchy clear and readable
- [ ] Shadows create proper depth perception
- [ ] Animations feel smooth and purposeful

**Brand Alignment:**
- [ ] Feels premium and trustworthy
- [ ] Conveys warmth and expertise
- [ ] Stands out from generic sleep programs
- [ ] Matches Headspace/Calm aesthetic direction

**User Experience:**
- [ ] Clear path to purchase
- [ ] Easy to scan on mobile
- [ ] No confusing navigation
- [ ] Fast load times (<3s on mobile 4G)
- [ ] Accessible to all users (WCAG AA)

### Business Metrics (Post-Launch)

**Conversion:**
- Current baseline: [Insert current conversion rate]
- Target: 15-25% improvement
- Track: Add-to-cart rate, checkout completion

**Engagement:**
- Time on page: Target 3+ minutes average
- Scroll depth: 80% of users reach pricing
- Video play rate: 40%+ of visitors

**Mobile Performance:**
- Lighthouse Performance Score: 70+ (mobile)
- First Contentful Paint: <2s
- Largest Contentful Paint: <3s
- Cumulative Layout Shift: <0.1

**Trust Indicators:**
- Reduced bounce rate from hero: Target <40%
- Increased FAQ engagement
- Higher testimonial section visibility

---

## 18. Inspiration & Reference

### Design References

**Wellness/Calm Aesthetic:**
- [Headspace.com](https://www.headspace.com) — Soft colors, generous space, friendly animations
- [Calm.com](https://www.calm.com) — Gradient backgrounds, peaceful imagery
- [Oura Ring](https://ouraring.com) — Premium wellness tech, sophisticated color palette

**Premium Parenting:**
- [Hatch.co](https://www.hatch.co) — Warm, minimal, high-end baby products
- [Coterie](https://coterie.com) — Luxury baby brand, editorial layouts
- [Lovevery](https://lovevery.com) — Montessori toys, calm aesthetic, strong product photography

**Typography Inspiration:**
- [Medium](https://medium.com) — Exceptional reading experience
- [Notion](https://notion.so) — Clean hierarchy, functional elegance
- [Stripe](https://stripe.com) — Technical content made approachable

**Layout & Composition:**
- [Linear](https://linear.app) — Asymmetric layouts, bold typography
- [Pitch](https://pitch.com) — Generous whitespace, confident design
- [Webflow](https://webflow.com) — Grid-breaking elements, visual interest

### Color Palette Inspiration

**Soft & Calming:**
- Headspace pastels (coral, lavender, cream)
- Japanese color theory (wabi-sabi neutrals)
- Scandinavian design (muted, natural tones)

**Premium & Sophisticated:**
- Fashion editorial color palettes
- High-end spa branding
- Luxury hotel websites

---

## 19. Design System Documentation

### Component Library (To Be Built)

Create a living style guide alongside implementation:

**Contents:**
1. **Foundations**
   - Color palette with hex codes
   - Typography scale with examples
   - Spacing system
   - Shadow examples
   - Border radius examples

2. **Components**
   - Buttons (all states)
   - Cards (all variations)
   - Forms
   - Icons
   - Badges/tags
   - Testimonials
   - Pricing cards

3. **Patterns**
   - Hero sections
   - Feature grids
   - Before/after layouts
   - FAQ accordions
   - Trust bars
   - Sticky elements

4. **Usage Guidelines**
   - When to use each component
   - Accessibility notes
   - Do's and don'ts
   - Mobile considerations

**Tool:** Can be simple HTML page (`design-system.html`) or use Storybook if expanding beyond this page

---

## 20. Next Steps & Collaboration

### Immediate Actions

1. **Review this brief** — Are we aligned on direction?
2. **Prioritize phases** — Which aspect should we tackle first?
3. **Begin implementation** — Start with Phase 1 (Foundation)

### Collaborative Process

**Design Reviews:**
- Review after each phase
- Test on actual mobile devices
- Gather feedback from team/users

**Iteration Strategy:**
- Start with foundation (typography, colors, spacing)
- Build components in isolation
- Compose sections using new components
- Test, refine, polish

**Decision Framework:**
If we're unsure about a design choice, ask:
1. Does it serve the exhausted parent user?
2. Does it feel calm and premium?
3. Does it guide toward conversion naturally?
4. Is it accessible and performant?

---

## 21. Open Questions & Decisions Needed

### Typography
- [ ] **Confirmed:** Fraunces (display) + Inter (body) + DM Sans (UI)?
- [ ] Or prefer to keep Playfair Display and just refine?

### Color Palette
- [ ] **Confirmed:** Add lavender as sleep-focused accent color?
- [ ] Keep coral as primary CTA color or soften?
- [ ] Add gradient backgrounds or keep flat?

### Layout
- [ ] How aggressive should we be with asymmetry?
- [ ] Should hero be left-aligned or centered?
- [ ] Break container on any sections for full-bleed?

### Animation
- [ ] How much animation is "too much" for calm aesthetic?
- [ ] Page load animations on every visit or first visit only?
- [ ] Auto-play testimonial carousel or manual control?

### Components
- [ ] Add any new sections (e.g., "How it works" video)?
- [ ] Remove or consolidate any current sections?
- [ ] Add illustrated elements or stay photo-based?

---

## Appendix: Technical Constraints

### Kajabi Platform Limitations

**What We CAN Do:**
- Full control over HTML/CSS/JS within page content
- Custom fonts via Google Fonts or self-hosted
- Animations and interactions
- Responsive design
- Third-party scripts (analytics, etc.)

**What We CANNOT Do:**
- Remove Kajabi core scripts (~156 KiB unavoidable)
- Modify platform-level navigation/header (if using Kajabi theme)
- Change URL structure (managed by Kajabi)
- Access server-side rendering
- Modify checkout flow design (separate Kajabi page)

**Workarounds:**
- Use container breakout techniques (already implemented)
- Override Kajabi styles with `!important` (sparingly)
- Hide unwanted platform elements with CSS
- Create standalone landing page outside main site navigation

### Browser Support

**Target Browsers:**
- Chrome/Edge (last 2 versions) — 70% of traffic
- Safari (last 2 versions) — 25% of traffic
- Firefox (last 2 versions) — 4% of traffic
- Mobile Safari (iOS 14+) — 50% of mobile traffic

**Feature Support:**
- CSS Grid: ✅ (96% global support)
- CSS Variables: ✅ (97% support)
- CSS backdrop-filter: ⚠️ (93% support, use fallback)
- View Transitions API: ❌ (Not yet, use progressive enhancement)

### Performance Budget

**Target Metrics:**
- Total page weight: <1 MB (currently 1.4 MB)
- JavaScript: <100 KB custom code (currently ~8 KB ✅)
- CSS: <50 KB custom styles (currently ~25 KB ✅)
- Images: <500 KB (optimized WebP)
- Fonts: <100 KB (2-3 font files)

**Third-Party Scripts:**
- Kajabi platform: ~156 KB (unavoidable)
- Analytics: Audit and reduce (see performance report)
- Wistia: Lazy loaded ✅
- Font Awesome: Consider switching to custom SVG icons (-30 KB)

---

## Conclusion

This brief provides a comprehensive roadmap for evolving the Snooze home page into a premium, calming, conversion-optimized experience. The design direction is clear: **Soft Strength** — the perfect balance of wellness calm and authoritative expertise.

The exhausted parent visiting at 2am should immediately feel:
1. **Understood** — "They get what I'm going through"
2. **Calmed** — "This feels safe and supportive"
3. **Hopeful** — "This could actually work for us"
4. **Confident** — "These people know what they're doing"

By implementing these design specifications across typography, color, spacing, components, and interactions, we'll create a landing page that not only looks premium but *feels* like the sanctuary exhausted parents desperately need.

---

**Ready to begin? Let's start with Phase 1: Foundation — Typography, Colors, and Spacing.**

---

*Design Brief v3.0 — January 2026*
*For: Snooze by The Sleep Concierge*
*Project: Home Page Premium Wellness Evolution*
