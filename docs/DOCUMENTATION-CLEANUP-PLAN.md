# Documentation Cleanup Plan

**Date:** December 06, 2025  
**Status:** Phase 1 Complete ✅ - Duplicate Files Removed, Cross-References Updated  
**Purpose:** Identify redundant, outdated, or duplicate documentation files for cleanup

---

## Executive Summary

The `projects/snooze-website/docs/` directory contains **significant duplication** and **outdated files** that should be cleaned up. This analysis identifies:

- **Duplicate files** at root level that also exist in subdirectories
- **Superseded plans** that have been replaced by newer comprehensive plans
- **Outdated landing page documentation** that may no longer be relevant
- **Files that should be archived** vs. deleted

---

## Current State Analysis

### 📊 File Count by Category

- **Root level files:** 13 files
- **Subdirectories:** 3 main directories (planning/, migration/, technical/, content/)
- **Archive directory:** Contains historical summaries and completion reports
- **Landing page directory:** 25+ files (many may be outdated)

---

## Issues Identified

### 1. Duplicate Files (Root vs Subdirectories)

**Files that exist in both root and subdirectories:**

| Root File | Subdirectory File | Recommendation |
|-----------|-------------------|----------------|
| `CONNECTED-EXPERIENCE-MVP-PLAN.md` | `planning/CONNECTED-EXPERIENCE-MVP-PLAN.md` | **Keep subdirectory, remove root** |
| `CONTENT-GENERATION-PROCESS.md` | `content/CONTENT-GENERATION-PROCESS.md` | **Keep subdirectory, remove root** |
| `HOMEPAGE-SPEC.md` | `planning/HOMEPAGE-SPEC.md` | **Keep subdirectory, remove root** |
| `SITE-ARCHITECTURE.md` | `planning/SITE-ARCHITECTURE.md` | **Keep subdirectory, remove root** |
| `KAJABI-MIGRATION-CHECKLIST.md` | `migration/KAJABI-MIGRATION-CHECKLIST.md` | **Keep subdirectory, remove root** |
| `KAJABI-PAGE-INVENTORY.md` | `migration/KAJABI-PAGE-INVENTORY.md` | **Keep subdirectory, remove root** |
| `REDIRECT-MAPPING.md` | `migration/REDIRECT-MAPPING.md` | **Keep subdirectory, remove root** |
| `PAGE-INVENTORY.md` | `technical/PAGE-INVENTORY.md` | **Keep subdirectory, remove root** |

**Action:** Remove all root-level duplicates. Keep organized subdirectory versions.

---

### 2. Superseded Plans

**HOLISTIC-SITE-TRANSFORMATION-PLAN.md** vs **CONNECTED-EXPERIENCE-MVP-PLAN.md**

**Analysis:**
- **HOLISTIC-SITE-TRANSFORMATION-PLAN.md** (December 06, 2025) - **NEWER, MORE COMPREHENSIVE**
  - Site-wide holistic approach
  - Phase 1-6 implementation plan
  - Includes Phase 6 (Individual Product Reintroduction)
  - Data-driven content priorities
  - **Status:** Active, currently referenced

- **CONNECTED-EXPERIENCE-MVP-PLAN.md** (January 2025) - **OLDER, MAY BE SUPERSEDED**
  - Connected Experience MVP (Phases 1-10)
  - Domain Migration (Phases 11-15)
  - **Status:** Still referenced in README and PLANS-INDEX

**Recommendation:**
- **Option A (Conservative):** Keep both, but clearly mark CONNECTED-EXPERIENCE-MVP-PLAN.md as "Legacy - See HOLISTIC-SITE-TRANSFORMATION-PLAN.md for current plan"
- **Option B (Aggressive):** Archive CONNECTED-EXPERIENCE-MVP-PLAN.md if HOLISTIC plan supersedes it
- **Best Approach:** Review both plans to determine if CONNECTED-EXPERIENCE-MVP-PLAN.md contains unique information (domain migration phases 11-15) that isn't in HOLISTIC plan

**Action Required:** Manual review to determine relationship between plans

---

### 3. Landing Page Directory (`landing-page/`)

**Location:** `docs/landing-page/`

**Contents:** 25+ files including:
- Historical summaries (archived)
- Progress reports (archived)
- Review reports (archived)
- Active documentation (unclear which)

**Analysis:**
- Many files appear to be historical/session summaries
- Project structure has changed (landing page consolidated into snooze-website)
- Files may reference old structure

**Recommendation:**
- **Archive directory exists:** `landing-page/archive/` - Move historical files here
- **Active files:** Review each file to determine if still relevant
- **Likely candidates for archiving:**
  - All files in `landing-page/archive/` (already archived)
  - Progress reports and historical summaries
  - Files referencing old project structure

**Action:** Review landing-page/ directory files individually

---

### 4. Files That Should Be Archived

**Files that appear to be historical/session summaries:**

| File | Location | Status | Recommendation |
|------|----------|--------|----------------|
| `COURSE-SAMPLE-SECTIONS-PROJECT.md` | Root | Unknown | Review - may be completed |
| `LANDING-PAGE-LINK-AUDIT.md` | Root | Unknown | Review - may be outdated |
| `BROWSER-DETECTION-STRATEGY.md` | Root | May be active | Review - check if still relevant |

**Files already in archive:**
- ✅ `archive/consolidation-history/` - Historical consolidation docs
- ✅ `archive/phase-reports/` - Phase completion reports
- ✅ `landing-page/archive/` - Landing page historical docs

---

### 5. Active/Current Files (Keep These)

**Core Active Documentation:**

| File | Location | Status | Notes |
|------|----------|--------|-------|
| `HOLISTIC-SITE-TRANSFORMATION-PLAN.md` | Root | ✅ **ACTIVE** | Main execution plan |
| `README.md` | Root | ✅ **ACTIVE** | Documentation index |
| `DEVELOPER-URL-CHECKLIST.md` | Root | ✅ **ACTIVE** | Developer reference |
| `LAUNCH-READINESS-CHECKLIST.md` | Root | ✅ **ACTIVE** | Launch checklist |
| `technical/URL-REFERENCE.md` | technical/ | ✅ **CRITICAL** | URL reference |
| `content/CONTENT-GENERATION-PROCESS.md` | content/ | ✅ **ACTIVE** | Content workflow |
| `content/` data files | content/ | ✅ **ACTIVE** | Data-driven content |

---

## Recommended Cleanup Actions

### Phase 1: Remove Duplicate Files (Safe)

**Action:** Remove root-level duplicates (keep subdirectory versions)

**Files to Remove:**
- `CONNECTED-EXPERIENCE-MVP-PLAN.md` (keep `planning/CONNECTED-EXPERIENCE-MVP-PLAN.md`)
- `CONTENT-GENERATION-PROCESS.md` (keep `content/CONTENT-GENERATION-PROCESS.md`)
- `HOMEPAGE-SPEC.md` (keep `planning/HOMEPAGE-SPEC.md`)
- `SITE-ARCHITECTURE.md` (keep `planning/SITE-ARCHITECTURE.md`)
- `KAJABI-MIGRATION-CHECKLIST.md` (keep `migration/KAJABI-MIGRATION-CHECKLIST.md`)
- `KAJABI-PAGE-INVENTORY.md` (keep `migration/KAJABI-PAGE-INVENTORY.md`)
- `REDIRECT-MAPPING.md` (keep `migration/REDIRECT-MAPPING.md`)
- `PAGE-INVENTORY.md` (keep `technical/PAGE-INVENTORY.md`)

**Impact:** Low risk - files still exist in organized subdirectories

---

### Phase 2: Review Superseded Plans (Requires Manual Review)

**Action:** Determine relationship between:
- `HOLISTIC-SITE-TRANSFORMATION-PLAN.md` (newer)
- `planning/CONNECTED-EXPERIENCE-MVP-PLAN.md` (older)

**Questions to Answer:**
1. Does HOLISTIC plan cover all phases in CONNECTED plan?
2. Does CONNECTED plan contain unique information (domain migration phases)?
3. Are both plans actively used or is one superseded?

**Recommendation:**
- If HOLISTIC plan supersedes CONNECTED plan → Archive CONNECTED plan
- If CONNECTED plan has unique phases → Keep both, clarify relationship
- Update README.md and PLANS-INDEX.md to reflect current plan hierarchy

---

### Phase 3: Review Landing Page Directory (Analysis Complete)

**Action:** Review each file in `docs/landing-page/` to determine:
1. Is it still relevant?
2. Should it be archived?
3. Should it be deleted?

**Analysis Complete:** See `DOCUMENTATION-CLEANUP-PHASE-3-ANALYSIS.md` for detailed file-by-file analysis

**Summary:**
- ✅ **11 Active Files:** Core documentation, technical references, implementation guides
- ⚠️ **16 Files Need Review:** Snooze Method docs (7), Toddler Toolkit docs (7), JSON data files (3)
- ✅ **18 Files Already Archived:** Properly organized in archive subdirectory

**Recommendation:** Manual review required for course-specific documentation (Snooze Method, Toddler Toolkit)

---

### Phase 4: Archive Outdated Files

**Action:** Move historical/session files to archive

**Candidates for Archiving:**
- Session summaries
- Historical progress reports
- Completed project documentation
- Files referencing old project structure

**Archive Structure:**
```
docs/archive/
├── consolidation-history/ (existing)
├── phase-reports/ (existing)
└── session-summaries/ (new - for historical session docs)
```

---

### Phase 5: Update Documentation Index

**Action:** Update `docs/README.md` to reflect cleaned structure

**Updates Needed:**
- Remove references to duplicate files
- Clarify which plan is current (HOLISTIC vs CONNECTED)
- Update file locations (point to subdirectories)
- Remove references to archived files

---

## Cleanup Checklist

### Immediate Actions (Low Risk)

- [x] ✅ **COMPLETE** Remove 8 duplicate root-level files (keep subdirectory versions)
- [x] ✅ **COMPLETE** Update `docs/README.md` to remove duplicate file references and highlight HOLISTIC plan
- [x] ✅ **COMPLETE** Update all cross-references across entire project:
  - ✅ `PROJECT-STRUCTURE.md` - Updated to reference HOLISTIC plan as current
  - ✅ `EXECUTION-GUIDE.md` - Updated all references to HOLISTIC plan
  - ✅ `README.md` - Updated status section and references
  - ✅ `docs/content/CONTENT-GENERATION-PROCESS.md` - Updated reference

### Review Required (Medium Risk)

- [ ] Review relationship between HOLISTIC and CONNECTED plans
- [ ] Determine if CONNECTED plan should be archived or kept
- [ ] Review all files in `landing-page/` directory
- [ ] Review `COURSE-SAMPLE-SECTIONS-PROJECT.md` status
- [ ] Review `LANDING-PAGE-LINK-AUDIT.md` status
- [ ] Review `BROWSER-DETECTION-STRATEGY.md` relevance

### Archive Actions (Low Risk)

- [ ] Move historical session summaries to archive
- [ ] Move completed project docs to archive
- [ ] Organize archive directory structure

---

## Expected Outcomes

### After Cleanup

**Root Level Files (Reduced from 13 to ~5):**
- `HOLISTIC-SITE-TRANSFORMATION-PLAN.md` (main plan)
- `README.md` (documentation index)
- `DEVELOPER-URL-CHECKLIST.md` (developer reference)
- `LAUNCH-READINESS-CHECKLIST.md` (launch checklist)
- `DOCUMENTATION-CLEANUP-PLAN.md` (this file - can be archived after cleanup)

**Organized Structure:**
- All planning docs in `planning/`
- All migration docs in `migration/`
- All technical docs in `technical/`
- All content docs in `content/`
- All archived docs in `archive/`

**Benefits:**
- Clearer file organization
- Easier to find current documentation
- Reduced confusion from duplicates
- Better maintainability

---

## Files to Keep (Final Structure)

### Root Level (Minimal - Only Active Essentials)
- `HOLISTIC-SITE-TRANSFORMATION-PLAN.md` ⭐ **Main execution plan**
- `README.md` ⭐ **Documentation index**
- `DEVELOPER-URL-CHECKLIST.md` ⭐ **Developer reference**
- `LAUNCH-READINESS-CHECKLIST.md` ⭐ **Launch checklist**

### Subdirectories (Organized by Category)
- `planning/` - All planning documents
- `migration/` - All migration documentation
- `technical/` - All technical references
- `content/` - All content generation docs
- `archive/` - All historical/archived docs
- `landing-page/` - Review and clean up (may consolidate into archive)

---

## Next Steps

1. **Review this cleanup plan** with team/stakeholders
2. **Execute Phase 1** (remove duplicates - safe action)
3. **Review Phase 2** (plan relationship - requires manual review)
4. **Review Phase 3** (landing page directory - requires file-by-file review)
5. **Execute Phase 4** (archive outdated files)
6. **Update Phase 5** (update documentation index)

---

**Status:** Ready for Review  
**Priority:** Medium (improves maintainability, reduces confusion)  
**Risk Level:** Low (duplicate removal is safe, other actions require review)

---

**Last Updated:** December 06, 2025

