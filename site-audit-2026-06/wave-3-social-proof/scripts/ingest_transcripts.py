#!/usr/bin/env python3
"""
Ingest the STRONG Camp transcript quotes into Notion "Member Feedback & Wins".

Each row: Type=Testimonial, Source="Camp Call", Content Type=Quote,
Product=["Camp Snooze"], Permission Level=Internal, Publish Approved=false,
Notes=verbatim quote, Feedback Date=call date, Tags=["Camp Only","country_unknown"],
Title="<speaker> · Camp<n> · <date>".

Camp-only routing; unconsented until Sally approves. Idempotent: skips a quote if a
Camp Call row with the same speaker + quote-prefix already exists.

Default DRY-RUN. Pass --apply to write.
Auth: NOTION_API_TOKEN from root .env.
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
from pathlib import Path

from dotenv import load_dotenv
import requests

OUT = Path("/private/tmp/claude-501/-Users-kadegreenland-Documents-Projects-The-Sleep-Concierge-Platforms-Snooze-OS/89b4538f-f11e-42ea-9ca9-dce88d4918bd/tasks/wleiw24fp.output")
ROOT = Path(__file__).resolve()
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

DB = "24f33898-b6c2-817c-bfa3-cab91a68b9e9"
NV = "2022-06-28"
TOK = os.getenv("NOTION_API_TOKEN") or os.getenv("NOTION_TOKEN")
H = {"Authorization": f"Bearer {TOK}", "Notion-Version": NV, "Content-Type": "application/json"}
COACH = {"sally", "sally woods"}


def camp_num(camp):
    m = re.match(r"(\d+)", camp)
    return m.group(1) if m else "?"


def theme_band(baby_age):
    if not baby_age:
        return None
    m = re.search(r"(\d+)\s*month", baby_age.lower())
    if "newborn" in baby_age.lower():
        return "Newborn"
    if m:
        n = int(m.group(1))
        if n <= 2:
            return "Newborn"
        if n <= 4:
            return "3-4mo"
        if n <= 12:
            return "5-12mo"
        return "Toddler"
    return None


def existing_camp_keys():
    """(speaker.lower(), quote[:50].lower()) for rows already Source=Camp Call."""
    url = f"https://api.notion.com/v1/databases/{DB}/query"
    keys = set()
    cur = None
    while True:
        body = {"page_size": 100, "filter": {"property": "Source", "select": {"equals": "Camp Call"}}}
        if cur:
            body["start_cursor"] = cur
        d = requests.post(url, headers=H, json=body, timeout=60).json()
        for p in d.get("results", []):
            notes = "".join(x.get("plain_text", "") for x in (p["properties"].get("Notes") or {}).get("rich_text", []))
            title = "".join(x.get("plain_text", "") for x in (p["properties"].get("Title") or {}).get("title", []))
            keys.add((title.split("·")[0].strip().lower(), notes[:50].lower()))
        if not d.get("has_more"):
            break
        cur = d["next_cursor"]
    return keys


def main(apply):
    rows = json.loads(OUT.read_text())["result"]["results"]
    candidates = []
    for r in rows:
        for q in r["quotes"]:
            if q.get("strength") != "strong":
                continue
            if q["speaker"].strip().lower() in COACH:
                continue
            candidates.append((r, q))
    print(f"Strong non-coach quotes: {len(candidates)}")

    existing = existing_camp_keys() if apply else set()
    created = skipped = 0
    for r, q in candidates:
        speaker = q["speaker"].strip()
        cnum = camp_num(r["camp"])
        date = r.get("date", "") or ""
        key = (speaker.lower(), q["quote"][:50].lower())
        if key in existing:
            skipped += 1
            continue
        title = f"{speaker} · Camp{cnum}" + (f" · {date}" if date else "")
        props = {
            "Title": {"title": [{"text": {"content": title[:200]}}]},
            "Notes": {"rich_text": [{"text": {"content": q["quote"][:1900]}}]},
            "Type": {"select": {"name": "Testimonial"}},
            "Source": {"select": {"name": "Camp Call"}},
            "Content Type": {"select": {"name": "Quote"}},
            "Product": {"multi_select": [{"name": "Camp Snooze"}]},
            "Permission Level": {"select": {"name": "Internal"}},
            "Publish Approved": {"checkbox": False},
            "Tags": {"multi_select": [{"name": "Camp Only"}, {"name": "country_unknown"}]},
        }
        band = theme_band(q.get("baby_age", ""))
        if band:
            props["Content Theme"] = {"select": {"name": band}}
        if date:
            props["Feedback Date"] = {"date": {"start": date}}
        if not apply:
            created += 1
            continue
        res = requests.post("https://api.notion.com/v1/pages", headers=H,
                            json={"parent": {"database_id": DB}, "properties": props}, timeout=60)
        if res.status_code == 200:
            created += 1
        else:
            print("  ERR", title, res.status_code, res.text[:200])
        time.sleep(0.18)
    if apply:
        print(f"APPLIED — created {created}, skipped {skipped} (already present).")
    else:
        print(f"DRY-RUN — would create {created} Camp Call rows. Re-run with --apply.")


if __name__ == "__main__":
    if not TOK:
        print("NOTION_API_TOKEN not set", file=sys.stderr); sys.exit(1)
    main("--apply" in sys.argv)
