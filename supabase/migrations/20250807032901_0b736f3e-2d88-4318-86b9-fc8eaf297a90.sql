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

-- Handle brands table constraint (drop existing constraint first)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'brands_slug_key' AND table_name = 'brands') THEN
        ALTER TABLE public.brands DROP CONSTRAINT brands_slug_key;
    END IF;
END $$;

-- Add composite unique constraint for slug and language
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'brands_slug_language_key' AND table_name = 'brands') THEN
        ALTER TABLE public.brands ADD CONSTRAINT brands_slug_language_key UNIQUE(slug, language_code);
    END IF;
END $$;

-- Add some basic English content for testing
INSERT INTO public.menu_items (title, url, target, menu_type, parent_id, display_order, is_active, language_code)
SELECT 'Our company', '/about', '_self', 'main', NULL, 0, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Our company' AND language_code = 'en');

INSERT INTO public.menu_items (title, url, target, menu_type, parent_id, display_order, is_active, language_code)
SELECT 'News', '/news', '_self', 'main', NULL, 1, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'News' AND language_code = 'en');

INSERT INTO public.menu_items (title, url, target, menu_type, parent_id, display_order, is_active, language_code)
SELECT 'Brands', '/brands', '_self', 'main', NULL, 2, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Brands' AND language_code = 'en');

INSERT INTO public.menu_items (title, url, target, menu_type, parent_id, display_order, is_active, language_code)
SELECT 'Careers', '/careers', '_self', 'main', NULL, 3, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Careers' AND language_code = 'en');

INSERT INTO public.menu_items (title, url, target, menu_type, parent_id, display_order, is_active, language_code)
SELECT 'Contact', '/contact', '_self', 'main', NULL, 4, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM public.menu_items WHERE title = 'Contact' AND language_code = 'en');