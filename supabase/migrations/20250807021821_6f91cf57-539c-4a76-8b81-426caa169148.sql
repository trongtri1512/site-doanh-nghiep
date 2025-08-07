-- Populate brand_pages table with content from existing static brand pages

-- First, let's get the brand IDs
-- Insert content for Astalift brand
INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'hero',
  'Hero Section',
  jsonb_build_object(
    'title', 'Astalift Vietnam',
    'subtitle', 'Thương hiệu mỹ phẩm độc đáo, được phát triển và sản xuất bởi tập đoàn công nghệ Fujifilm của Nhật Bản',
    'background_image', '/src/assets/astalift-banner.png',
    'cta_text', 'Tìm hiểu thêm',
    'cta_link', '#about'
  ),
  jsonb_build_object(),
  0,
  true
FROM brands b WHERE b.slug = 'astalift';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'about',
  'Lịch sử và Triết lý thương hiệu',
  jsonb_build_object(
    'title', 'Lịch sử và Triết lý thương hiệu',
    'description', 'Năm 2007: Fujifilm chính thức ra mắt thương hiệu mỹ phẩm Astalift tại Nhật Bản, đánh dấu một bước đột phá bất ngờ từ một công ty chuyên về phim ảnh sang lĩnh vực chăm sóc da.\n\nLý do ra đời: Trong suốt 80 năm phát triển ngành phim ảnh, Fujifilm đã tích lũy kiến thức sâu rộng về các công nghệ liên quan đến Collagen, chất chống oxy hóa và công nghệ Nano, những yếu tố cốt lõi trong việc bảo quản màu sắc của phim ảnh.\n\n"Beauty Is A Science": Đây là triết lý trung tâm của Astalift. Thương hiệu này tin rằng vẻ đẹp bền vững không chỉ đến từ các thành phần tự nhiên mà còn từ sự ứng dụng của khoa học và công nghệ tiên tiến.\n\n"Tomorrow will be more beautiful than today": Tên "Astalift" thể hiện triết lý này - "Asta" từ "Ashita" (ngày mai), "Lift" thể hiện sự nâng cao vẻ đẹp.',
    'features', jsonb_build_array(
      jsonb_build_object('title', 'Nghiên cứu về Collagen', 'description', 'Ba loại collagen đặc biệt cho Astalift'),
      jsonb_build_object('title', 'Công nghệ chống oxy hóa', 'description', 'Bảo vệ da khỏi tia UV và tác nhân gây hại'),
      jsonb_build_object('title', 'Công nghệ Nano', 'description', 'Giảm kích thước phân tử để thẩm thấu sâu hơn'),
      jsonb_build_object('title', 'Astaxanthin', 'description', 'Chất chống oxy hóa mạnh hơn CoQ10 gấp 1000 lần'),
      jsonb_build_object('title', 'Nano Lycopene', 'description', 'Chiết xuất từ cà chua, bảo vệ và trẻ hóa da')
    )
  ),
  jsonb_build_object(),
  1,
  true
FROM brands b WHERE b.slug = 'astalift';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'products',
  'Sản phẩm nổi bật',
  jsonb_build_object(
    'title', 'Sản phẩm nổi bật',
    'products', jsonb_build_array(
      jsonb_build_object(
        'name', 'Jelly Aquarysta',
        'description', 'Thạch dưỡng da chứa ceramide công nghệ nano, cung cấp độ ẩm sâu và củng cố hàng rào bảo vệ da.',
        'image', ''
      ),
      jsonb_build_object(
        'name', 'D-UV Clear White Solution',
        'description', 'Kem chống nắng SPF 50 PA++++, chống tia UV, dưỡng trắng và cấp ẩm với công nghệ độc quyền Fujifilm.',
        'image', ''
      ),
      jsonb_build_object(
        'name', 'Nước uống Collagen',
        'description', 'Sản phẩm bổ sung collagen dạng nước, hỗ trợ tái tạo và ngăn ngừa lão hóa da từ bên trong.',
        'image', ''
      )
    )
  ),
  jsonb_build_object(),
  2,
  true
FROM brands b WHERE b.slug = 'astalift';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'cta',
  'Cam kết Astalift',
  jsonb_build_object(
    'title', 'Cam kết Astalift',
    'description', 'Kết hợp hoàn hảo giữa khoa học và tự nhiên để mang đến làn da trẻ trung, khỏe mạnh và rạng rỡ vượt thời gian. Vẻ đẹp là một khoa học - ngày mai sẽ đẹp hơn ngày hôm nay.',
    'button_text', 'Liên hệ ngay',
    'button_link', '/contact'
  ),
  jsonb_build_object(),
  3,
  true
FROM brands b WHERE b.slug = 'astalift';

-- Insert content for Verites brand
INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'hero',
  'Hero Section',
  jsonb_build_object(
    'title', 'Verites Vietnam',
    'subtitle', 'Thương hiệu mỹ phẩm, đặc biệt là nước hoa và các sản phẩm chăm sóc cơ thể có hương thơm',
    'background_image', '/src/assets/verites-banner.jpg',
    'cta_text', 'Khám phá ngay',
    'cta_link', '#about'
  ),
  jsonb_build_object(),
  0,
  true
FROM brands b WHERE b.slug = 'verites';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'about',
  'Lịch sử và Triết lý thương hiệu',
  jsonb_build_object(
    'title', 'Lịch sử và Triết lý thương hiệu',
    'description', '"Nghệ thuật của sự thật": Tên thương hiệu Verites được lấy cảm hứng từ từ "Vérité" trong tiếng Pháp, có nghĩa là "sự thật". Triết lý của thương hiệu là tôn vinh sự thật đằng sau mỗi mùi hương, không phụ thuộc vào vẻ ngoài lấp lánh hay sự phô trương.\n\nThương hiệu Việt Nam dành cho người Việt trẻ: Verites được giới thiệu là một thương hiệu nước hoa có xuất xứ tại Việt Nam, dành riêng cho giới trẻ Việt Nam (độ tuổi 20-25) với mức giá phải chăng.\n\nSang trọng, tối giản, và giá cả hợp lý: Verites mang đến những mùi hương trứ danh trong bao bì tối giản, thanh lịch nhưng vẫn có mức giá phải chăng để mọi người đều có thể sử dụng nước hoa mỗi ngày.',
    'features', jsonb_build_array(
      jsonb_build_object('title', 'Nước hoa Eau de Parfum (EDP)', 'description', 'Dòng chính với nồng độ tinh dầu cao'),
      jsonb_build_object('title', 'Nước hoa dành cho nam', 'description', 'Mùi hương mạnh mẽ, nam tính'),
      jsonb_build_object('title', 'Nước hoa dành cho nữ', 'description', 'Mùi hương ngọt ngào, quyến rũ'),
      jsonb_build_object('title', 'Nước hoa unisex', 'description', 'Phù hợp cho cả nam và nữ'),
      jsonb_build_object('title', 'Sản phẩm chăm sóc cơ thể', 'description', 'Với hương thơm đặc trưng')
    )
  ),
  jsonb_build_object(),
  1,
  true
FROM brands b WHERE b.slug = 'verites';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'features',
  'Đặc điểm nổi bật',
  jsonb_build_object(
    'title', 'Đặc điểm nổi bật',
    'features', jsonb_build_array(
      jsonb_build_object(
        'title', 'Mùi hương thuộc về cá nhân',
        'description', 'Verites tin rằng mùi hương là một câu chuyện trên làn da và trong ký ức của mỗi người.',
        'icon', 'user'
      ),
      jsonb_build_object(
        'title', 'Giá cả phải chăng',
        'description', 'Mang đến nước hoa chất lượng cao với mức giá hợp lý cho giới trẻ Việt Nam.',
        'icon', 'dollar-sign'
      ),
      jsonb_build_object(
        'title', 'Thiết kế tối giản',
        'description', 'Bao bì tối giản, thanh lịch, tập trung vào chất lượng sản phẩm bên trong.',
        'icon', 'minimize'
      )
    )
  ),
  jsonb_build_object(),
  2,
  true
FROM brands b WHERE b.slug = 'verites';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'cta',
  'Triết lý Verites',
  jsonb_build_object(
    'title', 'Triết lý Verites',
    'description', 'Mùi hương thuộc về cá nhân, là một câu chuyện trên làn da và trong ký ức của mỗi người. Verites tôn vinh sự thật đằng sau mỗi mùi hương, mang đến vẻ đẹp tự nhiên và chân thực nhất.',
    'button_text', 'Khám phá sản phẩm',
    'button_link', '/contact'
  ),
  jsonb_build_object(),
  3,
  true
FROM brands b WHERE b.slug = 'verites';

-- Insert content for Pigeon brand
INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'hero',
  'Hero Section',
  jsonb_build_object(
    'title', 'Pigeon Vietnam',
    'subtitle', 'Thương hiệu hàng đầu thế giới về các sản phẩm chăm sóc mẹ và bé',
    'background_image', '/src/assets/pigeon-banner.jpg',
    'cta_text', 'Tìm hiểu thêm',
    'cta_link', '#about'
  ),
  jsonb_build_object(),
  0,
  true
FROM brands b WHERE b.slug = 'pigeon';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'about',
  'Lịch sử và Triết lý thương hiệu',
  jsonb_build_object(
    'title', 'Lịch sử và Triết lý thương hiệu',
    'description', 'Nguồn gốc: Pigeon được thành lập vào năm 1957 tại Nhật Bản bởi ông Yuichi Nakata, với tầm nhìn cung cấp các sản phẩm chất lượng, tiện lợi và an toàn cho các bà mẹ trên toàn thế giới.\n\nLogo: Logo của Pigeon gồm hai trái tim lồng vào nhau, tượng trưng cho mối liên kết giữa trái tim lớn của mẹ và trái tim nhỏ của bé. Hình ảnh này thể hiện tình yêu và sự bao bọc vô tận của mẹ dành cho con.\n\nTriết lý cốt lõi: Pigeon tập trung vào sự đổi mới dựa trên nghiên cứu khoa học, đặc biệt là nghiên cứu về hành vi bú mẹ của trẻ sơ sinh trong hơn 50 năm. Điều này đã tạo nên nền tảng cho việc phát triển các sản phẩm như núm ti và bình sữa.',
    'features', jsonb_build_array(
      jsonb_build_object('title', 'Bình sữa và núm ti', 'description', 'Dòng sản phẩm cốt lõi với bình sữa Softouch, núm ti Peristaltic PLUS'),
      jsonb_build_object('title', 'Sản phẩm chăm sóc da em bé', 'description', 'Kem dưỡng ẩm, dầu massage, phấn rôm'),
      jsonb_build_object('title', 'Đồ dùng cho mẹ bầu', 'description', 'Áo ngực cho mẹ bầu, máy hút sữa'),
      jsonb_build_object('title', 'Phụ kiện cho em bé', 'description', 'Ty ngậm, cốc tập uống, đồ chơi'),
      jsonb_build_object('title', 'Sản phẩm vệ sinh cá nhân', 'description', 'Khăn ướt, tã giấy, sản phẩm tắm gội')
    )
  ),
  jsonb_build_object(),
  1,
  true
FROM brands b WHERE b.slug = 'pigeon';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'features',
  'Đặc điểm nổi bật',
  jsonb_build_object(
    'title', 'Đặc điểm nổi bật',
    'features', jsonb_build_array(
      jsonb_build_object(
        'title', 'Nghiên cứu khoa học',
        'description', 'Hơn 50 năm nghiên cứu về hành vi bú mẹ của trẻ sơ sinh để phát triển sản phẩm tối ưu nhất.',
        'icon', 'microscope'
      ),
      jsonb_build_object(
        'title', 'An toàn tuyệt đối',
        'description', 'Tất cả sản phẩm đều được kiểm định nghiêm ngặt, đảm bảo an toàn cho mẹ và bé.',
        'icon', 'shield'
      ),
      jsonb_build_object(
        'title', 'Đồng hành cùng mẹ',
        'description', 'Hỗ trợ toàn diện cho hành trình làm mẹ từ thai kỳ đến khi bé lớn.',
        'icon', 'heart'
      )
    )
  ),
  jsonb_build_object(),
  2,
  true
FROM brands b WHERE b.slug = 'pigeon';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'cta',
  'Cam kết của Pigeon',
  jsonb_build_object(
    'title', 'Cam kết của Pigeon',
    'description', 'Mang đến sự an toàn, chất lượng và tình yêu thương trong từng sản phẩm để hỗ trợ hành trình nuôi dạy con của các bậc phụ huynh, tạo nên những khoảnh khắc hạnh phúc và đáng nhớ cho cả gia đình.',
    'button_text', 'Liên hệ ngay',
    'button_link', '/contact'
  ),
  jsonb_build_object(),
  3,
  true
FROM brands b WHERE b.slug = 'pigeon';

-- Insert content for Etsuko brand
INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'hero',
  'Hero Section',
  jsonb_build_object(
    'title', 'Etsuko Vietnam',
    'subtitle', 'Thương hiệu chuyên sản phẩm chăm sóc bé',
    'background_image', '/src/assets/etsuko-banner.jpg',
    'cta_text', 'Khám phá ngay',
    'cta_link', '#about'
  ),
  jsonb_build_object(),
  0,
  true
FROM brands b WHERE b.slug = 'etsuko';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'about',
  'Lịch sử và Triết lý thương hiệu',
  jsonb_build_object(
    'title', 'Lịch sử và Triết lý thương hiệu',
    'description', 'Nguồn gốc tên gọi: Tên thương hiệu Etsuko được lấy cảm hứng từ ý nghĩa "Em bé hạnh phúc" trong tiếng Nhật.\n\nTriết lý cốt lõi: Etsuko ra đời với mong muốn mang lại thật "nhiều niềm hạnh phúc" cho bé thông qua các sản phẩm chăm sóc da an toàn và hiệu quả. Triết lý này tập trung vào việc bảo vệ và chăm sóc làn da nhạy cảm của trẻ, giúp bé luôn khỏe mạnh và vui vẻ.\n\nXuất xứ: Thương hiệu Etsuko có xuất xứ tại Việt Nam, tuy nhiên các sản phẩm lại được lấy cảm hứng và sử dụng các thành phần từ Nhật Bản.',
    'features', jsonb_build_array(
      jsonb_build_object('title', 'Sữa tắm gội Etsuko Hương dưa lưới (400ml)', 'description', 'Sản phẩm được biết đến rộng rãi'),
      jsonb_build_object('title', 'Sữa tắm gội Etsuko Hương quý', 'description', 'Dành cho làn da nhạy cảm'),
      jsonb_build_object('title', 'Các sản phẩm chăm sóc da khác', 'description', 'Kem dưỡng ẩm, dầu massage cho bé'),
      jsonb_build_object('title', 'Sản phẩm vệ sinh', 'description', 'An toàn cho trẻ em'),
      jsonb_build_object('title', 'Phụ kiện chăm sóc bé', 'description', 'Đồ dùng hàng ngày cho trẻ')
    )
  ),
  jsonb_build_object(),
  1,
  true
FROM brands b WHERE b.slug = 'etsuko';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'features',
  'Đặc điểm nổi bật',
  jsonb_build_object(
    'title', 'Đặc điểm nổi bật',
    'features', jsonb_build_array(
      jsonb_build_object(
        'title', 'An toàn tuyệt đối',
        'description', 'Sản phẩm được thiết kế đặc biệt để bảo vệ làn da nhạy cảm của trẻ em, đảm bảo an toàn tuyệt đối.',
        'icon', 'shield'
      ),
      jsonb_build_object(
        'title', 'Thành phần tự nhiên',
        'description', 'Sử dụng các thành phần lấy cảm hứng từ Nhật Bản, tự nhiên và lành tính cho da bé.',
        'icon', 'leaf'
      ),
      jsonb_build_object(
        'title', 'Niềm vui cho bé',
        'description', 'Mang đến niềm hạnh phúc cho bé qua từng lần sử dụng sản phẩm với hương thơm dễ chịu.',
        'icon', 'smile'
      )
    )
  ),
  jsonb_build_object(),
  2,
  true
FROM brands b WHERE b.slug = 'etsuko';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'cta',
  'Triết lý Etsuko',
  jsonb_build_object(
    'title', 'Triết lý Etsuko',
    'description', 'Em bé hạnh phúc - Etsuko ra đời với mong muốn mang lại nhiều niềm hạnh phúc cho bé thông qua các sản phẩm chăm sóc da an toàn và hiệu quả, giúp bé luôn khỏe mạnh và vui vẻ.',
    'button_text', 'Tìm hiểu thêm',
    'button_link', '/contact'
  ),
  jsonb_build_object(),
  3,
  true
FROM brands b WHERE b.slug = 'etsuko';

-- Insert content for Instax Camera brand
INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'hero',
  'Hero Section',
  jsonb_build_object(
    'title', 'Instax Vietnam',
    'subtitle', 'Thương hiệu máy ảnh và phim chụp lấy liền nổi tiếng, được sản xuất và tiếp thị bởi Fujifilm',
    'background_image', '/src/assets/instax-banner.jpg',
    'cta_text', 'Khám phá ngay',
    'cta_link', '#about'
  ),
  jsonb_build_object(),
  0,
  true
FROM brands b WHERE b.slug = 'instax-camera';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'about',
  'Lịch sử và Triết lý thương hiệu',
  jsonb_build_object(
    'title', 'Lịch sử và Triết lý thương hiệu',
    'description', 'Instax ra đời vào năm 1998, với sản phẩm đầu tiên là Instax Mini 10.\n\nThương hiệu này được xây dựng trên triết lý "để ảnh nói cho mà nghe", tập trung vào việc lưu giữ những khoảnh khắc đáng nhớ một cách tức thì và trọn vẹn.\n\nInstax đã vượt qua ranh giới của một chiếc máy ảnh, trở thành một thương hiệu phong cách sống. Những bức ảnh Instax không chỉ là kỷ niệm mà còn là phụ kiện trang trí, vật lưu niệm tại các sự kiện, đám cưới.\n\nKhách hàng mục tiêu của Instax chủ yếu là Gen Z và Millennials, những người trẻ tuổi yêu thích sự sáng tạo và chia sẻ.',
    'features', jsonb_build_array(
      jsonb_build_object('title', 'Instax Mini', 'description', 'Dòng máy ảnh phổ biến nhất, cho ra ảnh kích thước thẻ tín dụng'),
      jsonb_build_object('title', 'Instax Square', 'description', 'Cho ra những bức ảnh vuông cổ điển, phù hợp với sáng tạo'),
      jsonb_build_object('title', 'Instax Wide', 'description', 'Dòng máy cho ảnh khổ lớn, thích hợp chụp phong cảnh'),
      jsonb_build_object('title', 'Máy in ảnh di động', 'description', 'In ảnh trực tiếp từ điện thoại (Mini Link, Square Link)'),
      jsonb_build_object('title', 'Phụ kiện', 'description', 'Album ảnh, sticker, túi đựng máy ảnh')
    )
  ),
  jsonb_build_object(),
  1,
  true
FROM brands b WHERE b.slug = 'instax-camera';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'features',
  'Đặc điểm nổi bật',
  jsonb_build_object(
    'title', 'Đặc điểm nổi bật',
    'features', jsonb_build_array(
      jsonb_build_object(
        'title', 'Tự thể hiện bản thân',
        'description', 'Các sản phẩm của Instax khuyến khích người dùng thể hiện cá tính qua những bức ảnh và phụ kiện đi kèm.',
        'icon', 'user'
      ),
      jsonb_build_object(
        'title', 'Tính cộng đồng và chia sẻ',
        'description', 'Định dạng ảnh nhỏ gọn của Instax giúp người dùng dễ dàng chia sẻ những kỷ niệm quý giá với bạn bè và gia đình.',
        'icon', 'users'
      ),
      jsonb_build_object(
        'title', 'Kết nối số và analog',
        'description', 'Một số dòng máy ảnh lai như Instax Mini EVO cho phép xem và chỉnh sửa ảnh kỹ thuật số trước khi in.',
        'icon', 'camera'
      )
    )
  ),
  jsonb_build_object(),
  2,
  true
FROM brands b WHERE b.slug = 'instax-camera';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'cta',
  'Tinh thần Instax',
  jsonb_build_object(
    'title', 'Tinh thần Instax',
    'description', 'Mỗi khoảnh khắc đều đáng được lưu giữ. Instax giúp bạn tạo ra những kỷ niệm có thể sờ thấy, chia sẻ và trân trọng suốt đời - để ảnh nói cho mà nghe.',
    'button_text', 'Liên hệ ngay',
    'button_link', '/contact'
  ),
  jsonb_build_object(),
  3,
  true
FROM brands b WHERE b.slug = 'instax-camera';

-- Insert content for Fujifilm Image brand
INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'hero',
  'Hero Section',
  jsonb_build_object(
    'title', 'Fujifilm Image',
    'subtitle', 'Giải pháp in ảnh chuyên nghiệp và giấy in cao cấp từ Fujifilm',
    'background_image', '',
    'cta_text', 'Tìm hiểu thêm',
    'cta_link', '#about'
  ),
  jsonb_build_object(),
  0,
  true
FROM brands b WHERE b.slug = 'fujifilm-image';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'about',
  'Về Fujifilm Image',
  jsonb_build_object(
    'title', 'Về Fujifilm Image',
    'description', 'Fujifilm Image mang đến những giải pháp in ảnh chuyên nghiệp và giấy in cao cấp từ thương hiệu Fujifilm danh tiếng với hơn 80 năm kinh nghiệm trong ngành công nghệ hình ảnh.\n\nVới công nghệ tiên tiến và chất lượng vượt trội, các sản phẩm Fujifilm Image được tin dùng bởi các nhiếp ảnh gia chuyên nghiệp, studio ảnh và các doanh nghiệp in ấn trên toàn thế giới.\n\nIMV tự hào là nhà phân phối chính thức các sản phẩm Fujifilm Image tại Việt Nam, mang đến cho khách hàng những sản phẩm chính hãng với chất lượng cao nhất.',
    'features', jsonb_build_array(
      jsonb_build_object('title', 'Giấy in ảnh Fujifilm', 'description', 'Chất lượng cao, độ bền màu vượt trội'),
      jsonb_build_object('title', 'Máy in chuyên nghiệp', 'description', 'Dòng máy in Frontier và DL series'),
      jsonb_build_object('title', 'Hóa chất in ảnh', 'description', 'Bộ hóa chất chính hãng cho máy in'),
      jsonb_build_object('title', 'Phụ kiện', 'description', 'Ribbon, carrier và các phụ kiện chuyên dụng')
    )
  ),
  jsonb_build_object(),
  1,
  true
FROM brands b WHERE b.slug = 'fujifilm-image';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'features',
  'Đặc điểm nổi bật',
  jsonb_build_object(
    'title', 'Đặc điểm nổi bật',
    'features', jsonb_build_array(
      jsonb_build_object(
        'title', 'Chất lượng vượt trội',
        'description', 'Công nghệ Crystal Archive từ Fujifilm đảm bảo độ bền màu và chất lượng hình ảnh tối ưu cho mọi sản phẩm in ảnh.',
        'icon', 'award'
      ),
      jsonb_build_object(
        'title', 'Đa dạng sản phẩm',
        'description', 'Từ giấy in ảnh thông thường đến các loại giấy chuyên dụng như metallic, lustre, đáp ứng mọi nhu cầu in ảnh.',
        'icon', 'grid'
      ),
      jsonb_build_object(
        'title', 'Hỗ trợ chuyên nghiệp',
        'description', 'Đội ngũ kỹ thuật chuyên nghiệp của IMV luôn sẵn sàng hỗ trợ khách hàng về kỹ thuật và bảo hành sản phẩm.',
        'icon', 'headphones'
      )
    )
  ),
  jsonb_build_object(),
  2,
  true
FROM brands b WHERE b.slug = 'fujifilm-image';

INSERT INTO brand_pages (brand_id, section_type, title, content, styles, display_order, is_active)
SELECT 
  b.id,
  'cta',
  'Đối tác tin cậy cho giải pháp in ảnh',
  jsonb_build_object(
    'title', 'Đối tác tin cậy cho giải pháp in ảnh',
    'description', 'IMV cam kết mang đến cho khách hàng những sản phẩm Fujifilm Image chính hãng, chất lượng cao với dịch vụ hỗ trợ tận tâm và chuyên nghiệp.',
    'button_text', 'Liên hệ tư vấn',
    'button_link', '/contact'
  ),
  jsonb_build_object(),
  3,
  true
FROM brands b WHERE b.slug = 'fujifilm-image';