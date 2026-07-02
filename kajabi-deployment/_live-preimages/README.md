# Live pre-images (revert net)

Byte-exact* captures of live Kajabi custom-code blocks taken via MCP `get_theme_content`
immediately before an MCP write, per the verify/revert protocol in
`docs/dynamic-currency/PER-PAGE-EXECUTION-SPEC.md`. Rollback = re-emit the pre-image via
`update_theme_content`.

*Caveat: MCP content is transcribed through the agent context; blank-line trailing
whitespace is normalized. Semantically identical to live.

`../_intended/` holds the corresponding target versions (pre-image + reviewed sed diff).

| Capture | Site theme | Section | Purpose |
|---|---|---|---|
| 2026-07-02 | 2156873377 (Encore, Site) | 3-4mo page sections 1764879439259 / 1764879540856 / 1764879568621; store section 1768985607682 | Phase 1a hotfix: 6iRarwak CTAs -> z63s9VaR, wrong-apex links, dead /camp-snooze link |
