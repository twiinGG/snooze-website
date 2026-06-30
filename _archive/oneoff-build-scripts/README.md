# Archived one-off build scripts

These are spent, single-run transformation scripts from the original snooze-website
page build (Feb 2026). Their **output** — the generated HTML pages — is committed in
the repo; the scripts themselves were one-shot tooling and are no longer imported,
invoked, or referenced by anything in the tree.

Archived (not deleted) so the transformation logic stays recoverable. Identified via
the repo knowledge graph (`graphify-out/`) as zero-reference orphans, then confirmed
with `git grep` to have no remaining callers.

Moved here on 2026-06-30. Original locations:

- `scripts/` ← `apps/snooze-website/scripts/`
  - rebuild_all_pages.py, consolidate_hero_sections.py, extract_component_styles.py,
    fix_duplicate_ctas.py, merge_about_sally_sections.py, remove_inline_styles.py,
    clean_generated_html.py, build_complete_age_pages.py, update_library_urls.py
- `product-pages-scripts/` ← `apps/snooze-website/scripts/product-pages/scripts/`
  - add_missing_sections.py, fix_all_section_order.py, fix_section_order.py,
    reorder_sections.py
- `kajabi-deployment-scripts/` ← `apps/snooze-website/kajabi-deployment/scripts/`
  - merge-library-styles.py, remove_custom_headers.py

If you need to re-run one, check its assumed paths against the current tree first —
the directory layout has changed since these were written.
