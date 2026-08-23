# Camp Snooze V2 Luxury - Deploy Notes

## File map

| File | Purpose |
|------|---------|
| `camp-snooze-landing-page-blocks.html` | Landing page blocks - CHECKOUT mode (live intake) |
| `camp-snooze-landing-page-blocks-waitlist.html` | Landing page blocks with live capacity and waitlist capture |
| `camp-snooze-v2-luxury.css` | Shared stylesheet for both landing page variants |
| `camp-snooze-v2-luxury.js` | Shared JavaScript for both landing page variants |
| `Camp Snooze Pricing V2 Mockup.html` | Standalone pricing mockup (self-contained, not Kajabi blocks) |
| `camp-snooze-waitlist-next-steps.html` | Post-waitlist-signup confirmation page blocks |
| `camp-snooze-waitlist-next-steps.css` | Stylesheet for waitlist next-steps page |
| `camp-snooze-waitlist-next-steps.js` | JavaScript for waitlist next-steps page |

---

## Kajabi deploy locations

The live page is the landing page **Welcome to Camp Snooze** (id `2151771543`,
path `camp-snooze-sleep-coaching`), whose theme is `2164288957`. All three files
live on **that page's theme**, not the site theme:

| File | Kajabi location |
|------|-----------------|
| `camp-snooze-v2-luxury.css` | Theme editor -> Settings -> Custom Code -> Custom CSS |
| `camp-snooze-v2-luxury.js` | Theme editor -> Settings -> Custom Code -> Custom JavaScript |
| `camp-snooze-landing-page-blocks.html` | Theme editor -> Sections -> Full Page -> Custom Code block |

Theme editor URL: `https://app.kajabi.com/admin/themes/2164288957/settings/edit`.

Both Custom Code fields and the block's code field are Ace editors, and Save
issues one `PUT /admin/themes/2164288957/settings` carrying the whole settings
hash. Two consequences:

- There is no draft layer. Save is live.
- Whoever saves last wins the whole hash, so never leave two editor tabs open on
  the same theme.

### Deploying without hand-pasting

`agent-browser` can drive the editor, which is how the 2026-08-23 changes
shipped. Sign-in persists in the browser profile, so this needs no credentials
inline:

```bash
agent-browser open "https://app.kajabi.com/admin/themes/2164288957/settings/edit"
# Sections -> Full Page -> Custom Code, or Settings -> Custom Code for CSS/JS
# then, with the target Ace editor identified (mode css / javascript / html):
agent-browser eval "$(python3 -c "
import json; print('(function(){var v=' + json.dumps(open('FILE').read()) + \
  ';var ed=ace.edit(document.querySelectorAll(\".ace_editor\")[N]);' \
  'ed.setValue(v,-1);return ed.getValue()===v?\"MATCH\":\"MISMATCH\";})()')
")"
```

Then click Save and confirm the `PUT .../settings` returned 200. Two gotchas:

- Wait a beat before reading the Save button's `disabled` state; React needs a
  tick to notice the Ace change, and a too-early read reports it still disabled.
- The Kajabi MCP `update_theme_content` can write the same fields, but the block
  code is a single ~45KB string, so the tool call has to carry the whole page.
  The Ace route reads the file from disk instead.

**Always diff live against the repo before deploying.** Live had drifted twice
(`?limit=5` vs `3`, the AUD `/checkout` suffix) and a blind paste would have
reverted both. Pull the live page with `curl` and diff the extracted block and
`/* Custom JS Added Via Theme Settings */` script against these files.

---

## Mode switching

The two HTML block files share the same CSS and JS. Switch between modes by choosing which HTML file to paste into Kajabi:

- **LIVE CAPACITY mode (currently live):** use `camp-snooze-landing-page-blocks.html`
  - Sets `window.CAMP_PAGE_MODE = 'live-capacity'` in its first line
  - Reads the `camp-capacity` Edge Function and renders the next five intakes
  - Offers checkout for open intakes and the waitlist for full or closed intakes
  - Falls back to a neutral message and keeps checkout working if the feed fails
- **WAITLIST mode:** use `camp-snooze-landing-page-blocks-waitlist.html`
  - Sets `window.CAMP_PAGE_MODE = 'waitlist'`; the sticky CTA becomes a single
    "Join the Waitlist" button with no price and no currency toggle

---

## Offer IDs and URLs

| Identifier | URL / ID |
|-----------|---------|
| Camp Snooze USD checkout | `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout` |
| Camp Snooze AUD checkout | `https://www.joinsnooze.com/offers/46Bz9tk6/checkout` |
| Waitlist signup form | `https://www.joinsnooze.com/forms/2149246740` |
| Snooze Membership (USD, used in waitlist next-steps) | `https://www.joinsnooze.com/offers/z63s9VaR` |

These URLs appear in both HTML and JS. Update in both places when offer IDs change.

---

## Currency toggle

Live toggles, as of 2026-08-23: the **sticky footer** one (built in JS) and the
**nav / mobile menu** ones (injected by `campInjectToggles` when the theme
exposes a matching container). The inline toggle that used to sit above the
cohort cards was removed — see `CURRENCY-TOGGLE.md`.

`CAMP_CURRENCY_CONFIG` in `camp-snooze-v2-luxury.js` holds the USD and AUD checkout URLs.
Dynamic prices use `data-usd` and `data-aud` attributes on `.dynamic-price` elements.
Default currency auto-detects from the visitor's timezone (Australia/* -> AUD, all others -> USD).
Preference is persisted in localStorage under the key `snooze_currency_preference`.

---

## Countdown timer

The older checkout variant still uses `COUNTDOWN_DEADLINE`. The live-capacity
variant reads checkout dates from the cohort feed and needs no date edit per Camp.

---

## Font Awesome CDN (pre-commit note)

The Font Awesome CDN link in both HTML block files includes the integrity hash:
```
sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==
```
The `pragma: allowlist secret` directive has been removed from the inline HTML as part of comment stripping. If the pre-commit secret scanner flags this hash, add the file to the scanner's allowlist config instead.

---

## Cohort date format

`dateLabel` in `camp-snooze-v2-luxury.js` renders cohort start dates as
`Monday 14 Sept 2026`. Months come from the `CAMP_MONTHS` table, deliberately
not from `Intl`'s `month: 'short'` — ICU disagrees across browsers on `Sep` vs
`Sept`, and mixed widths made some cards wrap to two lines while their
neighbours did not. Day, weekday and year come from `Intl`, pinned to
`Australia/Melbourne` so a cohort start cannot slide a day for a US visitor.
