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

-- Create policy for public media access
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
  "cta_secondary": "Khám phá sản phẩm"
}', 1);

-- Insert English content  
INSERT INTO public.brand_page_content (brand_slug, language_code, section_type, section_key, title, content, display_order) VALUES
('pigeon', 'en', 'hero', 'hero_main', 'Hero Section', '{
  "title": "67 Years of Trusted Care",
  "subtitle": "From 1957 to today, pioneering baby care solutions with love, science, and innovation",
  "badge_text": "Heritage Meets Innovation",
  "cta_primary": "Watch Our Story",
  "cta_secondary": "Explore Products"
}', 1);