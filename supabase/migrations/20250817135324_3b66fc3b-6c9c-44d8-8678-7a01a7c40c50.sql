-- Create comprehensive Astalift brand page content for both English and Vietnamese

-- English Hero Section
INSERT INTO public.brand_page_content (brand_slug, language_code, section_type, section_key, title, content, styles, display_order, is_active) VALUES
('astalift-en', 'en', 'hero', 'hero_main', 'Beauty is a Science', 
'{
  "headline": "Beauty is a Science",
  "subheadline": "ASTALIFT gives you confidence in your skin and brings joy to everyday life",
  "description": "Experience the revolutionary nanotechnology that penetrates deep into your skin cellular level. You can feel the difference from the very next day - firmer, more moisturized skin.",
  "cta_text": "Discover ASTALIFT",
  "cta_link": "#products",
  "background_video": "",
  "background_image": "https://astalift.com.sg/cdn/shop/files/ASTALIFT_visual_jelly_red_white_model_beside.pdf.jpg"
}', 
'{
  "background": "linear-gradient(135deg, hsl(0, 85%, 45%) 0%, hsl(0, 75%, 35%) 100%)",
  "textColor": "white",
  "padding": "120px 0",
  "minHeight": "100vh",
  "textAlign": "center"
}', 0, true),

-- English About Section
('astalift-en', 'en', 'about', 'brand_story', 'The FUJIFILM Innovation Story', 
'{
  "title": "The FUJIFILM Innovation Story",
  "subtitle": "90+ Years of Cutting-Edge Technology",
  "content": "For more than 90 years, FUJIFILM has been developing unique proprietary technology in cutting-edge fields, starting with film and expanding into healthcare. Our expertise in nanotechnology, collagen research, antioxidant technology, and optical analysis creates the foundation for ASTALIFT''s revolutionary skincare solutions.",
  "highlights": [
    {
      "icon": "microscope",
      "title": "Nano Technology",
      "description": "Revolutionary nanotechnology from photographic film development enables deeper penetration of active ingredients"
    },
    {
      "icon": "dna",
      "title": "Collagen Expertise", 
      "description": "Deep understanding of collagen from film manufacturing translates to advanced skincare formulations"
    },
    {
      "icon": "shield",
      "title": "Antioxidant Protection",
      "description": "UV protection technology developed to prevent photo fading now protects your skin from aging"
    },
    {
      "icon": "eye",
      "title": "Optical Analysis",
      "description": "Light control technology from photography creates flawless skin appearance and luminosity"
    }
  ]
}',
'{
  "background": "hsl(var(--background))",
  "padding": "80px 0",
  "textAlign": "center"
}', 1, true),

-- English Ingredients Section
('astalift-en', 'en', 'features', 'key_ingredients', 'The Science Behind the Red', 
'{
  "title": "The Science Behind the Red",
  "subtitle": "Why ASTALIFT is Red - The Power of Nano-Astaxanthin",
  "description": "ASTALIFT contains a unique beauty ingredient called nano-astaxanthin that tones and moisturizes skin. Our red color comes from this powerful antioxidant that provides superior skin protection and rejuvenation.",
  "features": [
    {
      "title": "Nano-Astaxanthin",
      "description": "Powerful antioxidant that penetrates deep into skin cells for superior protection and repair",
      "icon": "atom",
      "benefit": "Anti-aging & Protection"
    },
    {
      "title": "Nano-Lycopene", 
      "description": "Advanced formulation that enhances skin elasticity and provides intense hydration",
      "icon": "droplet",
      "benefit": "Hydration & Elasticity"
    },
    {
      "title": "High-Performance Collagen",
      "description": "Developed through film R&D, provides structural support for firmer, younger-looking skin",
      "icon": "layers",
      "benefit": "Firmness & Structure"
    }
  ]
}',
'{
  "background": "linear-gradient(135deg, hsl(0, 15%, 95%) 0%, hsl(0, 20%, 98%) 100%)",
  "padding": "80px 0"
}', 2, true),

-- English Products Section  
('astalift-en', 'en', 'products', 'product_showcase', 'ASTALIFT Product Lines', 
'{
  "title": "ASTALIFT Product Lines",
  "subtitle": "Comprehensive Skincare Solutions",
  "description": "Each product line is carefully formulated with our revolutionary nanotechnology to deliver visible results",
  "products": [
    {
      "name": "ASTALIFT IN-FOCUS",
      "category": "Anti-Aging Serum",
      "description": "Stem cell activating essence for radiant, elastic skin focusing on natural recovery and skin health",
      "keyBenefit": "Deep cellular regeneration",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2019-09/74aca39715da1e7ddf43bce1213bfa0d/thumb_astalift_07.jpg"
    },
    {
      "name": "ASTALIFT Skincare",
      "category": "Daily Care System", 
      "description": "Complete skincare system for elastic, moisturized skin with instant deep penetration power",
      "keyBenefit": "Enhanced elasticity & hydration",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2020-08/45aaece6dd87d4f8be68a051a70df248/thumb_astalift_01.jpg"
    },
    {
      "name": "ASTALIFT Brightening Care",
      "category": "Whitening System",
      "description": "Proprietary whitening method prevents dark spots and dullness for luminous, elastic skin",
      "keyBenefit": "Bright, transparent complexion",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2019-09/55503da0590c3014736d1287d9d9d9d9/thumb_astalift_02.jpg"
    }
  ]
}',
'{
  "background": "hsl(var(--background))",
  "padding": "80px 0"
}', 3, true),

-- English CTA Section
('astalift-en', 'en', 'cta', 'main_cta', 'Experience the ASTALIFT Difference', 
'{
  "title": "Experience the ASTALIFT Difference",
  "subtitle": "Transform Your Skin with Scientific Beauty",
  "description": "Join millions of women worldwide who trust ASTALIFT for visibly younger, more radiant skin. Feel the confidence that comes with healthy, beautiful skin.",
  "primaryCTA": {
    "text": "Shop ASTALIFT Now",
    "link": "/contact",
    "style": "primary"
  },
  "secondaryCTA": {
    "text": "Learn More",
    "link": "/about",
    "style": "outline"
  }
}',
'{
  "background": "linear-gradient(135deg, hsl(0, 85%, 45%) 0%, hsl(0, 75%, 35%) 100%)",
  "textColor": "white",
  "padding": "80px 0",
  "textAlign": "center"
}', 4, true),

-- Vietnamese Hero Section
('astalift', 'vi', 'hero', 'hero_main', 'Vẻ Đẹp Là Khoa Học', 
'{
  "headline": "Vẻ Đẹp Là Khoa Học",
  "subheadline": "ASTALIFT mang đến cho bạn sự tự tin về làn da và niềm vui trong cuộc sống hàng ngày",
  "description": "Trải nghiệm công nghệ nano cách mạng thâm nhập sâu đến cấp độ tế bào da. Bạn có thể cảm nhận sự khác biệt ngay từ ngày tiếp theo - làn da chắc khỏe và ẩm mượt hơn.",
  "cta_text": "Khám Phá ASTALIFT",
  "cta_link": "#products",
  "background_video": "",
  "background_image": "https://astalift.com.sg/cdn/shop/files/ASTALIFT_visual_jelly_red_white_model_beside.pdf.jpg"
}', 
'{
  "background": "linear-gradient(135deg, hsl(0, 85%, 45%) 0%, hsl(0, 75%, 35%) 100%)",
  "textColor": "white",
  "padding": "120px 0",
  "minHeight": "100vh",
  "textAlign": "center"
}', 0, true),

-- Vietnamese About Section
('astalift', 'vi', 'about', 'brand_story', 'Câu Chuyện Đổi Mới Của FUJIFILM', 
'{
  "title": "Câu Chuyện Đổi Mới Của FUJIFILM",
  "subtitle": "Hơn 90 Năm Công Nghệ Tiên Tiến",
  "content": "Trong hơn 90 năm, FUJIFILM đã phát triển công nghệ độc quyền duy nhất trong các lĩnh vực tiên tiến, bắt đầu từ phim ảnh và mở rộng sang chăm sóc sức khỏe. Chuyên môn của chúng tôi về công nghệ nano, nghiên cứu collagen, công nghệ chống oxy hóa và phân tích quang học tạo nền tảng cho các giải pháp chăm sóc da cách mạng của ASTALIFT.",
  "highlights": [
    {
      "icon": "microscope",
      "title": "Công Nghệ Nano",
      "description": "Công nghệ nano cách mạng từ phát triển phim chụp ảnh cho phép thâm nhập sâu hơn của các thành phần hoạt tính"
    },
    {
      "icon": "dna",
      "title": "Chuyên Môn Collagen", 
      "description": "Hiểu biết sâu sắc về collagen từ sản xuất phim chuyển thành các công thức chăm sóc da tiên tiến"
    },
    {
      "icon": "shield",
      "title": "Bảo Vệ Chống Oxy Hóa",
      "description": "Công nghệ bảo vệ UV được phát triển để ngăn phai màu ảnh nay bảo vệ làn da khỏi lão hóa"
    },
    {
      "icon": "eye",
      "title": "Phân Tích Quang Học",
      "description": "Công nghệ kiểm soát ánh sáng từ nhiếp ảnh tạo ra vẻ ngoài hoàn hảo và độ rạng rỡ cho làn da"
    }
  ]
}',
'{
  "background": "hsl(var(--background))",
  "padding": "80px 0",
  "textAlign": "center"
}', 1, true),

-- Vietnamese Ingredients Section
('astalift', 'vi', 'features', 'key_ingredients', 'Khoa Học Đằng Sau Màu Đỏ', 
'{
  "title": "Khoa Học Đằng Sau Màu Đỏ",
  "subtitle": "Tại Sao ASTALIFT Có Màu Đỏ - Sức Mạnh Của Nano-Astaxanthin",
  "description": "ASTALIFT chứa thành phần làm đẹp độc đáo gọi là nano-astaxanthin giúp săn chắc và dưỡng ẩm cho da. Màu đỏ của chúng tôi đến từ chất chống oxy hóa mạnh mẽ này, mang lại khả năng bảo vệ và phục hồi da vượt trội.",
  "features": [
    {
      "title": "Nano-Astaxanthin",
      "description": "Chất chống oxy hóa mạnh mẽ thâm nhập sâu vào tế bào da để bảo vệ và phục hồi vượt trội",
      "icon": "atom",
      "benefit": "Chống Lão Hóa & Bảo Vệ"
    },
    {
      "title": "Nano-Lycopene", 
      "description": "Công thức tiên tiến tăng cường độ đàn hồi da và cung cấp độ ẩm chuyên sâu",
      "icon": "droplet",
      "benefit": "Dưỡng Ẩm & Đàn Hồi"
    },
    {
      "title": "Collagen Hiệu Suất Cao",
      "description": "Được phát triển thông qua R&D phim ảnh, cung cấp hỗ trợ cấu trúc cho làn da chắc khỏe, trẻ trung",
      "icon": "layers",
      "benefit": "Săn Chắc & Cấu Trúc"
    }
  ]
}',
'{
  "background": "linear-gradient(135deg, hsl(0, 15%, 95%) 0%, hsl(0, 20%, 98%) 100%)",
  "padding": "80px 0"
}', 2, true),

-- Vietnamese Products Section
('astalift', 'vi', 'products', 'product_showcase', 'Dòng Sản Phẩm ASTALIFT', 
'{
  "title": "Dòng Sản Phẩm ASTALIFT",
  "subtitle": "Giải Pháp Chăm Sóc Da Toàn Diện",
  "description": "Mỗi dòng sản phẩm được điều chế cẩn thận với công nghệ nano cách mạng để mang lại kết quả hữu hình",
  "products": [
    {
      "name": "ASTALIFT IN-FOCUS",
      "category": "Tinh Chất Chống Lão Hóa",
      "description": "Tinh chất kích hoạt tế bào gốc cho làn da rạng rỡ, đàn hồi tập trung vào khả năng phục hồi tự nhiên và sức khỏe da",
      "keyBenefit": "Tái tạo tế bào sâu",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2019-09/74aca39715da1e7ddf43bce1213bfa0d/thumb_astalift_07.jpg"
    },
    {
      "name": "ASTALIFT Chăm Sóc Da",
      "category": "Hệ Thống Chăm Sóc Hàng Ngày", 
      "description": "Hệ thống chăm sóc da hoàn chỉnh cho làn da đàn hồi, ẩm mượt với sức mạnh thâm nhập sâu tức thì",
      "keyBenefit": "Tăng cường đàn hồi & dưỡng ẩm",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2020-08/45aaece6dd87d4f8be68a051a70df248/thumb_astalift_01.jpg"
    },
    {
      "name": "ASTALIFT Chăm Sóc Làm Sáng",
      "category": "Hệ Thống Làm Trắng",
      "description": "Phương pháp làm trắng độc quyền ngăn ngừa các vết thâm và xỉn màu cho làn da tươi sáng, đàn hồi",
      "keyBenefit": "Làn da sáng, trong suốt",
      "image": "https://asset.fujifilm.com/www/vn/files/styles/600x400/public/2019-09/55503da0590c3014736d1287d9d9d9d9/thumb_astalift_02.jpg"
    }
  ]
}',
'{
  "background": "hsl(var(--background))",
  "padding": "80px 0"
}', 3, true),

-- Vietnamese CTA Section
('astalift', 'vi', 'cta', 'main_cta', 'Trải Nghiệm Sự Khác Biệt ASTALIFT', 
'{
  "title": "Trải Nghiệm Sự Khác Biệt ASTALIFT",
  "subtitle": "Biến Đổi Làn Da Với Vẻ Đẹp Khoa Học",
  "description": "Tham gia cùng hàng triệu phụ nữ trên toàn thế giới tin tưởng ASTALIFT cho làn da trẻ hơn, rạng rỡ hơn một cách rõ rệt. Cảm nhận sự tự tin đến từ làn da khỏe mạnh, xinh đẹp.",
  "primaryCTA": {
    "text": "Mua ASTALIFT Ngay",
    "link": "/contact",
    "style": "primary"
  },
  "secondaryCTA": {
    "text": "Tìm Hiểu Thêm",
    "link": "/about",
    "style": "outline"
  }
}',
'{
  "background": "linear-gradient(135deg, hsl(0, 85%, 45%) 0%, hsl(0, 75%, 35%) 100%)",
  "textColor": "white",
  "padding": "80px 0",
  "textAlign": "center"
}', 4, true);