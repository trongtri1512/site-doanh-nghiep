-- Create English brand entry for pigeon-en route
INSERT INTO public.brands (name, slug, category, description, language_code, active, featured) VALUES
('Pigeon', 'pigeon-en', 'Baby Care', 'For over 6 decades, PIGEON has dedicated research capabilities to understand baby feeding behavior, developing products trusted by mothers worldwide.', 'en', true, true)
ON CONFLICT (slug, language_code) DO UPDATE SET
description = EXCLUDED.description,
active = EXCLUDED.active,
featured = EXCLUDED.featured;