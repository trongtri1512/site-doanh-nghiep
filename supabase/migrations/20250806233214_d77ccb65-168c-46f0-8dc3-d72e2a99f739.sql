-- Tạo bảng permissions để định nghĩa các quyền chi tiết
CREATE TABLE public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tạo bảng role_permissions để gán quyền cho từng role
CREATE TABLE public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role app_role NOT NULL,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(role, permission_id)
);

-- Enable RLS
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Tạo policies cho permissions
CREATE POLICY "Admins can manage permissions" 
ON public.permissions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Permissions are viewable by authenticated users" 
ON public.permissions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Tạo policies cho role_permissions
CREATE POLICY "Admins can manage role permissions" 
ON public.role_permissions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Role permissions are viewable by authenticated users" 
ON public.role_permissions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Thêm các permissions cơ bản
INSERT INTO public.permissions (name, description, category) VALUES
('manage_users', 'Quản lý người dùng và phân quyền', 'user_management'),
('manage_news', 'Quản lý tin tức', 'content'),
('manage_careers', 'Quản lý tuyển dụng', 'hr'),
('manage_brands', 'Quản lý thương hiệu', 'content'),
('manage_site_settings', 'Quản lý cài đặt website', 'system'),
('manage_menus', 'Quản lý menu', 'content'),
('view_dashboard', 'Xem dashboard tổng quan', 'general');

-- Gán tất cả quyền cho admin
INSERT INTO public.role_permissions (role, permission_id) 
SELECT 'admin'::app_role, id FROM public.permissions;

-- Tạo function để kiểm tra quyền của user
CREATE OR REPLACE FUNCTION public.user_has_permission(_user_id uuid, _permission_name text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role = rp.role
    JOIN public.permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = _user_id
      AND p.name = _permission_name
  )
$$;

-- Thêm các role mới
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'hr_manager';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'content_editor';