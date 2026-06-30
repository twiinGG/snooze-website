#!/usr/bin/env python3
"""
Build complete age page HTML files using actual component files
No Gemini - just combines the real components together
"""

from pathlib import Path

def load_file(file_path: Path) -> str:
    """Load file content"""
    if not file_path.exists():
        print(f"⚠️  File not found: {file_path}")
        return ""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def build_complete_page(age: str):
    """Build complete page from actual components"""
    # Script is in projects/snooze-website/scripts/
    # Base is projects/snooze-website/kajabi-deployment/
    script_dir = Path(__file__).parent
    base_path = script_dir.parent / 'kajabi-deployment'
    
    # Load all components
    navigation = load_file(base_path / 'navigation-code-block.html')
    
    # Hero sections are now integrated into complete pages
    # Extract from existing complete page if rebuilding, or create from template
    complete_page_path = base_path / 'age-pages' / f'{age}-page-complete.html'
    if complete_page_path.exists():
        # Extract hero section from existing complete page
        complete_content = load_file(complete_page_path)
        import re
        hero_match = re.search(
            r'(<!-- ============================================\s*SECTION 1: HERO SECTION.*?</section>)',
            complete_content,
            re.DOTALL
        )
        if hero_match:
            hero = hero_match.group(1)
            # Remove the section comment
            hero = re.sub(r'<!-- ============================================\s*SECTION 1: HERO SECTION.*?============================================ -->', '', hero, flags=re.DOTALL)
        else:
            # Fallback: create minimal hero
            hero = f"""<section class="snooze-hero-age-specific" id="snooze-hero-{age}">
  <div class="sh-container">
    <div class="sh-content">
      <h1 class="sh-headline">Hero section for {age}</h1>
    </div>
  </div>
</section>"""
    else:
        # No complete page exists, create minimal
        hero = f"""<section class="snooze-hero-age-specific" id="snooze-hero-{age}">
  <div class="sh-container">
    <div class="sh-content">
      <h1 class="sh-headline">Hero section for {age}</h1>
    </div>
  </div>
</section>"""
    
    # Understanding sections are now integrated directly into complete pages
    # Extract from existing complete page if rebuilding, or use simplified template
    # For rebuilding, we'll extract from the existing complete page
    complete_page_path = base_path / 'age-pages' / f'{age}-page-complete.html'
    if complete_page_path.exists():
        # Extract understanding section from existing complete page
        complete_content = load_file(complete_page_path)
        import re
        understanding_match = re.search(
            r'(<!-- ============================================\s*UNDERSTANDING SECTION.*?</section>)',
            complete_content,
            re.DOTALL
        )
        if understanding_match:
            understanding = understanding_match.group(1)
        else:
            # Fallback: create minimal understanding section
            understanding = f"""<section class="snooze-understanding-section" data-age="{age}">
  <div class="snooze-container">
    <div class="snooze-understanding-header">
      <h2 class="snooze-section-title">Understanding {age.replace('-', ' ').title()} Sleep</h2>
    </div>
  </div>
</section>"""
    else:
        # No complete page exists, create minimal
        understanding = f"""<section class="snooze-understanding-section" data-age="{age}">
  <div class="snooze-container">
    <div class="snooze-understanding-header">
      <h2 class="snooze-section-title">Understanding {age.replace('-', ' ').title()} Sleep</h2>
    </div>
  </div>
</section>"""
    
    context_cta = load_file(base_path / 'components' / 'context-aware-cta.html')
    whats_in_snooze = load_file(base_path / 'components' / 'whats-in-snooze.html')
    value_comparison = load_file(base_path / 'components' / 'value-comparison.html')
    age_cross_linking = load_file(base_path / 'components' / 'age-cross-linking.html')
    footer = load_file(base_path / 'footer.html')
    
    # Customize "What's in Snooze" intro text based on age
    age_names = {
        'newborn': 'Newborn Sleep Guide',
        '3-4-month': '3-4 Month Sleep Course',
        '5-12-month': '5-12 Month Sleep Guide',
        'toddler': 'Toddler Sleep Guide'
    }
    age_name = age_names.get(age, 'Sleep Guide')
    
    # Replace intro text in whats_in_snooze
    whats_in_snooze = whats_in_snooze.replace(
        'This resource is included',
        f'This <strong>{age_name}</strong> is included'
    )
    
    # Customize value comparison pricing
    pricing = {
        'newborn': {'product': '$67', 'type': 'Guide', 'diff': '$80'},
        '3-4-month': {'product': '$117', 'type': 'Course', 'diff': '$30'},
        '5-12-month': {'product': '$67', 'type': 'Guide', 'diff': '$80'},
        'toddler': {'product': '$117', 'type': 'Course', 'diff': '$30'}
    }
    price_info = pricing.get(age, pricing['newborn'])
    
    # Update value comparison pricing
    value_comparison = value_comparison.replace(
        '<span class="snooze-price-amount" data-product-price="$117">$117</span>',
        f'<span class="snooze-price-amount" data-product-price="{price_info["product"]}">{price_info["product"]}</span>'
    )
    value_comparison = value_comparison.replace(
        'Individual Course',
        f'{age_name} Only'
    )
    value_comparison = value_comparison.replace(
        'For just $30 more',
        f'For just {price_info["diff"]} more'
    )
    
    # Mark current age in cross-linking
    age_attrs = {
        'newborn': 'data-age="newborn"',
        '3-4-month': 'data-age="3-4month"',
        '5-12-month': 'data-age="5-12month"',
        'toddler': 'data-age="toddler"'
    }
    current_age_attr = age_attrs.get(age, '')
    if current_age_attr:
        # Add data-current-age to the matching card
        age_cross_linking = age_cross_linking.replace(
            f'{current_age_attr}>',
            f'{current_age_attr} data-current-age="true">'
        )
    
    # Remove all <style> blocks from components (they should use unified theme CSS)
    import re
    components = [navigation, hero, understanding, context_cta, whats_in_snooze, value_comparison, age_cross_linking, footer]
    cleaned_components = []
    for component in components:
        # Remove <style>...</style> blocks
        cleaned = re.sub(r'<style[^>]*>.*?</style>', '', component, flags=re.DOTALL)
        cleaned_components.append(cleaned)
    
    navigation, hero, understanding, context_cta, whats_in_snooze, value_comparison, age_cross_linking, footer = cleaned_components
    
    # Hero sections already have CTA injected, so no need to add it again
    
    # Build complete HTML
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Snooze - {age_name}</title>

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
{hero}

<!-- ============================================
     SECTION 2: UNDERSTANDING SECTION
     ============================================ -->
{understanding}

<!-- ============================================
     SECTION 3: CONTEXT-AWARE CTA
     ============================================ -->
{context_cta}

<!-- ============================================
     SECTION 4: "WHAT'S IN SNOOZE" SECTION
     ============================================ -->
{whats_in_snooze}

<!-- ============================================
     SECTION 5: VALUE COMPARISON SECTION
     ============================================ -->
{value_comparison}

<!-- ============================================
     SECTION 6: AGE CROSS-LINKING SECTION
     ============================================ -->
{age_cross_linking}

<!-- ============================================
     SECTION 7: FOOTER
     ============================================ -->
{footer}

</body>
</html>"""
    
    # Save file
    output_path = base_path / 'age-pages' / f'{age}-page-complete.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"✅ Built complete page: {output_path}")

if __name__ == '__main__':
    ages = ['newborn', '3-4-month', '5-12-month', 'toddler']
    for age in ages:
        build_complete_page(age)

