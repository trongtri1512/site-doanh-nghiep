-- Add related_article_id column to news table for linking articles across languages
ALTER TABLE public.news 
ADD COLUMN related_article_id uuid REFERENCES public.news(id);

-- Create index for better performance on related article queries
CREATE INDEX idx_news_related_article ON public.news(related_article_id);

-- Create index for language_code queries
CREATE INDEX idx_news_language_code ON public.news(language_code);

-- Add constraint to prevent self-referencing
ALTER TABLE public.news 
ADD CONSTRAINT chk_news_no_self_reference 
CHECK (id != related_article_id);