# Masterclass replay page

**What this page is.** `/3-4-month-masterclass-replay` is where a parent lands after claiming the Sleep
Training Masterclass. Its job is to play the replay, and then to offer the 7 day trial.

**Kajabi surface:** [landing page 2151250258](https://app.kajabi.com/admin/landing_pages/2151250258/edit),
theme [2161384400](https://app.kajabi.com/admin/themes/2161384400/settings/edit).

**It is the convergence point of all three funnels.** WS-009's funnel map found that every one of the
site's three funnels ends here, which is why rebuilding this one page pays off three times:

| Funnel | How its traffic gets here |
|---|---|
| [A, Sleep Training Masterclass, 2148324198](https://app.kajabi.com/admin/pipelines/2148324198/edit) | `/sleep-regressions` embeds form 2148636994, whose `thank_you_page_id` is this page |
| [B, 4 month Sleep Regression Survival Guide, 2148302264](https://app.kajabi.com/admin/pipelines/2148302264/edit) | Only by its fourth sequence email, "You're Invited to The Sleep Training Masterclass!" |
| [C, 3-4 Month Course Funnel, 2148685449](https://app.kajabi.com/admin/pipelines/2148685449/edit) | This page is literally step 2 of it |

Full map: [`WS-009-masterclass-funnel-map-2026-08-14.md`](../../../../../../docs/projects/website-surfaces/4_working/WS-009-masterclass-funnel-map-2026-08-14.md).

---

## What the rebuild changed, and why

The page it replaces was a native Kajabi builder page selling the $117 standalone course, with a replay
video bolted on top. Six defects, each one a rule this repo already had:

1. **Seven CTAs pointed at the wrong offer.** The hero read "ENROL IN THE 3-4 MONTH SLEEP COURSE" and
   resolved to `W2PyqL2X`, the $117 standalone course (offer `2149475268`). The remaining buttons split
   between that and the **full price** membership, `z63s9VaR` ($197 USD) and `vYgCNgJz` ($297 AUD).
   Decision 6 of WS-008 says the onward step is the 7 day trial only. Now there is exactly one CTA,
   `mqQikDM7`, with the renewal disclosure adjacent and no price anywhere on the page.
2. **It called Sally a current paediatric nurse.** "Paediatric nurse, certified sleep consultant, and mum
   of two" breaks the factual-accuracy rule in `docs/brand/SALLY-POSITIONING.md`, which makes "former"
   mandatory. Now: "an internationally certified sleep consultant and a former paediatric nurse".
3. **It promised "lifetime updates" twice.** Banned in marketing copy; the approved framing is access
   with the Snooze Membership.
4. **It contradicted itself on numbers**, claiming "more than 2,000 families" in one paragraph and
   "1,000+ families" three paragraphs later. Neither is verifiable from any source in this repo, so both
   were cut rather than one being picked.
5. **It carried false urgency**, in an orphaned block reading "Get started today before this once in a
   lifetime opportunity expires" wired to no CTA at all.
6. **It described the course, not the masterclass.** An 11 module curriculum listing on a page whose
   entire job is to play one replay.

The page also had none of the design system: zero `snooze-container`, zero `snooze-section`, no `#*-page`
wrapper, Poppins instead of the brand fonts.

## The video must keep working

The replay is a single Wistia embed, `czbo51s2ri`. There is exactly one player on this page, not two.
Two things carry it and neither may be dropped:

- `<div class="wistia_embed wistia_async_czbo51s2ri videoFoam=true">` inside the responsive padding
  wrapper.
- `<script src="https://fast.wistia.com/assets/external/E-v1.js" async>` at the foot of the wrapper.

Verify playback in a real browser after any paste. A curl cannot tell you the player initialised.

## Files

| File | Pastes into |
|---|---|
| `masterclass-replay.html` | The landing page's Custom Code block |
| `masterclass-replay.css` | The landing page's own **Custom CSS** field |

## Why there are two files, and why nothing goes in the theme file

**Landing pages are self contained.** Each has its own theme and inherits nothing from the website
theme's CSS, so this page must carry its own stylesheet or it renders unstyled while still passing a
line-match curl. Only `getComputedStyle` catches that failure.

`masterclass-replay.css` is derived from
[`catnapping-guide-ready.css`](../catnapping-guide-ready/catnapping-guide-ready.css), which is itself an
extraction from the A2 theme file. Three regions:

| Region | What it is |
|---|---|
| Lines 1 to 128 | The System Initialization block, rescoped to `#masterclass-replay-page`. Custom properties, base typography, `.snooze-container`, `.snooze-section`, `.btn`, `.hero-wrap`, full-bleed fixes |
| The `.mcr-*` rules | This page's own components, hand written |
| The tail | `.snooze-footer-clean` and the `.sf-*` rules, needed because the page renders the canonical footer inline and none of its rules live in the page block |

**Do NOT add a `#masterclass-replay-page` block to `global/css/theme-custom-code.css`.** That file is the
website theme, which this page never loads. `#catnapping-guide-ready-page` is not in it either; the
count is zero. Adding it would be dead weight that drifts.

The cost of the derivation is the same one CNG-002 accepted: if the A2 file changes materially, re-extract
by hand and re-verify with `getComputedStyle`. No automated drift check, same as `camp-snooze` and
`linktree`.

## Verification standard

1. Cache-busted `curl --http1.1` with a desktop User-Agent. Assert `$117` is 0, `W2PyqL2X` is 0,
   `z63s9VaR` and `vYgCNgJz` are 0, `mqQikDM7` is 1, and the renewal disclosure is present.
2. `getComputedStyle` on the wrapper and on a `.btn`, never a whole-file CSS line match. A stylesheet can
   score every line present and still be dead.
3. Play the video in a real browser.
