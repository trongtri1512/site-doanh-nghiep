-- Create footer_sections table for managing footer content
CREATE TABLE public.footer_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_type TEXT NOT NULL, -- 'company_info', 'quick_links', 'sustainability', 'contact'
  title TEXT,
  content JSONB, -- flexible content storage
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create footer_menu_items table for managing footer menu links
CREATE TABLE public.footer_menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES public.footer_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  target TEXT DEFAULT '_self', -- '_self', '_blank', etc.
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.footer_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for footer_sections
CREATE POLICY "Admins can manage footer sections" 
ON public.footer_sections 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Footer sections are viewable by everyone" 
ON public.footer_sections 
FOR SELECT 
USING (is_active = true);

-- Create policies for footer_menu_items
CREATE POLICY "Admins can manage footer menu items" 
ON public.footer_menu_items 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Footer menu items are viewable by everyone" 
ON public.footer_menu_items 
FOR SELECT 
USING (is_active = true);

-- Create triggers for timestamps
CREATE TRIGGER update_footer_sections_updated_at
BEFORE UPDATE ON public.footer_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_footer_menu_items_updated_at
BEFORE UPDATE ON public.footer_menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default footer sections
INSERT INTO public.footer_sections (section_type, title, content, display_order) VALUES
('company_info', 'Thông tin công ty', '{"description": "IMV Vietnam - Nâng tầm cuộc sống, vững vàng tương lai", "logo_url": "/lovable-uploads/7b254a6b-841e-44ed-ba5d-5a43caa59b9a.png", "social_links": [{"name": "Facebook", "url": "#", "icon": "Facebook"}, {"name": "Twitter", "url": "#", "icon": "Twitter"}, {"name": "LinkedIn", "url": "#", "icon": "Linkedin"}, {"name": "YouTube", "url": "#", "icon": "Youtube"}]}', 1),
('quick_links', 'Liên kết nhanh', '{}', 2),
('sustainability', 'Phát triển bền vững', '{}', 3),
('contact', 'Liên hệ', '{"address": "123 Đường ABC, Quận 1, TP.HCM", "phone": "(028) 1234 5678", "email": "info@imv.com.vn"}', 4);

-- Insert default menu items
INSERT INTO public.footer_menu_items (section_id, title, url, display_order) VALUES
-- Quick links
((SELECT id FROM public.footer_sections WHERE section_type = 'quick_links'), 'Về chúng tôi', '/about', 1),
((SELECT id FROM public.footer_sections WHERE section_type = 'quick_links'), 'Các nhãn hàng', '/brands', 2),
((SELECT id FROM public.footer_sections WHERE section_type = 'quick_links'), 'Tin tức', '/news', 3),
((SELECT id FROM public.footer_sections WHERE section_type = 'quick_links'), 'Tuyển dụng', '/careers', 4),
((SELECT id FROM public.footer_sections WHERE section_type = 'quick_links'), 'Liên hệ', '/contact', 5),
-- Sustainability
((SELECT id FROM public.footer_sections WHERE section_type = 'sustainability'), 'Cam kết bền vững', '/sustainability/commitment', 1),
((SELECT id FROM public.footer_sections WHERE section_type = 'sustainability'), 'Báo cáo bền vững', '/sustainability/reports', 2),
((SELECT id FROM public.footer_sections WHERE section_type = 'sustainability'), 'Môi trường', '/sustainability/environment', 3),
((SELECT id FROM public.footer_sections WHERE section_type = 'sustainability'), 'Cộng đồng', '/sustainability/community', 4);