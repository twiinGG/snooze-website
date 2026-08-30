# Reviews page

Updated: 2026-08-29

Status: **LIVE rendered page verified; one local-only schema identity correction remains gated**

The public [Reviews page](https://www.joinsnooze.com/reviews) renders the `#reviews-page` wrapper and 164-review structured data. The canonical page-body source is [`src/reviews-page.html`](./src/reviews-page.html); its page-specific CSS and JavaScript are embedded in that file or provided by the shared theme. Do not expect the obsolete standalone component/data files named by the original 2025 brief.

The live aggregate Organization node lacks `@id`. The canonical source now adds `https://www.joinsnooze.com/#organization`, and local JSON-LD validation passes. This one-line correction is **not live** and must not be pasted from repository evidence alone.

## Kajabi target and current gate

- Public URL: <https://www.joinsnooze.com/reviews>
- Website page list: <https://app.kajabi.com/admin/sites/2148291177/website_pages>
- Rendered section ID: `1781002775044`
- Rendered block ID: `1781002775044_0`
- Exact Kajabi page ID: unresolved; do not guess it
- Exact editor-field preimage/hash: unresolved because authenticated Chrome control failed with `Invalid browser service environment`

Before any write, acquire the shared Kajabi page lock, identify the exact page from the page list, capture the complete Custom Code field and its character count/hash, compare that preimage with the canonical source, obtain approval for the exact semantic diff, and create the required checkpoint commit. Save only this page block, then read it back and cache-bust the public URL. Acceptance requires the Organization node to retain the visible 164-review aggregate and gain the canonical `@id`, with no rendering, filtering, link or schema regression. Rollback is restoration of the captured full-field preimage followed by the same readback and public checks.

The exact execution packet is [`SAR-005-PAGE-FIX-PREFLIGHT-2026-08-29.md`](../../../../../../docs/projects/site-audit-remediation/runs/SAR-005-PAGE-FIX-PREFLIGHT-2026-08-29.md).

## Historical scope

The original development brief and seven-phase checklist describe the November 2025 proposal. They are historical context, not current production evidence or acceptance criteria. Reusable compact/mini components, automated Notion refresh and checkout embeds remain separate work unless a ratified SAR recommendation explicitly brings them into scope.
