#!/usr/bin/env python3
"""
Phase 5 (Supabase) — generate chunked upsert SQL for public.page_scrape_data.

Run via the Supabase MCP tool (execute_sql), NOT a direct client, per the
CLAUDE.md "always use MCP tools" boundary. Emits data/sql/upsert-NN.sql files.

Populates the analytic columns (title, meta, canonical, headings, word_count,
issues, links, category, sub_category, funnel_step, html_hash, scraped_at).
Full rendered HTML is preserved in git (data/html/*.html); we do NOT push
~300KB blobs per page through MCP, and we do NOT overwrite existing `html`
on conflict.
"""
import json, re
from pathlib import Path
import audit_common as ac

AUDIT = ac.REPO_ROOT / "apps/snooze-website/site-audit-2026-06"
DATA = AUDIT / "data"
SQLDIR = DATA / "sql"

TYPE_TO_CATEGORY = {
    "homepage": ("lead_capture", None), "landing": ("lead_capture", "landing"),
    "blog_post": ("lead_capture", "blog"), "blog_index": ("lead_capture", "blog"),
    "checkout": ("checkout", None), "product_access": ("member", "product"),
    "download_access": ("member", "download"), "community": ("member", "community"),
    "account": ("account", None), "legal": ("legal", None), "page": ("lead_capture", None),
}

def q(s):
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"

def arr(lst):
    if not lst:
        return "ARRAY[]::text[]"
    items = ", ".join("'" + str(x).replace("'", "''") + "'" for x in lst)
    return f"ARRAY[{items}]::text[]"

def jsonb(obj):
    return q(json.dumps(obj, ensure_ascii=False)) + "::jsonb"

def main(chunk=55):
    SQLDIR.mkdir(exist_ok=True)
    for f in SQLDIR.glob("*.sql"):
        f.unlink()
    pages = []
    for pj in sorted(DATA.glob("*.json")):
        if pj.stem in ("url-list", "provenance", "kajabi-admin-metadata"):
            continue
        pages.append(json.loads(pj.read_text()))

    # Lean column set for Supabase: full heading arrays (h2s/h3s) live in git
    # (pages/*.md, data/*.json) and the Google Sheet; storing them here too would
    # bloat the MCP payloads. We keep h1s (1/page) plus all the analytic columns
    # the plan requires (issues, links, funnel_step, category).
    cols = ("url, title, meta_description, canonical, h1s, word_count, "
            "issues, html_hash, funnel_step, category, sub_category, links, scraped_at")
    valrows = []
    for p in pages:
        r = p.get("rendered", {})
        cat, sub = TYPE_TO_CATEGORY.get(p.get("expected_type"), ("lead_capture", None))
        meta_desc = (r.get("meta_description") or "")[:300]
        # store link COUNTS only in Supabase; full link lists live in git
        # (data/<slug>.json) to keep MCP payloads small.
        links_payload = {
            "internal": r.get("links_internal"), "external": r.get("links_external"),
            "total": r.get("links_total"),
        }
        issues_payload = {
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
        }
        vals = ", ".join([
            q(p.get("url")), q(r.get("title")), q(meta_desc),
            q(r.get("canonical")), arr(r.get("h1s")),
            str(r.get("word_count") or 0), jsonb(issues_payload), q(p.get("html_hash")),
            q(p.get("expected_type")), q(cat), q(sub), jsonb(links_payload),
            q(p.get("crawled_at")),
        ])
        valrows.append(f"({vals})")

    update = ("title=EXCLUDED.title, meta_description=EXCLUDED.meta_description, "
              "canonical=EXCLUDED.canonical, h1s=EXCLUDED.h1s, "
              "word_count=EXCLUDED.word_count, issues=EXCLUDED.issues, "
              "html_hash=EXCLUDED.html_hash, funnel_step=EXCLUDED.funnel_step, "
              "category=EXCLUDED.category, sub_category=EXCLUDED.sub_category, "
              "links=EXCLUDED.links, scraped_at=EXCLUDED.scraped_at")
    # NOTE: html intentionally omitted from both columns and UPDATE so existing
    # html rows are preserved and new rows simply carry NULL html.

    n = 0
    for i in range(0, len(valrows), chunk):
        part = valrows[i:i+chunk]
        sql = (f"INSERT INTO public.page_scrape_data ({cols})\nVALUES\n" +
               ",\n".join(part) +
               f"\nON CONFLICT (url) DO UPDATE SET {update};")
        (SQLDIR / f"upsert-{n:02d}.sql").write_text(sql)
        n += 1
    print(f"Generated {n} SQL chunk(s) for {len(valrows)} pages in {SQLDIR}")
    print("Execute each via Supabase MCP execute_sql.")

if __name__ == "__main__":
    main()
