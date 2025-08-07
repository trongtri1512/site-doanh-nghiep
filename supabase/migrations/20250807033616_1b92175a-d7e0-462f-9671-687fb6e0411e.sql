-- Add news section translations
INSERT INTO public.translations (language_code, translation_key, translation_value, category) VALUES
-- News Vietnamese
('vi', 'news.latest_title', 'Tin tức mới nhất', 'news'),
('vi', 'news.view_all', 'Xem tất cả tin tức', 'news'),
('vi', 'common.loading', 'Đang tải...', 'common'),

-- News English
('en', 'news.latest_title', 'Latest News', 'news'),
('en', 'news.view_all', 'View All News', 'news'),
('en', 'common.loading', 'Loading...', 'common')
ON CONFLICT (language_code, translation_key) DO UPDATE SET translation_value = EXCLUDED.translation_value;