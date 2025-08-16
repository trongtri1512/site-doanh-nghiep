/*
  # Tạo tài khoản admin mới

  1. Tạo user admin trong auth.users với mã hóa mật khẩu đúng
  2. Thêm profile cho user
  3. Gán role admin cho user
  4. Đảm bảo user có thể đăng nhập

  Thông tin đăng nhập:
  - Email: admin@imv.com.vn
  - Password: admin123456
*/

-- Xóa user admin cũ nếu tồn tại
DELETE FROM auth.users WHERE email = 'admin@imv.com.vn';

-- Tạo user admin mới với mật khẩu được mã hóa đúng cách
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
  '$2a$10$8K1p/a0dUrZBNvRqGNu5.OIgZEXXBtxhtNjjm5qfGpKGsrqbVEFm6', -- admin123456
  NOW(),
  NULL,
  NULL,
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Admin IMV"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Lấy ID của user vừa tạo và tạo profile + role
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@imv.com.vn';
    
    -- Xóa profile và role cũ nếu tồn tại
    DELETE FROM public.profiles WHERE id = admin_user_id;
    DELETE FROM public.user_roles WHERE user_id = admin_user_id;
    
    -- Tạo profile cho user
    INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
    VALUES (admin_user_id, 'admin@imv.com.vn', 'Admin IMV', NOW(), NOW());
    
    -- Gán role admin cho user
    INSERT INTO public.user_roles (user_id, role, created_at)
    VALUES (admin_user_id, 'admin', NOW());
    
    RAISE NOTICE 'Admin user created successfully with ID: %', admin_user_id;
END $$;