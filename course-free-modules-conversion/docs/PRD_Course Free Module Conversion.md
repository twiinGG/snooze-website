# PRD: Course Free Module Conversion (Master)

**Document Status:** Approved  
**Last Updated:** January 16, 2026  
**Project Lead:** Sally (Content) / Product Team (Tech)  

---

## 1. Executive Summary

**Objective:** Transform the top-of-funnel strategy from a generic "course sample" to precise, problem-specific **Free Modules** that solve a single, urgent pain point. This builds immediate trust and positions Snooze as the long-term continuity partner.

**Core Strategy:**  
Parents don't wake up wanting to "buy a course"; they wake up wanting to fix **naps**, **schedules**, or **night feeds**. We give them that specific solution for free, then upsell the complete system (Course) or ongoing support (Snooze Membership) for the long haul.

**The "Snooze Pivot":**  
- **Free Module:** Solves the acute pain (the "Band-Aid").
- **Full Course:** Provides the complete plan for this age stage (the "Cure").
- **Snooze Membership:** Provides ongoing support for future changes (the "Health Plan").

---

## 2. Product Architecture (Kajabi)

Each "Free Module" is a separate Product in Kajabi, cloned from the respective canon age-based Course but restricted to specific content.

### 2.1 The Free Module Variants
We are expanding the strategy to cover all core age-based courses with 3 targeted variants each (12 total). Each variant targets a specific, high-intent pain point identified through RAG analysis.

| Course | Variant Name | Target Problem | Unlocked Content | Code |
| :--- | :--- | :--- | :--- | :--- |
| **Newborn** | **NB Dream Feed** | Feed Spacing | Feed Foundations & Dream Feed | `LMCR07` |
| **Newborn** | **NB Wake Windows** | Overtiredness | Wake Windows By Age | `LMCR10` |
| **Newborn** | **NB Unswaddle** | Swaddle Transitions | The Swaddle & Safe Sleep | `LMCR11` |
| **3-4 Month**| **3-4M Feed or Resettle**| Overnight feed decisions | Overnight Feeds and Resettling (Module 9) | `LMCR08` |
| **3-4 Month**| **3-4M Regression**| Hourly wakes | Understanding the 4M Changes | `LMCR12` |
| **3-4 Month**| **3-4M Settling**| No independent sleep| Settling Techniques | `LMCR13` |
| **5-12 Month**| **Schedules** | Chaos | Module 3: Routines | `LMCR04` |
| **5-12 Month**| **Feeds** | Frequent waking | Module 3: Feeding & Weaning | `LMCR05` |
| **5-12 Month**| **Naps** | Catnapping | Module 5: Nap Training | `LMCR06` |
| **Toddler** | **18M Regression**| Bedtime battles | The 18-Month Regression | `LMCR09` |
| **Toddler** | **2-1 Nap Drop** | 2-1 Transition | The Transitional Schedule | `LMCR14` |
| **Toddler** | **2Y Regression** | Nap Refusal | The 2-Year Regression | `LMCR15` |

### 2.2 Product Structure (In-Course Experience)
Every Free Module product follows this exact structure:

1.  **Orientation Lesson (Modified):**
    *   **Position:** First visible lesson.
    *   **Content:** Custom welcome video/text that frames expectations. "This solves [Specific Issue], but sleep is a holistic puzzle."
    *   **Tone:** Advisory, supportive, non-salesy.
2.  **The Unlocked Module:**
    *   **Content:** The *actual* high-value lessons from the paid course. No "lite" versions.
    *   **Status:** Published and fully accessible.
3.  **The Paywall (Locked Content):**
    *   **Mechanism:** Native Kajabi paywall appearing after the unlocked module.
    *   **Content:** All other modules (Modules 1, 2, 4, 6) are visible but locked.
    *   **Interaction:** Clicking a locked lesson triggers the **Paywall Modal**.

---

## 3. Offer & Funnel Configuration

### 3.1 Use Case & Registration
These offers are "Ghost Offers" (hidden from store, used for opt-ins).

*   **Price:** Free.
*   **Access Duration:** Lifetime (for the free module).
*   **Checkout:** Skips cart (direct grant).
*   **Post-Purchase:** Grants access → Subscribes to specific Email Campaign.

### 3.2 Offer Codes & Titles
*   **NB Dream Feed:** `LMCR07_NB-DREAM-FEED` (Code: `LMCR07`)
*   **NB Wake Windows:** `LMCR10_NB-WAKE-WINDOWS` (Code: `LMCR10`)
*   **NB Unswaddle:** `LMCR11_NB-UNSWADDLE` (Code: `LMCR11`)
*   **3-4M Feed or Resettle:** `LMCR08_3-4M-FEED-RESETTLE` (Code: `LMCR08`)
*   **3-4M Regression:** `LMCR12_3-4M-REGRESSION` (Code: `LMCR12`)
*   **3-4M Settling:** `LMCR13_3-4M-SETTLING` (Code: `LMCR13`)
*   **5-12M Schedules:** `LMCR04_5-12M-SCHEDULES` (Code: `LMCR04`)
*   **5-12M Feeds:** `LMCR05_5-12M-FEEDS` (Code: `LMCR05`)
*   **5-12M Naps:** `LMCR06_5-12M-NAPS` (Code: `LMCR06`)
*   **18M Regression:** `LMCR09_TD-18M-REGRESSION` (Code: `LMCR09`)
*   **2-1 Nap Drop:** `LMCR14_TD-2-1-NAP-DROP` (Code: `LMCR14`)
*   **2Y Regression:** `LMCR15_TD-2Y-REGRESSION` (Code: `LMCR15`)

---

## 4. Automation & Email Campaigns

We use a **Split Campaign Strategy** (no complex Liquid logic) to ensure hyper-relevant messaging for each pain point.

### 4.1 Sequence Structure (4 Emails)
All sequences follow the same psychological arc but use ICA-specific copy.

*   **Day 0 (Immediate):** Access + Empathy. "Here is your solution."
*   **Day 2 (Value Add):** "Why fixing [Problem] is only Step 1." (The Bigger Picture).
*   **Day 4 (The Pivot):** "The Grown-Up Choice." Introduction to the Full Course vs. Snooze Membership.
*   **Day 6 (Nudge):** Gentle reminder to choose a path.

### 4.2 Campaign Registry
*   **NB Dream Feed:** `EMLM07` - Focuses on "The feeding foundation."
*   **NB Wake Windows:** `EMLM10` - Focuses on "The overtiredness trap."
*   **NB Unswaddle:** `EMLM11` - Focuses on "Safety & transitions."
*   **3-4M Feed or Resettle:** `EMLM08` - Focuses on "Knowing when to feed vs resettle."
*   **3-4M Regression:** `EMLM12` - Focuses on "Understanding the leap."
*   **3-4M Settling:** `EMLM13` - Focuses on "The first self-settle."
*   **5-12M Schedules:** `EMLM04` - Focuses on "Mastering your day."
*   **5-12M Feeds:** `EMLM05` - Focuses on "Reclaiming your nights."
*   **5-12M Naps:** `EMLM06` - Focuses on "Solving catnapping."
*   **18M Regression:** `EMLM09` - Focuses on "Boundary setting."
*   **2-1 Nap Drop:** `EMLM14` - Focuses on "The 2-1 Bridge."
*   **2Y Regression:** `EMLM15` - Focuses on "The toddler 'no'."

### 4.3 Exit/Exclusion Rules
**Global Rule:** If a user purchases **Any Paid Offer** (Course or Membership), they must be **immediately unsubscribed** from all Lead Campaigns (`EMLM04`, `EMLM05`, `EMLM06`).

---

## 5. Copy & Content Assets

### 5.0 File Naming Convention (CRITICAL)
**ALL files within each bundle MUST use the bundle code prefix:**
- **Format:** `LMCR##-filename.html` (e.g., `LMCR04-thank-you-access.html`)
- **Applies to:** HTML blocks, email templates, and all bundle-specific assets
- **Location:** `src/content/bundles/LMCR##/html/` and `src/content/bundles/LMCR##/emails/`
- **Rationale:** Enables easy identification, archiving, and management. When a bundle is retired, all files with the prefix can be confidently archived together.

**Examples:**
- `LMCR04-thank-you-access.html`
- `LMCR04-free-module-summary-upsell.html`
- `LMCR04-module-1-lesson-1-schedules.html`
- `LMCR04-day-0-welcome.html`
- `LMCR04-day-4-snooze-pivot.html`

### 5.1 Orientation Lesson Copy (Source of Truth)
*See `src/content/shared/templates/orientation-lesson.md` for full text.*

**Key Messaging:**
> "I’m so glad you’re here. You’ve accessed this Free Module because you have a specific challenge right now... My goal is simple: to give you a real, high-value solution for that one piece of the puzzle."

### 5.2 Paywall Modal Copy (Source of Truth)
*See `src/content/docs/PAYWALL-MODAL-COPY.md` for full text.*

*   **Header:** Unlock the Full 5-12 Month Course
*   **Body:** "Get instant access to every module, lesson, and guide in the Sleep Training Course to move from survival mode to predictable sleep."
*   **Call to Action:** "Unlock Full Access" -> Links to **UPCR04** (Upsell Offer).

### 5.3 In-Course CTAs (Buttons)
At the bottom of the unlocked module, place two distinct buttons:

1.  **"Continue with the full course"**
    *   **Link:** `UPCR04` Checkout Page.
    *   **Context:** For parents who want the plan "done for them."
2.  **"Get full access inside Snooze"**
    *   **Link:** Snooze Membership Checkout.
    *   **Context:** For parents who want ongoing support/community.

---

## 6. Technical Implementation Checklist

### Phase 1: Product Build
- [ ] Clone 5-12M Course 3 times.
- [ ] Rename clones: `Schedules Free Module`, `Feeds Free Module`, `Naps Free Module`.
- [ ] Replace Orientation Lesson in each.
- [ ] Set permissions (Unlock 1 module, lock the rest).
- [ ] Add Custom Code/CTAs to the end of the unlocked module.

### Phase 2: Paywall Setup
- [ ] Configure Paywall Modal in Course Settings.
- [ ] Paste Copy from `PAYWALL-MODAL-COPY.md`.
- [ ] Verify CTA button links to `UPCR04`.

### Phase 3: Offer & Automation
- [ ] Create 3 Ghost Offers (`LMCR04`, `LMCR05`, `LMCR06`).
- [ ] Create 3 Email Campaigns (`EMLM04`, `EMLM05`, `EMLM06`).
- [ ] Link Offers to Campaigns via Automation ("When Offer Purchased -> Subscribe").
- [ ] Set up Global Exit Rule ("When Paid Offer Purchased -> Unsubscribe").

### Phase 4: QA
- [ ] Test Mobile Experience (Orientation -> Lesson -> CTA).
- [ ] Test Paywall Modal trigger.
- [ ] Verify Email Sequence firing.
