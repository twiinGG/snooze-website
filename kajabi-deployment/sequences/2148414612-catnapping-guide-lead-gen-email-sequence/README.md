# Catnapping Guide Lead Gen Email Sequence

- Kajabi sequence ID: 2148414612
- Pulled at: 2026-08-08
- Source: kajabi-admin-browser, rendered `theme_preview` per email

Defects D1 to D9 from [`PROPOSED-EDITS.md`](./PROPOSED-EDITS.md) are closed. The twins below are snapshots of what is live, not drafts.

**Each email body is its own Kajabi theme**, edited through `PUT /admin/themes/<id>/settings`. Subject, preview text, day and send time live on the Rails form at the editor URL. See the session 4 entry in `docs/projects/catnapping-guide/4_working-cng002/RUN-LOG.md` for the write mechanism and its traps.

## Emails

- Position 1 | Email ID 2149832304 | body theme 2158332626
  - Subject: Your catnapping guide, plus one thing to try today
  - Send: immediately on subscribe
  - Twin file: `1-2149832304.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2149832304/edit
  - Pasted live: 2026-08-08. Closes D1 (button now serves the R2 guide URL, not the member library) and D3 (the "using" typo)
- Position 2 | Email ID 2149832305 | body theme 2158332627
  - Subject: Baby still stuck with 30-minute naps? (unchanged, it was the strongest in the sequence)
  - Send: day 2 at 11:00 Melbourne
  - Twin file: `2-2149832305.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2149832305/edit
  - Pasted live: 2026-08-08. Closes D4, D5 and D6. CTA is the adjudicated 7 day trial, not the drafted `z63s9VaR` membership button
- Position 3 | Email ID 2149832306 | body theme 2158332628
  - Subject: Alice's baby went from 3 to 5 wake-ups to 90 minute naps
  - Send: day 6 at 11:00 Melbourne, moved from day 3 at 09:00
  - Twin file: `3-2149832306.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/2149832306/edit
  - Pasted live: 2026-08-08. Closes D2, D5, D7 and D8. The three-offer menu and the social block are dropped from `content_for_index` rather than deleted, so they remain recoverable

## Reversal

Pre-change settings for all three body themes are backed up at `docs/projects/catnapping-guide/4_working-cng002/backups/`. Restoring one is a `PUT` of that file's `settings` object with the current `updated_at` token.
