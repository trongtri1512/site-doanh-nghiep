-- Insert the 5 required categories for Vietnamese
INSERT INTO site_settings (setting_key, display_name, description, setting_type, setting_value, category, is_public) VALUES
('category_vi_thuong-hieu', 'Thương hiệu', 'Tin tức về các thương hiệu', 'category', '{"slug": "thuong-hieu", "language": "vi"}', 'news_categories', true),
('category_vi_san-pham', 'Sản phẩm', 'Tin tức về sản phẩm mới', 'category', '{"slug": "san-pham", "language": "vi"}', 'news_categories', true),
('category_vi_thanh-tich', 'Thành tích', 'Các thành tích đạt được', 'category', '{"slug": "thanh-tich", "language": "vi"}', 'news_categories', true),
('category_vi_su-kien', 'Sự kiện', 'Các sự kiện quan trọng', 'category', '{"slug": "su-kien", "language": "vi"}', 'news_categories', true),
('category_vi_xu-huong', 'Xu hướng', 'Xu hướng thị trường', 'category', '{"slug": "xu-huong", "language": "vi"}', 'news_categories', true);

-- Insert the 5 required categories for English
INSERT INTO site_settings (setting_key, display_name, description, setting_type, setting_value, category, is_public) VALUES
('category_en_brands', 'Brands', 'News about brands', 'category', '{"slug": "brands", "language": "en"}', 'news_categories', true),
('category_en_products', 'Products', 'News about new products', 'category', '{"slug": "products", "language": "en"}', 'news_categories', true),
('category_en_achievements', 'Achievements', 'Company achievements', 'category', '{"slug": "achievements", "language": "en"}', 'news_categories', true),
('category_en_events', 'Events', 'Important events', 'category', '{"slug": "events", "language": "en"}', 'news_categories', true),
('category_en_trends', 'Trends', 'Market trends', 'category', '{"slug": "trends", "language": "en"}', 'news_categories', true);