#!/usr/bin/env python3
"""Build the August audit URL inventory from sitemap, June audit and repo references."""

from __future__ import annotations

import csv
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit


ROOT = Path(__file__).resolve().parents[3]
AUDIT_DIR = Path(__file__).resolve().parent
JUNE_MANIFEST = AUDIT_DIR.parent / "site-audit-2026-06" / "PAGE-SOURCE-MANIFEST.csv"
OUT = AUDIT_DIR / "URL-INVENTORY-2026-08-27.csv"


def canonicalise(raw: str) -> str:
    raw = raw.rstrip(".,);:'\"<>]")
    try:
        parts = urlsplit(raw)
    except ValueError:
        return ""
    if parts.netloc not in {"joinsnooze.com", "www.joinsnooze.com"}:
        return ""
    path = parts.path or "/"
    if len(path) > 180 or re.search(r"\.(?:avif|css|gif|ico|jpe?g|js|json|pdf|png|svg|webp|woff2?)$", path, re.I):
        return ""
    query = parts.query if parts.query.startswith("tag=") else ""
    return urlunsplit(("https", "www.joinsnooze.com", path.rstrip("/") or "/", query, ""))


def sitemap_urls() -> set[str]:
    result = subprocess.run(
        ["curl", "-fsSL", "https://www.joinsnooze.com/sitemap.xml"],
        check=True,
        capture_output=True,
        text=True,
    )
    root = ET.fromstring(result.stdout)
    return {
        canonicalise(node.text or "")
        for node in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
    }


def june_rows() -> dict[str, dict[str, str]]:
    with JUNE_MANIFEST.open(newline="", encoding="utf-8") as handle:
        return {canonicalise(row["live_url"]): row for row in csv.DictReader(handle)}


def repo_references() -> Counter[str]:
    result = subprocess.run(
        [
            "rg",
            "-o",
            "https?://(?:www\\.)?joinsnooze\\.com[^\\s,|)>'\\\"`\\]\\}]+",
            "--glob",
            "!apps/snooze-website/site-audit-2026-06/**",
            "--glob",
            "!apps/snooze-website/site-audit-2026-08/**",
            "apps/snooze-website",
            "docs",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    counts: Counter[str] = Counter()
    for line in result.stdout.splitlines():
        match = re.search(r"https?://(?:www\.)?joinsnooze\.com[^\s,|)>'\"`\]\}]+", line)
        if match and (url := canonicalise(match.group(0))):
            counts[url] += 1
    return counts


def main() -> int:
    live = sitemap_urls()
    june = june_rows()
    refs = repo_references()
    urls = sorted(live | set(june) | set(refs), key=lambda value: (urlsplit(value).path, urlsplit(value).query))
    fields = [
        "url",
        "path",
        "query",
        "in_live_sitemap",
        "in_june_inventory",
        "repo_reference_count",
        "june_http_status",
        "june_page_type",
        "june_drift_verdict",
        "june_source_file",
        "inventory_note",
    ]
    with OUT.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for url in urls:
            old = june.get(url, {})
            in_sitemap = url in live
            in_june = url in june
            if in_sitemap and not in_june:
                note = "Added to sitemap after June audit"
            elif in_june and not in_sitemap:
                note = "Not in current sitemap; verify redirect, access gate or retirement"
            elif refs[url] and not in_sitemap and not in_june:
                note = "Repository reference only; verify before reuse"
            else:
                note = ""
            split = urlsplit(url)
            writer.writerow(
                {
                    "url": url,
                    "path": split.path or "/",
                    "query": split.query,
                    "in_live_sitemap": str(in_sitemap).lower(),
                    "in_june_inventory": str(in_june).lower(),
                    "repo_reference_count": refs[url],
                    "june_http_status": old.get("http_status", ""),
                    "june_page_type": old.get("page_type", ""),
                    "june_drift_verdict": old.get("drift_verdict", ""),
                    "june_source_file": old.get("source_file_path", ""),
                    "inventory_note": note,
                }
            )
    print(f"wrote {len(urls)} URLs to {OUT}")
    print(f"live sitemap: {len(live)}")
    print(f"new since June inventory: {len(live - set(june))}")
    print(f"June inventory missing from sitemap: {len(set(june) - live)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
