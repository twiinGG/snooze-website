# Kajabi Deployment Validation Checklist

**Last updated:** February 5, 2026
**Owner:** Kade
**Applies to:** All Kajabi website deployments

## When to Use This Checklist

Use this checklist for every Kajabi website deployment:
- New landing pages
- Website page updates
- CSS/JavaScript changes
- Campaign launches with discount codes
- Any HTML/CSS pasted to Kajabi

**Follow every section in order. Do not skip steps.**

## Estimated Time

- Pre-paste validation: 5 minutes
- Staging validation: 10 minutes
- Discount code validation: 15 minutes (if applicable)
- Go-live: 2 minutes
- **Total:** 17-32 minutes per deployment

---

## 1. Pre-Paste Validation (Local)

Complete these checks BEFORE pasting code to Kajabi.

### Git and Version Control

- [ ] All changes committed to Git
- [ ] Working directory clean (run `git status`)
- [ ] Git tag created using format: `website-vX.Y.Z`
  ```bash
  git tag website-v1.2.3
  git push origin website-v1.2.3
  ```

### Placeholder Detection

- [ ] Run placeholder scanner on all files to be deployed
  ```bash
  python snooze-infrastructure/src/validation/scan_placeholders.py \
    --dir snooze-product/projects/snooze-website/kajabi-deployment/pages/[page-directory]/
  ```
- [ ] **BLOCK if placeholders detected**
  - Fix unreplaced variables ({{VAR}}, ${VAR}, [YOUR_VAR], %VAR%)
  - Re-run scanner until clean

### Link Validation

- [ ] Run link checker on deployment files
  ```bash
  bash snooze-infrastructure/src/validation/check_links.sh \
    snooze-product/projects/snooze-website/kajabi-deployment/pages/[page-directory]/
  ```
- [ ] **BLOCK if broken links detected**
  - Fix broken internal links
  - Update or remove broken external links
  - Re-run checker until clean

### Environment Configuration

- [ ] Run environment validator
  ```bash
  python snooze-infrastructure/src/validation/env_validator.py --check-only
  ```
- [ ] **BLOCK if required env vars missing**
  - Add missing variables to root `.env`
  - Verify variable format (especially SUPABASE_URL)
  - Re-run validator until clean

### Code Quality

- [ ] Linters pass (HTMLHint, Stylelint, ESLint)
  - These run automatically via pre-commit hooks
  - If pre-commit blocked commit, fix issues first

### Third-Party Code (if applicable)

- [ ] Third-party snippets scanned with VirusTotal or Snyk
  - Only if including vendor JavaScript/tracking pixels
  - Kajabi recommends this for security
- [ ] Third-party code sourced from official vendor docs

---

## 2. Deploy to Staging (Kajabi Hidden Page)

Test in Kajabi staging environment before going live.

### Paste and Save

- [ ] Log into Kajabi: https://thesleepconscierge.mykajabi.com
- [ ] Navigate to target page (Website > Pages > [page name])
- [ ] Click Edit
- [ ] Paste HTML/CSS/JS into Custom Code or Page Settings
- [ ] Save page (keep hidden/unpublished)

### Generate Preview

- [ ] Click preview icon in Kajabi editor
- [ ] Copy preview URL
- [ ] Open preview URL in **incognito browser** (visitor experience, not admin)
  - Kajabi recommendation: always test as visitor, not logged-in admin

### Visual Validation

- [ ] Page renders correctly on desktop
- [ ] Page renders correctly on mobile (use browser DevTools device emulation)
- [ ] Page renders correctly on tablet
- [ ] All images load
- [ ] All fonts render correctly
- [ ] Colors match design system
- [ ] Spacing and layout correct

### Functional Validation

- [ ] All buttons clickable
- [ ] All links work (internal and external)
- [ ] Forms submit correctly (if applicable)
- [ ] JavaScript features work (dropdowns, modals, etc.)
- [ ] No console errors
  - Open browser DevTools (F12)
  - Check Console tab for red errors
  - **BLOCK if JavaScript errors present**

### Link Validation (Live)

- [ ] Install Check My Links browser extension
  - Chrome: https://chrome.google.com/webstore
  - Firefox: https://addons.mozilla.org
- [ ] Run Check My Links on staging page
- [ ] **BLOCK if broken links found**
  - Fix in source code
  - Re-paste to staging
  - Re-check

---

## 3. Discount Code Validation (If Applicable)

**Only complete this section if deployment includes discount codes or special offers.**

Skip this section if:
- No discount codes involved
- No special pricing
- Standard product pages only

### Coupon Creation

- [ ] Coupon created in Kajabi: Sales > Coupons
- [ ] Coupon settings verified:
  - Correct discount amount/percentage
  - Correct product(s) linked
  - Valid date range (start and end)
  - Usage limits configured (if applicable)
- [ ] Discount URL copied from coupon (not just code text)
  - Use full URL: `https://thesleepconscierge.mykajabi.com/offers/[offer-id]?coupon=[code]`

### Code Deployment

- [ ] All sales page buttons updated with discount URL
- [ ] All email CTAs updated with discount URL
- [ ] Confirmation: using discount URL not just plain code

### $1 Test Transaction

Run test purchase (Kajabi best practice):

- [ ] Open incognito browser
- [ ] Navigate to sales page with discount link
- [ ] Add product to cart
- [ ] Verify discount applied at checkout
- [ ] Complete $1 test purchase (use test payment method if Kajabi allows, or refund after)
- [ ] **BLOCK if discount not applied correctly**

### Post-Purchase Validation

- [ ] Product access granted to test account
- [ ] Welcome email received
- [ ] Kajabi automations fired correctly
  - Tags applied
  - Email sequences started
  - Access granted to correct products

### Dual-Control Validation

- [ ] Second person validates in fresh incognito session
  - Not the person who deployed the code
  - Uses different browser/device if possible
- [ ] Both team members sign off before publishing
  - First validator: [name] _______________
  - Second validator: [name] _______________

---

## 4. Go-Live

Final steps to publish page to production.

### Publish Page

- [ ] In Kajabi editor, click Publish (or unhide page)
- [ ] Update navigation if needed
  - Website > Navigation
  - Add new page to menu structure
- [ ] Update external links if needed
  - Campaign emails
  - Social media posts
  - Ad landing page URLs

### Final Spot-Check

- [ ] Open live URL in incognito browser
- [ ] Verify page loads correctly
- [ ] Verify navigation works
- [ ] Verify all CTAs go to correct URLs
- [ ] Check console for errors (should be none)

### Deployment Logging

- [ ] Document deployment in log:
  - **Date:** [YYYY-MM-DD]
  - **Pages changed:** [list]
  - **Git tag:** [website-vX.Y.Z]
  - **Deployed by:** [name]
  - **Validated by:** [name]
  - **Issues:** [none or description]

**Optional:** Log to Supabase operational_logs table for historical tracking.

---

## 5. Rollback (If Issues Found Post-Publish)

If issues discovered after publishing, use rollback procedure.

### Quick Rollback

1. Identify last known-good Git tag:
   ```bash
   git tag -l "website-v*" --sort=-version:refname | head -5
   ```

2. Checkout previous version:
   ```bash
   git checkout website-v1.2.2
   ```

3. Copy code from rolled-back version

4. Paste to Kajabi (replace broken version)

5. Verify issue resolved

6. Return to main branch:
   ```bash
   git checkout main
   ```

### Full Rollback Documentation

Reference: `.planning/docs/rollback/website-rollback.md`

Follow complete procedure for complex rollbacks or CSS changes affecting multiple pages.

---

## Section-Specific Notes

### When to Skip Sections

- **Section 3 (Discount validation):** Skip if no coupons or special offers involved
- **Section 2 (Staging):** Required for all deployments - never skip
- **Section 1 (Pre-paste):** Required for all deployments - never skip

### Dual-Control Requirements

Dual-control (two-person validation) required for:
- Discount code deployments (Section 3)
- Campaign launches with time-sensitive offers
- Major CSS changes affecting multiple pages

Dual-control optional for:
- Minor content updates
- Single-page tweaks
- Documentation changes

### Common Issues and Solutions

**Issue:** Placeholder scanner detects false positives
- **Solution:** Use `--severity warn` flag, verify placeholders are actually correct
- **Example:** Email addresses with special characters may trigger false positives

**Issue:** Link checker fails on external CDN links
- **Solution:** check_links.sh skips common CDN domains, verify skip pattern includes your CDN

**Issue:** Discount code test fails with "invalid coupon"
- **Solution:** Verify coupon is active (not expired or usage limit reached)
- **Solution:** Verify using discount URL not just code text

**Issue:** JavaScript works locally but fails in Kajabi staging
- **Solution:** Check browser console for errors (Kajabi may strip certain JavaScript)
- **Solution:** Verify JavaScript is in allowed Kajabi Custom Code block

---

## Checklist Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-02-05 | Initial checklist created | Kade |

---

**Questions or issues with this checklist?**
- Technical issues: Kade
- Content/business questions: Sally
- Kajabi platform issues: support@kajabi.com
