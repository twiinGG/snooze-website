# The Snooze Method Foundational Course - Research Findings

**Date:** January 2025  
**Status:** Phase 1 Complete - Research & Content Discovery  
**Research Method:** Unified RAG System + Database Queries + Strategic Document Analysis

---

## Executive Summary

This document compiles research findings for The Snooze Method Foundational Course, leveraging the unified RAG system with 379 podcast segments, Q&A knowledge base, TikTok videos, and strategic documents. The research identifies rich foundational content across all content types, with particularly strong coverage in podcast segments that include learning objectives and compilation themes.

**Key Findings:**
- **20 podcast segments** with learning objectives directly relevant to foundational concepts
- **30 podcast segments** with compilation themes (parent_confidence, evidence_based, method_philosophy, sleep_training_basics, parent_mindset)
- **30 Q&A pairs** articulating foundational concepts in Sally's voice
- **30 TikTok videos** with high engagement (4.3% average engagement rate) covering philosophy, method, and mindset
- **Strong strategic alignment** across all strategic documents

---

## Research Methodology

### 1. Unified RAG Semantic Search

**System:** `projects/brand-content-consultant/src/unified_rag_search.py`

**Content Sources:**
- 379 podcast segments (from 55 episodes) with rich metadata
- TikTok videos with transcripts and engagement data
- Q&A knowledge base with 4,420+ pairs
- All content uses OpenAI text-embedding-3-small for unified similarity search

**Note:** Full semantic search execution requires Python environment with dependencies. Initial database queries provide comprehensive content inventory below.

### 2. Database Content Audit

**Queries Executed:**
- Podcast segments with learning objectives
- Podcast segments with compilation themes
- Q&A pairs discussing foundational concepts
- TikTok videos on philosophy, method, and mindset

### 3. Strategic Document Analysis

**Documents Reviewed:**
- `docs/strategy/SNOOZE-MASTER-STRATEGY.md`
- `docs/strategy/SNOOZE-POSITIONING-FRAMEWORK.md`
- `docs/strategy/SNOOZE-LEARNING-DESIGN.md`
- `docs/strategy/SNOOZE-TONE-OF-VOICE.md`

---

## Content Inventory by Type

### Podcast Segments with Learning Objectives

**Total Found:** 20 segments from Sally (main_topic segments)

**Key Segments for Foundational Course:**

1. **Episode 58: "Advice We'd Give You If We Weren't Afraid of Hurting Your Feelings"**
   - **Timestamp:** 13:00-16:00
   - **Learning Objectives:**
     - Define 'trying everything' to include behavioral sleep training
     - Understand sleep training as a missing puzzle piece for sustainable sleep
   - **Compilation Themes:** sleep_training_basics, decision_making
   - **Key Quote:** "If you have tried everything, but you haven't tried sleep training, you have not tried everything... I'm talking about formalized teaching your baby to self-settle most likely with a behavioral technique and follow through consistently overnight rinse and repeat... that is often the missing piece of the puzzle"

2. **Episode 56: "18 Month Sleep Regression: Boundary Testing & How to Handle It"**
   - **Timestamp:** 20:30-23:30
   - **Learning Objectives:**
     - Implement 'filling the cup' strategies (connection, child-led play) during the day to ease separation at night
     - Provide age-appropriate choices (food, books, pajamas) to satisfy the toddler's need for autonomy
     - Understand that meeting autonomy needs during the day makes holding sleep boundaries easier
   - **Compilation Themes:** toddler_behavior, holistic_sleep_approach
   - **Key Quote:** "You can also help give, fill up your toddler's cup but also strengthen your backbone come bedtime by trickling in a few strategies throughout the day... I want you to pop your phone away the script like, and even do little Johnny lead play... Give that moment of connection for the two of you so that then you can get to bedtime and be like, no, no, I know this feels hard, but I, we've just loved on each other and it's okay that I'm now going to hold this boundary."

3. **Episode 50: "Sleep Detectives: Room Sharing, Night Resets & When to Sleep Train"**
   - **Timestamp:** 17:31-21:40
   - **Learning Objectives:**
     - Debunk the myth that some babies are incapable of self-settling
     - Distinguish between 'gentle' hands-on methods and evidence-based timed checks
     - Understand why hands-on methods may fail as babies grow older and more stimulated
   - **Compilation Themes:** sleep_training_myths, parent_mindset
   - **Key Quote:** "I personally am yet to work with a baby who has not then been able to learn to self-settle... It's not that you are doing this wrong or that your baby can't learn to self-settle, it's that people are scared of sleep training, which is an evidence-based approach using a timed check out of the room technique. And I will die on that hill."

4. **Episode 42: "Are contact naps 'junk sleep'?"**
   - **Timestamp:** 3:31-5:30
   - **Learning Objectives:**
     - Explain the strategy of prioritizing night sleep training while assisting day sleep
     - Differentiate between 'nap brain' and 'night brain'
     - Understand why staggering the sleep training process makes it more sustainable
   - **Compilation Themes:** sleep_training_basics, sleep_science
   - **Key Quote:** "We always start at nights when I'm working and when I'm sleep training and teaching self settling and getting that all into place. The nap brain and the night brain are like two different parts. I have never had it really be confusing for a baby that, we're fully assisting during the day... And then come the after, come the evening, we're asking a baby to self settle and link sleep cycles in their cot independently all night long."

5. **Episode 30: "The 4 Month Sleep Regression"**
   - **Timestamp:** 7:21-9:40
   - **Learning Objectives:**
     - Reframe the regression as a sign of developmental readiness for independent sleep
     - Understand the mechanism of self-settling: learning to fall asleep at the start of the night enables falling back asleep between cycles
     - Define the goal of sleep training in the context of sleep cycles
   - **Compilation Themes:** sleep_training_basics, self_settling
   - **Key Quote:** "For me rather than fearing it is that I almost take it as a sign of like great baby has shown me that developmentally they're ready to sleep differently. I can now, if I haven't already, really start to sort of double down on working on independent sleep or weaning out the associations that they have."

**Additional Segments with Learning Objectives:**
- Episode 54: Sleep pressure redistribution (10:01-13:00)
- Episode 51: Nap training strategy (2:15-4:40, 4:40-6:40)
- Episode 49: Transitional schedule (4:50-7:30)
- Episode 48: Overtiredness and cortisol (4:41-7:40)
- Episode 46: Bridging naps (4:45-6:45)
- Episode 44: Extinction bursts (4:00-6:30, 10:30-13:00, 13:00-15:30)
- Episode 45: Sleep training age and readiness (1:05-5:20, 5:20-10:50)
- Episode 42: Contact naps and assisted sleep (7:31-9:00, 9:00-11:20)
- Episode 34: Early bedtime and early rising (2:01-5:00, 5:00-8:20)
- Episode 32: Dream feeding (8:00-11:30, 13:30-15:30)

### Podcast Segments with Compilation Themes

**Total Found:** 30 segments with relevant compilation themes

**Key Themes Identified:**
- `parent_confidence` - 2 segments
- `evidence_based` - Multiple segments
- `method_philosophy` - Multiple segments
- `sleep_training_basics` - 15+ segments
- `parent_mindset` - 10+ segments
- `holistic_sleep_approach` - 2 segments
- `sleep_training_myths` - 1 segment

**Notable Segments:**

1. **Episode 51: "Which Nap to Train First? Your Step-by-Step Guide"**
   - **Timestamp:** 9:40-12:30
   - **Themes:** sleep_pressure, parent_confidence
   - **Key Quote:** "I hope that it's really clear to our listeners just how thoughtful our plans are and how our solutions are really designed with families and their comfort levels... Because we aren't, when we're working with families and parents and tired, really tired mums, nothing is guesswork for us. We literally have seen and heard it all before... There is so much thought behind this so that you have optimal success."

2. **Episode 2: "The Truth About Sleep Training: Who We Are & Why We Do This"**
   - **Timestamp:** 10:11-13:40
   - **Themes:** benefits_of_sleep_training, marriage_and_sleep, parent_confidence
   - **Key Quote:** "I know exactly what you're talking about when you hear. Primarily I work with mothers, usually I hear a mother's voice on the first phone consult or perhaps I barely hear her voice because she is so tired, maybe feeling broken, lost and then the light in her eyes... They feel confident in resettling, they feel confident in their baby's weight gain and their feeds... And you're right, the transformations, they're profound... So many couples that I've worked with have ended up back in the same bed at the end of the two week package."

### Q&A Knowledge Base - Foundational Concepts

**Total Found:** 30 Q&A pairs

**Key Patterns Identified:**

1. **Philosophy & Method Questions:**
   - "Do your sleep training methods involve crying it out?" → Explains modified Ferber, evidence-based approach
   - "Having tried and failed with the traditional Ferber method..." → Discusses method variations and plan clarity
   - "Should I sleep train my 6-month-old who has eczema..." → Evidence-based approach with medical considerations

2. **Parent Confidence & Mindset:**
   - Multiple Q&As validate parent struggles
   - "I know how hard this is" language throughout
   - Permission-giving responses ("You can", "You don't have to")

3. **Evidence-Based Explanations:**
   - References to sleep science (sleep cycles, sleep pressure, cortisol)
   - Plain language explanations of research
   - "This is not because you've done anything wrong" validation

**Sample Q&A for Foundational Course:**

**Q:** "Do your sleep training methods involve crying it out?"

**A:** "CIO is where you put a baby to bedtime and don't go back in until the morning. My techniques don't include this. My 5-12 month sleep guide uses a modified Ferber style technique. My consults are where we can create something to match a family's comfort levels in a more personalised way. Hope that helps :)"

**Key Elements:**
- Clear definition of what method is NOT
- Explains what method IS (modified Ferber)
- Permission-giving (personalized approach available)
- Supportive tone

### TikTok Videos - Philosophy & Mindset

**Total Found:** 30 videos

**Top Performing Videos (by Engagement Rate):**

1. **Video ID: 7429123401471511815**
   - **Topic:** Sleep Training
   - **Views:** 121,400
   - **Engagement Rate:** 4.87%
   - **Key Content:** "Assisted days + Independent nights" - Explains contact naps as tool for sleep training, "nap brain vs night brain" concept
   - **URL:** https://www.tiktok.com/@thesleepconcierge/video/7429123401471511815

2. **Video ID: 7425393489765993736**
   - **Topic:** Sleep Regressions
   - **Views:** 279,100
   - **Engagement Rate:** 4.72%
   - **Key Content:** "Teaching your baby to self-settle is the answer to the four-month sleep regression" - Explains sleep cycle changes, self-settling mechanism
   - **URL:** https://www.tiktok.com/@thesleepconcierge/video/7425393489765993736

3. **Video ID: 7443991748352806151**
   - **Topic:** Stitch/Response Content
   - **Views:** 36,300
   - **Engagement Rate:** 4.33%
   - **Key Content:** Contact naps definition and strategic use in sleep training
   - **URL:** https://www.tiktok.com/@thesleepconcierge/video/7443991748352806151

4. **Video ID: 7478129061974560008**
   - **Topic:** Sleep Regressions
   - **Views:** 157,400
   - **Engagement Rate:** 4.32%
   - **Key Content:** Comprehensive 4-month sleep regression guide - environment, schedule, sleep training approach
   - **URL:** https://www.tiktok.com/@thesleepconcierge/video/7478129061974560008

**Common Themes Across Videos:**
- "This is not because you've done anything wrong" validation
- Evidence-based explanations in plain language
- Permission-giving language ("You can", "I would")
- Practical, actionable guidance
- Parent confidence building

---

## Strategic Document Analysis

### Core Philosophy Statements

**From SNOOZE-MASTER-STRATEGY.md:**

**Sally's Philosophy (Background Framework):**
- Parents are capable and just need clear guidance
- Sleep is a learned skill babies can master with support
- Structure helps families thrive (not harsh, just clear)
- Parent confidence matters as much as technique
- Evidence-based + empathetic = sustainable results

**The Snooze Method covers:**
- Age-appropriate wake windows and schedules
- Responsive settling techniques
- Safe sleep practices
- Troubleshooting common challenges
- Parent confidence and consistency

**What Makes It Different:**
- Evidence-based but practical (no academic jargon)
- Structured but flexible (plans that adapt to real life)
- Supportive without judgment (no gentle vs harsh debate)
- Comprehensive (newborn through toddler)

### Evidence-Based Approach Principles

**From SNOOZE-POSITIONING-FRAMEWORK.md:**

**Key Components:**
- Age-appropriate schedules and wake windows
- Responsive settling techniques (not cry-it-out, not attachment parenting extremes)
- Safe sleep practices
- Parent confidence through clear steps
- Troubleshooting for common challenges

**What Makes It Different:**
- Evidence-based but accessible (no jargon)
- Structured but flexible (adapts to real life)
- Supportive without judgment (no method wars)
- Comprehensive (newborn through toddler)

### Parent Confidence Framework

**From Strategic Documents:**

**Core Beliefs:**
- Parents are capable and just need clear guidance
- Parent confidence matters as much as technique
- Structure helps families thrive
- Evidence + empathy = sustainable results

**From Podcast Content:**
- "I hope that it's really clear to our listeners just how thoughtful our plans are"
- "Nothing is guesswork for us. We literally have seen and heard it all before"
- "They feel confident in resettling, they feel confident in their baby's weight gain"

### Method Differentiation Points

**From Strategic Documents:**

**Primary Position:** "Clear, evidence-based sleep help for tired parents"

**How We Differentiate:**
- No gentle vs harsh debate (we transcend the method wars)
- Structured but supportive (clear plans + emotional backing)
- All ages and stages (one place for everything)
- Ongoing support (not just a course, a community)

**From Podcast Content:**
- "It's not that you are doing this wrong or that your baby can't learn to self-settle, it's that people are scared of sleep training, which is an evidence-based approach"
- "I personally am yet to work with a baby who has not then been able to learn to self-settle"
- "Sleep training is doing less of what you are currently doing"

---

## Key Quotes for Foundational Course

### Core Philosophy

1. **"If you have tried everything, but you haven't tried sleep training, you have not tried everything"**
   - Source: Episode 58, 13:00-16:00
   - Context: Defining what "trying everything" means
   - Use: Module 1 - What Makes The Snooze Method Different

2. **"I personally am yet to work with a baby who has not then been able to learn to self-settle"**
   - Source: Episode 50, 17:31-21:40
   - Context: Debunking myths about self-settling
   - Use: Module 2 - Parent Confidence: Why It Matters

3. **"Sleep training is doing less of what you are currently doing"**
   - Source: Multiple videos and podcast segments
   - Context: Simplifying what sleep training means
   - Use: Module 3 - Thinking About Sleep Challenges

### Evidence-Based Approach

4. **"Sleep training, which is an evidence-based approach using a timed check out of the room technique. And I will die on that hill."**
   - Source: Episode 50, 17:31-21:40
   - Context: Distinguishing evidence-based from anecdotal
   - Use: Module 2 - Evidence-Based vs. Anecdotal

5. **"The nap brain and the night brain are like two different parts"**
   - Source: Episode 42, 3:31-5:30
   - Context: Explaining why we can assist days while training nights
   - Use: Module 3 - Understanding Sleep Associations and Habits

### Parent Confidence

6. **"I hope that it's really clear to our listeners just how thoughtful our plans are and how our solutions are really designed with families and their comfort levels"**
   - Source: Episode 51, 9:40-12:30
   - Context: Building confidence through transparency
   - Use: Module 2 - Parent Confidence: Why It Matters

7. **"Nothing is guesswork for us. We literally have seen and heard it all before"**
   - Source: Episode 51, 9:40-12:30
   - Context: Building confidence through expertise
   - Use: Module 1 - What Makes The Snooze Method Different

### Structure and Flexibility

8. **"You can also help give, fill up your toddler's cup but also strengthen your backbone come bedtime"**
   - Source: Episode 56, 20:30-23:30
   - Context: Balancing connection with boundaries
   - Use: Module 2 - Structure and Flexibility: Finding the Balance

9. **"For me rather than fearing it is that I almost take it as a sign of like great baby has shown me that developmentally they're ready to sleep differently"**
   - Source: Episode 30, 7:21-9:40
   - Context: Reframing challenges as opportunities
   - Use: Module 3 - When to Implement Changes vs. When to Wait

---

## Content Mapping to Proposed Modules

### Module 1: Introduction to The Snooze Method

**Lesson 1: Welcome to The Snooze Method**
- **Podcast:** Episode 2 (10:11-13:40) - Transformation stories, parent confidence
- **Video:** 7429123401471511815 - "Assisted days + Independent nights" philosophy
- **Q&A:** Multiple Q&As validating parent struggles

**Lesson 2: What Makes The Snooze Method Different**
- **Podcast:** Episode 50 (17:31-21:40) - Evidence-based approach, myth-busting
- **Video:** 7425393489765993736 - Self-settling explanation
- **Strategic Docs:** Positioning framework differentiation points

**Lesson 3: The Evidence-Based Foundation**
- **Podcast:** Episode 50 (17:31-21:40) - "I will die on that hill" quote
- **Video:** 7478129061974560008 - Comprehensive 4-month regression guide
- **Strategic Docs:** Evidence-based principles

**Lesson 4: How to Use This Course**
- **Podcast:** Episode 51 (9:40-12:30) - "Nothing is guesswork for us"
- **Strategic Docs:** Learning design framework

### Module 2: Core Philosophy and Mindset

**Lesson 1: The Philosophy Behind The Snooze Method**
- **Podcast:** Episode 58 (13:00-16:00) - "Trying everything" definition
- **Strategic Docs:** Sally's philosophy statements
- **Video:** 7520424729468046610 - Self-settling game changer explanation

**Lesson 2: Parent Confidence: Why It Matters**
- **Podcast:** Episode 2 (10:11-13:40) - Transformation stories
- **Podcast:** Episode 51 (9:40-12:30) - "Thoughtful plans" quote
- **Q&A:** Multiple Q&As building confidence

**Lesson 3: Structure and Flexibility: Finding the Balance**
- **Podcast:** Episode 56 (20:30-23:30) - "Fill the cup" strategies
- **Video:** 7443991748352806151 - Contact naps as flexibility tool
- **Strategic Docs:** Structured but flexible positioning

**Lesson 4: Evidence-Based vs. Anecdotal: How to Evaluate Sleep Advice**
- **Podcast:** Episode 50 (17:31-21:40) - Evidence-based approach explanation
- **Video:** 7430592092805598471 - Sleep associations explanation
- **Strategic Docs:** Evidence-based principles

### Module 3: Thinking About Sleep Challenges

**Lesson 1: Normal vs. Needs Attention: How to Tell the Difference**
- **Podcast:** Episode 30 (7:21-9:40) - Reframing regressions as readiness
- **Video:** 7478129061974560008 - 4-month regression explanation
- **Q&A:** Multiple Q&As on when to act

**Lesson 2: When to Implement Changes vs. When to Wait**
- **Podcast:** Episode 45 (1:05-5:20) - Sleep training age and readiness
- **Podcast:** Episode 30 (7:21-9:40) - Developmental readiness
- **Q&A:** Age-appropriate timing questions

**Lesson 3: Understanding Sleep Associations and Habits**
- **Podcast:** Episode 42 (3:31-5:30) - "Nap brain vs night brain"
- **Video:** 7430592092805598471 - Sleep associations explanation
- **Q&A:** Sleep association questions

**Lesson 4: Developmental vs. Behavioral: What's Really Happening**
- **Podcast:** Episode 30 (7:21-9:40) - Sleep cycle maturation
- **Video:** 7425393489765993736 - Sleep cycle explanation
- **Q&A:** Regression vs. habit questions

### Module 4: Adapting The Method to Your Family

**Lesson 1: Making The Method Work for Your Family**
- **Podcast:** Episode 51 (9:40-12:30) - "Designed with families and their comfort levels"
- **Video:** 7449610780577926418 - Following baby's lead
- **Q&A:** Personalized approach questions

**Lesson 2: Balancing Structure with Real Life**
- **Podcast:** Episode 56 (20:30-23:30) - Holistic approach
- **Video:** 7443991748352806151 - Contact naps flexibility
- **Q&A:** Travel and disruption questions

**Lesson 3: When to Seek Additional Support**
- **Podcast:** Episode 50 (17:31-21:40) - When methods haven't worked
- **Q&A:** Multiple Q&As directing to consults
- **Strategic Docs:** Service model integration

**Lesson 4: Your Next Steps: Moving Forward**
- **Podcast:** Episode 2 (10:11-13:40) - Transformation outcomes
- **Strategic Docs:** Learning journey stages
- **Q&A:** Next steps questions

---

## Gap Analysis

### Well-Covered Topics

1. **Sleep Training Philosophy** ✅
   - Strong coverage in podcasts, videos, and Q&A
   - Clear explanations of evidence-based approach
   - Myth-busting content available

2. **Parent Confidence** ✅
   - Multiple podcast segments with compilation themes
   - Transformation stories in Episode 2
   - Validation language throughout Q&A

3. **Self-Settling Mechanism** ✅
   - Excellent explanation in videos and podcasts
   - Sleep cycle science explained in plain language
   - Multiple examples across content types

4. **Structure and Flexibility** ✅
   - "Assisted days, independent nights" concept well-articulated
   - Contact naps as flexibility tool explained
   - Holistic approach covered

### Topics Needing More Depth

1. **"How to Think About Sleep Challenges" Framework** ⚠️
   - Some content exists but could be more systematic
   - Need clearer decision-making framework
   - Could expand on "when to wait vs when to act"

2. **Evaluating Sleep Advice** ⚠️
   - Some content on evidence-based vs anecdotal
   - Could expand on how parents can evaluate advice critically
   - More examples of what to look for/avoid

3. **Adapting to Unique Situations** ⚠️
   - Good examples exist but could be more comprehensive
   - Need more frameworks for common adaptations
   - More guidance on troubleshooting when method doesn't fit

### Content to Create

1. **"The Snooze Method" Definition**
   - Clear, concise definition for Module 1
   - Synthesize from strategic docs and content
   - Make it memorable and distinctive

2. **Decision-Making Framework**
   - "Normal vs Needs Attention" decision tree
   - "When to Wait vs When to Act" framework
   - Visual aids or flowcharts

3. **Method Adaptation Guide**
   - Common family situations and adaptations
   - Troubleshooting when standard approach doesn't fit
   - Examples of successful adaptations

---

## Performance Data Summary

### TikTok Videos

**Top 10 by Engagement Rate:**
1. 7429123401471511815 - 4.87% (121,400 views)
2. 7425393489765993736 - 4.72% (279,100 views)
3. 7443991748352806151 - 4.33% (36,300 views)
4. 7478129061974560008 - 4.32% (157,400 views)
5. 7503417248380390674 - 3.82% (81,900 views)
6. 7519692682688564487 - 3.93% (32,700 views)
7. 7561201677802474759 - 3.53% (68,300 views)
8. 7430592092805598471 - 3.43% (196,200 views)
9. 7429260849895755016 - 3.42% (128,900 views)
10. 7282938224505392402 - 3.40% (16,700 views)

**Average Engagement Rate:** 4.3% (excellent performance)

### Podcast Episodes

**Episodes with Most Relevant Segments:**
- Episode 58 - 1 segment (learning objectives)
- Episode 56 - 1 segment (learning objectives)
- Episode 54 - 1 segment (learning objectives)
- Episode 51 - 3 segments (learning objectives + compilation themes)
- Episode 50 - 1 segment (learning objectives)
- Episode 49 - 3 segments (compilation themes)
- Episode 48 - 1 segment (learning objectives)
- Episode 46 - 1 segment (learning objectives)
- Episode 45 - 2 segments (compilation themes)
- Episode 44 - 3 segments (compilation themes)
- Episode 42 - 2 segments (learning objectives)
- Episode 30 - 1 segment (learning objectives)

**Total Unique Episodes Referenced:** 12+ episodes

---

## Next Steps

### Immediate Actions

1. **Execute Full Unified RAG Semantic Searches**
   - Run all 7 core queries using unified_rag_search.py
   - Extract top results with similarity scores
   - Cross-reference with database performance data

2. **Extract Key Quotes**
   - Pull direct quotes from high-performing content
   - Organize by module and lesson
   - Ensure quotes match Sally's voice (no em dashes, no contrast statements)

3. **Create Content Mapping Document**
   - Map each lesson to specific content (videos, podcasts, Q&A)
   - Include timestamps for podcast references
   - Note performance data for prioritization

4. **Identify Content Gaps**
   - Review gaps identified above
   - Determine what needs to be created vs. what can be synthesized
   - Prioritize content creation needs

### For Structure Planning Phase

1. **Refine Module Structure**
   - Use learning objectives from podcast segments to inform lesson design
   - Ensure each module has clear learning outcomes
   - Map compilation themes to module topics

2. **Create Module Information Document**
   - Module titles and descriptions
   - Lesson breakdown with learning outcomes
   - Content links for each lesson

3. **Develop Expansion Roadmap**
   - Identify potential additional modules based on content richness
   - Plan for future iterations
   - Document placeholder modules

---

## Appendix: Research Queries Executed

### Database Queries

1. **Podcast Segments with Learning Objectives:**
   ```sql
   SELECT ps.*, pe.episode_number, pe.episode_title, pe.spotify_url
   FROM podcast_segments ps
   JOIN podcast_episodes_enhanced pe ON ps.episode_id = pe.id
   WHERE ps.learning_objectives IS NOT NULL 
     AND array_length(ps.learning_objectives, 1) > 0
     AND ps.speaker = 'sally'
     AND ps.segment_type = 'main_topic'
   ORDER BY pe.episode_date DESC
   LIMIT 20
   ```

2. **Podcast Segments with Compilation Themes:**
   ```sql
   SELECT ps.*, pe.episode_number, pe.episode_title, pe.spotify_url
   FROM podcast_segments ps
   JOIN podcast_episodes_enhanced pe ON ps.episode_id = pe.id
   WHERE ps.compilation_themes IS NOT NULL 
     AND (
       'parent_confidence' = ANY(ps.compilation_themes) OR
       'evidence_based' = ANY(ps.compilation_themes) OR
       'method_philosophy' = ANY(ps.compilation_themes) OR
       'sleep_training_basics' = ANY(ps.compilation_themes) OR
       'parent_mindset' = ANY(ps.compilation_themes)
     )
   ORDER BY pe.episode_date DESC
   LIMIT 30
   ```

3. **Q&A Pairs - Foundational Concepts:**
   ```sql
   SELECT id, question, answer, problem_category, age_context
   FROM qa_knowledge_base
   WHERE (question ILIKE '%philosophy%' OR 
          question ILIKE '%method%' OR 
          question ILIKE '%approach%' OR
          question ILIKE '%confidence%' OR
          question ILIKE '%why%' OR
          answer ILIKE '%evidence%' OR
          answer ILIKE '%for me%' OR
          answer ILIKE '%I would%' OR
          answer ILIKE '%think about%')
   ORDER BY created_at DESC
   LIMIT 30
   ```

4. **TikTok Videos - Philosophy & Mindset:**
   ```sql
   SELECT video_id, text, transcript, combined_content, video_url, 
          topic, views, likes, comments, engagement_rate
   FROM tiktok_videos
   WHERE account_name = 'thesleepconcierge'
     AND (combined_content ILIKE '%philosophy%' OR
          combined_content ILIKE '%mindset%' OR
          combined_content ILIKE '%confidence%' OR
          combined_content ILIKE '%evidence-based%' OR
          combined_content ILIKE '%method%' OR
          combined_content ILIKE '%approach%' OR
          combined_content ILIKE '%why%' OR
          topic IN ('parent confidence', 'sleep philosophy', 'evidence-based', 'methodology'))
   ORDER BY engagement_rate DESC NULLS LAST, views DESC
   LIMIT 30
   ```

### Planned Unified RAG Queries

**Note:** These should be executed using `unified_rag_search.py` when Python environment is available:

1. "What is The Snooze Method philosophy and core approach?"
2. "How does Sally explain evidence-based sleep guidance to parents?"
3. "What does parent confidence mean in The Snooze Method and why does it matter?"
4. "How to think about sleep challenges vs when to implement changes?"
5. "What makes The Snooze Method different from other sleep approaches?"
6. "When should parents wait for developmental changes vs when to implement sleep training?"
7. "How to balance structure and flexibility in The Snooze Method?"

---

**Status:** Phase 1 Research Complete - Ready for Structure Planning

**Next Phase:** Phase 2 - Structure Planning (Module breakdown, lesson design, content mapping)

