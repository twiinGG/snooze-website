# Email Template Standard

**Purpose:** Standard format for all email templates in offer and campaign sequences  
**Status:** Active Standard

---

## Required Email Template Header Format

All email template files must include the following header information in HTML comments:

```html
<!-- 
    ============================================
    [EMAIL NAME] - [OFFER/CAMPAIGN NAME]
    ============================================
    PURPOSE: [Brief description of email purpose]
    TRIGGER: [How email is triggered - automation, campaign, etc.]
    DELAY: [Timing relative to previous email or trigger]
    CONDITION: [Any conditions/exclusions - optional]
    STATUS: Ready for Kajabi
    
    EMAIL DETAILS:
    Subject Line: [Exact subject line text]
    Preview Text: [Preview text for email clients]
    
    AUTOMATION SETUP: [If applicable - automation details]
    ============================================
-->
```

---

## Standard Fields

### Required Fields

1. **PURPOSE:** Clear description of what the email does
2. **TRIGGER:** How the email is triggered (automation, campaign subscription, tag, etc.)
3. **DELAY:** Timing information (immediate, X days after trigger, etc.)
4. **STATUS:** Current status (Ready for Kajabi, Draft, etc.)
5. **Subject Line:** Exact subject line text (under 50 characters recommended)
6. **Preview Text:** Preview text for email clients (under 100 characters recommended)

### Optional Fields

- **CONDITION:** Any exclusion rules or conditions
- **AUTOMATION SETUP:** Details about automation configuration if applicable

---

## Email Campaign vs Automation Approach

### For Trial/Free Access Offers

**Recommended Approach:** Use automation to send welcome email + subscribe to email campaign sequence

**Automation Setup:**
- **Trigger:** Offer purchased/granted
- **Actions:**
  1. Add tag (e.g., `snooze-trial`)
  2. Send Post-Purchase email (welcome email)
  3. Subscribe to email campaign sequence

**Email Campaign Setup:**
- Create campaign with all follow-up emails
- Set delays between emails
- Configure exclusion rules (e.g., exclude if upgraded)

### Benefits

- Cleaner automation setup
- Easier to manage email sequence
- Better tracking and reporting
- Simpler to pause/resume sequence

---

## Examples

### Example 1: Welcome Email (Automation)

```html
<!-- 
    ============================================
    WELCOME EMAIL - 7-DAY TRIAL
    ============================================
    PURPOSE: Welcome email sent immediately after trial signup
    TRIGGER: Purchase of 7-Day Trial offer
    SEND: Immediately after signup (automated)
    STATUS: Ready for Kajabi
    
    EMAIL DETAILS:
    Subject Line: Your 7-day trial starts now! ✨
    Preview Text: Get full access to everything Snooze has to offer for 7 days.
    
    AUTOMATION SETUP:
    When offer is purchased:
    - Tag: 'snooze-trial'
    - Send: Post-Purchase email (this email)
    - Subscribe: Email campaign sequence
    ============================================
-->
```

### Example 2: Follow-Up Email (Campaign)

```html
<!-- 
    ============================================
    DAY 7 CHECK-IN EMAIL - 1-MONTH FREE ACCESS
    ============================================
    PURPOSE: Check-in email sent 7 days after access is granted
    TRIGGER: Email campaign sequence (subscribed when offer granted)
    DELAY: 7 days after welcome email
    STATUS: Ready for Kajabi
    
    EMAIL DETAILS:
    Subject Line: How's your free month going?
    Preview Text: You're a week into your free month - here are some places to start.
    ============================================
-->
```

---

## Subject Line Guidelines

- **Length:** Keep under 50 characters when possible
- **Tone:** Match brand voice (warm, supportive, clear)
- **Emojis:** Use sparingly (1-2 max, only if appropriate)
- **Urgency:** Use only when genuine (e.g., "ends in 3 days")
- **Clarity:** Be clear about what the email contains

---

## Preview Text Guidelines

- **Length:** Keep under 100 characters
- **Purpose:** Expand on subject line, provide context
- **Value:** Give reason to open (benefit, urgency, curiosity)
- **Tone:** Match subject line tone

---

## File Naming Convention

Email files should be named descriptively:
- `welcome-email.html`
- `day-7-checkin-email.html`
- `day-14-checkin-email.html`
- `trial-ended-followup-email.html`

---

## Implementation Checklist

When creating email templates:

- [ ] Include complete header with all required fields
- [ ] Add subject line and preview text
- [ ] Document trigger mechanism
- [ ] Note any conditions/exclusions
- [ ] Include automation setup details if applicable
- [ ] Test subject line length (under 50 chars)
- [ ] Test preview text length (under 100 chars)

---

**Last Updated:** January 2026  
**Status:** Active Standard
