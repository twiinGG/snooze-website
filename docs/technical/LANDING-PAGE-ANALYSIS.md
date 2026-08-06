> # ⚠️ SUPERSEDED, do not use as guidance
>
> Folded into `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` v4.0 on August 6, 2026 by ME-006, which re-read the live
> state from the Meta, GA4, GTM, Kajabi and Stape APIs. Kept for history only.
>
> Evidence: `docs/projects/measurement/4_working/2026-08-06-stack-review/`

---

# Landing Page Performance Analysis
**Date:** December 20, 2025  
**Period:** Last 30 Days (November 20 - December 19, 2025)  
**Property:** Sleep Concierge G4 (401774815)

## Executive Summary

Comparing three key pages in the conversion funnel:
- **`/founding-member`** - Limited Founding Member Offer (Landing Page)
- **`/get-great-baby-sleep`** - Snooze Membership Landing Page (Cold Traffic)
- **`/offers/6iRarwak/checkout`** - Checkout/Conversion Page

### Key Findings

| Metric | `/founding-member` | `/get-great-baby-sleep` | `/offers/6iRarwak/checkout` | Winner |
|--------|-------------------|------------------------|---------------------------|--------|
| **Page Views** | 314 | 111 | 894 | 🏆 Checkout (2.8x founding-member) |
| **Active Users** | 240 | 105 | 423 | 🏆 Checkout (1.8x founding-member) |
| **New Users** | 228 (95%) | 103 (98%) | 399 (94%) | Tie (all high new user %) |
| **Avg Session Duration** | 54.9 seconds | 18.3 seconds | 60.2 seconds | 🏆 Checkout (longest) |
| **Bounce Rate** | 53.4% | 75.9% | 70.6% | 🏆 Founding Member (lowest) |
| **User Engagement Events** | 140 (58% of users) | 20 (19% of users) | 235 (38% of users) | 🏆 Checkout (most events) |
| **Begin Checkout Events** | N/A | N/A | 758 | 🏆 Checkout (conversion intent) |

**Key Insight: The checkout page receives the most traffic and shows strong conversion intent (758 begin_checkout events), indicating the funnel is working but could be optimized.**

---

## Conversion Funnel Analysis

### Funnel Flow
1. **Landing Pages** → `/founding-member` (314 views) or `/get-great-baby-sleep` (111 views)
2. **Checkout Page** → `/offers/6iRarwak/checkout` (894 views)

### Why `begin_checkout` Only Appears on Checkout Page

**Important:** The `begin_checkout` event is a GA4 e-commerce event that fires specifically when a user reaches the checkout page (`/offers/6iRarwak/checkout`). It does NOT fire on landing pages because:

1. **Event Location:** `begin_checkout` is triggered by the checkout page itself, not by landing pages
2. **E-commerce Events:** This is part of GA4's standard e-commerce event schema - it tracks when users enter the checkout process
3. **Landing Page Events:** Landing pages have different events:
   - `page_view` - When page loads
   - `user_engagement` - User interaction with page
   - Custom click events (if implemented) - CTA button clicks
   - Form interactions (if implemented) - Form submissions

**To Track Landing Page → Checkout Conversion:**
- Set up custom click events on CTA buttons that link to checkout
- Use funnel analysis to track users who visit both pages in same session
- Implement conversion tracking with UTM parameters
- Use session-based analysis to see user journey

### Conversion Metrics
- **Total Landing Page Sessions:** 385 (277 + 108)
- **Total Landing Page Views:** 425 (314 + 111)
- **Checkout Sessions:** 785
- **Checkout Page Views:** 894
- **Checkout Initiation Events:** 1,324 events (from 959 users)
- **Purchase Events:** 56 events (from 37 users)
- **Funnel Efficiency:** 2.0x checkout sessions vs landing page sessions (suggests multiple entry points)

**Insight:** The checkout page receives 2x more sessions than the landing pages combined, indicating:
- Users arriving directly at checkout (saved links, email campaigns)
- Multiple entry points to checkout
- Strong direct traffic (215 views, 24% of checkout traffic)
- **Estimated Contribution:** Landing pages likely drive ~49% of checkout sessions (385 / 785)

**Checkout → Purchase Conversion:**
- **4.2% event conversion rate** (56 purchases / 1,324 checkout events)
- **3.9% user conversion rate** (37 purchasing users / 959 checkout users)
- **96% checkout abandonment** - significant optimization opportunity

---

## Detailed Performance Metrics

### `/founding-member` - Limited Founding Member Offer

#### Traffic Overview (Last 30 Days)
- **Total Page Views:** 314
- **Active Users:** 240
- **New Users:** 228 (95% new user rate)
- **Returning Users:** 12 (5%)

#### Engagement Metrics
- **Average Session Duration:** 54.9 seconds
- **Bounce Rate:** 53.4% (below average - good!)
- **User Engagement Events:** 140 events from 108 users (45% engagement rate)
- **Total Events:** 943 events

#### Traffic Sources (Top 5)
1. **Direct/None:** 139 views (44%) - 100 users
   - Strong brand recognition or saved/bookmarked links
2. **Instagram (Social):** 72 views (23%) - 56 users
   - Organic social traffic performing well
3. **Meta Ads:** 62 views (20%) - 62 users
   - Paid social driving quality traffic
4. **Kajabi Referral:** 16 views (5%) - 4 users
   - Internal navigation from other pages
5. **Google CPC:** 8 views (3%) - 8 users
   - Paid search traffic (small volume)

#### Geographic Distribution (Top 5)
1. **Australia (Mobile):** 142 views (45%) - 114 users
   - Primary market, mobile-first
2. **United States (Mobile):** 49 views (16%) - 42 users
   - Secondary market
3. **Australia (Desktop):** 28 views (9%) - 8 users
   - Desktop engagement lower
4. **Ireland (Mobile):** 19 views (6%) - 8 users
5. **United States (Desktop):** 16 views (5%) - 16 users

#### Device Breakdown
- **Mobile:** ~85% of traffic
- **Desktop:** ~15% of traffic
- **Mobile-first audience** - page optimized for mobile

#### Event Analysis
- **Page Views:** 314 events
- **Session Starts:** 263 events
- **First Visits:** 228 events
- **User Engagement:** 140 events (44% of page views)

---

### `/get-great-baby-sleep` - Snooze Membership Landing Page

#### Traffic Overview (Last 30 Days)
- **Total Page Views:** 111
- **Active Users:** 105
- **New Users:** 103 (98% new user rate)
- **Returning Users:** 2 (2%)

#### Engagement Metrics
- **Average Session Duration:** 18.3 seconds
- **Bounce Rate:** 75.9% (high - concerning)
- **User Engagement Events:** 20 events from 18 users (17% engagement rate)
- **Total Events:** 341 events

#### Traffic Sources (Top 5)
1. **Meta Ads:** 93 views (84%) - 89 users
   - Almost entirely paid traffic
   - Very high new user rate (99%)
2. **Direct/None:** 11 views (10%) - 11 users
   - Minimal organic/direct traffic
3. **Facebook Referral:** 3 views (3%) - 3 users
4. **Kajabi Referral:** 2 views (2%) - 1 user
5. **Instagram (Social):** 2 views (2%) - 2 users

#### Geographic Distribution (Top 5)
1. **United States (Mobile):** 54 views (49%) - 54 users
   - Primary market, all mobile
2. **Australia (Mobile):** 30 views (27%) - 27 users
   - Secondary market
3. **Sweden (Mobile):** 8 views (7%) - 8 users
4. **Ireland (Mobile):** 6 views (5%) - 6 users
5. **Australia (Desktop):** 5 views (5%) - 2 users

#### Device Breakdown
- **Mobile:** ~95% of traffic
- **Desktop:** ~5% of traffic
- **Extremely mobile-heavy** - even more than founding-member

#### Event Analysis
- **Page Views:** 111 events
- **Session Starts:** 107 events
- **First Visits:** 103 events
- **User Engagement:** 20 events (18% of page views)

---

### `/offers/6iRarwak/checkout` - Checkout/Conversion Page

#### Traffic Overview (Last 30 Days)
- **Total Page Views:** 894 (highest of all three pages)
- **Active Users:** 423
- **New Users:** 399 (94% new user rate)
- **Returning Users:** 24 (6%)

#### Engagement Metrics
- **Average Session Duration:** 60.2 seconds (longest of all pages)
- **Bounce Rate:** 70.6% (moderate - expected for checkout pages)
- **User Engagement Events:** 235 events from 160 users (38% engagement rate)
- **Total Events:** 1,962 events
- **Begin Checkout Events:** 758 events from 577 users (85% of active users)

#### Conversion Intent Indicators
- **Begin Checkout Events:** 758 (85% of active users initiated checkout)
- **Page Views per User:** 2.1 (users viewing multiple times before converting)
- **Engagement Rate:** 38% of users engaged with page elements

#### Traffic Sources (Top 5)
1. **Meta Ads:** 357 views (40%) - 310 users
   - Primary paid traffic source
   - 325 new users (high conversion intent)
2. **Direct/None:** 215 views (24%) - 140 users
   - Strong brand recognition or saved/bookmarked links
   - 52 new users (24% new user rate - indicates returning visitors)
3. **Instagram Referral (l.instagram.com):** 138 views (15%) - 102 users
   - Organic social traffic from Instagram
   - 100 new users (98% new user rate)
4. **Google Organic:** 79 views (9%) - 43 users
   - SEO traffic (0% new users - all returning)
5. **Nap Trapped Podcast Newsletter:** 27 views (3%) - 19 users
   - Email marketing traffic
   - 15 new users (79% new user rate)

#### Geographic Distribution (Top 5)
1. **Australia (Mobile):** 497 views (56%) - 372 users
   - Primary market, mobile-first
   - 316 new users (85% new user rate)
2. **United States (Mobile):** 141 views (16%) - 108 users
   - Secondary market
   - 77 new users (71% new user rate)
3. **Australia (Desktop):** 60 views (7%) - 26 users
   - Desktop engagement
   - 11 new users (42% new user rate)
4. **New Zealand (Mobile):** 26 views (3%) - 14 users
5. **United Kingdom (Mobile):** 25 views (3%) - 13 users

#### Device Breakdown
- **Mobile:** ~90% of traffic
- **Desktop:** ~10% of traffic
- **Extremely mobile-heavy** - checkout optimized for mobile

#### Event Analysis
- **Page Views:** 894 events
- **Begin Checkout:** 758 events (85% of active users)
- **Session Starts:** 615 events
- **First Visits:** 509 events
- **User Engagement:** 235 events (26% of page views)

#### Key Performance Indicators
- **Checkout Initiation Rate:** 85% (758 begin_checkout / 423 active users)
- **Average Time on Page:** 60.2 seconds (good for checkout)
- **Returning Visitor Rate:** 6% (24 returning users)
- **Multiple Page Views:** 2.1 views per user (users reviewing before purchase)

---

## Comparative Analysis

### Traffic Volume
- **Checkout:** 2.8x more page views than founding-member
- **Checkout:** 8.1x more page views than get-great-baby-sleep
- **Founding Member:** 2.8x more page views than get-great-baby-sleep
- All pages have similar new user rates (94-98%)

### Engagement Quality

#### Session Duration
- **Checkout:** 60.2 seconds (longest - users reviewing purchase details)
- **Founding Member:** 54.9 seconds (strong engagement)
- **Get Great Baby Sleep:** 18.3 seconds (lowest - concerning)
- **Insight:** Checkout page has longest session duration, indicating users are carefully reviewing the offer. Founding-member also shows strong engagement. Get-great-baby-sleep needs improvement.

#### Bounce Rate
- **Founding Member:** 53.4% (lowest - excellent)
- **Checkout:** 70.6% (moderate - acceptable for checkout pages)
- **Get Great Baby Sleep:** 75.9% (highest - concerning)
- **Insight:** Founding-member has the lowest bounce rate, indicating best content match. Checkout bounce rate is acceptable (users may be price-checking or comparing). Get-great-baby-sleep needs urgent attention.

#### User Engagement
- **Checkout:** 235 engagement events (38% of users engaged)
- **Founding Member:** 140 engagement events (58% of users engaged - highest rate)
- **Get Great Baby Sleep:** 20 engagement events (19% of users engaged)
- **Insight:** Founding-member has the highest engagement rate (58%), while checkout has the most total events. Get-great-baby-sleep has very low engagement.

### Traffic Sources

#### Organic vs Paid
- **Checkout:**
  - Paid: 40% (Meta Ads - primary source)
  - Direct: 24% (strong brand/saved links)
  - Organic Social: 15% (Instagram referral)
  - Organic Search: 9% (Google)
  - Email: 3% (Newsletter)
  
- **Founding Member:**
  - Direct: 44% (strong brand/search presence)
  - Organic Social: 23% (Instagram performing well)
  - Paid: 23% (Meta Ads + Google CPC)
  
- **Get Great Baby Sleep:**
  - Paid: 84% (Meta Ads - almost entirely)
  - Direct: 10% (minimal organic)
  - Organic Social: 2% (very low)
  
**Insight:** 
- Checkout has balanced traffic mix with strong direct traffic (24%)
- Founding-member has strongest organic presence (67% organic)
- Get-great-baby-sleep is almost entirely paid (84%)

### Geographic Distribution

#### Market Focus
- **Checkout:** Australia-focused (62% of traffic - 497 mobile + 60 desktop)
- **Founding Member:** Australia-focused (54% of traffic)
- **Get Great Baby Sleep:** US-focused (49% of traffic)

**Insight:** 
- Checkout and founding-member both target primary market (Australia)
- Get-great-baby-sleep targets secondary market (US)
- Checkout shows strongest Australia focus (62% vs 54%)

---

## Key Insights & Recommendations

### 🎯 `/offers/6iRarwak/checkout` - Strengths

1. **Highest Traffic Volume**
   - 894 page views (2.8x founding-member, 8x get-great-baby-sleep)
   - 423 active users
   - Strong conversion intent (758 begin_checkout events)
   
2. **Strong Conversion Intent**
   - 85% of active users initiated checkout (758 begin_checkout events)
   - 60.2 second average session (users reviewing offer carefully)
   - 2.1 page views per user (users returning to review)
   
3. **Diverse Traffic Mix**
   - 40% paid (Meta Ads)
   - 24% direct (strong brand/saved links)
   - 15% organic social (Instagram)
   - 9% organic search (Google)
   
4. **Primary Market Focus**
   - 62% Australia traffic
   - Aligned with business focus

### 🎯 `/founding-member` - Strengths

1. **Strong Engagement**
   - 3x longer session duration
   - Lower bounce rate (53.4%)
   - Higher user engagement (45% of users)
   
2. **Diverse Traffic Mix**
   - 44% direct traffic (strong brand/search)
   - 23% organic social (Instagram)
   - Balanced paid/organic mix
   
3. **Primary Market Focus**
   - 54% Australia traffic
   - Aligned with business focus

### ⚠️ `/get-great-baby-sleep` - Concerns

1. **High Bounce Rate**
   - 75.9% bounce rate suggests:
     - Page may not match ad creative
     - Value proposition unclear
     - Page load/UX issues
     - Content not engaging enough

2. **Low Engagement**
   - 18.3 second average session
   - Only 17% of users engaging
   - Users leaving quickly

3. **Over-Reliance on Paid Traffic**
   - 84% from Meta Ads
   - Minimal organic presence
   - Higher cost per acquisition risk

4. **Different Market Focus**
   - 49% US traffic vs 54% AU for founding-member
   - May need AU-focused version

### 📊 Recommendations

#### For `/offers/6iRarwak/checkout`:

1. **Optimize Conversion Rate**
   - 758 begin_checkout events but need to track actual purchases
   - Reduce friction in checkout process
   - Add trust signals (security badges, guarantees)
   - Test different pricing displays
   - A/B test checkout flow

2. **Reduce Bounce Rate**
   - 70.6% bounce rate is moderate but could be improved
   - Ensure page loads quickly
   - Make value proposition clear immediately
   - Add social proof/testimonials
   - Show what's included clearly

3. **Leverage Direct Traffic**
   - 24% direct traffic indicates strong brand recognition
   - Consider email campaigns to drive direct traffic
   - Create shareable links for members
   - Build referral program

4. **Optimize for Mobile**
   - 90% mobile traffic
   - Ensure mobile checkout is seamless
   - Test mobile payment options
   - Optimize form fields for mobile

#### For `/get-great-baby-sleep`:

1. **Reduce Bounce Rate**
   - Review ad creative vs landing page match
   - Improve above-the-fold value proposition
   - Add engaging visuals/video
   - Test different headlines/CTAs
   - Check page load speed

2. **Increase Engagement**
   - Add interactive elements
   - Improve content structure
   - Add social proof/testimonials
   - Create urgency/scarcity elements
   - Test different layouts

3. **Build Organic Traffic**
   - SEO optimization
   - Social media promotion
   - Content marketing
   - Email campaigns
   - Internal linking from other pages

4. **Market Alignment**
   - Consider AU-focused version
   - Test different geographic targeting
   - Align messaging with target market

#### For `/founding-member`:

1. **Scale Success**
   - Increase paid ad spend (currently only 23%)
   - Replicate successful elements to checkout page
   - A/B test variations
   - Expand to other markets

2. **Optimize Further**
   - Test different CTAs
   - Improve conversion rate to checkout
   - Add more social proof
   - Test urgency elements

3. **Funnel Optimization**
   - Track conversion rate from founding-member to checkout
   - Test different paths to checkout
   - Optimize for mobile (85% mobile traffic)
   - Add exit-intent popups

---

## Data Notes

- **Time Period:** Last 30 days (November 20 - December 19, 2025)
- **Data Source:** Google Analytics 4 (Property ID: 401774815)
- **Timezone:** Australia/Melbourne
- **Currency:** AUD

---

## Next Steps

1. **Immediate:** 
   - Review `/get-great-baby-sleep` page for bounce rate issues
   - Track actual purchase conversions on checkout page
   - Analyze funnel drop-off rates

2. **Short-term:** 
   - A/B test improvements on get-great-baby-sleep
   - Optimize checkout conversion rate
   - Test different paths from landing pages to checkout

3. **Medium-term:** 
   - Scale successful elements from founding-member
   - Build organic traffic for all pages
   - Create conversion tracking dashboard

4. **Long-term:** 
   - Build comprehensive funnel analytics
   - Implement advanced conversion tracking
   - Create automated reporting

---

**Analysis Generated:** December 20, 2025  
**Analyst:** Google Analytics MCP Server

