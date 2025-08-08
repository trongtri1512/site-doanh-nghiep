-- Import existing page data into page_layouts table for both languages

-- About page content for Vietnamese
INSERT INTO public.page_layouts (page_type, section_type, title, content, language_code, display_order, is_active) VALUES 
('about', 'hero', 'Hero Section', '{
  "title": "Về chúng tôi",
  "subtitle": "IMV - CÔNG TY CỔ PHẦN QUỐC TẾ MINH VIỆT",
  "description": "Đối tác đáng tin cậy tại thị trường Việt Nam",
  "backgroundImage": ""
}', 'vi', 0, true),

('about', 'text', 'Giới thiệu công ty', '{
  "text": "Với hơn 25 năm kinh nghiệm, IMV là một doanh nghiệp sản xuất và phân phối có vốn đầu tư nước ngoài hàng đầu tại Việt Nam. Chúng tôi cam kết đồng hành cùng các thương hiệu trong hành trình phát triển, thúc đẩy đổi mới sáng tạo và nuôi dưỡng thế hệ trẻ tài năng – tạo nên một hệ sinh thái hợp tác năng động.\n\nTừ ý tưởng đến tay người tiêu dùng, chúng tôi cung cấp cơ sở hạ tầng, mạng lưới đối tác và hiểu biết sâu sắc về thị trường để biến những sản phẩm xuất sắc thành những thương hiệu được yêu mến tại Việt Nam."
}', 'vi', 1, true),

('about', 'about', 'Sứ mệnh & Tầm nhìn', '{
  "title": "Về IMV",
  "content": "Sứ mệnh: Mang đến cho người tiêu dùng Việt Nam những sản phẩm chất lượng cao từ các thương hiệu uy tín quốc tế, góp phần nâng cao chất lượng cuộc sống và trải nghiệm của khách hàng thông qua dịch vụ phân phối chuyên nghiệp và tận tâm.\n\nTầm nhìn: Trở thành công ty phân phối hàng đầu Việt Nam, được tin tưởng bởi các đối tác quốc tế và yêu mến bởi người tiêu dùng, đồng thời mở rộng ra thị trường khu vực Đông Nam Á vào năm 2030.",
  "image": "/assets/imv-building.png"
}', 'vi', 2, true);

-- About page content for English
INSERT INTO public.page_layouts (page_type, section_type, title, content, language_code, display_order, is_active) VALUES 
('about', 'hero', 'Hero Section', '{
  "title": "About Us",
  "subtitle": "IMV - INTERNATIONAL MINH VIET JOINT STOCK COMPANY",
  "description": "Your trusted partner in Vietnam market",
  "backgroundImage": ""
}', 'en', 0, true),

('about', 'text', 'Company Introduction', '{
  "text": "With over 25 years of experience, IMV is a leading manufacturing and distribution enterprise with foreign investment in Vietnam. We are committed to accompanying brands in their development journey, promoting innovation and nurturing talented young generations – creating a dynamic cooperative ecosystem.\n\nFrom idea to consumer hands, we provide infrastructure, partner networks and deep market understanding to turn excellent products into beloved brands in Vietnam."
}', 'en', 1, true),

('about', 'about', 'Mission & Vision', '{
  "title": "About IMV",
  "content": "Mission: To bring Vietnamese consumers high-quality products from reputable international brands, contributing to improving quality of life and customer experience through professional and dedicated distribution services.\n\nVision: To become Vietnam''s leading distribution company, trusted by international partners and loved by consumers, while expanding to Southeast Asian markets by 2030.",
  "image": "/assets/imv-building.png"
}', 'en', 2, true);

-- Contact page content for Vietnamese
INSERT INTO public.page_layouts (page_type, section_type, title, content, language_code, display_order, is_active) VALUES 
('contact', 'hero', 'Hero Section', '{
  "title": "Liên hệ với chúng tôi",
  "subtitle": "Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn",
  "backgroundImage": ""
}', 'vi', 0, true),

('contact', 'contact', 'Thông tin liên hệ', '{
  "title": "Thông tin liên hệ",
  "address": "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
  "phone": "(028) 1234 5678",
  "email": "info@imv.com.vn",
  "workingHours": "Thứ 2 - Thứ 6: 8:00 - 17:00\nThứ 7: 8:00 - 12:00"
}', 'vi', 1, true),

('contact', 'form', 'Biểu mẫu liên hệ', '{
  "title": "Gửi tin nhắn cho chúng tôi",
  "description": "Vui lòng điền thông tin dưới đây, chúng tôi sẽ liên hệ lại sớm nhất có thể",
  "fields": [
    {"type": "text", "name": "name", "label": "Họ và tên", "required": true},
    {"type": "email", "name": "email", "label": "Email", "required": true},
    {"type": "tel", "name": "phone", "label": "Số điện thoại", "required": false},
    {"type": "text", "name": "subject", "label": "Tiêu đề", "required": true},
    {"type": "textarea", "name": "message", "label": "Tin nhắn", "required": true}
  ]
}', 'vi', 2, true);

-- Contact page content for English
INSERT INTO public.page_layouts (page_type, section_type, title, content, language_code, display_order, is_active) VALUES 
('contact', 'hero', 'Hero Section', '{
  "title": "Contact Us",
  "subtitle": "We are always ready to support and listen to your feedback",
  "backgroundImage": ""
}', 'en', 0, true),

('contact', 'contact', 'Contact Information', '{
  "title": "Contact Information",
  "address": "123 ABC Street, District 1, Ho Chi Minh City",
  "phone": "(028) 1234 5678",
  "email": "info@imv.com.vn",
  "workingHours": "Monday - Friday: 8:00 - 17:00\nSaturday: 8:00 - 12:00"
}', 'en', 1, true),

('contact', 'form', 'Contact Form', '{
  "title": "Send us a message",
  "description": "Please fill in the information below, we will contact you as soon as possible",
  "fields": [
    {"type": "text", "name": "name", "label": "Full Name", "required": true},
    {"type": "email", "name": "email", "label": "Email", "required": true},
    {"type": "tel", "name": "phone", "label": "Phone Number", "required": false},
    {"type": "text", "name": "subject", "label": "Subject", "required": true},
    {"type": "textarea", "name": "message", "label": "Message", "required": true}
  ]
}', 'en', 2, true);

-- Careers page content for Vietnamese
INSERT INTO public.page_layouts (page_type, section_type, title, content, language_code, display_order, is_active) VALUES 
('careers', 'hero', 'Hero Section', '{
  "title": "Cơ hội nghề nghiệp",
  "subtitle": "Tham gia đội ngũ của chúng tôi",
  "description": "Khám phá những cơ hội nghề nghiệp tuyệt vời và phát triển cùng chúng tôi",
  "buttonText": "Xem vị trí tuyển dụng",
  "buttonUrl": "#jobs"
}', 'vi', 0, true),

('careers', 'about', 'Tại sao nên làm việc với chúng tôi', '{
  "title": "Tại sao nên làm việc với chúng tôi?",
  "content": "Chúng tôi cung cấp môi trường làm việc chuyên nghiệp, cơ hội phát triển sự nghiệp và các phúc lợi hấp dẫn cho nhân viên.",
  "image": ""
}', 'vi', 1, true),

('careers', 'services', 'Quyền lợi nhân viên', '{
  "title": "Quyền lợi và phúc lợi",
  "items": [
    {"title": "Lương thưởng cạnh tranh", "description": "Mức lương hấp dẫn và thưởng hiệu suất", "icon": "star"},
    {"title": "Bảo hiểm đầy đủ", "description": "Bảo hiểm xã hội, y tế và tai nạn", "icon": "star"},
    {"title": "Đào tạo phát triển", "description": "Cơ hội học tập và nâng cao kỹ năng", "icon": "star"},
    {"title": "Môi trường thân thiện", "description": "Đồng nghiệp hỗ trợ và văn hóa tích cực", "icon": "star"}
  ]
}', 'vi', 2, true),

('careers', 'faq', 'Câu hỏi thường gặp', '{
  "title": "Câu hỏi thường gặp về tuyển dụng",
  "items": [
    {"question": "Làm thế nào để ứng tuyển vào công ty?", "answer": "Bạn có thể ứng tuyển trực tuyến qua website hoặc gửi CV về email careers@imv.com.vn"},
    {"question": "Quy trình tuyển dụng diễn ra như thế nào?", "answer": "Quy trình gồm: Nhận hồ sơ → Sàng lọc CV → Phỏng vấn → Thông báo kết quả"},
    {"question": "Công ty có cơ hội thăng tiến không?", "answer": "Có, chúng tôi luôn ưu tiên phát triển và thăng tiến nội bộ cho nhân viên có năng lực"}
  ]
}', 'vi', 3, true);

-- Careers page content for English
INSERT INTO public.page_layouts (page_type, section_type, title, content, language_code, display_order, is_active) VALUES 
('careers', 'hero', 'Hero Section', '{
  "title": "Career Opportunities",
  "subtitle": "Join our team",
  "description": "Discover amazing career opportunities and grow with us",
  "buttonText": "View Open Positions",
  "buttonUrl": "#jobs"
}', 'en', 0, true),

('careers', 'about', 'Why work with us', '{
  "title": "Why work with us?",
  "content": "We provide a professional work environment, career development opportunities and attractive benefits for employees.",
  "image": ""
}', 'en', 1, true),

('careers', 'services', 'Employee Benefits', '{
  "title": "Benefits and Welfare",
  "items": [
    {"title": "Competitive Salary", "description": "Attractive salary and performance bonuses", "icon": "star"},
    {"title": "Full Insurance", "description": "Social, health and accident insurance", "icon": "star"},
    {"title": "Training & Development", "description": "Learning opportunities and skill enhancement", "icon": "star"},
    {"title": "Friendly Environment", "description": "Supportive colleagues and positive culture", "icon": "star"}
  ]
}', 'en', 2, true),

('careers', 'faq', 'Frequently Asked Questions', '{
  "title": "Recruitment FAQs",
  "items": [
    {"question": "How to apply for a position?", "answer": "You can apply online through our website or send your CV to careers@imv.com.vn"},
    {"question": "How does the recruitment process work?", "answer": "Process includes: Application → CV Screening → Interview → Result Notification"},
    {"question": "Are there promotion opportunities?", "answer": "Yes, we always prioritize internal development and promotion for capable employees"}
  ]
}', 'en', 3, true);

-- Add RLS policy to allow public viewing of page layouts for rendering
INSERT INTO public.page_layouts (page_type, section_type, title, content, language_code, display_order, is_active) VALUES 
('news', 'hero', 'Hero Section', '{
  "title": "Tin tức & Sự kiện",
  "subtitle": "Cập nhật những thông tin mới nhất từ IMV",
  "backgroundImage": ""
}', 'vi', 0, true),

('news', 'hero', 'Hero Section', '{
  "title": "News & Events",
  "subtitle": "Stay updated with the latest news from IMV",
  "backgroundImage": ""
}', 'en', 0, true);