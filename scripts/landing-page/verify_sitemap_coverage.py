#!/usr/bin/env python3
"""
Verify Sitemap Coverage
Compare sitemap URLs with scraped pages in Supabase database.
Identifies missing pages that need to be scraped.
"""

import os
import sys
import requests
import xml.etree.ElementTree as ET
from typing import List, Set
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
SITEMAP_URL = "https://joinsnooze.com/sitemap.xml"

def fetch_sitemap_urls() -> List[str]:
    """Fetch all URLs from the sitemap."""
    print(f"📥 Fetching sitemap from {SITEMAP_URL}...")
    response = requests.get(SITEMAP_URL)
    response.raise_for_status()
    
    root = ET.fromstring(response.content)
    urls = []
    
    # Handle both sitemap and sitemapindex formats
    if root.tag.endswith('sitemapindex'):
        # If it's a sitemap index, fetch individual sitemaps
        for sitemap in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
            sitemap_url = sitemap.text
            print(f"  📄 Fetching sub-sitemap: {sitemap_url}")
            sub_response = requests.get(sitemap_url)
            sub_root = ET.fromstring(sub_response.content)
            for url in sub_root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                urls.append(url.text)
    else:
        # Regular sitemap
        for url in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
            urls.append(url.text)
    
    print(f"✅ Found {len(urls)} URLs in sitemap")
    return sorted(urls)

def get_scraped_urls() -> Set[str]:
    """Get all scraped URLs from Supabase."""
    print("📊 Fetching scraped URLs from Supabase...")
    
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Fetch all URLs
    response = supabase.table("page_scrape_data").select("url").like("url", "%sleepconcierge%").execute()
    
    scraped_urls = {row["url"] for row in response.data}
    print(f"✅ Found {len(scraped_urls)} scraped URLs in database")
    
    return scraped_urls

def find_missing_urls(sitemap_urls: List[str], scraped_urls: Set[str]) -> List[str]:
    """Find URLs in sitemap that are not in database."""
    missing = [url for url in sitemap_urls if url not in scraped_urls]
    return missing

def main():
    print("🔍 Verifying Sitemap Coverage\n")
    
    # Fetch sitemap URLs
    sitemap_urls = fetch_sitemap_urls()
    
    # Get scraped URLs
    scraped_urls = get_scraped_urls()
    
    # Find missing URLs
    missing_urls = find_missing_urls(sitemap_urls, scraped_urls)
    
    # Report results
    print(f"\n📊 Coverage Report:")
    print(f"  Total URLs in sitemap: {len(sitemap_urls)}")
    print(f"  URLs in database: {len(scraped_urls)}")
    print(f"  Missing URLs: {len(missing_urls)}")
    print(f"  Coverage: {((len(sitemap_urls) - len(missing_urls)) / len(sitemap_urls) * 100):.1f}%")
    
    if missing_urls:
        print(f"\n❌ Missing URLs ({len(missing_urls)}):")
        for url in missing_urls[:20]:  # Show first 20
            print(f"  - {url}")
        if len(missing_urls) > 20:
            print(f"  ... and {len(missing_urls) - 20} more")
        
        # Save to file
        with open("missing_urls.txt", "w") as f:
            for url in missing_urls:
                f.write(f"{url}\n")
        print(f"\n💾 Missing URLs saved to: missing_urls.txt")
    else:
        print("\n✅ All sitemap URLs are present in database!")
    
    return missing_urls

if __name__ == "__main__":
    try:
        missing = main()
        sys.exit(0 if not missing else 1)
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

