#!/usr/bin/env python3
"""
Upsert seo-metadata.csv into Supabase public.page_seo (upsert on url).
Preserves any human/AI edits to recommended_title / recommended_meta_description / notes
already in the table (does not overwrite them with blanks from the CSV).

Usage: python seo_catalog_to_supabase.py
"""
from __future__ import annotations

import csv
import os
from pathlib import Path

from dotenv import load_dotenv
import requests

ROOT = Path(__file__).resolve()
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

CSV = Path(__file__).resolve().parent / "seo-metadata.csv"
SB = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
H = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json",
     "Prefer": "resolution=merge-duplicates,return=minimal"}

INT = {"title_len", "desc_len"}
NUM = {"page_value", "priority"}
# columns the loader manages; recommended_*/notes are left to humans, not overwritten blank
SKIP_IF_BLANK = {"recommended_title", "recommended_meta_description", "notes"}


def main():
    rows = list(csv.DictReader(open(CSV)))
    payload = []
    for r in rows:
        rec = {}
        for k, v in r.items():
            if k in SKIP_IF_BLANK and not v:
                continue
            if k in INT:
                rec[k] = int(v) if v not in ("", None) else None
            elif k in NUM:
                rec[k] = float(v) if v not in ("", None) else None
            else:
                rec[k] = v if v != "" else None
        payload.append(rec)
    # chunked upsert
    n = 0
    for i in range(0, len(payload), 100):
        chunk = payload[i:i + 100]
        res = requests.post(f"{SB}/rest/v1/page_seo?on_conflict=url", headers=H, json=chunk, timeout=60)
        if res.status_code in (200, 201, 204):
            n += len(chunk)
        else:
            print("ERR", res.status_code, res.text[:300]); break
    print(f"Upserted {n}/{len(payload)} rows into public.page_seo")


if __name__ == "__main__":
    if not (SB and KEY):
        raise SystemExit("Need SUPABASE_URL + a Supabase key")
    main()
