# Retired 2026-07-11

`snooze-method-page-complete.html` retired per Kade ruling (2026-07-11, footer inline rollout).

Reason: duplicate wrapper `#snooze-method-page` colliding with the live production page
`pages/website/snooze-method/the-snooze-method.html`. This file was the older standalone
variant (H1 "The Snooze Method", 64-line hero-only stub, "not covered by the service-model
sweep" per the dir README). The production page is `the-snooze-method.html` (H1 "The Snooze
Methodology", full CU-001-updated markup).

Deploy the production page only; this stub is not to be pasted. Restore with a plain `mv` back
to pages/website/snooze-method/ if ever needed.
