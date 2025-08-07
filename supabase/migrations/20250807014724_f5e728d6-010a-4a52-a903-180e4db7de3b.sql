-- Create table for brand page layouts
CREATE TABLE public.brand_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID NOT NULL,
  section_type TEXT NOT NULL,
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  styles JSONB DEFAULT '{}'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.brand_pages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Brand pages are viewable by everyone" 
ON public.brand_pages 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage brand pages" 
ON public.brand_pages 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_brand_pages_updated_at
BEFORE UPDATE ON public.brand_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_brand_pages_brand_id ON public.brand_pages(brand_id);
CREATE INDEX idx_brand_pages_display_order ON public.brand_pages(brand_id, display_order);