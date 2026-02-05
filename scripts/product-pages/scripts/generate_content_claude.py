#!/usr/bin/env python3
"""
Phase 2: Content Generation Script using Claude Opus 4.5
Generates module summaries, hero sections, course overviews, and resources sections
for all Snooze course landing pages.
"""

import os
import json
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from dotenv import load_dotenv
from anthropic import Anthropic

# Load environment variables from root .env file
# Script is at: projects/snooze-website/kajabi-deployment/pages/product-pages/scripts/
# Need to go up to workspace root
script_path = Path(__file__).resolve()
# Go up: scripts -> product-pages -> pages -> deployment -> kajabi-deployment -> snooze-website -> projects -> root
root_dir = script_path.parent.parent.parent.parent.parent.parent
env_path = root_dir / ".env"
if not env_path.exists():
    # Try alternative: go up until we find .env
    current = script_path.parent
    while current != current.parent:
        potential_env = current / ".env"
        if potential_env.exists():
            env_path = potential_env
            break
        current = current.parent
load_dotenv(env_path)

# Initialize Claude client (after loading .env)
api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY not found in environment. Check .env file.")
client = Anthropic(api_key=api_key)

# Base directory
BASE_DIR = Path(__file__).parent.parent
GENERATED_DIR = BASE_DIR / "GENERATED-CONTENT"
GENERATED_DIR.mkdir(exist_ok=True)
(GENERATED_DIR / "module-summaries").mkdir(exist_ok=True)

# Tone of Voice Context (used in all prompts)
TONE_CONTEXT = """You are writing content for The Sleep Concierge / Snooze, a baby and toddler sleep consulting brand.

TONE OF VOICE REQUIREMENTS:
- Evidence-based clarity: Explain simply, use analogies, ground advice in evidence
- Supportive without coddling: Acknowledge difficulty, set realistic expectations, no empty reassurances
- Practical and actionable: Specific steps, exact timings, not vague guidance
- Confident and calm: Definitive language ("I would", "I like to"), not uncertain
- Judgment-free: No "should/must", use "you can", validate different paths
- Relatable and human: Personal examples, admits challenges, shows vulnerability

LANGUAGE PATTERNS:
- Use "I would" / "I like to" / "For me" (not "you should")
- Use "You can" / "You don't have to" (permission-giving)
- Use "Usually" / "Often" (not "always/never")
- Avoid "Solution" / "Solutions" → Use "Support" / "Guidance" / "Help" / "Strategies"
- Never say "You should" / "You must" (judgmental)
- Never say "Perfect" / "Flawless" (unrealistic)

EXAMPLE OF GOOD TONE:
"If you're wondering 'why is my 4-month-old sleeping worse?' or 'is this the 4-month sleep regression?', this module explains what's really happening. You'll learn why sleep cycles permanently change at this age, why your baby might be waking every hour, and what's normal versus what needs attention. Perfect for parents experiencing the 4-month sleep regression or wondering when to start sleep training."
"""


def call_claude(prompt, model="claude-opus-4-5-20251101", max_tokens=2000):
    """Call Claude Opus 4.5 API with a prompt."""
    try:
        response = client.messages.create(
            model=model,
            max_tokens=max_tokens,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
    except Exception as e:
        print(f"Error calling Claude API: {e}")
        return None


def generate_module_summaries(course_data):
    """Generate module summaries for a course."""
    course_name = course_data["name"]
    target_age = course_data["target_age"]
    modules = course_data["modules"]
    
    print(f"\n📝 Generating module summaries for {course_name}...")
    
    # Build batch prompt for all modules
    prompt = f"""{TONE_CONTEXT}

You are writing module summaries for a baby sleep course landing page. These summaries appear in an accordion menu and should be concise but compelling.

COURSE CONTEXT:
- Course Name: {course_name}
- Target Age: {target_age}
- Total Modules: {len(modules)}

OUTPUT REQUIREMENTS:
For each module, generate a 2-3 sentence summary (approximately 50-75 words) that:
1. Starts with a user question/challenge - Use questions parents actually ask
2. Explains what they'll learn - Be specific about the content
3. Ends with why this matters - Connect to their situation
4. Uses SEO keywords naturally - Include relevant search terms without keyword stuffing
5. Matches Sally's voice - Warm, confident, practical, judgment-free

MODULES TO GENERATE:

"""
    
    for i, module in enumerate(modules, 1):
        prompt += f"""
MODULE {i}: {module["title"]}
- Module Description: {module["description"]}
- Lesson Count: {module["lesson_count"]}
- Key Challenges: {', '.join(module.get("key_challenges", []))}
- SEO Keywords/Questions: {', '.join(module.get("seo_keywords", []))}

"""
    
    prompt += """
Format your output as:
## Module 1: [Title]
[Summary text - 2-3 sentences, 50-75 words]

## Module 2: [Title]
[Summary text - 2-3 sentences, 50-75 words]

[Continue for all modules...]
"""
    
    response = call_claude(prompt, max_tokens=4000)
    
    if response:
        # Save to file
        output_file = GENERATED_DIR / "module-summaries" / f"{course_data['slug']}-module-summaries.md"
        with open(output_file, "w") as f:
            f.write(f"# {course_name} - Module Summaries\n\n")
            f.write(f"**Generated:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"**Model:** Claude Opus 4.5\n\n")
            f.write("---\n\n")
            f.write(response)
        
        print(f"✅ Saved to {output_file}")
        return response
    else:
        print("❌ Failed to generate module summaries")
        return None


def generate_hero_section(course_data):
    """Generate hero section copy."""
    course_name = course_data["name"]
    target_age = course_data["target_age"]
    
    prompt = f"""{TONE_CONTEXT}

Generate hero section copy for a baby sleep course landing page.

COURSE INFORMATION:
- Course Name: {course_name}
- Target Age: {target_age}
- Total Modules: {course_data.get('total_modules', 'N/A')}
- Total Lessons: {course_data.get('total_lessons', 'N/A')}
- Has Downloadable Resources: Yes
- Access: Lifetime

OUTPUT REQUIREMENTS:
Generate the following elements:

1. **Hero Title:** 
   - Format: "[Course Name]"
   - Should be clear and benefit-focused
   - Example: "3-4 Month Baby Sleep Course"

2. **Hero Subtitle:**
   - One sentence describing what the course covers
   - Age-specific and benefit-focused
   - Example: "A self-paced course covering sleep changes, nap consolidation, and building independent sleep skills for babies 3-4 months old."

3. **Hero Stats:**
   - Format: Short phrases with bold numbers
   - Include: Module count, lesson count, resource type, access type
   - Example: "11 modules • 20+ lessons • Downloadable resources • Lifetime access"

OUTPUT FORMAT:
Title: [Title]
Subtitle: [Subtitle]
Stats: [Stats with bold indicators using **text**]
"""
    
    response = call_claude(prompt)
    return response


def generate_course_overview(course_data):
    """Generate course overview sections."""
    course_name = course_data["name"]
    target_age = course_data["target_age"]
    modules = course_data["modules"]
    
    module_titles = [m["title"] for m in modules]
    
    prompt = f"""{TONE_CONTEXT}

Generate course overview sections for a baby sleep course landing page.

COURSE INFORMATION:
- Course Name: {course_name}
- Target Age: {target_age}
- Modules: {', '.join(module_titles)}
- Total Lessons: {course_data.get('total_lessons', 'N/A')}
- Has Videos: {course_data.get('has_videos', 'No')}
- Has PDFs: Yes
- Resource Count: {course_data.get('resource_count', 'Multiple')}

OUTPUT REQUIREMENTS:

1. **Course Overview Intro Paragraph:**
   - 2-3 sentences summarizing the course
   - Age-specific, benefit-focused
   - Example: "This course provides comprehensive guidance for navigating your baby's 3-4 month sleep changes. You'll learn evidence-based strategies for extending naps, reducing night wakings, and building healthy sleep foundations."

2. **What You'll Learn (6-8 bullet points):**
   - Based on module topics
   - Address common challenges
   - Specific and actionable
   - Format: "- [Learning point]"

3. **Course Format (6 bullet points):**
   - Standard format: Text-based lessons, Video demonstrations (if applicable), Downloadable PDF guides, Checklists and trackers, Sample schedules, Self-paced learning

4. **Time Investment (5 bullet points):**
   - Standard format: Self-paced learning, Estimated hours, Flexible completion, Reference back anytime, Lifetime access

Generate all four sections for {course_name}.
"""
    
    response = call_claude(prompt, max_tokens=2000)
    return response


def generate_resources_section(course_data):
    """Generate resources section."""
    course_name = course_data["name"]
    
    prompt = f"""{TONE_CONTEXT}

Generate resource descriptions for the "Course Resources" section of a baby sleep course landing page.

COURSE INFORMATION:
- Course Name: {course_name}
- Video Lessons: {course_data.get('video_count', 0)} (if applicable)
- Written Guides: {course_data.get('total_lessons', 'N/A')} lessons
- Downloadable PDFs: {course_data.get('pdf_count', 'Multiple')}
- Sample Schedules: {course_data.get('schedule_count', 'Multiple')} (if applicable)
- Other Resources: {course_data.get('other_resources', 'Various')}

OUTPUT REQUIREMENTS:
Generate resource items matching this format. Each item should:
- Have a clear title (h4)
- Include a specific description
- Be value-focused

STANDARD RESOURCE ITEMS:

1. **Video Lessons** (if applicable)
   - Title: "Video Lessons"
   - Description: "[Count] video demonstrations covering [specific topics]"

2. **Written Guides**
   - Title: "Written Guides"
   - Description: "[Count] comprehensive text-based lessons with detailed explanations and step-by-step instructions"

3. **Downloadable PDFs**
   - Title: "Downloadable PDFs"
   - Description: "[Count+] printable resources including [specific types: checklists, trackers, schedules, reference guides]"

4. **Sample Schedules** (if applicable)
   - Title: "Sample Schedules"
   - Description: "Multiple schedule templates for [specific situations]"

5. **Decision Flowcharts** (if applicable)
   - Title: "Decision Flowcharts"
   - Description: "Visual guides for [specific decisions]"

6. **Progress Trackers** (if applicable)
   - Title: "Progress Trackers"
   - Description: "Printable sheets to track [what they track]"

Generate resource items for {course_name} based on the course information above.
"""
    
    response = call_claude(prompt)
    return response


def process_course(course):
    """Process a single course - generates all content."""
    print(f"\n{'='*60}")
    print(f"Processing: {course['name']}")
    print(f"{'='*60}")
    
    results = {}
    
    try:
        # Generate module summaries
        summaries = generate_module_summaries(course)
        results['summaries'] = summaries
        time.sleep(2)  # Rate limiting
        
        # Generate hero section
        print(f"\n🎯 Generating hero section for {course['name']}...")
        hero = generate_hero_section(course)
        results['hero'] = hero
        time.sleep(2)
        
        # Generate course overview
        print(f"\n📋 Generating course overview for {course['name']}...")
        overview = generate_course_overview(course)
        results['overview'] = overview
        time.sleep(2)
        
        # Generate resources section
        print(f"\n📦 Generating resources section for {course['name']}...")
        resources = generate_resources_section(course)
        results['resources'] = resources
        time.sleep(2)
        
        # Save individual files
        content_file = GENERATED_DIR / f"{course['slug']}-content.md"
        with open(content_file, "w") as f:
            f.write(f"# {course['name']} - Generated Content\n\n")
            f.write(f"**Generated:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"**Model:** Claude Opus 4.5\n\n")
            f.write("---\n\n")
            f.write("## Hero Section\n\n")
            f.write(hero or "Not generated")
            f.write("\n\n---\n\n")
            f.write("## Course Overview\n\n")
            f.write(overview or "Not generated")
            f.write("\n\n---\n\n")
            f.write("## Resources Section\n\n")
            f.write(resources or "Not generated")
        
        print(f"✅ Saved all content to {content_file}")
        results['success'] = True
        
    except Exception as e:
        print(f"❌ Error processing {course['name']}: {e}")
        results['success'] = False
        results['error'] = str(e)
    
    return course['slug'], results


def main():
    """Main function to generate all content in parallel."""
    
    # Complete course data from COURSE-DATA-COLLECTION.md
    courses = [
        {
            "name": "5-12 Month Guide",
            "slug": "5-12-month-guide",
            "target_age": "5-12 months",
            "total_modules": 6,
            "total_lessons": 23,
            "has_videos": False,
            "resource_count": "Multiple",
            "video_count": 0,
            "pdf_count": "15+",
            "schedule_count": "Multiple",
            "other_resources": "Checklists, trackers, troubleshooting guides",
            "modules": [
                {
                    "title": "Understanding Your Baby's Sleep",
                    "description": "Foundational knowledge about sleep cycles, tired signs, and emotional preparation.",
                    "lesson_count": 3,
                    "key_challenges": ["Understanding sleep biology", "Recognizing tired signs", "Emotional preparation"],
                    "seo_keywords": ["baby sleep cycles", "when is baby ready for sleep training", "tired signs vs overtired"]
                },
                {
                    "title": "Optimizing the Sleep Environment",
                    "description": "Setting up the room and associations for success.",
                    "lesson_count": 4,
                    "key_challenges": ["Room setup", "Temperature", "Sleep associations"],
                    "seo_keywords": ["baby sleep environment", "safe sleep setup", "room temperature for baby"]
                },
                {
                    "title": "Routines, Schedules & Feeding",
                    "description": "Establishing the 'Day' structure to support the 'Night'.",
                    "lesson_count": 5,
                    "key_challenges": ["Creating routines", "Feeding schedules", "Early rising"],
                    "seo_keywords": ["5 month old schedule", "baby feeding schedule", "early rising baby"]
                },
                {
                    "title": "The Night Sleep Plan",
                    "description": "Implementing the sleep training techniques and night weaning.",
                    "lesson_count": 4,
                    "key_challenges": ["Sleep training techniques", "Night weaning"],
                    "seo_keywords": ["sleep training methods", "night weaning", "soothe and support method"]
                },
                {
                    "title": "The Nap Training Plan",
                    "description": "Transferring independent sleep skills to daytime.",
                    "lesson_count": 4,
                    "key_challenges": ["Nap training", "Short naps", "Nap transitions"],
                    "seo_keywords": ["how to train baby to nap", "extending short naps", "3 nap to 2 nap transition"]
                },
                {
                    "title": "Troubleshooting & Success",
                    "description": "Handling bumps in the road and maintaining progress.",
                    "lesson_count": 3,
                    "key_challenges": ["Troubleshooting", "Setbacks", "Maintaining progress"],
                    "seo_keywords": ["sleep training setbacks", "baby sleep problems"]
                }
            ]
        },
        {
            "name": "Toddler Toolkit",
            "slug": "toddler-toolkit",
            "target_age": "12+ months",
            "total_modules": 7,
            "total_lessons": 25,
            "has_videos": False,
            "resource_count": "15+",
            "video_count": 0,
            "pdf_count": "15+",
            "schedule_count": 4,
            "other_resources": "Checklists, scripts, troubleshooting guides",
            "modules": [
                {
                    "title": "Understanding Toddler Sleep",
                    "description": "Foundation module exploring how toddler sleep differs from baby sleep, common challenges parents face, and when to seek help versus when behaviors are developmentally normal.",
                    "lesson_count": 3,
                    "key_challenges": ["Understanding toddler sleep differences", "Identifying normal vs problematic behaviors"],
                    "seo_keywords": ["toddler sleep vs baby sleep", "normal toddler sleep problems"]
                },
                {
                    "title": "Age-Appropriate Schedules and Routines",
                    "description": "Practical schedules and routines for toddlers at different ages and stages, including flexible approaches for real-life situations like daycare, travel, and illness.",
                    "lesson_count": 4,
                    "key_challenges": ["Age-appropriate schedules", "Daycare integration", "Travel", "Illness"],
                    "seo_keywords": ["toddler sleep schedule", "18 month old schedule", "toddler daycare sleep"]
                },
                {
                    "title": "Nap Transitions",
                    "description": "Comprehensive guide to managing nap transitions confidently, from the 2-to-1 transition to dropping naps entirely, with troubleshooting strategies for common issues.",
                    "lesson_count": 3,
                    "key_challenges": ["2-to-1 nap transition", "Dropping nap", "Nap refusal"],
                    "seo_keywords": ["2 to 1 nap transition", "when does toddler drop nap", "toddler refusing nap"]
                },
                {
                    "title": "Bedtime Battles and Resistance",
                    "description": "Practical tools and strategies for managing bedtime challenges, creating calm routines, and handling resistance with scripts and boundary-setting techniques.",
                    "lesson_count": 4,
                    "key_challenges": ["Bedtime battles", "Bedtime resistance", "Separation anxiety"],
                    "seo_keywords": ["toddler bedtime battles", "toddler won't go to bed", "bedtime routine for toddlers"]
                },
                {
                    "title": "Early Rising and Night Wakings",
                    "description": "Solutions for common nighttime challenges including early rising protocols, managing night wakings, and understanding nightmares versus night terrors.",
                    "lesson_count": 3,
                    "key_challenges": ["Early rising", "Night wakings", "Nightmares", "Night terrors"],
                    "seo_keywords": ["toddler early rising", "toddler night waking", "night terrors toddler"]
                },
                {
                    "title": "Big Transitions",
                    "description": "Managing major sleep-related transitions including moving from crib to bed, navigating sleep regressions, and maintaining sleep during travel and routine disruptions.",
                    "lesson_count": 3,
                    "key_challenges": ["Crib to bed", "Sleep regressions", "Travel disruptions"],
                    "seo_keywords": ["crib to bed transition", "toddler sleep regression", "travel with toddler sleep"]
                },
                {
                    "title": "Troubleshooting and Advanced Strategies",
                    "description": "Advanced tools and problem-solving strategies for when standard approaches don't work, plus guidance on maintaining progress and when to seek additional support.",
                    "lesson_count": 3,
                    "key_challenges": ["Troubleshooting", "Maintaining progress", "Advanced strategies"],
                    "seo_keywords": ["toddler sleep troubleshooting", "toddler sleep problems not improving"]
                }
            ]
        },
        {
            "name": "The Snooze Method",
            "slug": "snooze-method",
            "target_age": "All ages (foundational)",
            "total_modules": 4,
            "total_lessons": 16,
            "has_videos": False,
            "resource_count": "4-6",
            "video_count": 0,
            "pdf_count": "4-6",
            "schedule_count": 0,
            "other_resources": "Quick reference guides, checklists, decision frameworks",
            "modules": [
                {
                    "title": "Introduction to The Snooze Method",
                    "description": "Discover what The Snooze Method is, why it exists, and how it's different from other sleep approaches. Learn about the evidence-based foundation that underlies all Snooze guidance.",
                    "lesson_count": 4,
                    "key_challenges": ["Understanding the method", "Evaluating different approaches", "Building confidence"],
                    "seo_keywords": ["Snooze Method", "evidence-based sleep training", "what makes Snooze different"]
                },
                {
                    "title": "Core Philosophy and Mindset",
                    "description": "Explore the underlying beliefs and approach that guide all Snooze guidance. Understand why parent confidence matters and how to balance structure with flexibility.",
                    "lesson_count": 4,
                    "key_challenges": ["Building parent confidence", "Balancing structure with flexibility", "Evaluating advice"],
                    "seo_keywords": ["parent confidence sleep training", "flexible sleep training", "evidence-based sleep advice"]
                },
                {
                    "title": "Thinking About Sleep Challenges",
                    "description": "Develop a framework for understanding when to act versus when to wait. Learn to distinguish normal sleep patterns from challenges and recognize developmental versus behavioral factors.",
                    "lesson_count": 4,
                    "key_challenges": ["Understanding normal vs problematic sleep", "Knowing when to act", "Sleep associations"],
                    "seo_keywords": ["normal baby sleep", "when to sleep train", "sleep associations", "developmental vs behavioral sleep"]
                },
                {
                    "title": "Adapting The Method to Your Family",
                    "description": "Learn how to apply The Snooze Method principles to your unique family situation. Discover how to balance structure with real life and when to seek additional support.",
                    "lesson_count": 4,
                    "key_challenges": ["Adapting to family needs", "Real-life flexibility", "Knowing when to seek help"],
                    "seo_keywords": ["adapting sleep training to family", "flexible sleep training approach"]
                }
            ]
        },
        {
            "name": "Newborn Sleep Guide",
            "slug": "newborn-guide",
            "target_age": "0-3 months (Fourth Trimester)",
            "total_modules": 9,
            "total_lessons": 0,  # Guide format, not lessons
            "has_videos": False,
            "resource_count": "Multiple",
            "video_count": 0,
            "pdf_count": "Multiple",
            "schedule_count": "Multiple",
            "other_resources": "Wake window tables, sleep totals tables, safe sleep checklist, settling technique guides",
            "modules": [
                {
                    "title": "Introduction & About The Guide",
                    "description": "Welcome from Sally, guide purpose and philosophy. Key principles: not about sleep training, cannot spoil a baby.",
                    "lesson_count": 0,
                    "key_challenges": ["Understanding guide purpose", "Building confidence", "Fourth trimester approach"],
                    "seo_keywords": ["newborn sleep guide", "fourth trimester", "newborn sleep help"]
                },
                {
                    "title": "What is Sleep and Why Do You and Your Baby Need It?",
                    "description": "Sleep cycles (REM vs Non-REM sleep in newborns), hormones (Melatonin, Cortisol), understanding newborn sleep patterns.",
                    "lesson_count": 0,
                    "key_challenges": ["Understanding newborn sleep patterns", "Sleep cycles", "Hormones"],
                    "seo_keywords": ["newborn sleep cycles", "REM sleep newborn", "newborn sleep patterns"]
                },
                {
                    "title": "Tired Signs",
                    "description": "Sleep Ready Signs vs Overtired Signs, how to read your baby's cues, pro tips for recognizing tiredness.",
                    "lesson_count": 0,
                    "key_challenges": ["Recognizing tired signs", "Avoiding overtiredness", "Reading baby cues"],
                    "seo_keywords": ["newborn tired signs", "overtired baby", "baby sleep cues"]
                },
                {
                    "title": "Wake Windows",
                    "description": "Wake window guidelines by age (0-3 months), Fourth Trimester Sleep Totals (day sleep, overnight sleep, naps by age), age-specific recommendations.",
                    "lesson_count": 0,
                    "key_challenges": ["Establishing wake windows", "Age-appropriate sleep totals", "Nap frequency"],
                    "seo_keywords": ["newborn wake windows", "0-3 month wake windows", "newborn sleep schedule"]
                },
                {
                    "title": "Rhythm and Routine",
                    "description": "Creating patterns (not rigid schedules), simple routine structure, The 7am Reset concept, bedtime routine components.",
                    "lesson_count": 0,
                    "key_challenges": ["Creating flexible routines", "Establishing patterns", "Bedtime routine"],
                    "seo_keywords": ["newborn routine", "fourth trimester routine", "newborn bedtime routine"]
                },
                {
                    "title": "The Sleep Environment",
                    "description": "Safe Sleep (Red Nose guidelines - 10 key points), Nursery Set Up: white noise, temperature/clothing, swaddling, blackout requirements.",
                    "lesson_count": 0,
                    "key_challenges": ["Safe sleep practices", "Room setup", "Temperature", "Swaddling"],
                    "seo_keywords": ["safe sleep newborn", "newborn room setup", "newborn sleep environment"]
                },
                {
                    "title": "Sleep Associations",
                    "description": "Unassisted vs Assisted sleep associations, sleepy phrases, dummy/pacifier guidance.",
                    "lesson_count": 0,
                    "key_challenges": ["Understanding sleep associations", "Positive associations", "Dummy use"],
                    "seo_keywords": ["newborn sleep associations", "sleep associations baby", "dummy newborn"]
                },
                {
                    "title": "Settling & Re-Settling",
                    "description": "Techniques: Le Pause, The Shush/Pat, Pick Up/Put Down (PU/PD), Dr Harvey Karp's 'The 5 S's'. When cuddling is okay (fourth trimester approach).",
                    "lesson_count": 0,
                    "key_challenges": ["Settling techniques", "Re-settling", "Fourth trimester approach"],
                    "seo_keywords": ["newborn settling techniques", "how to settle newborn", "5 S's newborn"]
                },
                {
                    "title": "Meet Your Village",
                    "description": "Expert contributions: Lauren Cross (NICU Nurse, Midwife) - Feeding, Reflux, Mastitis; Louise Mitchell (Pelvic Floor Physio) - Abdominal separation, Pelvic floor, Wrist pain; Courtney Bates (Dietitian) - Fourth trimester diet, Recipes.",
                    "lesson_count": 0,
                    "key_challenges": ["Feeding support", "Maternal health", "Expert guidance"],
                    "seo_keywords": ["newborn feeding", "fourth trimester support", "newborn care"]
                }
            ]
        }
    ]
    
    print("🚀 Starting Phase 2: Content Generation with Claude Opus 4.5")
    print(f"📚 Processing {len(courses)} courses in parallel\n")
    
    # Process courses in parallel (but with rate limiting built into each)
    all_content = {}
    start_time = time.time()
    
    # Use ThreadPoolExecutor for parallel processing
    with ThreadPoolExecutor(max_workers=4) as executor:
        # Submit all courses
        future_to_course = {executor.submit(process_course, course): course for course in courses}
        
        # Process results as they complete
        for future in as_completed(future_to_course):
            course = future_to_course[future]
            try:
                slug, results = future.result()
                all_content[slug] = results
            except Exception as e:
                print(f"❌ Error processing {course['name']}: {e}")
                all_content[course['slug']] = {"success": False, "error": str(e)}
    
    elapsed_time = time.time() - start_time
    
    # Save summary
    summary_file = GENERATED_DIR / "generation-summary.json"
    with open(summary_file, "w") as f:
        json.dump({
            "generated_at": time.strftime('%Y-%m-%d %H:%M:%S'),
            "model": "claude-opus-4-5-20251101",
            "courses_processed": len(courses),
            "courses": list(all_content.keys()),
            "successful": sum(1 for r in all_content.values() if r.get('success', False)),
            "failed": sum(1 for r in all_content.values() if not r.get('success', False)),
            "elapsed_time_seconds": round(elapsed_time, 2)
        }, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"✅ Content generation complete!")
    print(f"⏱️  Total time: {round(elapsed_time, 2)} seconds")
    print(f"📁 All files saved to: {GENERATED_DIR}")
    print(f"📊 Summary saved to: {summary_file}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()

