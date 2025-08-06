-- Create brands table
CREATE TABLE public.brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Create policies for brands
CREATE POLICY "Brands are viewable by everyone" 
ON public.brands 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can manage brands" 
ON public.brands 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_brands_updated_at
BEFORE UPDATE ON public.brands
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for existing brands
INSERT INTO public.brands (name, slug, category, description, image_url, featured, active, display_order) VALUES
('Pigeon', 'pigeon', 'Chăm sóc trẻ em', 'Sản phẩm chăm sóc mẹ và bé từ Nhật Bản', '/src/assets/pigeon-banner.jpg', true, true, 1),
('Verites', 'verites', 'Làm đẹp', 'Mỹ phẩm cao cấp từ Nhật Bản', '/src/assets/verites-banner.jpg', true, true, 2),
('Instax Camera', 'instax-camera', 'Máy ảnh', 'Máy ảnh chụp lấy liền Fujifilm', '/src/assets/instax-banner.jpg', true, true, 3),
('Fujifilm Image', 'fujifilm-image', 'Ảnh & In ấn', 'Giải pháp in ảnh chuyên nghiệp', '/placeholder.svg', true, true, 4),
('Etsuko', 'etsuko', 'Thời trang', 'Thời trang Nhật Bản cho phụ nữ', '/src/assets/etsuko-banner.jpg', false, true, 5),
('Astalift', 'astalift', 'Làm đẹp', 'Mỹ phẩm chống lão hóa Fujifilm', '/src/assets/astalift-banner.png', false, true, 6);