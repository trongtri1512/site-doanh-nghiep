-- Create contact_info table for managing contact information
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  content TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Contact info is viewable by everyone" 
ON public.contact_info 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage contact info" 
ON public.contact_info 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_contact_info_updated_at
BEFORE UPDATE ON public.contact_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default contact sections
INSERT INTO public.contact_info (section_key, title, content, display_order) VALUES
('company_info', 'Thông tin công ty', 'IMV Corporation
Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM
Điện thoại: (028) 1234 5678
Email: info@imv.vn', 1),
('business_hours', 'Giờ làm việc', 'Thứ 2 - Thứ 6: 8:00 - 17:30
Thứ 7: 8:00 - 12:00
Chủ nhật: Nghỉ', 2),
('support', 'Hỗ trợ khách hàng', 'Hotline: 1900 1234
Email: support@imv.vn
Hỗ trợ 24/7', 3);

-- Create contact_messages table for storing contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage contact messages" 
ON public.contact_messages 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();