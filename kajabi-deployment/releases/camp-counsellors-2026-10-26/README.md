# Camp counsellor portrait replacement

October 26, 2026. Owner: Kade Greenland.

Kade approved Sally v4 branded and Bec v5 colour matched. Replace only the existing synthetic Camp counsellor portraits. Preserve ordinary headshots, historical preimages and unrelated page content. The legacy landscape image boxes become 4:5 portrait boxes to retain the full heads.

Approved masters and WebP copies: [Snooze Team Drive / 01_Brand / 02_Branding / Camp Snooze / Camp Counsellors](https://drive.google.com/drive/folders/1uWFUjIHjzLIRW_gOCrKcTsasK7oLS02O). Local masters live in the external media library under `website/camp-counsellors-2026-10-26/approved/`; assets.json records public URLs and SHA-256 verification. No new Kajabi upload is needed because existing R2 hosting serves the images.

Deployment surfaces:

- [Live Camp page, 2151771543](https://app.kajabi.com/admin/landing_pages/2151771543/edit), [theme 2164288957](https://app.kajabi.com/admin/themes/2164288957/settings/edit).
- [Existing staging page, 2152257408](https://app.kajabi.com/admin/landing_pages/2152257408/edit), [theme 2167447291](https://app.kajabi.com/admin/themes/2167447291/settings/edit).
- [Camp VSL draft, 2152355854](https://app.kajabi.com/admin/landing_pages/2152355854/edit), [theme 2168014017](https://app.kajabi.com/admin/themes/2168014017/settings/edit). Keep draft status.

Full before-settings snapshots and generated payloads are private backups in the external media library, since Kajabi exports include tokens. The versioned build_theme_patch.py generates only the changed sections from each snapshot and assets.json. Patches preserve unrelated live content and render order. Apply staging before live, then verify persisted settings and browser rendering. Restore the matching private before settings through update_theme_content to roll back.

Preflight: all 109 public sitemap pages fetched without request errors. The live Camp page was the only public page referencing these old portraits. Both hosted WebP hashes match the local approved assets. Placeholder scanner passes. Environment validator passes after loading the umbrella .env and mapping its existing SUPABASE_ANON_KEY to the validator's SUPABASE_KEY alias; the default stdlib validator does not itself load dotenv. No database access is required for this image replacement.

Local references updated in both Camp landing variants, Camp VSL source and packaged draft. Current hybrid-video image inputs replaced with approved images; dated backups and original headshots retained.
