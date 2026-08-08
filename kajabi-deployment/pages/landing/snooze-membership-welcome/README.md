# Snooze membership welcome page

This is the post-purchase destination for a full Snooze Membership purchase. It replaces the plain post-purchase welcome email content with an interactive landing page, matching the pattern used for `pages/landing/7-day-trial-thank-you/`. It is a Kajabi Landing Page with its own theme. It does not inherit the website theme CSS or JavaScript.

## Kajabi targets

Create one blank Landing Page named `Snooze Membership Welcome`, then use these whole-field paste targets:

| File | Kajabi target |
|---|---|
| `welcome-page.html` | The landing page's single full-width, flush Custom Code block |
| `welcome-page.css` | That landing page theme's Custom CSS field |
| `welcome-page.js` | That landing page theme's Custom JavaScript field |

Set the section to full width, make the code block flush and set all section padding to zero. Remove or hide the landing theme's default header and footer because the page includes its own minimal member header and support footer.

Use the metadata in `page-metadata.md`. After publishing, set the Snooze Membership offer's thank-you page (and the post-purchase welcome automation, if it still links out) to point at this landing-page URL instead of the plain welcome email content.

Do not paste these files into the offer-level custom thank-you code field. That field does not provide the landing-page CSS and JavaScript surfaces this page requires.

## Behavior contract

- All four stage choices remain direct product links when JavaScript is unavailable.
- With JavaScript, a stage choice reveals one specific starting-point action.
- The Village and live-sessions cards remain direct links with or without JavaScript.
- `onboarding_path_selected` includes `age_band`, `destination` and `surface`.
- `village_cta_click` includes `placement` and `surface`.
- `live_sessions_cta_click` includes `placement` and `surface`.
- `app_download_click` includes `platform`, `placement` and `surface`.
- No selection is saved to a profile and no personal data enters the dataLayer.

## Validation

Run from the repository root:

```bash
node --check apps/snooze-website/kajabi-deployment/pages/landing/snooze-membership-welcome/welcome-page.js
node apps/snooze-website/kajabi-deployment/pages/landing/snooze-membership-welcome/__tests__/welcome-page.test.js
npx --yes htmlhint --rules tag-pair,attr-no-duplication,id-unique,src-not-empty apps/snooze-website/kajabi-deployment/pages/landing/snooze-membership-welcome/welcome-page.html
npx --yes stylelint --config apps/snooze-website/scripts/stylelint-kajabi.json apps/snooze-website/kajabi-deployment/pages/landing/snooze-membership-welcome/welcome-page.css
```

Preview logged in at 390px, 768px and 1440px. Confirm the four product destinations, the Village link, the live-sessions link and both app-store links open correctly for an active member before connecting the offer's thank-you page or automation to this URL.
