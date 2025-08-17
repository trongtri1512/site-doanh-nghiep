-- Add more content sections for both languages
INSERT INTO public.brand_page_content (brand_slug, language_code, section_type, section_key, title, content, display_order) VALUES

-- Vietnamese content additions
('pigeon', 'vi', 'products', 'product_categories', 'Giải pháp chăm sóc toàn diện', '{
  "title": "Giải pháp chăm sóc toàn diện",
  "subtitle": "Từ cho ăn đến chăm sóc da, chúng tôi cung cấp mọi thứ cho sự phát triển khỏe mạnh của bé",
  "categories": [
    {
      "name": "Bú mẹ & Cho ăn",
      "items": ["Bình sữa", "Núm vú", "Máy hút sữa", "Máy tiệt trùng"],
      "color": "from-pink-500 to-rose-400"
    },
    {
      "name": "Chăm sóc da bé",
      "items": ["Kem dưỡng", "Sản phẩm tắm", "Khăn ướt", "Kem dưỡng da"],
      "color": "from-blue-500 to-cyan-400"
    },
    {
      "name": "Chăm sóc mẹ bầu",
      "items": ["Áo lót cho con bú", "Đai bụng", "Chăm sóc núm vú", "Sản phẩm phục hồi"],
      "color": "from-purple-500 to-indigo-400"
    },
    {
      "name": "Phụ kiện cho bé",
      "items": ["Ti giả", "Cốc tập uống", "Đồ chơi", "Sản phẩm an toàn"],
      "color": "from-green-500 to-emerald-400"
    }
  ]
}', 5),

('pigeon', 'vi', 'research', 'science_care', 'Khoa học đằng sau sự chăm sóc', '{
  "title": "Khoa học đằng sau sự chăm sóc",
  "subtitle": "Đội ngũ Nghiên cứu & Phát triển của chúng tôi đã nghiên cứu hành vi bú mẹ của trẻ sơ sinh trong hơn 67 năm, tạo ra những sản phẩm thực sự hiểu nhu cầu của bé.",
  "features": [
    {
      "title": "Nghiên cứu cho ăn tiên tiến",
      "icon": "Microscope"
    },
    {
      "title": "Quy trình kiểm tra an toàn",
      "icon": "Shield"
    },
    {
      "title": "Chứng nhận quốc tế",
      "icon": "Award"
    }
  ],
  "cta_text": "Tìm hiểu về nghiên cứu của chúng tôi"
}', 6),

('pigeon', 'vi', 'awards', 'recognition_awards', 'Công nhận & Giải thưởng', '{
  "title": "Công nhận & Giải thưởng",
  "awards": [
    "Economic Times Best Organization 2024",
    "Times of India Most Valued Brand 2020",
    "India Best Babycare Company 2018",
    "Mother & Baby Gold Award 2021"
  ]
}', 7),

-- English content additions
('pigeon', 'en', 'products', 'product_categories', 'Complete Care Solutions', '{
  "title": "Complete Care Solutions",
  "subtitle": "From feeding to skincare, we provide everything for your baby healthy development",
  "categories": [
    {
      "name": "Feeding & Nursing",
      "items": ["Bottles", "Nipples", "Breast Pumps", "Sterilizers"],
      "color": "from-pink-500 to-rose-400"
    },
    {
      "name": "Baby Skincare",
      "items": ["Lotions", "Bath Products", "Wipes", "Diaper Cream"],
      "color": "from-blue-500 to-cyan-400"
    },
    {
      "name": "Maternity Care",
      "items": ["Nursing Bras", "Belly Bands", "Nipple Care", "Recovery Items"],
      "color": "from-purple-500 to-indigo-400"
    },
    {
      "name": "Baby Accessories",
      "items": ["Pacifiers", "Training Cups", "Toys", "Safety Products"],
      "color": "from-green-500 to-emerald-400"
    }
  ]
}', 5),

('pigeon', 'en', 'research', 'science_care', 'Science Behind Care', '{
  "title": "Science Behind Care",
  "subtitle": "Our Research & Development team has studied infant feeding behavior for over 67 years, creating products that truly understand your baby needs.",
  "features": [
    {
      "title": "Advanced Feeding Research",
      "icon": "Microscope"
    },
    {
      "title": "Safety Testing Protocols",
      "icon": "Shield"
    },
    {
      "title": "International Certifications",
      "icon": "Award"
    }
  ],
  "cta_text": "Learn About Our Research"
}', 6),

('pigeon', 'en', 'awards', 'recognition_awards', 'Recognition & Awards', '{
  "title": "Recognition & Awards",
  "awards": [
    "Economic Times Best Organization 2024",
    "Times of India Most Valued Brand 2020",
    "India Best Babycare Company 2018",
    "Mother & Baby Gold Award 2021"
  ]
}', 7);