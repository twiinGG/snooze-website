# External repo sync: apps/snooze-website ↔ twiinGG/snooze-website

**Status:** Canonical. Supersedes the "external = live / monorepo = frozen reference" framing in
the June 2026 restructure docs (`docs/operations/MONOREPO-LAYOUT.md`,
`docs/operations/LMCR-EXTERNAL-REPO-VERIFICATION-2026-06.md`).

## The model

The Snooze website code is split into its own standalone repo so it can be shared independently
with VSP (the deploy partner) while staying nested and clean inside the monorepo.

| Repo | Role |
|------|------|
| `apps/snooze-website/` (in `twiinGG/Snooze-OS`) | **Source of truth.** All website work happens here: HTML, CSS, JS, email templates, docs. |
| [`twiinGG/snooze-website`](https://github.com/twiinGG/snooze-website) | **Overwrite-only mirror.** VSP pulls from it to deploy to Kajabi. Nobody edits it directly. |

Direction of truth is one-way: monorepo → external. The external repo is published from the
monorepo, never merged back.

## How to publish

After committing website changes in the monorepo:

```bash
scripts/publish-snooze-website.sh
```

This splits the `apps/snooze-website` subtree and force-pushes it to the external repo's `main`.
The external repo then matches the monorepo exactly. The script refuses to run with uncommitted
changes under the prefix, because only committed state is published.

## Rules

- Edit website code only in `apps/snooze-website`. Never edit `twiinGG/snooze-website` directly;
  a publish would overwrite it.
- Run the publish after any change VSP needs to deploy. There is no automatic sync, so a missed
  publish is how the two drift apart.
- Deployment to Kajabi itself stays manual paste from the external repo (VSP's workflow). Git is
  the source of truth; Kajabi is the rendering surface.

## What broke (June 2026)

The split was intended but never wired: `apps/snooze-website` was tracked as plain files, not a
submodule or subtree, with no mechanism linking it to the external repo. The June repo restructure
and the dual-currency build (currency-toggle.js, `emails-usd/`, currency-aware checkout in
snooze-globals.js) all landed in the monorepo and never propagated. The external repo went stale
from April 20, 2026, leaving VSP's deploy repo roughly seven weeks behind and missing the entire
dual-currency build.

Fixed by establishing the subtree-publish flow above and force-refreshing the external repo from
the monorepo. The one external-only file at the time, `docs/TECHNICAL-ARCHITECTURE-HANDOVER.md`,
was rescued into `apps/snooze-website/docs/technical/` before the refresh.
