# Snooze Landing Page - Launch Readiness Checklist

**Date:** December 4, 2025  
**Status:** Not Ready - Critical Pages Missing  
**Goal:** Get core pages live so we can start sending traffic

---

## ✅ What's Working

### Core Pages (Ready to Send Traffic)
- ✅ **Landing Page:** `https://joinsnooze.com/snooze` - **FULLY FUNCTIONAL**
- ✅ **Library Page:** `https://joinsnooze.com/products/communities/v2/snooze/library` - **WORKING**
- ✅ **Checkout Page:** `https://joinsnooze.com/offers/6iRarwak/checkout` - **WORKING**

### Landing Page Features
- ✅ Navigation header with Snooze branding
- ✅ Hero section with CTA
- ✅ Transformation reviews section
- ✅ "What's Inside Snooze" section
- ✅ Age stages section
- ✅ Value comparison
- ✅ Pricing section
- ✅ FAQ section
- ✅ Sticky CTA bar
- ✅ All checkout links route correctly via JavaScript

---

## ❌ Critical Issues (Must Fix Before Launch)

### 1. Age-Specific Pages (ALL 4 PAGES MISSING - 404 ERRORS)

**Impact:** HIGH - These pages are linked from the landing page content. Users clicking these links will hit 404 errors.

**Pages to Create:**
1. **Newborn Sleep Help:** `/newborn-baby-sleep-help` ❌ 404
2. **3-4 Month Baby Sleep Help:** `/3-4-month-baby-sleep-help` ❌ 404
3. **5-12 Month Baby Sleep Help:** `/5-12-month-baby-sleep-help` ❌ 404
4. **Toddler Sleep Help:** `/toddler-sleep-help` ❌ 404

**Solution:**
- Understanding sections are ready in `kajabi-deployment/age-pages/`
- Follow deployment guide in `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md`
- Can deploy minimal versions first (just understanding sections + navigation + CTA)
- Full transformations can happen in background

**Priority:** 🔴 CRITICAL - Must fix before sending traffic

### 2. The Snooze Method Page (EMPTY/NOT ACCESSIBLE)

**URL:** `https://joinsnooze.com/products/the-snooze-method`  
**Status:** Page loads but appears empty  
**Impact:** MEDIUM - Linked from navigation

**Solution:**
- Check Kajabi backend to see if page exists
- If exists, verify it's published
- If doesn't exist, create using `kajabi-deployment/the-snooze-method.html`
- Can be minimal version initially

**Priority:** 🟡 HIGH - Should fix before launch

### 3. About Sally Page (404 ERROR)

**URL:** `https://joinsnooze.com/about-sally`  
**Status:** 404 Error  
**Impact:** LOW - Linked from navigation but not critical for conversion

**Solution Options:**
1. Create page (if content ready)
2. Remove from navigation temporarily
3. Link to existing About page if URL is different

**Priority:** 🟢 MEDIUM - Can be deferred if needed

---

## 🎯 Minimum Viable Launch (What We Need)

### Option 1: Full Launch (Recommended)
- ✅ Landing page (DONE)
- ✅ Library page (DONE)
- ✅ Checkout page (DONE)
- ⏳ Create 4 age-specific pages (MINIMAL VERSIONS OK)
- ⏳ Fix The Snooze Method page
- ⏳ Fix/remove About Sally link

**Timeline:** Can be done quickly if using minimal page versions

### Option 2: Core Launch (Fastest)
- ✅ Landing page (DONE)
- ✅ Library page (DONE)
- ✅ Checkout page (DONE)
- ⏳ Remove age-specific page links temporarily (or make them scroll to landing page sections)
- ⏳ Remove The Snooze Method from navigation temporarily
- ⏳ Remove About Sally from navigation temporarily

**Timeline:** Immediate - can launch today

---

## 📝 Quick Fix Options

### For Age-Specific Pages

**Option A: Create Minimal Pages (Recommended)**
1. Create each page in Kajabi
2. Add navigation component
3. Add understanding section (already ready)
4. Add context-aware CTA
5. Add footer
6. Publish

**Time:** ~30 minutes per page = 2 hours total

**Option B: Temporary Redirect**
- Point age-specific links to landing page with anchor (`#age-stages`)
- Update links after pages are created

**Time:** 5 minutes

### For The Snooze Method Page

**Option A: Create Minimal Page**
- Use existing file: `kajabi-deployment/the-snooze-method.html`
- Add navigation + basic content
- Publish

**Time:** ~30 minutes

**Option B: Remove from Navigation**
- Comment out link in landing page HTML
- Add back after page is ready

**Time:** 2 minutes

### For About Sally Page

**Option A: Remove from Navigation**
- Comment out link in landing page HTML
- Add back after page is ready

**Time:** 2 minutes

---

## 🚀 Recommended Launch Strategy

### Phase 1: Immediate Launch (Today)
1. Remove broken links from navigation:
   - Comment out "The Snooze Method" link
   - Comment out "About Sally" link
2. Update age-specific links to scroll to landing page sections:
   - Change href from `/newborn-baby-sleep-help` to `#age-stages` (or remove)
   - Same for other age links
3. **LAUNCH** - Landing page → Library → Checkout flow is complete

### Phase 2: Quick Fixes (This Week)
1. Create 4 age-specific pages (minimal versions)
2. Create The Snooze Method page (minimal version)
3. Re-enable navigation links
4. Test all links

### Phase 3: Full Transformation (Background)
- Complete full page transformations per holistic plan
- Add all components and sections
- Enhance content

---

## ✅ Pre-Launch Checklist

### Landing Page
- [x] Landing page loads correctly
- [x] Navigation works
- [x] All CTAs route to checkout
- [x] Checkout page works
- [x] Library page accessible
- [ ] All linked pages exist (4 age pages + Snooze Method + About Sally)

### User Journey
- [x] New visitor can navigate: Landing → Checkout
- [x] New visitor can navigate: Landing → Library → Checkout
- [ ] New visitor can navigate: Landing → Age Page → Checkout (BLOCKED - pages don't exist)
- [ ] New visitor can navigate: Landing → Snooze Method → Checkout (BLOCKED - page empty)

### Technical
- [x] Checkout URL is correct: `/offers/6iRarwak/checkout`
- [x] JavaScript checkout handler works
- [x] Mobile responsive
- [x] All images load

---

## 📋 Next Steps

1. **Decide on launch strategy:**
   - Option 1: Full launch (create pages first)
   - Option 2: Core launch (remove broken links, launch today)

2. **If Option 1 (Full Launch):**
   - Create 4 age-specific pages (minimal versions)
   - Create The Snooze Method page
   - Fix About Sally link
   - Test all links
   - Launch

3. **If Option 2 (Core Launch):**
   - Remove broken links from navigation
   - Update age-specific links to scroll anchors
   - Launch immediately
   - Create pages in background

---

**Recommendation:** Option 2 (Core Launch) - Get the landing page live today, create pages this week, then re-enable links.

---

**Last Updated:** December 4, 2025  
**Status:** Ready for decision on launch strategy

