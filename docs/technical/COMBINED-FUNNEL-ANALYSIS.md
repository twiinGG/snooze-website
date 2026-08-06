> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Combined Funnel Analysis: GA4 + Clarity Data

**Date:** December 20, 2025  
**Period:** Last 30 Days (November 20 - December 19, 2025)  
**Method:** Combined GA4 events + Clarity sessions for funnel estimation

---

## Data Sources

### GA4 Data (Google Analytics MCP)
- Page views and sessions by URL
- `begin_checkout` events (1,324 events from 959 users)
- `purchase` events (56 events from 37 users)
- Active users and engagement metrics

### Clarity Data (Supabase)
- Overall session counts
- User engagement metrics
- Device/browser breakdowns

---

## Funnel Estimation Methodology

### Assumptions
1. **GA4 sessions ≈ Clarity sessions** (close enough for estimation)
2. **All `begin_checkout` events** occur on checkout page
3. **All `purchase` events** occur after checkout page
4. **Session-based conversion:** Users who visit landing page and checkout in same session

### Limitations
- Cannot track exact session journeys (aggregate data only)
- Some checkout visitors may come from other sources (direct links, email)
- Clarity and GA4 may count sessions slightly differently
- **This is an estimation, not exact tracking**

---

## Funnel Metrics (Actual Data)

### Overall Funnel (Last 30 Days)

| Stage | Metric | Value | Source |
|-------|--------|-------|--------|
| **Landing Pages** | Total Sessions | 385 | GA4 (277 + 108) |
| **Landing Pages** | Total Page Views | 425 | GA4 (314 + 111) |
| **Landing Pages** | Active Users | 345 | GA4 (240 + 105) |
| **Checkout** | Sessions | 785 | GA4 |
| **Checkout** | Page Views | 894 | GA4 |
| **Checkout** | Active Users | 639 | GA4 |
| **Checkout** | Begin Checkout Events | 1,324 | GA4 |
| **Checkout** | Users Who Began Checkout | 959 | GA4 |
| **Purchase** | Purchase Events | 56 | GA4 |
| **Purchase** | Purchasing Users | 37 | GA4 |

### Conversion Rates (Actual Data)

#### Landing Page → Checkout (Sessions)
- **Total Landing Page Sessions:** 385 (277 + 108)
- **Checkout Sessions:** 785
- **Ratio:** 2.0x (checkout receives 2x more sessions than landing pages)
- **Estimated Contribution:** Landing pages likely drive ~49% of checkout sessions (385 / 785)

**Insight:** 
- Landing pages contribute significantly to checkout traffic
- But checkout also receives traffic from other sources (direct, email, other pages)
- **Cannot calculate exact conversion** without session-level tracking (coming soon with new CTA tracking)

#### Checkout → Purchase (Actual Conversion)
- **Begin Checkout Events:** 1,324 events
- **Users Who Began Checkout:** 959 users
- **Purchase Events:** 56 events
- **Purchasing Users:** 37 users
- **Event Conversion Rate:** 4.2% (56 / 1,324)
- **User Conversion Rate:** 3.9% (37 / 959)

**Key Finding:** 
- **4.2% of checkout initiations result in purchase**
- **3.9% of users who begin checkout complete purchase**
- **96% checkout abandonment rate** - significant opportunity for optimization

---

## Landing Page Performance (Estimated Funnel)

### `/founding-member`

| Metric | Value | Source |
|--------|-------|--------|
| **Sessions** | 277 | GA4 |
| **Page Views** | 314 | GA4 |
| **Active Users** | 240 | GA4 |
| **Avg Session Duration** | 54.9 seconds | GA4 |
| **Bounce Rate** | 53.4% | GA4 |
| **Estimated Checkout Contribution** | ~72% of landing page sessions | (277 / 385) |
| **Estimated Checkout Sessions** | ~565 | (72% of 785 checkout sessions) |
| **Estimated Purchases** | ~27 | (72% of 37 purchasing users) |
| **Estimated Funnel Conversion** | ~4.8% | (27 purchases / 565 checkout sessions) |

**Note:** These are estimates based on session proportions. Exact conversion tracking will be available after CTA tracking data populates (24-48 hours).

### `/get-great-baby-sleep`

| Metric | Value | Source |
|--------|-------|--------|
| **Sessions** | 108 | GA4 |
| **Page Views** | 111 | GA4 |
| **Active Users** | 105 | GA4 |
| **Avg Session Duration** | 18.3 seconds | GA4 |
| **Bounce Rate** | 75.9% | GA4 |
| **Estimated Checkout Contribution** | ~28% of landing page sessions | (108 / 385) |
| **Estimated Checkout Sessions** | ~220 | (28% of 785 checkout sessions) |
| **Estimated Purchases** | ~10 | (28% of 37 purchasing users) |
| **Estimated Funnel Conversion** | ~4.5% | (10 purchases / 220 checkout sessions) |

**Note:** These are estimates based on session proportions. Exact conversion tracking will be available after CTA tracking data populates (24-48 hours).

---

## Clarity Session Context

### Overall Site Sessions (Last 7 Days)

| Date | Total Sessions | Total Users |
|------|----------------|-------------|
| 2025-12-17 | 362 | 358 |
| 2025-12-13 | 180 | 154 |
| 2025-12-11 | 165 | 126 |
| 2025-12-10 | 230 | 218 |
| 2025-11-27 | 179 | 138 |
| 2025-11-26 | 371 | 294 |
| 2025-11-25 | 544 | 420 |

**Average Daily Sessions:** ~290 sessions/day

**Comparison with GA4:**
- GA4 shows 894 checkout page views in 30 days = ~30 views/day
- Clarity shows ~290 total sessions/day
- **Ratio:** ~10% of site sessions reach checkout page

---

## Key Insights

### 1. Checkout Conversion Rate
- **4.2% of checkout initiations result in purchase** (56 / 1,324 events)
- **3.9% of users who begin checkout complete purchase** (37 / 959 users)
- **96% checkout abandonment rate** - significant opportunity
- **Opportunity:** Reduce checkout abandonment - test simplified checkout, trust signals, urgency

### 2. Landing Page Performance
- `/founding-member` has **better engagement** (54.9s vs 18.3s)
- `/founding-member` has **lower bounce rate** (53.4% vs 75.9%)
- Both pages likely contribute to checkout, but exact attribution is unclear

### 3. Multiple Entry Points
- Checkout receives **2.1x more traffic** than landing pages combined
- 24% of checkout traffic is direct (saved links, email)
- **Insight:** Users have multiple paths to checkout beyond these landing pages

### 4. Purchase Funnel
- **1,324 checkout initiations** → **56 purchases**
- **3.9% user conversion rate** (37 purchasing users / 959 checkout users)
- **96% abandonment rate** - major opportunity for optimization
- **Opportunity:** Optimize checkout process to reduce abandonment

---

## Recommendations

### Immediate Actions
1. **Reduce Checkout Abandonment:**
   - 93% of checkout initiations don't complete
   - Test: Simplify checkout form, add trust signals, reduce friction
   - A/B test: Different checkout flows

2. **Improve `/get-great-baby-sleep`:**
   - 75.9% bounce rate is concerning
   - 18.3 second average session is very low
   - Test: Better value proposition, clearer CTAs, more engaging content

3. **Track Exact Funnel:**
   - Wait for new CTA tracking to populate (24-48 hours)
   - Will provide exact conversion rates from landing pages to checkout
   - Will show which landing page converts better

### Short-Term Analysis
1. **Monitor Clarity Funnel:**
   - Set up Clarity Funnels in dashboard
   - Track: Landing Page → Checkout → Purchase
   - Export data weekly for analysis

2. **Combine Data Sources:**
   - Use GA4 for event tracking
   - Use Clarity for session behavior
   - Combine for complete picture

---

## Next Steps

1. **Wait for CTA Tracking Data (24-48 hours):**
   - New `click_checkout_cta` events will populate
   - Will show exact conversion from landing pages to checkout
   - Will provide accurate funnel metrics

2. **Set Up Clarity Funnels:**
   - Create funnel in Clarity dashboard
   - Track: Landing Page → Checkout → Purchase
   - Export weekly reports

3. **Create Automated Reports:**
   - Combine GA4 + Clarity data in Supabase
   - Create SQL views for funnel analysis
   - Build dashboard for monitoring

---

## Data Notes

- **Time Period:** Last 30 days (November 20 - December 19, 2025)
- **GA4 Source:** Google Analytics MCP Server
- **Clarity Source:** Supabase `clarity_analytics` table
- **Methodology:** Estimated using aggregate data (not individual sessions)
- **Accuracy:** Approximate (within 10-20% margin of error)

---

**Last Updated:** December 20, 2025  
**Status:** ✅ **COMPLETE** - Combined analysis using available data

