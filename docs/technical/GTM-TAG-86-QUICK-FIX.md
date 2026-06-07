# GTM Tag 86 Quick Fix - 5 Minute Guide

**Problem:** Price scraper only fires on button click, not page load  
**Solution:** Add "All Pages" trigger to Tag 86

---

## Quick Fix Steps (5 Minutes)

### 1. Open GTM
- Go to: https://tagmanager.google.com
- Select container: `GTM-KNRTH6P`

### 2. Edit Tag 86
- Click **Tags** → Find **`0.2 Set - Purchase - UserData`** (Tag ID: 86)
- Click to edit

### 3. Add Trigger
- Scroll to **Triggering** section
- You'll see: **"LS UserData"** (click trigger) - keep this
- Click **+** or **Add**
- Select: **"All Pages"** (or "Page View - All Pages")
- If it doesn't exist, create it:
  - Click **+** → New Trigger
  - Name: `All Pages`
  - Type: **Page View**
  - Fires on: **All Page Views**
  - Save

### 4. Save & Publish
- Click **Save** on tag
- Click **Submit** (top right)
- Version name: `Fix Tag 86 - Add Page View trigger`
- Click **Publish**

### 5. Test
- Clear localStorage: `localStorage.clear()`
- Reload checkout page
- Check console: Should see `"Snooze Tracking: Starting Dynamic Price Scraper..."`
- Check: `localStorage.getItem('value')` should have price

---

## What This Fixes

**Before:**
- Tag 86 only fires on button click ❌
- Price not captured on page load ❌
- localStorage empty until button click ❌

**After:**
- Tag 86 fires on page load ✅
- Price captured immediately ✅
- Price updates when options clicked ✅

---

## Verification

**In browser console on checkout page:**
```javascript
// Should see these messages:
"Snooze Tracking: Starting Dynamic Price Scraper..."
"Snooze Tracking: Updated Price to 147" (or 490)

// Should have price in storage:
localStorage.getItem('value') // Returns "147" or "490"
```

---

**Full guide:** `docs/technical/GTM-TAG-86-TRIGGER-FIX.md`

