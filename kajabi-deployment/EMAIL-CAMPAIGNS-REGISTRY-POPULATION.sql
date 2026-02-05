-- Email Campaign Registry Population
-- Date: January 2026
-- Purpose: Populate checkout_offer_map with all evergreen email campaigns

-- ============================================
-- MEMBERSHIP SEQUENCES
-- ============================================

-- EMMS04: 7-Day Trial Email Sequence
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMMS04',
  'https://www.joinsnooze.com/email-campaign/eMMS04',
  'campaign',
  '7-Day Trial Email Sequence',
  'active',
  '{
    "email_count": 4,
    "sequence_duration_days": 8,
    "trigger_type": "trial_signup",
    "target_segment": "trial_members",
    "kajabi_campaign_id": null,
    "emails": [
      {"day": 0, "name": "Welcome Email", "subject": "Welcome to your 7-day trial"},
      {"day": 2, "name": "Day 2-3 Check-In", "subject": "How is your trial going?"},
      {"day": 4, "name": "Day 4-5 Check-In", "subject": "Trial ending soon - here is what happens next"},
      {"day": 8, "name": "Trial Ended Follow-Up", "subject": "Your trial ended - special offer for you"}
    ]
  }'::jsonb,
  '["MBMS04"]'::jsonb,
  'Email sequence for 7-day trial membership. Includes welcome, day 2-3 check-in, day 4-5 check-in, and trial-ended follow-up. Related to MBMS04 offer.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- EMMS05: 1 Month Free Email Sequence
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMMS05',
  'https://www.joinsnooze.com/email-campaign/eMMS05',
  'campaign',
  '1 Month Free Email Sequence',
  'active',
  '{
    "email_count": 6,
    "sequence_duration_days": 30,
    "trigger_type": "offer_grant",
    "target_segment": "free_access_recipients",
    "kajabi_campaign_id": null,
    "emails": [
      {"day": 0, "name": "Welcome Email", "subject": "Your free month of Snooze starts now!"},
      {"day": 7, "name": "Day 7 Check-In", "subject": "How is your free month going?"},
      {"day": 14, "name": "Day 14 Check-In", "subject": "Halfway through your free month"},
      {"day": 21, "name": "Day 21 Reminder", "subject": "One week left in your free month"},
      {"day": 25, "name": "Day 25 Upgrade CTA", "subject": "Your free month ends in 3 days"},
      {"day": 30, "name": "Day 30 Follow-Up", "subject": "Your free month ended - special offer for you"}
    ]
  }'::jsonb,
  '["MBMS05"]'::jsonb,
  'Email sequence for 1-month free access grant. Includes welcome, day 7, 14, 21, 25, and 30 emails. Related to MBMS05 offer.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- ============================================
-- COURSE SEQUENCES
-- ============================================

-- EMCR01: 3-4m Course - Limited Trial Flow
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMCR01',
  'https://www.joinsnooze.com/email-campaign/eMCR01',
  'campaign',
  '3-4m Course - Limited Trial Flow',
  'active',
  '{
    "email_count": 2,
    "sequence_duration_days": 2,
    "trigger_type": "course_purchase",
    "target_segment": "3_4_month_course_buyers",
    "kajabi_campaign_id": null
  }'::jsonb,
  '["PUBCR01"]'::jsonb,
  'Email sequence for 3-4 month course purchasers. Limited trial flow with 2 emails over 2 days. Related to PUBCR01 offer.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- ============================================
-- SNOOZE SOCIAL SEQUENCES
-- ============================================

-- EMSS01: Snooze Social Members - Snooze Reminder
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMSS01',
  'https://www.joinsnooze.com/email-campaign/eMSS01',
  'campaign',
  'Snooze Social Members - Snooze Reminder',
  'active',
  '{
    "email_count": 3,
    "sequence_duration_days": 8,
    "trigger_type": "tag_added",
    "target_segment": "snooze_social_members",
    "kajabi_campaign_id": null,
    "trigger_tag": "snooze-social-member"
  }'::jsonb,
  NULL,
  'Email sequence for Snooze Social members. Reminder sequence with 3 emails over 8 days. Triggered by snooze-social-member tag.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- ============================================
-- RECENT PURCHASER SEQUENCES
-- ============================================

-- EMRP01: Recent $87 Bundle Purchasers (RPB87)
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMRP01',
  'https://www.joinsnooze.com/email-campaign/eMRP01',
  'campaign',
  'Recent $87 Bundle Purchasers (RPB87)',
  'active',
  '{
    "email_count": 3,
    "sequence_duration_days": 6,
    "trigger_type": "purchase",
    "target_segment": "recent_bundle_purchasers",
    "kajabi_campaign_id": null,
    "purchase_value": 87,
    "discount_offered": 87
  }'::jsonb,
  NULL,
  'Email sequence for recent $87 bundle purchasers. 3 emails over 6 days. Offers $87 off founding member offer.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- EMRP02: Recent Purchasers - $27 Products (RPM27)
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMRP02',
  'https://www.joinsnooze.com/email-campaign/eMRP02',
  'campaign',
  'Recent Purchasers - $27 Products (RPM27)',
  'active',
  '{
    "email_count": 3,
    "sequence_duration_days": 6,
    "trigger_type": "purchase",
    "target_segment": "recent_27_product_purchasers",
    "kajabi_campaign_id": null,
    "purchase_value": 27,
    "discount_offered": 27
  }'::jsonb,
  NULL,
  'Email sequence for recent $27 product purchasers. 3 emails over 6 days. Offers $27 off founding member offer.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- EMRP03: Recent Purchasers - $67 Products (RPG67)
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMRP03',
  'https://www.joinsnooze.com/email-campaign/eMRP03',
  'campaign',
  'Recent Purchasers - $67 Products (RPG67)',
  'active',
  '{
    "email_count": 3,
    "sequence_duration_days": 6,
    "trigger_type": "purchase",
    "target_segment": "recent_67_product_purchasers",
    "kajabi_campaign_id": null,
    "purchase_value": 67,
    "discount_offered": 67
  }'::jsonb,
  NULL,
  'Email sequence for recent $67 product purchasers. 3 emails over 6 days. Offers $67 off founding member offer.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- EMRP04: Recent Purchasers - Consultation Purchasers (RPN100)
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMRP04',
  'https://www.joinsnooze.com/email-campaign/eMRP04',
  'campaign',
  'Recent Purchasers - Consultation Purchasers (RPN100)',
  'active',
  '{
    "email_count": 3,
    "sequence_duration_days": 6,
    "trigger_type": "purchase",
    "target_segment": "recent_consultation_purchasers",
    "kajabi_campaign_id": null,
    "purchase_value": 100,
    "discount_offered": 100
  }'::jsonb,
  NULL,
  'Email sequence for recent consultation purchasers. 3 emails over 6 days. Offers $100 off founding member offer. Highest value recent purchaser segment.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- EMRP05: Recent Purchasers - $117 Products (RPC117)
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMRP05',
  'https://www.joinsnooze.com/email-campaign/eMRP05',
  'campaign',
  'Recent Purchasers - $117 Products (RPC117)',
  'active',
  '{
    "email_count": 3,
    "sequence_duration_days": 6,
    "trigger_type": "purchase",
    "target_segment": "recent_117_product_purchasers",
    "kajabi_campaign_id": null,
    "purchase_value": 117,
    "discount_offered": 80
  }'::jsonb,
  NULL,
  'Email sequence for recent $117 product purchasers. 3 emails over 6 days. Offers $80 off founding member offer.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- ============================================
-- OLDER PURCHASER SEQUENCES
-- ============================================

-- EMOP01: Older Purchasers (3+ months ago) (OP20)
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMOP01',
  'https://www.joinsnooze.com/email-campaign/eMOP01',
  'campaign',
  'Older Purchasers (3+ months ago) (OP20)',
  'active',
  '{
    "email_count": 4,
    "sequence_duration_days": 9,
    "trigger_type": "tag_added",
    "target_segment": "older_purchasers",
    "kajabi_campaign_id": null,
    "trigger_tag": "older-purchaser",
    "purchase_window": "3+ months ago",
    "discount_offered": 20
  }'::jsonb,
  NULL,
  'Email sequence for older purchasers (3+ months ago). 4 emails over 9 days. Offers $20 off founding member offer.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- ============================================
-- EMAIL SUBSCRIBER SEQUENCES
-- ============================================

-- EMES01: Email Subscribers
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMES01',
  'https://www.joinsnooze.com/email-campaign/eMES01',
  'campaign',
  'Email Subscribers',
  'active',
  '{
    "email_count": 4,
    "sequence_duration_days": 9,
    "trigger_type": "tag_added",
    "target_segment": "email_subscribers",
    "kajabi_campaign_id": null,
    "trigger_tag": "email-subscriber"
  }'::jsonb,
  NULL,
  'Email sequence for general email subscribers. 4 emails over 9 days. Triggered by email-subscriber tag.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- ============================================
-- WAITLIST SEQUENCES
-- ============================================

-- EMWL01: Waitlist Subscribers
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMWL01',
  'https://www.joinsnooze.com/email-campaign/eMWL01',
  'campaign',
  'Waitlist Subscribers',
  'active',
  '{
    "email_count": 4,
    "sequence_duration_days": 9,
    "trigger_type": "tag_added",
    "target_segment": "waitlist_subscribers",
    "kajabi_campaign_id": null,
    "trigger_tag": "waitlist-subscriber"
  }'::jsonb,
  NULL,
  'Email sequence for waitlist subscribers. 4 emails over 9 days. Triggered by waitlist-subscriber tag.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- EMWL02: Camp Snooze Waitlist Launch - January 2026
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMWL02',
  'https://www.joinsnooze.com/email-campaign/eMWL02',
  'campaign',
  'Camp Snooze Waitlist Launch - January 2026',
  'active',
  '{
    "email_count": 3,
    "sequence_duration_days": 6,
    "trigger_type": "waitlist_signup",
    "target_segment": "camp_snooze_waitlist_subscribers",
    "kajabi_campaign_id": null,
    "trigger_tag": "camp-snooze-waitlist"
  }'::jsonb,
  '["PUBCM01"]'::jsonb,
  '3-email waitlist campaign for Camp Snooze. Jan 16 open, Jan 19 inside look, Jan 21 final reminder.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- ============================================
-- GENERAL SEQUENCES
-- ============================================

-- EMGN01: Snooze Login Check
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMGN01',
  'https://www.joinsnooze.com/email-campaign/eMGN01',
  'campaign',
  'Snooze Login Check',
  'active',
  '{
    "email_count": 1,
    "sequence_duration_days": 0,
    "trigger_type": "manual_or_automated",
    "target_segment": "all_members",
    "kajabi_campaign_id": null
  }'::jsonb,
  NULL,
  'Single email campaign for login check. Sent to verify member access and engagement.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- EMGN02: 5-12 Month Guide/Course Buyers - Toddler Toolkit Launch
INSERT INTO checkout_offer_map (
  offer_code,
  checkout_url,
  element_type,
  element_name,
  status,
  metadata,
  related_element_ids,
  notes,
  created_at,
  updated_at
) VALUES (
  'EMGN02',
  'https://www.joinsnooze.com/email-campaign/eMGN02',
  'campaign',
  '5-12 Month Guide/Course Buyers - Toddler Toolkit Launch',
  'active',
  '{
    "email_count": 1,
    "sequence_duration_days": 0,
    "trigger_type": "product_launch",
    "target_segment": "5_12_month_buyers",
    "kajabi_campaign_id": null,
    "launch_date": "2025-12-19"
  }'::jsonb,
  '["PUBCR02"]'::jsonb,
  'Single email campaign announcing Toddler Toolkit launch to 5-12 month guide/course buyers. Sent December 19, 2025.',
  NOW(),
  NOW()
)
ON CONFLICT (offer_code) 
DO UPDATE SET
  checkout_url = EXCLUDED.checkout_url,
  element_name = EXCLUDED.element_name,
  status = EXCLUDED.status,
  metadata = EXCLUDED.metadata,
  related_element_ids = EXCLUDED.related_element_ids,
  notes = EXCLUDED.notes,
  updated_at = NOW();
