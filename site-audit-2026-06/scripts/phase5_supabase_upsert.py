#!/usr/bin/env python3
"""
Phase 5 (Supabase) — direct service-key upsert into public.page_scrape_data.

User-approved one-time write (analytics layer, not canonical spine; same
pattern as the original scrape_missing_pages.py). Idempotent on `url`.
Existing `html` is preserved (we don't send html, so upsert leaves it untouched
for existing rows / NULL for new rows). Full HTML + heading arrays live in git.
"""
import glob, json
from datetime import datetime, timezone
import audit_common as ac

AUDIT = ac.REPO_ROOT / "apps/snooze-website/site-audit-2026-06"
DATA = AUDIT / "data"

TYPE_TO_CATEGORY = {
    "homepage": ("lead_capture", None), "landing": ("lead_capture", "landing"),
    "blog_post": ("lead_capture", "blog"), "blog_index": ("lead_capture", "blog"),
    "checkout": ("checkout", None), "product_access": ("member", "product"),
    "download_access": ("member", "download"), "community": ("member", "community"),
    "account": ("account", None), "legal": ("legal", None), "page": ("lead_capture", None),
}

def build_row(p):
    r = p.get("rendered", {})
    cat, sub = TYPE_TO_CATEGORY.get(p.get("expected_type"), ("lead_capture", None))
    return {
        "url": p["url"],
        "title": r.get("title"),
        "meta_description": (r.get("meta_description") or "")[:500] or None,
        "canonical": r.get("canonical") or None,
        "h1s": r.get("h1s", []),
        "h2s": r.get("h2s", []),
        "h3s": r.get("h3s", []),
        "word_count": r.get("word_count") or 0,
        "html_hash": p.get("html_hash"),
        "funnel_step": p.get("expected_type"),
        "category": cat,
        "sub_category": sub,
        "scraped_at": p.get("crawled_at") or datetime.now(timezone.utc).isoformat(),
        "issues": {
            "issues": p.get("issues", []),
            "http_status_initial": p.get("http_status_initial"),
            "http_status_final": p.get("http_status_final"),
            "redirected": p.get("redirected"),
            "final_url": r.get("final_url"),
            "jsonld_types": r.get("jsonld_types", []),
            "og_image": (r.get("og", {}) or {}).get("og:image"),
            "vitals": p.get("vitals", {}),
            "images_total": r.get("images_total"),
            "images_missing_alt": r.get("images_missing_alt"),
        },
        "links": {
            "internal": r.get("links_internal"),
            "external": r.get("links_external"),
            "total": r.get("links_total"),
            "list": (r.get("links", []) or [])[:120],
        },
    }

def main():
    sb = ac.supabase_client()
    pages = []
    for f in sorted(glob.glob(str(DATA / "*.json"))):
        stem = f.rsplit("/", 1)[-1][:-5]
        if stem in ("url-list", "provenance", "kajabi-admin-metadata", "sheet-url"):
            continue
        pages.append(json.loads(open(f).read()))
    rows = [build_row(p) for p in pages]
    # upsert in batches
    n = 0
    for i in range(0, len(rows), 40):
        batch = rows[i:i+40]
        sb.table("page_scrape_data").upsert(batch, on_conflict="url").execute()
        n += len(batch)
        print(f"  upserted {n}/{len(rows)}")
    res = sb.table("page_scrape_data").select("url", count="exact").limit(1).execute()
    print(f"Done. page_scrape_data total rows now: {res.count}")
    # how many carry today's audit timestamp
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    audited = sb.table("page_scrape_data").select("url", count="exact").gte("scraped_at", today + "T00:00:00Z").execute()
    print(f"Rows scraped today ({today}): {audited.count}")

if __name__ == "__main__":
    main()
