# checkout-identity-capture.js - notes

Comments extracted from `checkout-identity-capture.js`. That file is pasted into Kajabi and ships to
every visitor, so the reasoning lives here instead. Each note names the line it sat above and the
code that followed it, so a note whose anchor no longer exists is a note to re-check.

This file ACCUMULATES. Each extraction appends a dated batch below and never rewrites what is
already here, because once the source is stripped this file is the only copy of that reasoning.
Line anchors are only meaningful within their own batch: an earlier batch was written against an
earlier version of the source and its line numbers have since drifted.

---

## Extracted 2026-10-01

### Line 1

```
(function () {
```

*
 * NOT A PASTE TARGET.
 * Fragment only. Inlined into global/html/checkout-header-tracking.html as the third
 * script block, which is the one file that goes into Kajabi Settings, Checkout,
 * Checkout Tracking Code, Header field.
 *
 * This header claimed the inlining had happened from the day the file was written.
 * It had not: the HTML held the loader, Meta Advanced Matching and the UTM capture,
 * and no identity block at all. Inlined for real on 2026-08-16. Keep this file and
 * that block byte-identical from the IIFE onwards.
 * See global/checkout-tracking/README.md and CODE-SURFACE-CONTRACT.md.
 *
 * WHAT THIS IS FOR
 *
 * Purchase conversions are dispatched server-side from the Kajabi payment.succeeded
 * webhook, because no browser surface can do it: the checkout tracking fields do not
 * inject on the confirmation page and window.Kajabi.order is null there. The webhook
 * carries authoritative order data but no browser identity, so a purchase sent from it
 * lands in GA4 with no session to attach to and reports as direct traffic.
 *
 * This block closes that gap. The checkout page IS a surface where this field injects,
 * and the buyer types their email here. So it captures the GA4 client id, the Meta
 * browser cookies and the stored attribution, keys them by the SHA-256 of the email,
 * and posts them to n8n. The order workflow joins on sha256(member.email) at payment
 * time and the purchase keeps its acquisition channel.
 *
 * PRIVACY
 * The email is hashed in the browser and the plain address never leaves the page. No
 * name, phone, address or baby details are read or sent.

### Line 53

```
function gaClientId() {
```

* "GA1.1.1234567890.1699999999" becomes "1234567890.1699999999".

### Line 62

```
function gaSessionId() {
```

*
   * The session id lives in _ga_<STREAM>. The container routes through the Stape
   * server container with a placeholder measurement id, so the suffix cannot be
   * assumed. Scan for any _ga_ cookie and take the session id segment.
   *
   * The cookie's third dot-separated segment is NOT the session id on its own. The
   * live value measured 2026-08-17 is
   * `_ga_J4TY43FW1G=GS2.1.s1786946916$o1$g1$t1786946942$j34$l0$h1685109018`, so
   * splitting on '.' yields `s1786946916$o1$g1$...` and returning it whole sent GA4
   * a session_id it cannot stitch. Caught on a live order in ME-010: the join
   * succeeded, the client id was right, and the session id was unusable. The digits
   * after the optional leading 's' and before the first '$' are the session id. The
   * regex also handles the older format where the segment is a bare number.

### Line 109

```
function storedAttribution() {
```

Three stores, because two different blocks write attribution under two

### Line 110

```
function storedAttribution() {
```

different names and this one originally read only the first. The checkout

### Line 111

```
function storedAttribution() {
```

header block writes snooze_utm_attribution; the site header scripts write

### Line 112

```
function storedAttribution() {
```

snooze_attribution_first_touch and snooze_attribution_current_touch. A

### Line 113

```
function storedAttribution() {
```

visitor who arrives on an ad, browses, and types their email on a later page

### Line 114

```
function storedAttribution() {
```

has no UTM in the URL, so reading the wrong key loses the channel that paid

### Line 115

```
function storedAttribution() {
```

for them. Measured 2026-08-16: the site store held the campaign and this

### Line 116

```
function storedAttribution() {
```

function returned nothing.

### Line 117

```
function storedAttribution() {
```



### Line 118

```
function storedAttribution() {
```

First touch wins, because that is the click that earned the customer. Fields

### Line 119

```
function storedAttribution() {
```

are merged rather than the whole object taken, so a partial store still

### Line 120

```
function storedAttribution() {
```

contributes what it has.

### Line 163

```
function currentEmail() {
```

*
   * Read the buyer's email from the checkout form. The localStorage 'email' key that
   * GTM tag 86 writes is checked as a fallback, because on some checkout templates the
   * scraper reaches the value before a stable selector does.

### Line 220

```
try {
```

No client_ip_address here. n8n reads the source address from the request itself,

### Line 221

```
try {
```

which is the only trustworthy version of it.

### Line 260

```
window.setTimeout(tick, POLL_MS);
```

Runs on every page, because the buyer's email is not readable where the order

### Line 261

```
window.setTimeout(tick, POLL_MS);
```

is. Kajabi's hosted checkout collects it inside a Stripe iframe, which is

### Line 262

```
window.setTimeout(tick, POLL_MS);
```

cross-origin: measured 2026-08-16 on two live checkouts, currentEmail() null

### Line 263

```
window.setTimeout(tick, POLL_MS);
```

on both, zero rows captured and zero workflow executions. The email IS

### Line 264

```
window.setTimeout(tick, POLL_MS);
```

readable in the lead forms on the website and landing pages, so that is where

### Line 265

```
window.setTimeout(tick, POLL_MS);
```

this has to run. The order webhook joins on the hash whenever it was captured.

### Line 266

```
window.setTimeout(tick, POLL_MS);
```



### Line 267

```
window.setTimeout(tick, POLL_MS);
```

The earlier guard started the poll only on a /checkout path, which is why the

### Line 268

```
window.setTimeout(tick, POLL_MS);
```

block was live and inert. The cost of dropping it is 120 querySelector calls

### Line 269

```
window.setTimeout(tick, POLL_MS);
```

spread over two minutes, once per page, and then it stops.
