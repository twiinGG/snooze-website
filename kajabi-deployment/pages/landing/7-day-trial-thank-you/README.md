# Snooze trial thank-you landing page

This is the shared post-purchase destination for the USD and AUD Snooze Membership trial offers. It is a Kajabi Landing Page with its own theme. It does not inherit the website theme CSS or JavaScript.

## Kajabi targets

Create one blank Landing Page named `7-Day Trial Thank You`, then use these whole-field paste targets:

| File | Kajabi target |
|---|---|
| `thank-you-page.html` | The landing page&rsquo;s single full-width, flush Custom Code block |
| `thank-you-page.css` | That landing page theme&rsquo;s Custom CSS field |
| `thank-you-page.js` | That landing page theme&rsquo;s Custom JavaScript field |

Set the section to full width, make the code block flush and set all section padding to zero. Remove or hide the landing theme&rsquo;s default header and footer because the page includes its own minimal member header and support footer.

Use the metadata in `page-metadata.md`. After publishing, set both trial offers to redirect to the same landing-page URL:

- USD offer `2150887297`
- AUD offer `2151254578`

Do not paste these files into the offer-level custom thank-you code field. That field does not provide the landing-page CSS and JavaScript surfaces this page requires.

## Behavior contract

- All four stage choices remain direct product links when JavaScript is unavailable.
- With JavaScript, a stage choice reveals one specific starting-point action.
- `onboarding_path_selected` includes `age_band`, `destination` and `surface`.
- `village_cta_click` includes `placement` and `surface`.
- `app_download_click` includes `platform`, `placement` and `surface`.
- No selection is saved to a profile and no personal data enters the dataLayer.

## Validation

Run from the repository root:

```bash
node --check apps/snooze-website/kajabi-deployment/pages/landing/7-day-trial-thank-you/thank-you-page.js
node apps/snooze-website/kajabi-deployment/pages/landing/7-day-trial-thank-you/__tests__/thank-you-page.test.js
npx --yes htmlhint --rules tag-pair,attr-no-duplication,id-unique,src-not-empty apps/snooze-website/kajabi-deployment/pages/landing/7-day-trial-thank-you/thank-you-page.html
npx --yes stylelint --config apps/snooze-website/scripts/stylelint-kajabi.json apps/snooze-website/kajabi-deployment/pages/landing/7-day-trial-thank-you/thank-you-page.css
```

Preview logged in at 390px, 768px and 1440px. Confirm the four product destinations open for the trial member before connecting either offer redirect.
