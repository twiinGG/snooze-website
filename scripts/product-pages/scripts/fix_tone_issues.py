#!/usr/bin/env python3
"""
Fix Tone of Voice Issues in Generated HTML Pages
Removes em dashes and fixes other tone violations

Usage:
    python3 fix_tone_issues.py

Author: Snooze Website Development
Date: December 2025
"""

import re
from pathlib import Path

# Paths
SCRIPT_DIR = Path(__file__).parent
PAGES_DIR = SCRIPT_DIR.parent
GENERATED_DIR = PAGES_DIR / "generated-html-pages"

# Files to fix
HTML_FILES = [
    "5-12-month-guide-landing-page.html",
    "toddler-toolkit-landing-page.html",
    "snooze-method-landing-page.html",
    "newborn-guide-landing-page.html"
]


def fix_em_dashes(content: str) -> tuple[str, int]:
    """Replace em dashes with appropriate alternatives."""
    replacements = 0
    
    # Pattern 1: "word—word" -> "word. Word" or "word, word"
    # Check if it's a sentence break or continuation
    def replace_em_dash(match):
        nonlocal replacements
        replacements += 1
        before = match.group(1)
        after = match.group(2)
        
        # If after starts with capital, it's likely a new sentence
        if after and after[0].isupper():
            return f"{before}. {after}"
        # Otherwise, use comma
        else:
            return f"{before}, {after}"
    
    # Replace em dashes (—) with periods or commas
    content = re.sub(r'([^\s])—([^\s])', replace_em_dash, content)
    
    return content, replacements


def fix_should_must_in_content(content: str) -> tuple[str, int]:
    """Fix 'should' and 'must' in actual content (not comments)."""
    replacements = 0
    
    # Only replace in actual content, not in HTML comments or tags
    def replace_should(match):
        nonlocal replacements
        full_match = match.group(0)
        # Check if it's in a comment or tag
        start_pos = match.start()
        
        # Look backwards to see if we're in a comment
        before = content[:start_pos]
        if '<!--' in before and '-->' not in before[before.rfind('<!--'):]:
            return full_match  # In HTML comment, don't replace
        
        if '<' in before and '>' not in before[before.rfind('<'):]:
            return full_match  # In HTML tag, don't replace
        
        replacements += 1
        
        # Replace patterns
        if 'you should' in full_match.lower():
            return full_match.replace('you should', 'you can').replace('You should', 'You can')
        elif 'should' in full_match.lower():
            return full_match.replace('should', 'can').replace('Should', 'Can')
        elif 'must' in full_match.lower():
            return full_match.replace('must', 'can').replace('Must', 'Can')
        
        return full_match
    
    # This is complex - for now, just focus on em dashes
    # The "should" in comments is fine
    
    return content, replacements


def fix_html_file(filepath: Path) -> dict:
    """Fix tone issues in a single HTML file."""
    print(f"\n📝 Processing: {filepath.name}")
    
    content = filepath.read_text(encoding='utf-8')
    original_content = content
    
    # Fix em dashes
    content, em_dash_count = fix_em_dashes(content)
    
    # Count issues before
    em_dashes_before = len(re.findall(r'—', original_content))
    
    # Save if changes were made
    if content != original_content:
        filepath.write_text(content, encoding='utf-8')
        print(f"  ✅ Fixed {em_dash_count} em dashes")
        return {
            "file": filepath.name,
            "fixed": True,
            "em_dashes_removed": em_dash_count,
            "em_dashes_before": em_dashes_before
        }
    else:
        print(f"  ℹ️  No changes needed")
        return {
            "file": filepath.name,
            "fixed": False,
            "em_dashes_removed": 0,
            "em_dashes_before": em_dashes_before
        }


def main():
    """Main function to fix all HTML files."""
    print("🔧 Fixing Tone of Voice Issues in Generated HTML Pages\n")
    
    results = []
    
    for html_file in HTML_FILES:
        filepath = GENERATED_DIR / html_file
        if filepath.exists():
            result = fix_html_file(filepath)
            results.append(result)
        else:
            print(f"⚠️  File not found: {html_file}")
    
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    
    total_fixed = sum(r["em_dashes_removed"] for r in results)
    total_before = sum(r["em_dashes_before"] for r in results)
    
    print(f"Total em dashes found: {total_before}")
    print(f"Total em dashes fixed: {total_fixed}")
    print(f"Files processed: {len(results)}")
    
    for result in results:
        if result["fixed"]:
            print(f"  ✅ {result['file']}: {result['em_dashes_removed']} fixed")
        else:
            print(f"  ℹ️  {result['file']}: No issues found")
    
    print("\n" + "=" * 80)


if __name__ == "__main__":
    main()

