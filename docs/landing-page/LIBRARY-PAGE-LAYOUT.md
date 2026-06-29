# Snooze Library Page Layout

**Version:** 1.0  
**Date:** November 2025  
**Status:** Design Specification for Kajabi CMS Implementation  
**Based on:** Good Inside library structure + Snooze brand voice + Current resources

---

## Overview

This document provides the complete layout structure for the Snooze Library page—a central hub for all Snooze resources. The layout is designed to work primarily with Kajabi's CMS blocks, with minimal custom CSS required.

**Design Philosophy:**
- Clean, organized, easy to navigate
- Scalable structure for future additions
- Matches Snooze brand voice (evidence-based, supportive, practical)
- Mobile-first responsive design

---

## Page Structure

### Section 1: Header Navigation
**Kajabi Block:** Standard Header (already exists on site)

**Content:**
- Logo: "snooze."
- Navigation links: Library (active), About, Get in Touch, Blog, Access Snooze Village
- CTA Button: "Join Snooze" (coral button)

**Note:** This uses existing header from landing page.

---

### Section 2: Page Title & Introduction
**Kajabi Block:** Text Block

**Layout:**
```
Heading (H1): "Your Snooze Library"
Subheading: "Everything you need for great baby sleep, all in one place."
Description: "Find age-specific guides, access tools, and get answers to your questions. New resources added monthly."
```

**Tone:** Warm, welcoming, practical (Sally's voice)

**Example Copy:**
> "Your Snooze Library  
> Everything you need for great baby sleep, all in one place.  
> Find age-specific guides, access tools, and get answers to your questions. New resources added monthly."

---

### Section 3: Category Navigation
**Kajabi Block:** Custom HTML Block (horizontal scrollable menu)

**Purpose:** Quick navigation to resource types (similar to Good Inside's category menu)

**Categories:**
- **Home** (default/active)
- **By Age** (Newborn, 3-4 Month, 5-12 Month, Toddler)
- **Courses** (All courses)
- **Tools** (Checklists, Scripts, Schedules)
- **Coaching** (Live sessions, Q&A)
- **Community** (Snooze Village access)
- **Podcast** (Nap Trapped episodes - future)
- **Q&A** (Searchable database - future)
- **AI Help** (Snoozebot - future)

**Design:**
- Horizontal scrollable on mobile
- Icon + text for each category
- Active state: coral underline or background
- Clean, minimal icons (Font Awesome or simple SVG)

**CSS Needed:** Minimal - horizontal scroll, active states

---

### Section 4: Jump Back In
**Kajabi Block:** Custom HTML Block (single card)

**Purpose:** Show member's last accessed resource (if logged in) or featured resource (if not)

**Card Structure:**
```
[Badge: "COURSE" or "GUIDE" or "TOOL"]
[Icon: Book/Video/Checklist]
Title: "3-4 Month Sleep Course"
Description: "Understanding the four-month sleep regression and how to navigate it"
Duration: "45 MIN" (if applicable)
[Arrow icon →]
```

**Design:**
- Single card, left-aligned
- Coral accent color for badge
- Cream/white background
- Subtle shadow
- Clickable card

**Copy Example:**
> "Jump Back In  
> Pick up right where you left off  
> [Card: 3-4 Month Sleep Course - Understanding the four-month sleep regression...]"

**CSS Needed:** Card styling, hover states

---

### Section 5: Featured Resources
**Kajabi Block:** Custom HTML Block (grid of cards)

**Purpose:** Highlight key resources members should start with

**Layout:**
- Section title: "Start Here: Essential Resources"
- Subtitle: "These guides and courses cover the most common sleep challenges"
- Grid: 3-4 cards per row (desktop), 1 per row (mobile)

**Card Structure:**
```
[Badge: "COURSE" or "GUIDE"]
[Icon]
Title: "Newborn Sleep Guide"
Description: "Everything you need to know about newborn sleep patterns, feeding, and establishing healthy foundations"
Duration: "30 MIN"
[Arrow icon →]
```

**Featured Resources (Current):**
1. **Newborn Sleep Guide** - "Everything you need to know about newborn sleep patterns, feeding, and establishing healthy foundations"
2. **3-4 Month Sleep Course** - "Navigate the four-month sleep regression with confidence and clear steps"
3. **5-12 Month Sleep Guide** - "Comprehensive guide to naps, nights, and sleep training for older babies"
4. **Toddler Sleep Toolkit** - "Tools and strategies for managing toddler sleep challenges"

**CSS Needed:** Grid layout, card styling, responsive breakpoints

---

### Section 6: Browse by Age
**Kajabi Block:** Custom HTML Block (age-based organization)

**Purpose:** Organize resources by baby's age (primary navigation method)

**Layout:**
- Section title: "Browse by Your Baby's Age"
- Subtitle: "Find resources tailored to your baby's developmental stage"
- 4 columns (desktop) / stacked (mobile)

**Age Cards:**
1. **Newborn (0-3 months)**
   - Icon: Baby bottle or newborn symbol
   - Description: "Sleep foundations, feeding schedules, and establishing routines"
   - Resources count: "3 guides, 2 tools"
   - [View Resources →]

2. **3-4 Months**
   - Icon: Calendar or growth symbol
   - Description: "Navigating the four-month regression and sleep cycle changes"
   - Resources count: "1 course, 2 guides, 3 tools"
   - [View Resources →]

3. **5-12 Months**
   - Icon: Clock or schedule symbol
   - Description: "Naps, nights, sleep training, and schedule optimization"
   - Resources count: "1 guide, 4 tools, 2 checklists"
   - [View Resources →]

4. **Toddler (12+ months)**
   - Icon: Toddler symbol or bed
   - Description: "Toddler sleep challenges, transitions, and bedtime routines"
   - Resources count: "1 toolkit, 3 guides"
   - [View Resources →]

**CSS Needed:** Grid layout, card hover effects

---

### Section 7: Tools & Quick Resources
**Kajabi Block:** Custom HTML Block (toolkit grid)

**Purpose:** Quick-access tools, checklists, scripts, and downloadable resources

**Layout:**
- Section title: "Tools & Quick Resources"
- Subtitle: "Downloadable checklists, scripts, and tools you can use right away"
- Grid: 4 columns (desktop), 2 columns (mobile)

**Tool Categories:**
1. **Checklists**
   - "Bedtime Routine Checklist"
   - "Sleep Training Readiness Checklist"
   - "Nap Transition Checklist"
   - [View All →]

2. **Scripts & Phrases**
   - "Bedtime Scripts for Toddlers"
   - "What to Say During Sleep Training"
   - "Comforting Phrases for Night Wakes"
   - [View All →]

3. **Sample Schedules**
   - "Newborn Feeding & Sleep Schedule"
   - "6-Month-Old Sample Schedule"
   - "Toddler Daily Routine Template"
   - [View All →]

4. **Quick Guides**
   - "Early Rising: Quick Fix Guide"
   - "Cat Napping: 5-Minute Read"
   - "Sleep Regression Cheat Sheet"
   - [View All →]

**CSS Needed:** Grid layout, icon styling

---

### Section 8: Live Sessions
**Kajabi Block:** Custom HTML Block (video grid)

**Purpose:** Access to live session recordings and Q&A sessions

**Layout:**
- Section title: "Live Sessions"
- Subtitle: "Q&A sessions and live calls with the Snooze Specialists"
- Grid: 3 columns (desktop), 1 column (mobile)

**Video Cards:**
```
[Badge: "LIVE REPLAY" or "Q&A SESSION"]
[Thumbnail image]
Title: "Early Rising: Strategies & Solutions"
Description: "Sally covers common causes of early rising and practical solutions"
Duration: "45 MIN"
Date: "November 15, 2025"
[Watch Now →]
```

**Featured Replays:**
1. "Understanding the Four-Month Regression" (60 min)
2. "Nap Transitions: When and How" (45 min)
3. "Sleep Training Methods Explained" (50 min)
4. "Toddler Bedtime Battles" (40 min)

**Future Addition:** "Upcoming Live Events" section (similar to Good Inside)

**CSS Needed:** Video card styling, thumbnail aspect ratios

---

### Section 9: Community Access
**Kajabi Block:** Custom HTML Block (single CTA card)

**Purpose:** Direct link to Snooze Village community

**Layout:**
- Section title: "Your Snooze Community"
- Large card with community preview
- Description of community benefits
- CTA button: "Access Snooze Village"

**Card Content:**
```
[Community icon/illustration]
Title: "Join Your Snooze Parenting Village"
Description: "Connect with other parents, share wins, get encouragement, and access expert-moderated support."
[Access Snooze Village →]
```

**Tone:** Supportive, community-focused (Sally's voice)

**CSS Needed:** Large CTA card styling

---

### Section 10: Future Resources (Placeholder Sections)

**These sections will be added as resources become available:**

#### 10A: Q&A Database (Future)
**Kajabi Block:** Custom HTML Block (search interface)

**Layout:**
- Section title: "Search Our Q&A Database"
- Subtitle: "Find answers from 5,000+ real questions answered by Sally"
- Search bar (prominent)
- Category filters
- Featured Q&A cards

**Note:** This will integrate with the Q&A resource system when available.

---

#### 10B: Snoozebot - AI Answer Engine (Future)
**Kajabi Block:** Custom HTML Block (chat interface preview)

**Layout:**
- Section title: "Snoozebot: Your AI Sleep Assistant"
- Subtitle: "Get instant answers to common sleep questions, 24/7"
- Chat interface preview
- Example questions
- CTA: "Try Snoozebot"

**Note:** This will be a prominent feature when launched.

---

#### 10C: Nap Trapped Podcast Database (Future)
**Kajabi Block:** Custom HTML Block (podcast grid)

**Layout:**
- Section title: "Search Nap Trapped Episodes"
- Subtitle: "Find episodes by topic, age, or challenge"
- Search bar
- Category filters
- Episode cards with searchable transcripts

**Note:** This will integrate with podcast database when available.

---

#### 10D: Webinar Recordings (Future)
**Kajabi Block:** Custom HTML Block (webinar grid)

**Layout:**
- Section title: "On-Demand Webinars"
- Subtitle: "Recordings of our best workshops and expert sessions"
- Grid of webinar cards
- Category filters
- Featured webinars

**Note:** Similar structure to "Live Sessions" but for longer-form webinars.

---

### Section 11: Footer
**Kajabi Block:** Standard Footer (already exists on site)

**Content:**
- Logo
- Navigation links
- Social media icons
- Copyright

**Note:** Uses existing footer from landing page.

---

## Design Specifications

### Colors (From Landing Page Design System)
- **Primary (Coral):** `#F43357`
- **Navy:** `#1F293B`
- **Cream:** `#FAF7F4`
- **Beige:** `#F2EDEA`
- **Sage:** `#7C8A98`
- **Coral Tint:** `#FFE7EA`

### Typography
- **Headings:** Georgia, serif (matching landing page)
- **Body:** System fonts (matching landing page)
- **Icons:** Font Awesome 6.4.0 (matching landing page)

### Card Design
- **Background:** White or cream
- **Border:** None (clean, modern)
- **Shadow:** Subtle (`0 2px 8px rgba(0, 0, 0, 0.05)`)
- **Hover:** Slight lift (`translateY(-4px)`) + stronger shadow
- **Border Radius:** `12px` (matching landing page)

### Spacing
- **Section Padding:** `3rem 0` (desktop), `2rem 0` (mobile)
- **Card Gap:** `1.5rem` (desktop), `1rem` (mobile)
- **Container Max Width:** `1100px` (matching landing page)

### Responsive Breakpoints
- **Mobile:** `< 768px` (stacked layout, single column)
- **Tablet:** `768px - 1024px` (2-3 columns)
- **Desktop:** `> 1024px` (3-4 columns)

---

## Content Guidelines (Sally's Voice)

### Section Titles
- Use clear, benefit-focused language
- Avoid jargon or academic terms
- Examples: "Start Here: Essential Resources" (not "Core Curriculum")

### Descriptions
- Be specific and practical
- Include what they'll learn or get
- Set realistic expectations
- Examples: "Everything you need to know about newborn sleep patterns" (not "Comprehensive newborn sleep education")

### CTAs
- Action-oriented but not pushy
- Examples: "View Resources" (not "Click Here")
- Use arrows (→) to indicate action

### Tone Principles
- **Evidence-based clarity:** Explain what it is simply
- **Supportive without coddling:** Acknowledge difficulty, provide hope
- **Practical and actionable:** Every resource has clear value
- **Confident and calm:** Reduce anxiety through certainty
- **Judgment-free:** No "should" or "must" language

---

## Implementation Notes for Kajabi

### Custom HTML Blocks
Most sections will use Kajabi's "Custom HTML" block type, which allows:
- Full HTML/CSS control
- Responsive design
- Integration with Kajabi's member system

### Minimal Custom CSS
Only add custom CSS for:
1. Card grid layouts
2. Hover effects
3. Category navigation scrolling
4. Responsive breakpoints

**Avoid:**
- Overriding Kajabi's core styles unnecessarily
- Complex JavaScript (use Kajabi's built-in features)
- Custom fonts (use system fonts or existing Google Fonts)

### Member-Specific Features
- "Jump Back In" section can use Kajabi's member tracking
- Resource access can be gated by membership status
- Progress tracking can integrate with Kajabi's course completion

### Future Integrations
- Q&A Database: Can be built as separate Kajabi pages with search
- Snoozebot: Will require custom integration (separate project)
- Podcast Database: Can use Kajabi's blog/podcast features
- Webinars: Can use Kajabi's webinar/event features

---

## Content Inventory (Current Resources)

### Courses
1. **Newborn Sleep Guide** (Guide format)
2. **3-4 Month Sleep Course** (Course format)
3. **5-12 Month Sleep Guide** (Guide format)
4. **Toddler Sleep Toolkit** (Toolkit format)

### Tools & Resources
- Bedtime Routine Checklist
- Sleep Training Readiness Checklist
- Nap Transition Checklist
- Bedtime Scripts for Toddlers
- Sample Schedules (multiple ages)
- Quick Fix Guides (early rising, cat napping, etc.)

### Live Sessions
- Q&A session recordings (as available)
- Thematic sessions with the Snooze Specialists

### Community
- Snooze Village (Facebook group, transitioning to Kajabi community)

---

## Future Content Roadmap

### Phase 1 (Launch - Month 3)
- Complete all age-specific courses
- Build out tool library
- Organize coaching replays

### Phase 2 (Month 4-6)
- Launch Q&A database (if ready)
- Add webinar recordings
- Expand tool library

### Phase 3 (Month 7-12)
- Launch Snoozebot (AI answer engine)
- Add searchable Nap Trapped database
- Build out webinar library

---

## Mobile Optimization

### Key Considerations
- Category navigation: Horizontal scroll on mobile
- Cards: Full width on mobile, stacked vertically
- Grids: 1 column on mobile, expand on larger screens
- Touch targets: Minimum 44px height for buttons/links
- Spacing: Tighter on mobile, more generous on desktop

### Mobile-Specific Features
- Sticky category navigation (if needed)
- Swipeable card carousels (optional enhancement)
- Collapsible sections for long content

---

## Accessibility

### Requirements
- All images have alt text
- Buttons have clear labels
- Color contrast meets WCAG AA standards
- Keyboard navigation works
- Screen reader friendly

### Implementation
- Use semantic HTML (`<nav>`, `<section>`, `<article>`)
- Include ARIA labels where needed
- Test with keyboard navigation
- Test with screen readers

---

## SEO Considerations

### Page Metadata
- **Title:** "Snooze Library - All Baby Sleep Resources in One Place"
- **Description:** "Access all Snooze sleep resources: age-specific guides, courses, tools, live sessions with the Snooze Specialists, and community support. Everything you need for great baby sleep."
- **H1:** "Your Snooze Library"

### Internal Linking
- Link to individual course/guide pages
- Link to community access
- Link to membership signup
- Link to consultation booking

### Schema Markup
- Consider adding Course schema for courses
- Consider adding VideoObject schema for replays
- Consider adding FAQPage schema for Q&A (future)

---

## Success Metrics

### Engagement Metrics
- Time on page
- Resources clicked/accessed
- Course completion rates
- Tool downloads

### Navigation Metrics
- Most popular categories
- Most accessed resources
- Search queries (when search is added)
- Bounce rate

### Conversion Metrics
- Membership signups from library page
- Consultation bookings from library page
- Community joins from library page

---

## Next Steps

1. **Review & Approve Layout** - Confirm structure matches vision
2. **Content Audit** - List all current resources with descriptions
3. **Kajabi Setup** - Create page structure in Kajabi CMS
4. **Design Assets** - Create icons, badges, card images
5. **Content Writing** - Write all section copy in Sally's voice
6. **CSS Implementation** - Add minimal custom CSS for layout
7. **Testing** - Test on desktop, tablet, mobile
8. **Launch** - Publish and monitor metrics

---

**Document Status:** Ready for Implementation  
**Last Updated:** November 2025  
**Owner:** Landing Page Project

