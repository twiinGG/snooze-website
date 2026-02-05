#!/usr/bin/env python3
"""
Scrape Missing Pages
Fetches missing pages from sitemap and stores them in Supabase page_scrape_data table.
"""

import os
import sys
import re
import requests
from datetime import datetime
from typing import Dict, List, Optional
import hashlib

# Try to load from dotenv if available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Try to import supabase
try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False
    print("⚠️  Supabase not available - will use MCP instead")

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://qwwwosoafcsupebpangw.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

if SUPABASE_AVAILABLE and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None

# Missing URLs from sitemap verification
MISSING_URLS = [
    "https://joinsnooze.com/snooze",
    "https://joinsnooze.com/snooze-library",
    "https://joinsnooze.com/snooze-waitlist",
    "https://joinsnooze.com/toddler-sleep-help"
]

def extract_text_content(html: str) -> str:
    """Extract text content from HTML using regex."""
    if not html:
        return ""
    
    # Remove script and style tags
    html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove all HTML tags
    text = re.sub(r'<[^>]+>', ' ', html)
    
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    
    return text

def extract_headings(html: str) -> Dict[str, List[str]]:
    """Extract headings from HTML using regex."""
    if not html:
        return {"h1s": [], "h2s": [], "h3s": []}
    
    h1s = [re.sub(r'<[^>]+>', '', m).strip() for m in re.findall(r'<h1[^>]*>.*?</h1>', html, re.IGNORECASE | re.DOTALL)]
    h2s = [re.sub(r'<[^>]+>', '', m).strip() for m in re.findall(r'<h2[^>]*>.*?</h2>', html, re.IGNORECASE | re.DOTALL)]
    h3s = [re.sub(r'<[^>]+>', '', m).strip() for m in re.findall(r'<h3[^>]*>.*?</h3>', html, re.IGNORECASE | re.DOTALL)]
    
    # Filter out empty strings
    h1s = [h for h in h1s if h]
    h2s = [h for h in h2s if h]
    h3s = [h for h in h3s if h]
    
    return {"h1s": h1s, "h2s": h2s, "h3s": h3s}

def extract_meta_description(html: str) -> Optional[str]:
    """Extract meta description from HTML using regex."""
    if not html:
        return None
    
    match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    
    return None

def extract_canonical(html: str) -> Optional[str]:
    """Extract canonical URL from HTML using regex."""
    if not html:
        return None
    
    match = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    
    return None

def extract_title(html: str) -> Optional[str]:
    """Extract title from HTML using regex."""
    if not html:
        return None
    
    match = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    if match:
        return re.sub(r'<[^>]+>', '', match.group(1)).strip()
    
    return None

def scrape_page(url: str) -> Optional[Dict]:
    """Scrape a single page."""
    print(f"📥 Scraping: {url}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        html = response.text
        content_text = extract_text_content(html)
        headings = extract_headings(html)
        meta_description = extract_meta_description(html)
        canonical = extract_canonical(html)
        title = extract_title(html)
        word_count = len(content_text.split())
        
        # Determine category based on URL
        category = None
        sub_category = None
        
        if '/blog/' in url:
            category = 'lead_capture'
        elif '/products/' in url:
            category = 'lead_capture'
            sub_category = 'product'
        elif '/downloads/' in url:
            category = 'lead_capture'
            sub_category = 'downloadable'
        elif '/offers/' in url:
            category = 'checkout'
        elif 'snooze' in url.lower():
            category = 'lead_capture'
        elif 'waitlist' in url.lower():
            category = 'lead_capture'
        else:
            category = 'lead_capture'
        
        # Generate HTML hash
        html_hash = hashlib.md5(html.encode()).hexdigest()
        
        page_data = {
            "url": url,
            "html": html,
            "title": title,
            "meta_description": meta_description,
            "canonical": canonical,
            "h1s": headings["h1s"],
            "h2s": headings["h2s"],
            "h3s": headings["h3s"],
            "word_count": word_count,
            "category": category,
            "sub_category": sub_category,
            "html_hash": html_hash,
            "scraped_at": datetime.utcnow().isoformat() + "Z"
        }
        
        return page_data
        
    except Exception as e:
        print(f"  ❌ Error scraping {url}: {e}")
        return None

def store_page(page_data: Dict) -> bool:
    """Store scraped page in Supabase."""
    if not supabase:
        print(f"  ⚠️  Supabase not available - would store: {page_data['url']}")
        print(f"      Use MCP Supabase tool to store this data")
        return False
    
    try:
        response = supabase.table("page_scrape_data").upsert(
            page_data,
            on_conflict="url"
        ).execute()
        
        if response.data:
            print(f"  ✅ Stored: {page_data['url']} ({page_data['word_count']} words, "
                  f"{len(page_data['h1s'])} H1s, {len(page_data['h2s'])} H2s)")
            return True
        else:
            print(f"  ⚠️  No data returned for {page_data['url']}")
            return False
            
    except Exception as e:
        print(f"  ❌ Error storing {page_data['url']}: {e}")
        return False

def main():
    print("🚀 Scraping Missing Pages\n")
    print(f"📋 URLs to scrape: {len(MISSING_URLS)}\n")
    
    success_count = 0
    failed_count = 0
    
    for url in MISSING_URLS:
        page_data = scrape_page(url)
        
        if page_data:
            if store_page(page_data):
                success_count += 1
            else:
                failed_count += 1
        else:
            failed_count += 1
        
        print()  # Blank line between pages
    
    print(f"\n📊 Summary:")
    print(f"  ✅ Successfully scraped: {success_count}")
    print(f"  ❌ Failed: {failed_count}")
    print(f"  📄 Total: {len(MISSING_URLS)}")
    
    return success_count == len(MISSING_URLS)

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

