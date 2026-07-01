#!/usr/bin/env python3
"""
Generate the Snooze Reviews page as a proper site page, from the live Notion corpus.

- Public reviews only (Permission Level = Public) — verified, no consent issues.
  (Camp transcript + DM screenshot rows are Internal/unapproved and excluded.)
- Wrapper #reviews-page; reuses the global .reviews-grid / .review-card pattern; styles
  live in global/css/snooze-unified-theme.css (#reviews-page block). Matches the site.
- Organised into service sections (corrected brand labels): The Snooze Membership,
  Courses & Guides (incl. Toddler Toolkit), 1:1 Consults & Coaching, Camp Snooze.
- Filter bar (service / baby age / rating / search) toggles pre-rendered cards (SEO:
  review text is crawlable in the HTML, not injected). JSON-LD AggregateRating + Review.
- Names: first name + surname initial (e.g. "Kimmy F."); baby age appended where stated.

Output: kajabi-deployment/pages/website/reviews-page/src/reviews-page.html
Usage: python gen_reviews_page.py
"""
from __future__ import annotations

import html
import json
import os
import re
from pathlib import Path

from dotenv import load_dotenv
import requests

ROOT = Path(__file__).resolve()
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break
APP = ROOT / "apps/snooze-website"
OUT = APP / "kajabi-deployment/pages/website/reviews-page/src/reviews-page.html"

DB = "24f33898-b6c2-817c-bfa3-cab91a68b9e9"
NV = "2022-06-28"
TOK = os.getenv("NOTION_API_TOKEN") or os.getenv("NOTION_TOKEN")
H = {"Authorization": f"Bearer {TOK}", "Notion-Version": NV, "Content-Type": "application/json"}
CAMP_RE = re.compile(r"\bcamp\b|camp snooze", re.I)


def rt(p, n):
    return "".join(x.get("plain_text", "") for x in (p.get(n) or {}).get("rich_text", []))


def multi(p, n):
    return [o["name"] for o in (p.get(n) or {}).get("multi_select", [])]


def fetch_public():
    url = f"https://api.notion.com/v1/databases/{DB}/query"
    rows, cur = [], None
    while True:
        body = {"page_size": 100, "filter": {"property": "Permission Level", "select": {"equals": "Public"}}}
        if cur:
            body["start_cursor"] = cur
        d = requests.post(url, headers=H, json=body, timeout=60).json()
        for p in d["results"]:
            pr = p["properties"]
            fd = (pr.get("Feedback Date") or {}).get("date") or {}
            rows.append({"notes": rt(pr, "Notes"), "name": rt(pr, "Google Display Name"),
                         "rating": (pr.get("Rating") or {}).get("number"),
                         "product": multi(pr, "Product"), "date": (fd.get("start") or "")[:10]})
        if not d.get("has_more"):
            break
        cur = d["next_cursor"]
    return rows


def short_name(full):
    full = (full or "").strip()
    if not full:
        return "Snooze parent"
    parts = full.split()
    first = parts[0][:1].upper() + parts[0][1:]
    return f"{first} {parts[-1][0].upper()}." if len(parts) > 1 and parts[-1] else first


def baby_age(text):
    t = text.lower()
    for pat in [r"(\d+(?:\.\d+)?)\s*[- ]?month", r"(\d+(?:\.\d+)?)\s*mo\b", r"(\d+(?:\.\d+)?)\s*m\s*old"]:
        m = re.search(pat, t)
        if m:
            return f"{m.group(1)}mo"
    m = re.search(r"(\d+)\s*[- ]?week", t)
    if m:
        return f"{m.group(1)}wk"
    if "newborn" in t:
        return "newborn"
    if "toddler" in t:
        return "toddler"
    return ""


def age_band(text):
    t = text.lower()
    if "newborn" in t:
        return "Newborn"
    if "toddler" in t:
        return "Toddler"
    m = re.search(r"(\d+(?:\.\d+)?)\s*(?:[- ]?month|mo\b|m\s*old)", t)
    if m:
        n = float(m.group(1))
        return "Newborn" if n <= 3 else ("Baby" if n <= 12 else "Toddler")
    if re.search(r"(\d+)\s*[- ]?week", t):
        return "Newborn"
    if re.search(r"(\d+)\s*(?:year|yr|yo)\b", t):
        return "Toddler"
    return ""


SERVICES = [
    ("membership", "The Snooze Membership", "Ongoing support, the Snooze community, the app and the podcast."),
    ("guides", "Courses & Guides", "The newborn, 3-4 month and 5-12 month programs and the Toddler Toolkit."),
    ("consult", "1:1 Consults & Coaching", "Personalised one-on-one work with Sally."),
    ("camp", "Camp Snooze", "Our two-week small-group sleep intensive."),
]


def service_of(r):
    t = r["notes"].lower()
    if CAMP_RE.search(r["notes"]):
        return "camp"
    if "1:1 Consult" in r["product"] or any(k in t for k in ["consult", "package", "slumber party", "one on one", "one-on-one", "1:1"]):
        return "consult"
    if any(p in r["product"] for p in ["5-12 Month Guide", "3-4 Month Course", "Newborn Guide", "Toddler Toolkit"]) or \
       any(k in t for k in ["guide", "course", "3-4 month", "5-12 month", "newborn guide", "toddler toolkit", "toddler"]):
        return "guides"
    return "membership"


def card(r, svc_label):
    nm = short_name(r["name"])
    age = baby_age(r["notes"])
    band = age_band(r["notes"])
    rating = int(r["rating"] or 5)
    body = html.escape(r["notes"].strip())
    meta = nm + (f" · baby {age}" if age else "")
    search = html.escape((r["notes"] + " " + r["name"]).lower().replace('"', ""))
    tags = f'<span class="review-tag">{html.escape(svc_label)}</span>'
    if band:
        tags += f'<span class="review-tag">{band}</span>'
    star_i = '<i class="fa-solid fa-star"></i>' * rating
    return (f'<article class="review-card" data-service="{service_of(r)}" data-age="{band}" '
            f'data-rating="{rating}" data-search="{search}">'
            f'<div class="review-header"><div class="review-stars">{star_i}</div></div>'
            f'<blockquote class="review-quote">{body}</blockquote>'
            f'<div class="review-author"><div class="author-avatar-letter">{html.escape(nm[:1])}</div>'
            f'<div class="author-name">{html.escape(meta)}</div></div>'
            f'<div class="review-tags">{tags}</div>'
            f'</article>')


def main():
    rows = [r for r in fetch_public() if r["notes"].strip()]
    total = len(rows)
    avg = round(sum((r["rating"] or 5) for r in rows) / max(total, 1), 1)
    buckets = {k: [] for k, *_ in SERVICES}
    for r in rows:
        buckets[service_of(r)].append(r)
    for k in buckets:
        buckets[k].sort(key=lambda r: ((r["rating"] or 0), len(r["notes"]), r["date"]), reverse=True)

    # Filter option lists
    bands = ["Newborn", "Baby", "Toddler"]
    svc_opts = "".join(f'<option value="{k}">{lbl}</option>' for k, lbl, _ in SERVICES)
    age_opts = "".join(f'<option value="{b}">{b}</option>' for b in bands)

    sections = []
    for key, label, blurb in SERVICES:
        items = buckets[key]
        if not items:
            continue
        cards = "\n      ".join(card(r, label) for r in items)
        sections.append(
            f'<section class="reviews-service-section" data-sec="{key}">'
            f'<h2>{label}</h2><p class="rss-blurb">{html.escape(blurb)}</p>'
            f'<div class="reviews-grid">\n      {cards}\n    </div></section>')

    # JSON-LD: AggregateRating + top reviews
    top = sorted(rows, key=lambda r: ((r["rating"] or 0), len(r["notes"])), reverse=True)[:60]
    ld = {
        "@context": "https://schema.org", "@type": "Organization",
        "name": "Snooze by The Sleep Concierge", "url": "https://www.joinsnooze.com",
        "aggregateRating": {"@type": "AggregateRating", "ratingValue": str(avg),
                            "reviewCount": str(total), "bestRating": "5"},
        "review": [{"@type": "Review",
                    "author": {"@type": "Person", "name": short_name(r["name"])},
                    "reviewRating": {"@type": "Rating", "ratingValue": str(int(r["rating"] or 5)), "bestRating": "5"},
                    "reviewBody": r["notes"].strip()} for r in top],
    }

    page = f"""<!-- ============================================================
     SNOOZE REVIEWS PAGE  (#reviews-page)
     Generated from the Member Feedback & Wins corpus ({total} public reviews).
     Styles: global/css/snooze-unified-theme.css  (#reviews-page block).
     DRAFT: review before Kajabi paste (RUNBOOK Wave 3 #20 / #18 gate).
     Kajabi page SEO settings (set in CMS, not here):
       Title: "Snooze Reviews | Real Baby Sleep Results | The Sleep Concierge"
       Meta:  "Read {total}+ verified reviews from parents who used Snooze to help their
               baby sleep through the night, self-settle and nap better. Membership,
               courses, 1:1 consults and Camp Snooze."
     ============================================================ -->
<div id="reviews-page">
  <div class="reviews-wrap">
    <div class="reviews-hero">
      <h1>Snooze reviews from real families</h1>
      <div class="reviews-summary">
        <span class="rs-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <span class="rs-score">{avg}</span>
        <span class="rs-count">from {total}+ verified reviews</span>
      </div>
      <p class="reviews-lede">See how parents used Snooze to help their baby sleep through the night, settle independently and nap better. Honest reviews of the membership, our sleep courses and guides, 1:1 consults and Camp Snooze, from a certified sleep consultant and paediatric nurse.</p>
    </div>

    <div class="reviews-filterbar">
      <select id="rv-service" aria-label="Filter by service"><option value="">All services</option>{svc_opts}</select>
      <select id="rv-age" aria-label="Filter by baby age"><option value="">All ages</option>{age_opts}</select>
      <select id="rv-rating" aria-label="Filter by rating"><option value="">All ratings</option><option value="5">5 stars</option><option value="4">4 stars and up</option></select>
      <input id="rv-search" type="search" placeholder="Search reviews..." aria-label="Search reviews">
      <button class="reviews-clear" id="rv-clear">Clear</button>
    </div>
    <div class="reviews-resultcount">Showing <span id="rv-count">{total}</span> of {total} reviews</div>

    {''.join(sections)}
  </div>

  <script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=2)}
  </script>
  <script>
  (function(){{
    var root=document.getElementById('reviews-page');
    var svc=root.querySelector('#rv-service'),age=root.querySelector('#rv-age'),
        rat=root.querySelector('#rv-rating'),q=root.querySelector('#rv-search'),
        clear=root.querySelector('#rv-clear'),count=root.querySelector('#rv-count');
    var cards=[].slice.call(root.querySelectorAll('.review-card'));
    function apply(){{
      var fs=svc.value,fa=age.value,fr=rat.value,fq=q.value.trim().toLowerCase(),shown=0;
      cards.forEach(function(c){{
        var ok=(!fs||c.dataset.service===fs)&&(!fa||c.dataset.age===fa)
          &&(!fr||parseInt(c.dataset.rating,10)>=parseInt(fr,10))
          &&(!fq||c.dataset.search.indexOf(fq)>-1);
        c.hidden=!ok; if(ok) shown++;
      }});
      root.querySelectorAll('.reviews-service-section').forEach(function(s){{
        s.hidden=s.querySelectorAll('.review-card:not([hidden])').length===0;
      }});
      count.textContent=shown;
    }}
    [svc,age,rat].forEach(function(el){{el.addEventListener('change',apply)}});
    q.addEventListener('input',apply);
    clear.addEventListener('click',function(){{svc.value='';age.value='';rat.value='';q.value='';apply();}});
  }})();
  </script>
</div>
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(page)
    print(f"Wrote {OUT.relative_to(APP)} — {total} reviews | avg {avg} | "
          + " · ".join(f"{lbl}:{len(buckets[k])}" for k, lbl, _ in SERVICES))


if __name__ == "__main__":
    main()
