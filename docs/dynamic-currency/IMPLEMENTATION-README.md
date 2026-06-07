# Currency Toggle - Complete Implementation Package

**Version:** 2.0 (Merged Implementation)  
**Date:** December 30, 2025  
**Status:** ✅ Ready for Deployment

---

## 📦 What's Included

This implementation package combines the best features from both the original technical brief and the secondary brief, including:

✅ **Automated Features** (from secondary brief)
- Timezone-based auto-detection
- Automatic UI injection
- Automatic link detection
- Checkout page auto-detection

✅ **GTM Integration** (from original brief)
- Currency detection variables
- Purchase event tracking
- ROAS accuracy

✅ **Enhanced Features**
- Comprehensive error handling
- FOUC prevention
- Mobile responsive
- Accessibility support

---

## 📁 File Structure

```
implementation/
├── README.md                          ← You are here
├── DEPLOYMENT-GUIDE.md                ← Step-by-step deployment instructions
├── CONTENT-TEAM-GUIDE.md              ← Guide for adding data attributes
├── currency-toggle-fouc.html           ← FOUC prevention (Header Scripts)
├── currency-toggle.js                 ← Main JavaScript (Footer Scripts)
├── currency-toggle.css                ← CSS Styles (Theme Custom CSS)
├── gtm-variables.js                  ← GTM Variables (for GTM setup)
└── kajabi-checkout-tracking.js        ← Purchase tracking (Checkout Settings)
```

---

## 🚀 Quick Start

### For Developers

1. **Read:** `DEPLOYMENT-GUIDE.md` (complete step-by-step instructions)
2. **Deploy:** Follow the 8-step deployment process
3. **Test:** Use the testing checklist

### For Content Team

1. **Read:** `CONTENT-TEAM-GUIDE.md` (how to add data attributes)
2. **Add:** Data attributes to pricing elements
3. **Test:** Verify toggle works on your pages

---

## 📋 Deployment Checklist

### Phase 1: Kajabi Setup
- [ ] Add FOUC prevention script to Header Page Scripts
- [ ] Add main JavaScript to Footer Page Scripts
- [ ] Add CSS to Theme Custom CSS
- [ ] Add purchase tracking to Checkout Settings

### Phase 2: GTM Setup
- [ ] Create `CJS - User Currency Preference` variable
- [ ] Create `CJS - Dynamic Click Value` variable
- [ ] Update GA4 tags with currency parameters
- [ ] Update Meta Pixel tags with currency parameters

### Phase 3: Content Updates
- [ ] Add `class="dynamic-price"` to all price elements
- [ ] Add `data-usd` and `data-aud` attributes
- [ ] Add `class="dynamic-cta"` to all checkout buttons
- [ ] Test on key pages

### Phase 4: Testing
- [ ] Functional tests (toggle, persistence, checkout)
- [ ] GTM tracking tests (variables, events)
- [ ] Cross-browser tests
- [ ] Performance tests

---

## 🔑 Key Features

### 1. Auto-Detection
- Detects Australian users via timezone
- Defaults to AUD for Australia/* timezone
- Falls back to USD for all others

### 2. Automated UI
- Automatically injects toggle into navigation
- Works on desktop and mobile
- No manual HTML placement needed

### 3. GTM Integration
- Currency detection for all events
- Accurate ROAS tracking
- Purchase event currency handling

### 4. Error Handling
- Graceful fallbacks for localStorage unavailable
- Console warnings for missing attributes
- URL validation before updates

---

## 📊 Technical Details

### Data Attribute Format

**Supported Format:**
```html
<span class="dynamic-price" 
      data-usd="147" 
      data-aud="220" 
      data-period-usd="/ 3 months" 
      data-period-aud="/ 3 months">
  $147 USD / 3 months
</span>
```

**GTM Compatibility:**
- Script extracts numeric value from `data-usd`/`data-aud`
- Stores in `data-price-value` for GTM access
- Supports both number-only and formatted prices

### Offer Mapping

Current offers:
- Membership Launch: `6iRarwak` (USD) ↔ `bFxLg2uz` (AUD)
- Consult Upsell: `igbTdRbk` (USD) ↔ `SiiVEJuS` (AUD)

**To add new offers:**
1. Update `CONFIG.offerMapping` in `currency-toggle.js`
2. Update `CONFIG.audOfferIds` in `currency-toggle.js`
3. Update GTM variable `CJS - User Currency Preference`
4. Update `kajabi-checkout-tracking.js`

---

## 🐛 Troubleshooting

### Common Issues

**Toggle not appearing:**
- Check browser console for errors
- Verify navigation selectors match your theme
- Check CSS is loaded

**Prices not updating:**
- Verify `class="dynamic-price"` is present
- Check `data-usd` and `data-aud` attributes
- Check browser console for warnings

**GTM tracking not working:**
- Verify GTM variables are created
- Check variable names match exactly
- Verify tags use the variables

See `DEPLOYMENT-GUIDE.md` for detailed troubleshooting.

---

## 📚 Documentation

- **DEPLOYMENT-GUIDE.md** - Complete deployment instructions
- **CONTENT-TEAM-GUIDE.md** - How to add data attributes
- **SECONDARY-BRIEF-ASSESSMENT.md** - Technical analysis
- **Currency-Toggle-Technical-Brief.md** - Original requirements
- **../CAMP-SNOOZE-STANDALONE-IMPLEMENTATION.md** - Deployed pilot on Camp Snooze landing page (Jan 2026); takeaways for global rollout

---

## ✅ Pre-Deployment Verification

Before going live:

1. ✅ All files reviewed
2. ✅ GTM variables created and tested
3. ✅ Test purchases completed (USD and AUD)
4. ✅ GTM Preview mode verified
5. ✅ Cross-browser testing done
6. ✅ Mobile testing done
7. ✅ Performance impact assessed
8. ✅ Rollback plan ready

---

## 🎯 Success Metrics

After deployment, monitor:

- **Toggle Usage:** Currency toggle clicks per session
- **Currency Distribution:** AUD vs USD preference ratio
- **Conversion Rate:** By currency (AUD vs USD)
- **ROAS Accuracy:** Verify currency codes in analytics
- **Performance:** PageSpeed scores maintained

---

## 📞 Support

**For Technical Issues:**
- Check browser console for errors
- Use GTM Preview mode for tracking debugging
- Refer to DEPLOYMENT-GUIDE.md troubleshooting section

**For Content Questions:**
- Refer to CONTENT-TEAM-GUIDE.md
- Check pricing strategy document for AUD prices
- Check KAJABI-OFFER-URLS.md for offer IDs

---

## 🔄 Version History

**Camp Snooze pilot (Jan 30, 2026)** - Standalone implementation deployed
- Camp Snooze landing page: self-contained AUD/USD toggle (pricing section + sticky footer)
- See `../CAMP-SNOOZE-STANDALONE-IMPLEMENTATION.md` for details and takeaways for global rollout

**v2.0 (Dec 30, 2025)** - Merged Implementation
- Combined automated approach with GTM integration
- Added comprehensive error handling
- Enhanced FOUC prevention
- Mobile responsive improvements

**v1.0 (Dec 27, 2025)** - Original Technical Brief
- Initial requirements and specifications

---

**Last Updated:** January 30, 2026  
**Status:** ✅ Production Ready (global package); Camp Snooze pilot live
