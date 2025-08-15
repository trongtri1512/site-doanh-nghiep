-- Add translation keys for About page in Vietnamese
INSERT INTO public.translations (translation_key, language_code, translation_value, category) VALUES
-- Page title and navigation
('about.page_title', 'vi', 'Về chúng tôi', 'about'),
('about.breadcrumb_home', 'vi', 'Trang chủ', 'about'),
('about.breadcrumb_about', 'vi', 'Về chúng tôi', 'about'),

-- Hero section
('about.hero_title', 'vi', 'Về IMV Group', 'about'),
('about.hero_subtitle', 'vi', 'Tiên phong trong việc mang đến những sản phẩm chất lượng cao và dịch vụ xuất sắc', 'about'),

-- Mission and Vision
('about.mission_vision_title', 'vi', 'Sứ mệnh & Tầm nhìn', 'about'),
('about.mission_title', 'vi', 'Sứ mệnh', 'about'),
('about.mission_text', 'vi', 'Chúng tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao, đáp ứng nhu cầu đa dạng của khách hàng và góp phần nâng cao chất lượng cuộc sống.', 'about'),
('about.vision_title', 'vi', 'Tầm nhìn', 'about'),
('about.vision_text', 'vi', 'Trở thành công ty hàng đầu trong lĩnh vực phân phối và kinh doanh các sản phẩm tiêu dùng chất lượng cao tại Việt Nam và khu vực.', 'about'),

-- Achievements
('about.achievements_title', 'vi', 'Thành tựu của chúng tôi', 'about'),
('about.achievement_years_title', 'vi', '25+ Năm', 'about'),
('about.achievement_years_subtitle', 'vi', 'Kinh nghiệm trong ngành', 'about'),
('about.achievement_employees_title', 'vi', '200+', 'about'),
('about.achievement_employees_subtitle', 'vi', 'Nhân viên tận tâm', 'about'),
('about.achievement_brands_title', 'vi', '15+', 'about'),
('about.achievement_brands_subtitle', 'vi', 'Thương hiệu đối tác', 'about'),
('about.achievement_customers_title', 'vi', '1000+', 'about'),
('about.achievement_customers_subtitle', 'vi', 'Khách hàng tin tưởng', 'about'),

-- Business areas
('about.business_title', 'vi', 'Lĩnh vực kinh doanh', 'about'),
('about.business_healthcare_category', 'vi', 'Chăm sóc sức khỏe & Làm đẹp', 'about'),
('about.business_healthcare_description', 'vi', 'Các sản phẩm chăm sóc sức khỏe, làm đẹp và dinh dưỡng từ các thương hiệu uy tín.', 'about'),
('about.business_lifestyle_category', 'vi', 'Phong cách sống', 'about'),
('about.business_lifestyle_description', 'vi', 'Sản phẩm công nghệ và tiêu dùng phục vụ cuộc sống hiện đại.', 'about'),
('about.business_baby_category', 'vi', 'Mẹ và bé', 'about'),
('about.business_baby_description', 'vi', 'Các sản phẩm chăm sóc và dinh dưỡng cho mẹ và bé an toàn, chất lượng cao.', 'about'),

-- Strategic partnerships
('about.partnerships_title', 'vi', 'Đối tác chiến lược', 'about'),
('about.partnerships_subtitle', 'vi', 'Chúng tôi tự hào hợp tác với các thương hiệu hàng đầu thế giới', 'about'),
('about.partnership_fujifilm_name', 'vi', 'Fujifilm Holdings', 'about'),
('about.partnership_fujifilm_description', 'vi', 'Đối tác chiến lược trong lĩnh vực chăm sóc sức khỏe và làm đẹp', 'about'),
('about.partnership_pigeon_name', 'vi', 'Pigeon Corporation', 'about'),
('about.partnership_pigeon_description', 'vi', 'Nhà cung cấp hàng đầu các sản phẩm chăm sóc mẹ và bé', 'about'),
('about.partnership_since', 'vi', 'Từ năm', 'about'),

-- Call to action
('about.cta_title', 'vi', 'Sẵn sàng hợp tác cùng chúng tôi?', 'about'),
('about.cta_text', 'vi', 'Hãy liên hệ để tìm hiểu về các cơ hội nghề nghiệp và đối tác kinh doanh.', 'about'),
('about.cta_contact_button', 'vi', 'Liên hệ ngay', 'about'),
('about.cta_careers_button', 'vi', 'Cơ hội nghề nghiệp', 'about')

ON CONFLICT (translation_key, language_code) DO UPDATE SET
translation_value = EXCLUDED.translation_value,
updated_at = now();

-- Add translation keys for About page in English
INSERT INTO public.translations (translation_key, language_code, translation_value, category) VALUES
-- Page title and navigation
('about.page_title', 'en', 'About Us', 'about'),
('about.breadcrumb_home', 'en', 'Home', 'about'),
('about.breadcrumb_about', 'en', 'About Us', 'about'),

-- Hero section
('about.hero_title', 'en', 'About IMV Group', 'about'),
('about.hero_subtitle', 'en', 'Pioneering in bringing high-quality products and excellent services', 'about'),

-- Mission and Vision
('about.mission_vision_title', 'en', 'Mission & Vision', 'about'),
('about.mission_title', 'en', 'Mission', 'about'),
('about.mission_text', 'en', 'We are committed to providing high-quality products and services that meet diverse customer needs and contribute to improving quality of life.', 'about'),
('about.vision_title', 'en', 'Vision', 'about'),
('about.vision_text', 'en', 'To become a leading company in the distribution and trading of high-quality consumer products in Vietnam and the region.', 'about'),

-- Achievements
('about.achievements_title', 'en', 'Our Achievements', 'about'),
('about.achievement_years_title', 'en', '25+ Years', 'about'),
('about.achievement_years_subtitle', 'en', 'Industry Experience', 'about'),
('about.achievement_employees_title', 'en', '200+', 'about'),
('about.achievement_employees_subtitle', 'en', 'Dedicated Employees', 'about'),
('about.achievement_brands_title', 'en', '15+', 'about'),
('about.achievement_brands_subtitle', 'en', 'Partner Brands', 'about'),
('about.achievement_customers_title', 'en', '1000+', 'about'),
('about.achievement_customers_subtitle', 'en', 'Trusted Customers', 'about'),

-- Business areas
('about.business_title', 'en', 'Business Areas', 'about'),
('about.business_healthcare_category', 'en', 'Healthcare & Beauty', 'about'),
('about.business_healthcare_description', 'en', 'Healthcare, beauty and nutrition products from trusted brands.', 'about'),
('about.business_lifestyle_category', 'en', 'Lifestyle', 'about'),
('about.business_lifestyle_description', 'en', 'Technology and consumer products serving modern life.', 'about'),
('about.business_baby_category', 'en', 'Mother & Baby', 'about'),
('about.business_baby_description', 'en', 'Safe, high-quality care and nutrition products for mothers and babies.', 'about'),

-- Strategic partnerships
('about.partnerships_title', 'en', 'Strategic Partnerships', 'about'),
('about.partnerships_subtitle', 'en', 'We are proud to partner with leading global brands', 'about'),
('about.partnership_fujifilm_name', 'en', 'Fujifilm Holdings', 'about'),
('about.partnership_fujifilm_description', 'en', 'Strategic partner in healthcare and beauty', 'about'),
('about.partnership_pigeon_name', 'en', 'Pigeon Corporation', 'about'),
('about.partnership_pigeon_description', 'en', 'Leading provider of mother and baby care products', 'about'),
('about.partnership_since', 'en', 'Since', 'about'),

-- Call to action
('about.cta_title', 'en', 'Ready to partner with us?', 'about'),
('about.cta_text', 'en', 'Contact us to learn about career opportunities and business partnerships.', 'about'),
('about.cta_contact_button', 'en', 'Contact Now', 'about'),
('about.cta_careers_button', 'en', 'Career Opportunities', 'about')

ON CONFLICT (translation_key, language_code) DO UPDATE SET
translation_value = EXCLUDED.translation_value,
updated_at = now();