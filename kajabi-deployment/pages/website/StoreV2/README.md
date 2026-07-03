# Store Page V2 - Support Map

Deployable Kajabi custom code for the Snooze store page. Paste `store-page-v2.html` into the page's custom code block. `Copy.md` holds the source copy and layout rationale.

## Page wrapper

Wrapper ID: `#store-page-v2`. The CSS design system is scoped per wrapper ID, so this page needs its own System Initialization block in `snooze-unified-theme.css` (see `apps/snooze-website/AGENTS.md`).

## Section structure

`store-page-v2.html` is built in this order:

1. Hero (Orientation)
2. Interactive Four-Tier Support Map
3. Individual Guides Section
4. Snooze Section
5. Camp Snooze Section
6. 1:1 Consults Section
7. Reassurance
8. FAQ Accordion
9. Final CTA

## JavaScript

The tier-stack interaction script at the bottom of the file is scoped to `#store-page-v2` only. It wires click and touch events on `[data-tier]` bars to toggle the matching `[data-desc]` description panel, and defaults to the Snooze tier active on load.


---

## Copy-uplift session 2 change log (2026-07-03, CU-001 Batch 1)

Applied to `store-page-v2.html` (repo only; NOT yet pasted to Kajabi; prices render through the dual-currency engine which must paste in the same release):

- D-63: membership tier labelled "The Snooze Membership" (tier bar + description heading).
- D-64: both live-Q&A instances replaced (live coaching sessions; "Live Sessions - masterclasses and coaching with the Snooze Specialists").
- D-65: phantom $39/month / $349/year replaced with registry prices $79/month / $657/year (AUD 119/997) in the tier card and the pricing card; the annual save note recomputed to $291 (A$431) and made a dynamic-price span. Quarterly ($197/$299) is still not presented; that layout belongs to the pricing-redesign brief 8 (open).
- D-66: camp member price corrected from the dead $390 to $611 (A$878); save note now $79 (A$119); non-member $690 AUD corrected to A$997 with "Includes a bonus first month of Snooze".
- D-67: consults "From $199" corrected to "From $290" (registry: Consult with Bec, cheapest live 1:1). No AUD twin exists for it; data-aud="435" follows the page's standard 1.5 presentation ratio pending a real AUD offer.
- D-05: "Lifetime access to purchased guides" is now "Full, on-demand access to purchased guides".
- Guide floor price corrected from the stale "$79 per guide" to "From $67" (PUBGD01/PUBGD02, A$99).
- D-69 FINAL: camp roll-call card is now "Morning Coaching Call - Review your overnight sleep log and get live coaching as you work towards your goals, every day of camp".
- Alumni perk line added to the camp card: "Complete camp and you qualify for 50% off the ongoing Snooze membership, for life." (whitelisted pricing promise).
- P18 spellings in visible text (CSS class names like `personalized` untouched).
- Verified: tag balance unchanged; dynamic-price spans 16 → 18 (two intentional additions for the currency-variable save notes); zero kill-list residue ($390 remaining on the page is the genuine PUBCS02 follow-up consult price).

Open flags: intake size reads "7 families" here vs "10 families" on the home page (not ruled on); member 2-week price shows $2,800 here vs $3,150 on the consultations page (reconcile against live offers before the currency release).
