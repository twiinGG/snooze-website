# Currency Toggle - Content Team Guide

**Purpose:** Quick reference for adding currency toggle data attributes to pricing elements  
**Audience:** Content team, page builders  
**Last Updated:** December 30, 2025

---

## When to Add Currency Toggle

✅ **Add to:**
- All landing pages with pricing
- Product pages with pricing
- Course pages with pricing
- Any page with checkout buttons

❌ **Do NOT add to:**
- About pages
- Contact pages
- Blog posts
- Pages without pricing

---

## How to Add Data Attributes

### Step 1: Find the Price Element

In Kajabi Page Builder:
1. Select the text element containing the price
2. Open the HTML/Code editor (or use Custom HTML block)

### Step 2: Add Required Attributes

**Format:**
```html
<span class="dynamic-price" 
      data-usd="147" 
      data-aud="220" 
      data-period-usd="/ 3 months" 
      data-period-aud="/ 3 months">
  $147 USD / 3 months
</span>
```

**Required:**
- `class="dynamic-price"` ← **MUST HAVE**
- `data-usd="[number]"` ← **MUST HAVE** (just the number, no $)
- `data-aud="[number]"` ← **MUST HAVE** (just the number, no AUD)

**Optional:**
- `data-period-usd="[text]"` ← Optional (e.g., "/ 3 months", "/ year")
- `data-period-aud="[text]"` ← Optional (e.g., "/ 3 months", "/ year")

**Default Content:**
- The text between the tags should be the USD version
- This is what shows before JavaScript loads

---

## Examples

### Example 1: Simple Price

```html
<span class="dynamic-price" 
      data-usd="490" 
      data-aud="695">
  $490
</span>
```

### Example 2: Price with Period

```html
<span class="dynamic-price" 
      data-usd="147" 
      data-aud="220" 
      data-period-usd="/ 3 months" 
      data-period-aud="/ 3 months">
  $147 / 3 months
</span>
```

### Example 3: Complex Price Structure

```html
<p class="price dynamic-price" 
   data-usd="490" 
   data-aud="695" 
   data-period-usd="/ year" 
   data-period-aud="/ year">
   <span class="dollar-sign">$</span>490<span> USD</span><span>/ year</span>
</p>
```

**Note:** If you use `class="price"`, the script will preserve your HTML structure.

---

## Checkout Buttons

### Step 1: Find the Checkout Button

In Kajabi Page Builder:
1. Select the button/link element
2. Open the HTML/Code editor

### Step 2: Add Required Class

**Format:**
```html
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" 
   class="dynamic-cta">
  Join Now
</a>
```

**Required:**
- `class="dynamic-cta"` ← **MUST HAVE**
- `href` must contain a known offer ID

**Note:** You don't need to add `data-link-usd` or `data-link-aud` attributes. The script automatically detects and updates URLs based on the offer ID in the `href`.

---

## Where to Find AUD Prices

**Source:** `snooze-strategy-ops/docs/strategy/SNOOZE-PRICING-STRATEGY.md`

**Quick Reference:**

| Product | Launch USD | Launch AUD |
|---------|------------|------------|
| Membership Quarterly | $147 | AUD 220 |
| Membership Yearly | $490 | AUD 695 |
| Age-Based Courses | $117 | AUD 175 |
| Mini Modules | $27 | AUD 39 |
| Consult (Member) | $445 | AUD 640 |

**Important:** All AUD prices are **pre-set** (not calculated). Use exact values from pricing strategy document.

---

## Where to Find Offer IDs

**Sources:**
1. `projects/snooze-launch-december-2025/docs/KAJABI-OFFER-URLS.md`
2. `projects/snooze-website/docs/technical/URL-REFERENCE.md`
3. Kajabi Dashboard → Offers section

**Current Offer Mappings:**

| Product | USD Offer ID | AUD Offer ID |
|---------|--------------|--------------|
| Membership Launch | `6iRarwak` | `bFxLg2uz` |
| Consult Upsell | `igbTdRbk` | `SiiVEJuS` |

---

## Common Mistakes

### ❌ Wrong: Missing class
```html
<span data-usd="147" data-aud="220">$147</span>
```
**Problem:** No `class="dynamic-price"` - script won't find it

### ✅ Correct:
```html
<span class="dynamic-price" data-usd="147" data-aud="220">$147</span>
```

---

### ❌ Wrong: Including currency symbol in data attribute
```html
<span class="dynamic-price" data-usd="$147" data-aud="AUD 220">$147</span>
```
**Problem:** Script adds currency symbol automatically

### ✅ Correct:
```html
<span class="dynamic-price" data-usd="147" data-aud="220">$147</span>
```

---

### ❌ Wrong: Missing data-aud
```html
<span class="dynamic-price" data-usd="147">$147</span>
```
**Problem:** Missing `data-aud` - AUD price won't display

### ✅ Correct:
```html
<span class="dynamic-price" data-usd="147" data-aud="220">$147</span>
```

---

## Testing Your Changes

After adding data attributes:

1. **Save the page** in Kajabi
2. **Preview the page** (or publish)
3. **Check the toggle:**
   - Click the currency toggle in navigation
   - Prices should change immediately
   - Checkout button URLs should update
4. **Check browser console:**
   - Open DevTools (F12)
   - Look for any warnings about missing attributes

---

## Quick Reference Checklist

When adding pricing to a new page:

- [ ] All price elements have `class="dynamic-price"`
- [ ] All price elements have `data-usd="[number]"`
- [ ] All price elements have `data-aud="[number]"`
- [ ] Optional: Added `data-period-usd` and `data-period-aud` if needed
- [ ] All checkout buttons have `class="dynamic-cta"`
- [ ] Checkout button `href` contains a known offer ID
- [ ] Tested toggle functionality on the page
- [ ] No console errors

---

## Need Help?

**Common Issues:**
- Prices not updating → Check for `class="dynamic-price"` and data attributes
- Toggle not appearing → Contact dev team (automatic injection)
- Wrong prices showing → Verify data attributes match pricing strategy doc

**Contact:**
- Technical questions → Development team
- Pricing questions → Strategy team
- Offer ID questions → Check KAJABI-OFFER-URLS.md

---

**Last Updated:** December 30, 2025
