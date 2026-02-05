# Gemini 3 Pro Prompt Templates

**Purpose:** Reusable prompt templates for generating course landing page content  
**Date:** December 07, 2025  
**Status:** Ready to Use  
**AI Model:** Gemini 3 Pro

---

## How to Use This Document

1. Copy the relevant prompt template
2. Fill in the [PLACEHOLDER] sections with course-specific information
3. Run the prompt in Gemini 3 Pro
4. Save outputs in `GENERATED-CONTENT/` directory
5. Review and refine as needed

---

## Context Setting (Add to All Prompts)

```
You are writing content for The Sleep Concierge / Snooze, a baby and toddler sleep consulting brand.

TONE OF VOICE REQUIREMENTS:
- Evidence-based clarity: Explain simply, use analogies, ground advice in evidence
- Supportive without coddling: Acknowledge difficulty, set realistic expectations, no empty reassurances
- Practical and actionable: Specific steps, exact timings, not vague guidance
- Confident and calm: Definitive language ("I would", "I like to"), not uncertain
- Judgment-free: No "should/must", use "you can", validate different paths
- Relatable and human: Personal examples, admits challenges, shows vulnerability

LANGUAGE PATTERNS:
- Use "I would" / "I like to" / "For me" (not "you should")
- Use "You can" / "You don't have to" (permission-giving)
- Use "Usually" / "Often" (not "always/never")
- Avoid "Solution" / "Solutions" → Use "Support" / "Guidance" / "Help" / "Strategies"
- Never say "You should" / "You must" (judgmental)
- Never say "Perfect" / "Flawless" (unrealistic)

EXAMPLE OF GOOD TONE:
"If you're wondering 'why is my 4-month-old sleeping worse?' or 'is this the 4-month sleep regression?', this module explains what's really happening. You'll learn why sleep cycles permanently change at this age, why your baby might be waking every hour, and what's normal versus what needs attention. Perfect for parents experiencing the 4-month sleep regression or wondering when to start sleep training."
```

---

## Prompt 1: Module Summary Generator

### Purpose
Generate SEO-optimized, user-focused module summaries for the accordion sections.

### Full Prompt Template

```
[CONTEXT SETTING - Copy from above]

You are writing module summaries for a baby sleep course landing page. These summaries appear in an accordion menu and should be concise but compelling.

COURSE CONTEXT:
- Course Name: [Course Name]
- Target Age: [Age Range, e.g., "3-4 months", "5-12 months", "12+ months"]
- Module Title: [Module Title]
- Module Description: [Module Description from course docs]
- Lesson Count: [X] lessons
- Key Challenges This Module Addresses: [List 3-5 key challenges]
- Common User Questions: [List questions parents ask about this topic]

OUTPUT REQUIREMENTS:
Write a 2-3 sentence module summary (approximately 50-75 words) that:

1. **Starts with a user question/challenge** - Use questions parents actually ask (e.g., "If you're wondering 'why is my baby...'", "Struggling with...", "Dealing with...")

2. **Explains what they'll learn** - Be specific about the content (e.g., "You'll learn why sleep cycles permanently change", "You'll get step-by-step guidance on room temperature")

3. **Ends with why this matters** - Connect to their situation (e.g., "Perfect for parents experiencing...", "Ideal for parents dealing with...")

4. **Uses SEO keywords naturally** - Include relevant search terms without keyword stuffing (e.g., "4-month sleep regression", "early rising", "nap training")

5. **Matches Sally's voice** - Warm, confident, practical, judgment-free

EXAMPLE (from 3-4 Month Course):
"If you're wondering 'why is my 4-month-old sleeping worse?' or 'is this the 4-month sleep regression?', this module explains what's really happening. You'll learn why sleep cycles permanently change at this age, why your baby might be waking every hour, and what's normal versus what needs attention. Perfect for parents experiencing the 4-month sleep regression or wondering when to start sleep training."

Now generate the module summary for:
- Module: [Module Title]
- Course: [Course Name]
```

### Usage Instructions

1. Fill in all [PLACEHOLDER] sections with course-specific information
2. For "Common User Questions", think about what parents search for or ask about this topic
3. Run the prompt for each module
4. Review output against the example style
5. Refine if needed (ask for variations or adjustments)

### Output Format

Save each module summary in this format:
```markdown
## [Course Name] - [Module Title]

[Generated summary text]
```

---

## Prompt 2: Hero Section Generator

### Purpose
Generate hero section copy (title, subtitle, stats).

### Full Prompt Template

```
[CONTEXT SETTING - Copy from above]

Generate hero section copy for a baby sleep course landing page.

COURSE INFORMATION:
- Course Name: [Course Name]
- Target Age: [Age Range]
- Total Modules: [X]
- Total Lessons: [Y]
- Has Downloadable Resources: Yes/No
- Access: Lifetime

OUTPUT REQUIREMENTS:
Generate the following elements:

1. **Hero Title:** 
   - Format: "[Course Name]"
   - Should be clear and benefit-focused
   - Example: "3-4 Month Baby Sleep Course"

2. **Hero Subtitle:**
   - One sentence describing what the course covers
   - Age-specific and benefit-focused
   - Example: "A self-paced course covering sleep changes, nap consolidation, and building independent sleep skills for babies 3-4 months old."

3. **Hero Stats:**
   - Format: Short phrases with bold numbers
   - Include: Module count, lesson count, resource type, access type
   - Example: "11 modules • 20+ lessons • Downloadable resources • Lifetime access"

OUTPUT FORMAT:
Title: [Title]
Subtitle: [Subtitle]
Stats: [Stats with bold indicators]
```

### Usage Instructions

1. Fill in course-specific information
2. Run prompt
3. Review for clarity and consistency with other courses
4. Adjust stats format if needed

---

## Prompt 3: Course Overview Generator

### Purpose
Generate "What You'll Learn", "Course Format", and "Time Investment" sections.

### Full Prompt Template

```
[CONTEXT SETTING - Copy from above]

Generate course overview sections for a baby sleep course landing page.

COURSE INFORMATION:
- Course Name: [Course Name]
- Target Age: [Age Range]
- Modules: [List all module titles]
- Total Lessons: [X]
- Has Videos: Yes/No
- Has PDFs: Yes/No
- Resource Count: [Approximate number]

OUTPUT REQUIREMENTS:

1. **Course Overview Intro Paragraph:**
   - 2-3 sentences summarizing the course
   - Age-specific, benefit-focused
   - Example: "This course provides comprehensive guidance for navigating your baby's 3-4 month sleep changes. You'll learn evidence-based strategies for extending naps, reducing night wakings, and building healthy sleep foundations."

2. **What You'll Learn (6-8 bullet points):**
   - Based on module topics
   - Address common challenges
   - Specific and actionable
   - Format: "- [Learning point]"
   - Example:
     - "Why sleep changes at 3-4 months"
     - "How to extend 30-minute cat naps"
     - "Settling techniques for this age"

3. **Course Format (6 bullet points):**
   - Standard format across all courses
   - Include: Text-based lessons, Video demonstrations (if applicable), Downloadable PDF guides, Checklists and trackers, Sample schedules, Self-paced learning

4. **Time Investment (5 bullet points):**
   - Standard format across all courses
   - Include: Self-paced learning, Estimated hours, Flexible completion, Reference back anytime, Lifetime access

Generate all four sections for [Course Name].
```

### Usage Instructions

1. List all module titles to inform "What You'll Learn"
2. Verify resource types (videos, PDFs, etc.)
3. Run prompt
4. Review for accuracy and consistency
5. Adjust bullet points as needed

---

## Prompt 4: Resources Section Generator

### Purpose
Generate resource item descriptions for the "Course Resources" section.

### Full Prompt Template

```
[CONTEXT SETTING - Copy from above]

Generate resource descriptions for the "Course Resources" section of a baby sleep course landing page.

COURSE INFORMATION:
- Course Name: [Course Name]
- Video Lessons: [Count] (if applicable)
- Written Guides: [Count]
- Downloadable PDFs: [Count]
- Sample Schedules: [Count] (if applicable)
- Other Resources: [List types and counts]

OUTPUT REQUIREMENTS:
Generate resource items matching this format. Each item should:
- Have a clear title (h4)
- Include a specific description
- Be value-focused

STANDARD RESOURCE ITEMS:

1. **Video Lessons** (if applicable)
   - Title: "Video Lessons"
   - Description: "[Count] video demonstrations covering [specific topics]"

2. **Written Guides**
   - Title: "Written Guides"
   - Description: "[Count] comprehensive text-based lessons with detailed explanations and step-by-step instructions"

3. **Downloadable PDFs**
   - Title: "Downloadable PDFs"
   - Description: "[Count+] printable resources including [specific types: checklists, trackers, schedules, reference guides]"

4. **Sample Schedules** (if applicable)
   - Title: "Sample Schedules"
   - Description: "Multiple schedule templates for [specific situations]"

5. **Decision Flowcharts** (if applicable)
   - Title: "Decision Flowcharts"
   - Description: "Visual guides for [specific decisions]"

6. **Progress Trackers** (if applicable)
   - Title: "Progress Trackers"
   - Description: "Printable sheets to track [what they track]"

Generate resource items for [Course Name] based on the course information above.
```

### Usage Instructions

1. Gather accurate resource counts from course documentation
2. Fill in all course-specific information
3. Run prompt
4. Review for accuracy
5. Add or remove resource items as needed

---

## Prompt 5: Batch Module Summaries

### Purpose
Generate all module summaries for a course in one session.

### Full Prompt Template

```
[CONTEXT SETTING - Copy from above]

Generate module summaries for ALL modules in a course. This will save time by generating all summaries at once.

COURSE INFORMATION:
- Course Name: [Course Name]
- Target Age: [Age Range]
- Total Modules: [X]

MODULE 1:
- Title: [Module Title]
- Description: [Module Description]
- Lesson Count: [X]
- Key Challenges: [List]
- User Questions: [List]

MODULE 2:
- Title: [Module Title]
- Description: [Module Description]
- Lesson Count: [X]
- Key Challenges: [List]
- User Questions: [List]

[Continue for all modules...]

OUTPUT REQUIREMENTS:
For each module, generate a 2-3 sentence summary (50-75 words) that:
1. Starts with a user question/challenge
2. Explains what they'll learn (specific)
3. Ends with why this matters
4. Uses SEO keywords naturally
5. Matches Sally's voice

Format your output as:
## Module 1: [Title]
[Summary]

## Module 2: [Title]
[Summary]

[Continue for all modules...]
```

### Usage Instructions

1. Prepare all module information first (use data collection document)
2. Fill in the template completely
3. Run prompt (may need multiple prompts if too long)
4. Review each summary individually
5. Refine any that don't match style

---

## Quality Checklist (Apply to All Outputs)

Before using any generated content, verify:

- [ ] **Voice Consistency:** Matches Sally's tone (warm, confident, judgment-free)
- [ ] **No "Should/Must":** Uses "I would", "you can" instead
- [ ] **Specific Content:** Not vague, includes specific details
- [ ] **User-Focused:** Addresses user challenges/questions
- [ ] **SEO Natural:** Keywords included naturally, not stuffed
- [ ] **Accuracy:** Module/lesson counts match source docs
- [ ] **Length:** Module summaries are 50-75 words
- [ ] **Format:** Matches example style from 3-4 month course

---

## Tips for Best Results

### 1. Provide Context
- Always include the context setting
- Be specific about course details
- Include examples of desired style

### 2. Iterate if Needed
- If output doesn't match style, ask for variations
- Request specific adjustments (more specific, shorter, different tone)
- Provide feedback on what worked/didn't work

### 3. Review Carefully
- Generated content should be reviewed before use
- Compare against 3-4 month course examples
- Check for accuracy against source documents

### 4. Batch Processing
- Generate all module summaries for one course at once
- Generate all hero sections at once
- This saves time and maintains consistency

### 5. Save Everything
- Save all prompts and outputs in `GENERATED-CONTENT/`
- Document which prompts worked best
- Keep a log of iterations

---

## Example Session Log

```markdown
## Session: 5-12 Month Guide - Module Summaries

**Date:** December 07, 2025
**Prompt Used:** Prompt 5 (Batch Module Summaries)
**Status:** ✅ Complete

**Results:**
- Generated 6 module summaries
- All matched tone and style
- Minor adjustments needed for Module 4 (made more specific)
- All saved to: `GENERATED-CONTENT/module-summaries/5-12-month-module-summaries.md`

**Iterations:**
- First pass: All summaries generated
- Revision: Module 4 refined to be more specific about sleep training techniques
- Final: All approved
```

---

**Last Updated:** December 07, 2025  
**Status:** Ready to Use  
**Next Action:** Use these prompts in Phase 2 of the duplication project

