# Currency Toggle UX Spec (v2)

> Status: locked spec, not yet implemented. Supersedes the single-button toggle currently live (see `NEXT-SESSION-KICKOFF.md` item 2). Implementer: any coding agent working only from this file plus the two source files it names; no other context required.
>
> Related: [PER-PAGE-EXECUTION-SPEC.md](./PER-PAGE-EXECUTION-SPEC.md) (deploy protocol), [Currency-Toggle-Technical-Brief.md](./Currency-Toggle-Technical-Brief.md) (engine architecture), [../seo/SEO-AEO-ARCHITECTURE.md](../seo/SEO-AEO-ARCHITECTURE.md) (why static-DOM prices matter for this control).

## 1. Why this exists

The live toggle is a single button that shows the *current* currency (e.g. "🇦🇺 AUD"). It reads as a status label, not a control — a first-time visitor cannot tell it's clickable or what clicking does. This spec replaces it with a two-segment switch where both options are always visible.

## 2. The control: `sn-currency-switch`

One component, used everywhere a toggle mounts (nav, inline, sticky). Replaces `.currency-toggle-btn`.

### 2.1 Anatomy

```
[ USD | AUD ]   <- segmented control, both options always visible, active segment filled
```

- Two equal-width segments. `min-width` fixed per variant (see §4) so the control never resizes on click — no layout shift.
- Active segment: filled with brand ink (navy) on cream background, `aria-pressed="true"`. Inactive segment: transparent background, muted text.
- No flags in the compact/nav variant. The inline pricing variant MAY carry a small "Prices in" eyebrow-microcopy to its left (`Prices in  [USD | AUD]`) — this is the discoverability affordance, without making the control read as a section header.
- Deliberately quiet. It must read as a utility, not a CTA. Never use `--sn-coral` as a resting-state color; coral is reserved for primary CTAs elsewhere on the page.

### 2.2 Sizing

| Variant | Height (desktop) | Height (mobile) | Touch target |
|---|---|---|---|
| nav / compact | 32px | 40px | padded to >=44px tap area even though the visible pill is smaller |
| inline (pricing section) | 36px | 40px | >=44px |
| sticky | 32px | 36px | >=44px |

Pill radius: `var(--radius-full)` (9999px) on the outer track. Each segment button has no independent radius (square edges meeting inside the pill, full radius only where they meet the outer track corners).

### 2.3 States (all four required, no disabled/loading state needed — the switch is instant)

| State | Visual |
|---|---|
| default (inactive segment) | `background: transparent`, `color: var(--sn-text-light, #94A3B8)` |
| default (active segment) | `background: var(--sn-navy, #1F293B)`, `color: var(--sn-cream, #FAF7F4)` |
| hover (inactive segment only) | `background: var(--sn-cream, #FAF7F4)` tint at ~40% opacity — do not change the active segment on hover |
| `:focus-visible` | 2px ring, `outline: 2px solid var(--sn-coral, #F43357)`, `outline-offset: 2px`, contrast ratio >=3:1 against the pill background |
| `:active` (press) | `transform: scale(0.98)` on the pressed segment only |

Outer track border: `1px solid var(--sn-text-light, #94A3B8)` at reduced opacity (`rgba(148, 163, 184, 0.35)` — muted, matches "quiet utility" intent).

### 2.4 CSS tokens (use existing custom properties from `snooze-unified-theme.css`; do not hardcode new colors)

```css
--sn-switch-height-desktop: 32px;
--sn-switch-height-mobile: 40px;
--sn-switch-radius: var(--radius-full);      /* 9999px, existing token */
--sn-switch-border: rgba(148, 163, 184, 0.35); /* derived from --sn-text-light #94A3B8 */
--sn-switch-active-bg: var(--sn-navy, #1F293B);
--sn-switch-active-fg: var(--sn-cream, #FAF7F4);
--sn-switch-inactive-fg: var(--sn-text-light, #94A3B8);
--sn-switch-hover-bg: var(--sn-cream, #FAF7F4);
--sn-switch-focus-ring: var(--sn-coral, #F43357);
```

These map onto the same variable names already defined at `:root` in `apps/snooze-website/kajabi-deployment/global/css/snooze-unified-theme.css` (lines ~9-15). Do not introduce a second color system.

### 2.5 Semantics (accessibility)

- Outer container: `role="radiogroup"`, `aria-label="Price currency"`.
- Each segment: `<button type="button" role="radio" aria-checked="true|false">`. (Note: the current implementation uses `aria-pressed` on a single toggle button — v2 moves to `role="radio"` + `aria-checked` per segment because there are now two focusable-or-arrow-navigable elements representing one choice, which is the correct ARIA pattern for a segmented control, not a toggle button.)
- Roving `tabindex`: only the active segment has `tabindex="0"`; the inactive segment has `tabindex="-1"`. Arrow keys (Left/Right) move focus AND selection between segments (standard radiogroup behavior). `Enter`/`Space` on a focused segment also selects it.
- Visible `:focus-visible` ring on whichever segment currently has focus.

### 2.6 Price-transition behavior (CLS guardrail)

- `.dynamic-price` gets a 150ms opacity fade on value change (`transition: opacity 0.15s ease`), not a hard swap.
- `.dynamic-price` uses `font-variant-numeric: tabular-nums` so digit width is monospaced within the price string.
- Price spans get a reserved `min-width` sized to the longer of the USD/AUD rendered string (e.g. `A$997` is longer than `$657`) so the digit-count change between currencies doesn't shift surrounding layout. Compute this per price-card at build time (repo-side), not at runtime.
- Target: CLS < 0.1 on any page carrying the switch, per §3.4 of `../seo/SEO-AEO-ARCHITECTURE.md`.

## 3. Engine changes required (`currency-toggle.js` + `currency-toggle.css`)

File: `apps/snooze-website/kajabi-deployment/global/js/currency-toggle.js`. One global deploy — this file is spliced into Header Page Scripts (see `PER-PAGE-EXECUTION-SPEC.md` §"known write-path facts").

| Function (existing, line ref in current file) | Change |
|---|---|
| `createToggleButton(className)` (line 333) | Rewrite to render the two-segment markup: an outer `<div class="currency-toggle-btn {className}" role="radiogroup" aria-label="Price currency">` wrapping two `<button role="radio">` segments (`USD`, `AUD`). Remove the flag-emoji + single-label `innerHTML` approach. Keep the `className` parameter (still used for `nav-currency-toggle` / `mobile-currency-toggle` / `inline-currency-toggle` / `sticky-currency-toggle` variant targeting via CSS). |
| `updateToggleUI(currency)` (line 351) | Change from writing `t.innerHTML = flag + label` to: toggle `aria-checked` on the two segment buttons, toggle an `.is-active` class for the CSS active-fill state, update roving `tabindex` (active segment `tabindex="0"`, inactive `tabindex="-1"`). Must NOT change text content or element width — no CLS from label swaps. |
| Click handler (currently inline in `createToggleButton`, line 338) | Move to per-segment click handlers: clicking the USD segment calls `setCurrency('USD', true)` unconditionally (not a toggle-from-current), same for AUD. This is more robust than the current toggle-relative-to-current-state logic and matches a radiogroup's semantics (you select a value, you don't flip a switch). |
| Keyboard handling | New: add a `keydown` listener on the radiogroup container for `ArrowLeft`/`ArrowRight` to move focus + selection between the two segments (roving tabindex pattern). |
| `injectToggles()` (line 251) | **No change to mount logic.** Still auto-mounts into `.navbar .sn-actions` / mobile menu / any `.sn-currency-inline` / `.sn-currency-sticky` element, idempotently. This is the placeholder-driven rollout mechanism (§5 below) — do not touch. |
| `setCurrency`, `updateLinks`, `updatePrices`, `rewriteCheckoutUrl`, `handleCheckoutPage`, `initCurrency`, the round-trip fix in `updateLinks` (line 224, comparing `newLink !== btn.getAttribute('href')`), `localStorage` persistence, `Intl` timezone AU-default, GTM `currency_change` dataLayer push | **Keep fully intact.** None of this changes. The v2 work is scoped to the visual/semantic layer of the control (`createToggleButton` + `updateToggleUI` + new keyboard handler) and to `updatePrices`'s presentation (adding the tabular-nums / fade transition hooks via CSS, not JS logic changes). |

### 3.1 CSS changes (`apps/snooze-website/kajabi-deployment/global/css/currency-toggle.css`)

Replace the `.currency-toggle-btn` ruleset (current file lines 13-73, including the `body.currency-mode-aud .currency-toggle-btn` blue-tint override at lines 51-59 and the `[aria-pressed="true"]` rule at 117-121 — these are all superseded by the segmented-control styling and should be removed, not layered on top of) with:

- `.currency-toggle-btn` (outer track): flex container, fixed `min-width` per variant, border per §2.3, radius per §2.2.
- `.currency-toggle-btn button[role="radio"]`: flex: 1 1 50%, no independent border, padding per §2.2 height table.
- `.currency-toggle-btn button[aria-checked="true"]`: active fill per §2.3.
- `.currency-toggle-btn button:hover:not([aria-checked="true"])`: hover tint per §2.3.
- `.currency-toggle-btn button:focus-visible`: focus ring per §2.3.
- Keep the existing `.sn-currency-inline`, `.inline-currency-toggle`, `.sticky-currency-toggle`, `.sn-currency-sticky-bar` layout rules (lines 135-169) — these govern placement/mount styling, not the button's internal anatomy, and don't need to change.
- Remove `.currency-flag` (no longer used — no flags in v2).
- Add `.dynamic-price { font-variant-numeric: tabular-nums; transition: opacity 0.15s ease; }` (extends the existing `.dynamic-price` rule at line 109, don't duplicate the selector).

### 3.2 Camp Snooze note

Camp Snooze runs its own standalone currency script (not the global engine) and its own `.currency-toggle-btn` visual inheritance. Per plan §2.3: align Camp's price *display format* (`A$` prefix instead of `$885 AUD` suffix) and have it adopt the v2 switch component's CSS classes, but do NOT merge Camp's engine logic into the global `currency-toggle.js` in this pass. File: `apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-v2-luxury.js` and its `CURRENCY-TOGGLE.md`.

## 4. Placement system

| Surface | Mount | Rule |
|---|---|---|
| Global nav (`.sn-actions`) + mobile menu | compact variant | Far edge of the utility area. Never compete visually with the "Join Snooze" CTA button — smaller, quieter, positioned after it in reading order. |
| Any pricing section | inline variant | Top-right of the pricing grid, on the same row as (or directly under) the section heading. Adjacent to the numbers it controls. Never rendered AS the heading. |
| Long sales pages (Camp pattern) | sticky variant | Inside the existing sticky CTA bar, compact variant, positioned to the left of the primary CTA button. |
| Checkout pages | none — no switch component | Static "Switch to USD / AUD pricing" text link (existing pattern in `handleCheckoutPage()`, line 366 of `currency-toggle.js`). Per-offer server-rendered price; the segmented control does not belong on a page that only ever shows one offer's price. |

Rationale: a currency toggle is an above-the-fold utility co-located with the price it changes, same slot logic as a monthly/annual pricing toggle, but subordinate — the section header sells the membership, the toggle just sets units.

### 4.1 Rollout mechanic (repeat from `NEXT-SESSION-KICKOFF.md` — this is the whole reason placeholder-driven design was chosen)

`injectToggles()` already auto-mounts a toggle into any `.sn-currency-inline` / `.sn-currency-sticky` element site-wide, idempotently, with zero per-page JS. The v1 engine is built; the gap is that **zero live page files currently carry those placeholder divs**. Per-page toggle rollout during the page wave (`PER-PAGE-EXECUTION-SPEC.md`) is therefore: paste the updated page HTML containing one placeholder div per pricing section (`<div class="sn-currency-inline"></div>` or `<div class="sn-currency-sticky sn-currency-sticky-bar"></div>`). No JS work per page — the global engine finds and mounts into any placeholder present in the DOM.

## 5. Pricing-section presentation standard

Applies during the page wave (Phase 3 of the execution plan), not to the toggle component itself, but it's the context the toggle mounts into.

- **3 tiers, quarterly highlighted as "Most popular"** (Good-Better-Best; middle = decoy-resolved default).
- Annual carries the per-day reframe ("under A$3/day") and absolute savings ("save $291/yr" — Rule of 100: absolute dollars for totals over $100).
- **Every price on a page either switches or is explicitly currency-neutralized.** No `"$X USD"` hardcodes. Value-comparison tables get `data-usd`/`data-aud` on every cell; the column header becomes currency-aware (`"VALUE"` + dynamic currency note, not a static `"VALUE (USD)"`). A table where only some numbers switch is worse than no toggle at all.
- CTA copy: value-specific ("Start My Membership" / "Join Snooze"), never generic "Sign Up".
- Guarantee / risk-reversal copy and one testimonial adjacent to the tier cards (trust signals near CTAs).
- No new benefit claims invented anywhere — copy comes only from the approved compliance set (see the Sally sign-off pack referenced in `PER-PAGE-EXECUTION-SPEC.md`).
- **One price format everywhere: `$79` / `A$119`** (the global engine's existing convention, from `updatePrices()`: `const symbol = currency === 'AUD' ? 'A$' : '$'`). Camp Snooze currently renders `$885 AUD` — align its *display* to this format (CSS/copy only; see §3.2, do not touch its engine).

## 6. Test suite (must be updated alongside the JS change)

File: `apps/snooze-website/kajabi-deployment/global/js/__tests__/currency-toggle.test.js` (317 lines, loads `currency-toggle.js` into a `vm` sandbox and runs assertions by `name:` string, e.g. `'Snooze Access monthly USD to AUD (variant 68112)'`, `'Camp Snooze USD to AUD (offer-id swap, no variant)'`, round-trip tests). A sibling file, `currency-display-simulation.test.js`, also exists in the same `__tests__/` directory.

What must change:
- Every existing `name:`-keyed test in `currency-toggle.test.js` exercises `rewriteCheckoutUrl` / `setCurrency` / `updateLinks` logic — **none of this logic changes in v2**, so these tests should continue to pass unmodified. Do not touch them without cause.
- **New tests required** for `createToggleButton` and `updateToggleUI`: assert the rendered markup contains two `role="radio"` buttons with correct `aria-checked` state after `setCurrency('AUD', false)` / `setCurrency('USD', false)`; assert roving `tabindex` (`0` on active, `-1` on inactive); assert clicking a segment calls `setCurrency` with that segment's currency regardless of prior state (not a toggle-relative call).
- **New DOM round-trip regression test** (pattern already established in the suite for the `updateLinks` href round-trip bug fixed 2026-07-01): mount an inline toggle, click AUD, click USD, assert the DOM ends in the same state it started (no stranded `aria-checked`, no stale segment focus).
- Run `node --check` on the JS file before committing (the IDE's JSX-parser warnings on this file are false positives — it's an HTML fragment starting with `<script>`, not a JS module).
- Target: suite fully green (currently 21/21 pre-v2; v2 adds tests, must not reduce the pass count of existing ones).

## 7. What does NOT change

- Engine mount points (`injectToggles`), currency persistence (`localStorage`), AU-timezone default, GTM event push, checkout-page URL rewriting, `offerMapping`/`variantMapping` config structure. All of that is orthogonal to the visual/semantic redesign in this spec and stays as-is.
- This spec does not create AUD twin offers or wire new `offerMapping` entries — that's a separate workstream (tier-2 AUD twins, plan §1e).
