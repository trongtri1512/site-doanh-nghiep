-- Fix and complete import of static content for About, Contact, Careers with proper JSON and idempotent inserts

-- ABOUT (VI) - Achievements
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 
  'about', 'vi', 'services', 'Thành tựu nổi bật',
  jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object('title','25+','description','Năm kinh nghiệm','icon','globe'),
      jsonb_build_object('title','200+','description','Nhân viên chuyên nghiệp','icon','users'),
      jsonb_build_object('title','15+','description','Thương hiệu quốc tế','icon','building'),
      jsonb_build_object('title','1000+','description','Điểm bán trên toàn quốc','icon','trending-up')
    )
  ),
  5, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts 
  WHERE page_type='about' AND language_code='vi' AND section_type='services' AND title='Thành tựu nổi bật'
);

-- ABOUT (VI) - Business Sectors
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 
  'about', 'vi', 'services', 'Lĩnh vực kinh doanh',
  jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object('title','Ảnh & In Ấn','description','Các sản phẩm máy ảnh, máy in và giải pháp in ấn chuyên nghiệp','tags', jsonb_build_array('FUJIFILM Instax','FUJIFILM Photo Imaging','FUJIFILM Printing Solutions')),
      jsonb_build_object('title','Chăm Sóc Mẹ & Bé','description','Sản phẩm chăm sóc mẹ và bé an toàn, chất lượng từ Nhật Bản','tags', jsonb_build_array('Pigeon','Etsuko','Các sản phẩm chăm sóc trẻ em')),
      jsonb_build_object('title','Mỹ Phẩm & Chăm Sóc Da','description','Thương hiệu mỹ phẩm cao cấp và sản phẩm chăm sóc da tiên tiến','tags', jsonb_build_array('ASTALIFT','Verites','Các thương hiệu skincare premium')),
      jsonb_build_object('title','Y Tế & Chẩn Đoán Hình Ảnh','description','Thiết bị y tế và giải pháp chẩn đoán hình ảnh hiện đại','tags', jsonb_build_array('FUJIFILM Medical Systems','Thiết bị X-ray','Hệ thống chẩn đoán'))
    )
  ),
  6, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts 
  WHERE page_type='about' AND language_code='vi' AND section_type='services' AND title='Lĩnh vực kinh doanh'
);

-- ABOUT (VI) - Strategic Partnerships
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 
  'about', 'vi', 'services', 'Đối tác chiến lược',
  jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object('title','FUJIFILM Holdings Corporation','description','Đối tác chiến lược toàn cầu về công nghệ ảnh, y tế và mỹ phẩm','since','2008'),
      jsonb_build_object('title','Pigeon Corporation','description','Thương hiệu chăm sóc mẹ và bé hàng đầu từ Nhật Bản','since','2012'),
      jsonb_build_object('title','Các đối tác quốc tế khác','description','Mạng lưới đối tác rộng khắp từ Nhật Bản, Hàn Quốc, Châu Âu','since','2004')
    )
  ),
  7, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts 
  WHERE page_type='about' AND language_code='vi' AND section_type='services' AND title='Đối tác chiến lược'
);

-- ABOUT (VI) - Contact CTA (text)
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 
  'about', 'vi', 'text', 'Kết nối với chúng tôi',
  jsonb_build_object('text','Hãy liên hệ để tìm hiểu thêm về các cơ hội hợp tác và những giải pháp tối ưu mà IMV có thể mang lại cho doanh nghiệp của bạn.'),
  8, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts 
  WHERE page_type='about' AND language_code='vi' AND section_type='text' AND title='Kết nối với chúng tôi'
);

-- ABOUT (EN) - Achievements
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 
  'about', 'en', 'services', 'Key Achievements',
  jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object('title','25+','description','Years of experience','icon','globe'),
      jsonb_build_object('title','200+','description','Professional employees','icon','users'),
      jsonb_build_object('title','15+','description','International brands','icon','building'),
      jsonb_build_object('title','1000+','description','Sales points nationwide','icon','trending-up')
    )
  ),
  5, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts 
  WHERE page_type='about' AND language_code='en' AND section_type='services' AND title='Key Achievements'
);

-- ABOUT (EN) - Business Sectors
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 
  'about', 'en', 'services', 'Business Sectors',
  jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object('title','Photography & Printing','description','Camera products, printers and professional printing solutions','tags', jsonb_build_array('FUJIFILM Instax','FUJIFILM Photo Imaging','FUJIFILM Printing Solutions')),
      jsonb_build_object('title','Mother & Baby Care','description','Safe, quality mother and baby care products from Japan','tags', jsonb_build_array('Pigeon','Etsuko','Child care products')),
      jsonb_build_object('title','Cosmetics & Skincare','description','Premium cosmetic brands and advanced skincare products','tags', jsonb_build_array('ASTALIFT','Verites','Premium skincare brands')),
      jsonb_build_object('title','Medical & Diagnostic Imaging','description','Medical equipment and modern diagnostic imaging solutions','tags', jsonb_build_array('FUJIFILM Medical Systems','X-ray equipment','Diagnostic systems'))
    )
  ),
  6, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts 
  WHERE page_type='about' AND language_code='en' AND section_type='services' AND title='Business Sectors'
);

-- ABOUT (EN) - Strategic Partnerships
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 
  'about', 'en', 'services', 'Strategic Partnerships',
  jsonb_build_object(
    'items', jsonb_build_array(
      jsonb_build_object('title','FUJIFILM Holdings Corporation','description','Global strategic partner in imaging, medical and cosmetics technology','since','2008'),
      jsonb_build_object('title','Pigeon Corporation','description','Leading mother and baby care brand from Japan','since','2012'),
      jsonb_build_object('title','Other International Partners','description','Extensive partner network from Japan, Korea, Europe','since','2004')
    )
  ),
  7, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts 
  WHERE page_type='about' AND language_code='en' AND section_type='services' AND title='Strategic Partnerships'
);

-- ABOUT (EN) - Contact CTA (text)
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 
  'about', 'en', 'text', 'Connect With Us',
  jsonb_build_object('text','Contact us to learn more about collaboration opportunities and optimal solutions that IMV can bring to your business.'),
  8, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts 
  WHERE page_type='about' AND language_code='en' AND section_type='text' AND title='Connect With Us'
);

-- CONTACT - Add hero sections (both languages)
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'contact','vi','hero','Hero Section', jsonb_build_object('title','Liên hệ với chúng tôi','subtitle','Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn','description',''), 1, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='contact' AND language_code='vi' AND section_type='hero'
);

INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'contact','en','hero','Hero Section', jsonb_build_object('title','Contact Us','subtitle','We are always ready to support and listen to your feedback','description',''), 1, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='contact' AND language_code='en' AND section_type='hero'
);

-- CAREERS - Add hero, about, services, and contact text for both languages
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'careers','vi','hero','Hero Section', jsonb_build_object('title','Tham gia đội ngũ của chúng tôi','subtitle','Khám phá những cơ hội nghề nghiệp tuyệt vời và phát triển cùng chúng tôi','description','', 'buttonText','Xem vị trí tuyển dụng','buttonUrl','#jobs'), 1, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='careers' AND language_code='vi' AND section_type='hero'
);

INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'careers','vi','about','Tại sao nên làm việc với chúng tôi?', jsonb_build_object('title','Tại sao nên làm việc với chúng tôi?','content','Chúng tôi cung cấp môi trường làm việc chuyên nghiệp, cơ hội phát triển nghề nghiệp và các phúc lợi hấp dẫn cho nhân viên.','image','', 'features', jsonb_build_array('Môi trường làm việc thân thiện','Cơ hội phát triển nghề nghiệp','Thành tựu và thành công')), 2, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='careers' AND language_code='vi' AND section_type='about'
);

INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'careers','vi','services','Quyền lợi nhân viên', jsonb_build_object('items', jsonb_build_array(
  jsonb_build_object('title','Chăm sóc sức khỏe','description','Bảo hiểm y tế toàn diện, khám sức khỏe định kỳ và hỗ trợ chăm sóc sức khỏe.','icon','heart'),
  jsonb_build_object('title','Thời gian linh hoạt','description','Chế độ làm việc linh hoạt, nghỉ phép hợp lý và cân bằng cuộc sống.','icon','calendar'),
  jsonb_build_object('title','Lương thưởng hấp dẫn','description','Mức lương cạnh tranh, thưởng hiệu suất và các phúc lợi bổ sung.','icon','dollar-sign'),
  jsonb_build_object('title','Phát triển kỹ năng','description','Các khóa đào tạo chuyên môn, hội thảo và cơ hội học tập liên tục.','icon','trophy')
)), 3, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='careers' AND language_code='vi' AND section_type='services'
);

INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'careers','vi','text','Thông tin liên hệ tuyển dụng', jsonb_build_object('text','Không tìm thấy vị trí phù hợp? Hãy gửi CV của bạn đến chúng tôi. Chúng tôi sẽ liên hệ khi có vị trí phù hợp với năng lực và kinh nghiệm của bạn.\n\nEmail: careers@imv.com.vn\nHotline: 1900-xxxx'), 4, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='careers' AND language_code='vi' AND section_type='text' AND title='Thông tin liên hệ tuyển dụng'
);

-- Careers EN
INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'careers','en','hero','Hero Section', jsonb_build_object('title','Join Our Team','subtitle','Discover amazing career opportunities and grow with us','description','', 'buttonText','View Open Positions','buttonUrl','#jobs'), 1, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='careers' AND language_code='en' AND section_type='hero'
);

INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'careers','en','about','Why work with us?', jsonb_build_object('title','Why work with us?','content','We provide a professional work environment, career development opportunities and attractive benefits for employees.','image','', 'features', jsonb_build_array('Friendly work environment','Career development opportunities','Achievement and success')), 2, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='careers' AND language_code='en' AND section_type='about'
);

INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'careers','en','services','Employee Benefits', jsonb_build_object('items', jsonb_build_array(
  jsonb_build_object('title','Healthcare','description','Comprehensive health insurance, regular health checkups and healthcare support.','icon','heart'),
  jsonb_build_object('title','Flexible Working Hours','description','Flexible working arrangements, reasonable leave and work-life balance.','icon','calendar'),
  jsonb_build_object('title','Attractive Salary','description','Competitive salary, performance bonuses and additional benefits.','icon','dollar-sign'),
  jsonb_build_object('title','Skill Development','description','Professional training courses, workshops and continuous learning opportunities.','icon','trophy')
)), 3, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='careers' AND language_code='en' AND section_type='services'
);

INSERT INTO page_layouts (page_type, language_code, section_type, title, content, display_order, is_active)
SELECT 'careers','en','text','Recruitment Contact Information', jsonb_build_object('text','Cannot find a suitable position? Send us your CV. We will contact you when there is a position that matches your capabilities and experience.\n\nEmail: careers@imv.com.vn\nHotline: 1900-xxxx'), 4, true
WHERE NOT EXISTS (
  SELECT 1 FROM page_layouts WHERE page_type='careers' AND language_code='en' AND section_type='text' AND title='Recruitment Contact Information'
);