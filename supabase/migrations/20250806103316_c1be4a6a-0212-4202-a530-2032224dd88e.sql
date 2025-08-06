-- Add parent_id column to support nested menus
ALTER TABLE public.menu_items 
ADD COLUMN parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE;

-- Add index for better performance on parent lookups
CREATE INDEX idx_menu_items_parent_id ON public.menu_items(parent_id);

-- Update display_order for better organization
-- Menu items with parent_id will be sub-items