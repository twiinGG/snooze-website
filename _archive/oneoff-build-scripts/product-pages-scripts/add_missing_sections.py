#!/usr/bin/env python3
"""
Add missing sections to generated product landing pages.
Adds: How to Use, Is This Right For You, Success Stories, Value Comparison,
What's in Snooze, FAQ, Your Sleep Coach (trust-section), Related Resources
"""

from pathlib import Path
import re

# Course configurations
COURSES = {
    "5-12-month-guide-landing-page.html": {
        "name": "5-12 Month Course",
        "url": "https://joinsnooze.com/5-12-month-baby-sleep-course",
        "age_range": "5-12 months",
        "modules": 6,
        "lessons": 23,
        "related_links": {
            "The Snooze Method": "https://joinsnooze.com/snooze-method",
            "Newborn Sleep Guide": "https://joinsnooze.com/newborn-sleep-guide",
            "3-4 Month Course": "https://joinsnooze.com/3-4-month-baby-sleep-course",
            "Toddler Toolkit": "https://joinsnooze.com/toddler-toolkit",
            "Sleep Library": "https://joinsnooze.com/products/communities/v2/snooze/library"
        }
    },
    "toddler-toolkit-landing-page.html": {
        "name": "Toddler Toolkit",
        "url": "https://joinsnooze.com/toddler-toolkit",
        "age_range": "12+ months",
        "modules": 7,
        "lessons": 25,
        "related_links": {
            "The Snooze Method": "https://joinsnooze.com/snooze-method",
            "Newborn Sleep Guide": "https://joinsnooze.com/newborn-sleep-guide",
            "3-4 Month Course": "https://joinsnooze.com/3-4-month-baby-sleep-course",
            "5-12 Month Course": "https://joinsnooze.com/5-12-month-baby-sleep-course",
            "Sleep Library": "https://joinsnooze.com/products/communities/v2/snooze/library"
        }
    },
    "snooze-method-landing-page.html": {
        "name": "The Snooze Method",
        "url": "https://joinsnooze.com/snooze-method",
        "age_range": "All ages",
        "modules": 4,
        "lessons": 16,
        "related_links": {
            "Newborn Sleep Guide": "https://joinsnooze.com/newborn-sleep-guide",
            "3-4 Month Course": "https://joinsnooze.com/3-4-month-baby-sleep-course",
            "5-12 Month Course": "https://joinsnooze.com/5-12-month-baby-sleep-course",
            "Toddler Toolkit": "https://joinsnooze.com/toddler-toolkit",
            "Sleep Library": "https://joinsnooze.com/products/communities/v2/snooze/library"
        }
    },
    "newborn-guide-landing-page.html": {
        "name": "Newborn Sleep Guide",
        "url": "https://joinsnooze.com/newborn-sleep-guide",
        "age_range": "0-3 months",
        "modules": 9,
        "lessons": "9 sections",
        "related_links": {
            "The Snooze Method": "https://joinsnooze.com/snooze-method",
            "3-4 Month Course": "https://joinsnooze.com/3-4-month-baby-sleep-course",
            "5-12 Month Course": "https://joinsnooze.com/5-12-month-baby-sleep-course",
            "Toddler Toolkit": "https://joinsnooze.com/toddler-toolkit",
            "Sleep Library": "https://joinsnooze.com/products/communities/v2/snooze/library"
        }
    }
}

SCRIPT_DIR = Path(__file__).parent
PAGES_DIR = SCRIPT_DIR.parent / "generated-html-pages"

def generate_how_to_use_section():
    return """<!-- ============================================
     SECTION 5: HOW TO USE THIS COURSE
     ============================================ -->
<section class="course-section-light course-howto-section">
  <div class="course-container">
    <h2 class="course-section-title course-section-title-dark">How to Use This Course</h2>
    <p class="course-section-intro course-section-intro-dark">
      Practical guidance on getting the most out of this course. Learn at your own pace and reference back as needed.
    </p>
    
    <div class="course-howto-grid">
      <div class="course-howto-card">
        <h4 class="course-howto-title">Self-Paced Learning</h4>
        <p class="course-howto-desc">Complete the course at your own speed. Some parents finish in one session, others prefer to work through modules over several days or weeks. There's no deadline or rush.</p>
      </div>
      
      <div class="course-howto-card">
        <h4 class="course-howto-title">Recommended Order</h4>
        <p class="course-howto-desc">Modules are designed to be completed sequentially, as each builds on the previous. However, you can jump to specific topics if you have urgent questions. All content remains available for reference.</p>
      </div>
      
      <div class="course-howto-card">
        <h4 class="course-howto-title">Implementation Timeline</h4>
        <p class="course-howto-desc">You can start implementing strategies immediately, even while still watching lessons. Many parents begin with environment setup and routines, then move to settling techniques when ready.</p>
      </div>
      
      <div class="course-howto-card">
        <h4 class="course-howto-title">Reference Back Anytime</h4>
        <p class="course-howto-desc">All course content remains accessible for lifetime. Reference specific lessons, download resources again, or review modules as your baby grows and changes.</p>
      </div>
    </div>
  </div>
</section>"""

def generate_right_for_you_section(course_config):
    name = course_config["name"]
    age_range = course_config["age_range"]
    
    # Determine alternative courses based on age range
    if "5-12" in name:
        alt1 = "Newborn Sleep Guide"
        alt2 = "Toddler Toolkit"
        alt1_url = "https://joinsnooze.com/newborn-sleep-guide"
        alt2_url = "https://joinsnooze.com/toddler-toolkit"
    elif "Toddler" in name:
        alt1 = "5-12 Month Course"
        alt2 = "3-4 Month Course"
        alt1_url = "https://joinsnooze.com/5-12-month-baby-sleep-course"
        alt2_url = "https://joinsnooze.com/3-4-month-baby-sleep-course"
    elif "Newborn" in name:
        alt1 = "3-4 Month Course"
        alt2 = "5-12 Month Course"
        alt1_url = "https://joinsnooze.com/3-4-month-baby-sleep-course"
        alt2_url = "https://joinsnooze.com/5-12-month-baby-sleep-course"
    else:  # Snooze Method
        alt1 = "Newborn Sleep Guide"
        alt2 = "3-4 Month Course"
        alt1_url = "https://joinsnooze.com/newborn-sleep-guide"
        alt2_url = "https://joinsnooze.com/3-4-month-baby-sleep-course"
    
    return f"""<!-- ============================================
     SECTION 6: IS THIS COURSE RIGHT FOR YOU?
     ============================================ -->
<section class="course-section-dark course-rightforyou-section">
  <div class="course-container">
    <h2 class="course-section-title">Is This Course Right for You?</h2>
    <p class="course-section-intro">
      This course is designed for parents of babies {age_range} who are experiencing sleep challenges or want to prepare for upcoming changes.
    </p>
    
    <ul class="course-assessment-list">
      <li class="course-assessment-item">
        <strong>Best for:</strong> Babies {age_range} experiencing sleep challenges, or parents wanting to build better sleep foundations.
      </li>
      <li class="course-assessment-item">
        <strong>Time commitment:</strong> Self-paced learning. Estimated 2-4 hours to complete all content, but can be spread over days or weeks.
      </li>
      <li class="course-assessment-item">
        <strong>What you'll need:</strong> Willingness to implement strategies, time to complete checklists, and patience as changes take time to establish.
      </li>
      <li class="course-assessment-item">
        <strong>Not the right fit?</strong> If your baby is outside the {age_range} window, check out our <a href="{alt1_url}" class="course-link">{alt1}</a> or <a href="{alt2_url}" class="course-link">{alt2}</a> instead.
      </li>
    </ul>
  </div>
</section>"""

def generate_success_stories_section():
    return """<!-- ============================================
     SECTION 6.5: SUCCESS STORIES / REVIEWS
     ============================================ -->
<section class="course-section-light course-reviews-section">
  <div class="course-container">
    <p class="course-outcome-refrain">This course helps parents improve their baby's sleep with evidence-based strategies.</p>
    <h2 class="course-section-title course-section-title-dark">Success Stories</h2>
    <div class="course-reviews-grid">
      <!-- Review Card 1 -->
      <div class="course-review-card">
        <div class="course-review-header">
          <div class="course-review-stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
        <blockquote class="course-review-quote">
          "We completed the course and with Sally's guidance, successfully achieved our baby to <strong>independently put themselves to sleep</strong> and sleep through the night. Can't recommend enough!"
        </blockquote>
        <div class="course-review-author">
          <div class="course-author-name">Brinlee</div>
        </div>
      </div>

      <!-- Review Card 2 -->
      <div class="course-review-card">
        <div class="course-review-header">
          <div class="course-review-stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
        <blockquote class="course-review-quote">
          "I found Sally on TikTok and really loved her more gentle, reasonable, and realistic approach. Once we started her course, we saw a <strong>massive improvement</strong>. Some nights our baby sleeps 11-12 hours!"
        </blockquote>
        <div class="course-review-author">
          <div class="course-author-name">Emma</div>
        </div>
      </div>

      <!-- Review Card 3 -->
      <div class="course-review-card">
        <div class="course-review-header">
          <div class="course-review-stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
        <blockquote class="course-review-quote">
          "Can't thank Sally enough for her guidance. I followed her course and saw a massive improvement. The <strong>strategies actually work</strong> in real life!"
        </blockquote>
        <div class="course-review-author">
          <div class="course-author-name">Jacqueline</div>
        </div>
      </div>
    </div>
  </div>
</section>"""

def generate_value_comparison_section(course_config):
    name = course_config["name"]
    url = course_config["url"]
    return f"""<!-- ============================================
     SECTION 7: VALUE COMPARISON - INDIVIDUAL VS MEMBERSHIP
     ============================================ -->
<section id="course-access" class="course-section-light course-value-comparison-section">
  <div class="course-container">
    <h2 class="course-section-title course-section-title-dark">Get This + Everything Else</h2>
    <p class="course-section-intro course-section-intro-dark">
      For just a little more than a single course, you get access to everything in Snooze.
    </p>
    
    <div class="course-comparison-grid">
      <!-- Individual Product -->
      <div class="course-comparison-card course-comparison-individual">
        <div class="course-comparison-header">
          <h3>Individual Course</h3>
          <div class="course-price">
            <span class="course-price-amount">$117</span>
            <span class="course-price-note">one-time</span>
          </div>
        </div>
        <ul class="course-comparison-features">
          <li><i class="fa-solid fa-check"></i> This course only</li>
          <li><i class="fa-solid fa-check"></i> Lifetime access to this course</li>
          <li><i class="fa-solid fa-xmark"></i> No access to other age guides</li>
          <li><i class="fa-solid fa-xmark"></i> No Library access</li>
          <li><i class="fa-solid fa-xmark"></i> No Village community</li>
          <li><i class="fa-solid fa-xmark"></i> No live coaching</li>
        </ul>
        <div class="course-comparison-cta">
          <a href="{url}" class="course-btn-primary">Purchase Course</a>
        </div>
      </div>
      
      <!-- VS Divider -->
      <div class="course-comparison-vs">
        <div class="course-vs-line"></div>
        <div class="course-vs-text">vs</div>
        <div class="course-vs-line"></div>
      </div>
      
      <!-- Snooze Membership -->
      <div class="course-comparison-card course-comparison-membership">
        <div class="course-comparison-badge">Best Value</div>
        <div class="course-comparison-header">
          <h3>Snooze Membership</h3>
          <div class="course-price">
            <span class="course-price-amount">$147</span>
            <span class="course-price-period">/quarter</span>
            <span class="course-price-note">Launch pricing</span>
          </div>
        </div>
        <ul class="course-comparison-features">
          <li><i class="fa-solid fa-check"></i> This course included</li>
          <li><i class="fa-solid fa-check"></i> All age guides (newborn through toddler)</li>
          <li><i class="fa-solid fa-check"></i> Complete Library access</li>
          <li><i class="fa-solid fa-check"></i> The Village community</li>
          <li><i class="fa-solid fa-check"></i> Weekly live coaching with Sally</li>
          <li><i class="fa-solid fa-check"></i> Member pricing on consultations</li>
        </ul>
        <div class="course-comparison-cta">
          <a href="https://joinsnooze.com/offers/6iRarwak/checkout" class="course-btn-primary course-btn-large">
            Join Snooze
          </a>
          <p class="course-comparison-note">For just $30 more, you get everything</p>
        </div>
      </div>
    </div>
    
    <!-- Value Message -->
    <div class="course-value-message">
      <p><strong>Individual courses:</strong> $117-$129 each</p>
      <p><strong>Snooze Membership:</strong> $147/quarter (Launch) - Get all courses + Library + Village + Coaching</p>
      <p class="course-value-highlight">For just $30 more than a single course, you get everything.</p>
    </div>
  </div>
</section>"""

def generate_whats_in_snooze_section(course_config):
    name = course_config["name"]
    return f"""<!-- ============================================
     SECTION 7.5: WHAT'S IN SNOOZE
     ============================================ -->
<section class="course-section-dark course-whats-in-snooze-section">
  <div class="course-container">
    <h2 class="course-section-title">What's in Snooze</h2>
    <p class="course-section-intro">
      This course is included in your Snooze membership, along with everything else you need for great sleep.
    </p>
    
    <div class="course-whats-included-grid">
      <!-- Card 1: This Course -->
      <div class="course-whats-card">
        <div class="course-whats-icon">
          <i class="fa-solid fa-book"></i>
        </div>
        <h3>This Course</h3>
        <p>Complete, step-by-step guidance for navigating your baby's sleep challenges.</p>
      </div>
      
      <!-- Card 2: All Age Guides -->
      <div class="course-whats-card">
        <div class="course-whats-icon">
          <i class="fa-solid fa-baby"></i>
        </div>
        <h3>All Age Guides</h3>
        <p>Newborn, 3-4 months, 5-12 months, and toddler sleep help—all in one place.</p>
      </div>
      
      <!-- Card 3: Library -->
      <div class="course-whats-card">
        <div class="course-whats-icon">
          <i class="fa-solid fa-book-open"></i>
        </div>
        <h3>Complete Library</h3>
        <p>Foundational courses, troubleshooting guides, and downloadable resources.</p>
      </div>
      
      <!-- Card 4: Village -->
      <div class="course-whats-card">
        <div class="course-whats-icon">
          <i class="fa-solid fa-users"></i>
        </div>
        <h3>The Village</h3>
        <p>Supportive community of parents sharing wins, encouragement, and connection.</p>
      </div>
      
      <!-- Card 5: Live Coaching -->
      <div class="course-whats-card">
        <div class="course-whats-icon">
          <i class="fa-solid fa-video"></i>
        </div>
        <h3>Live Coaching</h3>
        <p>Weekly Q&A sessions with Sally, plus replay library of past sessions.</p>
      </div>
      
      <!-- Card 6: Member Pricing -->
      <div class="course-whats-card">
        <div class="course-whats-icon">
          <i class="fa-solid fa-tag"></i>
        </div>
        <h3>Member Pricing</h3>
        <p>Discounted rates on 1:1 consultations and premium support services.</p>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="course-whats-included-cta">
      <div id="snooze-whats-included-cta">
        <!-- Context-aware CTA will be inserted here -->
      </div>
    </div>
  </div>
</section>"""

def generate_faq_section():
    return """<!-- ============================================
     SECTION 8: FAQ
     ============================================ -->
<section class="course-section-dark course-faq-section">
  <div class="course-container">
    <h2 class="course-section-title">Frequently Asked Questions</h2>
    
    <div class="course-faq-list">
      <div class="course-faq-item">
        <div class="course-faq-question">How do I access the course after purchase?</div>
        <div class="course-faq-answer">You'll receive an email with login instructions immediately after purchase. The course will appear in your account library, accessible anytime from any device.</div>
      </div>
      
      <div class="course-faq-item">
        <div class="course-faq-question">Can I download the content?</div>
        <div class="course-faq-answer">All PDF resources are downloadable. Video and written lessons are accessible online through your account, allowing you to reference them anytime.</div>
      </div>
      
      <div class="course-faq-item">
        <div class="course-faq-question">What if my baby is a different age?</div>
        <div class="course-faq-answer">This course is designed for a specific age range, but the strategies work well for slightly older or younger babies too. The foundations and techniques apply across different stages.</div>
      </div>
      
      <div class="course-faq-item">
        <div class="course-faq-question">Will I receive updates if the course is updated?</div>
        <div class="course-faq-answer">Yes, lifetime access includes all future course updates and improvements. You'll automatically have access to new content and revisions.</div>
      </div>
      
      <div class="course-faq-item">
        <div class="course-faq-question">Is this course suitable for breastfeeding mothers?</div>
        <div class="course-faq-answer">Absolutely. The course includes guidance on navigating night feeds while improving sleep, and respects your feeding choices. There's no pressure to night-wean before you're ready.</div>
      </div>
    </div>
  </div>
</section>"""

def generate_sleep_coach_section():
    return """<!-- ============================================
     SECTION 9: YOUR SLEEP COACH
     ============================================ -->
<section class="trust-section landscape">
  <div class="trust-wrapper">
    <div class="trust-left">
      <h2>Your Sleep Coach</h2>
      <p class="intro-text">
        Snooze is on a mission to help families get the rest they deserve through science-based guidance, community, and care.
      </p>
      <p>
        Created by <strong>Sally, The Sleep Concierge</strong> — paediatric nurse, certified sleep consultant, and mum of two —
        Snooze gives you practical tools and a calm, confident approach to your baby's sleep.
      </p>

      <a href="#course-access" class="cta-btn primary">Join Snooze</a>
      <p class="guarantee">Don't love it within 14 days? It's on us.</p>
    </div>

    <div class="trust-right">
      <div class="expert-card">
        <div class="image-wrapper">
          <img src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2163331541/settings_images/d2fd0d-c6d4-0e1-01ad-1b846f205d8f_0d8c4d39-2879-4edf-a15a-152aea38e84f.png" alt="Sally Woods, The Sleep Concierge" />
        </div>
        <div class="expert-text">
          <h3>Hi, I'm Sally!</h3>
          <p>Paediatric nurse, mum of two, and founder of The Sleep Concierge & Snooze.</p>
          <div class="social-icons">
            <a href="https://www.instagram.com/thesleepconcierge" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@thesleepconcierge" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <i class="fa-brands fa-tiktok"></i>
            </a>
            <a href="https://open.spotify.com/show/naptrapped" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
              <i class="fa-brands fa-spotify"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>"""

def generate_related_resources_section(course_config):
    links_html = ""
    for link_name, link_url in course_config["related_links"].items():
        links_html += f'      <a href="{link_url}" class="course-related-link">{link_name}</a>\n'
    
    return f"""<!-- ============================================
     SECTION 10: RELATED RESOURCES
     ============================================ -->
<section class="course-section-dark course-related-section">
  <div class="course-container">
    <h2 class="course-section-title">Related Resources</h2>
    <p class="course-section-intro">
      Explore related courses and resources that complement this course.
    </p>
    
    <div class="course-related-links">
{links_html}    </div>
  </div>
</section>"""

def add_missing_sections(filepath: Path, course_config: dict):
    """Add all missing sections to a generated HTML file."""
    content = filepath.read_text(encoding='utf-8')
    
    # Find where to insert (before the script section at the end)
    # Try multiple patterns
    patterns = [
        r'(<!-- ============================================\s+SECTION \d+: FOOTER / SCRIPTS.*?<script>)',
        r'(<!-- ============================================\s+SECTION \d+:.*?<script>)',
        r'(</section>\s*<!-- ============================================\s*SECTION \d+:.*?<script>)',
        r'(</section>\s*<script>)',
    ]
    
    match = None
    for pattern in patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            break
    
    if not match:
        # Try to find just before the last </section> before script
        last_section_match = re.search(r'(</section>)(\s*<script>)', content, re.DOTALL)
        if last_section_match:
            insertion_point = last_section_match.end(1)
        else:
            print(f"⚠️  Could not find insertion point in {filepath.name}")
            return False
    else:
        insertion_point = match.start()
    
    # Generate all missing sections
    sections = [
        generate_how_to_use_section(),
        generate_right_for_you_section(course_config),
        generate_success_stories_section(),
        generate_value_comparison_section(course_config),
        generate_whats_in_snooze_section(course_config),
        generate_faq_section(),
        generate_sleep_coach_section(),
        generate_related_resources_section(course_config),
    ]
    
    # Insert sections before the script
    new_content = (
        content[:insertion_point] +
        "\n\n" +
        "\n\n".join(sections) +
        "\n\n" +
        content[insertion_point:]
    )
    
    # Update section number in the script comment
    new_content = re.sub(
        r'SECTION \d+: FOOTER / SCRIPTS',
        'SECTION 11: FOOTER / SCRIPTS',
        new_content
    )
    
    filepath.write_text(new_content, encoding='utf-8')
    print(f"✅ Updated {filepath.name}")
    return True

def main():
    print("Adding missing sections to generated product landing pages...\n")
    
    for filename, config in COURSES.items():
        filepath = PAGES_DIR / filename
        if not filepath.exists():
            print(f"⚠️  File not found: {filename}")
            continue
        
        add_missing_sections(filepath, config)
    
    print("\n✅ All files updated!")

if __name__ == "__main__":
    main()

