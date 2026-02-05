#!/usr/bin/env python3
"""
Fix section order in generated product landing pages.
Sections should be in order: 1, 2, 3, 4, 5, 6, 6.5, 7, 7.5, 8, 9, 10, 11
"""

from pathlib import Path
import re

PAGES_DIR = Path(__file__).parent.parent / "generated-html-pages"

FILES = [
    "5-12-month-guide-landing-page.html",
    "toddler-toolkit-landing-page.html",
    "snooze-method-landing-page.html",
    "newborn-guide-landing-page.html"
]

def extract_sections(content: str):
    """Extract all sections from HTML content."""
    # Pattern to match section comments and their content
    section_pattern = r'(<!-- ============================================\s+SECTION \d+(?:\.\d+)?:.*?============================================ -->.*?</section>)'
    sections = re.findall(section_pattern, content, re.DOTALL)
    return sections

def find_section_by_number(content: str, section_num: str):
    """Find a section by its number (e.g., '1', '4', '6.5')."""
    pattern = rf'(<!-- ============================================\s+SECTION {re.escape(section_num)}:.*?============================================ -->.*?</section>)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def fix_section_order(filepath: Path):
    """Fix the order of sections in a file."""
    content = filepath.read_text(encoding='utf-8')
    
    # Extract navigation and scripts (keep at start and end)
    nav_match = re.search(r'(<!-- SECTION 0: NAVIGATION.*?-->.*?<!-- ============================================\s+SECTION 1:)', content, re.DOTALL)
    script_match = re.search(r'(<!-- ============================================\s+SECTION 11:.*?<script>.*?</script>)', content, re.DOTALL)
    
    if not nav_match or not script_match:
        print(f"⚠️  Could not find navigation or script section in {filepath.name}")
        return False
    
    nav_section = nav_match.group(1)
    script_section = script_match.group(1)
    
    # Extract all main sections (1-10)
    sections = {}
    for num in ['1', '2', '3', '4', '5', '6', '6.5', '7', '7.5', '8', '9', '10']:
        section = find_section_by_number(content, num)
        if section:
            sections[num] = section
    
    # Build content in correct order
    new_content = nav_section
    
    # Add sections in order
    for num in ['1', '2', '3', '4', '5', '6', '6.5', '7', '7.5', '8', '9', '10']:
        if num in sections:
            new_content += "\n\n" + sections[num]
    
    # Add script section
    new_content += "\n\n" + script_section
    
    filepath.write_text(new_content, encoding='utf-8')
    print(f"✅ Fixed section order in {filepath.name}")
    return True

def main():
    print("Fixing section order in generated product landing pages...\n")
    
    for filename in FILES:
        filepath = PAGES_DIR / filename
        if not filepath.exists():
            print(f"⚠️  File not found: {filename}")
            continue
        
        fix_section_order(filepath)
    
    print("\n✅ All files fixed!")

if __name__ == "__main__":
    main()

