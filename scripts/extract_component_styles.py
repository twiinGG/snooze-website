#!/usr/bin/env python3
"""
Extract CSS from component files and add to unified theme CSS
"""

import re
from pathlib import Path

def extract_css_from_file(file_path: Path) -> str:
    """Extract CSS from <style> blocks"""
    if not file_path.exists():
        return ""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract all <style> blocks
    styles = re.findall(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
    if styles:
        return '\n\n'.join(styles)
    return ""

def main():
    base_path = Path(__file__).parent.parent / 'kajabi-deployment'
    unified_css_path = base_path / 'snooze-unified-theme.css'
    
    # Extract CSS from all component files
    components = {
        'whats-in-snooze': base_path / 'components' / 'whats-in-snooze.html',
        'value-comparison': base_path / 'components' / 'value-comparison.html',
        'age-cross-linking': base_path / 'components' / 'age-cross-linking.html',
        'context-aware-cta': base_path / 'components' / 'context-aware-cta.html',
        # Understanding sections are now integrated into complete pages
        # 'understanding-newborn': base_path / 'age-pages' / 'understanding-section-newborn.html',  # DELETED - integrated into complete pages
    }
    
    all_css = []
    for name, file_path in components.items():
        css = extract_css_from_file(file_path)
        if css:
            all_css.append(f"/* ============================================\n   {name.upper().replace('-', ' ')} STYLES\n   ============================================ */\n{css}")
            print(f"✅ Extracted CSS from {name}")
    
    # Read current unified CSS
    with open(unified_css_path, 'r', encoding='utf-8') as f:
        current_css = f.read()
    
    # Check if component styles already exist
    if '.snooze-whats-included' in current_css:
        print("⚠️  Component styles already exist in unified theme CSS")
        return
    
    # Append component styles
    component_section = f"\n\n/* ============================================\n   COMPONENT STYLES\n   What's in Snooze, Value Comparison, Age Cross-Linking, Context CTA, Understanding Sections\n   ============================================ */\n\n" + '\n\n'.join(all_css)
    
    with open(unified_css_path, 'a', encoding='utf-8') as f:
        f.write(component_section)
    
    print(f"✅ Added component styles to {unified_css_path}")

if __name__ == '__main__':
    main()

