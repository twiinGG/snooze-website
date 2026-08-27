# Snooze Challenge Pages: Reconciliation and Recommendation

## 1. Evidence Reconciliation

### Supported Findings
The following findings from the drafts are supported by the deterministic live-source evidence:
*   **Structural Consistency:** All six pages share a near-identical H1 pattern, visual system, and expert byline. The membership close is identical (93 words) across all pages.
*   **Section Order Variance:** The standard flow is Hero -> What's going on -> Is this normal -> First steps -> Free resource -> Related help -> Membership.
    *   **Catnapping:** Inserts a 354-word FAQ section after "First steps."
    *   **Sleep Regressions:** Inserts an 87-word sub-guide after "First steps."
    *   **Order Variance:** "Free resource" and "Related help" order varies on two pages, but the deterministic table lists them in a fixed column order. The "Observed shared pattern" confirms the sequence: Free resource and Related help appear together, with order varying on two pages.
*   **Word Count Disparity:** Catnapping (1053 words) and Sleep Regressions (836 words) are significantly longer than the others (729-784 words) due to the extra sections.
*   **Mobile Hero:** The hero takes roughly one full viewport on mobile.
*   **Screenshot Artifact:** Long full-page screenshots showed duplicated content, but live HTML confirms one wrapper and one H1. This is a stitching artifact, not a live defect.

### Unsupported or Incorrect Findings
*   **Qwen Draft - "On the consult floor" Repetition:** The deterministic evidence does not confirm the presence of the phrase "On the consult floor" in all six pages. This is a lexical claim not supported by the provided word counts or structural data.
*   **Qwen Draft - "Log for a week" as Universal Step 1:** The evidence does not confirm that "Log for a week" is the first step in all "First steps" sections. This is an assumption not backed by the deterministic data.
*   **Qwen Draft - Specific Medical Thresholds (Fever 38C):** The deterministic evidence does not list specific medical thresholds. This is an external assumption.
*   **Gemma Draft - "First steps" Missing:** Gemma claims "First steps" is missing from screenshots. The deterministic evidence confirms "First steps" exists on all pages with word counts ranging from 136 to 176 words. This is a misread of the visual evidence.
*   **Gemma Draft - "Step 1 of 6" Progress Indicator:** There is no evidence of a progress indicator in the current live source. This is a new feature proposal, not an observation.
*   **Gemma Draft - "Snooze Challenge" Logo in CTA:** The deterministic evidence lists "Membership" as a 93-word section. It does not confirm a specific logo placement or floating container. This is a visual assumption.

## 2. Corrected Recommendations

*   **Reject Lexical Assumptions:** Do not assume specific phrases like "On the consult floor" or "Log for a week" are universal. Base recommendations on structural word counts and section presence.
*   **Correct Visual Misreads:** Acknowledge that "First steps" is present and substantial (136-176 words). The issue is not absence, but potential redundancy or density.
*   **Address Screenshot Artifacts:** Ignore duplicated content in long screenshots. Focus on live HTML structure.
*   **Focus on Word Budgets:** Use the deterministic word counts to guide compression, not assumed lexical repetition.

## 3. Recommended Shared Section Sequence and Word Budgets

**Goal:** Reduce total body word count to 600-700 words (excluding nav/footer) while maintaining clarity and conversion.

| Section | Current Avg | Target Budget | Action |
| :--- | :---: | :---: | :--- |
| **Hero** | 81 | 80 | Keep. Ensure H1 and lead are concise. |
| **What's going on** | 186 | 120 | Compress. Focus on mechanism, remove narrative bloat. |
| **Is this normal** | 119 | 100 | Keep. Ensure clear categorization (Normal/Work on/Help). |
| **First steps** | 159 | 150 | Keep. Ensure Step 1 is actionable, not just diagnostic. |
| **Free resource** | 61 | 50 | Compress. Focus on value and delivery. |
| **Related help** | 43 | 30 | Compress. Use concise links. |
| **Membership** | 93 | 50 | Compress. Remove verbatim repetition. Link to "Which is right for us?" |
| **Total** | 738-1053 | 580-630 | Significant reduction for Catnapping and Regressions. |

**Sequence:**
1.  Hero
2.  What's going on
3.  Is this normal
4.  First steps
5.  Free resource
6.  Related help
7.  Membership

*Note: The "Observed shared pattern" lists "Free resource and Related help, with order varying on two pages." For consistency, standardize the order to Free resource -> Related help on all pages.*

## 4. Differentiation Strategy

*   **Visual Differentiation:**
    *   **Topic-Specific Imagery:** Replace generic hero images with topic-specific illustrations (e.g., moon for Night Wakings, sun for Early Rising).
    *   **Color Coding:** Use subtle color accents in section headers to distinguish pages (e.g., blue for Bedtime Battles, green for Catnapping).
*   **Content Differentiation:**
    *   **H1 Variance:** While the H1 pattern is shared, ensure the subject and problem are clearly distinct.
    *   **First Steps:** Ensure the first step is specific to the challenge (e.g., "Check wind-down length" for Bedtime Battles, "Test earlier bedtime" for Early Rising).
    *   **Free Resource:** Ensure the free resource is highly relevant to the specific challenge.

## 5. Page-Specific Decisions

### Bedtime Battles
*   **Keep:** Core mechanism explanation.
*   **Compress:** "What's going on" (201 -> 120 words). Remove narrative bloat.
*   **Move:** None.
*   **Remove:** Verbatim membership pitch. Replace with condensed 50-word pitch.

### Catnapping
*   **Keep:** Core mechanism and "Is this normal" section.
*   **Compress:** "What's going on" (172 -> 120 words).
*   **Move:** Integrate FAQ questions into "Is this normal" or "What's going on."
*   **Remove:** 354-word FAQ section. This is the primary source of bloat.

### Early Rising
*   **Keep:** "Test an earlier bedtime" as a concrete action.
*   **Compress:** "What's going on" (225 -> 120 words).
*   **Move:** None.
*   **Remove:** Verbatim membership pitch.

### Nap Transitions
*   **Keep:** "Move in small steps" advice.
*   **Compress:** "What's going on" (183 -> 120 words).
*   **Move:** None.
*   **Remove:** Verbatim membership pitch.

### Night Wakings
*   **Keep:** "Look at bedtime first" advice.
*   **Compress:** "What's going on" (137 -> 120 words).
*   **Move:** None.
*   **Remove:** Verbatim membership pitch.

### Sleep Regressions
*   **Keep:** Age-specific distinctions (4 months vs. 18 months).
*   **Compress:** "What's going on" (195 -> 120 words).
*   **Move:** Integrate 87-word sub-guide into "Is this normal" or "First steps."
*   **Remove:** 87-word sub-guide as a separate section.

## 6. Cross-Page Journey

*   **Challenge to Age:** Link each challenge page to the most relevant age page (e.g., Catnapping -> 3-4 Months).
*   **Challenge to Challenge:** Use "Related help" to link to 2-3 most relevant challenges (e.g., Early Rising -> Catnapping, Nap Transitions).
*   **Challenge to Free Resource:** Ensure the free resource is prominent and relevant.
*   **Challenge to Paid Route:**
    *   **Membership:** Default route. Use condensed pitch on all pages.
    *   **Camp Snooze:** Link from "When to get help" sections for high-stress cases.
    *   **Consultations:** Link from "Worth working on" sections for complex cases. Do not link medical warnings to consultations.

## 7. Human Review Required

*   **Medical Thresholds:** Verify any specific medical thresholds (e.g., fever, sleep duration) against current pediatric guidelines.
*   **Feeding Advice:** Ensure feeding advice aligns with exclusive breastfeeding recommendations for infants under 6 months.
*   **Regression Definition:** Ensure "4 month change is permanent" is clearly distinguished from "sleep training."
*   **GP Referral:** Ensure "When to call your GP" sections do not delay necessary care.
*   **Free Resource Relevance:** Confirm that each free resource is still relevant and up-to-date.

## 8. Constraints Check

*   **Evidence vs. Recommendations:** Kept separate.
*   **No Sleep Advice Rewrite:** No changes to sleep advice content, only structure and word count.
*   **No Medical-Consultation Links:** Medical warnings are not linked to consultations.
*   **No Free Resource Discard:** All free resources are kept, but compressed.
*   **No Em Dashes:** Used hyphens and colons instead.
*   **Concise Markdown:** Output is structured and concise.
