
## Canonical single-file paste sources (Kade ruling 2026-07-06)

Every global surface pastes as a WHOLE-FIELD OVERWRITE from exactly one repo file; edits happen here first, never live:

- `html/site-header-page-scripts.html` -> Header Page Scripts field (contains GTM single-instance, Stape, schema.org JSON-LD, currency-toggle v2)
- `css/theme-custom-code.css` -> theme 2156873377 Custom Code CSS (`css/snooze-unified-theme.css` is legacy dev source, 1,716 diff-lines behind live; not a paste source until reconciled)
- `js/theme-custom-code.js` -> theme 2156873377 Custom Code JS

Procedure per paste: fresh pre-image -> diff (merge new live drift into the canonical file FIRST, commit) -> overwrite -> byte-compare read-back -> curl sentinel. See docs/projects/copy-uplift/12-W3-PASTE-QUEUE.md appendix.
