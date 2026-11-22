# Camp Snooze VSL landing page

**Retired (November 22, 2026).** This folder is the superseded October draft source and generator. The live Camp page, its three paste targets (`camp-snooze-coaching.css`, `camp-snooze-coaching.js`, markup-only `index.html`), the pricing and local call-time module with its tests, `captions.vtt` and the preview server now live in `../../kajabi-deployment/pages/landing/camp-snooze-coaching/`. Do not run `build.py` or edit `index.html` here; both would overwrite or contradict the live page. Only `support-finder/` and `media-manifest.json` (R2 URLs for the 29 second clip) are still read from here. The sections below are historical.

Local draft prepared October 23, 2026. Owner: Kade Greenland.

Run `python3 apps/snooze-website/src/camp-vsl/preview.py` from the repo root, then open http://127.0.0.1:4327.

`index.html` is the self-contained page source. It contains the scoped System Initialization, page styles, markup, canonical inline footer and fit-check behaviour. `captions.vtt` contains timed captions for the existing 28.68-second review excerpt. The preview server serves the existing MP4 and poster directly from the external media library without copying media into this app.

## Behaviour

- Two-question local fit check, with required-answer validation, back and restart.
- Under five months routes to Snooze support; uncertainty routes to email; ready families reach the existing Camp date/pricing section.
- No submission endpoint, lead collection, storage or analytics payload. The check cannot reserve a place or confirm clinical suitability.
- Native video controls and optional captions; native expandable FAQs.
- Footer source remains verbatim. Page script resolves relative footer links to joinsnooze.com and supplies missing accessible semantics.

## Release boundary (historical, October 2026)

Built for local review only, not published. The provisional video was already marked FOR_REVIEW_NOT_APPROVED in the October 18 creative manifest. It is a short explanation of daily coaching, not an approved full VSL. Select an approved final video, host it with captions and replace local media URLs before production. A new longer video is outside this page build.

For Kajabi, use a new independent landing-page theme with one custom-code block. Paste the page styles, font links, `#camp-vsl-page` div and script, not document-level html/head/body tags. Set section `full_width` and block `make_flush` to string `true`. Do not paste to the shared website theme. Remove noindex only after approval to publish. Follow `../../docs/technical/KAJABI-SURFACE-CODE-SETUP.md` and `../../docs/DEPLOYMENT-CHECKLIST.md`, including release tagging and live readback.

Review the copy and clip, verify current booking and renewal terms, verify hosted media, run deployment checks and approve publication before changing the live site. Existing ads, pricing, Camp capacity and member access remain unchanged.

Research, source screenshots, adaptation map and business scope: `../../../../docs/projects/camp-full-funnel-buildout/4_working/vsl-landing-2026-10-23/README.md` (from repo root, use `docs/projects/...`).
