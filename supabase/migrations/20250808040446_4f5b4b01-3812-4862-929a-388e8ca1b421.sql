-- Create table for page builders data
CREATE TABLE public.page_layouts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    page_type TEXT NOT NULL CHECK (page_type IN ('homepage', 'about', 'careers', 'contact', 'news')),
    section_type TEXT NOT NULL,
    title TEXT,
    content JSONB NOT NULL DEFAULT '{}',
    styles JSONB DEFAULT '{}',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    language_code TEXT NOT NULL DEFAULT 'vi',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.page_layouts ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view page layouts" 
ON public.page_layouts 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND (
  SELECT has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'content_editor')
));

CREATE POLICY "Admins can create page layouts" 
ON public.page_layouts 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND (
  SELECT has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'content_editor')
));

CREATE POLICY "Admins can update page layouts" 
ON public.page_layouts 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND (
  SELECT has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'content_editor')
));

CREATE POLICY "Admins can delete page layouts" 
ON public.page_layouts 
FOR DELETE 
USING (auth.uid() IS NOT NULL AND (
  SELECT has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'content_editor')
));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_page_layouts_updated_at
BEFORE UPDATE ON public.page_layouts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_page_layouts_page_type ON public.page_layouts(page_type);
CREATE INDEX idx_page_layouts_language_code ON public.page_layouts(language_code);
CREATE INDEX idx_page_layouts_is_active ON public.page_layouts(is_active);
CREATE INDEX idx_page_layouts_display_order ON public.page_layouts(display_order);