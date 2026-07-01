# Admin Paste Checklist — joinsnooze.com uplift

Everything here needs the **Kajabi admin UI** because the live site theme (`2156873377`,
legacy "Encore") is not editable through the Kajabi API/MCP. Site id `2148291177`.

Already live (no action): reviews page (`/reviews`), global Organization+WebSite schema,
blog BlogPosting schema, glossary FAQPage, and SEO on 5 landing pages (camp, links,
social-terms, 2 thank-you). Those were deployed and verified this session.

Order of value: **Section 1 (website-page SEO)** first, then **2 (blog SEO)**, then
**3 (social proof)**, then **4 (dual currency)**. Section 5 (llms.txt) is optional/blocked.

---

## 1. Website-page SEO (9 money pages)

For each: open the page in the website builder, go to **Settings → SEO** (or the page's
SEO panel), paste the Page Title and Meta Description, save. Recommended copy is also stored
in Supabase `page_seo.recommended_title` / `recommended_meta_description` (key on `url`).

| Page (public URL) | page_id | Page Title (paste) | Meta Description (paste) |
|---|---|---|---|
| /3-4-month-baby-sleep-course | 2156731407 | `3-4 Month Baby Sleep Course \| Snooze` | `Self-paced 3-4 month baby sleep course from Snooze. Ease the 4-month regression, fix cat naps and hourly wakes. Access with the Snooze Membership.` |
| /5-12-month-baby-sleep-course | 2156732041 | `5-12 Month Baby Sleep Course \| Snooze` | `Self-paced 5-12 month baby sleep course from Snooze. Wake windows, nap transitions and gentle steps to independent sleep. 23 lessons with downloads.` |
| /newborn-sleep-guide | 2156732061 | `Newborn Sleep Guide \| Fourth Trimester \| Snooze` | `Self-paced newborn sleep guide from Snooze. Understand the fourth trimester, build gentle sleep foundations, and settle your baby with confidence.` |
| /toddler-toolkit | 2156732062 | `Toddler Toolkit \| Sleep Course for 12+ Months \| Snooze` | `Self-paced toddler sleep course from Snooze for 12 months and up. Handle bedtime battles, boundary-setting, early waking and the move to one nap.` |
| /one-on-one-sleep-consultations | 2155283958 | `1:1 Baby Sleep Consultations with Sally \| Snooze` | `Work one-on-one with Sally, an internationally certified sleep consultant and former paediatric nurse, on a tailored plan for your baby. Virtual worldwide.` |
| /newborn-baby-sleep-help | 2155115786 | `Newborn Sleep Help \| 0-3 Month Babies \| Snooze` | `Wondering if your newborn's sleep is normal? Get gentle guidance for 0-3 month babies on wake windows, settling and the fourth trimester from Snooze.` |
| /3-4-month-baby-sleep-help | 2155116031 | `3-4 Month Sleep Regression Help \| Snooze` | `Is your 3-4 month old waking more? Learn why the 4-month regression happens and gentle ways to help your baby sleep, plus when sleep training is ready.` |
| /5-12-month-baby-sleep-help | 2155116068 | `5-12 Month Baby Sleep Help \| Snooze` | `Get help for 5-12 month babies. Fix 5am wake-ups, manage nap transitions and navigate sleep regressions with practical, gentle strategies from Snooze.` |
| /author/sally-woods | 2155672758 | `Sally Woods \| Founder of The Sleep Concierge` | `Sally Woods founded The Sleep Concierge and Snooze. An internationally certified sleep consultant and former paediatric nurse helping families sleep.` |

All titles <= 60 chars, descriptions 120-160. Verify after save: load the public URL and
check `<title>` + `<meta name="description">`.

---

## 2. Blog-post SEO (16 posts)

Edit each post in the Kajabi blog editor → post SEO settings (meta title + meta description).

| Post slug | Meta Title (paste) | Meta Description (paste) |
|---|---|---|
| 4-month-regression-or-progression | `4-Month Sleep Regression: Causes and Solutions` | `The 4-month sleep regression can be challenging. Learn its causes, the signs to watch for, and practical ways to help your baby develop healthy sleep.` |
| baby-sleep-schedule-wake-windows-vs-clock-schedules | `Wake Windows vs Clock-Based Baby Sleep Schedules` | `Learn how to balance wake windows and clock-based schedules for your baby's sleep so they get the rest they need and your day runs more smoothly.` |
| cubo-ai-smart-baby-monitor-review-with-discount | `Cubo Ai Baby Monitor Review \| Snooze` | `An honest review of the Cubo Ai smart baby monitor: video quality, the app, setup and real experience from a mother of two. Includes a discount.` |
| guide-to-self-settling-sleep-cycles | `Self-Settling and Sleep Cycles \| 5-12 Months` | `Struggling with your 5-12 month old's sleep? Learn how sleep cycles work and gentle ways to help your baby link them and self-settle for longer sleep.` |
| how-to-manage-your-babys-reflux-and-sleep | `Baby Reflux and Sleep: How to Help` | `Reflux can disrupt your baby's sleep. Learn how it affects rest and practical, gentle ways to help your baby stay comfortable and sleep better.` |
| my-honest-snoo-experience-and-review | `My Honest Snoo Review \| The Sleep Concierge` | `A personal review of using the Snoo for newborn sleep: what worked, what didn't, and how I handled the transition out of the Snoo.` |
| my-snoo-review | `Snoo Bassinet Review: My Postpartum Story` | `How the Snoo bassinet helped me care for my newborn while recovering from a difficult birth. An honest look at postpartum life with the Snoo.` |
| mystery-of-missing-third-nap-early-rising | `The Missing Third Nap and 4am Wakings` | `Dropping the third nap too soon can lead to early bedtimes and 4am wakings. Learn why it happens and how to fix early rising in your baby.` |
| navigating-childcare-and-your-childs-sleep-routine | `Childcare and Your Child's Sleep Routine` | `Help your baby adapt to sleep at childcare. Learn how to talk with educators, replicate home comfort, and manage nap transitions for a smoother start.` |
| navigating-split-nights-a-guide-for-parents | `Split Nights in Babies: Causes and Solutions` | `A split night is when a baby wakes for an extended period overnight before settling again. Learn why split nights happen and how to resolve them.` |
| newborn-sleep-and-the-fourth-trimester | `Newborn Sleep and the Fourth Trimester` | `Tips for managing newborn sleep in the fourth trimester: routines, swaddling, white noise and reading tired signs to help your baby settle and thrive.` |
| shifting-your-babys-bedtime-for-daylight-savings | `Adjust Baby's Sleep for Daylight Savings` | `Daylight savings can throw off your baby's sleep. Learn simple, gentle ways to shift bedtime and wake times so the change feels smooth for everyone.` |
| should-we-discourage-babys-thumb-and-finger-sucking | `Baby Thumb and Finger Sucking: Should You Stop It?` | `Is thumb or finger sucking a problem for your baby? Learn why it can be comforting and what to think about before you try to stop the habit.` |
| stop-swaddle-time-for-your-baby | `When to Stop Swaddling Your Baby: Pros and Cons` | `When should you stop swaddling? Learn the benefits, the pros and cons, safety tips, and the best swaddles to try, including the Love To Dream Swaddle Up.` |
| tips-for-managing-baby-early-wake-ups | `How to Manage Early Morning Wake-Ups in Babies` | `Is your baby waking too early? Practical tips on adjusting sleep schedules, naps and the sleep environment to help your little one sleep longer.` |
| transitioning-your-baby-from-2-naps-to-1 | `Baby Nap Transition: Two Naps to One` | `Find out how to help your baby move from two naps to one, with tips on timing and building a smoother daily sleep routine.` |
| what-are-assisted-sleep-associations | `Assisted Sleep Associations: Causes and Fixes` | `Learn what assisted sleep associations are and gentle strategies to help your child sleep more independently for a more restful night.` |

---

## 3. Social-proof injection blocks (#18)

Source: `wave-3-social-proof/injection-blocks.html` (regenerated with the Sally-approved
Camp + DM proof; see `wave-3-social-proof/injection-blocks-manifest.md` for the per-page
quote mix). Each page section is delimited with an HTML comment.

The blocks reuse the existing global `.transformation-reviews` / `.review-card` styles in
`snooze-unified-theme.css` (not scoped to `#home-page`), so **no new CSS is needed** — paste
the HTML only. For each target page: open the page in the website builder, add a **Custom
Code** block just above the final CTA / pricing section, paste that page's section from
`injection-blocks.html`, save, then load the public URL and confirm it renders with no break.

| Target page | page_id | Block section marker in file |
|---|---|---|
| /about-sally | 2154679198 | `<!-- TARGET: /about-sally -->` |
| /newborn-baby-sleep-help | 2155115786 | `<!-- TARGET: /newborn-baby-sleep-help -->` |
| /3-4-month-baby-sleep-help | 2155116031 | `<!-- TARGET: /3-4-month-baby-sleep-help -->` |
| /5-12-month-baby-sleep-help | 2155116068 | `<!-- TARGET: /5-12-month-baby-sleep-help -->` |
| /contact | 2154679194 | `<!-- TARGET: /contact -->` |
| /camp-snooze-sleep-coaching (optional, camp-naming quotes as-is) | 2151771543 | `<!-- TARGET: /camp-snooze-sleep-coaching -->` |

Product-routing is already baked into the file: camp-naming quotes appear only in the Camp
section; the age-help pages use universal + verbatim-trimmed quotes (camp reference removed).
Per-page counts and Notion row IDs: `wave-3-social-proof/injection-blocks-manifest.md`.

---

## 4. Dual-currency rollout (Stream F)

Currency model: one Kajabi offer per currency; the toggle lives on marketing/landing pages
and rewrites checkout links + `.dynamic-price` before navigation. Checkout pages stay
single-currency (no toggle script). Offer mapping: USD Snooze Access `z63s9VaR` <-> AUD
`bEsVXFXG`.

1. **Theme CSS.** Merge `global/css/currency-toggle.css` into `global/css/snooze-unified-theme.css`
   (repo), then paste the full `snooze-unified-theme.css` into **Website → Theme → Custom CSS**.
2. **Theme JS** (Website → Theme → Custom Javascript), in this exact order:
   1. existing `docs/home-page-v2/assets/home-page-v2.js` (unchanged),
   2. contents of `global/html/currency-toggle-fouc.html` (inline `<style>` + early preference read),
   3. contents of `global/js/currency-toggle.js`.
3. **Money-page markup.** Add `data-usd` / `data-aud` on price elements and `class="dynamic-cta"`
   on checkout buttons (home, age pages, product landing HTML) per
   `docs/dynamic-currency/CONTENT-TEAM-GUIDE.md`. Deploy those HTML blocks.
4. **Pricing landing themes** (NOT Camp `2164288957` — it keeps its standalone pilot): paste the
   same FOUC + `currency-toggle.js` block into the theme Custom Javascript of Day Pass cold-ads,
   founding member, and any other landing with a paid checkout CTA.
5. **Verify live:** on the homepage, toggle currency -> Join links rewrite (`z63s9VaR` <-> `bEsVXFXG`)
   and `.dynamic-price` text swaps; click through lands on the matching single-currency checkout;
   `currency_change` fires in dataLayer; the checkout page itself shows no toggle widget.

**Blocker (variant-level only):** offer `bEsVXFXG` (AUD Snooze Access) is draft and lacks
quarterly/yearly variants. Sally must add them before the `variantMapping` placeholders in
`currency-toggle.js` can be filled. The base offer-level toggle works without this.

---

## 5. llms.txt (#8) — blocked on hosting

The file is staged at `kajabi-deployment/global/llms.txt`. Kajabi has no facility to serve a
plain-text file at the site root (`/llms.txt`), so it cannot be deployed as a normal page.
Options, in order of preference:

1. Serve it via a **Cloudflare Worker / redirect** in front of joinsnooze.com (returns the
   staged file at `/llms.txt` with `content-type: text/plain`). Best fit; needs Cloudflare access.
2. Host the file elsewhere and reference it from `robots.txt`.
3. Defer until a proxy is available. No SEO regression from waiting.
