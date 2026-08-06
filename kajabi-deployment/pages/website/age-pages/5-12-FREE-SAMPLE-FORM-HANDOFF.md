# Retired: 5-12 Month Free Sample Form handoff

**Retired August 6, 2026 (CNG-002). Tombstone only, do not act on this file.**

This was a one-off repair handoff for form `FMLM01_5-12M-Schedules` (`2149418596`) on `5-12-month-page-complete.html`. Two reasons it is retired:

1. Its general content, the Kajabi embed pattern and the fake-form defect it documented, is now in [`../KAJABI-FORM-EMBED-PATTERN.md`](../KAJABI-FORM-EMBED-PATTERN.md), which every page can use rather than one age page.
2. Form `2149418596` has `0` submissions in roughly five months and the LMCR04 docs recommend archiving it. The remaining manual deploy step in the original handoff should not be executed without first deciding whether that form lives at all.

**The defect it recorded, kept because it must not be reintroduced:** the page carried a hand-written form whose submit handler called `alert('Form submission - Replace with your Kajabi form integration')`, so every email was discarded, and it rendered live despite looking commented out because HTML comments do not nest. Full write-up and the two rules that follow are in the pattern note above.

Original text: `git log --follow` this path.
