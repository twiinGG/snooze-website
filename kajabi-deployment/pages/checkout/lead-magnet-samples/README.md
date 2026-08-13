# Lead magnet sample checkouts

**Location:** `kajabi-deployment/pages/checkout/lead-magnet-samples/`
**Created:** August 13, 2026
**Status:** RETIRED August 13, 2026. All five checkouts now bounce to their capture page.

---

## Retired, August 13, 2026 (WS-006)

The five free-sample checkouts are no longer an entry point. A parent claims each magnet with name and
email on the age page they are already reading, and the $0 checkout is unreachable.

Each offer's Custom Code block now holds its `retired-checkout-bounce.html` instead of its
`checkout-blocks.html`: a `location.replace()` to the capture page with a `noscript` fallback link.
**The offer stays published.** Drafting it would blank the code block, and entitlement survives either
way because nothing was deleted.

| Slug | Offer | Checkout theme | Bounces to |
|---|---|---|---|
| `zs2zLeUw` | 2150851932 | 2164093530 | `/newborn-baby-sleep-help` |
| `4HQjFJGC` | 2150846925 | 2164064013 | `/toddler-sleep-help` |
| `FwisMwa6` | 2151272119 | 2166784491 | `/nap-transitions` |
| `dk25rdGU` | 2150953839 | 2164710780 | `/3-4-month-baby-sleep-help` |
| `2x92uaLF` | 2150914364 | 2164474536 | `/5-12-month-baby-sleep-help` |

All five verified live by cache-busted `curl --http1.1` at 8 of 8 non-blank lines with 0 missing, plus
a real browser load. Full record: `docs/projects/website-surfaces/4_working/WS-006-run-log-2026-08-13.md`.

**`checkout-blocks.html` and `shared/checkout.css` are kept as history, not as deploy targets.** They
describe what each checkout served until this date. Do not paste them back without a ruling; doing so
reopens a $0 purchase path that Meta records as a `Purchase` rather than a `Lead`. The offers' Custom
CSS fields still carry `shared/checkout.css` and were left alone, since the bounce fires before render.

Everything below this line describes the retired checkouts and is retained for that reason.

---

## Why this existed

WS-004 shipped the thank-you pages, the sequences and the automations for the three
free samples, but nobody looked at the checkout page itself. Every free sample
checkout renders the Kajabi default: the theme placeholder image and an `<h2>`
carrying the offer title. No copy, no inclusions, no design. A parent who clicks
"Show me what's inside" lands on a page that does not say what is inside.

Verified live on August 13, 2026 by curl on the rendered section
`data-section-id="1744906803654"`:

| Offer | Slug | Left column today |
|---|---|---|
| Newborn Sleep Guide preview | `zs2zLeUw` | `placeholder.png` + `<h2>Newborn Sleep Guide - What's Inside</h2>` |
| Toddler Toolkit sample | `4HQjFJGC` | `placeholder.png` + offer title |
| 3-to-2 nap transition mini guide | `FwisMwa6` | `placeholder.png` + offer title |
| Catnapping guide | `2x92uaLF` | `placeholder.png`, no title block |
| `dk25rdGU` | `dk25rdGU` | `placeholder.png`, no title block |

The 7 day trial checkout is the working model: it carries a single code block
(`#snooze-custom-checkout`) in the left column plus its own Custom CSS. Source at
`../7-day-trial-membership/`.

## Contents

```
lead-magnet-samples/
  shared/
    checkout.css                     Free-sample checkout styles. Same class vocabulary as the trial
                                     checkout, minus the pricing-option and recurring-disclosure rules,
                                     plus .sample-highlight and .sample-scope. One CSS file, pasted
                                     into every sample offer's own Custom CSS field.
  newborn-guide-preview/
    checkout-blocks.html             LDCR04 / offer 2150851932 / slug zs2zLeUw / theme 2164093530
    preview-lesson-2193317102.html   Repo twin of the corrected preview lesson body
  toddler-toolkit-sample/
    checkout-blocks.html             LDCR03 / offer 2150846925 / slug 4HQjFJGC / theme 2164064013
  nap-transition-mini-guide/
    checkout-blocks.html             LDGD03 / offer 2151272119 / slug FwisMwa6 / theme 2166784491
  5-12-schedules-free-module/
    checkout-blocks.html             LMCR04 / offer 2150914364 / slug 2x92uaLF / theme 2164474536
  3-4-month-4hr-feeds-free-module/
    checkout-blocks.html             LMCR08 / offer 2150953839 / slug dk25rdGU / theme 2164710780
```

### Where each block's copy comes from

| Bundle | Source of the bullet list |
|---|---|
| newborn-guide-preview | Preview lesson `2193317102` "What You'll Learn" |
| toddler-toolkit-sample | Lesson `2193088353` "Welcome to the Toddler Toolkit" plus the course module titles |
| nap-transition-mini-guide | The offer's own description plus the WS-003 thank-you page |
| 5-12-schedules-free-module | Submodule "4: Schedules" lesson titles and lesson 4.1 body, course `2149258846` |
| 3-4-month-4hr-feeds-free-module | Lesson "Overnight Feeds and Resettling", course `2148571314` |

`get_product` on an access-level product does not expose a module mapping, so the LMCR04 and LMCR08 scope is inferred from product titles plus lesson content. Copy stays at the level the lesson bodies support.

The colours, fonts and sizes in `shared/checkout.css` are lifted verbatim from
`../7-day-trial-membership/shared/checkout.css` so the two checkouts match. They
are deliberate, not drift.

## Where the copy comes from

The bullet list is the "What You'll Learn" section of the live preview lesson
`2193317102` ("About the Newborn Sleep Guide", course `2149275660`), reworded to
the brand voice. Nothing in it is invented.

## Paste steps (per offer, browser, human logged in)

Kajabi checkout HTML, CSS and JS are per-offer, not site-wide. Repeat for each offer.

1. Offer admin -> Checkout tab -> Customize (theme builder for the offer's own
   checkout theme, `2164093530` for `zs2zLeUw`).
2. Left column: delete the placeholder image block and the text block carrying the
   offer title. Add one Code block in their place.
3. Paste `newborn-guide-preview/checkout-blocks.html` into the code block with the
   token-safe helper, never by retyping:

   ```bash
   agent-browser --session <name> eval "$(python3 apps/snooze-website/scripts/emit_paste_js.py \
     apps/snooze-website/kajabi-deployment/pages/checkout/lead-magnet-samples/newborn-guide-preview/checkout-blocks.html \
     --target ace)"
   ```

4. Paste `shared/checkout.css` into that offer's Custom CSS field the same way.
5. Save, then verify live:

   ```bash
   curl -s --http1.1 -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
     "https://www.joinsnooze.com/offers/zs2zLeUw/checkout?cb=$(date +%s)"
   ```

   Assert every non-blank line of the HTML file appears in the response, that
   `placeholder.png` is gone from the checkout section, and check
   `getComputedStyle` on `#snooze-custom-checkout h1` for `"Playfair Display", serif`.

## Open

- The other four sample checkouts in the table above need the same treatment. Copy
  per offer still has to be written from each product's own contents.
- Preview lesson `2193317102` carries two live copy defects: it calls Sally "a
  registered Australian paediatric nurse" (must be "internationally certified sleep
  consultant and former paediatric nurse") and it promises "weekly live group
  coaching calls with Sally", the offer WS-002 retired. Both are member-facing today.
