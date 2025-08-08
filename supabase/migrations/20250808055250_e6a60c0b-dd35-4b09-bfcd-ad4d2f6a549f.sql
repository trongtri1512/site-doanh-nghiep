-- Clear existing About page layouts
DELETE FROM page_layouts WHERE page_type = 'about';

-- Create Hero Section for About page (Vietnamese)
INSERT INTO page_layouts (page_type, section_type, title, content, styles, display_order, language_code, is_active) VALUES
('about', 'hero', 'Giới thiệu', 
'{
  "heading": "IMV - CÔNG TY CỔ PHẦN QUỐC TẾ MINH VIỆT",
  "subheading": "Đối tác đáng tin cậy tại thị trường Việt Nam",
  "description": "Với hơn 25 năm kinh nghiệm, IMV là một doanh nghiệp sản xuất và phân phối có vốn đầu tư nước ngoài hàng đầu tại Việt Nam. Chúng tôi cam kết đồng hành cùng các thương hiệu trong hành trình phát triển, thúc đẩy đổi mới sáng tạo và nuôi dưỡng thế hệ trẻ tài năng – tạo nên một hệ sinh thái hợp tác năng động.",
  "backgroundImage": "/src/assets/imv-building.png",
  "showButton": false
}',
'{
  "background": "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3))",
  "textAlign": "center",
  "padding": "120px 0"
}',
1, 'vi', true),

-- Create Hero Section for About page (English)
('about', 'hero', 'About Us', 
'{
  "heading": "IMV - INTERNATIONAL MINH VIET JOINT STOCK COMPANY",
  "subheading": "Trusted Partner in Vietnamese Market",
  "description": "With over 25 years of experience, IMV is a leading foreign-invested manufacturing and distribution enterprise in Vietnam. We are committed to partnering with brands on their development journey, promoting innovation and nurturing talented young generations – creating a dynamic collaborative ecosystem.",
  "backgroundImage": "/src/assets/imv-building.png",
  "showButton": false
}',
'{
  "background": "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3))",
  "textAlign": "center",
  "padding": "120px 0"
}',
1, 'en', true),

-- Create Company Overview Section (Vietnamese)
('about', 'text', 'Tổng quan công ty', 
'{
  "content": "<div class=\"grid md:grid-cols-2 gap-12 items-center\"><div><img src=\"/src/assets/imv-building.png\" alt=\"IMV Building\" class=\"w-full rounded-lg shadow-lg\" /></div><div><h3 class=\"text-2xl font-bold mb-4 text-primary\">Lời giới thiệu</h3><p class=\"text-lg mb-6\">Từ ý tưởng đến tay người tiêu dùng, chúng tôi cung cấp cơ sở hạ tầng, mạng lưới đối tác và hiểu biết sâu sắc về thị trường để biến những ý tưởng tuyệt vời thành hiện thực.</p><p class=\"mb-4\">IMV tự hào là cầu nối giữa các thương hiệu toàn cầu và người tiêu dùng Việt Nam, mang đến những sản phẩm và dịch vụ chất lượng cao trong các lĩnh vực:</p><ul class=\"space-y-2 text-muted-foreground\"><li>• Ảnh & In ấn (Fujifilm)</li><li>• Chăm sóc mẹ & bé (Pigeon)</li><li>• Mỹ phẩm (Astalift, Etsuko, Verites)</li><li>• Chẩn đoán hình ảnh y tế</li></ul></div></div>"
}',
'{}',
2, 'vi', true),

-- Create Company Overview Section (English)
('about', 'text', 'Company Overview', 
'{
  "content": "<div class=\"grid md:grid-cols-2 gap-12 items-center\"><div><img src=\"/src/assets/imv-building.png\" alt=\"IMV Building\" class=\"w-full rounded-lg shadow-lg\" /></div><div><h3 class=\"text-2xl font-bold mb-4 text-primary\">Introduction</h3><p class=\"text-lg mb-6\">From idea to consumer hands, we provide infrastructure, partner networks and deep market insights to turn great ideas into reality.</p><p class=\"mb-4\">IMV is proud to be the bridge between global brands and Vietnamese consumers, bringing high-quality products and services in the fields of:</p><ul class=\"space-y-2 text-muted-foreground\"><li>• Photo & Printing (Fujifilm)</li><li>• Mother & Baby Care (Pigeon)</li><li>• Cosmetics (Astalift, Etsuko, Verites)</li><li>• Medical Imaging Diagnostics</li></ul></div></div>"
}',
'{}',
2, 'en', true),

-- Create Mission & Vision Section (Vietnamese)
('about', 'text', 'Tầm nhìn & Sứ mệnh', 
'{
  "content": "<div class=\"bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8\"><div class=\"grid md:grid-cols-2 gap-8\"><div><h3 class=\"text-xl font-bold mb-4 text-primary\">Tầm nhìn</h3><p class=\"text-muted-foreground mb-6\">Trở thành công ty hàng đầu trong việc kết nối các thương hiệu quốc tế với thị trường Việt Nam, tạo ra giá trị bền vững cho khách hàng, đối tác và cộng đồng.</p></div><div><h3 class=\"text-xl font-bold mb-4 text-primary\">Sứ mệnh</h3><p class=\"text-muted-foreground\">Cung cấp các giải pháp toàn diện từ sản xuất đến phân phối, giúp các thương hiệu phát triển bền vững tại thị trường Việt Nam thông qua đổi mới sáng tạo và dịch vụ chất lượng cao.</p></div></div></div>"
}',
'{}',
3, 'vi', true),

-- Create Mission & Vision Section (English)
('about', 'text', 'Vision & Mission', 
'{
  "content": "<div class=\"bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8\"><div class=\"grid md:grid-cols-2 gap-8\"><div><h3 class=\"text-xl font-bold mb-4 text-primary\">Vision</h3><p class=\"text-muted-foreground mb-6\">To become the leading company in connecting international brands with the Vietnamese market, creating sustainable value for customers, partners and communities.</p></div><div><h3 class=\"text-xl font-bold mb-4 text-primary\">Mission</h3><p class=\"text-muted-foreground\">Provide comprehensive solutions from manufacturing to distribution, helping brands develop sustainably in the Vietnamese market through innovation and high-quality services.</p></div></div></div>"
}',
'{}',
3, 'en', true),

-- Create Core Values Section (Vietnamese)
('about', 'text', 'Giá trị cốt lõi', 
'{
  "content": "<div class=\"text-center mb-12\"><h3 class=\"text-2xl font-bold mb-6 text-primary\">Giá trị cốt lõi</h3><div class=\"grid md:grid-cols-4 gap-6\"><div class=\"bg-card p-6 rounded-lg shadow-md\"><div class=\"w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4\"><svg class=\"w-6 h-6 text-primary\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\"/></svg></div><h4 class=\"font-semibold mb-2\">Chất lượng</h4><p class=\"text-sm text-muted-foreground\">Cam kết mang đến sản phẩm và dịch vụ chất lượng cao nhất</p></div><div class=\"bg-card p-6 rounded-lg shadow-md\"><div class=\"w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4\"><svg class=\"w-6 h-6 text-primary\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z\"/></svg></div><h4 class=\"font-semibold mb-2\">Đối tác</h4><p class=\"text-sm text-muted-foreground\">Xây dựng mối quan hệ đối tác bền vững và đáng tin cậy</p></div><div class=\"bg-card p-6 rounded-lg shadow-md\"><div class=\"w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4\"><svg class=\"w-6 h-6 text-primary\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z\"/></svg></div><h4 class=\"font-semibold mb-2\">Đổi mới</h4><p class=\"text-sm text-muted-foreground\">Không ngừng đổi mới và sáng tạo trong hoạt động kinh doanh</p></div><div class=\"bg-card p-6 rounded-lg shadow-md\"><div class=\"w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4\"><svg class=\"w-6 h-6 text-primary\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z\" clip-rule=\"evenodd\"/></svg></div><h4 class=\"font-semibold mb-2\">Trách nhiệm</h4><p class=\"text-sm text-muted-foreground\">Cam kết trách nhiệm với cộng đồng và môi trường</p></div></div></div>"
}',
'{}',
4, 'vi', true),

-- Create Core Values Section (English)
('about', 'text', 'Core Values', 
'{
  "content": "<div class=\"text-center mb-12\"><h3 class=\"text-2xl font-bold mb-6 text-primary\">Core Values</h3><div class=\"grid md:grid-cols-4 gap-6\"><div class=\"bg-card p-6 rounded-lg shadow-md\"><div class=\"w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4\"><svg class=\"w-6 h-6 text-primary\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\"/></svg></div><h4 class=\"font-semibold mb-2\">Quality</h4><p class=\"text-sm text-muted-foreground\">Committed to delivering the highest quality products and services</p></div><div class=\"bg-card p-6 rounded-lg shadow-md\"><div class=\"w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4\"><svg class=\"w-6 h-6 text-primary\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z\"/></svg></div><h4 class=\"font-semibold mb-2\">Partnership</h4><p class=\"text-sm text-muted-foreground\">Building sustainable and trustworthy partnerships</p></div><div class=\"bg-card p-6 rounded-lg shadow-md\"><div class=\"w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4\"><svg class=\"w-6 h-6 text-primary\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z\"/></svg></div><h4 class=\"font-semibold mb-2\">Innovation</h4><p class=\"text-sm text-muted-foreground\">Continuously innovating and creating in business operations</p></div><div class=\"bg-card p-6 rounded-lg shadow-md\"><div class=\"w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4\"><svg class=\"w-6 h-6 text-primary\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z\" clip-rule=\"evenodd\"/></svg></div><h4 class=\"font-semibold mb-2\">Responsibility</h4><p class=\"text-sm text-muted-foreground\">Committed to responsibility to community and environment</p></div></div></div>"
}',
'{}',
4, 'en', true),

-- Create Business Areas Section (Vietnamese)
('about', 'services', 'Lĩnh vực kinh doanh', 
'{
  "title": "Lĩnh vực kinh doanh",
  "description": "IMV hoạt động trong nhiều lĩnh vực đa dạng, mang đến giải pháp toàn diện cho thị trường Việt Nam",
  "services": [
    {
      "title": "Ảnh & In ấn",
      "description": "Phân phối sản phẩm Fujifilm và các giải pháp in ảnh chuyên nghiệp",
      "icon": "camera",
      "image": "/src/assets/instax-banner.jpg"
    },
    {
      "title": "Chăm sóc Mẹ & Bé", 
      "description": "Sản phẩm Pigeon chất lượng cao cho mẹ và bé",
      "icon": "baby",
      "image": "/src/assets/pigeon-banner.jpg"
    },
    {
      "title": "Mỹ phẩm",
      "description": "Các thương hiệu mỹ phẩm cao cấp Astalift, Etsuko, Verites",
      "icon": "sparkles",
      "image": "/src/assets/astalift-banner.png"
    },
    {
      "title": "Chẩn đoán Hình ảnh Y tế",
      "description": "Thiết bị và giải pháp chẩn đoán hình ảnh y tế tiên tiến",
      "icon": "activity",
      "image": "/src/assets/verites-banner.jpg"
    }
  ]
}',
'{}',
5, 'vi', true),

-- Create Business Areas Section (English)
('about', 'services', 'Business Areas', 
'{
  "title": "Business Areas",
  "description": "IMV operates in diverse fields, providing comprehensive solutions for the Vietnamese market",
  "services": [
    {
      "title": "Photo & Printing",
      "description": "Distribution of Fujifilm products and professional photo printing solutions",
      "icon": "camera",
      "image": "/src/assets/instax-banner.jpg"
    },
    {
      "title": "Mother & Baby Care", 
      "description": "High-quality Pigeon products for mothers and babies",
      "icon": "baby",
      "image": "/src/assets/pigeon-banner.jpg"
    },
    {
      "title": "Cosmetics",
      "description": "Premium cosmetic brands Astalift, Etsuko, Verites",
      "icon": "sparkles",
      "image": "/src/assets/astalift-banner.png"
    },
    {
      "title": "Medical Imaging Diagnostics",
      "description": "Advanced medical imaging diagnostic equipment and solutions",
      "icon": "activity",
      "image": "/src/assets/verites-banner.jpg"
    }
  ]
}',
'{}',
5, 'en', true),

-- Create Contact CTA Section (Vietnamese)
('about', 'contact', 'Liên hệ với chúng tôi', 
'{
  "title": "Sẵn sàng hợp tác cùng IMV?",
  "description": "Hãy liên hệ với chúng tôi để khám phá những cơ hội hợp tác và phát triển cùng nhau",
  "primaryButton": {
    "text": "Liên hệ ngay",
    "link": "/contact"
  },
  "secondaryButton": {
    "text": "Xem cơ hội việc làm",
    "link": "/careers"
  }
}',
'{
  "background": "gradient-to-r from-primary to-accent",
  "textColor": "white",
  "padding": "80px 0"
}',
6, 'vi', true),

-- Create Contact CTA Section (English)
('about', 'contact', 'Contact Us', 
'{
  "title": "Ready to partner with IMV?",
  "description": "Contact us to explore partnership opportunities and grow together",
  "primaryButton": {
    "text": "Contact Now",
    "link": "/contact"
  },
  "secondaryButton": {
    "text": "View Career Opportunities",
    "link": "/careers"
  }
}',
'{
  "background": "gradient-to-r from-primary to-accent",
  "textColor": "white",
  "padding": "80px 0"
}',
6, 'en', true);