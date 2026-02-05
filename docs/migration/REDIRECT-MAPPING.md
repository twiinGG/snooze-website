# Redirect Mapping - Cloudflare Configuration

**Date:** December 2025  
**Status:** Ready for Implementation  
**Source Domain:** joinsnooze.com  
**Target Domain:** joinsnooze.com

---

## Redirect Strategy

### Blog Posts (36 posts)
**Pattern:** Preserve URL structure where possible

```
joinsnooze.com/blog/[slug] → joinsnooze.com/blog/[slug]
```

**Example Redirects:**
- `joinsnooze.com/blog/4-month-regression-or-progression` → `joinsnooze.com/blog/4-month-regression-or-progression`
- `joinsnooze.com/blog/guide-to-self-settling-sleep-cycles` → `joinsnooze.com/blog/guide-to-self-settling-sleep-cycles`
- `joinsnooze.com/blog/all-about-the-8-10-month-sleep-regression` → `joinsnooze.com/blog/all-about-the-8-10-month-sleep-regression`

**All 36 blog posts:** Use wildcard redirect for `/blog/*`

---

## Age-Specific Landing Pages

```
joinsnooze.com/3-4-month-baby-sleep-help → joinsnooze.com/library
joinsnooze.com/5-12-month-baby-sleep-help → joinsnooze.com/library
joinsnooze.com/newborn-baby-sleep-help → joinsnooze.com/library
joinsnooze.com/toddler-sleep-help → joinsnooze.com/library
```

---

## Product Pages

```
joinsnooze.com/product/* → joinsnooze.com/library
```

**Specific Products:**
- `joinsnooze.com/product/5-12-Month-Baby-Sleep-Guide` → `joinsnooze.com/library`
- `joinsnooze.com/product/catnapping-guide-free` → `joinsnooze.com/library`
- `joinsnooze.com/product/downloadable-sleep-guide-fourth-trimester` → `joinsnooze.com/library`

---

## Homepage & Main Pages

```
joinsnooze.com/ → joinsnooze.com/
joinsnooze.com/snooze → joinsnooze.com/
joinsnooze.com/snooze-library → joinsnooze.com/library
joinsnooze.com/snooze-waitlist → joinsnooze.com/
```

---

## Cloudflare Page Rules Configuration

### Rule 1: Blog Posts (Wildcard)
**URL Pattern:** `joinsnooze.com/blog/*`  
**Action:** Forwarding URL (301 Permanent Redirect)  
**Destination:** `https://joinsnooze.com/blog/$1`

### Rule 2: Age-Specific Pages
**URL Pattern:** `joinsnooze.com/*-*-month-baby-sleep-help`  
**Action:** Forwarding URL (301 Permanent Redirect)  
**Destination:** `https://joinsnooze.com/library`

### Rule 3: Product Pages
**URL Pattern:** `joinsnooze.com/product/*`  
**Action:** Forwarding URL (301 Permanent Redirect)  
**Destination:** `https://joinsnooze.com/library`

### Rule 4: Snooze Pages
**URL Pattern:** `joinsnooze.com/snooze*`  
**Action:** Forwarding URL (301 Permanent Redirect)  
**Destination:** `https://joinsnooze.com/` (or specific page)

### Rule 5: Homepage & Catch-All
**URL Pattern:** `joinsnooze.com/*`  
**Action:** Forwarding URL (301 Permanent Redirect)  
**Destination:** `https://joinsnooze.com/`

**Note:** Order matters - more specific rules first, catch-all last

---

## Implementation Checklist

- [ ] Add `joinsnooze.com` to Cloudflare
- [ ] Configure DNS (point to Cloudflare)
- [ ] Set up Page Rules (in order of specificity)
- [ ] Test all redirects
- [ ] Verify 301 status codes
- [ ] Check query parameter preservation
- [ ] Monitor 404 errors post-launch

---

## Testing

**Test URLs:**
1. `joinsnooze.com/blog/4-month-regression-or-progression` → Should redirect to `joinsnooze.com/blog/4-month-regression-or-progression`
2. `joinsnooze.com/3-4-month-baby-sleep-help` → Should redirect to `joinsnooze.com/library`
3. `joinsnooze.com/` → Should redirect to `joinsnooze.com/`

**Tools:**
- `curl -I [URL]` to check status code
- Browser redirect checker
- Google Search Console (after launch)

