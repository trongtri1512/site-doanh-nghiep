import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, Star, Award, Users, TrendingUp } from "lucide-react";

// Import existing brand assets
import pigeonBanner from "@/assets/pigeon-banner.jpg";
import astaliftBanner from "@/assets/astalift-banner.png";
import instaxBanner from "@/assets/instax-banner.jpg";
import veritesBanner from "@/assets/verites-banner.jpg";
import etsukoBanner from "@/assets/etsuko-banner.jpg";

// Import brand logos
import pigeonLogo from "@/assets/logos/pigeon-logo.png";
import astaliftLogo from "@/assets/logos/astalift-logo.png";
import instaxLogo from "@/assets/logos/instax-logo.png";
import veritesLogo from "@/assets/logos/verites-logo.png";
import etsukoLogo from "@/assets/logos/etsuko-logo.png";
import fujifilmLogo from "@/assets/logos/fujifilm-logo.png";

const BrandsShowcase = () => {
  const { currentLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const brands = [
    {
      id: "pigeon",
      name: "Pigeon",
      logo: pigeonLogo,
      category: currentLanguage === 'en' ? "Mother & Baby Care" : "Sản phẩm mẹ và bé",
      description: currentLanguage === 'en' 
        ? "Trusted worldwide for premium baby care products and feeding solutions"
        : "Thương hiệu đáng tin cậy toàn cầu về sản phẩm chăm sóc em bé và giải pháp nuôi dưỡng",
      image: pigeonBanner,
      color: "from-pink-500 to-rose-400",
      accent: "border-pink-200",
      icon: <Users className="w-6 h-6" />,
      link: currentLanguage === 'en' ? "/en/brands/pigeon" : "/brands/pigeon"
    },
    {
      id: "astalift",
      name: "Astalift",
      logo: astaliftLogo,
      category: currentLanguage === 'en' ? "Japanese Cosmetics" : "Mỹ phẩm Nhật Bản",
      description: currentLanguage === 'en'
        ? "Advanced Japanese skincare technology with astaxanthin for radiant skin"
        : "Công nghệ chăm sóc da tiên tiến từ Nhật Bản với astaxanthin cho làn da rạng rỡ",
      image: astaliftBanner,
      color: "from-red-500 to-orange-400",
      accent: "border-red-200",
      icon: <Star className="w-6 h-6" />,
      link: currentLanguage === 'en' ? "/en/brands/astalift" : "/brands/astalift"
    },
    {
      id: "instax",
      name: "Instax",
      logo: instaxLogo,
      category: currentLanguage === 'en' ? "Instant Photography" : "Máy chụp ảnh lấy liền",
      description: currentLanguage === 'en'
        ? "Capture and share life's moments instantly with Fujifilm's innovative cameras"
        : "Ghi lại và chia sẻ những khoảnh khắc cuộc sống ngay lập tức với máy ảnh sáng tạo của Fujifilm",
      image: instaxBanner,
      color: "from-blue-500 to-cyan-400",
      accent: "border-blue-200",
      icon: <Award className="w-6 h-6" />,
      link: currentLanguage === 'en' ? "/en/brands/instax-camera" : "/brands/instax-camera"
    },
    {
      id: "verites",
      name: "Verites",
      logo: veritesLogo,
      category: currentLanguage === 'en' ? "Youth Fragrance" : "Nước hoa cho giới trẻ",
      description: currentLanguage === 'en'
        ? "Trendy fragrances designed for the modern youth lifestyle"
        : "Nước hoa thời thượng được thiết kế cho lối sống hiện đại của giới trẻ",
      image: veritesBanner,
      color: "from-purple-500 to-indigo-400",
      accent: "border-purple-200",
      icon: <TrendingUp className="w-6 h-6" />,
      link: currentLanguage === 'en' ? "/en/brands/verites" : "/brands/verites"
    },
    {
      id: "etsuko",
      name: "Etsuko",
      logo: etsukoLogo,
      category: currentLanguage === 'en' ? "Baby Bath Care" : "Sữa tắm cho bé",
      description: currentLanguage === 'en'
        ? "Gentle and safe bath products specially formulated for babies' delicate skin"
        : "Sản phẩm tắm gội nhẹ nhàng và an toàn được điều chế đặc biệt cho làn da mỏng manh của bé",
      image: etsukoBanner,
      color: "from-green-500 to-emerald-400",
      accent: "border-green-200",
      icon: <Users className="w-6 h-6" />,
      link: currentLanguage === 'en' ? "/en/brands/etsuko" : "/brands/etsuko"
    },
    {
      id: "fujifilm",
      name: "Fujifilm",
      logo: fujifilmLogo,
      category: currentLanguage === 'en' ? "Photo Development" : "Phim rửa hình",
      description: currentLanguage === 'en'
        ? "Professional photo development and imaging solutions with decades of expertise"
        : "Giải pháp phát triển ảnh và hình ảnh chuyên nghiệp với nhiều thập kỷ kinh nghiệm",
      image: instaxBanner, // Using instax image as placeholder for Fujifilm
      color: "from-gray-600 to-slate-500",
      accent: "border-gray-200",
      icon: <Award className="w-6 h-6" />,
      link: currentLanguage === 'en' ? "/en/brands/fujifilm-image" : "/brands/fujifilm-image"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              {currentLanguage === 'en' ? 'Premium Brand Portfolio' : 'Bộ sưu tập thương hiệu cao cấp'}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
              {currentLanguage === 'en' ? 'Our Brands' : 'Thương hiệu của chúng tôi'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              {currentLanguage === 'en' 
                ? 'Discover our carefully curated portfolio of world-class brands, each representing excellence and innovation in their respective industries.'
                : 'Khám phá bộ sưu tập thương hiệu đẳng cấp thế giới được tuyển chọn kỹ lưỡng, mỗi thương hiệu đại diện cho sự xuất sắc và đổi mới trong lĩnh vực của mình.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                {currentLanguage === 'en' ? 'Explore Brands' : 'Khám phá thương hiệu'}
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                {currentLanguage === 'en' ? 'Learn More' : 'Tìm hiểu thêm'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <div
                key={brand.id}
                className={`group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Brand Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${brand.color} opacity-0 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {brand.icon}
                  </div>
                </div>

                {/* Brand Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${brand.color} text-white`}>
                      {brand.category}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <img 
                      src={brand.logo} 
                      alt={brand.name + " logo"}
                      className="h-12 w-auto object-contain max-w-full"
                    />
                  </div>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {brand.description}
                  </p>

                  <Link to={brand.link}>
                    <Button 
                      variant="outline" 
                      className={`w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 ${brand.accent}`}
                    >
                      {currentLanguage === 'en' ? 'Explore Brand' : 'Khám phá thương hiệu'}
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-110"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "6+", label: currentLanguage === 'en' ? "Premium Brands" : "Thương hiệu cao cấp" },
              { number: "20+", label: currentLanguage === 'en' ? "Years Experience" : "Năm kinh nghiệm" },
              { number: "50+", label: currentLanguage === 'en' ? "Countries" : "Quốc gia" },
              { number: "1M+", label: currentLanguage === 'en' ? "Happy Customers" : "Khách hàng hài lòng" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {currentLanguage === 'en' ? 'Ready to Partner With Us?' : 'Sẵn sàng hợp tác với chúng tôi?'}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {currentLanguage === 'en'
              ? 'Join thousands of satisfied customers worldwide and experience the quality of our premium brands.'
              : 'Tham gia cùng hàng nghìn khách hàng hài lòng trên toàn thế giới và trải nghiệm chất lượng của các thương hiệu cao cấp.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              {currentLanguage === 'en' ? 'Contact Us' : 'Liên hệ chúng tôi'}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              {currentLanguage === 'en' ? 'View Catalog' : 'Xem catalog'}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandsShowcase;