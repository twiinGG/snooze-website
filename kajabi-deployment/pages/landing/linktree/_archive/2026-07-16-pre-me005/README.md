# Archived: pre-ME-005 /links design (superseded 2026-07-16)

These are the previous `/links` (link-in-bio) page files, replaced by the ME-005 v2 redesign deployed to Kajabi + promoted to the canonical source on 2026-07-16.

- **Replaced by:** the v2 in the parent folder (`../linktree-landing-page.{html,css,js}`), now live at `joinsnooze.com/links`.
- **Why:** ME-005 acquisition-funnel remediation. The bios were repointed from `linktr.ee` to `joinsnooze.com/links` (per-platform UTMs) to stop the ~60% Linktree leak. The page was rebuilt membership-first (hero → checkout `z63s9VaR`, was pointed at the bare homepage), Camp de-dated, age tiles moved to the SD-001 age hubs, a "Visit joinsnooze.com" link added.
- **Known defect in this old version (do NOT reintroduce):** cards/tiles start `opacity:0` and reveal only via IntersectionObserver on scroll, so below-fold links were invisible on first paint. v2 fixes this with a pure-CSS fade (visible by default).
- **Full context:** `docs/projects/measurement/4_working/2026-07-16-acquisition-remediation/` (baseline, fix spec, cross-provider verify, design review, Sally one-pager).

Kept for rollback reference only. Not deployed.
