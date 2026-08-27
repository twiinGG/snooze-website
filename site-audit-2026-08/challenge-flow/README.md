# Challenge-flow working evidence

## Valid evidence

- `pages/*.txt`: verified rendered text for the six live pages.
- `screenshots/*-top.png`: element-level mobile hero captures.
- `screenshots/*-steps.png`: element-level mobile First steps captures.
- `screenshots/*-cta.png`: element-level mobile membership captures.
- `QWEN-FLOW-REVIEW.md`: local `qwen3.8-fast` bulk comparison.
- `GEMMA-SEGMENTED-VISUAL-REVIEW.md`: local `gemma4:12b-it-qat` review of the element-level captures.
- `QWEN-AGENT-RECONCILIATION.md`: local `qwen3.8-agent` reconciliation draft.

## Superseded captures

The six `screenshots/*-mobile.png` files are full-page screenshot attempts. The browser stitched parts of the page twice even though the live HTML contains one wrapper and one H1. They are retained as capture diagnostics and were excluded from the final audit findings.

`GEMMA-VISUAL-REVIEW.md` used those superseded full-page captures. Its findings were not used without independent verification.

## Final synthesis

The reviewed result is [CHALLENGE-PAGE-FLOW-REVIEW-2026-08-27.md](../CHALLENGE-PAGE-FLOW-REVIEW-2026-08-27.md).
