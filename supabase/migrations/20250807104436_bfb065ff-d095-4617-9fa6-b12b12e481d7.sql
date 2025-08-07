-- Insert missing English content records with correct section_keys to match Vietnamese structure
INSERT INTO careers_content (language_code, section_key, title, content, display_order, is_active)
VALUES 
  ('en', 'hero_title', 'Career Opportunities', 'Join Our Team', 1, true),
  ('en', 'hero_subtitle', 'Hero Subtitle', 'Build your career with us and be part of our journey to excellence', 2, true),
  ('en', 'why_join_title', 'Why Join Us', 'Why Choose Us', 3, true),
  ('en', 'why_join_content', 'Why Join Content', 'We offer a dynamic work environment with opportunities for growth and development', 4, true),
  ('en', 'benefits_title', 'Employee Benefits', 'Our Benefits', 5, true),
  ('en', 'benefits_content', 'Benefits Content', 'Competitive salary, health insurance, professional development opportunities', 6, true)
ON CONFLICT DO NOTHING;

-- Delete the old English records with different section_keys
DELETE FROM careers_content 
WHERE language_code = 'en' 
AND section_key IN ('hero', 'why_join', 'benefits');