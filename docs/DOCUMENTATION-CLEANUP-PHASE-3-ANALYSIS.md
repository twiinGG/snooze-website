# Documentation Cleanup - Phase 3 Analysis: Landing Page Directory

**Date:** December 06, 2025  
**Status:** Analysis Complete - Ready for Review  
**Purpose:** Analyze `docs/landing-page/` directory to determine which files are still relevant

---

## Directory Overview

**Location:** `projects/snooze-website/docs/landing-page/`  
**Total Files:** 25+ files (excluding archive subdirectory)  
**Archive Files:** 18 files already in `archive/` subdirectory

---

## Analysis Results

### ✅ Active/Current Files (Keep These)

These files appear to be still relevant and actively used:

| File | Status | Reason |
|------|--------|--------|
| `README.md` | ✅ **ACTIVE** | Documentation index for landing page docs |
| `CHANGELOG.md` | ✅ **ACTIVE** | Version history (Last updated: November 7, 2025) |
| `PROJECT-OBJECTIVES.md` | ✅ **ACTIVE** | Project goals and requirements |
| `SNOOZE-TECHNICAL-REFERENCE.md` | ✅ **ACTIVE** | Technical specifications |
| `kajabi-style-guide-settings.md` | ✅ **ACTIVE** | Kajabi theme configuration |
| `MOBILE-APP-FEEL-IMPLEMENTATION.md` | ✅ **ACTIVE** | Mobile UX guidelines |
| `MOBILE-RESPONSIVE-STRATEGY.md` | ✅ **ACTIVE** | Responsive design strategy |
| `LANDING-PAGE-COPY-REVIEW.md` | ✅ **ACTIVE** | Copy review document |
| `LIBRARY-PAGE-LAYOUT.md` | ✅ **ACTIVE** | Library page design reference |
| `LIBRARY-PAGE-STRUCTURE-VISUAL.md` | ✅ **ACTIVE** | Library page structure |
| `RESOURCE-CREATION-BRIEF.md` | ✅ **ACTIVE** | Resource creation guidelines |

### ⚠️ Potentially Outdated Files (Needs Review)

These files may be outdated or superseded:

| File | Status | Notes |
|------|--------|-------|
| `SNOOZE-METHOD-*` files (7 files) | ⚠️ **REVIEW** | Multiple Snooze Method docs - may be consolidated |
| `TODDLER-TOOLKIT-*` files (7 files) | ⚠️ **REVIEW** | Multiple Toddler Toolkit docs - may be consolidated |
| `toddler_toolkit_*.json` (3 files) | ⚠️ **REVIEW** | JSON data files - may be outdated |

### ✅ Already Archived (No Action Needed)

All files in `archive/` subdirectory are already properly archived:
- `archive/historical-summaries/` - 10 files (session summaries)
- `archive/progress-reports/` - 3 files (progress reports)
- `archive/review-reports/` - 6 files (review reports)

---

## File-by-File Analysis

### Core Documentation (Active)

1. **README.md** ✅
   - Documentation index
   - Last updated: November 7, 2025
   - **Action:** Keep

2. **CHANGELOG.md** ✅
   - Version history
   - **Action:** Keep

3. **PROJECT-OBJECTIVES.md** ✅
   - Project goals
   - **Action:** Keep

4. **SNOOZE-TECHNICAL-REFERENCE.md** ✅
   - Technical specs
   - **Action:** Keep

5. **kajabi-style-guide-settings.md** ✅
   - Kajabi configuration
   - **Action:** Keep

### Implementation Guides (Active)

6. **MOBILE-APP-FEEL-IMPLEMENTATION.md** ✅
   - Mobile UX guidelines
   - **Action:** Keep

7. **MOBILE-RESPONSIVE-STRATEGY.md** ✅
   - Responsive strategy
   - **Action:** Keep

8. **LANDING-PAGE-COPY-REVIEW.md** ✅
   - Copy review
   - **Action:** Keep

### Library Page Documentation (Active)

9. **LIBRARY-PAGE-LAYOUT.md** ✅
   - Layout reference
   - **Action:** Keep

10. **LIBRARY-PAGE-STRUCTURE-VISUAL.md** ✅
    - Structure documentation
    - **Action:** Keep

11. **RESOURCE-CREATION-BRIEF.md** ✅
    - Resource guidelines
    - **Action:** Keep

### Snooze Method Documentation (Needs Review)

12. **SNOOZE-METHOD-CONTENT-LINKS.md** ⚠️
    - Content links mapping
    - **Action:** Review if still relevant

13. **SNOOZE-METHOD-GAP-ANALYSIS.md** ⚠️
    - Gap analysis
    - **Action:** Review if gaps have been addressed

14. **SNOOZE-METHOD-ITERATION-ROADMAP.md** ⚠️
    - Iteration roadmap
    - **Action:** Review if roadmap is current

15. **SNOOZE-METHOD-MODULE-INFO.md** ⚠️
    - Module information
    - **Action:** Review if info is current

16. **SNOOZE-METHOD-RESEARCH.md** ⚠️
    - Research documentation
    - **Action:** Review if research is complete/superseded

17. **SNOOZE-METHOD-STRUCTURE.md** ⚠️
    - Structure documentation
    - **Action:** Review if structure matches current implementation

### Toddler Toolkit Documentation (Needs Review)

18. **TODDLER-TOOLKIT-CONTENT-LINKS.md** ⚠️
    - Content links
    - **Action:** Review if links are current

19. **TODDLER-TOOLKIT-MODULE-INFO.md** ⚠️
    - Module information
    - **Action:** Review if info is current

20. **TODDLER-TOOLKIT-PODCAST-EMBEDS-COMPLETE.md** ⚠️
    - Podcast embed documentation
    - **Action:** Review if complete/superseded

21. **TODDLER-TOOLKIT-PROMPT.md** ⚠️
    - Prompt documentation
    - **Action:** Review if prompt is still used

22. **TODDLER-TOOLKIT-RESEARCH.md** ⚠️
    - Research documentation
    - **Action:** Review if research is complete/superseded

23. **TODDLER-TOOLKIT-SCHEDULE-FIXES-APPLIED.md** ⚠️
    - Schedule fixes documentation
    - **Action:** Review if fixes are complete/superseded

24. **TODDLER-TOOLKIT-STRUCTURE.md** ⚠️
    - Structure documentation
    - **Action:** Review if structure matches current implementation

### Data Files (Needs Review)

25. **toddler_toolkit_podcast_episodes.json** ⚠️
    - JSON data file
    - **Action:** Review if data is current or archived

26. **toddler_toolkit_schedule_accuracy_report.md** ⚠️
    - Schedule report
    - **Action:** Review if report is complete/superseded

27. **toddler_toolkit_schedule_extraction.json** ⚠️
    - JSON data file
    - **Action:** Review if data is current or archived

---

## Relationship to Main Project

### Current Status

- **Landing Page Project:** Previously separate, now consolidated into `snooze-website`
- **Main Plan:** `HOLISTIC-SITE-TRANSFORMATION-PLAN.md` references landing page as "Phase 2 Complete"
- **Deployment Files:** Landing page files are in `kajabi-deployment/pages/snooze-home-page-blocks.html`

### Key Questions

1. **Are landing-page docs still maintained separately?**
   - README suggests yes (Last updated: November 7, 2025)
   - But project structure has changed

2. **Do Snooze Method docs belong here?**
   - Snooze Method is a course, not specifically landing page
   - May belong in course documentation

3. **Do Toddler Toolkit docs belong here?**
   - Toddler Toolkit is a course, not specifically landing page
   - May belong in course documentation

---

## Recommendations

### Option A: Minimal Cleanup (Conservative)

**Keep all active files, review potentially outdated ones:**

1. ✅ **Keep all core documentation** (README, CHANGELOG, PROJECT-OBJECTIVES, etc.)
2. ⚠️ **Review Snooze Method files** - Determine if still relevant or should be moved/archived
3. ⚠️ **Review Toddler Toolkit files** - Determine if still relevant or should be moved/archived
4. ⚠️ **Review JSON data files** - Determine if current or should be archived

**Result:** No files deleted, just organized

### Option B: Aggressive Cleanup

**Move course-specific docs to course directories:**

1. ✅ **Keep landing page core docs**
2. 📦 **Move Snooze Method docs** to `kajabi-deployment/courses/snooze-method/docs/` (if exists)
3. 📦 **Move Toddler Toolkit docs** to `kajabi-deployment/courses/toddler-toolkit/docs/` (if exists)
4. 🗄️ **Archive JSON data files** if not actively used

**Result:** Cleaner structure, course docs with courses

### Option C: Archive Everything (Not Recommended)

**Archive entire landing-page directory:**

- Not recommended - many active files still needed
- Would break references

---

## Recommended Approach

**Hybrid Approach:**

1. ✅ **Keep core landing page documentation** (README, CHANGELOG, technical refs, mobile guides)
2. ⚠️ **Review Snooze Method files** - Check if they reference current implementation
3. ⚠️ **Review Toddler Toolkit files** - Check if they reference current implementation
4. 🗄️ **Archive JSON data files** if they're historical (move to `archive/data/`)
5. ✅ **Keep archive subdirectory** as-is (already organized)

---

## Next Steps

1. **Manual Review Required:**
   - Read Snooze Method files to determine if current
   - Read Toddler Toolkit files to determine if current
   - Check if JSON files are actively used

2. **Decision Points:**
   - Should course-specific docs stay here or move to course directories?
   - Are JSON data files historical or actively used?
   - Do all files in landing-page directory still relate to landing page?

3. **Action After Review:**
   - Archive outdated files
   - Move course-specific docs if appropriate
   - Update README if structure changes

---

**Status:** Ready for Manual Review  
**Priority:** Medium (directory is organized but could be cleaner)  
**Risk Level:** Low (no deletion planned, only organization)

---

**Last Updated:** December 06, 2025


