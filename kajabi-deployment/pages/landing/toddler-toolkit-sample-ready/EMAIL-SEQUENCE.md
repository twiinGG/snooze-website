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

## Emails

| # | Day | Kajabi id | Subject | State |
|---|---|---|---|---|
| 1 | 0 | `2151354199` | Your Toddler Toolkit sample is ready | **needs the corrected body below pasted** |
| 2 | 2 | `2151354200` | The 2–1 nap drop takes longer than you think | **needs the corrected body below pasted**, subject also changes |
| 3 | 6 | `2151354201` | When a sample is not enough | as created, no change needed |

Asset link: `https://www.joinsnooze.com/products/88d5fab2-212c-4d84-8fcd-8aa5c4d9ce0c`
Trial CTA in email 3: `https://www.joinsnooze.com/offers/mqQikDM7/checkout`, with the approved renewal disclosure directly beneath the button, per `cta-trial-ADJUDICATION.md`.

---

## Email 1, corrected body

Subject stays `Your Toddler Toolkit sample is ready`.

```html
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.8; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px;">
<p>Hi {{ first_name }},<br /><br /></p>
<p>Your Toddler Toolkit sample is in your library. Nothing else to claim and nothing to pay.</p>
<p>You have the welcome lesson and all seven lessons of <strong>Module 1: The 2&#8211;1 Nap Drop</strong>, which is the transition that catches most families out between 13 and 18 months.</p>
<p style="text-align: center; margin: 28px 0;"><a href="https://www.joinsnooze.com/products/88d5fab2-212c-4d84-8fcd-8aa5c4d9ce0c" style="display: inline-block; padding: 1rem 2rem; background: #F43357; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Open your sample</a></p>
<p><strong>What is in it</strong></p>
<ul style="color: #1f293b; line-height: 2; margin-top: 0;">
<li>What is actually going on in the 2&#8211;1 drop</li>
<li>The transitional short and long schedule, and how to use it</li>
<li>How to know it is genuinely time for one nap</li>
<li>Making the drop, and troubleshooting when it goes sideways</li>
<li>Your role through the transition</li>
</ul>
<p>Start at 1.1 and read straight through before you change anything. It is short, and knowing the whole shape first saves you guessing at 2am.</p>
<p>Then hold whatever you change for 48 hours. Toddlers push back before they settle, so two days tells you far more than two hours.</p>
<p>Sally<br />The Sleep Concierge</p>
</div>
```

## Email 2, corrected body

Subject changes from "The toddler bedtime problem is rarely bedtime" to **`The 2–1 nap drop takes longer than you think`**. The original was written about bedtime resistance, which is not what the sample covers.

```html
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.8; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px;">
<p>Hi {{ first_name }},<br /><br /></p>
<p>The most common mistake in the 2&#8211;1 nap drop is treating it as a switch rather than a stretch.</p>
<p>One bad day of two naps does not mean they are ready for one. Most toddlers spend weeks somewhere in between, which is exactly why Module 1 gives you a transitional schedule instead of a date to circle.</p>
<p>Two things worth knowing while you are in it. An earlier bedtime carries you through the gap far better than a longer day does. And a toddler mid-transition will often take a great one-nap day, then fall apart the next. That is normal and it is not a signal to go back.</p>
<p style="text-align: center; margin: 28px 0;"><a href="https://www.joinsnooze.com/products/88d5fab2-212c-4d84-8fcd-8aa5c4d9ce0c" style="display: inline-block; padding: 1rem 2rem; background: #F43357; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Open your sample</a></p>
<p>Lesson 1.6 is the one to reread if this week has been messy.</p>
<p>Sally<br />The Sleep Concierge</p>
</div>
```

Both bodies use `&#8211;` for the en dash in "2–1" because that is the course's own module title, not prose punctuation. No em dashes anywhere.

---

## House rules these bodies follow

- Single wrapper `div`, all styling inline, no `!important`.
- `<br />` for spacing rather than margin-bottom.
- `{{ first_name }}` merge tag, matching the spacing Kajabi already uses on this site.
- No em dashes, no Oxford comma, no LLM fingerprint phrases.
- Sally writes in first person and signs off. Never described as a current or registered nurse.
- No claim about module or lesson counts that a `get_course` read does not support.

## Live source of truth

The bodies live in Kajabi. This file records what was written, why, and the ids. If you edit an email in the admin, update this file in the same change or the two drift.

There is no MCP tool to update or delete a sequence email, only `add_sequence_email`. So corrections to an existing email are an admin paste, and this file is where the paste comes from.
