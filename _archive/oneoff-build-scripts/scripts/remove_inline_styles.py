#!/usr/bin/env python3
"""
Remove inline styles from generated HTML files
These files should use snooze-unified-theme.css instead
"""

import re
from pathlib import Path

def remove_inline_styles(file_path: Path):
    """Remove all <style> blocks from HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all <style>...</style> blocks (including multiline)
    content = re.sub(r'<style[^>]*>.*?</style>', '', content, flags=re.DOTALL)
    
    # Remove any remaining style attributes
    content = re.sub(r'\s*style\s*=\s*["\'][^"\']*["\']', '', content)
    
    # Clean up extra blank lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    # Write cleaned content
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Removed inline styles from {file_path}")

if __name__ == '__main__':
    base_path = Path(__file__).parent.parent / 'kajabi-deployment' / 'age-pages'
    
    files = [
        'newborn-page-complete.html',
        '3-4-month-page-complete.html',
        '5-12-month-page-complete.html',
        'toddler-page-complete.html'
    ]
    
    for filename in files:
        file_path = base_path / filename
        if file_path.exists():
            remove_inline_styles(file_path)
        else:
            print(f"⚠️  File not found: {file_path}")

