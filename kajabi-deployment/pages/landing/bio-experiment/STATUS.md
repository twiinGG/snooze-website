# Bio layout release status

Prepared September 15, 2026. Owner: Kade Greenland.

Kajabi save verified: the draft's stored code matches `simple.html` byte for byte, has a single code block in render order and has empty theme CSS/JS because the block is self-contained. Draft remains unpublished and hidden from search engines. Local rendering was verified; the authenticated Kajabi draft preview still needs a visual check before publishing. Code commit: `c899cf0bb`; local release tag: `website-v1.6.9`. No remote push performed.

The simple layout, instrumented control and router are built in the repo. Kajabi draft: [Snooze Links | Simple layout](https://app.kajabi.com/admin/landing_pages/2152274281/edit), page `2152274281`, theme `2167551580`. Source control: [Links V2](https://app.kajabi.com/admin/landing_pages/2151798718/edit), page `2151798718`, theme `2164471690`.

Current release boundary: prepare and populate the alternate page for review. The live `/links`, Linktree and platform bios are unchanged. The `/bio` router is a prepared artifact, not a live route. See `apps/snooze-website/src/bio-experiment/README.md` for the compact business record and `measurement.md` for GA4 setup.

Checks: control source matches stored Kajabi HTML, CSS and JS; 14 destination URLs, order and visible wording match across variants; six routing/tracking tests pass; no placeholders; mobile 320/390 and tablet 768 have no horizontal overflow; desktop preview checked; automated accessibility check reported zero violations. Environment validator passes using the existing SUPABASE_ANON_KEY as its expected SUPABASE_KEY alias. No Supabase calls or credentials are needed by these static pages.

Public destination checks: 12 unique URLs returned HTTP 200. The existing trial checkout returned a Cloudflare block in automated HTTP and browser checks; this is not proof of a broken offer. Verify that inherited checkout manually from an authenticated/normal browser before activation. No transaction was attempted.

Activation requirements: populate and verify draft; install GTM/GA4 event mapping; verify early clicks during the existing 1.5-second tracking delay; confirm Clarity stays excluded on both variants; check inherited checkout; publish pages and control instrumentation; then change bio addresses. These are concrete measurement/navigation dependencies, not an invitation to expand into unrelated funnel changes.

Rollback: previous platform bio URLs and preserved original theme in `kajabi-deployment/_live-preimages/bio-layout-2026-09-15/links-theme.json`. No paid services or offers changed.
