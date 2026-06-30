# Kajabi Build Checklist: Course Free Modules

Use this checklist to set up a new Free Module variant in Kajabi.

## 1. Product Setup
- [ ] **Clone the Canon Course:** Duplicate the relevant full course (e.g., Newborn Guide, 3-4M Course, 5-12M Guide, or Toddler Toolkit).
- [ ] **Update Product Title & Description:**
    - Copy title from approved copy review document (`LMCR##-product-metadata.md`)
    - Copy description from approved copy review document
    - Paste into Kajabi → Settings → Details
    - Verify both are saved correctly
- [ ] **Update Orientation Lesson:**
    - Replace existing copy with the custom **Orientation Lesson** draft for that variant.
    - Ensure the tone is advisory and matches the targeted pain point.
- [ ] **Unlock the Specific Module:**
    - Find the "Unlocked Content" specified in the PRD for this variant.
    - Set this module/lesson to "Published" / accessible.
- [ ] **Add Course Paywall:**
    - Navigate to **Settings** in the course
    - **Toggle ON** "Add a paywall to this course"
    - **Choose the Offer** to display when members hit paywalled content (upsell offer)
    - **Position the paywall:** Drag paywall indicator to appear after the unlocked module
    - *Reference:* [Kajabi Paywall Help Article](https://help.kajabi.com/en/articles/12695132-how-to-create-a-course-paywall)
- [ ] **Add Wrap-Up Lesson with CTAs:** 
    - Create a new lesson at the end of the unlocked module
    - **Lesson Title:** "What's Next" or "Complete Your Sleep Plan"
    - Copy wrap-up content from `LMCR##-free-module-summary-upsell.html`
    - Paste into lesson (Source Code view)
    - Set lesson to **Published** and **Immediate** drip
    - **File Location:** Use `LMCR##-free-module-summary-upsell.html` from `src/content/bundles/LMCR##/html/`

## 2. Offer Setup (Repeat for each of the 12 variants)
*Refer to [Section 3.2 of the PRD](file:///Users/kadegreenland/Documents/Projects/The%20Sleep%20Concierge/Platforms/Snooze%20OS/snooze-product/projects/course-free-modules-conversion/docs/PRD_Course%20Free%20Module%20Conversion.md#32-offer-codes--titles) for exact codes and internal titles.*

- [ ] **Create Ghost Offer:**
    - **Offer Title:** `Free Module - [Variant Name]`
    - **Internal Title:** `[Offer Code]_[Internal ID]` (e.g. `LMCR07_NB-DREAM-FEED`)
    - **Price:** Free / Direct Grant
    - **Product:** Link to the corresponding Free Module product created in Section 1.
- [ ] **Automation:** WHEN Offer Purchased -> 
    - Send Day 0 post-purchase email (immediate)
    - Apply tag `TAG_LMCR##_[Variant]`
    - Subscribe to Email Campaign `[Campaign Code]` (e.g. `EMLM07`)

## 3. Email Campaign Setup (Repeat for each of the 12 variants)
*Refer to [Section 4.2 of the PRD](file:///Users/kadegreenland/Documents/Projects/The%20Sleep%20Concierge/Platforms/Snooze%20OS/snooze-product/projects/course-free-modules-conversion/docs/PRD_Course%20Free%20Module%20Conversion.md#42-campaign-registry) for campaign codes.*

- [ ] **Create Day 0 Post-Purchase Email:**
    - **Email Name:** `Day 0 - Welcome & Access`
    - **Trigger:** Sent immediately via offer purchase automation (not in campaign)
    - **File:** `LMCR##-day-0-welcome.html` from `src/content/bundles/LMCR##/emails/`
- [ ] **Create/Configure Campaign:**
    - **Internal Title:** Use the internal title from the PRD (e.g. `EMLM07 - NB Dream Feed`).
    - **Emails:** Upload the 3-email nurture sequence (Day 2, 4, 6) from `src/content/bundles/LMCR##/emails/`
    - **File Naming:** All email files must use the bundle code prefix (e.g., `LMCR04-day-2-bigger-picture.html`)
- [ ] **Apply Global Exit Rules:**
    - **Trigger:** If any **Paid Course Offer** or **Snooze Membership Offer** is purchased.
    - **Action:** Immediately unsubscribe from ALL Lead Campaigns (`EMLM04`-`EMLM15`).
    - **Exit Rules:**
        - If **Course Offer** purchased → Remove from automation.
        - If **Snooze Offer** purchased → Remove from automation.

## 4. QA & Launch
- [ ] **DM Link Test:** Trigger the offer via a test link on mobile.
- [ ] **Access Check:** Verify the orientation lesson and the specific unlocked module are visible.
- [ ] **Paywall Check:** Verify native paywall appears after the unlocked module.
- [ ] **Email Check:** Confirm Day 0 email arrives immediately with correct framing.

---

## LMCR04 (5–12M Schedules) — Live verification status (2026-06-29)

The checklist above is the reusable template for all 12 variants. This block records the **verified-live** state of the LMCR04 build specifically (MCP + admin-UI capture, see `docs/LMCR04-LIVE-KAJABI-CAPTURE-2026-06-29.md`). All items confirmed LIVE:

- [x] **Free offer published** — `LMCR04_5-12M-SCHEDULES`, offer 2150914364, slug `2x92uaLF`, $0 USD, published.
- [x] **Free Module product granted** — CourseAccessLevel 2149309110 on product 2149308933 (342 members).
- [x] **Enrolment automation live** — `AUTLM01_Course-Sample-Conversion` (workflow 436114): trigger = offer 2150914364 purchased OR form FMLM01 (2149418596) submitted → Add tag `LM_512_schedule` → Subscribe to sequence 2148765283.
- [x] **Tag firing** — `LM_512_schedule` (tag 2149991548), 341 contacts ≈ 342 members.
- [x] **Nurture sequence live** — `EMLM04_5-12m Schedule LM Flow` (2148765283), 4 emails D0/2/4/6 all published, 281 lifetime subscribers, last_sent 2026-06-29. Email bodies verified clean of banned live-coaching language (CTAs: D0 `/library`, D2 `/offers/Ktxk9mvE`, D4 product page, D6 `/snooze`).
- [x] **Duplicate sequence retired** — `EMLM04_Course-Sample-Conversion` (2148762811) renamed `[RETIRED 2026-06-29 dupe-of-2148765283]`; 0 subscribers, 0 subscribe/unsubscribe triggers (no double-send).
- [x] **In-course bridge lesson present** — "What's Next?" lesson 2194028428, dual CTA (course + membership).
- [x] **Exit rule (partial)** — `EMLM04 - Unsubscribe Trigger` (workflow 443852) unsubscribes from 2148765283 on purchase of `UPCR04_5-12M-SCHEDULES-UPSELL` + Camp bundles. ⚠ Does NOT cover the `Ktxk9mvE` $117 upsell or membership `z63s9VaR` — see remediation plan (minor post-purchase leak).
- [ ] **Offer thank-you body** — free offer 2150914364 post-purchase still dead-ends at `/login` (P1-5, pending).
- [ ] **Course-product model** — paywall-wrapper-in-free-module vs standalone product 2149258846 unresolved (P0-1 decision).
