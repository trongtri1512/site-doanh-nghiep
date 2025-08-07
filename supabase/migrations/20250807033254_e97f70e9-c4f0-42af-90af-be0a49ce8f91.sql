-- Add homepage translations
INSERT INTO public.translations (language_code, translation_key, translation_value, category) VALUES
-- Homepage Vietnamese
('vi', 'homepage.brands_title', 'Các nhãn hàng đồng hành', 'homepage'),
('vi', 'homepage.brands_subtitle', 'IMV tự hào là đối tác phân phối chính thức của nhiều thương hiệu uy tín hàng đầu thế giới, mang đến cho người tiêu dùng Việt Nam những sản phẩm chất lượng cao và dịch vụ tận tâm.', 'homepage'),
('vi', 'homepage.brands_cta_text', 'Khám phá thêm về các thương hiệu và sản phẩm mà chúng tôi phân phối', 'homepage'),
('vi', 'homepage.learn_more_cta', 'Tìm hiểu thêm về IMV', 'homepage'),

-- Homepage English
('en', 'homepage.brands_title', 'Our Partner Brands', 'homepage'),
('en', 'homepage.brands_subtitle', 'IMV is proud to be the official distribution partner of many prestigious leading brands worldwide, bringing high-quality products and dedicated services to Vietnamese consumers.', 'homepage'),
('en', 'homepage.brands_cta_text', 'Discover more about the brands and products we distribute', 'homepage'),
('en', 'homepage.learn_more_cta', 'Learn more about IMV', 'homepage')
ON CONFLICT (language_code, translation_key) DO UPDATE SET translation_value = EXCLUDED.translation_value;