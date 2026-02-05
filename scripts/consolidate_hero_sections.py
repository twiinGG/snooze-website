#!/usr/bin/env python3
"""
Consolidate hero sections into complete page files
Keep only generic templates in hero-sections directory
"""

from pathlib import Path
import re

def load_file(file_path: Path) -> str:
    """Load file content"""
    if not file_path.exists():
        return ""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def build_complete_page(page_name: str, hero_content: str, additional_sections: list = None):
    """Build complete page from hero and other components"""
    base_path = Path(__file__).parent.parent / 'kajabi-deployment'
    
    navigation = load_file(base_path / 'navigation-code-block.html')
    footer = load_file(base_path / 'footer.html')
    context_cta = load_file(base_path / 'components' / 'context-aware-cta.html')
    
    # Remove <style> blocks from components
    components = [navigation, hero_content, context_cta, footer]
    if additional_sections:
        components.extend(additional_sections)
    
    cleaned_components = []
    for component in components:
        cleaned = re.sub(r'<style[^>]*>.*?</style>', '', component, flags=re.DOTALL)
        cleaned_components.append(cleaned)
    
    navigation, hero_content, context_cta, footer = cleaned_components[:4]
    additional_sections = cleaned_components[4:] if len(cleaned_components) > 4 else []
    
    # Build complete HTML
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Snooze - {page_name}</title>

<!-- Font Awesome CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Note: All styling comes from snooze-unified-theme.css -->
<!-- Deploy to: Kajabi Settings → Website → Theme → Custom CSS -->
</head>
<body>

<!-- ============================================
     SECTION 0: NAVIGATION
     ============================================ -->
{navigation}

<!-- ============================================
     SECTION 1: HERO SECTION
     ============================================ -->
{hero_content}

<!-- ============================================
     SECTION 2: CONTEXT-AWARE CTA
     ============================================ -->
{context_cta}
"""
    
    # Add additional sections if provided
    for i, section in enumerate(additional_sections, start=3):
        html += f"""
<!-- ============================================
     SECTION {i}: ADDITIONAL CONTENT
     ============================================ -->
{section}
"""
    
    html += f"""
<!-- ============================================
     SECTION {len(additional_sections) + 3}: FOOTER
     ============================================ -->
{footer}

</body>
</html>"""
    
    return html

if __name__ == '__main__':
    base_path = Path(__file__).parent.parent / 'kajabi-deployment'
    pages_dir = base_path / 'pages'
    pages_dir.mkdir(exist_ok=True)
    
    # Pages to create
    pages = {
        'library': {
            'hero_file': 'hero-library.html',
            'title': 'The Snooze Library'
        },
        'snooze-method': {
            'hero_file': 'hero-snooze-method.html',
            'title': 'The Snooze Method'
        },
        'newborn-guide': {
            'hero_file': 'hero-newborn-guide.html',
            'title': 'Newborn Sleep Guide'
        },
        '3-4-month-course': {
            'hero_file': 'hero-3-4-month-course.html',
            'title': '3-4 Month Sleep Course'
        },
        '5-12-month-guide': {
            'hero_file': 'hero-5-12-month-guide.html',
            'title': '5-12 Month Sleep Guide'
        }
    }
    
    hero_sections_dir = base_path / 'components' / 'hero-sections'
    
    for page_id, page_info in pages.items():
        hero_file = hero_sections_dir / page_info['hero_file']
        if not hero_file.exists():
            print(f"⚠️  Hero file not found: {hero_file}")
            continue
        
        hero_content = load_file(hero_file)
        # Add CTA to hero if not present
        if 'hero-cta-location' not in hero_content:
            # Insert CTA before trust signal
            cta_script = """
      <!-- Context-Aware CTA -->
      <div id="hero-cta-location" class="sh-cta-container"></div>
      <script>
      (function() {
        if (typeof window.SNOOZE_CHECKOUT_URL === 'undefined') {
          window.SNOOZE_CHECKOUT_URL = 'https://joinsnooze.com/offers/6iRarwak/checkout';
        }
        if (typeof window.SNOOZE_LIBRARY_URL === 'undefined') {
          window.SNOOZE_LIBRARY_URL = 'https://joinsnooze.com/products/communities/v2/snooze/library';
        }
        var userStatus = 'signposting';
        if (typeof window.SnoozeUserDetection !== 'undefined') {
          userStatus = window.SnoozeUserDetection.getUserStatus();
        }
        var heroCta = document.getElementById('hero-cta-location');
        if (heroCta) {
          var ctaHTML = '';
          if (userStatus === 'snooze-member') {
            ctaHTML = '<a href="' + window.SNOOZE_LIBRARY_URL + '" class="snooze-btn-primary">Go to Library</a>';
          } else if (userStatus === 'logged-in-non-member') {
            ctaHTML = '<a href="' + window.SNOOZE_CHECKOUT_URL + '" class="snooze-btn-primary">Upgrade to Snooze</a>';
          } else {
            ctaHTML = '<a href="' + window.SNOOZE_CHECKOUT_URL + '" class="snooze-btn-primary">Join Snooze</a>';
          }
          heroCta.innerHTML = ctaHTML;
        }
      })();
      </script>
      
"""
            if 'sh-trust-signal' in hero_content:
                hero_content = hero_content.replace('<div class="sh-trust-signal">', cta_script + '      <div class="sh-trust-signal">', 1)
            else:
                hero_content = hero_content.replace('</div>\n  </div>\n</section>', cta_script + '    </div>\n  </div>\n</section>', 1)
        
        complete_html = build_complete_page(page_info['title'], hero_content)
        
        output_file = pages_dir / f'{page_id}-page-complete.html'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(complete_html)
        
        print(f"✅ Created: {output_file}")


