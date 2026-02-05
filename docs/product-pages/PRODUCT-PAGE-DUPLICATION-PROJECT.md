# Product Page Duplication Project: Complete Step-by-Step Guide

**Version:** 1.0  
**Date:** December 07, 2025  
**Status:** Active Project Plan  
**Purpose:** Duplicate the 3-4 Month Course landing page layout across all Snooze products using Gemini 3 Pro for content generation

---

## 📋 Project Overview

### Objective
Create complete, production-ready product landing pages for all Snooze courses using the proven layout from the 3-4 Month Course page. Utilize Gemini 3 Pro to generate SEO-optimized, tone-of-voice-matched content efficiently.

### Scope
- **New Product Pages to Create:**
  1. Newborn Sleep Guide Landing Page (Guide format - will upgrade to course later)
  2. Toddler Toolkit Landing Page
  3. The Snooze Method Landing Page
  4. Update: 5-12 Month Guide Landing Page (existing but needs new layout)

**Note:** Newborn Sleep Guide will remain as a downloadable guide format for launch. Course upgrade planned for later. Landing page will be adapted from course template to guide format.

- **Template Reference:**
  - `generated-html-pages/3-4-month-course-landing-page.html` (complete, production-ready)

### Success Criteria
- All pages match the layout structure of the 3-4 Month Course
- All copy matches Sally's tone of voice (see `docs/strategy/SNOOZE-TONE-OF-VOICE.md`)
- Moves us closer to our goals outlined in the docs in `docs/strategy/`
- Module summaries are SEO-optimized and address user challenges
- All URLs and pricing match source documents
- All pages pass quality assurance checklist
- Ready for deployment to Kajabi

---

## 📚 Course Inventory & Data Collection

### Course Details Reference

#### 1. 3-4 Month Course ✅ (COMPLETE - Use as Template)
- **File:** `generated-html-pages/3-4-month-course-landing-page.html`
- **URL:** `https://joinsnooze.com/3-4-month-baby-sleep-course`
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Structure:** 2 Parts (The Prep, The Plan), 6 Modules
- **Modules:** 6 total
- **Lessons:** 20+ total
- **Resources:** 15+ downloadable PDFs

#### 2. Newborn Sleep Guide (TO CREATE - Guide Format)
- **URL:** `https://joinsnooze.com/newborn-sleep-guide`
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Format:** Downloadable PDF Guide (not course format - will upgrade to course later)
- **Source Docs:** 
  - `projects/kajabi-courses/courses/newborn-guide/The Sleep Concierge - Fourth Trimester Guide.md`
- **Structure:** 9 main content sections covering fourth trimester sleep foundations
- **Status:** ⏳ Guide content complete - Ready for landing page creation
- **Note:** Landing page will need to be adapted from course template to guide format

#### 3. 5-12 Month Guide (TO UPDATE)
- **File:** `5-12-month-guide-landing-page.html` (exists, needs new layout)
- **URL:** `https://joinsnooze.com/5-12-month-baby-sleep-guide`
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Structure:** 2 Parts (Part 1: The Prep, Part 2: The Plan), 6 Modules
- **Module Breakdown:**
  - **Part 1: The Prep:**
    - Module 1: Understanding Your Baby's Sleep (3 lessons)
    - Module 2: Optimizing the Sleep Environment (4 lessons)
    - Module 3: Routines, Schedules & Feeding (5 lessons)
  - **Part 2: The Plan:**
    - Module 4: The Night Sleep Plan (4 lessons)
    - Module 5: The Nap Training Plan (4 lessons)
    - Module 6: Troubleshooting & Success (3 lessons)
- **Total:** 6 modules, 23 lessons
- **Source:** `projects/kajabi-courses/courses/5-12-month-course/5-12-MONTH-GUIDE-MODULE-INFO.md`

#### 4. Toddler Toolkit (TO CREATE)
- **URL:** `https://joinsnooze.com/products/toddler-toolkit` (check for clean URL)
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Structure:** 7 Modules (no parts)
- **Module Breakdown:**
  - Module 1: Understanding Toddler Sleep (3 lessons)
  - Module 2: Age-Appropriate Schedules and Routines (4 lessons)
  - Module 3: Nap Transitions (3 lessons)
  - Module 4: Bedtime Battles and Resistance (4 lessons)
  - Module 5: Early Rising and Night Wakings (3 lessons)
  - Module 6: Big Transitions (3 lessons)
  - Module 7: Troubleshooting and Advanced Strategies (3 lessons)
- **Total:** 7 modules, 25 lessons
- **Resources:** 15+ downloadable resources
- **Source:** `projects/snooze-website/docs/landing-page/TODDLER-TOOLKIT-STRUCTURE.md`

#### 5. The Snooze Method (TO CREATE)
- **URL:** `https://joinsnooze.com/products/the-snooze-method` (check for clean URL)
- **Pricing:** $117 (Launch) / $129 (BAU)
- **Structure:** 4 Modules (no parts)
- **Module Breakdown:**
  - Module 1: Introduction to The Snooze Method (4 lessons)
  - Module 2: Core Philosophy and Mindset (4 lessons)
  - Module 3: Thinking About Sleep Challenges (4 lessons)
  - Module 4: Adapting The Method to Your Family (4 lessons)
- **Total:** 4 modules, 16 lessons
- **Resources:** 4-6 downloadable resources
- **Source:** `projects/snooze-website/docs/landing-page/SNOOZE-METHOD-MODULE-INFO.md`

---

## 🎯 Phase 1: Data Collection & Preparation

### Step 1.1: Create Course Data Collection Document

**Location:** `projects/snooze-website/kajabi-deployment/pages/product-pages/COURSE-DATA-COLLECTION.md`

**Template Structure:**
```markdown
# Course Data Collection

For each course, collect:
- Course name and target age range
- Module structure (Part 1/Part 2 if applicable)
- Module titles
- Lesson counts per module
- Estimated durations
- Resource counts (videos, PDFs, etc.)
- Key challenges the course addresses
- Pricing ($117 Launch / $129 BAU)
- Checkout URL from URL-REFERENCE.md
```

### Step 1.2: Gather All Course Information

**Action Items:**
- [ ] Read `projects/kajabi-courses/courses/` for each course structure
- [ ] Read `projects/snooze-website/docs/landing-page/` for course docs
- [ ] Verify URLs in `projects/snooze-website/docs/technical/URL-REFERENCE.md`
- [ ] Verify pricing in `docs/strategy/SNOOZE-PRICING-STRATEGY.md`
- [ ] Document module counts, lesson counts, resource counts
- [ ] Identify key challenges each course addresses (for SEO summaries)

**Source Documents:**
- 5-12 Month: `projects/kajabi-courses/courses/5-12-month-course/5-12-MONTH-GUIDE-MODULE-INFO.md`
- Toddler Toolkit: `projects/snooze-website/docs/landing-page/TODDLER-TOOLKIT-STRUCTURE.md`
- Snooze Method: `projects/snooze-website/docs/landing-page/SNOOZE-METHOD-MODULE-INFO.md`
- Newborn: `projects/kajabi-courses/courses/newborn-guide/The Sleep Concierge - Fourth Trimester Guide.md` (Guide format - will upgrade to course later)

**Output:** Complete data collection document with all courses documented

**Estimated Time:** 1-2 hours

---

## 🤖 Phase 2: Content Generation with Gemini 3 Pro

### Step 2.1: Set Up Gemini 3 Pro Prompt Templates

**Location:** `projects/snooze-website/kajabi-deployment/pages/product-pages/GEMINI-PROMPT-TEMPLATES.md`

Create reusable prompt templates for each content type:

1. **Module Summary Prompts**
2. **Hero Section Prompts**
3. **Course Overview Prompts**
4. **Resources Section Prompts**

### Step 2.2: Generate Module Summaries (SEO-Optimized)

**Process:**
For each module in each course, use Gemini 3 Pro with this template:

```
You are writing module summaries for a baby sleep course landing page. Follow Sally's tone of voice guidelines.

COURSE CONTEXT:
- Course Name: [Course Name]
- Target Age: [Age Range]
- Module Title: [Module Title]
- Module Description: [From course docs]
- Lesson Count: [X] lessons
- Key Challenges: [List challenges this module addresses]

TONE OF VOICE REQUIREMENTS:
- Evidence-based clarity (explain simply, use analogies)
- Supportive without coddling (acknowledge difficulty, set realistic expectations)
- Practical and actionable (specific steps, not vague)
- Confident and calm (definitive language, "I would", "I like to")
- Judgment-free (no "should/must", use "you can")
- Relatable and human (personal examples when relevant)

OUTPUT FORMAT:
Write a 2-3 sentence module summary that:
1. Addresses the user's challenge/problem directly (use questions they might ask)
2. Explains what they'll learn (specific, not generic)
3. Uses SEO-optimized keywords naturally (based on common search queries)
4. Matches Sally's voice (see tone guidelines above)
5. Ends with why this module matters for their specific situation

EXAMPLE (from 3-4 Month Course):
"If you're wondering 'why is my 4-month-old sleeping worse?' or 'is this the 4-month sleep regression?', this module explains what's really happening. You'll learn why sleep cycles permanently change at this age, why your baby might be waking every hour, and what's normal versus what needs attention. Perfect for parents experiencing the 4-month sleep regression or wondering when to start sleep training."

Now write the summary for: [Module Title]
```

**Batch Processing:**
- Generate all module summaries for all courses in one session
- Save outputs in: `projects/snooze-website/kajabi-deployment/pages/product-pages/GENERATED-CONTENT/`

**Estimated Time:** 2-3 hours

### Step 2.3: Generate Hero Section Copy

**Prompt Template:**
```
Generate hero section copy for: [Course Name]

REQUIREMENTS:
- Hero Title: [Course Name] - Clear, benefit-focused
- Subtitle: One sentence describing what the course covers (age-specific)
- Stats: [X] modules, [Y] lessons, Downloadable resources, Lifetime access

Follow tone of voice guidelines. Keep it concise and benefit-focused.

EXAMPLE (from 3-4 Month Course):
- Title: "3-4 Month Baby Sleep Course"
- Subtitle: "A self-paced course covering sleep changes, nap consolidation, and building independent sleep skills for babies 3-4 months old."
- Stats: "11 modules • 20+ lessons • Downloadable resources • Lifetime access"
```

**Estimated Time:** 30 minutes

### Step 2.4: Generate Course Overview Sections

**Prompt Template:**
```
Generate "What You'll Learn", "Course Format", and "Time Investment" sections for: [Course Name]

Use the module structure to inform "What You'll Learn" bullets.
Keep format consistent with 3-4 month course example.

What You'll Learn (6-8 bullets):
- Based on module topics
- Address common challenges

Course Format:
- Text-based lessons
- Video demonstrations (if applicable)
- Downloadable PDF guides
- Checklists and trackers
- Sample schedules
- Self-paced learning

Time Investment:
- Self-paced, learn at your own speed
- Estimated X hours total content
- Can complete in one session or over weeks
- Reference back anytime
- Lifetime access to all updates
```

**Estimated Time:** 30 minutes

### Step 2.5: Generate Resources Section

**Prompt Template:**
```
List all resources included in: [Course Name]

Based on course documentation, generate resource items matching the format:
- Video Lessons (if applicable) - [count] video demonstrations covering...
- Written Guides - [count] comprehensive text-based lessons with...
- Downloadable PDFs - [count+] printable resources including...
- Sample Schedules - Multiple schedule templates for...
- Decision Flowcharts - Visual guides for...
- Progress Trackers - Printable sheets to track...

Keep descriptions specific and value-focused.
```

**Estimated Time:** 30 minutes

### Step 2.6: Review and Refine Gemini Outputs

**Quality Checklist:**
- [ ] All summaries address user challenges (questions they ask)
- [ ] SEO keywords are natural, not forced
- [ ] Tone matches Sally's voice (no "should/must")
- [ ] All copy is specific and actionable
- [ ] Module counts and stats are accurate
- [ ] Copy is consistent with 3-4 month course style

**Estimated Time:** 1 hour

---

## 💻 Phase 3: HTML Generation

### Step 3.1: Create HTML Template Base

**Process:**
1. Copy `3-4-month-course-landing-page.html` as base template
2. Create placeholder file for each course:
   - `newborn-guide-landing-page.html`
   - `toddler-toolkit-landing-page.html`
   - `snooze-method-landing-page.html`
   - Update: `5-12-month-guide-landing-page.html`

### Step 3.2: Replace Template Content

**Systematic Replacement Order:**

1. **Hero Section:**
   - [ ] Update course title
   - [ ] Update subtitle
   - [ ] Update stats (module count, lesson count)
   - [ ] Update section ID (`id="course-hero-[course-slug]"`)

2. **Course Overview:**
   - [ ] Update intro paragraph
   - [ ] Update "What You'll Learn" bullets
   - [ ] Update "Course Format" bullets
   - [ ] Update "Time Investment" bullets

3. **Course Curriculum:**
   - [ ] Determine if two-column layout (Parts) or single layout
   - [ ] Add Part 1/Part 2 titles if applicable
   - [ ] For each module:
     - [ ] Module title
     - [ ] Lesson count, duration, resource count
     - [ ] Module summary (from Gemini)
     - [ ] Accordion structure (copy HTML pattern)

4. **Course Resources:**
   - [ ] Update resource items with course-specific content
   - [ ] Update resource descriptions

5. **Success Stories:**
   - [ ] Keep same structure (or customize with course-specific reviews if available)

6. **Value Comparison:**
   - [ ] Verify pricing ($117 Launch / $129 BAU)
   - [ ] Update product checkout URL (from URL-REFERENCE.md)
   - [ ] Update "For just $X more" message

7. **What's in Snooze:**
   - [ ] Change "This Course" to "This Guide" if applicable
   - [ ] Otherwise keep consistent

8. **Meta Tags (Comments):**
   - [ ] Update SEO title
   - [ ] Update SEO description

### Step 3.3: Manual HTML Creation Process

**Option A: Find & Replace Method**
1. Copy entire `3-4-month-course-landing-page.html`
2. Use find/replace for:
   - "3-4 Month" → "[Course Name]"
   - "3-4 month" → "[course name]"
   - Module titles
   - Stats numbers
   - URLs

**Option B: Section-by-Section Copy**
1. Copy base structure
2. Replace each section one at a time
3. Verify after each section

**Recommended:** Option B (more thorough, easier to catch errors)

### Step 3.4: Verify Structure Consistency

**Checklist:**
- [ ] All sections present (Hero, Overview, Curriculum, Resources, Success Stories, Value Comparison, What's in Snooze, FAQ if applicable)
- [ ] Accordion structure matches (onclick handlers, toggle classes)
- [ ] CSS classes match template (no custom classes that won't work)
- [ ] IDs are unique per page
- [ ] All URLs are correct (check against URL-REFERENCE.md)

**Estimated Time:** 2-3 hours per course (8-12 hours total for 4 courses)

---

## ✅ Phase 4: Quality Assurance

### Step 4.1: Voice Consistency Review

**Checklist:**
- [ ] No "should" or "must" language (replace with "I would", "you can")
- [ ] All module summaries address user challenges/questions
- [ ] SEO keywords are natural, not keyword-stuffed
- [ ] Tone is supportive, confident, judgment-free
- [ ] Personal language ("I like to", "For me") where appropriate
- [ ] Realistic expectations set (no false promises)
- [ ] Evidence-based language used appropriately

**Reference:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`

### Step 4.2: Technical Accuracy Review

**Checklist:**
- [ ] All URLs match `docs/technical/URL-REFERENCE.md`
- [ ] All pricing matches `docs/strategy/SNOOZE-PRICING-STRATEGY.md`
- [ ] Module counts are accurate
- [ ] Lesson counts are accurate
- [ ] Resource counts are accurate
- [ ] Course structure matches source documents

### Step 4.3: Content Accuracy Review

**Checklist:**
- [ ] Module titles match course documentation
- [ ] Lesson counts per module are accurate
- [ ] Module summaries accurately describe content
- [ ] "What You'll Learn" reflects actual course content
- [ ] Resources listed actually exist in course
- [ ] Course overview accurately describes the course

### Step 4.4: Comparison Check

**Checklist:**
- [ ] Compare against 3-4 month course for consistency
- [ ] All sections present and in correct order
- [ ] Styling classes match (will work with global CSS)
- [ ] Accordion functionality will work (same structure)
- [ ] Mobile responsiveness maintained

### Step 4.5: Final HTML Validation

**Checklist:**
- [ ] All HTML is well-formed (validate)
- [ ] No broken links
- [ ] All images have alt text (if any)
- [ ] All onclick handlers reference correct functions
- [ ] IDs are unique (no duplicates)
- [ ] CSS classes match global stylesheet

**Estimated Time:** 1-2 hours per course (4-8 hours total)

---

## 📦 Phase 5: File Organization & Documentation

### Step 5.1: Organize Generated Content

**Directory Structure:**
```
pages/product-pages/
├── 3-4-month-course-landing-page.html (template)
├── 5-12-month-guide-landing-page.html (updated)
├── newborn-guide-landing-page.html (new)
├── toddler-toolkit-landing-page.html (new)
├── snooze-method-landing-page.html (new)
├── COURSE-DATA-COLLECTION.md (data gathering)
├── GEMINI-PROMPT-TEMPLATES.md (prompts used)
└── GENERATED-CONTENT/
    ├── module-summaries/
    │   ├── 5-12-month-module-summaries.md
    │   ├── toddler-toolkit-module-summaries.md
    │   ├── snooze-method-module-summaries.md
    │   └── newborn-module-summaries.md
    ├── hero-sections.md
    ├── course-overviews.md
    └── resources-sections.md
```

### Step 5.2: Update README.md

Update `projects/snooze-website/kajabi-deployment/pages/product-pages/README.md`:
- [ ] Add all new pages to "Pages Included" section
- [ ] Document status of each page
- [ ] Add any deployment notes

### Step 5.3: Create Completion Checklist

**Final Checklist:**
- [ ] All 4 courses have complete landing pages
- [ ] All pages pass QA review
- [ ] All generated content is saved in GENERATED-CONTENT/
- [ ] README.md is updated
- [ ] Ready for deployment testing

**Estimated Time:** 1 hour

---

## 📊 Project Timeline

### Total Estimated Time: 20-30 hours

**Breakdown:**
- Phase 1: Data Collection - 1-2 hours
- Phase 2: Content Generation - 4-5 hours
- Phase 3: HTML Generation - 8-12 hours (2-3 hours per course)
- Phase 4: Quality Assurance - 4-8 hours (1-2 hours per course)
- Phase 5: Documentation - 1 hour

### Recommended Schedule

**Option A: Batch Processing (Recommended)**
- Day 1: Phase 1 (Data Collection) + Phase 2 (Content Generation)
- Day 2: Phase 3 (HTML Generation - All courses)
- Day 3: Phase 4 (QA - All courses) + Phase 5 (Documentation)

**Option B: Course-by-Course**
- Complete one course end-to-end as proof of concept
- Use learnings to improve process for remaining courses
- Better for iteration and refinement

---

## 🎯 Deliverables

### Files to Create/Update

1. **New HTML Files:**
   - `newborn-guide-landing-page.html`
   - `toddler-toolkit-landing-page.html`
   - `snooze-method-landing-page.html`

2. **Updated HTML Files:**
   - `5-12-month-guide-landing-page.html`

3. **Documentation Files:**
   - `COURSE-DATA-COLLECTION.md`
   - `GEMINI-PROMPT-TEMPLATES.md`
   - `GENERATED-CONTENT/` directory with all Gemini outputs
   - Updated `README.md`

4. **This Project Document:**
   - `PRODUCT-PAGE-DUPLICATION-PROJECT.md` (this file)

---

## 🔧 Tools & Resources

### Key Documents
- **Tone of Voice:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **Pricing Strategy:** `docs/strategy/SNOOZE-PRICING-STRATEGY.md`
- **URL Reference:** `projects/snooze-website/docs/technical/URL-REFERENCE.md`
- **Template:** `projects/snooze-website/kajabi-deployment/pages/product-pages/3-4-month-course-landing-page.html`

### Course Source Documents
- **5-12 Month:** `projects/kajabi-courses/courses/5-12-month-course/5-12-MONTH-GUIDE-MODULE-INFO.md`
- **Toddler Toolkit:** `projects/snooze-website/docs/landing-page/TODDLER-TOOLKIT-STRUCTURE.md`
- **Snooze Method:** `projects/snooze-website/docs/landing-page/SNOOZE-METHOD-MODULE-INFO.md`
- **Newborn:** `projects/kajabi-courses/courses/newborn-guide/The Sleep Concierge - Fourth Trimester Guide.md` (Guide format - will upgrade to course later)

### AI Tool
- **Gemini 3 Pro** - For content generation

---

## 📝 Notes & Considerations

### Course Structure Variations

**Two-Column Layout (Parts):**
- 3-4 Month Course: Part 1: The Prep, Part 2: The Plan
- 5-12 Month Guide: Part 1: The Prep, Part 2: The Plan
- Use `.course-curriculum-two-columns` structure

**Single-Column Layout:**
- Toddler Toolkit: 7 modules (no parts)
- Snooze Method: 4 modules (no parts)
- Use single column layout (modify template)

### Module Summary Style

**Key Pattern:**
1. Start with user question/challenge
2. Explain what they'll learn (specific)
3. End with why this matters (outcome-focused)

**Example Pattern:**
> "If you're wondering [user question], this module explains [what's happening]. You'll learn [specific learnings]. Perfect for parents [specific situation]."

### SEO Optimization

**Keywords to Naturally Include:**
- Age-specific terms (e.g., "3-4 month", "5-12 month", "toddler")
- Challenge terms (e.g., "sleep regression", "early rising", "nap training")
- Solution terms (e.g., "sleep training", "settling techniques", "sleep schedule")
- Parent questions (e.g., "why is my baby", "how to help", "when to start")

**Avoid:**
- Keyword stuffing
- Unnatural phrases
- Generic language

---

## ✅ Success Metrics

### Quality Metrics
- All pages pass QA checklist
- Voice consistency matches tone guide
- All URLs and pricing are accurate
- Module summaries are SEO-optimized and user-focused

### Completion Metrics
- 4 complete landing pages ready for deployment
- All generated content documented
- All source data collected and organized

### Ready for Deployment
- Pages can be deployed to Kajabi without further changes
- All components work with global CSS/JS
- Mobile responsiveness verified
- All links functional

---

## 🚀 Next Steps After Completion

1. **Deployment Testing:**
   - Test one page in Kajabi staging
   - Verify all components render correctly
   - Test context-aware CTAs
   - Verify mobile responsiveness

2. **Iteration:**
   - Gather feedback on first deployed page
   - Refine process if needed
   - Apply improvements to remaining pages

3. **Full Deployment:**
   - Deploy all pages to Kajabi
   - Set up checkout URLs
   - Configure product settings
   - Test all user states (logged out, logged in, member)

---

## 📚 Appendix: Quick Reference

### Course URLs (Clean Format)
- 3-4 Month: `https://joinsnooze.com/3-4-month-baby-sleep-course`
- 5-12 Month: `https://joinsnooze.com/5-12-month-baby-sleep-guide`
- Newborn: `https://joinsnooze.com/newborn-sleep-guide`
- Toddler Toolkit: (Check URL-REFERENCE.md)
- Snooze Method: (Check URL-REFERENCE.md)

### Pricing (Launch / BAU)
- All full courses: $117 / $129
- Mini modules: $27 / $37
- Membership: $147/quarter / $197/quarter

### Key Contacts/Documents
- Tone of Voice: `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- Pricing: `docs/strategy/SNOOZE-PRICING-STRATEGY.md`
- URLs: `projects/snooze-website/docs/technical/URL-REFERENCE.md`

---

**Last Updated:** December 07, 2025  
**Status:** Ready to Begin  
**Next Action:** Start Phase 1 - Data Collection & Preparation

