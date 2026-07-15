<!-- ============================================================
     SNOOZE PRESS / MEDIA PAGE  (#press-page)
     "As seen on" / featured media coverage.
     Styles: global/css/theme-custom-code.css  (#press-page block).
     DRAFT: review before Kajabi paste.
     Kajabi page SEO settings (set in CMS, not here):
       Slug:  /press
       Title: "Snooze in the Media | As Seen On news.com.au | The Sleep Concierge"
       Meta:  "Sally Woods, The Sleep Concierge, is a trusted media voice on baby
               and toddler sleep. See Snooze's press coverage, including news.com.au."
     ============================================================ -->

# Press / Media Page (`#press-page`)

**Status:** DEPLOYED (Kade confirmed, July 15, 2026)
**Wrapper ID:** `#press-page`
**Source of truth:** `press-page.html` (this folder)

## OPEN FOLLOW-UP (flagged July 15, 2026)

**Footer needs updating in a future session** (Kade flag; exact fix TBC). When picking this up:
confirm which surface is live, then verify the deployed footer against the canonical
`global/html/footer.html` per the footer audit standard (cache-busted curl + whitespace-normalized
line match). Watch for a possible duplicate footer (Encore chrome footer + the inline one) and for
drift from the canonical markup. Binds: the all-in-one inline footer rule (footer inline per page,
never a separate CMS section).

## Draft deployment record (July 15, 2026)

Deployed as a DRAFT **landing page** via the Kajabi MCP (`create_landing_page` +
`update_theme_content`), the only surface type creatable without an admin login. This is a
self-contained rendition of the same design, NOT the website-page in the repo; treat it as a
staging preview. The repo `press-page.html` (a website page) remains the canonical target.

- Site: `2148291177` (Snooze by The Sleep Concierge)
- Landing page id: `2152160869` · theme id: `2166863613` · slug `/press`
- Status: **draft / unpublished** (public `/press` returns 404 until published in admin)
- Builder: https://app.kajabi.com/admin/themes/2166863613/settings/edit
- Page settings: https://app.kajabi.com/admin/landing_pages/2152160869/edit
- Content: single Encore section `press_main` > code block `press_code` (full-width, flush);
  CSS in the theme `css` field. Footer logo SVG replaced with the `snooze.` text wordmark and
  footer colors hardcoded (the shared-theme footer CSS/`--sn-*` vars are not on this LP theme).
- Enriched July 15, 2026 (redeployed): official news.com.au logo, "As heard on" Nap Trapped
  section, hero trust line, and JSON-LD. Draft `updated_at` advanced to confirm the write.
- Build assets: `scratchpad/press-lp-code.html`, `scratchpad/press-lp-theme.css` (regenerate
  from `press-page.html` + `theme-custom-code.css`).
- To preview: open the builder URL (logged in) or publish. To publish: `update_landing_page`
  with `publish_at` = now-ISO, or flip Draft→Published from the Landing Pages list row.
- Divergence to reconcile: when the true website-page deploy happens (see below), decide
  whether to delete this LP or keep it as an alternate. Two footers may appear if the Encore
  chrome footer is also enabled; neutralise the chrome footer if so.

## What this is

A dedicated media page for Snooze's press coverage, in the "as seen on" pattern. Sally
Woods is featured and quoted (as The Sleep Concierge) in a news.com.au parenting article,
and this page leans into that credibility. Built to grow: add more outlets to the "As seen
on" strip and more cards to "Featured coverage" as coverage accumulates.

Homepage also carries a slim `.as-seen-strip` (section 2.5, under the trust bar) that links
here.

## Featured coverage (current)

- **Outlet:** news.com.au (Lifestyle > Parenting > Kids)
- **Headline:** "The hidden toll of tough bedtimes on Aussie families"
- **Date:** May 11, 2026
- **URL:** https://www.news.com.au/lifestyle/parenting/kids/the-hidden-toll-of-tough-bedtimes-on-aussie-families/news-story/1ca18a4a29b81b8b047b9bfd25e94eee
- **Pull-quote (verbatim, verified via Google result snippet + article):**
  "Every sleep is a moment of separation. For babies, toddlers and children to sleep well,
  their emotional cup needs to be full." — Sally Woods, quoted as The Sleep Concierge

## Page sections

1. Hero — "Snooze in the media" + trust line ("Rated 4.9/5 by 2,500+ families", links to /reviews)
2. As seen on — logo strip with the official news.com.au logo (inline SVG, sourced from Wikimedia; nominative/editorial use), plus a recognition line: "Named in Feedspot's Top 20 Sleep TikTok Influencers" (verified July 15, 2026: @thesleepconcierge ranked #9 in the 2026 list; rank omitted from copy so it does not go stale)
3. Featured coverage — article card(s) with pull-quote + read link
3.5 As heard on — Nap Trapped podcast credential (Sally + Bec Maher), Spotify + Apple links
4. The name behind the headlines — Sally credibility band + CTAs (Membership, About Sally)
5. Media enquiries — link to /contact
6. Footer (inline, canonical `global/html/footer.html`)

Plus JSON-LD (`WebPage` > `Person` Sally Woods, with the news.com.au article as `subjectOf`)
for SEO / AI-citation. The homepage `.as-seen-strip` uses the same official logo SVG.

### Logo

The news.com.au logo is the official masthead SVG (colour roundel + wordmark), inlined so
there is no external dependency or upload step. Source: Wikimedia (`File:News-com-au_logo.svg`).
It is News Corp Australia's trademark, shown here as nominative attribution of genuine
coverage. If a hosted-image version is preferred later, add it to the Kajabi media library.

## Build notes

- CSS init block `#press-page` is in `global/css/theme-custom-code.css` (copied from
  `#ask-sally-page` per the CSS Stabilization Brief), followed by page-specific `.press-*`
  styles. `#press-page` is registered in the Kajabi-override `:is()` scope lists at the top
  of that file.
- Footer is inline at the bottom of `press-page.html` (all-in-one inline rule).
- Wordmarks are styled text, not images. When real outlet logos are available, host them and
  swap the `.press-logo-news` / `.as-seen-news` spans for `<img>`.

## Deploy (NOT done yet — manual, gated)

This is a NEW page, so it needs a Kajabi page/route created first.

1. In Kajabi CMS, create a new Website Page at slug `/press` with the SEO title/meta above.
2. Add one Custom Code block; paste `press-page.html` into it via the token-safe scripted
   paste (`scripts/emit_paste_js.py --target ace`), then Save. Never hand-transcribe.
3. Deploy the updated `global/css/theme-custom-code.css` (theme Custom Code) so the
   `#press-page` init block and the homepage `.as-seen-strip` styles are live.
4. Deploy the updated `home/home-page.html` (adds the `.as-seen-strip` section under the
   trust bar, linking to `/press`).
5. Add `/press` to site navigation if desired (footer already links via Company & Support if
   you choose to add it there).
6. Verify live per the standard: cache-busted curl + desktop UA, confirm every non-blank
   line of each repo file appears in the rendered HTML, and check `#press-page` styling with
   `getComputedStyle` (not just a line match — Kajabi strips `<body>`, wrapper is `<div>`).
7. Tag `website-v{X.Y.Z}` before deploy.
