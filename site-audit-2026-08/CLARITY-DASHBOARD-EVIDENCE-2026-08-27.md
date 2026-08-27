# Microsoft Clarity dashboard evidence

**Captured:** August 27, 2026  
**Project:** Snooze  
**Source:** [Snooze Clarity dashboard, last 30 days](https://clarity.microsoft.com/projects/view/u15ffg8j35/dashboard?date=Last%2030%20days)  
**Access:** Authenticated Google session supplied by the user  
**Evidence type:** Aggregate dashboard metrics. No individual recording or visitor profile was opened.

## Coverage

| Metric | Value |
|---|---:|
| Human sessions | 4,944 |
| Bot sessions excluded | 1,132 |
| Unique users | 2,663 |
| New-user sessions | 3,183, 64.38% |
| Returning-user sessions | 1,761, 35.62% |
| Pages per session | 2.14 |
| Average scroll depth | 63.48% |
| Average active time | 1.3 minutes |
| Average total time | 2.9 minutes |

## Behaviour signals

| Signal | Sessions | Share of sessions |
|---|---:|---:|
| Rage clicks | 3 | 0.06% |
| Dead clicks | 577 | 11.67% |
| Excessive scrolling | 0 | 0% |
| Quick backs | 881 | 17.82% |
| Sessions with JavaScript errors | Not displayed as a count | 6.61% |

Clarity reported 413 JavaScript errors. The leading error was `document.querySelector("#form_submission_email").value` returning null, at 49.15% of errors. A second null-value error represented 22.28%. Generic script errors represented 15.25%.

## Smart events

| Event | Sessions | Approximate share of all sessions |
|---|---:|---:|
| Submit form | 608 | 12.30% |
| Checkout | 365 | 7.38% |
| Outbound click | 124 | 2.51% |
| Order success | 118 | 2.39% |
| Login | 105 | 2.12% |
| Download | 77 | 1.56% |
| Purchase | 57 | 1.15% |
| Sign up | 55 | 1.11% |
| Begin checkout | 27 | 0.55% |
| Contact us | 14 | 0.28% |
| Play | 10 | 0.20% |
| Search | 8 | 0.16% |
| Show more | 7 | 0.14% |
| Book | 6 | 0.12% |
| See reviews | 6 | 0.12% |
| Subscribe | 4 | 0.08% |

The separate Purchases card reported purchases in 2.39% of sessions. This does not match the 57-session Purchase smart event. The audit must treat those as different Clarity definitions until event implementation is reconciled.

No Clarity funnels are configured.

## Leading referrers

| Referrer | Sessions |
|---|---:|
| www.joinsnooze.com | 2,980 |
| app.kajabi.com | 424 |
| www.google.com | 417 |
| joinsnooze.mykajabi.com | 318 |
| l.instagram.com | 199 |
| instagram.com | 57 |
| accounts.google.com | 28 |
| Android Gmail | 19 |
| facebook.com | 10 |
| Gmail web | 6 |
| www.tiktok.com | 6 |

Self-referrals and Kajabi admin or platform referrals dominate the list. This is an observed attribution-quality issue, not evidence that those sources acquired the users.

## Browser mix

| Browser | Sessions | Share |
|---|---:|---:|
| Mobile Safari | 2,118 | 42.84% |
| Chrome | 1,245 | 25.18% |
| Instagram app | 714 | 14.44% |
| Chrome Mobile | 631 | 12.76% |
| Other | 236 | 4.77% |

Mobile Safari, Instagram app and Chrome Mobile account for 70.04% of sessions before any mobile traffic inside the remaining browser categories.

## Performance

| Metric | Value | Clarity rating |
|---|---:|---|
| Performance score | 86/100 | Aggregate |
| Largest Contentful Paint | 2.6 seconds | Needs improvement |
| Interaction to Next Paint | 180 milliseconds | Good |
| Cumulative Layout Shift | 0.031 | Good |

The performance sample covered 245 pageviews. Clarity classified 80.4% as good, 18.0% as needing improvement and 1.6% as poor. The sample is much smaller than total traffic, so page-level conclusions need corroboration.

## Top pages

| Page | Sessions |
|---|---:|
| [Homepage](https://www.joinsnooze.com/) | 500 |
| [Login](https://www.joinsnooze.com/login) | 478 |
| [Library](https://www.joinsnooze.com/library) | 464 |
| [Camp Snooze](https://www.joinsnooze.com/camp-snooze-sleep-coaching) | 361 |
| [5 to 12 month sleep help](https://www.joinsnooze.com/5-12-month-baby-sleep-help) | 341 |
| [5 to 12 month sleep training course](https://www.joinsnooze.com/products/5-12-month-sleep-training-course) | 202 |
| [Snooze Membership](https://www.joinsnooze.com/snooze-membership) | 156 |
| [Toddler sleep help](https://www.joinsnooze.com/toddler-sleep-help) | 133 |
| [One-to-one sleep consultations](https://www.joinsnooze.com/one-on-one-sleep-consultations) | 130 |
| [Kajabi product 2149308933](https://www.joinsnooze.com/products/2149308933) | 126 |
| [Free module lesson 2194021925](https://www.joinsnooze.com/products/5-12-month-sleep-schedules-free-module/categories/2159217988/posts/2194021925) | 117 |
| [Free module lesson 2194021926](https://www.joinsnooze.com/products/5-12-month-sleep-schedules-free-module/categories/2159217988/posts/2194021926) | 116 |

## Evidence handling notes

- Values are observed dashboard evidence for Clarity's rolling last-30-days window as displayed on August 27, 2026.
- Percentages in the smart-events table were calculated as event sessions divided by 4,944 human sessions. Clarity can count more than one event per session.
- The dashboard excludes 1,132 sessions it classified as bots.
- The Clarity export API remained unavailable because its daily quota had been exceeded. The authenticated dashboard supplied the required aggregate evidence without changing the project.
