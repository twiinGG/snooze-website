#!/usr/bin/env python3
"""
WP1 audit reader (READ-ONLY).

Queries the Notion "Member Feedback & Wins" database and tallies counts by
Source, Product, Content Type, Permission Level, and Publish Approved, plus a
total page count. Emits JSON to stdout for the audit-comparator step.

Does not write anything. Uses NOTION_API_TOKEN from the root .env (same auth
pattern as sync_member_feedback_wins.py).

Usage:
  python audit_counts.py
"""
from __future__ import annotations

import json
import os
import sys
from collections import Counter
from pathlib import Path

from dotenv import load_dotenv
import requests

# Walk up to the monorepo root and load the root .env
ROOT = Path(__file__).resolve()
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

NOTION_DB_ID = "24f33898-b6c2-817c-bfa3-cab91a68b9e9"
NOTION_VERSION = "2022-06-28"


def token() -> str:
    t = os.getenv("NOTION_API_TOKEN") or os.getenv("NOTION_TOKEN")
    if not t:
        print("ERROR: NOTION_API_TOKEN/NOTION_TOKEN not set", file=sys.stderr)
        sys.exit(1)
    return t


def query_all(tok: str):
    url = f"https://api.notion.com/v1/databases/{NOTION_DB_ID}/query"
    headers = {
        "Authorization": f"Bearer {tok}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }
    pages, cursor = [], None
    while True:
        payload = {"page_size": 100}
        if cursor:
            payload["start_cursor"] = cursor
        r = requests.post(url, headers=headers, json=payload, timeout=60)
        r.raise_for_status()
        data = r.json()
        pages.extend(data.get("results", []))
        if not data.get("has_more"):
            break
        cursor = data.get("next_cursor")
    return pages


def sel(props, name):
    p = (props.get(name) or {}).get("select")
    return p.get("name") if p else None


def multi(props, name):
    return [o.get("name") for o in (props.get(name) or {}).get("multi_select", [])]


def checkbox(props, name):
    return bool((props.get(name) or {}).get("checkbox"))


def rich(props, name):
    rt = (props.get(name) or {}).get("rich_text") or []
    return "".join(x.get("plain_text", "") for x in rt if isinstance(x, dict))


def date_start(props, name):
    d = (props.get(name) or {}).get("date")
    return d.get("start") if d else None


def main():
    pages = query_all(token())
    by_source, by_product, by_ctype, by_perm = Counter(), Counter(), Counter(), Counter()
    publish_approved = 0
    with_crm = 0
    with_rating = 0
    with_review_id = 0
    review_id_dupes = Counter()
    fb_dates = []
    google_fb_dates = []
    for pg in pages:
        props = pg.get("properties", {})
        src = sel(props, "Source") or "(none)"
        by_source[src] += 1
        for prod in (multi(props, "Product") or ["(none)"]):
            by_product[prod] += 1
        by_ctype[sel(props, "Content Type") or "(none)"] += 1
        by_perm[sel(props, "Permission Level") or "(none)"] += 1
        if checkbox(props, "Publish Approved"):
            publish_approved += 1
        if (props.get("👟 Sales CRM") or {}).get("relation"):
            with_crm += 1
        if (props.get("Rating") or {}).get("number") is not None:
            with_rating += 1
        rid = rich(props, "Google Review ID")
        if rid:
            with_review_id += 1
            review_id_dupes[rid] += 1
        fd = date_start(props, "Feedback Date")
        if fd:
            fb_dates.append(fd)
            if src == "Google Review":
                google_fb_dates.append(fd)
    dupes = {k: v for k, v in review_id_dupes.items() if v > 1}

    out = {
        "total_pages": len(pages),
        "publish_approved": publish_approved,
        "with_sales_crm_relation": with_crm,
        "with_rating": with_rating,
        "with_google_review_id": with_review_id,
        "duplicate_google_review_ids": dupes,
        "feedback_date_min": min(fb_dates) if fb_dates else None,
        "feedback_date_max": max(fb_dates) if fb_dates else None,
        "google_review_date_min": min(google_fb_dates) if google_fb_dates else None,
        "google_review_date_max": max(google_fb_dates) if google_fb_dates else None,
        "by_source": dict(by_source),
        "by_product": dict(by_product),
        "by_content_type": dict(by_ctype),
        "by_permission_level": dict(by_perm),
    }
    print(json.dumps(out, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
