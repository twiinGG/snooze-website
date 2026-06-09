#!/usr/bin/env python3
"""
Phase 1 — build the complete URL list.

Union of:
  - sitemap (data/sitemap-raw.txt, 76 URLs)
  - every joinsnooze URL in apps/snooze-website/docs/technical/URL-REFERENCE.md
  - offer/checkout URLs from docs/operations/KAJABI-OFFERS-REGISTRY.md
Normalised to canonical host https://www.joinsnooze.com, deduped, tagged.

Member/course/admin-only URLs get appended in Phase 2 (after Kajabi login).
Writes data/url-list.json.
"""
import json, re
from pathlib import Path
import audit_common as ac

ROOT = ac.REPO_ROOT
AUDIT = ROOT / "apps/snooze-website/site-audit-2026-06"
CANON = "https://www.joinsnooze.com"

def normalize(u: str) -> str | None:
    u = u.strip().strip('"').strip("'").rstrip(".,)")
    if not u:
        return None
    # drop placeholders
    if "[" in u or "]" in u or "*" in u:
        return None
    # only joinsnooze pages (skip external + the mykajabi terms variant handled separately)
    m = re.match(r"https?://(www\.)?joinsnooze\.com(/.*)?$", u)
    if not m:
        return None
    path = m.group(2) or "/"
    # strip query/fragment for the canonical key (keep base page)
    path = path.split("#")[0]
    # keep coupon-less base; query params dropped for dedupe
    path = path.split("?")[0]
    if path == "":
        path = "/"
    return CANON + path

def expected_type(path: str) -> str:
    if path == "/" or path == "":
        return "homepage"
    if path.startswith("/offers/"):
        return "checkout"
    if path.startswith("/products/communities"):
        return "community"
    if path.startswith("/products/"):
        return "product_access"
    if path.startswith("/downloads/"):
        return "download_access"
    if path.startswith("/blog/"):
        return "blog_post"
    if path == "/blog":
        return "blog_index"
    if path in ("/login", "/account", "/password/new"):
        return "account"
    if any(k in path for k in ("terms", "privacy", "policy")):
        return "legal"
    if any(k in path for k in ("course", "guide", "help", "method", "toolkit", "masterclass", "camp", "regression", "glossary")):
        return "landing"
    return "page"

def requires_auth(path: str) -> bool:
    return path.startswith("/products/") or path.startswith("/downloads/") or path in ("/account",)

def main():
    urls = {}  # canonical_url -> record

    def add(u, source):
        nu = normalize(u)
        if not nu:
            return
        path = nu[len(CANON):] or "/"
        if nu not in urls:
            urls[nu] = {
                "url": nu,
                "path": path,
                "sources": [],
                "requires_auth": requires_auth(path),
                "expected_type": expected_type(path),
            }
        if source not in urls[nu]["sources"]:
            urls[nu]["sources"].append(source)

    # 1. sitemap
    sm = (AUDIT / "data/sitemap-raw.txt").read_text().splitlines()
    for line in sm:
        add(line, "sitemap")

    # 2. URL-REFERENCE.md
    ref = (ROOT / "apps/snooze-website/docs/technical/URL-REFERENCE.md").read_text()
    for m in re.findall(r"https?://(?:www\.)?joinsnooze\.com[^\s`)>\]]*", ref):
        add(m, "url-reference")

    # 3. offers registry -> /offers/<id>/checkout
    reg = (ROOT / "docs/operations/KAJABI-OFFERS-REGISTRY.md").read_text()
    for oid in sorted(set(re.findall(r"offers/([A-Za-z0-9]+)", reg))):
        add(f"{CANON}/offers/{oid}/checkout", "registry")

    out = sorted(urls.values(), key=lambda r: r["path"])
    (AUDIT / "data/url-list.json").write_text(json.dumps(out, indent=2))

    # summary
    by_source = {}
    by_type = {}
    auth_n = 0
    for r in out:
        for s in r["sources"]:
            by_source[s] = by_source.get(s, 0) + 1
        by_type[r["expected_type"]] = by_type.get(r["expected_type"], 0) + 1
        if r["requires_auth"]:
            auth_n += 1
    print(f"Total unique URLs: {len(out)}")
    print("By source (a URL can have multiple):", by_source)
    print("By expected_type:", dict(sorted(by_type.items())))
    print("Requires auth:", auth_n)
    print("Wrote", AUDIT / "data/url-list.json")

if __name__ == "__main__":
    main()
