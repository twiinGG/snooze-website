# live-capture: paste live here, then run the check

A holding pen for reading live Kajabi fields back into the repository so an
overwrite can be diffed **both directions** before it happens.

Nothing in this folder is a paste target and nothing here deploys. The files are
blank on purpose and should be left blank once a check is finished.

## Why both directions

Checking that the repo's lines appear in live detects **additions only** and is
blind to deletions. On 2026-08-16 that blindness came one keystroke from wiping
Meta Advanced Matching and the UTM attribution capture off every live checkout,
because a stale note in `PASTE-MAP.md` said the field held the loader alone.

## Do this

1. Open the Kajabi field, select all, copy.
2. Paste into the matching `.txt` file below. The whole field, exactly as it
   came. Do not tidy it, do not reindent it, do not drop the `<script>` tags.
3. Run:

   ```bash
   node apps/snooze-website/kajabi-deployment/live-capture/check-live-vs-repo.mjs
   ```

Blank files are skipped, so paste only what you have. To check one target:
`node check-live-vs-repo.mjs A4`, or `C-linktree` for both linktree files.

**If a live field is empty, write the word `EMPTY` in the file.** A blank file
means "not captured yet" and is skipped. Silence is never treated as a result.

## The files

| File | Kajabi location | Canonical file in git |
|---|---|---|
| `A2-theme-custom-code-CSS-FULL.txt` | Customizer, Theme Custom Code, **CSS** | `global/css/theme-custom-code.css` |
| `A3-theme-custom-code-JS-FULL.txt` | Customizer, Theme Custom Code, **JS** | `global/js/theme-custom-code.js` |
| `A4-checkout-header-FULL.txt` | Settings, Checkout, **Edit header tracking code** (inside the modal) | `global/html/checkout-header-tracking.html` |
| `A5-checkout-footer-FULL.txt` | Settings, Checkout, **Footer tracking code** | `global/js/kajabi-checkout-tracking.js` |
| `C-linktree-CSS-FULL.txt` | `/links` landing page theme, CSS | `pages/landing/linktree/linktree-landing-page.css` |
| `C-linktree-JS-FULL.txt` | `/links` landing page theme, JS | `pages/landing/linktree/linktree-landing-page.js` |
| `C-trial-thank-you-CSS-FULL.txt` | Trial thank-you page theme, CSS | `pages/landing/7-day-trial-thank-you/thank-you-page.css` |
| `C-trial-thank-you-JS-FULL.txt` | Trial thank-you page theme, JS | `pages/landing/7-day-trial-thank-you/thank-you-page.js` |
| `C-membership-welcome-CSS-FULL.txt` | Membership welcome page theme, CSS | `pages/landing/snooze-membership-welcome/welcome-page.css` |
| `C-membership-welcome-JS-FULL.txt` | Membership welcome page theme, JS | `pages/landing/snooze-membership-welcome/welcome-page.js` |

The three `A4-block-*.txt` files exist only if you would rather copy the checkout
header block by block. If `A4-checkout-header-FULL.txt` has anything in it, they
are ignored.

**Landing pages not listed** are ones the repo has no CSS or JS for at all:
`camp-snooze`, `day-pass`, `day-pass-paidads`, `snooze-access-paidads`,
`cold-traffic-landing-page` and the four `*-ready` guide pages. Those need a pull
from live before there is anything to diff, and that is WS-001's job, not a paste
decision. Ask and I will add a file for any of them.

## Reading the result

Exit 0 and **safe to overwrite** on every checked target. Anything else exits 1
and names the target and the reason.

| Verdict | Meaning |
|---|---|
| `identical` | Matches. Nothing to decide |
| `only repo, expected (new)` | The checkout identity capture. This is the change being shipped |
| `ONLY LIVE, would be DELETED` | Live has content git does not. **An overwrite destroys it.** Rebuild the canonical file from live first |
| `ONLY REPO, would be ADDED` | Reported, not blocking. This is usually the reason you are pasting |
| `DIFFERS at line N` | Present in both and not the same. Somebody edited live without bringing it back to git |
| `UNRECOGNISED LIVE BLOCKS` | Something is live that this repository does not describe at all |
| `REPO FILE IS A PLACEHOLDER` | The canonical file exists but holds nothing usable. Pasting from git would blank the live field |
| `same lines, different order` | Content matches, sequence does not. For CSS that can change what wins |

In the checkout header the loader and Advanced Matching share one `<script>` tag,
so when that tag differs it is reported once, against the loader.

## A finding this folder already produced

`pages/landing/linktree/linktree-landing-page.js` is **1 byte**, the single
character `l`, committed in ME-005 `e400ad085`. `PASTE-MAP.md` called `/links`
"the only complete trio". Pasting that file into the live JS field would have
blanked it. The map is corrected and the checker now refuses any canonical file
under 20 significant characters.

## After the paste

Verify with a cache-busted read asserting a distinctive marker, confirmed present
in the source with `grep -c` first. **Never verify by a greyed-out Save button**,
and check `button.disabled` in the DOM rather than an accessibility snapshot.
Checkout pages return 403 to curl, so read those through the public browser lane
on CDP 9224.

A paste into the closed checkout modal writes to a hidden editor and does not
save.

## Housekeeping

Blank the files again once a check is done. A live snapshot goes stale the moment
somebody edits Kajabi, and a stale snapshot left lying around is the exact
failure mode this folder exists to prevent.

```bash
cd apps/snooze-website/kajabi-deployment/live-capture && for f in *.txt; do : > "$f"; done
```
