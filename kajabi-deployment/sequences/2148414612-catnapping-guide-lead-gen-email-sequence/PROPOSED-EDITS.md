# Proposed edits, Catnapping Guide Lead Gen Email Sequence (2148414612)

**Status:** proposed, not pasted. The `*.txt` twins in this folder stay as pulled-from-live snapshots (2026-07-06) until someone pastes these changes, then re-pull.

**Context:** `/catnapping` now captures through form `2148526865` (double opt-in) rather than the PWYW checkout. Full picture in [`../../pages/website/catnapping/CAPTURE-SETUP.md`](../../pages/website/catnapping/CAPTURE-SETUP.md). Delivery copy in [`../../pages/website/catnapping/CAPTURE-COPY.md`](../../pages/website/catnapping/CAPTURE-COPY.md).

Verified against live Kajabi 2026-08-05: three emails, all published, days 0 / 2 / 3, send times 11:00 / 11:00 / 09:00, timezone Melbourne.

---

## Defects, in severity order

| # | Email | Problem | Severity |
|---|---|---|---|
| D1 | 1 | "Grab it here in your Member Library" sends a brand-new lead to a **login wall**. A contact created by a form submission has no password. The guide is `DigitalDownload` `2148791611`, library-gated | **Blocker.** The delivery email does not deliver |
| D2 | 3 | Pitches **The Snooze Social**, which `SNOOZE-NAMING-CONVENTIONS.md` v2 marks `LEG*` legacy, "not sold to new customers". The offers registry only references it as a legacy member rate | **High.** Selling a retired offer to new leads |
| D3 | 1 | Typo: "Your copy of The Sleep Concierge's Catnapping Guide **using** is ready!" | **High.** Visible in the first line of the first email |
| D4 | 2 | "At 5-6 months, your baby's sleep cycles mature" age-locks the email. `/catnapping` serves all ages, and the age-lock in the old checkout copy is one of the reasons this capture moved | **Medium.** Wrong for a chunk of readers |
| D5 | 2, 3 | Both push the **5-12 Month Sleep Guide** and a three-offer menu while the page they came from CTAs to the **Snooze Membership** (`z63s9VaR`). The sequence undercuts the page and splits the ladder | **Medium** |
| D6 | 2 | "Join 1000's of well-rested parents" | **Medium.** Wrong apostrophe, and an unverifiable number |
| D7 | 3 | Day 3 lands one day after day 2, then the sequence stops dead | **Medium.** Two asks back to back, no follow-through |
| D8 | 3 | Subject "From exhausted to 14 hours of sleep a day" reads as a promise from Snooze, not a quote from a parent | **Medium.** Outcome claim in the subject line |

---

## Email 1, `2149832304`, day 0, 11:00

### Subject

Before: `Your Catnapping Guide (quick win inside!) 🎁`
After: `Your catnapping guide, plus one thing to try today`

The gift emoji adds nothing on a delivery email, and "quick win inside" is the promise; say what the win is about instead.

### Body

```
Hey {{ first_name }},

Your catnapping guide is ready.

[Open the guide]

Try this today, before you have even finished reading it:

Darken the room for the next nap. Really dark. If you can see your hand in front of your face, it is too bright.

It will not fix every short nap. It is the cheapest thing to try, it costs you nothing, and it is worth ruling out before anything harder.

Over the next few days I will send you the rest: what nap lengths actually look like at your baby's age, why the 30 to 45 minute wake happens, and what to change first.

Sweet dreams,

Sally

The Sleep Concierge

P.S. Been fighting short naps for a while? Reply and tell me your biggest challenge. I read every response.
```

### Button

Before: `Access Your Guide`, pointing at the Member Library.
After: `Open the guide`, pointing at **the same public guide URL used on the confirmation page**, not the library.

That is the D1 fix and the one change in this document you cannot skip. If the library link stays, keep it as a secondary line ("it is also saved in your Snooze library") and never as the primary button.

### Also fixed here

D3 typo. Removed "using". Also dropped "The Sleep Concierge's Catnapping Guide" to "your catnapping guide", because they know whose guide it is by now.

**D9, added 2026-08-06 from the cross-provider verify pass.** The draft previously read "That one change extends naps for a lot of babies straight away." That is an unquantified efficacy claim about infant sleep, made to an exhausted parent, with "a lot of babies" implying a population-level result and "straight away" adding a timing promise on top. Neither is substantiated anywhere in the repo. Under Australian Consumer Law a material benefit claim needs to be substantiable, and this one reads as proven when it is anecdotal.

The replacement makes the same suggestion without promising an outcome: it names the cost (nothing) and the reason to try it first, rather than the result. **This is clinical-adjacent wording and Sally gates it**, both for accuracy and because she may want a different first tip entirely. Full verify output: [`../../../../docs/projects/catnapping-guide/4_working-cng002/verify/claims-cursor-composer.md`](../../../../docs/projects/catnapping-guide/4_working-cng002/verify/claims-cursor-composer.md).

---

## Email 2, `2149832305`, day 2, 11:00

### Subject

Before: `Baby still stuck with 30-minute naps?`
After: keep it. It is specific, it names the symptom, and it is the strongest subject in the sequence.

### Body

```
Hey {{ first_name }},

Does this sound familiar?

Your baby wakes after 30 or 45 minutes, almost to the minute. Resettling feels impossible. You are both fried by mid-afternoon. Nothing you have tried has stuck.

Here is the part most parents are never told: a short nap is usually a symptom, not the problem. As sleep cycles mature, the day that used to work stops working, and naps are the first thing to break.

Which means the fix is rarely a nap trick. It is the day around the nap: wake windows that match your baby now, feeds anchored in the right places, a settling approach you can repeat when you are tired.

That is what the Snooze Membership is for. Age-by-age plans, the full course library, and Sally's coaching when your baby does not match the plan. Your catnapping guide is already part of it.

[See the Snooze Membership]

Sweet dreams,

Sally

The Sleep Concierge
```

### What changed

- **D4:** the "at 5-6 months" age-lock is gone. "As sleep cycles mature" is true across the age range the page serves.
- **D5:** the 5-12 Month Sleep Guide pitch becomes the membership (`https://www.joinsnooze.com/offers/z63s9VaR/checkout`), matching the `/catnapping` page CTA. "Your catnapping guide is already part of it" is verifiable: product `2148791611` is bundled into every Snooze Membership variant.
- **D6:** "Join 1000's of well-rested parents" removed entirely rather than re-punctuated. If you want social proof here, use a named testimonial like Alice's in email 3.
- The ❌ / ✨ checklist blocks are gone. They date the email and they read as a template. The same four symptoms now run as one sentence a tired parent can absorb.

If you would rather keep the 5-12 Month Sleep Guide as the entry price point, make it the **secondary** line under the membership button, not the headline ask. Do not put two paid options at equal weight.

---

## Email 3, `2149832306`, day 3, 09:00 → move to day 6

### Timing

Move to **day 6**. Day 3 gives the reader one day between two paid asks. Day 6 also puts a full week of the sequence in front of them, which is when a parent who tried the guide has something to report.

Also set the send time to 11:00 so all three match. There is no reason for this one to go at 09:00.

### Subject

Before: `From exhausted to 14 hours of sleep a day`
After: `Alice's baby went from 3 to 5 wake-ups to 90 minute naps`

D8. Same outcome, attributed to the parent who lived it, so it reads as a story rather than a promise from Snooze.

### Body

```
Hi again {{ first_name }},

I want to share Alice's story.

"We were on 3-5 wakes a night with our 5-month-old, and I needed to hold her for every nap during the day, with it getting harder and harder to get her to sleep (even in my arms).

In less than a week our babe was putting herself to sleep with no dummy, sleeping roughly 6pm - 7am with one feed at night. In less than two weeks she was also putting herself to sleep for naps, lasting roughly 90 minutes. She now sleeps between 14-15 hours a day and puts herself to sleep every time.

After following Sally's guide, I feel I am once again enjoying my little girl, and also have the time to look after myself."

Alice's baby is not your baby, and that is the honest catch with any guide. Every baby needs the plan adjusted, which is the part a PDF cannot do.

That is why the membership exists: the age-by-age plans, the courses, and Sally in your corner when your baby does not follow the plan. Sally is an internationally certified sleep consultant and former paediatric nurse, and she reads the questions herself.

[See the Snooze Membership]

Wherever you are with sleep right now, you are not alone in it.

Sweet dreams,

Sally

P.S. Not sure whether the membership is right for you? Reply and tell me your baby's age and what your days look like. I will tell you straight.
```

### What changed

- **D2:** The Snooze Social is gone. Confirm it really is closed to new customers before pasting; the registry treats it as legacy, and this doc assumes that is current.
- **D5:** the three-offer menu (guide, Social, 3-4 month course) collapses to one ask. A menu at the end of a lead-gen sequence is a decision the reader will not make.
- The Instagram and TikTok block is dropped from the ask, not because the handles are wrong (`@thesleepconcierge` on both, matching `global/html/footer.html`) but because it competes with the one CTA. Social links already live in the email footer.
- Sally's positioning line uses the mandated wording, "former paediatric nurse".

**Confirm before paste:** Alice's testimonial should be traceable to an approved source in the client-testimonials project. It is quoted verbatim from the current live email, so this is a check, not a new claim.

---

## Optional, once the three above are fixed

- **A day 9 email.** Three emails and out is a short runway for a membership decision. One more, leading with a single objection ("I do not want to sleep train"), would carry the readers who are still thinking.
- **A guide re-send for non-openers.** The most common reason a lead magnet fails is that email 1 was never opened. A day 4 re-send to non-openers, same guide link, different subject, is the cheapest recovery in the sequence.
- **Sequence-complete tag.** Automation `369721` already adds `Catnapping Series Complete` when the sequence finishes. Worth using as a segment for later campaigns rather than leaving it inert.

---

## Paste order

1. Fix email 1's button URL first. Until that is done, the sequence's core promise is broken regardless of copy.
2. Email 1 body and subject.
3. Email 2 body, subject unchanged.
4. Email 3 body, subject, and move day 3 to day 6 with an 11:00 send.
5. Re-pull the twins into this folder and update `README.md` with a "Pasted live" date per email.
