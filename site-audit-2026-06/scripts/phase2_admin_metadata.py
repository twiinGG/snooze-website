#!/usr/bin/env python3
"""
Phase 2b — harvest Kajabi admin per-page metadata via the authenticated
'kajabi-admin' agent-browser session (login + 2FA already completed).

Landing pages and website pages each expose a server-rendered edit form at
/admin/landing_pages/<id>/edit and /admin/website_pages/<id>/edit carrying:
  title (internal), path (slug), publishing_option, page_title (SEO),
  page_description (SEO), page_image (social share), hide_from_search_engines.

Writes data/kajabi-admin-metadata.json.
Run AFTER an interactive login in session 'kajabi-admin'.
"""
import json, subprocess, time, re
from pathlib import Path
import audit_common as ac

AUDIT = ac.REPO_ROOT / "apps/snooze-website/site-audit-2026-06"
DATA = AUDIT / "data"
SITE = "2148291177"
SESSION = "kajabi-admin"
CANON = "https://www.joinsnooze.com"

def ab_eval(js, timeout=60):
    r = subprocess.run(["agent-browser", "--session", SESSION, "eval", "--json", js],
                       capture_output=True, text=True, timeout=timeout)
    try:
        env = json.loads(r.stdout)
        if env.get("success"):
            return json.loads(env["data"]["result"])
    except Exception:
        return None
    return None

def ab_open(url, wait=3.0, timeout=60):
    subprocess.run(["agent-browser", "--session", SESSION, "open", url],
                   capture_output=True, text=True, timeout=timeout)
    time.sleep(wait)

def collect_ids(kind):
    """kind: 'landing_pages' or 'website_pages'. Returns {id: name}."""
    ids = {}
    for page in range(1, 12):
        ab_open(f"https://app.kajabi.com/admin/sites/{SITE}/{kind}?page={page}", wait=3.0)
        js = ("JSON.stringify(Array.from(document.querySelectorAll('a[href*=\"/%s/\"]'))"
              ".map(a=>({t:(a.innerText||'').trim(),h:a.getAttribute('href')}))"
              ".filter(x=>/\\/%s\\/[0-9]+$/.test(x.h)))" % (kind, kind))
        rows = ab_eval(js) or []
        new = 0
        for r in rows:
            m = re.search(rf"/{kind}/(\d+)$", r["h"])
            if m and m.group(1) not in ids and r["t"]:
                ids[m.group(1)] = r["t"]; new += 1
        if new == 0:
            break
    return ids

def harvest_edit(kind, pid):
    ab_open(f"https://app.kajabi.com/admin/{kind}/{pid}/edit", wait=2.5)
    js = ("JSON.stringify(Object.fromEntries(Array.from("
          "document.querySelectorAll('input[name],textarea[name]'))"
          ".filter(i=>/\\[(title|path|publishing_option|page_title|page_description|page_image|hide_from_search_engines)\\]/.test(i.name||''))"
          ".map(i=>[i.name, i.type==='radio'?(i.checked?i.value:null):i.value])"
          ".filter(x=>x[1]!==null)))")
    fields = ab_eval(js) or {}
    def g(suffix):
        for k, v in fields.items():
            if k.endswith(f"[{suffix}]"):
                return v
        return ""
    return {
        "kind": kind, "page_id": pid,
        "internal_title": g("title"),
        "slug": g("path"),
        "publish_state": g("publishing_option"),
        "seo_title": g("page_title"),
        "seo_description": g("page_description"),
        "social_image": g("page_image"),
        "hide_from_search": g("hide_from_search_engines"),
    }

def main():
    # confirm session is authenticated
    chk = ab_eval("JSON.stringify({u:location.href})")
    print("session at:", chk)
    out = []
    for kind in ("landing_pages", "website_pages"):
        ids = collect_ids(kind)
        print(f"{kind}: {len(ids)} pages")
        for pid, name in ids.items():
            rec = harvest_edit(kind, pid)
            slug = rec.get("slug") or ""
            rec["url"] = f"{CANON}/{slug}" if slug else ""
            rec["list_name"] = name
            out.append(rec)
            print(f"  [{rec['publish_state']}] {slug or '(no slug)'} :: {rec['internal_title'][:40]}")
    (DATA / "kajabi-admin-metadata.json").write_text(json.dumps(out, indent=2))
    print(f"\nWrote {len(out)} admin records to data/kajabi-admin-metadata.json")

if __name__ == "__main__":
    main()
