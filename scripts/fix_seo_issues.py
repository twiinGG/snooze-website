#!/usr/bin/env python3
"""
SEO Issues Fix Script
Fixes common SEO issues identified by Screaming Frog audit:
- Missing image alt attributes and text
- Missing image size attributes  
- Protocol-relative links (// to https://)
- target="_blank" without rel="noopener"
- Double slashes in URLs
"""

import os
import re
import sys
from pathlib import Path

# Base directory for kajabi deployment files
BASE_DIR = Path(__file__).parent.parent / "kajabi-deployment"

def fix_protocol_relative_links(content):
    """Fix protocol-relative links (//) to use https://"""
    # Fix src="// and href="//
    content = re.sub(r'(src|href)=["\']//', r'\1="https://', content)
    # Fix url(// in CSS
    content = re.sub(r'url\(//', r'url(https://', content)
    return content

def fix_double_slashes_in_urls(content):
    """Fix double slashes in URLs (but preserve http:// and https://)"""
    # Fix double slashes after domain in URLs, but preserve protocol slashes
    patterns = [
        (r'(https?://[^/]+)//+', r'\1/'),  # Fix after domain
        (r'([^:])//+([^/])', r'\1/\2'),   # Fix other double slashes
    ]
    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content)
    return content

def add_rel_noopener(content):
    """Add rel='noopener' to target='_blank' links that don't have it"""
    # Pattern to match target="_blank" without rel="noopener" or rel="noreferrer"
    pattern = r'<a([^>]*)\s+target=["\']_blank["\'](?![^>]*\s+rel=["\'][^"\']*noopener)'
    
    def add_noopener(match):
        attrs = match.group(1)
        # Check if rel already exists
        if 'rel=' in attrs:
            # Append to existing rel attribute
            attrs = re.sub(
                r'rel=["\']([^"\']*)["\']',
                lambda m: f'rel="{m.group(1)} noopener"',
                attrs
            )
        else:
            # Add new rel attribute
            attrs += ' rel="noopener"'
        return f'<a{attrs} target="_blank"'
    
    content = re.sub(pattern, add_noopener, content)
    return content

def fix_image_attributes(content, file_path):
    """Add missing image attributes where possible"""
    # Find all img tags
    img_pattern = r'<img([^>]*)>'
    
    def fix_img_tag(match):
        attrs = match.group(1)
        
        # Check if alt is missing or empty
        if 'alt=' not in attrs:
            # Try to extract filename from src for alt text
            src_match = re.search(r'src=["\']([^"\']+)["\']', attrs)
            if src_match:
                src = src_match.group(1)
                # Generate descriptive alt text from filename
                filename = os.path.basename(src).split('.')[0]
                alt_text = filename.replace('-', ' ').replace('_', ' ').title()
                attrs += f' alt="{alt_text}"'
        elif 'alt=""' in attrs:
            # If alt is empty, we should check if it's decorative or add description
            # For now, leave as is (decorative images)
            pass
        
        # Note: We can't automatically add width/height without knowing image dimensions
        # This would need manual intervention or image analysis
        
        return f'<img{attrs}>'
    
    content = re.sub(img_pattern, fix_img_tag, content)
    return content

def process_file(file_path):
    """Process a single file and fix SEO issues"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all fixes
        content = fix_protocol_relative_links(content)
        content = fix_double_slashes_in_urls(content)
        content = add_rel_noopener(content)
        content = fix_image_attributes(content, file_path)
        
        # Only write if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all HTML, CSS, and JS files"""
    files_fixed = 0
    files_processed = 0
    
    # File extensions to process
    extensions = ['.html', '.css', '.js']
    
    # Process all files in BASE_DIR
    for ext in extensions:
        for file_path in BASE_DIR.rglob(f'*{ext}'):
            # Skip backup files
            if '.backup' in str(file_path) or file_path.name.startswith('.'):
                continue
            
            files_processed += 1
            if process_file(file_path):
                files_fixed += 1
                print(f"Fixed: {file_path.relative_to(BASE_DIR)}")
    
    print(f"\nProcessed {files_processed} files, fixed {files_fixed} files")

if __name__ == '__main__':
    main()

