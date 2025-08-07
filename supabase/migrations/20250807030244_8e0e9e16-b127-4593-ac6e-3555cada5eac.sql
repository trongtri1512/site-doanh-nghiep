-- Create languages table
CREATE TABLE public.languages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Languages are viewable by everyone" 
ON public.languages 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage languages" 
ON public.languages 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create translations table
CREATE TABLE public.translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language_code TEXT NOT NULL,
  translation_key TEXT NOT NULL,
  translation_value TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(language_code, translation_key)
);

-- Enable RLS
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Translations are viewable by everyone" 
ON public.translations 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage translations" 
ON public.translations 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_languages_updated_at
BEFORE UPDATE ON public.languages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_translations_updated_at
BEFORE UPDATE ON public.translations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default languages
INSERT INTO public.languages (code, name, native_name, is_default, display_order) VALUES
('vi', 'Vietnamese', 'Tiếng Việt', true, 0),
('en', 'English', 'English', false, 1);

-- Insert basic translations
INSERT INTO public.translations (language_code, translation_key, translation_value, category) VALUES
-- Header translations
('vi', 'header.our_company', 'Về chúng tôi', 'header'),
('en', 'header.our_company', 'Our company', 'header'),
('vi', 'header.news', 'Tin tức', 'header'),
('en', 'header.news', 'News', 'header'),
('vi', 'header.brands', 'Thương hiệu', 'header'),
('en', 'header.brands', 'Brands', 'header'),
('vi', 'header.sustainability', 'Phát triển bền vững', 'header'),
('en', 'header.sustainability', 'Sustainability', 'header'),
('vi', 'header.suppliers', 'Nhà cung cấp', 'header'),
('en', 'header.suppliers', 'Suppliers', 'header'),
('vi', 'header.careers', 'Tuyển dụng', 'header'),
('en', 'header.careers', 'Careers', 'header'),
('vi', 'header.investors', 'Nhà đầu tư', 'header'),
('en', 'header.investors', 'Investors', 'header'),
('vi', 'header.contact', 'Liên hệ', 'header'),
('en', 'header.contact', 'Contact', 'header'),
('vi', 'header.search_site', 'Tìm kiếm', 'header'),
('en', 'header.search_site', 'Search site', 'header'),

-- Common translations
('vi', 'common.home', 'Trang chủ', 'common'),
('en', 'common.home', 'Home', 'common'),
('vi', 'common.about', 'Giới thiệu', 'common'),
('en', 'common.about', 'About', 'common'),
('vi', 'common.contact', 'Liên hệ', 'common'),
('en', 'common.contact', 'Contact', 'common'),
('vi', 'common.read_more', 'Đọc thêm', 'common'),
('en', 'common.read_more', 'Read more', 'common'),
('vi', 'common.learn_more', 'Tìm hiểu thêm', 'common'),
('en', 'common.learn_more', 'Learn more', 'common'),

-- Contact page translations
('vi', 'contact.title', 'Liên hệ với chúng tôi', 'contact'),
('en', 'contact.title', 'Contact us', 'contact'),
('vi', 'contact.subtitle', 'Chúng tôi luôn sẵn sàng hỗ trợ bạn', 'contact'),
('en', 'contact.subtitle', 'We are always ready to support you', 'contact'),
('vi', 'contact.form.name', 'Họ tên', 'contact'),
('en', 'contact.form.name', 'Full name', 'contact'),
('vi', 'contact.form.email', 'Email', 'contact'),
('en', 'contact.form.email', 'Email', 'contact'),
('vi', 'contact.form.phone', 'Số điện thoại', 'contact'),
('en', 'contact.form.phone', 'Phone number', 'contact'),
('vi', 'contact.form.subject', 'Chủ đề', 'contact'),
('en', 'contact.form.subject', 'Subject', 'contact'),
('vi', 'contact.form.message', 'Tin nhắn', 'contact'),
('en', 'contact.form.message', 'Message', 'contact'),
('vi', 'contact.form.submit', 'Gửi tin nhắn', 'contact'),
('en', 'contact.form.submit', 'Send message', 'contact'),
('vi', 'contact.success', 'Tin nhắn đã được gửi thành công!', 'contact'),
('en', 'contact.success', 'Message sent successfully!', 'contact');