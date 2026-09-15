# Bio comparison release status

Owner: Kade Greenland. Updated September 15, 2026.

Sally's six-link menu now uses Snooze's cream/navy palette, compact header, left-aligned titles and concise descriptions. The four sleep-support options come first, with merchandise and ShopMy grouped under More from Sally. Moon and book icons replace cropped or duplicate logo thumbnails. No new scripts or font downloads. Local mobile checks passed at 320px and 390px, including overflow and 44px touch targets. Six tracking tests, placeholder scanning and environment validation passed. Release website-v1.6.12 was saved to the existing Kajabi draft on September 15, 2026. Fresh persisted-code comparison matched the repository artifact exactly. Authenticated Kajabi visual preview remains a pre-publication check.

## Corrected scope

The alternate retains the screenshot's simple six-card layout and destination order, with branded presentation and clearer labels requested after the duplicate was created. The cards are Snooze membership, Camp Snooze (5 October), sleep guides, consultation with Sally, Nap Trapped merchandise and ShopMy, in that order. The guides destination was verified to include age-based guides. The membership link remains the inherited USD checkout, with no price or offer changes.

The earlier version incorrectly retained the 14 links from /links. That interpretation is superseded. This now compares two complete pages with different menus, so a result cannot isolate layout as the cause.

## Review locations

- [Kajabi alternate draft](https://app.kajabi.com/admin/landing_pages/2152274281/edit): page 2152274281, theme 2167551580.
- [Existing Links V2](https://app.kajabi.com/admin/landing_pages/2151798718/edit): page 2151798718, theme 2164471690.
- Local preview: preview/simple.html in this directory.
- Source: apps/snooze-website/src/bio-experiment/.

The alternate remains unpublished and hidden from search engines. Existing /links, Linktree and social bios remain unchanged. The /bio router and instrumented control are prepared artifacts, not activated routes.

## Measurement and activation

See the source README and measurement.md for the whole-page comparison, primary main-link measure and secondary Snooze offer measures. Configure the existing GTM/GA4 route before collecting experiment traffic. Verify early clicks during its 1.5-second delay, Clarity exclusion, destination behavior and authenticated Kajabi preview before publishing. The inherited control trial checkout blocked automated browsers with Cloudflare; it needs a normal-browser check, not an assumed broken-offer verdict.

Rollback: restore previous platform bio URLs. The original /links theme preimage is kajabi-deployment/_live-preimages/bio-layout-2026-09-15/links-theme.json. No offer, payment or paid service changes.
