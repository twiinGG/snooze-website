#!/usr/bin/env python3
"""
Phase 4: Quality Assurance Review
Comprehensive review of generated HTML pages for voice consistency, technical accuracy, and content accuracy

Usage:
    python3 qa_review.py

Author: Snooze Website Development
Date: December 2025
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List, Any
from collections import defaultdict

# Paths
SCRIPT_DIR = Path(__file__).parent
PAGES_DIR = SCRIPT_DIR.parent
GENERATED_DIR = PAGES_DIR / "generated-html-pages"
CONTENT_DIR = PAGES_DIR / "GENERATED-CONTENT"
TEMPLATE_FILE = PAGES_DIR / "generated-html-pages" / "3-4-month-course-landing-page.html"
DATA_FILE = PAGES_DIR / "COURSE-DATA-COLLECTION.md"

# Course configuration for validation
COURSE_CONFIG = {
    "5-12-month-guide": {
        "name": "5-12 Month Course",
        "modules": 6,
        "lessons": 23,
        "url": "https://joinsnooze.com/5-12-month-baby-sleep-course",
        "has_parts": True,
        "part1": "Part 1: The Prep",
        "part2": "Part 2: The Plan"
    },
    "toddler-toolkit": {
        "name": "Toddler Toolkit",
        "modules": 7,
        "lessons": 25,
        "url": "https://joinsnooze.com/toddler-toolkit",
        "has_parts": False
    },
    "snooze-method": {
        "name": "The Snooze Method",
        "modules": 4,
        "lessons": 16,
        "url": "https://joinsnooze.com/snooze-method",
        "has_parts": False
    },
    "newborn-guide": {
        "name": "Newborn Sleep Guide",
        "modules": 9,
        "lessons": 0,  # Guide format
        "url": "https://joinsnooze.com/newborn-sleep-guide",
        "has_parts": False,
        "is_guide": True
    }
}

# Tone of voice violations to check
TONE_VIOLATIONS = {
    "em_dash": r"—",  # Em dashes
    "should_must": r"\b(you should|you must|must|should)\b",
    "solution": r"\b(solution|solutions)\b",
    "contrast_statement": r"it's not about.*it's about",
    "always_never": r"\b(always|never)\b"
}

# Preferred alternatives
TONE_PREFERENCES = {
    "use_i_would": r"\b(I would|I like to|you can)\b",
    "use_usually": r"\b(usually|often|typically)\b"
}


def read_file_content(filepath: Path) -> str:
    """Read file content safely."""
    try:
        return filepath.read_text(encoding='utf-8')
    except Exception as e:
        return f"Error reading file: {e}"


def check_tone_of_voice(html_content: str, course_name: str) -> Dict[str, Any]:
    """Check tone of voice compliance."""
    issues = []
    warnings = []
    
    # Remove HTML comments and tags for content-only checking
    # Extract only text content (between > and <)
    text_content = re.sub(r'<!--.*?-->', '', html_content, flags=re.DOTALL)  # Remove comments
    text_content = re.sub(r'<[^>]+>', ' ', text_content)  # Remove tags, replace with space
    text_content = re.sub(r'\s+', ' ', text_content)  # Normalize whitespace
    
    # Check for violations in actual content only
    for violation_name, pattern in TONE_VIOLATIONS.items():
        matches = re.finditer(pattern, text_content, re.IGNORECASE)
        for match in matches:
            context = text_content[max(0, match.start()-50):match.end()+50]
            # Skip if it's in a common phrase that's acceptable
            if violation_name == "should_must" and "should be added" in context.lower():
                continue  # Skip "should be added" in comments
            
            issues.append({
                "type": "tone_violation",
                "violation": violation_name,
                "match": match.group(),
                "context": context.strip(),
                "severity": "high" if violation_name in ["should_must", "solution"] else "medium"
            })
    
    # Check for preferred patterns (positive indicators)
    for pref_name, pattern in TONE_PREFERENCES.items():
        matches = list(re.finditer(pattern, html_content, re.IGNORECASE))
        if matches:
            warnings.append({
                "type": "tone_preference",
                "preference": pref_name,
                "count": len(matches),
                "status": "good"
            })
    
    return {
        "issues": issues,
        "warnings": warnings,
        "score": max(0, 100 - (len(issues) * 10))
    }


def check_technical_accuracy(html_content: str, course_slug: str, config: Dict) -> Dict[str, Any]:
    """Check technical accuracy (module counts, URLs, etc.)."""
    issues = []
    
    # Check module count
    module_count_matches = re.findall(r'<strong>(\d+)</strong>\s*modules?', html_content, re.IGNORECASE)
    if module_count_matches:
        found_count = int(module_count_matches[0])
        if found_count != config["modules"]:
            issues.append({
                "type": "module_count_mismatch",
                "expected": config["modules"],
                "found": found_count,
                "severity": "high"
            })
    
    # Check lesson count (if applicable)
    if config["lessons"] > 0:
        lesson_count_matches = re.findall(r'<strong>(\d+)</strong>\s*lessons?', html_content, re.IGNORECASE)
        if lesson_count_matches:
            found_count = int(lesson_count_matches[0])
            if found_count != config["lessons"]:
                issues.append({
                    "type": "lesson_count_mismatch",
                    "expected": config["lessons"],
                    "found": found_count,
                    "severity": "high"
                })
    
    # Check URL
    url_matches = re.findall(r'URL:\s*(https?://[^\s<]+)', html_content)
    if url_matches:
        found_url = url_matches[0]
        if found_url != config["url"]:
            issues.append({
                "type": "url_mismatch",
                "expected": config["url"],
                "found": found_url,
                "severity": "high"
            })
    
    # Check course name in title
    title_match = re.search(r'<h1[^>]*>(.*?)</h1>', html_content, re.DOTALL)
    if title_match:
        title = title_match.group(1).strip()
        if config["name"].lower() not in title.lower():
            issues.append({
                "type": "title_mismatch",
                "expected": config["name"],
                "found": title,
                "severity": "medium"
            })
    
    return {
        "issues": issues,
        "score": max(0, 100 - (len(issues) * 15))
    }


def check_html_structure(html_content: str, template_content: str) -> Dict[str, Any]:
    """Check HTML structure against template."""
    issues = []
    
    # Required sections
    required_sections = [
        ("hero", r'class="course-hero'),
        ("overview", r'class="course-overview'),
        ("curriculum", r'class="course-curriculum'),
        ("resources", r'class="course-resource|Included Resources'),
    ]
    
    for section_name, pattern in required_sections:
        if not re.search(pattern, html_content, re.IGNORECASE):
            issues.append({
                "type": "missing_section",
                "section": section_name,
                "severity": "high"
            })
    
    # Check for proper module accordion structure
    module_items = re.findall(r'class="course-module-item"', html_content)
    if not module_items:
        issues.append({
            "type": "missing_module_structure",
            "severity": "high"
        })
    
    # Check for toggle function
    if 'toggleCourseModule' not in html_content:
        issues.append({
            "type": "missing_toggle_function",
            "severity": "medium"
        })
    
    return {
        "issues": issues,
        "score": max(0, 100 - (len(issues) * 20))
    }


def check_content_accuracy(html_content: str, generated_content_file: Path) -> Dict[str, Any]:
    """Check content matches generated content from Phase 2."""
    issues = []
    
    if not generated_content_file.exists():
        return {
            "issues": [{"type": "missing_source_content", "severity": "medium"}],
            "score": 0
        }
    
    generated_content = read_file_content(generated_content_file)
    
    # Extract key phrases from generated content
    hero_match = re.search(r'\*\*Title:\*\* (.+)', generated_content)
    if hero_match:
        expected_title = hero_match.group(1).strip()
        if expected_title.lower() not in html_content.lower():
            issues.append({
                "type": "hero_title_mismatch",
                "expected": expected_title,
                "severity": "medium"
            })
    
    return {
        "issues": issues,
        "score": max(0, 100 - (len(issues) * 10))
    }


def generate_qa_report() -> Dict[str, Any]:
    """Generate comprehensive QA report for all pages."""
    report = {
        "generated_at": str(Path().cwd()),
        "pages_reviewed": [],
        "summary": {
            "total_pages": 0,
            "pages_passed": 0,
            "pages_failed": 0,
            "total_issues": 0,
            "critical_issues": 0
        }
    }
    
    template_content = read_file_content(TEMPLATE_FILE)
    
    for course_slug, config in COURSE_CONFIG.items():
        html_file = GENERATED_DIR / f"{course_slug}-landing-page.html"
        content_file = CONTENT_DIR / f"{course_slug}-content.md"
        
        if not html_file.exists():
            report["pages_reviewed"].append({
                "course": course_slug,
                "status": "missing",
                "error": "HTML file not found"
            })
            continue
        
        html_content = read_file_content(html_file)
        
        # Run all checks
        tone_check = check_tone_of_voice(html_content, config["name"])
        technical_check = check_technical_accuracy(html_content, course_slug, config)
        structure_check = check_html_structure(html_content, template_content)
        content_check = check_content_accuracy(html_content, content_file)
        
        # Calculate overall score
        scores = [
            tone_check["score"],
            technical_check["score"],
            structure_check["score"],
            content_check["score"]
        ]
        overall_score = sum(scores) / len(scores)
        
        # Collect all issues
        all_issues = (
            tone_check["issues"] +
            technical_check["issues"] +
            structure_check["issues"] +
            content_check["issues"]
        )
        
        critical_issues = [i for i in all_issues if i.get("severity") == "high"]
        
        page_report = {
            "course": course_slug,
            "course_name": config["name"],
            "status": "passed" if overall_score >= 70 and len(critical_issues) == 0 else "needs_review",
            "overall_score": round(overall_score, 1),
            "scores": {
                "tone_of_voice": tone_check["score"],
                "technical_accuracy": technical_check["score"],
                "html_structure": structure_check["score"],
                "content_accuracy": content_check["score"]
            },
            "issues": all_issues,
            "critical_issues": critical_issues,
            "tone_warnings": tone_check["warnings"],
            "issue_count": len(all_issues),
            "critical_count": len(critical_issues)
        }
        
        report["pages_reviewed"].append(page_report)
        report["summary"]["total_pages"] += 1
        
        if page_report["status"] == "passed":
            report["summary"]["pages_passed"] += 1
        else:
            report["summary"]["pages_failed"] += 1
        
        report["summary"]["total_issues"] += len(all_issues)
        report["summary"]["critical_issues"] += len(critical_issues)
    
    return report


def print_qa_report(report: Dict[str, Any]):
    """Print formatted QA report."""
    print("=" * 80)
    print("PHASE 4: QUALITY ASSURANCE REPORT")
    print("=" * 80)
    print()
    
    print(f"Summary:")
    print(f"  Total Pages: {report['summary']['total_pages']}")
    print(f"  Passed: {report['summary']['pages_passed']}")
    print(f"  Needs Review: {report['summary']['pages_failed']}")
    print(f"  Total Issues: {report['summary']['total_issues']}")
    print(f"  Critical Issues: {report['summary']['critical_issues']}")
    print()
    
    for page in report["pages_reviewed"]:
        print("=" * 80)
        print(f"Course: {page['course_name']} ({page['course']})")
        print(f"Status: {page['status'].upper()}")
        print(f"Overall Score: {page['overall_score']}/100")
        print()
        
        print("Scores by Category:")
        for category, score in page["scores"].items():
            status_icon = "✅" if score >= 80 else "⚠️" if score >= 70 else "❌"
            print(f"  {status_icon} {category.replace('_', ' ').title()}: {score}/100")
        print()
        
        if page["critical_issues"]:
            print(f"🚨 CRITICAL ISSUES ({len(page['critical_issues'])}):")
            for issue in page["critical_issues"]:
                print(f"  - {issue['type']}: {issue.get('match', issue.get('expected', 'N/A'))}")
                if "context" in issue:
                    print(f"    Context: ...{issue['context']}...")
            print()
        
        if page["issues"] and len(page["issues"]) > len(page["critical_issues"]):
            other_issues = [i for i in page["issues"] if i not in page["critical_issues"]]
            print(f"⚠️  Other Issues ({len(other_issues)}):")
            for issue in other_issues[:5]:  # Show first 5
                print(f"  - {issue['type']}: {issue.get('match', issue.get('expected', 'N/A'))}")
            if len(other_issues) > 5:
                print(f"  ... and {len(other_issues) - 5} more")
            print()
        
        if page["tone_warnings"]:
            print(f"✅ Tone of Voice Positives:")
            for warning in page["tone_warnings"]:
                print(f"  - {warning['preference']}: {warning['count']} instances found")
            print()
    
    print("=" * 80)


def main():
    """Main QA review function."""
    print("🔍 Starting Phase 4: Quality Assurance Review\n")
    
    report = generate_qa_report()
    
    # Save report
    report_file = GENERATED_DIR / "qa-report.json"
    with open(report_file, "w") as f:
        json.dump(report, f, indent=2)
    
    # Print report
    print_qa_report(report)
    
    print(f"\n📊 Full report saved to: {report_file}")
    print("=" * 80)


if __name__ == "__main__":
    main()

