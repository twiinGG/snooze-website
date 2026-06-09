#!/usr/bin/env python3
"""
Per-page crawl driver for the joinsnooze.com 2026-06 audit.

For each URL (in its assigned agent-browser session):
  - curl  -> initial HTTP status, final effective URL, redirect chain
  - open  -> real-browser render (stealth UA + automation flags off)
  - get html html -> full rendered HTML (stored + hashed)
  - eval  -> rich SEO/AEO metadata (title/meta/canonical/OG/Twitter/JSON-LD/
             headings/links/images/lang/robots)
  - vitals -> Core Web Vitals
  - compute issues (classic SEO + AEO/GEO)
  - write pages/<slug>.md + data/<slug>.json + screenshots/<slug>.png

Idempotent: skips a URL whose data/<slug>.json already exists unless --force.
Usage:
  python3 crawl_page.py --shard data/shards/shard-00.json --session shard-00
  python3 crawl_page.py --url https://www.joinsnooze.com/ --session test
"""
import argparse, hashlib, json, re, subprocess, sys, time
from datetime import datetime, timezone
from pathlib import Path
import audit_common as ac

AUDIT = ac.REPO_ROOT / "apps/snooze-website/site-audit-2026-06"
PAGES = AUDIT / "pages"
DATA = AUDIT / "data"
SHOTS = AUDIT / "screenshots"
CANON = "https://www.joinsnooze.com"

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36")
STEALTH_ARGS = "--disable-blink-features=AutomationControlled"

# ---- JS extractor (runs in page context, returns JSON string) ----
EXTRACT_JS = r"""
(() => {
  const abs = (h) => { try { return new URL(h, location.href).href; } catch(e){ return null; } };
  const txt = (el) => (el && el.innerText ? el.innerText.trim() : '');
  const metas = {};
  const og = {};
  const tw = {};
  document.querySelectorAll('meta').forEach(m => {
    const n = m.getAttribute('name'); const p = m.getAttribute('property');
    const c = m.getAttribute('content') || '';
    if (n) { metas[n.toLowerCase()] = c; if (n.toLowerCase().startsWith('twitter:')) tw[n.toLowerCase()] = c; }
    if (p) { metas[p.toLowerCase()] = c; if (p.toLowerCase().startsWith('og:')) og[p.toLowerCase()] = c;
             if (p.toLowerCase().startsWith('twitter:')) tw[p.toLowerCase()] = c; }
  });
  const jsonld = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
    let parsed = null, types = [];
    try {
      parsed = JSON.parse(s.textContent);
      const collect = (o) => {
        if (Array.isArray(o)) o.forEach(collect);
        else if (o && typeof o === 'object') {
          if (o['@type']) [].concat(o['@type']).forEach(t => types.push(t));
          if (o['@graph']) collect(o['@graph']);
        }
      };
      collect(parsed);
    } catch(e) { types = ['PARSE_ERROR']; }
    jsonld.push({ types, raw_len: (s.textContent||'').length });
  });
  const grab = (sel) => Array.from(document.querySelectorAll(sel)).map(txt).filter(Boolean);
  const links = Array.from(document.querySelectorAll('a[href]')).map(a => {
    const href = abs(a.getAttribute('href'));
    return href ? { href, text: txt(a).slice(0,120),
                    internal: href.indexOf('joinsnooze.com') !== -1 } : null;
  }).filter(Boolean);
  const seen = new Set();
  const links_dedup = links.filter(l => { if (seen.has(l.href)) return false; seen.add(l.href); return true; });
  const images = Array.from(document.querySelectorAll('img')).map(img => ({
    src: abs(img.getAttribute('src')), alt: img.getAttribute('alt'),
    w: img.naturalWidth || null, h: img.naturalHeight || null,
    has_alt: img.hasAttribute('alt') && (img.getAttribute('alt')||'').trim().length > 0
  })).filter(i => i.src);
  const canonEl = document.querySelector('link[rel=canonical]');
  const bodyText = (document.body ? document.body.innerText : '').replace(/\s+/g,' ').trim();
  return JSON.stringify({
    final_url: location.href,
    title: document.title || '',
    lang: document.documentElement.getAttribute('lang') || '',
    meta_description: metas['description'] || '',
    canonical: canonEl ? canonEl.href : '',
    robots: metas['robots'] || '',
    og, twitter: tw, all_meta: metas,
    jsonld,
    jsonld_types: [...new Set(jsonld.flatMap(j => j.types))],
    h1s: grab('h1'), h2s: grab('h2'), h3s: grab('h3'),
    word_count: bodyText ? bodyText.split(' ').length : 0,
    links_total: links_dedup.length,
    links_internal: links_dedup.filter(l => l.internal).length,
    links_external: links_dedup.filter(l => !l.internal).length,
    links: links_dedup.slice(0, 300),
    images_total: images.length,
    images_missing_alt: images.filter(i => !i.has_alt).length,
    images: images.slice(0, 100)
  });
})()
"""

def slugify(path: str) -> str:
    s = path.strip("/")
    if not s:
        return "home"
    s = re.sub(r"[^A-Za-z0-9]+", "_", s).strip("_")
    return s[:120] or "home"

def run(cmd, timeout=90, capture=True):
    return subprocess.run(cmd, capture_output=capture, text=True, timeout=timeout)

def ab(session, *args, timeout=90):
    base = ["agent-browser", "--session", session, "--user-agent", UA, "--args", STEALTH_ARGS]
    return run(base + list(args), timeout=timeout)

def curl_status(url):
    """Return (initial_status, final_status, final_url, redirected) per curl.
    Cloudflare blocks curl on some pages (e.g. /offers/*) so this is a
    cross-check only; the browser document status is authoritative."""
    try:
        init = run(["curl", "-s", "-A", UA, "-o", "/dev/null", "-w", "%{http_code}", url], timeout=30).stdout.strip()
    except Exception:
        init = "ERR"
    try:
        r = run(["curl", "-s", "-A", UA, "-o", "/dev/null", "-w", "%{http_code} %{url_effective}",
                 "-L", "--max-redirs", "10", url], timeout=40).stdout.strip().split(" ", 1)
        final_status = r[0]; final_url = r[1] if len(r) > 1 else url
    except Exception:
        final_status, final_url = "ERR", url
    return init, final_status, final_url, (final_url.rstrip("/") != url.rstrip("/"))

def browser_doc_statuses(session, requested_url, final_url):
    """Read network requests; return (initial_status, final_status) the real
    browser saw for the top-level Document. None when not captured."""
    try:
        out = ab(session, "network", "requests", "--json", timeout=40).stdout
        env = json.loads(out)
        reqs = env.get("data", {}).get("requests") or env.get("requests") or []
    except Exception:
        return None, None
    docs = [r for r in reqs if r.get("resourceType") == "Document"]
    def match(u, target):
        return u and target and u.rstrip("/").split("?")[0] == target.rstrip("/").split("?")[0]
    initial = next((r.get("status") for r in docs if match(r.get("url"), requested_url)), None)
    final = next((r.get("status") for r in reversed(docs) if match(r.get("url"), final_url)), None)
    # fall back: last doc with any status
    if final is None:
        final = next((r.get("status") for r in reversed(docs) if r.get("status")), None)
    return initial, final

def compute_issues(rec):
    issues = []
    st = rec.get("http_status_initial")
    final = rec.get("rendered", {})
    is_ok = str(rec.get("http_status_final")) == "200"
    blocked = "Attention Required" in (final.get("title") or "") or "you have been blocked" in " ".join(final.get("h1s", []))
    login_gated = "/login" in (final.get("final_url") or "")
    if blocked:
        issues.append("cloudflare_blocked")
    if str(st) not in ("200", "ERR") and str(st).startswith(("3",)):
        issues.append(f"redirect_{st}")
    if str(st) == "404":
        issues.append("status_404")
    if str(st) == "403":
        issues.append("status_403")
    if login_gated and rec.get("expected_type") not in ("account",):
        issues.append("login_gated")
    if not is_ok and not login_gated:
        issues.append(f"non_200_final_{rec.get('http_status_final')}")
    # content-level checks only meaningful for rendered 200 public *content* pages
    # (checkout/account/community are transactional/app surfaces; SEO/AEO checks
    #  like missing_h1, no_jsonld, thin_content do not apply there)
    content_types = {"homepage", "landing", "blog_post", "blog_index", "page", "legal", "product_access", "download_access"}
    if is_ok and not blocked and not login_gated and rec.get("expected_type") in content_types:
        if not final.get("title"):
            issues.append("missing_title")
        if not final.get("meta_description"):
            issues.append("missing_meta_description")
        if not final.get("canonical"):
            issues.append("missing_canonical")
        if not final.get("h1s"):
            issues.append("missing_h1")
        elif len(final.get("h1s", [])) > 1:
            issues.append("multiple_h1")
        if not final.get("jsonld_types"):
            issues.append("no_jsonld")
        else:
            types = set(final.get("jsonld_types", []))
            if not (types & {"Article", "BlogPosting", "NewsArticle"}) and rec.get("expected_type") in ("blog_post",):
                issues.append("blog_missing_article_schema")
            if not (types & {"Organization", "WebSite", "LocalBusiness"}):
                issues.append("missing_org_schema")
        if (final.get("word_count") or 0) < 150:
            issues.append("thin_content")
        if not final.get("og", {}).get("og:image"):
            issues.append("missing_og_image")
        if final.get("images_missing_alt", 0) > 0:
            issues.append(f"images_missing_alt:{final['images_missing_alt']}")
    return issues

def parse_vitals(text):
    out = {}
    for key in ["TTFB", "LCP", "CLS", "FCP", "INP"]:
        m = re.search(rf"{key}\s+([0-9.]+m?s?|-|0)\b", text)
        if m:
            out[key] = m.group(1)
    return out

def crawl(url, session, rec_meta, force=False):
    path = url[len(CANON):] or "/"
    slug = slugify(path)
    out_json = DATA / f"{slug}.json"
    if out_json.exists() and not force:
        try:
            return json.loads(out_json.read_text()) | {"_cached": True}
        except Exception:
            pass

    rec = dict(rec_meta)
    rec["url"] = url
    rec["slug"] = slug
    rec["crawled_at"] = datetime.now(timezone.utc).isoformat()

    init, curl_final_status, curl_final_url, redirected = curl_status(url)
    rec["curl_status_initial"] = init
    rec["curl_status_final"] = curl_final_status
    rec["curl_final_url"] = curl_final_url

    # open in browser (clear network buffer first so statuses are this nav only)
    ab(session, "network", "requests", "--clear", timeout=30)
    ab(session, "open", url, "--json", timeout=90)
    time.sleep(1.5)

    # rich metadata via eval
    rendered = {}
    ev = ab(session, "eval", "--json", EXTRACT_JS, timeout=90)
    try:
        env = json.loads(ev.stdout)
        if env.get("success"):
            rendered = json.loads(env["data"]["result"])
    except Exception as e:
        rec["eval_error"] = f"{e}: {ev.stdout[:200]} / {ev.stderr[:200]}"
    rec["rendered"] = rendered

    final_url = rendered.get("final_url") or curl_final_url
    rec["final_url"] = final_url
    rec["redirected"] = (final_url.rstrip("/").split("?")[0] != url.rstrip("/").split("?")[0])

    # authoritative HTTP status from the real browser; curl as fallback
    b_init, b_final = browser_doc_statuses(session, url, final_url)
    rec["browser_status_initial"] = b_init
    rec["browser_status_final"] = b_final
    rec["http_status_initial"] = b_init if b_init is not None else init
    rec["http_status_final"] = b_final if b_final is not None else (b_init if b_init is not None else curl_final_status)

    # full HTML
    html = ""
    try:
        h = ab(session, "get", "html", "html", timeout=90)
        html = h.stdout
    except Exception as e:
        rec["html_error"] = str(e)
    rec["html_len"] = len(html)
    rec["html_hash"] = hashlib.md5(html.encode("utf-8", "ignore")).hexdigest() if html else None

    # screenshot
    shot = SHOTS / f"{slug}.png"
    try:
        ab(session, "screenshot", str(shot), timeout=90)
        rec["screenshot"] = f"screenshots/{slug}.png" if shot.exists() else None
    except Exception as e:
        rec["screenshot_error"] = str(e)

    # vitals
    try:
        v = ab(session, "vitals", "--json", timeout=90)
        venv = json.loads(v.stdout)
        rec["vitals"] = parse_vitals(venv.get("data", {}).get("report", "")) if venv.get("success") else {}
    except Exception:
        rec["vitals"] = {}

    rec["issues"] = compute_issues(rec)

    # persist raw html separately (kept out of JSON to limit size; used for Supabase + provenance)
    (DATA / "html").mkdir(exist_ok=True)
    if html:
        (DATA / "html" / f"{slug}.html").write_text(html, encoding="utf-8")

    out_json.write_text(json.dumps(rec, indent=2))
    write_md(rec)
    return rec

def write_md(rec):
    r = rec.get("rendered", {})
    fm = {
        "url": rec["url"], "slug": rec["slug"], "path": rec.get("path"),
        "expected_type": rec.get("expected_type"), "sources": rec.get("sources"),
        "http_status_initial": rec.get("http_status_initial"),
        "http_status_final": rec.get("http_status_final"),
        "final_url": r.get("final_url"), "redirected": rec.get("redirected"),
        "title": r.get("title"), "meta_description": r.get("meta_description"),
        "canonical": r.get("canonical"), "lang": r.get("lang"), "robots": r.get("robots"),
        "jsonld_types": r.get("jsonld_types"), "word_count": r.get("word_count"),
        "links_internal": r.get("links_internal"), "links_external": r.get("links_external"),
        "images_total": r.get("images_total"), "images_missing_alt": r.get("images_missing_alt"),
        "og_image": (r.get("og") or {}).get("og:image"),
        "vitals": rec.get("vitals"), "issues": rec.get("issues"),
        "crawled_at": rec.get("crawled_at"), "screenshot": rec.get("screenshot"),
    }
    lines = ["---"]
    for k, v in fm.items():
        lines.append(f"{k}: {json.dumps(v, ensure_ascii=False)}")
    lines.append("---\n")
    lines.append(f"# {r.get('title') or rec['url']}\n")
    if r.get("h1s"):
        lines.append("## H1\n" + "\n".join(f"- {h}" for h in r["h1s"]) + "\n")
    if r.get("h2s"):
        lines.append("## H2\n" + "\n".join(f"- {h}" for h in r["h2s"][:40]) + "\n")
    if r.get("h3s"):
        lines.append("## H3\n" + "\n".join(f"- {h}" for h in r["h3s"][:60]) + "\n")
    (PAGES / f"{rec['slug']}.md").write_text("\n".join(lines), encoding="utf-8")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--shard")
    ap.add_argument("--url")
    ap.add_argument("--session", required=True)
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args()

    if args.url:
        items = [{"url": args.url, "path": args.url[len(CANON):] or "/", "expected_type": "page", "sources": ["cli"]}]
    else:
        items = json.loads(Path(args.shard).read_text())

    results = []
    for it in items:
        url = it["url"]
        try:
            rec = crawl(url, args.session, it, force=args.force)
            tag = "cached" if rec.get("_cached") else "ok"
            print(f"[{tag}] {url} status={rec.get('http_status_final')} "
                  f"words={rec.get('rendered',{}).get('word_count')} issues={len(rec.get('issues',[]))}")
            results.append({"url": url, "slug": rec["slug"], "status": rec.get("http_status_final"),
                            "issues": rec.get("issues", []), "ok": True})
        except Exception as e:
            print(f"[FAIL] {url}: {e}", file=sys.stderr)
            results.append({"url": url, "ok": False, "error": str(e)})
    # close the session to free the browser
    try:
        run(["agent-browser", "--session", args.session, "close"], timeout=30)
    except Exception:
        pass
    print(f"\nShard done: {sum(1 for r in results if r['ok'])}/{len(results)} ok")
    return results

if __name__ == "__main__":
    main()
