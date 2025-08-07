-- Drop the existing unique constraint on section_key only
ALTER TABLE careers_content DROP CONSTRAINT IF EXISTS careers_content_section_key_key;

-- Add composite unique constraint on section_key AND language_code
ALTER TABLE careers_content ADD CONSTRAINT careers_content_section_key_language_key UNIQUE (section_key, language_code);

-- Now insert the English content records
INSERT INTO careers_content (language_code, section_key, title, content, display_order, is_active)
VALUES 
  ('en', 'hero_title', 'Career Opportunities', 'Join Our Team', 1, true),
  ('en', 'hero_subtitle', 'Hero Subtitle', 'Build your career with us and be part of our journey to excellence', 2, true),
  ('en', 'why_join_title', 'Why Join Us', 'Why Choose Us', 3, true),
  ('en', 'why_join_content', 'Why Join Content', 'We offer a dynamic work environment with opportunities for growth and development', 4, true),
  ('en', 'benefits_title', 'Employee Benefits', 'Our Benefits', 5, true),
  ('en', 'benefits_content', 'Benefits Content', 'Competitive salary, health insurance, professional development opportunities', 6, true);