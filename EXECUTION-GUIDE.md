# Archived Snooze Website Execution Guide

**Purpose:** Complete guide for executing all remaining phases in a new development session.

**Last Updated:** January 2025  
**Status:** ARCHIVED — January 2025 execution history; do not use as current deployment authority

> Current authority is `kajabi-deployment/PASTE-MAP.md` plus `docs/DEPLOYMENT-CHECKLIST.md`.
> The custom navigation and archived deployment-guide instructions below are retired; the live site
> uses Kajabi's native Header under PASTE-MAP A6/A7.

---

## Holistic Site Transformation Plan ⭐ NEW

**NEW:** Comprehensive site-wide execution plan that addresses all core pages holistically.

- **Full Plan:** `docs/HOLISTIC-SITE-TRANSFORMATION-PLAN.md` - Complete transformation plan
- **Executive Summary:** `docs/HOLISTIC-EXECUTION-SUMMARY.md` - Quick reference

**Approach:** Site-wide holistic transformation focusing on core pages that make the Snooze transformation great.

---

## Quick Start Prompt

**Copy this prompt to start a new session:**

```
I'm continuing work on the Snooze Website project. Please review the complete implementation plan and execute all remaining phases.

**Project Location:** `projects/snooze-website/`

**Key Documents:**
- Main Plan: `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md` (Phases 1-15)
- Plans Index: `docs/planning/PLANS-INDEX.md`
- Content Process: `docs/content/CONTENT-GENERATION-PROCESS.md`
- Tone of Voice: `docs/strategy/SNOOZE-TONE-OF-VOICE.md` (root level)
- **Pricing Strategy:** `docs/strategy/SNOOZE-PRICING-STRATEGY.md` ⭐ **Source of truth for all pricing**
- **URL Reference:** `docs/technical/URL-REFERENCE.md` ⭐ **CRITICAL - Use actual URLs**
- Project README: `projects/snooze-website/README.md`

**Critical Requirements:**
1. ALL content must follow Tone of Voice guide (`docs/strategy/SNOOZE-TONE-OF-VOICE.md`) and use Gemini 3 Pro API via `scripts/generate_website_content.py`
2. **URL Usage:** ALWAYS use actual URLs from `docs/technical/URL-REFERENCE.md` - NEVER use placeholder URLs
3. **Checkout URL:** `https://joinsnooze.com/offers/6iRarwak/checkout` - standardize ALL non-member CTAs to this URL
4. **Images:** All images must be uploaded to Kajabi first OR use existing site image URLs - never use placeholders
5. Three user classes: new visitor, logged-in non-member, Snooze member - each needs appropriate CTAs
6. Premium experience throughout with clear signposting fallback if user detection fails
7. User detection is optional - if Kajabi API doesn't work, use signposting (show all options with clear labels)

**Current Status:**
- Planning: ✅ Complete
- Phase 1 (Navigation System): ✅ Complete (December 3, 2025)
- Phase 2 (Landing Page Harmonization): ✅ Complete (December 4, 2025) - Branding integrated, pricing strategy implemented
- Implementation: ⏳ Ready for Phase 3 (Age-Specific Pages)

**Execution Order:**
1. Phase 1-10: Connected Experience MVP (current focus)
2. Phase 11-15: Domain Migration (after MVP complete and tested)

**Related Projects:**
- Landing page: `kajabi-deployment/pages/landing-page-blocks.html`
- Library page: `kajabi-deployment/pages/library-page/`
- Courses & Guides: `projects/kajabi-courses/courses/` ⭐ (moved December 06, 2025)
  - Snooze Method: `projects/kajabi-courses/courses/snooze-method/`
  - Toddler Toolkit: `projects/kajabi-courses/courses/toddler-toolkit/`
  - 5-12 Month Guide: `projects/kajabi-courses/courses/5-12-month-course/`
  - Newborn Guide: `projects/kajabi-courses/courses/newborn-guide/`

**Continue Phase 2: Complete Landing Page Harmonization**

**Next Action:** Integrate pricing strategy into landing page

Please:
1. Review pricing strategy: `docs/strategy/SNOOZE-PRICING-STRATEGY.md` ⭐ **CRITICAL - Use for all pricing**
2. Review the complete plan in `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md`
3. Review URL reference: `docs/technical/URL-REFERENCE.md` - ALWAYS use actual URLs, never placeholders
4. Review developer checklist: `docs/DEVELOPER-URL-CHECKLIST.md` - Verify all URLs before deployment
5. Update landing page with pricing strategy:
   - Integrate individual course pricing ($27-$37 mini modules, $117-$129 courses)
   - Update consultation pricing references ($445 Launch / $525 BAU member rates)
   - Add price anchoring messaging
   - Update value comparison sections
6. Use content generation script for all copy
7. Follow Tone of Voice guide for all content
8. **CRITICAL:** Find and enter any missing URLs during development - never use placeholder URLs
```

---

## Complete Context Checklist

### ✅ Documented and Available

**Planning & Strategy:**
- ✅ Complete implementation plan (15 phases)
- ✅ User classes and journeys defined
- ✅ Site architecture documented
- ✅ Homepage specifications
- ✅ Related plans indexed

**Content Generation:**
- ✅ Tone of Voice guide location
- ✅ Gemini 3 Pro integration process
- ✅ Content generation script ready
- ✅ Knowledge base query patterns

**Technical Details:**
- ✅ Checkout URL: `/offers/6iRarwak/checkout`
- ✅ Kajabi integration points documented
- ✅ Page inventory complete
- ✅ Migration checklist ready

**Integration Points:**
- ✅ Landing page project location
- ✅ Library page structure
- ✅ Related projects documented
- ✅ Strategy documents referenced

**Requirements:**
- ✅ Environment variables documented
- ✅ Dependencies listed
- ✅ Success criteria defined
- ✅ Testing procedures outlined

---

## Critical Information Summary

### Key URLs
**⚠️ CRITICAL:** Always reference `docs/technical/URL-REFERENCE.md` for complete URL list. Never use placeholder URLs.

**Primary URLs:**
- **Checkout:** `https://joinsnooze.com/offers/6iRarwak/checkout` (Snooze Founding Member Offer - PRIMARY)
- **Current Domain:** `joinsnooze.com`
- **New Domain:** `joinsnooze.com` (after migration)
- **Library:** `https://joinsnooze.com/products/communities/v2/snooze/library`
- **Community:** `https://joinsnooze.com/products/communities/v2/snooze`

**Complete Reference:** See `docs/technical/URL-REFERENCE.md` for all courses, guides, offers, and pages.

### User Classes
1. **New Visitor:** Not logged in → Drive to checkout
2. **Logged-In Non-Member:** Has account, no Snooze → Show teaser, upgrade CTA
3. **Snooze Member:** Active membership → Full access, Library, Village

### Content Standards
- **Tone of Voice:** Must follow `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- **Generation:** Use `scripts/generate_website_content.py` with Gemini 3 Pro
- **Review:** Always check against Tone of Voice checklist
- **No AI Patterns:** Avoid em dashes, contrast statements, "solution/solutions"
- **Language:** Use "I would" / "I like to" (not "you should")
- **Permission:** Include "You can" / "You don't have to"

### Implementation Approach
- **User Detection:** Attempt Kajabi API, fallback to signposting
- **Premium Experience:** Polished, professional throughout
- **Signposting:** Clear labels if detection fails
- **CTAs:** All point to `/offers/6iRarwak/checkout` (for non-members)
- **JavaScript Variable:** Use `window.SNOOZE_CHECKOUT_URL` for easy updates

---

## Phase-by-Phase Execution

### Phase 1: Navigation System
**Status:** ✅ Complete (December 3, 2025)  
**Tasks:**
1. ✅ Create context-aware navigation component
2. ✅ Implement user status detection (with fallback)
3. ✅ Create universal footer

**Files Created:**
- `kajabi-deployment/navigation-code-block.html`
- `kajabi-deployment/footer.html`
- `kajabi-deployment/snooze-unified-theme.css` (website pages)
- `kajabi-deployment/snooze-landing-pages.css` (landing pages)
- `kajabi-deployment/js/snooze-globals-site-header.js` (site header JS)

**Historical deployment reference:** `kajabi-deployment/DEPLOYMENT-GUIDE.md` is archived; do not execute it.

### Phase 2: Landing Page Harmonization
**Status:** ✅ Complete (December 4, 2025)  
**Completion Report:** `docs/PHASE-2-COMPLETION-REPORT.md`

**Completed Tasks:**
1. ✅ Update Snooze Main Landing Page
2. ✅ Add Library preview section
3. ✅ Update navigation on landing page
4. ✅ Standardize checkout URLs
5. ✅ Integrate pricing strategy into landing page
   - Updated value comparison table with new pricing ($117 courses, $27-$37 mini modules)
   - Updated consultation pricing references ($445 Launch / $525 BAU member rates)
   - Added price anchoring section comparing individual courses to membership
   - Updated age stages section with individual course pricing
   - Added "no-brainer" messaging: "For just $30 more than a single course, you get everything"
6. ✅ Integrate official Snooze branding assets
   - SVG logotype integrated into navigation header
   - Custom site header updated with official logo
   - Branding assets documented in `docs/branding/BRANDING-ASSETS-REFERENCE.md`
7. ✅ Resolve header system conflicts
   - Custom site header configured as primary display
   - Floating header code preserved for future use
   - CSS conflicts resolved with proper specificity

**Files Updated:**
- `kajabi-deployment/landing-page/kajabi-html-blocks.html` - Logo, pricing, checkout URL
- `kajabi-deployment/landing-page/kajabi-custom-css.css` - SVG logo styling, header controls
- `projects/snooze-website/kajabi-deployment/navigation-code-block.html` - Custom header logo
- `projects/snooze-website/kajabi-deployment/phase1-navigation-footer.css` - Custom header logo styling
- `docs/branding/BRANDING-ASSETS-REFERENCE.md` - New branding documentation

**References:**
- `docs/strategy/SNOOZE-PRICING-STRATEGY.md` - Source of truth for all pricing
- `docs/branding/BRANDING-ASSETS-REFERENCE.md` - Branding asset guidelines

### Phase 3: Age-Specific Pages
**Status:** Ready to start  
**Pages:** 4 age-specific pages
- Newborn Sleep Help (0-3 Months)
- 3-4 Month Baby Sleep Help
- 5-12 Month Baby Sleep Help
- Toddler Sleep Help (12 Months+)

**Updates:**
- Add universal navigation header
- Add context-aware CTAs with fallback signposting
- Add "What's in Snooze" section
- Add value comparison
- Cross-link between age pages

### Phase 4: Product/Course Landing Pages
**Status:** Ready to start  
**Pages:** 3 course landing pages
- 3-4 Month Course Landing Page
- 5-12 Month Guide Landing Page
- Newborn Sleep Guide Landing Page

**Updates:**
- Add universal navigation
- Add prominent Snooze membership CTA
- Show value: "This course + everything else in Snooze"
- Create product comparison section

### Phase 5: Snooze Library Page
**Status:** Ready to start  
**File:** `kajabi-deployment/pages/library-page/section-01-title.html`

**Updates:**
- Add context-aware Library access (with prompts)
- Create premium teaser content for non-members
- Add navigation to Library page
- Clear messaging: "You must have purchased resources individually or hold a Snooze Membership"

### Phase 6: System Login Page
**Status:** Ready to start  
**Location:** Kajabi Settings → Website → Login page

**Updates:**
- Add premium messaging: "Login to access your Snooze resources"
- Add callout box with clear access requirements
- Link to Snooze Founding Member Offer for non-members

### Phase 7: The Snooze Method Page
**Status:** Partially complete (file exists, needs updates)  
**File:** `kajabi-deployment/the-snooze-method.html`

**Updates:**
- Add universal navigation
- Link to foundational course in Library
- Context-aware CTAs with fallback signposting
- Show three-tiered learning path

### Phase 8: Checkout URL Standardization
**Status:** Ready to start  
**Task:** Update all CTAs to `/offers/6iRarwak/checkout`

**Files to Update:**
- Landing page HTML blocks
- Age-specific pages
- Course landing pages
- Library page
- The Snooze Method page
- Navigation component

**Method:** Use JavaScript variable:
```javascript
window.SNOOZE_CHECKOUT_URL = 'https://joinsnooze.com/offers/6iRarwak/checkout';
```

**Document:** Create `docs/CHECKOUT-ENTRY-POINTS.md` to track all checkout entry points

### Phase 9: Cross-Page Linking
**Status:** Ready to start  
**Tasks:**
1. Create internal linking map
2. Implement breadcrumb navigation

**Files to Create:**
- `docs/INTERNAL-LINKING-MAP.md`

### Phase 10: Testing & Validation
**Status:** Ready to start  
**Tasks:**
1. Test user journeys (8 test cases)
2. Verify context-aware CTAs & signposting

**Test Cases:**
1. New visitor lands on age page → Can navigate to checkout
2. New visitor lands on landing page → Can navigate to Library preview → Checkout
3. New visitor sees Library → Clear prompts to login/join
4. Logged-in non-member → Sees Library teaser → Upgrade CTA works
5. Snooze member → Can access full Library → Can navigate to Village
6. All pages have consistent navigation
7. All CTAs point to correct checkout URL
8. Login page shows clear access requirements

### Phase 11-15: Domain Migration
**Status:** Planned (after MVP)  
**See:** `docs/migration/KAJABI-MIGRATION-CHECKLIST.md`

**Overview:**
- Pre-migration preparation
- Cloudflare redirect setup
- Kajabi domain configuration
- Content migration (36 blog posts)
- Post-migration testing & monitoring

---

## Content Generation Workflow

### For Every Piece of Content

1. **Define Requirements**
   - Content type (CTA, headline, value prop, etc.)
   - User context (new-visitor, logged-in-non-member, snooze-member)
   - Page location

2. **Generate Content**
   ```bash
   cd projects/snooze-website
   python3 scripts/generate_website_content.py \
     --content-type "landing-page-cta" \
     --context "new-visitor" \
     --page "snooze-main-landing" \
     --output-file "kajabi-deployment/cta-new-visitor.html"
   ```

3. **Review Against Tone of Voice**
   - Check language patterns
   - Verify no AI-generated patterns
   - Ensure authentic Sally voice
   - Review checklist in `docs/content/CONTENT-GENERATION-PROCESS.md`

4. **Refine and Deploy**
   - Make any necessary adjustments
   - Add to Kajabi deployment files
   - Test on live site

---

## Verification Checklist

Before starting, verify:

- [ ] Environment variables set in root `.env`:
  - `GEMINI_API_KEY`
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
- [ ] Python dependencies installed:
  - `google-generativeai`
  - `supabase`
  - `python-dotenv`
- [ ] Content generation script tested
- [ ] Tone of Voice guide accessible: `docs/strategy/SNOOZE-TONE-OF-VOICE.md`
- [ ] Plan document reviewed: `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md`
- [ ] Related projects understood:
  - Landing page: `kajabi-deployment/landing-page/`
  - Content consultant: `projects/brand-content-consultant/`
- [ ] Kajabi access confirmed
- [ ] Checkout URL verified: `/offers/6iRarwak/checkout`

---

## Troubleshooting

### If Content Generation Fails
- Check `GEMINI_API_KEY` is set in root `.env`
- Verify Supabase credentials
- Test script with simple example:
  ```bash
  python3 scripts/generate_website_content.py \
    --content-type "navigation-label" \
    --context "new-visitor" \
    --output-file "test-output.txt"
  ```
- Check Tone of Voice guide path: `docs/strategy/SNOOZE-TONE-OF-VOICE.md`

### If User Detection Doesn't Work
- **This is expected** - use signposting fallback (documented in plan)
- Show all navigation options with clear labels
- Test with different user states
- Ensure fallback messaging is clear and premium

### If Files Not Found
- Check related projects:
  - Landing page: `kajabi-deployment/landing-page/`
  - Library: `kajabi-deployment/pages/library-page/`
- Verify file paths in plan document
- Review `PROJECT-STRUCTURE.md` for complete file listing

### If URLs Are Missing
- **NEVER use placeholder URLs** - always find the actual URL
- Check `docs/technical/URL-REFERENCE.md` first
- Search existing site: `https://joinsnooze.com`
- Check Kajabi backend for correct URLs
- Check sitemap for all available pages
- If URL can't be found, document as blocker and ask for clarification
- **Images:** Must be uploaded to Kajabi first OR use existing site image URLs

### If Kajabi Integration Issues
- Check Kajabi page inventory: `docs/migration/KAJABI-PAGE-INVENTORY.md`
- Review migration checklist: `docs/migration/KAJABI-MIGRATION-CHECKLIST.md`
- Verify system vs custom page distinction
- Check Kajabi deployment guide: `kajabi-deployment/README.md`

---

## Success Criteria Reminder

**Connected Experience MVP:**
- [ ] New visitors can navigate from any page to checkout
- [ ] Logged-in non-members see appropriate teasers and upgrade CTAs
- [ ] Snooze members can easily access Library, Village, and resources
- [ ] All pages have consistent navigation and branding
- [ ] Landing page harmonizes with Library, Method, and Toolkit
- [ ] All CTAs point to correct checkout URL (`/offers/6iRarwak/checkout`)
- [ ] Premium experience throughout
- [ ] Clear signposting if user detection fails
- [ ] Login page clearly explains access requirements

**Domain Migration (Future):**
- [ ] All content migrated to new domain
- [ ] SEO value preserved (301 redirects)
- [ ] All internal links updated
- [ ] Analytics configured
- [ ] No broken links or 404s

---

## Recommended Execution Flow

### Session 1: Setup & Phase 1-2
1. Review all documentation
2. Set up environment (verify API keys)
3. Test content generation script
4. Implement Phase 1: Navigation System
5. Implement Phase 2: Landing Page Harmonization

### Session 2: Phase 3-5
1. Implement Phase 3: Age-Specific Pages
2. Implement Phase 4: Product/Course Pages
3. Implement Phase 5: Library Page Enhancement

### Session 3: Phase 6-8
1. Implement Phase 6: Login Page
2. Implement Phase 7: Method Page
3. Implement Phase 8: Checkout Standardization

### Session 4: Phase 9-10
1. Implement Phase 9: Cross-Page Linking
2. Implement Phase 10: Testing & Validation
3. Fix any issues found

### Session 5: Phase 11-15 (After MVP)
1. Pre-migration preparation
2. Cloudflare redirect setup
3. Domain configuration
4. Content migration
5. Post-migration testing

---

## Quick Reference Links

### Planning
- **Main Plan:** `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md`
- **Plans Index:** `docs/planning/PLANS-INDEX.md`
- **Site Architecture:** `docs/planning/SITE-ARCHITECTURE.md`
- **Homepage Spec:** `docs/planning/HOMEPAGE-SPEC.md`

### Content
- **Content Process:** `docs/content/CONTENT-GENERATION-PROCESS.md`
- **Tone of Voice:** `../../docs/strategy/SNOOZE-TONE-OF-VOICE.md` (root level)
- **Content Script:** `scripts/generate_website_content.py`

### Migration
- **Migration Checklist:** `docs/migration/KAJABI-MIGRATION-CHECKLIST.md`
- **Redirect Mapping:** `docs/migration/REDIRECT-MAPPING.md`
- **Page Inventory:** `docs/migration/KAJABI-PAGE-INVENTORY.md`

### Technical
- **URL Reference:** `docs/technical/URL-REFERENCE.md` ⭐ **CRITICAL - All URLs here**
- **Page Inventory:** `docs/technical/PAGE-INVENTORY.md`
- **Project Structure:** `PROJECT-STRUCTURE.md`
- **Project README:** `README.md`

### Related Projects
- **Landing Page:** `kajabi-deployment/landing-page/`
- **Content Consultant:** `projects/brand-content-consultant/`
- **Strategy Docs:** `docs/strategy/` (root level)

---

## Important Notes

### Kajabi-Specific
- **System Pages:** Share metadata from system settings (Login, 404, etc.)
- **Custom Pages:** Individual SEO control
- **System Library:** Shows purchased products (separate from Snooze Library page)
- **Snooze Library:** Custom page, behind login but accessible to any logged-in user
- **Community URL:** `https://joinsnooze.com/products/communities/v2/snooze`
- **One Primary Domain:** Kajabi only supports one primary domain

### Content Standards
- **Never use:** "solution/solutions" → Use "support", "guidance", "help", "troubleshooting", "strategies"
- **Never use:** Em dashes "—" → Use commas, periods, parentheses
- **Never use:** Contrast statements ("It's not about x, it's about y")
- **Always use:** "I would" / "I like to" (not "you should")
- **Always use:** "You can" / "You don't have to" (permission-giving)
- **Always use:** "Usually" / "Often" (not "always" / "never")

### User Detection
- **Primary:** Attempt Kajabi member detection API
- **Fallback:** Use signposting (show all options with clear labels)
- **If Detection Fails:** This is expected and acceptable - signposting is the fallback strategy

---

## Getting Help

### If Stuck
1. Review the plan document: `docs/planning/CONNECTED-EXPERIENCE-MVP-PLAN.md`
2. Check related projects for examples
3. Review Tone of Voice guide for content standards
4. Check troubleshooting section above

### Key Principles
- **Premium Experience:** Everything should feel polished and professional
- **Clear Signposting:** Users always know their next step
- **Authentic Voice:** All content follows Sally's voice, not AI-generated patterns
- **User-First:** Design for three distinct user classes

---

**All context is documented. Use the Quick Start Prompt above to begin execution in a new session.**
