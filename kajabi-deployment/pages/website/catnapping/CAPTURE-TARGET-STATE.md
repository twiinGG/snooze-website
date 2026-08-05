# Lead capture target state: the flow worth building

Anchored on the catnapping guide, but the shape generalises to every pillar and age hub. Written August 5, 2026, unconstrained by the current Kajabi setup, then phased back into what exists.

Companions: [`CAPTURE-SETUP.md`](./CAPTURE-SETUP.md) (what is live), [`CAPTURE-COPY.md`](./CAPTURE-COPY.md) (copy for the current flow), [`../../sequences/2148414612-catnapping-guide-lead-gen-email-sequence/PROPOSED-EDITS.md`](../../sequences/2148414612-catnapping-guide-lead-gen-email-sequence/PROPOSED-EDITS.md) (sequence fixes).

---

## The flow

```
/catnapping (pillar, ranks, answers the question)
   |
   |  capture: email only, single opt-in + reCAPTCHA
   v
/catnapping-guide-ready  (100% view rate)
   |-- guide delivered ON THIS PAGE, instantly
   |-- one-tap question: how old is your baby?   <-- costs nothing, segments everything
   |-- single CTA: start the 7 day trial
   |
   v
age-branched email sequence (same spine, age-correct content and age-correct product)
   |
   v
7 day membership trial  ->  membership
```

Five changes carry almost all the value: deliver on the page not the inbox, drop the confirmation gate, ask age after the email, branch the sequence on age, and make the trial the ask instead of a price.

---

## 1. The asset: stop shipping a guide, ship a card and a tracker

Current asset is a PDF guide. Guides convert at **20-35%** on a landing page. Checklists and templates convert at **30-50%** (`lead-magnets` skill, `references/benchmarks.md`), because the value is legible in three seconds and consumable in three minutes.

The catnapping page already tells you what parents actually want, and it is not a guide. It is two things:

1. **An age-by-age nap norms card.** One page. "At your baby's age, this is normal, this is not." It answers the only question a parent with a catnapper has, which is "should I be worried".
2. **A five day nap tracker.** One page, printable, or a simple table. Log wake time, naps, feeds, bedtime.

The tracker is the strategic piece, for a reason that has nothing to do with conversion rate: it creates a **return visit and a reason for email two to exist**. "You have logged five days. Here is what the pattern means." That is a real conversation, unlike "here is another tip".

Keep the existing PDF. It becomes the third thing in the pack, for the parent who wants the long read. Nothing is wasted, and "card plus tracker plus full guide" reads as more valuable than "guide".

**Effort:** the norms data already exists in the Sleep Schedule Bible and the page's own age table. This is a design job, not a research job. Roughly a day.

---

## 2. Capture: email only, single opt-in

### Fields

Email only. Not name plus email.

Every extra field costs 5-10% of conversions, and going from many fields to few has been measured at around a **120% lift in completion**. Name buys you "Hey Sarah" in email one, which is worth less than the conversions it costs. If Sally wants the name, ask for it on the thank-you page alongside the age question, where it is free.

### The opt-in decision, and a correction

**Recommendation: single opt-in with reCAPTCHA. This reverses what I told you earlier in this session.**

Earlier I said keep Double Opt-In for deliverability. The numbers say that is the wrong call *for this specific setup*, and the reason is Kajabi's wiring rather than opt-in theory.

The case against double opt-in here:

- MailChimp's own study found **61% of people never complete** the double opt-in process. Other reporting puts confirmation rates between 65% and 90% with a good flow, and one Oracle case reached 96%, but the spread is enormous and it depends on a fast, obvious confirmation email.
- Single opt-in has been measured at a **1.28% subscription rate versus 0.33%** for the two-step process. Close to 4x the raw signups.
- **In Kajabi, non-confirmers get nothing.** No grant, no sequence, no guide, because both automations trigger on the confirmed submit. So the confirmation step is not filtering out low-quality leads, it is failing to deliver to people who asked. A parent who typed their address correctly and just did not see the confirmation email is indistinguishable from a bot.
- The current form has **103 submissions in roughly 29 months**. That is not a list with a quality problem. It is a list with a volume problem.

The case for double opt-in, stated fairly, because it is real:

- Double opt-in lists exceed **97% inbox placement** against a global rate of 83-85%.
- They produce **72.2% more unique opens, 114% more clicks, and 48.3% fewer bounces**.
- Adoption is roughly split: about 40% of US senders use double opt-in, 47.6% single.

Those deliverability gains are worth protecting, and you can get most of them without gating delivery:

1. **reCAPTCHA.** Kajabi enables it automatically on single opt-in forms. Bots and spamtraps are the actual mechanism behind single opt-in's worse deliverability, and this is the direct answer to them.
2. **Engagement-based sunsetting.** Drop or suppress anyone who has not opened in 90 days. This achieves what double opt-in achieves, after the fact, without costing you the initial delivery.
3. **A welcome email people actually open.** The delivery email for a guide someone just asked for should be the highest-open email you send. If it is not, that is the problem to fix, not the opt-in setting.

**If Sally is not comfortable dropping the confirmation:** decouple it. Deliver the guide on the thank-you page to everyone, and let the confirmation gate only the ongoing email sequence. Nobody who asked for the guide leaves empty-handed, and the list stays confirmed. This is the compromise position and it is defensible.

---

## 3. Delivery: on the page, then also by email

The thank-you page has a **100% view rate**. Email open rates are 20-30% and spam filtering gets tighter every year. Delivering a lead magnet by email alone means the majority of a page's conversions never receive the thing they converted for.

So: deliver on the page, and email a copy as well. The hybrid is the consensus position, and the email copy matters because parents come back to it weeks later.

The page carries **one** CTA. Pages with a single focused CTA convert at 2-3x the rate of pages with competing buttons, which is the argument against the current sequence's three-offer menu as well.

---

## 4. Post-capture profiling: the highest-leverage change

**Ask baby's age on the thank-you page, not on the form.**

Every Snooze product is age-banded: Newborn Sleep Guide, 3-4 Month course, 5-12 Month course, Toddler Toolkit. Catnapping spans roughly 3 to 6 months. Right now the funnel throws that away: an age-agnostic guide, an age-agnostic sequence that then contradicts itself by age-locking email two at "5-6 months", and a product recommendation that is a guess.

One tap on the thank-you page fixes it. Four buttons: `0-3 months`, `4-6 months`, `7-12 months`, `12 months plus`. No typing, no submit, and it happens **after** the email is banked, so it cannot cost you a lead.

The fields already exist at site level on that form: `Baby's Age` (SelectBoxField, `custom_5`) and `Baby's Date of Birth` (`custom_7`). Note both are `required: true` at site level, which is exactly why they must not go on the capture form.

Date of birth beats an age bracket if you can get it, because a bracket goes stale and a date of birth stays true and lets you time future campaigns to the four month regression, the 3-to-2 nap transition and so on. But a date needs typing, and a bracket is one tap. Take the bracket, and ask for the date later in the sequence when trust is higher.

Expected value is not a small lift. It changes the product recommendation from a guess to a match on every downstream email.

---

## 5. Sequence: one spine, four age branches

Keep the current spine, it is sound: deliver, then diagnose, then story, then ask. Change what fills it.

| Email | Day | Job | Age-specific part |
|---|---|---|---|
| 1 | 0, immediate | Deliver the pack, one quick win | The norms card for their bracket |
| 2 | 2 | "A short nap is a symptom, not the problem" | Which part of *their* day is the usual culprit |
| 3 | 5 | Parent story plus the honest catch: every baby needs the plan adjusted | A story from a parent with a baby the same age |
| 4 | 8 | Single ask: 7 day trial | The course in the membership that matches their bracket |

Two mechanical notes. Email 1 must send **immediately**, not at a fixed 11:00 clock time, because a delivery email that arrives up to 23 hours later is not a delivery email. And add a day-4 re-send of the pack to non-openers of email 1, which is the cheapest recovery in any lead magnet funnel.

Four branches times four emails is sixteen emails, which sounds like a lot. It is not: the spine and roughly 70% of the copy are shared, and only the age-specific paragraph and the product link change.

---

## 6. The ask: a trial, not a price

Free guide to a $197 quarterly membership is too big a step, and a three-option menu is worse than one option.

The bridge already exists and is published:

| Offer | Code | Slug | Terms |
|---|---|---|---|
| The Snooze Membership - 7 Day Trial (USD) | `PUBMS02_USD` / `2150887297` | `mqQikDM7` | 7 day trial, then $79/mo, with $197/quarter and $657/year variants |
| The Snooze Membership - 7 Day Trial (AUD) | `PUBMS02_AUD` / `2151254578` | `Sr6KzShx` | 7 day trial, then $119/mo, $299/quarter, $997/year |

**The catnapping guide is inside both.** Product `2148791611` is bundled into the trial, the membership and 32 other offers. So the pitch writes itself and it is literally true: they already have one piece of the library, and the trial opens the rest for a week.

Free trials sit at "Very High" net value in the lead-magnet quality table for a reason: low volume, very high quality. Moving the ask from a price to a trial is the difference between asking a stranger to commit and asking them to look.

Use the currency toggle logic already in the site header scripts so the trial link matches the visitor's currency.

---

## 7. Distribution: one capture, many doors

The guide currently exists on exactly one page. Content upgrades convert **2-5x better than generic CTAs**, and there are already-built pages whose readers want this exact asset:

| Surface | Framing | Expected |
|---|---|---|
| `/catnapping` | The primary, as now | 20-40% of engaged readers on a dedicated section |
| `/night-wakings`, `/early-rising`, `/nap-transitions`, `/sleep-regressions` | Content upgrade framed to that page's problem, same pack | 3-8% of readers |
| Age hubs (newborn, 3-4, 5-12) | Framed as "is this normal at this age" | 3-8% |
| Exit intent on `/catnapping` | Same pack, one line | 2-5% of visitors |
| Instagram and TikTok bio, `@thesleepconcierge` | Link to the dedicated page | 10-20% of clicks |
| Meta lead ads, later | Only once the organic funnel converts | 10-25% cold |

One form serving several pages is fine, provided the page path rides along in the dataLayer so you can still tell which door they came through. See the attribution section of `CAPTURE-SETUP.md`.

---

## 8. What to measure

| Metric | Where | Benchmark or target |
|---|---|---|
| Capture rate, dedicated section | GA4, `/catnapping` | 20-40% organic, 10-25% paid |
| Capture rate, content upgrade | GA4, other pillars | 3-8% of readers |
| Guide opened on the thank-you page | Click on the download button | Should approach 100%. Anything low means the page is confusing |
| Age captured | Thank-you page tap rate | 60% plus. Below that, the question is badly placed |
| Email 1 open | Kajabi | 40% plus is the quality signal for lead-magnet leads |
| Trial starts per 100 leads | Kajabi | Establish a baseline, there is no useful external benchmark |
| Trial to paid | Kajabi | Existing membership trial data |
| Unsubscribes in the first 3 emails | Kajabi | High means the asset attracted the wrong parents |

**First test, once the flow works:** single opt-in against double opt-in. It is the single largest lever in this document, the two arms are trivial to build, and the argument in section 2 is inference from published benchmarks rather than evidence from this list. Measure delivered leads and email 1 opens, not raw submissions, or you will prove the wrong thing.

---

## Phasing

**P0, this week, unblocks everything.** Fix delivery. The guide file gets a public URL, the thank-you page serves it, email 1 stops pointing at a login wall, and the Lead tag fires. Everything in `CAPTURE-COPY.md` and `PROPOSED-EDITS.md`.

**P1, next.** Single opt-in with reCAPTCHA, or the decoupled compromise. Age question on the thank-you page. Email 1 to immediate send. Sequence pitches the trial rather than a menu.

**P2, when P1 has data.** The norms card and tracker as the headline asset. Age-branched sequence. Content upgrades on the sibling pillars.

**P3, optional.** Date of birth capture mid-sequence for lifecycle timing. Meta lead ads. The quiz version of the capture, which is the natural end point if age segmentation proves out: "how old is your baby, what is your nap situation" as the capture itself, since quizzes convert at 30-50% and segment by design.

---

## Sources

- [Double Opt-In vs. Single Opt-In: Which Is Better for Conversions? (OptinMonster)](https://optinmonster.com/double-optin-vs-single-optin-which-one-is-better/)
- [Single vs. Double Opt-In: Which Strategy Should You Actually Use (Litmus)](https://www.litmus.com/blog/single-opt-in-vs-double-opt-in-case-for-soi)
- [Double Opt-In vs Single Opt-In in 2026 (Scrap.io)](https://scrap.io/double-opt-in-vs-single-opt-in-best-practices)
- [How Opt-In Processes Impact Email Deliverability (MailMonitor)](https://www.mailmonitor.com/how-opt-in-processes-impact-email-deliverability/)
- [Double Opt-In: Data-Backed Guide to Better Email Lists (Prospeo)](https://prospeo.io/s/double-opt-in)
- [Lead Magnet Funnel: Step-by-Step Template (Newzenler)](https://www.newzenler.com/blog/lead-magnet-funnel-step-by-step-template-that-converts)
- [12 Lead Magnet Examples That Actually Convert in 2026 (bdow)](https://bdow.com/stories/lead-magnet-examples/)
- [15 Thank You Page Examples That Convert (WiserNotify)](https://wisernotify.com/blog/thank-you-pages-examples/)
- [Progressive Profiling Popups: A 2026 Playbook (Poptin)](https://www.poptin.com/blog/progressive-profiling-popups/)
- [What Is Progressive Profiling (HubSpot)](https://blog.hubspot.com/blog/tabid/6307/bid/34155/how-to-capture-more-and-better-lead-intel-with-progressive-profiling.aspx)
- Internal: `lead-magnets` skill benchmarks, Kajabi MCP reads of form `2148526865`, offers `2149725554` / `2150887297` / `2151254578`, product `2148791611`, sequence `2148414612`.
