#!/usr/bin/env python3
"""
Script to merge library page styles from styles.css into snooze-unified-theme.css
Uses Gemini 3 Pro API to analyze and merge styles properly.
"""

import os
import sys
import json
from pathlib import Path

# Add project root to path if needed
project_root = Path(__file__).parent.parent.parent.parent
sys.path.insert(0, str(project_root))

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    print("Warning: google-generativeai not installed. Install with: pip install google-generativeai")

def read_file_content(filepath):
    """Read file content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def extract_library_section(css_content):
    """Extract library page styles section from unified theme."""
    start_marker = "/* ============================================\n   20. LIBRARY PAGE STYLES"
    end_marker = "/* ============================================\n   21. FOOTER STYLES"
    
    start_idx = css_content.find(start_marker)
    end_idx = css_content.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        return None
    
    return css_content[start_idx:end_idx]

def merge_with_gemini(original_styles, unified_library_section):
    """Use Gemini to analyze and merge styles."""
    if not GEMINI_AVAILABLE:
        print("Gemini not available. Please install: pip install google-generativeai")
        return None
    
    # Get API key from environment
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set")
        return None
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    
    prompt = f"""You are a CSS expert. Compare these two CSS files and create a properly merged version.

ORIGINAL LIBRARY STYLES (styles.css) - Complete, properly formatted:
{original_styles[:20000]}

UNIFIED THEME LIBRARY SECTION - Compressed/minified version:
{unified_library_section[:10000]}

TASK:
1. Identify ALL styles from the original that are missing or broken in the unified theme
2. The unified theme has compressed styles (single line) - expand them to proper formatting
3. Merge ALL sections including:
   - Foundational (The Snooze Method)
   - Browse By Age
   - Tools & Resources
   - Sleep Troubleshooting
   - Live Coaching & Replays
   - 1:1 Consult Booking
   - Community Access
   - Future Resources
   - All responsive breakpoints
   - Accessibility styles

4. Maintain the same structure and formatting as the original styles.css
5. Ensure all class names and selectors are preserved
6. Keep all media queries and responsive styles

Return ONLY the complete merged CSS for the library section, starting with the section header comment.
Format it exactly like the original styles.css with proper indentation and line breaks."""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None

def main():
    """Main function."""
    base_path = Path(__file__).parent.parent
    
    original_styles_path = base_path / "pages" / "library-page" / "styles.css"
    unified_theme_path = base_path / "global" / "css" / "snooze-unified-theme.css"
    
    if not original_styles_path.exists():
        print(f"Error: {original_styles_path} not found")
        return 1
    
    if not unified_theme_path.exists():
        print(f"Error: {unified_theme_path} not found")
        return 1
    
    print("Reading files...")
    original_styles = read_file_content(original_styles_path)
    unified_theme = read_file_content(unified_theme_path)
    
    unified_library_section = extract_library_section(unified_theme)
    if not unified_library_section:
        print("Error: Could not find library section in unified theme")
        return 1
    
    print("Calling Gemini API to merge styles...")
    merged_styles = merge_with_gemini(original_styles, unified_library_section)
    
    if not merged_styles:
        print("Failed to get merged styles from Gemini")
        return 1
    
    # Clean up the response (remove markdown code blocks if present)
    if merged_styles.startswith("```"):
        lines = merged_styles.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines[-1].strip() == "```":
            lines = lines[:-1]
        merged_styles = "\n".join(lines)
    
    # Find the library section in unified theme and replace it
    start_marker = "/* ============================================\n   20. LIBRARY PAGE STYLES"
    end_marker = "/* ============================================\n   21. FOOTER STYLES"
    
    start_idx = unified_theme.find(start_marker)
    end_idx = unified_theme.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("Error: Could not find library section boundaries")
        return 1
    
    # Replace the section
    new_unified_theme = (
        unified_theme[:start_idx] +
        merged_styles.strip() + "\n\n" +
        unified_theme[end_idx:]
    )
    
    # Write backup
    backup_path = unified_theme_path.with_suffix('.css.backup')
    print(f"Creating backup: {backup_path}")
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(unified_theme)
    
    # Write updated file
    print(f"Writing updated unified theme: {unified_theme_path}")
    with open(unified_theme_path, 'w', encoding='utf-8') as f:
        f.write(new_unified_theme)
    
    print("✅ Successfully merged library styles!")
    print(f"Backup saved to: {backup_path}")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())

