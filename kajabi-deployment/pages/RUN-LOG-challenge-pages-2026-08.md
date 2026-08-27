# Challenge page deployment run log

## August 28, 2026

Status: deployed and verified.

### Scope

- [Bedtime Battles](https://www.joinsnooze.com/bedtime-battles), Kajabi theme file [3418778027](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=3418778027)
- [Catnapping](https://www.joinsnooze.com/catnapping), Kajabi theme file [3418779180](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=3418779180)
- [Early Rising](https://www.joinsnooze.com/early-rising), Kajabi theme file [3418759120](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=3418759120)
- [Nap Transitions](https://www.joinsnooze.com/nap-transitions), Kajabi theme file [3418773761](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=3418773761)
- [Night Wakings](https://www.joinsnooze.com/night-wakings), Kajabi theme file [3420980475](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=3420980475)
- [Sleep Regressions](https://www.joinsnooze.com/sleep-regressions), Kajabi theme file [3418776891](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=3418776891)

### Changes shipped

- Reordered the page journey to direct answer, triage, first steps, explanation, relevant detail, free resource, related help and contextual membership support.
- Added natural-language question headings, visible authorship, Sally's full credentials and an August 27, 2026 review date.
- Standardised Article, BreadcrumbList, author, publisher and modified-date schema.
- Kept FAQPage schema only on Catnapping, where the matching FAQ is visible.
- Added Australian primary health sources and corrected the urgent fever threshold for babies under 3 months.
- Replaced customer-facing references to free modules with lessons.
- Added a mobile-safe wrapper around the longer credential line after visual QA found the old pill layout was compressing its text.

### Verification

- Placeholder scan: pass on all six deployment directories.
- JSON-LD parse: pass on all six source files and live pages.
- HTML tree parse: pass on all six source files.
- Public links and media: pass. Kajabi login, library, community and checkout endpoints returned their expected protected responses to automation.
- Live response: HTTP 200 on all six pages.
- Live flow order: pass on all six pages.
- Live FAQ parity: pass. Catnapping contains visible FAQPage content; the other five do not declare FAQPage.
- Live author and modified date: pass on all six pages.
- Desktop render: pass.
- Mobile render: pass after the credential wrapper correction.

### Release evidence

- Content commit: `ffabc36a0`
- Mobile correction commit: `9df9541f4`
- Release tags: `website-v1.5.5`, `website-v1.5.6`
- Local model review: `qwen3.8-fast` bulk pass, reconciled with `qwen3.8-agent` and deterministic checks.
- Pre-deployment public HTML backups remain local under `kajabi-deployment/_live-preimages/challenge-pages/2026-08-27-pre/`. They were excluded from git because the generated Kajabi HTML triggered the secret and comment protections.

## Resource-form correction, August 28, 2026

Status: deployed and verified.

### Changes shipped

- Expanded the shared `.snooze-form-embed` selector to Bedtime Battles, Early Rising, Night Wakings and Sleep Regressions. The page section now owns the heading and lead copy on every challenge and age page.
- Replaced the stale newsletter title and subtitle on the seven resource forms with resource-specific fallback copy.
- Reduced the [Sleep Training Masterclass form 2148636994](https://app.kajabi.com/admin/forms/2148636994/edit) to name and email, changed its button to "Watch the free masterclass" and preserved its replay redirect.
- Left the intentional [newsletter form 2148722040](https://app.kajabi.com/admin/forms/2148722040/edit) and [contact form 2148762495](https://app.kajabi.com/admin/forms/2148762495/edit) unchanged.

### Completion-path verification

- All seven resource forms are single opt-in and send to a named custom completion page.
- Course samples send to login-aware access pages whose guest action starts password setup.
- Catnapping and Nap Transitions send to direct-download pages. Both public PDF endpoints returned HTTP 200.
- Sleep Regressions sends directly to the public masterclass replay. It intentionally has no offer grant or member login step.
- Existing form automations and completion-page selections were inspected but not changed.
- No live test contact was created in this correction. The confirmation used current Kajabi settings, live embed payloads and HTTP checks of every destination.

### Render and release evidence

- All six challenge pages and all four age pages render one live form with two visible fields, a resource-specific button, hidden duplicate form chrome and no horizontal overflow.
- Mobile check at 390 px: Bedtime Battles form 302 px wide, duplicate title `display: none`, two fields and the correct sample button.
- Live CSS read-back: 399,960 chars, 2449 balanced brace pairs and an exact normalized hash match with the repo source.
- Release commit: `629a186da`
- Release tag: `website-v1.5.7`
