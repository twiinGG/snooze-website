#!/usr/bin/env python3
"""
Remove duplicate CTA scripts from complete age pages
"""

import re
from pathlib import Path

def fix_duplicate_ctas(file_path: Path):
    """Remove duplicate CTA scripts, keep only one"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all hero-cta-location divs and their scripts
    # Pattern: <!-- Context-Aware CTA --> ... <div id="hero-cta-location"... </script>
    # We want to keep only the first one
    
    # Count occurrences
    cta_count = content.count('id="hero-cta-location"')
    if cta_count <= 1:
        return False  # No duplicates
    
    # Find the first occurrence (should be in hero section)
    first_match = re.search(
        r'(<!-- Context-Aware CTA -->.*?<div id="hero-cta-location".*?</script>)',
        content,
        re.DOTALL
    )
    
    if not first_match:
        return False
    
    # Remove all other occurrences
    pattern = r'<!-- Context-Aware CTA injected into hero -->.*?<div id="hero-cta-location".*?</script>\s*'
    content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # Also remove standalone duplicates
    pattern2 = r'<!-- Context-Aware CTA -->\s*<div id="hero-cta-location".*?</script>\s*(?=.*?<!-- Context-Aware CTA -->)'
    content = re.sub(pattern2, '', content, flags=re.DOTALL)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

if __name__ == '__main__':
    base_path = Path(__file__).parent.parent / 'kajabi-deployment' / 'age-pages'
    pages = ['newborn', '3-4-month', '5-12-month', 'toddler']
    
    for age in pages:
        page_file = base_path / f'{age}-page-complete.html'
        if page_file.exists():
            if fix_duplicate_ctas(page_file):
                print(f"✅ Fixed duplicates in {age}-page-complete.html")
            else:
                print(f"✓ No duplicates in {age}-page-complete.html")

