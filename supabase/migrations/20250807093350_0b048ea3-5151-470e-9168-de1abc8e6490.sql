-- Add language_code column to homepage_layouts table to support multilingual content
ALTER TABLE public.homepage_layouts 
ADD COLUMN language_code text NOT NULL DEFAULT 'vi';

-- Create index for faster queries by language
CREATE INDEX idx_homepage_layouts_language ON public.homepage_layouts(language_code, is_active, display_order);

-- Update existing records to have Vietnamese as default language
UPDATE public.homepage_layouts SET language_code = 'vi' WHERE language_code IS NULL;

-- Add unique constraint to prevent duplicate sections for same language
ALTER TABLE public.homepage_layouts 
ADD CONSTRAINT unique_section_per_language 
UNIQUE (section_type, language_code);