#!/usr/bin/env python3
"""
Merge About Sally Page Sections into Complete HTML File

This script combines all About Sally section files into a single unified HTML file
ready for deployment to Kajabi as a single code block.

Usage:
    python3 scripts/merge_about_sally_sections.py
"""

import re
from pathlib import Path
from datetime import datetime

def load_file(file_path: Path) -> str:
    """Load file content"""
    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def remove_style_blocks(content: str) -> str:
    """Remove <style> blocks from content (CSS is in global theme file)"""
    return re.sub(r'<style[^>]*>.*?</style>', '', content, flags=re.DOTALL | re.IGNORECASE)

def build_complete_about_sally_page():
    """Build complete About Sally page from all section files"""
    
    # Script is in projects/snooze-website/scripts/
    # Base is projects/snooze-website/kajabi-deployment/
    script_dir = Path(__file__).parent
    base_path = script_dir.parent / 'kajabi-deployment'
    
    about_sally_dir = base_path / 'pages' / 'about-sally'
    
    # Load navigation and footer
    navigation = load_file(base_path / 'pages' / 'navigation.html')
    footer = load_file(base_path / 'pages' / 'footer.html')
    
    # Load all section files in order
    sections = []
    section_files = [
        'section-01-hero.html',
        'section-02-story.html',
        'section-03-philosophy.html',
        'section-04-credentials.html',
        'section-05-cta.html'
    ]
    
    for section_file in section_files:
        section_path = about_sally_dir / section_file
        section_content = load_file(section_path)
        sections.append(section_content)
    
    # Remove style blocks from all components
    navigation = remove_style_blocks(navigation)
    footer = remove_style_blocks(footer)
    sections = [remove_style_blocks(section) for section in sections]
    
    # Build complete HTML
    current_date = datetime.now().strftime("%B %d, %Y")
    
    html = f"""<!-- ============================================
     ABOUT SALLY PAGE - COMPLETE HTML
     Version 2.0 (Unified)
     Date: {current_date}
     
     This file contains all sections merged into one complete HTML file.
     Deploy this entire file as a single Code Block in Kajabi.
     
     Note: Navigation and Footer are included. If you're using global
     navigation/footer, you can remove those sections from this file.
     ============================================ -->

<!-- ============================================
     SECTION 0: NAVIGATION
     ============================================ -->
{navigation}

<!-- ============================================
     SECTION 1: HERO
     ============================================ -->
{sections[0]}

<!-- ============================================
     SECTION 2: STORY
     ============================================ -->
{sections[1]}

<!-- ============================================
     SECTION 3: PHILOSOPHY
     ============================================ -->
{sections[2]}

<!-- ============================================
     SECTION 4: CREDENTIALS
     ============================================ -->
{sections[3]}

<!-- ============================================
     SECTION 5: CTA
     ============================================ -->
{sections[4]}

<!-- ============================================
     SECTION 6: FOOTER
     ============================================ -->
{footer}
"""
    
    # Save complete file
    output_path = about_sally_dir / 'about-sally-complete.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"✅ Complete About Sally page created: {output_path}")
    print(f"   Sections merged: {len(sections)}")
    print(f"   Total size: {len(html)} characters")
    
    return output_path

if __name__ == '__main__':
    try:
        output_path = build_complete_about_sally_page()
        print(f"\n🎉 Success! Ready for deployment.")
        print(f"   File: {output_path}")
        print(f"   Deploy as a single Code Block in Kajabi")
    except Exception as e:
        print(f"❌ Error: {e}")
        raise

