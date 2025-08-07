-- Update English content for careers page
UPDATE careers_content SET 
  title = 'Career Opportunities',
  content = 'Join Our Team'
WHERE section_key = 'hero_title' AND language_code = 'en';

UPDATE careers_content SET 
  title = 'Hero Subtitle', 
  content = 'Build your career with us and be part of our journey to excellence'
WHERE section_key = 'hero_subtitle' AND language_code = 'en';

UPDATE careers_content SET 
  title = 'Why Work With Us',
  content = 'Why Choose Us'
WHERE section_key = 'why_join_title' AND language_code = 'en';

UPDATE careers_content SET 
  title = 'Why Join Content',
  content = 'We offer a dynamic work environment with opportunities for growth and development'
WHERE section_key = 'why_join_content' AND language_code = 'en';

UPDATE careers_content SET 
  title = 'Employee Benefits',
  content = 'Our Benefits'
WHERE section_key = 'benefits_title' AND language_code = 'en';

UPDATE careers_content SET 
  title = 'Benefits Content',
  content = 'Competitive salary, health insurance, professional development opportunities'
WHERE section_key = 'benefits_content' AND language_code = 'en';

-- Add new sections for individual benefit cards and other content
INSERT INTO careers_content (language_code, section_key, title, content, display_order, is_active) VALUES
-- Individual benefit cards for English
('en', 'benefit_friendly_environment_title', 'Benefits Card', 'Friendly Work Environment', 10, true),
('en', 'benefit_friendly_environment_content', 'Benefits Card Content', 'Supportive colleagues, positive work environment and strong company culture.', 11, true),
('en', 'benefit_career_development_title', 'Benefits Card', 'Career Development', 12, true),
('en', 'benefit_career_development_content', 'Benefits Card Content', 'Training opportunities, learning and clear career advancement opportunities.', 13, true),
('en', 'benefit_achievements_title', 'Benefits Card', 'Achievement and Success', 14, true),
('en', 'benefit_achievements_content', 'Benefits Card Content', 'Recognition of your contributions and achievements at work.', 15, true),
('en', 'benefit_healthcare_title', 'Benefits Card', 'Healthcare', 16, true),
('en', 'benefit_healthcare_content', 'Benefits Card Content', 'Comprehensive health insurance, regular health checkups and healthcare support.', 17, true),
('en', 'benefit_flexible_time_title', 'Benefits Card', 'Flexible Working Hours', 18, true),
('en', 'benefit_flexible_time_content', 'Benefits Card Content', 'Flexible working arrangements, reasonable leave and work-life balance.', 19, true),
('en', 'benefit_attractive_salary_title', 'Benefits Card', 'Attractive Salary', 20, true),
('en', 'benefit_attractive_salary_content', 'Benefits Card Content', 'Competitive salary, performance bonuses and additional benefits.', 21, true),
('en', 'benefit_skill_development_title', 'Benefits Card', 'Skill Development', 22, true),
('en', 'benefit_skill_development_content', 'Benefits Card Content', 'Professional training courses, workshops and continuous learning opportunities.', 23, true),
-- Job section titles
('en', 'jobs_section_title', 'Jobs Section', 'Open Positions', 30, true),
('en', 'jobs_section_subtitle', 'Jobs Section', 'Explore career opportunities that suit you', 31, true),
-- Contact section  
('en', 'contact_section_title', 'Contact Section', 'Cannot find a suitable position?', 40, true),
('en', 'contact_section_content', 'Contact Section', 'Send us your CV. We will contact you when there is a position that matches your capabilities and experience.', 41, true),
('en', 'contact_email_label', 'Contact', 'Email:', 42, true),
('en', 'contact_hotline_label', 'Contact', 'Hotline:', 43, true),
-- Labels and buttons
('en', 'apply_now_button', 'Button', 'Apply Now', 50, true),
('en', 'job_description_label', 'Label', 'Job Description', 51, true),
('en', 'job_requirements_label', 'Label', 'Job Requirements', 52, true),
('en', 'experience_label', 'Label', 'Experience:', 53, true),
('en', 'deadline_label', 'Label', 'Application Deadline:', 54, true),
('en', 'no_jobs_title', 'Label', 'No open positions available', 55, true),
('en', 'no_jobs_content', 'Label', 'Please check back later for new career opportunities', 56, true),
('en', 'back_to_home', 'Navigation', 'Back to home', 57, true)
ON CONFLICT (section_key, language_code) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  display_order = EXCLUDED.display_order;