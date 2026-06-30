#!/usr/bin/env python3
"""
Reorder sections in generated product landing pages to correct order.
Order: Header, Nav, 1, 2, 3, 4, 5, 6, 6.5, 7, 7.5, 8, 9, 10, 11
"""

from pathlib import Path
import re

PAGES_DIR = Path(__file__).parent.parent / "generated-html-pages"

FILES = [
    "toddler-toolkit-landing-page.html",
    "snooze-method-landing-page.html",
    "newborn-guide-landing-page.html"
]

def extract_section(content: str, section_num: str):
    """Extract a section by number (handles both '4' and '6.5' format)."""
    # Escape the section number for regex
    escaped_num = re.escape(section_num)
    pattern = rf'(<!-- ============================================\s+SECTION {escaped_num}:.*?============================================ -->.*?</section>)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def extract_header_and_nav(content: str):
    """Extract header comments and navigation section."""
    pattern = r'(<!-- ============================================\s+PRODUCT LANDING PAGE:.*?<!-- SECTION 0: NAVIGATION.*?-->.*?\n)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def extract_script_section(content: str):
    """Extract the script section at the end."""
    pattern = r'(<!-- ============================================\s+SECTION 11:.*?<script>.*?</script>)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def reorder_sections(filepath: Path):
    """Reorder sections in correct order."""
    content = filepath.read_text(encoding='utf-8')
    
    # Extract header/nav
    header_nav = extract_header_and_nav(content)
    if not header_nav:
        print(f"⚠️  Could not find header/nav in {filepath.name}")
        return False
    
    # Extract script
    script = extract_script_section(content)
    if not script:
        print(f"⚠️  Could not find script section in {filepath.name}")
        return False
    
    # Extract all sections in order
    sections = {}
    section_order = ['1', '2', '3', '4', '5', '6', '6.5', '7', '7.5', '8', '9', '10']
    
    for num in section_order:
        section = extract_section(content, num)
        if section:
            sections[num] = section
        else:
            print(f"⚠️  Section {num} not found in {filepath.name}")
    
    # Build new content in correct order
    new_content = header_nav.rstrip() + "\n\n"
    
    # Add sections in order
    for num in section_order:
        if num in sections:
            new_content += sections[num] + "\n\n"
    
    # Add script
    new_content += script
    
    filepath.write_text(new_content, encoding='utf-8')
    print(f"✅ Reordered sections in {filepath.name}")
    return True

def main():
    print("Reordering sections in generated product landing pages...\n")
    
    for filename in FILES:
        filepath = PAGES_DIR / filename
        if not filepath.exists():
            print(f"⚠️  File not found: {filename}")
            continue
        
        reorder_sections(filepath)
    
    print("\n✅ All files reordered!")

if __name__ == "__main__":
    main()

