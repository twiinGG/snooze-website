#!/usr/bin/env python3
"""
Update all Snooze Library URLs to use /snooze-library slug
"""

from pathlib import Path
import re

def update_file(file_path: Path):
    """Update library URLs in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace full URL with slug
        content = re.sub(
            r'https://www\.sleepconcierge\.com\.au/products/communities/v2/snooze/library',
            '/snooze-library',
            content
        )
        
        # Replace JavaScript variable assignment
        content = re.sub(
            r"window\.SNOOZE_LIBRARY_URL\s*=\s*['\"]https://www\.sleepconcierge\.com\.au/products/communities/v2/snooze/library['\"]",
            "window.SNOOZE_LIBRARY_URL = '/snooze-library'",
            content
        )
        
        # Replace fallback URLs in JavaScript
        content = re.sub(
            r"window\.SNOOZE_LIBRARY_URL\s*\|\|\s*['\"]https://www\.sleepconcierge\.com\.au/products/communities/v2/snooze/library['\"]",
            "window.SNOOZE_LIBRARY_URL || '/snooze-library'",
            content
        )
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

if __name__ == '__main__':
    base_path = Path(__file__).parent.parent / 'kajabi-deployment'
    
    # Find all HTML and JS files
    files_to_update = []
    for pattern in ['**/*.html', '**/*.js', '**/*.md']:
        files_to_update.extend(base_path.glob(pattern))
    
    updated_count = 0
    for file_path in files_to_update:
        if update_file(file_path):
            print(f"✅ Updated: {file_path.relative_to(base_path)}")
            updated_count += 1
    
    print(f"\n✨ Updated {updated_count} files")


