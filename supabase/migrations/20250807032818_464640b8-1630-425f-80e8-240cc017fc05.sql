-- Add language support to existing tables
ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.footer_sections ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.footer_menu_items ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.careers_content ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.contact_info ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_language ON public.menu_items(language_code);
CREATE INDEX IF NOT EXISTS idx_news_language ON public.news(language_code);
CREATE INDEX IF NOT EXISTS idx_footer_sections_language ON public.footer_sections(language_code);
CREATE INDEX IF NOT EXISTS idx_footer_menu_items_language ON public.footer_menu_items(language_code);
CREATE INDEX IF NOT EXISTS idx_brands_language ON public.brands(language_code);
CREATE INDEX IF NOT EXISTS idx_careers_jobs_language ON public.careers_jobs(language_code);
CREATE INDEX IF NOT EXISTS idx_careers_content_language ON public.careers_content(language_code);
CREATE INDEX IF NOT EXISTS idx_contact_info_language ON public.contact_info(language_code);

-- Handle brands table constraint
ALTER TABLE public.brands DROP CONSTRAINT IF EXISTS brands_slug_key;
ALTER TABLE public.brands ADD CONSTRAINT IF NOT EXISTS brands_slug_language_key UNIQUE(slug, language_code);

-- Add some basic English content for testing
INSERT INTO public.menu_items (title, url, target, menu_type, parent_id, display_order, is_active, language_code)
VALUES 
('Our company', '/about', '_self', 'main', NULL, 0, true, 'en'),
('News', '/news', '_self', 'main', NULL, 1, true, 'en'),
('Brands', '/brands', '_self', 'main', NULL, 2, true, 'en'),
('Careers', '/careers', '_self', 'main', NULL, 3, true, 'en'),
('Contact', '/contact', '_self', 'main', NULL, 4, true, 'en')
ON CONFLICT DO NOTHING;

-- Add sample English news
INSERT INTO public.news (title, slug, content, excerpt, category, author, status, featured, published_at, language_code)
VALUES
('IMV Expands Operations', 'imv-expands-operations-en', 
 'IMV Corporation is proud to announce the expansion of our operations across Southeast Asia.', 
 'IMV announces major expansion across Southeast Asia market', 
 'Business', 'IMV Team', 'published', true, now(), 'en'),
('Innovation in Beauty Technology', 'innovation-beauty-technology-en',
 'Our research and development team continues to push boundaries in beauty technology.',
 'Latest innovations in beauty and personal care technology',
 'Technology', 'IMV Team', 'published', false, now(), 'en')
ON CONFLICT DO NOTHING;