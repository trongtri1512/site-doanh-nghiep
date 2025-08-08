-- Seed About page sections (VI/EN) if missing
-- About Overview
INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'about', 'Tổng quan về IMV',
$$
{
  "title": "Tổng quan về IMV",
  "content": "IMV là nhà phân phối và tiếp thị uy tín tại Việt Nam, hợp tác cùng các thương hiệu quốc tế để mang sản phẩm chất lượng đến với người tiêu dùng.\n\nChúng tôi chú trọng xây dựng hệ thống phân phối bền vững, dịch vụ chuyên nghiệp và mối quan hệ hợp tác win-win cùng đối tác.",
  "image": "/lovable-uploads/ed58ce9e-f21d-46e4-b22e-021e8a21a686.png"
}
$$::jsonb, '{}'::jsonb, 0, true, 'vi'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='about' AND language_code='vi'
);

INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'about', 'About IMV',
$$
{
  "title": "About IMV",
  "content": "IMV is a trusted distributor and marketing partner in Vietnam, bringing high-quality international brands to local consumers.\n\nWe focus on sustainable distribution, professional services, and win-win partnerships with our stakeholders.",
  "image": "/lovable-uploads/ed58ce9e-f21d-46e4-b22e-021e8a21a686.png"
}
$$::jsonb, '{}'::jsonb, 0, true, 'en'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='about' AND language_code='en'
);

-- Vision & Mission
INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'vision_mission', 'Tầm nhìn & Sứ mệnh',
$$
{
  "visionTitle": "Tầm nhìn",
  "visionText": "Trở thành đối tác phân phối tiên phong, đáng tin cậy tại Việt Nam, mang lại giá trị bền vững cho khách hàng, đối tác và cộng đồng.",
  "missionTitle": "Sứ mệnh",
  "missionText": "Kết nối các thương hiệu quốc tế với người tiêu dùng Việt bằng dịch vụ chuyên nghiệp, danh mục sản phẩm chất lượng và quy trình vận hành hiệu quả."
}
$$::jsonb, '{}'::jsonb, 1, true, 'vi'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='vision_mission' AND language_code='vi'
);

INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'vision_mission', 'Vision & Mission',
$$
{
  "visionTitle": "Vision",
  "visionText": "To become a pioneering and trusted distribution partner in Vietnam, delivering sustainable value to customers, partners, and the community.",
  "missionTitle": "Mission",
  "missionText": "To connect global brands with Vietnamese consumers through professional services, quality product portfolios, and efficient operations."
}
$$::jsonb, '{}'::jsonb, 1, true, 'en'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='vision_mission' AND language_code='en'
);

-- Core Values (4)
INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'core_values', 'Giá trị cốt lõi',
$$
{
  "title": "Giá trị cốt lõi",
  "items": [
    { "title": "Chính trực", "description": "Minh bạch, trung thực trong mọi hoạt động." },
    { "title": "Tôn trọng", "description": "Tôn trọng khách hàng, đối tác và đồng nghiệp." },
    { "title": "Hợp tác", "description": "Cùng nhau phát triển trên tinh thần win-win." },
    { "title": "Sáng tạo", "description": "Không ngừng đổi mới, tạo ra giá trị vượt trội." }
  ]
}
$$::jsonb, '{}'::jsonb, 2, true, 'vi'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='core_values' AND language_code='vi'
);

INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'core_values', 'Core Values',
$$
{
  "title": "Core Values",
  "items": [
    { "title": "Integrity", "description": "We act with transparency and honesty in everything we do." },
    { "title": "Respect", "description": "We respect customers, partners, and colleagues." },
    { "title": "Collaboration", "description": "We grow together on a win-win mindset." },
    { "title": "Innovation", "description": "We continuously innovate to create outstanding value." }
  ]
}
$$::jsonb, '{}'::jsonb, 2, true, 'en'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='core_values' AND language_code='en'
);

-- Business Sectors (4)
INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'business_sectors', 'Các lĩnh vực kinh doanh',
$$
{
  "title": "Các lĩnh vực kinh doanh",
  "items": [
    { "title": "Ảnh & In ấn", "description": "Giải pháp ảnh kỹ thuật số, máy ảnh, phim và giấy in chất lượng.", "image": "/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png", "url": "#" },
    { "title": "Chăm sóc Mẹ & Bé", "description": "Sản phẩm an toàn, tiện lợi cho mẹ và bé.", "image": "/lovable-uploads/b393a4a5-1ed9-4996-937a-22c0768f1dd7.png", "url": "#" },
    { "title": "Mỹ phẩm", "description": "Danh mục chăm sóc da và làm đẹp từ các thương hiệu uy tín.", "image": "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png", "url": "#" },
    { "title": "Y tế", "description": "Thiết bị, vật tư y tế và giải pháp chẩn đoán đáng tin cậy.", "image": "/lovable-uploads/76170711-dd2d-4132-93e1-df62f46e595e.png", "url": "#" }
  ]
}
$$::jsonb, '{}'::jsonb, 3, true, 'vi'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='business_sectors' AND language_code='vi'
);

INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'business_sectors', 'Business Sectors',
$$
{
  "title": "Business Sectors",
  "items": [
    { "title": "Imaging & Printing", "description": "Digital imaging solutions, cameras, films, and high-quality paper.", "image": "/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png", "url": "#" },
    { "title": "Mother & Baby Care", "description": "Safe and convenient products for moms and babies.", "image": "/lovable-uploads/b393a4a5-1ed9-4996-937a-22c0768f1dd7.png", "url": "#" },
    { "title": "Cosmetics & Beauty", "description": "Beauty and skincare from trusted brands.", "image": "/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png", "url": "#" },
    { "title": "Healthcare", "description": "Reliable medical devices, supplies and diagnostic solutions.", "image": "/lovable-uploads/76170711-dd2d-4132-93e1-df62f46e595e.png", "url": "#" }
  ]
}
$$::jsonb, '{}'::jsonb, 3, true, 'en'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='business_sectors' AND language_code='en'
);

-- Contact CTA
INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'cta', 'Kết nối cùng IMV',
$$
{
  "title": "Cùng hợp tác với IMV",
  "description": "Bạn muốn trở thành đối tác hoặc tìm hiểu thêm về dịch vụ của chúng tôi? Hãy liên hệ ngay hôm nay.",
  "buttonText": "Liên hệ chúng tôi",
  "buttonUrl": "/contact"
}
$$::jsonb, '{}'::jsonb, 4, true, 'vi'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='cta' AND language_code='vi'
);

INSERT INTO public.page_layouts (page_type, section_type, title, content, styles, display_order, is_active, language_code)
SELECT 'about', 'cta', 'Connect with IMV',
$$
{
  "title": "Let's work together",
  "description": "Want to partner with us or learn more about our services? Get in touch today.",
  "buttonText": "Contact us",
  "buttonUrl": "/contact"
}
$$::jsonb, '{}'::jsonb, 4, true, 'en'
WHERE NOT EXISTS (
  SELECT 1 FROM public.page_layouts 
  WHERE page_type='about' AND section_type='cta' AND language_code='en'
);
