# Snooze x Kic Partnership Landing Page - Build Brief

## What This Is

A single-page partnership pitch website for Kic leadership (Janey Martino, CEO and Nat, Head of Content/Partnerships). Replaces a Canva presentation deck. Designed to be shared as a link ahead of the Wednesday 4pm meeting.

## Why a Landing Page

The Canva deck layout felt generic and constrained. A web page allows:
- Better visual storytelling with proper typography and spacing
- Responsive design that works on any device
- Interactive elements (scroll animations, hover states)
- Shareable via a single URL (no attachments)
- Demonstrates technical capability and polish

## Audience

1. **Janey Martino** - CEO of Kic, co-founder/Chair of Smiling Mind, behavioural change expert
2. **Nat** - Head of Content/Partnerships at Kic

Both are digitally native, design-literate, and used to polished brand experiences.

## Design Direction

**Primary aesthetic:** Kic branding and feel. Clean, wellness-forward, feminine, modern. Think Kic's website and app aesthetic.

**Secondary touches:** Snooze brand elements (coral, navy) used sparingly for CTAs, key stats, and Sally's credentials.

**Photography:** Lifestyle imagery of mothers, babies, wellness. Not stock-heavy. Real and warm.

**Typography:** Clean sans-serif dominant. Potential for a serif accent on section headlines.

**Layout:** Generous whitespace, section-based scroll, alternating backgrounds for visual rhythm.

## Content

All content is documented in `CONTENT.md` in this folder. 10 sections covering:
1. Hero
2. The Gap (competitor landscape)
3. Sally Woods ecosystem (stats, outcomes)
4. Testimonials
5. Shared Values (Kic/Snooze side-by-side)
6. Three partnership paths (journey framing)
7. Business case for Kic
8. Partnership precedents
9. References and links
10. Closing CTA

## Technical Stack (Built)

- React + TypeScript + Vite
- Tailwind CSS with custom design tokens (index.css)
- Framer Motion for scroll-triggered animations
- shadcn/ui component library
- DM Sans (body) + Playfair Display (headings)
- Repo: `site/` subfolder, cloned from github.com/twiinGG/kic-snooze-partnership

## Key Constraints

- No em dashes (use commas, colons, or periods)
- Australian English spelling
- All testimonials sourced from Camp Snooze Diaries (January 2026)
- All stats traceable to documented sources
- No "gentle vs harsh" sleep training framing

## Reference Materials

- `CONTENT.md` - All section content with stats and testimonials
- `../plan/KIC-PARTNERSHIP-STRATEGY.md` - Full strategy document
- `../research/deep-research-report.md` - Kic company research
- `../research/Perplexity-research.md` - Market context
- Kic website (kicwellness.com) for brand reference
- Snooze website (sleepconcierge.com.au) for Snooze visual language

## Delivery

- Shared as a URL to Janey and Nat before Wednesday meeting
- Deploy to Vercel (repo already on GitHub)
- PDF export optional as backup

---

## Current Status: Lovable v1 Complete

**Date:** February 24, 2026

The Lovable-generated site is in `site/`. All 10 content sections are built as individual React components in `site/src/components/sections/`.

### What's Working
- All 10 sections scaffolded with correct content from CONTENT.md
- Scroll-triggered fade-in animations (Framer Motion)
- Design token system: coral, navy, burgundy, beige, charcoal mapped in Tailwind
- Playfair Display headings + DM Sans body text
- Alternating section backgrounds
- Responsive grid layouts
- Pill-shaped CTA buttons
- Before/after Camp Snooze results cards
- Metric cards with gradient backgrounds

### Refinement Completed (February 24, 2026)

**Design polish:** Done
- [x] Tuned section spacing (py-28 md:py-36 throughout)
- [x] Alternating white/secondary backgrounds for visual rhythm
- [x] Coral section labels above each heading
- [x] Typography hierarchy with tracking and weight adjustments
- [x] Subtler borders on cards, icon backgrounds for business case

**Content/imagery:** Done
- [x] Sally headshot added (sourced from Kajabi CDN, same as joinsnooze.com)
- [x] Social content embeds: 3 videos (2 TikTok, 1 Instagram Reel) with iframe embeds
- [x] Links from original email chain woven into Sally Woods section and References
- [x] Updated website URL to joinsnooze.com (was sleepconcierge.com.au)
- [x] Updated email to sally@joinsnooze.com

**Partnership Paths restructured:**
- [x] Root node reflects Janey/Nat's actual proposal (Mother's Day in-app coaching content)
- [x] Branching tree to three future directions (Q4 Mindset Series, Expert Role, Co-Created Program)
- [x] Each branch tagged "To discuss in meeting"

**Interaction and UX:** Done
- [x] Sticky nav with section indicators, appears after scrolling past hero
- [x] Active section highlighting in nav
- [x] Hover states on embed cards and CTAs

**Deployment:** Done
- [x] Deployed to Vercel: kic.joinsnooze.com
- [x] A record: kic -> 76.76.21.21
- [x] Lovable boilerplate stripped from index.html (twitter meta, OG image)

**Code cleanup:** Done
- [x] Removed all 49 unused shadcn/ui components
- [x] Removed 20+ unused dependencies (react-router, react-query, recharts, zod, radix, etc.)
- [x] Removed Lovable tagger, eslint, vitest configs
- [x] CSS: 57KB -> 17KB, JS: 450KB -> 303KB
