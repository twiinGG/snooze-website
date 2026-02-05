#!/usr/bin/env python3
"""
Merge Landing Page CSS into Global CSS using Gemini 3 Pro
Intelligently combines the archived landing page CSS with the global unified theme CSS,
avoiding duplicates, resolving conflicts, and maintaining proper organization.

Usage:
    python3 scripts/merge_landing_page_css.py

Author: Snooze Website Development
Date: December 2025
"""

import os
import sys
import logging
from pathlib import Path
from typing import Dict, Any
from dotenv import load_dotenv
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

# Gemini configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if not GEMINI_API_KEY:
    logger.error("❌ Error: GEMINI_API_KEY not found in environment")
    sys.exit(1)

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

genai.configure(api_key=GEMINI_API_KEY)

for model_name in all_models_to_try:
    try:
        gemini_model = genai.GenerativeModel(model_name)
        logger.info(f"✅ Using Gemini model: {model_name}")
        break
    except Exception as e:
        logger.warning(f"⚠️  Model {model_name} not available: {e}")
        continue

if not gemini_model:
    logger.error("❌ No Gemini model available")
    sys.exit(1)

# File paths
PROJECT_ROOT = Path(__file__).parent.parent
GLOBAL_CSS = PROJECT_ROOT / "kajabi-deployment" / "global" / "css" / "snooze-unified-theme.css"
LANDING_PAGE_CSS = PROJECT_ROOT / "kajabi-deployment" / "archive" / "landing-page-migration" / "kajabi-custom-css.css"
BACKUP_CSS = PROJECT_ROOT / "kajabi-deployment" / "global" / "css" / "snooze-unified-theme.css.backup"

def load_css_file(file_path: Path) -> str:
    """Load CSS file content"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        logger.error(f"❌ Error loading {file_path}: {e}")
        sys.exit(1)

def backup_global_css():
    """Create backup of current global CSS"""
    try:
        import shutil
        shutil.copy2(GLOBAL_CSS, BACKUP_CSS)
        logger.info(f"✅ Backup created: {BACKUP_CSS}")
    except Exception as e:
        logger.error(f"❌ Error creating backup: {e}")
        sys.exit(1)

def merge_css_with_gemini(global_css: str, landing_page_css: str) -> str:
    """Use Gemini 3 Pro to intelligently merge CSS files"""
    
    logger.info("🔍 Analyzing CSS files with Gemini 3 Pro...")
    
    # Load full files for comprehensive merge
    logger.info("📊 File sizes: Global={} chars, Landing={} chars".format(len(global_css), len(landing_page_css)))
    
    # For very large files, we'll need to process in chunks or use a different strategy
    # Gemini 3 Pro can handle large contexts, but we'll send full files
    prompt = f"""You are a CSS expert tasked with merging two CSS files into a single, well-organized unified theme file.

CRITICAL: You must preserve ALL styles from both files. Do NOT remove or condense styles. Only merge duplicates and organize.

CURRENT GLOBAL CSS (snooze-unified-theme.css):
This is the active global theme CSS file that applies to all website pages. It contains:
- Global design system variables (:root)
- Navigation and footer styles
- Hero sections
- Library page styles
- Global reset and base styles

FULL GLOBAL CSS:
{global_css}

LANDING PAGE CSS (kajabi-custom-css.css):
This is the archived landing page CSS that needs to be merged. It contains:
- Landing page specific styles (hero, sections, components)
- Design tokens (some may overlap with global)
- Landing page component styles (transformation reviews, inside snooze, age stages, etc.)
- Sticky CTA bar styles
- FAQ, pricing, testimonial carousel styles
- Price anchoring section
- Library preview section
- Who it's for section

FULL LANDING PAGE CSS:
{landing_page_css}

MERGE REQUIREMENTS:

1. **Design Tokens (:root variables)**:
   - Consolidate all :root variables into a single, organized :root block
   - Remove duplicates (keep the most complete/accurate version)
   - Maintain both naming conventions if needed (--sn-* and --color-*)
   - Organize by category: colors, typography, spacing, shadows, transitions, etc.

2. **Base Styles**:
   - Merge reset styles, base typography, and global element styles
   - Remove duplicates
   - Keep the most comprehensive version

3. **Component Styles**:
   - Add all landing page component styles that aren't already in global CSS
   - Organize by section: hero, transformation reviews, inside snooze, age stages, value comparison, trust/founder, testimonial carousel, pricing, FAQ, footer, sticky CTA
   - Maintain proper CSS organization with clear section comments

4. **Avoid Duplicates**:
   - Identify and remove duplicate selectors
   - If same selector exists in both, keep the more specific/comprehensive version
   - Merge related styles intelligently

5. **Maintain Organization**:
   - Keep clear section comments
   - Group related styles together
   - Maintain logical flow: variables → base → components → utilities → media queries

6. **Media Queries**:
   - Consolidate media queries at the end of each section or in dedicated responsive sections
   - Remove duplicate breakpoint definitions

7. **Important Notes**:
   - Keep all existing global CSS functionality intact
   - Add landing page styles that are missing
   - Maintain CSS specificity and cascade order
   - Preserve all existing comments and documentation
   - Keep the file header from global CSS

OUTPUT REQUIREMENTS:
1. **PRESERVE ALL STYLES**: Include every style rule from both files. Do NOT remove or condense.
2. **File Header**: Updated header indicating merged version (Version 3.0)
3. **Organization**: 
   - All :root variables consolidated at the top (remove duplicates, keep both naming conventions)
   - All base/reset styles
   - All component styles organized by section with clear comments
   - All media queries properly placed within their sections
4. **Duplicate Handling**:
   - If same selector exists in both files, keep the more comprehensive version
   - Merge related selectors intelligently
   - Preserve all unique styles from both files
5. **Section Comments**: Maintain clear section dividers like:
   /* ============================================
      SECTION NAME
      ============================================ */

CRITICAL: The output must be complete and functional. Include ALL styles from both files. The file should be comprehensive, not condensed.

Return ONLY the CSS code, no markdown formatting, no code blocks. Start directly with the CSS comment header."""

    try:
        logger.info("🤖 Sending to Gemini 3 Pro for intelligent merging...")
        response = gemini_model.generate_content(prompt)
        merged_css = response.text.strip()
        
        # Clean up any markdown code blocks if Gemini added them
        if merged_css.startswith("```"):
            # Remove markdown code block markers
            lines = merged_css.split('\n')
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines[-1].strip() == "```":
                lines = lines[:-1]
            merged_css = '\n'.join(lines)
        
        logger.info("✅ CSS merged successfully by Gemini 3 Pro")
        return merged_css
        
    except Exception as e:
        logger.error(f"❌ Error with Gemini API: {e}")
        sys.exit(1)

def save_merged_css(merged_css: str):
    """Save merged CSS to global file"""
    try:
        with open(GLOBAL_CSS, 'w', encoding='utf-8') as f:
            f.write(merged_css)
        logger.info(f"✅ Merged CSS saved to {GLOBAL_CSS}")
    except Exception as e:
        logger.error(f"❌ Error saving merged CSS: {e}")
        sys.exit(1)

def main():
    """Main execution"""
    logger.info("🚀 Starting CSS merge process...")
    
    # Check files exist
    if not GLOBAL_CSS.exists():
        logger.error(f"❌ Global CSS not found: {GLOBAL_CSS}")
        sys.exit(1)
    
    if not LANDING_PAGE_CSS.exists():
        logger.error(f"❌ Landing page CSS not found: {LANDING_PAGE_CSS}")
        sys.exit(1)
    
    # Load CSS files
    logger.info("📖 Loading CSS files...")
    global_css = load_css_file(GLOBAL_CSS)
    landing_page_css = load_css_file(LANDING_PAGE_CSS)
    
    logger.info(f"   Global CSS: {len(global_css)} characters")
    logger.info(f"   Landing Page CSS: {len(landing_page_css)} characters")
    
    # Create backup
    backup_global_css()
    
    # Merge with Gemini
    merged_css = merge_css_with_gemini(global_css, landing_page_css)
    
    # Save merged CSS
    save_merged_css(merged_css)
    
    logger.info(f"✅ Merge complete! New file size: {len(merged_css)} characters")
    logger.info(f"📦 Backup saved at: {BACKUP_CSS}")
    logger.info("💡 Review the merged CSS and test before deploying to Kajabi")

if __name__ == "__main__":
    main()

