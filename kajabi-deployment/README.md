# Kajabi deployment files

Git is the source of truth. Kajabi is the render surface. Ready-to-paste HTML, CSS, and JS live here.

## Start here

**[`PASTE-MAP.md`](./PASTE-MAP.md)** is the index of every paste target: Kajabi field → repo file → live status → whether you need to re-paste.

Supporting docs (do not duplicate the map elsewhere):

| Doc | Role |
|---|---|
| [`PASTE-MAP.md`](./PASTE-MAP.md) | Operator index: what / where / re-paste? |
| [`CTA-CHECKOUT-FRESHNESS-AUDIT-2026-08-08.md`](./CTA-CHECKOUT-FRESHNESS-AUDIT-2026-08-08.md) | Live CTA audit: broken vs outdated checkout destinations; Claude Code handoff |
| [`../docs/technical/CODE-SURFACE-CONTRACT.md`](../docs/technical/CODE-SURFACE-CONTRACT.md) | One-file-per-field contract + surface classes |
| [`../docs/technical/KAJABI-SURFACE-CODE-SETUP.md`](../docs/technical/KAJABI-SURFACE-CODE-SETUP.md) | Container shapes and write paths |
| [`../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md`](../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md) | Settings → Checkout header/footer how-to |
| [`global/checkout-tracking/README.md`](./global/checkout-tracking/README.md) | Short pointer for checkout tracking files |
| [`../docs/DEPLOYMENT-CHECKLIST.md`](../docs/DEPLOYMENT-CHECKLIST.md) | Pre-paste validation checklist |

---

## Layout (current)

```
kajabi-deployment/
├── PASTE-MAP.md                 ← start here
├── global/
│   ├── html/
│   │   ├── site-header-page-scripts.html   # Settings → Site Details → Header Page Scripts
│   │   ├── checkout-header-tracking.html   # Settings → Checkout → Header tracking
│   │   └── footer.html                     # sync source; copy inline into pages
│   ├── css/
│   │   └── theme-custom-code.css           # website Theme Custom Code → CSS
│   ├── js/
│   │   ├── theme-custom-code.js            # website Theme Custom Code → JS
│   │   ├── kajabi-checkout-tracking.js     # Settings → Checkout → Footer
│   │   ├── meta-advanced-matching.js       # fragment; inline into checkout-header-tracking.html
│   │   ├── snooze-globals.js               # NOT a paste file (stub)
│   │   └── currency-toggle.js              # NOT a paste file (test extract)
│   └── checkout-tracking/README.md         # points at the three checkout tracking files
├── pages/
│   ├── landing/<page>/                     # own theme: html + css + js per page
│   ├── checkout/<family>/                  # per-offer layout (not tracking)
│   └── website/<page>/                     # website page bodies
├── components/                             # reusable fragments
└── _retired/                               # retired surfaces
```

---

## Site-wide essentials (summary)

| Concern | File | Kajabi field |
|---|---|---|
| Site + landing GTM / Stape / schema / currency | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Settings → Site Details → Header Page Scripts |
| Website shared CSS | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Theme Custom Code → CSS |
| Website home helpers JS | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Theme Custom Code → JS |
| Checkout GTM / Stape | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Settings → Checkout → Header |
| Checkout purchase tracking | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) | Settings → Checkout → Footer |

[`snooze-unified-theme.css`](./global/css/snooze-unified-theme.css) and [`snooze-globals.js`](./global/js/snooze-globals.js) are **not** current paste sources. See [`PASTE-MAP.md`](./PASTE-MAP.md) §C.

---

## Checkout tracking verdict (2026-07-27)

- Live Settings → Checkout **Header** already holds the GTM/Stape loader. Repo file [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) matches that payload. **Do not re-paste the header just to sync.**
- Live **Footer** is empty. Paste [`kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) only when you deliberately want that live.
- Advanced Matching: inline [`meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) into the header file in git first, then whole-field overwrite once. Never append a second file at paste time.

Details: [`global/checkout-tracking/README.md`](./global/checkout-tracking/README.md).

---

## Rules that keep pastes safe

1. One repo file per Kajabi field. Never compose a field from two files at paste time.
2. Pull live before inventing per-page css/js.
3. `node --check` every `.js` paste file before pasting.
4. Never accept a greyed-out Save as proof: curl public pages; use a real browser for checkouts (curl is 403).
5. Dual-currency checkouts: paste both twins or neither.

WS-001 owns closing remaining drift: [`docs/projects/website-surfaces/00-overview.md`](../../docs/projects/website-surfaces/00-overview.md).
