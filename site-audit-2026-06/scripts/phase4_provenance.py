#!/usr/bin/env python3
"""
Phase 4 — code provenance + drift.

For each captured live page, map it to its source file in
kajabi-deployment/pages/** and classify drift:
  in_sync | drifted | no_source_in_repo | live_only

Strategy (in priority order):
  1. Wrapper-ID match: the live rendered HTML carries a wrapper id like
     <div id="about-sally-page">; match to the source file defining that id.
  2. Path/slug heuristic: known path -> directory/file conventions.
  3. Otherwise no source (CMS-authored blog posts, Kajabi system pages).

Drift: compare a normalized set of the live page's H1+H2 headings against the
text of the matched source file. Strong overlap => in_sync, weak => drifted.

Writes PAGE-SOURCE-MANIFEST.csv and data/provenance.json.
"""
import csv, json, re
from pathlib import Path
import audit_common as ac

ROOT = ac.REPO_ROOT
AUDIT = ROOT / "apps/snooze-website/site-audit-2026-06"
PAGES_SRC = ROOT / "apps/snooze-website/kajabi-deployment/pages"
DATA = AUDIT / "data"
HTML = DATA / "html"

WRAPPER_RE = re.compile(r'<div\s+[^>]*\bid="([a-z0-9][a-z0-9-]*-page)"', re.I)
ID_RE = re.compile(r'\bid="([a-z0-9][a-z0-9_-]{3,})"', re.I)

# element ids too generic to be distinctive provenance signals
GENERIC_IDS = {
    "kajabi-form-container", "hero-cta-location", "course-sample-form",
    "email", "name", "submit", "form", "header", "footer", "main", "content",
    "wrapper", "container", "app", "root", "body",
    # recurring section/anchor ids shared across many Snooze pages (not distinctive)
    "baby", "infant", "newborn", "toddler", "faqs", "faq", "how-it-works",
    "podcast", "exit_pop", "language_login", "encore-theme", "reviews",
    "testimonials", "pricing", "hero", "cta", "about", "contact",
}

def page_ids(html):
    out = set()
    for i in ID_RE.findall(html or ""):
        il = i.lower()
        if il in GENERIC_IDS:
            continue
        if il.startswith(("kajabi", "block-")):
            continue
        if il.isdigit() or re.fullmatch(r"\d+(_\d+)?", il):  # Kajabi auto-numeric ids
            continue
        out.add(il)
    return out

def build_source_index():
    """Per source file: distinctive element ids + raw text + wrapper-page ids."""
    files = {}
    wrapper_idx = {}
    for f in PAGES_SRC.rglob("*.html"):
        try:
            t = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        rel = str(f.relative_to(ROOT))
        files[rel] = {"text": t, "ids": page_ids(t)}
        for m in set(WRAPPER_RE.findall(t)):
            wrapper_idx.setdefault(m.lower(), []).append(rel)
    return wrapper_idx, files

def norm(s):
    return re.sub(r"[^a-z0-9 ]", "", (s or "").lower()).strip()

def headings_set(rendered):
    hs = (rendered.get("h1s", []) or []) + (rendered.get("h2s", []) or [])
    return set(norm(h) for h in hs if norm(h) and len(norm(h)) > 3)

# path -> source-file heuristics (relative to repo root) for pages whose
# wrapper id won't appear (checkout offers keyed by id, age pages, etc.)
PATH_HINTS = [
    (re.compile(r"^/about-sally$"), "website/about-sally/about-sally.html"),
    (re.compile(r"^/contact$"), "website/contact/contact-page-complete.html"),
    (re.compile(r"^/recommended-products$"), "website/recommended-products/recommended-products-complete.html"),
    (re.compile(r"^/privacy-policy$"), "website/privacy-policy/privacy-policy.html"),
    (re.compile(r"^/terms-conditions$"), "website/terms-conditions/terms-conditions.html"),
    (re.compile(r"^/blog$"), "website/blog-index/blog-index.html"),
    (re.compile(r"^/newborn-baby-sleep-help$"), "website/age-pages/newborn-page-complete.html"),
    (re.compile(r"^/3-4-month-baby-sleep-help$"), "website/age-pages/3-4-month-page-complete.html"),
    (re.compile(r"^/5-12-month-baby-sleep-help$"), "website/age-pages/5-12-month-page-complete.html"),
    (re.compile(r"^/toddler-sleep-help$"), "website/age-pages/toddler-page-complete.html"),
    (re.compile(r"^/one-on-one-sleep-consultations$"), "website/consultations/one-on-one-consultations-page.html"),
    (re.compile(r"^/sleep-glossary$"), "website/glossary/bundle/sleep-glossary.html"),
    (re.compile(r"^/get-great-baby-sleep$"), "landing/cold-traffic-landing-page/cold-traffic-landing-page-blocks.html"),
    (re.compile(r"^/snooze-method$"), "website/snooze-method/snooze-method-page-complete.html"),
    (re.compile(r"^/3-4-month-baby-sleep-course-terms"), "website/legal/3-4-month-course-terms-and-conditions.html"),
    (re.compile(r"^/snooze-social-terms"), "website/legal/snooze-social-terms-and-conditions.html"),
]

def find_by_hint(path):
    for rx, suffix in PATH_HINTS:
        if rx.search(path):
            cand = PAGES_SRC / suffix
            if cand.exists():
                return str(cand.relative_to(ROOT))
    # homepage source lives in archive/, not the active deployment tree
    if path == "/":
        home = ROOT / "apps/snooze-website/archive/website/home/snooze-home-page-blocks.html"
        if home.exists():
            return str(home.relative_to(ROOT))
    return None

def main():
    wrapper_idx, src_files = build_source_index()
    records = []
    page_jsons = sorted(p for p in DATA.glob("*.json")
                        if p.stem not in ("url-list", "provenance", "kajabi-admin-metadata", "sheet-url"))
    for pj in page_jsons:
        rec = json.loads(pj.read_text())
        slug = rec.get("slug", pj.stem)
        path = rec.get("path", "")
        rendered = rec.get("rendered", {})
        live_html = ""
        hf = HTML / f"{slug}.html"
        if hf.exists():
            live_html = hf.read_text(encoding="utf-8", errors="ignore")

        source_file, wrapper_id, method = None, None, None
        etype = rec.get("expected_type")
        status = str(rec.get("http_status_final"))

        # redirected pages have no page of their own (live HTML is the target's)
        final_path = (rec.get("final_url") or "")[len("https://www.joinsnooze.com"):] or "/"
        is_redirect = rec.get("redirected") and final_path.split("?")[0].rstrip("/") != path.rstrip("/")
        login_gated = "/login" in (rec.get("final_url") or "")

        if not is_redirect and not login_gated:
            # 1. wrapper-page id exact match (strongest)
            live_wrappers = [m.lower() for m in set(WRAPPER_RE.findall(live_html))]
            for wid in live_wrappers:
                if wid in wrapper_idx:
                    source_file, wrapper_id, method = wrapper_idx[wid][0], wid, "wrapper_id"
                    break

            # 2. distinctive element-id overlap scoring (handles drifted wrappers)
            if not source_file:
                live_ids = page_ids(live_html)
                if live_ids:
                    best, best_score, best_shared = None, 0, 0
                    for rel, meta in src_files.items():
                        shared = live_ids & meta["ids"]
                        if len(shared) >= 2:
                            score = len(shared) / max(1, min(len(live_ids), len(meta["ids"])))
                            if score > best_score:
                                best, best_score, best_shared = rel, score, len(shared)
                    if best and best_score >= 0.4 and best_shared >= 2:
                        source_file, method = best, "id_overlap"

            # 3. path hint fallback
            if not source_file:
                sf = find_by_hint(path)
                if sf:
                    source_file, method = sf, "path_hint"

        # drift verdict
        if is_redirect:
            verdict = "redirect"
        elif login_gated and etype not in ("account",):
            verdict = "login_gated"
        elif status == "404":
            # a 404 with a matched repo source = built but not deployed to Kajabi
            verdict = "in_repo_not_deployed" if source_file else "no_source_in_repo"
        elif not source_file:
            if etype == "blog_post":
                verdict = "live_only"  # blog posts authored in Kajabi CMS
            elif status == "404":
                verdict = "no_source_in_repo"
            else:
                verdict = "live_only"
        else:
            src_text = norm(src_files.get(source_file, {}).get("text", ""))
            live_h = headings_set(rendered)
            if not live_h:
                verdict = "unverifiable_no_headings"
            else:
                hit = sum(1 for h in live_h if h in src_text)
                ratio = hit / max(1, len(live_h))
                verdict = "in_sync" if ratio >= 0.5 else "drifted"
                rec_ratio = round(ratio, 2)
                records_extra = {"heading_match_ratio": rec_ratio,
                                 "headings_checked": len(live_h), "headings_hit": hit}
        row = {
            "live_url": rec.get("url"),
            "path": path,
            "slug": slug,
            "page_type": etype,
            "http_status": status,
            "source_file_path": source_file or "",
            "wrapper_id": wrapper_id or "",
            "match_method": method or "",
            "found": bool(source_file),
            "drift_verdict": verdict,
        }
        if source_file and verdict in ("in_sync", "drifted"):
            row.update(records_extra)
        records.append(row)

    # write CSV
    cols = ["live_url", "path", "slug", "page_type", "http_status",
            "source_file_path", "wrapper_id", "match_method", "found",
            "drift_verdict", "heading_match_ratio", "headings_checked", "headings_hit"]
    out_csv = AUDIT / "PAGE-SOURCE-MANIFEST.csv"
    with out_csv.open("w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=cols)
        w.writeheader()
        for r in records:
            w.writerow({c: r.get(c, "") for c in cols})
    (DATA / "provenance.json").write_text(json.dumps(records, indent=2))

    # summary
    from collections import Counter
    vc = Counter(r["drift_verdict"] for r in records)
    fc = Counter(r["found"] for r in records)
    print(f"Pages: {len(records)}")
    print("Source found:", dict(fc))
    print("Drift verdicts:", dict(vc))
    print("Wrote", out_csv)

if __name__ == "__main__":
    main()
