# Compliance Copy Pack, for Sally sign-off

Date: 2026-07-02. Part of the dual-currency / page-wave project (Phase 1d). This is the
long-lead item; the page wave cannot deploy compliant copy until you approve or reject each
item below. Everything here is a binary decision with a recommendation. Nothing needs an
open-ended answer from you.

Background you don't need to solve, just know: the live website carries some copy that
promises things we don't offer (weekly live coaching, replay libraries, 24/7 support) and some
credential wording that's factually wrong (calling you a current or registered nurse). A repo
sweep in late June already fixed most of this in our source files. Two things are left: one
recurring copy block, and the "lifetime access" wording. Both are below.

---

## Decisions

### 1. The "Lifetime access to this course" line

This appears in the course-comparison block that runs on every age page, every product page,
the Store, and the Snooze Method page (the block that shows "Buy this course alone" vs "Join
Snooze"). One wording fix here cleans it everywhere.

**Why it needs to change:** "lifetime access" is a promise we can't guarantee if access terms
ever change. Your own positioning standard (`docs/brand/SALLY-POSITIONING.md`) already rules
this out for exactly this situation, individual course purchases.

- [ ] **Approve**: replace "Lifetime access to this course" with **"Full access to this
  course"** across all pages carrying this block.
- [ ] **Reject**: keep "Lifetime access to this course."

**Recommendation: Approve.** "Full access" says the same thing to a buyer (you're not
drip-fed content, you get it all) without the perpetuity promise.

*Alternate wording, if "Full access" reads flat to you: "On-demand access to this course."*

---

### 2. Homepage H1: "Join Your 24/7 Baby Sleep Lifeline"

This is the headline on the live homepage, the highest-visibility line on the site. "24/7"
promises round-the-clock support we don't run.

Current (live, verbatim): **"Join Your 24/7 Baby Sleep Lifeline"**

Pick one:

- [ ] **Option A (recommended): "Join Your Baby Sleep Lifeline"**: keeps "Lifeline," the word
  doing the emotional work, and drops the availability promise.
- [ ] **Option B: "Real Baby Sleep Help, When You Need It Most"**: leans on outcome over
  availability.
- [ ] **Option C: "Great Baby Sleep Starts Here"**: simplest, most direct, least "sell."
- [ ] **Reject all, keep "24/7."**

**Recommendation: Option A.** Smallest possible edit, keeps the proven emotional hook, removes
the one word that's the actual problem.

---

### 3. Other homepage-only violations (same page, different sections)

These all come from the "Support Inside Snooze Village" section and the "What You Get" value
table, both homepage-specific (not the shared block in Decision 1).

| Current (live) | Proposed replacement |
|---|---|
| "Weekly Live Coaching" (card heading) + "Join Sally's weekly Q&A calls" | "Live Sessions" + "Live Q&A with the Snooze Specialists" |
| "...plus live coaching, community support, and troubleshooting resources." | "...plus live sessions, community support, and troubleshooting resources." |
| "Weekly live group coaching with Sally" (value table row) | "Live sessions with the Snooze Specialists" |
| "Access to replays & expert Q&A library" (value table row) | "Live Q&A access" |

- [ ] **Approve**: apply all four replacements above.
- [ ] **Reject**: flag any row individually and tell us what should replace it instead.

**Recommendation: Approve all four.** This is the same fix already applied everywhere else on
the site (per the June 29 service-model sweep); the homepage just hasn't been repasted yet.

---

### 4. Policy call: "lifetime access" on one-off course purchases

This is the one open policy question, not a copy question. Framed as A/B:

- **A. Keep "lifetime access to this course"** on standalone one-off purchase pages, if that's
  factually what we sell (buy once, keep it forever, no subscription).
- **B. Unify on non-perpetuity wording everywhere** ("Full access", "On-demand access"), even
  on one-off purchases, so no page anywhere on the site uses the word "lifetime" as an access
  promise.

**Recommendation: B.** Your own positioning standard already documents this exact call:
"Individual courses and guides may still be sold as standalone purchases, but copy must NOT
promise lifetime access... 'Lifetime updates' becomes 'Free updates included.'" This decision
asks you to confirm that standing rule still holds, not to make a new one.

- [ ] **Approve B** (confirm the existing standard, apply everywhere)
- [ ] **Approve A instead** (one-off purchases keep "lifetime," membership pages don't)

One related item this touches: the Store catalog line **"Lifetime access to purchased
guides"** becomes **"Full access to your purchased guides"**, and the Snooze Method page's
**"Lifetime access to revisit as child grows"** becomes **"Come back to this course anytime as
your child grows."** Both ride whichever option you pick above.

Not part of this decision: founding-member "lifetime price lock" is a pricing promise, not an
access claim, and stays untouched pending a separate decision already logged in the positioning
standard.

---

## No-change list (for visibility, not decisions)

These were considered and are correctly left alone:

- **"Live sessions with the Snooze Specialists"**: approved framing, already live in most repo
  pages, not being touched.
- **Camp Snooze "daily group coaching calls"**: real live cohort, exempt from the no-live-
  coaching rule.
- **Testimonial quotes containing "24/7"**: customers' own words, left as written.
- **Founding-member "lifetime price lock"**: commercial pricing term, not an access claim,
  decision pending separately.

## FYI, proceeding without sign-off

The Consultations page live copy says **"Registered Paediatric Nurse"** three times, directly
contradicting your positioning standard (you're a former paediatric nurse, not a current or
registered one). This is a factual-accuracy fix, not a copy-style choice, so it's proceeding
as part of the page wave without waiting for this sign-off. You'll see the corrected copy
("internationally certified sleep consultant and former paediatric nurse") land with everything
else.

---

## Appendix: verbatim source references

**Decision 1 source (repo, current):**
`apps/snooze-website/kajabi-deployment/components/value-comparison.html` line 17, and the same
line repeated in each age page (`age-pages/*-page-complete.html`), each product page
(`product-pages/*/*.html`), and `StoreV2/store-page-v2.html`:
```html
<li><i class="fa-solid fa-check"></i> Lifetime access to this course</li>
```

**Decision 2 and 3 source (live site, 2026-07-02 sweep):**
`docs/projects/paid-media-and-dual-currency-v1/live-baselines-2026-07-02/live-sweep/home.html`,
confirmed against `banned_copy.txt` and `LIVE-SWEEP-REPORT.md` in the same folder. No repo
source file for the homepage body currently exists; the page wave will create one from this
live baseline plus the approved copy above.

**Decision 4 source:** `docs/brand/SALLY-POSITIONING.md`, "Product access wording" section.
