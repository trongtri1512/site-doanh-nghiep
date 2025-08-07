-- Add display_type column to menu_items table
ALTER TABLE menu_items ADD COLUMN display_type text DEFAULT 'dropdown';

-- Update existing brands menu items to use dropdown by default
UPDATE menu_items 
SET display_type = 'dropdown' 
WHERE title ILIKE '%brand%' OR url ILIKE '%brand%';

-- Remove the old brands_menu_type setting from site_settings
DELETE FROM site_settings WHERE setting_key = 'brands_menu_type';

-- Add comment for the new column
COMMENT ON COLUMN menu_items.display_type IS 'Display type for menu items: dropdown or megamenu';