> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> **Predates the April 2026 stop in Meta ad spend. Its traffic conclusions no longer describe the account.**
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Meta Ads Traffic Analysis

**Date:** December 20, 2025  
**Period:** Last 30 Days (November 20 - December 19, 2025)  
**Source:** Meta (Facebook/Instagram) Ads

---

## Summary

Meta ads are driving significant traffic to key pages, with checkout being the primary destination.

### Total Meta Ads Traffic
- **Total Sessions:** 495 sessions (across all pages)
- **Total Users:** 470 unique users
- **New Users:** 470 (100% new users - typical for ads)

### Top Pages from Meta Ads

| Page | Sessions | Page Views | Users | New Users |
|------|----------|------------|-------|-----------|
| **Checkout** (`/offers/6iRarwak/checkout`) | **341** | 357 | 310 | 325 |
| **Get Great Baby Sleep** (`/get-great-baby-sleep`) | **91** | 93 | 89 | 88 |
| **Founding Member** (`/founding-member`) | **63** | 62 | 62 | 57 |

**Key Insight:** 69% of Meta ads traffic goes directly to checkout (341 / 495 sessions)

---

## Landing Pages Performance from Meta Ads

### `/get-great-baby-sleep`
- **Sessions:** 91
- **Page Views:** 93
- **Users:** 89 (98% new users)
- **Events:** 284 total events
- **Campaign:** `founding_member`

### `/founding-member`
- **Sessions:** 63
- **Page Views:** 62
- **Users:** 62 (92% new users)
- **Events:** 191 total events
- **Campaign:** `founding_member`

### Combined Landing Pages
- **Total Sessions:** 154 (91 + 63)
- **Total Users:** 151 (89 + 62)
- **Total Events:** 475 events
- **Share of Meta Traffic:** 31% (154 / 495)

---

## Checkout Performance from Meta Ads

### Checkout Page (`/offers/6iRarwak/checkout`)
- **Sessions:** 341 (69% of Meta ads traffic)
- **Page Views:** 357
- **Users:** 310
- **New Users:** 325 (95% new users)
- **Total Events:** 1,364 events
- **Campaign:** `founding_member`

**Insight:** Most Meta ads traffic goes directly to checkout, suggesting ads are linking to checkout URLs rather than landing pages.

---

## Meta Ads Contribution to Overall Traffic

### Overall Site Traffic (Last 30 Days)
- **Total Checkout Sessions:** 785
- **Meta Ads Checkout Sessions:** 341
- **Meta Ads Share:** **43%** of checkout traffic (341 / 785)

- **Total Landing Page Sessions:** 385 (277 + 108)
- **Meta Ads Landing Page Sessions:** 154 (91 + 63)
- **Meta Ads Share:** **40%** of landing page traffic (154 / 385)

**Key Finding:** Meta ads drive **40-43% of traffic** to key conversion pages.

---

## Conversion Events (Meta Ads Performance)

### Checkout Initiation
- **Begin Checkout Events:** 315 events
- **Users Who Began Checkout:** 281 users
- **From Checkout Sessions:** 341 checkout sessions
- **Checkout → Begin Checkout Rate:** 92% (315 / 341 sessions)

### Purchase Completion
- **Purchase Events:** 1 event
- **Purchasing Users:** 1 user
- **Begin Checkout → Purchase Rate:** 0.3% (1 / 315 events)
- **User Conversion Rate:** 0.4% (1 / 281 users)

### Overall Meta Ads Funnel
- **Checkout Sessions:** 341
- **Begin Checkout Events:** 315
- **Purchase Events:** 1
- **Overall Conversion Rate:** 0.3% (1 purchase / 341 checkout sessions)

⚠️ **CRITICAL FINDING:** Meta ads traffic has extremely low conversion rate (0.3%)

### Comparison with Overall Site Performance
- **Overall Site:** 4.2% checkout → purchase conversion (56 / 1,324)
- **Meta Ads:** 0.3% checkout → purchase conversion (1 / 315)
- **Difference:** Meta ads perform **14x worse** than overall site average

**This suggests:**
- Meta ads traffic may not be qualified/intent-aligned
- Checkout experience issues specific to Meta ads traffic
- Possible attribution or tracking issues
- Or simply lower-quality traffic from ads

---

## Campaign Analysis

### Campaign: `founding_member`
All Meta ads traffic is attributed to the `founding_member` campaign, which aligns with the launch strategy.

**Pages Reached:**
- `/offers/6iRarwak/checkout` - 341 sessions
- `/get-great-baby-sleep` - 91 sessions
- `/founding-member` - 63 sessions
- Other pages - 19 sessions (course pages, help pages, etc.)

---

## Traffic Patterns

### Direct Checkout vs Landing Pages
- **Direct to Checkout:** 341 sessions (69%)
- **Via Landing Pages:** 154 sessions (31%)

**Interpretation:**
- Most Meta ads link directly to checkout (likely with discount codes or urgency)
- Some ads drive to landing pages first (education/consideration)
- Strategy appears mixed - both direct response and education-focused

### Landing Page Split
- **`/get-great-baby-sleep`:** 91 sessions (59% of landing page traffic)
- **`/founding-member`:** 63 sessions (41% of landing page traffic)

**Insight:** The "Get Great Baby Sleep" landing page receives more Meta ads traffic than the "Founding Member" landing page.

---

## Recommendations

### ⚠️ URGENT: Address Low Conversion Rate

**Problem:** Meta ads convert at 0.3% vs 4.2% overall (14x worse)

**Immediate Actions:**
1. **Audit Ad Targeting:**
   - Review audience targeting in Meta Ads Manager
   - Check if ads are reaching the right audience
   - Verify ad creative matches landing page messaging

2. **Checkout Experience Review:**
   - Test checkout flow specifically for Meta ads traffic
   - Check for technical issues (payment methods, forms, etc.)
   - Review checkout abandonment reasons

3. **Landing Page Optimization:**
   - 69% go directly to checkout (may need more education)
   - Test sending more traffic to landing pages first
   - Improve value proposition and trust signals

4. **Attribution Investigation:**
   - Verify tracking is working correctly
   - Check if purchases are being attributed correctly
   - Review Meta Pixel implementation

### 1. Optimize Landing Page Experience
- 154 users arrive via landing pages from Meta ads
- Focus on `/get-great-baby-sleep` (receives more traffic)
- Improve bounce rate and engagement for Meta ads traffic
- **Test:** More education-focused ads → landing pages → checkout

### 2. Test Ad Strategies
- **Current:** 69% direct to checkout, 31% to landing pages
- **Test:** More landing page traffic for education (may improve conversion)
- **Test:** Different landing pages for different audiences
- **Test:** More qualified audiences (lookalikes, retargeting)

### 3. Attribution and UTM Parameters
- All traffic shows `founding_member` campaign
- Consider more granular campaign names for different ad sets
- Better attribution will help optimize ad performance
- Track which ad creatives/campaigns convert better

### 4. Calculate ROAS
- With only 1 purchase, ROAS is likely negative
- Review ad spend vs revenue
- Pause underperforming campaigns
- Focus budget on higher-converting traffic sources

---

## Next Steps

1. **Investigate Low Conversion:**
   - Review Meta Ads Manager for ad performance
   - Check if ad creative/offer matches landing page
   - Audit targeting and audience quality
   - Review checkout flow for technical issues

2. **Compare Performance:**
   - ✅ Meta ads conversion: 0.3% vs overall: 4.2% (14x worse)
   - Compare landing page performance: Meta ads vs other sources
   - Compare checkout performance: Meta ads vs other sources
   - Identify what makes other traffic sources convert better

3. **ROAS Analysis:**
   - Combine with Meta Ads Manager spend data
   - Calculate cost per acquisition (CPA) for Meta ads
   - Calculate return on ad spend (ROAS) - likely negative
   - Determine if Meta ads are profitable or need optimization

4. **Optimization Tests:**
   - Test different ad creatives
   - Test different landing pages for Meta ads traffic
   - Test better-qualified audiences (lookalikes, retargeting)
   - Test different offer messaging

---

## Data Notes

- **Source:** GA4 via Google Analytics MCP
- **Time Period:** Last 30 days (November 20 - December 19, 2025)
- **Campaign:** All traffic attributed to `founding_member` campaign
- **Medium:** All traffic from `meta` source with `ad` medium

---

**Last Updated:** December 20, 2025  
**Status:** ✅ **COMPLETE** - ⚠️ **Critical Finding: 0.3% conversion rate (14x worse than overall)**

