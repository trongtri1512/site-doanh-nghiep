import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Users, Target, Eye, Award, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const achievements = [
    {
      icon: <Globe className="text-primary" size={32} />,
      title: "15+",
      subtitle: "Thương hiệu quốc tế"
    },
    {
      icon: <Users className="text-primary" size={32} />,
      title: "200+",
      subtitle: "Nhân viên chuyên nghiệp"
    },
    {
      icon: <TrendingUp className="text-primary" size={32} />,
      title: "20+",
      subtitle: "Năm kinh nghiệm"
    },
    {
      icon: <Award className="text-primary" size={32} />,
      title: "100+",
      subtitle: "Đối tác tin cậy"
    }
  ];

  const services = [
    {
      title: "Ảnh & In Ấn",
      description: "Phân phối độc quyền các sản phẩm máy ảnh, máy in và giải pháp in ấn từ Fujifilm",
      brands: ["Fujifilm Instax", "Fujifilm Imaging"]
    },
    {
      title: "Chăm Sóc Mẹ & Bé",
      description: "Cung cấp các sản phẩm chăm sóc mẹ và bé an toàn, chất lượng cao",
      brands: ["Pigeon", "Etsuko"]
    },
    {
      title: "Mỹ Phẩm",
      description: "Phân phối các thương hiệu mỹ phẩm cao cấp và sản phẩm chăm sóc da",
      brands: ["Astalift", "Verites"]
    },
    {
      title: "Chẩn Đoán Hình Ảnh Y Tế",
      description: "Cung cấp thiết bị và giải pháp chẩn đoán hình ảnh y tế tiên tiến",
      brands: ["Fujifilm Medical"]
    }
  ];

  const timeline = [
    {
      year: "2004",
      title: "Thành lập công ty",
      description: "IMV được thành lập với tầm nhìn trở thành nhà phân phối hàng đầu các thương hiệu quốc tế tại Việt Nam"
    },
    {
      year: "2008",
      title: "Mở rộng thị trường",
      description: "Ký kết hợp tác với Fujifilm và bắt đầu phân phối các sản phẩm ảnh & in ấn"
    },
    {
      year: "2012",
      title: "Đa dạng hóa sản phẩm",
      description: "Mở rộng sang lĩnh vực chăm sóc mẹ & bé với thương hiệu Pigeon"
    },
    {
      year: "2016",
      title: "Phát triển mỹ phẩm",
      description: "Khởi động mảng mỹ phẩm với Astalift và các thương hiệu chăm sóc da"
    },
    {
      year: "2020",
      title: "Chuyển đổi số",
      description: "Đầu tư mạnh vào công nghệ và chuyển đổi số để nâng cao trải nghiệm khách hàng"
    },
    {
      year: "2024",
      title: "Mở rộng toàn quốc",
      description: "Thiết lập mạng lưới phân phối toàn quốc với hơn 1000 điểm bán"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={20} />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">Về chúng tôi</h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground mb-8">
                Công ty Cổ phần Quốc tế Minh Việt (IMV) được thành lập năm 2004, là nhà phân phối 
                độc quyền của nhiều thương hiệu uy tín hàng đầu thế giới tại thị trường Việt Nam.
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                {achievements.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      {item.icon}
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{item.title}</div>
                    <div className="text-muted-foreground text-sm">{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-primary" size={32} />
                <h2 className="text-2xl font-bold text-foreground">Sứ mệnh</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Mang đến cho người tiêu dùng Việt Nam những sản phẩm chất lượng cao từ các 
                thương hiệu uy tín quốc tế, góp phần nâng cao chất lượng cuộc sống và trải nghiệm 
                của khách hàng thông qua dịch vụ phân phối chuyên nghiệp và tận tâm.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-primary" size={32} />
                <h2 className="text-2xl font-bold text-foreground">Tầm nhìn</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Trở thành công ty phân phối hàng đầu Việt Nam, được tin tưởng bởi các đối tác 
                quốc tế và yêu mến bởi người tiêu dùng, đồng thời mở rộng ra thị trường khu vực 
                Đông Nam Á vào năm 2030.
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Lĩnh vực hoạt động
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.brands.map((brand, brandIndex) => (
                      <span 
                        key={brandIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Hành trình phát triển
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center relative z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-primary">{item.year}</span>
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Giá trị cốt lõi
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Chất lượng</h3>
                <p className="text-muted-foreground">
                  Cam kết mang đến những sản phẩm và dịch vụ chất lượng cao nhất, 
                  đáp ứng mọi mong đợi của khách hàng.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tận tâm</h3>
                <p className="text-muted-foreground">
                  Luôn đặt khách hàng làm trung tâm, phục vụ với tất cả sự nhiệt huyết 
                  và chuyên nghiệp.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Đổi mới</h3>
                <p className="text-muted-foreground">
                  Không ngừng học hỏi, cải tiến và ứng dụng công nghệ mới để nâng cao 
                  hiệu quả hoạt động.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Kết nối với chúng tôi
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Hãy liên hệ để tìm hiểu thêm về các cơ hội hợp tác và những giải pháp 
              tối ưu mà IMV có thể mang lại cho doanh nghiệp của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Liên hệ hợp tác
              </button>
              <Link to="/careers" className="bg-muted hover:bg-muted/80 text-muted-foreground px-8 py-3 rounded-lg transition-colors">
                Cơ hội nghề nghiệp
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;