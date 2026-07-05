# Snooze Library Page - Complete Deployment Guide

**Version:** 2.0 (Learning Design Aligned)  
**Date:** November 2025  
**Status:** SUPERSEDED - see note below

> **Superseded (2026-07-05):** this guide describes the November 2025 ten-section build (`section-01` through `section-10`), which no longer exists on disk; the live deployable file is the consolidated `library-page.html` in this folder (see its Maintenance Log in `README.md`). The "Set page URL: `/library`" instruction below is also stale: the confirmed two-surface architecture (`apps/snooze-website/docs/KICKOFF-DEPLOY-COMPLETION.md`, "Task 1: resolve the library two-surface architecture") makes `/snooze-library` the paste target for this curated page; `/library` is the separate system member-area surface that auto-renders Kajabi's product blocks and must not be relabelled as the Snooze Library. Kept for historical section-numbering reference only.

---

## 📁 File Organization

All library page files are now organized in the `library-page/` folder:

```
library-page/
├── section-01-title.html                    # Section 1: Page Title
├── section-02-category-navigation.html      # Section 2: Category Nav
├── section-03-foundational.html            # Section 3: Foundational (NEW)
├── section-04-age-based.html                # Section 4: Age-Based Modules
├── section-05-sleep-troubleshooting.html    # Section 5: Sleep Troubleshooting (NEW)
├── section-06-perks.html                   # Section 6: Perks
├── section-07-coaching.html                # Section 7: Live Coaching & Replays
├── section-08-consult-booking.html          # Section 8: 1:1 Consult Booking
├── section-09-community.html                # Section 9: Community Access
├── section-10-future-resources.html         # Section 10: Future Resources
├── styles.css                               # Complete CSS for all sections
├── README.md                                # ⭐ Complete documentation
├── DEPLOYMENT-GUIDE.md                      # This file (deployment instructions)
└── INDEX.md                                 # File index
```

---

## 🚀 Quick Deployment

### Step 1: Add CSS
1. Go to **Kajabi Admin → Settings → Theme → Custom CSS**
2. Open `library-page/styles.css`
3. **Copy entire file** and paste at **end** of existing Custom CSS
4. Click **Save**

### Step 2: Create Library Page
1. Go to **Kajabi Admin → Pages**
2. Create new page or edit existing Library page
3. Set page title: "Library" or "Your Snooze Library"
4. Set page URL: `/library` (or your preferred slug)

### Step 3: Add HTML Blocks (In Order)

Add each section as a **Custom HTML Code Block**:

1. **Section 1:** Copy `section-01-title.html` → Paste in Code Block
2. **Section 2:** Copy `section-02-category-navigation.html` → Paste in Code Block
3. **Section 3:** Copy `section-03-foundational.html` → Paste in Code Block
4. **Section 4:** Copy `section-04-age-based.html` → Paste in Code Block
5. **Section 5:** Copy `section-05-sleep-troubleshooting.html` → Paste in Code Block
6. **Section 6:** Copy `section-06-perks.html` → Paste in Code Block
7. **Section 7:** Copy `section-07-coaching.html` → Paste in Code Block
8. **Section 8:** Copy `section-08-consult-booking.html` → Paste in Code Block
9. **Section 9:** Copy `section-09-community.html` → Paste in Code Block
10. **Section 10:** Copy `section-10-future-resources.html` → Paste in Code Block (optional)

---

## 📝 Placeholder Replacement

### Section 3: Foundational - The Snooze Method
**Status:** Coming Soon (placeholder)
- When course is ready, remove "Coming Soon" badge and uncomment CTA
- Replace `[REPLACE_WITH_SNOOZE_METHOD_COURSE_URL]` → Snooze Method course URL

### Section 4: Age-Based Modules
Replace these placeholders for each resource:
- `[REPLACE_WITH_NEWBORN_GUIDE_URL]` → Newborn Guide URL
- `[REPLACE_WITH_NEWBORN_GUIDE_THUMBNAIL_URL]` → Newborn Guide thumbnail image URL
- `[REPLACE_WITH_3-4MONTH_COURSE_URL]` → 3-4 Month Course URL
- `[REPLACE_WITH_3-4MONTH_COURSE_THUMBNAIL_URL]` → 3-4 Month Course thumbnail image URL
- `[REPLACE_WITH_5-12MONTH_GUIDE_URL]` → 5-12 Month Guide URL
- `[REPLACE_WITH_5-12MONTH_GUIDE_THUMBNAIL_URL]` → 5-12 Month Guide thumbnail image URL
- `[REPLACE_WITH_TODDLER_TOOLKIT_URL]` → Toddler Toolkit URL
- `[REPLACE_WITH_TODDLER_TOOLKIT_THUMBNAIL_URL]` → Toddler Toolkit thumbnail image URL

### Section 5: Sleep Troubleshooting
Replace these placeholders for each troubleshooting guide:
- `[REPLACE_WITH_EARLY_RISING_GUIDE_URL]` → Early Rising guide URL
- `[REPLACE_WITH_SLEEP_REGRESSION_GUIDE_URL]` → Sleep Regression guide URL
- `[REPLACE_WITH_NAP_REFUSAL_GUIDE_URL]` → Nap Refusal guide URL
- `[REPLACE_WITH_TRAVEL_GUIDE_URL]` → Travel & Disruption guide URL
- `[REPLACE_WITH_ILLNESS_GUIDE_URL]` → Illness & Teething guide URL
- `[REPLACE_WITH_TECHNIQUE_GUIDES_URL]` → Technique Guides URL

### Section 6: Perks
**Status:** ✅ Ready - All URLs configured
- Recommended Products link configured
- Nap Trapped Podcast YouTube embed configured
- Nap Trapped Caps discount link configured

### Section 7: Live Coaching & Replays
- `[REPLACE_WITH_SNOOZE_VILLAGE_RECORDINGS_URL]` → Snooze Village recordings URL
  - Example: `https://joinsnooze.com/products/communities/v2/snooze/meetups/recordings`

### Section 8: 1:1 Consult Booking
- `[REPLACE_WITH_CONSULT_BOOKING_URL]` → Consult checkout/booking URL
- `[REPLACE_WITH_LAUNCH_END_DATE]` → Launch end date (e.g., "December 31, 2025") or remove if not needed

### Section 9: Community
- `[REPLACE_WITH_COMMUNITY_URL]` → Facebook group URL or Kajabi community link

---

## ✅ Section Overview

| Section | File | Status | Placeholders |
|---------|------|--------|--------------|
| 1. Title | `section-01-title.html` | ✅ Ready | None |
| 2. Category Nav | `section-02-category-navigation.html` | ✅ Ready | None (links configured) |
| 3. Foundational | `section-03-foundational.html` | ⚠️ Coming Soon | 1 course URL (when ready) |
| 4. Age-Based | `section-04-age-based.html` | ⚠️ Needs URLs | 4 resource URLs + 4 thumbnail URLs |
| 5. Troubleshooting | `section-05-sleep-troubleshooting.html` | ⚠️ Needs URLs | 6 troubleshooting guide URLs |
| 6. Perks | `section-06-perks.html` | ✅ Ready | None |
| 7. Coaching | `section-07-coaching.html` | ⚠️ Needs URL | 1 Snooze Village recordings URL |
| 8. Consult | `section-08-consult-booking.html` | ⚠️ Needs URL | 1 booking URL + launch end date |
| 9. Community | `section-09-community.html` | ⚠️ Needs URL | 1 community URL |
| 10. Future | `section-10-future-resources.html` | ✅ Ready | None (placeholders) |

---

## 🎯 Current Resources

### Main Courses/Guides (4)
1. Newborn Sleep Guide
2. 3-4 Month Sleep Course
3. 5-12 Month Sleep Guide
4. Toddler Sleep Toolkit

### Sleep Troubleshooting (6 guides)
- Early Rising Support
- Sleep Regression Guidance
- Nap Refusal Help
- Travel & Disruption Strategies
- Illness & Teething Support
- Technique Guides

### Tools (9+)
- Checklists (3+)
- Scripts & Phrases (3+)
- Sample Schedules (3+)

---

## 🔗 Category Navigation Links

The category navigation (Section 2) links to page anchors:
- **Home** → `#library-home` (Section 1)
- **Foundational** → `#foundational` (Section 3 - coming soon)
- **By Age** → `#age-based` (Section 4)
- **Troubleshooting** → `#troubleshooting` (Section 5)
- **Perks** → `#perks` (Section 6)
- **Coaching** → `#coaching` (Section 7)
- **1:1 Consult** → `#consult` (Section 8)
- **Community** → External link (Facebook group)
- **Podcast** → `#podcast` (Section 10 - coming soon)
- **Q&A** → `#qa` (Section 10 - coming soon)
- **AI Help** → `#snoozebot` (Section 10 - coming soon)

---

## 📱 Responsive Design

All sections are fully responsive:
- **Mobile:** Single column, stacked layout
- **Tablet:** 2-3 columns
- **Desktop:** 3-4 columns

---

## 🧪 Testing Checklist

- [ ] CSS added to Kajabi Custom CSS
- [ ] All 8 HTML blocks added in correct order
- [ ] All placeholders replaced with actual content
- [ ] Category navigation links work (scroll to sections)
- [ ] Resource cards link to correct pages
- [ ] Video thumbnails display correctly
- [ ] Mobile responsive (test on phone)
- [ ] Tablet layout looks good
- [ ] Desktop layout looks good
- [ ] Hover states work
- [ ] Coming soon items are greyed out
- [ ] External links open in new tab

---

## 📚 Additional Documentation

- **README.md** - Detailed structure and design documentation
- **README.md** - Complete documentation
- **DEPLOYMENT-GUIDE.md** - This file (complete deployment instructions)

---

**Ready to deploy!** Follow the steps above and replace all placeholders with your actual resource URLs.

