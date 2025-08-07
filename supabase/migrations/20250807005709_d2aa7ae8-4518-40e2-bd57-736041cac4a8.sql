-- Create table for homepage layouts
CREATE TABLE public.homepage_layouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_type TEXT NOT NULL,
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  styles JSONB DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.homepage_layouts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Homepage layouts are viewable by everyone" 
ON public.homepage_layouts 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage homepage layouts" 
ON public.homepage_layouts 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Create trigger for timestamps
CREATE TRIGGER update_homepage_layouts_updated_at
BEFORE UPDATE ON public.homepage_layouts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default homepage sections
INSERT INTO public.homepage_layouts (section_type, title, content, display_order) VALUES
('hero', 'Hero Section', '{
  "title": "CHÀO MỪNG BẠN ĐẾN VỚI IMV VIETNAM",
  "subtitle": "Nâng tầm cuộc sống, vững vàng tương lai", 
  "cta_text": "Tìm hiểu thêm về Công ty chúng tôi",
  "cta_link": "/about",
  "background_image": "/lovable-uploads/ed58ce9e-f21d-46e4-b22e-021e8a21a686.png"
}', 1),

('stats', 'Stats Section', '{
  "stats": [
    {
      "number": "29",
      "unit": "năm", 
      "description": "nâng tầm cuộc sống, vững vàng tương lai"
    },
    {
      "number": "100%",
      "description": "năng lượng tái tạo được sử dụng",
      "note": "*Thông tin căn cứ vào chứng chỉ IREC do Swiss Carbon Asset Ltd cấp cho IMV Group xác nhận việc sử dụng năng lượng tái tạo tại Việt Nam cho giai đoạn 1/1/2023 đến 31/12/2023"
    },
    {
      "number": "7 triệu",
      "description": "sản phẩm bán ra mỗi ngày", 
      "note": "*Thông tin căn cứ vào thống kê bán hàng nội bộ"
    },
    {
      "number": "Top 1",
      "description": "nơi làm việc tốt nhất Việt Nam",
      "note": "*Thông tin căn cứ vào xếp hạng năm 2024 của Anphabe"
    }
  ]
}', 2),

('brands', 'Brands Section', '{
  "title": "Các nhãn hàng đồng hành",
  "subtitle": "IMV tự hào là đối tác phân phối chính thức của nhiều thương hiệu uy tín hàng đầu thế giới, mang đến cho người tiêu dùng Việt Nam những sản phẩm chất lượng cao và dịch vụ tận tâm.",
  "cta_text": "Tìm hiểu thêm về IMV",
  "cta_link": "/about"
}', 3),

('news', 'News Section', '{
  "title": "Tin tức & Sự kiện",
  "subtitle": "Cập nhật những tin tức mới nhất từ IMV",
  "limit": 3
}', 4);