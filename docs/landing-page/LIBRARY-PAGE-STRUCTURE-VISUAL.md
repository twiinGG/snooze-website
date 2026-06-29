# Snooze Library Page - Visual Structure

**Quick Reference:** Visual layout structure for implementation

---

## Page Flow (Top to Bottom)

```
┌─────────────────────────────────────────────────┐
│ HEADER (Existing)                                │
│ Logo | Nav Links | CTA Button                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 1: Page Title & Intro                   │
│ "Your Snooze Library"                           │
│ "Everything you need for great baby sleep..."   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 2: Category Navigation                  │
│ [Home] [By Age] [Courses] [Tools] [Coaching]   │
│ [Community] [Podcast] [Q&A] [AI Help]          │
│ (Horizontal scrollable on mobile)               │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 3: Jump Back In                         │
│ "Pick up right where you left off"              │
│ ┌─────────────────────────────────────────┐   │
│ │ [COURSE] 3-4 Month Sleep Course          │   │
│ │ Understanding the four-month regression  │   │
│ │ 45 MIN →                                 │   │
│ └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 4: Featured Resources                   │
│ "Start Here: Essential Resources"              │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│ │Card 1│ │Card 2│ │Card 3│ │Card 4│          │
│ └──────┘ └──────┘ └──────┘ └──────┘          │
│ (3-4 columns desktop, 1 column mobile)         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 5: Browse by Age                        │
│ "Find resources tailored to your baby's age"   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│ │Newborn│ │3-4mo │ │5-12mo│ │Toddler│         │
│ └──────┘ └──────┘ └──────┘ └──────┘          │
│ (4 columns desktop, stacked mobile)            │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 6: Tools & Quick Resources              │
│ "Downloadable checklists, scripts, and tools"    │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│ │Check │ │Script│ │Sched │ │Quick │          │
│ │lists │ │s     │ │ules  │ │Guides│          │
│ └──────┘ └──────┘ └──────┘ └──────┘          │
│ (4 columns desktop, 2 columns mobile)           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 7: Live Sessions                        │
│ "Q&A sessions and live calls with Sally and Bec" │
│ ┌──────┐ ┌──────┐ ┌──────┐                    │
│ │Video1│ │Video2│ │Video3│                    │
│ └──────┘ └──────┘ └──────┘                    │
│ (3 columns desktop, 1 column mobile)             │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 8: Community Access                      │
│ "Join Your Snooze Parenting Village"            │
│ ┌─────────────────────────────────────────┐   │
│ │ Large CTA Card                          │   │
│ │ "Access Snooze Village"                 │   │
│ └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SECTION 9: Future Resources (Placeholders)       │
│ - Q&A Database (Future)                         │
│ - Snoozebot (Future)                            │
│ - Nap Trapped Database (Future)                 │
│ - Webinar Recordings (Future)                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ FOOTER (Existing)                               │
│ Logo | Links | Social | Copyright               │
└─────────────────────────────────────────────────┘
```

---

## Card Structure (Standard)

```
┌─────────────────────────────────────────┐
│ [BADGE: COURSE/GUIDE/TOOL]              │
│                                         │
│ [Icon]                                  │
│                                         │
│ Title: "Resource Name"                  │
│                                         │
│ Description: "What this resource       │
│ covers and who it's for..."            │
│                                         │
│ Duration: "45 MIN" (if applicable)     │
│                                         │
│ [→ View Resource]                      │
└─────────────────────────────────────────┘
```

---

## Category Navigation Structure

```
Desktop:
[Home] [By Age] [Courses] [Tools] [Coaching] [Community] [Podcast] [Q&A] [AI Help]

Mobile:
[Home] [By Age] [Courses] [Tools] [Coaching] [→]
(Scrollable horizontally)
```

---

## Age-Based Organization

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Newborn    │ │   3-4 Months  │ │  5-12 Months │ │   Toddler    │
│  (0-3 months)│ │              │ │              │ │  (12+ months) │
│              │ │              │ │              │ │              │
│ [Icon]       │ │ [Icon]       │ │ [Icon]       │ │ [Icon]       │
│              │ │              │ │              │ │              │
│ Description  │ │ Description  │ │ Description  │ │ Description  │
│              │ │              │ │              │ │              │
│ 3 guides     │ │ 1 course     │ │ 1 guide      │ │ 1 toolkit   │
│ 2 tools      │ │ 2 guides     │ │ 4 tools      │ │ 3 guides    │
│              │ │ 3 tools      │ │ 2 checklists │ │              │
│              │ │              │ │              │ │              │
│ [View →]     │ │ [View →]     │ │ [View →]     │ │ [View →]     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column layouts
- Horizontal scroll for categories
- Stacked cards
- Full-width buttons
- Tighter spacing

### Tablet (768px - 1024px)
- 2-3 column grids
- Standard navigation
- Medium card sizes
- Standard spacing

### Desktop (> 1024px)
- 3-4 column grids
- Full navigation visible
- Larger cards
- Generous spacing

---

## Color Usage

- **Coral (#F43357):** Badges, CTAs, active states, accents
- **Navy (#1F293B):** Headings, primary text
- **Cream (#FAF7F4):** Background, card backgrounds
- **Sage (#7C8A98):** Secondary text, metadata
- **Beige (#F2EDEA):** Borders, subtle backgrounds

---

## Typography Hierarchy

```
H1: "Your Snooze Library" (Georgia, 2.5rem)
H2: Section titles (Georgia, 2rem)
H3: Card titles (Georgia, 1.5rem)
Body: Descriptions (System font, 1rem)
Small: Metadata, durations (System font, 0.875rem)
```

---

## Implementation Priority

### Phase 1 (Launch)
1. ✅ Page title & intro
2. ✅ Category navigation
3. ✅ Jump Back In
4. ✅ Featured Resources
5. ✅ Browse by Age
6. ✅ Tools & Quick Resources
7. ✅ Live Sessions
8. ✅ Community Access

### Phase 2 (Future)
- Q&A Database section
- Snoozebot section
- Nap Trapped Database section
- Webinar Recordings section

---

**Quick Reference:** Use this visual guide alongside the detailed layout document for implementation.

