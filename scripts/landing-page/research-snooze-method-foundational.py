#!/usr/bin/env python3
"""
Research Script for The Snooze Method Foundational Course
Executes unified RAG semantic searches across videos, Q&A, and podcast segments
to discover foundational content on philosophy, mindset, and core principles.
"""

import sys
import os
import json
from pathlib import Path
from datetime import datetime

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent.parent / 'brand-content-consultant' / 'src'))

from unified_rag_search import unified_search

# Core semantic queries for foundational course research
CORE_QUERIES = [
    {
        'name': 'Core Method Philosophy',
        'query': 'What is The Snooze Method philosophy and core approach?',
        'filters': {'podcast': {'speaker': 'sally', 'segment_type': 'main_topic'}}
    },
    {
        'name': 'Evidence-Based Foundation',
        'query': 'How does Sally explain evidence-based sleep guidance to parents?',
        'filters': None
    },
    {
        'name': 'Parent Confidence Framework',
        'query': 'What does parent confidence mean in The Snooze Method and why does it matter?',
        'filters': None
    },
    {
        'name': 'Thinking About Sleep Challenges',
        'query': 'How to think about sleep challenges vs when to implement changes?',
        'filters': None
    },
    {
        'name': 'Method Differentiation',
        'query': 'What makes The Snooze Method different from other sleep approaches?',
        'filters': None
    },
    {
        'name': 'When to Wait vs When to Act',
        'query': 'When should parents wait for developmental changes vs when to implement sleep training?',
        'filters': None
    },
    {
        'name': 'Structure and Flexibility Balance',
        'query': 'How to balance structure and flexibility in The Snooze Method?',
        'filters': None
    }
]

# Learning objectives query
LEARNING_OBJECTIVES_QUERY = {
    'name': 'Foundational Sleep Principles',
    'query': 'foundational sleep principles parent mindset evidence-based approach',
    'filters': {'podcast': {'segment_type': 'main_topic', 'speaker': 'sally'}}
}

# Compilation themes query
COMPILATION_THEMES_QUERY = {
    'name': 'Parent Confidence and Evidence-Based',
    'query': 'parent confidence evidence-based approach method philosophy',
    'filters': {'podcast': {'compilation_themes': ['parent_confidence', 'evidence_based', 'method_philosophy']}}
}


def format_timestamp(seconds):
    """Format seconds into MM:SS"""
    if seconds is None:
        return None
    minutes = seconds // 60
    secs = seconds % 60
    return f"{minutes:02d}:{secs:02d}"


def format_timestamp_range(start, end):
    """Format timestamp range"""
    if start is None:
        return None
    start_str = format_timestamp(start)
    if end is not None:
        end_str = format_timestamp(end)
        return f"{start_str} - {end_str}"
    return start_str


def execute_research():
    """Execute all research queries and compile results"""
    
    print("🔍 Starting Snooze Method Foundational Course Research...")
    print(f"Timestamp: {datetime.now().isoformat()}\n")
    
    all_results = {
        'core_queries': {},
        'learning_objectives': [],
        'compilation_themes': [],
        'summary': {
            'total_videos': 0,
            'total_qa': 0,
            'total_podcast_segments': 0,
            'unique_episodes': set(),
            'queries_executed': len(CORE_QUERIES) + 2
        }
    }
    
    # Execute core queries
    print("📊 Executing Core Semantic Queries...")
    for i, query_config in enumerate(CORE_QUERIES, 1):
        print(f"  [{i}/{len(CORE_QUERIES)}] {query_config['name']}...")
        
        try:
            results = unified_search(
                query=query_config['query'],
                content_types=['video', 'qa', 'podcast'],
                limit_per_type=15,
                min_similarity=0.6,
                filters=query_config['filters']
            )
            
            # Process results
            query_results = {
                'query': query_config['query'],
                'results': [],
                'by_type': {
                    'video': [],
                    'qa': [],
                    'podcast': []
                },
                'summary': results['summary']
            }
            
            # Organize by type and extract key info
            for result in results['results']:
                content_type = result['content_type']
                query_results['by_type'][content_type].append({
                    'id': result['id'],
                    'similarity': result['similarity'],
                    'title': result['title'],
                    'content_preview': result['content'][:200] + '...' if len(result['content']) > 200 else result['content'],
                    'metadata': result['metadata']
                })
                
                # Track unique episodes
                if content_type == 'podcast':
                    episode_num = result['metadata'].get('episode_number')
                    if episode_num:
                        all_results['summary']['unique_episodes'].add(episode_num)
            
            query_results['results'] = results['results']
            all_results['core_queries'][query_config['name']] = query_results
            
            # Update summary counts
            all_results['summary']['total_videos'] += len(query_results['by_type']['video'])
            all_results['summary']['total_qa'] += len(query_results['by_type']['qa'])
            all_results['summary']['total_podcast_segments'] += len(query_results['by_type']['podcast'])
            
            print(f"    ✓ Found {results['summary']['total']} results ({results['summary']['by_type']['video']} videos, {results['summary']['by_type']['qa']} Q&A, {results['summary']['by_type']['podcast']} podcasts)")
            
        except Exception as e:
            print(f"    ✗ Error: {str(e)}")
            all_results['core_queries'][query_config['name']] = {'error': str(e)}
    
    # Execute learning objectives query
    print(f"\n🎯 Extracting Learning Objectives from Podcast Segments...")
    try:
        lo_results = unified_search(
            query=LEARNING_OBJECTIVES_QUERY['query'],
            content_types=['podcast'],
            filters=LEARNING_OBJECTIVES_QUERY['filters'],
            limit_per_type=20,
            min_similarity=0.6
        )
        
        for result in lo_results['results']:
            if result['content_type'] == 'podcast':
                learning_objectives = result['metadata'].get('learning_objectives', [])
                if learning_objectives:
                    all_results['learning_objectives'].append({
                        'episode_number': result['metadata'].get('episode_number'),
                        'episode_title': result['metadata'].get('episode_title'),
                        'segment_type': result['metadata'].get('segment_type'),
                        'timestamp': result['metadata'].get('timestamp'),
                        'learning_objectives': learning_objectives,
                        'similarity': result['similarity'],
                        'content_preview': result['content'][:200] + '...'
                    })
        
        print(f"  ✓ Found {len(all_results['learning_objectives'])} segments with learning objectives")
        
    except Exception as e:
        print(f"  ✗ Error: {str(e)}")
        all_results['learning_objectives'] = {'error': str(e)}
    
    # Execute compilation themes query
    print(f"\n🏷️  Finding Compilation Themes...")
    try:
        ct_results = unified_search(
            query=COMPILATION_THEMES_QUERY['query'],
            content_types=['podcast'],
            filters=COMPILATION_THEMES_QUERY['filters'],
            limit_per_type=20,
            min_similarity=0.6
        )
        
        for result in ct_results['results']:
            if result['content_type'] == 'podcast':
                compilation_themes = result['raw_data'].get('compilation_themes', [])
                if compilation_themes:
                    all_results['compilation_themes'].append({
                        'episode_number': result['metadata'].get('episode_number'),
                        'episode_title': result['metadata'].get('episode_title'),
                        'compilation_themes': compilation_themes,
                        'timestamp': result['metadata'].get('timestamp'),
                        'similarity': result['similarity'],
                        'content_preview': result['content'][:200] + '...'
                    })
        
        print(f"  ✓ Found {len(all_results['compilation_themes'])} segments with relevant compilation themes")
        
    except Exception as e:
        print(f"  ✗ Error: {str(e)}")
        all_results['compilation_themes'] = {'error': str(e)}
    
    # Convert set to list for JSON serialization
    all_results['summary']['unique_episodes'] = sorted(list(all_results['summary']['unique_episodes']))
    
    print(f"\n✅ Research Complete!")
    print(f"   Total Videos: {all_results['summary']['total_videos']}")
    print(f"   Total Q&A: {all_results['summary']['total_qa']}")
    print(f"   Total Podcast Segments: {all_results['summary']['total_podcast_segments']}")
    print(f"   Unique Episodes: {len(all_results['summary']['unique_episodes'])}")
    
    return all_results


def save_results(results, output_path):
    """Save research results to JSON file"""
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Results saved to: {output_path}")


if __name__ == '__main__':
    # Execute research
    results = execute_research()
    
    # Save results
    output_file = Path(__file__).parent.parent / 'docs' / 'SNOOZE-METHOD-RESEARCH-RAW.json'
    save_results(results, output_file)
    
    print("\n📝 Next step: Review results and create SNOOZE-METHOD-RESEARCH.md")

