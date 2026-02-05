# Content Generation Script - Claude Opus 4.5

**Purpose:** Generate landing page content for all Snooze courses using Claude Opus 4.5 API

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **API Key:**
   - API key is stored in root `.env` file as `ANTHROPIC_API_KEY`
   - Script automatically loads from root directory

## Usage

```bash
python3 generate_content_claude.py
```

## What It Generates

For each course:
1. **Module Summaries** - SEO-optimized, user-focused summaries (50-75 words each)
2. **Hero Section** - Title, subtitle, and stats
3. **Course Overview** - Intro paragraph, "What You'll Learn", "Course Format", "Time Investment"
4. **Resources Section** - Resource item descriptions

## Output Files

- `GENERATED-CONTENT/module-summaries/{course-slug}-module-summaries.md`
- `GENERATED-CONTENT/{course-slug}-content.md`
- `GENERATED-CONTENT/generation-summary.json`

## Course Data

Currently configured for:
- 5-12 Month Guide (6 modules)

**To add more courses:**
Edit the `courses` list in `generate_content_claude.py` with course data from `COURSE-DATA-COLLECTION.md`

## Cost Estimate

- ~20,800 input tokens
- ~4,800 output tokens
- Estimated cost: ~$0.22 per full run
- With refinements: ~$0.50-1.00 total

## Notes

- Script includes rate limiting (2 second delays between API calls)
- All prompts include tone of voice guidelines
- Outputs are saved with timestamps
- Review all generated content before using in landing pages

