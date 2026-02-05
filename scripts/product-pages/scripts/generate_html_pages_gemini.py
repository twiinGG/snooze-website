#!/usr/bin/env python3
"""
Generate HTML Landing Pages with Gemini 3 Pro
Creates landing pages for all courses using the 3-4 month template and generated content

Usage:
    python3 generate_html_pages_gemini.py

Author: Snooze Website Development
Date: December 2025
"""

import os
import json
import time
import re
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from root .env file
# Script is at: projects/snooze-website/kajabi-deployment/pages/product-pages/scripts/
# Need to go up to workspace root (6 levels up)
script_path = Path(__file__).resolve()
# Go up: scripts -> product-pages -> pages -> deployment -> kajabi-deployment -> snooze-website -> projects -> root
root_dir = script_path.parent.parent.parent.parent.parent.parent
env_path = root_dir / ".env"

# If not found, try alternative: go up until we find .env
if not env_path.exists():
    current = script_path.parent
    while current != current.parent:
        potential_env = current / ".env"
        if potential_env.exists():
            env_path = potential_env
            root_dir = current
            break
        current = current.parent

load_dotenv(env_path)
print(f"Loading .env from: {env_path}")

# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    # Show what keys ARE available for debugging
    available_keys = [k for k in os.environ.keys() if 'API_KEY' in k or 'API' in k]
    print(f"Available API keys in environment: {available_keys if available_keys else 'None found'}")
    raise ValueError(f"GEMINI_API_KEY not found in environment. Check .env file at {env_path}")
    
print(f"✅ GEMINI_API_KEY loaded successfully")

genai.configure(api_key=GEMINI_API_KEY)

# Try Gemini 3 Pro models first, then fallback
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

gemini_model = None
for model_name in all_models_to_try:
    try:
        gemini_model = genai.GenerativeModel(model_name)
        print(f"✅ Using Gemini model: {model_name}")
        break
    except Exception as e:
        continue

if not gemini_model:
    raise ValueError("No Gemini model available. Check API key and model availability.")

# Paths
SCRIPT_DIR = Path(__file__).parent
PAGES_DIR = SCRIPT_DIR.parent
TEMPLATE_FILE = PAGES_DIR / "generated-html-pages" / "3-4-month-course-landing-page.html"
GENERATED_DIR = PAGES_DIR / "GENERATED-CONTENT"
OUTPUT_DIR = PAGES_DIR / "generated-html-pages"

OUTPUT_DIR.mkdir(exist_ok=True)

# Course configuration
COURSES = {
    "5-12-month-guide": {
        "name": "5-12 Month Course",
        "slug": "5-12-month-course",
        "url": "https://joinsnooze.com/5-12-month-baby-sleep-course",
        "modules": 6,
        "lessons": 23,
        "has_parts": True,
        "part1": "Part 1: The Prep",
        "part2": "Part 2: The Plan",
        "is_course": True  # This is a course, not a guide
    },
    "toddler-toolkit": {
        "name": "Toddler Toolkit",
        "slug": "toddler-toolkit",
        "url": "https://joinsnooze.com/toddler-toolkit",
        "modules": 7,
        "lessons": 25,
        "has_parts": False
    },
    "snooze-method": {
        "name": "The Snooze Method",
        "slug": "snooze-method",
        "url": "https://joinsnooze.com/snooze-method",
        "modules": 4,
        "lessons": 16,
        "has_parts": False
    },
    "newborn-guide": {
        "name": "Newborn Sleep Guide",
        "slug": "newborn-guide",
        "url": "https://joinsnooze.com/newborn-sleep-guide",
        "modules": 9,
        "lessons": 0,  # Guide format
        "has_parts": False,
        "is_guide": True
    }
}


def load_generated_content(course_slug):
    """Load generated content from Phase 2."""
    content_file = GENERATED_DIR / f"{course_slug}-content.md"
    summaries_file = GENERATED_DIR / "module-summaries" / f"{course_slug}-module-summaries.md"
    
    content = {}
    
    if content_file.exists():
        with open(content_file, "r") as f:
            text = f.read()
            # Extract hero section
            hero_match = re.search(r'## Hero Section\n\n(.*?)\n\n---', text, re.DOTALL)
            if hero_match:
                content["hero"] = hero_match.group(1).strip()
            
            # Extract course overview
            overview_match = re.search(r'## Course Overview\n\n(.*?)\n\n---', text, re.DOTALL)
            if overview_match:
                content["overview"] = overview_match.group(1).strip()
            
            # Extract resources
            resources_match = re.search(r'## Resources Section\n\n(.*?)$', text, re.DOTALL)
            if resources_match:
                content["resources"] = resources_match.group(1).strip()
    
    if summaries_file.exists():
        with open(summaries_file, "r") as f:
            content["module_summaries"] = f.read()
    
    return content


def extract_module_summaries(text):
    """Extract module summaries from markdown."""
    modules = []
    pattern = r'## Module \d+: (.+?)\n(.+?)(?=\n## Module|\Z)'
    matches = re.finditer(pattern, text, re.DOTALL)
    
    for match in matches:
        title = match.group(1).strip()
        summary = match.group(2).strip()
        modules.append({"title": title, "summary": summary})
    
    return modules


def call_gemini(prompt, max_tokens=8192):
    """Call Gemini API with a prompt."""
    try:
        response = gemini_model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.7,
                "top_p": 0.95,
                "top_k": 40,
                "max_output_tokens": max_tokens,
            }
        )
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None


def generate_html_page(course_slug, course_config, generated_content):
    """Generate HTML landing page using Gemini 3 Pro."""
    
    # Load template
    with open(TEMPLATE_FILE, "r") as f:
        template = f.read()
    
    # Load module summaries
    modules = []
    if "module_summaries" in generated_content:
        modules = extract_module_summaries(generated_content["module_summaries"])
    
    # Build prompt for Gemini
    prompt = f"""You are generating an HTML landing page for a baby sleep course. Use the provided template structure and replace content with the generated content.

TEMPLATE STRUCTURE:
{template[:5000]}  # First 5000 chars of template

COURSE INFORMATION:
- Course Name: {course_config['name']}
- URL: {course_config['url']}
- Modules: {course_config['modules']}
- Lessons: {course_config['lessons']}
- Has Parts: {course_config.get('has_parts', False)}
- Is Guide Format: {course_config.get('is_guide', False)}

GENERATED CONTENT:

HERO SECTION:
{generated_content.get('hero', '')}

COURSE OVERVIEW:
{generated_content.get('overview', '')}

RESOURCES:
{generated_content.get('resources', '')}

MODULE SUMMARIES:
{generated_content.get('module_summaries', '')}

INSTRUCTIONS:
1. Keep the exact HTML structure and CSS classes from the template
2. Replace the hero section content (title, subtitle, stats) with the generated hero content
3. Replace the course overview section with the generated overview content
4. Replace module summaries in the curriculum section with the generated module summaries
5. Replace resources section with the generated resources content
6. Update all course-specific numbers (modules, lessons) to match this course
7. Keep all other sections (pricing, comparison, etc.) but update course name references
8. Maintain proper HTML formatting and indentation
9. For Newborn Guide (is_guide=True), adapt the course format to guide format where appropriate
10. Ensure all module accordions are properly structured

OUTPUT:
Return the complete HTML page with all content replaced. Do not include markdown code blocks, just the raw HTML."""

    print(f"\n🤖 Generating HTML for {course_config['name']}...")
    html = call_gemini(prompt, max_tokens=16384)
    
    if not html:
        print(f"❌ Failed to generate HTML for {course_config['name']}")
        return None
    
    # Clean up HTML (remove markdown code blocks if present)
    html = re.sub(r'```html\n?', '', html)
    html = re.sub(r'```\n?', '', html)
    html = html.strip()
    
    return html


def main():
    """Main function to generate all HTML pages."""
    print("🚀 Starting Phase 3: HTML Generation with Gemini 3 Pro\n")
    
    results = {}
    
    for course_slug, course_config in COURSES.items():
        print(f"\n{'='*60}")
        print(f"Processing: {course_config['name']}")
        print(f"{'='*60}")
        
        # Load generated content
        generated_content = load_generated_content(course_slug)
        
        if not generated_content:
            print(f"⚠️  No generated content found for {course_slug}")
            continue
        
        # Generate HTML
        html = generate_html_page(course_slug, course_config, generated_content)
        time.sleep(2)  # Rate limiting
        
        if html:
            # Save HTML file
            output_file = OUTPUT_DIR / f"{course_slug}-landing-page.html"
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(html)
            
            print(f"✅ Saved HTML to {output_file}")
            results[course_slug] = {"success": True, "file": str(output_file)}
        else:
            results[course_slug] = {"success": False, "error": "HTML generation failed"}
    
    # Save summary
    summary_file = OUTPUT_DIR / "generation-summary.json"
    with open(summary_file, "w") as f:
        json.dump({
            "generated_at": time.strftime('%Y-%m-%d %H:%M:%S'),
            "model": "gemini-3-pro",
            "pages_generated": sum(1 for r in results.values() if r.get("success", False)),
            "pages_failed": sum(1 for r in results.values() if not r.get("success", False)),
            "results": results
        }, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"✅ HTML generation complete!")
    print(f"📁 All files saved to: {OUTPUT_DIR}")
    print(f"📊 Summary saved to: {summary_file}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()

