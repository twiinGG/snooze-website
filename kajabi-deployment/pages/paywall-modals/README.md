# Course paywall modals

**Created:** 2026-08-16
**Surface class:** product-level, not a page. These are **not** website or landing pages and they do not inherit the shared theme CSS (paste rows A2/A3).

## What these are

Kajabi's course **Paywall** feature (Products → Courses → *course* → Settings → Paywall) creates a *limited access product* alongside the real course. A member holding only the limited access product sees free lessons and hits a modal on anything paywalled. That modal is built in the course's **consumption-side theme** out of Text / Image / Button blocks.

This folder holds the **Text block body** for each modal. One file per modal, per the one-file-per-paste-target contract in [`../../docs/technical/CODE-SURFACE-CONTRACT.md`](../../docs/technical/CODE-SURFACE-CONTRACT.md).

## Why the copy changed, August 2026

Every modal previously sold the **single course** behind it. They now sell the **7 day trial of the Snooze Membership**.

The trial is a **dual-currency twin pair**, same as the checkout families in [`../checkout/7-day-trial-membership/`](../checkout/7-day-trial-membership/). Both twins carry the same product list and both must be kept in step.

| Twin | Offer | Internal title | Checkout |
|---|---|---|---|
| USD | [`2150887297`](https://app.kajabi.com/admin/offers/2150887297/edit) | `PUBMS02_USD_Snooze_7-Day-Trial` | `https://www.joinsnooze.com/offers/mqQikDM7/checkout` |
| AUD | [`2151254578`](https://app.kajabi.com/admin/offers/2151254578/edit) | `PUBMS02_AUD_Snooze_7-Day-Trial` | `https://www.joinsnooze.com/offers/Sr6KzShx/checkout` |

**Author the USD slug in the button.** `global/js/currency-toggle.js` maps `mqQikDM7` to `Sr6KzShx` for Australian visitors, the same convention the catnapping and trial pages already use.

An earlier draft of this folder named offer `2151236321` "Snooze Access 7-Day Trial" with checkout `FzsLSoVM`. **That offer no longer resolves** (Kajabi MCP returns "Offer not found" as of 2026-08-16). Do not reintroduce it.

The strategic problem this copy solves: a parent hits the paywall at their moment of most acute pain and does not want to believe they will still have sleep problems in three months, which is exactly what a membership is built for. Naming the future problem reads as a threat. So the headline credits what they have already achieved, then offers people rather than more content, and the continuity claim lands as "whatever comes next" without ever predicting failure.

Voice constraints applied, from [`../../../../docs/brand/SNOOZE-TONE-OF-VOICE-v2.md`](../../../../docs/brand/SNOOZE-TONE-OF-VOICE-v2.md) and [`SALLY-POSITIONING.md`](../../../../docs/brand/SALLY-POSITIONING.md):

- Never the word **module** in body copy. Sally: "Modules, I think, sound like hard work." The products are named "(Free Module)" in Kajabi, but the copy never says it.
- Never bare **"Snooze"** as the offer label. It is "the Snooze Membership".
- Support is the **team**: "Sally's Snooze Specialists", never Sally alone answering. The published standard is within 24 hours, Monday to Friday, so no on-tap or 24/7 promise.
- The community is **the Snooze Village**.
- No **lifetime**, no **gentle**, no **science-based**, no promised sleep outcome.

## Prerequisite: the offer must grant the product

The paywall offer dropdown only lists offers that **grant the course product the paywall sits on**. Two of these courses are standalone free-chunk products, so the trial offer did not contain them and the trial could not be selected until they were added.

| Course the paywall sits on | Product ID | In the trial twins before this work? | Now |
|---|---|---|---|
| 5–12 Month Sleep Schedules (Free Module) | `2149308933` | **No, had to be added** | Added to both twins 2026-08-16 |
| 3-4 Month 4hr Feeds (Free Module) | `2149324660` | **No, had to be added** | Added to both twins 2026-08-16 |
| Newborn Sleep Guide | `2149275660` | Yes | Unchanged |
| 3-4 Month Baby Sleep Course | `2148571314` | Yes | Unchanged |
| Toddler Toolkit | `2149259086` | Yes | Unchanged |

If a paywall offer dropdown is missing the trial, this is why. Add the product to **both** twin offers, then reload the course settings.

### Open: the twins are not identical

Verified 2026-08-16 by reading both offers' product lists. The AUD twin carries one product the USD twin does not:

| Product | Type | USD `2150887297` | AUD `2151254578` |
|---|---|---|---|
| [`2149309110`](https://app.kajabi.com/admin/products/2149309110) 5-12 Month Sleep Schedules (Free Module) | CourseAccessLevel | **absent** | present |

Everything else matches, 11 products each. The effect is that an AUD trial member is also granted the *limited access* version of the 5–12 free chunk, so they see an extra library tile a USD trial member does not. Dual-currency twins are supposed to move together. Decide whether to add it to USD or remove it from AUD; do not leave it split.

**Known side effect.** Adding a standalone free-chunk product to the trial offer means a trial member sees both that product and the full course in their library. Kajabi automations can revoke *offers*, not *products*, so no automation can remove the duplicate tile while the trial grants it. The clean fix is to move the paywall onto the full course, the way Newborn Sleep Guide already works, which retires the separate free-chunk product entirely. Not done yet.

## Files

| Modal | Folder | Paywall sits on | Unlocks |
|---|---|---|---|
| 5–12 Month Schedules | [`5-12-month-schedules-free-module/`](./5-12-month-schedules-free-module/) | `2149308933` | 5-12 Month Sleep Training Course |
| 3-4 Month 4hr Feeds | [`3-4-month-4hr-feeds-free-module/`](./3-4-month-4hr-feeds-free-module/) | `2149324660` | 3-4 Month Baby Sleep Course |
| Newborn Sleep Guide | [`newborn-sleep-guide/`](./newborn-sleep-guide/) | `2149275660` | Newborn Sleep Guide (full) |
| 3-4 Month Baby Sleep Course | [`3-4-month-baby-sleep-course/`](./3-4-month-baby-sleep-course/) | `2148571314` | 3-4 Month Baby Sleep Course (full) |
| Toddler Toolkit | [`toddler-toolkit/`](./toddler-toolkit/) | `2149259086` | Toddler Toolkit (full) |

All five are **live** as of 2026-08-16.

## Key visual

All five use **Snooze Key Visual V3**, 1280×720 WebP. Source set:
`/Users/kadegreenland/Desktop/ClaudeWorktree/gallant-panini/snooze-product/docs/branding/web/`

The KV shows a phone running the Snooze app with Sally mid-session and the Snooze Village tab active, which is the visual proof of the "Sally and her team" promise the headline makes. It replaces the old per-course cards, which carried a `$117 RRP` corner ribbon and anchored the single-course offer this copy is moving away from.

That `$117 RRP` card is still live on other surfaces. Replacing it site-wide is a separate audit.

## Paste steps

Per course:

1. Products → Courses → *course* → **Customize** → open the paywall modal.
2. Select the **Text** block → `<>` source-code button in the editor toolbar → whole-field overwrite with this folder's `.html`.
3. Image block → upload the V3 key visual, 1280×720.
4. Button block → label **Start My 7 Days Free**, link `https://www.joinsnooze.com/offers/mqQikDM7/checkout` (USD slug; `currency-toggle.js` swaps it to `Sr6KzShx` for Australian visitors).
5. Settings → Paywall → **Paywall offer** → `The Snooze Membership - 7 Day Trial`. Save.

## Editor constraints

Kajabi's Text block runs TinyMCE. What survives a save:

- Inline `style="…"` attributes: **yes**. Use these for all styling.
- `<style>` blocks and `<script>`: **stripped**. Do not rely on them.
- Safe tags: `div`, `p`, `span`, `strong`, `em`, `ul`/`li`, `a`, `br`, `hr`, `table`.

The editor reformats markup on re-save, so make edits in source view, save once, and do not reopen the WYSIWYG to "check" it. The committed files here reflect TinyMCE's own normalised output (self-closing `<br />`, `font-weight: bold` rather than `700`) so that a repo-to-live diff stays clean.

## Verification

Kajabi course consumption pages are behind auth, so `curl` cannot verify these. Read the field back after saving, or use Kajabi MCP `get_theme_content` against the course's `active_theme_id`.

| Course | `active_theme_id` |
|---|---|
| 5–12 Month Sleep Schedules (Free Module) | `2164471850` |
| 3-4 Month 4hr Feeds (Free Module) | `2164647136` |
| Newborn Sleep Guide | `2164477479` |
| 3-4 Month Baby Sleep Course | pull before paste |
| Toddler Toolkit | pull before paste |
