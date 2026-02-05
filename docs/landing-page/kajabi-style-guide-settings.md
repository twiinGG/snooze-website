# Kajabi Style Guide Settings Reference

**Last Updated:** 2025-10-31  
**Source:** Kajabi CMS Theme Settings  
**Purpose:** Baseline platform settings that our custom CSS should align with

---

## 📐 General Appearance

| Setting | Value |
|---------|-------|
| **Page Background** | `#FAF7F4` |
| **Use Background Image** | OFF (disabled) |

---

## 🎨 Colors

| Element | Color Code | Usage |
|---------|-----------|--------|
| **Primary** | `#1F293B` | Main brand color (Navy) |
| **Button Color** | `#F43357` | CTA buttons (Coral) |
| **Button Text** | `#FFFFFF` | Button text color |

---

## 🔘 Buttons

| Property | Value | Notes |
|----------|-------|-------|
| **Width** | Full / Auto | Flexible width options |
| **Style** | Solid / Outline | Two variants available |
| **Size Options** | Sm / Md / Lg | Three size options |
| **Border Radius** | `25px` | Rounded corners |

### Button Color Scheme
- **Background:** `#F43357` (Coral)
- **Text:** `#FFFFFF` (White)

---

## 📝 Typography

### Body Font
| Property | Value |
|----------|-------|
| **Family** | Poppins |
| **Weight** | Normal |
| **Line Height** | 1.6 |

### Heading Font
| Property | Value |
|----------|-------|
| **Family** | Playfair Display |
| **Weight** | Normal |
| **Line Height** | 1.2 |

---

## 🎨 Font Colors

| Element | Color Code | Hex Value |
|---------|-----------|-----------|
| **Heading** | `#161E2A` | Dark Navy |
| **Body** | `#161E2A` | Dark Navy |
| **Secondary** | `#888888` | Gray |
| **Placeholder** | `#CCCCCC` | Light Gray |

---

## 📏 Desktop Font Sizes

| Element | Size | Notes |
|---------|------|-------|
| **h1** | 58px | Hero headings |
| **h2** | 36px | *(default)* Section headings |
| **h3** | 30px | *(default)* Subsection headings |
| **h4** | 21px | Card/feature headings |
| **h5** | 24px | Smaller headings |
| **h6** | 16px | *(default)* Smallest heading |
| **Body** | 18px | *(default)* Base body text |

---

## 📱 Mobile Font Sizes

| Element | Size | Notes |
|---------|------|-------|
| **h1** | 36px | *(default)* Hero headings mobile |
| **h2** | 30px | *(default)* Section headings mobile |
| **h3** | 24px | *(default)* Subsection mobile |
| **h4** | 20px | *(default)* Card headings mobile |
| **h5** | 18px | *(default)* Smaller headings mobile |
| **h6** | 16px | *(default)* Smallest heading mobile |
| **Body** | 16px | *(default)* Base body text mobile |

---

## ⚠️ Error Messages

| Property | Value |
|----------|-------|
| **Text Color** | `#FFFFFF` (White) |
| **Background** | `#FF0000` (Red) |

---

## 🔄 Key Differences with Custom CSS

### Current Custom CSS Values vs Kajabi Settings

| Property | Kajabi Setting | Custom CSS | Recommendation |
|----------|---------------|------------|----------------|
| **Primary Color** | `#1F293B` (Navy) | `#F43357` (Coral) | ⚠️ Conflict - Custom uses coral as primary |
| **Body Font** | Poppins | Georgia/"FontName" | ⚠️ Conflict - Need to align |
| **Heading Font** | Playfair Display | Georgia/"FontName" | ⚠️ Conflict - Need to align |
| **Body Color** | `#161E2A` | `#1F293B` | ✓ Similar (both navy) |
| **Page Background** | `#FAF7F4` | `#FAF7F4` | ✓ Match |
| **Border Radius** | 25px | 8-24px (variable) | ⚠️ Inconsistent |

---

## 📋 Integration Notes

### What Should Be Controlled by Kajabi
These elements inherit from Kajabi's theme settings and should **NOT** be overridden in custom CSS unless necessary:

1. **Base Typography** - Body and heading fonts
2. **Base Font Sizes** - h1-h6 and body sizes
3. **Base Colors** - Primary, heading, body colors
4. **Button Base Styles** - Default button appearance

### What Custom CSS Should Handle
These are component-specific and should remain in custom CSS:

1. **Section-specific layouts** (feature grid, pricing cards)
2. **Custom components** (carousel, FAQ accordion)
3. **Hover states and transitions**
4. **Component-specific colors** (badges, trust elements)
5. **Custom spacing and shadows**

---

## 🎯 Alignment Strategy

### Priority 1: Font Alignment
- **Decision needed:** Use Poppins (Kajabi) or Georgia (Custom)?
- Recommendation: Use Kajabi fonts to leverage platform optimization
- Keep custom FontName as fallback only

### Priority 2: Color Semantics
- Kajabi Primary (`#1F293B` Navy) = Structural/nav elements
- Custom Primary (`#F43357` Coral) = CTAs and accent elements
- Both can coexist with clear semantic roles

### Priority 3: Typography Scale
- Use Kajabi's font size scale as baseline
- Custom CSS can add responsive clamp() for smoother scaling
- Maintain hierarchy established by Kajabi

### Priority 4: Button Styles
- Align border-radius to 25px (Kajabi setting)
- Keep coral color for primary CTAs
- Ensure consistent sizing (Sm/Md/Lg)

---

## ✅ Action Items for Analysis

1. **Review font usage** - Align body/heading fonts with Kajabi (Poppins/Playfair)
2. **Check button border-radius** - Standardize to 25px
3. **Verify color semantics** - Clarify Navy vs Coral usage
4. **Audit font sizes** - Ensure custom headings respect Kajabi scale
5. **Test inheritance** - Identify where Kajabi styles conflict with custom CSS

---

**Note:** This document should be referenced when:
- Writing new custom CSS
- Debugging style conflicts
- Planning design updates
- Onboarding new developers
- Preparing for Kajabi theme updates



