#!/usr/bin/env python3
"""
Remove custom header sections from page files.
Removes SECTION 0 navigation blocks and custom nav HTML.
"""

import os
import re
from pathlib import Path

def remove_custom_header(content):
    """Remove custom header sections from HTML content."""
    
    # Pattern 1: Full nav block with SECTION 0 comment
    pattern1 = r'<!--\s*============================================\s*SECTION\s+0[.:]\s*NAVIGATION.*?-->\s*<!--.*?-->\s*<nav[^>]*id=["\']snooze-nav-clean["\'][^>]*>.*?</nav>\s*(?:<!--.*?-->\s*)?'
    
    # Pattern 2: SECTION 0 FLOATING NAVIGATION HEADER
    pattern2 = r'<!--\s*============================================\s*SECTION\s+0[.:]?\s*FLOATING\s+NAVIGATION\s+HEADER.*?-->\s*<div[^>]*class=["\']navbar["\'][^>]*>.*?</div>\s*'
    
    # Pattern 3: Simple SECTION 0: NAVIGATION comment followed by nav
    pattern3 = r'<!--\s*============================================\s*SECTION\s+0[.:]\s*NAVIGATION\s*============================================\s*-->.*?<nav[^>]*id=["\']snooze-nav-clean["\'][^>]*>.*?</nav>\s*(?:<!--.*?-->\s*)?'
    
    # Pattern 4: Any snooze-nav-clean nav block
    pattern4 = r'<nav[^>]*id=["\']snooze-nav-clean["\'][^>]*>.*?</nav>'
    
    # Pattern 5: SECTION 0.5 FLOATING NAVIGATION
    pattern5 = r'<!--\s*============================================\s*SECTION\s+0\.5[.:]?\s*FLOATING\s+NAVIGATION\s+HEADER.*?-->\s*<div[^>]*class=["\']navbar[^>]*snooze-custom-navbar[^>]*>.*?</div>\s*'
    
    # Apply patterns in order
    content = re.sub(pattern1, '', content, flags=re.DOTALL)
    content = re.sub(pattern2, '', content, flags=re.DOTALL)
    content = re.sub(pattern3, '', content, flags=re.DOTALL)
    content = re.sub(pattern5, '', content, flags=re.DOTALL)
    content = re.sub(pattern4, '', content, flags=re.DOTALL)
    
    # Remove standalone SECTION 0: NAVIGATION comments
    content = re.sub(r'<!--\s*============================================\s*SECTION\s+0[.:]\s*NAVIGATION\s*============================================\s*-->', '', content)
    content = re.sub(r'<!--\s*SECTION\s+0[.:]\s*NAVIGATION\s*-->', '', content)
    
    # Clean up multiple blank lines
    content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
    
    return content

def process_file(file_path):
    """Process a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        content = remove_custom_header(content)
        
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated: {file_path}")
            return True
        else:
            print(f"  No changes: {file_path}")
            return False
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function."""
    base_dir = Path(__file__).parent.parent
    pages_dir = base_dir / 'pages'
    
    # Files to process (HTML files in pages directory)
    html_files = []
    for ext in ['*.html', '*.htm']:
        html_files.extend(pages_dir.rglob(ext))
    
    # Filter out navigation.html (component file, not a page)
    html_files = [f for f in html_files if 'navigation.html' not in str(f)]
    
    print(f"Found {len(html_files)} HTML files to process\n")
    
    updated_count = 0
    for file_path in sorted(html_files):
        if process_file(file_path):
            updated_count += 1
    
    print(f"\n✓ Processed {len(html_files)} files, updated {updated_count} files")

if __name__ == '__main__':
    main()
