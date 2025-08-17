-- Add hashtag and SEO fields to news table
ALTER TABLE public.news 
ADD COLUMN IF NOT EXISTS hashtags TEXT[],
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS focus_keyword TEXT;

-- Add hashtag and SEO fields to other content tables that might need them
CREATE TABLE IF NOT EXISTS public.hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  usage_count INTEGER DEFAULT 0,
  language_code TEXT NOT NULL DEFAULT 'vi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on hashtags
ALTER TABLE public.hashtags ENABLE ROW LEVEL SECURITY;

-- Create policies for hashtags
CREATE POLICY "Hashtags are viewable by everyone" 
ON public.hashtags 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage hashtags" 
ON public.hashtags 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for hashtags updated_at
CREATE TRIGGER update_hashtags_updated_at
  BEFORE UPDATE ON public.hashtags
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for article images if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for article images storage
CREATE POLICY IF NOT EXISTS "Article images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY IF NOT EXISTS "Admins can upload article images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY IF NOT EXISTS "Admins can update article images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY IF NOT EXISTS "Admins can delete article images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-images' AND has_role(auth.uid(), 'admin'::app_role));