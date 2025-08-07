-- Fix the brands_menu_type setting value
UPDATE site_settings 
SET setting_value = '{"options": [{"label": "Dropdown Menu", "value": "dropdown"}, {"label": "Mega Menu", "value": "megamenu"}], "value": "dropdown"}'::jsonb
WHERE setting_key = 'brands_menu_type';