#!/usr/bin/env python3
"""
Harvest the Google-review DELTA via Apify and ingest new rows into Notion.

- Pulls the compass/Google-Maps-Reviews-Scraper dataset (APIFY_TOKEN).
- "New" = publishedAtDate strictly after the existing Notion max (2025-08-18),
  cross-checked against existing (Google Display Name, date) to avoid dupes.
- Writes harvest/google-reviews-delta.md (always).
- --apply creates Notion rows: Source=Google Review, Notes=text, Rating, Google
  Display Name, Google Review ID + Google ID = Apify reviewId, Feedback Date,
  Permission Level=Public, Publish Approved=true (public reviews, verbatim from GBP),
  Product tagged by content, Tags includes country_unknown unless an explicit place is named.

Usage: python google_reviews_delta.py [--apply]
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv
import requests

ROOT = Path(__file__).resolve()
HERE = ROOT.parent.parent  # wave-3-social-proof/
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

DATASET_ID = "jcyTH5f2csv93Opqc"
APIFY = os.getenv("APIFY_TOKEN") or os.getenv("APIFY_API_TOKEN")
DB = "24f33898-b6c2-817c-bfa3-cab91a68b9e9"
NV = "2022-06-28"
TOK = os.getenv("NOTION_API_TOKEN") or os.getenv("NOTION_TOKEN")
H = {"Authorization": f"Bearer {TOK}", "Notion-Version": NV, "Content-Type": "application/json"}
CUTOFF = "2000-01-01"  # ingest any review not already present (dedupe by name+date below)

PLACE_COUNTRY = {
    r"\bPerth\b": "AU", r"\bSydney\b": "AU", r"\bMelbourne\b": "AU", r"\bBrisbane\b": "AU",
    r"\bAdelaide\b": "AU", r"\bAustralia\b": "AU", r"\bNew Zealand\b": "NZ", r"\bUK\b": "UK",
    r"\bUnited Kingdom\b": "UK", r"\bIreland\b": "IE", r"\bCanada\b": "CA", r"\bSingapore\b": "SG",
    r"\bDubai\b": "AE", r"\bUSA\b": "US", r"\bUnited States\b": "US",
}


def apify_items():
    url = f"https://api.apify.com/v2/datasets/{DATASET_ID}/items?token={APIFY}&clean=true"
    r = requests.get(url, timeout=60)
    r.raise_for_status()
    return r.json()


def existing_reviews():
    url = f"https://api.notion.com/v1/databases/{DB}/query"
    keys, tokens = set(), set()
    cur = None
    while True:
        body = {"page_size": 100, "filter": {"property": "Source", "select": {"equals": "Google Review"}}}
        if cur:
            body["start_cursor"] = cur
        d = requests.post(url, headers=H, json=body, timeout=60).json()
        for p in d["results"]:
            pr = p["properties"]
            name = "".join(x.get("plain_text", "") for x in (pr.get("Google Display Name") or {}).get("rich_text", []))
            gid = "".join(x.get("plain_text", "") for x in (pr.get("Google ID") or {}).get("rich_text", []))
            fd = (pr.get("Feedback Date") or {}).get("date") or {}
            date = (fd.get("start") or "")[:10]
            keys.add((name.strip().lower(), date))
            if gid:
                tokens.add(gid)
        if not d.get("has_more"):
            break
        cur = d["next_cursor"]
    return keys, tokens


def product_tags(text):
    t = text.lower()
    tags = []
    if any(k in t for k in ["membership", "snooze platform", "snooze social", "community", "forum", "podcast", "platform"]):
        tags.append("The Snooze Membership")
    if "camp snooze" in t or "camp" in t:
        tags.append("Camp Snooze")
    if any(k in t for k in ["consult", "1:1", "one on one", "package", "slumber party"]):
        tags.append("1:1 Consult")
    return tags or []


def country_tag(text):
    for pat, cc in PLACE_COUNTRY.items():
        if re.search(pat, text):
            return f"country_{cc}"
    return "country_unknown"


def main(apply):
    items = apify_items()
    keys, tokens = existing_reviews()
    new = []
    for it in items:
        date = (it.get("publishedAtDate") or "")[:10]
        name = (it.get("name") or "").strip()
        rid = it.get("reviewId") or ""
        if rid in tokens:
            continue
        if (name.lower(), date) in keys:
            continue
        if date <= CUTOFF:
            continue  # only the guaranteed-new delta
        new.append(it)
    new.sort(key=lambda x: x.get("publishedAtDate", ""), reverse=True)

    # Write harvest md
    lines = [f"# Google reviews — delta harvest ({len(new)} new)", "",
             f"Source: Apify compass/Google-Maps-Reviews-Scraper, place `ChIJ909XQaRD1moRMeU0Gdc7_GU` "
             f"(Snooze by The Sleep Concierge). New = published after {CUTOFF} (existing Notion max).",
             f"Google shows ~162 total vs 137 in Notion. Permission=Public, verbatim.", "",
             "| Date | Reviewer | Stars | Product tags | Country | Quote |",
             "|---|---|---|---|---|---|"]
    for it in new:
        q = (it.get("text") or "").replace("|", "\\|").replace("\n", " ").strip()
        lines.append(f"| {(it.get('publishedAtDate') or '')[:10]} | {it.get('name','')} | {it.get('stars','')} | "
                     f"{','.join(product_tags(it.get('text','')))} | {country_tag(it.get('text',''))} | {q[:240]} |")
    (HERE / "harvest" / "google-reviews-delta.md").write_text("\n".join(lines) + "\n")
    print(f"NEW reviews (after {CUTOFF}): {len(new)} / {len(items)} fetched")

    if not apply:
        print("DRY-RUN — wrote harvest/google-reviews-delta.md. Re-run with --apply to create Notion rows.")
        return

    created = 0
    for it in new:
        text = it.get("text") or ""
        ptags = product_tags(text)
        ctag = country_tag(text)
        tags = [{"name": "Social Proof"}, {"name": "Google Reviews"}, {"name": ctag}]
        props = {
            "Title": {"title": [{"text": {"content": f"{it.get('name','')} · Google review"[:200]}}]},
            "Notes": {"rich_text": [{"text": {"content": text[:1900]}}]},
            "Type": {"select": {"name": "Testimonial"}},
            "Source": {"select": {"name": "Google Review"}},
            "Rating": {"number": it.get("stars")},
            "Google Display Name": {"rich_text": [{"text": {"content": it.get("name", "")[:200]}}]},
            "Google Review ID": {"rich_text": [{"text": {"content": it.get("reviewId", "")[:200]}}]},
            "Google ID": {"rich_text": [{"text": {"content": it.get("reviewId", "")[:200]}}]},
            "Permission Level": {"select": {"name": "Public"}},
            "Publish Approved": {"checkbox": True},
            "Tags": {"multi_select": tags},
        }
        if ptags:
            props["Product"] = {"multi_select": [{"name": p} for p in ptags]}
        d = (it.get("publishedAtDate") or "")[:10]
        if d:
            props["Feedback Date"] = {"date": {"start": d}}
        res = requests.post("https://api.notion.com/v1/pages", headers=H,
                            json={"parent": {"database_id": DB}, "properties": props}, timeout=60)
        if res.status_code == 200:
            created += 1
        else:
            print("  ERR", it.get("name"), res.status_code, res.text[:160])
        time.sleep(0.18)
    print(f"APPLIED — created {created} new Google review rows.")


if __name__ == "__main__":
    if not (APIFY and TOK):
        print("Need APIFY_TOKEN and NOTION_API_TOKEN", file=sys.stderr); sys.exit(1)
    main("--apply" in sys.argv)
