-- Add email and hotline content that can be managed
INSERT INTO careers_content (language_code, section_key, title, content, display_order, is_active) VALUES
-- Email and hotline values for Vietnamese
('vi', 'contact_email_value', 'Liên hệ', 'careers@imv.com.vn', 44, true),
('vi', 'contact_hotline_value', 'Liên hệ', '1900-xxxx', 45, true),
-- Email and hotline values for English  
('en', 'contact_email_value', 'Contact', 'careers@imv.com.vn', 44, true),
('en', 'contact_hotline_value', 'Contact', '1900-xxxx', 45, true)
ON CONFLICT (section_key, language_code) DO UPDATE SET
  content = EXCLUDED.content;