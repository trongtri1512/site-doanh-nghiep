-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.auto_publish_scheduled_news()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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