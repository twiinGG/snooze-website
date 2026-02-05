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
- **Description:** Handle Free Module purchases, branching by tag (`LM_512_schedule`, etc.) to send specific content before merging into the main conversion sequence.
- **Trigger:** Offer Purchased (`PUBLM01`, etc.)
- **Key Logic:** IF tag `LM_512_schedule` THEN send specific email content.
