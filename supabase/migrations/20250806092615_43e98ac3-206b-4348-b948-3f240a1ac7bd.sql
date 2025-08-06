-- Create site_settings table for managing general website settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB,
  setting_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'boolean', 'number', 'json', 'image'
  display_name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general', -- 'general', 'appearance', 'maintenance', 'seo'
  display_order INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false, -- whether this setting can be accessed by public users
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public settings are viewable by everyone" 
ON public.site_settings 
FOR SELECT 
USING (is_public = true);

-- Create trigger for timestamps
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, display_name, description, category, display_order, is_public) VALUES
-- General settings
('site_title', '"IMV Vietnam"', 'text', 'Tiêu đề website', 'Tiêu đề chính của website', 'general', 1, true),
('site_description', '"IMV Vietnam - Nâng tầm cuộc sống, vững vàng tương lai"', 'text', 'Mô tả website', 'Mô tả ngắn về website', 'general', 2, true),
('site_keywords', '"IMV, Vietnam, thương mại, phân phối"', 'text', 'Từ khóa SEO', 'Từ khóa cho SEO', 'general', 3, true),

-- Appearance settings
('site_logo', '"/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png"', 'image', 'Logo website', 'Logo chính của website', 'appearance', 1, true),
('favicon', '"/favicon.ico"', 'image', 'Favicon', 'Icon hiển thị trên tab trình duyệt', 'appearance', 2, true),
('primary_color', '"#2563eb"', 'text', 'Màu chủ đạo', 'Màu chủ đạo của website', 'appearance', 3, true),

-- Contact settings
('contact_email', '"info@imv.com.vn"', 'text', 'Email liên hệ', 'Email chính để liên hệ', 'general', 4, true),
('contact_phone', '"(028) 1234 5678"', 'text', 'Số điện thoại', 'Số điện thoại liên hệ', 'general', 5, true),
('contact_address', '"123 Đường ABC, Quận 1, TP.HCM"', 'text', 'Địa chỉ', 'Địa chỉ công ty', 'general', 6, true),

-- Social media
('facebook_url', '"#"', 'text', 'Facebook URL', 'Đường dẫn trang Facebook', 'general', 7, true),
('twitter_url', '"#"', 'text', 'Twitter URL', 'Đường dẫn trang Twitter', 'general', 8, true),
('linkedin_url', '"#"', 'text', 'LinkedIn URL', 'Đường dẫn trang LinkedIn', 'general', 9, true),
('youtube_url', '"#"', 'text', 'YouTube URL', 'Đường dẫn kênh YouTube', 'general', 10, true),

-- Maintenance settings
('maintenance_mode', 'false', 'boolean', 'Chế độ bảo trì', 'Bật/tắt chế độ bảo trì website', 'maintenance', 1, false),
('maintenance_message', '"Website đang được bảo trì. Vui lòng quay lại sau."', 'text', 'Thông báo bảo trì', 'Thông báo hiển thị khi website bảo trì', 'maintenance', 2, false),
('maintenance_end_time', 'null', 'text', 'Thời gian kết thúc bảo trì', 'Thời gian dự kiến kết thúc bảo trì', 'maintenance', 3, false),

-- Analytics
('google_analytics_id', '""', 'text', 'Google Analytics ID', 'Mã Google Analytics tracking', 'seo', 1, false),
('facebook_pixel_id', '""', 'text', 'Facebook Pixel ID', 'Mã Facebook Pixel tracking', 'seo', 2, false);