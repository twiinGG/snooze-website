# Development Brief: Course Free Modules → Conversion

## 1. Project Overview
**Objective:** Transform the entry funnel from a generic "intro sample" to precise, pain-led **Free Modules** that solve one specific problem while naturally guiding parents toward the full course or Snooze membership.

**Strategic Rationale:**
- Kajabi paywalls are typically linear; we need to unlock specific high-interest modules (e.g., Schedules) immediately.
- Parents arrive with urgent, specific problems ("My baby won't nap") rather than a desire to "do a course."
- By solving the immediate pain, we build trust and position Snooze as the logical continuity partner.

## 2. Core Principles
- **One Problem, One Solution:** Each free module must solve one specific issue completely.
- **Real Value:** This is not a "teaser"; it's a real, high-value module from the full course.
- **The Snooze Pivot:** Snooze is positioned as *continuity and support* across life's changes (regressions, travel, etc.), while the course is the *focused plan* for the current issue.

## 3. Product Architecture (Kajabi)
For each Course (e.g., 5-12 Month Sleep Guide), we create multiple **Free Module Variants**.

### Variant Examples:
- **Newborn:** NB Dream Feed, NB Wake Windows, NB Unswaddle.
- **3-4 Month:** 3-4M 4hr Feeds, 3-4M Regression, 3-4M Settling.
- **5-12 Month:** Schedules, Overnight Feeds, Nap Training.
- **Toddler:** 18M Regression, 2-1 Nap Drop, 2Y Regression.

### Structure within Kajabi:
1. **Orientation Lesson (Modified):**
   - Sets expectations: "This helps with one piece, but sleep works best as a full plan."
   - Frame Snooze: Support for the long-term.
2. **The Unlocked Module:** The actual, full module from the canon course.
3. **The Paywall:** Native Kajabi paywall appearing after the unlocked module.
4. **The Rest of the Course:** Visible but locked; accessible upon purchase or Snooze joining.

## 4. Messaging & Tone (Advisory)
Consistent with `SNOOZE-TONE-OF-VOICE.md`:
- **Advisory, not Salesy:** No urgency, no countdowns, no discounts.
- **Language:** Always use "Free Module." Avoid "sample," "preview," or "teaser."

### In-Course CTA Rules:
At the end of the unlocked module, include:
- **Button 1:** "Continue with the full course"
- **Button 2:** "Get full access inside Snooze"
- **Framing:** "This module works best as part of a complete plan... if you want support as sleep changes over time, Snooze gives you ongoing access."

## 5. Automation & Email Logic
- **Tags:** Apply module-specific tags (e.g., `sample_512_schedule`).
- **Automation:** Use a shared sequence `Course Sample → Conversion (Module-Specific)` with IF/ELSE branching based on the tag.
- **Email Sequence:** 4 emails (Day 0, 2, 4, 6).
  - **Day 0:** Access + Framing.
  - **Day 2:** Why this issue doesn't exist in isolation.
  - **Day 4:** Decision support (Course vs. Snooze) - The "Grown-up choice" pivot.
  - **Day 6:** Gentle nudge to choose a path.

## 6. Implementation Workflow
1. **Content:** Draft Orientation Lesson and Email Sequence copy.
2. **File Naming:** Ensure ALL files use the bundle code prefix (`LMCR##-filename.html`).
   - HTML files: `src/content/bundles/LMCR##/html/`
   - Email files: `src/content/bundles/LMCR##/emails/`
3. **Kajabi:** Clone the canon course to create a "Free Module" variant.
4. **Kajabi:** Configure the offer to grant access to the "Free Module" product.
5. **Automation:** Set up the Tag-driven email automation.
6. **QA:** Test end-to-end on mobile from a DM link.

## 6.1 File Naming Convention (CRITICAL)
**ALL files within each bundle MUST use the bundle code prefix:**
- **Format:** `LMCR##-filename.html` (e.g., `LMCR04-thank-you-access.html`)
- **Applies to:** HTML blocks, email templates, and all bundle-specific assets
- **Rationale:** Enables easy identification, archiving, and management. When a bundle is retired, all files with the prefix can be confidently archived together.

## 6.2 Kajabi Course Content Styling (CRITICAL)
When creating HTML for Kajabi **course lessons** (NOT landing pages):

**What Kajabi strips out:**
- `<style>` blocks - completely removed
- CSS classes for styling - won't apply
- Outer wrapper divs with backgrounds/borders - often stripped
- Formatted indentation/whitespace - gets flattened

**Required pattern:**
1. **ALL styling MUST be inline** using `style="..."` attributes
2. **USE `!important`** on EVERY style property
3. **Start content directly** with `<p>`, `<ul>`, `<div>` - no styled wrapper containers
4. **Flat/compressed structure** - no indentation, minimal whitespace
5. **HTML entities** for special characters (`&ndash;` not `–`, `&rsquo;` not `'`)
6. **Lowercase hex colors** preferred (`#1f293b` not `#1F293B`)

**Reference files:**
- `projects/kajabi-courses/courses/5-12-month-course/module-2-lesson-4-1 ACTUAL CODE.html`
- `src/content/bundles/LMCR04/html/LMCR04-free-module-summary-upsell.html`

**Example (correct):**
```html
<p style="font-size: 18px !important; line-height: 1.7 !important; color: #1f293b !important;">Content</p>
```

**Example (WRONG - will break):**
```html
<div style="background: #FAF7F4 !important; padding: 30px !important;">
  <p>Content</p>
</div>
```

## 6.3 Kajabi Email HTML Styling (CRITICAL)
When creating HTML for Kajabi **email campaigns** (NOT course lessons or landing pages):

**What Kajabi strips out:**
- `<style>` blocks - completely removed
- External stylesheets - won't load
- Complex nested div structures - may break rendering

**Required pattern:**
1. **ALL styling MUST be inline** using `style="..."` attributes
2. **NO `!important` needed** - Email clients handle inline styles differently than course content
3. **Single wrapper div allowed** - One main container with font-family, max-width, padding is standard
4. **Use `<br />` for spacing** - More reliable than margin-bottom in email clients
5. **Kajabi merge tags** - Use `{{first_name}}`, `{{settings_name}}`, etc. for personalization
6. **HTML comments preserved** - Header comments with email metadata are kept
7. **Simple structure** - Flat paragraph-based content, minimal nesting

**Reference file:**
- `src/content/bundles/LMCR04/emails/LMCR04-day-0-welcome.html`

**Example (correct):**
```html
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <p>Hi {{first_name}},<br /><br /></p>
    <p style="text-align: center; margin: 20px 0;"><a href="#" style="display: inline-block; padding: 1rem 2rem; background: #F43357; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Button Text</a></p>
</div>
```

**Key differences from course HTML:**
- Email HTML CAN use a single wrapper div (not stripped)
- Email HTML does NOT need `!important` flags
- Email HTML uses `<br />` for vertical spacing
- Email HTML preserves header comments

## 6.4 NO EM DASHES IN CODE (CRITICAL - REPO WIDE)
**NEVER use em dashes in any code files:**
- **NO `&mdash;`** HTML entity
- **NO `—`** Unicode character
- **Use commas, colons, or periods instead**
- **Applies to:** All HTML, email templates, course content, and code files
- **Rationale:** Consistency, compatibility, and cleaner code

## 7. Success Metrics
- Parents feel genuinely helped by the free content.
- Course purchases feel logical and unpressured.
- Snooze joins are calm and considered (long-term value focus).
