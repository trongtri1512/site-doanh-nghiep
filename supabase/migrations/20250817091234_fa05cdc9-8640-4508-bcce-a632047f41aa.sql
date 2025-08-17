-- Add related_article_id column to news table
ALTER TABLE public.news 
ADD COLUMN related_article_id UUID REFERENCES public.news(id);