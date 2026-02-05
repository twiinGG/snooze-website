#!/usr/bin/env python3
"""
Generate Complete Age Page HTML with Gemini 3 Pro API
Creates a single HTML file with all sections for an age-specific page

Usage:
    python3 scripts/generate_complete_age_page.py \
      --age "newborn" \
      --output-file "kajabi-deployment/age-pages/newborn-page-complete.html"

Author: Snooze Website Development
Date: January 2025
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


def load_file_content(file_path: Path) -> str:
    """Load file content"""
    if not file_path.exists():
        logger.warning(f"⚠️  File not found: {file_path}")
        return ""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()


def load_tone_of_voice_guide() -> str:
    """Load the Tone of Voice guide"""
    tov_path = Path(__file__).parent.parent.parent.parent / 'docs' / 'strategy' / 'SNOOZE-TONE-OF-VOICE.md'
    if not tov_path.exists():
        logger.error(f"❌ Tone of Voice guide not found at {tov_path}")
        sys.exit(1)
    
    with open(tov_path, 'r', encoding='utf-8') as f:
        return f.read()


def load_component_templates() -> Dict[str, str]:
    """Load all component templates"""
    base_path = Path(__file__).parent.parent / 'kajabi-deployment'
    
    templates = {
        'navigation': load_file_content(base_path / 'navigation-code-block.html'),
        'footer': load_file_content(base_path / 'footer.html'),
        'context_aware_cta': load_file_content(base_path / 'components' / 'context-aware-cta.html'),
        'whats_in_snooze': load_file_content(base_path / 'components' / 'whats-in-snooze.html'),
        'value_comparison': load_file_content(base_path / 'components' / 'value-comparison.html'),
        'age_cross_linking': load_file_content(base_path / 'components' / 'age-cross-linking.html'),
    }
    
    return templates


def load_age_specific_content(age: str) -> Dict[str, str]:
    """Load age-specific content (hero and understanding sections)"""
    base_path = Path(__file__).parent.parent / 'kajabi-deployment'
    
    content = {
        'hero': load_file_content(base_path / 'components' / 'hero-sections' / f'hero-{age}.html'),
        # Understanding sections are now integrated into complete pages
        # 'understanding': load_file_content(base_path / 'age-pages' / f'understanding-section-{age}.html'),  # DELETED - integrated into complete pages
        'understanding': '',  # Understanding sections are integrated into complete pages
    }
    
    return content


def get_pricing_info(age: str) -> Dict[str, Any]:
    """Get pricing information for age-specific page"""
    pricing = {
        'newborn': {
            'product_type': 'Guide',
            'product_price': '$67',
            'membership_price': '$147',
            'price_difference': '$80',
            'message': 'For just $80 more than a single guide, you get everything for 3 months'
        },
        '3-4-month': {
            'product_type': 'Course',
            'product_price': '$117',
            'membership_price': '$147',
            'price_difference': '$30',
            'message': 'For just $30 more than a single course, you get everything'
        },
        '5-12-month': {
            'product_type': 'Guide',
            'product_price': '$67',
            'membership_price': '$147',
            'price_difference': '$80',
            'message': 'For just $80 more than a single guide, you get everything for 3 months'
        },
        'toddler': {
            'product_type': 'Course',
            'product_price': '$117',
            'membership_price': '$147',
            'price_difference': '$30',
            'message': 'For just $30 more than a single course, you get everything'
        }
    }
    
    return pricing.get(age, pricing['newborn'])


def generate_complete_page_prompt(
    age: str,
    templates: Dict[str, str],
    age_content: Dict[str, str],
    pricing_info: Dict[str, Any],
    tone_of_voice_guide: str
) -> str:
    """Generate prompt for Gemini 3 Pro to create complete page"""
    
    # Extract relevant Tone of Voice sections
    tov_sections = extract_relevant_tov_sections(tone_of_voice_guide)
    
    prompt = f"""You are creating a complete HTML page for the Snooze website age-specific page.

AGE: {age}
PRODUCT TYPE: {pricing_info['product_type']}
PRODUCT PRICE: {pricing_info['product_price']}
MEMBERSHIP PRICE: {pricing_info['membership_price']}/quarter
PRICE DIFFERENCE: {pricing_info['price_difference']}
PRICE MESSAGE: {pricing_info['message']}

TONE OF VOICE REQUIREMENTS:
{tov_sections}

COMPONENT TEMPLATES PROVIDED:
- Navigation (already complete)
- Hero Section (already complete for this age)
- Understanding Section (already complete for this age)
- Context-Aware CTA (already complete)
- What's in Snooze (needs customization for this age)
- Value Comparison (needs pricing customization)
- Age Cross-Linking (needs current age highlighting)
- Footer (already complete)

TASK:
Create a complete single HTML file that combines all sections in this order:

1. SECTION 0: Navigation (use provided template)
2. SECTION 1: Hero Section (use provided template for this age)
3. SECTION 2: Understanding Section (use provided template for this age)
4. SECTION 3: Context-Aware CTA (use provided template)
5. SECTION 4: "What's in Snooze" Section (customize intro text for this age - e.g., "This Newborn Sleep Guide is included in Snooze membership...")
6. SECTION 5: Value Comparison Section (customize pricing: product price = {pricing_info['product_price']}, membership = {pricing_info['membership_price']}/quarter, message = "{pricing_info['message']}")
7. SECTION 6: Age Cross-Linking Section (highlight current age: {age})
8. SECTION 7: Footer (use provided template)

REQUIREMENTS:
- Structure like kajabi-html-blocks.html with clear section markers
- Each section should be clearly marked with comments
- NO inline styles - all styling comes from snooze-unified-theme.css (already deployed to Kajabi Theme Custom CSS)
- Use Font Awesome icons where needed (include CDN link)
- Follow Tone of Voice guide exactly
- Customize "What's in Snooze" intro text for this specific age
- Customize value comparison pricing for this age
- Mark current age in cross-linking section
- All sections should be ready to copy/paste into Kajabi Code Blocks
- Use ONLY CSS classes from snooze-unified-theme.css:
  * Navigation: .snooze-nav-clean, .sn-container, .sn-logo, .sn-desktop-menu, .sn-links, .sn-link, .sn-actions, .sn-btn-primary
  * Hero: .snooze-hero-age-specific, .sh-container, .sh-layout, .sh-content, .sh-image, .sh-headline, .sh-subheadline, .sh-supporting-points, .sh-point, .sh-trust-signal, .sh-trust-text
  * Footer: .snooze-footer-clean, .sf-container, .sf-grid, etc.
  * Components: Use existing component HTML as-is (they already use correct classes)

OUTPUT FORMAT:
- Complete HTML file with all sections
- Clear section markers with comments
- NO <style> tags - rely on snooze-unified-theme.css
- JavaScript inline within <script> tags (only for functionality, not styling)
- Font Awesome CDN link included
- Ready for deployment

Generate the complete HTML file now:"""

    return prompt


def extract_relevant_tov_sections(tov_guide: str) -> str:
    """Extract relevant sections from Tone of Voice guide"""
    sections = []
    
    # Always include core principles
    if "## Core Voice Principles" in tov_guide:
        start = tov_guide.find("## Core Voice Principles")
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


def generate_complete_page(
    age: str,
    output_file: str
) -> str:
    """Generate complete age page using Gemini 3 Pro"""
    
    logger.info(f"🚀 Generating complete {age} page")
    
    # Load Tone of Voice guide
    logger.info("📖 Loading Tone of Voice guide...")
    tov_guide = load_tone_of_voice_guide()
    
    # Load component templates
    logger.info("📦 Loading component templates...")
    templates = load_component_templates()
    
    # Load age-specific content
    logger.info(f"📄 Loading {age} specific content...")
    age_content = load_age_specific_content(age)
    
    # Get pricing info
    pricing_info = get_pricing_info(age)
    
    # Generate prompt
    prompt = generate_complete_page_prompt(age, templates, age_content, pricing_info, tov_guide)
    
    # Generate content with Gemini
    logger.info("✨ Generating complete page with Gemini 3 Pro...")
    try:
        # Include templates in the generation context
        system_instruction = f"""You are creating a complete HTML page. Use these component templates as reference:

NAVIGATION TEMPLATE:
{templates['navigation'][:500]}...

HERO TEMPLATE:
{age_content['hero']}

UNDERSTANDING TEMPLATE:
{age_content['understanding'][:1000]}...

CONTEXT-AWARE CTA TEMPLATE:
{templates['context_aware_cta'][:500]}...

WHAT'S IN SNOOZE TEMPLATE:
{templates['whats_in_snooze'][:500]}...

VALUE COMPARISON TEMPLATE:
{templates['value_comparison'][:500]}...

AGE CROSS-LINKING TEMPLATE:
{templates['age_cross_linking'][:500]}...

FOOTER TEMPLATE:
{templates['footer']}

Combine all these into a single complete HTML file with clear section markers."""
        
        # Add explicit instruction to NOT include styles
        no_styles_instruction = """
CRITICAL: DO NOT include any <style> tags or inline CSS in the output.
All styling is handled by snooze-unified-theme.css which is already deployed to Kajabi Theme Custom CSS.
Only output HTML structure with the correct CSS classes.
"""
        
        response = gemini_model.generate_content(
            system_instruction + "\n\n" + no_styles_instruction + "\n\n" + prompt,
            generation_config={
                "temperature": 0.7,
                "top_p": 0.95,
                "top_k": 40,
                "max_output_tokens": 16000,
            }
        )
        
        generated_content = response.text.strip()
        
        logger.info("✅ Page generated successfully")
        
        # Save to file
        output_path = Path(__file__).parent.parent / output_file
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(generated_content)
        
        logger.info(f"💾 Complete page saved to {output_path}")
        
        return generated_content
        
    except Exception as e:
        logger.error(f"❌ Error generating page: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description='Generate complete age page with Gemini 3 Pro')
    parser.add_argument('--age', required=True, choices=['newborn', '3-4-month', '5-12-month', 'toddler'],
                        help='Age stage (newborn, 3-4-month, 5-12-month, toddler)')
    parser.add_argument('--output-file', required=True, help='Output file path')
    
    args = parser.parse_args()
    
    generate_complete_page(
        age=args.age,
        output_file=args.output_file
    )


if __name__ == '__main__':
    main()

