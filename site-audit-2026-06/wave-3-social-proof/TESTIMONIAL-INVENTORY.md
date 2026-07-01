# Testimonial inventory (Snooze, June 2026)

Single tagged index of every testimonial source found, for the site-uplift
social-proof workstream (site-audit-2026-06 Wave 3). Built Jun 9, 2026.

Consent status matters: only sources marked CONSENTED-PUBLIC are cleared for new
web placement. The CRM and consult records are private; do not lift names or
results from them onto public pages without explicit per-client consent.

## Current state after collection sprint (updated 2026-06-09)

The "~18 usable quotes" framing below was the **web-published subset**. The canonical Notion
**Member Feedback & Wins** store actually held 148 rows at sprint start and now holds **351**.
Full before/after in `COLLECTION-AUDIT.md`.

| Source | Rows | Permission | Notes |
|---|---|---|---|
| Google Review | 165 | Public | 137 existing (cleaned) + 28 new via Apify delta (after 2025-08-18) |
| Camp Call (transcripts) | 166 | Internal | Strong verbatim quotes from 42 roll-call transcripts; Publish Approved=false (Sally consent) |
| Screenshot (DM/community) | 9 | Internal | From Google Photos→Drive sync (`media_asset_catalog`); Asset URL set; Sally consent |
| Review | 10 | (mixed) | Pre-existing consult-style reviews |
| Community | 1 | — | Pre-existing |
| **Total** | **351** | | Supabase `member_feedback_raw`: 340 synced (2 skipped empty) |

- **Curated for site use:** `CURATED-SOCIAL-PROOF.md` (regenerated, 5 sets). Gate: human review before paste (RUNBOOK #18 ON HOLD).
- **Country:** authoritative via CRM `👟 Sales CRM` relation (0 linked yet); review rows carry a `country_*` tag only on explicit place mention, else `country_unknown`.
- **GBP owner API:** blocked at Google quota gate; delta harvested via Apify instead. See `COLLECTION-AUDIT.md`.

The sections below are the original baseline index (web-published + consented sources), retained for provenance.

## A. Already published and consented (safe to reuse anywhere)

### Home page named quotes (coaching / membership)
Source: `apps/snooze-website/archive/website/home/snooze-home-page-blocks.html`
(review-card markup, linked to the 6iRarwak coaching offer). Already live.

| Name | Quote | Product/service | Result theme |
|---|---|---|---|
| Ashwinnie | "Working with Sally was life-changing. Our baby now sleeps through the night and we finally have our evenings back." | Coaching | sleeps through night; parent time back |
| Kate | "The two-week package completely transformed our nights. Our son now naps and sleeps beautifully." | Two-week package / Camp | naps + nights |
| Emily | "We went from chaos to calm in one week. The coaching support is next level." | Coaching | fast turnaround |

### Camp Snooze wrap-up quotes (verbatim participants, anonymous)
Source: `apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-landing-page-blocks.html`
(15 unique quotes, already live on the Camp landing page; drawn from camp
wrap-up calls). Tagged by theme for reuse.

Emotional / life-back:
- "I feel better already, trust me. We've been looking forward to this."
- "I actually want to cry. I want to get my life back together."
- "All the sleepless nights I've had for nearly almost a year ... I've come so far."
- "It's life-changing. It's kind of almost shocking. Hang on, this is what it could be."
- "I could be on my way to getting my life back a little bit."
- "I was able to do normal things."
- "I had my coffee before he was up. It was amazing."
- "To have a couple of hours to myself in the morning ... I just haven't done that in so long."
- "Now I'm like, today is gonna be a great day."
- "It gives me more confidence to know that, oh, they can do it when they're teething, it's okay."

Concrete sleep result:
- "He slept from 7.45 till 4.30 in the morning ... and he fell straight back to sleep till 6 o'clock."
- "He slept through the whole night."
- "He just went to sleep by himself for his nap. No rocking, no patting, nothing."
- "It took 25 minutes but he went down, he's fast asleep."
- "From two hours to ... 14 minutes." (time-to-settle)

### Camp Snooze video testimonials (supplied participant videos)
Source: this project folder. Implied consent (participant-supplied for use).

| Participant | Raw file | Edited | Product |
|---|---|---|---|
| Bec K | `Bec K Camp Snooze Testimonial_Edit.mp4` | `edits/Bec_K_Camp_Snooze_v2.mp4` | Camp Snooze |
| Bec Karagiorgos | `Bec Karagiorgos Camp Snooze Testimonial.mov` | `edits/Bec_Karagiorgos_Camp_Snooze_v1.mp4`, `_v2.mp4` | Camp Snooze |
| Annabel Yencken | `Annabel Yencken_Camp Snooze Follow up and testimonial.mp4` | (none yet) | Camp Snooze |

## B. Sources that need a consent / harvest step before use

| Source | What it holds | Action needed |
|---|---|---|
| Google reviews | Public star reviews of The Sleep Concierge | Not captured locally. Harvest from Google Business Profile, then attribute (first name + initial). Public by nature, but verify before embedding. |
| Notion "TSC CRM" (`collection://25433898-b6c2-810e-96f2-000bbddd7244`) | Client contact + consult records (Account Owner, Address, Consult Record). NOT a testimonial store; no consent field. | Do NOT lift names/results to public pages without explicit per-client consent. Use only to identify clients to ASK for a testimonial. |

## Coverage gap (feeds Wave 3 #14 placement)
The consented set is Camp- and coaching-weighted. There are **no age-specific or
course-specific named testimonials** (e.g. nothing tagged "5-12 month course" or
"3-4 month course" with a name). The universal sleep-result camp quotes can carry
the course/age pages, attributed honestly as Snooze/Camp clients, but
product-specific named proof is the main thing to collect next (via the CRM
follow-up + Google reviews).
