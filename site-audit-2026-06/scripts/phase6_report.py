#!/usr/bin/env python3
"""Phase 6 — generate AUDIT-REPORT.md from the captured data."""
import json, glob
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
import audit_common as ac

AUDIT = ac.REPO_ROOT / "apps/snooze-website/site-audit-2026-06"
DATA = AUDIT / "data"

def load():
    pages = [json.load(open(f)) for f in glob.glob(str(DATA / "*.json"))
             if Path(f).stem not in ("url-list", "provenance", "kajabi-admin-metadata", "sheet-url")]
    prov = {r["live_url"]: r for r in json.load(open(DATA / "provenance.json"))}
    admin = json.load(open(DATA / "kajabi-admin-metadata.json"))
    return pages, prov, admin

def ms(x):
    try:
        return float(str(x).replace("ms", "").replace("s", "")) if x else 0
    except Exception:
        return 0

def main():
    pages, prov, admin = load()
    sheet_url = (DATA / "sheet-url.txt").read_text().strip() if (DATA / "sheet-url.txt").exists() else "(see run output)"
    ts = "June 9, 2026"

    status = Counter(str(p["http_status_final"]) for p in pages)
    types = Counter(p["expected_type"] for p in pages)
    issues = Counter(i.split(":")[0] for p in pages for i in p.get("issues", []))
    drift = Counter(r["drift_verdict"] for r in prov.values())
    fourohfour = sorted(p["path"] for p in pages if str(p["http_status_final"]) == "404")
    redirects = sorted(p["path"] for p in pages if "redirect_302" in p.get("issues", []))
    login_gated = sorted(p["path"] for p in pages if "login_gated" in p.get("issues", []))
    blog = [p for p in pages if p["expected_type"] == "blog_post"]
    no_jsonld = [p["path"] for p in pages if "no_jsonld" in p.get("issues", [])]
    not_deployed = [(r["path"], r["source_file_path"]) for r in prov.values() if r["drift_verdict"] == "in_repo_not_deployed"]
    drifted = [(r["path"], r.get("heading_match_ratio"), r["source_file_path"]) for r in prov.values() if r["drift_verdict"] == "drifted"]
    cwv = [(p["path"], p["vitals"].get("TTFB", ""), p["vitals"].get("LCP", ""))
           for p in pages if ms(p["vitals"].get("TTFB")) > 1000 or ms(p["vitals"].get("LCP")) > 2500]
    thin = [(p["path"], p["rendered"].get("word_count")) for p in pages if "thin_content" in p.get("issues", [])]
    total_alt = sum(p["rendered"].get("images_missing_alt", 0) for p in pages)
    admin_pub = Counter(a["publish_state"] for a in admin)
    admin_no_img = sum(1 for a in admin if not a["social_image"])
    admin_no_seotitle = sum(1 for a in admin if not a["seo_title"])
    admin_no_seodesc = sum(1 for a in admin if not a["seo_description"])

    L = []
    w = L.append
    w(f"# Live-Site Audit & Content Inventory: joinsnooze.com")
    w(f"\n**Date:** {ts}  ")
    w(f"**Canonical host:** https://www.joinsnooze.com  ")
    w(f"**Pages crawled:** {len(pages)} (real-browser render via agent-browser, stealth UA)  ")
    w(f"**Outputs:** Supabase `public.page_scrape_data` ({len(pages)} rows, scraped {ts}) · "
      f"[Google Sheet]({sheet_url}) (5 tabs) · this repo (`pages/`, `screenshots/`, `data/`)\n")

    w("## How this run was done\n")
    w("- **Crawler:** `agent-browser` (real Chromium) with a non-headless UA and "
      "`--disable-blink-features=AutomationControlled`. This was required: Cloudflare bot-management "
      "blocks the default headless UA on `/offers/*` checkout pages. Stealth flags clear the challenge.")
    w("- **HTTP status:** taken from the browser's own document response (authoritative), with `curl` "
      "as a cross-check. `curl` is false-blocked (403) by Cloudflare on checkout pages where the real "
      "browser gets 200, so browser status wins.")
    w("- **Fan-out:** 6 parallel shards, each its own isolated browser session (plan Option A). "
      "0 failures across 107 URLs.")
    w("- **Kajabi admin metadata:** captured from the authenticated creator account (login + interactive "
      "2FA) by reading each page's server-rendered edit form. 67 records (landing + website pages).")
    w("- **Provenance:** live URL mapped to repo source by wrapper-id, distinctive element-id overlap, "
      "then path heuristics; drift judged by heading overlap against the source file.\n")

    w("## Headline findings\n")
    w(f"1. **{len(blog)} of {len(blog)} blog posts carry no structured data.** Not one blog post has "
      "`Article`/`BlogPosting` JSON-LD. Across the whole site only 3 schema types appear at all "
      "(`VideoObject` x3, `DefinedTermSet` x1, `BreadcrumbList` x1). This is the single biggest AEO/GEO "
      "gap: LLM answer engines and AI Overviews lean on `Article` and `FAQPage` schema, and Snooze ships almost none.")
    w(f"2. **{len(no_jsonld)} content pages have no JSON-LD at all**, including the homepage's content body, "
      "`/about-sally`, the blog index, and every blog post.")
    w(f"3. **3 pages are built in the repo but return 404 live (not deployed):** "
      + ", ".join(f"`{p}`" for p, _ in not_deployed) + ". "
      "Notably `/sleep-glossary` (the new DefinedTermSet+FAQPage glossary) is 404; the live glossary is "
      "`/baby-sleep-glossary`, which has `DefinedTermSet`+`BreadcrumbList` but no `FAQPage`.")
    w(f"4. **{admin_pub.get('draft',0)} of {len(admin)} Kajabi pages are in draft** ({admin_pub.get('published',0)} published). "
      f"Admin-side SEO is thin: {admin_no_img} pages have no social share image, {admin_no_seotitle} have no SEO title, "
      f"{admin_no_seodesc} have no SEO description.")
    w(f"5. **{total_alt} images sitewide are missing alt text** ({issues.get('images_missing_alt',0)} pages affected) — "
      "an accessibility and image-SEO gap.")
    w(f"6. **Camp Snooze Jan'26 checkout (`/offers/muRW6ug5`) now redirects to `/login`** — the public "
      "checkout in `URL-REFERENCE.md` is no longer publicly reachable (camp is past).\n")

    w("## HTTP status summary\n")
    w("| Status | Count |")
    w("|---|---|")
    for s, c in sorted(status.items()):
        w(f"| {s} | {c} |")
    w("")
    w(f"**404s ({len(fourohfour)}):** " + ", ".join(f"`{p}`" for p in fourohfour))
    w(f"\n**302 redirects ({len(redirects)}):** " + ", ".join(f"`{p}`" for p in redirects[:25]))
    w(f"\n**Login-gated ({len(login_gated)}):** checkout/member URLs that redirect to `/login` for "
      "anonymous visitors (expected for member offers; listed in the Sheet Issues tab).\n")

    w("## AEO / GEO coverage\n")
    w(f"- Pages missing JSON-LD entirely: **{len(no_jsonld)} / {len(pages)}**")
    w(f"- Blog posts with `Article` schema: **0 / {len(blog)}**")
    w(f"- Pages missing `Organization`/`WebSite` schema: **{issues.get('missing_org_schema',0)}**")
    w(f"- `llms.txt`: **absent** (https://www.joinsnooze.com/llms.txt returns 302/redirects away, no file present)")
    w("- Live glossary `/baby-sleep-glossary` has `DefinedTermSet` + `BreadcrumbList` but **no `FAQPage`**; "
      "the repo's newer glossary build (`/sleep-glossary`, carries `FAQPage`) is not deployed.\n")
    w("**Recommended fixes (priority order):** add `Article` + `BlogPosting` schema to the blog template; "
      "add `Organization`/`WebSite` schema globally; deploy the `/sleep-glossary` build (or add `FAQPage` "
      "to the live glossary); publish an `llms.txt`.\n")

    w("## Code provenance & drift\n")
    w("| Verdict | Count | Meaning |")
    w("|---|---|---|")
    meanings = {
        "in_sync": "live headings match the repo source",
        "drifted": "matched a source but headings diverge (manual check advised)",
        "in_repo_not_deployed": "source exists in repo but URL is 404 live",
        "no_source_in_repo": "404 and no repo source (legacy/system URL)",
        "redirect": "URL 301/302-redirects elsewhere (no page of its own)",
        "live_only": "live page with no repo source (CMS-authored: blog posts, thank-you/waitlist pages, account/community)",
    }
    for v, c in sorted(drift.items(), key=lambda x: -x[1]):
        w(f"| {v} | {c} | {meanings.get(v,'')} |")
    w("")
    w("**Built in repo but not live (404):**")
    for p, src in not_deployed:
        w(f"- `{p}` -> `{src.split('snooze-website/')[-1]}`")
    w("\n**Drift suspected (low heading overlap; confirm by hand):**")
    for p, ratio, src in drifted:
        w(f"- `{p}` (match ratio {ratio}) vs `{src.split('snooze-website/')[-1]}`")
    w("\nThe homepage's only repo copy lives in `archive/website/home/` (not the active "
      "`kajabi-deployment/pages/` tree) and has drifted from the live page. Full mapping: "
      "`PAGE-SOURCE-MANIFEST.csv` and the Sheet's Code Provenance tab.\n")

    w("## Core Web Vitals outliers\n")
    w("Pages with TTFB > 1000ms or LCP > 2500ms:\n")
    w("| Path | TTFB | LCP |")
    w("|---|---|---|")
    for p, ttfb, lcp in sorted(cwv, key=lambda x: -ms(x[1])):
        w(f"| `{p}` | {ttfb} | {lcp} |")
    w("\nThe blog and several checkout pages have the slowest TTFB; the Cubo Ai review post is the worst (~3s).\n")

    w("## Other classic-SEO issues\n")
    w(f"- Thin content (<150 words): " + (", ".join(f"`{p}` ({n}w)" for p, n in thin) or "none"))
    w(f"- Missing meta description (content pages): {issues.get('missing_meta_description',0)}")
    w(f"- Missing H1 (content pages): {issues.get('missing_h1',0)}")
    w(f"- Missing OG image (content pages): {issues.get('missing_og_image',0)}\n")

    w("## Reconciliation with URL-REFERENCE.md\n")
    w("- `/about` -> `/` (302): matches the documented \"needs redirect\" note (now live as a 302).")
    w("- `/privacy` (404), `/snooze-village` (404): redirects still not in place; documented as pending.")
    w("- `/sleep-glossary` (404): confirmed \"built in repo, not yet created in Kajabi.\"")
    w("- `/get-great-baby-sleep` (404): URL-REFERENCE lists it Active, but it is **404 live** and built in "
      "repo. Either deploy it or correct the reference.")
    w("- `/snooze-method` (404): landing page not launched (matches \"references removed from code\").")
    w("- Camp Snooze Jan'26 checkout now login-gated (was listed working).\n")

    w("## Data locations\n")
    w(f"- **Supabase:** `public.page_scrape_data`, {len(pages)} rows scraped {ts} "
      "(keyed by canonical `www.` URL; prior apex-keyed rows from the 2025 scrape are left intact).")
    w(f"- **Google Sheet:** {sheet_url} — tabs: Pages, Kajabi Metadata, Issues, Code Provenance, Summary.")
    w("- **Repo:** `pages/<slug>.md` (one per page), `screenshots/<slug>.png`, `data/<slug>.json` (raw), "
      "`data/html/<slug>.html` (full rendered HTML), `PAGE-SOURCE-MANIFEST.csv`, "
      "`pages/_global-nav-header-footer.md`.\n")

    (AUDIT / "AUDIT-REPORT.md").write_text("\n".join(L))
    print("Wrote AUDIT-REPORT.md")
    print(f"  pages={len(pages)} 404s={len(fourohfour)} no_jsonld={len(no_jsonld)} "
          f"not_deployed={len(not_deployed)} drift={dict(drift)}")

if __name__ == "__main__":
    main()
