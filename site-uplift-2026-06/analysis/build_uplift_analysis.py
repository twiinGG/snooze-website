#!/usr/bin/env python3
"""
Part A — Uplift analysis engine (joinsnooze.com June 2026 audit).

Joins the live-site audit (per-page JSON in ../data/*.json + captured HTML in
../data/html/*.html) against live GA4 traffic / conversion / organic data, then
computes a PageValue x OpportunityGap = Priority ranking plus the supporting
deliverables described in the plan (Part A, items A1-A4).

GA4 source: property 401774815 ("Sleep Concierge G4"), pulled live via the
GA4 MCP on 2026-06-09. Numbers are embedded below (see GA4_* dicts) so this
script is fully reproducible without re-hitting the API. Re-pull and replace the
dicts to refresh. Clarity behaviour data is stale (<= 2026-04-28) so it is read
opportunistically from Supabase-exported history if present; otherwise the
EngagementQuality term falls back to GA4 engagement (documented as a gap).

Outputs (../data/analysis/):
  page_value_ranking.csv     master uplift backlog, sorted by Priority
  link_graph_edges.csv       directed internal-link edges (canonical)
  link_graph_summary.csv     in/out-degree + hygiene flags per page
  link_hygiene_issues.csv    every link to old domain / non-www / stale slug
  social_proof_coverage.csv  traffic x has-proof, injection priority
  organic_pages.csv          GA4 organic-search landing pages, audit-joined
  conversion_paths.md        funnel / money-feeder narrative
"""
import csv
import json
import math
import os
import re
from collections import defaultdict
from urllib.parse import urlsplit

HERE = os.path.dirname(os.path.abspath(__file__))                 # site-uplift-2026-06/analysis
WEBSITE = os.path.normpath(os.path.join(HERE, "..", ".."))        # apps/snooze-website
DATA = os.path.join(WEBSITE, "site-audit-2026-06", "data")        # raw audit crawl data (read-only)
HTML = os.path.join(DATA, "html")
OUT = HERE                                                        # outputs live beside this script
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------------------
# GA4 live data (property 401774815, pulled 2026-06-09 via GA4 MCP)
# ---------------------------------------------------------------------------
# 90-day: path -> (screenPageViews, sessions, engagedSessions, engagementSec)
GA4_90D = {
    "/login": (1150, 832, 550, 5925),
    "/camp-snooze-sleep-coaching": (926, 844, 412, 15866),
    "/": (837, 697, 444, 10533),
    "/library": (831, 475, 406, 7971),
    "/5-12-month-baby-sleep-course": (693, 602, 377, 12285),
    "/one-on-one-sleep-consultations": (432, 370, 259, 8045),
    "/offers/z63s9var/checkout": (355, 307, 189, 6621),
    "/products/5-12-month-sleep-training-course": (312, 163, 157, 4514),
    "/3-4-month-baby-sleep-course": (182, 147, 85, 3585),
    "/snooze-library": (157, 93, 81, 897),
    "/contact": (156, 139, 137, 2100),
    "/toddler-toolkit": (152, 127, 93, 3196),
    "/blog": (123, 91, 40, 1091),
    "/privacy-policy": (116, 117, 87, 309),
    "/home": (99, 85, 82, 452),
    "/products/toddler-toolkit": (98, 49, 48, 1714),
    "/offers/46bz9tk6/checkout": (94, 88, 55, 1572),
    "/about-sally": (93, 74, 57, 1292),
    "/newborn-sleep-guide": (65, 56, 36, 934),
    "/products/5-12-month-sleep-schedules-free-module": (62, 41, 39, 644),
    "/offers/2x92ualf/checkout": (54, 52, 45, 932),
    "/podcasts/the-daily-note": (51, 39, 33, 359),
    "/products/3-4-month-baby-sleep-course": (50, 37, 36, 511),
    "/products/2149308933": (49, 43, 43, 592),
    "/downloads/the-roadmap-to-a-smooth-3-to-2-nap-transition-6-9-month-old-babies": (47, 43, 39, 294),
    "/offers/4zhpsrcs/checkout": (46, 46, 16, 260),
    "/thank_you/z63s9var": (45, 37, 37, 449),
    "/terms-conditions": (41, 40, 29, 1181),
    "/thankyou/2x92ualf": (39, 38, 37, 338),
    "/author/sally-woods": (37, 29, 25, 384),
    "/offers/rvulzka/checkout": (35, 30, 15, 231),
    "/downloads/catnapping-guide": (31, 26, 23, 146),
    "/offers/k3y6fekx/checkout": (30, 28, 23, 334),
    "/password/new": (29, 27, 27, 147),
    "/account": (23, 18, 14, 74),
    "/blog/mystery-of-missing-third-nap-early-rising": (23, 21, 16, 1298),
    "/blog/all-about-the-8-10-month-sleep-regression": (22, 20, 9, 332),
    "/password/edit": (22, 22, 20, 353),
    "/blog/dr-harvey-karps-5-ss-to-soothe-your-crying-baby": (21, 21, 7, 459),
    "/4-month-sleep-regression-survival-guide": (20, 15, 11, 318),
    "/blog/babyzen-yoyo-travel-stroller-review-you-can-stop-googling-now-this-is-the-stroller-for-you": (20, 19, 9, 420),
    "/blog/guide-to-self-settling-sleep-cycles": (20, 14, 5, 379),
    "/podcasts/2148061955": (19, 16, 14, 85),
    "/products/newborn-sleep-guide": (17, 13, 13, 496),
    "/blog/cubo-ai-smart-baby-monitor-review-with-discount": (17, 16, 6, 1356),
    "/camp-snooze-waitlist-thank-you": (16, 16, 15, 88),
    "/offers/uxwneffg/checkout": (16, 13, 3, 240),
    "/toddler-sleep-help": (16, 13, 5, 87),
    "/blog/navigating-split-nights-a-guide-for-parents": (15, 11, 5, 315),
    "/snooze-social-terms-and-conditions": (15, 12, 10, 65),
    "/recommended-products": (13, 10, 7, 73),
    "/blog/my-honest-snoo-experience-and-review": (12, 11, 6, 365),
    "/newsletters/the-snooze-news": (12, 5, 4, 44),
    "/offers/9dfjswvd/checkout": (12, 11, 8, 195),
}

# 365-day: path -> (screenPageViews, sessions)
GA4_365D = {
    "/": (9903, 8106),
    "/login": (9830, 7576),
    "/links": (9527, 8126),
    "/library": (8392, 5641),
    "/product/5-12-month-baby-sleep-guide": (4713, 4188),
    "/3-4-month-baby-sleep-course": (3346, 2965),
    "/offers/4zhpsrcs/checkout": (3077, 2699),
    "/one-on-one-sleep-consultations": (2782, 2271),
    "/camp-snooze-sleep-coaching": (2552, 2281),
    "/offers/hbgyz97h/checkout": (2418, 2167),
    "/5-12-month-baby-sleep-course": (2151, 1852),
    "/5-12-month-baby-sleep-help": (2111, 1650),
    "/downloads/baby-sleep-guide-5-to-12-months": (1683, 1190),
    "/products/5-12-month-sleep-training-course": (1526, 778),
    "/the-snooze-social-membership": (1470, 1164),
    "/offers/6irarwak/checkout": (1341, 1165),
    "/snooze-library": (1282, 673),
    "/3-4-month-baby-sleep-help": (1263, 1058),
    "/blog": (1242, 836),
    "/offers/z63s9var/checkout": (1109, 972),
    "/offers/w2pyql2x/checkout": (894, 782),
    "/newborn-baby-sleep-help": (813, 672),
    "/offers/jrxwanvo/checkout": (778, 704),
    "/products/toddler-toolkit": (773, 363),
    "/snooze-social-welcome": (760, 528),
    "/contact": (670, 532),
    "/toddler-toolkit": (648, 547),
    "/offers/n8v8efee/checkout": (647, 537),
    "/get-great-baby-sleep": (625, 566),
    "/downloads/updated-schedules-for-5-12-month-sleep-guide": (597, 489),
    "/offers/32dbwdyp/checkout": (531, 500),
    "/blog/cubo-ai-smart-baby-monitor-review-with-discount": (502, 497),
    "/toddler-sleep-help": (453, 350),
    "/founding-member": (383, 335),
    "/about": (343, 289),
    "/about-sally": (324, 269),
    "/products/3-4-month-baby-sleep-course": (320, 213),
    "/downloadable-free-sleep-guides": (245, 219),
    "/newborn-sleep-guide": (239, 201),
    "/blog/all-about-the-8-10-month-sleep-regression": (286, 267),
    "/blog/babyzen-yoyo-travel-stroller-review-you-can-stop-googling-now-this-is-the-stroller-for-you": (196, 189),
    "/blog/mystery-of-missing-third-nap-early-rising": (204, 202),
    "/blog/dr-harvey-karps-5-ss-to-soothe-your-crying-baby": (171, 171),
    "/blog/guide-to-self-settling-sleep-cycles": (154, 119),
    "/blog/my-honest-snoo-experience-and-review": (153, 151),
    "/blog/navigating-split-nights-a-guide-for-parents": (124, 118),
    "/snooze": (189, 72),
    "/store": (189, 169),
    "/recommended-products": (169, 162),
    "/privacy-policy": (149, 146),
    "/products/2149308933": (149, 109),
    "/downloads/catnapping-guide": (137, 111),
    "/snooze-social-terms-and-conditions": (136, 126),
    "/terms-conditions": (166, 162),
    "/podcasts/the-daily-note": (158, 116),
    "/4-month-sleep-regression-survival-guide": (147, 137),
    "/author/sally-woods": (294, 262),
    "/products/5-12-month-sleep-schedules-free-module": (214, 147),
}

# 90-day key events: path -> {event: count}
GA4_EVENTS = {
    "/offers/z63s9var/checkout": {"begin_checkout": 337},
    "/contact": {"generate_lead": 156},
    "/offers/46bz9tk6/checkout": {"begin_checkout": 90},
    "/offers/2x92ualf/checkout": {"begin_checkout": 52},
    "/thank_you/z63s9var": {"purchase": 45},
    "/offers/4zhpsrcs/checkout": {"begin_checkout": 41},
    "/offers/rvulzka/checkout": {"begin_checkout": 30},
    "/offers/k3y6fekx/checkout": {"begin_checkout": 27},
    "/offers/uxwneffg/checkout": {"begin_checkout": 14},
    "/offers/9dfjswvd/checkout": {"begin_checkout": 10},
    "/offers/rjsmgzji/checkout": {"begin_checkout": 8},
    "/thank_you/46bz9tk6": {"purchase": 7},
    "/offers/ktxk9mve/checkout": {"begin_checkout": 6},
    "/offers/jrxwanvo/checkout": {"begin_checkout": 6},
    "/thank_you/rvulzka": {"purchase": 6},
    "/offers/w2pyql2x/checkout": {"begin_checkout": 5},
}

# 365-day organic search: landing path -> sessions
GA4_ORGANIC = {
    "/": 2851, "/login": 831, "/blog/cubo-ai-smart-baby-monitor-review-with-discount": 381,
    "/library": 372, "/the-snooze-social-membership": 288, "/one-on-one-sleep-consultations": 240,
    "/blog/all-about-the-8-10-month-sleep-regression": 169,
    "/blog/babyzen-yoyo-travel-stroller-review-you-can-stop-googling-now-this-is-the-stroller-for-you": 155,
    "/camp-snooze-sleep-coaching": 140, "/author/sally-woods": 138, "/5-12-month-baby-sleep-help": 121,
    "/blog/mystery-of-missing-third-nap-early-rising": 99, "/blog/dr-harvey-karps-5-ss-to-soothe-your-crying-baby": 98,
    "/blog/navigating-split-nights-a-guide-for-parents": 80, "/offers/hbgyz97h/checkout": 74,
    "/5-12-month-baby-sleep-course": 68, "/blog/my-honest-snoo-experience-and-review": 60,
    "/snooze-library": 59, "/4-month-sleep-regression-survival-guide": 56, "/store": 56,
    "/downloads/baby-sleep-guide-5-to-12-months": 51, "/downloadable-free-sleep-guides": 49,
    "/offers/z63s9var/checkout": 48, "/blog/baby-sleep-schedule-wake-windows-vs-clock-schedules": 46,
    "/blog/how-to-manage-your-babys-reflux-and-sleep": 44, "/offers/4zhpsrcs/checkout": 44,
    "/blog/when-to-lower-the-cot-mattress": 42, "/about-sally": 39, "/3-4-month-baby-sleep-help": 35,
    "/snooze-social-terms-and-conditions": 35, "/blog/transitioning-your-baby-from-2-naps-to-1": 34,
    "/toddler-sleep-help": 33, "/blog/should-we-discourage-babys-thumb-and-finger-sucking": 29,
    "/blog/navigating-childcare-and-your-childs-sleep-routine": 28, "/3-4-month-baby-sleep-course": 27,
    "/toddler-toolkit": 27, "/recommended-products": 26, "/products/5-12-month-sleep-training-course": 24,
    "/blog/the-power-of-calm-but-awake-for-babies": 22, "/blog/guide-to-self-settling-sleep-cycles": 18,
    "/newborn-baby-sleep-help": 18, "/blog/glow-dreaming-white-noise-review": 17,
}

# Offer -> downstream marketing page it converts for (conversion attribution).
# Confident mappings from this session's funnel analysis; others left unmapped
# (their conversions still appear in conversion_paths.md but don't inflate a
# marketing page's ConversionProximity).
OFFER_TO_PAGE = {
    "/offers/z63s9var/checkout": "/5-12-month-baby-sleep-course",
    "/thank_you/z63s9var": "/5-12-month-baby-sleep-course",
    "/offers/46bz9tk6/checkout": "/camp-snooze-sleep-coaching",
    "/thank_you/46bz9tk6": "/camp-snooze-sleep-coaching",
}
# /contact generate_lead attributes to /one-on-one-sleep-consultations (lead path)
LEAD_PAGE = "/one-on-one-sleep-consultations"


def norm(path):
    """Canonical path: drop protocol/host, lowercase, strip query, trim trailing /."""
    if not path:
        return ""
    if "://" in path or path.startswith("//"):
        path = urlsplit(path if "://" in path else "https:" + path).path
    path = path.split("?")[0].split("#")[0].lower().rstrip("/")
    return path or "/"


def is_internal(href):
    h = (href or "").lower()
    return ("joinsnooze.com" in h) or ("sleepconcierge.com.au" in h) or h.startswith("/")


# ---------------------------------------------------------------------------
# Load audit pages
# ---------------------------------------------------------------------------
pages = {}
for fn in os.listdir(DATA):
    if not fn.endswith(".json"):
        continue
    if fn in ("links.json", "provenance.json", "kajabi-admin-metadata.json", "url-list.json"):
        continue
    try:
        d = json.load(open(os.path.join(DATA, fn)))
    except Exception:
        continue
    if "path" not in d or "rendered" not in d:
        continue
    pages[fn[:-5]] = d  # key by slug

# Build offer/thank_you conversion totals attributed to marketing pages
conv_to_page = defaultdict(lambda: {"begin_checkout": 0, "purchase": 0, "generate_lead": 0})
for opath, evs in GA4_EVENTS.items():
    target = OFFER_TO_PAGE.get(opath)
    if target:
        for ev, c in evs.items():
            conv_to_page[target][ev] += c
conv_to_page[LEAD_PAGE]["generate_lead"] += GA4_EVENTS.get("/contact", {}).get("generate_lead", 0)


def page_type(path, expected):
    p = path
    if p == "/" or p == "/home":
        return "home"
    if "/offers/" in p or "/checkout" in p or "/thank" in p:
        return "checkout"
    if re.search(r"sleep-course$|sleep-course/?$|-course$", p) or "course" in p and "/products/" not in p:
        return "course"
    if "consultation" in p:
        return "consultation"
    if "camp-snooze" in p:
        return "camp"
    if "-help" in p or "regression-survival" in p or "toddler-toolkit" == p.strip("/"):
        return "age_help"
    if p.startswith("/products/"):
        return "product"
    if p.startswith("/downloads") or "free-sleep-guide" in p or "guide" in p:
        return "lead_magnet"
    if p.startswith("/blog"):
        return "blog"
    if "glossary" in p:
        return "glossary"
    if any(x in p for x in ["privacy", "terms", "/login", "/account", "/password", "/store", "/links"]):
        return "system_legal"
    return "other"


INTENT = {
    "checkout": 1.0, "course": 0.95, "consultation": 0.95, "camp": 0.9,
    "age_help": 0.8, "product": 0.75, "lead_magnet": 0.65, "home": 0.7,
    "glossary": 0.5, "blog": 0.45, "other": 0.4, "system_legal": 0.1,
}

# Issue weights for OpportunityGap (how much a fix matters)
ISSUE_WEIGHTS = {
    "no_jsonld": 3.0, "missing_schema": 3.0, "missing_meta_description": 2.0,
    "missing_title": 2.0, "missing_seo_title": 2.0, "missing_og_image": 1.5,
    "missing_canonical": 1.5, "thin_content": 2.5, "images_missing_alt": 0.5,
    "cwv_outlier": 2.0, "noindex": 1.0,
}


def issue_score(issues, vitals, word_count):
    score = 0.0
    labels = []
    for iss in issues or []:
        key = iss.split(":")[0]
        if key == "images_missing_alt":
            n = int(iss.split(":")[1]) if ":" in iss else 1
            score += min(n, 6) * ISSUE_WEIGHTS["images_missing_alt"]
            labels.append(iss)
        else:
            score += ISSUE_WEIGHTS.get(key, 1.0)
            labels.append(key)
    # thin content heuristic
    if word_count and word_count < 250 and "thin_content" not in labels:
        score += ISSUE_WEIGHTS["thin_content"]
        labels.append("thin_content(<250w)")
    # CWV outlier
    ttfb = _ms(vitals.get("TTFB")) if vitals else None
    lcp = _ms(vitals.get("LCP")) if vitals else None
    if (ttfb and ttfb > 1500) or (lcp and lcp > 2500):
        score += ISSUE_WEIGHTS["cwv_outlier"]
        labels.append(f"cwv_outlier(TTFB={vitals.get('TTFB')},LCP={vitals.get('LCP')})")
    return score, labels


def _ms(v):
    if not v:
        return None
    m = re.match(r"([\d.]+)\s*(ms|s)?", str(v))
    if not m:
        return None
    val = float(m.group(1))
    if m.group(2) == "s":
        val *= 1000
    return val


RC_RE = re.compile(r"review-card", re.I)


def review_card_count(slug):
    """Count `review-card` markers in the captured HTML. A global footer strip
    contributes a constant baseline on every page; pages with their OWN on-page
    proof block exceed that baseline. Returns None if no HTML captured."""
    fp = os.path.join(HTML, slug + ".html")
    if not os.path.exists(fp):
        return None
    try:
        html = open(fp, encoding="utf-8", errors="ignore").read()
    except Exception:
        return None
    return len(RC_RE.findall(html))


# ---------------------------------------------------------------------------
# Build link graph
# ---------------------------------------------------------------------------
edges = []                       # (src_path, dst_path, text, internal)
out_deg = defaultdict(int)
in_deg = defaultdict(int)        # distinct EXTERNAL source pages (self-loops excluded)
in_sources = defaultdict(set)    # set of distinct source pages -> dst
self_loops = defaultdict(int)    # on-page anchor links back to same page
hygiene_rows = []                # links needing rewrite
STALE_TARGETS = {"/sleep-glossary": "/baby-sleep-glossary", "/privacy": "/privacy-policy",
                 "/about": "/", "/snooze-village": None, "/snooze": None}

for slug, d in pages.items():
    src = norm(d["path"])
    links = (d["rendered"].get("links") or [])
    for ln in links:
        href = ln.get("href", "")
        if not is_internal(href):
            continue
        low = href.lower()
        flag = None
        if "sleepconcierge.com.au" in low:
            flag = "old_domain:sleepconcierge.com.au"
        elif re.search(r"https?://joinsnooze\.com(?!\w)", low) and "www." not in low:
            flag = "non_www"
        dst = norm(href)
        if dst in STALE_TARGETS and STALE_TARGETS[dst]:
            flag = flag or f"stale_slug->{STALE_TARGETS[dst]}"
        edges.append((src, dst, (ln.get("text") or "").strip()[:60], True))
        if dst == src:
            self_loops[src] += 1
        else:
            out_deg[src] += 1
            in_sources[dst].add(src)
        if flag:
            hygiene_rows.append((src, href, dst, flag, (ln.get("text") or "").strip()[:60]))

# ---------------------------------------------------------------------------
# Compute PageValue / OpportunityGap / Priority
# ---------------------------------------------------------------------------
W1, W2, W3, W4 = 0.35, 0.20, 0.30, 0.15
max_conv = max([sum(v.values()) for v in conv_to_page.values()] + [1])

rows = []
for slug, d in pages.items():
    path = norm(d["path"])
    r = d["rendered"]
    pv90, s90, eng90, esec90 = GA4_90D.get(path, (0, 0, 0, 0))
    pv365, s365 = GA4_365D.get(path, (0, 0))
    # Traffic: log-scaled blend of 90d sessions (weight .6) and 12mo sessions (.4)
    traffic = 0.6 * math.log1p(s90) + 0.4 * math.log1p(s365 / 4.0)
    ptype = page_type(path, d.get("expected_type"))
    intent = INTENT.get(ptype, 0.4)
    convs = conv_to_page.get(path, {})
    conv_total = sum(convs.values())
    conv_prox = conv_total / max_conv
    # Engagement quality: engaged-rate * log(sec/session); penalise tiny dwell
    eng_rate = (eng90 / s90) if s90 else 0
    sec_per = (esec90 / s90) if s90 else 0
    engq = eng_rate * math.log1p(sec_per)
    org = GA4_ORGANIC.get(path, 0)
    iss_score, iss_labels = issue_score(d.get("issues"), d.get("vitals"), r.get("word_count"))
    rc = review_card_count(slug)
    status = d.get("http_status_final") or d.get("curl_status_final")
    gated = any("login_gated" in x or "redirect_302" in x for x in (d.get("issues") or []))
    actionable = "yes" if (str(status) == "200" and not gated) else "no"
    rows.append({
        "slug": slug, "path": path, "type": ptype, "actionable": actionable,
        "status": status,
        "views_90d": pv90, "sessions_90d": s90, "sessions_365d": s365,
        "organic_365d": org, "engaged_rate_90d": round(eng_rate, 2),
        "sec_per_session_90d": round(sec_per, 1),
        "begin_checkout": convs.get("begin_checkout", 0),
        "purchase": convs.get("purchase", 0), "generate_lead": convs.get("generate_lead", 0),
        "word_count": r.get("word_count", 0), "jsonld_types": ",".join(r.get("jsonld_types") or []),
        "missing_meta_desc": int(not r.get("meta_description")),
        "missing_og_image": int(not (r.get("og") or {}).get("og:image")),
        "images_missing_alt": r.get("images_missing_alt", 0),
        "_rc": rc, "has_proof": "",  # filled after baseline is known
        "issues": ";".join(iss_labels),
        "_traffic": traffic, "_intent": intent, "_convprox": conv_prox, "_engq": engq,
        "_oppscore": iss_score,
    })

# Normalise component scores to 0-100 then combine
def norm_col(rows, key, scale=100):
    vals = [r[key] for r in rows]
    lo, hi = min(vals), max(vals)
    for r in rows:
        r[key + "_n"] = 0.0 if hi == lo else (r[key] - lo) / (hi - lo) * scale

for k in ("_traffic", "_intent", "_convprox", "_engq", "_oppscore"):
    norm_col(rows, k)

# Footer baseline = the MODE review-card count (the global footer "transformation
# reviews" strip that recurs site-wide). Pages above it carry their own on-page
# proof block; pages at it are footer-only; pages below (0) have no proof at all
# (custom landing pages with the footer stripped) and are prime injection targets.
from collections import Counter as _Counter
_rc_dist = _Counter(r["_rc"] for r in rows if r["_rc"] is not None)
RC_BASELINE = _rc_dist.most_common(1)[0][0] if _rc_dist else 0
for r in rows:
    rc = r["_rc"]
    if rc is None:
        r["has_proof"] = ""
    elif rc > RC_BASELINE:
        r["has_proof"] = "yes"        # own on-page proof block
    elif rc == RC_BASELINE:
        r["has_proof"] = "footer_only"
    else:
        r["has_proof"] = "none"       # no footer strip and no own block
    r["review_cards_above_footer"] = "" if rc is None else max(0, rc - RC_BASELINE)

for r in rows:
    r["PageValue"] = round(
        W1 * r["_traffic_n"] + W2 * r["_intent_n"] + W3 * r["_convprox_n"] + W4 * r["_engq_n"], 1)
    r["OpportunityGap"] = round(r["_oppscore_n"], 1)
    r["Priority"] = round(r["PageValue"] * r["OpportunityGap"] / 100.0, 1)

rows.sort(key=lambda r: r["Priority"], reverse=True)

# ---------------------------------------------------------------------------
# Write outputs
# ---------------------------------------------------------------------------
COLS = ["Priority", "PageValue", "OpportunityGap", "actionable", "path", "type", "status",
        "views_90d", "sessions_90d", "sessions_365d", "organic_365d",
        "begin_checkout", "purchase", "generate_lead",
        "engaged_rate_90d", "sec_per_session_90d", "word_count",
        "jsonld_types", "missing_meta_desc", "missing_og_image",
        "images_missing_alt", "has_proof", "issues", "slug"]
with open(os.path.join(OUT, "page_value_ranking.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=COLS, extrasaction="ignore")
    w.writeheader()
    w.writerows(rows)

with open(os.path.join(OUT, "link_graph_edges.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["src", "dst", "anchor", "internal"])
    w.writerows(edges)

# Link graph summary, audit pages only
audit_paths = {norm(d["path"]) for d in pages.values()}
for p, s in in_sources.items():
    in_deg[p] = len(s)
with open(os.path.join(OUT, "link_graph_summary.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["path", "inbound_distinct_pages", "out_degree", "self_anchor_links",
                "in_audit", "note"])
    allp = set(out_deg) | set(in_deg) | set(self_loops)
    srows = []
    for p in allp:
        note = ""
        if out_deg[p] >= 20 and in_deg[p] <= 2:
            note = "hub with few inbound links (link INTO it)"
        elif in_deg[p] == 0:
            note = "orphan: no other page links here"
        srows.append((p, in_deg[p], out_deg[p], self_loops.get(p, 0),
                      "yes" if p in audit_paths else "no", note))
    srows.sort(key=lambda x: (-x[1], -x[2]))
    w.writerows(srows)

with open(os.path.join(OUT, "link_hygiene_issues.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["source_page", "raw_href", "normalised", "flag", "anchor"])
    w.writerows(sorted(hygiene_rows))

# Social-proof coverage. Targets = high-traffic public pages that lack their OWN
# on-page proof block (has_proof in none/footer_only).
sp = [r for r in rows if r["type"] not in ("system_legal", "checkout")
      and r["has_proof"] != "" and r["actionable"] == "yes"]
sp.sort(key=lambda r: (r["has_proof"] == "yes", -r["sessions_90d"]))
with open(os.path.join(OUT, "social_proof_coverage.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["path", "type", "sessions_90d", "sessions_365d", "organic_365d",
                "has_proof", "injection_priority"])
    for r in sp:
        lacks = r["has_proof"] in ("none", "footer_only")
        pri = "HIGH" if (lacks and r["sessions_90d"] >= 60) else \
              ("MED" if lacks and r["sessions_365d"] >= 150 else "low")
        w.writerow([r["path"], r["type"], r["sessions_90d"], r["sessions_365d"],
                    r["organic_365d"], r["has_proof"], pri])

# Organic pages joined to audit
with open(os.path.join(OUT, "organic_pages.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["path", "organic_sessions_365d", "in_audit", "type", "jsonld_types", "word_count", "issues"])
    by_path = {r["path"]: r for r in rows}
    for p, s in sorted(GA4_ORGANIC.items(), key=lambda x: -x[1]):
        np_ = norm(p)
        r = by_path.get(np_)
        if r:
            w.writerow([np_, s, "yes", r["type"], r["jsonld_types"], r["word_count"], r["issues"]])
        else:
            w.writerow([np_, s, "no", page_type(np_, None), "", "", "(no audit row)"])

# Conversion-path narrative
with open(os.path.join(OUT, "conversion_paths.md"), "w") as f:
    f.write("# Conversion-path map (GA4 key events, last 90 days)\n\n")
    f.write("Source: GA4 property 401774815, pulled 2026-06-09.\n\n")
    f.write("## Raw key-event volume by page\n\n| Page | event | count |\n|---|---|---|\n")
    flat = sorted(((p, e, c) for p, evs in GA4_EVENTS.items() for e, c in evs.items()),
                  key=lambda x: -x[2])
    for p, e, c in flat:
        f.write(f"| {p} | {e} | {c} |\n")
    f.write("\n## Attributed to marketing pages\n\n")
    f.write("| Marketing page | begin_checkout | purchase | generate_lead |\n|---|---|---|---|\n")
    for p, v in sorted(conv_to_page.items(), key=lambda x: -sum(x[1].values())):
        if sum(v.values()):
            f.write(f"| {p} | {v['begin_checkout']} | {v['purchase']} | {v['generate_lead']} |\n")
    f.write("\n**Money feeders (target social proof + CTA here first):** "
            "the `z63s9VaR` offer (5-12 month course) dominates with 337 begin_checkout / 45 purchase; "
            "Camp Snooze (`46Bz9tk6`) 90 / 7; consultation leads via `/contact` 156 generate_lead.\n")

# ---------------------------------------------------------------------------
# Wave 1 worklists (manual/admin work that is not a git edit)
# ---------------------------------------------------------------------------
# Metadata worklist: SEO title/description/social-image gaps from Kajabi admin
# export, joined to the ranking, sorted by PageValue (admin-side fixes).
meta_fp = os.path.join(DATA, "kajabi-admin-metadata.json")
if os.path.exists(meta_fp):
    admin = json.load(open(meta_fp))
    by_path = {r["path"]: r for r in rows}
    mw = []
    for m in admin:
        p = norm(m.get("slug")) if m.get("slug") else ""
        r = by_path.get(p)
        gaps = []
        if not (m.get("seo_title") or "").strip():
            gaps.append("seo_title")
        if not (m.get("seo_description") or "").strip():
            gaps.append("seo_description")
        if not (m.get("social_image") or "").strip():
            gaps.append("social_image")
        if gaps:
            mw.append({"PageValue": r["PageValue"] if r else 0.0,
                       "Priority": r["Priority"] if r else 0.0,
                       "path": p or f"({m.get('kind','')} {m.get('page_id','')})",
                       "page_id": m.get("page_id"), "kind": m.get("kind"),
                       "publish_state": m.get("publish_state"), "missing": ";".join(gaps),
                       "internal_title": m.get("internal_title")})
    mw.sort(key=lambda x: (-x["PageValue"], -x["Priority"]))
    with open(os.path.join(OUT, "METADATA-WORKLIST.csv"), "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["PageValue", "Priority", "path", "page_id",
                                          "kind", "publish_state", "missing", "internal_title"])
        w.writeheader()
        w.writerows(mw)

# CMS hygiene worklist: old-domain navigation links that live in CMS-only content
# (blog post bodies etc.), with no repo source to edit. mailto/tel deliberately
# excluded (legal-page contact emails on sleepconcierge.com.au stay as-is).
SLUG_FIX = {"/about": "/", "/sleep-glossary": "/baby-sleep-glossary",
            "/product/5-12-month-baby-sleep-guide": "/5-12-month-baby-sleep-course",
            "/product/catnapping-guide-free": "/downloads/catnapping-guide"}
cms = []
for src, raw, dst, flag, anchor in hygiene_rows:
    if "old_domain" not in flag or raw.lower().startswith(("mailto:", "tel:")):
        continue
    tail = re.sub(r"^https?://(www\.)?sleepconcierge\.com\.au", "", raw, flags=re.I)
    key = (tail.split("#")[0].rstrip("/") or "/").lower()
    if key in SLUG_FIX:
        target, note = "https://www.joinsnooze.com" + SLUG_FIX[key], "SLUG CHANGED on new domain - verify"
    else:
        target, note = "https://www.joinsnooze.com" + tail, ""
    cms.append((src, raw, target, note))
seen = set()
with open(os.path.join(OUT, "CMS-HYGIENE-WORKLIST.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["source_page", "old_link", "suggested_target", "note"])
    for row in sorted(cms):
        if row[:2] in seen:
            continue
        seen.add(row[:2])
        w.writerow(row)

# Console summary
print(f"Pages analysed: {len(rows)}")
print(f"Internal edges: {len(edges)} | hygiene issues: {len(hygiene_rows)}")
act = [r for r in rows if r["actionable"] == "yes"]
print(f"Actionable (public, 200, not login-gated): {len(act)} of {len(rows)}")
print("\nTop 20 ACTIONABLE by Priority (PageValue x OpportunityGap):")
print(f"{'Pri':>5} {'PV':>5} {'Gap':>5}  {'type':<13} {'s90':>4} {'s365':>5}  path")
for r in act[:20]:
    print(f"{r['Priority']:>5} {r['PageValue']:>5} {r['OpportunityGap']:>5}  "
          f"{r['type']:<13} {r['sessions_90d']:>4} {r['sessions_365d']:>5}  {r['path']}  [{r['issues'][:48]}]")
print(f"\nOutputs written to {OUT}/")
