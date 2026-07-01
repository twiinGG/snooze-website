#!/usr/bin/env python3
"""
Build the consolidated SEO metadata catalogue for every joinsnooze.com page.

Joins:
  - fresh audit capture (../data/<slug>.json + ../data/html/<slug>.html) -> current
    <title>, meta description, canonical, og:title/description/image, JSON-LD presence.
  - METADATA-WORKLIST.csv -> Kajabi page_id, kind, publish_state, missing SEO fields,
    internal_title, PageValue, Priority.

Outputs:
  - seo-metadata.csv (this folder) — git-tracked, analysable, copy-paste, and the source
    for a Kajabi API/MCP push (keyed by page_id where known).
  - prints a JSON array on stdout (for loading into Supabase page_seo) when --json passed.

Columns include empty recommended_title / recommended_meta_description for the uplift pass.

Usage: python gen_seo_catalog.py [--json]
"""
from __future__ import annotations

import csv
import html
import json
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent             # site-audit-2026-06/analysis
DATA = HERE.parent / "data"                        # site-audit-2026-06/data
HTMLDIR = DATA / "html"
WORKLIST = HERE / "METADATA-WORKLIST.csv"
OUT = HERE / "seo-metadata.csv"

TITLE_MAX = 60
DESC_MIN, DESC_MAX = 120, 160


def first(pat, text, flags=re.I | re.S):
    m = re.search(pat, text or "", flags)
    return html.unescape(m.group(1).strip()) if m else ""


def parse_html(h):
    return {
        "title": first(r"<title[^>]*>(.*?)</title>", h),
        "meta_description": first(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', h)
                            or first(r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']', h),
        "canonical": first(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', h),
        "og_title": first(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\'](.*?)["\']', h),
        "og_description": first(r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\'](.*?)["\']', h),
        "og_image": first(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\'](.*?)["\']', h),
        "has_jsonld": "Y" if re.search(r'application/ld\+json', h or "", re.I) else "N",
    }


def load_worklist():
    wl = {}
    if WORKLIST.exists():
        for r in csv.DictReader(open(WORKLIST)):
            wl[r["path"].strip("/")] = r
    return wl


def status_len(n, lo, hi):
    if n == 0:
        return "missing"
    if n < lo:
        return "short"
    if n > hi:
        return "long"
    return "ok"


def main():
    wl = load_worklist()
    rows = []
    for jf in sorted(DATA.glob("*.json")):
        d = json.load(open(jf))
        if not isinstance(d, dict) or not (d.get("url") or d.get("path") or d.get("slug")):
            continue  # skip index/manifest JSONs that aren't per-page records
        url = d.get("url") or d.get("final_url") or ""
        path = (d.get("path") or "").strip("/")
        slug = d.get("slug") or jf.stem
        if d.get("expected_type") == "redirect" or "404" in str(d.get("http_status_final", "")):
            pass  # keep but flag via status
        hp = HTMLDIR / f"{slug}.html"
        meta = parse_html(hp.read_text(errors="ignore")) if hp.exists() else {
            "title": "", "meta_description": "", "canonical": "", "og_title": "",
            "og_description": "", "og_image": "", "has_jsonld": "N"}
        w = wl.get(path, {})
        tlen, dlen = len(meta["title"]), len(meta["meta_description"])
        rows.append({
            "path": path, "url": url,
            "page_id": w.get("page_id", ""), "kind": w.get("kind", ""),
            "publish_state": w.get("publish_state", ""),
            "current_title": meta["title"], "title_len": tlen,
            "title_status": status_len(tlen, 30, TITLE_MAX),
            "current_meta_description": meta["meta_description"], "desc_len": dlen,
            "desc_status": status_len(dlen, DESC_MIN, DESC_MAX),
            "canonical": meta["canonical"], "has_jsonld": meta["has_jsonld"],
            "og_image": meta["og_image"],
            "kajabi_missing": w.get("missing", ""),
            "page_value": w.get("PageValue", ""), "priority": w.get("Priority", ""),
            "http_status": d.get("http_status_final", ""),
            "recommended_title": "", "recommended_meta_description": "", "notes": "",
        })
    rows.sort(key=lambda r: (-(float(r["priority"]) if r["priority"] else 0), r["path"]))

    cols = ["path", "url", "page_id", "kind", "publish_state", "http_status",
            "current_title", "title_len", "title_status",
            "current_meta_description", "desc_len", "desc_status",
            "canonical", "has_jsonld", "og_image", "kajabi_missing",
            "page_value", "priority",
            "recommended_title", "recommended_meta_description", "notes"]
    with open(OUT, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        w.writerows(rows)

    if "--json" in sys.argv:
        print(json.dumps(rows, ensure_ascii=False))
    else:
        miss_t = sum(1 for r in rows if r["title_status"] == "missing")
        miss_d = sum(1 for r in rows if r["desc_status"] == "missing")
        long_t = sum(1 for r in rows if r["title_status"] == "long")
        no_ld = sum(1 for r in rows if r["has_jsonld"] == "N")
        withid = sum(1 for r in rows if r["page_id"])
        print(f"Wrote {OUT.name} — {len(rows)} pages | with page_id {withid} | "
              f"missing title {miss_t} | missing desc {miss_d} | title>60 {long_t} | no JSON-LD {no_ld}")


if __name__ == "__main__":
    main()
