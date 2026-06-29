# Camp Snooze V2 Luxury - Deploy Notes

## File map

| File | Purpose |
|------|---------|
| `camp-snooze-landing-page-blocks.html` | Landing page blocks - CHECKOUT mode (live intake) |
| `camp-snooze-landing-page-blocks-waitlist.html` | Landing page blocks - WAITLIST mode (between intakes) |
| `camp-snooze-v2-luxury.css` | Shared stylesheet for both landing page variants |
| `camp-snooze-v2-luxury.js` | Shared JavaScript for both landing page variants |
| `Camp Snooze Pricing V2 Mockup.html` | Standalone pricing mockup (self-contained, not Kajabi blocks) |
| `camp-snooze-waitlist-next-steps.html` | Post-waitlist-signup confirmation page blocks |
| `camp-snooze-waitlist-next-steps.css` | Stylesheet for waitlist next-steps page |
| `camp-snooze-waitlist-next-steps.js` | JavaScript for waitlist next-steps page |

---

## Kajabi paste locations

### CSS (`camp-snooze-v2-luxury.css`)
Paste into: Kajabi Settings -> Website -> Theme -> Custom CSS
(or into the individual page's Custom CSS field)

### JavaScript (`camp-snooze-v2-luxury.js`)
Paste into: Kajabi Settings -> Website -> Custom JavaScript
(or into the individual page's Custom JavaScript field)

### HTML blocks
Paste into the Kajabi landing page's custom code blocks.

---

## Mode switching (checkout vs waitlist)

The two HTML block files share the same CSS and JS. Switch between modes by choosing which HTML file to paste into Kajabi:

- **CHECKOUT mode:** use `camp-snooze-landing-page-blocks.html`
  - Renders pricing section with live checkout CTA
  - Sets no `window.CAMP_PAGE_MODE`; JS defaults to checkout behaviour
- **WAITLIST mode:** use `camp-snooze-landing-page-blocks-waitlist.html`
  - Renders waitlist form section instead of pricing
  - Sets `window.CAMP_PAGE_MODE = 'waitlist'` at top of file; JS detects this to suppress countdown and show waitlist sticky CTA

---

## Offer IDs and URLs

| Identifier | URL / ID |
|-----------|---------|
| Camp Snooze USD checkout | `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout` |
| Camp Snooze AUD checkout | `https://www.joinsnooze.com/offers/46Bz9tk6` |
| Waitlist signup form | `https://www.joinsnooze.com/forms/2149246740` |
| Snooze Membership (USD, used in waitlist next-steps) | `https://www.joinsnooze.com/offers/z63s9VaR` |

These URLs appear in both HTML and JS. Update in both places when offer IDs change.

---

## Currency toggle

`CAMP_CURRENCY_CONFIG` in `camp-snooze-v2-luxury.js` holds the USD and AUD checkout URLs.
Dynamic prices use `data-usd` and `data-aud` attributes on `.dynamic-price` elements.
Default currency auto-detects from the visitor's timezone (Australia/* -> AUD, all others -> USD).
Preference is persisted in localStorage under the key `snooze_currency_preference`.

---

## Countdown timer

`COUNTDOWN_DEADLINE` in `camp-snooze-v2-luxury.js` is the applications-close datetime.
Current value targets end of March 2026 intake. Update this value for each new intake.
The countdown only runs in CHECKOUT mode (suppressed in waitlist mode).

---

## Font Awesome CDN (pre-commit note)

The Font Awesome CDN link in both HTML block files includes the integrity hash:
```
sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==
```
The `pragma: allowlist secret` directive has been removed from the inline HTML as part of comment stripping. If the pre-commit secret scanner flags this hash, add the file to the scanner's allowlist config instead.
