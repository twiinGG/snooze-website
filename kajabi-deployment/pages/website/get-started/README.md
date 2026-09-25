# Get started (GS-001)

`/get-started` is a Typeform-style onboarding quiz. It asks a parent a handful of
questions about their baby's age and sleep struggles, then builds a personalised
plan: a "right now" resource, a Join Snooze card in the visitor's currency, and
Camp Snooze / one-on-one consult cards, with a safety-first route when a red
flag (feeding/weight, health, sleep safety, or the parent struggling) is chosen.

The build contract is [`BUILD-SPEC.md`](./BUILD-SPEC.md). This README is the
practical companion: what ships, how to rebuild it, and the Kajabi setup
checklist.

## File map

```
get-started/
  BUILD-SPEC.md                   Orchestrator's contract (read first)
  README.md                       This file
  data/
    flow.json                     Screens, options, branching (orchestrator-owned; structure only)
    flow.schema.json              JSON Schema (draft-07) for flow.json
    copy.json                     Every visible string (PLACEHOLDER draft; copywriter fills in)
    start-here-map.json           Age group x struggle -> resource (Light hands -> Opus owned)
    offers.json                   Generated: Snooze/Camp/consult prices + checkout URLs
    config.json                   Kade fills: kajabi_form_id, form_field_names, n8n_webhook_url
  src/
    get-started-engine.js         The quiz + plan renderer (paste target, comment-free)
    get-started-state.js          Site-wide CTA state + welcome-back bar (paste target)
    styles.css                    Scoped styles, injected at runtime by the engine
  dist/                           Generated Kajabi paste blocks - never hand-edit
    01-get-started-page.html      Paste into the /get-started page's custom code
    02-site-header-get-started-state.html   Paste into Site Header Page Scripts (global)
  __tests__/
    engine.test.js                Pure-function + plan-model tests
    state.test.js                 CTA state + kill switch tests
    fixtures/paths.json           Generated representative answer paths (path-matrix.mjs)
  emails/                         Drop-off + welcome emails (copywriter -> Opus -> Sally)

scripts/get-started/              (repo root, not under this folder)
  lint-flow.mjs                   Validates flow.json + copy.json coverage
  path-matrix.mjs                 Generates __tests__/fixtures/paths.json
  build-offers-json.py            Parses KAJABI-OFFERS-REGISTRY.md -> data/offers.json
  bundle-paste.mjs                Builds dist/*.html from src/ + data/
```

## How to build

Run from the repo root (`/workspace/Snooze-OS`):

```bash
# 1. Validate the flow + copy (fails on missing copy keys, dead ends, bad red_flags, etc.)
node scripts/get-started/lint-flow.mjs

# 2. Regenerate the representative answer-path fixture the engine tests consume
node scripts/get-started/path-matrix.mjs

# 3. Regenerate offers.json from the Kajabi offers registry
python3 scripts/get-started/build-offers-json.py

# 4. Run the tests (plain Node, no framework)
node apps/snooze-website/kajabi-deployment/pages/website/get-started/__tests__/engine.test.js
node apps/snooze-website/kajabi-deployment/pages/website/get-started/__tests__/state.test.js

# 5. Bundle the Kajabi paste blocks
#    --allow-placeholders is required until config.json's {{...}} tokens are filled
node scripts/get-started/bundle-paste.mjs --allow-placeholders
```

Do steps 1-4 after any change to `flow.json`, `copy.json`, `start-here-map.json`,
`src/*.js`, or `src/styles.css`. Do step 5 last, right before a Kajabi paste.
Once `config.json` carries real values (no more `{{...}}`), drop
`--allow-placeholders` so the bundler enforces it.

## Kajabi deployment checklist (Kade)

1. **Create the landing page** at slug `/get-started` (Website > Pages), plain
   page, no theme sections needed beyond the page's own custom code block.
2. **Create a Kajabi form** named "Get started - plan" with **single opt-in**
   (not double; double opt-in blocks automations - see
   `pages/website/catnapping/CAPTURE-SETUP.md`).
3. **Add 6 new custom text fields** to that form, all **NOT required** at the
   site level (the "site-level required-field trap" in
   `KAJABI-FORM-EMBED-PATTERN.md`): `age_band`, `primary_struggle`,
   `help_style`, `start_here_title`, `start_here_url`, `resume_token`.
4. **Set the form's after-submit redirect** to `/get-started`, so the page
   reloads, finds `email_captured:true` in local storage, and shows the plan
   instead of the quiz.
5. **Tag the form** `get-started-plan-sent` and start the drop-off email
   sequence on that tag.
6. **Read the real input names** off the form's Embed tab (Kajabi names custom
   field inputs itself; they will not be exactly `age_band` etc.) and put them
   into `data/config.json` under `form_field_names`, plus the form's numeric ID
   under `kajabi_form_id`. Re-run `bundle-paste.mjs` without
   `--allow-placeholders` once that's done.
7. **Paste `dist/01-get-started-page.html`** into the `/get-started` page's
   custom code block (one file, one block - see
   `docs/technical/KAJABI-SURFACE-CODE-SETUP.md` for which surface this is).
8. **Paste `dist/02-site-header-get-started-state.html`** into Site Header
   Page Scripts (Settings > Site > Header Page Scripts), appended alongside
   the existing global scripts, not replacing them.
9. **GTM preview check**: confirm `get_started_start`, `get_started_step`,
   `get_started_email_captured` (and its alias `generate_lead`),
   `get_started_plan_viewed`, `get_started_option_click`, and
   `get_started_resume` fire correctly in GTM's preview mode, and that no
   event payload carries an email address or name.

## Known placeholders

- **`data/copy.json`** is a full-coverage placeholder draft (`_status:
  "placeholder"`). Every key the spec requires is present with short neutral
  English text so the engine and tests can run; the copywriter replaces every
  value per `docs/projects/get-started-onboarding/voice/SLEEP-CONCIERGE-VOICE-MODULE.md`
  and `sally-verbatim-bank.md`.
- **`data/config.json`** carries `{{KAJABI_FORM_ID}}` and six
  `{{FIELD_...}}` tokens until Kade completes checklist steps 2-6 above.
- **`emails/`** (the 3 drop-off + 3 welcome emails) are not built yet; they
  are copywriter -> Opus -> Sally, per `BUILD-SPEC.md`'s file ownership table.
- `bundle-paste.mjs` must be run with `--allow-placeholders` until both of the
  above are filled in; without the flag it fails loudly on any leftover `{{`.

## Notes for whoever picks this up next

- `lint-flow.mjs` computes its required `copy.json` keys by walking
  `flow.json` itself (not a hardcoded list), so if a screen or option is added
  to the flow, the lint automatically demands its copy key - no separate
  checklist to keep in sync.
- The brand accent used in `styles.css` is the real Snooze coral
  (`#F43357`, from `--sn-coral` / `--color-coral` in
  `global/css/theme-custom-code.css`), not orange - see the Report section of
  the build handoff for why.
- The email screen only ever uses the real Kajabi embed script
  (`KAJABI-FORM-EMBED-PATTERN.md`); there is no custom `<form>` anywhere in
  `get-started-engine.js`.
