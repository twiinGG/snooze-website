#!/usr/bin/env python3
"""
Clean generated HTML files by removing markdown code blocks and intro text
"""

import sys
from pathlib import Path

def clean_html_file(file_path: Path):
    """Remove markdown code blocks and intro text from HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the actual HTML start (look for <!DOCTYPE or <html)
    lines = content.split('\n')
    html_start_idx = -1
    
    for i, line in enumerate(lines):
        if '<!DOCTYPE' in line or '<html' in line:
            html_start_idx = i
            break
    
    if html_start_idx >= 0:
        # Extract HTML content starting from DOCTYPE
        html_content = '\n'.join(lines[html_start_idx:])
        
        # Remove any markdown code block markers
        html_content = html_content.replace('```html', '').replace('```', '').strip()
        
        content = html_content
    else:
        # Fallback: just remove markdown markers
        content = content.replace('```html', '').replace('```', '').strip()
    
    # Write cleaned content
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Cleaned {file_path}")

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
            clean_html_file(file_path)
        else:
            print(f"⚠️  File not found: {file_path}")
