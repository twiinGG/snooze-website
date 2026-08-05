# Proposal only, do not paste as a second Organization graph

**Existing source of truth:** `schema-organization.html`  
**Person source of truth:** `schema-person-sally.html`  
**@id contracts (do not break):**

- Organization: `https://www.joinsnooze.com/#organization`
- Person: `https://www.joinsnooze.com/author/sally-woods#person`
- WebSite: `https://www.joinsnooze.com/#website`

## Optional sameAs additions (edit `schema-organization.html` in a future PR)

Current `sameAs` in org schema: Instagram, Facebook, TikTok.

Consider adding when you next touch the global org block:

- `https://www.youtube.com/@TheSleepConcierge`
- `https://open.spotify.com/show/1LRXenhiADr7YzoGNbRwP2` (Nap Trapped)

## Optional naming tweak (optional, separate decision)

Live org `name` is `"Snooze"` with `alternateName` `"The Sleep Concierge"`.  
Marketing often says **Snooze by The Sleep Concierge**. If you change `name` / `alternateName`, update this file's note and re-validate Rich Results after re-paste.

## Do not

- Paste a second Organization JSON-LD that redefines `#organization`
- Change Person `@id` (BlogPosting and founder references depend on it)
