# Legal documents

## Where the live pages actually come from

| Live page | Paste target | Kajabi location |
|---|---|---|
| [`/terms-conditions`](https://www.joinsnooze.com/terms-conditions) | [`../terms-conditions/PASTE-terms-conditions-block.html`](../terms-conditions/PASTE-terms-conditions-block.html) | Website theme [2156873377](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=2931909141), section `1730252376707`, block `1730252376707_0`, a **TinyMCE rich-text** block |
| [`/the-sleep-concierge-faq`](https://www.joinsnooze.com/the-sleep-concierge-faq) | [`../faq/the-sleep-concierge-faq-page-complete.html`](../faq/the-sleep-concierge-faq-page-complete.html) | Website theme [2156873377](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=2948173435), section `1783492895987`, an **Ace** custom-code block |
| [`/privacy-policy`](https://www.joinsnooze.com/privacy-policy) | not yet captured | website page `2156730062` |

Paste with the token-safe helper, never by hand:

```bash
# Terms (TinyMCE)
agent-browser --cdp <port> --session <name> eval \
  "$(python3 apps/snooze-website/scripts/emit_paste_js.py <file> --target tinymce)"

# FAQ (Ace)
agent-browser --cdp <port> --session <name> eval \
  "$(python3 apps/snooze-website/scripts/emit_paste_js.py <file> --target ace)"
```

The `--target tinymce` mode was added August 29, 2026. Website-page "Text" blocks are TinyMCE, and their backing `<textarea>` is **not** what the builder saves from, so writing it directly is a silent no-op. Go through the editor API. Expect TinyMCE to normalise a literal U+00A0 into `&nbsp;`, which shows up as a small length difference and is harmless.

## Files here

- `TERMS-AND-CONDITIONS.md` is a **readable twin** of the live terms, kept in sync by hand. It is not the paste target.
- `PRIVACY-POLICY.md` is a readable twin of the privacy policy.
- `3-4-month-course-terms-and-conditions.html` and `snooze-social-terms-and-conditions.html` are **separate live pages** that duplicate clauses now covered by sections 5 and 6 of the unified terms. They should be redirected to `/terms-conditions` or cut down to a pointer. Open decision.
- `_archive/` holds superseded documents. Read its README before reusing anything in it.

## Rule

One Terms and Conditions document, with a numbered section per product category. Do not create a new terms page for a new product; add a section. Every extra page is another copy of governing law, liability, IP and dispute clauses that has to move in lockstep and will not.

Background: `docs/projects/consults-offer-rebuild/CONSULT-REFUND-POLICY-GAP-2026-08-29.md`
