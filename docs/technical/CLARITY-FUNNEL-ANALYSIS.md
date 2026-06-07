# Clarity Funnel Analysis - Short-Term Fix

**Date:** December 20, 2025  
**Purpose:** Fill gaps in tracking sessions leading to checkout and purchase using Microsoft Clarity data  
**Status:** ⏳ **IN PROGRESS** - Requires URL dimension data sync

---

## Current Situation

### What We Have
- ✅ **GA4 Data:** Page views, active users, `begin_checkout` events, `purchase` events
- ✅ **Clarity Data:** Overall sessions, engagement metrics, device/browser breakdowns
- ❌ **Missing:** Session-level funnel data (landing page → checkout → purchase)

### The Gap
We can see:
- How many people viewed landing pages (GA4)
- How many people reached checkout (GA4 `begin_checkout` events)
- How many people purchased (GA4 `purchase` events)

But we **cannot directly see:**
- How many sessions started on landing pages and ended at checkout
- Conversion rate from landing page sessions to checkout
- Conversion rate from checkout sessions to purchase

---

## Solution: Combine Clarity + GA4 Data

### Approach
1. **Use Clarity for Session Data:** Get total sessions per page (URL dimension)
2. **Use GA4 for Event Data:** Get `begin_checkout` and `purchase` events
3. **Calculate Funnel Metrics:** Estimate conversion rates using combined data

### Limitations
- Clarity API provides **aggregated data only** (not individual sessions)
- Cannot track exact session journeys (user A on landing page → checkout)
- Can estimate funnel using aggregate metrics

---

## Step 1: Fetch URL-Specific Clarity Data

### Run URL Funnel Sync Script

```bash
cd projects/clarity-analytics
node scripts/sync_url_funnel_data.js
```

**What This Does:**
- Fetches Clarity data broken down by URL dimension
- Filters for target URLs:
  - `/founding-member`
  - `/get-great-baby-sleep`
  - `/offers/6iRarwak/checkout`
- Stores in Supabase `clarity_analytics` table

**Note:** This uses 1 of your 10 daily Clarity API requests.

---

## Step 2: Query Combined Data

### Query Clarity Sessions by URL

```sql
SELECT 
  dimension1_value as url,
  SUM(traffic) as clarity_sessions,
  SUM(distinct_users) as clarity_users,
  AVG(scroll_depth) as avg_scroll_depth,
  AVG(pages_per_session) as avg_pages
FROM clarity_analytics
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
  AND dimension1 = 'URL'
  AND dimension1_value IN (
    '/founding-member',
    '/get-great-baby-sleep',
    '/offers/6iRarwak/checkout'
  )
GROUP BY dimension1_value
ORDER BY clarity_sessions DESC;
```

### Query GA4 Events

```sql
-- This would be via GA4 MCP, not Supabase
-- Get begin_checkout and purchase events
```

---

## Step 3: Calculate Funnel Metrics

### Estimated Conversion Rates

**Formula:**
```
Landing Page → Checkout Conversion Rate = 
  (GA4 begin_checkout events / Clarity landing page sessions) × 100

Checkout → Purchase Conversion Rate = 
  (GA4 purchase events / GA4 begin_checkout events) × 100
```

**Assumptions:**
- Clarity sessions ≈ GA4 sessions (close enough for estimation)
- All `begin_checkout` events come from checkout page visits
- All `purchase` events come from checkout page visits

**Limitations:**
- Not exact (some checkout visitors may come from other sources)
- Clarity and GA4 may count sessions differently
- But provides reasonable estimates for short-term analysis

---

## Step 4: Create Combined Analysis

### Example Query Structure

```sql
-- Combined Clarity + GA4 Funnel Analysis
WITH clarity_data AS (
  SELECT 
    dimension1_value as url,
    SUM(traffic) as sessions,
    SUM(distinct_users) as users
  FROM clarity_analytics
  WHERE dimension1 = 'URL'
    AND dimension1_value IN ('/founding-member', '/get-great-baby-sleep', '/offers/6iRarwak/checkout')
  GROUP BY dimension1_value
),
ga4_data AS (
  -- This would come from GA4 MCP queries
  -- Page views, begin_checkout events, purchase events
)
SELECT 
  c.url,
  c.sessions as clarity_sessions,
  -- Combine with GA4 data here
FROM clarity_data c
-- Join with GA4 data
```

---

## Current Clarity Data Available

### Overall Sessions (Last 30 Days)

| Date | Total Sessions | Total Users | Avg Pages | Avg Scroll Depth |
|------|---------------|-------------|-----------|------------------|
| 2025-12-17 | 362 | 358 | 1.88 | 58.01% |
| 2025-12-13 | 180 | 154 | 1.76 | 57.22% |
| 2025-12-11 | 165 | 126 | 2.12 | 59.99% |
| 2025-12-10 | 230 | 218 | 2.27 | 66.27% |

### Available Dimensions
- ✅ Browser (106 records)
- ✅ Source (39 records)
- ✅ Device (26 records)
- ✅ OS (24 records)
- ✅ Medium (21 records)
- ⚠️ URL (4 records - but values are NULL - needs sync)

---

## Next Steps

1. **Run URL Funnel Sync Script:**
   ```bash
   cd projects/clarity-analytics
   node scripts/sync_url_funnel_data.js
   ```

2. **Query Combined Data:**
   - Get Clarity sessions by URL
   - Get GA4 events (begin_checkout, purchase)
   - Calculate conversion rates

3. **Create Funnel Analysis Document:**
   - Combine Clarity sessions + GA4 events
   - Calculate conversion rates
   - Estimate funnel drop-off

4. **Update Landing Page Analysis:**
   - Add Clarity-based conversion estimates
   - Compare with GA4 data
   - Identify discrepancies

---

## Alternative: Manual Clarity Dashboard Export

If API data is insufficient, you can:

1. **Go to Clarity Dashboard:**
   - Navigate to your Clarity project
   - Go to **Insights > Funnels**
   - Create a funnel: Landing Page → Checkout → Purchase

2. **Export Funnel Data:**
   - View funnel conversion rates
   - Export data manually
   - Add to analysis document

3. **Use Smart Events:**
   - Check **Smart Events** section
   - Look for "Begin Checkout" and "Purchase" events
   - Note session counts for each

---

## Expected Results

After running the sync and combining data, you should be able to estimate:

### Funnel Metrics

**Landing Page → Checkout:**
- `/founding-member`: X sessions → Y checkout events = Z% conversion
- `/get-great-baby-sleep`: X sessions → Y checkout events = Z% conversion

**Checkout → Purchase:**
- X checkout sessions → Y purchase events = Z% conversion

**Overall Funnel:**
- Landing page sessions → Checkout → Purchase
- Drop-off at each stage
- Conversion rate by landing page

---

## Files Created

- `projects/clarity-analytics/scripts/sync_url_funnel_data.js` - URL-specific sync script
- `docs/technical/CLARITY-FUNNEL-ANALYSIS.md` - This document

---

**Last Updated:** December 20, 2025  
**Status:** ⏳ **Awaiting URL Data Sync**

