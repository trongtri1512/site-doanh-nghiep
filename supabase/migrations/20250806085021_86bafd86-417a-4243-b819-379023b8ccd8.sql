-- Create news table
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  published_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "News are viewable by everyone" 
ON public.news 
FOR SELECT 
USING (status = 'published' OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage news" 
ON public.news 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.news (
  title, 
  slug, 
  category, 
  excerpt, 
  content, 
  image_url, 
  author, 
  published_at, 
  status, 
  featured
) VALUES 
(
  'Ra mắt sản phẩm mới từ Pigeon',
  'ra-mat-san-pham-moi-tu-pigeon',
  'Sản phẩm',
  'Pigeon giới thiệu dòng sản phẩm chăm sóc trẻ em mới nhất với công nghệ tiên tiến từ Nhật Bản.',
  'Thương hiệu Pigeon, nổi tiếng với các sản phẩm chăm sóc mẹ và bé chất lượng cao, vừa chính thức ra mắt dòng sản phẩm mới với công nghệ tiên tiến từ Nhật Bản. Dòng sản phẩm này được phát triển đặc biệt để đáp ứng nhu cầu chăm sóc an toàn và hiệu quả cho trẻ em.',
  '/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png',
  'IMV Product Team',
  '2024-01-15 09:00:00+07',
  'published',
  true
),
(
  'Hội thảo làm đẹp cùng Verites',
  'hoi-thao-lam-dep-cung-verites',
  'Sự kiện',
  'Tham gia hội thảo làm đẹp với các chuyên gia từ Verites Nhật Bản để khám phá bí quyết chăm sóc da.',
  'Verites tổ chức hội thảo làm đẹp quy mô lớn với sự tham gia của các chuyên gia hàng đầu từ Nhật Bản. Sự kiện này sẽ chia sẻ những bí quyết chăm sóc da hiệu quả và giới thiệu các sản phẩm mới nhất.',
  '/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png',
  'IMV Marketing Team',
  '2024-01-10 14:00:00+07',
  'published',
  false
),
(
  'Xu hướng chụp ảnh với Instax 2024',
  'xu-huong-chup-anh-voi-instax-2024',
  'Xu hướng',
  'Khám phá những xu hướng chụp ảnh mới nhất với máy ảnh Instax và tạo ra những bức ảnh độc đáo.',
  'Năm 2024 mang đến nhiều xu hướng chụp ảnh mới với máy ảnh Instax. Từ việc chụp ảnh nghệ thuật đến những phong cách vintage, Instax đang tạo nên một làn sóng mới trong cộng đồng nhiếp ảnh.',
  '/lovable-uploads/57f45edb-5893-4b5b-9ee6-f1ff029deda0.png',
  'IMV Content Team',
  '2024-01-05 10:30:00+07',
  'draft',
  false
);