-- Update English Pigeon brand to have English category and unique slug
UPDATE brands 
SET 
  category = 'Baby Care',
  slug = 'pigeon-en'
WHERE language_code = 'en' AND slug = 'pigeon';

-- Add more English brands for completeness
INSERT INTO brands (name, slug, category, description, language_code, active, featured, display_order) VALUES
('Astalift', 'astalift-en', 'Beauty', 'Premium cosmetics from Fujifilm', 'en', true, true, 2),
('Etsuko', 'etsuko-en', 'Fashion', 'Japanese fashion for women', 'en', true, true, 3),
('Fujifilm Image', 'fujifilm-image-en', 'Photo & Printing', 'Professional photo printing solutions', 'en', true, true, 4),
('Instax Camera', 'instax-camera-en', 'Camera', 'Fujifilm instant cameras', 'en', true, true, 5),
('Verites', 'verites-en', 'Beauty', 'Premium cosmetics from Japan', 'en', true, true, 6);