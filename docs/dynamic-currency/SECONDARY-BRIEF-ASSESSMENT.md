# Secondary Brief Assessment

**Date:** December 30, 2025  
**Reviewer:** AI Assistant  
**Status:** Objective Analysis - Pre-Implementation Review

---

## Executive Summary

The secondary brief provides a **more streamlined, automated implementation** compared to the original technical brief. However, it **omits critical GTM tracking integration** that is essential for accurate ROAS measurement. The approach is generally sound but requires integration with the tracking requirements from the original brief.

**Overall Assessment:** ✅ **Good foundation, but incomplete** - Needs GTM integration before deployment.

---

## ✅ Improvements in Secondary Brief

### 1. **Auto-Detection Feature** (New)
- **What:** Timezone-based auto-detection defaults Australian users to AUD
- **Assessment:** ✅ **Excellent UX improvement**
- **Impact:** Reduces friction for Australian users without manual toggle
- **Risk:** Low - Falls back to USD if detection fails

### 2. **Automated UI Injection**
- **What:** Script automatically injects toggle into navigation (desktop & mobile)
- **Assessment:** ✅ **Reduces manual work**
- **Impact:** No need to manually add toggle HTML to each page
- **Risk:** Medium - Depends on consistent navigation selectors (`.navbar .sn-actions`)

### 3. **Simplified Data Attributes**
- **What:** Uses `data-usd="147"` (numbers only) + `data-period-usd="/ 3 months"` (separate)
- **Assessment:** ⚠️ **Simpler but less flexible**
- **Impact:** Easier for content team, but requires more attributes per element
- **Risk:** Low - Works but less flexible than combined format

### 4. **Automatic Link Detection**
- **What:** Scans all `.dynamic-cta` buttons and automatically replaces offer IDs in URLs
- **Assessment:** ✅ **More automated**
- **Impact:** No need for explicit `data-link-usd`/`data-link-aud` attributes
- **Risk:** Medium - Could break if URLs don't follow exact pattern

### 5. **Checkout Page Auto-Detection**
- **What:** Automatically detects checkout pages and injects currency switch link
- **Assessment:** ✅ **Reduces manual work**
- **Impact:** No need to manually add switch link to each checkout page
- **Risk:** Medium - Depends on consistent checkout page structure

### 6. **Cleaner Code Structure**
- **What:** Uses body classes (`currency-mode-aud`) instead of complex inline scripts
- **Assessment:** ✅ **Better maintainability**
- **Impact:** Easier to debug and maintain
- **Risk:** Low

---

## ❌ Critical Issues & Missing Components

### 1. **GTM Tracking Integration - MISSING** 🔴 **CRITICAL**

**Issue:** The secondary brief completely omits GTM integration, which was a **critical requirement** in the original brief.

**Why This Matters:**
- Without proper currency tracking, ROAS data will be **garbage**
- Meta/Google will treat AUD $220 as USD $220 (35% inflation error)
- Purchase events won't include currency codes
- Button click tracking won't know which currency was selected

**What's Missing:**
1. GTM Variable: `CJS - User Currency Preference` (checks localStorage + URL)
2. GTM Variable: `CJS - Dynamic Click Value` (reads `data-usd`/`data-aud` attributes)
3. Purchase event tracking code for Kajabi checkout
4. Integration with existing GTM Tag 86 (price scraper)

**Required Action:** ⚠️ **MUST ADD** before deployment

**Reference:** Original brief Section 4 (lines 419-595)

---

### 2. **Data Attribute Mismatch** ⚠️ **MEDIUM PRIORITY**

**Issue:** Secondary brief uses `data-usd="147"` (numbers only), but GTM tracking code expects `data-usd` to contain the full price string.

**Original Brief Requirement:**
```javascript
// GTM expects this format:
element.getAttribute('data-aud') || '0.00';
```

**Secondary Brief Format:**
```html
data-usd="147"  <!-- Just number -->
data-period-usd="/ 3 months"  <!-- Separate -->
```

**Problem:** GTM variable `CJS - Dynamic Click Value` won't work correctly because:
- It reads `data-aud` attribute expecting a price value
- Secondary brief stores only numbers, not formatted prices
- GTM needs numeric value for `value` parameter

**Required Action:** ⚠️ **NEEDS ALIGNMENT**
- Either update GTM code to parse number + period
- Or change data attributes to include full formatted price

---

### 3. **FOUC Prevention Strategy Difference** ⚠️ **LOW PRIORITY**

**Original Brief:**
- Inline script in `<head>` runs **before DOM ready**
- Uses `document.documentElement.classList.add('currency-aud-selected')`
- More aggressive FOUC prevention

**Secondary Brief:**
- CSS hides elements until `body.currency-loaded` class is added
- Script runs on `DOMContentLoaded` (after DOM ready)
- Less aggressive, could show brief flash on slow connections

**Assessment:** Secondary approach is simpler but slightly less effective for FOUC prevention.

**Required Action:** ⚠️ **CONSIDER** adding inline script in head for better FOUC prevention

---

### 4. **Offer ID Discrepancy** ⚠️ **VERIFY**

**Secondary Brief Shows:**
- Consult Upsell USD: `igbTdRbk`

**Original Brief Shows:**
- Consult Upsell USD: `[TBD]`
- Consult Standalone (Member) USD: `igbTdRbk`

**Issue:** There may be confusion between "Consult Upsell" and "Consult Standalone" offers.

**Required Action:** ⚠️ **VERIFY** correct offer IDs before implementation

---

### 5. **Error Handling Gaps** ⚠️ **LOW PRIORITY**

**Missing:**
- No validation for missing data attributes
- No console warnings for invalid URLs
- No fallback if navigation selectors don't exist
- No handling for localStorage unavailable (Safari private mode)

**Original Brief Required:**
- Log warnings for missing attributes
- Fallback to USD if localStorage unavailable
- URL validation before updating hrefs

**Required Action:** ⚠️ **CONSIDER** adding error handling for production robustness

---

## 📊 Comparison Matrix

| Feature | Original Brief | Secondary Brief | Assessment |
|---------|----------------|-----------------|------------|
| **Auto-Detection** | ❌ No | ✅ Timezone-based | ✅ Improvement |
| **UI Injection** | Manual HTML | ✅ Automatic | ✅ Improvement |
| **Data Attributes** | `data-usd="$147"` | `data-usd="147"` + period | ⚠️ Different format |
| **Link Updates** | Explicit `data-link-*` | ✅ Auto-detect URLs | ✅ More automated |
| **FOUC Prevention** | Inline head script | CSS + DOM ready | ⚠️ Less aggressive |
| **GTM Integration** | ✅ Complete | ❌ Missing | 🔴 **CRITICAL** |
| **Error Handling** | ✅ Comprehensive | ⚠️ Basic | ⚠️ Could improve |
| **Checkout Detection** | Manual placement | ✅ Automatic | ✅ Improvement |

---

## 🎯 Recommended Action Plan

### Phase 1: Critical Fixes (Before Implementation)

1. **Add GTM Integration** 🔴 **REQUIRED**
   - Add GTM variable: `CJS - User Currency Preference`
   - Add GTM variable: `CJS - Dynamic Click Value` (update to handle number + period format)
   - Add purchase event tracking code to Kajabi checkout settings
   - Document integration with existing GTM Tag 86

2. **Verify Offer IDs** ⚠️ **REQUIRED**
   - Confirm `igbTdRbk` is correct for Consult Upsell USD
   - Verify all offer mappings match Kajabi backend

3. **Align Data Attributes with GTM** ⚠️ **REQUIRED**
   - Either: Update GTM code to parse `data-usd` + `data-period-usd`
   - Or: Change to combined format `data-usd="$147/quarter"`

### Phase 2: Enhancements (Recommended)

4. **Improve FOUC Prevention** ⚠️ **RECOMMENDED**
   - Add inline script in `<head>` for immediate currency detection
   - Keep CSS approach as fallback

5. **Add Error Handling** ⚠️ **RECOMMENDED**
   - Console warnings for missing data attributes
   - Fallback handling for localStorage unavailable
   - Validation for navigation selectors

6. **Add Analytics Event** ✅ **ALREADY INCLUDED**
   - Secondary brief already includes `currency_change` event
   - Good addition for tracking toggle usage

---

## ✅ What to Keep from Secondary Brief

1. ✅ **Auto-detection feature** - Excellent UX improvement
2. ✅ **Automated UI injection** - Reduces manual work
3. ✅ **Automatic link detection** - More flexible
4. ✅ **Checkout page auto-detection** - Reduces manual work
5. ✅ **Cleaner code structure** - Better maintainability
6. ✅ **Analytics event tracking** - Good addition

---

## ❌ What to Add from Original Brief

1. 🔴 **GTM Integration** - **CRITICAL** for accurate ROAS
2. ⚠️ **Enhanced FOUC prevention** - Inline head script
3. ⚠️ **Error handling** - Production robustness
4. ⚠️ **Data attribute validation** - Prevents silent failures

---

## 🎯 Final Recommendation

**Status:** ⚠️ **APPROVE WITH CONDITIONS**

The secondary brief provides a **better user experience and simpler implementation**, but it's **incomplete without GTM integration**. 

**Action Required:**
1. ✅ Merge secondary brief's automated approach
2. 🔴 Add GTM integration from original brief
3. ⚠️ Align data attribute format with GTM requirements
4. ⚠️ Verify offer IDs
5. ⚠️ Add enhanced error handling

**Estimated Additional Work:** 2-3 hours to add GTM integration and align formats.

---

## 📝 Next Steps

1. **Review this assessment** with team
2. **Decide on data attribute format** (combined vs. separate)
3. **Add GTM integration code** to secondary brief
4. **Verify offer IDs** with Kajabi backend
5. **Create merged implementation** combining best of both briefs
6. **Test GTM tracking** in preview mode before deployment

---

**Last Updated:** December 30, 2025  
**Status:** Ready for Team Review
