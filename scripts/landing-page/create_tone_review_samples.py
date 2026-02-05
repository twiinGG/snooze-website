#!/usr/bin/env python3
"""
Create tone review sample dataset for Gemini 3 analysis of toddler toolkit content.

This script:
1. Extracts representative samples from HTML lesson files
2. Includes knowledge base samples (TikTok, Q&A, podcast)
3. Creates structured JSON dataset for Gemini 3 review
4. Prepares samples aligned with tone of voice guide
"""

import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser
from typing import List, Dict, Any

# Get project root (script is in projects/snooze-website/scripts/landing-page/)
PROJECT_ROOT = Path(__file__).parent.parent.parent.parent
TODDLER_TOOLKIT_DIR = PROJECT_ROOT / "projects/snooze-website/kajabi-deployment/courses/toddler-toolkit"
TONE_GUIDE_PATH = PROJECT_ROOT / "docs/strategy/SNOOZE-TONE-OF-VOICE.md"
RESEARCH_DOC_PATH = PROJECT_ROOT / "projects/snooze-website/docs/landing-page/TODDLER-TOOLKIT-RESEARCH.md"
PODCAST_MAPPING_PATH = PROJECT_ROOT / "projects/snooze-website/docs/landing-page/toddler_toolkit_podcast_episodes.json"
OUTPUT_DIR = PROJECT_ROOT / "projects/snooze-website/docs/landing-page"


def extract_text_from_html(html_content: str) -> str:
    """Extract clean text content from HTML, removing tags but preserving structure."""
    # Remove script and style tags
    html_content = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html_content = re.sub(r'<style[^>]*>.*?</style>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove HTML tags but preserve some structure
    text = re.sub(r'<h[1-6][^>]*>(.*?)</h[1-6]>', r'\n### \1\n', html_content, flags=re.DOTALL)
    text = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n', text, flags=re.DOTALL)
    text = re.sub(r'<li[^>]*>(.*?)</li>', r'• \1\n', text, flags=re.DOTALL)
    text = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', text, flags=re.DOTALL)
    
    # Remove all remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Clean up whitespace
    text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
    text = text.strip()
    
    return text


def extract_sample_from_file(file_path: Path, max_chars: int = 2000) -> Dict[str, Any]:
    """Extract a sample from an HTML file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Extract text content
    text_content = extract_text_from_html(html_content)
    
    # Take first portion if too long
    if len(text_content) > max_chars:
        text_content = text_content[:max_chars] + "... [truncated]"
    
    return {
        "file": file_path.name,
        "content": text_content,
        "char_count": len(text_content),
        "module": extract_module_from_filename(file_path.name)
    }


def extract_module_from_filename(filename: str) -> str:
    """Extract module number from filename."""
    match = re.match(r'module-(\d+)', filename)
    return match.group(1) if match else "unknown"


def load_podcast_mapping() -> Dict[str, Any]:
    """Load podcast episode mapping."""
    if PODCAST_MAPPING_PATH.exists():
        with open(PODCAST_MAPPING_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


def create_sample_dataset() -> Dict[str, Any]:
    """Create comprehensive tone review sample dataset."""
    
    print("📚 Creating tone review sample dataset...\n")
    
    dataset = {
        "metadata": {
            "created_date": str(Path(__file__).stat().st_mtime),
            "purpose": "Tone of voice review samples for Gemini 3 analysis",
            "source_files": [],
            "total_samples": 0
        },
        "tone_of_voice_reference": {
            "guide_path": str(TONE_GUIDE_PATH.relative_to(PROJECT_ROOT)),
            "note": "Full Tone of Voice Guide should be loaded separately for Gemini 3 analysis"
        },
        "html_samples": [],
        "knowledge_base_samples": {
            "tiktok_examples": [],
            "qa_examples": [],
            "podcast_episodes": []
        }
    }
    
    # Select representative HTML files across modules
    sample_files = [
        "module-1-lesson-1.html",  # Introduction content
        "module-1-intro.html",      # Module intro style
        "module-2-lesson-1.html",   # Schedule content (recently fixed)
        "module-3-lesson-1.html",   # Nap transition content
        "module-4-lesson-1.html",   # Bedtime battles
        "module-5-lesson-1.html",   # Early rising (most common issue)
    ]
    
    print("📄 Extracting HTML samples...")
    for filename in sample_files:
        file_path = TODDLER_TOOLKIT_DIR / filename
        if file_path.exists():
            sample = extract_sample_from_file(file_path, max_chars=2500)
            dataset["html_samples"].append(sample)
            dataset["metadata"]["source_files"].append(filename)
            print(f"  ✓ Extracted sample from {filename}")
        else:
            print(f"  ⚠️  File not found: {filename}")
    
    # Load podcast mapping
    print("\n🎙️ Loading podcast episode information...")
    podcast_mapping = load_podcast_mapping()
    if podcast_mapping and "episodes_selected" in podcast_mapping:
        for episode in podcast_mapping["episodes_selected"][:3]:  # First 3 primary episodes
            dataset["knowledge_base_samples"]["podcast_episodes"].append({
                "episode_number": episode.get("episode_number"),
                "episode_title": episode.get("episode_title"),
                "placement": episode.get("placement", {}),
                "youtube_url": episode.get("youtube_url"),
                "topics": episode.get("topics", []),
                "note": "Full episode transcript available in knowledge base for Gemini 3 analysis"
            })
        print(f"  ✓ Loaded {len(dataset['knowledge_base_samples']['podcast_episodes'])} podcast episodes")
    
    # Add knowledge base sample references from research doc
    print("\n📊 Adding knowledge base sample references...")
    dataset["knowledge_base_samples"]["tiktok_examples"] = [
        {
            "video_id": "7409835060658064648",
            "caption": "How to resettle your baby at 5am without a feed",
            "views": 313300,
            "topic": "Early Rising",
            "note": "High-performing video - reference for tone/style"
        },
        {
            "video_id": "7430662164693749000",
            "caption": "Transitional schedule for 2-to-1 nap transition",
            "views": 45600,
            "topic": "Nap Management",
            "note": "Used in Module 3 - reference for schedule explanation style"
        }
    ]
    
    dataset["knowledge_base_samples"]["qa_examples"] = [
        {
            "problem_category": "Early Rising",
            "age_context": "Almost 2 year old",
            "sample_question": "My almost 2-year-old consistently wakes between 5-6 am...",
            "note": "Representative Q&A from knowledge base - reference for Sally's answer style"
        },
        {
            "problem_category": "2-to-1 Nap Transition",
            "age_context": "14 months",
            "sample_question": "My 14-month-old... is now waking earlier and refusing their second nap...",
            "note": "Representative Q&A - reference for transition guidance style"
        }
    ]
    
    dataset["metadata"]["total_samples"] = (
        len(dataset["html_samples"]) +
        len(dataset["knowledge_base_samples"]["tiktok_examples"]) +
        len(dataset["knowledge_base_samples"]["qa_examples"]) +
        len(dataset["knowledge_base_samples"]["podcast_episodes"])
    )
    
    return dataset


def main():
    """Main execution function."""
    print("="*60)
    print("TODDLER TOOLKIT - TONE REVIEW SAMPLE DATASET CREATOR")
    print("="*60)
    print()
    
    # Create dataset
    dataset = create_sample_dataset()
    
    # Save to JSON
    output_file = OUTPUT_DIR / "toddler_toolkit_tone_review_samples.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(dataset, f, indent=2, default=str)
    
    print("\n" + "="*60)
    print("DATASET CREATION SUMMARY")
    print("="*60)
    print(f"✅ Total samples: {dataset['metadata']['total_samples']}")
    print(f"✅ HTML samples: {len(dataset['html_samples'])}")
    print(f"✅ TikTok examples: {len(dataset['knowledge_base_samples']['tiktok_examples'])}")
    print(f"✅ Q&A examples: {len(dataset['knowledge_base_samples']['qa_examples'])}")
    print(f"✅ Podcast episodes: {len(dataset['knowledge_base_samples']['podcast_episodes'])}")
    print(f"\n📄 Dataset saved to: {output_file}")
    print("\n✅ Ready for Gemini 3 tone review analysis!")
    print("\n📋 Next steps:")
    print("  1. Load Tone of Voice Guide as reference")
    print("  2. Load full knowledge base samples if needed")
    print("  3. Run Gemini 3 analysis script on samples")
    print("  4. Review analysis output and apply fixes")


if __name__ == "__main__":
    main()

