#!/usr/bin/env python3
"""
Extract all schedules from toddler toolkit HTML files and compare against Sleep Schedule Bible.

This script:
1. Parses HTML files for schedule boxes
2. Extracts schedule information (times, ages, wake windows)
3. Compares against Sleep Schedule Bible
4. Generates accuracy report
"""

import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser
from typing import List, Dict, Any

# Get project root (script is in projects/snooze-website/scripts/landing-page/)
PROJECT_ROOT = Path(__file__).parent.parent.parent.parent
TODDLER_TOOLKIT_DIR = PROJECT_ROOT / "projects/snooze-website/kajabi-deployment/courses/toddler-toolkit"
SLEEP_BIBLE_PATH = PROJECT_ROOT / "docs/reference/SLEEP-SCHEDULE-BIBLE.md"
OUTPUT_DIR = PROJECT_ROOT / "projects/snooze-website/docs/landing-page"


class ScheduleExtractor(HTMLParser):
    """Extract schedule information from HTML schedule boxes."""
    
    def __init__(self):
        super().__init__()
        self.schedules = []
        self.current_schedule = None
        self.in_schedule_box = False
        self.in_list_item = False
        self.current_text = ""
        self.schedule_title = ""
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        # Check if we're entering a schedule box
        if tag == "div" and "schedule-box" in attrs_dict.get("class", ""):
            self.in_schedule_box = True
            self.current_schedule = {
                "items": [],
                "module": None,
                "lesson": None,
                "file": None
            }
        elif tag == "h4" and self.in_schedule_box:
            self.current_text = ""
        elif tag == "li" and self.in_schedule_box:
            self.in_list_item = True
            self.current_text = ""
        elif tag == "strong" and self.in_list_item:
            pass  # We'll capture text in handle_data
            
    def handle_endtag(self, tag):
        if tag == "div" and self.in_schedule_box:
            if self.current_schedule and self.current_schedule["items"]:
                self.schedules.append(self.current_schedule)
            self.in_schedule_box = False
            self.current_schedule = None
            self.schedule_title = ""
        elif tag == "h4" and self.in_schedule_box:
            self.schedule_title = self.current_text.strip()
            if self.current_schedule:
                self.current_schedule["title"] = self.schedule_title
            self.current_text = ""
        elif tag == "li" and self.in_list_item:
            if self.current_schedule and self.current_text.strip():
                self.current_schedule["items"].append(self.current_text.strip())
            self.in_list_item = False
            self.current_text = ""
            
    def handle_data(self, data):
        if self.in_list_item or (self.in_schedule_box and not self.current_schedule):
            self.current_text += data


def extract_schedules_from_file(file_path: Path, module: str, lesson: str) -> List[Dict[str, Any]]:
    """Extract all schedules from a single HTML file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parser = ScheduleExtractor()
    parser.feed(content)
    
    # Add module/lesson/file info to each schedule
    for schedule in parser.schedules:
        schedule["module"] = module
        schedule["lesson"] = lesson
        schedule["file"] = file_path.name
        
    return parser.schedules


def extract_all_schedules() -> List[Dict[str, Any]]:
    """Extract schedules from all HTML files in toddler toolkit."""
    all_schedules = []
    
    # Map file names to module/lesson
    file_mapping = {
        "module-2-lesson-1.html": ("Module 2", "Lesson 1: Schedules for 12-18 Months"),
        "module-2-lesson-2.html": ("Module 2", "Lesson 2: Schedules for 18-24 Months"),
        "module-2-lesson-3.html": ("Module 2", "Lesson 3: Schedules for 2-3 Years"),
        "module-3-lesson-1.html": ("Module 3", "Lesson 1: The 2-to-1 Nap Transition"),
    }
    
    for filename, (module, lesson) in file_mapping.items():
        file_path = TODDLER_TOOLKIT_DIR / filename
        if file_path.exists():
            schedules = extract_schedules_from_file(file_path, module, lesson)
            all_schedules.extend(schedules)
            print(f"✓ Extracted {len(schedules)} schedule(s) from {filename}")
    
    return all_schedules


def parse_schedule_item(item: str) -> Dict[str, Any]:
    """Parse a schedule item string into structured data."""
    # Pattern: "<strong>Time:</strong> Activity"
    time_match = re.search(r'<strong>([^<]+):</strong>\s*(.+)', item)
    if time_match:
        time_str = time_match.group(1).strip()
        activity = re.sub(r'<[^>]+>', '', time_match.group(2)).strip()  # Remove HTML tags
        return {
            "time": time_str,
            "activity": activity,
            "raw": item
        }
    return {"raw": item}


def load_sleep_bible() -> str:
    """Load the Sleep Schedule Bible content."""
    with open(SLEEP_BIBLE_PATH, 'r', encoding='utf-8') as f:
        return f.read()


def verify_schedules_against_bible(schedules: List[Dict], bible_content: str) -> Dict[str, Any]:
    """Compare extracted schedules against Sleep Schedule Bible."""
    verification_report = {
        "total_schedules": len(schedules),
        "verified_schedules": [],
        "discrepancies": [],
        "missing_from_bible": [],
        "accuracy_score": 0.0
    }
    
    # Key age ranges to check
    age_ranges = {
        "12-18 months": ["12+ months", "12 months", "13 months", "14 months", "15 months", "16 months", "17 months", "18 months"],
        "18-24 months": ["18 months", "19 months", "20 months", "21 months", "22 months", "23 months", "24 months"],
        "2-3 years": ["2 years", "2.5 years", "3 years"]
    }
    
    for schedule in schedules:
        schedule_title = schedule.get("title", "").lower()
        verification_result = {
            "schedule": schedule,
            "bible_reference": None,
            "matches": False,
            "discrepancies": [],
            "notes": []
        }
        
        # Try to match against bible content based on title/keywords
        # This is a simplified check - full verification would need more sophisticated matching
        verification_result["notes"].append("Manual verification needed against Sleep Schedule Bible")
        
        verification_report["verified_schedules"].append(verification_result)
    
    return verification_report


def main():
    """Main execution function."""
    print("🔍 Extracting schedules from toddler toolkit HTML files...\n")
    
    # Extract schedules
    schedules = extract_all_schedules()
    
    print(f"\n✅ Extracted {len(schedules)} total schedules\n")
    
    # Parse schedule items
    parsed_schedules = []
    for schedule in schedules:
        parsed_items = [parse_schedule_item(item) for item in schedule.get("items", [])]
        schedule["parsed_items"] = parsed_items
        parsed_schedules.append(schedule)
    
    # Load Sleep Schedule Bible
    print("📖 Loading Sleep Schedule Bible...")
    bible_content = load_sleep_bible()
    
    # Verify schedules
    print("🔍 Verifying schedules against Sleep Schedule Bible...\n")
    verification_report = verify_schedules_against_bible(parsed_schedules, bible_content)
    
    # Save results
    output_file = OUTPUT_DIR / "toddler_toolkit_schedule_extraction.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            "schedules": parsed_schedules,
            "verification_report": verification_report,
            "extraction_date": str(Path(__file__).stat().st_mtime)
        }, f, indent=2, default=str)
    
    print(f"✅ Results saved to: {output_file}")
    
    # Print summary
    print("\n" + "="*60)
    print("SCHEDULE EXTRACTION SUMMARY")
    print("="*60)
    print(f"Total schedules extracted: {len(parsed_schedules)}")
    
    for schedule in parsed_schedules:
        print(f"\n📍 {schedule['file']} ({schedule['module']}, {schedule['lesson']})")
        print(f"   Title: {schedule.get('title', 'N/A')}")
        print(f"   Items: {len(schedule.get('parsed_items', []))}")
    
    print("\n" + "="*60)
    print(f"\n✅ Schedule extraction complete!")
    print(f"📄 Full results: {output_file}")
    print(f"\n⚠️  Manual verification required: Compare extracted schedules against Sleep Schedule Bible")


if __name__ == "__main__":
    main()

