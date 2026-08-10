# Toddler Toolkit Sample Lead Gen Email Sequence

**Kajabi sequence id:** `2148871240` · **Send hour:** 11:00 Melbourne · **Builder:** classic HTML
**Bound to offer:** `4HQjFJGC` (`2150846925`)
**Status:** created as drafts 2026-08-09 (WS-003). Emails 1 and 2 were rewritten the same day after the live course structure was read; **the corrected bodies below have not yet been pasted into Kajabi.**

---

## Read this before touching the copy

An automation named **"Toddler Toolkit Sample - Post-purchase"** already exists, is **Published**, and fires on `Offer is purchased: Toddler Toolkit - Sample Access`. Its action is an inline **Send an email**, subject "Your Toddler Toolkit sample is ready".

`list_sequences` cannot see it, because an inline automation email is not a sequence, and the automations MCP toolset is disabled on this account. That is why WS-003 first reported "no email exists for this magnet". It does.

**Kade ruling, 2026-08-09:** retire the inline email and change the automation's action to **Subscribe to an email sequence** pointing at `2148871240`. Reasons: it kills a dead CTA, it kills a fabricated module list, and it moves the copy into git.

### What was wrong with the inline email

| It said | Live truth |
|---|---|
| "Module 1: Understanding Toddler Sleep" | Module 1 is **The 2–1 Nap Drop** |
| "3 lessons" | **7 lessons**, 1.1 to 1.7 |
| Downloads "Toddler Sleep Development Timeline" and "Is This Normal? Quick Reference Guide" | Neither exists anywhere in the course |
| "7 modules and 25 lessons" | **8 numbered modules, 36 published lessons** |
| "Navigating the 2-to-1 nap transition" sold as paid content | That **is** the free sample |
| "Starting at $147/quarter (Founding Member pricing, locked in forever)" | `/snooze-membership` sells $79 / $66 / $55 USD, $119 / $99 / $83 AUD |
| CTA to `offers/6iRarwak/checkout` | Offer `2150812784` is **draft**. Anonymous 302s to `/library`. Dead |

It also carried two `&mdash;`, "Lifetime access" (banned by `SALLY-POSITIONING.md`), "weekly live coaching with me" (retired sitewide by WS-002), and no renewal disclosure on a subscription CTA.

### What the sample actually is

Kajabi native paywall on course `2149259086`. Limited-access product `2149272894`. The paywall sits after Module 1, so a sample claimant gets:

- "Welcome to the Toddler Toolkit" (intro module, 1 lesson)
- "Module 1: The 2–1 Nap Drop" (7 lessons, 1.1 to 1.7)

**8 lessons above the paywall.** Everything from Module 2 on is locked.

### The onward step is the trial, everywhere

**Kade ruling, 2026-08-09.** The course paywall offer is currently `FktmJAvJ` Toddler Sleep Course, $117 standalone. Every upsell surface for this magnet points at the **7 day trial** `mqQikDM7` instead, because the trial gives access to the full Toddler Toolkit *and* the rest of Snooze, where $117 buys one course.

That includes the Kajabi paywall offer dropdown, which is an admin change on the course Settings tab and is **not yet done**.

---

## The copy lives in `sequences/`, not here

Bodies, twins and paste instructions: [`../../../sequences/2148871240-toddler-toolkit-sample-lead-gen-email-sequence/`](../../../sequences/2148871240-toddler-toolkit-sample-lead-gen-email-sequence/)

That directory follows the same shape as the catnapping sequence `2148414612`: a `README.md` with
ids and editor URLs, a numbered `.txt` twin per email, and, because these are classic-HTML-editor
emails rather than theme-builder ones, a paste-ready `.html` body per email.

**The bodies currently in Kajabi are mangled.** They were created via `add_sequence_email` with raw
HTML in `body` but no `body_format: "html"`. That parameter defaults to `markdown`, so the server
parsed the HTML as markdown and the sanitizer rendered the tags as visible text. The `.html` files
in the sequences directory are the correct bodies and need pasting over what is there.

This file owns the *why*: what the magnet is, what was wrong with what came before, and what gates
the paste. The sequences directory owns the *words*. Do not copy bodies back into this file.
