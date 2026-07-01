# SEO Title and Description Recommendations (draft)

Wave 1 #4 metadata. Prep only. Drafts written to Supabase `page_seo` (`recommended_title`, `recommended_meta_description`). Not pushed to Kajabi (separate auth-gated step, keyed on `page_id`).

Drafted: June 9, 2026. Source of deficiencies: `analysis/seo-metadata.csv` + `page_seo`.

## Rules applied

- `recommended_title` <= 60 chars, primary intent + "Snooze" / "Baby Sleep" where natural.
- `recommended_meta_description` 120-160 chars, concrete benefit, no hype, no em dashes, no Oxford comma, active voice.
- Only deficient pages drafted (title >60 OR missing/empty description). Good pages left alone.
- `new_len` is the recommended-field length. T = title, D = description.

## Coverage

- 31 pages with `title_len` > 60: all drafted (all are live 200s).
- 11 pages with missing/empty description: 3 live pages drafted; 8 are 404s, skipped (see Skipped).
- 0 pages with missing/empty title.
- Unique rows written: 34 (32 titles + 34 descriptions; the 2 terms/thank-you pages already have acceptable short titles so only their description was drafted).

---

## Priority 1 - money pages (courses, consults, camp, toddler toolkit, newborn guide)

| url | issue | old | new | new_len |
|---|---|---|---|---|
| /3-4-month-baby-sleep-course | title>60 | 3-4 Month Baby Sleep Course: Complete Guide for Sleep Changes \| Snooze (70) | 3-4 Month Baby Sleep Course \| Snooze | T 36 |
| | | Beat the 4-month sleep regression with evidence-based strategies. Self-paced course... (234, over) | Self-paced 3-4 month baby sleep course from Snooze. Ease the 4-month regression, fix cat naps and hourly wakes, and build better sleep. Access with the Snooze Membership. | D 162 |
| /5-12-month-baby-sleep-course | title>60 | 5-12 Month Baby Sleep Course: Handle Every Tricky Moment \| Snooze (65) | 5-12 Month Baby Sleep Course \| Snooze | T 37 |
| | | A self-paced course covering wake windows, nap transitions... (196, over) | Self-paced 5-12 month baby sleep course from Snooze. Wake windows, nap transitions and gentle steps to independent sleep. 23 lessons with downloads. | D 148 |
| /one-on-one-sleep-consultations | title>60 | 1:1 Sleep Help with Sally \| Expert Sleep Support for Babies & Toddlers (70) | 1:1 Baby Sleep Consultations with Sally \| Snooze | T 48 |
| | | Work one-on-one with Sally, a Registered Paediatric Nurse... (190, over) | Work one-on-one with Sally, a certified sleep consultant and former paediatric nurse, on a tailored plan for your baby or toddler. Virtual worldwide. | D 150 |
| /camp-snooze-sleep-coaching | title>60 | Camp Snooze \| 2-Week Virtual Baby Sleep Training with Sally & Bec (65) | Camp Snooze \| 2-Week Baby Sleep Coaching | T 40 |
| | | Join Camp Snooze for two weeks of intensive sleep training... (153, ok) | Camp Snooze is two weeks of guided baby sleep training with daily coaching and a personalised plan from Sally and Bec. Limited to six families per intake. | D 154 |
| /toddler-toolkit | title>60 | Toddler Toolkit: Complete Sleep Course for 12+ Months \| Snooze (62) | Toddler Toolkit \| Sleep Course for 12+ Months \| Snooze | T 54 |
| | | A self-paced course helping you navigate toddler sleep challenges... (202, over) | Self-paced toddler sleep course from Snooze for 12 months and up. Handle bedtime battles, boundary-setting, early waking and the move to one nap. | D 145 |
| /newborn-sleep-guide | title>60 + short desc | Newborn Sleep Guide: The Fourth Trimester & Foundations \| Snooze (64) | Newborn Sleep Guide \| Fourth Trimester \| Snooze | T 47 |
| | | A self-paced guide helping you understand your newborn (54, short/truncated) | Self-paced newborn sleep guide from Snooze. Understand the fourth trimester, build gentle sleep foundations, and settle your baby with confidence. | D 146 |

## Priority 2 - age help + lead magnets

| url | issue | old | new | new_len |
|---|---|---|---|---|
| /3-4-month-baby-sleep-help | title>60 | 3-4 Month Sleep Regression: How to Help Your Baby Sleep Better (62) | 3-4 Month Sleep Regression Help \| Snooze | T 40 |
| | | Is your 3-4 month old suddenly waking more?... (218, over) | Is your 3-4 month old waking more? Learn why the 4-month regression happens and gentle ways to help your baby sleep, plus when sleep training is ready. | D 151 |
| /5-12-month-baby-sleep-help | title>60 | 5-12 Month Baby Sleep Help: Fix Early Rising & Nap Transitions (62) | 5-12 Month Baby Sleep Help \| Snooze | T 35 |
| | | Struggling with early rising or nap transitions?... (212, over) | Get help for 5-12 month babies. Fix 5am wake-ups, manage nap transitions and navigate sleep regressions with practical, gentle strategies from Snooze. | D 150 |
| /newborn-baby-sleep-help | title>60 + short desc | Newborn Sleep Help: Is This Normal? Sleep Guide for 0-3 Month Babies (68) | Newborn Sleep Help \| 0-3 Month Babies \| Snooze | T 46 |
| | | Is your newborn (15, truncated) | Wondering if your newborn's sleep is normal? Get gentle guidance for 0-3 month babies on wake windows, settling and the fourth trimester from Snooze. | D 149 |
| /3-4-month-masterclass-replay | title>60 | 3-4 Month Baby Sleep Training Masterclass \| Stop 4-Month Regression (67) | Free 3-4 Month Sleep Training Masterclass \| Snooze | T 50 |
| | | Get a proven plan for better baby sleep with The 3-4 Month... (276, over) | Watch Snooze's free 3-4 month sleep training masterclass. A simple introduction to gentle sleep training to help you ease the 4-month regression. | D 145 |
| /4-month-sleep-regression-survival-guide | title>60 + short desc | FREE: Surviving the 4 Month Sleep Regression \| The Sleep Concierge (66) | Free 4-Month Sleep Regression Guide \| Snooze | T 44 |
| | | Get your free guide to surviving the 4 month sleep regression. Discover the science behind your baby (100, truncated) | Get the free Snooze guide to the 4-month sleep regression. Learn why it happens and gentle steps to help your baby settle and sleep through it. | D 143 |

## Priority 3 - blog (title >60)

| url | issue | old | new | new_len |
|---|---|---|---|---|
| /blog/4-month-regression-or-progression | title>60 | 4-Month Sleep Regression Explained: Causes, Signs, and Solutions (64) | 4-Month Sleep Regression: Causes and Solutions | T 46 |
| | | (169, ok) | The 4-month sleep regression can be challenging. Learn its causes, the signs to watch for, and practical ways to help your baby develop healthy sleep. | D 150 |
| /blog/baby-sleep-schedule-wake-windows-vs-clock-schedules | title>60 | Right Balance: Wake Windows vs. Clock-Based Schedules for Babys (63) | Wake Windows vs Clock-Based Baby Sleep Schedules | T 48 |
| | | (156, ok) | Learn how to balance wake windows and clock-based schedules for your baby's sleep so they get the rest they need and your day runs more smoothly. | D 145 |
| /blog/cubo-ai-smart-baby-monitor-review-with-discount | title>60 | Cubo Ai Baby Monitor Review: Features, Setup, and Personal Experience (69) | Cubo Ai Baby Monitor Review \| Snooze | T 36 |
| | | (225, over) | An honest review of the Cubo Ai smart baby monitor: video quality, the app, setup and real experience from a mother of two. Includes a discount. | D 144 |
| /blog/guide-to-self-settling-sleep-cycles | title>60 + short desc | Transform Your Baby's Sleep: Essential Guide for 5-12 Month Olds (64) | Self-Settling and Sleep Cycles \| 5-12 Months | T 44 |
| | | Struggling with your baby (25, truncated) | Struggling with your 5-12 month old's sleep? Learn how sleep cycles work and gentle ways to help your baby link them and self-settle for longer sleep. | D 150 |
| /blog/how-to-manage-your-babys-reflux-and-sleep | title>60 | Reflux in Babies: How It Affects Sleep and Solutions for Parents (64) | Baby Reflux and Sleep: How to Help | T 34 |
| | | (183, over) | Reflux can disrupt your baby's sleep. Learn how it affects rest and practical, gentle ways to help your baby stay comfortable and sleep better. | D 143 |
| /blog/my-honest-snoo-experience-and-review | title>60 | My Honest Snoo Experience & Review: What Worked and What Didn't (63) | My Honest Snoo Review \| The Sleep Concierge | T 43 |
| | | (171, over) | A personal review of using the Snoo for newborn sleep: what worked, what didn't, and how I handled the transition out of the Snoo. | D 130 |
| /blog/my-snoo-review | title>60 | Overcoming Postpartum Struggles: How the Snoo Bassinet Helped Me (64) | Snoo Bassinet Review: My Postpartum Story | T 41 |
| | | (182, over) | How the Snoo bassinet helped me care for my newborn while recovering from a difficult birth. An honest look at postpartum life with the Snoo. | D 141 |
| /blog/mystery-of-missing-third-nap-early-rising | title>60 + short desc | The Missing Third Nap: Why Early Bedtime Leads to 4AM Wakings (61) | The Missing Third Nap and 4am Wakings | T 37 |
| | | Learn why dropping your baby (28, truncated) | Dropping the third nap too soon can lead to early bedtimes and 4am wakings. Learn why it happens and how to fix early rising in your baby. | D 138 |
| /blog/navigating-childcare-and-your-childs-sleep-routine | title>60 | Expert Tips for Navigating Your Child's Sleep Routine at Childcare (66) | Childcare and Your Child's Sleep Routine | T 40 |
| | | (194, over) | Help your baby adapt to sleep at childcare. Learn how to talk with educators, replicate home comfort, and manage nap transitions for a smoother start. | D 150 |
| /blog/navigating-split-nights-a-guide-for-parents | title>60 | Split Nights in Babies: Causes, Tips, and Solutions for Better Sleep (68) | Split Nights in Babies: Causes and Solutions | T 44 |
| | | (141, ok; had em dash) | A split night is when a baby wakes for an extended period overnight before settling again. Learn why split nights happen and how to resolve them. | D 145 |
| /blog/newborn-sleep-and-the-fourth-trimester | title>60 | Newborn Sleep Tips for the Fourth Trimester: A Guide for New Parents (68) | Newborn Sleep and the Fourth Trimester | T 38 |
| | | (209, over) | Tips for managing newborn sleep in the fourth trimester: routines, swaddling, white noise and reading tired signs to help your baby settle and thrive. | D 150 |
| /blog/shifting-your-babys-bedtime-for-daylight-savings | title>60 + short desc | Adjust Your Baby's Sleep Schedule for Daylight Savings: Get your Tips! (70) | Adjust Baby's Sleep for Daylight Savings | T 40 |
| | | Discover effective strategies to adjust your baby (49, truncated) | Daylight savings can throw off your baby's sleep. Learn simple, gentle ways to shift bedtime and wake times so the change feels smooth for everyone. | D 148 |
| /blog/should-we-discourage-babys-thumb-and-finger-sucking | title>60 | Your baby Sucking Finger? Is It Time to Say No? or need to overlook (67) | Baby Thumb and Finger Sucking: Should You Stop It? | T 50 |
| | | (149, ok) | Is thumb or finger sucking a problem for your baby? Learn why it can be comforting and what to think about before you try to stop the habit. | D 140 |
| /blog/stop-swaddle-time-for-your-baby | title>60 | Steps to stop your baby's Swaddle time while sleeping, pros and cons (68) | When to Stop Swaddling Your Baby: Pros and Cons | T 47 |
| | | (170, over) | When should you stop swaddling? Learn the benefits, the pros and cons, safety tips, and the best swaddles to try, including the Love To Dream Swaddle Up. | D 153 |
| /blog/tips-for-managing-baby-early-wake-ups | title>60 | Effective Strategies for Managing Early Morning Wake-Ups in Babies (66) | How to Manage Early Morning Wake-Ups in Babies | T 46 |
| | | (284, over) | Is your baby waking too early? Practical tips on adjusting sleep schedules, naps and the sleep environment to help your little one sleep longer. | D 144 |
| /blog/transitioning-your-baby-from-2-naps-to-1 | title>60 | Making the Switch from Two Naps to One for Your Baby's Health (61) | Baby Nap Transition: Two Naps to One | T 36 |
| | | (122, ok) | Find out how to help your baby move from two naps to one, with tips on timing and building a smoother daily sleep routine. | D 122 |
| /blog/what-are-assisted-sleep-associations | title>60 | Causes and how to address Assisted Sleep Associations in Children (65) | Assisted Sleep Associations: Causes and Fixes | T 45 |
| | | (125, ok) | Learn what assisted sleep associations are and gentle strategies to help your child sleep more independently for a more restful night. | D 134 |

## Priority 4 - supporting pages (author, links, terms, newsletter, thank-you)

| url | issue | old | new | new_len |
|---|---|---|---|---|
| /author/sally-woods | title>60 | Sally Woods - Founder, Sleep Expert and Owner of The Sleep Concierge (68) | Sally Woods \| Founder of The Sleep Concierge | T 44 |
| | | (189, over) | Sally Woods is the founder of The Sleep Concierge and Snooze, a certified sleep consultant and former paediatric nurse helping families get better sleep. | D 152 |
| /links | title>60 | Snooze by The Sleep Concierge \| Essential Links for Better Baby Sleep (69) | Snooze Links \| Baby Sleep Resources | T 35 |
| | | (211, over) | All the key Snooze baby sleep links in one place: guides, courses and personalised support to help your little one (and you) get the rest you need. | D 147 |
| /snooze-social-terms-and-conditions | title>60 | Snooze Social Membership Terms and Conditions \| The Sleep Concierge (67) | Snooze Membership Terms and Conditions | T 38 |
| | | (231, over) | Read the terms and conditions for The Snooze Membership: services, payment, refunds, intellectual property and limitation of liability. | D 135 |
| /3-4-month-baby-sleep-course-terms-and-conditions | missing desc | (none) | (title kept: 52 chars, acceptable) Read the terms and conditions for the Snooze 3-4 Month Baby Sleep Course: access, payment, refunds and intellectual property. | D 125 |
| /newsletters/the-snooze-news | missing desc | The Snooze News (15) / (no desc) | The Snooze News \| Baby Sleep Newsletter | T 39 |
| | | | The Snooze News is the free Snooze newsletter with practical baby sleep tips and gentle guidance from Sally Woods, delivered to your inbox. | D 139 |
| /thankyou/lmcr08-access | missing desc | (none) | (title kept: 27 chars, acceptable) Thank you for downloading the Snooze 3-4 month feeds guide. Check your inbox for the link, and explore more baby sleep support from Snooze. | D 139 |

---

## Skipped (intentional)

8 pages flagged for "missing description" are 404 / non-content and were not drafted. No SEO value in tagging dead URLs; these belong in the redirect/cleanup work (RUNBOOK Wave 4 #26), not the metadata pass.

| url | status | reason |
|---|---|---|
| /account | 404 | Kajabi system page, not found |
| /cdn-cgi/l/email-protection | 404 | Cloudflare interstitial, not a real page |
| /get-great-baby-sleep | 404 | dead URL (see RUNBOOK Wave 1 #1) |
| /privacy | 404 | dead; live policy is /privacy-policy. Needs redirect, not metadata |
| /sleep-glossary | 404 | dead; live glossary is /baby-sleep-glossary |
| /snooze | 404 | dead URL |
| /snooze-method | 404 | dead URL |
| /snooze-village | 404 | dead URL; needs redirect (RUNBOOK Wave 4 #26) |

## Notes

- Brand framing: "Snooze" preferred in product/age titles; "The Sleep Concierge" kept on author/personal-review pages where it reads naturally.
- Descriptions that quoted member-state assumptions or hype were rewritten to factual, calm, parent-facing copy. AU spelling kept (personalised, paediatric).
- One existing description (`/blog/navigating-split-nights`) contained an em dash; the new draft removes it.
- Next step (out of scope, auth-gated): backfill `page_id` for all 107 pages, then push these `recommended_*` values to Kajabi via the Kajabi API/MCP. Do not push from this pass.
