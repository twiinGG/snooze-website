# live-capture: paste live here, then run the check

A holding pen for reading a live Kajabi field back into the repository so an
overwrite can be diffed **both directions** before it happens.

Nothing in this folder is a paste target and nothing here deploys. The files are
blank on purpose and should be left blank once a check is finished.

## Why both directions

Checking that the repo's lines appear in live detects **additions only** and is
blind to deletions. On 2026-08-16 that blindness came one keystroke from wiping
Meta Advanced Matching and the UTM attribution capture off every live checkout,
because a stale note in `PASTE-MAP.md` said the field held the loader alone.

## Do this

1. Kajabi, Settings, Checkout. The header field sits **inside a modal** behind
   the **Edit header tracking code** button. Open it.
2. Select all, copy.
3. Paste into **`A4-checkout-header-FULL.txt`**. The whole field, exactly as it
   came. Do not tidy it, do not reindent it, do not drop the `<script>` tags.
4. Run:

   ```bash
   node apps/snooze-website/kajabi-deployment/live-capture/check-live-vs-repo.mjs
   ```

That is the whole job. The three `A4-block-*.txt` files exist only if you would
rather copy block by block; if `A4-checkout-header-FULL.txt` has anything in it,
they are ignored.

## Reading the result

Exit 0 and **SAFE TO OVERWRITE** means live differs from the repo file by exactly
the checkout identity capture, which is the block ME-009 added and is meant to be
new. Anything else exits 1 and says why.

| Verdict | Meaning |
|---|---|
| `identical` | That block matches. Nothing to decide |
| `only repo, expected (new)` | The identity capture. This is the change you are shipping |
| `ONLY LIVE, would be DELETED` | Live has a block the repo file does not. **An overwrite destroys it.** Rebuild the repo file from live first |
| `ONLY REPO, unexpected` | The repo file carries a block that is not live and was not expected. Find out where it came from before shipping it |
| `DIFFERS at line N` | Present in both and not the same. Somebody edited live without bringing it back to git, or the repo moved ahead. Decide per block |
| `UNRECOGNISED LIVE BLOCKS` | Something is live that this repository does not describe at all |

The loader and Advanced Matching share one `<script>` tag, so when that tag
differs it is reported once, against the loader, and Advanced Matching is marked
as sharing it.

## After the paste

Verify with a cache-busted read asserting `SnoozeCheckoutIdentity`. Confirm the
marker exists in the source first with `grep -c`. **Never verify by a greyed-out
Save button**, and check `button.disabled` in the DOM rather than trusting an
accessibility snapshot. Checkout pages return 403 to curl, so read them through
the public browser lane on CDP 9224.

A paste into the closed modal writes to a hidden editor and does not save.

## A5, the footer field

`A5-checkout-footer-FULL.txt` is here for the same screen. `PASTE-MAP.md` records
the live footer as **empty** as of 2026-07-27 and notes it cannot be re-read by
public curl. If you are already in the modal, copy the footer field in too. An
empty paste confirms the record; anything in it is a finding, because the repo
believes nothing is deployed there.

The checker does not read that file yet, because there is no repo-side footer
content to diff it against. Tell me what lands in it and I will handle it.

## Housekeeping

Blank the files again once a check is done. Live field contents are a snapshot
that goes stale the moment somebody edits Kajabi, and a stale snapshot left lying
around is the exact failure mode this folder exists to prevent.

```bash
cd apps/snooze-website/kajabi-deployment/live-capture && : > A4-checkout-header-FULL.txt
```
