#!/usr/bin/env python3
"""
Analyze Age-Specific User Needs from RAG Knowledge Base
Queries TikTok videos, Q&A pairs, and comments to identify actual user queries and urgent needs
"""

import os
import sys
import json
from pathlib import Path
from collections import Counter, defaultdict
from datetime import datetime

# Add paths for imports
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root / "social-media-ingestion" / "scripts" / "python"))
sys.path.insert(0, str(project_root / "brand-content-consultant" / "src"))

from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment
env_path = project_root / ".env"
load_dotenv(env_path)
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Age group definitions matching the taxonomy
AGE_GROUPS = {
    "newborn": {
        "keywords": ["newborn", "0-3 months", "first 3 months", "0 month", "1 month", "2 month", "3 month", 
                    "8 weeks", "12 weeks", "first 12 weeks"],
        "age_range": "0-3 months"
    },
    "3-4-month": {
        "keywords": ["3 months", "4 months", "3-4 months", "four-month", "four month", "3 month", "4 month",
                    "3-4 month", "four month sleep regression"],
        "age_range": "3-4 months"
    },
    "5-12-month": {
        "keywords": ["5 months", "6 months", "7 months", "8 months", "9 months", "10 months", "11 months", "12 months",
                    "5-6 months", "7-9 months", "10-12 months", "5-12 months", "6-12 months",
                    "five month", "six month", "seven month", "eight month", "nine month", 
                    "ten month", "eleven month", "twelve month"],
        "age_range": "5-12 months"
    },
    "toddler": {
        "keywords": ["toddler", "13 months", "14 months", "15 months", "16 months", "17 months", "18 months",
                    "19 months", "20 months", "21 months", "22 months", "23 months", "24 months",
                    "2 year", "2 years", "two year", "13-18 months", "19-24 months"],
        "age_range": "12+ months"
    }
}

def query_qa_by_age(age_group_key: str, age_config: dict) -> list:
    """Query Q&A pairs relevant to age group"""
    print(f"\n📋 Querying Q&A pairs for {age_config['age_range']}...")
    
    try:
        # Get all Q&A pairs
        response = supabase.table('qa_knowledge_base').select(
            'id, question, answer, problem_category, age_context, created_at'
        ).execute()
        
        relevant_qa = []
        keywords = [k.lower() for k in age_config['keywords']]
        
        for qa in response.data or []:
            question = str(qa.get('question', '')).lower()
            answer = str(qa.get('answer', '')).lower()
            age_context = str(qa.get('age_context', '')).lower()
            problem = str(qa.get('problem_category', '')).lower()
            
            # Check if relevant to age group
            if any(kw in question or kw in answer or kw in age_context for kw in keywords):
                relevant_qa.append(qa)
        
        print(f"    ✅ Found {len(relevant_qa)} relevant Q&A pairs")
        return relevant_qa
        
    except Exception as e:
        print(f"    ❌ Error querying Q&A: {e}")
        return []

def query_comments_by_age(age_group_key: str, age_config: dict) -> list:
    """Query comments from TikTok videos relevant to age group"""
    print(f"\n💬 Querying comments for {age_config['age_range']}...")
    
    try:
        # Get comments from videos (comments table references video_id)
        response = supabase.table('tiktok_comments').select(
            'id, video_id, comment_text, likes, created_at, tiktok_videos(video_id, text, transcript, age_group, topic, views, engagement_rate)'
        ).limit(5000).execute()
        
        relevant_comments = []
        keywords = [k.lower() for k in age_config['keywords']]
        
        for comment in response.data or []:
            comment_text = str(comment.get('comment_text', '')).lower()
            
            # Check if comment mentions age group keywords
            if any(kw in comment_text for kw in keywords):
                # Also check if video is relevant
                video_data = comment.get('tiktok_videos')
                if video_data:
                    video_text = str(video_data.get('text', '')).lower()
                    video_transcript = str(video_data.get('transcript', '')).lower()
                    video_age = str(video_data.get('age_group', '')).lower()
                    
                    if any(kw in video_text or kw in video_transcript or kw in video_age for kw in keywords):
                        relevant_comments.append({
                            'comment_text': comment.get('comment_text'),
                            'likes': comment.get('likes', 0),
                            'video_views': video_data.get('views', 0),
                            'video_engagement': video_data.get('engagement_rate', 0),
                            'video_topic': video_data.get('topic'),
                            'created_at': comment.get('created_at')
                        })
        
        print(f"    ✅ Found {len(relevant_comments)} relevant comments")
        return relevant_comments
        
    except Exception as e:
        print(f"    ❌ Error querying comments: {e}")
        return []

def query_videos_by_age(age_group_key: str, age_config: dict) -> list:
    """Query TikTok videos relevant to age group"""
    print(f"\n📹 Querying videos for {age_config['age_range']}...")
    
    try:
        # Query videos
        response = supabase.table('tiktok_videos').select(
            'video_id, text, transcript, on_screen_text, topic, age_group, views, likes, comments, engagement_rate, performance_score, created_at'
        ).eq('account_name', 'thesleepconcierge').order('engagement_rate', desc=False).limit(1000).execute()
        
        relevant_videos = []
        keywords = [k.lower() for k in age_config['keywords']]
        
        for video in response.data or []:
            text = str(video.get('text', '')).lower()
            transcript = str(video.get('transcript', '')).lower()
            age_group = str(video.get('age_group', '')).lower()
            topic = str(video.get('topic', '')).lower()
            
            # Check if relevant
            if any(kw in text or kw in transcript or kw in age_group or kw in topic for kw in keywords):
                relevant_videos.append(video)
        
        # Sort by engagement/views
        relevant_videos.sort(key=lambda x: (
            x.get('engagement_rate') or 0,
            x.get('views') or 0
        ), reverse=True)
        
        print(f"    ✅ Found {len(relevant_videos)} relevant videos")
        return relevant_videos[:100]  # Top 100
        
    except Exception as e:
        print(f"    ❌ Error querying videos: {e}")
        return []

def extract_questions_from_text(text: str) -> list:
    """Extract questions from text (comments, Q&A, etc.)"""
    import re
    
    # Pattern to match questions
    question_pattern = r'[^.!?]*\?[^.!?]*[.!?]?'
    questions = re.findall(question_pattern, text, re.IGNORECASE)
    
    # Clean and filter
    cleaned = []
    for q in questions:
        q = q.strip()
        if len(q) > 10 and len(q) < 200:  # Reasonable question length
            cleaned.append(q)
    
    return cleaned

def analyze_user_needs_by_age():
    """Main analysis function"""
    print("=" * 80)
    print("AGE-SPECIFIC USER NEEDS ANALYSIS")
    print("=" * 80)
    
    results = {}
    
    for age_key, age_config in AGE_GROUPS.items():
        print(f"\n{'='*80}")
        print(f"Analyzing: {age_config['age_range']}")
        print(f"{'='*80}")
        
        # Query data sources
        qa_pairs = query_qa_by_age(age_key, age_config)
        comments = query_comments_by_age(age_key, age_config)
        videos = query_videos_by_age(age_key, age_config)
        
        # Extract questions
        all_questions = []
        
        # From Q&A
        for qa in qa_pairs:
            question = qa.get('question', '')
            if question:
                all_questions.append({
                    'text': question,
                    'source': 'qa',
                    'problem_category': qa.get('problem_category'),
                    'priority': 'high'  # Q&A questions are already filtered as important
                })
        
        # From comments
        for comment in comments[:200]:  # Top 200 comments
            comment_text = comment.get('comment_text', '')
            questions = extract_questions_from_text(comment_text)
            for q in questions:
                all_questions.append({
                    'text': q,
                    'source': 'comment',
                    'likes': comment.get('likes', 0),
                    'video_engagement': comment.get('video_engagement', 0),
                    'priority': 'medium'
                })
        
        # Analyze problem categories from Q&A
        problem_categories = Counter()
        for qa in qa_pairs:
            cat = qa.get('problem_category')
            if cat:
                problem_categories[cat.lower()] += 1
        
        # Get top video topics
        video_topics = Counter()
        for video in videos[:50]:  # Top 50 videos
            topic = video.get('topic')
            if topic:
                video_topics[topic.lower()] += 1
        
        # Analyze video engagement patterns
        high_engagement_videos = [v for v in videos if (v.get('engagement_rate') or 0) > 0.05]
        high_view_videos = [v for v in videos if (v.get('views') or 0) > 10000]
        
        results[age_key] = {
            'age_range': age_config['age_range'],
            'qa_count': len(qa_pairs),
            'comment_count': len(comments),
            'video_count': len(videos),
            'questions': all_questions[:50],  # Top 50 questions
            'top_problem_categories': dict(problem_categories.most_common(10)),
            'top_video_topics': dict(video_topics.most_common(10)),
            'high_engagement_videos': len(high_engagement_videos),
            'high_view_videos': len(high_view_videos),
            'avg_engagement_rate': sum(v.get('engagement_rate', 0) or 0 for v in videos) / len(videos) if videos else 0,
            'avg_views': sum(v.get('views', 0) or 0 for v in videos) / len(videos) if videos else 0
        }
        
        print(f"\n📊 Summary for {age_config['age_range']}:")
        print(f"   Q&A Pairs: {len(qa_pairs)}")
        print(f"   Comments: {len(comments)}")
        print(f"   Videos: {len(videos)}")
        print(f"   Questions Extracted: {len(all_questions)}")
        print(f"   Top Problem Categories: {list(problem_categories.most_common(5))}")
        print(f"   High Engagement Videos (>5%): {len(high_engagement_videos)}")
    
    return results

def generate_content_recommendations(results: dict):
    """Generate content positioning recommendations based on analysis"""
    print("\n" + "=" * 80)
    print("CONTENT POSITIONING RECOMMENDATIONS")
    print("=" * 80)
    
    recommendations = {}
    
    for age_key, data in results.items():
        print(f"\n{age_key.upper().replace('-', ' ')} ({data['age_range']}):")
        
        # Most urgent needs (high frequency problem categories)
        urgent_needs = list(data['top_problem_categories'].keys())[:5]
        
        # Most prominent topics (high engagement videos)
        prominent_topics = list(data['top_video_topics'].keys())[:5]
        
        # Key questions to address
        key_questions = [q['text'] for q in data['questions'][:10]]
        
        recommendations[age_key] = {
            'urgent_needs': urgent_needs,
            'prominent_topics': prominent_topics,
            'key_questions': key_questions,
            'content_focus': f"Focus on: {', '.join(urgent_needs[:3])}"
        }
        
        print(f"   Urgent Needs: {', '.join(urgent_needs[:3])}")
        print(f"   Prominent Topics: {', '.join(prominent_topics[:3])}")
        print(f"   Key Questions to Address: {len(key_questions)}")
    
    return recommendations

def main():
    """Main execution"""
    print("\n🔍 Starting Age-Specific User Needs Analysis...\n")
    
    # Run analysis
    results = analyze_user_needs_by_age()
    
    # Generate recommendations
    recommendations = generate_content_recommendations(results)
    
    # Save results
    output_dir = Path(__file__).parent.parent / "docs" / "content"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    output_file = output_dir / "AGE-SPECIFIC-USER-NEEDS-ANALYSIS.json"
    with open(output_file, 'w') as f:
        json.dump({
            'analysis_date': datetime.now().isoformat(),
            'results': results,
            'recommendations': recommendations
        }, f, indent=2, default=str)
    
    print(f"\n✅ Analysis complete! Results saved to: {output_file}")
    
    # Also generate markdown summary
    markdown_file = output_dir / "AGE-SPECIFIC-USER-NEEDS-ANALYSIS.md"
    with open(markdown_file, 'w') as f:
        f.write("# Age-Specific User Needs Analysis\n\n")
        f.write(f"**Analysis Date:** {datetime.now().strftime('%B %d, %Y')}\n\n")
        f.write("This document contains data-driven analysis of actual user queries, questions, and urgent needs from our knowledge base (TikTok videos, Q&A pairs, comments).\n\n")
        
        for age_key, data in results.items():
            f.write(f"\n## {data['age_range'].upper()}\n\n")
            f.write(f"**Data Sources:** {data['qa_count']} Q&A pairs, {data['comment_count']} comments, {data['video_count']} videos\n\n")
            
            f.write("### Most Urgent Needs (Top Problem Categories)\n\n")
            for problem, count in list(data['top_problem_categories'].items())[:10]:
                f.write(f"- **{problem.title()}**: {count} Q&A pairs\n")
            
            f.write("\n### Most Prominent Topics (High Engagement)\n\n")
            for topic, count in list(data['top_video_topics'].items())[:10]:
                f.write(f"- **{topic.title()}**: {count} videos\n")
            
            f.write("\n### Key Questions to Address\n\n")
            for i, q in enumerate(data['questions'][:15], 1):
                f.write(f"{i}. {q['text']}\n")
            
            rec = recommendations[age_key]
            f.write(f"\n### Content Positioning Recommendation\n\n")
            f.write(f"{rec['content_focus']}\n\n")
    
    print(f"📄 Markdown summary saved to: {markdown_file}")
    
    return results, recommendations

if __name__ == "__main__":
    main()

