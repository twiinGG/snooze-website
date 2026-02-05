#!/usr/bin/env python3
"""
Fix section order in all generated product landing pages.
Extracts all sections and reorders them correctly.
"""

from pathlib import Path
import re

PAGES_DIR = Path(__file__).parent.parent / "generated-html-pages"

FILES = [
    "toddler-toolkit-landing-page.html",
    "snooze-method-landing-page.html",
    "newborn-guide-landing-page.html"
]

def extract_all_sections(content: str):
    """Extract all sections from content, return as dict keyed by section number."""
    sections = {}
    
    # Pattern to match section comments and their content until next section or end
    # This handles sections that may have different endings
    section_pattern = r'<!-- ============================================\s+SECTION (\d+(?:\.\d+)?):(.*?)\s+============================================ -->(.*?)(?=<!-- ============================================\s+SECTION |<script>|$)'
    
    matches = re.finditer(section_pattern, content, re.DOTALL)
    for match in matches:
        section_num = match.group(1)
        section_title = match.group(2).strip()
        section_content = match.group(3).strip()
        
        # Reconstruct full section
        full_section = f'<!-- ============================================\n     SECTION {section_num}:{section_title}\n     ============================================ -->\n{section_content}'
        sections[section_num] = full_section
    
    return sections

def extract_header_nav_seo(content: str):
    """Extract header, SEO comments, and navigation."""
    pattern = r'(<!-- ============================================\s+PRODUCT LANDING PAGE:.*?<!-- SECTION 0: NAVIGATION.*?-->.*?\n)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def extract_script(content: str):
    """Extract script section at the end."""
    # Look for script tag and everything after it
    pattern = r'(<script>.*?</script>)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        # Also get the comment before it if it exists
        script_comment_pattern = r'(<!-- ============================================\s+SECTION 11:.*?============================================ -->\s*)?<script>'
        comment_match = re.search(script_comment_pattern, content, re.DOTALL)
        if comment_match and comment_match.group(1):
            return comment_match.group(1) + match.group(1)
        return match.group(1)
    return None

def reorder_file(filepath: Path):
    """Reorder sections in a file."""
    content = filepath.read_text(encoding='utf-8')
    
    # Extract header/nav
    header_nav = extract_header_nav_seo(content)
    if not header_nav:
        print(f"⚠️  Could not find header/nav in {filepath.name}")
        return False
    
    # Extract all sections
    sections = extract_all_sections(content)
    if not sections:
        print(f"⚠️  Could not extract sections from {filepath.name}")
        return False
    
    # Extract script
    script = extract_script(content)
    
    # Build new content in correct order
    new_content = header_nav.rstrip() + "\n\n"
    
    # Add sections in correct order
    section_order = ['1', '2', '3', '4', '5', '6', '6.5', '7', '7.5', '8', '9', '10']
    for num in section_order:
        if num in sections:
            new_content += sections[num] + "\n\n"
        else:
            print(f"⚠️  Section {num} missing in {filepath.name}")
    
    # Add script if found
    if script:
        if not script.strip().startswith('<!--'):
            # Add comment if missing
            new_content += "<!-- ============================================\n     SECTION 11: FOOTER / SCRIPTS\n     ============================================ -->\n"
        new_content += script
    
    filepath.write_text(new_content, encoding='utf-8')
    print(f"✅ Reordered {len(sections)} sections in {filepath.name}")
    return True

def main():
    print("Reordering sections in generated product landing pages...\n")
    
    for filename in FILES:
        filepath = PAGES_DIR / filename
        if not filepath.exists():
            print(f"⚠️  File not found: {filename}")
            continue
        
        reorder_file(filepath)
    
    print("\n✅ All files reordered!")

if __name__ == "__main__":
    main()

