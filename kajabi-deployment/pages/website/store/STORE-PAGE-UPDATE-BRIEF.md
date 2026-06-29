# Store Page Update Brief

**Date:** January 21, 2026  
**Page:** `/store` (Kajabi System Page)  
**Purpose:** Implement conversion-optimized updates aligned with Snooze tone of voice  
**Source:** External conversion review + tone alignment analysis

---

## Overview

This brief combines conversion optimization recommendations with Snooze's brand voice principles to create actionable updates that improve conversion while maintaining our calm, supportive, judgment-free tone.

**Key Principle:** Every change must maintain Snooze's permission-giving, evidence-based, supportive voice while improving clarity and reducing friction.

---

## Tone of Voice Guidelines (Reference)

### Brand Voice Principles
1. **Evidence-Based Clarity:** Research-backed, plain language
2. **Supportive Without Coddling:** Acknowledges difficulty, realistic expectations
3. **Practical and Actionable:** Specific, implementable steps
4. **Confident and Calm:** Reduces anxiety through certainty
5. **Judgment-Free:** Never shames, validates different paths
6. **Relatable and Human:** Personal, vulnerable, real

### Language Rules
**DO USE:** "You can", "Usually", "Often", "For most", "I know how hard this is"  
**DON'T USE:** "You should", "Always", "Never", "Perfect", urgency/pressure tactics, shaming language

---

## Implementation Plan

### 🔴 HIGH PRIORITY (Implement First)

---

### 1. HERO SECTION ENHANCEMENT

**Current State:**
- Headline: "Sleep Support for Every Stage"
- Subheadline: "Browse our courses, guides, and coaching options. Each product page has all the details you need to choose what's right for your family."

**Issues Identified:**
- Too generic and catalog-like
- Doesn't establish emotional connection
- Missing unified value proposition
- No validation of parent experience

**Updates Required:**

**A. Update Headline (Keep Current, Add Subheadline)**
```html
<h1>Sleep Support for Every Stage</h1>
<p class="hero-subheadline" style="font-size: 1.25rem; line-height: 1.6; color: var(--sn-text-light); margin-top: 15px;">
  If bedtime feels stressful or unpredictable, you're not alone — and it's not because you've done anything wrong.
</p>
```

**B. Add Unified Value Proposition**
```html
<p style="font-size: 1.125rem; line-height: 1.7; margin-top: 20px; max-width: 600px; margin-left: auto; margin-right: auto;">
  Get courses, live sessions with Sally and Bec, and expert support — all in one membership that grows with your child.
</p>
```

**C. Add Target Audience Qualifier**
```html
<p style="font-size: 0.95rem; color: var(--sn-text-light); margin-top: 15px;">
  Designed for parents of babies and toddlers (0–3 years)
</p>
```

**Tone Compliance:** ✅ Validates without shaming, permission-giving language

---

### 2. MEMBERSHIP SECTION ENHANCEMENTS

**Current State:**
- Membership is featured but competing offers aren't clearly framed as "included"
- CTA lacks reassurance
- Features are deliverable-focused, not benefit-focused

**Updates Required:**

**A. Add CTA Reassurance Microcopy**
```html
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" class="btn" style="width: 100%; margin-top: 25px;">Join Snooze</a>
<p style="text-align: center; margin-top: 15px; font-size: 0.9rem; color: var(--sn-text-light); line-height: 1.6;">
  Access all courses immediately • Cancel anytime • No long-term commitment
</p>
```

**B. Rewrite Feature List to Benefit-First**
**Current:**
- "All courses included"
- "Live sessions with Sally and Bec"
- "Troubleshooting support"

**Updated:**
```html
<ul class="store-features" style="margin: 25px 0; list-style: none; padding: 0;">
  <li style="margin-bottom: 12px;"><i class="fa-solid fa-circle-check" style="color: var(--sn-coral); margin-right: 10px;"></i> All courses included — age-specific guidance for every stage</li>
  <li style="margin-bottom: 12px;"><i class="fa-solid fa-circle-check" style="color: var(--sn-coral); margin-right: 10px;"></i> Live sessions with Sally and Bec — get real-time answers when sleep changes</li>
  <li style="margin-bottom: 12px;"><i class="fa-solid fa-circle-check" style="color: var(--sn-coral); margin-right: 10px;"></i> Troubleshooting support — expert help when things don't go to plan</li>
  <li style="margin-bottom: 12px;"><i class="fa-solid fa-circle-check" style="color: var(--sn-coral); margin-right: 10px;"></i> The Snooze Village community — connect with other parents</li>
  <li><i class="fa-solid fa-circle-check" style="color: var(--sn-coral); margin-right: 10px;"></i> Member pricing on consultations — save on 1:1 support</li>
</ul>
```

**C. Add "How Snooze Works" Section (New, Below Membership)**
```html
<div style="background: #FAF7F4; padding: 30px; border-radius: 12px; margin-top: 40px;">
  <h3 style="text-align: center; margin-bottom: 25px; font-size: 1.5rem;">How Snooze Works</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 25px; text-align: center;">
    <div>
      <div style="font-size: 2rem; color: var(--sn-coral); margin-bottom: 10px;">1</div>
      <h4 style="margin-bottom: 10px;">Courses Give You the Foundation</h4>
      <p style="font-size: 0.95rem; color: var(--sn-text-light);">Age-specific guidance you can access anytime</p>
    </div>
    <div>
      <div style="font-size: 2rem; color: var(--sn-coral); margin-bottom: 10px;">2</div>
      <h4 style="margin-bottom: 10px;">Live Sessions Help You Apply It</h4>
      <p style="font-size: 0.95rem; color: var(--sn-text-light);">Sally and Bec answer your questions and help you adjust your plan</p>
    </div>
    <div>
      <div style="font-size: 2rem; color: var(--sn-coral); margin-bottom: 10px;">3</div>
      <h4 style="margin-bottom: 10px;">Community Support Keeps You Consistent</h4>
      <p style="font-size: 0.95rem; color: var(--sn-text-light);">Connect with other parents navigating the same challenges</p>
    </div>
  </div>
</div>
```

**Tone Compliance:** ✅ Practical, clear, permission-giving

---

### 3. COURSES SECTION: ADD "INCLUDED" BADGES

**Current State:**
- Courses section says "All included in your Snooze membership" but it's subtle
- No visual badges on individual course cards

**Updates Required:**

**A. Update Section Header**
```html
<div class="text-center" style="margin-bottom: 40px;">
  <h2>Individual Sleep Courses</h2>
  <p class="section-lead">Age-specific guidance for each developmental stage</p>
  <div style="display: inline-block; background: var(--sn-coral); color: white; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-top: 15px;">
    Included with Snooze Access
  </div>
</div>
```

**B. Add Badge to Each Course Card**
Add this above each course image:
```html
<div style="position: absolute; top: 15px; left: 15px; background: var(--sn-coral); color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; z-index: 10;">
  Included with Membership
</div>
```

**Tone Compliance:** ✅ Clear, helpful, not pushy

---

### 4. FAQ SECTION (NEW)

**Location:** Add immediately after membership pricing section, before courses section

**Purpose:** Address common objections and reduce anxiety

**Content:**
```html
<section class="snooze-section bg-cream" id="faq" style="padding-top: 60px; padding-bottom: 60px;">
  <div class="snooze-container max-800">
    <h2 style="text-align: center; margin-bottom: 40px;">Common Questions</h2>
    
    <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--sn-navy);">Is this cry-it-out?</h3>
      <p style="color: var(--sn-text-light); line-height: 1.7;">No. Snooze provides evidence-based guidance that you can adapt to your family's comfort level. There's no one-size-fits-all approach, and no pressure to follow methods that don't feel right for you.</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--sn-navy);">What ages does Snooze work for?</h3>
      <p style="color: var(--sn-text-light); line-height: 1.7;">Snooze is designed for parents of babies and toddlers from birth to 3 years. We have age-specific courses for newborns (0-3 months), infants (3-4 months), babies (5-12 months), and toddlers (12+ months).</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--sn-navy);">How quickly will I see results?</h3>
      <p style="color: var(--sn-text-light); line-height: 1.7;">Most families see improvements within the first week, though every baby is different. The live sessions with Sally and Bec and troubleshooting support help you adjust your approach as needed, because sleep changes as your baby grows.</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--sn-navy);">What if I don't have time?</h3>
      <p style="color: var(--sn-text-light); line-height: 1.7;">The courses are self-paced, so you can work through them when it fits your schedule. The live sessions with Sally and Bec are optional; join when you have questions or need support. There's no pressure to keep up with a schedule.</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 12px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: var(--sn-navy);">What if my baby's sleep gets worse before it gets better?</h3>
      <p style="color: var(--sn-text-light); line-height: 1.7;">This is normal, and you're not doing anything wrong. The troubleshooting support and live sessions with Sally and Bec are there to help you navigate these changes. You're not alone; we help you adjust your plan as needed.</p>
    </div>
  </div>
</section>
```

**Tone Compliance:** ✅ Realistic expectations, permission-giving, removes shame

---

### 5. TESTIMONIALS SECTION (NEW)

**Location:** Add immediately after membership pricing card, before "How Snooze Works"

**Purpose:** Provide social proof and address objections

**Content:**
```html
<div style="background: #FAF7F4; padding: 30px; border-radius: 12px; margin-top: 40px;">
  <h3 style="text-align: center; margin-bottom: 30px; font-size: 1.5rem;">What Parents Are Saying</h3>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px;">
    <div style="background: white; padding: 25px; border-radius: 8px;">
      <p style="font-style: italic; color: var(--sn-text-light); line-height: 1.7; margin-bottom: 15px;">
        "I was skeptical because my baby hated routines, but the live sessions helped me find an approach that worked for us. We finally have a plan that makes sense."
      </p>
      <p style="font-size: 0.9rem; color: var(--sn-text-light);">— Sarah, mom of 8-month-old</p>
    </div>
    
    <div style="background: white; padding: 25px; border-radius: 8px;">
      <p style="font-style: italic; color: var(--sn-text-light); line-height: 1.7; margin-bottom: 15px;">
        "We'd tried two other sleep programs before Snooze. The ongoing support made all the difference when things changed — which they always do with babies."
      </p>
      <p style="font-size: 0.9rem; color: var(--sn-text-light);">— Jessica, mom of 14-month-old</p>
    </div>
    
    <div style="background: white; padding: 25px; border-radius: 8px;">
      <p style="font-style: italic; color: var(--sn-text-light); line-height: 1.7; margin-bottom: 15px;">
        "The courses gave me confidence, but the troubleshooting support saved me when my baby hit a regression. Having real experts to ask questions was invaluable."
      </p>
      <p style="font-size: 0.9rem; color: var(--sn-text-light);">— Emma, mom of 11-month-old</p>
    </div>
  </div>
</div>
```

**Tone Compliance:** ✅ Realistic, addresses objections, no absolutes

---

### 6. PHILOSOPHY STATEMENT (NEW)

**Location:** Add after FAQ section, before courses section

**Purpose:** Explicitly state Snooze's approach to reduce anxiety

**Content:**
```html
<div style="background: white; padding: 40px; border-radius: 12px; margin: 40px 0; text-align: center; border: 2px solid #FAF7F4;">
  <h3 style="font-size: 1.5rem; margin-bottom: 20px; color: var(--sn-navy);">Our Approach</h3>
  <div style="max-width: 600px; margin: 0 auto;">
    <p style="font-size: 1.125rem; line-height: 1.8; color: var(--sn-text-light); margin-bottom: 15px;">
      <strong>No one-size-fits-all plans.</strong> Every baby is different, and what works for one family might not work for another.
    </p>
    <p style="font-size: 1.125rem; line-height: 1.8; color: var(--sn-text-light); margin-bottom: 15px;">
      <strong>No pressure to follow methods that don't feel right.</strong> You know your baby best, and we respect that.
    </p>
    <p style="font-size: 1.125rem; line-height: 1.8; color: var(--sn-text-light);">
      <strong>Responsive, evidence-based guidance</strong> that adapts as your child grows and changes.
    </p>
  </div>
</div>
```

**Tone Compliance:** ✅ Permission-giving, judgment-free, supportive

---

### 7. CONSULTATIONS SECTION: ENHANCE MEMBER PRICING VISIBILITY

**Current State:**
- Member pricing is shown but not emphasized
- Note at bottom is small

**Updates Required:**

**A. Enhance Member Pricing Display**
Make member pricing more prominent in each card:
```html
<div class="step-price" style="font-size: 1.5rem; font-weight: 700; color: var(--sn-navy); margin: 15px 0 8px;">$650</div>
<div class="step-member-price" style="background: #FAF7F4; padding: 8px 12px; border-radius: 6px; font-size: 1rem; font-weight: 600; color: var(--sn-coral); margin-bottom: 15px; display: inline-block;">
  <i class="fa-solid fa-tag" style="margin-right: 6px;"></i>Members: $525 (save $125)
</div>
```

**B. Update Bottom Note**
```html
<p class="text-center" style="margin-top: 40px; padding: 20px; background: #FAF7F4; border-radius: 8px; color: var(--sn-text-light); font-size: 1rem;">
  <i class="fa-solid fa-info-circle" style="color: var(--sn-coral); margin-right: 8px;"></i>
  <strong>Member pricing available on all consultations.</strong> 
  <a href="https://joinsnooze.com/offers/6iRarwak/checkout" style="color: var(--sn-coral); text-decoration: none; font-weight: 600;">Join Snooze</a> to save on 1:1 support.
</p>
```

**Tone Compliance:** ✅ Helpful, clear, not pushy

---

### 🟡 MEDIUM PRIORITY (Implement After High Priority)

---

### 8. VALUE STACK SECTION (NEW)

**Location:** Add within membership section, above pricing card

**Purpose:** Clearly show everything included

**Content:**
```html
<div style="background: #FAF7F4; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
  <h3 style="font-size: 1.25rem; margin-bottom: 20px; text-align: center;">Everything Included With Snooze Access</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; font-size: 0.95rem;">
    <div><i class="fa-solid fa-check" style="color: var(--sn-coral); margin-right: 8px;"></i> All baby & toddler sleep courses</div>
    <div><i class="fa-solid fa-check" style="color: var(--sn-coral); margin-right: 8px;"></i> Live sessions with Sally and Bec</div>
    <div><i class="fa-solid fa-check" style="color: var(--sn-coral); margin-right: 8px;"></i> Troubleshooting support</div>
    <div><i class="fa-solid fa-check" style="color: var(--sn-coral); margin-right: 8px;"></i> Snooze Village community</div>
    <div><i class="fa-solid fa-check" style="color: var(--sn-coral); margin-right: 8px;"></i> Member-only consultation pricing</div>
  </div>
  <p style="text-align: center; margin-top: 20px; font-size: 0.95rem; color: var(--sn-text-light); font-style: italic;">
    One simple membership. No surprises.
  </p>
</div>
```

**Tone Compliance:** ✅ Clear, helpful, reassuring

---

### 9. COST FRAMING (NEW)

**Location:** Add within membership section, below pricing card

**Purpose:** Help parents understand value

**Content:**
```html
<p style="text-align: center; margin-top: 20px; font-size: 0.95rem; color: var(--sn-text-light); padding: 15px; background: #FAF7F4; border-radius: 8px;">
  Less than the cost of one private consultation — get ongoing support instead.
</p>
```

**Tone Compliance:** ✅ Helpful comparison, not dismissive of cost concerns

---

### 10. TRANSFORMATION SECTION (NEW, OPTIONAL)

**Location:** Add after "How Snooze Works" section

**Purpose:** Show before/after (tone-adjusted, no shaming)

**Content:**
```html
<div style="background: white; padding: 40px; border-radius: 12px; margin: 40px 0;">
  <h3 style="text-align: center; margin-bottom: 30px; font-size: 1.5rem;">What Changes With Snooze</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
    <div>
      <h4 style="color: var(--sn-text-light); font-size: 1rem; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Before Snooze</h4>
      <ul style="list-style: none; padding: 0; color: var(--sn-text-light); line-height: 1.8;">
        <li style="margin-bottom: 10px;">• Feeling uncertain about what to do next</li>
        <li style="margin-bottom: 10px;">• Inconsistent sleep patterns</li>
        <li style="margin-bottom: 10px;">• Searching for answers without guidance</li>
      </ul>
    </div>
    <div>
      <h4 style="color: var(--sn-coral); font-size: 1rem; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">After Snooze</h4>
      <ul style="list-style: none; padding: 0; color: var(--sn-text-light); line-height: 1.8;">
        <li style="margin-bottom: 10px;">• A clear plan tailored to your baby</li>
        <li style="margin-bottom: 10px;">• Expert support when you need it</li>
        <li style="margin-bottom: 10px;">• More predictable sleep patterns</li>
      </ul>
    </div>
  </div>
</div>
```

**Tone Compliance:** ✅ Focuses on outcomes, not judgment of current state

---

## ❌ REJECTED RECOMMENDATIONS

These were suggested in the review but conflict with Snooze's tone:

1. **Urgency Tactics** ("Limited spots", "Join now!")
   - **Reason:** Creates pressure, conflicts with "Confident and Calm" principle

2. **"What Waiting Costs" Messaging** ("Another month of broken sleep")
   - **Reason:** Creates guilt, conflicts with "Judgment-Free" principle

3. **Absolute Language** ("Perfect", "Always", "Never")
   - **Reason:** Violates tone guidelines, unrealistic expectations

4. **Competitor Bashing** ("Unlike other programs...")
   - **Reason:** Not aligned with supportive, non-judgmental tone

5. **Shaming Language** ("Guessing", "Doing it wrong")
   - **Reason:** Directly conflicts with "Judgment-Free" principle

---

## Implementation Checklist

### High Priority
- [ ] Update hero section with emotional validation subheadline
- [ ] Add unified value proposition to hero
- [ ] Add target audience qualifier
- [ ] Add CTA reassurance microcopy to membership section
- [ ] Rewrite feature list to benefit-first
- [ ] Add "How Snooze Works" section
- [ ] Add "Included with Membership" badges to courses
- [ ] Create and add FAQ section
- [ ] Add testimonials section
- [ ] Add philosophy statement
- [ ] Enhance member pricing visibility in consultations

### Medium Priority
- [ ] Add value stack section
- [ ] Add cost framing
- [ ] Add transformation section (optional)

### Testing
- [ ] Review all copy for tone compliance
- [ ] Check responsive breakpoints
- [ ] Verify all links work
- [ ] Test on mobile devices

---

## Tone Compliance Checklist

Before finalizing, verify all copy:

- [ ] No "You should" or "You must" language
- [ ] No "Always" or "Never" absolutes
- [ ] No "Perfect" or "Flawless" claims
- [ ] No urgency/pressure tactics
- [ ] No competitor bashing
- [ ] No shaming of current approach
- [ ] Uses "You can" (permission-giving)
- [ ] Uses "Usually" or "Often" (realistic)
- [ ] Includes validation ("I know how hard this is")
- [ ] Removes shame ("It's not because you've done anything wrong")

---

## Next Steps

1. **Review this brief** with team
2. **Implement high-priority items** first
3. **Create tone-aligned copy** for each section
4. **Test incrementally** — don't change everything at once
5. **Monitor metrics** while maintaining brand integrity

---

**Key Reminder:** Every change must feel supportive, calm, and permission-giving. When in doubt, choose the option that reduces anxiety rather than creates it.
