# Automation Registry Rule

**Date:** January 2026
**Purpose:** Standardize registration of all marketing automations in the project.
**Status:** Active

---

## Overview

All complex automations (Marketing > Automations) must be registered here. Simple offer-level automations (e.g., "Grant Offer") do not need registration unless they contain complex branching logic.

---

## Naming Convention

### Code Format

**Pattern:** `AUT[CATEGORY][NUMBER]`

- `AUT` = Automation prefix
- `[CATEGORY]` = Two-letter category code (matches Offer/Email categories where possible)
- `[NUMBER]` = Sequential number (01, 02, etc.)

### Category Codes

| Code | Category | Description |
|------|----------|-------------|
| `LM` | Lead Magnet | Automations for lead magnets and free modules |
| `CR` | Course | Automations for course logic |
| `MS` | Membership | Automations for membership flows |
| `GN` | General | General purpose automations |

---

## Registry

### Lead Magnet Automations (`LM`)

#### **AUTLM01**
- **Internal Title:** `AUTLM01_Course-Sample-Conversion`
- **Kajabi ID:** `436114`
- **Description:** Handle Free Module purchases, branching by tag (`LM_512_schedule`, etc.) to send specific content before merging into the main conversion sequence.
- **Trigger:** Offer Purchased (`PUBLM01`, etc.)
- **Key Logic:** IF tag `LM_512_schedule` THEN send specific email content.
- **Status:** live

#### **AUTLM09**
- **Internal Title:** `AUTLM09_Toddler-Toolkit-Sample`
- **Kajabi ID:** `391060`
- **Description:** Post-purchase handler for the free Toddler Toolkit sample. Replaces the inline email that WS-003 found pointing at a draft offer.
- **Trigger:** Offer is purchased, `Toddler Toolkit - Sample Access` (`4HQjFJGC` / `2150846925`, internal `LDCR03`)
- **Action:** Subscribe to email sequence `EMLM09_Toddler-Toolkit-Sample` (`2148871322`)
- **Status:** **Published, verified live 2026-08-10**

#### **AUTLM10**
- **Internal Title:** `AUTLM10_Newborn-Guide-Preview`
- **Kajabi ID:** `898286`
- **Description:** Post-purchase handler for the free Newborn Sleep Guide preview.
- **Trigger:** Offer is purchased, `Newborn Sleep Guide - What's Inside` (`zs2zLeUw` / `2150851932`, internal `LDCR04`)
- **Action:** Subscribe to email sequence `EMLM10_Newborn-Guide-Preview` (`2148871323`)
- **Status:** **Published, verified live 2026-08-10**

#### **AUTLM11**
- **Internal Title:** `AUTLM11_Nap-Transition-Mini-Guide`
- **Kajabi ID:** `898289`
- **Description:** Post-purchase handler for the free 3-to-2 Nap Transition Mini Guide.
- **Trigger:** Offer is purchased, `3-to-2 Nap Transition Mini Guide` (`FwisMwa6` / `2151272119`, internal `LDGD03`)
- **Action:** Subscribe to email sequence `EMLM11_Nap-Transition-Mini-Guide` (`2148871324`)
- **Status:** **Published, verified live 2026-08-10**

---

## Numbering note, added 2026-08-10

`[NUMBER]` is **not** a running count of automations. It tracks the asset the automation serves, which is why `AUTLM01` pairs with `PUBLM01`. The three above therefore take 09, 10 and 11 to pair with sequences `EMLM09`, `EMLM10` and `EMLM11` rather than continuing 02, 03, 04 from `AUTLM01`. Pick the asset's number first; only fall back to the next free number when the automation serves no numbered asset.

## Known gaps

None open for this family. Offer `zs2zLeUw` was given internal title `LDCR04_Newborn-Guide-Preview - Lead Magnet` on 2026-08-10, confirmed by a `get_offer` read, closing the last unregistered magnet in the set.
