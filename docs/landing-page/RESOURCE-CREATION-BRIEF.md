# Snooze Resource Creation Brief

**Version:** 1.0  
**Date:** January 2025  
**Status:** Master Template for Future Resource Creation  
**Based on:** Toddler Toolkit Creation Process

---

## Overview

This brief documents the complete process, tools, and patterns used to create comprehensive self-guided resources for Snooze. Use this as a template for creating future resources based on specific age ranges, sleep challenges, or outlier situations (travel, time-zone changes, hospital stays, etc.).

**CRITICAL:** Before creating any resource that includes schedules, you MUST check the Sleep Schedule Bible in Notion. See @.cursor/rules/sleep-schedule-bible.mdc for the mandatory workflow.

---

## Resource Creation Process

### Phase 1: Research & Content Discovery

#### 1.1 Database Content Audit

**Tool:** `mcp_supabase_execute_sql`

Query the Supabase database for relevant content across multiple tables:

**TikTok Videos:**
```sql
SELECT
  video_id, text as caption, transcript, combined_content, video_url, topic, age_group, views, likes, comments, engagement_rate, created_at
FROM tiktok_videos
WHERE account_name = 'thesleepconcierge'
  AND ([age_group/topic/content filters specific to resource])
ORDER BY engagement_rate DESC NULLS LAST, views DESC
LIMIT 50
```

**Q&A Knowledge Base:**
```sql
SELECT
  id, question, answer, problem_category, age_context, source_platform
FROM qa_knowledge_base
WHERE ([age_context/problem_category filters specific to resource])
ORDER BY created_at DESC
LIMIT 100
```

**Content Library:**
```sql
SELECT
  id, content_id, title, description, url, content_type, content_source, topics, age_groups, problem_categories, views, engagement_rate
FROM content_library
WHERE ([age_groups/problem_categories/topics filters specific to resource])
ORDER BY engagement_rate DESC NULLS LAST, views DESC
LIMIT 50
```

**Podcast Episodes:**
```sql
SELECT
  id, episode_title, episode_number, episode_description, spotify_url, episode_date, duration_minutes
FROM podcast_episodes_enhanced
WHERE ([episode_title/episode_description filters specific to resource])
ORDER BY episode_date DESC
LIMIT 30
```

**Key Points:**
- Filter by age groups, topics, problem categories relevant to the resource
- Order by engagement_rate and views to prioritize high-performing content
- Extract URLs, transcripts, and performance data for content mapping

#### 1.2 RAG-Powered Content Discovery

**Tool:** RAG system from `projects/brand-content-consultant/src/rag_intelligence.py`

**Process:**
1. Create natural language queries specific to the resource topic
2. Query the RAG system for top 10-15 most relevant videos
3. Extract key schedules, methods, and approaches from results
4. Document findings with similarity scores and relevance notes

**Example Queries:**
- "toddler sleep schedules 12-18 months"
- "nap transition 2 to 1 nap"
- "bedtime battles and resistance"
- "early rising solutions"
- "crib to bed transition"

**Documentation:**
- Create research document: `projects/landing-page/docs/[RESOURCE-NAME]-RESEARCH.md`
- Include: content inventory, RAG query results, content mapping, gap analysis

#### 1.3 Content Gap Analysis

**Process:**
1. Compare discovered content against resource module requirements
2. Identify well-covered topics (abundant content available)
3. Identify gaps (limited or missing content)
4. Adjust module structure if needed based on available content
5. Prioritize content by performance metrics and recency

---

### Phase 2: Structure Planning

#### 2.1 Module Structure Design

**Documentation:** `projects/landing-page/docs/[RESOURCE-NAME]-STRUCTURE.md`

**Include:**
- Final module breakdown with titles and purposes
- Lesson breakdown per module
- Required downloadable resources per module
- Learning outcomes

**Structure Pattern:**
- 5-7 modules typically
- 3-5 lessons per module
- Introduction lesson for each module
- Progressive difficulty: Foundation → Specific Topics → Advanced/Edge Cases

#### 2.2 Content Mapping

**Documentation:** `projects/landing-page/docs/[RESOURCE-NAME]-CONTENT-LINKS.md`

**Map:**
- Each lesson → Relevant TikTok videos (with URLs and video IDs)
- Each lesson → Relevant podcast episodes (with URLs and episode numbers)
- Each lesson → Relevant Q&A pairs (for examples/context)
- Organize by: Primary content (most relevant, high-performing), Secondary content (supporting), Placeholder notes for content to be added later

#### 2.3 Module Information

**Documentation:** `projects/landing-page/docs/[RESOURCE-NAME]-MODULE-INFO.md`

**Include:**
- Module titles
- Module descriptions (for Kajabi)
- Thumbnail copy (keep simple)
- Lesson titles for each module
- Course landing page content (title, description, who it's for, what's included, learning outcomes)

---

### Phase 3: Content Creation

#### 3.1 HTML File Structure

**Location:** `projects/landing-page/kajabi-deployment/[resource-name]/`

**Naming Convention:**
- Module intros: `module-[number]-intro.html`
- Lessons: `module-[number]-lesson-[number].html`

**File Template:**
```html
<div class="toddler-toolkit-lesson">
  <h2>Lesson Title</h2>
  
  <p>Opening paragraph in Sally's voice...</p>
  
  <h3>Section Heading</h3>
  
  <p>Content paragraphs...</p>
  
  <!-- Video Embed -->
  <div class="video-embed">
    <blockquote class="tiktok-embed" cite="[TIKTOK_URL]" data-video-id="[VIDEO_ID]" style="max-width: 605px; min-width: 325px;">
      <section>
        <a target="_blank" title="@thesleepconcierge" href="https://www.tiktok.com/@thesleepconcierge">@thesleepconcierge</a>
        <p>[Video description]</p>
        <a target="_blank" title="♬ original sound - The Sleep Concierge" href="[MUSIC_LINK]">♬ original sound - The Sleep Concierge</a>
      </section>
    </blockquote>
    <script async src="https://www.tiktok.com/embed.js"></script>
  </div>
  
  <!-- Q&A Example Box -->
  <div class="qa-example" style="background-color: #f0f9ff; padding: 25px; border-left: 4px solid #0ea5e9; border-radius: 4px; margin: 30px 0;">
    <p style="margin-top: 0; margin-bottom: 15px;"><strong style="color: #0c4a6e; font-size: 18px;">Real Parent Question:</strong></p>
    <p style="font-style: italic; color: #475569; margin-bottom: 15px;">"[Question text]"</p>
    <p style="margin-bottom: 0; color: #1e293b;"><strong>Sally's Answer:</strong> "[Answer text in Sally's voice]"</p>
  </div>
  
  <!-- Schedule Box -->
  <div class="schedule-box" style="background-color: #f8fafc; padding: 25px; border: 2px solid #e2e8f0; border-radius: 8px; margin: 25px 0;">
    <h4 style="margin-top: 0; color: #1e293b;">Schedule Title</h4>
    <ul style="list-style: none; padding-left: 0;">
      <li style="margin-bottom: 12px;"><strong>Time:</strong> Activity</li>
    </ul>
  </div>
  
  <!-- Callout Box -->
  <div class="callout-box" style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #6366f1; margin: 20px 0;">
    <p><strong>Remember:</strong> [Key takeaway message]</p>
  </div>
</div>

<style>
.toddler-toolkit-lesson {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
}

.toddler-toolkit-lesson h2 {
  font-size: 28px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.toddler-toolkit-lesson h3 {
  font-size: 22px;
  font-weight: 600;
  margin-top: 25px;
  margin-bottom: 15px;
  color: #2d2d2d;
}

.toddler-toolkit-lesson p {
  margin-bottom: 15px;
  font-size: 16px;
}

.toddler-toolkit-lesson ul {
  margin: 20px 0;
  padding-left: 30px;
}

.toddler-toolkit-lesson li {
  margin-bottom: 10px;
  font-size: 16px;
}

.toddler-toolkit-lesson strong {
  font-weight: 600;
  color: #1a1a1a;
}

.video-embed {
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.schedule-box {
  background-color: #f8fafc;
  padding: 25px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  margin: 25px 0;
}

.qa-example {
  background-color: #f0f9ff;
  padding: 25px;
  border-left: 4px solid #0ea5e9;
  border-radius: 4px;
  margin: 30px 0;
}

.callout-box {
  background-color: #f5f5f5;
  padding: 20px;
  border-left: 4px solid #6366f1;
  margin: 20px 0;
  border-radius: 4px;
}
</style>
```

#### 3.2 Content Writing Guidelines

**Reference:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`  
**Rules:** `.cursor/rules/tone-of-voice-writing.mdc`

**Critical Writing Rules:**

1. **Avoid Em Dashes:**
   - ❌ DON'T USE: Em dashes "—" (AI-generated content tell-tale sign)
   - ✅ USE INSTEAD: Commas, periods, or parentheses
   - Example: Instead of "This is important—here's why" use "This is important. Here's why"

2. **Avoid Contrast Statements:**
   - ❌ DON'T USE: "It's not about x, it's about y" (doesn't fit Sally's tone)
   - ✅ USE INSTEAD: Just state what it is directly
   - Example: Instead of "It's not about perfection, it's about progress" use "This is about progress"

3. **Voice Principles:**
   - Use "I would" / "I like to" / "For me" (not "you should")
   - Include "You can" / "You don't have to" (permission-giving)
   - Use "Usually" / "Often" / "For most babies" (realistic)
   - Include "This is not because you've done anything wrong" (removes shame)
   - Say "I know how hard this is" (validates)

4. **Structure Pattern:**
   - Start with acknowledgment or hook
   - Explain the "why" before the "how"
   - Provide specific timings and steps
   - Include contingency plans
   - End with encouragement or next step

5. **Language Patterns:**
   - Conversational transitions: "Keep listening" / "Let me explain" / "Here's the thing"
   - Empathy markers: "I understand" / "I know how hard it is" / "You are not alone"
   - Confidence builders: "I have never had" / "I usually" / "For me"
   - Realistic expectations: "It can feel" / "It might" / "Usually"
   - Permission giving: "You can" / "You don't have to" / "It's completely up to you"

#### 3.3 Content Elements

**Each Lesson Should Include:**

1. **Opening Hook:** Relate to parent's struggle, acknowledge difficulty
2. **Why Section:** Explain the science/reason behind the issue
3. **How Section:** Step-by-step process with specific timings
4. **Examples:** Real parent questions with Sally's answers
5. **Schedules/Templates:** When applicable, include specific schedules with exact timings
6. **Troubleshooting:** Common issues and solutions
7. **Encouragement:** Validation and next steps

**Rich Content Elements:**

- **TikTok Embeds:** Use actual video IDs and URLs from database queries
- **Q&A Examples:** Extract from `qa_knowledge_base` or create realistic examples in Sally's voice
- **Schedule Boxes:** Use color-coded boxes for different schedule types
- **Callout Boxes:** Key takeaways, reminders, important notes
- **Video Embeds:** Standard TikTok embed code (see template above)

---

### Phase 4: Quality Assurance

#### 4.1 Content Review Checklist

**Before Finalizing Each Lesson:**

- [ ] Every lesson includes specific, actionable steps
- [ ] Sample schedules have exact timings (when applicable)
- [ ] Troubleshooting sections address common issues
- [ ] Links to podcast/TikTok content included (with actual URLs/IDs)
- [ ] Voice matches Sally's tone throughout
- [ ] No vague advice—everything is specific
- [ ] Realistic expectations set throughout
- [ ] Encouragement and validation included
- [ ] Content is evidence-based but accessible
- [ ] No em dashes used
- [ ] No contrast statements ("It's not x, it's y")
- [ ] Uses "I would" / "I like to" (not "you should")
- [ ] Includes permission-giving language
- [ ] Explains "why" before "how"

#### 4.2 Technical Checklist

- [ ] All HTML files validate
- [ ] All TikTok embeds use correct video IDs
- [ ] All styling is included in each file
- [ ] File naming follows convention
- [ ] README.md updated with all files listed
- [ ] Module info document complete

---

## File Organization

### Directory Structure

```
projects/landing-page/
├── docs/
│   ├── [RESOURCE-NAME]-RESEARCH.md          # Research findings, content inventory
│   ├── [RESOURCE-NAME]-STRUCTURE.md         # Final module/lesson structure
│   ├── [RESOURCE-NAME]-CONTENT-LINKS.md     # Content mapping (videos, episodes, Q&A)
│   └── [RESOURCE-NAME]-MODULE-INFO.md       # Module titles, descriptions, lesson titles
└── kajabi-deployment/
    └── [resource-name]/
        ├── module-[number]-intro.html       # Module introductions
        ├── module-[number]-lesson-[number].html  # Individual lessons
        └── README.md                         # File listing and usage instructions
```

### Documentation Files

**Research Document** (`[RESOURCE-NAME]-RESEARCH.md`):
- Content inventory from database queries
- RAG query results and findings
- Content mapping (lessons → videos/episodes/Q&A)
- Gap analysis

**Structure Document** (`[RESOURCE-NAME]-STRUCTURE.md`):
- Final module breakdown
- Lesson organization
- Resource requirements

**Content Links Document** (`[RESOURCE-NAME]-CONTENT-LINKS.md`):
- All TikTok video references with IDs/URLs
- All podcast episode references with URLs
- Q&A pair references
- Performance data (engagement rates, views)

**Module Info Document** (`[RESOURCE-NAME]-MODULE-INFO.md`):
- Module titles
- Module descriptions (for Kajabi)
- Thumbnail copy
- Lesson titles
- Course landing page content

---

## Tools and References

### Database Tools

**Supabase MCP:**
- `mcp_supabase_list_tables` - List available tables
- `mcp_supabase_execute_sql` - Execute SQL queries
- `mcp_supabase_get_logs` - Debug issues

**Key Tables:**
- `tiktok_videos` - Video content with transcripts and performance data
- `qa_knowledge_base` - Q&A pairs with problem categories
- `content_library` - Podcast episodes, guides, other content
- `podcast_episodes_enhanced` - Podcast episode details with URLs

### RAG System

**Location:** `projects/brand-content-consultant/src/rag_intelligence.py`

**Usage:**
- Query content database using natural language
- Retrieve top relevant videos with similarity scores
- Extract key schedules, methods, and approaches

### Tone of Voice Resources

**Primary Guide:** `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- Complete voice principles and examples
- Writing style characteristics
- Context-specific adaptations
- Voice consistency checklist

**Writing Rules:** `.cursor/rules/tone-of-voice-writing.mdc`
- Critical rules for avoiding AI-generated content patterns
- Em dash alternatives
- Contrast statement alternatives

---

## Content Patterns

### Module Introduction Pattern

```html
<div class="toddler-toolkit-intro">
  <h2>Introduction</h2>
  
  <p>Welcome to [Module Name]. [Acknowledge challenge/context]. I work with families dealing with [specific issue] every single week, and I want you to know that [realistic but hopeful statement].</p>
  
  <p>By the end of this section, you'll understand:</p>
  
  <ul>
    <li>[Learning outcome 1]</li>
    <li>[Learning outcome 2]</li>
    <li>[Learning outcome 3]</li>
  </ul>
  
  <p>[Encouragement/context]. Let's dive in.</p>
</div>
```

### Lesson Content Pattern

1. **Opening:** Hook that relates to parent's struggle
2. **Why Section:** Explain the science/reason
3. **How Section:** Step-by-step with specific timings
4. **Examples:** Real parent questions with Sally's answers
5. **Troubleshooting:** Common issues and solutions
6. **Encouragement:** Validation and next steps

### Q&A Example Pattern

Extract from `qa_knowledge_base` or create realistic examples:
- Use actual questions from database when possible
- Write answers in Sally's voice
- Include specific, actionable advice
- Show empathy and validation

### Schedule Box Pattern

Use color-coded boxes:
- **Standard schedules:** Light blue background (`#f8fafc`)
- **Transitional schedules:** Yellow background (`#fef3c7`)
- **Special situations:** Green background (`#f0fdf4`)

---

## Kajabi Deployment

### Usage Instructions

1. Open the HTML file you need
2. Copy the entire contents (including the `<style>` tags)
3. In Kajabi, go to the lesson editor
4. Click the source code button (`</>` icon) or use the HTML view
5. Paste the HTML content
6. Save the lesson

### Module Setup in Kajabi

1. Create course/product in Kajabi
2. Add modules using titles from `MODULE-INFO.md`
3. Add module descriptions from `MODULE-INFO.md`
4. Add thumbnail copy (keep simple)
5. Create lessons using lesson titles from `MODULE-INFO.md`
6. Paste HTML content into each lesson

---

## Future Resource Ideas

Based on this process, potential future resources:

1. **Age-Specific Resources:**
   - Newborn Sleep Toolkit (0-3 months)
   - 3-4 Month Sleep Guide (already exists, but could expand)
   - 5-12 Month Sleep Guide (already exists, but could expand)
   - Preschool Sleep Toolkit (3-5 years)

2. **Challenge-Specific Resources:**
   - Travel Sleep Guide (time zones, hotels, disruptions)
   - Hospital Stay Sleep Guide (medical procedures, hospital environment)
   - Daycare Sleep Guide (schedule integration, consistency)
   - Sibling Sleep Guide (multiple children, conflicting schedules)

3. **Situation-Specific Resources:**
   - Sleep During Illness Guide
   - Sleep During Major Life Changes (moving, divorce, etc.)
   - Sleep for Special Needs Children
   - Sleep for Premature Babies

---

## Key Success Factors

1. **Thorough Research:** Use database queries and RAG to find all relevant content
2. **Content Mapping:** Link every lesson to specific videos, episodes, and Q&A pairs
3. **Voice Consistency:** Follow tone of voice guide strictly, avoid AI patterns
4. **Specificity:** Include exact timings, specific steps, actionable advice
5. **Rich Content:** Use embeds, examples, schedules, and visual elements
6. **Quality Assurance:** Review every lesson against checklist before finalizing

---

## Notes

- All content assumes parents have completed foundational Snooze Method courses (5-12 Month Guide or 3-4 Month Course)
- Resources are self-guided, not formal courses
- Focus on practical tools and strategies parents can implement immediately
- Include links to relevant TikTok videos and podcast episodes for additional context
- Maintain consistency with existing Snooze content and branding

---

**Last Updated:** January 2025  
**Based on:** Toddler Toolkit Creation Process  
**Status:** Active Template for Future Resource Creation

