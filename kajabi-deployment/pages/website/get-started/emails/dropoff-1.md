---
id: dropoff-1
sequence: "Get started - plan sent, not joined"
send_timing: "~1 hour after get-started-plan-sent tag"
subject: "Your plan is saved, {{ first_name }}"
preview_text: "It's exactly where you left it."
sender_name: "Sally, The Sleep Concierge"
sources: ["#64"]
---

Hi {{ first_name }},

Your plan is saved. It's exactly where you left it, whenever you want another look.

**[Go back to your plan](https://www.joinsnooze.com/get-started?r={{ contact.custom_fields.resume_token }})**

One thing worth holding onto while it's fresh: 75% of sleep training is the work in the day. Get the daytime right — the timing, the routine — and it makes bedtime and the night so much easier. That's why I pointed you to {{ contact.custom_fields.start_here_title }} first.

If any of it doesn't make sense, or you just want a hand working out where to start, let me know. I'm happy to walk you through it.

**What happens next**

1. Tap the link above and you're straight back into your plan.
2. Have a read through {{ contact.custom_fields.start_here_title }} — it's already picked for your little one.
3. Reply to this email any time and I'll point you in the right direction.

Talk soon,

Sally
