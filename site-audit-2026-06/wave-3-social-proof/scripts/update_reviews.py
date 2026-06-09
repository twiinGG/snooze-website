#!/usr/bin/env python3
"""
Existing-review maintenance on the Notion Member Feedback & Wins DB.

Two actions:
  permission  -> backfill Permission Level = Public on Google Review rows that lack it
  country-scan-> REPORT ONLY: review rows whose Notes explicitly name a place, with a
                 proposed country code (for human review before any tag is applied)

Safe by default: nothing is written unless --apply is passed (only affects `permission`).
Auth: NOTION_API_TOKEN from root .env (same pattern as sync_member_feedback_wins.py).

Usage:
  python update_reviews.py permission              # dry-run, shows what would change
  python update_reviews.py permission --apply      # writes Permission Level = Public
  python update_reviews.py country-scan            # report only, never writes
"""
from __future__ import annotations

import os
import re
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

DB = "24f33898-b6c2-817c-bfa3-cab91a68b9e9"
NV = "2022-06-28"
TOK = os.getenv("NOTION_API_TOKEN") or os.getenv("NOTION_TOKEN")
H = {"Authorization": f"Bearer {TOK}", "Notion-Version": NV, "Content-Type": "application/json"}

# Explicit place -> ISO country. Word-boundary matched; conservative.
PLACE_COUNTRY = {
    r"\bSydney\b": "AU", r"\bMelbourne\b": "AU", r"\bBrisbane\b": "AU", r"\bPerth\b": "AU",
    r"\bAdelaide\b": "AU", r"\bCanberra\b": "AU", r"\bHobart\b": "AU", r"\bDarwin\b": "AU",
    r"\bGold Coast\b": "AU", r"\bNewcastle\b": "AU", r"\bGeelong\b": "AU", r"\bToowoomba\b": "AU",
    r"\bNSW\b": "AU", r"\bVictoria\b": "AU", r"\bQueensland\b": "AU", r"\bTasmania\b": "AU",
    r"\bWestern Australia\b": "AU", r"\bAustralia\b": "AU", r"\bAussie\b": "AU",
    r"\bNew Zealand\b": "NZ", r"\bAuckland\b": "NZ", r"\bWellington\b": "NZ",
    r"\bUnited Kingdom\b": "UK", r"\bEngland\b": "UK", r"\bScotland\b": "UK", r"\bLondon\b": "UK",
    r"\bUnited States\b": "US", r"\bAmerica\b": "US",
    r"\bCanada\b": "CA", r"\bSingapore\b": "SG", r"\bDubai\b": "AE", r"\bIreland\b": "IE",
}


def query_all():
    url = f"https://api.notion.com/v1/databases/{DB}/query"
    pages, cur = [], None
    while True:
        body = {"page_size": 100, "filter": {"property": "Source", "select": {"equals": "Google Review"}}}
        if cur:
            body["start_cursor"] = cur
        r = requests.post(url, headers=H, json=body, timeout=60)
        r.raise_for_status()
        d = r.json()
        pages.extend(d["results"])
        if not d.get("has_more"):
            break
        cur = d["next_cursor"]
    return pages


def rich(props, name):
    return "".join(x.get("plain_text", "") for x in (props.get(name) or {}).get("rich_text", []))


def sel(props, name):
    p = (props.get(name) or {}).get("select")
    return p.get("name") if p else None


def cmd_permission(apply):
    pages = query_all()
    todo = [p for p in pages if not sel(p["properties"], "Permission Level")]
    print(f"Google Review rows: {len(pages)} | missing Permission Level: {len(todo)}")
    if not apply:
        print("DRY-RUN — would set Permission Level = Public on the above. Re-run with --apply.")
        return
    n = 0
    for p in todo:
        r = requests.patch(f"https://api.notion.com/v1/pages/{p['id']}", headers=H,
                           json={"properties": {"Permission Level": {"select": {"name": "Public"}}}}, timeout=60)
        if r.status_code == 200:
            n += 1
        else:
            print("  ERR", p["id"], r.status_code, r.text[:160])
        time.sleep(0.2)
    print(f"APPLIED Permission Level = Public to {n} rows.")


def cmd_country_scan():
    pages = query_all()
    hits = []
    for p in pages:
        notes = rich(p["properties"], "Notes")
        name = rich(p["properties"], "Google Display Name")
        found = {}
        for pat, cc in PLACE_COUNTRY.items():
            m = re.search(pat, notes, re.I)
            if m:
                found.setdefault(cc, []).append(m.group(0))
        if found:
            hits.append((name, found, notes[:160].replace("\n", " ")))
    print(f"Reviews with explicit place mention: {len(hits)} / {len(pages)}")
    for name, found, snip in hits:
        cc = ",".join(found.keys())
        terms = ";".join(t for v in found.values() for t in v)
        print(f"  [{cc}] ({terms})  {name or '(no name)'}: {snip}")


if __name__ == "__main__":
    if not TOK:
        print("NOTION_API_TOKEN not set", file=sys.stderr); sys.exit(1)
    action = sys.argv[1] if len(sys.argv) > 1 else "permission"
    apply = "--apply" in sys.argv
    if action == "permission":
        cmd_permission(apply)
    elif action == "country-scan":
        cmd_country_scan()
    else:
        print("unknown action", action); sys.exit(1)
