-- Import comprehensive static content from existing pages to page_layouts
-- This includes all the hardcoded content that was missing from the previous import

-- About page - Vietnamese achievements section
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active) 
VALUES 
-- Achievements section for About page
('about', 'vi', 'services', 'Thành tựu nổi bật', '{"items": [{"title": "25+", "description": "Năm kinh nghiệm", "icon": "globe"}, {"title": "200+", "description": "Nhân viên chuyên nghiệp", "icon": "users"}, {"title": "15+", "description": "Thương hiệu quốc tế", "icon": "building"}, {"title": "1000+", "description": "Điểm bán trên toàn quốc", "icon": "trending-up"}]}', 5, true),

-- Business sectors section
('about', 'vi', 'services', 'Lĩnh vực kinh doanh', '{"items": [{"title": "Ảnh & In Ấn", "description": "Các sản phẩm máy ảnh, máy in và giải pháp in ấn chuyên nghiệp", "tags": ["FUJIFILM Instax", "FUJIFILM Photo Imaging", "FUJIFILM Printing Solutions"]}, {"title": "Chăm Sóc Mẹ & Bé", "description": "Sản phẩm chăm sóc mẹ và bé an toàn, chất lượng từ Nhật Bản", "tags": ["Pigeon", "Etsuko", "Các sản phẩm chăm sóc trẻ em"]}, {"title": "Mỹ Phẩm & Chăm Sóc Da", "description": "Thương hiệu mỹ phẩm cao cấp và sản phẩm chăm sóc da tiên tiến", "tags": ["ASTALIFT", "Verites", "Các thương hiệu skincare premium"]}, {"title": "Y Tế & Chẩn Đoán Hình Ảnh", "description": "Thiết bị y tế và giải pháp chẩn đoán hình ảnh hiện đại", "tags": ["FUJIFILM Medical Systems", "Thiết bị X-ray", "Hệ thống chẩn đoán"]}]}', 6, true),

-- Strategic partnerships section  
('about', 'vi', 'services', 'Đối tác chiến lược', '{"items": [{"title": "FUJIFILM Holdings Corporation", "description": "Đối tác chiến lược toàn cầu về công nghệ ảnh, y tế và mỹ phẩm", "since": "2008"}, {"title": "Pigeon Corporation", "description": "Thương hiệu chăm sóc mẹ và bé hàng đầu từ Nhật Bản", "since": "2012"}, {"title": "Các đối tác quốc tế khác", "description": "Mạng lưới đối tác rộng khắp từ Nhật Bản, Hàn Quốc, Châu Âu", "since": "2004"}]}', 7, true),

-- Contact CTA section
('about', 'vi', 'text', 'Kết nối với chúng tôi', 'Hãy liên hệ để tìm hiểu thêm về các cơ hội hợp tác và những giải pháp tối ưu mà IMV có thể mang lại cho doanh nghiệp của bạn.', 8, true);

-- About page - English achievements section
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active) 
VALUES 
-- Achievements section for About page - English
('about', 'en', 'services', 'Key Achievements', '{"items": [{"title": "25+", "description": "Years of experience", "icon": "globe"}, {"title": "200+", "description": "Professional employees", "icon": "users"}, {"title": "15+", "description": "International brands", "icon": "building"}, {"title": "1000+", "description": "Sales points nationwide", "icon": "trending-up"}]}', 5, true),

-- Business sectors section - English
('about', 'en', 'services', 'Business Sectors', '{"items": [{"title": "Photography & Printing", "description": "Camera products, printers and professional printing solutions", "tags": ["FUJIFILM Instax", "FUJIFILM Photo Imaging", "FUJIFILM Printing Solutions"]}, {"title": "Mother & Baby Care", "description": "Safe, quality mother and baby care products from Japan", "tags": ["Pigeon", "Etsuko", "Child care products"]}, {"title": "Cosmetics & Skincare", "description": "Premium cosmetic brands and advanced skincare products", "tags": ["ASTALIFT", "Verites", "Premium skincare brands"]}, {"title": "Medical & Diagnostic Imaging", "description": "Medical equipment and modern diagnostic imaging solutions", "tags": ["FUJIFILM Medical Systems", "X-ray equipment", "Diagnostic systems"]}]}', 6, true),

-- Strategic partnerships section - English
('about', 'en', 'services', 'Strategic Partnerships', '{"items": [{"title": "FUJIFILM Holdings Corporation", "description": "Global strategic partner in imaging, medical and cosmetics technology", "since": "2008"}, {"title": "Pigeon Corporation", "description": "Leading mother and baby care brand from Japan", "since": "2012"}, {"title": "Other International Partners", "description": "Extensive partner network from Japan, Korea, Europe", "since": "2004"}]}', 7, true),

-- Contact CTA section - English
('about', 'en', 'text', 'Connect With Us', 'Contact us to learn more about collaboration opportunities and optimal solutions that IMV can bring to your business.', 8, true);

-- Contact page - Add missing contact information from Contact.tsx hardcoded content
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active) 
VALUES 
-- Contact page Vietnamese content
('contact', 'vi', 'hero', 'Hero Section', '{"title": "Liên hệ với chúng tôi", "subtitle": "Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn", "description": ""}', 1, true),

-- Contact page English content  
('contact', 'en', 'hero', 'Hero Section', '{"title": "Contact Us", "subtitle": "We are always ready to support and listen to your feedback", "description": ""}', 1, true);

-- Careers page - Add missing comprehensive career content
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active) 
VALUES 
-- Careers Vietnamese sections
('careers', 'vi', 'hero', 'Hero Section', '{"title": "Tham gia đội ngũ của chúng tôi", "subtitle": "Khám phá những cơ hội nghề nghiệp tuyệt vời và phát triển cùng chúng tôi", "description": "", "buttonText": "Xem vị trí tuyển dụng", "buttonUrl": "#jobs"}', 1, true),

('careers', 'vi', 'about', 'Tại sao nên làm việc với chúng tôi?', '{"title": "Tại sao nên làm việc với chúng tôi?", "content": "Chúng tôi cung cấp môi trường làm việc chuyên nghiệp, cơ hội phát triển nghề nghiệp và các phúc lợi hấp dẫn cho nhân viên.", "image": "", "features": ["Môi trường làm việc thân thiện", "Cơ hội phát triển nghề nghiệp", "Thành tựu và thành công"]}', 2, true),

('careers', 'vi', 'services', 'Quyền lợi nhân viên', '{"items": [{"title": "Chăm sóc sức khỏe", "description": "Bảo hiểm y tế toàn diện, khám sức khỏe định kỳ và hỗ trợ chăm sóc sức khỏe.", "icon": "heart"}, {"title": "Thời gian linh hoạt", "description": "Chế độ làm việc linh hoạt, nghỉ phép hợp lý và cân bằng cuộc sống.", "icon": "calendar"}, {"title": "Lương thưởng hấp dẫn", "description": "Mức lương cạnh tranh, thưởng hiệu suất và các phúc lợi bổ sung.", "icon": "dollar-sign"}, {"title": "Phát triển kỹ năng", "description": "Các khóa đào tạo chuyên môn, hội thảo và cơ hội học tập liên tục.", "icon": "trophy"}]}', 3, true),

('careers', 'vi', 'text', 'Thông tin liên hệ tuyển dụng', 'Không tìm thấy vị trí phù hợp? Hãy gửi CV của bạn đến chúng tôi. Chúng tôi sẽ liên hệ khi có vị trí phù hợp với năng lực và kinh nghiệm của bạn.\n\nEmail: careers@imv.com.vn\nHotline: 1900-xxxx', 4, true),

-- Careers English sections
('careers', 'en', 'about', 'Why work with us?', '{"title": "Why work with us?", "content": "We provide a professional work environment, career development opportunities and attractive benefits for employees.", "image": "", "features": ["Friendly work environment", "Career development opportunities", "Achievement and success"]}', 2, true),

('careers', 'en', 'services', 'Employee Benefits', '{"items": [{"title": "Healthcare", "description": "Comprehensive health insurance, regular health checkups and healthcare support.", "icon": "heart"}, {"title": "Flexible Working Hours", "description": "Flexible working arrangements, reasonable leave and work-life balance.", "icon": "calendar"}, {"title": "Attractive Salary", "description": "Competitive salary, performance bonuses and additional benefits.", "icon": "dollar-sign"}, {"title": "Skill Development", "description": "Professional training courses, workshops and continuous learning opportunities.", "icon": "trophy"}]}', 3, true),

('careers', 'en', 'text', 'Recruitment Contact Information', 'Cannot find a suitable position? Send us your CV. We will contact you when there is a position that matches your capabilities and experience.\n\nEmail: careers@imv.com.vn\nHotline: 1900-xxxx', 4, true);

-- News page sections
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active) 
VALUES 
-- News Vietnamese sections
('news', 'vi', 'hero', 'Hero Section', '{"title": "Tin tức & Sự kiện", "subtitle": "Cập nhật những tin tức mới nhất từ IMV", "description": "Theo dõi các hoạt động, sự kiện và thông tin mới nhất về các sản phẩm, dịch vụ của chúng tôi"}', 1, true),

('news', 'vi', 'text', 'Giới thiệu tin tức', 'Khám phá những tin tức mới nhất về hoạt động kinh doanh, sản phẩm mới và các sự kiện quan trọng của IMV. Chúng tôi cam kết cập nhật thường xuyên để bạn không bỏ lỡ thông tin nào.', 2, true),

-- News English sections  
('news', 'en', 'hero', 'Hero Section', '{"title": "News & Events", "subtitle": "Stay updated with the latest news from IMV", "description": "Follow our activities, events and latest information about our products and services"}', 1, true),

('news', 'en', 'text', 'News Introduction', 'Discover the latest news about our business activities, new products and important events from IMV. We are committed to regular updates so you do not miss any information.', 2, true);