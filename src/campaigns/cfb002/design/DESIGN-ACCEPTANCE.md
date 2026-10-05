# CFB-002 design acceptance

Date: October 05, 2026. Design lead: Astra. Decision owner: Kade Greenland.

Release boundary: the October 07 webinar and October 19 Camp, with all campaign emails inert. Planning procedure: [Business development planning](../../../../../../docs/operations/BUSINESS-DEVELOPMENT-PLANNING.md). These files complete the presentation layer. They do not prove a working room, registration, payment gate or production deployment.

## Source and integration

- `templates.py` exposes `registration(copy, embed_html)`, `joining(copy, room_url, calendar_url, ics_url)`, `replay(copy, media_url, expiry_label, sales_url, state)` and `camp_booking(copy, stage, offers, gate_html)` for `prepare.py`.
- `pages.css` contains complete System Initialization before page styles. Each render replaces the scope with its own `div` wrapper: `cfb002-registration-page`, `cfb002-thank-you-page`, `cfb002-replay-page` or `cfb002-camp-booking-page`.
- Existing Snooze cream, navy, coral, Poppins and Playfair Display are preserved. Sally’s portrait comes from the existing home page asset.
- Every page embeds the current canonical `kajabi-deployment/global/html/footer.html` bytes at render time. Footer styles are copied from the current theme and scoped. Scoped contrast overrides and a small accessibility enhancement provide a named logo link and sequential footer heading levels while preserving source markup verbatim.
- The renderer owns the proof gates. Only validated native form markup, verified room/calendar URLs, reviewed media and authorised booking destinations belong in template inputs. Templates perform no code validation, payment authorisation or email operation.
- No value for the shared code appears in the design or generated pages. No unlisted checkout link is presented as a gate.
- Recurring offer cards require explicit currency, setup fee, monthly payment and renewal terms. Only AUD and USD are accepted. They display no purchase action in upcoming, held, closed or full states.

## Local evidence

One named server: `cfb002-preview`, `http://127.0.0.1:8762`, Python process started in exec session `78155`. Browser session: `cfb002-design-review`, separate from the operator’s `cfb002` session.

Generate previews with `python3 apps/snooze-website/src/campaigns/cfb002/design/build_review.py`. These are explicit readiness states with no invented form, room, video or payment URL. They are review artefacts, not deployment authorisation.

For other environments, pass `--media-dir /path/to/external-media` to select the diagram destination. The default preserves the existing Mac media library. `--output` independently selects the HTML directory. Help output and temporary-directory generation of all six pages plus the SVG were verified; the temporary files were removed.

| Surface | Local preview | Desktop and mobile | Accessibility |
|---|---|---|---|
| Registration | [Preview](http://127.0.0.1:8762/registration.html) | 1440 × 1000 and 390 × 844, pass | axe 4.12.1: 0 violations |
| Joining/calendar readiness | [Preview](http://127.0.0.1:8762/joining.html) | Both widths, pass | 0 violations |
| Replay readiness | [Preview](http://127.0.0.1:8762/replay.html) | Both widths, pass | 0 violations |
| Camp booking readiness | [Preview](http://127.0.0.1:8762/camp-booking.html) | Both widths, pass | 0 violations |
| Closed Camp | [Preview](http://127.0.0.1:8762/camp-closed.html) | Both widths, pass | 0 violations |
| Expired replay | [Preview](http://127.0.0.1:8762/replay-expired.html) | Both widths, pass | 0 violations |

Machine evidence: [visual-metrics.json](visual-metrics.json). Every tested page has one H1, one canonical footer, no horizontal overflow, loaded image assets and no empty destination or `href="#"` link. The keyboard skip link receives a visible focus outline. The registration-details CTA scrolls to its actual section. The original footer contrast and unnamed link findings were corrected before the final runs.

The required placeholder scanner passed against all six rendered previews. Exact canonical footer inclusion was checked byte-for-byte. Copy checks found no stale attendance-only eligibility, unresolved tokens or fabricated links. The approved title, first-person Sally, shared-code replay access, dates and exact cutoff appear in the rendered experience. No registration or purchase was submitted during these checks.

Screenshot directory: [desktop and mobile evidence](</Users/kadegreenland/Documents/Projects/The Sleep Concierge/snooze-OS-media-library/cfb002-build-20261005/>). Filenames follow `{surface}-desktop.png` and `{surface}-mobile.png` for the six surfaces above. The four main experiences were visually inspected at both sizes.

## Diagram

The [editable SVG](</Users/kadegreenland/Documents/Projects/The Sleep Concierge/snooze-OS-media-library/cfb002-build-20261005/CFB-002-build-flow.svg>) and [PNG preview](</Users/kadegreenland/Documents/Projects/The Sleep Concierge/snooze-OS-media-library/cfb002-build-20261005/CFB-002-build-flow.png>) preserve Louise’s cream, navy, lavender, blue and mint design language. The diagram labels prepared work, future recording input and unverified live controls explicitly. All email actions are shown inert. It was rendered and visually inspected at 2160 × 1530.

Media remains outside Git because the project’s `review/README.md` records that required hooks prohibit both SVG and PNG in this repo. `build_review.py` preserves the editable diagram source as a reproducible generator. No hook was bypassed and no Git command was run in this lane.

## Release limits

Live form consent, joining/calendar operation, guest privacy, working chat, the actual replay player and priced booking actions require the platform lane’s verified inputs. Re-render and verify those functional states when the inputs exist. The local readiness checks cannot be reported as passing those live behaviours. Existing global footer destinations were preserved; this lane did not audit the whole website’s navigation.

Actual publication starts the replay’s 72-hour clock. Empty or test media must not become the public replay. Booking enforcement must cover direct checkout, stale tabs and final payment through the approved governed route. The template’s displayed stage is not enforcement.

Before deploying, register wrapper IDs in the app’s CSS stabilisation brief, run the full deployment checklist and capture receiving-system proof. No external configuration, email, schedule, entitlement or cohort control was changed by this design lane.
