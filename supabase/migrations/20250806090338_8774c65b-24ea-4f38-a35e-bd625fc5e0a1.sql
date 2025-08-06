-- Create storage bucket for news images
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Create storage policies for news images
CREATE POLICY "Allow public access to news images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'news-images');

CREATE POLICY "Allow admins to upload news images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'news-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow admins to update news images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'news-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow admins to delete news images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'news-images' AND has_role(auth.uid(), 'admin'));

-- Add scheduled_at column to news table for scheduling posts
ALTER TABLE public.news ADD COLUMN scheduled_at TIMESTAMP WITH TIME ZONE;

-- Create function to auto-publish scheduled news
CREATE OR REPLACE FUNCTION public.auto_publish_scheduled_news()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.news 
  SET status = 'published', 
      published_at = now()
  WHERE status = 'scheduled' 
    AND scheduled_at <= now()
    AND scheduled_at IS NOT NULL;
END;
$$;