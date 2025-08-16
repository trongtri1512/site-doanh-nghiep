/*
  # Tạo tài khoản admin

  1. Tạo user admin trong auth.users
  2. Thêm profile cho user
  3. Gán role admin cho user
  4. Cập nhật thông tin cần thiết

  Thông tin đăng nhập:
  - Email: admin@imv.com.vn
  - Password: admin123456
*/

-- Tạo user admin trong auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@imv.com.vn',
  crypt('admin123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Admin IMV"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Lấy ID của user vừa tạo
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@imv.com.vn';
    
    -- Tạo profile cho user
    INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
    VALUES (admin_user_id, 'admin@imv.com.vn', 'Admin IMV', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        updated_at = NOW();
    
    -- Gán role admin cho user
    INSERT INTO public.user_roles (user_id, role, created_at)
    VALUES (admin_user_id, 'admin', NOW())
    ON CONFLICT (user_id, role) DO NOTHING;
    
END $$;