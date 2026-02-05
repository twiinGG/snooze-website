#!/usr/bin/env python3
"""
Generate Website Content with Gemini 3 Pro API
Follows Tone of Voice guide and uses knowledge base examples

Usage:
    python3 scripts/generate_website_content.py \
      --content-type "landing-page-cta" \
      --context "new-visitor" \
      --output-file "kajabi-deployment/cta-new-visitor.html"

Author: Snooze Website Development
Date: December 2025
"""

import os
import sys
import json
import argparse
import logging
from pathlib import Path
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv
from supabase import create_client, Client as SupabaseClient
import google.generativeai as genai

# Load environment variables from root .env file
root_env_path = Path(__file__).parent.parent.parent.parent / '.env'
if root_env_path.exists():
    load_dotenv(root_env_path)
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL') or 'https://qwwwosoafcsupebpangw.supabase.co'
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY') or os.getenv('SUPABASE_KEY')

# Gemini configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if not SUPABASE_KEY:
    logger.error("❌ Error: SUPABASE_ANON_KEY or SUPABASE_KEY not found in environment")
    sys.exit(1)

if not GEMINI_API_KEY:
    logger.error("❌ Error: GEMINI_API_KEY not found in environment")
    sys.exit(1)

# Initialize clients
supabase: SupabaseClient = create_client(SUPABASE_URL, SUPABASE_KEY)
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Gemini model with intelligent fallback chain
gemini_model = None
gemini_3_models = [
    "gemini-3-pro-preview",
    "gemini-3.0-pro-exp",
    "gemini-3.0-pro",
    "gemini-3.0-flash-exp",
    "gemini-3.0-flash"
]
fallback_models = [
    "gemini-2.5-pro",
    "gemini-2.5-flash"
]

all_models_to_try = gemini_3_models + fallback_models

for model_name in all_models_to_try:
    try:
        test_model = genai.GenerativeModel(model_name)
        test_model.generate_content("test")
        gemini_model = test_model
        logger.info(f"✅ Using Gemini model: {model_name}")
        break
    except Exception as e:
        logger.debug(f"Model {model_name} not available: {e}")
        continue

if not gemini_model:
    logger.error("❌ Error: No Gemini model available")
    sys.exit(1)


def load_tone_of_voice_guide() -> str:
    """Load the Tone of Voice guide"""
    tov_path = Path(__file__).parent.parent.parent.parent / 'docs' / 'strategy' / 'SNOOZE-TONE-OF-VOICE.md'
    if not tov_path.exists():
        logger.error(f"❌ Tone of Voice guide not found at {tov_path}")
        sys.exit(1)
    
    with open(tov_path, 'r', encoding='utf-8') as f:
        return f.read()


def query_knowledge_base(content_type: str, context: str, limit: int = 20) -> List[Dict[str, Any]]:
    """Query Supabase knowledge base for relevant examples"""
    try:
        # Query based on content type and context
        query = supabase.table('qa_pairs').select('*')
        
        # Filter by platform/content type
        if content_type == 'landing-page-cta':
            query = query.eq('platform', 'tiktok').limit(limit)
        elif content_type == 'navigation-label':
            query = query.eq('platform', 'instagram').limit(limit)
        elif content_type == 'value-proposition':
            query = query.eq('platform', 'tiktok').limit(limit)
        else:
            query = query.limit(limit)
        
        response = query.execute()
        
        if response.data:
            logger.info(f"✅ Found {len(response.data)} knowledge base examples")
            return response.data
        else:
            logger.warning("⚠️  No knowledge base examples found")
            return []
    except Exception as e:
        logger.error(f"❌ Error querying knowledge base: {e}")
        return []


def generate_content_prompt(
    content_type: str,
    context: str,
    page: Optional[str],
    tone_of_voice_guide: str,
    kb_examples: List[Dict[str, Any]]
) -> str:
    """Generate prompt for Gemini 3 Pro"""
    
    # Extract relevant examples
    example_texts = []
    for example in kb_examples[:10]:  # Use top 10 examples
        if 'sally_response' in example:
            example_texts.append(f"- {example['sally_response'][:200]}...")
    
    examples_section = "\n".join(example_texts) if example_texts else "No examples available"
    
    # Get relevant Tone of Voice sections
    tov_sections = extract_relevant_tov_sections(tone_of_voice_guide, content_type)
    
    prompt = f"""You are generating content for the Snooze website, following Sally's authentic voice.

CONTEXT:
- Content Type: {content_type}
- User Context: {context}
- Page: {page or 'N/A'}

TONE OF VOICE REQUIREMENTS:
{tov_sections}

KNOWLEDGE BASE EXAMPLES:
{examples_section}

TASK:
Generate {content_type} content that:
1. Follows Sally's voice principles exactly
2. Uses authentic language patterns from examples
3. Maintains premium, professional tone
4. Is specific and actionable
5. Avoids AI-generated patterns:
   - NO em dashes "—" (use commas, periods, parentheses)
   - NO contrast statements ("It's not about x, it's about y")
   - NO "solution/solutions" (use "support", "guidance", "help", "troubleshooting", "strategies")
6. Uses "I would" / "I like to" (not "you should")
7. Includes "You can" / "You don't have to" (permission-giving)
8. Uses "Usually" / "Often" (not "always" / "never")

OUTPUT FORMAT:
- For CTAs: 1-2 sentences, clear action
- For Navigation: 1-3 words, clear label
- For Headlines: 5-10 words, problem → solution
- For Value Props: 2-3 sentences, what → why → how
- For Teaser Content: 1-2 paragraphs, preview → value → access

Generate the content now:"""

    return prompt


def extract_relevant_tov_sections(tov_guide: str, content_type: str) -> str:
    """Extract relevant sections from Tone of Voice guide"""
    sections = []
    
    # Always include core principles
    if "## Core Voice Principles" in tov_guide:
        start = tov_guide.find("## Core Voice Principles")
        end = tov_guide.find("##", start + 1)
        if end == -1:
            end = len(tov_guide)
        sections.append(tov_guide[start:end])
    
    # Include relevant style sections
    if content_type in ['landing-page-cta', 'value-proposition']:
        if "## Writing Style Characteristics" in tov_guide:
            start = tov_guide.find("## Writing Style Characteristics")
            end = tov_guide.find("##", start + 1)
            if end == -1:
                end = len(tov_guide)
            sections.append(tov_guide[start:end])
    
    # Include Do's and Don'ts
    if "## Do's and Don'ts" in tov_guide:
        start = tov_guide.find("## Do's and Don'ts")
        end = tov_guide.find("##", start + 1)
        if end == -1:
            end = len(tov_guide)
        sections.append(tov_guide[start:end])
    
    return "\n\n".join(sections)


def generate_content(
    content_type: str,
    context: str,
    page: Optional[str] = None,
    output_file: Optional[str] = None
) -> str:
    """Generate content using Gemini 3 Pro"""
    
    logger.info(f"🚀 Generating {content_type} content for {context}")
    
    # Load Tone of Voice guide
    logger.info("📖 Loading Tone of Voice guide...")
    tov_guide = load_tone_of_voice_guide()
    
    # Query knowledge base
    logger.info("🔍 Querying knowledge base for examples...")
    kb_examples = query_knowledge_base(content_type, context)
    
    # Generate prompt
    prompt = generate_content_prompt(content_type, context, page, tov_guide, kb_examples)
    
    # Generate content with Gemini
    logger.info("✨ Generating content with Gemini 3 Pro...")
    try:
        response = gemini_model.generate_content(prompt)
        generated_content = response.text.strip()
        
        logger.info("✅ Content generated successfully")
        logger.info(f"\n📝 Generated Content:\n{generated_content}\n")
        
        # Save to file if specified
        if output_file:
            output_path = Path(__file__).parent.parent / output_file
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Wrap in HTML if needed
            if output_file.endswith('.html'):
                html_content = f"""<!-- Generated with Gemini 3 Pro API -->
<!-- Content Type: {content_type} -->
<!-- Context: {context} -->
<div class="snooze-content">
{generated_content}
</div>"""
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(html_content)
            else:
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(generated_content)
            
            logger.info(f"💾 Content saved to {output_path}")
        
        return generated_content
        
    except Exception as e:
        logger.error(f"❌ Error generating content: {e}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description='Generate website content with Gemini 3 Pro')
    parser.add_argument('--content-type', required=True, help='Type of content to generate')
    parser.add_argument('--context', required=True, help='User context (new-visitor, logged-in-non-member, snooze-member)')
    parser.add_argument('--page', help='Page name (optional)')
    parser.add_argument('--output-file', help='Output file path (optional)')
    
    args = parser.parse_args()
    
    generate_content(
        content_type=args.content_type,
        context=args.context,
        page=args.page,
        output_file=args.output_file
    )


if __name__ == '__main__':
    main()

