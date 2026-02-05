#!/usr/bin/env python3
"""
Rebuild all complete age pages with simplified understanding sections
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from scripts.build_complete_age_pages import build_complete_page

if __name__ == '__main__':
    ages = ['newborn', '3-4-month', '5-12-month', 'toddler']
    for age in ages:
        try:
            build_complete_page(age)
        except Exception as e:
            print(f"❌ Error building {age}: {e}")

