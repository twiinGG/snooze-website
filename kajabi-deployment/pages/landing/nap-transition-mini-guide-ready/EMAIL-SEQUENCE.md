# 3-to-2 Nap Transition Mini Guide Lead Gen Email Sequence

**Kajabi sequence id:** `2148871242` · **Send hour:** 11:00 Melbourne · **Builder:** classic HTML
**Bound to offer:** `FwisMwa6` (`2151272119`)
**Status:** all three emails created as **drafts** on 2026-08-09 (WS-003). None is published and none is bound to a trigger yet.

## The binding does not exist yet

Creating a sequence does not subscribe anyone to it. That needs a Kajabi automation with trigger **Offer is purchased: FwisMwa6** and action **Subscribe to an email sequence: 3-to-2 Nap Transition Mini Guide Lead Gen Email Sequence**, exactly as automation `369723` does for the catnapping form.

**The automations MCP toolset is not enabled on this account** (`list_automations` returns "not enabled for this account yet"), so the automation must be built by a human in the admin and cannot be verified from here.

**This gates the page paste.** `nap-transition-mini-guide-ready.html` tells the claimant that three emails are coming. That sentence is false until the automation exists and the emails are published. Build the automation and publish the emails first, or remove the "What comes next" band before pasting.

---

## The copy lives in `sequences/`, not here

Bodies, twins and paste instructions: [`../../../sequences/2148871242-3-to-2-nap-transition-mini-guide-lead-gen-email-sequence/`](../../../sequences/2148871242-3-to-2-nap-transition-mini-guide-lead-gen-email-sequence/)

That directory follows the same shape as the catnapping sequence `2148414612`: a `README.md` with
ids and editor URLs, a numbered `.txt` twin per email, and, because these are classic-HTML-editor
emails rather than theme-builder ones, a paste-ready `.html` body per email.

**The bodies currently in Kajabi are mangled.** They were created via `add_sequence_email` with raw
HTML in `body` but no `body_format: "html"`. That parameter defaults to `markdown`, so the server
parsed the HTML as markdown and the sanitizer rendered the tags as visible text. The `.html` files
in the sequences directory are the correct bodies and need pasting over what is there.

This file owns the *why*: what the magnet is, what was wrong with what came before, and what gates
the paste. The sequences directory owns the *words*. Do not copy bodies back into this file.
