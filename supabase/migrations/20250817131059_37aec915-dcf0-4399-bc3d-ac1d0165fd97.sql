-- Create table for brand page content management
CREATE TABLE public.brand_page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_slug TEXT NOT NULL,
  language_code TEXT NOT NULL DEFAULT 'vi',
  page_type TEXT NOT NULL DEFAULT 'detail', -- 'detail', 'landing', etc.
  section_type TEXT NOT NULL, -- 'hero', 'about', 'products', 'values', 'timeline', etc.
  section_key TEXT NOT NULL, -- unique identifier for the section
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  styles JSONB DEFAULT '{}'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  seo_data JSONB DEFAULT '{}'::jsonb, -- meta title, description, keywords
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(brand_slug, language_code, section_key)
);

-- Enable RLS
ALTER TABLE public.brand_page_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage brand page content" 
ON public.brand_page_content 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Brand page content is viewable by everyone" 
ON public.brand_page_content 
FOR SELECT 
USING (is_active = true);

-- Create function to update updated_at timestamp
CREATE TRIGGER update_brand_page_content_updated_at
BEFORE UPDATE ON public.brand_page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for brand page media files
CREATE TABLE public.brand_page_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_slug TEXT NOT NULL,
  language_code TEXT NOT NULL DEFAULT 'vi',
  media_type TEXT NOT NULL, -- 'image', 'video', 'document'
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  file_size INTEGER,
  mime_type TEXT,
  dimensions JSONB DEFAULT '{}'::jsonb, -- width, height for images
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for media table
ALTER TABLE public.brand_page_media ENABLE ROW LEVEL SECURITY;

-- Create policies for media
CREATE POLICY "Admins can manage brand page media" 
ON public.brand_page_media 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Brand page media is viewable by everyone" 
ON public.brand_page_media 
FOR SELECT 
USING (is_active = true);

-- Create trigger for media updated_at
CREATE TRIGGER update_brand_page_media_updated_at
BEFORE UPDATE ON public.brand_page_media
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for Pigeon brand (Vietnamese)
INSERT INTO public.brand_page_content (brand_slug, language_code, section_type, section_key, title, content, display_order) VALUES
('pigeon', 'vi', 'hero', 'hero_main', 'Hero Section', '{
  "title": "67 năm Chăm sóc đáng tin cậy",
  "subtitle": "Từ năm 1957 đến nay, tiên phong trong các giải pháp chăm sóc em bé với tình yêu, khoa học và đổi mới",
  "badge_text": "Di sản kết hợp Đổi mới",
  "cta_primary": "Xem câu chuyện của chúng tôi",
  "cta_secondary": "Khám phá sản phẩm",
  "background_image": "/src/assets/pigeon-hero-modern.jpg",
  "logo_image": "/src/assets/logos/pigeon-logo.svg"
}', 1),

('pigeon', 'vi', 'timeline', 'heritage_timeline', 'Dòng thời gian di sản', '{
  "title": "Dòng thời gian di sản",
  "subtitle": "Sáu thập kỷ đổi mới và cống hiến cho việc chăm sóc mẹ và bé",
  "timeline_items": [
    {"year": "1957", "event": "Thành lập tại Nhật Bản"},
    {"year": "1960s", "event": "Bình sữa đầu tiên"},
    {"year": "1970s", "event": "Mở rộng quốc tế"},
    {"year": "1980s", "event": "Bắt đầu nghiên cứu tiên tiến"},
    {"year": "2000s", "event": "Đổi mới kỹ thuật số"},
    {"year": "2024", "event": "Thương hiệu hàng đầu thế giới"}
  ]
}', 2),

('pigeon', 'vi', 'stats', 'company_stats', 'Thống kê', '{
  "stats": [
    {"value": "67+", "label": "Năm xuất sắc"},
    {"value": "50+", "label": "Quốc gia"},
    {"value": "1M+", "label": "Gia đình hạnh phúc"},
    {"value": "200+", "label": "Sản phẩm"}
  ]
}', 3),

('pigeon', 'vi', 'values', 'core_values', 'Giá trị cốt lõi', '{
  "title": "Giá trị cốt lõi",
  "subtitle": "Những nguyên tắc định hướng mọi việc chúng tôi làm cho mẹ và bé",
  "values": [
    {
      "icon": "Heart",
      "title": "Tình yêu & Chăm sóc",
      "description": "Mỗi sản phẩm được thiết kế với tình yêu của người mẹ"
    },
    {
      "icon": "Shield",
      "title": "An toàn là trên hết",
      "description": "Kiểm tra nghiêm ngặt để đảm bảo an toàn tuyệt đối"
    },
    {
      "icon": "Microscope",
      "title": "Nghiên cứu khoa học",
      "description": "Hơn 67 năm nghiên cứu hành vi bú mẹ"
    },
    {
      "icon": "Baby",
      "title": "Lấy bé làm trung tâm",
      "description": "Hiểu rõ nhu cầu riêng biệt của mỗi em bé"
    }
  ]
}', 4);

-- Insert default content for Pigeon brand (English)
INSERT INTO public.brand_page_content (brand_slug, language_code, section_type, section_key, title, content, display_order) VALUES
('pigeon', 'en', 'hero', 'hero_main', 'Hero Section', '{
  "title": "67 Years of Trusted Care",
  "subtitle": "From 1957 to today, pioneering baby care solutions with love, science, and innovation",
  "badge_text": "Heritage Meets Innovation",
  "cta_primary": "Watch Our Story",
  "cta_secondary": "Explore Products",
  "background_image": "/src/assets/pigeon-hero-modern.jpg",
  "logo_image": "/src/assets/logos/pigeon-logo.svg"
}', 1),

('pigeon', 'en', 'timeline', 'heritage_timeline', 'Our Heritage Timeline', '{
  "title": "Our Heritage Timeline",
  "subtitle": "Six decades of innovation and dedication to mother and baby care",
  "timeline_items": [
    {"year": "1957", "event": "Founded in Japan"},
    {"year": "1960s", "event": "First nursing bottles"},
    {"year": "1970s", "event": "International expansion"},
    {"year": "1980s", "event": "Advanced research begins"},
    {"year": "2000s", "event": "Digital innovation"},
    {"year": "2024", "event": "Global leader"}
  ]
}', 2),

('pigeon', 'en', 'stats', 'company_stats', 'Statistics', '{
  "stats": [
    {"value": "67+", "label": "Years of Excellence"},
    {"value": "50+", "label": "Countries"},
    {"value": "1M+", "label": "Happy Families"},
    {"value": "200+", "label": "Products"}
  ]
}', 3),

('pigeon', 'en', 'values', 'core_values', 'Our Core Values', '{
  "title": "Our Core Values",
  "subtitle": "The principles that guide everything we do for mothers and babies",
  "values": [
    {
      "icon": "Heart",
      "title": "Love & Care",
      "description": "Every product designed with maternal love"
    },
    {
      "icon": "Shield",
      "title": "Safety First",
      "description": "Rigorous testing for complete safety"
    },
    {
      "icon": "Microscope",
      "title": "Scientific Research",
      "description": "67+ years of feeding behavior research"
    },
    {
      "icon": "Baby",
      "title": "Baby-Centered",
      "description": "Understanding each baby's unique needs"
    }
  ]
}', 4);