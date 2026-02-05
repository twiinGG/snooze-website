# Camp Snooze Feb 9 Intake – Sales Mode

**Intake:** Monday, February 9, 2026  
**Status:** Sales open (reverted from waitlist)  
**Checkout:** https://www.joinsnooze.com/offers/K3Y6FEKX/checkout

---

## Pricing

| Option | Price | Notes |
|--------|--------|--------|
| One-time | $590 USD | Camp Snooze + 1 month Snooze access (starts Friday, Feb 6) |
| One-time (member) | $510 USD | Use coupon at checkout (shared in Snooze Village) |
| Quarterly | $197/quarter | Camp + 1 month Snooze included, then ongoing Snooze. Cancel anytime. |

No non-member-only price. All purchasers get 1 month Snooze included; access starts the Friday before kickoff (Feb 6 for this intake).

---

## Key Dates (Feb 9 Intake)

- **Applications close:** Thursday, February 6, 2026  
- **Snooze access starts:** Friday, February 6, 2026  
- **Packing list & login details:** Friday, February 6 (post-purchase email + packing list email)  
- **Camp starts / kick-off call:** Monday, February 9, 2026  
- **Daily group call:** 10–11am AEDT  

Login details for the included Snooze month are in the post-purchase email and in the camp packing list email.

---

## Files (Landing + Checkout)

**Landing page (sales mode):**
- `camp-snooze-v2-luxury/camp-snooze-landing-page-blocks.html` – hero, pricing ($590 / $510 / $197 quarter), value breakdown (Camp vs 1:1), Key Dates, FAQs, all CTAs → checkout
- `camp-snooze-v2-luxury/camp-snooze-v2-luxury.css` – theme + breakdown styles
- `camp-snooze-v2-luxury/camp-snooze-v2-luxury.js` – sticky CTA (links to checkout), countdown (applications close Feb 6)

**Checkout (Kajabi offer K3Y6FEKX):**
- `pages/checkout/camp-snooze-v2-luxury/camp-snooze-feb9-checkout-blocks.html` – order summary (one-time $590 + quarterly $197/quarter), what’s included, key dates
- Same checkout uses `camp-snooze-v2-checkout.css` and `camp-snooze-v2-checkout.js`

---

## Value Breakdown (On-Page)

Section “Why Camp Costs Less” (after Key Dates):

- 2-Week 1:1 Transformation Value: $3,500  
- 1 Month Snooze Access (included): $79  
- Group Camp Discount: -$2,989  
- Your Price Today: $590  

---

## Deployment Checklist

1. **Kajabi offer K3Y6FEKX:** One-time $590 + subscription $197/quarter; member coupon for $510 one-time.  
2. **Landing:** Paste landing blocks, CSS, JS into Camp Snooze page.  
3. **Checkout:** Paste `camp-snooze-feb9-checkout-blocks.html` (and shared checkout CSS/JS) below Kajabi form.  
4. **Emails:** Post-purchase and packing list emails include Snooze login details and Feb 6 access start.

---

*Last updated: January 2026*
