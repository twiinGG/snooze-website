# Snooze Website Scripts

Utility scripts for development, content generation, and data management.

---

## Content Generation

### `generate_website_content.py`
**Purpose:** Generate website content using Gemini 3 Pro API, following Tone of Voice guide.

**Usage:**
```bash
python3 scripts/generate_website_content.py \
  --content-type "landing-page-cta" \
  --context "new-visitor" \
  --page "snooze-main-landing" \
  --output-file "kajabi-deployment/cta-new-visitor.html"
```

**Content Types:**
- `landing-page-cta` - Call-to-action buttons
- `navigation-label` - Navigation menu items
- `value-proposition` - Product comparison content
- `library-teaser` - Library preview content
- `headline` - Page headlines

**Contexts:**
- `new-visitor` - Not logged in
- `logged-in-non-member` - Has account, no Snooze membership
- `snooze-member` - Active Snooze membership

**Requirements:**
- `GEMINI_API_KEY` in root `.env`
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` for knowledge base queries
- Tone of Voice guide: `docs/strategy/SNOOZE-TONE-OF-VOICE.md`

---

## Data Collection

### `scrape_missing_pages.py`
**Purpose:** Scrape missing pages from website and store in Supabase.

**Usage:**
```bash
python3 scripts/scrape_missing_pages.py
```

**Requirements:**
- `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- List of missing URLs (from sitemap verification)

---

## Data Analysis

### `analyze-scraped-data.js`
**Purpose:** Analyze scraped page data for patterns and insights.

**Usage:**
```bash
node scripts/analyze-scraped-data.js
```

**Requirements:**
- Node.js environment
- Supabase client configured

---

## Script Development Guidelines

### Python Scripts
- Use `python-dotenv` for environment variables
- Load from root `.env` file
- Include proper error handling
- Add logging for debugging

### JavaScript Scripts
- Use ES6+ syntax
- Include error handling
- Document dependencies

### Best Practices
- Always check for required environment variables
- Provide clear error messages
- Include usage examples in docstrings
- Test scripts before committing

---

## Environment Setup

All scripts require environment variables in root `.env`:

```bash
GEMINI_API_KEY=your_key_here
SUPABASE_URL=your_url_here
SUPABASE_ANON_KEY=your_key_here
```

---

**Last Updated:** December 2025

