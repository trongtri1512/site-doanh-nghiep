-- Add missing English translations for news-related texts
INSERT INTO translations (translation_key, translation_value, language_code, category) VALUES
('news.back_to_news', 'Back to news', 'en', 'navigation'),
('news.featured_badge', 'Featured', 'en', 'news'),
('news.loading', 'Loading...', 'en', 'common'),
('news.not_found_title', 'Article not found', 'en', 'news'),
('news.not_found_link', 'Back to news page', 'en', 'navigation'),
('news.category_label', 'Category:', 'en', 'news'),
('news.share_label', 'Share:', 'en', 'news'),
('news.related_articles', 'Related articles', 'en', 'news'),
('news.no_date', 'Not set', 'en', 'common'),
('news.content_placeholder', 'Article content is being updated...', 'en', 'news');

-- Add corresponding Vietnamese translations
INSERT INTO translations (translation_key, translation_value, language_code, category) VALUES
('news.back_to_news', 'Quay lại tin tức', 'vi', 'navigation'),
('news.featured_badge', 'Nổi bật', 'vi', 'news'),
('news.loading', 'Đang tải...', 'vi', 'common'),
('news.not_found_title', 'Không tìm thấy bài viết', 'vi', 'news'),
('news.not_found_link', 'Quay lại trang tin tức', 'vi', 'navigation'),
('news.category_label', 'Danh mục:', 'vi', 'news'),
('news.share_label', 'Chia sẻ:', 'vi', 'news'),
('news.related_articles', 'Bài viết liên quan', 'vi', 'news'),
('news.no_date', 'Chưa đặt', 'vi', 'common'),
('news.content_placeholder', 'Nội dung bài viết đang được cập nhật...', 'vi', 'news');