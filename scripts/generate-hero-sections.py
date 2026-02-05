#!/usr/bin/env python3
"""
Generate on-brand hero sections for all Snooze pages
Replaces Elfsight Google Reviews with impactful, trust-building hero content
"""

import json
import os
import sys

# Hero section specifications based on brand strategy
HERO_SECTIONS = {
    "newborn": {
        "headline": "Confident, calm newborn sleep.",
        "subheadline": "Step-by-step guidance from a paediatric nurse and certified sleep consultant to help you understand your newborn's sleep patterns and build healthy foundations.",
        "supporting_points": [
            "What you're experiencing is normal—newborns wake every 2-3 hours",
            "Evidence-based guidance that respects your baby's feeding needs",
            "A calm, flexible approach—no rigid schedules, just practical help"
        ],
        "emotional_hook": "You're not doing anything wrong. Your newborn's sleep is developing, and you can support that development with the right guidance.",
        "page_type": "age-specific"
    },
    "3-4-month": {
        "headline": "Turn the four-month regression into an opportunity.",
        "subheadline": "Your baby's sleep is permanently changing. This isn't scary—it's actually the perfect time to establish healthy sleep habits with clear, evidence-based support.",
        "supporting_points": [
            "Understand why your baby's sleep changed (it's permanent, not temporary)",
            "Learn when and how to start establishing sleep patterns",
            "Get step-by-step guidance from someone who's helped thousands of families"
        ],
        "emotional_hook": "The four-month regression doesn't have to be something you survive. It can be the moment everything changes for the better.",
        "page_type": "age-specific"
    },
    "5-12-month": {
        "headline": "Solve early rising and build consistent sleep.",
        "subheadline": "By now, your baby can learn independent sleep skills. Whether you're dealing with early rising, nap struggles, or frequent night wakings, we can help you make lasting changes.",
        "supporting_points": [
            "Early rising solved—the most common concern at this age",
            "Nap scheduling that works with your baby's development",
            "Sleep training readiness guidance—know when your baby is ready"
        ],
        "emotional_hook": "You've made it through the newborn phase. Now you can help your baby learn the skills for better sleep—and you can finally get some rest too.",
        "page_type": "age-specific"
    },
    "toddler": {
        "headline": "Navigate toddler sleep challenges with confidence.",
        "subheadline": "Bedtime battles, nap transitions, and boundary testing are all normal parts of toddler development. Understanding what's happening helps you know when to address it and when to wait it out.",
        "supporting_points": [
            "Bedtime battles—understand what's developmental vs. needs attention",
            "Nap transitions—know when and how to drop naps",
            "Boundary testing—normal behavior, not defiance"
        ],
        "emotional_hook": "Your toddler isn't being difficult. They're testing boundaries because they're developing. You can respond with confidence when you understand what's happening.",
        "page_type": "age-specific"
    },
    "3-4-month-course": {
        "headline": "The 3-4 Month Sleep Course",
        "subheadline": "Everything you need to navigate your baby's sleep changes during this crucial developmental window. This course is included in your Snooze membership, along with all other age guides, the Library, and The Village.",
        "supporting_points": [
            "Complete course covering schedules, settling, and troubleshooting",
            "Evidence-based strategies that work in real life",
            "Part of Snooze membership—get this course plus everything else"
        ],
        "emotional_hook": "For just $30 more than buying this course alone, you can get access to everything in Snooze for three months.",
        "page_type": "product"
    },
    "5-12-month-guide": {
        "headline": "The 5-12 Month Sleep Guide",
        "subheadline": "Comprehensive guidance for the most common sleep challenges at this age. Early rising, nap scheduling, and sleep training—all covered in one evidence-based guide. Included in Snooze membership.",
        "supporting_points": [
            "Early rising solutions—the most urgent concern for this age",
            "Nap scheduling that adapts to your baby's development",
            "Get this guide plus all other resources in Snooze membership"
        ],
        "emotional_hook": "This guide addresses the sleep challenges that matter most at this stage. Get it individually, or get everything in Snooze for just a little more.",
        "page_type": "product"
    },
    "newborn-guide": {
        "headline": "The Newborn Sleep Guide",
        "subheadline": "Your complete guide to understanding and supporting newborn sleep. Evidence-based strategies that respect your baby's feeding needs while helping you build healthy sleep foundations.",
        "supporting_points": [
            "Understand what's normal for newborns (it's not what you think)",
            "Create gentle routines that work with cluster feeding",
            "Part of Snooze membership—access all age guides and resources"
        ],
        "emotional_hook": "Newborn sleep doesn't have to be confusing. Get clear guidance you can trust, plus access to everything else in Snooze.",
        "page_type": "product"
    },
    "snooze-method": {
        "headline": "The Snooze Method",
        "subheadline": "The evidence-based foundation for everything we teach. Understand the principles, then apply them to any age or stage. This is where great baby sleep starts.",
        "supporting_points": [
            "The foundational principles of evidence-based sleep guidance",
            "Age-appropriate application of The Snooze Method",
            "Your starting point for comprehensive sleep support"
        ],
        "emotional_hook": "Before you tackle specific challenges, understand the foundation. The Snooze Method gives you the principles that apply to every stage.",
        "page_type": "foundational"
    },
    "library": {
        "headline": "The Snooze Library",
        "subheadline": "Everything you need for great baby sleep, all in one place. Age-specific guides, troubleshooting resources, and step-by-step courses—all organized by what you need, when you need it.",
        "supporting_points": [
            "Three-tiered learning path: Foundational, Age-Based, Troubleshooting",
            "All resources in one organized, searchable library",
            "Member access includes everything, updated regularly"
        ],
        "emotional_hook": "No more searching for answers. Everything you need is here, organized by age and challenge, ready when you are.",
        "page_type": "access"
    },
    "landing": {
        "headline": "Everything you need for great baby sleep, all in one place.",
        "subheadline": "Clear, evidence-based guidance for every age and stage. No confusion, no judgment, just practical help that works.",
        "supporting_points": [
            "Age-specific guidance from newborn through toddler",
            "Evidence-based strategies that work in real life",
            "Ongoing support through The Village community and live coaching"
        ],
        "emotional_hook": "You're not alone in this. Thousands of families have found better sleep with Snooze. You can too.",
        "page_type": "landing"
    }
}

def generate_hero_html(section_key, section_data):
    """Generate HTML for a hero section"""
    
    hero_class = f"snooze-hero-{section_data['page_type']}"
    
    html = f'''<!-- ============================================
     SNOOZE HERO SECTION - {section_key.upper()}
     Replaces Elfsight Google Reviews with on-brand, impactful hero
     ============================================ -->

<section class="{hero_class}" id="snooze-hero-{section_key}">
  <div class="sh-container">
    <div class="sh-content">
      <h1 class="sh-headline">{section_data['headline']}</h1>
      <p class="sh-subheadline">{section_data['subheadline']}</p>
      
      {generate_supporting_points(section_data.get('supporting_points', []))}
      
      <!-- Note: Add context-aware-cta.html component after this hero section -->
      <!-- Or include CTA inline if preferred -->
      
      {generate_trust_signal()}
    </div>
  </div>
</section>
'''
    return html

def generate_supporting_points(points):
    """Generate supporting points HTML"""
    if not points:
        return ""
    
    html = '<ul class="sh-supporting-points">\n'
    for point in points:
        # Replace em dashes with regular dashes (Tone of Voice compliance)
        point = point.replace('—', ' - ').replace('–', ' - ')
        html += f'  <li class="sh-point">{point}</li>\n'
    html += '</ul>\n'
    return html

def generate_trust_signal():
    """Generate trust signal (replaces Google Reviews widget)"""
    return '''      <div class="sh-trust-signal">
        <p class="sh-trust-text">
          <strong>Trusted by thousands of families.</strong> Evidence-based guidance from a paediatric nurse and certified sleep consultant who's helped over 10,000 families get better sleep.
        </p>
      </div>
'''

def generate_css():
    """Generate CSS for hero sections"""
    return '''/* ============================================
   SNOOZE HERO SECTIONS - On-Brand, Impactful
   Replaces Elfsight Google Reviews widgets
   ============================================ */

.snooze-hero-age-specific,
.snooze-hero-product,
.snooze-hero-foundational,
.snooze-hero-access,
.snooze-hero-landing {
  padding: 80px 0;
  background: var(--sn-cream, #FAF7F4);
  font-family: var(--sn-font-body, 'Poppins', sans-serif);
}

.sh-container {
  max-width: var(--sn-max-width, 1200px);
  margin: 0 auto;
  padding: 0 24px;
}

.sh-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.sh-headline {
  font-family: var(--sn-font-heading, 'Playfair Display', serif);
  font-size: 48px;
  font-weight: 700;
  color: var(--sn-text-dark, #161E2A);
  line-height: 1.2;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}

.sh-subheadline {
  font-size: 20px;
  line-height: 1.6;
  color: var(--sn-text-dark, #161E2A);
  margin-bottom: 32px;
  font-weight: 400;
}

.sh-supporting-points {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.sh-point {
  font-size: 17px;
  line-height: 1.7;
  color: var(--sn-text-dark, #161E2A);
  margin-bottom: 16px;
  padding-left: 32px;
  position: relative;
}

.sh-point:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--sn-coral, #F43357);
  font-weight: 700;
  font-size: 20px;
}

.sh-cta-wrapper {
  margin: 48px 0 40px 0;
}

.sh-trust-signal {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(31, 41, 59, 0.1);
}

.sh-trust-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--sn-text-light, #94A3B8);
  margin: 0;
}

.sh-trust-text strong {
  color: var(--sn-text-dark, #161E2A);
  font-weight: 600;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .snooze-hero-age-specific,
  .snooze-hero-product,
  .snooze-hero-foundational,
  .snooze-hero-access,
  .snooze-hero-landing {
    padding: 60px 0;
  }
  
  .sh-headline {
    font-size: 36px;
  }
  
  .sh-subheadline {
    font-size: 18px;
  }
  
  .sh-point {
    font-size: 16px;
    padding-left: 28px;
  }
  
  .sh-container {
    padding: 0 20px;
  }
}
'''

def main():
    """Generate all hero section files"""
    
    output_dir = "projects/snooze-website/kajabi-deployment/components/hero-sections"
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate individual hero HTML files
    for key, data in HERO_SECTIONS.items():
        html = generate_hero_html(key, data)
        filename = f"{output_dir}/hero-{key}.html"
        with open(filename, 'w') as f:
            f.write(html)
        print(f"✅ Generated: {filename}")
    
    # Generate CSS file
    css = generate_css()
    css_file = f"{output_dir}/hero-sections.css"
    with open(css_file, 'w') as f:
        f.write(css)
    print(f"✅ Generated: {css_file}")
    
    # Generate JSON manifest
    manifest = {
        "hero_sections": HERO_SECTIONS,
        "files": {
            "css": "hero-sections.css",
            "html_files": {key: f"hero-{key}.html" for key in HERO_SECTIONS.keys()}
        }
    }
    manifest_file = f"{output_dir}/hero-sections-manifest.json"
    with open(manifest_file, 'w') as f:
        json.dump(manifest, f, indent=2)
    print(f"✅ Generated: {manifest_file}")
    
    print("\n✨ All hero sections generated successfully!")
    print("\n📝 Next steps:")
    print("1. Review generated hero sections in kajabi-deployment/components/hero-sections/")
    print("2. Add CSS to phase1-navigation-footer.css or separate CSS file")
    print("3. Replace Elfsight Google Reviews widgets with new hero sections")
    print("4. Update deployment guides with hero section instructions")

if __name__ == "__main__":
    main()

