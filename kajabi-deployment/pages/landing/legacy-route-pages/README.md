# Legacy route pages

Kajabi does not provide native server-side redirects. These small landing pages preserve legacy paths on the Kajabi-managed domain and move visitors to the current canonical page with `window.location.replace`.

| Kajabi page | Slug | Destination |
|---|---|---|
| Privacy route | `privacy` | `https://www.joinsnooze.com/privacy-policy` |
| Snooze route | `snooze` | `https://www.joinsnooze.com/snooze-membership` |
| About route (proposed, not live) | `about` | `https://www.joinsnooze.com/about-sally` |

Paste each file into a landing page Custom Code block. Publish only after confirming the destination returns HTTP 200.

`about.html` is a proposed SAR-001 recovery source. Its member-facing text and
exact Kajabi page mutation require separate approval before publication.
