#!/usr/bin/env python3
"""
Generate Pricing Content with Gemini 3 Pro API
Creates pricing messaging that follows Tone of Voice and integrates pricing strategy

Usage:
    python3 scripts/generate_pricing_content.py \
      --content-type "price-anchoring-messaging" \
      --output-file "kajabi-deployment/pricing-content.html"

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

# Initialize Gemini model with intelligent fallback chain for Gemini 3.0
gemini_model = None
gemini_3_models = [
    "gemini-3-pro-preview",      # Latest Gemini 3.0 model
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


def load_pricing_strategy() -> str:
    """Load the pricing strategy document"""
    pricing_path = Path(__file__).parent.parent.parent.parent / 'docs' / 'strategy' / 'SNOOZE-PRICING-STRATEGY.md'
    if not pricing_path.exists():
        logger.error(f"❌ Pricing strategy not found at {pricing_path}")
        sys.exit(1)
    
    with open(pricing_path, 'r', encoding='utf-8') as f:
        return f.read()


def query_knowledge_base_for_pricing(limit: int = 15) -> List[Dict[str, Any]]:
    """Query Supabase knowledge base for value proposition examples"""
    try:
        # Query for value-focused content
        response = supabase.table('tiktok_videos').select(
            'text, transcript, value_proposition, performance_score'
        ).not_.is_('transcript', 'null').not_.eq('transcript', '').not_.is_('performance_score', 'null').order(
            'performance_score', desc=True
        ).limit(limit).execute()
        
        if response.data:
            logger.info(f"✅ Found {len(response.data)} knowledge base examples")
            return response.data
        else:
            logger.warning("⚠️  No knowledge base examples found")
            return []
    except Exception as e:
        logger.error(f"❌ Error querying knowledge base: {e}")
        return []


def generate_pricing_prompt(
    content_type: str,
    tone_of_voice_guide: str,
    pricing_strategy: str,
    kb_examples: List[Dict[str, Any]]
) -> str:
    """Generate prompt for Gemini 3 Pro"""
    
    # Extract relevant examples
    example_texts = []
    for example in kb_examples[:10]:
        if 'transcript' in example and example['transcript']:
            example_texts.append(f"- {example['transcript'][:300]}...")
    
    examples_section = "\n".join(example_texts) if example_texts else "No examples available"
    
    # Get relevant Tone of Voice sections
    tov_sections = extract_relevant_tov_sections(tone_of_voice_guide, content_type)
    
    prompt = f"""You are generating pricing content for the Snooze website, following Sally's authentic voice and the pricing strategy.

CONTEXT:
- Content Type: {content_type}
- Purpose: Integrate pricing strategy into landing page with price anchoring messaging

PRICING STRATEGY (SOURCE OF TRUTH):
{pricing_strategy[:4000]}  # Truncated for token management

KEY PRICING POINTS:
- Mini Modules: $27 (Launch) / $37 (BAU)
- Age-Based Courses: $117 (Launch) / $129 (BAU)
- The Snooze Method: $117 (Launch) / $129 (BAU)
- Membership: $147/quarter (Launch) / $197/quarter (BAU)
- 1:1 Consult: $445 (Launch member) / $525 (BAU member) / $650 (non-member)

PRICE ANCHORING STRATEGY:
- Individual courses = price anchors to make membership feel like "no-brainer"
- Launch: "For just $30 more than a single course, you get full access to EVERYTHING"
- BAU: "Not ready to commit? Get access to this course (and all others) right now for just $79/month"

TONE OF VOICE REQUIREMENTS:
{tov_sections}

KNOWLEDGE BASE EXAMPLES:
{examples_section}

TASK:
Generate {content_type} content that:
1. Follows Sally's voice principles exactly
2. Uses authentic language patterns from examples
3. Maintains premium, professional tone
4. Implements price anchoring strategy effectively
5. Avoids AI-generated patterns:
   - NO em dashes "—" (use commas, periods, parentheses)
   - NO contrast statements ("It's not about x, it's about y")
   - NO "solution/solutions" (use "support", "guidance", "help", "troubleshooting", "strategies")
6. Uses "I would" / "I like to" (not "you should")
7. Includes "You can" / "You don't have to" (permission-giving)
8. Uses "Usually" / "Often" (not "always" / "never")
9. Creates "no-brainer" effect through price comparison
10. Preserves premium service value perception

OUTPUT FORMAT:
- For price anchoring: 2-3 sentences showing value comparison
- For value table: Clear comparison rows with pricing
- For consultation pricing: Premium language, member benefit framing
- For course pricing: Individual prices with membership comparison

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
    
    # Include value proposition sections
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


def generate_pricing_content(
    content_type: str,
    output_file: Optional[str] = None
) -> str:
    """Generate pricing content using Gemini 3 Pro"""
    
    logger.info(f"🚀 Generating {content_type} content")
    
    # Load Tone of Voice guide
    logger.info("📖 Loading Tone of Voice guide...")
    tov_guide = load_tone_of_voice_guide()
    
    # Load pricing strategy
    logger.info("💰 Loading pricing strategy...")
    pricing_strategy = load_pricing_strategy()
    
    # Query knowledge base
    logger.info("🔍 Querying knowledge base for examples...")
    kb_examples = query_knowledge_base_for_pricing()
    
    # Generate prompt
    prompt = generate_pricing_prompt(content_type, tov_guide, pricing_strategy, kb_examples)
    
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
<!-- Date: {Path(__file__).parent.parent.parent.parent / '.env'} -->
<div class="snooze-pricing-content">
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
    parser = argparse.ArgumentParser(description='Generate pricing content with Gemini 3 Pro')
    parser.add_argument('--content-type', required=True, help='Type of pricing content to generate')
    parser.add_argument('--output-file', help='Output file path (optional)')
    
    args = parser.parse_args()
    
    generate_pricing_content(
        content_type=args.content_type,
        output_file=args.output_file
    )


if __name__ == '__main__':
    main()

