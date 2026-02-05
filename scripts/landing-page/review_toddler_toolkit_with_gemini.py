#!/usr/bin/env python3
"""
Toddler Toolkit Tone of Voice Review with Gemini 3
Comprehensive tone consistency review of HTML lesson files

This script:
1. Loads sample dataset from HTML files and knowledge base
2. Loads Tone of Voice Guide as reference
3. Uses Gemini 3 to review HTML samples for:
   - Voice consistency with Sally's authentic voice
   - AI-generated patterns to remove (em dashes, contrast statements)
   - Alignment with core voice principles
   - Missing patterns from knowledge base
   - Schedule accuracy verification
4. Generates comprehensive review report with specific recommendations

Author: Landing Page Project
Date: January 2025
"""

import os
import sys
import json
import time
import logging
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

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
    logger.info("💡 Note: This script can still create the review structure, but Gemini analysis requires API key")
    logger.info("   Set GEMINI_API_KEY in .env file to enable full analysis")
    # Continue anyway - we'll create the structure

# Initialize Gemini model if API key available
GEMINI_MODEL = None
gemini_model = None

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    
    # Try Gemini 3.0 models in order of preference
    gemini_3_models = [
        "gemini-3-pro-preview",
        "gemini-3.0-flash-exp",
        "gemini-3.0-flash",
        "gemini-3.0-pro-exp",
        "gemini-3.0-pro"
    ]
    
    # Fallback to proven stable models
    fallback_models = [
        "gemini-2.5-pro",
        "gemini-2.5-flash"
    ]
    
    all_models_to_try = gemini_3_models + fallback_models
    
    for model_name in all_models_to_try:
        try:
            test_model = genai.GenerativeModel(model_name)
            # Test with a simple prompt
            test_model.generate_content("test")
            GEMINI_MODEL = model_name
            gemini_model = test_model
            break
        except Exception as e:
            logger.debug(f"Model {model_name} not available: {e}")
            continue
    
    if gemini_model:
        logger.info(f"✅ Initialized Gemini model: {GEMINI_MODEL}")
    else:
        logger.warning("⚠️  Could not initialize Gemini model - will create structure only")


# Get project paths (script is in projects/snooze-website/scripts/landing-page/)
PROJECT_ROOT = Path(__file__).parent.parent.parent.parent
SAMPLE_DATASET_PATH = PROJECT_ROOT / "projects/snooze-website/docs/landing-page/toddler_toolkit_tone_review_samples.json"
TONE_GUIDE_PATH = PROJECT_ROOT / "docs/strategy/SNOOZE-TONE-OF-VOICE.md"
OUTPUT_DIR = PROJECT_ROOT / "projects/snooze-website/docs/landing-page"


def load_sample_dataset() -> Dict[str, Any]:
    """Load the tone review sample dataset"""
    if not SAMPLE_DATASET_PATH.exists():
        logger.error(f"❌ Sample dataset not found at {SAMPLE_DATASET_PATH}")
        logger.info("💡 Run create_tone_review_samples.py first to create the dataset")
        return {}
    
    with open(SAMPLE_DATASET_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def load_tone_of_voice_guide() -> str:
    """Load the Tone of Voice Guide as reference"""
    if not TONE_GUIDE_PATH.exists():
        logger.error(f"❌ Tone of Voice Guide not found at {TONE_GUIDE_PATH}")
        return ""
    
    with open(TONE_GUIDE_PATH, 'r', encoding='utf-8') as f:
        return f.read()


def review_html_samples_with_gemini(samples: Dict[str, Any], tone_guide: str) -> Dict[str, Any]:
    """Use Gemini 3 to review HTML samples for tone consistency"""
    
    if not gemini_model:
        logger.warning("⚠️  Gemini model not available - creating review structure only")
        return create_review_structure(samples)
    
    logger.info("🔍 Performing tone of voice review with Gemini 3...")
    
    # Prepare HTML samples for analysis
    html_samples_text = ""
    for i, sample in enumerate(samples.get("html_samples", [])[:6], 1):  # Limit to 6 samples
        html_samples_text += f"\n\n--- SAMPLE {i}: {sample.get('file', 'Unknown')} (Module {sample.get('module', '?')}) ---\n"
        html_samples_text += sample.get('content', '')[:3000]  # Limit length per sample
    
    # Prepare knowledge base context
    kb_context = f"""
Knowledge Base References:
- TikTok Examples: {len(samples.get('knowledge_base_samples', {}).get('tiktok_examples', []))}
- Q&A Examples: {len(samples.get('knowledge_base_samples', {}).get('qa_examples', []))}
- Podcast Episodes: {len(samples.get('knowledge_base_samples', {}).get('podcast_episodes', []))}
"""
    
    prompt = f"""You are reviewing HTML lesson content from the Toddler Sleep Toolkit course for tone of voice consistency with Sally's authentic voice.

TONE OF VOICE GUIDE (Reference Document):
{tone_guide[:10000]}  # Truncated for token management

HTML LESSON SAMPLES (Content to Review):
{html_samples_text[:15000]}  # Truncated

KNOWLEDGE BASE CONTEXT:
{kb_context}

REVIEW TASK:
Review the HTML lesson samples for consistency with Sally's authentic tone of voice. Check for:

1. **VOICE CONSISTENCY**: Does the content match Sally's authentic voice as defined in the Tone of Voice Guide?
2. **AI-GENERATED PATTERNS**: Identify and flag:
   - Em dashes (should be removed)
   - Contrast statements ("It's not X, it's Y")
   - Overly polished or corporate language
   - Generic advice without personal touch
3. **CORE VOICE PRINCIPLES**: Check alignment with:
   - Permission-giving language
   - "I would" / "I like to" (not "you should")
   - Explaining "why" before "how"
   - Realistic expectations
   - Authentic Australian voice
4. **MISSING PATTERNS**: Are there patterns from the knowledge base that should be included?
5. **SCHEDULE REFERENCES**: Are schedules referenced accurately? (Note: schedules already verified separately)
6. **GUARDRAILS**: Any content that violates established guardrails?

OUTPUT FORMAT (JSON):
{{
    "voice_consistency_issues": [
        {{
            "file": "module-X-lesson-Y.html",
            "location": "Section/paragraph reference",
            "issue": "Description of voice inconsistency",
            "example": "Excerpt showing the issue",
            "recommended_fix": "How to fix it",
            "severity": "high|medium|low"
        }}
    ],
    "ai_generated_patterns": [
        {{
            "file": "module-X-lesson-Y.html",
            "pattern_type": "em_dash|contrast_statement|polished_language|etc",
            "location": "Where it appears",
            "example": "The problematic text",
            "recommended_fix": "Sally's authentic way to say this",
            "severity": "high|medium|low"
        }}
    ],
    "missing_sally_patterns": [
        {{
            "pattern_name": "Name of missing pattern",
            "description": "What pattern is missing",
            "example_from_kb": "Example from knowledge base",
            "recommended_location": "Where to add",
            "importance": "high|medium|low"
        }}
    ],
    "guardrail_violations": [
        {{
            "file": "module-X-lesson-Y.html",
            "violation": "What guardrail is violated",
            "location": "Where it appears",
            "example": "The problematic text",
            "recommended_fix": "How to fix",
            "severity": "high|medium|low"
        }}
    ],
    "positive_findings": [
        {{
            "file": "module-X-lesson-Y.html",
            "strength": "What the content does well",
            "example": "Example of good voice",
            "note": "Why this is good"
        }}
    ],
    "summary": {{
        "total_issues_found": 0,
        "high_priority_issues": 0,
        "medium_priority_issues": 0,
        "low_priority_issues": 0,
        "overall_assessment": "Overall quality assessment",
        "key_recommendations": ["recommendation 1", "recommendation 2"],
        "content_strengths": "What the content does well",
        "main_improvements_needed": "Main areas for improvement"
    }}
}}

CRITICAL REQUIREMENTS:
- Be thorough but fair - focus on improvements
- All recommendations must align with the Tone of Voice Guide
- Prioritize high-impact changes
- Flag any AI-generated patterns that need removal
- Identify authentic Sally patterns that should be added
- Ensure examples reference actual knowledge base when possible

Generate comprehensive review now:"""

    try:
        logger.info(f"  → Calling Gemini {GEMINI_MODEL} for tone review...")
        response = gemini_model.generate_content(prompt)
        
        # Parse JSON response
        response_text = response.text.strip()
        
        # Try to extract JSON from markdown code blocks if present
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()
        
        review = json.loads(response_text)
        
        logger.info(f"✅ Review complete - found {review.get('summary', {}).get('total_issues_found', 0)} total issues")
        
        return review
        
    except json.JSONDecodeError as e:
        logger.error(f"❌ Failed to parse JSON response: {e}")
        logger.info("Saving raw response for debugging...")
        return {
            "error": "JSON parsing failed",
            "raw_response": response_text[:5000] if 'response_text' in locals() else "No response",
            "parse_error": str(e)
        }
    except Exception as e:
        logger.error(f"❌ Error during Gemini review: {e}")
        return {"error": str(e)}


def create_review_structure(samples: Dict[str, Any]) -> Dict[str, Any]:
    """Create review structure when Gemini is not available"""
    logger.info("📋 Creating review structure (Gemini analysis unavailable)...")
    
    return {
        "metadata": {
            "review_date": datetime.now().isoformat(),
            "gemini_model": None,
            "analysis_available": False,
            "samples_reviewed": len(samples.get("html_samples", []))
        },
        "voice_consistency_issues": [],
        "ai_generated_patterns": [],
        "missing_sally_patterns": [],
        "guardrail_violations": [],
        "positive_findings": [],
        "summary": {
            "total_issues_found": 0,
            "high_priority_issues": 0,
            "medium_priority_issues": 0,
            "low_priority_issues": 0,
            "overall_assessment": "Manual review needed - Gemini analysis unavailable. Please set GEMINI_API_KEY to enable automated analysis.",
            "key_recommendations": [
                "Set GEMINI_API_KEY environment variable",
                "Run script again to generate automated analysis",
                "Or proceed with manual review using sample dataset"
            ],
            "note": "This is a placeholder structure. Enable Gemini API key for automated analysis."
        }
    }


def save_review_report(review: Dict[str, Any], output_path: Path):
    """Save review report to JSON file"""
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(review, f, indent=2, default=str)
    logger.info(f"📄 Review report saved to: {output_path}")


def print_review_summary(review: Dict[str, Any]):
    """Print human-readable summary of review"""
    summary = review.get("summary", {})
    
    logger.info("")
    logger.info("="*70)
    logger.info("TONE OF VOICE REVIEW SUMMARY")
    logger.info("="*70)
    logger.info(f"Total Issues Found: {summary.get('total_issues_found', 0)}")
    logger.info(f"  - High Priority: {summary.get('high_priority_issues', 0)}")
    logger.info(f"  - Medium Priority: {summary.get('medium_priority_issues', 0)}")
    logger.info(f"  - Low Priority: {summary.get('low_priority_issues', 0)}")
    logger.info("")
    
    if summary.get('overall_assessment'):
        logger.info("Overall Assessment:")
        logger.info(f"  {summary.get('overall_assessment')}")
        logger.info("")
    
    if summary.get('key_recommendations'):
        logger.info("Key Recommendations:")
        for i, rec in enumerate(summary.get('key_recommendations', [])[:5], 1):
            logger.info(f"  {i}. {rec}")
        logger.info("")
    
    # Show top issues by category
    categories = [
        ("voice_consistency_issues", "Voice Consistency Issues"),
        ("ai_generated_patterns", "AI-Generated Patterns"),
        ("guardrail_violations", "Guardrail Violations"),
        ("missing_sally_patterns", "Missing Sally Patterns")
    ]
    
    for category_key, category_name in categories:
        issues = review.get(category_key, [])
        if issues:
            logger.info(f"{category_name}: {len(issues)}")
            for issue in issues[:3]:  # Show top 3
                severity = issue.get('severity', 'unknown')
                logger.info(f"  [{severity.upper()}] {issue.get('file', 'Unknown')}: {issue.get('issue', 'N/A')[:80]}...")
            if len(issues) > 3:
                logger.info(f"  ... and {len(issues) - 3} more")
            logger.info("")
    
    logger.info("="*70)


def main():
    """Main execution"""
    logger.info("🎯 Toddler Toolkit Tone of Voice Review with Gemini 3")
    if GEMINI_MODEL:
        logger.info(f"   Using model: {GEMINI_MODEL}")
    else:
        logger.info("   ⚠️  Gemini model unavailable - creating structure only")
    
    # Load sample dataset
    logger.info("📚 Loading sample dataset...")
    samples = load_sample_dataset()
    if not samples:
        logger.error("❌ Could not load sample dataset")
        logger.info("💡 Run create_tone_review_samples.py first to create the dataset")
        return
    
    logger.info(f"✅ Loaded {len(samples.get('html_samples', []))} HTML samples")
    
    # Load tone of voice guide
    logger.info("📖 Loading Tone of Voice Guide...")
    tone_guide = load_tone_of_voice_guide()
    if not tone_guide:
        logger.error("❌ Could not load Tone of Voice Guide")
        return
    
    logger.info(f"✅ Guide loaded: {len(tone_guide)} characters")
    
    # Perform review
    if gemini_model:
        review = review_html_samples_with_gemini(samples, tone_guide)
    else:
        review = create_review_structure(samples)
    
    if "error" in review:
        logger.error(f"❌ Review failed: {review.get('error')}")
        if 'raw_response' in review:
            logger.info("Saving raw response for debugging...")
            output_path = OUTPUT_DIR / 'toddler_toolkit_tone_review_raw.json'
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump({'error': review.get('error'), 'raw_response': review.get('raw_response', '')[:5000]}, f, indent=2)
        return
    
    # Save review report
    output_path = OUTPUT_DIR / 'toddler_toolkit_tone_review_report.json'
    save_review_report(review, output_path)
    
    # Print summary
    print_review_summary(review)
    
    logger.info(f"\n✅ Tone review complete!")
    logger.info(f"📄 Full report saved to: {output_path}")
    logger.info(f"\n💡 Next steps:")
    logger.info(f"   1. Review the detailed report in: {output_path}")
    logger.info(f"   2. Prioritize high-priority issues")
    logger.info(f"   3. Apply fixes to HTML files")
    logger.info(f"   4. Re-run review to verify improvements")


if __name__ == "__main__":
    main()

