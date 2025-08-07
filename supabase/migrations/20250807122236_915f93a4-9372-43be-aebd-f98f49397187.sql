-- Add setting for menu display type
INSERT INTO site_settings (
  setting_key,
  display_name,
  description,
  setting_type,
  setting_value,
  category,
  is_public,
  display_order
) VALUES (
  'brands_menu_type',
  'Brands Menu Display Type',
  'Choose between dropdown or mega menu for brands',
  'select',
  '{"value": "dropdown", "options": [{"label": "Dropdown Menu", "value": "dropdown"}, {"label": "Mega Menu", "value": "megamenu"}]}',
  'menu',
  true,
  10
) ON CONFLICT (setting_key) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  setting_type = EXCLUDED.setting_type,
  setting_value = EXCLUDED.setting_value,
  category = EXCLUDED.category,
  is_public = EXCLUDED.is_public,
  display_order = EXCLUDED.display_order;