-- Insert English careers content
INSERT INTO careers_content (section_key, title, content, language_code, display_order, is_active) VALUES
('hero', 'Join Our Team', 'Build your career with us and be part of our journey to excellence', 'en', 1, true),
('why_join', 'Why Join Us?', 'We offer a dynamic work environment with opportunities for growth and development', 'en', 2, true),
('benefits', 'Our Benefits', 'Competitive salary, health insurance, professional development opportunities', 'en', 3, true);

-- Insert sample English job postings
INSERT INTO careers_jobs (title, department, location, job_type, salary, experience, description, requirements, benefits, language_code, status, deadline) VALUES
('Marketing Manager', 'Marketing', 'Ho Chi Minh City', 'Full-time', 'Competitive', '3-5 years', 'We are looking for an experienced Marketing Manager to join our team', '- Bachelor degree in Marketing or related field\n- 3+ years of marketing experience\n- Strong communication skills', '- Competitive salary\n- Health insurance\n- Professional development opportunities', 'en', 'active', '2025-03-01 00:00:00+00'),
('Software Developer', 'Technology', 'Ho Chi Minh City', 'Full-time', 'Negotiable', '2-4 years', 'Join our development team to build innovative solutions', '- Bachelor degree in Computer Science\n- Experience with React, Node.js\n- Strong problem-solving skills', '- Flexible working hours\n- Training opportunities\n- Team building activities', 'en', 'active', '2025-02-28 00:00:00+00');