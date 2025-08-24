import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ArrowLeft, 
  Camera, 
  Printer, 
  Zap, 
  Shield, 
  Users, 
  Award, 
  ChevronRight, 
  ExternalLink,
  Play,
  Star,
  Globe,
  Settings,
  Image as ImageIcon,
  Microscope,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";
import fujifilmLogo from "@/assets/logos/fujifilm-logo-updated.png";
import fujifilmMachine from "@/assets/fujifilm-frontier-machine.jpg";
import fujifilmHero from "@/assets/fujifilm-photofinishing-hero.png";

const FujifilmImageDynamic = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Modern product categories với tech focus
  const productCategories = [
    {
      id: "digital-imaging",
      title: "Digital Imaging Solutions",
      titleVi: "Giải pháp Hình ảnh Số",
      description: "Advanced digital printing and imaging technology for professional results",
      descriptionVi: "Công nghệ in ảnh và hình ảnh số tiên tiến cho kết quả chuyên nghiệp",
      icon: <ImageIcon className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-600",
      products: [
        "Frontier-S DX100: 360 prints/hour precision",
        "DL650: Advanced dry printing technology", 
        "ASK-300: Thermal imaging solutions",
        "DX400W: Compact professional design"
      ],
      productsVi: [
        "Frontier-S DX100: Độ chính xác 360 ảnh/giờ",
        "DL650: Công nghệ in khô tiên tiến",
        "ASK-300: Giải pháp hình ảnh nhiệt",
        "DX400W: Thiết kế chuyên nghiệp nhỏ gọn"
      ]
    },
    {
      id: "smart-kiosks",
      title: "Smart Kiosk Systems",
      titleVi: "Hệ thống Kiosk Thông minh",
      description: "Intelligent self-service printing stations with AI integration",
      descriptionVi: "Trạm in tự phục vụ thông minh với tích hợp AI",
      icon: <Settings className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-600",
      products: [
        "GetPix AI Station: Smart photo processing",
        "Quick Print Pro: Multi-format support",
        "Cloud Connect: Seamless smartphone integration",
        "TouchUI 3.0: Intuitive user experience"
      ],
      productsVi: [
        "GetPix AI Station: Xử lý ảnh thông minh",
        "Quick Print Pro: Hỗ trợ đa định dạng",
        "Cloud Connect: Tích hợp smartphone liền mạch",
        "TouchUI 3.0: Trải nghiệm người dùng trực quan"
      ]
    },
    {
      id: "professional-chemicals",
      title: "Professional Chemistry",
      titleVi: "Hóa chất Chuyên nghiệp",
      description: "Precision formulated chemicals for superior image quality",
      descriptionVi: "Hóa chất được pha chế chính xác cho chất lượng hình ảnh vượt trội",
      icon: <Microscope className="w-8 h-8" />,
      gradient: "from-purple-500 to-indigo-600",
      products: [
        "CP RA PRO P1R: Professional grade chemistry",
        "SP VR P2R: Concentrated formula series",
        "Universal Starter: Quick setup solutions",
        "Eco-Friendly Line: Sustainable processing"
      ],
      productsVi: [
        "CP RA PRO P1R: Hóa chất cấp chuyên nghiệp",
        "SP VR P2R: Dòng công thức cô đặc",
        "Universal Starter: Giải pháp thiết lập nhanh",
        "Eco-Friendly Line: Xử lý bền vững"
      ]
    },
    {
      id: "creative-products",
      title: "Creative Photo Products",
      titleVi: "Sản phẩm Ảnh Sáng tạo",
      description: "Personalized photo products with premium finishing options",
      descriptionVi: "Sản phẩm ảnh cá nhân hóa với tùy chọn hoàn thiện cao cấp",
      icon: <Layers className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
      products: [
        "Premium Photo Books: Luxury binding",
        "Canvas Art Pro: Museum-quality printing",
        "Smart Calendars: Interactive digital elements",
        "Custom Cards: Professional finishing"
      ],
      productsVi: [
        "Premium Photo Books: Ràng buộc sang trọng",
        "Canvas Art Pro: In chất lượng bảo tàng",
        "Smart Calendars: Yếu tố số tương tác",
        "Custom Cards: Hoàn thiện chuyên nghiệp"
      ]
    }
  ];

  const innovations = [
    {
      icon: <Star className="w-12 h-12" />,
      title: "AI-Enhanced Processing",
      titleVi: "Xử lý Nâng cao bằng AI",
      description: "Machine learning algorithms for optimal image quality and color accuracy",
      descriptionVi: "Thuật toán học máy cho chất lượng hình ảnh tối ưu và độ chính xác màu sắc",
      color: "text-green-500"
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Connectivity",
      titleVi: "Kết nối Toàn cầu",
      description: "Cloud-based solutions for seamless workflow management across locations",
      descriptionVi: "Giải pháp dựa trên đám mây cho quản lý quy trình liền mạch qua các địa điểm",
      color: "text-blue-500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Enterprise Security",
      titleVi: "Bảo mật Doanh nghiệp",
      description: "Advanced encryption and secure processing for sensitive image data",
      descriptionVi: "Mã hóa tiên tiến và xử lý an toàn cho dữ liệu hình ảnh nhạy cảm",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Modern Back Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 text-slate-600 hover:text-green-600 transition-all duration-300 mb-12 group hover:gap-4 font-medium"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md group-hover:shadow-lg group-hover:bg-green-50 transition-all duration-300">
            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
          </div>
          <span className="text-lg">Back to Home</span>
        </Link>
        
        <div className="max-w-7xl mx-auto">
          {/* Hero Section - Completely Redesigned */}
          <div className={`relative mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
            </div>

            {/* Logo - Exact 300x50 pixels */}
            <div className="text-center mb-16 relative z-10">
              <div className="inline-block p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group">
                <img 
                  src={fujifilmLogo} 
                  alt="Fujifilm Imaging Solutions" 
                  className="h-[50px] w-[300px] object-contain group-hover:scale-105 transition-transform duration-500"
                  style={{ width: '300px', height: '50px' }}
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className="text-center relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Innovation Through<br />
                <span className="font-light">Imaging</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-4xl mx-auto leading-relaxed">
                Transforming professional photography with cutting-edge technology and precision engineering
              </p>
              <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-3xl mx-auto">
                Chuyển đổi nhiếp ảnh chuyên nghiệp với công nghệ tiên tiến và kỹ thuật chính xác
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Explore Solutions
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                </button>
                
                <Link 
                  to="/contact"
                  className="group relative px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-green-500 hover:text-green-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Contact Sales
                  </span>
                </Link>
              </div>
            </div>

            {/* Hero Image with Modern Frame */}
            <div className="relative max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white to-slate-100 p-2">
                <img 
                  src={fujifilmHero} 
                  alt="Fujifilm Professional Imaging Solutions" 
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-2 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
                
                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                    <div className="text-2xl font-bold text-green-600">85+</div>
                    <div className="text-sm text-slate-600">Years Innovation</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                    <div className="text-2xl font-bold text-blue-600">50M+</div>
                    <div className="text-sm text-slate-600">Photos Printed Daily</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                    <div className="text-2xl font-bold text-purple-600">150+</div>
                    <div className="text-sm text-slate-600">Countries Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories - Modern Grid */}
          <div className={`mb-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Professional Solutions
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive imaging technology ecosystem designed for modern workflows
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {productCategories.map((category, index) => (
                <div 
                  key={category.id}
                  className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden ${
                    hoveredCard === index ? 'scale-[1.02]' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 bg-gradient-to-br ${category.gradient} rounded-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 group-hover:text-green-600 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-lg text-slate-500">{category.titleVi}</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-2 leading-relaxed">
                      {category.description}
                    </p>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                      {category.descriptionVi}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {category.products.map((product, productIndex) => (
                        <div 
                          key={productIndex}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
                        >
                          <ChevronRight className="w-4 h-4 text-green-500 mt-1 group-hover/item:translate-x-1 transition-transform flex-shrink-0" />
                          <div>
                            <span className="block text-slate-700 font-medium">{product}</span>
                            <span className="block text-sm text-slate-500">{category.productsVi[productIndex]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Innovation Highlights */}
          <div className={`mb-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Why Choose Fujifilm Imaging?
              </h2>
              <p className="text-xl text-slate-600">
                Tại sao chọn Fujifilm Imaging?
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {innovations.map((innovation, index) => (
                <div 
                  key={index}
                  className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-slate-100"
                >
                  <div className={`flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${innovation.color}`}>
                    {innovation.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-green-600 transition-colors">
                    {innovation.title}
                  </h3>
                  <p className="text-lg text-slate-500 mb-4">{innovation.titleVi}</p>
                  <p className="text-slate-600 leading-relaxed mb-2">
                    {innovation.description}
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    {innovation.descriptionVi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Showcase - Enhanced */}
          <div className={`mb-24 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300A651' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }}></div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Award className="w-4 h-4" />
                    Featured Equipment
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                    Frontier DX-100
                    <span className="block text-2xl text-green-600 font-normal">Professional Digital Lab</span>
                  </h3>
                  
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Revolutionary printing technology with AI-enhanced color processing and precision engineering. 
                    Designed for high-volume professional environments with uncompromising quality standards.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Ultra-sharp image quality</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Enterprise reliability</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">24/7 technical support</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">Global service network</span>
                    </div>
                  </div>

                  <button className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Learn More About DX-100
                    <ChevronRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={fujifilmMachine} 
                      alt="Fujifilm Frontier DX-100 Professional Printer" 
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
                  </div>
                  
                  {/* Floating Specs */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                    <div className="text-2xl font-bold text-green-600">360</div>
                    <div className="text-sm text-slate-600">Prints/Hour</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action - Modern Design */}
          <div className="text-center">
            <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 text-white rounded-3xl p-12 shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }}></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
                  <ExternalLink className="w-10 h-10" />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Imaging Business?
                </h3>
                <p className="text-xl md:text-2xl opacity-90 mb-4 max-w-4xl mx-auto">
                  Sẵn sàng chuyển đổi doanh nghiệp hình ảnh của bạn?
                </p>
                <p className="text-lg opacity-80 mb-12 max-w-3xl mx-auto">
                  Discover how Fujifilm's innovative solutions can elevate your professional imaging capabilities
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/contact"
                    className="group relative px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center gap-2">
                      Get Expert Consultation
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  
                  <a 
                    href="https://www.fujifilm.com/us/en/business/photofinishing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30 backdrop-blur-sm hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Explore Global Solutions
                    </span>
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