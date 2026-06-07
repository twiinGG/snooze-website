# Camp Snooze Standalone Currency Toggle (Deployed)

**Deployed:** January 30, 2026  
**Location:** Camp Snooze Feb 9 intake landing page only  
**Status:** Live pilot for AUD/USD dynamic pricing

---

## Summary

A self-contained AUD/USD currency toggle was implemented on the Camp Snooze landing page as a pilot before rolling out the global Dynamic Currency Toggle. It reuses the same patterns (data attributes, localStorage, timezone detection) but lives entirely within the Camp Snooze page files. No global Kajabi header/footer scripts are required.

---

## Implementation Location

| Item | Path |
|------|------|
| Landing page HTML | `snooze-product/projects/snooze-website/kajabi-deployment/pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-landing-page-blocks.html` |
| CSS | `camp-snooze-v2-luxury.css` (currency toggle section at end) |
| JavaScript | `camp-snooze-v2-luxury.js` (CAMP_CURRENCY_CONFIG, campSetCurrency, campUpdatePrices, campUpdateLinks, campInjectToggles, etc.) |
| Documentation | `camp-snooze-v2-luxury/CURRENCY-TOGGLE.md` |

---

## Differences from Global Implementation

| Aspect | Global (this repo) | Camp Snooze standalone |
|--------|--------------------|-------------------------|
| Scope | Site-wide (header/footer scripts) | Single landing page |
| Toggle placement | Injected into nav | Inline HTML in pricing section + sticky footer + optional nav |
| Checkout URLs | Offer ID swap in href | Full URL per currency in config |
| AUD URL format | `.../offers/46Bz9tk6/checkout` | `.../offers/46Bz9tk6` (no `/checkout`) |
| Price display | A$ for AUD (configurable) | $ for both, e.g. `$885 AUD` |
| FOUC | Inline head script + CSS | Body class `currency-loaded` + CSS |

---

## Takeaways for Global Rollout

1. **Inline toggle in HTML** – Putting the main toggle in the page HTML (with inline styles) avoids injection failures when nav selectors don’t match. Consider a hybrid: global script for link/price updates, page-level HTML for the toggle UI where needed.
2. **Full checkout URLs in config** – Using `usdCheckoutUrl` and `audCheckoutUrl` instead of offer ID swap avoids URL path differences (e.g. AUD without `/checkout`). Can be applied in global `currency-toggle.js` for Camp Snooze or other offers.
3. **Sticky CTA** – Include the sticky bar in the set of elements that get link and price updates so currency stays consistent.
4. **Same localStorage key** – `snooze_currency_preference` is shared so a user who sets AUD on Camp Snooze could see AUD on other pages once the global toggle is live.

---

## Checkout URLs (Camp Snooze)

- **USD:** `https://www.joinsnooze.com/offers/K3Y6FEKX/checkout`
- **AUD:** `https://www.joinsnooze.com/offers/46Bz9tk6`

---

## Reference

- Camp Snooze currency doc: `snooze-product/.../camp-snooze-v2-luxury/CURRENCY-TOGGLE.md`
- Global implementation: `implementation/README.md`, `DEPLOYMENT-GUIDE.md`, `CONTENT-TEAM-GUIDE.md`
