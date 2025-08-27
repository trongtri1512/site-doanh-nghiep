-- Insert English version of the existing Vietnamese job posting
INSERT INTO careers_jobs (
  title,
  department,
  location,
  job_type,
  salary,
  experience,
  description,
  requirements,
  benefits,
  status,
  language_code,
  deadline,
  is_featured
) VALUES (
  'Sales Representative',
  'Sales',
  'Ho Chi Minh City',
  'Full-time',
  '',
  '2-3 years',
  'Test position for sales department',
  'Bachelor''s degree in Economics or Business
1-2 years of experience in sales
Good communication skills and persuasion ability
High sense of responsibility',
  '',
  'active',
  'en',
  '2025-08-31 00:00:00+00',
  false
);