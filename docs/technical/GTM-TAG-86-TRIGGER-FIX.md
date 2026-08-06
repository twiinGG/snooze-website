> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# GTM Tag 86 Trigger Fix Guide

**Date:** December 16, 2025  
**Issue:** Tag 86 (Price Scraper) only fires on button click, not on page load  
**Current Trigger:** CLICK trigger (ID: 176) - "LS UserData"  
**Required:** Page View trigger to run scraper when checkout page loads

---

## Problem Identified

**Current Configuration:**
- Tag 86: `0.2 Set - Purchase - UserData`
- Current Trigger: ID 176 - "LS UserData" (CLICK trigger)
- **Problem:** Only fires when user clicks checkout button
- **Result:** Price scraper doesn't run on page load, so price isn't captured initially

**What We Need:**
- Price scraper should run **immediately when checkout page loads**
- Should also update when pricing options are clicked (handled by JavaScript in tag)
- Current click trigger is too late - price needs to be captured before purchase

---

## Solution: Add Page View Trigger

### Option 1: Use Existing "All Pages" Trigger (Recommended - Simplest)

**Steps:**
1. Go to Google Tag Manager
2. Open container: `GTM-KNRTH6P`
3. Go to **Tags** → Find Tag ID **86** (`0.2 Set - Purchase - UserData`)
4. Click to edit
5. Scroll to **Triggering** section
6. Click **+ Add** (or edit existing triggers)
7. Find trigger: **"All Pages"** (or "Page View - All Pages")
8. Select it
9. **Keep the existing CLICK trigger (176) as well** - we want both:
   - Page View trigger = runs on page load (captures initial price)
   - Click trigger = runs on button click (backup/verification)
10. Click **Save**
11. **Publish** the container

**Why this works:**
- Tag fires on every page load
- Scraper code checks for checkout elements before running
- Safe to run everywhere (no performance impact if elements don't exist)
- Ensures price is captured as soon as checkout page loads

---

### Option 2: Create Checkout-Specific Page View Trigger (More Precise)

**Steps:**
1. Go to Google Tag Manager → **Triggers** → **New**
2. **Trigger Configuration:**
   - **Trigger Type:** Page View
   - **Trigger Name:** `Page View - Checkout Pages`
3. **This trigger fires on:** Some Page Views
4. **Conditions:**
   - **Condition 1:**
     - Variable: `Page Path`
     - Condition: Contains
     - Value: `/checkout`
   - **Condition 2 (Optional - more specific):**
     - Variable: `Page Path`
     - Condition: Contains
     - Value: `/offers/`
5. Click **Save**
6. Go to **Tags** → Find Tag **86**
7. Edit Tag 86
8. In **Triggering** section:
   - **Add** the new "Page View - Checkout Pages" trigger
   - **Keep** the existing CLICK trigger (176) as backup
9. Click **Save**
10. **Publish** the container

**Why this works:**
- Only fires on checkout pages (more precise)
- Runs on page load (captures price immediately)
- Less overhead than "All Pages"

---

### Option 3: Use Window Loaded Trigger (Alternative)

**Steps:**
1. Go to Google Tag Manager → **Triggers** → **New**
2. **Trigger Configuration:**
   - **Trigger Type:** Window Loaded
   - **Trigger Name:** `Window Loaded - Checkout Pages`
3. **This trigger fires on:** Some Window Loaded Events
4. **Conditions:**
   - **Condition 1:**
     - Variable: `Page Path`
     - Condition: Contains
     - Value: `/checkout`
5. Click **Save**
6. Add to Tag 86 (same as Option 2)

**Why this works:**
- Fires after page fully loads (ensures elements are present)
- More reliable than Page View for dynamic content
- Only fires on checkout pages

---

## Recommended Approach

**Use Option 1 (All Pages Trigger)** because:
- ✅ Simplest to implement
- ✅ No risk of missing checkout pages
- ✅ Scraper code safely checks for elements before running
- ✅ Already exists in GTM (no need to create new trigger)
- ✅ Works immediately

**Implementation:**
1. Edit Tag 86
2. Add "All Pages" trigger
3. Keep existing CLICK trigger (176) as backup
4. Save and publish

---

## Step-by-Step Instructions (Option 1 - Recommended)

### Step 1: Open GTM and Find Tag 86

1. Go to: https://tagmanager.google.com
2. Select account and container: `GTM-KNRTH6P`
3. Click **Tags** in left sidebar
4. Find tag: **`0.2 Set - Purchase - UserData`** (Tag ID: 86)
5. Click to edit

### Step 2: Add Page View Trigger

1. Scroll down to **Triggering** section
2. You should see: **"LS UserData"** (the CLICK trigger)
3. Click **+** or **Add** button
4. In the trigger selection dialog:
   - Look for: **"All Pages"** or **"Page View - All Pages"**
   - If it doesn't exist, create it:
     - Click **+** to create new trigger
     - Name: `All Pages`
     - Type: **Page View**
     - This trigger fires on: **All Page Views**
     - Click **Save**
5. Select **"All Pages"** trigger
6. You should now have **TWO triggers**:
   - ✅ All Pages (Page View)
   - ✅ LS UserData (Click) - keep this as backup
7. Click **Save** on the tag

### Step 3: Verify Trigger Configuration

**Tag 86 should now have:**
- Trigger 1: **All Pages** (Page View) - fires on page load
- Trigger 2: **LS UserData** (Click) - fires on button click

**This ensures:**
- Price scraper runs when checkout page loads ✅
- Price scraper also runs on button click (backup) ✅

### Step 4: Publish Container

1. Click **Submit** button (top right)
2. Add version name: `Fix Tag 86 trigger - Add Page View`
3. Add description: `Added All Pages trigger to Tag 86 so price scraper runs on page load, not just button click`
4. Click **Publish**

---

## Testing After Fix

### Step 1: Test in GTM Preview Mode

1. Click **Preview** button in GTM
2. Enter URL: `https://www.joinsnooze.com/offers/6iRarwak/checkout`
3. Click **Connect**
4. Navigate to checkout page in new window
5. In GTM Preview panel, check:
   - [ ] Tag 86 appears in "Tags Fired" list
   - [ ] Trigger shows: "All Pages" (not just "LS UserData")
   - [ ] No errors shown

### Step 2: Test in Browser Console

1. Clear browser cache and localStorage:
   ```javascript
   localStorage.clear();
   ```
2. Reload checkout page
3. Open DevTools → Console
4. **Should see:**
   - `"Snooze Tracking: Starting Dynamic Price Scraper..."`
   - `"Snooze Tracking: Updated Price to 147"` (or 490)
5. **Check localStorage:**
   ```javascript
   localStorage.getItem('value') // Should be "147" or "490"
   ```

### Step 3: Test Price Updates

1. On checkout page, click "Yearly: $490" option
2. Wait 500ms
3. Check console: Should see `"Snooze Tracking: Updated Price to 490"`
4. Check localStorage:
   ```javascript
   localStorage.getItem('value') // Should be "490"
   ```
5. Click "Quarterly: $147" option
6. Wait 500ms
7. Check localStorage:
   ```javascript
   localStorage.getItem('value') // Should be "147"
   ```

### Step 4: Complete Test Purchase

1. Fill out checkout form
2. Complete purchase (use test coupon if needed)
3. On thank you page, verify:
   - Purchase event has correct value
   - Facebook Pixel Helper shows Purchase event with correct value

---

## Verification Checklist

After implementing the fix:

- [ ] Tag 86 has "All Pages" trigger added
- [ ] Tag 86 still has "LS UserData" click trigger (backup)
- [ ] Container is published
- [ ] GTM Preview shows Tag 86 firing on checkout page load
- [ ] Console shows scraper messages on page load
- [ ] localStorage has correct price on page load
- [ ] Price updates when clicking between options
- [ ] Purchase event has correct value

---

## Why Current Setup Doesn't Work

**Current Trigger (176 - CLICK):**
- Only fires when user clicks checkout button
- By this time, user may have already selected a price
- But scraper needs to run **before** purchase to capture price
- Price should be captured on page load, not button click

**New Trigger (All Pages - Page View):**
- Fires immediately when page loads
- Scraper runs and captures initial price
- JavaScript in tag also listens for clicks to update price
- Ensures price is always captured before purchase

---

## Troubleshooting

### Tag 86 Still Not Firing

**Check:**
1. Container is published (not just saved)
2. Tag is not paused
3. Trigger is correctly assigned
4. GTM Preview mode shows tag firing

### Price Still Not Saving

**Check:**
1. Console shows scraper messages
2. Selectors still match checkout HTML
3. Price format matches regex pattern
4. No JavaScript errors in console

### Price Updates But Wrong Value

**Check:**
1. Selectors are finding correct elements
2. Regex pattern matches price format
3. Price extraction logic is correct
4. Test manual extraction in console

---

## Related Files

- `docs/technical/PRICE-TRACKING-ROOT-CAUSE-FIX.md` - Full fix guide
- `docs/technical/PRICE-TRACKING-DEBUG-SCRIPT.js` - Diagnostic tool
- `docs/technical/SNOOZE-TECHNICAL-TRACKING-BIBLE.md` - Full tracking docs

---

**Last Updated:** December 16, 2025  
**Priority:** 🔴 **CRITICAL - Fix before Meta ads launch**

