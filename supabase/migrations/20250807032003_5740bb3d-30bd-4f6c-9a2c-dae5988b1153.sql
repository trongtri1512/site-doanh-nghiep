-- Add language support to existing tables
ALTER TABLE public.menu_items ADD COLUMN language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.news ADD COLUMN language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.footer_sections ADD COLUMN language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.footer_menu_items ADD COLUMN language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.brands ADD COLUMN language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.careers_jobs ADD COLUMN language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.careers_content ADD COLUMN language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.contact_info ADD COLUMN language_code TEXT NOT NULL DEFAULT 'vi';

-- Create indexes for better performance
CREATE INDEX idx_menu_items_language ON public.menu_items(language_code);
CREATE INDEX idx_news_language ON public.news(language_code);
CREATE INDEX idx_footer_sections_language ON public.footer_sections(language_code);
CREATE INDEX idx_footer_menu_items_language ON public.footer_menu_items(language_code);
CREATE INDEX idx_brands_language ON public.brands(language_code);
CREATE INDEX idx_careers_jobs_language ON public.careers_jobs(language_code);
CREATE INDEX idx_careers_content_language ON public.careers_content(language_code);
CREATE INDEX idx_contact_info_language ON public.contact_info(language_code);

-- Duplicate existing Vietnamese content for English
INSERT INTO public.menu_items (title, url, target, menu_type, parent_id, display_order, is_active, language_code)
SELECT 
  CASE 
    WHEN title = 'Về chúng tôi' THEN 'Our company'
    WHEN title = 'Tin tức' THEN 'News'
    WHEN title = 'Thương hiệu' THEN 'Brands'
    WHEN title = 'Phát triển bền vững' THEN 'Sustainability'
    WHEN title = 'Nhà cung cấp' THEN 'Suppliers'
    WHEN title = 'Tuyển dụng' THEN 'Careers'
    WHEN title = 'Nhà đầu tư' THEN 'Investors'
    WHEN title = 'Liên hệ' THEN 'Contact'
    ELSE title
  END as title,
  url, target, menu_type, parent_id, display_order, is_active, 'en'
FROM public.menu_items 
WHERE language_code = 'vi';

-- Duplicate brands for English
INSERT INTO public.brands (name, slug, category, description, image_url, featured, active, display_order, language_code)
SELECT 
  name, slug, category,
  CASE 
    WHEN name = 'Pigeon' THEN 'Premium baby care products from Japan'
    WHEN name = 'Verites' THEN 'Professional skincare solutions'
    WHEN name = 'Instax Camera' THEN 'Instant photography cameras and films'
    WHEN name = 'Fujifilm Image' THEN 'Professional imaging solutions'
    WHEN name = 'Etsuko' THEN 'Quality beauty and personal care'
    WHEN name = 'Astalift' THEN 'Advanced anti-aging skincare'
    ELSE description
  END as description,
  image_url, featured, active, display_order, 'en'
FROM public.brands 
WHERE language_code = 'vi';

-- Add English sample news
INSERT INTO public.news (title, slug, content, excerpt, category, author, status, featured, published_at, language_code)
VALUES
('IMV Expands Operations in Southeast Asia', 'imv-expands-southeast-asia', 
 'IMV Corporation is proud to announce the expansion of our operations across Southeast Asia, bringing our premium brands closer to customers in the region.', 
 'IMV announces major expansion across Southeast Asia market', 
 'Business', 'IMV Team', 'published', true, now(), 'en'),
('New Sustainability Initiative Launched', 'sustainability-initiative-launched',
 'We are committed to environmental responsibility and sustainable business practices. Our new initiative focuses on reducing carbon footprint and promoting eco-friendly products.',
 'IMV launches comprehensive sustainability program',
 'Environment', 'IMV Team', 'published', false, now(), 'en'),
('Innovation in Beauty Technology', 'innovation-beauty-technology',
 'Our research and development team continues to push boundaries in beauty technology, creating innovative solutions for modern consumers.',
 'Latest innovations in beauty and personal care technology',
 'Technology', 'IMV Team', 'published', false, now(), 'en');

-- Add English footer sections
INSERT INTO public.footer_sections (section_type, title, content, display_order, is_active, language_code)
VALUES
('company_info', 'About IMV', '{"description": "IMV Corporation is a leading distributor of premium international brands in Vietnam, committed to bringing quality products and exceptional service to our customers."}', 0, true, 'en'),
('contact_info', 'Contact Information', '{"address": "123 Business Street, District 1, Ho Chi Minh City, Vietnam", "phone": "+84 28 1234 5678", "email": "info@imv.vn"}', 1, true, 'en'),
('social_links', 'Follow Us', '{"facebook": "https://facebook.com/imv", "linkedin": "https://linkedin.com/company/imv", "youtube": "https://youtube.com/imv"}', 2, true, 'en');

-- Add English footer menu items
INSERT INTO public.footer_menu_items (title, url, target, display_order, is_active, language_code, section_id)
SELECT 
  CASE 
    WHEN title = 'Về chúng tôi' THEN 'About Us'
    WHEN title = 'Tin tức' THEN 'News'
    WHEN title = 'Thương hiệu' THEN 'Brands'
    WHEN title = 'Tuyển dụng' THEN 'Careers'
    WHEN title = 'Liên hệ' THEN 'Contact'
    WHEN title = 'Chính sách bảo mật' THEN 'Privacy Policy'
    WHEN title = 'Điều khoản sử dụng' THEN 'Terms of Service'
    ELSE title
  END as title,
  url, target, display_order, is_active, 'en', section_id
FROM public.footer_menu_items 
WHERE language_code = 'vi';

-- Add English career content
INSERT INTO public.careers_content (section_key, title, content, display_order, is_active, language_code)
VALUES
('hero', 'Join Our Team', 'Build your career with IMV Corporation and be part of our success story. We offer exciting opportunities for growth and development.', 0, true, 'en'),
('benefits', 'Why Choose IMV?', 'We offer competitive salaries, comprehensive benefits, professional development opportunities, and a collaborative work environment.', 1, true, 'en'),
('culture', 'Our Culture', 'At IMV, we value innovation, teamwork, and excellence. We believe in creating an inclusive workplace where everyone can thrive.', 2, true, 'en');

-- Add English contact info
INSERT INTO public.contact_info (section_key, title, content, display_order, is_active, language_code)
VALUES
('office_hours', 'Office Hours', 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 8:00 AM - 12:00 PM\nSunday: Closed', 0, true, 'en'),
('main_office', 'Head Office', 'IMV Corporation\n123 Business Street\nDistrict 1, Ho Chi Minh City\nVietnam', 1, true, 'en'),
('contact_methods', 'Get in Touch', 'Phone: +84 28 1234 5678\nEmail: info@imv.vn\nWebsite: www.imv.vn', 2, true, 'en');