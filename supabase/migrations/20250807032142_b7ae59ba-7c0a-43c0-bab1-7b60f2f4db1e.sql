-- Add language support to existing tables (safe additions)
ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.footer_sections ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.footer_menu_items ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.careers_jobs ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.careers_content ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';
ALTER TABLE public.contact_info ADD COLUMN IF NOT EXISTS language_code TEXT NOT NULL DEFAULT 'vi';

-- Create indexes for better performance (if not exists)
CREATE INDEX IF NOT EXISTS idx_menu_items_language ON public.menu_items(language_code);
CREATE INDEX IF NOT EXISTS idx_news_language ON public.news(language_code);
CREATE INDEX IF NOT EXISTS idx_footer_sections_language ON public.footer_sections(language_code);
CREATE INDEX IF NOT EXISTS idx_footer_menu_items_language ON public.footer_menu_items(language_code);
CREATE INDEX IF NOT EXISTS idx_brands_language ON public.brands(language_code);
CREATE INDEX IF NOT EXISTS idx_careers_jobs_language ON public.careers_jobs(language_code);
CREATE INDEX IF NOT EXISTS idx_careers_content_language ON public.careers_content(language_code);
CREATE INDEX IF NOT EXISTS idx_contact_info_language ON public.contact_info(language_code);

-- Remove unique constraint on brands slug to allow multiple languages
DROP INDEX IF EXISTS brands_slug_key;
ALTER TABLE public.brands DROP CONSTRAINT IF EXISTS brands_slug_key;

-- Add composite unique constraint for slug and language
ALTER TABLE public.brands ADD CONSTRAINT brands_slug_language_key UNIQUE(slug, language_code);

-- Duplicate brands for English with different handling
INSERT INTO public.brands (name, slug, category, description, image_url, featured, active, display_order, language_code)
SELECT 
  name, 
  slug, -- Keep same slug but different language_code
  category,
  CASE 
    WHEN name = 'Pigeon' THEN 'Premium baby care products from Japan'
    WHEN name = 'Verites' THEN 'Professional skincare solutions'
    WHEN name = 'Instax Camera' THEN 'Instant photography cameras and films'
    WHEN name = 'Fujifilm Image' THEN 'Professional imaging solutions'
    WHEN name = 'Etsuko' THEN 'Quality beauty and personal care'
    WHEN name = 'Astalift' THEN 'Advanced anti-aging skincare'
    ELSE description
  END as description,
  image_url, featured, active, display_order, 'en'
FROM public.brands 
WHERE language_code = 'vi'
AND NOT EXISTS (
  SELECT 1 FROM public.brands b2 
  WHERE b2.slug = public.brands.slug 
  AND b2.language_code = 'en'
);

-- Duplicate menu items for English  
INSERT INTO public.menu_items (title, url, target, menu_type, parent_id, display_order, is_active, language_code)
SELECT 
  CASE 
    WHEN title = 'Về chúng tôi' THEN 'Our company'
    WHEN title = 'Tin tức' THEN 'News'
    WHEN title = 'Thương hiệu' THEN 'Brands'
    WHEN title = 'Phát triển bền vững' THEN 'Sustainability'
    WHEN title = 'Nhà cung cấp' THEN 'Suppliers'
    WHEN title = 'Tuyển dụng' THEN 'Careers'
    WHEN title = 'Nhà đầu tư' THEN 'Investors'
    WHEN title = 'Liên hệ' THEN 'Contact'
    ELSE title
  END as title,
  url, target, menu_type, parent_id, display_order, is_active, 'en'
FROM public.menu_items 
WHERE language_code = 'vi'
AND NOT EXISTS (
  SELECT 1 FROM public.menu_items m2 
  WHERE m2.title = CASE 
    WHEN public.menu_items.title = 'Về chúng tôi' THEN 'Our company'
    WHEN public.menu_items.title = 'Tin tức' THEN 'News'
    WHEN public.menu_items.title = 'Thương hiệu' THEN 'Brands'
    WHEN public.menu_items.title = 'Phát triển bền vững' THEN 'Sustainability'
    WHEN public.menu_items.title = 'Nhà cung cấp' THEN 'Suppliers'
    WHEN public.menu_items.title = 'Tuyển dụng' THEN 'Careers'
    WHEN public.menu_items.title = 'Nhà đầu tư' THEN 'Investors'
    WHEN public.menu_items.title = 'Liên hệ' THEN 'Contact'
    ELSE public.menu_items.title
  END
  AND m2.language_code = 'en'
);