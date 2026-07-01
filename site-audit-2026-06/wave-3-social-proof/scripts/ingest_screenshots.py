#!/usr/bin/env python3
"""
WP4: ingest testimonial SCREENSHOTS from media_asset_catalog into Notion.

Source: the Google Photos -> Drive sync, cataloged in public.media_asset_catalog
(is_screenshot AND testimonial_detected). Each becomes a Notion row:
  Content Type=Screenshot, Asset URL=Drive file URL, Source=DM/Community,
  Notes=short caption (testimonial_summary — NOT a fabricated quote card; the asset is
  the proof), Type=UGC, Permission=Internal, Publish Approved=false (member DMs need
  Sally's consent), Product tagged by content, Tags=[Social Proof, country_unknown].
Skips assets whose use_cases include 'not_recommended'. Idempotent on Asset URL.

Usage: python ingest_screenshots.py [--apply]
"""
from __future__ import annotations

import os
import sys
import time
from pathlib import Path

from dotenv import load_dotenv
import requests

ROOT = Path(__file__).resolve()
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

SB_URL = os.getenv("SUPABASE_URL")
SB_KEY = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
DB = "24f33898-b6c2-817c-bfa3-cab91a68b9e9"
NV = "2022-06-28"
TOK = os.getenv("NOTION_API_TOKEN") or os.getenv("NOTION_TOKEN")
H = {"Authorization": f"Bearer {TOK}", "Notion-Version": NV, "Content-Type": "application/json"}


def catalog_screenshots():
    r = requests.get(
        f"{SB_URL}/rest/v1/media_asset_catalog",
        headers={"apikey": SB_KEY, "Authorization": f"Bearer {SB_KEY}"},
        params={"is_screenshot": "eq.true", "testimonial_detected": "eq.true",
                "select": "file_name,google_drive_file_url,testimonial_summary,extracted_text,content_topics,use_cases"},
        timeout=60)
    r.raise_for_status()
    return r.json()


def existing_asset_urls():
    url = f"https://api.notion.com/v1/databases/{DB}/query"
    urls = set()
    cur = None
    while True:
        body = {"page_size": 100, "filter": {"property": "Content Type", "select": {"equals": "Screenshot"}}}
        if cur:
            body["start_cursor"] = cur
        d = requests.post(url, headers=H, json=body, timeout=60).json()
        for p in d.get("results", []):
            au = (p["properties"].get("Asset URL") or {}).get("url")
            if au:
                urls.add(au)
        if not d.get("has_more"):
            break
        cur = d["next_cursor"]
    return urls


def source_of(text, summary):
    blob = f"{text} {summary}".lower()
    if "replied to your story" in blob or "comment" in blob or "likes" in blob or "reply" in blob:
        return "Community"
    return "DM"


def product_tags(blob):
    b = blob.lower()
    tags = []
    if any(k in b for k in ["membership", "platform", "community", "podcast", "snooze social", "join snooze"]):
        tags.append("The Snooze Membership")
    if "camp snooze" in b or "camp" in b:
        tags.append("Camp Snooze")
    return tags


def main(apply):
    rows = catalog_screenshots()
    rows = [r for r in rows if "not_recommended" not in (r.get("use_cases") or [])]
    existing = existing_asset_urls() if apply else set()
    print(f"Screenshot testimonials in catalog (usable): {len(rows)}")
    created = skipped = 0
    for r in rows:
        au = r.get("google_drive_file_url")
        if not au:
            continue
        if au in existing:
            skipped += 1
            continue
        blob = f"{r.get('extracted_text','')} {r.get('testimonial_summary','')}"
        src = source_of(r.get("extracted_text", ""), r.get("testimonial_summary", ""))
        ptags = product_tags(blob)
        props = {
            "Title": {"title": [{"text": {"content": (r.get("file_name") or "Screenshot")[:200]}}]},
            "Notes": {"rich_text": [{"text": {"content": (r.get("testimonial_summary") or "")[:1900]}}]},
            "Type": {"select": {"name": "UGC"}},
            "Source": {"select": {"name": src}},
            "Content Type": {"select": {"name": "Screenshot"}},
            "Permission Level": {"select": {"name": "Internal"}},
            "Publish Approved": {"checkbox": False},
            "userDefined:Asset URL": None,  # placeholder; replaced below
            "Tags": {"multi_select": [{"name": "Social Proof"}, {"name": "country_unknown"}]},
        }
        props.pop("userDefined:Asset URL", None)
        props["Asset URL"] = {"url": au}
        if ptags:
            props["Product"] = {"multi_select": [{"name": p} for p in ptags]}
        if not apply:
            created += 1
            continue
        res = requests.post("https://api.notion.com/v1/pages", headers=H,
                            json={"parent": {"database_id": DB}, "properties": props}, timeout=60)
        if res.status_code == 200:
            created += 1
        else:
            print("  ERR", r.get("file_name"), res.status_code, res.text[:200])
        time.sleep(0.18)
    print(f"{'APPLIED — created' if apply else 'DRY-RUN — would create'} {created}; skipped {skipped}.")


if __name__ == "__main__":
    if not (SB_URL and SB_KEY and TOK):
        print("Need SUPABASE_URL, a Supabase key, NOTION_API_TOKEN", file=sys.stderr); sys.exit(1)
    main("--apply" in sys.argv)
