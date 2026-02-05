# Content Generation Process - Snooze Website

**Purpose:** Ensure all website content follows Sally's authentic voice using Gemini 3 Pro API and the Tone of Voice guide.

**Date:** January 2025  
**Status:** Production-Ready  
**Based on:** Brand Content Consultant Gemini 3 integration

---

## Overview

All website content must:
1. **Follow the Tone of Voice Guide:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
2. **Use Gemini 3 Pro API:** For content generation and review
3. **Reference Knowledge Base:** Query Supabase for authentic examples
4. **Check Sleep Schedule Bible:** For any schedule-related content (see @.cursor/rules/sleep-schedule-bible.mdc)
5. **Maintain Premium Experience:** Polished, professional, authentic

---

## Content Generation Workflow

```
1. Define Content Requirements
   ↓
2. Check Sleep Schedule Bible (if schedule-related)
   ↓
3. Query Knowledge Base for Examples
   ↓
4. Generate Content with Gemini 3 Pro
   ↓
5. Review Against Tone of Voice Guide
   ↓
6. Verify Schedule Accuracy (if applicable)
   ↓
7. Refine and Finalize
   ↓
8. Deploy to Kajabi
```

---

## Setup

### Environment Variables

Add to root `.env` file:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

### Required Python Packages

```bash
pip install google-generativeai python-dotenv supabase
```

---

## Content Generation Script

### `generate_website_content.py`

**Purpose:** Generate website content using Gemini 3 Pro API, following Tone of Voice guide.

**Usage:**
```bash
cd projects/snooze-website
python3 scripts/generate_website_content.py \
  --content-type "landing-page-cta" \
  --context "new-visitor" \
  --output-file "kajabi-deployment/cta-new-visitor.html"
```

**Features:**
- Queries knowledge base for relevant examples
- Uses Gemini 3 Pro for content generation
- Reviews against Tone of Voice guide
- Outputs HTML-ready content
- Maintains premium design standards

---

## Content Types

### 1. Landing Page CTAs
**Context:** New visitor, logged-in non-member, Snooze member  
**Tone:** Confident, supportive, clear  
**Length:** 1-2 sentences  
**CTA:** Always points to `/offers/6iRarwak/checkout` (for non-members)

### 2. Navigation Labels
**Context:** Universal navigation  
**Tone:** Clear, concise, premium  
**Length:** 1-3 words  
**Examples:** "Join Snooze", "Go to Library", "Upgrade to Snooze"

### 3. Page Headlines
**Context:** Age-specific pages, product pages  
**Tone:** Supportive, evidence-based, confident  
**Length:** 5-10 words  
**Pattern:** Problem → Solution or Benefit → Action

### 4. Value Propositions
**Context:** Product comparison sections  
**Tone:** Practical, realistic, judgment-free  
**Length:** 2-3 sentences  
**Pattern:** What's included → Why it matters → How to access

### 5. Library Teaser Content
**Context:** Non-member Library preview  
**Tone:** Supportive, clear, premium  
**Length:** 1-2 paragraphs  
**Pattern:** Preview structure → Value → Access requirements

### 6. System Login Page Messaging
**Context:** Access requirements  
**Tone:** Clear, supportive, non-judgmental  
**Length:** 2-3 sentences  
**Pattern:** Welcome → Requirements → Next step

---

## Gemini 3 Pro Integration

### Model Selection

Uses intelligent fallback chain:
```python
gemini_3_models = [
    "gemini-3-pro-preview",      # Primary - best for content generation
    "gemini-3.0-pro-exp",
    "gemini-3.0-pro",
    "gemini-3.0-flash-exp",
    "gemini-3.0-flash"
]

fallback_models = [
    "gemini-2.5-pro",            # Stable fallback
    "gemini-2.5-flash"
]
```

### Prompt Structure

**Template:**
```
You are generating content for the Snooze website, following Sally's authentic voice.

CONTEXT:
- Content Type: {content_type}
- User Context: {user_context}
- Page: {page_name}

TONE OF VOICE REQUIREMENTS:
{relevant_sections_from_tone_of_voice_guide}

KNOWLEDGE BASE EXAMPLES:
{authentic_examples_from_supabase}

TASK:
Generate {content_type} that:
1. Follows Sally's voice principles exactly
2. Uses authentic language patterns from examples
3. Maintains premium, professional tone
4. Is specific and actionable
5. Avoids AI-generated patterns (no em dashes, no contrast statements)

OUTPUT:
{desired_format}
```

---

## Tone of Voice Compliance Checklist

Before deploying any content, verify:

**Language:**
- [ ] Uses "I would" / "I like to" (not "you should")
- [ ] Includes "You can" / "You don't have to" (permission-giving)
- [ ] Uses "Usually" / "Often" (not "always" / "never")
- [ ] Avoids "Solution" / "Solutions" (uses "Support" / "Guidance" / "Help")
- [ ] No em dashes "—" (use commas, periods, parentheses)
- [ ] No contrast statements ("It's not about x, it's about y")
- [ ] Includes colloquialisms when appropriate ("pear-shaped", "beast")

**Structure:**
- [ ] Starts with acknowledgment or hook
- [ ] Explains "why" before "how"
- [ ] Provides specific, actionable steps
- [ ] Includes realistic expectations
- [ ] Ends with encouragement or next step

**Tone:**
- [ ] Warm but confident
- [ ] Supportive but realistic
- [ ] Expert but approachable
- [ ] Personal but professional
- [ ] Judgment-free

**Content:**
- [ ] Evidence-based (when relevant)
- [ ] Specific and actionable
- [ ] Acknowledges difficulty
- [ ] Normalizes struggle
- [ ] Builds confidence

---

## Knowledge Base Query Patterns

### For Landing Page Content
```python
# Query for high-performing conversion content
samples = query_kb(
    platform="tiktok",
    content_type="cta",
    performance_score_min=60,
    limit=20
)
```

### For Age-Specific Pages
```python
# Query for age-specific advice examples
samples = query_kb(
    platform="instagram",
    age_range="3-4 months",
    content_type="advice",
    limit=15
)
```

### For Library Content
```python
# Query for educational, supportive content
samples = query_kb(
    platform="tiktok",
    content_type="educational",
    topic="library",
    limit=20
)
```

---

## Content Review Process

### Step 1: Generate Content
Use `generate_website_content.py` with appropriate parameters.

### Step 2: Review Against Tone of Voice
Run automated review:
```bash
python3 scripts/review_content_against_tov.py \
  --content-file "kajabi-deployment/cta-new-visitor.html" \
  --output-report "reports/content-review.json"
```

### Step 3: Apply Fixes
Review report and apply recommended fixes.

### Step 4: Final Verification
Re-run review to verify compliance.

---

## Integration with Connected Experience MVP

### Phase 1: Navigation System
- Generate navigation labels using Gemini 3 Pro
- Review against Tone of Voice guide
- Ensure premium, clear messaging

### Phase 2: Landing Page Harmonization
- Generate Library preview section copy
- Create context-aware CTAs
- Review all new content

### Phase 3-10: All Content Updates
- Generate all new copy using Gemini 3 Pro
- Review against Tone of Voice guide
- Maintain consistency across all pages

---

## Best Practices

### 1. Always Query Knowledge Base First
- Get authentic examples before generating
- Use high-performing content as reference
- Maintain consistency with existing voice

### 2. Use Gemini 3 Pro for Generation
- Best quality content generation
- Better understanding of context
- More accurate voice matching

### 3. Review Before Deployment
- Always run Tone of Voice review
- Fix high-priority issues immediately
- Verify premium experience

### 4. Maintain Consistency
- Use same examples across similar content types
- Follow established patterns
- Keep messaging aligned

### 5. Document Decisions
- Save generated content versions
- Track review reports
- Note any deviations from guide

---

## Troubleshooting

### Gemini API Errors
- Check `GEMINI_API_KEY` is set
- Verify model availability
- Use fallback models if needed

### Content Not Matching Voice
- Increase knowledge base sample size
- Review Tone of Voice guide sections
- Check prompt structure

### Inconsistent Results
- Use same knowledge base samples
- Standardize prompt templates
- Review examples for patterns

---

## Files Structure

```
projects/snooze-website/
├── scripts/
│   ├── generate_website_content.py      # Main content generation
│   ├── review_content_against_tov.py    # Tone of Voice review
│   └── query_kb_for_content.py          # Knowledge base queries
├── kajabi-deployment/
│   └── [generated content files]
└── docs/
    ├── CONTENT-GENERATION-PROCESS.md    # This file
    └── CONTENT-REVIEW-REPORTS/          # Review reports
```

---

## Quick Start

### Generate Landing Page CTA

```bash
cd projects/snooze-website
python3 scripts/generate_website_content.py \
  --content-type "landing-page-cta" \
  --context "new-visitor" \
  --page "snooze-main-landing" \
  --output-file "kajabi-deployment/cta-new-visitor.html"
```

### Review Generated Content

```bash
python3 scripts/review_content_against_tov.py \
  --content-file "kajabi-deployment/cta-new-visitor.html"
```

---

## References

- **Tone of Voice Guide:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **Gemini 3 Process:** `projects/brand-content-consultant/docs/GEMINI-3-CONTENT-REVIEW-PROCESS.md`
- **Connected Experience Plan:** `projects/snooze-website/docs/CONNECTED-EXPERIENCE-MVP-PLAN.md`

---

**Last Updated:** January 2025  
**Status:** Ready for Implementation

