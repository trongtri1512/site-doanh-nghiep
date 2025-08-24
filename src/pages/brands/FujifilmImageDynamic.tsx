import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Camera, Printer, Cog, Zap, Shield, Users, Award, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import fujifilmLogo from "@/assets/logos/fujifilm-logo-updated.png";
import fujifilmMachine from "@/assets/fujifilm-frontier-machine.jpg";
import fujifilmHero from "@/assets/fujifilm-photofinishing-hero.png";

const FujifilmImageDynamic = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Photo finishing products và services từ Fujifilm official
  const photofinishingServices = [
    {
      title: "Digital Lab Solutions",
      description: "Máy in ảnh chuyên nghiệp với chất lượng cao và tốc độ nhanh",
      icon: <Printer className="w-8 h-8" />,
      products: [
        "Frontier-S DX100: 360 ảnh 4R/giờ",
        "Frontier DL650: Công nghệ in khô tiên tiến",
        "ASK-300: Giải pháp in ảnh nhiệt",
        "Frontier DX400W: Thiết kế nhỏ gọn, độ bền cao"
      ]
    },
    {
      title: "Kiosk Solutions", 
      description: "Trạm in ảnh tự động cho khách hàng",
      icon: <Camera className="w-8 h-8" />,
      products: [
        "GetPix Print Station: Kết nối đa dạng",
        "GetPix Quick Kiosk: Tối ưu in từ smartphone",
        "Hỗ trợ đa định dạng file",
        "Giao diện thân thiện với người dùng"
      ]
    },
    {
      title: "Personalized Photo Products",
      description: "Sản phẩm ảnh cá nhân hóa đa dạng",
      icon: <Users className="w-8 h-8" />,
      products: [
        "Photo Albums & Books",
        "Canvas & Wall Art", 
        "Calendars & Cards",
        "Print-on-Demand Solutions"
      ]
    },
    {
      title: "Professional Chemicals",
      description: "Hóa chất chuyên dụng cho ngành ảnh",
      icon: <Cog className="w-8 h-8" />,
      products: [
        "CP RA PRO P1R (2X40L)",
        "SP VR P2R 2X5L CONC",
        "Universal Starter P1S",
        "Fuji Super Conditioner"
      ]
    }
  ];

  const qualityFeatures = [
    {
      icon: <Award className="w-12 h-12 text-blue-500" />,
      title: "Chất lượng hàng đầu thế giới",
      description: "Công nghệ tiên tiến từ Fujifilm Japan với hơn 85 năm kinh nghiệm"
    },
    {
      icon: <Zap className="w-12 h-12 text-green-500" />,
      title: "Tốc độ xử lý nhanh",
      description: "Công suất cao lên đến 2,040 ảnh 4R/giờ cho doanh nghiệp lớn"
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-500" />,
      title: "Độ bền vượt trội",
      description: "Thiết kế chắc chắn, bảo hành rõ ràng và hỗ trợ kỹ thuật tận tâm"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Back Navigation với hiệu ứng hover */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-blue-600 transition-all duration-300 mb-8 group hover:gap-3"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Quay lại trang chủ
        </Link>
        
        <div className="max-w-7xl mx-auto">
          {/* Hero Section với logo tối ưu */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo được tối ưu kích thước và hiệu ứng */}
            <div className="mb-12">
              <img 
                src={fujifilmLogo} 
                alt="Fujifilm Logo" 
                className="h-20 md:h-24 lg:h-28 mx-auto mb-8 hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                style={{ minWidth: '200px', maxWidth: '300px' }}
              />
            </div>

            {/* Hero Image từ Fujifilm Official */}
            <div className="relative mb-12 overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={fujifilmHero} 
                alt="Fujifilm Photofinishing Solutions" 
                className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  Fujifilm Photofinishing
                </h1>
                <p className="text-xl md:text-2xl opacity-90">
                  Pursuing photo quality, making photography fun and easy
                </p>
              </div>
            </div>
            
            {/* Introduction Text từ Fujifilm Official */}
            <div className="max-w-5xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
              <p className="text-xl font-semibold text-foreground">
                Fujifilm has focused on the photography sector, taking it forward. Pursuing photo quality, making photography fun and easy. We've developed a wide range of systems and services for business expansion.
              </p>
              <p>
                Với nhiều năm kinh nghiệm trong lĩnh vực cung cấp vật tư ngành ảnh, chúng tôi tự hào là đối tác phân phối chính thức các dòng sản phẩm photofinishing của Fujifilm tại Việt Nam.
              </p>
            </div>
          </div>

          {/* Photo Finishing Services Section */}
          <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Photofinishing Products & Services
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {photofinishingServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-white via-white to-blue-50/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-blue-100/50"
                  onMouseEnter={() => setActiveProduct(index)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.products.map((product, productIndex) => (
                      <li 
                        key={productIndex}
                        className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors group/item"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-500 mt-1 group-hover/item:translate-x-1 transition-transform" />
                        <span className="flex-1">{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Features Section */}
          <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-center mb-12">
              Tại sao chọn Fujifilm?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {qualityFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="text-center bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Showcase */}
          <div className={`mb-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">
                    Máy in ảnh Frontier DX-100
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Công nghệ in ảnh tiên tiến với chất lượng hình ảnh vượt trội và thiết kế thân thiện với người dùng. Đáp ứng các tiêu chuẩn quốc tế khắt khe nhất.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Chất lượng hình ảnh sắc nét, bền màu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Hiệu suất ổn định và độ tin cậy cao</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Hỗ trợ kỹ thuật chuyên nghiệp</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src={fujifilmMachine} 
                    alt="Fujifilm Frontier DX-100" 
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action với hiệu ứng gradient */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <ExternalLink className="w-16 h-16 opacity-80" />
                </div>
                <h3 className="text-4xl font-bold mb-6">
                  Sẵn sàng nâng cao chất lượng in ảnh?
                </h3>
                <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                  Liên hệ với chúng tôi để tìm hiểu thêm về các giải pháp photofinishing chuyên nghiệp từ Fujifilm
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Liên hệ tư vấn
                  </Link>
                  <a 
                    href="https://www.fujifilm.com/us/en/business/photofinishing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30 backdrop-blur-sm"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Tìm hiểu thêm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FujifilmImageDynamic;