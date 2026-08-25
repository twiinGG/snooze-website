# camp-confirm-page.html - notes

Comments extracted from `camp-confirm-page.html`. That file is pasted into Kajabi and ships to
every visitor, so the reasoning lives here instead. Each note names the line it sat above and the
code that followed it, so a note whose anchor no longer exists is a note to re-check.

Regenerate with `node scripts/kajabi/extract-comments.mjs apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-confirm/camp-confirm-page.html`.

---

## Line 24

```
<!--
```

THE CONFIRM WIDGET.

      Every state below is present in the HTML and hidden by `hidden`. The
      JavaScript reveals exactly one at a time. The no-JavaScript case therefore
      shows `sn-cc-confirm-noscript`, which tells the buyer to reply to their
      confirmation email, rather than showing an inert button or nothing at all.

      Do not remove a state block because it looks unused. Each one is reachable.

## Line 62

```
<!--
```

No Kajabi session, so no contact id, so nothing to confirm against.

            Asking for an email here would be worse than useless: Kajabi's REST
            API cannot resolve an email to a contact (`filter[email]` is
            silently ignored, tested 2026-08-21), so a typed address would book
            a seat that never receives its access. Sending them to sign in is
            the only honest move. See camp-confirm-page.js `resolveIdentity`.

## Line 111

```
<!--
```

WELCOME VIDEO. Placeholder slot, deliberately.

      Kade deferred who records this, Sally or Bec or both. Until that lands the
      section is hidden with `hidden` on the <section>, so the page reads as
      finished rather than broken.

      TO GO LIVE: upload the video to the Kajabi media library, put its embed in
      place of the comment inside `sn-cc-video-frame`, and delete the `hidden`
      attribute on the section. Nothing else changes.

## Line 129

```
<!-- WELCOME VIDEO EMBED GOES HERE -->
```

WELCOME VIDEO EMBED GOES HERE
